Close the session properly. **The board is the deliverable — everything else is secondary.**

Say "Wrapping up the session." then do all five steps. Do not skip a step because the
session felt small; a short session still moves the board.

---

## 1. Rewrite the board

Open `my-desk (now)/BOARD.md` and **rewrite it in place.** Do not append. Do not add a
"Update — today" section at the bottom. If a line is no longer true, replace it; if it is
finished, remove it. **Appending is how the last state file grew to 304 lines and became
useless.**

Keep the existing section order: Running · Now · Waiting on · Parked · Landmines ·
Numbers · Map.

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

## 5. Commit

```
git add -A && git commit -m "<what changed this session>"
```

The repo is the undo button. A session that changed files and did not commit leaves no
way back.

---

## Then report, in five lines or fewer

- What moved on the board
- What was decided
- What is now waiting on Evan
- Anything you could **not** resolve and why

If nothing was worth saving, say exactly that and still commit nothing. Do not invent
progress to fill the report.
