# IntentWave call, Sept 9 1pm — what the recap says, and what holds up
**2026-09-10.** Source: Motion AI recap of "Meta Campaign Launch (IntentWave)", forwarded by Jay
2026-09-09 2:17pm. **AI meeting notes, not a transcript** — garbled in places ("18 court" = 18 QT,
"competitor cooking software", "Jupyter"). The full Motion note needs Jay's login; not read.

> ⚠️ Everything IntentWave said is their account. Standing rule: check against Shopify before
> repeating to Jay or Robert. Checks below.

---

## New facts since the call

- **Follow-up moved to Thu Sept 10, 9–9:30am CDT** — invite from Teresa McDaniel
  (`teresa@persistent.id`), sent 5:35am. Guests: Loni Polk, Peter Damato, Evan, Jay
  (`jay@hpcookers.com`). Agenda: review IW Contacts audience in Meta; new campaigns and scaling.
  Evan marked optional. Motion's daily brief for Evan listed no morning meetings. *(Gmail)*
- **Peter Damato is IntentWave** (`peter@persistent.id`), not HPC. **Loni Polk** = "Lonnie". *(Gmail)*
- **Jay sent landed cost + overhead 2026-09-09** and wrote "keep pushing - looks like the approach
  is working." Logged in decisions.md. The $350/day ceiling was set "until landed cost lands" —
  **now due for recalculation.** *(Gmail, Jay reply to Labor Day email)*

## Action items they assigned

| Who | Item |
|---|---|
| Evan | Contact the videographer who missed the Sept 8 call; plan **six new videos** modelled on winners |
| Evan | Share the new videographer's video in Slack for Peter to review |
| Dalton | Send invite for follow-up → **done, moved to Thu 9am** |
| Dalton + lead media buyer + design specialist | Review Evan's draft campaign, give feedback **before Friday launch** |
| Dalton | Use attribution software to find the **24 buyers** of the 18 QT fryer from the top ad; build a modelled audience |
| Peter | Draft a proposal to **manage ad spend with performance incentives**, "as agreed by Jay" |
| Peter | Meet Loni + one other to finalise proposal and custom-audience strategy |

## Their numbers vs. ours

| They said | We have | Status |
|---|---|---|
| $5,000 → 120 sales, "CAC" ~$41, 30 days | `BPM_TOF_Manual` 118 purchases @ $41.52 *(Ads Manager, 30d to Sept 8)* | Matches. One campaign, Meta-claimed purchases, cost per purchase — **not CAC** |
| $50,000 revenue, >8x ROAS | Meta-reported conversion value | ⛔ Never present as revenue |
| 18 QT UGC review ad: $1,278 → 24 units, $16,000, 12.66x, ~$674 AOV | Evan's read, same 30 days: "Customer review video, 18 QT" **15 purchases @ $64.89** *(Evan's email to Jay/Robert 2026-09-09)* | **Does not reconcile** — count and spend both differ |
| 30 QT video: frequency 6.33, "CAC" $36 | Jay's 30 QT demo **$19.41 × 13** *(same email)* | Cost does not reconcile; frequency concern consistent with BPM 5.05 (Sept 1–7) |
| "Break-even CAC ~$61–62" | Nearest on file: **18 QT provisional ceiling ~$63** *(cac-model-v2)* | Mislabelled — it is a ceiling, 18 QT only, provisional. Needs recalculating with Jay's inputs |
| Retargeting ~$300 in 365 days | Not on file | Unverified; consistent with board Now #1 |
| "No LTV, customers not repeat buyers" | See Shopify below | **Not supported as stated** |

## Shopify check — Finn, read-only, 2026-09-10, window Aug 10 – Sep 8 2026

**Store total:** 326 orders · **$114,718.70 net** · AOV $351.90. *(ShopifyQL `FROM sales`; order pull
also returns 326.)* 7 cancelled + 16 $0 warranty/replacement inside that (Finn hand count, one source).

**Orders containing an 18 QT fryer** (3 titles: powered 64, non-powered 3, scratch & dent 1):

| | Orders | Net | AOV |
|---|---|---|---|
| Paid (excl. 1 cancelled, 1 $0 replacement) | **66** | **$27,658.40** | **$419.07** |
| Also excl. 2 wholesale | 64 | $27,148.40 | $424.19 |

- **Only 4 of 66 are $600+** (#17176, #17241, #17274, #17283 — multi-fryer orders).
- 16 were the fryer alone. 37 carried a real add-on (excluding Shipping Protection).
  Top add-ons: Shipping Protection 35 · **Leg Extensions 30** · skimmer 11 · thermometer 9 · wind shield 5.
- Net ties to ShopifyQL; the order pull's refund math is $60.88 higher, gap unexplained.
- Shopify cannot attribute orders to an ad. **This does not prove or disprove the 24-from-one-ad
  claim — it says the store's own 18 QT order value is ~$419, not ~$674.**

**Repeat buyers:**
- Of 286 customers who ordered in the window, **86 (30.1%) had an earlier order.** Two methods agree.
- 12 months (Sep 9 2025 – Sep 8 2026): **935 of 5,027 customers (18.6%) ordered 2+ times.**
  Online Store only: 14.0% (denominator not independently checked).
- Can't see: 59 orders with no customer (excluded); one person on two emails (understates);
  **dealers/wholesale and $0 warranty orders mixed in (inflates)** — dealer share of the 935 unknown.
- ⚠️ ShopifyQL's new + returning columns double-count (200 + 112 ≠ 286). Don't use them as a split.

## Conclusions — not facts

- **Repeat buying exists but is modest.** "No LTV" is wrong; how much LTV should raise a CAC
  ceiling needs margin on repeat orders, which we don't have.
- **The $674 figure is Meta's pre-discount conversion value** and should not be repeated.
- **Evan's Sept 9 email to Jay/Robert said AOV fell "most likely because we have been pushing the
  18qt fryers."** That cause wasn't tested. In this window 18 QT orders ($419) ran *above* store
  AOV ($352). Different window from the sale, so not a refutation — but don't build on that line.

## Problems with their plans

1. **24-person modelled audience** — Meta lookalikes need a 100-person minimum source. Retargeting
   24 existing buyers also hits our purchaser exclusion. Ask how their software ties buyers to an ad.
2. **Labor Day extension to ~100,000** — breaks the landmine: no sitewide % discount before
   November. Undercuts the deadline finding. If "blast" means email → Biljana's lane.
3. **Peter's managed-spend proposal** — changes the lane (Meta is Evan's; IW advises, free).
   Any incentive must pay on **incremental Shopify revenue**, never Meta-reported ROAS (BM Digital).
   Money call → Beau.
4. **Six videos** — recap says "$500 each, maybe $2,000 for 8." Garrett on file: $500 or **$2,500
   for 8** *(our-team.md)*. Confirm who and what price. Money call → Beau.

## Open questions — answered by Evan, 2026-09-10

1. **The Thursday 9am happened.** → [call 2 recap](2026-09-10-intentwave-call-2-recap.md)
2. **Jay agreed to nothing** on Peter's managed-spend proposal.
3. **"$61–62 break-even" was Evan's rough estimate.** IntentWave is not working to it. Superseded by [cac-ceilings-v3](reports/2026-09-10-cac-ceilings-v3.md).
4. **The new videographer is Garrett.** On-file pricing ($500 or $2,500 for 8) is correct; the recap's $2,000 was a rough estimate.
5. **The Labor Day extension was only floated.**
6. **Nobody has reviewed the draft.** Evan is sending screenshots to Loni.
