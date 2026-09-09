# Finishing the IntentWave draft campaign — step by step
**Wed Sept 9, 2026.** About five minutes. **Do not publish** — this is for review at 1pm.

> Already done and saved in the account:
> **Campaign** `IW Lookalike 1% - Cold Prospecting - Sept 2026 (DRAFT)`, Sales objective ·
> **Ad set** `IW LAL 1% - Cold Prospecting`, In draft · **Ad** placeholder, untouched.
> The top bar shows **"Review and publish (3)"**. Those 3 are your draft items.

---

## STEP 1 · Open the draft

Ads Manager → **Campaigns** tab → find `IW Lookalike 1% - Cold Prospecting - Sept 2026 (DRAFT)`.
Its Delivery column says **In draft**.

Click the campaign name → click the **Ad sets** tab → click `IW LAL 1% - Cold Prospecting` →
click **Edit** (the pencil).

---

## STEP 2 · 🔴 Fix the one actual error

Scroll to **Conversion → Performance goal.** It currently reads **"Maximize value of
conversions"** and throws error **#2490408**.

**Change it to "Maximize number of conversions."**

*(It's the first option in the list, directly above the one selected. This is the control that
refused my input three times — it may take you two goes as well.)*

Everything else on that error panel should clear once this is set.

---

## STEP 3 · Budget

**Daily budget: $100.**

That is an **opening position, not a recommendation to defend.** Where it comes from:

- Current caps across the account: **$214/day** ($60 + $62 + $42 in `BPM_TOF_Manual`, $50 in `18qt-TOF`)
- Plus the planned **$30/day** retargeting campaign = **$244/day**
- ROUX's hard ceiling until Jay's landed BOM arrives: **$350/day**
- $244 + $100 = **$344/day** — just inside it

$100 is also the bottom of Dalton's suggested $100–150 range. **$150 would breach the ceiling.**
If the room wants more than $100, the answer is "not until we have the landed BOM," not a
bigger number.

---

## STEP 4 · Schedule

**Start date: Tuesday Sept 16.** Leave the end date empty.

⚠️ **Do not start it today.** Sept 9–15 is the only clean, no-discount measurement week you
will get — a new campaign launching into it adds a variable that makes the whole week
unreadable. This is also what you tell Dalton if he pushes to go live today.

---

## STEP 5 · Audience — ✅ DONE 2026-09-09

**Estimated audience size went from 217,800,000 to 2,300,000 – 2,800,000.** All three
exclusions are in as hard **Controls** — *"We won't reach people beyond these settings, even
with Advantage+ on."*

### ⚠️ The ad set has NO audience picker, and that is not a bug

This is an **Advantage+ Sales Campaign** and Meta removes the audience selector by design.
There is no toggle to turn it off — "Show more settings" at campaign level only exposes a
spending limit. The Audience card gives you *Controls* (hard limits) and *Suggest an audience*
(a hint Meta may ignore). Neither lets you set a real inclusion with exclusions.

### The way through: build a Saved Audience, then pull it in

The **Saved Audience builder has a link the ad set doesn't** — that link is the whole trick.

1. **Ads Manager → Audiences → Create audience → Saved audience**
2. Click **"Switch to original audience options"** — bottom left of the dialog
3. Name it, then under **Custom audiences** add `Lookalike (1%) - IW - LA Audience`
4. Click **Add exclusions** → add `Website Visitors 30D (All)`, `Past Purchase L90 via Pixel
   Data`, `Dealer Buyers (EXCLUSION)`
5. **Create saved audience**
6. Ad set → Audience → **"Use a saved audience"** → select it

**Built as:** `IW LAL 1% - Cold - excl. retargeting, purchasers, dealers`

### Two traps in that flow

- ⛔ **Never press Escape in these dialogs.** It closes and discards everything with no
  warning. Cost one full rebuild.
- **The layout shifts down after every pick.** Click directly into the next field; select-all
  grabs the whole page instead of the field.

### Two things the copy-in does that you should know about

- **Meta says "a new audience has been created based on your saved audience."** That is a
  translation, not a failure — an Advantage+ ad set can't reference a saved-audience object,
  so Meta copies the settings in. The exclusions carry, and the 215-million drop in estimated
  size is the lookalike doing its job.
- ⚠️ **It overwrites the ad set's minimum age** with whatever the saved audience carries. Ours
  carried the default 18, which wiped Evan's 24. **The saved audience still says 18** — fix it
  before reusing it, or the next ad set inherits the wrong floor.

## STEP 6 · Placements

Leave on **Advantage+ placements** (all placements). The creative exists in all three paid
sizes, so every placement has a correctly shaped asset.

---

## STEP 7 · Creative — check this before the meeting

Go to the **Ad** level. In the image picker, look for the 15 statics dated `2026-09-08`.

- **If they're there** → build the ad. For a cold lookalike, use **`120qt-crowd-math`** — it's
  the widest cold hook and it qualifies a big-pot buyer without naming a price. Copy, headline,
  description and URL are in
  [evergreen-ad-copy.md](2026-09-09-evergreen-ad-copy.md), concept 3.
- **If they're not there** → they never got uploaded. Upload them from
  `my-skills/hpc-ad-creative/work/creative/library/`. **Only you can put files into Meta.**

This is the step that broke the August attempt. Worth checking before 1pm so it isn't a
surprise in the room.

---

## STEP 8 · ⛔ Leave it in draft

**Do not click "Review and publish."**

Close the editor. When the *"Publish draft items?"* box appears, click **Close**, not
**Publish**. The draft saves automatically and survives.

You want to walk into the meeting with something to show, not something already spending.

---

## If someone asks in the room

**"Why 1% and not broader?"** A 1% lookalike off a ~3,000-person seed is roughly 2 million
people in the US. It's the tighter, higher-intent build and the conventional first step.
Widening to 3% later is a one-click edit.

**"Why not launch today?"** Sept 9–15 is the only clean no-discount week available to measure
the post-sale baseline. One week of patience buys a readable number.

**"What's the budget?"** $100/day, and the ceiling is $350/day total Meta until Jay's landed
BOM lands. **The CAC ceilings on file are provisional — nobody in the room, us included, gets
to justify a raise with them.**
