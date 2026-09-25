// Approvals queue — my-desk (now)/approvals.json is the one source of truth.
//
// Agents add items; Evan approves or rejects them on the Approvals tab, with a line note; the result
// is written back here and one line goes to capture.md so the next session sees it.
//
// ⛔ HARD RULE. An item of kind "live-write" is anything that would change Shopify, Meta or Google.
// Approving one here does NOT authorize the write. The standing rule needs Evan's explicit yes in the
// conversation where the write happens. So the OS never marks a live-write "approved": it marks it
// "queued" (shown as "Queued, confirm in session"), and the session must still ask. This module makes
// no network calls and holds no credentials. Keep it that way.
//
// File shape:
//   { "items": [ { "id": "2026-09-21-maya-1", "created": "2026-09-21", "from": "Maya",
//                  "kind": "creative|content|recommendation|rule|live-write",
//                  "recommendation": "one or two lines", "change": "the exact change",
//                  "source": "path or link", "status": "pending|approved|rejected|queued",
//                  "note": null, "resolved_at": null } ] }
//
// Agents: do not hand-edit the JSON. From the vault root run
//   node "my-workflows (automations)/live/roux-os/approvals.js" add '{"from":"Maya","kind":"creative","recommendation":"...","change":"...","source":"..."}'
//   node "my-workflows (automations)/live/roux-os/approvals.js" edit '{"id":"...","recommendation":"..."}'   (reword a pending item)
//   node "my-workflows (automations)/live/roux-os/approvals.js" list
//   Keep cards short: recommendation = one plain sentence; change = up to three short lines; evidence goes
//   in source, which the card folds under "Why · evidence" (Evan, 2026-09-25).
//   node "my-workflows (automations)/live/roux-os/approvals.js" archive      (at /wrap: moves resolved items to archive/approvals.md)
'use strict';
const fs = require('fs');
const path = require('path');
const { atomicWrite, cleanStr, readJson, HttpError } = require('./util');

const KINDS = ['creative', 'content', 'recommendation', 'rule', 'live-write'];
const LIVE_WRITE = 'live-write';
const LIVE_WRITE_WARNING = 'This does NOT authorize the write. Ask Evan for his yes in the session before changing anything in Shopify, Meta or Google.';

function makeApprovals({ desk, todayIso }) {
  const FILE = path.join(desk, 'approvals.json');
  const ARCHIVE = path.join(desk, 'archive', 'approvals.md');

  function load() {
    const r = readJson(FILE);
    if (r.error === 'missing') return { items: [] };
    if (r.error) throw new HttpError(500, 'approvals.json will not parse: ' + r.error);
    if (!r.data || !Array.isArray(r.data.items)) throw new HttpError(500, 'approvals.json has no items list');
    return r.data;
  }
  function persist(data) { atomicWrite(FILE, JSON.stringify(data, null, 2) + '\n'); }

  function view() {
    let data;
    try { data = load(); } catch (e) { return { items: [], pending: 0, error: e.message, kinds: KINDS }; }
    const order = { pending: 0, queued: 1, approved: 2, rejected: 2 };
    const items = data.items.filter((i) => i && typeof i === 'object').map((i) => ({ ...i, isLiveWrite: i.kind === LIVE_WRITE }))
      .sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3) || String(b.resolved_at || b.created || '').localeCompare(String(a.resolved_at || a.created || '')));
    return { items, pending: items.filter((i) => i.status === 'pending').length, error: null, kinds: KINDS, liveWriteWarning: LIVE_WRITE_WARNING };
  }
  function summary() { const v = view(); return { pending: v.pending, error: v.error }; }

  // body: { id, decision: 'approve' | 'reject' | 'reopen', note }
  function resolve(body) {
    if (typeof body.id !== 'string' || !body.id || body.id.length > 120) throw new HttpError(400, 'Which item?');
    if (!['approve', 'reject', 'reopen'].includes(body.decision)) throw new HttpError(400, 'approve, reject or reopen');
    let note; try { note = cleanStr(body.note, 600); } catch (e) { throw new HttpError(400, 'note: ' + e.message); }
    const data = load();
    const item = data.items.find((i) => i && i.id === body.id);
    if (!item) throw new HttpError(404, 'No item with that id');
    if (body.decision === 'reopen') {
      if (item.status === 'pending') return { ok: true, changed: false };
      item.status = 'pending'; item.resolved_at = null; item.note = null;   // the earlier note stays on record in capture.md
      persist(data);
      return { ok: true, changed: true, status: 'pending', capture: `${item.id} (${item.kind}, from ${item.from}) is pending again. Ignore the earlier result.` };
    }
    if (item.status !== 'pending') throw new HttpError(409, 'That item is already resolved. Reopen it first.');
    if (body.decision === 'reject' && !note) throw new HttpError(400, 'Say why in a line, so it is not proposed again the same way.');
    // The one place the hard rule lives: a live-write is never "approved" by the OS.
    item.status = body.decision === 'reject' ? 'rejected' : item.kind === LIVE_WRITE ? 'queued' : 'approved';
    item.note = note;
    item.resolved_at = new Date().toISOString();
    item.resolved_by = body.by === 'Evan (session)' ? 'Evan (session)' : 'Evan (OS)';
    persist(data);
    const word = { approved: 'APPROVED', rejected: 'REJECTED', queued: 'QUEUED, CONFIRM IN SESSION' }[item.status];
    const what = String(item.recommendation || '').replace(/\s+/g, ' ').slice(0, 220);
    let line = `${word} · ${item.id} (${item.kind}, from ${item.from}): ${what}${note ? ` · Evan's note: ${note}` : ''}`;
    if (item.status === 'queued') line += ` · ${LIVE_WRITE_WARNING}`;
    return { ok: true, changed: true, status: item.status, capture: line };
  }

  // ---- for agents (CLI below) ----
  function add(raw) {
    const today = todayIso();
    const need = (k, max, multi) => { const s = cleanStr(raw[k], max, multi); if (!s) throw new Error(`"${k}" is required`); return s; };
    const kind = need('kind', 20);
    if (!KINDS.includes(kind)) throw new Error('kind must be one of: ' + KINDS.join(', '));
    const from = need('from', 40);
    const data = load();
    const slug = from.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let n = 1, id;
    do { id = `${today}-${slug}-${n++}`; } while (data.items.some((i) => i.id === id));
    const item = { id, created: today, from, kind, recommendation: need('recommendation', 200), change: need('change', 500, true), source: need('source', 1200, true), status: 'pending', note: null, resolved_at: null };
    data.items.push(item);
    persist(data);
    return item;
  }
  // Reword a pending item (shorter, clearer). Resolved items are on record and are not rewritten.
  function edit(raw) {
    const data = load();
    const item = data.items.find((i) => i && i.id === raw.id);
    if (!item) throw new Error('No item with that id');
    if (item.status !== 'pending') throw new Error('Only a pending item can be reworded');
    const limits = { recommendation: [200, false], change: [500, true], source: [1200, true] };
    for (const [k, [max, multi]] of Object.entries(limits)) if (raw[k] !== undefined) { const v = cleanStr(raw[k], max, multi); if (!v) throw new Error(`"${k}" cannot be empty`); item[k] = v; }
    persist(data);
    return item;
  }
  // /wrap calls this after folding results into decisions and the board. Nothing is deleted:
  // resolved items move to archive/approvals.md as dated lines.
  function archiveResolved() {
    const data = load();
    const done = data.items.filter((i) => i.status && i.status !== 'pending');
    if (!done.length) return 0;
    fs.mkdirSync(path.dirname(ARCHIVE), { recursive: true });
    if (!fs.existsSync(ARCHIVE)) fs.writeFileSync(ARCHIVE, '# Approvals — resolved\n\n> Moved here by `/wrap` from `approvals.json`. Append-only.\n\n');
    const oneLine = (s) => String(s || '').replace(/\s+/g, ' ').trim();
    fs.appendFileSync(ARCHIVE, done.map((i) => `- **${i.status}** · ${i.id} · ${i.kind} · from ${i.from} · asked ${i.created} · resolved ${String(i.resolved_at || '').slice(0, 10)} · ${oneLine(i.recommendation)} · change: ${oneLine(i.change)} · source: ${oneLine(i.source)}${i.note ? ` · Evan's note: ${oneLine(i.note)}` : ''}\n`).join(''));
    data.items = data.items.filter((i) => !i.status || i.status === 'pending');
    persist(data);
    return done.length;
  }

  return { view, summary, resolve, add, edit, archiveResolved, FILE, KINDS };
}

module.exports = makeApprovals;
module.exports.LIVE_WRITE_WARNING = LIVE_WRITE_WARNING;

// ---- CLI ----
if (require.main === module) {
  const vault = path.resolve(__dirname, '../../..');
  const tz = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')).timezone || 'America/Chicago';
  const todayIso = () => new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const a = makeApprovals({ desk: path.join(vault, 'my-desk (now)'), todayIso });
  const [cmd, arg] = process.argv.slice(2);
  try {
    if (cmd === 'add') { const item = a.add(JSON.parse(arg || '{}')); console.log('added', item.id); }
    else if (cmd === 'edit') { const item = a.edit(JSON.parse(arg || '{}')); console.log('edited', item.id); }
    else if (cmd === 'decide') { const j = a.resolve(JSON.parse(arg || '{}')); console.log(j.status || 'unchanged'); if (j.capture) console.log(j.capture); }
    else if (cmd === 'list') { for (const i of a.view().items) console.log(`${i.status}\t${i.id}\t${i.kind}\t${String(i.recommendation).slice(0, 100)}${i.note ? `\tnote: ${i.note}` : ''}`); }
    else if (cmd === 'archive') console.log('archived', a.archiveResolved(), 'resolved item(s)');
    else { console.log('usage: approvals.js add \'<json>\' | edit \'{"id":…,"recommendation"?:…,"change"?:…,"source"?:…}\' | decide \'{"id":…,"decision":"approve|reject","note":…}\' | list | archive'); process.exit(2); }
  } catch (e) { console.error('approvals:', e.message); process.exit(1); }
}
