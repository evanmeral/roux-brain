# Live Meta ad claims audit — 2026-09-11

**Source:** public Meta Ad Library, page 100186835257740. 13 active cards (about 14 ads), read by Finn 2026-09-11. Read-only. No Edit panel opened, and "Review and publish" read zero.
**Why:** Evan confirmed the pots are 4mm aluminum, **not cast** (the only cast part is a piece on the Boil Boss Triple Jet burner), and blocked "Made in USA" until the pots are made in-house.

## Flagged

| Ad | Campaign | Field | Exact text | Action |
|---|---|---|---|---|
| `hpc-dark-evergreen` (18 QT Fish Fryer) | IW Lookalike | Primary text | "4mm cast aluminum. Full 2-year warranty on everything we build, plus a limited 5-year on residential pots 120 QT and smaller." | **Kept live as is** to avoid a learning reset (Evan, 2026-09-11). Fix at the next refresh |
| `hpc-dark-evergreen` | IW Lookalike | Description (all 3 versions) | "Built in Louisiana. 4mm cast aluminum." | Kept as is (Evan). At the next refresh: **"Built in Louisiana. 4mm aluminum."** |
| `hpc-dark-evergreen` | IW Lookalike | Image (per the library render; the live image wasn't readable) | "4MM CAST ALUMINUM" | Kept as is (Evan). At the next refresh: the approved v2 in `library/` (2026-09-11_18qt-fryer_dark-evergreen_*) |
| Library ID 790771196792685 (30 QT turkey cooker video, running since Aug 4, 2025) | Not matched | Primary text | "Built in the USA using premium materials." | ✅ **Fine as is.** "Built in the USA" is allowed (Jay, 2026-09-11) |
| 7 catalog ads (943116984709601 · 1214062597259240 · 1457600422140758 · 1279654400628730 · 1625564535129512 · 1068468602198674 · 1065521362600764) | Not matched | `{{product.description}}` from the Shopify feed | Unconfirmed. The 18 QT description says "Built from top-quality materials in the USA" and "5-year warranty (residential)" | ✅ **Traced (Finn, Ads Manager, 2026-09-11):** five are BPM_TOF_Manual videos with multiple versions (18 QT UGC/Jay demo, Tailgate "3x the heat", 30 QT demo/time lapse); two blank Aug 7 "Shop Now" images are `18qt-001`–`004` in 18qt-TOF. Only those two may pull the product feed. **All spend sits inside the $314/day**: Sep 4–10 account total $1,403.19 across the five known ad sets. Names inferred from copy; the campaign conclusion doesn't depend on them |

**Clean:** the `120qt-performance_rolling-boil` and `120qt-crowd-math` warranty lines carry both qualifiers. No "Yeti," "hard boil," or competitor names in any readable text.

## Couldn't read
- On-video text on the 6 video creatives. The Ad Library doesn't show it.
- The live images on 901135212591078 and 1767649234545772 (screenshots came back blank).
- The product-feed text in the 7 catalog ads.
- IW ads were matched to their campaign by copy, because Ads Manager rows wouldn't load.
