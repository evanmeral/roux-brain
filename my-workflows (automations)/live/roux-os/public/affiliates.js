// ROUX OS — Affiliates tab. A searchable, sortable, editable roster.
// Uses the shared helpers from app.js ($, esc, toast, postJson). Everything that comes from a file is
// escaped with esc() before it reaches innerHTML; the drawer form is built with DOM calls and .value.
'use strict';
const AFF = { data: null, q: '', status: '', type: '', flags: new Set(), showArchived: false, sort: { key: 'net', dir: -1 }, openId: null, isNew: false };

const AFF_FLAGS = [
  ['sold30', 'Sold in the last 30 days', 'sold30'],
  ['quiet30', 'Gone quiet 30+ days', 'quiet30'],
  ['unknownUp', 'On UpPromote, not on your list', 'unknownUp'],
  ['noContactInfo', 'No contact info', 'noContactInfo'],
  ['hasSales', 'Has sales', null],
  ['onUp', 'On UpPromote', null],
];
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
  for (const f of AFF.flags) list = list.filter((r) => f === 'onUp' ? r.uppromote === true : r._flags[f]);
  const val = {
    name: (r) => (r.name || '').toLowerCase(), status: (r) => r.status || (r.status_suggested ? '~' + r.status_suggested : null), type: (r) => r.type || null,
    up: (r) => (r.uppromote === true ? 1 : r.uppromote === false ? 0 : null), orders: (r) => r._sales && r._sales.orders, net: (r) => r._sales && r._sales.net_sales,
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
  const c = d.counts;
  const typing = document.activeElement && document.activeElement.id === 'aff-q';   // keep the caret if a file change re-renders mid-search
  // sales banner: whose numbers these are, always said out loud
  let sales;
  if (d.sales.error) sales = `<span class="bad">${esc(d.sales.error)}</span>`;
  else if (d.sales.present) sales = `Sales: Finn's read${d.sales.read_at ? ' of ' + esc(String(d.sales.read_at).slice(0, 16).replace('T', ' ')) : ''}${d.sales.window ? ' · window ' + esc(d.sales.window) : ''} · <span class="aff-src" title="${esc([d.sales.source, d.sales.note].filter(Boolean).join(' · '))}">source and method on hover</span>. Credited by order tag, not incremental.`;
  else sales = `No sales read from Finn yet. The gray figures are Pete's seed read of 2026-09-21: hand-summed and unconfirmed. Credited by order tag, not incremental.`;
  const odd = [];
  if (d.sales.unmatched && d.sales.unmatched.length) odd.push(`<details class="aff-odd"><summary>${d.sales.unmatched.length} name${d.sales.unmatched.length === 1 ? '' : 's'} in the sales read match nobody here</summary>${d.sales.unmatched.map((u) => esc(u.name)).join(' · ')}</details>`);
  if (d.sales.ambiguous && d.sales.ambiguous.length) odd.push(`<details class="aff-odd"><summary>${d.sales.ambiguous.length} sales row${d.sales.ambiguous.length === 1 ? '' : 's'} could match more than one person, so they are not shown</summary>${d.sales.ambiguous.map(esc).join(' · ')}</details>`);

  head.innerHTML = `
    <div class="aff-flags">${AFF_FLAGS.map(([k, label, ck]) => `<button class="flag ${AFF.flags.has(k) ? 'is-on' : ''} ${k === 'sold30' ? 'is-good' : ''}" data-flag="${k}">${ck ? `<b>${c[ck]}</b>` : ''}${esc(label)}</button>`).join('')}
      <span class="mono stamp">${c.total} people${c.archived ? ` · ${c.archived} archived` : ''}${c.suggestions ? ` · ${c.suggestions} status suggestions to review` : ''}</span></div>
    <div class="aff-tools">
      <input type="search" id="aff-q" placeholder="Search a name, handle, email, city or note" autocomplete="off" value="${esc(AFF.q)}">
      <select id="aff-status"><option value="">Any status</option>${d.statuses.map((s) => `<option ${AFF.status === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}<option value="(none)" ${AFF.status === '(none)' ? 'selected' : ''}>no status yet</option></select>
      <select id="aff-type"><option value="">Any type</option>${d.types.map((s) => `<option ${AFF.type === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select>
      <label class="aff-check"><input type="checkbox" id="aff-arch" ${AFF.showArchived ? 'checked' : ''}> show archived</label>
      <button class="btn is-primary" id="aff-add">Add affiliate</button>
    </div>
    <div class="aff-sales">${sales}${odd.join('')}</div>`;
  head.querySelectorAll('[data-flag]').forEach((b) => b.addEventListener('click', () => { const k = b.dataset.flag; if (AFF.flags.has(k)) AFF.flags.delete(k); else AFF.flags.add(k); renderAffiliates(); }));
  const q = $('aff-q');
  q.addEventListener('input', () => { AFF.q = q.value; renderAffTable(); });
  $('aff-status').addEventListener('change', (e) => { AFF.status = e.target.value; renderAffTable(); });
  $('aff-type').addEventListener('change', (e) => { AFF.type = e.target.value; renderAffTable(); });
  $('aff-arch').addEventListener('change', (e) => { AFF.showArchived = e.target.checked; renderAffTable(); });
  $('aff-add').addEventListener('click', () => openAffDrawer(null));
  if (typing) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
  renderAffTable();
}

function renderAffTable() {
  const body = $('aff-body'); const list = affVisible();
  const cols = [['name', 'Name'], ['status', 'Status'], ['type', 'Type'], ['up', 'UpPromote'], ['orders', 'Orders'], ['net', 'Net sales'], ['last', 'Last sale'], ['contact', 'Last contact']];
  const th = cols.map(([k, l]) => `<th data-sort="${k}" class="${['orders', 'net'].includes(k) ? 'num' : ''} ${AFF.sort.key === k ? 'is-sorted' : ''}">${l}${AFF.sort.key === k ? (AFF.sort.dir > 0 ? ' ↑' : ' ↓') : ''}</th>`).join('') + '<th></th>';
  const today = AFF.data.today;
  const rows = list.map((r) => {
    const s = r._sales, seed = s && s.from === 'seed';
    const handle = r.handle_instagram || r.handle_tiktok || r.handle_facebook || r.handle_youtube || '';
    const status = r.status ? `<span class="pill is-${esc(r.status)}">${esc(r.status)}</span>` : r.status_suggested ? `<span class="pill is-suggest" title="A suggestion from the seed, not a fact. Open the row to accept it or set your own.">${esc(r.status_suggested)}?</span>` : '<span class="dim">—</span>';
    const last = s ? (s.last_sale ? affShortDate(s.last_sale) : s.orders_30d ? `${s.orders_30d} in 30d` : '—') : '—';
    const contactAge = r.last_contact ? Math.round((new Date(today) - new Date(r.last_contact)) / 86400000) : null;
    return `<tr data-id="${esc(r.id)}" class="${r.archived ? 'is-archived' : ''} ${AFF.openId === r.id ? 'is-on' : ''}">
      <td class="aff-name"><strong>${esc(r.name)}</strong>${r._flags.sold30 ? '<span class="dotg" title="Sold in the last 30 days"></span>' : ''}${r._flags.unknownUp && r._flags.noContactInfo ? '<span class="who" title="Earning on UpPromote with no contact info on file">who is this?</span>' : ''}<br><span class="dim">${esc(handle)}</span></td>
      <td>${status}</td><td class="dim">${esc(r.type || '—')}</td><td class="dim">${r.uppromote === true ? 'yes' : r.uppromote === false ? 'no' : '—'}</td>
      <td class="num ${seed ? 'is-seed' : ''}" title="${esc(affSalesTitle(s))}">${s && s.orders != null ? esc(s.orders) : '—'}</td>
      <td class="num ${seed ? 'is-seed' : ''}" title="${esc(affSalesTitle(s))}">${s ? affMoney(s.net_sales) : '—'}</td>
      <td class="${seed ? 'is-seed' : ''}" title="${esc(s && s.from === 'seed' && s.window_30d ? 'Seed read, window ' + s.window_30d : affSalesTitle(s))}">${last}</td>
      <td class="${contactAge != null && contactAge >= 30 ? 'warn' : ''}">${r.last_contact ? affShortDate(r.last_contact) : '<span class="dim">never logged</span>'}</td>
      <td class="aff-act"><button class="wait-done" data-contact="${esc(r.id)}" title="Set last contact to today">Log contact today</button></td></tr>`;
  }).join('');
  body.innerHTML = `<div class="mono stamp aff-count">${list.length} shown</div><table class="aff-table"><thead><tr>${th}</tr></thead><tbody>${rows || `<tr><td colspan="9" class="empty">Nobody matches that.</td></tr>`}</tbody></table>`;
  body.querySelectorAll('th[data-sort]').forEach((h) => h.addEventListener('click', () => {
    const k = h.dataset.sort; if (AFF.sort.key === k) AFF.sort.dir *= -1; else AFF.sort = { key: k, dir: ['orders', 'net', 'last', 'contact', 'up'].includes(k) ? -1 : 1 };
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
  const rec = id ? d.records.find((r) => r.id === id) : { name: '', type: 'creator', other_links: [], _flags: {}, _sales: null };
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
