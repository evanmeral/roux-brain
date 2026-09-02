---
name: carousel
description: Builds a multi-frame Instagram/Facebook feed carousel for HPC — cover, product frames, offer card — rendered to PNG at 1080x1350 with a paste-ready caption. Use when you hear "carousel", "swipe post", "multi-image post", "a post with a few products in it", or "/carousel".
---

# Build a Carousel

## Goal
A finished, paste-ready carousel: numbered PNG frames in posting order plus the caption,
saved where Evan can grab them. Built from one JSON config, not by hand-writing templates.

**Why carousels:** it's the format Instagram rewards for saves and swipe-through, and it's the only
format that can argue a *range* — the natural home for the year-round mandate. One post that says
"we make more than crawfish boilers" beats five that each say one thing.

---

## The shape that works

| Frame | What it does |
|---|---|
| **1 — cover** | Photo-led. One idea, big type. It has to earn the swipe on its own. |
| **2 to N — products** | One product each. Cutout on the dark charcoal ground, eyebrow / headline / sub, then a stat strip. |
| **N-1 — the attach** | The accessory or add-on that rides along with the products above it. Sets up the offer. |
| **N — offer card** | ⭐ **Always last.** The discount, the codes, the dates. |

**Rules that came from Evan, don't relitigate them:**
- **The offer card goes last.** Products first, offer closes.
- **Put the attach product second-to-last** so it's the last thing seen before the discount. On the
  Labor Day build, leg extensions in that slot tied the whole carousel to the promo.
- **Frames are numbered** `03 / 07`. If the count changes, every frame's counter changes.
- **Nothing touches type.** Product never crowds a headline.
- **Five to seven frames.** Fewer than four isn't worth the format; past eight nobody swipes.

---

## Steps

### Step 1: Pull context
- `my-business (context)/what-we-sell.md` — prices, tiers, **which products actually go together**
- `my-business (context)/how-we-sound.md` — voice, banned words, the six creative rules
- `my-skills/hpc-ad-creative/instructions.md` — claims discipline, logo variants, the centring method
- If there's a promo, **verify the codes and prices in Shopify before writing a number.** Read-only.

Ask Evan only what you genuinely can't infer: the theme, and which products belong in it.

### Step 2: Write the config
Copy `my-skills/carousel/example-config.json` (the real Labor Day carousel, as shipped) and edit it.
Save it next to the campaign, e.g. `my-work (outputs)/content/ads/<campaign>/carousel.json`.

Fields worth knowing:
- `cutout` — a filename or any unique fragment of one; run `python3 prod.py --list` to see them all
- `stats` — the strip under the copy, one array entry per line. `<b>` turns text gold, `<s>` strikes it
- `tag` — the small orange line under the stats. Good for fitment or an offer nudge
- `boxHeight` — default 440; raise it for a tall narrow product (the fryer-on-legs used 480)
- `nudge` — `[x, y]` optical correction. **Leave it out on the first pass**, then set it from Step 4

### Step 3: Generate and render
```bash
cd "my-skills/hpc-ad-creative/work/creative"
python3 carousel.py path/to/carousel.json     # writes templates/<name>/frame-NN-*.html
./build-carousel.sh <name>                    # renders drafts/<name>/*.png
```

### Step 4: ⛔ Check the centring. Never skip this.
```bash
python3 check-centering.py drafts/<name>
```

`carousel.py` centres the cutout's **bounding box**, and several HPC cutouts have a lid leaning left,
a regulator hose sprawling, or a long handle — so the *pot* lands off-centre even though the box
doesn't. **Evan catches this every time.** The checker prints the offset and the nudge to apply:

```
frame-02-18qt.png     +3.5    -39.8   ok
frame-04-sauce.png   -121.0    +5.5   split — thin accessory one side, judge by eye
```

Put the suggested nudge in the config, regenerate, re-check. Target: both numbers inside ±50px.
When `bbox` and `mass` have opposite signs the cutout has something thin sticking out one side —
split the difference, don't drive either to zero.

### Step 5: Look at it
Build a contact sheet and actually view it. Layout bugs the checker can't catch: type colliding with
the product, a photo crop that misses the subject, a background so dark the image reads as nothing.

```bash
# quick sheet: an HTML page of <img> tags at height:440px, screenshot it
```

### Step 6: Write the caption
Structure that worked:
1. **The cover line, restated as a sentence.** The hook people read first.
2. **What's in the carousel**, in a short list.
3. **The one fact that ties it together** (a shared stat, a fitment note).
4. **"Swipe through and…"** — tell them to swipe.
5. **The offer**, both codes, whether they stack, the end date.
6. **Hashtags** — 6 to 8, mixing place and use case.

### Step 7: Save it
| What | Where |
|---|---|
| Config | `my-work (outputs)/content/ads/<campaign>/carousel.json` |
| Frames | `my-work (outputs)/content/ads/<campaign>/` as `CAROUSEL_1-…` through `_N-…` |
| Caption + posting note | the campaign's posting-schedule markdown |

Name the files in posting order — Evan uploads them by filename and the order is the whole point.

---

## Claims check before it ships
Run every frame against these. They are not optional.

- Every performance number qualified — "up to," "as little as," "in as fast as," "in under."
- **Never "hard boil."** Rolling boil or raging boil.
- **Never pair a fryer with crawfish.** Fryers are for fish, soft-shell crab, beignets, hushpuppies,
  fries, wings, okra. Never invent a use case.
- **Warranty:** full 2-year on everything; the 5-year is *limited*, *residential*, *120 QT or
  smaller*. Never shorten it. Never put it on commercial.
- **Leg extensions fit the 18 QT, 4-Way and 40 QT only.**
- **350° in under 5 minutes is the FRYING stat** for those three. Boil time is for pots.
- Prices verified in Shopify the day you write them, not taken from a file.
- No competitor named. Shield logo present. Lead with quality, not price.

---

## Gotchas
- **`&` and `%` in config text** — write `&amp;` and it renders fine; `%` is safe in JSON but the
  templates use `%%` internally, so don't hand-edit the generated HTML unless you know that.
- **A blank PNG** means the template couldn't find an asset. `build.sh` warns when a file is under
  20KB. Check the `../../../../assets/` path depth — templates live two levels below `creative/`.
- **Cover photos are landscape, frames are portrait.** A `cover` crop shows a narrow vertical slice
  and often misses the subject entirely. Check what's actually in frame before accepting it.
- Don't rebuild a frame Evan has approved. If a structural change forces an edit (the counter when
  the count changes), make only that edit and say so.
