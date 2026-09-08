# Showroom product cards — complete, 31 cards

**Closed 2026-09-08.** Came off the board as a Parked "on hold" item; finished in one run
across three batches. Deliverables → [showroom-cards/](../../my-work%20%28outputs%29/content/other/showroom-cards/)
· generator → `my-skills/hpc-ad-creative/work/creative/templates/showroom-cards/`

## What they are

One landscape card per product, sat next to that product on the showroom floor, so a
walk-in sees the price and what comes in the box without asking. **1650 × 1275 px =
5.5 in × 4.25 in at 300 dpi — four to a LANDSCAPE Letter page.**

| Group | Count |
|---|---|
| Powered cookers (18 QT → 120 QT) | 10 |
| Performance cookers | 7 |
| Steamers + the 40 Gallon | 3 |
| Burners and burner modules | 6 |
| Accessories | 5 |

Handed to **Alexis** (front desk) via
[Drive](https://drive.google.com/drive/folders/1SasUL1WDa6enxvaAE78o_XrGQ5Cjvxr0) with a
printing guide. Evan drags the PNGs in — the Drive connector takes file bytes inline as
base64 and 31 print-resolution files are 18 MB of it.

## The three things that shaped the format

**1. "Four to a sheet" arrived after two rounds were already built.** The finished
physical size sets the type size, so it invalidated the canvas: 7 × 5 in became 5.5 × 4.25,
and every size had to be re-derived in points on paper rather than pixels. Body copy that
looked generous at 7 in was about 6 pt at the real size. → memory: `ask-print-spec-first`

**2. The cards fail silently.** An over-long line stretched the price column and pushed the
dollar amounts clean off the canvas with no error at all. So the generator now *measures the
rendered card* — overflow, band baseline, wrapped feature, wrapped price-row label, wrapped
deck, wrapped add-later line, product centring — and exits non-zero. Character budgets are a
loose net only: "Add the Steamer Rack Insert" (27 chars) fits where "Add basket + steam
rack" (23) wraps.

**3. Photos have to be PNG.** Three uploads arrived as JPEGs flattened onto black — the
alpha channel gone, so they would have printed as a black rectangle. `pngtool.py key`
recovers one only when the product has no genuinely black parts; it ate the shield logo off
the Performance pot and could not touch the Cooling Ring or Thermo Paddle at all. Replaced
with proper PNG exports. Bounds are now measured at **alpha > 120**, because several cutouts
carry a soft drop shadow that otherwise inflates the box and shrinks the product.

## Claims discipline held

- Every feature traces to that product's own PDP, `what-we-sell.md`, or a figure Evan set;
  `src` on each product in `make-cards.py` records which. No claim carried across products.
- **No warranty line on any card.** Silence is safe; a shortened 5-year claim is not.
- **No fuel-savings claim on any burner card** — Tunnel Tubes are on the pot bottom, so
  crediting the burner would break the rule. Cost a bullet on six cards.
- **No crawfish or boil use on a fryer card.**
- The Boil Boss Triple Jet is not offered on the 30 QT Performance card — that pairing
  starts at 80 QT.
- Scratch & Dent left off entirely: 3 of 4 30 QT variants were out of stock, and stock moves
  too fast to print.

## Still open

- **Evan:** drag the 31 PNGs into the Drive folder.
- **Nova:** `Performance Boiling Pots (60QT to 120QT)` is a duplicate listing of the four
  individual Performance pots — same sizes, same options, identical prices, not a bundle.
- **Prices carry no date on the card.** Re-pull `products.json` and re-render before every
  print run; Alexis pulls a card when its price moves.
