// Marketing Budget + Paid Media — my-business (context)/hpc-marketing-budget.json is the one source.
//
// Two lists, kept apart on purpose (Evan, 2026-09-24):
//   subscriptions  what HPC pays month to month for marketing: tools, agencies, contractors.
//                  Meta and Google ad spend never go here.
//   paidMedia      the ad platforms (Meta, Google): who runs them, the caps, and the last spend read.
// Every cost carries its source. A cost nobody has read stays null and shows "not on file"; the page
// never fills one in. Evan edits subscriptions on the page (a backup is kept per save). Paid media is
// written by Finn in a session; the page only shows it, next to the board's live Meta caps.
'use strict';
const fs = require('fs');
const path = require('path');
const { atomicWrite, rotateBackup, cleanStr, readJson, HttpError } = require('./util');

const CADENCE = ['month', 'year', 'one-time', 'per use'];
const STATUS = ['active', 'ended', 'trial', 'free'];

module.exports = function makeBudget({ vault, todayIso }) {
  const FILE = path.join(vault, 'my-business (context)', 'hpc-marketing-budget.json');
  const BACKUPS = path.join(vault, 'my-business (context)', 'backups');

  function load() {
    const r = readJson(FILE);
    if (r.error === 'missing') return { subscriptions: [], paidMedia: { channels: [] } };
    if (r.error) throw new HttpError(500, 'hpc-marketing-budget.json will not parse: ' + r.error);
    const d = r.data || {};
    d.subscriptions = Array.isArray(d.subscriptions) ? d.subscriptions : [];
    d.paidMedia = d.paidMedia && Array.isArray(d.paidMedia.channels) ? d.paidMedia : { channels: [] };
    return d;
  }
  // A monthly figure, only when the cost and cadence make one exact (yearly / 12). Otherwise null.
  const monthly = (s) => (typeof s.cost === 'number' ? (s.cadence === 'month' ? s.cost : s.cadence === 'year' ? s.cost / 12 : null) : null);

  function view(board, ceiling) {
    const d = load();
    const subs = d.subscriptions.map((s) => ({ ...s, monthly: monthly(s) }));
    const live = subs.filter((s) => s.status !== 'ended');
    const known = live.filter((s) => s.monthly !== null);
    const meta = board && Array.isArray(board.running) ? board.running.filter((r) => r.perDayTotal > 0).map((r) => ({ title: r.title, perDay: r.perDayTotal })) : [];
    return {
      updatedAt: d.updatedAt || null, note: d.note || null,
      subscriptions: subs,
      totals: { monthlyKnown: known.reduce((t, s) => t + s.monthly, 0), knownCount: known.length, unknownCount: live.filter((s) => s.monthly === null && s.cadence !== 'one-time').length, liveCount: live.length },
      paidMedia: d.paidMedia,
      metaLive: { rows: meta, perDay: board && board.caps ? board.caps.value : meta.reduce((t, r) => t + r.perDay, 0), capsSource: board && board.caps ? board.caps.source : 'summed from the board', ceiling },
    };
  }

  function clean(body, cur) {
    const out = { ...(cur || {}) };
    const str = (k, max, req) => { if (body[k] === undefined) return; let v; try { v = cleanStr(body[k], max); } catch (e) { throw new HttpError(400, `${k}: ${e.message}`); } if (req && !v) throw new HttpError(400, `${k} is needed`); out[k] = v; };
    str('name', 80, true); str('what', 240); str('owner', 60); str('source', 240); str('note', 300);
    if (body.cost !== undefined) {
      if (body.cost === null || body.cost === '') out.cost = null;
      else { const n = Number(String(body.cost).replace(/[$,\s]/g, '')); if (!isFinite(n) || n < 0 || n > 1e7) throw new HttpError(400, 'cost is a dollar amount'); out.cost = Math.round(n * 100) / 100; }
    }
    if (body.cadence !== undefined) { if (!CADENCE.includes(body.cadence)) throw new HttpError(400, 'cadence is one of ' + CADENCE.join(', ')); out.cadence = body.cadence; }
    if (body.status !== undefined) { if (!STATUS.includes(body.status)) throw new HttpError(400, 'status is one of ' + STATUS.join(', ')); out.status = body.status; }
    return out;
  }
  function write(d) {
    d.updatedAt = new Date().toISOString();
    rotateBackup(FILE, BACKUPS, 5);
    atomicWrite(FILE, JSON.stringify(d, null, 2) + '\n');
  }

  function save(body) {
    const d = load();
    if (body.id) {
      const i = d.subscriptions.findIndex((s) => s.id === body.id);
      if (i < 0) throw new HttpError(404, 'That line is not in the budget any more.');
      d.subscriptions[i] = { ...clean(body, d.subscriptions[i]), updated: `${todayIso()} · Evan (OS)` };
      write(d); return { ok: true, id: body.id };
    }
    const s = clean(body, { cadence: 'month', status: 'active', cost: null });
    if (!s.name) throw new HttpError(400, 'name is needed');
    s.id = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) + '-' + Date.now().toString(36).slice(-4);
    if (!s.source) s.source = `Evan (OS), ${todayIso()}`;
    s.updated = `${todayIso()} · Evan (OS)`;
    d.subscriptions.push(s); write(d);
    return { ok: true, id: s.id };
  }

  return { view, save, FILE };
};
