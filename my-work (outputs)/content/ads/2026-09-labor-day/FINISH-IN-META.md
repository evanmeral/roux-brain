# Finish the Labor Day ads — Evan's 15 minutes
Written 2026-08-31 by Beau after building in the account.

## What Beau did
**Ad A shell is built and sitting In Draft. Nothing is published.**

- Campaign: `BPM_TOF_Manual`
- Ad set: `Outdoor Cooking/BBQ/Grilling_Nov BPM_Holiday/Turkey Fryer`
- Ad name: `LaborDay_A_Vintage_Sept1-8`
- Format: **Image ad** (Single image or video) ✅
- **Multi-advertiser ads: UNCHECKED** — it resizes/crops creative and would cut the promo code
- Promo code `LABORDAY10-26` typed into Creative setup → Promotions — **UNVERIFIED**, Meta errored
  right after. Re-check it; if blank, re-enter.

Direct link to the draft:
https://adsmanager.facebook.com/adsmanager/manage/ads/edit/standalone?act=4392736013287&business_id=191493022516250&treenav=true&selected_ad_ids=52506044953191

## Why Beau stopped
1. Media library thumbnails spun forever — can't reliably tell the 4x5 from the 1x1 from the 9x16.
2. Meta threw "Sorry, something went wrong" on the creative wizard.
3. **The copy fields don't exist until media is attached.** No way to pre-fill them.

## Which ad set to use — measured, last 30 days
| Ad set | Campaign | Status | Purchases | CPP |
|---|---|---|---|---|
| Outdoor Cooking/BBQ_Nov BPM_Holiday | BPM_TOF_Manual | Active | 40 | **$44.89** ⭐ |
| Outdoor Cooking/BBQ_Video_Jay 30qt | BPM_TOF_Manual | Active | 33 | $56.53 |
| LAL 1% Purchasers | BPM_TOF_Manual | Active | 23 | $54.89 |
| 18qt_prospecting | 18qt-TOF-Prospecting | Learning limited | 19 | $63.87 |

Those four are the ONLY ad sets delivering. Everything else is off.

## The click path that works (verified tonight)
Do NOT duplicate an existing ad — every active ad is video, and a video ad can never become
an image ad. That killed three previous attempts.

1. **+ Create** → tab **"New ad set or ad"**
2. Campaign → type name → pick it
3. Ad set dropdown → **"Use existing ad set"** → type name → pick it
4. Name the ad → **Continue**
5. Scroll to **Ad setup** → "Single image or video" is already selected ✅
6. **Uncheck "Multi-advertiser ads"**
7. **Ad creative → Set up creative → Image ad**
8. Creative setup: paste `LABORDAY10-26` into **Manually add promo codes** → Next
9. **Media** → search the filename → pick it → Next
10. Crop → Text (paste copy) → **Enhancements: turn OFF all Advantage+ creative enhancements**
11. Destination → Website URL + **Shop Now**
12. Leave it **In Draft**. Publish is your click.

## Tonight, in priority order

### 1. Ad A — finish the shell (5 min)
Open the link above. Attach `AD-A_Vintage_FEED-4x5_1080x1350.png`.
Copy: ad-copy.txt → "AD A, Primary text version 1"
Headline: `10% Off Sitewide — Sept 1–8`
Description: `Stack both codes at checkout`
URL: https://highperformancecookers.com/products/18-qt-fish-fryer
CTA: Shop Now

### 2. Ad B — build fresh (5 min)
Campaign `18qt-TOF-Prospecting` → ad set `18qt_prospecting` → name `LaborDay_B_HPCDark_Sept1-8`
Creative `AD-B_HPCDark_FEED-4x5_1080x1350.png`. Copy from ad-copy.txt → AD B.
Same URL, Shop Now.

### 3. Budget bump (2 min) — Jay already approved
Only after A and B are live. Edit each ad-set budget inline, **Save to draft**:
- Outdoor Cooking/BBQ_Nov BPM_Holiday: $60 → **$75**
- Outdoor Cooking/BBQ_Video_Jay 30qt: $62 → **$77.50**
- LAL 1% Purchasers: $42 → **$52.50**
- `18qt-TOF-Prospecting`: **no change** — $63.87 CPP against a ~$63 ceiling is already at the line

### 4. Ad C — retargeting campaign — CAN SLIP TO SEPT 2
Smallest budget ($10–15/day), needs a whole new campaign. Not worth blocking tonight on.
Objective Sales · Include `Website Visitors 30D (All)` + `IW - LA Audience` ·
Exclude `Past Purchase L90 via Pixel Data` + `Dealer Buyers (EXCLUSION)`

### 5. Ad D — Sept 5 job, not tonight
Build it Sept 4 with the toggle OFF. Meta has no ad-level start date — schedules are ad-set level —
so D has to be switched on by hand Sept 5 at the same time you switch A and B off.

## Duplicating to the other ad sets
Once Ad A is a finished IMAGE ad, select it → **Duplicate** → choose the other two active ad sets.
Duplicating an image ad is safe. Adding an ad to an existing ad set does NOT reset its learning —
learning lives at the ad-set level. Only a NEW campaign starts from zero.
