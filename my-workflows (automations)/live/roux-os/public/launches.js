// ROUX OS — Launches tab. Each launch with its countdown, gates, owners and tick boxes.
// A tick goes to the server, which flips the checkbox in launches.md and adds a line to capture.md.
'use strict';
let LAUNCHES = null;

async function loadLaunches() {
  try { const r = await fetch('/api/launches', { cache: 'no-store' }); LAUNCHES = await r.json(); if (!r.ok) throw new Error(LAUNCHES.error || r.status); }
  catch (e) { LAUNCHES = { error: e.message, launches: [] }; }
  renderLaunches();
}
function countdownText(days) { return days == null ? 'no date' : days === 0 ? 'today' : days > 0 ? `${days} day${days === 1 ? '' : 's'}` : `${-days} day${days === -1 ? '' : 's'} ago`; }
function launchDate(iso) { const d = new Date(iso + 'T12:00:00Z'); return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }); }

function renderLaunches() {
  const box = $('launches-body'); const v = LAUNCHES;
  if (!v) { box.innerHTML = '<div class="empty">Loading…</div>'; return; }
  if (v.error) { box.innerHTML = `<div class="board-sec is-wide bad">${esc(v.error)}</div>`; return; }
  if (!v.launches.length) { box.innerHTML = '<div class="board-sec is-wide empty">No launches in launches.md.</div>'; return; }
  const sorted = [...v.launches].sort((a, b) => (a.daysOut == null) - (b.daysOut == null) || (a.daysOut < 0) - (b.daysOut < 0) || a.daysOut - b.daysOut);
  box.innerHTML = `<div class="board-sec is-wide"><span class="eyebrow">Launch checklist</span><span class="mono stamp">every gate comes from the plan or the board, source on hover · a tick writes launches.md and tells the next session · <a href="${esc(obsidian('my-desk (now)/launches.md'))}">open in Obsidian</a></span></div>`
    + sorted.map((l) => {
      const cls = l.daysOut == null ? '' : l.daysOut < 0 ? 'is-past' : l.daysOut <= 2 ? 'is-urgent' : l.daysOut <= 7 ? 'is-soon' : '';
      const done = l.gates.length - l.open;
      return `<div class="board-sec launch ${l.daysOut != null && l.daysOut < 0 ? 'is-past' : ''}">
        <div class="launch-head"><div><div class="launch-title">${esc(l.title)}</div><div class="mono stamp">${l.date ? esc(launchDate(l.date)) : 'no date in the file'} · ${done} of ${l.gates.length} gates done</div></div><span class="chip ${cls}">${esc(countdownText(l.daysOut))}</span></div>
        <div class="bar"><i style="width:${l.gates.length ? Math.round((done / l.gates.length) * 100) : 0}%"></i></div>
        ${l.noteHtml ? `<div class="launch-note">${l.noteHtml}</div>` : ''}
        ${l.gates.map((g) => `<label class="gate ${g.done ? 'is-done' : ''} ${g.overdue ? 'is-overdue' : ''}" title="${esc(g.source ? 'Source: ' + g.source : 'No source on this line')}">
          <input type="checkbox" data-line="${g.line}" ${g.done ? 'checked' : ''}>
          <span class="gate-text">${g.textHtml}</span>
          ${g.owner ? `<span class="owner ${/^evan$/i.test(g.owner) ? 'is-evan' : ''}">${esc(g.owner)}</span>` : ''}
          <span class="gate-due">${g.done ? (g.doneOn ? 'done ' + esc(launchDate(g.doneOn)) : 'done') : g.due ? (g.overdue ? 'was due ' : 'due ') + esc(launchDate(g.due)) : ''}</span></label>`).join('') || '<div class="empty">No gates listed.</div>'}
      </div>`;
    }).join('');
  box.querySelectorAll('input[data-line]').forEach((cb) => cb.addEventListener('change', async () => {
    const line = Number(cb.dataset.line); const gate = v.launches.flatMap((l) => l.gates).find((g) => g.line === line);
    cb.disabled = true;
    const j = await postJson('/api/launches/tick', { line, raw: gate.raw, done: cb.checked });
    if (j) toast(cb.checked ? 'Ticked. launches.md is updated and the next wrap hears about it.' : 'Unticked. The next session is told it is not done after all.');
    await loadLaunches(); loadState().catch(() => {});
  }));
}
