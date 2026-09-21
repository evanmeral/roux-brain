# Content week — Mon {MON_DATE} to Sun {SUN_DATE}

**Proposed:** {DATE_TIME} CT · **Status:** proposed → approved → scheduled
**Season:** {one line from seasonal-calendar.md} · **Carrying from the board:** {what is live or
launching this week that the content rides, with its condition}

**Missing this week, and the fallback used:** {plain statement, or "nothing"}

---

## The week

| # | Day · time (CT) | Segment | Format | FB | IG | Piece | Status |
|---|---|---|---|---|---|---|---|
| 1 | Mon {d} · 12:00 | Boil Math Monday | graphic 4:5 | ✅ | ✅ | `01_MON-{mmdd}_FEED_{slug}.png` | proposed |
| 2 | Tue {d} · 5:30 pm | Shop Floor Tuesday | raw photo 4:5 + story | ✅ | ✅ | `02_…` | proposed |
| 3 | Wed {d} · 12:00 | How-To Wednesday | carousel ×{n} | ✅ | ✅ | `03_…_1-cover.png` … | proposed |
| 4 | Thu {d} · 5:30 pm | Word of Mouth Thursday | review card 4:5 | ✅ | ✅ | `04_…` | proposed |
| 5 | Fri {d} · 12:00 | Friday Fire | reel 9:16 | ✅ | ✅ | `05_…_REEL_{slug}.mov` | proposed |
| 6 | Sat {d} · 9:00 am | Game Day / Weekend Cook | story 9:16 | ✅ | ✅ | `06_…_STORY_{slug}.png` | proposed |

Status values: `proposed` · `approved` · `revised` · `dropped` · `scheduled ✔ {time read back}`.
The table is for reading. The record of what is approved, queued, scheduled and verified is
`schedule.json` in this folder (`cli.js status <Monday>`).

---

## Previews

### 1 · Mon {date} · 12:00 · Boil Math Monday
```schedule
{"id": "1-feed", "type": "feed", "placements": ["facebook", "instagram"], "date": "{YYYY-MM-DD}", "time": "12:00", "media": ["01_MON-{mmdd}_FEED_{slug}.png"]}
```
![]({file})
**Visual:** {what is on the graphic, which asset, which template}
**Caption — Facebook**
```
{FB caption}
```
**Caption — Instagram**
```
{IG caption, tighter, hashtags on the last line}
```
**Why this one:** {one line — the angle, and why this week}
**Claims check:** {each figure and how it is qualified · fitment lines · warranty · price source}

### 2 · Tue …
*(same shape, six times; a carousel lists every frame in posting order)*

### The `schedule` block — one per piece, the scheduler reads it

`node "my-workflows (automations)/live/post-scheduler/cli.js" build <Monday>` turns this plan into
`schedule.json`. It reads **only** the `schedule` blocks and the two caption fences in the same
section, so the rest of the plan can be written for Evan. Rules:

- The section heading starts `### <slot number> · `. The block sits anywhere inside that section.
  Tuesday has two blocks (`2-feed` and `2-story`); every other slot has one.
- The captions are the fences under the lines that start `**Caption — Facebook` and
  `**Caption — Instagram` (a note in brackets after the name is fine). The first of each is what
  posts. Any other fence ("Swap caption…") is ignored. **Never type a caption into the block.**
- Valid JSON, double quotes. Fields:

| Field | Required | What |
|---|---|---|
| `id` | yes | `<slot>-<type>`: `1-feed`, `2-story`, `3-carousel`, `5-reel` |
| `type` | yes | `feed` · `carousel` · `reel` · `story` |
| `placements` | yes | `["facebook", "instagram"]`, or one of them |
| `date`, `time` | yes | `YYYY-MM-DD` and 24-hour `HH:MM`, Central |
| `media` | yes | file names in this folder, **in posting order** |
| `ifLines` | when the caption has `[IF …]` lines | `"omit"` or `"include"`. Left undecided, the marker stays in and preflight fails it, so it can never post by accident |
| `graphicText` / `graphicTextFrom` | no | the words set on the graphic, as a list, or `"howto.json"` for a carousel, so the copy rules read them too |
| `alternates` | no | `[{"label": "plain, if the kit is not live", "media": ["…"]}]` — checked, never scheduled |
| `conditional` | no | one line: what has to happen for this piece to run, and the deadline |
| `notes` | no | for the runner and for Evan: "Evan adds the sticker", "swap if a shoot photo lands" |
| `firstComment` | no | `{"instagram": "…"}` |
| `commercial` | no | `true` on steamer or commercial content (a 5-year warranty line then always fails) |

After any change to a caption, a file or a time: rebuild. A piece Evan had already approved goes
back to draft, because his approval covered the old version.

---

## Needs from Evan

- {a photo, a video, a confirmation — each with the deadline that keeps its slot}
- **Reply `approved` to schedule all of these, or give line notes by number (e.g. "3: swap frame 4").**
- If a slot was dropped this week, say so here with the reason (six is the ceiling, not a quota).

---

## After approval — filled in by the skill

Paste the output of `cli.js status <Monday>` here once the run is verified, then one row per piece:

| # | Scheduled for (CT) | Read back in Planner | Notes |
|---|---|---|---|
| 1 | | | |

Anything that could not be scheduled is written here as *not scheduled: {reason}* (the manifest's
`failed` note), never left blank.
