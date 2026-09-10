# Overhead in the ad ceiling: per order, revenue share, or neither
**2026-09-10 · ROUX · answers Evan and Jay's questions on [v3 and its addendum](2026-09-10-cac-ceilings-v3.md)**

Read-only throughout. Nothing was written to Shopify, Meta or Google. **No actual CAC is quoted.** Meta
figures are **cost per purchase (CPP) on Meta's own purchase count**, not CAC. All ceiling arithmetic is
derived by ROUX from the sourced inputs in section 2. **None of it is a Shopify number.**

---

## The call

**Don't switch to revenue share. Take overhead out of the ad ceiling completely, and test the 20% target
where overhead actually sits: the whole business, once a month.**

- **Revenue share is the wrong lever.** At the order level it moves the 18 QT from $2.06 to $6.93, and it
  cuts the main push by $85–$107 per order (120 QT Powered $97.85 → $7.66 · Platinum $97.09 → −$9.61).
- **Taking overhead out (the incremental rule)** puts the 18 QT at **$73–$100 per incremental order**. Every
  other line rises by exactly its overhead share, so the ranking between products doesn't change.
- **It rests on two things that aren't proven today:**
  1. The business is at or above 20% net right now. That's **Pull D**.
  2. Enough of Meta's claimed purchases are real. The 18 QT clears only if **41–55%** of Meta's claimed
     purchases are incremental orders. Shopify can see **15–19%**.

---

## 1. Jay's two questions, answered straight

**"Would it be better to have it not per order?"** For ad decisions, yes. But the fix isn't to swap in
revenue share. Both methods charge the fryer for rent it doesn't cause. The fix is to stop charging overhead
in the ad ceiling at all, and to check overhead once, at the business level, every month.

**"Can the 18 QT actually make money?"** It already does. A Jun–Aug 18 QT order brings **$189.37** of
contribution before ads *(derived, addendum)*. The $97.49 is an **allocation, not a cost the fryer causes**:
the $49,550/month is paid whether it sells or not (Jay, 2026-09-10). The real question is whether each
**ad-bought** fryer order leaves enough after the ad. Under the incremental rule, it can pay **$73–$100** for
that order and still leave 20% of the order's revenue.

**One more thing Jay should hear.** The fryer isn't what stands between the business and 20%. More orders
spread the same fixed overhead thinner. That's how the business gets *to* 20%. Per-order allocation assumes
overhead stays at 20.6% of sales forever.

---

## 2. Facts used

| Input | Value | Source |
|---|---|---|
| Overhead | $49,550/mo, steady year-round → $594,600/yr. Ad spend not inside it | Jay, by text, 2026-09-09 and 09-10. Rough estimate, not audited |
| Overhead per order | $97.49 (÷ 6,099 paid orders, trailing 12 mo) | Finn, Shopify, [orders-for-overhead-allocation](2026-09-10-orders-for-overhead-allocation.md) |
| Trailing-12 net sales | $2,882,913, **including a ~$383k Lowe's return reversal booked Feb 2026** | Same file, ShopifyQL |
| Overhead ÷ net sales | **20.625%** · ~18.2% if the Lowe's reversal is added back | Derived |
| Orders per month | 190 (Sep 2025) to 1,080 (Mar 2026). Overhead did not change | Finn, Shopify GraphQL · Jay, 2026-09-10 |
| Per-order net and gross profit per anchor | Jun–Aug 2026 and Sep 2025–Aug 2026 means | Finn, Pull A, [order-level-pulls](2026-09-10-order-level-pulls.md). Net after discounts and refunds, landed COGS at current `unitCost` |
| Break-even per order | Net − landed COGS − variable | v3 addendum |
| Meta CPP, `18qt-TOF` | $40.56 (37 purchases, 30 days to Sep 8) | Ads Manager, Board 2026-09-09 |
| What Shopify can see of Meta | 24 last-visit Meta-UTM orders (30 on first or last visit) against 155 Meta-claimed purchases, Aug 10–Sep 8. 0 of 278 matchable to a campaign by name | Finn, Pull B. **An observation, not an attribution rate** |
| Target | 20% net profit after overhead, of net revenue | Jay, by text, 2026-09-09 |

**Assumptions carried over from v3:** card fees 2.9% + $0.30, packaging $3, warranty 1%. **Not measured.**

---

## 3. Five products, three methods

**The formulas (break-even is the same in all three):**
- **Per order (Jay's approved method):** ceiling = break-even − $97.49 − 20% × net
- **Revenue share:** ceiling = break-even − 20.625% × net − 20% × net
- **Incremental rule:** ceiling = break-even − 20% × net. **No overhead charge in the ad ceiling**
- **Gate on Meta's count:** 40% of the incremental ceiling. This assumes Meta over-counts by up to 2.5×. **That's a judgment, not a measured figure** (section 6b)

| Product · basis | Net/order | Break-even | **Per order** | **Revenue share** | **Incremental** | Gate on Meta's count | Meta CPP on file |
|---|---|---|---|---|---|---|---|
| **18 QT powered** · Jun–Aug, all orders | 449.08 | 189.37 | 2.06 | 6.93 | **99.55** | 39.82 | $40.56 |
| 18 QT · Jun–Aug, full-price only | 458.24 | 201.42 | 12.28 | 15.26 | 109.77 | 43.91 | |
| 18 QT · 12 months | 398.94 | 153.65 | −23.63 | −8.42 | **73.86** | 29.54 | |
| 18 QT · one $340 fryer (the median order) | 340.00 | 141.39 | −24.10 | 3.27 | **73.39** | 29.36 | |
| **120 QT Powered** · Jun–Aug | 909.96 | 377.33 | 97.85 | 7.66 | **195.34** | 78.14 | None, product-specific |
| 120 QT Powered · 12 months | 836.94 | 333.03 | 68.15 | −6.98 | 165.64 | 66.26 | |
| **Triple Jet, not in a bundle** · Jun–Aug | 520.59 | 234.18 | 32.57 | 22.69 | **130.06** | 52.02 | None |
| Triple Jet, not in a bundle · 12 months | 510.57 | 222.05 | 22.45 | 14.63 | 119.94 | 47.97 | |
| **Performance pots, any size** · Jun–Aug | 903.17 | 369.86 | 91.74 | 2.95 | **189.23** | 75.69 | None |
| Performance pots · 12 months | 911.77 | 365.49 | 85.65 | −4.92 | 183.14 | 73.25 | |
| **Platinum Bundle** · Jun–Aug ⚠️ 17 orders, 88% costed | 990.03 | 392.59 | 97.09 | −9.61 | **194.58** | 77.83 | None |
| **Leg Extensions** · one unit, attach-only | 119.00 | 62.16 | −59.13 | 13.82 | 38.36 | 15.34 | Not advertised alone |
| **Cooling Ring** · one unit, attach-only | 59.99 | 39.82 | −69.67 | 15.45 | 27.82 | 11.13 | Not advertised alone |

**Which rows are valid ad ceilings:**
- The 18 QT, 120 QT, Performance and Platinum rows use Finn's order-level means.
- The Triple Jet uses **not in a bundle**, because a burner ad doesn't produce bundle orders.
- Legs and Cooling Ring use v3's single-unit rows. The addendum's order-level figures for them are pot and
  fryer baskets that happen to carry the accessory, so they aren't ad ceilings (addendum, "Read before using").

**What the table says (ROUX):**
- **Revenue share only rescues cheap single-unit orders**, like the $285 fryer and the accessories. It wrecks
  the main push, because it charges a $900 order $186 of overhead.
- **The incremental rule leaves every line with roughly the same share of its order for ads.** That's 19–25%
  of net for the pots, burner and fryer, against 20% held back for the target. So the fryer's ceiling is
  half the pot's in dollars, but it's the same bar in proportion.

---

## 4. Pressure test of the proposal

**Point 1, that the allocation method barely matters at the order level: agreed. Verified.** Per order $2.06,
revenue share $6.93. What sinks the fryer is asking every order to carry both overhead and 20% on its own.

**Point 2, that overhead is fixed: agreed, within a volume limit.** Across a 5.7× swing in monthly orders, overhead
didn't move (Jay). Dropping the fryer would move its $97.49 share onto every other order. The limit is in 6c.

**Point 3, the incremental rule: agreed on the math.** With fixed overhead, an added order raises the
business's net margin *m* if and only if its contribution after ads, as a % of its revenue, is at least *m*.
**Four corrections before it goes to Robert:**

**A. This is v2's formula, and Robert will see that.** v2 also used break-even − 20% × net. The difference
is what the 20% claims to do.
- **v2** said the 20% covered overhead *and* profit on every order. That was false, and v3 was right to
  kill it.
- **The incremental rule** claims less. An order at the ceiling doesn't pull the business below 20% if it's
  already there, and pulls it toward 20% if it isn't. **Overhead coverage is tested separately, every month,
  on the whole business.**
- **Without that monthly check, this is v2 again, and Robert's point 3 stands against it.** The check is the
  whole difference.

**B. The failure test is misstated.** "The base business covers overhead" isn't enough. By the same math, the
rule keeps the business at or above 20% only if it's **already** at or above 20%.
- If the business is at 12%, every campaign can pass the rule while the business misses its target.
- The rule isn't *wrong* in that case, because each passing order still raises the margin. But a clean
  per-campaign scorecard would be **false comfort**. That's Robert's point 3 in a new form.
- **The test Pull D has to answer is "is the business at 20% net today?"** That's section 7.

**C. $99.55 is the generous basis.**
- The Jun–Aug mean is lifted by the 37.4% of fryer orders that add legs. The median order is **$340**, one
  fryer alone. The 12-month mean is **$398.94**.
- The only look at Meta-tagged fryer orders is **8 orders at $375.31 net** (Pull B; includes the sale; far too few to lean on).
- **Scale on ~$73. Treat $99.55 as the top of the range.**

**D. The ceiling is per *incremental* order. Meta's CPP isn't.** "$40.56 leaves room" is true only on Meta's own count.
Here's what share of Meta's claimed purchases has to be real *(derived)*:

| At `18qt-TOF`'s $40.56 | Share of Meta's claims that must be real incremental orders |
|---|---|
| To clear the incremental ceiling, Jun–Aug basis ($99.55) | **41%** |
| To clear the incremental ceiling, conservative basis ($73.39) | **55%** |
| To add any profit at all (break-even $189.37 · $153.65) | **21% · 26%** |
| **What Shopify can see** | **15–19%**, a floor, since Meta counts view-through and cross-device purchases |

The truth sits somewhere between 15–19% and 100%. **Nothing on file says where.** That's why the gate in 6b exists.

---

## 5. Recommendation: three yardsticks, one job each

| Level | Question it answers | Rule | Overhead | How often |
|---|---|---|---|---|
| **Ad or campaign** | Should this dollar be spent? | **Incremental rule:** CPP leaves ≥ 20% of the order's net after landed COGS, variable costs and the ad | Not charged | Weekly, against the gate on Meta's count |
| **Product line** | Does this line carry its weight? | **Per order, as Jay approved:** the v3 and addendum table | $97.49 per order | Quarterly, with Jay |
| **Whole business** | Are we at 20%? | Contribution − **all** ad spend − $594,600 ≥ 20% × net sales | All of it | **Monthly. This is the binding test** |

- **Contribution margin vs net profit.** The ad rule leaves 20% as *contribution after ads*. Net profit exists
  only at the business level, after overhead. The two are never reported as the same number.
- **The answer to Robert's point 3:** the ceiling isn't set at full contribution. It holds back 20% of every
  order's revenue. Overhead is proven every month at the business level, where it's actually paid, rather than
  assumed order by order. If the business check fails, it shows on one line, not buried across twenty product
  ceilings.
- **The zones, redefined:**
  - **Zone 1:** at or under the incremental ceiling. Scale within the gates.
  - **Zone 2:** between that and break-even. Adds dollars but dilutes the margin. Jay's "$2M at 20% over $3M
    at 8%" says don't buy there.
  - **Zone 3:** above break-even. Kill.
  - This mostly answers v3's open Zone 2 question.
- **The denominator question (6,099 vs 5,304) drops out of every ad ceiling.** It matters only for the
  product-line review.
- **Jay approved per order.** This keeps it, for the job it does well. Moving the ad ceiling off it is **Jay's call**.

---

## 6. Guardrails

### 6a. A cap on low-ticket lines
**Scope:** 18 QT powered and non-powered, 30 QT, 40 QT, and accessories.
**The cap:** combined, no more than **25% of the daily Meta budget**. At $350/day that's about **$86**. That's
exactly where three 20% ladder steps from $50 land ($60 → $72 → $86).

- **Why 25%.** The fryer was **22.8%** of DTC orders in Jun–Aug and **15.5%** over 12 months *(Pull A, derived)*.
  Ads shouldn't push the mix past its own off-season share.
- **Why a cap at all, if every order clears the rule:**
  1. **Capacity is spent in orders, not dollars.** A fryer order takes the same handling as a 120 QT order
     for half the contribution ($189 vs $377).
  2. **Meta's purchase optimization drifts toward the cheapest conversion** in any mixed campaign.
  3. **The incrementality risk is biggest where the dollar ceilings are smallest.**
- **Watch the IW campaign's 18 QT ad** as a share of that campaign's purchases. It counts toward the cap.
- **Accessories stay attach-only.** Their incremental ceilings exist ($38.36 legs, $27.82 ring). But the
  gate on Meta's count would be **$11–$15**, which isn't a realistic cold-traffic CPP. And 35% of 12-month
  ring orders are the ring alone (Pull A). **ROUX's judgment:** those buyers probably already own the pot.
  Push attach at full price.

### 6b. Meta's claimed CPP vs the real cost of an incremental order
- **The gate:** step up only when trailing-7 Meta CPP is **≤ 40% of the incremental ceiling**. For the fryer,
  that's **$29–$40**. **Keep the ladder's existing $30.** The other gates: 120 QT $66–78 · Triple Jet alone
  $48–52 · Performance $73–76 · Platinum $78.
- **The Shopify step-read turns the ladder into its own test.** Each step must show up in **Shopify 18 QT
  orders from all sources**, trailing 14 days, measured against the prior 14 and the same weeks of 2025.
  **Two steps with no visible lift → step back.** It's a read, not a proof. Finn runs it weekly.
- **Unblock Pull B.** Evan reads the **Campaign ID** column in Ads Manager, which is read-only. Switching the
  URL parameters to `utm_campaign={{campaign.name}}` is a Meta change, so it's **Evan's permission**.
- **Correction to v3 section 7, step 2.** Requiring the UTM-matched read to clear would switch off all
  prospecting, since Shopify sees only 15–19%. **Use it as a floor and a trend, not a pass/fail.**

### 6c. Where "fixed" overhead stops being fixed
- **Fact:** 1,080 orders in Mar 2026 on the same $49,550 as 294 in Aug (Finn · Jay). So capacity is
  **at least 1,080 orders a month** at today's overhead.
- **Off-season headroom** against that peak: Jun **589**, Jul **746**, Aug **786** orders/month *(derived)*.
  A fryer ladder at its $86/day cap, at a $30 CPP, is about 86 claimed orders a month. That's a fraction of the headroom.
- **Trigger:** any month forecast above **~1,000 orders**, or any hire, extra space, overtime or software-tier
  change. In those months the rule charges a **marginal overhead per order**. **I don't have that number.**
  **Jay:** what would you add first, and at roughly what monthly order count?
- **Consequence:** the rule is safest June–October, which is exactly the year-round mandate window. It needs a
  peak-season charge in March and April.

---

## 7. Pull D: the result that breaks this

**Pull D needs:** trailing-12 contribution before ads **C** (all channels, landed COGS at current
`unitCost`, v3's variable assumptions) · net sales **S** · total ad spend **A**, Meta and Google.
Business net margin **m = (C − A − $594,600) ÷ S**.

| Pull D shows | What it means | What happens |
|---|---|---|
| **m ≥ 20%, with room** | The recommendation holds | Adopt. Reopen the ladder. Lift $350/day by the cap only (section 8) |
| **0 < m < 20%** | **Breaks it as a promise.** Every campaign can pass while the business misses | The rule stays for *new* spend, since it still raises m. $350/day holds. Existing spend is re-tested against the incremental ceilings first. Jay hears that the gap is price, landed cost or overhead, not the fryer |
| **C ÷ S < 40.6%** | 20% is out of reach **even with zero ad spend** | A conversation about the target or overhead. Ads can't fix it |
| **C only, no A** (no Google spend feed on file) | Only the third test can run | Report C ÷ S against 40.6%. Say plainly that m is unknown |

**What's on file (facts, then a read):**
- **Fact, derived from Pull A:** anchor orders run **38.5–45.0%** contribution before ads. The zero-ad threshold
  of **40.6%** sits inside that band. Accessories carry higher margins. Dealer and POS orders aren't in
  Pull A at all.
- **ROUX's read, not a number:** it's close. **Nobody tells Jay or Robert the business is at 20% until Pull D says so.**
- **The Lowe's reversal:** it depresses S. Added back, overhead is about 18.2% of sales and the threshold falls to
  about 38.2%. **Finn reports both.**

---

## 8. Board verdicts that change

| Verdict | Was (v3) | **Now** |
|---|---|---|
| **18 QT ladder** (Now #3) | Withdrawn. Hold at $50/day | **Reopened, if Jay adopts the incremental rule.** The gates don't change: trailing-7 Meta CPP ≤ $30, frequency ≤ 2.5, ≤ 20% every 3 days. Add the Shopify step-read (6b). **Top out at $86/day** (6a). At today's $40.56 (30-day) **it doesn't pass the gate, so it stays at $50 until it does.** The $20.09 from sale week doesn't count |
| **$350/day** | Holds, as a real limit | **Holds until Pull D lands.** Committed: **$344** once retargeting is built. Ladder step one would make it **$354**. **Pull D clears:** lift it by the ladder cap only, +$36 → **$386/day**. **Pull D fails:** the ladder is funded inside $350, with no new money. Swap it for per-campaign ceilings once campaign IDs are mapped |
| Zone 2 question to Jay | Open | Folded into the method choice (section 5) |
| IW campaign's 18 QT ad | Drags the campaign's weighted ceiling | No longer a drag on the incremental basis. Counts toward the 25% cap |

**Unchanged:**
- The break-even kill lines, including `BPM_TOF_Manual`'s interim $128.09.
- The ⛔ on 30%-off legs.
- Accessories stay attach-only.
- "Never quote a cost-per-customer figure."

**Now stale on the Board:** Now #3's "3.1× headroom vs ~$63" and the "CAC ceilings are provisional" parked line.

---

## 9. Text for Evan to send Jay

> We looked at it, and switching overhead to a percent of revenue doesn't really help the 18qt, it only moves it about $5 and it would drop the big pots and the bundle to almost nothing. The better way is to take overhead out of the ad math completely, since rent and payroll are the same whether we sell a fryer or not, so each ad just has to leave us 20% of the order after the product, fees and the ad. On that rule the 18qt can spend about $73 to $100 per order the ads actually bring in, and we'd check the whole business every month to make sure overhead is covered and we're still at 20%. The one thing that could change this is if the business overall isn't at 20% right now, so I'm pulling that number and will send it over when I have it.

---

## Open

- **Jay:** adopt the incremental rule for ad ceilings? And the capacity trigger (6c).
- **Finn:** Pull D, against the tests in section 7. The weekly Shopify step-read, once the ladder moves.
- **Evan:** read the Campaign ID column (read-only).
- **Caveats:**
  - Jun–Aug spans 2026-07-20, which is two operators.
  - Platinum is 17 orders.
  - The variable costs are assumptions.
  - The Pull A net already deducts refunds. v3's single-unit rows don't.

→ [v3 + addendum](2026-09-10-cac-ceilings-v3.md) · [order-level pulls](2026-09-10-order-level-pulls.md) · [overhead orders](2026-09-10-orders-for-overhead-allocation.md) · [cac-model-v2](2026-08-28-cac-model-v2.md) · [Board](../../../my-desk%20%28now%29/BOARD.md) · [decisions](../../../my-desk%20%28now%29/decisions.md)

---

## Addendum: Pull D result against section 7 (2026-09-10)

*Claude, applying section 7's pre-set tests to Finn's Pull D ([pull-d](2026-09-10-pull-d-business-contribution.md)). **This is arithmetic on sourced inputs. It isn't a Shopify number or a new ROUX judgment.** The variable costs are the same assumptions as v3's.*

- **Fact (Finn, Shopify, 2026-09-10):** all 6,099 paid orders, Sep 2025–Aug 2026: net revenue **$2,863,027.44**, gross profit **$1,187,514.36** (**42.11%** of costed revenue; 1.50% or $42,912 is uncosted). The Lowe's order was **cancelled**, so it's out of every figure and there's no with/without split.
- **Derived:** overhead ÷ net sales = 20.77%. **The zero-ad threshold for 20% net is 40.77%.**

| Case | Contribution before ads (C) | C ÷ S | Short of threshold | Net before any ads | Net after Meta Jan–Aug only (upper bound) |
|---|---|---|---|---|---|
| v3 assumptions, costed lines only (floor) | $1,055,730 | **36.9%** | $111,476 | 16.1% | **≤ 8.8%** |
| v3 assumptions, uncosted lines at same margin | $1,073,799 | **37.5%** | $93,406 | 16.7% | **≤ 9.4%** |
| most generous: card fees on DTC only, no packaging/warranty | $1,147,154 | **40.1%** | $20,052 | 19.3% | **≤ 12.0%** |

**Section 7 outcome: row 3.** In every case C ÷ S is below 40.8%. **So 20% net is out of reach even with zero ad spend** at today's prices, landed costs and ~$49,550/mo overhead. The most generous case misses by about $20k a year, which is within the error of a rough overhead estimate. Under v3's assumptions it misses by about $93k–$112k.

**The upper bound on actual net margin:** subtracting only the Meta spend on file ($210,213.94, Jan 1–Aug 28 2026) gives net **at most about 8.8%–12.0%**. That's an upper bound. It leaves out four months of Meta spend (Sep–Dec 2025) and **all** Google spend.

⚠️ **This hasn't been confirmed against a second source.** Finn found that Shopify's own COGS figures don't reconcile, so cost has no second source inside Shopify. **The P&L, from Jay, is the check** (see the next addendum). Nobody should state HPC's net margin as a fact until it has been compared with the books.

**What it means, from ROUX's section 7:** a conversation about the target or overhead. Ads can't fix it. The gap is price, landed cost or overhead, not the fryer. The incremental rule still holds for *new* spend, because an order that clears 20% after ads raises a margin that's below 20%.

---

## Addendum: the P&L check (2026-09-10)

- **Fact (Jay, HPC P&L, last 365 days, 2026-09-10):** profit margin before overhead or advertising is **46%**.
- **Gap:** 46% against the 42.1% gross profit Pull D derived from Shopify at current landed cost. That's **3.9 points, about $111,658 a year** on Pull D's revenue. **The cause isn't known.** Candidates:
  - The P&L books actual cost at the time of sale, while Pull D costs every order at today's landed cost. If costs rose during the year, Pull D understates the past.
  - The P&L's revenue may include the shipping customers pay.
  - The 46% may come before card fees.
  Shopify can't run the test: its own COGS figures are incomplete (Q-D5c).
- **Assumption:** the P&L revenue base is the same as Pull D's $2,863,027. Overhead is 20.77% of it, so the zero-ad threshold for 20% net is 40.77%.

| What the 46% includes | Kept before ads | Room for ads at 20% net | Net after Meta Jan–Aug only (upper bound) |
|---|---|---|---|
| 46% already after card fees and other variable costs | 46.0% | 5.2% ($149,787/yr) | **≤ 17.9%** |
| 46% is before card fees etc. (our usual assumptions) | 41.4% | 0.6% ($18,002/yr) | **≤ 13.3%** |
| 46% before card fees; card fees on website orders only | 44.0% | 3.2% ($91,357/yr) | **≤ 15.8%** |

**What changes:** section 7 moves from **row 3 to row 2.** 20% net is reachable with zero ad spend. The previous addendum's "out of reach even with zero ad spend" is **superseded.**

**What doesn't change:** in every case the business is **under 20% net after the Meta spend on file** ($210,213.94, Jan 1–Aug 28, 7.3% of sales), and that's before four months of Meta and any Google spend. Under row 2, the incremental rule holds for new spend, $350/day holds, and existing spend gets re-tested first.

**Which margin to use for ad ceilings:** the ceilings stay on **current landed cost**. The next unit sold costs today's price, whatever last year's P&L says. If the gap turns out to be rising costs, next year's margin runs nearer 42% than 46% unless prices move.

**Jay's answers, 2026-09-10:** the 46% is **after card fees** and **after shipping cost**. Shipping
charged is in P&L revenue and the shipping cost is deducted. Landed cost rose slightly during the
year. **Jay's decision: use 46%.** → Row 1 of the table above applies: about **5.2% of sales, or
~$150k/yr, is the room for all advertising at 20% net**, on Pull D's revenue base. The P&L base
includes shipping, so the real figure shifts slightly. Meta alone was $210,213.94 over Jan–Aug.
**Pending from Jay's P&L:** net profit % after overhead and advertising (this replaces the derived
upper bound), total advertising including Google, and total COGS to compare against Pull D's
$1,632,600.87.

---

## Final addendum: the P&L's full year (2026-09-10)

**Facts (Jay, HPC P&L, last 365 days):**
- Net profit **−5%**. Jay says some of it was unforeseen, one-time expenses, and backend changes are underway.
- Advertising and marketing **$676,000**: Google $206k · Meta $258k · agency fees $152k · other $56k · affiliates ~$4k.
- COGS **$1,680,000**. The 46% margin was described as after card fees and shipping.

**Facts (Shopify, ShopifyQL, 2025-09-10 → 2026-09-09):**
- Net sales $2,902,399.16
- Shipping charged $242,199.97
- Taxes $95,575.15
- Total sales $3,240,728.67
- 6,442 orders

**Derived:** P&L revenue is assumed to be Shopify net sales plus shipping, **$3,144,599**.

| Line | $ | % of revenue |
|---|---|---|
| 46% margin | 1,446,516 | 46.0% |
| − Overhead (~$49,550 × 12) | −594,600 | −18.9% |
| − Advertising and marketing | −676,000 | −21.5% |
| **= Net before anything else** | **175,916** | **5.6%** |
| Net per the books (−5%) | -157,230 | −5.0% |
| **Unexplained, not in overhead or marketing** | **333,146** | **10.6%** |

**The distinguishing check:**
- (Revenue − COGS) ÷ revenue = **46.6%**, which is the 46% with nothing else deducted.
- Estimated card fees ($95,914, assuming 2.9% + $0.30 on every order) plus freight-out (taken as equal to the shipping customers paid) = **$338,114**. That's within ~$5k of the unexplained gap.
- P&L COGS $1.68M against Pull D's current-cost COGS adjusted for 1.5% uncosted (~$1,657,463): **within 1.4%**. So Shopify's landed costs match the books.

**Reading:** the numbers fit a 46% that comes *before* card fees and freight, with fees and freight (recurring) making up most of the −5%. **That contradicts how the 46% was described, and it isn't confirmed.** The test is P&L total revenue. If it's ≈ $3.14M, this reading holds. If it's materially higher, the 46% is after fees and freight as described.

**What holds either way:**
- **$676k of marketing is well past what 20% net allows.** As described, 20% leaves ~$222,996/yr (~$304,596 if the overhead's $6,800/mo agencies sit inside the $152k agency fees). Under the other reading, 20% isn't reachable even at $0 marketing, and net at $0 marketing would be ~16.9%.
- **The biggest controllable line is marketing, not the fryer and not the overhead method.** Re-testing the $676k against the incremental rule is the next ROUX job. Google ($206k) is Coalition's lane: monitor and suggest only.
- **The per-product ceilings stand.** Shopify landed cost matches P&L COGS.
