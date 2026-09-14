# Board — 2026-09-14 (Monday close)

> The one page. What is live, what is next, what is waiting, what not to ship.
> **Rewritten in place at every `/wrap` — never appended.** Hard cap: 120 lines.
> Anything that falls off goes to [archive/](archive/), never deleted.
> Decisions and their reasons go to [decisions.md](decisions.md).

---

## 🟢 Running

### 🟢 IW lookalike — live since Fri Sept 11 · **first read done Sept 14 · HOLD, re-check Sept 18**

**`IW Lookalike 1% - Cold Prospecting - Sept 2026`** · ad set `IW LAL 1% - Cold Prospecting` · **$100/day CBO**

**First 3 days** *(Meta connector + Shopify, 2026-09-14)*: **$299.94** spend · 14,176 impr · 308 clicks · CPM $21.16 · CPC $0.97 · CTR 2.17% · **Meta claims 1 purchase, Shopify UTM-matched 0**, real net revenue **$0** · ⚠️ **still in Learning** (1 conversion toward exit). Ad split: `hpc-dark-evergreen` $179.69 · `120qt-performance_rolling-boil` $70.47 · `120qt-crowd-math` $49.78.

- **ROUX's call: hold. Do not cut, do not touch spend.** 3 days and $300 in Learning is noise, not signal — Meta needs ~50 conversions per ad set to stabilize. **Re-check Sept 18 (Day 7 / ~$700) or the moment Learning exits, whichever first.** If matched orders are still 0 and spend is past the $73/real-order ceiling, that becomes a real cut conversation. *(Evan agreed to hold, 2026-09-14.)*
- ⚠️ **`hpc-dark-evergreen` is taking 60% of spend and 62% of impressions.** That is Meta defaulting to the cheapest ad to deliver, **not** evidence the audience rejects Performance pots. It quietly adds to the 18 QT line's share against the 25% low-ticket cap. **Open question: give the two 120 QT ads a floor or their own ad set** so they are not starved before Learning ends.
- The 1-claimed-vs-0-matched gap is **consistent with** the over-claim already logged (24 matched vs 155 claimed, Aug 10–Sep 8), but n=1. Cause untested — could be modeled attribution, a stripped UTM, or a timing edge. → [tag spec](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-10-iw-tracking-tags.md)
- 🟢 Coalition and IntentWave stay read-only advisors on Meta. No setting or attribution changes during this test.

### 📡 Also live — `BPM_TOF_Manual` ($164/day) + `18qt-TOF-Prospecting` ($50/day CBO)

BPM runs on **video**. Best: `Video_Jay 30qt Demo` **$19.41** (13) · `Video_Jay 18qt Demo` $43.04 (30). `18qt-TOF` is *Learning limited*. **BPM stays at $164; Jay's +25% is not applied** (Evan, 2026-09-11). Sept 11–14 actual: BPM $557.09 · 18qt $167.79 · IW $299.94 — pacing at the $314/day baseline, ceiling not breached *(Finn, 2026-09-14)*.

---

## 🔺 Now — top three

**1. Bundles: code fix first, then Evan builds the three kits. Tailgate goes live Sep 25.** Jay approved: tailgate **$465** · turkey 30 QT **$469** · 60 QT two-bird **$519** · kits are **evergreen** · turkey push stops at the **Mon Nov 23** ship cutoff. ⚠️ **Code fix blocks the launch:** most codes are whole-order discounts, which Shopify cannot scope to a collection, so they must be **recreated** as product discounts pointed at "All Products - Eligible for Discounts," with that collection excluding anything tagged `Bundle`. **Exempt and staying whole-order: military, first responder, `USATHANKS`, `FANDF`.** → [plan](../my-work%20%28outputs%29/internal/2026-09-11-tailgate-thanksgiving-bundles-plan.md) · [Jay one-pager](../my-work%20%28outputs%29/internal/2026-09-11-bundles-for-jay.md) · [code fix](../my-work%20%28outputs%29/internal/2026-09-11-bundle-discount-code-fix.md)

**2. Garrett shoot: Tuesday Sept 22, HPC shop. Final 8 videos for $2,500, locked.** Priority order: 30 QT turkey demo, **Stephen** (live by Oct 1) · 60 QT shrimp boil demo, **Stephen** (proves "boils in under 7 min" — not 120 QT-exclusive, 30 QT and 60 QT carry it too when set up to boil, → [what-we-sell.md](../my-business%20%28context%29/what-we-sell.md)) · 18 QT fry-it-all remake, Jay · 18 QT tailgate-bundle video, **Jay + Stephen** (staged at the shop) · "buy it once" on the **60 QT** · shop interviews, staff interviewed while actively working, not sit-down · fried foods (funnel cake, blooming onion + a seafood TBD) · Monte Cristo, standalone. ⛔ **A-Z process video dropped** — no "start to finish build" until the pot is made in-house. **Standing rule: every video shows product physically in use, no talking heads.** Open: which seafood (shrimp/fish/soft-shell crab) — Evan's call, closer to the day. **Off for now:** pasta/sauce, steamer, 120 QT trade-show boil demo (off-season), Garrett's "Owner's Choice" seasoning idea (scrapped).
→ [shoot plan v4](../my-work%20%28outputs%29/internal/2026-09-14-garrett-shoot-plan-sept22.md) · [internal sheet](https://docs.google.com/spreadsheets/d/1ite_Mjxsw6qOj56J3zc1b9YUweJWaFf0qbL_elwiqz0/edit) · [Garrett-facing doc, ready for final read](https://docs.google.com/document/d/1feCok40JDRI_QGeuMRgZHox_KbX22FB1GwqoCizzJCk/edit) · [call prep](../my-work%20%28outputs%29/internal/2026-09-11-garrett-call-prep.md) · [decisions](decisions.md)

---

## ⏳ Waiting on

| Who | What | Since |
|---|---|---|
| **Evan** | **Code fix** (recreate the whole-order codes so they skip bundles), then **build the 3 kits** | 2026-09-11 |
| **Evan** | Delete **`RM40JAY`** and **`CWBSM40`** in Shopify — Jay confirmed 09-14. ⛔ **`USATHANKS` is NOT deleted** (reversed: it is a military code) | 2026-09-11 |
| **Evan** | Send Biljana the Slack message confirming which codes are hers, and whether her flows can take a renamed code | 2026-09-14 |
| **Jay → Evan → Garrett** | Jay completes the dream-client-profile questionnaire (expected Sept 15), Evan forwards it to Garrett | 2026-09-14 |
| **Finn** | **Scheduled: re-pull IW Meta numbers + Shopify UTM match on Sept 18** (Day 7 / ~$700), or sooner if Learning exits | 2026-09-14 |
| **Jay** | Whose is the second Meta pixel `491960645999331`? Evan asking | 2026-09-11 |
| **Coalition** | Google Ads copy spreadsheet (Connor). Evan passes it to the brain to mine · Cater + Event reply, Mar 22–25 | 2026-09-10 |
| **Garrett** | High-res tunnel-tube-in-action still. Library's only one is **640×323** | 2026-09-08 |

---

## ⏸️ Parked — deliberately, do not re-raise

- **Retargeting: plan approved, launch held** (Evan, 2026-09-11). **Why:** wait before adding another new campaign. When it goes: two ad sets, **$20/day pots + $10/day 18 QT** · fits $344 of the $350 ceiling · the IW audience stays out · IW pixel is CIPA compliant · 18 QT "working" = ≤$30 CPP · creative: `80qt-buy-cheap-twice` v3 + `18qt-fry-it-all`. ⚠️ The 30D pool is padded by the Aug 28 bot-like spike until ~Sept 27 (cause untested). Settle the second pixel before reading results. → [plan](../my-work%20%28outputs%29/content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md)
- ✅ **20%-net budget model: both open gaps closed** (Jay, 2026-09-14, text via Evan). Room confirmed **$290,600/yr** (double-count of the $6,800/mo agency retainer settled). Forward run-rate spend **~$380k–$417k/yr** → **~$89k–$126k/yr over**, far smaller than the earlier $467k read — agency fees and "other advertising" were mostly one-time BM Digital wreckage, now gone. **Google remains the one real lever (~71% of the room), still outside marketing's control.** Incremental per-ad rule is now Jay's official rule, not a recommendation. Coalition's actual current Google spend stays unchased (Evan's call, 2026-09-14 — the model's finding doesn't depend on it). → [model](../my-work%20%28outputs%29/internal/reports/2026-09-14-marketing-budget-model-20pct-net.md) · [decisions](decisions.md)
- ✅ **Discount-code sheet: reviewed and closed** (Evan + Jay, 2026-09-14). The one-time email/SMS signup codes **stay as they are** — they are not public, so no stacking risk. **AMP app keeps running** · **`HPCWS`** (23%, dead since 2021) left in place, harmless · **`FANDF`** stays whole-order on purpose, and **may reach a bundle line — that is accepted, not an oversight.** Do not "fix" it later.
- ✅ **Jay and Robert briefed 2026-09-09.** Reporting stays consistent with what they hold: 126 orders / $41,100.84 / AOV $326.20. **Owner numbers come from Jay, not Robert**, in one text with every essential question.
- **IntentWave and Coalition are advisors, not a work queue.** Call "action items" are often Evan spitballing. Parked IW ideas: **On3** (Pete's lane, no seeded product without a signed deliverable) · Peter's paid proposal (**Jay agreed to nothing**) · 24-buyer audience (below Meta's 100 minimum). → [IW 1](../my-work%20%28outputs%29/internal/2026-09-10-intentwave-recap-review.md) · [IW 2](../my-work%20%28outputs%29/internal/2026-09-10-intentwave-call-2-recap.md) · [Coalition Sept 10](../my-work%20%28outputs%29/internal/2026-09-10-coalition-alignment-recap-review.md)
- **CAC ceilings: v3 + overhead method (2026-09-10).** Landed cost = Shopify `unitCost` (Jay). Under the incremental rule **(Jay-adopted, 2026-09-14)** the 18 QT ceiling is ~$73; at Meta's $40.56 it fails the $30 gate, so **hold `18qt-TOF` at $50/day. $350/day holds.** → [v3](../my-work%20%28outputs%29/internal/reports/2026-09-10-cac-ceilings-v3.md)
- **Sept 1–8 Meta ad-level re-pull (Finn).** The connector may now reach the older campaigns' numeric IDs (untested). Needed for 24 Meta-tagged orders vs 155 claimed, Aug 10–Sep 8. Only unblocks "which Labor Day creative won."
- **June–October off-season plan**: the real +$500K project. Starts after the post-mortem.
- **Creator brief.** ~17 idle creators on UpPromote. ⛔ Paid content is discontinued. · **Digit connects in a few weeks.** Stock is fine, so don't gate plans on inventory.
- **Lanes:** Google Ads + SEO is Coalition's — **read-only monitoring is allowed** (Evan reconfirmed 2026-09-14: pull numbers when genuinely needed, change nothing). **Email / SMS / Klaviyo is Biljana's**, and we stay out.
- ✅ **NOLA Home & Garden Show, Feb 19–21 2027: booked and paid.** 🔥 No propane in the hall, so the demo is video with a running clock. ⛔ Louisiana Outdoor Expo and the Nov 11 Cater-Event Expo are a **no**.
- **Shopify cleanup (a write, so Evan's or Jay's click):** Triple Jet compare-at = price · Scratch & Dent Performance variants carry the Powered cost · SKU `PW30-VLV075-TFR-B-SBI` on two products · two 18 QT variants with compare-at below price · 25 active products not on the Online Store. → [landed-cost pull](../my-work%20%28outputs%29/internal/reports/2026-09-10-landed-cost-by-variant.md)
- **Nova's queue:** **Atlas OS follow-ups** — Weekly check as a headless button · Safari "Add to Dock" (Evan's click) · second-monitor layout when it arrives · remove the n8n agent and Venon from the connector list (Evan's click) · ad naming/build process · missing-end-date checklist line · **`maya.md` still lists 1080×1350 as PAID** · `check-centering.py` hardcodes `BAND` · duplicate Performance pots listing · `Commercial Cookers On Sale` has 0 products but is linked from the homepage FAQ.

---

## ⛔ Landmines — do not ship these

- **Warranty: read the live page and write from it.** Full 2-year on everything; limited 5-year residential, 120 QT or smaller. ⛔ **Never 5-year on the 160 QT, 80–140 Gallon, or any steamer.** ✅ **Exception now live in `SAFETY.md`** (Evan pasted it 2026-09-14): a creative showing **a single qualifying pot** may say "5-YR RESIDENTIAL WARRANTY" without the size qualifier. More than one pot, an unqualifying pot, a steamer or anything commercial → **both qualifiers, always.** `yeti-1x1.html` still hardcodes one at line 37; making it a variable is **Nova's job.**
- ⛔ **Pots are 4mm aluminum, never "cast"** (Evan, 2026-09-11). The live `hpc-dark-evergreen` ad still says it. **Kept as is to avoid a learning reset.** At its next refresh, swap in the approved v2 from `library/` and the "4mm aluminum" copy. Never reuse the old copy → [audit](../my-work%20%28outputs%29/content/ads/2026-09-11-live-ad-claims-audit.md).
- ⛔ **No "Made in USA" until the pots are made in-house.** The base pot is bought from China. **Use "Built in Louisiana" / "Hand-welded in Louisiana" / "Built in the USA."** Still stamped "MADE IN USA": `yeti-1x1.html` only (not live).
- ⛔ **No sitewide % discount before November.** AOV $326.20, down 21.4% YoY.
- ⛔ **No discount code on a bundle, and no kit goes live before the code fix.** Today codes do stack: 33 of ~70 bundle orders Jun 1–Sep 10 had a discount, **$2,000.20** *(Shopify, checked two ways)*. Exempt by design: military, first responder, `USATHANKS`, `FANDF`.
- ⛔ **Dormant BM Digital budgets in Meta.** "BM | ASC+ | CBO | Creative Testing" ($200/day) and "BM | TOF | CBO | Internal Whitelisting" ($100/day) are off but still carry budgets. Two BM ABO campaigns have the campaign switch **on** with every ad set off, so turning on one ad set starts spend. Any of these breaks the $350 ceiling. *(Confirmed $0 spend Sept 11–14, Finn.)*
- ⛔ **Do not say which Labor Day creative won.** Suspended until Finn re-pulls.
- ⛔ **Never show Shopify net ÷ Meta spend as ROAS.** It credits Meta with freight, a lawn mower, Biljana's email and Coalition's Google. ⛔ **Never quote a cost-per-customer figure.** "$40 CAC" on calls is Meta cost per purchase.
- ⛔ **Meta connector: no write without Evan's explicit yes for that specific change; publishing is blocked outright.** HP Cookers ADs only. Also enforced in `.claude/settings.json` → [rules](../my-business%20%28context%29/hpc-standing-rules.md)
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
| ⭐ **IW lookalike, first 3 days** | **$299.94 spend · 1 Meta-claimed purchase · 0 Shopify-matched orders · $0 real revenue** · still in Learning | Meta connector + Shopify GraphQL, 2026-09-14 |
| ⭐ **Marketing room at 20% net** | **$290,600/yr** 🔒 (double-count confirmed) vs **$676k trailing actual** · forward run-rate **~$380k–$417k/yr** (Meta $78k–$115k · Google $206k trailing · agency $81.6k · other $10.3k · affiliates $4k) → **~$89k–$126k/yr over** | Jay, 2026-09-14 (text via Evan) · ROUX model, 2026-09-14 |
| ⭐ **Sale, Sept 1–8 2026** | **126 orders · $41,100.84 net · AOV $326.20** · vs 2025: 63 · $26,144.22 · $414.99 | Shopify, verified 2026-09-09 |
| **Last 30 days, Aug 11–Sep 9** | **321 orders · $115,971.64 net** · $130,902.88 total incl. ship + tax | ShopifyQL, 2026-09-10 |
| **Meta spend, 30 days** | **$6,400.87** (Aug 10–Sep 8) · Shopify credits Meta $7,780 last click · $14,258 any click | Ads Manager · ShopifyQL, 2026-09-10 |
| **Meta live daily caps** | **$314/day** (IW $100 · 18qt $50 · BPM $164) · +$30 retargeting when it launches = $344 of $350 | Ads Manager, Finn, 2026-09-11 |
| 18 QT fryer orders, Aug 10–Sep 8 | 66 paid · AOV **$419.07** · only 4 at $600+ | Shopify, 2026-09-10 |
| ⭐ **P&L, last 365 days** | Revenue **$4.3M booked · ~$3.9M real** · net **−5%** · marketing **$676k** · COGS **$1.68M** · margin **46% booked ≈ 40.6% real** | Jay, 2026-09-10 · real margin derived |
| Overhead | **$49,550/mo, steady** · $97.49/order, kept out of ad ceilings under the incremental rule | Jay 09-09/10 · Finn |
| ⚠️ Break-even blended ROAS ~2.4 | **Under revision**: built on the stale 44.5% margin | `paid-media.md`, 2026-08-26 |

⚠️ **Not on file, and not to be invented:** actual CAC · **Coalition's current *actual* Google spend** (found instead: a **$20,000 paid-search *budget target*, 4x ROAS goal**, agreed Aug 27 2026 — not a measured spend figure, cadence unstated) · the new-vs-returning split for Sept 1–8.

---

## 🧭 Map

- **Atlas OS** — `localhost:4242`, live as a login item; both calendars connected; pulse is button-only · [spec + build log](../my-workflows%20%28automations%29/specs/2026-09-14-atlas-os-plan.md) · [README](../my-workflows%20%28automations%29/live/atlas-os/README.md) · the 6:30 pulse writes [today.md](today.md) · your notes land in [capture.md](capture.md) · dates in [key-dates.md](key-dates.md)
- **Playbooks** — [weekly rhythm](../my-workflows%20%28automations%29/playbooks/weekly-operating-rhythm.md) · [paid media](../my-workflows%20%28automations%29/playbooks/paid-media.md) · [content engine](../my-workflows%20%28automations%29/playbooks/content-engine.md) · [automation roadmap](../my-workflows%20%28automations%29/playbooks/automation-roadmap.md)
- **The business** — [who we are](../my-business%20%28context%29/who-we-are.md) · [what we sell](../my-business%20%28context%29/what-we-sell.md) · [our team](../my-business%20%28context%29/our-team.md) · [how we sound](../my-business%20%28context%29/how-we-sound.md) · [metrics & goals](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [seasonal calendar](../my-files%20%28knowledge%29/hpc-reference/seasonal-calendar.md) · [connected apps](../my-connections%20%28MCP%29/connected-apps.md)

*Standing rules: [hpc-standing-rules](../my-business%20%28context%29/hpc-standing-rules.md), under [SAFETY.md](../SAFETY.md) which wins on any conflict. Full history → [archive/](archive/)*
