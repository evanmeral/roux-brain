# Shopify Baseline — First Real Data Pull
**Pulled 2026-08-26 by ROUX via Shopify Admin (read-only, ShopifyQL). Source: Shopify Analytics.**
Window: 2025-08-01 → 2026-08-25 (13 months). All figures USD.

> This replaces every Venon-sourced number. Venon is not used.

---

## 1. Monthly performance — the real shape of the year

| Month | Gross sales | Discounts | Disc % | Returns | Return % | **Net sales** |
|---|---|---|---|---|---|---|
| Aug 2025 | $22,266 | $-2,707 | 12.2% | $204 | 0.9% | **$19,763** |
| Sep 2025 | $90,949 | $-7,096 | 7.8% | $-2,814 | 3.1% | **$81,039** |
| Oct 2025 | $146,249 | $-8,308 | 5.7% | $-2,571 | 1.8% | **$135,370** |
| Nov 2025 | $254,074 | $-23,338 | 9.2% | $-5,051 | 2.0% | **$225,685** |
| Dec 2025 | $703,194 | $-169,721 | 24.1% | $-8,024 | 1.1% | **$525,449** |
| Jan 2026 | $295,933 | $-49,053 | 16.6% | $-17,283 | 5.8% | **$229,597** |
| Feb 2026 | $424,937 | $-48,909 | 11.5% | $-383,420 | 90.2% | **$-7,392** |
| Mar 2026 | $611,668 | $-29,511 | 4.8% | $-23,794 | 3.9% | **$558,362** |
| Apr 2026 | $531,264 | $-23,381 | 4.4% | $-24,845 | 4.7% | **$483,038** |
| May 2026 | $286,104 | $-22,258 | 7.8% | $-17,603 | 6.2% | **$246,243** |
| Jun 2026 | $198,782 | $-11,323 | 5.7% | $-15,255 | 7.7% | **$172,204** |
| Jul 2026 | $150,917 | $-11,467 | 7.6% | $-12,722 | 8.4% | **$126,729** |
| Aug 2026 | $100,991 | $-4,806 | 4.8% | $-8,248 | 8.2% | **$87,938** |
| **13-mo total** | **$3,817,328** | **$-411,877** | **10.8%** | **$-521,426** | **13.7%** | **$2,884,025** |
### ✅ FINDING 1 — ~~February 2026 catastrophe~~ **SOLVED & RETRACTED 2026-08-26**

> **A single Lowe's dealer order explains it.** $496,320 gross booked Dec 2025 at a 30% dealer+rep
> discount ($347,424 net), **fully reversed Feb 2026.** February's real net sales were **+$340,032**
> with an 8.5% return rate — a strong month, not a disaster.
> **Full detail: `2026-08-26-discount-audit.md`.** Original text kept below for the record.

#### ~~Original finding (superseded)~~ — February 2026: $383,420 in returns, 90.2% of the month reversed.

February had **$424,937 in gross sales** and **−$383,420 in returns**, landing net sales at
**−$7,392** — a negative month in the middle of peak crawfish season.

Normal monthly returns run **$2,500–$25,000**. February was **15–150× normal.** This is not organic
return behavior. Candidate explanations, in rough order of likelihood:
- A large commercial / dealer / wholesale order cancelled or reversed
- A chargeback or payment-processor event
- An accounting correction (duplicate or test orders voided)
- Order data migrated or restated

**$383,420 is ~13% of annual revenue.** This is the single largest financial event in the dataset and
it must be explained before any performance conclusion is drawn about 2026. **Owner: Evan → Jay.**

### ✅ FINDING 2 — ~~December over-discounting~~ **RETRACTED 2026-08-26**

> **Same Lowe's order.** Strip it out and December's consumer business was **$206,874 gross with
> $20,825 of discounts — a normal 10.1% rate** — and **$178,025 net, not $525,449.** There was no
> promo problem. December is a *softer* month than the raw numbers suggest, not a bigger one.
> **Full detail: `2026-08-26-discount-audit.md`.** Original text kept below for the record.

#### ~~Original finding (superseded)~~ — December 2025: $703K gross, $169,721 of discounts (24.1%)

December was the **largest gross-sales month of the year** — bigger than March. But nearly a quarter
of it was discounted away.

At the ~44.5% gross margin measured in August, **a 24.1% discount rate takes gross margin to roughly
20%** — before ad spend, before overhead. That consumes Jay's entire 20% net target in a single month.

Every other month runs 4.4%–16.6%. December is a clear outlier. **Was the December promotion
profitable?** Nobody currently knows. It should be answered before the same promo runs in Dec 2026 —
this is the highest-value open question in the business right now.

### 🟠 FINDING 3 — Returns are trending up

| Mar | Apr | May | Jun | Jul | Aug |
|---|---|---|---|---|---|
| 3.9% | 4.7% | 6.2% | 7.7% | 8.4% | 8.2% |

Return rate has roughly **doubled since March**. On heavy aluminum shipped LTL, freight damage is the
obvious suspect — but it is unconfirmed. At 8% of gross, this is a real margin leak and it is getting
worse, not better. **Needs a root-cause look at return reasons.**

### 🟢 FINDING 4 — August is up **4.4× year over year**

**Aug 2025: $19,763 → Aug 2026: $87,938** (and August isn't finished). The historically deadest month
of the year has more than quadrupled.

**The year-round strategy is already working — it just hasn't been named or resourced.** This is the
strongest existing evidence for Evan's mandate, and it deserves to be pointed at deliberately rather
than treated as noise.

---

## 2. Revenue by product — trailing 12 months

| # | Product | Net sales | % of total |
|---|---|---|---|
| 1 | **120 QT Powered Seafood/Crawfish Cooker** | **$492,671** | 17.1% |
| 2 | **18 QT Fish Fryer / Brazier Powered Pot** | **$293,194** | 10.2% |
| 3 | **Boil Boss Triple Jet Burner** | **$211,351** | 7.3% |
| 4 | 100 QT Powered Seafood Cooker | $165,835 | 5.8% |
| 5 | 60 Gallon Commercial Seafood Cooker | $163,772 | 5.7% |
| 6 | 40 Gal / 160 QT Flip Basket Cooker | $143,494 | 5.0% |
| 7 | 30 QT Turkey Fryer Powered Pot | $124,665 | 4.3% |
| 8 | Performance Boiling Pots (60–120 QT) | $120,781 | 4.2% |
| 9 | 80 QT Powered Seafood Cooker | $119,085 | 4.1% |
| 10 | Boil Boss Cooling Ring | $91,252 | 3.2% |
| 11 | Boil Boss Thermo Paddle | $88,490 | 3.1% |
| 12 | Crawcuzzi Automatic Crawfish Cleaner | $72,745 | 2.5% |
| 13 | 60 QT Powered Cooker | $65,437 | 2.3% |
| 14 | Cooker Leg Extensions | $55,332 | 1.9% |
| 15 | 100 Gallon Commercial Boiler | $44,619 | 1.5% |
| 16 | *(untitled / "None")* | $43,865 | 1.5% |
| 17 | 60 QT Dual Turkey Fryer | $39,580 | 1.4% |
| 18 | Cajun Cleaner | $36,670 | 1.3% |
| 19 | 120 QT Performance Seafood Pot | $36,631 | 1.3% |
| 20 | 140 Gallon Commercial Boiler | $36,260 | 1.3% |
| 21 | Crawfish Serving Trough | $28,284 | 1.0% |
| 22 | 4-Way 20 QT Fryer | $28,130 | 1.0% |
| 23 | 120 Gallon Commercial Boiler | $24,615 | 0.9% |

**Commercial line (60/100/120/140 gal + Crawcuzzi) ≈ $342,011 ≈ 11.9% of revenue** — from a handful
of orders. Currently Tier 3 "inbound only," which is worth revisiting given the dollars.

### ⭐ FINDING 5 — The 18 QT Fish Fryer is the year-round engine, and it's already proven

- **#2 product for the year at $293,194.**
- **#1 product in August at $17,312** — nearly **2× the 120 QT flagship** ($8,628).

In the off-season the fryer *is* the business. Evan's instinct to push the fryer line year-round isn't
a hypothesis — **it's already happening and nobody named it.**

This is also the SKU 44 influencers were seeded with, and the one Garrett just shot a video on.
Everything is pointing the same direction.

---

## 3. Gross margin by product — **August 2026 only**

> ⚠️ **Why August only:** cost-per-item coverage was 20–45% before August 2026 and **86.8% in August.**
> Trailing-12-month margins are unusable. August is the first honest read.
> Coverage is still not 100% — margins below are computed on the cost-recorded portion only.

| Product | Aug net sales | Gross margin* | Break-even ROAS** |
|---|---|---|---|
| TJB Centering Brackets | $761 | **60.6%** | 1.7 |
| Boil Boss Cooling Ring | $1,335 | **54.1%** | 2.0 |
| HPC Heavy Duty Aluminum Paddle | $663 | **50.0%** | 2.1 |
| 60 QT Cooker — SCRATCH & DENT | $717 | **48.7%** | 2.2 |
| 80 QT Powered Seafood Cooker | $4,352 | **48.7%** | 2.2 |
| Steamer Basket Inserts | $671 | **48.6%** | 2.2 |
| 18 QT Fish Fryer / Brazier Pot | $1,020 | **48.4%** | 2.2 |
| Boil Boss Thermo Paddle | $1,561 | **48.2%** | 2.2 |
| 120 Quart Powered Seafood/Crawfish Cooker | $8,628 | **47.5%** | 2.2 |
| 100 QT Powered Seafood Cooker | $2,680 | **47.2%** | 2.3 |
| 60 QT Dual Turkey Fryer | $1,420 | **46.1%** | 2.3 |
| 40 QT Powered Sauce Cooker | $631 | **46.1%** | 2.3 |
| 18 QT Fish Fryer / Brazier Powered Pot | $17,312 | **46.0%** | 2.3 |
| 4-Way 20 QT Fryer | $1,925 | **45.9%** | 2.3 |
| Boil Boss Triple Jet Burner | $11,624 | **44.1%** | 2.4 |
| Performance Boiling Pots (60–120QT) | $6,572 | **43.0%** | 2.5 |
| Cooker Leg Extensions | $4,909 | **40.0%** | 2.7 |
| 30 QT Turkey Fryer Powered Pot | $4,335 | **39.7%** | 2.7 |
| Crawfish Serving Trough | $1,118 | **39.2%** | 2.8 |
| 60 QT Performance Seafood/Stock Pot | $672 | **39.0%** | 2.8 |
| Navimow Mow Gate | $900 | **30.0%** | 3.7 |
| 60 QT Powered Cooker | $2,028 | **28.9%** | 3.9 |
| Navimow X430 Robotic Mower | $2,999 | **25.7%** | 4.4 |
\* Gross margin on the cost-recorded portion. \*\* Break-even ROAS = 1 ÷ (gross margin − 3% payment processing). Freight excluded because **the customer pays it.**

**Blended August: $87,938 net sales · $42,384 COGS · $33,922 gross profit · 44.5% margin.**

### 🎯 FINDING 6 — **Break-even ROAS is ~2.4 blended.** Use 2.2–2.5 for core SKUs.

Margins are healthier than feared. Core cookers, fryers, and Boil Boss accessories all run
**43–49%**. Anything above ~2.4 ROAS on a core SKU makes money.

### Margin outliers worth acting on
| Finding | Why it matters |
|---|---|
| **Scratch & Dent 60 QT = 48.7%** | Clearance carries **full margin.** It is not a margin sacrifice — it's a legitimate low-price acquisition tool. Use it deliberately. |
| **Boil Boss Cooling Ring = 54.1%**, Centering Brackets = 60.6% | Highest-margin items in the catalog. Every attach unit is near-pure profit. **Strongest case yet for accessory cross-sell on every pot PDP.** |
| **60 QT Powered Cooker = 28.9%** | ✅ **SOLVED 2026-08-26 — not miscosted.** List margin is **47.8%** ($268.63 cost on $515). The realized margin is low because it's discounted at **21.8%** — ~5× the 18 QT and ~20× the 120 QT — via wholesale, damaged-pot write-offs, and stacked consumer codes. See `2026-08-26-discount-audit.md`. |
| **30 QT Turkey Fryer = 39.7%** | Below the cooker average. Matters because it's the November hero. |
| **Navimow 25.7–30%** | Confirms thin resale margins. Correctly excluded from marketing. |

---

## 4. What this changes

1. **Break-even ROAS ≈ 2.4.** Every paid decision now has a real threshold.
2. **The 18 QT fryer is the off-season growth engine** — proven, not theoretical.
3. **February's $383K reversal must be explained** before any 2026 read is trustworthy.
4. **December's 24% discount rate must be evaluated** before repeating it.
5. **Returns are doubling** — a quiet, worsening margin leak.
6. **Accessory attach is the cheapest margin in the business** (Cooling Ring 54%, brackets 61%).
7. **60 QT Powered needs a costing/pricing review** before a dollar goes behind it.

## 5. Still open
- Feb 2026 return event — cause? → **Evan / Jay**
- Dec 2025 promo — was it profitable? → **ROUX can model once the promo terms are known**
- Return reasons / freight damage rate → **Evan**
- Cost-per-item is still missing on ~13% of August sales → **Evan** (ROUX will not edit Shopify)
- Meta + Google actuals, split at the 2026-07-12 vendor handover → **ROUX, next pull**


---

## Related

[Board](../../../my-desk%20%28now%29/BOARD.md) · [metrics-and-goals](../../../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [what-we-sell](../../../my-business%20%28context%29/what-we-sell.md)
