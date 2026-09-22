// This Month's Plan tab — read-only. Splits PLAN.md into the parts the page draws: the window, the
// goal, the targets, the pace line, the bets, the week-by-week jobs, the paid-media caps, the
// scoreboard and the off-plan log. It shows what the file says. It never computes a sales figure or
// a status; the only arithmetic is dates (which week is this week) and adding the file's own
// per-campaign caps into a bar.
'use strict';
const fs = require('fs');
const path = require('path');
const md = require('./md');

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 };

module.exports = function makePlan({ desk, vault, vaultName, todayIso }) {
  const PLAN = path.join(desk, 'PLAN.md');
  const ctx = { baseDir: desk, vaultDir: vault, vaultName };
  const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const plain = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '').trim();
  const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  function sections(text) {
    const out = {}; let cur = '_head';
    out[cur] = [];
    for (const l of text.split('\n')) {
      const m = l.match(/^## (.+)$/);
      if (m) { cur = m[1].trim().toLowerCase(); out[cur] = []; continue; }
      out[cur].push(l);
    }
    return out;
  }
  function tables(lines) {
    const out = []; let cur = null;
    for (const l of lines) {
      if (l.startsWith('|')) { if (!cur) { cur = []; out.push(cur); } cur.push(cells(l)); }
      else cur = null;
    }
    return out.filter((t) => t.length >= 2).map((t) => ({ head: t[0], body: t.slice(2) }));
  }
  // "Sept 17–23", "Oct 1–7", "Sept 28–Oct 4", "Close · Oct 29–31" -> { start, end }
  function range(label, year) {
    const m = plain(label).match(/([A-Za-z]{3,4})[a-z]*\.?\s+(\d{1,2})\s*[–-]\s*(?:([A-Za-z]{3,4})[a-z]*\.?\s+)?(\d{1,2})/);
    if (!m || !MONTHS[m[1].toLowerCase()]) return null;
    const m1 = MONTHS[m[1].toLowerCase()], m2 = m[3] ? MONTHS[m[3].toLowerCase()] : m1;
    return { start: iso(year, m1, +m[2]), end: iso(year, m2, +m[4]) };
  }
  function oneDate(label, year) {
    const m = plain(label).match(/\b([A-Za-z]{3,4})[a-z]*\.?\s+(\d{1,2})\b/);
    return m && MONTHS[m[1].toLowerCase()] ? iso(year, MONTHS[m[1].toLowerCase()], +m[2]) : null;
  }
  const money = (s) => { const n = plain(s).match(/\$\s?([\d,]+(?:\.\d+)?)/g); return n ? n.map((x) => Number(x.replace(/[$,\s]/g, ''))).reduce((a, b) => a + b, 0) : 0; };
  // a jobs cell: "✅ thing (Finn) · thing · ⛔ dropped" -> items with a state
  function jobs(cell) {
    return cell.split(/\s+·\s+/).map((raw) => {
      const s = raw.trim();
      const state = /^✅/.test(s) ? 'done' : /^⛔/.test(s) ? 'dropped' : 'open';
      return { state, html: md.inline(s.replace(/^(✅|⛔)\s*/, ''), ctx) };
    }).filter((j) => j.html);
  }

  function view() {
    const today = todayIso();
    let text;
    try { text = fs.readFileSync(PLAN, 'utf8'); }
    catch (e) { return { error: e.code === 'ENOENT' ? 'There is no PLAN.md on the desk yet. /month-plan builds one.' : 'Cannot read PLAN.md: ' + e.message }; }
    const stat = fs.statSync(PLAN);
    const S = sections(text);
    const titleLine = (S._head.find((l) => l.startsWith('# ')) || '').replace(/^# /, '').trim();
    const year = Number((titleLine.match(/\b(20\d{2})\b/) || [0, today.slice(0, 4)])[1]);
    const win = range(titleLine.replace(/^Plan\s*[—-]\s*/i, '').replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\w*\s+/g, '').replace(/\s+to\s+/, '–'), year);
    const headHtml = S._head.filter((l) => l.trim() && !l.startsWith('# ')).map((l) => md.inline(l, ctx));

    const out = { today, modified: stat.mtime.toISOString(), title: titleLine, window: win, headHtml, error: null };
    out.goalHtml = md.render((S.goal || []).join('\n'), ctx);

    // targets + pace line
    const tt = tables(S.targets || []);
    const targets = tt.find((t) => /^target$/i.test(plain(t.head[0])));
    out.targets = targets ? targets.body.map((r) => ({ name: plain(r[0]).replace(/⭐.*$/, '').trim(), headline: /⭐/.test(r[0]), whatHtml: md.inline(r[1] || '', ctx), lastYear: md.inline(r[2] || '', ctx), must: md.inline(r[3] || '', ctx), stretch: md.inline(r[4] || '', ctx) })) : null;
    const tIntro = (S.targets || []).find((l) => l.trim() && !l.startsWith('|') && !l.startsWith('**Pace'));
    out.targetsNoteHtml = tIntro ? md.inline(tIntro, ctx) : '';
    const pace = tt.find((t) => /^thursday$/i.test(plain(t.head[0])));
    out.pace = pace ? { head: pace.head.slice(1).map(plain), rows: pace.body.map((r) => ({ label: plain(r[0]), date: oneDate(r[0], year), cells: r.slice(1).map(plain) })) } : null;
    const src = (S.targets || []).find((l) => /^Consumer column:/.test(l));
    out.paceSourceHtml = src ? md.inline(src, ctx) : '';

    // the bets
    out.bets = (S['the four bets'] || S['the bets'] || []).filter((l) => /^\d+\.\s/.test(l)).map((l) => {
      const body = l.replace(/^\d+\.\s*/, '');
      const m = body.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      return m ? { head: md.inline(m[1], ctx), bodyHtml: md.inline(m[2], ctx) } : { head: md.inline(body, ctx), bodyHtml: '' };
    });

    // asks
    out.asksHtml = md.render((S['needs approval — the only asks'] || S['needs approval'] || []).join('\n'), ctx);

    // weeks
    const wk = tables(S['week by week'] || [])[0];
    out.weeks = wk ? wk.body.map((r) => {
      const label = plain(r[0]);
      const rg = range(label, year);
      const n = (label.match(/^(\d+)/) || [])[1] || null;
      const gates = (r[2] || '').split(/\s+·\s+/).filter(Boolean).map((g) => ({ done: /^✅/.test(g.trim()), html: md.inline(g.trim().replace(/^✅\s*/, ''), ctx) }));
      const status = !rg ? 'unknown' : today > rg.end ? 'past' : today < rg.start ? 'future' : 'current';
      return { label, n, range: rg, status, jobs: jobs(r[1] || ''), gates };
    }) : null;
    const wkNote = (S['week by week'] || []).filter((l) => l.trim() && !l.startsWith('|'));
    out.weeksNoteHtml = wkNote.map((l) => md.inline(l, ctx)).join(' ');

    // paid media: caps table + kill rules (kill rules live on the Score tab too)
    const pm = tables(S['paid media'] || []);
    const caps = pm.find((t) => /^campaign$/i.test(plain(t.head[0])));
    if (caps) {
      const cols = caps.head.slice(1).map(plain);
      const rows = caps.body.filter((r) => !/total/i.test(plain(r[0]))).map((r) => ({ name: plain(r[0]).replace(/\s*\(.*\)\s*$/, ''), note: (plain(r[0]).match(/\((.*)\)/) || [])[1] || '', values: r.slice(1).map((c) => ({ text: plain(c), n: money(c) })) }));
      const total = caps.body.find((r) => /total/i.test(plain(r[0])));
      out.caps = { cols, rows, totals: total ? total.slice(1).map(plain) : null };
    } else out.caps = null;
    const ceil = (S['paid media'] || []).join(' ').match(/Ceiling\s*\*\*\$([\d,]+)\/day/i);
    out.ceiling = ceil ? Number(ceil[1].replace(/,/g, '')) : null;
    out.paidNoteHtml = (S['paid media'] || []).filter((l) => l.trim() && !l.startsWith('|') && !/^Ceiling/i.test(l)).map((l) => md.inline(l, ctx));

    // scoreboard (filled Thursdays)
    const sb = tables(S.scoreboard || [])[0];
    out.scoreboard = sb ? { head: sb.head.map(plain), rows: sb.body.map((r) => ({ label: plain(r[0]), date: oneDate(r[0], year), cells: r.slice(1).map((c) => md.inline(c, ctx)), filled: r.slice(1).some((c) => c && !/^(—|-|set)$/i.test(plain(c))) })) } : null;

    // off-plan log
    out.offPlan = (S['off-plan log'] || []).filter((l) => /^- /.test(l)).map((l) => md.inline(l.replace(/^- /, ''), ctx));
    out.obsidian = `obsidian://open?vault=${encodeURIComponent(vaultName)}&file=${encodeURIComponent('my-desk (now)/PLAN')}`;
    return out;
  }
  return { view };
};
