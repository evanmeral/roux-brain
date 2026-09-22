# Meta calls: rolling-boil and the 18 QT · Beau · Tue 2026-09-22

**Status: Beau's recommendation, pending Evan's OK.** Read-only. Nothing was written to Meta or Shopify. Every pause, rule and budget change below is Evan's click, and each one needs its own yes.

**Sources:** Finn's read today → [2026-09-22-meta-ad-review-finn.md](2026-09-22-meta-ad-review-finn.md) (Meta connector, account `4392736013287`, plus Shopify orders, read 07:55–08:26 CDT) · kill lines and the Oct 2 terms → [PLAN.md](../../../my-desk%20(now)/PLAN.md) · incremental-rule ceilings → [2026-09-10-overhead-method-options.md](2026-09-10-overhead-method-options.md) §3 · IW window rules → decisions.md, 2026-09-21.

---

## The calls

| # | Entity · ID | Change | When |
|---|---|---|---|
| 1 | `120qt-performance_rolling-boil` · `52508008680391` | **Pause at a trigger, not now.** It pauses when lifetime spend passes **$389 with 0 Meta purchases**. Best done as a Meta automated rule on this one ad, so nobody has to watch it | Rule built today, if Evan says yes |
| 2 | `120qt-crowd-math` · `52507989521591` | **No change** | Read Oct 2 |
| 3 | `IW Lookalike 1% - Cold Prospecting - Sept 2026` · `52507989521191` | **Budget stays $100/day CBO**, even if #1 fires | Read Oct 2 |
| 4 | `18qt-004` · `6998222424787` | **Pause** | Sept 25, in the same edit that adds Tailgate A + B |
| 5 | `18qt-001` · `6998222425187` | **No change** | |
| 6 | `Video_UGC/Review18qt Fryer` (Nov Holiday) · `6855622474387` | **No change today.** Review it at the Oct 1 edit that adds the turkey kit ad to BPM | Oct 1 |
| 7 | `18qt-TOF-Prospecting` · `6998161993987` | **Budget holds at $50/day CBO** | |
| 8 | BPM 18 QT videos: `Video_Jay 18qt Fryer Demo` `6855622474187`, `Video_UGC/Review18qt Fryer` (LAL) `6772110395587` | **No change. No increase** | Weight moves Oct 19, as planned |

---

## 1. rolling-boil

**Facts** *(Finn, Meta + Shopify, 2026-09-22)*
- Lifetime $178.58. 0 Meta purchases. 0 Shopify-tagged orders.
- About $7/day Sept 18–20, then $59.16 on Sept 21 and $15.68 by 08:00 today. No logged edit since Sept 17. Why Meta shifted the money is not tested.
- It's the only paid placement the Triple Jet has. It links to the Platinum bundle, where the incremental ceiling is **$194.58** (overhead-method-options §3; 17 orders, 88% costed).
- `crowd-math` Sept 15–21: $293.41, 3 Meta purchases ($97.80), 1 tagged (#17482, $715, new).

**Call: pause at a trigger.**
- **Why not now:** $178.58 is less than one ceiling's worth of spend on a ~$990 order. At that spend, zero purchases is a normal result even if the ad works. Pausing now would kill the only Performance + Triple Jet test, which is the main push, on no evidence.
- **Why not wait for Oct 2:** at Sept 21's pace it spends another ~$590 by Oct 2, and it takes the money from the one ad that has sold a pot.
- **The trigger: pause when lifetime spend passes $389 (2× the $194.58 ceiling) with 0 Meta purchases.** Meta over-counts, so zero on Meta's own count at twice the ceiling is real evidence. The trigger scales with the risk. At $59/day it fires around Sept 25–26. At $7/day it never fires before Oct 2.
- **How:** a Meta automated rule on ad `52508008680391` only: lifetime amount spent > $389 AND purchases = 0 → turn off. Build it from Automated Rules, not from the ad's Edit panel, and check that "Review and publish" reads 0 afterwards. If Evan would rather not build a rule, Finn reads the lifetime spend on Thu Sept 24 and again on Fri Sept 25.
- If a tagged Platinum or Triple Jet order shows up with Meta still at zero, Evan turns it back on. That's the one exception.

**crowd-math and the $100:** no change to either. If rolling-boil pauses, the whole $100 goes to `crowd-math`. The Oct 2 read still runs on the locked Sept 18 window and the PLAN.md terms, and rolling-boil's spend stays in that window. No replacement ad goes in before Oct 2, because adding one mid-test breaks the read. Performance + Triple Jet stays on Meta anyway: pot statics A + B link to the Platinum bundle in `RT 30D - Pots` from Sept 28.

**This is the only IW edit before Oct 2.** It keeps to one edit per ad set per checkpoint.

Standing caveat, already on the board: "Continue" on the Oct 2 terms doesn't mean under the ceiling. $293.41 per tagged order on crowd-math is above the ~$195 ceiling for the 120 QT Powered.

IW went over its $100 budget on 3 of 7 days ($112.41 on Sept 21), but the 7-day average is $97.98. Meta allows daily overage, so no action.

---

## 2. The 18 QT

**Facts** *(Finn, 2026-09-22)*
- Tagged CAC: **$118.01** Sept 15–21 (9 new, $1,062.06) and **$151.93** Sept 1–21 (15 new, $2,278.98). Ceiling **$73–$100** per incremental order (overhead-method-options §3).
- Every 18 QT ad is under the **$189** kill line on Meta's count.
- `18qt-004`: $556.72 Sept 1–21, **0 tagged**, 8 Meta purchases ($69.59). Sept 15–21: $207.27, 1 Meta purchase. That's 56% of `18qt-TOF`'s $369.69 for the week. Its ad ID is one of the two in 18qt-TOF that does show up in Shopify sessions, so its zero is a real zero, not a tag gap. It was the first visit on #17499, which is credited to `18qt-001`.
- `18qt-001`: $134.90 Sept 15–21, 5 Meta purchases ($26.98), 1 tagged (#17499).
- `Video_UGC` Nov Holiday: $97.65 Sept 15–21, 0 Meta purchases, 0 tagged. Sept 1–21: $126.62, 3 Meta purchases, 1 tagged new ($21.25, a lid).
- `Video_UGC` LAL: tagged $73.40. `Video_Jay 18qt Fryer Demo`: tagged $100.38.
- Most `18qt-TOF` ads send `Facebook_UA` instead of an ad ID, so their tagged counts are a floor. #17492 ($468.75, new) can only be credited to the campaign.

**My calculations (arithmetic on Finn's figures, not new data)**
- 18 QT Meta cost per purchase Sept 15–21 = $1,062.06 ÷ 20 Meta purchases = **$53.10**.
- Sept 1–21 without `18qt-004` = $1,722.26 ÷ 15 = **$114.82** tagged, against $151.93 with it. This single ad accounts for most of the gap to the ceiling.

**How the kill line and the ceiling fit together.** They measure different things, so both can be true at once.
- The **$189 kill line is the 18 QT break-even** ($189.37, overhead-method-options §3), counted by Meta. Passing it only means Meta doesn't claim we lose money on each fryer.
- The **$73–$100 ceiling** is where an extra fryer order still leaves the 20% net target, counted by Shopify.
- The 18 QT sits between the two: $53 on Meta's count, $118 on Shopify-tagged. It pays toward overhead but misses the profit target. That rules out a kill, and it also rules out scaling. The Meta scaling gate is $30.

**Which one governs today:**
- **The ceiling governs the money.** No budget goes up anywhere, and the worst ad against the ceiling comes out.
- **The kill line is only the automatic off-switch.** It doesn't fire today.

**The rule I'm adding (proposed for the PLAN.md kill table, pending Evan):**
- An ad also goes off when **spend passes 3× its incremental ceiling with 0 Shopify-tagged new customers**. This applies only where the ad's tags are proven to reach Shopify.
- If Meta also shows 0 purchases, the bar is **2× the ceiling**. That's the rolling-boil trigger.
- This is still "only when it's bleeding money". It just measures bleeding with Shopify, not only Meta.

**Ad level**
- **`18qt-004` 6998222424787 → paused Sept 25.** It has $557 against a $300 bar (3 × $100) with 0 tagged, and its tags are proven to work. Its own Meta count fell to $207 per purchase in the last 7 days. Pausing it in the **same edit that adds Tailgate A + B** keeps 18qt-TOF to one edit this week. It also stops the CBO's favourite ad from starving the kit ads. The cost of waiting three days is about $90 at its recent pace. **If the kit slips, pause it alone on Sept 25 anyway.** This replaces my earlier "no pauses on Sept 25" line on the board. The fallback still stands: if A + B have spent < $50 by Sept 29, pause `002` + `003`.
- **`18qt-001` 6998222425187 → no change.** It has the best Meta cost per purchase in the account ($26.98, the only one under the $30 gate) and one tagged new customer. It's the likely home for 004's share of the budget.
- **`Video_UGC` Nov Holiday 6855622474387 → no change today.** It has 1 tagged customer and $126.62 of spend, nowhere near any trigger. Pausing it now would be a second edit to the ad set that holds `Video_Jay 18qt Fryer Demo`, our best-tagged fryer ad. **At the Oct 1 turkey-kit edit to BPM:** pause it if it has 0 tagged 18 QT orders Sept 15–30.

**Campaign level**
- **`18qt-TOF-Prospecting` 6998161993987 → holds at $50/day.** Its Meta cost per purchase is above the $30 gate, so no ladder step. Cutting it before the kit launch would starve the kit test, and the kit is the lever that raises order size. Averaging $52.81/day is Meta's normal daily overage, so no action on that.
- **BPM 18 QT videos → no change, no increase.** These are our two best 18 QT ads on Shopify: LAL $73.40, at the ceiling, and Jay's demo $100.38, at the top of the range. Neither passes the $30 Meta gate ($58.72 and $33.46), and the account ran within $6 of $350 on both Sept 20 and Sept 21. The Oct 19 weight shift to turkey stays as planned.

---

## Not asked, but flagged

**`BPM Tailgate Video` 6823510767787** has the worst tagged number in the account: $741.60 Sept 1–21 for 1 tagged new customer (Meta $74.16, under its kill line). It lands on the mixed powered-cookers collection, so it has no single ceiling to hold it against. It isn't fired by any rule yet, since it has 1 tagged. It's the first ad I'd look at for the Oct 1 BPM edit.

---

**Next:** Finn. Before the Sept 25 edit:
- Confirm the ad set ID(s) holding `18qt-001`…`004` (#17492 names `6998161994987`).
- Read `rolling-boil` lifetime spend on Thu Sept 24 and again on Fri Sept 25, unless Evan builds the automated rule.
- Pull `BPM Tailgate Video`'s 14-day Meta cost per purchase and its tagged orders for the Oct 1 edit.

Check his output against Finn's 07:55 read today.
