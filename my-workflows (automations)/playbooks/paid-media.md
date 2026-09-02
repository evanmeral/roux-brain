# Paid Media Playbook

> ✅ **BASELINE PULLED 2026-08-26** direct from Meta Ads Manager + Google Ads (read-only).
> Full report: `my-work (outputs)/internal/reports/2026-08-26-paid-media-baseline.md`
>
> **Accounts:** Meta **HP Cookers ADs** (4392736013287) · Google **High Performance Cookers - (CT)** (579-879-1988)
>
> **The state of play:** both channels are profitable and both are budget-starved.
> Meta ~7.0 ROAS · Google 5.37 (3.67 on unmodeled value) · **break-even 2.4** · blended MER ~3.8.
> **3 of 5 Google campaigns are flagged `Limited by budget`.** Meta spend is down 62% since the
> July 12 handover while efficiency held.
>
> ⚠️ **Never add Meta's and Google's claimed conversion value together** — they claim the same orders.
> Report **blended MER** to Jay, not platform ROAS.

## 🚧 LANES — who owns what (Evan, 2026-08-26)
| Channel | Owner | ROUX's role |
|---|---|---|
| **Google Ads** | **Coalition** | **Monitor + report only.** Route suggestions through Evan, who relays. Never propose direct changes. |
| **SEO** | **Coalition** (2+ yrs) | Same — monitor, suggest via Evan. |
| **Meta Ads** | **Evan** (IntentWave advises) | Recommend concrete changes. Still Evan's click. |
| **Email/Klaviyo** | **Biljana** | Coordinate, don't duplicate. |
| **Video** | **Garrett / Frazier Media** | Brief, don't shoot. |

> Evan: *"lets let them do it so we arent crossing wires. If you have suggestions on what they could
> do you can let me know and ill notify them."* Suggestions to Coalition are framed as **data they
> may not have** (break-even ROAS, per-SKU margin), not as instructions.

## 🎯 Current priority: scale what already works
**ROUX + Evan's lane (Meta)** — ⚠️ **revised 2026-08-28 on real CSV data:**
1. ⛔ **Do NOT raise `18qt-TOF-Prospecting`.** $72.24 CPP against a ~$63 ceiling — it's over.
   Its CPM ($23.72) is nearly double BPM_TOF_Manual's ($13.16). Fix cost first.
2. `BPM_TOF_Manual` ($56.00 CPP, 7.60 ROAS) is the efficient campaign — but **frequency is 5.20**.
   Fresh creative and a wider audience before more budget.
3. Spend is at **23% of the prior daily rate** ($236/day vs $1,036/day) — real headroom exists,
   but only once ceilings are known. See `my-work (outputs)/internal/reports/2026-08-28-meta-actuals.md`.

**Route to Coalition via Evan (Google):** see `my-work (outputs)/internal/drafts/2026-08-26-coalition-suggestions.md`
- Both PMAX budgets are `Limited by budget` at 4.72–5.91 ROAS
- `Standard Shop | Overflow` runs 8.95 ROAS on a $10/day budget
- `DSA | Search` is budget-limited at 3.87 ROAS
- ⚠️ 60 QT Powered Cooker carries only 28.9% margin (break-even 3.9) — flag before it gets scaled

**Guardrails:** ≤20–30% per campaign per week · stop if blended MER drops below **2.8** ·
expect efficiency decay as spend rises · **every budget change is Evan's click, not ROUX's.**

## Budget philosophy
1. **Season-weighted, not flat.** Spend should roughly track the demand curve in
   `my-files (knowledge)/hpc-reference/seasonal-calendar.md`. Jan–May should carry the majority of annual budget. Flat monthly
   budgets in this business waste money in August and leave money on the table in April.
2. **Profit, not ROAS.** Heavy freight means a 3.0 ROAS on a $715 cooker can lose money.
   See `my-files (knowledge)/hpc-reference/metrics-and-goals.md`.
3. **Never scale more than 20–30% per day** on a winning ad set. Learning-phase resets cost more than the extra spend earns.

## Meta structure (recommended)

**Prospecting**
- 1 broad Advantage+ Shopping campaign (let Meta find them) — the workhorse
- 1 interest/lookalike campaign as a control: LAL 1–3% of purchasers, crawfish/seafood/BBQ/outdoor cooking interests, geo-weighted LA/TX/MS/AL/FL
- 1 **transplant** test audience: Louisiana-affinity interests targeted *outside* Louisiana (see segment 5)

**Retargeting**
- 7-day site visitors + ATC + IG/FB engagers
- Creative job here is objection-killing: warranty, financing, 4mm, reviews, savings calculator

**Creative testing**
- Separate low-budget campaign, 3–5 new concepts per cycle, winners promoted to prospecting
- Test **hooks** not just creatives — same video, 3 different first-2-seconds

**Geo strategy:** Louisiana and the Gulf Coast should have their own budget and their own creative
(local references land). Rest-of-US gets the universal proof creative.

## Google structure (recommended)

| Campaign | Job | Notes |
|---|---|---|
| **Brand Search** | Defend the name | Cheap, high ROAS, mandatory. Don't let competitors buy "high performance cookers." |
| **Non-brand Search** | Harvest category demand | "crawfish boiler," "crawfish cooker," "turkey fryer," "commercial seafood boiler" |
| **Shopping / PMax** | Catalog coverage | Feed quality is the whole game. Titles must include QT size + "crawfish cooker." |
| **YouTube** | Where the video already exists | Cheap reach; the boil demos are the ad |

**Feed hygiene checklist:** product titles include size + category + brand; GTIN/MPN populated;
high-quality lifestyle primary image; accurate shipping/weight (heavy items get suppressed otherwise).

## Creative angles (rank-ordered by expected performance)

| # | Angle | Hook |
|---|---|---|
| 1 | **The timer** | "Cold water to rolling boil. Watch the clock." |
| 2 | **Crowd math** | "Two sacks. Forty people. One pot." |
| 3 | **Propane math** | "Same boil. Up to 75% less propane. Here's the tank after." |
| 4 | **Recovery** | "Dump a sack. 90 seconds. Back to a boil." |
| 5 | **Built here** | "Made in Louisiana by people who actually boil." |
| 6 | **Bluetooth** | "Light your burner from the porch." |
| 7 | **Warranty/risk** | "5 years. 4mm aluminum. Thin pots warp." |
| 8 | **UGC/creator** | Whitelisted creator content — usually the cheapest CPA in the account |
| 9 | **Season urgency** | "Season starts in three weeks. Ships in 1–2 days." |
| 10 | **Financing** | "$715 or pay over time with ShopPay." |

## Landing page strategy
- Hero cooker ads → dedicated landing page, not the generic collection page
- Commercial ads → commercial landing page + **savings calculator** (already built — see `my-files (knowledge)/hpc-reference/design-system.md`)
- Accessory ads → PDP with bundle upsell

## Commercial funnel (different game)
$2,500–$3,875 with a long cycle. Don't optimize for purchase.
- Objective: **lead** (form or call), not conversion
- Channels: Google Search (high intent), LinkedIn (church/catering/festival roles), Meta retargeting
- Offer: free consult / custom quote / "how many pounds per hour do you need?"
- Landing page: savings calculator + throughput math + financing
- Follow-up: this is a phone sale. Marketing's job ends at a qualified call.

## Weekly checklist
- [ ] Spend pacing vs. plan
- [ ] CAC by campaign vs. target
- [ ] Kill anything past threshold (see metrics file)
- [ ] Scale winners ≤30%
- [ ] 2–3 new creatives into testing
- [ ] Check search terms report for waste + new keyword ideas
- [ ] Check Meta Ad Library for competitor moves
