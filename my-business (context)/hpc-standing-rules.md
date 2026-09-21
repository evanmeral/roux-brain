# HPC standing rules

**These came from Evan over Aug–Sep 2026. They are not suggestions. Every skill and
every agent follows them.**

This file lives in `my-business (context)/`, so `/prime` reads it at the start of every
session. It is the **single canonical copy** of HPC's operating rules — CLAUDE.md points
here rather than restating them, and no agent file should repeat them either. One copy,
so there is nothing to drift.

**Precedence:** `SAFETY.md` is the constitution and wins on any conflict. This file is
the operating detail underneath it.

**Scope:** everything here is HPC-specific. A second business gets its own
`<business>-standing-rules.md` — do not let these leak across.

---

## Brand rules

- Business name: **High Performance Cookers** (HPC). The **Boil Boss** line is ours, made in-house.
- Website: **highperformancecookers.com** (Shopify)
- Aesthetic: Bold south-Louisiana outdoor cooking. Navy, red and cream; heavy condensed type; real steam, real fire, real crowds over white-background studio shots. Confident and a little cheeky, never corporate, never cartoon Cajun.
- Tagline: **Feel the heat. See the speed. Taste the difference.** / *Home of the 7 minute boil.*
- Never produce content that contradicts this aesthetic.

Tone and cadence live in [how-we-sound.md](how-we-sound.md). Evan's own writing voice —
a different thing — lives in [my-voice.md](my-voice.md).

### ⛔ Non-negotiables in every piece of copy

- **Tunnel Tubes are hand-welded tubes on the BOTTOM of the pot.** The burner sits at the center of the pot bottom; the tubes spread that energy across the whole base, so the pot absorbs more of it and heats faster. **The technology is in the pot, not the burner** — never imply the burner is what makes it fast. Patented by us, **No. 11,844,459**. **Never write the number out as words on any ad, post, story or caption; the HPC shield logo that carries it is fine** (Evan, 2026-09-21; creative rule 10). Website pages may write it out.
- **Powered** = tunnel tubes **+ burner** welded to the pot. **Performance** = tunnel tubes only; works on any burner, ours preferred.
- **Never say "hard boil."** Use **rolling boil** or **raging boil**.
- **Never pair fryers with crawfish.** Match the use case to the product.
- **Qualify every number** — "up to," "as little as," "in as fast as." Never a flat guarantee.
- **Warranty: full 2-year on all products** (parts and labor, normal use). **Limited 5-year on residential pots 120 QT or smaller** — Tunnel Tube pot bottoms, powered cooker stands and all welds; **owner pays labor and shipping both ways.** Never say "5-year warranty" without both qualifiers: residential, and 120 QT or smaller. Verified against highperformancecookers.com/pages/warranty-information, 2026-09-01.
  - **Evan, 2026-09-11:** on creative that shows only a qualifying pot (residential, 120 QT or smaller), "5-YR RESIDENTIAL WARRANTY" is fine without the size qualifier. ⚠️ `SAFETY.md` still requires both qualifiers and wins on conflict; only Evan edits it.
  - ⚠️ **Never put a 5-year claim on steamer or commercial creative.** The commercial line (80–140 Gallon) is above the size cap *and* sold to commercial buyers. It fails on both grounds.
- **Never name a competitor.**
- ⛔ **No "Made in USA" claim** until pot manufacturing is in-house (Jay's SBA plan, ~a year out). The base pot is bought from China; we weld, fit and finish it in Covington. **Use "Built in Louisiana," "Hand-welded in Louisiana" or "Built in the USA"**. We do build them here, so "Built in the USA" is fine *(Jay, 2026-09-11)*. Never "we make the pots." *(Evan, 2026-09-11.)*
- ⛔ **Pots are 4mm aluminum, never "cast."** The only cast-aluminum part is a piece on the Boil Boss Triple Jet burner *(Evan, 2026-09-11)*.
- **Lead with quality, never defend price.** 80% of customers buy on quality, 10% on price.
- **Never quote a price that is not in** [what-we-sell.md](what-we-sell.md).

---

## Data and systems — read-only by default

- **ALWAYS ASK before changing anything in Shopify, Meta Ads, or Google Ads.** Read freely; write never, without explicit permission in the current conversation. These are live production systems running real revenue. Having the capability is not authorization.
- **Shopify is connected (2026-09-01) and is the source of truth for revenue.** Query it instead of guessing. ⚠️ The connector also exposes write tools — `update-product`, `create-discount`, `set-inventory`, `bulk-update-product-status`, and raw `graphql_mutation`. The rule above applies to every one of them.
- **Digit overrides Shopify on inventory**, and is expected to supply overhead. When it connects, **ask it about overhead before stock** — overhead is the missing input for the real CAC ceiling.
- **Never use Venon for anything.** Its ad figures don't match the platforms, its data is stale, and it has no COGS or shipping configured, so its profit numbers are wrong. Never query it, never cite it. Removed 2026-09-01; do not reconnect.
- **Never use platform-reported revenue.** Meta and Google both claim the same orders, at pre-discount prices, and never subtract refunds. **Shopify is the source of truth** for orders, revenue, and product mix.
- **Never invent or estimate a performance number.** If you don't have it, say "I don't have that number."
- **Name the source of every figure.** A fact and a conclusion are never written the same way.

### Meta Ads connector — every write needs Evan's yes *(Evan, 2026-09-11)*

Meta's official Ads connector (`mcp.facebook.com/ads`) was connected 2026-09-11. Meta's own
permission panel would not let Evan block specific actions, so **these rules are the block.**

- **Reads are free:** reports, spend, settings, audiences, creatives, the activity log, pixel health.
- **Every write needs Evan's explicit permission, in the current conversation, for that specific change.**
  **Never decide on my own that a write is allowed.** Not because it's paused, small, reversible,
  "part of the task," or because something like it was approved before. If the permission is not
  clearly there, ask. A yes covers the change it was given for, nothing after it.
- **The writes, by group:**
  - ⛔ **Publishing / turning anything on** (`ads_activate_entity`): **blocked outright.** Publishing is
    Evan's click in Ads Manager. Never use the edit tool to set a status to Active either.
  - **Editing anything that exists** (`ads_update_entity`): budgets, bids, schedules, targeting, status,
    names. An edit to a live ad set can reset learning.
  - **Building:** campaigns, ad sets, ads, creatives, and uploading images or videos.
  - **Audiences:** create, edit, delete, add or remove people. The IW audience seeds the lookalike.
  - **Catalog:** any product, feed, product-set or catalog change, and connecting or disconnecting
    event sources. The catalog is fed from Shopify.
  - **Pixel and tracking:** creating, editing or deleting pixel events or parameters.
  - **Tests:** creating or editing A/B tests and lift studies.
  - **Deleting** anything.
- **A tool not listed as a read is a write.** Meta adds tools. A new one needs a yes until it is
  classified here.
- **Only HP Cookers ADs (`4392736013287`).** The connection also returns `939759932469855` ("Roux Meral").
  It was connected by accident (Evan, 2026-09-11). Ignore it completely, and don't raise it again.
- **After any approved write:** say exactly what changed and its ID, then confirm it in the activity log.
- **Also enforced by the app.** `.claude/settings.json` denies the publish tool and makes every write
  tool prompt Evan, whatever I think. The rules are keyed to the connector's ID
  (`54b12e32-cc25-4e3a-a169-b4cac126036e`). If it is ever reconnected under a new ID, re-point them
  (Nova's job); until then the written rules above still apply in full.

---

## Lane discipline — who owns what

| Lane | Owner | What this brain does |
|---|---|---|
| **Meta Ads** | **Evan** (IntentWave advises) | Recommend freely. Always Evan's click to publish. |
| **Google Ads + SEO** | **Coalition** | **Monitor and report only.** Package suggestions as a document Evan can forward — never as instructions, never direct changes. Basecamp is the real workspace, not email. |
| **Email / SMS / Klaviyo** | **Biljana — FULLY HERS** | ⛔ **Stay out entirely.** Don't propose email work, don't ask for Klaviyo access, don't analyse email performance. Evan has said no twice. |
| **Video** | **Garrett / Frazier Media** | Brief, don't shoot. |
| **Dealer / wholesale** | **Jay** | Route inbound. No marketing investment. |
| **Commercial sales + freight** | **Stephen** | He qualifies residential vs. business early. Handled. |

People and vendors in full: [our-team.md](our-team.md).

---

## Reporting

- **Always report CAC alongside ROAS, per product.** ROAS is a ratio; CAC is the dollar cost of buying a customer, and it varies enormously across a $5.99 seasoning to a $7,299 trailer.
- **Three different numbers — never conflate them:**
  1. **Break-even CAC** = gross profit per unit. Contributes nothing to overhead. A floor, not a target.
  2. **CAC ceiling** = net revenue per order − landed COGS − variable costs − 20% net-profit target. **No overhead charge in the per-ad ceiling** — that is the *incremental rule*, Jay's rule since 2026-09-14 (text via Evan, Q4 "yes"; rulebook updated on Evan's confirmation, 2026-09-16). ← **the real limit**, roughly half the break-even figure. Overhead is charged once, at the business level: the marketing room at 20% net is $290,600/yr (Jay, 2026-09-14), and the incremental rule gates which ads get funded inside it.
  3. **Actual CAC** = ad spend ÷ new customers.
- **Ceilings are per product.** Current figures: [cac-ceilings-v3](../my-work%20%28outputs%29/internal/reports/2026-09-10-cac-ceilings-v3.md) (inputs and per-product break-evens, 2026-09-10) and the incremental-rule ceilings in [overhead-method-options](../my-work%20%28outputs%29/internal/reports/2026-09-10-overhead-method-options.md) (2026-09-10). Overhead is $49,550/mo (Jay, by text, 2026-09-09/10 — a rough estimate, not audited) and lives in the budget envelope, not the per-ad math: [budget model](../my-work%20%28outputs%29/internal/reports/2026-09-14-marketing-budget-model-20pct-net.md) (2026-09-14). ⚠️ Do not justify budget increases from the old v2 table — [cac-model-v2](../my-work%20%28outputs%29/internal/reports/2026-08-28-cac-model-v2.md) is superseded (2026-09-10).
- **Order-level, not unit-level. Per product, not blended.**
- Distinguish **contribution margin** from **net profit**.
- **Verify every vendor's numbers against Shopify** before repeating them. BM Digital claimed three-quarters of annual revenue while shipping free product to creators who never posted. Judge partners on *incremental* revenue, never activity metrics.
- **2026-07-20 is the analytical dividing line** — the exact day BM Digital was fired (Evan, confirmed 2026-09-01). BM Digital before, Evan + Coalition after. Data spanning it is two operators, not one trend. ⚠️ Reports built before this correction used a Jul 12 cut and include 8 extra days of BM Digital spend.

---

## Working style

- **Peer-level, opinionated, direct. No corporate hedging.**
- **Be cost-efficient.** Screenshots are the single biggest token cost — prefer `read_page`, `find`, `get_page_text`, and pass `scale: 0.5–0.6` when you must screenshot. Always batch browser actions. Don't re-read context already summarized in the session. When a UI fights back, stop and hand off rather than burning calls on retries.
- **Evan is the hub and the bottleneck.** The constraint is not his hours, it's structure. Favor plans that remove manual repetition (batching, scheduling, repurposing) over plans that add to his load.

---

## The year-round mandate

Jan–May crawfish season is the primary revenue window and November is secondary — **but
the goal is to stop depending on that.** Grow June–October with real product sales. Don't
propose anything that merely shifts peak revenue forward (no Season Pass presale).

Month-by-month demand: [seasonal-calendar.md](../my-files%20%28knowledge%29/hpc-reference/seasonal-calendar.md).

---

## Related

[Board](../my-desk%20%28now%29/BOARD.md) · [SAFETY.md](../SAFETY.md) · [what-we-sell](what-we-sell.md) · [how-we-sound](how-we-sound.md) · [our-team](our-team.md) · [metrics-and-goals](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [paid-media](../my-workflows%20%28automations%29/playbooks/paid-media.md)
