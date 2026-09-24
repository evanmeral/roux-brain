# UpPromote: setting changes and one text to Jay

**Beau, 2026-09-21. A read, not a fix.** No plan time before Oct 31 (decisions.md, "Affiliate
program: read it, don't fix it yet"). Everything below is **Evan's clicks in UpPromote**. ROUX
changes nothing and sends nothing.

> **Evan, 2026-09-21:** auto-activate stays ON, so change 1 is out and the Jay text's closing line about manual approval is removed. And don't dig deeper into UpPromote: it is a small part of the business. The two Finn follow-ups in **Next** are dropped.

**Sources.** Figures: Finn, [payout reconciliation](2026-09-21-uppromote-payout-reconciliation.md),
from Evan's UpPromote exports of 2026-09-21 (referrals, affiliates, approved payments), headline
figures re-run by ROUX and matching. Settings: Evan's five screenshots in
`raw/2026-09-21_uppromote_settings-screenshots/`. Earlier read: [Beau](2026-09-21-affiliate-program-read-beau.md).

**The call:** three changes now, all toggles, all reversible, none costs a real creator a dollar
on the history we have. Everything that decides who gets paid what waits for Jay's answers and
for after Oct 31.

---

## Facts this rests on (Finn, referrals and affiliates exports, unless noted)

| Fact | Figure |
|---|---|
| Commission marked Paid, referrals dated 2025-09-11 to 2026-09-10 | $11,718.37 |
| Jay's P&L line, affiliate commissions | ~$4k (Jay, 2026-09-10, decisions.md) |
| Rate | 8% on every row through 2026-01-07, 5% from 2026-01-15, program-wide |
| Denied commission | $0 |
| Approved, not paid (approved-payments file) | $44.11 net = $203.11 owed to 18 affiliates, −$159.00 owed back by 3 |
| Negative balances | Coupon Reals −$140.24, Michelle Solomon −$13.25, Hernan Slodowicz −$5.51 |
| Return clawbacks already netted, Jay's window | −$567.95 |
| Google Ads "Detected" | 193 orders · $89,971.96 sales · $4,821.14 commission · 0 denied · none flagged before 2025-12-06, so a floor |
| Detected, last 90 days | 45 orders · $680.37 commission |
| Detected rows belonging to the 4 creators on Evan's list | 0 |
| Last 30 days of sign-ups | 28, all auto-activated, none with a website; 27 via the registration form, 1 Marketplace; 5 log in with deal-style business domains; 2 already earned (Find Reviews $28.20, Scarlett Miller $2.30) |
| Tracking | 553 link · 9 coupon (Gyorgi Muchev, SPROM) · 1 bonus; no draft-order flag in the export |
| The 4 creators on Evan's list | all signed up via the registration form (affiliates export) |

**Finn's buckets are conclusions, not facts:** real creators $1,586.24 · deal sites $4,716.05 ·
Marketplace sign-ups, no site $3,986.88 · form sign-ups, no site $2,293.05 (commission, all time).

---

## Job 1: Evan's checklist, in priority order

### Now, 2 minutes each

**1. ~~Auto-activate affiliates: ON → OFF.~~ Evan, 2026-09-21: stays ON.**
- Now (screenshot 1): ON, program "Standard Affiliate Commission." Verify email ON.
- Why: 28 sign-ups in 30 days, all activated with no look, none with a website. Two are already
  earning. The deal-site bucket is $4,716.05; this is the door it came through.
- Cost/risk: Evan approves by hand, about one a day at the current rate. Batch it once a week;
  the new-affiliate notification is already ON. A real creator waits a few days. Existing
  affiliates are untouched.
- Proven? The inflow is fact. That these sign-ups are deal sites is my conclusion from the
  domains, not proven. The change doesn't depend on it: it only adds a look.

**2. Delay time to auto-approve orders: 0 days → 30 days.**
- Now (screenshot 2): auto-approve ON, 0-day delay.
- Why: commission is approved the day of the order, before returns land. That's why 3 affiliates
  owe back $159.00 and $567.95 of clawbacks sit in Jay's window. A delay also gives a window to
  deny a bad referral before it's approved, without Evan approving every order by hand.
- Cost/risk: affiliates are paid about a month later. The 4 creators had no referrals in 90 days,
  so no one real is hurt today. I don't have HPC's return window; 30 days is my pick. Match it
  to the return policy if that's different.
- Keep auto-approve itself ON. Turning it off means Evan hand-approves 81 orders a quarter.

**3. Hide the registration form from search engines: OFF → ON.**
- Now (screenshot 4): OFF.
- Why: 27 of the last 28 sign-ups came through the form, none with a site. Form sign-ups with no
  site hold $2,293.05.
- Cost/risk: none I can see. The 4 real creators joined through the form, but Evan sends that
  link himself. Whether search is how the deal sites find it is not tested; this is a cheap bet,
  not a proven fix.

### Now, but only if the option exists

**4. Google Ads detection action: "Mark only" → a hold-for-review option.**
- Now (screenshot 2): Detect ON, action "Mark only." UpPromote's own note: with auto-approve on,
  these are approved too.
- Why: $4,821.14 paid on 193 detected orders, none denied. 45 orders, $680.37 in the last 90 days.
- Cost/risk to creators: **zero on history.** None of the 4 creators' rows was ever detected.
  189 of the 193 sit in the Marketplace and form no-site buckets.
- **Not proven:** what "detected" means for us. Either the affiliate ran Google ads with their
  link (possibly on our brand name, bidding against Coalition), or the shopper came through
  *our* Google ads and the affiliate cookie took the credit. The tooltip wasn't captured and I
  haven't read UpPromote's definition. Both readings are bad for us, but an affiliate running
  honest non-brand ads would be a real affiliate. So: **hold, don't deny.**
- I have not seen the dropdown's other options. If there is a review or pending choice, pick it.
  If the only other choice is Deny, leave it on "Mark only" for now: with change 2, marked
  orders sit 30 days before approval and Evan can deny them from the referral list. Switch to
  Deny after Jay answers question 4 below.

### After Finn's one query

**5. Record draft orders as referrals: ON → probably OFF.**
- Now (screenshot 2): ON. Pending orders: OFF.
- Why it matters: draft orders are staff-built (phone, commercial, custom). Commission on an
  order Stephen or Jay wrote up by hand is hard to justify, and those tickets are big.
- **Can't size it:** the export has no draft-order flag. Finn can, read-only: `sourceName` on the
  523 tagged orders. If any are `shopify_draft_order`, turn it OFF that day. If none, leave it.
- Risk of OFF: a coupon order (SPROM) keyed in as a draft would stop crediting. SPROM stays
  as-is (Evan, 2026-09-15); this doesn't touch the code.

### After Oct 31 (not before)

- **Marketplace listing.** Marketplace no-site accounts hold $3,986.88 and $3,031.71 of the
  detected commission, but only 1 of the last 28 sign-ups came from it. With change 1 on, every
  new one gets a look anyway. Unlisting can wait.
- **Remove or restrict existing deal-site and no-site affiliates.** Jay's call (question 3).
- **Commission structure:** a separate program for real creators vs everyone else, or 0% for
  coupon sites. Needs Jay's rate answer first (question 2).
- **Anything touching the 5% customer discount, clawback terms, or incrementality tests.**

### Leave as is

Cookie 15 days · US only · duplicate-IP referrals within 60s not recorded · multi sign-ups from
one IP not saved · spam sign-ups saved but denied · verify email ON · notifications and weekly
report ON (change 1 needs them) · no Lifetime Commission. Nothing in Finn's figures argues for
changing any of them.

### The balances

- **$203.11 owed to 18 affiliates: pay it**, once Jay says yes (question 5). It was earned under
  the terms in force. Withholding it saves $203.11 and buys disputes. Change the rules forward.
- **−$159.00 owed back by 3: do nothing.** Let it net against their future commission, which
  UpPromote already does. Don't chase $159 by hand. If Coupon Reals is removed later, its
  −$140.24 is written off. That's fine.
- The small old balances (Roddy Davis $5.80, Lisa Trúc $3.07, Brittany Sansone $0.80) suggest a
  payout minimum or no payout method set. That's readable in UpPromote's payment settings; it's
  not a Jay question.

---

## Job 2: the text to Jay (draft, not sent)

**Send order:** pull the UpPromote Payments → payment history export first (Finn's step 1, one
file). If it shows payouts stopped around the end of February, the text still stands; question 1
just gets sharper. It keeps the Jay text to one message.

> Hey Jay, I went through the affiliate program in UpPromote and have a few questions only you can answer.
>
> 1. Your P&L shows about $4k for affiliate commissions. UpPromote shows $11,718.37 marked paid on orders from Sep 11 2025 to Sep 10 2026. Which months does your $4k cover, and is it money actually sent? Who sends the payouts and from what account (PayPal?), and could some of it be booked under other advertising?
>
> 2. The commission was 8% until early January and has been 5% since Jan 15 2026. Do you know who changed it and why, and were the affiliates told?
>
> 3. Most of the commission isn't going to creators. All time: our 4 real creators $1,586.24, deal and coupon sites $4,716.05, marketplace sign-ups with no website $3,986.88, form sign-ups with no website $2,293.05. Keep or remove the deal sites and the no-website accounts going forward? I'd remove the deal sites and go through the rest one by one.
>
> 4. UpPromote flagged 193 orders since December as coming through Google Ads, $4,821.14 in commission, and $4,679.09 of it is already paid. OK to stop paying on those going forward until we know if they were our own ads?
>
> 5. UpPromote lists 31 referrals as approved but not marked paid, $44.11 net, mostly small balances from June to now. Is there a payout step or minimum I'm missing, or do we just not pay those?
>
> 6. Did you or anyone else ever make a deal directly with any of these affiliates or sites, like a set rate or a contract? I don't want to cut off something you agreed to.

**Corrected 2026-09-24 (ROUX, Evan questioned Q5):** Q5 called $203.11 "owed"; that is the positive lines only of the Approved-status export (net $44.11), and Approved status does not show anything is owed. Q4 said "paid every one"; 176 are Paid ($4,679.09), 17 Approved ($142.05). Both recomputed from the raw exports.

**Checked:** every number is Finn's or Jay's own. No em-dashes, no exclamation marks, "Hey",
no sign-off, numbered, one message. The last line assumes Evan makes change 1 before sending;
cut it if he hasn't.

---

## Conclusions, kept apart from the facts

- The program's cost problem is who gets in and when commission locks, not the rate. Changes 1–3
  fix the door and the timing without touching anyone already in. (Beau)
- The ~$7.7k gap between UpPromote and Jay's line is unexplained. It is a bookkeeping question
  first, a marketing question second. Nothing here should be reported as "HPC overpaid" until
  Jay answers question 1 and the payment history is read. (Beau)
- Whether any affiliate revenue is incremental is untested for everyone, including the creators.

> **Next:** Finn — two read-only Shopify queries: (a) `sourceName` on the 523 tagged orders, to
> size change 5; (b) for the 45 Google-detected orders in the last 90 days, the customer journey
> (landing URL, gclid, UTM campaign) to test whether the click was *our* Google campaign or the
> affiliate's. Check the output against the rule that a filter can't return what it excludes:
> nothing before 2025-12-06 is flagged. Then Evan sends the Jay text; **Beau** writes the
> keep/remove list from Jay's answers.
