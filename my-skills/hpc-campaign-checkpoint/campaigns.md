# Campaigns and their checkpoint terms

Part of the `hpc-campaign-checkpoint` skill. **Read first, update last.** One row per live
Meta campaign. The decision rule is written **before** the window starts and is quoted, not
rewritten, at the checkpoint. Figures carry their source and date. IDs are filled in by Finn
on the first pull and never typed from memory.

Account: HP Cookers ADs `4392736013287`. Attribution window: whatever the ad set reports
in `attribution_setting` — write it in the checkpoint, do not assume 7-day click.

---

## Live

### IW Lookalike 1% — Cold Prospecting — Sept 2026

| | |
|---|---|
| Campaign name | `IW Lookalike 1% - Cold Prospecting - Sept 2026` *(board, 2026-09-16)* |
| Ad set | `IW LAL 1% - Cold Prospecting` *(board)* — Finn: confirm whether the live name is the `- excl. retargeting, purchasers, dealers` build variant (`2026-09-09-finish-the-IW-draft.md`) |
| Ads | `hpc-dark-evergreen` · `120qt-performance_rolling-boil` · `120qt-crowd-math` *(board)* |
| IDs | campaign `52507989521191` · ad set `52507989521391` (`IW LAL 1% - Cold Prospecting`, the live name — not the "excl." build variant) · ads `hpc-dark-evergreen` `52508008680591` · `120qt-performance_rolling-boil` `52508008680391` · `120qt-crowd-math` `52507989521591` · creatives `2482806828877069` · `2117253225836825` · `3682355555262671` *(Finn, Meta connector `ads_get_ad_entities` name filter then `object_ids`, 2026-09-18)* |
| Live since | Fri 2026-09-11 *(decisions.md)* |
| Budget | $100/day CBO *(board)* |
| UTM tags | `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}` set on all three ads *(2026-09-10-iw-tracking-tags.md)*. Tags arrive in Shopify with **no `(DRAFT)` suffix**; `utm_medium` arrives as both `paid_social` and `paid` (why: untested) *(Finn, Shopify sessions Sept 11–16, 2026-09-17-month-plan-baseline.md §3)* |
| ⚠️ Tag blind spot | **`hpc-dark-evergreen`'s UTMs never arrive in Shopify.** 127 Meta landing-page views, 0 tagged sessions Sept 11–16 — no session carries its ad name, ad ID or an IW campaign name with it. The two 120 QT ads' tags **do** arrive (65 sessions vs 57 LPVs) *(Finn, 2026-09-17, baseline §3, tested)*. It took nearly all spend since Sept 15 *(board)*, so **a 0 in Shopify-matched orders for IW cannot include orders from that ad** — the report must say so. Its destination is probably `/products/18-qt-fish-fryer` (untagged FB sessions there rose 7.5 → 17/day) — **unconfirmed**; check the Ads Manager Review tab, not the edit panel |
| Products in the ads | 120 QT Performance pot (rolling-boil), 120 QT Powered (crowd-math), general brand (dark-evergreen). Ceiling by the product the matched orders actually contain |
| Ceilings that apply | Incremental rule, `2026-09-10-overhead-method-options.md`: **120 QT Powered $195.34** Jun–Aug basis / $165.64 12-mo (gate on Meta's count $78.14 / $66.26) · **Performance pots $189.23** / $183.14 (gate $75.69 / $73.25) · **18 QT** $99.55 / $73.86 / $73.39 (gate $39.82 / $29.54 / $29.36) if an 18 QT turns up |

**Decision rule, agreed in advance** *(Beau, accepted by Evan 2026-09-14, decisions.md)*:

> Hold at 3 days / $300 in Learning. Re-check at **Day 7 / ~$700 spend, or on Learning exit,
> whichever first.** At that point, **if Shopify-matched orders are still 0 and spend has
> passed the $73/real-order ceiling, that becomes a real cut conversation.** Do not touch
> spend before then.

**Bundled actions for the Sept 18 checkpoint** *(decisions.md 2026-09-15, board 2026-09-16)*:
1. The approved creative refresh for all three ads (bigger wording, "4mm aluminum" fix on
   `hpc-dark-evergreen`, real headline on crowd-math) is staged in
   `my-skills/hpc-ad-creative/work/creative/library/` — swap it in at this checkpoint, not
   before, so Learning is disturbed once. Evan's click.
2. Open question for Beau: `hpc-dark-evergreen` took 60% of spend and 62% of impressions in
   the first 3 days. Floor for the two 120 QT ads, their own ad set, or leave it.

**Standing constraints:** Coalition and IntentWave are read-only advisors — no setting or
attribution changes during the test *(board)*. $350/day account ceiling holds *(board)*.

| Checkpoint | Spend · days | Meta purchases | Shopify tagged · net | Learning | Call | Decision |
|---|---|---|---|---|---|---|
| 2026-09-14, first read | $299.94 · 3 | 1 | 0 · $0 | In Learning, 1 conversion toward exit | **Hold**, do not cut, do not touch spend *(Beau)* | Hold *(Evan, 2026-09-14)* |
| **2026-09-18, Day 7** | $682.55 · 7 | 2 ($341.28 each) | 0 · $0 (dark-evergreen, 79.5% of spend, unmatchable) | Learning, 2 conversions | **Continue.** Cut the ad, not the campaign *(Beau)* | dark-evergreen paused (ROUX, on Evan's yes) + 120 QT creative swapped (Evan) · $100/day · **next read Fri Oct 2 on PLAN.md terms** *(Evan, 2026-09-18)* |

Ad split at the first read *(Meta connector, 2026-09-14)*: `hpc-dark-evergreen` $179.69 ·
`120qt-performance_rolling-boil` $70.47 · `120qt-crowd-math` $49.78. CPM $21.16 · CPC $0.97 ·
CTR 2.17% · 14,176 impressions · 308 clicks.

---

### BPM_TOF_Manual

| | |
|---|---|
| Budget | $164/day *(board)*; Jay's +25% not applied *(board)* |
| UTM tags | **Yes, ID-based.** Sessions and orders arrive tagged `utm_source=facebook · utm_medium=paid · utm_campaign=<campaign ID> (6772105419387) · utm_content=<ad ID>`, seen on 7 BPM ad IDs; 10 Sept 1–16 orders match BPM's ID *(Finn, Shopify sessions + orders, 2026-09-17-month-plan-baseline.md §3)*. Matched by **ID, not name** — use step 3's match rule 4. *Corrects the 2026-09-10 entry "None — empty URL-parameters field" (Finn, Ads Manager): both can be true if the parameters sit in the website URL or are added by a template or Shopify's Facebook channel; which mechanism is untested.* |
| Decision rule | **None agreed.** A checkpoint can include Shopify-matched orders by ad ID *(tags confirmed 2026-09-17, above)* |
| Ceilings that apply | Incremental rule, per product the ad sells: **30 QT Powered $105.06** Jun–Aug order mean / **$95.58** one $462.50 kit, the only in-stock variant (gate on Meta's count $42.02 / $38.23; no-sale kill $315.18 at 3×, $210.12 at 2×) *(Beau, [30qt-cac-ceiling](../../my-work%20(outputs)/internal/reports/2026-09-24-30qt-cac-ceiling-beau.md), 2026-09-24)* · 18 QT $73–$100 · collection video: break-even kill $128.09. `Video_Jay 30qt (turkey) Fryer Demo` `6810865162787` is taggable (lands on the 30 QT Turkey Fryer page); `IMG_Heavy Duty Heat.30qt` `6845666149587` has no sessions under its own ID, so it is read on Meta's count alone *(Beau, ShopifyQL sessions Sept 1–24)* |
| Last read | Sept 11–14: $557.09 spend *(Finn, 2026-09-14)*. Best ad `Video_Jay 30qt Demo` $19.41 CPP (13), `Video_Jay 18qt Demo` $43.04 (30) *(board)* |

### 18qt-TOF-Prospecting

| | |
|---|---|
| Budget | $50/day CBO *(board)* |
| UTM tags | **Partly.** `18qt-004` arrives with the same ID-based tags as BPM; `18qt-001`–`003` are not seen under their ad IDs, but sessions with this campaign's ID and `utm_content=Facebook_UA` do arrive *(Finn, Shopify sessions Sept 11–16, 2026-09-17-month-plan-baseline.md §3)*. *Updates "None on `18qt-001`" (Finn, 2026-09-10).* Match by campaign ID, rule 4 |
| Decision rule | The ladder gates, `2026-09-10-overhead-method-options.md`: **trailing-7 Meta CPP ≤ $30, frequency ≤ 2.5, +≤20% every 3 days, top out at $86/day.** At $40.56 (30 days to Sep 8) it does not pass, so it stays at $50 *(board)*. Sale-week CPP ($20.09, Sep 1–7) does not count |
| Last read | Sept 11–14: $167.79 *(Finn, 2026-09-14)*. Learning limited *(board)* |

---

## Planned, not live

**Retargeting — Site Visitors 30D — Sept 2026.** Plan approved, launch held *(Evan,
2026-09-11)*. When it goes live: two ad sets, $20/day pots + $10/day 18 QT; "working" for the
18 QT set = ≤ $30 CPP; the IW audience stays out; measurement method in
`my-work (outputs)/content/ads/2026-09-retargeting/2026-09-11-retargeting-plan.md` §10
(same UTM string, same match rule). ⚠️ The 30D pool is padded by the Aug 28 bot-like spike
until ~Sept 27. Add a row here on launch day with the rule quoted from the plan.

---

## Closed

*None yet.* A cut campaign moves here with its final one line and the decision entry's date.
