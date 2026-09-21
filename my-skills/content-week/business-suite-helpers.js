// Business Suite composer helpers — paste into Claude in Chrome's javascript_tool on a composer page.
// Proven 2026-09-16 scheduling the Sept 21–27 week. See business-suite-scheduling.md for the recipe
// and the steps that must stay real clicks (times, the story-share confirm). Re-paste after any full
// page load; the Planner's "Create post" button opens a fresh composer WITHOUT a reload, so helpers survive.

const S = ms => new Promise(r => setTimeout(r, ms));
const V = e => !!e && e.getBoundingClientRect().width > 0;

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
  return (boxes()[0]?.innerText || '').trim().length;
}

// Dates: day buttons are labelled "Tuesday, 22 September 2026" (day BEFORE month).
// If it returns 'no cell', the schedule rows had not rendered yet: run it again once. Two failures = stop.
async function pick(i, day, month = 'September', year = 2026) {
  const re = new RegExp(`^\\w+, ${day} ${month} ${year}$`);
  let c = null;
  for (let a = 0; a < 3 && !c; a++) {
    c = [...document.querySelectorAll('[role=button][aria-label]')].find(e => re.test(e.getAttribute('aria-label')) && V(e));
    if (!c) { const inp = ins()[i]; inp.scrollIntoView({ block: 'center' }); inp.click(); inp.focus(); await S(1000); }
  }
  if (!c) return 'no cell';
  c.click(); await S(900);
  return ins()[i].value;
}
window.__pick = pick;

// Feed post, part A: customise per platform, both captions, story-share off, schedule on, both dates.
// Times are NOT set here — they only accept real clicks + typing (see the .md).
window.__A = async p => {
  const L = {};
  L.custom = await setSwitch('Customize post for Facebook and Instagram', true); await S(500);
  tab(/Facebook/i)?.click(); await S(700); L.fb = await setText(p.fb);
  tab(/Instagram/i)?.click(); await S(700); L.ig = await setText(p.ig);
  L.story = await setSwitch('Share to Facebook Story', false);
  L.sched = await setSwitch('Set date and time', true); await S(900);
  L.d0 = await pick(0, p.day); await S(400); L.d1 = await pick(1, p.day);
  L.media = media();
  return L;
};

// Feed post, final: verify everything, and only then click Schedule. Nothing is scheduled on a failed check.
// e = { date:'Sep 23, 2026', spins:'12,0,PM,12,0,PM', media:6, seg:'How-To Wednesday.' }
window.__go = async e => {
  const dates = ins().map(i => i.value);
  const spins = [...document.querySelectorAll('[role=spinbutton]')].map(sv).join(',');
  tab(/Facebook/i)?.click(); await S(600); const fbT = boxes()[0]?.innerText || '';
  tab(/Instagram/i)?.click(); await S(600); const igT = boxes()[0]?.innerText || '';
  const chk = {
    dates: dates.length === 2 && dates.every(d => d === e.date), spins: spins === e.spins,
    story: !on('Share to Facebook Story'), boost: !on('Boost'), media: media() === e.media,
    fb: fbT.startsWith(e.seg) && fbT.length > 100, ig: igT.startsWith(e.seg) && /#highperformancecookers/.test(igT),
  };
  if (!Object.values(chk).every(Boolean)) return { NOT_SCHEDULED: chk, dates, spins };
  [...document.querySelectorAll('[role=button],button')].filter(x => /^Schedule$/.test(x.textContent.trim()) && V(x)).pop().click();
  await S(6000);
  const d = [...document.querySelectorAll('[role=dialog]')].pop();
  const txt = d ? d.innerText.replace(/\s+/g, ' ').slice(0, 60) : 'no dialog';
  const m = d && [...d.querySelectorAll('[role=button],button')].find(x => /^(Maybe later|Done)$/i.test(x.textContent.trim()));
  m && m.click(); await S(800);
  return { result: txt, dates, spins }; // "Your post is scheduled" or "You scheduled a post…" both mean success
};
