// UpPromote export import — parses a CSV Evan exported from UpPromote, on this machine, into
//   my-files (knowledge)/hpc-reference/affiliates/uppromote-import.json
//
// No network calls. Nothing is sent anywhere. The OS never logs in to UpPromote; Evan clicks Export
// himself and either drops the CSV in my-inbox (new inputs)/ or picks it in the Affiliates tab.
//
// The real column names are not known yet (no export existed when this was written, 2026-09-21), so
// the mapper is tolerant: it matches headers against lists of likely names, keeps ONLY the columns it
// could map, and reports every column it could not as "unmapped" rather than guessing. When the first
// real export lands, widen the FIELDS lists below to fit it.
//
// Three kinds of export:
//   affiliates — one row per affiliate: name, email, site, sign-up date, status (+ paid / unpaid totals if present)
//   referrals  — one row per credited order: affiliate, order, tracking method, commission, status
//   payments   — one row per payout: affiliate, amount, status (paid / unpaid), date
'use strict';
const fs = require('fs');
const path = require('path');
const { atomicWrite, rotateBackup, readJson, HttpError } = require('./util');

const MAX_CSV = 8 * 1024 * 1024;
const MAX_ROWS = 50000;

// field -> header names it may go by (compared after lowercasing and stripping punctuation)
const FIELDS = {
  affiliates: {
    name: ['name', 'full name', 'affiliate', 'affiliate name'], first_name: ['first name', 'firstname'], last_name: ['last name', 'lastname'],
    email: ['email', 'email address', 'affiliate email'], site: ['website', 'site', 'url', 'website url', 'personal website', 'social', 'social link'],
    signed_up: ['sign up date', 'signup date', 'signed up', 'registered', 'registered at', 'registration date', 'created', 'created at', 'joined', 'join date', 'date'],
    status: ['status', 'affiliate status'], program: ['program', 'program name'], coupon: ['coupon', 'coupon code', 'coupons'],
    paid: ['paid', 'total paid', 'paid commission', 'commission paid', 'paid amount'], unpaid: ['unpaid', 'total unpaid', 'unpaid commission', 'pending commission', 'approved commission', 'balance'],
  },
  referrals: {
    affiliate: ['affiliate', 'affiliate name', 'name'], affiliate_email: ['affiliate email', 'email'],
    order: ['order', 'order name', 'order number', 'order id', 'order no', 'referral'], tracking: ['tracking method', 'tracking', 'tracked by', 'tracking type', 'source', 'type', 'referral type'],
    commission: ['commission', 'commission amount', 'total commission'], status: ['status', 'referral status', 'commission status'],
    total: ['total', 'order total', 'total sales', 'sales', 'amount'], date: ['date', 'created', 'created at', 'order date'],
  },
  payments: {
    affiliate: ['affiliate', 'affiliate name', 'name'], affiliate_email: ['affiliate email', 'email', 'paypal email', 'payment email'],
    amount: ['amount', 'payment amount', 'total', 'commission', 'paid amount'], status: ['status', 'payment status'],
    date: ['date', 'paid at', 'payment date', 'created', 'created at'], method: ['method', 'payment method'],
  },
};
// what a file must have to count as that kind at all
const MUST = { affiliates: [['email'], ['name', 'first_name']], referrals: [['order'], ['affiliate', 'affiliate_email']], payments: [['amount'], ['affiliate', 'affiliate_email']] };

const normHead = (h) => String(h || '').replace(/^\uFEFF/, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// RFC 4180: quoted fields, doubled quotes, line breaks inside quotes, CRLF or LF.
function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  const t = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(cell); cell = ''; if (row.some((x) => x !== '')) rows.push(row); row = []; if (rows.length > MAX_ROWS + 1) throw new HttpError(400, `More than ${MAX_ROWS} rows. That does not look like an UpPromote export.`); }
    else cell += c;
  }
  row.push(cell); if (row.some((x) => x !== '')) rows.push(row);
  return rows;
}

function mapHeaders(headers, kind) {
  const spec = FIELDS[kind]; const mapped = {}; const used = new Set();
  const normed = headers.map(normHead);
  // exact names first, in the order the spec lists them, so "affiliate email" goes to the email field before "email" does
  for (const [field, names] of Object.entries(spec)) {
    for (const n of names) { const i = normed.findIndex((h, idx) => h === n && !used.has(idx)); if (i >= 0) { mapped[field] = i; used.add(i); break; } }
  }
  return { mapped, unmapped: headers.filter((_, i) => !used.has(i) && normed[i] !== '') };
}
const meets = (kind, mapped) => MUST[kind].every((alts) => alts.some((f) => f in mapped));
function detectKind(headers) {
  let best = null;
  for (const kind of Object.keys(FIELDS)) { const m = mapHeaders(headers, kind); if (!meets(kind, m.mapped)) continue; const score = Object.keys(m.mapped).length; if (!best || score > best.score) best = { kind, score }; }
  return best && best.kind;
}
// "$1,234.50" -> 1234.5 ; anything that is not plainly a number -> null (and is counted, never guessed)
function money(v) { const s = String(v || '').replace(/[$,\s]/g, ''); return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : null; }
const str = (v, max = 300) => { const s = String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max); return s || null; };

module.exports = function makeUpPromote({ vault }) {
  const DIR = path.join(vault, 'my-files (knowledge)', 'hpc-reference', 'affiliates');
  const FILE = path.join(DIR, 'uppromote-import.json');
  const INBOX = path.join(vault, 'my-inbox (new inputs)');

  function load() {
    const r = readJson(FILE);
    if (r.error === 'missing') return { files: [], affiliates: [], referrals: [], payments: [] };
    if (r.error) throw new HttpError(500, 'uppromote-import.json will not parse: ' + r.error);
    return { files: [], affiliates: [], referrals: [], payments: [], ...r.data };
  }
  function inboxCsvs() {
    try { return fs.readdirSync(INBOX, { withFileTypes: true }).filter((e) => e.isFile() && /\.csv$/i.test(e.name) && !e.name.startsWith('.')).map((e) => e.name).slice(0, 20); }
    catch (_) { return []; }
  }
  function info() {
    let d; try { d = load(); } catch (e) { return { present: false, error: e.message, files: [], inbox: inboxCsvs() }; }
    return { present: d.files.length > 0, error: null, files: d.files, inbox: inboxCsvs(), counts: { affiliates: d.affiliates.length, referrals: d.referrals.length, payments: d.payments.length } };
  }

  // body: { from: 'inbox', file: 'name.csv', kind? }  or  { from: 'upload', name: 'name.csv', text: '...', kind? }
  function importCsv(body) {
    let name, text;
    if (body.from === 'inbox') {
      if (typeof body.file !== 'string' || body.file !== path.basename(body.file) || !/\.csv$/i.test(body.file) || body.file.startsWith('.')) throw new HttpError(400, 'Pick a .csv file from the inbox folder');
      const abs = path.join(INBOX, body.file);
      let st; try { st = fs.statSync(abs); } catch (_) { throw new HttpError(404, 'That file is not in the inbox folder any more'); }
      if (!st.isFile() || st.size > MAX_CSV) throw new HttpError(413, 'That file is too large to be an UpPromote export');
      name = body.file; text = fs.readFileSync(abs, 'utf8');
    } else if (body.from === 'upload') {
      if (typeof body.text !== 'string' || typeof body.name !== 'string') throw new HttpError(400, 'No file came through');
      if (body.text.length > MAX_CSV) throw new HttpError(413, 'That file is too large to be an UpPromote export');
      name = path.basename(body.name).slice(0, 160); text = body.text;
    } else throw new HttpError(400, 'Import from the inbox or pick a file');
    if (text.includes('\u0000')) throw new HttpError(400, 'That is not a text CSV. Export as CSV, not Excel.');

    const rows = parseCsv(text);
    if (rows.length < 2) throw new HttpError(400, 'That CSV has no data rows');
    const headers = rows[0].map((h) => String(h).replace(/^\uFEFF/, '').trim());
    let kind = body.kind && body.kind !== 'auto' ? body.kind : detectKind(headers);
    if (body.kind && body.kind !== 'auto' && !FIELDS[body.kind]) throw new HttpError(400, 'Kind is affiliates, referrals or payments');
    if (!kind) throw new HttpError(422, 'I cannot tell what kind of export this is from its columns: ' + headers.slice(0, 20).join(', ') + '. Pick the kind by hand and try again, or tell Nova the column names.');
    const { mapped, unmapped } = mapHeaders(headers, kind);
    if (!meets(kind, mapped)) throw new HttpError(422, `This does not have the columns a ${kind} export needs. Columns found: ${headers.slice(0, 20).join(', ')}`);

    const get = (r, f) => (f in mapped ? r[mapped[f]] : undefined);
    let badMoney = 0;
    const cash = (v) => { if (v === undefined || String(v).trim() === '') return null; const n = money(v); if (n === null) badMoney++; return n; };
    const out = rows.slice(1).map((r) => {
      if (kind === 'affiliates') return { name: str(get(r, 'name')) || str([get(r, 'first_name'), get(r, 'last_name')].filter(Boolean).join(' ')), email: str(get(r, 'email'), 200), site: str(get(r, 'site')), signed_up: str(get(r, 'signed_up'), 40), status: str(get(r, 'status'), 40), program: str(get(r, 'program'), 120), coupon: str(get(r, 'coupon'), 120), paid: cash(get(r, 'paid')), unpaid: cash(get(r, 'unpaid')) };
      if (kind === 'referrals') return { affiliate: str(get(r, 'affiliate')), affiliate_email: str(get(r, 'affiliate_email'), 200), order: str(get(r, 'order'), 60), tracking: str(get(r, 'tracking'), 120), commission: cash(get(r, 'commission')), status: str(get(r, 'status'), 40), total: cash(get(r, 'total')), date: str(get(r, 'date'), 40) };
      return { affiliate: str(get(r, 'affiliate')), affiliate_email: str(get(r, 'affiliate_email'), 200), amount: cash(get(r, 'amount')), status: str(get(r, 'status'), 40), date: str(get(r, 'date'), 40), method: str(get(r, 'method'), 60) };
    });

    const data = load();
    const entry = { name, kind, rows: out.length, imported_at: new Date().toISOString(), mapped: Object.fromEntries(Object.entries(mapped).map(([f, i]) => [f, headers[i]])), unmapped, unparsed_amounts: badMoney };
    data[kind] = out;                                        // a new export of a kind replaces the last one of that kind
    data.files = (data.files || []).filter((f) => f.kind !== kind).concat(entry);
    data._note = 'Parsed locally by ROUX OS from UpPromote CSV exports Evan made. Only mapped columns are kept. Personal data: stays on this machine.';
    fs.mkdirSync(DIR, { recursive: true });
    rotateBackup(FILE, path.join(DIR, 'backups'), 3);
    atomicWrite(FILE, JSON.stringify(data, null, 2) + '\n');
    return { ok: true, ...entry };
  }

  return { load, info, importCsv, FILE, MAX_CSV, parseCsv, detectKind, mapHeaders };
};
