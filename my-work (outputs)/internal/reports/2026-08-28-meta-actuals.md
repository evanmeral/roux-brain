# Meta Actuals — from Evan's CSV exports
**Read 2026-08-28 from `my-work (outputs)/internal/reports/raw/`. Meta's own platform data — no Venon, no browser screenshots.**
Two periods, split at the **2026-07-12** vendor handover.

---

## Post-handover — Jul 12 to Aug 28, 2026 (48 days)
> ⚠️ **Window starts Jul 12, but BM Digital was fired Jul 20** (Evan, 2026-09-01). This measurement therefore includes **8 days of BM Digital spend** in the "in-house" period. Treat the in-house figures as slightly contaminated until re-pulled from 2026-07-20.


| Campaign | Delivery | Spend | Purch | **CPP** | Value | ROAS | Freq | CPM |
|---|---|---|---|---|---|---|---|---|
| **BPM_TOF_Manual** | active | $9,184 | 164 | **$56.00** | $69,798 | 7.60 | 5.20 | $13.16 |
| **18qt-TOF-Prospecting** | active | $1,084 | 15 | **$72.24** | $6,774 | 6.25 | 2.96 | $23.72 |
| BM \| ASC+ \| CBO \| Creative Testing | inactive | $1,051 | 2 | $525.34 | $1,648 | 1.57 | 4.04 | $10.48 |
| **TOTAL** | | **$11,318** | **181** | **$62.53** | **$78,221** | **6.91** | | |

**$236/day.**

## BM Digital era — Jan 1 to Jul 11, 2026 (192 days)

| Campaign | Spend | Purch | **CPP** | Value | ROAS |
|---|---|---|---|---|---|
| **BPM_TOF_Manual** | $66,780 | 1,157 | **$57.72** | $731,990 | **10.96** |
| BM \| TOF \| ABO \| Creative Testing [Static] | $33,320 | 131 | $254.35 | $79,666 | 2.39 |
| BM \| TOF \| ABO \| Creative Testing [Video] | $27,560 | 163 | $169.08 | $90,129 | 3.27 |
| BM \| TOF \| ABO \| Open \| External Whitelisting | $19,316 | 153 | $126.25 | $99,345 | 5.14 |
| BM \| TOF \| ABO \| UGC | $19,264 | 103 | $187.03 | $62,473 | 3.24 |
| BM \| TOF \| CBO \| Internal Whitelisting | $14,902 | 128 | $116.42 | $76,454 | 5.13 |
| BM \| TOF \| ABO \| GUGC | $10,256 | 38 | $269.88 | $18,040 | 1.76 |
| BM \| ASC+ \| CBO \| Creative Testing | $5,961 | 20 | $298.04 | $12,465 | 2.09 |
| BM \| TOF \| HP Cookers \| ABO \| Offer Testing | $1,536 | 10 | $153.57 | $4,961 | 3.23 |
| **TOTAL** | **$198,895** | **1,903** | **$104.52** | **$1,175,524** | **5.91** |

**$1,036/day.**

---

# 🔴 FINDING 1 — the 18 QT campaign is over its ceiling

**`18qt-TOF-Prospecting` is running at $72.24 per purchase.**
Robert's method puts the 18 QT ceiling at **~$63** with a 20% overhead reserve.

**It's over by roughly $9 a sale — losing money once overhead is covered.**

This is the campaign ROUX recommended raising **first**, on the basis of a "$61.63 CPP against a $131
ceiling." Both halves of that were wrong: the ceiling was a break-even line (Robert's correction),
and the true CPP across the full period is $72.24, not $61.63.

> **Do not raise `18qt-TOF-Prospecting`.** It needs its cost per purchase brought down before it
> deserves more money — not more budget at a losing rate.
> Its CPM is also **$23.72, nearly double** BPM_TOF_Manual's $13.16, which is where the cost is coming from.

# 🟢 FINDING 2 — `BPM_TOF_Manual` is the efficient one

$56.00 CPP, 7.60 ROAS, 164 of the 181 purchases. **This is the campaign with any headroom**, and it's
where budget should go if it goes anywhere. Its mixed basket also means a single-product ceiling
doesn't bind — it needs a mix-weighted ceiling (see `2026-08-28-cac-model-v2.md`).

# 🔵 FINDING 3 — spend is down 77%, not 62%

| | Daily spend |
|---|---|
| Jan 1 – Jul 11 | **$1,036/day** |
| Jul 12 – Aug 28 | **$236/day** |

**Now running at 23% of the prior rate.** ROUX's earlier 62% figure came from a browser view that
only showed some campaigns — the CSV is authoritative. The opportunity is bigger than stated, but
Finding 1 means it isn't as simple as turning the dial up.

# 🟡 FINDING 4 — the ROAS drop is mostly basket size, not decay

`BPM_TOF_Manual` went 10.96 → 7.60 ROAS. But **cost per purchase barely moved ($57.72 → $56.00).**
What changed is what people bought:

| | Value per purchase |
|---|---|
| Jan – Jul 11 | **$632.66** |
| Jul 12 – Aug 28 | **$425.60** (−33%) |

That's the season, not the ads. Jan–Jul is crawfish season selling $500–800 cookers; Jul–Aug is
fryer season selling $220–340 fryers. **The campaign is acquiring customers just as efficiently — the
customers are simply buying cheaper products.**

Which is exactly why per-product ceilings matter: the same campaign at the same CPP is comfortably
profitable in April and marginal in August.

# ⚠️ FINDING 5 — audience saturation risk before any scaling
`BPM_TOF_Manual` frequency is **5.20** over 48 days. That's high for top-of-funnel. Raising budget
against a saturating audience buys more impressions to the same people at rising cost.
**Before scaling: widen the audience or add fresh creative** — which is what the Labor Day set is for.

# 🟠 FINDING 6 — a dead campaign burned $1,051 for 2 sales
`BM | ASC+ | CBO | Creative Testing` shows *inactive* but spent **$1,051 at $525.34 per purchase** in
the current period. Confirm it is fully off, not just paused at ad-set level.

---

# The BM Digital number, finally quantified properly

| | Spend | Purchases | CPP | ROAS |
|---|---|---|---|---|
| **BPM_TOF_Manual** (already in the account) | $66,780 | 1,157 | **$57.72** | **10.96** |
| **All `BM \|` campaigns** (agency-built) | **$132,115** | 746 | **$177.10** | **3.36** |

The agency spent **$132,115 at roughly a third of the efficiency** of the campaign that was already
running — **3.07× the cost per purchase.** Their best campaign (External Whitelisting, 5.14) never
matched the in-house workhorse; their worst (GUGC, 1.76) was below break-even at any margin.

ROUX's earlier estimate ($60,738 at 4.20 ROAS) understated it because the browser view showed only
part of the account.

---

# What this changes about the Labor Day ramp

| Earlier advice | Revised |
|---|---|
| Raise `18qt-TOF-Prospecting` first | ❌ **No.** It's over its ceiling. Fix CPP first. |
| Raise `BPM_TOF_Manual` +25%/step | ⚠️ Defensible, but frequency 5.20 says fresh creative before more budget |
| "45% headroom" | ❌ Withdrawn. Depends entirely on overhead, which is still unknown. |
| Break-even ROAS 2.4 | ⚠️ That's break-even *before overhead* — not a target |

**The Labor Day creative is now the most valuable thing in the plan** — not because of the discount,
but because new creative is what unlocks a saturated audience. Ship the creative; hold the budget
until the CAC ceilings are real.

## Still needed
- **Google monthly ad spend** — one number. Without it blended MER can't be computed. *(Parked by Evan; revisit.)*
- Landed BOM, monthly overhead, target margin — Jay's Excel sheet


---

## Related

[Board](../../../my-desk%20%28now%29/BOARD.md) · [metrics-and-goals](../../../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [paid-media](../../../my-workflows%20%28automations%29/playbooks/paid-media.md)
