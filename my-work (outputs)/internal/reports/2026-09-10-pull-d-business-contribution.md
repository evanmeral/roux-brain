# Pull D: business-level gross profit, all orders

> tidy-brain: 2026-09-22: some files this page names were moved to the Trash (duplicates or superseded rounds). List: my-desk (now)/archive/tidy/2026-09-22-removed.md. Recover any of them with git checkout 7b3b0c5 -- "<path>".
**2026-09-10 · Finn, read-only Shopify · input to [cac-ceilings-v3](2026-09-10-cac-ceilings-v3.md) section 5, Pull D**

Nothing was written to Shopify, Meta or Google. Window: **Sep 1 2025 – Aug 31 2026**, Central time, matching the overhead denominator. Every order figure is from Shopify Admin GraphQL rows pulled 2026-09-10. Totals and percentages are **derived by Finn** from those rows. **No overhead, variable cost, CAC or net-profit figure is computed here.** That's Beau's.

⚠️ The window spans **2026-07-20** (BM Digital fired). That's irrelevant to gross profit totals, but it matters for the ad spend in section 5: two operators.

---

## 1. Headline, as pulled (the Lowe's order is not in any population)

| Population | Orders | Net revenue | Landed COGS | Gross profit | GP % | Uncosted revenue |
|---|---|---|---|---|---|---|
| **1. All paid orders, all channels** | **6,099** | **$2,863,027.44** | **$1,632,600.87** | **$1,187,514.36** | **42.11%** | $42,912.21 (1.50%) |
| **2. Normal paid DTC** | **5,304** | **$1,959,977.22** | **$1,066,459.10** | **$861,226.15** | **44.68%** | $32,291.97 (1.64%) |
| **3. Draft + POS + wholesale (1 − 2)** | **795** | **$903,050.22** | **$566,141.77** | **$326,288.21** | **36.56%** | $10,620.24 (1.18%) |
| — 3a. Draft orders | 414 | $609,394.48 | $378,014.52 | $224,375.34 | 37.25% | $7,004.62 (1.15%) |
| — 3b. POS | 302 | $131,518.55 | $76,109.02 | $53,184.80 | 41.13% | $2,224.73 (1.69%) |
| — 3c. Tagged `wholesale`, not draft or POS | 79 | $162,137.19 | $112,018.23 | $48,728.07 | 30.31% | $1,390.89 (0.86%) |

**How to read GP and GP %:**
- **GP is on costed lines only.** GP = (net revenue of lines with a cost − money-only refunds) − landed COGS.
- **GP % uses that same costed revenue as its base.** For population 1 the base is $2,820,115.23.
- Lines with no cost are left out of both sides. They are shown in the last column.
- **Upper bound, not an estimate.** If every uncosted line had cost $0, GP would be:
  - Population 1: $1,230,426.57 (42.98% of all net revenue)
  - Population 2: $893,518.12 (45.59%)
  - Population 3: $336,908.45 (37.31%)
- **Net revenue per order** *(derived)*: population 1 $469.43 · population 2 $369.53 · population 3 $1,135.91.
- GP here is before card fees, packaging, warranty, overhead and ad spend. It is **not contribution margin and not net profit**.

---

## 2. The Lowe's order: with and without

**Fact (Shopify, Q-D4).** Order **#12354**:
- **Booking.** Draft order, customer "Lowe's", **created 2025-12-29**. It sits inside the window, so the window does not carry the return without the sale.
- **Contents.** 704 × 120 QT Powered (`PW120-BTJ-VLV075`) at $705.00 list, $493.50 after a 30% dealer + rep discount:
  - Gross $496,320.00
  - Discount $148,896.00
  - **Net $347,424.00**
- **Fulfillment.** Fulfilled **2026-01-02**.
- **Payment.** Financial status **PENDING**, with no payment gateway. **It was never paid.**
- **Cancellation.** Cancelled **2026-02-12**, reason "CUSTOMER". All 704 units were restocked (`restockType: RETURN`) and $0.00 was refunded.

Because it is cancelled, the paid-order filter excludes it. **It is in none of the three populations above.**

At **current** unitCost ($386.69), its landed COGS would be $272,229.76 and its GP $75,194.24 (21.64%) *(derived)*.

| Population | Version | Orders | Net revenue | Landed COGS | GP | GP % |
|---|---|---|---|---|---|---|
| 1. All paid | **As pulled: Lowe's excluded** | 6,099 | $2,863,027.44 | $1,632,600.87 | $1,187,514.36 | 42.11% |
| 1. All paid | **With the Lowe's sale and its return** (both in window) | 6,099 | $2,863,027.44 | $1,632,600.87 | $1,187,514.36 | 42.11% |
| 1. All paid | **Sale kept, return removed.** ⚠️ What-if only; this did not happen | 6,100 | $3,210,451.44 | $1,904,830.63 | $1,262,708.60 | 39.86% |
| 3. Draft/POS/wholesale | As pulled / with sale and return | 795 | $903,050.22 | $566,141.77 | $326,288.21 | 36.56% |
| 3. Draft/POS/wholesale | Sale kept, return removed (what-if) | 796 | $1,250,474.22 | $838,371.53 | $401,482.45 | 32.38% |
| 2. DTC | All versions | 5,304 | $1,959,977.22 | $1,066,459.10 | $861,226.15 | 44.68% |

**Why "with" equals "without":** the sale and the return both fall inside Sep 2025–Aug 2026. On current values the order nets to $0 revenue and $0 COGS (704 units back in stock).

**The "$383k Lowe's return" is not all Lowe's.**
- **Feb 2026 total.** ShopifyQL's Feb 2026 `returns` total is **−$383,420.42** (Q-D5a).
- **Lowe's share.** Lowe's own reversal is **$347,424.00**.
- **A second reversal in the same month.** Draft **#12709** ($30,912.98 total, created 2026-01-29) was cancelled 2026-02-12 and re-booked the same day as **#12896** at $28,166.72 (Q-D4b).
- I have not broken down the remainder.

---

## 3. Checks: did every filter filter?

Filter string for population 1: `created_at:>='2025-09-01T00:00:00-05:00' created_at:<'2026-09-01T00:00:00-05:00' -status:cancelled -financial_status:refunded`. Orders with `currentTotalPriceSet = 0` were then removed in code.

| Check | Result | Query |
|---|---|---|
| Fake field `notarealfield:xyz` | **6,381**, the whole year. Shopify silently drops unknown filters | Q-D0 |
| Fake fields inside an OR group `(notarealfield:xyz OR notarealfield:abc)`, plus the cancel/refund filters | **6,278**, identical to no group at all. **An OR group Shopify can't parse is dropped entirely** | Q-D0 |
| Real OR group `(source_name:shopify_draft_order OR source_name:pos OR tag:wholesale)`, plus the cancel/refund filters | **966**. It differs from 6,278, so it filtered | Q-D0 |
| Not cancelled, not refunded | 6,278 = DTC search **5,312** + other **966**. Rows pulled overlap: **0** | Q-D0, rows |
| Other = draft **584** + POS **303** + wholesale-only **79** | = 966 | Q-D0 |
| Cancelled | 93, matching [orders-for-overhead-allocation](2026-09-10-orders-for-overhead-allocation.md) | Q-D0 |
| Rows pulled vs count, by month (966 population) | 24 · 44 · 61 · 53 · 91 · 145 · 172 · 152 · 84 · 55 · 53 · 32. **All 12 months equal their counts.** Last page `hasNextPage: false` on every month | Q-D1, Q-D2, Q-D3 |
| $0 current total removed | DTC 8 + other 171 = **179**, matching the bucket table | rows |
| **After $0 removal** | draft **414**, POS **302**, wholesale **79** = **795**, and DTC **5,304**. **Exactly** the bucket table | rows |
| Line items cut off by paging | 0 of 6,278 orders | rows |
| Population 2 reproduces Pull A | Uncosted $32,291.97 (1.64%), cost source 88.28 / 5.00 / 5.08 / 1.64%, Shipping Protection $22,079.84, Accident Prevention $36.75, money-only refunds $5,576.36. **All identical to [Pull A](2026-09-10-order-level-pulls.md)** | rows |

**Second source for revenue (ShopifyQL, Q-D5b).**
- **Total.** Order-level net + Shipping Protection + Accident Prevention + shipping lines = **$2,885,964.65**. ShopifyQL `net_sales` = **$2,882,912.82**. The gap is **$3,051.83 (0.11%)**.
- **By channel:**
  - Draft $610,039.98 vs $605,655.04
  - POS $131,608.17 vs $131,470.98
  - Wholesale-tag-only $162,137.19 vs Wholesale Gorilla channel $162,133.44
- **Why they can't match exactly.** ShopifyQL books returns on the return date. It counts returns on pre-window orders, and misses refunds made after Aug 31 on window orders.
- This is a sanity check, not a reconciliation.

**No second source for COGS.**
- ShopifyQL's own `cost_of_goods_sold` and `gross_profit` don't reconcile: Online Store $1,908,668.76 net, $364,313.43 COGS, $230,975.97 GP (Q-D5c). Net minus COGS is not GP, so I didn't use them.
- **The only COGS source is current `unitCost` × quantity.**

**What this query structurally cannot return:**
- **Cancelled orders.** That's deliberate, and it includes both Lowe's #12354 and #12709.
- **Fully refunded orders.**
- **Returns booked in the window on orders created before Sep 1 2025.**
- **Refunds made Sep 1–10 on window orders *are* included**, because current values are as of the pull.

---

## 4. Definitions and method (same as Pull A)

- **Net revenue.** For each line still on the order (`currentQuantity` > 0): `currentQuantity × discountedUnitPriceAfterAllDiscounts`.
  - **Excluded:** shipping charged, taxes, Shipping Protection (`NVDPROTECTION*`, $22,156.95 across population 1), Accident Prevention ($36.75), and money-only refunds ($5,945.86 deducted: 75 DTC orders, plus draft orders for $369.50).
  - **New in Pull D:** custom line items that are shipping by another name are also excluded, **$743.51**: "Freight" $585.00 (draft) and $85.50 (DTC), "Shipping" $68.01, "Replacement thermometer shipping" $5.00, "Return Shipping" $0.00.
  - ⚠️ Pull A counted the $85.50 DTC Freight line as merchandise, so population 2 net here is $85.50 lower than Pull A's method would give. The $0 Return Shipping lines change nothing.
- **Landed COGS** = `currentQuantity ×` the **current** `inventoryItem.unitCost` of the line's variant.
  - The cost map is Pull A's Q3, pulled 2026-09-10: 640 inventory items.
  - Fallback for deleted variants: first the exact SKU, then the SKU with punctuation stripped.
  - Population 1 revenue by cost source: variant **90.34%** · exact SKU **4.44%** · normalized SKU **3.72%** · **none 1.50%**.
- **Gross profit** = net revenue − landed COGS, on costed lines (section 1).
- **Pull timing:**
  - Population 2 rows: Pull A's Q2, pulled 2026-09-10 (morning).
  - Population 3 rows: pulled 2026-09-10 (afternoon).
  - Both use the same cost map.

---

## 5. Ad spend in the window: only what is on file

**The Shopify Admin API has no spend data.** Files checked: `my-work (outputs)/internal/reports/` and `raw/`.

| File | Platform · level | Date range | Amount spent (sum of `Amount spent (USD)`) | Operator |
|---|---|---|---|---|
| `raw/HP-Cookers-ADs-Campaigns-Jan-1-2026-Jul-11-2026.csv` (saved Aug 28) | Meta · campaign | **2026-01-01 – 2026-07-11** | **$198,895.44** (9 campaigns with spend) | BM Digital throughout |
| `raw/HP-Cookers-ADs-Campaigns-Jul-12-2026-Aug-28-2026.csv` (saved Aug 28) | Meta · campaign | **2026-07-12 – 2026-08-28** | **$11,318.50** (3 campaigns with spend) | **Spans 2026-07-20**: 8 days BM Digital, then Evan |

**Meta spend on file inside the window: $210,213.94, for Jan 1 – Aug 28 2026 only** *(sum of the two files)*.

**Not covered, and not estimated:**
- **Meta, Sep 1 – Dec 31 2025.** Four months, including November, the secondary peak. No export on file.
- **Meta, Aug 29 – 31 2026.** No export on file.
- **Google Ads, the entire window.** No export on file, and there is no connector.
  - [paid-media-baseline](2026-08-26-paid-media-baseline.md) quotes **$17,436 for Jul 20 – Aug 20**, read from the Google Ads interface on 2026-08-26. That is a single month read off a screen, not an export, and it's not included above.
- **Any other paid channel.** Nothing is on file.

**So total ad spend for the window is not on file. I don't have that number.**

---

## 6. Data problems (not business problems)

1. **Uncosted revenue: $42,912.21 (1.50%).** These are deleted variants with no SKU match. The largest:
   - Old 30 QT `PW30-VLV050-TFRB` $8,043.05
   - 40 QT Powered variants and scratch-and-dent ~$14,860
   - A custom "WD Dual Basket 120 gallon Commercial Cooker" with no SKU, $3,000.00
   - `PT60-VLV100-WEBDup` $3,367.68
   - A Navimow i110, $889.72
2. **8.16% of revenue is costed by SKU fallback**, meaning today's cost of today's equivalent variant. That's what "current unitCost" requires for deleted variants, but it's an assumption, not a record.
3. **Population 3 is not all cookers:**
   - "Custom Product" (`CUST-Product`): 1,008 units, $9,747.10 revenue, costed at $5.00 each. **What it is has not been checked.**
   - Custom Labor: $1,455.00 revenue against $1,470.00 cost.
   - Navimow mowers and accessories: about $7,245 revenue, costed.
4. **Gift cards are counted as revenue with a cost.** Across population 1: $1,150.00 revenue, $621.00 "cost". A gift card is a liability, not a sale. The amount is small, and it's flagged here rather than removed.
5. **6 population-3 orders are PENDING**, meaning net terms and not yet paid: $14,128.97 net.
6. **40 orders have no merchandise revenue** after exclusions: 33 DTC and 7 draft. They carry only Shipping Protection or shipping. They count as orders, which matters for the 6,099 denominator.
7. **The Lowe's order shipped, came back, and was never paid.** Any freight or handling on 704 cookers in each direction is not in Shopify, and not in these figures.
8. **The "$383k Lowe's return" figure** in [orders-for-overhead-allocation](2026-09-10-orders-for-overhead-allocation.md) is Feb's total returns. The Lowe's part is $347,424.00 (section 2).

---

## 7. Queries (exact, read-only, run 2026-09-10)

**Q-D0: filter verification**
```graphql
query PopCounts {
  all12: ordersCount(query: "created_at:>='2025-09-01T00:00:00-05:00' created_at:<'2026-09-01T00:00:00-05:00'", limit: null) { count precision }
  notCancNotRef: ordersCount(query: "<dates> -status:cancelled -financial_status:refunded", limit: null) { count precision }
  dtcSearch: ordersCount(query: "<dates> -status:cancelled -financial_status:refunded -source_name:shopify_draft_order -source_name:pos -tag:wholesale", limit: null) { count precision }
  otherOR: ordersCount(query: "<dates> -status:cancelled -financial_status:refunded (source_name:shopify_draft_order OR source_name:pos OR tag:wholesale)", limit: null) { count precision }
  otherDraft: ordersCount(query: "<dates> -status:cancelled -financial_status:refunded source_name:shopify_draft_order", limit: null) { count }
  otherPos: ordersCount(query: "<dates> -status:cancelled -financial_status:refunded source_name:pos", limit: null) { count }
  otherWholesaleOnly: ordersCount(query: "<dates> -status:cancelled -financial_status:refunded tag:wholesale -source_name:shopify_draft_order -source_name:pos", limit: null) { count }
  bogusControl: ordersCount(query: "<dates> notarealfield:xyz", limit: null) { count }
  bogusInsideOR: ordersCount(query: "<dates> -status:cancelled -financial_status:refunded (notarealfield:xyz OR notarealfield:abc)", limit: null) { count }
  cancelled: ordersCount(query: "<dates> status:cancelled", limit: null) { count }
}
```
Results: 6,381 · 6,278 · 5,312 · **966** · 584 · 303 · 79 · **6,381** (control) · **6,278** (control) · 93.

**Q-D1: month counts, 966 population.** Twelve aliases of `ordersCount(query: "<month window> -status:cancelled -financial_status:refunded (source_name:shopify_draft_order OR source_name:pos OR tag:wholesale)", limit: null)`. Results: 24, 44, 61, 53, 91, 145, 172, 152, 84, 55, 53, 32.

**Q-D2: population 3 rows.** Run once per month, 50 per page, following `endCursor`. `padA`/`padB` are duplicate copies of `lineItems`, there only so results save to disk. The analysis ignores them.
```graphql
query PullD($first: Int!, $after: String, $q: String!) {
  orders(first: $first, after: $after, sortKey: CREATED_AT, query: $q) {
    pageInfo { hasNextPage endCursor }
    nodes {
      name createdAt sourceName cancelledAt displayFinancialStatus tags discountCodes
      currentSubtotalPriceSet { shopMoney { amount } }
      currentTotalPriceSet { shopMoney { amount } }
      currentTotalDiscountsSet { shopMoney { amount } }
      totalRefundedSet { shopMoney { amount } }
      totalRefundedShippingSet { shopMoney { amount } }
      lineItems(first: 30) { pageInfo { hasNextPage } nodes {
        name sku quantity currentQuantity variant { id }
        originalUnitPriceSet { shopMoney { amount } }
        discountedUnitPriceAfterAllDiscountsSet { shopMoney { amount } } } }
      padA: lineItems(first: 30) { nodes { ...same fields } }
      padB: lineItems(first: 30) { nodes { ...same fields } }
    }
  }
}
```
Here `$q = "<month window> -status:cancelled -financial_status:refunded (source_name:shopify_draft_order OR source_name:pos OR tag:wholesale)"`. Month windows use −05:00 or −06:00 to match Central daylight time.

**Q-D3: last pages.** These are the same fields as Q-D2, run as aliased `orders(first: N, after: <cursor>, ...)` calls:
- Nov 11, Dec 3, Jun 5, Jul 3
- Mar 22, Apr 2 (`first: 3`, which returned 2)

**Population 2 rows and the cost map** are Pull A's Q2 and Q3, reused unchanged. See [order-level-pulls](2026-09-10-order-level-pulls.md) section 8.

**Q-D4: Lowe's**
```graphql
query Biggest { orders(first: 12, sortKey: TOTAL_PRICE, reverse: true, query: "created_at:>='2025-01-01T00:00:00-06:00' created_at:<'2026-09-01T00:00:00-05:00'") { nodes { name createdAt processedAt sourceName cancelledAt displayFinancialStatus tags customer { displayName } originalTotalPriceSet { shopMoney { amount } } currentTotalPriceSet { shopMoney { amount } } totalRefundedSet { shopMoney { amount } } refunds(first: 10) { createdAt totalRefundedSet { shopMoney { amount } } } } } }
query Lowes { orders(first: 1, query: "name:#12354") { nodes { name createdAt processedAt closedAt cancelledAt cancelReason sourceName displayFinancialStatus displayFulfillmentStatus paymentGatewayNames customer { displayName numberOfOrders orders(first: 25) { nodes { name createdAt cancelledAt displayFinancialStatus originalTotalPriceSet { shopMoney { amount } } } } } subtotalPriceSet { shopMoney { amount } } totalDiscountsSet { shopMoney { amount } } fulfillments(first: 5) { createdAt status } refunds(first: 5) { createdAt note totalRefundedSet { shopMoney { amount } } refundLineItems(first: 5) { nodes { quantity restockType lineItem { sku } } } } lineItems(first: 20) { nodes { sku quantity currentQuantity originalUnitPriceSet { shopMoney { amount } } discountedUnitPriceAfterAllDiscountsSet { shopMoney { amount } } variant { inventoryItem { unitCost { amount } } } } } } } }
```
**Lowe's customer record.** It shows 2 orders:
- **#12354**, described above.
- **#6085** (2024-03-12, $4,968.00), voided and cancelled within a minute. It sits outside the window.

**Q-D4b.** Order **#12709** and its same-day replacement **#12896** came back in the `Biggest` query above.

**Q-D5: ShopifyQL**
```
a) FROM sales SHOW orders, gross_sales, discounts, returns, net_sales, shipping_charges, taxes, total_sales TIMESERIES month SINCE 2025-09-01 UNTIL 2026-08-31
b) FROM sales SHOW orders, gross_sales, discounts, returns, net_sales GROUP BY sales_channel SINCE 2025-09-01 UNTIL 2026-08-31
c) FROM sales SHOW orders, net_sales, cost_of_goods_sold, gross_profit GROUP BY sales_channel SINCE 2025-09-01 UNTIL 2026-08-31
```
Results:
- (a) Feb 2026 returns −$383,420.42. Dec 2025 gross $703,194.02.
- (b) and (c) Net sales $2,882,912.82 total.

The totals were computed in Python over the saved rows, with the same line logic as Pull A plus the shipping-line exclusion in section 4. The scripts are scratch and are not kept in the brain.

---

**Next:** Beau. The business-level gross profit is real, and so is the ad-spend gap. Whether $1.19M of gross profit covers $594,600 of overhead after variable costs and ad spend, and what that means for per-ad ceilings, is a call, not a query.

→ [cac-ceilings-v3](2026-09-10-cac-ceilings-v3.md) · [order-level pulls](2026-09-10-order-level-pulls.md) · [overhead orders](2026-09-10-orders-for-overhead-allocation.md) · [Board](../../../my-desk%20%28now%29/BOARD.md)
