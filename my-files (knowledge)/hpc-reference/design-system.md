# Design System

*Extracted from live HPC landing page code (`~/Desktop/HPC/Landing Page Code/`) and Shopify theme
screenshots (`~/Desktop/HPC/HPC Shopify colors:Font/`). Use `hpc-landing-page` skill for any page build.*

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `--white` | `#FFFFFF` | Page background |
| `--offwhite` | `#F3F6F6` | Section alternation, cards |
| `--border` | `#ECEFEF` | Dividers, card borders |
| `--ink` | `#282727` | Body + headline text |
| `--muted` | `#726F6C` | Secondary text |
| `--accent` | `#F69329` | **Primary brand orange.** CTAs, eyebrows, top bar. |
| `--accent-dk` | `#E13418` | Deep flame red. Gradients, hover, emphasis. |
| `--gold` | `#FFA41C` | Highlights, star ratings, badges |
| `--success` | `#198754` | Confirmations, in-stock |

**Palette logic:** flame gradient (orange → red) against near-black ink on white/off-white.
Reads as heat without being loud. Do not introduce new hues without a reason.

## Typography

| Role | Font | Weights |
|---|---|---|
| Display / headings | **Poppins** | 700–800, `letter-spacing: -0.01em`, `line-height: 1.15` |
| Body | **Poppins** | 400–600, `line-height: 1.6` |
| Eyebrow / mono / stats | **JetBrains Mono** | 500–700, uppercase, `letter-spacing: 0.14em`, ~0.72rem |

**The mono is a signature.** JetBrains Mono on eyebrows, spec numbers, and the top bar gives HPC a
"performance equipment" feel — closer to a tool brand than a cookware brand. Keep it.

## Components (as built)

- **Buttons:** `border-radius: 6px`, `padding: 15px 26px`, weight 600, `translateY(-1px)` on hover.
  - Primary: `--accent` bg, white text, hover `#DE8420`
  - Outline: transparent, `--ink` border → `--accent` on hover
- **Top bar:** `--accent` background, white uppercase mono, 0.74rem — announcement/urgency strip
- **Container:** `max-width: 1180px`, `padding: 0 24px`
- **Eyebrow:** mono, uppercase, `--accent`, above every section headline

## Logo assets
Located in `~/Desktop/HPC/`:
- `HPC Logo.png` — primary
- `Black-full-screen-logo.png` — full-screen black lockup
- `HPC_Shield_Single-Color-BlackBG.png` — shield mark, single color on black

**Rules:** clear space = height of the shield on all sides. Never recolor outside the brand palette.
Never stretch. On busy photos, use the single-color shield with a scrim.

## Photography direction
- **Always:** real boils, real steam, real people, real driveways and back yards. Golden hour and
  night-with-flame both work.
- **Never:** plain white background product shots as the *lead* image. (Fine as secondary PDP images.)
- Available libraries:
  - `~/Desktop/HPC/hpc lifestyle photos/` — per-SKU lifestyle (60/80/100/120 QT, Boil Boss line)
  - `~/Desktop/HPC/cooker pictures/` — commercial cookers, Crawcuzzi, detail shots
- See `assets/ASSET-INDEX.md` for the full map.

## Existing page code (reference implementations)
`~/Desktop/HPC/Landing Page Code/`
- `commercial-cookers-updated.txt` — most current commercial page build
- `HPC_Commercial_Page_DropIn.txt` — Shopify drop-in version
- `HPC_Savings_Calculator_Page_3.txt` + `commercial-savings-calculator.txt` — **the propane savings calculator.** High-value asset; reuse the logic in ads and email.
- `18qt-fish-fryer-landing-v3.txt` — single-product configurator pattern

These are Liquid-ready (`{% layout none %}` pattern with Shopify globals restored in a script block).

---

## Static ad creative system (added 2026-08-27)
**`my-skills/hpc-ad-creative/work/creative/`** renders HTML/CSS to PNG at exact ad sizes via headless Chrome:
```bash
cd work/creative && ./build.sh templates/timer-4x5.html 1080x1350 out/ad.png
```
Author templates at true ad pixel size. Tokens + components live in `my-skills/hpc-ad-creative/work/creative/brand.css`.
Product cutouts: `assets/product-cutouts/` (39 transparent PNGs).

**Confirmed from the live Shopify theme** (`assets/brand-refs/`): Poppins for headings *and* body ·
accent `#F69329` · text `#222222` · background/foreground `#F3F6F6`.

**Ad sizes:** 1080×1350 (4:5, Meta's best feed format — default) · 1080×1080 · 1080×1920 (story;
keep type out of top 250px / bottom 340px) · 1200×628.

**Evan's direction (2026-08-27):** colors and fonts are a starting point, not a constraint — deviate
when the creative is stronger for it.
