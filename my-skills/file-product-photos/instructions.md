---
name: file-product-photos
description: Names and files a batch of HPC product photos Evan drops in the inbox as a cutout folder + a studio folder. Pairs each cutout with its studio shot, names both, copies them into the ad-creative asset library with bounds and an index entry, and renames Evan's originals to match so he can take them back out. Use when Evan says "new photos of the X in studio shot and cutout formats", "do the same thing we did with the photos", "name them and file them", or "/file-product-photos".
---

# File Product Photos

## Goal
Evan shoots a product, runs the shots through Photoroom, and drops two folders in
`my-inbox (new inputs)/`: one of **cutouts** (transparent PNG) and one of **studio shots**
(same shot on white). This skill turns that drop into named, indexed library assets that the
render pipeline can use straight away, and hands Evan back his originals under the same names.

Run three times by hand before it became a skill (2026-09-18 commercial 80/100/120 gal;
2026-09-21 140 gal; 2026-09-21 kit items). Every step below came from something Evan asked for
or corrected in those runs.

## Where things go
| What | Path |
|---|---|
| Cutouts | `my-skills/hpc-ad-creative/assets/product-cutouts/updated-2026-09/` |
| Studio shots | `my-skills/hpc-ad-creative/assets/studio-product-images/` |
| Cutout bounds | `my-skills/hpc-ad-creative/assets/product-cutouts/_bboxes.json`, keyed `updated-2026-09/<file>` |
| Index | `my-skills/hpc-ad-creative/assets/ASSET-INDEX.md`, one `###` section per batch |

⚠️ Don't move `assets/` or the `updated-2026-09/` subfolder. Templates reference art as
`../../../assets/`, and `prod.py` reads bounds by that key (CLAUDE.md, structural invariants).

## Steps

### 1. See what came in
List both folders with pixel sizes (`sips -g pixelWidth -g pixelHeight`). Typical: cutouts
1800×2400, studio 1512×2016 (burner shots can be landscape). Note any shot that is in one
folder and not the other.

### 2. Look at every photo
Make a contact sheet of each folder with Pillow (thumbnail ~450×600, cutouts composited on
gray so the edges show) into the scratchpad, and **read it**. Zoom in on anything unclear at
~700 px. Never name a file from its number alone.

### 3. Pair cutouts with studio shots
Photoroom numbers usually line up (`IMG_8347` ↔ `IMG_8347`). **Confirm each pair by eye
anyway.** Numbers break (the 140 gal basket-open cutout came in as `IMG_boo`) and some shots
exist in only one folder.

### 4. Name each shot
Match the names already in the library (`ls` both folders for the product first). The pattern
is `product - config - shot`:

- Cookers and pots: `18qt - pwd - lid on, front` · `30qt - perf - lid on, three-quarter`
  (`pwd` = Powered, `perf` = Performance pot).
- Commercial boilers: `[size]gal commercial - propane - [shot]`, e.g.
  `140gal commercial - propane - basket raised, basket open, regulator`. They are propane
  (Evan, 2026-09-18 and 2026-09-21). The basket alone is `[size]gal commercial basket - standalone`.
- Kits: `Tailgate fry kit - 18qt pwd, leg extensions, thermometer, skimmer, regulator`. Take the
  parts from the kit build record (`my-work (outputs)/internal/2026-09-16-kit-build-record.md`).
- Parts: `Skimmer - standalone` · `5in fry thermometer - in package`.

**Evan's words, use them** (decisions.md, 2026-09-18 and 2026-09-21):
- The dropped front panel on a commercial basket is **"basket open"**, not "front door open".
- The underside shot is **"burner"**, not "burner underside".
- **"regulator"** covers the hose and regulator. Put it in a name only when it's visible in that frame.
- The 18 QT fryer and every turkey fryer have the **same bottom**. A close-up can't tell you
  the size, so ask.

**If you can't tell the size or model from the frame, don't guess.** File it with the best
name, mark it ⚠️ in the index row, and ask Evan in the report. Also ask when a fact isn't on
file, like the fuel type of a new size. Say what you assumed and mark it unconfirmed.

### 5. Copy into the library
Use `cp -n` (never overwrite), with the same base name in both library folders. **Copy; don't
move.** Evan keeps the originals.

### 6. Rename Evan's originals in the inbox
Rename both inbox folders' files to the same names (`mv -n`), then `cmp` each one against its
library copy and report that they all match. **Don't skip this.** Evan asked for it after the
2026-09-21 run left his originals as `IMG_…`. Leave the folders in the inbox; Evan takes them
out himself.

### 7. Fill any missing cutout
If a shot has a studio version but no cutout, make one from the studio shot with macOS's
subject lift (Vision). The Swift toolchain on this Mac is broken, so use the JXA script in this folder:

```bash
osascript -l JavaScript "my-skills/file-product-photos/lift-subject.js" "<studio.png>" "<out.png>"
```

It prints `ok instances=N`. Composite the result on a strong color (e.g. blue), read it,
check the edges and that nothing was punched out, then compare a few product pixels with the
source to confirm the colors held. File it like the others, and put a copy in Evan's inbox
cutout folder too. The index row says Atlas made it and gives its size (it stays at studio
size, e.g. 1512×2016).

Don't use `pngtool.py key` on studio shots. It keys by brightness, so it eats silver metal on
a white background.

### 8. Bounds
```bash
python3 my-skills/hpc-ad-creative/work/creative/pngtool.py bbox "<cutout>.png" ...
```
Merge each result into `_bboxes.json` under `updated-2026-09/<file name>`, then re-save it with
`indent=1`. Cutouts only; studio shots don't get bounds.

### 9. Index
Add a `###` section to `ASSET-INDEX.md` under the product-cutouts part, after the last batch:
- title and date added, and the counts (N cutouts + N studio)
- where they came from, that Evan kept the originals, and how pairs were matched
- sizes, and that bounds are in `_bboxes.json`
- the names: a list, or a table (file · what it shows · where it's used) when the shots differ a lot
- anything missing on purpose (say so, so no one flags it later) and anything ⚠️ unconfirmed

**Copy rules don't apply to photos.** Patent-pending signage, Made in USA stickers and the
like inside a real photo are fine. Don't crop or flag them (Evan, 2026-09-18).

### 10. Report
Keep it short:
- a table of each final name → the source number(s)
- where they went and what was indexed
- what you assumed, and anything ⚠️ that needs Evan's eye
- anything missing compared with the product's other sizes, so he can say whether it's on purpose

Then stop. Don't commit here; `/wrap` does that. Batch changes to the board go in at wrap: add
the batch to the product-image line in Parked, and add one line to PLAN.md's Off-plan log.

## Quality check
- Every photo was looked at, and every pair was confirmed by eye.
- Names follow the library's existing pattern and Evan's words.
- Library copies and renamed originals match byte for byte.
- Every cutout has a `_bboxes.json` entry. The index has the section.
- Nothing was overwritten (`-n` everywhere). Nothing was deleted.
- Guesses are marked as guesses. No size or fuel type was assumed silently.
