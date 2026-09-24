// ROUX OS — ROUX's Proposals. Ideas for making the system smarter or more useful, sorted into free
// and paid. Each card says what it is, what it would do, and what it costs (with the price's source).
// Evan answers Yes / Later / No with a line; the next session acts on it. A yes on a paid idea is
// never a purchase: buying stays Evan's click.
'use strict';
let PROPOSALS = null;
async function loadProposals() {
  try { const r = await fetch('/api/proposals', { cache: 'no-store' }); PROPOSALS = await r.json(); if (!r.ok) throw new Error(PROPOSALS.error || r.status); }
  catch (e) { PROPOSALS = { error: e.message, items: [] }; }
  renderProposals();
}
function renderProposals() {
  const box = $('proposals-body'); const v = PROPOSALS;
  if (!v) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="board-sec bad">Cannot read proposals: ${esc(v.error)}</div>`; return; }
  const word = { yes: 'Yes, build it', later: 'Later', no: 'No' };
  const card = (i) => {
    const st = i.status || 'new'; const open = st === 'new';
    const unconfirmed = /not confirmed/i.test(`${i.cost} ${i.costSource}`);
    return `<div class="board-sec prop is-${esc(st)} is-${esc(i.category)}" data-id="${esc(i.id)}">
      <div class="approval-head"><span class="pill ${i.category === 'free' ? 'is-approved' : 'is-kind'}">${esc(i.category)}</span>${i.area ? `<span class="mono stamp">${esc(i.area)}</span>` : ''}${open ? '' : `<span class="pill is-${st === 'yes' ? 'approved' : st === 'no' ? 'rejected' : 'queued'}">${esc(word[st] || st)}</span>`}</div>
      <div class="prop-title">${esc(i.title)}</div>
      <div class="prop-line"><span class="mono stamp">what it is</span>${esc(i.what)}</div>
      <div class="prop-line"><span class="mono stamp">what it would do</span>${esc(i.does)}</div>
      <div class="prop-cost ${unconfirmed ? 'is-unconfirmed' : ''}"><span class="mono stamp">cost</span><b>${esc(i.cost || 'not on file')}</b><div class="dr-src">${esc(i.costSource || '')}</div></div>
      ${open ? `<div class="approval-act"><input type="text" maxlength="400" placeholder="A line (needed for a no)" data-note><button class="btn is-primary" data-decide="yes">Yes</button><button class="btn" data-decide="later">Later</button><button class="btn" data-decide="no">No</button></div>`
        : `<div class="approval-note">${i.note ? `<span class="mono stamp">your note</span> ${esc(i.note)}` : '<span class="dim">no note</span>'} <span class="mono stamp">· ${esc(i.decided || '')}</span> <button class="ghost" data-decide="reopen">reopen</button></div>`}
    </div>`;
  };
  const group = (cat, title, sub) => {
    const list = v.items.filter((i) => i.category === cat).sort((a, b) => ((a.status || 'new') === 'new' ? 0 : 1) - ((b.status || 'new') === 'new' ? 0 : 1));
    return `<div class="prop-col"><div class="board-sec prop-h"><span class="eyebrow">${title} · ${list.length}</span><span class="mono stamp">${sub}</span></div>${list.map(card).join('') || '<div class="board-sec empty">None right now.</div>'}</div>`;
  };
  const waiting = v.items.filter((i) => (i.status || 'new') === 'new').length;
  box.innerHTML = `<div class="board-sec is-wide"><span class="eyebrow">ROUX's Proposals</span><span class="mono stamp">${waiting} waiting on you · ideas to make ROUX smarter and more useful · Yes sends it to the next session · a yes on a paid idea is not a purchase, you buy it</span></div>
    <div class="prop-cols">${group('free', 'Free', 'runs on what you already have')}${group('paid', 'Paid', 'every price has its source; "not confirmed" means check before paying')}</div>`;
  box.querySelectorAll('[data-decide]').forEach((b) => b.addEventListener('click', async () => {
    const c = b.closest('.prop'); const noteEl = c.querySelector('[data-note]');
    const decision = b.dataset.decide; const note = noteEl ? noteEl.value.trim() : '';
    if (decision === 'no' && !note) { toast('Say why in a line, so it is not proposed again the same way.', true); noteEl.focus(); return; }
    b.disabled = true;
    const j = await postJson('/api/proposals/decide', { id: c.dataset.id, decision, note: note || null });
    if (j) toast(j.status === 'yes' ? 'Yes. The next session picks it up.' : j.status === 'new' ? 'Reopened.' : j.status === 'later' ? 'Parked for later.' : 'No. Noted with your reason.');
    await loadProposals(); loadState().catch(() => {});
  }));
}
