# 18 QT video ad — build sheet
**Written 2026-09-01. Source asset: `~/Desktop/Home Fryer .mp4` (Garrett / Frazier Media, received 9/1 8:07am).**

## Recommendation
**Yes — build it, but in ONE place: `18qt-TOF-Prospecting`. Do not touch `BPM_TOF_Manual` until after Sept 8.**

Why:
- `18qt-TOF-Prospecting` is the campaign that's stalling — **$63.86 CPP against a ~$63 provisional
  ceiling, and Meta flags it "Low results."** Budget was deliberately held flat at $50/day because
  performance didn't justify more. The fix for a stalling prospecting campaign is new creative,
  not more budget. This is net-new creative for exactly that product.
- `BPM_TOF_Manual` is the workhorse — **$57.72 CPP / 10.96 ROAS.** With 7 days left on the sale,
  do not put an untested ad into those ad sets and siphon delivery off proven ones.
- **Adding an ad to an existing ad set does not reset learning** (learning is ad-set level). Bounded downside.
- **September = tailgate season opens** per `my-files (knowledge)/hpc-reference/seasonal-calendar.md`. A fish-fryer video is on-season
  today, not in November.

## Asset specs (verified via file metadata, 2026-09-01)
| | |
|---|---|
| Resolution | **2160 × 3840 — 9:16 vertical, 4K** |
| Duration | **66.9 sec** |
| Codec | HEVC (H.265) + AAC · 28.3 Mbps · 237 MB |
| Format | Talking head, HPC polo, shop backdrop, HPC banner, **burned-in centred captions** |

Notes:
- **HEVC** — Meta prefers H.264. It will almost certainly transcode fine; if the upload errors, that's why.
- **66 sec is long for cold prospecting.** Run it as-is now, but ask Garrett for a **15–20s cut** —
  that's a trim, not a reshoot.
- Captions sit **centred**, so a 9:16 → 4:5 feed crop (top/bottom) should not clip them.
  **Check the 4:5 and 1:1 crop previews before publishing.** If the logo or captions get cut,
  restrict placements to Reels + Stories and let the static Ad B carry feed.

## Build path (from `META-BUILD-GUIDE.md` — video, so no format-lock problem)
1. Ads Manager → **+ Create** → **Use existing campaign** → `18qt-TOF-Prospecting`
2. **Use existing ad set** → `18qt_prospecting` *(do not create a new ad set)*
3. Name: `AD-E_18qtVideo_Garrett_LABORDAY`
4. **Ad setup → Single image or video** → **Media → Add video → Upload** `Home Fryer .mp4`
5. **Copy fields only appear after the media attaches** — paste text after upload
6. Thumbnail: pick a frame where the pot is visible, not mid-blink
7. **Off:** all Advantage+ creative enhancements · **uncheck Multi-advertiser ads**
8. **Creative setup → Promotions → Manually add promo codes → `LABORDAY10-26`**
   (this is the unused lever — codes are manual entry, this surfaces it inside the ad unit)
9. CTA **Shop Now** · URL `https://highperformancecookers.com/products/18-qt-fish-fryer`
10. Schedule: start immediately, no end date
11. Leave in **Draft** until reviewed → Evan publishes

## Copy — promo version (live now → Sept 8)

**Primary text**
```
Meet the 18 QT fish fryer, straight from the shop floor in Covington.

Fish, soft-shell crab, beignets, hushpuppies, fries, wings — one pot, one burner,
everything that hits the oil. Last cookout of summer, first one of tailgate season.

10% off sitewide through Sept 8 — LABORDAY10-26
30% off leg extensions — LABORDAY30-LEGS
Both codes stack. Enter them at checkout.

4mm cast aluminum. Built in Louisiana. 5-year residential warranty.
```
**Headline:** `18 QT Fish Fryer — 10% Off Through Sept 8`
**Description:** `Both codes stack at checkout`

No "final days" language — this copy stays true for the whole Sept 1–8 window, so **nothing to
change on Sept 5** when Ad D goes live.

## Copy — evergreen version (swap in Sept 9)
On Sept 9, **duplicate the ad inside the same ad set** (video → video duplication is fine; the
format lock only bites converting video → image), swap the copy below in, turn the promo version off.

**Primary text**
```
Meet the 18 QT fish fryer, straight from the shop floor in Covington.

Fish, soft-shell crab, beignets, hushpuppies, fries, wings — one pot, one burner,
everything that hits the oil. Tailgate-ready, patio-ready, camp-ready.

4mm cast aluminum. Built in Louisiana by a team of 12. 5-year residential warranty.
```
**Headline:** `18 QT Fish Fryer — Built in Louisiana`
**Description:** `5-year residential warranty`

## What to measure, and the kill line
Budget stays **$50/day — no increase.** This is a creative test at existing spend.

At $50/day and ~$64 CPP the whole campaign buys roughly **one purchase a day**, split across ads.
A purchase-level read on this ad alone will take **7+ days and will still be noisy.** So judge on
leading indicators first:

| Day 1–3 (leading) | Target |
|---|---|
| Hook rate (3-sec plays ÷ impressions) | **>25%** |
| Outbound CTR | **≥1.0%** cold |
| Cost per landing page view | at or below the ad set's current average |

| Day 5–7 (the real number) | Target |
|---|---|
| **CPP at ad level** | **beat $63.86** (the campaign's current CPP) |

**Kill it** if it has spent ~$150–200 with **zero purchases AND outbound CTR under 0.6%.**
**Scale it** — i.e. come back and argue for budget — only if CPP beats $63.86 over 7+ days.
Reminder: the CAC ceilings are **provisional** until Jay's landed-BOM sheet lands. Don't justify a
budget increase off the old table.

## Also post it organically
It's a 9:16 talking head with burned-in captions — that's a Reel. Post it to IG and FB. Free
distribution, and it gives the paid version a warm-audience sibling.

## What ROUX needs from Evan
1. **Confirm this is the right file** — `~/Desktop/Home Fryer .mp4`, 9/1 8:07am. Name is "Home Fryer," not "18 QT."
2. **Watch it once for claims risk** before it goes live. Listen specifically for:
   - a **flat** boil-time or fuel-savings number (must be "as little as" / "up to" / "in as fast as")
   - any **warranty** claim beyond 5-yr residential / 2-yr commercial
   - anything tying a **fryer to crawfish** (creative rule 4)
3. **Ask Garrett for a 15–20 second cut** and, if he has it, a 4:5 export. Both should be trims.
