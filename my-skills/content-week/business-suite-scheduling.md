# Scheduling in Meta Business Suite — the browser procedure

**Read this before touching the composer.** Scheduling is a write to a live system. It happens only
after Evan has approved the specific piece in the current conversation, and only by scheduling —
never by publishing now — so every post can still be pulled from the Planner before it goes live.

## Where it lives

Business Suite is reached through **Claude in Chrome**. The Chrome profile signed in to Facebook has
access to the business portfolio and the Page. Verified read-only on 2026-09-16: Home, Content,
Planner and the composer all opened; nothing was typed or saved.

| Thing | Value | Source |
|---|---|---|
| Business portfolio (`business_id`) | `191493022516250` (Shopify Business Manager) | Business Suite URL, 2026-09-16 |
| Facebook Page (`asset_id`) | `100186835257740` — High Performance Cookers | Meta Ads connector `ads_get_user_pages` + Business Suite, 2026-09-16 |
| Instagram | `highperformancecookers`, connected to the Page in Business Suite | Business Suite header, 2026-09-16 |
| Followers | Facebook 21.9K · Instagram 5.1K | Business Suite Home, read 2026-09-16 |

⚠️ The Meta Ads connector returns **no Instagram account linked to the ad account** (`ads_get_ig_accounts`,
2026-09-16). That only affects boosting from the connector; organic scheduling through Business Suite
is unaffected. The Ads connector has no tool that creates organic posts, which is why this is a
browser job.

**URLs** (append `?asset_id=100186835257740&business_id=191493022516250` to each):

- Home — `https://business.facebook.com/latest/home`
- Planner (week view, scheduled items) — `https://business.facebook.com/latest/content_calendar`
- Content → published — `https://business.facebook.com/latest/posts/published_posts`
- Content → scheduled — `https://business.facebook.com/latest/posts/scheduled_posts`
- Composer (feed post) — `https://business.facebook.com/latest/composer`
- Reels and stories: use **Create reel** / **Create story** on Home; their composers differ.

## The composer, as observed 2026-09-16

Placement selector (Page + Instagram) · switch **"Customize post for Facebook and Instagram"** · the
text box ("Write into the dialogue box to include text with your post") · add photo/video · a
**Boost** switch · scheduling options below. Meta redesigns this often — if a control is not where
this says, use `find` to locate it by label, and if the UI fights back twice, stop and hand off
(standing rule). Never burn calls on retries.

## Procedure, one piece at a time

1. **Open the composer** for the right type (post / reel / story).
2. **Placements:** confirm both Facebook and Instagram are selected, or only the one the plan says.
3. **Media:** there is no file input in the page until *Add photo/video* is clicked, and a plain click
   opens a native dialog nobody can see. Paste `business-suite-helpers.js` first: it intercepts that
   click, exposes the input as `atlas-upload-input`, and `file_upload` uses its ref. A carousel is
   several files in one upload, in posting order (`_1-cover`, `_2-…`). Combined size under 10 MB per
   call; a larger video is Evan's upload, and the plan says so.
4. **Caption:** paste the Facebook caption. If the plan has a different Instagram caption, turn on
   *Customize post for Facebook and Instagram* and set each. Hashtags on Instagram only.
5. **Boost: OFF.** Always. Boosting is paid media — Maya's lane and Evan's click in Ads Manager.
6. **Scheduling options → Schedule:** set the date and the time from the plan, Central time. Check
   the composer's time zone reads the same.
7. **Click Schedule** (not Publish). Wait for the confirmation. Read the page text to confirm, then
   move to the next piece.
8. **Stories:** photo or video only; interactive stickers (poll, link) cannot be added when scheduling
   from Business Suite. If the plan wants a sticker, it says "Evan adds the sticker" or drops it.
9. **Reels:** *Create reel* → upload → caption → pick a cover frame if offered → Schedule. Facebook
   now treats every uploaded video as a reel.

## The proven recipe — first real run, 2026-09-16

Scheduling the Sept 21–27 week taught these. **Paste `business-suite-helpers.js` before anything
else**; it holds the parts that work by script. Everything below it is what must stay a real click.

**Feed post, about 3 browser calls once the recipe is loaded:**
1. Composer open → paste helpers → click *Add photo/video* (the helper captures the hidden file input)
   → `find "atlas-upload-input"` → `file_upload` to the **newest** ref (a carousel is all frames in one
   call, in posting order; order held on the Wednesday carousel).
2. `await __A({day, fb, ig})` does both captions, story-share off, schedule on, both dates.
3. **Real click on the story-share Confirm** if that dialog is still visible (it hangs half-faded and
   swallows typing). Its button sits at CSS px × 1.085 in screenshot coordinates on this Mac.
4. `find` the hours and minutes spinbuttons → **real click + type** each: `"05"` then `"30"`; `"A"`
   or `"P"` on the meridiem. JS focus and synthetic key events do not change them.
5. `await __go({date:'Sep 24, 2026', spins:'5,30,PM,5,30,PM', media:1, seg:'Word of Mouth Thursday.'})`
   checks every field and only then clicks Schedule. A failed check schedules nothing; that caught
   three wrong-time attempts on the first run.

**Moving between posts:** the Planner's *Create post* button opens a new composer without reloading,
so the helpers survive. A composer with unsaved content triggers a native "Leave site?" the browser
tool cannot dismiss, and closing that tab can hang: open a new tab instead. **Clicking an empty slot in
the Planner opens a blank composer**, not a status panel — cancel it.

**Stories:** *Create story* (`/latest/story_composer/`) → *Add photo/video* → *Schedule* toggle → one
date and time row per platform. No story-share switch, and times took real clicks without trouble.
`__pick` must run after the schedule rows render; on the Saturday story it failed twice and was handed
to Evan.

**Reels / video:** a 9.35 MB `.MOV` (7 s, H.264) through *Create post* sat on "Processing media" for
4+ minutes with no error, and the page stopped answering scripts. Not solved. Next time: export MP4,
try *Create reel*, and give it one attempt before handing it to Evan.

**Cost control:** read with scripts that return a few fields; screenshot only at scale 0.5 and only
when a check fails for a reason the fields can't show. Two failures on the same step = stop and hand off.

**Editing a scheduled post** (proven 2026-09-16, fixing the Wednesday carousel): Content → Scheduled →
click the row's caption → *Post details* panel → the **⋯ Actions** button → **Edit post** (never *Publish
now*, which sits next to it in the row dropdown). Facebook and Instagram are separate posts, edit each.
The editor keeps the date. To replace one carousel frame without dragging, remove that frame and every
frame after it, then upload the replacement plus the rest in order in one call. The footer button is still
*Schedule*; saving lands on the Published tab, so always read back in Scheduled that it did not publish.

## Verify — never say "scheduled" without this

**Content → Scheduled** (`/latest/posts/scheduled_posts`) is the cheapest read-back: one script
returns each feed post's segment, platform and time. Stories do not appear there; read them in the
**Planner week view** (`/latest/content_calendar?focus_time=<unix seconds in the week>`).
Open the **Planner week view** for the target week and read it back. Every piece appears with its
day and time. Record the read-back time in the plan's *After approval* table. Then open **Content →
Scheduled** and confirm the count matches. If anything is missing, it is written as *not scheduled*
with the reason — never left blank, never assumed.

## Guardrails

- Nothing is scheduled that Evan did not approve **in this conversation**. A yes covers that piece.
- Never *Publish now*. Even a post due in an hour is scheduled, so it stays pullable.
- Never edit, delete or reschedule an existing post Evan made by hand without asking.
- Boost is never turned on. No ad is created from here.
- Read-only until the approval lands: the Monday proposal run only reads Content and the Planner.
- If Chrome is unavailable, the deliverable is the **posting pack**: the numbered files, the
  captions and the times in `PLAN.md`, and a plain line saying scheduling could not be done. Evan
  can schedule by hand from the pack, as he did for Labor Day.

## What the Planner tells us

The week view carries a hint — *"This week, your Instagram followers are most active at this time"*
(read 2026-09-16, it said 4:00 PM for that Friday). **The weekly read was dropped by Evan,
2026-09-21: do not read it or note it.** After four weeks, compare the slot times in `weekly-format.md` against Insights and move a slot if
the data says so.
