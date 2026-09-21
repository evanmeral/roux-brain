# Tailgate kit C (Game Ticket): retargeting copy

**2026-09-18 · Maya.** This is copy only. Nothing was built, uploaded or changed in Meta or Shopify. I ran one read-only Shopify lookup on the kit product (details below).

**Where it runs:** `RT 30D - 18QT`, $10/day, launching Mon Sept 28. It **replaces** `rt-18qt-fry-it-all` and does not run next to it. That was Beau's ruling on 2026-09-18 (`internal/reports/2026-09-18-tailgate-ad-split.md`). The 2026-09-11 retargeting plan says the set's $10/day can't carry a second ad (§5).
**Audience:** people who viewed the 18 QT in the last 30 days and didn't buy. They already know the fryer. The ad's job is to move them up to the kit.

---

## Creative (approved by Evan 2026-09-18, library)

`my-skills/hpc-ad-creative/work/creative/library/`
- 1:1 `2026-09-18_tailgate-kit_ticket_1080x1080_v1.png`
- 9:16 `2026-09-18_tailgate-kit_ticket_1080x1920_v1.png`
- 1.91:1 `2026-09-18_tailgate-kit_ticket_1200x628_v1.png`

The image already says "Best seat's next to the fryer" and the seat boxes read TAILGATE / FRONT / FRYER. The copy below is written to add to that, not repeat it.

---

## Primary text: version 1, the upgrade ⭐ run this one

```
The 18 QT is the fryer. This is the whole tailgate setup.

The Tailgate Fry Kit puts the 18 QT powered fryer up on leg extensions, so you fry standing up. It adds a 5" fry thermometer made to fit the pot and a 20" skimmer for pulling out the wings. Tunnel Tubes hand-welded on the bottom of the pot get your oil to 350° in under 5 minutes.

Fish, fries, wings, okra. Save the crew a seat. Built in Louisiana.
```

## Primary text: version 2, the ticket

```
Section: tailgate. Row: front. Seat: next to the fryer.

Same 18 QT powered fryer, now with the gear that goes around it on game day: leg extensions, a 5" thermometer that fits the pot, and a 20" skimmer.

Hot oil in under 5 minutes, fryer at standing height, first basket out before kickoff. Hand-welded in Louisiana.
```

**Why version 1.** These people have already looked at the fryer. What they don't know yet is what the kit adds, and version 1 names each piece and what it does for them: legs to stand at, a thermometer that fits the pot, a skimmer. Version 2 mostly repeats the ticket gag that's already in the image. With enhancements off and one ad in the set, pick one. Version 2 is the backup if Evan wants the copy to match the creative's voice.

---

## Headline (pick one)

1. `Best Seat's Next To The Fryer.` (matches the creative)
2. `The Whole Fry Setup.` ⭐ (it adds something the image doesn't say)
3. `Your Fryer, Game-Day Ready.`

## Description

`Fryer, legs, thermometer, skimmer.`

## CTA button

Shop Now

---

## Build fields

| Field | Value |
|---|---|
| Ad name | `rt-tailgate-kit-best-seat` |
| Campaign | `Retargeting - Site Visitors 30D - Sept 2026` (retargeting plan §6) |
| Ad set | `RT 30D - 18QT` |
| Destination | The Tailgate Fry Kit PDP, `Product/10298785661168`. **The handle isn't confirmed.** Copy it from the live product page on the day. The handle in the build record ends `-19-98-savings`, and today's title reads "(Up to $29.98 Savings)", so the old handle may be out of date. |
| URL parameters | `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}` |
| Resolves to | utm_campaign `Retargeting - Site Visitors 30D - Sept 2026` · utm_term `RT 30D - 18QT` · utm_content `rt-tailgate-kit-best-seat` |
| Destinations | **Shop off, Messenger off.** Confirm both on screen before publishing |
| Enhancements | Advantage+ creative enhancements off, multi-advertiser ads off (plan §2) |

The name follows the plan's `rt-<product>-<angle>` pattern. The `rt-` prefix keeps it apart from A and B in `18qt-TOF`. **The name has to be final before publish, because a rename splits `utm_content`.** Don't put "(DRAFT)" in it.

---

## Claims check

| Rule | Result |
|---|---|
| No price, savings figure, discount code, warranty, "Made in USA", patent | ✅ None |
| Frying stat | ✅ "350° in under 5 minutes" is the 18 QT frying figure (`what-we-sell.md`, frying line §1). No boiling stat |
| Tunnel Tubes on the pot bottom, not the burner | ✅ |
| Fryer never paired with crawfish | ✅ Fish, fries, wings, okra |
| Kit contents | ✅ 18 QT Powered · leg extensions · 5" thermometer · 20" skimmer (`what-we-sell.md`, live Shopify read 2026-09-18). The 5" is the 18 QT's thermometer (Evan, 2026-09-11) |
| Origin | ✅ "Built in Louisiana" / "Hand-welded in Louisiana" |
| No competitor, no "hard boil", no "cast" | ✅ |

---

## Flags

1. **The kit is still DRAFT with 0 images** (Shopify read-only, `get-product`, 2026-09-18). If it isn't active by Sept 28, C has nowhere to send people. Whether to hold C or keep fry-it-all running in that case is Beau's call. The go/no-go is Thu Sept 24.
2. **Two sources word the stat differently.** C's cold primary text (v2 concepts file) and the kit PDP both say "350° in **as little as** 5 minutes". `what-we-sell.md` says "**under** 5 minutes", which this file uses because the brief asked for it. It would be worth making those two match.
3. **The live kit PDP prints "Patent No. 11,844,459".** That's allowed on a PDP, since rule 10 covers ads only. I'm noting it so no one lifts copy from that page into an ad.
4. **Open, from Beau:** `RT - Viewed 18 QT - 30D` isn't built yet, and every audience on pixel `1861969194014116` reads 20–20. Check its size before launch.

**Next:** Beau has the copy now. The budget and the swap are already ruled, so the only open call is flag 1 (hold or swap if the kit isn't live on Sept 28). Building it in Meta is Evan's click.
