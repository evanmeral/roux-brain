// Business Suite composer helpers — paste into Claude in Chrome's javascript_tool on a composer page.
// The runner in business-suite-scheduling.md says when to call each one.
//
// v2, 2026-09-21: the helpers now work from ONE MANIFEST PIECE, so the session never retypes a
// caption, a date or a time. Get the piece from:
//     node "my-workflows (automations)/live/post-scheduler/cli.js" runnable <week> --json
// and hand one entry of `take` to __load(). Everything after that checks itself against that piece.
//
// PROVEN 2026-09-16 (scheduling the Sept 21–27 week): the file-input capture, the caption paste,
// the switches, the date pick, and the check-then-click in __go.
// NOT YET PROVEN on the live page (written 2026-09-21, Business Suite was not opened that day):
// __boostOff's forced-off click and __readScheduled / __match. On their first real run, compare
// their output with the page text before trusting it, then delete this line.
//
// What must stay a REAL click (JS cannot do it): the hour / minute / AM-PM spinbuttons, and the
// story-share Confirm when its dialog hangs half-faded.
// Re-paste after any full page load. The Planner's "Create post" opens a fresh composer WITHOUT a
// reload, so the helpers survive between pieces.

const S = ms => new Promise(r => setTimeout(r, ms));
const V = e => !!e && e.getBoundingClientRect().width > 0;
const norm = t => (t || '').replace(/\s+/g, ' ').trim();
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// 1. The "Add photo/video" button creates a hidden <input type=file> and clicks it. Capture it and
//    make it findable, so `find "roux-upload-input"` + file_upload can use it. Use the NEWEST ref.
if (!window.__rouxPatched) {
  window.__rouxInputs = [];
  const orig = HTMLInputElement.prototype.click;
  HTMLInputElement.prototype.click = function () {
    if (this.type === 'file') {
      window.__rouxInputs.push(this);
      if (!this.isConnected) document.body.appendChild(this);
      this.setAttribute('aria-label', 'roux-upload-input');
      this.style.cssText = 'display:block !important;position:fixed;left:8px;top:60px;width:220px;height:24px;opacity:1;z-index:99999;';
      return;
    }
    return orig.call(this);
  };
  window.__rouxPatched = true;
}

const sw = l => document.querySelector(`[role=switch][aria-label="${l}"]`);
const on = l => sw(l)?.getAttribute('aria-checked') === 'true';
const boxes = () => [...document.querySelectorAll('[role=combobox][aria-label^="Write into"]')].filter(V);
const tab = re => [...document.querySelectorAll('[role=tab]')].find(t => re.test(t.textContent));
const ins = () => [...document.querySelectorAll('input[placeholder="mm/dd/yyyy"]')];
const sv = s => s.getAttribute('aria-valuetext') || s.getAttribute('aria-valuenow') || s.innerText;
const media = () => (document.body.innerText.match(/\d{3,4}\s*[x×]\s*\d{3,4}/g) || []).length;

async function setSwitch(l, want) {
  if (!sw(l)) return 'missing';
  if (on(l) !== want) {
    sw(l).click(); await S(1000);
    // Turning "Share to Facebook Story" off opens a confirm. Pick "Don't share this post" (this post only).
    // ⚠️ The confirm often hangs half-faded and swallows typing: finish it with a REAL click on Confirm.
    const d = [...document.querySelectorAll('[role=dialog]')].pop();
    if (d && /Stop sharing/i.test(d.innerText)) {
      const o = [...d.querySelectorAll('*')].find(e => !e.childElementCount && /Don.t share this post/i.test(e.textContent));
      o && o.click(); await S(400);
      const c = [...d.querySelectorAll('[role=button],button')].find(b => /^Confirm$/.test(b.textContent.trim()));
      c && c.click(); await S(1000);
    }
  }
  return on(l);
}

// Captions: a synthetic paste works in the Lexical editor (typing via JS does not).
async function setText(t) {
  const cb = boxes()[0]; if (!cb) return -1;
  cb.focus(); await S(200);
  const dt = new DataTransfer(); dt.setData('text/plain', t);
  cb.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  await S(700);
  return norm(boxes()[0]?.innerText) === norm(t) ? 'ok' : `MISMATCH (${norm(boxes()[0]?.innerText).length} of ${norm(t).length} chars)`;
}

// Dates: day buttons are labelled "Tuesday, 22 September 2026" (day BEFORE month).
// If it returns 'no cell', the schedule rows had not rendered yet: run it again once. Two failures = stop.
async function pick(i, day, month, year) {
  const re = new RegExp(`^\\w+, ${day} ${month} ${year}$`);
  let c = null;
  for (let a = 0; a < 3 && !c; a++) {
    c = [...document.querySelectorAll('[role=button][aria-label]')].find(e => re.test(e.getAttribute('aria-label')) && V(e));
    if (!c) { const inp = ins()[i]; if (!inp) return 'no date input'; inp.scrollIntoView({ block: 'center' }); inp.click(); inp.focus(); await S(1000); }
  }
  if (!c) return 'no cell';
  c.click(); await S(900);
  return ins()[i].value;
}

// ---- the piece ---------------------------------------------------------------------------------
// __load(piece): piece is one entry of `take` from `cli.js runnable <week> --json`. Returns what the
// session must set by REAL clicks (the time) and what __go will insist on.
window.__load = piece => {
  const [y, mo, d] = piece.scheduledFor.date.split('-').map(Number);
  const [h, mi] = piece.scheduledFor.time.split(':').map(Number);
  const one = `${((h + 11) % 12) + 1},${mi},${h < 12 ? 'AM' : 'PM'}`;
  const n = piece.placements.length;
  window.__rouxPiece = {
    ...piece, day: d, month: MONTHS[mo - 1], year: y,
    dateText: `${MONTHS[mo - 1].slice(0, 3)} ${d}, ${y}`,                 // how the date inputs read: "Sep 24, 2026"
    spins: Array(n).fill(one).join(','),                                  // "5,30,PM,5,30,PM"
    typeIn: { hour: String(((h + 11) % 12) + 1).padStart(2, '0'), minute: String(mi).padStart(2, '0'), meridiem: h < 12 ? 'A' : 'P' },
  };
  const p = window.__rouxPiece;
  return { id: p.id, type: p.type, files: p.media.length, date: p.dateText, spinsWanted: p.spins, typeIntoSpinbuttons: p.typeIn, hasCaptions: !!p.caption };
};
window.__pick = i => { const p = window.__rouxPiece; return pick(i, p.day, p.month, p.year); };

// ---- Boost ---------------------------------------------------------------------------------------
// Boost is never on. Reads the switch; if it is on, turns it off and reads again. 'missing' is fine
// (stories and some composers have no Boost switch) — it is reported, not treated as on.
window.__boostOff = async () => {
  const s = [...document.querySelectorAll('[role=switch]')].find(e => /boost/i.test(e.getAttribute('aria-label') || ''));
  if (!s) return { boost: 'missing' };
  if (s.getAttribute('aria-checked') === 'true') { s.click(); await S(800); }
  return { boost: s.getAttribute('aria-checked') === 'true' ? 'STILL ON — stop' : 'off' };
};

// ---- Feed post / carousel, part A ------------------------------------------------------------------
// After the media is uploaded: customise per platform, both captions from the piece, story-share
// off, Boost off, schedule on, both dates. Times are NOT set here — real clicks + typing only.
window.__A = async () => {
  const p = window.__rouxPiece; if (!p) return 'run __load(piece) first';
  const L = { id: p.id };
  const both = p.placements.length === 2;
  if (both) { L.custom = await setSwitch('Customize post for Facebook and Instagram', true); await S(500); }
  if (p.placements.includes('facebook')) { both && tab(/Facebook/i)?.click(); await S(700); L.fb = await setText(p.caption.facebook); }
  if (p.placements.includes('instagram')) { both && tab(/Instagram/i)?.click(); await S(700); L.ig = await setText(p.caption.instagram); }
  L.story = await setSwitch('Share to Facebook Story', false);
  L.boost = (await window.__boostOff()).boost;
  L.sched = await setSwitch('Set date and time', true); await S(900);
  L.d0 = await window.__pick(0); if (both) { await S(400); L.d1 = await window.__pick(1); }
  L.media = `${media()} of ${p.media.length}`;
  L.next = `REAL click + type on each spinbutton: hour "${p.typeIn.hour}", minute "${p.typeIn.minute}", meridiem "${p.typeIn.meridiem}". Then await __go()`;
  return L;
};

// ---- Feed post / carousel, final --------------------------------------------------------------------
// Checks every field against the loaded piece, and only then clicks Schedule. A failed check
// schedules nothing (that caught three wrong-time attempts on the first run). It never clicks
// Publish: it looks for a button whose whole label is "Schedule".
window.__go = async () => {
  const p = window.__rouxPiece; if (!p) return 'run __load(piece) first';
  const both = p.placements.length === 2;
  const dates = ins().map(i => i.value);
  const spins = [...document.querySelectorAll('[role=spinbutton]')].map(sv).join(',');
  let fbT = '', igT = '';
  if (p.placements.includes('facebook')) { both && tab(/Facebook/i)?.click(); await S(600); fbT = boxes()[0]?.innerText || ''; }
  if (p.placements.includes('instagram')) { both && tab(/Instagram/i)?.click(); await S(600); igT = boxes()[0]?.innerText || ''; }
  const boost = (await window.__boostOff()).boost;
  const chk = {
    dates: dates.length === p.placements.length && dates.every(d => d === p.dateText),
    spins: spins === p.spins,
    story: !on('Share to Facebook Story'),
    boost: boost === 'off' || boost === 'missing',
    media: media() === p.media.length,
    fb: !p.placements.includes('facebook') || norm(fbT) === norm(p.caption.facebook),
    ig: !p.placements.includes('instagram') || norm(igT) === norm(p.caption.instagram),
    fbNoHashtags: !/(^|\s)#[A-Za-z_]/.test(fbT),
  };
  if (!Object.values(chk).every(Boolean)) return { id: p.id, NOT_SCHEDULED: chk, dates, spins, wanted: { date: p.dateText, spins: p.spins } };
  const btn = [...document.querySelectorAll('[role=button],button')].filter(x => /^Schedule$/.test(x.textContent.trim()) && V(x)).pop();
  if (!btn) return { id: p.id, NOT_SCHEDULED: 'no button labelled exactly "Schedule"' };
  btn.click();
  await S(6000);
  const d = [...document.querySelectorAll('[role=dialog]')].pop();
  const txt = d ? d.innerText.replace(/\s+/g, ' ').slice(0, 60) : 'no dialog';
  const m = d && [...d.querySelectorAll('[role=button],button')].find(x => /^(Maybe later|Done)$/i.test(x.textContent.trim()));
  m && m.click(); await S(800);
  // "Your post is scheduled" or "You scheduled a post…" both mean success. Pass `result` to: cli.js mark … scheduled --note
  return { id: p.id, result: txt, dates, spins };
};

// ---- Story: check only ------------------------------------------------------------------------------
// Story composer: upload, turn Schedule on, __pick(0) and __pick(1), set the times by real clicks.
// Then __checkStory() compares dates, times and file count with the piece. It clicks NOTHING: if
// `ready` is true, the session finds the button labelled exactly "Schedule" and clicks it for real.
window.__checkStory = () => {
  const p = window.__rouxPiece; if (!p) return 'run __load(piece) first';
  const dates = ins().map(i => i.value);
  const spins = [...document.querySelectorAll('[role=spinbutton]')].map(sv).join(',');
  const chk = { dates: dates.length === p.placements.length && dates.every(d => d === p.dateText), spins: spins === p.spins, media: media() >= 1 };
  return { id: p.id, ready: Object.values(chk).every(Boolean), chk, dates, spins, wanted: { date: p.dateText, spins: p.spins } };
};

// ---- Read-back -----------------------------------------------------------------------------------
// On Content → Scheduled (/latest/posts/scheduled_posts): every row as JSON. Stories are not listed
// there; read those in the Planner week view. READ-ONLY: it clicks nothing.
window.__readScheduled = () => {
  const WHEN = /(?:(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\w*,?\s+)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\.?\s+\d{1,2}(?:,?\s+\d{4})?[^\n]{0,8}?\d{1,2}:\d{2}\s*[AP]M|(?:Today|Tomorrow)[^\n]{0,8}?\d{1,2}:\d{2}\s*[AP]M/i;
  let rows = [...document.querySelectorAll('[role=row]')].filter(V);
  if (rows.length < 2) rows = [...document.querySelectorAll('tr')].filter(V);
  const out = rows.map(r => {
    const text = r.innerText.replace(/\s*\n\s*/g, ' | ').trim();
    const labels = [...r.querySelectorAll('[aria-label],img[alt]')].map(e => e.getAttribute('aria-label') || e.getAttribute('alt') || '').join(' ');
    const where = `${text} ${labels}`;
    const platform = /instagram/i.test(where) && !/facebook/i.test(where) ? 'instagram' : /facebook/i.test(where) && !/instagram/i.test(where) ? 'facebook' : /instagram/i.test(where) ? 'both-or-unclear' : 'unknown';
    const when = (text.match(WHEN) || [null])[0];
    return when ? { platform, when, firstLine: text.split(' | ')[0].slice(0, 70), text: text.slice(0, 200) } : null;
  }).filter(Boolean);
  return { url: location.pathname, count: out.length, rows: out, note: out.length ? undefined : 'no rows parsed — read the page text instead; do not mark anything verified from this' };
};

// __match(pieces): pieces = the week's feed / carousel / reel entries (id, placements, caption, scheduledFor).
// For each piece and platform, finds the scheduled row that opens with the same first caption line
// and carries the same time. Returns evidence strings ready for `cli.js mark … verified`.
window.__match = pieces => {
  const { rows } = window.__readScheduled();
  return pieces.map(p => {
    const [h, mi] = p.scheduledFor.time.split(':').map(Number);
    const time = `${((h + 11) % 12) + 1}:${String(mi).padStart(2, '0')}\\s*${h < 12 ? 'AM' : 'PM'}`;
    const dayNum = Number(p.scheduledFor.date.split('-')[2]);
    const found = {};
    for (const pl of p.placements) {
      const first = norm((p.caption?.[pl] || '').split('\n')[0]).toLowerCase();
      const hit = rows.find(r => (r.platform === pl || r.platform === 'both-or-unclear' || r.platform === 'unknown')
        && new RegExp(time, 'i').test(r.when) && new RegExp(`\\b${dayNum}\\b`).test(r.when)
        && (!first || norm(r.text).toLowerCase().includes(first)));
      found[pl] = hit ? { readBack: hit.when, platformSeenAs: hit.platform } : null;
    }
    return { id: p.id, found, allFound: p.placements.every(pl => found[pl]) };
  });
};
