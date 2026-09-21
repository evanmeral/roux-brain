// Score tab — read-only. Shows the plan's pace line and scoreboard as PLAN.md holds them, the kill
// rules as PLAN.md states them, and the latest kill-line read if one has been dropped in.
//
// It never computes a sales figure, a status or a comparison. An empty scoreboard cell stays empty.
//
// Reads:  my-desk (now)/PLAN.md                 (tables under "**Pace line**", "## Scoreboard", "## Paid media")
//         my-desk (now)/pulse/kill-lines.json   (optional drop-in, written by the Thursday scoreboard task)
//           { "read_at": "2026-09-24", "source": "Meta connector + Shopify, Finn", "window": "last 14 days",
//             "rows": [ { "name": "ad or campaign", "id": "...", "metric": "Meta cost per purchase",
//                         "value": "$52.62", "kill_at": "> $189", "status": "under", "note": "" } ] }
'use strict';
const fs = require('fs');
const path = require('path');
const md = require('./md');
const { readJson, daysBetween } = require('./util');

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 };

module.exports = function makeScore({ desk, vault, vaultName, todayIso }) {
  const PLAN = path.join(desk, 'PLAN.md');
  const KILL = path.join(desk, 'pulse', 'kill-lines.json');
  const ctx = { baseDir: desk, vaultDir: vault, vaultName };
  const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const plain = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '').trim();

  // The markdown table starting at line i (header, separator, body).
  function tableAt(lines, i) {
    const rows = [];
    while (i < lines.length && lines[i].startsWith('|')) rows.push(cells(lines[i++]));
    return rows.length >= 2 ? { head: rows[0], body: rows.slice(2) } : null;
  }
  // The first table after the first line matching `after`, stopping at the next H2.
  function tableAfter(lines, after) {
    const start = lines.findIndex((l) => after.test(l));
    if (start < 0) return null;
    let i = start + 1;
    while (i < lines.length && !lines[i].startsWith('|')) { if (/^## /.test(lines[i])) return null; i++; }
    return tableAt(lines, i);
  }
  // "Sept 24", "Oct 31 (final, ...)", "**Oct 30 close-out**" -> 2026-09-24, using the plan's year.
  function rowDate(label, year) {
    const m = plain(label).match(/\b([A-Za-z]{3,4})[a-z]*\.?\s+(\d{1,2})\b/);
    if (!m || !MONTHS[m[1].toLowerCase()]) return null;
    return `${year}-${String(MONTHS[m[1].toLowerCase()]).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
  }

  function view() {
    const today = todayIso();
    const out = { today, error: null, planTitle: null, pace: null, paceSource: null, scoreboard: null, anyScore: false, nextScore: null, killRules: null, killRead: { present: false } };
    let text;
    try { text = fs.readFileSync(PLAN, 'utf8'); }
    catch (e) { out.error = e.code === 'ENOENT' ? 'There is no PLAN.md on the desk.' : 'Cannot read PLAN.md: ' + e.message; return out; }
    const lines = text.split('\n');
    out.planTitle = (lines.find((l) => l.startsWith('# ')) || '').replace(/^# /, '').trim();
    const year = (out.planTitle.match(/\b(20\d{2})\b/) || [null, today.slice(0, 4)])[1];

    const pace = tableAfter(lines, /^\*\*Pace line\*\*/);
    if (pace) {
      out.pace = { head: pace.head.map(plain), rows: pace.body.map((r) => ({ label: plain(r[0]), date: rowDate(r[0], year), cells: r.slice(1).map(plain) })) };
      const src = lines.find((l) => /^Consumer column:/.test(l));
      out.paceSource = src ? md.inline(src, ctx) : null;
    }
    const sb = tableAfter(lines, /^## Scoreboard/);
    if (sb) {
      out.scoreboard = { head: sb.head.map(plain), rows: sb.body.map((r) => ({ label: plain(r[0]), date: rowDate(r[0], year), cells: r.slice(1).map((c) => md.inline(c, ctx)), filled: r.slice(1).some((c) => c && !/^(—|-|set)$/i.test(plain(c))) })) };
      out.anyScore = out.scoreboard.rows.some((r) => r.filled);
      const next = out.scoreboard.rows.find((r) => r.date && !r.filled && daysBetween(today, r.date) >= 0) || null;
      out.nextScore = next ? { label: next.label, date: next.date, daysOut: daysBetween(today, next.date) } : null;
    }
    const killAt = lines.findIndex((l) => /^\| Campaign or ad \|/.test(l));
    const kill = killAt >= 0 ? tableAt(lines, killAt) : null;
    if (kill) out.killRules = { head: kill.head.map(plain), rows: kill.body.map((r) => r.map((c) => md.inline(c, ctx))) };

    const k = readJson(KILL);
    if (k.error && k.error !== 'missing') out.killRead = { present: false, error: 'kill-lines.json will not parse: ' + k.error };
    else if (k.data && Array.isArray(k.data.rows)) {
      const s = (v) => (v == null ? '' : String(v).slice(0, 300));
      out.killRead = { present: true, read_at: s(k.data.read_at), source: s(k.data.source), window: s(k.data.window), rows: k.data.rows.filter((r) => r && typeof r === 'object').slice(0, 60).map((r) => ({ name: s(r.name), id: s(r.id), metric: s(r.metric), value: s(r.value), kill_at: s(r.kill_at), status: s(r.status), note: s(r.note) })) };
    }
    return out;
  }

  return { view };
};
