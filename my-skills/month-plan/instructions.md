---
name: month-plan
description: The monthly plan cycle. Near the end of each month, build next month's plan with targets, work it through with Evan, lock it, then score it every Thursday. Use for "/month-plan", "plan next month", "how are we tracking", "scoreboard".
---

# Month plan

**Why this exists (Evan, 2026-09-17):** once a plan is approved, Atlas works *toward targets*
instead of finding things to do. Every month gets one plan, drafted on one of the last days of the
month before, collaborated on, then locked. The first plan covers Sept 17 – Oct 31, 2026; from then on each plan covers one calendar month.

**The live plan is always `my-desk (now)/PLAN.md`.** One file, one month. `/prime` reads it and
briefs against it; `/wrap` checks the session's work against it. When a new plan locks, the old
one moves to `my-desk (now)/archive/plans/YYYY-MM-plan.md` with its final scorecard. Never deleted.

---

## Mode A — Draft next month (second-to-last day of the month)

Runs from the scheduled task `month-plan-draft` or when Evan asks.

1. **Close out the current month.** Finn pulls every target in `PLAN.md` for the full month,
   same definitions and sources as the plan used. Record *hit / missed / by how much* for each,
   and one line on why. A miss is written as a miss. Save this as the plan's final scorecard.
2. **Baseline the next month.** Finn: the same calendar month last year (orders, net, AOV,
   product-group split, weekly buckets), the trailing 30 days, the current Meta campaign set with
   status, budget and Meta-claimed vs Shopify-tagged orders. Save to
   `my-work (outputs)/internal/reports/YYYY-MM-DD-month-plan-baseline.md`.
3. **Outside moments.** Scout: the dated calendar for the month (games, festivals, holidays,
   seasonal search timing). Save to `my-files (knowledge)/hpc-reference/`.
4. **Evan's calendar.** Both calendars (`primary` and `evan@highperformancecookers.com`) for the
   month, for context only. **Calendar events never move plan work** (Evan, 2026-09-17): calls,
   appointments and games are reference or a short absence, and tasks go before or after them.
   Only an event labeled as a trip counts as unavailable. Evan works M–F 6:30 am–3:00 pm,
   sometimes until 4:30 pm.
5. **ROUX drafts.** Brief ROUX with the scorecard, baseline, moments, calendar, `BOARD.md`,
   `key-dates.md`, `seasonal-calendar.md` and the standing rules. The draft uses the shape below.
   Save to `my-work (outputs)/internal/YYYY-MM-DD-month-plan-<month>-DRAFT.md`.
6. **Check the draft before showing it.** Every number traces to a source in the baseline. Any
   claim ROUX makes about a live system (a campaign's status, an ad's destination, a product
   page) is verified by a read, not repeated. Fix what doesn't hold.
7. **Present to Evan:** the last month's scorecard in five lines, then the draft's targets table,
   the bets, and **only the asks that truly need Evan's or Jay's approval** (money, policy,
   anything Jay signs off). Every other recommendation is simply written into the plan; don't
   make Evan answer a numbered list (Evan, 2026-09-17). Say plainly that nothing is locked yet.

## Mode B — Lock (when Evan approves)

1. Apply Evan's notes. Where he changed a number, change it everywhere. The recommendations he didn't object to stand.
2. Archive the old `PLAN.md` (with its final scorecard) to `my-desk (now)/archive/plans/`.
3. Write the new `my-desk (now)/PLAN.md` in the shape below. **Cap: 150 lines.** The full draft
   stays in `my-work (outputs)/internal/` and is linked, not copied.
4. Log the approval in `decisions.md`: what was approved, by Evan, the date, the targets.
5. Add every dated gate to `key-dates.md`. Line the board's **Now** up with this week of the plan.
6. Check the Thursday scoreboard task (`month-plan-scoreboard`) exists and is enabled.

## Mode C — Thursday scoreboard (weekly)

Runs from the scheduled task `month-plan-scoreboard`, or when Evan asks "how are we tracking".

1. Read `PLAN.md`. Finn pulls each target month-to-date, with the same definition and source.
2. Compare to the pace line for this week. Status per target: **ahead / on pace / behind**,
   with the gap in dollars or units.
3. Check this week's jobs and gates in the plan: done, late, or blocked (and by whom).
4. Check the kill/scale rules against the numbers. A rule that fired is reported as a
   recommendation for Evan's click. Never a change made.
5. Write the result into the **Scoreboard** section of `PLAN.md` (replace that week's row, don't
   append history elsewhere) and return a one-screen report: targets, what fired, what's late,
   the top three jobs for the coming week.

---

## The shape of PLAN.md

1. **Header:** the month, locked date, approved by, link to the full draft.
2. **Goal:** one line.
3. **Targets:** table. Target, definition, baseline and source, commitment, stretch, how measured.
4. **Pace lines:** cumulative commitment by each Thursday.
5. **Bets:** three or four, one line each.
6. **Week by week:** jobs, owner, deliverable, gate date.
7. **Paid media:** caps by campaign and the pre-written kill/scale rules.
8. **Scoreboard:** one row per Thursday, filled in by Mode C.
9. **Off-plan log:** work Evan asked for that isn't in the plan, one line each. It's allowed; it
   just gets written down, so the next plan learns what the month really needed.

## Rules

- **Plain words.** Name targets for what they are ("consumer sales", "turkey fryer sales"),
  never internal codes like T1–T5. Every target has a one-line "what it counts".
- **Targets are goals, not forecasts,** and every target names its source system and definition.
  Revenue is Shopify net. Meta is read two ways (Meta-claimed, Shopify-tagged), never as
  Shopify net ÷ Meta spend. Say which CAC.
- **Nothing in a plan authorizes a write.** A plan line that says "launch retargeting Sept 28"
  means Atlas prepares it and Evan clicks. Every Shopify, Meta and Google write still needs his
  yes in that conversation.
- **Stay in lane.** No email, SMS or Klaviyo work in any plan. Google Ads and SEO are Coalition's:
  requests to them, not jobs.
- **A missed target is reported as missed.** Never redefine a target mid-month to make it hit.
  If a definition was wrong, say so, and fix it in the next plan.
- **Between plans,** new work is checked against `PLAN.md` first: if it moves a target, do it;
  if it doesn't, do it if Evan wants it and log it in the off-plan log.
