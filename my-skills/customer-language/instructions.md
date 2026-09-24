---
name: customer-language
description: Monthly pull of HPC's reviews.io reviews into a verbatim swipe file of customer phrases, grouped by theme, so Maya and Sage write in customers' own words. Use when you hear "customer language", "mine the reviews", "reviews.io swipe file", "what are customers saying", or "/customer-language".
---

# Customer language (monthly swipe file)

**Owner:** Scout. **Approved:** Evan, 2026-09-24 (proposals.json `p-2026-09-24-review-language`). **Schedule:** monthly, and ROUX owns the schedule. Don't create a scheduled task from inside this skill.

## What it produces

A new file for each run: `my-files (knowledge)/hpc-reference/customer-language/YYYY-MM-customer-language.md`. It holds:
- a **Top 10 lines to use** list at the top
- verbatim phrases grouped by theme, with product, star rating, date and reviews.io feed ID on every line
- a guardrails section, a **do-not-use** section (any review naming a competitor or retailer), a not-for-copy section, and **what could not be read**

It also updates `my-files (knowledge)/hpc-reference/customer-language/README.md`: move the "Latest" link and add a row to the table.

## What it reads

1. `my-business (context)/hpc-standing-rules.md`: the copy non-negotiables (Tunnel Tubes are in the pot, warranty qualifiers, never name a competitor, no Made-in-USA claim)
2. `my-files (knowledge)/hpc-reference/customer-language/README.md` and the latest monthly file, so lines already on file are marked, not re-announced
3. `my-files (knowledge)/hpc-reference/competitors.md`, for the names to screen out
4. **The public reviews.io feed for store `hp-cookers`.** No login and no key are needed. It's read-only.

## Steps

### 1. Pull the feed
Save the raw data to the session scratchpad, never into the brain.
```
https://api.reviews.io/timeline/data?store=hp-cookers&sort=date_desc&per_page=100&page=N
```
- Loop N = 1, 2, 3… until a page comes back with an empty `timeline`. Each item's `_source` has `author`, `rating`, `comments`, `product_name`, `sku`, `date_created` and `type` (`product_review` or `store_review`). The item's `_id` is the feed ID used for citations.
- Check `stats.review_count` on page 1 against the number of items you collected, and record both.
- Company reviews can be cross-checked at `https://api.reviews.io/merchant/reviews?store=hp-cookers&per_page=5&page=N` (pages start at 0).
- The public page https://www.reviews.io/company-reviews/store/hp-cookers is the human-readable source to cite.

**If any call fails, is blocked, or returns an error or an empty first page, say so plainly in the file and in the reply.** Never write "no new reviews" when the feed could not be read.

### 2. Cut the window
- **Monthly run:** reviews with `date_created` in the previous calendar month, tagged **[new]**. The first run (2026-09) used the last 90 days, tagged [90d].
- Count what's in the window: total, how many have text, and stars by level.
- If the window has too few text reviews to fill the themes (under about 15), top up from older reviews. Tag every older line **[BC]** (back catalog), and never pass one off as new. Before using a [BC] line, check it isn't already in an earlier monthly file.

### 3. Sort by theme
Themes (keep these headings every month so the files line up):
1. Speed and boil time
2. Crowd size
3. Compared with their old pot
4. Build and quality
5. Ease and cleanup
6. Gifts and occasions
7. Service
8. Bonus themes as they come up (for example, propane as the answer to price)

A keyword pass (minute, fast, recover · sack, crowd, family, event · old pot, used to, compared · thick, heavy, built, weld · drain, clean, easy · gift, Christmas, Father's Day · service, called, replaced, Jay) finds candidates. **Then read each review in full.** The feed's product label is sometimes wrong, so match the quote to the product from the text itself.

### 4. Write each line
```
> "exact words, typos kept"
> Name, Product, ★N, YYYY-MM-DD [new|BC] · feed_id
```
- Verbatim only. Trim with "…" and never reword. First names as given.
- Add a short italic note when a line needs a caution (commercial only, a quote that runs past our own claim, and so on).

### 5. Screen before anything goes in a use section
- **Competitor or retailer named?** Move it to **Do NOT use in copy**. A clean fragment may stay in a use section only if that section says the full review names a brand.
- **Credits the burner for the speed?** Fine as sound and feel. Never use it as the reason it's fast. The technology is in the pot.
- **Time faster than our claim** (under about 6 minutes, or "a minute")? Leave it out. Slower times only go next to the product they were measured on.
- **Made-in-USA hints** (flags, "American made")? Keep them away from origin copy.
- **Warranty:** never pair a quote with a warranty term. No 5-year claim near steamer or commercial lines.
- **Turkey over 12 lb:** quote the heat-up part only.
- **Specific-savings testimonials** (for example "$700 a month"): commercial only, and they need "results vary".
- **Email or SMS complaints** (signup offers, texts): not for copy. Flag them for Evan to pass to Biljana. Don't act on them.

### 6. Pick the Top 10
Short lines that need no set-up and pass step 5. Favor the newest [new] lines, and cover at least four different themes. Flag seasonal lines: June–October carry more weight under the year-round mandate, and fryer and turkey lines matter most from October to November.

### 7. Write "what could not be read"
Photos and videos not viewed · stars taken from the feed rather than product pages · any count that doesn't match the last run, marked unconfirmed · any failed calls.

### 8. Save and index
- Save `YYYY-MM-customer-language.md` to `my-files (knowledge)/hpc-reference/customer-language/`.
- Update that folder's `README.md`: the "Latest" link, plus a new row with month, window and reviews read.
- Never edit or delete an earlier month's file.

## Reply to ROUX
Keep it short: reviews read (in the window and in total), the date range, the file path, the top 3 lines, anything that could not be read, and any not-for-copy flags (Biljana items, product fixes customers asked for).

> **Next:** Maya / Sage. The new file is linked from the README.
