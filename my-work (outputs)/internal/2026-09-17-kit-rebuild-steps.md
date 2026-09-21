# Kit rebuild in the Shopify Bundles app — Evan's steps

**Why:** Jay, via Evan 2026-09-17 — the kits get built in the Bundles app instead of through the connector. A bundle belongs to the app that made it, so the Bundles app can only manage bundles created in the Bundles app. Evan does the create step; ROUX does the rest through the connector.
**Not an inventory fault.** The skimmer count was only ever a stock entry: more skimmers came in and had to be entered (Evan, 2026-09-17). `SC-7R` reads 30 on hand and sells on the storefront, checked 2026-09-17.
**Source for the flow:** help.shopify.com, Shopify Bundles, read 2026-09-17. Fixed bundles allow up to 30 components, 3 options, 100 variants. New bundles save as **Draft** by default.

## What Evan clicks — three bundles

Shopify admin → **Apps → Bundles** → **Create bundle**, once per kit. Pick the exact variant in each component; click the variant names to deselect the ones that don't belong. Quantity 1 on everything. Leave status **Draft**. Sales channels don't matter yet.

### 1. Tailgate Fry Kit
**Title:** `Tailgate Fry Kit - 18 QT Fish Fryer Powered Pot with Leg Extensions, Fry Thermometer and Skimmer ($19.98 Savings)`
| Component product | Variant to keep |
|---|---|
| 18 QT Fish Fryer / Brazier Powered Pot | `1/4" Valve / With Basket` (`PWFRBR-VLV025B`) |
| Cooker Leg Extensions for Outdoor Gas Cookers | the only one (`LegExtensions`) |
| Stainless Steel Deep Fryer Thermometers – 12 inch and 5 inch | **`5 inch`** (`HP-5in-Therm`) |
| 20" Heavy Duty Chrome Plated Wire Mesh Skimmer | the only one (`SC-7R`) |

**Price $465.00** · compare-at **$484.98**

### 2. Turkey Fry Kit – 30 QT
**Title:** `Turkey Fry Kit - 30 QT Turkey Fryer Powered Pot with Rack, Fry Thermometer, Wind Shield and Skimmer ($23.48 Savings)`
| Component product | Variant to keep |
|---|---|
| 30 Qt Turkey Fryer Powered Pot With Drain Valve, Lid & Turkey Rack | `With Turkey Fryer Rack & Basket` (`PW30-VLV075-TFR-B`) |
| Thermometers | **`12 inch`** (`HP-12in-Therm`) |
| Wind Shield | the only one (`ACC-Windshield`) |
| Skimmer | `SC-7R` |

**Price $469.00** · compare-at **$492.48**

### 3. Turkey Fry Kit – 60 QT
**Title:** `Turkey Fry Kit - 60 QT Turkey Fryer Pot with Rack, Fry Thermometer, Wind Shield and Skimmer ($25.98 Savings)`
No "Two-Bird" in the title (Evan, 2026-09-17); it goes in the description instead.
| Component product | Variant to keep |
|---|---|
| 60 Qt Dual Turkey Fryer Pot With Drain Valve / Lid & Turkey Rack | `3/4" Gate Valve` (`PT60-VLV075-TFR`) |
| Thermometers | **`12 inch`** (`HP-12in-Therm`) |
| Wind Shield | the only one (`ACC-Windshield`) |
| Skimmer | `SC-7R` |

**Price $519.00** · compare-at **$544.98**

## What ROUX does after, through the connector (on Evan's go)

1. SKUs: `BUNDLE-18QT-TAILGATE` · `BUNDLE-30QT-TURKEY` · `BUNDLE-60QT-TURKEY`.
2. Descriptions (Maya's copy) with the California Prop 65 block in Platinum's markup, and the two-bird line inside the 60 QT description.
3. Metafields `custom.features_benefits` and `custom.frequently_asked_question` → [kit metafield copy](../content/website/2026-09-16-kit-metafield-copy.md).
4. Tags: Bundle · Sale-NoDiscount · Tailgater or Turkey · no-wholesale · Fryer. Collections follow the tag rules.
5. Product type `Home & Garden`, vendor High Performance Cookers, compare-at prices, read-back of every field.
6. Archive the three old connector-built drafts (`Product/10292065861872`, `Product/10292066353392`). **Never deleted** — Evan deletes if he wants them gone.

## Then, before anything goes live
- Evan adds the real kit photos.
- `HIGH15` still active until Biljana finishes her flows (a few more days, her word 2026-09-17). `SMS25` is clear to deactivate now.
- Checkout test and the eligible-discounts collection check stay Evan's eye in admin.
- Status to Active is Evan's click: tailgate Sept 25, turkey Oct 1.
