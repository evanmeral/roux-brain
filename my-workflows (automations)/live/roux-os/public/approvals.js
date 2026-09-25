// ROUX OS — Approvals tab. Agents queue items in approvals.json; Evan approves or rejects with a note.
// ⛔ Approving a "live-write" item never authorizes a Shopify, Meta or Google write. The server marks
// it "queued" and the session still has to ask Evan. The page says so on the card.
'use strict';
let APPROVALS = null;

async function loadApprovals() {
  try { const r = await fetch('/api/approvals', { cache: 'no-store' }); APPROVALS = await r.json(); if (!r.ok) throw new Error(APPROVALS.error || r.status); }
  catch (e) { APPROVALS = { error: e.message, items: [] }; }
  renderApprovals();
}
function approvalSource(src) {
  const s = String(src || '');
  if (/^https?:\/\//i.test(s)) { try { const u = new URL(s); if (u.protocol === 'https:' || u.protocol === 'http:') return `<a href="${esc(u.href)}" target="_blank" rel="noopener noreferrer">${esc(s)}</a>`; } catch (_) {} }
  if (/\.(md|html|json|png|jpg|pdf)$/i.test(s) && !/^[a-z]+:/i.test(s) && !s.includes('..')) return `<a href="${esc(obsidian(s))}">${esc(s)}</a>`;
  return esc(s);
}
function renderApprovals() {
  const box = $('approvals-body'); const v = APPROVALS;
  if (!v) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="board-sec is-wide bad">${esc(v.error)}</div>`; return; }
  const pending = v.items.filter((i) => i.status === 'pending'), resolved = v.items.filter((i) => i.status !== 'pending');
  const statusWord = { approved: 'Approved', rejected: 'Rejected', queued: 'Queued, confirm in session' };
  const card = (i) => {
    const isPending = i.status === 'pending';
    return `<div class="board-sec approval is-${esc(i.status)} ${i.isLiveWrite ? 'is-live' : ''}" data-id="${esc(i.id)}">
      <div class="approval-head"><span class="pill is-kind">${esc(i.kind)}</span><span class="mono stamp">from ${esc(i.from)}</span>${isPending ? '' : `<span class="pill is-${esc(i.status)}">${esc(statusWord[i.status] || i.status)}</span>`}</div>
      <div class="approval-rec">${esc(i.recommendation)}</div>
      <div class="approval-change"><span class="mono stamp">what changes</span><div>${esc(i.change).replace(/\n/g, '<br>')}</div></div>
      <details class="approval-more"><summary>Why · evidence</summary><div>${approvalSource(i.source)}</div><div class="mono stamp">${esc(i.created)} · ${esc(i.id)}</div></details>
      ${i.isLiveWrite ? `<div class="approval-warn">This would change a live system. Approving here only queues it. ROUX still asks for your yes in the session before anything is written.</div>` : ''}
      ${isPending ? `<div class="approval-act"><input type="text" maxlength="600" placeholder="Your note. Needed for a reject; the why is what stops a repeat" data-note><button class="btn is-primary" data-decide="approve">${i.isLiveWrite ? 'Queue it' : 'Approve'}</button><button class="btn" data-decide="reject">Reject</button></div>`
        : `<div class="approval-note">${i.note ? `<span class="mono stamp">your note</span> ${esc(i.note)}` : '<span class="dim">no note</span>'} <span class="mono stamp">· ${esc(String(i.resolved_at || '').slice(0, 10))}</span> <button class="ghost" data-decide="reopen">reopen</button></div>`}
    </div>`;
  };
  box.innerHTML = `<div class="board-sec is-wide"><span class="eyebrow">Approvals</span><span class="mono stamp">${pending.length} waiting on you · agents add them, you decide here, the next session reads the result · moved to the archive at wrap</span></div>`
    + (pending.length ? pending.map(card).join('') : '<div class="board-sec is-wide empty">Nothing is waiting for a yes or a no. When an agent has a recommendation, a creative or a rule change for you, it lands here.</div>')
    + (resolved.length ? `<div class="board-sec is-wide"><span class="eyebrow">Decided, not yet wrapped</span></div>` + resolved.map(card).join('') : '');
  box.querySelectorAll('[data-decide]').forEach((b) => b.addEventListener('click', async () => {
    const cardEl = b.closest('.approval'); const noteEl = cardEl.querySelector('[data-note]');
    const decision = b.dataset.decide; const note = noteEl ? noteEl.value.trim() : '';
    if (decision === 'reject' && !note) { toast('Say why in a line, so it is not proposed again the same way.', true); noteEl.focus(); return; }
    b.disabled = true;
    const j = await postJson('/api/approvals/resolve', { id: cardEl.dataset.id, decision, note: note || null });
    if (j) toast(j.status === 'queued' ? 'Queued. The session will still ask for your yes before it writes anything.' : j.status === 'pending' ? 'Reopened.' : `${j.status === 'approved' ? 'Approved' : 'Rejected'}. The next session reads it first.`);
    await loadApprovals(); loadState().catch(() => {});
  }));
}
