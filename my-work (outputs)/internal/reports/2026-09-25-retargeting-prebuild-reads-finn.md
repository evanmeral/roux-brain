# Retargeting pre-build reads (for Mon 2026-09-28)
**Finn, 2026-09-25, read ~11:20–11:35 CDT.** Meta Ads connector, account `4392736013287` only. **Read-only: no writes, no Ads Manager, no Edit panel opened.**

## 1. Audiences *(Meta connector, custom audience reads, 2026-09-25 ~11:25 CDT)*

| Audience | ID | Meta's size | Pixel | Notes |
|---|---|---|---|---|
| `RT - Viewed 18 QT - 30D` | 52510298205791 | **1,000–1,100** | `491960645999331` (old pixel) | URL contains `18-qt`, 30 days. Active, status Normal. Created 2026-09-18 |
| `Website Visitors 30D (All)` | 52506006692791 | **5,700–6,700** | `491960645999331` (old pixel) | Read 6,800–8,000 on 2026-09-17; lower today (observation, no cause tested) |
| `Past Purchase L90 via Pixel Data` | 6854767957387 | **20** (Meta's floor display) | `1861969194014116` (our pixel) | Purchase event, 90 days |
| `Dealer Buyers (EXCLUSION)` | 6885346937387 | **20** (floor display) | `1861969194014116` (our pixel) | ws-account-create / ws-account-login URLs, 180 days |

Both exclusions still read at 20 on our pixel. Both inclusions sit on the old pixel. Same as the 2026-09-17 note: the 20 has not been explained.

## 2. Do retargeting campaigns / ad sets exist? *(live objects, any status; ~11:28 CDT)*

- **No `RT 30D - 18QT` or `RT 30D - Pots`.** No campaign or ad set was found with "RT", "18QT" or "Pots" in a retargeting sense. The only matches are old, paused ones: `BizIQ_Retargeting` `6545853939187` (paused, $30/day, 5 ad sets), `Retarget Abandoned Cart - $25 OFF` `6223946361987` (paused), `Lookalike Retarget` `6233170721187` (paused, ThruPlay).
- **No ad named `rt-18qt-fry-it-all`** at any status (paused included). Name searches for `rt-`, `retarget`, `fry-it-all` and `Pots` found only old BM UGC ads (a false hit: "Sho**rt** |") and one BizIQ pot ad from 2024.
- ⚠️ **I could not read drafts.** `object_state=draft` returned: "This tool is new and is being gradually rolled out across ad accounts." Unpublished draft campaigns, and archived or deleted ones, are not in these results.

## 3. Ad to duplicate from *(creative reads, ~11:32 CDT)*

**`18qt-tailgate-kit-lineup` `52511818941191`, ad set `18qt_prospecting` `6998161994987`.**
Live, single image (`image_hash` set, type SHARE), FB Page `100186835257740` and an Instagram media ID are both present, SHOP_NOW CTA. The ad set optimizes for Purchase on pixel `1861969194014116`. `18qt-tailgate-kit-payoff` `52511820288791` works equally well. Both were duplicated from `001` today, so `001` is not needed.
- Not `18qt-002` / `18qt-003` / `IMG_Heavy Duty Heat.30qt`: their creatives are named `{{product.name}}` and return no image hash, which points to a catalog or template creative, not one fixed image (inference, not opened).
- **Not readable through the connector:** the ad-level pixel tracking box, and URL/UTM tags. Check both in the build.
- Build note: A and B carry per-placement images (1:1 Feeds, 1.91:1 Search). A duplicate keeps those, so check the placement image mapping when the image is swapped.

## 4. "Review and publish" draft count
**Cannot read.** The draft read is not rolled out to this account yet (same error as above). I can't see any staged edits on live ads from here, including `18qt-001`. Evan checks the count in Ads Manager before the build.

## 5. `BPM_TOF_Manual` placements *(ad set targeting read, ~11:30 CDT)*
Three active ad sets. All run **Advantage+ placements**: no manual platform list is set, only Meta's effective list. That list is FB Feed, Right column, Video feeds, In-stream, Marketplace, Stories, Search, Business discovery, Reels, Profile feed, Notifications; IG Feed, Stories, Explore, Reels, Profile, Search; Messenger; Audience Network; Threads.
- `Outdoor Cooking/BBQ/Grilling_Nov BPM_Holiday/Turkey Fryer` `6845295330987`: $60/day, lowest cost
- `Outdoor Cooking/BBQ/Grilling_Video_Jay 30qt (turkey) Fryer Demo` `6810865162387`: $62/day, cost per result goal
- `LAL 1% Purchasers` `6772110394587`: $42/day, cost per result goal

For comparison, `18qt_prospecting` uses **manual** placements: FB Feed, Right column, Marketplace, Search, Business discovery, Profile feed, Notifications; IG Feed, Explore home, Profile, Search; Threads. It has **no Stories and no Reels**. The paused BPM ad sets were not read for placements.
