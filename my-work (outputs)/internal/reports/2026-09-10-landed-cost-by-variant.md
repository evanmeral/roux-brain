# Landed cost by variant: active catalog

> ✅ **Resolved 2026-09-10 — Jay via Evan:** every cost was reviewed and only wrong ones were changed, so old timestamps mean "already right". The exact-50% costs are **intentional and accurate**. Data problems A and B below are answered; the costs in this table are landed cost.
**2026-09-10 · Finn, read-only Shopify Admin GraphQL · input to the CAC ceiling table**

Nothing was written to Shopify. Every figure below is from a query listed in the Queries section at the end (Q1 to Q6), pulled 2026-09-10. Margin is **derived**: (current price − current `inventoryItem.unitCost`) ÷ current price. It is **gross margin at list price**, not contribution margin and not net profit. No order-line costs were used.

**Premise, from the brief:** Jay said by text on 2026-09-09 that "cost per item" now holds landed cost (part + tariffs + inbound freight), updated the week of 2026-09-01. **This report does not confirm that.** Shopify's record timestamps show that most costs were not touched in that window (see Data problem A).

---

## Counts

| What | Count | Source |
|---|---|---|
| Products, all statuses | 183 | Q4 |
| **Active products (in this table)** | **152** | Q4, and Q1 returned exactly 152 |
| **Active variants (in this table)** | **594** | Q1 |
| Draft products (excluded, count only) | 21 | Q4 |
| Archived products (excluded, count only) | 3 | Q4 |
| Unlisted products (excluded, a 4th status the brief did not name) | 7 | Q4, Q6 |
| Check: 152 + 21 + 3 + 7 | 183, and `-status:active` returns 31 | Q4 |

Unlisted, listed so nothing is silently dropped (Q6): 40 QT Powered Cooker · 40 Qt Single Turkey Fryer Pot With Drain Valve / Lid & Turkey Rack · BBQ Shrimp Mix · Creole Seasoning · Geaux Creole Dust · Stainless Steel Fry Thermometer 12 in (Bayou Classic) · Stainless Steel Fry Thermometer 5 in. One variant each.

No active product had more than 100 variants, so none were truncated (Q1 `variants.pageInfo.hasNextPage` false on all 152). Null `unitCost` on active variants: 0 (Q1).

---

## The five that gate live decisions

Source for every row: price, compare-at and cost from Q1, with cost confirmed identical in Q2. Last-changed timestamp from Q2 (`InventoryItem.updatedAt`, UTC).

| Product | Variant | SKU | Price | Compare-at | Landed cost | Margin $ | Margin % | Cost last changed (UTC) | Flags |
|---|---|---|---|---|---|---|---|---|---|
| 18 QT Fish Fryer / Brazier Powered Pot | 1/4" Valve / With Basket | PWFRBR-VLV025B | $340.00 | $313.00 | $182.05 | $157.95 | 46.5% | 2026-08-30 22:54 | — |
| 18 QT Fish Fryer / Brazier Powered Pot | 1/4" Valve / No Basket | PWFRBR-VLV025 | $300.00 | — | $160.94 | $139.06 | 46.4% | 2026-08-30 22:54 | — |
| 18 QT Fish Fryer / Brazier Powered Pot | No Valve / With Basket | PWFRBR-B | $325.00 | $313.00 | $162.50 | $162.50 | 50.0% | 2026-08-06 19:04 | cost = exactly 50% of price; not modified in the 2026-08-30 bulk update |
| 18 QT Fish Fryer / Brazier Powered Pot | No Valve / No Basket | PWFRBR | $285.00 | $313.00 | $142.50 | $142.50 | 50.0% | 2026-08-06 19:04 | cost = exactly 50% of price; not modified in the 2026-08-30 bulk update |
| 18 QT Fish Fryer / Brazier Pot | With Basket / 1/4" Valve | SFPFRBR-VLV025B | $265.00 | — | $132.50 | $132.50 | 50.0% | 2026-08-06 19:04 | cost = exactly 50% of price; not modified in the 2026-08-30 bulk update |
| 18 QT Fish Fryer / Brazier Pot | With Basket / No Valve | SFPFRBR-B | $250.00 | — | $125.00 | $125.00 | 50.0% | 2026-08-06 19:04 | cost = exactly 50% of price; not modified in the 2026-08-30 bulk update |
| 18 QT Fish Fryer / Brazier Pot | No Basket / 1/4" Valve | SFPFRBR-VLV025 | $235.00 | — | $127.99 | $107.01 | 45.5% | 2026-08-06 18:03 | not modified in the 2026-08-30 bulk update |
| 18 QT Fish Fryer / Brazier Pot | No Basket / No Valve | SFPFRBR | $220.00 | — | $110.00 | $110.00 | 50.0% | 2026-08-06 19:04 | cost = exactly 50% of price; not modified in the 2026-08-30 bulk update |
| 120 Quart Powered Seafood/Crawfish Cooker | 3/4" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW120-BTJ-VLV075 | $715.00 | — | $386.69 | $328.31 | 45.9% | 2026-08-30 22:53 | — |
| 120 Quart Powered Seafood/Crawfish Cooker | 3/4" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW120-B10B-VLV075 | $735.00 | — | $383.61 | $351.39 | 47.8% | 2026-08-06 18:03 | not modified in the 2026-08-30 bulk update |
| 120 Quart Powered Seafood/Crawfish Cooker | 3/4" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW120-BMJNG-VLV075 | $775.00 | — | $419.42 | $355.58 | 45.9% | 2026-08-06 18:03 | not modified in the 2026-08-30 bulk update |
| 120 Quart Powered Seafood/Crawfish Cooker | 1" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW120-BTJ-VLV100 | $725.00 | — | $389.19 | $335.81 | 46.3% | 2026-08-30 22:53 | — |
| 120 Quart Powered Seafood/Crawfish Cooker | 1" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW120-B10B-VLV100 | $745.00 | — | $386.11 | $358.89 | 48.2% | 2026-08-30 22:53 | — |
| 120 Quart Powered Seafood/Crawfish Cooker | 1" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW120-BMJNG-VLV100 | $785.00 | — | $421.92 | $363.08 | 46.3% | 2026-08-30 23:31 | — |
| 120 Quart Powered Seafood/Crawfish Cooker | 1-1/2" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW120-BTJ-VLV150 | $745.00 | — | $397.19 | $347.81 | 46.7% | 2026-08-30 22:54 | — |
| 120 Quart Powered Seafood/Crawfish Cooker | 1-1/2" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW120-B10B-VLV150 | $765.00 | — | $394.11 | $370.89 | 48.5% | 2026-08-30 22:54 | — |
| 120 Quart Powered Seafood/Crawfish Cooker | 1-1/2" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW120-BMJNG-VLV150 | $805.00 | — | $429.92 | $375.08 | 46.6% | 2026-09-04 05:10 | — |
| Boil Boss Triple Jet Burner | Default Title | BoilBoss-TJB-V2.5 | $425.00 | $425.00 | $215.50 | $209.50 | 49.3% | 2026-08-06 18:04 | not modified in the 2026-08-30 bulk update |
| Cooker Leg Extensions for Outdoor Gas Cookers | Default Title | LegExtensions | $119.00 | — | $48.90 | $70.10 | 58.9% | 2026-08-27 20:58 | not modified in the 2026-08-30 bulk update |
| Boil Boss Cooling Ring | Standard (60-120Qt pots) / Red | BoilBoss-Ring-R | $59.99 | — | $14.53 | $45.46 | 75.8% | 2026-08-30 23:33 | — |
| Boil Boss Cooling Ring | Standard (60-120Qt pots) / Black | BoilBoss-Ring-B | $59.99 | — | $13.95 | $46.04 | 76.7% | 2026-08-30 23:33 | — |
| Boil Boss Cooling Ring | Standard (60-120Qt pots) / Purple & Gold | BoilBoss-Ring-PG | $59.99 | — | $14.86 | $45.13 | 75.2% | 2026-08-30 23:33 | — |
| Boil Boss Cooling Ring | Standard (60-120Qt pots) / Black & Gold | BoilBoss-Ring-BG | $59.99 | — | $14.19 | $45.80 | 76.3% | 2026-08-30 23:33 | — |
| Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Red | BoilBoss-Ring-R-LG | $74.99 | — | $18.50 | $56.49 | 75.3% | 2026-08-06 19:06 | not modified in the 2026-08-30 bulk update |
| Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Black | BoilBoss-Ring-B-LG | $74.99 | — | $16.37 | $58.62 | 78.2% | 2026-08-06 19:06 | not modified in the 2026-08-30 bulk update |
| Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Purple & Gold | BoilBoss-Ring-PG-LG | $74.99 | — | $17.97 | $57.02 | 76.0% | 2026-08-06 19:06 | not modified in the 2026-08-30 bulk update |
| Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Black & Gold | BoilBoss-Ring-BG-LG | $74.99 | — | $16.61 | $58.38 | 77.9% | 2026-08-06 19:06 | not modified in the 2026-08-30 bulk update |
| Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Red | BoilBoss-Ring-R-SM | $55.99 | — | $14.53 | $41.46 | 74.0% | 2026-08-30 23:33 | — |
| Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Black | BoilBoss-Ring-B-SM | $55.99 | — | $14.37 | $41.62 | 74.3% | 2026-08-30 23:33 | — |
| Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Purple & Gold | BoilBoss-Ring-PG-SM | $55.99 | — | $17.97 | $38.02 | 67.9% | 2026-08-06 19:06 | not modified in the 2026-08-30 bulk update |
| Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Black & Gold | BoilBoss-Ring-BG-SM | $55.99 | — | $14.61 | $41.38 | 73.9% | 2026-08-30 23:33 | — |

> Compare-at "—" means not set. A compare-at of $0.00 is shown as —.

**Against what the brain already holds.** In the August table in `metrics-and-goals.md` (built from August order-line costs, not current variant cost): Triple Jet is 49.3%, the same as today. Leg extensions show **40.0%** there and **58.9%** here. The Cooling Ring shows **54.1% at $55.99** there and **67.9% to 74.3%** on the $55.99 variants here. These are different measurements, and neither reconciles to the other. I have not determined why.

---

## Flags

### Flag 1: no cost or $0 cost: **102 variants** on 3 products (Q1, Q2)
- **Shipping Protection**: 100 variants (SKUs NVDPROTECTION*), price $0.75 to $74.25, cost $0.00 on all. Each is a row in the full table.
| Product | Variant | SKU | Price | Landed cost | Margin | Source |
|---|---|---|---|---|---|---|
| Custom Cooking Trailer | Default Title | (none) | $0.00 | $0.00 | — | Q1, Q2 |
| Return Shipping | Default Title | CUST-ReturnShipping | $0.00 | $0.00 | — | Q1, Q2 |

No active variant has a null cost. Every cost field is populated. **This means the $0 test cannot detect gaps in Jay's update.** A cost that was never updated still shows a number. Data problems A and B are the real gap test.

### Flag 2: cost ≥ price: **16 variants** (Q1, Q2)
| Product | Variant | SKU | Price | Landed cost | Margin | Source |
|---|---|---|---|---|---|---|
| Banners | 1.7' x 3' | MKT-BNR-DS-2-3 | $0.00 | $43.98 | — | Q1, Q2 |
| Boil Boss - Ignitor Replacement | Default Title | (none) | $0.00 | $25.00 | — | Q1, Q2 |
| Boil Boss - Remote Replacement | Default Title | (none) | $0.00 | $17.00 | — | Q1, Q2 |
| Boil Boss Thermometer Replacement | Default Title | BoilBoss-Pdl-Thermometer | $0.00 | $4.25 | — | Q1, Q2 |
| Cooker Selection Chart | 11" x 17" | MKT-CCC-11-17 | $0.00 | $25.00 | — | Q1, Q2 |
| Cooker Selection Chart | 18" x 24" | MKT-CCC-18-24 | $0.00 | $32.00 | — | Q1, Q2 |
| Replacement BoilBoss Ring Bracket (Set of 3) | Red | BoilBoss-Ring-Brkt-Red | $0.00 | $3.00 | — | Q1, Q2 |
| Replacement BoilBoss Ring Bracket (Set of 3) | Black | BoilBoss-Ring-Brkt-Black | $0.00 | $3.00 | — | Q1, Q2 |
| Replacement BoilBoss Ring Bracket (Set of 3) | Yellow | BoilBoss-Ring-Brkt-Yellow | $0.00 | $3.00 | — | Q1, Q2 |
| Replacement BoilBoss Ring Bracket (Set of 3) | Gold | BoilBoss-Ring-Brkt-Gold | $0.00 | $3.00 | — | Q1, Q2 |
| Banners | 2.5' x 6' | MKT-BNR-DS-2-6 | $0.01 | $98.20 | -981900.0% | Q1, Q2 |
| Foam Boards | 18" x 24" | MKT-FB-18-24 | $0.01 | $39.00 | -389900.0% | Q1, Q2 |
| Foam Boards | 24" x 48" | MKT-FB-24-48 | $0.01 | $71.00 | -709900.0% | Q1, Q2 |
| Self Standing Floor Pop Up Display | Default Title | MKT-FLRPU-2-4 | $0.01 | $96.00 | -959900.0% | Q1, Q2 |
| Table Top Signs | Default Title | MKT-TT-SelfStand | $0.01 | $19.28 | -192700.0% | Q1, Q2 |
| Custom Labor | Default Title | CUSTOM-Labor | $30.00 | $30.00 | 0.0% | Q1, Q2 |

All 16 are marketing materials (banners, foam boards, signs, displays, charts) priced $0 or $0.01, replacement parts priced $0, or Custom Labor at $30 = $30. None is a cooker, pot, burner or accessory sold at retail. Two more $0-price variants also have $0 cost and appear in Flag 1 only: Custom Cooking Trailer and Return Shipping.

### Flag 3: implausible margin, above 80%: **5 variants** (Q1, Q2)
| Product | Variant | SKU | Price | Landed cost | Margin | Source |
|---|---|---|---|---|---|---|
| RENTAL - Crawfish Boil Trailer Package | Daily - (Ex. Pickup Monday return Tuesday) | Trental-D | $385.00 | $50.00 | 87.0% | Q1, Q2 |
| RENTAL - Crawfish Boil Trailer Package | Weekend - (Pickup on Friday return on Monday) | Trentaly-WE | $600.00 | $15.00 | 97.5% | Q1, Q2 |
| Stainless Steel Deep Fryer Thermometers - 12 inch and 5 inch - HP Cookers | 5 inch | HP-5in-Therm | $15.99 | $1.88 | 88.2% | Q1, Q2 |
| Stainless Steel Deep Fryer Thermometers - 12 inch and 5 inch - HP Cookers | 12 inch | HP-12in-Therm | $18.99 | $2.15 | 88.7% | Q1, Q2 |
| Wind Shield | Default Title | ACC-Windshield | $21.00 | $1.50 | 92.9% | Q1, Q2 |

### Flag 3: implausible margin, below 15%: **7 variants** (Q1, Q2)
| Product | Variant | SKU | Price | Landed cost | Margin | Source |
|---|---|---|---|---|---|---|
| 18 Qt Fish Fryer / Brazier Pot - SCRATCH & DENT | Performance (No Burner) / 30% | SFPFRBR-VLV025B-SD30 | $185.50 | $182.00 | 1.9% | Q1, Q2 |
| Replacement Baskets | 30 Qt | BSK-30 | $40.00 | $39.00 | 2.5% | Q1, Q2 |
| 30 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | PT30-VLV075-SD30 | $234.50 | $215.00 | 8.3% | Q1, Q2 |
| 100 QT Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | SFP100-VLV075-SD30 | $364.00 | $330.00 | 9.3% | Q1, Q2 |
| Navimow I Series Robotic Lawn Mower | Navimow i105 / .15 acre | NaviMow-i105 | $799.00 | $699.30 | 12.5% | Q1, Q2 |
| 80 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | SFP80-VLV075-SD30 | $346.50 | $300.00 | 13.4% | Q1, Q2 |
| 120 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | SFP120-VLV075-SD30 | $406.00 | $350.00 | 13.8% | Q1, Q2 |

Five of the seven are 30%-off Scratch & Dent **Performance** variants. See Data problem C.

### Flag 4: draft and archived: **21 draft, 3 archived** (Q4). Excluded. Plus 7 unlisted (above).

---

## Data problems found while pulling (not requested, flagged for a human)

### A. Most costs were not modified in the week Jay described (Q2, Q5)
Q2 returns `updatedAt` for every inventory item. For the 594 active variants:

| Last modified (UTC) | Variants | Source |
|---|---|---|
| Before 2026-08-30 | **455** (77%) | Q2 |
| 2026-08-30, 22:46:49 to 23:34:14 (one continuous batch) | **126** | Q2, Q5 |
| 2026-08-31 to 2026-09-07 | **13** | Q2, Q5 |
| 2026-09-08 or later | **0** | Q2, Q5 |

The 2026-08-30 batch runs 22:46 to 23:34 UTC, which is 5:46 to 6:34 pm Central on the Sunday before Labor Day. That is **consistent with** Jay's update, but it is not proof that costs changed then. `updatedAt` moves when any field on the item changes. **What the timestamp can rule out:** an item last modified before 2026-08-30 cannot have had its cost edited on or after that date. On that basis, **455 of 594 active variants carry a cost that predates Jay's update window.** That includes the Triple Jet ($215.50, last modified 2026-08-06), the $119 leg extensions (2026-08-27), the base $285 18 QT Powered variant, 2 of 9 120 QT Powered variants, 5 of 12 Cooling Ring variants, and every commercial unit.
**Assumption:** a cost edit in the Shopify admin or by CSV updates `InventoryItem.updatedAt`. If Jay edited costs some other way that does not touch this timestamp, this test does not apply. I have not verified that assumption.

### B. 114 active variants have cost set to exactly 50.0% of price (Q1, Q2)
Every one of the 114 was last modified **before** 2026-08-30. Landed cost built from part + tariff + freight will not usually land on exactly half of retail, so these look like a formula placeholder. This is an observation about the data. It does not prove any cost is wrong. By line: 18 QT Powered 2 of 4 (PWFRBR $285, PWFRBR-B $325) · 18 QT non-powered 3 of 4 · Commercial units 23 of 41 · Commercial leg extensions 1 of 1 · Electronic Ignition · Pull-Behind Trailer · the full "Performance Boiling Pots (60QT to 120QT)" duplicate listing (14 of 14). The full table marks each one `50%`.

### C. Scratch & Dent Performance variants carry the Powered variant's cost (Q1)
Each S&D product uses one cost for both its Powered and Performance variants. Example: 18 QT S&D, $182.00 on both PWFRBR-VLV025B-SD* and SFPFRBR-VLV025B-SD*, while the undamaged Performance SKU SFPFRBR-VLV025B costs $132.50. Same pattern on the 30/80/100/120 QT S&D. This is what drives 5 of the 7 sub-15% margins in Flag 3.

### D. Other record problems (Q1, Q2)
- **98 active variants have no SKU.** Mostly the Ultimate Boiling Bundle (64) and Platinum Bundle variants.
- **Duplicate SKU on two active variants:** `PW30-VLV075-TFR-B-SBI` is on the 30 Qt Turkey Fryer Powered Pot at $462.50 and on the 30 Qt Powered Pot at $475.00. Both cost $253.08. Six more duplicate SKUs (`CSC-60GAL*`) sit on draft products.
- **Compare-at set at or below price, 4 variants:** 18 QT Powered PWFRBR-VLV025B $340 / compare-at $313 · PWFRBR-B $325 / $313 · Boil Boss Triple Jet $425 / $425 (already known) · 30 Qt S&D PW30-VLV075-TFRB-SD15 $403.75 / $395. A further 42 variants store compare-at as $0.00, which is effectively blank.

---

## Summary by product line

Lines follow the brief's list and `what-we-sell.md`. "Last cost-record change": A = before 2026-08-30, B = the 2026-08-30 batch, C = 2026-08-31 to 09-07. Price and cost from Q1 (cost confirmed in Q2). Margin derived. Timestamps from Q2.

| Line | Products | Variants | Price range | Landed cost range | Margin range | Cost = exactly 50% of price | Last cost-record change |
|---|---|---|---|---|---|---|---|
| Performance pots 80/100/120 QT | 3 | 12 | $477.00–$580.00 | $239.25–$324.22 | 43.0%–49.8% | 0 of 12 | A:3 · B:9 |
| Boil Boss Triple Jet | 1 | 1 | $425.00–$425.00 | $215.50–$215.50 | 49.3%–49.3% | 0 of 1 | A:1 |
| Powered pots 18/30/40/60 QT | 6 | 18 | $285.00–$535.00 | $142.50–$273.78 | 44.9%–50.0% | 2 of 18 | A:9 · B:9 |
| 120 QT Powered | 1 | 9 | $715.00–$805.00 | $383.61–$429.92 | 45.9%–48.5% | 0 of 9 | A:2 · B:6 · C:1 |
| Boil Boss accessories | 4 | 25 | $55.99–$129.98 | $13.95–$59.67 | 54.1%–78.2% | 0 of 25 | A:17 · B:8 |
| Leg extensions | 2 | 2 | $119.00–$165.00 | $48.90–$82.50 | 50.0%–58.9% | 1 of 2 | A:2 |
| Steamers (units) | 2 | 3 | $1,325.00–$1,725.00 | $695.67–$933.01 | 45.9%–47.5% | 0 of 3 | A:2 · B:1 |
| Commercial (units) | 8 | 41 | $2,145.00–$7,299.00 | $1,087.50–$3,649.50 | 46.7%–57.6% | 23 of 41 | A:41 |
| Not in a requested line | 125 | 483 | $0.00–$4,999.00 | $0.00–$2,229.00 | -981900.0%–100.0% | 88 of 483 | A:378 · B:93 · C:12 |

**Classification choices, stated so they can be changed:**
- "Powered pots 18/30/40/60 QT" includes the 60 QT Dual Turkey Fryer (listed in Tier 1B of `what-we-sell.md`).
- **80 QT and 100 QT Powered are not in any requested line.** They are under "Not in a requested line": 80 QT Powered $630–$695, 100 QT Powered $670–$755, 9 variants each.
- Boil Boss accessories = Cooling Ring, Thermo Paddle, Combo, Ultimate Combo. Centering brackets and replacement parts are excluded.
- Leg extensions includes the $165 Commercial Cooker Leg Extensions as a second product. The $119 consumer one is the key product.
- Steamers = the 28 QT and 100 QT units only. Trays and inserts (Steamer Basket Inserts, Commercial Basket Steamer Shelf) are excluded.
- Commercial = the 60–140 Gallon boilers, the 40 Gallon / 160 QT, the Crawcuzzi and the Pull-Behind Trailer. Commercial baskets, lids and parts are excluded. I matched titles on "Gallon" because the commercial line is named in gallons, not QT.
- The "Not in a requested line" margin range (−981,900% to 100%) is driven by $0.01 marketing items and the $0-cost Shipping Protection. It is not meaningful.

### Per product, requested lines

| Line | Product | Variants | Price | Landed cost | Margin | Exactly 50% | Last change (UTC) |
|---|---|---|---|---|---|---|---|
| Performance pots 80/100/120 QT | 100 QT Performance Seafood Pot | 4 | $502.00–$550.00 | $262.55–$291.05 | 46.0%–47.7% | 0/4 | 2026-08-06 → 2026-08-30 |
| Performance pots 80/100/120 QT | 120 QT Performance Seafood Pot | 4 | $532.00–$580.00 | $295.72–$324.22 | 43.0%–44.4% | 0/4 | 2026-08-06 → 2026-08-30 |
| Performance pots 80/100/120 QT | 80 QT Performance Seafood Pot | 4 | $477.00–$525.00 | $239.25–$267.75 | 48.0%–49.8% | 0/4 | 2026-08-06 → 2026-08-30 |
| Boil Boss Triple Jet | Boil Boss Triple Jet Burner | 1 | $425.00–$425.00 | $215.50–$215.50 | 49.3%–49.3% | 0/1 | 2026-08-06 → 2026-08-06 |
| Powered pots 18/30/40/60 QT | 18 QT Fish Fryer / Brazier Powered Pot | 4 | $285.00–$340.00 | $142.50–$182.05 | 46.4%–50.0% | 2/4 | 2026-08-06 → 2026-08-30 |
| Powered pots 18/30/40/60 QT | 30 Qt Powered Pot With Drain Valve, Basket & Lid | 3 | $435.00–$475.00 | $230.78–$253.08 | 46.6%–46.9% | 0/3 | 2026-08-06 → 2026-08-30 |
| Powered pots 18/30/40/60 QT | 30 Qt Turkey Fryer Powered Pot With Drain Valve, Lid & Turkey Rack | 3 | $395.00–$462.50 | $217.62–$253.08 | 44.9%–45.3% | 0/3 | 2026-08-06 → 2026-08-30 |
| Powered pots 18/30/40/60 QT | 40 QT Powered Sauce Cooker | 2 | $289.99–$309.99 | $156.38–$164.38 | 46.1%–47.0% | 0/2 | 2026-08-06 → 2026-08-30 |
| Powered pots 18/30/40/60 QT | 60 QT Powered Cooker | 4 | $515.00–$535.00 | $268.63–$273.78 | 47.8%–48.8% | 0/4 | 2026-08-06 → 2026-08-30 |
| Powered pots 18/30/40/60 QT | 60 Qt Dual Turkey Fryer Pot With Drain Valve / Lid & Turkey Rack | 2 | $495.00–$505.00 | $256.42–$258.92 | 48.2%–48.7% | 0/2 | 2026-08-06 → 2026-08-30 |
| 120 QT Powered | 120 Quart Powered Seafood/Crawfish Cooker | 9 | $715.00–$805.00 | $383.61–$429.92 | 45.9%–48.5% | 0/9 | 2026-08-06 → 2026-09-04 |
| Boil Boss accessories | Boil Boss Combo - Cooling Ring & Thermo Paddle | 4 | $122.50–$122.50 | $43.39–$43.39 | 64.6%–64.6% | 0/4 | 2026-08-06 → 2026-08-06 |
| Boil Boss accessories | Boil Boss Cooling Ring | 12 | $55.99–$74.99 | $13.95–$18.50 | 67.9%–78.2% | 0/12 | 2026-08-06 → 2026-08-30 |
| Boil Boss accessories | Boil Boss Thermo Paddle | 1 | $69.99–$69.99 | $25.64–$25.64 | 63.4%–63.4% | 0/1 | 2026-08-30 → 2026-08-30 |
| Boil Boss accessories | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | 8 | $129.98–$129.98 | $59.67–$59.67 | 54.1%–54.1% | 0/8 | 2026-08-06 → 2026-08-06 |
| Leg extensions | Commercial Cooker Leg Extensions | 1 | $165.00–$165.00 | $82.50–$82.50 | 50.0%–50.0% | 1/1 | 2026-08-06 → 2026-08-06 |
| Leg extensions | Cooker Leg Extensions for Outdoor Gas Cookers | 1 | $119.00–$119.00 | $48.90–$48.90 | 58.9%–58.9% | 0/1 | 2026-08-27 → 2026-08-27 |
| Steamers (units) | 100 QT Powered Rack Steamer | 2 | $1,525.00–$1,725.00 | $814.01–$933.01 | 45.9%–46.6% | 0/2 | 2026-08-06 → 2026-08-30 |
| Steamers (units) | 28 QT Powered Rack Seafood Steamer | 1 | $1,325.00–$1,325.00 | $695.67–$695.67 | 47.5%–47.5% | 0/1 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | 100 Gallon High Performance Commercial Seafood Boiler | 7 | $2,850.00–$4,199.00 | $1,282.67–$2,099.50 | 47.4%–55.0% | 5/7 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | 120 Gallon High Performance Commercial Seafood Boiler | 6 | $3,175.00–$4,875.00 | $1,346.85–$2,574.58 | 47.0%–57.6% | 3/6 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | 140 Gallon High Performance Commercial Seafood Boiler | 6 | $3,875.00–$5,775.00 | $1,937.50–$2,993.15 | 47.2%–50.0% | 4/6 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | 40 Gallon / 160 Quart Powered Seafood/Crawfish Cooker (Flip Basket) | 4 | $2,145.00–$2,279.00 | $1,087.50–$1,139.50 | 47.4%–50.0% | 3/4 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | 60 Gallon High Performance Commercial Seafood Cooker | 6 | $2,699.00–$3,099.00 | $1,322.31–$1,595.22 | 46.8%–51.0% | 4/6 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | 80 Gallon High Performance Commercial Seafood Boiler | 4 | $2,550.00–$3,750.00 | $1,169.00–$1,931.93 | 47.1%–54.2% | 2/4 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | Crawcuzzi - Automatic Crawfish Cleaner | 7 | $2,465.00–$4,595.00 | $1,295.11–$2,448.04 | 46.7%–50.0% | 1/7 | 2026-08-06 → 2026-08-06 |
| Commercial (units) | Pull Behind Trailer Package - 60 Gallon High Performance Commercial Seafood Cooker | 1 | $7,299.00–$7,299.00 | $3,649.50–$3,649.50 | 50.0%–50.0% | 1/1 | 2026-08-06 → 2026-08-06 |

### Products not in a requested line (125 products, 483 variants, all in the full table)
0 to 10 PSI Propane Regulator w/ 6' Stainless Steel Braided Hose (1); 0 to 30 PSI Propane Regulator w/6' Stainless Steel Braided Hose (1); 10" Banjo Burner Module - 200K BTU (Cooking & Frying) (1); 100 Gallon Basket (1); 100 Gallon Lid (1); 100 QT Cooker - SCRATCH & DENT (4); 100 QT Powered Seafood Cooker (9); 120 Gallon Basket (2); 120 Gallon Lid (1); 120 Qt Cooker - SCRATCH & DENT (4); 140 Gallon Basket (1); 140 Gallon Dual Basket (per set) (1); 140 Gallon Lid (1); 18 QT Basket & Notched Lid (1); 18 QT Fish Fryer / Brazier Pot (4); 18 Qt Fish Fryer / Brazier Pot - SCRATCH & DENT (4); 20" Heavy Duty Chrome Plated Wire Mesh Skimmer (1); 21" Spiral Wire Mesh Skimmer (1); 3 Jet Burner Module - 375K BTU (High Speed Boiling) (1); 30 QT Performance Seafood/Stock Pot (1); 30 Qt Cooker - SCRATCH & DENT (4); 32 Tip MultiJet Natural Gas Burner Module - 160K BTU (1); 36" Stainless Steel Paddle (1); 4-Basket Fryer / Boiler (1); 4-Way 20 QT Fryer (2); 4-Way Fryer / Pasta Cooker (2); 40 / 60 Gallon Lid Support Brackets (2); 40 Gallon Basket (1); 40 Gallon Cleaner Cover (1); 40 Gallon Lid (1); 40 QT Sauce Stock Pot (2); 58OZ Cast Aluminum Scoop (1); 6" Banjo Burner Module (Cooking & Frying) (1); 60 Gallon Basket (1); 60 Gallon Lid (1); 60 Gallon Lid Dump Guide Rails (1); 60 Gallon Square Basket (1); 60 QT Performance Seafood/Stock Pot (1); 60 Qt Cooker - SCRATCH & DENT (4); 80 Gallon Basket (1); 80 Gallon Lid (1); 80 Gallon Quad Basket (4 per set) (1); 80 QT Powered Seafood Cooker (9); 80 Qt Cooker - SCRATCH & DENT (4); Add a Custom Logo (1); Banners (2); Basket Buddy (2); Bayou Classic Perforated Aluminum Skimmer (1); Bayou Classic Stainless Steel Brew Paddle with Bottle Opener (1); Bayou Classic WOODEN Cajun Stir Paddle (1); Boil Boss - Foundation Boil Seasoning - 20 lb Bulk (5 - 4lb bags) 25% Savings (2); Boil Boss - Ignitor Replacement (1); Boil Boss - Remote Replacement (1); Boil Boss Seasoning (4); Boil Boss Thermometer Replacement (1); Boil Boss Triple Jet Burner (Centering Brackets - Set of 3) (1); Cajun Cleaner (6); Commercial Basket - Steamer Shelf (4); Commercial Burner Modules (10); Commercial Cooker Metal Wheels (Set of 2) (1); Commercial Duty 0 to 30 Psi PLATINUM Propane Regulator (1); Cooker Selection Chart (2); Crawcuzzi Basket Chute (2); Crawfish Dusting Table (1); Crawfish Serving Trough (4); Crawfish Sorting Table (1); Custom Cooking Trailer (1); Custom Labor (1); Custom Product (1); Double Jet Burner Module - 80 QT - 250K BTU (High Speed Boiling) (1); Electronic Ignition (1); Extra Commercial Baskets (6); Extra length Premium Regulator Hose (3); Foam Boards (2); Freight (1); Gantry Lift System (6); Gift Card (5); Grey Shrimp Tee (8); HP Cookers 20 OZ Cup (1); HP Cookers 32 OZ Cup (1); HP Cookers 36 OZ Bottle (1); HP Cookers Logo Hat (4); HPC Heavy Duty Aluminum Paddle (1); Install Tunnel Tube Bottom (4); Light Blue Fish Tee (4); Navimow Access+ (1); Navimow Garage (4); Navimow I Series Robotic Lawn Mower (4); Navimow Mow Gate (1); Navimow X Series Robotic Lawn Mower (4); Navimow X430 Series Robotic Lawn Mower (2); Original Hats (3); Performance Boiling Pots (60QT to 120QT) (14); Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) (16); RENTAL - Crawfish Boil Trailer Package (2); Repair Work (1); Replacement Baskets (7); Replacement BoilBoss Ring Bracket (Set of 3) (4); Replacement Burner Tube for Burner Modules (2); Replacement Lids (8); Return Shipping (1); Rugged Ice Packs (1); Rugged Road 115 - High Performance Cooler (4); Rugged Road 25 - High Performance Cooler (4); Rugged Road 45 - High Performance Cooler (4); Rugged Road 65 - High Performance Cooler (4); Rugged Road 85 - High Performance Cooler (4); Seafood Boil Bags (2); Self Standing Floor Pop Up Display (1); Shipping Protection (100); Short Sleeve Crawfish Tee (8); Single Jet Burner Module (Boiling) (1); Stainless Steel Deep Fryer Thermometers - 12 inch and 5 inch - HP Cookers (2); Steamer Basket Inserts (7); Table Top Signs (1); Trucker Hat (1); Turkey Fryer Racks (3); Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) (64); WD 150 - TT Upgrade (2); WD 150 TT & Basket Upgrade (2); WD 150 TT & Bottom Upgrade (2); Wind Shield (1); Zydeco Fire Combo Pack (1); Zydeco Fire Hot Sauce (1); Zydeco Fire Seasoning Dust (1)

---

## Cross-check

**1. Spot check, product query vs direct inventory-item lookup (Q1 vs Q3).** 7 items: PWFRBR-VLV025B, PWFRBR-VLV025, PWFRBR-B, PWFRBR, SFPFRBR-VLV025B, SFPFRBR-VLV025, 18QT-BSKLID. **All 7 costs and prices match.**

**2. Full check, product query vs a complete `inventoryItems` pull (Q1 vs Q2).** Q2 returned 640 inventory items across 3 pages. Every one of the 594 active variants was found by inventory-item ID. **Cost matches on 594 of 594. Price matches on 594 of 594. Zero mismatches.**

**Limit:** both queries read the same Shopify field. This confirms the table is internally consistent and nothing was lost in paging. It does **not** confirm the costs are landed. Only Jay's sheet or Digit can do that.

**3. Current prices vs `what-we-sell.md` (dated 2026-09-01).** 105 active products map to a documented price. **103 match. 2 differ:**

| Product | Shopify now (Q1) | `what-we-sell.md` | Note |
|---|---|---|---|
| Turkey Fryer Racks | $25.00–$65.00 | Single Upright $25 · Dual Rack $59.95 | Top variant is $65.00 in Shopify |
| Bayou Classic Stainless Steel Brew Paddle with Bottle Opener | $9.99 | Paddles $19.99–$85 | Below the documented paddle range |

**47 active products have no price in `what-we-sell.md`.** Most notable: **80 QT Powered Seafood Cooker ($630–$695) and 100 QT Powered Seafood Cooker ($670–$755)**, the commercial baskets and lids, the 4-Basket Fryer / Boiler ($2,000), Install Tunnel Tube Bottom, the WD 150 upgrades, and the "Performance Boiling Pots (60QT to 120QT)" duplicate listing. That listing's 60 QT no-valve variant is **$377**, while `what-we-sell.md` lists the 60 QT Performance at $395. Under the standing rule, none of these prices may be quoted until they are added to that file.

---

## What I could not get
- **Whether any cost is truly landed.** Shopify stores one number with no breakdown into part, tariff and freight. Needs Jay's sheet or Digit.
- **A cost history.** Shopify keeps no prior value of `unitCost`, so I cannot show what any cost was before 2026-08-30 or whether the Aug 30 batch changed it.
- **Whether a cost edit always updates `InventoryItem.updatedAt`.** Assumed, not verified (see A).

---

## Queries (exact, all read-only, Shopify Admin GraphQL, run 2026-09-10)

**Q1: active variants with cost.** 4 pages of 50 (152 products). Pages 1–2 ran without `inventoryItem.updatedAt`, and pages 3–4 ran with it. Otherwise identical. Pages 3–4 also omitted `tags`.
```graphql
query ActiveVariantCosts($first: Int!, $after: String) {
  products(first: $first, after: $after, query: "status:active", sortKey: TITLE) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id title status productType tags
      variantsCount { count }
      variants(first: 100) {
        pageInfo { hasNextPage }
        nodes {
          id title sku price compareAtPrice
          inventoryItem { id tracked updatedAt unitCost { amount currencyCode } }
        }
      }
    }
  }
}
```
**Q2: every inventory item (second source).** 3 pages of 250 (640 items). Page 3 was re-run with more fields (`tracked`, `createdAt`, variant title/SKU/compare-at, product title/type) so it would save to file. Cost, price and updatedAt fields are the same.
```graphql
query AllInventoryItems($after: String) {
  inventoryItems(first: 250, after: $after) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id sku updatedAt
      unitCost { amount }
      variant { id price product { status } }
    }
  }
}
```
**Q3: spot check by ID.** Validated with the `variant` field, which is deprecated in favor of `variants` but still returns data.
```graphql
query CrossCheck($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on InventoryItem {
      id sku updatedAt
      unitCost { amount currencyCode }
      variant { id title price product { title status } }
    }
  }
}
```
**Q4: product counts by status**
```graphql
query StatusCounts {
  active: productsCount(query: "status:active") { count precision }
  draft: productsCount(query: "status:draft") { count precision }
  archived: productsCount(query: "status:archived") { count precision }
  all: productsCount { count precision }
}
query StatusCounts2 {
  unlisted: productsCount(query: "status:unlisted") { count precision }
  notActive: productsCount(query: "-status:active") { count precision }
}
```
**Q5: inventory items modified on or after 2026-08-30** (one page; `hasNextPage` false)
```graphql
query RecentlyUpdated($after: String) {
  inventoryItems(first: 250, after: $after, query: "updated_at:>=2026-08-30") {
    pageInfo { hasNextPage endCursor }
    nodes { sku updatedAt unitCost { amount } }
  }
}
```
**Q6: unlisted products**
```graphql
query Unlisted($first: Int!) {
  products(first: $first, query: "status:unlisted", sortKey: TITLE) {
    nodes { title status productType variantsCount { count } }
  }
}
```

---

## Full variant table: 594 active variants

Source for every row: price, compare-at and landed cost from **Q1**, cost confirmed in **Q2**. Margin is derived. Flags: `F1` $0 cost · `F2` cost ≥ price · `F3` margin >80% or <15% · `50%` cost exactly half of price · `pre-8/30` cost record last modified before 2026-08-30 (Q2).

| # | Product | Variant | SKU | Price | Compare-at | Landed cost | Margin $ | Margin % | Line | Flags |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 100 QT Performance Seafood Pot | None- (Subtract $18) | SFP100 | $502.00 | — | $262.55 | $239.45 | 47.7% | Performance pots 80/100/120 QT | — |
| 2 | 100 QT Performance Seafood Pot | 3/4" Gate Valve | SFP100-VLV075 | $520.00 | — | $280.55 | $239.45 | 46.0% | Performance pots 80/100/120 QT | pre-8/30 |
| 3 | 100 QT Performance Seafood Pot | 1" Gate Valve - (Add $10) | SFP100-VLV100 | $530.00 | — | $283.05 | $246.95 | 46.6% | Performance pots 80/100/120 QT | — |
| 4 | 100 QT Performance Seafood Pot | 1 - 1/2" Gate Valve - (Add $30) | SFP100-VLV150 | $550.00 | — | $291.05 | $258.95 | 47.1% | Performance pots 80/100/120 QT | — |
| 5 | 120 QT Performance Seafood Pot | None - (Subtract $18) | SFP120-NOVLV | $532.00 | — | $295.72 | $236.28 | 44.4% | Performance pots 80/100/120 QT | — |
| 6 | 120 QT Performance Seafood Pot | 3/4" Gate Valve | SFP120-VLV075 | $550.00 | — | $313.72 | $236.28 | 43.0% | Performance pots 80/100/120 QT | pre-8/30 |
| 7 | 120 QT Performance Seafood Pot | 1" Gate Valve - (Add $10) | SFP120-VLV100 | $560.00 | — | $316.22 | $243.78 | 43.5% | Performance pots 80/100/120 QT | — |
| 8 | 120 QT Performance Seafood Pot | 1-1/2" Gate Valve - (Add $30) | SFP120-VLV150 | $580.00 | — | $324.22 | $255.78 | 44.1% | Performance pots 80/100/120 QT | — |
| 9 | 80 QT Performance Seafood Pot | None - (Subtract $18) | SFP80 | $477.00 | — | $239.25 | $237.75 | 49.8% | Performance pots 80/100/120 QT | — |
| 10 | 80 QT Performance Seafood Pot | 3/4" Gate Valve | SFP80-VLV075 | $495.00 | — | $257.25 | $237.75 | 48.0% | Performance pots 80/100/120 QT | pre-8/30 |
| 11 | 80 QT Performance Seafood Pot | 1" Gate Valve - (Add $10) | SFP80-VLV100 | $505.00 | — | $259.75 | $245.25 | 48.6% | Performance pots 80/100/120 QT | — |
| 12 | 80 QT Performance Seafood Pot | 1 1/2" Gate Valve - (Add $30) | SFP80-VLV150 | $525.00 | — | $267.75 | $257.25 | 49.0% | Performance pots 80/100/120 QT | — |
| 13 | Boil Boss Triple Jet Burner | Default Title | BoilBoss-TJB-V2.5 | $425.00 | $425.00 | $215.50 | $209.50 | 49.3% | Boil Boss Triple Jet | pre-8/30 |
| 14 | 18 QT Fish Fryer / Brazier Powered Pot | No Valve / No Basket | PWFRBR | $285.00 | $313.00 | $142.50 | $142.50 | 50.0% | Powered pots 18/30/40/60 QT | 50%, pre-8/30 |
| 15 | 18 QT Fish Fryer / Brazier Powered Pot | 1/4" Valve / No Basket | PWFRBR-VLV025 | $300.00 | — | $160.94 | $139.06 | 46.4% | Powered pots 18/30/40/60 QT | — |
| 16 | 18 QT Fish Fryer / Brazier Powered Pot | No Valve / With Basket | PWFRBR-B | $325.00 | $313.00 | $162.50 | $162.50 | 50.0% | Powered pots 18/30/40/60 QT | 50%, pre-8/30 |
| 17 | 18 QT Fish Fryer / Brazier Powered Pot | 1/4" Valve / With Basket | PWFRBR-VLV025B | $340.00 | $313.00 | $182.05 | $157.95 | 46.5% | Powered pots 18/30/40/60 QT | — |
| 18 | 30 Qt Powered Pot With Drain Valve, Basket & Lid | Basket Only | PW30-VLV075 | $435.00 | — | $230.78 | $204.22 | 46.9% | Powered pots 18/30/40/60 QT | pre-8/30 |
| 19 | 30 Qt Powered Pot With Drain Valve, Basket & Lid | With Basket & Steamer Rack Insert | PW30-VLV075-SBI | $455.00 | — | $243.00 | $212.00 | 46.6% | Powered pots 18/30/40/60 QT | pre-8/30 |
| 20 | 30 Qt Powered Pot With Drain Valve, Basket & Lid | With Basket - Steamer Rack Insert - Turkey Fryer Rack | PW30-VLV075-TFR-B-SBI | $475.00 | — | $253.08 | $221.92 | 46.7% | Powered pots 18/30/40/60 QT | — |
| 21 | 30 Qt Turkey Fryer Powered Pot With Drain Valve, Lid & Turkey Rack | Only Turkey Fryer Rack | PW30-VLV075-TFR | $395.00 | — | $217.62 | $177.38 | 44.9% | Powered pots 18/30/40/60 QT | pre-8/30 |
| 22 | 30 Qt Turkey Fryer Powered Pot With Drain Valve, Lid & Turkey Rack | With Turkey Fryer Rack & Basket | PW30-VLV075-TFR-B | $442.50 | — | $241.94 | $200.56 | 45.3% | Powered pots 18/30/40/60 QT | — |
| 23 | 30 Qt Turkey Fryer Powered Pot With Drain Valve, Lid & Turkey Rack | With Turkey Fryer Rack - Basket - Steamer Rack | PW30-VLV075-TFR-B-SBI | $462.50 | — | $253.08 | $209.42 | 45.3% | Powered pots 18/30/40/60 QT | — |
| 24 | 40 QT Powered Sauce Cooker | None | PW40SA-B6B | $289.99 | — | $156.38 | $133.61 | 46.1% | Powered pots 18/30/40/60 QT | — |
| 25 | 40 QT Powered Sauce Cooker | 3/4" Gate Valve | PW40SA-B6B-VLV075 | $309.99 | — | $164.38 | $145.61 | 47.0% | Powered pots 18/30/40/60 QT | pre-8/30 |
| 26 | 60 QT Powered Cooker | Single Jet Burner (Boiling) / 3/4" Gate Valve | PW60-BSJ-VLV075 | $515.00 | — | $268.63 | $246.37 | 47.8% | Powered pots 18/30/40/60 QT | pre-8/30 |
| 27 | 60 QT Powered Cooker | Single Jet Burner (Boiling) / 1" Gate Valve | PW60-BSJ-VLV100 | $525.00 | — | $271.13 | $253.87 | 48.4% | Powered pots 18/30/40/60 QT | — |
| 28 | 60 QT Powered Cooker | 6" Banjo Burner - Cooking and Frying / 3/4" Gate Valve | PW60-B6B-VLV075 | $525.00 | — | $271.28 | $253.72 | 48.3% | Powered pots 18/30/40/60 QT | pre-8/30 |
| 29 | 60 QT Powered Cooker | 6" Banjo Burner - Cooking and Frying / 1" Gate Valve | PW60-B6B-VLV100 | $535.00 | — | $273.78 | $261.22 | 48.8% | Powered pots 18/30/40/60 QT | — |
| 30 | 60 Qt Dual Turkey Fryer Pot With Drain Valve / Lid & Turkey Rack | 3/4" Gate Valve | PT60-VLV075-TFR | $495.00 | — | $256.42 | $238.58 | 48.2% | Powered pots 18/30/40/60 QT | pre-8/30 |
| 31 | 60 Qt Dual Turkey Fryer Pot With Drain Valve / Lid & Turkey Rack | 1" Gate Valve | PT60-VLV100-TFR | $505.00 | — | $258.92 | $246.08 | 48.7% | Powered pots 18/30/40/60 QT | — |
| 32 | 120 Quart Powered Seafood/Crawfish Cooker | 3/4" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW120-BTJ-VLV075 | $715.00 | — | $386.69 | $328.31 | 45.9% | 120 QT Powered | — |
| 33 | 120 Quart Powered Seafood/Crawfish Cooker | 1" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW120-BTJ-VLV100 | $725.00 | — | $389.19 | $335.81 | 46.3% | 120 QT Powered | — |
| 34 | 120 Quart Powered Seafood/Crawfish Cooker | 3/4" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW120-B10B-VLV075 | $735.00 | — | $383.61 | $351.39 | 47.8% | 120 QT Powered | pre-8/30 |
| 35 | 120 Quart Powered Seafood/Crawfish Cooker | 1" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW120-B10B-VLV100 | $745.00 | — | $386.11 | $358.89 | 48.2% | 120 QT Powered | — |
| 36 | 120 Quart Powered Seafood/Crawfish Cooker | 1-1/2" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW120-BTJ-VLV150 | $745.00 | — | $397.19 | $347.81 | 46.7% | 120 QT Powered | — |
| 37 | 120 Quart Powered Seafood/Crawfish Cooker | 1-1/2" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW120-B10B-VLV150 | $765.00 | — | $394.11 | $370.89 | 48.5% | 120 QT Powered | — |
| 38 | 120 Quart Powered Seafood/Crawfish Cooker | 3/4" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW120-BMJNG-VLV075 | $775.00 | — | $419.42 | $355.58 | 45.9% | 120 QT Powered | pre-8/30 |
| 39 | 120 Quart Powered Seafood/Crawfish Cooker | 1" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW120-BMJNG-VLV100 | $785.00 | — | $421.92 | $363.08 | 46.3% | 120 QT Powered | — |
| 40 | 120 Quart Powered Seafood/Crawfish Cooker | 1-1/2" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW120-BMJNG-VLV150 | $805.00 | — | $429.92 | $375.08 | 46.6% | 120 QT Powered | — |
| 41 | Boil Boss Combo - Cooling Ring & Thermo Paddle | Black | (none) | $122.50 | $129.98 | $43.39 | $79.11 | 64.6% | Boil Boss accessories | pre-8/30 |
| 42 | Boil Boss Combo - Cooling Ring & Thermo Paddle | Red | (none) | $122.50 | $129.98 | $43.39 | $79.11 | 64.6% | Boil Boss accessories | pre-8/30 |
| 43 | Boil Boss Combo - Cooling Ring & Thermo Paddle | Purple & Gold | (none) | $122.50 | $129.98 | $43.39 | $79.11 | 64.6% | Boil Boss accessories | pre-8/30 |
| 44 | Boil Boss Combo - Cooling Ring & Thermo Paddle | Black & Gold | (none) | $122.50 | $129.98 | $43.39 | $79.11 | 64.6% | Boil Boss accessories | pre-8/30 |
| 45 | Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Red | BoilBoss-Ring-R-SM | $55.99 | — | $14.53 | $41.46 | 74.0% | Boil Boss accessories | — |
| 46 | Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Black | BoilBoss-Ring-B-SM | $55.99 | — | $14.37 | $41.62 | 74.3% | Boil Boss accessories | — |
| 47 | Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Purple & Gold | BoilBoss-Ring-PG-SM | $55.99 | — | $17.97 | $38.02 | 67.9% | Boil Boss accessories | pre-8/30 |
| 48 | Boil Boss Cooling Ring | Small (fits 60 quarts and below) / Black & Gold | BoilBoss-Ring-BG-SM | $55.99 | — | $14.61 | $41.38 | 73.9% | Boil Boss accessories | — |
| 49 | Boil Boss Cooling Ring | Standard (60-120Qt pots) / Red | BoilBoss-Ring-R | $59.99 | — | $14.53 | $45.46 | 75.8% | Boil Boss accessories | — |
| 50 | Boil Boss Cooling Ring | Standard (60-120Qt pots) / Black | BoilBoss-Ring-B | $59.99 | — | $13.95 | $46.04 | 76.7% | Boil Boss accessories | — |
| 51 | Boil Boss Cooling Ring | Standard (60-120Qt pots) / Purple & Gold | BoilBoss-Ring-PG | $59.99 | — | $14.86 | $45.13 | 75.2% | Boil Boss accessories | — |
| 52 | Boil Boss Cooling Ring | Standard (60-120Qt pots) / Black & Gold | BoilBoss-Ring-BG | $59.99 | — | $14.19 | $45.80 | 76.3% | Boil Boss accessories | — |
| 53 | Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Red | BoilBoss-Ring-R-LG | $74.99 | — | $18.50 | $56.49 | 75.3% | Boil Boss accessories | pre-8/30 |
| 54 | Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Black | BoilBoss-Ring-B-LG | $74.99 | — | $16.37 | $58.62 | 78.2% | Boil Boss accessories | pre-8/30 |
| 55 | Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Purple & Gold | BoilBoss-Ring-PG-LG | $74.99 | — | $17.97 | $57.02 | 76.0% | Boil Boss accessories | pre-8/30 |
| 56 | Boil Boss Cooling Ring | Large (fits 120-200qt pots) / Black & Gold | BoilBoss-Ring-BG-LG | $74.99 | — | $16.61 | $58.38 | 77.9% | Boil Boss accessories | pre-8/30 |
| 57 | Boil Boss Thermo Paddle | Default Title | BoilBoss-PDL | $69.99 | — | $25.64 | $44.35 | 63.4% | Boil Boss accessories | — |
| 58 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Black / Original | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 59 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Black / Hot | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 60 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Red / Original | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 61 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Red / Hot | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 62 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Purple & Gold / Original | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 63 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Purple & Gold / Hot | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 64 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Black & Gold / Original | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 65 | Boil Boss Ultimate Combo - 2 Free 4lb Bags of Seasoning | Black & Gold / Hot | (none) | $129.98 | $165.96 | $59.67 | $70.31 | 54.1% | Boil Boss accessories | pre-8/30 |
| 66 | Commercial Cooker Leg Extensions | Default Title | 40-60gal-LegExt | $165.00 | — | $82.50 | $82.50 | 50.0% | Leg extensions | 50%, pre-8/30 |
| 67 | Cooker Leg Extensions for Outdoor Gas Cookers | Default Title | LegExtensions | $119.00 | — | $48.90 | $70.10 | 58.9% | Leg extensions | pre-8/30 |
| 68 | 100 QT Powered Rack Steamer | 2 Racks | PWRS-100-2BSKT | $1,525.00 | — | $814.01 | $710.99 | 46.6% | Steamers (units) | pre-8/30 |
| 69 | 100 QT Powered Rack Steamer | 3 Racks (Add $200) | PWRS-100-3BSKT | $1,725.00 | — | $933.01 | $791.99 | 45.9% | Steamers (units) | — |
| 70 | 28 QT Powered Rack Seafood Steamer | Default Title | PWRS-28 | $1,325.00 | — | $695.67 | $629.33 | 47.5% | Steamers (units) | pre-8/30 |
| 71 | 100 Gallon High Performance Commercial Seafood Boiler | No Baskets / Propane / No | CSC-100GAL | $2,850.00 | — | $1,282.67 | $1567.33 | 55.0% | Commercial (units) | pre-8/30 |
| 72 | 100 Gallon High Performance Commercial Seafood Boiler | No Baskets / Natural Gas - requires 2 lb service / No | CSC-100GAL-NG | $2,950.00 | — | $1,475.00 | $1475.00 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 73 | 100 Gallon High Performance Commercial Seafood Boiler | No Baskets / Propane / Yes - (Add $250) | CSC-100GAL-EIGN | $3,100.00 | — | $1,550.00 | $1550.00 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 74 | 100 Gallon High Performance Commercial Seafood Boiler | No Baskets / Natural Gas - requires 2 lb service / Yes - (Add $250) | CSC-100GAL-NG-EIGN | $3,200.00 | — | $1,600.00 | $1600.00 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 75 | 100 Gallon High Performance Commercial Seafood Boiler | (1) Basket / Propane / No | CSC-100GAL-1BSK | $3,850.00 | — | $2,025.83 | $1824.17 | 47.4% | Commercial (units) | pre-8/30 |
| 76 | 100 Gallon High Performance Commercial Seafood Boiler | (1) Basket / Natural Gas - requires 2 lb service / No | CSC-100GAL-1BSK-NG | $3,950.00 | — | $1,975.00 | $1975.00 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 77 | 100 Gallon High Performance Commercial Seafood Boiler | (1) Basket / Natural Gas - requires 2 lb service / Yes - (Add $250) | CSC-100GAL-1BSK-NG-EIGN | $4,199.00 | — | $2,099.50 | $2099.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 78 | 120 Gallon High Performance Commercial Seafood Boiler | No Baskets / Propane | CSC-120GAL | $3,175.00 | — | $1,346.85 | $1828.15 | 57.6% | Commercial (units) | pre-8/30 |
| 79 | 120 Gallon High Performance Commercial Seafood Boiler | No Baskets / Natural Gas - requires 2 lb service | CSC-120GAL-NG | $3,175.00 | — | $1,587.50 | $1587.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 80 | 120 Gallon High Performance Commercial Seafood Boiler | Single Basket (120 gal) / Propane | CSC-120GAL-1BSKT | $4,175.00 | — | $2,213.54 | $1961.46 | 47.0% | Commercial (units) | pre-8/30 |
| 81 | 120 Gallon High Performance Commercial Seafood Boiler | Single Basket (120 gal) / Natural Gas - requires 2 lb service | CSC-120GAL-1BSKT-NG | $4,175.00 | — | $2,087.50 | $2087.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 82 | 120 Gallon High Performance Commercial Seafood Boiler | Dual Basket (2 X 60 gal each) / Propane | CSC-120GAL-2BSKT | $4,875.00 | — | $2,574.58 | $2300.42 | 47.2% | Commercial (units) | pre-8/30 |
| 83 | 120 Gallon High Performance Commercial Seafood Boiler | Dual Basket (2 X 60 gal each) / Natural Gas - requires 2 lb service | CSC-120GAL-2BSKT-NG | $4,875.00 | — | $2,437.50 | $2437.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 84 | 140 Gallon High Performance Commercial Seafood Boiler | No Baskets / Propane (Included) | CSC-140GAL | $3,875.00 | — | $1,937.50 | $1937.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 85 | 140 Gallon High Performance Commercial Seafood Boiler | No Baskets / Natural Gas - requires 2 lb service | CSC-140GAL-NG | $3,975.00 | — | $1,987.50 | $1987.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 86 | 140 Gallon High Performance Commercial Seafood Boiler | Single Basket (140 gal) / Propane (Included) | CSC-140GAL-1BSKT | $4,875.00 | — | $2,573.69 | $2301.31 | 47.2% | Commercial (units) | pre-8/30 |
| 87 | 140 Gallon High Performance Commercial Seafood Boiler | Single Basket (140 gal) / Natural Gas - requires 2 lb service | CSC-140GAL-1BSKT-NG | $4,975.00 | — | $2,487.50 | $2487.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 88 | 140 Gallon High Performance Commercial Seafood Boiler | Two (70 gal) Baskets / Propane (Included) | CSC-140GAL-2BSKT | $5,675.00 | — | $2,993.15 | $2681.85 | 47.3% | Commercial (units) | pre-8/30 |
| 89 | 140 Gallon High Performance Commercial Seafood Boiler | Two (70 gal) Baskets / Natural Gas - requires 2 lb service | CSC-140GAL-2BSKT-NG | $5,775.00 | — | $2,887.50 | $2887.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 90 | 40 Gallon / 160 Quart Powered Seafood/Crawfish Cooker (Flip Basket) | Triple Jet Burner (High Speed Boiling) | PW160FLP-BTJ-VLV200 | $2,145.00 | — | $1,128.21 | $1016.79 | 47.4% | Commercial (units) | pre-8/30 |
| 91 | 40 Gallon / 160 Quart Powered Seafood/Crawfish Cooker (Flip Basket) | 10" Banjo Burner - (Cooking & Frying) | PW160FLP-B10B-VLV200 | $2,175.00 | — | $1,087.50 | $1087.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 92 | 40 Gallon / 160 Quart Powered Seafood/Crawfish Cooker (Flip Basket) | Triple Jet Natural Gas - requires 2 lb service | PW160FLP-TJNG-VLV200 | $2,245.00 | — | $1,122.50 | $1122.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 93 | 40 Gallon / 160 Quart Powered Seafood/Crawfish Cooker (Flip Basket) | 10" MultiJet Burner (Natural Gas) - (Cooking & Frying) | PW160FLP-BMJNG-VLV200 | $2,279.00 | — | $1,139.50 | $1139.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 94 | 60 Gallon High Performance Commercial Seafood Cooker | Propane / Standard Flip | CSC-60GAL | $2,699.00 | — | $1,322.31 | $1376.69 | 51.0% | Commercial (units) | pre-8/30 |
| 95 | 60 Gallon High Performance Commercial Seafood Cooker | Natural Gas - requires 2 lb service / Standard Flip | CSC-60GAL-NG | $2,799.00 | — | $1,399.50 | $1399.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 96 | 60 Gallon High Performance Commercial Seafood Cooker | Dual Banjo Burner / Standard Flip | CSC-60GAL-DUAL | $2,799.00 | — | $1,399.50 | $1399.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 97 | 60 Gallon High Performance Commercial Seafood Cooker | Propane / Square Lift Out (Non-Flip - Requires Gantry Lift) | CSC-60GAL-SQLO | $2,999.00 | — | $1,595.22 | $1403.78 | 46.8% | Commercial (units) | pre-8/30 |
| 98 | 60 Gallon High Performance Commercial Seafood Cooker | Natural Gas - requires 2 lb service / Square Lift Out (Non-Flip - Requires Gantry Lift) | CSC-60GAL-NG-SQLO | $3,099.00 | — | $1,549.50 | $1549.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 99 | 60 Gallon High Performance Commercial Seafood Cooker | Dual Banjo Burner / Square Lift Out (Non-Flip - Requires Gantry Lift) | CSC-60GAL-DUAL-SQLO | $3,099.00 | — | $1,549.50 | $1549.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 100 | 80 Gallon High Performance Commercial Seafood Boiler | No Baskets / Propane | CSC-80GAL | $2,550.00 | — | $1,169.00 | $1381.00 | 54.2% | Commercial (units) | pre-8/30 |
| 101 | 80 Gallon High Performance Commercial Seafood Boiler | No Baskets / Natural Gas - requires 2 lb service | CSC-80GAL-NG | $2,650.00 | — | $1,325.00 | $1325.00 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 102 | 80 Gallon High Performance Commercial Seafood Boiler | Single Basket / Propane | CSC-80GAL-1BSKT | $3,650.00 | — | $1,931.93 | $1718.07 | 47.1% | Commercial (units) | pre-8/30 |
| 103 | 80 Gallon High Performance Commercial Seafood Boiler | Single Basket / Natural Gas - requires 2 lb service | CSC-80GAL-1BSKT-NG | $3,750.00 | — | $1,875.00 | $1875.00 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 104 | Crawcuzzi - Automatic Crawfish Cleaner | 40 Gallons | CFW40 | $2,465.00 | — | $1,295.11 | $1169.89 | 47.5% | Commercial (units) | pre-8/30 |
| 105 | Crawcuzzi - Automatic Crawfish Cleaner | 60 Gallons | CFW60 | $2,850.00 | — | $1,460.69 | $1389.31 | 48.7% | Commercial (units) | pre-8/30 |
| 106 | Crawcuzzi - Automatic Crawfish Cleaner | 60 Gallons with Square Basket | CFW60sqbskt | $3,150.00 | — | $1,575.00 | $1575.00 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 107 | Crawcuzzi - Automatic Crawfish Cleaner | 80 Gallons | CFW80 | $3,599.00 | — | $1,908.05 | $1690.95 | 47.0% | Commercial (units) | pre-8/30 |
| 108 | Crawcuzzi - Automatic Crawfish Cleaner | 100 Gallons | CFW100 | $3,999.00 | — | $2,127.34 | $1871.66 | 46.8% | Commercial (units) | pre-8/30 |
| 109 | Crawcuzzi - Automatic Crawfish Cleaner | 120 Gallons | CFW120 | $4,275.00 | — | $2,253.75 | $2021.25 | 47.3% | Commercial (units) | pre-8/30 |
| 110 | Crawcuzzi - Automatic Crawfish Cleaner | 140 Gallons | CFW140 | $4,595.00 | — | $2,448.04 | $2146.96 | 46.7% | Commercial (units) | pre-8/30 |
| 111 | Pull Behind Trailer Package - 60 Gallon High Performance Commercial Seafood Cooker | Default Title | PBT-60 | $7,299.00 | — | $3,649.50 | $3649.50 | 50.0% | Commercial (units) | 50%, pre-8/30 |
| 112 | 0 to 10 PSI Propane Regulator w/ 6' Stainless Steel Braided Hose | Default Title | REG-10PSI | $25.99 | — | $8.25 | $17.74 | 68.3% | Not in a requested line | — |
| 113 | 0 to 30 PSI Propane Regulator w/6' Stainless Steel Braided Hose | Default Title | REG-30PSI | $25.99 | — | $8.25 | $17.74 | 68.3% | Not in a requested line | — |
| 114 | 10" Banjo Burner Module - 200K BTU (Cooking & Frying) | Default Title | BG14-B10B-100/120 | $139.00 | — | $46.94 | $92.06 | 66.2% | Not in a requested line | — |
| 115 | 100 Gallon Basket | Default Title | CNC-100GAL-Bskt-Kit | $1,499.00 | — | $775.16 | $723.84 | 48.3% | Not in a requested line | pre-8/30 |
| 116 | 100 Gallon Lid | Default Title | CNC-100GAL-Lid-Kit | $325.00 | — | $159.82 | $165.18 | 50.8% | Not in a requested line | pre-8/30 |
| 117 | 100 QT Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | SFP100-VLV075-SD30 | $364.00 | $670.00 | $330.00 | $34.00 | 9.3% | Not in a requested line | F3 margin <15%, pre-8/30 |
| 118 | 100 QT Cooker - SCRATCH & DENT | Performance (No Burner) / 15% | SFP100-VLV075-SD15 | $442.00 | $670.00 | $330.00 | $112.00 | 25.3% | Not in a requested line | pre-8/30 |
| 119 | 100 QT Cooker - SCRATCH & DENT | Powered (Burner) / 30% | PW100-BTJ-VLV075-SD30 | $469.00 | $670.00 | $330.00 | $139.00 | 29.6% | Not in a requested line | pre-8/30 |
| 120 | 100 QT Cooker - SCRATCH & DENT | Powered (Burner) / 15% | PW100-BTJ-VLV075-SD15 | $569.50 | $670.00 | $330.00 | $239.50 | 42.1% | Not in a requested line | pre-8/30 |
| 121 | 100 QT Powered Seafood Cooker | 3/4" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW100-BTJ-VLV075 | $670.00 | — | $353.53 | $316.47 | 47.2% | Not in a requested line | pre-8/30 |
| 122 | 100 QT Powered Seafood Cooker | 1" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW100-BTJ-VLV100 | $680.00 | — | $356.03 | $323.97 | 47.6% | Not in a requested line | — |
| 123 | 100 QT Powered Seafood Cooker | 3/4" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW100-B10B-VLV075 | $700.00 | — | $350.44 | $349.56 | 49.9% | Not in a requested line | pre-8/30 |
| 124 | 100 QT Powered Seafood Cooker | 1-1/2" Gate Valve / Triple Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW100-BTJ-VLV150 | $700.00 | — | $364.03 | $335.97 | 48.0% | Not in a requested line | — |
| 125 | 100 QT Powered Seafood Cooker | 1" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW100-B10B-VLV100 | $710.00 | — | $352.94 | $357.06 | 50.3% | Not in a requested line | — |
| 126 | 100 QT Powered Seafood Cooker | 3/4" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW100-BMJNG-VLV075 | $725.00 | — | $386.25 | $338.75 | 46.7% | Not in a requested line | pre-8/30 |
| 127 | 100 QT Powered Seafood Cooker | 1" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW100-BMJNG-VLV100 | $735.00 | — | $388.75 | $346.25 | 47.1% | Not in a requested line | — |
| 128 | 100 QT Powered Seafood Cooker | 1-1/2" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW100-B10B-VLV150 | $740.00 | — | $360.94 | $379.06 | 51.2% | Not in a requested line | — |
| 129 | 100 QT Powered Seafood Cooker | 1-1/2" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - (Cooking & Frying) | PW100-BMJNG-VLV150 | $755.00 | — | $396.75 | $358.25 | 47.5% | Not in a requested line | — |
| 130 | 120 Gallon Basket | Single (120 gal) | CNC-120GAL-Bskt-Kit | $1,650.00 | — | $866.69 | $783.31 | 47.5% | Not in a requested line | pre-8/30 |
| 131 | 120 Gallon Basket | Dual (2 X 60 gal) | CNC-120GAL-Dual-Bskt-Kit | $2,199.00 | — | $1,099.50 | $1099.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 132 | 120 Gallon Lid | Default Title | CNC-120GAL-Lid-Kit | $275.00 | — | $151.09 | $123.91 | 45.1% | Not in a requested line | pre-8/30 |
| 133 | 120 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | SFP120-VLV075-SD30 | $406.00 | $705.00 | $350.00 | $56.00 | 13.8% | Not in a requested line | F3 margin <15%, pre-8/30 |
| 134 | 120 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 15% | SFP120-VLV075-SD15 | $493.00 | $705.00 | $350.00 | $143.00 | 29.0% | Not in a requested line | pre-8/30 |
| 135 | 120 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 30% | PW120-BTJ-VLV075-SD30 | $500.50 | $705.00 | $350.00 | $150.50 | 30.1% | Not in a requested line | pre-8/30 |
| 136 | 120 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 15% | PW120-BTJ-VLV075-SD15 | $607.75 | $705.00 | $350.00 | $257.75 | 42.4% | Not in a requested line | — |
| 137 | 140 Gallon Basket | Default Title | CNC-140GAL-Bskt-Kit | $1,799.00 | — | $957.39 | $841.61 | 46.8% | Not in a requested line | pre-8/30 |
| 138 | 140 Gallon Dual Basket (per set) | Default Title | CNC-140GAL-Dual-Bskt-Kit | $2,575.00 | — | $1,287.50 | $1287.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 139 | 140 Gallon Lid | Default Title | CNC-140GAL-Lid-Kit | $295.00 | — | $147.50 | $147.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 140 | 18 QT Basket & Notched Lid | Default Title | 18QT-BSKLID | $61.00 | — | $30.50 | $30.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 141 | 18 QT Fish Fryer / Brazier Pot | No Basket / No Valve | SFPFRBR | $220.00 | — | $110.00 | $110.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 142 | 18 QT Fish Fryer / Brazier Pot | No Basket / 1/4" Valve | SFPFRBR-VLV025 | $235.00 | — | $127.99 | $107.01 | 45.5% | Not in a requested line | pre-8/30 |
| 143 | 18 QT Fish Fryer / Brazier Pot | With Basket / No Valve | SFPFRBR-B | $250.00 | — | $125.00 | $125.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 144 | 18 QT Fish Fryer / Brazier Pot | With Basket / 1/4" Valve | SFPFRBR-VLV025B | $265.00 | — | $132.50 | $132.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 145 | 18 Qt Fish Fryer / Brazier Pot - SCRATCH & DENT | Performance (No Burner) / 30% | SFPFRBR-VLV025B-SD30 | $185.50 | $313.00 | $182.00 | $3.50 | 1.9% | Not in a requested line | F3 margin <15% |
| 146 | 18 Qt Fish Fryer / Brazier Pot - SCRATCH & DENT | Performance (No Burner) / 15% | SFPFRBR-VLV025B-SD15 | $225.25 | $313.00 | $182.00 | $43.25 | 19.2% | Not in a requested line | — |
| 147 | 18 Qt Fish Fryer / Brazier Pot - SCRATCH & DENT | Powered (Burner) / 30% | PWFRBR-VLV025B-SD30 | $238.00 | $313.00 | $182.00 | $56.00 | 23.5% | Not in a requested line | — |
| 148 | 18 Qt Fish Fryer / Brazier Pot - SCRATCH & DENT | Powered (Burner) / 15% | PWFRBR-VLV025B-SD15 | $289.00 | $313.00 | $182.00 | $107.00 | 37.0% | Not in a requested line | — |
| 149 | 20" Heavy Duty Chrome Plated Wire Mesh Skimmer | Default Title | SC-7R | $9.99 | — | $3.55 | $6.44 | 64.5% | Not in a requested line | — |
| 150 | 21" Spiral Wire Mesh Skimmer | Default Title | SCF-9 | $13.99 | — | $7.00 | $6.99 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 151 | 3 Jet Burner Module - 375K BTU (High Speed Boiling) | Default Title | BTJ-100/120 | $109.00 | — | $50.02 | $58.98 | 54.1% | Not in a requested line | — |
| 152 | 30 QT Performance Seafood/Stock Pot | Default Title | PT30-VLV075 | $335.00 | — | $177.05 | $157.95 | 47.1% | Not in a requested line | pre-8/30 |
| 153 | 30 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | PT30-VLV075-SD30 | $234.50 | $395.00 | $215.00 | $19.50 | 8.3% | Not in a requested line | F3 margin <15%, pre-8/30 |
| 154 | 30 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 15% | PT30-VLV075-SD15 | $284.75 | $395.00 | $215.00 | $69.75 | 24.5% | Not in a requested line | pre-8/30 |
| 155 | 30 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 30% | PW30-VLV075-TFRB-SD30 | $332.50 | $395.00 | $215.00 | $117.50 | 35.3% | Not in a requested line | pre-8/30 |
| 156 | 30 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 15% | PW30-VLV075-TFRB-SD15 | $403.75 | $395.00 | $215.00 | $188.75 | 46.7% | Not in a requested line | — |
| 157 | 32 Tip MultiJet Natural Gas Burner Module - 160K BTU | Default Title | BMJNG-100/120 | $142.00 | — | $88.00 | $54.00 | 38.0% | Not in a requested line | — |
| 158 | 36" Stainless Steel Paddle | Default Title | KK-3604 | $21.99 | — | $15.63 | $6.36 | 28.9% | Not in a requested line | — |
| 159 | 4-Basket Fryer / Boiler | Default Title | (none) | $2,000.00 | — | $1,000.00 | $1000.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 160 | 4-Way 20 QT Fryer | None | PW4WFR | $379.99 | — | $190.00 | $189.99 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 161 | 4-Way 20 QT Fryer | 1/4" Valve | PW4WFR-VLV025 | $396.99 | — | $211.24 | $185.75 | 46.8% | Not in a requested line | pre-8/30 |
| 162 | 4-Way Fryer / Pasta Cooker | None | PT4WFR | $277.99 | — | $151.38 | $126.61 | 45.5% | Not in a requested line | — |
| 163 | 4-Way Fryer / Pasta Cooker | 1/4" Valve | PT4WFR-VLV025 | $299.99 | — | $160.38 | $139.61 | 46.5% | Not in a requested line | pre-8/30 |
| 164 | 40 / 60 Gallon Lid Support Brackets | 40 Gallon | CNC-40GAL-Lid-Brkt | $46.00 | — | $23.00 | $23.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 165 | 40 / 60 Gallon Lid Support Brackets | 60 Gallon | CNC-60GAL-Lid-Brkt | $58.00 | — | $29.00 | $29.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 166 | 40 Gallon Basket | Default Title | CNC-40GAL-Bskt-Kit | $510.00 | — | $267.06 | $242.94 | 47.6% | Not in a requested line | pre-8/30 |
| 167 | 40 Gallon Cleaner Cover | Default Title | CNC-40GAL-Cleaner-Cover-Kit | $250.00 | — | $125.00 | $125.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 168 | 40 Gallon Lid | Default Title | CNC-40GAL-Lid-Kit | $250.00 | — | $105.81 | $144.19 | 57.7% | Not in a requested line | pre-8/30 |
| 169 | 40 QT Sauce Stock Pot | None (Subtract $18) | PT40SA | $258.00 | — | $101.03 | $156.97 | 60.8% | Not in a requested line | — |
| 170 | 40 QT Sauce Stock Pot | 3/4" Gate Valve | PT40SA-VLV075 | $276.00 | — | $110.03 | $165.97 | 60.1% | Not in a requested line | pre-8/30 |
| 171 | 58OZ Cast Aluminum Scoop | Default Title | AS-58 | $14.99 | — | $7.50 | $7.49 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 172 | 6" Banjo Burner Module (Cooking & Frying) | Default Title | BG12-B6B-60to18 | $74.00 | — | $38.02 | $35.98 | 48.6% | Not in a requested line | — |
| 173 | 60 Gallon Basket | Default Title | CNC-60GAL-Bskt-Kit | $650.00 | — | $324.58 | $325.42 | 50.1% | Not in a requested line | pre-8/30 |
| 174 | 60 Gallon Lid | Default Title | CNC-60GAL-Lid-Kit | $275.00 | — | $119.59 | $155.41 | 56.5% | Not in a requested line | pre-8/30 |
| 175 | 60 Gallon Lid Dump Guide Rails | Default Title | 60GAL-LidRails | $75.00 | — | $26.00 | $49.00 | 65.3% | Not in a requested line | — |
| 176 | 60 Gallon Square Basket | Default Title | CNC-60GAL-SqBskt-Kit | $1,199.00 | — | $585.48 | $613.52 | 51.2% | Not in a requested line | pre-8/30 |
| 177 | 60 QT Performance Seafood/Stock Pot | Default Title | PT60-VLV075 | $395.00 | — | $204.91 | $190.09 | 48.1% | Not in a requested line | pre-8/30 |
| 178 | 60 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | PT60-VLV050-SD30 | $276.50 | $495.00 | $138.25 | $138.25 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 179 | 60 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 15% | PT60-VLV050-SD15 | $335.75 | $495.00 | $167.88 | $167.87 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 180 | 60 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 30% | PW60-BSJ-VLV050-SD30 | $367.50 | $495.00 | $183.75 | $183.75 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 181 | 60 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 15% | PW60-BSJ-VLV050-SD15 | $446.25 | $495.00 | $223.13 | $223.12 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 182 | 80 Gallon Basket | Default Title | CNC-80GAL-Bskt-Kit | $1,399.00 | — | $730.93 | $668.07 | 47.8% | Not in a requested line | pre-8/30 |
| 183 | 80 Gallon Lid | Default Title | CNC-80GAL-Lid-Kit | $300.00 | — | $152.66 | $147.34 | 49.1% | Not in a requested line | pre-8/30 |
| 184 | 80 Gallon Quad Basket (4 per set) | Default Title | CNC-80GAL-QuadBskt-Kit | $2,499.00 | — | $1,304.32 | $1194.68 | 47.8% | Not in a requested line | pre-8/30 |
| 185 | 80 QT Powered Seafood Cooker | 3/4" Gate Valve / Double Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW80-BDJ-VLV075 | $630.00 | — | $331.76 | $298.24 | 47.3% | Not in a requested line | pre-8/30 |
| 186 | 80 QT Powered Seafood Cooker | 1" Gate Valve / Double Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW80-BDJ-VLV100 | $640.00 | — | $334.26 | $305.74 | 47.8% | Not in a requested line | — |
| 187 | 80 QT Powered Seafood Cooker | 3/4" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW80-B10B-VLV075 | $655.00 | — | $326.96 | $328.04 | 50.1% | Not in a requested line | pre-8/30 |
| 188 | 80 QT Powered Seafood Cooker | 1-1/2" Gate Valve / Double Jet Burner (High Speed Boiling)(Estimated Boil Time- 7 Minutes) | PW80-BDJ-VLV150 | $660.00 | — | $342.26 | $317.74 | 48.1% | Not in a requested line | — |
| 189 | 80 QT Powered Seafood Cooker | 3/4" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - Cooking & Frying) | PW80-BMJNG-VLV075 | $665.00 | — | $362.77 | $302.23 | 45.4% | Not in a requested line | pre-8/30 |
| 190 | 80 QT Powered Seafood Cooker | 1" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW80-B10B-VLV100 | $665.00 | — | $329.46 | $335.54 | 50.5% | Not in a requested line | — |
| 191 | 80 QT Powered Seafood Cooker | 1" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - Cooking & Frying) | PW80-BMJNG-VLV100 | $675.00 | — | $365.27 | $309.73 | 45.9% | Not in a requested line | — |
| 192 | 80 QT Powered Seafood Cooker | 1-1/2" Gate Valve / 10" Banjo Burner - (Slow Cooking & Frying) | PW80-B10B-VLV150 | $685.00 | — | $337.46 | $347.54 | 50.7% | Not in a requested line | — |
| 193 | 80 QT Powered Seafood Cooker | 1-1/2" Gate Valve / 32- tip Multi-Jet Burner (Natural Gas) - Cooking & Frying) | PW80-BMJNG-VLV150 | $695.00 | — | $373.27 | $321.73 | 46.3% | Not in a requested line | — |
| 194 | 80 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 30% | SFP80-VLV075-SD30 | $346.50 | $625.00 | $300.00 | $46.50 | 13.4% | Not in a requested line | F3 margin <15%, pre-8/30 |
| 195 | 80 Qt Cooker - SCRATCH & DENT | Performance (No Burner) / 15% | SFP80-VLV075-SD15 | $420.75 | $625.00 | $300.00 | $120.75 | 28.7% | Not in a requested line | pre-8/30 |
| 196 | 80 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 30% | PW80-BDJ-VLV075-SD30 | $441.00 | $625.00 | $300.00 | $141.00 | 32.0% | Not in a requested line | pre-8/30 |
| 197 | 80 Qt Cooker - SCRATCH & DENT | Powered (Burner) / 15% | PW80-BDJ-VLV075-SD15 | $535.50 | $625.00 | $300.00 | $235.50 | 44.0% | Not in a requested line | pre-8/30 |
| 198 | Add a Custom Logo | Default Title | CSLOGO | $75.00 | — | $60.00 | $15.00 | 20.0% | Not in a requested line | — |
| 199 | Banners | 1.7' x 3' | MKT-BNR-DS-2-3 | $0.00 | $50.00 | $43.98 | — | — | Not in a requested line | F2 cost≥price, pre-8/30 |
| 200 | Banners | 2.5' x 6' | MKT-BNR-DS-2-6 | $0.01 | $110.00 | $98.20 | $-98.19 | -981900.0% | Not in a requested line | F2 cost≥price, pre-8/30 |
| 201 | Basket Buddy | Pickup or Ship (with other products in cart) | BB-BasketBuddy | $10.50 | — | $5.35 | $5.15 | 49.0% | Not in a requested line | — |
| 202 | Basket Buddy | Ship Solo (Only product in cart) | BB-BasketBuddy-ShipSolo | $15.99 | — | $5.10 | $10.89 | 68.1% | Not in a requested line | pre-8/30 |
| 203 | Bayou Classic Perforated Aluminum Skimmer | Default Title | BC-0618 | $19.99 | — | $10.86 | $9.13 | 45.7% | Not in a requested line | — |
| 204 | Bayou Classic Stainless Steel Brew Paddle with Bottle Opener | Default Title | BC-1051 | $9.99 | — | $5.00 | $4.99 | 49.9% | Not in a requested line | 50%, pre-8/30 |
| 205 | Bayou Classic WOODEN Cajun Stir Paddle | Default Title | BC-1001 | $19.99 | — | $11.29 | $8.70 | 43.5% | Not in a requested line | — |
| 206 | Boil Boss - Foundation Boil Seasoning - 20 lb Bulk (5 - 4lb bags) 25% Savings | Original | BoilBoss-Seasoning-20lb | $67.46 | — | $40.70 | $26.76 | 39.7% | Not in a requested line | pre-8/30 |
| 207 | Boil Boss - Foundation Boil Seasoning - 20 lb Bulk (5 - 4lb bags) 25% Savings | Hot | BoilBoss-Seasoning-Hot-20lb | $67.46 | — | $44.25 | $23.21 | 34.4% | Not in a requested line | pre-8/30 |
| 208 | Boil Boss - Ignitor Replacement | Default Title | (none) | $0.00 | — | $25.00 | — | — | Not in a requested line | F2 cost≥price |
| 209 | Boil Boss - Remote Replacement | Default Title | (none) | $0.00 | — | $17.00 | — | — | Not in a requested line | F2 cost≥price |
| 210 | Boil Boss Seasoning | Original / 1 lb | BoilBoss-Seasoning-1lb | $5.99 | — | $2.15 | $3.84 | 64.1% | Not in a requested line | — |
| 211 | Boil Boss Seasoning | Hot / 1 lb | BoilBoss-Seasoning-Hot-1lb | $5.99 | — | $2.32 | $3.67 | 61.3% | Not in a requested line | — |
| 212 | Boil Boss Seasoning | Original / 4 lb | BoilBoss-Seasoning-4lb | $17.99 | — | $8.21 | $9.78 | 54.4% | Not in a requested line | — |
| 213 | Boil Boss Seasoning | Hot / 4 lb | BoilBoss-Seasoning-Hot-4lb | $17.99 | — | $8.89 | $9.10 | 50.6% | Not in a requested line | — |
| 214 | Boil Boss Thermometer Replacement | Default Title | BoilBoss-Pdl-Thermometer | $0.00 | — | $4.25 | — | — | Not in a requested line | F2 cost≥price |
| 215 | Boil Boss Triple Jet Burner (Centering Brackets - Set of 3) | Default Title | TJB_CB | $35.00 | — | $12.50 | $22.50 | 64.3% | Not in a requested line | pre-8/30 |
| 216 | Cajun Cleaner | Blue | CC-B | $118.95 | — | $75.00 | $43.95 | 36.9% | Not in a requested line | pre-8/30 |
| 217 | Cajun Cleaner | Orange | CC-O | $118.95 | — | $75.00 | $43.95 | 36.9% | Not in a requested line | pre-8/30 |
| 218 | Cajun Cleaner | Red | CC-R | $118.95 | — | $75.00 | $43.95 | 36.9% | Not in a requested line | pre-8/30 |
| 219 | Cajun Cleaner | Purple & Gold | CC-PG | $118.95 | — | $75.00 | $43.95 | 36.9% | Not in a requested line | pre-8/30 |
| 220 | Cajun Cleaner | Black & Gold | CC-BG | $118.95 | — | $75.00 | $43.95 | 36.9% | Not in a requested line | pre-8/30 |
| 221 | Cajun Cleaner | Red, White and Blue | CC-AF | $118.95 | — | $75.00 | $43.95 | 36.9% | Not in a requested line | — |
| 222 | Commercial Basket - Steamer Shelf | 40 Gallon - Lower Shelf (Bolted) | CNC-40gal-StmPlt | $175.00 | — | $69.42 | $105.58 | 60.3% | Not in a requested line | — |
| 223 | Commercial Basket - Steamer Shelf | 40 Gallon - Upper Shelf (Drop In) | CNC-40gal-StmPlt-Upper | $190.00 | — | $117.45 | $72.55 | 38.2% | Not in a requested line | — |
| 224 | Commercial Basket - Steamer Shelf | 60 Gallon - Lower Shelf (Bolted) | CNC-60gal-StmPlt | $195.00 | — | $99.11 | $95.89 | 49.2% | Not in a requested line | — |
| 225 | Commercial Basket - Steamer Shelf | 60 Gallon - Upper Shelf (Drop In) | CNC-60gal-StmPlt-Upper | $210.00 | — | $160.81 | $49.19 | 23.4% | Not in a requested line | — |
| 226 | Commercial Burner Modules | 40 Gallon / Propane - Jet Burner | CS-Jet-40G | $210.00 | — | $105.00 | $105.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 227 | Commercial Burner Modules | 40 Gallon / Propane - Banjo Burner | CS-BNJ-40G | $250.00 | — | $125.00 | $125.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 228 | Commercial Burner Modules | 40 Gallon / NG - Jet Burner | CS-Jet-NG-40G | $300.00 | — | $150.00 | $150.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 229 | Commercial Burner Modules | 60 Gallon or Larger / Propane - Jet Burner | CS-Jet | $300.00 | — | $150.00 | $150.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 230 | Commercial Burner Modules | 40 Gallon / NG - Banjo Burner | CS-BNJMTJ-NG-40G | $335.00 | — | $167.50 | $167.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 231 | Commercial Burner Modules | 60 Gallon or Larger / Propane - Banjo Burner | CS-BNJ | $345.00 | — | $172.50 | $172.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 232 | Commercial Burner Modules | 60 Gallon or Larger / NG - Jet Burner | CS-Jet-NG | $400.00 | — | $200.00 | $200.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 233 | Commercial Burner Modules | 60 Gallon or Larger / NG - Banjo Burner | CS-BNJMTJ-NG | $445.00 | — | $222.50 | $222.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 234 | Commercial Burner Modules | 60 Gallon or Larger / Propane - Dual Burner | CS-BNJ-DUAL | $630.00 | — | $315.00 | $315.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 235 | Commercial Burner Modules | 60 Gallon or Larger / NG - Dual Burner | CS-BNJMTJ-NG-DUAL | $730.00 | — | $365.00 | $365.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 236 | Commercial Cooker Metal Wheels (Set of 2) | Default Title | CS-WHEELS | $250.00 | — | $125.00 | $125.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 237 | Commercial Duty 0 to 30 Psi PLATINUM Propane Regulator | Default Title | REG-30PSI-PLAT-6 | $78.00 | — | $39.00 | $39.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 238 | Cooker Selection Chart | 11" x 17" | MKT-CCC-11-17 | $0.00 | $21.49 | $25.00 | — | — | Not in a requested line | F2 cost≥price |
| 239 | Cooker Selection Chart | 18" x 24" | MKT-CCC-18-24 | $0.00 | $47.99 | $32.00 | — | — | Not in a requested line | F2 cost≥price |
| 240 | Crawcuzzi Basket Chute | 40 Gallon | CNC-40Gal-Chute | $85.00 | — | $42.50 | $42.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 241 | Crawcuzzi Basket Chute | 60 Gallon | CNC-60Gal-Chute | $115.00 | — | $57.50 | $57.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 242 | Crawfish Dusting Table | Default Title | DT-40 | $575.00 | — | $287.50 | $287.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 243 | Crawfish Serving Trough | HPC Logo / Mini | ACC-CRWTRGH-MINI | $134.99 | — | $96.83 | $38.16 | 28.3% | Not in a requested line | pre-8/30 |
| 244 | Crawfish Serving Trough | Yes - (Add $75) email us your logo / Mini | ACC-CRWTRGH-CSLOGO-MINI | $209.99 | — | $66.50 | $143.49 | 68.3% | Not in a requested line | — |
| 245 | Crawfish Serving Trough | HPC Logo / Large | ACC-CRWTRGH | $239.99 | — | $75.00 | $164.99 | 68.7% | Not in a requested line | — |
| 246 | Crawfish Serving Trough | Yes - (Add $75) email us your logo / Large | ACC-CRWTRGH-CSLOGO | $314.99 | — | $75.00 | $239.99 | 76.2% | Not in a requested line | — |
| 247 | Crawfish Sorting Table | Default Title | CSTable | $550.00 | — | $275.00 | $275.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 248 | Custom Cooking Trailer | Default Title | (none) | $0.00 | — | $0.00 | — | — | Not in a requested line | F1 $0 cost, pre-8/30 |
| 249 | Custom Labor | Default Title | CUSTOM-Labor | $30.00 | — | $30.00 | $0.00 | 0.0% | Not in a requested line | F2 cost≥price |
| 250 | Custom Product | Default Title | CUST-Product | $10.00 | — | $5.00 | $5.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 251 | Double Jet Burner Module - 80 QT - 250K BTU (High Speed Boiling) | Default Title | BDJ-80 | $89.00 | — | $44.50 | $44.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 252 | Electronic Ignition | Default Title | ELEC-IGN | $250.00 | — | $125.00 | $125.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 253 | Extra Commercial Baskets | 60 Gallon | BSKT-60G | $875.00 | — | $324.58 | $550.42 | 62.9% | Not in a requested line | — |
| 254 | Extra Commercial Baskets | 80 Gallon | BSKT-80G | $1,075.00 | — | $730.93 | $344.07 | 32.0% | Not in a requested line | — |
| 255 | Extra Commercial Baskets | 100 Gallon | BSKT-100G | $1,175.00 | — | $775.16 | $399.84 | 34.0% | Not in a requested line | — |
| 256 | Extra Commercial Baskets | 120 Gallon | BSKT-120G | $1,385.00 | — | $866.69 | $518.31 | 37.4% | Not in a requested line | — |
| 257 | Extra Commercial Baskets | 140 Gallon | BSKT-140G | $1,785.00 | — | $957.39 | $827.61 | 46.4% | Not in a requested line | — |
| 258 | Extra Commercial Baskets | 140 Gallon (Dual Set) | BSKT-140G-DUAL | $2,425.00 | — | $1,312.85 | $1112.15 | 45.9% | Not in a requested line | — |
| 259 | Extra length Premium Regulator Hose | 6' | RH-6ft | $19.99 | — | $10.00 | $9.99 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 260 | Extra length Premium Regulator Hose | 10' | RH-10ft | $29.99 | — | $16.98 | $13.01 | 43.4% | Not in a requested line | — |
| 261 | Extra length Premium Regulator Hose | 15' | RH-15ft | $34.99 | — | $18.95 | $16.04 | 45.8% | Not in a requested line | — |
| 262 | Foam Boards | 18" x 24" | MKT-FB-18-24 | $0.01 | $45.00 | $39.00 | $-38.99 | -389900.0% | Not in a requested line | F2 cost≥price, pre-8/30 |
| 263 | Foam Boards | 24" x 48" | MKT-FB-24-48 | $0.01 | $80.00 | $71.00 | $-70.99 | -709900.0% | Not in a requested line | F2 cost≥price, pre-8/30 |
| 264 | Freight | Default Title | FREIGHT | $5.00 | — | $2.50 | $2.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 265 | Gantry Lift System | Ceiling Mount / None | GLS-C | $785.00 | — | $392.50 | $392.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 266 | Gantry Lift System | Ceiling Mount / 1 Motorized Hoist | GLS-C-1M | $1,325.00 | — | $662.50 | $662.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 267 | Gantry Lift System | Ceiling Mount / 2 Motorized Hoists | GLS-C-2M | $1,725.00 | — | $862.50 | $862.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 268 | Gantry Lift System | Self Standing Floor / None | GLS | $2,215.00 | — | $1,107.50 | $1107.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 269 | Gantry Lift System | Self Standing Floor / 1 Motorized Hoist | GLS-1M | $2,825.00 | — | $1,412.50 | $1412.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 270 | Gantry Lift System | Self Standing Floor / 2 Motorized Hoists | GLS-2M | $3,215.00 | — | $1,607.50 | $1607.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 271 | Gift Card | $25.00 | GIFT25 | $25.00 | — | $13.50 | $11.50 | 46.0% | Not in a requested line | — |
| 272 | Gift Card | $50.00 | GIFT50 | $50.00 | — | $27.00 | $23.00 | 46.0% | Not in a requested line | — |
| 273 | Gift Card | $100.00 | GIFT100 | $100.00 | — | $54.00 | $46.00 | 46.0% | Not in a requested line | — |
| 274 | Gift Card | $250.00 | GIFT200 | $250.00 | — | $135.00 | $115.00 | 46.0% | Not in a requested line | — |
| 275 | Gift Card | $500.00 | GIFT500 | $500.00 | — | $270.00 | $230.00 | 46.0% | Not in a requested line | — |
| 276 | Grey Shrimp Tee | Medium / Short Sleeve | BoilBoss-ShirtSS-Gray-M | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 277 | Grey Shrimp Tee | Medium / Long Sleeve | BoilBoss-ShirtLS-Gray-M | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 278 | Grey Shrimp Tee | Large / Short Sleeve | BoilBoss-ShirtSS-Gray-L | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 279 | Grey Shrimp Tee | Large / Long Sleeve | BoilBoss-ShirtLS-Gray-L | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 280 | Grey Shrimp Tee | XL / Short Sleeve | BoilBoss-ShirtSS-Gray-XL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 281 | Grey Shrimp Tee | XL / Long Sleeve | BoilBoss-ShirtLS-Gray-XL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 282 | Grey Shrimp Tee | 2 XL / Short Sleeve | BoilBoss-ShirtSS-Gray-XXL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 283 | Grey Shrimp Tee | 2 XL / Long Sleeve | BoilBoss-ShirtLS-Gray-XXL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 284 | HP Cookers 20 OZ Cup | Default Title | RR-TUMBLER-CUP20-BLACK | $24.99 | — | $12.50 | $12.49 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 285 | HP Cookers 32 OZ Cup | Default Title | RR-TUMBLER-CUP32-BLACK | $29.99 | — | $15.00 | $14.99 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 286 | HP Cookers 36 OZ Bottle | Default Title | RR-TUMBLER-BOT36-BLACK | $34.99 | — | $17.50 | $17.49 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 287 | HP Cookers Logo Hat | Leather Patch - Black | HAT-L-BLK | $40.00 | — | $20.00 | $20.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 288 | HP Cookers Logo Hat | Leather Patch - Black/Gray | HAT-L-BLKGRY | $40.00 | — | $20.00 | $20.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 289 | HP Cookers Logo Hat | Color PVC Patch - Black | HAT-PVC-BLK | $42.00 | — | $21.00 | $21.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 290 | HP Cookers Logo Hat | Color PVC Patch - Black/Gray | HAT-PVC-BLKGRY | $42.00 | — | $21.00 | $21.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 291 | HPC Heavy Duty Aluminum Paddle | Default Title | CNC- HPCPADDLE | $85.00 | — | $50.48 | $34.52 | 40.6% | Not in a requested line | — |
| 292 | Install Tunnel Tube Bottom | 120QT or smaller | TT-Install-Round | $225.00 | — | $112.50 | $112.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 293 | Install Tunnel Tube Bottom | 60 gallon | TT-Install-60 | $450.00 | — | $225.00 | $225.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 294 | Install Tunnel Tube Bottom | 100 gallon | TT-Install-100 | $875.00 | — | $437.50 | $437.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 295 | Install Tunnel Tube Bottom | 140 gallon | TT-Install-140 | $1,100.00 | — | $550.00 | $550.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 296 | Light Blue Fish Tee | Medium | BoilBoss-ShirtSS-Blue-M | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 297 | Light Blue Fish Tee | Large | BoilBoss-ShirtSS-Blue-L | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 298 | Light Blue Fish Tee | XL | BoilBoss-ShirtSS-Blue-XL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 299 | Light Blue Fish Tee | 2 XL | BoilBoss-ShirtSS-Blue-XXL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 300 | Navimow Access+ | Default Title | NaviMow-Access | $149.99 | — | $83.99 | $66.00 | 44.0% | Not in a requested line | pre-8/30 |
| 301 | Navimow Garage | Small (for i Series) | Navimow-G-S | $199.99 | — | $129.35 | $70.64 | 35.3% | Not in a requested line | pre-8/30 |
| 302 | Navimow Garage | Medium (for H Series) | Navimow-G-M | $249.99 | — | $154.38 | $95.61 | 38.2% | Not in a requested line | pre-8/30 |
| 303 | Navimow Garage | Large (for X3 Series) | Navimow-G-L | $299.99 | — | $179.40 | $120.59 | 40.2% | Not in a requested line | pre-8/30 |
| 304 | Navimow Garage | X Garage (for X4 Series | Navimow-G-X | $349.99 | — | $129.35 | $220.64 | 63.0% | Not in a requested line | pre-8/30 |
| 305 | Navimow I Series Robotic Lawn Mower | Navimow i105 / .15 acre | NaviMow-i105 | $799.00 | — | $699.30 | $99.70 | 12.5% | Not in a requested line | F3 margin <15%, pre-8/30 |
| 306 | Navimow I Series Robotic Lawn Mower | Navimow i110 / .25 acre | NaviMow-i110 | $1,099.00 | — | $909.30 | $189.70 | 17.3% | Not in a requested line | pre-8/30 |
| 307 | Navimow I Series Robotic Lawn Mower | Navimow i210 AWD / .25 acre | (none) | $1,299.00 | — | $699.30 | $599.70 | 46.2% | Not in a requested line | pre-8/30 |
| 308 | Navimow I Series Robotic Lawn Mower | Navimow i215 LiDAR / .37 acre | (none) | $1,599.00 | — | $699.30 | $899.70 | 56.3% | Not in a requested line | pre-8/30 |
| 309 | Navimow Mow Gate | Default Title | Navimow-MowGate | $449.99 | — | $314.99 | $135.00 | 30.0% | Not in a requested line | pre-8/30 |
| 310 | Navimow X Series Robotic Lawn Mower | Navimow X315 / 0.5 acre | NaviMow-x315 | $2,299.00 | — | $1,903.32 | $395.68 | 17.2% | Not in a requested line | pre-8/30 |
| 311 | Navimow X Series Robotic Lawn Mower | Navimow X330 / 1 acre | NaviMow-x330 | $2,799.00 | — | $1,903.32 | $895.68 | 32.0% | Not in a requested line | pre-8/30 |
| 312 | Navimow X Series Robotic Lawn Mower | Navimow X350 / 1.5 acre | NaviMow-x350 | $3,499.00 | — | $1,903.32 | $1595.68 | 45.6% | Not in a requested line | pre-8/30 |
| 313 | Navimow X Series Robotic Lawn Mower | Navimow X390 / 2.5 acre | NaviMow-x390 | $4,999.00 | — | $1,903.32 | $3095.68 | 61.9% | Not in a requested line | pre-8/30 |
| 314 | Navimow X430 Series Robotic Lawn Mower | Navimow X430/ 1 acre | NaviMow-x430 | $2,499.00 | — | $1,859.00 | $640.00 | 25.6% | Not in a requested line | pre-8/30 |
| 315 | Navimow X430 Series Robotic Lawn Mower | Navimow X450 / 1.5 acre | NaviMow-x450 | $2,999.00 | — | $2,229.00 | $770.00 | 25.7% | Not in a requested line | pre-8/30 |
| 316 | Original Hats | Red | BoilBoss-Hat-Red | $20.00 | $25.00 | $10.50 | $9.50 | 47.5% | Not in a requested line | pre-8/30 |
| 317 | Original Hats | Green | BoilBoss-Hat-Green | $20.00 | $25.00 | $10.50 | $9.50 | 47.5% | Not in a requested line | pre-8/30 |
| 318 | Original Hats | Khaki | BoilBoss-Hat-Tan | $20.00 | $25.00 | $10.50 | $9.50 | 47.5% | Not in a requested line | pre-8/30 |
| 319 | Performance Boiling Pots (60QT to 120QT) | 60 QT / None - (Subtract $18) | PT60-WEBDup | $377.00 | — | $188.50 | $188.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 320 | Performance Boiling Pots (60QT to 120QT) | 60 QT / 3/4" Gate Valve | PT60-VLV075-WEBDup | $395.00 | — | $197.50 | $197.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 321 | Performance Boiling Pots (60QT to 120QT) | 80 QT / None - (Subtract $18) | SFP80-WEBDup | $477.00 | — | $238.50 | $238.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 322 | Performance Boiling Pots (60QT to 120QT) | 80 QT / 3/4" Gate Valve | SFP80-VLV075-WEBDup | $495.00 | — | $247.50 | $247.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 323 | Performance Boiling Pots (60QT to 120QT) | 100 QT / None - (Subtract $18) | SFP100-WEBDup | $502.00 | — | $251.00 | $251.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 324 | Performance Boiling Pots (60QT to 120QT) | 80 QT / 1" Gate Valve - (Add $10) | SFP80-VLV100-WEBDup | $505.00 | — | $252.50 | $252.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 325 | Performance Boiling Pots (60QT to 120QT) | 100 QT / 3/4" Gate Valve | SFP100-VLV075-WEBDup | $520.00 | — | $260.00 | $260.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 326 | Performance Boiling Pots (60QT to 120QT) | 80 QT / 1 1/2" Gate Valve - (Add $30) | SFP80-VLV150-WEBDup | $525.00 | — | $262.50 | $262.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 327 | Performance Boiling Pots (60QT to 120QT) | 100 QT / 1" Gate Valve - (Add $10) | SFP100-VLV100-WEBDup | $530.00 | — | $265.00 | $265.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 328 | Performance Boiling Pots (60QT to 120QT) | 120 QT / None - (Subtract $18) | SFP120-WEBDup | $532.00 | — | $266.00 | $266.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 329 | Performance Boiling Pots (60QT to 120QT) | 100 QT / 1 1/2" Gate Valve - (Add $30) | SFP100-VLV150-WEBDup | $550.00 | — | $275.00 | $275.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 330 | Performance Boiling Pots (60QT to 120QT) | 120 QT / 3/4" Gate Valve | SFP120-VLV075-WEBDup | $550.00 | — | $275.00 | $275.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 331 | Performance Boiling Pots (60QT to 120QT) | 120 QT / 1" Gate Valve - (Add $10) | SFP120-VLV100-WEBDup | $560.00 | — | $280.00 | $280.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 332 | Performance Boiling Pots (60QT to 120QT) | 120 QT / 1 1/2" Gate Valve - (Add $30) | SFP120-VLV150-WEBDup | $580.00 | — | $290.00 | $290.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 333 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 60 QT / None - (Subtract $18) | (none) | $737.00 | $955.00 | $418.50 | $318.50 | 43.2% | Not in a requested line | pre-8/30 |
| 334 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 60 QT / 3/4" Gate Valve | B-P80QT-BBTJ-VLV075 | $755.00 | $955.00 | $427.50 | $327.50 | 43.4% | Not in a requested line | pre-8/30 |
| 335 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 60 QT / 1" Gate Valve - (Add $10) | (none) | $765.00 | $955.00 | $432.50 | $332.50 | 43.5% | Not in a requested line | pre-8/30 |
| 336 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 60 QT / 1 1/2" Gate Valve - (Add $30) | (none) | $785.00 | $955.00 | $442.50 | $342.50 | 43.6% | Not in a requested line | pre-8/30 |
| 337 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 80 QT / None - (Subtract $18) | (none) | $837.00 | $955.00 | $468.50 | $368.50 | 44.0% | Not in a requested line | pre-8/30 |
| 338 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 80 QT / 3/4" Gate Valve | (none) | $855.00 | $955.00 | $477.50 | $377.50 | 44.2% | Not in a requested line | pre-8/30 |
| 339 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 100 QT / None - (Subtract $18) | (none) | $862.00 | $955.00 | $481.00 | $381.00 | 44.2% | Not in a requested line | pre-8/30 |
| 340 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 80 QT / 1" Gate Valve - (Add $10) | (none) | $865.00 | $955.00 | $482.50 | $382.50 | 44.2% | Not in a requested line | pre-8/30 |
| 341 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 100 QT / 3/4" Gate Valve | (none) | $880.00 | $955.00 | $490.00 | $390.00 | 44.3% | Not in a requested line | pre-8/30 |
| 342 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 80 QT / 1 1/2" Gate Valve - (Add $30) | (none) | $885.00 | $955.00 | $492.50 | $392.50 | 44.4% | Not in a requested line | pre-8/30 |
| 343 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 100 QT / 1" Gate Valve - (Add $10) | (none) | $890.00 | $955.00 | $495.00 | $395.00 | 44.4% | Not in a requested line | pre-8/30 |
| 344 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 120 QT / None - (Subtract $18) | (none) | $892.00 | $955.00 | $496.00 | $396.00 | 44.4% | Not in a requested line | pre-8/30 |
| 345 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 120 QT / 3/4" Gate Valve | (none) | $910.00 | $955.00 | $505.00 | $405.00 | 44.5% | Not in a requested line | pre-8/30 |
| 346 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 100 QT / 1 1/2" Gate Valve - (Add $30) | (none) | $910.00 | $955.00 | $505.00 | $405.00 | 44.5% | Not in a requested line | pre-8/30 |
| 347 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 120 QT / 1" Gate Valve - (Add $10) | (none) | $920.00 | $955.00 | $510.00 | $410.00 | 44.6% | Not in a requested line | pre-8/30 |
| 348 | Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings) | 120 QT / 1 1/2" Gate Valve - (Add $30) | (none) | $940.00 | $955.00 | $520.00 | $420.00 | 44.7% | Not in a requested line | pre-8/30 |
| 349 | RENTAL - Crawfish Boil Trailer Package | Daily - (Ex. Pickup Monday return Tuesday) | Trental-D | $385.00 | — | $50.00 | $335.00 | 87.0% | Not in a requested line | F3 margin >80% |
| 350 | RENTAL - Crawfish Boil Trailer Package | Weekend - (Pickup on Friday return on Monday) | Trentaly-WE | $600.00 | — | $15.00 | $585.00 | 97.5% | Not in a requested line | F3 margin >80% |
| 351 | Repair Work | Default Title | RepairWork | $30.00 | — | $15.00 | $15.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 352 | Replacement Baskets | 18 Qt | BSK-18 | $35.00 | — | $21.41 | $13.59 | 38.8% | Not in a requested line | — |
| 353 | Replacement Baskets | 30 Qt | BSK-30 | $40.00 | — | $39.00 | $1.00 | 2.5% | Not in a requested line | F3 margin <15% |
| 354 | Replacement Baskets | 40 Qt | BSK-40 | $55.00 | — | $29.69 | $25.31 | 46.0% | Not in a requested line | — |
| 355 | Replacement Baskets | 60 Qt | BSK-60 | $70.00 | — | $40.27 | $29.73 | 42.5% | Not in a requested line | — |
| 356 | Replacement Baskets | 80 Qt | BSK-80 | $95.00 | — | $61.08 | $33.92 | 35.7% | Not in a requested line | — |
| 357 | Replacement Baskets | 100 Qt | BSK-100 | $105.00 | — | $65.02 | $39.98 | 38.1% | Not in a requested line | — |
| 358 | Replacement Baskets | 120 Qt | BSK-120 | $120.00 | — | $71.41 | $48.59 | 40.5% | Not in a requested line | — |
| 359 | Replacement BoilBoss Ring Bracket (Set of 3) | Red | BoilBoss-Ring-Brkt-Red | $0.00 | — | $3.00 | — | — | Not in a requested line | F2 cost≥price |
| 360 | Replacement BoilBoss Ring Bracket (Set of 3) | Black | BoilBoss-Ring-Brkt-Black | $0.00 | — | $3.00 | — | — | Not in a requested line | F2 cost≥price |
| 361 | Replacement BoilBoss Ring Bracket (Set of 3) | Yellow | BoilBoss-Ring-Brkt-Yellow | $0.00 | — | $3.00 | — | — | Not in a requested line | F2 cost≥price |
| 362 | Replacement BoilBoss Ring Bracket (Set of 3) | Gold | BoilBoss-Ring-Brkt-Gold | $0.00 | — | $3.00 | — | — | Not in a requested line | F2 cost≥price |
| 363 | Replacement Burner Tube for Burner Modules | Consumer - 120 QT or less | BT-375 | $7.99 | — | $4.00 | $3.99 | 49.9% | Not in a requested line | 50%, pre-8/30 |
| 364 | Replacement Burner Tube for Burner Modules | Commercial - 40 Gallon or larger | BT-375-CMR | $14.99 | — | $7.50 | $7.49 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 365 | Replacement Lids | 30 QT | Lid-30QT | $18.50 | — | $9.25 | $9.25 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 366 | Replacement Lids | 40 QT | Lid-40QT | $21.25 | — | $10.63 | $10.62 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 367 | Replacement Lids | 18 QT (No Notch) | Lid-18QT | $24.00 | — | $12.00 | $12.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 368 | Replacement Lids | 60 QT | Lid-60QT | $25.00 | — | $12.50 | $12.50 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 369 | Replacement Lids | 18 QT (Notched) | Lid-18QT-Notch | $26.00 | — | $13.00 | $13.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 370 | Replacement Lids | 80 QT | Lid-80QT | $30.50 | — | $15.25 | $15.25 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 371 | Replacement Lids | 100 QT | Lid-100QT | $32.00 | — | $16.00 | $16.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 372 | Replacement Lids | 120 QT | Lid-120QT | $34.75 | — | $17.38 | $17.37 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 373 | Return Shipping | Default Title | CUST-ReturnShipping | $0.00 | — | $0.00 | — | — | Not in a requested line | F1 $0 cost, pre-8/30 |
| 374 | Rugged Ice Packs | Default Title | RR-ICEPK | $24.99 | — | $17.49 | $7.50 | 30.0% | Not in a requested line | — |
| 375 | Rugged Road 115 - High Performance Cooler | Gunmetal Gray | RR2-115-GUNMETAL-GREY | $494.99 | — | $311.99 | $183.00 | 37.0% | Not in a requested line | pre-8/30 |
| 376 | Rugged Road 115 - High Performance Cooler | Blue Steel | RR2-115-BLUE-STEEL | $494.99 | — | $311.99 | $183.00 | 37.0% | Not in a requested line | pre-8/30 |
| 377 | Rugged Road 115 - High Performance Cooler | Polar White | RR2-115-WHITE | $494.99 | — | $311.99 | $183.00 | 37.0% | Not in a requested line | pre-8/30 |
| 378 | Rugged Road 115 - High Performance Cooler | Forrest Green | RR2-115-FOREST-GREEN | $494.99 | — | $311.99 | $183.00 | 37.0% | Not in a requested line | pre-8/30 |
| 379 | Rugged Road 25 - High Performance Cooler | Gunmetal Gray | RR2-25-GUNMETAL-GREY | $249.99 | — | $146.49 | $103.50 | 41.4% | Not in a requested line | pre-8/30 |
| 380 | Rugged Road 25 - High Performance Cooler | Blue Steel | RR2-25-BLUE | $249.99 | — | $146.49 | $103.50 | 41.4% | Not in a requested line | pre-8/30 |
| 381 | Rugged Road 25 - High Performance Cooler | Polar White | RR2-25-POLAR-WHITE | $249.99 | — | $146.49 | $103.50 | 41.4% | Not in a requested line | pre-8/30 |
| 382 | Rugged Road 25 - High Performance Cooler | Forrest Green | RR2-25-GREEN | $249.99 | — | $146.49 | $103.50 | 41.4% | Not in a requested line | pre-8/30 |
| 383 | Rugged Road 45 - High Performance Cooler | Gunmetal Gray | RR2-45-GRAY-1 | $324.99 | — | $186.87 | $138.12 | 42.5% | Not in a requested line | — |
| 384 | Rugged Road 45 - High Performance Cooler | Blue Steel | RR2-45-BLUE | $324.99 | — | $186.87 | $138.12 | 42.5% | Not in a requested line | — |
| 385 | Rugged Road 45 - High Performance Cooler | Polar White | RR2-45-WHITE | $324.99 | — | $194.99 | $130.00 | 40.0% | Not in a requested line | — |
| 386 | Rugged Road 45 - High Performance Cooler | Sahara Tan | RR2-45-TAN | $324.99 | — | $194.99 | $130.00 | 40.0% | Not in a requested line | — |
| 387 | Rugged Road 65 - High Performance Cooler | Gunmetal Gray | RR2-65-GRAY-1 | $374.99 | — | $215.62 | $159.37 | 42.5% | Not in a requested line | — |
| 388 | Rugged Road 65 - High Performance Cooler | Blue Steel | RR2-65-BLUE | $374.99 | — | $231.79 | $143.20 | 38.2% | Not in a requested line | — |
| 389 | Rugged Road 65 - High Performance Cooler | Polar White | RR2-65-WHITE | $374.99 | — | $231.79 | $143.20 | 38.2% | Not in a requested line | — |
| 390 | Rugged Road 65 - High Performance Cooler | Sahara Tan | RR2-65-TAN | $374.99 | — | $227.49 | $147.50 | 39.3% | Not in a requested line | pre-8/30 |
| 391 | Rugged Road 85 - High Performance Cooler | Gunmetal Gray | RR2-85-GRAY | $424.99 | — | $244.37 | $180.62 | 42.5% | Not in a requested line | — |
| 392 | Rugged Road 85 - High Performance Cooler | Blue Steel | RR2-85-BLUE | $424.99 | — | $262.67 | $162.32 | 38.2% | Not in a requested line | — |
| 393 | Rugged Road 85 - High Performance Cooler | Polar White | RR2-85-WHITE | $424.99 | — | $262.67 | $162.32 | 38.2% | Not in a requested line | — |
| 394 | Rugged Road 85 - High Performance Cooler | Sahara Tan | RR2-85-TAN | $424.99 | — | $244.37 | $180.62 | 42.5% | Not in a requested line | — |
| 395 | Seafood Boil Bags | Pickup or Ship (with other products in cart) | BB-BoilBag-Pickup | $9.50 | — | $4.85 | $4.65 | 48.9% | Not in a requested line | pre-8/30 |
| 396 | Seafood Boil Bags | Ship Solo (Only product in cart) | BB-BoilBag-Ship | $15.50 | — | $4.85 | $10.65 | 68.7% | Not in a requested line | pre-8/30 |
| 397 | Self Standing Floor Pop Up Display | Default Title | MKT-FLRPU-2-4 | $0.01 | $110.00 | $96.00 | $-95.99 | -959900.0% | Not in a requested line | F2 cost≥price, pre-8/30 |
| 398 | Shipping Protection | 0.75 | NVDPROTECTION1 | $0.75 | — | $0.00 | $0.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 399 | Shipping Protection | 1.5 | NVDPROTECTION2 | $1.50 | — | $0.00 | $1.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 400 | Shipping Protection | Default | NVDPROTECTION0 | $2.00 | — | $0.00 | $2.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 401 | Shipping Protection | 2.25 | NVDPROTECTION3 | $2.25 | — | $0.00 | $2.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 402 | Shipping Protection | 3 | NVDPROTECTION4 | $3.00 | — | $0.00 | $3.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 403 | Shipping Protection | 3.75 | NVDPROTECTION5 | $3.75 | — | $0.00 | $3.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 404 | Shipping Protection | 4.5 | NVDPROTECTION6 | $4.50 | — | $0.00 | $4.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 405 | Shipping Protection | 5.25 | NVDPROTECTION7 | $5.25 | — | $0.00 | $5.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 406 | Shipping Protection | 6 | NVDPROTECTION8 | $6.00 | — | $0.00 | $6.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 407 | Shipping Protection | 6.75 | NVDPROTECTION9 | $6.75 | — | $0.00 | $6.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 408 | Shipping Protection | 7.5 | NVDPROTECTION10 | $7.50 | — | $0.00 | $7.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 409 | Shipping Protection | 8.25 | NVDPROTECTION11 | $8.25 | — | $0.00 | $8.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 410 | Shipping Protection | 9 | NVDPROTECTION12 | $9.00 | — | $0.00 | $9.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 411 | Shipping Protection | 9.75 | NVDPROTECTION13 | $9.75 | — | $0.00 | $9.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 412 | Shipping Protection | 10.5 | NVDPROTECTION14 | $10.50 | — | $0.00 | $10.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 413 | Shipping Protection | 11.25 | NVDPROTECTION15 | $11.25 | — | $0.00 | $11.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 414 | Shipping Protection | 12 | NVDPROTECTION16 | $12.00 | — | $0.00 | $12.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 415 | Shipping Protection | 12.75 | NVDPROTECTION17 | $12.75 | — | $0.00 | $12.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 416 | Shipping Protection | 13.5 | NVDPROTECTION18 | $13.50 | — | $0.00 | $13.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 417 | Shipping Protection | 14.25 | NVDPROTECTION19 | $14.25 | — | $0.00 | $14.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 418 | Shipping Protection | 15 | NVDPROTECTION20 | $15.00 | — | $0.00 | $15.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 419 | Shipping Protection | 15.75 | NVDPROTECTION21 | $15.75 | — | $0.00 | $15.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 420 | Shipping Protection | 16.5 | NVDPROTECTION22 | $16.50 | — | $0.00 | $16.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 421 | Shipping Protection | 17.25 | NVDPROTECTION23 | $17.25 | — | $0.00 | $17.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 422 | Shipping Protection | 18 | NVDPROTECTION24 | $18.00 | — | $0.00 | $18.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 423 | Shipping Protection | 18.75 | NVDPROTECTION25 | $18.75 | — | $0.00 | $18.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 424 | Shipping Protection | 19.5 | NVDPROTECTION26 | $19.50 | — | $0.00 | $19.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 425 | Shipping Protection | 20.25 | NVDPROTECTION27 | $20.25 | — | $0.00 | $20.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 426 | Shipping Protection | 21 | NVDPROTECTION28 | $21.00 | — | $0.00 | $21.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 427 | Shipping Protection | 21.75 | NVDPROTECTION29 | $21.75 | — | $0.00 | $21.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 428 | Shipping Protection | 22.5 | NVDPROTECTION30 | $22.50 | — | $0.00 | $22.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 429 | Shipping Protection | 23.25 | NVDPROTECTION31 | $23.25 | — | $0.00 | $23.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 430 | Shipping Protection | 24 | NVDPROTECTION32 | $24.00 | — | $0.00 | $24.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 431 | Shipping Protection | 24.75 | NVDPROTECTION33 | $24.75 | — | $0.00 | $24.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 432 | Shipping Protection | 25.5 | NVDPROTECTION34 | $25.50 | — | $0.00 | $25.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 433 | Shipping Protection | 26.25 | NVDPROTECTION35 | $26.25 | — | $0.00 | $26.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 434 | Shipping Protection | 27 | NVDPROTECTION36 | $27.00 | — | $0.00 | $27.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 435 | Shipping Protection | 27.75 | NVDPROTECTION37 | $27.75 | — | $0.00 | $27.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 436 | Shipping Protection | 28.5 | NVDPROTECTION38 | $28.50 | — | $0.00 | $28.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 437 | Shipping Protection | 29.25 | NVDPROTECTION39 | $29.25 | — | $0.00 | $29.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 438 | Shipping Protection | 30 | NVDPROTECTION40 | $30.00 | — | $0.00 | $30.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 439 | Shipping Protection | 30.75 | NVDPROTECTION41 | $30.75 | — | $0.00 | $30.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 440 | Shipping Protection | 31.5 | NVDPROTECTION42 | $31.50 | — | $0.00 | $31.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 441 | Shipping Protection | 32.25 | NVDPROTECTION43 | $32.25 | — | $0.00 | $32.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 442 | Shipping Protection | 33 | NVDPROTECTION44 | $33.00 | — | $0.00 | $33.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 443 | Shipping Protection | 33.75 | NVDPROTECTION45 | $33.75 | — | $0.00 | $33.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 444 | Shipping Protection | 34.5 | NVDPROTECTION46 | $34.50 | — | $0.00 | $34.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 445 | Shipping Protection | 35.25 | NVDPROTECTION47 | $35.25 | — | $0.00 | $35.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 446 | Shipping Protection | 36 | NVDPROTECTION48 | $36.00 | — | $0.00 | $36.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 447 | Shipping Protection | 36.75 | NVDPROTECTION49 | $36.75 | — | $0.00 | $36.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 448 | Shipping Protection | 37.5 | NVDPROTECTION50 | $37.50 | — | $0.00 | $37.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 449 | Shipping Protection | 38.25 | NVDPROTECTION51 | $38.25 | — | $0.00 | $38.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 450 | Shipping Protection | 39 | NVDPROTECTION52 | $39.00 | — | $0.00 | $39.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 451 | Shipping Protection | 39.75 | NVDPROTECTION53 | $39.75 | — | $0.00 | $39.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 452 | Shipping Protection | 40.5 | NVDPROTECTION54 | $40.50 | — | $0.00 | $40.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 453 | Shipping Protection | 41.25 | NVDPROTECTION55 | $41.25 | — | $0.00 | $41.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 454 | Shipping Protection | 42 | NVDPROTECTION56 | $42.00 | — | $0.00 | $42.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 455 | Shipping Protection | 42.75 | NVDPROTECTION57 | $42.75 | — | $0.00 | $42.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 456 | Shipping Protection | 43.5 | NVDPROTECTION58 | $43.50 | — | $0.00 | $43.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 457 | Shipping Protection | 44.25 | NVDPROTECTION59 | $44.25 | — | $0.00 | $44.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 458 | Shipping Protection | 45 | NVDPROTECTION60 | $45.00 | — | $0.00 | $45.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 459 | Shipping Protection | 45.75 | NVDPROTECTION61 | $45.75 | — | $0.00 | $45.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 460 | Shipping Protection | 46.5 | NVDPROTECTION62 | $46.50 | — | $0.00 | $46.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 461 | Shipping Protection | 47.25 | NVDPROTECTION63 | $47.25 | — | $0.00 | $47.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 462 | Shipping Protection | 48 | NVDPROTECTION64 | $48.00 | — | $0.00 | $48.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 463 | Shipping Protection | 48.75 | NVDPROTECTION65 | $48.75 | — | $0.00 | $48.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 464 | Shipping Protection | 49.5 | NVDPROTECTION66 | $49.50 | — | $0.00 | $49.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 465 | Shipping Protection | 50.25 | NVDPROTECTION67 | $50.25 | — | $0.00 | $50.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 466 | Shipping Protection | 51 | NVDPROTECTION68 | $51.00 | — | $0.00 | $51.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 467 | Shipping Protection | 51.75 | NVDPROTECTION69 | $51.75 | — | $0.00 | $51.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 468 | Shipping Protection | 52.5 | NVDPROTECTION70 | $52.50 | — | $0.00 | $52.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 469 | Shipping Protection | 53.25 | NVDPROTECTION71 | $53.25 | — | $0.00 | $53.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 470 | Shipping Protection | 54 | NVDPROTECTION72 | $54.00 | — | $0.00 | $54.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 471 | Shipping Protection | 54.75 | NVDPROTECTION73 | $54.75 | — | $0.00 | $54.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 472 | Shipping Protection | 55.5 | NVDPROTECTION74 | $55.50 | — | $0.00 | $55.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 473 | Shipping Protection | 56.25 | NVDPROTECTION75 | $56.25 | — | $0.00 | $56.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 474 | Shipping Protection | 57 | NVDPROTECTION76 | $57.00 | — | $0.00 | $57.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 475 | Shipping Protection | 57.75 | NVDPROTECTION77 | $57.75 | — | $0.00 | $57.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 476 | Shipping Protection | 58.5 | NVDPROTECTION78 | $58.50 | — | $0.00 | $58.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 477 | Shipping Protection | 59.25 | NVDPROTECTION79 | $59.25 | — | $0.00 | $59.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 478 | Shipping Protection | 60 | NVDPROTECTION80 | $60.00 | — | $0.00 | $60.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 479 | Shipping Protection | 60.75 | NVDPROTECTION81 | $60.75 | — | $0.00 | $60.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 480 | Shipping Protection | 61.5 | NVDPROTECTION82 | $61.50 | — | $0.00 | $61.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 481 | Shipping Protection | 62.25 | NVDPROTECTION83 | $62.25 | — | $0.00 | $62.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 482 | Shipping Protection | 63 | NVDPROTECTION84 | $63.00 | — | $0.00 | $63.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 483 | Shipping Protection | 63.75 | NVDPROTECTION85 | $63.75 | — | $0.00 | $63.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 484 | Shipping Protection | 64.5 | NVDPROTECTION86 | $64.50 | — | $0.00 | $64.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 485 | Shipping Protection | 65.25 | NVDPROTECTION87 | $65.25 | — | $0.00 | $65.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 486 | Shipping Protection | 66 | NVDPROTECTION88 | $66.00 | — | $0.00 | $66.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 487 | Shipping Protection | 66.75 | NVDPROTECTION89 | $66.75 | — | $0.00 | $66.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 488 | Shipping Protection | 67.5 | NVDPROTECTION90 | $67.50 | — | $0.00 | $67.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 489 | Shipping Protection | 68.25 | NVDPROTECTION91 | $68.25 | — | $0.00 | $68.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 490 | Shipping Protection | 69 | NVDPROTECTION92 | $69.00 | — | $0.00 | $69.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 491 | Shipping Protection | 69.75 | NVDPROTECTION93 | $69.75 | — | $0.00 | $69.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 492 | Shipping Protection | 70.5 | NVDPROTECTION94 | $70.50 | — | $0.00 | $70.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 493 | Shipping Protection | 71.25 | NVDPROTECTION95 | $71.25 | — | $0.00 | $71.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 494 | Shipping Protection | 72 | NVDPROTECTION96 | $72.00 | — | $0.00 | $72.00 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 495 | Shipping Protection | 72.75 | NVDPROTECTION97 | $72.75 | — | $0.00 | $72.75 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 496 | Shipping Protection | 73.5 | NVDPROTECTION98 | $73.50 | — | $0.00 | $73.50 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 497 | Shipping Protection | 74.25 | NVDPROTECTION99 | $74.25 | — | $0.00 | $74.25 | 100.0% | Not in a requested line | F1 $0 cost, pre-8/30 |
| 498 | Short Sleeve Crawfish Tee | Crawfish / Medium / Green | BoilBoss-ShirtSS-GREEN-M | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 499 | Short Sleeve Crawfish Tee | Crawfish / Medium / Red | BoilBoss-ShirtSS-Red-M | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 500 | Short Sleeve Crawfish Tee | Crawfish / Large / Green | BoilBoss-ShirtSS-GREEN-L | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 501 | Short Sleeve Crawfish Tee | Crawfish / Large / Red | BoilBoss-ShirtSS-Red-L | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 502 | Short Sleeve Crawfish Tee | Crawfish / XL / Green | BoilBoss-ShirtSS-GREEN-XL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 503 | Short Sleeve Crawfish Tee | Crawfish / XL / Red | BoilBoss-ShirtSS-Red-XL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 504 | Short Sleeve Crawfish Tee | Crawfish / 2 XL / Green | BoilBoss-ShirtSS-GREEN-XXL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 505 | Short Sleeve Crawfish Tee | Crawfish / 2 XL / Red | BoilBoss-ShirtSS-Red-XXL | $22.00 | $30.00 | $13.50 | $8.50 | 38.6% | Not in a requested line | pre-8/30 |
| 506 | Single Jet Burner Module (Boiling) | Default Title | BSJ-50/60 | $62.00 | — | $35.82 | $26.18 | 42.2% | Not in a requested line | — |
| 507 | Stainless Steel Deep Fryer Thermometers - 12 inch and 5 inch - HP Cookers | 5 inch | HP-5in-Therm | $15.99 | — | $1.88 | $14.11 | 88.2% | Not in a requested line | F3 margin >80% |
| 508 | Stainless Steel Deep Fryer Thermometers - 12 inch and 5 inch - HP Cookers | 12 inch | HP-12in-Therm | $18.99 | — | $2.15 | $16.84 | 88.7% | Not in a requested line | F3 margin >80% |
| 509 | Steamer Basket Inserts | 30 QT | SBI-30 | $24.99 | — | $11.14 | $13.85 | 55.4% | Not in a requested line | — |
| 510 | Steamer Basket Inserts | 60 QT | SBI-60 | $27.99 | — | $8.95 | $19.04 | 68.0% | Not in a requested line | — |
| 511 | Steamer Basket Inserts | 40 QT | SBI-40 | $27.99 | — | $6.89 | $21.10 | 75.4% | Not in a requested line | — |
| 512 | Steamer Basket Inserts | 80 or 100 QT | SBI-80/100 | $53.99 | — | $16.49 | $37.50 | 69.5% | Not in a requested line | — |
| 513 | Steamer Basket Inserts | 120 QT | SBI-120 | $59.99 | — | $17.91 | $42.08 | 70.1% | Not in a requested line | — |
| 514 | Steamer Basket Inserts | 80 or 100 QT - Adjustable Shelf | SBIS-80/100 | $119.99 | — | $71.73 | $48.26 | 40.2% | Not in a requested line | — |
| 515 | Steamer Basket Inserts | 120 QT - Adjustable Shelf | SBIS-120 | $159.99 | — | $93.60 | $66.39 | 41.5% | Not in a requested line | — |
| 516 | Table Top Signs | Default Title | MKT-TT-SelfStand | $0.01 | $24.00 | $19.28 | $-19.27 | -192700.0% | Not in a requested line | F2 cost≥price, pre-8/30 |
| 517 | Trucker Hat | Black | BoilBoss-Hat-Black | $20.00 | $25.00 | $13.00 | $7.00 | 35.0% | Not in a requested line | pre-8/30 |
| 518 | Turkey Fryer Racks | Single Upright (30 QT or larger) | TFR-30 | $25.00 | — | $10.08 | $14.92 | 59.7% | Not in a requested line | — |
| 519 | Turkey Fryer Racks | Dual Turkey Rack (60 QT or larger) | TFR-60 | $59.95 | — | $32.68 | $27.27 | 45.5% | Not in a requested line | — |
| 520 | Turkey Fryer Racks | Single Flat (40 QT or larger) | TFR-4050-F | $65.00 | — | $25.00 | $40.00 | 61.5% | Not in a requested line | — |
| 521 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / None - (Subtract $18) / Red | (none) | $846.98 | $966.98 | $483.49 | $363.49 | 42.9% | Not in a requested line | pre-8/30 |
| 522 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / None - (Subtract $18) / Black | (none) | $846.98 | $966.98 | $483.49 | $363.49 | 42.9% | Not in a requested line | pre-8/30 |
| 523 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / None - (Subtract $18) / Purple & Gold | (none) | $846.98 | $966.98 | $483.49 | $363.49 | 42.9% | Not in a requested line | pre-8/30 |
| 524 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / None - (Subtract $18) / Black & Gold | (none) | $846.98 | $966.98 | $483.49 | $363.49 | 42.9% | Not in a requested line | pre-8/30 |
| 525 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 3/4" Gate Valve / Red | (none) | $864.98 | $984.98 | $492.49 | $372.49 | 43.1% | Not in a requested line | pre-8/30 |
| 526 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 3/4" Gate Valve / Black | (none) | $864.98 | $984.98 | $492.49 | $372.49 | 43.1% | Not in a requested line | pre-8/30 |
| 527 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 3/4" Gate Valve / Purple & Gold | (none) | $864.98 | $984.98 | $492.49 | $372.49 | 43.1% | Not in a requested line | pre-8/30 |
| 528 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 3/4" Gate Valve / Black & Gold | (none) | $864.98 | $984.98 | $492.49 | $372.49 | 43.1% | Not in a requested line | pre-8/30 |
| 529 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1" Gate Valve - (Add $10) / Red | (none) | $874.98 | $994.98 | $497.49 | $377.49 | 43.1% | Not in a requested line | pre-8/30 |
| 530 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1" Gate Valve - (Add $10) / Black | (none) | $874.98 | $994.98 | $497.49 | $377.49 | 43.1% | Not in a requested line | pre-8/30 |
| 531 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1" Gate Valve - (Add $10) / Purple & Gold | (none) | $874.98 | $994.98 | $497.49 | $377.49 | 43.1% | Not in a requested line | pre-8/30 |
| 532 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1" Gate Valve - (Add $10) / Black & Gold | (none) | $874.98 | $994.98 | $497.49 | $377.49 | 43.1% | Not in a requested line | pre-8/30 |
| 533 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1 1/2" Gate Valve - (Add $30) / Red | (none) | $894.98 | $1014.98 | $507.49 | $387.49 | 43.3% | Not in a requested line | pre-8/30 |
| 534 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1 1/2" Gate Valve - (Add $30) / Black | (none) | $894.98 | $1014.98 | $507.49 | $387.49 | 43.3% | Not in a requested line | pre-8/30 |
| 535 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1 1/2" Gate Valve - (Add $30) / Purple & Gold | (none) | $894.98 | $1014.98 | $507.49 | $387.49 | 43.3% | Not in a requested line | pre-8/30 |
| 536 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 60 QT / 1 1/2" Gate Valve - (Add $30) / Black & Gold | (none) | $894.98 | $1014.98 | $507.49 | $387.49 | 43.3% | Not in a requested line | pre-8/30 |
| 537 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / None - (Subtract $18) / Red | (none) | $946.98 | $1066.98 | $533.49 | $413.49 | 43.7% | Not in a requested line | pre-8/30 |
| 538 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / None - (Subtract $18) / Black | (none) | $946.98 | $1066.98 | $533.49 | $413.49 | 43.7% | Not in a requested line | pre-8/30 |
| 539 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / None - (Subtract $18) / Purple & Gold | (none) | $946.98 | $1066.98 | $533.49 | $413.49 | 43.7% | Not in a requested line | pre-8/30 |
| 540 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / None - (Subtract $18) / Black & Gold | (none) | $946.98 | $1066.98 | $533.49 | $413.49 | 43.7% | Not in a requested line | pre-8/30 |
| 541 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 3/4" Gate Valve / Red | (none) | $964.98 | $1084.98 | $542.49 | $422.49 | 43.8% | Not in a requested line | pre-8/30 |
| 542 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 3/4" Gate Valve / Black | (none) | $964.98 | $1084.98 | $542.49 | $422.49 | 43.8% | Not in a requested line | pre-8/30 |
| 543 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 3/4" Gate Valve / Purple & Gold | (none) | $964.98 | $1084.98 | $542.49 | $422.49 | 43.8% | Not in a requested line | pre-8/30 |
| 544 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 3/4" Gate Valve / Black & Gold | (none) | $964.98 | $1084.98 | $542.49 | $422.49 | 43.8% | Not in a requested line | pre-8/30 |
| 545 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / None - (Subtract $18) / Red | (none) | $971.98 | $1091.98 | $545.99 | $425.99 | 43.8% | Not in a requested line | pre-8/30 |
| 546 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / None - (Subtract $18) / Black | (none) | $971.98 | $1091.98 | $545.99 | $425.99 | 43.8% | Not in a requested line | pre-8/30 |
| 547 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / None - (Subtract $18) / Purple & Gold | (none) | $971.98 | $1091.98 | $545.99 | $425.99 | 43.8% | Not in a requested line | pre-8/30 |
| 548 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / None - (Subtract $18) / Black & Gold | (none) | $971.98 | $1091.98 | $545.99 | $425.99 | 43.8% | Not in a requested line | pre-8/30 |
| 549 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1" Gate Valve - (Add $10) / Red | (none) | $974.98 | $1094.98 | $547.49 | $427.49 | 43.8% | Not in a requested line | pre-8/30 |
| 550 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1" Gate Valve - (Add $10) / Black | (none) | $974.98 | $1094.98 | $547.49 | $427.49 | 43.8% | Not in a requested line | pre-8/30 |
| 551 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1" Gate Valve - (Add $10) / Purple & Gold | (none) | $974.98 | $1094.98 | $547.49 | $427.49 | 43.8% | Not in a requested line | pre-8/30 |
| 552 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1" Gate Valve - (Add $10) / Black & Gold | (none) | $974.98 | $1094.98 | $547.49 | $427.49 | 43.8% | Not in a requested line | pre-8/30 |
| 553 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 3/4" Gate Valve / Red | (none) | $989.98 | $1109.98 | $554.99 | $434.99 | 43.9% | Not in a requested line | pre-8/30 |
| 554 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 3/4" Gate Valve / Black | (none) | $989.98 | $1109.98 | $554.99 | $434.99 | 43.9% | Not in a requested line | pre-8/30 |
| 555 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 3/4" Gate Valve / Purple & Gold | (none) | $989.98 | $1109.98 | $554.99 | $434.99 | 43.9% | Not in a requested line | pre-8/30 |
| 556 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 3/4" Gate Valve / Black & Gold | (none) | $989.98 | $1109.98 | $554.99 | $434.99 | 43.9% | Not in a requested line | pre-8/30 |
| 557 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1 1/2" Gate Valve - (Add $30) / Red | (none) | $994.98 | $1114.98 | $557.49 | $437.49 | 44.0% | Not in a requested line | pre-8/30 |
| 558 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1 1/2" Gate Valve - (Add $30) / Black | (none) | $994.98 | $1114.98 | $557.49 | $437.49 | 44.0% | Not in a requested line | pre-8/30 |
| 559 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1 1/2" Gate Valve - (Add $30) / Purple & Gold | (none) | $994.98 | $1114.98 | $557.49 | $437.49 | 44.0% | Not in a requested line | pre-8/30 |
| 560 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 80 QT / 1 1/2" Gate Valve - (Add $30) / Black & Gold | (none) | $994.98 | $1114.98 | $557.49 | $437.49 | 44.0% | Not in a requested line | pre-8/30 |
| 561 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1" Gate Valve - (Add $10) / Red | (none) | $999.98 | $1119.98 | $559.99 | $439.99 | 44.0% | Not in a requested line | pre-8/30 |
| 562 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1" Gate Valve - (Add $10) / Black | (none) | $999.98 | $1119.98 | $559.99 | $439.99 | 44.0% | Not in a requested line | pre-8/30 |
| 563 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1" Gate Valve - (Add $10) / Purple & Gold | (none) | $999.98 | $1119.98 | $559.99 | $439.99 | 44.0% | Not in a requested line | pre-8/30 |
| 564 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1" Gate Valve - (Add $10) / Black & Gold | (none) | $999.98 | $1119.98 | $559.99 | $439.99 | 44.0% | Not in a requested line | pre-8/30 |
| 565 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / None - (Subtract $18) / Red | (none) | $1,001.98 | $1121.98 | $560.99 | $440.99 | 44.0% | Not in a requested line | pre-8/30 |
| 566 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / None - (Subtract $18) / Black | (none) | $1,001.98 | $1121.98 | $560.99 | $440.99 | 44.0% | Not in a requested line | pre-8/30 |
| 567 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / None - (Subtract $18) / Purple & Gold | (none) | $1,001.98 | $1121.98 | $560.99 | $440.99 | 44.0% | Not in a requested line | pre-8/30 |
| 568 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / None - (Subtract $18) / Black & Gold | (none) | $1,001.98 | $1121.98 | $560.99 | $440.99 | 44.0% | Not in a requested line | pre-8/30 |
| 569 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1 1/2" Gate Valve - (Add $30) / Red | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 570 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1 1/2" Gate Valve - (Add $30) / Black | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 571 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1 1/2" Gate Valve - (Add $30) / Purple & Gold | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 572 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 100 QT / 1 1/2" Gate Valve - (Add $30) / Black & Gold | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 573 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 3/4" Gate Valve / Red | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 574 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 3/4" Gate Valve / Black | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 575 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 3/4" Gate Valve / Purple & Gold | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 576 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 3/4" Gate Valve / Black & Gold | (none) | $1,019.98 | $1139.98 | $569.99 | $449.99 | 44.1% | Not in a requested line | pre-8/30 |
| 577 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1" Gate Valve - (Add $10) / Red | (none) | $1,029.98 | $1149.98 | $574.99 | $454.99 | 44.2% | Not in a requested line | pre-8/30 |
| 578 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1" Gate Valve - (Add $10) / Black | (none) | $1,029.98 | $1149.98 | $574.99 | $454.99 | 44.2% | Not in a requested line | pre-8/30 |
| 579 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1" Gate Valve - (Add $10) / Purple & Gold | (none) | $1,029.98 | $1149.98 | $574.99 | $454.99 | 44.2% | Not in a requested line | pre-8/30 |
| 580 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1" Gate Valve - (Add $10) / Black & Gold | (none) | $1,029.98 | $1149.98 | $574.99 | $454.99 | 44.2% | Not in a requested line | pre-8/30 |
| 581 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1 1/2" Gate Valve - (Add $30) / Red | (none) | $1,049.98 | $1169.98 | $584.99 | $464.99 | 44.3% | Not in a requested line | pre-8/30 |
| 582 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1 1/2" Gate Valve - (Add $30) / Black | (none) | $1,049.98 | $1169.98 | $584.99 | $464.99 | 44.3% | Not in a requested line | pre-8/30 |
| 583 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1 1/2" Gate Valve - (Add $30) / Purple & Gold | (none) | $1,049.98 | $1169.98 | $584.99 | $464.99 | 44.3% | Not in a requested line | pre-8/30 |
| 584 | Ultimate Boiling Bundle - Pot, Burner, Cooling Ring & Therm Paddle ($120 Savings) | 120 QT / 1 1/2" Gate Valve - (Add $30) / Black & Gold | (none) | $1,049.98 | $1169.98 | $584.99 | $464.99 | 44.3% | Not in a requested line | pre-8/30 |
| 585 | WD 150 - TT Upgrade | Without Base | WD 150-TT-Upgrade | $1,520.00 | — | $760.00 | $760.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 586 | WD 150 - TT Upgrade | With Base | WD 150-TT-Upgrade-Base | $1,810.00 | — | $905.00 | $905.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 587 | WD 150 TT & Basket Upgrade | Without Base | WD150TT- Basket | $2,900.00 | — | $1,450.00 | $1450.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 588 | WD 150 TT & Basket Upgrade | With Base | WD150TT- Basket-Base | $3,190.00 | — | $1,595.00 | $1595.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 589 | WD 150 TT & Bottom Upgrade | Without Base | WD 150 TT - Bottom Upgrade | $2,260.00 | — | $1,130.00 | $1130.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 590 | WD 150 TT & Bottom Upgrade | With Base | WD 150 TT - Bottom Upgrade- Base | $2,550.00 | — | $1,275.00 | $1275.00 | 50.0% | Not in a requested line | 50%, pre-8/30 |
| 591 | Wind Shield | Default Title | ACC-Windshield | $21.00 | — | $1.50 | $19.50 | 92.9% | Not in a requested line | F3 margin >80% |
| 592 | Zydeco Fire Combo Pack | Default Title | (none) | $11.99 | — | $7.00 | $4.99 | 41.6% | Not in a requested line | — |
| 593 | Zydeco Fire Hot Sauce | Default Title | Zydeco-5oz-Sauce | $5.95 | — | $3.25 | $2.70 | 45.4% | Not in a requested line | pre-8/30 |
| 594 | Zydeco Fire Seasoning Dust | Default Title | Zydeco-5oz-Dust | $6.95 | — | $3.75 | $3.20 | 46.0% | Not in a requested line | pre-8/30 |

---

**Next:** ROUX. The costs are internally consistent but mostly predate Jay's stated update, so whether the CAC ceiling table can be built on them is a judgment call, not a query. Jay is the one person who can confirm which costs are landed.
