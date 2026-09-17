# Group A copy fix sheet: Tailgate Fry Kit pages

**2026-09-17 · Maya · for Evan or Jay to click by Mon Sept 21.** Nothing was written to Shopify. Every "current text" below was read live today through the Shopify connector (GraphQL, read only), unless marked otherwise.

**Rules applied**
- No "Made in USA." Use "Built in Louisiana," "Hand-welded in Louisiana" or "Built in the USA" (`hpc-standing-rules.md`, Jay and Evan 2026-09-11).
- Warranty: full 2-year on all products. Limited 5-year, residential only, 120 QT or smaller, owner pays labor and shipping both ways.

**Does the 18 QT qualify for the 5-year? Yes, for residential use.** The live warranty page (read 2026-09-17) says the limited five-year covers "Pot bottom Tunnel Tubes, powered cooker stands and all welds on the entire pot" for residential use on pots 120 quarts or smaller. The owner pays labor and shipping. The 18 QT Powered is a Tunnel Tube pot with a powered stand, and 18 QT is under the cap. `what-we-sell.md` lists it as a consumer pot (Tier 1B), and the cap is 120 QT. **What's wrong with the live line:** it limits the 2-year to commercial buyers and gives the 5-year to residential buyers with no "limited." In fact every buyer gets the full 2-year, and residential buyers also get the limited 5-year.

---

## 1. 18 QT "Made in the USA" feature card

**Where it lives:** `Metaobject/111384690928` (handle `product-features-uaxwzrt5`, type Product Features). Only the **18 QT Fish Fryer / Brazier Powered Pot** uses it, through `custom.product_features`. Last updated 2025-08-25.

**Click path:** Shopify admin → **Content** → **Metaobjects** → **Product Features** → open **Product Features #UAXWZRT5** → **feature** field (rich text).
*Or:* Products → 18 QT Fish Fryer / Brazier Powered Pot → Metafields → Product features → click the first entry.

**Current text (exact):**
> **Made in the USA** *(bold)*
> This fryer is crafted with care in Louisiana.

**Replace with:**
> **Hand-Welded in Louisiana** *(bold)*
> Our team welds, fits and finishes every fryer in Covington.

*Source for Covington:* `hpc-standing-rules.md`, where the pot is welded, fitted and finished in Covington. If you'd rather not name the town, use "Our team welds and finishes every fryer here in Louisiana."

---

## 2. `fryers` collection description

**Where it lives:** Collection `234730324144`, title **Propane Gas Outdoor Deep Fryer**, handle `fryers`. Updated 2026-09-17 11:10 UTC. The Tailgate Fry Kit is set to join this collection.

**Click path:** Shopify admin → **Products** → **Collections** → **Propane Gas Outdoor Deep Fryer** → **Description**. Edit the fifth bullet.

**Current text (exact, fifth bullet):**
> Made in the USA.

**Replace with:**
> Hand-welded in Louisiana.

Leave the rest of the description alone for this fix. It does say "our commercial deep fryers" about a collection full of residential fryers. That's worth a later pass, but it isn't a rule break.

---

## 3. Platinum Boiling Bundle SEO title

**Where it lives:** `Product/9799316111600`, **Platinum Boiling Bundle - Performance Stock Pot with Triple Jet Burner and Electronic Ignition ($100 Savings)**. The product shows updated 2026-09-17 16:46 UTC, but the SEO title is still unchanged.

**Click path:** Shopify admin → **Products** → **Platinum Boiling Bundle…** → scroll to **Search engine listing** → **Edit** → **Page title**.

**Current text (exact, 122 characters):**
> Seafood Boiling Pot Set | Crawfish Boiling Pot Set | Patented Technology | Made in the USA | Shop High Performance Cookers

**Replace with (61 characters):**
> Crawfish & Seafood Boiling Pot Set | Built in Louisiana | HPC

**Alternative if you want the full brand name (71 characters):**
> Seafood Boiling Pot Set | Built in Louisiana | High Performance Cookers

Google cuts titles off at about 60–70 characters, so the current one was already being cut before the claim showed. The meta description has no problem, so leave it. ⚠️ **SEO is Coalition's lane.** This removes a false claim and doesn't change strategy. Still, tell Connor it changed, so their rank tracking doesn't flag it as a mystery.

---

## 4. 18 QT description warranty line

**Where it lives:** `Product/6061985104048`, **18 QT Fish Fryer / Brazier Powered Pot**, the **Description** field. It's the last bullet in the list.

**Click path:** Shopify admin → **Products** → **18 QT Fish Fryer / Brazier Powered Pot** → **Description**. Easiest in the code view (`<>`), so the bullet list stays intact.

**Current text (exact):**
> Backed by 2-year warranty (commercial) / 5-year warranty (residential).

**Replace with:**
> Full 2-year warranty on every fryer. Limited 5-year warranty on residential pots 120 QT or smaller, covering the Tunnel Tube bottom, powered stand and welds.

---

## Found while reading: same page, same problems. Fix in the same session.

These weren't on the Group A list. They sit on the page the kit links to, and they break the same two rules. Items 4b and 5 take one click each, and you'll already have those screens open.

### 4b. A second warranty card on the 18 QT page, with the same wording as item 4
**Where:** `Metaobject/111384822000` (Product Features). Only the 18 QT Powered uses it.
**Click path:** Content → Metaobjects → Product Features → the entry reading "Warranty Included" (or via the 18 QT's Product features metafield, fifth entry) → **feature** field.
**Current (exact):**
> **Warranty Included**
> 2-year (commercial) & 5-year (residential) warranties.

**Replace with:**
> **Warranty Included**
> Full 2-year on every fryer. Limited 5-year for residential use.

*Both qualifiers:* the card sits only on an 18 QT page, so the size qualifier holds. To match item 4 word for word, add "on pots 120 QT or smaller." `SAFETY.md` asks for both qualifiers, so the safe version is:
> Full 2-year on every fryer. Limited 5-year on residential pots 120 QT or smaller.

### 4c. "5 Year Warranty" badge on the 18 QT Powered
**Where:** the 18 QT Powered's `custom.badge_labels` metafield = `["Best Seller","5 Year Warranty"]`. The baseline report listed this badge on a *draft* 18 QT Scratch & Dent. It's also on the **live** 18 QT Powered. Whether the theme shows badges hasn't been tested.
**Click path:** Products → 18 QT Fish Fryer / Brazier Powered Pot → Metafields → **Badge labels**.
**Replace** `5 Year Warranty` **with** `5-Yr Residential Warranty`. `SAFETY.md`'s exception lets *creative* that shows a single qualifying pot drop the size qualifier. This badge only sits on the 18 QT, so it meets the spirit of that exception. It's a page element, though, not creative. If you want no argument at all, use `2-Year Warranty`.

### 5. "Made in USA" in different words, in the 18 QT description
**Where:** the same Description field as item 4, first bullet.
**Current (exact):**
> Built from top-quality materials in the USA.

**Replace with:**
> Hand-welded in Louisiana from 4mm aluminum.

The base pot is bought overseas (`hpc-standing-rules.md`), so "materials in the USA" is false in the same way "Made in the USA" is.

### Full replacement for the 18 QT bullet list (items 4 and 5 together; paste in code view)
```html
<ul>
<li>Hand-welded in Louisiana from 4mm aluminum.</li>
<li>Features our patented <strong><a href="https://highperformancecookers.com/pages/why-buy-a-high-performance-cooker">Tunnel Tube Technology</a></strong> for unmatched speed and efficiency.</li>
<li>Twice as thick as other pots (4mm).</li>
<li>A versatile pot for frying fish, chicken, and more.</li>
<li>Reliable, high-performing indoor and outdoor fish fryer with basket.</li>
<li>Full 2-year warranty on every fryer. Limited 5-year warranty on residential pots 120 QT or smaller, covering the Tunnel Tube bottom, powered stand and welds.</li>
</ul>
```
Everything else in the description, including the Prop 65 block, stays as it is.

---

## Flagged, not fixed: needs Evan's or Jay's call first

These are on the 18 QT page the kit sends people to. They aren't Group A and none is a clear-cut swap, so I haven't written replacements into the list above.

| Where | Live text | Why it's a problem |
|---|---|---|
| Description bullet 5 · `row_1_content` | "indoor and outdoor fish fryer" · "even in a professional kitchen" | This is a propane cooker, and the page's own Prop 65 block warns about carbon monoxide. It's a safety claim we can't back. Suggest "outdoor fish fryer." **Jay's call.** |
| SEO meta description | "come to a temp in less than 3 minutes" | This is a flat number, and it contradicts the "350° in under 5 minutes" stat on the same page. Suggest: "Hits 350° in as little as 5 minutes on up to 75% less propane. Hand-welded in Louisiana. Shop the 18 QT Fish Fryer." Coalition owns SEO, so tell them. |
| `stat_labels` | "350 degrees in 5min" · "Reaches temperature 3x faster" · "75% fuel savings" | None of these numbers is qualified. Suggest "350° in as little as 5 min" · "Up to 3x faster to temp" · "Up to 75% less propane." Nothing on file backs the "3x" either. |
| Feature card `111384723696` · FAQ `111384887536` | "Heats up 3x faster" · "With three times the surface area… heat 3x faster" | "3x" is unqualified and has no source on file. |
| Description bullet 3 · feature card `111384756464` | "Twice as thick as other pots" | This compares us to other pots with no source. No competitor is named, so it isn't a rule break, but it's a claim that has to hold up. |
| `row_2_content` | "we blow the competition away" | Nobody is named, but it's off-voice. Low priority. |

---

## Checked, and clean
- **Tailgate Fry Kit draft** (`Product/10292065861872`): the description and Features & Benefits carry both warranty qualifiers. They have no "Made in USA," "cast," crawfish or "hard boil," and every number is qualified.
- **`fryers` collection SEO title and meta description:** clean.
- **Platinum meta description:** clean.

**Sources:** Shopify Admin GraphQL, read 2026-09-17 (metaobject `111384690928` and its siblings, collection `fryers`, products `9799316111600`, `6061985104048`, `10292065861872`) · highperformancecookers.com/pages/warranty-information, read 2026-09-17 · `hpc-standing-rules.md` · `what-we-sell.md` · baseline report §6.
