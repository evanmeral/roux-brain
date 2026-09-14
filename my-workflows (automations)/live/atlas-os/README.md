# Atlas OS

Evan's daily cockpit. A local page at **http://localhost:4242** that reads the brain's files and
shows the day: the time, the week, what is due, what is waiting on Evan, what is live and spending,
and what the brain found this morning. Spec: `../../specs/2026-09-14-atlas-os-plan.md`.

**It never writes `BOARD.md`.** The only brain file it writes is `my-desk (now)/capture.md`
(the Tell Atlas box and the Done buttons), which `/prime` reads and `/wrap` folds into the board.
It holds no Shopify, Meta or Google credentials and cannot reach them.

## Run

- **As a login item (normal):** `./install.sh` once. launchd starts it at login and restarts it if
  it dies. Logs in `logs/`. Remove with `./uninstall.sh`.
- **By hand:** `node server.js` in this folder.
- **As a dock app:** open http://localhost:4242 in Safari, then File → Add to Dock. It gets its own
  window and icon.

## Configure

- `config.json` — port, timezone, rhythm labels, quick links, the Meta daily ceiling (with source).
- `config.local.json` — **not committed.** The two Google Calendar secret iCal addresses. Read-only
  by design; reset them in Google Calendar settings if one ever leaks. The page picks up edits on
  its own.

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
