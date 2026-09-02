# HPC Static Ad Creative System

**Renders HTML/CSS → PNG at exact ad dimensions using headless Chrome.**
No Photoshop, no Canva, no design tool required. Fully scriptable, fully repeatable.

## Make an ad

```bash
cd work/creative
./build.sh templates/timer-4x5.html 1080x1350 out/my-ad.png
```

**Author templates at true ad pixel size** — 1 CSS px = 1 output px. A 1080×1350 ad is authored in a
1080×1350 canvas. No scaling math.

## What's here

```
brand.css              Shared design tokens + component classes. Import in every template.
build.sh               The renderer:  ./build.sh <tpl> <WxH> <out.png>
prod.py                Product-centring helper (see below). ALWAYS use this for product images.
build-set.sh           Renders one concept across all 3 Meta sizes.
approve.sh             Archives an APPROVED draft into library/ + logs it.
templates/             Ad templates, one per creative angle × format.
drafts/                Working renders. Not archived. Overwrite freely.
library/               Approved creatives only + LIBRARY-LOG.md
```

## Centring products — always use `prod.py`
The cutouts have large transparent margins, so sizing the *file* does not centre the *product*.

```bash
python3 prod.py "18qt - pwd.png" 470      # size by visible width
python3 prod.py "80qt - pwd.png" 400 h    # size by visible height
python3 prod.py --list                    # list all 39
```
Prints a `.pbox` snippet cropped to the visible bounds. Put it in a flex container and the product
centres perfectly. Bounds precomputed in `assets/product-cutouts/_bboxes.json`.

## Naming + logging
Drafts render to `drafts/` and are disposable. **Only after Evan approves or edits:**
```bash
./approve.sh drafts/03-fryer.png 18qt-fryer fry-it-all meta "off-season push"
```
→ `library/2026-08-27_18qt-fryer_fry-it-all_1080x1350_v1.png` + a row in `library/LIBRARY-LOG.md`.
Format: `YYYY-MM-DD_<product>_<angle>_<WxH>_v<N>.png`

Product cutouts live in `../../assets/product-cutouts/` (39 transparent PNGs, 1512×2016 to 2400×1800).
Reference from a template as `../../../assets/product-cutouts/<file>.png`.

## Logo variants — pick for contrast, never force it
`assets/brand-refs/` — **the shield is primary.**

| File | Use on |
|---|---|
| `HPC-ShieldLogo-Color.png` | Light / mid-tone / orange backgrounds |
| `HPC-ShieldLogo-White.png` | **Dark backgrounds** |
| `HPC-ShieldLogo-Black.png` | Light backgrounds, single-colour, print |
| `HPC-CircleLogo-color.png` | Secondary — only if a round mark suits the composition |
| `HPC-FlameLogo-Color/Black.png` | Icon-only: avatars, watermarks, small spaces |

Choose the variant that already has contrast. **Don't add glows or shadows to make a logo work.**
⚠️ The circle logo says "patent pending" — the patent has issued (No. 11,844,459). Prefer the shield.

## Meta = always all three sizes
Evan's standing request: for a Meta campaign, deliver **all three sizes Meta wants** — 1080×1080,
1080×1350, 1080×1920 — not one. Organise a concept as `templates/<concept>/{1x1,4x5,9x16}.html`
and render the set in one command:

```bash
./build-set.sh rolling-boil          # -> drafts/rolling-boil-{1x1,4x5,9x16}.png
```

**Copy variations:** when a test would be useful, propose the variants and build them — don't wait
to be asked. Same layout, different hook, rendered as separate PNGs.

## Ad sizes that matter

| Format | Size | Where |
|---|---|---|
| **Feed portrait (4:5)** | **1080×1350** | **Meta's best-performing feed format. Default to this.** |
| Feed square (1:1) | 1080×1080 | IG/FB feed, safe everywhere |
| Story / Reel (9:16) | 1080×1920 | IG/FB stories, Reels covers |
| Landscape | 1200×628 | Link ads, Google Display |

**Story safe zones:** keep type out of the top ~250px and bottom ~340px — platform UI covers it.

## Brand tokens (in `brand.css`)

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#F69329` | HPC orange. CTAs, eyebrows, highlights. |
| `--accent-dk` | `#E13418` | Flame red. Gradient end, emphasis. |
| `--gold` | `#FFA41C` | Stars, badges |
| `--ink` | `#1A1918` | Near-black |
| `--offwhite` | `#F3F6F6` | Light background |
| `--flame` | gradient | The signature orange→red |
| `--char` | gradient | Charcoal radial for dark ads |

**Type:** **Poppins** 800 for headlines, 500 for body. **JetBrains Mono** 700 for eyebrows, specs,
and legal — the mono is what makes HPC read as *performance equipment* rather than cookware. Keep it.

Evan's note: colors and fonts are a starting point, not a cage. Deviate when the creative is better for it.

## The four templates (creative angles)

| # | Template | Angle | Why it exists |
|---|---|---|---|
| 1 | `timer-4x5` | **The clock** | Two reviewers said it "worked like advertised." Buyers arrive skeptical of the 7-minute claim. Show the number. |
| 2 | `yeti-1x1` | **Quality economics** | Price is the #1 objection but only 10% of buyers cite it. Reframes price as *frequency of purchase*, using Evan's own Yeti/styrofoam line. |
| 3 | `offseason-4x5` | **Not just crawfish** | The 18 QT is the #2 product for the year and #1 in August. Uses a real verbatim: *"steak fingers, fries and okra."* This is the year-round growth angle. |
| 4 | `crowd-9x16` | **Crowd math** | 2 sacks / 40+ people / 1 pot. The flagship 120 QT in the format that gets the cheapest reach. |

## Angles still to build
Propane math (savings calculator) · Team of 12 / made in Louisiana · Performance-pot entry point
("already got a burner? you only need the pot") · Scratch & Dent value · Bundle offer ·
Season urgency · Commercial throughput · Boil Boss accessory attach

## ⛔ Evan's creative rules — check all six, every time
1. **Logo always present** unless deliberately omitted for a reason.
2. **Product centred** in its area. Use `prod.py`.
3. **Never "hard boil."** Use **"rolling boil"** or **"raging boil."**
4. **Never link fryers to crawfish.** A fryer is for fish, soft-shell crab, beignets, hushpuppies,
   fries, wings, okra. Be creative, never invent.
5. **Type centred in its container** — nothing touching borders or dividers.
6. **Ask Evan for images you need**, specifying treatment: cutout, cutout with shadow, plain white
   background, studio shot, specific angle.

## Claims — do not break these
- **Claims get qualifiers.** "as little as," "up to," "in as fast as." Never a flat guarantee.
- **Warranty: full 2-year on all products** (parts and labor, normal use). **Limited 5-year on residential pots 120 QT or smaller** — Tunnel Tube pot bottoms, powered cooker stands and all welds; **owner pays labor and shipping both ways.** Never say "5-year warranty" without both qualifiers: residential, and 120 QT or smaller. Verified against highperformancecookers.com/pages/warranty-information, 2026-09-01.
- **Never name a competitor.** "Cheap pots" beats "Bayou Classic."
- **Prices must match `context/products-catalog.md`.** Re-pull before running a price in an ad.
- **Lead with quality, not price.** 80% of customers buy on quality; 10% on price.
- **Tunnel Tube tech is in the POT, not the burner.** Never imply the burner makes it fast.
- Patent No. **11,844,459**.

## Gotchas (learned the hard way)
- **Never write `open(p,'w').write(open(p).read()...)`.** Python opens for writing *first*, which
  truncates the file, so the read returns empty and the template is destroyed. Always
  `s = open(p).read()` → modify → `open(p,'w').write(s)` as two statements.
- **Don't regex-edit HTML structure.** Rewrite the template file instead. Non-greedy `.*?</div>`
  patterns silently swallow the wrong block.
- `build.sh` now **warns if the PNG is under 20KB** — that almost always means a blank render from a
  broken template. Heed it; don't ship the file.
- **Always open the rendered PNG and look at it** before showing Evan. Overlaps and clipping are
  obvious on sight and invisible in the markup.

## Adding a template
1. Copy an existing one in `templates/`
2. Keep `<link rel="stylesheet" href="../brand.css">`
3. Set `html,body{width:Wpx;height:Hpx}` to the true ad size
4. Render, look at it, iterate. Layout bugs are obvious on sight and cheap to fix.
