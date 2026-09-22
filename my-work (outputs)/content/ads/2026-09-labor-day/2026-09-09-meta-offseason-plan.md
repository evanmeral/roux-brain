# Meta from Sept 9 — the off-season plan

> tidy-brain: 2026-09-22: some files this page names were moved to the Trash (duplicates or superseded rounds). List: my-desk (now)/archive/tidy/2026-09-22-removed.md. Recover any of them with git checkout 7b3b0c5 -- "<path>".
**Beau, 2026-09-08.** Companion to [2026-09-09-wind-down.md](2026-09-09-wind-down.md).
Recommendations only. **Every change below is Evan's click.**

---

## 🔴 The blocker, and it is tonight

**The evergreen creative is almost certainly not in Meta's media library.**

`meta-setup-status.md` (2026-08-28) records that the file picker is a hard blocker — creative
can only be *selected* from Meta's **Account images** library, not uploaded from the desktop
by anyone but Evan. What Evan bulk-uploaded on Aug 28 was **the 10 Labor Day PNGs**. The four
evergreen files from Aug 27 were never part of that batch.

**So on Wednesday morning you switch six ads off and have nothing selectable to switch on.**

**Tonight, ~3 minutes:** upload these four to the Meta media library. No ads, no setup, just
the files. Then the morning is toggles, not uploads.

```
my-skills/hpc-ad-creative/work/creative/library/
  2026-08-27_80qt-powered_buy-cheap-twice_1080x1080_v1.png
  2026-08-27_120qt-powered_crowd-math_1080x1920_v1.png
  2026-08-27_120qt-powered_rolling-boil_1080x1350_v1.png
  2026-08-27_18qt-fryer_fry-it-all_1080x1350_v1.png
```

*Verified 2026-09-08: all four exist at those paths and at those exact pixel dimensions.*

---

## 1. Sept 9 — what goes live

### The exposure

`BPM_TOF_Manual` carries **$156.33/day of the account's $202.24/day** (Ads Manager Sept 1–7
÷ 7). Its budgets are set at **ad-set** level — recorded caps `Nov BPM_Holiday $60` +
`Video_Jay 30qt $62` + `LAL 1% Purchasers $42` = **$164/day** *(meta-setup-status.md,
verified after the Aug 28 revert — 8 days stale, re-check in the UI)*. Actual spend is 95.3%
of that cap.

**If those ad sets have no live ad Wednesday morning, 77% of Meta spend stops** and the ad
sets start bleeding learning.

### Step 0 — check before you build

Open each `BPM_TOF_Manual` ad set and look for **paused evergreen ads**. The ad set names say
Jay's 30 QT video and a holiday set exist. **Re-enabling a paused ad beats creating a new
one** — it keeps the post's accumulated likes and comments, and it is a five-second click.
Build new only where an ad set comes up genuinely empty.

### Step 1 — the creative that exists today

Honest inventory. Under the paid spec on file — **1:1, 9:16, 1.91:1; 4:5 is organic** — only
**two** finished paid statics carry no discount badge:

| File | Size | Product | Angle | Warranty |
|---|---|---|---|---|
| `..._80qt-powered_buy-cheap-twice_...` | **1:1** | 80 QT Powered | price objection | Eligible — residential, under the 120 QT cap. ⚠️ See wording note below. |
| `..._120qt-powered_crowd-math_...` | **9:16** | 120 QT Powered | crowd math | Eligible — *exactly at* the cap, residential. ⚠️ Same note. |

The other two (`120qt rolling-boil`, `18qt fry-it-all`) are **1080×1350 — organic spec.**
Usable as-is only if you accept 4:5 in paid feed; under the spec on file they need a 1:1
re-render. Both are already approved concepts, so it is a re-render, not a new design.

**Two ads across three ad sets is thin. That is the honest position.**

### ✅ The `5-YR RESIDENTIAL WARRANTY` badge is approved on these two

**Evan, 2026-09-08.** Both products are residential and at or under the 120 QT cap, so the
badge ships as-is on the 80 QT and the 120 QT. Same for the `5-year residential warranty` line
in the evergreen 18 QT video copy. **Do not hold the morning over the wording.**

**What the block was actually about** — it was never these two ads. Two separate things:

1. **`yeti-1x1.html` hardcodes the badge at line 37**, so *every* ad built from that template
   carries it regardless of product. Correct on a pot; false on a steamer or a commercial
   boiler. The fix is making it a variable, not changing the words.
2. **The 5-year genuinely does not apply above 120 QT.** Live page, verbatim heading:
   **"LIMITED FIVE YEAR WARRANTY — FOR RESIDENTIAL USE ONLY (120 Quarts or smaller)."**
   *(highperformancecookers.com/pages/warranty-information, re-read 2026-09-08.)*

**So the live constraint is the size cap, not the phrasing.** The one that bites: the **160 QT
Powered Cooker** is a consumer product *above* the cap — and it was the sale's biggest revenue
line at $5,817. A `yeti-1x1.html` ad pointed at it would carry a 5-year claim the warranty page
does not support. Same for the 80–140 Gallon line and any steamer.

### Step 2 — what has to be made, and it is fast

**`laborday-hpc-dark`, stripped.** It was the cheapest ad in `BPM_TOF_Manual` at **$19.76
CPP** *(Ads Manager Sept 1–7 — ⚠️ **7 purchases, learning limited.** Reuse the frame; do not
bet budget on the figure)*. Template exists at
`my-skills/hpc-ad-creative/work/creative/templates/laborday-hpc-dark/`. Pull the `10% OFF`
badge and the code line, keep the frame, re-render at **1:1 and 9:16**.

⚠️ Fix while in there: `laborday-hpc-dark/9x16.html` puts white on `#FFA41C` at **2.12:1** —
below even the 3:1 large-text floor, on the best-performing creative in the account.

`offseason-4x5.html` also already exists as a starting point.

### Step 3 — the audience fix, same morning

**Frequency 5.05 across 15,033 people.** Do the structural fix *now*, inside the same
disruption as the creative swap — an audience edit resets learning, and one reset is cheaper
than two.

**Widen `LAL 1% Purchasers` to 1–3%.** A 1% lookalike is the smallest audience Meta will build
and is the obvious source of the 5.05. **Do not add budget** — just give it room.

Sept 9–15 will read noisy. It would read noisy anyway; the offer just ended.

### Step 4 — `18qt-TOF-Prospecting`: leave it completely alone

$20.09 CPP, frequency 1.90. The reason it is clean is that the sale never touched it. Verify
no ad in it references a code, then **do not touch budget, creative or audience for seven
days.** It is the control that makes the fatigue question answerable.

**One exception, and it is free:** Garrett's 18 QT video. ✅ **Evan watched it 2026-09-08 and
cleared it.** The 8-day block is closed — **build the ad Wednesday.**

**The evergreen copy is already written** — headline, primary text and description, no code —
in [`2026-09-01-18qt-video-ad-build.md`](2026-09-01-18qt-video-ad-build.md) under *"Copy —
evergreen version (swap in Sept 9)."* It goes into `18qt-TOF-Prospecting` at **no extra
budget**; adding an ad to a live ad set does not reset learning. That makes it the only new ad
Wednesday that costs nothing and needs no render.

⚠️ **Use the evergreen copy block, not the promo block.** The same doc's promo version has
`LABORDAY10-26` in the primary text, in the headline, *and* attached as a manual promo code
in creative setup (step 8). If the promo version was never actually published, there is
nothing to swap — just build the evergreen one directly. *(Verified 2026-09-08: both copy
blocks are in that file.)*

---

## 2. The next two weeks — build retargeting, now

**Sept 9. Not "after the post-mortem."**

The sale's browser pool is the warmest audience HPC will have until January, and it decays out
of a 30-day window starting immediately. Every day you wait you retarget a smaller, colder
list. It is also the only budget move this week that is **not** a raise to an existing ad set
— new campaign, new money, resets nothing already running.

| | |
|---|---|
| **Audience** | 30-day site visitors + add-to-cart + IG/FB engagers. **Purchasers excluded.** |
| **Budget** | **$30/day**, ~$420 over 14 days |
| **Sizing rule** | ~$20/day per 4,000 people ≈ 3× frequency. **Check the actual pool size in Meta first — I don't have it.** Under 4,000 people: start at $20. |
| **Stop rules** | Frequency > 3.5 → cut budget · CPP > $60 after 4 days → pause · **under $40 → it is working, keep it** |
| **Week 1 creative** | ⛔ **The evergreen statics only.** `2026-08-27_laborday-vintage_multi-product_1080x1350_v1.png` was checked 2026-09-08 and **is not usable** — it carries "LABOR DAY SALE", "10% OFF EVERYTHING", both codes and "SEPT 1–8" on the face. It was a Labor Day asset built for a retargeting audience, not an evergreen one. Retargeting launches on the same evergreen statics as prospecting until Maya's objection set lands. |
| **Week 2 creative** | Purpose-built objection killers. None exist today → Maya. |

**Judge it in November, not in two weeks.** At $30/day against a small pool it will not reach
Meta's ~50-conversion learning threshold. You are buying an answer you currently cannot get,
and the entire downside is $420.

### The fortnight

| When | Do |
|---|---|
| **Sept 9** | Six ads off · evergreen on in all three BPM ad sets · LAL widened to 1–3% · retargeting live · 18 QT video live if clean · site sweep |
| **Sept 10–15** | **No budget changes at all.** One check a day, not hourly. |
| **Sept 16** | First read on a no-discount week. Gate check. |
| **Sept 16–22** | Maya ships the retargeting objection set + 1:1 re-render of `18qt fry-it-all`. Sage posts the 18 QT video as a Reel — free warm-audience sibling. |

---

## 3. Budget shape through the off-season

### Hold total spend flat for one week. This is the whole call.

$202/day now, plus $30 retargeting = **~$232/day from Sept 9.**

Not because Meta is maxed — the standing read is that **it is underspent, not inefficient**:
at 2.4 break-even blended ROAS, Meta had to cause ~11 of the week's 105 orders to pay for
itself, and it claims 53. But that CPP was earned against a **discount-elevated conversion
rate.** Scaling into a no-discount week on discount-week economics turns a good finding into a
bad month. Get one clean baseline week first.

### The number nobody has said yet

Break-even CAC during the sale was **~$142.86** (net AOV $321.03 × 44.5% margin). Off-season
AOV was **$383.53** (Aug 24–30) and **$393.40** (Aug 17–23) — both no-sale weeks, both well
above the sale week. At $383.53 × 44.5%, off-season break-even CAC is **~$170.67**.
*(Arithmetic on Shopify figures pulled 2026-09-08 — a derived number, not itself a Shopify
number.)*

**Without a discount you can afford a more expensive customer, not a cheaper one.** Expect CPP
to rise post-sale as conversion normalizes. **That is not a failure signal.** The failure
signal is CPP rising past the gates below.

### The ladder

| Step | When | Move | Gate — all must pass, trailing 7 days |
|---|---|---|---|
| **0** | Sept 9–15 | Hold $202 + $30 retargeting | — |
| **1** | Sept 16 | `18qt-TOF` **$50 → $60/day** (+20%) | CPP ≤ $30 · freq ≤ 2.5 · retargeting freq ≤ 3.5 |
| **2** | Sept 19 | `18qt-TOF` **$60 → $72** | Same gates, re-measured |
| **3+** | every 3 days | ≤20% steps, 18qt only | Same gates |
| **Ceiling** | — | **Total Meta ≤ $350/day** until landed BOM lands | Hard stop |
| **Oct 1** | — | Turkey fry / BFCM ramp — separate plan, bigger step; the seasonal calendar says launch ads Oct 1 | — |

`18qt-TOF` spent **$45.91 of its $50 cap (91.8%)** — near-capped, not pinned. I don't have the
daily breakdown to say whether it hit $50 every day. **If a raise doesn't move actual spend,
the constraint is audience or creative, not budget** — and more money won't fix it.

### On the BOM gate — Beau is recommending you relax it, and saying so out loud

The board says *"not past step one without landed BOM for the 18 QT."* The argument for going
further anyway: 18 QT powered's provisional CAC ceiling is **~$63** *(cac-model-v2, 20%
overhead reserve)*. The campaign ran **$20.09 CPP** — **3.1× of headroom.** The ceiling would
have to be wrong by more than a factor of three before step 2 loses money, and the $30 gate is
still under half the provisional ceiling.

**This is Beau overriding a board note. It is Evan's call, not Beau's.** If you hold the line
at step one, the cost is real: you cap the cheapest acquisition in the account at $60/day
while it beats everything else by 32%.

Either way — **Jay's landed BOM is now the single highest-value unblock in the business.** It
gates the 18 QT ladder *and* the legs question (the ~$50.58 threshold), and it has been open
since Aug 28. Chase it this week.

### `BPM_TOF_Manual` — no raise until frequency comes down

Not one dollar more until trailing-7 frequency is **under 3.0.** It is a structure problem, and
money makes structure problems worse. Fix the audience, watch two weeks, revisit.

---

## 4. What not to do

- ⛔ **No sitewide % discount before November.** AOV $321.03 — lowest of four windows, 24% below
  last Labor Day on the same mechanic. Two data points, same holiday, same mechanic: a real signal.
- ⛔ **Don't repeat 30%-off-legs** until landed cost per leg extension exists. Below ~$50.58 it
  paid; above, it lost money on 80% more units.
- ⛔ **Don't scale on the $19.76 HPCDark number.** Seven purchases. Same discipline that was
  right about the Vintage duplicate at $91.64.
- ⛔ **Don't build a new prospecting campaign for evergreen creative.** It starts in learning and
  would need ~$400/day to exit inside 7 days. Evergreen goes into ad sets that already work.
- ⛔ **Don't leave a single ad, headline or description referencing a code.**
- ⛔ **Don't judge retargeting on this fortnight.** It won't reach learning threshold.
- ⛔ **Don't touch email or SMS.** Biljana's lane, entirely.
- ⛔ **Never quote net ÷ Meta spend (23.8×) as ROAS.** To anyone, ever.

---

## Order of operations, Wednesday 7am

1. Six Labor Day ads **off**
2. Evergreen ads **on** — one live ad minimum in every BPM ad set
3. `LAL 1% Purchasers` → **1–3%**
4. Retargeting campaign live, **$30/day**, purchasers excluded
5. 18 QT video ad live — **only if you watched it**
6. `18qt-TOF-Prospecting` — verified clean, then untouched
7. Site sweep → [wind-down sheet](2026-09-09-wind-down.md), Section B2

**Every one of those is a change in a live ad account. Evan's click, not Beau's.**

---

## Next: Maya

**Job 1 — tonight, blocking.** Re-render `laborday-hpc-dark` as evergreen at **1:1 and 9:16**.
Strip the `10% OFF` badge and the code line, keep the frame. Fix `9x16.html` — white on
`#FFA41C` is 2.12:1, needs 4.5:1. Also re-render `18qt fry-it-all` and `120qt rolling-boil` at
1:1 (they exist only at 1080×1350, organic spec).

**Job 2 — Sept 16–22.** Three retargeting statics, objection-killing, for people who visited
during the sale and didn't buy. They already know the product — no introductions. Angles in
priority order: **4mm cast aluminum vs. pots that warp** · **ships in 1–2 days** · **up to 75%
less propane** (the savings calculator exists on the site).

**Constraints she must be given:**
- **CAC ceilings are provisional** — 18 QT powered ~$63, 120 QT ~$197, Triple Jet ~$96. Do not
  write an offer against these.
- **No discount, no code, no percentage-off anywhere.** Post-sale evergreen.
- **Warranty, both qualifiers, always:** limited 5-year, **residential**, **120 QT or smaller.**
  Never on the 160 QT, the 80–140 Gallon commercial line, or any steamer.
- **Tunnel Tubes are on the bottom of the pot** — the technology is in the pot, not the burner.
- **Rolling boil** or **raging boil.** Never "hard boil."
- Qualify every number — "up to," "as little as," "in as fast as."
- Never name a competitor. **Lead with quality; never defend price** — including on the
  buy-cheap-twice angle.
- ⚠️ **Nothing built from `yeti-1x1.html` may point at a steamer or commercial product** —
  line 37 hardcodes the 5-year claim.

---

*Meta figures are Ads Manager reads, Sept 1–7, pulled 2026-09-08 — platform-reported,
pre-discount, no refunds subtracted. Shopify is the source of truth for revenue. Creative
paths and pixel dimensions verified against disk 2026-09-08.*
