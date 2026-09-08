# Decisions

> **Append-only.** Newest at the top. Never rewrite a past entry — if a decision is
> reversed, add a new one that says so and link back.
> One line per decision: **what · who · when · why.** Detail belongs in the linked doc.
>
> This file exists so [BOARD.md](BOARD.md) never has to carry history. The board says
> what is true now; this says how it got that way.

---

## 2026-09

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
duplicate ad** — ROUX, 2026-09-03. One ad ("Copy," $91.64/purchase) is clearly weaker
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
