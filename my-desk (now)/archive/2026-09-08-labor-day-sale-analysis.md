# Labor Day 2026 — sale analysis, Sept 1–7

**Archived from BOARD.md 2026-09-08**, the sale's final day. Everything here is a
seven-day read. **Sept 8 is in none of it** — deadline day is normally the second spike
of a countdown sale, so every figure below understates the sale. Re-pull Sept 1–8
complete before the post-mortem.

Sources named per figure. Shopify is source of truth for revenue; Meta figures are
platform-attributed (pre-discount, no refunds) and are not revenue.

---

## The sale

**Sept 1–7: 105 orders · $33,708.39 net · $4,362.66 discounts (11.2% of gross)**
*Shopify ShopifyQL, pulled 2026-09-08.*

| vs | Net | Orders |
|---|---|---|
| Aug 24–30 | +62.8% | +94.4% |
| Aug 17–23 | +19.0% | +45.8% |
| Sept 1–7 2025 | +37.5% | +81.0% |

**Daily rate 1.63× the prior week** ($4,815/day vs $2,959/day). ⚠️ The board previously
said ~2.5× — that was the front-loaded first two days, not the week.

⚠️ **Sept 1–7 2025 was also a sale** (LABOR15, SMS25, HIGH10/HIGH15), so YoY is
sale-vs-sale.

**Daily decay, monotonic from Sept 2:**

| | Sep 1 | Sep 2 | Sep 3 | Sep 4 | Sep 5 | Sep 6 | Sep 7 |
|---|---|---|---|---|---|---|---|
| Orders | 24 | 19 | 16 | 19 | 9 | 11 | 7 |
| Net | $9,064 | $7,188 | $5,131 | $4,439 | $4,272 | $2,469 | $1,144 |

## ⭐ Did the sale work? Yes — the "flat" read was a broken comparison

A first pass stripped the lumpy lines from the sale week (commercial $5,817, Navimow
$2,999) and got ~$24,892 vs a $24,514 baseline — apparently flat. **That subtracted from
one side only.** The 2025 baseline carried $5,626 of commercial across 3 orders, 23.0% of
that week — a *larger* lumpy share than the sale week's 17.3%.

Stripped properly *(Shopify, 2026-09-08)*:

| Window | Orders | Net | Commercial | Non-cooker | **Residential core** | AOV (net÷orders) |
|---|---|---|---|---|---|---|
| Aug 17–23 2026 | 72 | $28,325 | $0 | $5,351 (18.9%) | **$22,974** | $393.40 |
| Aug 24–30 2026 | 54 | $20,711 | $0 | $447 (2.2%) | **$20,264** | $383.53 |
| Sept 1–7 2025 | 58 | $24,514 | $5,626 (23.0%) | $0 | **$18,887** | $422.65 |
| **Sept 1–7 2026** | 105 | $33,708 | $5,817 (17.3%) | $2,999 (8.9%) | **$24,892** | $321.03 |

**Residential core YoY: +$6,005, +31.8%** — and that is a floor. A $1,853 untitled/deleted
product row sits inside the 2025 core; if any of it is commercial the lift grows, it cannot
shrink.

⚠️ **Aug 17–23's core is understated** by ~$2,600 of reversals processed that week against
earlier orders. The +8.4% sequential comparison is the weakest number here.

## The soft spot is AOV, not revenue

**$321.03 — the lowest of all four windows**, 24% below the prior-year week, while orders
nearly doubled YoY. Top units were legs, thermometers, wind shields, seasoning, skimmers.
That is a promotion recruiting the 10% who buy on price. Two data points on the same
holiday with the same mechanic is a real signal, not yet a trend.

**ROUX's recommendation, not yet an Evan decision:** no sitewide percentage discount
before November.

## Discount codes

*Order-level Shopify Admin GraphQL, resolved individually — grouped counts double-count stacked orders.*

| Code | Orders | Discount $ |
|---|---|---|
| LABORDAY10-26 | 43 | −$1,774.58 |
| LABORDAY30-LEGS | 22 | −$821.73 |
| Both stacked | 9 | — |
| **Either code** | **56 of 105 (53.3%)** | **−$2,596.31** |

**46.7% of orders used no Labor Day code.** Of the other $1,766.35 in discounts, most is
not consumer promo: $505 damaged-in-shipping, $362.50 uncoded, $300 custom, $288.60 FANDF.

**The discount was the largest marketing expense of the week** — $2,596 of Labor Day codes
against $1,416 of Meta spend.

⚠️ **The codes were manual entry, and it leaked.** 28 orders contained legs; only 22 used
the legs code. ~21% of legs buyers never applied it. Two readings, unresolvable from this
data: those orders came in at full margin (costless), or people who came for the sale hit
checkout, the price didn't move, and some bounced. **Abandoned carts are invisible here.**
→ Fix for next promo: Shopify **automatic discounts**, not codes.

## Legs attach — the 30% code is not established as the driver

*Neither baseline week ran any legs-specific code. Verified per window.*

| Window | Legs orders | Total | **Attach** | Units | Net | Net/unit |
|---|---|---|---|---|---|---|
| Aug 17–23 2026 | 6 | 72 | 8.3% | 6 | $704.31 | $117.39 |
| Aug 24–30 2026 | 13 | 54 | **24.1%** | 15 | $1,779.05 | $118.60 |
| Sept 1–7 2026 | 28 | 105 | **26.7%** | 27 | $2,385.95 | $88.37 |
| Sept 1–7 2025 | 6 | 58 | 10.3% | 6 | $660.45 | $110.08 |

**Aug 24–30 hit 24.1% with no discount at all.** On that pair, $821.73 bought 2.6 points.
But the other two no-code weeks ran 8.3% and 10.3% — week-to-week variance exceeds the
effect. Enough to say the code is **not proven as the driver**; not enough to say it bought
nothing.

**The test that settles it:** trading 15 units at $118.60 for 27 at $88.37 only pays if
landed cost per leg extension is **under ~$50.58**. Above that, the discounted week made
less contribution despite 80% more units. *(Arithmetic on Shopify figures — not a Shopify
number.)* One line on Jay's BOM sheet.

⛔ **Do not repeat the 30%-off-legs mechanic in November until that number exists.**

## Product mix, Sept 1–7

Top lines by net: 160 QT Powered Cooker $5,817 (3 units, **commercial**) · 18 QT Fish Fryer
$4,924 (16) · Triple Jet Burner $2,699 (7) · Leg Extensions $2,386 (27) · **Navimow X430
$2,207 (1)** · 100 QT Powered $1,931 (3).

- **Commercial 17.3% of net from 3 orders** — biggest single revenue line, no consumer
  marketing behind it. ⛔ Above the 120 QT cap; never a 5-year claim on it.
- **Navimow $2,999 (8.9%)** with zero marketing — and it did **$4,249 in Aug 17–23** too.
  Not a one-off. Mowing season is HPC's off-season.
- Returning-customer rate **44.9%** (57 new, 44 returning, 98 distinct — Shopify de-dupes
  each independently, so they don't sum; quote the rate).
- Refunds clean: 2.3% reversal rate vs 8.3% for Aug 17–23.

## Meta, Sept 1–7

*Ads Manager UI read, account HP Cookers ADs `4392736013287`, pulled 2026-09-08. Only two campaigns spent.*

| Campaign | Spend | Reach | Freq | Purchases | CPP |
|---|---|---|---|---|---|
| BPM_TOF_Manual | $1,094.29 | 15,033 | **5.05** | 37 | $29.58 |
| 18qt-TOF-Prospecting | $321.40 | 11,100 | 1.90 | 16 | **$20.09** |
| **Total** | **$1,415.69** | | | 53 | $26.71 |

Ad level inside BPM_TOF_Manual:

| Ad | Spend | Purchases | CPP |
|---|---|---|---|
| LaborDay_B_HPCDark | $138.31 | 7 | **$19.76** ⚠️ learning limited |
| Vintage - Copy (2nd dup) | $395.95 | 12 | $33.00 |
| Vintage - Copy | $242.68 | 7 | $34.67 |
| Vintage (original) | $310.36 | 8 | $38.79 |

**⭐ The finding for the post-mortem is not "dark wins" — it is that $949 of $1,094 went to
the treatment that lost.** That is an allocation failure. The $19.76-vs-$33.00 gap itself
rests on 7 purchases and is a hypothesis, not proof.

**The board's mid-sale call was right:** the duplicate flagged at $91.64 CPP on two days
finished the week at $33.00. $90 of spend was never a signal. Same discipline now applies
to HPCDark.

### CAC and ROAS — three different numbers

- **Actual CAC** (Meta spend ÷ new Shopify customers, all channels): **$24.84**. ⚠️ A floor,
  not a cost — **no Google Ads spend is in it** (Coalition's, no connector).
- **Meta-attributed CPP:** $26.71 blended. Not CAC — Meta counts returning buyers.
- **Break-even CAC** (gross profit/order at 44.5%): **~$142.86**.
- **CAC ceiling:** still provisional, blocked on Jay's overhead sheet / Digit.
- ⛔ **Shopify net ÷ Meta spend = 23.8×. Never show this** — it credits Meta with commercial
  freight, a lawn mower, Biljana's email and Coalition's Google.

**The version that survives scrutiny:** at 2.4 break-even blended ROAS, Meta had to have
caused ~11 of the week's 105 orders to break even. It claims 53. You would have to believe
Meta over-claims by ~5× before this spend stops paying — and it probably does over-claim
(53 claimed against 57 new customers store-wide), but the room is enormous. **Meta is not
inefficient; it is underspent at $202/day.**

### Frequency 5.05 — a real problem, but not this week's cause

Tempting to blame the revenue decay on fatigue. It doesn't hold: the decay is **store-wide**
(46.7% of orders touched no code), the shape is a textbook launch-peak-then-slide with a
holiday-weekend trough and HPC closed Monday, and **Sept 8 is missing**. Frequency 5.05
across 15,033 people is an audience-size and budget-structure problem for the *next*
campaign, not the explanation for this one.

**What would distinguish them:** daily CPP/CPM/CTR for BPM_TOF_Manual (fatigue = CPP and CPM
climb while CTR falls), with 18qt as the control — same store, same week, low frequency,
no offer.

## What these queries structurally could not return

- **Sept 8 excluded from everything.** Likely the second-biggest day.
- **Shopify-recorded orders only** — no phone, dealer, or marketplace.
- **Abandoned carts are invisible**, which is exactly what the manual-code question needs.
- **No Google Ads spend**, so every CAC here is a floor.
- Commercial/non-cooker classification is manual by product title. `product_type` is
  unreliable — it files commercial gallon cookers under "Home & Garden" alongside
  residential pots, and Navimow accessories under "Accessory". Checked, not assumed.
- **Sept 1–7 2025 predates 2026-07-20**, the BM Digital dividing line. Every YoY figure
  spans two operators.
- Shopify's `average_order_value` field does not reconcile to gross, net, or total ÷ orders.
  **All AOV here is net ÷ orders.** The board's older AOV history used Shopify's field.

## Creative and process gaps this sale exposed

- **Four ads shipped with no end date on a dated offer.** `Ends: Ongoing` on all of them,
  with a visible 10% OFF badge against a code expiring at 04:59 UTC Sept 9. Checklist gap,
  will recur every promotion → Nova.
- **`laborday-hpc-dark/9x16.html` puts white on `#FFA41C` at 2.12:1 contrast** — below even
  the 3:1 large-text floor, on the best-performing creative in the account. Found 2026-09-08.
- **The only tunnel-tube-in-action photo in the library is 640×323.** That is the single
  best differentiator HPC has and there is no usable high-res version. Ask Garrett.

---

*Full campaign masters → [2026-09-labor-day/](../../my-work%20%28outputs%29/content/ads/2026-09-labor-day/)*
