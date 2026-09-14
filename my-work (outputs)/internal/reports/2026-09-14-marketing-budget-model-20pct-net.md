# The 20%-net marketing budget model
**2026-09-14 · ROUX · builds on [overhead-method-options](2026-09-10-overhead-method-options.md) and [cac-ceilings-v3](2026-09-10-cac-ceilings-v3.md), per Evan's go-ahead 2026-09-14**

**What this is.** The marketing team's own working budget — how we decide ad spend day to
day. It is built FROM Jay's P&L, so it's grounded in his real numbers, but it is not an edit
to his books or the actual P&L. Nothing here changes what's booked; it's the tool we use to
decide what to spend, until Jay adopts pieces of it formally.

**Hard constraints vs. judgment calls, marked throughout:**
- 🔒 **Hard constraint** = a Shopify- or P&L-verified number, or a rule Jay has explicitly approved.
- 🟡 **Judgment call** = ROUX's read, proposal, or an unadopted recommendation. Flagged every time.
- ⚠️ **Gap** = a number this model needs but doesn't have. Not invented, not estimated.

---

## 1. The topline number 🔒

**20% net target → ~$209,000/yr of room for all marketing**, on Jay's settled reading
(P&L, 2026-09-10): the 46% margin figure was worked on **$4.3M booked revenue**, real revenue
is **~$3.9M** (a $393k Lowe's double-booking backed out), real margin **~40.6%**. Overhead
**~$594,600/yr** ($49,550/mo, Jay). At 20% net:

```
Room for marketing = Real revenue × (real margin − overhead% − 20%)
                    ≈ $3.9M × (40.6% − 15.2% − 20%)
                    ≈ $3.9M × 5.4%  ≈ $209,000/yr  (~$17,417/mo, evenly spread)
```

**Actual marketing, trailing 365 days (Jay, P&L, 2026-09-10): $676,000.**
→ **~$467,000 over.** This is not a "trim 10%" problem. It's roughly a two-thirds cut,
economy-wide, to hit 20% net this year on current revenue and margin.

🟡 **Unresolved reading, flagged not invented:** if the $49,550/mo overhead's "$6,800/mo
agencies" line is *already counted inside* the P&L's $152k "agency fees" marketing line,
the true room is closer to **$290,600/yr**, not $209,000. Jay hasn't been asked this
specific question. It changes the size of the gap by ~$82k either way — worth a text before
this model gets treated as final. → open item, section 6.

---

## 2. Where the $676k actually went, and which pieces we control

| Line | Trailing-365 actual 🔒 | Current run-rate | Who controls it |
|---|---|---|---|
| **Meta** | $258,000 (Jay, P&L) | **~$78k–$115k/yr forward** (see below) — already well down from the trailing-year average | **Us** |
| **Google** | $206,000 (Jay, P&L) | ⚠️ **Not on file.** BOARD.md flags "Google spend for the last 30 days" as not-to-be-invented | **Coalition** — monitor/suggest only |
| **Agency fees** | $152,000 (Jay, P&L) | ⚠️ **Not on file.** No breakdown of what's inside this line, and no current run-rate | **Mixed** — likely includes fired BM Digital spend for part of the year |
| **Other advertising/marketing** | $56,000 (Jay, P&L) | ⚠️ **Not on file.** Composition unknown | Unknown |
| **Affiliates** | ~$4,000 (Jay, P&L) | Steady — free product + 5% commission, judged on incremental revenue | **Pete** |

**Meta's current run-rate, two ways, both 🔒 sourced:**
- **Live daily caps annualized:** $314/day × 365 = **$114,610/yr** (BPM $164 + 18qt-TOF $50 + IW $100, Ads Manager, Finn 2026-09-11)
- **Actual last-30-days annualized:** $6,400.87 (Aug 10–Sep 8, Ads Manager, 2026-09-10) ÷ 30 × 365 = **$77,877/yr**

Both are far below Meta's $258k trailing-year actual. **That drop already happened** — it's
the result of firing BM Digital on 2026-07-20, not of this budget exercise. **Meta is not
where the $467k overage lives.**

**The math that actually matters:** Google's trailing-year actual alone ($206k) is **~99%
of the entire $209k annual room**, on last year's pace. Add agency fees ($152k) and the
budget is blown twice over before Meta spends a dollar. 🟡 **This is the central finding:**
the two lines the marketing team does not directly control — Google and agency fees — are
structurally where the overage sits. Whether that's still true is unknown, because neither
line's *current* pace is on file (both flagged ⚠️ above). Getting those two current numbers
is the single highest-value data pull for this model, and it isn't ours to run — Google is
Coalition's, agency fees need Jay or the bookkeeping.

---

## 3. Allocation logic

🟡 **Proposed, not a hard rule**, since the annual figure is one number and monthly spend
shouldn't be forced flat against it — contribution and season should drive the pace, checked
against the annual ceiling cumulatively rather than divided into 12 equal slices.

1. **Meta — ours to run.** Keep the current $314/day structure (below). It already fits
   comfortably inside the $209k envelope on its own. No cut needed here on the numbers as
   they stand; the incremental rule (section 4) governs which specific ads get funded within it.
2. **Google — Coalition's lane, monitor only.** We cannot allocate this budget directly.
   **Recommend:** ask Coalition for current monthly spend (not last year's $206k) and put
   the 20%-net math in front of them and Jay explicitly — a single vendor line consuming
   the entire company's ad-spend room at 20% net is a decision for Jay, not something
   ROUX can resolve by suggestion alone.
3. **Agency fees — needs a breakdown before it can be allocated at all.** $152k with no
   composition on file. Don't know how much of it is Coalition retainer, Frazier Media
   video production, or residual BM Digital-period cost. Flagging for Jay/Finn, not guessing.
4. **Affiliates — leave as is.** ~$4k/yr, free product + commission, immaterial to the gap.
5. **"Other" ($56k) — composition unknown.** Can't allocate what isn't itemized. Flagging.

**Bottom line on allocation:** there is no version of this model where Meta is the lever
that gets HPC to 20% net. Meta's forward pace is already ~$78k–$115k/yr against a $209k
total room. Even at zero Meta spend, Google + agency fees at last year's pace ($358k) alone
would still be ~$149k over budget. **The budget conversation belongs mostly with Jay and
Coalition, not with the Meta account.**

---

## 4. How the incremental per-ad ceiling rule plugs in

These are **two different mechanisms operating at two different levels.** Both have to
hold at once — one doesn't replace the other:

| Level | Question | Mechanism | Frequency |
|---|---|---|---|
| **Whole business** | Are we tracking toward 20% net this year? | This model: cumulative marketing spend vs. the ~$209k/yr room | Monthly (Pull-D-style business check, per [overhead-method-options §5](2026-09-10-overhead-method-options.md#5-recommendation-three-yardsticks-one-job-each)) |
| **Individual ad / campaign** | Should this specific dollar be spent? | **The incremental rule** 🟡 *(recommended by ROUX, Jay hasn't formally adopted it)*: no overhead in the per-ad math; each ad must leave ≥20% of the order's net after landed COGS, fees and the ad itself | Weekly, per campaign |

The incremental rule is a **gate on individual Meta spend decisions** — it doesn't set the
annual number, and it can't be applied to Google or agency fees without order-level
visibility into what those dollars buy, which we don't have. It only governs the channel
we run directly.

**Current gates, unchanged from the overhead report (2026-09-10):**
- Trailing-7 Meta CPP must be ≤ 40% of the incremental ceiling to step up spend.
- 18 QT fryer: ceiling ~$73–$100/incremental order → gate ~$29–$40. **Current 30-day CPP is
  $40.56 — does not clear the gate.**
- Low-ticket lines (18/30/40/60 QT + accessories) capped combined at 25% of the daily Meta
  budget (~$86 of $350).
- 120 QT Powered / Triple Jet / Performance pots / Platinum Bundle: no live Meta spend
  currently targets these alone, so no gate is active yet — flag if that changes.

**Status: Jay has not formally adopted the incremental rule.** Scaling decisions (the 18 QT
ladder specifically) are on hold pending that call. This model treats it as the working
assumption for Meta, per Evan's prior direction, but it is not yet Jay's rule.

---

## 5. What this implies for current Meta daily caps

**Answer: no increase, right now — on either the annual math or the per-ad gate.**

| Campaign | Cap | Change? | Why |
|---|---|---|---|
| `BPM_TOF_Manual` | $164/day | **No change.** Jay's proposed +25% stays not-applied (Evan, 2026-09-11) | Nothing in this model reopens that; the overage isn't a Meta problem |
| `18qt-TOF-Prospecting` | $50/day | **No change.** Stays off the ladder | 30-day CPP $40.56 fails the ~$30–$40 gate |
| `IW LAL 1% - Cold Prospecting` | $100/day | **No change.** Still in Learning | No signal yet either way |
| Retargeting (parked) | Would add $30/day | **Stays parked** — Evan's call, unrelated to this model | Adding it doesn't move the real problem (Google/agency), and "wait before adding another new campaign" still holds |

**$314/day live (→ $344 if retargeting unparks) continues to hold.** Nothing in this budget
model argues for spending more on Meta. If anything, it argues Meta was never the source of
last year's overage and shouldn't be where anyone looks first for savings either — cutting
Meta further would shave at most ~$115k/yr off a $467k gap, and would do it on the channel
already closest to the incremental-rule target.

---

## 6. Open items — need answers before this model is final

1. **Jay:** does the $152k "agency fees" P&L line already include the $6,800/mo agencies
   inside the $49,550/mo overhead figure? Changes the annual room from $209k to $290,600.
2. **Coalition / Finn:** current monthly Google spend (not last year's $206k blended figure).
   This is the single number most likely to determine whether 20% net is reachable this year
   at all.
3. **Jay / bookkeeping:** breakdown of the $152k agency-fees line and the $56k "other"
   line — what vendors, what's ongoing vs. one-time, how much is residual BM Digital cost.
4. **Jay:** formal adoption (or rejection) of the incremental per-ad rule — currently a ROUX
   recommendation only.
5. **Finn:** re-run the Pull-D business-level check monthly going forward (last run
   2026-09-10) so this model's "$209k room" gets checked against real, current contribution
   — not just re-derived from a single trailing-365-day P&L pull.

---

## 7. What this model does NOT say

- It does not say Meta spend should be cut. The numbers say the opposite — Meta is already
  inside the target range.
- It does not resolve whether 20% net is reachable this year. Section 1's $209k assumes
  current revenue and margin hold; if Google and agency fees are anywhere near last year's
  pace, hitting 20% this year would require cuts far outside marketing's own lane.
- It does not touch Jay's actual P&L or booked numbers. Every figure above traces to a
  source cited in place; nothing here has been written back to Shopify, Meta, or Google.

---

## Related

[Overhead method options](2026-09-10-overhead-method-options.md) · [CAC ceilings v3](2026-09-10-cac-ceilings-v3.md) · [Pull D](2026-09-10-pull-d-business-contribution.md) · [metrics-and-goals](../../../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [Board](../../../my-desk%20%28now%29/BOARD.md) · [decisions](../../../my-desk%20%28now%29/decisions.md)
