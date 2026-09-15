# Board — 2026-09-15 (Tuesday)

> The one page. What is live, what is next, who is blocking, what must not be shipped.
> **Rewritten in place at every `/wrap` — never appended.** Hard cap: 120 lines.
> Anything that falls off goes to [archive/](archive/), never deleted.
> Decisions and their reasons go to [decisions.md](decisions.md).

---

## 🟢 Running

### 🟢 IW lookalike — live since Fri Sept 11 · **HOLD, re-check Sept 18**

**`IW Lookalike 1% - Cold Prospecting - Sept 2026`** · ad set `IW LAL 1% - Cold Prospecting` · **$100/day CBO**

**First 3 days** *(Meta connector + Shopify, 2026-09-14)*: **$299.94** spend · 14,176 impr · 308 clicks · CPM $21.16 · CPC $0.97 · CTR 2.17% · **Meta claims 1 purchase, Shopify UTM-matched 0**, real net revenue **$0** · ⚠️ **still in Learning** (1 conversion toward exit). Ad split: `hpc-dark-evergreen` $179.69 · `120qt-performance_rolling-boil` $70.47 · `120qt-crowd-math` $49.78.

- **ROUX's call: hold. Do not cut, do not touch spend.** 3 days and $300 in Learning is noise, not signal. **Re-check Sept 18 (Day 7 / ~$700) or the moment Learning exits, whichever first.** *(Evan agreed to hold, 2026-09-14.)*
- ⚠️ **`hpc-dark-evergreen` is taking 60% of spend and 62% of impressions** — Meta defaulting to the cheapest ad, not evidence against Performance pots. Open question: give the two 120 QT ads a floor or their own ad set.
- 🟢 Coalition and IntentWave stay read-only advisors on Meta. No setting or attribution changes during this test.

### 📡 Also live — `BPM_TOF_Manual` ($164/day) + `18qt-TOF-Prospecting` ($50/day CBO)

BPM runs on **video**. Best: `Video_Jay 30qt Demo` **$19.41** (13) · `Video_Jay 18qt Demo` $43.04 (30). `18qt-TOF` is *Learning limited*. **BPM stays at $164; Jay's +25% is not applied.** Sept 11–14 actual: BPM $557.09 · 18qt $167.79 · IW $299.94 — pacing at the $314/day baseline *(Finn, 2026-09-14)*.

---

## 🔺 Now — top three

**1. Bundle discount-code fix: done. Next, Evan builds the three kits.** Tailgate goes live Sep 25. Jay approved: tailgate **$465** · turkey 30 QT **$469** · 60 QT two-bird **$519** · kits are **evergreen** · turkey push stops at the **Mon Nov 23** ship cutoff. **Fix landed 2026-09-15:** "All Products - Eligible for Discounts" now excludes `Bundle`-tagged products · `BOIL10` recreated as a product discount · `HPC10` and `Stale30` repointed to that collection (Jay accepted these now also reach commercial products — 10%/$30 is immaterial there) · `NICESPICE` deactivated (Jay: too old to rebuild) · `HIGH10`, `TEXT25`, `HIGH5`, `WELCOME5` and their 3 bulk-issued sets deactivated · `SPROM` (UpPromote-owned) left as-is by Evan's call, still reaches bundles. ⚠️ **`HIGH15`/`SMS25` still reach bundles** — replacements `HIGH15B`/`SMS25B` are live, waiting on Biljana to switch her flows before the old two get turned off. Exempt by design, unchanged: military, first responder, `USATHANKS`, `FANDF`. → [plan](../my-work%20(outputs)/internal/2026-09-11-tailgate-thanksgiving-bundles-plan.md) · [code fix](../my-work%20(outputs)/internal/2026-09-11-bundle-discount-code-fix.md)

**2. Garrett shoot: Tuesday Sept 22, HPC shop. Final 8 videos for $2,500, locked — doc sent to Garrett.** Priority order: 30 QT turkey demo, **Stephen** (live by Oct 1) · 60 QT shrimp boil demo, **Stephen** (proves "boils in under 7 min," not 120 QT-exclusive) · 18 QT fry-it-all remake, Jay · 18 QT tailgate-bundle video, **Jay + Stephen** · "buy it once" on the **60 QT** · shop interviews, staff interviewed while actively working · **Fried Foods (Video 7): funnel cake + blooming onion + fish + soft-shell crab** (Evan, 2026-09-15 — shrimp stays boil-only in Video 2, no added cost since fish/crab are already on Video 3's list) · Monte Cristo, standalone. ⛔ A-Z process video dropped. **Standing rule: every video shows product physically in use, no talking heads.** Shopping list for Monday pull: turkey, shrimp/corn/potatoes, steak fingers/fries/okra/fish/wings/hushpuppy batter/beignet dough/soft-shell crab, blooming onion, funnel cake batter, Monte Cristo fixings — skip Oreos (dropped from the plan, an old doc line still listed it). → [shoot plan v4](../my-work%20(outputs)/internal/2026-09-14-garrett-shoot-plan-sept22.md) · [internal sheet](https://docs.google.com/spreadsheets/d/1ite_Mjxsw6qOj56J3zc1b9YUweJWaFf0qbL_elwiqz0/edit) · [Garrett doc](https://docs.google.com/document/d/1feCok40JDRI_QGeuMRgZHox_KbX22FB1GwqoCizzJCk/edit)

---

## ⏳ Waiting on

| Who | What | Since |
|---|---|---|
| **Biljana** | Confirm her flows are switched to `HIGH15B`/`SMS25B`, then we deactivate `HIGH15`/`SMS25` | 2026-09-15 |
| **Evan** | Build the 3 kits (code fix is done) | 2026-09-15 |
| **Jay → Evan → Garrett** | Jay completes the dream-client-profile questionnaire (expected Sept 15, not yet received) | 2026-09-14 |
| **Finn** | **Scheduled: re-pull IW Meta numbers + Shopify UTM match on Sept 18** (Day 7 / ~$700), or sooner if Learning exits | 2026-09-14 |
| **Jay** | Whose is the second Meta pixel `491960645999331`? Evan asking | 2026-09-11 |

---

## ⏸️ Parked — deliberately, do not re-raise

- **Retargeting: plan approved, launch held** (Evan, 2026-09-11). **Why:** wait before adding another new campaign. When it goes: two ad sets, **$20/day pots + $10/day 18 QT** · fits $344 of the $350 ceiling · the IW audience stays out · 18 QT "working" = ≤$30 CPP · creative: `80qt-buy-cheap-twice` v3 + `18qt-fry-it-all`. ⚠️ The 30D pool is padded by the Aug 28 bot-like spike until ~Sept 27. → [plan](../my-work%20(outputs)/content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md)
- **IntentWave and Coalition are advisors, not a work queue.** Call "action items" are often Evan spitballing. Parked IW ideas: **On3** (Pete's lane, no seeded product without a signed deliverable) · Peter's paid proposal (**Jay agreed to nothing**) · 24-buyer audience (below Meta's 100 minimum).
- **CAC ceilings: v3 + overhead method (2026-09-10).** Landed cost = Shopify `unitCost` (Jay). Under the incremental rule the 18 QT ceiling is ~$73; at Meta's $40.56 it fails the $30 gate, so **hold `18qt-TOF` at $50/day. $350/day holds.** → [v3](../my-work%20(outputs)/internal/reports/2026-09-10-cac-ceilings-v3.md)
- **Sept 1–8 Meta ad-level re-pull (Finn).** Needed for 24 Meta-tagged orders vs 155 claimed, Aug 10–Sep 8. Only unblocks "which Labor Day creative won."
- **June–October off-season plan**: the real +$500K project. Starts after the post-mortem.
- **Creator brief.** ~17 idle creators on UpPromote. ⛔ Paid content is discontinued. · **Digit connects in a few weeks.** Stock is fine, so don't gate plans on inventory.
- **Lanes:** Google Ads + SEO is Coalition's — read-only monitoring is allowed. **Email / SMS / Klaviyo is Biljana's**, and we stay out.
- ✅ **NOLA Home & Garden Show, Feb 19–21 2027: booked and paid.** No propane in the hall, so the demo is video with a running clock. ⛔ Louisiana Outdoor Expo and the Nov 11 Cater-Event Expo are a **no**.
- **Shopify cleanup (a write, so Evan's or Jay's click):** Triple Jet compare-at = price · Scratch & Dent Performance variants carry the Powered cost · SKU `PW30-VLV075-TFR-B-SBI` on two products · two 18 QT variants with compare-at below price · 25 active products not on the Online Store. → [landed-cost pull](../my-work%20(outputs)/internal/reports/2026-09-10-landed-cost-by-variant.md)
- **Nova's queue:** Atlas OS follow-ups — Safari "Add to Dock" · second-monitor layout when it arrives · remove the n8n agent and Venon from the connector list · ad naming/build process · missing-end-date checklist line · **`maya.md` still lists 1080×1350 as PAID** · `check-centering.py` hardcodes `BAND` · duplicate Performance pots listing · `Commercial Cookers On Sale` has 0 products but is linked from the homepage FAQ.

---

## ⛔ Landmines — do not ship these

- **Warranty: read the live page and write from it.** Full 2-year on everything; limited 5-year residential, 120 QT or smaller. ⛔ **Never 5-year on the 160 QT, 80–140 Gallon, or any steamer.** ✅ **Exception in `SAFETY.md`:** a creative showing **a single qualifying pot** may say "5-YR RESIDENTIAL WARRANTY" without the size qualifier. `yeti-1x1.html` still hardcodes one at line 37 — Nova's job.
- ⛔ **Pots are 4mm aluminum, never "cast."** The live `hpc-dark-evergreen` ad still says it — kept as-is to avoid a learning reset. At its next refresh, swap in the approved v2 from `library/`.
- ⛔ **No "Made in USA" until the pots are made in-house.** Use "Built in Louisiana" / "Hand-welded in Louisiana." Still stamped "MADE IN USA": `yeti-1x1.html` only (not live).
- ⛔ **No sitewide % discount before November.** AOV $326.20, down 21.4% YoY.
- ⛔ **No discount code on a bundle; no kit goes live while `HIGH15`/`SMS25` stay active.** Fix landed 2026-09-15 (see Now #1) — exempt by design: military, first responder, `USATHANKS`, `FANDF`, and now `SPROM` (UpPromote-owned, Evan's call to leave it). Historical stack: 33 of ~70 bundle orders Jun 1–Sep 10 had a discount, $2,000.20 *(Shopify, checked two ways)*.
- ⛔ **Dormant BM Digital budgets in Meta.** "BM | ASC+ | CBO | Creative Testing" ($200/day) and "BM | TOF | CBO | Internal Whitelisting" ($100/day) are off but still carry budgets. *(Confirmed $0 spend Sept 11–14, Finn.)*
- ⛔ **Do not say which Labor Day creative won.** Suspended until Finn re-pulls.
- ⛔ **Never show Shopify net ÷ Meta spend as ROAS.** ⛔ **Never quote a cost-per-customer figure** as CAC.
- ⛔ **Meta connector: no write without Evan's explicit yes for that specific change; publishing is blocked outright.** HP Cookers ADs only.
- ⛔ **Use the real margin (~40.6%), not the booked 46%**, and **never the 44.5% August margin**.
- ⛔ **Vendor call figures are not facts** until checked against Shopify.
- ⛔ **No 30%-off legs in November.** v3: at best a wash (−$3.57 with fees).
- **Showroom cards carry no warranty line and no price date.** Re-pull `products.json` before every print run.
- **Never quote a price not in** [what-we-sell.md](../my-business%20(context)/what-we-sell.md); **Shopify prices always win.** **Never name a competitor, and never say "Yeti"** in anything customers see.

---

## 📊 Numbers at a glance

Source of truth → [metrics-and-goals.md](../my-files%20(knowledge)/hpc-reference/metrics-and-goals.md). **AOV is net ÷ orders throughout.**

| Figure | Value | Source · date |
|---|---|---|
| ⭐ **IW lookalike, first 3 days** | **$299.94 spend · 1 Meta-claimed purchase · 0 Shopify-matched orders · $0 real revenue** · still in Learning | Meta connector + Shopify GraphQL, 2026-09-14 |
| ⭐ **Marketing room at 20% net** | **$290,600/yr** 🔒 vs **$676k trailing actual** · forward run-rate **~$380k–$417k/yr** → **~$89k–$126k/yr over** | Jay, 2026-09-14 · ROUX model, 2026-09-14 |
| ⭐ **Sale, Sept 1–8 2026** | **126 orders · $41,100.84 net · AOV $326.20** · vs 2025: 63 · $26,144.22 · $414.99 | Shopify, verified 2026-09-09 |
| **Last 30 days, Aug 11–Sep 9** | **321 orders · $115,971.64 net** · $130,902.88 total incl. ship + tax | ShopifyQL, 2026-09-10 |
| **Meta spend, 30 days** | **$6,400.87** (Aug 10–Sep 8) · Shopify credits Meta $7,780 last click · $14,258 any click | Ads Manager · ShopifyQL, 2026-09-10 |
| **Meta live daily caps** | **$314/day** (IW $100 · 18qt $50 · BPM $164) · +$30 retargeting when it launches = $344 of $350 | Ads Manager, Finn, 2026-09-11 |
| 18 QT fryer orders, Aug 10–Sep 8 | 66 paid · AOV **$419.07** · only 4 at $600+ | Shopify, 2026-09-10 |
| ⭐ **P&L, last 365 days** | Revenue **$4.3M booked · ~$3.9M real** · net **−5%** · marketing **$676k** · COGS **$1.68M** · margin **46% booked ≈ 40.6% real** | Jay, 2026-09-10 · real margin derived |
| Overhead | **$49,550/mo, steady** · $97.49/order, kept out of ad ceilings under the incremental rule | Jay 09-09/10 · Finn |
| ⚠️ Break-even blended ROAS ~2.4 | **Under revision**: built on the stale 44.5% margin | `paid-media.md`, 2026-08-26 |

⚠️ **Not on file, and not to be invented:** actual CAC · **Coalition's current *actual* Google spend** · the new-vs-returning split for Sept 1–8.

---

## 🧭 Map

- **Atlas OS** — `localhost:4242`, live as a login item; both calendars connected; pulse is button-only · [spec + build log](../my-workflows%20(automations)/specs/2026-09-14-atlas-os-plan.md) · [README](../my-workflows%20(automations)/live/atlas-os/README.md) · the 6:30 pulse writes [today.md](today.md) · your notes land in [capture.md](capture.md) · dates in [key-dates.md](key-dates.md)
- **Playbooks** — [weekly rhythm](../my-workflows%20(automations)/playbooks/weekly-operating-rhythm.md) · [paid media](../my-workflows%20(automations)/playbooks/paid-media.md) · [content engine](../my-workflows%20(automations)/playbooks/content-engine.md) · [automation roadmap](../my-workflows%20(automations)/playbooks/automation-roadmap.md)
- **The business** — [who we are](../my-business%20(context)/who-we-are.md) · [what we sell](../my-business%20(context)/what-we-sell.md) · [our team](../my-business%20(context)/our-team.md) · [how we sound](../my-business%20(context)/how-we-sound.md) · [metrics & goals](../my-files%20(knowledge)/hpc-reference/metrics-and-goals.md) · [seasonal calendar](../my-files%20(knowledge)/hpc-reference/seasonal-calendar.md) · [connected apps](../my-connections%20(MCP)/connected-apps.md)

*Standing rules: [hpc-standing-rules](../my-business%20(context)/hpc-standing-rules.md), under [SAFETY.md](../SAFETY.md) which wins on any conflict. Full history → [archive/](archive/)*
