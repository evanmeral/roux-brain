// Parses my-desk (now)/BOARD.md into what the OS shows. Keyed on the H2 headings the /wrap
// command keeps fixed: Running . Now . Waiting on . Parked . Landmines . Numbers . Map.
// If a heading is missing, the section is reported missing, never invented.
'use strict';
const md = require('./md');

const EMOJI = /[\p{Extended_Pictographic}️‍]/gu;
const stripEmoji = (s) => s.replace(EMOJI, '').trim();

function keyFor(heading) {
  const t = stripEmoji(heading).toLowerCase();
  for (const k of ['running', 'now', 'waiting', 'parked', 'landmines', 'numbers', 'map']) if (t.startsWith(k)) return k;
  return t.split(/\s+/)[0] || 'other';
}

function splitSections(text) {
  const sections = [];
  let cur = null;
  for (const line of text.split('\n')) {
    const m = line.match(/^## (.+)$/);
    if (m) { cur = { heading: m[1].trim(), key: keyFor(m[1]), lines: [] }; sections.push(cur); }
    else if (cur) cur.lines.push(line);
  }
  return sections;
}

const MONEY_DAY = /\$\d[\d,]*(?:\.\d+)?\s*\/\s*day/gi;
const MONEY = /\$\d[\d,]*(?:\.\d+)?[kKM]?/g;
const DATE_WORDS = /\b(?:(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*\s+)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2}(?:\s*[–-]\s*\d{1,2})?(?:,?\s+\d{4})?\b/g;

function chipsFrom(text) {
  const plain = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '');
  const dates = (plain.match(DATE_WORDS) || []).map((s) => s.trim());
  const money = (plain.match(MONEY) || []);
  const uniq = (a) => [...new Set(a)];
  return { dates: uniq(dates).slice(0, 4), money: uniq(money).slice(0, 4) };
}

function linksFrom(text, ctx) {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let m;
  while ((m = re.exec(text))) {
    const r = md.resolveHref(m[2], ctx);
    out.push({ text: m[1].replace(/[*`]/g, ''), href: r.href, external: r.external, vaultPath: r.vaultPath || null });
  }
  return out;
}

function parseNow(section, ctx) {
  if (!section) return null;
  const body = section.lines.join('\n');
  const paras = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const items = [];
  for (const p of paras) {
    const m = p.match(/^\*\*(\d+)\.\s*([\s\S]+?)\*\*\s*([\s\S]*)$/);
    if (!m) continue;
    const rest = m[3].trim();
    const headline = m[2].replace(/\s+/g, ' ').trim();
    items.push({
      n: Number(m[1]),
      headline: headline.replace(/[*`]/g, ''),
      headlineHtml: md.inline(headline, ctx),
      bodyHtml: md.inline(rest.replace(/\s*→\s*\[[\s\S]*$/, '').trim(), ctx),
      chips: chipsFrom(m[2] + ' ' + rest),
      links: linksFrom(rest, ctx),
    });
  }
  return items;
}

function ageDays(iso, todayIso) {
  if (!iso) return null;
  const a = Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
  const b = Date.UTC(+todayIso.slice(0, 4), +todayIso.slice(5, 7) - 1, +todayIso.slice(8, 10));
  return Math.round((b - a) / 86400000);
}

function parseWaiting(section, ctx, todayIso) {
  if (!section) return null;
  const rows = section.lines.filter((l) => l.trim().startsWith('|'));
  if (rows.length < 3) return [];
  const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  return rows.slice(2).map(cells).filter((c) => c.length >= 2).map((c) => {
    const who = c[0].replace(/\*\*/g, '').trim();
    const sinceMatch = (c[2] || '').match(/\d{4}-\d{2}-\d{2}/);
    const since = sinceMatch ? sinceMatch[0] : null;
    return {
      who, whoHtml: md.inline(c[0], ctx),
      isEvan: /^evan\b/i.test(who),
      what: c[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '').trim(),
      whatHtml: md.inline(c[1], ctx),
      since, ageDays: ageDays(since, todayIso),
      links: linksFrom(c[1], ctx),
    };
  });
}

function parseRunning(section, ctx) {
  if (!section) return null;
  const subs = [];
  let cur = null;
  for (const line of section.lines) {
    const m = line.match(/^### (.+)$/);
    if (m) { cur = { title: m[1].trim(), lines: [] }; subs.push(cur); }
    else if (cur) cur.lines.push(line);
  }
  return subs.map((s) => {
    const firstLine = s.lines.find((l) => l.trim()) || '';
    // $/day from the H3 title; only if the title has none, from the first body line.
    const titleDay = s.title.match(MONEY_DAY) || [];
    const perDay = [...new Set(titleDay.length ? titleDay : (firstLine.match(MONEY_DAY) || []))];
    const all = s.title + '\n' + s.lines.join('\n');
    return {
      title: stripEmoji(s.title).replace(/[*`]/g, '').replace(/\s+/g, ' '),
      titleHtml: md.inline(stripEmoji(s.title), ctx),
      perDay: perDay.map((p) => p.replace(/\s+/g, '')),
      perDayTotal: perDay.reduce((t, p) => t + Number(p.replace(/[^\d.]/g, '')), 0),
      learning: /\blearning\b/i.test(all),
      hold: /\bhold\b/i.test(all),
      firstLineHtml: md.inline(firstLine.trim(), ctx),
      bodyHtml: md.render(s.lines.join('\n'), ctx),
    };
  });
}

// The Numbers table row that names the live daily caps, if the board still carries it.
function parseCaps(section) {
  if (!section) return null;
  const row = section.lines.find((l) => l.startsWith('|') && /daily caps?/i.test(l));
  if (!row) return null;
  const cells = row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const m = (cells[1] || '').match(/\$\d[\d,]*(?:\.\d+)?\s*\/\s*day/i);
  if (!m) return null;
  return { text: m[0].replace(/\s+/g, ''), value: Number(m[0].replace(/[^\d.]/g, '')), source: cells[2] ? cells[2].replace(/[*`]/g, '') : 'board' };
}

function parseBoard(text, ctx, todayIso) {
  const lines = text.split('\n');
  const titleLine = lines.find((l) => l.startsWith('# ')) || '';
  const title = titleLine.replace(/^# /, '').trim();
  const sections = splitSections(text);
  const byKey = {};
  for (const s of sections) if (!byKey[s.key]) byKey[s.key] = s;
  const expected = ['running', 'now', 'waiting', 'parked', 'landmines', 'numbers'];
  return {
    title,
    date: (title.match(/\d{4}-\d{2}-\d{2}/) || [null])[0],
    lineCount: lines.length,
    now: parseNow(byKey.now, ctx),
    waiting: parseWaiting(byKey.waiting, ctx, todayIso),
    running: parseRunning(byKey.running, ctx),
    caps: parseCaps(byKey.numbers),
    sections: sections.map((s) => ({ key: s.key, heading: stripEmoji(s.heading), html: md.render(s.lines.join('\n'), ctx) })),
    missing: expected.filter((k) => !byKey[k]),
  };
}

function parseKeyDates(text) {
  const rows = text.split('\n').filter((l) => l.trim().startsWith('|'));
  const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  return rows.slice(2).map(cells).filter((c) => c.length >= 2 && /^\d{4}-\d{2}-\d{2}/.test(c[0])).map((c) => ({
    date: c[0].slice(0, 10),
    what: c[1].replace(/[*`]/g, ''),
    source: (c[2] || '').replace(/[*`]/g, ''),
  }));
}

module.exports = { parseBoard, parseKeyDates, stripEmoji };
