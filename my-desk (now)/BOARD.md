# Board — 2026-09-03

> The one page. What is live, what is next, what is waiting, what not to ship.
> **Rewritten in place at every `/wrap` — never appended.** Hard cap: 120 lines.
> Anything that falls off goes to [archive/](archive/), never deleted.
> Decisions and their reasons go to [decisions.md](decisions.md).

---

## 🟢 Running — Labor Day sale, day 3 of 8. Ends Tue Sept 8, 11:59pm CT

Codes `LABORDAY10-26` (10% sitewide) + `LABORDAY30-LEGS` (30% legs). **They stack.
Manual entry.** Both confirmed active in Shopify 2026-09-02; expire Sept 9 04:59 UTC.
Master docs → [2026-09-labor-day/](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/)

- ✅ Organic V2 posted by Evan 2026-09-02 — 7-frame carousel, leg-extension feed post, countdown stories.
- 📣 **Watch comments.** Price objections are coming; 15 scripts are already written → `ORGANIC-PACK-V2/COMMENT-AND-DM-REPLIES.md`
- 📅 **Still to post (V1 pack):** `09_SEP06_STORY` · `10_SEP07_FEED` (Labor Day — **no sale pitch**, HPC is closed) · `11_SEP07_STORY` · `12_SEP08_STORY` (post morning **and** ~6pm)
- ✅ **The 4 Meta ads are built and live**, confirmed 2026-09-03 (`HP Cookers ADs` account, inside `BPM_TOF_Manual`). Sept 1–2: $463.07 spent, 13 purchases, $35.62/purchase blended — too early to call a winner. One ad is a weaker duplicate ("Copy," $91.64/purchase vs $34.38) from the earlier failed UI builds — **leave alone through Sept 8**, a mid-sale pause resets Meta's learning for a savings too small to matter. Fix the naming/build process after the sale (Nova).

---

## 🔺 Now — top three

**1. Write the one-page creator brief.** ⏰ **Evan: revisit this after the Labor Day
sale wraps Sept 8** — flagged 2026-09-03 so it doesn't get lost in sale focus.
~17 creators on UpPromote (5% commission, free product for a couple posts a month).
At least one signed up, asked what content would help, and was told *"im honestly not
fully sure what we would have you do."* Willing people idle for want of direction.
⛔ Paid content is discontinued — do not offer it.

**2. Sign up for NOLA Home & Garden, Feb 19–21 2027.**
$1,850 for the 10×10 corner, 33% deposit, ACH avoids the 3.5% card fee. No deadline
but placement worsens with time. Sheet: `HPC Trade Shows - 2027` (Drive).
Also live: Louisiana Outdoor Expo Mar 19–21 ($900). ⛔ Nov 11 Cater-Event Expo is a **no**.

*(Demoted off Now: the Jul 20 Meta re-pull — done this session, see Numbers below and
[decisions.md](decisions.md).)*

---

## ⏳ Waiting on

| Who | What | Since |
|---|---|---|
| **Evan** | Confirm Garrett's 18 QT video (`~/Desktop/Home Fryer .mp4`), watch once for claims risk, ask for a 15–20s cut | 2026-09-01 |
| **Evan** | Decide: make the hardcoded warranty badge a variable (see Landmines) | 2026-09-01 |
| **Jay** | Excel with landed BOM + monthly overhead — unblocks the real CAC ceiling. May be superseded by Digit. | 2026-08-28 |
| **Coalition** | Reply on Cater + Event, Mar 22–25 | — |

---

## ⏸️ Parked — deliberately, do not re-raise

- **Oversold SKUs / negative inventory.** Parked by Evan 2026-09-01. **Digit** becomes the source of truth for inventory *and* overhead within days. When it connects, **ask it about overhead before stock** — that is what unblocks the CAC ceiling.
- **CAC ceilings are provisional.** Robert's correction: the figure on record is gross profit per unit — a *break-even line*, not a spending ceiling. Working: `internal/reports/2026-08-28-cac-model-v2.md`
- **Google Ads + SEO** — Coalition's lane. Monitor and report only; suggestions go to Evan as a document to forward, never as direct changes. Basecamp is the real workspace.
- **Email / SMS / Klaviyo** — Biljana's, entirely. Evan has declined access twice.
- **After Sept 8:** post-mortem Sept 9 · the June–October off-season plan (the real +$500K project) · weekly scoreboard cadence.

---

## ⛔ Landmines — do not ship these

- 🔴 **`yeti-1x1.html` line 37 hardcodes `5-YR RESIDENTIAL WARRANTY`.** Every ad rendered from that template carries the claim regardless of product. Safe on pots; **false on a steamer or a commercial boiler.** Not changed — awaiting Evan.
  → `my-skills/hpc-ad-creative/work/creative/templates/yeti-1x1.html`
- **Never put a 5-year claim on steamer or commercial creative.** The commercial line (80–140 Gallon, up to $5,775) is above the 120 QT size cap *and* sold to commercial buyers. It fails on both grounds. All commercial products carry the full 2-year.
- ✅ **The Labor Day ads need no warranty edit. Do not re-raise this.** Checked twice, resolved 2026-09-01.
- **Coalition's "Revenue Up 199.03% YoY"** (July 2026 report) is **unverified against Shopify.** Do not repeat it to Jay or Robert until reconciled. Coalition only ran Google from 7/20, so most of that July was BM Digital's.
- **Never quote a price that is not in** [what-we-sell.md](../my-business%20%28context%29/what-we-sell.md).

---

## 📊 Numbers at a glance

Source of truth → [metrics-and-goals.md](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md).
These are a cached view. Never cite from here without checking the date.

| Figure | Value | Source · date |
|---|---|---|
| **Sale so far, Sept 1–2** | **38 orders · $15,076 net · AOV $412** · $2,366 discounts | Shopify, 2026-09-02 |
| Week before the sale, Aug 24–30 | 54 orders · $20,711 net · AOV $385 | Shopify, 2026-09-02 |
| Week before that, Aug 17–23 | 72 orders · $28,325 net | Shopify, 2026-09-02 |
| Meta, post-handover (clean) | $9,285.94 spend · ~180 purchases · **$51.59 CPP · ~8.16 ROAS** | Meta Ads Manager, Jul 20–Sep 2, 2026-09-03. Meta-attributed, not Shopify-verified; includes ~$463 of Sept 1-2 sale spend |
| Shopify net sales, 13 mo | **$2,884,025** | Shopify, 2026-08-26 |
| Aug gross margin | 44.5% | Robert, via Shopify, 2026-08 |
| Break-even blended ROAS | ~2.4 | `paid-media.md`, 2026-08-26 |

**The sale is running ~2.5× the prior week's daily rate** — $7,538/day net vs $2,959/day
across Aug 24–30. Two days, no prior-year baseline: an observation, not a performance read.

**Three things in the sale mix worth a look** (Shopify, Sept 1–2):
- **The biggest revenue line is commercial.** 40 Gallon / 160 QT Powered Cooker — 2 orders, $3,887. Above the 120 QT warranty cap, and Stephen's lane. ⛔ Never a 5-year claim on it.
- **A Navimow X430 sold for $2,207** — Tier 3, inbound-only, not marketed at all.
- **Legs confirm the attach thesis.** 12 of 38 orders carried leg extensions but only $869 total — ~$72 each after the 30%. The attach is the lever, never the legs. Allowable CAC on a legs-only order is ~$12; you cannot buy a customer for that.
- Returning-customer rate **48.6%** (19 new, 18 returning) — roughly half this sale is the existing list.

---

## 🧭 Map

**Playbooks** — [weekly rhythm](../my-workflows%20%28automations%29/playbooks/weekly-operating-rhythm.md) · [paid media](../my-workflows%20%28automations%29/playbooks/paid-media.md) · [content engine](../my-workflows%20%28automations%29/playbooks/content-engine.md) · [automation roadmap](../my-workflows%20%28automations%29/playbooks/automation-roadmap.md)

**The business** — [who we are](../my-business%20%28context%29/who-we-are.md) · [what we sell](../my-business%20%28context%29/what-we-sell.md) · [our clients](../my-business%20%28context%29/our-clients.md) · [our team](../my-business%20%28context%29/our-team.md) · [how we sound](../my-business%20%28context%29/how-we-sound.md)

**Reference** — [metrics & goals](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [seasonal calendar](../my-files%20%28knowledge%29/hpc-reference/seasonal-calendar.md) · [customer language](../my-files%20%28knowledge%29/hpc-reference/customer-language.md) · [competitors](../my-files%20%28knowledge%29/hpc-reference/competitors.md) · [what we've tried](../my-files%20%28knowledge%29/hpc-reference/what-weve-tried.md) · [connected apps](../my-connections%20%28MCP%29/connected-apps.md)

---

*Standing rules: [hpc-standing-rules](../my-business%20%28context%29/hpc-standing-rules.md), under [SAFETY.md](../SAFETY.md) which wins on any conflict.
Full history of everything above → [archive/2026-09-02-next-session.md](archive/2026-09-02-next-session.md)*
