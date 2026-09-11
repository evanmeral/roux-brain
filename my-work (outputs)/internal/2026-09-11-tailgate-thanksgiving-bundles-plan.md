# Tailgate + Thanksgiving bundles: the plan
**2026-09-11 · ROUX · for Evan. Approver: Jay. Revised the same day after Jay's answers and Evan's kit changes.**

Read-only throughout. Nothing was written to Shopify, Meta or Google. **Evan builds the kits** (Jay,
2026-09-11). Changing discount codes and publishing ads are also Evan's click.
Jay's version: [2026-09-11-bundles-for-jay.md](2026-09-11-bundles-for-jay.md) · Code to-do:
[2026-09-11-bundle-discount-code-fix.md](2026-09-11-bundle-discount-code-fix.md) · Board item: Now #3.

---

## Status after Jay's answers (2026-09-11)

| Item | Status |
|---|---|
| Turkey kit, 30 QT, **$469** | ✅ **Approved** (Jay) |
| Tailgate kit, **$465** | ✅ **Approved** (Jay via Evan, 2026-09-11), on Evan's new contents: fryer, legs, 5" thermometer, skimmer |
| 60 QT two-bird turkey kit, **$519** | ✅ **Approved** (Jay via Evan, 2026-09-11) |
| Codes | ✅ **Every code skips bundles. Military and first responder are the one exception** (Jay). To-do → [code fix](2026-09-11-bundle-discount-code-fix.md) |
| Code fix scope | ⚠️ Bigger than a settings change. Almost every code in use (HIGH10, HIGH15, SMS25, TEXT25, BOIL10, SPROM…) is an **"amount off order"** discount, which Shopify can't limit to a collection, so those get **recreated**. Several collection-scoped codes (HPC10, Stale30, KLUD40, NICESPICE) already reach bundles, and the new kits would inherit them via their `Tailgater` and `Turkey` tags. **Fix before any kit goes live** |
| Welcome10 on bundles? | ✅ **Stays off bundles** (Evan, 2026-09-11; ROUX's recommendation, section 5). Military and first responder stay allowed |
| Discount inventory | Every discount in Shopify, with a recommendation for each → [2026-09-11-discount-code-inventory.csv](reports/2026-09-11-discount-code-inventory.csv) |
| 30 QT price ($345 last season → $442.50) | ✅ Deliberate (Jay). Last season it sold only as the full kit; now it comes in configurations |
| Ship cutoff | ✅ **Mon Nov 23, 2026**, 3 days before Thanksgiving morning (Jay) |
| Kits in season only? | ✅ **Evergreen** (Jay). Kits stay live while they improve margin. Only the seasonal ad push stops at the cutoff |
| Who builds | ✅ **Evan** (Jay) |
| 7 draft bundle orders at 100% off | ✅ Influencer seeding (Jay). **No action.** Draft orders were already outside every count in this plan |
| Q6 · early-Nov 2025 promo? | **Open** |
| Q7 · fix Platinum's compare-at? | **Open** |
| Q9 · adopt the incremental rule? | **Open** |

---

## The kits

| | **Tailgate: Stand-Up Fry Kit** | **Turkey Fry Kit, 30 QT** | **Turkey Fry Kit, 60 QT two-bird** |
|---|---|---|---|
| Contents | 18 QT Powered fryer (valve + basket) · Leg Extensions · **5" fry thermometer** · 20" skimmer | 30 QT Turkey Fryer Powered pot (rack + basket) · **12" fry thermometer** · Wind Shield · 20" skimmer | 60 QT Dual Turkey Fryer (3/4" valve) · 12" fry thermometer · Wind Shield · 20" skimmer |
| Parts at list | $484.98 | $492.48 | $544.98 |
| **Price · saving** | **$465 · $19.98** ✅ | **$469 · $23.48** ✅ | **$519 · $25.98** ✅ |
| Landed cost | $236.38 | $249.14 | $263.62 |
| Gross profit: kit vs hero alone | $228.62 vs $157.95 | $219.86 vs $200.56 | $255.38 vs $238.58 |
| Contribution before ads | $207.18 (44.6%) | $198.27 (42.3%) | $231.84 (44.7%) |
| Incremental ceiling · gate | $114.18 · $45.67 | $104.47 · $41.79 | $128.04 · $51.22 |
| Per-order ceiling (Jay's method) | +$16.69 (hero alone −$24.10) | +$6.98 (hero −$5.99) | +$30.55 (hero +$19.48) |
| Live · seasonal ad push | Sep 25 · through the holidays, then Lent | Oct 1 · **ends Nov 23** | Oct 1 · **ends Nov 23** |

*Prices and landed costs: live Shopify, read 2026-09-11. Ceilings derived by ROUX (section 1). Kits are evergreen.*

**The design hasn't changed:** the hero stays at full price, and small high-margin accessories pay for the
saving. That's the opposite of 30%-off legs ([v3 §6c](reports/2026-09-10-cac-ceilings-v3.md)).

---

## 1. Inputs and method

| Input | Source |
|---|---|
| Price and landed cost (`unitCost`) per component | Shopify Admin GraphQL, read-only, 2026-09-11. Matches [landed-cost-by-variant](reports/2026-09-10-landed-cost-by-variant.md). `unitCost` is landed cost (Jay, 2026-09-10) |
| Fitment | **Evan, 2026-09-11:** 5" thermometer for the 18 QT (the 12" doesn't fit it well). No Wind Shield on a fryer standing on leg extensions, because the shield is for a pot on the ground. 12" thermometer for the turkey pot. Legs PDP: "18 Quart Fryers, 40 Qt Sauce Pots, and 4-Way Fryers ONLY". Wind Shield PDP: powered cookers 60 QT or smaller. 60 QT Dual PDP: ships with a 6" banjo burner and a dual rack |
| Buyer baskets | Shopify `ordersCount` by SKU, 2026-09-11, with Finn's Pull A filter. Controls with a made-up SKU returned 0 |
| Codes | Shopify `codeDiscountNodeByCode` and `codeDiscountNodes`, 2026-09-11 |
| Bundle orders | Every Triple Jet order, Jun 1–Sep 10 2026, with line-item groups and discount allocations (Shopify) |

**Assumptions** (v3): card fees 2.9% + $0.30 · packaging $3 · warranty 1%. Variable = 3.9% × net + $3.30.
Refunds not modeled.

```
Contribution before ads = net − landed cost − variable
Incremental ceiling     = contribution − 20% × net              (ROUX's rule; Jay's decision still open, Q9)
Gate on Meta's count    = 40% × incremental ceiling
Per-order ceiling       = contribution − $97.49 − 20% × net     (Jay's approved method)
```
**Contribution is not net profit.** Overhead ($49,550/mo, Jay) and the 20% target are checked monthly on the
whole business, against the **real margin of ~40.6%** (derived from Jay's P&L). That 40.6% is a benchmark
only. The 46% booked margin and the 44.5% August margin are not used.

---

## 2. The existing bundles, measured (unchanged)

- **Platinum** (created 2025-12-31) and **Ultimate** (2026-02-02) are native bundles. Both were last
  published 2026-07-13 *(Shopify)*.
- **Value** *(Pull A, Jun–Aug)*: Platinum 17 orders at $434.50 gross profit per order; Ultimate 48 at $458.12.
  That's the highest gross profit per order of any anchor.
- **They carry the main push:** 49% of Triple Jet orders over 12 months came through a bundle, and 61% in Jun–Aug *(derived from Pull A)*.
- **Code stacking, Jun 1–Sep 10:**
  - 33 of 69 bundle orders had a discount land on bundle lines, **$2,000.20** in total *(Shopify)*.
  - The tally matches Pull A's discounted shares exactly (Platinum 8/17, Ultimate 25/48).
  - **11 of those 33 used military or first-responder codes ($533.99), which stay allowed under Jay's rule.**
    21 used other codes ($1,416.22), and those are what the fix blocks. One (#16307, $49.99) had no code, so
    code settings won't touch it.
- **Not measurable:** whether bundles created orders or repackaged them. There's no before-and-after.
- **Platinum's compare-at is $955 on all 16 variants** (Q7, open).

---

## 3. Tailgate: Stand-Up Fry Kit (revised)

### 3.1 Contents (Evan's fitment)

| Component | SKU | List | Landed |
|---|---|---|---|
| 18 QT Fish Fryer / Brazier Powered Pot, 1/4" Valve / With Basket | `PWFRBR-VLV025B` | $340.00 | $182.05 |
| Cooker Leg Extensions for Outdoor Gas Cookers | `LegExtensions` | $119.00 | $48.90 |
| Stainless Steel Deep Fryer Thermometer, **5 inch** | `HP-5in-Therm` | $15.99 | $1.88 |
| 20" Heavy Duty Chrome Plated Wire Mesh Skimmer | `SC-7R` | $9.99 | $3.55 |
| **Total** | proposed kit SKU `KIT-18FRY-LEGS` | **$484.98** | **$236.38** |

*Removed: the 12" thermometer (the 5" fits the 18 QT) and the Wind Shield (it's for a pot on the ground).
Shopify agrees on the thermometer: 18 of 221 Jun–Aug fryer orders bought the 5" and 8 bought the 12".*

### 3.2 Price: $479 no longer works. Recommend $465.

| Price | Saving | Gross profit | Contribution | Incremental ceiling | Per-order |
|---|---|---|---|---|---|
| $479 (Jay's OK, old contents) | **$5.98 (1.2%)** | 242.62 | 220.64 | 124.84 | 27.35 |
| $469 | $15.98 | 232.62 | 211.03 | 117.23 | 19.74 |
| **$465** | **$19.98 (4.1%)** | **228.62** | **207.18 (44.6%)** | **114.18** | **16.69** |
| Hero alone, $340 | — | 157.95 | 141.39 | 73.39 | −24.10 |

- **At $479 the saving isn't real.** $5.98 on a $485 basket isn't a reason to buy a kit.
- **Floor: $464.43.** Below that the kit earns less than fryer + legs at full price, which 37% of fryer buyers
  already choose. **$465 is the lowest price above the floor**, and it makes the saving about $20.
- **Against what buyers do today** *(Shopify, 221 fryer orders Jun–Aug)*:

  | What they bought | Orders | Kit at $465 vs that basket |
  |---|---|---|
  | Fryer, no legs | 139 | +$70.67 |
  | Fryer + legs | 57 | +$0.57 |
  | Fryer + legs + skimmer | 11 | −$5.87 |
  | Fryer + legs + thermometer | 7 | −$13.54 |
  | All four pieces | 7 | −$19.98 |

  **Blended: +$43.24 per kit order** *(derived; assumes kit buyers come from today's mix)*.
- ✅ **Jay approved $465** (via Evan, 2026-09-11).

### 3.3 Timing, merchandising, ads
- **Live Fri Sep 25.** Evergreen: tailgate creative now, gifting from Nov 15 (Dec 2025 had 90 fryer orders;
  cause untested), and Lent fish fry from Feb 1 2027. **One product, seasonal creative, no rebuild.**
- **Shopify (Evan):**
  - Native bundle with a line-item group, so Finn can count it.
  - Compare-at exactly $484.98 (don't inherit the fryer's $313 compare-at).
  - Tags `Bundle`, `Sale-NoDiscount`, `Tailgater`, `no-wholesale`.
  - Collections `tailgater-tools`, `fryers`, `product-bundles`.
- **The 18 QT landing page** (the IW `hpc-dark-evergreen` destination): add a kit block **after Finn's first IW read (~Sep 14)**. Nova builds it, Maya writes it.
- **Meta (Maya's copy, Evan's click):**
  - A **new** ad in `18qt-TOF-Prospecting` pointed at the kit. Inside its $50/day and the 25% low-ticket cap. No new budget.
  - Angles: frying standing up (the legs put it at about 41", per the legs PDP) · **350° in under 5 minutes**
    (18 QT, 4-Way and 40 QT only; qualify it) · fish, fries, wings, okra.
  - Never crawfish with a fryer. Warranty only with both qualifiers.
  - "Built in Louisiana" and "Hand-welded in Louisiana" are the approved claims. ⛔ No "Made in USA" until the pots are made in-house (Evan, 2026-09-11).
- **Ad ceiling in practice:** for `18qt-TOF`'s $40.56 CPP (Meta's count) to clear the 40% gate, **~69% of its
  orders would have to be kits** *(derived)*. The kit does not reopen the 18 QT ladder on its own. Hold ads to
  the hero's $73.39 ceiling until Finn reads kit share from tagged orders.
- **Measurement (Finn, verdict Fri Nov 6):**
  - Track kit share of 18 QT orders, and gross profit per 18 QT order against $210.18 (Pull A, Jun–Aug) and the same weeks of 2025.
  - Discounts on kit lines should be military/responder only.
  - **Keep** at ≥ 15% kit share with gross profit per order ≥ $210.18. **Rethink** under 10% *(ROUX's thresholds)*.

---

## 4. Thanksgiving: Turkey Fry Kit (30 QT approved, 60 QT two-bird added)

### 4.1 Evidence (unchanged)
- Turkey-fryer orders, 2025 *(Shopify)*: Oct 1–15: 16 · Oct 16–31: 57 · **Nov 1–15: 164** · Nov 16–26: 49 · Nov 27–30: 8 · Dec: 13.
- Oct–Nov total: 294 (235 were 30 QT and 59 were 60 QT Dual).
- Add-ons: thermometer 25.5% · Wind Shield 11.9% · skimmer 1.0%.
- **Why Nov 1–15 peaked is still unknown (Q6, open).**
- The $345 → $442.50 move on the 30 QT is deliberate (Jay). Measure gross profit dollars against last season, not units.

### 4.2 The 30 QT kit ✅ $469

| Component | SKU | List | Landed |
|---|---|---|---|
| 30 Qt Turkey Fryer Powered Pot, With Turkey Fryer Rack & Basket | `PW30-VLV075-TFR-B` | $442.50 | $241.94 |
| Stainless Steel Deep Fryer Thermometer, **12 inch** (confirmed by Evan) | `HP-12in-Therm` | $18.99 | $2.15 |
| Wind Shield | `ACC-Windshield` | $21.00 | $1.50 |
| 20" Heavy Duty Chrome Plated Wire Mesh Skimmer | `SC-7R` | $9.99 | $3.55 |
| **Total** | proposed kit SKU `KIT-30TURKEY` | **$492.48** | **$249.14** |

- Gross profit $219.86 · contribution $198.27 (42.3%) · incremental ceiling $104.47 (gate $41.79) · per-order +$6.98.
- **Against last season's baskets:** +$19.30 vs pot alone (71% of orders) · +$2.46 vs pot + thermometer ·
  −$0.20 vs pot + Wind Shield · −$17.04 vs pot + both (9%). **Blended +$12.68 per kit order.**
- Floor ~$467, so don't go lower.

### 4.3 The 60 QT two-bird kit ✅ $519 (approved by Jay via Evan, 2026-09-11)

| Component | SKU | List | Landed |
|---|---|---|---|
| 60 Qt Dual Turkey Fryer Pot With Drain Valve / Lid & Turkey Rack, 3/4" Gate Valve | `PT60-VLV075-TFR` | $495.00 | $256.42 |
| Stainless Steel Deep Fryer Thermometer, 12 inch | `HP-12in-Therm` | $18.99 | $2.15 |
| Wind Shield | `ACC-Windshield` | $21.00 | $1.50 |
| 20" Heavy Duty Chrome Plated Wire Mesh Skimmer | `SC-7R` | $9.99 | $3.55 |
| **Total** | proposed kit SKU `KIT-60TURKEY` | **$544.98** | **$263.62** |

| Basis | Net | Gross profit | Contribution | Incremental ceiling · gate | Per-order |
|---|---|---|---|---|---|
| Hero alone, $495 | 495.00 | 238.58 | 215.97 (43.6%) | 116.97 · 46.79 | +19.48 |
| **Kit at $519 (save $25.98)** | **519.00** | **255.38** | **231.84 (44.7%)** | **128.04 · 51.22** | **+30.55** |

- **$519 sits exactly at the floor** ($519.04: below it, the kit earns less than pot + thermometer at list). Don't go lower.
- Its PDP says the pot ships with a **dual rack and a 6" banjo burner**, so it's powered and the Wind Shield fits
  (Wind Shield PDP). **The 12" thermometer on the 60 QT is my assumption from Evan's 30 QT call. Evan to confirm.**
- **Build choice (Evan):** make it a second variant on the same Turkey Fry Kit page (30 QT / 60 QT) rather than
  a separate product. One page, one ad destination. Only the 3/4" valve; the 1" valve (+$10) is optional.
- 60 QT Dual was 20% of last season's turkey orders *(Shopify)*.

### 4.4 Timing, merchandising, ads
- **Kit live Thu Oct 1. Seasonal ad push Oct 1 → Mon Nov 23**, the last order date that still arrives by Thanksgiving (Jay).
- **Evergreen after that:** the page stays live, the turkey ads stop, and the gift angle can carry December (13 orders in Dec 2025).
- **Shopify (Evan):**
  - Native bundle with 30 QT and 60 QT variants. Compare-at $492.48 and $544.98.
  - Tags `Bundle`, `Sale-NoDiscount`, `Turkey`, `no-wholesale`.
  - Collections `turkey-frying-pots-cookers`, `fryers`, `product-bundles`.
- **Meta (Maya's copy, Evan's click):**
  - Jay's 30 QT demo ($19.41 cost per purchase on 13 Meta-claimed purchases, `BPM_TOF_Manual`; small sample)
    as a **new** ad in that campaign, pointed at the kit, Oct 1–Nov 23.
  - No new money: $350/day holds. The 30 QT counts toward the 25% low-ticket cap.
  - **350° in under 10 minutes** on the 30 and 60 QT, never the 5-minute stat.
  - "Fry the bird in November, boil and steam in the same pot all year."
  - Keep crawfish out of fryer copy entirely. Warranty only with both qualifiers.
- **Measurement (Finn, verdict Mon Nov 30):**
  - Turkey-fryer gross profit dollars, Oct 1–Nov 23 2026, against the same dates in 2025.
  - Kit share of turkey orders, split 30 and 60 QT.
  - Discounts on kit lines should be military/responder only.

---

## 5. Should Welcome10 apply to bundles for new customers? **ROUX: no. Keep it off.**

**Fact:** Welcome10 is "10% off All Products - Eligible for Discounts · One use per customer" *(Shopify)*. On
order #17368 (Sep 5) it skipped the Ultimate bundle lines. **So today it already doesn't apply to bundles.**

**Kit price, then Welcome10 on top, against landed cost and fees** *(derived; Platinum and Ultimate use the
no-valve variants and each bundle variant's own `unitCost`, as v3 did)*:

| | Price | − Welcome10 | Landed | Gross profit: no code → with Welcome10 | Contribution with Welcome10 | Per-order with Welcome10 | Same pieces bought separately with Welcome10 |
|---|---|---|---|---|---|---|---|
| Tailgate kit | $465.00 | $418.50 | $236.38 | $228.62 → **$182.12** | $162.50 (38.8%) | **−$18.69** | $436.48 · gross profit $200.10 |
| Turkey 30 QT | $469.00 | $422.10 | $249.14 | $219.86 → **$172.96** | $153.20 (36.3%) | **−$28.71** | $443.23 · $194.09 |
| Turkey 60 QT | $519.00 | $467.10 | $263.62 | $255.38 → **$203.48** | $181.96 (39.0%) | **−$8.95** | $490.48 · $226.86 |
| Platinum 80 QT | $837.00 | $753.30 | $468.50 | $368.50 → **$284.80** | $252.12 (33.5%) | +$3.97 | $843.30 · $374.80 |
| Platinum 120 QT | $892.00 | $802.80 | $496.00 | $396.00 → **$306.80** | $272.19 (33.9%) | +$14.14 | $892.80 · $396.80 |
| Ultimate 80 QT | $946.98 | $852.28 | $533.49 | $413.49 → **$318.79** | $282.25 (33.1%) | +$14.31 | $960.28 · $426.79 |
| Ultimate 120 QT | $1,001.98 | $901.78 | $560.99 | $440.99 → **$340.79** | $302.32 (33.5%) | +$24.48 | $1,009.78 · $448.79 |

**Why no:**
1. **A new customer holding Welcome10 already has a better path: the pieces with the code.** For the
   tailgate kit that's $436.48, against the kit at $465.
   - **With Welcome10 off bundles**, whichever way they buy, we earn at least what the no-kit world earns ($200.10).
   - **With it on**, a kit order earns $17.98 less than the same customer buying pieces with the code. Every kit falls below zero on Jay's per-order method.
2. **On Platinum and Ultimate, Welcome10 would stack to roughly 19–20% off** and cut $84–$100 of gross profit
   per order. That drops contribution to ~33–34%, well under the business's ~40.6%.
   - The built-in saving is already about the size of Welcome10: Platinum 120 QT is $892.00 as a bundle and $892.80 as pieces with the code.
   - So new customers lose almost nothing from the exclusion.
3. **The one cost is friction.** A new customer may try the code on a kit and see it refused. Fix it with one
   line on each kit page: the bundle price already includes the discount, and welcome codes work on everything
   else. **Maya writes it. The popup and email that issue Welcome10 are Biljana's**, so she decides whether her
   copy mentions it.

---

## 6. Military / first-responder exception: every bundle still makes money

*(derived; 5% off the kit price)*

| | Net after 5% | Gross profit | Contribution before ads | Incremental ceiling | Per-order (Jay's method) |
|---|---|---|---|---|---|
| Tailgate kit | $441.75 | $205.37 | $184.84 (41.8%) | $96.49 | −$1.00 |
| Turkey 30 QT | $445.55 | $196.41 | $175.73 (39.4%) | $86.62 | −$10.87 |
| Turkey 60 QT | $493.05 | $229.43 | $206.90 (42.0%) | $108.29 | +$10.80 |
| Platinum 80 / 120 QT | $795.15 / $847.40 | $326.65 / $351.40 | $292.34 / $315.05 | $133.31 / $145.57 | +$35.82 / +$48.08 |
| Ultimate 80 / 120 QT | $899.63 / $951.88 | $366.14 / $390.89 | $327.76 / $350.47 | $147.83 / $160.09 | +$50.34 / +$62.60 |

- **Every bundle keeps positive contribution and a positive incremental ceiling after 5%.**
- On Jay's per-order method, the **tailgate kit (−$1.00) and the 30 QT kit (−$10.87)** fall just short of the 20% target for military and responder buyers. They still add profit dollars. **That's the price of the exception, and it's Jay's call.**
- Scale: these codes were **11 of 69 bundle orders** this summer (16%), $533.99 *(Shopify)*.

---

## 7. Forward to Coalition: suggestions, their lane

*Paste-ready for Evan. Their figures are platform-reported and unverified. We judge on Shopify orders.*

> Some suggestions for the tailgating and holiday campaigns. Take them or leave them.
> 1. **Tailgating (18 QT / 30 QT / 60 QT / 100 QT).** An 18 QT fryer kit (fryer, leg extensions, thermometer, skimmer) goes live around Sep 25 and stays up year-round. It could be a good final URL for fryer and tailgate queries.
> 2. **Holiday "turkeys" copy.** A Turkey Fry Kit (30 QT, and a 60 QT two-bird size) goes live Oct 1. Last season most of our turkey-fryer orders came Oct 16–Nov 15. Our last order date for Thanksgiving delivery is **Mon Nov 23**, so turkey delivery-promise copy should stop then. The kit page stays up.
> 3. **Chili and gumbo:** the 40 QT Powered Sauce Cooker.
> 4. **Regional seafood** (Low Country shrimp, Chesapeake crab, New England lobster/clambake): boil and steam searches. Point them at the Performance pots with the Triple Jet (Platinum and Ultimate), not the fryer kit.
> 5. **Claims:** "350° in under 5 minutes" is for the 18 QT, 4-Way and 40 QT only; turkey fryers are "under 10 minutes." Never pair a fryer with crawfish. Never "hard boil". Full 2-year warranty on everything. The limited 5-year is residential only, 120 QT or smaller, and never on steamer or commercial copy. No competitor names. "Made in USA" and "Built in Louisiana" are approved.
> 6. **Bundles have the discount built in.** No promo codes on kit ads or extensions.
> 7. Where you can, please put campaign names in the UTMs on final URLs so we can tie orders to campaigns in Shopify.

---

## 8. Sequence and owners

| When | What | Who |
|---|---|---|
| Now | Q6, Q7, Q9 still open · go through the "Ask Jay" rows in the [discount inventory](reports/2026-09-11-discount-code-inventory.csv) | **Jay** |
| Now | Kit names, kit-page copy incl. the "codes don't apply" line, ad copy | Maya |
| Before any kit goes live | Code fix: [to-do](2026-09-11-bundle-discount-code-fix.md) | **Evan** · Biljana for her email/SMS codes |
| By Sep 25 / Oct 1 | Build the tailgate kit, then the turkey kit (30 + 60 QT variants) | **Evan** |
| After ~Sep 14 IW read | Kit block on the 18 QT landing page, PDP link | Nova (code), Evan publishes |
| Sep 25 / Oct 1 → Nov 23 | Kit ads live · turkey push stops Nov 23 | Evan publishes |
| Weekly from launch | Kit share, gross profit per order, discounts on kit lines | Finn |

## Assumptions and limits
- Variable costs are v3's assumptions. Refunds are not modeled.
- Platinum and Ultimate use the bundle variant's own `unitCost` (v3's convention). Orders post component lines, whose costs can differ slightly.
- The counterfactual baskets are Jun–Aug 2026 fryer orders and Oct–Nov 2025 turkey orders at last season's prices.
- 12" thermometer on the 60 QT: assumed, pending Evan's confirmation.

→ [Jay one-pager](2026-09-11-bundles-for-jay.md) · [code fix](2026-09-11-bundle-discount-code-fix.md) · [v3](reports/2026-09-10-cac-ceilings-v3.md) · [overhead method](reports/2026-09-10-overhead-method-options.md) · [order-level pulls](reports/2026-09-10-order-level-pulls.md) · [Coalition recap](2026-09-10-coalition-alignment-recap-review.md) · [Board](../../my-desk%20%28now%29/BOARD.md)
