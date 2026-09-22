# Finn: Meta ad review, Tue 2026-09-22

**Read-only.** Nothing was written to Meta or Shopify. Reads 2026-09-22, 07:55–08:26 CDT.
**Sources:** Meta Ads connector, HP Cookers ADs `4392736013287` only (`ads_get_ad_entities`: `amount_spent`, `omni_purchase`, `cost_per_omni_purchase`, `effective_status`, `daily_budget`, `created_time`; `ads_account_get_activity_logs`), platform-reported · Shopify `high-performance-cookers.myshopify.com`: GraphQL `orders` (`sourceName`, `customerJourneySummary` first/last visit UTMs, `landingPageUrl`, `currentSubtotalPriceSet`, `customer.numberOfOrders`), ShopifyQL `sessions`, store time America/Chicago.
**Method:** same as `2026-09-21-finn-monday-checks.md` and the 2026-09-17 restatement. Match rules 1–5 from `my-skills/hpc-campaign-checkpoint/instructions.md` §3, journey first. **Net = `currentSubtotalPriceSet`**: after discounts and refunds, before shipping and tax. It includes any Shipping Protection line. That's the same measure as the baseline, not ShopifyQL net. **New** = the customer has no earlier order: `numberOfOrders` = 1, or all of their other orders were placed after this one. No Meta revenue figure is used anywhere. No ROAS is given.
**Reproduction check (fact):** re-running Sept 1–16 today gives the restated figures exactly: BPM 18 (10 journey + 8 Meta Shop), 18qt-TOF 2, IW 0, and 5 no-campaign `Facebook_UA` orders for $944.69.
All windows are after 2026-07-20, so one operator. The exception is lifetime spend on `BPM_TOF_Manual`, which runs from 2025-06-13 and spans the line.

---

## 1. Campaigns

**Only three campaigns spent anything Sept 15–22** *(Meta, campaign level, daily, spend > 0, read 07:58).* The account lists **56 campaigns**, and none is new since IW on Sept 11.

| Campaign | ID | Status | Daily budget | Sept 21 | **Sept 15–21** | Avg/day | Launched → spend since | Sept 22 so far (08:00) |
|---|---|---|---|---|---|---|---|---|
| `IW Lookalike 1% - Cold Prospecting - Sept 2026` | 52507989521191 | ACTIVE | **$100 CBO** | **$112.41** | **$685.84** | $97.98 | Sept 11 2026 → **$1,103.08** ($1,080.89 through Sept 21) | $22.19 |
| `BPM_TOF_Manual` | 6772105419387 | ACTIVE | ad-set: $60 + $62 + $42 = **$164** | $170.75 | **$1,137.38** | $162.48 | 2025-06-13 → $135,023.18 ⚠️ spans 2026-07-20 | $20.65 |
| `18qt-TOF-Prospecting` | 6998161993987 | ACTIVE | **$50 CBO** | $60.88 | **$369.69** | $52.81 | 2026-08-06 → $2,325.97 | $6.72 |
| `BM \| TOF \| ABO \| Open \| External Whitelisting` | 6870130501387 | ACTIVE campaign, **all 10 ad sets PAUSED** | ad-set, $450 combined if re-enabled | **$0** | **$0** | $0 | lifetime $19,316.13 (history) | $0 |
| `BM \| TOF \| HP Cookers \| ABO \| Offer Testing` | 6859139261187 | ACTIVE campaign, **all 5 ad sets PAUSED** | ad-set | **$0** | **$0** | $0 | lifetime $2,242.59 (history) | $0 |
| Any `RT` retargeting campaign | none | **does not exist** | n/a | $0 | $0 | n/a | n/a | $0 |

- **Not on the known list:** nothing. Every dollar of spend is in the three known campaigns (ad-level sums tie to the account total to the cent).
- **RT:** no live campaign with an RT name exists, and none is spending. The only RT object is the audience `RT - Viewed 18 QT - 30D` `52510298205791` (built 2026-09-18). ⚠️ The draft-state read is still unavailable ("being gradually rolled out"). An unpublished RT draft in Ads Manager can't be seen from here.
- **The "new campaign" is IW** (newest, Sept 11). **Budget vs actual (fact):** it went over $100 on 3 of 7 days: Sept 16 $104.80, Sept 19 $114.83, Sept 21 $112.41. Its 7-day average is **$97.98, under budget.** No budget change shows in the activity log since Sept 17 18:00 PT (the 200-entry read reaches back that far). Meta allows daily overage against the weekly total, so this is an observation, not a breach.
- **What changed inside IW on Sept 21 (fact):** `120qt-performance_rolling-boil` spent **$59.16**, against $6.92–$8.38 a day on Sept 18–20. It took more than half the campaign's day, and it's at $15.68 today by 08:00. Meta logged new "_Group_1" sub-IDs starting delivery for both ads, Sept 18–20. They carry no separate spend (IW ad sums = campaign sums).
- Other overage, observation only: `18qt-TOF` was over $50 on 5 of 7 days (avg $52.81). BPM was over $164 on 3 of 7 (Sept 17 $173.40, Sept 20 $198.27, Sept 21 $170.75), avg $162.48.

### BPM ad sets, Sept 15–21 *(Meta, ad-set level)*
| Ad set | ID | Budget | Spend | Avg/day |
|---|---|---|---|---|
| `Outdoor Cooking/BBQ/Grilling_Nov BPM_Holiday/Turkey Fryer` | 6845295330987 | $60 | $406.00 | $58.00 |
| `Outdoor Cooking/BBQ/Grilling_Video_Jay 30qt (turkey) Fryer Demo` | 6810865162387 | $62 | $437.79 | $62.54 |
| `LAL 1% Purchasers` | 6772110394587 | $42 | $293.59 | $41.94 |

### Account per day vs the $350 cap *(Meta, campaign level, daily)*
| Day | BPM | 18qt-TOF | IW | **Account** | Under $350 by |
|---|---|---|---|---|---|
| Tue Sept 15 | $156.15 | $48.18 | $84.52 | **$288.85** | $61.15 |
| Wed Sept 16 | $162.40 | $53.90 | $104.80 | **$321.10** | $28.90 |
| Thu Sept 17 | $173.40 | $56.55 | $98.44 | **$328.39** | $21.61 |
| Fri Sept 18 | $146.33 | $44.77 | $75.21 | **$266.31** | $83.69 |
| Sat Sept 19 | $130.08 | $50.38 | $114.83 | **$295.29** | $54.71 |
| Sun Sept 20 | $198.27 | $55.03 | $95.63 | **$348.93** | $1.07 |
| Mon Sept 21 | $170.75 | $60.88 | $112.41 | **$344.04** | $5.96 |
| **Total** | **$1,137.38** | **$369.69** | **$685.84** | **$2,192.91** | avg **$313.27/day** |

No day went over $350. The last two days came within $6 of it. Live caps sum to $314/day.

---

## 2. Every ad that spent Sept 1–21, plus active $0 ads

Meta: ad level, `2026-09-15→21` and `2026-09-01→21`, read 08:00. Lifetime = `date_preset maximum`, active ads only. Shopify: tagged orders by last visit (rules 1–4) or cart link (rule 5, marked **r5**). Orders whose tag carries a **zero-spend twin ID** are mapped to the same-name ad in the same ad set that Meta reports spend on (marked **twin**; IDs checked on Meta today).

**Actual CAC, tagged = spend ÷ Shopify-tagged new customers.** A floor on true CAC for orders we can see, not true CAC (§5).

### Sept 15–21 (7 days)
| Ad · ID | Campaign | Product (landing page) | Status | Spend | Meta purch. · CPP | Shopify-tagged orders | Tagged new | **CAC, tagged** |
|---|---|---|---|---|---|---|---|---|
| `120qt-crowd-math` 52507989521591 | IW | 120 QT Powered (`/products/120-qt-powered-seafood-crawfish-cooker`) | ACTIVE | $293.41 | 3 · $97.80 | **#17482** Sept 19 · $715.00 · 120 QT Powered · new | 1 | **$293.41** |
| `120qt-performance_rolling-boil` 52508008680391 | IW | Platinum bundle: 120 QT Performance + Triple Jet (`/products/platinum-boiling-bundle-…`) | ACTIVE | $82.68 | 0 · n/a | none | 0 | **0 tagged, $82.68 spent** |
| `hpc-dark-evergreen` 52508008680591 | IW | 18 QT (supported, not confirmed; **untagged**) | PAUSED Sept 18 | $309.75 | 0 · n/a | none (tag blind spot) | 0 | **0 tagged, $309.75 spent** |
| `BPM Tailgate Video` 6823510767787 | BPM | Powered-cookers collection (mixed) | ACTIVE | $387.60 | 6 · $64.60 | #17460 Sept 16 · $468.75 · **18 QT** + legs · new | 1 | **$387.60** |
| `Video_Jay 18qt Fryer Demo` 6855622474187 | BPM | 18 QT | ACTIVE | $301.13 | 9 · $33.46 | #17463 Sept 17 $468.75 18 QT new · #17478 Sept 19 $468.99 18 QT new · #17483 Sept 19 $468.75 18 QT new · #17489 Sept 20 $127.99 accessories **returning** | 3 (4 orders, $1,534.48) | **$100.38** |
| `Video_UGC/Review18qt Fryer` 6772110395587 (LAL 1%) | BPM | 18 QT | ACTIVE | $293.59 | 5 · $58.72 | #17454 Sept 15 $300.00 18 QT new **r5** · #17461 Sept 16 $459.00 18 QT new **r5** · #17466 Sept 17 $680.00 **100 QT Powered** new · #17469 Sept 17 $340.00 18 QT new **twin** | 4 (4 orders, $1,779.00) | **$73.40** |
| `Video_UGC/Review18qt Fryer` 6855622474387 (Nov Holiday) | BPM | 18 QT | ACTIVE | $97.65 | 0 · n/a | none | 0 | **0 tagged, $97.65 spent** |
| `Video_Jay 30qt (turkey) Fryer Demo` 6810865162787 | BPM | 30 QT turkey | ACTIVE | $50.19 | 0 · n/a | none | 0 | **0 tagged, $50.19 spent** |
| `IMG_Heavy Duty Heat.30qt ad copy` 6845666149587 | BPM | 30 QT (by name) | ACTIVE | $7.22 | 0 · n/a | none | 0 | **0 tagged, $7.22 spent** |
| `Video_ 30qt (turkey) Fryer Time Lapse` 6772110395187 | BPM | 30 QT | ACTIVE | $0.00 | 0 | none | 0 | not delivering |
| `18qt-004` 6998222424787 | 18qt-TOF | 18 QT | ACTIVE | $207.27 | 1 · $207.27 | none as last visit (first visit on #17499) | 0 | **0 tagged, $207.27 spent** |
| `18qt-001` 6998222425187 | 18qt-TOF | 18 QT (`/pages/18-qt-fish-fryer-brazier`) | ACTIVE | $134.90 | 5 · $26.98 | #17499 Sept 21 · $347.50 · 18 QT · new | 1 | **$134.90** |
| `18qt-002` 6998222425387 | 18qt-TOF | 18 QT | ACTIVE | $17.30 | 0 | none | 0 | **0 tagged, $17.30 spent** |
| `18qt-003` 6998161995187 | 18qt-TOF | 18 QT | ACTIVE | $10.22 | 0 | none | 0 | **0 tagged, $10.22 spent** |
| *18qt-TOF, ad not identifiable* | 18qt-TOF | | | | | #17492 Sept 20 · $468.75 · 18 QT + legs · new (`utm_content=Facebook_UA`, ad set 6998161994987) | 1 | campaign level only |
| **Total** | | | | **$2,192.91** | **29** | **12 orders · $5,313.48** | **11** | |

### Sept 1–21 (launch-to-date for IW, from Sept 11)
| Ad · ID | Spend | Meta purch. · CPP | Shopify-tagged orders | Tagged new | **CAC, tagged** |
|---|---|---|---|---|---|
| `120qt-crowd-math` 52507989521591 | $348.87 | 3 · $116.29 | #17482 ($715.00) | 1 | **$348.87** |
| `120qt-performance_rolling-boil` 52508008680391 | $162.92 | 0 | none | 0 | **0 tagged, $162.92 spent** |
| `hpc-dark-evergreen` 52508008680591 | $569.10 | 2 · $284.55 | none | 0 | **0 tagged, $569.10 spent** |
| `BPM Tailgate Video` 6823510767787 | $741.60 | 10 · $74.16 | #17460 ($468.75) | 1 | **$741.60** |
| `Video_Jay 18qt Fryer Demo` 6855622474187 | $724.36 | 14 · $51.74 | 7 orders, $1,760.78: #17366 Sept 5 $83.30 legs new · #17373 Sept 6 $21.00 wind shield ret · #17438 Sept 12 $122.00 legs ret · + the 4 above | 4 | **$181.09** |
| `Video_UGC/Review18qt Fryer` 6772110395587 (LAL 1%) | $601.54 | 12 · $50.13 | 8 orders, $3,332.12, all new: #17412 Sept 9 $445.32 twin · #17418 Sept 9 $444.60 twin · #17427 Sept 11 $338.20 r5 · #17449 Sept 14 $325.00 r5 · + the 4 above | 8 | **$75.19** |
| `Video_UGC/Review18qt Fryer` 6855622474387 (Nov Holiday) | $126.62 | 3 · $42.21 | #17450 Sept 14 $21.25 lid, new | 1 | **$126.62** |
| `Video_Jay 30qt (turkey) Fryer Demo` 6810865162787 | $104.24 | 6 · $17.37 | none | 0 | **0 tagged, $104.24 spent** |
| `IMG_Heavy Duty Heat.30qt ad copy` 6845666149587 | $11.41 | 2 · $5.71 | none | 0 | **0 tagged, $11.41 spent** |
| `18qt-004` 6998222424787 | $556.72 | 8 · $69.59 | none | 0 | **0 tagged, $556.72 spent** |
| `18qt-001` 6998222425187 | $175.75 | 7 · $25.11 | #17499 ($347.50) | 1 | **$175.75** |
| `18qt-002` 6998222425387 | $46.85 | 1 · $46.85 | none | 0 | **0 tagged, $46.85 spent** |
| `18qt-003` 6998161995187 | $47.14 | 3 · $15.71 | none | 0 | **0 tagged, $47.14 spent** |
| `LaborDay_A_Vintage - Copy` 52506056992591 (Jay 30qt set, PAUSED) | $453.19 | 18 · $25.18 | #17303 Sept 1 $389.30 18 QT new (twin) | 1 | $453.19 |
| `LaborDay_A_Vintage` 52506044953191 (Nov Holiday set, PAUSED) | $353.82 | 13 · $27.22 | #17317 $15.99 new r5 · #17344 $38.70 ret r5 · #17346 $340.00 18 QT new r5 (all twin) | 2 | $176.91 |
| `LaborDay_A_Vintage - Copy` 52506056992391 (LAL set, PAUSED) | $275.78 | 8 · $34.47 | #17340 $113.05 ret r5 · #17341 $369.05 40 QT sauce new (both twin) | 1 | $275.78 |
| `LaborDay_B_HPCDark` 52506055467791 (18qt-TOF, PAUSED) | $144.88 | 8 · $18.11 | #17380 $85.55 ret · #17390 $15.99 ret r5 (both twin) | 0 | 0 tagged new, $144.88 spent |
| `LaborDay_C_Finalhours - Copy` 52507804550991 (PAUSED) | $59.33 | 1 | none | 0 | 0 tagged, $59.33 spent |
| `LaborDay_D_TunnelTube` 52507810412191 (PAUSED) | $2.27 | 0 | none | 0 | 0 tagged, $2.27 spent |
| *Campaign-level only* | | | #17392 Sept 8 $18.99 BPM LAL set, ret · #17492 Sept 20 $468.75 18qt-TOF, new | 1 | |
| **Total** | **$5,506.39** | | **29 orders · $8,500.77** | **21** | |

---

## 3. Per product

"Spend aimed at" = the ad's landing page/creative (§2). "Tagged" = orders credited to those ads, whatever the buyer actually bought. Where the basket differs, the next column says so.

| Product | Spend Sept 15–21 | Tagged orders · new · net | **CAC, tagged** | Spend Sept 1–21 | Tagged orders · new · net | **CAC, tagged** | What tagged buyers bought |
|---|---|---|---|---|---|---|---|
| **18 QT fryer** (Jay 18qt, 2× UGC, 18qt-001…004) | $1,062.06 | 10 · 9 · $4,129.73 | **$118.01** | $2,278.98 | 18 · 15 · $5,930.40 | **$151.93** | 7-day: 8 of 10 contain an 18 QT; #17466 is a 100 QT Powered, #17489 accessories. Sept 1–21: 12 of 18 contain an 18 QT |
|  + `hpc-dark-evergreen` (18 QT, unconfirmed, untagged) | +$309.75 → $1,371.81 | same | $152.42 | +$569.10 → $2,848.08 | same | $189.87 | |
| **30 QT turkey fryer** | $57.41 | 0 | **0 tagged, $57.41 spent** | $115.65 | 0 | **0 tagged, $115.65 spent** | |
| **120 QT Powered pot** (`crowd-math`) | $293.41 | 1 · 1 · $715.00 | **$293.41** | $348.87 | 1 · 1 · $715.00 | **$348.87** | #17482, 120 QT Powered with Triple Jet burner option |
| **Platinum bundle: 120 QT Performance + Triple Jet** (`rolling-boil`) | $82.68 | 0 | **0 tagged, $82.68 spent** | $162.92 | 0 | **0 tagged, $162.92 spent** | |
| **Pots generally** (both IW pot ads) | $376.09 | 1 · 1 · $715.00 | **$376.09** | $511.79 | 1 · 1 · $715.00 | **$511.79** | |
| **Triple Jet (standalone)** | $0, no ad | n/a | n/a | $0 | n/a | n/a | Only reaches Meta inside the Platinum bundle ad |
| **Tailgate kits** | $0, no kit ad (kits are DRAFT until Sept 25) | n/a | n/a | $0 | n/a | n/a | |
| **Powered-cookers collection** (`BPM Tailgate Video`) | $387.60 | 1 · 1 · $468.75 | **$387.60** | $741.60 | 1 · 1 · $468.75 | **$741.60** | #17460 bought an 18 QT |
| **Labor Day sitewide** (Sept 1–8 only) | $0 | n/a | n/a | $1,289.27 | 8 · 4 · $1,367.63 | **$322.32** | 2 of 8 contain an 18 QT |
| Unassigned BPM (ad set only) | | | | | 1 · 0 · $18.99 | | #17392 thermometer |
| **Account** | **$2,192.91** | **12 · 11 · $5,313.48** | *(blended, reconciliation only)* | **$5,506.39** | **29 · 21 · $8,500.77** | | |

#17492 (18qt-TOF, ad unknown) is counted in 18 QT: only 18 QT ads were spending in that ad set on Sept 20. It landed on and bought the 18 QT.

---

## 4. Anomalies and data flags

1. **IW spend shifted to `rolling-boil` on Sept 21** ($59.16 vs ~$7/day), with no logged edit since Sept 17 18:00 PT. It has 0 Meta purchases and 0 tagged orders on $178.58 lifetime. Fact only. The "why" (Meta's own reallocation inside the CBO) isn't tested.
2. **IW Sept 21 was $112.41 against $100.** It's the third day over budget in seven; the 7-day average is under ($97.98).
3. **The account ran within $6 of the $350 cap on both Sept 20 and 21** ($348.93, $344.04).
4. **Meta purchases vs tagged orders, Sept 15–21 (observation, no baseline):** Meta claims 29, Shopify has 12 tagged. By ad: `18qt-004` 1 vs 0, `18qt-001` 5 vs 1, `crowd-math` 3 vs 1, `Tailgate Video` 6 vs 1. Today Meta already claims 2 purchases on `BPM Tailgate Video`. None of Shopify's 3 Sept 22 CT orders (#17503 direct, #17504 Google, #17505 $0 draft) carries a Meta tag.
5. **No Meta Shop (rule 5) orders since Sept 16.** The last Facebook & Instagram-channel order is #17466 (Sept 17, journey-tagged).
6. **Zero-spend twin IDs carry tags on web orders too, not just cart links.** #17412, #17418 and #17469 are tagged `6772116256187`. ShopifyQL shows 108 sessions on that twin ID Sept 15–22, against 9 on the spending ID `6772110395587`. Ad-level credit here depends on the same-name, same-ad-set mapping. Campaign-level credit doesn't.
7. **`18qt-TOF` mostly tags `utm_content=Facebook_UA`, not the ad ID.** Only `18qt-001`/`18qt-004` IDs appear in sessions. So 18qt-TOF ad-level tagged counts are a floor; #17492 could only be credited at campaign level.
8. **The date-range order search silently left out 3 archived (closed) orders** (#17318, #17322, #17382, found via the numbering gaps). Checked by name: none carries a Meta tag, so no count here changes. 218 + 3 = 221 orders Sept 1–22.
9. **Meta figures drift between reads.** Sept 20 was $197.58 → $198.27 (BPM), $54.56 → $55.03 (18qt-TOF), $95.38 → $95.63 (IW), so Sept 18–20 is $909.12 yesterday vs $910.53 today. Sept 1–16 now sums to about $0.98 above the $3,922.45 baseline. Late-settling spend; not chased.
10. **Day boundaries differ.** Shopify days are Central. Meta days are the ad account's timezone, which wasn't read (`created_time` offsets show −0700, which suggests Pacific; unconfirmed). Up to 2 hours of edge mismatch per day.
11. **Stale ad links still get clicked.** Sept 15–22 sessions carry dormant BM ad names (External Whitelisting, GUGC, Creative Testing Static: 1 session each) with $0 spend. There are also ~200 sessions tagged `Facebook_UA` with **no campaign** on many product pages (steamers, sauce cooker, leg extensions). Source unknown; #17451 (Sept 15, $487.98, 18 QT, new) is one such order and is **not** credited to any campaign.
12. The account listing returned **56** campaigns; the 2026-09-17 read said 58. Not chased.

---

## 5. What these queries structurally can't see

- **Untagged orders.** A buyer who clicks an ad, leaves, and returns through Google, direct or email is credited elsewhere under last-visit rules. First-visit Meta matches are listed but not counted (e.g. #17327, #17339, #17342, #17397 Sept 1–16; #17499's first visit was `18qt-004`).
- **View-through and cross-device.** Meta counts 1-day-view purchases; Shopify can't.
- **`hpc-dark-evergreen`** sent no tags, so none of its $569.10 could be matched by any rule.
- **Meta Shop orders whose cart link is empty or cut before both IDs** (e.g. #17384, #17325 remain unmatched).
- **New vs returning** rests on Shopify's `numberOfOrders`, which counts POS, draft and $0 replacement orders. A buyer whose only earlier order was a warranty replacement shows as returning. Customers who bought under a different email show as new.
