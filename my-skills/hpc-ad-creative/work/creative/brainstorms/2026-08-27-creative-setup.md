# HPC Creative Setup: Brainstorm / Discovery Notes
Date: 2026-08-27 · Goal: Set up Beau to produce static ad creative fluidly — capture Evan's rules, standards, brand latitude, and process so making a creative is a fast, repeatable request rather than a negotiation.

Interviewer: Beau · Subject: Evan Meral

---

## Summary / key decisions

**System built (2026-08-27):** `work/creative/` renders HTML/CSS → PNG at exact ad sizes via headless
Chrome. `build.sh` renders · `prod.py` centres products by their true visible bounds ·
`approve.sh` archives approved work into `library/` with a standard filename + log.
Skill: `.claude/skills/hpc-ad-creative/SKILL.md`.

**Evan's six standing creative rules** (in memory as `hpc-creative-rules`):
1. Logo always present unless deliberately omitted
2. Product centred in its area
3. Never "hard boil" — use **rolling boil** / **raging boil**
4. Never link fryers to crawfish; match use cases to the product, never invent
5. Type centred in its container, never touching borders
6. Always tell Evan what images are needed and in what treatment

**Brand latitude:** Evan — *"no need to follow the colors exactly... regarding the fonts dont worry
about following the fonts exactly either since that creative choice really depends on the creative
you are making."* Tokens are a starting point, not a cage.

**Assets received:** 39 background-removed product cutouts with faint shadow, high-res
(1512×2016 / 1800×2400 / 2400×1800). Naming: `perf` = Performance (pot only), `pwd` = Powered
(pot + legs + burner). Plus Shopify colour/font screenshots → confirmed Poppins, `#F69329`,
`#222222`, `#F3F6F6`. Logo carries **Patent No. 11,844,459**.

**Video:** Evan does NOT want video production handled here. He wants **written plans he can forward
to Garrett Frazier**, produced as part of campaign planning so everything is specced in one go.

---

## Q&A log

### Q0 — Assets + rules handed over (no question asked)
- **Captured:** the six rules above, the brand-latitude note, the asset drop, and the video/Garrett
  instruction. Also: log every approved creative in a consistently-named folder; **do not save
  anything Evan hasn't approved or edited.**
- **Beau's fix from feedback:** the "Buy the cheap one twice" ad had the 80 QT low-right instead of
  centred in its black panel, and the timer ad's stats sat against the dividers. Root cause of the
  centring issue: **the cutouts contain large transparent margins**, so sizing the file does not
  centre the product. Solved systematically — measured the alpha bounding box of all 39 cutouts into
  `assets/product-cutouts/_bboxes.json` and built `prod.py`, which crops each image to its visible
  bounds so flex centring centres the product. This now applies automatically to every future ad.
- **Flags:** none — all six rules recorded.

### Q1 — Where do creatives run, batch vs one-off, and do we show prices?
- **Captured:**
  - **Channel: everything.** *"Really trying to feed everything, we can specify which when planning out the idea."* → Channel is a per-project decision made at planning time, not a standing default.
  - **⭐ Meta = all three sizes, always.** *"if its for meta ads i would want variations for each of the 3 sizes that meta requires for creatives so like 3 different sizes."* → 1080×1080, 1080×1350, 1080×1920 delivered as a set.
  - **Copy variations: Beau's call to propose.** *"if you think we should run different variations of copy on that campaign, then we'll do that, and you can make those different variations."* → Recommend the test, then build it. Don't wait to be asked.
  - **Prices/numbers: campaign-dependent.** *"We're about to start a Labor Day sale for those. I would probably want the numbers on there. If we're talking about one product, we could put numbers on there, but we don't have to."*
- **Beau's read:** default to **no price on cold prospecting** (80% buy on quality, 10% on price — putting $715 in a cold ad invites the objection before the value lands) and **numbers on offer/promo and retargeting creative**, where the buyer already knows the product.
- **🚨 TIME-SENSITIVE: Labor Day sale is imminent** — Labor Day 2026 is **Monday 7 September**, 11 days out. Needs offer terms, dates, SKUs, and a creative set.
- **Built in response:** `build-set.sh` renders one concept across all three Meta sizes in a single command; concepts organised as `templates/<concept>/{1x1,4x5,9x16}.html`.
- **Flags:**
  - **Labor Day sale: what's the offer, which SKUs, what dates?** -> **Evan. Urgent.**
  - ~~New logo variants pasted as images~~ ✅ **RESOLVED 2026-08-27** — Evan added all five to `assets/brand-refs/`. **Shield is primary**; circle available if the composition calls for it. Dark-background ads switched to `HPC-ShieldLogo-White.png`, removing the drop-shadow hack. ⚠️ Circle logo still reads "BUILT ON PATENT PENDING TECHNOLOGY" though the patent has issued (No. 11,844,459) — prefer the shield where that line is legible.
  - Lifestyle/food/team photography still needed -> **Evan compiling**

---

## Open flags (pending input)
- Creative interview below — pending Evan

---

## Not yet covered (completeness backstop)
- [x] Offer/pricing in ads — Q1 (campaign-dependent; promos carry numbers)
- [x] Formats and channels — Q1 (Meta = all 3 sizes; channel decided per project)
- [ ] Approval + hand-off workflow
- [ ] Image gaps — what to shoot next
- [ ] Legal/disclaimer placement
- [ ] Competitor/inspiration references
