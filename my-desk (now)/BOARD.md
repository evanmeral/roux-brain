# Board — 2026-09-16 (Wednesday)

> The one page. What is live, what is next, who is blocking, what must not be shipped.
> **Rewritten in place at every `/wrap` — never appended.** Hard cap: 120 lines.
> Anything that falls off goes to [archive/](archive/), never deleted.
> Decisions and their reasons go to [decisions.md](decisions.md).

---

## 🟢 Running

### 🟢 IW lookalike — live since Fri Sept 11 · **HOLD, re-check Sept 18**

**`IW Lookalike 1% - Cold Prospecting - Sept 2026`** · ad set `IW LAL 1% - Cold Prospecting` · **$100/day CBO**

**First 3 days** *(Meta connector + Shopify, 2026-09-14)*: **$299.94** spend · 14,176 impr · 308 clicks · CPM $21.16 · CPC $0.97 · CTR 2.17% · **Meta claims 1 purchase, Shopify UTM-matched 0**, real net revenue **$0** · ⚠️ **still in Learning** (1 conversion toward exit). Ad split: `hpc-dark-evergreen` $179.69 · `120qt-performance_rolling-boil` $70.47 · `120qt-crowd-math` $49.78.

- **ROUX's call: hold. Do not cut, do not touch spend.** 3 days and $300 in Learning is noise, not signal. **Re-check Sept 18 (Day 7 / ~$700) or the moment Learning exits, whichever first.** *(Evan agreed to hold, 2026-09-14.)* Runs as `/hpc-campaign-checkpoint` (built 2026-09-16; the agreed rule and bundled actions are in its `campaigns.md`).
- ⚠️ **`hpc-dark-evergreen` is taking 60% of spend and 62% of impressions** — Meta defaulting to the cheapest ad, not evidence against Performance pots. Open question: give the two 120 QT ads a floor or their own ad set.
- **New creative for all 3 ads approved 2026-09-15 (Jay + Evan)** — bigger legible wording (Jay's ask), `hpc-dark-evergreen`'s "4mm aluminum" copy fix rolled in, crowd-math got a real headline. Staged in `library/`, ready to push in one click. **ROUX's call: don't swap yet — bundle it into the Sept 18 checkpoint** (or Learning exit, whichever first) rather than disrupt Learning twice. → [decision](decisions.md)
- 🟢 Coalition and IntentWave stay read-only advisors on Meta. No setting or attribution changes during this test.

### 📡 Also live — `BPM_TOF_Manual` ($164/day) + `18qt-TOF-Prospecting` ($50/day CBO)

BPM runs on **video**. Best: `Video_Jay 30qt Demo` **$19.41** (13) · `Video_Jay 18qt Demo` $43.04 (30). `18qt-TOF` is *Learning limited*. **BPM stays at $164; Jay's +25% is not applied.** Sept 11–14 actual: BPM $557.09 · 18qt $167.79 · IW $299.94 — pacing at the $314/day baseline *(Finn, 2026-09-14)*.

### 🟢 Content week — the weekly FB/IG system, live 2026-09-16 · **Sept 21–27: all 6 scheduled**
Up to six slots Mon–Sat, a ceiling not a quota (`my-skills/content-week/weekly-format.md`); Monday 8:00 task `content-week-monday` proposes, Evan approves, Atlas schedules in Business Suite via Chrome. **Scheduled and read back 2026-09-16:** Mon 12:00 · Tue 5:30 feed + story · Wed 12:00 carousel · Thu 5:30, each on FB + IG. Fri reel + Sat story scheduled by Evan by hand (his word). Wed carousel corrected in Business Suite 2026-09-16 (frame 3 + FB caption said 160 QT; consumer pots stop at 120 QT) and read back. → [plan](../my-work%20(outputs)/content/social/2026-09-21-week/PLAN.md) · **Open, Evan's call:** keep scheduling through Chrome, schedule by hand from the pack, or have Nova build a Meta API scheduler.

---

## 🔺 Now — top three

**1. Three kits built in Shopify as drafts (2026-09-16). Next: Biljana's flow switch, then Evan activates.** Tailgate goes live **Fri Sep 25**, turkey **Thu Oct 1**. Jay approved: tailgate **$465** · turkey 30 QT **$469** · 60 QT two-bird **$519** · kits are **evergreen** · turkey push stops at the **Mon Nov 23** ship cutoff. **Built on Evan's go, 2026-09-16:** `Tailgate Fry Kit` (`Product/10292065861872`, SKU `KIT-18FRY-LEGS`) and `Turkey Fry Kit` (`Product/10292066353392`, option Size: 30 QT `KIT-30TURKEY` / 60 QT Two-Bird `KIT-60TURKEY`), variant-level native bundles with all 12 component links read back correct, compare-at at parts-at-list, tags `Bundle` + `Sale-NoDiscount` + lane tag, in the right collections by tag rule, Maya's copy on the page, 12" thermometer on the 60 QT confirmed by Evan. ⚠️ **Skimmer `SC-7R`: stock fine (Evan) but Shopify refuses to sell it online** (−1, deny; storefront confirms) — it's in every kit; a one-line Shopify fix on Evan's word. **Photos: Evan shooting today.** ⚠️ **Bundle components are owned by the Claude Shopify connector** — component changes go through Atlas; everything else edits in admin as normal. Photos are placeholder hero shots. **Code fix landed 2026-09-15:** "All Products - Eligible for Discounts" excludes `Bundle` · `BOIL10` recreated as a product discount · `HPC10`/`Stale30` repointed · `NICESPICE`, `HIGH10`, `TEXT25`, `HIGH5`, `WELCOME5` and 3 bulk sets deactivated · `SPROM` left as-is (Evan). ⚠️ **`HIGH15`/`SMS25` still reach bundles** — `HIGH15B`/`SMS25B` live, waiting on Biljana. Exempt by design: military, first responder, `USATHANKS`, `FANDF`. → [build record](../my-work%20(outputs)/internal/2026-09-16-kit-build-record.md) · [plan](../my-work%20(outputs)/internal/2026-09-11-tailgate-thanksgiving-bundles-plan.md) · [code fix](../my-work%20(outputs)/internal/2026-09-11-bundle-discount-code-fix.md)

**2. Garrett shoot: Tuesday Sept 22, HPC shop. Final 8 videos for $2,500, locked — doc sent to Garrett.** Priority order: 30 QT turkey demo, **Stephen** (live by Oct 1) · 60 QT shrimp boil demo, **Stephen** (proves "boils in under 7 min," not 120 QT-exclusive) · 18 QT fry-it-all remake, Jay · 18 QT tailgate-bundle video, **Jay + Stephen** · "buy it once" on the **60 QT** · shop interviews, staff interviewed while actively working · **Fried Foods (Video 7): funnel cake + blooming onion + fish + soft-shell crab** (Evan, 2026-09-15 — shrimp stays boil-only in Video 2, no added cost since fish/crab are already on Video 3's list) · Monte Cristo, standalone. ⛔ A-Z process video dropped. **Standing rule: every video shows product physically in use, no talking heads.** Shopping list for Monday pull: turkey, shrimp/corn/potatoes, steak fingers/fries/okra/fish/wings/hushpuppy batter/beignet dough/soft-shell crab, blooming onion, funnel cake batter, Monte Cristo fixings — skip Oreos (dropped from the plan, an old doc line still listed it). → [shoot plan v4](../my-work%20(outputs)/internal/2026-09-14-garrett-shoot-plan-sept22.md) · [internal sheet](https://docs.google.com/spreadsheets/d/1ite_Mjxsw6qOj56J3zc1b9YUweJWaFf0qbL_elwiqz0/edit) · [Garrett doc](https://docs.google.com/document/d/1feCok40JDRI_QGeuMRgZHox_KbX22FB1GwqoCizzJCk/edit)

**3. BFCM 2026 offer built, landing page drafted through v6 — Evan taking both to Jay for sign-off.** 10% off sitewide, code `BLKF26`, $100 min, Mon Nov 23–Tue Dec 1 2026, one offer covers both Black Friday and Cyber Monday (ROUX's proposal, grounded in 2025's actual BFCM data — core-window AOV $478 vs. $387 non-sale November baseline). Excludes bundle/kit products, gift cards, Scratch & Dent — new vs. 2025's zero-exclusion code. Landing page (hero, product cards, images) approved by Evan on photos/layout, 2026-09-16. Answers Coalition's Basecamp to-do (Connor Levy, due Sept 18); reply drafted, held until Jay approves. **Evan's target: Jay first, then Coalition + Biljana by Fri Sept 18.** → [v6](../my-work%20(outputs)/content/website/2026-09-16-bfcm-sitewide-draft-v6.html) · [decision](decisions.md)

---

## ⏳ Waiting on

| Who | What | Since |
|---|---|---|
| **Biljana** | Confirm her flows are switched to `HIGH15B`/`SMS25B`, then we deactivate `HIGH15`/`SMS25` | 2026-09-15 |
| **Evan** | Skimmer `SC-7R`: **stock is fine (Evan, 2026-09-16)** but Shopify has it at −1 with deny, so **the site refuses to sell it online today** (storefront product data: `available: false`, checked 2026-09-16). It's in every kit. One-line fix in Shopify (count or policy) — Evan's word | 2026-09-16 |
| **Evan** | Kit photos — **shooting today, 2026-09-16**; then upload in admin or hand to Atlas. Before activating: check the eligible-discounts collection excludes `Bundle` in admin (connector can't see it) · checkout test | 2026-09-16 |
| **Jay → Evan → Garrett** | Jay completes the dream-client-profile questionnaire (expected Sept 15, not yet received) | 2026-09-14 |
| **Finn** | **Sept 18: run `/hpc-campaign-checkpoint` on the IW lookalike** (Day 7 / ~$700), or sooner if Learning exits — Meta pull + Shopify tagged orders + the zero check, ROUX's call, then **Evan decides continue/hold/cut and the creative swap together** | 2026-09-14 |
| **Jay** | Whose is the second Meta pixel `491960645999331`? Evan asking | 2026-09-11 |
| **Jay** | Sign off on BFCM offer (10% sitewide, `BLKF26`, Nov 23–Dec 1) — Evan taking it to him as-is. **Evan's target: send to Coalition (Connor) and Biljana Fri Sept 18** — matches Connor's Basecamp due date | 2026-09-16 |
| **Evan** | Optional: a shop-floor phone photo to swap into Tuesday's post by Tue 3 pm · kit live-or-not by Thu noon (decides nothing already scheduled) | 2026-09-16 |

---

## ⏸️ Parked — deliberately, do not re-raise

- **Retargeting: plan approved, launch held** (Evan, 2026-09-11). **Why:** wait before adding another new campaign. When it goes: two ad sets, **$20/day pots + $10/day 18 QT** · fits $344 of the $350 ceiling · the IW audience stays out · 18 QT "working" = ≤$30 CPP · creative: `80qt-buy-cheap-twice` v3 + `18qt-fry-it-all`. ⚠️ The 30D pool is padded by the Aug 28 bot-like spike until ~Sept 27. → [plan](../my-work%20(outputs)/content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md)
- **IntentWave and Coalition are advisors, not a work queue.** Call "action items" are often Evan spitballing. Parked IW ideas: **On3** (Pete's lane, no seeded product without a signed deliverable) · Peter's paid proposal (**Jay agreed to nothing**) · 24-buyer audience (below Meta's 100 minimum).
- **CAC ceilings: v3 + overhead method (2026-09-10).** Landed cost = Shopify `unitCost` (Jay). Under the incremental rule the 18 QT ceiling is ~$73; at Meta's $40.56 it fails the $30 gate, so **hold `18qt-TOF` at $50/day. $350/day holds.** **The incremental rule is now in the rulebook** (`hpc-standing-rules.md`, Reporting — Evan confirmed 2026-09-16; `finn.md` matches). → [v3](../my-work%20(outputs)/internal/reports/2026-09-10-cac-ceilings-v3.md)
- **Scoreboard skill (`hpc-scoreboard-report`) migrated into `my-skills/` 2026-09-16**, stale $181.98 blended ceiling removed, Monday scheduled task updated for the Meta connector. ⚠️ **The app's scheduled-task list held no tasks at all on 2026-09-16** — that Monday scoreboard task does not exist there now (the plugin deletion may have taken it with it); re-create it if wanted. **Plugin copy deleted by Evan 2026-09-16** — confirmed gone from the app's skills folder on disk; only the `my-skills/` copy exists now. **Open, ROUX's question, not urgent:** its method is still per-channel CSV plus a blended row, which cannot give per-product CAC; rebuilding on Shopify + the Meta connector needs Finn to tie orders to campaigns (Pull B could not, 2026-09-10).
- **June–October off-season plan**: the real +$500K project. Starts after the post-mortem.
- **Creator brief.** ~17 idle creators on UpPromote. ⛔ Paid content is discontinued. · **Digit connects in a few weeks.** Stock is fine, so don't gate plans on inventory.
- **Lanes:** Google Ads + SEO is Coalition's — read-only monitoring is allowed. **Email / SMS / Klaviyo is Biljana's**, and we stay out.
- ✅ **NOLA Home & Garden Show, Feb 19–21 2027: booked and paid.** No propane in the hall, so the demo is video with a running clock. ⛔ Louisiana Outdoor Expo and the Nov 11 Cater-Event Expo are a **no**.
- **Shopify cleanup (a write, so Evan's or Jay's click):** Triple Jet compare-at = price · Scratch & Dent Performance variants carry the Powered cost · SKU `PW30-VLV075-TFR-B-SBI` on two products · two 18 QT variants with compare-at below price · 25 active products not on the Online Store. → [landed-cost pull](../my-work%20(outputs)/internal/reports/2026-09-10-landed-cost-by-variant.md)
- **Nova's queue:** Atlas OS follow-ups — Safari "Add to Dock" · second-monitor layout when it arrives · remove the n8n agent and Venon from the connector list · ad naming/build process · missing-end-date checklist line · duplicate Performance pots listing · `Commercial Cookers On Sale` has 0 products but is linked from the homepage FAQ. · **Sage needs a fresh comment/DM replies file at the next campaign** (the only one is in the Labor Day pack — Evan, 2026-09-16: not now). · **Skill candidates, not built (Evan decides when each next recurs):** discount-code audit · Shopify kit build · product-image library refresh · Garrett shoot plan. `/wrap` step 5 now proposes a skill whenever a session repeats a procedure (2026-09-16).
- **Product image library refreshed (2026-09-16):** 146 new cutouts + 146 studio shots identified, renamed and copied into `hpc-ad-creative/assets/` (index updated, bboxes computed); the source folder went to the shop Dropbox. **Open, Evan's eye only:** the five `100-120qt - pwd` shots (100 vs 120 not readable from the frame) and the four `Commercial cooker` shots with no gallon size — rename when known. ⚠️ Adds ~312 MB to the repo; assets are tracked by policy, drop `studio-product-images/` from git if that's unwanted.

---

## ⛔ Landmines — do not ship these

- **Warranty: read the live page and write from it.** Full 2-year on everything; limited 5-year residential, 120 QT or smaller. ⛔ **Never 5-year on the 160 QT, 80–140 Gallon, or any steamer.** ✅ **Exception in `SAFETY.md`:** a creative showing **a single qualifying pot** may say "5-YR RESIDENTIAL WARRANTY" without the size qualifier. `yeti-1x1.html` still hardcodes one at line 37 — Nova's job.
- ⛔ **Pots are 4mm aluminum, never "cast."** The live `hpc-dark-evergreen` ad still says it — kept as-is to avoid a learning reset. Fixed version (2026-09-15, also bigger wording) staged in `library/`, ready to swap at the Sept 18 checkpoint.
- ⛔ **No "Made in USA" until the pots are made in-house.** Use "Built in Louisiana" / "Hand-welded in Louisiana." Still stamped "MADE IN USA": `yeti-1x1.html` (not live). **Applies to hashtags too — never `#madeinusa`**; the Labor Day captions carried it *(Business Suite, 2026-09-16)*. ⚠️ **Found live 2026-09-16 while building the kits:** the 18 QT product page shows a **"Made in the USA" feature card** (metaobject `Metaobject/111384690928`, "This fryer is crafted with care in Louisiana") and **Platinum's SEO title says "Made in the USA"**. The 30 QT's Features & Benefits metafield also ends in an unqualified **"5-year warranty."** All three are live-product writes — Evan's or Jay's click, not done.
- ⛔ **No sitewide % discount before November.** AOV $326.20, down 21.4% YoY.
- ⛔ **No discount code on a bundle; no kit goes live while `HIGH15`/`SMS25` stay active.** The three kits exist as **drafts** since 2026-09-16 — activation is Evan's click after Biljana confirms. Fix landed 2026-09-15 (see Now #1) — exempt by design: military, first responder, `USATHANKS`, `FANDF`, and now `SPROM` (UpPromote-owned, Evan's call to leave it). Historical stack: 33 of ~70 bundle orders Jun 1–Sep 10 had a discount, $2,000.20 *(Shopify, checked two ways)*.
- ⛔ **Dormant BM Digital budgets in Meta.** "BM | ASC+ | CBO | Creative Testing" ($200/day) and "BM | TOF | CBO | Internal Whitelisting" ($100/day) are off but still carry budgets. *(Confirmed $0 spend Sept 11–14, Finn.)*
- ⛔ **Do not say which Labor Day creative won.** Suspended until Finn re-pulls Sept 1–8 ad-level Meta data (needed for 24 Meta-tagged orders vs 155 claimed, Aug 10–Sep 8 — that pull only unblocks this).
- ⛔ **Never show Shopify net ÷ Meta spend as ROAS.** ⛔ **Never quote a cost-per-customer figure** as CAC.
- ⛔ **Meta connector: no write without Evan's explicit yes for that specific change; publishing is blocked outright.** HP Cookers ADs only.
- ⛔ **Use the real margin (~40.6%), not the booked 46%**, and **never the 44.5% August margin**.
- ⛔ **Vendor call figures are not facts** until checked against Shopify.
- ⛔ **No 30%-off legs in November.** v3: at best a wash (−$3.57 with fees).
- **Showroom cards carry no warranty line and no price date.** Before every print run, `/hpc-showroom-cards` Mode A: Finn checks every card's prices against Shopify, rebuild, verify, export (built 2026-09-16).
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
- **Product images** — [asset index](../my-skills/hpc-ad-creative/assets/ASSET-INDEX.md) · [2026-09 rename map](../my-work%20(outputs)/internal/2026.09.15%20-%20HPC%20-%20Product%20Image%20Rename%20Map.md) (original filename → new name, with every size call explained)
- **Playbooks** — [weekly rhythm](../my-workflows%20(automations)/playbooks/weekly-operating-rhythm.md) · [paid media](../my-workflows%20(automations)/playbooks/paid-media.md) · [content engine](../my-workflows%20(automations)/playbooks/content-engine.md) · [automation roadmap](../my-workflows%20(automations)/playbooks/automation-roadmap.md) · **content week:** [skill](../my-skills/content-week/instructions.md) · [format](../my-skills/content-week/weekly-format.md) · [log](../my-work%20(outputs)/content/social/LOG.md) · **campaign checkpoint:** [skill](../my-skills/hpc-campaign-checkpoint/instructions.md) · [campaign terms](../my-skills/hpc-campaign-checkpoint/campaigns.md) · **showroom cards:** [skill](../my-skills/hpc-showroom-cards/instructions.md)
- **The business** — [who we are](../my-business%20(context)/who-we-are.md) · [what we sell](../my-business%20(context)/what-we-sell.md) · [our team](../my-business%20(context)/our-team.md) · [how we sound](../my-business%20(context)/how-we-sound.md) · [metrics & goals](../my-files%20(knowledge)/hpc-reference/metrics-and-goals.md) · [seasonal calendar](../my-files%20(knowledge)/hpc-reference/seasonal-calendar.md) · [connected apps](../my-connections%20(MCP)/connected-apps.md)

*Standing rules: [hpc-standing-rules](../my-business%20(context)/hpc-standing-rules.md), under [SAFETY.md](../SAFETY.md) which wins on any conflict. Full history → [archive/](archive/)*
