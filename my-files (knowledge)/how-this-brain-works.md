# How this brain works

The manual. Everything here is for **you**, not for the assistant — it explains the
folders, the commands and the conventions. It was moved out of `CLAUDE.md` on
2026-09-02 because `CLAUDE.md` is loaded into context on every single turn, and a
reference manual does not need to be.

Rules the assistant actually follows live in two places: `SAFETY.md` (the constitution)
and [hpc-standing-rules.md](../my-business%20%28context%29/hpc-standing-rules.md)
(the operating detail). Where work stands lives on
[the board](../my-desk%20%28now%29/BOARD.md).

---

## What this is

Your AI assistant. It knows your business and gets smarter every time you use it.

- **my-desk (now)/** — the front page. What's live, what's next, what's waiting.
- **my-business (context)/** — Who you are, what you sell, how you sound, how you write, the standing rules.
- **my-inbox (new inputs)/** — Drop new photos or files here with any name. ROUX renames each one and files it where it belongs.
- **my-files (knowledge)/** — Drop your files here. Brochures, docs, anything.
- **my-connections (MCP)/** — The apps you have connected.
- **my-skills/** — Ready-to-use skills plus any you teach it.
- **my-work (outputs)/** — Where all finished work gets saved.
- **my-workflows (automations)/** — Automations and processes.
- **SAFETY.md** — How it behaves, and how you control what it can do (you set that in the Claude app's connector settings, not here).

---

## The daily cockpit

ROUX OS at `localhost:4242` is the front door: the time, the week, what is waiting on you,
what is live, and a brief the brain writes when you press Pulse now. Every card starts the
work. Read [how to use ROUX OS](how-to-use-roux-os.md) once; it is two pages.

### Files ROUX OS owns or reads (formats)

The page writes four brain files besides `capture.md`. Agents may read all of them. Keep the formats
exact; the page parses them.

| File | Format | Who writes it |
|---|---|---|
| `my-desk (now)/launches.md` | One `## Title · YYYY-MM-DD` per launch, optional `>` note lines, then one line per gate: `- [ ] the gate · **Owner** · due YYYY-MM-DD · _source: where it came from_`. A ticked gate gets `[x]` and `· done YYYY-MM-DD`. Every gate is a fact from the plan or the board with its source; nobody invents one. | The page flips checkboxes. Agents add, reword and retire launches at `/wrap`. |
| `my-desk (now)/approvals.json` | `{ "items": [ { id, created, from, kind, recommendation, change, source, status, note, resolved_at } ] }`. `kind` is `creative` · `content` · `recommendation` · `rule` · `live-write`. `status` is `pending` · `approved` · `rejected` · `queued`. **Agents add items only with** `node "my-workflows (automations)/live/roux-os/approvals.js" add '<json>'` (fields: `from`, `kind`, `recommendation` in one or two lines, `change` = the exact change, `source`). Never hand-edit it. ⛔ **`queued` is what Evan's yes on a `live-write` becomes. It is not permission to write to Shopify, Meta or Google:** the session still asks Evan, in the conversation, at the moment of the change. | Agents add. The page records Evan's decision and note. `/wrap` runs `approvals.js archive`, which moves resolved items to `archive/approvals.md`. |
| `my-files (knowledge)/hpc-reference/affiliates/affiliates.json` | A list of people. Fields and sources: the `README.md` beside it. Holds emails and phone numbers: it stays on this machine. | The page (Evan's edits), stamped `updated_by: "Evan (OS)"`. |
| `…/affiliates/sales-by-affiliate.json` | `{ read_at, source, window, rows: [ { affiliate_name, orders, net_sales, first_sale, last_sale, orders_30d, net_30d, orders_90d, net_90d } ] }`. Optional `affiliate_id`. Joined by id or name when the page renders, so a new read never touches Evan's edits. | **Finn**, whole file replaced per read. |
| `…/affiliates/flags.json` | `{ read_at, source, note, calc_commission_rate: {value, label, source}, rows: [ { affiliate_name, flags: [ { flag, label, fact, source } ], top_referrer: {name, orders, of, source}, returning: {orders, of, source} } ] }`. `flag` is `COUPON SITE` · `NO VISIBLE REFERRAL` · `PAID-AD OVERLAP` · `NEW SIGN-UP` · `HIGH RETURNS`. **A flag is a fact with a count and a source, never a verdict.** Set one only where a read states it for that name. A flag with no fact or no source is not shown. | Whoever transcribes a Finn report (Nova built the first one, 2026-09-21). |
| `…/affiliates/uppromote-import.json` | Parsed from Evan's own UpPromote CSV exports by the page. Only mapped columns are kept. | The page. |
| `my-desk (now)/pulse/kill-lines.json` | `{ read_at, source, window, rows: [ { name, id, metric, value, kill_at, status, note } ] }`. Shown as written on the Score tab; the page works out no status of its own. | The Thursday scoreboard task, when it is pointed at it. |

Capture lines the page writes, so a session knows what it is reading: `Done: …` · `Undo: not done
after all: …` · `Draft a nudge to <who> re <what> — Ada` · `Add to the Jay batch …— Ada` ·
`Draft a check-in to <name> (<handle>) — Pete` · `Content note, <week> <piece>: <note> — Sage` ·
`Approval: APPROVED | REJECTED | QUEUED, CONFIRM IN SESSION · <id> …` · `Approval: APPROVED post <week> <piece> …`.

## How to start a session

1. Open the Claude app
2. Open this folder
3. The very first time, quit Claude completely (Cmd+Q on Mac, or fully close it on Windows) and open this folder again. This wakes up your commands.
4. Start talking

The assistant loads the board and your business info automatically at the start of
every session. You should not have to explain where things stand.

**If a command like /setup is not turning blue:** quit Claude completely and reopen this
folder. Claude only loads your commands when it starts up, so a fresh download needs one
restart before they light up blue. A blue command means it is ready to run.

**If Git or "command line developer tools" ever come up as missing** (for example when
helping set up another computer): on Windows the fix is the installer at
git-scm.com/download/win; on Mac it is the one-time `xcode-select --install` in Terminal.
Full walkthrough in /support. **Never suggest Homebrew** — it is not needed for anything
in this kit and does not fix a missing Git.

---

## Folder structure

```
ROUX/
├── CLAUDE.md                       <- loaded every turn. Keep it short.
├── SAFETY.md                       <- the constitution (only you edit it)
├── .claude/                        <- settings, agents, commands
├── .obsidian/                      <- Obsidian vault config
│
├── my-desk (now)/                  <- THE FRONT PAGE
│   ├── BOARD.md                    <- rewritten each /wrap, never appended
│   ├── decisions.md                <- append-only: what was decided and why
│   └── archive/                    <- nothing is deleted, only moved here
│
├── my-business (context)/          <- who you are
│   ├── who-we-are.md
│   ├── how-we-sound.md             <- the brand's voice
│   ├── my-voice.md                 <- how YOU write (built by /learn-my-voice)
│   ├── our-team.md
│   ├── what-we-sell.md
│   ├── our-clients.md
│   └── hpc-standing-rules.md       <- the operating rules, single canonical copy
│
├── my-inbox (new inputs)/         <- drop new photos/files here; ROUX sorts them
├── my-files (knowledge)/           <- drop your files here
│   ├── how-this-brain-works.md     <- this file
│   ├── about-my-business/
│   └── hpc-reference/              <- metrics, seasonal calendar, competitors,
│                                      channels, design system, customer language
│
├── my-connections (MCP)/
│   └── connected-apps.md
│
├── my-skills/                      <- built-in skills plus any you add
│   └── hpc-ad-creative/            <- HTML->PNG ad renderer + all source art
│       ├── assets/                 <- logos, lifestyle photos, product cutouts
│       └── work/creative/          <- templates, drafts, approved library
│
├── my-work (outputs)/              <- finished work
│   ├── clients/
│   ├── prospects/
│   ├── content/                    <- ads, social, emails, website, other
│   └── internal/                   <- reports, drafts
│
└── my-workflows (automations)/
    ├── playbooks/                  <- weekly rhythm, content engine, paid media,
    │                                  email/sms, automation roadmap
    ├── specs/
    └── live/
```

---

## Naming conventions

**Folders.** Client and prospect folders use lowercase with hyphens: `acme-plumbing`,
`joes-cafe`. No spaces. No capitals. No underscores.

**Documents.** `yyyy-mm-dd-short-slug.ext`. The date sorts the folder; the slug says what it is.

```
2026-09-18-tailgate-ad-split.md
2026-09-16-kit-build-record.md
```

**Client and prospect folders** all use the same three subfolders, created together:

```
[client-name]/
├── 01 - Brief & Notes/      <- the brief, research, emails, brand assets
├── 02 - Deliverables/       <- finished work you send them
└── 03 - Working Files/      <- drafts and scratch
```

---

## What you can ask for

### Sales
| Type this | What it does |
|---|---|
| /reply | Respond to a customer enquiry in your voice |
| /quote | Turn job notes into a professional quote or proposal |
| /follow-up | Chase leads, sent quotes, or lapsed customers |

### Operations
| Type this | What it does |
|---|---|
| /morning-brief | Prep your whole day: inbox sorted, calendar checked, top 3 priorities |
| /sort-my-inbox | Go through your unread email and draft replies for the ones waiting on you |
| /chase-payment | Send a friendly payment reminder |
| /meeting-notes | Turn messy notes into actions and deadlines |
| /weekly-check | See how your week went (revenue, appointments, highlights) |

### Marketing
| Type this | What it does |
|---|---|
| /content-week | Plan the week's Facebook + Instagram posts in one Monday session, approve them, and have them scheduled in Meta Business Suite. Also fires on its own every Monday at 8:00. |
| /hpc-campaign-checkpoint | Re-read a live paid campaign at its checkpoint: Meta's numbers, Shopify's tagged orders, the gap between them, and Beau's continue / hold / cut call. The decision stays Evan's. |
| /write-a-post | Write a social media post |
| /write-an-ad | Write ad copy with hooks, headlines, and CTA |
| /carousel | Build a multi-frame Instagram/Facebook swipe post |
| /file-product-photos | Name and file a product photo drop (cutout folder + studio folder): pair them, name them, copy them to the asset library with bounds and index, and rename Evan's originals to match |
| /hpc-showroom-cards | Reprint, add, change or retire the showroom product cards: prices checked against Shopify, every card rendered and measured, then handed to Alexis to print |
| /ask-for-review | Ask a happy customer for a review |

### Team & big jobs
| Type this | What it does |
|---|---|
| /write-a-process | Turn how you do something into a step-by-step guide |
| /plan | Give it a goal too big for one skill. It plans the steps, shows you the plan, then runs your skills and agents |

### System
| Type this | What it does |
|---|---|
| /setup | First-time setup. Learns your business, connects your apps, demos itself. ~20–25 min, once. |
| /fill-my-brain | Fills your business files from your real email (read-only), website, and documents. Shows you everything before saving a word. |
| /prime | Loads the board and your business info at the start of a session. Runs automatically. |
| /wrap | Rewrites the board, logs decisions, saves what was learned. Runs automatically at the end. |
| /connect | Connect or reconnect apps |
| /learn-my-voice | Teach it how you write, from your real sent emails |
| /teach-me | Teach it a new skill — it asks what the task does, what it produces, what it needs |
| /hand-off | Save your place so a fresh conversation can continue |
| /support | Get help if something is not working |
| /tidy-brain | Free disk space: finds duplicate images, superseded render rounds, helper files and old exports, shows you the list by size, and moves only what you approve to the Trash (you empty it). Text history gets archived, never deleted. Suggested monthly, first Monday |

---

## Connecting apps

Three tiers:

- **Tier 1 (essentials, connected during /setup):** email, calendar and files, on either Google (Gmail, Google Calendar, Google Drive) or Microsoft 365 (Outlook, OneDrive), plus the optional Claude in Chrome extension. Standard one-click connectors in the Claude app. What each may do (read, draft, send, edit) is set by you in the app's connector settings, and the assistant works within that. Outlook needs a one-off permissions approval by whoever manages the Microsoft 365 before it can write anything.
- **Tier 2 (one-click in the Claude app):** Slack, Stripe, Canva, Webflow, Notion, GitHub, and more added regularly.
- **Tier 3 (advanced, assistant-guided):** Meta Ads, Xero, MYOB, HubSpot, Salesforce, custom CRMs, anything with an API. Needs a one-off MCP setup — the assistant walks you through it via /support. Paste-into-chat is always the fallback.

Claude in Chrome is the catch-all. If a tool is not natively connectable, the extension
can use it in the browser.

---

## How it learns

1. **Business files** — `my-business (context)/` is what it knows about you.
2. **/fill-my-brain** — fills those files from your real email, website and documents, so you do not type your business in by hand.
3. **Your voice** — `/learn-my-voice` studies your real sent emails. The profile lives in `my-business (context)/my-voice.md`. Drafting skills also read your past emails to the person being replied to, so tone matches each relationship.
4. **Skills** — each skill in `my-skills/` teaches it a task.
5. **/wrap** — rewrites the board, appends to `decisions.md`, and updates the business files.

The more you use it, the less you need to explain.

---

## Skills vs commands (where to edit)

Skills are the editable part. To change how a skill works, open
`my-skills/[skill-name]/instructions.md` and edit it in plain English. To change /quote,
open `my-skills/quote/instructions.md`.

`.claude/commands/` is the wiring that connects the slash command to the skill file. You
do not need to touch it.

System commands (/setup, /connect, /prime, /wrap) are the exception — they live in
`.claude/commands/` directly because they manage the assistant itself, not your work.

---

## You set the limits

What the assistant can do out in the world is set by you, in the Claude app's connector
settings (read, draft, send, edit, per app) and its permission prompts. It works within
whatever you have allowed and does not add rules of its own on top. Leave sending off and
it only drafts; turn it on and it sends when you ask.

`SAFETY.md` is the short version, and it wins over everything else in this folder. Only
you edit it. The assistant never rewrites, softens, or works around it.

---

## Related

[Board](../my-desk%20%28now%29/BOARD.md) · [hpc-standing-rules](../my-business%20%28context%29/hpc-standing-rules.md) · [SAFETY.md](../SAFETY.md) · [connected-apps](../my-connections%20%28MCP%29/connected-apps.md) · [automation-roadmap](../my-workflows%20%28automations%29/playbooks/automation-roadmap.md)
