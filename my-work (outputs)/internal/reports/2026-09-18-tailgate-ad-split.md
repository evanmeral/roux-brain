# Tailgate kit ad split: does it fit $50 + $10/day?

**2026-09-18 · Beau.** Meta connector reads only (HP Cookers ADs `4392736013287`), no writes.

**Call: yes to TOF with no pauses. For retargeting, C replaces `rt-18qt-fry-it-all`. It does not run next to it.**

## `18qt-TOF-Prospecting` `6998161993987`, $50/day CBO (Meta, read 2026-09-18)
One ad set, `18qt_prospecting`. 4 ads ACTIVE now. Adding A and B makes **6**.

| Ad | Last 7d spend | Meta purchases | Meta CPP | Freq | Last 14d CPP |
|---|---|---|---|---|---|
| 18qt-004 `6998222424787` | $261.06 | 2 | $130.53 | 1.40 | $69.08 |
| 18qt-001 `6998222425187` | $70.59 | 2 | $35.30 | 2.33 | $39.93 |
| 18qt-002 `6998222425387` | $18.96 | 0 | n/a | 1.45 | $33.63 |
| 18qt-003 `6998161995187` | $10.69 | 1 | $10.69 | 1.22 | $17.03 |

- 18qt-004 took about 72% of the last 7 days' spend ($261.06 of $361.30, derived).
- No kill line has fired. The PLAN.md 18 QT kill is last-14-day CPP > $189, and the highest is $69.08.
- **Why nothing gets paused:** 002 and 003 barely spend, so pausing them frees almost no budget. 004 is the only ad that would free real money, and it hasn't hit its kill line. Under the rule, ads go off only when they bleed money.
- **Starvation guard (my rule, not the plan's):** if A + B together have spent less than $50 by day 4 (Sept 29), pause 18qt-002 and 18qt-003. Those two had the lowest spend over the last 7 days. The Oct 1 check re-reads 004's last-7-day CPP.

## 18 QT retargeting, $10/day
- The retargeting plan already says the 18 QT set's "$10/day can't carry a second ad" (2026-09-11 plan, §5). C next to fry-it-all breaks that rule.
- **Day 4 won't give a read.** $10 × 4 days = $40 of spend (derived), so the "> $60 per purchase after 4 days" stop can't fire. Day 4 is a delivery check only.
- **Day 14 is thin:** $140 of spend (derived). That's enough for a go/no-go on tagged orders, not a win.
- **Swap C in for fry-it-all.** The audience already viewed the 18 QT, and the kit costs $404–$455 against $285–$340 for the 18 QT Powered alone (what-we-sell.md). The same spend chases a bigger order.
- Still open: `RT - Viewed 18 QT - 30D` isn't built, and every audience on pixel `1861969194014116` reads 20–20 (Finn, 2026-09-17). Check its size before launch. If it also reads 20–20, the day-14 read is unreliable.
