---
name: meta-ad-build
description: Turns approved creative + approved copy into a build sheet for a paid Meta image ad (sizes matched to the ad set's real placements, copy, URL + UTM tags, which Meta AI settings to switch off, the ad to duplicate), then checks the ad after Evan publishes. Use when you hear "build the ad", "set up the ads in Ads Manager", "put these live", "retargeting build", "/meta-ad-build", or when approved creative is waiting to go into Meta.
---

# Meta ad build

**One build sheet in, one read-back out.** Paid image ads are built **by duplicating an
existing ad in Ads Manager**, never through the Meta connector (decisions 2026-09-25). The
connector can't upload local images on this account, can't see the Instagram account, and
can't map images to placements, so a connector-built ad would be Facebook-only and square-only.

Lanes: **Maya** owns the copy and the creative going in. **ROUX** writes the sheet and runs
the checks. **Every Ads Manager change is Evan's yes, per change; publishing is his click.**
ROUX may work in Ads Manager through Chrome only on a yes for that specific ad, and only
until the draft is ready. It never presses Publish.

First run: Tailgate A + B, 2026-09-25 (done by hand, turned into this skill that day).
Next: retargeting, Mon Sept 28.

---

## 1. Read, in this order

1. `my-business (context)/hpc-standing-rules.md`: the Meta connector rules and copy non-negotiables.
2. `my-desk (now)/BOARD.md`: the ad's line in Now or Running, the ad set, the budget, any "replaces".
3. The **copy file** in `my-work (outputs)/content/ads/<campaign>/`. It must say approved.
   No approved copy, no sheet. Hand back to Maya.
4. `my-skills/hpc-ad-creative/work/creative/library/LIBRARY-LOG.md`: the approved PNGs.
   **Only library files, never `drafts/`.**
5. `my-desk (now)/decisions.md`: grep the ad set and campaign name. Placement and AI-setting
   calls are logged there.

## 2. Read the ad set before choosing sizes (connector, read-only)

Pull the target ad set: name, ID, status, budget, and **placements** (manual or Advantage+;
which of Feeds, Stories, Reels, Search, right column are on). If the connector can't return
placements, say so and have Evan confirm in Ads Manager ("excluded for this ad set" lines).

Match sizes to what the ad set actually serves:

| Placement on | Image | Size |
|---|---|---|
| Feeds (FB + IG) | 1:1 | 1080×1080 |
| Stories, Reels | 9:16 | 1080×1920 |
| Search results, right column | 1.91:1 | 1200×628 |

- A size with no placement stays out. Don't upload it "just in case." (`18qt_prospecting`
  has no Stories/Reels, so its 9:16s sit unused. Adding placements is Beau's call.)
- A placement with no size is a gap. Stop and flag it; Maya renders it first.
- 4:5 is organic only. Never in a paid set.
- Check each PNG's pixel size against its slot before it goes on the sheet.

Also pick the **ad to duplicate**: a live static-image ad in the same ad set, with the right
Page, Instagram account and pixel. Prefer one that stays on. If the ad set has none (a new
retargeting set), duplicate a static ad from another set and move it, and say so.

## 3. Write the build sheet

Save to `my-work (outputs)/content/ads/<campaign>/YYYY-MM-DD-<slug>-build-sheet.md`. One
block per ad:

- **Ad name**: `<adset-prefix>-<concept>` (e.g. `18qt-tailgate-kit-lineup`).
- **Duplicate from**: ad name + ID. **Into**: ad set name + ID.
- **Replaces**: the ad to pause once this one is on, if any.
- **Images**: each file's full path, and the placement it goes to.
- **Primary text, headline, CTA button**, pasted exactly from the approved copy file.
- **Website URL**, plus this URL-parameters string, unchanged:
  `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&utm_id={{campaign.id}}`
- **Off**: Shop, Messenger, Meta AI image and video generation, AI-extended crops (use plain
  padding), Enhance CTA, brightness and contrast, product browsing, and any auto-crop to a
  ratio we didn't make (e.g. 4:5). **Leave on**: Relevant comments (decisions 2026-09-25).
- **Before you publish**, the counts: "Review and publish (N)" as it stands now, and the N
  it should be after the build (one per new ad, plus any pause).

Then the Ads Manager steps, in plain words. Meta moves these menus often; the current path is:
Edit → Ad creative → **Customize media** → hover the image → **Select** → **Placements**
(not Aspect ratios) to map each image. If the screen doesn't match, say so rather than guess;
the latest runner notes are in `decisions.md`.

Open the library folder in Finder so the files are ready to drag in.

## 4. Before Evan presses Publish (the check that matters most)

Open **Review and publish** and read the list. **It must name only the new ads and any
planned pause.** If a live ad is in the list that isn't on the sheet, stop: it carries an
unpublished edit, and publishing sends that edit out too. Evan decides whether to discard
that ad's draft (its own *Discard draft*, never the top-bar *Discard drafts*).

Why: on 2026-09-25, `18qt-001` carried an unpublished edit (source untested: the duplicate
step, or an older opened Edit panel). The publish
that launched Tailgate A + B also swapped `001`'s creative (same copy and image, new FB and IG
post), which sent it back through review and reset its likes and comments.

Don't open a live ad's Edit panel to "just look." That alone queues edits (memory, 2026-09-10).

## 5. After Evan publishes: read back

For each new ad, from the ad's **Review tab** (`get_page_text`; the URL-parameters field reads
as empty through the browser tool even when filled) and the connector:

- Status Active or In review, in the right ad set.
- Page + Instagram account present (not Facebook-only).
- Website URL and the full UTM string.
- Each image on the right placement, with no Meta-added media or crops.
- The AI settings from the Off list are still off.
- "Review and publish" reads **0**.
- The connector's creative read is not proof of copy. A placement-customized creative returns
  no body or headline. Blank means "cannot read," never "empty"; confirm in the editor preview.

Then, if the sheet says **Replaces**: pause the old ad. That is its own write, so ask Evan
for a yes first.

## 6. Record it

- Board: the ad names and IDs go on the campaign's Running line. Paused ads come off.
- `decisions.md`: one entry if a placement or setting was decided during the build.
- `hpc-campaign-checkpoint/campaigns.md`: add the new ads if the campaign has a checkpoint.
- Anything Meta changed in the editor goes into this file's step 3, the same day.

## Quality check

- [ ] Copy is approved and pasted exactly; images come from `library/`, sized to real placements.
- [ ] Every ad has the full UTM string and Shop + Messenger off.
- [ ] "Review and publish" listed only the planned changes before publish, and reads 0 after.
- [ ] Read-back done from the Review tab and preview, not the connector's creative read alone.
- [ ] No write without Evan's yes for that change; ROUX never pressed Publish.
