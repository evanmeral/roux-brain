# HPC Static Ad Creative

Renders HTML/CSS → PNG at exact ad pixel sizes via headless Chrome. No design software needed.

**Use whenever Evan asks for** an ad, a static creative, a graphic, a promo image, a social post image, variations of an existing creative, or a new creative angle for the library.

---

## Before you build — read these

- `my-files (knowledge)/hpc-reference/customer-language.md` — the objection, the Yeti frame, real verbatims
- `my-business (context)/what-we-sell.md` — prices, sizes, **Powered vs Performance**, priority tiers
- `my-business (context)/how-we-sound.md` — voice rules and banned phrasing
- `work/creative/README.md` — the system

## Build

```bash
cd "my-skills/hpc-ad-creative/work/creative"
./build.sh templates/<template>.html 1080x1350 drafts/<name>.png
```

Author templates at **true ad pixel size** (1 CSS px = 1 output px). Import `../brand.css`.

> ⚠️ **Path invariant — do not break this.** Templates reference art as `../../../assets/` (top-level
> templates) or `../../../../assets/` (templates in a subfolder). That resolves to
> `my-skills/hpc-ad-creative/assets/`. **`assets/` must stay exactly three levels above `templates/`.**
> If you move either folder, every template breaks.

### Centring a product — always use `prod.py`

Cutouts have large transparent margins, so sizing the file does **not** centre the product.

```bash
python3 prod.py "18qt - pwd.png" 470        # size by visible width
python3 prod.py "80qt - pwd.png" 400 h      # size by visible height
python3 prod.py --list                      # all cutouts
```

It prints a `.pbox` snippet cropped to the visible bounds. Drop it in a flex container and the
**product** centres. Bounds are precomputed in `assets/product-cutouts/_bboxes.json`.

#### ⚠️ `prod.py` centres the BOUNDING BOX, not the product. Always check the render.
*Learned the hard way, 2026-09-02 — Evan flagged every product frame in a carousel as off-centre.*

Several cutouts carry something that inflates the bounding box on one side: a lid leaning left
(`18qt - pwd`), a regulator hose sprawling left (`40qt sauce pot - pwd`), a long handle to the upper
right, legs splaying under a tall body. Centre that box and the **pot** sits visibly off-centre.

**Never ship a product frame without measuring the rendered PNG.** Point a headless-Chrome canvas at
the output, threshold for bright, low-saturation pixels inside the stage band (metal is bright and
neutral; the orange glow is bright but saturated — a `lum>95, sat<42` filter separates them cleanly),
and compute two numbers against the frame centre:

- **silhouette bbox centre** — where the whole object sits
- **brightness-weighted centre** — where the visual mass sits

Start the scan band *below the logo* (y≈200) or the logo pollutes the measurement. Then nudge with a
`transform:translate()` on the `.pbox` until both land within roughly ±50px on a 1080 frame. When the
two disagree strongly, the cutout has a thin accessory sticking out — split the difference rather
than chasing either one to zero.

Alpha-centroid maths alone is **not** a substitute: a big flat lid over-weights the centroid and
over-shoots the correction. Measure the actual render.

### All three Meta sizes, always

**Paid Meta — every static ad ships in these three, no exceptions.**
*Set by Evan 2026-09-08, replacing the earlier `{1x1,4x5,9x16}` set.*

| Ratio | Pixels | Placements |
|---|---|---|
| **1:1** | 1080×1080 | Feed, Marketplace, Explore |
| **9:16** | 1080×1920 | Stories, Reels |
| **1.91:1** | 1200×628 | Right column, Search, Audience Network |

⚠️ **4:5 (1080×1350) is an organic size, not a paid one.** Evan's call, 2026-09-08 — it stays
in the rotation for feed posts and carousels, and comes out of every paid set. Do not ship it
as part of a Meta ad build.

Organise as `templates/<concept>/{1x1,9x16,1.91x1}.html`, then:

```bash
./build-set.sh <concept>
```

> **All three sizes of one concept go into ONE ad**, mapped with Meta's placement
> customization — never three separate ads, which splits the budget three ways and puts every
> one of them into learning.

---

## ⛔ Evan's seven creative rules — check every creative against all of them

1. **Logo always present** unless deliberately omitted for a reason.
2. **Product centred** in whatever area it occupies. Use `prod.py`.
3. **Never "hard boil."** Use **rolling boil** or **raging boil**.
4. **Never link fryers to crawfish.** A fryer is for fish, soft-shell crab, beignets, hushpuppies,
   fries, wings, okra. Be creative about genuine uses — **never invent one.**
5. **Type centred in its container** — stats and labels must not touch borders or dividers.
   **Nothing touches type.** The product never crowds or overlaps a headline unless it's deliberate.
6. **Ask for the images you need**, specifying the treatment: cutout, cutout with shadow, plain
   white background, studio shot, specific angle.
7. **Readable on a phone, without squinting.** *(Evan, 2026-09-16.)* Customers read these at thumb
   size, so every line that carries information has to be easy to read. On a 1080-wide frame, feed
   or story: **headlines 72px+ · body and sub-copy 36px+ · every other line that says something**
   (stats, labels, eyebrows, prices, codes, names, credits, tags, swipe cues, frame counters) **30px+**,
   heavier weight rather than lighter, and never faded below ~60% white. **Only fine print is exempt**
   — a disclaimer like *"Times vary with volume, ambient temperature and fuel pressure"* or a patent
   line — and it keeps a 20px floor. **Check it before showing anyone:** look at the PNG at ~380px
   wide (how it lands in a phone feed); any non-fine-print line that needs a zoom gets sized up.
   Same lesson as Jay's 2026-09-15 note on the IW ads.
   ⚠️ **Below the bar today, fix on next use and re-render:** `carousel.py` stat lines (26px), tags
   (21px), swipe cue (23px), frame counter (26px), CTA footer (24px); the `cw-2026-09-21` templates'
   spec labels (17px), review credit line (20px) and story footers (23–25px). The Sept 21–27 week
   predates this rule and ships as approved.

## Claims discipline (non-negotiable)

- Qualify every performance number: "as little as," "up to," "in as fast as." Never a flat guarantee.
- **Warranty: full 2-year on all products** (parts and labor, normal use). **Limited 5-year on residential pots 120 QT or smaller** — Tunnel Tube pot bottoms, powered cooker stands and all welds; **owner pays labor and shipping both ways.** Never say "5-year warranty" without both qualifiers: residential, and 120 QT or smaller. Verified against highperformancecookers.com/pages/warranty-information, 2026-09-01.
- **Never name a competitor.** "Cheap pots" beats naming anyone.
- Prices must match `my-business (context)/what-we-sell.md`. Re-pull before running a price.
- **Tunnel Tube tech is the tubes hand-welded on the POT BOTTOM**, spreading the burner's heat across
  the whole base. Never imply the burner is what makes it fast.
- Patent No. **11,844,459.**
- **Lead with quality, not price** — 80% of customers buy on quality, 10% on price.

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
⚠️ The circle logo says "patent pending" — the patent has issued. Prefer the shield.

## Sizes

| Format | Size | Notes |
|---|---|---|
| Feed portrait 4:5 | **1080×1350** | Meta's best feed format — default |
| Feed square | 1080×1080 | Safe everywhere |
| Story / Reel | 1080×1920 | Keep type out of top ~250px and bottom ~340px |
| Landscape | 1200×628 | Link ads, Display |

**Pricing in ads:** promotional creative (a sale) **should** carry the numbers. Cold prospecting
defaults to **no price** — 80% buy on quality. Offer and retargeting ads carry numbers.
**Copy variations:** propose and build them when a test would help. Don't wait to be asked.

## Promo creative conventions
*Set during the Labor Day 2026 build, 2026-09-02.*

- **Say the discount in words, not just codes.** A story carrying only `LABORDAY10-26` doesn't tell
  anyone what they get. Put a plain badge on it — **10% OFF SITEWIDE** — with the codes underneath.
- **In a sale carousel, the offer card goes LAST.** Products first, offer closes. Put the accessory
  or attach product in the second-to-last slot so it sets up the offer card.
- **Number the frames** (`03 / 07`) so the sequence is obvious, and update every frame if the count
  changes.
- **Landscape photo in a 9:16 story.** `background-size:cover` on a wide shot shows only the middle
  ~30% and usually crops the subject out entirely. Instead run a **blurred `cover` copy underneath**
  and the sharp photo on top at `background-size:auto <55-80>%` so more of the scene reads. **Feather
  the band's top and bottom** with `mask-image:linear-gradient(...)` — a hard seam where the sharp
  photo meets the blur reads as a black line across the screen. Check the scrim afterwards: it can
  swallow the very thing you just uncovered.

## Gotchas

- **Never `open(p,'w').write(open(p).read()...)`** — truncates before reading and destroys the file.
  Two statements: read, modify, write.
- **Don't regex-edit HTML structure** — rewrite the template file.
- `build.sh` warns when a PNG is under 20KB — that means a blank render. Don't ship it.
- **Always look at the rendered PNG** before showing Evan. Layout bugs are obvious on sight.

## Workflow

1. Render to `drafts/`.
2. **Look at the PNG.**
3. Show Evan. **Never archive unapproved work.**
4. On approval:
   ```bash
   ./approve.sh drafts/x.png <product-slug> <angle-slug> [channel] [notes]
   ```
   → copies into `library/` as `YYYY-MM-DD_<product>_<angle>_<WxH>_v<N>.png` and logs it in
   `library/LIBRARY-LOG.md`.

## Angle bank (grounded in HPC data)

| Angle | Why it works |
|---|---|
| **The clock** | Buyers arrive sceptical; reviewers said it "worked like advertised" |
| **Quality economics (Yeti)** | Price is the top objection but only 10% buy on it |
| **Fry it all** | 18 QT is the #2 SKU for the year, #1 in August — the off-season engine |
| **Crowd math** | 2 sacks / 40+ people / 1 pot |
| **Propane math** | The savings calculator, finally used in an ad |
| **Team of 12** | *"a small team of 12 that do everything"* — the trust asset |
| **Performance-pot entry** | Already own a burner? You only need the pot. The Tier 1A push. |
| **Accessory attach** | Cooling Ring is the highest-margin item at 54% |

## Folder map

```
my-skills/hpc-ad-creative/
├── instructions.md          <- this file
├── assets/                  <- source art (MUST stay 3 levels above templates/)
│   ├── brand-refs/          <- logos, colors, fonts, UI refs
│   ├── lifestyle/           <- real photos, incl. Welder-welding-tunneltubes.png
│   └── product-cutouts/     <- transparent PNGs + _bboxes.json
└── work/creative/
    ├── build.sh  build-set.sh  approve.sh  prod.py  brand.css
    ├── templates/           <- author here
    ├── drafts/              <- render here, unapproved
    └── library/             <- approved only, + LIBRARY-LOG.md
```
