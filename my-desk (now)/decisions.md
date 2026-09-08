# Decisions

> **Append-only.** Newest at the top. Never rewrite a past entry — if a decision is
> reversed, add a new one that says so and link back.
> One line per decision: **what · who · when · why.** Detail belongs in the linked doc.
>
> This file exists so [BOARD.md](BOARD.md) never has to carry history. The board says
> what is true now; this says how it got that way.

---

## 2026-09

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
(pricing is a ROUX call, not a copy one), fryers appear only as *fish fryers* and never near
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
