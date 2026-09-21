# IntentWave — 1pm Wed Sept 9. What Evan walks in with.

**Beau, 2026-09-09.** Room: Dalton + Tommy (IntentWave), Jay, Peter.
**Recommendations only. Every change below is Evan's click.**

> ⚠️ **The board's Meta section is stale and is superseded by Evan's live account read this
> morning** (HP Cookers ADs `4392736013287`, Aug 10 – Sep 8). Nothing in `BPM_TOF_Manual` went
> dark; it has six live video ads. Where this doc and the board disagree, this doc wins.

---

## 📄 The one page — read this at 12:55

1. **Budget: $244/day in caps, ~$7,300/month.** That is +$30/day over what runs today, and the
   $30 is the retargeting campaign. Nothing else moves before **Sept 16**.
2. **The five statics do not go into `BPM_TOF_Manual`.** That campaign runs on video, six video
   ads are live, three under $45 CPP. Two statics go to retargeting, one to `18qt-TOF`, two are
   held for their own ad set on Sept 16.
3. **IntentWave's seeded campaign: yes — Sept 16, as a lookalike, not as retargeting.** Building
   it now is fine. Launching it today puts a new variable into the only clean week we have.
4. **No collision, and here is the line:** ours is the warm pool (site visitors, purchasers
   excluded). Theirs is the cold lookalike off their identified list. **Theirs must exclude our
   retargeting audience and all purchasers.** If Dalton says his campaign *is* retargeting the
   contacts, then it is the same campaign as ours — we run one, and it is ours.
5. **Labor Day: the top-line is solid, the ad-level breakdown is suspended.** Orders doubled
   YoY. Do not quote which creative won — our own table was filtered wrong.

**The one thing to actually get out of the room:** Jay's **landed BOM and monthly overhead.**
It has been open since Aug 28 and it gates every budget decision below.

---

## 1 · Where the five statics go — decided

### The decision changed because the premise did

The routing in [evergreen-ad-copy](../content/ads/2026-09-labor-day/2026-09-09-evergreen-ad-copy.md)
was written believing `BPM_TOF_Manual` would be empty Wednesday morning. It isn't. Six video ads
are live and the campaign never stopped. **The problem these statics were built to solve has
evaporated**, so the question is no longer "what do we switch on" — it's "is a static worth
displacing video that is converting at $19–43."

Mostly: no.

### Why not into the video ad sets

Two reasons, and the second is the one that matters.

1. **Cost.** A new ad in a live ad set enters with no history. Meta gives it exploration spend,
   and that money comes out of ads currently buying purchases at **$19.41 · $43.04 · $57.07**
   *(Evan's Ads Manager read, Aug 10 – Sep 8)*. Adding an ad does not reset the ad set's learning
   — that part is fine — but the exploration budget is real and it is drawn from proven delivery.
2. **You wouldn't learn anything.** Meta allocates within an ad set to whatever wins the auction.
   A static that gets 15% of an ad set's spend and returns a mediocre CPP tells you a static lost
   an intra-ad-set race to video. It does **not** tell you whether statics work on cold traffic.
   That is not a test, and a test you can't read is worse than no test — it produces a number
   someone will quote later.

### The routing

| Concept | Goes | Why |
|---|---|---|
| `hpc-dark-evergreen` (18 QT) | **`18qt-TOF-Prospecting`** | Closest thing to a proven creative continuing rather than a new one starting. The Labor Day HPC Dark ran **in this campaign** at $22.33 CPP on 8 purchases. Evergreen is the same frame with the badge and code stripped. It also refills the slot that ad vacated. |
| `80qt-buy-cheap-twice` | **New retargeting, $30/day** | Objection-killer. The "is it worth it" objection only exists in someone who already saw a price. New money — displaces nothing. |
| `18qt-fry-it-all` | **New retargeting, $30/day** | Someone who viewed the 18 QT and didn't buy is usually stuck on "is this only a fish fryer." Both copy versions answer exactly that. |
| `120qt-crowd-math` | **Hold → Sept 16** | ↓ |
| `120qt-performance_rolling-boil` | **Hold → Sept 16** | ↓ |

### Holding the two 120 QT concepts is deliberate, and it is the call I'd defend hardest

These are the two I most want in market — 120 QT is the #1 product at **$492,671 over 12 months**
*(Shopify, metrics-and-goals)* and rolling-boil is the only claim we own that nobody else can make.
That is exactly why they don't get scraps of an ad set optimizing for video.

**They get their own ad set inside `BPM_TOF_Manual` at $40/day on Sept 16**, gated. Budgets in
that campaign are set at ad-set level, not CBO — so a fourth ad set is clean: it takes nothing
from the three that are working and resets none of their learning. Priced in §2 so Jay hears the
number once, today, instead of as a surprise next week.

### One structural fix in `18qt-TOF-Prospecting`, and it costs nothing

Four live ads on a **$50/day campaign budget, all four "Learning limited"** *(Evan, Ads Manager,
this morning)*. Four ads cannot each get enough delivery on $50/day. That is the cause of the
"learning limited" flag, not the creative.

**Turn off `18qt-002` ($74.72 CPP) and `18qt-003` ($72.11).** Both sit above the 18 QT powered
provisional CAC ceiling of **~$63** *(cac-model-v2, 20% overhead reserve — provisional)*. Keep
`18qt-001` ($14.53) and `18qt-004` ($45.76), add `hpc-dark-evergreen`. Net 4 → 3 ads on the same
$50/day.

⚠️ **Frame this as a structure fix, not a performance verdict.** `18qt-002` has **2 purchases** —
that is not enough to kill anything on merit. The argument is budget concentration, not evidence.

### ⛔ The control is gone — stop calling it one

The board and the off-season plan both say freeze `18qt-TOF-Prospecting` for seven days because
it is the clean no-offer control. **It isn't.** It ran Labor Day creative (HPC Dark, 8 purchases,
$22.33). Freezing a contaminated control buys nothing, so the freeze instruction is withdrawn and
the consolidation above is safe to do.

### Files Evan needs in the Meta media library

Only Evan can put files into Meta. Nine files, three concepts:

```
2026-09-08_18qt-fryer_hpc-dark-evergreen_1080x1080_v1.png
2026-09-08_18qt-fryer_hpc-dark-evergreen_1080x1920_v1.png
2026-09-08_18qt-fryer_hpc-dark-evergreen_1200x628_v1.png
2026-08-27_80qt-powered_buy-cheap-twice_1080x1080_v1.png     ← Aug 27 build, verified no discount badge
2026-09-08_80qt-powered_buy-cheap-twice_1080x1920_v1.png
2026-09-08_80qt-powered_buy-cheap-twice_1200x628_v1.png
2026-09-08_18qt-fryer_fry-it-all_1080x1080_v1.png
2026-09-08_18qt-fryer_fry-it-all_1080x1920_v1.png
2026-09-08_18qt-fryer_fry-it-all_1200x628_v1.png
```

All in `my-skills/hpc-ad-creative/work/creative/library/` — verified on disk 2026-09-09. Copy and
verified URLs for all three are already written in
[evergreen-ad-copy](../content/ads/2026-09-labor-day/2026-09-09-evergreen-ad-copy.md).

⛔ **Not usable:** `2026-08-27_laborday-vintage_multi-product_1080x1350_v1.png` — carries
"LABOR DAY SALE", "10% OFF EVERYTHING", both codes and "SEPT 1–8" on the face.

---

## 2 · The budget number for Jay

### First, a correction to the arithmetic before it reaches him

"$202/day plus the $50 in 18qt" **double-counts.** The $202.24/day account figure already contains
`18qt-TOF` — $156.33 BPM + $45.91 18qt = $202.24 *(Ads Manager Sept 1–7 ÷ 7, pulled 2026-09-08)*.

Two different numbers, and Jay should get the cap:

| | Today | With retargeting |
|---|---|---|
| **Budget caps** | $164 (BPM ad sets: $62 + $60 + $42) + $50 (`18qt-TOF` campaign) = **$214/day** | **$244/day** |
| Actual spend | ~$202/day (94% fill) | ~$232/day expected |

### 🎯 The number: **$244/day in caps. ~$7,300/month.**

**It is a $30/day increase, and the $30 is one new retargeting campaign. Nothing else moves.**

### The reasoning, in the order Jay will want it

- **Off-season break-even CAC is ~$170.67.** Off-season AOV ran **$383.53** and **$393.40** in the
  two no-sale weeks before the sale × 44.5% August gross margin. *(Arithmetic on Shopify figures —
  a derived number, not itself a Shopify number.)* Meta's working ad sets buy purchases at
  **$19–46**. Spending is not the problem.
- **So why hold?** Every CPP we have was earned against a **discount-elevated conversion rate.**
  Scaling into a no-discount week on discount-week economics turns a good finding into a bad month.
  We are buying one clean baseline week for $30/day.
- **Expect CPP to rise next week.** That is conversion normalizing, not failure. Say it now so it
  isn't a surprise on Sept 16.
- **Meta looks underspent, not inefficient.** At 2.4 break-even blended ROAS, Meta had to cause
  ~11 of the sale week's 126 orders to pay for itself. It claims 53. That claim is Meta's, not
  Shopify's — but the direction is not in doubt.

### ⚠️ What this number is NOT

**It is not justified by a CAC ceiling, because we do not have one.** The ceilings in circulation —
18 QT ~$63, Triple Jet ~$96, 120 QT ~$197 — are **provisional**, derived with an assumed 20%
overhead reserve, pending **landed BOM and monthly overhead**. Robert corrected this model on
2026-08-28 and was right. **Do not let anyone in the room use those figures to justify a raise,
including us.**

The $244 is defensible on a different basis: it is a $30 test with stop rules, against a
break-even CAC that is not in dispute at any plausible overhead number.

### The ladder — priced now so Jay approves the shape, not just today's figure

| Step | When | Move | Gate — all must pass, trailing 7 days |
|---|---|---|---|
| **0** | Sept 9–15 | Hold **$244/day caps**. No changes. | — |
| **1** | Sept 16 | `18qt-TOF` **$50 → $60** (+20%) | CPP ≤ $30 · frequency ≤ 2.5 |
| **1b** | Sept 16 | New **120 QT statics ad set, $40/day** in `BPM_TOF_Manual` | Retargeting freq ≤ 3.5 · retargeting CPP ≤ $40 |
| **2+** | every 3 days | ≤20% steps | Same gates, re-measured |
| **Ceiling** | — | **Total Meta ≤ $350/day until landed BOM lands** | Hard stop |
| **Oct 1** | — | Turkey-fry / BFCM ramp — separate plan, bigger step | — |

**If both Sept 16 gates pass: $294/day caps, ~$8,800/month.** That is the honest two-week picture.

**`BPM_TOF_Manual` gets no raise until trailing-7 frequency is under 3.0.** It ran **5.05 across
15,033 people** *(Ads Manager Sept 1–7)*. That is a structure problem and money makes structure
problems worse. Widen `LAL 1% Purchasers` from 1% to 1–3% instead — free, and it is the obvious
source of the 5.05.

### The line for Jay

> "$244 a day, about $7,300 a month. That's thirty dollars more than we're running now and the
> thirty dollars is a retargeting test with a stop rule — worst case it costs us $420 over two
> weeks. Everything else holds flat for one week because every cost-per-sale number we have was
> earned during a discount and I don't want to scale on it. Next Wednesday I'll have a clean week
> and I'll come back with a real number. What I need from you is the landed cost per unit and the
> monthly overhead — until I have those, every ceiling I'm working to is an estimate."

---

## 3 · Position on IntentWave's three proposals

**Tone note before anything else:** IntentWave is **free**. They installed the identity pixel and
built the audience syncs at no cost *(our-team.md)*. Push back on the mechanics, hard, and stay
collaborative doing it. Do not burn a free advisor over a garbled transcript line.

### (a) "Advantage+ on super targeted lists of around 1,500 people" — Tommy

**The proposal is two contradictory things at once, and the fix is one question.**

Advantage+ works by **expanding past** the audience you hand it — the audience is a signal, not a
constraint. A 1,500-person "super targeted list" is a constraint. So:

- **If 1,500 is a lookalike *seed*: fine, do it.** Meta's documented minimum seed is 100 and good
  seeds run 1,000–5,000. 1,500 identity-resolved buyers is a legitimately strong seed, and it is
  the one thing IntentWave can build that we cannot.
- **If 1,500 is the *destination* — we advertise to those people:** push back. Our own sizing rule
  is **~$20/day per 4,000 people ≈ 3× frequency**. 1,500 people at $20/day over a fortnight lands
  around 8× frequency. That is the `BPM_TOF_Manual` 5.05 problem, deliberately rebuilt smaller.

**Ask Tommy, one sentence:** *"Is the 1,500 a seed or a destination?"* Everything else follows.

**Then ask the more valuable question.** `IW - LA Audience` (ID `52505444830191`) — IntentWave's
own **~4,000 identified contacts**, confirmed 2026-08-31 — has been sitting in the account
**unused** ever since. Before building a new 1,500-person list, ask why the 4,000 one was never
activated. Not hostile. It is the single highest-value question in the room, and it may mean the
new build is unnecessary.

### (b) The new seeded campaign

**Right idea. Wrong week. Launch Sept 16.**

- The account has exactly **one week** between the end of a sale and the first honest read on
  no-discount economics. A new campaign launched today is a new variable inside the only week
  designed to have none.
- A new prospecting campaign **starts in learning**. Meta needs ~50 optimization events in 7 days
  to exit. At our observed CPPs of $20–46, that is roughly **$1,000–$2,300 in a week** on that
  campaign alone. It cannot be funded properly this week without breaking the hold.
- Build it now — audience, creative, structure, exclusions. **Launch Sept 16, gated.** Nothing is
  lost by a week and the read gets dramatically cleaner.

**Say yes with a date. Don't say no.**

### (c) The budget remark — do not guess at it, ask

Dalton's line as transcribed: *"increasing the daily budget from $250 to $100-150 to exit the
learning phase and scale up effectively."* **$250 → $100–150 is a decrease.** The transcript is
garbled and I am not going to reconstruct his intent.

**The sensible reading** — and Evan should say it *as* a reading, not as what Dalton said:

> The likely meaning is *"put $100–150/day on the new campaign so it can exit learning."* That is a
> legitimate point and the arithmetic supports it: ~50 purchases in 7 days at our CPPs needs
> roughly $143–$328/day on a single campaign. It is also why our small campaigns keep showing
> "Learning limited."

The alternative — that $250 is a proposed account total split $100–150 per campaign — is equally
plausible. **Don't pick between them in the room. Ask.**

**Ask Dalton, verbatim:**
> "Which number is which — is $100–150 a day the new campaign's own budget, or a split of a $250
> account total? And is it on top of the $244 we're running now, or inside it?"

**The pushback that matters, whichever answer comes back:** $100–150/day on a brand-new campaign
is a **41–61% increase on total Meta spend**, proposed for the week we have no clean read. Two
defensible ways to do it, one indefensible:

- ✅ **Start at $50/day and ladder** — accepts it sits in learning longer, keeps the ≤20%-step
  discipline.
- ✅ **Fund it properly at $100–150/day as a deliberate, time-boxed test** — with a hard end date
  and a CPP gate written down before launch.
- ⛔ **$100–150/day with no stop rule.** That is the one to refuse, and refuse plainly.

**Hard ceiling regardless: total Meta ≤ $350/day until Jay's landed BOM lands.** $244 today + $150
would be $394. Say the ceiling out loud in the room so it is not relitigated later.

---

## 4 · Our retargeting vs. IntentWave's campaign — resolved

**Evan cannot propose two overlapping warm-audience campaigns in front of Jay. Here is the line
that keeps them separate, and it is the sentence to say in the room.**

| | **Ours — retargeting** | **IntentWave's — seeded prospecting** |
|---|---|---|
| Audience | 30-day site visitors + add-to-cart + IG/FB engagers | **Lookalike** built off the identity-resolved list |
| Temperature | **Warm** — came, looked, didn't buy | **Cold** — people who resemble them |
| Purchasers | **Excluded** | **Excluded** |
| Budget | $30/day, live Sept 9 | TBD, Sept 16 |
| Creative | `80qt-buy-cheap-twice` · `18qt-fry-it-all` | Theirs to propose |

### The non-negotiable, and it protects Dalton too

**Whatever IntentWave launches must explicitly exclude our retargeting audience and all
purchasers.** Without that exclusion, two of our own campaigns bid against each other for the same
people. We pay a higher CPM to compete with ourselves, and neither campaign's numbers mean
anything afterward. That last part is the argument that will land with Dalton — it wrecks his
measurement as much as ours.

### If Dalton says his campaign *is* retargeting the identified contacts

Then it is not a second campaign, it is the same campaign. **Merge, don't run both:**

> "Then that's the campaign I've already got budgeted at $30 a day and it goes live today. Let's
> make yours the lookalike instead — that's the part your data does that mine can't."

That is the right split on the merits, not just on turf: **retargeting is our test, our budget,
our creative, and it is already priced for Jay. The identity-resolved lookalike seed is the one
thing IntentWave genuinely adds.** Give them that.

⚠️ **Sizing caveat that applies to ours too:** the ~4,000 figure is a **lookalike seed**, not a
confirmed retargetable pool. **Check the actual pool size in Meta → Audiences before setting the
budget.** Under 4,000 people, start retargeting at $20/day, not $30.

---

## 5 · What Evan says about Labor Day

### The complete window — pulled fresh this morning, and it changes the number

Every Labor Day figure in this brain excluded Sept 8, the deadline day. **It was the second-best
day of the sale.**

| Window | Orders | Net sales | AOV |
|---|---|---|---|
| **Sept 1–8 2026** (complete) | **126** | **$41,100.84** | **$326.20** |
| **Sept 1–8 2025** (also a sale) | 63 | $26,144.22 | $414.99 |
| **Change** | **+100.0%** | **+57.2%** | **−21.4%** |

*Shopify, pulled 2026-09-09. Like-for-like eight-day windows. AOV is net ÷ orders throughout —
Shopify's own `average_order_value` field does not reconcile and is not used.*

- **Sept 8 alone: 21 orders, $7,445.75 net.** Deadlines work. Worth carrying into November.
- **69 new customers** across Sept 1–8 *(Shopify, 2026-09-09)*; 52 returning, 118 total.
- **Meta, Sept 1–7: $1,415.69 spend, 53 claimed purchases, $26.71 CPP** *(Ads Manager,
  2026-09-08 — platform-attributed, pre-discount, refunds not subtracted)*.
  ⚠️ **I do not have Sept 8 Meta spend.** So actual CAC across the complete window cannot be
  stated. Pull it before quoting any CAC figure for the full sale.

### ⛔ Three things Evan must NOT say

1. **Which creative won.** The Sept 1–7 ad-level table for `BPM_TOF_Manual` listed 4 ads totaling
   $1,087 of $1,094 campaign spend — leaving no room for six video ads that were demonstrably
   running. It was almost certainly filtered to "labor" ads. **Everything built on it is
   suspended**, including the headline conclusion that *"$949 of $1,094 went to the treatment that
   lost."* That may still be true. It is not currently supported, and it is exactly the class of
   error Robert catches.
2. **"18 QT beat the flagship by 32%."** `18qt-TOF-Prospecting` ran Labor Day creative (HPC Dark,
   8 purchases, $22.33). Its $20.09 CPP is a **sale-period** number. That comparison is
   sale-vs-sale, not treatment-vs-control.
3. **Any fatigue conclusion.** Frequency 5.05 on BPM is real and worth fixing. "Creative fatigue"
   as its *cause* has not been tested — and the test as designed can no longer be run, because the
   control was contaminated.

### 🗣️ The script — short, honest, no overclaim

> "The sale worked. Complete eight days from Shopify: 126 orders, $41,101 net. Same eight days
> last year, also a sale: 63 orders, $26,144. Orders doubled, revenue up 57%.
>
> The warning is average order value — $326 against $415 last year, down 21%. We sold to twice as
> many people spending less each. That's the thing to fix before November, and it's an argument
> against another sitewide percentage.
>
> On the ads, account level: $1,416 spend Sept 1 through 7, 53 claimed purchases, $26.71 per
> purchase — that's Meta's attribution, not Shopify revenue. **Our ad-level breakdown was filtered
> wrong, so I'm not going to tell you which creative won. I'm re-pulling it clean this week.**"

That last sentence is what protects him with Robert. Volunteering the limitation costs nothing and
buys every other number in the room credibility.

### ⚠️ Dalton's claim — check it, politely, in the room

He said the Labor Day campaign *"generated four sales from September 1st to September 8th with a
2.02 frequency"* and had *"the highest ROAS."*

**It does not match anything in our data.** Our live account read shows no campaign or ad at 4
purchases with 2.02 frequency; the frequency reference points we have are BPM at **5.05** and
`18qt-TOF` at **1.90**, both Sept 1–7 *(Ads Manager, 2026-09-08)*. He may be on a different
window, a different attribution setting, or an ad-level view we're not seeing. **All three are
possible and none of them are dishonest.** But per the standing rule, we do not repeat a vendor's
number until it reconciles against Shopify.

**Ask, don't accuse:**
> "Dalton, the four sales at 2.02 frequency — I can't find that in the account. Which campaign,
> which ad, and which attribution window and setting are you on? And the ROAS figure, is that
> Meta-reported conversion value? We don't use Meta's revenue as revenue — it's pre-discount, it
> doesn't net refunds, and Google claims the same orders."

**And make the methodological point, because it's the real issue:** four purchases is far too
small a sample to rank ROAS against campaigns doing 37 and 16. That is the same discipline that
correctly refused to scale on the $19.76 HPCDark figure at 7 purchases. Frame it as method, not
as doubt about him.

---

## 📋 Questions to ask in the room — the short list

1. **Jay:** landed BOM per unit and monthly overhead. Open since Aug 28. Gates everything.
2. **Tommy:** is the 1,500 a lookalike **seed** or an advertising **destination**?
3. **Tommy / Dalton:** why has `IW - LA Audience` — your ~4,000 identified contacts — never been
   activated?
4. **Dalton:** is $100–150/day the new campaign's budget or a split of a $250 total? On top of our
   $244, or inside it?
5. **Dalton:** which campaign, ad, window and attribution setting produced the four sales at 2.02?
6. **Dalton:** will the seeded campaign exclude our retargeting audience and all purchasers?
7. **Anyone:** what is the actual retargetable pool size in Meta → Audiences? Budget depends on it.

---

## ⛔ Do not agree to, in the room

- **Any budget above $350/day total Meta** until landed BOM lands.
- **Any new campaign without a written stop rule and end date.**
- **Any sitewide % discount before November.** AOV $326.20 on the complete window — still the
  lowest of the four windows compared, still ~21% below last Labor Day on the same mechanic. Two
  data points, same holiday, same mechanic.
- **Repeating the 30%-off-legs mechanic** until landed cost per leg extension exists (~$50.58
  threshold). 35 orders touched leg extensions Sept 1–8 for $3,022.60 net *(Shopify, 2026-09-09)*
  — high volume, unknown profitability.
- **Anything that touches email or SMS.** Biljana's lane, entirely — including "we could sync
  audiences to Klaviyo."
- **Quoting Shopify net ÷ Meta spend as ROAS.** It credits Meta with commercial freight, a
  Navimow lawn mower, Biljana's email and Coalition's Google.

---

## Sources

- **Shopify, pulled 2026-09-09** — Sept 1–8 2026 and Sept 1–8 2025 sales, new customers, product
  mix. Source of truth for revenue.
- **Ads Manager, read by Evan 2026-09-09** — account `4392736013287`, Aug 10 – Sep 8. Campaign,
  ad set and ad-level structure and CPP.
- **Ads Manager, pulled 2026-09-08** — Sept 1–7 spend, purchases, frequency. ⚠️ The ad-level
  portion for `BPM_TOF_Manual` is unreliable; see §5.
- **Derived** — off-season break-even CAC ~$170.67; learning-phase budget arithmetic. Both are
  arithmetic on sourced figures, not sourced figures themselves.
- **Provisional** — all CAC ceilings (cac-model-v2, 2026-08-28), pending landed BOM and overhead.

> ⚠️ The Sept 1–8 product-mix query returns a per-product order count that sums across products and
> does not reconcile to the 126-order total. Product figures above are directional revenue only.
