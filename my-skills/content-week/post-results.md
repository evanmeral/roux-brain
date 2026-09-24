# Read post results (runbook)

**What it does:** reads how each organic FB/IG post did after it ran and puts the numbers on the
ROUX OS Planner and Posts cards. Sage reads them before proposing the next week.
**When:** only when Evan presses **Read post results** in ROUX OS (Planner or Posts). No scheduled task.
**Approved:** proposal `p-2026-09-24-post-results` (Evan, 2026-09-24).

## Why Business Suite and not the connector

Nova tested the Meta Ads connector on 2026-09-24. It cannot read organic results:

- `ads_get_ig_accounts` returns `[]` for HP Cookers ADs (4392736013287) and Roux Meral. With no IG
  account, `ads_get_ig_media` cannot be called. It lists promotable media anyway, not results.
- There is no tool that reads a Facebook Page post. `ads_get_user_pages` gives the Page ID and nothing more.
- `reach`, `post_shares` and `page_engagement` count ad delivery only. `post_saves`, `post_comments`,
  `post_reactions` and `organic_reach` are unknown fields.

So the read goes through **Business Suite in Chrome**, read-only, the same way the scheduling runner
reads back the Planner. If the connector ever gains an organic read, switch to it and update this file.

## Hard rules

- **Read only.** Open no composer, no Edit panel and no Boost. Change no setting. Turning on Facebook
  story insights is Evan's call, not the session's.
- **Never write a 0 for a number you did not read.** Business Suite shows `‑‑` for "not reported".
  Leave that field out, or write `null`.
- A feed you could not read goes in `feeds` with `ok: false` and the reason in plain words. The page
  shows it in red.

## Steps

1. Open `https://business.facebook.com/latest/posts/published_posts?asset_id=100186835257740&business_id=191493022516250`
   (Content → Posts & reels → Published, Last 90 days).
2. The table scrolls sideways and only draws the columns on screen. Scroll it right once, then read
   the page text. Each row lists, after the date: Reach, Views, Viewers, Follows, Interactions,
   Likes and reactions, Comments, Shares, Saves, Link clicks, Watch time, Avg play time,
   3-second views, Earnings. The icon on the thumbnail, or the account name, gives the platform:
   `highperformancecookers` = Instagram, `High Performance Cookers` = Facebook. A **Crossposted**
   row gives one combined number for both. Skip it; it cannot be split.
3. Take every row from the Monday of the oldest week that has a `schedule.json` in
   `my-work (outputs)/content/social/`.
4. Stories: Content → Stories → Active and Archived. If they read "No activity", set
   `stories.ok: false` with that reason.
5. Write the rows to the session scratchpad in the shape given at the top of
   `my-workflows (automations)/live/roux-os/post-results.js`. `published` is Central time, 24-hour,
   `YYYY-MM-DD HH:MM`.
6. Run `node "my-workflows (automations)/live/roux-os/post-results.js" write <file>`. It matches each
   row to a piece by platform, post or story, and a time within 10 minutes. It writes
   `my-desk (now)/pulse/post-results.json`, and the page updates by itself.
7. Report in plain words: how many matched, anything the script lists as "unmatched" or
   "ran but not found", and every feed that could not be read. Before you name a cause for a missing
   post, check it in Business Suite.

Numbers are Business Suite's own. Report them as read ("Business Suite shows 213 reach"). A
conclusion such as "the carousel underperformed" is Sage's or Beau's call, and it is written as a
conclusion.
