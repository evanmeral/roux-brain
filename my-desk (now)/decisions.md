# Decisions

> **Append-only.** Newest at the top. Never rewrite a past entry — if a decision is
> reversed, add a new one that says so and link back.
> One line per decision: **what · who · when · why.** Detail belongs in the linked doc.
>
> This file exists so [BOARD.md](BOARD.md) never has to carry history. The board says
> what is true now; this says how it got that way.

---

## 2026-09

**Hold the IW lookalike campaign — no cut, no budget change, re-check Sept 18** — Evan, on ROUX's recommendation,
2026-09-14. First read is $299.94 spent over 3 days, 1 Meta-claimed purchase, **0 Shopify UTM-matched orders, $0 real
revenue**, ad set still in Learning. **Why not cut:** Meta needs ~50 conversions per ad set to leave Learning; 3 days
at n=1 is noise, not signal. **What would change the call:** at Day 7 / ~$700 spend, or on Learning exit, if matched
orders are still 0 and spend has passed the $73/real-order ceiling, that becomes a real cut conversation.
→ board Running section

**No change to Meta daily caps off the 20%-net budget rebuild** — ROUX, accepted by Evan 2026-09-14. BPM stays $164,
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
  within 1.4%. Parked for ROUX and Finn.

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
ROUX's call in `cac-ceilings-v3` §6b. URL tracking tags go on the three new ads only;
`BPM_TOF_Manual` and `18qt-TOF-Prospecting` are not touched. → `internal/2026-09-10-intentwave-call-2-recap.md`

**IntentWave is input, not a work queue** — Evan, 2026-09-10. They advise for free; their
meeting notes are shared for context and ideas (e.g. bundling), not to generate questions or
tasks for them. Decisions are made in-house. Figures said on calls are spitballing — Jay has
read everything and is in the loop, so no correction campaign is needed.

**Bundles: no discount codes, mainly HPC product, stock is not a constraint** — Evan,
2026-09-10. A bundle's discount is built into its price, so no code applies on top. Outside
add-on items are fine if they help sales, but not a sourcing project for a single item.
Stock is fine; Digit connects in a few weeks. **ROUX to build a tailgate / Thanksgiving
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

**CAC ceilings v3 replace the provisional ones; ROUX withdraws the 18 QT override** —
ROUX, 2026-09-10, arithmetic spot-checked by Claude. Built on confirmed landed cost,
$97.49 overhead per order and a 20% net target, **one unit at full price**: the floor for a
full-price order, not the order-level figure. **The 18 QT fryer's ceiling is −$26 alone and
$15–18 with legs**, against a $128–141 break-even. ROUX withdraws its recommendation to go
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
ceiling table. ROUX building it now. → `internal/reports/2026-09-10-landed-cost-by-variant.md`

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
the second for those 114. **Asked Jay which it is.** ROUX holds the ceiling table until he
answers. → `internal/reports/2026-09-10-landed-cost-by-variant.md`

**Overhead is steady year-round — $594,600/yr** — Jay, 2026-09-10, by text. The ~$49,550/mo
is the same every month; payroll does not rise in crawfish season. So annual overhead is
$49,550 × 12 = **$594,600**, and the **~$97.49 per order** (÷ 6,099 paid orders, trailing 12
months) stands. That was the last input the CAC ceiling needed from Jay. Denominator choice
(all paid orders, all channels) remains ROUX's proposal; Jay has not objected or confirmed it.

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
