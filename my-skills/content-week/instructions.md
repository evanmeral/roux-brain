---
name: content-week
description: Plans one week of organic Facebook + Instagram content in a single Monday session — proposes the six standing slots with real previews, takes Evan's approval, schedules every approved piece in Meta Business Suite, then updates the board. Use when you hear "content week", "plan the week's posts", "what's going out this week", "/content-week", or when the Monday 8:00 scheduled task fires.
---

# Content week

**One Monday session, six posts, both platforms, scheduled before lunch.** Evan's ask, 2026-09-16:
the same format week to week so the page becomes something people check; he sees the plan and
a preview of every piece, approves, and the approved pieces get scheduled in Meta Business Suite.

Three files sit next to this one and are part of the skill:

| File | What it holds |
|---|---|
| `weekly-format.md` | The six slots, the rules, the rotation banks. **What** goes out and **when**. |
| `plan-template.md` | The exact shape of the weekly `PLAN.md` Evan reviews. |
| `business-suite-scheduling.md` | The browser procedure for scheduling, and the guardrails. |

This is **Sage's lane** (organic). Maya is not involved; nothing here is paid. Scout supplies the
weekend fixtures and new review verbatims. Nova fixes the pipeline if a render breaks.

---

## The three modes

**Propose** — Monday 8:00 CT by the scheduled task `content-week-monday`, or any time by `/content-week`.
**Approve** — Evan replies; fold his notes in, re-render only what changed.
**Schedule** — after approval, in the same conversation, one piece at a time, then verify and close.

If a `PLAN.md` for the target week already exists, do not start over: read it, check it against the
board (a promo that slipped, a shoot that moved), and present it for confirmation with any changes
called out. **If it is already scheduled**, do not re-propose it: report the read-back, list anything
marked *not scheduled* and whether Evan has handled it, and stop.

---

## Propose

### 1. Read, in this order

1. `my-business (context)/hpc-standing-rules.md` and `SAFETY.md` — the copy non-negotiables apply.
2. `my-business (context)/how-we-sound.md` — voice, banned words, the creative rules.
3. `weekly-format.md` — the slots and the banks.
4. `my-desk (now)/BOARD.md` — Running, Now, Landmines. **What is live or launching this week** is
   what the Offer slot may carry, and only if its condition is met (a kit gated on a landmine is not
   live). `my-desk (now)/key-dates.md` for anything landing inside the week.
5. `my-files (knowledge)/hpc-reference/seasonal-calendar.md` — the season line for the plan.
6. `my-work (outputs)/content/social/LOG.md` — what ran in the last four weeks. Nothing repeats
   inside that window.
7. The previous week's `PLAN.md` — anything Evan changed last time is the new default.
8. `my-files (knowledge)/hpc-reference/customer-language.md` — review verbatims.
9. `my-skills/hpc-ad-creative/assets/ASSET-INDEX.md` — what photos and cutouts exist; check
   `my-files (knowledge)/hpc-reference/shop-photos/` and Drive (`raw footage/`, Garrett's folder)
   for anything new.
10. **Business Suite, read-only** (Claude in Chrome, URLs in `business-suite-scheduling.md`):
    Content → published, last two weeks — what actually went out, including anything Evan posted by
    hand. Planner → anything already scheduled this week. (The "followers most active at" hint is no
    longer read: dropped by Evan, 2026-09-21.)
    If Chrome is not reachable, say so in the plan and carry on; the read is a courtesy, not a gate.

Ask Scout (or search) for the weekend's LSU and Saints fixtures with the source when the Game Day
slot is in season.

### 2. Fill up to six slots

Pick from the rotation banks in `weekly-format.md`. Match the week: a launch, a shoot day, a game, a
season turn. **Six is the ceiling, not a quota** (Evan, 2026-09-16) — drop a slot when the content is
not there, and say which one and why. Rules that decide ties:

- The Offer slot is a passenger (Thursday tail, Saturday story), one a week at most, live windows only.
  **Whether an offer is live comes from `my-desk (now)/PLAN.md` and the board, not from asking Evan**
  (Evan, 2026-09-21): if the plan has it live by the post, the kit line runs by default and comes out only
  if its go/no-go says no. Keep the plain version as the backup.
- A slot is never faked. No video means a raw Boil photo in Friday's place, said plainly.
- Shop Floor Tuesday always schedules **something** on Monday. If Evan sends a fresh photo by
  Tuesday 3:00 pm, swap the media on the scheduled post; the fallback is never left in by accident.
- Product facts from `what-we-sell.md` only. Prices re-checked in Shopify (read-only) the day the
  caption is written; cold organic usually carries none. Anything not on file is asked, not guessed.

### 3. Write the captions

Segment name first line. FB long-form, IG tight plus 5–8 hashtags from the bank. Second person,
short sentences, a real noun in every one. Run `stop-slop`. Then the claims pass from
`weekly-format.md` → *Before anything ships*.

### 4. Build the visuals

The render pipeline in `my-skills/hpc-ad-creative/work/creative/` (read its `instructions.md` once).

```bash
cd "my-skills/hpc-ad-creative/work/creative"
# singles — templates live one level down so assets resolve as ../../../../assets/
./build.sh templates/cw-<YYYY-MM-DD>/<slot>-4x5.html  1080x1350 "drafts/cw-<YYYY-MM-DD>/<slot>-4x5.png"
./build.sh templates/cw-<YYYY-MM-DD>/<slot>-9x16.html 1080x1920 "drafts/cw-<YYYY-MM-DD>/<slot>-9x16.png"
# the how-to carousel — one JSON config, text frames use "kind": "tip"
python3 carousel.py "<path>/howto.json"     # writes templates/<name>/frame-NN-*.html
./build-carousel.sh <name>                  # renders drafts/<name>/*.png
python3 check-centering.py drafts/<name>    # ⛔ never skip on product frames; nudge to ±50px
```

- Eyebrow on every graphic: `SEGMENT · DAY MM.DD`. Shield logo top-left, white on dark.
- Raw photo posts: crop only, no type, no logo. Story repost of a raw photo uses the blurred-cover
  band described in the ad-creative instructions, so a landscape photo is not cropped to a sliver.
- **Pre-flight every graphic** against the visual checks in `weekly-format.md`: product centred (measured), no gray box around a cutout, right pixel size for the slot, readable at phone size.
- **Look at every PNG** before it goes in the plan. Blank render, type touching product, a crop that
  misses the subject — obvious on sight, invisible in a log.
- Video: check duration and dimensions (`qlmanage` for a poster frame; there is no ffmpeg). Over
  10 MB is Evan's upload — say so in *Needs from Evan*.

### 5. Save the week

`my-work (outputs)/content/social/<YYYY-MM-DD>-week/` (the Monday's date):

```
PLAN.md                                    <- from plan-template.md
01_MON-0921_FEED_<slug>.png
02_TUE-0922_FEED_<slug>.png   02_TUE-0922_STORY_<slug>.png
03_WED-0923_CAROUSEL_1-cover.png … _N-<slug>.png   + howto.json
04_THU-0924_FEED_<slug>.png
05_FRI-0925_REEL_<slug>.mov
06_SAT-0926_STORY_<slug>.png
```

Numbered in posting order — Evan uploads by filename if he ever has to do it by hand. Approved
graphics also go through `./approve.sh` into the creative library (channel `organic`) after Evan's yes.

### 6. Present it

In chat, in this order, nothing before it: the week table, then each piece's preview (the image,
the FB caption, the IG caption, one line on why, the claims check), then *Needs from Evan*, then:

> **Reply `approved` to schedule all of these, or give me line notes by number.**

State anything missing and the fallback used. Never quiet a gap.

---

## Approve

Evan locks pieces, gives reasoned line notes, and sometimes reverts to an earlier version
(see the creative-review memory). Fold each note in without re-explaining, re-render **only** that
piece, update its status in `PLAN.md` (`approved` · `revised` · `dropped`), show the changed piece
again. A piece he does not mention is approved once he says "approved."

**Monday's own slot.** Approval before 11:00 keeps Monday's 12:00 post. Between 11:00 and 5:00 pm,
Monday's post moves to 5:30 pm. After 5:00 pm it goes back in the bank for next week — never
squeezed in.

---

## Schedule

Only after the approval, only the approved pieces, only in this conversation. Paste
`business-suite-helpers.js` first, then follow `business-suite-scheduling.md` exactly: one piece at a time, Boost off, **Schedule** never
Publish, then the Planner read-back. Fill the *After approval* table in `PLAN.md` with the time read
back for every piece, or *not scheduled: reason*.

If Chrome is unavailable or the UI fights back twice, stop. The deliverable becomes the posting
pack (files + captions + times, which `PLAN.md` already is) and a plain line saying scheduling did
not happen and why.

---

## Close

1. **`LOG.md`** in `my-work (outputs)/content/social/` — one line per scheduled piece: date · slot ·
   angle · file · status. This is the rotation memory.
2. **The board** — under Running: `Content week <dates> — N/6 scheduled in Business Suite · next
   planning Mon <date> 8:00`. Anything Evan owes (a photo, a video) goes in Waiting on. A format
   change goes to `decisions.md` and `weekly-format.md`'s change log.
3. **`key-dates.md`** — only if a piece depends on a date that drives other work.
4. **Approved graphics** → `./approve.sh drafts/… <product> <angle> organic "<note>"`.
5. Run `/wrap` if the session is ending; it commits.

---

## Never

- Schedule, publish, boost or edit anything in Business Suite without Evan's approval of that piece
  in this conversation. Reads are free.
- Say "scheduled" without the Planner read-back.
- Invent a fixture, a review, a price or a stat. Every figure is qualified and sourced.
- Touch email, SMS or Klaviyo (Biljana's lane) or paid ads (Maya, and Evan's click).
- Use `#madeinusa`, "hard boil," "cast," a competitor's name, or "Yeti."
