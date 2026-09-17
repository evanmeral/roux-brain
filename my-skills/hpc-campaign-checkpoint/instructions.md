---
name: hpc-campaign-checkpoint
description: Re-reads one live paid Meta campaign at its agreed checkpoint — Meta's own numbers, Shopify's tagged orders, the gap between them, cost per purchase against the incremental ceiling, and ROUX's continue / hold / cut call for Evan to decide. Use when you hear "checkpoint", "re-check IW", "re-pull the campaign", "how is the lookalike doing", "Day 7", "has Learning exited", "/hpc-campaign-checkpoint", or when a checkpoint date in campaigns.md arrives.
---

# Campaign checkpoint

**One campaign, one window, one call.** Finn pulls, ROUX judges, Evan decides. The first
run is the IW lookalike on **Fri Sept 18, 2026** (Day 7 / ~$700, or the moment Learning
exits, whichever comes first — ROUX's call, accepted by Evan 2026-09-14).

The sibling file **`campaigns.md`** holds every live campaign's checkpoint terms: names,
IDs, launch date, budget, what was agreed in advance as the decision rule, and what the
last checkpoint said. **Read it first and update it last.** The procedure below never
changes per campaign; only that file does.

Lanes: **Finn** owns steps 2–4 (read-only data). **ROUX** owns step 6 (the call). Any
change to Meta is Evan's explicit yes per change, and publishing is his click — see step 7.
Maya is involved only if a creative swap was bundled into the checkpoint.

---

## 1. Read, in this order

1. `my-business (context)/hpc-standing-rules.md` — Reporting, and the Meta connector rules.
2. `campaigns.md` — the campaign's row. If the campaign is not there, add a row from the
   board before pulling anything, and say so.
3. `my-desk (now)/BOARD.md` — the Running block for this campaign and any Waiting row tied
   to it. What ROUX said last time is the baseline for this time.
4. The previous checkpoint report for this campaign in `my-work (outputs)/internal/reports/`
   (`*-<campaign-slug>-checkpoint.md`). The first read of the IW lookalike lives in the
   board and `my-desk (now)/archive/2026-09-14-off-the-board.md`, not in a report.
5. `my-work (outputs)/internal/reports/2026-09-10-overhead-method-options.md` — the
   incremental-rule ceiling table (section with "Gate on Meta's count"). This is the ceiling
   that applies to an ad; the per-order table in `2026-09-10-cac-ceilings-v3.md` is the
   product-line test, not the ad test.
6. `my-work (outputs)/internal/reports/2026-09-10-order-level-pulls.md` — Q2 (order rows
   with refund fields) and Q5 (customer journey UTMs). Reuse those queries; do not rebuild them.

---

## 2. Meta pull — Finn, read-only

Account **HP Cookers ADs `4392736013287`** only. Ignore `939759932469855`.

Window: launch date to yesterday inclusive, as `time_range` in `YYYY-MM-DD`. Say the window
in Central time in the report. Never `date_preset` — the window must match the Shopify pull.

Use `ads_get_ad_entities`. These field names were verified against `ads_get_field_context`
on 2026-09-16; re-verify any field not on this list before using it.

| Level | Fields |
|---|---|
| campaign | `name`, `effective_status`, `daily_budget`, `amount_spent`, `impressions`, `reach`, `frequency`, `clicks`, `cpm`, `cpc`, `ctr`, `omni_purchase`, `cost_per_omni_purchase`, `offsite_conversion_fb_pixel_purchase`, `results`, `cost_per_result` |
| adset | the same, plus `learning_stage_info` (status, conversions so far, last significant edit, exit reason) and `attribution_setting` |
| ad | the same as campaign, plus `adset_name` — one row per ad, this is the spend split |

Find the campaign by `object_ids` once its ID is in `campaigns.md`; on the first run filter
`name CONTAIN <campaign name>` and record the campaign, ad set and ad IDs in `campaigns.md`.
Never fetch metrics by name filter alone.

Also, in the same session:
- `object_state: draft` for the campaign's subtree. Any unpublished edit sitting there is
  reported at once, before anything else — it would go live with the next publish (see the
  Meta edit-panel memory). Do not open a live ad's Edit panel in Ads Manager to read it.
- Note the attribution window Meta is counting on. Meta's purchase count is on that window;
  Shopify's is not.

What to write down: every figure above, per level, with the window. `purchase_roas` may be
recorded as "Meta's own ROAS figure" and is **never** presented as ROAS in the report.

---

## 3. Shopify pull — Finn, read-only

Population and window as in `order-level-pulls.md` §1: the standard exclusion string
(`-status:cancelled -financial_status:refunded -source_name:shopify_draft_order
-source_name:pos -tag:wholesale`), zero-total orders removed, `created_at` bounded in
Central time from launch 00:00 to today 00:00. Run Q5 for the journey fields and Q2's refund
fields on the same population.

**Match rules, in order.** An order is *tagged to the campaign* if any of these is true on
its **last visit**:

1. `utmParameters.campaign` equals the campaign name in `campaigns.md`.
2. `utmParameters.campaign` equals the name with a `(DRAFT)` suffix — Meta keeps the
   suffix if the campaign was renamed after the tag was set (`2026-09-10-iw-tracking-tags.md`).
3. `utm_id` (surfaces in `landingPage` as `utm_id=`) equals the campaign ID.
4. `utmParameters.campaign` equals the campaign **ID** — BPM and 18qt-TOF tag by ID, not
   name (`utm_campaign=<campaign ID>`, `utm_content=<ad ID>`), so split those by ad ID
   instead of `term` / `content` names *(Finn, 2026-09-17-month-plan-baseline.md §3)*.

**Known blind spot.** An ad whose tags never reach Shopify is invisible to every rule above.
Check `campaigns.md` for a "Tag blind spot" row (IW: `hpc-dark-evergreen`, Finn 2026-09-17)
and state in the report which share of spend no match could have caught.

Count first-visit matches separately. Then split the tagged orders by `utmParameters.term`
(ad set) and `utmParameters.content` (ad).

**The check the query cannot do for you.** Before writing "0 matched", list every order in
the window whose last visit has `source` or `utmParameters.source` = `facebook`, with its
`campaign`, `content`, `landingPage` and `referrerUrl`. If Meta-tagged orders exist but none
carry this campaign's name, say which names they do carry. A 0 that comes from a tag
mismatch and a 0 that comes from no orders are different findings, and the report says
which one it is or that it cannot tell.

For each group report: order count · **net** (merchandise after discounts, minus refunds,
before shipping and tax — the board's AOV basis) · AOV · product mix (18 QT, pots by size,
burner, bundle, other) · how many buyers had an earlier order. Q2 as written on 2026-09-10
carries no customer field: add `customer { id numberOfOrders }` to it, verify the field
with `graphql_schema` before running, and treat `numberOfOrders` > 1 on an order placed in
the window as "had an earlier order". Never raw rows.

---

## 4. Reconcile — Finn

One table, campaign level, then one per ad set and per ad:

| | Meta claims | Shopify tagged |
|---|---|---|
| Purchases / orders | `omni_purchase` (attribution window stated) | last-visit tagged count (first-visit in brackets) |
| Cost per purchase | spend ÷ Meta count | spend ÷ tagged count, or "no orders" |
| Net revenue | — never Meta's | Shopify net |

Rules that bind this table:

- **Shopify tagged is a floor, Meta's count is an upper bound.** Tags miss view-through,
  cross-device, and typed-in returns. Nothing on file says where the truth sits; on
  prospecting Shopify has seen 15–19% of Meta's count (`order-level-pulls.md` §6). Write
  the gap; never extrapolate it into an attribution rate.
- ⛔ **Never Shopify net ÷ Meta spend as ROAS.** No ROAS line in this report at all.
- **Cost per purchase is a cost-per-purchase figure, not CAC.** It becomes actual CAC only
  when the buyers are known to be new. Report the prior-customer count next to it and say
  which CAC, if any, is being claimed.
- **Compare CPP on Meta's count to the "Gate on Meta's count" column, and CPP on the tagged
  count to the incremental ceiling**, for the product the matched orders actually contain.
  If the ad sells more than one product line, show each. If the matched count is 0, there is
  no CPP on Shopify's side — say "no orders", not "∞" and not "$0".
- Every figure carries its source and date. An observation with no baseline is labelled one.

Finn ends here with a **Next:** line naming ROUX.

---

## 5. Write the report

`my-work (outputs)/internal/reports/<YYYY-MM-DD>-<campaign-slug>-checkpoint.md`
(today's date; slug like `iw-lookalike`). Sections, in this order:

1. **The one line** — spend · days · Meta purchases · Shopify tagged · net · Learning status.
2. **Against the agreed rule** — the decision rule from `campaigns.md`, quoted, and whether
   each condition is met. Facts only; the call is ROUX's.
3. **The Meta table** — campaign, ad set, ads. Spend share per ad.
4. **The Shopify table** — tagged orders, split, product mix, prior customers, the
   "what else carries a Meta tag" check.
5. **The reconcile table** and the ceiling comparison.
6. **Change since last checkpoint** — same figures, last time vs this time.
7. **Data problems, not business problems** — a draft edit found, a tag mismatch, a window
   edge, a field that came back empty.
8. **ROUX's call** (added in step 6).
9. **Evan's decision and what changed** (added in step 7, or "pending").

---

## 6. ROUX's call

ROUX reads the report and `campaigns.md`, then gives **one of continue · hold · cut**, with
the reasoning first and the budget number second. Also rule on anything bundled into this
checkpoint (`campaigns.md` "Bundled actions" — for IW: the staged creative swap, and whether
the two 120 QT ads get a floor or their own ad set).

ROUX's constraints: the rule agreed in advance is the test, not a new one invented on the
day; a bundled change that would reset Learning is weighed against what Learning is worth
at this spend; the $350/day ceiling holds unless the board says otherwise. ROUX writes
section 8 of the report and ends with a **Next:** line — usually Evan, sometimes Maya if a
creative needs one more pass.

---

## 7. Evan decides, then the writes

Present the one line, the rule check, and ROUX's call. Evan decides.

- **Every Meta change needs Evan's explicit yes, in this conversation, for that specific
  change.** A yes to "cut" is not a yes to "pause the ad set"; ask for the action by name.
- ⛔ **Publishing, turning anything on, and a creative swap on a live ad are Evan's click in
  Ads Manager.** The approved creative is already staged in
  `my-skills/hpc-ad-creative/work/creative/library/`; hand him the file names.
- After any approved write: state exactly what changed and its ID, confirm it in
  `ads_account_get_activity_logs`, and read `object_state: draft` again. After any publish,
  the "Review and publish" count in Ads Manager must read zero — the first IW publish sent
  1 of 3 ads.
- Write section 9 of the report.

---

## Close

1. **`campaigns.md`** — update the row: last checkpoint date, the one line, the call, the
   decision, and the **next checkpoint date and rule**. If the campaign was cut, move the
   row to the "Closed" table with its final figures.
2. **The board** — the Running block gets the new one line and ROUX's call; the Waiting
   table gets the next checkpoint as a Finn row with its date; a "do not touch" that ended
   comes off. Keep the H2 headings and the three Waiting columns exactly.
3. **`my-desk (now)/decisions.md`** — the decision, who, when, why, one entry.
4. **`my-desk (now)/key-dates.md`** — the next checkpoint date.
5. `/wrap` if the session is ending; it commits.

---

## Never

- Change a budget, status, creative, audience or URL parameter without Evan's yes for that
  change in this conversation. Reads are free.
- Present Meta's revenue or ROAS as real, or Shopify net ÷ Meta spend as ROAS.
- Call a cost-per-purchase figure CAC without saying which CAC and showing the new-customer
  basis.
- Write "0 matched" without the Meta-tagged-orders check in step 3.
- Invent a figure the pull did not return. "I don't have that number" is a complete line.
- Open a live ad's Edit panel in Ads Manager to read it.
- Judge a campaign against a rule that was not agreed before the window started.
