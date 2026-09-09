# Wednesday Morning — Meta Runbook
**Sept 9, 2026.** Work top to bottom. Roughly 45–60 minutes.

> **The one rule:** do Step 1 before you switch anything off. It takes 30 seconds and it is
> the difference between a clean swap and taking 77% of Meta spend to zero by accident.

---

## STEP 0 · Get into the right account — 1 min

`business.facebook.com` → account switcher, top left → **Shopify Business Manager** →
**HP Cookers ADs** (`4392736013287`).

⚠️ **There is a decoy in the same portfolio:** `939759932469855`, "Seller Dummy AdAccount."
Zero people, never run an ad. **If you don't see Labor Day ads, you're in the wrong account —
not looking at a bug.**

Then set the date range to **Sept 1 – Sept 8**. Not "Last 7 days," which silently drops Sept 1.

---

## STEP 1 · 🔴 Look before you touch — 30 sec

Go to the **Ads** tab → filter to campaign **`BPM_TOF_Manual`** → **clear the "Active" filter**
so paused ads show too.

**Write down every ad and whether it's on or off.**

You are answering one question: **is there any non-Labor-Day ad still alive in these ad sets?**

| What you see | What it means |
|---|---|
| Evergreen ads still active | Easy. Switch the six off, campaign keeps running. |
| Only the six Labor Day ads | Switching them off takes the campaign to **zero**. You must build the replacements in the same sitting — Steps 3–4 below. |
| Paused evergreen ads sitting there | ⭐ **Best case. Re-enable them instead of building new** — it keeps the post's likes, comments and shares, and it's a five-second click. |

---

## STEP 2 · Switch the six off — 2 min

| # | Ad | Campaign |
|---|---|---|
| 1 | `Vintage` (original) | `BPM_TOF_Manual` |
| 2 | `Vintage - Copy` | `BPM_TOF_Manual` |
| 3 | `Vintage - Copy` (2nd duplicate) | `BPM_TOF_Manual` |
| 4 | `LaborDay_B_HPCDark_Sept1-8` | `BPM_TOF_Manual` |
| 5 | `LaborDay_C_FinalHours_Sept8` | `BPM_TOF_Manual` |
| 6 | `LaborDay_D_TunnelTube_Sept8` | `BPM_TOF_Manual` |

**Toggle the ADS off. Not the ad sets.**

- ❌ **Do not delete them.** That destroys the ad-level history the post-mortem needs.
- ❌ **Do not pause the ad sets.** You need those alive to carry the new ads.

---

## STEP 3 · Upload the creative — 5 min

**Ads Manager → the media library → upload all 15 at once.** No ads, no setup, just the files.

Folder: `my-skills/hpc-ad-creative/work/creative/library/`

```
2026-09-08_18qt-fryer_hpc-dark-evergreen_1080x1080_v1.png
2026-09-08_18qt-fryer_hpc-dark-evergreen_1080x1920_v1.png
2026-09-08_18qt-fryer_hpc-dark-evergreen_1200x628_v1.png

2026-08-27_80qt-powered_buy-cheap-twice_1080x1080_v1.png
2026-09-08_80qt-powered_buy-cheap-twice_1080x1920_v1.png
2026-09-08_80qt-powered_buy-cheap-twice_1200x628_v1.png

2026-09-08_120qt-powered_crowd-math_1080x1080_v1.png
2026-08-27_120qt-powered_crowd-math_1080x1920_v1.png
2026-09-08_120qt-powered_crowd-math_1200x628_v1.png

2026-09-08_120qt-performance_rolling-boil_1080x1080_v1.png
2026-09-08_120qt-performance_rolling-boil_1080x1920_v1.png
2026-09-08_120qt-performance_rolling-boil_1200x628_v1.png

2026-09-08_18qt-fryer_fry-it-all_1080x1080_v1.png
2026-09-08_18qt-fryer_fry-it-all_1080x1920_v1.png
2026-09-08_18qt-fryer_fry-it-all_1200x628_v1.png
```

**Two of them are dated 2026-08-27 — that is correct, not a mistake.** Those two were already
approved in August and did not need rebuilding.

---

## STEP 4 · Build the three `BPM_TOF_Manual` ads — 20 min

**One ad per ad set. Each ad carries all three sizes** via *Edit placements → Customize by
placement*:

- **1080×1080** → Facebook Feed, Instagram Feed, Marketplace, Explore
- **1080×1920** → Stories, Reels
- **1200×628** → Right column, Search, Audience Network

**Do not make three separate ads per concept.** That splits the conversion data three ways and
none of them will exit learning.

Where two versions are given, **put both in the same ad** and let Meta split delivery.

---

### AD 1 — `hpc-dark-evergreen` → the cold prospecting ad set

**Files:** the three `18qt-fryer_hpc-dark-evergreen` images
**URL:** `https://highperformancecookers.com/products/18-qt-fish-fryer`
**CTA:** Shop Now
**Headline:** `Hot Oil, Fast. Then Fast Again.`
**Description:** `Built in Louisiana. 4mm cast.`

**Primary text — version A ⭐ control**
```
Most fryers make you stand around waiting on the oil. This one doesn't.

The Tunnel Tubes welded to the bottom of the pot spread the burner's heat across the whole base, so the pot soaks the heat up instead of throwing it at the sky. That's how you get to 350° in under 5 minutes, and use up to 75% less propane getting there.

Then it holds. Drop a full basket and the temperature climbs back fast. That's the difference between crisp and greasy.

4mm cast aluminum. Full 2-year warranty on everything we build, plus a limited 5-year on residential pots 120 QT and smaller.
```

**Primary text — version B**
```
Friday evening. Cooler of trout, a bag of cornmeal, folks already standing in the driveway.

You want the first basket out before anybody starts asking. That's the whole job of this pot. 350° in under 5 minutes, and it recovers fast enough that basket three tastes like basket one.

4mm cast aluminum, welded by a team of twelve in Covington, Louisiana. Full 2-year warranty, and a limited 5-year on residential pots 120 QT and smaller.

Fry more. Wait less.
```

---

### AD 2 — `120qt-crowd-math` → the broad cold ad set

**Files:** the three `120qt-powered_crowd-math` images
**URL:** `https://highperformancecookers.com/products/120-qt-powered-seafood-crawfish-cooker`
**CTA:** Shop Now
**Headline:** `One Pot. The Whole Yard.`
**Description:** `120 QT. Two sacks, one boil.`

**Primary text — one version only.** The frame already runs the numbers; a second variant
would reorder the same math and call it a test.
```
Two pots means two burners, two timers, and two batches that never come out the same. Somebody is always eating cold.

One 120 QT does the whole thing at once. Two sacks in, one rolling boil, everybody eats together. That's the actual reason for the size.

The Tunnel Tubes welded to the bottom of the pot are what make a pot this big practical. They spread the burner's heat across the whole base, so it comes up to a rolling boil in about 7 minutes and recovers in as little as 90 seconds when the next batch goes in.

Full 2-year warranty on everything, and a limited 5-year on residential pots 120 QT and smaller. Boil times vary with volume, ambient temperature and fuel pressure.
```

---

### AD 3 — `120qt-performance_rolling-boil` → `LAL 1% Purchasers`

**Files:** the three `120qt-performance_rolling-boil` images
**URL:** `https://highperformancecookers.com/products/120-qt-performance-seafood-pot`
⚠️ **The Performance PDP, not the Powered one.** That pot is a Performance on a Triple Jet.
**CTA:** Shop Now
**Headline:** `Everybody Thinks It's Marketing.`
**Description:** `Rolling boil in about 7 min.`

**Primary text — version A ⭐ control**
```
Nobody believes the 7-minute thing the first time they read it. Fair enough.

Cold water to a rolling boil in about 6.5 to 7 minutes. Pull a batch, drop the next one, and it's back in as little as 90 seconds. Two different reviewers volunteered the same four words without being asked: it worked like advertised.

The reason is the Tunnel Tubes welded across the bottom of the pot. They spread the burner's flame over the whole base instead of one hot circle in the middle, so the pot absorbs the heat instead of losing it. Patent 11,844,459.

Boil times vary with volume, ambient temperature and fuel pressure. Full 2-year warranty, plus a limited 5-year on residential pots 120 QT and smaller.
```

**Primary text — version B**
```
Already own a burner? Then you only need the pot.

The speed isn't in the burner. It's in the Tunnel Tubes welded to the bottom of the pot, spreading the flame across the whole base so the water takes the heat instead of the air. That's why this pot on the burner already sitting in your shed gets you a rolling boil in about 6.5 to 7 minutes, and back to boiling in as little as 90 seconds between batches.

The 120 QT Performance pot runs $532 to $580 and ships with the basket, the lid and the drain valve. Add the Boil Boss Triple Jet at $425 whenever you want the full rig.

Boil times vary with volume, ambient temperature and fuel pressure.
```

---

## STEP 5 · Widen `LAL 1% Purchasers` to 1–3% — 2 min

Edit that ad set's audience: **1% lookalike → 1–3%.**

**Do not add budget.** Just give it room.

**Why now:** frequency hit **5.05** across only 15,033 people during the sale. A 1% lookalike
is the smallest audience Meta will build and is the obvious cause. An audience edit resets
learning — and so does the creative swap you just did, so **doing both in one morning costs one
reset instead of two.**

Expect Sept 9–15 to read noisy on this ad set. That is the reset, not a problem.

---

## STEP 6 · Build the retargeting campaign — 15 min

The sale's browser pool is the warmest audience you'll have until January, and it starts
decaying out of the 30-day window today.

| Setting | Value |
|---|---|
| **Objective** | Sales |
| **Budget** | **$30/day** |
| **Audience** | 30-day site visitors + add-to-cart + IG/FB engagers |
| **Exclude** | 180-day purchasers |
| **Placements** | Advantage+ (all three sizes are loaded) |

⚠️ **Check the audience size before you set the budget.** Rule of thumb is ~$20/day per 4,000
people to stay near 3× frequency. **Under 4,000 people → start at $20/day, not $30.**

**Stop rules:** frequency > 3.5 → cut budget · CPP > $60 after 4 days → pause ·
**under $40 → it's working, leave it alone.**

**Do not judge this campaign in two weeks.** At $30/day against a small pool it will not reach
Meta's ~50-conversion learning threshold. You're buying an answer you can't otherwise get, and
the whole downside is about $420.

### Two ads in it:

---

**AD 4 — `80qt-buy-cheap-twice`**
**Files:** the three `80qt-powered_buy-cheap-twice` images
**URL:** `https://highperformancecookers.com/products/80-qt-powered-seafood-cooker`
**CTA:** Shop Now · **Headline:** `Buy Once. Boil For Years.` · **Description:** `4mm cast. Built to last.`

**Version A ⭐ control**
```
Thin pots warp. The bottom bows, it rocks on the burner, the heat goes uneven, and a season later you're shopping again.

4mm cast aluminum doesn't do that. With decent cleaning and care, these last generations. The pot outlives the person who bought it and somebody's kid ends up boiling in it.

Tunnel Tubes welded across the bottom pull more heat out of the same tank. Up to 75% less propane, every boil.

Full 2-year warranty on everything, plus a limited 5-year on residential pots 120 QT and smaller.
```

**Version B**
```
Here's the part nobody counts. What the pot costs you after you buy it.

A thin pot wastes heat. You feel it in how long the boil takes and how fast the tank runs dry. The Tunnel Tubes on the bottom of this pot spread the flame across the whole base, so more of that propane ends up in the water instead of around it. Up to 75% less propane, boil after boil.

80 quarts of 4mm cast aluminum, welded and built in Louisiana. Full 2-year warranty, and a limited 5-year on residential pots 120 QT and smaller.

Good equipment stops costing you money.
```

---

**AD 5 — `18qt-fry-it-all`**
**Files:** the three `18qt-fryer_fry-it-all` images
**URL:** `https://highperformancecookers.com/products/18-qt-fish-fryer`
**CTA:** Shop Now · **Headline:** `More Than A Fish Fryer.` · **Description:** `18 QT powered. Year round.`

**Version A ⭐ control**
```
Most people buy this one for fish. Then they find out what else fits.

Soft-shell crab. Hushpuppies. Wings for the game. Beignets on a Sunday morning and powdered sugar all over the folding table. One customer told us he did steak fingers, fries and okra in his, and everything came out right.

18 quarts, powered, burner welded straight to the pot. 350° in under 5 minutes and up to 75% less propane getting there, so it earns its spot on the patio in July, not just in the spring.

Full 2-year warranty on everything, plus a limited 5-year on residential pots 120 QT and smaller.
```

**Version B**
```
Kendall's review is right there on the picture. Five stars, verified buyer. Here's what's behind it.

18 quarts of oil, a burner welded straight to the pot, and Tunnel Tubes across the bottom spreading the heat so it hits 350° in under 5 minutes. Drop a full basket and the temperature climbs back fast. That's the difference between crisp and greasy.

Fish, soft-shell crab, hushpuppies, fries, wings, beignets. One pot, one burner, all year.

Full 2-year warranty, and a limited 5-year on residential pots 120 QT and smaller.
```

---

## STEP 7 · The 18 QT video ad — 5 min

Goes into **`18qt-TOF-Prospecting`** as a **new ad in the existing ad set.** No budget change —
adding an ad to a live ad set doesn't reset it the way a budget or audience change does.

**Video:** `~/Desktop/Home Fryer .mp4` (Garrett's, you watched and cleared it 2026-09-08)
**URL:** `https://highperformancecookers.com/products/18-qt-fish-fryer` · **CTA:** Shop Now
**Headline:** `18 QT Fish Fryer — Built in Louisiana`
**Description:** `5-year residential warranty`

**Primary text — use the EVERGREEN block, not the promo one**
```
Meet the 18 QT fish fryer, straight from the shop floor in Covington.

Fish, soft-shell crab, beignets, hushpuppies, fries, wings — one pot, one burner,
everything that hits the oil. Tailgate-ready, patio-ready, camp-ready.

4mm cast aluminum. Built in Louisiana by a team of 12. 5-year residential warranty.
```

⚠️ **The old promo version of this ad has `LABORDAY10-26` in the primary text, the headline,
AND attached as a manual promo code in creative setup.** If you ever built it, kill it. If you
never did, just build the evergreen one above.

---

## STEP 8 · `18qt-TOF-Prospecting` — check, then leave it alone — 3 min

Open its ads. Read each one for any sale reference — a `10% OFF` badge, a code, a "Sept 8."

**If clean: change nothing. No budget, no creative, no audience, for seven days.**

It ran **$20.09 per purchase at frequency 1.90** during the sale — the cheapest acquisition in
the account, beating the flagship sale campaign by 32%. It is also your **control** for the
post-mortem's fatigue question. Touching it destroys that.

**First budget raise is Sept 16 at the earliest**, gated on CPP ≤ $30 and frequency ≤ 2.5.

---

## STEP 9 · Before you close Meta — 5 min

- [ ] **Write down every current daily budget.** Campaign, ad set, dollar figure. It's the
      baseline every later decision gets measured against.
- [ ] **Export the daily breakdown.** Columns → Performance, then **Breakdown → By Time → Day**,
      for `BPM_TOF_Manual` and `18qt-TOF-Prospecting`, **Sept 1–8**. You want **CPM, CTR, cost
      per purchase, frequency.** Save the CSV to `my-work (outputs)/internal/reports/raw/`.

That export is the last thing the post-mortem is waiting on — it's the test that separates
creative fatigue from ordinary post-launch decay.

---

## Then, off Meta

Full detail in the [wind-down sheet](2026-09-09-wind-down.md). Short version:

- **Site:** hide announcement-bar blocks 2, 3, 4 — **keep block 1** or the bar collapses.
  Then an incognito sweep, and try `LABORDAY10-26` at checkout to confirm it's dead.
- **Organic:** edit the captions on every Sept 1–8 feed post that names a code.
  **Edit, don't delete** — deleting throws away the reach and comments.
- **Pull the final redemption counts** on both codes now they've expired. Running counts at
  close were 49 and 23.

**Nothing to send anyone.** Coalition, Stephen and Biljana already know.

---

## Budget, for the record

**Hold flat: ~$202/day + $30 retargeting.** No raises before Sept 16.

**Expect CPP to rise this week.** The sale's $26.71 was earned against a discount-elevated
conversion rate. Off-season AOV runs $383–393 against the sale week's $321, so break-even CAC
is actually **higher** off-season (~$170 vs ~$143) — you can afford a more expensive customer,
not a cheaper one. A rising CPP is normalization. The failure signal is CPP passing the gates,
not CPP moving at all.
