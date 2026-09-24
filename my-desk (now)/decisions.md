# Decisions

> **Append-only.** Newest at the top. Never rewrite a past entry — if a decision is
> reversed, add a new one that says so and link back.
> One line per decision: **what · who · when · why.** Detail belongs in the linked doc.
>
> This file exists so [BOARD.md](BOARD.md) never has to carry history. The board says
> what is true now; this says how it got that way.

---

## 2026-09

**Marketing costs on file; Coalition is $4,800/mo, the $2,000 gap is unexplained** · Evan, 2026-09-24 (asked Jay). Biljana $2,000/mo · Klaviyo ~$1,100/mo (varies with list size) · reviews.io $5,360/yr · UpPromote $75/mo, paid yearly at a discount (yearly amount not on file). Known marketing run-rate now $8,540/mo, ad spend excluded (→ `my-business (context)/hpc-marketing-budget.json`). ROUX OS reminders get a × that moves a line to `archive/reminders.md`.

**ROUX OS v0.5: Planner, Posts review + schedule buttons, notes history, Reminders, Marketing Budget, Paid Media, ROUX's Proposals** · Evan, 2026-09-24 (his list, "lets implement these changes"). The two Posts buttons open a Claude session; the page itself still never schedules. Notes history is read back from `capture.md` + `archive/captures.md`, so it survives wrap. Budget costs carry sources; unread ones stay "not on file" (Biljana, Klaviyo, UpPromote plan, reviews.io). ⚠️ Coalition is $4,800/mo in `our-team.md` but the Sept 14 decision calls the $6,800/mo agencies line "the Coalition retainer"; the $2,000 gap is not reconciled. "New since the last score" on the globe uses git's first-add dates, because disk dates were reset by the vault move. Proposal prices checked by Scout 2026-09-24; Triple Whale's and Ahrefs' yearly prices not confirmed. → [manual](../my-files%20(knowledge)/how-to-use-roux-os.md)

**ROUX OS Score tab gets a kill-line table, written by the Thursday task; routines repointed to the brain's home** · Evan, 2026-09-24 ("yes, build the kill lines table"; "yes, recreate both"). The table lists every live ad against each kill rule that applies (spend, Meta purchases, tagged new customers, the line, status fired/near/ok/not read). The status is the task's; the page only sorts and colours, and pauses nothing. **Why:** Finn's kill-line checks were by hand (e.g. the rolling-boil reads). Three routines (Monday content, month-plan draft, Thursday scoreboard) still had the deleted Desktop path as their working folder, stored in the app's settings, not the prompt, so they never started; this morning's scoreboard didn't run. Recreated from a session in `~/ROUX-AI-Brain/ROUX` with the same prompts; stored tool approvals were lost. Venon is skipped on the brain globe (any app marked removed/deleted); Evan removed n8n and Venon from the Claude connectors. → [README](../my-workflows%20(automations)/live/roux-os/README.md)

**Rolling-boil trigger moved to $583.74 lifetime; the Oct 2 IW read is scored per ad** · Evan, 2026-09-24 ("yes to both"), on Beau's calls. **Facts** *(Finn, Meta connector + Shopify, 2026-09-24 09:46 CT)*: `120qt-performance_rolling-boil` `52508008680391` $292.24 lifetime, **1 Meta purchase (Sept 23)**, 0 Shopify-tagged since Sept 18, ~$58.72/day; `crowd-math` 1 tagged (#17482), $90.03 per Meta purchase; campaign $559.00 · 5 Meta · 1 tagged. **1.** The Sept 22 trigger ($389 with 0 Meta purchases) was the 2× branch of the no-sale rule and can't fire now Meta shows a purchase, so the 3× branch governs: **pause at $583.74 lifetime (3× the $194.58 Platinum ceiling) with 0 Shopify-tagged orders**, ~Sept 29 at pace. Not paused early: changing the rule after seeing the result, ~$290 cost to wait, the only Triple Jet cold ad. Evan builds it as a Meta automated rule (that ad only · turn off + notify · lifetime spend > $583.74 · continuously · **no purchase condition**, since Meta can't see Shopify tags); the old $389 rule, if built, is deleted or edited. Finn reads spend + tagged orders Fri Sept 25 and Mon Sept 28 and confirms the rule is active; a tagged pot, Triple Jet or kit order first → Evan turns the rule off. **2.** Oct 2 terms apply to each IW ad separately; the campaign read is shown beside, context only. **Why:** a campaign read lets a 120 QT Powered sale keep a Platinum ad alive across two ceilings. The campaign stays $100/day CBO; if rolling-boil goes off, crowd-math takes the whole budget. Caveat: crowd-math's $360.11 per tagged order is above its $195.34 ceiling; Continue ≠ profitable. → [kill-line read](pulse/kill-lines.json) · [Beau 09-22](../my-work%20(outputs)/internal/reports/2026-09-22-meta-calls-beau.md)

**Sept 28–Oct 4 content week final: five posts scheduled and verified, Friday dropped** · Evan, 2026-09-24 (notes and approvals in ROUX OS; "everything is approved, go ahead and schedule them"). Friday's turkey reel is dropped for this week and moves toward Thanksgiving, from Garrett's cut, not Evan's phone clips ("we will be having a professional video coming from garrett"). Monday 4mm: pots shown whole, headline "Thin pots warp. Ours don't.", the missing single jet tube added under the far-left pot (new asset `powered-pot-lineup-patio-jet-tube-fixed-2026-09-24.png`, use it over the original). Tuesday: shoot-day carousel ×4 with short copy + shield on every frame and a full-bleed story, no blurred band ("it looks lazy that we're posting a standard image off an iPhone"). Read back in Business Suite (Content → Scheduled, Planner). → [plan](../my-work%20(outputs)/content/social/2026-09-28-week/PLAN.md)

**Content reviews happen in ROUX OS → Posts** · Evan, 2026-09-24 ("once the content has been adjusted update the posts section of the os with the new stuff and just tell me the content is now ready for review in posts"). No previews in chat; an option B goes in the piece's `alternates` and Posts shows it under the card. → [content-week skill](../my-skills/content-week/instructions.md)

**Renders run in chrome-headless-shell; ffmpeg installed** · Evan, 2026-09-24 ("yes download both"), after asking why Chrome kept appearing in his Dock. Same engine as Chrome (Monday's render matched pixel for pixel), no Dock icon per render, falls back to Chrome if missing; lives in `~/Library/Application Support/ROUX/`. ffmpeg 9.0.2 via Homebrew for video trims, stills and overlays. Both free.

**Metricool (scheduling FB/IG without Chrome): decide Mon Sept 28** · Evan, 2026-09-24 ("lets look at getting metricool next week"). Facts: a Claude connector exists (create/read/update scheduled posts); Free = 20 posts/mo, Starter ≈ $20/mo yearly or $25 monthly, unlimited (metricool.com/pricing, read 2026-09-24). Unconfirmed: image input (upload vs public URL), story auto-publish, how posts count. Suggested test: connect Free, schedule one post. Reminder task `metricool-reminder-2026-09-28`, 8:30. The Graph API stays ruled out (API-OPTION.md).

**Shoot-day phone media filed; Evan's turkey clips are reference only** · Evan, 2026-09-24. 16 files → `assets/lifestyle/shoot-2026-09-23/` (JPEG kept full-res, MOV rewrapped to MP4 with no re-encode), indexed in ASSET-INDEX.md. The turkey fryer on camera is the 30 QT (Evan). No clear blue-flame shot; Evan reshoots it next time the pots run.

**ROUX improves itself weekly: `/improve` every Friday 1:00, propose-only; corrections fix the source** · Evan, 2026-09-24 ("is there a way for you to just get better and smarter everytime we work… come up with new ideas and skills… all by yourself"). Built: `/improve` skill + scheduled task `weekly-improve` (Fri 13:00): reads the week's corrections, approvals, git log, transcripts, memory and results; puts ≤ 3 system proposals (new skill, check, merge, cut, rule fix) and ≤ 3 Beau business ideas into Approvals with evidence; keeps `what-worked.md` (results, facts apart from conclusions, patterns only after 3+ weeks), which content-week and ad-creative now read first. New CLAUDE.md rule: a correction also fixes the skill/rule/check that caused it, logged in `my-skills/improve/lessons.md`; `/wrap` step 5 checks it. **Mode: option 2, propose and Evan approves** ("probably number 2, i could be swayed to go to number 1"); revisit after four reviews on the approval track record. **Why the guardrails** (Evan asked whether it could get out of hand): cap of 3+3 a week, every addition names what it replaces, every review considers a cut, skill cap 30 (28 today). Same session: the content-week photo rule was corrected (shop-floor photos carry short copy; no blurred story band), the miss that prompted this. → [skill](../my-skills/improve/instructions.md) · [lessons](../my-skills/improve/lessons.md) · [what worked](../my-files%20(knowledge)/hpc-reference/what-worked.md)

**Garrett shoot food set by what was bought** · Evan, 2026-09-23 (shoot morning). On hand: one turkey (no backup bird), pre-battered wings, fries, funnel cake, catfish and shrimp, hushpuppy mix, 2 sweet onions; the boil adds sausage and Brussels sprouts. So soft-shell crab is out of V7 (replaces the 2026-09-15 fish + soft-shell call), okra and steak fingers are out of V3, and **the Monte Cristo video (V8) is out**. **V8's replacement is ROUX's assumption, not Evan's decision:** a standalone fried-shrimp piece for October Seafood Month; Evan can swap it. Run order: V5 → V1 → V2 → the 18 QT block (V3, V4, V7, V8) → V6 in the gaps. **Why:** the plan has to match the food bought, and the 60 QT has to be dry for V5's close-ups before it boils. → [shoot plan, v5 block](../my-work%20(outputs)/internal/2026-09-14-garrett-shoot-plan-sept22.md)

**New Garrett doc for Sept 23; the Sept 22 doc is left as it is** · Evan, 2026-09-23 ("dont worry about updating the google doc", then "make a new google doc that i can share with garrett"). It carries the run order, the on-camera rules, the asks and delivery, and nothing internal (no clip list, no prices, no Jay text). Sharing it is Evan's click. → [doc](https://docs.google.com/document/d/11UpuWNvPU3FR-0kH2h2iEcLTPlvtDCcqKW3aoRuOrN8/edit)

**UpPromote Jay text moves to after the shoot** · Evan, 2026-09-23. Same text, as drafted; the shoot comes first today.

**ROUX OS 0.3: left menu, color key, the brain globe on Home, a This Month's Plan tab** · Evan, 2026-09-22 (asked for each piece; "that looks freakin perfect" on the globe). The menu moved to a left sidebar with a bigger logo and a per-page color key under it; type and spacing enlarged throughout. Home is a fixed, full-screen, slowly turning globe of the brain (agents, skills, routines, apps, work, memory around ROUX; file links as arcs), with one scrolling right column: Tell ROUX (Save + Ask) at top, then search, today's schedule, waiting on you. Plan pace and Meta caps were taken off Home (Evan); they stay on the Plan and Today tabs. The old front page is the Today tab, unchanged in function. This Month's Plan draws PLAN.md read-only, like Score. **Why:** the old page was hard to read and tight, and Evan wanted a visual map of the brain as the main attraction. Two flatter graph versions came first; Evan picked the globe. A copy of the flat web version is in the session scratchpad only. → [README](../my-workflows%20(automations)/live/roux-os/README.md)

**Obsidian graph cleanup: settings, archive links, skills index; CLAUDE.md stays unlinked** · Evan, 2026-09-22 ("go ahead with 1, 2 and 3"). Graph filters out the archive and broken links and colors by folder; 246 links in five archived boards re-pointed after they moved a folder deeper; every skill linked from the commands tables in `how-this-brain-works.md`. **Why not CLAUDE.md:** it loads on every turn, so link syntax would cost tokens each message and help only the picture. Nothing here changes how ROUX works; it is for Evan's view. Obsidian Sync is not paid for (Evan), so it gives no backup.

**Beau's three Meta calls approved** · Evan, 2026-09-22 ("yes to all 3"), on Beau's recommendation of the same day, logged below. (1) **`120qt-performance_rolling-boil` `52508008680391` pauses when lifetime spend passes $389 with 0 Meta purchases** — 2× the $194.58 Platinum ceiling; it was at $178.58 with 0 Meta and 0 tagged, spending $59.16 on Sept 21 against ~$7/day before. Evan builds the Meta automated rule (Automated Rules, not the ad's Edit panel, then "Review and publish" reads 0); Finn reads its lifetime spend Thu Sept 24 and Fri Sept 25 as the backstop. `crowd-math` and IW's $100/day are untouched, and the Oct 2 read still scores the Sept 18 window. (2) **`18qt-004` `6998222424787` pauses Sept 25**, in the same edit that adds Tailgate A + B, alone if the kit slips — $556.72 since Sept 1 with 0 tagged customers on an ad ID that does reach Shopify; without it the Sept 1–21 18 QT tagged CAC would read $114.82, not $151.93. **This reverses the board's "no pauses" line on the Sept 25 edit.** (3) **New kill-table rule, now in [PLAN.md](PLAN.md):** an ad goes off at 3× its incremental ceiling with 0 Shopify-tagged new customers, 2× if Meta is also at 0, taggable ads only. No budget changes anywhere; `18qt-001`, both BPM 18 QT videos, `18qt-TOF` at $50 and the BPM budgets all stay. Nov Holiday UGC `6855622474387` is reviewed at the Oct 1 BPM edit, `BPM Tailgate Video` `6823510767787` ($741.60 Sept 1–21, 1 tagged new customer) with it. **Why:** the $189 kill line is the 18 QT's break-even on Meta's count and the $73–$100 ceiling is the 20%-net bar on Shopify's; between them nothing is killed and nothing scales, so the ceiling governs the money. **Nothing was written to Meta — every pause is Evan's click.** → [Beau](../my-work%20(outputs)/internal/reports/2026-09-22-meta-calls-beau.md) · [Finn](../my-work%20(outputs)/internal/reports/2026-09-22-meta-ad-review-finn.md)

**Creative must pass a rubric check before Evan sees it** · Evan, 2026-09-22 ("yes do both", on ROUX's read of Anthropic's Managed Agents talk: borrow "outcomes" and "dreaming", don't move the brain onto the platform). Nova built `rubric-check` (canvas, type floors, copy rules through `lint.js`, centering, the `.pbox` shadow, a fresh-idea warning; 31 tests pass). `build-set.sh` and `build-carousel.sh` stop on a FAIL; `approve.sh` won't file a FAIL to `library/` unless re-run with `--waive "<Evan's words>"`, which is logged. **Found on the way:** `lint.js` read the "Why HPC wins" table as competitor names, so any caption saying "warranty" failed preflight. Fixed, regression test added (51/51, 37/37). **Why:** the same mistakes (type size, centering, gray box, sizes) kept reaching Evan and ending up as memory files; a check that runs every time catches them first. → [README](../my-skills/hpc-ad-creative/work/creative/rubric-check/README.md)

**`/tidy-brain`: bulky files that only take up space are removed (to the Trash), not archived** · Evan, 2026-09-22 ("i would like you to actually delete things that are just sitting there taking up space… so i can in-turn save space on my computer"). Removal is `mv` to `~/.Trash` (never `rm`), and Evan empties the Trash; small text history still archives; dry run first and Evan's yes per list, every run; git history is never rewritten. **First run, same day:** 246 files, 166 MB (duplicate draft renders, duplicate Labor Day deliverable copies, superseded rounds, stale drafts, zips, helpers). Evan held back the Sept 11 discount-code CSV (cited source) and added the three tailgate helper files. Git gc freed 5 MB. 32 image links broke inside the retired BFCM v2–v5 drafts in `_superseded/`; no live file broke. **Why:** the Mac was 97% full. The brain turned out to be under 1% of it; the space came back from Dropbox online-only, the macOS installer (used for the macOS 27 upgrade) and leftover app data, which took the Mac from 6.8 GB to 64 GB free (`df`, 2026-09-22). → [skill](../my-skills/tidy-brain/instructions.md) · [removed list](archive/tidy/2026-09-22-removed.md)

**Agent models stay as they are** · Evan, 2026-09-22 ("keep the models as is for now"). No agent file sets a model, so every agent runs on the session's model (Opus 5 today).

**Beau recommendation, pending Evan's OK: `rolling-boil` pauses at a trigger, `18qt-004` pauses Sept 25, no budget changes anywhere** · Beau, 2026-09-22. **Facts** *(Finn, Meta + Shopify, 2026-09-22)*: `120qt-performance_rolling-boil` `52508008680391` $178.58 lifetime, 0 Meta, 0 tagged, $59.16 on Sept 21 (vs ~$7/day) · `18qt-004` `6998222424787` $556.72 Sept 1–21, 0 tagged, 8 Meta ($69.59), 1 Meta Sept 15–21 on $207.27 · 18 QT tagged CAC $118.01 (7 days) / $151.93 (Sept 1–21) vs $73–$100 ceiling; every 18 QT ad under the $189 kill line. **Calls:** (1) rolling-boil pauses when lifetime spend passes **$389 (2× the $194.58 Platinum ceiling) with 0 Meta purchases**, ideally via a Meta automated rule on that ad only; not now, since zero on less than one ceiling of spend proves nothing and it's the only Triple Jet placement. `crowd-math` `52507989521591` and IW's $100/day CBO unchanged even if it fires; the Oct 2 read stays on the Sept 18 window. (2) `18qt-004` paused **Sept 25 in the same edit that adds Tailgate A + B** (alone if the kit slips), which replaces Beau's earlier "no pauses" line. `18qt-001`, both 18 QT BPM videos, `18qt-TOF` $50 and BPM budgets unchanged. Nov Holiday UGC `6855622474387` is reviewed at the Oct 1 BPM edit. **Why:** the $189 kill line is the 18 QT break-even on Meta's count; the ceiling is the 20%-net bar on Shopify's. Between them nothing gets killed and nothing scales. The ceiling governs money, the kill line is the automatic off-switch. **Proposed kill-table addition:** off at 3× the incremental ceiling with 0 tagged new customers (taggable ads only), 2× if Meta is also at 0. → [Beau](../my-work%20(outputs)/internal/reports/2026-09-22-meta-calls-beau.md) · [Finn](../my-work%20(outputs)/internal/reports/2026-09-22-meta-ad-review-finn.md)

**Unexplained kit `updatedAt` bumps: don't chase** · Evan, 2026-09-22 ("not a big deal, if it happens again then we can look into it"). The tailgate bump was a stock refresh from a component sale; the one turkey-kit bump with no matching part is left alone unless it recurs.

**UpPromote auto-approve delay set to 30 days** · Evan, 2026-09-22 (his click; the embedded app ignored ROUX's Chrome clicks). Auto-approve itself stays on.

**UpPromote trimmed to one switch and one text** · Evan, 2026-09-22. Do: auto-approve delay 0 → 30 days. Keep the sign-up form public ("i don't see why it would be a large deal especially if they are getting sales even if it is only a few"). Skip the payments export, the Google-detection and draft-order settings, and the cleanup. The Jay text is held until Wed Sept 23 morning (Jay out of office Sept 22). Supersedes Beau's changes 3–5 in the [checklist](../my-work%20(outputs)/internal/reports/2026-09-21-uppromote-settings-and-jay-text-beau.md).

**Patent-number rule softened to a preference** · Evan, 2026-09-22 ("the patent number is fine there, lets make that more of a suggestion than a hard no to cross in the brain"). Creative rule 10 now prefers the shield logo over a written number on ads, posts, stories and captions; writing it out is a judgment call, never a block or a re-flag. Product pages writing it out were already exempt (ROUX flagged the kit pages by mistake). Updated: creative instructions, creative README, content-week format, how-we-sound, board landmine, post-scheduler linter (`patent-number` error → warning, tests 50/50 + 37/37).

**Overnight kit edits explained** · ROUX, 2026-09-22 (Shopify read-only). Order #17503 (leg extensions, 02:28:05 CDT) → Leg Extensions product updated 02:28:17 → both tailgate kits 02:28:26–27: a component sale refreshes the kit's stock. Price, copy, photos, variants, tags and metafields unchanged since Sept 20–21. Shopify's product events log only create/status, not edits.

**Kit code line softened; `HIGH15` off** · Evan, 2026-09-22 ("soften the FAQ line… Biljana has given the go-ahead to turn off HIGH15 and i have deactivated it in Shopify"). "Codes don't apply to it" → "most (discount) codes won't apply to it" on the tailgate FAQ metafield and all three kit descriptions (written by ROUX on Evan's yes, read back in Shopify 07:48–07:49 CDT). **Why:** `FIRSTR10OFF` and the influence.io reward codes are set to all items and do reach the kits, so "no" was false. `HIGH15` reads EXPIRED, ended 2026-09-22 07:44 CDT (Shopify read-back), which clears the last kit blocker. Copy files updated to match: [pdp](../my-work%20(outputs)/content/website/2026-09-16-kit-pdp-copy.md) · [metafields](../my-work%20(outputs)/content/website/2026-09-16-kit-metafield-copy.md).

**Brain cleanup after the move** · Evan, 2026-09-22. Old Desktop copy deleted by Evan (iCloud had truncated 18+ files in it; nothing unique); merged UpPromote worktree removed; `.claude/settings.json` read path moved to `~/ROUX-AI-Brain/ROUX`. Health check: no damaged files in the brain, ROUX OS, scheduled tasks, Obsidian and the inbox alias all on the new path.

**UpPromote: auto-activate stays ON, and no deeper digging** · Evan, 2026-09-21 ("we are going to leave auto activate affiliates on… lets also not dig too deep into up promote, it is not a large part of our business"). Beau's change 1 is dropped and the Jay text loses its manual-approval line. The two follow-up Finn reads (draft orders, Google-flagged arrivals) are dropped. What's left: the two switches, if Evan wants them, and the one text to Jay. Don't re-raise it.

**UpPromote read done from Evan's exports: payouts don't match Jay's line; settings checklist and one Jay text drafted, nothing changed** · ROUX (Finn, Beau, Nova), 2026-09-21, on Evan's request. **Facts** (UpPromote referrals export, Finn, re-run by ROUX): $11,718.37 commission Paid on referrals dated 2025-09-11 to 2026-09-10 vs Jay's ~$4k · 8% → 5% on 2026-01-15, program-wide · denied $0, unpaid $44.11 · paid on Shopify net · 523 orders match the Shopify tags. **Tested and ruled out** as the gap's cause: denials, unpaid balance, rate, base, clawbacks, order mismatch. **Not testable from the exports:** payout dates and what Jay books to the line, which is question 1 in the text. **Recommended, Evan's clicks:** auto-activate OFF, auto-approve delay 0 → 30 days, hide the sign-up form from search ON; Google Ads detection to hold-for-review only if UpPromote offers it. Everything else waits for Jay and for after Oct 31. The ROUX OS importer was fixed on the real files (xlsx; the Paid tile showed a false $0.00). → [Finn](../my-work%20(outputs)/internal/reports/2026-09-21-uppromote-payout-reconciliation.md) · [Beau](../my-work%20(outputs)/internal/reports/2026-09-21-uppromote-settings-and-jay-text-beau.md)

**Inbox drop spot: a "ROUX Inbox" alias on the Desktop, not a Dock item** · Evan, 2026-09-21. **Why:** Evan liked dropping files into the brain from the Desktop; the brain now lives off it (`~/ROUX-AI-Brain/ROUX`), so a Finder alias gives the same drop spot without iCloud syncing the brain. A Dock folder was added and removed on his call.

**Kit checks run by ROUX, not Evan** · Evan, 2026-09-21 ("lets run the kit checks"). Results on the board (Now #1): `HPC10` excludes kits via the `Bundle` tag; the FAQ renders; all-items codes still reach kits, contradicting the FAQ line; the checkout test waits for the kit to be ACTIVE.

**The brain lives in `~/ROUX-AI-Brain/ROUX/`, off the iCloud Desktop** · Evan, 2026-09-21 ("yes, move the brain to ~/ROUX-AI-Brain"). **Why:** the Mac is 96% full (8.3 GB free, `df`, 2026-09-21), so iCloud's Optimize Mac Storage was pushing Desktop files online-only. Right after the root rename, 2,305 brain files were online-only, including `CLAUDE.md` and `decisions.md`; reads timed out and ROUX OS returned 500. Timing points at the rename; the cause was not proven. **What:** every file downloaded (0 online-only, `git fsck` clean), copied with rsync (2,778 files both sides, `diff -rq` identical), then repointed: scheduled tasks, Obsidian's vault list, Claude's project memory, ROUX OS reinstalled. The old copy is on the Desktop as "ROUX-AI-Brain (OLD copy - moved to home folder 2026-09-21)" for Evan to trash once he is happy. **Open, Evan's:** the brain now has no off-machine copy (no Time Machine destination, no git remote); a Time Machine drive is the recommended fix. `~/Desktop/HPC/` stays on the iCloud Desktop and can still be evicted.

**Root folder renamed to ROUX** · Evan, 2026-09-21 ("rename the root folder to ROUX"). `~/Desktop/Atlas-AI-Brain/Atlas AI Brain/` → `~/Desktop/ROUX-AI-Brain/ROUX/`. The wrapper folder was renamed too so no "Atlas" is left in the path; it still holds only the vault and the setup PDF. Updated with it: the Obsidian vault name (now "ROUX", in `config.json` and Obsidian's own vault list), the scheduled tasks' working-folder lines, ROUX OS's launchd job (reinstalled from the new path), Claude's project memory (copied to the new project key). **Left:** `.claude/settings.json` still names the old path in one read-permission rule; it now grants nothing, and permission rules are Evan's to change. Old paths in this file and in git history are history.

**ROUX OS becomes a place to act, not just read: Affiliates, Launches, Waiting, Approvals, Posts and Score** · Evan, 2026-09-21 ("you work quickly and I become the bottleneck… I'd like some more interactive things in there… an affiliate monitoring area… editable"). **Why:** Beau's read of the board: every yes cost Evan a chat session, and nothing chased other people unless he asked. **What:** Nova built OS 0.2 as local code with no model runs. It now writes `capture.md`, `launches.md`, `approvals.json`, the affiliate store and a post's approved mark, and still never the board, the plan or this file. **The rule that holds:** an approval of kind `live-write` only ever becomes "queued". It is not permission to change Shopify, Meta or Google; the session still asks Evan. Nothing in the OS can send, schedule or publish. `/prime` reads resolved approvals; `/wrap` folds them in. **Killed on Beau's advice:** a quick-ask box (the page is not a chat, Evan 2026-09-14). → [how to use it](../my-files%20(knowledge)/how-to-use-roux-os.md)

**Affiliate program: read it, don't fix it yet; no plan time before Oct 31** · Beau's recommendation, 2026-09-21, from a read Evan did not ask for (it surfaced while Pete built the affiliate roster). **Facts** (Shopify, Finn, 2026-09-21, two methods): 523 orders · $237,573.36 net carry an UpPromote tag since 2025-01-01, across 41 names; 4 are on Evan's list (93 orders · $31,991.35, none in 90 days); 89 orders ($43,925.22) came last-click from 11 deal sites; 7 of 8 sampled orders from the four real creators carried BM Digital paid-ad UTMs. **Conclusions, not proven:** deal-site accounts are taking last-click credit; we paid commission on some orders our own ads produced (ceiling $1,599.57, calculated). Jay's ~$4k commissions line does not reconcile with 5% of tagged sales inside his window (≥ $8,633, calculated); cause unread. **Next is Evan's:** the UpPromote exports, then one text to Jay. Not yet Evan's decision; logged so it is not re-derived. → [Finn](../my-work%20(outputs)/internal/reports/2026-09-21-affiliate-tagged-sales.md) · [Beau](../my-work%20(outputs)/internal/reports/2026-09-21-affiliate-program-read-beau.md)

**The pulse is button-only, said for the third time, and now fixed at the source** · Evan, 2026-09-21 ("once again the morning pulse is not broken… fix everything so that this doesn't come up again"). **Cause, checked:** `/pulse`'s first line still read "runs headless every morning", and nothing told `/prime` that an old `today.md` is normal. Both fixed, plus the OS README, `pulse.sh`, `connected-apps.md` and a memory. An old `today.md` is never reported as a fault. Same message: **the weekly "followers most active" read is dropped** from `/content-week`.

**Folder structure stays as it is** · Evan, 2026-09-21 ("if the brain is already set up in the most efficient way then disregard"). An audit found the layout sound; the waste was in what gets re-read. Done: `/prime` no longer re-reads `CLAUDE.md`; the naming rule in the manual now matches the 169 files that use `yyyy-mm-dd-slug`; BFCM drafts v1–v5 moved to `_superseded/`. Offered, not done: monthly rollover of this file from Oct 1, a size cap on the board, trimming history out of `connected-apps.md` and `what-we-sell.md`.

**Weekly FB/IG posts go through a Nova-built scheduler: a manifest and a preflight gate in front of the same Chrome run** · Evan, 2026-09-21 ("have Nova build a scheduler"; the board's open question was Chrome, by hand, or a scheduler. Beau advised keeping Chrome as it was; Evan's call stands). **What it is:** each week's `PLAN.md` carries a small `schedule` block per piece, and `post-scheduler` builds `schedule.json` from it: captions, files, time, Evan's approval in his words, status `draft → approved → queued → scheduled → verified` (or `failed` / `dropped`), and the Business Suite read-back. `preflight` checks files, pixel sizes, the 10 MB upload cap, dates, clashes, caption limits and the copy rules (read from the rule files), and the tool refuses to queue anything unapproved or failing. An approval covers the exact captions, files and time; change one and the piece goes back to draft. **What stays manual:** Evan approves every piece (chat, or an Approve button in ROUX OS that marks the manifest and nothing else); the scheduling itself is still Claude in Chrome in Business Suite, now a runner that takes only approved, clean pieces, records each one, and stops after two UI failures on a piece; times are real clicks; anything over 10 MB is Evan's upload; Schedule never Publish, Boost off, never the Ads connector, no credentials. **Graph API assessed and not used:** Facebook can be scheduled by API, Instagram cannot (no native scheduling, JPEG at a public URL, the Mac awake at post time), so it isn't worth it at six posts a week; no API code was written. **Backfilled:** the Sept 21–27 week's record from its plan (all 7 verified; Monday's patent-number caption shows as waived per the entry below). The Sept 28 week is built with every piece unapproved. → [tool](../my-workflows%20(automations)/live/post-scheduler/README.md) · [runner](../my-skills/content-week/business-suite-scheduling.md) · [API assessment](../my-workflows%20(automations)/live/post-scheduler/API-OPTION.md)

**The system and main AI are now ROUX (was Atlas); the head-of-marketing agent is now Beau (was ROUX)** · Evan, 2026-09-21 (ordered in session; carried out by Nova the same day). **Why:** Evan wants the AI he talks to, and the whole system, called ROUX. That name was taken by the head-of-marketing agent, so the agent became Beau. Same lane, same rules, only the name changed. **What changed:** done in two passes, agent first. Pass 1: every "ROUX" → "Beau" (agent file `.claude/agents/beau.md`, command `/beau`). Pass 2: every "Atlas" that meant the system → "ROUX" ("Atlas OS" → "ROUX OS", "Tell Atlas" → "Tell ROUX"). Renamed: `live/atlas-os/` → `live/roux-os/`, `how-to-use-atlas-os.md` → `how-to-use-roux-os.md`, the OS spec → `2026-09-14-roux-os-plan.md`, launchd labels `com.atlas.*` → `com.roux.*` (old job uninstalled, new one installed, still on `localhost:4242`, pulse still button-only), the `X-ROUX` header, `ROUX_PULSE_MODEL`, `roux-upload-input` in the Business Suite helper. Claude's memory files and the scheduled-task prompts got the same two passes. ⚠️ **This one time the append-only rule was broken on purpose: every "ROUX" written before 2026-09-21 was rewritten to "Beau" in place, in this file, `archive/`, reports and plans included.** Left alone, each old "ROUX" would now read as the main AI, which would be false. So in these files "ROUX" always means the system. In git history before this commit, "ROUX" means the agent now called Beau and "Atlas" means what is now ROUX. **Left on purpose:** the root folder `~/Desktop/Atlas-AI-Brain/Atlas AI Brain/`, the Obsidian vault name and every absolute path that contains them (the live session, Claude's memory path, the scheduled tasks and the OS depend on it; renaming it is a separate step for another day) · "Roux Meral", a real Facebook profile name · "Atlassian" and a customer email in the discount-code export (data) · the OS's old ignored logs · a few lines in `install.sh` / `uninstall.sh` and one in `app.js` that still name `com.atlas.*` / `atlas.*` so an old job or old saved browser state gets cleaned up rather than orphaned. → [ROUX OS README](../my-workflows%20%28automations%29/live/roux-os/README.md)

**Content week: kit lines follow the month plan's live dates by default; the Sept 28 week waits for shoot material** · Evan, 2026-09-21. *"You tell me on the kits being live, it should be in the plan."* So kit tails and kit story variants run by default when PLAN.md has the kit live, and come out only if a go/no-go says no. No more asking each week. The Sept 28–Oct 4 week gets final approval after the Sept 23 shoot, once Evan's photos and video are sorted into it. Thursday runs Robert's 60 QT review over SamTC's (Evan's pick; his 16.5 lb bird sits above the USDA 12 lb line on Wednesday's carousel, accepted). → [plan](../my-work%20(outputs)/content/social/2026-09-28-week/PLAN.md) · [skill](../my-skills/content-week/instructions.md)

**"Krewe," not "crew," whenever the copy means a group of people** · Evan, 2026-09-21. *"Use the south Louisiana version 'krewe' from now on to flash a little of our culture."* It covers our own team ("a krewe of about twelve") and a customer's cook team. A film or camera crew (Garrett) stays "crew." Written into `how-we-sound.md` (words we use) and the content-week format change log. The Sept 28 week's captions are updated; posts already scheduled for Sept 22 still say "crew" and were left alone. → [how-we-sound](../my-business%20(context)/how-we-sound.md)

**Patent number: shield logo yes, written words never, on all creative and content** · Evan, 2026-09-21. The HPC shield logo with the patent number printed on it can go on any ad, post, story or carousel. The number is never set as text anywhere on them, fine print and captions included. This widens rule 10 from "ads" to all content. Guidance that still treated a patent line as fine print is fixed (creative rule 7, content-week format, how-we-sound, standing rules). **This week's scheduled posts stay as they are** (Evan: "everything is good as is"), including Monday's graphic and caption, which carry the number. **Website pages are exempt** (Evan, same day, "website pages are fine") → [creative rule 10](../my-skills/hpc-ad-creative/instructions.md)

**Kit photos: one shared gallery per kit, no per-option images** · Evan, 2026-09-21 ("we don't need to do that"). The tailgate and one-bird kit shots show a basket, including on the no-basket options; accepted. Photos attached the same day, 8–9 per kit → [build record](../my-work%20(outputs)/internal/2026-09-16-kit-build-record.md).

**Skills get offered mid-session, on the second run** · Evan, 2026-09-21 ("yes change it"). The rule used to be to propose at /wrap only, so photo filing ran three times by hand before it became a skill. Now: the second time a procedure runs by hand, ROUX offers the skill right then, and builds it on Evan's yes. When Evan corrects how a skill ran, its instructions get updated that same session. /wrap step 5 stays as the backstop. Written into CLAUDE.md (session rules) and `.claude/commands/wrap.md`.

**Product photo filing is now a skill, `/file-product-photos`** · Evan, 2026-09-21 ("make sure this is a skill now"). It came from three runs by hand (commercial 80/100/120 gal, 140 gal, kit items). It carries Evan's naming words, the rule to rename his originals, and the Vision cutout script → [skill](../my-skills/file-product-photos/instructions.md).

**Kit item photo names; the 18 QT and turkey fryer bottoms are built the same way** · Evan, 2026-09-21. 11 kit shots filed as cutout + studio, named from the kit build record. The burner close-up is the **18 QT** bottom (Evan), and every turkey fryer bottom is built the same way, so it can stand in for them. Filed to what-we-sell.md → [asset index](../my-skills/hpc-ad-creative/assets/ASSET-INDEX.md).

**Sept 1–16 Meta baseline restated to $156.90 per Shopify-tagged order; Thursday scoreboard task pointed at match rules 1–5** · Evan, 2026-09-21 ("yes to both"). Under rule 5 (Meta Shop cart links) the baseline goes from 16 orders at $245.15 to 25 at $156.90, on the same $3,922.45 spend (Finn, Shopify GraphQL, 2026-09-21). PLAN.md shows both figures. Nova adds the rules pointer to the `month-plan-scoreboard` task so Thursday compares like with like. The kill line for `Video_UGC/Review18qt Fryer` reads on the ad that spends, `6772110395587` ($52.62 per Meta purchase Sept 7–20, under $189); the cart-link ad IDs never spent. → [Finn report](../my-work%20(outputs)/internal/reports/2026-09-21-finn-monday-checks.md)

**140 gal commercial photos: propane, and no burner shot on purpose** · Evan, 2026-09-21. The five 140 gal shots follow the 80/100/120 naming, `140gal commercial - propane - [shot]`. Evan confirmed they're propane and left the burner shot out of the batch on purpose, so don't flag it as missing. Only the basket-open shot carries "regulator", since that's the only frame where the regulator and hose show (inside the basket) → [asset index](../my-skills/hpc-ad-creative/assets/ASSET-INDEX.md).

**Approved: both Beau recommendations below, as written** · Evan, 2026-09-21 ("yes to all three"). (1) #17482 counts as a tagged pot order for the IW Oct 2 read. (2) The Oct 2 read is scored on the **Sept 18 relaunch window**, with since-launch shown beside it. The window is locked now, before the numbers are in. (3) Meta Shop orders are credited to the campaign and ad in their cart link, shown as a sub-line inside BPM, and the Sept 1–16 tagged baseline gets restated under that rule before Thursday's scoreboard. Finn does the prep.

**Beau recommendation, pending Evan's OK: order #17482 (120 QT Powered, $715) counts as a tagged pot order for the IW Oct 2 read; score the read on the Sept 18 relaunch window, with since-launch shown beside it** · Beau, 2026-09-21. **Facts** *(Finn, 2026-09-21 Monday checks)*: #17482, Sat Sept 19, $715 net, `PW120-BTJ-VLV075`, first and last visit tagged `120qt-crowd-math`, first-time buyer. IW since launch $967.97 · 5 Meta purchases · 1 Shopify-tagged. Sept 18–20 $285.42 · 3 Meta purchases ($95.14 each). **Why it counts:** the 2026-09-18 swap turned IW into a test of the two 120 QT ads, and `crowd-math` *is* the 120 QT Powered ad (it shows the welded burner; its ceiling, $195.34, sits in the checkpoint's product table). "Pot, Triple Jet or kit" was written to keep 18 QT and brand-ad orders out, not to separate Powered from Performance. The buyer bought the exact product the ad showed, from that ad's own tag. **Why the relaunch window:** $542.55 of the since-launch spend was `hpc-dark-evergreen`, the ad the Sept 18 call removed; it tells us nothing about 120 QT pots. Since-launch Meta CPP ($193.59) reads Hold; Sept 18-on ($95.14) reads Continue. The window gets fixed now, before Oct 2, so the choice isn't made after seeing the numbers. **Caveat for the read:** "Continue" on the terms is not "under ceiling": $285.42 per tagged order is above the $195.34 incremental ceiling for a 120 QT Powered. No change to the campaign before Oct 2. → [Finn Monday checks](../my-work%20(outputs)/internal/reports/2026-09-21-finn-monday-checks.md) · [checkpoint](../my-work%20(outputs)/internal/reports/2026-09-18-iw-lookalike-checkpoint.md)

**Beau recommendation, pending Evan's OK: Meta Shop orders are credited to the campaign and ad in their cart link, shown as their own sub-line inside BPM, and the Sept 1–16 baseline is re-stated under the same rule** · Beau, 2026-09-21. **Facts** *(Finn, 2026-09-21)*: 4 orders, $1,422.20, Sept 11–16, Facebook & Instagram channel, no journey, cart-link `campaign_id=6772105419387` (`BPM_TOF_Manual`), `ad_id`s named `Video_UGC/Review18qt Fryer` on Meta. Channel orders by week: Aug 31 7, Sept 7 4; 0 of 21 orders Sept 18–20. **Why credit them:** the tag is on Shopify's own order record, not a Meta claim, so this is still a Shopify-tagged count under the source-of-truth rule, just a new match rule (rule 5: cart-link `campaign_id`/`ad_id`, used only when the journey has no tag; an order counts once, journey first, so #17466 isn't double-counted). **Why a sub-line:** the field is deprecated and truncated at ~250 characters, so when it breaks the scoreboard has to show what moved. **Why re-state the baseline:** the $245 Sept 1–16 Shopify-tagged figure in PLAN.md was built without these orders; comparing a new-rule week to an old-rule baseline would fake an improvement. **Kill lines:** unchanged. The 18 QT kill line runs on Meta's own 14-day cost per purchase; these orders can only lower a cost per order, never raise it. Whether Meta counts Shop orders as purchases is untested. **Unconfirmed:** that the Aug 31 and Sept 7 week orders carry BPM IDs (Finn checked only the 4). → [Finn Monday checks](../my-work%20(outputs)/internal/reports/2026-09-21-finn-monday-checks.md)

**Commercial boiler photo names: "basket open", "burner", "regulator", and they're propane** · Evan, 2026-09-18. The 18 new 80/100/120 gal commercial shots (cutouts + studio) follow `[size]gal commercial - propane - [shot]`. Evan's words replace ROUX's first pass: the dropped front panel is "basket open" (not "front door open"), the burner shot is "burner" (not "burner underside"), and "regulator" covers the hose and regulator. The units in these photos are propane, not natural gas. Evan kept his inbox originals for other use → [asset index](../my-skills/hpc-ad-creative/assets/ASSET-INDEX.md).

**Pot static A approved: cream, all sizes** · Evan, 2026-09-18. With B approved earlier the same day, both pot statics are filed in the library, linking to the Platinum Boiling Bundle. Closes the last creative job in plan week 1.

**Rule 10 narrowed: the patent number is banned as written copy, not in the logo; pot static B approved, A goes cream** · Evan, 2026-09-18. "I meant, don't use the patent number as word copy. You can use the colored shield logo with the patent number on it." Creative rule 10, the logo notes and the board landmine are updated. **All three B ("Look closer") sizes are approved** for pot retargeting, linking to the Platinum Boiling Bundle. **A ("The fast part is the pot") uses the cream backdrop** with the coloured shield, rolled out to all sizes, pending Evan's final OK.

**Garrett shoot moves to Wed Sept 23; the Performance-on-Triple-Jet image is always the Platinum Boiling Bundle** · Evan, 2026-09-18. **Shoot:** Evan shops Tue Sept 22 after work; board, PLAN, key dates, shoot plan and shopping list updated. Turkey demo is still due live Oct 1, one day tighter. **Bundle rule:** creative showing the 120 QT Performance on the Boil Boss Triple Jet links to and names the Platinum Boiling Bundle (swap: Ultimate Boiling Bundle), never a Powered pot → what-we-sell.md §1A + creative claims. Pot statics A and B both link there. **"Made in USA" SEO titles: Evan says don't worry about them.** ROUX stops raising them. *(For the record: Platinum's SEO title does read "…Made in the USA…", Shopify read 2026-09-18.)* **Statics:** B approved at 1:1 and 1.91:1. B 9:16 gets an orange copy stripe only, with blueprint below. A: centre the products vertically, and try softer backdrops than the orange.

**`RT - Viewed 18 QT - 30D` built on the old pixel; pot statics A + B kept, C scrapped; seafood-seasons sheet filed** · Evan, 2026-09-18. **Audience:** Evan said "go ahead and build that audience". ROUX built `52510298205791` (URL contains `18-qt`, 30 days, prefilled) on pixel `491960645999331`, not the `1861969194014116` the Sept 11 plan named. **Why:** every `1861969194014116` audience reads 20–20 (Finn, 2026-09-17), and `Website Visitors 30D (All)`, the pots set's inclusion, lives on the old pixel. Building the 18 QT audience there puts the inclusion and the exclusion on the same pixel. It was still populating (status 441) at 09:42 PT. **Statics:** Evan kept "The fast part is the pot" (A, for the IW cold test) and "Look closer" (B, for pot retargeting) and scrapped "Take care of it" (C). **Tailgate C retargeting:** Beau ruled C replaces `rt-18qt-fry-it-all` rather than being added beside it; if the kit isn't live Sept 28, fry-it-all runs until it is. **Pulse:** button-only by Evan's 9/14 decision; the board line calling it broken was wrong. **Seasons sheet:** Jay's printed seafood-season sheet, filed as reference, unconfirmed → [seafood-seasons-by-region](../my-files%20(knowledge)/hpc-reference/seafood-seasons-by-region.md).

**Drop folder `my-inbox (new inputs)/`; copy rules don't apply to photo signage; ROUX app icon is the colored shield** · Evan, 2026-09-18. **Drop folder:** Evan drops photos, Excel files and docs there with any name. ROUX renames and files each one by the routing table in the folder's README, and /prime mentions anything waiting. **Photo signage:** the patent-pending, Made in USA and warranty rules cover words ROUX writes on creative, not real signage in a photo ("It's just an image"). So the team cookoff photo stays uncropped even though its yard sign says "patent pending". **App icon:** it was blank because it used the white logo on white. It's now the colored shield on a white square, set by Evan through Get Info, because macOS blocks ROUX from changing installed apps. The page also serves an `apple-touch-icon`, so re-adding the app from Safari keeps the icon.

**Coalition moves the Google Shopping/PMax feed to DataFeedWatch, and Coalition owns the account** · Evan, 2026-09-18. Coalition (Basecamp) asked to manage the feed through DataFeedWatch to rewrite titles, descriptions and categories for Google, citing Google retiring the legacy Content API; free under 5,000 products (Coalition's claim, not checked). It changes only what Google sees, not the Shopify store or the Meta catalog. **Why Coalition owns it:** Evan's call; if HPC ever parts ways with them, the plan is to ask for admin access then. Evan's reply approved it and asked what access they need and whether the feed will have a gap during the switch. He did not include the feed-copy rules ROUX drafted (QT size in titles, both warranty qualifiers, no competitor names).

**Event giveaway sign shows the 30 QT full kit at a $475 retail value** · Evan, 2026-09-18. Shopify lists the same kit (`PW30-VLV075-TFR-B-SBI`: pot, lid, basket, steamer rack, turkey rack) at $462.50 on the turkey-fryer listing and $475 on the powered-pot listing; ROUX used $462.50, Evan chose $475. The two-price SKU sits in the board's Shopify cleanup list. → [sign](../my-work%20(outputs)/content/other/event-giveaway-sign/2026-09-18-30qt-kit-giveaway-sign-letter-v3.pdf)

**The batched Jay text is closed, and nothing is left to ask** · Evan, 2026-09-18. **Jay signed off on BFCM**, which confirms the line in the entry below. **Low-ticket ad spend held at ~52%** ("looks good"); the real cap is set in the November plan. **The 30 QT November stock question is dropped** (not needed). **Labor Day net $40,853.33** has been given to Jay and Robert by Evan. The second pixel `491960645999331` was already settled (an old marketing company's, keep using it, entry further down); ROUX re-asked it from a stale PLAN.md line, now fixed. **The code-exposure rewrite is dropped** ("we can cross that bridge if we need to"). The 322-of-358 all-items count and the auto-generated `FB-EMAIL-*` codes stay on record in Finn's read, not acted on.

**IW lookalike Day-7 checkpoint: continue, with `hpc-dark-evergreen` paused and the 120 QT creative swapped** · Evan, 2026-09-18. **Why:** the agreed rule fired ($682.55 spent, 0 Shopify-tagged orders, past the $73 ceiling). Dark-evergreen took 79.5% of spend at $271 per Meta purchase, its tags never reach Shopify, and it still said "cast", so it came off. The two 120 QT ads had only $140 between them, so they get the real test at $100/day. Read Fri Oct 2 on the PLAN.md terms. → [checkpoint report](../my-work%20(outputs)/internal/reports/2026-09-18-iw-lookalike-checkpoint.md)

**BFCM offer sent to Coalition (Connor, Basecamp) and Biljana** · Evan, 2026-09-18. The offer is `BLKF26`, 10% sitewide, $100 minimum, Nov 23 to Dec 1, excluding kits, gift cards and Scratch & Dent. The Coalition message states Jay signed off *(ROUX has no separate record of that sign-off)*. Both ask for no BFCM mention before Mon Nov 16. **Evan's calls on the wording:** no landing-page link, only "done around the beginning of November", to leave room to add to the page; and no turkey-fryer reasoning, because "customers can order whatever, whenever." The landing page moved to v7 with two false lines fixed: "less than buying the welded version" (Performance + Triple Jet costs more than Powered) and "no exceptions within the category" (kits are excluded). → [v7](../my-work%20(outputs)/content/website/2026-09-18-bfcm-sitewide-draft-v7.html)

**Tailgate kit ad: all three concepts approved, all three run** · Evan, 2026-09-18. A (lineup) and B (photo) run cold in `18qt-TOF` once the kit is live; C (ticket) runs in 18 QT retargeting from Sept 28. There is no new budget, and Beau confirms the split. "No refunds" was cut from C because it could read as the real return policy. → [library log](../my-skills/hpc-ad-creative/work/creative/library/LIBRARY-LOG.md)

**Pixel `491960645999331` is an old marketing company's, and we keep using it** — Jay via
Evan, 2026-09-17. "Use it if it still works and can be helpful." It does: it sits in our own Shopify
Business Manager portfolio, is named "4392736013287 Pixel" after the ad account, was created
2022-05-10, fired as recently as today, and carries the 6,800–8,000 person `Website Visitors 30D (All)`
audience that the Sept 28 pot retargeting uses. ⚠️ Browser events only, **PageView and AddToCart
but no Purchase in the last 7 days** *(Meta connector, 2026-09-17)*, so it's a retargeting pool, not a
conversion source. Conversions stay on `1861969194014116`, which also gets server events. It also
fires on `meetings.hubspot.com` and `info.hpcookers.com`. Question closed.

**The kits are built by Evan in the Bundles app; ROUX finishes them through the connector** —
Evan, 2026-09-17. Three bundles: Tailgate, Turkey 30 QT, Turkey 60 QT. Steps and exact components →
[rebuild steps](../my-work%20(outputs)/internal/2026-09-17-kit-rebuild-steps.md).

**The skimmer was never an inventory fault** — Evan, 2026-09-17. "We had just got in more
skimmers, so they needed to be put in for you to see them." `SC-7R` reads 30 on hand and sells on the
storefront (checked 2026-09-17). It never blocked the kits.

**`SMS25` can be deactivated now; `HIGH15` waits** — Biljana via Evan, 2026-09-17: she switched
SMS25 and needs a few more days on the HIGH15 flows. ⚠️ The landmine says no kit goes live while
either is active, so **HIGH15 is now the thing standing between us and the Sept 25 tailgate launch.**

**Group A copy fixes dropped entirely** — Evan, 2026-09-17. "We don't mess with SEO stuff,
that's Coalition's lane, we don't do any of that. So don't do anything from that section." That covers
the whole Group A sheet, including the product-page and collection items. The live "Made in the USA"
and warranty lines on the 18 QT page, `fryers` collection and Platinum no longer block the tailgate
kit. Group B (turkey) is the same kind of work, so it's not raised either unless Evan says otherwise.
The sheet stays on file, unused: `my-work (outputs)/content/website/2026-09-17-group-a-copy-fix-sheet.md`.

**Turkey kit becomes two products; "Two-Bird" leaves the title** — Evan, 2026-09-17. The
Bundles app can't offer a 30 QT / 60 QT choice on one page, since those pots are separate products.
"Two-Bird" can go in the description or elsewhere, not the title.

**Two new creative rules: no patent number on ads; type size is a floor, not a target** —
Evan, 2026-09-17, reviewing the first tailgate kit ad, which he rejected as a knockoff of past ads. Rule 10 and the
tightened rule 7 are in `my-skills/hpc-ad-creative/instructions.md`.

**Kits get rebuilt in the Shopify Bundles app, replacing the connector-built drafts** —
Jay via Evan, 2026-09-17. Jay approved how the kits look but said they were built the wrong
way: built through the connector, they would mess up inventory. The Bundles app is the
standard. Evan updates the photos once the rebuild is done. The rebuild plan and the new IDs
go in the [build record](../my-work%20(outputs)/internal/2026-09-16-kit-build-record.md).
This supersedes the variant-level build choice of 2026-09-16 (below).

**Live ads stay on for copy errors unless they are bleeding money** — Evan, 2026-09-17.
"If it's working right now then no need to change anything for a couple of copy errors."
So the plan's week-1 job to turn off the `Video_Jay 30qt (turkey) Fryer Demo` ad
("patent-pending", crawfish on a fryer) is dropped. The rule for turning an ad off is its
performance kill line in PLAN.md, not a copy error. New ads are still held to the copy rules.

**First month plan locked: Sept 17 – Oct 31, 2026, with targets; a new plan every month from here** — Evan, 2026-09-17: approved all of Beau's v2 recommendations ("all the recommendations look good"). **Why:** Evan wants ROUX working toward targets instead of finding things to do. **Headline target:** consumer sales (Shopify net minus commercial cookers, other commercial gear, custom jobs, Navimow) ≥ $110,485 vs last year's same window, stretch $123,000; total ≥ $169,339; turkey fryer sales ≥ $32,973 (Oct 15–31 ≥ $23,124); turkey fryers buyable every day in October; tailgate kit share and pot pace tracked; Meta read two ways, ≤ $350/day. Approved with it: IW becomes a 120 QT-only test (dark-evergreen off) · retargeting Sept 28 · tailgate kit go/no-go Sept 24, turkey kit Sept 30 · live 30 QT demo ad off · turkey weight decided Oct 15, live Oct 19 · every new ad fully tagged. **Still needs Jay:** low-ticket spend held at ~52% (not a 25% cap) · no public BFCM before Nov 16 · 30 QT stock/why it stopped Nov 2025. Meta writes still need Evan's yes at the time. **Cadence:** `/month-plan` skill; scheduled draft on the second-to-last day of each month (Oct 30 → November); Thursday scoreboard. Two working rules from the same review: calendar events never move plan work (Evan works M–F 6:30a–3p), and plans only ask Evan about decisions that need him or Jay, in plain words. → [PLAN.md](PLAN.md) · [draft v2](../my-work%20(outputs)/internal/2026-09-17-month-plan-sept17-oct31-DRAFT-v2.md)

**Three standing checks on every piece of creative: product centred by the product, no gray box around a cutout, right size for the placement** — Evan, 2026-09-16, as notes for future content weeks. Written as creative rules 2 (sharpened), 8 and 9 in `my-skills/hpc-ad-creative/instructions.md`, mirrored in `how-we-sound.md` and the content-week pre-flight. **Cause of the gray box, tested the same day:** a drop-shadow on `.pbox img` gets clipped by `.pbox` into a rectangle; moving it to `.pbox` cut the box lines on the Powered frame from 71% to 3% of the bottom edge. `carousel.py` and `brand.css` fixed; `check-centering.py` gained `--band` so any layout can be measured. The approved Sept 21–27 posts stay as scheduled (Evan: "we'll keep it as is").

**All customer-facing creative must be easy to read at phone size; only fine print may go small** — Evan, 2026-09-16: *"we don't want the customer straining their eyes when reading our content, the only exclusion is if there is a fine print line like the 'boil times vary' line."* Written as creative rule 7 (`my-skills/hpc-ad-creative/instructions.md`, mirrored in `how-we-sound.md` and content-week rule 10): headlines 72px+, body 36px+, every other informative line 30px+ on a 1080-wide frame, fine print 20px floor, checked at ~380px wide before showing. Does not reopen the approved Sept 21–27 week. `carousel.py` defaults and the week-1 templates sit below the bar and get raised on next use.

**Repeatable procedures become skills: `/wrap` now proposes one at every session end, and two were built the same day** — Evan, 2026-09-16. **Why:** Evan asked whether skills were being made as we go. The honest answer was only when asked — since the Sept 2 restructure only `content-week`, `carousel` and the scoreboard migration had been added, while six procedures had been repeated by hand with no skill (campaign checkpoint, showroom cards, discount-code audit, Shopify kit build, product-image library refresh, Garrett shoot plan), and nothing in `/wrap` or `/teach-me` nudged one into existence. Evan's call: add the wrap line, build the checkpoint skill, build the showroom cards skill. **Built:** `hpc-campaign-checkpoint` — Finn pulls Meta (fields verified against the connector) and Shopify tagged orders with a "why is it zero" check, Beau calls continue/hold/cut against the rule agreed before the window, Evan decides; per-campaign terms live in its `campaigns.md`; first run is the IW read on Sept 18. `hpc-showroom-cards` — reprint / add or change / retire; prices checked against Shopify before every print run; the generator was re-run on one card the same day and passed both gates byte-identical to the committed render. **Not built, Evan decides when each next recurs:** the other four (board, Nova's queue). Skill names carry the `hpc-` prefix per CLAUDE.md's multi-business rule. → [checkpoint skill](../my-skills/hpc-campaign-checkpoint/instructions.md) · [campaign terms](../my-skills/hpc-campaign-checkpoint/campaigns.md) · [showroom skill](../my-skills/hpc-showroom-cards/instructions.md) · `.claude/commands/wrap.md` step 5

**The six weekly content slots are a ceiling, not a quota** — Evan, 2026-09-16, on approving the first `/content-week` plan: *"we don't have to post every day but we can if you think it helps, totally up to your discretion."* A slot is dropped when the content is not there, and the plan says which and why. Rule 9 in `my-skills/content-week/weekly-format.md`. Same reply approved week 1 (Sept 21–27) as proposed, all six pieces, for scheduling in Business Suite.

**Organic FB/IG runs on a fixed weekly format, planned every Monday in one session, and ROUX schedules the approved pieces in Meta Business Suite** — Evan, 2026-09-16. **Why:** posting was manual and campaign-driven (nothing posted Sept 8–16, Business Suite), and Evan wants the page to become something people check — so the six slots never change (Boil Math Monday · Shop Floor Tuesday · How-To Wednesday · Word of Mouth Thursday · Friday Fire · Game Day story · Sunday dark), only the content does. **How:** scheduled task `content-week-monday` (Mon 8:00 CT) proposes with rendered previews; Evan's approval of a piece in that conversation is the go for that piece; scheduling is always *Schedule*, never *Publish now*, through Claude in Chrome (the Meta Ads connector has no organic-post tool), then read back in the Planner; Boost stays off. Built as `my-skills/content-week/`; `carousel.py` gained a text-led `tip` frame for how-to carousels. First plan (Sept 21–27) built and proposed the same day, pending approval. → [skill](../my-skills/content-week/instructions.md) · [format](../my-skills/content-week/weekly-format.md) · [plan](../my-work%20(outputs)/content/social/2026-09-21-week/PLAN.md)

**Kits stay drafts until Jay approves the built pages; bundle SKUs say `BUNDLE-` and name the use; every kit page carries the Prop 65 block and two short info metafields** — Evan, 2026-09-16, after seeing the drafts. *"we are just going to keep these kits as drafts for now, we need to talk to jay and get his approval on them first, then we need to figure out how we are going to use them."* **SKUs:** `BUNDLE-18QT-TAILGATE`, `BUNDLE-30QT-TURKEY`, `BUNDLE-60QT-TURKEY` (were `KIT-18FRY-LEGS`, `KIT-30TURKEY`, `KIT-60TURKEY`) — Evan: use "bundle" not "kit", and "tailgate" not "legs", so the SKU says what the thing is for. **Pages:** the California Prop 65 block at the foot of both descriptions in Platinum's markup; `custom.features_benefits` and `custom.frequently_asked_question` filled (Maya's copy, six bullets and six Q&As each, "nothing too long"). **Skimmer:** Evan, same day — the shop has plenty of `SC-7R`, so the −1 in Shopify is a record problem, and he is asking Jay why; the storefront refusing to sell it was confirmed on the live site, not inferred. **How the kits get used** was then settled by the month plan locked 2026-09-17 (entry above): tailgate go/no-go Sept 24, turkey Sept 30. Jay's approval of the built pages is not in the plan's Jay text, so it rides on the board. → [build record](../my-work%20(outputs)/internal/2026-09-16-kit-build-record.md) · [metafield copy](../my-work%20(outputs)/content/website/2026-09-16-kit-metafield-copy.md)

**Three kits built in Shopify as drafts; variant-level bundles; 12" thermometer on the 60 QT; long titles** — Evan, 2026-09-16 ("go, 12\" is right, long titles"). **Why variant-level:** Platinum is a product-level bundle, and that type puts every component in every variant, so it cannot swap the 30 QT pot for the 60 QT Dual by variant. Shopify's variant-level fixed bundle gives each variant its own component list, which is what makes Evan's one-page Turkey Fry Kit possible; at checkout both behave as native bundles with line-item groups. **Consequence accepted:** bundle ownership goes to the app that attaches components, so the Claude Shopify connector owns the kits' components and component changes come through ROUX, not the Bundles app; price, copy, tags, images and status stay editable in admin. **Kept draft** until Biljana confirms `HIGH15B`/`SMS25B` (landmine). **Found on read-back, not acted on:** skimmer `SC-7R` is `availableForSale: false` (−1, deny) and sits in all three kits — a Shopify setting, flagged for Evan/Jay before Sept 25, not a stock claim. The component attach reset the kit variants to DENY; restored to CONTINUE to match Platinum. → [build record](../my-work%20(outputs)/internal/2026-09-16-kit-build-record.md)

**Plugin copy of the scoreboard skill deleted** — Evan, 2026-09-16. Closes the landmine opened the same day (entry above). Checked after the click: the `hpc-scoreboard-report` folder is gone from the Claude app's skills store on disk (`~/Library/Application Support/Claude/.../skills-plugin/.../skills/`), and no other copy exists outside `my-skills/`. The `$181.98` ceiling can no longer be run by mistake. `/hpc-scoreboard-report` now resolves only to `my-skills/hpc-scoreboard-report/instructions.md`.

**BFCM 2026 offer proposed and landing page drafted through v6, both pending Jay's sign-off** — Evan, 2026-09-16. Beau proposed 10% off sitewide, code `BLKF26`, $100 minimum, Mon Nov 23–Tue Dec 1 2026, one offer covering both Black Friday and Cyber Monday — grounded in 2025's actual BFCM Shopify data (core window AOV $478 vs. non-sale November baseline $387; discount rate matched the code) rather than assuming the AOV-drop pattern from the Labor Day sitewide-% landmine carried over. Excludes bundle/kit products, gift cards, and Scratch & Dent — a deliberate change from 2025's zero-exclusion code, consistent with the new bundle-discount-code fix. This answers Coalition's Basecamp to-do (Connor Levy, due Sept 18); the reply is drafted but held, not sent. Nova built the landing page through six iterations: v1–v2 added real lifestyle/studio photography and full-bleed sections in place of the first bland build; v3 replaced a photo-based hero with a doorbuster-poster treatment after building and rejecting two photo heroes on legibility/mobile grounds; v4 corrected the family-tile, fryer and texture images and fixed a real 5-image asymmetric-grid bug; v5 fixed a genuine product misidentification (wrong pot used for the "120 QT Performance" card, corrected and cross-checked against the live Shopify listing); v6 fixed a card-sizing/border mismatch. Evan approved v6 on photos and layout, 2026-09-16. **Still open:** Jay's sign-off on the offer itself — unlocks sending the Connor reply and any Shopify publish. → [v6](../my-work%20(outputs)/content/website/2026-09-16-bfcm-sitewide-draft-v6.html)

**Scoreboard skill brought into the brain; plugin copy superseded; Monday scoreboard task now reads Meta spend from the connector** — Evan approved both, 2026-09-16. **Why:** the plugin copy of `hpc-scoreboard-report` hardcoded a $181.98 blended CAC ceiling ($567.86 AOV, 55% margin) — more than double the real per-product limits in [v3](../my-work%20%28outputs%29/internal/reports/2026-09-10-cac-ceilings-v3.md) — and a report built on it would have gone to Jay calling channels "under ceiling" that were far over. The brain copy (`my-skills/hpc-scoreboard-report/instructions.md`) points at v3, states the four binding rules (per product, name the CAC, real ~40.6% margin, never Shopify net ÷ Meta spend), notes Meta spend can come from the connector (Google still CSV), and saves to `my-work (outputs)/internal/reports/` instead of a claude.ai sandbox path. The plugin copy is untouched and still triggers, so it is a landmine until Evan removes it from Claude's skills settings. `~/.claude/scheduled-tasks/hpc-monday-scoreboard/SKILL.md` line 36 updated the same day (Meta connector read-only, Google CSV only) — needed auto mode off; the classifier refused every route to that path, including a read. **Left open for Beau:** the skill's per-channel-plus-blended method cannot produce per-product CAC from CSVs alone.

**The incremental rule is the CAC-ceiling method in the rulebook; the overhead-reserve formula and the "provisional" flag are retired** — Evan confirmed, 2026-09-16, closing a gap Nova's agent-file audit surfaced. `hpc-standing-rules.md` still carried v2's "− overhead/profit reserve" ceiling and called the ceiling provisional four days after Jay adopted the incremental rule (2026-09-14, Q4 "yes"); `finn.md` had drifted the same way. Now: per-ad ceiling = net revenue − landed COGS − variable costs − 20% net target, **no overhead charge**; overhead ($49,550/mo, Jay 2026-09-09/10) is charged once, in the 20%-net budget envelope ($290,600/yr room). Same audit, same day: finn/maya/pete/beau agent files and `connected-apps.md` corrected for the live Meta connector, the paid-size set (4:5 organic only), trade-show status and the stale 2.4 ROAS flag; Garrett's $500 single / $2,500-for-eight confirmed by Evan as fact. Sage's "current campaign folder" pointer left for the next campaign (Evan). → [v3](../my-work%20%28outputs%29/internal/reports/2026-09-10-cac-ceilings-v3.md) · [overhead options](../my-work%20%28outputs%29/internal/reports/2026-09-10-overhead-method-options.md) · [budget model](../my-work%20%28outputs%29/internal/reports/2026-09-14-marketing-budget-model-20pct-net.md)

**Product image naming: `product - config - shot`, sizes first, `100-120qt` when the size can't be read** —
Evan's brief, ROUX's convention, 2026-09-15/16. Evan dropped 146 raw Photoroom shots (cutout +
studio pair per shot) for the shop Dropbox and asked for every file named by what it actually is,
unknowns left alone. Names follow the existing ad-creative library (`80qt - pwd`, `18qt - perf`)
with a short angle tag so one product's shots sort together; the library's own `100-120qt`
convention was reused for the shared-plate powered pots rather than guessing 100 or 120. Evan
confirmed the three `30qt - perf` shots are 30s (2026-09-16) after a loose `30qt-perf-master.jpg`
turned out to be a 60 QT — renamed, so the 30 labels stand. Copies live in
`hpc-ad-creative/assets/product-cutouts/updated-2026-09/` and `assets/studio-product-images/`;
the originals are in the shop Dropbox. → [rename map](../my-work%20(outputs)/internal/2026.09.15%20-%20HPC%20-%20Product%20Image%20Rename%20Map.md)

**IW Lookalike creative refresh (bigger wording, all 3 ads) built and approved, but hold the live swap until Sept 18** —
Evan + Jay approve, Beau's call, 2026-09-15. Jay found the wording on `hpc-dark-evergreen`,
`120qt-performance_rolling-boil`, and `120qt-powered_crowd-math` too small to read; Maya
reworked all three (bigger supporting text, headlines/CTA left at original size, crowd-math
got a real headline on "120 QT Powered Cooker," wordmark text dropped where the logo already
carries it) and both approved the result. Beau's read: don't swap into the still-Learning IW
ad set now — bundle it into the already-scheduled Sept 18 re-check (or sooner if Learning
exits first), same logic already applied to holding `hpc-dark-evergreen`'s "cast" copy fix.
An ad-set-level creative edit risks resetting Learning; Sept 18 is already a touch-the-ad-set
moment (continue/hold/cut), so do the creative swap and that call together, not twice.
Approved creative promoted to `my-skills/hpc-ad-creative/work/creative/library/`, staged and
ready to push in one click when Evan says go. → [BOARD.md](BOARD.md)

**Video 7 (Fried Foods, Garrett shoot) seafood: fish and soft-shell crab, not shrimp** —
Evan, 2026-09-15. Shrimp already carries Video 2 (60 QT boil demo); repeating it in Video
7 would mean buying it twice for two different treatments. Fish and soft-shell crab are
already on Video 3's ingredient list, so no added cost, and a whole soft-shell crab in the
fryer fits the "weirdest stuff we had in the fryer" hook better than fish alone.

**`HIGH15`/`SMS25` become `HIGH15B`/`SMS25B`, not reused under the same name** —
Biljana, 2026-09-15. Her flows can send a renamed code, so redemption history stays clean
instead of resetting. Old codes stay live until she confirms the flow switch, then get
deactivated. → [bundle discount code fix](../my-work%20(outputs)/internal/2026-09-11-bundle-discount-code-fix.md)

**`NICESPICE` (buy-one-get-one, 4 collections) deactivated outright, not recreated** —
Jay via Evan, 2026-09-15. Old code, not worth the rebuild effort just to keep it inside
the bundle rule.

**`HPC10` and `Stale30` repointed to the general eligible-discounts collection, which
also opens them to commercial products** — Jay via Evan, 2026-09-15. Both were previously
restricted to non-commercial via "All Non Commercial Products." The more surgical fix
(add a Bundle exclusion directly to that narrower collection instead) was flagged, but
Jay accepted the wider scope since 10%/$30 off is immaterial against commercial pricing.

**`SPROM` stays exactly as-is, unfixed against the bundle rule** — Evan, 2026-09-15.
It's UpPromote/affiliate-app-owned; editing it Shopify-side risks fighting the app's own
sync, and volume is low (9 uses). Pete's lane if it needs a real fix later.

**Coalition's current actual Google Ads spend: not worth chasing further** — Evan, 2026-09-14.
Finn had already come up empty on Gmail and a locked Basecamp; once Basecamp was opened, a
second pass through its Message Board and Docs & Files also found no spend report — only
strategy and copy docs. Evan's call: the 20%-net budget model's central finding (Meta is fine,
Google + agency fees are the structural problem) rests on last year's $206k trailing Google
figure and doesn't change without a current number — it would sharpen the picture, not alter
the conclusion, so it isn't worth further digging. Nothing on the board is blocked on it.
→ [model](../my-work%20%28outputs%29/internal/reports/2026-09-14-marketing-budget-model-20pct-net.md)

**Garrett shoot plan settles at 8 videos after a second restructure** — Evan, 2026-09-14, answering the
questions asked earlier the same day.
- **"Buy it once" uses the 60 QT Performance**, handled/demonstrated on camera throughout (a few other
  pots can sit out on set for background variety, but the 60 QT is what gets the calipers/weld-bead
  treatment).
- **A-Z Process video dropped entirely.** Evan's call: don't shoot a "start to finish build" video until
  HPC is actually making the pot itself in-house (the base pot is still bought from China — landmine on
  the board). Shooting it now would misrepresent the process.
- **Shop Interviews: staff answer questions while actively working** (welding, packing, handling
  product) — not a sit-down talking head. Matches Evan's standing rule that every video shows product in
  actual use.
- **Fried-food content re-shuffled twice, landing on:** beignets and corn are out entirely. One video
  combines **funnel cake + blooming onion + a seafood item** (shrimp, fish, or soft-shell crab — **Evan to
  pick later**), all fried in the 18 QT. **Monte Cristo stays a separate, standalone video.** Oreos and a
  generic "fried everything" montage are dropped — Evan's answers moved from a montage concept toward two
  concrete, product-in-use videos instead once the video count got tight.
- **Net result: exactly 8 videos**, matching the $2,500 deal. Final list: turkey demo (Stephen) · 60 QT
  shrimp boil (Stephen) · 18 QT fry-it-all (Jay) · tailgate (Jay + Stephen) · buy-it-once (60 QT) · shop
  interviews (working, not sitting) · fried funnel-cake/blooming-onion/seafood combo · Monte Cristo.
Both artifacts rebuilt as new files (this connector can't edit an existing Sheet/Doc's content in place —
only create new or rename). Old drafts moved to Drive trash, recoverable.
→ [shoot plan v4](../my-work%20%28outputs%29/internal/2026-09-14-garrett-shoot-plan-sept22.md) ·
[sheet](https://docs.google.com/spreadsheets/d/1ite_Mjxsw6qOj56J3zc1b9YUweJWaFf0qbL_elwiqz0/edit) ·
[Garrett doc](https://docs.google.com/document/d/1feCok40JDRI_QGeuMRgZHox_KbX22FB1GwqoCizzJCk/edit) · Board Now #2

**Garrett shoot plan cut to exactly 8 videos and re-cast; three concepts still open** — Evan, 2026-09-14,
after editing the Garrett-facing Google Doc directly.
- **8 videos, not 9.** Fried Desserts and Fried Experiments (organic/UGC) merged into one "Fried Foods"
  video — same food list, one deliverable, to hit the 8-video count for the $2,500 deal.
- **On-camera swap: Stephen replaces Jay for the Turkey Demo (30 QT) and the 60 QT Shrimp Boil Demo.**
  Jay stays on the 18 QT demo. The tailgate video now has both Jay and Stephen.
- **Every video must show the product in use — not a talking head.** Evan flagged this specifically for
  the three videos that had no pot/setup or hook defined yet: "Buy It Once" (which pot to physically
  feature), the A-Z Process video (which product to follow start to finish, plus a hook), and the Shop
  Interviews (how staff hold/use product while talking, plus a hook). Questions sent to Evan rather than
  guessed — his call, not ours.
- **Tool limitation, not a plan change:** Evan edited the Garrett-facing Google Doc directly, but the Drive
  connector here can only create new files or rename existing ones — it can't edit an existing Doc's body.
  His edits were read back and carried into a new Doc (same title), and the old one was moved to Drive
  trash (recoverable, not deleted). Same pattern used for the Sheet earlier today.
→ [shoot plan v2](../my-work%20%28outputs%29/internal/2026-09-14-garrett-shoot-plan-sept22.md) · [Garrett doc, still has TBDs](https://docs.google.com/document/d/13-d3i6FSn7_qnUoD8qt5tgxcN5g3uZldz1KFUiRmgd0/edit) · Board Now #2

**Correction to the "7-minute boil" note below: it is NOT 120 QT-exclusive** — Evan, 2026-09-14, same
day. My earlier entry said the boil claim belonged to the 120 QT (and 80/100 QT Double/Triple Jet line)
"never the 30 QT." That was incomplete, not the recap's error. **The 30 QT and 60 QT carry the same
"boils in under 7 minutes" claim when set up to boil** — it comes from the Tunnel Tubes on the pot,
not the burner. The 30 QT ships with a 6" Banjo Burner (used for both frying and boiling on that pot);
the 60 QT ships with a Single Jet Burner for boiling, or swaps to a 6" Banjo Burner to fry a turkey.
Frying and boiling are still separate claims that never mix on one shot: frying is 350° in under 5
minutes (18 QT/4-Way/40 QT only) or 10 minutes (every other pot, including the 30 QT and 60 QT);
boiling is the 7-minute figure. **The Sept 22 shoot plan is revised accordingly:** the boil-time-test
video now uses the **60 QT** (shrimp boil, Single Jet Burner) instead of the 120 QT, and the turkey
demo stays on the **30 QT** (frying claim, 350°/10 min) with no 60 QT cutaway. → [what-we-sell.md](../my-business%20%28context%29/what-we-sell.md)
"The boiling claim" · [shoot plan v2](../my-work%20%28outputs%29/internal/2026-09-14-garrett-shoot-plan-sept22.md)

**Garrett shoot plan revised a second time, same day — tailgate location confirmed, "buy it once" and
the 12-man team folded into Sept 22 itself, price confirmed** — Evan, 2026-09-14.
- **Tailgate video: staged at the shop on Sept 22**, not held for a game day. No full crowd/game
  atmosphere — a tight staged spread (table, cooler, team colors) instead.
- **"Get as much done as possible, useful things first."** Evan does not want "buy it once" and the
  12-man team material held back as pitch-only ideas — fold them into Sept 22's actual shoot list,
  prioritized behind the deadline-critical and highest-value pieces. Final priority order: turkey demo
  (30 QT) → 60 QT shrimp boil → 18 QT fry-it-all → tailgate → buy-it-once → A-Z process → shop
  interviews/12-man raw coverage → fried desserts (UGC) → fried experiments (UGC).
- **$2,500 for 8 videos is confirmed as the Sept 22 shoot** — not a separate future deal. The 8-pack
  cap is a reason to keep the list priority-ordered: whichever 8 make it, the most useful ones should
  be first.
→ [shoot plan v2](../my-work%20%28outputs%29/internal/2026-09-14-garrett-shoot-plan-sept22.md) · Board Now #2

**Garrett shoot plan finalized after the Sept 14 call (Fathom recap + Evan's corrections)** — Evan, 2026-09-14.
Meetings with Garrett are brainstorming input, not commitments; Evan and the brain decide the actual plan.
- **Date: Tuesday, Sept 22 — confirmed, not Sept 23.** The Fathom AI recap misread the date; the calendar
  invites Garrett sent (same inbox, same day) say Sept 22, 9:30am–12:30pm CDT, and Sept 23, 2026 is a
  Wednesday. Going with the calendar.
- **No hard stop on the day** — Garrett typically runs long. Treat 12:30pm as a soft estimate, not a cutoff.
- **Kept, against the recap's "dropped" list: the buy-it-once price-objection video.** Not locked to Sept 22 —
  Evan wants a concept ready to hand Garrett so it's on his radar for scheduling.
- **Tailgate video ties to the already-approved 18 QT tailgate bundle** (fryer, leg extensions, 12" thermometer,
  wind shield, skimmer — $465, Board Now #1), not a new concept.
- **Pasta/sauce (4-Way + 40 QT) and the 28 QT steamer stay off the slate for now** — not core sellers today.
  Revisit later, not this cycle.
- **12-man team brand film is not NOLA-exclusive.** Evan wants ideas pitched beyond the trade-show angle, and
  expects to cover some of it when Garrett is on-site Sept 22.
- **120 QT timed boil-demo video (for the NOLA booth) moves to a later date** — off-season for 120 QT sales
  right now; no rush.
- **"Owner's Choice" seasoning add-in scrapped.** It was Garrett's suggestion, not ours — HPC has its own
  seasoning line and won't bundle in someone else's.
- **The recap's "Tailgate Pack" and "Turkey Fryer Bundle" are not new asks** — they're the tailgate/turkey/60 QT
  bundles already approved by Jay (Board Now #1), just described loosely on the call.
- **Correction caught while planning, not from the call:** the "boils in under 7 minutes" claim belongs to the
  120 QT (and the 80/100 QT Double/Triple Jet burner line) — never the 30 QT, which is a turkey fryer with its
  own frying-time claim. The Fathom recap says "30-quart cooker... boils in under 7 minutes," which conflates
  the two. The shoot plan's boil-time-test video uses the 120 QT, consistent with existing sourced copy
  (`how-we-sound.md`, `customer-language.md`, `2026-09-10-landed-cost-by-variant.md`).
- **Bundle building (code fix + building the 3 kits) stays held for tomorrow, 2026-09-15** — unchanged from
  Board Now #1.
- ⚠️ **Not confirmed in the recap: the $2,500 8-pack deal terms.** The Fathom summary doesn't mention price,
  payment, or what counts as "one video." Worth verifying with Garrett before or during Sept 22, not assumed
  settled.
→ [shoot plan](../my-work%20%28outputs%29/internal/2026-09-14-garrett-shoot-plan-sept22.md) · [call prep](../my-work%20%28outputs%29/internal/2026-09-11-garrett-call-prep.md) · Board Now #2

**Jay answers the four open questions on the 20%-net budget model — room confirmed at
$290,600/yr, agency and other-advertising forward run-rates far below trailing, incremental
rule formally adopted** — Jay, via Evan (text, relayed verbatim), 2026-09-14. 🔒 Hard
constraints, not judgment calls:
- **Q1, double-count: "Yes."** The $6,800/mo agency retainer sits inside both the
  $49,550/mo overhead figure and the P&L's $152k "agency fees" marketing line. Re-derived
  from the model's own formula (not just re-quoted): pulling the double-counted $81,600/yr
  out of overhead drops overhead% from 15.2% to 13.15% of real revenue, which raises the
  20%-net room from $209,000/yr to **$290,600/yr — now the confirmed figure**, not a flag.
- **Q2, agency-fees composition:** the $152k trailing line holds the $6,800/mo Coalition
  retainer plus one-time, now-discontinued BM Digital costs — a 15%-of-ad-spend commission
  (dollar amount not given, not invented), a $7,000/mo BM Digital retainer Dec–May
  ($42,000), and "probably $5,000 to $6,000" of other one-time misc. **Forward run-rate:
  ~$81,600/yr, Coalition retainer only.** ~$22,900 of the trailing $152k doesn't reconcile
  to named pieces — flagged as unquantified (consistent with, not proof of, the unstated
  15%-of-spend commission), not forced to close.
- **Q3, "other advertising" composition:** nearly all of the trailing $56k is one-time and
  discontinued. **Forward run-rate: ~$10,300/yr** — ~$5,000 misc (annual cadence assumed,
  not stated by Jay) plus a $5,300 reviews.io renewal each November.
- **Q4, incremental per-ad rule: "yes."** Formally Jay's rule now — every ad must clear
  20% net after landed cost, fees and the ad itself — not a Beau recommendation awaiting
  sign-off.

**Why it matters:** the model's central finding gets revised, not just refreshed.
Recomputing on forward run-rates instead of trailing totals — Meta $78k–$115k + Google
$206k (still trailing, no current figure, dropped per Evan's earlier 2026-09-14 call, not
re-chased here) + agency $81.6k + other $10.3k + affiliates $4k ≈ **$380k–$417k/yr**
against the **$290,600/yr room** — the forward gap is **~$89k–$126k/yr**, a fraction of the
old $467k figure built on trailing totals and the unconfirmed $209k room. Agency fees are
no longer a distinct structural problem now that BM Digital is gone — they're a known,
bounded line smaller than Meta's own spend. **Google alone is now ~71% of the entire room**
and remains the one real lever outside marketing's control. No Meta daily-cap changes.
→ [model](../my-work%20%28outputs%29/internal/reports/2026-09-14-marketing-budget-model-20pct-net.md) · board Now #3

**Natural-gas variant of Stephen's commercial follow-up email created and sent** — Evan, 2026-09-14.
Adapted from the live propane template (Google Doc "CC follow-up email v3") for NG prospects. **Dropped**
the $5,000/yr propane-savings figure and the savings-calculator link — both are anchored to propane gallon
cost and there is no equivalent NG fuel-savings number on file (not invented). **Kept** the output/speed
proof points (Lefort's, All Star, The Fruit Stand) since those describe the tunnel-tube cooker's boil speed,
not the fuel. **Added** a caveat from the existing call script (`HPC_Commercial_Call_Script_and_Email_v3`):
NG only matches propane speed on high-pressure 2 lb commercial gas service, not standard 1/2 lb household
lines. **Why:** Evan asked for a version of the propane follow-up for NG-using prospects; delivered in paste
format only, per his request, and added by him to the shared Google Doc before going to Stephen. No copy in
the vault — the Google Doc is the source of truth for both versions.

**ROUX OS stays a launcher and an inbox; the work happens in Claude Code chat** — Evan, 2026-09-14. No in-page
answers, no second chat surface. The page is for the glance (clock, week, waiting, running, the pulse brief) and for
telling the brain things (Tell ROUX, Done). Sessions start here in the desktop app as they do today; the Work-on-this
and Ask buttons that open a Terminal session are optional and need Terminal's Desktop-folder permission, which is
Evan's toggle if he ever wants them. **Why:** Evan prefers to do the actual work in this app, and the page must not
become a second, worse chat. Consistent with the four rules in the spec.

**ROUX OS pulse is button-only, not scheduled** — Evan, 2026-09-14. The 6:30 launchd job is unloaded; Pulse now on
the page runs the same read-only routine on demand. **Why:** the pulse runs on Evan's claude.ai Max plan (no API key,
verified), so it costs no money, but he would rather not spend plan allowance on an unattended daily run. Turning it back
on is `pulse.schedule: daily` in `config.json` plus `./install.sh`.

**ROUX OS is the daily cockpit; Obsidian stays the editor; `BOARD.md` stays the single state** — Evan, 2026-09-14.
A local page at `localhost:4242` (`my-workflows (automations)/live/roux-os/`) renders the board, the week, key dates
and the morning brief, and starts real Claude sessions from buttons. **Only the brain writes the board**; Evan writes to
`my-desk (now)/capture.md` through the page (notes and Done lines), `/prime` reads it, `/wrap` folds it in. **Why:** Evan's
last OS became "a complicated place to read info" and died; this one shows only what he would not think to ask for, and
every card does something. Localhost over an Obsidian dashboard because the board would have to be rewritten into task
syntax, the calendar plugin lives in its own pane, and there is no clean way to start a session from a note. This keeps the
2026-09-02 reason (one copy of state, no sync layer) and replaces its conclusion (Obsidian as the only interface).
→ [spec](../my-workflows%20%28automations%29/specs/2026-09-14-roux-os-plan.md)

**Hold the IW lookalike campaign — no cut, no budget change, re-check Sept 18** — Evan, on Beau's recommendation,
2026-09-14. First read is $299.94 spent over 3 days, 1 Meta-claimed purchase, **0 Shopify UTM-matched orders, $0 real
revenue**, ad set still in Learning. **Why not cut:** Meta needs ~50 conversions per ad set to leave Learning; 3 days
at n=1 is noise, not signal. **What would change the call:** at Day 7 / ~$700 spend, or on Learning exit, if matched
orders are still 0 and spend has passed the $73/real-order ceiling, that becomes a real cut conversation.
→ board Running section

**No change to Meta daily caps off the 20%-net budget rebuild** — Beau, accepted by Evan 2026-09-14. BPM stays $164,
`18qt-TOF` stays $50, IW stays $100. **Why:** Meta's forward pace ($78k–$115k/yr) is already under its share of the
~$209k/yr room. The overspend sits in **Google ($206k, ~99% of the whole room alone)** and **agency fees ($152k)** —
both outside marketing's direct control. Cutting Meta further would be cutting the cleanest line.
→ [model](../my-work%20%28outputs%29/internal/reports/2026-09-14-marketing-budget-model-20pct-net.md)

**Google Ads: read-only monitoring is allowed, numbers only** — Evan, 2026-09-14. Pull figures from the Google Ads
account when a question genuinely needs them, rather than answering "I don't have that number" for something visible
there. **Change nothing** — it stays Coalition's lane and their work must not be disturbed. This restates existing
policy (`SAFETY.md`: read freely, write never); it is logged because Evan raised it explicitly.

**`RM40JAY` and `CWBSM40` are deleted — contradiction resolved** — Jay, via Evan, 2026-09-14. They are old codes
and can go. This settles the 2026-09-11 conflict where `decisions.md` and `BOARD.md` said delete while
[the code-fix doc](../my-work%20%28outputs%29/internal/2026-09-11-bundle-discount-code-fix.md) said keep. **Delete
wins.** Deleting is Evan's click in Shopify and is permanent. ⚠️ `USATHANKS` was on that same delete line and is
**not** deleted — see the reversal below.

**`FANDF` stays exactly as it is, whole-order type included** — Jay, via Evan, 2026-09-14. It is the
friends-and-family code and is used as-is. It is a whole-order discount, so it can still reach a bundle line; that is
**accepted, not an oversight.** Do not recreate it as a product discount and do not raise it again in the bundle fix.

**⚠️ REVERSAL — `USATHANKS` is kept, not deleted** — Jay, via Evan, 2026-09-14. It **is** one of our military
discounts. This reverses the 2026-09-11 decision below ("delete `RM40JAY`, `CWBSM40`, `USATHANKS`"), which had it
recorded as "not our military or first-responder code." That was wrong. **Do not delete it.**

**`HPCWS` and `FANDF` both stay** — Jay, via Evan, 2026-09-14. `HPCWS` (23%, dealer-style, untouched since 2021)
is an old code they don't use; harmless where it is, no action. `FANDF` (16%) is the live friends-and-family code,
used when friends and family buy. Both were flagged for Jay's eye in the code inventory; both are now settled as keep.

**The AMP app stays running** — Jay, via Evan, 2026-09-14. It's a second automatic bundle/upsell discount system
running alongside Shopify's own bundles. Automatic discounts need no code, so the bundle code fix doesn't touch it —
but it must still be counted in any bundle-margin check.

**Warranty exception is now IN `SAFETY.md`** — Evan pasted it in himself, 2026-09-14, after the assistant's edit was
refused by a permission-settings block on that file (by design). The rule now live: a creative showing a single
qualifying pot may say "5-YR RESIDENTIAL WARRANTY" without the size qualifier; steamer and commercial creative are
never eligible. Supersedes the entry below.

**Warranty exception still NOT in `SAFETY.md`** — Evan gave one-time chat permission 2026-09-14 to add it, but
the edit was refused by a permission-settings block on that file (by design — "only you edit this file"). The
exception itself was decided 2026-09-11 (below): a creative showing a single qualifying pot may say "5-YR
RESIDENTIAL WARRANTY" without the size qualifier; steamer and commercial creative are still never eligible.
**Still pending: Evan pastes the text in himself, or loosens `.claude/settings.json` for that one file.**

**One-time-use email/SMS signup discount codes stay as they are** — Evan and Jay, reviewed the discount-code
sheet together, 2026-09-14. They're not public — only the customer who signed up has theirs — so they carry no
stacking-on-bundles risk the way a public/reusable code would. No action needed on this class of code.

**Meta's official Ads connector is live, and every write needs Evan's explicit yes** — Evan, 2026-09-11. It replaces
Claude in Chrome for Meta work. Meta's own panel would not block specific actions, so the brain does: publishing
(`ads_activate_entity`) is denied outright, and every other write prompts Evan in the app. Never decide on my own
that a write is allowed. Why: publishing and budget changes are always Evan's click (`SAFETY.md`), and the IW test is
in Learning. Work only in HP Cookers ADs (`4392736013287`). The second account the connector returns,
`939759932469855`, was connected by accident: ignore it. → [hpc-standing-rules → Meta Ads connector](../my-business%20%28context%29/hpc-standing-rules.md)

**"Built in the USA" is an allowed claim; "Made in USA" is still blocked** — Jay, via Evan, 2026-09-11. We do
build them here. So the 30 QT turkey video's "Built in the USA using premium materials" stays. This is a standing rule
from here on.

**Live ads stay as they are, "cast" included, to avoid a learning reset** — Evan, 2026-09-11. `hpc-dark-evergreen`
keeps "4mm cast aluminum" in its live text and image for now. The fixed v2 image and "4mm aluminum" copy go in at the
next natural refresh. Never reuse the old copy in a new ad. Evan approved `buy-cheap-twice` v3 and
`hpc-dark-evergreen` v2 into the library.

**Pots are 4mm aluminum, never "cast"** — Evan, 2026-09-11. The only cast-aluminum part is a piece on the Boil
Boss Triple Jet burner. "4mm cast aluminum" had gone into the evergreen ad copy, `hpc-dark-evergreen`,
`buy-cheap-twice` and `yeti-1x1`. The creative is being fixed as drafts, and the live ads are being audited.

**A 5-year line may drop the size qualifier when the creative shows only a qualifying pot** — Evan, 2026-09-11.
"5-YR RESIDENTIAL WARRANTY" on the 80 QT `buy-cheap-twice` 1x1 is fine. ⚠️ `SAFETY.md` still says both
qualifiers, always. Only Evan edits that file, and it wins on conflict until he does.

**Delete `RM40JAY`, `CWBSM40` (Jay didn't remember making them) and `USATHANKS` (not our military or
first-responder code)** — Jay and Evan, 2026-09-11. Deleting is Evan's click in Shopify. **`-EMAIL` codes are per-customer
email-signup codes, and the long letter/number codes are per-customer SMS codes.** The system makes a new one for
each customer so nothing can be reused. Keep them; they belong to Biljana's system.

**Discount sheet answers** — Evan, 2026-09-11. The influence.io customer reward codes (~66 unused $ codes)
**stay on**. The AMP app's automatic discounts **stay as they are**. Jay reviews `RM40JAY`/`CWBSM40` and may delete
them. `USATHANKS` is an unpublished military code with no way to verify service, replaced by the newer verified
military code, and will **likely be deleted**. The NOLA directory text keeps "Made in USA" (Evan: low risk).
`80qt-buy-cheap-twice` stamps switch to "BUILT IN LOUISIANA" (Maya).

**No "Made in USA" claim until the pots are made in-house; use "Built in Louisiana" and "Hand-welded in
Louisiana"** — Evan, 2026-09-11. **This reverses the entry just below**, which kept "Made in USA." **Why:** the
base pot is bought from China, and an unqualified "Made in USA" has to meet the FTC's "all or virtually all"
standard. It comes back once Jay's SBA plan brings pot manufacturing here (~a year out). This goes in the standing
rules as a copy non-negotiable. Existing "MADE IN USA" stamps (`80qt-buy-cheap-twice`, `yeti-1x1.html`, the
NOLA directory text) get fixed before they ship again.

**All three kits approved: tailgate $465, turkey 30 QT $469, 60 QT two-bird $519** — Jay, via Evan,
2026-09-11 (re-OK after the tailgate contents changed). **Welcome10 stays off bundles; military and
first-responder codes stay allowed on bundles.** Every other code gets excluded from bundles.

**Discount codes: Evan and Jay decide what to turn off from a full inventory sheet** — Evan, 2026-09-11.
The BM Digital codes will never be used again; Evan says to ignore them, so they're off the board and just listed in the sheet.
`RM40JAY` and `CWBSM40` are, Evan believes, Jay's codes for people who help the shop (e.g. the attorney).
They're Jay's to keep.

**"Made in USA" stays a claim we use** — Evan, 2026-09-11, after the manufacturing facts came out. **Facts (Evan):** the
base pot is bought from China. In Covington we weld on the legs, burner and Tunnel Tubes, drill the valve hole,
fit the gate valve, clean and brand it. **Evan's reading:** "mostly made here in the USA/Louisiana." ⚠️ **Flagged,
not blocked:** the FTC's rule for an *unqualified* "Made in USA" is "all or virtually all" US-made, and the pot
body is a major component. "Built in Louisiana," "hand-welded in Louisiana" and "Made in USA with imported pot"
carry no such risk. Evan's call; it's worth Jay or the attorney confirming before it leads a paid ad. This
supersedes the "Jay to confirm" item below. Never write "we make the pots."

**Bundles approved: tailgate $479, turkey $469, plus a 60 QT two-bird kit; every code skips bundles except military** —
Jay, via Evan, 2026-09-11. The kits are **evergreen**: Jay doesn't want them pulled after the season if they
improve margin. Only the seasonal turkey ads stop at the ship cutoff, **Mon Nov 23** (3 days before
Thanksgiving). The 30 QT going from $345 to $442.50 is deliberate, because it's now sold as variations. **Evan builds
the kits in Shopify.** The 7 draft bundle orders at 100% off were influencer seeding. **After approval,**
Evan changed the tailgate kit to a 5" thermometer (the 12" doesn't fit the 18 QT well) and dropped the
wind shield (it's for a pot on the ground, not on legs), so its price is being re-checked. Still open:
Welcome 10% on bundles for new customers · early-Nov 2025 promo · Platinum compare-at · the incremental rule.
→ `internal/2026-09-11-tailgate-thanksgiving-bundles-plan.md`

**Retargeting: plan approved, launch held** — Evan, 2026-09-11. Two ad sets, $20/day pots and $10/day 18 QT ·
the 18 QT counts as working at ≤$30 per purchase · no end date · the IntentWave audience stays out (it seeds the
lookalike, and Biljana uses that list in her flows). **Why held:** Evan wants to wait before adding another
new campaign. IntentWave's pixel is **CIPA compliant**: IntentWave proved it, and Coalition is in contact (Evan).
→ `content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md`

**BPM stays at $164/day; Jay's Aug 31 +25% is not applied** — Evan, 2026-09-11. Live caps total $314/day
*(Finn, Ads Manager, 2026-09-11)*.

**Coalition is a read-only secondary advisor on Meta, like IntentWave** — Evan, 2026-09-11. No setting
or attribution changes. "Jay generates Meta copy from Coalition's sheet" was Evan spitballing on the call.
The sheet is input the brain can mine, not a copy source. Coalition gets our Meta creative in the
formats we already make, with no extra sizes.

**"Made in USA" and "Built in Louisiana" are approved claims; the board landmine is lifted** — Evan,
2026-09-11: *"we are Made in the USA and built in Louisiana, and that's part of who we are."*
⚠️ **The sources disagree and this is not resolved.** The Sept 10 IntentWave call recap records
Jay saying the SBA loan is to make pots, baskets and lids here *"instead of importing from China."*
If that describes today, an unqualified "Made in USA" may not meet the FTC's "all or virtually all"
standard. "Built in Louisiana" is not affected. Evan to confirm with Jay.

**Team line: "Built by hand by our 12-man team here in South Louisiana."** Evan, 2026-09-11. It replaces
"twelve people build every one," which was too direct. **Never say "Yeti"** in customer-facing work:
it's free advertising for them. Keep the frame and drop the name.

**IW lookalike ads send every click to the website: Shop destination off on all three** —
Evan, 2026-09-11, set before publishing. Meta had "Personalized destinations → Shop" on (plus
Messenger on `120qt-crowd-math`), which can route people to the in-app shop instead of the
landing page; `hpc-dark-evergreen` also warned the shop didn't match its URL. **Why:** in-app
shop orders never touch the landing page, so they carry no tracking tag, and this campaign is
judged on tagged Shopify orders. **Trade-off accepted:** some buyers convert faster in-app. Don't
turn Shop back on because Meta recommends it. Campaign published the same morning, with
"(DRAFT)" dropped from its name. → `content/ads/2026-09-labor-day/2026-09-10-iw-tracking-tags.md`

**Real margin of record: ~40.6%, not 46%** — Jay, 2026-09-10: the 46% was worked on the
**$4.3M booked** revenue. That revenue includes the $393k double-booked Lowe's order, which
had no real sale behind it. **Derived** (assuming that entry carried no cost of goods):
- Real margin = (46% × $4.3M − $393k) ÷ ~$3.9M ≈ **40.6%**. This replaces 46% as the margin for the
  monthly whole-business check.
- 20% net leaves **~$209,000/yr for all marketing** (~$290,600 if the overhead's agencies sit inside
  the $152k). **This replaces the ~$421k logged just below.** Marketing ran **~$467,000 over**.
- The P&L's −5% implies **~$529,400** of other expense beyond overhead, marketing and the Lowe's
  entry. Jay says it was one-time. **If so, a normal year nets ~8.0%.**
- Per-product ad ceilings are unaffected, since they run on landed cost per product.

**P&L revenue: $4.3M booked, ~$3.9M real; the 46% holds as after fees and freight** — Jay,
2026-09-10. Revenue for the last 365 days was **$4.3M booked**. A **$393k** expense came from
double-booking a Lowe's order, so **real revenue is ~$3.9M**. **This rules out the reading
logged below** that the 46% sits before card fees and freight. That reading came from using
Shopify's $3.14M as the P&L revenue. **Derived, on 46% of $3.9M:**
- 20% net leaves **~$421,220/yr** for all marketing (~$502,820 if the overhead's agencies sit inside
  the $152k). **This replaces the ~$223k** in the text Jay was sent.
- Marketing ran **~$254,780 over**.
- Net comes to **~13.5%** if the other expenses were one-time, as Jay says.
**Still open:**
- **Whether the 46% was worked on $4.3M or $3.9M.** On $4.3M, the real margin is ~40.6% and the room
  is ~$209,000. Asked Jay.
- **P&L revenue (~$3.9M) vs Shopify net sales plus shipping ($3.14M): a ~$760k gap**, while COGS matches
  within 1.4%. Parked for Beau and Finn.

**Shopify prices always win; the brain was matched to them** — Evan, 2026-09-10. "Those
Shopify prices are always correct." Nova brought `what-we-sell.md` into line with Finn's
2026-09-10 variant pull: 5 prices corrected, 30 active products added, non-merchandise left
out. Two reference files were fixed the same way. Dated records were left as written. Any
brain price that disagrees with Shopify is the brain's error. No live or approved creative
carries a wrong price.

**The P&L's full year: net −5%, marketing $676k** — Jay, 2026-09-10, from HPC's P&L, last
365 days. **Net profit −5%.** Jay says part of that was unforeseen, one-time expenses he is
already fixing. **Advertising and marketing $676k:** Google $206k · Meta $258k · agency fees
$152k · other advertising and marketing $56k · affiliate commissions ~$4k. **COGS $1.68M.**
Second source for Meta: the Jan–Aug Meta CSVs total $210,213.94, which fits $258k for the year.
**Derived** (P&L revenue taken as Shopify net sales plus shipping charged, $3,144,599):
- 46% margin less ~$595k overhead less $676k marketing would be **+5.6%**. The books say −5%.
  That's **~$333,146** of expense outside the overhead and marketing lines.
- **Card fees (~$95,914, assumed 2.9% + $0.30) plus freight-out (≈ the $242,200 customers
  paid) come to ~$338,114**, almost exactly the gap. (Revenue − COGS) ÷ revenue = 46.6%.
  **So the 46% matches margin *before* card fees and freight**, even though it was described as after them.
  **Not confirmed.** If it holds, most of the −5% recurs and isn't one-time. P&L total revenue settles it.
- **Marketing against 20% net:** taking the 46% as described, 20% net leaves ~$222,996/yr for all
  marketing (~$304,596 if the $6,800/mo agencies in overhead sit inside the $152k). If
  the 46% is before fees and freight, 20% net can't be reached even at $0 marketing. **In every
  reading, $676k is well past what 20% net allows.**
→ `internal/reports/2026-09-10-overhead-method-options.md`, final addendum

**The IW lookalike launches Fri Sept 11 as scheduled, keeps the 18 QT ad, and gets tracking
tags on the new campaign only** — Evan, 2026-09-10, with Jay's go-ahead. No wait for
IntentWave's review. The 18 QT fryer ad stays in and its share of purchases is watched —
Beau's call in `cac-ceilings-v3` §6b. URL tracking tags go on the three new ads only;
`BPM_TOF_Manual` and `18qt-TOF-Prospecting` are not touched. → `internal/2026-09-10-intentwave-call-2-recap.md`

**IntentWave is input, not a work queue** — Evan, 2026-09-10. They advise for free; their
meeting notes are shared for context and ideas (e.g. bundling), not to generate questions or
tasks for them. Decisions are made in-house. Figures said on calls are spitballing — Jay has
read everything and is in the loop, so no correction campaign is needed.

**Bundles: no discount codes, mainly HPC product, stock is not a constraint** — Evan,
2026-09-10. A bundle's discount is built into its price, so no code applies on top. Outside
add-on items are fine if they help sales, but not a sourcing project for a single item.
Stock is fine; Digit connects in a few weeks. **Beau to build a tailgate / Thanksgiving
bundle plan** — IntentWave's idea, ours to use.

**46% is the margin of record for the monthly whole-business check** — Jay, 2026-09-10.
It comes from HPC's P&L for the last 365 days and is **after credit card fees and after
shipping cost**. Shipping charged to customers is in revenue and the shipping cost is
deducted. Landed cost rose "slightly" during the year, and Jay chose to stay with the
365-day figure. **Per-product ad ceilings stay on current Shopify landed cost**, because the
next unit sold costs today's price. **Still open:** the P&L's 46% (after fees) and Shopify's
42.1% (before fees) sit roughly 6–7 points apart once card fees are put back, which is more
than a slight cost rise explains on its own. Asked Jay for P&L total COGS, total
advertising and net profit % to settle it.

**Jay is the source for every number and answer from the owners, not Robert** — Evan,
2026-09-10. Jay can pull P&L figures himself. Robert raised the CAC framing (2026-08-28),
but questions no longer route to him. Anything that says "ask Robert" or "Robert's P&L"
now means Jay.

**P&L margin before overhead and advertising: 46%, last 365 days** — Jay, 2026-09-10, from
HPC's P&L. **That's 3.9 points above** the 42.1% gross profit derived from Shopify at current
landed cost (Finn, Pull D). **The cause isn't known yet.** Candidates: the P&L books
actual cost at time of sale while Pull D costs every order at today's price; the P&L
revenue may include shipping charged; the 46% may be before card fees. **It reverses
Pull D's verdict:** 20% net is reachable with zero ad spend, where before it was out
of reach. **Still under 20% after the known Meta spend in every case** (at most 13.3–17.9%,
derived). → `internal/reports/2026-09-10-overhead-method-options.md`, P&L addendum

**CAC ceilings v3 replace the provisional ones; Beau withdraws the 18 QT override** —
Beau, 2026-09-10, arithmetic spot-checked by Claude. Built on confirmed landed cost,
$97.49 overhead per order and a 20% net target, **one unit at full price**: the floor for a
full-price order, not the order-level figure. **The 18 QT fryer's ceiling is −$26 alone and
$15–18 with legs**, against a $128–141 break-even. Beau withdraws its recommendation to go
past step one on the ladder and says hold at $50/day. **$350/day holds**, but as a real limit
now, not a placeholder. **The ⛔ on 30%-off legs stays**, now for a different reason: at
$48.90 landed it was a wash at best. ⚠️ **Correction to what Jay was told:** the 2026-09-10
text said per-order allocation "raises the ceiling on the accessories". **It lowers it.** That
line came from v2, which had it backwards. Per-order allocation raises high-ticket ceilings
and lowers low-ticket ones. It is the difference between the 18 QT at −$26 (per order) and
+$12 (revenue share). **Two calls are Jay's:** whether he still wants per-order now that he
knows the real trade, and whether off-season lines may run capped spend between the ceiling
and break-even. → `internal/reports/2026-09-10-cac-ceilings-v3.md`

**✅ Shopify costs confirmed accurate, including the exact-50% ones — doubt resolved** —
Jay via Evan, 2026-09-10. Resolves the ⚠️ entry directly below. Jay reviewed **every**
item and changed only the costs that were off, so an old `updatedAt` means "checked and
already right", not "never looked at". The **114 variants at exactly 50% of price are
intentional and accurate.** Current Shopify `unitCost` is the landed cost for the CAC
ceiling table. Beau building it now. → `internal/reports/2026-09-10-landed-cost-by-variant.md`

**⚠️ "Shopify cost-per-item is landed cost" is back in doubt — do not build ceilings on it
yet** — Finn, 2026-09-10; spot-checked by Claude against Shopify the same day. Qualifies the
2026-09-09 entry below; does not reverse it. Of 594 active variants, **455 (77%) have an
inventory item last modified before 2026-08-30**. **126** changed in one batch on Sun
2026-08-30, 5:46–6:34 pm Central, and **13** between Aug 31 and Sept 7 (`InventoryItem.updatedAt`).
**114 variants are set to exactly 50.0% of price**, all last modified before Aug 30. Among
them: the $285 18 QT Powered base (PWFRBR, $142.50) and 23 of 41 commercial units. Untouched
since before the window: the Triple Jet ($215.50, Aug 6) and leg extensions ($48.90, Aug 27).
**Two readings fit the timestamps:** Jay only got through part of the catalog, or he reviewed
all of it and changed only the costs that were wrong. The exact-50% pattern argues against
the second for those 114. **Asked Jay which it is.** Beau holds the ceiling table until he
answers. → `internal/reports/2026-09-10-landed-cost-by-variant.md`

**Overhead is steady year-round — $594,600/yr** — Jay, 2026-09-10, by text. The ~$49,550/mo
is the same every month; payroll does not rise in crawfish season. So annual overhead is
$49,550 × 12 = **$594,600**, and the **~$97.49 per order** (÷ 6,099 paid orders, trailing 12
months) stands. That was the last input the CAC ceiling needed from Jay. Denominator choice
(all paid orders, all channels) remains Beau's proposal; Jay has not objected or confirmed it.

**Overhead is allocated per order; ad spend is not in the $50K; freight is recovered from
the customer** — Jay, 2026-09-10, by text. **Ad spend is not inside the ~$49,550/mo overhead**,
so ads are subtracted once, as CAC — no double-count. **Outbound freight is paid by the
customer** on both consumer and commercial orders, so it is not a cost in the ceiling.
**Overhead goes per order, not as a flat % of revenue**, so high-ticket items don't carry six
times a fryer's overhead. Denominator **proposed, not yet confirmed:** trailing 12 months, all
paid orders across all channels — **6,099 orders, ~$97.49 per order** (Finn, Shopify, 2026-09-10).
A full year rather than month by month, because orders swing from 190 (Sep) to 1,080 (Mar).
Still open: whether the $49,550 is steady year-round. → `internal/reports/2026-09-10-orders-for-overhead-allocation.md`

**The two blocking CAC inputs landed — Shopify cost-per-item is landed cost, overhead is
~$50K/mo, and the 20% target is net after overhead** — Jay, 2026-09-09, by text. Answers
all three questions open since 2026-08-28. **Shopify "cost per item" holds landed cost**
(part + tariffs + inbound freight); Jay updated it the week of 2026-09-01 and states it is
now accurate. **Monthly overhead ~$50,000 rough**, itemised as agencies $6,800 · software
$7,000 · payroll $20,000 (excludes product-build labor, which is already inside landed
cost) · rent $9,750 · insurance $1,000 · misc $5,000 — **which sums to $49,550, not
$50,000**; treat $49,550 as the stated figure and the whole thing as an estimate, not an
audited number. **The 20% target is net profit after overhead**, not contribution.
⚠️ **Two consequences.** (1) Cost-per-item changed the week of Sept 1, so **every margin
computed before then is stale — including the 44.5% August blended margin.** Re-pull before
reusing it. (2) The ceilings stay provisional until it is confirmed that **ad spend is not
already inside the $50K** — subtracting it as overhead and again as CAC would double-count
it. → `internal/reports/2026-08-28-cac-model-v2.md`

**The new IntentWave campaign: $100/day, live Fri Sept 11, 1% lookalike, no detailed
targeting** — Evan, 2026-09-09. Built in draft and left unpublished for the 1pm review.
**$100 is the most that fits under the $350/day ceiling** ($214 current caps + $30 retargeting
+ $100 = $344) and it is the bottom of Dalton's $100–150 range; **$150 would breach the
ceiling.** Kept at **1%** rather than the 3% originally proposed — a 1% US lookalike is ~2
million people, so the "it will fatigue fast" argument for 3% was weak. **No detailed
targeting layered on:** the lookalike is the targeting, interests would narrow an already
narrow pool and starve delivery, and under Advantage+ they would be suggestions rather than
hard limits anyway. Minimum age 24, advertiser High Performance Cookers LLC, location United
States (a lookalike now inherits geography from the ad set — Meta removed location from
lookalike creation).

**Ad 2 points at the Platinum Boiling Bundle, and version B of its copy is dropped** — Evan,
2026-09-09. The image shows the Performance pot **on** a Triple Jet burner, so a bundle page
matches what the viewer sees better than either product page and removes a click. ⛔ **Version
B is incompatible with that destination** — it opens *"you only need the pot"* and quotes the
pot and burner separately, which argues against a bundle and quotes prices the bundle does not
carry. **Version A only.** Ad 3 points at Evan's own 18 QT landing page rather than the PDP.

**The five new statics do NOT go into `BPM_TOF_Manual`** — 2026-09-09, after reading the live
account. That campaign runs on **video**: six video ads were live throughout the sale and never
stopped, three of them under $45 CPP. Dropping untested statics into a video ad set takes
exploration budget out of proven delivery and returns a test that cannot be read, because
intra-ad-set allocation is not a fair split. Three statics went to the new IW campaign; the two
objection-handlers are held for retargeting.

**Reports to Jay and Robert — SENT 2026-09-09.** *(Supersedes the "drafted, not sent" status
below, which was true at the time of writing.)* The owners now hold these figures, so anything
we report later has to reconcile to them: **126 orders · $41,100.84 net · AOV $326.20**, both
comparison windows, and the three things we explicitly told them we do not have. If a later
pull contradicts any of it, we correct it to them directly rather than quietly restating.

**Reports to Jay and Robert were drafted, then reviewed by Evan before sending** — 2026-09-09. Two plain-language write-ups
(sale results + Meta overview, and the new campaign plan) with every figure re-verified against
Shopify. **Deliberately omitted rather than estimated:** actual CAC (no Google spend feed),
which creative won (the ad-level table was filtered wrong), and the new-vs-returning split
(covers Sept 1–7 only). Each omission is stated in the report with its reason.

**The rolling-boil creative is a 120 QT PERFORMANCE pot, not Powered — files renamed** —
Evan, 2026-09-08. It is a 120 QT Performance pot sitting on a Boil Boss Triple Jet Burner.
Performance = tunnel tubes only, burner separate and swappable, which is precisely why the
frame's *"works on any burner you already own"* line is correct. Four library files renamed
from `120qt-powered_rolling-boil` to `120qt-performance_rolling-boil`, including the Aug 27
4:5 original that carried the same wrong label. **The ad points at the Performance PDP**
(`120-qt-performance-seafood-pot`, $532–$580, verified in Shopify 2026-09-08), not the Powered
one. `120qt-crowd-math` keeps its `powered` label — that one does show a welded burner.

**The evergreen creative batch is approved — 15 statics, five concepts, three paid sizes** —
Evan, 2026-09-08. Moved into `library/` with a log entry each. The 80 QT 9:16 took three
passes: pot scaled up ~1.6× total, the panel glow extended to the foot (it ran 600px inside an
800px panel, which read as a cut-off background), and **top and bottom margins evened at
~160px** — which puts the logo inside the Story top safe zone, deliberately and on Evan's call.
Ad copy for all five → [evergreen-ad-copy](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/2026-09-09-evergreen-ad-copy.md),
every destination handle and both quoted prices verified against Shopify.

**`120qt-rolling-boil` copy is correct as written — the pot is on a Triple Jet Burner** —
Evan, 2026-09-08. Closes a flag raised the same day: *"Tunnel Tube technology is in the pot —
so it works on any burner you already own"* was read as Performance copy over a Powered
product shot. **It is not.** The pot in that photo is sitting on HPC's own Triple Jet Burner,
which is exactly the claim — the tubes are in the pot, the burner is separate and swappable.
Ship all three sizes. Do not re-raise.

**Stop escalating warranty wording — read the live page and write from it** — Evan,
2026-09-08. *"No reason to keep bringing up the warranty stuff, as we've already fixed it.
Just go off of the warranty page on the website. No need to ask me. I will check everything
that is done, so I will see if there's something wrong."* Supersedes the same-day entry below
that treated the page-vs-summary gap as an open question — it is closed. The page is the
source; **making `yeti-1x1.html`'s hardcoded badge a variable is Nova's task, not a decision
to put back to Evan.** The size cap still binds on steamer, commercial and the 160 QT.

**The live warranty page governs — it is what the customer sees** — Evan, 2026-09-08.
Settles a wobble: Evan restated the warranty as "5-year for all consumer pots, 2-year for the
big commercial pots." Checked against the live page, which reads **"LIMITED FIVE YEAR WARRANTY
— FOR RESIDENTIAL USE ONLY (120 Quarts or smaller)"** plus a **full two-year on everything**.
So the 2-year is universal, not commercial-only, and **the 120 QT size cap is real** — "all
consumer pots" would wrongly include the 160 QT. Evan's ruling: the page wins because it is
what a customer can read. **The `5-YR RESIDENTIAL WARRANTY` badge is approved** on 18/80/120 QT
creative; it was only ever blocked because `yeti-1x1.html` hardcodes it template-wide and would
carry it onto a steamer or commercial boiler.

**`hpc-dark-evergreen` locked, all three sizes** — Evan, 2026-09-08. Pot lifted 40px on the
9:16. 80px was tried first and collided with the propane chip — 40 is the clean maximum without
moving the chip or rescaling the product. ⚠️ Maya's later render pass overwrote it; restored and
re-verified the same session.

**Labor Day ads stay live overnight Sept 8→9** — Evan, 2026-09-08. Switching them off before
bed was offered (~$60 of spend against a dead code between midnight and 6:30am) and **declined**
— he does not expect meaningful overnight volume. Takedown happens at 6:30–7am. Do not re-raise.

**The always-on discount codes are welcome codes, and they do not stack** — Evan, 2026-09-08.
`FANDF`, `HPCWS`, `TEXT25`, `COOK25` and the rest have no end date **by design** — they are the
email/SMS signup rewards. **A customer using a live sale code cannot also use one**; it is one
or the other. Closes a proposed audit before the November promo. No action needed.

**Sale comms were already handled; Stephen's commercial 10% is standing, not sale-tied** —
Evan, 2026-09-08. Coalition, Stephen and Biljana all knew the sale ends tonight, so no
end-of-sale notifications were needed. **Stephen has an ongoing go-ahead to give 10% off on
commercial orders over the phone** — that authority does not expire with the Labor Day sale.
**Popups are Biljana's and she is handling them.**


**Paid Meta static ads ship 1:1, 9:16 and 1.91:1 — 4:5 is organic only** — Evan, 2026-09-08.
Replaces the earlier `{1x1, 4x5, 9x16}` set. The old set had no horizontal, so right column,
Search and Audience Network had no correctly-shaped asset. 4:5 comes out because its job is
feed posts and carousels. `build-set.sh` now builds the three paid sizes and **exits non-zero
if any is missing**, so an incomplete set cannot ship quietly; `--with-4x5` for organic builds.

**Add new ads, never replace creative on a live ad** — Evan, 2026-09-08, acted on.
Meta counts a creative change as a significant edit, so the ad resets into learning either
way — replacing also discards the original's social proof and takes a converting ad offline.
Two final-hours ads (`LaborDay_C_FinalHours_Sept8`, `LaborDay_D_TunnelTube_Sept8`) were
published as duplicates of `LaborDay_B_HPCDark_Sept1-8` with nothing paused.

**Concept C ran on the sale's last night rather than being held** — Evan, 2026-09-08.
The hold argument was "a quality argument needs frequency and time." It did not survive his
push-back: learning-phase cost only matters if the ad has a future, and every ad in that set
was being switched off at midnight. Frequency 5.05 argued *for* fresh creative that night.

**The Labor Day sale worked — +31.8% on residential core, YoY** — established 2026-09-08.
An earlier "roughly flat" read stripped lumpy commercial and non-cooker lines from the sale
week but not from the baseline, which itself carried 23.0% commercial. Corrected, the lift is
real and is a floor. **The soft spot is AOV at $321.03**, the lowest of four windows and 24%
below the prior-year week on the same mechanic.
→ `archive/2026-09-08-labor-day-sale-analysis.md`

**A Performance pot ships with the basket, the lid AND the drain valve — every size**
— Evan, 2026-09-08. The Performance PDPs never say what is in the box and their variants
only choose a valve, so the claim looked unsourced and the 30 QT Performance card was held
back from print. Confirmed now and filed in
[what-we-sell.md](../my-business%20%28context%29/what-we-sell.md). The only thing a
Performance pot lacks against a Powered is the welded burner and stand. Unblocked the
60/80/100/120 QT Performance cards.

**Turkey rack fitment comes from Evan, not the product page** — Evan, 2026-09-08. The live
PDP body contradicts its own variant names ("40 or 50 QT" vs "30 QT or larger"). The truth:
**Single Upright ($25)** fries one bird and is built for the **30 QT Turkey Fryer** — usable
in a 60 QT for a single turkey; **Dual Rack ($59.95)** fits the **60 QT** perfectly.
**Ignore the page body.** Filed in what-we-sell.md.

**Showroom card naming, set by Evan 2026-09-08** — "**Fryer**", never "Fish Fryer /
Brazier". Both 4-Way products are "**4-Way Fryer / Pasta Cooker**"; the POWERED/PERFORMANCE
tag distinguishes them. The 40 Gallon is "**40 Gallon**", never "160 QT". The 40 QT Sauce
Stock Pot gets no card. Commercial boilers above the 40 Gallon get no cards — no photos.

**All 31 showroom cards built and handed to Alexis** — 2026-09-08. Batches 1–3 complete:
10 Powered cookers, 7 Performance, 2 steamers + the 40 Gallon, 6 burners, 5 accessories.
Cards are generated from one data table with a gate that measures the rendered card, not a
character budget — character counts proved a poor proxy for width and let a clipped price
row through. Every claim traces to that product's own PDP, what-we-sell.md, or a figure
Evan set. Detail → [archive/2026-09-08-showroom-cards-complete.md](archive/2026-09-08-showroom-cards-complete.md)

**The live NOLA directory copy is now on file, verbatim** — Evan supplied it 2026-09-08,
closing the gap logged earlier the same day. 134 words. → [description](../my-work%20%28outputs%29/content/other/trade-shows/2027-02-nola-home-garden-description.md)
Three things in his edit are worth not re-opening: **"come by the booth and check it out for
yourself"** is the propane fix and it holds; **"right here in south Louisiana"** replaces the
draft's Covington-and-45-minutes, his call; and **the patent number and the team of twelve are
out of the blurb** — they belong on booth signage, where the specific number does more work than
the word "patented."

**"Rolling boil in under 7 minutes" is not a new exception** — 2026-09-08. The live blurb states
it flat rather than the house *"as fast as."* This is **the same call Evan already made for the
showroom cards on 2026-09-03**, on the same grounds: it is verbatim the live 30 QT PDP copy.
Everything else in the paragraph stays qualified. Treat the two as one standing position, not two
separate lapses, and do not "fix" it back.

**Louisiana Outdoor Expo, Mar 19–21 2027 ($900) — declined** — Evan, 2026-09-08.
Closes the item that had been sitting open since 2026-09-03. Do not re-raise it. HPC's only
booked 2027 show is NOLA Home & Garden.

**Corrections to the NOLA Home & Garden booking, same day** — Evan, 2026-09-08. Two figures
recorded earlier that day were wrong and are corrected here rather than by rewriting them:
**the booth cost $1,700, not $1,850, and it is a standard 10×10, not a corner** — $1,850 was
the corner price and we did not get a corner. One open side instead of two; that is a booth
layout constraint, not just a saving.

**🔥 Propane is not allowed in the NOLA Home & Garden exhibit hall** — confirmed by Evan with
the show, 2026-09-08. This answers the open risk logged earlier today and it answers it the
bad way: **HPC cannot boil at this booth.** The strongest thing the company can do in front of
a stranger — a clock on a pot hitting a rolling boil in about seven minutes — is unavailable
for three days in front of a New Orleans homeowner audience. Consequences already filed in
[trade-shows/README.md](../my-work%20%28outputs%29/content/other/trade-shows/README.md): the
demo becomes video with a legible running clock, the hands-on moment becomes an upturned pot
with the welded tubes exposed, and **the high-res tunnel-tube image already on order from
Garrett stops being a nice-to-have** — for a booth that cannot demo, that image is the demo.

**Evan edited the submitted description himself; the brain's copy is not the live text** —
2026-09-08. He pasted the long version and adjusted it, including removing the *"watch a pot
come up, and time it yourself"* line once propane was ruled out. The drafts on file have been
corrected for the propane constraint, but **what is publicly published is Evan's wording and
the brain does not have it.** Ask him to paste it in before anyone treats the file as the
published copy.

**NOLA Home & Garden Show Feb 19–21 2027 booked and paid in full** — Evan, by phone,
2026-09-08. $1,850 for the 10×10 corner. This closes a board item that had been open since
2026-09-03 as "no deadline but placement worsens with time" — the placement argument won.
**It is HPC's first fixed 2027 date and it lands in February, the Mardi Gras / season-ramp
month**, in front of a New Orleans homeowner audience 45 minutes from the Covington shop.
⛔ The Nov 11 Cater-Event Expo remains a no; that has not changed.

**The long (146-word) version of the exhibitor description is the public copy** — Evan,
2026-09-08. Three lengths were written against an unknown character cap; Evan used the
longest. Deliberate choices inside it, so they are not re-litigated later: **no warranty
line at all** (it cannot carry both required qualifiers — residential, 120 QT or smaller —
at that length, and a shortened 5-year claim is false), **no discount or show special**
(pricing is a Beau call, not a copy one), fryers appear only as *fish fryers* and never near
crawfish, and every performance number is qualified. **Open risk:** the copy promises
*"watch a pot come up, and time it yourself"* — a live demo. Whether an indoor 10×10 booth
may run propane is unconfirmed, and if it may not, the line must be revised before the
directory prints. → [description](../my-work%20%28outputs%29/content/other/trade-shows/2027-02-nola-home-garden-description.md)

**BB-TJB fitment wording narrowed to "PAIRS WITH 60 QT AND UP"** — Evan, 2026-09-08.
The V3 carousel's frame 2 originally read "pairs with ANY Performance pot." Nothing
documents that: `what-we-sell.md` confirms the Triple Jet fits a 60 QT (works, just isn't
the pairing to lead with) and pushes 80/100/120, but says nothing about the 30 or 40 QT
Performance pots fitting. Evan chose 60-and-up over the narrower 80/100/120 — wider net,
still inside what is documented. **Fitment is now a standing landmine on the board:** never
widen a fitment line past `what-we-sell.md`, same failure mode as the leg-extension fitment
catch in V2.

**Burner modules dropped from the V3 carousel; Thermo Paddle in their place** — Evan,
2026-09-08. He did not want to push burner modules in this piece. Frames 3 and 4 now run as
a ladder — paddle alone at $69.99, then the Ultimate Combo at $129.98 with the Cooling Ring
and two free 4 lb seasoning bags. **No dollar saving is stated on either frame**, because the
Cooling Ring is a price range ($55.99–$74.99) and no single subtraction against $129.98 is
true. Superseded burner-module template and renders parked, not deleted.

**V3 carousel ships despite two backordered SKUs** — Evan, 2026-09-08. It points at the
adjustable shelf ($119.99, 1 unit) and the 10" Banjo ($139, 0 on hand); both oversell to
backorder. Ship-as-is, because backorders are already the accepted store-wide condition —
the oversold-SKU question was deliberately parked 2026-09-01 and singling out one creative
would re-litigate it. **The obligation that comes with it:** if comments or DMs ask about
delivery on those two, the honest answer is backorder, not in stock.

**Showroom card format locked — 5.5 in x 4.25 in at 300 dpi, four to a LANDSCAPE page**
— Evan, 2026-09-03. Approved on the 30 QT Powered/Performance pair after three passes.
The size is not cosmetic: four landscape cards only fit on a landscape Letter page, and
type had to be set in points-on-paper (body 10-11 pt) rather than pixels. Product sits
bottom-left, all type runs full width above and right of it, the price block fills the
bottom-right. Format + print setup + two pre-flight checks documented in
[showroom-cards/README.md](../my-work%20%28outputs%29/content/other/showroom-cards/README.md).
**Full catalog batch held by Evan** the same day — format is settled, only the go-ahead
is missing.

**Showroom cards carry no warranty line and no price date** — Evan, 2026-09-03. Evan asked
for all fine print removed. Saying nothing about the warranty is the safe state (the risk
has always been a *shortened* 5-year claim, never silence). The cost is that a printed card
cannot be recalled when a price moves — so re-pull and re-render before every print run.

**Card claim wording: "rolling boil in under 7 minutes" and "fry oil to 350 degrees in
under 10 minutes"** — Evan, 2026-09-03. The boil line is firmer than the house
"as fast as / up to" rule but is verbatim the live 30 QT PDP copy. The frying figure is
Evan's, and is deliberately *more conservative* than the documented "350 in under 5 minutes"
— that 5-minute stat belongs only to the 18 QT Fish Fryer, the 4-Way and the 40 QT. Filed
into [what-we-sell.md](../my-business%20%28context%29/what-we-sell.md).

**Leave the 4 live Labor Day Meta ads unchanged through Sept 8, including the weaker
duplicate ad** — Beau, 2026-09-03. One ad ("Copy," $91.64/purchase) is clearly weaker
than its sibling ($34.38/purchase), but pausing or restructuring mid-flight resets
Meta's learning phase for all of them. With 5 days left in an 8-day sale, the reset
costs more than trimming the weak ad would save. Revisit after Sept 8, not before.

**Clean Jul 20–Sep 2 Meta pull ($9,285.94 spend, ~180 purchases, $51.59 CPP, ~8.16
ROAS) replaces the flagged Jul 12–Aug 28 figure ($62.53 CPP, 6.91 ROAS) as the number
of record** — 2026-09-03. The old figure blended 8 days of BM Digital agency spend
(fired Jul 20, ~$1,036/day) into the in-house number (~$236/day); the new pull starts
the window at the actual handover date. Confirms the contamination theory — cleared
to share with Jay or Robert with the caveats on [BOARD.md](BOARD.md) attached (Meta's
own attribution, pre-refund, blends new/returning, mixed attribution windows across
the two campaigns).

**Keep all nine agents, rewrite each with a non-overlapping lane** — Evan, 2026-09-02.
Pruning was on the table (evidence: none of the eight template agents has ever produced
a work product). Evan chose specificity over deletion — overlap is the disease, and
sharp lanes cure it without losing coverage.

**Obsidian is the interface, not a custom-built dashboard** — Evan, 2026-09-02.
No supported way exists to build persistent UI inside Claude Code. Obsidian opens the
same folder Claude Code edits: one copy of state, no sync layer. A published artifact
was considered and dropped — it can't edit the real file.

**Version control the brain: local git + private GitHub** — Evan, 2026-09-02.
287 MB / 381 files, nothing over 40 MB, no LFS needed. Private is non-negotiable — the
folder holds net sales figures, CAC and margin models, the Meta pixel ID, team and
supplier detail. First commit `4cc7a73` is the pre-restructure rollback point.

**`my-desk (now)/BOARD.md` replaces `NEXT-SESSION.md` as the state layer** — 2026-09-02.
The old file reached 304 lines because it was append-only: corrections stacked on stale
claims instead of replacing them. The board is rewrite-in-place with a hard cap; this
file is the append-only half. Original archived verbatim, nothing deleted.

**Digit becomes source of truth for inventory and overhead, overriding Shopify** —
Evan, 2026-09-01. Inventory findings parked until it connects. **Ask it about overhead
before stock** — overhead is the missing input for the real CAC ceiling.

**CAC ceiling is provisional; the figure on record is a break-even line** —
Robert, 2026-08-28. Gross profit per unit contributes nothing to overhead, so it is a
floor, not a spending limit. Do not justify budget increases from the old table.
→ `internal/reports/2026-08-28-cac-model-v2.md`

**2026-07-20 is the analytical dividing line** — Evan, confirmed 2026-09-01.
The exact day BM Digital was fired. Data spanning it is two operators, not one trend.
Reports cut at Jul 12 include 8 extra days of BM Digital spend.

**Venon removed, never to be reconnected** — Evan, 2026-09-01.
Its ad figures did not match the platforms, its data was stale, and it had no COGS or
shipping configured, so its profit numbers were wrong. It also held write access to
live Shopify COGS and shipping.

**Warranty claim corrected across 8 brain files** — Evan, 2026-09-01.
Verified against `highperformancecookers.com/pages/warranty-information`. Full 2-year on
all products; limited 5-year on **residential** pots **120 QT or smaller**, owner pays
labor and shipping both ways. Never state the 5-year without both qualifiers.

**Email / SMS / Klaviyo is Biljana's lane, entirely** — Evan, declined twice by 2026-09-01.
Do not propose email work, request Klaviyo access, or analyse email performance.

**Google Ads + SEO is Coalition's lane — monitor and report only** — Evan, 2026-08.
Suggestions are packaged as a document Evan can forward, never as instructions and never
as direct changes. Basecamp is the real workspace, not email.

**Product tiers rewritten** — Evan, 2026-09-01.
Main push is **Performance pots 80/100/120 QT + Boil Boss Triple Jet Burner**. Small
**powered** pots 18/30/40/60 QT are a separate Tier 1 push. Steamers moved to Tier 2.
Navimow and Rugged Road are Tier 3 inbound-only. Only Predator grills are do-not-market.

**Paid creator content discontinued** — Evan, 2026-08.
The affiliate program stays (UpPromote, 5% commission, free product). Judge partners on
*incremental* revenue, never activity metrics — BM Digital claimed three-quarters of
annual revenue while shipping free product to creators who never posted.
