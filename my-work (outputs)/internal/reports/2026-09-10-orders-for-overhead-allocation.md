# Orders for overhead allocation — trailing 12 months
**2026-09-10 · Finn, read-only Shopify · for the CAC ceiling model**

Jay approved allocating overhead **per order** (2026-09-10, by text) and asked how the order
count is set. This is the history behind the answer.

## Orders per month, Sep 2025 – Aug 2026

| Month | Orders (ShopifyQL) | Orders (GraphQL) | Net sales |
|---|---|---|---|
| Sep 25 | 190 | 190 | $81,039 |
| Oct | 243 | 243 | $135,370 |
| Nov | 571 | 571 | $225,685 |
| Dec | 474 | 475 | $525,449 |
| Jan 26 | 358 | 358 | $229,597 |
| Feb | 585 | 585 | −$7,392 ⚠️ |
| Mar | 1,079 | 1,080 | $558,362 |
| Apr | 1,058 | 1,058 | $483,038 |
| May | 702 | 702 | $246,243 |
| Jun | 491 | 491 | $172,204 |
| Jul | 334 | 334 | $126,729 |
| Aug | 294 | 294 | $106,589 |
| **Total** | **6,379** | **6,381** | **$2,882,913** |

**Reconciliation:** the two sources differ by 2 orders (1 Dec, 1 Mar). Finn ruled out a
created-date vs processed-date difference. **The cause is unexplained**, and 2 in 6,381 does
not move the result.

Feb net sales are negative because a **$383k Lowe's return reversal** was booked that month
(Finn). Affects net sales only, not order counts.

## What is in the 6,381 — each order in one bucket only

| Bucket | Orders |
|---|---|
| Cancelled | 93 |
| Fully refunded (not cancelled) | 10 |
| $0 current total | 179 |
| Draft 414 · POS 302 · tagged `wholesale` 79 | 795 |
| Normal paid DTC | 5,304 |
| **Total** | **6,381** |

**Paid orders, all channels** = 6,381 − 93 − 10 − 179 = **6,099**.

## Allocation math

Overhead ~$49,550/month × 12 = **$594,600/year** (Jay, 2026-09-09 — rough estimate).

| Denominator | Orders | Overhead per order |
|---|---|---|
| **All paid orders, all channels — recommended** | **6,099** | **$97.49** |
| All paid orders, less ~138 AMP upsell orders | 5,961 | $99.75 |
| Normal paid DTC only | 5,304 | $112.10 |
| Every order including cancelled/$0 | 6,381 | $93.18 |

**Why a full year, not month by month:** orders run from 190 (Sep) to 1,080 (Mar), a 5.7×
swing. Monthly allocation would charge $260.79 of overhead per order in September and
$45.88 in March — calling ads unaffordable in the months the business most needs orders to
cover fixed costs.

**Why all channels:** rent, payroll and software serve every order that ships, whether it
came through the site, the phone, POS or a dealer. Dividing by DTC only would load the
dealer side's share onto website customers. Conclusion, not fact — pending Jay's confirmation.

**Structural note:** if overhead is fixed, more orders means a smaller share per order, so a
historical denominator is conservative while volume grows. Re-run quarterly.

## Open before the table is final

- ✅ **$49,550 is steady year-round** — Jay, 2026-09-10. Payroll does not rise in crawfish season, so $594,600/yr stands.
- Draft and POS orders cannot be reliably split into dealer vs. phone/trade-show. Doesn't matter if all channels count.
- Dealers identified only by **customer tag** cannot be found — Shopify ignores filters it doesn't recognize and returned all 134,760 customers.
- The $0 bucket uses total after refunds, including shipping — fully discounted orders that charged shipping are missed. 8 orders tagged warranty, 5 replacement, not checked against buckets.
- The 5,304 includes 22 Amazon and 19 TikTok orders.
- Window spans 2026-07-20 (BM Digital cutover). Irrelevant to order counts; relevant to anything about ad spend.

## Sources

- ShopifyQL: `FROM sales SHOW orders, gross_sales, discounts, returns, net_sales TIMESERIES month SINCE 2025-09-01 UNTIL 2026-08-31`
- GraphQL: `ordersCount(query: "created_at:>='2025-09-01T00:00:00-05:00' created_at:<'2026-09-01T00:00:00-05:00' …", limit: null)`, with each bucket's filter added
- Overhead: Jay, by text, 2026-09-09

→ [CAC model v2](2026-08-28-cac-model-v2.md) · [decisions](../../../my-desk%20%28now%29/decisions.md)
