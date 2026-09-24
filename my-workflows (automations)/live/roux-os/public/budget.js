// ROUX OS — Marketing Budget and Paid Media tabs. One file on disk (hpc-marketing-budget.json), two
// pages: what HPC pays month to month (tools, agencies, contractors), and the ad platforms on their own.
// Every cost shows its source; a cost nobody has read shows "not on file" and is never filled in.
// Subscriptions are editable here. Paid media is read-only here: Finn writes it, the board sets the caps.
'use strict';
let BUDGET = null;
async function loadBudget() {
  try { const r = await fetch('/api/budget', { cache: 'no-store' }); BUDGET = await r.json(); if (!r.ok) throw new Error(BUDGET.error || r.status); }
  catch (e) { BUDGET = { error: e.message }; }
  renderBudget(); renderPaidMedia();
}
const money = (n, cents) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
const CAD_WORD = { month: '/mo', year: '/yr', 'one-time': ' one-time', 'per use': ' per use' };

function renderBudget() {
  const box = $('budget-body'); const v = BUDGET;
  if (!box) return;
  if (!v) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="board-sec bad">Cannot read the budget: ${esc(v.error)}</div>`; return; }
  const live = v.subscriptions.filter((s) => s.status !== 'ended'), ended = v.subscriptions.filter((s) => s.status === 'ended');
  const monthly = live.filter((s) => s.cadence === 'month' || s.cadence === 'year'), other = live.filter((s) => s.cadence !== 'month' && s.cadence !== 'year');
  const T = v.totals;
  const row = (s) => `<tr class="bud-row ${s.status === 'ended' ? 'is-ended' : ''}" data-id="${esc(s.id)}">
      <td><strong>${esc(s.name)}</strong>${s.status === 'free' ? ' <span class="pill is-approved">free</span>' : s.status === 'trial' ? ' <span class="pill is-queued">trial</span>' : ''}<div class="dim bud-what">${esc(s.what || '')}</div></td>
      <td class="num bud-cost">${s.cost === null || s.cost === undefined ? '<span class="warn">not on file</span>' : s.cost === 0 ? 'Free' : `${money(s.cost, s.cost % 1 !== 0)}<span class="dim">${esc(CAD_WORD[s.cadence] || '')}</span>`}${s.cadence === 'year' && s.monthly !== null ? `<div class="dim bud-sub">${money(s.monthly, true)}/mo</div>` : ''}</td>
      <td class="dim">${esc(s.owner || '')}</td>
      <td><div class="dr-src">${esc(s.source || '')}</div>${s.note ? `<div class="bud-note">${esc(s.note)}</div>` : ''}</td>
      <td class="aff-act"><button class="wait-done" data-edit="${esc(s.id)}">Edit</button></td></tr>`;
  const table = (list) => `<div class="aff-scroll"><table class="aff-table bud-table"><thead><tr><th>What</th><th class="num">Cost</th><th>Who</th><th>Source</th><th></th></tr></thead><tbody>${list.map(row).join('')}</tbody></table></div>`;
  box.innerHTML = `<div class="money-row bud-tiles">
      <div class="money-tile"><span class="eyebrow">Known monthly</span><span class="money-n">${money(T.monthlyKnown)}</span><span class="money-sub">${T.knownCount} line${T.knownCount === 1 ? '' : 's'} with a cost on file (yearly ÷ 12)</span></div>
      <div class="money-tile ${T.unknownCount ? 'is-unread' : ''}"><span class="eyebrow">Not on file</span><span class="money-n">${T.unknownCount}</span><span class="money-sub">${T.unknownCount ? '<b>the total above is short by these</b>' : 'every cost is read'}</span></div>
      <div class="money-tile"><span class="eyebrow">Lines</span><span class="money-n">${T.liveCount}</span><span class="money-sub">active or free · ad spend is on Paid Media</span></div>
    </div>
    <div class="board-sec"><div class="bud-h"><span class="eyebrow">Month to month</span><button class="btn btn-sm" id="bud-add">Add a line</button></div>
      <div id="bud-form-slot"></div>${table(monthly)}</div>
    ${other.length ? `<div class="board-sec"><span class="eyebrow">One-time and per project</span>${table(other)}</div>` : ''}
    ${ended.length ? `<details class="board-sec"><summary class="eyebrow">Ended · ${ended.length}</summary>${table(ended)}</details>` : ''}
    <div class="mono stamp bud-foot">From my-business (context)/hpc-marketing-budget.json${v.updatedAt ? ` · updated ${esc(new Date(v.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }))}` : ''} · Meta and Google spend live on Paid Media</div>`;
  $('bud-add').addEventListener('click', () => budgetForm(null));
  box.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => budgetForm(v.subscriptions.find((s) => s.id === b.dataset.edit))));
}

function budgetForm(s) {
  const slot = $('bud-form-slot'); const e = s || { cadence: 'month', status: 'active' };
  const opt = (list, cur) => list.map((x) => `<option ${x === cur ? 'selected' : ''}>${x}</option>`).join('');
  slot.innerHTML = `<form class="bud-form" id="bud-form">
    <label class="dr-field"><span>Name</span><input name="name" maxlength="80" value="${esc(e.name || '')}" required></label>
    <label class="dr-field"><span>Cost ($, blank if unknown)</span><input name="cost" inputmode="decimal" value="${e.cost === null || e.cost === undefined ? '' : esc(e.cost)}"></label>
    <label class="dr-field"><span>How often</span><select name="cadence">${opt(['month', 'year', 'one-time', 'per use'], e.cadence)}</select></label>
    <label class="dr-field"><span>Status</span><select name="status">${opt(['active', 'free', 'trial', 'ended'], e.status)}</select></label>
    <label class="dr-field is-wide"><span>What it is</span><input name="what" maxlength="240" value="${esc(e.what || '')}"></label>
    <label class="dr-field"><span>Who</span><input name="owner" maxlength="60" value="${esc(e.owner || '')}"></label>
    <label class="dr-field"><span>Source of the cost</span><input name="source" maxlength="240" value="${esc(e.source || '')}" placeholder="e.g. the invoice, Sept 2026"></label>
    <label class="dr-field is-wide"><span>Note</span><input name="note" maxlength="300" value="${esc(e.note || '')}"></label>
    <div class="bud-form-act"><button class="btn is-primary" type="submit">${s ? 'Save' : 'Add'}</button><button class="btn" type="button" id="bud-cancel">Cancel</button></div></form>`;
  const f = $('bud-form'); f.querySelector('input').focus();
  $('bud-cancel').addEventListener('click', () => { slot.innerHTML = ''; });
  f.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const body = Object.fromEntries(new FormData(f).entries()); if (s) body.id = s.id;
    const j = await postJson('/api/budget/save', body);
    if (j) { toast(s ? 'Saved.' : 'Added to the budget.'); loadBudget(); }
  });
  slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderPaidMedia() {
  const box = $('paidmedia-body'); const v = BUDGET;
  if (!box) return;
  if (!v) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="board-sec bad">Cannot read paid media: ${esc(v.error)}</div>`; return; }
  const M = v.metaLive; const ceiling = M.ceiling ? M.ceiling.value : null;
  const pct = ceiling ? Math.min(100, Math.round((M.perDay / ceiling) * 100)) : 0;
  const chan = (c) => {
    const lr = c.lastRead || null;
    return `<div class="board-sec pm-chan"><div class="bud-h"><span class="eyebrow">${esc(c.name)}</span><span class="mono stamp">run by ${esc(c.runBy || '—')}</span></div>
      ${c.id === 'meta' ? `<div class="pm-live"><div class="w-big">$${esc(M.perDay)}<span class="pm-unit"> /day live caps</span></div>
        <div class="bar"><i class="${ceiling && M.perDay > ceiling ? 'is-over' : ''}" style="width:${pct}%"></i></div>
        <div class="cap-line mono"><span>${esc(M.capsSource)}</span><span class="dim">ceiling $${esc(ceiling)}/day</span></div>
        <div class="dr-src">A cap is the most Meta may spend, not what it spent.</div></div>` : ''}
      ${c.ceiling && c.id !== 'meta' ? `<div class="dr-fact">Ceiling: ${esc(c.ceiling)}</div>` : ''}
      <div class="pm-read">${lr ? `<span class="mono stamp">last spend read</span><div class="pm-amt">${money(lr.amount, true)}</div><div class="dim">${esc(lr.period)}</div><div class="dr-src">${esc(lr.source)}</div>` : '<span class="warn">No spend read on file.</span>'}</div>
      ${c.note ? `<div class="bud-note">${esc(c.note)}</div>` : ''}</div>`;
  };
  box.innerHTML = `<div class="board-sec pm-intro"><span class="mono stamp">Ad spend, kept apart from the Marketing Budget · read-only here · Finn updates the spend reads; the Meta caps come from the board · ask Finn in a session for a fresh read</span></div>
    <div class="pm-grid">${(v.paidMedia.channels || []).map(chan).join('') || '<div class="board-sec empty">No ad platforms on file.</div>'}</div>`;
}
