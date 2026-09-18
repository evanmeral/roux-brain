# Asset Index

All paths relative to `~/Desktop/HPC/`.

## 🔥 Lifestyle & food photography — `assets/lifestyle/` (added 2026-08-28)
**The gap that was blocking lifestyle-led creative. Now filled.**

### Hero shots — use these first
| File | Size | What it is | Use for |
|---|---|---|---|
| **`120qt-with-steam.png`** | 2968×1850 | **The money shot.** 120 QT with the HPC shield visible, steam pouring off it, propane tank, people talking by a lake, pine trees. Golden dry grass. | The rolling-boil proof AND the lifestyle brand in one frame. Full-bleed hero. |
| **`Crawfishboil-basket-pour.png`** | 3280×1836 | Basket pouring crawfish, corn, potatoes and sausage onto the table. Bright, wet, appetising. | Food-led hero. The "feed a crowd" payoff. |
| **`Welder-welding-tunneltubes.png`** | 3266×1818 | Close-up: gloved hands, MIG torch, sparks flying, **tunnel tubes being welded**. | Made in Louisiana · team of 12 · the patented tech, being made by hand |
| **`pwd-burner-lit.png`** | 3276×1846 | Powered burner lit | Flame / heat proof |
| **`Cooked-crawfish.png`** | 3258×1800 | Cooked crawfish | Food hero, alternative to the pour |
| `Crawfish.jpg` | 723×1318 | Crawfish, **vertical** | Stories / Reels — the only natively vertical food shot |
| `TunnelTubeBottom-BlueFlame.jpeg` | 640×323 | Tunnel tube underside with blue flame | The tech itself. **Low res — request a bigger version.** |

### 🍗 Fryer in use — added 2026-08-28 (fills the fried-food gap)
| File | Size | What it is | Best for |
|---|---|---|---|
| **`18qt-frying-chicken-wings.MOV`** | **1080×1920 · 7.0s · H.264 + audio** | Wings frying in the 18 QT. Oil bubbling hard, **thermometer clipped to the rim**. Tight, vertical. | ⭐ **Reels / Stories / TikTok as-is.** Native 9:16, correct length. The best asset in the folder for organic video. |
| `18qt-frying-wings.jpeg` | 5712×4284 | Overhead phone shot — 18 QT on a countertop, oil bubbling, thermometer, skimmer, HPC branding on the rim. Flip-flops and a batter container in frame. | **UGC-style proof**, comment replies, organic. Honest and real. |
| `18qt-frying-wings-1.jpeg` | 4032×3024 | Same session, alternate angle | Same |

**Honest read:** these are *authentic*, not *polished*. Phone photos with a countertop, flip-flops
and a plastic tub in shot. That's a strength for organic and UGC-style ads — it looks like a real
customer, not a catalogue — but they aren't hero shots for a premium paid creative the way the steam
and pour images are. **Use them where realness is the point.**

⭐ **The thermometer in frame is a proof element.** HPC's own ad copy claims the 18 QT "hits 350° in
under 5 minutes." A video showing the dial *is* that claim demonstrated. Worth shooting a version
that holds on the thermometer.

### 👥 Team — added 2026-09-18
| File | Size | What it is | Use for |
|---|---|---|---|
| **`hpc-team-crawfish-cookoff-booth-2026-04.jpg`** | 4032×3024 | Six of the team in matching red HPC shirts under the HPC tent at a crawfish cookoff, Apr 18 2026 (photo metadata). The canopy reads "Feel the Heat. See the Speed. Taste the Difference." There's a "Why buy an HP cooker?" A-frame sign, and an HPC shield yard sign. Horizontal, outdoor, bright. | The team-on-camera trust asset: organic posts, the about page, "real people build these." |

The shield yard sign reads "patent pending". That's fine: it's real signage in a photo, and the patent-pending rule covers copy we write, not photos (Evan, 2026-09-18). It shows **six people, not the team of 12**, so don't caption it as the whole team.

### Product-in-scene (studio lifestyle)
`60-quart-lifestyle.png` · `80-quart-lifestlye.png` *(sic)* · `100-quart-lifestyle.png` ·
`120-quart-lifestyle.png` · `BB-burner-lifestyle.png` · `BB-paddle-lifestyle.png` ·
`BB-ring-lifestyle.png` · `Ultimate Boiling Bundle.png` · `boilboss-ultimate-combo.jpeg` (5712×4284) ·
`hf_20260716_195203_*.png`

Most are **928×1152** — fine for 4:5 and 1:1, **too small for 1080×1920 stories.**

### Still missing
- **The team of 12**, on camera. Partly filled: six of them at the Apr 2026 cookoff booth (above). A full-team shop shot is still missing
- ✅ ~~Fried food~~ — covered by the wings set (2026-08-28)
- **Finished fried food** — wings/fish *out* of the oil, plated or draining. The current set is all
  in-the-oil; there's no payoff shot.
- A **higher-res tunnel-tube/blue-flame** shot (current one is 640×323)
- More **vertical (9:16) originals** — now `Crawfish.jpg` plus the wings video

> ✅ Renamed to `120qt-with-steam.png` by Evan — colon gone, no encoding needed.

### Video handling
ROUX can pull a **poster frame** from video using macOS `qlmanage`, and read duration, dimensions and
codec. It **cannot watch video or scrub to a timestamp** — `ffmpeg` isn't installed. If pulling
stills from video footage becomes routine, installing ffmpeg (`brew install ffmpeg`) would unlock it.

## ⭐ Product cutouts — `assets/product-cutouts/` (added 2026-08-27)
**39 transparent PNGs, background removed, faint drop shadow.** Prepared by Evan. High resolution
(1512×2016, 1800×2400, 2400×1800). **These are the raw material for all static ad creative.**

**Naming:** `perf` = Performance pot (pot only, works on any burner) · `pwd` = Powered
(pot + legs + burner as one piece). See `context/products-catalog.md` → Product Architecture.

| Group | Files |
|---|---|
| **Powered cookers** | `60qt boiler - pwd` · `80qt - pwd` · `100qt - pwd` · `120qt - pwd` (+ alt) · `120qt on BB-TJB_` · `40gal - propane_` |
| **Performance pots** | `60qt - perf` · `80qt - perf` · `30qt - perf` · `18qt - perf` |
| **Fryers** | `18qt - pwd` · `18qt pwd on leg extensions` · `18qt_fryer_leg_extensions` · `30qt - pwd` · `60qt turkey fryer - pwd` · `4-way fryer - perf` · `4-way fryer - pwd` |
| **Steamers / specialty** | `28qt steamer` · `100qt steamer_` · `30qt w_ steamer rack - pwd` · `small steamer plate` · `40qt sauce pot - pwd` |
| **Burners** | `single jet burner module` · `double jet burner module` · `triple jet burner module` · `10inch banjo burner` · `Boilboss TJB` |
| **Boil Boss / bundles** | `Boilboss bundle` · `boilboss combo` · `Bundle-Ultimate-Master-Photoroom` · `Accessory master photo` |
| **Accessories** | `basket buddy` · `boil bag` · `centering brackets` · `leg extensions_` · `single turkey fryer rack` · `Dual turkey rack` |
| **Commercial** | `commercial-cooker-lid-closed.jpg` |

→ **Ad creative system: `work/creative/` — run `./build.sh` to render HTML templates to PNG.**

### 2026-09 refresh — `assets/product-cutouts/updated-2026-09/` (added 2026-09-16)
**146 new transparent PNGs, identified and renamed 2026-09-15.** Copied from Evan's "Updated product
images" drop before it moved to the shop Dropbox. The original 39 above are untouched; these sit in
their own subfolder so nothing in `_bboxes.json` or existing templates shifted. Bounds for all 146
are in `_bboxes.json` keyed with the subfolder prefix, so `prod.py "updated-2026-09/18qt - pwd - lid on, front.png" 470` works as-is.

**Naming:** `product - config - shot`, e.g. `80qt - pwd - lid on, three-quarter`. Multiple angles per
product (lid on / lid off / top-down / burner underside / full kit with hose and regulator), which the
original set mostly lacked. `100-120qt - pwd` = the 100/120 shared plate where the size could not be
read from the frame — confirm before using in size-specific creative.

**New subjects not in the original 39:** Crawcuzzi crawfish cleaner (6 angles) and its air blower ·
100 QT steamer trays (single and set of three) · 28 QT steamer tray and burner base · 30 QT turkey
fryer (perf and pwd) · 30 QT and 80 QT baskets alone · 18 QT basket + notched lid · 4-way fryer single
basket · replacement jet burner tube · Boil Boss seasoning (Original and Hot, 4 lb) · Boil Boss TJB
detail shots (control box, igniter, centering bracket) · 60 gal commercial cooker (14 angles) ·
commercial flip-basket, burner underside and custom "SAINTS" lid · crawfish sorting table.

Full original-filename map with the confidence notes on every size call:
`my-work (outputs)/internal/2026.09.15 - HPC - Product Image Rename Map.md`.

## Studio product shots — `assets/studio-product-images/` (added 2026-09-16)
**146 jpg/png, the same 146 shots on a white studio background** (not transparent). Same base names
as `updated-2026-09/`, so the cutout and the studio version of any shot are found by the same search.
Use for product-grid, catalogue and white-background layouts where a cutout on a coloured stage is
wrong; use the cutout for everything else.

## ⭐ Logo set — `assets/brand-refs/` (complete as of 2026-08-27)

**The shield is the primary mark. Use it unless there's a reason not to.**

| File | What | Use on |
|---|---|---|
| `HPC-ShieldLogo-Color.png` | **PRIMARY** — full-colour shield, "PATENT NO. 11,844,459 · TUNNEL TUBE TECHNOLOGY" | Light and mid-tone backgrounds, orange/flame panels |
| `HPC-ShieldLogo-White.png` | Shield, solid white knockout | **Dark backgrounds.** Far cleaner than the colour shield on charcoal |
| `HPC-ShieldLogo-Black.png` | Shield, solid black knockout | Light backgrounds where colour would compete; print, single-colour |
| `HPC-CircleLogo-color.png` | Circle badge, full colour | Secondary. Use only if the composition calls for a round mark. |
| `HPC-FlameLogo-Color.png` | HPC flame mark, colour | Icon-only use — avatars, watermarks, small spaces, patterns |
| `HPC-FlameLogo-Black.png` | HPC flame mark, black | Same, single-colour contexts |
| `HPC Logo.png` | Original filename of the colour shield (duplicate) | Kept for backwards compatibility |

> ⚠️ **The circle logo reads "BUILT ON PATENT PENDING TECHNOLOGY."** The patent has since issued
> (**No. 11,844,459**, as shown on the shield). Prefer the shield anywhere the patent line is legible.

**Rules:** logo on every creative unless deliberately omitted · clear space ≥ the height of the
shield's point on all sides · never recolour, stretch or rotate · pick the variant that gives
contrast rather than adding glows or drop shadows to force it.

## Brand references — `assets/brand-refs/`
Shopify theme screenshots: `Primary Colors.png`, `Fonts.png`, `Buttons.png`, `Header.png`,
`Footer.png`, `Product & grid.png`, `Notifications.png`, `Dynamic Checkout Button.png`.
**Confirmed:** Poppins (headings + body) · accent `#F69329` · text `#222222` · background `#F3F6F6`.

## Logos & marks
| File | Use |
|---|---|
| `HPC Logo.png` | Primary logo |
| `HPC Logo copy.png` | Duplicate |
| `Black-full-screen-logo.png` | Full-screen black lockup |
| `HPC_Shield_Single-Color-BlackBG.png` | Shield mark, single color, black background |

## Lifestyle photography — `hpc lifestyle photos/`
| File | Subject |
|---|---|
| `60-quart-lifestyle.png` | 60 QT cooker in use |
| `80-quart-lifestlye.png` | 80 QT *(note: filename typo)* |
| `100-quart-lifestyle.png` | 100 QT |
| `120-quart-lifestyle.png` | 120 QT — **hero SKU** |
| `BB-burner-lifestyle.png` | Boil Boss Triple Jet Burner |
| `BB-paddle-lifestyle.png` | Thermo Paddle |
| `BB-ring-lifestyle.png` | Cooling Ring |
| `Ultimate Boiling Bundle.png` | Bundle |
| `boilboss-ultimate-combo.jpeg` | Ultimate Combo |

## Product / commercial — `cooker pictures/`
| File | Subject |
|---|---|
| `commercial-cooker-lid-closed.jpg` / `-flip-lid-open.jpg` | Commercial boiler |
| `commercial-cooker-crawcuzzi.jpg` / `-crawcuzzi-open.jpg` | Crawcuzzi cleaner |
| `commercial-cooker-gantry-lift-set-up.jpg` | Gantry lift setup |
| `commercial-cooker-natural-gas-burner.jpg` | Natural gas burner |
| `commercial-cooker-lifestyle-banner.jpeg` | Commercial lifestyle banner |
| `18qt_fryer_leg_extensions.PNG`, `leg extensions.png` | 18 QT accessory |

## Site assets (root)
| File | Use |
|---|---|
| `Hero-banner-desktop.png` | Homepage hero |
| `60gallon commercial cooker - lid open/closed.PNG` | Commercial PDP |
| `CBG Bingo Ad.png` | Ad creative (Oct 2025) |

## Campaign archives
- `18qt giveaway/` — Sept 2025 giveaway: SweepWidget covers, IG carousel slides 1–3, teaser post.
  **Reusable template for future giveaways.** Post-mortem data missing — see open question #28.

## Brand / theme reference — `HPC Shopify colors:Font/`
Screenshots of the live Shopify theme settings: `Primary Colors.png`, `Fonts.png`, `Buttons.png`,
`Header.png`, `Footer.png`, `Product & grid.png`, `Notifications.png`, `Dynamic Checkout Button.png`.
→ Tokens transcribed into `context/design-system.md`.

## Code — `Landing Page Code/`
| File | What |
|---|---|
| `commercial-cookers-updated.txt` | Most current commercial landing page (86KB) |
| `HPC_Commercial_Page_DropIn.txt` | Shopify drop-in version |
| `commercial-cookers-landing.txt` | Earlier version |
| `HPC_Savings_Calculator_Page_3.txt` | **Propane savings calculator** — high-value conversion asset |
| `commercial-savings-calculator.txt` | Commercial variant |
| `18qt-fish-fryer-landing-v3.txt` | Single-product configurator pattern |

## Documents
| File | What |
|---|---|
| `HPC_MEGA_Audit.pdf` | ⚠️ Won't extract — subsetted fonts. Re-share as .docx/.md. |
| `HPC_Shipping_Department-Operations_Manual.docx` | Ops manual — useful for shipping-time claims |
| `HPC_affiliates_Master_List.xlsx` | Influencer/affiliate master list (PII — handle carefully) |
| `MKTG Budget.xlsx` | Subscriptions: Claude $100/mo, Canva $18/mo |

## Asset gaps
<!-- TBD -->
- **Video.** No video files found locally. Video is the entire game on IG/TikTok/YouTube. Where does it live?
- No vertical 9:16 crops of lifestyle photos — needed for Stories/Reels/TikTok.
- No UGC library. Every creator post should be saved and catalogued for reuse in ads.
- No 18 QT or turkey fryer lifestyle photos in the lifestyle folder despite being the most-seeded SKUs.
