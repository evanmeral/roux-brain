// UpPromote export import — parses a file Evan exported from UpPromote (.xlsx, as UpPromote gives it,
// or .csv), on this machine, into
//   my-files (knowledge)/hpc-reference/affiliates/uppromote-import.json
//
// No network calls. Nothing is sent anywhere. The OS never logs in to UpPromote; Evan clicks Export
// himself and either drops the file in my-inbox (new inputs)/ or picks it in the Affiliates tab.
// .xlsx is read by ./xlsx.js (Node's built-in zlib, no dependency).
//
// Column names come from Evan's first real exports (2026-09-21). The FIELDS lists hold those real
// names first, then a few likely alternatives. The mapper stays tolerant: it keeps ONLY the columns it
// could map and reports every other column as "unmapped" rather than guessing. Personal data it does
// NOT keep, on purpose: customer name/email, phone, address, payment info, W-9, internal notes.
//
// Three kinds of export (UpPromote's own screen in brackets):
//   affiliates        [Affiliates]  one row per affiliate: name, email, sign-up date + source, status,
//                                   socials, referral links, last login
//   referrals         [Referrals]   one row per credited order: affiliate, order, date, tracking
//                                   method, commission, status (Paid / Approved / Denied). THIS is
//                                   the file that says what was paid: commission where status = Paid.
//   approved_balance  [Payments > Approved]  one row per affiliate: the approved, not-yet-paid
//                                   balance (total_amount; negative = clawback). It has no status and
//                                   no date. It is never summed as "paid".
'use strict';
const fs = require('fs');
const path = require('path');
const { atomicWrite, rotateBackup, readJson, HttpError } = require('./util');
const { readXlsx, isZip } = require('./xlsx');

const MAX_CSV = 8 * 1024 * 1024;     // largest file accepted, CSV or XLSX (bytes)
const MAX_ROWS = 50000;
const KINDS = ['affiliates', 'referrals', 'approved_balance'];
const FILE_RE = /\.(csv|xlsx)$/i;
const BOM = /^﻿/;

// field -> header names it may go by (compared after lowercasing and stripping punctuation, so
// "date_created" and " order_name" both match). Real UpPromote names first.
const FIELDS = {
  affiliates: {
    name: ['name', 'full name', 'affiliate', 'affiliate name'], first_name: ['first name', 'firstname'], last_name: ['last name', 'lastname'],
    email: ['email', 'email address', 'affiliate email'], site: ['website', 'site', 'url', 'website url', 'personal website'],
    signed_up: ['date created', 'sign up date', 'signup date', 'signed up', 'registered', 'registered at', 'registration date', 'created', 'created at', 'joined', 'join date', 'date'],
    signup_source: ['signup source', 'sign up source', 'source'],
    status: ['status', 'affiliate status'], program: ['program', 'program name'], coupon: ['coupons', 'coupon', 'coupon code'],
    facebook: ['facebook'], instagram: ['instagram'], youtube: ['youtube'], tiktok: ['tiktok'],
    referral_link: ['referral link'], custom_referral_link: ['custom referral link'], last_login: ['last login'],
    paid: ['paid', 'total paid', 'paid commission', 'commission paid', 'paid amount'], unpaid: ['unpaid', 'total unpaid', 'unpaid commission', 'pending commission', 'approved commission'],
  },
  referrals: {
    affiliate: ['affiliate name', 'affiliate', 'name'], affiliate_email: ['affiliate email', 'email'],
    order: ['order name', 'order', 'order number', 'order id', 'order no', 'referral'],
    tracking: ['tracking by', 'tracking method', 'tracking', 'tracked by', 'tracking type', 'referral type'],
    commission: ['commission', 'commission amount', 'total commission'], commission_adjustment: ['commission adjustment'],
    status: ['status', 'referral status', 'commission status'], currency: ['currency'],
    total: ['total sales', 'total', 'order total', 'sales', 'amount'], date: ['date', 'created', 'created at', 'order date'],
    google_ads: ['google ads'], coupon: ['affiliate coupon', 'coupon'], program: ['program name', 'program'], first_commission: ['is first commission'],
  },
  approved_balance: {
    affiliate: ['full name', 'affiliate name', 'affiliate', 'name'], affiliate_email: ['email', 'affiliate email'],
    amount: ['total amount'], commission: ['commission'], tax: ['tax'], referrals: ['referrals'], total_sales: ['total sales'],
  },
};
// what a file must have to count as that kind at all
const MUST = { affiliates: [['email'], ['name', 'first_name']], referrals: [['order'], ['affiliate', 'affiliate_email'], ['commission']], approved_balance: [['amount'], ['affiliate', 'affiliate_email']] };

const normHead = (h) => String(h || '').replace(BOM, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// RFC 4180: quoted fields, doubled quotes, line breaks inside quotes, CRLF or LF.
function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  const t = text.replace(BOM, '');
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
  // exact names, fields in spec order, names in list order, each column used once
  for (const [field, names] of Object.entries(spec)) {
    for (const n of names) { const i = normed.findIndex((h, idx) => h === n && !used.has(idx)); if (i >= 0) { mapped[field] = i; used.add(i); break; } }
  }
  return { mapped, unmapped: headers.filter((_, i) => !used.has(i) && normed[i] !== '') };
}
const meets = (kind, mapped) => MUST[kind].every((alts) => alts.some((f) => f in mapped));
function detectKind(headers) {
  let best = null;
  for (const kind of KINDS) { const m = mapHeaders(headers, kind); if (!meets(kind, m.mapped)) continue; const score = Object.keys(m.mapped).length; if (!best || score > best.score) best = { kind, score }; }
  return best && best.kind;
}
// "$1,234.50" -> 1234.5 ; anything that is not plainly a number -> null (and is counted, never guessed)
function money(v) { const s = String(v || '').replace(/[$,\s]/g, ''); return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : null; }
const str = (v, max = 300) => { const s = String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max); return s || null; };
// UpPromote writes "2025-04-21 11:49 AM". Keep the calendar day as YYYY-MM-DD; anything else stays as written.
const day = (v) => { const s = str(v, 40); if (!s) return null; const m = /^(\d{4}-\d{2}-\d{2})\b/.exec(s); return m ? m[1] : s; };
const yesNo = (v) => { const s = str(v, 20); if (!s) return null; if (/^(yes|true|1)$/i.test(s)) return true; if (/^(no|false|0)$/i.test(s)) return false; return null; };

module.exports = function makeUpPromote({ vault }) {
  const DIR = path.join(vault, 'my-files (knowledge)', 'hpc-reference', 'affiliates');
  const FILE = path.join(DIR, 'uppromote-import.json');
  const INBOX = path.join(vault, 'my-inbox (new inputs)');
  const EMPTY = () => ({ files: [], affiliates: [], referrals: [], approved_balance: [] });

  function load() {
    const r = readJson(FILE);
    if (r.error === 'missing') return EMPTY();
    if (r.error) throw new HttpError(500, 'uppromote-import.json will not parse: ' + r.error);
    const d = { ...EMPTY(), ...r.data };
    // An import written before 2026-09-21 may hold a "payments" kind: that was the approved-balance file
    // read as payouts. It is dropped here so it can never be summed as paid. Re-import that file.
    if (d.payments) { delete d.payments; d.files = (d.files || []).filter((f) => f.kind !== 'payments'); d.legacy_payments_dropped = true; }
    return d;
  }
  function inboxFiles() {
    try { return fs.readdirSync(INBOX, { withFileTypes: true }).filter((e) => e.isFile() && FILE_RE.test(e.name) && !e.name.startsWith('.') && !e.name.startsWith('~$')).map((e) => e.name).slice(0, 20); }
    catch (_) { return []; }
  }
  function info() {
    let d; try { d = load(); } catch (e) { return { present: false, error: e.message, files: [], inbox: inboxFiles() }; }
    return { present: d.files.length > 0, error: null, files: d.files, inbox: inboxFiles(), legacy_payments_dropped: !!d.legacy_payments_dropped, counts: Object.fromEntries(KINDS.map((k) => [k, d[k].length])) };
  }

  // Bytes -> rows. An .xlsx (a zip) is read by xlsx.js; anything else must be UTF-8 CSV text.
  function toRows(name, buf) {
    if (isZip(buf)) { try { return readXlsx(buf, { maxRows: MAX_ROWS }); } catch (e) { throw new HttpError(400, e.message); } }
    if (/\.xls$/i.test(name)) throw new HttpError(400, 'That is an old .xls file. Export it again from UpPromote as .xlsx or CSV.');
    if (buf.includes(0)) throw new HttpError(400, 'I cannot read that file. UpPromote exports .xlsx: use that file as it came, or a CSV.');
    return parseCsv(buf.toString('utf8'));
  }

  // body: { from: 'inbox', file: 'name.xlsx|csv', kind? }
  //   or  { from: 'upload', name, b64: '<base64 of the file>', kind? }   (the page sends every pick this way)
  //   or  { from: 'upload', name, text: '<csv text>', kind? }            (older page)
  function importFile(body) {
    let name, buf;
    if (body.from === 'inbox') {
      if (typeof body.file !== 'string' || body.file !== path.basename(body.file) || !FILE_RE.test(body.file) || body.file.startsWith('.')) throw new HttpError(400, 'Pick an .xlsx or .csv file from the inbox folder');
      const abs = path.join(INBOX, body.file);
      let st; try { st = fs.statSync(abs); } catch (_) { throw new HttpError(404, 'That file is not in the inbox folder any more'); }
      if (!st.isFile() || st.size > MAX_CSV) throw new HttpError(413, 'That file is too large to be an UpPromote export');
      name = body.file; buf = fs.readFileSync(abs);
    } else if (body.from === 'upload') {
      if (typeof body.name !== 'string') throw new HttpError(400, 'No file came through');
      if (typeof body.b64 === 'string') { if (body.b64.length > Math.ceil(MAX_CSV / 3) * 4) throw new HttpError(413, 'That file is too large to be an UpPromote export'); buf = Buffer.from(body.b64, 'base64'); }
      else if (typeof body.text === 'string') { if (body.text.length > MAX_CSV) throw new HttpError(413, 'That file is too large to be an UpPromote export'); buf = Buffer.from(body.text, 'utf8'); }
      else throw new HttpError(400, 'No file came through');
      name = path.basename(body.name).slice(0, 160);
    } else throw new HttpError(400, 'Import from the inbox or pick a file');

    const rows = toRows(name, buf);
    if (rows.length < 2) throw new HttpError(400, 'That file has no data rows');
    const headers = rows[0].map((h) => String(h).replace(BOM, '').trim());
    const picked = body.kind && body.kind !== 'auto' ? body.kind : null;
    if (picked && !FIELDS[picked]) throw new HttpError(400, 'Kind is affiliates, referrals or approved_balance');
    const kind = picked || detectKind(headers);
    if (!kind) throw new HttpError(422, 'I cannot tell what kind of export this is from its columns: ' + headers.slice(0, 20).join(', ') + '. Pick the kind by hand and try again, or tell Nova the column names.');
    const { mapped, unmapped } = mapHeaders(headers, kind);
    if (!meets(kind, mapped)) throw new HttpError(422, `This does not have the columns a ${kind} export needs. Columns found: ${headers.slice(0, 20).join(', ')}`);
    // A per-affiliate payment summary has no status column, so its columns cannot tell "approved" from
    // "paid". Accept it as an approved balance only when the file name or Evan's pick says so.
    if (kind === 'approved_balance' && !picked && !/approved/i.test(name)) throw new HttpError(422, 'This is a per-affiliate payment summary with no status column, so I cannot tell if it is the approved balance or money already paid. If it is the Payments > Approved export, pick "Approved balance" as the kind and import again. Paid amounts come from the Referrals export.');

    const get = (r, f) => (f in mapped ? r[mapped[f]] : undefined);
    let badMoney = 0;
    const cash = (v) => { if (v === undefined || String(v).trim() === '') return null; const n = money(v); if (n === null) badMoney++; return n; };
    const out = rows.slice(1).map((r) => {
      if (kind === 'affiliates') return {
        name: str(get(r, 'name')) || str([get(r, 'first_name'), get(r, 'last_name')].map((x) => str(x)).filter(Boolean).join(' ')), email: str(get(r, 'email'), 200),
        site: str(get(r, 'site')), signed_up: day(get(r, 'signed_up')), signup_source: str(get(r, 'signup_source'), 60), status: str(get(r, 'status'), 40),
        program: str(get(r, 'program'), 120), coupon: str(get(r, 'coupon'), 120),
        facebook: str(get(r, 'facebook'), 200), instagram: str(get(r, 'instagram'), 200), youtube: str(get(r, 'youtube'), 200), tiktok: str(get(r, 'tiktok'), 200),
        referral_link: str(get(r, 'referral_link'), 300), custom_referral_link: str(get(r, 'custom_referral_link'), 300), last_login: day(get(r, 'last_login')),
        paid: cash(get(r, 'paid')), unpaid: cash(get(r, 'unpaid')),
      };
      if (kind === 'referrals') return {
        affiliate: str(get(r, 'affiliate')), affiliate_email: str(get(r, 'affiliate_email'), 200), order: str(get(r, 'order'), 60), date: day(get(r, 'date')),
        tracking: str(get(r, 'tracking'), 120), commission: cash(get(r, 'commission')), commission_adjustment: cash(get(r, 'commission_adjustment')),
        status: str(get(r, 'status'), 40), currency: str(get(r, 'currency'), 10), total: cash(get(r, 'total')),
        google_ads: str(get(r, 'google_ads'), 40), coupon: str(get(r, 'coupon'), 120), program: str(get(r, 'program'), 120), first_commission: yesNo(get(r, 'first_commission')),
      };
      return {
        affiliate: str(get(r, 'affiliate')), affiliate_email: str(get(r, 'affiliate_email'), 200), amount: cash(get(r, 'amount')),
        commission: cash(get(r, 'commission')), tax: cash(get(r, 'tax')), referrals: cash(get(r, 'referrals')), total_sales: cash(get(r, 'total_sales')),
      };
    });

    const data = load();
    delete data.legacy_payments_dropped;
    const entry = { name, kind, rows: out.length, imported_at: new Date().toISOString(), mapped: Object.fromEntries(Object.entries(mapped).map(([f, i]) => [f, headers[i]])), unmapped, unparsed_amounts: badMoney };
    data[kind] = out;                                        // a new export of a kind replaces the last one of that kind
    data.files = (data.files || []).filter((f) => f.kind !== kind).concat(entry);
    data._note = 'Parsed locally by ROUX OS from UpPromote exports Evan made. Only mapped columns are kept (no customer names or emails, phones, addresses or payment info). Personal data: stays on this machine.';
    fs.mkdirSync(DIR, { recursive: true });
    rotateBackup(FILE, path.join(DIR, 'backups'), 3);
    atomicWrite(FILE, JSON.stringify(data, null, 2) + '\n');
    return { ok: true, ...entry };
  }

  // importCsv kept as an alias so older callers still work
  return { load, info, importFile, importCsv: importFile, FILE, MAX_CSV, MAX_BODY: Math.ceil(MAX_CSV / 3) * 4 + 64 * 1024, KINDS, parseCsv, detectKind, mapHeaders };
};
