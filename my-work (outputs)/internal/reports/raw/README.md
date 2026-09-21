# Data drop folder

**Put exported CSVs here — not in the chat.**
Files in this folder are cheap for Beau to read, persist across sessions, and can be re-read later.
Chat attachments cost a lot of context and disappear when the session ends.

---

## Naming
`YYYY-MM-DD_<source>_<what>_<range>.csv`

Examples:
```
2026-08-28_meta_campaigns_2026-07-12_to_2026-08-28.csv
2026-08-28_meta_campaigns_2026-01-01_to_2026-07-11.csv
2026-09-09_meta_campaigns_2026-09-01_to_2026-09-08.csv
```

If the export lands with Meta's own filename, that's fine — just drop it in and say so. Beau will
rename it.

---

## What Beau wants from Meta

### Export 1 — the one that matters most
- **Date range: Jul 12 – Aug 28, 2026** (everything since the vendor handover)
- **Level: Campaign**
- **Breakdown: by Day** if the option is there. If not, no breakdown is fine.

### Export 2 — the comparison, only if it's easy
- **Date range: Jan 1 – Jul 11, 2026** (the BM Digital era)
- **Level: Campaign**
- **No daily breakdown needed**

### Columns
Whatever is on screen is what exports, so before hitting Export make sure these are visible:
`Campaign name · Amount spent · Impressions · Reach · Frequency · Link clicks · CTR · CPM ·
Purchases · Cost per purchase · Purchase conversion value · Purchase ROAS`

The **ROAS reporting** view in Ads Manager already has most of these.

### How
Ads Manager → set the date range → **Reports ▾ → Export** (or the ⬇ download icon) → *Export table data* → CSV.

---

## Google Ads
**Not needed as an export — that's Coalition's lane.**

The only thing Beau needs is **total Google ad spend per month**, one number, so blended MER is
correct. Without it, MER is calculated against Meta spend alone and overstates efficiency.
Evan can relay it from Coalition's reporting. Add it to `my-files (knowledge)/hpc-reference/metrics-and-goals.md` when known.

---

## Other useful drops (any time)
| File | Why |
|---|---|
| Shopify → Analytics → Reports → **Sales by product**, 12 months | Product mix without a browser session |
| Shopify → **Discounts** export during/after a promo | Redemptions per code |
| reviews.io export | More customer verbatims for the copy file |
