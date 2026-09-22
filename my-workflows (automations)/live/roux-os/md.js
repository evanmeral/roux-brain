// Minimal markdown -> HTML for the board's dialect: headings, hr, blockquotes, bullets,
// tables, paragraphs; inline bold, italics, code, links. Relative links become Obsidian links.
'use strict';
const path = require('path');

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ctx: { baseDir (folder the markdown file lives in), vaultDir, vaultName }
function resolveHref(href, ctx) {
  if (/^(https?:|mailto:|obsidian:)/i.test(href)) return { href, external: /^https?:/i.test(href) };
  let clean = href.split('#')[0];
  try { clean = decodeURIComponent(clean); } catch (_) {}
  if (!clean) return { href: '#', external: false };
  const abs = path.resolve(ctx.baseDir, clean);
  const rel = path.relative(ctx.vaultDir, abs);
  if (rel.startsWith('..')) return { href: 'file://' + abs, external: true };
  const noExt = rel.replace(/\.md$/i, '');
  return {
    href: 'obsidian://open?vault=' + encodeURIComponent(ctx.vaultName) + '&file=' + encodeURIComponent(noExt),
    external: false,
    vaultPath: rel,
  };
}

const CODE_OPEN = '', CODE_CLOSE = '';
const CODE_RE = new RegExp(CODE_OPEN + '(\\d+)' + CODE_CLOSE, 'g');

function inline(text, ctx) {
  const codes = [];
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return CODE_OPEN + (codes.length - 1) + CODE_CLOSE; });
  s = s.replace(/\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g, (_, t, u) => {   // one level of (parens) in a link: the vault's folder names have them
    const r = resolveHref(u, ctx);
    const tgt = r.external ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + escapeHtml(r.href) + '"' + tgt + '>' + t + '</a>';
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  s = s.replace(CODE_RE, (_, i) => '<code>' + codes[Number(i)] + '</code>');
  return s;
}

function renderTable(rows, ctx) {
  const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells);
  let h = '<table><thead><tr>' + head.map((c) => '<th>' + inline(c, ctx) + '</th>').join('') + '</tr></thead><tbody>';
  for (const r of body) h += '<tr>' + r.map((c) => '<td>' + inline(c, ctx) + '</td>').join('') + '</tr>';
  return h + '</tbody></table>';
}

function render(mdText, ctx) {
  const lines = mdText.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (/^---+\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { const lvl = h[1].length; out.push('<h' + lvl + '>' + inline(h[2], ctx) + '</h' + lvl + '>'); i++; continue; }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      if (rows.length >= 2) out.push(renderTable(rows, ctx)); else out.push('<p>' + inline(rows.join(' '), ctx) + '</p>');
      continue;
    }
    if (line.startsWith('>')) {
      const q = [];
      while (i < lines.length && lines[i].startsWith('>')) q.push(lines[i++].replace(/^>\s?/, ''));
      out.push('<blockquote>' + render(q.join('\n'), ctx) + '</blockquote>');
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (/^\s*[-*]\s+/.test(lines[i])) items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        else items[items.length - 1] += ' ' + lines[i].trim();
        i++;
      }
      out.push('<ul>' + items.map((t) => '<li>' + inline(t, ctx) + '</li>').join('') + '</ul>');
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|---+\s*$|\||>|\s*[-*]\s+)/.test(lines[i])) para.push(lines[i++]);
    out.push('<p>' + inline(para.join(' '), ctx) + '</p>');
  }
  return out.join('\n');
}

module.exports = { render, inline, escapeHtml, resolveHref };
