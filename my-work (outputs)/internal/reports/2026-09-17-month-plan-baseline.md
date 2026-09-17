# Month-plan baseline: Thu Sept 17 – Sat Oct 17, 2026

**Pulled by:** Finn, 2026-09-17 · read-only, no writes anywhere.
**Sources:** Shopify ShopifyQL (`run-analytics-query`) and Shopify Admin GraphQL (orders, line-item groups, customer journey), store `high-performance-cookers.myshopify.com`, timezone America/Chicago · Meta Ads connector, account **HP Cookers ADs `4392736013287`** only.
**Definitions:** net = ShopifyQL `net_sales` (gross − discounts − returns, before shipping and tax). **AOV = net ÷ orders.** ShopifyQL windows are inclusive of both end dates.

> ⚠️ **Two operators.** Every 2025 figure here is the BM Digital era (fired 2026-07-20). Year-over-year compares two operators, not one trend.
>
> ⚠️ **Returns land on the day they are processed, not the order date.** A window's net includes refunds on older orders and leaves out later refunds on its own orders.

---

## 1. Same window last year: Wed Sept 17 – Fri Oct 17, 2025

| Orders | Gross | Discounts | Returns | **Net** | **AOV** |
|---|---|---|---|---|---|
| **195** | $103,732.43 | −$7,894.51 | −$1,730.79 | **$94,107.13** | **$482.60** |

*ShopifyQL `FROM sales`, 2025-09-17 → 2025-10-17. GraphQL order count for the same window: 195 (matches).*

### 1a. By product group

"Orders" = orders containing the group (a single order can fall in several groups, so the column does not add to 195). Net does add to the total.

| Group | Orders | Net 2025 | Share |
|---|---|---|---|
| 18 QT fryers (powered + non-powered) | 28 | $8,032.92 | 8.5% |
| 30 QT turkey fryer | 33 | $11,157.65 | 11.9% |
| 60 QT dual turkey fryer | 5 | $2,347.75 | 2.5% |
| Powered / Performance pots, 30–120 QT (sizes below) | 43 | $25,474.51 | 27.1% |
| Boil Boss Triple Jet Burner | 0 | $0.00 | 0% |
| Commercial cookers (gallon-sized, incl. 40 gal / 160 QT) | 7 | $20,482.80 | 21.8% |
| Accessories (everything typed Accessory, plus racks, inserts, lids, baskets) | n/a | $9,552.17 | 10.2% |
| Commercial other (Crawcuzzi, steamer shelves, commercial burner modules, wheels) | n/a | $4,027.50 | 4.3% |
| Steamers (28 QT rack, 100 QT rack) | 3 | $2,958.40 | 3.1% |
| 4-Way 20 QT fryer | 5 | $1,759.00 | 1.9% |
| Scratch & Dent pots | 4 | $1,434.59 | 1.5% |
| Custom logo / custom product | n/a | $1,233.75 | 1.3% |
| Shipping protection | 95 | $637.72 | 0.7% |
| ⚠️ No product title in ShopifyQL | 9 | $5,008.37 | 5.3% |
| **Total** | **195** | **$94,107.13** | |

**Pots by size, 2025 window:** 30 QT Performance $1,067.14 (4) · 40 QT Powered $3,482.61 (9) · 40 QT Sauce $576.80 (2) · 60 QT Powered $1,825.57 (4) · 80 QT Powered $4,173.11 (7) · 100 QT Powered $2,988.98 (5) · **120 QT Powered $11,360.30 (14)**. There were no Performance-pot sales at 60–120 QT in the window.
**Commercial by size:** 40 gal / 160 QT $5,251.50 (3) · 60 gal $9,246.30 (3) · 80 gal $5,985.00 (1). No 100/120/140 gal sold in the window.
**Bundles (overlay, not additive):** 2 orders, $245.00 in bundle lines, both the Boil Boss Combo. *(GraphQL `lineItemGroup`.)*

*ShopifyQL `GROUP BY product_title, product_type` and filtered `WHERE product_title CONTAINS` queries for distinct orders per group, 2025-09-17 → 2025-10-17.*

### 1b. By week (date-aligned to the 2026 plan weeks)

The 2026 plan weeks run Thu–Wed. The same dates in 2025 fell Wed–Tue.

| 2025 dates | Orders | Net | AOV | 18 QT | 30 QT turkey | 60 QT turkey | Pots | Commercial | All else |
|---|---|---|---|---|---|---|---|---|---|
| Sep 17–23 | 40 | $20,350.68 | $508.77 | $1,455.45 | $2,701.05 | $475.00 | $7,756.54 | $2,249.10 | $5,713.54 |
| Sep 24–30 | 37 | $13,618.17 | $368.06 | $2,206.62 | $1,362.75 | $0.00 | $2,457.32 | $2,249.10 | $5,342.38 |
| Oct 1–7 | 35 | $28,406.53 | $811.62 | $1,946.38 | $1,020.32 | $457.75 | $5,048.28 | $12,580.85 | $7,352.95 |
| Oct 8–14 | 60 | $23,342.70 | $389.05 | $1,829.77 | $3,362.45 | $470.00 | $8,360.89 | $3,403.75 | $5,915.84 |
| Oct 15–17 (3 days) | 23 | $8,389.05 | $364.74 | $594.70 | $2,711.08 | $945.00 | $1,851.48 | $0.00 | $2,286.79 |
| **Total** | **195** | **$94,107.13** | | $8,032.92 | $11,157.65 | $2,347.75 | $25,474.51 | $20,482.80 | $26,611.50 |

*Orders and net: ShopifyQL `TIMESERIES day`, summed. Groups: ShopifyQL `GROUP BY product_title, product_variant_title` for each block. All columns reconcile to the window totals.* The Oct 1–7 AOV of $811.62 comes from $12,580.85 in commercial cookers (80 gal, 60 gal and 40 gal) that week.

---

## 2. Month to date and trailing 30 days

### 2a. Sept 1–16, 2026 vs Sept 1–16, 2025

| Window | 2026 orders | 2026 net | 2026 AOV | 2025 orders | 2025 net | 2025 AOV |
|---|---|---|---|---|---|---|
| **Sept 1–16** | **178** | **$64,156.20** | **$360.43** | 113 | $47,070.43 | $416.55 |
| Sept 1–8 (sale both years) | 126 | $40,853.33 ⚠️ | $324.23 | 63 | $26,144.22 | $414.99 |
| **Sept 9–16 (ex-sale)** | **52** | **$23,302.87** | **$448.13** | 50 | $20,926.21 | $418.52 |

*ShopifyQL `TIMESERIES day`, 2026-09-01 → 09-16 and 2025-09-01 → 09-16. The Sept 1–16 totals also match a single un-split query: 2026 gross $76,254.01 · discounts −$6,845.51 · returns −$5,252.30. 2025 gross $52,114.98 · discounts −$3,878.98 · returns −$1,165.57.*

⚠️ **Data problem:** today's pull puts Sept 1–8 2026 net at **$40,853.33** (AOV $324.23). The board's verified figure is **$41,100.84** (AOV $326.20), from 2026-09-09. That is $247.51 lower, on the same 126 orders. The cause has not been tested. One candidate is a post-sale adjustment Shopify re-dated into the window, but that is unconfirmed. The board figure has not been changed. 2025 Sept 1–8 matches the board exactly. Sept 1–8 was also a sale in 2025 (LABOR15 and others), so both rows are sale vs sale.

### 2b. Trailing 30 days: Aug 17 – Sep 16, 2026

| Orders | Gross | Discounts | Returns | **Net** | **AOV** |
|---|---|---|---|---|---|
| **315** | $134,877.11 | −$8,989.81 | −$8,276.13 | **$117,611.17** | **$373.37** |

*ShopifyQL, 2026-08-17 → 2026-09-16. GraphQL order count 137 + 178 = 315 (matches). The window includes the Sept 1–8 sale.*

| Group | Orders | Net trailing 30 | Share | 2025 window (for reference) |
|---|---|---|---|---|
| 18 QT fryers | 69 | $22,138.87 | 18.8% | $8,032.92 |
| 30 QT turkey fryer | 11 | $4,733.96 | 4.0% | $11,157.65 |
| 60 QT dual turkey fryer | 4 | $1,861.01 | 1.6% | $2,347.75 |
| Powered / Performance pots, 30–120 QT | 49 | $27,062.06 | 23.0% | $25,474.51 |
| Boil Boss Triple Jet Burner | 35 | $13,081.34 | 11.1% | $0.00 |
| Commercial cookers (gallon) | 4 | $9,670.65 | 8.2% | $20,482.80 |
| Accessories | n/a | $18,081.95 | 15.4% | $9,552.17 |
| Navimow (mower, gate, garage) | n/a | $8,132.93 | 6.9% | $0.00 |
| Scratch & Dent pots | 10 | $4,874.85 | 4.1% | $1,434.59 |
| Commercial other (Crawcuzzi, sorting table, wheels, brackets) | n/a | $3,773.00 | 3.2% | $4,027.50 |
| 4-Way 20 QT fryer | 7 | $2,585.02 | 2.2% | $1,759.00 |
| Custom labor / product / logo | n/a | $1,285.25 | 1.1% | $1,233.75 |
| Shipping protection | 145 | $1,099.92 | 0.9% | $637.72 |
| ⚠️ No product title in ShopifyQL | 1 | −$769.64 | | $5,008.37 |
| **Total** | **315** | **$117,611.17** | | $94,107.13 |

**Pots by size, trailing 30:** 30 QT Perf $636.50 (2) · 40 QT Sauce $849.59 (3) · 60 QT Powered $2,509.52 (6) · 60 QT Perf $1,714.04 (5) · 80 QT Powered $4,761.00 (7) · 80 QT Perf $886.32 (2) · 100 QT Powered $3,901.00 (6) · 100 QT Perf $404.83 (1) · **120 QT Powered $8,300.50 (8)** · 120 QT Perf $3,098.76 (10). *(Performance sizes come from the variants of `Performance Boiling Pots (60QT to 120QT)` plus the older per-size Performance listings.)*
**18 QT by variant:** 1/4" valve + basket 58 orders, $19,698.87 · 1/4" valve, no basket 6, $1,485.00 · no valve 4, $1,220.00 · a $265 refund on the non-powered listing.
**Commercial by size:** 40 gal / 160 QT $3,796.65 (3) · 120 gal $3,175.00 (1) · 60 gal $2,699.00 on **0 orders**. ⚠️ That 60 gal net has no order in the window, so it is probably an adjustment to an older order. Not tested.
**Bundles (overlay, not additive):** **18 bundle orders, $11,681.29 in bundle lines** (after line discounts, before returns): Ultimate Boiling Bundle 6 · Platinum Boiling Bundle 6 · Boil Boss Ultimate Combo 4 · Boil Boss Combo 1 · Zydeco Fire Combo 1. Split: Aug 17–31 7 orders / $4,124.44 · Sept 1–8 7 / $3,611.91 · Sept 9–16 4 / $3,944.94. *(GraphQL `lineItemGroup`.)* ShopifyQL has no row under any bundle title, so bundle sales show up under their component products (pots, Triple Jet, accessories). **Do not add bundles to the groups above.**

---

## 3. 2025 turkey fryer ramp, Sept 15 – Nov 26

Calendar weeks, Monday start (ShopifyQL `TIMESERIES week`). "Orders" = orders containing the product.

| Week of | 30 QT orders | 30 QT net | 60 QT orders | 60 QT net |
|---|---|---|---|---|
| Sep 15 | 5 (8 units) | $2,390.00 | 2 | $940.00 |
| Sep 22 | 7 | $2,338.80 | 0 | $0.00 |
| Sep 29 | 3 | $1,020.32 | 1 | $457.75 |
| Oct 6 | 8 | $2,007.45 | 1 | $470.00 |
| Oct 13 | 17 | $5,756.58 | 2 | $945.00 |
| Oct 20 | 23 | $7,057.37 | 3 | $1,405.00 |
| Oct 27 | 33 | $11,564.20 | 7 | $3,579.69 |
| Nov 3 | 49 | $15,914.16 | 10 | $4,957.78 |
| **Nov 10** | **94** | **$31,785.68** | **17** | **$8,330.28** |
| Nov 17 | 24 | $7,816.35 | 13 | $5,561.97 |
| Nov 24–26 (3 days) | **0** | $0.00 | 6 | $1,715.51 |
| **Total** | **263** | **$87,650.91** | **62** | **$28,362.98** |

*ShopifyQL, 2025-09-15 → 2025-11-26. The weeks sum to the un-split totals.*

- **The curve:** single digits a week through the week of Oct 6. It doubles the week of Oct 13, then climbs every week to a peak the week of Nov 10.
- ⚠️ **The 30 QT has zero orders from Fri Nov 21 onward** (the last were 2 on Nov 20). The 60 QT kept selling. A **40 QT Single Turkey Fryer** appears Nov 19–24 (10 orders, $3,202.97). This is an observation only. The cause (stockout, product swap, or something else) has not been tested, and Shopify holds no historical stock counts to check it against.
- ⚠️ **The board's numbers do not reconcile with this pull.** Board: 164 turkey orders Nov 1–15 and 294 Oct–Nov (235 + 59). ShopifyQL today: **171 orders, $61,544.32** Nov 1–15 (30 + 60 QT, distinct orders), and **319** Oct 1–Nov 30 (251 + 68). The board figure probably came from a different order-level method, but that has not been tested. The weekly shape is the same either way: Nov 1–15 is the peak. The board count has not been changed.

---

## 4. New vs returning customers

| Window | New customers | Returning customers | Orders |
|---|---|---|---|
| Sept 17 – Oct 17, 2025 | **132** | **50** | 195 |
| Aug 17 – Sep 16, 2026 | **196** | **106** | 315 |

*ShopifyQL `new_customers`, `returning_customers`, same windows.* These count **customers, not orders**, and they are Shopify's own classification. They include non-web channels. **Not an input to actual CAC as-is:** they are not split by channel, and the 2026 window includes the Labor Day sale.

---

## 5. Meta: HP Cookers ADs (`4392736013287`), Sept 1–16, 2026

Meta figures are **platform-reported**: 7-day click / 1-day view attribution, read-only. Only 3 campaigns had spend. The dormant BM Digital campaigns had $0.

| Campaign | Spend | Meta-reported purchases | Meta cost per purchase | Shopify orders, last-visit Meta UTM on that campaign ID | Their order subtotal |
|---|---|---|---|---|---|
| `BPM_TOF_Manual` (`6772105419387`) | $2,572.94 | 71 | $36.24 | 10 | $2,383.56 |
| `18qt-TOF-Prospecting` (`6998161993987`) | $765.28 | 24 | $31.89 | 1 | $85.55 |
| `IW Lookalike 1% - Cold Prospecting - Sept 2026` (`52507989521191`), from Sept 11 | $584.23 | 2 | $292.12 | **0** | $0.00 |
| Meta paid UTM with no campaign ID (`content=Facebook_UA`) | n/a | n/a | n/a | 5 | $944.69 |
| **Total** | **$3,922.45** | **97** | $40.44 | **16** | **$3,413.80** |

*Meta: `ads_get_ad_entities`, campaign level, time_range 2026-09-01 → 2026-09-16, `amount_spent`, `omni_purchase`, `cost_per_omni_purchase`. Shopify: GraphQL orders created 2026-09-01 → 09-16 (178 orders, all with journey data ready), `customerJourneySummary.lastVisit.utmParameters`, source facebook (or blank) + medium paid. Subtotal = `currentSubtotalPriceSet` (after discounts and refund removals, before shipping and tax). That is **not** the same measure as ShopifyQL net.*

- **Claimed vs real:** Meta claims 97 purchases. Shopify has **16 orders** with a Meta paid UTM on the last visit, 19 counting first or last visit, and 2 more with a Facebook referrer and no UTM. Split: Sept 1–8 10 last-visit orders ($1,423.90), Sept 9–16 5 ($1,968.65), plus #17450 (source blank, medium paid). This is an observation, not an attribution rate: Meta counts view-through and cross-device purchases.
- **Meta revenue is not reported here, by rule.** ⛔ Don't divide Shopify net by Meta spend and call it ROAS.
- Ad sets, Sept 11–16: `BPM_TOF_Manual`'s three ad sets have exited Learning (`SUCCESS`). `18qt_prospecting` is **Learning**, 4 conversions.

### IW lookalike to date

| Window | Spend | Meta purchases | Impressions | Learning | Shopify UTM-matched orders |
|---|---|---|---|---|---|
| Sept 11–16 | $584.23 | 2 | 32,576 | **Still `LEARNING`, 2 conversions** | **0** |
| Lifetime (includes part of Sept 17) | **$593.89** | 2 | 33,238 | n/a | not re-pulled for Sept 17 |

*Meta: ad-set `learning_stage_info` (2026-09-11 → 09-16) and ad-level `date_preset: maximum`.* By ad, lifetime: `hpc-dark-evergreen` $456.63, 2 purchases (**77% of spend**) · `120qt-performance_rolling-boil` $80.39, 0 · `120qt-crowd-math` $56.87, 0. No Shopify order Sept 11–16 carries the IW campaign ID or any of its three ad IDs.

---

## 6. Sessions and conversion rate

| Window | Sessions | Added to cart | Reached checkout | Completed checkout | Conversion rate |
|---|---|---|---|---|---|
| Sept 17 – Oct 17, 2025 | 26,746 | 660 | 548 | 150 | **0.56%** |
| Aug 17 – Sep 16, 2026 | 83,747 | 1,139 | 677 | 249 | **0.30%** ⚠️ |
| — excluding Aug 19, 20, 21, 28, 29 | 43,333 | n/a | n/a | 215 | 0.50% |
| Sept 1–16, 2026 | 21,706 | n/a | n/a | 137 | 0.63% |

*ShopifyQL `FROM sessions`, same windows; daily series for the exclusions. Conversion rate = completed-checkout sessions ÷ sessions.*

- ⚠️ **Data problem, not a demand change:** five days in the trailing window had 5,470–14,169 sessions against a normal ~1,000–2,800, with no rise in checkouts (Aug 28: 14,169 sessions, 7 checkouts). The board already flags the Aug 28 spike as bot-like. Deciding what to exclude is a judgment call. The 0.50% row shows the effect of excluding those days and is not a corrected figure.
- Completed-checkout sessions (249) ≠ orders (315). Orders include channels that have no online-store session.
- Daily sessions have been falling since Sept 9 (1,099 → 956 on Sept 16). That's an observation with no baseline.

---

## What I could not get

1. **Actual CAC**: no Google Ads spend feed (CSV only, none supplied for these windows), and new-customer counts aren't split by channel.
2. **Bundle net sales comparable to ShopifyQL net**: bundles only show in GraphQL line-item groups. What's given is bundle-line value after discounts, before returns.
3. **Why the 30 QT turkey fryer stopped selling Nov 21, 2025**: no historical inventory in Shopify, and Digit isn't connected.
4. **A reconciliation of the board's 164 / 294 turkey counts, and of the $41,100.84 Labor Day net**: today's figures differ, and the method difference hasn't been tested.
5. **Meta-reported purchases matched to Shopify at the order level**: UTMs carry numeric IDs, and 5 orders carry `Facebook_UA` with no campaign ID.
6. **Google Ads spend and conversions for any window**: CSV only, and no CSV on file for these dates.
7. **Accessory and "other" order counts**: product-level order counts overlap, so only net is given for those groups.

---

# Checks — 2026-09-17 afternoon

**Pulled by:** Finn, 2026-09-17 · read-only everywhere, no writes to Shopify or Meta.
**Sources:** ShopifyQL (`sales`, `sessions`, `inventory`) and Admin GraphQL, timezone America/Chicago · Meta Ads connector, **HP Cookers ADs `4392736013287` only** · the live storefront (`/products/<handle>.js` and page HTML, fetched 2026-09-17) · files named inline.
**Labels:** *tested* = a query was run that separates the cause from the alternatives · *untested* = it wasn't, or couldn't be · *observation* = no baseline.

## What changes ROUX's draft

1. **The low-ticket share is much higher than "≥ $127/day".** Sept 11–16 it averaged **$165.88/day (51.8% of spend)** on ads whose landing page is verified as 18 QT or 30 QT. That excludes `hpc-dark-evergreen`. With it, **$240.37/day (75.0%)**. On Sept 15–16 alone: $149.78 (49.2%) verified, **$243.59 (80.0%)** with dark-evergreen. The cap works out to $78.50 at $314 of caps, $86 at $344. Most of it is **BPM**: its three 18 QT video ads average $107/day. **The cap is not on file as adopted** (§4).
2. **The IW lookalike's "0 Shopify-tagged orders" can't see its main ad.** `hpc-dark-evergreen` took **$446.97 of $584.23** Sept 11–16, and **~100% of IW spend on Sept 15–16** (the two 120 QT ads got $1.49 and $0.07). It logged **127 Meta landing-page views and zero sessions tagged with its name** in Shopify. The two 120 QT ads' tags do arrive (65 sessions against 57 landing-page views). So the checkpoint rule "0 tagged orders" is structurally blind to 77%+ of IW's spend. *Tested* (§3).
3. **The two "ACTIVE" BM campaigns can't deliver as they stand.** Each campaign is ACTIVE, but **every ad set under them is PAUSED** and Meta reports delivery `inactive: all ad sets off`. The board ("off") is right at the ad-set level. The draft ("ACTIVE, $0") is right at the campaign level. Decision 8 is housekeeping, not an open risk (§2).
4. **`campaigns.md` is wrong that BPM carries no UTMs.** BPM ads arrive in Shopify tagged `utm_source=facebook · utm_medium=paid · utm_campaign=<campaign ID> · utm_content=<ad ID>`, and so does `18qt-004`. Per-ad Shopify matching is possible for BPM today (§3).
5. **The 2025 extension through Oct 31 is lumpy.** Oct 29–31, 2025 alone did $31,555.08 net on 29 orders, **$13,532.30 of it commercial cookers**. Another **$6,430.75 was "commercial other"** (Crawcuzzi, sorting tables) and $2,750 custom product. **Those two stay inside T2 as ROUX defined it**, which excludes only gallon-sized cookers and Navimow (§1).
6. **The Triple Jet did sell in 2025**, first on **Oct 21, 2025** (3 orders, $1,275). "Didn't exist" is true only for the Sept 17–Oct 17 window.
7. **Kit gates: every blocker is still live, and there are three more copy problems** on kit destination pages (§6). No new photos are on either kit.

---

## 1. 2025 baseline extended through Oct 31

### 1a. Windows

| Window (2025) | Orders | Gross | Discounts | Returns | **Net** | **AOV** |
|---|---|---|---|---|---|---|
| Sept 17 – Oct 17 *(from §1, unchanged)* | 195 | $103,732.43 | −$7,894.51 | −$1,730.79 | **$94,107.13** | $482.60 |
| **Oct 18 – Oct 31** | **125** | $81,349.95 | −$3,630.05 | −$2,488.48 | **$75,231.42** | **$601.85** |
| **Sept 17 – Oct 31** | **320** | $185,082.38 | −$11,524.56 | −$4,219.27 | **$169,338.55** | **$529.18** |

*ShopifyQL `FROM sales`, each window queried un-split. The two parts sum exactly to the full window (orders and net).*

### 1b. By product group, same definitions as §1a

| Group | Oct 18–31 orders | Oct 18–31 net | Sept 17–Oct 31 orders | **Sept 17–Oct 31 net** | Share |
|---|---|---|---|---|---|
| 18 QT fryers | 10 | $4,039.77 | 38 | **$12,072.69** | 7.1% |
| 30 QT turkey fryer | 48 | $15,903.03 | 81 | **$27,060.68** | 16.0% |
| 60 QT dual turkey fryer | 8 | $3,564.69 | 13 | **$5,912.44** | 3.5% |
| Pots 30–120 QT (Powered, Performance, 40 QT Sauce) | 17 | $9,326.51 | 60 | **$34,801.02** | 20.6% |
| Boil Boss Triple Jet Burner | 3 | $1,275.00 | 3 | **$1,275.00** | 0.8% |
| **Commercial cookers (gallon)** | 6 | $20,381.30 | 13 | **$40,864.10** | **24.1%** |
| Accessories (incl. racks, burner modules, ignition, inserts) | n/a | $4,966.91 | n/a | $14,519.08 | 8.6% |
| Commercial other (Crawcuzzi, chute, sorting table, wheels, guide rails) | n/a | $6,755.75 | n/a | $10,783.25 | 6.4% |
| Custom product | n/a | $5,972.50 | n/a | $7,206.25 | 4.3% |
| No product title in ShopifyQL | n/a | $1,789.89 | n/a | $6,798.26 | 4.0% |
| Steamers | 0 | $0.00 | 3 | $2,958.40 | 1.7% |
| 4-Way 20 QT fryer | 1 | $266.25 | 6 | $2,025.25 | 1.2% |
| Scratch & Dent pots | 1 | $437.50 | 5 | $1,872.09 | 1.1% |
| Shipping protection | n/a | $552.32 | n/a | $1,190.04 | 0.7% |
| **Total** | **125** | **$75,231.42** | **320** | **$169,338.55** | |

*ShopifyQL `GROUP BY product_title, product_variant_title, product_type` for Oct 18–21, Oct 22–28 and Oct 29–31 (they sum to $75,231.42). Distinct-order counts come from filtered queries (`WHERE product_title CONTAINS …`, pots with `NOT CONTAINS 'Gallon'`). Full-window orders = §1a + Oct 18–31; the windows don't overlap, so they add.*

**ROUX's T2 line (ex-commercial cookers, ex-Navimow; Navimow $0 in 2025):** Oct 18–31 **$54,850.12** · **Sept 17–Oct 31 $128,474.45**. *(Derived: net − gallon commercial cookers.)* ⚠️ That line still holds $10,783.25 of commercial other, $7,206.25 of custom product and $6,798.26 with no title.
**Commercial cookers, Oct 18–31:** 140 gal $4,350.00 (1) · 60 gal $2,499.00 + $5,798.00 + $2,374.05 (3) · 120 gal $3,415.25 (1) · 40 gal / 160 QT $1,945.00 (1).

### 1c. Weekly, Thu–Wed plan weeks through Sat Oct 31 (2025 dates)

| 2025 dates | Orders | Net | AOV | 18 QT | 30 QT turkey | 60 QT turkey | Pots | Triple Jet | Commercial cookers | All else |
|---|---|---|---|---|---|---|---|---|---|---|
| Sep 17–23 | 40 | $20,350.68 | $508.77 | $1,455.45 | $2,701.05 | $475.00 | $7,756.54 | $0 | $2,249.10 | $5,713.54 |
| Sep 24–30 | 37 | $13,618.17 | $368.06 | $2,206.62 | $1,362.75 | $0.00 | $2,457.32 | $0 | $2,249.10 | $5,342.38 |
| Oct 1–7 | 35 | $28,406.53 | $811.62 | $1,946.38 | $1,020.32 | $457.75 | $5,048.28 | $0 | $12,580.85 | $7,352.95 |
| Oct 8–14 | 60 | $23,342.70 | $389.05 | $1,829.77 | $3,362.45 | $470.00 | $8,360.89 | $0 | $3,403.75 | $5,915.84 |
| **Oct 15–21** | **51** | **$22,168.08** | $434.67 | $1,846.70 | $6,429.34 | $1,880.00 | $3,127.99 | $1,275.00 | $0.00 | $7,609.05 |
| **Oct 22–28** | **68** | **$29,897.31** | $439.67 | $1,942.67 | $8,289.86 | $1,264.22 | $7,134.60 | $0 | $6,849.00 | $4,416.96 |
| **Oct 29–31 (3 days)** | **29** | **$31,555.08** | $1,088.11 | $845.10 | $3,894.91 | $1,365.47 | $915.40 | $0 | $13,532.30 | $11,001.90 |
| **Total** | **320** | **$169,338.55** | | $12,072.69 | $27,060.68 | $5,912.44 | $34,801.02 | $1,275.00 | $40,864.10 | $47,352.62 |

*The first four rows come from §1b. Oct 15–21 = §1b's Oct 15–17 row + Oct 18–21. Orders and net come from ShopifyQL `TIMESERIES day`. Every column reconciles to the window totals.*

**Turkey orders by plan week** (orders containing the product; ShopifyQL daily): Oct 15–21: 30 QT **19**, 60 QT **4** · Oct 22–28: **26**, **3** · Oct 29–31: **11**, **3**.

**Cumulative through each plan week, 2025 actuals** (inputs for pace lines; stretch multipliers are ROUX's):

| Through (2026 date) | T1 net | T2 net (ex gallon commercial) | T3a turkey net (30 + 60 QT) |
|---|---|---|---|
| Wed Sept 23 | $20,350.68 | $18,101.58 | $3,176.05 |
| Wed Sept 30 | $33,968.85 | $29,470.65 | $4,538.80 |
| Wed Oct 7 | $62,375.38 | $45,296.33 | $6,016.87 |
| Wed Oct 14 | $85,718.08 | $65,235.28 | $9,849.32 |
| *Sat Oct 17* | *$94,107.13* | *$73,624.33* | *$13,505.40* |
| **Wed Oct 21** | **$107,886.16** | **$87,403.36** | **$18,158.66** |
| **Wed Oct 28** | **$137,783.47** | **$110,451.67** | **$27,712.74** |
| **Sat Oct 31** | **$169,338.55** | **$128,474.45** | **$32,973.12** |

⚠️ **Oct 29–31 has $13,532.30 of commercial cookers**, which moves T1 but not T2. It also has $9,180.75 of Crawcuzzi, sorting tables and custom product, which **does** move T2.

### 1d. 18 QT fryer weekly curve, Sept 1 – Oct 31, 2025 (tailgate season shape)

| Week of (Mon) | Orders | Units | Net |
|---|---|---|---|
| Sep 1 *(Labor Day sale)* | 11 | 11 | $3,103.24 |
| Sep 8 | 7 | 8 | $2,196.05 |
| Sep 15 | 5 | 6 | $1,430.45 |
| Sep 22 | 7 | 7 | $1,869.04 |
| Sep 29 | 7 | 7 | $1,838.93 |
| Oct 6 | 7 | 8 | $1,961.80 |
| Oct 13 | 4 | 5 | $1,533.70 |
| Oct 20 | 6 | 10 | $2,881.67 |
| Oct 27–31 (5 days) | 3 | 3 | $845.10 |
| **Total** | **57** | **65** | **$17,659.98** |

*ShopifyQL `WHERE product_title CONTAINS '18 QT'` (powered and non-powered listings, not Scratch & Dent), `TIMESERIES day`, bucketed Mon–Sun. Sept 17–Oct 17 sums to $8,032.92, matching §1a.*
**Observation (BM Digital era, one year):** there's no October peak. Outside the sale week it ran 4–7 orders a week, flat. Oct 20's $2,881.67 is 10 units on 6 orders, so multi-unit orders, not more buyers.

---

## 2. Meta campaign status, `4392736013287`

**Every campaign in the account (58).** Only three spent anything. "Last 7 days" = Meta `last_7d`, **Sept 10–16, 2026**.

| Campaign | ID | Configured | Effective | Delivery | Budget | Spend, Sept 10–16 |
|---|---|---|---|---|---|---|
| `IW Lookalike 1% - Cold Prospecting - Sept 2026` | 52507989521191 | ACTIVE | ACTIVE | active | **$100/day** (campaign) | **$584.23** (from Sept 11) |
| `18qt-TOF-Prospecting` | 6998161993987 | ACTIVE | ACTIVE | active | **$50/day** (campaign) | **$347.96** |
| `BPM_TOF_Manual` | 6772105419387 | ACTIVE | ACTIVE | active | ad-set level: **$60 + $62 + $42 = $164/day** | **$1,184.19** |
| `BM \| TOF \| ABO \| Open \| External Whitelisting` | 6870130501387 | **ACTIVE** | **ACTIVE** | **inactive, "all ad sets off"** | ad-set level | $0 |
| `BM \| TOF \| HP Cookers \| ABO \| Offer Testing` | 6859139261187 | **ACTIVE** | **ACTIVE** | **inactive, "all ad sets off"** · campaign stop time **2026-07-06** | ad-set level | $0 |
| `BM \| ASC+ \| CBO \| Creative Testing` | 6974181320587 | PAUSED | PAUSED | off | $200/day | $0 |
| `BM \| TOF \| CBO \| Internal Whitelisting` | 6891236795387 | PAUSED | PAUSED | off | $100/day | $0 |
| `BPM_Adv+Sales - Website` · `BPM_Adv+Sales - 40qt sale` · `BPM_Adv+Sales` · `BizIQ_Sales_Purchase_Manual Setup` · `BizIQ_Retargeting` | 6816139324387 · 6808650863987 · 6771967631187 · 6564358103787 · 6545853939187 | PAUSED | PAUSED | off | $40 · $30 · $50 · $20 · $30 /day | $0 |
| 44 other campaigns (BM, BPM, BizIQ, 2015–2024 legacy) | — | PAUSED | PAUSED | off | none, or expired lifetime | $0 |

**Total spend, Sept 10–16: $2,116.38**, an average of $302.34/day. *(Meta `ads_get_ad_entities`, campaign level.)*

### The two "ACTIVE" BM campaigns, level by level

| | Campaign | Ad sets | Ads |
|---|---|---|---|
| **External Whitelisting** (6870130501387) | ACTIVE / ACTIVE, **delivery inactive** | **10 ad sets, all PAUSED**, no end dates. Daily budgets $40 ×8 + $65 ×2 = **$450/day combined** | 10 ads, all PAUSED |
| **Offer Testing** (6859139261187) | ACTIVE / ACTIVE, **delivery inactive**, stop time **Jul 6, 2026** | **5 ad sets, all PAUSED**, end dates between Dec 19, 2025 and **Jul 6, 2026** (all past). Daily budgets $80, $80, $100, $40, $40 | **58 ads configured ACTIVE**, effective `ADSET_PAUSED`, delivery `completed` · 13 ads PAUSED |

**Could either deliver today?** **No, not as configured.** Delivery needs an ad set switched on.
- **External Whitelisting would deliver the moment one ad set is turned on.** It has no end dates, and up to $450/day sits in its ad-set budgets.
- **Offer Testing would not deliver even then.** Its ad sets' end dates and the campaign stop time are past; the dates would have to be edited too.
- *Tested* by reading configured, effective and delivery status at all three levels.

---

## 3. Destinations and UTMs

⚠️ **The connector doesn't return `link_url` or URL tags** for any of these creatives (they come back without them, even when requested by name). The ad preview renders client-side, so it holds no link either. **Destinations below come from Shopify**: sessions carrying each ad's UTM, grouped by landing page, Sept 11–16, 2026 (`FROM sessions … GROUP BY utm_campaign, utm_content, landing_page_path`). An ad with no tagged sessions has an unknown destination.

### Delivering ads

| Campaign · ad set | Ad | Ad ID | Tag seen in Shopify | Landing page (sessions, Sept 11–16) |
|---|---|---|---|---|
| IW · `IW LAL 1% - Cold Prospecting` (52507989521391) | `120qt-performance_rolling-boil` | 52508008680391 | **Yes, name-based**: campaign = campaign name, content = ad name, term = ad set name | `/products/platinum-boiling-bundle-…` (32) |
| IW | `120qt-crowd-math` | 52507989521591 | **Yes, name-based** | `/products/120-qt-powered-seafood-crawfish-cooker` (33) |
| IW | **`hpc-dark-evergreen`** | 52508008680591 | **None found** | **Not tagged. Most likely `/products/18-qt-fish-fryer`** (see below) |
| BPM · `Outdoor Cooking/BBQ/Grilling_Nov BPM_Holiday/Turkey Fryer` (6845295330987, $60/day) | `Video_Jay 18qt Fryer Demo` | 6855622474187 | **Yes, ID-based** | `/products/18-qt-fish-fryer` (352 + 1 `/cart`) |
| BPM · same | `Video_UGC/Review18qt Fryer` | 6855622474387 | Yes, ID-based | `/products/18-qt-fish-fryer` (42) |
| BPM · same | `IMG_Heavy Duty Heat.30qt ad copy` | 6845666149587 | Not seen under this ID | Unknown. Its sibling ID 6845666433987 lands on `/products/30-qt-turkey-fryer-…` (2) |
| BPM · `Outdoor Cooking/BBQ/Grilling_Video_Jay 30qt (turkey) Fryer Demo` (6810865162387, $62/day) | `BPM Tailgate Video` | 6823510767787 | Yes, ID-based | **`/collections/powered-cookers`** (68) |
| BPM · same | `Video_Jay 30qt (turkey) Fryer Demo` | 6810865162787 | Yes, ID-based | `/products/30-qt-turkey-fryer-pot-with-drain-valve-lid-turkey-rack` (22) |
| BPM · `LAL 1% Purchasers` (6772110394587, $42/day) | `Video_UGC/Review18qt Fryer` | 6772110395587 | Yes, ID-based | `/products/18-qt-fish-fryer` (7) |
| BPM · same | `Video_ 30qt (turkey) Fryer Time Lapse` | 6772110395187 | Not seen ($0 spend Sept 1–16) | Unknown |
| BPM · same | `Video_UGC/Review18qt Fryer` ×3 more | 6772116256187 · 6772116256387 · 6772116255587 | Yes, ID-based | `/products/18-qt-fish-fryer` (78 · 2 · 1) |
| 18qt-TOF · `18qt_prospecting` (6998161994987) | `18qt-004` | 6998222424787 | Yes, ID-based | `/products/18-qt-fish-fryer` (4) |
| 18qt-TOF | `18qt-001` · `18qt-002` · `18qt-003` | 6998222425187 · 6998222425387 · 6998161995187 | Not seen under their IDs | Unknown. Campaign-ID sessions with `utm_content=Facebook_UA` land on `/products/18-qt-fish-fryer` (19), `/18-qt-fish-fryer-brazier-pot` (8), `/30-qt-turkey-fryer-…` (4) |

⚠️ **Data problem:** the three extra `Video_UGC/Review18qt Fryer` ads (6772116256187 etc.) and 6845666433987 show as ACTIVE with **$0 spend Sept 1–16**, and they don't appear in the account's filtered ad listing. Yet 6772116256187 brought **78 tagged sessions**. The likeliest explanation is people clicking the ad's post from shares or saves, but that is *untested*.

### `hpc-dark-evergreen` → the 18 QT page? **Supported, not confirmed**

The alternative is untagged organic Facebook traffic. Four tests:

- **No tagged sessions.** In six days no session carries `utm_content=hpc-dark-evergreen`, its ad ID, or any IW campaign name paired with it. Meta logged **127 landing-page views** for it. For comparison, the two 120 QT ads' tags arrive at about their landing-page-view rate (65 sessions vs 57 LPVs). *Tested.*
- **Untagged Facebook sessions on the 18 QT page rose when it launched:** **45 over Sept 5–10 (7.5/day) → 102 over Sept 11–16 (17/day)**. It was the only untagged Facebook landing page that rose (the homepage fell 42 → 24). *Tested.*
- **The daily pattern roughly tracks the ad.** Its landing-page views ran 12 · 7 · 18 · 25 · 20 · 45; the untagged 18 QT sessions ran 11 · 14 · 14 · 12 · 26 · 25.
- **Not closed:** the excess (~57 sessions) is under half its 127 LPVs. **Confirm in Ads Manager, Review tab (not the edit panel).** The creative is the 18 QT fryer frame *(file names: `2026-09-08_18qt-fryer_hpc-dark-evergreen_*`)*.

**What follows:** if it is untagged, **IW's "0 Shopify-matched orders" cannot include any order from 77% of its spend.** Shopify's untagged Facebook-referrer orders would be the only trace.

### The `campaigns.md` conflict: "BPM carries no UTMs" vs 10 orders matched to BPM's ID

- **Resolved in Shopify's favor: BPM ads do carry UTMs.** The format is `utm_source=facebook`, `utm_medium=paid`, `utm_campaign=6772105419387`, `utm_content=<ad ID>`, and it appears on 7 BPM ad IDs above.
- `campaigns.md`'s "empty URL-parameters field" (Finn, 2026-09-10, Ads Manager) and these tags can both be true if the parameters sit **in the website URL itself**, or are appended by a template or by Shopify's Facebook channel. **Which mechanism: untested.** The connector doesn't expose the URL or the tags.
- The same ID-based format also appears on `18qt-004`.
- **Side answers for `campaigns.md`:**
  - IW's live ad set is **`IW LAL 1% - Cold Prospecting`**, not the "excl." build name.
  - The IW tags carry the campaign name **with no "(DRAFT)" suffix**.
  - IW sessions arrive with `utm_medium` both `paid_social` and `paid`, and one URL-encoded variant. Why: untested.

---

## 4. BPM spend by ad, Sept 1–16, 2026, and the 25% low-ticket cap

### 4a. BPM by ad

| Ad | Ad ID | Status now | Spend | Meta purchases | Product (landing page, §3) |
|---|---|---|---|---|---|
| `Video_Jay 18qt Fryer Demo` | 6855622474187 | ACTIVE | **$499.68** | 5 | **18 QT** |
| `BPM Tailgate Video` | 6823510767787 | ACTIVE | **$474.52** | 7 | **Powered-cookers collection** (mixed; not a single product) |
| `LaborDay_A_Vintage_Sept1-8 - Copy` (in Jay 30qt Demo ad set) | 52506056992591 | PAUSED | $453.19 | 18 | Sitewide 10% sale creative; destination not verified |
| `Video_UGC/Review18qt Fryer` (LAL 1%) | 6772110395587 | ACTIVE | **$394.42** | 9 | **18 QT** |
| `LaborDay_A_Vintage_Sept1-8` (Nov Holiday ad set) | 52506044953191 | PAUSED | $353.82 | 13 | Sitewide sale; not verified |
| `LaborDay_A_Vintage_Sept1-8 - Copy` (LAL 1%) | 52506056992391 | PAUSED | $275.78 | 8 | Sitewide sale; not verified |
| `Video_Jay 30qt (turkey) Fryer Demo` | 6810865162787 | ACTIVE | $58.94 | 6 | **30 QT turkey** |
| `Video_UGC/Review18qt Fryer` (Nov Holiday) | 6855622474387 | ACTIVE | $57.89 | 3 | **18 QT** |
| `IMG_Heavy Duty Heat.30qt ad copy` | 6845666149587 | ACTIVE | $5.00 | 2 | 30 QT (by name; sibling lands on the 30 QT turkey page) |
| `Video_ 30qt (turkey) Fryer Time Lapse` | 6772110395187 | ACTIVE | $0.00 | 0 | Unknown |
| **Total by ad** | | | **$2,573.24** | 71 | Campaign total: $2,572.94. The $0.30 gap is rounding, *untested* |

*Meta `ads_get_ad_entities`, ad level, 2026-09-01 → 09-16.* **Sept 1–16, BPM put $952.00 (37%) on 18 QT ads, $63.94 on 30 QT, $474.52 on the collection video, and $1,082.79 on Labor Day sale creative.**

⚠️ **Copy flag, live ad:** `Video_Jay 30qt (turkey) Fryer Demo` primary text says "patent-pending 'Tunnel Tube Technology'" (the patent is granted, No. 11,844,459). It also says "Great for cooking … crawfish" on a fryer ad. Not a data problem; for Maya/Evan.

### 4b. The 25% low-ticket cap: where it's defined

- **Defined in:** `my-work (outputs)/internal/reports/2026-09-10-overhead-method-options.md`, §6a "A cap on low-ticket lines". **ROUX, 2026-09-10.**
- **Exact wording:**
  > **Scope:** 18 QT powered and non-powered, 30 QT, 40 QT, and accessories.
  > **The cap:** combined, no more than **25% of the daily Meta budget**. At $350/day that's about **$86**.
- **Restated with a different scope** in `2026-09-14-marketing-budget-model-20pct-net.md` §4 (ROUX): "Low-ticket lines (18/30/40/60 QT + accessories) capped combined at 25% of the daily Meta budget (~$86 of $350)". **That adds the 60 QT.** The retargeting plan §4 and the kits plan (§3.3, §4.4) cite §6a.
- **Who set it: ROUX, as a guardrail recommendation.** **I found no record of adoption.** `decisions.md` has no entry for it. Jay's 2026-09-14 "yes" (Q4) covers the incremental per-ad rule only. The budget model lists the cap under "Current gates, unchanged from the overhead report", which is ROUX's framing, not a decision. **It's a proposal on file, not a rule.**

### 4c. Share of current daily Meta spend under the cap

Ad-level daily spend, Sept 10–16, mapped by landing page (§3). "18 QT" = the three BPM 18 QT videos + all four `18qt-TOF` ads. "30 QT" = the two BPM 30 QT ads.

| Window | Avg spend/day | 18 QT ads | 30 QT ads | **Low-ticket, verified** | `hpc-dark-evergreen` | **Low-ticket incl. dark-evergreen** | Collection video | 120 QT ads |
|---|---|---|---|---|---|---|---|---|
| Sept 11–16 (IW live) | $320.43 | $157.90 | $7.98 | **$165.88 · 51.8%** | $74.50 | **$240.37 · 75.0%** | $57.17 | $22.88 |
| **Sept 15–16 (latest)** | $304.63 | $146.94 | $2.85 | **$149.78 · 49.2%** | $93.81 | **$243.59 · 80.0%** | $60.26 | $0.78 |
| Sept 10–16 (7 days) | $302.34 | $154.97 | $7.32 | $162.29 · 53.7% | $63.85 | $226.14 · 74.8% | $56.59 | $19.61 |

*Meta `ads_get_ad_entities`, ad level, `time_increment=1`, 2026-09-10 → 09-16; arithmetic in scratchpad `cap.py`.*

**Against the cap:** 25% = **$78.50** of today's $314 caps, **$86** of $344, or **$80.11** of Sept 11–16 actual spend.
- **ROUX's "≥ $127/day" is corrected upward.** Verified low-ticket spend alone is **~$150–$166/day, about 2× the cap**. With dark-evergreen it is **~$240/day, about 3×**.
- **Where ROUX's figure went wrong:** it counted `18qt-TOF` $50 + 77% of IW. It left out BPM's 18 QT videos, which are the largest block.
- **The one open input:** the collection video ($57/day) lands on `/collections/powered-cookers`. That page lists pots, some of which are in scope. It is counted outside the cap here.

---

## 5. Reconciling with the board

### 5a. Labor Day net, Sept 1–8, 2026: board $41,100.84 vs today $40,853.33 (126 orders both)

**Today, re-pulled:** 126 orders · gross $48,133.11 · discounts −$5,279.03 · returns −$2,000.75 · **net $40,853.33**. Un-split and daily queries agree. *(ShopifyQL.)*

| Hypothesis | Test | Result |
|---|---|---|
| Refunds processed **after** the Sept 9 pull on Sept 1–8 orders | GraphQL: all 126 orders created Sept 1–8 CT, every refund's `createdAt` | **Refuted.** The only refunds after Sept 9 are **$0.00** (#17322, Sept 14). All money refunds were processed Sept 1–8 |
| Timezone (UTC vs Central) or a partial Sept 9 inside the window | ShopifyQL hourly, Sept 8–9 | **Refuted as the whole cause.** Shifting to UTC moves 4 orders ($709.42) across the boundary, and a partial Sept 9 adds orders. Either would change the count, which stays at 126 |
| **One specific order** | GraphQL | **#17385: placed Sept 7, cancelled Sept 8 08:04 CT, refunded exactly $247.51** ($208.00 product + $39.51 shipping). The full gap equals this refund |
| Shopify restating past days after the fact | Compare three pulls of the same days | **Supported.** Sept 8 is $7,198.24 in all three. Sept 1–7 moved: **$33,708.39** (pulled Sept 8) → **$33,902.60** (implied by the Sept 9 total) → **$33,655.09** (today). Today vs Sept 8's pull is **−$53.30**, which is exactly **#17381**'s cancellation refund (placed Sept 6, cancelled Sept 7) |

**Conclusion:** the $247.51 is **cancelled order #17385's refund**, handled differently by the Sept 9 pull than by today's. **Partly tested:** the amount and the order are identified exactly. **The mechanism is untested.** Either Shopify's analytics re-dated the cancellation between Sept 9 and today, or the Sept 9 method treated cancelled orders differently. Shopify keeps no snapshot of past reports to check.
**Use going forward: $40,853.33 · AOV $324.23.** It is reproducible today and nets out a refunded, cancelled order. The difference is 0.6%. ⚠️ The owners hold $41,100.84 (report sent 2026-09-09). `decisions.md` says to correct figures to them directly, and whether to do so is Evan's call.

### 5b. 2025 turkey counts: board 164 of 294 vs today 171 and 319

| Definition | Oct 1–15 | Oct 16–31 | **Nov 1–15** | Nov 16–26 | Nov 27–30 | **Oct–Nov** |
|---|---|---|---|---|---|---|
| **Board / kits plan §4.1** (source "Shopify, checked two ways", 2026-09-11; method not recorded) | 16 | 57 | **164** | 49 | 8 | **294** (235 × 30 QT + 59 × 60 QT) |
| ShopifyQL, all channels, **30 QT + 60 QT summed** (today's baseline §3) | 19 | 64 | 171 | 57 | 8 | **319** (251 + 68) |
| ShopifyQL, all channels, **distinct orders** | 19 | 63 | **171** | 57 | 8 | **318** (one order has both) |
| ShopifyQL, **Online Store only** | 15 | 58 | 159 | 48 | n/a | 288 (231 + 57) |
| ShopifyQL, **excluding Draft Orders and Shop** | 16 | 59 | 163 | 49 | n/a | 295 (235 + 60) |
| Units, all channels | | | 174 | | | 326 (255 + 71) |

*ShopifyQL `WHERE product_title CONTAINS 'Turkey Fryer Powered Pot' OR CONTAINS 'Dual Turkey Fryer'`, `GROUP BY sales_channel`, windows as shown. Channel split for Oct–Nov: 30 QT = Online Store 231 · Draft Orders 11 · Shop 5 · Wholesale Gorilla 3 · Facebook & Instagram 1. 60 QT = Online Store 57 · Draft 5 · Shop 3 · Wholesale Gorilla 2 · FB & IG 1.*

- **Tested:** the product scope matches. Neither figure includes the **40 QT Single Turkey Fryer** (10 orders, Oct–Nov) or turkey racks. The window matches too.
- **The closest definition:** all channels except Draft Orders and Shop. It reproduces the 235 exactly, but not the 59, and it is within 1–2 orders per segment. **The board's exact method is not reproduced.**
- **Use going forward: ShopifyQL, all channels, distinct orders**, stated with its channel split: **Nov 1–15 = 171 of 318 Oct–Nov (53.8%)**, and 159 on Online Store alone. It reproduces today and says what it counts. For web-marketing pace lines, use the **Online Store** row.
- **The conclusion is unchanged either way.** Nov 1–15 is 53–56% of the season under every definition.

---

## 6. Kit readiness, as of 2026-09-17 afternoon

| Item | Now | Source |
|---|---|---|
| **`SC-7R` skimmer** | **Still unsellable online.** Main Warehouse on hand **−1**, available −1, tracked, policy **DENY**, `availableForSale: false`. Storefront `/products/20-heavy-duty-chrome-plated-wire-mesh-skimmer.js`: `available: false` | GraphQL `productVariants(sku:SC-7R)` · storefront |
| **Tailgate Fry Kit** `Product/10292065861872` | **DRAFT** · updated **2026-09-17 07:22 CT** · 1 image, the existing `18pt-powered-master.jpg` (**created 2026-06-29, not a new photo**) · variant SKU **`BUNDLE-18QT-TAILGATE`**, $465.00 | GraphQL |
| **Turkey Fry Kit** `Product/10292066353392` | **DRAFT** · updated **2026-09-17 07:44 CT** · 2 images, the existing `30qt-Powered-Full-Bundle.jpg` (created 2026-05-20) and `60qt-powered-dual-turkey-fryer-master.jpg` (created 2026-07-29), **no new photos** · SKUs **`BUNDLE-30QT-TURKEY`** $469.00 · **`BUNDLE-60QT-TURKEY`** $519.00 | GraphQL |
| ⚠️ Kit SKUs | The board says `KIT-18FRY-LEGS` / `KIT-30TURKEY` / `KIT-60TURKEY`. **Live SKUs are `BUNDLE-…`.** Both kits were edited this morning; by whom, not checked | GraphQL |
| **18 QT "Made in the USA" feature card** (`Metaobject/111384690928`) | **Still live.** Text "Made in the USA" / "This fryer is crafted with care in Louisiana." Last updated 2025-08-25, still referenced by the 18 QT product's `custom.product_features`, and rendered on the page | GraphQL · storefront HTML |
| **Platinum Boiling Bundle SEO title** (`Product/9799316111600`) | **Still live:** "Seafood Boiling Pot Set \| Crawfish Boiling Pot Set \| Patented Technology \| Made in the USA \| Shop High Performance Cookers". The page `<title>` matches | GraphQL `seo` · storefront |
| **30 QT turkey fryer Features & Benefits** (`Product/8321395065072`) | **Still live:** ends in an unqualified linked "5-year warranty." (metafield updated 2026-06-17) | GraphQL `custom.features_benefits` · storefront |
| **`HIGH15` / `SMS25`** | **Both ACTIVE**, no end date. `HIGH15B` and `SMS25B` also ACTIVE | GraphQL `codeDiscountNodeByCode` |

**New, found while checking (all on kit destination pages; all live-product writes, so Evan's or Jay's click):**

1. **30 QT turkey fryer page, second unqualified warranty claim:** a "Warranty Included" feature card, "This product includes a 5-year warranty." It comes from the product's `custom.product_features` metaobject list. The same list is referenced by the `30 Qt Powered Pot With Drain Valve, Basket & Lid`.
2. **The `fryers` collection** ("Propane Gas Outdoor Deep Fryer", updated 2026-09-17) **description contains "Made in the USA."** The tailgate kit is set to join this collection. The text is also embedded in the 18 QT product page's data. Whether it renders on the product page: untested.
3. **More unqualified 5-year warranty copy:**
   - The `30 Qt Powered Pot With Drain Valve, Basket & Lid` Features & Benefits ends in the same unqualified "5-year warranty."
   - A `badge_labels` value "5 Year Warranty" sits on the 30 QT turkey fryer, 30 QT Performance, 30 Qt Scratch & Dent and a draft 18 QT Scratch & Dent. Whether the theme renders badges: untested.
   - The 18 QT description reads "Backed by 2-year warranty (commercial) / 5-year warranty (residential)." The rule is a 2-year on **all** products.
4. **Also edited this morning** (no change inferred): the 18 QT product at 06:20 CT and Turkey Fryer Racks at 08:41 CT.

---

## 7. 2025: the 30 QT turkey fryer stopped Nov 21, and a 40 QT appeared

| Record | Now |
|---|---|
| **30 Qt Turkey Fryer Powered Pot** `Product/8321395065072` | ACTIVE · created 2023-09-05 · published 2023-10-25 · updated 2026-09-16. **All three variants were created 2026-05-20** (SKUs `PW30-VLV075-TFR` $395, `-TFR-B` $442.50, `-TFR-B-SBI` $462.50, policy CONTINUE). **The Nov 2025 variants no longer exist** |
| **40 Qt Single Turkey Fryer** `Product/8158454120688` | **Exists. Status UNLISTED** · created **2022-11-04** · **published 2025-12-02** · updated 2026-09-01 · one variant `PW40-B6B-VLV075-TFS` $365.00 (created 2026-05-20) · **0 inventory, DENY**, so not purchasable now |

**Tests:**

- **Stockout, from inventory history: can't be tested.** ShopifyQL `FROM inventory` has **no rows for the 30 QT turkey fryer** in Nov 2025, so it wasn't tracked. The 60 QT shows 0 units every day while it sold, and the 40 QT shows a flat 4 units and 0 sold while 10 orders came in. **The inventory data can't show a stockout.**
- **Demand drop vs couldn't be bought: tested.** ShopifyQL sessions landing on the 30 QT page, Nov 15–26, 2025:
  - **Traffic continued:** 220–383 sessions/day Nov 15–20, **200–241/day Nov 21–26**.
  - **Cart additions collapsed:** 12–18/day Nov 15–18, then **1–3/day Nov 21–26**. Zero 30 QT orders from Nov 21.
  - **Meanwhile:** the 60 QT page kept 3–8 carts/day. The **40 QT page first drew landing sessions Nov 19–20** (2, then 13).
- **Result:** consistent with the **30 QT becoming unbuyable around Nov 20–21 while shoppers still arrived**, and not with demand falling away. **Tested at that level.**
- **Why it became unbuyable (stockout, a variant turned off, a price or listing change): untested.** No record survives: the variants were recreated in May 2026, and no inventory history exists. The 40 QT's Nov 19–24 sales and its Dec 2 republish fit a stand-in, but **that is not tested either**.

---

## What I could not get, this pass

1. **Ad destination URLs and URL tags from Meta.** The connector doesn't return them; destinations above come from Shopify sessions.
2. **The mechanism that tags BPM ads**: URL field, parameters field, or Shopify's Facebook channel.
3. **Why the Sept 9 pull counted #17385 differently**: no historical report snapshots.
4. **The board's exact 164 / 294 turkey method**: nearest definition within 1–2 orders.
5. **Whether theme badges and the `fryers` collection description render** on the kit product pages.
6. **The cause of the Nov 21, 2025 30 QT stop**: no variant or inventory history survives.
