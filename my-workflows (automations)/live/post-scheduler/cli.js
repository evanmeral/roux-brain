#!/usr/bin/env node
// post-scheduler / cli.js — the command line over index.js. Local files only; it never posts.
//
//   node cli.js weeks
//   node cli.js build <week> [--dry-run]            PLAN.md → schedule.json
//   node cli.js preflight <week> [--json] [--quiet] exit 1 on any fail
//   node cli.js status <week> [--json]              the queue, one line per piece
//   node cli.js runnable <week> [--json]            what a scheduling session may take, in order
//   node cli.js show <week> <piece>                 one piece in full (captions as they will post)
//   node cli.js approve <week> <piece|all> --words "<Evan's words>" [--at <ISO>]
//   node cli.js mark <week> <piece> <status> [--note ".."] [--by Evan|ROUX] [--backfill]
//                    [--source ".." --readback ".." [--platform facebook|instagram|both]]
//   node cli.js evidence <week> <piece> --source ".." --readback ".." [--platform ..] [--note ..]
//   node cli.js waive <week> <piece> <rule> --words "<Evan's words>" [--field facebook] [--source ..] [--at YYYY-MM-DD]
//   node cli.js lint [--field facebook|instagram] "<text>"      try the copy rules on any text
//
// <week> is the Monday's date: 2026-09-28.
'use strict';
const ps = require('./index');
const lint = require('./lint');

const argv = process.argv.slice(2);
const flags = {}; const pos = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) { const k = a.slice(2); const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; flags[k] = v; } else pos.push(a);
}
const [cmd, week, pieceId, third] = pos;
const ICON = { pass: '✅', info: '·', warn: '⚠️ ', waived: '🟡', fail: '❌', dropped: '➖' };
const out = (s = '') => process.stdout.write(s + '\n');
const need = (v, what) => { if (!v || v === true) { console.error(`missing ${what}. See the top of cli.js for usage.`); process.exit(2); } return v; };
const evidenceFromFlags = () => (flags.source || flags.readback) ? { source: need(flags.source, '--source'), readBack: need(flags.readback, '--readback'), platform: flags.platform === true ? undefined : flags.platform, note: flags['evidence-note'] === true ? undefined : flags['evidence-note'] } : undefined;

function printPreflight(r, quiet) {
  out(`Preflight · week of ${r.week} · ${r.ranAt}`);
  for (const e of r.referenceErrors) out(`❌ reference: ${e}`);
  for (const p of r.pieces) {
    out(`\n${ICON[p.badge]} ${p.id} · ${p.type} · ${p.status}${p.approved ? ' · approved' : ' · NOT approved'}${p.manualUpload ? ' · EVAN UPLOADS' : ''}${p.runnable ? ' · runnable' : ''}`);
    for (const c of p.checks) { if (quiet && ['pass', 'info'].includes(c.level)) continue; out(`   ${ICON[c.level]} ${c.check}: ${c.message}`); }
  }
  const s = r.summary;
  out(`\n${s.pass} pass · ${s.warn} warn · ${s.fail} fail${s.dropped ? ` · ${s.dropped} dropped` : ''}  →  ${r.ok ? 'OK' : 'NOT CLEAN'}`);
}

try {
  switch (cmd) {
    case 'weeks': {
      for (const w of ps.listWeeks()) out(`${w.id}  ${w.hasManifest ? `${w.pieces} pieces · ${w.approved} approved · ${Object.entries(w.counts).map(([k, v]) => `${v} ${k}`).join(' · ')}` : w.hasPlan ? 'PLAN.md, no schedule.json yet' : 'empty'}${w.error ? `  ❌ ${w.error}` : ''}`);
      break;
    }
    case 'build': {
      const r = ps.buildManifest(need(week, 'week'), { dryRun: !!flags['dry-run'] });
      out(`${r.written ? 'Wrote' : 'Dry run, not written:'} ${r.path}`); r.report.forEach((l) => out(`  ${l}`));
      break;
    }
    case 'preflight': {
      const r = ps.preflight(need(week, 'week'));
      if (flags.json) out(JSON.stringify(r, null, 2)); else printPreflight(r, !!flags.quiet);
      process.exit(r.ok ? 0 : 1);
      break;
    }
    case 'status': {
      const w = ps.getWeek(need(week, 'week'));
      if (flags.json) { out(JSON.stringify(w, null, 2)); break; }
      out(`Week of ${w.week} · ${w.manifestPath}`);
      for (const p of w.pieces) {
        out(`${p.id.padEnd(12)} ${p.status.padEnd(10)} ${p.approved ? 'approved' : '—       '}  ${p.when}  ${p.placements.join('+')}  ${p.media.length} file${p.media.length === 1 ? '' : 's'}${p.scheduledBy ? `  (scheduled by ${p.scheduledBy})` : ''}`);
        const last = p.evidence[p.evidence.length - 1]; if (last) out(`${' '.repeat(13)}read-back: ${last.readBack} — ${last.source}`);
        const h = p.history[p.history.length - 1]; if (p.status === 'failed' && h) out(`${' '.repeat(13)}failed: ${h.note}`);
      }
      break;
    }
    case 'runnable': {
      const wk = need(week, 'week'); const pf = ps.preflight(wk); const w = ps.getWeek(wk);
      const take = pf.pieces.filter((p) => p.runnable).map((p) => w.pieces.find((x) => x.id === p.id));
      const skip = pf.pieces.filter((p) => !p.runnable).map((p) => ({ id: p.id, why: p.badge === 'dropped' ? 'dropped' : !p.approved ? 'not approved' : ['scheduled', 'verified'].includes(p.status) ? `already ${p.status}` : p.status === 'failed' ? 'failed earlier — needs a decision' : p.manualUpload ? 'over 10 MB — Evan uploads' : 'fails preflight' }));
      if (flags.json) { out(JSON.stringify({ week: wk, take: take.map((p) => ({ id: p.id, type: p.type, placements: p.placements, media: p.mediaAbs, caption: p.caption, firstComment: p.firstComment, scheduledFor: p.scheduledFor, notes: p.notes })), skip }, null, 2)); break; }
      out(`Runnable, in order (${take.length}):`); take.forEach((p) => out(`  ${p.id}  ${p.when}  ${p.type}  ${p.media.length} file(s)`));
      out(`Not taken (${skip.length}):`); skip.forEach((s) => out(`  ${s.id}  ${s.why}`));
      break;
    }
    case 'show': {
      const p = ps.getWeek(need(week, 'week')).pieces.find((x) => x.id === need(pieceId, 'piece id'));
      if (!p) throw new Error(`no piece ${pieceId}`);
      out(JSON.stringify(p, null, 2));
      break;
    }
    case 'approve': {
      const wk = need(week, 'week'); const words = need(flags.words, '--words "<what Evan said>"');
      const ids = need(pieceId, 'piece id or "all"') === 'all' ? ps.getWeek(wk).pieces.filter((p) => p.status === 'draft').map((p) => p.id) : [pieceId];
      for (const id of ids) { const r = ps.approve(wk, id, words, { via: 'chat', at: flags.at === true ? undefined : flags.at }); out(`${id}: approved · preflight ${r.preflight.badge}${r.preflight.runnable ? ' · runnable' : ''}`); }
      out('Nothing was scheduled. Approval only marks the manifest.');
      break;
    }
    case 'mark': {
      const p = ps.setStatus(need(week, 'week'), need(pieceId, 'piece id'), need(third, 'status'), { note: flags.note === true ? undefined : flags.note, by: flags.by === true ? undefined : flags.by, backfill: !!flags.backfill, evidence: evidenceFromFlags() });
      out(`${p.id}: ${p.status}`);
      break;
    }
    case 'evidence': {
      const p = ps.addEvidence(need(week, 'week'), need(pieceId, 'piece id'), { ...evidenceFromFlags(), note: flags.note === true ? undefined : flags.note });
      out(`${p.id}: ${p.evidence.length} read-back record(s)`);
      break;
    }
    case 'waive': {
      const p = ps.addWaiver(need(week, 'week'), need(pieceId, 'piece id'), { rule: need(third, 'rule id'), words: need(flags.words, '--words "<what Evan said>"'), field: flags.field === true ? undefined : flags.field, source: flags.source === true ? undefined : flags.source, at: flags.at === true ? undefined : flags.at });
      out(`${p.id}: ${p.waivers.length} waiver(s) on record`);
      break;
    }
    case 'lint': {
      const text = pos.slice(1).join(' '); const f = lint.lintText(text, { field: flags.field === true || !flags.field ? 'facebook' : flags.field });
      if (!f.length) out('✅ nothing found'); f.forEach((x) => out(`${x.severity === 'error' ? '❌' : '⚠️ '} ${x.rule}: “${x.match}”${x.detail ? ` — ${x.detail}` : ''}\n     ${x.source}`));
      process.exit(f.some((x) => x.severity === 'error') ? 1 : 0);
      break;
    }
    default:
      out('post-scheduler — commands: weeks · build · preflight · status · runnable · show · approve · mark · evidence · waive · lint');
      out('Usage is at the top of cli.js and in README.md. Nothing here posts or schedules anything.');
      process.exit(cmd ? 2 : 0);
  }
} catch (e) { console.error(`❌ ${e.message}`); process.exit(1); }
