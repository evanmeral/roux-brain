# Atlas OS

Evan's daily cockpit. A local page at **http://localhost:4242** that reads the brain's files and
shows the day: the time, the week, what is due, what is waiting on Evan, what is live and spending,
and what the brain found this morning. Spec: `../../specs/2026-09-14-atlas-os-plan.md`.

**It never writes `BOARD.md`.** The only brain file it writes is `my-desk (now)/capture.md`
(the Tell Atlas box and the Done buttons), which `/prime` reads and `/wrap` folds into the board.
It holds no Shopify, Meta or Google credentials and cannot reach them.

## Run

- **As a login item (normal):** `./install.sh` once. It builds `~/Applications/Atlas OS.app`
  (a tiny launcher that hosts the node server) and registers two launchd jobs: the server
  (starts at login, restarts if it dies) and the 6:30 pulse (a `curl` to the running server,
  which runs `pulse.sh` under the app's own Desktop grant). Logs in `logs/`. Remove with
  `./uninstall.sh`.
- **One-time macOS step:** the vault lives in `~/Desktop`, which macOS protects. The launcher
  checks it can read the vault before doing anything. If it cannot, it shows one dialog with an
  Open Settings button (System Settings → Privacy & Security → Files and Folders → Atlas OS →
  Desktop Folder) and exits; `install.sh` registers nothing with launchd in that case, so there
  is never a relaunch loop. Grant access, then run `./install.sh` again. launchd relaunches the
  server only while the grant marker at `~/Library/Application Support/AtlasOS/granted` exists;
  the launcher writes it on a successful start and removes it when macOS refuses.
- **Request guard:** the server answers only requests with a localhost Host header, and accepts a
  POST only from the page itself (same-origin) or with an `X-Atlas` header (the 6:30 curl). A web
  page in the browser cannot reach the write endpoints.
- **By hand:** `node server.js` in this folder.
- **As a dock app:** open http://localhost:4242 in Safari, then File → Add to Dock. It gets its own
  window and icon.

## Configure

- `config.json` — port, timezone, rhythm labels, quick links, the Meta daily ceiling (with source).
- `config.local.json` — **not committed.** The two Google Calendar secret iCal addresses. Read-only
  by design; reset them in Google Calendar settings if one ever leaks. The page picks up edits on
  its own.

## The 6:30 pulse

`.claude/commands/pulse.md` is the prompt; `pulse.sh` runs it headless (`claude -p`, Sonnet 5 by
default, `ATLAS_PULSE_MODEL` overrides) and logs to `runs.log`. Reads only: Meta (HP Cookers ADs),
Shopify (ShopifyQL), both calendars, the board, key dates, capture. Writes `today.md` and
`pulse/<date>.json`. First real run 2026-09-14: 97 s, about $0.82, no permission denials. The
"Pulse now" button on the page runs the same thing on demand.

## Files it reads

| File | Panel |
|---|---|
| `my-desk (now)/BOARD.md` | Now · Waiting on you · Running · the Board tab |
| `my-desk (now)/today.md` | This morning (written by the 6:30 routine) |
| `my-desk (now)/key-dates.md` | Countdown chips and the red chips in the week |
| `my-desk (now)/capture.md` | Line count in the status bar |

The board parser keys on the H2 headings `/wrap` keeps fixed (Running · Now · Waiting on · Parked ·
Landmines · Numbers). If one goes missing, the page says so in red rather than guessing.

## Code

`server.js` (http, SSE file watch, capture) · `board.js` (board parser) · `md.js` (markdown to
HTML, relative links become `obsidian://` links) · `ics.js` (calendar feeds via node-ical, cached
5 min) · `public/` (one page, vanilla JS). One dependency: `node-ical`, pinned.
