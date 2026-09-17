# Kit product pages: titles and description copy

**2026-09-16 · Maya · for Evan, building the kits in Shopify.** Read-only; nothing was written to Shopify.

Sources: contents, prices and savings from [the bundles plan](../../internal/2026-09-11-tailgate-thanksgiving-bundles-plan.md) ("The kits", §3.1, §3.3, §4.2, §4.3, §4.4, §5). Fitment and claims from `what-we-sell.md` (frying line, fryer accessory fitment note). Copy rules from `hpc-standing-rules.md` and `how-we-sound.md`.

Prose is under 180 words per product, not counting the contents list. Every number is qualified. No competitor, no "hard boil", no crawfish, no "Made in USA", no "cast". Warranty carries both qualifiers.

---

## Product A: Tailgate kit

**Title (matches the existing bundle shape):**
Tailgate Fry Kit - 18 QT Fish Fryer Powered Pot with Leg Extensions, Fry Thermometer and Skimmer ($19.98 Savings)

**Shorter alternative:**
Stand-Up Tailgate Fry Kit - 18 QT Powered Fryer + Legs ($19.98 Savings)

**Subtitle (one line):**
Fry standing up. The whole rig, one price, ready for the parking lot.

**Options / variants:**
One variant. No option needed (Shopify's default single variant). If you want a label on it: option `Size`, value `18 QT`.

**Description (paste into Shopify's description field):**

```html
<p>Fry standing up. The leg extensions lift the 18 QT to about 41 inches, so you're not hunched over hot oil in a parking lot. Drop the tailgate, set the rig, fry.</p>

<p>The speed is in the pot. Hand-welded Tunnel Tubes on the bottom spread the burner's heat across the whole base, so the oil hits 350&deg; in as little as 5 minutes and burns up to 75% less propane getting there. Fish, fries, wings, okra, hushpuppies. Game day now, Lent fish fry later, the driveway in between.</p>

<p>4mm aluminum, hand-welded in Louisiana. Patent No. 11,844,459. Full 2-year warranty on everything. Limited 5-year warranty on residential pots 120 QT or smaller.</p>

<p><strong>What's in the kit</strong></p>
<ul>
  <li>18 QT Fish Fryer / Brazier Powered Pot, 1/4-inch valve, with basket &mdash; $340.00</li>
  <li>Cooker Leg Extensions &mdash; $119.00</li>
  <li>5-inch stainless steel fry thermometer, the one that fits this pot &mdash; $15.99</li>
  <li>20-inch heavy-duty chrome wire mesh skimmer &mdash; $9.99</li>
</ul>
<p><strong>Kit price: $465.</strong> Bought separately: $484.98. You save $19.98.</p>

<p>The kit price already includes the saving, so discount codes don't apply to it. Welcome codes still work on everything else in your cart, and military and first-responder discounts still apply.</p>
```

**Build notes (from the plan, §3.3):** native bundle with a line-item group so Finn can count it · compare-at exactly $484.98 (don't inherit the fryer's $313 compare-at) · tags `Bundle`, `Sale-NoDiscount`, `Tailgater`, `no-wholesale` · collections `tailgater-tools`, `fryers`, `product-bundles` · live Fri Sep 25, evergreen.

---

## Product B: Turkey Fry Kit (two variants, one page)

**Title (matches the existing bundle shape):**
Turkey Fry Kit - Turkey Fryer Powered Pot with Rack, Fry Thermometer, Wind Shield and Skimmer (Up to $25.98 Savings)

**Shorter alternative:**
Turkey Fry Kit - 30 QT or 60 QT Two-Bird (Up to $25.98 Savings)

*"Up to" because the two variants save different amounts ($23.48 and $25.98). If you'd rather show the range: "($23.48 to $25.98 Savings)".*

**Subtitle (one line):**
Fry the bird in November. Boil and steam in the same pot all year.

**Options / variants:**
Option `Size` · values `30 QT` and `60 QT Two-Bird`.

**Description (paste into Shopify's description field; one description covers both variants):**

```html
<p>One pot for the bird. The 30 QT fries one turkey. The 60 QT fries two at once, up to two 20-pounders. Both come with the burner, the rack, and the pieces you'd otherwise be hunting for on Thanksgiving morning.</p>

<p>The speed is in the pot. Hand-welded Tunnel Tubes on the bottom spread the burner's heat across the whole base, so your oil hits 350&deg; in under 10 minutes on up to 75% less propane. The Wind Shield keeps a November gust off your flame.</p>

<p>Then keep it out. Set it up to boil and it hits a rolling boil in under 7 minutes. Shrimp, corn and potatoes in the spring, a low-country boil for the Fourth, the bird again next fall.</p>

<p>4mm aluminum, hand-welded in Louisiana. Patent No. 11,844,459. Full 2-year warranty on everything. Limited 5-year warranty on residential pots 120 QT or smaller.</p>

<p><strong>What's in the kit</strong></p>
<ul>
  <li>Your pot: 30 QT Turkey Fryer Powered Pot with turkey rack and basket &mdash; $442.50, or 60 QT Dual Turkey Fryer Pot with drain valve, lid and dual turkey rack, 3/4-inch gate valve &mdash; $495.00</li>
  <li>12-inch stainless steel fry thermometer &mdash; $18.99</li>
  <li>Wind Shield &mdash; $21.00</li>
  <li>20-inch heavy-duty chrome wire mesh skimmer &mdash; $9.99</li>
</ul>
<p><strong>30 QT kit: $469.</strong> Bought separately: $492.48. You save $23.48.<br>
<strong>60 QT Two-Bird kit: $519.</strong> Bought separately: $544.98. You save $25.98.</p>

<p>The kit price already includes the saving, so discount codes don't apply to it. Welcome codes still work on everything else in your cart, and military and first-responder discounts still apply.</p>
```

**Build notes (from the plan, §4.4):** native bundle with 30 QT and 60 QT variants · compare-at $492.48 and $544.98 · tags `Bundle`, `Sale-NoDiscount`, `Turkey`, `no-wholesale` · collections `turkey-frying-pots-cookers`, `fryers`, `product-bundles` · live Thu Oct 1, evergreen. 60 QT variant is the 3/4-inch valve only; the 1-inch valve (+$10) stays optional and is not in the kit.

**Optional seasonal line, not in the evergreen copy above.** Add it Oct 1, remove it Mon Nov 23 (Jay's last order date for Thanksgiving delivery):
`<p><strong>Order by Monday, November 23 to have it for Thanksgiving.</strong></p>`

---

## Checks before publishing

- [CHECK: 12-inch thermometer on the 60 QT. The plan (§4.3) says this was ROUX's assumption from your 30 QT call, pending your confirmation. The copy assumes it.]
- [CHECK: "rolling boil in under 7 minutes" on the 60 QT Dual. `what-we-sell.md` says the 30 and 60 QT carry the claim "when set up to boil", and that the 60 QT Powered Cooker boils on a Single Jet while the 60 QT Dual ships with a 6-inch banjo. If the 60 QT Dual on its banjo doesn't hit 7 minutes, cut "in under 7 minutes" from the third paragraph and leave "Set it up to boil" as is.]
- ~~"steaming in the summer"~~ — replaced with "a low-country boil for the Fourth" before the build (Atlas, 2026-09-16): nothing on file says a steamer insert fits the 60 QT Dual.
- The 41-inch height is from the legs PDP as quoted in the plan (§3.3), qualified as "about".
- "Two 20-pounders" is from the 60 QT Dual's PDP as given in the brief, qualified with "up to".

## Word counts (prose only, contents list excluded)

Counted by script on the paragraphs outside the `<ul>` and the price lines, 2026-09-16. Product A: 142 words. Product B: 174 words.
