# Consumer-sales pace line and retargeting audience sizes

**Pulled by:** Finn, Thu 2026-09-17 · read-only, no writes to Shopify or Meta.
**Sources:** Shopify ShopifyQL (`run-analytics-query`), store `high-performance-cookers.myshopify.com`, timezone America/Chicago · Meta Ads connector, **HP Cookers ADs `4392736013287` only** (`ads_get_ad_account_custom_audiences`, `ads_get_custom_audience`), read 2026-09-17.
**Job:** PLAN.md plan week 1, "consumer-sales weekly pace + audience sizes (Finn)".

> ⚠️ **Two operators.** Every 2025 figure is the BM Digital era (fired 2026-07-20).
> ⚠️ Returns land on the day they're processed, not the order date (same caveat as the baseline).

---

## 1. Consumer-sales pace line

**Definition:** Shopify net sales **minus** commercial cookers (gallon-sized), commercial other, custom jobs and Navimow. The same line-by-line classification that produced $110,484.95 in the baseline (`2026-09-17-month-plan-baseline.md` §1b), rebuilt product by product, so every week is exact.

### Pace table (cumulative, 2025 actuals → 2026 must-hit)

| Thursday check (through the Wed before) | 2025 dates | **Consumer must-hit** | **Stretch (× 1.1136)** |
|---|---|---|---|
| Sept 24 | Sep 17–23 | **$14,747.08** | $16,422.35 |
| Oct 1 | Sep 17–30 | **$25,940.65** | $28,887.51 |
| Oct 8 | Sep 17–Oct 7 | **$41,695.08** | $46,431.64 |
| Oct 15 | Sep 17–Oct 14 | **$59,974.03** | $66,787.08 |
| Oct 22 | Sep 17–Oct 21 | **$78,919.61** | $87,884.88 |
| Oct 29 | Sep 17–Oct 28 | **$101,642.92** | $113,189.56 |
| Oct 31 final (read Mon Nov 2) | Sep 17–Oct 31 | **$110,484.95** | $123,036.04 |

**Reconciles.** Oct 28 = $101,642.92 (plan: $101,643). Oct 31 = $110,484.95 (plan: $110,485). Sat Oct 17 = $68,363.08, matching the draft's $68,363 anchor. *(Derived.)*

### Weekly build

| 2025 week | Net sales | − Commercial cookers | − Commercial other | − Custom | − Navimow | **Consumer** |
|---|---|---|---|---|---|---|
| Sep 17–23 | $20,350.68 | $2,249.10 | $3,214.50 | $140.00 | $0 | **$14,747.08** |
| Sep 24–30 | $13,618.17 | $2,249.10 | $175.50 | $0.00 | $0 | **$11,193.57** |
| Oct 1–7 | $28,406.53 | $12,580.85 | $0.00 | $71.25 | $0 | **$15,754.43** |
| Oct 8–14 | $23,342.70 | $3,403.75 | $637.50 | $1,022.50 | $0 | **$18,278.95** |
| Oct 15–21 | $22,168.08 | $0.00 | $0.00 | $3,222.50 | $0 | **$18,945.58** |
| Oct 22–28 | $29,897.31 | $6,849.00 | $325.00 | $0.00 | $0 | **$22,723.31** |
| Oct 29–31 | $31,555.08 | $13,532.30 | $6,430.75 | $2,750.00 | $0 | **$8,842.03** |
| **Total** | **$169,338.55** | **$40,864.10** | **$10,783.25** | **$7,206.25** | **$0** | **$110,484.95** |

The exclusion columns tie out to the baseline's full-window totals: commercial other $10,783.25 and custom $7,206.25. They also tie to its Oct 29–31 amounts, $6,430.75 and $2,750.

**What's in each exclusion** (product titles as ShopifyQL returns them):
- **Commercial cookers:** 60 Gallon ($2,249.10 wk1 · $2,249.10 wk2 · $4,748.10 wk3 · $2,499.00 wk6 · $8,172.05 wk7) · 80 Gallon $5,985.00 (wk3) · 40 Gallon / 160 QT ($1,847.75 wk3 · $3,403.75 wk4 · $1,945.00 wk7) · 140 Gallon $4,350.00 (wk6) · 120 Gallon $3,415.25 (wk7).
- **Commercial other:** Crawcuzzi ($2,850.00 wk1 · $5,250.00 wk7) · Commercial Basket - Steamer Shelf ($364.50 wk1 · $175.50 wk2) · Commercial Burner Modules $400.00 (wk4) · Commercial Cooker Metal Wheels ($237.50 wk4 · $250.00 wk6) · 60 Gallon Lid Dump Guide Rails $75.00 (wk6) · Crawfish Sorting Table $1,100.00 (wk7) · Crawcuzzi Basket Chute $80.75 (wk7).
- **Custom:** Custom Product ($140.00 wk1 · $430.00 wk4 · $3,222.50 wk5 · $2,750.00 wk7) · Add a Custom Logo ($71.25 wk3 · $592.50 wk4).
- **Navimow:** no rows in any week.

**Queries** (one per plan week; 2025 dates, both ends inclusive):
`FROM sales SHOW orders, net_sales GROUP BY product_title, product_type SINCE <start> UNTIL <end> ORDER BY net_sales DESC LIMIT 200`
for 2025-09-17→09-23, 09-24→09-30, 10-01→10-07, 10-08→10-14, 10-15→10-21, 10-22→10-28, 10-29→10-31. Row counts: 41 · 33 · 29 · 37 · 28 · 34 · 26, none of them hitting the limit. **Each week's product rows add up exactly to the baseline's `TIMESERIES day` net for that week** (checked by script), so the grouping dropped nothing. Week 5's split at Oct 17: the $3,222.50 custom product is on or after Oct 18 (baseline §1a custom through Oct 17 is $1,233.75, fully accounted for by weeks 1, 3 and 4).

### Flags (data, not business)
1. **Three classification calls are baked into $110,485.** The steamer shelf ($540) and commercial burner modules ($400) count as commercial other, and "Add a Custom Logo" ($663.75) counts as custom. That follows the baseline's §1a groups. A different reading would move the target by up to $1,603.75. Wheels and guide rails are also treated as commercial other.
2. **Untitled lines stay in consumer:** $6,798.26 over the window with no product title in ShopifyQL, including −$450 in week 1 and +$3,858.26 in week 3. We can't tell whether any of it is commercial.
3. **Consumer shapes the weeks differently from total.** Oct 1–7 is an ordinary consumer week ($15.8k) even though total hit $28.4k. Oct 29–31 is only $8.8k consumer out of $31.6k total.

---

## 2. Audience sizes for the retargeting plan (launch Mon Sept 28)

Plan: `my-work (outputs)/content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md` §3. Read 2026-09-17 through the Meta connector. Meta returns size as a range (`approximate_count_lower_bound`–`upper_bound`).

| Audience (role in plan) | ID | Size Meta reports | Operation status | Pixel in the rule |
|---|---|---|---|---|
| `Website Visitors 30D (All)`: include (Pots). Also the IW campaign's hard exclusion | `52506006692791` | **6,800 – 8,000** | 200 Normal · delivery ACTIVE · retention 30 days | ⚠️ **`491960645999331`** |
| `RT - Viewed 18 QT - 30D`: include (18 QT), exclude (Pots) | none | **Does not exist yet.** It's not among the account's 57 custom audiences (single page, no cursor) | n/a | plan says `1861969194014116` |
| `Past Purchase L90 via Pixel Data`: exclude | `6854767957387` | **20 – 20** | 200 Normal · ACTIVE · retention 90 days | `1861969194014116` |
| `Dealer Buyers (EXCLUSION)`: exclude | `6885346937387` | **20 – 20** | 200 Normal · ACTIVE · retention 180 days | `1861969194014116` |

**Too small or still populating?** Meta doesn't flag either. All three existing audiences return operation status **200 "Normal"**, and none says "populating" or "too small".

### ⚠️ Data problems, found in the read

**A. `Website Visitors 30D (All)` is built on pixel `491960645999331`, not `1861969194014116`.** The plan (§3) says it runs on `1861969194014116`. The audience's own rule says `event_sources: pixel 491960645999331, ALL_VISITORS, 30 days`. That's the second pixel whose owner is still unknown (with Jay). So the 6,800–8,000 pool, the IW lookalike's hard exclusion, and the plan's claim that nobody can be in both campaigns all rest on a pixel nobody has identified.

**B. Every audience on `1861969194014116` reads 20–20, even an all-visitors one.** The test I ran was to compare identical rules on the two pixels:
- `Website Visitors (30D)` `6854767096187`: pixel `1861969194014116`, all visitors, 30 days → **20–20**, status Normal.
- `WV_30` `6771984655587`: pixel `1861969194014116` + FB/IG shop events, 30 days → **20–20**, Normal.
- `Last 30 Days Web` `6306271364387`: pixel `491960645999331` + FB/IG shop events, 30 days → **3,300–3,900** (status 100, "not used in active ad for extended period").
- `Website Visitors 30D (All)`: pixel `491960645999331` → **6,800–8,000**.
- The account list shows 20–20 on **every** pixel-`1861969194014116` audience (WV_30/60/90/180, Purchase_30/60/90/180, AddToCart, InitiateCheckout, AddPaymentInfo, ViewContent_30, Search_30, HPC Purchase 180).

So the split is by pixel, not by rule. **What 20–20 means is untested.** It could be a real size near zero, or a masked or unavailable value. Either way, Meta isn't reporting a usable size for any `1861969194014116` audience. That matters three ways:
- `RT - Viewed 18 QT - 30D`, built on `1861969194014116` as the plan says, would likely read the same.
- The two purchase and dealer **exclusions** may be excluding almost nobody.
- The plan's Sept 28 bot test (compare `Website Visitors 30D (All)` before and after) measures pixel `491960645999331`, not ours.

The pixel itself fires: 27,651 events on Aug 28 (Finn, 2026-09-10, per plan §3). *Not re-read today.*

**C. Size today vs Sept 9.** 6,800–8,000 today against 7,200–8,500 read in Ads Manager 2026-09-09 (plan §3). *Observation.* Different read path (API vs Ads Manager UI), and Aug 28 is still inside the 30-day window. Re-read Sept 28.

---

**Next:** Beau. The pace line is exact and ready for PLAN.md. The audience read shows the retargeting build rests on the unidentified pixel `491960645999331`, and every `1861969194014116` audience reads 20. Whether that changes the Sept 28 build is a call, not a query.
