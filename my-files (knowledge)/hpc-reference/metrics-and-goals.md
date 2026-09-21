# Metrics & Goals

> **Status: mostly empty by necessity.** Beau has no performance data access yet.
> Filling this file is Tier-1 homework — see `CLAUDE.md` §5.

## The scoreboard (what we actually manage to)

> ✅ **BASELINE ESTABLISHED 2026-08-26** from Shopify (read-only, ShopifyQL).
> Full report: `my-work (outputs)/internal/reports/2026-08-26-shopify-baseline.md`

## 🎯 Break-even ROAS = **~2.4 blended** (use 2.2–2.5 on core SKUs)
> ⚠️ **Under revision, 2026-09-10.** It's built on the 44.5% August margin, whose order-line costs predate Jay's cost review. The margin of record is **46%** (Jay, P&L, 365 days). It's after card fees and freight, but it was worked on the $4.3M booked revenue, so the **real margin is ~40.6%** of ~$3.9M *(derived)*. → `internal/reports/2026-09-10-overhead-method-options.md`
August 2026: $87,938 net sales · $42,384 COGS · **44.5% gross margin.** Freight excluded — the
customer pays it. Core cookers, fryers, and Boil Boss accessories all run 43–49%.
**Outlier: 60 QT Powered Cooker at 28.9% (break-even 3.9) — investigate before advertising it.**

## Paid media baseline (2026-08-26)
> ⚠️ **Window starts Jul 12, but BM Digital was fired Jul 20** (Evan, 2026-09-01). This measurement therefore includes **8 days of BM Digital spend** in the "in-house" period. Treat the in-house figures as slightly contaminated until re-pulled from 2026-07-20.

| Channel | Spend | Platform ROAS | Note |
|---|---|---|---|
| Meta (Jul 12–Aug 24) | $10,614 | ~7.0 | Spend down 62% since handover |
| Google (Jul 20–Aug 20) | $17,436 | 5.37 (**3.67** unmodeled) | 3 of 5 campaigns budget-limited |
| **Blended MER (Aug)** | ~$23,000 | **~3.8** | vs **2.25 break-even** |

⚠️ **Never sum Meta + Google claimed conversion value** — both claim the same orders. Blended MER is
the number for Jay. Full detail: `my-work (outputs)/internal/reports/2026-08-26-paid-media-baseline.md`

## 🎯 CAC — always report this alongside ROAS (Evan, 2026-08-27)

> 🚨 **SUPERSEDED AGAIN, 2026-09-14:** real landed cost, $49,550/mo overhead, and a 20% net target → `internal/reports/2026-09-10-cac-ceilings-v3.md` + `2026-09-10-overhead-method-options.md` + `internal/reports/2026-09-14-marketing-budget-model-20pct-net.md`. **The incremental rule is now Jay's official rule (2026-09-14, not just a Beau recommendation):** no overhead in ad ceilings, each ad leaves ≥20% of the order after ad cost, 20% checked monthly at business level. The **20%-net annual marketing room is $290,600/yr** (confirmed 2026-09-14 — Jay confirmed the $6,800/mo agency retainer was double-counted inside both overhead and the P&L's agency-fees line; correcting it moved the room up from an earlier $209,000 read). **Don't use the tables below.**
>
> 🚨 **SUPERSEDED IN PART — see `my-work (outputs)/internal/reports/2026-08-28-cac-model-v2.md`.**
> Robert (co-owner) correctly identified that the "allowable CAC" below is **gross profit per unit**,
> i.e. the point at which an order contributes **nothing** to overhead. It is a **break-even line,
> not a spending ceiling.** With a 20% overhead reserve the real ceilings are roughly **half**:
> 18 QT $131 → **~$63** · Triple Jet $210 → **~$96** · 120 QT $340 → **~$197** · Cooling Ring $30 → **~$21**.
> Meta pays **$61.63** per purchase on the 18 QT campaign — i.e. **break-even, not headroom.**
> **Do not use the table below to justify budget increases until landed BOM and monthly overhead are known.**

**THREE** different numbers. **Always say which one you mean.**
- **Break-even CAC** = gross profit per unit (the table below). Contributes nothing to overhead.
- **CAC ceiling** = contribution after variable costs, minus an overhead + profit reserve. ← the real limit
- **Actual CAC** = ad spend ÷ new customers.

- **Allowable (max) CAC = gross profit per unit.** The ceiling. Spend more than this to acquire the
  sale and it loses money. Falls hard when a discount applies.
- **Actual CAC = ad spend ÷ new customers.** Blended is always measurable. Per-product only where a
  campaign targets one product (e.g. Meta's `18qt-TOF-Prospecting`). If using cost-per-purchase as a
  stand-in, say so.

### Allowable CAC by product
*Margins from August 2026 Shopify data — the first month with reliable cost-per-item coverage.*

| Product | Price | Margin | **Allowable CAC** | @ 10% off | @ 30% off |
|---|---|---|---|---|---|
| 120 QT Powered Cooker | $715.00 | 47.5% | **$340** | $268 | $125 |
| 100 QT Powered Cooker | $670.00 | 47.2% | **$316** | $249 | $115 |
| 80 QT Powered Cooker | $630.00 | 48.7% | **$307** | $244 | $118 |
| 60 QT Powered Cooker | $515.00 | 47.8% | **$246** | $195 | $92 |
| Boil Boss Triple Jet Burner | $425.00 | 49.3% | **$210** | $167 | $82 |
| 60 QT Dual Turkey Fryer | $495.00 | 46.1% | **$228** | $179 | $80 |
| 30 QT Turkey Fryer | $395.00 | 39.7% | **$157** | $117 | $38 |
| **18 QT Fish Fryer — powered** | $285.00 | 46.0% | **$131** | **$103** | $46 |
| 18 QT Fish Fryer — non-powered | $220.00 | 48.4% | **$106** | $84 | $40 |
| 40 QT Sauce Cooker | $289.99 | 46.1% | **$134** | $105 | $47 |
| 4-Way Fryer / Pasta Cooker | $277.99 | 45.9% | **$128** | $100 | $44 |
| Boil Boss Ultimate Combo | $129.98 | 50.0% | **$65** | $52 | $26 |
| **Cooker Leg Extensions** | $119.00 | 40.0% | **$48** | $36 | **$12** |
| Boil Boss Thermo Paddle | $69.99 | 48.2% | **$34** | $27 | $13 |
| Boil Boss Cooling Ring | $55.99 | 54.1% | **$30** | $25 | $13 |

### Known actual CAC
| Campaign | Window | Spend | Purchases | Cost/purchase | vs allowable |
|---|---|---|---|---|---|
| Meta `18qt-TOF-Prospecting` | Jul 12–Aug 24 | $924 | 15 | **$61.63** | ✅ well under the $131 ceiling |
| Meta `BPM_TOF_Manual` (mixed SKUs) | Jul 12–Aug 24 | $8,639 | 157 | **$55.03** | ✅ blended |
| Google account (all campaigns) | Jul 20–Aug 20 | $17,436 | 191 | **$91.28** | ⚠️ over the ceiling for anything under ~$200 retail |
| Meta `18qt-TOF-Prospecting` | **Sep 1–7** | $321.40 | 16 | **$20.09** | ✅ freq 1.90, real headroom |
| Meta `BPM_TOF_Manual` (Labor Day) | **Sep 1–7** | $1,094.29 | 37 | **$29.58** | ⚠️ freq **5.05** on 15,033 reach |

> **Sept 1–7 2026, Labor Day.** Meta total **$1,415.69 · 53 claimed purchases · $26.71 CPP**
> (Ads Manager, pulled 2026-09-08 — platform-attributed, not revenue). Against Shopify's **57 new
> customers**, **actual CAC = $24.84** — ⚠️ **a floor, not a cost: no Google spend is in it.**
> Break-even CAC that week was ~$142.86 (net $321.03/order × 44.5%).
> ⛔ Shopify net ÷ Meta spend = 23.8× — **never present that as ROAS.** It credits Meta with
> commercial freight, the Navimow line, Biljana's email and Coalition's Google.
> **The finding was allocation, not creative:** $949 of $1,094 went to the vintage treatment at
> $33.00–$38.79 CPP while the dark treatment ran $19.76 on $138. That gap rests on 7 purchases —
> a hypothesis, not proof. → [analysis](../../my-desk%20%28now%29/archive/2026-09-08-labor-day-sale-analysis.md)

> ⚠️ **Google's $91.28 cost/conversion exceeds the allowable CAC for every accessory and both 18 QT
> fryers at a discount.** Fine when it's selling $500–$800 cookers; a problem if it's selling
> accessories. Worth asking Coalition for cost-per-conversion split by product.

## Known baseline numbers
| Metric | Value | Source |
|---|---|---|
| Net sales, 13 mo (Aug 2025–Aug 2026) | **$2,884,025** | Shopify |
| Gross sales, 13 mo | $3,817,328 | Shopify |
| Discounts, 13 mo | −$411,877 (10.8%) — **over half is dealer/wholesale, not consumer promo** | Shopify |
| Returns, 13 mo | −$521,426 (13.7%) — **−$174,002 (4.9%) excluding the Lowe's reversal** | Shopify |
| Gross margin (Aug 2026) | **44.5%** ⚠️ stale: order-line costs predate Jay's cost review | Shopify |
| ⭐ **P&L, last 365 days** (to 2026-09-09) | Revenue **$4.3M booked, ~$3.9M real** ($393k expense from a double-booked Lowe's order) · margin before overhead + ads **46%**, after card fees + shipping cost · net profit **−5%** · COGS **$1.68M**. The 46% was worked on the $4.3M booked (Jay), so the **real margin is ~40.6%** of ~$3.9M *(derived; assumes the double-booked entry carried no COGS)* | Jay, from the P&L, 2026-09-10 |
| Marketing, last 365 days | **$676k**: Google $206k · Meta $258k · agency fees $152k · other advertising/marketing $56k · affiliates ~$4k. ⚠️ **Trailing actuals, not forward-looking** — agency fees and other advertising were mostly one-time BM Digital costs, now discontinued (Jay, 2026-09-14): forward run-rates are ~$81.6k/yr agency fees, ~$10.3k/yr other advertising → `internal/reports/2026-09-14-marketing-budget-model-20pct-net.md` | Jay, P&L, 2026-09-10 · forward figures Jay, 2026-09-14 |
| Overhead | **~$49,550/mo, steady year-round** (agencies $6,800 · software $7,000 · non-build payroll $20,000 · rent $9,750 · insurance $1,000 · misc $5,000). Ad spend not included. A rough estimate | Jay, 2026-09-09/10 |
| Shopify, 2025-09-10 → 2026-09-09 | Net sales $2,902,399.16 · shipping charged $242,199.97 · taxes $95,575.15 · 6,442 orders | ShopifyQL, 2026-09-10 |
| Landed cost check | Shopify current `unitCost` on 12 months of paid orders ≈ $1.66M vs P&L COGS $1.68M: **within 1.4%** *(derived)* | Finn Pull D + Jay, 2026-09-10 |
| #1 product (12 mo) | 120 QT Powered — $492,671 | Shopify |
| #2 product (12 mo) | **18 QT Fish Fryer Powered — $293,194** | Shopify |
| Commercial line (12 mo) | ~$342,011 (~11.9%) | Shopify |
| Aug YoY growth | **+345%** ($19,763 → $87,938) | Shopify |
| ⭐ **Labor Day sale, Sep 1–8 2026 — COMPLETE** | **126 orders · $40,853.33 net · AOV $324.23** | Shopify, re-pulled 2026-09-17 (Finn). The 2026-09-09 figure of $41,100.84 missed the $247.51 refund on order #17385 (placed Sept 7, refunded Sept 8). Jay and Robert were given $41,100.84 |
| **Sep 1–8 2025** (also a Labor Day sale) | **63 orders · $26,144.22 net · AOV $414.99** | Shopify, verified 2026-09-09 |
| **Aug 24–31 2026** — 8 days, no sale | **65 orders · $25,130.04 net · AOV $386.62** | Shopify, verified 2026-09-09 |
| **Sep 8 2026 alone** — deadline day | **21 orders · $7,198.24** — 17.5% of the sale in 24 hours | Shopify, verified 2026-09-09 |
| Labor Day sale, Sep 1–7 2026 *(partial, superseded)* | 105 orders · $33,708 net · AOV $321.03 · $4,363 discounts | Shopify, 2026-09-08 |
| — residential core (ex-commercial, ex-Navimow) | **$24,892 · +31.8% YoY** — a floor | Shopify, 2026-09-08 |
| — prior year, Sep 1–7 2025 (also a sale) | 58 orders · $24,514 net · core $18,887 | Shopify, 2026-09-08 |

> **⚠️ AOV is net ÷ orders throughout.** Shopify's own `average_order_value` field does not
> reconcile to gross, net, or total ÷ orders — it was checked on 2026-09-08 and could not be tied
> to any of them. Older AOV figures in this brain used that field and are not comparable.
>
> ✅ **Sept 8 has now been pulled** (2026-09-09) and the complete window is above. It was the
> **biggest single day of the sale** — 21 orders and $7,198.24, 17.5% of the total in the final
> 24 hours as the codes expired. **The deadline outperformed the discount.**
>
> **The AOV warning survives the fuller data and gets stronger:** −21.4% year over year and
> −15.6% against the eight no-sale days immediately before. **Two Labor Days running on the
> same mechanic.** Keep the deadline, drop the sitewide percentage.
>
> ⚠️ **Still not on file, and not to be invented:** actual CAC for the full window (no Sept 8
> Meta spend captured, no Google Ads feed — any figure would be understated) · the
> new-vs-returning split for Sept 1–8 (the 57/44/98 figure covers **Sept 1–7 only**).
>
> **One caution remains.** ① **Sept 1–7 2025
> was also a sale** (LABOR15, SMS25, HIGH10/HIGH15), so YoY is sale-vs-sale, and it predates the
> 2026-07-20 BM Digital line — two operators, not one trend.
>
> **The AOV is the warning, not the revenue.** $321.03 is the lowest of the four windows compared
> and 24% below the prior-year Labor Day on the same mechanic, while orders nearly doubled.

## ✅ Two anomalies SOLVED (2026-08-26) — one Lowe's dealer order
**$496,320 gross booked Dec 2025 at 30% dealer+rep discount, fully reversed Feb 2026.** It explains
both the December "over-discounting" and the February "collapse." Both findings retracted.

**Corrected monthly net sales:**
| Month | As reported | **Corrected** |
|---|---|---|
| Dec 2025 | $525,449 | **$178,025** |
| Feb 2026 | −$7,392 | **$340,032** |

→ **December is a SOFTER month than November, not the year's second peak.** Plan Nov/Dec accordingly.
→ Consumer discounting is healthy: ~$56K/yr of consumer codes on $2.88M. Over half of all discounting
is dealer/wholesale. Detail: `my-work (outputs)/internal/reports/2026-08-26-discount-audit.md`.

## ⚠️ UNVERIFIED VENDOR CLAIMS — do not repeat until reconciled

| Claim | Source | Status |
|---|---|---|
| **"Revenue Up 199.03% Year-Over-Year"** | Coalition, *Monthly Campaign Report — July 2026*, emailed 2026-08-27 to Jay, Evan and Robert | ❌ **NOT verified against Shopify.** This is a vendor-reported figure in a subject line. Per the standing rule, reconcile before repeating it to Jay or Robert. |

**Why this one matters.** It arrived the day before Robert corrected the CAC model for exactly this class of error — platform-reported numbers presented as real revenue. Note also that Coalition took Google over on **2026-07-20**, so a July YoY figure covers a month they only ran the last third of. Whatever the number is, most of that July belongs to BM Digital.

## 🚨 Still open
1. ✅ **Returns doubling — CAUSE KNOWN.** Evan (2026-08-28): shipping damage caused by **FedEx and
   UPS in transit**, not packaging or product. Nothing wrong on HPC's end.
   → Still a real cost. Worth confirming **carrier damage claims are being filed**, since that money
   is recoverable and currently shows up as pure margin loss.
2. **What happened with the Lowe's deal?** A $496K reversal is a business question, not a marketing one.
   *Finn, 2026-09-10:* order #12354 was booked 2025-12-29 and shipped, but never paid. It was cancelled 2026-02-12 and all 704 units were restocked. Freight on it isn't in Shopify. Only $347,424 of February's returns is Lowe's.
3. **Influencer giveaways cost $51,603 at retail** across three 100%-off codes, with zero attribution.
   ⚠️ **True cost is understated in Shopify** — Evan confirmed (2026-08-28) that free influencer
   product is why some orders show no cost recorded. At ~55% COGS the real cost is **roughly $28K
   cash**, and it never appears in any profit report.

| Metric | Definition | Current | Target |
|---|---|---|---|
| Revenue | Shopify net sales | **$2.88M** (13 mo) | $3.5M+ |
| Blended CAC | Total ad spend ÷ new customers | <!-- TBD --> | <!-- TBD --> |
| Blended ROAS | Revenue ÷ total ad spend | <!-- TBD --> | <!-- TBD --> |
| MER | Total revenue ÷ total ad spend | **6.26** on Google + Meta ($464k) · **4.29** on all $676k marketing *(derived: Shopify net $2.90M, 365 days, 2026-09-10)* | <!-- TBD --> |
| AOV | Net sales ÷ orders | <!-- TBD --> | <!-- TBD --> |
| Gross margin | (Net sales − COGS) ÷ net sales | **~40.6%** real: 46% of $4.3M booked, less the $393k Lowe's double-booking, after card fees + freight (Jay, P&L, 365 days, 2026-09-10; derived) · 44.5% Aug is stale | maintain 44%+ |
| Discount rate | Discounts ÷ gross sales | **10.8%** (13 mo) | keep under 10% |
| Return rate | Returns ÷ gross sales | **8.2%** (Aug, rising) | reduce |
| Contribution margin | Rev − COGS − shipping − fees − ad spend | <!-- TBD --> | <!-- TBD --> |
| Site CVR | Sessions → orders | <!-- TBD --> | <!-- TBD --> |
| Email % of revenue | Klaviyo attributed ÷ total | <!-- TBD --> | 25–30% is healthy for DTC |
| Repeat rate | % of customers with 2+ orders | <!-- TBD --> | <!-- TBD --> |

## Shipping economics (Evan, 2026-08-26 — estimates, not exact)

### Consumer products — **customer pays shipping on everything**
| Item | Cost |
|---|---|
| 120 QT cooker | **~$80** average |
| Everything else | Varies by product |

### Commercial / LTL freight
**Freight items:** 40 / 60 / 80 / 100 / 120 / 140 gallon cookers · all 40–140 gal Crawcuzzis ·
sorting tables · 100 QT steamer rack.

| Destination | Cost |
|---|---|
| Southeast (TX→FL), business | **$200–$300** |
| Southeast, residential | **~$300** |
| North, business | **$250–$350** |
| North, **residential w/ lift gate** | **$350–$500** |

**Who pays:** HPC fronts it, *"but the customer in the end pays all the shipping."*

### 🔑 What this changes
**Freight is NOT a margin drag — it's passed through.** Beau's earlier working assumption (that
freight would eat 10–20% of contribution margin on big pots) was **wrong**. Contribution margin is
materially better than feared, and **break-even ROAS is lower than the 3.3 previously estimated.**

**But it relocates the problem: shipping is a CONVERSION risk, not a margin risk.**
- $80 added at checkout on a $715 pot is an **~11% price increase revealed at the final step** — a
  classic cart-abandonment driver, and it lands right after the customer already swallowed the price
  objection once.
- On commercial, **$350–$500 for residential + lift gate** is a large, late, variable surprise.
  → Qualify residential vs. business **early** in the commercial sales conversation, not at quote.

**⛔ Free-shipping-in-price test: DECLINED by Jay (2026-08-26).** Consumer shipping stays as-is; Jay
isn't willing to move pricing right now. Revisit later — do not re-propose unprompted.

**⛔ Commercial freight surprise: NOT a concern.** **Stephen** (manager of HPC's commercial product
section) walks every commercial buyer through what they're getting and how it ships, so the freight
fee is known well before it's incurred. No fix needed.

## The one number that matters most
**Contribution margin, not ROAS.** Beau will not recommend scaling anything on ROAS alone.

**Break-even ROAS = 1 ÷ contribution margin.** With freight passed through, the only missing input is
COGS:

| If COGS is… | Contribution margin* | Break-even ROAS |
|---|---|---|
| 40% | ~57% | **~1.8** |
| 45% | ~52% | **~1.9** |
| 50% | ~47% | **~2.1** |
| 55% | ~42% | **~2.4** |

\* after ~3% payment processing, freight passed through, before overhead.
**⚠️ Illustrative only — not HPC numbers.** Replace the moment real COGS is known.

Still required:
- ✅ **COGS per SKU:** Shopify `unitCost` is landed cost, confirmed by Jay 2026-09-10, and matches P&L COGS within ~1.4%.
- Payment processing % (readable from Shopify Payments payouts)
- Return / freight-damage rate (aluminum pots on LTL — real risk, unquantified)

## Reporting cadence

| Cadence | Report | Tool |
|---|---|---|
| **Weekly (Mon)** | Channel scoreboard: spend, revenue, CAC, ROAS by channel | `hpc-scoreboard-report` skill |
| **Monthly** | Full performance review + next-month plan | `marketing:performance-report` |
| **Per campaign** | Post-mortem in `my-work (outputs)/content/ads/<campaign>/postmortem.md` | — |
| **Quarterly** | Competitive + SEO audit | `marketing:competitive-brief`, `marketing:seo-audit` |

**Jay-facing reporting:** the `hpc-scoreboard-report` skill produces the CAC/ROAS Word doc built for
Jay. That's the owner-level artifact. Keep it simple, keep it honest.

## Kill/scale rules (draft — needs real CAC data to finalize)

| Signal | Action |
|---|---|
| Ad set below break-even ROAS after 3× target CPA in spend | Kill |
| Ad set at 1.5× target ROAS with stable CPA over 7 days | Scale +20–30%, never more than 30%/day |
| Creative CTR below account average for 5 days | Rotate out |
| New creative beats control on 3-day hold-rate + CTR | Promote to scaling ad set |

**✅ Break-even ROAS now defined: 2.4 blended.** Per-SKU table in
`my-work (outputs)/internal/reports/2026-08-26-shopify-baseline.md` §3. Kill anything sustained below its SKU threshold.

## Leading indicators to watch weekly
- New email subscribers (list growth rate)
- Creator posts published (affiliate program health)
- Organic reach + saves on IG/FB (saves predict purchase intent in this category)
- Branded search volume (proxy for brand demand — Google Ads search terms report)
- Add-to-cart rate on hero SKUs


---

## Related

[Board](../../my-desk%20%28now%29/BOARD.md) · [paid-media](../../my-workflows%20%28automations%29/playbooks/paid-media.md) · [cac-model-v2](../../my-work%20%28outputs%29/internal/reports/2026-08-28-cac-model-v2.md) · [what-we-sell](../../my-business%20%28context%29/what-we-sell.md) · [seasonal-calendar](seasonal-calendar.md)
