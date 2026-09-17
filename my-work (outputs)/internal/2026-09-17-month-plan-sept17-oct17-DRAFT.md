# Month plan: Thu Sept 17 – Sat Oct 17, 2026 · DRAFT v1

**ROUX, 2026-09-17 · for Evan to work through with me · not a decision yet.**
Read-only. Nothing was written to Shopify, Meta or Google. Every Meta change below is **Evan's click**.

**Labels:** *(fact, source)* is on file · *(derived)* is my arithmetic on on-file figures · *(judgment)* is my call.
**Figures come from** [Finn's baseline, 2026-09-17](reports/2026-09-17-month-plan-baseline.md) unless another source is named.
**Pace targets are goals. They aren't forecasts.**

> ⚠️ **Read every 2025 comparison with two caveats.** 2025 was the BM Digital era, so it's a different operator.
> Returns also land on the day they're processed, so a window's net includes refunds on older orders.

---

## 0. The call, in five lines

1. **Goal:** beat last year's Sept 17–Oct 17 on Shopify net with no sitewide discount. The growth has to come from consumer lines (kits, turkey, the main push), not commercial lumps. By Oct 17, turkey season and BFCM should be loaded and ready.
2. **The IW lookalike has been a fryer campaign by accident.** 77% of its money went to `hpc-dark-evergreen` *(fact)*. The main push has had almost no real test. **Tomorrow, turn it into that test or stop it.** Don't let it run on unchanged.
3. **Retargeting launches Mon Sept 28.** That's the day the Aug 28 bot spike leaves the pool, and the sale browsers start leaving Oct 1. It's parked, and I'm raising it because this plan's paid side depends on it.
4. **Turkey: build early, spend late.** The kit and the demo go live Oct 1. Paid weight stays light until the 2025 curve says the ramp has started, which was the week of Oct 13 last year.
5. **Measurement:** Meta claims 97 purchases and Shopify sees 16. This month we manage on two numbers side by side and never quote one alone. Every new ad carries the full UTM string from day one.

---

## 1. Goal and targets

**Goal:** *Beat Sept 17–Oct 17 2025 on Shopify net with no sitewide discount, carried by consumer lines, and hand November a live turkey kit and a signed BFCM.*

### The five targets

| # | Target | Baseline (source) | Commitment | Stretch | How it's measured |
|---|---|---|---|---|---|
| **T1** | **Shopify net, Sept 17–Oct 17** | **$94,107.13**, 195 orders, same window 2025 *(ShopifyQL, Finn)* | **≥ $94,107** | **≥ $104,800** | ShopifyQL `net_sales`, window inclusive. Weekly cumulative pace in §7 |
| **T2** | **Consumer net: T1 minus commercial cookers and Navimow** | **$73,624.33** in 2025 *(derived: $94,107.13 − $20,482.80 commercial cookers; Navimow was $0 in 2025)* | **≥ $73,624** | **≥ $82,000** | Same query, excluding the gallon-sized commercial cookers and Navimow. **This is the year-round mandate target.** T1 can be won by one $12.6k commercial week. T2 can't |
| **T3a** | **Turkey fryer net (30 QT + 60 QT, including kit component lines)** | **$13,505.40** in 2025 *(derived: $11,157.65 + $2,347.75)* | **≥ $13,505** | **≥ $15,000** | ShopifyQL by product title. Kit sales post under the component products, so they're included. Measured in **dollars, not units**: the 30 QT is now $442.50, against $345 last season *(Jay, kits plan)* |
| **T3b** | **Tailgate kit share of 18 QT orders, Sept 25–Oct 17** | 0, new product | **Reported, with no floor.** Under 10% gets flagged | **≥ 15%** | GraphQL `lineItemGroup` kit orders ÷ orders containing an 18 QT fryer. Uses the keep/rethink lines from the [kits plan](2026-09-11-tailgate-thanksgiving-bundles-plan.md) §3.3. **This is an early read, not the verdict.** The verdict stays Fri Nov 6 |
| **T4** | **The main push holds its pace into October: pots 30–120 QT + Triple Jet, net per week** | **Set after week 1.** Baseline = week 1 (Sept 17–23). For reference: in 2025, pots fell from $7,757 in week 1 to $2,457 in week 2 *(fact)*. Trailing 30 days 2026: pots $27,062 + Triple Jet $13,081, sale included *(fact)* | **Weeks 2–4 average ≥ 80% of week 1** | **≥ 100% of week 1** | ShopifyQL, Finn's group definitions. Bundle component lines are already inside |
| **T5** | **Meta efficiency, read as two brackets, per campaign** | Sept 1–16: **Meta CPP $40.44** (generous) · **spend ÷ Shopify last-visit Meta-tagged orders $245.15** (conservative) *(derived: $3,922.45 ÷ 97 and ÷ 16)* | **(a)** No campaign runs more than **7 days** past its pre-written kill line (§4). **(b)** Weekly caps stay within the **$350/day** ceiling | **`18qt-TOF` trailing-7 Meta CPP ≤ $30**, outside a sale week. That opens the ladder | Meta connector for spend, purchases and frequency. Shopify GraphQL `customerJourneySummary` for tagged orders. **The conservative bracket's target is set after week 1**, because the UTM fix (§5) will change its coverage |

**Where the stretch numbers come from:** Sept 9–16 2026 (no sale) ran **+11.4%** over the same days in 2025: $23,302.87 vs $20,926.21 *(fact)*. I applied that to T1, T2 and T3a *(derived)*. **It's a thin basis:** 8 days, 52 vs 50 orders, total revenue only. I don't have the Sept 9–16 split by product group. **Finn can pull it in week 1, and if the split says otherwise, T2's stretch changes.**

**Which CAC, per the rules:**
- T5 is judged against the **CAC ceiling under the incremental rule**, gated at 40% on Meta's count *(Jay adopted it 2026-09-14; ceilings in [overhead-method-options](reports/2026-09-10-overhead-method-options.md))*.
- **Actual CAC can't be measured this month.** There's no Google spend and no channel split for new customers *(Finn, "What I could not get")*.
- Neither bracket is CAC. **Neither is ROAS.** Shopify net is never divided by Meta spend.

### Leading indicators: watched weekly, not targets

| Indicator | Baseline | Why it leads |
|---|---|---|
| Orders/week and AOV | Sept 9–16: 52 orders · **AOV $448.13** *(fact)*. 2025 window AOV $482.60 | Tells you whether T1 is volume or ticket |
| **Completed checkouts/week** (not session conversion rate) | 2025 window: 150 over 31 days · Sept 1–16 2026: 137 *(fact)* | Bot spikes pollute sessions *(Finn §6)*, so the conversion rate can't be trusted |
| **Turkey orders/week against the 2025 curve** | 2025 by calendar week: Sep 22 wk 7 · Sep 29 wk 4 · **Oct 6 wk 9 · Oct 13 wk 19** · Oct 20 wk 26 (30 QT + 60 QT) *(fact)* | The trigger to put weight on turkey (§4) |
| Bundle + kit orders/week | Sept 9–16: 4 orders, $3,944.94 in bundle lines *(fact, GraphQL)* | Kits and Platinum carry the highest gross profit per order |
| 18 QT orders/week | Trailing 30: 69, sale included *(fact)* | Kit share needs the denominator |
| Meta frequency per ad set | `BPM_TOF_Manual` 5.05, Sept 1–7 *(board)* | Fatigue shows before CPP rises |
| **Low-ticket share of Meta spend** | **Probably above the 25% cap already** (§4) | Meta drifts toward the cheapest conversion |
| IW `hpc-dark-evergreen` share | 77% of lifetime spend *(fact)* | The reason for decision 1 |
| Discounts landing on kit lines | Target: military, first-responder, `USATHANKS` and `FANDF` only | Proves the code fix is holding |
| Returns $ in the window | Trailing 30: −$8,276.13 *(fact)* | A big refund can move T1 without any change in demand |

---

## 2. Strategy: four bets

### Bet 1: Pots hold demand into October (the year-round mandate)
- **What happened last year:** the pot line fell by two-thirds after its first week *(fact: $7,757 → $2,457)*. Performance 60–120 QT sold **$0** and the Triple Jet didn't exist *(fact)*.
- **Why this is the growth line:** in trailing 30 days 2026, the main push and bundles were a real business: Triple Jet $13,081 across 35 orders, 120 QT Performance $3,099 across 10, and 18 bundle orders *(fact)*. None of that was in last year's window. **If it holds through October, T2 clears without a discount.**
- **Economics:** the main push only works as a basket. A Performance pot plus Triple Jet has an incremental ceiling of **$189.23 per order**. On Meta's count the gate is **$75.69** *(overhead-method §3)*. Sell the pair: Platinum and Ultimate.
- **What changes:**
  - The IW test becomes a real main-push test (decision 1).
  - Retargeting's `RT 30D - Pots` set goes live Sept 28.
  - Coalition's regional-seafood suggestion (kits plan §7) is already on file for them.
- ⚠️ **Creative gap:** none of Garrett's 8 videos is a Performance pot on the Triple Jet *(shoot plan v4)*. Decision 12 asks for B-roll only, at no added cost.

### Bet 2: The tailgate kit raises the fryer order, not fryer volume
- **The problem:** the 18 QT is the off-season workhorse, but a lone $340 fryer has a CAC ceiling of **$73.39** *(overhead-method)*. Its median order is exactly that lone fryer.
- **What the kit does:** at $465 it adds **+$43.24 gross profit per kit order** on today's mix *(derived, kits plan §3.2)*. That's more profit per fryer buyer, with no discount code.
- **What it doesn't do:** it doesn't reopen the 18 QT ladder by itself. For `18qt-TOF`'s CPP to clear, ~69% of its orders would need to be kits *(kits plan §3.3)*.
- **Timing:** October is peak tailgating *(seasonal calendar)*. Go live Fri Sept 25, **gated** (§3, week 2).

### Bet 3: Turkey — build early, spend late
- **The fact:** 2025 turkey orders ran at 3–9 a week until the week of Oct 6. They doubled the week of Oct 13 and peaked at 94 (30 QT) the week of Nov 10 *(fact)*.
- **The call:** the kit, the demo video and the organic posts are live **Oct 1**, meeting the seasonal calendar's "launch by Oct 1". The paid push starts Oct 1 as **one new ad inside `BPM_TOF_Manual`**, with no new money. **Weight moves toward it only when 2026's week of Oct 5 matches or beats 2025's.** Anything earlier buys impressions ahead of demand.
- **This isn't pulling November forward.** The October turkey demand is real, and the kit sells at full price. The mandate forbids shifting peak revenue with a presale or discount. We're doing neither.
- **The 30 QT is low-ticket:** its kit ceiling is **$104.47**, gated at **$41.79** *(kits plan §4.2)*. It counts toward the 25% cap. Whether the cap bends in turkey season is Jay's call for the Oct 18–Nov 23 plan (decision 6).

### Bet 4: Load November, and fix what we can't see
- **BFCM (Nov 23–Dec 1, `BLKF26`, 10% sitewide, kits excluded):**
  - Jay signs off Sept 18. Coalition and Biljana get it the same day.
  - Nova builds the v6 landing page as a **Shopify draft** by Oct 16. Maya's ad concepts land by Oct 15.
  - ⛔ Nothing publishes and nothing is discounted before November.
- ⚠️ **A collision to put in front of Jay now:** the turkey ship cutoff and the start of BFCM are **the same day, Mon Nov 23** *(key-dates · board)*. If BFCM is announced publicly before the turkey peak (the week of Nov 9 in 2025), turkey buyers may wait for 10% and miss Thanksgiving delivery *(judgment)*. That's decision 10.
- **Measurement:** the UTM discipline and the reconciliations in §5. Without them, next month's plan gets argued from Meta's numbers.

### Not a bet: commercial
Commercial is Tier 3, inbound only, and Stephen owns it. Last year it was **$20.5k** of this window, **$12.6k of that in one week** *(fact)*. We don't spend on it, and that's why T2 exists. If a commercial order lands, T1 benefits and nobody claims credit.

---

## 3. Week by week

Plan weeks run **Thursday to Wednesday**, the same alignment as Finn's 2025 table.

### Week 1 · Thu Sept 17 – Wed Sept 23: decide IW, clear the kit gates, shoot

| Day | Job | Owner | Deliverable |
|---|---|---|---|
| Thu 17 | Read this draft, answer the §6 decisions | **Evan** | Answers |
| **Fri 18** | IW checkpoint: Meta pull, Shopify tagged orders, IDs recorded in `campaigns.md` | **Finn** | Checkpoint row |
| Fri 18 | Call the outcome against §4's pre-written terms | **ROUX** | A, B or C |
| Fri 18 | Decide, then make the edit in one pass: creative swap, plus `hpc-dark-evergreen` off if B | **Evan** (click) | Change and ID, confirmed in the activity log |
| Fri 18 | BFCM sign-off, then send to Coalition (Connor, Basecamp) and Biljana | **Jay → Evan** | Sent |
| Fri 18 | One batched text to Jay: BFCM sign-off, pixel `491960645999331`, the Nov 23 collision, the 25% cap in turkey season | **Evan** (ROUX drafts on request) | One text |
| By Mon 21 | **Chase Biljana** on `HIGH15B`/`SMS25B`. This gates both kits | **Evan** (Ada can draft) | Confirmation |
| By Mon 21 | Shopify fixes: `SC-7R` sellable online · 18 QT "Made in the USA" card · Platinum SEO title · 30 QT unqualified "5-year warranty" | **Evan or Jay** (click) | 4 fixes, read back by Finn |
| By Mon 21 | Pause the two $0-spend BM campaigns showing ACTIVE (decision 8) | **Evan** (click) | Paused |
| By Mon 21 | UTM audit, read-only: which live ads carry what (see §5) | **Finn** | One table |
| By Mon 21 | Record the size of `Website Visitors 30D (All)` now, for the Sept 28 bot test | **Finn** | Size + date |
| By Mon 21 | Reconcile Labor Day net ($41,100.84 vs $40,853.33) and the turkey count method | **Finn** | Method named, or "not reconciled" |
| By Wed 23 | Split Sept 9–16 2026 vs 2025 by product group, to test T2's stretch basis | **Finn** | Table |
| Mon 21 | `/content-week` status run. The week is already scheduled | Automation → **Evan** | Status |
| **Tue 22** | Garrett shoot: 8 videos | **Garrett** · Stephen · Jay | Footage |
| By Tue 22 | Paid cut specs for the turkey demo (1:1 · 9:16 · 1.91:1) and the 15–20s 18 QT cut | **Leo** | Cut list for Garrett |
| By Wed 23 | Tailgate kit ad for `18qt-TOF`: copy, then statics via `hpc-ad-creative` | **Maya** | 3 sizes + copy, checked against §8 |
| By Wed 23 | Swap the "MADE IN USA" stamp on `buy-cheap-twice` (all three sizes). Main-push retargeting static | **Maya** | Library files |
| By Wed 23 | Kit block on the 18 QT landing page | **Nova** (code) · Maya (words) | Ready to publish Sept 25 |

**Gates this week:** IW outcome (Fri) · BFCM signed (Fri) · Biljana confirmed (Mon).

### Week 2 · Thu Sept 24 – Wed Sept 30: tailgate kit live, retargeting live, turkey staged

| Day | Job | Owner | Deliverable |
|---|---|---|---|
| **Thu 24** | **Scoreboard #1** (§7). Week 1 sets T4's baseline and T5's conservative target | **Finn → ROUX** | Scoreboard |
| **Thu 24, noon** | **Tailgate kit go/no-go.** All five, or it slips: Biljana confirmed · `SC-7R` sellable · photos up · eligible-discounts collection excludes `Bundle` (admin check) · checkout test passes with `HIGH15` refused | **Evan** | Go or new date |
| **Fri 25** | Activate the tailgate kit · publish the kit block · publish the kit ad in `18qt-TOF` (full UTMs, Shop off) | **Evan** (clicks) | Live |
| Fri 25 | Forward the kits plan §7 suggestions to Coalition on Basecamp, if not already sent | **Evan** | Sent |
| Fri 25+ | Kit posts in the Sept 21–27 week, if a slot is open. Otherwise Sept 28 | **Sage** | Post |
| **Mon 28** | Re-read `Website Visitors 30D (All)`: did it drop now that Aug 28 is out? | **Finn** | Bots in or out |
| **Mon 28** | **Retargeting launch** (decision 2), run to the plan's §9 checklist | **Evan** (build + publish) · Finn (launch-day cap read) | Live, logged in `campaigns.md` |
| Mon 28 | Content week: tailgate kit, game day, turkey teaser for Oct 1 | Automation → **Evan** approves → Sage | 6 slots max |
| By Tue 29 | Turkey demo delivered, edited for Oct 1 | **Garrett** (Ada follows up) | File |
| By Tue 29 | Turkey kit ad copy for Jay's 30 QT demo as a new ad in BPM, pointed at the kit | **Maya** | Copy |
| **Wed 30** | Turkey kit gate: photos · checkout test on both variants · codes refused | **Evan** | Go or new date |

**Gates this week:** tailgate go/no-go (Thu noon) · retargeting launch (Mon) · turkey go/no-go (Wed).

### Week 3 · Thu Oct 1 – Wed Oct 7: turkey live, and the first real IW read

| Day | Job | Owner | Deliverable |
|---|---|---|---|
| **Thu Oct 1** | Activate the turkey kit · publish Jay's 30 QT demo ad in BPM (full UTMs, Shop off) · turkey demo live on organic | **Evan** (clicks) · **Sage** | Live |
| Thu Oct 1 | **Scoreboard #2** · retargeting creative review (the plan's Oct 1 date) | **Finn → ROUX** | Scoreboard |
| **Fri Oct 2** | **IW second checkpoint**, if outcome B. Kill terms in §4, written today | **Finn → ROUX → Evan** | Continue or pause |
| Mon Oct 5 | Content week: turkey demo cuts, tailgate kit, boil content | Automation → **Evan** → Sage | Week |
| By Wed 7 | Garrett's other cuts: the 60 QT shrimp boil and the 18 QT remake go into the creative queue | **Leo** (brief) · **Maya** (paid use) | Queue |
| Ongoing | 18 QT ladder check: trailing-7 CPP ≤ $30, frequency ≤ 2.5 | **Finn** | Pass/fail |

**Gate:** IW keep or pause (Fri Oct 2). Retargeting day 4 stop rules (Oct 2).

### Week 4 · Thu Oct 8 – Wed Oct 14: read the ramp

| Day | Job | Owner | Deliverable |
|---|---|---|---|
| **Thu Oct 8** | **Scoreboard #3** · first tailgate kit share read (2 weeks) · turkey orders for the week of Oct 5 vs 2025's 9 | **Finn → ROUX** | Scoreboard |
| Thu Oct 8 | **Turkey weight call:** if the week of Oct 5 ≥ 2025, shift weight toward the turkey ad *inside BPM's $164 and the cap*. If not, hold | **ROUX** recommends · **Evan** clicks | Call |
| Mon Oct 12 | **Retargeting day 14: the scaling gate** (frequency ≤ 2.5, CPP inside its working line, Shopify tagged orders > 0). Any raise is a swap | **Finn → ROUX → Evan** | Hold / raise-by-swap |
| By Wed 14 | BFCM ad concepts (copy and angle, statics after approval) for the signed offer | **Maya** | Draft |
| By Wed 14 | Draft of the Oct 18–Nov 23 plan: turkey peak, the 25% cap question, BFCM runway | **ROUX** | Draft |

### Stub · Thu Oct 15 – Sat Oct 17

| Day | Job | Owner |
|---|---|---|
| Thu Oct 15 | **Scoreboard #4** · the Oct 18–Nov 23 plan to Evan | Finn → ROUX |
| By Fri Oct 16 | BFCM v6 landing page built as a **Shopify draft**, not published | **Nova** · Evan reviews |
| **Mon Oct 19** | **Month close:** T1–T5 final, one page for Jay via `hpc-scoreboard-report` framing | **Finn → ROUX → Evan → Jay** |

**Evan's clicks for the month:** about 15, listed in the tables above. Everything else is drafted, pulled or built before it reaches him.

---

## 4. Paid media

### Budget by campaign (daily caps; ceiling $350)

| Campaign | Sept 17–27 | **Sept 28–Oct 17, IW continues** | Sept 28–Oct 17, IW paused |
|---|---|---|---|
| `BPM_TOF_Manual` (+ turkey kit ad from Oct 1) | $164 | $164 | $164 |
| `18qt-TOF-Prospecting` (+ tailgate kit ad from Sept 25) | $50 | $50 | $50 |
| IW lookalike | $100 | $100 | **$0** |
| `RT 30D - Pots` | — | $20 | $20 |
| `RT 30D - 18QT` | — | $10 | $10 |
| **Total** | **$314** | **$344** | **$244** |
| **Maximum for the month** *(derived)* | | **$10,334** | **$8,334** |

- **Caps, not spend.** Meta can overspend a cap on a given day: $320.09 against $314 on Sept 16 *(today.md)*. The check is the weekly average.
- **If IW is paused, the $100 isn't re-spent automatically** *(judgment)*. No live campaign has cleared a scale gate. The money waits for one that does. Decision 7.
- **New money this month: none.** Kit and turkey ads go inside existing campaigns.

### ⚠️ The 25% low-ticket cap is probably breached today
- **Cap:** 25% of daily Meta budget, **$86** at $344 *(overhead-method §6a)*.
- **Known low-ticket spend:** `18qt-TOF` $50, plus `RT 30D - 18QT` $10 once it launches.
- **Plus IW's `hpc-dark-evergreen`:** about **$77/day** *(derived: 77% of $100)*. Its destination is on file as the 18 QT landing page *(kits plan §3.3; retargeting plan §3 marks it as an inference)*. **Evan: confirm the destination in Preview, not the edit panel.**
- **Plus BPM's 18 QT and 30 QT demo videos.** Their spend by ad isn't on file. **I don't have that number.** Finn pulls it at the Sept 18 checkpoint.
- **So:** low-ticket spend is at least ~$127/day against an $86 cap *(derived)*, if the destination is confirmed. That's the strongest reason for decision 1.

### IW lookalike: the Sept 18 checkpoint, with outcomes written in advance

**The rule on file** *(campaigns.md, agreed 2026-09-14)*: if Shopify-matched orders are still 0 and spend has passed the $73 ceiling per real order, that's a real cut conversation.
**Where it stands:** $593.89 lifetime · 2 Meta purchases · **0 Shopify-tagged orders** · still Learning *(fact)*.

| Outcome on Sept 18 | Test | ROUX's recommendation |
|---|---|---|
| **A: signal** | ≥ 1 Shopify-tagged order **and** Meta CPP ≤ **$189** (the Performance pots incremental ceiling) | Continue at $100. Swap in the approved creative, one edit. Next read Fri Oct 2 |
| **B: no Shopify signal, still inside break-even** | 0 tagged orders · Meta CPP between $189 and **$365** (Performance pots break-even, 12 months) | **Refocus, don't just continue.** One edit: swap the creative **and switch off `hpc-dark-evergreen`**, so the $100 goes to the two 120 QT ads. That's the main-push test we meant to run. It accepts one Learning reset, which we'd take for the swap anyway. **Hard kill Fri Oct 2** (about $1,400 more): pause if there are still **0 Shopify-tagged pot, Triple Jet or bundle orders**, or if Meta CPP is **> $189** |
| **C: fail** | Meta CPP **> $365** (Zone 3 on Meta's own generous count) or delivery errors | **Pause.** Hold the $100 (decision 7) |

*At about $700 with 2 Meta purchases, CPP is ~$350, which is outcome B. One more purchase makes it ~$233, still B. With no new purchase and more spend, it slides toward C* *(derived)*.

### Retargeting: launch Mon Sept 28 (decision 2)
- **Why it's back up from the parked list:** Evan's reason for holding was to wait before adding another campaign. That wait ends at the Sept 18 checkpoint.
- **The cost of waiting is dated.** Sept 28 is the day the Aug 28 bot spike leaves the 30-day pool. **Oct 1** is when the Sept 1–8 sale browsers start leaving *(retargeting plan §3, §1)*. Sept 28 is the one date that catches both.
- **Build and rules exactly as approved:** `RT 30D - Pots` $20 and `RT 30D - 18QT` $10 · IW list out · no end date · §9 checklist.

### Turkey paid
- **Oct 1:** Jay's 30 QT demo goes in as a **new ad inside BPM**, pointed at the Turkey Fry Kit. Oct 1 → Mon Nov 23 *(kits plan §4.4)*.
- **Oct 8:** weight call against 2025's week of Oct 6 (§3, week 4). Any shift happens **inside $164 and the cap**.
- **Claim:** **350° in under 10 minutes** on the 30 and 60 QT, never 5. No crawfish near a fryer.

### Kill and scale rules: one table, all pre-written

| Campaign or ad | Kill (Zone 3, or on-file stop) | Hold (Zone 2) | Scale (all must hold) |
|---|---|---|---|
| `BPM_TOF_Manual` | Meta CPP > **$128.09** (interim kill line: lowest break-even among its products) | Everything under the kill line. Zone unknown until it's tagged | **No raises this month.** Frequency 5.05 is over the 3.0 raise rule |
| `18qt-TOF` + tailgate kit ad | Meta CPP > **$189** (18 QT break-even per order, Jun–Aug) | $30–$189 | Trailing-7 CPP **≤ $30** · frequency ≤ 2.5 · +≤20% every 3 days · top **$86/day**, and inside the cap |
| Turkey kit ad (inside BPM) | Ad-level Meta CPP > **$198** (30 QT kit contribution) for 7 days → turn the ad off | Up to $198 | Ad-level CPP ≤ **$41.79** (kit gate) **and** week of Oct 5 ≥ 2025 → weight shifts inside BPM |
| IW lookalike | Outcomes A/B/C above · Oct 2 hard kill | — | None this month |
| `RT 30D - Pots` | Frequency > 3.5 → cut by a third · CPP > **$60** after 4 days → pause | $40–$60 | After day 14: frequency ≤ 2.5 · CPP ≤ $40 · **Shopify tagged orders > 0** · raises are swaps |
| `RT 30D - 18QT` | Same stops | $30–$60 | Same, with CPP ≤ **$30** |

- **Every Meta change is Evan's click.** Publishing is his in Ads Manager. The connector never activates anything.
- **One edit per ad set per checkpoint.** Bundle changes so Learning is disturbed once.
- **A kill that triggers mid-week gets acted on within 4 days** (T5a allows 7). Nobody waits for Thursday.

---

## 5. The measurement problem: 97 claimed vs 16 seen

### What the gap is
- **Fact:** Sept 1–16, Meta claims **97** purchases. Shopify has **16** orders with a Meta paid UTM on the last visit, 19 counting first or last visit, plus 2 with a Facebook referrer and no UTM *(Finn §5)*.
- **What the gap isn't:** an attribution rate, or proof Meta is lying. Meta counts view-through and cross-device purchases. Shopify's last-visit UTM misses anyone who came back by typing the URL, through email, or through Google.
- **The truth sits somewhere between 16 and 97.** Nothing on file says where *(overhead-method §4D)*.

### What we can honestly measure this month

| Measure | Trust | Use |
|---|---|---|
| Shopify net, orders, AOV, product mix | **Source of truth** | T1–T4 |
| Bundle and kit orders (GraphQL `lineItemGroup`) | Solid | T3b |
| Meta spend | Solid, for spend only | Caps, T5 |
| Meta purchases and CPP | **Upper bound** (the generous bracket) | Zone reads, kill lines |
| Shopify last-visit Meta-tagged orders | **Floor** (the conservative bracket) | Trend and a floor. **Never pass/fail**: it would switch off all prospecting *(overhead-method §6b)* |
| Store-level step-read: 18 QT and pot orders from all sources, trailing 14 days vs prior 14 vs same weeks 2025 | Directional | Does spend show up anywhere |
| Actual CAC · incrementality · Meta revenue · Google's contribution | **Not measurable** | Not quoted. Retargeting at $30/day can't carry a lift study *(retargeting plan §10)* |

### What to fix, in order

1. **Every new ad carries the full UTM string from day one**, with Shop destination and Messenger off. That covers the tailgate kit ad, the turkey kit ad and both retargeting sets. Existing ads aren't retrofitted mid-month, because an edit sends them back to review. **Cost: zero. Coverage grows with every new ad.** Decision 5.
2. **Resolve the UTM-state conflict (Finn, read-only, by Sept 21).**
   - `campaigns.md` says BPM and `18qt-TOF` ads carry **no** UTMs *(Finn, 2026-09-10)*.
   - Finn matched **10 orders to BPM's campaign ID** on Sept 17.
   - Both can't be complete. Something (Shopify's Meta channel, or a template) is tagging with numeric IDs. **Until we know which ads tag, the conservative bracket can't be compared campaign to campaign.**
3. **Record campaign, ad set and ad IDs** in `campaigns.md` at the Sept 18 checkpoint, so numeric-ID UTMs can be matched.
4. **Pixel `491960645999331`:** Jay names the owner (batched text). Until then, no Events Manager totals get read.
5. **Read "Compare attribution settings" (7-day click) alongside the default.** It's reporting only, with **no setting change**.
6. **Reconcile before anything goes to Jay or Robert:** Labor Day net ($41,100.84 on the board vs $40,853.33 today) and the turkey order count method (board 164 / 294 vs ShopifyQL 171 / 319) *(Finn §2a, §3)*. If it isn't reconciled, the Oct 19 report says so.
7. **Parked, not this month:** rebuilding the scoreboard skill on Shopify plus the Meta connector for per-product CAC. The Thursday pull in §7 covers the month without it.

---

## 6. Risks, dependencies, and decisions

### Risks and dependencies

| Risk or dependency | Hits | Likelihood *(judgment)* | Mitigation |
|---|---|---|---|
| **Biljana hasn't switched `HIGH15B`/`SMS25B`** | Both kits (the landmine blocks go-live) | Medium: pending since Sept 15 | Chase by Mon 21. **Slip the kit, never break the rule** |
| `SC-7R` still unsellable online | All three kits at checkout | Low if clicked this week | Evan's one-line fix. Finn reads it back |
| Three live copy landmines (18 QT "Made in the USA" card · Platinum SEO title · 30 QT "5-year warranty") | Kit ads send traffic to exactly these pages | **Certain if not clicked** | Decision 4, before Sept 25 |
| **Two BM campaigns reading ACTIVE with $0 spend** (`BM \| TOF \| ABO \| Open \| External Whitelisting` · `BM \| TOF \| HP Cookers \| ABO \| Offer Testing`) | The $350 ceiling, if they start delivering | Low, but unbounded | Decision 8 |
| **The low-ticket cap is breached today** | Margin mix; Meta drifting to cheap orders | High (§4) | Decision 1 |
| A commercial lump (or its absence) swings T1 | T1 reads wrong | High: $12.6k in one week in 2025 | Judge the month on T2 |
| Main push has no new video from the shoot | Bet 1 | Certain | Decision 12 (B-roll ask) |
| Garrett's turkey demo is late | Oct 1 organic | Low-medium | **Paid isn't at risk:** the turkey ad uses Jay's existing 30 QT demo |
| BFCM is announced before the turkey peak | Nov turkey sales (next plan) | Medium | Decision 10 |
| Learning resets from edits | Every Meta read | Medium | One edit per ad set per checkpoint |
| Bot sessions | Conversion rate | Ongoing | Use completed checkouts and orders |
| Returns processed in the window | T1/T2 | Ongoing | Finn reports returns $ each week |
| **Evan is the bottleneck: about 15 clicks, clustered Sept 18–Oct 1** | Everything | High | Gates are go/no-go, and everything arrives pre-built |
| Google spend unknown | The business-level 20% check | Certain | Parked by Evan. Not chased this month |

### Decision points

**For Evan**, each with my recommendation. Answer with the number and yes/no, or give a different call.

1. **IW at Sept 18 under outcome B:** refocus (swap the creative **and** turn off `hpc-dark-evergreen` in one edit, hard kill Oct 2) or pause now?
   → **Refocus.** The main push has never had a fair test, and fryer spend is already over the cap. If the destination isn't the 18 QT page, re-check the cap math before the edit.
2. **Retargeting launch Mon Sept 28** (it's parked, and raised because this plan depends on it)?
   → **Yes.** It's the one date that clears the bot spike and still catches the sale browsers.
3. **Tailgate kit go/no-go at Thu Sept 24 noon, all five conditions or it slips.** No partial launch.
   → **Yes.** A kit that sells with `HIGH15` on it breaks Jay's rule on day one.
4. **Click the three copy landmines and `SC-7R` by Mon Sept 21.**
   → **Yes.** The kit ads point at these pages.
5. **UTM policy: full string and Shop off on every new ad. No retrofitting existing ads this month.**
   → **Yes.**
6. **25% low-ticket cap:** hold it through Oct 17, and take "does the 30 QT get room in turkey season" to Jay for Oct 18–Nov 23?
   → **Hold.** Turkey demand doesn't double until mid-October.
7. **If IW is paused, the $100/day stays unspent** until a campaign clears a scale gate.
   → **Yes.** Moving it into BPM would put money into a campaign with frequency at 5.05.
8. **Pause the two ACTIVE $0 BM campaigns.**
   → **Yes, this week.** Low odds, uncapped downside.
9. **Approve T1–T5 as commitment and stretch, with T2 as the headline.**
   → **Yes.** Change the numbers if you think the +11.4% basis is too thin.
10. **For Jay, the Nov 23 collision:** turkey cutoff and BFCM start on the same day.
    → **Keep the offer as signed, and ask that no public BFCM announcement happen before Mon Nov 16**, after the 2025 peak week. Coalition and Biljana own their channels, so this goes to them as a request through you.
11. **Turkey paid:** one ad inside BPM from Oct 1, weight shift only if the week of Oct 5 ≥ 2025?
    → **Yes.**
12. **Ask Garrett for Triple Jet + Performance pot B-roll during the Sept 22 setup.** No new video, no added cost, the locked list stays.
    → **Yes, if Garrett agrees it's free.** Otherwise the main push runs another month on stills.

**For Jay, one batched text on Sept 18:** BFCM sign-off · pixel `491960645999331` · the Nov 23 collision (decision 10) · the 25% cap in turkey season (decision 6, needed by Oct 15).

---

## 7. Weekly scoreboard

**When:** every **Thursday by 10:00 CT**, covering the plan week that ended Wednesday: **Sept 24 · Oct 1 · Oct 8 · Oct 15**. Month close is **Mon Oct 19**.
**Who:** Finn pulls → ROUX writes the calls (one line per target: on pace, behind, or act) → Evan decides anything marked "act".
**Automation:** Nova can schedule it as a task, which is Evan's call. The Monday scoreboard task is gone *(board)*. This replaces it for the month.

### The pull

| Figure | Source |
|---|---|
| Net, orders, AOV, returns $ | ShopifyQL `sales`, plan week + cumulative |
| T2 consumer net (ex-commercial cookers, ex-Navimow) | ShopifyQL by product title |
| Turkey 30 QT and 60 QT net and orders | ShopifyQL, plan week + calendar week (for the 2025 curve) |
| Pots 30–120 QT + Triple Jet net | ShopifyQL, Finn's group definitions |
| 18 QT orders · kit and bundle orders · discounts on kit lines | ShopifyQL + GraphQL `lineItemGroup` |
| Completed checkouts | ShopifyQL `sessions` (not conversion rate) |
| Spend · purchases · CPP · frequency · Learning, per campaign and per ad | Meta connector, `4392736013287` only |
| Low-ticket share of spend | Meta connector, ad level, mapped to product |
| Shopify last-visit Meta-tagged orders, per campaign ID | GraphQL `customerJourneySummary` |
| 2025 comparison | Finn's baseline file. No re-pulls unless reconciled |

### Pace lines

**Cumulative through each plan week.** 2025 actuals *(fact)*; stretch = × 1.1136 *(derived)*.

| Through | T1 commitment | T1 stretch | T2 commitment | T2 stretch | T3a commitment | T3a stretch |
|---|---|---|---|---|---|---|
| Wed Sept 23 | $20,351 | $22,662 | $18,102 | $20,157 | $3,176 | $3,537 |
| Wed Sept 30 | $33,969 | $37,827 | $29,471 | $32,818 | $4,539 | $5,054 |
| Wed Oct 7 | $62,375 | $69,460 | $45,296 | $50,441 | $6,017 | $6,700 |
| Wed Oct 14 | $85,718 | $95,453 | $65,235 | $72,644 | $9,849 | $10,968 |
| **Sat Oct 17** | **$94,107** | **$104,795** | **$73,624** | **$81,986** | **$13,505** | **$15,039** |

- ⚠️ **T1's Oct 7 line includes 2025's $12,580.85 commercial week.** Behind on T1 but on pace for T2 is fine.
- T4 is set on Sept 24 from week 1. T3b starts reading Oct 8. T5's conservative target is set on Sept 24.

### Report format (one screen)
1. Five target lines: actual · pace line · on pace / behind / act.
2. Campaign table: spend · Meta CPP · tagged orders · frequency · zone · kill or scale triggered?
3. Leading indicators that moved.
4. Decisions needed from Evan: numbered, with a recommendation.

---

## Checks this draft was held to
- No number without a source or a *(derived)* label. Nothing estimated where a figure is missing: BPM spend by product, Sept 9–16 by group, actual CAC and Google spend are all named as gaps.
- No Shopify net ÷ Meta spend. No cost-per-customer quoted as CAC. Real margin ~40.6% isn't used as a per-ad input; ceilings come from the incremental-rule tables.
- No sitewide discount before November. No discount on kits. Warranty, "Made in USA", fitment and frying-stat rules are applied to the ads named here.
- Parked items not re-raised, except retargeting's date, with the reason given.
- Board and decisions.md untouched.

→ [Baseline](reports/2026-09-17-month-plan-baseline.md) · [Kits plan](2026-09-11-tailgate-thanksgiving-bundles-plan.md) · [Retargeting plan](../content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md) · [Campaign terms](../../my-skills/hpc-campaign-checkpoint/campaigns.md) · [Overhead method](reports/2026-09-10-overhead-method-options.md) · [CAC v3](reports/2026-09-10-cac-ceilings-v3.md) · [Budget model](reports/2026-09-14-marketing-budget-model-20pct-net.md) · [Board](../../my-desk%20(now)/BOARD.md)
