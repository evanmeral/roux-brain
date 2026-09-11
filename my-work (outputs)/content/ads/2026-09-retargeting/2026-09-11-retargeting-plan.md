# Retargeting campaign — the plan
**ROUX, 2026-09-11.** **Status: approved by Evan 2026-09-11, launch held. No date set.**

This is a plan only. **Nothing has been built.** Writing it made no writes to Meta, Shopify or Google;
two read-only Shopify lookups were run (product handles, page handles). Every build step below,
including creating audiences, is a change in a live ad account: **Evan's click.**

It starts from [BOARD](../../../../my-desk%20%28now%29/BOARD.md) Now #2 and the
[paid-media playbook](../../../../my-workflows%20%28automations%29/playbooks/paid-media.md).

> **Labels used throughout.** *(fact — source)* is on file or read live. *(derived)* is arithmetic on
> on-file figures. *(inference)* is ROUX's reasoning, untested. *(judgment)* is a call, not a finding.
> No performance number in this plan is a forecast of results.

---

## The call

1. **Launch is held** *(Evan, 2026-09-11)*. He wants to wait before adding another new campaign, so
   there's no date yet. **The cost of waiting, for the record:** the pool shrinks every day, and the
   Sept 1–8 sale browsers start leaving the 30-day window on Oct 1 *(derived: Sept 1 + 30 days)*. When
   a date is set, re-run the read-only checks in §9 on that day.
2. **Two ad sets, split by product, both inside `Website Visitors 30D (All)`** *(approved)*. That
   audience is already a hard exclusion on the IW lookalike, so the two campaigns can't touch the same
   person, and **the live IW campaign needs no edit.**
3. **The $30 fits.** Finn confirmed live caps of **$314/day** in Ads Manager, 2026-09-11, 09:07–09:10
   CDT. Adding the $30 makes **$344 of $350**.
4. **IntentWave's pixel: don't use it for retargeting.** Its audience keeps the one job it already has,
   seeding the lookalike. §1.
5. **Attribution settings are frozen for the life of the test.** §7.

---

## 1. IntentWave's pixel — the verdict

**No, not for this campaign. `IW - LA Audience` keeps one narrow job: the lookalike seed it already is.**
*(Evan confirmed the audience stays out, 2026-09-11.)* Revisit only when both conditions at the end of
this section are true.

This **reverses** the Aug 31 build guides, which put `IW - LA Audience` into retargeting as an inclusion
*(META-BUILD-GUIDE.md, FINISH-IN-META.md, `2026-09-labor-day/`)*.

### What is verified

| Fact | Source |
|---|---|
| IntentWave (operating as Persistent.id) runs an **identity pixel** on the site and **syncs audiences into Meta** | our-team.md · channels-and-accounts.md, "confirmed 2026-08-31" |
| Two IW audiences are in the ad account: `IW - LA Audience` (`52505444830191`) and `Google Audience` (`52504597314591`, tied to `18qt-TOF-Prospecting`) | channels-and-accounts.md |
| IW describes `IW - LA Audience` as *"about 4,000 Identified contacts... to create a lookalike off of"* | channels-and-accounts.md, quoting IW |
| Meta sizes it at **2,300–2,700** and types it as a **Customer List**, not website visitors | NEXT-SESSION.md, early Sept |
| It seeds the live `IW Lookalike 1% - Cold Prospecting - Sept 2026` | BOARD, Running |
| The lookalike sits under "Suggest an audience", so Advantage+ can reach past it. Only age, US and the three exclusions are hard | Finn, 2026-09-10 (BOARD) |
| **IntentWave has shown its pixel is CIPA compliant. Coalition is in contact with them** | Evan, 2026-09-11 |
| A second Meta pixel, `491960645999331`, fires on the site: 69.4K events in 28 days, owner unknown | Finn, Events Manager, 2026-09-10 (call-2 recap) |

### Context from Evan — recorded, not acted on

- Evan believes IntentWave built the pixel as a **retargeting pixel**.
- **Biljana uses that customer list in her add-to-cart and abandoned-checkout email flows** *(Evan,
  2026-09-11)*.
- Email is Biljana's lane, entirely. This plan proposes nothing there and analyses nothing there.

### What is inferred, not verified

- **That the "identified contacts" are site visitors IW resolved to a person.** "Identity pixel" plus
  "identified contacts" points that way, and so does Evan's read above. Nobody has told us who is in the
  list, over what window, how often it refreshes, or whether past buyers are in it.
- **That `491960645999331` could be IntentWave's.** It's plausible, since they run a pixel and sync to
  Meta, but it's untested. It could equally be left over from BM Digital or an app. Jay is being asked.

### Why not

1. **It wouldn't help at $30/day.** We're limited by budget, not audience size. At the CPMs on file
   ($13.16 BPM, $23.72 18qt; paid-media playbook, 2026-08-28), $30/day buys roughly **1,300–2,300
   impressions a day**. Across 7,200–8,500 people, that's **at most ~1.0–2.2 impressions per person per
   week**, even if Meta reached every one of them *(derived)*. Adding 2,300–2,700 people spreads the
   same dollars thinner. How many of IW's contacts are *not* already in our 30D pixel pool is unknown.
   Heavy overlap is likely *(inference)*.
2. **It would cross the IW campaign.** The list is the lookalike's seed, and it is **not** among the IW
   campaign's exclusions. Put it in retargeting and both campaigns can bid on the same people. The only
   fix is an audience edit on a live ad set in its first week, which also muddies both reads.
3. **We don't know what's in it.** A campaign judged on Shopify orders can't be read if its audience is
   a black box.

**What would change the answer:** (a) IW answers question 2 below, and (b) retargeting proves itself
and hits the frequency cap at a budget we *want* to raise. Then it gets tested as its own ad set, never
mixed in.

### Two questions for IntentWave: one message, via Evan

IntentWave advises, and this isn't a work queue *(decisions.md, 2026-09-10)*. These two are the whole list.

1. Is Meta pixel `491960645999331` yours? *(Skip if Jay answers first.)*
2. What exactly is `IW - LA Audience`: who is in it, over what window, how often does it refresh, and
   does it include past buyers?

---

## 2. Objective and optimization event

| Setting | Value | Why / source |
|---|---|---|
| Objective | **Sales** | Judged on orders |
| Performance goal | **Maximize number of conversions** | Same as the IW campaign (BOARD). "Maximize value" threw error #2490408 on the IW build |
| Conversion event | **Purchase** on pixel **`1861969194014116`** | Our pixel *(Events Manager, call-2 recap)*. **Not** `491960645999331` |
| Budget level | **Ad set**, not campaign | So Meta can't move the money toward the cheaper 18 QT order *(overhead-method §6a)* |
| Placements | Advantage+ placements | Every ad exists at 1:1, 9:16 and 1.91:1 *(LIBRARY-LOG)* |
| Creative enhancements | Advantage+ enhancements **off** · multi-advertiser ads **off** | Ships the approved creative as approved *(18qt video build sheet, step 7)* |
| Destinations | **Shop off, Messenger off**, every ad | In-app orders carry no tag *(decisions, 2026-09-11)* |
| Attribution | Record it at build; match the IW campaign; **never change it mid-test** | §7 |

**⛔ It must not be an Advantage+ Sales campaign.** On the IW build, an Advantage+ Sales campaign offered
no audience picker. Inclusions became "suggestions" Meta can ignore *(finish-the-IW-draft, Step 5 ·
Finn, 2026-09-10)*. A retargeting ad set with a *suggested* audience is prospecting with a hint.
**Build check #1, before anything else:** create the campaign in draft and confirm the ad set offers a
**hard custom-audience inclusion** ("original audience options"). Turning Advantage+ off at campaign
level, for example by using ad-set budgets, is what should expose that option *(inference; not tested
in this account)*. **If only "Suggest an audience" appears, stop.** Don't publish.

**It will not leave learning.** Exiting takes ~50 conversions a week, which $30/day can't buy. That's
expected, not a failure signal *(2026-09-09 off-season plan)*. The same goes for adding Maya's ads
later: an ad set that never leaves learning has no learning to lose.

**Not in this plan, and why:**
- **Catalog / dynamic product ads.** They're feed tiles with feed prices, the white-background look the
  brand avoids, and a tile can't answer an objection.
- **Any offer or code.** ⛔ No sitewide % before November; welcome codes don't stack (BOARD).
- **Email / SMS abandoner flows.** Biljana's. We stay out.
- **Google remarketing.** Coalition's lane.

---

## 3. Audiences

### Build list: creating an audience is a write, so Evan's click

| Audience | Rule | Status |
|---|---|---|
| `Website Visitors 30D (All)` | All website visitors, 30 days, pixel `1861969194014116` | Exists. Already the IW campaign's hard exclusion *(finish-the-IW-draft, Step 5)* |
| `RT - Viewed 18 QT - 30D` | **New.** Website, 30 days, **URL contains `18-qt`** | Catches all four live 18 QT product handles and Evan's landing page *(Shopify, read-only, 2026-09-11 — list below)* |
| `Past Purchase L90 via Pixel Data` | Exists | Exclusion |
| `Dealer Buyers (EXCLUSION)` | Exists | Exclusion |

What "URL contains `18-qt`" catches *(Shopify product and page handles, read 2026-09-11)*:
- **Products:** `18-qt-fish-fryer` (Powered, $285–$340) · `18-qt-fish-fryer-brazier-pot` (non-powered,
  $220–$265) · `18-qt-basket` · `18-qt-fish-fryer-brazier-powered-pot-scratch-dent-30-off`
- **Page:** `pages/18-qt-fish-fryer-brazier`, titled *"18 QT Fish Fryer & Brazier - Landing v1."* This
  is almost certainly Evan's landing page *(inference)*. Confirm it against the live `hpc-dark-evergreen`
  ad's link in **Preview**, not the edit panel, which queues drafts on a live ad.

### The two ad sets — approved (Evan, 2026-09-11)

| Ad set | Include | Exclude | Budget |
|---|---|---|---|
| `RT 30D - Pots` | `Website Visitors 30D (All)` | `RT - Viewed 18 QT - 30D` · `Past Purchase L90 via Pixel Data` · `Dealer Buyers (EXCLUSION)` | **$20/day** |
| `RT 30D - 18QT` | `RT - Viewed 18 QT - 30D` | `Past Purchase L90 via Pixel Data` · `Dealer Buyers (EXCLUSION)` | **$10/day** |

Both: **US, minimum age 24**, the same floor as the IW campaign *(decisions, 2026-09-09)*. ⚠️ Copying in
a saved audience resets the age to 18 *(finish-the-IW-draft)*. Re-check it after any copy-in.

**Why split by product, not by recency.** The pot and 18 QT ads answer different objections: "is it
worth the money" for a pot, "is it only a fish fryer" for the 18 QT *(evergreen-ad-copy)*. One ad set
would show the fryer ad to someone who looked at a 120 QT. People who viewed both land in the 18 QT set.
That's accepted, because the alternative needs a third "pot viewers" audience. Recency layers (7D, cart
abandoners) come later, when the budget can carry more than two ad sets.

**Two deliberate departures from the playbook's retargeting structure** (7-day visitors + add-to-cart +
IG/FB engagers):
- **No IG/FB engagers, no video viewers, no windows past 30 days.** None of those is inside the IW
  campaign's exclusion. Adding them means editing the live IW campaign.
- **No separate 7-day or add-to-cart ad set.** Both groups already sit inside the 30D ad sets. At $30/day,
  more ad sets means thinner data.

### How it stays clear of the IW campaign

- The IW ad set excludes `Website Visitors 30D (All)` as a **hard control**: *"We won't reach people
  beyond these settings, even with Advantage+ on"* *(finish-the-IW-draft, Step 5)*.
- Both retargeting ad sets include only that audience or a subset of it: same pixel, 30 days or fewer.
- **So nobody can be in both campaigns, and the live IW campaign needs no edit.**
- **Standing rule:** never widen retargeting past 30 days or add a non-website source unless the same
  audience goes into the IW campaign's exclusions first. That's a live edit, Evan's click, and it
  probably resets learning.

### The Aug 28 spike and the pool

- **Fact:** Aug 28 had 14,169 Shopify sessions against ~2,000 normal, 94% direct, 7 checkouts.
  Pixel `1861969194014116` logged 27,651 events that day *(Finn, 2026-09-10)*. **Cause untested.**
- **Fact:** the 7,200–8,500 figure is **Meta's own audience estimate**, read in Ads Manager on 2026-09-09
  *(new-campaign-plan footnote)*. So it counts people Meta has matched, not raw sessions.
- **Inference:** Meta audiences contain only people matched to a Meta account. Bot sessions without a
  logged-in Meta identity most likely never got in. The pixel firing and a person being matched are two
  separate steps. **Not tested.**
- **The test that settles it:** record `Website Visitors 30D (All)` now, while launch is held, and again
  on **Sept 28**, the day after Aug 28 leaves the window. A one-day drop well beyond normal decay means
  bots were in the audience. Either way the build doesn't change. If launch comes after Sept 28, the
  question goes away.

---

## 4. Budget, and where it comes from

| Line | $/day | Source |
|---|---|---|
| `BPM_TOF_Manual`: $60 + $62 + $42 | 164 | **Finn, Ads Manager, 2026-09-11 09:07–09:10 CDT.** Stays at $164; Jay's +25% is not being applied |
| `18qt-TOF-Prospecting` | 50 | Same read |
| IW lookalike | 100 | Same read |
| **Live caps** | **314** | Same read |
| **+ Retargeting** (approved) | **30** | Reserved inside the $344 on 2026-09-09 *(decisions · finish-the-IW-draft, Step 3 · overhead-method §8)* |
| **Committed at launch** | **344 of 350** | $6 of headroom *(derived)* |

- **The $30 doesn't break the ceiling.** It was always counted, and Finn's read confirms it.
- **While launch is held, the $30 stays reserved.** If anything else claims that room first, retargeting
  no longer fits and has to come out of something. Re-read the caps on launch day (§9).
- **What it competes with:** 18 QT ladder step one ($50 → $60) would take the total to $354
  *(overhead-method §8)*. It doesn't clash today: `18qt-TOF` sits at $40.56 against a $30 gate, so the
  ladder is shut. If the ladder qualifies before retargeting launches, Evan picks which one gets the money.
- **The 25% cap on low-ticket lines** is $86 at $344 *(overhead-method §6a, derived)*. Known low-ticket
  spend is `18qt-TOF` $50 + `RT 30D - 18QT` $10 = $60. The rest depends on how much the IW campaign
  spends on `hpc-dark-evergreen`, which isn't on file. It fits if that ad spends under ~$26/day
  *(derived)*. Finn watches it.
- **Now #1 context:** the whole $350 is under review in the 20%-net rebuild. $30/day is ~$900 a month
  *(derived)*. If warm traffic turns out to be the cheapest real orders we buy, it's the last line to
  cut. This test is how we find out whether it is.
- **End date: none, on purpose** *(approved, Evan, 2026-09-11)*. Always-on retargeting is the goal, and
  the stop rules end it. Review dates are in §10.

---

## 5. Creative by segment

### Week 1: the two held concepts

| Ad set | Ad name | Files (`my-skills/hpc-ad-creative/work/creative/library/`) | Copy | Destination |
|---|---|---|---|---|
| Pots | `rt-80qt-buy-cheap-twice-a` | 1:1 `2026-08-27_80qt-powered_buy-cheap-twice_1080x1080_v1.png` · 9:16 `2026-09-08_80qt-powered_buy-cheap-twice_1080x1920_v1.png` · 1.91:1 `2026-09-08_80qt-powered_buy-cheap-twice_1200x628_v1.png` | **Version A**, cost to own | `/products/80-qt-powered-seafood-cooker` |
| Pots | `rt-80qt-buy-cheap-twice-b` | Same three files | **Version B**, cost to run | Same |
| 18 QT | `rt-18qt-fry-it-all` | `2026-09-08_18qt-fryer_fry-it-all_` 1080x1080 · 1080x1920 · 1200x628 | **Version A**, year round · headline `More Than A Fish Fryer.` · description `18 QT powered. Year round.` | `/products/18-qt-fish-fryer` |

- Both pot ads use headline `Buy Once. Boil For Years.` and description `4mm cast. Built to last.` Copy is
  verbatim from [evergreen-ad-copy](../2026-09-labor-day/2026-09-09-evergreen-ad-copy.md), §2 and §5.
- **`buy-cheap-twice` Version B is back in** *(Evan, 2026-09-11)*. It runs as a second ad in the pots set.
  At $20/day the A/B split won't produce a readable winner, so don't claim one. It does put both halves
  of the price answer in front of the warm buyer.
- **The 18 QT set runs Version A only.** Its $10/day can't carry a second ad.
- The 80 QT 1:1 carries the short `5-YR RESIDENTIAL WARRANTY` badge from `yeti-1x1.html`. **Evan approved
  it on the 80 QT** *(decisions, 2026-09-08)*. Not re-opened.
- **Known gap:** the pots set includes everyone who viewed a Performance pot, the Triple Jet or the
  Platinum Bundle, which is the main push. Week 1 shows them an 80 QT *Powered*. The argument (4mm,
  Tunnel Tubes on the bottom, propane, warranty) holds for both lines, so it's usable. **But the main
  push needs its own retargeting ad. That's Maya's first job.**
- Check that the Aug 27 80 QT 1:1 is in Meta's **Account images**. It was on the Sept 8 upload list, and
  whether it was uploaded isn't on file.

### Maya, Sept 16–22: three objection statics, each at 1:1, 9:16 and 1.91:1

**Audience:** visited in the last 30 days, didn't buy. They know the product; they stalled. **Job:** remove
the objection with quality. **Never defend price.** The statics can be built while launch is held.

| # | Ad set | Angle | Destination | Grounding |
|---|---|---|---|---|
| 1 | Pots | **The main push:** a Performance pot works on the burner you already own; Tunnel Tubes are in the pot. Pairs with the Triple Jet | Performance PDP (80/100/120) or the Platinum Bundle. Don't use "you only need the pot" if it points at the bundle | what-we-sell 1A · decisions 2026-09-09 (bundle vs Version B) |
| 2 | Pots | **Social proof:** verified-buyer verbatim, 4.83★ across 752 product reviews | The pot's PDP | reviews.io, 2026-08-26 · customer-language: reviews outrank price 6:1 |
| 3 | 18 QT | **Tailgate season, and it gets there fast:** "most orders ship in 1–2 business days" | `/products/18-qt-fish-fryer` | who-we-are · our-clients ("most orders") · seasonal calendar (Sept–Oct tailgating) |

**Constraints to hand her, and to check her output against before it reaches Evan:**
- No discount, code, percentage or date. Post-sale evergreen.
- Warranty only with both qualifiers (residential, 120 QT or smaller). Never on the 160 QT, the Gallon
  line or a steamer. ⛔ Nothing built from `yeti-1x1.html` points at those.
- Tunnel Tubes are on the **bottom of the pot**. The technology is in the pot, not the burner.
- Rolling or raging boil; never "hard boil." Never put fryers with crawfish. Qualify every number.
- Shipping is **"most orders"** in 1–2 business days, never a flat promise.
- **"Made in USA" and "Built in Louisiana" are approved claims** *(Evan, 2026-09-11)*. If a static needs a
  team line, use Evan's: **"Built by hand by our 12-man team here in South Louisiana."** *(The BOARD
  landmine still reads the old rule; it gets updated at the next /wrap.)*
- Never name a competitor; "thin pots" is fine.
- **Propane:** the only calculator on the site is `/pages/commercial-savings-calculator`, the commercial
  one *(Shopify pages, 2026-09-11)*. Don't send residential pot viewers there.
- **Financing:** a `/pages/customer-financing` page is live *(Shopify, 2026-09-11)*, but the provider and
  terms aren't on file. No financing claim until they are.
- Ad names are final before publish (`rt-<product>-<angle>`). A rename splits `utm_content`.

### What Garrett's video adds later

No separate spend. Fold these into the 8-video bundle Evan is booking ($2,500 for 8, our-team.md).

| Asset | Ad set | Why |
|---|---|---|
| **15–20s cut of the 18 QT video** (on the Waiting list since 09-01) | 18 QT | A trim, not a shoot. The 66.9s cut is long *(18qt video build sheet)* |
| **Running-clock boil on a Performance pot on the Triple Jet** | Pots | "See the speed." Proof of the one claim we own, for the main push |
| **Tunnel Tubes up close** (the high-res still has been on order since 09-08) | Pots | Answers "why is it worth it" with the weld, not the price |
| **From Oct 1: Jay's 30 QT demo** as an existing post | Pots | Best CPP in the account ($19.41 × 13, Meta's count, 2026-09-09). Turkey ads launch Oct 1 *(seasonal calendar)*. An existing post keeps its social proof and costs nothing to produce |

---

## 6. Tracking

The same string as the [IW tag spec](../2026-09-labor-day/2026-09-10-iw-tracking-tags.md), on every ad:

```
utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}
```

| Level | Name, final before publish |
|---|---|
| Campaign | `Retargeting - Site Visitors 30D - Sept 2026` *(if launch slips into October, rename it before publish, never after)* |
| Ad sets | `RT 30D - Pots` · `RT 30D - 18QT` |
| Ads | `rt-80qt-buy-cheap-twice-a` · `rt-80qt-buy-cheap-twice-b` · `rt-18qt-fry-it-all` |

- **No "(DRAFT)" in any name.** Meta carries it into the tag.
- **No renames after launch.** A rename splits the history.
- The `rt-` prefix keeps `utm_content` distinct from the same creative's name in other campaigns.
- **Shop destination off, Messenger off, on each ad.** Check on screen before publishing. `crowd-math`
  published before its Shop setting could be re-read (BOARD).
- **Preview → click through:** the address bar ends in `?utm_source=facebook…` and the page loads.

---

## 7. Attribution settings stay fixed

- **Why:** the attribution setting controls two things at once: which purchases Meta counts, and who it
  optimizes toward. Change it mid-test and both the delivery and the yardstick move. Days before and
  after can't be compared, and the $40/$60 rules stop meaning what they meant when they were set.
- **At build:** record the setting on each ad set, and read the IW campaign's the same way.
  **Coalition said the account runs 7-day click / 1-day view** *(Coalition call, 2026-09-10)*. **That's
  their claim, not checked in Ads Manager.**
- **To read it more than one way without changing anything:** use the "Compare attribution settings"
  columns. They're reporting only. Read **7-day click** alongside the default. On retargeting,
  view-through over-credits the most: a warm visitor who would have bought anyway sees a cheap
  impression, then buys *(inference: general mechanism, not measured for HPC)*.
- **Who can touch it:** Meta is Evan's lane. **Coalition is a read-only secondary advisor, like
  IntentWave** *(Evan, 2026-09-11)*. Nobody changes attribution mid-test. That also protects the IW
  lookalike read (Finn, ~Sept 14).

---

## 8. Stop and scale rules

Read per ad set, trailing 7 days, **once a day, not hourly**.

**On file (Jay has seen these, 2026-09-09):**

| Signal | Action |
|---|---|
| Frequency > **3.5** | **Cut that ad set's budget by a third.** Don't widen the audience: widening past 30 days crosses the IW campaign *(the "by a third" is ROUX's detail)* |
| CPP > **$60** after 4 days | **Pause** that ad set |
| CPP < **$40** | Working. Keep it |

**Per-product "working" lines — approved (Evan, 2026-09-11):**

| Ad set | "Working" line on Meta's count | Why |
|---|---|---|
| **18 QT** | **≤ $30**, not $40. From $30 to $40: keep it, don't scale it | The 18 QT gate on Meta's count is **$29.36–$39.82**, 40% of the incremental ceiling ($73.39–$99.55) *(overhead-method §3, §6b)*. The ladder already uses $30 |
| **Pots** | **≤ $40**, as on file | Pot gates run **$66.26–$78.14**. The $60 pause is stricter than the incremental rule needs. Keep it anyway; it's what Jay was told |

- The 40% gate assumes Meta over-counts by up to 2.5×. **That's a judgment, not a measured figure**
  *(overhead-method §6b)*.
- For the 80 QT Powered itself: no incremental ceiling is on file. The pot rows are 120 QT Powered,
  Performance and Platinum.

**Scale rules:**
- **No increases for the first 14 days.** Cuts and pauses only.
- After day 14, raise an ad set only if **all** of these hold: trailing-7 frequency ≤ 2.5 · CPP inside
  its working line · **Shopify shows tagged orders from it.** Steps of 20% at most, at least 3 days
  apart *(playbook)*.
- **Zero tagged Shopify orders at day 14 means no raise, whatever Meta's CPP says.**
- **Any raise is a swap.** There's $6 of headroom. The obvious donor is `BPM_TOF_Manual` (frequency 5.05,
  Sept 1–7). Evan's call.
- **If frequency hits its cap before CPP does**, the set has run out of audience, not money. That's the
  trigger to revisit the IW list under §1's two conditions, not to widen the window.
- **If launch lands before Sept 28:** Aug 28 leaves the window that day. Don't read a before/after change
  as a trend without saying so.

---

## 9. Pre-launch checklist — run it on the day Evan sets a date

**Done**
- [x] **Finn:** live daily budgets read in Ads Manager, 2026-09-11 09:07–09:10 CDT: **$314/day**
      (BPM $164 · `18qt-TOF` $50 · IW $100).

**On launch day (read-only)**
- [ ] **Finn:** re-read the live caps. Still $314? Anything added since the hold means the $30 no longer
      fits under $350.
- [ ] **Evan:** check the IW ad set still shows the `Website Visitors 30D (All)` exclusion. Read it from
      the audience summary, not the edit panel, which queues drafts. If a panel gets opened, close it
      and confirm "Review and publish" still reads zero.
- [ ] **Evan:** Events Manager, which business owns `491960645999331`? (Jay has been asked.) This blocks
      *reading* results, not launch (BOARD).

**Build, in draft (Evan's clicks)**
- [ ] **Build check #1:** a new Sales campaign with ad-set budgets. The ad set must offer a **hard**
      custom-audience inclusion. If it only offers "Suggest an audience", stop.
- [ ] Create `RT - Viewed 18 QT - 30D` (URL contains `18-qt`, 30 days, pixel `1861969194014116`).
- [ ] Record the audience sizes: `Website Visitors 30D (All)` · `RT - Viewed 18 QT - 30D` · each ad set's
      estimate. **If the 18 QT audience is under ~2,000, start that set at $5 and move $5 to Pots**
      (on-file rough guide: ~$20/day per 4,000 people).
- [ ] Each ad set: Website · pixel `1861969194014116` · Purchase · Maximize number of conversions · ad-set
      budget $20 / $10 · **no end date (deliberate)** · US · **age 24+** · exclusions per §3.
- [ ] Attribution setting recorded on both ad sets; matches the IW campaign.
- [ ] Advantage+ placements; all three sizes attached; crops checked in Preview.
- [ ] Advantage+ creative enhancements off; multi-advertiser ads off.
- [ ] Copy is verbatim from the copy file (pots: A and B; 18 QT: A). No code, %, or date. The warranty
      line carries both qualifiers.
- [ ] URL parameters pasted. Preview click-through shows the tags and the page loads.
- [ ] **Shop destination off and Messenger off, on each ad, confirmed on screen.**
- [ ] Names final, no "(DRAFT)". Files present in Account images.

**Publish**
- [ ] Publish, then **"Review and publish" reads zero.** The first click on Sept 11 published 1 of 3 ads.
- [ ] The campaign, both ad sets and all three ads show Scheduled or Active. None is left In draft.
- [ ] ⛔ Skip Meta's "Apply now" suggestions (Maximize value, show products).
- [ ] Log it in decisions.md: launch date, budgets, audience sizes, attribution setting, no end date.

---

## 10. How Finn measures it against Shopify

**The read:**
- Shopify orders whose **last-visit `utm_campaign` = `Retargeting - Site Visitors 30D - Sept 2026`**, or
  whatever the campaign is named at publish. Split by `utm_term` (ad set) and `utm_content` (ad).
  First-visit matches are counted separately.
- For each group: order count · **net** (after discounts and refunds) · AOV · product mix (18 QT vs
  pots, burner, bundle) · how many buyers had an earlier order. The purchaser exclusion only covers
  pixel-tracked buyers from the last 90 days.
- **Compare with Meta's claimed purchases** over the same window, on the default and 7-day click columns.
  The gap is Meta's over-claim.
- **The incremental test per order:** net − landed COGS (Shopify `unitCost`) − variable costs − (spend ÷
  orders) ≥ 20% of net. Show it twice: on Meta's count and on Shopify's tagged count.

**What it can and can't say:**
- The tagged count is a **floor**. It misses view-through, cross-device, and people who come back by
  typing the URL. Meta's claim is the upper bound. On prospecting, Shopify sees 15–19% of Meta's
  count *(order-level-pulls)*. Nothing on file says where the truth sits *(overhead-method §4D)*.
- **At $30/day this can't measure incrementality.** A holdout or lift study isn't feasible at this
  spend *(judgment)*. Say so every time; never dress a tagged count up as incremental.
- Retargeted people can also be in Biljana's add-to-cart and abandoned-checkout flows, which use the IW
  list *(Evan, 2026-09-11)*. Last click goes to whoever touched them last. We note it and don't analyse
  email.
- Don't read Events Manager totals until pixel `491960645999331` has an owner.

**Schedule, counted from launch:**

| When | Read |
|---|---|
| Day 1 | Every ad set is spending; no errors |
| Day 4 | Stop rules, on Meta's numbers |
| Day 7 | First Shopify tagged-order read |
| **Day 14** | **The gate for any scaling** (§8) |
| Sept 28 *(calendar date, launch or not)* | Audience size again, now that Aug 28 has left the window (§3) |
| Oct 1 *(calendar date)* | Creative review: turkey window, Jay's 30 QT demo, Garrett's cut |
| November | **The verdict** — as the 2026-09-09 plan set it, "judge it in November, not in two weeks" |

Plus the store-level sanity check from overhead-method §6b: Shopify 18 QT and pot orders from **all**
sources, trailing 14 days, against the prior 14 and the same weeks of 2025. Directional only.

---

## 11. Blocked, and on whom

| Item | Owner | Blocks |
|---|---|---|
| **Launch date** | **Evan** — held 2026-09-11 | Everything below the build line |
| Build check #1: hard inclusion possible? | **Evan** | The rest of the build |
| Create audiences, build, publish | **Evan** | Launch |
| Launch-day re-read of live caps | **Finn** (read-only) | Launch |
| Owner of pixel `491960645999331` | **Jay** (asked); IntentWave Q1 if he doesn't know | Reading results, not launch |
| Main-push, social-proof and 18 QT statics | **Maya**, Sept 16–22 | Week 2 creative, not launch |
| 15–20s 18 QT cut · clock boil · Tunnel Tube still | **Evan** to book Garrett (waiting since 09-01) · **Garrett** for the still (since 09-08) | Later creative |
| The two questions (§1) | **IntentWave**, via Evan | Any use of the IW list beyond the seed |
| Adopt the incremental rule | **Jay** | Whether the incremental gates behind §8 become formal company-wide |
| The $350 ceiling (Now #1 rebuild) | **ROUX → Jay** | Any raise |

---

## Decided (Evan, 2026-09-11)

1. **Plan approved, launch held.** No date yet.
2. **Two product ad sets:** $20/day Pots, $10/day 18 QT.
3. **The IW list stays out of retargeting.** This reverses the Aug 31 build guides.
4. **The 18 QT "working" line is $30, not $40.**
5. **No end date**, on purpose.
6. **Coalition is a read-only secondary advisor, like IntentWave.** No attribution changes.
7. **"Made in USA" and "Built in Louisiana" are approved claims.** `buy-cheap-twice` Version B is back in.
8. **Budget confirmed:** $314 live caps, $344 of $350 with retargeting. BPM stays at $164.

**Still open:** the launch date (Evan).

---

*Sources: BOARD and decisions.md (2026-09-11) · paid-media playbook · 2026-09-09 off-season plan ·
finish-the-IW-draft · IW tag spec · evergreen-ad-copy · LIBRARY-LOG · overhead-method-options
(2026-09-10) · IW recap reviews (2026-09-10) · Coalition recap review (2026-09-10) ·
channels-and-accounts · our-team · NEXT-SESSION · new-campaign-plan (2026-09-09) · Finn, Ads Manager
budget read (2026-09-11) · Evan's decisions via the session (2026-09-11) · Shopify product and page
handles, read-only, 2026-09-11. Meta figures are platform-reported. Shopify is the source of truth for
revenue.*
