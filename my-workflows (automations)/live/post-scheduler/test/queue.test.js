// Queue test: builds a throwaway week in the system temp folder and drives it through the gates.
// Run: node test/queue.test.js     Nothing in the brain is touched; nothing leaves the machine.
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'post-scheduler-test-'));
process.env.POST_SCHEDULER_SOCIAL_DIR = ROOT;            // must be set before index.js loads
const ps = require('../index');

let failed = 0; let ran = 0;
function ok(name, cond, extra) { ran++; if (!cond) failed++; console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${cond || !extra ? '' : `  → ${extra}`}`); }
function refuses(name, fn, re) { let msg = null; try { fn(); } catch (e) { msg = e.message; } ok(name, !!msg && re.test(msg), msg || 'it did not throw'); }

// a Monday at least a week out, so every date is in the future whenever this runs
const d = new Date(Date.now() + 7 * 864e5); while (d.getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() + 1);
const MON = d.toISOString().slice(0, 10);
const day = (n) => { const x = new Date(`${MON}T12:00:00Z`); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const DIR = path.join(ROOT, `${MON}-week`); fs.mkdirSync(DIR);

// the smallest file the size reader accepts: PNG signature + an IHDR chunk header
function png(name, w, h, pad = 0) {
  const b = Buffer.alloc(24 + pad); b.writeUInt32BE(0x89504e47, 0); b.writeUInt32BE(0x0d0a1a0a, 4); b.writeUInt32BE(13, 8); b.write('IHDR', 12, 'ascii'); b.writeUInt32BE(w, 16); b.writeUInt32BE(h, 20);
  fs.writeFileSync(path.join(DIR, name), b);
}
png('01.png', 1080, 1350); png('02.png', 1080, 1350); png('03-square.png', 1080, 1080); png('04-big.png', 1080, 1350, 10_200_000); png('06.png', 1080, 1920);

const TAGS = '#louisiana #tailgate #gameday #fishfry #outdoorcooking';
const section = (n, title, block, fb, ig) => `### ${n} · ${title}\n\`\`\`schedule\n${JSON.stringify(block)}\n\`\`\`\n${fb == null ? '' : `**Caption — Facebook**\n\`\`\`\n${fb}\n\`\`\`\n**Caption — Instagram**\n\`\`\`\n${ig}\n\`\`\`\n`}\n`;
const both = ['facebook', 'instagram'];
const plan = (mondayFb) => `# Content week — test\n\n## Previews\n\n`
  + section(1, 'Mon · Boil Math Monday', { id: '1-feed', type: 'feed', placements: both, date: MON, time: '12:00', media: ['01.png'] }, mondayFb, `Boil Math Monday.\n\nTight. ${TAGS}`)
  + section(2, 'Tue · Shop Floor Tuesday', { id: '2-feed', type: 'feed', placements: both, date: day(1), time: '17:30', media: ['02.png'] }, 'Shop Floor Tuesday.\n\nProudly made in the USA.', `Shop Floor Tuesday.\n\nClean. ${TAGS}`)
  + section(3, 'Wed · How-To Wednesday', { id: '3-feed', type: 'feed', placements: both, date: day(2), time: '12:00', media: ['03-square.png'] }, 'How-To Wednesday.\n\nClean.', `How-To Wednesday.\n\nClean. ${TAGS}`)
  + section(4, 'Thu · Word of Mouth Thursday', { id: '4-feed', type: 'feed', placements: both, date: day(3), time: '17:30', media: ['04-big.png'] }, 'Word of Mouth Thursday.\n\nClean.', `Word of Mouth Thursday.\n\nClean. ${TAGS}`)
  + section(5, 'Fri · Friday Fire', { id: '5-feed', type: 'feed', placements: both, date: day(3), time: '17:30', media: ['01.png'] }, 'Friday Fire.\n\nClean.', `Friday Fire.\n\nClean. ${TAGS}`)
  + section(6, 'Sat · Game Day', { id: '6-story', type: 'story', placements: both, date: day(5), time: '09:00', media: ['06.png'] }, null)
  + `## Needs from Evan\n`;
fs.writeFileSync(path.join(DIR, 'PLAN.md'), plan('Boil Math Monday.\n\nA clean caption about 4mm aluminum.'));

// ---- build
const built = ps.buildManifest(MON);
ok('build: six pieces, all draft and unapproved', built.manifest.pieces.length === 6 && built.manifest.pieces.every((p) => p.status === 'draft' && p.approved === false));
ok('build: stories carry no caption', built.manifest.pieces.find((p) => p.id === '6-story').caption === null);
ok('listWeeks sees the week', ps.listWeeks().some((w) => w.id === MON && w.hasManifest && w.pieces === 6));

// ---- preflight finds what is wrong, and only that
const pf = () => ps.preflight(MON); const piece = (r, id) => r.pieces.find((p) => p.id === id);
const has = (r, id, check, level) => piece(r, id).checks.some((c) => c.check === check && c.level === level);
let r = pf();
ok('preflight: clean piece passes', piece(r, '1-feed').badge === 'pass');
ok('preflight: "made in the USA" fails the lint', has(r, '2-feed', 'lint', 'fail'));
ok('preflight: a 1080×1080 feed post fails dimensions', has(r, '3-feed', 'dimensions', 'fail'));
ok('preflight: over 10 MB is flagged for Evan to upload', piece(r, '4-feed').manualUpload === true && has(r, '4-feed', 'upload-size', 'warn'));
ok('preflight: two feed posts at the same time clash', has(r, '4-feed', 'clash', 'fail') && has(r, '5-feed', 'clash', 'fail'));
ok('preflight: slot 5 on a Thursday is the wrong day', has(r, '5-feed', 'slot', 'fail'));
ok('preflight: story passes', piece(r, '6-story').badge === 'pass');
ok('preflight: not ok overall, nothing runnable while unapproved', r.ok === false && r.pieces.every((p) => !p.runnable));
ok('preflight: a past date fails', has(ps.preflight(MON, { now: new Date(Date.now() + 60 * 864e5) }), '1-feed', 'date', 'fail'));

// ---- the gates
refuses('REFUSES to queue an unapproved piece', () => ps.setStatus(MON, '1-feed', 'queued'), /REFUSED.*not approved/);
refuses('REFUSES to mark an unapproved piece scheduled', () => ps.setStatus(MON, '1-feed', 'scheduled', { by: 'Evan' }), /cannot go to scheduled|REFUSED/);
refuses('setStatus cannot approve (approval needs Evan\'s words)', () => ps.setStatus(MON, '1-feed', 'approved'), /use approve/);
refuses('approve from chat needs his words', () => ps.approve(MON, '1-feed', '', { via: 'chat' }), /Evan's words/);
const a = ps.approve(MON, '1-feed', 'approved', { via: 'chat' });
ok('approve marks the manifest and schedules nothing', a.piece.approved && a.piece.status === 'approved' && a.piece.evidence.length === 0 && a.preflight.runnable === true);
ok('approve from the OS button works with no note', ps.approve(MON, '6-story', '').piece.approval.via === 'os');
ps.approve(MON, '2-feed', 'approved', { via: 'chat' });
refuses('REFUSES to queue an approved piece that fails the copy rules', () => ps.setStatus(MON, '2-feed', 'queued'), /REFUSED.*preflight/s);
ps.approve(MON, '4-feed', 'approved', { via: 'chat' });
refuses('REFUSES to queue a piece over 10 MB or failing', () => ps.setStatus(MON, '4-feed', 'queued'), /REFUSED/);
refuses('REFUSES scheduled before queued (unless Evan did it by hand)', () => ps.setStatus(MON, '1-feed', 'scheduled'), /never queued/);
ok('approved + clean → queued', ps.setStatus(MON, '1-feed', 'queued').status === 'queued');
ok('queued → scheduled', ps.setStatus(MON, '1-feed', 'scheduled', { note: 'composer said: Your post is scheduled' }).status === 'scheduled');
refuses('REFUSES verified without read-back evidence', () => ps.setStatus(MON, '1-feed', 'verified'), /read-back/);
ps.addEvidence(MON, '1-feed', { source: 'Content → Scheduled', platform: 'facebook', readBack: 'Mon 12:00 PM' });
refuses('REFUSES verified with evidence for only one platform', () => ps.setStatus(MON, '1-feed', 'verified'), /instagram/);
ok('verified once both platforms are read back', ps.setStatus(MON, '1-feed', 'verified', { evidence: { source: 'Content → Scheduled', platform: 'instagram', readBack: 'Mon 12:00 PM' } }).status === 'verified');
refuses('failed needs a reason', () => ps.setStatus(MON, '6-story', 'failed'), /needs a note/);
ok('failed with a reason', ps.setStatus(MON, '6-story', 'failed', { note: 'date picker failed twice' }).status === 'failed');
ok('a failed piece is not runnable', piece(pf(), '6-story').runnable === false);

// ---- an approval covers the content it was given for
ps.approve(MON, '5-feed', 'approved', { via: 'chat' });
png('01.png', 1080, 1350, 7);                                    // same name, different bytes
ok('file swapped after approval → preflight fails the approval', has(pf(), '5-feed', 'approval', 'fail'));
png('01.png', 1080, 1350);
ps.approve(MON, '3-feed', 'approved', { via: 'chat' });
fs.writeFileSync(path.join(DIR, 'PLAN.md'), plan('Boil Math Monday.\n\nA DIFFERENT caption.').replace('How-To Wednesday.\n\nClean.', 'How-To Wednesday.\n\nChanged after approval.'));
const rebuilt = ps.buildManifest(MON);
const p3 = rebuilt.manifest.pieces.find((p) => p.id === '3-feed'); const p1 = rebuilt.manifest.pieces.find((p) => p.id === '1-feed');
ok('caption changed after approval → rebuild sends it back to draft, unapproved', p3.status === 'draft' && p3.approved === false && p3.approval === null);
ok('a verified piece is locked: rebuild leaves it alone and says so', p1.status === 'verified' && /A clean caption/.test(p1.caption.facebook) && rebuilt.report.some((l) => /1-feed.*LOCKED/.test(l)));
refuses('media path cannot escape the week folder', () => ps.mediaPath(MON, '../../etc/passwd'), /escapes/);

// ---- Layer 1 makes no network call: scan the source
const NET = /require\(\s*['"](?:node:)?(?:http|https|http2|net|tls|dgram|dns|child_process|worker_threads)['"]\s*\)|\bfetch\s*\(|XMLHttpRequest|WebSocket|\bimport\s*\(/;
for (const f of ['index.js', 'lint.js', 'media.js', 'cli.js']) {
  const src = fs.readFileSync(path.join(__dirname, '..', f), 'utf8').split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
  ok(`no network or subprocess code in ${f}`, !NET.test(src), (src.match(NET) || [])[0]);
}

console.log(`\n${ran - failed}/${ran} passed   (fixture left in ${ROOT})`);
process.exit(failed ? 1 : 0);
