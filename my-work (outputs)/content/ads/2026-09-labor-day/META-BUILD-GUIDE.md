# Building the Labor Day ads in Meta — tested click path
**Written 2026-08-31 after ROUX worked through the account. Every quirk below was hit for real.**

---

## ✅ Done by ROUX
**Custom audience created: `Website Visitors 30D (All)`**
Source: 4392736013287 Pixel · Event: All website visitors · Retention: 30 days · Status: Populating.
This is permanent and correct. It's the retargeting pool that didn't exist before.

## ❌ What ROUX could not do, and why
1. **Upload images** — native macOS file picker, not automatable. *(Evan did this; all 10 are in.)*
2. **Duplicate an ad and swap in the static creative** — **a video ad cannot become an image ad.**
   All six active ads in `BPM_TOF_Manual` are video. Duplicating one locks the format: the media
   picker only offers "Edit video / Change Video", and its filters are video-only (length, aspect,
   policy). No image tab exists.
   The earlier attempt in `18qt-TOF-Prospecting` failed for the same reason in a different flavour —
   that base was a **Collection** ad.

**The fix is not to duplicate. Use `+ Create` and pick the format explicitly.**

---

## The build path that works

### Key insight first
**Adding a new ad to an existing ad set does NOT reset that ad set's learning.** Learning lives at the
**ad-set** level. So building fresh ads inside the existing ad sets is safe — it was only a new
*campaign* that would have started from zero.

### For each ad
1. Ads Manager → **+ Create**
2. When asked, choose **Use existing campaign** → pick the campaign
3. Choose **Use existing ad set** → pick the ad set *(do not create a new one)*
4. Ad level: **Ad setup → Single image or video** ← the step that was blocked by duplication
5. **Media → Select from library** → search the filename (they're named `AD-A_…`, `AD-B_…` etc.)
6. **Edit placements → Customize by placement**:
   - `FEED-4x5` → Facebook Feed, Instagram Feed
   - `SQUARE-1x1` → Marketplace, Explore, right column
   - `STORY-9x16` → Stories, Reels
7. Paste **Primary text / Headline / Description** from `UPLOAD-TO-META/ad-copy.txt`
8. **Website URL** — set per ad (URLs are in the copy file)
9. **Call to action:** Shop now
10. **Schedule:** start **Sept 1** (Ad D: start **Sept 5**)

### ⚠️ Two things to switch OFF every time
- Any **"Select all recommendations"** checkbox on the duplicate/create dialog — one of them is
  **"Use Advantage+ creative to optimize images and videos"**, which crops and overlays the creative.
- **Advantage+ creative enhancements** in the ad itself — overlays, visual touch-ups, music.
  The creative is already sized and typeset; let Meta leave it alone.

---

## What goes where
| Ad | Campaign | Ad set | Start |
|---|---|---|---|
| **A — Vintage** | `BPM_TOF_Manual` | Any/all of the 3 active ad sets | Sept 1 |
| **B — HPC Dark** | `18qt-TOF-Prospecting` | `18qt_prospecting` | Sept 1 |
| **C — Multi-product** | NEW retargeting campaign | New ad set (see below) | Sept 1 |
| **D — Final Days** | Both TOF campaigns | Same ad sets as A and B | **Sept 5** |

### The retargeting campaign (Ad C)
- Objective: **Sales**
- Budget: **$10–15/day** — sized to the audience, not to ambition
- **Include:** `Website Visitors 30D (All)` **+** `IW - LA Audience`
- **Exclude:** `Past Purchase L90 via Pixel Data`, `Dealer Buyers (EXCLUSION)`
- Creative: AD-C multi-product

> Check `Website Visitors 30D (All)` size before setting budget. Rough guide: **$20/day per 4,000
> people** keeps 8-day frequency near 3×. `IW - LA Audience` alone is only **2,300–2,700**.

---

## Budget change (approved by Jay)
| Campaign | Now | Change |
|---|---|---|
| `BPM_TOF_Manual` — 3 active ad sets | $60 / $62 / $42 = $164/day | **+25% → $75 / $77.50 / $52.50 = $205/day** |
| `18qt-TOF-Prospecting` | $50/day | **No change** — $63.86 CPP vs a ~$63 ceiling, and Meta flags "Low results" |

Edit each ad-set budget inline → the popover has **"Save to draft"** (use it) next to **"Publish"** (don't).

---

## 💡 Worth knowing: Meta has native promo-code support
In the ad's **Creative setup → Promotions**, there's a **Promo codes** option that surfaces the
discount code inside the ad unit itself. Given `LABORDAY10-26` and `LABORDAY30-LEGS` are **manual
entry**, this could meaningfully cut the number of people who reach checkout without the code.
Currently **Off**. Worth turning on for these ads.

## Sequence reminders
- **Sept 5:** turn A and B **off** when D goes live. Don't run "10% OFF SITEWIDE" beside "FINAL DAYS".
- **Sept 9:** pause all, swap evergreen creative back, remove the announcement bar, roll budgets to
  whatever MER supports — not automatically back to the start.
