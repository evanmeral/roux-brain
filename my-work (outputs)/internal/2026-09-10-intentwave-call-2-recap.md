# IntentWave call 2 — Thu Sept 10, 9:00–9:30am CDT
**Source:** Motion AI recap, forwarded by Jay 2026-09-10 10:24am. **AI notes, not a transcript** —
garbled in places ("bowling season" = boiling season, "Bana" = Biljana). Full Motion note needs
Jay's login; not read. Room: Teresa McDaniel, Loni Polk, Peter Damato, Tommy (IntentWave) · Jay · Evan.
Previous call: [2026-09-10-intentwave-recap-review](2026-09-10-intentwave-recap-review.md).

> ⚠️ Figures below are what was *said in the room*. Several do not match our sources. Checks inline.

---

## Action items assigned

| Owner | Item | Our note |
|---|---|---|
| Evan *(recap says Jay)* | Send screenshots of the draft IW lookalike campaign to Loni via Slack for review | Recap calls it "remarketing" and "1% purchaser lookalike" — it is neither. It's a **cold** 1% lookalike off `IW - LA Audience`, excluding 30D visitors, 90D purchasers, dealers. Make the screenshots say so |
| Loni + Tommy | Huddle on **bundle ideas** to raise margin and AOV | Lines up with our November plan and ROUX v3 (push attach at full price) |
| Loni | Reach out to **On3** (college sports media, Nashville) re partnership / product placement | Pete's lane. ⛔ No seeded product without a signed deliverable and deadline |
| Tommy | Review **Klaviyo** abandoner flows, maybe mock up emails | ⛔ Biljana's lane. We stay out |
| Loni / team | Investigate **page-view discrepancy** — Meta 30,000 page views on Aug 27, Shopify doesn't show them | Finn testing Shopify sessions by day |

## Numbers said in the room vs. our sources

| Said | Our source | Status |
|---|---|---|
| **Meta spend, 30 days: $54,800** | **Ads Manager, read live 2026-09-10: $6,337.14 (Aug 11–Sep 9) · $6,400.87 (Aug 10–Sep 8)** — BPM $4,899.88 + 18qt $1,500.99, ties to the cent. Matches the derived $6,400 from the 09-09 read | 🔴 **Wrong by ~8.6×. Matches no window tested** (90 days $39,871 · YTD $212,874 · 12 mo $258,566). Source of $54,800 unknown |
| Google spend ~$15,000 | **I don't have that number** for this window. Last on file: $17,436, Jul 20–Aug 20 | Untested |
| Total sales, 30 days: $130,000 | Shopify Aug 11–Sep 9: **$130,902.88 total sales** (incl. shipping + tax) · **$115,971.64 net** · 321 orders *(ShopifyQL, Finn 2026-09-10)* | Matches **total sales**, not net |
| Meta: ~$10K last click, ~$18K any click | Shopify, Aug 11–Sep 9, net: **$7,780.31 last click · $9,268.40 last non-direct · $14,258.48 any click** *(ShopifyQL attribution models)* | Lower than said. Meta Shops (11 orders, $2,134.94 gross) is separate |
| Google $56K | Net: $34,122 last click · **$50,664 last non-direct** · $57,066 any click. Paid Google by UTM ≥ **$27,104** net (floor — paid + organic can't be split) | Close on last non-direct / any click |
| Direct $40K | **$42,196** net last click | Close |
| "$400 AOV, $220 cost, $97 overhead → $83 before ads; CAC $40, so profitable" | Store AOV Aug 10–Sep 8 **$351.90** net *(Finn)*. Overhead **$97.49**/order ✓ *(orders-for-overhead-allocation)*. Math **omits the 20% net target** Jay set *(decisions.md, 2026-09-09)*. "$40" is Meta cost per purchase on Meta's count, not CAC | See [cac-ceilings-v3](reports/2026-09-10-cac-ceilings-v3.md): 18 QT one-unit ceiling **−$26**; 120 QT $57–82 |
| "Cheapest pot sells for $340, costs $210–220" | $340 = 18 QT powered, valve + basket, landed **$182.05**; cheapest powered 18 QT is $285 at **$142.50** *(landed-cost-by-variant, Shopify)* | Cost overstated |
| $222,000 left in carts, 30 days | Meta add-to-cart value | Meta's figure. Don't repeat |
| Labor Day: "$10 off most items, 30% off one extension" | Creative: "10% OFF EVERYTHING" + 30% off legs *(board)* | Garbled — 10%, not $10 |
| "No double-counting, event scores good" | Shopify: **24 orders** carry a Meta paid UTM on last visit vs **155** Meta-claimed purchases, Aug 10–Sep 8; Meta UTMs carry numeric IDs, not names *(order-level-pulls, Finn)* | Loni's UTM point is right |

*Channel rows: last click and last non-direct each sum exactly to $115,971.64 net; any click
double-counts by design ($195K gross). Last click under-credits Meta — someone sees an ad, then
searches Google or types the URL. The true incremental figure is not measured anywhere.*

## The page-view "discrepancy" — tested (Finn, 2026-09-10)

**Shopify online-store sessions, CDT:** Aug 26 2,252 · Aug 27 1,637 · **Aug 28 14,169** · Aug 29 5,470 ·
Aug 30 1,997. Aug 20–21 also elevated (6,257 · 7,325).
**Meta Events Manager, pixel 1861969194014116, all events:** Aug 27 8,319 · **Aug 28 27,651** · Aug 29 21,919.

- **Fact:** the spike is **Aug 28, not Aug 27**, and **Shopify spikes too.** Not a Meta-only pixel fault.
- **Observations, cause not tested:** Aug 28 surge starts 07:00 UTC, runs flat 600–711 sessions/hour
  overnight, **94% "direct"**, 7 checkouts (0.05% conversion vs 0.21–0.37% Aug 25–27). **Looks like
  bot traffic.**
- **A second pixel fires on the site:** `491960645999331`, 69.4K events / 28 days. Owner unknown.
- PageView-only by day: **I don't have that number** (chart showed all events).
- **Conclusion, not fact:** it matters for the **30-day visitor audience** (retargeting pool, and the IW
  campaign's exclusion) until Aug 28 ages out ~Sept 27. It does not obviously affect the IW lookalike,
  which optimizes on purchases. Whether bot sessions made it into Meta audiences is untested.

## Where the room and our work agree

- **"The core issue is margin, not ad cost."** ROUX v3 reached the same finding independently:
  it's the overhead and the 20% target, not Meta.
- **Fix UTMs.** Our order-level pull hit exactly this wall.
- **Bundles to lift AOV and margin.** Real 18 QT orders carry **$210.18** gross profit vs **$142.50**
  for the unit alone *(order-level-pulls, Jun–Aug)*. Attach is where the margin is.
- **Retargeting is the gap.** Board Now #1.

## Business context — recorded, not ours to act on

- Jay submitted an **SBA loan** Fri 2026-09-04 (6–10 days) for working capital and to **manufacture
  pots, baskets and lids domestically** instead of importing from China. ~1 year to get equipment in.
  Peter said margin effect Dec/Jan — the recap contradicts itself. *(Jay, in the room.)*
  ~~⛔ No "made in USA" or domestic-manufacturing claim in any copy until it is true.~~
  **Superseded 2026-09-11:** Evan approved "Made in USA" and "Built in Louisiana" as claims. The conflict
  with Jay's line above is logged, unresolved, in `decisions.md`.
- Peter raised cost of money (cash advance) eating margin; suggested raising prices or bundling.
  **Pricing is Jay's call.**
- Peter suggested sourcing Walmart items into bundles — brand risk; ROUX to weigh.

## Evan's answers on call 1 (2026-09-10)

- Jay agreed to **nothing** with Peter's managed-spend proposal.
- The "$61–62 break-even" was **Evan's rough estimate**; IntentWave is not working to it.
- The new videographer **is Garrett** — on-file pricing ($500 or $2,500 for 8) is correct.
- The Labor Day extension was **only floated**.
- Nobody has reviewed the draft yet; Evan is sending screenshots to Loni.
