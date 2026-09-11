# Live Meta ad claims audit — 2026-09-11

**Source:** public Meta Ad Library, page 100186835257740. 13 active cards (about 14 ads), read by Finn 2026-09-11. Read-only. No Edit panel opened, and "Review and publish" read zero.
**Why:** Evan confirmed the pots are 4mm aluminum, **not cast** (the only cast part is a piece on the Boil Boss Triple Jet burner), and blocked "Made in USA" until the pots are made in-house.

## Flagged

| Ad | Campaign | Field | Exact text | Action |
|---|---|---|---|---|
| `hpc-dark-evergreen` (18 QT Fish Fryer) | IW Lookalike | Primary text | "4mm cast aluminum. Full 2-year warranty on everything we build, plus a limited 5-year on residential pots 120 QT and smaller." | ⛔ Change to **"4mm aluminum. …"** (Evan's click) |
| `hpc-dark-evergreen` | IW Lookalike | Description (all 3 versions) | "Built in Louisiana. 4mm cast aluminum." | ⛔ Change to **"Built in Louisiana. 4mm aluminum."** |
| `hpc-dark-evergreen` | IW Lookalike | Image (per the library render; the live image wasn't readable) | "4MM CAST ALUMINUM" | ⛔ Swap to `drafts/hpc-dark-evergreen-v2-{1x1,9x16,1.91x1}.png` once approved |
| Library ID 790771196792685 (30 QT turkey cooker video, running since Aug 4, 2025) | Not matched | Primary text | "Built in the USA using premium materials." | ⚠️ Close to the blocked Made in USA claim. Evan's call |
| 7 catalog ads (943116984709601 · 1214062597259240 · 1457600422140758 · 1279654400628730 · 1625564535129512 · 1068468602198674 · 1065521362600764) | Not matched | `{{product.description}}` from the Shopify feed | Unconfirmed. The 18 QT description says "Built from top-quality materials in the USA" and "5-year warranty (residential)" | ⚠️ Feed text comes from the Shopify PDP. Also: **which campaign are these in?** |

**Clean:** the `120qt-performance_rolling-boil` and `120qt-crowd-math` warranty lines carry both qualifiers. No "Yeti," "hard boil," or competitor names in any readable text.

## Couldn't read
- On-video text on the 6 video creatives. The Ad Library doesn't show it.
- The live images on 901135212591078 and 1767649234545772 (screenshots came back blank).
- The product-feed text in the 7 catalog ads.
- IW ads were matched to their campaign by copy, because Ads Manager rows wouldn't load.
