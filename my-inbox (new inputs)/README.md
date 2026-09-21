# Inbox: drop new files here

**Evan drops files here, and ROUX sorts them.** Photos, videos, PDFs, screenshots, anything, with any filename.
Say "sort my inbox folder", or /prime will mention anything waiting.

## What ROUX does with each file
1. **Opens it and looks at it.** iPhone photos are often HEIC even when the name says `.PNG`, so check with `file`.
   Convert HEIC to full-resolution JPEG; the render pipeline can't read HEIC.
2. **Names it** in lowercase with hyphens: what it shows, then the date. The date comes from the photo's own metadata
   (`mdls -name kMDItemContentCreationDate`), not the drop date.
   Example: `hpc-team-crawfish-cookoff-booth-2026-04.jpg`
3. **Moves it where it belongs:**

| What it is | Where it goes |
|---|---|
| Lifestyle, event, team, food or in-use photo | `my-skills/hpc-ad-creative/assets/lifestyle/` + a row in `assets/ASSET-INDEX.md` |
| Product cutout (transparent background) | `my-skills/hpc-ad-creative/assets/product-cutouts/` + index |
| Studio product shot | `my-skills/hpc-ad-creative/assets/studio-product-images/` + index |
| Logo or brand reference | `my-skills/hpc-ad-creative/assets/brand-refs/` + index |
| Document, brochure, spec sheet, price list | `my-files (knowledge)/` (HPC reference material → `hpc-reference/`) |
| Report or data export | `my-work (outputs)/internal/reports/` |
| Anything unclear | Leave it here and ask Evan |

4. **Describes what's in it** in its index row. Copy rules (patent-pending, Made in USA, warranty wording) apply to words we write on creative, **not** to signage that happens to be in a real photo (Evan, 2026-09-18). Don't crop or flag a photo for that.
5. **Leaves this folder empty** except for this README. Originals that were converted go to the Trash, not deleted.
   **Exception: product photo batches (a cutout folder + a studio folder) → run `/file-product-photos`**, which covers all of this.
   **Product photo batches Evan wants to keep** ("make copies so I can take them back out").
   Copy them to the library, then **rename the originals here to the same names** and leave them for
   Evan to take out. Add any cutout ROUX made (e.g. from a studio shot) to his folder too (Evan, 2026-09-21).
