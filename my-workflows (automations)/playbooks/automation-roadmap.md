# Automation Roadmap

**Goal:** move from *"Evan asks ROUX for something"* → *"ROUX runs it on a schedule and hands Evan a
decision."* Evan's time should go to judgment calls, not to production.

---

## Phase 0 — Where we are (Aug 2026)
- ROUX has full read/write on `Atlas AI Brain/`
- Context files built ✅
- Two custom skills exist: `hpc-landing-page`, `hpc-scoreboard-report`
- **No live data connections.** Everything is manual input.

---

## Phase 1 — Connect the pipes (next 2 weeks)
*This is the unlock. Nothing downstream works without it.*

| Connector | Status | What it enables |
|---|---|---|
| Klaviyo | Needs auth | Flow/campaign performance, list health, automated email drafting against real segments |
| Google Analytics | Needs auth | Site behavior, CVR, traffic sources |
| Ahrefs | Needs auth | Automated SEO monitoring, keyword tracking, competitor gaps |
| Slack | Needs auth | ROUX posts reports/alerts to a channel |
| Canva | Needs auth | Generate on-brand creative from templates |
| Google Drive / Gmail / Calendar | Available | Doc storage, campaign scheduling, approvals |

**How:** authorize in claude.ai connector settings (this session can't run OAuth).
**Also needed:** Shopify + Meta Ads + Google Ads access. If no direct connector, set up a recurring
manual export into `my-work (outputs)/internal/reports/raw/` — even weekly CSVs beat nothing.

**Deliverable at end of Phase 1:** ROUX can answer "how did we do last week?" without Evan touching a dashboard.

---

## Phase 2 — Scheduled reporting (weeks 3–4)
Use the `schedule` skill / scheduled tasks.

| Job | Cadence | Output |
|---|---|---|
| Weekly scoreboard | Mon 7:30a CT | CAC/ROAS by channel + 1 recommendation |
| Creative performance digest | Wed | Winners/losers + 3 new concepts briefed |
| Email flow health | Thu | Flow revenue, drop-offs, one fix |
| Monthly review | 1st Monday | Full performance report + next-month plan |
| Competitor watch | Monthly | New ads in Meta Ad Library, pricing changes |
| Seasonal trigger alerts | Rolling | "Lent starts in 6 weeks — fryer campaign due" |

**Deliverable:** Evan opens his laptop Monday to a report he didn't ask for.

---

## Phase 3 — Content production line (month 2)
- **Content calendar auto-generated** from `my-files (knowledge)/hpc-reference/seasonal-calendar.md` + pillar mix
- Captions, hooks, and hashtags drafted in batch, held in `my-work (outputs)/internal/drafts/` for approval
- Canva connector generates on-brand graphics from the design system
- Repurposing chain automated: one YouTube upload → clip briefs, stills list, blog draft, email draft
- **Evan's role reduces to:** approve / edit / post

**Custom skills to build in this phase:**
| Skill | Does |
|---|---|
| `hpc-content-batch` | 2 weeks of channel-specific social content on brand + on calendar |
| `hpc-ad-brief` | Creative concept → scripted, shot-listed ad brief |
| `hpc-email-campaign` | Seasonal moment → full campaign email, on brand, segmented |
| `hpc-creator-outreach` | Prospect list → personalized outreach + tracked seeding agreement |

---

## Phase 4 — Closed-loop optimization (month 3+)
- ROUX reads ad performance → drafts new creative → Evan approves → performance feeds back
- Automated kill/scale *recommendations* (never automated spend changes — that stays Evan's click)
- Automated post-campaign post-mortems written into `my-work (outputs)/content/ads/`
- Automated context-file maintenance: prices, SKUs, benchmarks refreshed from source systems
- Inventory/season signal → proactive campaign proposals before Evan thinks of them

---

## Phase 5 — ROUX as a proactive operator
- Monday: report lands in Slack, unprompted
- Tuesday: creative briefs land, unprompted
- Wednesday: content calendar + drafts, unprompted
- Thursday: email campaign drafted, unprompted
- Friday: one compounding asset shipped
- Evan approves, edits, and makes the calls. That's it.

---

## Rules that never get automated
1. **Spend changes** — Evan clicks. Always.
2. **Publishing** — nothing goes live without human approval.
3. **Claims** — every performance number gets human eyes before it's public.
4. **Anything involving customer PII** — the affiliate list never leaves the machine.

---

## Immediate next actions
1. [ ] Authorize connectors (Klaviyo, GA, Ahrefs, Slack, Canva)
2. [ ] Set up recurring Shopify / Meta / Google exports into `my-work (outputs)/internal/reports/raw/`
3. [ ] Run `grill me` against `my-files (knowledge)/hpc-reference/open-questions.md`
4. [ ] Schedule the Monday scoreboard task
5. [ ] Build `hpc-content-batch` skill
