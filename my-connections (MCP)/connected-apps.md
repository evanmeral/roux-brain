# Connected Apps

**Last verified:** 2026.09.01 — each connector below was actually called, not just listed.
**Account identities re-tested and corrected 2026.09.01** (second pass, prompted by Evan catching the calendar gap).

---

## ✅ Connected and tested

| App | Verified by | What the assistant can do |
|---|---|---|
| **Gmail** | **Signed in as `evan@highperformancecookers.com`** (verified 2026-09-01: 201 sent threads in 60 days, every one from the work address; zero mail addressed to `evanmeral@gmail.com`). `evan@hpcookers.com` is the same mailbox, not a second account. | Read, search, label, draft, reply, forward, send, trash |
| **Google Calendar** | **Signed in as `evanmeral@gmail.com` — the PERSONAL account**, but **the HPC work calendar is now shared into it** (Jay unlocked sharing, 2026-09-11). Verified 2026-09-11: `list_calendars` shows **"HPC"** (description "High Performance Cookers Calendar", ID `evan@highperformancecookers.com`), access role **writer**, and its events read back (the Sept 10 IntentWave and Coalition calls). | Read/write on the personal calendars **and the HPC work calendar** — pass `calendarId: evan@highperformancecookers.com`. |
| **Google Drive** | Listed recent files | Search, read, create, update, copy, share, trash |
| **Slack** | Found `#general` (C05759XA63G), created by Jay Meral, 2023-05-11 | Read channels/threads, search, send, schedule, canvases |
| **Canva** | Found **HPC Brand Kit** (`kAHRW3t1WWA`) | Search, read, create, edit, export designs; brand templates |
| **Claude in Chrome** | Extension | Reach any website — Meta Ads Manager, Shopify admin, Google Ads |
| **Shopify** ⭐ | Called `get-shop-info` 2026-09-01 — **High Performance Cookers**, `highperformancecookers.com`, Advanced plan, USD, CDT, owner email `jay@highperformancecookers.com` | **Read:** orders, customers, products, inventory, collections, analytics queries, raw GraphQL queries. ⚠️ **Also exposes WRITE** — see warning below |

### Notes from the check

- **⚠️ Gmail and Calendar are signed in to DIFFERENT Google accounts.** Corrected 2026-09-01 after direct testing; the earlier note here claimed both were the personal account, and that was wrong for Gmail.
  - **Gmail = `evan@highperformancecookers.com`** (work). This is why `/learn-my-voice` and `/fill-my-brain` produced accurate HPC results — they were reading real work mail all along.
  - **Calendar = `evanmeral@gmail.com`** (personal). ✅ **Fixed 2026-09-11:** the work calendar is shared into it and shows as **"HPC"** (`evan@highperformancecookers.com`, writer access). Always query it by that ID; the default `primary` is still the personal calendar. If a read of it ever fails, say the work calendar cannot be read, never "nothing scheduled."
- **✅ Draft saving works.** A 2026-09-01 check found a draft missing and wrongly concluded the connector was broken. Evan had deleted it himself after doing the task. **Lesson: a missing draft is not proof of a broken connector — ask before writing a fault into this file.**
- **Slack is the real HPC workspace** — `#general` was created by Jay Meral.
- ⚠️ **Google Drive cannot carry large binaries.** `create_file` takes the file's bytes **inline as base64**, so every uploaded byte passes through the conversation. Found 2026-09-08 handing off the showroom cards: 31 print-resolution PNGs are 13.8 MB → **18.4 MB of base64 (~4.6M tokens)**; a single card is ~196k. Folders, Google Docs and text files are fine and cheap. **For image or print deliverables: create the folder, put a text guide in it, and have Evan drag the files in.** There is no local Drive mount on this Mac and no `rclone`/`gdrive` CLI.
- **Google Drive holds video assets**, including `raw footage/8-19-26 commercial boiler/` (a 374 MB MP4 from the ~19 Aug commercial-boiler shoot). Garrett's footage is likely here — check Drive before asking him to re-send anything.
- **Canva has an HPC Brand Kit** already set up.

## 🧰 Systems in daily use — no MCP connector, reach via browser

Found in the inbox 2026-09-01. These run real parts of the business and the brain needs to know they exist.

| System | What it's for | Why it matters |
|---|---|---|
| **Basecamp** | The shared workspace with Coalition — project `\| High Performance Cookers \| // Joint // SEO & PPC` | **This is the monitoring window into Coalition's lane.** Copy batches, PPC strategy, to-dos and PR opportunities all land here, not in email. Email just mirrors the notifications. |
| **UpPromote** | Affiliate platform — 5% commission program | Source of truth for affiliate signups and creator-attributed sales |
| **HubSpot** | Connected 2026-08-05 to `evan@highperformancecookers.com` | Evan's email signature routes through HubSpot sales-engage tracking links |
| **Digit** (`digit-software.com`) ⭐ | **Inventory management system.** Jay sent MCP access 2026-08-26; Evan confirmed 2026-09-01 he is connecting it within days | **Will become the SOURCE OF TRUTH for inventory, overriding Shopify.** Also expected to supply **specific overhead numbers** and more. See the source-of-truth table below. |
| **IntentWave cookie-consent tool** | Consent banner on highperformancecookers.com | Coalition flagged it during a **CIPA compliance review** and asked for login access. Compliance item, not a marketing one. |
| **reviews.io** | 752 product reviews, 4.83★, NPS 75 | The customer-language goldmine. ~730 reviews still unmined. |

## 📐 Source of truth — which system wins

When two systems disagree, this is the order:

| Question | Source of truth | Notes |
|---|---|---|
| **Orders, revenue, product mix, customers** | **Shopify** | Connected 2026-09-01. Never use Meta's or Google's reported revenue |
| **Inventory / stock levels** | **Digit** (once connected) | ⚠️ **Overrides Shopify on inventory.** Until Digit is live, treat Shopify stock counts as indicative only — do not raise stock issues off Shopify numbers alone |
| **Overhead, landed cost, COGS** | **Digit** (expected) | This is what the CAC *ceiling* has been blocked on. See `my-desk (now)/BOARD.md` — the ceiling is PROVISIONAL until real overhead lands |
| **Ad spend** | Meta / Google platforms | No connector. CSV export only |
| **Warranty, product claims** | `highperformancecookers.com/pages/warranty-information` | Verified 2026-09-01 |

---

## ⛔ Removed — do not reconnect

| App | Why |
|---|---|
| **Venon** (Shopify profit app) | **Removed by Evan on 2026-09-01** — confirmed gone from the session. If it ever reappears, **do not reconnect it, do not query it, do not cite its numbers.** Its Meta and Google ad figures didn't match the actual platforms, its data was stale, and it had **no COGS rules and no shipping profiles configured**, so every profit figure it showed excluded cost of goods and freight. It also exposed **write** tools against live Shopify data (`set_product_cogs`, `upsert_shipping_profile`, `set_payment_fees`) — removing it closed that off. Evan, 2026-08-26: *"dont use venon for anything, it honestly does not give you the best up to date information and will confuse you on the numbers."* |

## 🔌 Available but not authorized

These need a one-time sign-in in the Claude app's connector settings:

Ahrefs · Notion · Figma · Box · Atlassian · Gong · Granola · Amplitude · Similarweb · Supermetrics · HubSpot

⛔ **Klaviyo — do not authorize.** Email is Biljana's lane, fully. Evan has declined this twice.
*(Ahrefs would only ever be read-only insight — SEO is Coalition's lane.)*

---

## 🚧 The real data gap — **half closed as of 2026-09-01**

| System | Status | How to get numbers |
|---|---|---|
| **Shopify admin** | ✅ **CONNECTED 2026-09-01.** Source of truth for orders, revenue, product mix, customers | Query it directly — `list-orders`, `list-customers`, `run-analytics-query`, `graphql_query` |
| **Meta Ads Manager** | ✅ **Browser route works — found 2026-09-03.** No API connector, but Claude in Chrome's "Roux Meral" Facebook profile has full access to the real ad account: **"HP Cookers ADs," ID `4392736013287`, under the "Shopify Business Manager" portfolio.** ⚠️ Don't confuse it with the *other* ad account in that same portfolio, `939759932469855` ("Seller Dummy AdAccount") — that one has 0 people assigned and has never run an ad; a first pass landed there and wrongly concluded Meta was unreachable. To get back to the right account: business.facebook.com → account switcher (top-left) → **Shopify Business Manager** portfolio → **HP Cookers ADs**. Numbers pulled this way are Meta's platform-reported figures (pre-discount, no refunds) — fine for "is it delivering," not a substitute for Shopify on CAC/ROAS. | Browser (Claude in Chrome) via the account above, read-only. CSV export still the fallback for `hpc-scoreboard-report`. |
| **Google Ads** | ❌ Still no connector | Browser (read-only), or Coalition's reporting |

**What Shopify changes:** actual CAC and ROAS are now checkable against source of truth instead of platform-reported numbers. Order counts, new-vs-returning customers, real post-discount revenue net of refunds — all directly queryable. This was the single biggest hole in the brain and it is now closed on the revenue side.

**What is still missing:** ad *spend*. CAC needs spend ÷ new customers; Shopify has the denominator, not the numerator. Until Meta and Google connect, spend still comes from CSV exports paired through the `hpc-scoreboard-report` skill.

**Never invent or estimate a performance number.** Say "I don't have that number."

---

## ⚠️ Shopify connector — write tools are live

The Shopify connector exposes **write** access to the production store:

`create-product` · `update-product` · `create-collection` · `update-collection` · `add-to-collection` · `create-discount` · `set-inventory` · `bulk-update-product-status` · `graphql_mutation`

This is the same shape as the Venon problem Evan closed on 2026-08-26. **Evan's standing rule applies without exception: read freely, write never, without explicit permission in the current conversation.** Having the capability is not authorization. `graphql_mutation` in particular can do anything the Admin API allows — never call it without being asked, in that conversation, for that specific change.

---

## 🗑️ HPC Meta and Google Ads Assistant — DELETED 2026-09-01

**Deleted by Evan on 2026-09-01, after its knowledge was extracted.** Not a Venon-style ban — it was removed for redundancy, not misconduct.

**What it was:** a single tool, `ask_marketing_agent`, running on its own OpenClaw workspace. Despite the name it had **no Meta or Google Ads data at all** — it was a product-knowledge copywriter with live Shopify catalog lookup, plus browser automation, media-generation workflows and a dealer-locator skill.

**Its record, fairly stated:**
- ✅ **Its product facts were accurate.** Quoted 18 QT prices that matched Shopify variant-for-variant.
- ✅ **It caught a real error nobody else did** — the warranty claim, wrong in 8 brain files and propagating into ad copy. Verified against the live warranty page and corrected.
- ❌ **It failed 3 of 5 brand non-negotiables** under a deliberate probe: wrote a crawfish ad for a fryer, said "hard boil," and credited the burner for the speed. It followed the operator's instruction over the brand rules. It also called the business "HP Cookers."

**Its knowledge lives on** in `my-files (knowledge)/hpc-reference/imported-from-marketing-agent/` — four files, extracted before deletion. **Read the `_IMPORT-NOTES.md` there before quoting any of it**; content is unverified except the warranty, and several conflicts are logged (three since settled by Evan).

**If a replacement is ever built:** give it the non-negotiables from `my-business (context)/hpc-standing-rules.md` in its own knowledge base, and do not let it publish unsupervised. The failure mode was instruction-following over rule-following, which produces copy that sounds right and is wrong.

## 🐙 GitHub

Connected by Evan 2026-09-01, but **no GitHub tools were reachable in that session** — possibly needs a Claude restart, or is connected at account level without being exposed to this folder. Not yet verified working.

**Only real use case here:** version-controlling the landing-page HTML the `hpc-landing-page` skill pushes into Shopify, so a bad edit is one revert away. There is no other codebase in this business. Low priority.

---

## Notes

- **Google side is connected; Microsoft is not** — HPC runs on Google.
- The `hpc-scoreboard-report` skill runs from **paired Meta + Google CSV exports**, not live connectors.
- Raw exports live in `my-work (outputs)/internal/reports/raw/`.


---

## Related

[Board](../my-desk%20%28now%29/BOARD.md) · [channels-and-accounts](../my-files%20%28knowledge%29/hpc-reference/channels-and-accounts.md) · [automation-roadmap](../my-workflows%20%28automations%29/playbooks/automation-roadmap.md) · [our-team](../my-business%20%28context%29/our-team.md)
