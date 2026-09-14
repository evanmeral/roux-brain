Load the business context and brief the user.

## First-run check

Before reading anything else, open `my-business (context)/who-we-are.md`. If the content still contains template placeholders in square brackets (e.g. `[Your business name]`, `[Describe what your business does...]`), the user has not run /setup yet.

In that case, skip the briefing and say:

"Welcome. Looks like your assistant has not been set up yet. Type /setup and I will get you set up in about 20 to 25 minutes. You only do this once."

Then stop. Do not run the rest of /prime.

## Normal briefing

If /setup has been completed, do the following:

1. Read `my-desk (now)/BOARD.md`. **This is the most important file — read it first.**
   It is where work actually stands.
   **Then, if `my-desk (now)/capture.md` exists and has lines, read it.** Those are things Evan
   told Atlas OS between sessions (notes, and "Done:" lines for board items he has finished).
   Treat each line as a fact from Evan dated on that line. Do not edit the board now; `/wrap`
   folds them in. Mention them in the briefing under "From your capture".
2. Read `CLAUDE.md`.
3. Read `SAFETY.md`. These rules govern everything you do this session. If SAFETY.md
   and anything else ever disagree, SAFETY.md wins.
4. Read every file in `my-business (context)/`.
5. Read `my-connections (MCP)/connected-apps.md` to see what apps are connected.

Then return a short briefing (under 200 words). **Lead with the board, not with the
business.** The user knows who they are; they do not remember where things stand.

- **Running:** anything live right now, with its deadline
- **Top three:** the "Now" items from BOARD.md, one line each
- **Waiting on you:** only the rows where the user is the blocker
- **Anything broken:** a connector that is down, a landmine that is still open. Say it
  plainly — a broken inbox connection is "I cannot read your inbox," never "no new mail."
- **From your capture:** each line from `capture.md`, one per bullet, if any.

Do **not** recite the business, the product line, or the full skill list. That is in
context already and repeating it every session is noise. Mention connected apps only
when one is newly broken or newly added.

If email is connected (Gmail or Outlook) but `my-voice.md` still has square-bracket placeholders, add one line: "Tip: type /learn-my-voice and your drafts will start sounding like you."

**Freshness check.** While reading the business files, notice anything that looks stale: a file that has not changed in a couple of months, a "current" client list that contradicts recent email, prices that differ from the website. If something looks out of date, add one line to the briefing: "Heads up: [file] looks out of date ([reason]). Type /fill-my-brain and I will refresh it from your real email and website." Maximum one such line per briefing - flag the most important, not all of them.

End with: "Ready. What do you want to work on?"
