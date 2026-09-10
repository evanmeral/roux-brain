# Tracking tags for the IW lookalike ads
**2026-09-10.** Goes on the **three draft ads in the new campaign only** (Evan, 2026-09-10).
`BPM_TOF_Manual` and `18qt-TOF-Prospecting` are not touched.

---

## What a tracking tag is

A short label added to the end of the ad's link. When someone clicks the ad, they land on the
same page. The only difference is the address bar, which ends in something like
`?utm_source=facebook&utm_campaign=IW Lookalike...`.

Shopify reads that label and records it against the visit and the order. That lets Shopify say
"this order came from *this* campaign and *this* ad", rather than just "came from Facebook".

**Why we need it:** today, Shopify can see only **24 orders** with a Meta ad tag, against the
**155 purchases** Meta claims for Aug 10–Sep 8 *(order-level-pulls, Finn)*. The three draft ads
and `18qt-001` all have an **empty** URL-parameters field *(Finn, Ads Manager, 2026-09-10)*.
Without tags, we can't match Shopify orders to this campaign by name. That's the only way to
judge it on Shopify's numbers instead of Meta's.

## Is it safe and legal?

- **Yes. It's standard practice.** Nearly every advertiser uses tags like these. Meta has a
  dedicated field for them, and Google Analytics and Shopify are built to read them.
- **It labels the visit, not the person.** The tag carries only our own campaign and ad names.
  It collects nothing about the visitor. The privacy question Coalition raised (CIPA) is about
  the identity pixel and cookie consent. That's a separate thing, and tags don't change it.
- **Never put personal information in a tag.** No names, emails or phone numbers. The string
  below contains none.
- **No effect on delivery.** Meta doesn't use the tag to decide who sees the ad, what it costs,
  or how learning goes. These are draft ads, so nothing re-enters review.
- **The one real risk is a typo that breaks the link.** The preview check below catches it.

*Not legal advice, but nothing here collects or passes personal data.*

## The string to paste

```
utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}
```

- `{{…}}` are **Meta's own fill-ins.** Meta swaps in the real campaign, ad set and ad names at
  click time. Paste the string exactly as written, including the braces.
- `utm_campaign` / `utm_content` give Shopify the **names**. That fixes what the order-level
  pull ran into: Meta's tags carrying numeric IDs only.
- `utm_id={{campaign.id}}` **keeps the numeric ID as well**, so anything that already reads IDs
  still works.
- The same string goes on all three ads. The `{{ad.name}}` fill-in tells them apart.
- ⚠️ **Don't rename an ad after launch.** The tag follows the name, so a rename splits one ad's
  history into two labels.

## Where it goes: once per ad, three ads

1. Ads Manager → the IW campaign → **Ads** tab → select one ad → **Edit**.
2. Scroll to **Tracking** → **URL parameters** → paste the string.
3. Repeat for `120qt-crowd-math`, `hpc-dark-evergreen` and `120qt-performance_rolling-boil`.
4. **Check it:** on each ad, open **Preview** → click through to the website. The address bar
   should show the landing page followed by `?utm_source=facebook…`, and the page must load
   normally.

⛔ **Never press Escape in these panels.** Close with the panel's own button. Drafts autosave.

## What it won't do

- **It won't fix Meta over-claiming.** Meta still counts view-through buyers who never clicked.
  Those orders carry no tag.
- **It won't tag the other campaigns.** Their orders stay unlabelled until someone decides to
  tag them. Editing a *live* ad sends it back through review.
- **It won't show results on day one.** Tagged orders start appearing in Shopify from the first
  click after launch.

## After launch: how we read it

Finn pulls Shopify orders whose last-visit `utm_campaign` = `IW Lookalike 1% - Cold Prospecting - Sept 2026 (DRAFT)`.
Meta keeps the "(DRAFT)" suffix unless the campaign is renamed before publishing, so **rename
it first, or expect it in the tag.** Then compare that count to Meta's claimed purchases. The gap
between the two is Meta's over-claim for this campaign.
