// ROUX OS — Planner tab. Every Facebook and Instagram piece from every content week, laid out on a
// calendar the way Business Suite's Planner does it: a week view with the graphics, or a month view.
// Read-only. Click a piece to open it in Posts, where approving and notes happen.
'use strict';
const PLANNER = { data: null, view: 'week', anchor: null, platform: 'all' };
try { PLANNER.view = localStorage.getItem('roux.plannerView') || 'week'; PLANNER.platform = localStorage.getItem('roux.plannerPlat') || 'all'; } catch (_) {}

async function loadPlanner() {
  try { const r = await fetch('/api/planner', { cache: 'no-store' }); const j = await r.json(); if (!r.ok) throw new Error(j.error || r.status); PLANNER.data = j; }
  catch (e) { PLANNER.data = { error: e.message, pieces: [] }; }
  if (!PLANNER.anchor) PLANNER.anchor = PLANNER.data.today || (STATE && STATE.today);
  renderPlanner();
}
const pIso = (d) => d.toISOString().slice(0, 10);
const pDate = (iso) => new Date(iso + 'T12:00:00Z');
function pAdd(iso, n) { const d = pDate(iso); d.setUTCDate(d.getUTCDate() + n); return pIso(d); }
function pMonday(iso) { const d = pDate(iso); const dow = (d.getUTCDay() + 6) % 7; d.setUTCDate(d.getUTCDate() - dow); return pIso(d); }
const P_STATUS = { verified: ['is-ok', 'Scheduled'], scheduled: ['is-ok', 'Scheduled'], queued: ['is-ok', 'Queued'], approved: ['is-appr', 'Approved'], draft: ['is-draft', 'Draft'], dropped: ['is-drop', 'Dropped'] };
function p12(t) { if (!t) return ''; const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`; }

function renderPlanner() {
  const box = $('planner-body'); const v = PLANNER.data;
  if (!v) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="board-sec bad">Cannot read the post queue: ${esc(v.error)}</div>`; return; }
  const today = v.today; const a = PLANNER.anchor;
  const pieces = v.pieces.filter((p) => p.date && (PLANNER.platform === 'all' || p.placements.includes(PLANNER.platform)));
  const byDay = {}; for (const p of pieces) (byDay[p.date] = byDay[p.date] || []).push(p);
  for (const k in byDay) byDay[k].sort((x, y) => (x.time || '').localeCompare(y.time || ''));

  let start, days, title;
  if (PLANNER.view === 'week') {
    start = pMonday(a); days = Array.from({ length: 7 }, (_, i) => pAdd(start, i));
    title = `${pDate(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })} – ${pDate(days[6]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}`;
  } else {
    const first = a.slice(0, 8) + '01'; start = pMonday(first);
    const m = pDate(first).getUTCMonth(); days = [];
    for (let d = start; days.length < 42; d = pAdd(d, 1)) { days.push(d); if (days.length % 7 === 0 && pDate(pAdd(d, 1)).getUTCMonth() !== m && days.length >= 28) break; }
    title = pDate(first).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  }
  const inRange = pieces.filter((p) => p.date >= days[0] && p.date <= days[days.length - 1] && p.status !== 'dropped');
  const month = PLANNER.view === 'month' ? pDate(a).getUTCMonth() : null;

  const seg = (key, opts, cur) => `<div class="seg" data-seg="${key}">${opts.map(([k, l]) => `<button data-v="${k}" class="${cur === k ? 'is-on' : ''}">${l}</button>`).join('')}</div>`;
  let html = `<div class="board-sec pl-top">
    <div class="pl-nav"><button class="btn btn-sm" data-step="-1" aria-label="Back">‹</button><span class="pl-title">${esc(title)}</span><button class="btn btn-sm" data-step="1" aria-label="Forward">›</button><button class="btn btn-sm" data-step="0">Today</button></div>
    <div class="pl-tools">${seg('platform', [['all', 'All'], ['facebook', 'Facebook'], ['instagram', 'Instagram']], PLANNER.platform)}${seg('view', [['week', 'Week'], ['month', 'Month']], PLANNER.view)}</div>
    <div class="mono stamp pl-sum">${inRange.length} post${inRange.length === 1 ? '' : 's'} in view · from the post queue, read-only · click a post to open it in Posts</div></div>`;

  const card = (p, big) => {
    const st = P_STATUS[p.status] || ['', p.status];
    const plats = p.placements.map((x) => `<span class="pl-plat is-${esc(x)}" title="${esc(x)}">${x === 'facebook' ? 'FB' : x === 'instagram' ? 'IG' : esc(x.slice(0, 2).toUpperCase())}</span>`).join('');
    const thumb = p.thumb ? (p.thumb.kind === 'video' ? `<video src="${esc(p.thumb.url)}#t=0.5" muted preload="metadata"></video>` : `<img src="${esc(p.thumb.url)}" alt="" loading="lazy">`) : '<div class="pl-nothumb">no media</div>';
    return `<button class="pl-card ${st[0]} ${big ? 'is-big' : ''} is-${esc(p.type)}" data-week="${esc(p.week)}" data-piece="${esc(p.id)}" title="${esc((p.segment ? p.segment + ' · ' : '') + p.type + ' · ' + st[1])}">
      <div class="pl-thumb">${thumb}${p.frames > 1 ? `<span class="pl-frames">${p.frames}</span>` : ''}</div>
      <div class="pl-meta"><div class="pl-time">${esc(p12(p.time))}${plats}</div><div class="pl-name">${esc(p.segment || p.id)}</div><div class="pl-type">${esc(p.type)} · <span class="pl-st">${esc(st[1])}</span></div>${big && p.caption ? `<div class="pl-cap">${esc(p.caption)}</div>` : ''}</div></button>`;
  };

  if (PLANNER.view === 'week') {
    html += `<div class="pl-week">${days.map((d) => `<div class="pl-col ${d === today ? 'is-today' : ''} ${d < today ? 'is-past' : ''}"><div class="pl-day"><span>${pDate(d).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })}</span><b>${pDate(d).getUTCDate()}</b></div>${(byDay[d] || []).map((p) => card(p, true)).join('') || '<div class="pl-empty">Nothing planned</div>'}</div>`).join('')}</div>`;
  } else {
    html += `<div class="pl-month"><div class="pl-dow">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => `<span>${d}</span>`).join('')}</div><div class="pl-grid">${days.map((d) => `<div class="pl-cell ${d === today ? 'is-today' : ''} ${pDate(d).getUTCMonth() !== month ? 'is-out' : ''} ${d < today ? 'is-past' : ''}"><div class="pl-n">${pDate(d).getUTCDate()}</div>${(byDay[d] || []).map((p) => card(p, false)).join('')}</div>`).join('')}</div></div>`;
  }
  if (!v.pieces.length) html += '<div class="board-sec empty">No week has a schedule.json yet. A content-week session builds one from the plan.</div>';
  box.innerHTML = html;

  box.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
    const n = Number(b.dataset.step);
    if (n === 0) PLANNER.anchor = today;
    else if (PLANNER.view === 'week') PLANNER.anchor = pAdd(PLANNER.anchor, 7 * n);
    else { const d = pDate(PLANNER.anchor.slice(0, 8) + '01'); d.setUTCMonth(d.getUTCMonth() + n); PLANNER.anchor = pIso(d); }
    renderPlanner();
  }));
  box.querySelectorAll('[data-seg]').forEach((g) => g.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
    PLANNER[g.dataset.seg] = b.dataset.v;
    try { localStorage.setItem(g.dataset.seg === 'view' ? 'roux.plannerView' : 'roux.plannerPlat', b.dataset.v); } catch (_) {}
    renderPlanner();
  })));
  box.querySelectorAll('.pl-card').forEach((c) => c.addEventListener('click', () => {
    POSTS.weekId = c.dataset.week; POSTS.data = null; POSTS.focus = c.dataset.piece;
    showTab('posts');
  }));
}
