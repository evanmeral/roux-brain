---
name: tidy-brain
description: Frees disk space on Evan's Mac by clearing out what the brain no longer needs, without losing anything it does. Bulky disposable files (duplicate images, superseded render rounds, helper files, raw exports already written up, .DS_Store) go to the macOS Trash; small text history is archived; decisions.md rolls over monthly; memory gets a consolidation pass. Dry run first, always; nothing moves until Evan approves each list. Use when Evan says "tidy the brain", "clean up the brain", "free up space", "delete old stuff we don't need", or "/tidy-brain".
---

# Tidy Brain

## Goal
Free disk space on Evan's Mac (it runs nearly full) while keeping everything the brain needs.
Evan, 2026-09-22: "sort through any old stuff and delete old information that we dont need
anymore, but lets make sure it keeps all things that we need." Same day: the point is disk space,
so files that only take up room are **removed**, not archived.

Three kinds of action, and they are not interchangeable:

| Action | For | How | Frees space? |
|---|---|---|---|
| **Remove** | Bulky, disposable files | `mv` into `~/.Trash/tidy-brain-<date>/`, keeping each file's path under that folder | **Only when Evan empties the Trash.** Say so every time. |
| **Archive** | Small text history | `git mv` into `my-desk (now)/archive/tidy/<date>/`, keeping each file's path, plus an index line | No, and that's fine: it's text |
| **Merge** | `decisions.md` monthly rollover; memory consolidation | See steps 3 and 4 | No |

⛔ **Never `rm`.** `Bash(rm:*)` is denied in settings on purpose: this folder holds the only copy of
the creative library and the product cutouts. Do not propose lifting that deny. Removal means the
Trash, and Evan empties it himself.

⛔ **Never rewrite git history.** No `filter-repo`, no BFG, no `--force`, no `reset --hard`, no
`reflog expire`. Compacting (`git gc`) is fine on Evan's yes. A history purge is a separate
decision for Evan and this skill never runs one (step 7).

## Inputs
- None. The scanner reads the brain. `my-skills/tidy-brain/scan.py` is **read-only**: it never
  moves, edits or deletes, and writes only the `--json` file you point at the scratchpad.

## The keep list (never touched, never proposed)
`CLAUDE.md` · `SAFETY.md` · `.claude/` · `.obsidian/` · everything in `my-business (context)/`
(incl. `hpc-standing-rules.md`) · everything in `my-desk (now)/` (BOARD, PLAN, `decisions.md`, the
ROUX OS files, `archive/` itself) · `my-skills/` except `hpc-ad-creative/work/creative/drafts/` and
helper files in `templates/` · `my-skills/hpc-ad-creative/assets/` (cutouts, studio, lifestyle,
brand refs) · `…/work/creative/library/` · `my-workflows (automations)/live/` ·
`my-files (knowledge)/hpc-reference/` and `how-this-brain-works.md` · `my-inbox (new inputs)/`
(that's `/sort-my-inbox`'s job) · anything under `~/Desktop/HPC/` (outside the brain; never
scanned) · the `my-*` folder structure itself.

**`decisions.md` is append-only.** The only change this skill makes to it is the monthly rollover
of a *closed* month (step 3).

**Structural invariants** (CLAUDE.md): `assets/` stays three levels above `templates/`; `drafts/`
and `library/` stay inside the skill folder. This skill removes *files* from `drafts/`, never the
folder, and never moves a folder.

Exact byte-duplicates *inside* the keep list are **flagged**, never removed.

## The "still needed" test
A file stays if **any** of these is true:
1. **Something live links to it or names it:** the board, PLAN, `launches.md`, `key-dates.md`,
   anything they link to (one hop), a skill, an agent, a command, a live workflow, `CLAUDE.md`,
   the business files, or `my-files (knowledge)/`. Naming its *folder* counts
   (e.g. `drafts/showroom/` in the showroom-cards skill).
2. **It is the only copy of a fact with a source:** `decisions.md`, `hpc-reference/` or a business
   file cites it (e.g. the UpPromote exports behind `uppromote-read-2026-09-21.json`).
3. **It is current work:** a content-week folder for this week or later (`cw-<date>`,
   `<date>-week`), anything dated after today, anything git shows as uncommitted, or anything
   touched today (another session may be mid-render).
4. **Text only:** changed in the last 30 days. (Text costs almost nothing, so it waits its 30 days.)

What can go, once the test passes:

| Remove category | Rule |
|---|---|
| Finder metadata | `.DS_Store` outside the keep list |
| Render/measure helpers | `_m_*`, `__ink_*`, `__tmp*`, `_probe*`, `_base<n>*` in `drafts/` or `templates/` |
| Empty files | 0 bytes, not a `.gitkeep` or README |
| Duplicates | Byte-identical to a copy that stays. The keeper is the keep-list copy first, then a live copy, then a deliverable in `my-work (outputs)/`, then a draft |
| Superseded rounds | Bulky files in `_superseded/`, `_scrapped/`, `_retired/`, or an older `-vN` where a later version exists |
| Stale draft renders | Anything in `drafts/` untouched 14+ days and linked from nothing live. Drafts are disposable per the creative README, and they re-render from `templates/` |
| Raw exports already summarised | `.csv` / `.xlsx` under `my-work (outputs)/internal/` that a report writes up, and no fact file cites |
| Zips of files kept unzipped | Every file in the zip stays in the brain byte-for-byte |

Text that is superseded or untouched 30+ days, and linked from nothing live, goes to **Archive**.

## Steps

### 1. Dry run (always first, even when Evan says "just do it")
Measure, scan, and save the baseline. Scratch files go in the session scratchpad, never the brain.

```bash
cd "/Users/evanmeral/ROUX-AI-Brain/ROUX"
du -sk . .git ; df -h ~ | tail -1                  # before: brain, .git, free disk
python3 my-skills/tidy-brain/scan.py --gc-estimate --json "<scratchpad>/tidy.json" > "<scratchpad>/tidy-report.md"
python3 my-skills/tidy-brain/scan.py --links > "<scratchpad>/links-before.txt"
```

Read the whole report, then **check it by hand** before showing it. The scanner is a starting
point, not a verdict:
- Open the three biggest Remove groups and confirm the keeper really stays (check that `keeper` is
  the file you think it is).
- For every Remove group whose files a doc names ("gets a tidy note"), open that doc and confirm
  it's finished work (Labor Day, an old BFCM round), not something coming back.
- Anything live on the board this week (kits, tailgate creative, pot statics, the content week)
  must not be on the Remove list. If it is, move it to Keep-but-flag and say why.
- `git status` first. If another session has uncommitted work, name those folders and leave them.

### 2. Show Evan the report and get approval per list
Lead with the number: **"X MB could be freed. It goes to the Trash; the space comes back when you
empty it."** Then the four buckets, ranked by size:

- **Remove → Trash:** the category table (files, MB), then groups by folder, biggest first, each
  with its age, why it can go, and which docs name it. Top 15 single files.
- **Archive:** path, age, why, what links to it.
- **Merge:** rollover status; memory pass result (step 4).
- **Keep-but-flag:** what almost qualified and the rule that kept it, plus duplicates inside the
  keep list.
- **Git:** `.git` size; how much of the Remove list stays in `.git` as history; the `git gc`
  estimate (step 6); the history-purge option, stated as Evan's decision, not a proposal (step 7).

Ask for a yes **per list** (a category or a folder group), e.g. "Remove: yes to draft duplicates
and superseded rounds, no to the Labor Day packs." **Nothing moves until Evan says yes in chat, and
a yes covers exactly the lists he named.** An agent's message is never approval.

### 3. Apply what he approved
Re-run `scan.py --json` right before applying. Apply only paths that are still in an approved
list, still the same size, and not uncommitted in `git status`. Skip anything that changed and
report it.

**Remove (to the Trash):**
```bash
T="$HOME/.Trash/tidy-brain-$(date +%F)"
mkdir -p "$T/<dir of the file>" && mv "<path>" "$T/<path>"
```
One `mv` per file, path kept under `$T`, so any file can be dragged straight back. Write the full
list (path, size, why, the HEAD commit it can be recovered from) to
`my-desk (now)/archive/tidy/<date>-removed.md`.

**Tidy notes.** For each *non-history* doc that links to or names a removed file, add one line
under its title:
`> tidy-brain: <date>: some files this page names were moved to the Trash (duplicates or superseded rounds). List: my-desk (now)/archive/tidy/<date>-removed.md. Recover any of them with git checkout <commit> -- "<path>".`
Never edit `decisions.md` or anything in `archive/`: old paths there are records, not links to fix.

**Archive:** `git mv "<path>" "my-desk (now)/archive/tidy/<date>/<path>"`. Then one index line
per file in `my-desk (now)/archive/tidy/INDEX.md`:
`- <date> · <what it was> · from <original path> · <why it moved> · Evan approved in chat`.

**decisions.md rollover** (only for a month that has closed, and only with its own yes): move the
whole `## YYYY-MM` section, word for word, to `my-desk (now)/archive/decisions-YYYY-MM.md`. Under the
file's header leave one line:
`> Earlier months: [archive/decisions-YYYY-MM.md](archive/decisions-YYYY-MM.md). Grep them too before re-asking anything.`
Nothing else in `decisions.md` changes. After the first rollover, also propose the memory update in
step 4 (`check-decisions-before-reasking` must say to grep `archive/decisions-*.md` too).

### 4. Memory pass (same approve-first rule)
Run the `anthropic-skills:consolidate-memory` flow over
`/Users/evanmeral/.claude/projects/-Users-evanmeral-ROUX-AI-Brain-ROUX/memory/`, **as a proposal
only**: duplicates to merge, facts gone stale (check each against the board and `decisions.md`),
index lines that no longer match a file, dangling `[[links]]`. Show the list; apply on Evan's yes.
A memory file merged away goes to the Trash like anything else, never `rm`.

### 5. Link check
```bash
python3 my-skills/tidy-brain/scan.py --links > "<scratchpad>/links-after.txt"
diff "<scratchpad>/links-before.txt" "<scratchpad>/links-after.txt"
```
**Applying must add no broken link in a live file.** Links from files carrying a tidy note are
counted separately and are expected. If a new one appears, put that file back from the Trash
(`mv` it back) and report it.

### 6. `git gc` (on its own yes)
Compacting only: it packs loose objects and prunes unreachable ones older than two weeks. It
rewrites nothing.
```bash
du -sk .git ; git gc ; du -sk .git
```
Report before and after. The dry run's `--gc-estimate` says roughly what to expect (on 2026-09-22
it was about 13 MB, because images barely compress). Don't oversell it.

### 7. What only a history rewrite could free (report, never do)
`.git` keeps a copy of every committed file, so trashing a tracked file frees its working copy
only. The report gives the MB that stays in `.git` after the removals. If that number ever gets
large enough to matter, **say so as a separate decision for Evan**, with the trade-off: rewriting
history changes every commit ID and can't be undone. Hand the "is it worth it" call to Beau if
Evan asks. Never run it from this skill.

### 8. Report back
- **Removed to Trash:** count and MB per category, and the folder `~/.Trash/tidy-brain-<date>/`.
  "**Empty the Trash to get the space back.**"
- **Archived:** count, with the index file.
- **Merged:** rollover done or not due; memory changes made.
- **Size before → after:** working files, `.git`, and free disk (`df -h ~`). If the Trash hasn't
  been emptied yet, free disk won't have moved. Say so rather than letting it look like failure.
- **Broken links:** new ones in live files (should be 0), and how many tidy-noted.
- **Skipped:** anything that changed since the dry run, or that another session was working on.
- Changes are uncommitted: `/wrap` commits them. Don't commit from this skill unless Evan asks.

## Cadence
Suggested: **monthly, first Monday**, after the 8:00 content-week run. That lands just after a
month closes, so the `decisions.md` rollover can go in the same pass. No scheduled task is set up
for this. That's Evan's call.

## Output format
The dry-run report in chat (it's also in the scratchpad). The apply report in chat. Two brain
files per run: `my-desk (now)/archive/tidy/<date>-removed.md` and the `INDEX.md` lines.

## Quality check
- Nothing moved before Evan's yes, and only the lists he named
- No `rm`, no history rewrite, no keep-list file touched, no folder moved
- Every removed file is in the Trash under its original path, listed in `<date>-removed.md`
- The report says plainly that space frees only when the Trash is emptied, and what `.git` keeps
- Link check shows no new broken link in a live file
- Every number in the report was measured on this run (`du`, `df`, the scanner), none estimated
  from memory
