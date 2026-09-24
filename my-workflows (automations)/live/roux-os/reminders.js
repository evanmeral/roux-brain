// Reminders — short notes for Evan, shown on Home. my-desk (now)/reminders.md is the one source of truth.
//
// One line per reminder:   - [ ] Set the tailgate kit active · added 2026-09-24 by ROUX
//                          - [x] ... (done; /wrap moves done lines to archive/reminders.md)
// Evan adds from the Home widget ("Add Note") and ticks them off there. ROUX adds them in a session
// by appending a line in the same shape. Nothing here sends anything or touches a live system.
'use strict';
const fs = require('fs');
const path = require('path');
const { atomicWrite, cleanStr, HttpError } = require('./util');

const HEADER = `# Reminders — for Evan

> Short notes shown on ROUX OS Home. Evan adds them there ("Add Note"); ROUX adds them in a session.
> \`- [ ]\` open · \`- [x]\` done. \`/wrap\` moves done lines to \`archive/reminders.md\`. Never delete a line by hand.

`;
const LINE = /^- \[( |x)\] (.+?)(?: · added (\d{4}-\d{2}-\d{2})(?: by (.+))?)?\s*$/;

module.exports = function makeReminders({ desk, todayIso }) {
  const FILE = path.join(desk, 'reminders.md');

  function read() { try { return fs.readFileSync(FILE, 'utf8'); } catch (e) { if (e.code === 'ENOENT') return null; throw new HttpError(500, 'Cannot read reminders.md: ' + e.message); } }

  function view() {
    const text = read();
    if (text === null) return { items: [], missing: true };
    const items = [];
    text.split('\n').forEach((l, i) => {
      const m = LINE.exec(l);
      if (m) items.push({ line: i, done: m[1] === 'x', text: m[2].trim(), added: m[3] || null, by: m[4] ? m[4].trim() : null });
    });
    return { items, missing: false };
  }

  function add(body) {
    let text; try { text = cleanStr(body.text, 200); } catch (e) { throw new HttpError(400, 'Reminder: ' + e.message); }
    if (!text) throw new HttpError(400, 'Type the reminder first.');
    const line = `- [ ] ${text.replace(/ · added .*/, '')} · added ${todayIso()} by Evan (OS)\n`;
    const cur = read();
    if (cur === null) atomicWrite(FILE, HEADER + line);
    else atomicWrite(FILE, cur.replace(/\n*$/, '\n') + line);
    return { ok: true, text };
  }

  // Tick or untick by line number, checked against the text so a stale page cannot tick the wrong line.
  function toggle(body) {
    const cur = read(); if (cur === null) throw new HttpError(404, 'There is no reminders.md yet.');
    const lines = cur.split('\n'); const i = Number(body.line);
    const m = Number.isInteger(i) ? LINE.exec(lines[i] || '') : null;
    if (!m || m[2].trim() !== String(body.text || '').trim()) throw new HttpError(409, 'That reminder changed since the page loaded. It has been refreshed; try again.');
    const done = body.done === undefined ? m[1] !== 'x' : !!body.done;
    lines[i] = lines[i].replace(/^- \[( |x)\]/, done ? '- [x]' : '- [ ]');
    atomicWrite(FILE, lines.join('\n'));
    return { ok: true, done, text: m[2].trim() };
  }

  // Remove: the line leaves reminders.md and goes to archive/reminders.md with the date, so nothing is lost.
  function remove(body) {
    const cur = read(); if (cur === null) throw new HttpError(404, 'There is no reminders.md yet.');
    const lines = cur.split('\n'); const i = Number(body.line);
    const m = Number.isInteger(i) ? LINE.exec(lines[i] || '') : null;
    if (!m || m[2].trim() !== String(body.text || '').trim()) throw new HttpError(409, 'That reminder changed since the page loaded. It has been refreshed; try again.');
    const arch = path.join(desk, 'archive', 'reminders.md');
    fs.mkdirSync(path.dirname(arch), { recursive: true });
    if (!fs.existsSync(arch)) fs.writeFileSync(arch, '# Reminders — archive\n\n> Done or removed reminders, moved here from reminders.md. Append-only.\n\n');
    fs.appendFileSync(arch, `${lines[i]} · removed ${todayIso()} by Evan (OS)\n`);
    lines.splice(i, 1);
    atomicWrite(FILE, lines.join('\n'));
    return { ok: true, text: m[2].trim() };
  }

  return { view, add, toggle, remove, FILE };
};
