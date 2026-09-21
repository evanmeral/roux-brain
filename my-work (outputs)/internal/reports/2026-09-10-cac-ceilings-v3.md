# CAC ceilings v3: real inputs, per product line
**2026-09-10 · Beau · replaces the provisional ceilings in [cac-model-v2](2026-08-28-cac-model-v2.md)**

Read-only throughout. Nothing was written to Shopify, Meta or Google. **No actual CAC is quoted
anywhere in this doc.** There is no Google spend feed and no Sept 8 Meta spend. Meta figures below
are **cost per purchase (CPP) on Meta's own purchase count**, not CAC.

---

## Headline

**At a 20% net target with $97.49 of overhead per order, a single-item order has to be worth
roughly $386–$456 before it can pay *anything* to acquire.** *(Derived: the zero-ceiling price at 50%
and 54% landed COGS. Formula below.)* Every product under that line has a **negative** CAC ceiling
when sold alone at full price: both 18 QT fryers, the 30 QT and 40 QT, the Triple Jet on its own,
the legs and every Boil Boss accessory.

**Beau:** this is a finding about the target and the overhead, not about Meta. The provisional
ceilings were about twice as generous because v2 reserved 20% for overhead *and* profit combined.
v3 charges full overhead ($97.49) **and** a 20% net margin on top.

| Product | v2 provisional (Aug 28) | **v3 ceiling, one unit, list price** |
|---|---|---|
| 18 QT Fish Fryer, powered | ~$63 | **−$26.40 to −$24.10** |
| Boil Boss Triple Jet | ~$96 | **$7.14** |
| 120 QT Powered | ~$197 | **$56.63 to $81.89** |
| Cooling Ring | ~$21 | **−$69.67** |

---

## 1. Inputs

### Facts, with sources
| Input | Value | Source |
|---|---|---|
| Landed cost per variant | Current Shopify `unitCost` (part + tariffs + inbound freight) | Shopify Q1/Q2, [landed-cost-by-variant](2026-09-10-landed-cost-by-variant.md); confirmed by Jay 2026-09-10. The 114 exact-50% variants are **intentional and accurate** |
| List price per variant | Current Shopify `price` | Same pull |
| Overhead | $49,550/mo, steady → **$594,600/yr**. Ad spend **not** inside it | Jay, by text, 2026-09-09 and 09-10. A rough estimate, not audited |
| Overhead per order | **$97.49** (÷ 6,099 paid orders, all channels, trailing 12 mo) | Finn, Shopify, [orders-for-overhead-allocation](2026-09-10-orders-for-overhead-allocation.md). **Jay has not confirmed the denominator** |
| Sensitivity | **$112.10** (÷ 5,304 DTC-only paid orders) | Same |
| Target | **20% net profit after overhead**, of net revenue | Jay, by text, 2026-09-09 |
| Outbound freight | Paid by the customer, consumer and commercial. Pass-through, not a cost | Jay, by text, 2026-09-10 |
| Shopify plan | **Advanced** | Shopify `get-shop-info`, 2026-09-10 |

### Assumptions, not facts
| Assumption | Used | Why it's still an assumption |
|---|---|---|
| Card fees | **2.9% + $0.30** per order | I tried to read Shopify Payments myself. **Access denied:** the connector lacks the `read_shopify_payments` scope. The Advanced plan's rate card is probably lower than 2.9%, but I have not verified that |
| Packaging | **$3.00** per order | Never supplied |
| Warranty reserve | **1%** of net revenue | Never supplied |
| Refunds and carrier damage | **Not modelled** | Refunds are 4.9% of gross ex-Lowe's (13 mo, Shopify, 2026-08-26). Leaving them out makes every ceiling slightly generous |

**Variable cost per order** = 3.9% × net revenue + $3.30.
**Moves nothing:** if the real card rate is 2.5%, every ceiling rises by 0.4% of net revenue. That's $3.57 at most, on the $892 Platinum Bundle. It changes no verdict below.

### Deliberately not used
- **The 44.5% August blended margin.** Built from order-line costs before Jay's review.
- **Every earlier margin figure**, including the `metrics-and-goals.md` allowable-CAC table.
- **Robert's per-order net revenue figures in v2** ($300 · $390 · $80 · $850). No window is on
  file, and they carry attached revenue with no attached cost. Put against a single product's landed cost, they overstate
  the ceiling. See section 5 for what replaces them.

---

## 2. The formula, and the two lines that must not be confused

```
Break-even line = net rev/order − landed COGS − variable            ← the order adds $0 above this CAC
CAC ceiling     = break-even − overhead share ($97.49) − 20% × net rev   ← the real limit
```

Three zones for any campaign's cost per purchase:

| Zone | CPP is… | What it means | Action |
|---|---|---|---|
| **1** | at or under the **ceiling** | The order covers its overhead share and makes 20% net | Scale within the gates |
| **2** | between ceiling and **break-even** | The order adds profit dollars, since overhead is fixed, but misses the 20% target | **Hold. No scaling.** Whether any budget belongs here is **Jay's call** (see section 6) |
| **3** | above **break-even** | Every order loses cash | Kill |

⚠️ Meta's CPP uses Meta's own purchase count, which over-claims. The real cost of an *incremental* order is
higher. So a zone read from Meta CPP is the optimistic read.

---

## 3. The ceiling table, by product line

**Order basis: one unit, full list price, nothing attached.** This is **not** Robert's order-level
figure. That needs Finn's pull (section 5). **Beau:** in the no-discount case, this is the *floor* for
any full-price order containing the product. Attached items all carry positive margin, and overhead is
charged per order rather than per item, so attachment can only raise the ceiling. **Discounted orders can fall below it.**

*All arithmetic is derived from the sourced inputs above. None of it is a Shopify number.*

| Line · variant | Net rev | − Landed COGS | − Variable | **= Break-even** | − Overhead | − 20% net | **= CAC ceiling** | Ceiling @ $112.10 |
|---|---|---|---|---|---|---|---|---|
| **18 QT Fish Fryer, powered**, base $285 | 285.00 | 142.50 | 14.42 | **128.09** | 97.49 | 57.00 | **−26.40** | −41.01 |
| 18 QT powered, valve + basket $340 | 340.00 | 182.05 | 16.56 | **141.39** | 97.49 | 68.00 | **−24.10** | −38.71 |
| 18 QT non-powered, base | 220.00 | 110.00 | 11.88 | **98.12** | 97.49 | 44.00 | **−43.37** | −57.98 |
| 30 QT Turkey Fryer powered, base | 395.00 | 217.62 | 18.71 | **158.67** | 97.49 | 79.00 | **−17.82** | −32.43 |
| 40 QT Powered Sauce, base | 289.99 | 156.38 | 14.61 | **119.00** | 97.49 | 58.00 | **−36.49** | −51.10 |
| 60 QT Powered, base | 515.00 | 268.63 | 23.38 | **222.99** | 97.49 | 103.00 | **22.50** | 7.89 |
| 80 QT Powered, base | 630.00 | 331.76 | 27.87 | **270.37** | 97.49 | 126.00 | **46.88** | 32.27 |
| 100 QT Powered, base | 670.00 | 353.53 | 29.43 | **287.04** | 97.49 | 134.00 | **55.55** | 40.94 |
| **120 QT Powered**, base (TJ, 3/4") | 715.00 | 386.69 | 31.19 | **297.12** | 97.49 | 143.00 | **56.63** | 42.02 |
| 120 QT Powered, top ($805) | 805.00 | 429.92 | 34.70 | **340.38** | 97.49 | 161.00 | **81.89** | 67.28 |
| 80 QT Performance, base | 477.00 | 239.25 | 21.90 | **215.85** | 97.49 | 95.40 | **22.96** | 8.35 |
| 100 QT Performance, base | 502.00 | 262.55 | 22.88 | **216.57** | 97.49 | 100.40 | **18.68** | 4.07 |
| 120 QT Performance, base | 532.00 | 295.72 | 24.05 | **212.23** | 97.49 | 106.40 | **8.34** | −6.27 |
| **Boil Boss Triple Jet** | 425.00 | 215.50 | 19.88 | **189.62** | 97.49 | 85.00 | **7.14** | −7.47 |
| Platinum Bundle, 80 QT base | 837.00 | 468.50 | 35.94 | **332.56** | 97.49 | 167.40 | **67.67** | 53.06 |
| Platinum Bundle, 120 QT base | 892.00 | 496.00 | 38.09 | **357.91** | 97.49 | 178.40 | **82.02** | 67.41 |
| **Cooling Ring**, standard $59.99 | 59.99 | 14.53 | 5.64 | **39.82** | 97.49 | 12.00 | **−69.67** | −84.28 |
| Thermo Paddle | 69.99 | 25.64 | 6.03 | **38.32** | 97.49 | 14.00 | **−73.17** | −87.78 |
| Ultimate Combo | 129.98 | 59.67 | 8.37 | **61.94** | 97.49 | 26.00 | **−61.55** | −76.16 |
| **Leg Extensions** | 119.00 | 48.90 | 7.94 | **62.16** | 97.49 | 23.80 | **−59.13** | −73.74 |
| 28 QT Steamer | 1,325.00 | 695.67 | 54.98 | **574.36** | 97.49 | 265.00 | **211.87** | 197.25 |
| 100 QT Rack Steamer, 2 racks | 1,525.00 | 814.01 | 62.77 | **648.22** | 97.49 | 305.00 | **245.73** | 231.12 |
| Commercial, 60 Gal base | 2,699.00 | 1,322.31 | 108.56 | **1,268.13** | 97.49 | 539.80 | **630.84** | 616.23 |

**Two real baskets**, list prices summed:

| Basket | Net rev | − COGS | − Var | **Break-even** | **Ceiling** | @ $112.10 |
|---|---|---|---|---|---|---|
| 18 QT base + Leg Extensions | 404.00 | 191.40 | 19.06 | **193.54** | **15.25** | 0.64 |
| 18 QT top + Leg Extensions | 459.00 | 230.95 | 21.20 | **206.85** | **17.56** | 2.95 |
| 120 QT Performance base + Triple Jet | 957.00 | 511.22 | 40.62 | **405.16** | **116.27** | 101.66 |

*Why the 18 QT + legs basket is real: legs were the top add-on on 30 of 66 paid 18 QT orders, Aug 10–Sep 8
(Finn, Shopify, [IW recap review](../2026-09-10-intentwave-recap-review.md)).*

**Beau, on the table:**
- **The main push (Performance pots + Triple Jet) only works as a basket.** The pot alone is $8–23 and the burner alone is $7.
  Together they're $116, and the Platinum Bundle is $68–82. Creative for the main push should sell the pair.
  Selling either piece alone is barely above zero.
- **Accessories are attach-only, now provably.** A Cooling Ring attached to an order that already exists
  adds **$43.12** of contribution and carries no overhead, because overhead is charged once per order. Advertised alone, it
  can't carry $97.49 of overhead at any CAC.
- **The steamers and the commercial line have large ceilings**, but they sell through Stephen, not Meta
  checkout. ⛔ Never a 5-year claim on either.

### Correction to v2
v2 said per-order allocation "would raise the accessory ceiling and lower the commercial one."
**That is backwards.** Per-order allocation *lowers* low-ticket ceilings and *raises* high-ticket ones.
Jay approved per-order on the correct reason: high-ticket items shouldn't carry six times a fryer's
overhead. Here is what the method choice is worth, where revenue share = $594,600 ÷ $2,882,913 = 20.6% of net *(derived)*:

| Product | Ceiling, per-order (approved) | Ceiling, revenue-share (rejected) |
|---|---|---|
| 18 QT base | −$26.40 | +$12.30 |
| 120 QT base | $56.63 | $6.66 |
| Cooling Ring | −$69.67 | +$15.45 |

---

## 4. The five that gate live decisions

| Product | Break-even line | **CAC ceiling** | Meta CPP on file | Zone |
|---|---|---|---|---|
| **18 QT Fish Fryer** | $128.09–$141.39 alone · $193.54–$206.85 with legs | **−$26.40 to −$24.10** alone · **$15.25–$17.56** with legs | `18qt-TOF`: **$40.56** (37 purch, 30d to Sep 8, Ads Manager 2026-09-09) · $72.24 (Jul 12–Aug 28, CSV) · $20.09 (Sep 1–7, *sale week*) · ad `18qt-001` $14.53 (Board; purchase count not on file) | **2** |
| **120 QT Powered** | $297.12–$340.38 | **$56.63–$81.89** | **None product-specific.** `BPM_TOF_Manual` blended $41.52 (118, 30d to Sep 8) is not a 120 QT number | Unknown |
| **Boil Boss Triple Jet** | $189.62 | **$7.14** alone · $116.27 with a 120 QT Performance pot | **None on file** | Unknown |
| **Leg Extensions** | $62.16 | **−$59.13** | Not advertised alone. None on file | Attach-only |
| **Cooling Ring** | $39.82 | **−$69.67** | Not advertised alone. None on file | Attach-only |

**Beau:** only the 18 QT has a product-specific CPP, and it sits in Zone 2: above every ceiling
scenario, and more than $85 under break-even on Meta's own count. `18qt-001` at $14.53 is under the
with-legs ceiling on paper, but it's one ad, *Learning limited*, with no purchase count on file.
Don't build on it.

---

## 5. What Finn needs to pull (the order-level ceiling)

Robert's framing (you acquire an **order**, not a unit) is right, and the table above is only its floor.
The per-order net revenue figures on file are **stale** (v2, no window, no attached cost) or
**incomplete**: the 18 QT's $419.07 AOV (Aug 10–Sep 8, Finn) has no landed COGS for the order and spans
the sale. **I have not estimated them.**

**Pull A: order-level economics per anchor product.**
- **Windows:** Jun 1–Aug 31 2026 (off-season, no sitewide sale) **and** Sep 1 2025–Aug 31 2026 (matches the overhead denominator).
- **Population:** normal paid DTC. Use the 5,304 definition: exclude cancelled, fully refunded, $0, draft, POS, and orders tagged `wholesale`.
- **Per order:**
  - Net revenue after discounts and refunds, **excluding** shipping charged, taxes and **Shipping Protection lines** (a $0-cost product, so leaving it in inflates margin).
  - **Landed COGS = Σ qty × current variant `unitCost`** from the 2026-09-10 table. **Not** the cost stored on the order line, which predates Jay's review.
  - Discount $.
- **Output per anchor:** order count · mean and median net rev/order · mean landed COGS/order · % anchor-only · top 5 attaches · full-price and discounted orders reported separately.
- **Anchors:** 18 QT powered · 18 QT non-powered · 30 QT Turkey · 60/80/100/120 QT Powered · 80/100/120 QT Performance · Triple Jet · Platinum Bundle · Leg Extensions · Cooling Ring.
- An order with two anchors counts in both lists.

**Pull B: campaign-attributed orders.** Shopify orders whose last-visit UTM (`customerJourneySummary`)
names `BPM_TOF_Manual` or `18qt-TOF-Prospecting`, Aug 10–Sep 8. Add the IW campaign from Sep 11. Use the same
per-order fields as Pull A, plus how many of Meta's claimed purchases Shopify can see. **If the ads carry no UTMs,
say so.** Fixing that is a Meta change and needs Evan's permission.

**Pull C: card-fee rate (low priority, moves no verdict).** The connector can't read Shopify Payments.
Evan exports the last 90 days of Payments transactions from Shopify admin, and Finn computes total fees ÷ total charges.

**Pull D: the business-level check.** Trailing-12-month net sales ÷ paid orders = **$472.69** *(derived
from Finn's two figures)*. That's barely above the ~$386–$456 zero-ceiling line. The real question for Jay
and Robert: **is HPC at 20% net today, at current ad spend?** Finn can answer it with trailing-12 landed COGS at current
`unitCost`, plus the variable assumptions and overhead above. I don't have that number.

---

## 6. Verdicts

### 6a. The 18 QT ladder (Board, Now #3): **withdrawn as written. Hold at $50/day.**
- **Fact:** the ladder's case was "3.1× headroom against the ~$63 provisional ceiling"
  ([offseason plan](../../content/ads/2026-09-labor-day/2026-09-09-meta-offseason-plan.md)). That ceiling no longer exists.
  The real one is −$26 alone and $15–18 with legs.
- **Fact:** the ladder's own gate (CPP ≤ $30) sits *above* every 18 QT ceiling scenario. Passing the gate
  would still mean spending in Zone 2.
- **Beau:** the recommendation to override the BOM gate is withdrawn. The inputs landed, and they
  cut against it. The campaign is **not** a money-loser. It sits in Zone 2, adding profit dollars on
  Meta's count, but it doesn't meet the target Jay set. Two things reopen it:
  1. **Pull A** shows the real 18 QT order (with attach) clears the trailing-7 CPP. Then re-gate the ladder at that order-level ceiling.
  2. **Jay rules that off-season lines may run capped Zone 2 spend.** My view: he should, for the fryer line, at a fixed cap and
     never above break-even. It's the year-round lever, and overhead is fixed whether or not those orders exist. But it trades
     margin % for profit dollars, and Jay has said he prefers the margin ("$2M at 20% over $3M at 8%"). **So it's his call, not ours.**

### 6b. The $350/day hard ceiling: **holds. Its reason has changed.**
- It was a placeholder "until landed cost lands" ([decisions](../../../my-desk%20%28now%29/decisions.md), 2026-09-09).
  Committed if everything runs: $214 caps + $30 retargeting (not yet built) + $100 IW = **$344**.
- **Don't raise it.** The real ceilings are below the provisional ones for every low-ticket line, and no live
  campaign is shown to clear its real ceiling.
- **Don't cut it either.** Every CPP on file is well under the break-even line of the products those campaigns
  sell. Cutting would give up contribution dollars.
- **Replace it** with per-campaign ceilings once Pulls A and B land (section 7).
- ⚠️ For the IW campaign: its 120 QT and Platinum ads can clear ($57–82). Its 18 QT ad cannot on a
  single-unit order. That ad drags the campaign's weighted ceiling down, so watch its share of purchases.

### 6c. Did the 30%-off-legs mechanic pay for itself? **No. Not shown, and at best a wash.**
- **Fact:** 15 units at $118.60 net/unit, Aug 24–30 · 27 units at $88.37, Sep 1–7
  ([labor-day analysis](../../../my-desk%20%28now%29/archive/2026-09-08-labor-day-sale-analysis.md), Shopify).
- **Which way the threshold runs:** the discounted week makes more contribution only if landed cost is
  **under** $50.58. It is $48.90, so on gross margin it technically did: **+$20.10**.
- **Add card fees and warranty** (the 3.9% assumption). The threshold moves to **$48.60**, and $48.90 is above it:
  **−$3.57.** A wash.
- **And the test itself is flawed.** It credits the code with the sale's extra traffic. Per order, legs units *fell*:
  from 0.278 (Aug 24–30, no code) to 0.257 (Sep 1–7, with code). The 30% code gives away 45% of each leg's contribution
  ($65.07 → $36.02), so it needs to **lift legs per order by 81%** just to break even.
  Against the three no-code reference weeks, the code's result runs from **+$403 to −$925**. Only the most recent week
  says it lost, but nothing says it clearly paid. *(All derived, on assumed variable costs.)*
- **Beau:** keep the ⛔ on November. The landed-cost question is answered, and the answer is that there's no case for 30% off.
  A leg attached at full price adds **$65.46**. Push attach at full price, e.g. a PDP bundle or a
  Shopify automatic discount if any discount at all. Not 30%.

---

## 7. How mixed campaigns like `BPM_TOF_Manual` get held to a ceiling

**Rule (Beau):** hold a mixed campaign to the **average order-level ceiling of the Shopify orders it
actually drove** (Pull B). Not store mix, and not its best product.
1. **Compute from its own orders, monthly.** The mix swings with the season. Meta's value per purchase on this
   campaign fell 33% from Jan–Jul to Jul–Aug ([meta-actuals](2026-08-28-meta-actuals.md); Meta-reported, so
   direction only, never revenue). The same CPP clears in April and misses in August.
2. **Bracket the CPP.** Spend ÷ Meta purchases is the generous read. Spend ÷ UTM-matched Shopify orders is
   the conservative one. A campaign is in Zone 1 only if the conservative read clears.
3. **Check at ad level.** Ads for products with negative single-unit ceilings (the 18 QT and 30 QT demo videos)
   are Zone 2 spend by construction unless their orders carry attach. Judge them on break-even, never above it.
4. **Interim, until Pull B exists:** the kill line is the lowest break-even among the products it advertises.
   That's **$128.09** (18 QT powered base). No raises until trailing-7 frequency is under 3.0 (existing rule).
   At $41.52 it's safely inside break-even, and its zone is unknown.
5. **Longer term, v2's recommendation stands:** restructure so ad sets map to product lines. That's what makes
   per-product ceilings enforceable rather than theoretical.

---

## Still open
- **Jay:** confirm the denominator (6,099 vs 5,304). No verdict above flips on it. Every ceiling moves −$14.61.
- **Jay:** the Zone 2 policy (6a). It's the one decision this table forces.
- **Finn:** Pulls A–D. Plus the Sept 1–8 ad-level re-pull (Board Now #2) is still open.
- **Board lines now stale:** Now #3's "3.1× headroom vs ~$63" · the legs ⛔'s "until landed cost exists" (it
  exists, and the ⛔ stays for a different reason) · the "CAC ceilings are provisional" parked line.

→ [cac-model-v2](2026-08-28-cac-model-v2.md) · [landed cost](2026-09-10-landed-cost-by-variant.md) · [overhead orders](2026-09-10-orders-for-overhead-allocation.md) · [Board](../../../my-desk%20%28now%29/BOARD.md) · [decisions](../../../my-desk%20%28now%29/decisions.md)

---

## Addendum — order-level ceilings from Finn's Pull A (2026-09-10)

*Claude, applying v3's formula unchanged to the per-order means in [order-level-pulls](2026-09-10-order-level-pulls.md). **Arithmetic, not a new Beau judgment.** Variable = $3 packaging + 1% warranty + 2.9% + $0.30 card (all assumptions). Overhead $97.49/order. Target 20% of net. Means, all orders (full-price + discounted) unless noted.*


**Jun–Aug 2026**

| Anchor | Net rev/order | GP/order | − Variable | **Break-even** | **Ceiling** |
|---|---|---|---|---|---|
| 18 QT powered | $449.08 | $210.18 | $20.81 | **$189.37** | **$2.06** |
| 18 QT powered, full-price only | $458.24 | $222.59 | $21.17 | **$201.42** | **$12.28** |
| 120 QT Powered | $909.96 | $416.12 | $38.79 | **$377.33** | **$97.85** |
| Triple Jet, not in a bundle | $520.59 | $257.78 | $23.60 | **$234.18** | **$32.57** |
| Triple Jet, all orders | $808.96 | $372.44 | $34.85 | **$337.59** | **$78.31** |
| Performance pots, any size | $903.17 | $408.38 | $38.52 | **$369.86** | **$91.73** |
| Platinum Bundle | $990.03 | $434.50 | $41.91 | **$392.59** | **$97.09** |
| Leg Extensions ⚠️ | $384.17 | $186.32 | $18.28 | **$168.04** | **−$6.29** |
| Cooling Ring ⚠️ | $536.90 | $255.46 | $24.24 | **$231.22** | **$26.35** |

**Sep 2025–Aug 2026**

| Anchor | Net rev/order | GP/order | − Variable | **Break-even** | **Ceiling** |
|---|---|---|---|---|---|
| 18 QT powered | $398.94 | $172.51 | $18.86 | **$153.65** | **−$23.63** |
| 120 QT Powered | $836.94 | $368.97 | $35.94 | **$333.03** | **$68.15** |
| Triple Jet, not in a bundle | $510.57 | $245.26 | $23.21 | **$222.05** | **$22.44** |
| Performance pots, any size | $911.77 | $404.35 | $38.86 | **$365.49** | **$85.65** |
| Leg Extensions ⚠️ | $369.87 | $173.25 | $17.72 | **$155.53** | **−$15.94** |
| Cooling Ring ⚠️ | $369.98 | $178.06 | $17.73 | **$160.33** | **−$11.16** |

**Read before using:**
- ⚠️ **Legs and Cooling Ring are not ad ceilings.** An order counts in an anchor's list if it *contains* the product, so these baskets are mostly pot and fryer orders carrying the accessory (legs: 53% ride on an 18 QT; ring: 65% carry a Thermo Paddle, 37% a Triple Jet). An ad selling the accessory alone does not produce these orders. v3's single-unit ceilings stay the right read for standalone accessory ads.
- **18 QT median order is $340** (Jun–Aug), the lone valve-and-basket fryer, whose single-unit ceiling is −$24.10 (v3). The mean is lifted by the 37% of orders that add legs.
- **The 18 QT's order-level ceiling is about zero**; its **break-even is ~$189 (Jun–Aug)**. Meta's claimed CPP of $40.56 sits in **Zone 2**: well under break-even, not under the 20% ceiling. The Zone 2 question to Jay stands.
- Pull B could not tie orders to campaigns (Meta links carry numeric campaign IDs), so no campaign is yet held to its own orders' ceiling.
