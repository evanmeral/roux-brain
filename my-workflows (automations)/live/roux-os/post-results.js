// Post results — how each organic FB/IG post did after it ran (reach, views, likes, comments,
// shares, saves), shown on the Planner and Posts cards. Proposal p-2026-09-24-post-results.
//
// WHERE THE NUMBERS COME FROM. The Meta Ads connector cannot read organic results (tested
// 2026-09-24: ads_get_ig_accounts returns [] for both ad accounts, so ads_get_ig_media cannot be
// called; the insights fields reach / post_shares / page_engagement are ad-attributed only;
// post_saves, post_comments, post_reactions, organic_reach are unknown fields; there is no Page-post
// read at all). So a button-started session reads Meta Business Suite → Content → Posts & reels
// (Published), read-only, through Claude in Chrome, and hands the rows to this script.
// Runbook: my-skills/content-week/post-results.md.
//
// This file never reaches Meta. It only matches rows to pieces and writes one JSON file:
//   my-desk (now)/pulse/post-results.json
//
// CLI (the session runs this):
//   node post-results.js write <rows.json>    match rows to schedule.json pieces, write the file
//   node post-results.js show                 print what the page will show, per piece
//
// rows.json shape (the session writes it to its scratchpad):
// {
//   "readAt": "2026-09-24T14:07:00-05:00",
//   "source": "Business Suite → Content → Posts & reels, Published, Last 90 days",
//   "feeds": { "facebook": { "ok": true }, "instagram": { "ok": true },
//              "stories": { "ok": false, "error": "why it could not be read" } },
//   "rows": [ { "platform": "facebook" | "instagram", "kind": "post" | "story",
//               "published": "2026-09-21 12:00",     // Central, 24h, as Business Suite shows it
//               "caption": "first words…", "postId": "optional",
//               "reach": 213, "views": 313, "interactions": 0, "likes": 0,
//               "comments": 0, "shares": 0, "saves": 0 } ]   // "‑‑" or missing → null, never 0
// }
'use strict';
const fs = require('fs');
const path = require('path');
const { atomicWrite } = require('./util');

const VAULT = path.resolve(__dirname, '../../..');
const FILE = path.join(VAULT, 'my-desk (now)', 'pulse', 'post-results.json');
const METRICS = ['reach', 'views', 'interactions', 'likes', 'comments', 'shares', 'saves'];
const PLATFORMS = ['facebook', 'instagram'];
const MATCH_MINUTES = 10; // a published time within this of the scheduled time is the same post

// "221" → 221; "‑‑", "--", "", null, "n/a" → null. A dash is "not reported", never zero.
function num(v) {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v !== 'string') return null;
  const s = v.replace(/,/g, '').trim();
  if (!/^\d+(\.\d+)?[KkMm]?$/.test(s)) return null;
  const mult = /k$/i.test(s) ? 1e3 : /m$/i.test(s) ? 1e6 : 1;
  return Math.round(parseFloat(s) * mult);
}
const minutes = (date, time) => { const [h, m] = time.split(':').map(Number); return Date.UTC(...date.split('-').map((x, i) => (i === 1 ? Number(x) - 1 : Number(x)))) / 60000 + h * 60 + m; };

// The pieces a row can belong to: every scheduled piece in every week manifest.
function allPieces() {
  const sched = require('../post-scheduler');
  const out = [];
  for (const w of sched.listWeeks()) {
    if (!w.hasManifest) continue;
    let wk; try { wk = sched.getWeek(w.id); } catch (_) { continue; }
    for (const p of wk.pieces) if (p.scheduledFor && p.status !== 'dropped') out.push({ week: w.id, id: p.id, type: p.type, segment: p.segment || '', placements: p.placements || [], date: p.scheduledFor.date, time: p.scheduledFor.time, iso: p.scheduledFor.iso || null });
  }
  return out;
}

// rows.json → post-results.json. Returns the written object.
function write(input) {
  if (!input || !Array.isArray(input.rows)) throw new Error('rows.json needs a "rows" array');
  if (!input.readAt || Number.isNaN(Date.parse(input.readAt))) throw new Error('rows.json needs "readAt" as an ISO time');
  const feeds = {};
  for (const k of ['facebook', 'instagram', 'stories']) {
    const f = (input.feeds || {})[k];
    feeds[k] = f && f.ok ? { ok: true, error: null } : { ok: false, error: (f && f.error) || 'not read' };
  }
  const pieces = allPieces();
  const results = {}; const unmatched = [];
  for (const r of input.rows) {
    const platform = String(r.platform || '').toLowerCase(); const kind = r.kind === 'story' ? 'story' : 'post';
    const m = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})$/.exec(String(r.published || '').trim());
    const numbers = Object.fromEntries(METRICS.map((k) => [k, num(r[k])]));
    const row = { platform, kind, published: r.published || null, caption: String(r.caption || '').slice(0, 90), postId: r.postId || null, ...numbers };
    if (!PLATFORMS.includes(platform) || !m) { unmatched.push({ ...row, why: 'platform or published time not readable' }); continue; }
    const t = minutes(m[1], m[2]);
    const hit = pieces.filter((p) => p.placements.includes(platform) && (p.type === 'story') === (kind === 'story') && Math.abs(minutes(p.date, p.time) - t) <= MATCH_MINUTES);
    if (hit.length !== 1) { unmatched.push({ ...row, why: hit.length ? `matches ${hit.length} pieces (${hit.map((p) => p.week + ' ' + p.id).join(', ')})` : 'no piece in a week plan at that time' }); continue; }
    const key = hit[0].week + '|' + hit[0].id;
    (results[key] = results[key] || {})[platform] = row;
  }
  // Pieces that had run by the read, on a feed that was read, with no row: say so rather than show nothing.
  const readMin = Date.parse(input.readAt) / 60000; const notFound = [];
  const ranBy = (p) => p.iso && Date.parse(p.iso) / 60000 <= readMin; // scheduledFor.iso carries the Central offset
  for (const p of pieces) {
    if (!ranBy(p)) continue;
    const feedOk = (plat) => (p.type === 'story' ? feeds.stories.ok : feeds[plat].ok);
    for (const plat of p.placements) {
      if (!PLATFORMS.includes(plat)) continue;
      const key = p.week + '|' + p.id;
      if (results[key] && results[key][plat]) continue;
      if (feedOk(plat)) notFound.push({ key, platform: plat });
    }
  }
  const out = { schema: 1, readAt: input.readAt, source: input.source || 'Meta Business Suite → Content (Claude in Chrome, read-only)', by: input.by || 'post-results session', feeds, results, notFound, unmatched, writtenAt: new Date().toISOString() };
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  atomicWrite(FILE, JSON.stringify(out, null, 2) + '\n');
  return out;
}

// What the server hands the page. present:false = never read (the page shows nothing on cards).
function read() {
  let text; try { text = fs.readFileSync(FILE, 'utf8'); } catch (e) { return { present: false, error: e.code === 'ENOENT' ? null : e.message }; }
  try { const j = JSON.parse(text); return { present: true, error: null, ...j }; }
  catch (e) { return { present: true, error: 'post-results.json will not parse: ' + e.message, results: {}, feeds: {}, notFound: [] }; }
}

// Per piece, per platform, what to show: numbers, "not found in the read", or the feed's error.
// Returns null when there is nothing to say (never read, or the piece had not run by the read).
function forPiece(R, week, piece) {
  if (!R || !R.present) return null;
  if (R.error) return { error: R.error };
  const key = week + '|' + piece.id; const got = (R.results || {})[key] || {};
  const nf = new Set((R.notFound || []).filter((n) => n.key === key).map((n) => n.platform));
  const readDate = String(R.readAt || '').slice(0, 10);
  const out = {}; let any = false;
  for (const plat of (piece.placements || []).filter((x) => PLATFORMS.includes(x))) {
    if (got[plat]) { out[plat] = Object.fromEntries(METRICS.map((k) => [k, got[plat][k]])); any = true; continue; }
    if (nf.has(plat)) { out[plat] = { missing: true }; any = true; continue; }
    const feed = piece.type === 'story' ? (R.feeds || {}).stories : (R.feeds || {})[plat];
    const ran = piece.scheduledFor && piece.scheduledFor.iso && Date.parse(piece.scheduledFor.iso) <= Date.parse(R.readAt);
    if (ran && feed && !feed.ok) { out[plat] = { error: feed.error || 'not read' }; any = true; }
  }
  return any ? { readAt: R.readAt, readDate, platforms: out } : null;
}

module.exports = { FILE, METRICS, read, write, forPiece, num };

if (require.main === module) {
  const [cmd, arg] = process.argv.slice(2);
  try {
    if (cmd === 'write') {
      if (!arg) throw new Error('usage: node post-results.js write <rows.json>');
      const out = write(JSON.parse(fs.readFileSync(arg, 'utf8')));
      const n = Object.values(out.results).reduce((a, r) => a + Object.keys(r).length, 0);
      console.log(`wrote ${FILE}\n${n} post reads matched to ${Object.keys(out.results).length} pieces · ${out.notFound.length} ran but not found · ${out.unmatched.length} rows unmatched`);
      for (const u of out.unmatched) console.log(`  unmatched: ${u.platform} ${u.published} "${u.caption.slice(0, 40)}" — ${u.why}`);
      for (const [k, f] of Object.entries(out.feeds)) if (!f.ok) console.log(`  feed not read: ${k} — ${f.error}`);
    } else if (cmd === 'show') {
      const R = read(); if (!R.present) { console.log('no post-results.json yet'); process.exit(0); }
      if (R.error) { console.log(R.error); process.exit(1); }
      for (const [k, v] of Object.entries(R.results)) for (const [plat, r] of Object.entries(v)) console.log(`${k} ${plat}: ` + METRICS.map((m) => `${m} ${r[m] === null ? '—' : r[m]}`).join(' · '));
    } else { console.log('usage: node post-results.js write <rows.json> | show'); process.exit(2); }
  } catch (e) { console.error('post-results: ' + e.message); process.exit(1); }
}
