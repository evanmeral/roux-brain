#!/usr/bin/env python3
"""rubric-check tests: every check gets at least one bad fixture and one clean one.

  python3 rubric-check/test/test_rubric_check.py          (from work/creative; exit 1 on any failure)

Each fixture in rubric-check/fixtures/ is rendered with the real build.sh into a throwaway temp
folder, then checked. Nothing is written inside the brain except the ._rubric-probe copy that
rubric-check makes and removes beside each fixture. Needs Chrome and node, like the tool itself.
"""
import os
import shutil
import subprocess
import sys
import tempfile
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
TOOL = os.path.dirname(HERE)
CREATIVE = os.path.dirname(TOOL)
FIX = os.path.join(TOOL, "fixtures")
sys.path.insert(0, TOOL)
import rubric_check as rc  # noqa: E402

TMP = tempfile.mkdtemp(prefix="rubric-check-test-")
EMPTY_LIB = os.path.join(TMP, "empty-library")
os.makedirs(EMPTY_LIB)
_renders = {}


def render(fixture, size="1080x1080", name=None):
    """Render a fixture with the real build.sh; cached per (fixture, size)."""
    key = (fixture, size, name)
    if key not in _renders:
        out = os.path.join(TMP, name or "%s_%s.png" % (fixture[:-5], size))
        r = subprocess.run([os.path.join(CREATIVE, "build.sh"), os.path.join(FIX, fixture), size, out],
                           cwd=CREATIVE, capture_output=True, text=True)
        assert os.path.exists(out), "build.sh did not render %s: %s" % (fixture, r.stderr)
        _renders[key] = out
    return _renders[key]


_checked = {}


def run(fixture, size="1080x1080", placement=None, library=EMPTY_LIB, template=True):
    """Check a rendered fixture; cached, since each check_piece runs Chrome twice."""
    key = (fixture, size, placement, library, template)
    if key not in _checked:
        png = render(fixture, size)
        tpl = os.path.join(FIX, fixture) if template else None
        _checked[key] = {r["id"]: r for r in rc.check_piece(png, tpl, placement, library)}
    return _checked[key]


def text(r):
    return r["summary"] + " | " + " | ".join(r["details"])


class Canvas(unittest.TestCase):
    def test_clean_paid_square(self):
        self.assertEqual(run("clean-1x1.html", placement="paid")["canvas"]["status"], "PASS")

    def test_bad_not_a_placement_size(self):
        r = run("bad-canvas.html", "1000x1000")["canvas"]
        self.assertEqual(r["status"], "FAIL", text(r))

    def test_bad_rendered_at_wrong_size(self):
        r = run("clean-1x1.html", "1080x1350")["canvas"]
        self.assertEqual(r["status"], "FAIL", text(r))
        self.assertIn("authored at 1080x1080", r["summary"])

    def test_bad_4x5_in_a_paid_set(self):
        self.assertEqual(rc.check_canvas(1080, 1350, None, "paid")[0], "FAIL")

    def test_clean_4x5_organic(self):
        self.assertEqual(rc.check_canvas(1080, 1350, None, "organic")[0], "PASS")

    def test_bad_square_for_organic_feed(self):
        self.assertEqual(run("clean-1x1.html", placement="organic")["canvas"]["status"], "FAIL")


class TypeFloors(unittest.TestCase):
    def test_clean(self):
        r = run("clean-1x1.html")["type-floors"]
        self.assertEqual(r["status"], "PASS", text(r))

    def test_bad_small_headline_small_info_faded_line(self):
        r = run("bad-type.html")["type-floors"]
        self.assertEqual(r["status"], "FAIL", text(r))
        t = text(r)
        self.assertIn("60px < headline floor 72px", t)
        self.assertIn("24px < info floor 30px", t)
        self.assertIn("faded to 40%", t)

    def test_fine_print_at_22px_is_allowed(self):
        r = run("clean-1x1.html")["type-floors"]
        self.assertIn("smallest 22px", r["summary"])

    def test_floors_scale_with_width(self):
        p = {"texts": [{"text": "SHOP NOW", "size": 31, "alpha": 1, "hints": ["div"], "tag": None, "el": "div",
                        "rect": {}}, {"text": "Big", "size": 90, "alpha": 1, "hints": ["h1"], "tag": None,
                                      "el": "h1", "rect": {}}]}
        self.assertEqual(rc.check_type(p, 1080)[0], "PASS")
        self.assertEqual(rc.check_type(p, 1200)[0], "FAIL")      # 30 x 1200/1080 = 33.3px floor


class SafeZone(unittest.TestCase):
    def test_clean_story(self):
        r = run("story-clean.html", "1080x1920")["safe-zone"]
        self.assertEqual(r["status"], "PASS", text(r))

    def test_bad_story(self):
        r = run("story-unsafe.html", "1080x1920")["safe-zone"]
        self.assertEqual(r["status"], "WARN", text(r))


class CopyRules(unittest.TestCase):
    def test_clean_with_warranty_qualifiers_in_separate_boxes(self):
        r = run("clean-1x1.html")["copy-rules"]
        self.assertEqual(r["status"], "PASS", text(r))

    def test_bad_copy(self):
        r = run("bad-copy.html")["copy-rules"]
        self.assertEqual(r["status"], "FAIL", text(r))
        for rule in ("made-in-usa", "cast-aluminum", "competitor-name", "warranty-5yr"):
            self.assertIn(rule + ":", text(r))

    def test_patent_number_is_only_a_warn(self):
        r = run("warn-patent.html")["copy-rules"]
        self.assertEqual(r["status"], "WARN", text(r))
        self.assertIn("patent-number", text(r))

    def test_single_qualifying_pot_exception_is_a_warn(self):
        r = run("warranty-single-pot.html")["copy-rules"]
        self.assertEqual(r["status"], "WARN", text(r))
        self.assertIn("SAFETY.md exception may apply", text(r))

    def test_warranty_on_a_steamer_fails(self):
        r = run("warranty-steamer.html")["copy-rules"]
        self.assertEqual(r["status"], "FAIL", text(r))
        self.assertIn("steamer or commercial", text(r))


class Centering(unittest.TestCase):
    def test_clean(self):
        r = run("clean-1x1.html")["centering"]
        self.assertEqual(r["status"], "PASS", text(r))

    def test_bad_pushed_right(self):
        r = run("bad-center.html")["centering"]
        self.assertEqual(r["status"], "FAIL", text(r))
        self.assertIn("Nudge about -1", text(r))           # about -170

    def test_free_area_bounded_by_type(self):
        a = {"x": 0, "w": 1080}
        box = {"x": 700, "y": 400, "w": 300, "h": 400}
        beside = {"rect": {"x": 60, "y": 580, "w": 560, "h": 40}}
        grazing = {"rect": {"x": 60, "y": 390, "w": 600, "h": 40}}     # only touches the top: ignored
        self.assertEqual(rc.free_span(box, a, [beside, grazing])[:2], (620, 1080))


class PboxShadow(unittest.TestCase):
    def test_clean(self):
        self.assertEqual(run("clean-1x1.html")["pbox-shadow"]["status"], "PASS")

    def test_bad(self):
        r = run("bad-shadow.html")["pbox-shadow"]
        self.assertEqual(r["status"], "FAIL", text(r))
        self.assertIn("drop-shadow", text(r))


class LogoAndAssets(unittest.TestCase):
    def test_clean(self):
        res = run("clean-1x1.html")
        self.assertEqual(res["logo"]["status"], "PASS")
        self.assertEqual(res["assets"]["status"], "PASS")

    def test_no_logo(self):
        self.assertEqual(run("no-logo.html")["logo"]["status"], "WARN")

    def test_broken_image(self):
        r = run("broken-img.html")["assets"]
        self.assertEqual(r["status"], "FAIL", text(r))
        self.assertIn("HPC-Shield-MOVED.png", text(r))


class FreshIdea(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.lib_same = os.path.join(TMP, "lib-same")
        cls.lib_diff = os.path.join(TMP, "lib-diff")
        os.makedirs(cls.lib_same)
        os.makedirs(cls.lib_diff)
        shutil.copy(render("clean-1x1.html"), os.path.join(cls.lib_same, "2026-01-02_80qt-powered_street_1080x1080_v1.png"))
        shutil.copy(render("different-1x1.html"), os.path.join(cls.lib_diff, "2026-01-02_80qt-powered_split_1080x1080_v1.png"))

    def test_bad_same_layout_as_latest(self):
        r = run("clean-1x1.html", library=self.lib_same)["fresh-idea"]
        self.assertEqual(r["status"], "WARN", text(r))

    def test_clean_different_layout(self):
        r = run("clean-1x1.html", library=self.lib_diff)["fresh-idea"]
        self.assertEqual(r["status"], "PASS", text(r))

    def test_only_same_size_compared(self):
        r = run("story-clean.html", "1080x1920", library=self.lib_same)["fresh-idea"]
        self.assertEqual(r["status"], "PASS", text(r))
        self.assertIn("no earlier 1080x1920", r["summary"])


class Gate(unittest.TestCase):
    def test_all_clean_fixture_has_no_fail(self):
        res = run("clean-1x1.html", placement="paid")
        self.assertEqual([k for k, r in res.items() if r["status"] != "PASS" and k != "fresh-idea"], [])

    def test_png_without_a_template_fails(self):
        lone = os.path.join(TMP, "lone")
        os.makedirs(lone, exist_ok=True)
        png = os.path.join(lone, "orphan.png")
        shutil.copy(render("clean-1x1.html"), png)
        res = {r["id"]: r for r in rc.check_piece(png, None, None, EMPTY_LIB)}
        self.assertEqual(res["template"]["status"], "FAIL")
        self.assertEqual(res["type-floors"]["status"], "FAIL")

    def test_cli_exit_codes(self):
        py = [sys.executable, os.path.join(TOOL, "rubric_check.py")]
        ok = subprocess.run(py + [render("clean-1x1.html"), "--library", EMPTY_LIB, "--quiet"],
                            capture_output=True, text=True)
        self.assertEqual(ok.returncode, 0, ok.stdout)              # paired through build.sh's index
        bad = subprocess.run(py + [os.path.join(FIX, "bad-copy.html"), render("bad-copy.html"), "--library", EMPTY_LIB],
                             capture_output=True, text=True)
        self.assertEqual(bad.returncode, 1, bad.stdout)
        self.assertIn("FAIL  copy-rules", bad.stdout)


if __name__ == "__main__":
    try:
        prog = unittest.main(exit=False, verbosity=2)
        ok = prog.result.wasSuccessful()
    finally:
        shutil.rmtree(TMP, ignore_errors=True)
    sys.exit(0 if ok else 1)
