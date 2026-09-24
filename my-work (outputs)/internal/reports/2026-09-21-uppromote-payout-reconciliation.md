# UpPromote payout reconciliation and referral split

**Finn · read 2026-09-21 · read-only. Nothing was written to Shopify, Meta or UpPromote.**
Inputs: Evan's UpPromote exports of 2026-09-21 in `raw/` — `2026-09-21_uppromote_referrals.xlsx`
(563 rows), `2026-09-21_uppromote_affiliates.xlsx` (252 rows), `2026-09-21_uppromote_approved-payments.xlsx`
(21 rows) — plus settings as read from Evan's screenshots and my Shopify read of the same day
([affiliate-tagged-sales](2026-09-21-affiliate-tagged-sales.md)).
Machine-readable copy: `my-files (knowledge)/hpc-reference/affiliates/uppromote-read-2026-09-21.json`

> "The export says X" is not "X is true." `Paid` below is UpPromote's status field. It says
> someone marked the commission paid in UpPromote. It does not prove money left PayPal, or when.

**Windows used.** Jay's window = referral `date` 2025-09-11 00:00 to 2026-09-10 23:59, store time
as exported. Last 90 days = 2026-06-23 to 2026-09-21 (same as the Shopify read). Export spans
2025-04-21 to 2026-09-20. The 2026-07-20 line falls inside both windows: two operators, not one trend.

---

## Headline

| | Figure | Kind | Source |
|---|---|---|---|
| (a) Jay's P&L line | **~$4k** | reported | Jay, 2026-09-09/10, decisions.md line 575 |
| (b) 5% of tagged Shopify net in Jay's window | **≥ $8,633.37** | calc (Beau) | Shopify read 2026-09-21 |
| (c) UpPromote commission, status Paid, referrals dated in Jay's window | **$11,718.37** | export | referrals.xlsx `commission`, `status`, `date` |
| (c) all statuses in window (Paid + Approved + Denied) | $11,696.35 | export | same |
| UpPromote commission, all time, all statuses | $12,692.19 | export | same |

**The gap is between (a) and everything else, not between (b) and (c).** UpPromote says ~$11.7k of
commission on window referrals is marked paid. Jay's books say ~$4k. Six of the seven candidate
causes are tested below and none closes a $7.7k gap. The one that could (cash date basis, or
booking to another line) cannot be tested from these files.

---

## Job A. Reconcile payouts

### A1. Commission by status (fact, referrals.xlsx)

| Status | Rows | total_sales | Commission | In Jay's window: rows | total_sales | Commission |
|---|---|---|---|---|---|---|
| Paid | 528 | $229,700.73 | **$12,648.08** | 504 | $218,079.59 | **$11,718.37** |
| Approved | 31 | $881.64 | $44.11 | 25 | −$440.85 | −$22.02 |
| Denied | 4 | $0.00 | $0.00 | 2 | $0.00 | $0.00 |
| **Total** | **563** | **$230,582.37** | **$12,692.19** | **531** | **$217,638.74** | **$11,696.35** |

Outside the window: 26 rows before it ($929.71, all Paid), 6 after it ($66.13, all Approved).

Other columns: `currency` USD on all 563. `network_commission` "No" on all 563. `is_first_commission`
"No" on all 563. `commission_adjustment` 0.00 on all 563. `program_name` "Standard Affiliate
Commission" on all 563. So none of those explains a rate. Two `comment` values: one "Return
shipping, no commission" (a Denied $0 row), one $20.00 performance bonus to Clair Cook
("20 referrals from Apr 15 to May 28, 2026", `tracking_by` = "Performance bonus", no order).

The 4 Denied rows are all $0 net: two $0.00 rows, and one +$26.80/−$26.80 pair on one order.
**Denied commission is $0. Nothing denied is being withheld.**

### A1b. The rate (fact)

Every row's `commission` ÷ `total_sales`:

| Rate | Rows | Dates |
|---|---|---|
| **8.0%** | 79 (+4 at "8.2%", which are ±$0.73 orders rounding to $0.06) | 2025-04-21 to **2026-01-07** |
| **5.0%** | 475 (+1 at "5.1%", a $9.50 order rounding to $0.48) | **2026-01-15** to 2026-09-20 |

- Every 8% row recomputes to the cent as `round(total_sales × 0.08, 2)`; every 5% row as `× 0.05`. 0 exceptions.
- No 5% row falls before the last 8% row. **It is a date change, not a per-affiliate rate.** 14 different affiliates were paid 8% before the change; the same names (e.g. Xiri Zana, Huynh Lam, Jimmy Doheny) are paid 5% after it.
- The switch happened between 2026-01-07 and 2026-01-15. The export does not say who changed it or why. The "5%" on file in the brain is right only from mid-January 2026.
- In Jay's window, 60 rows were paid at 8%: $2,117.64 commission. At 5% they would have been $1,323.52 (calc). The rate change **adds $794.12** to (c). It pushes UpPromote *above* the 5% calc; it cannot make Jay's figure *lower*.

### A2. Where the gap comes from: each cause, tested

| # | Candidate cause | Test that tells it apart | Result | Verdict |
|---|---|---|---|---|
| 1 | Denied or unpaid commission never paid out | Sum Denied and Approved in window | Denied $0.00; Approved −$22.02 (net clawback owed *to* HPC) | **Ruled out.** Unpaid balances are $203.11 gross, not $7.7k. |
| 2 | Rate isn't 5% | Commission ÷ total_sales per row | 8% before 2026-01-15, 5% after | **Real, wrong direction.** Adds $794.12 to (c). Explains (c) > (b), not (a) < (b). |
| 3 | UpPromote base ≠ Shopify net (shipping, tax, pre-discount) | Per-affiliate sum of `total_sales` vs Shopify net, all 41 names | UpPromote $230,582.37 vs Shopify $237,573.36. Exact to the cent for 28 of 41 names (e.g. Noah Primeaux $16,025.68 both; Hernan Slodowicz $14,756.30 both). Where they differ, UpPromote is lower on 12 of 13 (Coupon Reals −$3,256.11, Tran Tinh −$767.10) | **Ruled out.** The base is after discount, before shipping and tax, i.e. Shopify net. If anything it pays on *less*. |
| 4 | Returns clawed back as negative rows | Count negative rows | 38 rows, −$11,143.25 sales, −$583.92 commission all time; −$567.95 in window | **Real, already inside (c).** Too small to matter. |
| 5 | Jay's line is cash paid (PayPal) on a different date basis | Payout dates | **Not in any export.** `Paid` has no paid-on date. | **Cannot test.** Bound below. |
| 6 | Order sets differ (Shopify-only or UpPromote-only orders) | Match referral orders to the 523 tagged orders | See A2b | **Ruled out at name level.** |
| 7 | Jay's line is booked from something else | Jay's ledger detail | Not in any file | **Cannot test.** |

**The bound on cause 5 (calc).** Referrals dated in the window can't be paid before the window
starts. So for Jay's ~$4k to be the cash-basis version of the same commission, about $7.7k of it
would have to have been paid **after 2026-09-10**, i.e. between 2026-09-11 and today. That is only
possible if HPC paid nothing for months and cleared the backlog in the last 11 days. The export
cannot show that, and nothing in it rules it out: the newest referral marked `Paid` is dated 2026-09-06.

**One observation, no baseline, not a finding.** All-time commission on referrals dated
2025-04-21 to 2026-02-28 adds up to **$4,045.92** (calc from `commission`, `date`). If payouts or
bookkeeping stopped around the end of February, Jay's ~$4k is roughly what you'd see. It's a
coincidence until the payout history says otherwise. Commission since 2026-03-01: $8,602.16 Paid
through 2026-09-10 (calc).

**What settles it, in order:**
1. **UpPromote → Payments → payment history export** (each payout: date, affiliate, amount, method). One file. It answers cause 5 directly: is the $11,718.37 actually paid, and when.
2. **One question to Jay:** "Your ~$4k for affiliate commissions: is that PayPal payouts to UpPromote affiliates, and which months does it cover? UpPromote shows about $11.7k marked paid for orders Sep 2025 to Sep 2026." Answers cause 7, and whether some payouts sit in "other advertising and marketing $56k".
3. If Jay has no PayPal payout lines at all: someone may be marking commissions paid in UpPromote without paying, or paying from an account the books don't see. The PayPal activity statement settles that.

### A2b. Order matching (fact, with a limit)

| | Count | Source |
|---|---|---|
| Distinct orders in the referrals export (non-negative rows, bonus excluded) | **523** | referrals.xlsx `order_name` |
| Shopify orders tagged `UpPromote_order <name>` | **523** | Shopify read 2026-09-21 |
| Names in both | 41 of 41, same spellings | both |
| Per-name order count equal | **41 of 41** | both |
| Orders appearing more than once in the export | 38 (the original row plus a return row) | referrals.xlsx |

**Limit.** I matched by count per name, not by `order_name` one by one. The Shopify connector is
"pending" in this session, and this morning's read kept per-name totals, not order lists. Equal
counts on all 41 names make a mismatch unlikely but don't exclude a swap (one Shopify-only and one
UpPromote-only order under the same name). Matched / UpPromote-only / Shopify-only is therefore
**523 / not tested / not tested**. A one-query rerun settles it: GraphQL `orders(query:"tag:'UpPromote_order <name>'")`
returning `name` for all 41 tags, diffed against the export's `order_name` (strip the leading space).

### A3. What the approved-payments file is (fact)

It is **exactly the 31 referrals with status Approved, summed per affiliate.** 21 names; every
name's rows, sales and commission match the Approved rows to the cent; no Approved referral is
missing from it. Totals: **31 referrals, $881.64 sales, $44.11 commission** ($203.11 in positive lines across 18
affiliates, −$159.00 across 3; "Approved" status does not show anything is owed, corrected 2026-09-24).

- Negative lines: Coupon Reals −$140.24 (two return rows on order #15392, June 2026), Michelle Solomon −$13.25, Hernan Slodowicz −$5.51 net. These are clawbacks netted against future payouts.
- So ROUX's README label, "approved, not yet paid", **fits the data**: none of these rows is `Paid`. What the file does not show is whether a payout run is due. Several balances are old and tiny: Roddy Davis $5.80 since 2026-03-27, Lisa Trúc $3.07 since 2026-06-12, Brittany Sansone $0.80 since 2026-06-23. **Conclusion, not read:** there is probably a minimum payout threshold, or those affiliates have no payout set. The settings screenshots don't show one.
- It is **not** a payment history and says nothing about what has been paid.

---

## Job B. Split the referrals

### B1. By tracking method and Google Ads detection (fact, referrals.xlsx)

**`tracking_by` values that exist:** "Tracked by affiliate link" (553), "Tracked by coupon" (9),
"Performance bonus" (1). **No draft-order value exists.** `google_ads`: "Detected" (193) or blank (370).

| Split | All time: rows · orders · total_sales · commission | Last 90 days: rows · orders · total_sales · commission |
|---|---|---|
| Link, **Google Ads detected** | 193 · 193 · $89,971.96 · **$4,821.14** | 45 · 45 · $13,606.90 · **$680.37** |
| Link, not detected | 360 · 330 · $135,359.81 · $7,588.52 | 34 · 30 · $9,280.38 · $464.05 |
| Coupon (all Gyorgi Muchev, SPROM) | 9 · 9 · $5,250.60 · $262.53 | 6 · 6 · $3,823.96 · $191.20 |
| Performance bonus | 1 · 0 · $0.00 · $20.00 | 0 |
| **Total** | 563 · 523 · $230,582.37 · $12,692.19 | 85 · 81 · $26,711.24 · $1,335.62 |

- **Google-Ads-detected referrals: 193 orders, $89,971.96, $4,821.14 commission.** 176 Paid, 17 Approved, 0 Denied. In Jay's window: 190 rows, $4,771.09. The setting is "Mark only" with auto-approve on, so detection flags the order and pays it anyway. The data agrees: not one detected row was denied.
- **What this filter cannot return:** the first detected row is 2025-12-06. Nothing before that date is flagged, whether because the setting was off or because detection didn't exist. So the 193 is a floor, not a total. Since 2025-12-06, 193 of 467 positive rows (41%) are detected. Return rows are never flagged, even on detected orders, so the detected figures are before returns.
- **Draft orders:** the setting "record draft orders as referrals" is ON, but the export has no column that marks one. **Draft-order referrals cannot be counted from this file.** Shopify can: the order's `sourceName` ("shopify_draft_order") for the 523 orders. Not run (connector pending).
- The 90-day window includes returns processed in it (e.g. Hernan Slodowicz −$714.47 on 2026-06-24 and −$145.00 on 2026-09-15), so 90-day net lines are not new sales alone.

### B2. By kind of affiliate (conclusions, with evidence)

**Each bucket is my conclusion from the affiliates export plus this morning's Shopify referrer read.
None is confirmed by the affiliate.** Evidence per name is in the JSON (`bucket_basis`).

| Bucket (conclusion) | Names | Commission all time | Evidence (fact) |
|---|---|---|---|
| **A. Real creator, on Evan's list** | Clair Cook, Brandon Griffin, Rickie Moore, Roddy Davis | $1,586.24 (incl. $20 bonus) | Evan's list. Rickie Moore and Roddy Davis list socials; Roddy Davis a company (Kountry Kuisine LLC). |
| **B. Creator-type presence, not on Evan's list** | Javaris Donnett, Michelle Solomon, Brittany Sansone | $109.97 | Javaris Donnett: website chefjayvoo.com, fb/ig/tiktok, Boil Master LLC, US — the only non-list name with a real public profile in the export. Michelle Solomon: login on recipesfrommichelle.com. Brittany Sansone: login on brittanyksansone.com, and her 1 order's Shopify referrer is that site; her payout email doesn't match her name. |
| **C. Deal / coupon / review site** | *Strong* (company domain and/or deal-site referrer): Jimmy Doheny, Edith Ludewig, Aktug Dogan, Coupon Reals, Melba Graham, Patrick John, Andhi Ermawan, Huynh Lam, Vu dangvu248@gmail.com, Hoang Dang Huy. *Weak* (name only): Daniel Foster, Find Reviews, Hernan Slodowicz | $4,716.05 | Jimmy Doheny = affiliate@demand.io, company Demand.io, website knoji.com, socials "simplycodes". Edith Ludewig = info@mimoni.com (17 of 33 orders from mimoni). Aktug Dogan = help@refermate.com. Patrick John = contact@couponmycart.com. Melba Graham's login is a coupontigo mailbox. Andhi Ermawan = referral@rank.id. Huynh Lam: gmail profile, but 36 of 55 orders came from dailydealreview. Daniel Foster's mailbox is named "greatfindsreviews"; Find Reviews is the registered name; Hernan Slodowicz logs in on dailyhernan.com (unchecked) with 0 Google-referred orders. |
| **D. Marketplace sign-up, no visible site** | Xiri Zana, Noah Primeaux, Nguyen Tran, Chadrick McKenzie, Gyorgi Muchev, Sharon Monahan, ARTURO LIZAMA | $3,986.88 | `signup_source` Marketplace; no website or socials; payout email doesn't match the name on 4 of the 6 with one set. |
| **E. Registration form, no visible site (unknown)** | Thomas Nordeide, Tran Tinh, Zidean Le, Layla Evan, Magaly Rivera, Joshua Flores, Anna Rippin, david nguyen, Mia William, Cristy Rodriguez, Rupy Aujla, Hue Duong, Lisa Trúc, Scarlett Miller | $2,293.05 | `signup_source` Registration form; no website or socials; personal webmail. |
| **F. Jay's test account** | Jay Meral (JayTestCode) | $0.00 | In the affiliates export (jay@ HPC domain, created 2025-03-16, the day UpPromote was installed). **No referrals.** |

Across all 41 credited names: 21 of 39 with a payout email have one that differs from the login
and contains no part of the registered name (calc, affiliates.xlsx `email`, `payment_info`,
`first_name`, `last_name`). Observation, no baseline.

### B3. Tracking method × bucket (fact on the rows, bucket is a conclusion)

| Bucket | All time: detected rows · commission | Not detected rows · commission | Coupon | Last 90 days: detected · not detected (commission) |
|---|---|---|---|---|
| A. Evan's creators | 0 · $0 | 102 · $1,586.24 | 0 | no referrals in 90 days |
| B. Creator-type | 0 · $0 | 8 · $109.97 | 0 | $0 · $8.64 |
| C. Deal sites | 4 · $171.99 | 184 · $4,544.06 | 0 | $28.20 · $256.15 |
| D. Marketplace, no site | 93 · **$3,031.71** | 36 · $692.64 | 9 · $262.53 | $363.12 · $208.58 (incl. $191.20 coupon) |
| E. Registration, no site | 96 · **$1,617.44** | 31 · $675.61 | 0 | $289.05 · $181.88 |

**The deal sites and the Google-detected names are different people.** Deal sites (C) have 4 of
188 rows detected. Buckets D and E hold 189 of 193 detected rows and $4,649.15 of the $4,821.14.

**Commission on Google-Ads-detected referrals, by name (fact):**

| Name | Bucket | Detected / all orders | Detected sales | Detected commission | 90 days |
|---|---|---|---|---|---|
| Xiri Zana | D | 44 / 56 | $24,483.14 | **$1,263.02** | 13 · $271.36 |
| Nguyen Tran | D | 14 / 19 | $12,103.07 | $770.28 | 1 · $24.96 |
| Thomas Nordeide | E | 40 / 46 | $12,255.76 | $625.24 | 6 · $88.24 |
| Noah Primeaux | D | 21 / 27 | $11,531.58 | $608.24 | 0 |
| Tran Tinh | E | 19 / 20 | $10,570.30 | $528.54 | 2 · $6.98 |
| Chadrick McKenzie | D | 8 / 8 | $5,352.14 | $267.60 | 0 |
| Zidean Le | E | 16 / 21 | $4,642.74 | $253.95 | 2 · $23.45 |
| Sharon Monahan | D | 6 / 7 | $2,451.18 | $122.57 | 4 · $66.80 |
| Layla Evan | E | 11 / 11 | $2,222.71 | $111.15 | 11 · $111.15 |
| 11 others (≤ $76 each) | C/E | 14 | $4,359.34 | $270.55 | |
| **Total** | | **193** | **$89,971.96** | **$4,821.14** | **45 · $680.37** |

Remember the floor: Xiri Zana, Nguyen Tran and Noah Primeaux had orders before 2025-12-06 that
could not be flagged.

**Draft-order referrals by name:** cannot be split from this export (see B1).

### B4. The affiliates export (fact, affiliates.xlsx)

| | Count |
|---|---|
| Accounts | 252 |
| Active / Inactive | 247 / 5 |
| Registration form / Marketplace | 205 / 47 (all 47 Marketplace are Active; the 5 Inactive are Registration form) |
| With a website | 7 (chefjayvoo.com, knoji.com, grillax.com, couponlanding.com, cajuncousinsco.com, modernstoneage.com, theplanetdeals.ai) |
| With any social profile | 17 |
| With a coupon | 3 (JayTestCode, SPROM, JFLOR) |
| Accounts with at least one referral | 41 (16%) |
| Names registered twice | 7 (incl. Daniel Foster, Hoang Dang Huy, Nam Tran) |

Sign-ups by month climb from 1–7 a month in 2025 to 13–37 a month in 2026 (peak June 2026: 37).

**Last 30 days (created 2026-08-22 to 2026-09-21): 28 sign-ups**, 27 Registration form, 1
Marketplace, all 28 Active (auto-activate is ON). None lists a website or social. Five use a
business domain for login: savedealy.com, budgetdungeon.com, gainifyselect.com, onplumnelly.com,
beaute-cosmetics.com; the other 23 use gmail. Two already earned commission: Find Reviews
($28.20) and Scarlett Miller ($2.30). One is a second "Daniel Foster" account (0 referrals; the earning
Daniel Foster is the May 2026 account). Note: the regional limit is "US only", yet most of these
accounts list no country at all, so the limit may apply to shoppers, not affiliates. Not tested.

---

## What this read cannot see

- **When anything was paid.** No paid-on date exists in any of the three files.
- **Order-by-order match** with Shopify (count-matched only; see A2b).
- **Draft orders** (no column), **pending orders** (setting OFF, so none recorded), **IP-duplicate drops** (not recorded, so invisible by design).
- **Google Ads detection before 2025-12-06.**
- **Clicks.** The export has no click counts, so click-to-order ratios per affiliate aren't possible.
- **Whether any of it is incremental.** Nothing here tests that.

> **Next:** Evan pulls one more UpPromote export: Payments → payment history (dates and amounts).
> Then Finn closes cause 5, and **Beau** sends Jay the one question in A2. Beau also owns the call on
> the $4,821.14 paid on Google-Ads-detected orders and the 5% going to deal sites. It's a decision,
> not a query.
