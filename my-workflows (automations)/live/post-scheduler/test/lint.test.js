// Linter test: one deliberately bad caption per rule, plus clean captions that must pass.
// Run: node test/lint.test.js     (exit 1 on any failure). No network, no files written.
'use strict';
const { lintText, lintPiece } = require('../lint');

let failed = 0; let ran = 0;
const rulesHit = (text, field) => lintText(text, { field: field || 'facebook' });
function expectHit(name, text, rule, severity, field) {
  ran++; const f = rulesHit(text, field).filter((x) => x.rule === rule);
  const ok = f.length > 0 && f.every((x) => x.severity === severity);
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} catches ${rule} (${severity}) — ${name}${ok ? '' : `  → got ${JSON.stringify(rulesHit(text, field).map((x) => x.rule))}`}`);
}
function expectClean(name, text, field, allow = []) {
  ran++; const f = rulesHit(text, field).filter((x) => !allow.includes(x.rule));
  if (f.length) failed++;
  console.log(`${f.length ? 'FAIL' : 'ok  '} clean — ${name}${f.length ? `  → ${JSON.stringify(f.map((x) => [x.rule, x.match]))}` : ''}`);
}
function expectNo(name, text, rule, field) {
  ran++; const f = rulesHit(text, field).filter((x) => x.rule === rule);
  if (f.length) failed++;
  console.log(`${f.length ? 'FAIL' : 'ok  '} no ${rule} — ${name}${f.length ? `  → “${f[0].match}”` : ''}`);
}

// ---- each rule, caught
expectHit('patent-pending', 'Our patent-pending tunnel tubes spread the flame.', 'patent-pending', 'error');
expectHit('patent pending, two words', 'Patent Pending design.', 'patent-pending', 'error');
expectHit('patent number written out', 'Built in Covington. Patent No. 11,844,459.', 'patent-number', 'warn');
expectHit('patent number, bare digits', 'US 11844459 B2', 'patent-number', 'warn');
expectHit('Made in USA', 'Proudly made in the USA.', 'made-in-usa', 'error');
expectHit('Made in America', 'Made in America by a krewe of twelve.', 'made-in-usa', 'error');
expectHit('#madeinusa on IG', 'Boil Math Monday.\n\n#louisiana #MadeInUSA', 'made-in-usa', 'error', 'instagram');
expectHit('American-made', 'An American-made pot.', 'american-made', 'warn');
expectHit('we make the pots', 'We make the pots right here.', 'we-make-the-pots', 'error');
expectHit('cast aluminum', 'Heavy cast aluminum that lasts.', 'cast-aluminum', 'error');
expectHit('cast-aluminum hyphen', 'A cast-aluminium pot.', 'cast-aluminum', 'error');
expectHit('the word cast alone', 'The burner has a cast part.', 'cast-word', 'warn');
expectHit('competitor by name', 'Twice as fast as a Bayou Classic.', 'competitor-name', 'error');
expectHit('competitor as a hashtag', 'Friday Fire.\n#bayouclassic #louisiana', 'competitor-name', 'error', 'instagram');
expectHit('competitor, common spelling', 'Better than a King Kooker.', 'competitor-name', 'error');
expectHit('Yeti', "It's the Yeti of boil pots.", 'yeti', 'error');
expectHit('5-year, no qualifiers', 'Backed by a 5-year warranty.', 'warranty-5yr', 'error');
expectHit('5-year, residential only', 'A 5-year residential warranty on every pot.', 'warranty-5yr', 'error');
expectHit('five year, size only', 'Five year warranty on pots 120 QT or smaller.', 'warranty-5yr', 'error');
expectHit('5-year on a steamer', 'The steamer carries a limited 5-year residential warranty, 120 QT or smaller.', 'warranty-5yr', 'error');
expectHit('5-year on commercial', 'Our 100 gallon commercial boiler: 5 year warranty, residential, 120 QT or smaller.', 'warranty-5yr', 'error');
expectHit('crew for our people', 'A crew of about twelve welds every pot.', 'krewe', 'warn');
expectHit('hashtag on Facebook', 'Boil Math Monday.\n\nFast. #louisiana', 'hashtag-on-facebook', 'error', 'facebook');
expectHit('price not on file', 'Yours today for $123,456.', 'price-not-on-file', 'error');
expectHit('any price is listed', 'The kit starts from $404.', 'price', 'warn');
expectHit('hard boil', 'A hard boil in minutes.', 'hard-boil', 'error');
expectHit('[IF KIT LIVE] left in', '[IF KIT LIVE] The kit is live today.', 'placeholder', 'error');
expectHit('template brace left in', 'Boil Math Monday.\n\n{FB caption}', 'placeholder', 'error');
expectHit('fryer next to crawfish', 'Fry your crawfish in the 18 QT fryer.', 'fryer-with-crawfish', 'warn');
expectHit('flat number', 'A rolling boil in 7 minutes.', 'unqualified-number', 'warn');
expectHit('160 QT in consumer copy', 'From 18 QT to 160 QT.', '160qt-consumer', 'warn');
expectHit('link in bio on Facebook', 'The kit is live. Link in bio.', 'link-in-bio-on-facebook', 'warn', 'facebook');
expectHit('too few hashtags', 'Friday Fire.\n\n#louisiana #tailgate', 'hashtag-count', 'warn', 'instagram');
expectHit('hashtag outside the bank', 'Friday Fire.\n\n#louisiana #tailgate #gameday #fishfry #outdoorcooking #yolo', 'hashtag-count', 'warn', 'instagram');

// ---- the rules must NOT fire on allowed wording
expectNo('camera crew stays crew', 'We had a camera crew in the shop this week.', 'krewe');
expectNo('film crew stays crew', "Garrett's film crew caught it all.", 'krewe');
expectNo('krewe', 'A krewe of about twelve.', 'krewe');
expectNo('Built in the USA is allowed (Jay, 2026-09-11)', 'Built in the USA. Hand-welded in Louisiana.', 'made-in-usa');
expectNo('both warranty qualifiers present', 'Limited 5-year warranty on residential pots 120 QT or smaller.', 'warranty-5yr');
expectNo('2-year warranty', 'Full 2-year warranty on everything we build.', 'warranty-5yr');
expectNo('the word patented', 'Patented tunnel tubes.', 'patent-number');
expectNo('a price that is on file', 'From $404.', 'price-not-on-file');
expectNo('hashtags are fine on Instagram', 'Friday Fire.\n\n#louisiana', 'hashtag-on-facebook', 'instagram');
expectNo('an order number is not a hashtag', 'Order #17482 shipped.', 'hashtag-on-facebook', 'facebook');
expectNo('qualified numbers', 'A rolling boil in about 7 minutes, up to 75% less propane, 350° in under 5 minutes.', 'unqualified-number');
expectNo('a customer quote is not our claim', '"I put it together within 10 minutes." — Kendall', 'unqualified-number');
expectNo('broadcast is not cast', 'The game is broadcast at 6:45.', 'cast-word');

// ---- whole clean captions
expectClean('clean Facebook caption',
  "Boil Math Monday.\n\nOne number today: 4mm.\n\nThat's how thick the aluminum is on every pot we build. Thin pots warp. Ours are 4mm, with the tunnel tubes hand-welded across the bottom here in Louisiana.", 'facebook');
expectClean('clean Instagram caption',
  'Boil Math Monday.\n\n4mm aluminum on every pot we build. 🔥\n\n#louisiana #seafoodboil #outdoorcooking #builtinlouisiana #cajuncooking #highperformancecookers', 'instagram');

// ---- lintPiece reads every text field, including first comments and graphic text
ran++;
const pf = lintPiece({ caption: { facebook: 'Clean.', instagram: 'Clean. #louisiana #tailgate #gameday #fishfry #outdoorcooking' }, firstComment: { instagram: 'Made in USA' }, graphicText: ['PATENT PENDING'] });
const got = pf.map((x) => `${x.field}:${x.rule}`).sort().join(' ');
const want = 'firstComment.instagram:made-in-usa graphic:patent-pending';
if (got !== want) failed++;
console.log(`${got === want ? 'ok  ' : 'FAIL'} lintPiece covers first comment + graphic text  → ${got}`);

console.log(`\n${ran - failed}/${ran} passed`);
process.exit(failed ? 1 : 0);
