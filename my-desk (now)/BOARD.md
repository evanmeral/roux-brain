# Board — 2026-09-11 (evening close)

> The one page. What is live, what is next, what is waiting, what not to ship.
> **Rewritten in place at every `/wrap` — never appended.** Hard cap: 120 lines.
> Anything that falls off goes to [archive/](archive/), never deleted.
> Decisions and their reasons go to [decisions.md](decisions.md).

---

## 🟢 Running

### 🟢 IW lookalike — **live since Fri Sept 11**, ad set *Learning* (Finn, 09:07 CDT)

**`IW Lookalike 1% - Cold Prospecting - Sept 2026`** · ad set `IW LAL 1% - Cold Prospecting`

| | |
|---|---|
| Audience | Lookalike off `IW - LA Audience` — **2.3–2.8M**, US, 24+ · excludes 30D visitors · 90D purchasers · dealers *(hard Controls)* |
| Budget | **$100/day** CBO |
| Ads | `120qt-crowd-math` · `120qt-performance_rolling-boil` (Platinum Bundle) · `hpc-dark-evergreen` (18 QT → Evan's landing page) |
| Tracking | **Tags on all 3** → [tag spec](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-10-iw-tracking-tags.md) · **Shop destination off on all 3** (`crowd-math` checked by Evan, 2026-09-11) |

- **Next: first Shopify read of tagged orders (Finn) ~Mon Sept 14.** Match `utm_campaign` to the campaign name and compare with Meta's claimed purchases (Meta side now read through the **Meta connector**, not Chrome). ⛔ Skip Meta's "Apply now" suggestions (Maximize value · show products). After any publish, check "Review and publish" reads zero. → [how it was built](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-09-finish-the-IW-draft.md) · [ad copy](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-09-evergreen-ad-copy.md)
- ⚠️ **The lookalike sits under "Suggest an audience," not Controls** *(Finn, 2026-09-10)*. Only age, US and the exclusions are hard, so the test is "Advantage+ seeded with IW's list," not "IW's 2.3–2.8M."
- **18 QT ad stays in (ROUX's call).** Incremental ceiling ~$73 per real order; it counts toward the **25% cap on low-ticket lines**. **Watch its share of purchases.**
- 🟢 **Coalition and IntentWave are read-only advisors on Meta.** No setting or attribution changes during this test (Evan, 2026-09-11).

### 📡 Also live — `BPM_TOF_Manual` ($164/day) + `18qt-TOF-Prospecting` ($50/day CBO)

**30-day Meta spend $6,400.87** (Aug 10–Sep 8): BPM $4,899.88 · 18qt $1,500.99 *(Ads Manager, 2026-09-10)*. BPM runs on **video**. Best: `Video_Jay 30qt Demo` **$19.41** (13) · `Video_Jay 18qt Demo` $43.04 (30). `18qt-TOF` is *Learning limited*. *(CPP on Meta's own count, 2026-09-09.)* **BPM stays at $164; Jay's +25% is not applied** (Evan, 2026-09-11).

---

## 🔺 Now — top three

**1. Bundles: all three kits approved. Fix the codes, then Evan builds. The tailgate kit goes live Sep 25.** Jay approved 2026-09-11: tailgate **$465** · turkey 30 QT **$469** · 60 QT two-bird **$519**, every code skips bundles except military/first-responder, the kits are **evergreen**, the turkey push stops at the **Mon Nov 23** ship cutoff, and **Evan builds**. Evan changed the tailgate contents after approval (18 QT fryer · legs · **5"** thermometer · skimmer; no wind shield), and $479 would have saved only $5.98, so Jay re-OK'd **$465**. **Welcome10 stays off bundles; military + first-responder stay on** (Jay). ⚠️ **Code fix first:** most codes are whole-order discounts, which Shopify can't scope to a collection, so they have to be **recreated**. → [plan](../my-work%20%28outputs%29/internal/2026-09-11-tailgate-thanksgiving-bundles-plan.md) · [Jay one-pager](../my-work%20%28outputs%29/internal/2026-09-11-bundles-for-jay.md) · [code fix](../my-work%20%28outputs%29/internal/2026-09-11-bundle-discount-code-fix.md)

**2. ROUX: rebuild the marketing budget around 20% net.** Jay's P&L, last 365 days *(2026-09-10)*: net **−5%** · marketing **$676k** (Google $206k · Meta $258k · agency fees $152k · other $56k · affiliates ~$4k) · real margin **~40.6% of ~$3.9M** · overhead ~$49,550/mo. 20% net leaves **~$209k/yr for all marketing** *(derived)*, so we were **~$467k over**. **Build on today's run-rate:** Meta spent $6,401 in the last 30 days. **Incremental rule:** no overhead in the ad ceiling; each ad leaves ≥20% of the order after product, fees and the ad *(ROUX's recommendation; Jay hasn't adopted it)*. Google is Coalition's (suggestions only). ⛔ Email is Biljana's. → [overhead method + P&L](../my-work%20%28outputs%29/internal/reports/2026-09-10-overhead-method-options.md)

**3. Garrett: book the 8-pack and shoot the turkey demo first.** The turkey video has to be **live Oct 1**, so it shoots **Sept 14–18** (Sept 21–23 at the latest). Slate, ranked: 30 QT turkey demo (Jay) · 7-minute clock, 120 QT · "buy it once" · tailgate 18 QT + 60 QT · team of 12 · 18 QT fry-it-all · pasta/sauce · 28 QT steamer. $2,500 for 8 is new money (the Aug 19 buy was 2 videos, $1,000). The 15–20s 18 QT cut is already delivered. Meta formats only. → [call prep](../my-work%20%28outputs%29/internal/2026-09-11-garrett-call-prep.md)

---

## ⏳ Waiting on

| Who | What | Since |
|---|---|---|
| **Evan + Jay** | **Review the [discount-code sheet](https://docs.google.com/spreadsheets/d/1953VVT0CvlnuV1rz2tfpPAuVSk9h6hCUvD6HXc9N9_c/edit)** (378 active; Evan's decisions pre-filled in the Decision column) and decide what to turn off. Still open for Jay: early-Nov 2025 promo? · fix Platinum's compare-at? · adopt the incremental rule? | 2026-09-11 |
| **Jay** | Whose is the second Meta pixel `491960645999331`? Evan asking | 2026-09-11 |
| **Evan** | **Code fix** (recreate the whole-order codes so they skip bundles; military + first-responder exempt; Biljana's email/SMS codes are hers), then **build the 3 kits** · delete `RM40JAY`, `CWBSM40`, `USATHANKS` in Shopify (Jay/Evan: delete) | 2026-09-11 |
| **Evan** | Add the warranty exception to `SAFETY.md` (only Evan edits it; it wins until he does): a creative showing only a qualifying pot may say "5-YR RESIDENTIAL" without the size | 2026-09-11 |
| **Evan** | Set the Garrett call time | 2026-09-01 |
| **Coalition** | Google Ads copy spreadsheet (Connor). Evan passes it to the brain to mine · Cater + Event reply, Mar 22–25 | 2026-09-10 |
| **Garrett** | High-res tunnel-tube-in-action still. Library's only one is **640×323** | 2026-09-08 |

---

## ⏸️ Parked — deliberately, do not re-raise

- **Retargeting: plan approved, launch held** (Evan, 2026-09-11). **Why:** wait before adding another new campaign. When it goes: two ad sets, **$20/day pots + $10/day 18 QT** · fits $344 of the $350 ceiling · the IW audience stays out (it seeds the lookalike; Biljana uses the list) · IW pixel is CIPA compliant · 18 QT "working" = ≤$30 CPP · no end date · creative: `80qt-buy-cheap-twice` v3 (approved into `library/` 2026-09-11, Built in Louisiana, no "cast") + `18qt-fry-it-all`, Maya's statics to follow. ⚠️ The 30D pool is padded by the Aug 28 bot-like spike until ~Sept 27 (cause untested). Settle the second pixel before reading results. → [plan](../my-work%20%28outputs%29/content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md)
- ✅ **Jay and Robert briefed 2026-09-09.** Future reporting stays consistent with what they hold: 126 orders / $41,100.84 / AOV $326.20. **Owner numbers come from Jay, not Robert**, in one text with every essential question. · ✅ **Closed by Evan 2026-09-08:** sale comms · **popups are Biljana's** · always-on codes are welcome codes and **cannot combine with a live sale**.
- **IntentWave and Coalition are advisors, not a work queue.** Call "action items" are often Evan spitballing. Parked IW ideas: **On3** (Pete's lane, no seeded product without a signed deliverable) · Peter's paid proposal (**Jay agreed to nothing**) · 24-buyer audience (below Meta's 100 minimum). → [IW 1](../my-work%20%28outputs%29/internal/2026-09-10-intentwave-recap-review.md) · [IW 2](../my-work%20%28outputs%29/internal/2026-09-10-intentwave-call-2-recap.md) · [Coalition Sept 10](../my-work%20%28outputs%29/internal/2026-09-10-coalition-alignment-recap-review.md)
- **CAC ceilings: v3 + overhead method (2026-09-10).** Landed cost = Shopify `unitCost` (Jay). Under the incremental rule the 18 QT ceiling is ~$73; at Meta's $40.56 it fails the $30 gate, so **hold `18qt-TOF` at $50/day. $350/day holds.** → [v3](../my-work%20%28outputs%29/internal/reports/2026-09-10-cac-ceilings-v3.md)
- **Sept 1–8 Meta ad-level re-pull (Finn).** The Meta connector may now reach the older campaigns' numeric IDs (untested). It needs them (24 Meta-tagged orders vs 155 claimed, Aug 10–Sep 8). It only unblocks "which Labor Day creative won."
- **June–October off-season plan**: the real +$500K project. Starts after the post-mortem.
- **Creator brief.** ~17 idle creators on UpPromote. ⛔ Paid content is discontinued. · **Digit connects in a few weeks** (Evan, 2026-09-10). Stock is fine, so don't gate plans on inventory.
- **Lanes:** Google Ads + SEO is Coalition's, monitor only. **Email / SMS / Klaviyo is Biljana's**, and we stay out.
- ✅ **NOLA Home & Garden Show, Feb 19–21 2027: booked and paid.** 🔥 No propane in the hall, so the demo is video with a running clock. ⛔ Louisiana Outdoor Expo and the Nov 11 Cater-Event Expo are a **no**.
- **Shopify cleanup (a write, so Evan's or Jay's click):** Triple Jet compare-at = price · Scratch & Dent Performance variants carry the Powered cost · SKU `PW30-VLV075-TFR-B-SBI` on two products · two 18 QT variants with compare-at below price · 25 active products not on the Online Store. → [landed-cost pull](../my-work%20%28outputs%29/internal/reports/2026-09-10-landed-cost-by-variant.md)
- **Nova's queue:** ad naming/build process · missing-end-date checklist line · **`maya.md` still lists 1080×1350 as PAID** · `check-centering.py` hardcodes `BAND` · duplicate Performance pots listing · `Commercial Cookers On Sale` has 0 products but is linked from the homepage FAQ.

---

## ⛔ Landmines — do not ship these

- **Warranty: read the live page and write from it.** Full 2-year on everything; limited 5-year residential, 120 QT or smaller. ⛔ **Never 5-year on the 160 QT, 80–140 Gallon, or any steamer.** `yeti-1x1.html` hardcodes one at line 37; making it a variable is **Nova's job.** Evan's exception (2026-09-11): a qualifying-pot creative may drop the size qualifier, but it's pending his `SAFETY.md` edit.
- ⛔ **Pots are 4mm aluminum, never "cast"** (Evan, 2026-09-11). The live `hpc-dark-evergreen` ad still says it. **Kept as is to avoid a learning reset** (Evan). At its next refresh, swap in the approved v2 from `library/` and the "4mm aluminum" copy. Never reuse the old copy → [audit](../my-work%20%28outputs%29/content/ads/2026-09-11-live-ad-claims-audit.md).
- ⛔ **No "Made in USA" until the pots are made in-house** (Evan, 2026-09-11). The base pot is bought from China. **Use "Built in Louisiana" / "Hand-welded in Louisiana" / "Built in the USA"** (Jay: we build them here). Still stamped "MADE IN USA": `yeti-1x1.html` only (not live). The submitted NOLA directory text stays as is (Evan: low risk).
- ⛔ **No sitewide % discount before November.** AOV $326.20, down 21.4% YoY.
- ⛔ **No discount code on a bundle, and no kit goes live before the code fix.** Today codes do stack: 33 of ~70 bundle orders from Jun 1 to Sep 10 had a discount, **$2,000.20** *(Shopify, checked two ways, 2026-09-11)*.
- ⛔ **Dormant BM Digital budgets in Meta.** "BM | ASC+ | CBO | Creative Testing" ($200/day) and "BM | TOF | CBO | Internal Whitelisting" ($100/day) are off but still carry budgets. Two BM ABO campaigns have the campaign switch **on** with every ad set off, so turning on one ad set starts spend. Any of these breaks the $350 ceiling *(Finn, 2026-09-11)*.
- ⛔ **Do not say which Labor Day creative won.** Suspended until Finn re-pulls.
- ⛔ **Never show Shopify net ÷ Meta spend as ROAS.** It credits Meta with freight, a lawn mower, Biljana's email and Coalition's Google. ⛔ **Never quote a cost-per-customer figure.** "$40 CAC" on calls is Meta cost per purchase.
- ⛔ **Meta connector: no write without Evan's explicit yes for that specific change; publishing is blocked outright** (Evan, 2026-09-11). HP Cookers ADs only. Also enforced in `.claude/settings.json` → [rules](../my-business%20%28context%29/hpc-standing-rules.md)
- ⛔ **Use the real margin (~40.6%), not the booked 46%**, and **never the 44.5% August margin**. Don't mix P&L revenue (~$3.9M) and Shopify ($3.14M) in one ratio.
- ⛔ **Vendor call figures are not facts:** IW's "$54,800 Meta spend" (real: $6,337) · "$674 18 QT AOV" (Shopify: $419) · Coalition's Google "$87,724 / 5.47 ROAS" and "Revenue Up 199.03% YoY" are unverified against Shopify.
- ⛔ **No 30%-off legs in November.** v3: at best a wash (−$3.57 with fees).
- ⛔ **`2026-08-27_laborday-vintage_multi-product_1080x1350_v1.png` is NOT evergreen**: sale, codes and dates are on its face.
- **Showroom cards carry no warranty line and no price date** (deliberate). Re-pull `products.json` before every print run.
- **Never quote a price not in** [what-we-sell.md](../my-business%20%28context%29/what-we-sell.md); **Shopify prices always win.** **Never name a competitor, and never say "Yeti"** in anything customers see.

---

## 📊 Numbers at a glance

Source of truth → [metrics-and-goals.md](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md). **AOV is net ÷ orders throughout.**

| Figure | Value | Source · date |
|---|---|---|
| ⭐ **Sale, Sept 1–8 2026** | **126 orders · $41,100.84 net · AOV $326.20** · vs 2025: 63 · $26,144.22 · $414.99 | Shopify, verified 2026-09-09 |
| **Last 30 days, Aug 11–Sep 9** | **321 orders · $115,971.64 net** · $130,902.88 total sales incl. ship + tax | ShopifyQL, 2026-09-10 |
| **Meta spend, 30 days** | **$6,400.87** (Aug 10–Sep 8) · Shopify credits Meta $7,780 last click · $14,258 any click | Ads Manager · ShopifyQL, 2026-09-10 |
| **Meta live daily caps** | **$314/day** (IW $100 · 18qt $50 · BPM $164) · +$30 retargeting when it launches = $344 of $350 | Ads Manager, Finn, 2026-09-11 |
| **Meta spend, Sep 4–10** | **$1,403.19**, all in the 5 known ad sets: BPM $1,075.25 · 18qt $327.94 · IW $0 (launched Sep 11). Nothing else spending | Ads Manager, Finn, 2026-09-11 |
| 18 QT fryer orders, Aug 10–Sep 8 | 66 paid · AOV **$419.07** · only 4 at $600+ | Shopify, 2026-09-10 |
| ⭐ **P&L, last 365 days** | Revenue **$4.3M booked · ~$3.9M real** · net **−5%** · marketing **$676k** · COGS **$1.68M** · margin **46% of booked ≈ 40.6% of real** | Jay, 2026-09-10 · real margin derived |
| Shopify, same 365 days | Net sales $2,902,399.16 · shipping charged $242,199.97 · 6,442 orders | ShopifyQL, 2026-09-10 |
| Overhead | **$49,550/mo, steady** · $97.49/order, kept out of ad ceilings under the incremental rule | Jay 09-09/10 · Finn |
| ⚠️ Break-even blended ROAS ~2.4 | **Under revision**: built on the stale 44.5% margin | `paid-media.md`, 2026-08-26 |

⚠️ **Not on file, and not to be invented:** actual CAC · Google spend for the last 30 days · the new-vs-returning split for Sept 1–8.

---

## 🧭 Map

- **Playbooks** — [weekly rhythm](../my-workflows%20%28automations%29/playbooks/weekly-operating-rhythm.md) · [paid media](../my-workflows%20%28automations%29/playbooks/paid-media.md) · [content engine](../my-workflows%20%28automations%29/playbooks/content-engine.md) · [automation roadmap](../my-workflows%20%28automations%29/playbooks/automation-roadmap.md)
- **The business** — [who we are](../my-business%20%28context%29/who-we-are.md) · [what we sell](../my-business%20%28context%29/what-we-sell.md) · [our team](../my-business%20%28context%29/our-team.md) · [how we sound](../my-business%20%28context%29/how-we-sound.md) · [metrics & goals](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [seasonal calendar](../my-files%20%28knowledge%29/hpc-reference/seasonal-calendar.md) · [our clients](../my-business%20%28context%29/our-clients.md) · [customer language](../my-files%20%28knowledge%29/hpc-reference/customer-language.md) · [competitors](../my-files%20%28knowledge%29/hpc-reference/competitors.md) · [what we've tried](../my-files%20%28knowledge%29/hpc-reference/what-weve-tried.md) · [connected apps](../my-connections%20%28MCP%29/connected-apps.md)

*Standing rules: [hpc-standing-rules](../my-business%20%28context%29/hpc-standing-rules.md), under [SAFETY.md](../SAFETY.md) which wins on any conflict. Full history → [archive/](archive/)*
