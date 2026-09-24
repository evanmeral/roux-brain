# 30 QT fryer: CAC ceiling
**2026-09-24 · Beau · approved via Evan's proposal yes (`p-2026-09-24-30qt-ceiling`)**

Read-only throughout. Nothing was written to Meta, Shopify or Google. Ceiling arithmetic is Beau's,
derived from the sourced inputs below. **None of it is a Shopify number and none of it is an actual CAC.**

---

## The call

**30 QT Powered: incremental ceiling $105.06 per new customer, $96–$105 range. Scale gate on Meta's count $38.23.**

- **$105.06** is the order-level figure, built exactly like 120 QT Powered $195.34 and Performance $189.23.
  It's the top of the range and the figure the no-sale kill rule uses.
- **$95.58** is one $462.50 turkey kit (pot, lid, basket, steamer rack, turkey rack), the only 30 QT variant
  actually in stock. That's the bottom of the range and the one to scale on.
- **Kill lines (no-sale rule):** **$315.18** (3×) with 0 Shopify-tagged new customers · **$210.12** (2×) if Meta
  also shows 0 purchases.
- **Today neither 30 QT ad is close.** `Video_Jay 30qt (turkey) Fryer Demo` is at $133.02 against $315.18.
  `Heavy Duty Heat.30qt` can't fire at all, because it has 2 Meta purchases and isn't taggable.

This is the same bar as the 18 QT in proportion. The 30 QT leaves about 21% of its order net for the ad,
against 20% held back for the target. The dollars are just a bit higher.

---

## 1. Method (same as the existing ceilings)

Source of the method: [overhead-method-options](2026-09-10-overhead-method-options.md) §3. It's the
incremental rule, adopted by Jay 2026-09-14 and written into `hpc-standing-rules.md` 2026-09-16.

```
Variable     = 3.9% × net + $3.30        (card 2.9% + $0.30 · packaging $3 · warranty 1%; v3 assumptions, not measured)
Break-even   = net/order − landed COGS − variable
CAC ceiling  = break-even − 20% × net     (no overhead charge in the per-ad ceiling)
Scale gate   = 40% of the ceiling, on Meta's own purchase count (a judgment, §6b)
```

**On the margin.** The ceiling runs on landed cost per product, not on a blended margin. So neither the
46% nor the 44.5% is anywhere in it. The ~40.6% real margin (Jay, 2026-09-10) is the whole-business figure.
Per-product ceilings "run on landed cost per product" (decisions.md, 2026-09-10) and are unaffected by it.
Cross-check: 30 QT contribution before ads comes out at **40.7–42.3%** of net per variant, and **41.1%** on the
order mean. That sits right on the 40.6% line, not above it the way a 46% model would.

---

## 2. Inputs

| Input | Value | Source |
|---|---|---|
| Order-level net, landed COGS, GP, Jun–Aug 2026 | 19 orders · net $498.41 (median $462.50) · COGS $270.93 · GP $227.48 · 52.6% attach · 42.1% discounted | Finn, Pull A, [order-level-pulls](2026-09-10-order-level-pulls.md) §3, 30 QT anchor `PW30*` |
| Full-price subset, Jun–Aug | 11 orders · net $496.77 · GP $231.74 | Same |
| 12-month 30 QT basis | **Not used.** 288 units are a deleted variant, costed at today's cost against the old price. Its mean GP falls below the floor | Same, §7 data problem 1 |
| Prices, 6 live variants | $395 · $442.50 · $462.50 (Turkey Fryer listing) · $435 · $455 · $475 (Basket listing) | `what-we-sell.md` §1B. **Matches Shopify** (connector `productVariants`, read 2026-09-24) |
| Landed cost (`unitCost`) | $217.62 · $241.94 · $253.08 · $230.78 · $243.00 · $253.08 | Shopify connector, read 2026-09-24. **Matches** [landed-cost-by-variant](2026-09-10-landed-cost-by-variant.md) rows 18–23 exactly |
| Stock, Turkey Fryer listing | $395 variant: 0 · $442.50: −2 · **$462.50: 61** | Shopify `search_products`, 2026-09-24 |
| Stock, Basket listing | 0 · 0 · −1 | Same |
| Target | 20% net of net revenue | Jay, by text, 2026-09-09 |

⚠️ **The $462.50 kit carries two prices.** The same SKU `PW30-VLV075-TFR-B-SBI` is $462.50 on one listing and
$475 on the other (`what-we-sell.md`, still unresolved). The ads land on the $462.50 listing.

---

## 3. The table

*All figures derived by Beau from §2. Variable is rounded to cents before subtracting, as in v3.*

| Basis | Net | − COGS | − Var | **Break-even** | − 20% | **Ceiling** | Gate (40%) | 2× | 3× |
|---|---|---|---|---|---|---|---|---|---|
| **Order mean, Jun–Aug (19 orders)** | 498.41 | 270.93 | 22.74 | **204.74** | 99.68 | **105.06** | 42.02 | 210.12 | **315.18** |
| Order mean, full-price only (11) | 496.77 | 265.03 | 22.67 | 209.07 | 99.35 | 109.71 | 43.88 | | |
| Turkey Fryer, rack only $395 *(out of stock)* | 395.00 | 217.62 | 18.71 | 158.67 | 79.00 | 79.67 | 31.87 | | |
| Turkey Fryer, rack + basket $442.50 *(−2)* | 442.50 | 241.94 | 20.56 | 180.00 | 88.50 | 91.50 | 36.60 | | |
| **Turkey Fryer, full kit $462.50 (in stock)** | 462.50 | 253.08 | 21.34 | **188.08** | 92.50 | **95.58** | **38.23** | | |
| Basket listing, $435 | 435.00 | 230.78 | 20.27 | 183.95 | 87.00 | 96.95 | 38.78 | | |
| Basket listing, $455 | 455.00 | 243.00 | 21.05 | 190.95 | 91.00 | 99.95 | 39.98 | | |
| Basket listing, full kit $475 | 475.00 | 253.08 | 21.82 | 200.10 | 95.00 | 105.10 | 42.04 | | |

**Second-source check on the order mean:** the Turkey Fry Kit plan independently put the one-bird kit
(30 QT + thermometer + Wind Shield + skimmer) at an **$104.47** incremental ceiling, gate $41.79
([bundles plan](../2026-09-11-tailgate-thanksgiving-bundles-plan.md) §4.2). That's within $0.59 of $105.06.

**Beau, on the range:**
- **Why $105.06 is the headline.** It's the method every other ceiling on the kill table uses (the Jun–Aug
  order mean). The 120 QT, Performance and Platinum figures are all built that way.
- **Why $95.58 is the one to scale on.** The $395 base is out of stock and the $442.50 is oversold, so a buyer
  the ad brings today almost certainly buys the $462.50 kit alone, or the kit with attach items. The mean is
  lifted by the 52.6% of orders that add something. Same logic as the 18 QT's "scale on ~$73".
- **The sample is thin.** 19 orders, the same caution as the Platinum's 17. Rebuild the ceiling on a Sept–Nov
  pull once turkey season gives it volume.
- **The low-ticket cap applies.** The 30 QT is inside the 25%-of-budget cap on small lines, in §6a of
  [overhead-method-options](2026-09-10-overhead-method-options.md).

---

## 4. The two live ads: what they sell, and the kill rule

| Ad · ID | Lands on / sells | Taggable? | Spend Sept 1–23 | Meta purch. | Tagged new | Rule that applies | Line | Status |
|---|---|---|---|---|---|---|---|---|
| `Video_Jay 30qt (turkey) Fryer Demo` `6810865162787` (BPM) | `/products/30-qt-turkey-fryer-pot-with-drain-valve-lid-turkey-rack`, so $395 / $442.50 / **$462.50** | **Yes.** 102 Shopify sessions carry this ad ID in `utm_content` (100 with BPM campaign `6772105419387`), Sept 1–24 | $133.02 | 6 | 0 | **3×** (Meta > 0) | **$315.18** | ok, $182.16 to go |
| `IMG_Heavy Duty Heat.30qt ad copy` `6845666149587` (BPM) | **Unconfirmed.** Its creative is named `{{product.name}}` (a SHARE post), and the connector returns no link URL | **No.** 0 Shopify sessions carry this ad ID, Sept 1–24 | $11.77 | 2 | n/a | **Meta count alone:** 2× with 0 Meta purchases | $210.12 | ok. **Can't fire while Meta shows 2** |
| `Video_ 30qt (turkey) Fryer Time Lapse` `6772110395187` | 30 QT | n/a | $0.00 | 0 | 0 | none | n/a | not delivering |

**Sources:** spend, Meta purchases and tagged-new counts are from `pulse/kill-lines.json` (Finn, Meta connector +
Shopify, read 2026-09-24 10:20 CT, window Sept 1–23). Landing pages and taggability are from Beau's ShopifyQL
`sessions` reads, 2026-09-24 (`utm_content` × `landing_page_path`, Sept 1–today). Creative type is from the
Meta connector's `ads_get_creatives`, 2026-09-24.

**What the kill rule says (Beau):**
- **The rule applies in full to `Video_Jay 30qt`.** It's tagged, it lands on the 30 QT Turkey Fryer page, and
  it has 0 tagged new customers on 102 tagged sessions. **At about $8/day** it takes roughly three weeks to
  reach $315.18. That's around mid-October, inside turkey season, when it should be selling if it ever will.
  The ~$8/day comes from Finn's 09-22 review: $57.41 over Sept 15–21.
- **Meta and Shopify disagree sharply on it.** Meta shows $22.17 per purchase ($133.02 ÷ 6), under the $38.23
  gate. Shopify shows zero. **Don't scale on the Meta number.** The gate is a condition for scaling, not a reason to.
- **`Heavy Duty Heat` is invisible to Shopify.** Two sessions carry nearby IDs on the turkey fryer page
  (`6845666433987`, `6845666433387`). They may be twins of this ad, the way `6772116255587` turned out to be for
  the UGC ad, but **that's unconfirmed**. Until Finn maps it, the ad is read on Meta's count alone. At $0.39/day it
  doesn't matter much either way.
- **The kit kill line is a separate line.** PLAN.md's `Turkey kit ad 30 QT > $198` is the turkey kit ad's own
  line, for when the kit goes live Oct 1. This ceiling is for ads that sell the 30 QT pot itself.

---

## 5. What changed

- The 30 QT row goes onto PLAN.md's ceiling list, which the Thursday task reads to write `pulse/kill-lines.json`.
- The same row goes into `my-skills/hpc-campaign-checkpoint/campaigns.md` under BPM_TOF_Manual.
- A decision row goes into `decisions.md`.
- `kill-lines.json` itself isn't touched. The next Thursday run fills the two "not read" 30 QT rows.
