The pulse. **Button-only: it runs when Evan presses Pulse now in Atlas OS, and at no other time** (Evan, 2026-09-14). Nothing schedules it. It runs headless. **Reads only.**
Writes exactly two files: `my-desk (now)/today.md` and `my-desk (now)/pulse/YYYY-MM-DD.json`.

Do not run the /prime briefing and do not write a chat reply for Evan; nobody is reading the
chat. The two files are the whole output. Still read `my-desk (now)/BOARD.md`,
`my-business (context)/hpc-standing-rules.md` and `SAFETY.md` first, because their rules apply.

## Hard rules

- **Never write to Shopify, Meta, Google or Gmail.** Read tools only. If a read tool is not
  available or is refused, record that under Problems and move on. Never retry with a write.
- **Never invent or estimate a number.** A figure you could not read is written as
  "not read: <reason>", not as a guess, not as 0.
- **Every figure carries its source and the time you read it.**
- **Meta: HP Cookers ADs only** (account `4392736013287`). Ignore the other account entirely.
- Meta figures are platform-reported spend. They are never revenue and never ROAS. Shopify is
  the only source for orders and net sales.
- Do not touch `BOARD.md`, `capture.md`, `decisions.md` or anything else.
- **Never call `ask_marketing_agent`** (the "HPC Meta and Google AD Assistant"). It has no ad
  data and its numbers are unverified. If the Meta Ads connector is not available to you in
  this session, write "Could not read Meta: connector not available" under Problems.

## Steps

1. **Dates.** Today and yesterday in America/Chicago. The run time, to the minute.
2. **Meta, yesterday.** For HP Cookers ADs: spend per active campaign for yesterday, and the
   total. Note any campaign still in Learning if the read shows it. Source: Meta connector.
3. **Shopify, yesterday.** Order count and net sales for yesterday (net = after discounts and
   returns, before shipping and tax), via a ShopifyQL analytics query. Source: ShopifyQL.
4. **Calendar.** Today's events and tomorrow's morning (before noon), from both the personal
   calendar (`primary`) and the HPC calendar (`evan@highperformancecookers.com`). Flag an early
   start, a double-booking, or a meeting with no link or location.
5. **The board.** From `BOARD.md`: the three Now items; every Waiting row where Evan is the
   blocker and the Since date is 2 or more days ago. From `my-desk (now)/key-dates.md`: any
   date within the next 7 days.
6. **Capture.** If `my-desk (now)/capture.md` has lines, list them; they are things Evan told
   the OS since the last session.
7. **Top three.** The three things that matter most today, sharpest first: a deadline inside
   a week, a meeting to prep, a Waiting row on Evan past two days, a campaign read that is due.
   Fewer than three if fewer genuinely matter. Never pad. Each one names why it is on the list.

## Write `my-desk (now)/today.md` in exactly this shape

```
# Today — YYYY-MM-DD · run HH:MM CT

## Top three
- …
- …
- …

## Yesterday
- Meta: $X total · campaign A $a · campaign B $b (Meta connector, HP Cookers ADs, read HH:MM)
- Shopify: N orders · $X net (ShopifyQL, read HH:MM)

## Today
- HH:MM Event name (calendar) · flags if any
- Tomorrow morning: …

## Waiting on you past two days
- What · since YYYY-MM-DD (N days)

## Key dates this week
- YYYY-MM-DD What

## From your capture
- (each line, or "nothing new")

## Problems
- (each failed read, plainly: "Could not read Meta: <reason>", or "none")
```

Keep headings exactly as shown; Atlas OS renders this file by them. Skip the Capture section
only if the file does not exist. Then write `my-desk (now)/pulse/YYYY-MM-DD.json` with the same
figures as data: `{ "date", "runAt", "meta": { "total", "byCampaign": [...], "source" },
"shopify": { "orders", "net", "source" }, "problems": [...] }`, using `null` for anything not read.

Finish by printing one line: `pulse ok` or `pulse with problems: <count>`.
