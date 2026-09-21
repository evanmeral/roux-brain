# Finn: Monday checks, 2026-09-21

**Read-only.** Nothing was written to Shopify or Meta. All reads 2026-09-21, 07:00–07:25 CDT.
**Sources:** Shopify `high-performance-cookers.myshopify.com` (ShopifyQL `run-analytics-query`, GraphQL `orders`), store time America/Chicago · Meta Ads connector, HP Cookers ADs `4392736013287` only, platform-reported.
**Window:** Fri Sept 18 through Sun Sept 20, 2026, Central, unless stated. All of it is after 2026-07-20, so one operator.

---

## Job 1: do the swapped IW ads' tags reach Shopify?

**Answer (fact): yes.** Both `120qt-*` ads send name-based UTMs that Shopify records. There is also **1 tagged order.**

### Sessions carrying IW tags, Sept 18–20 *(ShopifyQL `sessions`, `utm_campaign CONTAINS 'IW'`, read 07:10)*

| Ad | Shopify sessions | Meta landing-page views *(Meta, read 07:15)* | Sessions that completed checkout |
|---|---|---|---|
| `120qt-crowd-math` `52507989521591` | **90** | 92 | **1** |
| `120qt-performance_rolling-boil` `52508008680391` | **9** | 5 | 0 |
| `hpc-dark-evergreen` `52508008680591` (paused Sept 18) | 2 | 11 | 0 |
| **Total** | **101** (+2 more on Sept 21 so far) | 108 | **1** |

- Tag format (fact): `utm_campaign` = `IW Lookalike 1% - Cold Prospecting - Sept 2026`, `utm_content` = ad name, `utm_term` = `IW LAL 1% - Cold Prospecting`, `utm_source` = facebook. About 43 of these sessions show referrer "direct" but still carry the UTMs, so the tag survived even where the referrer was stripped.
- **Control (fact):** BPM's ID-based UTMs show up the same way over the same days: campaign `6772105419387` on ~248 social-referred sessions (for example ad `6855622474187` has 121 sessions and 3 completed checkouts). `18qt-TOF-Prospecting` (`6998161993987` / `Facebook_UA`) has 20 sessions and 1 completed checkout. The query sees both styles of tag.
- **What the query can't see:** orders placed on the Facebook & Instagram channel through a Meta Shop cart. Those have no session at all (Job 2). Also, no session in the window carries the ad IDs `52508008680391` / `52507989521591` or `120qt-` in the landing-page path. The tags are name-based, not ID-based.

### The tagged order *(GraphQL `orders`, read 07:12)*

| Order | Placed (CT) | Net subtotal | Contains | First and last visit | Earlier order? |
|---|---|---|---|---|---|
| **#17482** | Sat Sept 19, 6:27 pm | **$715.00** | 120 Quart Powered Seafood/Crawfish Cooker (`PW120-BTJ-VLV075`) | Both visits `IW Lookalike…` / `120qt-crowd-math` / `paid_social`, landing on `/products/120-qt-powered-seafood-crawfish-cooker` | No (1 lifetime) |

This is the **first Shopify-tagged IW order since launch** (Sept 11–17 had 0: checkpoint, 2026-09-18).

### IW on Meta, Sept 18–20 *(Meta `ads_get_ad_entities`, daily, read 07:15)*

| | Sept 18 | Sept 19 | Sept 20 | **Total** | Meta purchases (`omni_purchase`) |
|---|---|---|---|---|---|
| `120qt-crowd-math` | $41.37 | $107.91 | $87.07 | **$236.35** | 3 (all Sept 19) |
| `120qt-performance_rolling-boil` | $7.44 | $6.92 | $8.31 | **$22.67** | 0 |
| `hpc-dark-evergreen` | $26.40 | n/a | n/a | **$26.40** | 0 |
| **Campaign** | $75.21 | $114.83 | $95.38 | **$285.42** | **3** · Meta cost per purchase $95.14 |

- **Since launch (derived):** $682.55 (Sept 11–17) + $285.42 = **$967.97** spend · 5 Meta purchases · **1 Shopify-tagged order ($715)**.
- Meta claims 3 purchases on Sept 19. Shopify shows 1 tagged order that day. Meta's other 2 are not found in Shopify under any IW tag.
- `hpc-dark-evergreen` spent $26.40 on Sept 18 before the pause.

---

## Job 2: the 4 Facebook & Instagram orders with no visit data

### The orders *(GraphQL `orders`, by name, read 07:18)*

| Order | Placed (CT) | Net subtotal | Contains | Discount | `ad_id` in the cart link |
|---|---|---|---|---|---|
| #17427 | Fri Sept 11, 11:47 am | $338.20 | 18 QT + 5" thermometer | `FB-EMAIL-IQ4ATNDP` | `6772116255587` |
| #17449 | Sun Sept 14, 7:45 pm | $325.00 | 18 QT (`PWFRBR-B`) | none | `6772116255587` |
| #17454 | Tue Sept 15, 10:34 pm | $300.00 | 18 QT (`PWFRBR-VLV025`) | none | `6772116255587` |
| #17461 | Wed Sept 16, 2:05 pm | $459.00 | 18 QT + leg extensions | none | `6772116256187` |
| **Total** | | **$1,422.20** | | | |

**Shared fields on all 4 (fact):**
- `sourceName` `2329312`, app **Facebook & Instagram**, channel `facebook`, sub-channel "Facebook", paid by `shopify_payments`.
- `customerJourneySummary`: ready, **0 moments**, no first or last visit.
- The deprecated `Order.landingPageUrl` is a **cart permalink**, not a product page: `/cart/<variant>:1?abid=6772110395587&absrc=Facebook&access_token=…&ad_id=…&attributes[Channel]=Facebook&attributes[cart-id]=…&attributes[seller-id]=100186835257740&campaign_id=6772105419387…`. The field is cut off at about 250 characters.
- Cart attributes on the order: `Channel=Facebook`, `cart-id`, `seller-id=100186835257740`.
- `campaign_id=6772105419387` is **`BPM_TOF_Manual`**. Both `ad_id`s are named **`Video_UGC/Review18qt Fryer`** on Meta, both ACTIVE *(Meta, read 07:16)*. `abid 6772110395587` looks like BPM's ad-set-level ID. **Not confirmed.**

### The test that tells the causes apart

| Candidate | What it would look like in Shopify | What these 4 show |
|---|---|---|
| **In-app browser attribution loss** | `sourceName` `web`, Online Store channel. A session exists (landing on a product page), maybe with a stripped referrer or UTMs | **No.** None is `web`, and none has a session. The control shows web orders from the Meta in-app browser do keep their journey: #17469, #17463 and #17460 (Sept 11–17), and #17478, #17483 and #17489 (Sept 18–20) are all `web` with BPM UTMs and `m.facebook.com` / `facebook.com` referrers |
| **Meta Shop checkout** (cart built inside Facebook, handed to Shopify checkout) | Facebook & Instagram app as the source. A `/cart/…` permalink with Meta's `access_token`, `cart-id` and `seller-id`. No storefront session, because the buyer never browsed the site | **Yes, on every marker** |
| Something else (draft, POS, Shop app) | `shopify_draft_order`, `pos`, or the Shop app `3890849` | No |

**Interpretation (mine):** these are **Meta Shop orders from BPM's `Video_UGC/Review18qt Fryer` ads.** Buyers tapped the ad's Shop / product tag, built a cart inside Facebook, and checked out on Shopify through a cart link. They weren't lost in-app browser traffic, and they weren't IW. They have no journey because they never had a storefront session. So every UTM match rule misses them. **The attribution is still recoverable from the cart link's `campaign_id` / `ad_id`.**

**Related (fact):** #17466 (Sept 17, $680, 100 QT Powered) is also on the Facebook & Instagram channel and carries the same Meta cart attributes. But it does have a 7-moment journey ending on a BPM-tagged visit. So "Facebook & Instagram channel" doesn't always mean "no journey".

### Does the pattern continue Sept 18–20? **No.**
- 0 of the 21 orders placed Sept 18–20 are on the Facebook & Instagram channel *(GraphQL, all 21 checked)*. The only non-web ones are #17473 (draft, $0 replacement) and #17485 (Shop app, $85 paddle, no journey; a different mechanism).
- **It's older than Sept 11 (fact).** Facebook & Instagram channel, by ShopifyQL week *(`GROUP BY week, sales_channel`, read 07:19)*: week of Aug 3 1 order ($9.99) · Aug 17 1 ($459) · **Aug 31 7 ($1,063.64)** · **Sept 7 4 ($792.43)** · Sept 14 4 ($1,764, which includes #17466).

---

## Weekend read, Fri Sept 18 to Sun Sept 20

### Shopify *(ShopifyQL `FROM sales … TIMESERIES day`, read 07:05)*

| Day | Orders | Gross | Discounts | Returns | **Net sales** |
|---|---|---|---|---|---|
| Fri Sept 18 | 3 | $1,375.47 | −$365.00 | $0 | **$1,010.47** |
| Sat Sept 19 | 10 | $6,846.96 | −$70.90 | $0 | **$6,776.06** |
| Sun Sept 20 | 8 | $3,527.71 | −$98.90 | $0 | **$3,428.81** |
| **Total** | **21** | $11,750.14 | −$534.80 | $0 | **$11,215.34** |

The 21 orders include #17473, a $0 draft replacement for shipping damage. There are 20 paying orders.

### Consumer pace, Sept 17–20 *(ShopifyQL `GROUP BY product_title`, Sept 17–20, read 07:22; same classification as the pace line)*
- Net Sept 17–20: **$17,938.09** (Sept 17 alone $6,722.75). The product lines sum exactly to this.
- Less commercial cooker (40 Gallon / 160 QT, $2,145.00) and commercial other (metal wheels, $250.00). No custom product or Navimow.
- **Consumer Sept 17–20 = $15,543.09 (derived)**, against the **Sept 24 must-hit of $14,747.08** and stretch of $16,422.35. There are 4 days left in the window. Returns land on the day they're processed, so this can still move down.

### Meta spend by campaign *(Meta `ads_get_ad_entities`, campaign level, daily, spend > 0, read 07:14)*

| Campaign | Sept 18 | Sept 19 | Sept 20 | **Total** | Meta purchases (platform-claimed) |
|---|---|---|---|---|---|
| `BPM_TOF_Manual` `6772105419387` | $146.33 | $130.08 | $197.58 | **$473.99** | 6 |
| `IW Lookalike 1% - Cold Prospecting - Sept 2026` `52507989521191` | $75.21 | $114.83 | $95.38 | **$285.42** | 3 |
| `18qt-TOF-Prospecting` `6998161993987` | $44.77 | $50.38 | $54.56 | **$149.71** | 2 |
| **Account** | $266.31 | $295.29 | $347.52 | **$909.12** | 11 |

No other campaign spent. No ROAS is given, by rule: don't divide Shopify net by Meta spend.

---

## Data flags (data problems, not business problems)
1. **Meta Shop orders are invisible to every journey-based match rule.** The only trace of the ad is the deprecated, truncated `Order.landingPageUrl`. Any "Shopify-tagged to Meta" count built on `customerJourneySummary` undercounts BPM by these orders: 4 orders, $1,422.20, Sept 11–17.
2. **BPM spent $197.58 on Sept 20 against a $164/day budget.** Meta allows daily overage, so the weekly average is what counts. This is an observation only.
3. **IW sessions carry two `utm_medium` values**, `paid_social` (most) and `paid`. The split existed on Sept 17, before the swap, so the swap didn't cause it. Source unknown. It doesn't affect campaign/content matching.
4. `hpc-dark-evergreen` shows 2 sessions carrying its name on Sept 18, one under the URL-encoded campaign name and one with source `facebook-WebsiteKeyInfo`. The Sept 11–17 read found none against 157 landing-page views. It's paused now, so this is noted, not chased.
5. Meta claims 3 IW purchases on Sept 19. Shopify has 1 tagged order. The other 2 are unmatched, which is normal for view-through and 7-day-click attribution. Nothing was estimated for them.

---

# Prep for scoreboard #1 (Evan-approved rules)

**Read-only.** Nothing was written to Shopify or Meta. Reads 2026-09-21, 07:55–08:15 CDT.
**Rule applied:** Evan approved ROUX's calls 2026-09-21 (`decisions.md`, top entry). Match rule 5 is now in `my-skills/hpc-campaign-checkpoint/instructions.md` §3.
**Sources:** Shopify GraphQL `orders` (`sourceName`, `customerJourneySummary.lastVisit.utmParameters`, `landingPageUrl`, `currentSubtotalPriceSet`), store time America/Chicago · Meta `ads_get_ad_entities`, HP Cookers ADs `4392736013287` only (`amount_spent`, `omni_purchase`, `cost_per_omni_purchase`, `adset_id`, `created_time`). No Meta revenue figure is used anywhere.

## 1. Where the rule went

- **File:** `my-skills/hpc-campaign-checkpoint/instructions.md`, §3 "Match rules". It's the only place the match method is written down. `hpc-scoreboard-report/instructions.md` has no match method (it computes CAC/ROAS from CSVs and the connector), so it was not edited.
- **What changed:** (a) the lead-in now reads "any of rules 1–4 on the last visit, or, failing those, rule 5 on the order record". (b) New **rule 5**: cart-link `campaign_id`, else `ad_id` → campaign via Meta. Only when rules 1–4 find no tag. Counts once, journey first. Reported as a Meta Shop sub-line. Includes a warning about zero-spend twin ad IDs (§4 below). Nothing else in the file was touched.

## 2. Sept 1–16 baseline, restated

**Reproduction check (fact):** the old rule re-run today gives exactly the old figures: 16 orders, $3,413.80, BPM 10 / $2,383.56, 18qt-TOF 1 / $85.55, `Facebook_UA` with no campaign ID 5 / $944.69 (all 178 Sept 1–16 orders scanned, read 08:02). So the only difference below is rule 5.

| Campaign | Meta spend Sept 1–16 *(Meta, 2026-09-17 baseline §5)* | **Old** tagged orders · subtotal · spend per order | **New** tagged orders · subtotal · spend per order |
|---|---|---|---|
| `BPM_TOF_Manual` | $2,572.94 | 10 · $2,383.56 · **$257.29** | **18 · $4,313.50 · $142.94** |
|   of which journey (rules 1–4) | | 10 · $2,383.56 | 10 · $2,383.56 |
|   of which **Meta Shop (rule 5)** | | — | **8 · $1,929.94** (#17317, #17340, #17344, #17346, #17427, #17449, #17454, #17461) |
| `18qt-TOF-Prospecting` | $765.28 | 1 · $85.55 · **$765.28** | **2 · $101.54 · $382.64** |
|   of which Meta Shop (rule 5) | | — | 1 · $15.99 (#17390) |
| IW lookalike (from Sept 11) | $584.23 | 0 · no orders | 0 · no orders |
| Meta paid tag, no campaign ID (`Facebook_UA`) | n/a | 5 · $944.69 | 5 · $944.69 (unchanged; includes #17388, which is Facebook & Instagram channel but journey-tagged) |
| **Total** | **$3,922.45** | **16 · $3,413.80 · $245.15** | **25 · $5,359.73 · $156.90** |

*Subtotal = `currentSubtotalPriceSet` (after discounts and refunds, before shipping and tax), the same measure as the old baseline. Not ShopifyQL net. Spend per order is derived: spend ÷ orders.*

- **Not matched under either rule** (Facebook & Instagram channel, Sept 1–16): #17325 ($83.30, Facebook referrer, no UTM, product-page landing, no cart link) and #17384 ($128.25, no journey, `landingPageUrl` empty).
- **What this can't see:** rule 5 is read only on orders with a cart permalink. A web-channel order with no tag and no cart link stays invisible, as before.

## 3. The earlier Meta Shop orders (Aug 31 and Sept 7 weeks)

Counts tie to ShopifyQL's weekly figures: **7 orders, $1,063.64** and **4 orders, $792.43**. All were placed Sept 1–11 CT, so all fall inside the baseline window.

| Order | Placed (CT) | Subtotal | Journey tag | Cart-link IDs | Meta name for the ad *(read 08:08)* | Credited to |
|---|---|---|---|---|---|---|
| #17303 | Sept 1 | $389.30 | BPM `6772105419387` / `52506061054991` | none (landing = homepage) | LaborDay_A_Vintage_Sept1-8 - Copy | BPM, rule 4 (already in old 16) |
| #17317 | Sept 2 | $15.99 | none | BPM · ad `52506061138791` | LaborDay_A_Vintage_Sept1-8 | BPM, rule 5 |
| #17325 | Sept 2 | $83.30 | Facebook referrer, no UTM | none (product page) | — | **Unmatched** |
| #17340 | Sept 3 | $113.05 | none | BPM · ad `52506060990991` | LaborDay_A_Vintage_Sept1-8 - Copy | BPM, rule 5 |
| #17344 | Sept 4 | $38.70 | none | BPM · ad `52506061138791` | LaborDay_A_Vintage_Sept1-8 | BPM, rule 5 |
| #17346 | Sept 4 | $340.00 | none | BPM · ad `52506061138791` | LaborDay_A_Vintage_Sept1-8 | BPM, rule 5 |
| #17366 | Sept 5 | $83.30 | BPM / `6855622474187` | none (product page) | Video_Jay 18qt Fryer Demo | BPM, rule 4 (already in old 16) |
| #17384 | Sept 7 | $128.25 | none | **field empty** | — | **Unmatched, no readable ID** |
| #17388 | Sept 7 | $309.99 | `Facebook_UA`, no campaign | none (thank-you page) | — | No-campaign bucket (already in old 16) |
| #17390 | Sept 8 | $15.99 | none | **18qt-TOF `6998161993987`** · ad `52506060963591` | LaborDay_B_HPCDark_Sept1-8 | 18qt-TOF, rule 5 |
| #17427 | Sept 11 | $338.20 | none | BPM · ad `6772116255587` · abid `6772110395587` | Video_UGC/Review18qt Fryer | BPM, rule 5 |

- **Answer (fact):** of the 11 orders, 5 carry BPM cart-link IDs, 1 carries 18qt-TOF, 3 were already journey-tagged, and 2 have no readable ID. The Aug 31 week's cart links point to the **Labor Day ads**, not `Video_UGC/Review18qt Fryer`. None is IW.
- **Truncation (fact):** in the 7 cart links for the two weeks, `campaign_id` is readable every time. **Correction to this morning's Job 2:** #17461's link is cut off right at `campaign_id` with the value missing. It's credited to BPM through its `ad_id` `6772116256187`, which Meta places in BPM's `LAL 1% Purchasers` ad set. Also, `abid 6772110395587` is an **ad** (the spending `Video_UGC/Review18qt Fryer`), not the ad set; the ad set is `6772110394587`.

## 4. Kill-line read: the two `Video_UGC/Review18qt Fryer` ads

Kill line *(PLAN.md, "Any 18 QT ad")*: Meta cost per purchase over the last 14 days > **$189**.

| Ad | Meta Sept 7–20: spend · purchases · cost per purchase *(read 08:05)* | Lifetime *(`date_preset maximum`, read 08:10)* | Meta Shop orders carrying this `ad_id`, Sept 7–20 *(Shopify, context only)* |
|---|---|---|---|
| `6772116255587` | **No spend, no purchases returned** → no cost per purchase exists | No spend returned | 3 · $963.20 (#17427, #17449, #17454) |
| `6772116256187` | **No spend, no purchases returned** → no cost per purchase exists | No spend returned | 1 · $459.00 (#17461) |
| *For comparison:* `6772110395587`, same name, same ad set, ACTIVE; the `abid` on all 4 links | **$526.15 · 10 · $52.62** | $16,491.68 · 223 · $73.95 | (same 4 orders, via `abid`) |

- **Facts:** the two IDs were created 2025-06-13 10:49:08 PT, 49 seconds after `6772110395587`, in the same ad set (`6772110394587`). Meta reports all spend on `6772110395587`. The same pattern shows on the Labor Day cart-link IDs (`52506061138791`, `52506060990991`, `52506060963591`): no spend under those IDs, while same-named ads with other IDs carry spend. The attribution window wasn't returned in this read; the 2026-09-17 baseline recorded 7-day click / 1-day view.
- **Interpretation (mine, untested):** the cart-link `ad_id`s look like zero-spend twins of the ad Meta reports on. So the kill line can't be read on the two IDs as asked. If it's read on `6772110395587`, $52.62 is under $189. The 4 Meta Shop orders are Shopify's; whether Meta also counts them among its 10 purchases is untested.
- For the record: PLAN.md also sets a **$128.09** line for "BPM collection video". That's a different row; I didn't apply it.

## Data flags
1. **Cart-link `ad_id` doesn't join to Meta's reporting ad ID** for these ads. Rule 5 is safe at campaign level. At ad level, use `abid` where it's present (the Sept 11–16 links have it, the Labor Day links don't).
2. `landingPageUrl` truncation has now cut off `campaign_id` once (#17461). The `ad_id` fallback in rule 5 covers that case. If `ad_id` is cut off too, the order is unmatched.
3. #17466's `landingPageUrl` is a collection page, not a cart link. Rule 5 couldn't have double-counted it on today's data, but the journey-first order still applies.
