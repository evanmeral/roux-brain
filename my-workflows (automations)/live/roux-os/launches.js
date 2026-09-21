// Launch checklist — reads and ticks my-desk (now)/launches.md.
//
// The file is plain markdown so Evan and the agents can read and edit it:
//
//   ## Tailgate kit live · 2026-09-25
//   > an optional note line (or several)
//   - [ ] the gate · **Owner** · due 2026-09-24 · _source: where this came from_
//   - [x] a finished gate · **Owner** · due 2026-09-24 · _source: ..._ · done 2026-09-23
//
// A tick from the page flips that one checkbox (and adds or removes "· done <date>"). Nothing else
// in the file is touched. The OS owns this file; it still never writes BOARD.md, PLAN.md or decisions.md.
'use strict';
const fs = require('fs');
const path = require('path');
const md = require('./md');
const { atomicWrite, isIsoDate, daysBetween, HttpError } = require('./util');

const H2 = /^## (.+?)\s*$/;
const GATE = /^- \[( |x|X)\] (.+)$/;

module.exports = function makeLaunches({ desk, vault, vaultName, todayIso }) {
  const FILE = path.join(desk, 'launches.md');
  const ctx = { baseDir: desk, vaultDir: vault, vaultName };

  function parseGate(body) {
    const g = { text: body, owner: null, due: null, source: null, doneOn: null };
    const keep = [];
    for (const part of body.split(' · ')) {
      let m;
      if ((m = part.match(/^\*\*(.+)\*\*$/))) g.owner = m[1];
      else if ((m = part.match(/^due (\d{4}-\d{2}-\d{2})$/)) && isIsoDate(m[1])) g.due = m[1];
      else if ((m = part.match(/^_source: (.+)_$/))) g.source = m[1];
      else if ((m = part.match(/^done (\d{4}-\d{2}-\d{2})$/))) g.doneOn = m[1];
      else keep.push(part);
    }
    g.text = keep.join(' · ');
    return g;
  }

  function parse(text, today) {
    const launches = [];
    let cur = null;
    text.split('\n').forEach((line, lineNo) => {
      let m;
      if ((m = line.match(H2))) {
        const t = m[1];
        const dm = t.match(/\s*·\s*(\d{4}-\d{2}-\d{2})\s*$/);
        const date = dm && isIsoDate(dm[1]) ? dm[1] : null;
        cur = { title: (dm ? t.slice(0, dm.index) : t).trim(), date, daysOut: date ? daysBetween(today, date) : null, notes: [], gates: [] };
        launches.push(cur);
      } else if (cur && (m = line.match(GATE))) {
        const g = parseGate(m[2]);
        cur.gates.push({
          ...g, done: m[1] !== ' ', line: lineNo, raw: line,
          textHtml: md.inline(g.text, ctx),
          overdue: m[1] === ' ' && !!g.due && daysBetween(g.due, today) > 0,
          dueIn: g.due ? daysBetween(today, g.due) : null,
        });
      } else if (cur && line.startsWith('>')) cur.notes.push(line.replace(/^>\s?/, ''));
    });
    for (const l of launches) { l.noteHtml = l.notes.length ? md.inline(l.notes.join(' '), ctx) : ''; delete l.notes; l.open = l.gates.filter((g) => !g.done).length; }
    return launches;
  }

  function view() {
    const today = todayIso();
    let text;
    try { text = fs.readFileSync(FILE, 'utf8'); }
    catch (e) { return { today, launches: [], error: e.code === 'ENOENT' ? 'launches.md is missing' : 'Cannot read launches.md: ' + e.message }; }
    return { today, launches: parse(text, today), error: null };
  }

  function summary() {
    const v = view();
    if (v.error) return { error: v.error };
    const ahead = v.launches.filter((l) => l.date && l.daysOut >= 0).sort((a, b) => a.daysOut - b.daysOut);
    const next = ahead[0] || null;
    return {
      error: null, count: v.launches.length,
      next: next ? { title: next.title, date: next.date, daysOut: next.daysOut, open: next.open, total: next.gates.length } : null,
      overdue: v.launches.reduce((n, l) => n + l.gates.filter((g) => g.overdue).length, 0),
    };
  }

  // body: { line, raw, done }. `raw` is the exact line the page was showing; if the file has moved on
  // since then the tick is refused, so a stale page can never tick the wrong gate.
  function tick(body) {
    if (!Number.isInteger(body.line) || body.line < 0 || typeof body.raw !== 'string' || body.raw.length > 2000 || typeof body.done !== 'boolean') throw new HttpError(400, 'Bad tick request');
    let text;
    try { text = fs.readFileSync(FILE, 'utf8'); } catch (e) { throw new HttpError(500, 'Cannot read launches.md: ' + e.message); }
    const lines = text.split('\n');
    const line = lines[body.line];
    const m = line !== undefined && line.match(GATE);
    if (!m || line !== body.raw) throw new HttpError(409, 'launches.md changed since the page loaded. It has refreshed; try again.');
    const isDone = m[1] !== ' ';
    if (isDone === body.done) return { ok: true, changed: false };
    let rest = m[2].replace(/ · done \d{4}-\d{2}-\d{2}$/, '');
    if (body.done) rest += ` · done ${todayIso()}`;
    lines[body.line] = `- [${body.done ? 'x' : ' '}] ${rest}`;
    atomicWrite(FILE, lines.join('\n'));
    // Which launch is this gate under? Walk up to the nearest H2.
    let title = '';
    for (let i = body.line; i >= 0; i--) { const h = lines[i].match(H2); if (h) { title = h[1].replace(/\s*·\s*\d{4}-\d{2}-\d{2}\s*$/, '').trim(); break; } }
    const gate = parseGate(rest).text.replace(/[*`]/g, '');
    return { ok: true, changed: true, done: body.done, launch: title, gate };
  }

  return { view, summary, tick, FILE };
};
