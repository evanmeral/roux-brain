# Bundle discount-code fix: Evan's to-do
**2026-09-11 · ROUX · for Evan.** Rule (Jay, 2026-09-11): **every code skips bundles. Military and first-responder 5% are the one exception.**

**Approved 2026-09-11 (Evan):**
- The tailgate kit at $465 and the 60 QT kit at $519 (Jay).
- **Welcome10 stays off bundles.** It already skips them, so there's nothing to change.
- Military and first responder stay allowed on bundles.
- The BM Digital codes will never be used again, so they're listed to turn off.
- `RM40JAY` and `CWBSM40` are Jay's discretionary codes. Keep them.

**Every discount in Shopify**, with a recommendation on each row, is in
[2026-09-11-discount-code-inventory.csv](reports/2026-09-11-discount-code-inventory.csv), ready to import into a Google Sheet.

Research was read-only. Nothing was changed in Shopify. Every step below is Evan's click in Shopify admin. **Codes
issued by Biljana's email/SMS flows are hers to change.** Where a code's owner isn't on record, that's said.
Context: [bundle plan](2026-09-11-tailgate-thanksgiving-bundles-plan.md) §2 and §6.

---

## The short version

1. **The mechanism already exists.** A collection called **All Products - Eligible for Discounts** does the job.
   - **Welcome10** points at it; Jay created that code on Aug 17 (discount event log). **LABORDAY10-26** points at it too.
   - Both skipped bundle lines on real orders (#17368 and #17404) and still discounted other items.
2. **Make that one collection exclude everything tagged `Bundle`.** Every bundle carries that tag. "Product
   Bundles" is a smart collection built on "tag = Bundle", and all four current bundles are in it. The three new kits will be too.
3. **Point every code at that collection.** ⚠️ **The catch:** almost every code in use is an **"amount off
   order"** discount, and **Shopify's order-discount type has no "applies to" setting.**
   - Those codes have to be **recreated as "amount off products"** discounts. That's the real work.
   - Every code that hit a bundle this summer is this type (*Shopify `discountClasses`*).
4. **Leave Military and Responder alone.** They're the exception, and their titles say "do not delete or modify".

*Why not "one Bundles collection every code excludes"? Shopify codes can only* include *collections or
products; there's no exclude option. So flip it around: one eligible collection that leaves bundles out, and every code points at it.*

---

## Step 0 · Confirm the eligible collection (admin only)

The connector can't see this collection. A title search returns nothing, and the collection list on Welcome10
comes back empty, so its rules are unverified.
- **Open Products → Collections → "All Products - Eligible for Discounts".**
- **Expected:** a smart collection with a rule like "Product tag is not equal to `Sale-NoDiscount`".
  - Platinum, Ultimate, the 20 lb Foundation Seasoning and one draft Scratch & Dent carry that tag (Shopify).
  - The Boil Boss Combo and Ultimate Combo do **not**.
- **Add the condition "Product tag is not equal to `Bundle`"**, with "all conditions" kept. That removes all four existing bundles and every future kit in one rule.
- **If it's a manual collection:** create a new smart collection "Discount-eligible (no bundles)" with "tag is
  not equal to Bundle" and "tag is not equal to Sale-NoDiscount". Use it everywhere below, and re-point Welcome10 to it.
- Check the collection isn't linked in the storefront menu. It's a discount tool, not a shop page.

---

## Step 1 · Every code that landed on a bundle, Jun 1–Sep 10 (exact names)

*Source: every Shopify order containing the Triple Jet, Jun 1–Sep 10 2026, with discount allocations per line. 69 bundle orders.*

| Code (exact) | What it is (Shopify) | Bundle orders hit | $ on bundle lines | Type | Owner | Action |
|---|---|---|---|---|---|---|
| `HIGH10` | 10% off entire order · one use per customer · 406 uses · since 2023-07-09 | 6 | $546.15 | Order | **Likely Biljana** (signup-style code; creator not on record) | Recreate as a product discount (Step 3) |
| `HIGH15` | $15 off · min $30 · one use per customer · 579 uses | 4 | $52.46 | Order | **Likely Biljana.** ⚠️ `what-we-sell.md` says the $15 email code is retired, but it's still active | Retire it, or recreate it |
| `SMS25` | $25 off · min $100 · one use per customer · 606 uses | 2 | $46.69 | Order | **Likely Biljana** (SMS signup) | Recreate · once per order |
| `FB-EMAIL-CZYVPKZ5` | 5% off, one customer, expired | 1 | $50.99 | Order | **Facebook & Instagram app** (event log: "Facebook & Instagram created this discount") | Fix at the generator (Step 4) |
| `JULY426` | 10% off entire order · **expired 2026-07-07** | 6 | $563.95 | Order | Evan / Jay (sale code) | Nothing to fix. Build future sale codes like LABORDAY10-26 |
| `BOIL10` | 10% off entire order · one use per customer · since 2026-01-20 · 2 uses | 1 | $104.99 | Order | Not on record | Recreate or deactivate |
| `SPROM` | 5% off entire order · since 2026-04-15 · 9 uses | 1 | $50.99 | Order | Not on record | Recreate or deactivate |
| `mil-…` (parent **Military (do not delete or modify)**) | 5% off · 864 unique codes · 231 uses | 8 | $390.27 | Order | Verification setup | **Exempt. No change** |
| `fir-…` (parent **Responder (do not delete or modify)**) | 5% off · 347 unique codes · 95 uses | 3 | $143.72 | Order | Verification setup | **Exempt. No change** |
| *(no code)* #16307 | Discount on bundle lines, no code recorded | 1 | $49.99 | — | Manual? | Code settings won't catch it. Watch for it |
| **Total** | | **33** | **$2,000.20** | | | **The fix blocks 21 orders / $1,416.22** |

**`fir-` is first responder: confirmed.** All three `fir-` codes on bundle orders resolve to the parent discount
"Responder (do not delete or modify)" *(Shopify `codeDiscountNodeByCode`)*. So they're exempt.

---

## Step 2 · Everything else that can reach bundles today

**363 active codes** exist (Shopify, two pages read in full). About 330 apply to the entire order. Most are
one-off, single-customer codes that are already used. Work in this order:

### 2a · Reusable order-level codes that get used (recreate, or deactivate if dead)
| Code | Uses | Note |
|---|---|---|
| `TEXT25` | 411 | $25 off, min $125. Likely SMS (Biljana) |
| `HIGH5` | 250 | 5% off. Likely Biljana |
| `COOK25` | 160 | $25 off, min $125. Owner not on record |
| `WELCOME5` | 28 | 5% off. Likely Biljana |
| `REVIEW2521` | 26 | $25 off. Review reward? Not on record |
| `ADD1MORE` · `Affiliate5OFF` · `VIP5OFF` | 15 · 7 · 6 | 5% off |
| `CART25` · `FIRSTR10OFF` · `FB25` · `HEAT25` · `INC2521` · `INC1021` · `5OFF323` · `Flores202610` · `BBQVIP` · `SHIP45` | 1–3 each | Low use |
| **Bulk sets** (one parent, many codes): `HIGH10 (2024-07-24 07:43)` 1,600 codes · `HIGH5 (2024-07-24 07:41)` 1,700 · `COMEBACK5 (2023-09-01 08:23)` 2,900 · `HIGH5 (2026-06-20 07:15)` | 37 · 16 · 3 · 0 | These look like email/SMS-issued sets → **likely Biljana.** Recreating means regenerating the set |
| Active but never used: `DELAYSHIPMARK` (20%) · `SHOPCART5` · `DC10` · `Frac10` · `JF2024` · `Italian2023` · `VIPREVIEW212` · `15OFFMBELL` · `PATM15` · `GAINES2026` · `Bugzz175` · `Brobst25` · `RRuiz10` · `JFLOR` | 0 | **Deactivate** unless someone still needs one |

### 2b · Collection-scoped product codes that contain bundles (edit "Applies to"; no recreating needed)
The collections below are shop-page collections. Platinum and Ultimate sit in `tailgater-tools`,
`powered-cookers`, `seafood-boiling-pots` and `crawfish-cookers`; Ultimate is also in "All Non Commercial
Products" *(Shopify product collections)*. **The new kits would land in them on day one:** the tailgate kit via
the `Tailgater` tag, the turkey kits via `Turkey`, and all three via "All Non Commercial Products".

| Code | Scope today | Uses | Action |
|---|---|---|---|
| `HPC10` | 10% off 15 collections, incl. the four above and All Non Commercial Products | 18 | Change "Applies to" → the eligible collection |
| `Stale30` | $30 off All Non Commercial Products, min $150, once per order | 20 | → eligible collection |
| `KLUD40` | **40% off** Seafood Boil Pots and Burners, no end date | 1 | **Deactivate** |
| `RC18OFF` | 18% off 2 collections, for one customer | 1 | Deactivate |
| `WAIT5` · `COOKAGAIN5` · `EXPAND5` · `COOK5` | 5% off 3–8 collections incl. Crawfish Cookers / Non Commercial | 0 | → eligible collection, or deactivate |
| `NICESPICE` | Buy 1 from Turkey Fryers / Boil Pots / Fry Pots / Steamer Pots, get 1 item free · 15 uses | 15 | The "get" item isn't readable through the connector. Open it in admin. **A turkey kit would count as the "buy" item.** Move the "buy" side to the eligible collection |
| `JODY15` | 15% off the 18 QT fryer variant only | 0 | It's scoped to a kit component. It shouldn't apply to a bundle line, **but that's untested.** Include it in Step 6 |

---

## Step 3 · How to recreate an order-level code (one at a time)

1. **Write down its settings:** value, minimum, "one use per customer", who can use it, end date, combinations (all "none" today).
2. **Choose how to keep the code name:**
   - **A. Same name.** Rename the old code (for example `HIGH10` → `HIGH10-OLD`), deactivate it, then create the
     new discount as `HIGH10`. ⚠️ **Usage history doesn't carry over.** Anyone who already used it can use it once
     more (406 past uses on `HIGH10`).
   - **B. New name** (for example `HIGH10B`). History stays clean, but whatever sends the code (Biljana's flows)
     has to switch to the new name.
   - **ROUX:** B for anything a flow sends; that's Biljana's choice. A for low-use codes that are Evan's own.
3. **Create:** Discounts → Create → **Amount off products** → the code → value → **Applies to: Specific
   collections → All Products - Eligible for Discounts.**
   - For fixed-dollar codes, **tick "Only apply discount once per order"**. Otherwise $25 comes off *each* item.
   - Keep the minimum, "one use per customer", end date and **Combinations: none.**
4. **Deactivate the old one. Don't delete it** unless you're freeing the name (option A). Deleting is permanent.

---

## Step 4 · Fix the generators, not just today's codes

| Generator | What it makes | Owner | Action |
|---|---|---|---|
| **Facebook & Instagram app** (Shopify event log) | `FB-EMAIL-…` and `IG-EMAIL-…` · 5% off entire order · one per subscriber · ~40 active | **Evan** (Meta channel) | Check whether the channel's email-signup offer can be limited to a collection. If it can't, turning it off or accepting a 5% stack is Jay's call |
| **UpPromote** | `UPPROMOTE_CUSTOMER_REFERRAL` · 10% off entire order | Pete's lane (affiliate app) | Limit it in the app's referral settings if possible |
| Unknown app | 12-character codes like `714d364aa63f` ("$X off entire order", since 2024) and `XXXX-XXXX-XXXX` codes ("$10 off, for <name>", 2026) | Not on record. Shopify keeps discount events for a year, and none came back | **Find the app in admin.** A rewards-points program is live (`what-we-sell.md`); it may be the source |
| Email / SMS platform | Signup and win-back sets (see 2a) | **Biljana** | She changes her codes |

---

## Step 5 · The exception: military and first responder (no change)

- **Leave both parent discounts exactly as they are.** They stay "entire order", so they keep working on bundles.
  They combine with no other code, so a customer can't stack another code on top.
- **The money check** *(derived: 5% off the kit price, landed cost from Shopify, v3 variable assumptions)*:

| Bundle | Net after 5% | Gross profit | Contribution before ads | Incremental ceiling | Per-order ceiling (Jay's method) |
|---|---|---|---|---|---|
| Tailgate kit ($465) | $441.75 | $205.37 | $184.84 (41.8%) | $96.49 | −$1.00 |
| Turkey kit 30 QT ($469) | $445.55 | $196.41 | $175.73 (39.4%) | $86.62 | −$10.87 |
| Turkey kit 60 QT ($519) | $493.05 | $229.43 | $206.90 (42.0%) | $108.29 | +$10.80 |
| Platinum 80 / 120 QT (no valve) | $795.15 / $847.40 | $326.65 / $351.40 | $292.34 / $315.05 | $133.31 / $145.57 | +$35.82 / +$48.08 |
| Ultimate 80 / 120 QT (no valve) | $899.63 / $951.88 | $366.14 / $390.89 | $327.76 / $350.47 | $147.83 / $160.09 | +$50.34 / +$62.60 |

- **Pass: every bundle keeps positive contribution and a positive ad ceiling after the 5%.**
  - The tailgate and 30 QT kits dip just below the 20% target on Jay's per-order method for these buyers. They still add profit dollars.
  - Scale: 11 of 69 bundle orders this summer (16%).
- Boil Boss Combo and Ultimate Combo aren't in the table. They're accessory combos with no ad ceiling of their own.

---

## Step 6 · Prove it worked

1. **Checkout test, no order placed.** In a private window, add each bundle (Platinum, Ultimate, Boil Boss Combo,
   Ultimate Combo and the three kits once built) plus one ordinary item, such as the 20" skimmer.
   - Try `Welcome10`, each recreated code, `HPC10`, `Stale30` and `JODY15`.
   - **Pass:** the discount lands on the ordinary item only. Stop at the payment page.
2. **Military and Responder** can't be tested without a verified code. Their settings stay unchanged, and that's the check.
3. **Finn, weekly from the change:** every discount on a bundle line must trace to a `mil-` or `fir-` code.
   Anything else gets named and fixed. First read one week after the change.

---

## Found along the way (not the bundle rule; Evan's or Jay's call)
- **24 BM Digital codes: `BMdigUGC1`–`12` (100% off the entire order) and `BMdigFreeShip1`–`12`.** They're
  active with no end date. **Turn off** (Evan: they'll never be used again). They're listed in the inventory.
- **`RM40JAY` and `CWBSM40`: Jay's discretionary codes. Keep** (Evan).
  - The data doesn't contradict that: 40% off the entire order, never used, no customer or usage limit, no end date.
  - They do reach bundles. If Jay wants them to follow the bundle rule, they have to be recreated as product discounts.
- `HOMEDEPOT80` ($210 off) and `JayTestCode`: see their rows in the inventory.

## New from the full inventory (2026-09-11)
*Source: every discount in Shopify, read-only, all 10 pages, code and automatic. Last-used dates come from Shopify order search by code, checked with a fake-code control.*
- **2,307 discounts in total: 378 active, 1,929 expired, none scheduled. 15 are automatic.** 339 of the active ones reach bundles today.
- **13 automatic discounts from the AMP app:**
  - 12 "AMP Bundles Discount" entries, never used.
  - 1 "AMP Upsell Discount" (Post Purchase Upsell by AMP) with 39 uses.
  - Automatic discounts don't need a code, so the code fix doesn't touch them.
  - **Ask Jay whether the app stays.** It's a second bundle system running next to Shopify's own bundles.
- **168 machine-generated dollar codes** (12-character like `714d364aa63f`, or `XXXX-XXXX-XXXX`):
  - **102 already redeemed:** turn off.
  - **66 unredeemed, worth $2,725 in total** (largest $516). These may be customers' credits or rewards.
  - **Don't turn off the 66 until the generating app is known.**
- **Twelve 10%+ whole-order codes that anyone holding the code can use** (no customer limit, no usage limit).
  That runs against "no sitewide % before November": `HIGH10`, `BOIL10`, `JAY10`, `DC10`, `Frac10`, `FIRSTR10OFF`,
  `INC1021` (min $600), `Flores202610`, `HowSlow10`, `MENDIETA13`, `GAINES2026`, `UPPROMOTE_CUSTOMER_REFERRAL`.
  `HIGH10` is Biljana's to decide.
- **Worth Jay's eye:**
  - `FANDF`: 16% for a friends-and-family segment, last used Sep 1.
  - `HPCWS`: 23%, dealer-style, untouched since 2021.
  - `USATHANKS`: 5% for a VETERAN segment. Does the military exception cover it?
- **`HIGH15` is still live** though `what-we-sell.md` calls the $15 email code retired.
- **The 7 draft bundle orders at 100% off were influencer seeding** (Jay). No action. Draft orders don't use codes and sit outside every count here.

## Jay's answers (2026-09-14) — these settle the open rows above

| Question | Jay's answer | What changes |
|---|---|---|
| Does the **AMP app** stay? | **Keep it running** | No change. It's automatic (no code), so the code fix doesn't touch it. Still count it in any bundle-margin check |
| **`USATHANKS`** — does the military exception cover it? | **Yes. It is one of our military discounts. Keep it** | ⚠️ **Reverses the 2026-09-11 "delete `USATHANKS`" decision.** Do not delete. Treat it like `mil-`/`fir-`: exempt from the bundle rule |
| **`HPCWS`** (23%, dealer-style, since 2021) | **Old code, not in use. Leave it as is** | No action. Not worth deleting |
| **`FANDF`** (16%, friends and family) | **Keep. It's the live friends-and-family code** | No action on the code itself. It's a whole-order code, so it currently reaches bundles — flag if that matters to Jay |

✅ **Resolved 2026-09-14: `RM40JAY` and `CWBSM40` are deleted.** Jay confirmed they are old codes and can go. This
supersedes the "keep" in the approval block at the top of this doc and in "Found along the way" below — **delete
wins.** Evan's click in Shopify, and it is permanent.

✅ **`FANDF` stays as-is** (Jay, 2026-09-14), whole-order type included. It can reach a bundle line and that is
accepted. Do not recreate it as a product discount.

→ [bundle plan](2026-09-11-tailgate-thanksgiving-bundles-plan.md) · [Jay one-pager](2026-09-11-bundles-for-jay.md)
