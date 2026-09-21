// ROUX OS — Posts tab. The week's organic posts as the post scheduler holds them: media, both
// captions in full, date and time, status, and the preflight checks.
// Two actions per piece: Approve (marks schedule.json only) and Send back with a note (one line in
// capture.md for Sage). There is no button here that schedules or publishes anything, on purpose.
'use strict';
const POSTS = { weeks: null, weekId: null, data: null };
const POST_LEVEL = { fail: ['is-fail', 'fail'], warn: ['is-warn', 'check'], waived: ['is-waived', 'waived'], info: ['is-info', 'info'], pass: ['is-pass', 'ok'] };

async function loadPosts(keepWeek) {
  try {
    const r = await fetch('/api/posts', { cache: 'no-store' }); const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.status);
    POSTS.weeks = j;
    if (!keepWeek || !POSTS.weekId || !j.weeks.some((w) => w.id === POSTS.weekId)) POSTS.weekId = j.defaultWeek;
  } catch (e) { POSTS.weeks = { error: e.message, weeks: [] }; POSTS.data = null; renderPosts(); return; }
  await loadPostWeek();
}
async function loadPostWeek() {
  if (!POSTS.weekId) { POSTS.data = null; renderPosts(); return; }
  try {
    const r = await fetch('/api/posts/week?id=' + encodeURIComponent(POSTS.weekId), { cache: 'no-store' }); const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.status);
    POSTS.data = j;
  } catch (e) { POSTS.data = { error: e.message }; }
  renderPosts();
}
const postDay = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' });

function renderPosts() {
  const box = $('posts-body'); const W = POSTS.weeks, d = POSTS.data;
  if (!W) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (W.error) { box.innerHTML = `<div class="board-sec bad">${esc(W.error)}</div>`; return; }
  const withManifest = W.weeks.filter((w) => w.hasManifest);
  const picker = `<select id="posts-week">${withManifest.map((w) => `<option value="${esc(w.id)}" ${w.id === POSTS.weekId ? 'selected' : ''}>Week of ${esc(postDay(w.from).replace(/^\w+, /, ''))} · ${w.approved} of ${w.pieces} approved${w.counts.verified ? ` · ${w.counts.verified} verified` : ''}</option>`).join('')}</select>`;
  let html = `<div class="board-sec posts-top"><div><span class="eyebrow">Posts</span><span class="mono stamp">approve here, schedule in a session · approving marks the queue only · nothing on this page schedules or publishes</span></div>${withManifest.length ? picker : ''}</div>`;
  if (!withManifest.length) { box.innerHTML = html + '<div class="board-sec empty">No week has a schedule.json yet. A content-week session builds one from the plan.</div>'; return; }
  if (!d) { box.innerHTML = html + '<div class="empty">Loading…</div>'; wirePosts(); return; }
  if (d.error) { box.innerHTML = html + `<div class="board-sec bad">${esc(d.error)}</div>`; wirePosts(); return; }
  const s = d.preflight.summary;
  html += `<div class="board-sec posts-sum"><span class="mono stamp">preflight${d.preflight.ranAt ? ' ' + esc(new Date(d.preflight.ranAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })) : ''}</span>${d.preflight.error ? `<span class="bad">${esc(d.preflight.error)}</span>` : s ? `<span class="pf is-pass">${s.pass} pass</span><span class="pf is-warn">${s.warn} to check</span><span class="pf is-fail">${s.fail} failing</span>${s.dropped ? `<span class="pf">${s.dropped} dropped</span>` : ''}` : ''}${(d.preflight.referenceErrors || []).map((e) => `<span class="bad">${esc(e)}</span>`).join('')}</div>`;
  const byId = Object.fromEntries(d.pieces.map((p) => [p.id, p]));
  html += d.days.map((day) => {
    const pieces = day.pieces.map((id) => byId[id]).filter(Boolean);
    return `<div class="post-day ${pieces.length ? '' : 'is-empty'}"><div class="post-day-h"><span class="eyebrow">${esc(postDay(day.date))}</span>${pieces.length ? '' : '<span class="mono stamp">nothing planned</span>'}</div>${pieces.map(postCard).join('')}</div>`;
  }).join('');
  const undated = d.pieces.filter((p) => !d.days.some((day) => day.pieces.includes(p.id)));
  if (undated.length) html += `<div class="post-day"><div class="post-day-h"><span class="eyebrow">No date inside this week</span></div>${undated.map(postCard).join('')}</div>`;
  box.innerHTML = html;
  wirePosts();
}

function postCard(p) {
  const pf = p.preflight; const badge = pf ? pf.badge : 'none';
  const media = p.media.map((m) => !m.exists
    ? `<div class="post-missing" title="${esc(m.file)}">missing file<br><span>${esc(m.file)}</span></div>`
    : m.kind === 'video' ? `<video src="${esc(m.url)}" controls muted preload="metadata" title="${esc(m.file)}"></video>`
      : `<a href="${esc(m.url)}" target="_blank" rel="noopener" title="${esc(m.file)}"><img src="${esc(m.url)}" alt="${esc(`Frame ${m.n} of ${p.media.length}`)}" loading="lazy">${p.media.length > 1 ? `<span class="post-n">${m.n}</span>` : ''}</a>`).join('');
  const checks = pf ? pf.checks : [];
  const loud = checks.filter((c) => c.level === 'fail' || c.level === 'warn' || c.level === 'waived');
  const quiet = checks.filter((c) => c.level === 'pass' || c.level === 'info');
  const checkRow = (c) => `<div class="pf-row ${POST_LEVEL[c.level] ? POST_LEVEL[c.level][0] : ''}" title="${esc(c.source || '')}"><span class="pf-l">${esc(POST_LEVEL[c.level] ? POST_LEVEL[c.level][1] : c.level)}</span><span>${esc(c.message)}</span></div>`;
  const cap = (label, text) => `<div class="post-cap"><span class="mono stamp">${label}${text ? ` · ${text.length} characters` : ''}</span>${text ? `<div class="post-cap-t">${esc(text)}</div>` : '<div class="dim">no caption for this placement</div>'}</div>`;
  const hasCaption = p.caption.facebook || p.caption.instagram;
  const canSendBack = !['scheduled', 'verified', 'dropped'].includes(p.status);
  return `<article class="post-card is-${esc(badge)}" data-piece="${esc(p.id)}">
    <div class="post-media ${p.media.length > 1 ? 'is-strip' : ''} is-${esc(p.type)}">${media || '<div class="post-missing">no media listed</div>'}</div>
    <div class="post-main">
      <div class="post-head"><strong>${esc(p.segment || p.id)}</strong><span class="pill">${esc(p.type)}${p.media.length > 1 ? ` · ${p.media.length} frames` : ''}</span><span class="pill">${esc(p.placements.join(' + '))}</span><span class="pill is-st-${esc(p.status)}">${esc(p.status)}</span><span class="pf is-${esc(badge)}">preflight ${esc(badge === 'warn' ? 'to check' : badge)}</span><span class="mono stamp">${esc(p.id)}</span></div>
      <div class="post-when">${esc(p.when || 'no time set')}${pf && pf.manualUpload ? ' · <span class="warn">over the browser upload limit: you upload this one by hand</span>' : ''}</div>
      ${p.conditional ? `<div class="post-cond">${esc(typeof p.conditional === 'string' ? p.conditional : JSON.stringify(p.conditional))}</div>` : ''}
      ${hasCaption ? `<div class="post-caps">${cap('Facebook', p.caption.facebook)}${cap('Instagram', p.caption.instagram)}</div>` : '<div class="dim post-nocap">A story: no caption.</div>'}
      ${p.firstComment ? `<div class="post-cap"><span class="mono stamp">First comment</span><div class="post-cap-t">${esc(p.firstComment)}</div></div>` : ''}
      ${p.notes.length ? `<div class="post-notes">${p.notes.map((n) => `<div>${esc(n)}</div>`).join('')}</div>` : ''}
      <div class="pf-list">${loud.map(checkRow).join('')}${quiet.length ? `<details><summary>${quiet.length} check${quiet.length === 1 ? '' : 's'} passed</summary>${quiet.map(checkRow).join('')}</details>` : ''}${pf ? '' : '<div class="bad">No preflight result for this piece.</div>'}</div>
      ${p.approval ? `<div class="post-approved">Approved by ${esc(p.approval.by)} ${esc(new Date(p.approval.at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }))} · “${esc(p.approval.words)}”</div>` : ''}
      ${p.evidence.length ? `<div class="dr-src">Read back: ${p.evidence.map((e) => `${esc(e.platform || '')} ${esc(e.readBack || '')} (${esc(e.source || '')})`).join(' · ')}</div>` : ''}
      ${p.status === 'draft' || canSendBack ? `<div class="post-act"><input type="text" maxlength="400" data-note placeholder="${p.canApprove ? 'A note (optional to approve, needed to send back)' : 'Your note for Sage'}">
        ${p.status === 'draft' ? `<button class="btn is-primary" data-approve ${p.canApprove ? '' : 'disabled'} title="${p.canApprove ? 'Marks this piece approved in the queue. It schedules nothing.' : 'Failing preflight. It cannot be approved until that is fixed.'}">Approve</button>` : ''}
        ${canSendBack ? '<button class="btn" data-sendback title="Leaves the piece as it is and puts your note in front of Sage next session">Send back with a note</button>' : ''}</div>
        ${p.status === 'draft' && !p.canApprove ? '<div class="post-blocked">Failing preflight, so it cannot be approved from here. Send it back with a note, or drop it in a session.</div>' : ''}` : ''}
    </div></article>`;
}

function wirePosts() {
  const sel = $('posts-week');
  if (sel) sel.addEventListener('change', () => { POSTS.weekId = sel.value; POSTS.data = null; renderPosts(); loadPostWeek(); });
  document.querySelectorAll('#posts-body .post-card').forEach((card) => {
    const piece = card.dataset.piece, noteEl = card.querySelector('[data-note]');
    const a = card.querySelector('[data-approve]'), b = card.querySelector('[data-sendback]');
    if (a) a.addEventListener('click', async () => {
      a.disabled = true;
      const j = await postJson('/api/posts/approve', { week: POSTS.weekId, piece, note: noteEl.value.trim() || null });
      if (j) toast('Approved. It is marked in the queue; a scheduling session does the rest.');
      await loadPosts(true); loadState().catch(() => {});
    });
    if (b) b.addEventListener('click', async () => {
      const note = noteEl.value.trim();
      if (!note) { toast('Write the note first. It is what Sage works from.', true); noteEl.focus(); return; }
      b.disabled = true;
      const j = await postJson('/api/posts/sendback', { week: POSTS.weekId, piece, note });
      b.disabled = false;
      if (j) { toast('Sent back. Sage sees your note next session. The piece stays unapproved.'); noteEl.value = ''; loadState().catch(() => {}); }
    });
  });
}
