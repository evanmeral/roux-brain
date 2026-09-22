// ROUX OS — This Month's Plan tab. PLAN.md drawn as a page: the window and goal, a timeline with
// today on it, the targets, this week's jobs, the bets, the Meta caps and the off-plan log.
// Read-only. It shows what the file says; the only thing it works out is where today falls.
'use strict';
let PLANV = null;

async function loadPlan() {
  try { const r = await fetch('/api/plan', { cache: 'no-store' }); PLANV = await r.json(); if (!r.ok) throw new Error(PLANV.error || r.status); }
  catch (e) { PLANV = { error: e.message }; }
  renderPlan();
  if (typeof renderHome === 'function' && typeof STATE !== 'undefined' && STATE) renderHome();
}
function planDay(iso, opts) { return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', ...(opts || { weekday: 'short', month: 'short', day: 'numeric' }) }); }
function planDays(a, b) { return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / 86400000); }

function renderPlan() {
  const box = $('plan-body'); const v = PLANV;
  if (!v) { box.innerHTML = '<div class="p-card empty">Loading the plan…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="p-card bad">${esc(v.error)}</div>`; return; }
  const today = v.today;
  const win = v.window;
  const weekNow = (v.weeks || []).find((w) => w.status === 'current') || null;
  const nextPace = (v.pace && v.pace.rows.find((r) => r.date && r.date >= today)) || null;
  const headline = (v.targets || []).find((t) => t.headline);
  const consumerCol = v.pace ? v.pace.head.findIndex((h) => /consumer/i.test(h)) : -1;
  let html = '';

  // hero
  const left = win ? planDays(today, win.end) : null;
  html += `<section class="p-card p-hero">
    <div>
      <div class="p-h" style="margin-bottom:8px">This month's plan <span class="stamp">PLAN.md · updated ${esc(new Date(v.modified).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }))} · <a href="${esc(v.obsidian)}">open in Obsidian</a></span></div>
      <div class="p-window">${win ? `${esc(planDay(win.start, { month: 'long', day: 'numeric' }))} – ${esc(planDay(win.end, { month: 'long', day: 'numeric', year: 'numeric' }))}` : esc(v.title)}</div>
      <div class="p-goal">${v.goalHtml || ''}</div>
      <div class="p-meta">${(v.headHtml || []).map((h) => `<p>${h}</p>`).join('')}</div>
    </div>
    ${headline ? `<div class="p-headline">
      <div class="lbl">The headline · ${esc(headline.name)}</div>
      <div class="big">${headline.must}</div>
      <div class="sub">must hit · stretch ${headline.stretch} · last year ${headline.lastYear}</div>
      ${nextPace && consumerCol >= 0 ? `<div class="next">Next score <b>${esc(planDay(nextPace.date))}</b>${planDays(today, nextPace.date) === 0 ? ' (today)' : ` (in ${planDays(today, nextPace.date)} day${planDays(today, nextPace.date) === 1 ? '' : 's'})`}: consumer sales must be at <b>${esc(nextPace.cells[consumerCol])}</b> by then.</div>` : ''}
      ${left != null && left >= 0 ? `<div class="sub" style="margin-top:8px">${left} day${left === 1 ? '' : 's'} left in the plan${weekNow ? ` · week ${esc(weekNow.n || '')}` : ''}</div>` : ''}
    </div>` : ''}
  </section>`;

  // timeline
  if (win && v.weeks) {
    const span = planDays(win.start, win.end) + 1;
    const pos = (iso) => Math.max(0, Math.min(100, (planDays(win.start, iso) + 0.5) / span * 100));
    const todayIn = today >= win.start && today <= win.end;
    html += `<section class="p-card"><div class="p-h">Where we are <span class="stamp">click a week to open it below</span></div>
      <div class="tl">
        <div class="tl-bar">${v.weeks.map((w) => w.range ? `<button class="tl-wk is-${w.status}" style="flex:${planDays(w.range.start, w.range.end) + 1}" data-week="${esc(w.label)}"><span>${esc(w.n ? 'Week ' + w.n : w.label.split('·')[0].trim())}</span><small>${esc(planDay(w.range.start, { month: 'short', day: 'numeric' }))} – ${esc(planDay(w.range.end, { month: 'short', day: 'numeric' }))}</small></button>` : '').join('')}</div>
        ${todayIn ? `<div class="tl-today" style="left:${pos(today)}%"><span>TODAY</span></div>` : ''}
        ${v.pace ? (() => { const rows = v.pace.rows.filter((r) => r.date); const low = rows.map((r, i) => i > 0 && pos(r.date) - pos(rows[i - 1].date) < 5); return `<div class="tl-ticks ${low.some(Boolean) ? 'has-low' : ''}">${rows.map((r, i) => `<div class="tl-tick ${r.date < today ? 'is-past' : ''} ${low[i] ? 'is-low' : ''}" style="left:${pos(r.date)}%"><b>${esc(planDay(r.date, { month: 'short', day: 'numeric' }))}</b>${consumerCol >= 0 ? esc(r.cells[consumerCol]) : ''}</div>`).join('')}</div>`; })() : ''}
      </div>
      ${v.pace ? `<div class="p-note">Gold dots are the Thursday scores, with the consumer sales each one must reach. ${v.paceSourceHtml || ''}</div>` : ''}
    </section>`;
  }

  // targets
  if (v.targets) {
    html += `<section class="p-card"><div class="p-h">Targets <span class="stamp">Shopify net sales · same dates last year</span></div>
      <div class="p-targets">${v.targets.map((t) => `<div class="tg ${t.headline ? 'is-headline' : ''}">
        <div class="tg-name">${esc(t.name)}${t.headline ? '<span class="star">headline</span>' : ''}</div>
        <div class="tg-must"><small>Must hit</small>${t.must}</div>
        ${t.stretch && t.stretch !== '—' ? `<div class="tg-str"><small>Stretch</small>${t.stretch}</div>` : ''}
        <div class="tg-ly">Last year: ${t.lastYear}</div>
        <details><summary>What it counts</summary>${t.whatHtml}</details>
      </div>`).join('')}</div>
      ${v.targetsNoteHtml ? `<div class="p-note">${v.targetsNoteHtml}</div>` : ''}
    </section>`;
  }

  // weeks + side column (bets, caps)
  const weekHtml = (v.weeks || []).map((w) => {
    const done = w.jobs.filter((j) => j.state === 'done').length, live = w.jobs.filter((j) => j.state !== 'dropped').length;
    const open = w.status === 'current';
    return `<details class="wk is-${w.status}" data-wk="${esc(w.label)}" ${open ? 'open' : ''}>
      <summary><span>${esc(w.label)}${w.status === 'current' ? '<span class="wk-tag">this week</span>' : ''}</span><span class="wk-prog">${done} of ${live} done</span></summary>
      <div class="wk-body">
        ${w.jobs.map((j) => `<div class="job is-${j.state}"><span class="ck">${j.state === 'done' ? '✓' : j.state === 'dropped' ? '×' : ''}</span><span class="jt">${j.html}</span></div>`).join('')}
        ${w.gates.length ? `<div class="gates">${w.gates.map((g) => `<span class="gate-chip ${g.done ? 'is-done' : ''}"><b>${g.done ? 'passed' : 'gate'}</b>${g.html}</span>`).join('')}</div>` : ''}
      </div></details>`;
  }).join('');

  const capColors = ['#F69329', '#5B9FE6', '#A98BEA', '#34BFB3', '#E77FB6', '#F5C451'];
  let capsHtml = '';
  if (v.caps) {
    const ceiling = v.ceiling || Math.max(...v.caps.cols.map((_, i) => v.caps.rows.reduce((t, r) => t + (r.values[i] ? r.values[i].n : 0), 0)));
    capsHtml = v.caps.cols.map((col, i) => {
      const sum = v.caps.rows.reduce((t, r) => t + (r.values[i] ? r.values[i].n : 0), 0);
      return `<div class="bud-col"><div class="bud-top"><span>${esc(col)}</span><b>${esc(v.caps.totals ? v.caps.totals[i] : '$' + sum)}/day</b></div>
        <div class="bud-bar" title="Ceiling $${ceiling}/day">${v.caps.rows.map((r, k) => r.values[i] && r.values[i].n ? `<i style="width:${r.values[i].n / ceiling * 100}%;background:${capColors[k % capColors.length]}" title="${esc(r.name)}: ${esc(r.values[i].text)}"></i>` : '').join('')}</div></div>`;
    }).join('') + `<div class="bud-legend">${v.caps.rows.map((r, k) => `<div><span class="sw is-box" style="background:${capColors[k % capColors.length]}"></span><span>${esc(r.name)}${r.note ? `<small>${esc(r.note)}</small>` : ''}</span></div>`).join('')}</div>
      <div class="p-note">Full bar = the $${ceiling}/day ceiling. These are caps, not spend targets. Kill and scale rules are on the <a href="#" data-goto="score">Score</a> tab.</div>`;
  }

  html += `<div class="p-cols">
    <section class="p-card"><div class="p-h">Week by week <span class="stamp">✓ done · × dropped · gates in gold</span></div>${weekHtml}${v.weeksNoteHtml ? `<div class="p-note">${v.weeksNoteHtml}</div>` : ''}</section>
    <div style="display:flex;flex-direction:column;gap:22px;min-width:0">
      ${v.bets && v.bets.length ? `<section class="p-card"><div class="p-h">The bets</div><div class="bets">${v.bets.map((b, i) => `<div class="bet"><span class="bet-n">${i + 1}</span><div><div class="bet-h">${b.head}</div>${b.bodyHtml ? `<div class="bet-b">${b.bodyHtml}</div>` : ''}</div></div>`).join('')}</div></section>` : ''}
      ${capsHtml ? `<section class="p-card"><div class="p-h">Meta daily caps</div>${capsHtml}</section>` : ''}
      <section class="p-card"><div class="p-h">Scoreboard</div>${scoreSummary(v)}</section>
      ${v.asksHtml ? `<section class="p-card"><div class="p-h">Needs approval</div><div class="p-asks">${v.asksHtml}</div></section>` : ''}
    </div>
  </div>`;

  if (v.offPlan && v.offPlan.length) html += `<section class="p-card p-off"><details><summary>Off-plan work · ${v.offPlan.length} items Evan asked for that weren't in the plan</summary><ul>${v.offPlan.map((x) => `<li>${x}</li>`).join('')}</ul></details></section>`;

  box.innerHTML = html;
  box.querySelectorAll('[data-week]').forEach((b) => b.addEventListener('click', () => {
    const d = box.querySelector(`details[data-wk="${CSS.escape(b.dataset.week)}"]`);
    if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));
  box.querySelectorAll('[data-goto]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); showTab(a.dataset.goto); }));
}
function scoreSummary(v) {
  if (!v.scoreboard) return '<div class="empty bad">PLAN.md has no scoreboard table I can read.</div>';
  const filled = v.scoreboard.rows.filter((r) => r.filled);
  const next = v.scoreboard.rows.find((r) => r.date && !r.filled && r.date >= v.today);
  if (!filled.length) return `<div class="p-sb-empty">Nothing scored yet. The first score is <b>${next ? esc(planDay(next.date)) : 'the first Thursday'}</b>, filled in by the Thursday 7:00 task.</div><div class="p-note">Full table on the <a href="#" data-goto="score">Score</a> tab.</div>`;
  const last = filled[filled.length - 1];
  return `<div class="p-note" style="margin-top:0">Latest: <b>${esc(last.label)}</b></div><table class="score-table" style="width:100%;margin-top:8px;font-size:14px">${v.scoreboard.head.slice(1).map((h, i) => last.cells[i] ? `<tr><td style="color:var(--muted);padding:6px 8px 6px 0">${esc(h)}</td><td style="padding:6px 0">${last.cells[i]}</td></tr>` : '').join('')}</table>
    ${next ? `<div class="p-note">Next score ${esc(planDay(next.date))}. Full table on the <a href="#" data-goto="score">Score</a> tab.</div>` : ''}`;
}
