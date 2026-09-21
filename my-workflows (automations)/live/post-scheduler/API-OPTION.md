# Scheduling through Meta's Graph API instead of Chrome — assessment

**Written 2026-09-21 by Nova. Status: not built, not recommended. No code in this folder calls Meta.**

## Verdict

**Not worth it at six posts a week.** The API can schedule the **Facebook** half on Meta's servers.
It cannot schedule the **Instagram** half at all: Instagram's publishing API has no scheduling, so
something has to call it at the minute the post goes live, from a machine that is awake, with the
image converted to JPEG and sitting at a public URL. Business Suite schedules both platforms from
one composer and lets the Mac sleep. Splitting the week into "Facebook by API, Instagram by Chrome"
would double the work, not halve it.

**Look again if** Meta adds a scheduled-publish field to Instagram's API (check the changelog linked
below), or the volume goes well past a post a day, or the Chrome runner fails two weeks running.

## How these facts were checked

Read from Meta's developer docs on 2026-09-21 by a research agent, through a fetch tool that
summarizes pages. So the values below are as that tool reported them, not text Nova read line by
line. **Spot-check any value before writing code against it.** Anything marked *unconfirmed* could
not be verified on a Meta page. Current Graph API version: v26.0, released 2026-07-29
([changelog](https://developers.facebook.com/docs/graph-api/changelog)).

## Facebook Page — can be scheduled at Meta (the Mac can be asleep)

| What | Finding | Source |
|---|---|---|
| Feed post | `published=false` + `scheduled_publish_time` (Unix seconds or ISO 8601). | [Pages API: posts](https://developers.facebook.com/docs/pages-api/posts) |
| How far ahead | **Meta's own pages disagree:** the guide says 10 minutes to 30 days; the `/page/feed` reference says 10 minutes to 75 days. Treat 29–30 days as the ceiling. | guide above · [page/feed reference](https://developers.facebook.com/docs/graph-api/reference/page/feed/) |
| Single photo | `/{page-id}/photos` takes `published=false`, `scheduled_publish_time`, `unpublished_content_type=SCHEDULED`. A local file can be uploaded directly (multipart `source`); no public URL needed. | [page/photos reference](https://developers.facebook.com/docs/graph-api/reference/page/photos/) |
| Multi-photo (our carousel) | Upload each photo unpublished, then post to `/feed` with `attached_media[]` and the three scheduling fields. `temporary=true` uploads last about 24 hours and cannot carry a schedule time, so a post days out needs non-temporary uploads (*that last step is Nova's inference, unconfirmed*). ⚠️ A developer-forum thread reports scheduled multi-photo calls failing with OAuthException code 1 in Oct 2025 while publish-now worked; no Meta reply, fix *unconfirmed*. | same reference · [community thread](https://developers.facebook.com/community/threads/704907595313769/) |
| Reel | `/{page-id}/video_reels`, `video_state=SCHEDULED` + `scheduled_publish_time`, more than 10 minutes and within 29 days. Local file upload to `rupload.facebook.com`. 3–90 s, 9:16. 30 API reels per 24 h. | [Reels publishing](https://developers.facebook.com/docs/video-api/guides/reels-publishing) |
| **Story** | **No scheduling documented.** `/photo_stories` and `/video_stories` publish now. | [Page Stories API](https://developers.facebook.com/docs/page-stories-api) |
| Read-back | `GET /{page-id}/scheduled_posts` with a Page token. | [page/scheduled_posts](https://developers.facebook.com/docs/graph-api/reference/page/scheduled_posts/) |
| Permissions | `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`; a Page token from someone with the CREATE_CONTENT task. `business_management` only if a system user is used. | photos reference · Stories API page |

## Instagram — cannot be scheduled by API

| What | Finding | Source |
|---|---|---|
| **Scheduling** | **None.** The container endpoint `/{ig-user-id}/media` has no schedule field, and the 2025–June 2026 changelog has no scheduling entry. You create a container, then call `media_publish` **at the moment it should go live.** | [ig-user/media](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media) · [IG changelog](https://developers.facebook.com/docs/instagram-platform/changelog) |
| Containers expire | After 24 hours unpublished → `EXPIRED`. They cannot be built on Monday for Thursday. | [Content publishing](https://developers.facebook.com/docs/instagram-platform/content-publishing) |
| Where the media lives | Meta fetches it: images must be at a **public URL** at publish time. Only video/reels have a direct (resumable) upload. | same |
| Format | **JPEG only. PNG is not supported.** Every graphic we render is a PNG. Feed ratio 4:5 to 1.91:1, 8 MB max. Carousel max 10. Stories and reels are supported types. | same · ig-user/media |
| Rate limit | Docs disagree: the guide says 100 API posts per rolling 24 h; the limit endpoint's example shows 50. Either is far above our six. | guide · [content_publishing_limit](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/content_publishing_limit) |
| First comment | Possible: `POST /{ig-media-id}/comments`, needs `instagram_manage_comments`. | [ig-media/comments](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-media/comments) |
| Permissions | `instagram_basic`, `instagram_content_publish`, `pages_read_engagement` (Facebook Login route). | Content publishing guide |

**What that means for us, plainly:**

1. **The Mac must be awake** at 12:00, 5:30 pm and Saturday 9:00 am, or the Instagram post does not
   go out. A launchd job on a laptop is not that. A cloud job would be, and then the token lives in
   the cloud.
2. **Every image needs a public URL.** The obvious host is Shopify Files. That is a **Shopify write**,
   which needs Evan's yes each time under the standing rules: six to fourteen yeses a week, to save
   six Chrome runs.
3. **Every PNG needs converting to JPEG** before it goes up. A second copy of every approved graphic.
4. It would still **publish**, not schedule. Today a scheduled post can be pulled from the Planner
   until the minute it goes live. An API publish at noon is live at noon.

## App setup, review, tokens

| What | Finding | Source |
|---|---|---|
| App type and review | A **Business app on Standard Access**, used only by people with a role on the app, needs no App Review and no Business Verification when it serves only your own Page and Instagram account. | [Access levels](https://developers.facebook.com/docs/graph-api/overview/access-levels) · [IG platform overview](https://developers.facebook.com/docs/instagram-platform/overview) |
| ⚠️ Development mode | The app-modes page says content made by a Development-mode app is visible to role users only. So the app probably has to be switched to **Live** (needs a privacy policy URL, *unconfirmed*), still on Standard Access. The Pages overview says Page permissions need App Review "when your app goes live", which contradicts the access-levels page for a role-users-only app. **Unresolved; only a test post viewed from a logged-out browser would settle it.** | [App modes](https://developers.facebook.com/docs/development/build-and-test/app-modes) · [Pages overview](https://developers.facebook.com/docs/pages-api/overview) |
| Data Use Checkup | Annual; not required for Development mode or Standard-Access-only apps. | [Data Use Checkup](https://developers.facebook.com/docs/development/maintaining-data-access/data-use-checkup) |
| Token lifetimes | Short-lived user token ~1–2 h. Long-lived ~60 days. A **Page token taken from a long-lived user token has no expiry date**, but dies on a password change, logout, app removal or a security event. | [Access tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens) · [Long-lived tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived) |
| System user token | A Business-portfolio system user can hold a non-expiring token with `pages_manage_posts` + `instagram_content_publish`. The business must own the app; Standard Access allows one admin system user. Whether a pages-only app can be installed on a system user without Ads Management standard access is *unconfirmed*. | [System users](https://developers.facebook.com/docs/marketing-api/system-users/overview) · [Generate tokens](https://developers.facebook.com/docs/marketing-api/system-users/install-apps-and-generate-tokens) |
| Checking a token | `GET /debug_token` returns `expires_at` and `data_access_expires_at`; the Access Token Debugger in the developer tools shows the same. | Access tokens: debugging |

Business Suite's own limits (20 minutes minimum lead, about 29–30 days ahead in practice, 75 days
officially) are from third-party blogs only; Meta's Help Center pages would not load. *Unconfirmed.*
Preflight therefore does not enforce a maximum.

## If Evan ever wants it anyway (Facebook only)

The rule stands: **ROUX and Nova never create a Meta app, never generate, see, paste or store a
token, and never log in.** Evan would do all of this himself, about 30–45 minutes, once:

1. developers.facebook.com → log in as the person who admins the HPC Page → **My Apps → Create App** →
   use case *Other* → type **Business** → name it (e.g. "HPC Post Scheduler") → attach it to the
   **Shopify Business Manager** portfolio (`191493022516250`).
2. In the app: **App settings → Basic** → add a privacy policy URL (the store's policy page) → save.
   Leave the app on **Standard Access**. Do not submit anything for App Review.
3. business.facebook.com → **Settings → Users → System users → Add** → name it, role **Admin**.
4. Select that system user → **Assign assets** → Pages → *High Performance Cookers* → turn on
   **Create content** only. (Not ads, not settings.)
5. Same screen → **Generate token** → pick the app → expiry **60 days** (safer than never) → tick
   `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`, `business_management` → Generate.
6. Copy the token **once** into a new file `post-scheduler/config.local.json` as
   `{"facebook": {"pageId": "100186835257740", "pageToken": "<paste>"}}`. Never into chat, never into
   a brain file. Nova adds `config.local.json` to `.gitignore` **before** step 6, and the code would
   read it from there only.
7. Tell Nova it is there. Nova would then build `api.js` (it does not exist today): Facebook feed,
   photo, multi-photo and reel only; off unless `config.json` says `"api": {"enabled": true}`; refuses
   any piece that is not `approved` with a clean preflight; refuses to run without `--live`; always
   `published=false` with a schedule time, never publish-now; reads `/scheduled_posts` back and
   writes it to the manifest as evidence. First run on one post, checked from a logged-out browser.
8. Every 60 days: repeat step 5 and replace the token in the file.

Instagram, and Facebook stories, would still go through Chrome. **That is why the answer is no.**

## Why there is no `api.js` skeleton in this folder

The brief said to include one only if the API was worth it. It is not, so there is no code here that
could post, switched off or otherwise. The manifest already carries what an API layer would need
(`scheduledFor.epoch`, ordered `media`, per-platform captions, `approved`, the preflight gate), so
adding one later is a contained job.
