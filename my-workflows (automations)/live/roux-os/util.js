// Shared helpers for the ROUX OS server modules: safe file writes, input cleaning, dates.
'use strict';
const fs = require('fs');
const path = require('path');

// Write a file so a crash can never leave it half-written: temp file in the same folder, then rename.
// The temp name starts with a dot, so the desk file-watcher ignores it.
function atomicWrite(file, text) {
  const tmp = path.join(path.dirname(file), '.' + path.basename(file) + '.' + process.pid + '.tmp');
  fs.writeFileSync(tmp, text);
  fs.renameSync(tmp, file);
}

// Keep the last `slots` versions of a file in `dir`, newest = .1. Rotation is by rename, so nothing
// is ever deleted by hand; the oldest slot is simply overwritten.
function rotateBackup(file, dir, slots = 5) {
  if (!fs.existsSync(file)) return null;
  fs.mkdirSync(dir, { recursive: true });
  const base = path.basename(file, path.extname(file));
  const ext = path.extname(file);
  const slot = (n) => path.join(dir, `${base}.${n}${ext}`);
  for (let n = slots - 1; n >= 1; n--) if (fs.existsSync(slot(n))) fs.renameSync(slot(n), slot(n + 1));
  fs.copyFileSync(file, slot(1));
  return slot(1);
}

// A user-typed string: control characters out, whitespace trimmed, capped. Empty becomes null.
// `multiline` keeps line breaks (notes); otherwise all whitespace collapses to single spaces.
function cleanStr(v, max, multiline = false) {
  if (v === null || v === undefined) return null;
  if (typeof v !== 'string') throw new Error('expected text');
  // eslint-disable-next-line no-control-regex
  let s = v.replace(multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, ' ');
  s = multiline ? s.replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').trim() : s.replace(/\s+/g, ' ').trim();
  if (s.length > max) throw new Error(`too long (max ${max} characters)`);
  return s || null;
}

function isIsoDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !isNaN(d) && d.toISOString().slice(0, 10) === s;
}
function cleanDate(v) {
  if (v === null || v === undefined || v === '') return null;
  if (!isIsoDate(v)) throw new Error('dates are YYYY-MM-DD');
  return v;
}
function daysBetween(fromIso, toIso) {
  const u = (s) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
  return Math.round((u(toIso) - u(fromIso)) / 86400000);
}

function readJson(file) {
  try { return { data: JSON.parse(fs.readFileSync(file, 'utf8')), error: null }; }
  catch (e) { return { data: null, error: e.code === 'ENOENT' ? 'missing' : e.message }; }
}

// An error the http layer reports with a chosen status instead of a 500.
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }

module.exports = { atomicWrite, rotateBackup, cleanStr, cleanDate, isIsoDate, daysBetween, readJson, HttpError };
