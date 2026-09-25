---
name: improve
description: The weekly self-improvement review. Looks back over the week's work, corrections, approvals and results, and proposes up to three changes to how ROUX works (new skill, new check, merge, cut, rule fix) plus up to three business ideas, each with its evidence, into the ROUX OS Approvals tab. Proposes only; builds nothing. Also keeps the results file (what-worked.md). Runs Fridays 1:00 CT as a scheduled task, or when Evan says "improve", "how can you get better", "weekly review", or "/improve".
---

# Improve — the weekly review

## Goal
ROUX gets better week by week through its files: skills, checks, rules, memory, and a record of
what actually worked. This review is the loop that makes that happen without Evan pushing it
(Evan, 2026-09-24: "I want you to be able to come up with new ideas and skills that will make
you better all by yourself").

**Mode: propose, Evan approves** (Evan, 2026-09-24, option 2). This skill never edits a skill, a
rule, CLAUDE.md or memory. It writes proposals to Approvals; the next session builds the approved
ones. It may write only its own three files: the report, `lessons.md` status marks, and
`what-worked.md`. One exception (Evan, 2026-09-25): it retires an old starter skill that overlaps a
newer one (step 5), and says so. Revisit the mode after four reviews using the track record (step 7).

**Growth has a cost.** Every rule costs attention; overlapping skills get picked wrong;
contradicting rules get followed at random. So:
- **At most 3 system proposals and 3 business ideas a week.** Fewer is fine. Zero is fine.
- **Every addition names what it replaces or merges**, or says plainly "nothing, and here is why
  no existing skill or rule covers it."
- **Every review looks for something to cut** (step 5), not only things to add.
- **No cap on the number of skills** (Evan, 2026-09-25: "we will make a lot of these"). What costs is
  overlap: two skills that would fire on the same request. Those get cleaned up (step 5).

## Inputs (the week = the last 7 days, through today)
- `my-skills/improve/lessons.md`: the corrections log
- `my-desk (now)/decisions.md`: entries dated this week
- `my-desk (now)/capture.md` + `my-desk (now)/archive/captures.md`: this week's content notes and approvals
- `my-desk (now)/archive/approvals.md`: resolved approvals, **especially rejections and their notes**
- `git log --since="7 days ago" --stat`: what changed and each session's own summary
- Session transcripts, if the session-search tool is available (`search_session_transcripts`); if not, say so and rely on git
- The memory folder (`~/.claude/projects/-Users-evanmeral-ROUX-AI-Brain-ROUX/memory/`) and `MEMORY.md`
- `my-skills/*/instructions.md` (names and descriptions), `CLAUDE.md`, `my-business (context)/hpc-standing-rules.md`
- `my-files (knowledge)/hpc-reference/what-worked.md`
- Past reports: `my-work (outputs)/internal/reports/*-improve.md`

## Steps

### 1. Corrections that stopped at the output
Read this week's `lessons.md` rows. Any row with `source fixed: no` is a proposal candidate:
the correction fixed one piece but the skill or rule that produced the mistake still says the
old thing. Also scan capture content notes and rejection notes for corrections that never made
it into `lessons.md` at all; add them as rows (that's a log entry, allowed).

### 2. The same correction twice
Group corrections by kind (type size, centering, copy wording, wrong placement size, a fact
wrong, a lane crossed...). The same kind twice in 30 days means a rule is not enough: propose a
**check** that runs every time (in `rubric-check`, `lint.js`, the post-scheduler preflight, or a
skill's own quality check), not another rule.

### 3. Done by hand twice
From git and transcripts: any procedure run by hand twice (same steps, new inputs) with no skill
covering it. Check the skill list and the board's "skill candidates" line first; a candidate
Evan already declined is not re-proposed unless something new happened.

### 4. Contradictions
For every rule file changed this week, find other files that speak to the same subject
(grep the key words across `CLAUDE.md`, standing rules, `my-skills/*/instructions.md`, memory,
`how-we-sound.md`). If two say different things, propose which one wins and where the single
copy should live. Evan's newer, dated word wins unless SAFETY.md says otherwise.

### 5. What to cut
- Skills with no sign of use in 60 days (no git change under the folder, no mention in commits
  or transcripts). The starter templates from Sept 1 (`quote`, `chase-payment`, `support`, …) are
  the first to check: HPC-shaped or not, used or not. Unused alone is a proposal, not a removal.
- **Two skills whose descriptions would both fire on the same request: retire the older, generic one
  now, without waiting for Approvals** (Evan, 2026-09-25: "if things start overlapping… go ahead and
  clean up/remove old ones"). Move its folder and its `.claude/commands/` file (as `command.md`) into
  `my-desk (now)/archive/retired-skills/<name>/`, add a row to that folder's README, drop it from agent
  skill lists and `how-this-brain-works.md`, and say so in the report and the reply. Never deleted.
  If the overlap is between two HPC-built skills, it is a merge: propose it instead.
- Memory files that contradict a newer decision, or that a skill or check now enforces (the
  memory can shrink to a pointer).
- `CLAUDE.md` over ~150 lines, or a rule in it that is restated elsewhere.

### 6. Results: what worked (update `what-worked.md`)
Dispatch **Finn** (read-only) for the week:
- **Paid:** per ad, spend · Meta purchases · Shopify-tagged new customers (match rules 1–5 in
  `my-skills/hpc-campaign-checkpoint/instructions.md` §3) · tagged CAC vs its ceiling.
- **Organic:** per post, reach and engagement if a read-only source returns them (Meta connector
  IG media reads). If none does, write "not read: <reason>". Never estimate.

Append one dated block to `what-worked.md`: the facts with sources, then **separately** marked as
conclusions, what the numbers suggest about hooks, formats, products or offers. One week is
thin; say so, and only promote a pattern to the "Patterns" section once it holds across 3+ weeks.

### 7. Track record
Read past `*-improve.md` reports and `archive/approvals.md`: how many proposals Evan approved,
rejected, and why. Rejection reasons are the best signal of what ROUX misjudges; if a reason
repeats, that's a lesson row. After the fourth review (about Oct 16), add one line to the report:
"Four reviews in: X of Y approved. Evan could move this to build-then-tell (option 1)." Evan's call.

### 8. Business ideas (up to 3)
Hand Beau the week's numbers, `what-worked.md`, `PLAN.md` targets and `key-dates.md`. Ask for
at most three ideas that move a plan target, each with: the evidence, the cost, what it would
replace, and the first step. Scout only if an idea needs outside research. ⛔ Nothing in email/SMS
(Biljana's). An idea that would write to Shopify, Meta or Google is a recommendation; the change
itself still needs Evan's yes in a session.

### 9. Propose
Pick the best (at most 3 system + 3 ideas). Each goes to Approvals:

**Write them short** (Evan, 2026-09-25: "way too much info… make the verbiage short and to the point"):
- `recommendation`: one plain sentence, under ~20 words, saying what you want to do. No evidence, no IDs.
- `change`: up to three short lines, what gets added, changed or removed. Plain words, few file paths.
- `source`: the evidence. It sits folded under **Details** on the card, so it can be full.

```bash
node "my-workflows (automations)/live/roux-os/approvals.js" add '{"from":"ROUX weekly review","kind":"recommendation","recommendation":"<one or two lines, plain words>","change":"<the exact change: files, what is added, what is removed or merged>","source":"<evidence: dates, files, notes>"}'
```
Ideas use `"from":"Beau"`. A proposal to change a rule uses `"kind":"rule"`.

### 10. Report
Write `my-work (outputs)/internal/reports/<YYYY-MM-DD>-improve.md`: what was read (and what
could not be), each proposal with evidence, what was considered and dropped and why, the
what-worked facts, the track record. Then reply in under 150 words: the proposals in one line
each, "in Approvals", and anything broken.

## When Evan approves
The next session sees it through `/prime` (approvals). Build it then; log it in `decisions.md`;
if it added something, do the named cut or merge in the same change.

## Quality check
- ≤ 3 system proposals, ≤ 3 ideas, each with dated evidence and a named replace/merge
- At least one cut considered, even if none proposed
- Every figure sourced; anything unread says "not read" and why
- Nothing edited outside the report, `lessons.md` and `what-worked.md`, except retiring an overlapping
  starter skill (step 5)
- Every Approvals card readable in five seconds: one-sentence recommendation, short change
