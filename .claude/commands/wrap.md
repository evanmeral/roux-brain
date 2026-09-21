Close the session properly. **The board is the deliverable — everything else is secondary.**

Say "Wrapping up the session." then do all six steps. Do not skip a step because the
session felt small; a short session still moves the board.

---

## 1. Rewrite the board

**If `my-desk (now)/PLAN.md` exists, check the session against it first.** Tick any plan job
finished this session in its week table. Anything Evan asked for that is not in the plan goes
one line into its **Off-plan log**. The board's **Now** should be this week's plan jobs unless
Evan said otherwise; if they differ, say why in the report.

Open `my-desk (now)/BOARD.md` and **rewrite it in place.** Do not append. Do not add a
"Update — today" section at the bottom. If a line is no longer true, replace it; if it is
finished, remove it. **Appending is how the last state file grew to 304 lines and became
useless.**

Keep the existing section order: Running · Now · Waiting on · Parked · Landmines ·
Numbers · Map.
**ROUX OS parses the board by these H2 headings and the Waiting table's three columns
(Who · What · Since). Keep them exactly; the page goes red if one is missing.**

Rules for each section:

- **Running** — only what is genuinely live right now, with its deadline. Delete a campaign the moment it ends.
- **Now** — a hard maximum of three. If a fourth thing became urgent, something else stops being a Now. Say which one you demoted and why.
- **Waiting on** — person, what, and the date it started. Remove a row the moment it lands.
- **Parked** — things deliberately not being worked on, each with *why*. This is what stops the same question being re-raised every week.
- **Landmines** — standing "do not ship this" items. **Never remove one just because it is old.** A landmine only leaves when the underlying thing is actually fixed.
- **Numbers** — a cached view only. Every figure carries its source and date. Mark anything under revision. The source of truth stays `my-files (knowledge)/hpc-reference/metrics-and-goals.md`.

**Hard cap: 120 lines.** If you are over, you are keeping history that belongs in
`archive/`. Check with `wc -l "my-desk (now)/BOARD.md"` before you finish.

Update the date in the title.

**Fold in `my-desk (now)/capture.md` first.** Every line there came from Evan through ROUX OS.
A `Done:` line clears its Waiting row (or Now item). A plain note becomes a board line, a
decision, or a business-file fact, whichever it is. Then move the lines you processed to
`my-desk (now)/archive/captures.md` (append, dated) and leave `capture.md` with only its header.
Nothing from capture is deleted, only moved.

**Fold in resolved approvals.** Every item in `my-desk (now)/approvals.json` that is `approved`,
`rejected` or `queued` is a decision Evan made in ROUX OS: write it to `decisions.md` or the board,
whichever it is, with his note as the why. Then run
`node "my-workflows (automations)/live/roux-os/approvals.js" archive`, which moves them to
`my-desk (now)/archive/approvals.md`. A `queued` live-write that was not carried out stays a board line.
**Keep `my-desk (now)/launches.md` current** too: tick nothing yourself, but add gates for a new
launch (each with owner, due date and source) and move a launch that has passed to `archive/`.

**Keep `my-desk (now)/key-dates.md` current.** One row per date that drives work, with its
source. Add any new date that landed on the board this session; remove rows whose date has
passed (to `archive/` if it mattered). ROUX OS reads this table for the countdown chips.

## 2. Log any decisions

If Evan decided something this session — a direction, a rejection, a rule, a number he
confirmed — append it to `my-desk (now)/decisions.md`, newest at the top, in the existing
format: **what · who · when · why.**

Only real decisions. Not "we discussed X." A decision is something that would be
re-litigated later if it were not written down.

**Never rewrite a past entry.** If a decision was reversed, add a new one saying so.

## 3. Archive, never delete

Anything substantial that came off the board goes to `my-desk (now)/archive/` as a dated
file. A finished campaign, a closed investigation, a superseded plan. Nothing is deleted —
if it mattered enough to be on the board, it matters enough to be findable.

## 4. Update the business files if something durable was learned

Only if a fact about the business actually changed or was confirmed:
`my-business (context)/` for products, prices, people, voice, or standing rules;
`my-files (knowledge)/hpc-reference/` for metrics, competitors, seasonal, customer language.

Every fact carries its source. A fact and a conclusion are never written the same way.
If Evan supplied a product fact mid-conversation, that is durable — file it, do not just
use it once.

## 5. Name any repeatable procedure (the backstop)

The main check happens **mid-session**, not here. CLAUDE.md's "Skills as we go" rule: the
second time a procedure is run by hand, offer the skill right then. This step catches what slipped.

Ask one question before committing: **did this session run a procedure that has been done
before, or build one that will run again?** A re-pull, an audit, a Shopify build, a print run,
a plan that follows a fixed shape. If yes, nothing in `my-skills/` covers it, and it wasn't
already offered mid-session, say so in the report and propose the skill in one line: its name,
what it would produce, what it would read. Evan decides. Do not build it inside /wrap; if he
says yes, build it right after the wrap in this session, or put it in Nova's queue on the board
if the session is ending.

**If a skill was used this session and Evan corrected how it ran, fold the correction into its
`instructions.md` now**, so the next run starts right.

A procedure that ran once and will not run again is not a skill. Do not propose one just to
fill the line.

## 6. Commit

```
git add -A && git commit -m "<what changed this session>"
```

The repo is the undo button. A session that changed files and did not commit leaves no
way back.

---

## Then report, in six lines or fewer

- What moved on the board
- What was decided
- What is now waiting on Evan
- Any repeatable procedure with no skill yet, and the skill you propose (or "none")
- Anything you could **not** resolve and why

If nothing was worth saving, say exactly that and still commit nothing. Do not invent
progress to fill the report.
