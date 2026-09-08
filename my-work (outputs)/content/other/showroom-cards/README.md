# Showroom product cards

Landscape print cards for the HPC showroom floor — one card per product, sat next to the
product it describes. **Sized for four cards to a sheet.**

## Printing — read this first

**Canvas: 1650 × 1275 px = 5.5 in × 4.25 in at 300 dpi.** That is exactly one quarter of a
**landscape** Letter page.

In Google Docs: **File → Page setup → Landscape**, margins 0.4". Insert the four images and
set each one **5.1"–5.5" wide**, two per row. Every type size on the card was chosen in
*points on paper* for that placement — body copy lands at **10–11 pt**, prices at 20 pt.

⚠️ **Do not print these four-up on a portrait page.** A portrait quarter is 4.25 × 5.5 —
the card would have to shrink to about 4.25" wide and body copy drops to ~8 pt.

## The layout — every card follows it

| Zone | Contents |
|---|---|
| Full-width top | Tag chip · product name (27 pt) · one description line · orange rule |
| Full-width middle | **6 features**, two columns, one line each · "Good for" chips |
| **Bottom-left corner** | Product cutout, bottom-aligned. **No type ever overlaps it.** |
| **Bottom-right** | The pricing block · "Add later" line |
| Shield logo | Top-right |

The bottom band is a **fixed 612 px on every card**, so the price panel always fills it no
matter how many rows a product has, and a printed sheet of four cards lines up.

**Product vertical alignment.** Tall cutouts (most Powered rigs) bottom-align in the band and
sit in the corner — that is the default. Short, wide cutouts leave too much air above them
when bottom-aligned; add `mid` to the product column (`<div class="prodcol mid">`) to centre
the product in the band instead. The 30 QT Performance uses `mid`; the 30 QT Powered does not.
Judge it per product from the render, not from the cutout's dimensions.

## Cards built — 12

| Card | File | Prices |
|---|---|---|
| 18 QT Powered Fryer | `18qt-powered.png` | $285–$340 |
| 18 QT Performance Fryer | `18qt-performance.png` | $220–$265 |
| 30 QT Powered Pot | `30qt-powered.png` | $435 / $455 / $475 |
| 30 QT Performance Pot | `30qt-performance.png` | $335 ⚠️ see *Open questions* |
| 30 QT Turkey Fryer | `30qt-turkey-powered.png` | $395 / $442.50 / $462.50 |
| 40 QT Sauce Cooker | `40qt-powered.png` | $289.99 / $309.99 |
| 4-Way Fryer / Pasta Cooker | `4way-powered.png` | $379.99 / $396.99 |
| 60 QT Powered Cooker | `60qt-powered.png` | $515 / $525 / +$10 |
| 60 QT Dual Turkey Fryer | `60qt-dual-turkey-powered.png` | $495 / $505 |
| 80 QT Powered Cooker | `80qt-powered.png` | $630 / $655 / +$10–$30 |
| 100 QT Powered Cooker | `100qt-powered.png` | $670 / $700 / +$10–$30 |
| 120 QT Powered Cooker | `120qt-powered.png` | $715 / $735 / +$10–$30 |

**Cards are generated, not hand-written.** All content lives in one table in
`templates/showroom-cards/make-cards.py`; edit there and re-run. It refuses to build a
card whose copy would overflow — see *Rebuild*.

## Open questions blocking the rest of the batch

1. ⚠️ **What does a Performance boiling pot actually ship with?** The 30/60/80/100/120 QT
   Performance PDPs never say, and their variants only choose a drain valve — unlike the
   Powered SKUs, which encode the basket (`PW30-VLV075-SBI`). The **30 QT Performance card
   already says "Pot, Basket & Lid"** and that is unverified. Do not print it until Jay or
   Robert confirms. Blocks the 60 and 80 QT Performance cards too.
2. ⚠️ **Turkey rack fitment contradicts itself on the live site.** The variant is named
   "Single Upright (30 QT or larger)" but the PDP body says it "fits our 40 or 50 QT pots."
   Blocks the combined turkey-rack card.
3. **Photos needed:** 100 QT Performance · 120 QT Performance · 6" Banjo module ·
   **Boil Boss Cooling Ring** and **Thermo Paddle** (only lifestyle shots exist, no cutouts).
4. **Naming, set by Evan 2026-09-08:** "Fryer", never "Fish Fryer / Brazier". Both 4-Way
   products are "4-Way Fryer / Pasta Cooker". The 40 Gallon is "40 Gallon", never "160 QT".

## Where the numbers came from

Pulled live from `highperformancecookers.com/products.json` on **2026-09-03** and checked
against `my-business (context)/what-we-sell.md`. Both matched.

- 30 Qt Powered Pot With Drain Valve, Basket & Lid — 3 variants: $435 / $455 / $475
- 30 QT Performance Seafood/Stock Pot — 1 variant: $335
- Add-ons shown: steamer insert (30 QT) $24.99 · replacement basket (30 QT) $40 ·
  replacement lid (30 QT) $18.50. *(Turkey rack $25 dropped for space — it is already in
  the $475 build.)*

⚠️ **No "prices as of" date appears on the card** (removed 2026-09-03). Re-pull and
re-render before every print run, and pull old cards off the floor when a price moves.

**Scratch & Dent is deliberately not on the cards.** Only 1 of the 4 30 QT S&D variants was
in stock on 2026-09-03; availability moves too fast for print.

## Claims on the card — read before adding a product

- **"Rolling boil in under 7 minutes"** (set by Evan, 2026-09-03). This is firmer than the
  house "as fast as / up to" rule, but it is **verbatim the live PDP copy** — the 30 QT
  product page says "takes less than 7 minutes to reach a raging boil." Keep it consistent
  with the PDP; do not let it drift to a flat guarantee on a product whose page doesn't say it.
- **"Fry oil to 350° in under 10 min"** (set by Evan, 2026-09-03). Note this is *more
  conservative* than the documented frying stat — `what-we-sell.md` records **350° in under
  5 minutes** for the 18 QT Fish Fryer, the 4-Way and the 40 QT. Evan's 10-minute figure is
  the safe number for a 30 QT on a 6" banjo burner. Use the 5-minute stat only on the three
  products it is documented for.
- **"90 seconds"** recovery and **"up to 75% less propane"** are the standard proof points.
- **No warranty claim appears on the card at all** (fine print removed 2026-09-03). That is
  the safe state — say nothing rather than say it short. If a warranty line is ever added it
  must carry **both** qualifiers: residential, and 120 QT or smaller.
- No competitor named. Tunnel Tubes credited to the **pot**, never the burner.
- The Boil Boss Triple Jet is **not** offered on the 30 QT Performance card — that pairing
  starts at 80 QT (`what-we-sell.md`, Tier 1A).

## Rebuild

```
cd "my-skills/hpc-ad-creative/work/creative/templates/showroom-cards"
python3 make-cards.py            # every card
python3 make-cards.py 80qt       # just the ones matching
```

`make-cards.py` asserts a character budget on the deck, each feature, the add-later line
and both halves of every price row **before** it writes anything, because the card
overflows silently otherwise. The price-row budget scales with how wide the amount
renders — a 7-character `$379.99` leaves far less label room than `$435`. If an assert
fires, shorten the words. **Never shorten a price to fit: $34.75 is not $35.**

**Two checks before any card ships — the card silently overflows otherwise.**

1. **Vertical fit.** `scrollHeight` must be ≤ 1275 and `.bottom` must end at 1246:
   ```
   python3 templates/showroom-cards/heights.py templates/showroom-cards/<card>.html
   ```
   Every `.feat` row must be **51 px**. A 102 px row means that bullet wrapped — shorten the
   copy, don't shrink the type. A too-wide `.addons` line stretches the price column and
   pushes the dollar amounts clean off the card without any error.

2. **Product placement.** The bottom-left product region is 758 × 740 starting at (0, 754)
   on the old 2100-wide card; on this 1650 × 1275 card use 600 × 620 at (0, 634):
   ```
   python3 templates/showroom-cards/measure-panel.py drafts/showroom/<card>.png 600 620 60 0 634
   ```
   `dx` must land inside ±50 for both the silhouette bbox and the ink-weighted centre.
   `dy` should be near 0 on a `mid` card, and large and positive on a bottom-aligned one.
   Current: powered bbox +15 / ink −19, dy +59 (bottom-aligned) · performance bbox +14 /
   ink −13, dy +7 (centred).

Template + shared stylesheet: `my-skills/hpc-ad-creative/work/creative/templates/showroom-cards/`
