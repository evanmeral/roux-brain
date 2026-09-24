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
  $('clock-date').textContent = p.date;
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
  el.innerHTML = items.map((k) => `<span class="chip ${k.d <= 2 ? 'is-urgent' : k.d <= 7 ? 'is-soon' : ''}" title="${esc(k.what)} · ${esc(k.source)}">${esc(shortWhat(k.what, 34))} · ${k.d === 0 ? 'today' : k.d === 1 ? 'tomorrow' : k.d + ' days'}</span>`).join('');
  $('health-dot').className = `dot ${bad.length ? 'is-bad' : health.length ? 'is-warn' : ''}`;
  $('health-text').textContent = bad.length ? bad[0] : health.length ? health[0] : 'All feeds OK';
  $('health-text').title = health.join(' · ') || 'all feeds ok';
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
// Who a nudge is for, in plain words. "Jay → Evan → Garrett" waits on Jay; Jay's asks go in one batch text.
function waitTarget(who) { return who.split('→')[0].replace(/\s+/g, ' ').trim(); }
function shortAsk(what) { const s = what.replace(/\s+/g, ' ').trim(); const cut = s.search(/[.;:]\s/); const t = cut > 12 && cut < 110 ? s.slice(0, cut) : s; return t.length > 110 ? t.slice(0, 109) + '…' : t; }
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
  // Waiting on others: the age, and a one-tap request for a drafted nudge. Drafts only; Evan sends.
  let nudged = {}; try { nudged = JSON.parse(localStorage.getItem('roux.nudged') || '{}'); } catch (_) {}
  const key = (w) => `${w.who}|${w.what}`.slice(0, 200);
  others.innerHTML = rest.length ? `<div class="others-h mono stamp">Waiting on others</div>` + rest.map((w, i) => {
    const jay = /^jay\b/i.test(waitTarget(w.who)); const when = nudged[key(w)];
    return `<div class="wait-row"><div class="wait-what" title="${esc(w.what)}"><span class="wait-who">${esc(w.who)}</span>${w.whatHtml}</div>${ageHtml(w)}<button class="wait-done" data-nudge="${i}" title="${jay ? "Questions for Jay go in one text. This adds it to the batch for the next session." : 'Sends nothing. Leaves a note so the next session drafts the nudge. You send it.'}">${when === STATE.today ? 'asked today' : jay ? 'Add to Jay batch' : 'Draft nudge'}</button></div>`;
  }).join('') : '';
  others.querySelectorAll('[data-nudge]').forEach((btn) => btn.addEventListener('click', async () => {
    const w = rest[Number(btn.dataset.nudge)]; const target = waitTarget(w.who); const jay = /^jay\b/i.test(target);
    btn.disabled = true;
    const text = jay ? `Add to the Jay batch (one text, not a chain): ${shortAsk(w.what)} — Ada` : `Draft a nudge to ${target} re ${shortAsk(w.what)}${w.ageDays != null ? ` (waiting ${w.ageDays} days, since ${w.since})` : ''} — Ada`;
    const ok = await capture('', text, jay ? 'Added to the Jay batch. The next session builds the one text. Nothing was sent.' : 'Noted. The next session drafts the nudge for you to send. Nothing was sent.');
    btn.disabled = false;
    if (ok) { nudged[key(w)] = STATE.today; try { localStorage.setItem('roux.nudged', JSON.stringify(nudged)); } catch (_) {} btn.textContent = 'asked today'; loadState().catch(() => {}); }
  }));
  toggle.textContent = rest.length ? `others · ${rest.length}` : '';
  others.classList.toggle('is-hidden', localStorage.getItem('roux.others') === 'hide');
}
$('others-toggle').addEventListener('click', () => { const hid = $('others-body').classList.toggle('is-hidden'); try { localStorage.setItem('roux.others', hid ? 'hide' : 'show'); } catch (_) {} });

// ---- the desk strip: three counts, each one click from its tab ----
function renderDeskStrip() {
  const d = STATE.desk || {}; const L = d.launches || {}, A = d.approvals || {}, F = d.affiliates || {}, P = d.posts || {};
  const tile = (tab, label, main, sub, cls) => `<button class="desk-tile ${cls || ''}" data-goto="${tab}"><span class="eyebrow">${label}</span><span class="desk-main">${main}</span><span class="desk-sub">${sub}</span></button>`;
  let html = '';
  if (L.error) html += tile('launches', 'Next launch', `<span class="bad">${esc(L.error)}</span>`, '', '');
  else if (L.next) html += tile('launches', 'Next launch', `${esc(L.next.title)} · ${L.next.daysOut === 0 ? 'today' : L.next.daysOut + 'd'}`, `${L.next.open} of ${L.next.total} gates open${L.overdue ? ` · <span class="bad">${L.overdue} overdue</span>` : ''}`, L.next.daysOut <= 2 ? 'is-urgent' : L.next.daysOut <= 7 ? 'is-soon' : '');
  else html += tile('launches', 'Next launch', 'Nothing dated ahead', '', '');
  if (A.error) html += tile('approvals', 'Approvals', `<span class="bad">${esc(A.error)}</span>`, '', '');
  else html += tile('approvals', 'Approvals', A.pending ? `${A.pending} waiting on your yes or no` : 'Nothing waiting', A.pending ? 'decide with a line note' : 'agents queue items here', A.pending ? 'is-soon' : '');
  if (P.error) html += tile('posts', 'Posts', `<span class="bad">${esc(P.error)}</span>`, '', '');
  else html += tile('posts', 'Posts', P.waiting ? `${P.waiting} waiting on your approval` : 'Nothing waiting on approval', P.failing ? `<span class="bad">${P.failing} failing preflight</span>` : 'none failing preflight', P.waiting ? 'is-soon' : '');
  if (F.error) html += tile('affiliates', 'Affiliates', `<span class="bad">${esc(F.error)}</span>`, '', '');
  else html += tile('affiliates', 'Affiliates', `${F.sold30} sold in 30 days · ${F.quiet30} gone quiet`, `${F.unknownUp} on UpPromote, not on your list · ${F.salesFrom === 'finn' ? "Finn's read" : 'seed read, unconfirmed'}`, '');
  $('desk-strip').innerHTML = html;
  $('desk-strip').querySelectorAll('[data-goto]').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.goto)));
  const n = $('tab-approvals-n'); n.textContent = A.pending || ''; n.classList.toggle('is-hidden', !A.pending);
  const pn = $('tab-posts-n'); pn.textContent = P.waiting || ''; pn.classList.toggle('is-hidden', !P.waiting);
  const PR = d.proposals || {}; const prn = $('tab-proposals-n'); prn.textContent = PR.waiting || ''; prn.classList.toggle('is-hidden', !PR.waiting);
}

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
  $('capture-stamp-home').textContent = STATE.captureLines ? `${STATE.captureLines} waiting` : '';
  bits.push(`<span>roux os ${esc(STATE.version)}</span>`);
  $('status').innerHTML = bits.join('');
}

function renderAll() {
  tickClock(); renderCountdowns(); renderDeskStrip(); renderMorning(); renderNow(); renderWaiting(); renderRunning(); renderWeek(); renderStatus(); renderLinks(); renderHome(); renderKey();
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
// One POST helper for the panel scripts: JSON in, JSON out, a red toast with the server's words on any refusal.
async function postJson(url, body) {
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-ROUX': 'page' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || 'the server said ' + r.status);
    return j;
  } catch (e) { toast('Could not save: ' + e.message, true); return null; }
}
async function capture(kind, text, okMsg) {
  const j = await postJson('/api/capture', { kind, text });
  if (j) toast(okMsg || (kind === 'Done' ? 'Noted as done. The next wrap clears it from the board.' : 'Saved. The next session reads it first.'));
  return !!j;
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
  $('rem-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const inp = $('rem-text'); const text = inp.value.trim();
    if (!text) { toast('Type the reminder first.', true); inp.focus(); return; }
    const j = await postJson('/api/reminders/add', { text });
    if (j) { inp.value = ''; toast('Reminder added.'); loadReminders(); }
  });
  window.addEventListener('resize', placeHomeCol);
  $('capture-form-home').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const inp = $('capture-text-home'); const text = inp.value.trim();
    if (!text) return;
    if (await capture('', text)) { inp.value = ''; loadState().catch(() => {}); }
  });
  $('ask-btn-home').addEventListener('click', () => {
    const text = $('capture-text-home').value.trim();
    if (!text) { toast('Type the question first.', true); $('capture-text-home').focus(); return; }
    startSession(text, $('ask-btn-home')).then(() => { $('capture-text-home').value = ''; });
  });
  document.querySelectorAll('.widget [data-goto]').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.goto)));
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
const TAB_TITLES = { home: 'Home', today: 'Today', plan: "This Month's Plan", launches: 'Launches', approvals: 'Approvals', planner: 'Planner', posts: 'Posts', affiliates: 'Affiliates', score: 'Score', budget: 'Marketing Budget', paidmedia: 'Paid Media', proposals: "ROUX's Proposals", board: 'Board', files: 'Files' };
let TAB = 'home';
function showTab(name) {
  if (!TAB_TITLES[name]) name = 'home';
  TAB = name;
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('is-on', t.dataset.tab === name));
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('is-on', v.id === 'view-' + name));
  $('page-title').textContent = TAB_TITLES[name];
  document.body.classList.toggle('on-home', name === 'home');
  window.scrollTo(0, 0);
  renderKey();
  try { localStorage.setItem('roux.tab3', name); } catch (_) {}
  if (name === 'home') { GRAPH.load(); loadReminders(); requestAnimationFrame(placeHomeCol); }
  if (name === 'planner') loadPlanner();
  if (name === 'budget' || name === 'paidmedia') loadBudget();
  if (name === 'proposals') loadProposals();
  if (name === 'plan') loadPlan();
  if (name === 'board') renderBoard();
  if (name === 'launches') loadLaunches();
  if (name === 'approvals') loadApprovals();
  if (name === 'affiliates') loadAffiliates();
  if (name === 'score') loadScore();
  if (name === 'posts') loadPosts(true);
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
    const r = await fetch('/api/recent', { cache: 'no-store' }); const j = await r.json(); j.files = j.files.slice(0, 5);   // five, not eight: the desk strip took that height (v0.2)
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
    const why = p.last.status === 'failed' ? (p.last.detail || '').split(' · ')[1] || '' : '';
    const hint = /authenticate|logged in|login/i.test(why) ? ' — run `claude auth login` in a terminal' : '';
    el.textContent = `pulse ${p.last.status} ${t}` + (why ? `: ${why}${hint}` : ` · ${p.schedule}`);
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
  if (STATE) { renderWeek(); renderHome(); }
}
// A file changed: refresh whichever panel tab is open. The affiliates drawer is left alone so a
// half-typed edit is never thrown away; only the table behind it refreshes.
function refreshOpenTab(what) {
  const on = (id) => document.querySelector('#view-' + id + '.is-on');
  if (on('launches')) loadLaunches();
  if (on('approvals')) loadApprovals();
  if (on('score')) loadScore();
  if (what && /PLAN\.md/.test(what)) loadPlan();
  if (what === 'graph') GRAPH.refresh(!!on('home'));
  else if (on('home') && what && /\.md$/.test(what)) GRAPH.refresh(true);
  if (what && /reminders\.md/.test(what)) loadReminders();
  if (on('planner') && (what === 'posts' || /capture\.md|post-results\.json/.test(what || ''))) loadPlanner();
  if (on('posts') && /post-results\.json/.test(what || '') && !document.querySelector('#posts-body [data-note]:focus')) loadPosts(true);
  if ((on('budget') || on('paidmedia')) && (what === 'budget' || /BOARD\.md/.test(what || '')) && !document.querySelector('#budget-body input:focus')) loadBudget();
  if (on('proposals') && /proposals\.json/.test(what || '') && !document.querySelector('#proposals-body input:focus')) loadProposals();
  if (on('posts') && /capture\.md/.test(what || '') && !document.querySelector('#posts-body [data-note]:focus')) loadPosts(true);
  if (on('posts') && what === 'posts' && !document.querySelector('#posts-body [data-note]:focus')) loadPosts(true);
  if (on('affiliates') && what === 'affiliates' && !$('aff-drawer').classList.contains('is-on')) loadAffiliates();
}
async function boot() {
  wireActions(); initAffiliates(); GRAPH.wire();
  try { await loadState(); } catch (e) { $('status').innerHTML = `<span class="bad">Cannot load state: ${esc(e.message)}</span>`; }
  await loadWeek();
  await loadRuns();
  await loadRecent();
  loadPlan();   // feeds the Plan pace widget on Home
  let first = 'home'; try { first = localStorage.getItem('roux.tab3') || 'home'; } catch (_) {}
  showTab(first);
  setInterval(loadWeek, 5 * 60 * 1000);
  setInterval(() => loadState().catch(() => {}), 10 * 60 * 1000);
  const es = new EventSource('/api/events');
  es.onmessage = (m) => { if (m.data === 'hello') return; if (m.data === 'runs') { loadRuns(); return; } if (m.data === 'graph') { refreshOpenTab('graph'); return; } loadState().catch(() => {}); loadRecent(); refreshOpenTab(m.data); if (m.data === 'config') loadWeek(); };
  es.onerror = () => { $('status').insertAdjacentHTML('beforeend', '<span class="bad">live updates disconnected, retrying</span>'); };
}
boot();


// ---- Home widgets (v0.3) ----
function renderHome() {
  if (!STATE) return;
  const b = STATE.board;
  placeHomeCol();
  // plan pace (what PLAN.md says; nothing computed)
  const pb = $('w-plan-body'); const v = typeof PLANV !== 'undefined' ? PLANV : null;
  if (!pb) { /* plan pace widget not on the page */ }
  else if (!v) pb.innerHTML = '<div class="w-empty">Loading the plan…</div>';
  else if (v.error) pb.innerHTML = `<div class="bad">${esc(v.error)}</div>`;
  else {
    const col = v.pace ? v.pace.head.findIndex((h) => /consumer/i.test(h)) : -1;
    const next = v.pace && v.pace.rows.find((r) => r.date && r.date >= STATE.today);
    const wk = (v.weeks || []).find((w) => w.status === 'current');
    const d = next ? Math.round((Date.parse(next.date + 'T12:00:00Z') - Date.parse(STATE.today + 'T12:00:00Z')) / 86400000) : null;
    pb.innerHTML = (next && col >= 0 ? `<div class="w-big">${esc(next.cells[col])}</div><div class="w-sub">consumer sales needed by ${esc(new Date(next.date + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' }))}${d === 0 ? ', today' : ` · ${d} day${d === 1 ? '' : 's'}`}</div>` : '<div class="w-empty">No score date ahead.</div>')
      + (wk ? `<div class="w-row" style="margin-top:10px;border-top:1px solid var(--border)"><span class="x">Week ${esc(wk.n || '')} jobs</span><span class="t" style="min-width:0">${wk.jobs.filter((j) => j.state === 'done').length} of ${wk.jobs.filter((j) => j.state !== 'dropped').length} done</span></div>` : '');
  }
  // Meta caps vs the ceiling (the board's own figures)
  const mb = $('w-meta-body');
  if (!mb) { /* Meta caps widget not on the page */ }
  else if (!b || !b.running) mb.innerHTML = `<div class="bad">${esc(STATE.health.board || 'Cannot read the board')}</div>`;
  else {
    const live = b.caps ? b.caps.value : b.running.reduce((t, r) => t + r.perDayTotal, 0);
    const ceiling = STATE.ceiling.value; const pct = Math.min(100, Math.round(live / ceiling * 100));
    mb.innerHTML = `<div class="w-big">$${live}<span style="font-size:15px;font-weight:500;color:var(--muted)"> /day</span></div><div class="w-sub">live daily caps · ceiling $${ceiling}/day</div>
      <div class="bar"><i class="${live > ceiling ? 'is-over' : ''}" style="width:${pct}%"></i></div>
      <div class="w-sub" style="margin-top:8px">${esc(b.caps ? 'From the board: ' + b.caps.source : 'Summed from the board')}</div>`;
  }
}

// ---- the color key: one spot, under the menu; its rows change with the page ----
function keyItems(tab) {
  const R = (color, label, sub, kind) => ({ color, label, sub, kind });
  switch (tab) {
    case 'home': return null;   // the graph's groups, drawn as toggles below
    case 'today': return [
      R('#FFA41C', 'Date within 7 days', 'countdown chips, top right', 'box'),
      R('#FF6A4D', 'Date within 2 days', 'or a broken feed', 'box'),
      R('#E13418', 'Key date', 'from key-dates.md, in the week', 'line'),
      ...((STATE && STATE.calendars) || []).filter((c) => c.color).map((c) => R(c.color, `${c.name} calendar`, 'event bar color', 'line')),
      R('#F69329', 'Today', 'outlined day in the week', 'ring'),
      R('#FFA41C', 'Waiting 2+ days', 'age on a waiting row'),
      R('#E13418', 'Waiting 5+ days', 'chase it'),
      R('#198754', 'Feeds OK', 'dot at the bottom of the menu'),
    ];
    case 'plan': return [
      R('#198754', 'Job done', '✓ in the week list', 'box'),
      R('#FF6A4D', 'Job dropped', '× and struck through', 'box'),
      R('#8C8681', 'Job open', 'empty box', 'ring'),
      R('#F69329', 'This week / today', 'outlined week, orange line', 'ring'),
      R('#7FCB99', 'Week finished', 'green on the timeline'),
      R('#FFA41C', 'Thursday score · gate', 'gold dots and chips'),
      R('#6FD69E', 'Gate passed', 'green chip'),
    ];
    case 'launches': return [
      R('#F69329', "Evan's job", 'owner tag'),
      R('#E13418', 'Overdue gate', 'due date in red'),
      R('#8C8681', 'Done or past', 'struck through / faded'),
    ];
    case 'approvals': return [
      R('#F69329', 'Live write', 'Shopify, Meta or Google: still needs your yes in a session', 'ring'),
      R('#FFA41C', 'Queued', 'confirm in session'),
      R('#4CC38A', 'Approved'),
      R('#8C8681', 'Rejected'),
    ];
    case 'planner': return [
      R('#4CC38A', 'Scheduled · verified', 'in Business Suite, read back', 'box'),
      R('#F69329', 'Approved', 'waiting on the Schedule button', 'box'),
      R('#FFA41C', 'Draft', 'waiting on your approval', 'box'),
      R('#FF6A4D', 'Dropped', 'not going out', 'box'),
      R('#F69329', 'Today', 'outlined day', 'ring'),
    ];
    case 'budget': return [
      R('#F69329', 'Monthly cost', 'from the source beside it'),
      R('#FFA41C', 'Not on file', 'nobody has read the cost yet'),
      R('#8C8681', 'Ended or free', ''),
    ];
    case 'paidmedia': return [
      R('#F69329', 'Live daily caps', "the board's Running section", 'line'),
      R('#E13418', 'Over the ceiling', '$350/day for the account', 'line'),
      R('#FFA41C', 'Old read', 'a spend figure over a week old'),
    ];
    case 'proposals': return [
      R('#4CC38A', 'Free', 'runs on what you already have'),
      R('#F69329', 'Paid', 'a yes is not a purchase; you buy it'),
      R('#FFA41C', 'Price not confirmed', 'check before paying'),
    ];
    case 'posts': return [
      R('#4CC38A', 'Pass · approved · scheduled', 'preflight and status'),
      R('#FFA41C', 'Warning · queued', 're-check before it posts'),
      R('#FF6A4D', 'Fail · dropped', 'fail blocks scheduling; a dropped post is folded'),
    ];
    case 'affiliates': return [
      R('#4CC38A', 'Active · sold in 30 days', 'green pill and dot'),
      R('#F69329', 'Prospect', ''),
      R('#FFA41C', 'Paused · evidence flag', "a fact from Finn's report, not a verdict"),
      R('#FF6A4D', 'High returns', 'flag'),
      R('#8C8681', 'Ended or archived', ''),
    ];
    case 'score': return [
      R('#F69329', 'Next score', 'highlighted row', 'line'),
      R('#8C8681', 'Past, not scored', 'faded row'),
    ];
    case 'board': return [
      R('#F69329', 'Section', 'as the board names it'),
      R('#E13418', 'Landmines', 'do not ship these'),
    ];
    case 'files': return [
      R('#F69329', 'Folder', 'files grouped by top folder'),
      R('#363333', 'Selected', 'the file in the preview', 'box'),
    ];
    default: return [];
  }
}
function renderKey() {
  const body = $('key-body'); if (!body) return;
  $('key-page').textContent = TAB_TITLES[TAB] || '';
  if (TAB === 'home') {
    body.innerHTML = GRAPH.keyRows().map((r) => `<div class="key-row is-toggle ${r.off ? 'is-off' : ''}" data-group="${r.group}" title="Click to ${r.off ? 'show' : 'hide'}"><span class="sw" style="background:${r.color}"></span><span>${esc(r.label)}${r.sub ? `<small>${esc(r.sub)}</small>` : ''}</span></div>`).join('')
      + (() => { const nw = GRAPH.newInfo(); if (!nw.period) return ''; const since = new Date(nw.period.from + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
        return `<div class="key-row is-toggle ${nw.on ? '' : 'is-dimmed'}" id="key-new" title="Click to ${nw.on ? 'stop highlighting' : 'highlight'} them"><span class="sw is-ring" style="border-color:#FFFFFF"></span><span>New since ${esc(since)} · ${nw.count}<small>made since the score before the last Thursday score; refreshes when a score lands</small></span></div>`; })()
      + `<div class="key-note">ROUX glows at the core; the six named lights are the hubs. Arcs over the surface are real links between files. Click a color to hide or show it.</div>`;
    body.querySelectorAll('[data-group]').forEach((el) => el.addEventListener('click', () => GRAPH.toggleGroup(el.dataset.group)));
    const kn = $('key-new'); if (kn) kn.addEventListener('click', () => GRAPH.toggleNew());
    return;
  }
  const items = keyItems(TAB);
  body.innerHTML = items.length ? items.map((r) => `<div class="key-row"><span class="sw ${r.kind ? 'is-' + r.kind : ''}" style="${r.kind === 'ring' ? 'border-color' : 'background'}:${r.color}"></span><span>${esc(r.label)}${r.sub ? `<small>${esc(r.sub)}</small>` : ''}</span></div>`).join('') : '<div class="key-note">No colors on this page.</div>';
}


// ---- Reminders (Home): short notes for Evan, from my-desk (now)/reminders.md ----
let REMINDERS = null;
async function loadReminders() {
  try { const r = await fetch('/api/reminders', { cache: 'no-store' }); REMINDERS = await r.json(); if (!r.ok) throw new Error(REMINDERS.error || r.status); }
  catch (e) { REMINDERS = { error: e.message, items: [] }; }
  renderReminders();
}
function renderReminders() {
  const el = $('w-rem-body'); const v = REMINDERS;
  if (!v) { el.innerHTML = '<div class="w-empty">Loading…</div>'; return; }
  if (v.error) { el.innerHTML = `<div class="bad">Cannot read reminders: ${esc(v.error)}</div>`; return; }
  const open = v.items.filter((i) => !i.done); const doneToday = v.items.filter((i) => i.done).slice(-3);
  $('rem-stamp').textContent = open.length ? `${open.length} open` : '';
  el.innerHTML = (open.length ? open.map((i) => remRow(i)).join('') : '<div class="w-empty">No reminders. Add one below.</div>')
    + (doneToday.length ? `<div class="rem-done-h">Done, cleared at wrap</div>${doneToday.map((i) => remRow(i)).join('')}` : '');
  el.querySelectorAll('[data-rem-x]').forEach((b) => b.addEventListener('click', async () => {
    const i = v.items[Number(b.dataset.remX)]; b.disabled = true;
    const j = await postJson('/api/reminders/remove', { line: i.line, text: i.text });
    if (j) toast('Removed. It is kept in the reminders archive.');
    loadReminders();
  }));
  el.querySelectorAll('[data-rem]').forEach((b) => b.addEventListener('click', async () => {
    const i = v.items[Number(b.dataset.rem)]; b.disabled = true;
    const j = await postJson('/api/reminders/toggle', { line: i.line, text: i.text, done: !i.done });
    if (j) toast(j.done ? 'Done. It clears at the next wrap.' : 'Back on the list.');
    loadReminders();
  }));
  placeHomeCol();
}
function remRow(i) {
  const idx = REMINDERS.items.indexOf(i);
  return `<div class="rem-row ${i.done ? 'is-done' : ''}"><button class="rem-box" data-rem="${idx}" title="${i.done ? 'Put it back on the list' : 'Mark done'}" aria-label="${i.done ? 'Undo' : 'Done'}">${i.done ? '✓' : ''}</button><span class="rem-t">${esc(i.text)}</span>${i.by && !/evan/i.test(i.by) ? `<span class="rem-by">${esc(i.by)}</span>` : ''}<button class="rem-x" data-rem-x="${idx}" title="Remove this note (kept in the archive)" aria-label="Remove">×</button></div>`;
}

// Home widgets sit below the countdown chips, whatever height the chips wrap to, so nothing covers them.
function placeHomeCol() {
  if (!document.body.classList.contains('on-home')) return;
  const chips = $('countdowns'); const col = $('home-right'); const info = $('graph-info');
  if (!chips || !col) return;
  const r = chips.getBoundingClientRect();
  const top = Math.max(20, Math.round((chips.children.length ? r.bottom : 0) + 14));
  col.style.top = top + 'px'; if (info) { info.style.top = top + 'px'; info.style.maxHeight = `calc(100% - ${top + 20}px)`; }
}
