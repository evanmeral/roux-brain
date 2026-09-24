// Posts — the ROUX OS view of the post scheduler (live/post-scheduler/). This file only `require`s
// that module; it never edits anything inside post-scheduler/ or my-skills/content-week/.
//
// What the panel can do: show a week, Approve a piece (marks schedule.json only), or send a piece
// back with a note (one line in capture.md for Sage). What it cannot do: schedule or publish. There
// is no button, route or code path here that queues, schedules or posts anything. Publishing is one
// of the four things that are never automated.
//
// Media is served only through mediaPath(), which refuses to leave the week folder, and only for a
// file that a piece in that week's manifest actually lists.
'use strict';
const fs = require('fs');
const path = require('path');
const { cleanStr, HttpError } = require('./util');
const postResults = require('./post-results'); // organic results per piece, read by a button session (never by this server)

const WEEK_ID = /^\d{4}-\d{2}-\d{2}$/;
const PIECE_ID = /^\d{1,2}-[a-z]{2,12}$/;
const MEDIA_MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.mov': 'video/quicktime' };

// "Short notes sent": every note Evan sent on a piece, read back from capture.md and its archive, so the
// history survives /wrap. Lines look like
//   - 2026-09-24 08:20 · Content note, 2026-09-28 1-feed (Boil Math Monday): <note> — Sage  → folded: ...
//   - 2026-09-24 09:10 · Approval: APPROVED post 2026-09-28 1-feed ... · Evan's note: <note> · Approval only...
const NOTE_LINE = /^- (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) · (?:Content note, (\d{4}-\d{2}-\d{2}) (\d{1,2}-[a-z]{2,12})(?: \([^)]*\))?: (.+?)(?: — Sage)?(?:\s+→ folded.*)?|Approval: APPROVED post (\d{4}-\d{2}-\d{2}) (\d{1,2}-[a-z]{2,12}).*?· Evan's note: (.+?) · Approval only.*)$/;

module.exports = function makePosts({ todayIso, desk }) {
  function notesSent() {
    const by = new Map(); const seen = new Set();
    for (const f of [path.join(desk, 'archive', 'captures.md'), path.join(desk, 'capture.md')]) {
      let text = ''; try { text = fs.readFileSync(f, 'utf8'); } catch (_) { continue; }
      for (const line of text.split('\n')) {
        const m = NOTE_LINE.exec(line.trim()); if (!m) continue;
        const [week, piece, note, kind] = m[3] ? [m[3], m[4], m[5], 'sent back'] : [m[6], m[7], m[8], 'with approval'];
        const key = `${week}|${piece}|${m[1]} ${m[2]}|${note}`; if (seen.has(key)) continue; seen.add(key);
        const k = week + '|' + piece; if (!by.has(k)) by.set(k, []);
        by.get(k).push({ at: `${m[1]} ${m[2]}`, kind, note: note.trim(), pending: f.endsWith('capture.md') && !f.includes('archive') });
      }
    }
    for (const list of by.values()) list.sort((a, b) => b.at.localeCompare(a.at));
    return by;
  }

  let mod = null, loadError = null;
  try { mod = require('../post-scheduler'); } catch (e) { loadError = 'The post scheduler module will not load: ' + e.message; }
  const need = () => { if (!mod) throw new HttpError(500, loadError); return mod; };
  const weekArg = (id) => { if (typeof id !== 'string' || !WEEK_ID.test(id)) throw new HttpError(400, 'Week ids are the Monday date, like 2026-09-28'); return id; };
  const pieceArg = (id) => { if (typeof id !== 'string' || !PIECE_ID.test(id)) throw new HttpError(400, 'Piece ids look like 4-feed'); return id; };

  function weeks() {
    const m = need(); const today = todayIso();
    const list = m.listWeeks().map((w) => ({ id: w.id, from: w.from, to: w.to, hasPlan: w.hasPlan, hasManifest: w.hasManifest, pieces: w.pieces, approved: w.approved, counts: w.counts, updatedAt: w.updatedAt || null, error: w.error || null }));
    // Default: the next week that still has pieces waiting on an approval; else the newest week with a manifest.
    const open = list.filter((w) => w.hasManifest && (w.counts.draft || 0) > 0 && w.to >= today).sort((a, b) => a.id.localeCompare(b.id));
    const fallback = list.find((w) => w.hasManifest);
    return { weeks: list, defaultWeek: (open[0] || fallback || {}).id || null, today };
  }

  function week(id) {
    const m = need(); weekArg(id);
    let w, pf;
    try { w = m.getWeek(id); } catch (e) { throw new HttpError(404, e.message); }
    try { pf = m.preflight(id); } catch (e) { pf = { error: e.message, pieces: [], summary: null, referenceErrors: [] }; }
    const checksById = new Map((pf.pieces || []).map((p) => [p.id, p]));
    const sent = notesSent(); const R = postResults.read();
    const pieces = w.pieces.map((p) => {
      const c = checksById.get(p.id) || null;
      return {
        id: p.id, slot: p.slot, segment: p.segment, type: p.type, placements: p.placements, when: p.when, scheduledFor: p.scheduledFor,
        status: p.status, approved: !!p.approved, approval: p.approval ? { by: p.approval.by, at: p.approval.at, via: p.approval.via, words: p.approval.words } : null,
        caption: { facebook: (p.caption && p.caption.facebook) || '', instagram: (p.caption && p.caption.instagram) || '' }, firstComment: p.firstComment || null,
        conditional: p.conditional || null,
        // Alternates (an option B for Evan to pick) carry media URLs so the panel can show them under the piece.
        alternates: (p.alternates || []).map((alt) => ({ label: alt.label || '', media: (alt.media || []).map((f) => { let exists = false; try { exists = fs.existsSync(m.mediaPath(id, f)); } catch (_) {} return { file: f, exists, url: `/api/posts/media?week=${encodeURIComponent(id)}&file=${encodeURIComponent(f)}` }; }) })),
        notesSent: sent.get(id + '|' + p.id) || [],
        results: postResults.forPiece(R, id, p), // null = nothing to say (never read, or had not run by the read)
        notes: p.notes || [], commercial: !!p.commercial,
        evidence: (p.evidence || []).map((e) => ({ at: e.at, source: e.source, platform: e.platform, readBack: e.readBack })),
        media: (p.media || []).map((f, i) => { const ext = path.extname(f).toLowerCase(); let exists = false; try { exists = fs.existsSync(m.mediaPath(id, f)); } catch (_) {} return { file: f, n: i + 1, kind: ext === '.mp4' || ext === '.mov' ? 'video' : 'image', exists, url: `/api/posts/media?week=${encodeURIComponent(id)}&file=${encodeURIComponent(f)}` }; }),
        preflight: c ? { badge: c.badge, runnable: c.runnable, manualUpload: c.manualUpload, checks: c.checks.map((k) => ({ check: k.check, level: k.level, message: k.message, rule: k.rule || null, field: k.field || null, source: k.source || null })) } : null,
        // The panel offers Approve only on a draft that is not failing preflight.
        canApprove: p.status === 'draft' && !!c && c.badge !== 'fail',
      };
    });
    return { week: w.week, from: w.from, to: w.to, timezone: w.timezone, updatedAt: w.updatedAt, builtAt: w.builtAt, days: w.days, pieces, results: resultsMeta(R), preflight: { ok: pf.ok, ranAt: pf.ranAt, summary: pf.summary, referenceErrors: pf.referenceErrors || [], error: pf.error || null } };
  }

  // Home-screen count: pieces waiting on Evan's approval, and pieces failing preflight, in weeks that have not ended.
  function summary() {
    if (!mod) return { error: loadError };
    try {
      const today = todayIso(); let waiting = 0, failing = 0; let next = null;
      for (const w of mod.listWeeks()) {
        if (!w.hasManifest || w.to < today) continue;
        const pf = mod.preflight(w.id);
        for (const p of pf.pieces) { if (p.status === 'draft') waiting++; if (p.badge === 'fail' && !['dropped', 'verified', 'scheduled'].includes(p.status)) failing++; }
        if ((w.counts.draft || 0) > 0 && (!next || w.id < next)) next = w.id;
      }
      return { error: null, waiting, failing, week: next };
    } catch (e) { return { error: 'Posts: ' + e.message }; }
  }

  // Approve marks the manifest only. It schedules nothing. A piece failing preflight cannot be approved here.
  function approve(body) {
    const m = need(); const id = weekArg(body.week); const pid = pieceArg(body.piece);
    let note; try { note = cleanStr(body.note, 400) || ''; } catch (e) { throw new HttpError(400, 'note: ' + e.message); }
    let pf; try { pf = m.preflight(id); } catch (e) { throw new HttpError(404, e.message); }
    const c = pf.pieces.find((p) => p.id === pid);
    if (!c) throw new HttpError(404, `There is no piece ${pid} in week ${id}`);
    if (c.status !== 'draft') throw new HttpError(409, `${pid} is ${c.status}. Only a draft can be approved from the page.`);
    if (c.badge === 'fail') throw new HttpError(409, `${pid} is failing preflight (${c.checks.filter((k) => k.level === 'fail').map((k) => k.message).join('; ')}). Fix that first; it cannot be approved as it is.`);
    let r; try { r = m.approve(id, pid, note, { via: 'os' }); } catch (e) { throw new HttpError(409, e.message); }
    return { ok: true, week: id, piece: pid, status: r.piece.status, segment: r.piece.segment || '', when: r.piece.scheduledFor ? `${r.piece.scheduledFor.date} ${r.piece.scheduledFor.time}` : '', note };
  }

  // Send back: the piece is left exactly as it is (unapproved). The note goes to capture.md for Sage.
  function sendBack(body) {
    const m = need(); const id = weekArg(body.week); const pid = pieceArg(body.piece);
    let note; try { note = cleanStr(body.note, 500); } catch (e) { throw new HttpError(400, 'note: ' + e.message); }
    if (!note) throw new HttpError(400, 'Write the note first. It is the whole point of sending it back.');
    let w; try { w = m.getWeek(id); } catch (e) { throw new HttpError(404, e.message); }
    const p = w.pieces.find((x) => x.id === pid);
    if (!p) throw new HttpError(404, `There is no piece ${pid} in week ${id}`);
    return { ok: true, capture: `Content note, ${id} ${pid}${p.segment ? ` (${p.segment})` : ''}: ${note} — Sage` };
  }

  // -> { abs, type, size } for a file that a piece in this week lists. Anything else is a 404.
  function media(weekId, file) {
    const m = need(); const id = weekArg(weekId);
    if (typeof file !== 'string' || !file || file.length > 300) throw new HttpError(400, 'Which file?');
    let w; try { w = m.getWeek(id); } catch (e) { throw new HttpError(404, 'not found'); }
    // Only files a piece lists (its media, or an alternate's) are served.
    if (!w.pieces.some((p) => (p.media || []).includes(file) || (p.alternates || []).some((alt) => (alt.media || []).includes(file)))) throw new HttpError(404, 'not found');
    let abs; try { abs = m.mediaPath(id, file); } catch (_) { throw new HttpError(404, 'not found'); }
    const type = MEDIA_MIME[path.extname(abs).toLowerCase()];
    if (!type) throw new HttpError(404, 'not found');
    let st; try { st = fs.statSync(abs); } catch (_) { throw new HttpError(404, 'not found'); }
    if (!st.isFile()) throw new HttpError(404, 'not found');
    return { abs, type, size: st.size };
  }

  // Planner: every piece in every week, flat, for the calendar view. Media is the first frame only.
  function planner() {
    const m = need(); const out = []; const R = postResults.read();
    for (const w of m.listWeeks()) {
      if (!w.hasManifest) continue;
      let wk; try { wk = m.getWeek(w.id); } catch (_) { continue; }
      for (const p of wk.pieces) {
        const first = (p.media || [])[0]; const ext = first ? path.extname(first).toLowerCase() : '';
        let exists = false; if (first) { try { exists = fs.existsSync(m.mediaPath(w.id, first)); } catch (_) {} }
        out.push({ week: w.id, id: p.id, segment: p.segment || '', type: p.type, placements: p.placements || [], status: p.status, approved: !!p.approved,
          date: p.scheduledFor ? p.scheduledFor.date : null, time: p.scheduledFor ? p.scheduledFor.time : null, when: p.when || null,
          frames: (p.media || []).length, results: postResults.forPiece(R, w.id, p), caption: ((p.caption && (p.caption.instagram || p.caption.facebook)) || '').slice(0, 280),
          thumb: first && exists ? { url: `/api/posts/media?week=${encodeURIComponent(w.id)}&file=${encodeURIComponent(first)}`, kind: ext === '.mp4' || ext === '.mov' ? 'video' : 'image' } : null });
      }
    }
    return { today: todayIso(), pieces: out, results: resultsMeta(R) };
  }

  // The header line for results: when the last read was, which feeds could not be read, and a
  // parse error in plain words. present:false means no read has ever run.
  function resultsMeta(R) {
    if (!R.present) return { present: false, error: R.error || null };
    const down = Object.entries(R.feeds || {}).filter(([, f]) => f && !f.ok).map(([k, f]) => ({ feed: k, error: f.error }));
    return { present: true, error: R.error || null, readAt: R.readAt || null, source: R.source || null, down, unmatched: (R.unmatched || []).length };
  }

  // Counts the two session buttons need: notes not yet worked (still in capture.md), and approved
  // pieces that are not yet queued or scheduled.
  function actions(id) {
    const m = need(); weekArg(id);
    let w; try { w = m.getWeek(id); } catch (e) { throw new HttpError(404, e.message); }
    const sent = notesSent(); let notes = 0;
    for (const p of w.pieces) notes += (sent.get(id + '|' + p.id) || []).filter((n) => n.pending).length;
    const toSchedule = w.pieces.filter((p) => p.status === 'approved').map((p) => p.id);
    const drafts = w.pieces.filter((p) => p.status === 'draft').map((p) => p.id);
    return { week: id, pendingNotes: notes, toSchedule, drafts };
  }

  return { weeks, week, summary, approve, sendBack, media, planner, actions, socialDir: mod ? mod.paths.SOCIAL : null };
};
