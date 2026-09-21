# IW lookalike: Day 7 checkpoint
**2026-09-18 · Finn, read-only (Meta connector + Shopify) · skill: [hpc-campaign-checkpoint](../../../my-skills/hpc-campaign-checkpoint/instructions.md) · terms: [campaigns.md](../../../my-skills/hpc-campaign-checkpoint/campaigns.md)**

Nothing was written to Meta or Shopify. Window: **Fri Sept 11 through Thu Sept 17, 2026, inclusive, Central time** (7 days).
Meta: `time_range` 2026-09-11 → 2026-09-17, account HP Cookers ADs `4392736013287`. Shopify: `created_at` from 2026-09-11 00:00 CT to 2026-09-18 00:00 CT.
The whole window is after 2026-07-20, so one operator.

⚠️ **Read first: the unpublished-edit (draft) check could not be run.** `ads_get_ad_entities` with `object_state: draft` returned an error: the draft read "is new and is being gradually rolled out across ad accounts". **That is not a clean result. It means I cannot see any draft.** Before the Sept 18 edit, Evan should confirm that the "Review and publish" count in Ads Manager reads zero. Don't open a live ad's Edit panel to check.

---

## 1. The one line

**$682.55 spend · 7 days · 2 Meta-claimed purchases · 0 Shopify-tagged orders · $0 tagged net · ad set still `LEARNING` (2 conversions).** The ad that took 79.5% of the spend (`hpc-dark-evergreen`) can't show up in Shopify's tagged count at all.
*(Meta connector, campaign and ad set level, 2026-09-11 → 09-17; Shopify GraphQL orders, same window, pulled 2026-09-18)*

---

## 2. Against the agreed rule

The rule, quoted from `campaigns.md` *(Beau, accepted by Evan 2026-09-14)*:

> Hold at 3 days / $300 in Learning. Re-check at **Day 7 / ~$700 spend, or on Learning exit, whichever first.** At that point, **if Shopify-matched orders are still 0 and spend has passed the $73/real-order ceiling, that becomes a real cut conversation.** Do not touch spend before then.

| Condition | Met? | Fact |
|---|---|---|
| Checkpoint reached: Day 7 / ~$700, or Learning exit | **Met, on Day 7** | 7 days elapsed. $682.55 spent. Learning **not** exited: `learning_stage_info.status = LEARNING`, 2 conversions *(Meta, ad set)* |
| Shopify-matched orders still 0 | **Met**, with a caveat | 0 orders under match rules 1–4 on last visit, and 0 on first visit. **Caveat:** `hpc-dark-evergreen` ($542.55, 79.5% of spend) sends no tags to Shopify, so no match rule could catch its orders (section 4) |
| Spend has passed the $73/real-order ceiling | **Met** | $682.55 is 9.3× $73. It is also above the highest incremental ceiling that applies to any product in these ads ($195.34, 120 QT Powered) |
| Do not touch spend before the checkpoint | **Met, as far as the log shows** | The account activity log, Sept 9 22:00 → Sept 18 01:00 (200 events), has no IW budget, status, targeting or creative change after the Sept 11 launch. Daily budget reads $100.00 *(Meta)*. See data problem 6 on the log filter |

All conditions of the agreed rule are met. The call is Beau's.

---

## 3. The Meta table

*Meta connector `ads_get_ad_entities`, time_range 2026-09-11 → 2026-09-17, pulled 2026-09-18. Platform-reported.*
**Attribution:** the ad set's `attribution_setting` = `1d_view_7d_click_1d_ev`, meaning 7-day click, 1-day view and 1-day engaged view. `learning_stage_info` lists windows `7d_click`, `1d_view`.

**IDs:** campaign `52507989521191` · ad set `52507989521391` · ads below. Now recorded in `campaigns.md`.

| Level | Status | Budget | Spend | Impr. | Reach | Freq. | Clicks | CPM | CPC | CTR | LPV | Meta purchases (`omni_purchase`) | Website purchases (pixel) | Meta cost per purchase |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Campaign** `IW Lookalike 1% - Cold Prospecting - Sept 2026` | ACTIVE | $100/day CBO | **$682.55** | 39,166 | 20,997 | 1.87 | 969 | $17.43 | $0.70 | 2.47% | 218 | **2** | 2 | **$341.28** |
| **Ad set** `IW LAL 1% - Cold Prospecting` | ACTIVE · **LEARNING, 2 conv.** | (CBO) | $682.55 | 39,166 | 20,997 | 1.87 | 969 | $17.43 | $0.70 | 2.47% | 218 | 2 | 2 | $341.28 |

**Ads: the spend split**

| Ad | Ad ID | Spend | **Spend share** | Impr. share | Clicks | CPM | CPC | CTR | LPV | Meta purchases | Meta cost per purchase |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `hpc-dark-evergreen` | 52508008680591 | **$542.55** | **79.5%** | 83.2% | 822 | $16.65 | $0.66 | 2.52% | 157 | 2 | $271.28 |
| `120qt-performance_rolling-boil` | 52508008680391 | $81.02 | 11.9% | 8.1% | 69 | $25.41 | $1.17 | 2.16% | 35 | none reported (field null) | none |
| `120qt-crowd-math` | 52507989521591 | $58.98 | 8.6% | 8.7% | 78 | $17.36 | $0.76 | 2.30% | 26 | none reported (field null) | none |

**By day** *(same pull, `time_increment` 1)*: the two Meta purchases fall on **Sept 11 and Sept 14**, both on `hpc-dark-evergreen`.

| | Sep 11 | Sep 12 | Sep 13 | Sep 14 | Sep 15 | Sep 16 | Sep 17 |
|---|---|---|---|---|---|---|---|
| `hpc-dark-evergreen` | $58.36 | $42.64 | $66.92 | $91.43 | $83.03 | $104.73 | $95.44 |
| Both 120 QT ads | $34.89 | $45.59 | $36.72 | $18.50 | $1.49 | $0.07 | $2.74 |

- **Since Sept 15, `hpc-dark-evergreen` took 98.5% of spend** ($283.20 of $287.50).
- **Meta's own ROAS figure:** not pulled and not reported, by rule.

---

## 4. The Shopify table

**Population.** Search filter `-status:cancelled -financial_status:refunded -source_name:shopify_draft_order -source_name:pos -tag:wholesale` → **36 orders**, all pulled on one page. The unfiltered window has 48. A made-up filter (`notarealfield:xyz`) returned 48, so the real filters did filter. No $0 orders. No line-item paging was cut off. Journey data was ready on all 36.
Q2 + Q5 fields, plus `customer { id numberOfOrders }`, which was checked in the `Customer` schema first.

**Tagged to the campaign**

| Group | Last-visit orders (first-visit) | Net | AOV | Product mix | Had an earlier order |
|---|---|---|---|---|---|
| Rule 1: `utm_campaign` = the name | **0 (0)** | $0 | none | none | none |
| Rule 2: name + ` (DRAFT)` | 0 (0) | | | | |
| Rule 3: `utm_id=52507989521191` in the landing page | 0 (0) | | | | |
| Rule 4: `utm_campaign` = the campaign ID | 0 (0) | | | | |
| **Total tagged to IW** | **0 (0)** | **$0** | none | none | none |
| By ad set (`term`) / by ad (`content`) | 0 on every ad set and ad | | | | |

- **Checked more widely than the rules require.** None of the 36 orders' journey data contains any IW campaign, ad set, ad or creative ID. None contains "IW", "Lookalike", "evergreen", "rolling-boil", "crowd-math", `paid_social` or `utm_id`. The URL-encoded form of the name (`IW+Lookalike+1%25…`) isn't there either.
- **This is a zero from no tagged orders, not from a broken tag, for the two 120 QT ads.** Their tags do reach Shopify: **66 sessions** carry the exact campaign name (rolling-boil 34, crowd-math 32), plus 5 more under the URL-encoded name. That's against 61 Meta landing-page views. **0 of those sessions completed checkout** *(ShopifyQL `sessions`, Sept 11–17)*.
- **For `hpc-dark-evergreen` it can't be told apart.** No session in the window carries its name or ID *(ShopifyQL)*. **Tag blind spot: $542.55 of $682.55 (79.5%) of IW's spend went to an ad whose orders no match rule could catch.** Since Sept 15 that share is 98.5%.

**The check the query can't do: every order with a Facebook tag or referrer on its last visit**

| Order | Placed (CT) | Campaign / ad (content) | Landing page | Referrer | Net | Contains | Earlier order? |
|---|---|---|---|---|---|---|---|
| #17438 | Sep 12 | BPM `6772105419387` / `6855622474187` (Video_Jay 18qt Fryer Demo) | /products/18-qt-fish-fryer | facebook.com | $119.00 | Leg Extensions | **Yes** (3 lifetime) |
| #17450 | Sep 14 | BPM / `6855622474387` (Video_UGC/Review18qt). `utm_source` blank, source = Facebook, medium paid | /products/18-qt-fish-fryer | l.facebook.com | $21.25 | 40 QT lid | No |
| #17451 | Sep 15 | **no campaign**, content `Facebook_UA` | /products/18-qt-fish-fryer | facebook.com | $487.98 | 18 QT + legs + thermometer + seasoning | No |
| #17460 | Sep 16 | BPM / `6823510767787` (BPM Tailgate Video) | /collections/powered-cookers | m.facebook.com | $459.00 | 18 QT + legs | No |
| #17463 | Sep 17 | BPM / `6855622474187` (Video_Jay 18qt Fryer Demo) | /products/18-qt-fish-fryer | facebook.com | $459.00 | 18 QT + legs | No |
| #17466 | Sep 17 | BPM / `6772110395587` (LAL 1% Purchasers). Placed on the Facebook & Instagram channel | /products/18-qt-fish-fryer | m.facebook.com | $680.00 | 100 QT Powered (Triple Jet) | No |
| #17469 | Sep 17 | BPM / `6772116256187` | /products/18-qt-fish-fryer | m.facebook.com | $340.00 | 18 QT | No |

**7 Meta-tagged orders, $2,566.23 net. All carry BPM's ID or `Facebook_UA`. None carries an IW name or ID.** 1 of 7 buyers had an earlier order.

**What the board asked: untagged Facebook orders landing on the 18 QT page.**
- **Orders: 0.** Every order in the window whose last visit came from Facebook carries a UTM.
- **Sessions:** untagged Facebook sessions on `/products/18-qt-fish-fryer` came to **120 over Sept 11–17** (17.1/day), against **69 over Sept 4–10** (9.9/day). **0 of them completed checkout.**
  - Daily, Sept 11–17: 14 · 15 · 15 · 13 · 28 · 20 · 15.
  - `hpc-dark-evergreen` landing-page views over the same days: 12 · 7 · 18 · 25 · 20 · 45 · 30.
  - *ShopifyQL `sessions`, `referrer_name = 'facebook'`, landing page = 18 QT, grouped by `utm_campaign`, blank campaign.*
- These counts don't reconcile with the baseline's (data problem 4). The excess over the prior week (~51 sessions) is about a third of its 157 landing-page views. **Supported, still not confirmed.**

**A second blind spot, found today: Facebook & Instagram channel orders with no journey data**

| Order | Placed (CT) | Net | Contains | Earlier order? |
|---|---|---|---|---|
| #17427 | Sep 11 | $338.20 | 18 QT + 5" thermometer | No |
| #17449 | Sep 14 | $325.00 | 18 QT (`PWFRBR-B`) | No |
| #17454 | Sep 15 | $300.00 | 18 QT (`PWFRBR-VLV025`) | No |
| #17461 | Sep 16 | $459.00 | 18 QT + legs | No |

- These 4 orders came through the **Facebook & Instagram** sales channel (`sourceName 2329312`, `app.name` "Facebook & Instagram"). They have **no visits at all**, so no UTM and no referrer. **No match rule can see them, for any campaign.** That's **$1,422.20 net, all 18 QT.**
- **Which Meta campaign drove them is unknown:** IW, BPM, 18qt-TOF or organic. **Not attributed.**
- **Observation, not a match:** two of them (Sept 11, Sept 14) fall on the same dates as IW's two Meta purchases. Two don't. Meta's count for IW is 2 pixel "website purchases". Whether Shopify's Meta channel sends a pixel/CAPI purchase for channel orders is untested.
- Two more orders in the window also lack journey data. #17456 (60 QT turkey, Online Store) and #17467 (18 QT, Online Store) have empty visits.

---

## 5. Reconcile and ceilings

**Shopify tagged is a floor. Meta's count is an upper bound.** On prospecting, Shopify has seen 15–19% of Meta's count *(order-level-pulls §6)*. That's an observation, not an attribution rate, and it isn't used to extrapolate here.

| Campaign · Sept 11–17 | Meta claims | Shopify tagged |
|---|---|---|
| Purchases / orders | **2** (7d click / 1d view / 1d engaged view) | **0** last visit (0 first visit) |
| Cost per purchase | **$341.28** ($682.55 ÷ 2) | **no orders** |
| Net revenue | none: never Meta's | **$0** |

| Ad set `IW LAL 1% - Cold Prospecting` | Meta claims | Shopify tagged |
|---|---|---|
| Purchases / orders | 2 | 0 (0) |
| Cost per purchase | $341.28 | no orders |
| Net revenue | none | $0 |

| Ad | Meta purchases | Meta CPP | Shopify tagged (first visit) | Shopify CPP | Net |
|---|---|---|---|---|---|
| `hpc-dark-evergreen` | 2 | $271.28 | **0, structurally: its tags never arrive** | no orders (can't be seen) | $0 |
| `120qt-performance_rolling-boil` | none reported | none | 0 (0), with tags arriving (34 sessions) | no orders | $0 |
| `120qt-crowd-math` | none reported | none | 0 (0), with tags arriving (32 + 5 sessions) | no orders | $0 |

**Ceiling comparison** *(ceilings from `2026-09-10-overhead-method-options.md`, incremental rule; product per `campaigns.md`)*

No matched order exists, so there's no product mix to pick the ceiling. Each product line the ads sell is shown.

| Product line | Gate on Meta's count | Meta CPP vs gate | Incremental ceiling (vs Shopify CPP) |
|---|---|---|---|
| 120 QT Powered (crowd-math) | $78.14 Jun–Aug / $66.26 12-mo | Campaign $341.28 = **4.4×** the higher gate. The ad itself had no Meta purchase | $195.34 / $165.64: **no orders** on Shopify's side |
| Performance pots (rolling-boil) | $75.69 / $73.25 | Campaign $341.28 = **4.5×**. The ad had no Meta purchase | $189.23 / $183.14: **no orders** |
| 18 QT (dark-evergreen's frame, if that's its destination; unconfirmed) | $39.82 / $29.54 / $29.36 | Ad's own $271.28 = **6.8×** the highest 18 QT gate | $99.55 / $73.86 / $73.39: **no orders** |

- Campaign Meta CPP ($341.28) is above **every** gate and **every** incremental ceiling in the table. It sits below the 120 QT Powered and Performance break-evens ($377.33 / $369.86). It is above the 18 QT break-even ($189.37).
- **CAC: none claimed.** Cost per purchase is not CAC. There are 0 tagged buyers, so there's no new-customer basis. Actual CAC for IW is **not on file**.
- ⛔ No ROAS line, by rule.

---

## 6. Change since last checkpoint

| | 2026-09-14 first read | **2026-09-18, Day 7** |
|---|---|---|
| Window | Sept 11 → first read (exact end not recorded) | Sept 11–17 |
| Spend | $299.94 | **$682.55** |
| Days | 3 | 7 |
| Meta purchases | 1 | **2** |
| Meta cost per purchase | $299.94 | $341.28 |
| Shopify tagged · net | 0 · $0 | **0 · $0** |
| Learning | LEARNING, 1 conversion | **LEARNING, 2 conversions** |
| Split: dark-evergreen / rolling-boil / crowd-math | $179.69 / $70.47 / $49.78 (60% / 23% / 17%) | **$542.55 / $81.02 / $58.98 (79.5% / 11.9% / 8.6%)** |
| Impressions · clicks | 14,176 · 308 | 39,166 · 969 |
| CPM · CPC · CTR | $21.16 · $0.97 · 2.17% | $17.43 · $0.70 · 2.47% |
| Tag blind spot share of spend | not yet known | **79.5%** (98.5% since Sept 15) |

*Sept 14: `campaigns.md`, Meta connector 2026-09-14. Sept 18: this pull.*
- **Days 4–7 added $382.61 and 1 Meta purchase (Sept 14).** Sept 15–17 added no Meta purchase on $287.50.

---

## 7. Data problems, not business problems

1. **The draft check failed.** `object_state: draft` returned "being gradually rolled out across ad accounts". Unpublished edits are **unknown**, not zero. Check the "Review and publish" count in Ads Manager before the edit.
2. **`hpc-dark-evergreen`'s destination is still unconfirmed.**
   - The creative read (`2482806828877069`, `object_type SHARE`) returns no `link_url`.
   - The ad-preview payload holds only the display domain "highperformancecookers.com" and a "Shop now" button. There's no path in it.
   - It still needs Evan's eye on the Ads Manager **Review tab**, not the edit panel.
   - Side find: its live link description reads **"Built in Louisiana. 4mm cast aluminum."** That's the "cast" landmine the board says goes off at today's edit.
3. **Two blind spots, not one.**
   - (a) `hpc-dark-evergreen`'s UTMs never arrive: 79.5% of spend.
   - (b) Facebook & Instagram channel orders carry no journey at all: 4 orders, $1,422.20, all 18 QT. Unattributable to any campaign.
   - Both make "0 Shopify-tagged" a floor that can't see most of IW's spend.
4. **Untagged-session counts don't reproduce the baseline.**
   - Today's method gives Sept 5–10 = 63 and Sept 11–16 = 105.
   - The Sept 17 baseline had 45 and 102.
   - The baseline's exact ShopifyQL filter isn't recorded, so the two can't be reconciled. The direction (a rise from Sept 11) holds in both.
5. **The first read doesn't reproduce.**
   - Today's daily pull gives Sept 11–13 = $285.12 and Sept 11–14 = $395.05. Neither matches Sept 14's $299.94, which was probably a partial Sept 14 day. Its end point isn't on file.
   - Sept 11–16 today is $584.37, against the baseline's $584.23 (+$0.14, probably late posting).
6. **The activity-log object filter returned `[]`** for the campaign ID. The unfiltered account log does show IW's creation events.
   - The "no spend touched" check uses the unfiltered log (200 events, Sept 9 22:00 → Sept 18 01:00).
   - Most entries are `IW - LA Audience` seed updates (165). Those are audience membership syncs, not campaign edits.
7. **The two 120 QT ads' purchase fields came back `null`, not 0.** They're read as "none reported", which is consistent with the ad set total of 2 all sitting on `hpc-dark-evergreen`.
8. **`utm_medium` arrives as both `paid_social` and `paid`,** and the campaign name also arrives URL-encoded (5 sessions). Rule 1's exact string would miss the encoded form. No order carried either this window.
9. **Attribution setting includes 1-day engaged view** (`1d_view_7d_click_1d_ev`). That's broader than the 7d click / 1d view the baseline stated.
10. **`numberOfOrders` is lifetime.** It would also count an order placed after the window. That doesn't matter today, because 0 buyers were tagged.

---

## 8. Beau's call

*Beau, 2026-09-18. Reads sections 1–7 above and `campaigns.md`. No Meta or Shopify write made.*

### The call: **continue, on the plan's one edit.** Cut the ad, not the campaign.

**Reasoning.**
- **The Sept 14 rule has fired. This is the cut conversation.** It's a split verdict. What failed is `hpc-dark-evergreen`. What was meant to be tested, the 120 QT pots, hasn't been tested yet.
- **`hpc-dark-evergreen` fails even on Meta's own count.**
  - It took $542.55 (79.5%) and has 2 Meta purchases, so $271.28 per purchase.
  - Its likely frame is the 18 QT. That makes it 6.8× the highest 18 QT gate. It's also above the 18 QT break-even ($189.37).
  - Its tags can't reach Shopify, and its live copy says "cast." Off.
- **The two 120 QT ads have had $140.00 between them, and $4.30 since Sept 15.** That's less than one pot's incremental ceiling ($189.23 / $195.34). A $0 result on $140 is no evidence either way. Cutting the campaign now would kill a pot test that never got the budget.
- **Their tags do work.** They drew 66 tagged sessions and 0 checkouts. So from here, the campaign is fully measurable for the first time.
- **Learning is worth nothing here.** 2 conversions in 7 days means it won't exit at $100/day with pot prices either way. The creative swap resets it and costs nothing. Doing it all in one edit keeps the rule of one edit per checkpoint.

**Budget: $100/day, unchanged** (campaign `52507989521191`). The account stays at $314/day of $350 *(PLAN.md)*. **Read Fri Oct 2 on the PLAN.md terms, unchanged:**
- **Pause** if there are 0 Shopify-tagged pot, Triple Jet or kit orders, or if Meta cost per purchase is > $365.
- **Hold to Oct 16** if there is ≥ 1 tagged order and cost per purchase is $189–$365.
- **Continue** if there is ≥ 1 tagged order and cost per purchase is ≤ $189.
- If the edit slips past Mon Sept 21, the read moves to 14 days after the edit.

### Rulings

**(a) The plan's edit stands over a campaign cut.** Reasoning above.

**(b) The creative swap. The files exist, and their sizes were checked with `sips` against the paid sizes 1:1, 9:16 and 1.91:1. All are logged as approved by Evan and Jay on 2026-09-15 (`LIBRARY-LOG.md`).** In `my-skills/hpc-ad-creative/work/creative/library/`:

| Ad | 1:1 (1080×1080) | 9:16 (1080×1920) | 1.91:1 (1200×628) |
|---|---|---|---|
| `120qt-performance_rolling-boil` | `2026-09-15_120qt-performance_rolling-boil_1080x1080_v1.png` | `2026-09-15_120qt-performance_rolling-boil_1080x1920_v1.png` | `2026-09-15_120qt-performance_rolling-boil_1200x628_v1.png` |
| `120qt-crowd-math` | `2026-09-15_120qt-powered_crowd-math_1080x1080_v1.png` | `2026-09-15_120qt-powered_crowd-math_1080x1920_v1.png` | `2026-09-15_120qt-powered_crowd-math_1200x628_v1.png` |

- Note that the file name says `120qt-powered_crowd-math` and the ad name says `120qt-crowd-math`. It's the same ad.
- Don't use the `2026-09-08`, `2026-08-27` or `1080x1350` files. Those are superseded, or 4:5 organic.
- **Unconfirmed: which image slots the live ads use.** The creative read (`2117253225836825`, `3682355555262671`) returned no image fields. Probably they use placement customization. Evan should replace slot for slot in the editor.

**(c) No floor and no separate ad set. Turning off `hpc-dark-evergreen` solves it.**
- The imbalance came from Meta favoring one ad inside a single ad set. With only the two 120 QT ads left, all $100 goes to the pots.
- A new ad set would reset Learning a second time and add a second edit.
- **Watch point, no action now:** if the ad set spends under $70/day for 3 straight days, I rule again. I'd rule early, not wait for Oct 2.

**(d) The 4 untagged Facebook & Instagram channel orders ($1,422.20, all 18 QT) don't change the call.**
- Take the most generous case and credit all 4 to `hpc-dark-evergreen`. That's $542.55 ÷ 4 = $135.64 per order. That's still above every 18 QT incremental ceiling ($99.55 / $73.86 / $73.39).
- The 18 QT also already has two campaigns of its own (BPM, `18qt-TOF`). An 18 QT ad inside the pot test is off-plan whatever it earns.
- The blind spot itself is account-wide. It hides orders from BPM and `18qt-TOF` too. It's a tracking question for Finn, not an IW decision.

### The Meta actions Evan would approve, each one separately

**Before any of them:** Ads Manager "Review and publish" must read **0**. Finn's draft check failed (section 7, problem 1). Don't open a live ad's Edit panel to check.

1. **Pause the ad `hpc-dark-evergreen`, ID `52508008680591`.** Set its status to Paused. Don't delete it. The ad set and campaign stay on.
2. **Swap the creative on the ad `120qt-performance_rolling-boil`, ID `52508008680391`.** Use the three rolling-boil files in (b). Keep the primary text, headline, link and URL parameters unchanged.
3. **Swap the creative on the ad `120qt-crowd-math`, ID `52507989521591`.** Use the three crowd-math files in (b). Same: nothing else changes.
4. **Publish.** That's Evan's click. Then check on the Review tab that both swapped ads still carry the full UTM string from `campaigns.md`. A new creative can drop URL parameters.

The budget doesn't change, so there's no budget action.

## 9. Evan's decision and what changed

**Decision: continue at $100/day, one edit today, read Fri Oct 2** *(Evan, 2026-09-18)*.
- **Paused `hpc-dark-evergreen` `52508008680591`.** ROUX did it through the connector on Evan's "yes", changing status only. Read back as PAUSED, and the two 120 QT ads stayed ACTIVE *(Meta connector, 2026-09-18 morning)*.
- **Swapped creatives, Evan's click in Ads Manager:** `120qt-performance_rolling-boil` `52508008680391` and `120qt-crowd-math` `52507989521591` now carry the `2026-09-15_*_v1` creative. Meta's preview shows the new images, and both ads read PENDING_REVIEW afterwards (Meta's standard review after an image change). The activity log shows the images added at 6:37 and 6:42 AM. The ad-level change and the pause had not appeared in it yet at read time.
- **Unverified:** tracking tags on the swapped ads. The connector returns no URL tags, and the draft-state read is still unavailable (rollout). Evan to glance at the Review tab. Finn confirms from Shopify sessions carrying `120qt-*` names on the next pull.
- Budget unchanged at $100/day. Next read **Fri Oct 2**, on the PLAN.md terms.
