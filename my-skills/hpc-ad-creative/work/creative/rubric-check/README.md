# rubric-check

The pass/fail gate for ad and social creative. **Every rendered piece passes it before Evan sees
it.** Approved by Evan 2026-09-22; built by Nova. The idea: work to a rubric instead of hoping.

It prints one line per rubric item, `PASS` / `WARN` / `FAIL`, with the reason. Every non-PASS
line also quotes the brain file its rule comes from. It exits 1 on any FAIL.

- **FAIL** means do not show Evan. Fix it and re-render.
- **WARN** means a person looks before showing. It does not block.
- If a check itself breaks (Chrome missing, template won't load), that is a **FAIL** and it says so.

Python 3.9, standard library only. It uses Chrome (like `build.sh`), `node` (for `lint.js`) and
`sips` (built into macOS).

## Run it

From `work/creative/`:

```bash
python3 rubric-check/rubric_check.py templates/x/1x1.html drafts/x-1x1.png   # template + render
python3 rubric-check/rubric_check.py drafts/x-1x1.png                        # template found automatically
python3 rubric-check/rubric_check.py drafts/cw-2026-09-28                    # every PNG in a folder
  --placement paid|organic|story   pin the slot (build-set.sh passes paid, build-carousel.sh organic)
  --product <slug>                 fresh-idea compares with the last two library pieces for this product
  --library <dir>                  compare against another library (tests use this)
  --quiet                          hide detail lines on PASS items
```

**Finding the template.** `build.sh` now writes one line per render to a hidden
`.rubric-sources.tsv` beside the PNG. That is how a PNG is paired with its HTML. Failing that, it
tries the `build-set.sh` and `build-carousel.sh` names. A PNG with no template is a FAIL, because
type, copy and shadows cannot be read from pixels.

## Where it runs on its own

| Script | What happens |
|---|---|
| `build-set.sh` | Checks all three paid sizes after rendering (`--placement paid`; the organic 4:5 without a pin). Exits 1 on any FAIL. |
| `build-carousel.sh` | Checks the whole frame folder with `--placement organic`. Exits 1 on any FAIL. |
| `approve.sh` | Checks the draft before archiving. On a FAIL it **refuses**, unless Evan approved it as is. Then add `--waive "<Evan's words>"`, and his words go into the library log. Never waive on your own judgment. |
| `build.sh` | Only records which template made the PNG. A single render is not checked. Run the check yourself. |

## The rubric

| Item | FAIL when | WARN when | Rule from |
|---|---|---|---|
| `canvas` | PNG isn't 1080×1080, 1080×1920, 1200×628 or 1080×1350. Template authored at another size than the PNG. Size doesn't fit `--placement`, e.g. 4:5 in a paid set. | | instructions.md rule 9; memory `meta-paid-ad-sizes` |
| `template` | No template paired, or it won't load | | CLAUDE.md, every fact has a source |
| `assets` | Any `<img>` fails to load (what moving `assets/` does) | | CLAUDE.md structural invariant |
| `logo` | | No logo found; circle logo used (its art says "patent pending") | rule 1; logo-variant note |
| `type-floors` | Any text run under its floor. Or no line reaches headline size. | A non-fine-print line under 60% opacity | rule 7; memory `readable-type-at-phone-size` |
| `safe-zone` | | 9:16 type in the top 250px or bottom 340px | rule 9 |
| `copy-rules` | Any `lint.js` error | Any `lint.js` warning (patent number, "cast", prices, unqualified numbers…) | `lint.js`, which quotes hpc-standing-rules.md, SAFETY.md, how-we-sound.md, BOARD.md |
| `centering` | Product off its area's centre by more than ±50px (scaled), both numbers agreeing | The two numbers disagree (thin accessory); can't separate product from backdrop; cutout not in a `.pbox` | rules 2 and 12; memory `optical-centering-not-bbox` |
| `pbox-shadow` | `filter: drop-shadow` or `box-shadow` on an `img` inside `.pbox` | | rule 8; memory `no-gray-box-around-cutouts` |
| `fresh-idea` | never | Layout and palette closely match the latest library piece of the same size | rule 11; memory `fresh-idea-every-creative` |

### How each one reads the piece

- **Type floors.** A copy of the template is loaded in Chrome at the PNG's size, with a probe
  script added. The probe reads each visible text run's computed `font-size`. Floors on a 1080
  frame: headline 72, body 36, other info 30, fine print 20. They scale by width/1080, so a
  1200×628 needs 80 / 40 / 33 / 22. What a line *is*:
  1. `data-rubric="headline|body|info|fine"` on the element or any ancestor wins. **Use this when
     the guess is wrong.** It is the honest way to mark fine print.
  2. Class or tag names: `headline hl h1 hed hero` → headline. `body sub subhead subline copy lede
     dek desc para` → body. `fine fineprint legal disclaimer terms footnote smallprint` → fine.
  3. Text starting `*`/`†`, or a disclaimer phrase ("times vary", "terms apply"…) → fine print.
  4. Seven or more words → body. Everything else → info (30px).
  The largest line on the frame must also reach headline size.
- **Copy rules.** Visible text is grouped by block (a `<span>` stays with its line) and each block
  goes through `lint.js` in the `graphic` field. There is one copy of the rules, and this tool
  doesn't restate them. The **5-year warranty** rule reads the whole creative at once, because the
  qualifiers often sit in another box. SAFETY.md's single-pot exception: "5-YR RESIDENTIAL" with no
  size qualifier, and exactly one ≤120 QT pot cutout and no steamer or commercial cutout in frame.
  That turns the FAIL into a WARN to confirm by eye. A steamer, gallon or commercial cutout marks
  the piece commercial, so any 5-year claim FAILs.
- **Centering.** For each `.pbox` the product is measured on the PNG with `check-centering.py`'s
  `measure()`, the same metal-pixel threshold. The scan is limited to the product's own box, so type
  beside it isn't counted. It is compared with the centre of the product's **free area** (rule 12):
  the nearest ancestor meaningfully wider than the product, narrowed by any type set beside the
  product. "Beside" means vertically inside the middle 60% of the product's box. If the guess is
  wrong, put `data-rubric-area` on the element that is the product's space. Horizontal only.
- **Fresh idea.** Both PNGs are shrunk to a 24×24 grid with `sips`. Two numbers come out:
  structure (how closely the light and dark layout lines up) and palette (colour distance). WARN
  when structure ≥ 0.80 **and** palette ≥ 0.85. It compares against the most recent library date's
  pieces of the same pixel size, or with `--product`, that product's last two. A library piece is
  only compared with pieces dated before it.
  Calibration on the library, 2026-09-22: the Labor Day dark sitewide ad against the 18 QT dark
  evergreen scored 0.88–0.90 / 0.96–0.97. That is the "same template, new words" case the rule is
  about, and it WARNs. Unrelated concepts scored 0.64 or lower. Resizes and revisions of one concept
  score 0.64–1.0, so a revision of the latest piece will WARN. That is expected: read the WARN.

## What it cannot check (a person still has to look)

- **Whether the product fills its space (rule 12).** That is a judgment about the composition, so
  it isn't checked. Look at it.
- **Anything baked into an image.** Type inside a photo or PNG, the patent number on the shield
  art, and gray-box lines drawn into the cutout file itself. It reads live HTML text only. Text
  from CSS `::before`/`::after` is not read either.
- **Whether a line is "fine print."** That comes from the hints above. A 24px footer with no hint is
  treated as information and FAILs. Rule 7 says a footer is not fine print, so that is usually right.
  Tag real fine print `data-rubric="fine"`.
- **Floors are floors, not targets** (Evan, 2026-09-17). A PASS doesn't mean the type reads well
  at phone size. Still look at the PNG at ~380px wide.
- **Type touching type, borders or the product (rule 5), overlaps, clipping.** Look at it.
- **Claims `lint.js` can't see.** It reads words, not meaning. Fryers shown with crawfish art, a
  Powered label on a Performance pot image (the Platinum Bundle rule), and prices out of date in
  Shopify (the linter only knows `what-we-sell.md`) are not caught.
- **Centering on light or metallic backgrounds.** The metal threshold can't separate the product
  from a cream or white backdrop. It WARNs and says so. Vertical centering isn't measured.
- **Borders and dividers** as free-area limits. Only type and the container count.
- **Fresh idea is a crude signal.** Same structure plus palette is caught. A new layout with the old
  type treatment is not. A PASS doesn't mean the idea is fresh. Rule 11's real test is still
  putting the render beside the last two ads for that product.
- **Logo presence** is by file name ("logo" in an `img` src or background). A logo drawn another way
  is missed, and it will WARN.
- **Video.** PNG only.

## Files

```
rubric-check/
  rubric_check.py          the tool (also importable: check_piece(png, template, placement, library, product))
  README.md                this file
  fixtures/*.html          one bad and one clean case per check (clean-1x1.html is clean for all)
  test/test_rubric_check.py   renders every fixture with build.sh into a temp folder and checks it
```

Run the tests from `work/creative/` with `python3 rubric-check/test/test_rubric_check.py`. They
take about 2–3 minutes (Chrome runs twice per fixture) and exit 1 on any failure.

Fixtures live at the same depth as `templates/<concept>/`, so `../../../../assets/` resolves the
same way. **Do not move them** (structural invariant).

## Changed elsewhere to make this work

- `build.sh` appends to `<outdir>/.rubric-sources.tsv` (hidden; never fails the build).
- `check-centering.py` `measure()` takes an optional `xband=(x0, x1)`. The command line is unchanged.
- `pngtool.py`'s command line is guarded by `if __name__ == "__main__"` so it can be imported.
- `lint.js` reads competitor names only from the "## The field" table of `competitors.md`. It used
  to also read the "Why HPC wins" table and flag **"warranty", "fuel", "speed", "material"** as
  competitor names in every caption (found by this tool's tests, 2026-09-22).
