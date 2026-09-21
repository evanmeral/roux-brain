// Affiliates — the editable roster behind the Affiliates tab.
//
// Store:  my-files (knowledge)/hpc-reference/affiliates/affiliates.json   (the OS writes this)
// Sales:  my-files (knowledge)/hpc-reference/affiliates/sales-by-affiliate.json   (Finn drops this in;
//         the OS only reads it and joins it by id or name at render time, so a fresh read never
//         touches Evan's edits)
//
// Rules this module keeps:
//  - It never computes or estimates a sales figure. It shows what a file holds, with its source.
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

module.exports = function makeAffiliates({ vault, todayIso }) {
  const DIR = path.join(vault, 'my-files (knowledge)', 'hpc-reference', 'affiliates');
  const STORE = path.join(DIR, 'affiliates.json');
  const SALES = path.join(DIR, 'sales-by-affiliate.json');
  const BACKUPS = path.join(DIR, 'backups');

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

  function view() {
    const today = todayIso();
    const list = load();
    const sales = readSales();
    const { out, info } = joinSales(list, sales);
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
      return { ...rec, _sales: s, _flags: flags };
    });
    return {
      today, records, counts, statuses: STATUSES, types: TYPES,
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
