# ROUX OS

Evan's daily cockpit. A local page at **http://localhost:4242** that reads the brain's files and
shows the day: the time, the week, what is due, what is waiting on Evan, what is live and spending,
and what the brain found this morning. Spec: `../../specs/2026-09-14-roux-os-plan.md`.

**It never writes `BOARD.md`, `PLAN.md` or `decisions.md`.** Since v0.2 (2026-09-21) it is more than
a reader: Evan can tick launch gates, decide approvals, edit the affiliate roster, approve posts and
ask for drafted nudges. Every one of those is local code with **zero model runs**, and every one
leaves a line in `my-desk (now)/capture.md`, which `/prime` reads and `/wrap` folds into the board.
**It holds no Shopify, Meta or Google credentials, makes no call to any of them, and no code path
may be added that does.** It sends nothing to anyone: "draft" buttons only leave a note for the
next session, and Evan sends everything himself.

## ⛔ The approvals rule (also in `approvals.js`)

An approval of kind **`live-write`** (anything that would change Shopify, Meta or Google) **does not
authorize the write.** The standing rule needs Evan's explicit yes in the conversation where the
write happens. The OS never marks a live-write "approved": it marks it `queued` ("Queued, confirm in
session"), says so on the card and in the capture line, and the session still asks. Same idea on the
Posts tab: **Approve marks the manifest only.** No button, route or module here schedules or
publishes a post; publishing is one of the four things that are never automated.

## Run

- **As a login item (normal):** `./install.sh` once. launchd runs node on `server.js` directly,
  starts it at login and restarts it if it dies. Logs in `logs/`. Remove with `./uninstall.sh`.
- **The pulse is button-only** (Evan, 2026-09-14): press Pulse now on the page. To also run it at
  6:30 every morning, set `pulse.schedule` to `daily` in `config.json` and run `./install.sh`
  again; that adds a second launchd job that curls the running server at 6:30.
- **One-time macOS step:** the vault lives in `~/Desktop`, which macOS protects from background
  programs. macOS files that permission under **node** in System Settings → Privacy & Security →
  Files and Folders: expand node and turn on Desktop Folder. `install.sh` starts the server once,
  checks it answers, and registers nothing until it does, so a missing grant means one line of
  advice, not a loop. (An app-bundle launcher was tried first; ad-hoc-signed apps never appear in
  that list, so it was retired on 2026-09-14.)
- **Terminal needs the same permission.** The session buttons open a real Claude session in a
  Terminal window, and Terminal reads the vault under its own Desktop-folder grant: System
  Settings → Privacy & Security → Files and Folders → Terminal → Desktop Folder. Without it the
  session fails at once; the window now stays open and says so.
- **Request guard:** the server answers only requests with a localhost Host header, and accepts a
  POST only from the page itself (same-origin) or with an `X-ROUX` header (the 6:30 curl). A web
  page in the browser cannot reach the write endpoints.
- **By hand:** `node server.js` in this folder.
- **As a dock app:** open http://localhost:4242 in Safari, then File → Add to Dock. It gets its own
  window and icon.

## Configure

- `config.json` — port, timezone, rhythm labels, quick links, the Meta daily ceiling (with source).
- `config.local.json` — **not committed.** The two Google Calendar secret iCal addresses. Read-only
  by design; reset them in Google Calendar settings if one ever leaks. The page picks up edits on
  its own.

## The pulse (button-only)

**It is not scheduled.** It runs when Evan presses Pulse now, so `today.md` is as old as his last
press. An old `today.md` is normal and is never reported as a fault.

`.claude/commands/pulse.md` is the prompt; `pulse.sh` runs it headless (`claude -p`, Sonnet 5 by
default, `ROUX_PULSE_MODEL` overrides) and logs to `runs.log`. It runs on Evan's claude.ai Max
plan (the CLI is signed in with that account, no API key), so it spends plan allowance, not money. Reads only: Meta (HP Cookers ADs),
Shopify (ShopifyQL), both calendars, the board, key dates, capture. Writes `today.md` and
`pulse/<date>.json`. First real run 2026-09-14: 97 s, about $0.82, no permission denials. The
"Pulse now" button on the page runs the same thing on demand.

## Files it reads and writes

| File | Panel | Reads | Writes |
|---|---|---|---|
| `my-desk (now)/BOARD.md` | Now · Waiting (with ages and nudges) · Running · Board tab | yes | **never** |
| `my-desk (now)/PLAN.md` | Score tab: pace line, scoreboard, kill rules | yes | **never** |
| `my-desk (now)/today.md` | This morning (written by the pulse, when Evan presses Pulse now) | yes | no |
| `my-desk (now)/key-dates.md` | Countdown chips and the red chips in the week | yes | no |
| `my-desk (now)/capture.md` | Tell ROUX · Done · Draft nudge · Add to Jay batch · Draft a check-in · launch ticks · approval results · post approvals and send-backs | count | **appends** |
| `my-desk (now)/launches.md` | Launches tab and the Next launch tile | yes | **one checkbox per tick** (and its `· done <date>`) |
| `my-desk (now)/approvals.json` | Approvals tab and tile | yes | **status, note, resolved_at** on the item decided |
| `my-desk (now)/pulse/kill-lines.json` | Score tab, latest kill-line read (optional drop-in from the Thursday task) | yes | no |
| `my-files (knowledge)/hpc-reference/affiliates/affiliates.json` | Affiliates tab | yes | **yes**: atomic, last five versions in `backups/` |
| `…/affiliates/sales-by-affiliate.json` | Affiliates money columns and header tiles (Finn's drop-in) | yes | no |
| `…/affiliates/flags.json` | Affiliates evidence flags, top referrer, returning, the calc rate (drop-in) | yes | no |
| `…/affiliates/uppromote-import.json` | Paid column, Paid out and Approved tiles (Referrals export, commission by status), approved balance, UpPromote site / sign-up / socials / status, On UpPromote flag check | yes | **yes**, from an UpPromote export Evan made (.xlsx or CSV) |
| `my-inbox (new inputs)/*.xlsx`, `*.csv` | Offered for import on the Affiliates tab. Read, never moved | names | no |
| `my-work (outputs)/content/social/<Monday>-week/schedule.json` | Posts tab and tile, **through `live/post-scheduler/` only** | yes | **`approve()` only** |

Every write is a temp file plus rename, so a crash cannot leave half a file. Nothing is ever deleted:
affiliates are archived, approvals move to `archive/approvals.md` at wrap, backups rotate by rename.

The board parser keys on the H2 headings `/wrap` keeps fixed (Running · Now · Waiting on · Parked ·
Landmines · Numbers). If one goes missing, the page says so in red rather than guessing.

## Endpoints

All answer only to a localhost Host header. Every POST needs the page's own Origin or the `X-ROUX`
header, carries a JSON object of at most 64 KB (the UpPromote import alone allows an 8 MB file, sent as base64), and has each
field checked and length-capped on the server. A refusal comes back as `{error}` with 400, 403,
404, 409, 413 or 422, and the page shows the words.

| Route | Does |
|---|---|
| `GET /api/state` | Board, key dates, brief, and `desk`: the four home-tile counts |
| `GET /api/calendar` · `/api/events` (SSE) · `/api/runs` · `/api/recent` · `/api/files` · `/api/preview` · `/api/raw` · `/health` | as before |
| `POST /api/capture` | `{kind, text}`; kind is one of `""`, `Done`, `Undo`, `Approval`; text ≤ 600 |
| `POST /api/session` · `POST /api/run` | open a Claude session in Terminal · run the pulse (button only) |
| `GET /api/affiliates` | records joined at read time with sales, flags and the import; header totals; counts |
| `POST /api/affiliates/save` · `create` · `archive` · `contact` · `accept` | edit · add · archive or restore · last contact = today · accept a seed status suggestion. `save` takes `seen_updated_at` and refuses (409) if the record changed underneath |
| `POST /api/affiliates/checkin` | `{id, mode}`: `capture` leaves "Draft a check-in to … — Pete"; `session` opens a session that asks Pete. Sends nothing |
| `POST /api/affiliates/import` | `{from:"inbox", file}` or `{from:"upload", name, b64}` (or `text` for CSV), optional `kind` (`affiliates`, `referrals`, `approved_balance`). Parses .xlsx or CSV locally; keeps mapped columns only; reports the rest as unmapped |
| `GET /api/launches` · `POST /api/launches/tick` | `{line, raw, done}`; refused (409) if that line changed since the page read it |
| `GET /api/approvals` · `POST /api/approvals/resolve` | `{id, decision: approve, reject or reopen, note}`; a reject needs a note; a `live-write` becomes `queued`, never `approved` |
| `GET /api/posts` · `/api/posts/week?id=` · `/api/posts/media?week=&file=` | weeks · one week with preflight · media, served only via the scheduler's `mediaPath()` and only for files a piece lists |
| `POST /api/posts/approve` · `/api/posts/sendback` | `approve(week, piece, note, {via:'os'})`, refused for a non-draft or a piece failing preflight · a "Content note, … — Sage" capture line; the piece is left as it is |
| `GET /api/score` | PLAN.md's pace line, scoreboard and kill rules as written, plus the kill-line drop-in |

**For agents:** `node approvals.js add '<json>'` · `list` · `archive` (run from anywhere; never hand-edit
`approvals.json`). Formats for every file above: `my-files (knowledge)/how-this-brain-works.md`.

## Code

`server.js` (http, guard, routes, SSE file watch, capture, sessions) · `util.js` (atomic write,
rolling backup, input cleaning) · `board.js` (board parser) · `affiliates.js` (roster, sales / flags /
import join) · `uppromote.js` (CSV parser and tolerant column mapper) · `xlsx.js` (.xlsx reader on built-in zlib, no dependency) · `launches.js` · `approvals.js`
(queue + the agents' CLI) · `posts.js` (thin wrapper over `../post-scheduler`) · `score.js` ·
`md.js` (markdown to HTML; relative links become `obsidian://`) · `ics.js` (calendars, cached 5 min) ·
`public/` (one page, vanilla JS, one script per tab: `app.js`, `affiliates.js`, `launches.js`,
`approvals.js`, `posts.js`, `score.js`). Still one dependency: `node-ical`, pinned. After any change:
`launchctl kickstart -k gui/$(id -u)/com.roux.os`, then check `/health`.

**One thing to know when editing these files by tool:** write regex escapes such as `\u0000` or
`\uFEFF` through a script, not a direct file write. A direct write once turned them into raw control
bytes in `util.js` (2026-09-21); it still ran, and would have been a mess to debug.
