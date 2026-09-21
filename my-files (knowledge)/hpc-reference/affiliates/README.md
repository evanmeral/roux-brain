# Affiliates — the roster behind the Affiliates tab

**`affiliates.json` is the live store. ROUX OS writes it** (the Affiliates tab at `localhost:4242`).
Agents may read it freely. To change a record, prefer the page; if an agent must edit the file,
keep the field names below and set `updated_at` / `updated_by`.

⚠️ **Personal data.** It holds people's emails and phone numbers. It stays on this machine. Never
paste it into an outside tool. It is committed to this repo only because the repo has **no remote**
(checked 2026-09-21). **Before a remote is ever added, take this folder out of git history first.**
`backups/` is gitignored.

## Files

| File | Who writes it | What it is |
|---|---|---|
| `affiliates.json` | ROUX OS (Evan's edits) | One record per person. A list. |
| `sales-by-affiliate.json` | **Finn** (drop-in, optional) | Orders and net sales per affiliate. The OS only reads it and joins it by `affiliate_id` or name when the page renders, so a fresh read never touches Evan's edits. |
| `flags.json` | Whoever transcribes a Finn report (Nova, 2026-09-21) | Per-name **evidence**: flags with their fact and source, top referrer, returning customers, and the rate the "calc commission" column uses. Facts with counts, never verdicts. Kept out of `affiliates.json` on purpose, so evidence never mixes with Evan's edits. `NOT ON OUR LIST` is not stored: the page derives it from `uppromote` and `on_list`. |
| `uppromote-import.json` | ROUX OS, from the exports **Evan** made in UpPromote (.xlsx as UpPromote gives it, or CSV; imported by Evan's click) | Three kinds, column names from the real exports of 2026-09-21. **affiliates** (Affiliates export): name, email, sign-up date (`date_created`) and `signup_source`, status, program, coupon, socials, referral links, last login. **referrals** (Referrals export): affiliate, order (`order_name`), date, `tracking_by`, commission, `commission_adjustment`, status (Paid / Approved / Denied), total sales, `google_ads`, `affiliate_coupon`, `program_name`, `is_first_commission`. **approved_balance** (Payments > Approved export): per-affiliate approved balance (`total_amount`, negative = clawback). It has no status and no date, so it is **never counted as paid**; a summary file whose name lacks "approved" is refused unless the kind is picked by hand. Customer names and emails, phone, address, payment info, W-9 and internal notes are never kept. Only mapped columns are kept; the rest are listed as unmapped on the page. Tiles: **Paid out** = sum of referral `commission` where status is Paid; **Approved, not paid** = status Approved, with the approved balance and Denied shown beside it. No file behind a tile = "not read", never $0. The page also lists records an export matched that are not marked `uppromote: true`, for Evan to fix; it never edits them. An older import's `payments` kind is ignored. Does not exist until the first import. |
| `backups/` | ROUX OS | The last five versions of `affiliates.json` and the last three of the import, before each save. `.1` is the newest. Gitignored. |

## Sources of the seed (Pete, 2026-09-21, read-only)

- `~/Desktop/HPC/HPC_affiliates_Master_List.xlsx`: tab `Influencer Master List` (68 people), tab `Potential Outreach` (5).
- Shopify order tags `UpPromote_order <name>`, read 2026-09-21 (41 names, 37 of them not on the spreadsheet).
- UpPromote affiliates page, first screen only, read 2026-09-21 (6 sign-ups).
- 116 records. 43 are on UpPromote and not on the spreadsheet (37 by order tag + 6 by sign-up).

## Fields

| Field | Notes |
|---|---|
| `id`, `name` | `id` is a slug of the name and never changes. |
| `handle_instagram` · `handle_facebook` · `handle_tiktok` · `handle_youtube` · `other_links` | A handle or a full address. The page turns them into profile links. |
| `email` · `phone` · `city_state` | As written in the source, typos included (see Pete's notes on Sean Ward and Dominick Lee). |
| `status` | `active` · `idle` · `paused` · `ended` · `prospect`, or empty. **A fact.** `status_source` says who set it. |
| `status_suggested` · `status_basis` | **A suggestion from the seed, not a fact.** The page shows it as a suggestion with an Accept button. |
| `type` | `creator` · `affiliate` · `prospect` · `ugc` · `other`. Short form of `tier_or_type`, which keeps Pete's full wording. |
| `on_list` | `true` if the person is on Evan's spreadsheet. |
| `uppromote` | `true` / `false` / `null` (not known). |
| `code` | Empty for everyone: UpPromote uses one automatic discount, not per-person codes (Shopify read, 2026-09-21). |
| `commission` | `{value, source}`. 5% is the program-wide rate, not confirmed per person. |
| `product_gifted` | `{what, when, source}`. The sheet has no ship dates. |
| `platform_followers` | `{instagram, as_of, source}`. No date in the sheet; at least a month old. |
| `last_contact` · `next_step` · `notes` | Evan's working fields. "Log contact today" sets `last_contact`. |
| `sheet_already_affiliate` · `sheet_response` · `source` | Straight from the spreadsheet and the reads. |
| `orders_attributed` · `net_sales_attributed` · `sales_last_30d` | **Pete's seed read, hand-summed, unconfirmed.** Shown only until Finn's file lands, and labeled as such. Credited by order tag: attribution, not incremental revenue. |
| `archived` · `archived_at` | Nothing is deleted. Archive hides a record; "show archived" brings it back. |
| `updated_at` · `updated_by` | Stamped on every save from the page (`Evan (OS)`). |

## `sales-by-affiliate.json` (Finn)

```json
{ "read_at": "2026-09-21", "source": "ShopifyQL ..., Finn", "window": "2025-01-01 to 2026-09-21",
  "rows": [ { "affiliate_name": "Name as tagged", "orders": 28, "net_sales": 9597.66,
              "first_sale": "2025-03-02", "last_sale": "2026-08-14" } ] }
```

Optional per row: `affiliate_id` (matches `id`, wins over the name), `orders_30d`, `net_sales_30d`.
The OS shows these numbers as they are and never estimates one. It does two sums and one
multiplication, each labeled where it shows: the header tiles add up the rows of this file
("Credited by UpPromote", "On our list"); "Paid out" adds up the commission on referral rows with status Paid (UpPromote Referrals export), and "Approved, not paid" the rows with status Approved; and "Calc at 5%"
is net sales times the rate in `flags.json`, **labeled "not a payout" and never shown as one**. A row that matches
nobody, or matches two people, is listed on the page instead of being guessed at.

Related: [affiliates & influencers reference](../affiliates-influencers.md) · [how to use ROUX OS](../../how-to-use-roux-os.md)
