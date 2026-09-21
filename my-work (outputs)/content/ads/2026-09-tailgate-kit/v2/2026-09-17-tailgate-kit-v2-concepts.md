# Tailgate Fry Kit ad, round 2: three concepts (1:1 only)

**2026-09-17 · Maya.** Evan turned down round 1 (`../2026-09-17-tailgate-kit-ad-copy.md`, "Fry standing up"). These are new ideas with new copy. Nothing from round 1 carries over: no navy, no orange glow, no Poppins or mono-eyebrow system, no patent line.
Drafts only. Nothing was built or uploaded in Meta or Shopify.

> **Round 3 (2026-09-17, same day).** Evan kept all three ideas and asked for craft, not new concepts:
> *"make the football field look more like a football field... for the ticket, make that one look a little bit better too. They just look a little too basic. Put a little more effort into it."*
> **Ideas, headlines and primary text are unchanged.** What changed is execution — the **Visual**
> paragraphs below are rewritten to match the re-rendered PNGs, and C picked up one new fine-print
> line. Round 3 also set **creative rule 11** (fresh idea and its own look every time), now written
> into `my-skills/hpc-ad-creative/instructions.md`.

> **Round 4 (2026-09-17, same day).** Evan approved the concepts and asked for one change:
> *"the new creatives look perfect, i love the creativity in them keep it up! Only recommendation is
> to make the product cutout bigger, new rule (fill as much of the empty space around the product
> image as possible without covering words or boarders, as well as centering the image)… so go and
> make the cutouts bigger so that the customer can see the product better."*
> **Ideas, headlines, primary text and every layout element other than the product are unchanged.**
> Only the product got bigger. This set **creative rule 12** (the product fills its space), now
> written into `my-skills/hpc-ad-creative/instructions.md`.
>
> | | Product was | Product now | Change |
> |---|---|---|---|
> | **A** Starting Lineup | 300 × 480 | **374 × 598** | +25% wider, **+56% area** |
> | **B** The Payoff (photo) | skimmer ≈ 570px across | **≈ 700px across** | photo scaled 1.22×, re-centred |
> | **C** Game Ticket | 300 × 480 | **330 × 536** | +10% wider, **+23% area** |
>
> **Why C gained least.** The fryer sits in the ticket's upper stub, boxed on all four sides by the
> serial line above, the perforation below, the headline and the seat boxes to the left, and the
> printed frame to the right. The binding limit is **height** — the stub gives 538px between the
> serial and the perforation, and at the cutout's 1:1.60 aspect that caps the width at ~336px.
> Growing it further would mean moving the tear line, which the lower stub has no room to absorb.
> The round-3 version also had the thermometer tip crossing the printed inner frame by ~10px; it is
> now 20px inside it. A side benefit of the rebuild, and the reason to measure rather than eyeball.

> **Round 5 (2026-09-18).** Evan likes all three and wants to run all of them. Each concept now has
> the full paid set: **1:1 + 9:16 + 1.91:1**, one ad per concept with placement customization.
> Headlines, primary text and each concept's look (palette, type, props) are unchanged. The 9:16 and
> 1.91:1 are new layouts, not crops of the 1:1.
>
> **One copy change, C only, every size:** "No refunds" is out of the fine print. It could read as
> HPC's real return policy. The line is now **"Rain or shine · Non-transferable"**, and C's 1:1 was
> re-rendered with it. While I was there I also fixed a rule-5 miss from round 4: the fine print sat on
> C's printed inner frame line. It moved up 13px and now clears the CTA and the frame line by about 10px each.
>
> | Concept | 9:16 layout | 1.91:1 layout |
> |---|---|---|
> | **A** Lineup | Same field and stadium light, with the horizon dropped. Headline at the top. The roster stacks chip over name on the left, and the fryer takes the right half at **545 × 873** (1:1: 374 × 598) | Headline and a 2 × 2 roster on the left. Fryer on the turf at the right, at **355 × 568**. The shield moves to the bottom right so the fryer can centre in its column. Yard numbers are hidden here because at this depth they sat behind the footer type |
> | **B** Payoff | The photo is **portrait** once EXIF rotation is applied (3024 × 4032), so the 9:16 is a real cover crop at 0.95×. It needs no blurred underlay, which corrects the round-2 note. Skimmer **≈ 825px across** (1:1: ≈ 700), centred to +2px | Skimmer in the left half at **≈ 573px across**. Type stacks in a right column over a right-hand scrim. The source doesn't have enough image left of the basket to put the basket on the right at this scale without a letterbox |
> | **C** Ticket | A tall ticket. The 3-line headline and the seats stack down the left, and the fryer fills the right at **426 × 689** (1:1: 330 × 536). The shield fills the gap beside the headline | A landscape ticket with a **vertical** perforation. The main body holds the headline, seats and the fryer at **297 × 479**. The stub holds the shield, serial, kit name, contents, CTA and barcode |
>
> Templates: `templates/tailgate-kit-v2/{lineup,photo,ticket}-{9x16,1.91x1}.html`. Each cutout template
> has its own `body.m` / `body.k` measurement modes built in, so no extra `_m_` / `__ink_` files were added.
>
> **Checks, re-run on all nine round-5 PNGs**
>
> | Check | Result |
> |---|---|
> | Pixel size (rule 9) | ✅ All nine checked with `sips`. The 1:1s are 1080×1080, the 9:16s 1080×1920 and the 1.91:1s 1200×628. No 4:5 in the set. Drafts and v2 copies are byte-identical |
> | Story safe zone (9:16) | ✅ All type sits inside y 250–1580 on A, B and C. C's top serial is at about y 250 and its fine print ends at about y 1568 |
> | No patent number (rule 10) | ✅ Only the white and black shields are used, never the colour shield |
> | Fresh look (rule 11) | ✅ Each size keeps its own concept's system. The three concepts stay as distinct from each other as they were in round 4 |
> | Phone-readable (rule 7) | ✅ Checked at 380px wide. On the 9:16s, headlines are 112–164px and info lines 38–62px. On the 1.91:1s, headlines are 88–112px and every info line is 30–42px. Fine print is limited to C's "Rain or shine · Non-transferable" (20–22px) and its serial and barcode numbers (20–34px) |
> | Product centred in its free area (rules 2 + 12), measured on product-only vs type-only renders | **A 9:16:** silhouette −2, mass −55 (split: the thermometer spike pulls the bbox right, and the fryer is limited by the frame edge). **A 1.91:1:** −1 / −36. **C 9:16:** −2 / −40. **C 1.91:1:** +6 / −21. **B** (photo): basket centre +2 on 9:16 and +9 on 1.91:1 |
> | Product fills its space (rule 12) | Closest gaps from product to type, border or perforation: **A 9:16:** 17px left and 19px right (frame edge). **C 9:16:** 17px. **C 1.91:1:** 19px. **A 1.91:1:** 29–31px top and bottom (frame edge). On A 1.91:1, C 9:16 and C 1.91:1, height is the limit, so some empty width around the legs can't be avoided |
> | Nothing touches type (rule 5) | ✅ Nothing overlaps. B's CTA sits on the photo over the lower rim of the basket, the same way it does on the 1:1 |
> | No gray box (rule 8) | ✅ The shadow is on `.pbox`. All four cutout renders were checked at full size |
> | Claims | ✅ No new copy. No price, warranty, competitor, "hard boil" or crawfish, and no numbers on any creative |
>
> **Next:** Beau makes the budget call on running all three (one ad each, three sizes by placement). Before anything goes live, the gates in "Before it goes live" below still apply.

- **Campaign:** `18qt-TOF-Prospecting` (cold). No price on any creative. $465 can't be quoted until the kit goes active (`what-we-sell.md`).
- **Sizes:** rounds 2 to 4 were 1:1 only. Round 5 gives all three concepts 1:1, 9:16 and 1.91:1 (see above).
- **Templates:** `my-skills/hpc-ad-creative/work/creative/templates/tailgate-kit-v2/`
  Alongside the three live templates sit `_m_*.html` (product only, on black — for measuring the
  cutout) and, new in round 4, `__ink_lineup.html` / `__ink_ticket.html` (type and borders only, on
  white — for measuring clearance under rule 12). Helper files, not renderable ads; `build-set.sh`
  only picks up `1x1 / 9x16 / 1.91x1`, so they are inert. Delete them if you'd rather not keep them —
  I don't have delete permission here.
- **CTA button (Meta):** Shop Now
- **Destination URL:** `https://highperformancecookers.com/products/[TAILGATE-KIT-HANDLE-TBD]`. This is a placeholder until the Bundles-app rebuild lands.
- **URL parameters:** `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}`

---

## A. Starting Lineup · `tailgate-kit-v2-lineup-1x1.png`

**The idea:** the kit is a football roster. Every piece has a position, so what's in the box reads as a lineup instead of a spec list.

**Visual (round 3):** a real football field in perspective, built to scale — 1 yard = 40px on a plane tilted 64.5°, so the yard lines converge properly. It carries alternating 10-yard **mowing stripes** with a fine mow-direction grain, **yard lines every 5 yards**, **yard numbers** (40 / 50 / 40) foreshortened into the turf with a direction arrow, two rows of **hash marks**, both **sidelines**, an **end-zone block with its goal line** at the far left, and a **turf texture** over the whole plane. Above the far sideline the stadium falls off into darkness, with a warm **floodlight pool** on the middle of the field and a vignette into the corners — that dark band is what the headline sits on. The roster is now a broadcast-style lineup graphic: a fixed-width white position chip (QB, O-Line, Ref, Receiver) with the piece name on the same baseline and a chalk hairline under each row. The 18 QT on its legs stands on the turf at the right with a soft elliptical **contact shadow**, so it sits on the field instead of floating. Mustard CTA. No glow. **Round 4:** the fryer now fills that whole right-hand column — 374×598 instead of 300×480, its pot rising past the headline's second line into the dark band and its feet stopping 29px above the CTA. The contact shadow was widened and re-placed under the new foot line.

**Headline:** Your starting lineup.

**Primary text, option 1**
> Every good game day has a starting lineup. Here's yours.
>
> The 18 QT powered fryer runs the offense. The leg extensions hold the line. The 5" thermometer is the ref and calls it at 350°. The 20" skimmer catches everything that comes out golden.
>
> The Tailgate Fry Kit. Wings, fish, fries, okra. Hand-welded in Louisiana.

**Primary text, option 2**
> Four pieces, one job: feed the lot.
>
> 18 QT powered fryer, leg extensions, a 5" fry thermometer made to fit it, and a 20" skimmer. Tunnel Tubes hand-welded on the bottom of the pot spread the burner's heat across the whole base, so your oil can hit 350° in as little as 5 minutes.
>
> Suit up. Built in Louisiana.

---

## B. The Payoff (real photo) · `tailgate-kit-v2-photo-1x1.png`

**The idea:** show the reason people come over, not the pot. It's a real photo of golden chicken coming out of the 18 QT on the skimmer with the thermometer clipped to the rim, so the kit is in use in the frame.

**Visual (round 3 — tightened, not redesigned):** HPC's own photo `assets/lifestyle/18qt-frying-wings-1.jpeg`, full bleed and cropped tight on the skimmer and the oil. Cream condensed headline (Anton) over a dark top scrim. A mustard label tag and a mustard CTA. White shield bottom left. It is the first paid creative in the library built around a real photo instead of a cutout. **Round 4:** the photo is scaled **1.22×** and re-positioned so the skimmer of wings reads as the subject — roughly 700px across instead of 570, its rim starting just under the spec line and the food filling the lower two-thirds of the frame. The crop was moved right as well as up, so the basket now sits near the frame's horizontal centre with the handle's diagonal intact. No crop, no stretch: the source is 4032×3024 and the frame still takes a square from it.
Three changes only: the **top scrim is deeper and a second gradient holds the right side**, where the headline used to cross the lit pot rim and lose its edges; the headline drops to 128px with a heavier shadow so it never fights the oil; and the **bottom row is rebuilt** — the kit contents line moves up under the headline on one line with a mustard rule above it, leaving the bottom as shield left, CTA right, with nothing overlapping.

**Headline:** Everybody drifts to the fryer.

**Primary text, option 1**
> Every tailgate has one spot people keep wandering back to. Make it yours.
>
> The Tailgate Fry Kit is the 18 QT powered fryer, leg extensions, a 5" fry thermometer and a 20" skimmer. Tunnel Tubes hand-welded on the bottom of the pot get your oil to 350° in as little as 5 minutes.
>
> Wings, fish, fries, hushpuppies. Built in Louisiana.

**Primary text, option 2**
> Nobody asks where the food is. They follow the sound of the oil.
>
> Fryer, legs, thermometer, skimmer. The whole fry setup in one kit, hand-welded in Louisiana by a small team who cook this way too.

**Primary text, option 3**
> First batch comes out and the crowd shows up. Every time.
>
> The Tailgate Fry Kit: 18 QT powered fryer, leg extensions, 5" fry thermometer, 20" skimmer. Built in Louisiana.

---

## C. Game Ticket · `tailgate-kit-v2-ticket-1x1.png`

**The idea:** the best seat at any tailgate is next to the fryer. The whole ad is a printed game ticket that admits your crew, and the kit is the ticket stub.

**Visual (round 3):** a real printed ticket on stadium concrete. The **stock** is mustard with a diagonal press gradient, paper-fibre texture, edge darkening and a **guilloche rosette** under the type — the interference pattern real tickets use. A **double printed frame** runs inside the edge. The tear line is a genuine perforation: **24 punched holes** showing the concrete through the stock, each with an inner shadow, plus a light dash line and the two side notches. Every dark element prints through a **multiply layer**, so the ink sits *on* the stock and the fibre shows through it. The stub carries a **barcode** (irregular bar widths, not a repeating pattern) with a serial beneath it, a red overprint serial **No. 018 LA** top right, the black shield, and one fine-print line. The ticket sits on the concrete with a **two-part shadow** — a broad ambient one and a tight contact one — over a speckled slab with joint lines and a soft overhead light. The 18 QT on legs is printed on the main body; SEC / ROW / SEAT still read TAILGATE / FRONT / FRYER. **Round 4:** the fryer is 330×536 instead of 300×480 and sits lower and further left, filling the stub between the serial line and the perforation. Its thermometer tip used to cross the printed inner frame by about 10px; it now clears it by 20.

**Headline:** Best seat's next to the fryer.

**Primary text, option 1**
> Forget the 50-yard line. The best seat on game day is right next to the fryer.
>
> The Tailgate Fry Kit: the 18 QT powered fryer, leg extensions, a 5" fry thermometer and a 20" skimmer. Hand-welded Tunnel Tubes on the bottom of the pot get oil to 350° in as little as 5 minutes.
>
> Admit the whole crew. Built in Louisiana.

**Primary text, option 2**
> Your crew's tickets, right here. Section: tailgate. Row: front. Seat: next to the fryer.
>
> Fryer, legs, thermometer, skimmer, all in one kit. Wings, fish, fries, okra. Hand-welded in Louisiana.

---

## Which one I'd run: B, "Everybody drifts to the fryer."

- **Real food beats a floating cutout** for cold traffic. It stops the scroll on appetite before anyone reads a word, and it looks nothing like the dark cutout ads already running in `18qt-TOF`.
- **The kit is actually in the picture.** Thermometer on the rim, skimmer in hand, fryer underneath.
- **It carries the fewest claims.** The creative has no number at all.
- **Risk:** it's a countertop phone photo, not a parking lot, and the headline doesn't say where it is. For 9:16 the photo is 4032×3024, so it needs the blurred-underlay treatment (instructions, promo conventions). If Garrett's Sept 22 tailgate-kit footage gives a real game-day frame, swap it in.
- **Second choice: C.** It's the most distinctive layout. **A** is the clearest about what's in the box, and it's a good second ad if Beau wants a test.

**Round 3 changes the order slightly.** B is still the one I'd run cold — appetite beats craft for a first impression, and it carries no claims. But A and C are no longer "the clever ones that look basic." A now sells the season on sight before a word is read, and C is the kind of ad people screenshot. If Beau funds two, run **B + A**: they fail differently (appetite vs. what's in the box), so the test tells you something either way. **C is the retargeting ad** — it rewards someone who already knows the product.

## Checks (all three) — re-run on the round 4 renders

| Check | Result |
|---|---|
| No patent number (rule 10) | ✅ None. White and black shields only. The color shield prints "PATENT NO." and was not used |
| Fresh idea and its own look (rule 11, new this round) | ✅ Turf green / real photo / mustard ticket — three different palettes, three different type systems (Saira Extra Condensed · Anton + Oswald · Anton + Oswald + Space Mono), three different compositions. None of them is a past HPC layout with new words |
| Phone-readable (rule 7, tightened) | ✅ Re-checked at 380px wide on the round 4 renders; no type changed. Headlines 108–152px, every info line 38–60px, ticket seat labels 30px. **Fine print used once:** C's "No refunds · rain or shine · non-transferable" and its serial, at 22–26px — decorative, carries no message, above the 20px floor |
| Product centred (rule 2 + rule 12), measured on the type-hidden `_m_` render against its **free area**, not the frame centre | **A:** free area x 682–1080 (roster border → frame edge), centre 881. Silhouette centre 872 (**−8**), mass centre 836 (**−45**). **C:** free area 618–963 in ticket coords → centre 831 in frame coords after the −1.55° rotation. Silhouette centre 814 (**−16**), mass centre 786 (**−45**). All four inside ±50. Both lean slightly left because the thermometer spike inflates the bbox to the right — correct, not a miss. ⚠️ `check-centering.py` reads the whole frame width and is **useless on these two layouts** — A's white roster chips and C's grey concrete both threshold as "product" and throw the reading off by 100px+. Measured on the `_m_` masks instead |
| Product fills its space (rule 12, new this round) | ✅ Measured as a pixel gap between the product mask and a type-and-borders-only render. **A: 16px** minimum clearance (left leg to the bottom roster hairline). **C: 12px** (left leg to the SEAT box). Nothing touches type, no border crossed, both contact shadows resized and re-placed with the product |
| No gray box (rule 8) | ✅ Shadow is on `.pbox`, not the `img`. Checked at full size on the round 4 renders; the drop-shadow radius grew with the product (26→30px on A, 18→20px on C) |
| Fryer never paired with crawfish, no "hard boil", no "cast", no "Made in USA" | ✅ |
| Numbers qualified | ✅ "350° in as little as 5 minutes" appears only in primary text (18 QT frying stat, `what-we-sell.md`) |
| Tunnel Tubes on the pot bottom, not the burner | ✅ |
| No warranty, no price, no competitor, no dates | ✅ |
| Legs fitment | ✅ Legs fit the 18 QT (one of three products). 5" thermometer is the 18 QT one (Evan, 2026-09-11) |

**Unconfirmed:** that the skimmer and thermometer in the photo are the exact kit SKUs (`SC-7R`, `HP-5in-Therm`). The copy doesn't claim it.

⚠️ **Separate, found in passing — not part of this round.** The **round 1** "Fry standing up" creative (`../2026-09-17-tailgate-kit-ad-copy.md`, renders `tailgate-kit-standup-*.png`) carries **"PATENT NO. 11,844,459"** as fine print on the 1:1, and its claims table still marks that ✅. **Creative rule 10 landed later the same day and forbids it.** Round 1 was turned down and nothing from it is live or scheduled, so nothing is bleeding — but `templates/tailgate-kit-standup/1x1.html` and `_m_1x1.html` and both copies of the PNG should not be reused as-is.

## Before it goes live (unchanged from round 1)
Kit go/no-go Thu Sept 24 · `SC-7R` at −1 with deny · `HIGH15`/`SMS25` still active · 18 QT page "Made in the USA" (Group A fix sheet, due Mon Sept 21).

**Next (superseded by round 5, 2026-09-18):** Evan chose all three, and all three now have the full paid set. Beau makes the budget call.
