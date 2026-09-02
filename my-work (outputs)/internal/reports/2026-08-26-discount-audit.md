# Discount Audit — and the February Mystery, Solved
**Pulled 2026-08-26 by ROUX from Shopify (read-only, ShopifyQL). Nothing changed.**

---

# 🚨 PART 1 — Two of ROUX's earlier findings were WRONG. Here's the correction.

## One Lowe's dealer order explains both December and February.

| Month | Gross sales | Discount | Returns | Net |
|---|---|---|---|---|
| **Dec 2025** | **$496,320.00** | −$148,896.00 (30%) | $0 | **$347,424.00** |
| **Feb 2026** | $0 | $0 | **−$347,424.00** | **−$347,424.00** |

Discount title: **`Lowes dealer 25% and Rep 5%`**

A single Lowe's dealer order — **$496,320 gross at a 30% dealer-plus-rep discount** — booked in
December 2025 and **fully reversed in February 2026.**

## What that means for the two alarms ROUX raised

### ❌ RETRACTED: "December discounted 24.1% and may have been unprofitable"
**The December consumer promo was fine.** Strip the Lowe's order out:

| | Reported | **Actual consumer business** |
|---|---|---|
| Gross sales | $703,194 | **$206,874** |
| Discounts | −$169,721 (**24.1%**) | **−$20,825 (10.1%)** |
| Net sales | $525,449 | **$178,025** |

**10.1% is a normal December discount rate.** There is no promo problem. ROUX's recommendation to
audit the December promo before repeating it is withdrawn.

### ❌ RETRACTED: "February 2026 was a catastrophic negative month"
**February was actually a strong month.** Strip the reversal out:

| | Reported | **Actual** |
|---|---|---|
| Gross sales | $424,937 | $424,937 |
| Returns | −$383,420 (90.2%) | **−$35,996 (8.5%)** |
| Net sales | **−$7,392** | **+$340,032** |

Crawfish season was never interrupted.

## ✅ The corrected shape of the year

| Month | As reported | **Corrected** |
|---|---|---|
| Nov 2025 | $225,685 | $225,685 |
| **Dec 2025** | $525,449 | **$178,025** |
| Jan 2026 | $229,597 | $229,597 |
| **Feb 2026** | −$7,392 | **$340,032** |
| Mar 2026 | $558,362 | $558,362 |
| Apr 2026 | $483,038 | $483,038 |
| May 2026 | $246,243 | $246,243 |

**This is a far more coherent business:** a soft December, a January warm-up, then Feb → Mar → Apr
ramping into peak. Exactly what a crawfish business should look like. The annual total is unchanged
(~$2.88M) because the Lowe's order netted to zero.

**Implication for planning:** December is **not** a $525K month. Real December is ~$178K — softer than
November. The Nov/Dec turkey-and-gifting window is a **smaller** opportunity than the raw numbers
suggested, and February is a **bigger** one.

> ⚠️ **The real open question is now commercial, not marketing:** what happened with the Lowe's deal?
> A half-million-dollar dealer order that reversed is a business event, not a marketing one — but it
> distorts every report that spans it. → **Evan / Jay.**

---

# PART 2 — Where the discounts actually go

Trailing 12 months, by discount title:

| Discount | Gross sales | Discount | Net | Type |
|---|---|---|---|---|
| **Lowes dealer 25% and Rep 5%** | $496,320 | **−$148,896** | $0 *(reversed)* | Dealer |
| **Influencer** | $42,905 | **−$42,905** | **$0** | 100% free |
| Distributor Pricing | $89,426 | −$33,093 | $28,167 | Dealer |
| Wholesale Price | $75,625 | −$18,109 | $57,104 | Dealer |
| **HIGH10** | $169,449 | −$17,314 | $147,444 | Consumer |
| **SMS25** | $186,419 | −$11,125 | $170,662 | Consumer |
| *(no discount)* | $1,781,985 | −$9,589 | $1,673,211 | — |
| Wholesale Discount | $41,502 | −$9,087 | $29,196 | Dealer |
| Custom discount | $49,980 | −$7,640 | $40,394 | Manual |
| Discount | $43,368 | −$7,555 | $35,111 | Manual |
| Christmas10 | $55,149 | −$5,694 | $49,212 | Consumer |
| HIGH5 | $90,015 | −$5,103 | $84,852 | Consumer |
| **Influencer Discount 100%** | $5,100 | **−$5,100** | **$0** | 100% free |
| BLKF25 | $50,622 | −$5,062 | $43,277 | Consumer |
| Affiliate Discount | $76,810 | −$3,850 | $64,496 | Affiliate |
| **Influencer/Affiliate** | $3,599 | **−$3,599** | **$0** | 100% free |
| HIGH15 | $65,216 | −$3,420 | $60,440 | Consumer |
| LABOR15 | $17,950 | −$3,117 | $14,444 | Consumer |
| JULY426 | $26,218 | −$2,943 | $22,155 | Consumer |
| EASTERPROMO | $28,226 | −$2,822 | $23,838 | Consumer |

## 🟢 FINDING — consumer discounting is healthy
**$1.78M of gross sales carried no discount at all.** The consumer codes (HIGH10, SMS25, HIGH5,
HIGH15, Christmas10, BLKF25, LABOR15, JULY426, EASTERPROMO) total roughly **$56,000** across the
year — modest and well-controlled.

**More than half of all discounting is dealer/wholesale**, not consumer promotion:
Lowes $148,896 + Distributor $33,093 + Wholesale Price $18,109 + Wholesale Discount $9,087 =
**$209,185.**

This matters because HPC's customers buy on quality, not price (80% vs 10% — see
`my-files (knowledge)/hpc-reference/customer-language.md`). **The data says HPC is not over-discounting to consumers.
Good. Keep it that way.**

## 🚨 FINDING — influencer giveaways cost **$51,603** at retail
Three 100%-off labels, all netting $0:
`Influencer` $42,905 · `Influencer Discount 100%` $5,100 · `Influencer/Affiliate` $3,599

**That is roughly 2.5× the ~$20K ROUX estimated from the affiliate spreadsheet.** Combined with the
BM Digital account (see `my-files (knowledge)/hpc-reference/what-weve-tried.md`), this is the true cost of the influencer
program — and there is still no revenue attributed against it.

→ **Every future seed needs a unique discount code so this table can show what came back.**

---

# PART 3 — The 60 QT Powered Cooker: mystery solved

## ✅ It is NOT miscosted.

| SKU | Price | Cost per item | **List margin** |
|---|---|---|---|
| 60 QT (PW60-BSJ-VLV075) | $515.00 | **$268.63** | **47.8%** |
| 80 QT (PW80-BDJ-VLV075) | $630.00 | **$331.76** | **47.3%** |

**The 60 QT's list margin is 47.8% — right in line with the rest of the line.** ROUX's earlier
"mispriced or miscosted" warning is **withdrawn.**

## The real cause: it gets discounted harder than anything else.

August 2026 discount rates by product:

| Product | Gross | Discount | **Rate** |
|---|---|---|---|
| **60 QT Powered Cooker** | $2,595 | −$567 | **21.8%** |
| 30 QT Turkey Fryer | $4,893 | −$557 | 11.4% |
| Performance Boiling Pots | $7,829 | −$789 | 10.1% |
| Boil Boss Triple Jet Burner | $13,757 | −$880 | 6.4% |
| 18 QT Fish Fryer | $18,335 | −$723 | 3.9% |
| 120 QT Powered Cooker | $10,896 | −$124 | 1.1% |
| 80 QT / 100 QT | — | **$0.00** | **0%** |

**The 60 QT is discounted at ~5× the 18 QT and ~20× the 120 QT.** A 47.8% list margin minus a 21.8%
discount is where the 28.9% realized margin comes from. Nothing is broken — it's being sold cheap.

## What's discounting it (12 months)

**Free / 100% written off — 5 units, $2,555 retail:**
`Damaged pot` $525 · `Damaged in shipping, replacement pot` $515 · `Damaged Replacement` $515 ·
`BM Digital` $500 · `Influencer` $500

**Dealer — 25% off, $4,500 gross:** `Wholesale Price` · `Wholesale Discount`

**Consumer codes:** HIGH10 (11.5%) · Custom discount (13%) · Christmas10 (10%) · LABOR15 (15%) ·
Military (24%) · BLKF25 (10%) · SMS25 (4.6%) · Affiliate (5%)

## 🔴 The finding inside the finding: shipping damage

**Three separate "damaged" write-offs on this one SKU** — two of them explicitly shipping-related.
One recorded full COGS against zero revenue: a straight **−$268.63 loss.**

This connects directly to the **return rate doubling from 3.9% to 8.2%** since March. Aluminum pots
on LTL freight is exactly where that shows up. **Worth a root-cause look at packaging and carrier.**

---

# What to do

| # | Action | Owner |
|---|---|---|
| 1 | **Explain the Lowe's reversal.** $496K booked and reversed distorts every report that spans it. | **Evan → Jay** |
| 2 | **Decide the 60 QT's role.** It's healthy at list and thin when discounted. Either stop discounting it or accept it as a deliberate entry-price loss-leader — but do it on purpose. | **Evan** |
| 3 | **Investigate shipping damage.** Three write-offs on one SKU, plus returns doubling since March. | **Evan** |
| 4 | **Unique discount code per creator.** $51,603 of free product with no attribution. | **Evan / ROUX** |
| 5 | **Re-baseline Nov–Feb planning** on corrected numbers. December is ~$178K, not $525K. | **ROUX** |
| 6 | **Keep consumer discounting where it is.** ~$56K/yr on $2.88M is disciplined, and customers buy on quality anyway. | — |


---

## Related

[Board](../../../my-desk%20%28now%29/BOARD.md) · [what-we-sell](../../../my-business%20%28context%29/what-we-sell.md) · [metrics-and-goals](../../../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md)
