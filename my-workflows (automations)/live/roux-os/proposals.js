// ROUX's Proposals — ideas ROUX has for making the system better. my-desk (now)/proposals.json.
//
// Each idea: what it is, what it would do, and what it costs (with a source for any price). Sorted
// into "free" and "paid". Evan answers on the page: Yes (build it), Later, or No, with a line note.
// The answer goes to capture.md so the next session acts on it. A Yes on a paid item is never a
// purchase: buying anything stays Evan's click. Nothing here buys, installs or connects anything.
//
// Shape: { "items": [ { "id", "added", "category": "free|paid", "area", "title", "what", "does",
//          "cost", "costSource", "status": "new|yes|later|no", "note", "decided" } ] }
// ROUX adds ideas in a session by editing the JSON (new ids, status "new"); /wrap folds decided ones.
'use strict';
const path = require('path');
const { atomicWrite, cleanStr, readJson, HttpError } = require('./util');

const DECISIONS = { yes: 'yes', later: 'later', no: 'no', reopen: 'new' };

module.exports = function makeProposals({ desk, todayIso }) {
  const FILE = path.join(desk, 'proposals.json');
  function load() {
    const r = readJson(FILE);
    if (r.error === 'missing') return { items: [] };
    if (r.error) throw new HttpError(500, 'proposals.json will not parse: ' + r.error);
    return { ...r.data, items: Array.isArray(r.data.items) ? r.data.items : [] };
  }
  function view() { const d = load(); return { items: d.items, updatedAt: d.updatedAt || null }; }
  function summary() { try { return { waiting: load().items.filter((i) => (i.status || 'new') === 'new').length }; } catch (e) { return { error: e.message }; } }

  function decide(body) {
    const d = load();
    const it = d.items.find((i) => i.id === body.id);
    if (!it) throw new HttpError(404, 'That proposal is not on file any more.');
    const status = DECISIONS[body.decision];
    if (!status) throw new HttpError(400, 'Decide yes, later or no.');
    let note; try { note = cleanStr(body.note, 400); } catch (e) { throw new HttpError(400, 'note: ' + e.message); }
    if (body.decision === 'no' && !note) throw new HttpError(400, 'Say why in a line, so it is not proposed again the same way.');
    it.status = status; it.note = status === 'new' ? null : note || null; it.decided = status === 'new' ? null : todayIso();
    d.updatedAt = new Date().toISOString();
    atomicWrite(FILE, JSON.stringify(d, null, 2) + '\n');
    const word = { yes: 'YES, build it', later: 'LATER', no: 'NO', new: 'reopened' }[status];
    const capture = `Proposal ${word}: "${it.title}" (${it.category}${it.cost ? ', ' + it.cost : ''})${note ? ` · Evan's note: ${note}` : ''}${status === 'yes' && it.category === 'paid' ? ' · A yes is not a purchase; Evan buys it himself.' : ''} — Nova`;
    return { ok: true, status, changed: true, capture };
  }
  return { view, summary, decide, FILE };
};
