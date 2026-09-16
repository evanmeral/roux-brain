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
3. **Media:** locate the file input with `find` ("file input" / "upload") and use the **`file_upload`
   tool with its ref**. Never click the upload button — it opens a native dialog nobody can see. A
   carousel is several files in one upload, in posting order (`_1-cover`, `_2-…`). Combined size
   under 10 MB per call; a larger video is Evan's upload, and the plan says so.
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

## Verify — never say "scheduled" without this

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
(read 2026-09-16, it said 4:00 PM for that Friday). Read it every Monday and note it in the plan.
After four weeks, compare the slot times in `weekly-format.md` against Insights and move a slot if
the data says so.
