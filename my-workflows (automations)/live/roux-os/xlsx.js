// Minimal .xlsx reader — the first worksheet as rows of strings. No dependency, no network: an .xlsx is
// a zip of XML files, and Node's built-in zlib inflates them.
//
// Written for UpPromote's exports (2026-09-21): one sheet, cells as inline strings or plain numbers,
// no date number formats. It also handles shared strings, booleans and formula results, so an export
// re-saved from Excel or Numbers still reads. It does NOT convert Excel date serials: a date cell that
// Excel stored as a number comes back as that number, as text (the mapper keeps it as-is, never guessed).
//
// Guards: refuses encrypted or multi-disk zips, caps every inflated part (zip-bomb guard), caps rows.
'use strict';
const zlib = require('zlib');

const MAX_PART = 64 * 1024 * 1024;    // largest single XML part we will inflate

// ---- zip ----
function readZip(buf) {
  // End of central directory: signature 0x06054b50, within the last 64 KB + 22 bytes
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('not a zip file');
  const count = buf.readUInt16LE(eocd + 10), cdOff = buf.readUInt32LE(eocd + 16);
  const entries = new Map();
  let p = cdOff;
  for (let n = 0; n < count; n++) {
    if (p + 46 > buf.length || buf.readUInt32LE(p) !== 0x02014b50) throw new Error('damaged zip directory');
    const flags = buf.readUInt16LE(p + 8), method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20), usize = buf.readUInt32LE(p + 24);
    const nlen = buf.readUInt16LE(p + 28), xlen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    entries.set(name, { flags, method, csize, usize, local });
    p += 46 + nlen + xlen + clen;
  }
  return {
    has: (name) => entries.has(name),
    text(name) {
      const e = entries.get(name);
      if (!e) return null;
      if (e.flags & 1) throw new Error('the file is password-protected');
      if (e.usize > MAX_PART) throw new Error('a part of the file is too large');
      const l = e.local;
      if (buf.readUInt32LE(l) !== 0x04034b50) throw new Error('damaged zip entry');
      const start = l + 30 + buf.readUInt16LE(l + 26) + buf.readUInt16LE(l + 28);
      const raw = buf.subarray(start, start + e.csize);
      if (e.method === 0) return raw.toString('utf8');
      if (e.method === 8) return zlib.inflateRawSync(raw, { maxOutputLength: MAX_PART }).toString('utf8');
      throw new Error('unsupported zip compression');
    },
  };
}

// ---- xml bits ----
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, e) => {
  if (e[0] === '#') { const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); try { return String.fromCodePoint(cp); } catch (_) { return ''; } }
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[e.toLowerCase()];
});
// all <t> text inside a fragment (a rich-text string is several <r><t> runs), phonetic <rPh> runs dropped
const textOf = (frag) => { let s = ''; frag.replace(/<rPh\b[\s\S]*?<\/rPh>/g, '').replace(/<t\b[^>]*>([\s\S]*?)<\/t>|<t\b[^>]*\/>/g, (_, t) => { s += t ? decode(t) : ''; return ''; }); return s; };
const attr = (tag, name) => { const m = new RegExp('\\s' + name + '="([^"]*)"').exec(tag); return m ? decode(m[1]) : null; };
const colIndex = (ref) => { const m = /^([A-Z]+)/.exec(ref || ''); if (!m) return -1; let n = 0; for (const ch of m[1]) n = n * 26 + (ch.charCodeAt(0) - 64); return n - 1; };

// First worksheet path, by the workbook's own order (falls back to sheet1.xml)
function firstSheet(zip) {
  const wb = zip.text('xl/workbook.xml') || '';
  const rels = zip.text('xl/_rels/workbook.xml.rels') || '';
  const sheet = /<sheet\b[^>]*>/.exec(wb);
  const rid = sheet && (attr(sheet[0], 'r:id') || attr(sheet[0], 'id'));
  if (rid) {
    for (const m of rels.matchAll(/<Relationship\b[^>]*>/g)) {
      if (attr(m[0], 'Id') !== rid) continue;
      let t = attr(m[0], 'Target') || '';
      t = t.startsWith('/') ? t.slice(1) : 'xl/' + t.replace(/^\.\//, '');
      if (zip.has(t)) return t;
    }
  }
  if (zip.has('xl/worksheets/sheet1.xml')) return 'xl/worksheets/sheet1.xml';
  throw new Error('no worksheet found');
}

// Buffer -> [[cell, ...], ...] strings, header row first. Empty rows are skipped.
function readXlsx(buf, { maxRows = 50000 } = {}) {
  let zip;
  try { zip = readZip(buf); } catch (e) { throw new Error('That .xlsx will not open (' + e.message + '). Re-export it from UpPromote.'); }
  const shared = [];
  const ss = zip.text('xl/sharedStrings.xml');
  if (ss) for (const m of ss.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>|<si\b[^>]*\/>/g)) shared.push(m[1] ? textOf(m[1]) : '');
  const xml = zip.text(firstSheet(zip));
  const rows = [];
  for (const rm of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>|<row\b[^>]*\/>/g)) {
    const row = [];
    if (rm[1]) for (const cm of rm[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const head = cm[1], body = cm[2] || '';
      let i = colIndex(attr(head, 'r'));
      if (i < 0) i = row.length;
      const t = attr(head, 't');
      const v = /<v>([\s\S]*?)<\/v>/.exec(body);
      let val = '';
      if (t === 'inlineStr') { const is = /<is>([\s\S]*?)<\/is>/.exec(body); val = is ? textOf(is[1]) : ''; }
      else if (t === 's') val = v ? shared[Number(v[1])] ?? '' : '';
      else if (t === 'b') val = v ? (v[1] === '1' ? 'TRUE' : 'FALSE') : '';
      else val = v ? decode(v[1]) : '';          // n, str (formula result), e (error text)
      while (row.length < i) row.push('');
      row[i] = val;
    }
    if (row.some((x) => x !== '')) rows.push(row);
    if (rows.length > maxRows + 1) throw new Error(`More than ${maxRows} rows. That does not look like an UpPromote export.`);
  }
  return rows;
}

const isZip = (buf) => buf.length > 4 && buf.readUInt32LE(0) === 0x04034b50;
module.exports = { readXlsx, isZip };
