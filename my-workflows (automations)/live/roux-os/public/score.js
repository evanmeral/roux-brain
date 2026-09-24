// ROUX OS — Score tab. Read-only. The plan's pace line and scoreboard as PLAN.md holds them, the kill
// rules as written, and the latest kill-line read if the Thursday task has dropped one in.
// It shows what the files say. It never works out a figure or a status of its own.
'use strict';
let SCORE = null;

async function loadScore() {
  try { const r = await fetch('/api/score', { cache: 'no-store' }); SCORE = await r.json(); if (!r.ok) throw new Error(SCORE.error || r.status); }
  catch (e) { SCORE = { error: e.message }; }
  renderScore();
}
function renderScore() {
  const box = $('score-body'); const v = SCORE;
  if (!v) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="board-sec is-wide bad">${esc(v.error)}</div>`; return; }
  const day = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
  let html = `<div class="board-sec is-wide"><span class="eyebrow">${esc(v.planTitle || 'The plan')}</span><span class="mono stamp">read from PLAN.md · the page shows what the file says and works nothing out · <a href="${esc(obsidian('my-desk (now)/PLAN.md'))}">open in Obsidian</a></span></div>`;

  // pace line beside the scoreboard, one row per Thursday
  if (v.pace && v.scoreboard) {
    const next = v.nextScore;
    const banner = !v.anyScore && next ? `<div class="score-first">First score ${esc(day(next.date))}${next.daysOut === 0 ? ', today' : `, in ${next.daysOut} day${next.daysOut === 1 ? '' : 's'}`}. Nothing is filled in yet, so nothing is shown.</div>` : next ? `<div class="mono stamp">next score ${esc(day(next.date))}</div>` : '';
    const sbByDate = {}; for (const r of v.scoreboard.rows) if (r.date) sbByDate[r.date] = r;
    const sbHead = v.scoreboard.head.slice(1);
    const rows = v.pace.rows.map((p) => {
      const sb = p.date && sbByDate[p.date];
      const isNext = next && p.date === next.date;
      return `<tr class="${isNext ? 'is-next' : ''} ${p.date && p.date < v.today && !(sb && sb.filled) ? 'dim' : ''}"><td><strong>${esc(p.label)}</strong></td>${p.cells.map((c) => `<td class="num">${esc(c)}</td>`).join('')}${sbHead.map((_, i) => `<td>${sb && sb.cells[i] ? sb.cells[i] : ''}</td>`).join('')}</tr>`;
    }).join('');
    const extra = v.scoreboard.rows.filter((r) => !r.date || !v.pace.rows.some((p) => p.date === r.date));
    html += `<div class="board-sec is-wide"><span class="eyebrow">Scoreboard vs the pace line</span>${banner}
      <div class="score-wrap"><table class="score-table"><thead><tr><th>Thursday</th>${v.pace.head.slice(1).map((h) => `<th class="num">must hit<br>${esc(h)}</th>`).join('')}${sbHead.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows}
      ${extra.map((r) => `<tr><td><strong>${esc(r.label)}</strong></td>${v.pace.head.slice(1).map(() => '<td></td>').join('')}${r.cells.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      ${v.paceSource ? `<div class="dr-src">${v.paceSource}</div>` : ''}</div>`;
  } else html += `<div class="board-sec is-wide bad">PLAN.md has no ${v.pace ? 'Scoreboard' : 'Pace line'} table I can read.</div>`;

  // kill lines: the latest read (drop-in) and the rules as written
  // Status comes from the file as written; the page only sorts and colours it.
  const k = v.killRead || {};
  const stKey = (st) => { const t = (st || '').toLowerCase(); return /fired|over|kill/.test(t) ? 'fired' : /near|close|watch/.test(t) ? 'near' : /^(ok|under|fine)/.test(t) ? 'ok' : 'unread'; };
  const stLabel = { fired: 'Fired', near: 'Near', ok: 'OK', unread: 'Not read' };
  const order = { fired: 0, near: 1, unread: 2, ok: 3 };
  let killHtml;
  if (k.error) killHtml = `<div class="bad">${esc(k.error)}</div>`;
  else if (!k.present) killHtml = `<div class="empty">No kill-line read on file yet. The Thursday 7:00 scoring task writes <code>my-desk (now)/pulse/kill-lines.json</code>; it shows here with its source and date.</div>`;
  else {
    const rows = k.rows.map((r) => ({ ...r, key: stKey(r.status) })).sort((a, b) => order[a.key] - order[b.key]);
    const n = (key) => rows.filter((r) => r.key === key).length;
    const age = k.ageDays == null ? '' : k.ageDays === 0 ? 'today' : `${k.ageDays} day${k.ageDays === 1 ? '' : 's'} ago`;
    killHtml = `<div class="mono stamp ${k.ageDays > 7 ? 'warn' : ''}">read ${esc(k.read_at)}${age ? ` (${esc(age)})` : ''} · ${esc(k.window)} · ${esc(k.source)}</div>
      <div class="kill-sum">${['fired', 'near', 'ok', 'unread'].filter((x) => n(x)).map((x) => `<span class="pill is-kill-${x}">${n(x)} ${stLabel[x]}</span>`).join(' ')}</div>
      <div class="score-wrap"><table class="kill-table"><thead><tr><th>Status</th><th>Ad</th><th>Rule</th><th class="num">Spend</th><th class="num">Meta buys</th><th class="num">Tagged</th><th>Reads</th><th>Kill at</th><th>Note</th></tr></thead><tbody>${rows.map((r) => `<tr class="is-kill-${r.key}">
        <td><span class="pill is-kill-${r.key}">${esc(stLabel[r.key])}</span></td>
        <td><strong>${esc(r.name)}</strong>${r.campaign ? `<br><span class="dim">${esc(r.campaign)}</span>` : ''}${r.id ? `<br><span class="dim mono">${esc(r.id)}</span>` : ''}</td>
        <td>${esc(r.rule)}</td><td class="num">${esc(r.spend)}</td><td class="num">${esc(r.meta_purchases)}</td><td class="num">${esc(r.tagged)}</td>
        <td>${r.metric ? `<span class="dim">${esc(r.metric)}</span><br>` : ''}${esc(r.value)}</td><td>${esc(r.kill_at)}</td><td class="kill-note">${esc(r.note)}</td></tr>`).join('')}</tbody></table></div>
      <div class="dr-src">A fired line is a recommendation for Evan's click. Nothing on this page pauses an ad.</div>`;
  }
  html += `<div class="board-sec is-wide"><span class="eyebrow">Kill lines, latest read</span>${killHtml}</div>`;
  html += `<div class="board-sec"><span class="eyebrow">Kill and scale rules, as the plan states them</span>${v.killRules ? `<table><thead><tr>${v.killRules.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${v.killRules.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '<div class="empty bad">PLAN.md has no kill-rule table I can read.</div>'}</div>`;
  box.innerHTML = html;
}
