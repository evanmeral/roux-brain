// post-scheduler / lint.js — the copy-rule linter for organic captions.
//
// Every rule below is taken from a rule file in the brain, and carries that file's wording in
// `source`. If a rule changes, change it THERE first, then here. Files the rules come from:
//   my-business (context)/hpc-standing-rules.md   ("Non-negotiables in every piece of copy")
//   my-desk (now)/BOARD.md                        ("Landmines — do not ship these")
//   my-business (context)/how-we-sound.md         (krewe, Yeti)
//   my-skills/content-week/weekly-format.md       (rule 5 hashtags, "Before anything ships")
//   SAFETY.md                                     (warranty qualifiers)
//
// Severity: 'error' blocks a piece from being scheduled. 'warn' is for a human to look at.
// The linter reads WORDS. It cannot see type set on a graphic unless the manifest carries it in
// `graphicText`. It never fixes copy: that is Sage's lane. No network, no dependencies.
'use strict';
const fs = require('fs');
const path = require('path');

const VAULT = path.resolve(__dirname, '../../..');
const PRICE_FILE = path.join(VAULT, 'my-business (context)/what-we-sell.md');
const COMPETITOR_FILE = path.join(VAULT, 'my-files (knowledge)/hpc-reference/competitors.md');
const FORMAT_FILE = path.join(VAULT, 'my-skills/content-week/weekly-format.md');

// ---------- reference data, read from the brain so there is one copy ----------

const PRICE_RE = /\$\s?\d[\d,]*(?:\.\d{1,2})?/g;
const normPrice = (s) => {
  let n = s.replace(/[$\s,]/g, '');
  if (/\.\d$/.test(n)) n += '0';
  return n.replace(/\.00$/, '');
};

function pricesOnFile() {
  try {
    const t = fs.readFileSync(PRICE_FILE, 'utf8');
    return { set: new Set((t.match(PRICE_RE) || []).map(normPrice)), error: null };
  } catch (e) { return { set: new Set(), error: `cannot read what-we-sell.md: ${e.message}` }; }
}

// Competitor names = the bold first column of the table in competitors.md, plus spellings people
// actually use. "Yeti" is its own rule (how-we-sound.md).
const COMPETITOR_ALIASES = ['King Kooker', 'Loco Cookers'];
function competitorNames() {
  const names = new Set(COMPETITOR_ALIASES);
  let error = null;
  try {
    const all = fs.readFileSync(COMPETITOR_FILE, 'utf8');
    // Only the "## The field" table names competitors. The "Why HPC wins" table below it has bold
    // first cells too (Speed, Fuel, Material, Warranty ...) and reading those flagged every
    // "warranty" as a competitor name (found by rubric-check, 2026-09-22).
    const i = all.indexOf('## The field');
    if (i < 0) throw new Error('no "## The field" section');
    const j = all.indexOf('\n## ', i + 1);
    const t = all.slice(i, j < 0 ? undefined : j);
    for (const m of t.matchAll(/^\|\s*\*\*([^*|]+)\*\*\s*\|/gm)) names.add(m[1].trim());
  } catch (e) { error = `cannot read competitors.md: ${e.message}`; }
  return { names: [...names], error };
}

// The Instagram hashtag bank, weekly-format.md rule 5.
function hashtagBank() {
  try {
    const t = fs.readFileSync(FORMAT_FILE, 'utf8');
    const i = t.indexOf('Hashtags, IG only');
    if (i < 0) return { set: null, error: 'hashtag bank not found in weekly-format.md' };
    const block = t.slice(i, t.indexOf('⛔', i));
    return { set: new Set((block.match(/#\w+/g) || []).map((h) => h.toLowerCase())), error: null };
  } catch (e) { return { set: null, error: `cannot read weekly-format.md: ${e.message}` }; }
}

// ---------- helpers ----------

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const around = (text, idx, len) => text.slice(Math.max(0, idx - 30), idx + len + 30).replace(/\s+/g, ' ').trim();
// Blank out quoted spans (a customer's verbatim words) keeping string length, for the rules that
// only police OUR words. Straight and curly double quotes.
const maskQuotes = (t) => t.replace(/"[^"\n]*"|“[^”\n]*”/g, (m) => ' '.repeat(m.length));

function each(re, text, fn) {
  const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  let m; while ((m = r.exec(text))) { fn(m); if (m[0] === '') r.lastIndex++; }
}

// ---------- the rules ----------
// ctx = { field: 'facebook' | 'instagram' | 'graphic'  (whose rules apply),
//         label: what the report calls it, e.g. 'firstComment.instagram',  commercial: bool }
// Each rule returns an array of { match, detail? }.

const RULES = [
  {
    id: 'patent-pending', severity: 'error',
    source: 'BOARD.md Landmines: ⛔ Never "patent-pending." The patent is granted.',
    run: (t) => hits(/patent[\s-]*pending/i, t),
  },
  {
    id: 'patent-number', severity: 'warn',
    source: 'Creative rule 10: prefer the HPC shield logo to a written patent number (a preference, not a hard no, Evan 2026-09-22).',
    // one pattern, so "Patent No. 11,844,459" is one finding, not two
    run: (t) => hits(/(?:patent\s*(?:no\.?|number|num\.?|#)\s*)?11[\s,.]?844[\s,.]?459|patent\s*(?:no\.?|number|num\.?|#)\s*\d[\d,.]*/i, t),
  },
  {
    id: 'made-in-usa', severity: 'error',
    source: 'hpc-standing-rules.md: ⛔ No "Made in USA" claim until pot manufacturing is in-house. Use "Built in Louisiana," "Hand-welded in Louisiana" or "Built in the USA". weekly-format.md rule 5: Never #madeinusa.',
    run: (t) => [
      ...hits(/made\s+in\s+(?:the\s+)?(?:u\.?\s?s\.?\s?a\.?|u\.s\.|us\b|united\s+states|america)/i, t),
      ...hits(/#(?:madeinusa|madeintheusa|madeinamerica|americanmade|usamade)\b/i, t),
    ],
  },
  {
    id: 'american-made', severity: 'warn',
    source: 'hpc-standing-rules.md: same "Made in USA" claim in other words. A human checks it. Allowed: "Built in Louisiana", "Hand-welded in Louisiana", "Built in the USA".',
    run: (t) => hits(/american[\s-]+made|usa[\s-]+made/i, t),
  },
  {
    id: 'we-make-the-pots', severity: 'error',
    source: 'hpc-standing-rules.md: Never "we make the pots." The base pot is bought in; we weld, fit and finish it in Covington.',
    run: (t) => hits(/\bwe\s+(?:make|manufacture)\s+(?:the|our|every|all\s+our)\s+pots?\b/i, t),
  },
  {
    id: 'cast-aluminum', severity: 'error',
    source: 'hpc-standing-rules.md: ⛔ Pots are 4mm aluminum, never "cast."',
    run: (t) => hits(/\b(?:die[\s-]?)?cast[\s-]+(?:alumin(?:i)?um|pots?|cookers?|fryers?)\b/i, t),
  },
  {
    id: 'cast-word', severity: 'warn',
    source: 'hpc-standing-rules.md: never "cast" for a pot. The only cast part is a piece on the Triple Jet burner. The word appeared; a human checks what it describes.',
    run: (t) => hits(/\b(?:die[\s-]?)?cast\b(?![\s-]+(?:alumin|pots?\b|cookers?\b|fryers?\b))/i, t),
  },
  {
    id: 'competitor-name', severity: 'error',
    source: 'hpc-standing-rules.md: Never name a competitor. Names read from hpc-reference/competitors.md. weekly-format.md: Never a competitor\'s tag.',
    run: (t, ctx, ref) => ref.competitors.flatMap((n) => {
      // "Loco" is also a word; match it case-sensitively. The rest, any case, spaces optional (hashtags).
      const re = n.length <= 5 ? new RegExp(`\\b${esc(n)}\\b`) : new RegExp(esc(n).replace(/\\? +/g, '\\s*'), 'i');
      return hits(re, t);
    }),
  },
  {
    id: 'yeti', severity: 'error',
    source: 'how-we-sound.md: ⛔ Never say "Yeti" in anything customers see (Evan, 2026-09-11). Keep the idea, drop the name.',
    run: (t) => hits(/yeti/i, t),
  },
  {
    id: 'warranty-5yr', severity: 'error',
    source: 'SAFETY.md + hpc-standing-rules.md: Never say "5-year warranty" without both qualifiers: residential, and 120 QT or smaller. Never on steamer or commercial creative at all.',
    run: (t, ctx) => {
      const five = /\b(?:5|five)[\s-]*(?:years?|yrs?)\b/i;
      if (!five.test(t) || !/warrant/i.test(t)) return [];
      const m = t.match(five);
      const out = [];
      const commercialWords = /\bsteamers?\b|\bcommercial\b|\bgallons?\b|\bgal\b|\b160\s*-?\s*(?:qt|quart)/i;
      if (ctx.commercial || commercialWords.test(t)) {
        out.push({ match: around(t, m.index, m[0].length), detail: 'a 5-year claim on steamer or commercial content: never, no exceptions' });
      }
      const missing = [];
      if (!/residential/i.test(t)) missing.push('"residential"');
      if (!/120\s*-?\s*(?:qt|quart)/i.test(t)) missing.push('"120 QT or smaller"');
      if (missing.length) out.push({ match: around(t, m.index, m[0].length), detail: `missing qualifier: ${missing.join(' and ')}` });
      return out;
    },
  },
  {
    id: 'hard-boil', severity: 'error',
    source: 'hpc-standing-rules.md: Never say "hard boil." Use rolling boil or raging boil.',
    run: (t) => hits(/\bhard[\s-]+boil/i, t),
  },
  {
    id: 'hashtag-on-facebook', severity: 'error', fields: ['facebook'],
    source: 'weekly-format.md rule 5: Hashtags, IG only.',
    run: (t) => hits(/(^|\s)#[A-Za-z_]\w*/, t),
  },
  {
    id: 'placeholder', severity: 'error',
    source: 'post-scheduler: a template marker left in the caption ([IF …], {…}, TODO, TBD) would post as written.',
    run: (t) => [...hits(/\[IF\b[^\]]*\]?/i, t), ...hits(/\{[^}\n]{0,60}\}/, t), ...hits(/\b(?:TODO|TBD|XXX|lorem ipsum)\b/, t)],
  },
  {
    id: 'price-not-on-file', severity: 'error',
    source: 'hpc-standing-rules.md: Never quote a price that is not in what-we-sell.md.',
    run: (t, ctx, ref) => hits(PRICE_RE, t).filter((h) => !ref.prices.has(normPrice(h.raw)))
      .map((h) => ({ ...h, detail: `${h.raw.trim()} is not in what-we-sell.md` })),
  },
  {
    id: 'price', severity: 'warn',
    source: 'weekly-format.md: Prices only from what-we-sell.md, re-checked in Shopify the day the caption is written. Every $ figure is listed so a human checks it.',
    run: (t, ctx, ref) => hits(PRICE_RE, t)
      .map((h) => ({ ...h, detail: `${h.raw.trim()} — ${ref.prices.has(normPrice(h.raw)) ? 'is in what-we-sell.md; re-check Shopify the day it posts' : 'NOT in what-we-sell.md'}` })),
  },
  {
    id: 'krewe', severity: 'warn',
    source: 'how-we-sound.md: "krewe", never "crew", for a group of people (Evan, 2026-09-21). A film or camera crew stays "crew."',
    run: (t) => {
      const out = [];
      each(/\bcrews?\b/i, t, (m) => {
        const before = t.slice(Math.max(0, m.index - 24), m.index).toLowerCase();
        if (/(camera|film|video|production|photo|shoot)\s*$/.test(before)) return;
        out.push({ match: around(t, m.index, m[0].length) });
      });
      return out;
    },
  },
  {
    id: 'fryer-with-crawfish', severity: 'warn',
    source: 'hpc-standing-rules.md: Never pair fryers with crawfish. Both words are in this caption; a human checks the pairing.',
    run: (t) => (/\bfry(?:er|ers|ing)?\b|\bfried\b/i.test(t) && /crawfish/i.test(t)) ? hits(/crawfish\w*/i, t).slice(0, 1) : [],
  },
  {
    id: 'unqualified-number', severity: 'warn',
    source: 'hpc-standing-rules.md: Qualify every number — "up to," "as little as," "in as fast as." Never a flat guarantee. (Customer quotes are skipped.)',
    run: (t) => {
      const ours = maskQuotes(t); const out = [];
      each(/\b\d+(?:\.\d+)?\s*(?:%|percent|minutes?|mins?\b|seconds?|secs?\b)/i, ours, (m) => {
        const before = ours.slice(Math.max(0, m.index - 28), m.index).toLowerCase();
        if (/(about|around|roughly|approximately|up to|as little as|as fast as|under|less than|nearly|or less)\s*(\d+\s*(to|–|-)\s*)?$/.test(before)) return;
        if (/^\s*(or less|or so)/.test(ours.slice(m.index + m[0].length).toLowerCase())) return;
        out.push({ match: around(t, m.index, m[0].length) });
      });
      return out;
    },
  },
  {
    id: '160qt-consumer', severity: 'warn',
    source: 'weekly-format.md: consumer pots run 18 QT to 120 QT. The 160 QT is commercial and never goes in a consumer range (Evan, 2026-09-16).',
    run: (t) => hits(/\b160\s*-?\s*(?:qt|quart)s?\b/i, t),
  },
  {
    id: 'link-in-bio-on-facebook', severity: 'warn', fields: ['facebook'],
    source: 'post-scheduler: "link in bio" is Instagram language; a Facebook caption can carry the URL.',
    run: (t) => hits(/link\s+in\s+(?:our\s+|the\s+)?bio/i, t),
  },
  {
    id: 'hashtag-count', severity: 'warn', fields: ['instagram'], captionOnly: true,
    source: 'weekly-format.md rule 4/5: IG gets the tight version plus 5–8 hashtags, from the bank.',
    run: (t, ctx, ref) => {
      const tags = (t.match(/#[A-Za-z_]\w*/g) || []);
      const out = [];
      if (tags.length < 5 || tags.length > 8) out.push({ match: `${tags.length} hashtags`, detail: 'the format asks for 5–8' });
      if (ref.bank) {
        const off = tags.filter((h) => !ref.bank.has(h.toLowerCase()));
        if (off.length) out.push({ match: off.join(' '), detail: 'not in the hashtag bank (weekly-format.md rule 5)' });
      }
      return out;
    },
  },
];

function hits(re, text) {
  const out = [];
  each(re, text, (m) => out.push({ raw: m[0], match: around(text, m.index, m[0].length) }));
  return out;
}

// ---------- public ----------

let _ref = null;
function reference(force) {
  if (_ref && !force) return _ref;
  const p = pricesOnFile(); const c = competitorNames(); const b = hashtagBank();
  _ref = { prices: p.set, competitors: c.names, bank: b.set, errors: [p.error, c.error, b.error].filter(Boolean) };
  return _ref;
}

/**
 * Lint one block of text.
 * @param {string} text
 * @param {{field?: 'facebook'|'instagram'|'graphic', label?: string, commercial?: boolean}} ctx
 * @returns {{rule, severity, field, match, detail, source}[]}
 */
function lintText(text, ctx = {}) {
  const field = ctx.field || 'facebook';
  const label = ctx.label || field;
  if (!text) return [];
  const ref = reference();
  const findings = [];
  for (const rule of RULES) {
    if (rule.fields && !rule.fields.includes(field)) continue;
    if (rule.captionOnly && label !== field) continue;
    for (const h of rule.run(text, { ...ctx, field }, ref)) {
      findings.push({ rule: rule.id, severity: rule.severity, field: label, match: h.match, detail: h.detail || null, source: rule.source });
    }
  }
  return findings;
}

/** Lint every text field of a manifest piece. */
function lintPiece(piece) {
  const commercial = !!piece.commercial;
  const out = [];
  const cap = piece.caption || {};
  if (cap.facebook) out.push(...lintText(cap.facebook, { field: 'facebook', commercial }));
  if (cap.instagram) out.push(...lintText(cap.instagram, { field: 'instagram', commercial }));
  const fc = piece.firstComment || {};
  if (fc.facebook) out.push(...lintText(fc.facebook, { field: 'facebook', label: 'firstComment.facebook', commercial }));
  if (fc.instagram) out.push(...lintText(fc.instagram, { field: 'instagram', label: 'firstComment.instagram', commercial }));
  for (const g of piece.graphicText || []) out.push(...lintText(g, { field: 'graphic', commercial }));
  return out;
}

module.exports = { lintText, lintPiece, reference, RULES, normPrice };
