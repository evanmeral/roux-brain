# Retargeting build sheet, launch Mon Sept 28

**ROUX, 2026-09-25, `/meta-ad-build`.** Built from the [plan](2026-09-11-retargeting-plan.md) (approved 2026-09-11), the board's Now #1, and Finn's read-only pre-build reads ([report](../../../internal/reports/2026-09-25-retargeting-prebuild-reads-finn.md)). No writes were made to Meta or Shopify. **Every step below is Evan's click; publishing is Evan's click.**

## ❓ One call for Evan before Monday

**Which ads go in `RT 30D - Pots`?**
- **The board (Now #1) says:** pot statics A "The fast part is the pot" and B "Look closer".
- **decisions.md 2026-09-18 said:** A was for the IW cold test, and B was for pot retargeting. A never went into IW.
- **The Sept 11 plan's week 1** had `buy-cheap-twice` A + B in this set. Nothing on the board carries them forward.
- **ROUX's recommendation: A + B, as the board says.** Both are the Platinum Bundle "main push" ad the plan said the pots set was missing. Leave `buy-cheap-twice` out, because four ads on $25/day spreads the budget too thin.

The sheet below is written for A + B.

## What changed since the plan (facts, Finn, Meta connector, 2026-09-25 ~11:25 CDT)

| Item | Now | Effect on the build |
|---|---|---|
| `RT - Viewed 18 QT - 30D` `52510298205791` | **1,000–1,100** people, old pixel `491960645999331` | The plan's rule (§9): under ~2,000, **start the 18 QT set at $5 and move $5 to Pots** → Pots **$25**, 18 QT **$5**. Total is still $30, so the caps land at $344 of $350 |
| `Website Visitors 30D (All)` `52506006692791` | **5,700–6,700** (was 6,800–8,000 on 9/17), old pixel | Pots inclusion. Re-read Mon 9/28: Aug 28 leaves the window that day (plan §3 bot test). Cause of the drop is untested |
| `Past Purchase L90 via Pixel Data` · `Dealer Buyers (EXCLUSION)` | **20** each, our pixel `1861969194014116` | Unexplained 20s, parked (board). Add them anyway |
| Retargeting campaign / ad sets / `rt-18qt-fry-it-all` | **None exist** at any status (drafts unreadable) | Fresh build. Nothing to pause or replace |
| Draft count ("Review and publish") | **Unreadable by the connector** | Evan reads it by hand, step 0 |

Destinations checked in Shopify, read-only, 2026-09-25:
- **Tailgate kit:** ACTIVE. Handle `tailgate-fry-kit-18-qt-fryer-with-leg-extensions-thermometer-and-skimmer-19-98-savings`. The old "19-98" handle is still the live one.
- **Platinum Boiling Bundle:** ACTIVE, and **120 QT is a variant** ($892–$940, all available). That closes the open item in the pot copy file.

---

## Step 0: before touching anything

1. Ads Manager top bar: note the **"Review and publish (N)"** count. **It should read 0.** If it doesn't, stop and look at what's listed before building.
2. Finn (read-only, Mon morning): check that the live caps still total $314.

## Step 1: campaign (new)

| Field | Value |
|---|---|
| Name | `Retargeting - Site Visitors 30D - Sept 2026`. Final before publish; no "(DRAFT)" |
| Objective | **Sales**. **Not** an Advantage+ Sales campaign |
| Budget | **Ad-set level**, not campaign |
| **Build check #1** | The ad set must offer a **hard** custom-audience inclusion. If it offers only "Suggest an audience", **stop, don't publish** (plan §2) |

## Step 2: two ad sets

| Field | `RT 30D - Pots` | `RT 30D - 18QT` |
|---|---|---|
| Include | `Website Visitors 30D (All)` | `RT - Viewed 18 QT - 30D` |
| Exclude | `RT - Viewed 18 QT - 30D` · `Past Purchase L90 via Pixel Data` · `Dealer Buyers (EXCLUSION)` | `Past Purchase L90 via Pixel Data` · `Dealer Buyers (EXCLUSION)` |
| Daily budget | **$25** | **$5** |
| Both | Website · pixel **`1861969194014116`** (our pixel; the old one logs no Purchase) · event **Purchase** · Maximize number of conversions · **no end date** (deliberate) · US · **age 24+** (re-check it after any saved audience is copied in; Meta resets it to 18) · **Advantage+ placements** · attribution: record it, match the IW campaign | same |

**Sizes follow the placements:** Advantage+ serves every placement, so each ad carries all three sizes. 1:1 → Feeds · 9:16 → Stories + Reels · 1.91:1 → Search + right column.

## Step 3: the three ads

Build each ad by **duplicating `18qt-tailgate-kit-lineup` `52511818941191`** into the new ad set (Finn: live, static image, Page + Instagram + our pixel set). **Don't duplicate `18qt-001`.** The Lineup ad maps only 1:1 and 1.91:1, so **add the 9:16** under Customize media → Placements.

Every ad gets these settings:
- **URL parameters** (paste unchanged):
  `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}`
- **Off:** Shop · Messenger · Meta AI image + video · AI-extended crops (use plain padding) · Enhance CTA · brightness/contrast · product browsing · multi-advertiser ads · any auto-crop we didn't make (4:5).
- **On:** Relevant comments.

All images are in `my-skills/hpc-ad-creative/work/creative/library/`.

### Ad 1: `rt-tailgate-kit-best-seat` → `RT 30D - 18QT`

- **Images:** 1:1 `2026-09-18_tailgate-kit_ticket_1080x1080_v1.png` · 9:16 `…_1080x1920_v1.png` · 1.91:1 `…_1200x628_v1.png`
- **URL:** https://highperformancecookers.com/products/tailgate-fry-kit-18-qt-fryer-with-leg-extensions-thermometer-and-skimmer-19-98-savings
- **Primary text** (v1, [copy file](../2026-09-tailgate-kit/2026-09-18-tailgate-C-retargeting-copy.md)):
```
The 18 QT is the fryer. This is the whole tailgate setup.

The Tailgate Fry Kit puts the 18 QT powered fryer up on leg extensions, so you fry standing up. It adds a 5" fry thermometer made to fit the pot and a 20" skimmer for pulling out the wings. Tunnel Tubes hand-welded on the bottom of the pot get your oil to 350° in under 5 minutes.

Fish, fries, wings, okra. Save the crew a seat. Built in Louisiana.
```
- **Headline:** `The Whole Fry Setup.` · **Description:** `Fryer, legs, thermometer, skimmer.` · **CTA:** Shop Now

### Ad 2: `rt-120qt-performance_look-closer` → `RT 30D - Pots`

- **Images:** `2026-09-18_platinum-bundle_look-closer_` 1080x1080 · 1080x1920 · 1200x628 `_v1.png`
- **URL:** https://highperformancecookers.com/products/platinum-boiling-bundle-performance-stock-pot-with-triple-jet-burner-and-electronic-ignition
- **Primary text** (B text 1, [copy file](../2026-09-pot-static/2026-09-18-pot-static-copy.md)):
```
You've already seen it. Here's what you were looking at.

Tunnel Tubes hand-welded on the bottom of a 4mm aluminum pot. They spread the flame across the whole base, so the pot takes in more of the heat. That's where the speed comes from: a rolling boil in as little as 7 minutes on a Boil Boss Triple Jet.

The Platinum Boiling Bundle: the 120 QT Performance pot with lid, basket and drain valve, the Triple Jet, and electronic ignition. Built in Louisiana.
```
- **Headline:** `Look Closer.` · **Description:** `Lid, basket & drain valve included` · **CTA:** Shop Now

### Ad 3: `rt-120qt-performance_pairing` → `RT 30D - Pots` (if Evan confirms A)

- **Images:** `2026-09-18_platinum-bundle_fast-part-is-the-pot_` 1080x1080 · 1080x1920 · 1200x628 `_v1.png`
- **URL:** same Platinum Bundle link as Ad 2
- **Primary text** (A text 1, same copy file; written for cold traffic, but it works warm too):
```
The fast part is the pot.

Our 120 QT Performance pot has Tunnel Tubes hand-welded across the bottom. They spread the burner's heat over the whole base, so the pot takes in more of it. Set it on a Boil Boss Triple Jet and you can hit a rolling boil in as little as 7 minutes, on up to 75% less propane.

The Platinum Boiling Bundle puts them together: the pot, the Triple Jet and electronic ignition. 4mm aluminum. Lid, basket and drain valve in the box. Built in Louisiana.
```
- **Headline:** `The Fast Part Is the Pot` · **Description:** `Rolling boil in as little as 7 min` · **CTA:** Shop Now

## Step 4: before pressing Publish

**"Review and publish" should list only:**
- the new campaign
- its 2 ad sets
- the 3 new ads (2 if A is out)

**Nothing else.** If a live ad is on the list, stop. It carries an unsaved edit that would go out too (the `18qt-001` lesson, 2026-09-25). Discard that ad's own draft, never the top-bar "Discard drafts".

## Step 5: after publish (ROUX reads back)

For each ad, from the Review tab + preview:
- Status is Active or In review.
- Page + Instagram are set.
- URL + the full UTM string are there.
- Each image is on its placement, with no Meta-added media.
- The AI settings are off.

For each ad set:
- The inclusion and exclusions are right.
- Age is 24+.
- Budgets are $25 / $5.
- The pixel is `1861969194014116` and the event is Purchase.

Finally: "Review and publish" reads **0**, and Finn re-reads the caps at **$344**.

**Then:**
- The board's Running block gets the new IDs.
- Finn runs the day-4 check (Thu Oct 1–2).
- The day-14 read is Mon Oct 12.
- The rules are in plan §8: frequency > 3.5 → cut by a third · > $60 CPP after 4 days → pause · working ≤ $40 pots / ≤ $30 18 QT.
