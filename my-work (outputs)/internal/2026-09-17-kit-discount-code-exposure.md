# Which discount codes could still be used on a kit

**Read 2026-09-17, Shopify GraphQL, active codes only.** Written after Jay's call to put ~6% into the kit price (decisions, 2026-09-17), which makes code stacking a margin question.

**The mechanic:** Shopify has no "no codes on this product" switch. A code either applies to all items, or to named products/collections. A code set to **all items** will discount a kit sitting in the cart. The guard is the code, not the kit. `Sale-NoDiscount` on the kit is a label whose enforcement has never been tested.

**Confirmed good news:** the eligible-discounts collection does exclude tag `Bundle` (Evan, 2026-09-17), so every code scoped to that collection is already safe. Only one automatic discount exists in the store and it is **expired**, so nothing applies automatically today.

**Confirmed bad news:** of the 70 active codes read, all but three are set to **all items**. The three scoped ones are `Stale30`, `KLUD40` and two product-scoped one-offs (`RYORK`, `DON50OFF`).

## Fix in this order

| # | Code(s) | Why it matters | Owner |
|---|---|---|---|
| 1 | `HIGH15` | Live, all items, email/SMS flow code — the highest-volume way a customer gets a code. Biljana is switching her flows to `HIGH15B`; a few more days as of 2026-09-17 | Biljana → Evan deactivates |
| 2 | `SMS25` | Biljana has switched her flow (2026-09-17). Deactivate it now | Evan |
| 3 | `HPC10` | Repointed 2026-09-15 to the eligible-discounts collection — **re-verify it stuck** | Evan |
| 4 | Signup / cart style: `FIRSTR10OFF` · `REPEAT5` · `SHOPCART5` · `CART25` | All items. Anyone can land one | Evan |
| 5 | Review and VIP style: `REVIEW2521` · `VIPREVIEW212` · `INC2521` · `INC1021` · `5OFFVIP` · `BBQVIP` · `SK25OFF` · `HEAT25` · `COOK25` · `FB25` · `grillchill23` | All items, and handed out in bulk | Evan |
| 6 | **influence.io reward codes** — the 12-character hex ones (`26ae98412711`, `d5061dee5a45`, `85048f83f062`, and dozens more) | All items, one-time dollar rewards, issued automatically by the rewards app. **Shopify-side scoping won't hold** — the app regenerates them. The fix, if there is one, is in the influence.io app settings | Evan, in influence.io |

**Leave alone:** `Military` and `Responder` (do not delete or modify), `USATHANKS`, `FANDF`, `SPROM` — exempt by design. Personal one-offs (`TAYLOR100`, `KURT200`, `CMANN350`, `Butler250`, `nard150`, `JAY10`, and the rest) are handed to a named person; a kit purchase with one is a one-time cost, not a leak.

## Test before the kits go live
A kit plus one ordinary item in the cart. Try `FIRSTR10OFF` and one influence.io reward code. The discount must land on the ordinary item only. If it lands on the kit, the kit's 6% is being stacked and the code needs scoping.
