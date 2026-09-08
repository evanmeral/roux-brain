# Board — 2026-09-08

> The one page. What is live, what is next, what is waiting, what not to ship.
> **Rewritten in place at every `/wrap` — never appended.** Hard cap: 120 lines.
> Anything that falls off goes to [archive/](archive/), never deleted.
> Decisions and their reasons go to [decisions.md](decisions.md).

---

## 🟢 Running — Labor Day sale, **FINAL DAY**. Ends tonight, Tue Sept 8, 11:59pm CT

Codes `LABORDAY10-26` (10% sitewide) + `LABORDAY30-LEGS` (30% legs). **They stack.
Manual entry.** Confirmed active in Shopify 2026-09-02; expire Sept 9 04:59 UTC.
Master docs → [2026-09-labor-day/](../my-work%20%28outputs%29/content/ads/2026-09-labor-day/)

- ✅ **All content is posted. Nothing left to create or schedule.** V1 and V2 packs ran their course. The V3 accessory carousel went up on IG + FB today. Two stories scheduled 5pm tonight are the final posts of the sale.
- 📣 **Comments and DMs are the only live job left.** Last day drives the most price pushback; 15 reply scripts already written → `ORGANIC-PACK-V2/COMMENT-AND-DM-REPLIES.md`
- ⚠️ **Two SKUs the V3 carousel points at are backorder, not in stock** — adjustable shelf $119.99 (1 unit) and 10" Banjo $139 (0). Ship-as-is was Evan's call; if asked about delivery, say backorder plainly.
- ⏰ **After midnight:** confirm both codes actually deactivated, and that no live creative, bio link or site banner still promises the sale.
- **Meta:** 4 ads live in `HP Cookers ADs` / `BPM_TOF_Manual`. The weak duplicate ("Copy," $91.64/purchase vs $34.38) was held untouched so a mid-sale pause wouldn't reset learning — **that hold expires tonight; it can be paused from tomorrow.** Naming/build process still needs fixing (Nova).

---

## 🔺 Now — top three

**1. Sale post-mortem — tomorrow, Sept 9.** Needs a fresh pull: Sept 1–8 revenue, orders
and AOV against the prior week · full-window Meta spend and CPP · usage split between the
two codes · whether the legs-attach thesis held past the first two days.
⚠️ **Nothing in Numbers below covers the back half of the sale — do not reuse it.**
Finn pulls, ROUX reads it.

**2. Write the one-page creator brief.** ⏰ **Now due — parked until the sale wrapped.**
~17 creators on UpPromote (5% commission, free product for a couple posts a month).
At least one signed up, asked what content would help, and was told *"im honestly not
fully sure what we would have you do."* Willing people idle for want of direction.
⛔ Paid content is discontinued — do not offer it.

**3. Sign up for NOLA Home & Garden, Feb 19–21 2027.**
$1,850 for the 10×10 corner, 33% deposit, ACH avoids the 3.5% card fee. No deadline
but placement worsens with time. Sheet: `HPC Trade Shows - 2027` (Drive).
Also live: Louisiana Outdoor Expo Mar 19–21 ($900). ⛔ Nov 11 Cater-Event Expo is a **no**.

*Demoted from Now: **showroom product cards** → Parked. Held by Evan since 2026-09-03; a job waiting on a green light is parked, not urgent.*

---

## ⏳ Waiting on

| Who | What | Since |
|---|---|---|
| **Evan** | Green light to run the showroom-card batch across the catalog | 2026-09-03 |
| **Evan** | Confirm Garrett's 18 QT video (`~/Desktop/Home Fryer .mp4`), watch once for claims risk, ask for a 15–20s cut | 2026-09-01 |
| **Evan** | Decide: make the hardcoded warranty badge a variable (see Landmines) | 2026-09-01 |
| **Jay** | Excel with landed BOM + monthly overhead — unblocks the real CAC ceiling. May be superseded by Digit. | 2026-08-28 |
| **Coalition** | Reply on Cater + Event, Mar 22–25 | — |

---

## ⏸️ Parked — deliberately, do not re-raise

- **Showroom product cards.** Format approved (30 QT pair, 2026-09-03), full batch held by Evan "for now." Print setup and both pre-flight checks are documented — resuming needs a green light, not a re-design. Start order: 120 QT, then 18 QT. → [showroom-cards/](../my-work%20%28outputs%29/content/other/showroom-cards/)
- **Oversold SKUs / negative inventory.** Parked by Evan 2026-09-01. **Digit** becomes the source of truth for inventory *and* overhead. When it connects, **ask it about overhead before stock** — that is what unblocks the CAC ceiling.
- **CAC ceilings are provisional.** Robert's correction: the figure on record is gross profit per unit — a *break-even line*, not a spending ceiling. Working: `internal/reports/2026-08-28-cac-model-v2.md`
- **Google Ads + SEO** — Coalition's lane. Monitor and report only; suggestions go to Evan as a document to forward, never as direct changes. Basecamp is the real workspace.
- **Email / SMS / Klaviyo** — Biljana's, entirely. Evan has declined access twice.
- **Three fixes for Nova, after the sale** (found 2026-09-03): `brand.css` sets `.pbox{overflow:hidden}`, clipping every product's drop-shadow into a faint rectangle across *all* creative from those templates — worked around in the V3 templates only, shared file deliberately untouched mid-sale · the 40 QT fixed steamer insert is filed as discontinued in `what-we-sell.md` but is live at $27.99 · the BB-TJB carries a compare-at price identical to its price.
- **After the post-mortem:** the June–October off-season plan (the real +$500K project) · weekly scoreboard cadence.

---

## ⛔ Landmines — do not ship these

- 🔴 **`yeti-1x1.html` line 37 hardcodes `5-YR RESIDENTIAL WARRANTY`.** Every ad rendered from that template carries the claim regardless of product. Safe on pots; **false on a steamer or a commercial boiler.** Not changed — awaiting Evan.
  → `my-skills/hpc-ad-creative/work/creative/templates/yeti-1x1.html`
- **Never put a 5-year claim on steamer or commercial creative.** The commercial line (80–140 Gallon, up to $5,775) is above the 120 QT size cap *and* sold to commercial buyers. It fails on both grounds. All commercial products carry the full 2-year.
- **Fitment is a claim, not a flourish.** Leg extensions fit the 18 QT, 4-Way and 40 QT only. The BB-TJB is documented for **60 QT and up** — "any Performance pot" was caught in V3 review 2026-09-03 and narrowed. Never widen a fitment line past what `what-we-sell.md` documents.
- **Showroom cards carry no warranty line at all** — deliberate, 2026-09-03. Saying nothing is safe; saying "5-year warranty" short is not. If one is ever added it needs **both** qualifiers: residential, and 120 QT or smaller.
- **Showroom cards carry no price date, and a printed card cannot be recalled.** Re-pull `products.json` and re-render before every print run; pull old cards off the floor when a price moves.
- ✅ **The Labor Day ads need no warranty edit. Do not re-raise this.** Checked twice, resolved 2026-09-01.
- **Coalition's "Revenue Up 199.03% YoY"** (July 2026 report) is **unverified against Shopify.** Do not repeat it to Jay or Robert until reconciled. Coalition only ran Google from 7/20, so most of that July was BM Digital's.
- **Never quote a price that is not in** [what-we-sell.md](../my-business%20%28context%29/what-we-sell.md).

---

## 📊 Numbers at a glance

Source of truth → [metrics-and-goals.md](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md).
🔄 **UNDER REVISION — every sale figure below stops at Sept 2–3 and misses the back half
of the sale. Do not cite any of it until the Sept 9 post-mortem replaces it.**

| Figure | Value | Source · date |
|---|---|---|
| Sale, **Sept 1–2 only** | 38 orders · $15,076 net · AOV $412 · $2,366 discounts | Shopify, 2026-09-02 |
| Week before the sale, Aug 24–30 | 54 orders · $20,711 net · AOV $385 | Shopify, 2026-09-02 |
| Week before that, Aug 17–23 | 72 orders · $28,325 net | Shopify, 2026-09-02 |
| Meta, post-handover (clean) | $9,285.94 spend · ~180 purchases · $51.59 CPP · ~8.16 ROAS | Meta Ads Manager, Jul 20–Sep 2, read 2026-09-03. Meta-attributed, not Shopify-verified |
| Shopify net sales, 13 mo | **$2,884,025** | Shopify, 2026-08-26 |
| Aug gross margin | 44.5% | Robert, via Shopify, 2026-08 |
| Break-even blended ROAS | ~2.4 | `paid-media.md`, 2026-08-26 |

**Observations from the first two days only** — not a performance read, no prior-year baseline:
- Ran ~2.5× the prior week's daily rate ($7,538/day vs $2,959/day). **Two days out of eight.**
- **Biggest revenue line was commercial** — 40 Gallon / 160 QT Powered, 2 orders, $3,887. Stephen's lane. ⛔ Never a 5-year claim on it.
- **Legs confirmed the attach thesis.** 12 of 38 orders carried legs but only $869 total — ~$72 each. The attach is the lever, never the legs; allowable CAC on a legs-only order is ~$12.
- Returning-customer rate **48.6%** (19 new, 18 returning) — roughly half the sale was the existing list.

---

## 🧭 Map

**Playbooks** — [weekly rhythm](../my-workflows%20%28automations%29/playbooks/weekly-operating-rhythm.md) · [paid media](../my-workflows%20%28automations%29/playbooks/paid-media.md) · [content engine](../my-workflows%20%28automations%29/playbooks/content-engine.md) · [automation roadmap](../my-workflows%20%28automations%29/playbooks/automation-roadmap.md)

**The business** — [who we are](../my-business%20%28context%29/who-we-are.md) · [what we sell](../my-business%20%28context%29/what-we-sell.md) · [our clients](../my-business%20%28context%29/our-clients.md) · [our team](../my-business%20%28context%29/our-team.md) · [how we sound](../my-business%20%28context%29/how-we-sound.md)

**Reference** — [metrics & goals](../my-files%20%28knowledge%29/hpc-reference/metrics-and-goals.md) · [seasonal calendar](../my-files%20%28knowledge%29/hpc-reference/seasonal-calendar.md) · [customer language](../my-files%20%28knowledge%29/hpc-reference/customer-language.md) · [competitors](../my-files%20%28knowledge%29/hpc-reference/competitors.md) · [what we've tried](../my-files%20%28knowledge%29/hpc-reference/what-weve-tried.md) · [connected apps](../my-connections%20%28MCP%29/connected-apps.md)

---

*Standing rules: [hpc-standing-rules](../my-business%20%28context%29/hpc-standing-rules.md), under [SAFETY.md](../SAFETY.md) which wins on any conflict.
Full history → [archive/](archive/)*
