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
| IDs | campaign — · ad set — · ads — **not on file; record on the Sept 18 pull** |
| Live since | Fri 2026-09-11 *(decisions.md)* |
| Budget | $100/day CBO *(board)* |
| UTM tags | `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}` on all three ads *(2026-09-10-iw-tracking-tags.md)*. ⚠️ Whether the campaign was renamed before publish, so the tag carries no `(DRAFT)` suffix, is **not confirmed on file** — step 3's match rule 2 covers it either way |
| Products in the ads | 120 QT Performance pot (rolling-boil), 120 QT Powered (crowd-math), general brand (dark-evergreen). Ceiling by the product the matched orders actually contain |
| Ceilings that apply | Incremental rule, `2026-09-10-overhead-method-options.md`: **120 QT Powered $195.34** Jun–Aug basis / $165.64 12-mo (gate on Meta's count $78.14 / $66.26) · **Performance pots $189.23** / $183.14 (gate $75.69 / $73.25) · **18 QT** $99.55 / $73.86 / $73.39 (gate $39.82 / $29.54 / $29.36) if an 18 QT turns up |

**Decision rule, agreed in advance** *(ROUX, accepted by Evan 2026-09-14, decisions.md)*:

> Hold at 3 days / $300 in Learning. Re-check at **Day 7 / ~$700 spend, or on Learning exit,
> whichever first.** At that point, **if Shopify-matched orders are still 0 and spend has
> passed the $73/real-order ceiling, that becomes a real cut conversation.** Do not touch
> spend before then.

**Bundled actions for the Sept 18 checkpoint** *(decisions.md 2026-09-15, board 2026-09-16)*:
1. The approved creative refresh for all three ads (bigger wording, "4mm aluminum" fix on
   `hpc-dark-evergreen`, real headline on crowd-math) is staged in
   `my-skills/hpc-ad-creative/work/creative/library/` — swap it in at this checkpoint, not
   before, so Learning is disturbed once. Evan's click.
2. Open question for ROUX: `hpc-dark-evergreen` took 60% of spend and 62% of impressions in
   the first 3 days. Floor for the two 120 QT ads, their own ad set, or leave it.

**Standing constraints:** Coalition and IntentWave are read-only advisors — no setting or
attribution changes during the test *(board)*. $350/day account ceiling holds *(board)*.

| Checkpoint | Spend · days | Meta purchases | Shopify tagged · net | Learning | Call | Decision |
|---|---|---|---|---|---|---|
| 2026-09-14, first read | $299.94 · 3 | 1 | 0 · $0 | In Learning, 1 conversion toward exit | **Hold**, do not cut, do not touch spend *(ROUX)* | Hold *(Evan, 2026-09-14)* |
| **2026-09-18, Day 7** | | | | | | *pending* |

Ad split at the first read *(Meta connector, 2026-09-14)*: `hpc-dark-evergreen` $179.69 ·
`120qt-performance_rolling-boil` $70.47 · `120qt-crowd-math` $49.78. CPM $21.16 · CPC $0.97 ·
CTR 2.17% · 14,176 impressions · 308 clicks.

---

### BPM_TOF_Manual

| | |
|---|---|
| Budget | $164/day *(board)*; Jay's +25% not applied *(board)* |
| UTM tags | **None.** Ads carry an empty URL-parameters field *(Finn, Ads Manager, 2026-09-10)*; orders cannot be matched to it by name. Tagging a live ad sends it back through review — Evan's call, not made |
| Decision rule | **None agreed.** A checkpoint on this campaign is a Meta-only read until it is tagged, and the report must say so |
| Last read | Sept 11–14: $557.09 spend *(Finn, 2026-09-14)*. Best ad `Video_Jay 30qt Demo` $19.41 CPP (13), `Video_Jay 18qt Demo` $43.04 (30) *(board)* |

### 18qt-TOF-Prospecting

| | |
|---|---|
| Budget | $50/day CBO *(board)* |
| UTM tags | **None** on `18qt-001` *(Finn, 2026-09-10)* |
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
