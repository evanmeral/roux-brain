// Affiliates — the editable roster behind the Affiliates tab.
//
// Store:  my-files (knowledge)/hpc-reference/affiliates/affiliates.json   (the OS writes this)
// Sales:  my-files (knowledge)/hpc-reference/affiliates/sales-by-affiliate.json   (Finn drops this in;
//         the OS only reads it and joins it by id or name at render time, so a fresh read never
//         touches Evan's edits)
//
// Facts:  .../affiliates/flags.json   (drop-in; per-name evidence from Finn's reports, each flag with its
//         fact and source. Kept out of Evan's editable records on purpose. Also names the 5% calc rate.)
// Import: .../affiliates/uppromote-import.json   (written by uppromote.js from Evan's UpPromote .xlsx / CSV exports)
//
// Rules this module keeps:
//  - It never estimates a sales figure. It shows what a file holds, with its source. The two sums it
//    does make (header totals = the rows of Finn's file added up; paid / approved / denied = the UpPromote
//    Referrals export's commission added up by status) say so, and name the file and column.
//  - "Calc commission" is net sales x the rate on file. It is a calculation and is labelled "not a
//    payout" everywhere. The payout tile reads "not read" until an UpPromote export is imported.
//  - Flags are facts with counts, never verdicts. No evidence on file = nothing rendered.
//  - Nothing is hard-deleted. Archive sets archived: true with a date.
//  - Every write is atomic (temp file + rename) and the previous version is kept in backups/.
//  - It sends nothing to anyone. "Draft a check-in" only leaves a note for the next session.
'use strict';
const fs = require('fs');
const path = require('path');
const { atomicWrite, rotateBackup, cleanStr, cleanDate, isIsoDate, daysBetween, readJson, HttpError } = require('./util');

const STATUSES = ['active', 'idle', 'paused', 'ended', 'prospect'];
const TYPES = ['creator', 'affiliate', 'prospect', 'ugc', 'other'];
const HANDLES = ['handle_instagram', 'handle_facebook', 'handle_tiktok', 'handle_youtube'];
const EDITOR = 'Evan (OS)';

module.exports = function makeAffiliates({ vault, todayIso, uppromote }) {
  const DIR = path.join(vault, 'my-files (knowledge)', 'hpc-reference', 'affiliates');
  const STORE = path.join(DIR, 'affiliates.json');
  const SALES = path.join(DIR, 'sales-by-affiliate.json');
  const BACKUPS = path.join(DIR, 'backups');
  const FLAGS = path.join(DIR, 'flags.json');

  // ---- store ----
  function load() {
    const r = readJson(STORE);
    if (r.error) throw new HttpError(500, r.error === 'missing' ? 'Cannot find affiliates.json' : 'affiliates.json will not parse: ' + r.error);
    const list = Array.isArray(r.data) ? r.data : r.data && Array.isArray(r.data.records) ? r.data.records : null;
    if (!list) throw new HttpError(500, 'affiliates.json is not a list of records');
    return list;
  }
  function persist(list) {
    rotateBackup(STORE, BACKUPS, 5);
    atomicWrite(STORE, JSON.stringify(list, null, 2) + '\n');
  }
  function stamp(rec) { rec.updated_at = new Date().toISOString(); rec.updated_by = EDITOR; }
  function find(list, id) {
    if (typeof id !== 'string' || !id || id.length > 120) throw new HttpError(400, 'Which affiliate?');
    const rec = list.find((r) => r.id === id);
    if (!rec) throw new HttpError(404, 'No affiliate with that id');
    return rec;
  }
  // If the record changed on disk since the page loaded it (an agent edit, a second window), refuse
  // rather than silently overwrite.
  function checkFresh(rec, seen) {
    if (seen === undefined) return;
    if ((rec.updated_at || null) !== (seen || null)) throw new HttpError(409, 'This record changed since you opened it. Close the drawer and open it again.');
  }

  // ---- sales join ----
  const norm = (s) => String(s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const num = (v) => (typeof v === 'number' && isFinite(v) ? v : null);
  const dateOrNull = (v) => (isIsoDate(String(v || '').slice(0, 10)) ? String(v).slice(0, 10) : null);

  function readSales() {
    const r = readJson(SALES);
    if (r.error === 'missing') return { present: false };
    if (r.error) return { present: false, error: 'sales-by-affiliate.json will not parse: ' + r.error };
    const d = r.data;
    if (!d || !Array.isArray(d.rows)) return { present: false, error: 'sales-by-affiliate.json has no rows list' };
    return {
      present: true,
      read_at: cleanish(d.read_at), source: cleanish(d.source), window: cleanish(d.window),
      note: typeof d.net_definition === 'string' ? d.net_definition.slice(0, 1500) : null,   // Finn's own definition of "net" and his caveats
      rows: d.rows.filter((x) => x && typeof x === 'object'),
    };
  }
  function cleanish(v) { return typeof v === 'string' ? v.slice(0, 600) : v == null ? null : String(v).slice(0, 600); }

  function joinSales(list, sales) {
    const out = new Map(); // record id -> sales object
    const info = { unmatched: [], ambiguous: [] };
    if (!sales.present) return { out, info };
    const byId = new Map(list.map((r) => [r.id, r]));
    const byName = new Map();
    for (const r of list) { const k = norm(r.name); if (!k) continue; (byName.get(k) || byName.set(k, []).get(k)).push(r); }
    for (const row of sales.rows) {
      const label = cleanish(row.affiliate_name) || cleanish(row.affiliate_id) || '(no name)';
      let rec = row.affiliate_id && byId.get(String(row.affiliate_id));
      if (!rec) {
        const hits = byName.get(norm(row.affiliate_name)) || [];
        if (hits.length > 1) { info.ambiguous.push(label); continue; }
        rec = hits[0];
      }
      if (!rec) { info.unmatched.push({ name: label, orders: num(row.orders), net_sales: num(row.net_sales) }); continue; }
      if (out.has(rec.id)) { info.ambiguous.push(label); continue; }
      out.set(rec.id, {
        from: 'finn', orders: num(row.orders), net_sales: num(row.net_sales),
        first_sale: dateOrNull(row.first_sale), last_sale: dateOrNull(row.last_sale),
        orders_30d: num(row.orders_30d), net_sales_30d: num(row.net_sales_30d ?? row.net_30d),   // Finn's first file names it net_30d
        orders_90d: num(row.orders_90d), net_sales_90d: num(row.net_sales_90d ?? row.net_90d),
        source: sales.source, window: sales.window, read_at: sales.read_at,
      });
    }
    return { out, info };
  }

  // With no Finn read on file, fall back to the figures Pete's seed read left inside each record.
  // They are shown as "seed read, unconfirmed", with their own source, never as Finn's.
  function seedSales(rec) {
    const o = rec.orders_attributed, n = rec.net_sales_attributed, m = rec.sales_last_30d;
    if (!o && !n) return null;
    return {
      from: 'seed', orders: num(o && o.value), net_sales: num(n && n.value), first_sale: null, last_sale: null,
      orders_30d: num(m && m.orders), net_sales_30d: num(m && m.net_sales),
      source: cleanish((n && n.source) || (o && o.source)), window: cleanish((n && n.window) || (o && o.window)),
      window_30d: cleanish(m && m.window), caveat: cleanish(n && n.caveat), read_at: '2026-09-21',
    };
  }

  // ---- evidence (flags.json) ----
  const FLAG_KINDS = ['COUPON SITE', 'NO VISIBLE REFERRAL', 'PAID-AD OVERLAP', 'NOT ON OUR LIST', 'NEW SIGN-UP', 'HIGH RETURNS'];
  function readEvidence(list) {
    const r = readJson(FLAGS);
    const ev = { present: false, error: null, read_at: null, source: null, note: null, rate: null, unmatched: [], byId: new Map() };
    if (r.error === 'missing') return ev;
    if (r.error) { ev.error = 'flags.json will not parse: ' + r.error; return ev; }
    const d = r.data || {};
    ev.present = true; ev.read_at = cleanish(d.read_at); ev.source = cleanish(d.source); ev.note = typeof d.note === 'string' ? d.note.slice(0, 1200) : null;
    const rate = d.calc_commission_rate;
    if (rate && typeof rate.value === 'number' && rate.value > 0 && rate.value < 1) ev.rate = { value: rate.value, label: cleanish(rate.label) || `${rate.value * 100}%`, source: cleanish(rate.source) };
    const byName = new Map();
    for (const rec of list) { const k = norm(rec.name); if (k) (byName.get(k) || byName.set(k, []).get(k)).push(rec); }
    const frac = (x) => (x && Number.isInteger(x.orders) && Number.isInteger(x.of) ? { name: cleanish(x.name), orders: x.orders, of: x.of, source: cleanish(x.source) } : null);
    for (const row of Array.isArray(d.rows) ? d.rows : []) {
      if (!row || typeof row !== 'object') continue;
      const hits = (row.affiliate_id && list.filter((x) => x.id === row.affiliate_id)) || byName.get(norm(row.affiliate_name)) || [];
      if (hits.length !== 1) { ev.unmatched.push(cleanish(row.affiliate_name) || '(no name)'); continue; }
      ev.byId.set(hits[0].id, {
        flags: (Array.isArray(row.flags) ? row.flags : []).filter((f) => f && FLAG_KINDS.includes(f.flag) && f.fact && f.source).slice(0, 8)   // a flag with no fact or no source is not shown
          .map((f) => ({ flag: f.flag, label: cleanish(f.label) || f.flag.toLowerCase(), fact: cleanish(f.fact), source: cleanish(f.source) })),
        top_referrer: frac(row.top_referrer), returning: frac(row.returning),
      });
    }
    return ev;
  }

  // ---- UpPromote import join: email first, then name ----
  //
  // Where each money figure comes from (the only honest sources in UpPromote's exports):
  //   paid      = referrals export, sum of `commission` where `status` = Paid
  //   approved  = referrals export, sum of `commission` where `status` = Approved (earned, not yet paid)
  //   denied    = referrals export, `status` = Denied, shown apart and never added to anything
  //   balance   = approved-payments export, sum of `total_amount` (UpPromote's approved balance; negative = clawback)
  // The approved-payments export has no status and no date, so it is never read as paid.
  // A tile with no file behind it is null, and the page shows "not read" — never 0.
  function readImport(list) {
    const out = { byId: new Map(), paidTotal: null, approvedTotal: null, deniedTotal: null, balanceTotal: null, flagCheck: null, error: null, info: null };
    if (!uppromote) return out;
    out.info = uppromote.info();
    if (!out.info.present) { out.error = out.info.error || null; return out; }
    let d; try { d = uppromote.load(); } catch (e) { out.error = e.message; return out; }
    const byEmail = new Map(), byName = new Map();
    for (const rec of list) { if (rec.email) byEmail.set(rec.email.toLowerCase(), rec); const k = norm(rec.name); if (k) (byName.get(k) || byName.set(k, []).get(k)).push(rec); }
    const match = (email, name) => { const e = email && byEmail.get(String(email).toLowerCase()); if (e) return e; const h = byName.get(norm(name)) || []; return h.length === 1 ? h[0] : null; };
    const cents = (n) => Math.round(n * 100) / 100;
    const blank = () => ({ site: null, signed_up: null, signup_source: null, up_status: null, last_login: null, socials: null, referral_link: null, custom_referral_link: null,
      paid: null, paid_rows: 0, unpaid: null, unpaid_rows: 0, denied: null, denied_rows: 0, balance: null, tracking: null, sources: [] });
    const slot = (rec) => out.byId.get(rec.id) || out.byId.set(rec.id, blank()).get(rec.id);
    const file = (kind) => (d.files || []).find((f) => f.kind === kind);
    const LABEL = { affiliates: 'Affiliates', referrals: 'Referrals', approved_balance: 'Approved payments' };
    const src = (kind, col) => { const f = file(kind); return f ? `UpPromote ${LABEL[kind]} export "${f.name}"${col ? ', ' + col : ''}, imported ${String(f.imported_at).slice(0, 10)}` : null; };
    const cite = (s, kind) => { const x = src(kind); if (x && !s.sources.includes(x)) s.sources.push(x); };
    const seen = new Set();   // record ids that any UpPromote export matched

    for (const a of d.affiliates || []) {
      const rec = match(a.email, a.name); if (!rec) continue;
      seen.add(rec.id);
      const s = slot(rec);
      Object.assign(s, { site: a.site, signed_up: a.signed_up, signup_source: a.signup_source || null, up_status: a.status, last_login: a.last_login || null, referral_link: a.referral_link || null, custom_referral_link: a.custom_referral_link || null });
      const soc = ['instagram', 'tiktok', 'facebook', 'youtube'].filter((k) => a[k]).map((k) => ({ k, v: a[k] }));
      s.socials = soc.length ? soc : null;
      if (a.paid != null) s.paid = a.paid;
      if (a.unpaid != null) s.unpaid = a.unpaid;
      cite(s, 'affiliates');
    }

    // Referrals: the one file that carries paid / approved / denied per credited order.
    const refs = d.referrals || [];
    if (refs.length) {
      const t = { paid: [0, 0, 0], approved: [0, 0, 0], denied: [0, 0, 0] };   // [sum, rows, negative rows]
      let other = 0, noAmount = 0, adjust = 0; const currencies = new Set();
      for (const r of refs) {
        const st = String(r.status || '').trim().toLowerCase();
        const key = st === 'paid' ? 'paid' : st === 'approved' ? 'approved' : st === 'denied' ? 'denied' : null;
        if (!key) { other++; continue; }
        if (r.commission == null) { noAmount++; continue; }
        if (r.currency) currencies.add(r.currency);
        t[key][0] += r.commission; t[key][1]++; if (r.commission < 0) t[key][2]++;
        if (key === 'paid' && r.commission_adjustment) adjust += r.commission_adjustment;
        const rec = match(r.affiliate_email, r.affiliate); if (!rec) continue;
        seen.add(rec.id);
        const s = slot(rec); cite(s, 'referrals');
        const f = key === 'approved' ? 'unpaid' : key;
        s[f] = cents((s[f + '_rows'] ? s[f] : 0) + r.commission); s[f + '_rows']++;
        if (r.tracking) { s.tracking = s.tracking || {}; s.tracking[r.tracking] = (s.tracking[r.tracking] || 0) + 1; }
      }
      const cur = currencies.size > 1 ? ` Mixed currencies (${[...currencies].join(', ')}), added as-is.` : '';
      const neg = (n) => (n ? `, ${n} of them negative (refund clawbacks)` : '');
      const tail = `${other ? ` ${other} rows with another status left out.` : ''}${noAmount ? ` ${noAmount} rows with no readable commission left out.` : ''}${cur}`;
      out.paidTotal = { value: cents(t.paid[0]), rows: t.paid[1], source: src('referrals', 'column commission'), how: `sum of commission on ${t.paid[1]} referral rows with status Paid${neg(t.paid[2])}.${adjust ? ` commission_adjustment on those rows sums to ${cents(adjust)} and is not added.` : ''}${tail}` };
      out.approvedTotal = { value: cents(t.approved[0]), rows: t.approved[1], source: src('referrals', 'column commission'), how: `sum of commission on ${t.approved[1]} referral rows with status Approved${neg(t.approved[2])}. Earned, not yet paid.` };
      out.deniedTotal = { value: cents(t.denied[0]), rows: t.denied[1], source: src('referrals', 'column commission'), how: `${t.denied[1]} referral rows with status Denied. Not owed, not added to anything.` };
    } else if ((d.affiliates || []).some((a) => a.paid != null)) {
      // Only if a future Affiliates export carries its own paid column.
      const withPaid = d.affiliates.filter((a) => a.paid != null);
      out.paidTotal = { value: cents(withPaid.reduce((x, a) => x + a.paid, 0)), rows: withPaid.length, source: src('affiliates', 'column paid'), how: `sum of the paid column over ${withPaid.length} affiliates` };
    }

    // Approved-payments export: a per-affiliate approved balance. Labelled as such, never as paid.
    const bal = d.approved_balance || [];
    if (bal.length) {
      let sum = 0, n = 0, negs = 0;
      for (const b of bal) {
        if (b.amount == null) continue;
        sum += b.amount; n++; if (b.amount < 0) negs++;
        const rec = match(b.affiliate_email, b.affiliate); if (!rec) continue;
        seen.add(rec.id);
        const s = slot(rec); s.balance = cents((s.balance || 0) + b.amount); cite(s, 'approved_balance');
      }
      out.balanceTotal = { value: cents(sum), rows: n, source: src('approved_balance', 'column total_amount'), how: `sum of total_amount over ${n} affiliates${negs ? `, ${negs} negative (clawbacks)` : ''}. UpPromote's approved balance. This file has no status or date, so none of it is counted as paid.` };
    }

    // Records an export matched whose own "On UpPromote" flag is not yes. Listed for Evan; never auto-edited.
    const stale = list.filter((r) => seen.has(r.id) && r.uppromote !== true && !r.archived).map((r) => ({ id: r.id, name: r.name, uppromote: r.uppromote ?? null }));
    const flagged = list.filter((r) => r.uppromote === true && !r.archived);
    const missing = (d.affiliates || []).length ? flagged.filter((r) => !out.byId.get(r.id) || !out.byId.get(r.id).up_status).map((r) => ({ id: r.id, name: r.name })) : null;
    out.flagCheck = { matched: seen.size, flagged: flagged.length, not_flagged: stale, flagged_not_in_affiliates_export: missing };
    for (const s of out.byId.values()) s.source = s.sources.join(' · ') || null;
    return out;
  }

  function view() {
    const today = todayIso();
    const list = load();
    const sales = readSales();
    const { out, info } = joinSales(list, sales);
    const evidence = readEvidence(list);
    const imp = readImport(list);
    const cents = (n) => Math.round(n * 100) / 100;
    const money = { credited: null, on_list: null, paid: imp.paidTotal, approved: imp.approvedTotal, denied: imp.deniedTotal, balance: imp.balanceTotal, rate: evidence.rate };
    if (sales.present) {
      // Header totals: Finn's rows added up. Nothing is hardcoded; a new read changes them.
      let all = 0, mine = 0, nAll = 0, nMine = 0;
      for (const row of sales.rows) if (typeof row.net_sales === 'number' && isFinite(row.net_sales)) { all += row.net_sales; nAll++; }
      for (const rec of list) { const s = out.get(rec.id); if (s && s.net_sales != null && rec.on_list === true) { mine += s.net_sales; nMine++; } }
      const base = { source: sales.source, read_at: sales.read_at, window: sales.window };
      money.credited = { value: cents(all), rows: nAll, how: `sum of the ${nAll} rows in Finn's file`, ...base };
      money.on_list = { value: cents(mine), rows: nMine, how: `sum of the ${nMine} rows that match someone on your list`, ...base };
    }
    const counts = { total: 0, archived: 0, sold30: 0, quiet30: 0, unknownUp: 0, noContactInfo: 0, neverContacted: 0, suggestions: 0 };
    const records = list.map((rec) => {
      const s = out.get(rec.id) || (sales.present ? null : seedSales(rec));
      const hasHandle = HANDLES.some((h) => rec[h]) || (rec.other_links || []).length > 0;
      const soldRecently = s ? (s.last_sale ? daysBetween(s.last_sale, today) <= 30 : (s.orders_30d || 0) > 0) : false;
      const flags = {
        sold30: soldRecently,
        quiet30: !!(rec.last_contact && isIsoDate(rec.last_contact) && daysBetween(rec.last_contact, today) >= 30),
        neverContacted: !rec.last_contact,
        unknownUp: rec.uppromote === true && rec.on_list === false,
        noContactInfo: !rec.email && !rec.phone && !hasHandle,
        hasSales: !!(s && (s.orders || 0) > 0),
      };
      if (rec.archived) counts.archived++;
      else {
        counts.total++;
        for (const k of ['sold30', 'quiet30', 'unknownUp', 'noContactInfo', 'neverContacted']) if (flags[k]) counts[k]++;
        if (!rec.status && rec.status_suggested) counts.suggestions++;
      }
      // evidence flags: from flags.json, plus NOT ON OUR LIST which comes from the record itself
      const e = evidence.byId.get(rec.id) || { flags: [], top_referrer: null, returning: null };
      const evFlags = [...e.flags];
      if (flags.unknownUp) evFlags.push({ flag: 'NOT ON OUR LIST', label: 'not on our list', fact: 'On UpPromote, and not on your spreadsheet list.', source: 'this record: uppromote = yes, on_list = no' });
      const calc = s && s.from === 'finn' && s.net_sales != null && evidence.rate ? { value: cents(s.net_sales * evidence.rate.value), rate: evidence.rate.label, source: evidence.rate.source } : null;
      return { ...rec, _sales: s, _flags: flags, _evidence: { flags: evFlags, top_referrer: e.top_referrer, returning: e.returning }, _calc: calc, _up: imp.byId.get(rec.id) || null };
    });
    return {
      today, records, counts, statuses: STATUSES, types: TYPES, money,
      evidence: { present: evidence.present, error: evidence.error, read_at: evidence.read_at, source: evidence.source, note: evidence.note, unmatched: evidence.unmatched },
      upImport: imp.info ? { ...imp.info, error: imp.error || imp.info.error || null, flagCheck: imp.flagCheck } : null,
      sales: { present: !!sales.present, error: sales.error || null, read_at: sales.read_at || null, source: sales.source || null, window: sales.window || null, note: sales.note || null, unmatched: info.unmatched, ambiguous: info.ambiguous },
    };
  }

  function summary() {
    try { const v = view(); return { ...v.counts, salesFrom: v.sales.present ? 'finn' : 'seed', error: null }; }
    catch (e) { return { error: e.message }; }
  }

  // ---- edits ----
  function cleanUrl(v) {
    const s = cleanStr(v, 300);
    if (!s) return null;
    let u; try { u = new URL(s); } catch (_) { throw new Error('links must be full web addresses (https://...)'); }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error('links must start with http:// or https://');
    return u.href;
  }
  // Turn the page's flat form fields into record fields. Only known keys are read; anything else in
  // the body is ignored. Throws a plain Error with a message Evan can act on.
  function applyFields(rec, f, today) {
    if (!f || typeof f !== 'object' || Array.isArray(f)) throw new Error('nothing to save');
    const has = (k) => Object.prototype.hasOwnProperty.call(f, k);
    const field = (k, fn) => { if (has(k)) { try { rec[k] = fn(f[k]); } catch (e) { throw new Error(`${k.replace(/_/g, ' ')}: ${e.message}`); } } };
    field('name', (v) => { const s = cleanStr(v, 120); if (!s) throw new Error('a name is required'); return s; });
    for (const h of HANDLES) field(h, (v) => cleanStr(v, 200));
    field('email', (v) => { const s = cleanStr(v, 200); if (s && !/^\S+@\S+\.\S+$/.test(s)) throw new Error('that does not look like an email address'); return s; });
    field('phone', (v) => cleanStr(v, 40));
    field('city_state', (v) => cleanStr(v, 80));
    field('status', (v) => { const s = cleanStr(v, 20); if (s && !STATUSES.includes(s)) throw new Error('pick one of ' + STATUSES.join(', ')); return s; });
    field('type', (v) => { const s = cleanStr(v, 20); if (s && !TYPES.includes(s)) throw new Error('pick one of ' + TYPES.join(', ')); return s; });
    field('code', (v) => cleanStr(v, 40));
    field('last_contact', cleanDate);
    field('next_step', (v) => cleanStr(v, 400));
    field('notes', (v) => cleanStr(v, 4000, true));
    field('uppromote', (v) => { if (v === null || v === true || v === false) return v; throw new Error('yes, no or unknown'); });
    field('other_links', (v) => { if (!Array.isArray(v)) throw new Error('expected a list'); if (v.length > 8) throw new Error('eight links at most'); return v.map(cleanUrl).filter(Boolean); });
    // Two fields the seed stores as {value, source} objects. An edit from the page re-sources them to Evan.
    const bySelf = `${EDITOR}, ${today}`;
    if (has('commission')) {
      let s; try { s = cleanStr(f.commission, 160); } catch (e) { throw new Error('commission: ' + e.message); }
      const old = rec.commission && rec.commission.value;
      if ((old || null) !== s) rec.commission = s ? { value: s, source: bySelf } : null;
    }
    if (has('gifted_what') || has('gifted_when')) {
      const cur = rec.product_gifted || {};
      let what, when;
      try { what = has('gifted_what') ? cleanStr(f.gifted_what, 200) : cur.what || null; } catch (e) { throw new Error('product gifted: ' + e.message); }
      try { when = has('gifted_when') ? cleanDate(f.gifted_when) : cur.when || null; } catch (e) { throw new Error('date gifted: ' + e.message); }
      if ((cur.what || null) !== what || (cur.when || null) !== when) rec.product_gifted = what || when ? { what, when, source: bySelf } : null;
    }
  }

  function save(body) {
    const list = load();
    const rec = find(list, body.id);
    checkFresh(rec, body.seen_updated_at);
    const prevStatus = rec.status || null;
    try { applyFields(rec, body.fields, todayIso()); } catch (e) { throw new HttpError(400, e.message); }
    if ((rec.status || null) !== prevStatus) rec.status_source = `${EDITOR}, ${todayIso()}`;
    stamp(rec);
    persist(list);
    return { ok: true, id: rec.id, updated_at: rec.updated_at };
  }

  function create(body) {
    const list = load();
    const today = todayIso();
    const rec = {
      id: null, name: null, handle_instagram: null, handle_facebook: null, handle_tiktok: null, handle_youtube: null,
      other_links: [], email: null, phone: null, city_state: null, platform_followers: null,
      status: null, status_suggested: null, status_basis: null, type: 'creator', tier_or_type: null, on_list: true,
      code: null, commission: null, uppromote: null, product_gifted: null,
      last_contact: null, next_step: null, notes: null, source: [`Added in ROUX OS by Evan, ${today}`],
      archived: false, created_at: new Date().toISOString(),
    };
    try { applyFields(rec, body.fields, today); } catch (e) { throw new HttpError(400, e.message); }
    if (!rec.name) throw new HttpError(400, 'A name is required');
    const base = rec.name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'affiliate';
    let id = base, n = 2;
    while (list.some((r) => r.id === id)) id = `${base}-${n++}`;
    rec.id = id;
    if (rec.status) rec.status_source = `${EDITOR}, ${today}`;
    stamp(rec);
    list.push(rec);
    persist(list);
    return { ok: true, id, updated_at: rec.updated_at };
  }

  function archive(body) {
    if (typeof body.archived !== 'boolean') throw new HttpError(400, 'archived must be true or false');
    const list = load();
    const rec = find(list, body.id);
    rec.archived = body.archived;
    rec.archived_at = body.archived ? todayIso() : null;
    stamp(rec);
    persist(list);
    return { ok: true, id: rec.id, archived: rec.archived, updated_at: rec.updated_at };
  }

  function logContact(body) {
    const list = load();
    const rec = find(list, body.id);
    rec.last_contact = todayIso();
    stamp(rec);
    persist(list);
    return { ok: true, id: rec.id, last_contact: rec.last_contact, updated_at: rec.updated_at };
  }

  // A seed suggestion becomes the status only when Evan presses Accept. The reason stays on the record.
  function acceptSuggestion(body) {
    const list = load();
    const rec = find(list, body.id);
    if (!rec.status_suggested || !STATUSES.includes(rec.status_suggested)) throw new HttpError(400, 'There is no suggestion to accept');
    rec.status = rec.status_suggested;
    rec.status_source = `${EDITOR} accepted the seed suggestion, ${todayIso()}`;
    stamp(rec);
    persist(list);
    return { ok: true, id: rec.id, status: rec.status, updated_at: rec.updated_at };
  }

  // The words for a check-in request. The server builds them from the stored record, so the page
  // cannot put arbitrary text in Evan's capture file through this route.
  function checkinRequest(body) {
    const rec = find(load(), body.id);
    const handle = HANDLES.map((h) => rec[h]).find(Boolean) || 'no handle on file';
    const who = `${rec.name} (${handle})`;
    return {
      capture: `Draft a check-in to ${who} — Pete`,
      session: `Ask Pete to draft a check-in to ${who}. Their record is id "${rec.id}" in my-files (knowledge)/hpc-reference/affiliates/affiliates.json. Draft only, in Evan's voice, one ask. Evan sends it himself. No paid-content offers, and nothing through email marketing or SMS.`,
    };
  }

  return { view, summary, save, create, archive, logContact, acceptSuggestion, checkinRequest, DIR, STORE, SALES };
};
