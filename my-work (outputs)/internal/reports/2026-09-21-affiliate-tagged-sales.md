# Affiliate-tagged sales, 2025-01-01 to 2026-09-21

**Finn · read 2026-09-21 · Shopify, read-only. Nothing was written to Shopify.**
Machine-readable copy: `my-files (knowledge)/hpc-reference/affiliates/sales-by-affiliate.json`

> **These are credited sales, not incremental sales.** An `UpPromote_order` tag says UpPromote
> gave an affiliate credit for the order. It does not say the affiliate caused the order.
> The window spans 2026-07-20 (BM Digital fired): two operators, not one trend.

---

## 1. The totals (facts)

| | Orders | Net sales | Source |
|---|---|---|---|
| All UpPromote-tagged orders, 2025-01-01 to 2026-09-21 | **523** | **$237,573.36** | ShopifyQL `FROM sales ... GROUP BY order_tags`, 2026-09-21 |
| Affiliate names carrying a tag | **41** | | same |
| The four creators on Evan's spreadsheet (Clair Cook, Brandon Griffin, Rickie Moore, Roddy Davis) | 93 | $31,991.35 | same |
| The other 37 names | 430 | $205,582.01 | same |
| Last 30 days (2026-08-22 to 2026-09-21) | 25 | $6,271.19 | same query, 30-day window |
| Last 90 days (2026-06-23 to 2026-09-21) | 79 | $27,220.25 | same query, 90-day window |

Make-up of the $237,573.36: gross $267,513.23, discounts −$14,291.69, returns −$15,648.18.

**Net definition** (the board's): Shopify net sales = gross sales − discounts − returns. No
shipping, no tax. Returns are dated the day they are processed, not the day of the order.

- First tagged order in the store: 2025-04-21 (Jimmy Doheny, #9398). UpPromote was installed 2025-03-16 (Pete's read of Settings > Apps, 2026-09-21). No tagged order exists before 2025, so the window misses nothing at the front.
- **None of the four spreadsheet creators has a tagged order in the last 90 days.** Their last tagged sales: Brandon Griffin 2026-06-20, Clair Cook 2026-06-14, Rickie Moore 2026-04-23, Roddy Davis 2026-03-27. All four stop before the 2026-07-20 line.
- Tagging format: one order tag, `UpPromote_order <affiliate name as registered>`. No per-affiliate discount codes. Customers who arrive credited to an affiliate usually get an automatic 5% discount titled "Affiliate Discount".

## 2. How it was run, and how it was checked

**Method.** ShopifyQL cannot group by a single tag; it groups by the whole tag combination
(e.g. `18QT BackOrder,UpPromote_order Clair Cook`). So: one unfiltered
`GROUP BY order_tags` query (256 combinations), keep the 99 that contain an `UpPromote_order`
tag, sum per name. Same for the 30- and 90-day windows. First and last sale dates come from
the Admin GraphQL API, `orders(query: "tag:\"UpPromote_order <name>\"")`, oldest and newest,
converted to store time (America/Chicago).

A note on a silent trap: `WHERE order_tags CONTAINS 'UpPromote'` returns **zero**, and GraphQL
`tag:UpPromote_order*` returns **nothing**. Neither is a real zero. Tag filters match a whole
tag only. Anyone re-running this with a prefix filter will wrongly conclude there are no
affiliate orders.

**Checks, all passed:**

| Check | Result |
|---|---|
| My transcription of the 99 rows vs Pete's hand copy, diffed by script | identical, 99 of 99 rows |
| Gross + discounts + returns = net, every row | 99 of 99 |
| Second method for order counts: GraphQL `ordersCount` per tag, all 41 names | 41 of 41 match; sum 523 |
| Third method for the total: GraphQL free-text search `UpPromote_order` | 523 |
| Fourth: one ShopifyQL query filtering on all 41 exact tags, grouped by referrer, summed server-side | 523 orders, $237,573.36 |
| 10 orders opened one by one: ShopifyQL net vs GraphQL `currentSubtotalPrice` (#17472, #17468, #17406, #17405, #17402, #17000, #16806, #16680, #16481, #16432) | 10 of 10 match to the cent |
| Orders carrying two affiliate tags | none: every tag combination has exactly one name, and per-name counts sum to the total |
| Last-sale date vs 30/90-day activity, every name | consistent, 41 of 41 |

## 3. How this differs from Pete's hand copy

**It doesn't, on the totals.** 523 orders, $237,573.36, 41 names, $31,991.35 for the four
spreadsheet creators, and "no spreadsheet creator in the last 30 days" are all confirmed.

One slip: Pete's note says 24 tagged orders in the last 30 days. His own file sums to **25**
(6+2+1+4+8+2+1+1), and so does my run. Same 8 names, same per-name figures. An adding error
in the note, not in the data.

New in this run: first and last sale per name, 90-day figures, returns split out, and the
referrer evidence below.

## 4. Per affiliate

Source for every row: ShopifyQL by order tag + GraphQL for dates, Finn, 2026-09-21.
30d = 2026-08-22 to 2026-09-21. 90d = 2026-06-23 to 2026-09-21. Spreadsheet creators: Clair
Cook, Brandon Griffin, Rickie Moore, Roddy Davis.

| Affiliate name (as tagged) | Orders | Net sales | First sale | Last sale | Orders 30d | Net 30d | Orders 90d | Net 90d |
|---|---|---|---|---|---|---|---|---|
| Xiri Zana | 56 | $27,984.67 | 2025-11-16 | 2026-09-17 | 6 | $1,651.13 | 13 | $5,440.46 |
| Huynh Lam | 55 | $25,056.18 | 2025-12-01 | 2026-08-02 | 0 | $0.00 | 3 | $1,003.95 |
| Clair Cook | 59 | $20,049.79 | 2026-03-13 | 2026-06-14 | 0 | $0.00 | 0 | $0.00 |
| Edith Ludewig | 33 | $18,236.51 | 2025-10-27 | 2026-06-15 | 0 | $0.00 | 0 | $0.00 |
| Noah Primeaux | 27 | $16,025.68 | 2025-06-19 | 2026-06-22 | 0 | $0.00 | 0 | $0.00 |
| Thomas Nordeide | 46 | $15,487.72 | 2025-12-28 | 2026-08-20 | 0 | $0.00 | 6 | $1,764.65 |
| Hernan Slodowicz | 28 | $14,756.30 | 2026-05-18 | 2026-09-10 | 2 | $782.73 | 9 | $3,094.96 |
| Nguyen Tran | 19 | $13,336.04 | 2025-06-28 | 2026-07-13 | 0 | $0.00 | 1 | $499.23 |
| Tran Tinh | 20 | $10,688.29 | 2026-02-08 | 2026-07-06 | 0 | $0.00 | 2 | $139.70 |
| Brandon Griffin | 28 | $9,597.66 | 2026-03-11 | 2026-06-20 | 0 | $0.00 | 0 | $0.00 |
| Zidean Le | 21 | $9,514.58 | 2025-06-12 | 2026-06-27 | 0 | $0.00 | 2 | $469.07 |
| Andhi Ermawan | 11 | $6,672.72 | 2025-11-12 | 2026-06-11 | 0 | $0.00 | 0 | $0.00 |
| Coupon Reals | 6 | $5,609.95 | 2025-05-11 | 2026-04-28 | 0 | $0.00 | 0 | $0.00 |
| Jimmy Doheny | 20 | $5,405.90 | 2025-04-21 | 2026-08-08 | 0 | $0.00 | 1 | $94.00 |
| Chadrick McKenzie | 8 | $5,284.14 | 2026-04-06 | 2026-06-08 | 0 | $0.00 | 0 | $0.00 |
| Gyorgi Muchev | 9 | $5,250.60 | 2026-04-17 | 2026-08-14 | 0 | $0.00 | 6 | $3,823.96 |
| Aktug Dogan | 10 | $4,440.14 | 2025-08-21 | 2026-03-30 | 0 | $0.00 | 0 | $0.00 |
| Vu dangvu248@gmail.com | 6 | $3,632.54 | 2025-06-26 | 2026-07-26 | 0 | $0.00 | 1 | $44.99 |
| Sharon Monahan | 7 | $2,874.63 | 2026-04-27 | 2026-09-02 | 2 | $169.60 | 4 | $1,335.83 |
| Magaly Rivera | 9 | $2,843.15 | 2026-06-28 | 2026-09-19 | 4 | $557.21 | 9 | $2,843.15 |
| Layla Evan | 11 | $2,722.71 | 2026-08-01 | 2026-09-08 | 8 | $2,152.96 | 11 | $2,722.71 |
| Rickie Moore | 4 | $1,898.00 | 2026-04-09 | 2026-04-23 | 0 | $0.00 | 0 | $0.00 |
| Melba Graham | 3 | $1,507.68 | 2025-11-15 | 2025-12-25 | 0 | $0.00 | 0 | $0.00 |
| Joshua Flores | 2 | $1,299.15 | 2026-05-07 | 2026-05-11 | 0 | $0.00 | 0 | $0.00 |
| Michelle Solomon | 5 | $1,111.51 | 2026-04-21 | 2026-07-02 | 0 | $0.00 | 1 | $156.88 |
| Patrick John | 1 | $884.69 | 2026-07-30 | 2026-07-30 | 0 | $0.00 | 1 | $884.69 |
| Anna Rippin | 1 | $789.98 | 2026-08-17 | 2026-08-17 | 0 | $0.00 | 1 | $789.98 |
| david nguyen | 3 | $698.68 | 2026-05-22 | 2026-07-01 | 0 | $0.00 | 1 | $533.19 |
| Javaris Donnett | 1 | $670.00 | 2025-07-02 | 2025-07-02 | 0 | $0.00 | 0 | $0.00 |
| Find Reviews | 1 | $563.99 | 2026-09-20 | 2026-09-20 | 1 | $563.99 | 1 | $563.99 |
| Mia William | 2 | $559.54 | 2026-05-17 | 2026-05-24 | 0 | $0.00 | 0 | $0.00 |
| Hoang Dang Huy | 1 | $526.50 | 2026-04-23 | 2026-04-23 | 0 | $0.00 | 0 | $0.00 |
| Roddy Davis | 2 | $445.90 | 2026-02-06 | 2026-03-27 | 0 | $0.00 | 0 | $0.00 |
| Cristy Rodriguez | 1 | $418.95 | 2026-08-02 | 2026-08-02 | 0 | $0.00 | 1 | $418.95 |
| ARTURO LIZAMA | 1 | $347.50 | 2026-09-14 | 2026-09-14 | 1 | $347.50 | 1 | $347.50 |
| Rupy Aujla | 1 | $122.00 | 2026-07-01 | 2026-07-01 | 0 | $0.00 | 1 | $122.00 |
| Daniel Foster | 1 | $71.49 | 2026-06-13 | 2026-06-13 | 0 | $0.00 | 0 | $0.00 |
| Hue Duong | 1 | $64.35 | 2026-07-05 | 2026-07-05 | 0 | $0.00 | 1 | $64.35 |
| Lisa Trúc | 1 | $61.49 | 2026-06-12 | 2026-06-12 | 0 | $0.00 | 0 | $0.00 |
| Scarlett Miller | 1 | $46.07 | 2026-09-04 | 2026-09-04 | 1 | $46.07 | 1 | $46.07 |
| Brittany Sansone | 1 | $15.99 | 2026-06-23 | 2026-06-23 | 0 | $0.00 | 1 | $15.99 |
| **Total** | **523** | **$237,573.36** | 2025-04-21 | 2026-09-20 | **25** | **$6,271.19** | **79** | **$27,220.25** |

Data notes, not business notes:
- Coupon Reals: gross $13,671.14, returns −$7,305.51, net $5,609.95. More than half its gross came back.
- Hernan Slodowicz's 90-day net ($3,094.96) includes −$859.47 of returns. Michelle Solomon's 90-day net ($156.88) includes a −$265.00 return. Shopify books a return in the window it is processed, so a window's net can include returns on older orders.
- Order counts include orders that net to $0 (e.g. #11632, 100% discounted; #15947, fully refunded).
- Gyorgi Muchev: 9 orders, $5,250.60 net. The `SPROM` discount code: 9 orders, $5,250.60 net (Pete's ShopifyQL read, 2026-09-21). The 3 Gyorgi Muchev orders I opened all used `SPROM`. **Fact:** the two sets match on count and dollars. **Conclusion, likely but not proven order by order:** `SPROM` is this affiliate's UpPromote coupon, not a spring promo.

## 5. What are these affiliates? The evidence

Two reads. (a) Shopify's **order referrer** (the last site before the buying session) for
**all 523** tagged orders, via ShopifyQL. (b) The **5 most recent orders** for each of the
top 15 by net, opened through GraphQL: discount used, first and last session, UTM, new or
returning, days from first session to order. The sample is the newest 5, not a random 5.

### 5a. Order referrer, all 523 tagged orders (fact)

| Referrer (Shopify `order_referrer_name`) | Orders | Net |
|---|---|---|
| google | 175 | $79,524.43 |
| none recorded | 114 | $49,742.89 |
| facebook | 63 | $22,674.29 |
| highperformancecookers (own site) | 42 | $21,962.96 |
| **dailydealreview** | 38 | $16,569.09 |
| **mimoni** | 18 | $10,807.82 |
| instagram | 14 + 1 | $5,079.74 + $670.00 |
| **dealspotr** | 13 | $3,478.88 |
| bing | 11 | $5,601.92 |
| **refermate** | 5 | $1,601.98 |
| **joincheckmate**, **coupontigo**, **couponreals** | 3 each | $1,772.48 · $2,220.48 · $4,184.92 |
| **myprosandcons**, **knoji** | 2 each | $1,342.25 · $706.00 |
| **hotpromocodes**, **thetopcoupon** | 1 each | $714.82 · $526.50 |
| verifypass 2 · manula 2 · android 3 · yahoo 2 · duckduckgo, syndicatedsearch, qr1, shopify, brittanyksansone 1 each | 14 | $8,391.91 |

Facts from that table:
- **89 of 523 tagged orders ($43,925.22 net) arrived from one of 11 domains whose names are deal, coupon or cashback terms** (bold above).
- Store-wide since 2025-01-01, those 11 referrers produced 92 orders. **89 of the 92 carry an UpPromote tag.** The 3 that don't are joincheckmate.
- **The four spreadsheet creators hold 60 of the 63 facebook-referred and all 14 instagram-referred tagged orders.** Their 93 orders: 74 facebook/instagram, 15 no referrer, 2 own site, 1 google, 1 verifypass. 74 of 93 were new customers.
- **The other 37 names: 430 orders, of which 174 google, 99 no referrer, 89 deal-named domains, 40 own site, 11 bing, 3 facebook, 0 instagram.**

### 5b. Per name, top 15 by net

"Aff. discount" = the automatic 5% "Affiliate Discount" was on the order.

| Name | All orders: referrer (fact) | Newest 5 orders opened (fact) |
|---|---|---|
| **Xiri Zana** · 56 · $27,984.67 | 36 google · 10 none · 5 own site · 2 android · 1 each qr1, shopify, manula. 27 of 56 returning customers. | 5 of 5 last session: google → homepage. 3 aff. discount; 2 used Labor Day codes and no aff. discount. One first session was the Google Ads branded-search campaign, one was facebook. 4 new, 1 returning. 1–2 days to order. |
| **Huynh Lam** · 55 · $25,056.18 | **36 dailydealreview** · 1 mimoni · 18 other | 3 of 5 last session: dailydealreview.com → homepage. Their first sessions were Google Ads branded search, a Klaviyo email, and Google → 18 QT product page. Codes: HIGH10 ×3, JULY426 ×1, aff. discount ×1. 2 of 5 returning. |
| **Clair Cook** (spreadsheet) · 59 · $20,049.79 | see the four-creator line above | 3 of 5 last session: facebook/instagram with **paid** UTMs (BM "External Whitelisting", "Creative Testing", campaign 6772105419387). 2 of 5 came through a non-web sales channel with no session data. 12–26 days to order on two of them. No aff. discount on any. |
| **Edith Ludewig** · 33 · $18,236.51 | **17 mimoni** · 1 dailydealreview · 1 dealspotr · 1 joincheckmate · 13 other | 2 of 5 last session: mimoni.com → homepage (first sessions: direct to a product page; Google to a product page). Others: last session Google Ads. Codes: SMS25 ×2, HIGH10, MEMO10, aff. discount ×1. 5 of 5 new. |
| **Noah Primeaux** · 27 · $16,025.68 | 15 google · 8 none · 3 own site · 1 syndicatedsearch. 8 of 27 returning. | 5 of 5 aff. discount. 5 of 5 **first** session was a Google Ads click (pMax, DSA, Feed Focus). Last session: Google Ads ×3, own site ×2. No outside site in any journey. 5 of 5 new. |
| **Thomas Nordeide** · 46 · $15,487.72 | 31 google · 10 none · 5 own site. 23 of 46 returning. | 0 of 5 aff. discount (3 no discount, SMS25, HIGH15). Last session: Google Ads ×2, direct → homepage ×2, Google Business Profile ×1. 17–23 days to order on three. No outside site in any journey. |
| **Hernan Slodowicz** · 28 · $14,756.30 | **18 none · 7 bing · 1 yahoo · 2 own site · 0 google.** 10 of 28 returning. | 5 of 5 **no discount of any kind.** 4 of 5 last session: direct → homepage, no referrer; 3 of those were single-session orders. 1 last session carried facebook paid UTMs. |
| **Nguyen Tran** · 19 · $13,336.04 | 13 google · 3 none · 2 own site · 1 verifypass ($5,613.55, one order) | 5 of 5 aff. discount. 4 of 5 first **and** last session were Google Ads clicks → homepage. The fifth began from a Klaviyo email, 47 sessions. |
| **Tran Tinh** · 20 · $10,688.29 | 13 google · 5 none · 2 own site | 4 of 5 **returning** customers. 4 of 5 last session Google (3 Google Ads). 4 no discount; 1 used J4LEGDEAL + JULY426. One last session was a password-reset page. |
| **Brandon Griffin** (spreadsheet) · 28 · $9,597.66 | see the four-creator line above | 4 of 5 last session: facebook/instagram with **paid** UTMs (BM "External Whitelisting", "Creative Testing", "UGC", campaign 6772105419387). 4 of 5 new. 10–30 days to order on four. |
| **Zidean Le** · 21 · $9,514.58 | 15 google · 4 none · 2 own site | 5 of 5 aff. discount. First session Google Ads on 3 of 5. Last session: Google Ads ×2, Klaviyo email ×1, own site ×2 (one came from a checkout thank-you page, 80 seconds after tagged order #16386). |
| **Andhi Ermawan** · 11 · $6,672.72 | **2 myprosandcons** · 9 other | 1 of 5 last session: high-performance-cookers.myprosandcons.com → homepage. Others: direct, bing. Codes: HIGH10 ×2, one single-use code, aff. discount ×2. One order was a customer's 4th. |
| **Coupon Reals** · 6 · $5,609.95 | **2 couponreals · 1 hotpromocodes** · 3 other | 2 of 5 last session: couponreals.com → homepage; 1: hotpromocodes.com → homepage. First sessions for those three: facebook ×2, Google Ads ×1. Codes: HIGH10, HPC15OFF, a military code, a single-use code, aff. discount ×1. 3 of 5 returning. |
| **Jimmy Doheny** · 20 · $5,405.90 | **12 dealspotr · 2 knoji · 1 couponreals · 1 joincheckmate** · 4 other | Last sessions: highperfcookers.knoji.com ×1, joincheckmate.com (UTM source "checkmate") ×1. First sessions for the five: facebook **paid** ×3, Google ×1, direct ×1. Codes: SMS25 ×2, HIGH15, aff. discount ×2. |
| **Chadrick McKenzie** · 8 · $5,284.14 | 5 google · 2 none · 1 own site | Last session Google ×3, own site ×1, direct ×1. First session Google Ads on 3 of 5. 2 of 5 had an automatic "8% off" discount; one order was a customer's 7th, one a 3rd. 0 aff. discount. |

Also opened, because they are active now:
- **Layla Evan** (first sale 2026-08-01; 8 of the last 30 days' 25 orders): 4 newest opened. 3 used LABORDAY10-26, 1 no discount, 0 aff. discount. Last sessions: Klaviyo email, google, Google Business Profile, direct. 2 of 4 returning. No outside site in any journey.
- **Magaly Rivera**: 3 opened. Bing → homepage ×2 (one a customer's 4th order), Klaviyo email ×1. No aff. discount.
- **Find Reviews**: 1 order (#17488, 2026-09-20). Code COOK25. Single session, Google → /collections/fryers.
- **Aktug Dogan** (not top 15): 5 of 10 orders referred by refermate, 1 dailydealreview, 1 joincheckmate.
- **Vu dangvu248@gmail.com**: 3 of 6 referred by coupontigo. **Hoang Dang Huy**: 1 of 1 by thetopcoupon.

### 5c. What the evidence supports, and what it doesn't

**Facts (repeatable from the queries above):**
1. For the 37 non-spreadsheet names, no sampled order shows a creator's page, a social post, a YouTube video or a blog as the referring site. The outside sites that do appear are the deal-named domains in 5a.
2. In those journeys the deal-named domain is the **last** session and lands on the **homepage**; the **first** session is a Google Ads click, a Meta paid ad, a Klaviyo email or a direct visit to a product page. The shopper had already found HPC before the deal-named site appears.
3. The four spreadsheet creators look different: facebook/instagram referrers, mostly new customers, long gaps from first session to order. But the UTMs on those sessions are **paid** Meta campaigns run by BM Digital, including "External Whitelisting". All four stop by 2026-06-20.
4. Many tagged orders carry a house code (HIGH10, SMS25, LABORDAY10-26, JULY426, HIGH15) or no discount at all, and no "Affiliate Discount".

**Conclusions, labelled as such. None is proven by Shopify data alone:**
- *Huynh Lam, Edith Ludewig, Jimmy Doheny, Aktug Dogan, Coupon Reals, Vu, Hoang Dang Huy, Andhi Ermawan are accounts operated by, or fed by, coupon and deal sites.* Supported by: 37 of 55, 20 of 33, 16 of 20, 7 of 10, 3 of 6, 3 of 6, 1 of 1 and 2 of 11 orders referred from deal-named domains, as the last click, onto the homepage. **Would confirm it:** the affiliate's registered website and payout email in UpPromote; opening dailydealreview.com, mimoni.com and dealspotr.com and checking whether their HPC links carry an UpPromote `sca_ref` parameter (Scout's job, outside HPC's systems).
- *Xiri Zana, Noah Primeaux, Thomas Nordeide, Nguyen Tran, Tran Tinh, Zidean Le, Chadrick McKenzie, Hernan Slodowicz, Layla Evan, Magaly Rivera get credit with no visible referral at all.* Their orders arrive from Google (much of it HPC's own paid Google Ads), direct, or Bing, and Shopify records no outside site. That pattern is what a browser coupon extension or a cookie set in a background tab would look like, **and it is also** what a link shared by text message or a private app would look like. Shopify cannot tell these apart. Hernan Slodowicz's pattern (0 of 28 from Google, 7 Bing, 18 no referrer, no discount on any of 5) is the most unusual and is an observation with no baseline. **Would confirm it:** UpPromote's per-order record of how the order was credited (link click with timestamp and landing URL, or coupon), and each affiliate's click count against order count. Those live in UpPromote, which I cannot read.
- *The spreadsheet creators' sales were driven by BM Digital's paid whitelisting ads, not by organic posts.* Supported by paid UTMs on 7 of the 8 sampled orders that had session data. **Would confirm it:** Meta spend on those whitelisting campaigns against these orders. That would also make the 5% a second cost on top of ad spend for the same order. Beau's question, not mine.

**Not concluded:** whether any of this revenue is incremental. No test here can show that.

## 6. Commission cost (a calculation, not a read)

**The rate on file is 5%.** Sources: `my-business (context)/our-clients.md` line 101 ("Live on
UpPromote. 5% commission, free to join"), `my-connections (MCP)/connected-apps.md` line 61,
`my-desk (now)/decisions.md` line 1005. Program name seen by Pete in UpPromote: "Standard
Affiliate Commission"; the rate itself was not read from UpPromote.

| Calculation | Inputs | Result |
|---|---|---|
| All tagged sales × 5% | $237,573.36 × 0.05 | **$11,878.67** |
| Four spreadsheet creators × 5% | $31,991.35 × 0.05 | $1,599.57 |
| Other 37 names × 5% | $205,582.01 × 0.05 | $10,279.10 |
| Last 90 days × 5% | $27,220.25 × 0.05 | $1,361.01 |

These are **not payouts**. Not read: what base UpPromote pays on (it may differ from Shopify
net), whether it claws back on returns, which orders it approved or denied, whether any
affiliate has a custom rate, and what has actually been paid. Jay's P&L line is "affiliate
commissions ~$4k" for 365 days (decisions.md line 557); my figure covers about 17 months of
sales, so the two are not comparable as they stand. Separate cost, already inside net: the 5%
"Affiliate Discount" given to the customer. UpPromote plan: $899.90/yr (Pete, 2026-09-21).

## 7. What this method cannot see

- **Orders whose tag was removed or edited**, and orders UpPromote credited without tagging. Only UpPromote's own order list would show them.
- **UpPromote's side entirely:** approved vs denied, paid vs unpaid, clicks, registered websites, payout emails, the `sca_ref` link parameter. Shopify returned landing pages without query strings, so whether an affiliate link was clicked is not visible in any order I opened.
- **Browser extensions.** Shopify sees sessions and referrers. It does not see an extension applying a code or setting a cookie.
- **The same person under two names.** Tags carry the registered name ("david nguyen", "Vu dangvu248@gmail.com"). Two registrations by one operator look like two affiliates. Spreadsheet "Michelle" vs tag "Michelle Solomon" is still unconfirmed.
- **Other tag spellings.** One wholesale order ($768.90) carries `uppromote_affiliate`, a different tag with no name. Not counted. A free-text search for `UpPromote_order` found 523, the same as the per-name sum, so no stray variant of the order tag exists in the window.
- **Refunds:** included, as returns, in the window they were processed. **Cancelled orders:** counted as an order, netted to $0 by the reversal. **Test orders:** excluded by Shopify analytics. **Two affiliate tags on one order:** checked, none.
- **Session data** covers a 30-day look-back and only sessions Shopify could track. 3 of the 86 orders opened had none.
- **The sample** is the newest 5 orders per name (86 orders opened in all, including the extra names), not a random draw. The referrer table in 5a covers all 523.
- A **rate limit** on Shopify's analytics API refused five queries mid-run. Three were re-run successfully; two (a full name-by-referrer cross-tab of all 41 names, and a referrer split for Layla Evan, Magaly Rivera, Gyorgi Muchev and Sharon Monahan) were not, so those four names have sampled orders only. No figure here rests on a failed call.

> **Next:** Beau — the numbers are real; whether HPC should keep paying 5% on orders that arrive from Google Ads and coupon sites is a call, not a query. Then **Pete** (or Evan, one click): export the affiliate list and the order/commission report from UpPromote; that is the only source that can confirm section 5c. **Scout** can check the deal sites' outbound links.
