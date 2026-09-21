# The 20%-net marketing budget model
**2026-09-14 · Beau · builds on [overhead-method-options](2026-09-10-overhead-method-options.md) and [cac-ceilings-v3](2026-09-10-cac-ceilings-v3.md), per Evan's go-ahead 2026-09-14**

**What this is.** The marketing team's own working budget — how we decide ad spend day to
day. It is built FROM Jay's P&L, so it's grounded in his real numbers, but it is not an edit
to his books or the actual P&L. Nothing here changes what's booked; it's the tool we use to
decide what to spend, until Jay adopts pieces of it formally.

**Hard constraints vs. judgment calls, marked throughout:**
- 🔒 **Hard constraint** = a Shopify- or P&L-verified number, or a rule Jay has explicitly approved.
- 🟡 **Judgment call** = Beau's read, proposal, or an unadopted recommendation. Flagged every time.
- ⚠️ **Gap** = a number this model needs but doesn't have. Not invented, not estimated.

---

## 1. The topline number 🔒

**20% net target → ~$290,600/yr of room for all marketing** 🔒 *(confirmed — Jay,
2026-09-14, text via Evan)*. This replaces the $209,000 base figure below as the number of
record; the double-count that produced it was a flagged maybe as of 2026-09-10 and is now
settled.

**Base case, before the correction** — Jay's settled reading (P&L, 2026-09-10): the 46%
margin figure was worked on **$4.3M booked revenue**, real revenue is **~$3.9M** (a $393k
Lowe's double-booking backed out), real margin **~40.6%**. Overhead **~$594,600/yr**
($49,550/mo, Jay). At 20% net:

```
Room for marketing = Real revenue × (real margin − overhead% − 20%)
                    ≈ $3.9M × (40.6% − 15.2% − 20%)      [overhead% = $594,600 ÷ $3.9M]
                    ≈ $3.9M × 5.4%  ≈ $209,000/yr  (~$17,417/mo, evenly spread)
```

**The correction, re-derived from the same formula, not just re-stated:** Jay confirmed
2026-09-14 (Q1: "Yes") that the $6,800/mo agency retainer sits **inside both** the
$49,550/mo overhead figure **and** inside the P&L's $152k "agency fees" marketing line. That
dollar is being deducted from net profit twice. Pulling it out of the overhead side (since
it's already counted as marketing spend) drops overhead used in this formula to
$594,600 − $81,600 = **$513,000/yr**, i.e. overhead% = $513,000 ÷ $3.9M ≈ 13.15%:

```
Room for marketing = $3.9M × (40.6% − 13.15% − 20%)
                    ≈ $3.9M × 7.45%  ≈ $290,600/yr  (~$24,217/mo, evenly spread)
```

That matches the $290,600 figure flagged on 2026-09-10 — this is a re-derivation from the
model's own formula, not a re-quote of the earlier note, and it lands on the same number.

**Actual marketing, trailing 365 days (Jay, P&L, 2026-09-10): $676,000.**
→ **~$385,400 over** the confirmed $290,600/yr room (previously reported as ~$467,000 over
against the unconfirmed $209,000 room). The room grew and the trailing gap narrowed, but
**this trailing comparison overstates the forward problem** — see section 2. Two of the
$676k's components (agency fees, other advertising) are dominated by one-time, now-discontinued
costs; section 2 recomputes the finding on forward run-rates instead.

---

## 2. Where the $676k actually went, and which pieces we control

| Line | Trailing-365 actual 🔒 | Forward run-rate | Who controls it |
|---|---|---|---|
| **Meta** | $258,000 (Jay, P&L) | **~$78k–$115k/yr** 🔒 (see below) — already well down from the trailing-year average | **Us** |
| **Google** | $206,000 (Jay, P&L) | ⚠️ **Not on file.** Dropped, Evan's call 2026-09-14 — held at the trailing figure as the best available proxy, flagged as a proxy, not a current number | **Coalition** — monitor/suggest only |
| **Agency fees** | $152,000 (Jay, P&L) | **~$81,600/yr** 🔒 ($6,800/mo Coalition retainer only — Jay, 2026-09-14) | **Mixed**, but forward pace is a single known vendor line |
| **Other advertising/marketing** | $56,000 (Jay, P&L) | **~$10,300/yr** 🔒/🟡 ($5,300 reviews.io renewal each November 🔒 + ~$5,000 misc 🔒, annual cadence assumed 🟡 — Jay didn't state a period) | Unknown |
| **Affiliates** | ~$4,000 (Jay, P&L) | Steady — free product + 5% commission, judged on incremental revenue | **Pete** |

**Agency fees, composition confirmed (Jay, 2026-09-14, Q2):** the $152k trailing figure holds
the $6,800/mo Coalition retainer ($81,600/yr if it ran the full trailing year) plus one-time,
now-discontinued BM Digital costs — a 15%-of-ad-spend commission (**dollar amount not given,
not invented**), a $7,000/mo BM Digital retainer Dec–May (6 months = $42,000), and "probably
another $5,000 to $6,000" of other one-time misc. $81,600 + $42,000 + ~$5,500 ≈ $129,100,
leaving **~$22,900 of the trailing $152,000 unaccounted for** — consistent with, but not proof
of, the unquantified 15%-of-spend commission. 🟡 **Flagged as an unquantified gap, not forced
to close.** Going forward: **agency fees = $6,800/mo = $81,600/yr, full stop** (Jay: "Going
forward, under agency fees, would only be the $6,800 a month for the future projections").

**"Other advertising," composition confirmed (Jay, 2026-09-14, Q3):** "all these things...are
going away and will not be repeated," except **~$5,000 misc** and a **$5,300 reviews.io
renewal each November**. Forward run-rate ≈ **$10,300/yr**. The remaining ~$45,700 of the
trailing $56,000 was one-time and is not itemized further — Jay's answer already accounts for
it as discontinued, so it isn't forced to reconcile line by line.

**Meta's current run-rate, two ways, both 🔒 sourced:**
- **Live daily caps annualized:** $314/day × 365 = **$114,610/yr** (BPM $164 + 18qt-TOF $50 + IW $100, Ads Manager, Finn 2026-09-11)
- **Actual last-30-days annualized:** $6,400.87 (Aug 10–Sep 8, Ads Manager, 2026-09-10) ÷ 30 × 365 = **$77,877/yr**

Both are far below Meta's $258k trailing-year actual. **That drop already happened** — it's
the result of firing BM Digital on 2026-07-20, not of this budget exercise.

**The math that actually matters, recomputed on forward run-rates, not trailing totals:**

```
Meta            $78,000 – $115,000/yr   (ours, already known)
Google         $206,000/yr              (⚠️ trailing figure held as proxy — dropped, not chased)
Agency fees     $81,600/yr              🔒 Jay, 2026-09-14
Other adv.      $10,300/yr              🔒/🟡 Jay, 2026-09-14
Affiliates       $4,000/yr              steady
─────────────────────────────────────
Total          ~$379,900 – $416,900/yr  vs. room of $290,600/yr
                                        → **~$89,300 – $126,300/yr over**
```

🟡 **This is the central finding, revised:** the old finding ("Google + agency fees are
structurally where the overage sits") **no longer holds for agency fees.** With BM Digital
gone, agency fees drop to ~$81,600/yr forward — smaller than Meta's own spend, a single known
vendor line, no longer a distinct structural problem. **Google is now the whole story.** Even
holding Meta and everything else exactly where they sit today, Google's trailing $206k pace
alone is **~71% of the entire $290,600 room**; Meta plus Google together (at Meta's low end)
already consume 98% of it before agency, other, or affiliate spend counts at all. The forward
gap ($89k–$126k/yr) is a fraction of the old $467k figure, but it is still real, and it still
sits almost entirely in the one line marketing does not run. **Getting Google's actual current
spend remains the single highest-value number this model doesn't have** — Evan's call
2026-09-14 was to stop chasing it for now, not that it stopped mattering.

---

## 3. Allocation logic

🟡 **Proposed, not a hard rule**, since the annual figure is one number and monthly spend
shouldn't be forced flat against it — contribution and season should drive the pace, checked
against the annual ceiling cumulatively rather than divided into 12 equal slices.

1. **Meta — ours to run.** Keep the current $314/day structure (below). It already fits
   comfortably inside the $290,600 envelope on its own. No cut needed here on the numbers as
   they stand; the incremental rule (section 4) governs which specific ads get funded within it.
2. **Google — Coalition's lane, monitor only.** We cannot allocate this budget directly.
   Current monthly spend still isn't on file (checked 2026-09-14, dropped per Evan's call —
   not chased further). A single vendor line at ~71% of the entire 20%-net room is a decision
   for Jay and Coalition, not something Beau can resolve by suggestion alone.
3. **Agency fees — composition confirmed, 2026-09-14.** ~$81,600/yr forward, Coalition
   retainer only; the rest of the trailing $152k was one-time BM Digital cost and is gone.
   Allocatable as a known, fixed line — no longer an open flag.
4. **Affiliates — leave as is.** ~$4k/yr, free product + commission, immaterial to the gap.
5. **"Other" — composition confirmed, 2026-09-14.** ~$10,300/yr forward (misc + the November
   reviews.io renewal); the rest of the trailing $56k was one-time and is gone. No longer
   an open flag.

**Bottom line on allocation:** there is no version of this model where Meta is the lever
that gets HPC to 20% net. Meta's forward pace is already ~$78k–$115k/yr against a $290,600
total room. Even at zero Meta spend, Google's trailing pace alone ($206k) plus agency and
other advertising's forward run-rates (~$91,900/yr combined) would still be **~$7,300/yr
over budget** — down sharply from the old ~$149k, because agency and other advertising are
no longer bloated by discontinued BM Digital costs. **The budget conversation still belongs
mostly with Jay and Coalition, not with the Meta account** — it's just a much smaller gap
than it looked on 2026-09-10.

---

## 4. How the incremental per-ad ceiling rule plugs in

These are **two different mechanisms operating at two different levels.** Both have to
hold at once — one doesn't replace the other:

| Level | Question | Mechanism | Frequency |
|---|---|---|---|
| **Whole business** | Are we tracking toward 20% net this year? | This model: cumulative marketing spend vs. the ~$290,600/yr room | Monthly (Pull-D-style business check, per [overhead-method-options §5](2026-09-10-overhead-method-options.md#5-recommendation-three-yardsticks-one-job-each)) |
| **Individual ad / campaign** | Should this specific dollar be spent? | **The incremental rule** 🔒 *(Jay-adopted, 2026-09-14, text via Evan — Q4: "yes")*: no overhead in the per-ad math; each ad must leave ≥20% of the order's net after landed COGS, fees and the ad itself | Weekly, per campaign |

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

**Status: Jay formally adopted the incremental rule, 2026-09-14** (text via Evan, Q4: "yes" to
"every ad has to clear 20% net profit after cost, fees, and the ad spend itself"). This is now
Jay's rule, not a Beau recommendation awaiting sign-off. It does not by itself reopen the 18 QT
ladder — that still needs the 18 QT's own CPP to clear its gate (below), which it currently
does not.

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
Meta further would shave at most ~$115k/yr off a now-much-smaller ~$89k–$126k/yr forward gap
(section 2), and would do it on the channel already closest to the incremental-rule target.

---

## 6. Open items — need answers before this model is final

1. ✅ **ANSWERED, Jay 2026-09-14 (text via Evan):** yes, the $152k "agency fees" P&L line
   already includes the $6,800/mo agencies inside the $49,550/mo overhead figure. Annual room
   is confirmed at **$290,600**, not $209,000. → section 1.
2. **Coalition / Finn:** current monthly Google spend (not last year's $206k blended figure).
   Still the single number most likely to determine whether 20% net is reachable this year at
   all. **Checked 2026-09-14, still not on file.** Finn found a **$20,000 paid-search
   *budget target*, 4x ROAS goal** — a Coalition/HPC decision from the Aug 27 2026 alignment
   meeting (Motion recap, forwarded by Jay, Gmail thread `1a044779eeae932c`). 🟡 **This is a
   target, not measured spend**, and the recap doesn't say whether it's monthly or a
   launch-period figure — do not read it as "$20k/mo actual." The email trail (kickoff Aug 13
   → budget agreed Aug 27 → strategy deck Aug 28 → PMAX campaigns still launching as of the
   Sep 10 recap) shows Coalition's PPC push is brand-new, so **an actual current-spend number
   may not exist yet** — that's a real possibility, not just an unread figure. Two PDFs
   attached to the Aug 28 email (PPC Initial Strategy, PPC Audit Results) may have more detail
   but aren't readable from this Gmail connector; Basecamp also wasn't reachable read-only
   (no active session). **Dropped, Evan's call 2026-09-14** — not worth chasing further right
   now; the trailing $206k stands in as the working proxy (section 2), flagged as such.
3. ✅ **ANSWERED, Jay 2026-09-14 (text via Evan):** breakdown of the $152k agency-fees line
   and the $56k "other" line. Agency fees forward run-rate ~$81,600/yr (Coalition retainer
   only); "other advertising" forward run-rate ~$10,300/yr (misc + November reviews.io
   renewal). Full detail and the trailing-vs-forward reconciliation → section 2.
4. ✅ **ANSWERED, Jay 2026-09-14 (text via Evan, Q4: "yes"):** the incremental per-ad rule is
   formally adopted, not just a Beau recommendation. → section 4.
5. **Finn:** re-run the Pull-D business-level check monthly going forward (last run
   2026-09-10) so this model's "$290,600 room" gets checked against real, current
   contribution — not just re-derived from a single trailing-365-day P&L pull.

---

## 7. What this model does NOT say

- It does not say Meta spend should be cut. The numbers say the opposite — Meta is already
  inside the target range.
- It does not resolve whether 20% net is reachable this year. Section 1's $290,600 room
  assumes current revenue and margin hold; if Google's actual current pace is anywhere near
  last year's $206k (unconfirmed, section 2), hitting 20% this year still requires either
  more room or a cut mostly outside marketing's own lane.
- It does not touch Jay's actual P&L or booked numbers. Every figure above traces to a
  source cited in place; nothing here has been written back to Shopify, Meta, or Google.

---

## Related

[Overhead method options](2026-09-10-overhead-method-options.md) · [CAC ceilings v3](2026-09-10-cac-ceilings-v3.md) · [Pull D](2026-09-10-pull-d-business-contribution.md) · [metrics-and-goals](../../../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [Board](../../../my-desk%20%28now%29/BOARD.md) · [decisions](../../../my-desk%20%28now%29/decisions.md)
