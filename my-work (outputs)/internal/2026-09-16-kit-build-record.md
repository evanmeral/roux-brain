# Kit build record — three kits created in Shopify as drafts
**2026-09-16 · Atlas, on Evan's go ("go, 12\" is right, long titles").** Every write below was approved in-conversation for this specific change. Copy: Maya, [2026-09-16-kit-pdp-copy.md](../content/website/2026-09-16-kit-pdp-copy.md). Spec: [bundles plan](2026-09-11-tailgate-thanksgiving-bundles-plan.md).

**Status: both products are DRAFT, and staying that way for now (Evan, 2026-09-16 afternoon): Jay approves the built kits first, then how they get used is a separate conversation.** Nothing is visible to customers. Also gating activation: Biljana's flows on `HIGH15B`/`SMS25B` with the old two off (board landmine).

**Same-day edits on Evan's ask (2026-09-16):** SKUs renamed to `BUNDLE-…` (table below) · the California Prop 65 block appended to both descriptions in Platinum's exact `h6.text-display--span-gold` markup · Features & Benefits and FAQ metafields **set on both products** (`custom.features_benefits`, `custom.frequently_asked_question`, both rich text; 6 bullets and 6 Q&As each) — copy by Maya, see [kit-metafield-copy](../content/website/2026-09-16-kit-metafield-copy.md). ⚠️ The theme renders `features_benefits` (seen on the live 18 QT page) and the older `product_features` metaobject cards; the rich-text FAQ field is used by no other product yet, so whether the theme shows it is unverified until a kit page is previewed.

---

## What exists in Shopify now *(read back after the build, Shopify GraphQL, 2026-09-16)*

| | Tailgate Fry Kit | Turkey Fry Kit · 30 QT | Turkey Fry Kit · 60 QT Two-Bird |
|---|---|---|---|
| Product | `gid://shopify/Product/10292065861872` | `gid://shopify/Product/10292066353392` (one page, option `Size`) | same product |
| Handle | `tailgate-fry-kit-18-qt-fish-fryer-powered-pot-with-leg-extensions-fry-thermometer-and-skimmer-19-98-savings` | `turkey-fry-kit-turkey-fryer-powered-pot-with-rack-fry-thermometer-wind-shield-and-skimmer-up-to-25-98-savings` | same |
| Variant | `ProductVariant/50469796315376` | `ProductVariant/50469796839664` | `ProductVariant/50469796872432` |
| SKU | `BUNDLE-18QT-TAILGATE` *(was `KIT-18FRY-LEGS`; Evan renamed same day: "bundle" not "kit", "tailgate" not "legs")* | `BUNDLE-30QT-TURKEY` *(was `KIT-30TURKEY`)* | `BUNDLE-60QT-TURKEY` *(was `KIT-60TURKEY`)* |
| Price · compare-at | $465.00 · $484.98 | $469.00 · $492.48 | $519.00 · $544.98 |
| Components (qty 1 each) | `PWFRBR-VLV025B` $340 · `LegExtensions` $119 · `HP-5in-Therm` $15.99 · `SC-7R` $9.99 | `PW30-VLV075-TFR-B` $442.50 · `HP-12in-Therm` $18.99 · `ACC-Windshield` $21 · `SC-7R` $9.99 | `PT60-VLV075-TFR` $495 · `HP-12in-Therm` $18.99 · `ACC-Windshield` $21 · `SC-7R` $9.99 |
| Tags | Bundle · Sale-NoDiscount · Tailgater · no-wholesale · Fryer | Bundle · Sale-NoDiscount · Turkey · no-wholesale · Fryer | same |
| Collections (via tag rules) | tailgater-tools · fryers · product-bundles · wspricing-all-non-commercial-products | turkey-frying-pots-cookers · fryers · product-bundles · wspricing-all-non-commercial-products | same |
| Images | hero shot of the 18 QT (placeholder) | 30 QT hero (product + variant image) | 60 QT Dual hero (variant image) |
| `requiresComponents` | true | true | true |
| Inventory policy | CONTINUE (matches Platinum) | CONTINUE | CONTINUE |

Product type `Home & Garden`, vendor `High Performance Cookers`, titles in the Platinum shape (Evan: long titles). 12" thermometer on the 60 QT confirmed by Evan, 2026-09-16.

## How it was built

**Variant-level fixed bundle**, not the product-level type Platinum uses. Reason: a product-level bundle puts every component in every variant, so it cannot put the 30 QT pot on one variant and the 60 QT Dual on the other. The variant-level type gives each variant its own component list, which is what makes the one-page Turkey Fry Kit possible. At checkout both types behave the same: a real bundle with a line-item group, so Finn can count kits from orders.

Mutations, in order (all validated against the schema first): `productSet` ×2 (product, option, variants, prices, SKUs, tags, images, status DRAFT) → `productVariantRelationshipBulkUpdate` ×2 (components on all three variants, price FIXED) → `productVariantsBulkUpdate` ×2 (restore inventory policy CONTINUE, which the component attach had reset to DENY) → read-back.

## Things to know

- ⚠️ **Bundle ownership sits with the Claude Shopify connector app** (Shopify assigns it to whichever app attaches components). Price, copy, tags, images and status are editable in admin as normal. **Changing a kit's components goes through Atlas** (`productVariantRelationshipBulkUpdate`), not the Shopify Bundles app.
- ⚠️ **Skimmer `SC-7R` reads `availableForSale: false`** — inventory −1, tracked, policy DENY *(Shopify Admin, 2026-09-16)*. **Evan, 2026-09-16: skimmers are in stock**, so this is a wrong Shopify count, not a shelf problem. **Confirmed on the live site the same day:** the storefront's own product data (`/products/…skimmer.js`) returns `available: false`, so the standalone skimmer cannot be bought online today. All three kits contain it. Whether a DENY component at −1 also blocks the kit at checkout cannot be tested while the kits are drafts. **Fix before Sept 25, Evan's or Jay's click:** correct the count (Digit is the inventory truth) or set the skimmer to continue selling. Legs (`LegExtensions`) and the 30 QT pot (`PW30-VLV075-TFR-B`) are also at −1 but on CONTINUE, so they sell.
- The **"All Products - Eligible for Discounts" collection is invisible to the connector** (title search returns nothing, as the code-fix doc recorded). The Bundle exclusion landed 2026-09-15 per the board; not re-verifiable from here. `Sale-NoDiscount` on every kit is the second guard. Evan's eye in admin before activation.
- **Photos are placeholders** (the hero pot's own shot). **Evan is shooting the kits 2026-09-16.** Upload in admin, or hand them to Atlas to attach.
- `wspricing-all-non-commercial-products` picked both kits up automatically. `HPC10` and `Stale30` were repointed away from it on 2026-09-15, so no code reaches the kits through it.

## Before going live (checklist)

1. Biljana confirms `HIGH15B`/`SMS25B`; `HIGH15`/`SMS25` deactivated.
2. Skimmer availability fixed in Shopify (above) — stock is fine, the record is wrong.
3. Kit photos swapped in (Evan shooting 2026-09-16).
4. Evan checks "All Products - Eligible for Discounts" excludes tag `Bundle` in admin.
5. Checkout test, no order placed: each kit + one ordinary item, try `Welcome10`, `HPC10`, `Stale30`, a recreated code. Discount lands on the ordinary item only. (Code-fix doc, Step 6.)
6. Set status ACTIVE — Evan's click. Tailgate Sept 25, turkey Oct 1. Add the "Order by Monday, November 23" line to the turkey page Oct 1; remove it Nov 23.
7. Finn: kit share and gross profit per order weekly from launch (plan §3.3, §4.4).
