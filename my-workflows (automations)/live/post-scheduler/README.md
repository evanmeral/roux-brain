# post-scheduler

The queue for HPC's weekly organic Facebook + Instagram posts. Built 2026-09-21 on Evan's call
("have Nova build a scheduler"; see `my-desk (now)/decisions.md`).

**It is a record and a gate. It never posts.** One `schedule.json` per content week says what is
going out, when, whether Evan approved it, and where it stands. `preflight` checks every piece. The
actual scheduling is still a Claude-in-Chrome session in Meta Business Suite, now run as a **runner**
that takes its orders from the manifest: `my-skills/content-week/business-suite-scheduling.md`.

No dependencies, no network, no credentials. Node 18+.

| File | What it is |
|---|---|
| `index.js` | The module. Reads and writes manifests, builds them from `PLAN.md`, runs preflight, guards the state machine. |
| `lint.js` | The copy rules. Each rule quotes the brain file it comes from. Reads prices from `what-we-sell.md`, competitor names from `competitors.md`, the hashtag bank from `weekly-format.md`. |
| `media.js` | Pixel sizes from PNG / JPEG / MP4 / MOV headers, and file hashes. |
| `cli.js` | The command line. |
| `test/` | `lint.test.js` (every rule, bad and clean captions) · `queue.test.js` (the gates, on a throwaway week in the temp folder, plus a scan that no file here can reach the network). |
| `API-OPTION.md` | Why this does not use Meta's Graph API. Verdict: not worth it. |

## Where a week lives

```
my-work (outputs)/content/social/<YYYY-MM-DD>-week/      week id = the Monday's date
  PLAN.md          what Evan reads. One ```schedule block per piece (fields: my-skills/content-week/plan-template.md)
  schedule.json    the manifest. Built from PLAN.md. Never typed by hand.
  01_MON-…png …    the media
```

## Commands

Run from the brain's root folder.

```bash
PS="my-workflows (automations)/live/post-scheduler/cli.js"
node "$PS" weeks                                   # every week on disk
node "$PS" build 2026-09-28 [--dry-run]            # PLAN.md → schedule.json (captions come from the plan's fences)
node "$PS" preflight 2026-09-28 [--quiet|--json]   # exit 1 on any ❌
node "$PS" status 2026-09-28                       # the queue, with read-backs
node "$PS" runnable 2026-09-28 [--json]            # what a scheduling session may take, and why not the rest
node "$PS" show 2026-09-28 4-feed                  # one piece, captions exactly as they will post
node "$PS" approve 2026-09-28 all --words "approved"           # records EVAN'S words; schedules nothing
node "$PS" mark 2026-09-28 4-feed queued                       # refuses if unapproved or failing preflight
node "$PS" mark 2026-09-28 4-feed scheduled --note "Your post is scheduled"
node "$PS" mark 2026-09-28 4-feed verified --source "Content → Scheduled, Sep 28 9:10 CT" --readback "Oct 1, 5:30 PM" --platform both
node "$PS" mark 2026-09-28 5-reel failed --note "Processing media hung twice"
node "$PS" mark 2026-09-28 5-reel scheduled --by Evan --note "uploaded by hand"
node "$PS" mark 2026-09-28 5-reel dropped --note "no footage by Thu noon"
node "$PS" waive 2026-09-21 1-feed patent-number --words "everything is good as is" --source "decisions.md 2026-09-21"
node "$PS" lint --field instagram "Any text you want to try against the copy rules"
node test/lint.test.js && node test/queue.test.js  # from this folder
```

## States

`draft → approved → queued → scheduled → verified`, or `failed` / `dropped`.

| Move | The tool insists on |
|---|---|
| → `approved` | `approve()` only. It stores who, when, the words, and a hash of the captions, files (by content), placements and time. |
| → `queued` | approved · preflight has no ❌ · under the 10 MB browser upload |
| → `scheduled` | came from `queued`, or `--by Evan` (he did it by hand), or `--backfill` with a note (a post scheduled before the manifest existed) |
| → `verified` | read-back evidence on record for every placement |
| → `failed`, `dropped` | a note with the reason |
| rebuild after a change | an approved piece whose content changed goes back to `draft`. A queued / scheduled / verified piece is **locked**: left as it is, and the difference is reported. |

## What preflight checks

Files exist · pixel size for the slot (feed and carousel 1080×1350, story and reel 1080×1920, from
creative rule 9) · a reel is a video, MP4 preferred · carousel frame order and count · combined
upload under 10 MB, otherwise **Evan uploads** · date inside the week, on the slot's day, in the
future, standing time (from `weekly-format.md`) · no two posts on the same surface at the same time ·
caption present and under Meta's limits (Facebook 63,206 characters; Instagram 2,200 and 30 hashtags) ·
segment name on line one · the copy rules · the approval still matches the content.

Levels: ✅ pass · `·` info · ⚠️ warn (a human looks) · 🟡 waived (an error Evan accepted, with his
words) · ❌ fail (blocks queueing).

**Copy rules** (`lint.js`; ❌ unless marked): `patent-pending` · `patent-number` ⚠️ (a preference since 2026-09-22) · `made-in-usa`
(and `#madeinusa`) · `american-made` ⚠️ · `we-make-the-pots` · `cast-aluminum` · `cast-word` ⚠️ ·
`competitor-name` · `yeti` · `warranty-5yr` (both qualifiers; never on steamer or commercial) ·
`hard-boil` · `hashtag-on-facebook` · `placeholder` (`[IF …]`, `{…}`, TODO) · `price-not-on-file` ·
`price` ⚠️ (lists every $ figure) · `krewe` ⚠️ · `fryer-with-crawfish` ⚠️ · `unqualified-number` ⚠️ ·
`160qt-consumer` ⚠️ · `link-in-bio-on-facebook` ⚠️ · `hashtag-count` ⚠️.

Limits, said plainly: the linter reads **words**. It reads the type on a graphic only where the
plan's `schedule` block lists it (`graphicText`, or `graphicTextFrom: "howto.json"`). It does not
judge a claim, a photo or a layout, and it never rewrites copy. A finding goes to Sage.

## The module, for the ROUX OS "Posts" panel

```js
const posts = require('../post-scheduler');     // from live/roux-os/
```

| Function | Returns |
|---|---|
| `listWeeks()` | `[{ id, from, to, dir, manifestPath, hasPlan, hasManifest, pieces, approved, counts: {draft: 7…}, updatedAt, error }]`, newest first. Never throws. |
| `getWeek(id)` | `{ week, from, to, timezone, dir, manifestPath, updatedAt, builtAt, days: [{date, day, pieces: [ids]}] ×7, pieces: [Piece + when, mediaAbs[], thumb] }`. Throws if there is no manifest. |
| `preflight(id)` | `{ week, ranAt, ok, referenceErrors[], summary: {pass, warn, fail, dropped}, pieces: [{ id, slot, type, status, approved, badge: 'pass'｜'warn'｜'fail'｜'dropped', runnable, manualUpload, checks: [{check, level, message, rule?, field?, source?}] }] }`. Pure read. |
| `approve(id, pieceId, note, opts?)` | `{ piece, preflight }`. `note` = Evan's words; may be `''` from the button (`opts.via` defaults to `'os'`). **Marks the manifest only. Schedules nothing.** Throws unless the piece is `draft`, `failed` or `approved`. |
| `setStatus(id, pieceId, status, opts?)` | the piece. `opts: { note, by: 'ROUX'｜'Evan', evidence: {source, platform, readBack, note}, backfill }`. Throws `REFUSED: …` on any rule in the States table. |
| also | `buildManifest(id, {dryRun})` · `addEvidence` · `addWaiver` · `mediaPath(id, file)` (absolute path, refuses to leave the week folder: use it to serve thumbnails) · `STATUSES` |

`id` is `"2026-09-28"` (or `"2026-09-28-week"`). Piece ids are `<slot>-<type>`: `1-feed`, `2-story`,
`3-carousel`, `5-reel`. All functions are synchronous and touch local files only. Writes are atomic
(temp file, then rename). For the panel: an Approve button should call `approve()` and nothing
else, and should be offered only on `draft` pieces; show `badge` and the ❌ / ⚠️ `checks` beside it.

### One piece in `schedule.json`

```json
{
  "id": "4-feed", "slot": 4, "segment": "Word of Mouth Thursday", "type": "feed",
  "placements": ["facebook", "instagram"],
  "media": ["04_THU-1001_FEED_review-robert-60qt-turkey.png"],
  "caption": { "facebook": "…", "instagram": "…" },
  "firstComment": null,
  "scheduledFor": { "date": "2026-10-01", "time": "17:30", "timezone": "America/Chicago", "iso": "2026-10-01T17:30:00-05:00", "epoch": 1790893800 },
  "approved": false,
  "approval": null,
  "status": "draft", "scheduledBy": null,
  "conditional": null, "alternates": [], "notes": ["…"], "commercial": false,
  "graphicText": [], "waivers": [], "evidence": [],
  "history": [{ "at": "…", "from": null, "to": "draft", "by": "build-manifest", "note": "built from PLAN.md" }]
}
```

Once approved: `"approval": { "by": "Evan", "at": "…", "recordedAt": "…", "via": "os"｜"chat", "words": "…", "contentHash": "…" }`.
Evidence entries: `{ "at", "source", "platform": "facebook"｜"instagram"｜"both", "readBack", "note" }`.
The file top level: `{ schema: 1, week, timezone, source: "PLAN.md", builtAt, createdAt, updatedAt, pieces: [] }`.

## Rules this tool holds to

- Only pieces Evan approved get queued. Always **Schedule**, never Publish now. Boost always off.
- Never the Meta Ads connector. Never a post Evan made by hand.
- No credentials, ever. Nothing here logs in, holds a token or calls Meta.
- The four never-automated things stay manual: spend, **publishing**, performance claims, customer PII.
  This tool queues and checks; a person approves, and the post itself goes out from Meta's scheduler.
