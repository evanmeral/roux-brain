// ROUX OS — Affiliates tab. A searchable, sortable, editable roster.
// Uses the shared helpers from app.js ($, esc, toast, postJson). Everything that comes from a file is
// escaped with esc() before it reaches innerHTML; the drawer form is built with DOM calls and .value.
'use strict';
const AFF = { data: null, q: '', status: '', type: '', flags: new Set(), showArchived: false, sort: { key: 'net90', dir: -1 }, openId: null, isNew: false, view: 'money', importOpen: false, lastImport: null };
try { if (localStorage.getItem('roux.affview') === 'people') AFF.view = 'people'; } catch (_) {}

const AFF_FLAGS = [
  ['sold30', 'Sold in the last 30 days', 'sold30'],
  ['quiet30', 'Gone quiet 30+ days', 'quiet30'],
  ['unknownUp', 'On UpPromote, not on your list', 'unknownUp'],
  ['noContactInfo', 'No contact info', 'noContactInfo'],
  ['hasSales', 'Has sales', null],
  ['onUp', 'On UpPromote', null],
];
// Evidence flags (flags.json). Facts with counts, never verdicts; the chip text is the fact's own short form.
const AFF_EVIDENCE = ['COUPON SITE', 'NO VISIBLE REFERRAL', 'PAID-AD OVERLAP', 'NEW SIGN-UP', 'HIGH RETURNS'];
const AFF_EVIDENCE_LABEL = { 'COUPON SITE': 'Orders from deal domains', 'NO VISIBLE REFERRAL': 'No visible referral', 'PAID-AD OVERLAP': 'Paid-ad overlap', 'NEW SIGN-UP': 'New sign-up', 'HIGH RETURNS': 'High returns', 'NOT ON OUR LIST': 'Not on our list' };
const affFrac = (x) => (x ? `${x.orders} of ${x.of}` : '');
const AFF_FIELDS = [
  ['name', 'Name', 'text'], ['status', 'Status', 'status'], ['type', 'Type', 'type'], ['uppromote', 'On UpPromote', 'tri'],
  ['handle_instagram', 'Instagram', 'text'], ['handle_tiktok', 'TikTok', 'text'], ['handle_facebook', 'Facebook', 'text'], ['handle_youtube', 'YouTube', 'text'],
  ['email', 'Email', 'text'], ['phone', 'Phone', 'text'], ['city_state', 'City, state', 'text'], ['code', 'Code', 'text'],
  ['commission', 'Commission', 'text'], ['gifted_what', 'Product gifted', 'text'], ['gifted_when', 'Date gifted', 'date'], ['last_contact', 'Last contact', 'date'],
  ['next_step', 'Next step', 'area2'], ['other_links', 'Other links, one per line', 'area2'], ['notes', 'Notes', 'area5'],
];

// A handle or address -> a safe profile link, or null. Only http(s) ever becomes an href.
function affProfileUrl(kind, val) {
  if (!val) return null;
  const s = String(val).trim();
  if (/^https?:\/\//i.test(s)) { try { const u = new URL(s); return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : null; } catch (_) { return null; } }
  const h = s.replace(/^@/, '');
  if (!/^[A-Za-z0-9._-]{1,60}$/.test(h)) return null;
  return { handle_instagram: `https://www.instagram.com/${h}/`, handle_tiktok: `https://www.tiktok.com/@${h}`, handle_youtube: `https://www.youtube.com/@${h}`, handle_facebook: `https://www.facebook.com/${h}` }[kind] || null;
}
const affMoney = (n) => (n == null ? '—' : '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
const affShortDate = (iso) => { if (!iso) return '—'; const d = new Date(iso.slice(0, 10) + 'T12:00:00Z'); return isNaN(d) ? esc(iso) : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit', timeZone: 'UTC' }); };
function affSalesTitle(s) {
  if (!s) return 'No sales read for this person';
  const who = s.from === 'finn' ? "Finn's read" : "Pete's seed read, hand-summed, unconfirmed";
  return [who, s.read_at ? 'read ' + s.read_at : '', s.window ? 'window ' + s.window : '', s.source || '', s.caveat || ''].filter(Boolean).join(' · ');
}

async function loadAffiliates() {
  try {
    const r = await fetch('/api/affiliates', { cache: 'no-store' }); const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.status);
    AFF.data = j;
  } catch (e) { AFF.data = { error: e.message }; }
  renderAffiliates();
}

function affVisible() {
  const d = AFF.data; const q = AFF.q.toLowerCase().trim();
  let list = d.records.filter((r) => AFF.showArchived ? true : !r.archived);
  if (q) list = list.filter((r) => [r.name, r.handle_instagram, r.handle_tiktok, r.handle_facebook, r.handle_youtube, r.email, r.phone, r.city_state, r.notes, r.next_step, r.status, r.type].some((v) => v && String(v).toLowerCase().includes(q)));
  if (AFF.status) list = list.filter((r) => AFF.status === '(none)' ? !r.status : r.status === AFF.status);
  if (AFF.type) list = list.filter((r) => r.type === AFF.type);
  for (const f of AFF.flags) list = list.filter((r) => f === 'onUp' ? r.uppromote === true : AFF_EVIDENCE.includes(f) ? r._evidence.flags.some((x) => x.flag === f) : r._flags[f]);
  const val = {
    name: (r) => (r.name || '').toLowerCase(), status: (r) => r.status || (r.status_suggested ? '~' + r.status_suggested : null), type: (r) => r.type || null,
    up: (r) => (r.uppromote === true ? 1 : r.uppromote === false ? 0 : null), orders: (r) => r._sales && r._sales.orders, net: (r) => r._sales && r._sales.net_sales, net90: (r) => r._sales && r._sales.net_sales_90d,
    flags: (r) => r._evidence.flags.length || null, ref: (r) => r._evidence.top_referrer && r._evidence.top_referrer.name, ret: (r) => r._evidence.returning && r._evidence.returning.orders,
    calc: (r) => r._calc && r._calc.value, paid: (r) => r._up && r._up.paid,
    last: (r) => r._sales && (r._sales.last_sale || (r._sales.orders_30d ? '0000-' + String(r._sales.orders_30d).padStart(6, '0') : null)), contact: (r) => r.last_contact || null,
  }[AFF.sort.key];
  return list.sort((a, b) => {
    const x = val(a), y = val(b);
    if (x == null && y == null) return (a.name || '').localeCompare(b.name || '');
    if (x == null) return 1; if (y == null) return -1;       // blanks always last
    return (x < y ? -1 : x > y ? 1 : 0) * AFF.sort.dir || (a.name || '').localeCompare(b.name || '');
  });
}

function renderAffiliates() {
  const d = AFF.data, head = $('aff-head'), body = $('aff-body');
  if (!d) { body.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (d.error) { head.innerHTML = ''; body.innerHTML = `<div class="empty bad">Cannot read the affiliates file: ${esc(d.error)}</div>`; return; }
  const c = d.counts, m = d.money || {};
  const typing = document.activeElement && document.activeElement.id === 'aff-q';   // keep the caret if a file change re-renders mid-search

  // header tiles: what UpPromote credits, what our own list accounts for, and what was actually paid
  const readDay = (x) => (x && x.read_at ? String(x.read_at).slice(0, 10) : '');
  const tile = (label, x) => x
    ? `<div class="money-tile" title="${esc([x.how, x.window ? 'window ' + x.window : '', x.source].filter(Boolean).join(' · '))}"><span class="eyebrow">${label}</span><span class="money-n">${affMoney(x.value)}</span><span class="money-sub">credited, not incremental · Finn, Shopify, read ${esc(readDay(x))}</span></div>`
    : `<div class="money-tile"><span class="eyebrow">${label}</span><span class="money-n dim">no sales read</span><span class="money-sub">waiting on sales-by-affiliate.json from Finn</span></div>`;
  const paid = m.paid
    ? `<div class="money-tile" title="${esc([m.paid.how, m.paid.source].filter(Boolean).join(' · '))}"><span class="eyebrow">Paid out</span><span class="money-n">${affMoney(m.paid.value)}</span><span class="money-sub">${esc(m.paid.how || '')} · ${esc(m.paid.source || '')}</span></div>`
    : `<div class="money-tile is-unread"><span class="eyebrow">Paid out</span><span class="money-n">not read</span><span class="money-sub">needs an UpPromote export. A 5% calculation is not a payout and is never shown here.</span></div>`;

  let sales;
  if (d.sales.error) sales = `<span class="bad">${esc(d.sales.error)}</span>`;
  else if (d.sales.present) sales = `Sales: Finn's read${d.sales.read_at ? ' of ' + esc(String(d.sales.read_at).slice(0, 16).replace('T', ' ')) : ''}${d.sales.window ? ' · window ' + esc(d.sales.window) : ''} · <span class="aff-src" title="${esc([d.sales.source, d.sales.note].filter(Boolean).join(' · '))}">source and method on hover</span>. Credited by order tag, not incremental.`;
  else sales = `No sales read from Finn yet. The gray figures are Pete's seed read of 2026-09-21: hand-summed and unconfirmed. Credited by order tag, not incremental.`;
  if (d.evidence && d.evidence.error) sales += ` <span class="bad">${esc(d.evidence.error)}</span>`;
  else if (d.evidence && d.evidence.present) sales += ` Flags: <span class="aff-src" title="${esc([d.evidence.source, d.evidence.note].filter(Boolean).join(' · '))}">facts from Finn's report, read ${esc(d.evidence.read_at || '')}</span>. No flag means no evidence was read, not a clean bill.`;
  const odd = [];
  if (d.sales.unmatched && d.sales.unmatched.length) odd.push(`<details class="aff-odd"><summary>${d.sales.unmatched.length} name${d.sales.unmatched.length === 1 ? '' : 's'} in the sales read match nobody here</summary>${d.sales.unmatched.map((u) => esc(u.name)).join(' · ')}</details>`);
  if (d.sales.ambiguous && d.sales.ambiguous.length) odd.push(`<details class="aff-odd"><summary>${d.sales.ambiguous.length} sales row${d.sales.ambiguous.length === 1 ? '' : 's'} could match more than one person, so they are not shown</summary>${d.sales.ambiguous.map(esc).join(' · ')}</details>`);
  if (d.evidence && d.evidence.unmatched && d.evidence.unmatched.length) odd.push(`<details class="aff-odd"><summary>${d.evidence.unmatched.length} name${d.evidence.unmatched.length === 1 ? '' : 's'} in flags.json match nobody here</summary>${d.evidence.unmatched.map(esc).join(' · ')}</details>`);

  const live = d.records.filter((r) => !r.archived);
  const evCount = (f) => live.filter((r) => r._evidence.flags.some((x) => x.flag === f)).length;
  head.innerHTML = `
    <div class="money-row">${tile('Credited by UpPromote', m.credited)}${tile('On our list', m.on_list)}${paid}
      <button class="money-tile is-action" id="aff-import-toggle"><span class="eyebrow">UpPromote export</span><span class="money-n">${d.upImport && d.upImport.present ? 'Imported' : 'Import'}</span><span class="money-sub">${d.upImport && d.upImport.present ? esc(d.upImport.files.map((f) => `${f.kind}: ${f.rows} rows`).join(' · ')) : 'you export the CSV, the page reads it on this machine'}${d.upImport && d.upImport.inbox.length ? ` · <b>${d.upImport.inbox.length} CSV in your inbox</b>` : ''}</span></button></div>
    <div id="aff-import" class="${AFF.importOpen ? '' : 'is-hidden'}"></div>
    <div class="aff-flags">${AFF_FLAGS.map(([k, label, ck]) => `<button class="flag ${AFF.flags.has(k) ? 'is-on' : ''} ${k === 'sold30' ? 'is-good' : ''}" data-flag="${k}">${ck ? `<b>${c[ck]}</b>` : ''}${esc(label)}</button>`).join('')}
      <span class="flag-sep"></span>${AFF_EVIDENCE.map((f) => { const n = evCount(f); return n ? `<button class="flag is-evidence ${AFF.flags.has(f) ? 'is-on' : ''}" data-flag="${esc(f)}" title="A fact from Finn's report, with counts. Not a verdict."><b>${n}</b>${esc(AFF_EVIDENCE_LABEL[f])}</button>` : ''; }).join('')}</div>
    <div class="aff-tools">
      <input type="search" id="aff-q" placeholder="Search a name, handle, email, city or note" autocomplete="off" value="${esc(AFF.q)}">
      <select id="aff-status"><option value="">Any status</option>${d.statuses.map((s) => `<option ${AFF.status === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}<option value="(none)" ${AFF.status === '(none)' ? 'selected' : ''}>no status yet</option></select>
      <select id="aff-type"><option value="">Any type</option>${d.types.map((s) => `<option ${AFF.type === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select>
      <span class="seg"><button class="${AFF.view === 'money' ? 'is-on' : ''}" data-view="money" title="Sales, flags, referrers, commission">Money</button><button class="${AFF.view === 'people' ? 'is-on' : ''}" data-view="people" title="Status, contact, last contact">People</button></span>
      <label class="aff-check"><input type="checkbox" id="aff-arch" ${AFF.showArchived ? 'checked' : ''}> show archived</label>
      <button class="btn is-primary" id="aff-add">Add affiliate</button>
    </div>
    <div class="aff-sales">${sales} <span class="mono stamp">${c.total} people${c.archived ? ` · ${c.archived} archived` : ''}${c.suggestions ? ` · ${c.suggestions} status suggestions to review` : ''}</span>${odd.join('')}</div>`;
  head.querySelectorAll('[data-flag]').forEach((b) => b.addEventListener('click', () => { const k = b.dataset.flag; if (AFF.flags.has(k)) AFF.flags.delete(k); else AFF.flags.add(k); renderAffiliates(); }));
  head.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => { AFF.view = b.dataset.view; try { localStorage.setItem('roux.affview', AFF.view); } catch (_) {} AFF.sort = AFF.view === 'money' ? { key: 'net90', dir: -1 } : { key: 'name', dir: 1 }; renderAffiliates(); }));
  const q = $('aff-q');
  q.addEventListener('input', () => { AFF.q = q.value; renderAffTable(); });
  $('aff-status').addEventListener('change', (e) => { AFF.status = e.target.value; renderAffTable(); });
  $('aff-type').addEventListener('change', (e) => { AFF.type = e.target.value; renderAffTable(); });
  $('aff-arch').addEventListener('change', (e) => { AFF.showArchived = e.target.checked; renderAffTable(); });
  $('aff-add').addEventListener('click', () => openAffDrawer(null));
  $('aff-import-toggle').addEventListener('click', () => { AFF.importOpen = !AFF.importOpen; renderAffiliates(); });
  if (AFF.importOpen) renderAffImport();
  if (typing) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
  renderAffTable();
}

// ---- Import UpPromote export: Evan's own CSV, parsed by the local server. Nothing leaves this machine. ----
function renderAffImport() {
  const box = $('aff-import'), up = AFF.data.upImport || { files: [], inbox: [] };
  const kindSel = (id) => `<select id="${id}"><option value="auto">work out the kind</option><option value="affiliates">affiliates list</option><option value="referrals">referrals (orders)</option><option value="payments">payments</option></select>`;
  const fileCard = (f) => `<div class="imp-file"><strong>${esc(f.name)}</strong> <span class="pill is-kind">${esc(f.kind)}</span> <span class="mono stamp">${esc(f.rows)} rows · imported ${esc(String(f.imported_at).slice(0, 10))}</span>
      <div class="dr-src">Used: ${Object.entries(f.mapped || {}).map(([k, v]) => `${esc(v)} → ${esc(k)}`).join(' · ') || 'nothing'}</div>
      ${f.unmapped && f.unmapped.length ? `<div class="imp-warn">Unmapped columns, left out rather than guessed at: ${f.unmapped.map(esc).join(' · ')}. If one of these matters, tell ROUX its name and Nova adds it to the mapper.</div>` : '<div class="dr-src">Every column was mapped.</div>'}
      ${f.unparsed_amounts ? `<div class="imp-warn">${esc(f.unparsed_amounts)} money value${f.unparsed_amounts === 1 ? '' : 's'} did not read as a number and were left blank.</div>` : ''}</div>`;
  box.innerHTML = `<div class="imp">
    <div class="imp-how"><span class="eyebrow">Import an UpPromote export</span>
      <p>In UpPromote, export <strong>Affiliates</strong>, <strong>Referrals</strong> (all time) and <strong>Payments</strong> as CSV. Drop them in <code>my-inbox (new inputs)/</code> or pick a file here. The page reads the file on this machine and keeps only the columns it recognizes. It never logs in to UpPromote and sends nothing anywhere. A new export of a kind replaces the last one.</p></div>
    <div class="imp-row">${up.inbox.length ? up.inbox.map((n) => `<span class="imp-inbox"><code>${esc(n)}</code><button class="btn btn-sm" data-inbox="${esc(n)}">Import</button></span>`).join('') : '<span class="dim">No CSV in the inbox folder right now.</span>'}</div>
    <div class="imp-row"><input type="file" id="imp-pick" accept=".csv,text/csv"> ${kindSel('imp-kind')} <button class="btn" id="imp-go">Import the picked file</button></div>
    ${up.error ? `<div class="bad">${esc(up.error)}</div>` : ''}
    ${(up.files || []).map(fileCard).join('') || '<div class="dim">Nothing imported yet. Until then "Paid out" reads "not read".</div>'}</div>`;
  const run = async (payload, btn) => {
    btn.disabled = true;
    const j = await postJson('/api/affiliates/import', { ...payload, kind: $('imp-kind').value });
    btn.disabled = false;
    if (j) { toast(`Imported ${j.rows} ${j.kind} rows${j.unmapped.length ? `. ${j.unmapped.length} column${j.unmapped.length === 1 ? '' : 's'} left unmapped` : ''}.`); await loadAffiliates(); }
  };
  box.querySelectorAll('[data-inbox]').forEach((b) => b.addEventListener('click', () => run({ from: 'inbox', file: b.dataset.inbox }, b)));
  $('imp-go').addEventListener('click', async () => {
    const f = $('imp-pick').files[0];
    if (!f) { toast('Pick a CSV file first.', true); return; }
    if (f.size > 8 * 1024 * 1024) { toast('That file is too large to be an UpPromote export.', true); return; }
    run({ from: 'upload', name: f.name, text: await f.text() }, $('imp-go'));
  });
}

function affFlagChips(r, max) {
  const fl = r._evidence.flags; if (!fl.length) return '';
  const shown = max ? fl.slice(0, max) : fl;
  return shown.map((f) => `<span class="evi is-${esc(f.flag.toLowerCase().replace(/[^a-z]+/g, '-'))}" title="${esc(`${AFF_EVIDENCE_LABEL[f.flag] || f.flag}: ${f.fact} Source: ${f.source}`)}">${esc(f.label)}</span>`).join('') + (fl.length > shown.length ? `<span class="evi" title="${esc(fl.slice(shown.length).map((f) => f.label).join(' · '))}">+${fl.length - shown.length}</span>` : '');
}

function renderAffTable() {
  const body = $('aff-body'); const list = affVisible(); const d = AFF.data;
  const money = AFF.view === 'money';
  const rate = d.money && d.money.rate;
  const cols = money
    ? [['name', 'Name'], ['flags', 'Flags'], ['net90', 'Net 90d', 'num'], ['net', 'Net all', 'num'], ['orders', 'Orders', 'num'], ['last', 'Last sale'], ['ref', 'Top referrer'], ['ret', 'Returning'], ['calc', rate ? `Calc at ${esc(rate.label)}<br><span class="th-sub">not a payout</span>` : 'Calc commission', 'num'], ['paid', 'Paid', 'num']]
    : [['name', 'Name'], ['status', 'Status'], ['type', 'Type'], ['up', 'UpPromote'], ['flags', 'Flags'], ['net', 'Net all', 'num'], ['last', 'Last sale'], ['contact', 'Last contact']];
  const th = cols.map(([k, l, cls]) => `<th data-sort="${k}" class="${cls || ''} ${AFF.sort.key === k ? 'is-sorted' : ''}">${l}${AFF.sort.key === k ? (AFF.sort.dir > 0 ? ' ↑' : ' ↓') : ''}</th>`).join('') + (money ? '' : '<th></th>');
  const today = d.today;
  const paidRead = !!(d.money && d.money.paid) || !!(d.upImport && d.upImport.present);
  const rows = list.map((r) => {
    const s = r._sales, seed = s && s.from === 'seed', sc = seed ? 'is-seed' : '', st = esc(affSalesTitle(s));
    const handle = r.handle_instagram || r.handle_tiktok || r.handle_facebook || r.handle_youtube || '';
    const name = `<td class="aff-name"><strong>${esc(r.name)}</strong>${r._flags.sold30 ? '<span class="dotg" title="Sold in the last 30 days"></span>' : ''}${r._flags.unknownUp && r._flags.noContactInfo ? '<span class="who" title="Credited on UpPromote with no contact info on file">who is this?</span>' : ''}${handle ? `<br><span class="dim">${esc(handle)}</span>` : ''}</td>`;
    const last = s ? (s.last_sale ? affShortDate(s.last_sale) : s.orders_30d ? `${s.orders_30d} in 30d` : '—') : '—';
    const netAll = `<td class="num ${sc}" title="${st}">${s ? affMoney(s.net_sales) : '—'}</td>`;
    const lastTd = `<td class="${sc}" title="${st}">${last}</td>`;
    if (money) {
      const e = r._evidence, up = r._up;
      return `<tr data-id="${esc(r.id)}" class="${r.archived ? 'is-archived' : ''} ${AFF.openId === r.id ? 'is-on' : ''}">${name}
        <td class="aff-evi">${affFlagChips(r, 3)}</td>
        <td class="num ${sc}" title="${st}">${s && s.net_sales_90d != null ? affMoney(s.net_sales_90d) : '—'}</td>${netAll}
        <td class="num ${sc}" title="${st}">${s && s.orders != null ? esc(s.orders) : '—'}</td>${lastTd}
        <td title="${esc(e.top_referrer ? e.top_referrer.source : 'Finn’s report gives no referrer split for this name')}">${e.top_referrer ? `${esc(e.top_referrer.name)} <span class="dim">${esc(affFrac(e.top_referrer))}</span>` : '<span class="dim">—</span>'}</td>
        <td title="${esc(e.returning ? 'Returning customers. ' + e.returning.source : 'Finn’s report gives no returning-customer count for this name')}">${e.returning ? esc(affFrac(e.returning)) : '<span class="dim">—</span>'}</td>
        <td class="num is-calc" title="${esc(r._calc ? `A calculation, not a payout: net sales x ${r._calc.rate}. ${r._calc.source}` : 'No calculation without a Finn sales row')}">${r._calc ? affMoney(r._calc.value) : '—'}</td>
        <td class="num" title="${esc(up && up.source ? up.source : 'Paid amounts come only from an UpPromote export')}">${up && up.paid != null ? affMoney(up.paid) : `<span class="dim">${paidRead ? '—' : 'not read'}</span>`}</td></tr>`;
    }
    const status = r.status ? `<span class="pill is-${esc(r.status)}">${esc(r.status)}</span>` : r.status_suggested ? `<span class="pill is-suggest" title="A suggestion from the seed, not a fact. Open the row to accept it or set your own.">${esc(r.status_suggested)}?</span>` : '<span class="dim">—</span>';
    const contactAge = r.last_contact ? Math.round((new Date(today) - new Date(r.last_contact)) / 86400000) : null;
    return `<tr data-id="${esc(r.id)}" class="${r.archived ? 'is-archived' : ''} ${AFF.openId === r.id ? 'is-on' : ''}">${name}
      <td>${status}</td><td class="dim">${esc(r.type || '—')}</td><td class="dim">${r.uppromote === true ? 'yes' : r.uppromote === false ? 'no' : '—'}</td>
      <td class="aff-evi">${affFlagChips(r, 2)}</td>${netAll}${lastTd}
      <td class="${contactAge != null && contactAge >= 30 ? 'warn' : ''}">${r.last_contact ? affShortDate(r.last_contact) : '<span class="dim">never logged</span>'}</td>
      <td class="aff-act"><button class="wait-done" data-contact="${esc(r.id)}" title="Set last contact to today">Log contact today</button></td></tr>`;
  }).join('');
  body.innerHTML = `<div class="mono stamp aff-count">${list.length} shown${money ? ' · flags are facts with counts, hover for the full fact and its source' : ''}</div><div class="aff-scroll"><table class="aff-table"><thead><tr>${th}</tr></thead><tbody>${rows || `<tr><td colspan="${cols.length + 1}" class="empty">Nobody matches that.</td></tr>`}</tbody></table></div>`;
  body.querySelectorAll('th[data-sort]').forEach((h) => h.addEventListener('click', () => {
    const k = h.dataset.sort; if (AFF.sort.key === k) AFF.sort.dir *= -1; else AFF.sort = { key: k, dir: ['name', 'status', 'type', 'ref'].includes(k) ? 1 : -1 };
    renderAffTable();
  }));
  body.querySelectorAll('tbody tr[data-id]').forEach((tr) => tr.addEventListener('click', (ev) => { if (ev.target.closest('button, a')) return; openAffDrawer(tr.dataset.id); }));
  body.querySelectorAll('[data-contact]').forEach((b) => b.addEventListener('click', async () => {
    b.disabled = true;
    const j = await postJson('/api/affiliates/contact', { id: b.dataset.contact });
    if (j) { toast('Logged. Last contact is today.'); await loadAffiliates(); if (AFF.openId === b.dataset.contact) openAffDrawer(AFF.openId); } else b.disabled = false;
  }));
}

// ---- the drawer ----
function el(tag, props = {}, kids = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) { if (k === 'class') n.className = v; else if (k === 'text') n.textContent = v; else if (k.startsWith('on')) n.addEventListener(k.slice(2), v); else if (v !== null && v !== undefined && v !== false) n.setAttribute(k, v === true ? '' : v); }
  for (const c of [].concat(kids)) if (c) n.append(c);
  return n;
}
function closeAffDrawer() { AFF.openId = null; AFF.isNew = false; $('aff-drawer').classList.remove('is-on'); $('aff-shade').classList.remove('is-on'); document.querySelectorAll('.aff-table tr.is-on').forEach((t) => t.classList.remove('is-on')); }

function openAffDrawer(id) {
  const d = AFF.data; if (!d || d.error) return;
  const rec = id ? d.records.find((r) => r.id === id) : { name: '', type: 'creator', other_links: [], _flags: {}, _sales: null, _evidence: { flags: [] } };
  if (!rec) return closeAffDrawer();
  AFF.openId = id; AFF.isNew = !id;
  document.querySelectorAll('.aff-table tr').forEach((t) => t.classList.toggle('is-on', !!id && t.dataset.id === id));
  const box = $('aff-drawer'); box.textContent = '';
  const inputs = {};
  const valueOf = (k) => k === 'commission' ? (rec.commission && rec.commission.value) || '' : k === 'gifted_what' ? (rec.product_gifted && rec.product_gifted.what) || '' : k === 'gifted_when' ? (rec.product_gifted && rec.product_gifted.when) || '' : k === 'other_links' ? (rec.other_links || []).join('\n') : rec[k] == null ? '' : rec[k];

  box.append(el('div', { class: 'dr-head' }, [el('div', {}, [el('div', { class: 'dr-title', text: id ? rec.name : 'New affiliate' }), el('div', { class: 'mono stamp', text: id ? (rec.updated_at ? `edited ${new Date(rec.updated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })} by ${rec.updated_by || '?'}` : 'not edited since the seed') + (rec.archived ? ' · archived ' + (rec.archived_at || '') : '') : 'Saved to affiliates.json on this machine' })]), el('button', { class: 'ghost', text: 'close', onclick: closeAffDrawer })]));

  if (id) { // profile and contact links
    const links = [];
    for (const [k, label] of [['handle_instagram', 'Instagram'], ['handle_tiktok', 'TikTok'], ['handle_facebook', 'Facebook'], ['handle_youtube', 'YouTube']]) { const u = affProfileUrl(k, rec[k]); if (u) links.push(el('a', { class: 'tag is-link', href: u, target: '_blank', rel: 'noopener noreferrer', text: `${label} ${rec[k]}` })); }
    (rec.other_links || []).forEach((l) => { const u = affProfileUrl('other', l); if (u) links.push(el('a', { class: 'tag is-link', href: u, target: '_blank', rel: 'noopener noreferrer', text: new URL(u).hostname.replace(/^www\./, '') })); });
    if (rec.email && /^\S+@\S+\.\S+$/.test(rec.email)) links.push(el('a', { class: 'tag is-link', href: 'mailto:' + encodeURIComponent(rec.email).replace(/%40/g, '@'), text: rec.email }));
    if (rec.phone) links.push(el('a', { class: 'tag is-link', href: 'tel:' + rec.phone.replace(/[^\d+]/g, ''), text: rec.phone }));
    if (links.length) box.append(el('div', { class: 'dr-links' }, links));
  }
  if (id && !rec.status && rec.status_suggested) {
    box.append(el('div', { class: 'dr-suggest' }, [
      el('div', {}, [el('span', { class: 'eyebrow', text: 'Suggestion, not a fact' }), el('div', { text: `Status "${rec.status_suggested}". ${rec.status_basis || ''}` })]),
      el('button', { class: 'btn', text: 'Accept', onclick: async (ev) => { ev.target.disabled = true; const j = await postJson('/api/affiliates/accept', { id }); if (j) { toast(`Status set to ${j.status}.`); await loadAffiliates(); openAffDrawer(id); } else ev.target.disabled = false; } }),
    ]));
  }

  const form = el('form', { class: 'dr-form', autocomplete: 'off' });
  for (const [k, label, kind] of AFF_FIELDS) {
    let input;
    if (kind === 'status' || kind === 'type') { const opts = kind === 'status' ? ['', ...d.statuses] : d.types; input = el('select', {}, opts.map((o) => el('option', { value: o, text: o || 'not set' }))); input.value = valueOf(k) || (kind === 'type' ? 'creator' : ''); }
    else if (kind === 'tri') { input = el('select', {}, [['', 'not known'], ['true', 'yes'], ['false', 'no']].map(([v, t]) => el('option', { value: v, text: t }))); input.value = rec.uppromote === true ? 'true' : rec.uppromote === false ? 'false' : ''; }
    else if (kind.startsWith('area')) { input = el('textarea', { rows: kind.slice(4) }); input.value = valueOf(k); }
    else { input = el('input', { type: kind === 'date' ? 'date' : 'text' }); input.value = valueOf(k); }
    inputs[k] = input;
    form.append(el('label', { class: 'dr-field' + (kind.startsWith('area') || k === 'name' ? ' is-wide' : '') }, [el('span', { text: label }), input]));
  }
  box.append(form);

  const collect = () => {
    const f = {};
    for (const [k, , kind] of AFF_FIELDS) { const v = inputs[k].value; f[k] = kind === 'tri' ? (v === '' ? null : v === 'true') : k === 'other_links' ? v.split('\n').map((x) => x.trim()).filter(Boolean) : v.trim() === '' ? null : v; }
    return f;
  };
  const save = async (btn) => {
    btn.disabled = true;
    const j = id ? await postJson('/api/affiliates/save', { id, seen_updated_at: rec.updated_at || null, fields: collect() }) : await postJson('/api/affiliates/create', { fields: collect() });
    btn.disabled = false;
    if (!j) return;
    toast(id ? 'Saved.' : 'Added.');
    await loadAffiliates(); openAffDrawer(j.id);
  };
  form.addEventListener('submit', (ev) => { ev.preventDefault(); save(saveBtn); });
  const saveBtn = el('button', { class: 'btn is-primary', type: 'button', text: id ? 'Save' : 'Add', onclick: (ev) => save(ev.target) });
  const actions = [saveBtn];
  if (id) {
    actions.push(el('button', { class: 'btn', type: 'button', text: 'Log contact today', onclick: async () => { const j = await postJson('/api/affiliates/contact', { id }); if (j) { toast('Logged. Last contact is today.'); await loadAffiliates(); openAffDrawer(id); } } }));
    actions.push(el('button', { class: 'btn', type: 'button', title: 'Sends nothing. Leaves a note so the next session has Pete draft it. You send it yourself.', text: 'Draft a check-in', onclick: async () => { const j = await postJson('/api/affiliates/checkin', { id, mode: 'capture' }); if (j) { toast('Noted. The next session has Pete draft it. Nothing was sent.'); loadState().catch(() => {}); } } }));
    actions.push(el('button', { class: 'ghost', type: 'button', title: 'Open a Claude session now that asks Pete for the draft. Uses plan allowance.', text: 'draft it now', onclick: async () => { const j = await postJson('/api/affiliates/checkin', { id, mode: 'session' }); if (j) toast('Session opened in Terminal.'); } }));
    actions.push(el('button', { class: 'ghost dr-arch', type: 'button', text: rec.archived ? 'restore' : 'archive', title: 'Nothing is deleted. Archived people are hidden until you tick "show archived".', onclick: async () => { const j = await postJson('/api/affiliates/archive', { id, archived: !rec.archived }); if (j) { toast(j.archived ? 'Archived. Tick "show archived" to see them again.' : 'Restored.'); await loadAffiliates(); if (j.archived && !AFF.showArchived) closeAffDrawer(); else openAffDrawer(id); } } }));
  }
  box.append(el('div', { class: 'dr-actions' }, actions));

  if (id) { // read-only facts, each with where it came from
    const facts = el('div', { class: 'dr-facts' });
    const fact = (label, value, source) => facts.append(el('div', { class: 'dr-fact' }, [el('span', { class: 'mono stamp', text: label }), el('div', { text: value }), source ? el('div', { class: 'dr-src', text: source }) : null]));
    for (const f of rec._evidence.flags) fact(AFF_EVIDENCE_LABEL[f.flag] || f.flag, f.fact, f.source);
    if (rec._evidence.top_referrer) fact('Top referrer', `${rec._evidence.top_referrer.name}: ${affFrac(rec._evidence.top_referrer)} orders`, rec._evidence.top_referrer.source);
    if (rec._evidence.returning) fact('Returning customers', `${affFrac(rec._evidence.returning)} orders`, rec._evidence.returning.source);
    if (rec._calc) fact(`Calc commission at ${rec._calc.rate}. Not a payout`, affMoney(rec._calc.value), rec._calc.source);
    fact('Paid by UpPromote', rec._up && rec._up.paid != null ? affMoney(rec._up.paid) + (rec._up.unpaid != null ? ` paid · ${affMoney(rec._up.unpaid)} unpaid` : '') : 'not read', rec._up && rec._up.source ? rec._up.source : 'Comes only from an UpPromote export. Import one from the top of this tab.');
    if (rec._up && (rec._up.site || rec._up.signed_up || rec._up.up_status)) fact('From the UpPromote export', [rec._up.site ? 'site ' + rec._up.site : '', rec._up.signed_up ? 'signed up ' + rec._up.signed_up : '', rec._up.up_status ? 'status ' + rec._up.up_status : ''].filter(Boolean).join(' · '), rec._up.source);
    const s = rec._sales;
    if (s) fact(s.from === 'finn' ? "Sales, Finn's read" : "Sales, Pete's seed read (hand-summed, unconfirmed)", `${s.orders == null ? '—' : s.orders} orders · ${affMoney(s.net_sales)} net${s.first_sale ? ' · first ' + s.first_sale : ''}${s.last_sale ? ' · last ' + s.last_sale : ''}${s.orders_30d != null ? ` · last 30 days: ${s.orders_30d} orders` + (s.net_sales_30d != null ? ', ' + affMoney(s.net_sales_30d) : '') : ''}${s.orders_90d != null ? ` · last 90 days: ${s.orders_90d} orders` + (s.net_sales_90d != null ? ', ' + affMoney(s.net_sales_90d) : '') : ''}`, [s.read_at ? 'Read ' + s.read_at : '', s.window ? 'Window ' + s.window : '', s.source, s.caveat || 'Credited by order tag. Attribution, not incremental revenue.'].filter(Boolean).join(' · '));
    else fact('Sales', d.sales.present ? "Not in Finn's sales read." : 'No sales read yet.', '');
    if (rec.platform_followers && rec.platform_followers.instagram != null) fact('Instagram followers', Number(rec.platform_followers.instagram).toLocaleString('en-US'), [rec.platform_followers.source, rec.platform_followers.as_of_note].filter(Boolean).join(' · '));
    if (rec.commission && rec.commission.source) fact('Commission source', rec.commission.value || '', rec.commission.source);
    if (rec.product_gifted && rec.product_gifted.source) fact('Product gifted source', rec.product_gifted.what || '', rec.product_gifted.source);
    if (rec.sheet_already_affiliate || rec.sheet_response) fact('From the spreadsheet', [rec.sheet_already_affiliate ? `Already affiliate? ${rec.sheet_already_affiliate}` : '', rec.sheet_response || ''].filter(Boolean).join(' · '), '');
    if (rec.status && rec.status_source) fact('Status set by', rec.status_source, rec.status_basis || '');
    if (rec.tier_or_type) fact('Type, as the seed describes it', rec.tier_or_type, '');
    if ((rec.source || []).length) fact('Record sources', rec.source.join(' · '), '');
    box.append(facts);
  }
  box.classList.add('is-on'); $('aff-shade').classList.add('is-on'); box.scrollTop = 0;
  if (!id) inputs.name.focus();
}

function initAffiliates() {
  $('aff-shade').addEventListener('click', closeAffDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('aff-drawer').classList.contains('is-on')) closeAffDrawer(); });
}
