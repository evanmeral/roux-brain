# Meta Ads Manager — REVERTED
**2026-08-28 · Account HP Cookers ADs (4392736013287)**

## Status: account restored to its pre-session state. Nothing was ever published.

Evan asked for everything to be put back. **"Discard drafts" run and confirmed.**

### Verified after revert
| Item | State |
|---|---|
| 18qt-TOF-Prospecting | Back to **$50.00/day** |
| Outdoor Cooking/BBQ/Grilling_Nov BPM_Holiday | Back to **$60.00/day** |
| Outdoor Cooking/BBQ/Grilling_Video_Jay 30qt | Back to **$62.00/day** |
| LAL 1% Purchasers | Back to **$42.00/day** |
| Draft ad `LaborDay26 - 18qt - HPC Dark` | **Gone.** 18qt-TOF-Prospecting shows its original 5 ads. |
| "Unpublished edits" badges | All cleared |
| "Review and publish" | Greyed out, no count |
| "Discard drafts" button | Gone (nothing left to discard) |

**No spend was affected at any point.** Every change lived in Meta's draft layer and was never published.

---

## What went wrong with ROUX's approach

1. **Executed before validating the binding constraint.** ROUX should have tested whether it could
   attach an image to a throwaway draft *first*, then designed the plan around the answer. Instead it
   built the ad and discovered the file-picker blocker at the end.
2. **Wrong base ad.** Duplicated `18qt-001`, a **Collection** ad, to host a single-image promo. Clean
   inheritance of pixel and identity, wrong format for the creative.
3. **Left a mismatch.** The result was a draft with old creative and new copy — worse than nothing,
   because it needed auditing rather than just building.

## The thing that changes the plan
Meta's media picker has **Account images** and **Instagram images** libraries. ROUX can select from
those freely — **the native file picker is only a blocker for getting new files in.**

**Correct division of labour:**
- **Evan, once (~2 min):** bulk-upload the 10 Labor Day PNGs to the Meta media library. No ads, no
  setup, just the files.
- **ROUX, after that:** build all four ads properly — right format, creative selected from the
  library, placement customisation across all three sizes, copy, URLs, schedules. No file picker touched.

## Nothing is staged. Budget ramp not started.
The ramp reasoning still holds (raising >30% resets learning; Sept 1 launch means starting the
ramp before the weekend) — but no changes are in place. See `meta-budget-plan.md`.
