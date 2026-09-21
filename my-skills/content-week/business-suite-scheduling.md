# Scheduling in Meta Business Suite — the runner

**Read this before touching the composer.** Scheduling is a write to a live system. The session is a
**runner**: it does not decide what goes out. It reads the week's manifest, takes only the pieces
Evan approved that pass preflight, schedules them in order, and writes what happened back to the
manifest after every piece. Always **Schedule**, never Publish now, so every post can still be pulled
from the Planner before it goes live.

Evan chose this over scheduling by hand, 2026-09-21 (`decisions.md`). The queue, the preflight and
the record live in `my-workflows (automations)/live/post-scheduler/` (its README has every command).

```bash
PS="my-workflows (automations)/live/post-scheduler/cli.js"     # run from the brain's root folder
```

## The manifest decides, not the chat

`my-work (outputs)/content/social/<Monday>-week/schedule.json` — one entry per piece, built from
`PLAN.md` by `node "$PS" build <week>`. A piece moves
`draft → approved → queued → scheduled → verified`, or to `failed` / `dropped`.

- **Approval is Evan's.** He presses Approve in ROUX OS, or says it in chat and the session records
  his exact words: `node "$PS" approve <week> <piece|all> --words "<what he said>"`. The session
  never approves on his behalf, and never for a piece he did not mention or cover with "approved."
- **An approval covers the content it was given for.** If a caption, a file or a time changes
  afterwards, preflight fails that piece and `build` sends it back to draft. It needs Evan again.
- The tool **refuses** to queue an unapproved piece, a piece that fails preflight, or a piece over
  the 10 MB browser upload. It refuses `verified` without a read-back for every placement. Do not
  hand-edit `schedule.json` to get round a refusal. A refusal is the tool working.

## The run

**0. Before Chrome.** No browser calls until this is clean.

```bash
node "$PS" build <week>            # only if PLAN.md changed since the last build
node "$PS" preflight <week>        # show Evan every ❌ and ⚠️ , verbatim
node "$PS" runnable <week> --json  # `take` = what this session may schedule, in order · `skip` = why not
```

- A ❌ on the copy rules goes to **Sage** to fix the words, then rebuild and Evan re-approves.
  The runner never rewrites a caption. A finding Evan accepts as it stands is recorded with
  `node "$PS" waive <week> <piece> <rule> --words "<what he said>"`, never waved through quietly.
- `take` empty → stop and say why (usually: nothing approved yet).
- A piece in `skip` as *over 10 MB — Evan uploads*: tell him now, with the file name, the date and
  time, and the captions (`node "$PS" show <week> <piece>`). When he has done it:
  `node "$PS" mark <week> <piece> scheduled --by Evan --note "uploaded by hand"`, then verify it in
  step 3 like the rest.

**1. Open Business Suite, paste `business-suite-helpers.js` once.**

**2. For each piece in `take`, in order:**

| Step | What | How |
|---|---|---|
| a | Queue it | `node "$PS" mark <week> <piece> queued` (runs preflight again; a refusal means skip it) |
| b | Open the right composer | feed / carousel: *Create post* · story: *Create story* · reel: *Create reel* |
| c | Load the piece | `__load(<that entry of take>)` → returns the date, the time to type, the file count |
| d | Upload | click *Add photo/video* → `find "roux-upload-input"` → `file_upload` the piece's `media` paths to the **newest** ref, all frames of a carousel in one call, in the listed order |
| e | Fill | `await __A()` → both captions from the manifest, story-share off, **Boost off**, schedule on, both dates. Every field must come back `ok` / `false` / `off` and the right date |
| f | Time | **real click + type** on each spinbutton, the values `__A` printed (`"05"`, `"30"`, `"P"`). JS cannot set these |
| g | Schedule | `await __go()` → re-checks captions (exact match to the manifest), dates, times, file count, story-share off, Boost off, no hashtag on Facebook, **then** clicks the button labelled exactly *Schedule*. Any failed check returns `NOT_SCHEDULED` and clicks nothing |
| h | Record | success → `node "$PS" mark <week> <piece> scheduled --note "<the result text __go returned>"` |

If the story-share Confirm dialog hangs half-faded, finish it with a real click (its button sits at
CSS px × 1.085 in screenshot coordinates on this Mac), then re-run `__A`.

**Two strikes, per piece.** The first UI failure on a piece (a control missing, `NOT_SCHEDULED`,
`no cell`, a hang): try that step once more. The second failure on the same piece:

```bash
node "$PS" mark <week> <piece> failed --note "<which step, what the page said>"
```

…then move to the next piece. Never a third try, never a workaround, never *Publish now*. Open a
new tab if a composer is stuck (a composer with content raises a native "Leave site?" the browser
tool cannot dismiss). At the end, tell Evan plainly which pieces failed and hand him the posting
pack for them: file, date, time, captions.

**3. Verify — never say "scheduled" without this.**

- Feed, carousel, reel: open **Content → Scheduled**, run `__match(<the week's non-story pieces>)`.
  For each piece with `allFound: true`:
  `node "$PS" mark <week> <piece> verified --source "Content → Scheduled, <date time> CT" --readback "<the when it returned>" --platform both`
  ⚠️ `__readScheduled` / `__match` were written 2026-09-21 without opening Business Suite. On their
  first run, check their rows against the page text (`get_page_text`) before marking anything.
- Stories are not in that list. Read the **Planner week view**
  (`/latest/content_calendar?focus_time=<unix seconds in the week>`; the piece's
  `scheduledFor.epoch` works) and record what it shows the same way, `--source "Planner week view"`.
- A piece that was scheduled but cannot be found: `mark … failed --note "scheduled, but not in the
  read-back"`, and tell Evan. Never assumed.
- Finish with `node "$PS" status <week>` and paste it into the plan's *After approval* table.

## Where it lives

Business Suite is reached through **Claude in Chrome**. The Chrome profile signed in to Facebook has
access to the business portfolio and the Page. The runner never logs in, never handles a password
or a token. If Chrome shows a login page, stop and tell Evan.

| Thing | Value | Source |
|---|---|---|
| Business portfolio (`business_id`) | `191493022516250` (Shopify Business Manager) | Business Suite URL, 2026-09-16 |
| Facebook Page (`asset_id`) | `100186835257740` — High Performance Cookers | Meta Ads connector `ads_get_user_pages` + Business Suite, 2026-09-16 |
| Instagram | `highperformancecookers`, connected to the Page in Business Suite | Business Suite header, 2026-09-16 |
| Followers | Facebook 21.9K · Instagram 5.1K | Business Suite Home, read 2026-09-16 |

⚠️ The Meta Ads connector returns **no Instagram account linked to the ad account** (`ads_get_ig_accounts`,
2026-09-16), and has no tool that creates an organic post. **Organic never goes through the Ads
connector.** Its write rules are strict and none of them cover this.

**URLs** (append `?asset_id=100186835257740&business_id=191493022516250` to each):

- Home — `https://business.facebook.com/latest/home`
- Planner (week view, scheduled items) — `https://business.facebook.com/latest/content_calendar`
- Content → published — `https://business.facebook.com/latest/posts/published_posts`
- Content → scheduled — `https://business.facebook.com/latest/posts/scheduled_posts`
- Composer (feed post) — `https://business.facebook.com/latest/composer`
- Story composer — `https://business.facebook.com/latest/story_composer/`
- Reels: **Create reel** on Home; its composer differs.

## What the UI taught us (first real run, 2026-09-16)

Meta redesigns the composer often. If a control is not where this says, use `find` to locate it by
label. That counts as the one retry.

- **Composer:** placement selector (Page + Instagram) · the switch *Customize post for Facebook and
  Instagram* · the text box · add photo/video · a **Boost** switch · scheduling options below.
- **Media:** there is no file input in the page until *Add photo/video* is clicked, and a plain click
  opens a native dialog nobody can see. The helper intercepts that click and exposes the input as
  `roux-upload-input`. Combined size under 10 MB per call (preflight checks it).
- **Times** only accept real clicks + typing. JS focus and synthetic key events do not change them.
  `__go`'s check caught three wrong-time attempts on the first run.
- **Moving between posts:** the Planner's *Create post* button opens a new composer without
  reloading, so the helpers survive. **Clicking an empty slot in the Planner opens a blank
  composer**, not a status panel — cancel it.
- **Stories:** *Create story* → *Add photo/video* → *Schedule* toggle → one date and time row per
  platform. No story-share switch, no caption. `__load` then `__pick(0)` / `__pick(1)` set the dates
  **after the schedule rows render**; on the Sept 26 story it failed twice and went to Evan. Set the
  times by real clicks, then `__checkStory()`: only when it returns `ready: true`, real-click the
  button labelled exactly *Schedule*.
  Interactive stickers (poll, link) cannot be added when scheduling: the manifest note says "Evan
  adds the sticker", or the plan drops it.
- **Reels / video:** a 9.35 MB `.MOV` (7 s, H.264) through *Create post* sat on "Processing media"
  for 4+ minutes with no error, and the page stopped answering scripts. Not solved. Export MP4 (preflight
  warns on anything else), use *Create reel*, and give it **one** attempt before handing it to Evan.
- **Cost control:** read with scripts that return a few fields; screenshot only at scale 0.5 and only
  when a check fails for a reason the fields cannot show.

**Editing a scheduled post** (proven 2026-09-16, fixing the Wednesday carousel). Only on Evan's go
for that edit, and only a post the runner scheduled: Content → Scheduled → click the row's caption →
*Post details* → the **⋯ Actions** button → **Edit post** (never *Publish now*, which sits next to it
in the row dropdown). Facebook and Instagram are separate posts, edit each. The editor keeps the
date. To replace one carousel frame without dragging, remove that frame and every frame after it,
then upload the replacement plus the rest in order in one call. The footer button is still
*Schedule*; saving lands on the Published tab, so always read back in Scheduled that it did not
publish. The manifest locks a scheduled piece, so record the edit with
`node "$PS" evidence <week> <piece> --source … --readback … --note "edited: <what>"`.

## Guardrails

- Nothing is scheduled that Evan did not approve. The manifest holds his words and the hash of what
  he approved; the tool refuses the rest.
- Never *Publish now*. Even a post due in an hour is scheduled, so it stays pullable.
- **Boost is never turned on.** No ad is created from here. Boosting is paid: Maya's lane, Evan's click.
- Never edit, delete or reschedule a post Evan made by hand. If the read-back shows a post that is
  not in the manifest, it is his. Leave it alone and mention it.
- Never through the Meta Ads connector. Never a login, a password or a token.
- Read-only until the approval lands: the Monday proposal run only reads Content and the Planner.
- If Chrome is unavailable, the deliverable is the **posting pack**: the numbered files, and the
  captions and times in `schedule.json` / `PLAN.md`, and a plain line saying scheduling could not be
  done. Evan can schedule by hand from the pack, as he did for Labor Day. Mark what he schedules
  with `--by Evan`.

## What we do not read

The Planner's *"your followers are most active at"* hint: **dropped by Evan, 2026-09-21. Do not read
it or note it.** After four weeks, compare the slot times in `weekly-format.md` against Insights and
move a slot if the data says so.

## Not used: the Graph API

Assessed 2026-09-21 in `my-workflows (automations)/live/post-scheduler/API-OPTION.md`. Short
version: Facebook could be scheduled by API, Instagram cannot (no native scheduling, JPEG at a
public URL, the Mac awake at post time). Not worth it at six posts a week. Nothing here uses it.
