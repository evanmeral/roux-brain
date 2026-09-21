// post-scheduler — the queue for HPC's weekly organic Facebook + Instagram posts.
//
// WHAT THIS IS: a record and a gate. One `schedule.json` per content week says what is going out,
// when, whether Evan approved it, and where it stands. `preflight` checks every piece before a
// scheduling session touches Business Suite.
// WHAT THIS IS NOT: it never posts, schedules, or talks to Meta. Layer 1 makes no network call at
// all (no http, https, net, fetch or child_process anywhere in index.js, lint.js, media.js, cli.js).
// Approving a piece here marks it approved in the manifest. Nothing else happens.
//
// Manifest: my-work (outputs)/content/social/<YYYY-MM-DD>-week/schedule.json   (week id = the Monday)
// Public API (for the ROUX OS "Posts" panel): listWeeks, getWeek, preflight, approve, setStatus.
// Also exported: buildManifest, addEvidence, addWaiver, mediaPath, STATUSES.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const media = require('./media');
const lint = require('./lint');

const VAULT = path.resolve(__dirname, '../../..');
// POST_SCHEDULER_SOCIAL_DIR points the module at a throwaway folder. It exists for test/queue.test.js only.
const SOCIAL = process.env.POST_SCHEDULER_SOCIAL_DIR || path.join(VAULT, 'my-work (outputs)/content/social');
const FORMAT_FILE = path.join(VAULT, 'my-skills/content-week/weekly-format.md');
const TZ = 'America/Chicago';
const SCHEMA = 1;

const STATUSES = ['draft', 'approved', 'queued', 'scheduled', 'verified', 'failed', 'dropped'];
const TYPES = ['feed', 'carousel', 'reel', 'story'];
const PLACEMENTS = ['facebook', 'instagram'];
// Allowed moves. `dropped` is reachable from anywhere; `draft` is where a changed piece goes back to.
const MOVES = {
  draft: ['approved', 'dropped'],
  approved: ['queued', 'scheduled', 'draft', 'failed', 'dropped'],   // → scheduled directly only when Evan posts it by hand, or a backfill
  queued: ['scheduled', 'failed', 'approved', 'dropped'],
  scheduled: ['verified', 'failed', 'dropped'],
  verified: ['dropped'],
  failed: ['queued', 'approved', 'scheduled', 'dropped'],
  dropped: ['draft'],
};

// Limits. Pixel sizes: my-skills/hpc-ad-creative/instructions.md creative rule 9 (organic feed and
// every carousel frame 1080×1350; story and reel 1080×1920, video as MP4). Upload cap:
// business-suite-scheduling.md ("Combined size under 10 MB per call"). Caption caps are Meta's.
const SIZE = { feed: [1080, 1350], carousel: [1080, 1350], reel: [1080, 1920], story: [1080, 1920] };
const UPLOAD_LIMIT = 10 * 1000 * 1000;
const FB_CAPTION_MAX = 63206;
const IG_CAPTION_MAX = 2200;
const IG_HASHTAG_MAX = 30;
const CAROUSEL_MAX = 10;
const MIN_LEAD_MIN = 20;           // a piece must be at least this far ahead to be worth queueing

// ---------------------------------------------------------------- time

function tzOffsetMs(ts, tz) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ts));
  const g = (t) => Number(p.find((x) => x.type === t).value);
  return Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second')) - Math.floor(ts / 1000) * 1000;
}
/** "2026-09-28", "12:00" in America/Chicago → { epoch (seconds), iso } or null if malformed. */
function chicago(date, time) {
  const d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || ''); const t = /^(\d{1,2}):(\d{2})$/.exec(time || '');
  if (!d || !t || +t[1] > 23 || +t[2] > 59) return null;
  const wall = Date.UTC(+d[1], +d[2] - 1, +d[3], +t[1], +t[2]);
  if (new Date(wall).getUTCDate() !== +d[3]) return null;        // Sep 31 and friends
  let ts = wall - tzOffsetMs(wall, TZ);
  const off = tzOffsetMs(ts, TZ); ts = wall - off;
  const sign = off < 0 ? '-' : '+'; const a = Math.abs(off) / 60000;
  const iso = `${date}T${String(t[1]).padStart(2, '0')}:${t[2]}:00${sign}${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`;
  return { epoch: Math.floor(ts / 1000), iso };
}
const nowIso = () => new Date().toISOString();
const addDays = (date, n) => { const d = new Date(`${date}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayName = (date) => DAY[new Date(`${date}T12:00:00Z`).getUTCDay()];
function pretty(date, time) {
  const [h, m] = time.split(':').map(Number);
  return `${dayName(date)} ${date} ${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'} CT`;
}

// ---------------------------------------------------------------- the standing slots

// Read from weekly-format.md so the format file stays the single copy. Falls back to the format as
// set 2026-09-16 if the table cannot be read, and says so.
const SLOT_FALLBACK = [
  { slot: 1, day: 'Mon', time: '12:00', segments: ['Boil Math Monday'] },
  { slot: 2, day: 'Tue', time: '17:30', segments: ['Shop Floor Tuesday'] },
  { slot: 3, day: 'Wed', time: '12:00', segments: ['How-To Wednesday'] },
  { slot: 4, day: 'Thu', time: '17:30', segments: ['Word of Mouth Thursday'] },
  { slot: 5, day: 'Fri', time: '12:00', segments: ['Friday Fire'] },
  { slot: 6, day: 'Sat', time: '09:00', segments: ['Game Day', 'Weekend Cook'] },
];
function to24(s) {
  const m = /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i.exec(s.trim()); if (!m) return null;
  let h = +m[1]; const ap = (m[3] || '').toLowerCase();
  if (ap === 'pm' && h < 12) h += 12; if (ap === 'am' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}
function standingSlots() {
  try {
    const rows = [];
    for (const line of fs.readFileSync(FORMAT_FILE, 'utf8').split('\n')) {
      const c = line.split('|').map((x) => x.trim());
      const day = /^\*\*(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\*\*$/.exec(c[1] || '');
      const time = day && to24(c[2] || '');
      if (!day || !time) continue;
      const segments = [...(c[3] || '').matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1].trim());
      rows.push({ slot: rows.length + 1, day: day[1], time, segments });
    }
    if (rows.length >= 5) return { slots: rows, error: null };
    return { slots: SLOT_FALLBACK, error: 'could not read the slot table in weekly-format.md; using the 2026-09-16 format' };
  } catch (e) { return { slots: SLOT_FALLBACK, error: `cannot read weekly-format.md (${e.message}); using the 2026-09-16 format` }; }
}

// ---------------------------------------------------------------- files

const WEEK_RE = /^(\d{4}-\d{2}-\d{2})-week$/;
const weekId = (id) => { const m = /^(\d{4}-\d{2}-\d{2})(?:-week)?$/.exec(String(id || '')); if (!m) throw new Error(`bad week id "${id}" — use the Monday's date, e.g. 2026-09-28`); return m[1]; };
const weekDir = (id) => path.join(SOCIAL, `${weekId(id)}-week`);
const manifestPath = (id) => path.join(weekDir(id), 'schedule.json');

function readManifest(id) {
  const p = manifestPath(id);
  let raw;
  try { raw = fs.readFileSync(p, 'utf8'); }
  catch (e) { if (e.code === 'ENOENT') throw new Error(`no schedule.json for week ${weekId(id)} — run: node cli.js build ${weekId(id)}`); throw e; }
  try { return JSON.parse(raw); } catch (e) { throw new Error(`schedule.json for ${weekId(id)} is not valid JSON: ${e.message}`); }
}
function writeManifest(id, m) {
  const p = manifestPath(id);
  m.updatedAt = nowIso();
  const tmp = `${p}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, JSON.stringify(m, null, 2) + '\n');
  fs.renameSync(tmp, p);                       // atomic swap; never leaves half a file
}
/** Absolute path of a media file in a week folder. Refuses anything that escapes the folder. */
function mediaPath(id, file) {
  const dir = weekDir(id); const abs = path.resolve(dir, file);
  if (abs !== dir && !abs.startsWith(dir + path.sep)) throw new Error(`media path escapes the week folder: ${file}`);
  return abs;
}
function findPiece(m, pieceId) {
  const p = m.pieces.find((x) => x.id === pieceId);
  if (!p) throw new Error(`no piece "${pieceId}" in week ${m.week}. Pieces: ${m.pieces.map((x) => x.id).join(', ')}`);
  return p;
}

// What an approval covers: the words, the files (by content), the placements, the time.
function contentHash(id, piece) {
  const h = crypto.createHash('sha256');
  h.update(JSON.stringify({
    type: piece.type, placements: piece.placements, caption: piece.caption || null, firstComment: piece.firstComment || null,
    when: piece.scheduledFor, media: (piece.media || []).map((f) => [f, media.sha256(mediaPath(id, f))]),
  }));
  return h.digest('hex');
}

// ---------------------------------------------------------------- build-manifest (PLAN.md → schedule.json)

// PLAN.md carries one ```schedule fenced JSON block per piece, inside that piece's "### N · …"
// section (see plan-template.md). The block holds the facts a parser cannot guess; the captions are
// read from the section's own "**Caption — Facebook**" / "**Caption — Instagram**" fences, so
// nobody types a caption twice.
function parsePlan(text) {
  const errors = []; const pieces = [];
  const heads = [...text.matchAll(/^### (\d+) · (.*)$/gm)];
  heads.forEach((h, i) => {
    const end = i + 1 < heads.length ? heads[i + 1].index : (() => { const r = text.slice(h.index).search(/^## /m); return r < 0 ? text.length : h.index + r; })();
    const body = text.slice(h.index, end); const slot = +h[1];
    const caption = (who) => {
      const m = new RegExp(`^\\*\\*Caption\\s*[—–-]\\s*${who}\\b[^\\n]*\\*\\*\\s*\\n\`\`\`[^\\n]*\\n([\\s\\S]*?)\\n\`\`\``, 'm').exec(body);
      return m ? m[1].replace(/\s+$/, '') : null;
    };
    const blocks = [...body.matchAll(/^```schedule\s*\n([\s\S]*?)\n```/gm)];
    if (!blocks.length) errors.push(`section ${slot} ("${h[2].trim()}") has no \`\`\`schedule block`);
    for (const b of blocks) {
      let spec; try { spec = JSON.parse(b[1]); } catch (e) { errors.push(`section ${slot}: schedule block is not valid JSON (${e.message})`); continue; }
      const bad = [];
      if (!spec.id || !/^[a-z0-9-]+$/.test(spec.id)) bad.push('id');
      if (!TYPES.includes(spec.type)) bad.push(`type (one of ${TYPES.join(', ')})`);
      if (!Array.isArray(spec.placements) || !spec.placements.length || spec.placements.some((p) => !PLACEMENTS.includes(p))) bad.push('placements (facebook, instagram)');
      if (!Array.isArray(spec.media)) bad.push('media (array of file names, posting order)');
      if (!chicago(spec.date, spec.time)) bad.push('date (YYYY-MM-DD) / time (HH:MM, 24-hour, Central)');
      if (bad.length) { errors.push(`section ${slot}, block "${spec.id || '?'}": bad or missing ${bad.join('; ')}`); continue; }
      const wantsCaption = (spec.captions || (spec.type === 'story' ? 'none' : 'section')) === 'section';
      let cap = null;
      if (wantsCaption) {
        cap = {};
        for (const pl of spec.placements) {
          let t = caption(pl === 'facebook' ? 'Facebook' : 'Instagram');
          if (t == null) { errors.push(`section ${slot}, block "${spec.id}": no "**Caption — ${pl === 'facebook' ? 'Facebook' : 'Instagram'}**" fence found`); continue; }
          // Conditional lines, e.g. "[IF KIT LIVE] …". The block decides; undecided markers stay in
          // and the linter fails them, so a marker can never post by accident.
          if (spec.ifLines === 'omit') t = t.split('\n').filter((l) => !/^\s*\[IF\b[^\]]*\]/i.test(l)).join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '');
          else if (spec.ifLines === 'include') t = t.replace(/^\s*\[IF\b[^\]]*\]\s*/gim, '');
          cap[pl] = t;
        }
      }
      pieces.push({ slot, spec, caption: cap });
    }
  });
  const ids = pieces.map((p) => p.spec.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) errors.push(`duplicate piece id: ${[...new Set(dup)].join(', ')}`);
  return { pieces, errors };
}

// Words set on a carousel's graphics, from its carousel.py config, so the linter can read them.
function graphicTextFrom(id, file) {
  const skip = new Set(['_comment', 'name', 'slug', 'photo', 'cutout', 'position', 'brightness', 'size', 'kind']);
  const out = [];
  const walk = (v, k) => {
    if (typeof v === 'string') { if (!skip.has(k)) out.push(v.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&deg;/g, '°').replace(/&Prime;/g, '″').replace(/&amp;/g, '&').replace(/&[a-z]+;/gi, ' ').trim()); }
    else if (Array.isArray(v)) v.forEach((x) => walk(x, k));
    else if (v && typeof v === 'object') Object.entries(v).forEach(([kk, vv]) => walk(vv, kk));
  };
  walk(JSON.parse(fs.readFileSync(mediaPath(id, file), 'utf8')), '');
  return out.filter(Boolean);
}

/**
 * Build or refresh schedule.json from the week's PLAN.md.
 * A piece that is approved and whose content changed goes back to draft (the approval covered the
 * old content). A piece already queued, scheduled or verified is locked: it is left as it is and
 * the difference is reported.
 * @returns {{manifest, path, written, report: string[]}}
 */
function buildManifest(id, opts = {}) {
  const wk = weekId(id); const dir = weekDir(wk);
  const planFile = path.join(dir, 'PLAN.md');
  if (!fs.existsSync(planFile)) throw new Error(`no PLAN.md in ${dir}`);
  const { pieces, errors } = parsePlan(fs.readFileSync(planFile, 'utf8'));
  if (errors.length) throw new Error(`PLAN.md cannot be built into a manifest:\n  - ${errors.join('\n  - ')}`);
  const { slots } = standingSlots();
  let old = null; try { old = readManifest(wk); } catch (e) { /* first build */ }
  const report = []; const out = [];
  for (const { slot, spec, caption } of pieces) {
    const when = chicago(spec.date, spec.time);
    const fresh = {
      id: spec.id, slot, segment: spec.segment || (slots.find((s) => s.slot === slot) || { segments: [''] }).segments[0],
      type: spec.type, placements: spec.placements, media: spec.media, caption,
      firstComment: spec.firstComment || null,
      scheduledFor: { date: spec.date, time: spec.time, timezone: TZ, iso: when.iso, epoch: when.epoch },
      approved: false, approval: null, status: 'draft', scheduledBy: null,
      conditional: spec.conditional || null, alternates: spec.alternates || [], notes: spec.notes || [],
      commercial: !!spec.commercial, graphicText: [], waivers: [], evidence: [],
      history: [{ at: nowIso(), from: null, to: 'draft', by: 'build-manifest', note: 'built from PLAN.md' }],
    };
    if (spec.graphicTextFrom) {
      try { fresh.graphicText = graphicTextFrom(wk, spec.graphicTextFrom); }
      catch (e) { report.push(`${spec.id}: could not read graphic text from ${spec.graphicTextFrom} (${e.message})`); }
    } else if (Array.isArray(spec.graphicText)) fresh.graphicText = spec.graphicText;
    const prev = old && old.pieces.find((p) => p.id === spec.id);
    if (!prev) { out.push(fresh); report.push(`${spec.id}: new`); continue; }
    const same = contentHash(wk, prev) === contentHash(wk, fresh);
    if (['queued', 'scheduled', 'verified'].includes(prev.status)) {
      out.push(prev);
      report.push(same ? `${spec.id}: locked (${prev.status}), unchanged` : `${spec.id}: ⚠️ LOCKED (${prev.status}) but PLAN.md now differs from what the manifest holds. Left alone. What is live in Business Suite matches the manifest, not the plan.`);
      continue;
    }
    // carry the record forward; refresh the content
    const merged = { ...fresh, approved: prev.approved, approval: prev.approval, status: prev.status, scheduledBy: prev.scheduledBy || null, waivers: prev.waivers || [], evidence: prev.evidence || [], history: prev.history || [] };
    if (!same && prev.approved) {
      merged.approved = false; merged.status = 'draft';
      merged.history.push({ at: nowIso(), from: prev.status, to: 'draft', by: 'build-manifest', note: 'content changed after approval — the approval covered the old content; needs Evan again', previousApproval: prev.approval });
      merged.approval = null;
      report.push(`${spec.id}: ⚠️ changed after approval → back to draft, needs Evan's approval again`);
    } else report.push(`${spec.id}: ${same ? 'unchanged' : 'content refreshed'} (${merged.status})`);
    out.push(merged);
  }
  for (const p of (old ? old.pieces : [])) if (!out.find((x) => x.id === p.id)) {
    if (['scheduled', 'verified', 'queued'].includes(p.status)) { out.push(p); report.push(`${p.id}: ⚠️ gone from PLAN.md but ${p.status} — kept. Mark it dropped once it is removed in Business Suite.`); }
    else report.push(`${p.id}: removed (no longer in PLAN.md)`);
  }
  out.sort((a, b) => a.scheduledFor.epoch - b.scheduledFor.epoch || a.id.localeCompare(b.id));
  const manifest = { schema: SCHEMA, week: wk, timezone: TZ, source: 'PLAN.md', builtAt: nowIso(), createdAt: (old && old.createdAt) || nowIso(), pieces: out };
  if (!opts.dryRun) writeManifest(wk, manifest);
  return { manifest, path: manifestPath(wk), written: !opts.dryRun, report };
}

// ---------------------------------------------------------------- preflight

/**
 * Check every piece. Pure read: never writes, never calls out.
 * level: pass · info · warn · waived · fail.  A piece's badge is its worst level.
 * `runnable` is what the scheduling session may take: approved, not yet scheduled, no fail, and
 * small enough for the browser upload.
 */
function preflight(id, opts = {}) {
  const wk = weekId(id); const m = opts.manifest || readManifest(wk);
  const now = opts.now ? new Date(opts.now) : new Date();
  const { slots, error: slotError } = standingSlots();
  const ref = lint.reference(true);
  const result = { week: wk, ranAt: now.toISOString(), ok: true, referenceErrors: [...ref.errors, ...(slotError ? [slotError] : [])], summary: { pass: 0, warn: 0, fail: 0, dropped: 0 }, pieces: [] };

  for (const piece of m.pieces) {
    const checks = []; const add = (check, level, message, extra) => checks.push({ check, level, message, ...(extra || {}) });
    const live = ['scheduled', 'verified'].includes(piece.status);
    if (piece.status === 'dropped') {
      result.pieces.push({ id: piece.id, slot: piece.slot, type: piece.type, status: piece.status, approved: piece.approved, badge: 'dropped', runnable: false, manualUpload: false, checks: [{ check: 'status', level: 'info', message: 'dropped — not checked' }] });
      result.summary.dropped++; continue;
    }

    // 1. files, pixel size, upload weight
    const want = SIZE[piece.type]; let bytes = 0; let filesOk = true;
    if (!piece.media || !piece.media.length) { add('files', 'fail', 'no media file listed'); filesOk = false; }
    for (const f of piece.media || []) {
      let info; try { info = media.inspect(mediaPath(wk, f)); } catch (e) { add('files', 'fail', e.message); filesOk = false; continue; }
      if (info.error === 'file not found') { add('files', 'fail', `missing file: ${f}`); filesOk = false; continue; }
      bytes += info.bytes || 0;
      const wantsVideo = piece.type === 'reel';
      if (wantsVideo && info.kind !== 'video') add('dimensions', 'fail', `${f}: a reel needs a video file, this is ${info.kind}. A still is never posted as a reel (format rule 7).`);
      if (['feed', 'carousel'].includes(piece.type) && info.kind === 'video') add('dimensions', 'warn', `${f}: video in a feed slot — Facebook treats every uploaded video as a reel`);
      if (info.kind === 'video' && !/\.mp4$/i.test(f)) add('dimensions', 'warn', `${f}: not MP4. Creative rule 9 says video as MP4, and the .MOV hung on "Processing media" on 2026-09-16.`);
      if (info.error) { add('dimensions', 'warn', `${f}: ${info.error}`); continue; }
      const ratioOk = Math.abs(info.width / info.height - want[0] / want[1]) < 0.01;
      if (!ratioOk) add('dimensions', 'fail', `${f}: ${info.width}×${info.height}, but a ${piece.type} is ${want[0]}×${want[1]} (${piece.type === 'feed' || piece.type === 'carousel' ? '4:5' : '9:16'})`);
      else if (info.width !== want[0]) add('dimensions', 'warn', `${f}: ${info.width}×${info.height} is the right shape but not ${want[0]}×${want[1]}`);
    }
    if (filesOk && !checks.some((c) => c.check === 'dimensions')) add('dimensions', 'pass', `${piece.media.length} file${piece.media.length > 1 ? 's' : ''}, ${want[0]}×${want[1]}`);
    if (piece.type === 'carousel') {
      if ((piece.media || []).length < 2) add('files', 'fail', 'a carousel needs at least 2 frames');
      if ((piece.media || []).length > CAROUSEL_MAX) add('files', 'warn', `${piece.media.length} frames; Meta's composer and API take ${CAROUSEL_MAX}`);
      const nums = (piece.media || []).map((f) => +(/_(\d+)-[^/]*$/.exec(f) || [])[1]);
      if (nums.every((n) => n) && nums.some((n, i) => i && n <= nums[i - 1])) add('files', 'fail', `frames are not in posting order: ${nums.join(', ')}`);
    } else if ((piece.media || []).length > 1) add('files', 'fail', `a ${piece.type} takes one file; ${piece.media.length} listed`);
    let manualUpload = false;
    if (filesOk && bytes >= UPLOAD_LIMIT) { manualUpload = true; add('upload-size', 'warn', `${(bytes / 1e6).toFixed(1)} MB combined — over the 10 MB browser upload. EVAN UPLOADS THIS ONE HIMSELF.`); }
    else if (filesOk && bytes >= 0.9 * UPLOAD_LIMIT) add('upload-size', 'warn', `${(bytes / 1e6).toFixed(1)} MB combined — close to the 10 MB browser upload cap`);
    else if (filesOk) add('upload-size', 'pass', `${(bytes / 1e6).toFixed(1)} MB combined`);
    for (const alt of piece.alternates || []) for (const f of alt.media || []) {
      let info; try { info = media.inspect(mediaPath(wk, f)); } catch (e) { add('alternate', 'warn', e.message); continue; }
      if (info.error) add('alternate', 'warn', `alternate "${alt.label || f}": ${f}: ${info.error}`);
      else if (Math.abs(info.width / info.height - want[0] / want[1]) >= 0.01) add('alternate', 'warn', `alternate "${alt.label || f}": ${f} is ${info.width}×${info.height}, not ${want[0]}×${want[1]}`);
    }

    // 2. date, slot, clashes
    const when = chicago(piece.scheduledFor && piece.scheduledFor.date, piece.scheduledFor && piece.scheduledFor.time);
    if (!when) add('date', 'fail', 'date or time is missing or malformed');
    else {
      const { date, time } = piece.scheduledFor;
      if (date < wk || date > addDays(wk, 6)) add('date', 'fail', `${date} is outside the week of ${wk}`);
      if (!live) {
        const lead = (when.epoch * 1000 - now.getTime()) / 60000;
        if (lead < 0) add('date', 'fail', `${pretty(date, time)} is in the past`);
        else if (lead < MIN_LEAD_MIN) add('date', 'fail', `${pretty(date, time)} is ${Math.round(lead)} min away; needs at least ${MIN_LEAD_MIN}`);
        else add('date', 'pass', pretty(date, time));
      } else add('date', 'info', `${pretty(date, time)} — already ${piece.status}, so not checked against the clock`);
      const st = slots.find((s) => s.slot === piece.slot);
      if (!st) add('slot', 'warn', `slot ${piece.slot} is not one of the standing slots`);
      else {
        if (dayName(date) !== st.day) add('slot', 'fail', `slot ${piece.slot} (${st.segments[0]}) belongs on ${st.day}; this is ${dayName(date)} ${date}`);
        else if (time !== st.time) {
          const mondayMove = piece.slot === 1 && time === '17:30';     // instructions.md: approval after 11:00 moves Monday to 5:30 pm
          add('slot', mondayMove ? 'info' : 'warn', `standing time for ${st.segments[0]} is ${st.time}; this piece is at ${time}${mondayMove ? " (Monday's documented late-approval move)" : ''}`);
        } else add('slot', 'pass', `${st.day} ${st.time}, ${st.segments[0]}`);
      }
      if (dayName(date) === 'Sun' && piece.type !== 'story') add('slot', 'fail', 'Sunday stays dark for the feed (format rule 8)');
      for (const other of m.pieces) {
        if (other === piece || other.status === 'dropped' || !other.scheduledFor) continue;
        if (other.scheduledFor.date !== date || other.scheduledFor.time !== time) continue;
        if (!other.placements.some((p) => piece.placements.includes(p))) continue;
        const bothFeed = piece.type !== 'story' && other.type !== 'story'; const bothStory = piece.type === 'story' && other.type === 'story';
        if (bothFeed || bothStory) add('clash', 'fail', `same time as ${other.id} (${pretty(date, time)}) on the same surface`);
        else add('clash', 'info', `same time as ${other.id}, by design: a feed post and its story repost`);
      }
    }

    // 3. captions
    const cap = piece.caption || {};
    if (piece.type === 'story') {
      if (cap.facebook || cap.instagram) add('caption', 'warn', 'stories carry no caption; this one will not be used');
    } else for (const pl of piece.placements) {
      const t = cap[pl];
      if (!t || !t.trim()) { add('caption', 'fail', `no ${pl} caption`); continue; }
      const max = pl === 'facebook' ? FB_CAPTION_MAX : IG_CAPTION_MAX;
      if (t.length > max) add('caption', 'fail', `${pl} caption is ${t.length} characters; the limit is ${max}`);
      else add('caption', 'pass', `${pl}: ${t.length} of ${max} characters`);
      if (pl === 'instagram') { const n = (t.match(/#[A-Za-z_]\w*/g) || []).length; if (n > IG_HASHTAG_MAX) add('caption', 'fail', `${n} hashtags; Instagram allows ${IG_HASHTAG_MAX}`); }
      const st = slots.find((s) => s.slot === piece.slot); const first = t.split('\n')[0].trim();
      if (st && !st.segments.some((s) => first.toLowerCase().startsWith(s.toLowerCase()))) add('caption', 'warn', `${pl}: first line is "${first.slice(0, 40)}", not the segment name "${st.segments.join('" / "')}" (format rule 1)`);
    }
    const fc = piece.firstComment || {};
    for (const pl of PLACEMENTS) if (fc[pl] && fc[pl].length > IG_CAPTION_MAX) add('caption', 'fail', `${pl} first comment is ${fc[pl].length} characters; the limit is ${IG_CAPTION_MAX}`);

    // 4. the copy rules
    const findings = lint.lintPiece(piece); let lintFail = 0;
    for (const f of findings) {
      const waiver = f.severity === 'error' && (piece.waivers || []).find((w) => w.rule === f.rule && (!w.field || w.field === f.field));
      const level = f.severity === 'warn' ? 'warn' : waiver ? 'waived' : 'fail';
      if (level === 'fail') lintFail++;
      add('lint', level, `${f.field} · ${f.rule}: “${f.match}”${f.detail ? ` — ${f.detail}` : ''}${waiver ? ` — WAIVED by ${waiver.by}, ${waiver.at}: "${waiver.words}"` : ''}`, { rule: f.rule, field: f.field, source: f.source });
    }
    if (!findings.length) add('lint', 'pass', 'copy rules: nothing found');
    if (piece.type !== 'story' && !(piece.graphicText || []).length && piece.type !== 'reel') add('lint', 'info', 'the linter read the captions only; words set on the graphic were checked by eye, not by this tool');

    // 5. does the approval still cover this content?
    if (piece.approved) {
      if (!piece.approval || !piece.approval.contentHash) add('approval', 'fail', 'marked approved but carries no approval record');
      else if (!live && piece.approval.contentHash !== contentHash(wk, piece)) add('approval', 'fail', 'the captions, files or time changed after Evan approved it. Needs his approval again (node cli.js build resets it).');
      else add('approval', 'pass', `approved by ${piece.approval.by} ${piece.approval.at}`);
    } else add('approval', 'info', 'not approved yet — cannot be queued');
    if (/sticker/i.test((piece.notes || []).join(' '))) add('note', 'info', 'Business Suite cannot schedule stickers; Evan adds it by hand after it posts');
    if (piece.type === 'reel') add('note', 'info', 'video through the browser failed on 2026-09-16 (processing hang). One attempt, then hand it to Evan.');
    if (piece.conditional) add('note', 'info', `conditional: ${piece.conditional}`);

    const badge = checks.some((c) => c.level === 'fail') ? 'fail' : checks.some((c) => c.level === 'warn') ? 'warn' : 'pass';
    result.summary[badge]++;
    result.pieces.push({
      id: piece.id, slot: piece.slot, type: piece.type, status: piece.status, approved: !!piece.approved, badge,
      runnable: !!piece.approved && ['approved', 'queued'].includes(piece.status) && badge !== 'fail' && !manualUpload,
      manualUpload, checks,
    });
  }
  result.ok = result.summary.fail === 0 && !result.referenceErrors.length;
  return result;
}

// ---------------------------------------------------------------- approve · status · evidence · waivers

/**
 * Record Evan's approval of one piece. It does NOT schedule anything.
 * @param note Evan's own words ("approved", a line note) — required from chat; the OS button may pass ''.
 * @param opts { via: 'os' | 'chat', by: 'Evan', at: ISO (only to backfill a past approval) }
 * Only Evan approves. A model session records his words; it never approves on his behalf.
 */
function approve(id, pieceId, note, opts = {}) {
  const wk = weekId(id); const m = readManifest(wk); const p = findPiece(m, pieceId);
  const via = opts.via || 'os'; const words = (note || '').trim();
  if (via !== 'os' && !words) throw new Error("approve needs Evan's words (what he said, verbatim)");
  if (!['draft', 'failed', 'approved'].includes(p.status)) throw new Error(`${pieceId} is ${p.status}; only a draft (or a failed piece) can be approved`);
  const from = p.status;
  p.approved = true;
  p.approval = { by: opts.by || 'Evan', at: opts.at || nowIso(), recordedAt: nowIso(), via, words: words || '(Approve button in ROUX OS)', contentHash: contentHash(wk, p) };
  p.status = 'approved';
  p.history.push({ at: nowIso(), from, to: 'approved', by: p.approval.by, note: p.approval.words });
  writeManifest(wk, m);
  return { piece: p, preflight: preflight(wk, { manifest: m }).pieces.find((x) => x.id === pieceId) };
}

/**
 * Move a piece through draft → approved → queued → scheduled → verified, or to failed / dropped.
 * Refuses: an unapproved piece past `approved`; `queued` with a failing preflight; `verified`
 * without read-back evidence for every placement; any move the state machine does not allow.
 * @param opts { note, by: 'ROUX' | 'Evan', evidence: {source, platform, readBack, note}, backfill: bool }
 */
function setStatus(id, pieceId, status, opts = {}) {
  const wk = weekId(id); const m = readManifest(wk); const p = findPiece(m, pieceId);
  if (!STATUSES.includes(status)) throw new Error(`unknown status "${status}". One of: ${STATUSES.join(', ')}`);
  if (status === 'approved' && !p.approved) throw new Error('use approve() — an approval carries Evan\'s words');
  if (p.status === status) throw new Error(`${pieceId} is already ${status}`);
  if (['queued', 'scheduled', 'verified'].includes(status) && !p.approved) throw new Error(`REFUSED: ${pieceId} is not approved. Only pieces Evan approved get queued or scheduled.`);
  if (!(MOVES[p.status] || []).includes(status)) throw new Error(`${pieceId} is ${p.status}; it cannot go to ${status} (allowed: ${(MOVES[p.status] || []).join(', ') || 'nothing'})`);
  const by = opts.by || 'ROUX';
  if (status === 'queued') {
    const pf = preflight(wk, { manifest: m }).pieces.find((x) => x.id === pieceId);
    if (pf.badge === 'fail') throw new Error(`REFUSED: ${pieceId} fails preflight:\n  - ${pf.checks.filter((c) => c.level === 'fail').map((c) => c.message).join('\n  - ')}`);
    if (pf.manualUpload) throw new Error(`REFUSED: ${pieceId} is over the 10 MB browser upload. Evan uploads it himself; then: mark ${wk} ${pieceId} scheduled --by Evan`);
  }
  if (status === 'scheduled' && p.status !== 'queued' && by !== 'Evan' && !opts.backfill) throw new Error(`REFUSED: ${pieceId} was never queued. Queue it first (that runs preflight), or pass by: "Evan" if he scheduled it by hand.`);
  if (opts.backfill && !opts.note) throw new Error('a backfill needs a note saying where the record comes from');
  if (['failed', 'dropped'].includes(status) && !opts.note) throw new Error(`${status} needs a note with the reason`);
  if (opts.evidence) pushEvidence(p, opts.evidence);
  if (status === 'verified') {
    const seen = new Set((p.evidence || []).map((e) => e.platform)); const missing = p.placements.filter((pl) => !seen.has(pl) && !seen.has('both'));
    if (missing.length) throw new Error(`REFUSED: never say "scheduled" without the read-back. No evidence recorded for: ${missing.join(', ')}`);
  }
  if (status === 'draft') { p.approved = false; p.approval = null; }
  if (status === 'scheduled') p.scheduledBy = by;
  p.history.push({ at: nowIso(), from: p.status, to: status, by, note: opts.note || null, ...(opts.backfill ? { backfill: true } : {}) });
  p.status = status;
  writeManifest(wk, m);
  return p;
}

function pushEvidence(p, e) {
  if (!e.source || !e.readBack) throw new Error('evidence needs a source (where it was read) and readBack (what it said)');
  const platform = e.platform || 'both';
  if (![...PLACEMENTS, 'both'].includes(platform)) throw new Error('evidence platform is facebook, instagram or both');
  p.evidence = p.evidence || [];
  p.evidence.push({ at: e.at || nowIso(), source: e.source, platform, readBack: e.readBack, note: e.note || null });
}
/** Record what Business Suite showed, without changing the status. */
function addEvidence(id, pieceId, evidence) {
  const wk = weekId(id); const m = readManifest(wk); const p = findPiece(m, pieceId);
  pushEvidence(p, evidence); writeManifest(wk, m); return p;
}
/** Record that Evan accepted a specific rule finding on a specific piece. His words are required. */
function addWaiver(id, pieceId, w) {
  const wk = weekId(id); const m = readManifest(wk); const p = findPiece(m, pieceId);
  if (!w || !w.rule || !w.words) throw new Error("a waiver needs the rule id and Evan's words");
  if (!lint.RULES.some((r) => r.id === w.rule)) throw new Error(`no lint rule "${w.rule}"`);
  p.waivers = p.waivers || [];
  p.waivers.push({ rule: w.rule, field: w.field || null, by: w.by || 'Evan', at: w.at || nowIso().slice(0, 10), words: w.words, source: w.source || null });
  p.history.push({ at: nowIso(), from: p.status, to: p.status, by: w.by || 'Evan', note: `waived ${w.rule}: "${w.words}"` });
  writeManifest(wk, m); return p;
}

// ---------------------------------------------------------------- read side for the OS panel

/** Every content week on disk, newest first. */
function listWeeks() {
  let names = []; try { names = fs.readdirSync(SOCIAL); } catch (e) { return []; }
  return names.filter((n) => WEEK_RE.test(n)).sort().reverse().map((n) => {
    const id = WEEK_RE.exec(n)[1]; const dir = path.join(SOCIAL, n);
    const w = { id, from: id, to: addDays(id, 6), dir, manifestPath: path.join(dir, 'schedule.json'), hasPlan: fs.existsSync(path.join(dir, 'PLAN.md')), hasManifest: false, pieces: 0, approved: 0, counts: {}, error: null };
    try {
      const m = readManifest(id); w.hasManifest = true; w.pieces = m.pieces.length; w.updatedAt = m.updatedAt || null;
      w.approved = m.pieces.filter((p) => p.approved).length;
      for (const p of m.pieces) w.counts[p.status] = (w.counts[p.status] || 0) + 1;
    } catch (e) { if (!/^no schedule\.json/.test(e.message)) w.error = e.message; }
    return w;
  });
}

/** One week, shaped for a panel: pieces in time order, grouped by day, with absolute media paths. */
function getWeek(id) {
  const wk = weekId(id); const m = readManifest(wk);
  const pieces = m.pieces.map((p) => ({
    ...p, when: p.scheduledFor ? pretty(p.scheduledFor.date, p.scheduledFor.time) : null,
    mediaAbs: (p.media || []).map((f) => mediaPath(wk, f)), thumb: p.media && p.media[0] ? mediaPath(wk, p.media[0]) : null,
  }));
  const days = [];
  for (let i = 0; i < 7; i++) { const date = addDays(wk, i); days.push({ date, day: dayName(date), pieces: pieces.filter((p) => p.scheduledFor && p.scheduledFor.date === date).map((p) => p.id) }); }
  return { week: wk, from: wk, to: addDays(wk, 6), timezone: TZ, dir: weekDir(wk), manifestPath: manifestPath(wk), updatedAt: m.updatedAt || null, builtAt: m.builtAt || null, days, pieces };
}

module.exports = {
  listWeeks, getWeek, preflight, approve, setStatus,                 // the OS panel interface
  buildManifest, addEvidence, addWaiver, mediaPath, contentHash, parsePlan, chicago, standingSlots,
  STATUSES, TYPES, PLACEMENTS, MOVES, paths: { VAULT, SOCIAL, weekDir, manifestPath },
};
