// ROUX OS — page script. Fetches /api/state and /api/calendar, renders, and listens for file changes.
'use strict';
const $ = (id) => document.getElementById(id);
let STATE = null;
let WEEK = null;
// one-time carry-over of this browser's saved state from the pre-rename keys (atlas.* -> roux.*, 2026-09-21)
try { for (const k of ['done', 'tab']) { const old = localStorage.getItem('atlas.' + k); if (old !== null) { if (localStorage.getItem('roux.' + k) === null) localStorage.setItem('roux.' + k, old); localStorage.removeItem('atlas.' + k); } } } catch (_) {}
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- clock ----
function tzParts(d, tz) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).formatToParts(d);
  const g = (t) => (p.find((x) => x.type === t) || {}).value;
  const wd = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(d);
  const dowNum = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(wd);
  return { time: `${g('hour')}:${g('minute')}`, ampm: (g('dayPeriod') || '').toLowerCase(), date: `${g('weekday')} ${g('month')} ${g('day')}`, dowNum };
}
function tickClock() {
  const tz = (STATE && STATE.timezone) || 'America/Chicago';
  const p = tzParts(new Date(), tz);
  $('clock-time').innerHTML = `${p.time}<span style="font-size:.45em;font-weight:600;color:var(--muted);margin-left:4px">${p.ampm}</span>`;
  const rhythm = STATE && STATE.rhythm ? STATE.rhythm[String(p.dowNum)] : '';
  $('clock-date').innerHTML = `${esc(p.date)}${rhythm ? ` · <span class="rhythm">${esc(rhythm)}</span>` : ''}`;
}
setInterval(tickClock, 1000);

// ---- helpers ----
function daysUntil(iso, todayIso) {
  const a = Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
  const b = Date.UTC(+todayIso.slice(0, 4), +todayIso.slice(5, 7) - 1, +todayIso.slice(8, 10));
  return Math.round((a - b) / 86400000);
}
function shortWhat(s, n = 26) { s = s.replace(/\s*\(.*?\)\s*/g, ' ').replace(/[,:].*$/, '').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
function obsidian(vaultPath) { return `obsidian://open?vault=${encodeURIComponent(STATE.vaultName)}&file=${encodeURIComponent(vaultPath.replace(/\.md$/, ''))}`; }

// ---- render ----
function renderCountdowns() {
  const el = $('countdowns');
  const items = (STATE.keyDates || []).map((k) => ({ ...k, d: daysUntil(k.date, STATE.today) })).filter((k) => k.d >= 0).sort((a, b) => a.d - b.d).slice(0, 4);
  const health = Object.values(STATE.health || {}).filter((v) => v !== 'ok');
  const bad = health.filter((h) => /cannot|missing|fail/i.test(h) && !/no brief yet/i.test(h));
  el.innerHTML = items.map((k) => `<span class="chip ${k.d <= 2 ? 'is-urgent' : k.d <= 7 ? 'is-soon' : ''}" title="${esc(k.what)} · ${esc(k.source)}">${esc(shortWhat(k.what))} ${k.d === 0 ? 'today' : k.d + 'd'}</span>`).join('')
    + `<span class="dot ${bad.length ? 'is-bad' : health.length ? 'is-warn' : ''}" title="${esc(health.join(' · ') || 'all feeds ok')}"></span>`;
}

function renderMorning() {
  const body = $('morning-body'), stamp = $('morning-stamp');
  if (STATE.todayNote) {
    const secs = STATE.todayNote.sections || [];
    const keep = new Set(['top-three', 'yesterday', 'today']);
    const problems = secs.find((x) => x.key === 'problems');
    const hasProblems = problems && !/^-?\s*none\b/i.test(problems.text);
    const main = secs.filter((x) => keep.has(x.key));
    const fold = secs.filter((x) => !keep.has(x.key) && x.key !== 'problems');
    body.innerHTML = (hasProblems ? `<h2 class="problems">Problems</h2><div class="problems">${problems.html}</div>` : '')
      + main.map((x) => `<h2>${esc(x.title)}</h2>${x.html}`).join('')
      + (fold.length ? `<div class="fold">${fold.map((x) => `<h2>${esc(x.title)}</h2>${x.html}`).join('')}</div><button class="fold-btn" id="morning-fold">${$('panel-morning').classList.contains('is-open') ? 'less' : 'more'}</button>` : '');
    const fb = $('morning-fold');
    if (fb) fb.addEventListener('click', () => { const on = $('panel-morning').classList.toggle('is-open'); fb.textContent = on ? 'less' : 'more'; });
    const t = new Date(STATE.todayNote.modified);
    stamp.textContent = 'written ' + t.toLocaleString('en-US', { timeZone: STATE.timezone, month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    stamp.className = 'mono stamp';
  } else {
    const h = STATE.health.today || '';
    body.innerHTML = `<div class="empty ${/cannot/i.test(h) ? 'bad' : ''}">${esc(h)}</div>`;
    stamp.textContent = '';
  }
}

function renderNow() {
  const b = STATE.board;
  const body = $('now-body');
  const stamp = $('board-stamp');
  const age = b && b.date ? -daysUntil(b.date, STATE.today) : null;
  stamp.textContent = b ? `board ${b.date || ''} · ${b.lineCount} lines${age > 2 ? ` · ${age} days old, wrap the last session` : ''}` : '';
  stamp.style.color = age > 2 ? 'var(--gold)' : '';
  if (!b) { body.innerHTML = `<div class="empty bad">${esc(STATE.health.board)}</div>`; return; }
  if (!b.now || !b.now.length) { body.innerHTML = `<div class="empty bad">The board has no Now section I can read.</div>`; return; }
  const open = new Set([...body.querySelectorAll('.now-card.is-open')].map((c) => c.dataset.n));
  body.innerHTML = b.now.map((n) => `
    <div class="now-card ${open.has(String(n.n)) ? 'is-open' : ''}" data-n="${n.n}">
      <div class="now-top"><span class="now-n">${n.n}</span><div class="now-h">${n.headlineHtml}</div></div>
      <div class="now-meta">
        ${n.chips.dates.map((c) => `<span class="tag is-date">${esc(c)}</span>`).join('')}
        ${n.chips.money.map((c) => `<span class="tag is-money">${esc(c)}</span>`).join('')}
        ${n.links.map((l) => `<a class="tag is-link" href="${esc(l.href)}" ${l.external ? 'target="_blank" rel="noopener"' : ''}>${esc(l.text)}</a>`).join('')}
        <button class="now-more" data-toggle="${n.n}">${open.has(String(n.n)) ? 'less' : 'details'}</button>
        <button class="btn now-act" data-work="${n.n}">Work on this</button>
      </div>
      <div class="now-body">${n.bodyHtml}</div>
    </div>`).join('');
  body.querySelectorAll('[data-toggle]').forEach((btn) => btn.addEventListener('click', () => {
    const card = btn.closest('.now-card'); card.classList.toggle('is-open'); btn.textContent = card.classList.contains('is-open') ? 'less' : 'details';
  }));
  body.querySelectorAll('[data-work]').forEach((btn) => btn.addEventListener('click', () => {
    const item = b.now.find((x) => String(x.n) === btn.dataset.work);
    startSession(`Pick up Now #${item.n} on the board: ${item.headline} Read the board's Now section and the docs it links first, then tell me where it stands and what the next move is.`, btn);
  }));
}

function ageHtml(w) {
  if (w.ageDays == null) return '<span class="age"></span>';
  const cls = w.ageDays >= 5 ? 'is-stale' : w.ageDays >= 2 ? 'is-old' : '';
  return `<span class="age ${cls}" title="since ${esc(w.since)}">${w.ageDays}d</span>`;
}
function renderWaiting() {
  const b = STATE.board;
  const mine = $('waiting-body'), others = $('others-body'), toggle = $('others-toggle');
  if (!b || !b.waiting) { mine.innerHTML = `<div class="empty bad">${esc(STATE.health.board)}</div>`; others.innerHTML = ''; toggle.textContent = ''; return; }
  const me = b.waiting.filter((w) => w.isEvan), rest = b.waiting.filter((w) => !w.isEvan);
  const doneSet = new Set(JSON.parse(localStorage.getItem('roux.done') || '[]'));
  mine.innerHTML = me.length ? me.map((w) => `<div class="wait-row ${doneSet.has(w.what) ? 'is-done' : ''}" data-what="${esc(w.what)}"><div class="wait-what">${w.whatHtml}${/→/.test(w.who) ? ` <span class="wait-who">${esc(w.who)}</span>` : ''}</div>${ageHtml(w)}<button class="wait-done" title="Tell the brain this landed">Done</button></div>`).join('') : '<div class="empty">Nothing waiting on you.</div>';
  mine.querySelectorAll('.wait-done').forEach((btn) => btn.addEventListener('click', async () => {
    const row = btn.closest('.wait-row'); const what = row.dataset.what;
    if (row.classList.contains('is-done')) return;
    const ok = await capture('Done', what);
    if (ok) { row.classList.add('is-done'); doneSet.add(what); localStorage.setItem('roux.done', JSON.stringify([...doneSet])); }
  }));
  others.innerHTML = rest.map((w) => `<div class="wait-row"><div class="wait-what"><span class="wait-who">${esc(w.who)}</span>${w.whatHtml}</div>${ageHtml(w)}</div>`).join('');
  toggle.textContent = `others · ${rest.length}`;
}
$('others-toggle').addEventListener('click', () => $('others-body').classList.toggle('is-hidden'));

function renderRunning() {
  const b = STATE.board, body = $('running-body');
  if (!b || !b.running) { body.innerHTML = `<div class="empty bad">${esc(STATE.health.board)}</div>`; $('cap-stamp').textContent = ''; return; }
  const rows = b.running.map((r) => `<div class="run-row"><div class="run-title" title="${esc(r.title)}">${r.titleHtml}</div><div class="run-amt">${r.perDay.join(' · ')}${r.learning ? '<span class="st">learning</span>' : ''}${r.hold ? '<span class="st">hold</span>' : ''}</div></div>`).join('');
  const live = b.caps ? b.caps.value : b.running.reduce((t, r) => t + r.perDayTotal, 0);
  const ceiling = STATE.ceiling.value;
  const pct = Math.min(100, Math.round((live / ceiling) * 100));
  body.innerHTML = rows + `<div class="bar"><i class="${live > ceiling ? 'is-over' : ''}" style="width:${pct}%"></i></div>
    <div class="cap-line mono"><span>$${live}/day live</span><span style="color:var(--dim)">ceiling $${ceiling}/day</span></div>`;
  $('cap-stamp').textContent = b.caps ? `caps: ${b.caps.source}` : 'caps: summed from the board';
  $('cap-stamp').title = STATE.ceiling.source;
}

function renderWeek() {
  const el = $('week-body'), stamp = $('week-stamp');
  if (!WEEK) { el.innerHTML = '<div class="week-note">Loading…</div>'; return; }
  const keyByDay = {};
  for (const k of STATE.keyDates || []) (keyByDay[k.date] = keyByDay[k.date] || []).push(k);
  el.innerHTML = WEEK.days.map((d) => {
    const isToday = d === STATE.today, isPast = d < STATE.today;
    const dn = new Date(Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)));
    const label = `${['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][dn.getUTCDay()]} ${dn.getUTCDate()}`;
    const keys = (keyByDay[d] || []).map((k) => `<div class="ev is-key" title="${esc(k.what)} · ${esc(k.source)}">${esc(shortWhat(k.what, 30))}</div>`).join('');
    const evs = (WEEK.byDay[d] || []).map((e) => e.allDay
      ? `<div class="ev is-allday" style="border-left-color:${esc(e.color)}" title="${esc(e.calendar)}">${esc(e.summary)}</div>`
      : `<div class="ev" style="border-left-color:${esc(e.color)}" title="${esc(e.calendar)} · ${esc(e.time)}–${esc(e.endTime)}${e.location ? ' · ' + esc(e.location) : ''}"><span class="t">${esc(e.time)}</span>${esc(e.summary)}</div>`).join('');
    return `<div class="day ${isToday ? 'is-today' : ''} ${isPast ? 'is-past' : ''}"><div class="day-h">${label}</div>${keys}${evs}</div>`;
  }).join('');
  const notConf = WEEK.feeds.filter((f) => f.error === 'not configured');
  const broken = WEEK.feeds.filter((f) => f.error && f.error !== 'not configured');
  let note = '';
  if (WEEK.configError) note += `<div class="week-note bad">${esc(WEEK.configError)}</div>`;
  if (notConf.length === WEEK.feeds.length && WEEK.feeds.length) note += `<div class="week-note">No calendar connected yet. Paste the two secret iCal addresses into <code>config.local.json</code> in the roux-os folder. The page picks them up on its own.</div>`;
  else if (notConf.length) note += `<div class="week-note">${esc(notConf.map((f) => f.name).join(', '))}: not configured yet.</div>`;
  if (broken.length) note += broken.map((f) => `<div class="week-note bad">Cannot read the ${esc(f.name)} calendar: ${esc(f.error)}${f.stale ? ' (showing the last good copy)' : ''}</div>`).join('');
  el.insertAdjacentHTML('beforeend', note);
  const ok = WEEK.feeds.filter((f) => f.ok);
  stamp.textContent = ok.length ? `${ok.map((f) => f.name).join(' + ')} · ${new Date(WEEK.generatedAt).toLocaleTimeString('en-US', { timeZone: STATE.timezone, hour: 'numeric', minute: '2-digit' })}` : '';
}

function renderStatus() {
  const h = STATE.health;
  const bits = Object.entries(h).map(([k, v]) => `<span class="${v === 'ok' ? '' : /no brief/i.test(v) ? '' : 'bad'}">${esc(k)}: ${esc(v)}</span>`);
  bits.push(`<span>capture: ${STATE.captureLines} line${STATE.captureLines === 1 ? '' : 's'}</span>`);
  $('capture-stamp').textContent = STATE.captureLines ? `${STATE.captureLines} waiting for the next session` : '';
  bits.push(`<span>roux os ${esc(STATE.version)}</span>`);
  $('status').innerHTML = bits.join('');
}

function renderAll() {
  tickClock(); renderCountdowns(); renderMorning(); renderNow(); renderWaiting(); renderRunning(); renderWeek(); renderStatus(); renderLinks();
  if (document.querySelector('#view-board.is-on')) renderBoard();
}

// ---- actions ----
let toastTimer = null;
function toast(msg, bad) {
  let el = document.querySelector('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg; el.classList.toggle('bad', !!bad); el.style.display = 'block';
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.style.display = 'none'; }, bad ? 6000 : 2500);
}
async function capture(kind, text) {
  try {
    const r = await fetch('/api/capture', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-ROUX': 'page' }, body: JSON.stringify({ kind, text }) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.status);
    toast(kind === 'Done' ? 'Noted as done. The next wrap clears it from the board.' : 'Saved. The next session reads it first.');
    return true;
  } catch (e) { toast('Could not save: ' + e.message, true); return false; }
}
async function startSession(prompt, btn) {
  const st = $('session-status');
  if (btn) btn.disabled = true;
  st.textContent = 'opening…';
  try {
    const r = await fetch('/api/session', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-ROUX': 'page' }, body: JSON.stringify({ prompt }) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.status);
    st.textContent = 'session opened in Terminal';
    setTimeout(() => { st.textContent = ''; }, 4000);
  } catch (e) { st.textContent = ''; toast(e.message, true); }
  if (btn) btn.disabled = false;
}
function wireActions() {
  $('capture-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const inp = $('capture-text'); const text = inp.value.trim();
    if (!text) return;
    if (await capture('', text)) { inp.value = ''; loadState().catch(() => {}); }
  });
  $('ask-btn').addEventListener('click', () => {
    const text = $('capture-text').value.trim();
    if (!text) { toast('Type the question first.', true); $('capture-text').focus(); return; }
    startSession(text, $('ask-btn')).then(() => { $('capture-text').value = ''; });
  });
  document.querySelectorAll('[data-session]').forEach((btn) => btn.addEventListener('click', () => startSession(btn.dataset.session, btn)));
  $('pulse-btn').addEventListener('click', runPulse);
  document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => showTab(t.dataset.tab)));
  $('files-q').addEventListener('input', () => { clearTimeout(filesTimer); filesTimer = setTimeout(() => loadFiles($('files-q').value), 150); });
  document.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); showTab('files'); $('files-q').select(); } });
}

// ---- tabs, links, recent, board, files ----
function showTab(name) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('is-on', t.dataset.tab === name));
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('is-on', v.id === 'view-' + name));
  try { localStorage.setItem('roux.tab', name); } catch (_) {}
  if (name === 'board') renderBoard();
  if (name === 'files') { loadFiles($('files-q').value); setTimeout(() => $('files-q').focus(), 50); }
}
function renderLinks() {
  $('links').innerHTML = (STATE.links || []).map((l) => l.vault
    ? `<a href="obsidian://open?vault=${encodeURIComponent(STATE.vaultName)}&file=${encodeURIComponent(l.vault)}">${esc(l.label)}</a>`
    : `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')
    + `<a href="obsidian://open?vault=${encodeURIComponent(STATE.vaultName)}">Vault</a>`;
}
function ago(iso) {
  const m = Math.round((Date.now() - new Date(iso)) / 60000);
  if (m < 2) return 'now'; if (m < 60) return m + 'm'; const h = Math.round(m / 60); if (h < 48) return h + 'h'; return Math.round(h / 24) + 'd';
}
async function loadRecent() {
  try {
    const r = await fetch('/api/recent', { cache: 'no-store' }); const j = await r.json(); j.files = j.files.slice(0, 8);
    $('recent-body').innerHTML = j.files.map((f) => `<div class="recent-row"><a href="${esc(f.obsidian)}" title="${esc(f.rel)}"><span class="area">${esc(f.area.replace(/\s*\(.*?\)/, ''))}</span>${esc(f.name)}</a><span class="when">${ago(f.modified)}</span></div>`).join('') || '<div class="empty">Nothing yet.</div>';
  } catch (e) { $('recent-body').innerHTML = `<div class="empty bad">Cannot list files: ${esc(e.message)}</div>`; }
}
function renderBoard() {
  const b = STATE.board, el = $('board-body');
  if (!b) { el.innerHTML = `<div class="board-sec bad">${esc(STATE.health.board)}</div>`; return; }
  const order = ['now', 'waiting', 'running', 'parked', 'landmines', 'numbers', 'map'];
  const secs = [...b.sections].sort((x, y) => (order.indexOf(x.key) + 99) % 99 - (order.indexOf(y.key) + 99) % 99);
  el.innerHTML = `<div class="board-sec is-wide"><span class="eyebrow">${esc(b.title)}</span><span class="mono stamp">${b.lineCount} lines · rewritten at every /wrap · only the brain edits this · <a href="obsidian://open?vault=${encodeURIComponent(STATE.vaultName)}&file=${encodeURIComponent('my-desk (now)/BOARD')}">open in Obsidian</a></span></div>`
    + secs.map((x) => `<div class="board-sec is-${x.key} ${x.key === 'landmines' || x.key === 'numbers' || x.key === 'parked' ? 'is-wide' : ''}"><span class="eyebrow">${esc(x.heading)}</span>${x.html}</div>`).join('');
}
let filesTimer = null, filesSel = null;
async function loadFiles(q) {
  try {
    const r = await fetch('/api/files?q=' + encodeURIComponent(q || ''), { cache: 'no-store' }); const j = await r.json();
    $('files-count').textContent = `${j.files.length} of ${j.total} files${q ? ' matching' : ''}`;
    const groups = {};
    for (const f of j.files) (groups[f.area] = groups[f.area] || []).push(f);
    $('files-list').innerHTML = Object.entries(groups).map(([area, fs]) => `<div class="file-area">${esc(area)}</div>` + fs.map((f) => `<div class="file-row ${filesSel === f.rel ? 'is-on' : ''}" data-rel="${esc(f.rel)}" data-obs="${esc(f.obsidian)}"><span class="fn">${esc(f.name)}<br><span class="fp">${esc(f.rel.split('/').slice(1, -1).join(' / '))}</span></span><span class="when">${ago(f.modified)}</span></div>`).join('')).join('');
    $('files-list').querySelectorAll('.file-row').forEach((row) => row.addEventListener('click', () => previewFile(row.dataset.rel, row.dataset.obs)));
  } catch (e) { $('files-list').innerHTML = `<div class="empty bad">Cannot search: ${esc(e.message)}</div>`; }
}
async function previewFile(rel, obs) {
  filesSel = rel;
  document.querySelectorAll('.file-row').forEach((r) => r.classList.toggle('is-on', r.dataset.rel === rel));
  const el = $('files-preview');
  const head = `<div class="pv-head"><span class="path" title="${esc(rel)}">${esc(rel)}</span><a class="btn btn-sm" href="${esc(obs)}">Open in Obsidian</a><button class="btn btn-sm" id="pv-copy">Copy path</button></div>`;
  el.innerHTML = head + '<div class="pv empty">Loading…</div>';
  $('pv-copy').addEventListener('click', () => { navigator.clipboard.writeText(rel).then(() => toast('Path copied')); });
  try {
    const r = await fetch('/api/preview?path=' + encodeURIComponent(rel), { cache: 'no-store' }); const j = await r.json();
    let body = '';
    if (j.kind === 'markdown') body = j.html + (j.truncated ? '<p class="empty">… (first part only, open in Obsidian for the whole file)</p>' : '');
    else if (j.kind === 'text') body = `<pre>${esc(j.text)}</pre>`;
    else if (j.kind === 'image') body = `<img src="${esc(j.src)}" alt="">`;
    else body = `<div class="empty">No preview for this type (${Math.round((j.size || 0) / 1024)} KB). Open it in Obsidian or Finder.</div>`;
    el.innerHTML = head + `<div class="pv">${body}</div>`;
    $('pv-copy').addEventListener('click', () => { navigator.clipboard.writeText(rel).then(() => toast('Path copied')); });
  } catch (e) { el.innerHTML = head + `<div class="empty bad">${esc(e.message)}</div>`; }
}

// ---- routines ----
let RUNS = null;
async function loadRuns() {
  try { const r = await fetch('/api/runs', { cache: 'no-store' }); RUNS = await r.json(); } catch (e) { RUNS = null; }
  renderRoutine();
}
function renderRoutine() {
  const el = $('routine-status'), btn = $('pulse-btn');
  if (!RUNS) { el.textContent = ''; return; }
  const p = RUNS.list.find((x) => x.key === 'pulse');
  el.className = 'mono stamp' + (p.running ? ' is-running' : p.last && p.last.status === 'failed' ? ' is-failed' : '');
  if (p.running) { el.textContent = 'pulse running…'; btn.disabled = true; return; }
  btn.disabled = false;
  if (p.last) {
    const t = new Date(p.last.at).toLocaleString('en-US', { timeZone: STATE ? STATE.timezone : undefined, month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    el.textContent = `pulse ${p.last.status} ${t} · ${p.schedule}`;
    el.title = p.last.detail || '';
  } else el.textContent = `pulse: never run · ${p.schedule}`;
}
async function runPulse() {
  const btn = $('pulse-btn'); btn.disabled = true;
  try {
    const r = await fetch('/api/run', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-ROUX': 'page' }, body: JSON.stringify({ kind: 'pulse' }) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.status);
    toast('Pulse started. It reads Meta, Shopify and the calendar, then writes the brief. About a minute and a half.');
    setTimeout(loadRuns, 800);
  } catch (e) { toast(e.message, true); btn.disabled = false; }
}

// ---- data ----
async function loadState() {
  const r = await fetch('/api/state', { cache: 'no-store' });
  if (!r.ok) throw new Error('state ' + r.status);
  STATE = await r.json();
  renderAll();
}
async function loadWeek() {
  try {
    const r = await fetch('/api/calendar', { cache: 'no-store' });
    WEEK = await r.json();
  } catch (e) { WEEK = { days: [], byDay: {}, feeds: [], configError: 'Cannot reach the calendar endpoint: ' + e.message }; }
  if (STATE) renderWeek();
}
async function boot() {
  wireActions();
  try { await loadState(); } catch (e) { $('status').innerHTML = `<span class="bad">Cannot load state: ${esc(e.message)}</span>`; }
  await loadWeek();
  await loadRuns();
  await loadRecent();
  try { const t = localStorage.getItem('roux.tab'); if (t && t !== 'today') showTab(t); } catch (_) {}
  setInterval(loadWeek, 5 * 60 * 1000);
  setInterval(() => loadState().catch(() => {}), 10 * 60 * 1000);
  const es = new EventSource('/api/events');
  es.onmessage = (m) => { if (m.data === 'hello') return; if (m.data === 'runs') { loadRuns(); return; } loadState().catch(() => {}); loadRecent(); if (m.data === 'config') loadWeek(); };
  es.onerror = () => { $('status').insertAdjacentHTML('beforeend', '<span class="bad">live updates disconnected, retrying</span>'); };
}
boot();
