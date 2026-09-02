# Decisions

> **Append-only.** Newest at the top. Never rewrite a past entry — if a decision is
> reversed, add a new one that says so and link back.
> One line per decision: **what · who · when · why.** Detail belongs in the linked doc.
>
> This file exists so [BOARD.md](BOARD.md) never has to carry history. The board says
> what is true now; this says how it got that way.

---

## 2026-09

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
