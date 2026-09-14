# How to use Atlas OS

**For Evan.** Two pages. Read once, then keep it in the Links strip on the page.
Address: `localhost:4242`, or the Atlas icon in your Dock.

---

## What it is, in one line

The front door to the brain. It shows the things you would never think to ask for, and every
card on it starts the work.

## Why the last one died, and what is different

The last one was a place to read. Reading loses to chat every time, because chat answers the
question you actually have. So this one follows two rules:

1. **If you could just ask for it, it is not on the screen.** Numbers, history, decisions, the
   library: ask in chat. The screen only shows what nobody asks for and everybody needs: the
   time, the week, what is waiting on you, what is live and spending, what the brain found.
2. **Every card does something.** Work on this opens a session with the context loaded. Done
   tells the brain. Tell Atlas is an inbox the next session reads first. Files finds anything in
   the vault in two keystrokes.

If a panel stops earning its place, say so in chat and it gets deleted. Small on purpose.

## The two-minute morning

1. Open Atlas. Glance at the top bar: the clock, the countdown chips, the dot on the right.
   Gold chips are inside a week, red inside two days. A red dot means a feed is down and the
   bottom line says which.
2. Press **Pulse now** and go get coffee. Ninety seconds later **This morning** holds your top
   three, yesterday's Meta spend by campaign and Shopify orders with sources, today's calendar
   with flags, and anything waiting on you past two days. That is your morning brief. Nobody
   wrote it for you; the brain read the systems.
3. Look at **This week** and **Waiting on you**. Ages turn gold at two days and red at five.
4. Pick the thing and press **Work on this**. A real Claude session opens in Terminal with the
   board item and its documents already read. Or press **Sort inbox** and let it draft replies.

Then close it. That is the whole routine.

## During the day

| When | Do |
|---|---|
| Jay says something, or you think of something at 9pm | Type it in **Tell Atlas** and press Save. The next session reads it before anything else. Nothing said between sessions is lost anymore. |
| You finished a thing that is on the board | Press **Done** on its row. It greys out, and the next wrap clears it from the board. You never edit the board by hand. |
| You need a file and cannot remember where it is | **Files** tab, or Cmd+K. Type one word from the name or folder. Click to preview, Open in Obsidian, or Copy path to paste into chat. |
| You need a number or a "what does this mean" | Type the question in the box and press **Ask**. Chat is still where questions go; the OS just starts the session with the vault open. |
| You want the whole board | **Board** tab. Every section, readable, one click to Obsidian. Read only, on purpose. |
| Something feels stale | The stamp on the Now panel shows the board's date. If it is more than two days old it turns gold: wrap the last session, and the page follows on its own. |

## End of day

Nothing. Wrap happens inside the session you worked in, the board is rewritten there, and the
page updates itself within a second. You never save, refresh, or sync anything.

## What the panels mean

- **This morning** — the last pulse, with its run time. The top three are the brain's call on what
  matters today, each with its reason. Press "more" for waiting rows, key dates, capture, problems.
- **Now** — the board's three priorities. Chips pull out the dates and dollar amounts. The small
  orange tags open the linked documents in Obsidian. "details" shows the full text.
- **Waiting on you** — only your rows. "others" shows everyone else's.
- **This week** — Monday start, both calendars, orange is HPC and grey is personal. Red chips are
  key dates from the board. Today has the orange border.
- **Running** — each live campaign with its daily budget and status. The bar is live spend against
  the $350 ceiling, from the board's own numbers.
- **Made recently** — the last files the brain wrote. Review means opening the page, not hunting
  folders.
- **Links** — Shopify admin, Ads Manager, Basecamp, UpPromote, reviews.io, Canva, Drive, the site,
  the warranty page, the vault, and this manual.

## What it will never do

- Write to Shopify, Meta, Google, or Gmail. It holds no logins for them and cannot reach them.
- Write the board. Only the brain writes the board, at wrap. Your Done and Tell Atlas lines go to
  `capture.md`, which is an inbox.
- Cost money. The page is local code. The pulse and the buttons run on your Claude plan, same as
  chatting, and the pulse only runs when you press it.
- Show a number it did not read. A dead feed is red text that says which one.

## If it looks wrong

- Red text under a panel names the broken feed. The bottom status line lists every feed.
- The page is blank or will not load: it is not running. In Terminal, in the atlas-os folder,
  `./install.sh` starts it and makes it start at login again. `./uninstall.sh` removes it.
- The calendar is empty: the two addresses live in `config.local.json` in the atlas-os folder.
- Logs are in `logs/` in that folder. Every pulse and session is one line in `runs.log`.

## The habit that keeps it alive

Two rules from the guide this was built on, and they are the whole game:

- **If you stop looking at a panel, delete it.** Say "I never look at X" in chat and it goes.
- **When you ask for the same thing twice, make it a button.** Say "make that a button" and it is.

The page is built and edited by the brain, so every change is a sentence in chat, not a project.

---

Related: [how this brain works](how-this-brain-works.md) · [the OS spec and build log](../my-workflows%20%28automations%29/specs/2026-09-14-atlas-os-plan.md) · [README (technical)](../my-workflows%20%28automations%29/live/atlas-os/README.md)
