# Board — 2026-09-10

> The one page. What is live, what is next, what is waiting, what not to ship.
> **Rewritten in place at every `/wrap` — never appended.** Hard cap: 120 lines.
> Anything that falls off goes to [archive/](archive/), never deleted.
> Decisions and their reasons go to [decisions.md](decisions.md).

---

## 🟢 Running

### 🔴 IW lookalike goes live **Fri Sept 11, 6:30am PDT** — Jay gave the go-ahead, in draft, not published

**`IW Lookalike 1% - Cold Prospecting - Sept 2026 (DRAFT)`** · ad set `IW LAL 1% - Cold Prospecting`

| | |
|---|---|
| Audience | Lookalike off `IW - LA Audience` — **2.3–2.8M**, US, 24+ · excludes 30D visitors · 90D purchasers · dealers *(hard Controls)* |
| Budget | **$100/day** — takes committed caps to $344 of the $350 ceiling |
| Ads | 120 QT crowd-math · Platinum Bundle 7-min boil · 18 QT fryer → Evan's landing page |
| **Before publish** | **Add tracking tags to the 3 ads — new campaign only** → [tag spec](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-10-iw-tracking-tags.md) |

- ✅ **Checked 2026-09-10 (Finn, read-only):** age 24 · "Maximize number of conversions", no errors · $100 · Sep 11 6:30am PDT, no end date · exclusions as hard Controls · Advantage+ placements · **URL parameters empty on all 3 ads.**
- 🔴 **Before publishing:** (1) **discard the stray draft on live ad `18qt-001`** — Finn's read left "Unpublished edits" (button 5 → 6). Use the ad's own *Discard draft*, **not** the top-bar "Discard drafts" (that wipes the IW draft); button should read (5). (2) ⛔ **Ignore Meta's "Apply now → Maximize value of conversions"** — that is error #2490408. (3) `hpc-dark-evergreen` warns *"Shop destination doesn't match website URL"* — check its destination. ⛔ Publishes only on Evan's click. → [how it was built](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-09-finish-the-IW-draft.md) · [ad copy](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-09-evergreen-ad-copy.md)
- ⚠️ **The lookalike sits under "Suggest an audience," not Controls** *(Finn, 2026-09-10)*. Only age, US and the exclusions are hard; Advantage+ can reach past the lookalike. So the test is "Advantage+ seeded with IW's list," not "IW's 2.3–2.8M." Advantage+ Sales offers no hard inclusion.
- **18 QT ad stays in — ROUX's call.** A lone 18 QT sale can't pay to acquire (−$26); 120 QT and Platinum can ($57–82) *(cac-ceilings-v3)*. **Watch its share of purchases.**

### 📡 Also live — `BPM_TOF_Manual` + `18qt-TOF-Prospecting`

**30-day Meta spend $6,400.87** (Aug 10–Sep 8): BPM $4,899.88 · 18qt $1,500.99 *(Ads Manager, read 2026-09-10, ties to the cent)*.
BPM runs on **video** — best: `Video_Jay 30qt Demo` **$19.41** (13) · `Video_Jay 18qt Demo` $43.04 (30). `18qt-TOF` at **$50/day**, all *Learning limited*; `18qt-001` **$14.53**. *(CPP on Meta's own count, read 2026-09-09.)*

---

## 🔺 Now — top three

**1. Build the retargeting campaign. It decays daily.** $30/day against **7,200–8,500** 30-day site visitors. Creative held: `80qt-buy-cheap-twice` + `18qt-fry-it-all`; purpose-built objection statics from Maya Sept 16–22. **Stop rules:** frequency >3.5 cut · CPP >$60 after 4 days pause · under $40 it is working. Its audience must stay excluded from the IW campaign.
⚠️ **The 30D pool is likely padded until ~Sept 27** by a bot-like spike on **Aug 28** — Shopify 14,169 sessions vs ~2,000 normal, 94% direct, 7 checkouts *(Finn, 2026-09-10; cause untested)*. Whether it reached Meta's audience is untested. **A second Meta pixel also fires on the site** (`491960645999331`, owner unknown) — check it in Events Manager before reading retargeting results.

**2. Re-pull the Sept 1–8 Meta ad-level table — Finn.** The old one was filtered to "labor" ads. **Must reconcile to campaign spend before any conclusion.** Until then nobody says which creative won. Note: Meta's UTMs carry numeric IDs, so Shopify can't match orders to campaigns by name — only **24** orders carry a Meta paid tag vs **155** Meta-claimed *(order-level-pulls, Aug 10–Sep 8)*.

**3. ROUX: tailgate + Thanksgiving bundle plan.** IntentWave's idea, ours to use. Attach is where the margin is — real 18 QT orders carry **$210.18** gross profit vs **$142.50** for the unit alone *(order-level-pulls, Jun–Aug)*. Rules: **no discount code on a bundle** (discount built in) · mainly HPC product; an outside add-on only if it helps sales · stock is not a constraint · never pair fryers with crawfish. Jay's 30 QT turkey demo is the best ad in the account.

*Demoted: the 18 QT ladder → Parked. ROUX withdrew the override on the v3 ceilings (2026-09-10).*

---

## ⏳ Waiting on

| Who | What | Since |
|---|---|---|
| **Evan** | Finish the Sept 1–8 feed-post captions naming a dead code, then re-pull final redemption counts on both | 2026-09-09 |
| **Evan** | **Book Garrett:** 15–20s cut of the 18 QT video, and plan **6 new videos** modelled on the winning demos. $500 each or **$2,500 for 8** | 2026-09-01 |
| **Jay** | CAC-ceiling inputs — overhead denominator (6,099 all-channel vs 5,304 DTC), the Zone 2 ruling, P&L reconciliation. **Being settled in the CAC chat** | 2026-09-10 |
| **Coalition** | Reply on Cater + Event, Mar 22–25 | — |
| **Garrett** | High-res tunnel-tube-in-action still. Library's only one is **640×323** | 2026-09-08 |

---

## ⏸️ Parked — deliberately, do not re-raise

- ✅ **Jay and Robert briefed 2026-09-09** (sale results + new-campaign plan). Future reporting stays consistent with what they hold: 126 orders / $41,100.84 / AOV $326.20, and the three figures we said we do *not* have. **Owner numbers come from Jay, not Robert** (Evan, 2026-09-10).
- ✅ **Closed by Evan 2026-09-08:** sale comms · **popups are Biljana's** · always-on codes are welcome codes and **cannot combine with a live sale**.
- **IntentWave is advisory, not a work queue** (Evan, 2026-09-10). Their ideas, parked: **On3** sports partnership (Loni's contacts — Pete's lane, no seeded product without a signed deliverable) · Peter's paid spend-management proposal — **Jay agreed to nothing** · Labor Day extension — floated only · 24-buyer modelled audience (below Meta's 100 minimum). → [call 1](../my-work%20%28outputs%29/internal/2026-09-10-intentwave-recap-review.md) · [call 2](../my-work%20%28outputs%29/internal/2026-09-10-intentwave-call-2-recap.md)
- **18 QT ladder** — withdrawn by ROUX on the v3 ceilings. Hold `18qt-TOF` at $50/day. Reopens on Pull A (order-level ceiling) or Jay's Zone 2 ruling.
- **CAC ceilings v3 (2026-09-10) replace v2.** Real landed cost, $97.49 overhead/order, 20% net target. → `internal/reports/2026-09-10-cac-ceilings-v3.md`. The **$350/day ceiling holds**, now for a different reason.
- **June–October off-season plan** — the real +$500K project. Starts after the post-mortem.
- **Creator brief.** ~17 idle creators on UpPromote. ⛔ Paid content is discontinued.
- **Digit connects in a few weeks** (Evan, 2026-09-10). Stock is fine — don't gate plans on inventory.
- **Lanes:** Google Ads + SEO is Coalition's, monitor only. **Email / SMS / Klaviyo is Biljana's** — IntentWave's Tommy is reviewing her abandoner flows with her; theirs, we stay out.
- ✅ **NOLA Home & Garden Show, Feb 19–21 2027 — BOOKED AND PAID.** $1,700, 10×10. 🔥 No propane in the hall — demo on video with a running clock. ⛔ Louisiana Outdoor Expo and Nov 11 Cater-Event Expo are a **no**.
- **Nova's queue:** ad naming/build process · missing-end-date pre-launch checklist line · **`maya.md` still lists 1080×1350 as PAID** · `check-centering.py` hardcodes `BAND` · two `what-we-sell.md` fixes · `Performance Boiling Pots (60QT to 120QT)` duplicate · `Commercial Cookers On Sale` has 0 products but is linked from the homepage FAQ.

---

## ⛔ Landmines — do not ship these

- **Warranty: read the live page and write from it. Do not ask Evan again.** Full 2-year on everything; limited 5-year residential, 120 QT or smaller. ⛔ **Never 5-year on the 160 QT, 80–140 Gallon, or any steamer** — `yeti-1x1.html` hardcodes one at line 37. Making it a variable is **Nova's job.**
- ⛔ **No sitewide % discount before November.** AOV $326.20, down 21.4% YoY. **Keep the deadline, drop the blanket discount.**
- ⛔ **No discount code on a bundle** — the discount is built in (Evan, 2026-09-10).
- ⛔ **No "made in USA" or domestic-manufacturing claim.** Jay's SBA plan to make pots, baskets and lids here is ~a year out.
- ⛔ **Do not say which Labor Day creative won.** Suspended until Finn re-pulls.
- ⛔ **Never show Shopify net ÷ Meta spend as ROAS.** It credits Meta with freight, a lawn mower, Biljana's email and Coalition's Google.
- ⛔ **Never quote a cost-per-customer figure** — no Google spend feed. "$40 CAC" on calls is Meta cost per purchase.
- ⛔ **IntentWave call figures are not facts:** "$54,800 Meta spend" (real: $6,337), "$674 18 QT AOV" (Shopify: $419), "$222K in carts" (Meta's count).
- ⛔ **No 30%-off legs in November.** v3: at best a wash (−$3.57 with fees). A leg attached at full price adds **$65.46**.
- ⛔ **`2026-08-27_laborday-vintage_multi-product_1080x1350_v1.png` is NOT evergreen** — sale, codes and dates on its face.
- **Coalition's "Revenue Up 199.03% YoY"** is **unverified against Shopify.**
- **Showroom cards carry no warranty line and no price date** — deliberate. 31 on the floor. Re-pull `products.json` before every print run.
- **Never quote a price not in** [what-we-sell.md](../my-business%20%28context%29/what-we-sell.md). **Never name a competitor.**

---

## 📊 Numbers at a glance

Source of truth → [metrics-and-goals.md](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md). **AOV is net ÷ orders throughout.**

| Figure | Value | Source · date |
|---|---|---|
| ⭐ **Sale, Sept 1–8 2026** | **126 orders · $41,100.84 net · AOV $326.20** | Shopify, verified twice 2026-09-09 |
| Sept 1–8 2025 (also a sale) | 63 orders · $26,144.22 net · AOV $414.99 | Shopify, 2026-09-09 |
| **Last 30 days, Aug 11–Sep 9** | **321 orders · $115,971.64 net** · $130,902.88 total sales incl. ship + tax | ShopifyQL, 2026-09-10 |
| **Meta spend, 30 days** | **$6,400.87** (Aug 10–Sep 8) · $6,337.14 (Aug 11–Sep 9) | Ads Manager, 2026-09-10 |
| Shopify credits Meta (net, Aug 11–Sep 9) | **$7,780** last click · **$14,258** any click | ShopifyQL attribution, 2026-09-10 |
| 18 QT fryer orders, Aug 10–Sep 8 | 66 paid · AOV **$419.07** · only 4 at $600+ | Shopify, 2026-09-10 |
| Repeat buyers, 12 mo | **18.6%** of customers ordered 2+ times (inflated by dealer + warranty orders) | Shopify, 2026-09-10 |
| Overhead | **$49,550/mo · $97.49/order** (÷ 6,099, denominator unconfirmed) | Jay 09-09/10 · Finn |
| Margin of record | **46%**, P&L, 365 days, after card fees + shipping cost | Jay, 2026-09-10 |
| ⚠️ Break-even blended ROAS ~2.4 | **Under revision** — built on the stale 44.5% margin | `paid-media.md`, 2026-08-26 |

⚠️ **Not on file, and not to be invented:** actual CAC (no Google spend feed) · Google spend for the last 30 days · the new-vs-returning split for Sept 1–8.

---

## 🧭 Map

- **Playbooks** — [weekly rhythm](../my-workflows%20%28automations%29/playbooks/weekly-operating-rhythm.md) · [paid media](../my-workflows%20%28automations%29/playbooks/paid-media.md) · [content engine](../my-workflows%20%28automations%29/playbooks/content-engine.md) · [automation roadmap](../my-workflows%20%28automations%29/playbooks/automation-roadmap.md)
- **The business** — [who we are](../my-business%20%28context%29/who-we-are.md) · [what we sell](../my-business%20%28context%29/what-we-sell.md) · [our team](../my-business%20%28context%29/our-team.md) · [how we sound](../my-business%20%28context%29/how-we-sound.md) · [metrics & goals](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [seasonal calendar](../my-files%20%28knowledge%29/hpc-reference/seasonal-calendar.md) · [our clients](../my-business%20%28context%29/our-clients.md) · [customer language](../my-files%20%28knowledge%29/hpc-reference/customer-language.md) · [competitors](../my-files%20%28knowledge%29/hpc-reference/competitors.md) · [what we've tried](../my-files%20%28knowledge%29/hpc-reference/what-weve-tried.md) · [connected apps](../my-connections%20%28MCP%29/connected-apps.md)

*Standing rules: [hpc-standing-rules](../my-business%20%28context%29/hpc-standing-rules.md), under [SAFETY.md](../SAFETY.md) which wins on any conflict. Full history → [archive/](archive/)*
