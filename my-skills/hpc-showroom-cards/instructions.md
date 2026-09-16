---
name: hpc-showroom-cards
description: Reprints, adds, changes or retires the HPC showroom product cards — one landscape print card per product, generated from one data table, price-checked against Shopify, rendered and measured before anything is handed to Alexis to print. Use when you hear "showroom cards", "product cards", "print run", "reprint the cards", "a price changed on a card", "new card for", "Alexis needs a card", or "/hpc-showroom-cards".
---

# Showroom cards

**One card per product, sat next to it on the showroom floor, so a walk-in sees the price
and what comes in the box without asking.** 31 cards exist (built 2026-09-08). The format is
locked; the prices are not. The job is nearly always one of three things:

| Mode | When | Who |
|---|---|---|
| **A. Reprint** | Before any print run, or when a price moves | Finn checks prices · Nova rebuilds · Evan hands to Alexis |
| **B. Add or change a card** | A new product, a copy fix, a new photo | Nova builds · Evan approves every card |
| **C. Retire a card** | A product comes off the site | Nova · Evan tells Alexis |

Everything lives in the render pipeline inside `my-skills/hpc-ad-creative/work/creative/`
— **on purpose, do not move it** (CLAUDE.md, structural invariants). Read
`my-skills/hpc-ad-creative/instructions.md` once for the pipeline itself.

| File | What it is |
|---|---|
| `templates/showroom-cards/make-cards.py` | **The one data table** (`P`) and the generator. Writes each card's HTML, renders it, then **measures the rendered card** and exits non-zero on any fault |
| `templates/showroom-cards/card.css` | The locked layout. Every type size is in points on paper |
| `templates/showroom-cards/heights.py` · `measure-panel.py` | The two gates `make-cards.py` runs: vertical fit, and product placement |
| `templates/showroom-cards/export-for-print.py` | Copies the renders to the hand-off folder with numbered product names. Refuses if a rendered card is missing from its `ORDER` list |
| `drafts/showroom/<key>.png` | The renders |
| `my-work (outputs)/content/other/showroom-cards/` | Delivered copies · `for-printing/` numbered set · **`README.md` is the printing guide and the rulebook for the cards** |
| `assets/product-cutouts/` + `_bboxes.json` | Transparent PNG cutouts and their measured bounds |

---

## The locked spec — do not re-ask, do not re-derive

Set by Evan 2026-09-03 after three passes; see `decisions.md` and the print-spec memory.

- **1650 × 1275 px = 5.5 in × 4.25 in at 300 dpi. Four to a LANDSCAPE Letter page.**
  Type is set in points on paper: body 11 pt, deck 10.8 pt, name 27 pt, prices 20 pt.
- Product cutout bottom-left, nothing overlaps it. Six features, one line each. Price block
  bottom-right in a fixed 612 px band. Shield logo top-right.
- **No warranty line. No "prices as of" date. No fine print.** Silence is the safe state.
- ⛔ A different piece (a shelf talker, a different size, a portrait card) is **not this
  skill**. Ask the print spec first — finished size, how many per sheet, page orientation —
  and build a new template.

---

## Mode A — reprint

Prices carry no date on the card, so **a printed card cannot be recalled when a price
moves**. This mode runs before every print run, no exceptions (board, Landmines).

1. **Read** `my-work (outputs)/content/other/showroom-cards/README.md` and
   `my-business (context)/what-we-sell.md`.
2. **Finn pulls the live prices** for every product with a card — Shopify connector,
   read-only, the variant **price** field (never compare-at). The public
   `highperformancecookers.com/products.json` is the no-login fallback and a cross-check,
   not the source: *Shopify prices always win* (Evan, 2026-09-10). Return one table:
   card · price row · amount on the card · live amount · match. Also flag any card whose
   product is gone from Shopify, renamed, or has a variant added or removed.
3. **Fix every mismatch in the `rows` of that product in `make-cards.py`.** ⛔ **Never round
   or trim a price to make it fit.** $34.75 is not $35. If a longer amount breaks the row,
   shorten the words next to it. If the change means `what-we-sell.md` is also wrong, update
   it with the source and date — a business-file fact, not a card fact.
4. **Rebuild and verify.**
   ```bash
   cd "my-skills/hpc-ad-creative/work/creative/templates/showroom-cards"
   python3 make-cards.py            # every card; exit 0 is the pass
   python3 make-cards.py 80qt       # only the keys that match
   ```
   The last line must read `0 with problems`. A `FAIL` names the fault: overflow, a wrapped
   feature, a wrapped price label, a wrapped deck or add-later line, or the product
   off-centre. **Shorten the copy, never the type**; nudge the product only from the
   measurement, and comment why.
5. **Look at every changed PNG.** A blank render, type touching the product, a clipped
   dollar amount — obvious on sight, invisible in a log.
6. **Deliver.** Copy each changed `drafts/showroom/<key>.png` over its twin in
   `my-work (outputs)/content/other/showroom-cards/`, then:
   ```bash
   python3 export-for-print.py      # rewrites for-printing/ with numbered product names
   ```
7. **Hand-off.** The Drive folder Alexis prints from is
   `https://drive.google.com/drive/folders/1SasUL1WDa6enxvaAE78o_XrGQ5Cjvxr0`. **Evan drags
   the PNGs in** — the Drive connector takes file bytes inline and the set is ~18 MB. Tell
   him, by product name, which cards changed, so Alexis pulls those off the floor. Page setup
   is in the README: landscape, 0.4 in margins, images 5.1–5.5 in wide, two per row.
8. **Close.** Update the README's *Where the numbers came from* date and source. The board
   landmine stays as it is. A price-rule change goes to `decisions.md`.

---

## Mode B — add or change a card

Evan approves every new or changed card before it is delivered. He locks pieces, gives
reasoned line notes, and sometimes reverts (creative-review memory). Fold notes in without
re-explaining, re-render only that card, show it again.

1. **Should it have a card?** Not if it is Scratch & Dent (stock moves too fast), the
   40 QT Sauce Stock Pot, a commercial boiler above the 40 Gallon (no photos), or a duplicate
   listing of products that already have cards (`decisions.md`, 2026-09-08). If unsure, ask
   Evan; do not guess.
2. **The photo.** A transparent **PNG** into `assets/product-cutouts/`, named in the library
   convention (`80qt - pwd.png`, `6inch banjo burner.png`; index in `ASSET-INDEX.md`). Then
   `python3 pngtool.py bbox <file>` from the creative folder and add its entry to
   `_bboxes.json`. Bounds are measured at alpha > 120 so a baked-in drop shadow does not
   inflate the box (README).
   ⛔ A JPEG arrives flattened onto black and prints as a black rectangle. `pngtool.py key`
   recovers it **only** when the product has no genuinely black parts — check the result;
   it ate the shield off a Performance pot once. Otherwise ask for a real PNG export.
3. **The content — one `dict` in `P`.** `key` · `tag` · `cut` · `h1` · `deck` · `src` ·
   exactly six `feats` · `chips` · `rows` · `add`. Rules baked into the file, restated because
   they cost real cards last time:
   - **Every feature traces to that product's own PDP, `what-we-sell.md`, or a figure Evan
     set. `src` records which.** Never carry a claim across from another product because it
     sounds right.
   - **Price rows come from the live variant list** (Finn, as in Mode A step 2).
   - Naming, Evan 2026-09-08: **"Fryer"**, never "Fish Fryer / Brazier"; both 4-Ways are
     **"4-Way Fryer / Pasta Cooker"**, the tag tells them apart; **"40 Gallon"**, never "160 QT".
   - **"Rolling boil in under 7 minutes"** only where that product's PDP says it. **"350° in
     under 5 min"** only on the three products `what-we-sell.md` documents it for (18 QT
     Fryer, 4-Way, 40 QT); **"under 10 min"** is Evan's conservative figure for the rest.
   - ⛔ No warranty line. ⛔ No fuel-savings claim on a **burner** card — Tunnel Tubes are on
     the pot. ⛔ No crawfish or boil use on a **fryer**. ⛔ The Boil Boss Triple Jet is not
     offered on the 30 QT Performance — that pairing starts at 80 QT. ⛔ Never claim a basket
     or lid is included unless the PDP says so. Turkey-rack fitment comes from Evan, not the
     page. Never a competitor, never "cast", never "Made in USA".
   - Steamers show **LEAD TIME**, the 40 Gallon shows **TO ORDER** with the phone number,
     burner modules show fitment as a **NOTE** — the bottom line is not always add-ons.
4. **Add it to `ORDER` in `export-for-print.py`** in print order: cookers by size, then
   steamers and commercial, then burners, then accessories. Export refuses otherwise.
5. **Render and verify** — `python3 make-cards.py <key>`, exit 0, then look at the PNG
   (Mode A steps 4–5). Character budgets in the file are a loose net; the measured render
   is the gate. "Add the Steamer Rack Insert" (27 chars) fits where "Add basket + steam
   rack" (23) wraps.
6. **Show Evan the PNG.** His yes, then Mode A steps 6–8. Add the card to the README's
   *Cards built* list and count.

---

## Mode C — retire a card

1. Evan's word that the product is gone or should not be shown.
2. Move (never delete — `rm` is denied in this repo) the render and the delivered copies
   to `_retired/` folders beside them: `drafts/showroom/_retired/`,
   `showroom-cards/_retired/`, `for-printing/_retired/`. Comment the product's `dict` out
   of `P` with the date and reason; remove it from `ORDER`.
3. Tell Evan which numbered card Alexis pulls off the floor. Update the README's list and
   count, and `decisions.md`.

---

## Report

Which cards changed, by product name · price mismatches found and what was corrected ·
the `make-cards.py` result line · what Evan has to do (drag to Drive, tell Alexis).

## Never

- Change a price on a card without a live Shopify figure to point at, or round one to fit.
- Add a claim that is not on that product's own PDP, in `what-we-sell.md`, or from Evan.
- Put a warranty line, a price date, a competitor, "cast", or "Made in USA" on a card.
- Ship a card that `make-cards.py` reported as `FAIL`, or one nobody looked at.
- Deliver a new or changed card before Evan has seen the PNG.
- Move `templates/`, `drafts/` or `assets/` — the paths between them are load-bearing.
