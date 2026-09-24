# Scoreboard #1, Sept 17–23, 2026 (Finn)

**Read-only.** Nothing written to Shopify or Meta. Reads Thu 2026-09-24 morning CDT.
**Window:** Thu Sept 17 00:00 → Wed Sept 23 23:59 CT (plan start through yesterday). One operator (all after 2026-07-20).
**Sources:** Shopify `high-performance-cookers.myshopify.com`, ShopifyQL `run-analytics-query` (store time America/Chicago) and GraphQL `orders` (52 orders, 2 pages, all read) · Meta Ads connector, HP Cookers ADs `4392736013287` only, platform-reported.
**Method:** same as the pace line (`2026-09-17-consumer-pace-line-and-audience-sizes.md`): `FROM sales SHOW orders, net_sales, quantity_ordered GROUP BY product_title, product_type SINCE 2026-09-17 UNTIL 2026-09-23` (33 rows, under the limit). **Product rows sum to $26,459.62, exactly the `TIMESERIES day` total**, so the grouping dropped nothing.

---

## 1. Total sales
**$26,459.62 net · 52 orders** (ShopifyQL). Pace by Sept 24: $20,351. **+$6,108.62 over pace.**

| Day | Orders | Net |
|---|---|---|
| Thu 17 | 10 | $6,722.75 |
| Fri 18 | 3 | $1,010.47 |
| Sat 19 | 10 | $6,776.06 |
| Sun 20 | 8 | $3,428.81 |
| Mon 21 | 9 | $5,742.22 |
| Tue 22 | 6 | $1,309.57 (incl. −$105 returns) |
| Wed 23 | 6 | $1,469.74 |

52 orders include 5 $0 draft orders (#17465, #17473, #17505, #17509, #17510: replacements/warranty). 47 carry a value.

## 2. Consumer sales
**$22,026.87** (derived: $26,459.62 − $4,432.75). Pace: $14,747. **+$7,279.79 over pace**; also over the stretch line ($16,422.35).

| Excluded bucket | $ | What |
|---|---|---|
| Commercial cookers | $4,182.75 | 40 Gallon / 160 QT Powered Cooker ×2 (#17464 draft, #17502) |
| Commercial other | $250.00 | Commercial Cooker Metal Wheels (#17464) |
| Custom | $0 | none |
| Navimow | $0 | none |

Untitled line $15.00 stays in consumer, as in the pace line. Ties to Monday's $15,543.09 through Sept 20 (+ Sept 21–23 net $8,521.53 − $2,037.75 commercial).

## 3. Turkey fryer sales
**$2,146.59 · 5 orders · 5 units** (ShopifyQL, distinct orders). Pace: $3,176. **−$1,029.41 under pace.**
- 30 QT Turkey Fryer $1,208.52 (3) · 60 QT Dual Turkey Fryer $938.07 (2). Turkey kits: DRAFT, $0.
- Includes #17508, a $435 draft order (30 QT + rack). Turkey Fryer Racks ($156.83) are not in the definition and not counted.

## 4. Pots week 1 (sets the baseline)
**$8,130.33 · 12 distinct orders · 16 units** (ShopifyQL, `WHERE product_title IN (…)`).

| Line | Net | Orders | Units |
|---|---|---|---|
| 120 QT Powered (Triple Jet variants) | $2,890.00 | 4 | 4 |
| 100 QT Powered | $680.00 | 1 | 1 |
| 100 QT Performance | $550.00 | 1 | 1 |
| Performance Boiling Pots: 60 QT $329.54 · 80 QT $429.07 | $758.61 | 2 | 2 |
| **Pots subtotal** | **$4,878.61** | **8** | **8** |
| Boil Boss Triple Jet Burner | $3,251.72 | 7 | 8 |
| **Total** | **$8,130.33** | **12** (3 orders hold both) | **16** |

80% line for weeks 2–6 average: **$6,504.26/week** (derived, 0.8 × $8,130.33).
Not counted, by the baseline's groups: 100 QT Powered Rack Steamer $3,250 (2), Triple Jet centering brackets $129.53, cooling rings, paddles. Two Ultimate Boiling Bundle orders (#17475, #17501) are inside the totals via their component lines, not added.
⚠️ A `title CONTAINS 'QT'` filter would have missed the "120 **Quart**" cooker ($2,890). The list above came from the full product table, not that filter.

## 5. Meta efficiency, read two ways

### Spend *(Meta `ads_get_ad_entities`, account and campaign level, daily)*
- **Total $2,194.89** (campaigns sum to the account total). **$313.56/day** average.
- Daily: $328.39 · $266.31 · $295.29 · $348.93 · $345.10 · $348.10 · $262.77. **Max $348.93 (Sun Sept 20). Days over $350: 0.** Three days within $5 of the cap (Sept 20–22).

### By campaign

| Campaign | Spend | Meta purchases | **Meta CPP** | Shopify-tagged orders (rules 1–5) · subtotal | **Spend ÷ tagged order** | Tagged new customers | Spend ÷ tagged new |
|---|---|---|---|---|---|---|---|
| `BPM_TOF_Manual` `6772105419387` | $1,153.07 | 22 | **$52.41** | 8 · $2,973.48 | **$144.13** | 6 | $192.18 |
|   of which Meta Shop (rule 5) | | | | 0 | | | |
| `18qt-TOF-Prospecting` `6998161993987` | $357.90 | 5 | **$71.58** | 2 · $816.25 | **$178.95** | 2 | $178.95 |
|   of which Meta Shop (rule 5) | | | | 0 | | | |
| `IW Lookalike 1% …` `52507989521191` | $683.92 | 5 | **$136.78** | 1 · $715.00 | **$683.92** | 1 | $683.92 |
| **Account** | **$2,194.89** | **32** | **$68.59** | **11 · $4,504.73** | **$199.54** | **9** | **$243.88** |

**vs baseline Sept 1–16:** Meta CPP **$68.59 vs $40.44** · spend per tagged order **$199.54 vs $156.90** (rules 1–5). Both read worse this week.
**`18qt-TOF` Meta CPP: $71.58** against the ≤ $30 stretch. Not met.

**Tagged orders** (last visit, all rule 4 = campaign ID, except IW rule 1; subtotal = `currentSubtotalPriceSet`, the baseline's measure; new = `numberOfOrders` 1):
- BPM: #17463 $468.75 new, #17478 $468.99 new, #17483 $468.75 new, #17489 $127.99 returning (all ad `6855622474187` Jay 18 QT demo) · #17466 $680 new (`6772110395587`) · #17469 $340 new (`6772116256187`) · #17511 $300 new (`6772116255587`, the zero-spend twin; spend sits on `6772110395587`) · #17506 $119 returning (`6823510767787` BPM Tailgate Video).
- 18qt-TOF: #17492 $468.75 new (`Facebook_UA`) · #17499 $347.50 new (`6998222425187`, 18qt-001).
- IW: #17482 $715 new (`120qt-crowd-math`).
- Product mix of the 11: 18 QT 7 · 120 QT 1 · 100 QT Powered 1 · accessories only 2 (#17489, #17506).

**Rule 5:** 0 orders. Two orders are on the Facebook & Instagram channel (#17466, #17511), and both carry a journey tag, so journey first applies. No cart-link order in the window.
**First-visit-only match, not counted:** #17507 ($373.48, new; first visit 18qt-TOF, last visit Google untagged).
**Meta-tagged orders under other names:** none. Every order with a Facebook-paid last visit is listed above.
**Blind spot:** `hpc-dark-evergreen` (untaggable) spent $26.40 on Sept 18 before its pause. That is 1.2% of window spend, so almost all spend was taggable this week.

## 6. Tailgate kit
- Product `10298785661168` **status DRAFT**, `publishedAt` null, 4 variants $455 / $418 / $441 / $404 (all `availableForSale` true), totalInventory 28 *(GraphQL, read 2026-09-24)*. `updatedAt` 2026-09-24 08:24 CDT: cause not read (the board records stock-refresh bumps as the known pattern).
- **Kit orders Sept 17–23: 0.** No line item in the 52 orders carries a kit `lineItemGroup`. ShopifyQL `product_title CONTAINS 'Kit'`: 0. Bundle groups present: Ultimate Boiling Bundle (#17475, #17501), Boil Boss Combo (#17509, $0 draft).

---

## Data flags
1. **Meta re-states past days.** BPM Sept 20 now reads $198.27 (Monday's read: $197.58). Small, but this week's figures may still move.
2. **Draft orders are inside net sales.** $3,545 of the window's net came from draft orders (#17464 $2,395, #17495 $715 120 QT, #17508 $435 turkey; ShopifyQL counts them). The pace line's 2025 figures used the same method, so the comparison is like for like.
3. **Returns land on the day they are processed** (−$105 Sept 22, and the −$86.75 Replacement Baskets row). Later refunds on these orders will land in later weeks.
4. **Classification call:** the 100 QT Powered Rack Steamer ($3,250) sits in "steamers", not pots, following the baseline's groups. Counting it would lift pots week 1 to $11,380.33, and the 80% line with it.
5. Meta claims 32 purchases; Shopify has 11 tagged orders. Nothing was estimated for the gap.

**Next:** Beau. Total and consumer are over pace; turkey is under pace; Meta reads worse than the baseline on both counts. What that means for spend is a call, not a query.
