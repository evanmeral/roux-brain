# Atlas OS — build plan (v3) · BUILT 2026-09-14, two items on Evan

**Date:** 2026-09-14 · **Status:** BUILT (phases 1–5). Waiting on Evan: the one-time Desktop-access click for
`Atlas OS.app`, and the two calendar addresses in `config.local.json`. Next: Weekly check as a headless button,
the second-monitor layout when the monitor arrives.
**Owner:** Nova (systems). **Where it will live:** `my-workflows (automations)/live/atlas-os/`
**v2 → v3 (2026-09-14):** mapped against the ARMS guide (`~/Desktop/ARMS-Agentic-OS-Guide.pdf`,
RoboNuggets). Changes: headless skill buttons with run status and a `runs.log`, a Routines panel,
a Made-recently list, a Files tab as the searchable second brain, the Wrap button dropped.
**v1 → v2:** Evan's last OS died because it was "a complicated place to read info." v2 is rebuilt
around that: the screen shows only what he would not think to ask, and every card does something.

---

## The four rules

1. **If it can be answered by asking, it is not on the screen.** Numbers, decisions, history,
   parked items, the creative library: ask the brain. The screen shows the things nobody asks
   for and everybody needs: the time, the week, what is due, what is waiting on Evan, what is live
   and spending, and what the brain found this morning.
2. **Every card has an action.** Work on this → opens a real Claude session with the prompt
   pre-filled. Done → tells the brain. Open → the file in Obsidian. Link → the tool.
3. **The brain feeds it before Evan wakes up.** A 6:30am CT run writes `today.md` (top three,
   yesterday's Meta spend and Shopify orders, calendar flags, loose ends). He opens the laptop to
   a brief he did not ask for. Read-only against every live system.
4. **One laptop screen, no scrolling.** The full board is one tab away, not on the daily screen.

## ARMS mapping — where Atlas sits, what this build adds

The guide's frame: an OS is four standing parts (Applications, Routines, Memory, Skills), each at
three levels, with the command centre as the face on top (its own words: 20 to 30% of the value).
Atlas already has most of the structure. This build fills the level-3 gaps.

| Part | Where Atlas is today | What this build adds | After |
|---|---|---|---|
| **S** Skills | L2. Twenty skills in `my-skills/` wired through `.claude/commands/`. `hpc-ad-creative` is a full file-set skill (assets, templates, scripts, brand.css). | **L3: skills as buttons.** File-producing skills run headless (`claude -p`) from the OS with run status and a `runs.log`. Conversation skills open a real session. | L3 |
| **M** Memory | L2. `CLAUDE.md` is the master router (board, rules, manual, save-to table). `BOARD.md` is the live index with its Map section. `how-this-brain-works.md` is the manual. Obsidian graph view exists. | **L3: the Files tab.** The server indexes the vault live (no refresh script), search as you type, grouped by area, click for preview, path copy, open in Obsidian. Plus `capture.md` and `key-dates.md` as new routed files. | L3 |
| **R** Routines | L0. Nothing runs on a schedule. The automation roadmap has planned it since August. | **L1: the 6:30 pulse** via launchd, firing at wake if the lid was closed. A **Routines panel** shows each routine, last run, status, and its output. Weekly scoreboard is the second routine once the first is stable. | L1 |
| **A** Applications | L1 done, L3 partly. Gmail, Calendar, Drive, Slack, Shopify, Meta, Canva connected. The ad render pipeline and the savings calculator are self-built tools. | **L3: the OS itself is the micro-app.** L2 (agent-found connectors) stays a separate job: Google Ads read-only, Basecamp, reviews.io, UpPromote, Digit when Jay's MCP lands. | L3 |

**On the guide's Routines L2 (a cloud machine syncing the vault):** not now. The vault holds net
sales, margins, the pixel ID and team detail; the 2026-09-02 decision made "private" non-negotiable.
launchd's wake-catch-up covers a daily pulse. Revisit when a routine genuinely has to fire with the
laptop off; the cleaner path then is Claude's cloud routines against a private GitHub remote, not a
VPS with Syncthing.

**The guide's command-centre principles, checked against this plan:**
1. One page, one address, survives restart — yes (launchd, port 4242).
2. Show, do not store — yes. Files are the truth; the OS never holds state of its own.
3. Every widget earns its place — yes; this is the v2 cut. Rule kept: if Evan stops looking at a
   widget, it goes.
4. Artifacts one click away — **added back** as a Made-recently list (last ten files the brain
   wrote, open on click). It is an action list, not reading.
5. The second brain as centrepiece — the Files tab, one click from the top bar.
6. Start with three widgets — phase 1 ships with exactly three panels: This morning, Now + Waiting
   on you, This week. Everything else lands one at a time after.
7. Restyle freely — the HPC skin is a skin.

## Why localhost, not Obsidian

Obsidian can host a dashboard (Dataview, Tasks, Full Calendar, Homepage, a CSS snippet). It wins on
one thing: edits are native, so checking a box changes the file. It loses on what makes this
useful: the board would have to be rewritten into task syntax so queries can find it; the calendar
plugin needs the same secret-URL step and lives in its own pane; there are no buttons that start a
session or hand work to the brain without the Shell Commands plugin, which is the same hack with
less control; and it reads like a note because it is one, which is the exact failure mode Evan
described. **Obsidian stays the editor. The cockpit is the localhost page.** Every card opens its
underlying file in Obsidian with one click (`obsidian://` links, scheme verified 2026-09-14).

## Verified 2026-09-14

- `claude` CLI 2.1.226 is installed and sees the same claude.ai connectors as the desktop app:
  Meta Ads, Shopify, Google Calendar, Gmail, Drive and Slack all report Connected. So a session
  started from an OS button has the whole brain, and the 6:30 run can read Meta, Shopify and the
  calendar.
- The Claude desktop app registers a `claude://` URL scheme. Whether it accepts a prompt is
  untested; the fallback is a Terminal session, which is certain to work.
- Obsidian registers `obsidian://`.

## What is on the Today screen (laptop, ~1440×900, one screen)

**Top bar** — white shield · ATLAS wordmark · clock (large) · date · rhythm chip (Mon Look back ·
Tue Paid media · Wed Content · Thu Partners and follow-ups · Fri Build) · countdown chips for key
dates beyond this week · feed-health dot.

**Left column**
- **This morning** — from `today.md`: top three, one pulse line (yesterday's Meta spend by
  campaign, Shopify orders and net, each with source), calendar flags. Stamped with the run time.
  If the run failed: red "No brief this morning. The 6:30 run failed at [step]." Never blank.
- **Now** — the board's three priorities as cards. Headline, date and dollar chips, "Work on this"
  (opens a session), "Open" (Obsidian).
- **Waiting on you** — Evan's rows only, with age badges. "Done" writes a line to `capture.md`;
  the row greys out until the next `/wrap` rewrites the board. Other people's rows sit behind a
  "Waiting on others" toggle.

**Right column**
- **This week** — seven agenda columns, Monday start, both calendars color-coded, today
  highlighted, a now-line. Key dates from `key-dates.md` appear as all-day chips in their column.
- **Running** — each live campaign with $/day and status, and the daily-cap bar ($314 of $350).
- **Tell Atlas** — one text box. Enter writes to `capture.md`; `/prime` reads it first.
- **Start** — Morning brief · Sort inbox · Wrap · Ask (free text → session with that prompt).
- **Routines** — each routine, last run time, status, one-click output. Red if a run failed.
- **Made recently** — the last ten files the brain wrote, open on click (Obsidian).
- **Links** — Shopify admin · Ads Manager (HP Cookers ADs) · Basecamp · UpPromote · reviews.io ·
  Canva brand kit · Drive · the site · warranty page · the vault.

**Files tab** — the vault as a searchable map: search as you type, grouped by area, preview,
path copy, open in Obsidian. Indexed live by the server, no refresh script.

**Board tab** — the full `BOARD.md`, one section per panel (Running · Now · Waiting · Parked ·
Landmines · Numbers), collapsible, links open in Obsidian. This is the "board, more organized and
easier to read" ask. One click away, not the default.

**Cut from the daily screen** (ask the brain instead): Numbers tiles, Decisions, Library, Parked,
Landmines. All still readable on the Board tab.

## Buttons: headless or session

Two kinds, per the guide's Skills level 3.

**Headless** (`claude -p "/skill"` in the vault; runs without a chat window; status shown next to the
button: running, done, failed; every run appended to `runs.log` with time, skill, duration, output
path). For skills whose output is a file:

| Button | Runs | Output lands |
|---|---|---|
| Morning brief | `/morning-brief` (read-only variant; no unattended Gmail drafting) | `my-desk (now)/today.md` |
| Pulse now | the 6:30 routine on demand | `today.md` + `pulse/` |
| Weekly check | `/weekly-check` | `my-work (outputs)/internal/reports/` |

**Session** (a real interactive Claude session in the vault, opened in a new Terminal window via
`osascript`; `claude://` tried first during the build). For anything that needs a conversation:

| Button | Prompt |
|---|---|
| Work on this (Now #n) | "Pick up Now #n on the board: <headline>. Read the linked docs first." |
| Sort inbox | `/sort-my-inbox` (drafts replies; Evan reviews them) |
| Ask | whatever Evan typed |

No Wrap button: `/wrap` belongs to the session that did the work, and runs automatically there.

## Feeds

| Widget | Source | Freshness |
|---|---|---|
| Now · Waiting · Running · Board tab | `my-desk (now)/BOARD.md`, parsed by section heading | live (file watch) |
| This morning | `my-desk (now)/today.md`, written by the 6:30 run | daily |
| This week | Google Calendar secret iCal addresses, personal + HPC, in gitignored `config.local.json` | every 5 min |
| Key dates | `my-desk (now)/key-dates.md`, kept current by `/wrap` | live |
| Capture | the OS writes `my-desk (now)/capture.md`; `/prime` reads it; `/wrap` folds it into the board and moves the processed lines to `archive/captures.md` | — |

## The 6:30am run

A `launchd` job at 6:30 CT runs `claude -p` in the vault with a fixed prompt (`.claude/commands/pulse.md`):
read yesterday's Meta spend per campaign (HP Cookers ADs only), yesterday's Shopify orders and net,
today's and tomorrow's calendar, the board's Waiting rows older than two days, and `capture.md`;
write `today.md` and `pulse/YYYY-MM-DD.json`. **Reads only.** No Gmail drafting in the unattended
run; inbox sorting stays behind the Sort inbox button. If a connector fails, `today.md` names the
missing section. launchd runs a missed job at wake, so a closed lid at 6:30 still gets a brief.
Verified at build: `claude -p` headless with connectors; fallback is the desktop app's scheduled
task. The read tools it needs are added to the allow list in `.claude/settings.json` (Nova).

## Build log

- **2026-09-14, phases 1–3 built.** Server, board parser, week view, capture, Done, Work on this,
  Ask, Morning brief and Sort inbox as sessions, key-dates, prime/wrap hooks, the pulse command,
  runner, Pulse-now button and routine status. First pulse run: 97 s, ~$0.82, Meta + Shopify +
  both calendars read, `today.md` in the contract shape, no denials.
- **Found:** the CLI names claude.ai connectors `mcp__claude_ai_<Name>__<tool>`, not the UUID
  prefixes the desktop app uses. `settings.json` now carries every Meta rule under both namings
  (publish denied in both) and denies the unverified n8n `ask_marketing_agent` in both. Its dead
  `Write(...)` rules were dropped (only `Edit(path)` rules are matched, and they cover Write).
- **Found:** launchd-spawned processes cannot read `~/Desktop` until macOS grants it. The server
  is hosted in `~/Applications/Atlas OS.app`, opened through LaunchServices so the prompt can
  appear; the 6:30 job is a `curl` to the server, so one grant covers both. Evan's one click.
- **Found:** the desktop app's preview harness could not bind the port; launchd is the runner.
- **Fixed after a teammate session flagged it (2026-09-14):** the first launcher relaunched every
  15 s and re-raised errors as dialogs while the Desktop grant was missing. Now the launcher checks
  the grant first, shows one dialog with an Open Settings button, and exits; launchd's KeepAlive is
  tied to a grant marker outside the Desktop; `install.sh` registers nothing until the server
  answers. Also added the Host/Origin guard on the server (POSTs need same-origin or `X-Atlas`).
- **Then retired the app launcher entirely (2026-09-14, from Evan's screenshot):** an ad-hoc-signed
  applet never shows up in Files and Folders, so there was nothing for Evan to toggle. macOS *does*
  list **node** there (the very first launchd run put it there). launchd now runs node directly;
  Evan turns on Desktop Folder under node; `install.sh` registers only once the server answers.

## Stack

Node 26, one `server.js`, one package for ICS parsing with recurrence. One page, vanilla JS,
Poppins + JetBrains Mono. Palette from the verified design system, darkened:
bg `#141313` · surface `#1E1D1D` · surface-2 `#262424` · border `#302E2E` · text `#F3F6F6` ·
muted `#9A9591` · accent `#F69329` · flame `#E13418` · gold `#FFA41C` · success `#198754`.
Logo `HPC-ShieldLogo-White.png`. Starts at login (launchd), opened as a Safari "Add to Dock" app.
Laptop layout first; a wider layout when the second monitor arrives.

⚠️ `hpc-standing-rules.md` says "navy, red and cream; heavy condensed type." The verified design
system (Shopify theme + live site) is orange/red/off-white with Poppins. Building to the verified one.

## Brain-side changes

- `/wrap`: keep `key-dates.md` current; fold `capture.md` into the board; move processed captures
  to `archive/captures.md`.
- `/prime`: read `capture.md` first if it exists.
- New: `key-dates.md` seeded from today's board · `.claude/commands/pulse.md` · allow-list entries
  for the read tools the pulse needs.
- `decisions.md`: "Atlas OS is the daily cockpit; Obsidian stays the editor; BOARD.md stays the
  single state. Only the brain writes the board; Evan writes to capture.md."
- `.gitignore`: `node_modules/`, `config.local.json`.

## Build order

1. **Three panels.** Server, board parser, theme, clock. This morning (empty state until the routine
   exists), Now + Waiting on you, This week (needs the two calendar URLs). Start at login, dock app.
2. **Buttons.** Work on this, Ask, Sort inbox as sessions. Done and Tell Atlas writing `capture.md`.
   `/prime` and `/wrap` hooks. `key-dates.md`. `runs.log`.
3. **The first routine.** `.claude/commands/pulse.md`, the 6:30 launchd job, one test run, the
   Routines panel, the This-morning panel filled for real.
4. **Headless buttons.** Morning brief, Pulse now, Weekly check, with run status.
5. **Made recently, Links, Board tab, Files tab.**

## Evan's answers (2026-09-14)

Calendar: secret iCal addresses, both calendars · Week: agenda columns, Monday start · Pulse: yes,
6:30 · Capture: yes · Board: read-only, brain writes it · Startup: login + dock app · Screen:
laptop first, monitor later · Thursday: Partners and follow-ups · Optional widgets: cut.
