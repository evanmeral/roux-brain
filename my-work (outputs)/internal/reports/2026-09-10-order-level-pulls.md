# Order-level pulls A and B: what real orders contain
**2026-09-10 · Finn, read-only Shopify · input to [cac-ceilings-v3](2026-09-10-cac-ceilings-v3.md) section 5**

Nothing was written to Shopify, Meta or Google. Every order figure comes from Shopify Admin GraphQL rows pulled 2026-09-10 (queries Q0–Q8 at the end). Averages, shares and gross profit are **derived by Finn** from those rows. **No CAC ceiling is computed here.** That's ROUX's job.

---

## Headline

- **The pull passes the v3 floor check.** On full-price orders, every anchor's mean gross profit per order clears its v3 one-unit floor. The one exception is **30 QT over 12 months**, and that's a costing data problem, not a pull error (data problem 1). No full-price order that falls below its own floor goes unexplained.
- **Real orders carry more than one unit's gross profit, Jun–Aug 2026 (Q2, Q3):**

| Product line | Net revenue per order | Gross profit per order (net − landed COGS) | v3 one-unit gross profit |
|---|---|---|---|
| 18 QT powered | $449.08 | $210.18 | $142.50 (the $285 base unit) |
| 120 QT Powered | $909.96 | $416.12 | $328.31 |
| Triple Jet | $808.96 | $372.44 | $209.50 |
| Leg Extensions | $384.17 | $186.32 | $70.10 |
| Cooling Ring | $536.90 | $255.46 | $45.46 |

- **Pull B can't be done as specified.** Meta's UTMs carry **numeric campaign IDs, not names**. **0 of 278** orders can be matched to `BPM_TOF_Manual` or `18qt-TOF-Prospecting` by name. **24 orders** carry a Meta paid UTM on their last visit, against 155 purchases Meta claimed.

---

## 1. Population and checks

Filter string used everywhere, Central time:
`-status:cancelled -financial_status:refunded -source_name:shopify_draft_order -source_name:pos -tag:wholesale`, then orders with `currentTotalPriceSet = 0` removed in code.

| Check | Result | Query |
|---|---|---|
| Every filter really filtered | A made-up field (`notarealfield:xyz`) returned **6,381**, the whole year. Each real filter returned something different: cancelled 93, refunded 76, draft 597, POS 304, wholesale 184, `-status:cancelled` 6,288, `name:` 1 and 2, `sku:BoilBoss-TJB-V2.5` 539 | Q0 |
| Orders after the search filter, Sep 1 2025–Aug 31 2026 | **5,312**. The 12 monthly counts sum to 5,312, the 39 sub-range counts reconcile to each month, and unique orders pulled per month equal each count | Q1, Q2 |
| Minus the $0 orders | 8 | Q2 rows |
| **Population, 12 months** | **5,304**. That's exactly the "normal paid DTC" 5,304 in [orders-for-overhead-allocation](2026-09-10-orders-for-overhead-allocation.md) | |
| **Population, Jun–Aug 2026** | **961** (search count 961, all pulled) | Q1, Q2 |
| Line items cut off by paging | 0 (`lineItems.pageInfo.hasNextPage` false on every order) | Q2 |
| Order subtotal vs sum of lines | 5,289 exact, 14 off by $0.04 or less, **1 unexplained** (#11363: $2,672.00 vs $1,406.02) | Q2 |
| Feb 2026 Lowe's reversal | **Can't distort these figures.** Every figure is per order, on that order's own current values, and the Lowe's order is not in the population. Feb 2026: 426 orders, $177,766 merchandise net. Largest order in the 12 months: $9,223 (#11327) | Q2 |
| Second source, Jun–Aug | ShopifyQL, Online Store: **922 orders, $331,318.75 net sales**. Population: **961 orders, $343,480.87** merchandise net plus Shipping Protection. That's a 3.7% gap, and it's a sanity check, not a reconciliation. ShopifyQL books returns on the return date, and its channel scope differs. Unfiltered ShopifyQL shows 1,119 orders, so the channel filter really filtered | Q8 |

---

## 2. Definitions

- **Net revenue per order.** For each line still on the order (`currentQuantity` > 0): `currentQuantity × discountedUnitPriceAfterAllDiscounts`. That's after line and order discounts, and after items refunded or removed. Excluded:
  - Shipping charged and taxes.
  - **Shipping Protection** (Navidium, SKU `NVDPROTECTION*`): $22,079.84 over 12 months.
  - **Accident Prevention**: 3 lines, $36.75. It's another $0-cost protection add-on. Same logic, and ROUX can reverse it.
  - **Money-only refunds**, meaning refunds where no item was removed: 75 orders, $5,576.36 deducted over 12 months. They may include refunded tax, so the deduction runs slightly high.
- **Landed COGS per order.** `currentQuantity ×` the **current** `inventoryItem.unitCost` of the line's variant (Q3, 2026-09-10). The cost stored on the order line was not used.
  - Fallback for deleted variants: first the exact SKU in today's catalog, then the SKU with punctuation stripped.
  - Share of merchandise revenue by cost source: current variant **88.28%**, exact SKU **5.00%**, normalized SKU **5.08%**, **no cost 1.64%** ($32,292).
  - An order with any uncosted line is left out of the COGS and gross-profit averages only. "Cov" in the tables is the share of orders costed.
- **Gross profit (GP)** = net revenue − landed COGS. It comes before card fees, packaging, warranty and overhead. It is **not contribution margin and not net profit**.
- **Discounted order.** Merchandise discount over $0.01, measured as (original unit price − discounted-after-all) × quantity. **Full-price** means no discount applied.
  - Bundle savings are built into the component prices, so bundle orders read as full-price.
  - A markdown to a lower list price is not a discount.
- **Attach.** The order has at least one other product (Shipping Protection excluded). Anchor-only = 1 − attach.
- **Anchor membership.** The order contains the product. An order with two anchors counts in both lists. Scratch & Dent was excluded (87 orders).
- **Anchor SKU rules:**
  - 18 QT powered `PWFRBR*`; 18 QT non-powered `SFPFRBR*`; 30 QT `PW30*`.
  - Powered `PW60/80/100/120-*`.
  - Performance `SFP60/80/100/120-*` and `PT60-VLV*`, including the duplicate "Performance Boiling Pots (60QT to 120QT)" listing (`-WEBDup` SKUs).
  - Triple Jet `BoilBoss-TJB-V2.5` and `TJB_V2`. The `PW*-BTJ` cookers are not the Triple Jet.
  - Legs `LegExtensions`.
  - **Cooling Ring** = "Boil Boss - Standard / Large / Small" plus "Boil Boss Cooling Ring".
    - ⚠️ Most Cooling Ring sales carry the older "Boil Boss - Standard" name. **A title search for "Cooling Ring" would have missed about 90% of them.**
- **Platinum / Ultimate Bundle.** Identified from the line-item group title (Q4). Bundles are sold as component lines, not as one bundle line.

---

## 3. Pull A, Jun 1–Aug 31 2026 (961 orders)

⚠️ This window spans **2026-07-20** (BM Digital fired). These are basket figures, not ad results, but under the rule it's two operators in one window.

Columns: Orders · Net rev/order mean (median) · Landed COGS/order · GP/order · Attach · Discounted share (avg discount per discounted order) · Full-price: orders / net / GP · Discounted: orders / net / GP

| Anchor | Orders | Net (median) | COGS | GP | Attach | Discounted | Full-price | Discounted |
|---|---|---|---|---|---|---|---|---|
| **18 QT powered** | 219 | $449.08 ($340.00) | $238.90 | $210.18 | 52.5% | 42.9% ($33.95) | 125 / $458.24 / $222.59 | 94 / $436.90 / $193.68 |
| **120 QT Powered** | 52 | $909.96 ($745.00) | $493.84 | $416.12 | 38.5% | 38.5% ($56.45) | 32 / $926.82 / $435.30 | 20 / $882.99 / $385.44 |
| **Triple Jet, all orders** | 106 | $808.96 ($872.59) | $433.53 | $372.44 (cov 94%) | 78.3% | 38.7% ($57.00) | 65 / $738.79 / $349.45 | 41 / $920.21 / $409.94 |
| Triple Jet, not in a bundle | 41 | $520.59 ($425.00) | $262.81 | $257.78 | 43.9% | 19.5% ($27.13) | 33 / $469.10 / $236.48 | 8 / $733.00 / $345.63 |
| **Performance pots, any size** | 79 | $903.17 ($917.99) | $498.43 | $408.38 (cov 92%) | 84.8% | 45.6% ($60.92) | 43 / $872.23 / $402.88 | 36 / $940.13 / $415.05 |
| 80 QT Performance | 16 | $849.84 ($906.07) | $460.86 | $388.98 | 75.0% | 43.8% | 9 / $811.16 / $382.62 | 7 / $899.59 / $397.16 |
| 100 QT Performance | 17 | $844.17 ($940.49) | $466.36 | $377.81 | 88.2% | 47.1% | 9 / $836.09 / $390.58 | 8 / $853.25 / $363.44 |
| 120 QT Performance | 29 | $1,039.14 ($1,001.75) | $575.86 | $463.28 | 89.7% | 44.8% | 16 / $1,048.23 / $481.13 | 13 / $1,027.94 / $441.30 |
| 60 QT Performance | 18 | $815.07 ($869.98) | $429.31 | $363.88 (**cov 67%**) | 83.3% | 44.4% | 10 / $731.29 / $299.22 | 8 / $919.79 / $454.41 |
| **Leg Extensions** | 157 | $384.17 ($413.10) | $193.71 | $186.32 | 68.8% | 42.0% ($40.66) | 91 / $371.97 / $188.59 | 66 / $401.00 / $183.24 |
| **Cooling Ring** | 142 | $536.90 ($524.25) | $272.24 | $255.46 | 71.1% | 33.8% ($47.26) | 94 / $451.79 / $225.75 | 48 / $703.56 / $314.90 |
| 18 QT non-powered | 11 | $271.86 ($265.00) | $137.15 | $134.71 | 9.1% | 36.4% | 7 / $288.71 / $147.83 | 4 / $242.36 / $111.73 |
| 30 QT powered | 19 | $498.41 ($462.50) | $270.93 | $227.48 | 52.6% | 42.1% | 11 / $496.77 / $231.74 | 8 / $500.67 / $221.61 |
| 60 QT Powered | 23 | $594.96 ($525.00) | $317.50 | $277.41 | 47.8% | 39.1% | 14 / $584.82 / $286.28 | 9 / $610.73 / $261.87 |
| 80 QT Powered | 16 | $685.28 ($637.74) | $358.14 | $327.14 | 31.2% | 37.5% | 10 / $729.75 / $359.52 | 6 / $611.18 / $273.17 |
| 100 QT Powered | 15 | $679.70 ($670.00) | $364.13 | $315.57 | 33.3% | 26.7% | 11 / $698.86 / $334.41 | 4 / $626.99 / $263.75 |
| Platinum Bundle | 17 | $990.03 ($885.00) | $571.71 | $434.50 (cov 88%) | 47.1% | 47.1% | 9 / $1,063.66 / $481.95 | 8 / $907.19 / $380.27 |
| Ultimate Bundle | 48 | $991.15 ($977.22) | $545.51 | $458.12 (cov 92%) | 39.6% | 52.1% | 23 / $998.61 / $476.49 | 25 / $984.29 / $441.34 |

**Top add-ons, share of anchor orders, Jun–Aug:**
- **18 QT powered:** Leg Extensions **37.4%**, 20" skimmer 14.6%, HPC deep-fryer thermometer 10.5%, Wind Shield 7.8%, 21" skimmer 3.2%. Multi-unit: 3.7%. Discount = 3.1% of gross. Lead variant: valve + basket `PWFRBR-VLV025B`, 208 units (next variant: 12).
- **120 QT Powered:** Cooling Ring 21.2%, Thermo Paddle 17.3%, Seasoning 11.5%, Basket Buddy 9.6%, HPC paddle 9.6%. Multi-unit: 11.5%.
- **Triple Jet:** centering brackets 76.4%, Thermo Paddle 50.9%, Cooling Ring 49.1%, 120 QT Performance 23.6%, 60 QT Performance 13.2%.
- **Performance pots:** Triple Jet 78.5%, brackets 78.5%, Thermo Paddle 60.8%, Cooling Ring 60.8%, Seasoning 5.1%.
- **Leg Extensions:** 18 QT powered 52.2%, 20" skimmer 15.3%, HPC deep-fryer thermometer 15.3%, Wind Shield 8.3%, Cooling Ring 3.8%. Discount = 4.3% of gross.
- **Cooling Ring:** Thermo Paddle 64.8%, Triple Jet 36.6%, brackets 36.6%, Seasoning 14.1%, 120 QT Performance 12.7%.

---

## 4. Pull A, Sep 1 2025–Aug 31 2026 (5,304 orders)

⚠️ Spans 2026-07-20 as well. The Triple Jet (`BoilBoss-TJB-V2.5`) first appears in **Dec 2025**, with zero orders Sep–Nov (Q4). Its 12-month figures are really Dec–Aug.

| Anchor | Orders | Net (median) | COGS | GP | Attach | Discounted | Full-price | Discounted |
|---|---|---|---|---|---|---|---|---|
| **18 QT powered** | 822 | $398.94 ($315.00) | $225.81 | $172.51 | 39.5% | 38.6% ($33.22) | 505 / $404.64 / $181.70 | 317 / $389.84 / $157.89 |
| **120 QT Powered** | 403 | $836.94 ($720.00) | $467.94 | $368.97 | 37.2% | 44.9% ($54.17) | 222 / $833.64 / $379.31 | 181 / $840.98 / $356.23 |
| **Triple Jet, all orders** | 434 | $749.58 ($807.51) | $402.54 | $340.04 | 76.7% | 44.0% ($53.06) | 243 / $720.40 / $337.25 | 191 / $786.72 / $343.62 |
| Triple Jet, not in a bundle | 221 | $510.57 ($425.00) | $265.31 | $245.26 | 54.3% | 38.5% ($39.71) | 136 / $478.87 / $237.93 | 85 / $561.29 / $256.98 |
| **Performance pots, any size** | 288 | $911.77 ($938.49) | $504.86 | $404.35 | 83.0% | 46.2% ($62.60) | 155 / $886.73 / $406.05 | 133 / $940.97 / $402.40 |
| 80 QT Performance | 50 | $850.04 ($910.23) | $465.67 | $384.37 | 86.0% | 42.0% | 29 / $844.26 / $392.86 | 21 / $858.01 / $372.64 |
| 100 QT Performance | 68 | $896.22 ($949.99) | $488.87 | $409.46 | 83.8% | 50.0% | 34 / $894.26 / $423.61 | 34 / $898.17 / $395.72 |
| 120 QT Performance | 136 | $981.13 ($984.99) | $554.60 | $426.54 | 83.1% | 46.3% | 73 / $948.12 / $432.03 | 63 / $1,019.37 / $420.08 |
| 60 QT Performance | 37 | $808.11 ($824.57) | $397.19 | $343.06 (**cov 73%**) | 78.4% | 43.2% | 21 / $769.54 / $298.22 | 16 / $858.74 / $399.11 |
| **Leg Extensions** | 413 | $369.87 ($407.00) | $193.71 | $173.25 | 68.8% | 36.3% ($40.62) | 263 / $358.78 / $176.23 | 150 / $389.30 / $168.08 |
| **Cooling Ring** | 987 | $369.98 ($122.50) | $184.83 | $178.06 | 64.9% | 38.3% ($36.01) | 609 / $306.46 / $156.75 | 378 / $472.34 / $212.67 |
| 18 QT non-powered | 44 | $353.77 ($265.00) | $184.58 | $162.05 | 22.7% | 31.8% | 30 / $371.83 / $172.88 | 14 / $315.08 / $139.62 |
| 30 QT powered ⚠️ | 329 | $389.80 ($345.00) | $261.53 | $128.52 | 39.2% | 39.2% | 200 / $391.32 / $132.97 | 129 / $387.44 / $121.86 |
| 60 QT Powered | 98 | $586.12 ($515.00) | $318.03 | $268.94 | 45.9% | 54.1% | 45 / $607.70 / $293.54 | 53 / $567.80 / $248.12 |
| 80 QT Powered | 106 | $716.80 ($630.00) | $385.90 | $330.91 | 26.4% | 38.7% | 65 / $750.37 / $354.89 | 41 / $663.59 / $292.88 |
| 100 QT Powered | 156 | $737.40 ($680.00) | $393.28 | $341.28 | 44.9% | 44.9% | 86 / $752.31 / $358.69 | 70 / $719.07 / $319.84 |
| Platinum Bundle | 66 | $980.06 ($908.63) | $521.63 | $435.27 | 36.4% | 43.9% | 37 / $1,031.69 / $460.04 | 29 / $914.20 / $404.30 |
| Ultimate Bundle | 148 | $1,003.91 ($984.47) | $564.59 | $446.15 | 33.8% | 52.7% | 70 / $1,025.11 / $474.69 | 78 / $984.89 / $420.31 |

**Top add-ons, 12 months:**
- **18 QT powered:** Legs 26.6%, Bayou Classic fry thermometer 8.0%, 20" skimmer 7.9%, HPC deep-fryer thermometer 4.7%, Wind Shield 3.0%. Lead variant: `PWFRBR-VLV025B`, 814 units (next: 23).
- **120 QT Powered:** Cooling Ring 20.3%, Thermo Paddle 15.4%, Seasoning 6.2%, HPC paddle 4.5%, Basket Buddy 4.5%.
- **Triple Jet:** brackets 72.1%, Thermo Paddle 40.3%, Cooling Ring 39.9%, 120 QT Performance 23.3%, 100 QT Performance 12.0%.
- **Performance pots:** Triple Jet 74.0%, brackets 72.9%, Thermo Paddle 53.8%, Cooling Ring 53.8%, Basket Buddy 6.6%.
- **Legs:** 18 QT powered 53.0%, Bayou fry thermometer 12.8%, 20" skimmer 11.6%, HPC deep-fryer thermometer 8.5%, Wind Shield 4.6%.
- **Cooling Ring:** Thermo Paddle 53.6%, Triple Jet 17.5%, brackets 17.2%, Seasoning 12.4%, 120 QT Powered 8.3%.

**Web-only check.** The 5,304 definition includes Shop app, Facebook shop, Amazon and TikTok sources: 5,312 search results, of which 4,884 are `sourceName: web`. Restricting to web moves no anchor's mean net by more than $15. For example, 18 QT powered, Jun–Aug, web only: 202 orders, $452.62 net, $211.89 GP.

---

## 5. Check against v3's one-unit floor

**How the check works:**
- **Floor.** v3's floor is list price − landed cost for one unit of v3's base variant.
- **Per-order floor.** Each full-price order is also tested against one unit of the variant it actually bought: today's list − today's landed cost, or the price charged if the variant has since been deleted.
- **Why "older list" orders fall below.** The anchor line was charged a lower list price than today's. Example: the 18 QT valve + basket sold at $313 (#10903, Sep 2025), and it's $340 now (Jun 2026 orders).

| Anchor | v3 floor | Full-price mean GP, Jun–Aug | Full-price mean GP, 12 mo | Full-price orders below own floor, Jun–Aug | Same, 12 mo |
|---|---|---|---|---|---|
| 18 QT powered | $142.50 | $222.59 | $181.70 | 2 of 125 (both money-only refunds) | 250 of 504 (247 older list, 3 refunds) |
| 120 QT Powered | $328.31 | $435.30 | $379.31 | 1 of 32 (refund) | 104 of 222 (101 older list, 3 refunds) |
| Triple Jet | $209.50 | $349.45 | $337.25 | 0 of 62 | 16 of 238 (15 older list, 1 refund) |
| 80 / 100 / 120 QT Performance | $237.75 / $239.45 / $236.28 | $382.62 / $390.58 / $481.13 | $392.86 / $423.61 / $432.03 | 0 / 0 / 0 | 1 / 1 / 2 (refunds or older list) |
| Leg Extensions | $70.10 | $188.59 | $176.23 | 0 of 90 | 0 of 261 |
| Cooling Ring | $45.46 | $225.75 | $156.75 | 1 of 92 (older list) | 20 of 604 (19 older list, 1 refund) |
| 18 QT non-powered | $110.00 | $147.83 | $172.88 | 0 of 7 | 3 of 29 (older list) |
| 60 / 80 / 100 QT Powered | $246.37 / $298.24 / $316.47 | $286.28 / $359.52 / $334.41 | $293.54 / $354.89 / $358.69 | 0 / 0 / 0 | 19 / 36 / 5 (older list, refunds) |
| **30 QT powered** | $177.38 | $231.74 | **$132.97, below the floor** | 0 of 11 | 1 of 186 (see data problem 1) |

**Result.** Unexplained full-price orders below floor: **zero on every line.** The one mean below floor (30 QT, 12 months) traces to the costing of a deleted variant.

---

## 6. Pull B: campaign-attributed orders, Aug 10–Sep 8 2026

Same population rules: **278 orders** (count 278, all pulled; Q1, Q5). All 278 have last-visit journey data ready.

⚠️ The window includes the Labor Day sale (Sep 1–8). It sits entirely after 2026-07-20, so one operator.

| What | Orders | Query |
|---|---|---|
| Last-visit UTM source = facebook, medium = paid (Meta paid) | **24** | Q5 |
| Meta UTM on the first or last visit | 30 | Q5 |
| Meta referrer with no UTM | 5 | Q5 |
| UTM naming `BPM_TOF_Manual` or `18qt-TOF-Prospecting` | **0** | Q5 |
| **Orders that can be matched to either campaign by name** | **0 of 278** | |

**Why nothing matches:**
- Meta's UTMs carry numeric IDs: `utm_campaign=6772105419387` (14 last-visit orders), `6998161993987` (1), and 8 with a blank campaign. Example: `campaign=6772105419387, content=52506061054991, term=6810865162387`.
- One first-visit UTM does carry a name ("BM | ASC+ | CBO | Creative Testing", from the BM Digital era).
- **Nothing on file maps an ID to a campaign name.** Shopify's `marketingEvents` holds only email, loyalty and Messenger events (Q6). The two Meta CSV exports in `raw/` have no campaign ID column.
- **I have not guessed which campaign 6772105419387 is.**

**What Shopify can see vs Meta's count:**
- Meta claimed **118** purchases for `BPM_TOF_Manual` and **37** for `18qt-TOF`, **155** in total, for the 30 days to Sep 8 (Ads Manager, per Board 2026-09-09).
- Shopify's population shows **24** orders with a last-visit Meta UTM in the same window (30 on first or last). That's **15–19%** of Meta's claim.
- ⚠️ **This is an observation, not an attribution rate.** Meta counts view-through and cross-device purchases, and Shopify only sees tagged sessions. **Not extrapolated.**

**Per-order economics of what Shopify can match.** Samples are small, so this is an observation with no baseline. Net here has no money-only-refund adjustment, because Q5 did not fetch refund fields.

| Set | Orders | Net/order | Landed COGS/order | GP/order | Discounted |
|---|---|---|---|---|---|
| All Pull B orders | 278 | $335.88 | $178.75 | $157.13 | 38.1% |
| Meta last-visit UTM | 24 | $273.30 | $142.82 | $130.47 | 33.3% |
| — Aug 10–31 | 13 | $367.32 | $190.07 | $177.25 | 23.1% |
| — Sep 1–8 (sale) | 11 | $162.19 | $86.99 | $75.20 | 45.5% |
| `utm_campaign` 6772105419387 | 14 | $333.93 | $176.90 | $157.03 | 42.9% |
| Meta last-visit orders containing an 18 QT powered | 8 | $375.31 | $204.75 | $170.56 | 50.0% |

Anchors among the 24: Legs 10, 18 QT powered 8, 30 QT 2, Cooling Ring 2, 120 QT 1.

**IW campaign (from Sep 11):** not live as of this pull. Nothing to pull yet.

**What would unblock Pull B:**
1. **Read-only.** Evan reads the Campaign ID column in Ads Manager for the two campaigns. That names the 14 orders on 6772105419387.
2. **A Meta change, which needs Evan's permission.** Set the URL parameters to `utm_campaign={{campaign.name}}`.

---

## 7. Data problems (not business problems)

1. **30 QT, 12 months, is unreliable.**
   - Most 30 QT units in the period (288) are a deleted variant, `PW30-VLV075-TFRB`.
   - They're costed at today's `PW30-VLV075-TFR-B` ($241.94) through a normalized SKU match, but sold at the old price.
   - Its full-price mean GP lands below v3's floor. The Jun–Aug figure uses live variants and is clean.
2. **1.64% of merchandise revenue ($32,292) has no current cost.**
   - These are deleted variants with no SKU match: 40 QT Powered, old 30 QT variants, 20 lb seasoning bulk, custom-logo paddle, and `PT60-VLV100-WEBDup`.
   - That last one drags **60 QT Performance COGS coverage to 67% (Jun–Aug) and 73% (12 mo).**
3. **10.1% of revenue is costed by SKU fallback**, meaning today's cost for today's equivalent variant. That's what "current unitCost" requires for deleted variants, but it's an assumption, not a record.
4. **#11363:** subtotal $2,672.00 vs line sum $1,406.02. Unexplained, 1 order.
5. **Bundles:**
   - Platinum and Ultimate sell as component lines with allocated prices. The $100–$150 "savings" sit inside those prices, so bundle orders read as full-price.
   - Ring + paddle combos were only detected when the order also contained a Triple Jet.
6. **18 QT lead variant.** Valve + basket (`PWFRBR-VLV025B`, $340 list, $182.05 landed) is 95% of Jun–Aug units. v3's floor row is the $285 base unit.
7. **Money-only refunds:** $5,576.36 deducted, possibly including tax.
8. **Not pulled:** ROUX's Pull C (card fees; the connector has no Payments scope) and Pull D (needs all channels).

---

## 8. Queries (exact, read-only, run 2026-09-10)

**Q0: filter verification**
```graphql
query FilterCheck {
  all12: ordersCount(query: "created_at:>='2025-09-01T00:00:00-05:00' created_at:<'2026-09-01T00:00:00-05:00'", limit: null) { count precision }
  cancelled: ordersCount(query: "<same dates> status:cancelled", limit: null) { count }
  refunded: ordersCount(query: "<same dates> financial_status:refunded", limit: null) { count }
  draft: ordersCount(query: "<same dates> source_name:shopify_draft_order", limit: null) { count }
  pos: ordersCount(query: "<same dates> source_name:pos", limit: null) { count }
  wholesale: ordersCount(query: "<same dates> tag:wholesale", limit: null) { count }
  bogusControl: ordersCount(query: "<same dates> notarealfield:xyz", limit: null) { count }
}
query FilterCheck2 {
  twoNames: ordersCount(query: "name:#16538 OR name:#16547", limit: null) { count }
  tjbSku: ordersCount(query: "<same dates> sku:BoilBoss-TJB-V2.5", limit: null) { count }
  bogus: ordersCount(query: "<same dates> notarealfield:BoilBoss", limit: null) { count }
}
```
Results: 6,381 · 93 · 76 · 597 · 304 · 184 · **6,381** (control) · 2 · 539 · **6,381** (control).

**Q1: population counts.** `ordersCount(query: "<window> <filter string>", limit: null)` returned:
- 12 months: **5,312**
- Jun–Aug: **961**
- Aug 10–Sep 8: **278**
- Per month: 166, 196, 503, 416, 261, 426, 890, 884, 609, 426, 276, 259
- 39 sub-range counts, which reconciled to each month.

**Q2: order rows**, run once per month or sub-range with `$q = "<window> <filter string>"`, 50 per page. Later pages added two aliased copies of `lineItems` (`padA`, `padB`) only so results would save to disk; the analysis ignored them.
```graphql
query PullA($first: Int!, $after: String, $q: String!) {
  orders(first: $first, after: $after, sortKey: CREATED_AT, query: $q) {
    pageInfo { hasNextPage endCursor }
    nodes {
      name createdAt sourceName cancelledAt displayFinancialStatus tags discountCodes
      currentSubtotalPriceSet { shopMoney { amount } }
      currentTotalPriceSet { shopMoney { amount } }
      currentTotalDiscountsSet { shopMoney { amount } }
      totalRefundedSet { shopMoney { amount } }
      totalRefundedShippingSet { shopMoney { amount } }
      lineItems(first: 15) { pageInfo { hasNextPage } nodes {
        name sku quantity currentQuantity variant { id }
        originalUnitPriceSet { shopMoney { amount } }
        discountedUnitPriceAfterAllDiscountsSet { shopMoney { amount } } } }
    }
  }
}
```

**Q3: current landed cost**, 3 pages of 250, 640 inventory items.
```graphql
query CostMap($after: String) {
  inventoryItems(first: 250, after: $after) {
    pageInfo { hasNextPage endCursor }
    nodes { id sku unitCost { amount } variant { id price product { title status } } }
  }
}
```

**Q4: bundle membership.** One alias per month, Sep 2025–Sep 8 2026, plus `sku:TJB_V2` over the whole window. No alias had more than 250 orders.
```graphql
m03: orders(first: 250, sortKey: CREATED_AT, query: "created_at:>='2026-03-01T00:00:00-06:00' created_at:<'2026-04-01T00:00:00-05:00' sku:BoilBoss-TJB-V2.5") {
  pageInfo { hasNextPage } nodes { name createdAt lineItems(first: 15) { nodes { sku name lineItemGroup { id title quantity } } } } }
```

**Q5: Pull B rows.** Same as Q2, without the refund fields, plus:
```graphql
customerJourneySummary { ready
  firstVisit { source landingPage referrerUrl utmParameters { campaign source medium content term } }
  lastVisit  { source landingPage referrerUrl utmParameters { campaign source medium content term } } }
```
with `$q = "created_at:>='2026-08-10T00:00:00-05:00' created_at:<'2026-09-09T00:00:00-05:00' <filter string>"`.

**Q6: marketing events**
```graphql
query MktEvents { marketingEvents(first: 100, reverse: true) { pageInfo { hasNextPage } nodes { type utmCampaign utmSource utmMedium description startedAt remoteId sourceAndMedium marketingChannelType app { title } } } }
```

**Q8: ShopifyQL cross-check**
```
FROM sales SHOW orders, gross_sales, discounts, returns, net_sales SINCE 2026-06-01 UNTIL 2026-08-31
FROM sales SHOW orders, gross_sales, discounts, returns, net_sales WHERE sales_channel = 'Online Store' SINCE 2026-06-01 UNTIL 2026-08-31
```
Results: 1,119 orders / $405,521.44 net sales; **922 / $331,318.75**.

The averages were computed in Python over the saved rows. The script was scratch and is not kept in the brain; the method is fully specified in section 2.

---

**Next:** ROUX. The order-level inputs are real. Rebuilding the ceilings from them, and deciding whether they reopen the 18 QT ladder, is a call, not a query.

→ [cac-ceilings-v3](2026-09-10-cac-ceilings-v3.md) · [landed cost](2026-09-10-landed-cost-by-variant.md) · [overhead orders](2026-09-10-orders-for-overhead-allocation.md) · [Board](../../../my-desk%20%28now%29/BOARD.md)
