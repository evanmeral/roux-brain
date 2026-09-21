# Affiliate program read

**Beau, 2026-09-21.** Shopify figures: Finn, 2026-09-21 ([report](2026-09-21-affiliate-tagged-sales.md)). UpPromote first screen: Pete, same day.

**The call:** most of what UpPromote credits is not creator-driven. Small leak, not a crisis. Ten minutes of exports settles it.

## 1. What it is

Facts:
- 37 of 41 credited names are not on Evan's list. They hold $205,582.01 of $237,573.36.
- 11 deal-named domains sent 92 orders store-wide; 89 carry an affiliate tag. Last click, homepage; sampled first touches were HPC's own ads or email.

Conclusions:
- **Coupon group (8 names):** deal-site accounts taking last-click credit for shoppers we already paid to find. High confidence (89 of 92). Not proven.
- **No-referrer group (10 names; Google, direct, Bing):** unknown. Browser extension, privately shared link, or an app setting crediting repeat orders to a first referrer (27 of 56 Xiri Zana orders are returning customers). The last is my hypothesis, not read.
- Incrementality: untested for everyone.

**The read that settles it:** UpPromote's per-order referral export: affiliate, how the order was tracked, commission, status.

## 2. What it costs

- On file: app $899.90/yr (Pete). Jay's P&L: commissions ~$4k, 365 days to about 2026-09-10 (decisions.md).
- Calculations at 5% of Shopify net, not payouts: all $11,878.67; coupon-referred orders $2,196.26; four creators $1,599.57; last 90 days $1,361.01.
- **Reconcile? No.** 33 names made their first sale after 2025-09-10; their net is $178,938.53. Remove the whole last 30 days ($6,271.19) and at least $172,667.34 sits inside Jay's window. At 5% that is $8,633.37, against ~$4k. The window does not explain the gap. Cause not read.
- Not on file: paid and owed. Source: UpPromote Payments, paid and unpaid totals (screen names from memory, not read).

## 3. What to do, in order

**Evan, ten minutes, his clicks:**
1. Export referrals, all time.
2. Export affiliates (site, email, sign-up date, status).
3. Note Payments: total paid, total unpaid.
4. Read, don't change: auto-approve affiliates, auto-approve commissions, cookie window, marketplace listing, repeat-order crediting, terms on coupon sites.
5. The one change worth making now: new affiliates to manual approval. Pete saw 6 sign-ups Sept 10–19, several with emails that don't match the name.

**Jay, one text, after the exports:** keep or remove coupon-site affiliates; honor unpaid balances (if terms never banned coupon sites, pay what is owed, change terms forward); what his ~$4k line contains.

**Leave until after Oct 31:** the customer 5% discount, commission restructure, clawbacks, chasing no-referrer names, incrementality tests. 90-day exposure is $1,361.01 (calc) against a $110,485 target.

## 4. Does it change a reported number?

- Shopify net, targets, pace line: no.
- **Meta "two ways":** possible small undercount. If match rules 1–5 read only the last session, a coupon-site last click drops a Meta-first order (Jimmy Doheny: 3 of 5 first sessions were Meta paid). 25 tagged orders in 30 days: small.
- **Whitelisting:** on the evidence, yes, we paid twice. 7 of 8 sampled creator orders carry BM Digital paid UTMs; the campaign ID seen, 6772105419387, is `BPM_TOF_Manual` (decisions.md). Ceiling $1,599.57 (calc). None since 2026-06-20. Live check: does any current ad URL carry an affiliate parameter?

## 5. The panel

- **Header:** credited $237,573.36, on our list $31,991.35, labelled "credited, not incremental." Payout tile reads "not read" until the CSV import, never the 5% calc.
- **Flags:** COUPON SITE ("37 of 55 from deal domains"), NO VISIBLE REFERRAL, PAID-AD OVERLAP, NOT ON OUR LIST, NEW SIGN-UP, HIGH RETURNS.
- **Columns:** name, flags, net 90d, net all, orders, last sale, top referrer and share, returning %, calc commission, paid.
- **Default sort:** net 90d, descending.

> **Next:** Evan runs section 3. Then **Finn**: load the export, reconcile paid against ~$4k, confirm which session rules 1–5 read, check live ad URLs. **Scout**: do the deal sites' HPC links carry an affiliate parameter. **Nova**: section 5.
