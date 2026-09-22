#!/usr/bin/env python3
"""rubric-check: the pass/fail gate every rendered ad or social creative clears before Evan sees it.

  python3 rubric-check/rubric_check.py templates/x/1x1.html drafts/x-1x1.png
  python3 rubric-check/rubric_check.py drafts/x-1x1.png            # template found from build.sh's index
  python3 rubric-check/rubric_check.py drafts/cw-2026-09-28        # every PNG in a drafts folder
  options:  --placement paid|organic|story   --product <library slug>   --library <dir>   --quiet

Prints one line per rubric item, PASS / WARN / FAIL, with the reason and the brain file the rule
comes from. Exits 1 on any FAIL, 0 otherwise. Run from work/creative (paths are relative to it,
but absolute paths work from anywhere).

How it sees the piece: it loads a COPY of the template in headless Chrome at the PNG's pixel size,
with a small probe script added, and reads the computed styles (font sizes, filters, image loads,
element boxes). It measures centring and layout similarity on the rendered PNG itself.
Approved by Evan 2026-09-22 (Nova build). What it cannot check: rubric-check/README.md.
"""
import html as htmlmod
import importlib.util
import json
import os
import re
import struct
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.realpath(__file__))
CREATIVE = os.path.dirname(HERE)                         # work/creative
VAULT = os.path.abspath(os.path.join(CREATIVE, "..", "..", "..", ".."))
LINT_JS = os.path.join(VAULT, "my-workflows (automations)", "live", "post-scheduler", "lint.js")
LIBRARY = os.path.join(CREATIVE, "library")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
INDEX = ".rubric-sources.tsv"                            # written by build.sh next to each render

sys.path.insert(0, CREATIVE)
import pngtool  # noqa: E402  (read_png, no Pillow on this machine)

_spec = importlib.util.spec_from_file_location("check_centering", os.path.join(CREATIVE, "check-centering.py"))
centering_tool = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(centering_tool)

# ---------------------------------------------------------------------------------------------
# The rules, each with the brain file it comes from. Change the rule THERE first, then here.
# ---------------------------------------------------------------------------------------------
SRC = {
    "canvas": 'hpc-ad-creative/instructions.md rule 9: "Paid static | 1:1 + 9:16 + 1.91:1 in one ad '
              '· never 4:5" · "Organic feed post, every carousel frame | 1080×1350 (4:5)" · "Story, reel '
              '(organic) | 1080×1920 (9:16)". Memory meta-paid-ad-sizes.md: "4:5 (1080×1350) is an organic size only."',
    "template": 'CLAUDE.md: "Every fact carries its source." Without the HTML, type size, copy and the '
                '.pbox shadow cannot be read, so the gate cannot be cleared.',
    "assets": 'CLAUDE.md structural invariant: "assets/ must stay exactly three levels above templates/ ... '
              'Moving either folder breaks every template silently."',
    "logo": 'hpc-ad-creative/instructions.md rule 1: "Logo always present unless deliberately omitted for a '
            'reason." Logo variants: "The circle logo says \'patent pending\' — the patent has issued. Prefer the shield."',
    "type-floors": 'hpc-ad-creative/instructions.md rule 7: "On a 1080-wide frame, feed or story: headlines '
                   '72px+ · body and sub-copy 36px+ · every other line that says something ... 30px+ ... never '
                   'faded below ~60% white. Only fine print is exempt ... and it keeps a 20px floor." '
                   'Memory readable-type-at-phone-size.md: "the minimums are floors, not targets."',
    "safe-zone": 'hpc-ad-creative/instructions.md rule 9: "Story, reel (organic) | 1080×1920 (9:16) · type out '
                 'of the top 250px and bottom 340px". README.md: "platform UI covers it."',
    "copy-rules": 'my-workflows (automations)/live/post-scheduler/lint.js, run on every visible text string. '
                  'Each finding quotes its own rule file (hpc-standing-rules.md, SAFETY.md, how-we-sound.md, BOARD.md).',
    "centering": 'hpc-ad-creative/instructions.md rule 2: "Product centred — the product itself, not the image '
                 'file ... Both numbers inside ±50px." Rule 12: "the target is the centre of that free area, not '
                 'the frame centre." Memory optical-centering-not-bbox.md.',
    "pbox-shadow": 'hpc-ad-creative/instructions.md rule 8: "The usual cause is a drop-shadow on `.pbox img`: '
                   '`.pbox` clips, so the shadow is sliced into a box. Put the filter on `.pbox`, never on the img '
                   'inside it." Memory no-gray-box-around-cutouts.md.',
    "fresh-idea": 'hpc-ad-creative/instructions.md rule 11: "never a copy-paste of the last creative\'s layout, '
                  'palette and type treatment ... put the new render next to the last two ads for the same product. '
                  'If it reads as the same ad with new words, start over." Memory fresh-idea-every-creative.md.',
}

# rule 9 table, exact pixel sizes
PLACEMENTS = {
    (1080, 1080): ("paid 1:1", {"paid"}),
    (1080, 1920): ("paid 9:16 / organic story or reel", {"paid", "story"}),
    (1200, 628): ("paid 1.91:1", {"paid"}),
    (1080, 1350): ("organic 4:5 feed post or carousel frame", {"organic"}),
}

# rule 7 floors on a 1080-wide frame
FLOORS = {"headline": 72, "body": 36, "info": 30, "fine": 20}
FADE_MIN = 0.6
CENTER_TOL = 50            # rule 2, on a 1080 frame
SAFE_TOP, SAFE_BOTTOM = 250, 340

# Class-name hints for what a line is. data-rubric="headline|body|info|fine" on the element (or any
# ancestor) overrides all of these. Anything unhinted is "info" (30px floor) unless it reads as a
# sentence (7+ words -> body) or as fine print (starts with * or a disclaimer phrase).
HINTS = {
    "headline": {"headline", "hl", "h1", "hed", "hero"},
    "body": {"body", "sub", "subhead", "subline", "copy", "lede", "dek", "desc", "para"},
    "fine": {"fine", "fineprint", "legal", "disclaimer", "disclaim", "terms", "footnote", "smallprint"},
}
FINE_TEXT = re.compile(r"^\s*[*†‡]|\b(?:times vary|results vary|vary with|terms apply|exclusions apply|"
                       r"restrictions apply|see site for|while supplies last|not valid with)\b", re.I)

# ---------------------------------------------------------------------------------------------
# Probe: runs inside the page, reads computed styles, writes JSON into the DOM for --dump-dom.
# ---------------------------------------------------------------------------------------------
PROBE = r"""
<script>
(function(){
function alphaOf(c){const m=(c||'').match(/rgba?\(([^)]+)\)/);if(!m)return 1;
  const p=m[1].split(/[\s,\/]+/).filter(Boolean);return p.length>=4?parseFloat(p[3]):1}
function desc(el){if(!el||!el.tagName)return'?';const c=(typeof el.className==='string'&&el.className.trim())?'.'+el.className.trim().split(/\s+/).join('.'):'';return el.tagName.toLowerCase()+c}
function R(r){return{x:+r.left.toFixed(1),y:+r.top.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}}
function run(){
  // W,H = the PNG's size, filled in by Python. innerWidth/innerHeight are reported so Python can
  // correct the window: in --dump-dom mode Chrome keeps ~87px of the window for its own chrome.
  const W=__W__,H=__H__,out={W,H,vw:innerWidth,vh:innerHeight,texts:[],pboxes:[],loose:[],logos:[],broken:[]};
  const blocks=new Map();let nb=0;
  const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while((n=tw.nextNode())){
    const raw=n.textContent.replace(/\s+/g,' ').trim(); if(!raw)continue;
    const el=n.parentElement; if(!el||el.closest('script,style,noscript,template,#__rubric_out'))continue;
    if(el.checkVisibility&&!el.checkVisibility({opacityProperty:true,visibilityProperty:true}))continue;
    const rg=document.createRange();rg.selectNodeContents(n);
    let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
    for(const r of rg.getClientRects()){if(r.width<1||r.height<1)continue;
      x0=Math.min(x0,r.left);y0=Math.min(y0,r.top);x1=Math.max(x1,r.right);y1=Math.max(y1,r.bottom)}
    if(x1<0||x0>=W||y0>=H||x1<=0||y1<=0)continue;
    const cs=getComputedStyle(el);
    let b=el;while(b&&b!==document.body&&getComputedStyle(b).display.startsWith('inline'))b=b.parentElement;
    if(!blocks.has(b))blocks.set(b,nb++);
    let op=1,clip=false,a=el;const hints=[];
    while(a&&a.nodeType===1){const s=getComputedStyle(a);op*=parseFloat(s.opacity);
      if(s.backgroundClip==='text'||s.webkitBackgroundClip==='text')clip=true;
      if(a===document.body)break;a=a.parentElement}
    a=el;while(a&&a.nodeType===1){hints.push(a.tagName.toLowerCase());
      if(typeof a.className==='string')hints.push(...a.className.split(/[\s_-]+/).filter(Boolean).map(s=>s.toLowerCase()));
      if(a===b)break;a=a.parentElement}
    const tagged=el.closest('[data-rubric]');
    const fill=cs.webkitTextFillColor||cs.color;
    out.texts.push({text:raw,size:parseFloat(cs.fontSize),weight:cs.fontWeight,
      alpha:+((clip?1:Math.min(alphaOf(cs.color),alphaOf(fill)))*op).toFixed(3),
      transform:cs.textTransform,block:blocks.get(b),hints,
      tag:tagged?tagged.getAttribute('data-rubric'):null,el:desc(el),
      rect:{x:+x0.toFixed(1),y:+y0.toFixed(1),w:+(x1-x0).toFixed(1),h:+(y1-y0).toFixed(1)}});
  }
  for(const pb of document.querySelectorAll('.pbox')){
    const pr=pb.getBoundingClientRect(),ps=getComputedStyle(pb);
    let c=pb.closest('[data-rubric-area]');
    if(!c){c=pb.parentElement;while(c&&c!==document.documentElement){const r=c.getBoundingClientRect();
      if(r.width>=pr.width+24)break;c=c.parentElement}}
    const cr=c?c.getBoundingClientRect():{left:0,top:0,width:W,height:H};
    out.pboxes.push({rect:R(pr),overflow:ps.overflow,filter:ps.filter,area:R(cr),areaEl:desc(c),
      imgs:[...pb.querySelectorAll('img')].map(i=>{const s=getComputedStyle(i);
        return{src:i.getAttribute('src'),filter:s.filter,boxShadow:s.boxShadow}})});
  }
  for(const i of document.querySelectorAll('img')){
    const src=i.getAttribute('src')||'';
    if(!i.complete||i.naturalWidth===0)out.broken.push(src);
    if(/product-cutouts/i.test(src)&&!i.closest('.pbox'))out.loose.push(src);
    if(/logo/i.test(src))out.logos.push(src);
  }
  for(const e of document.querySelectorAll('body *')){const bg=getComputedStyle(e).backgroundImage;
    if(bg&&/logo/i.test(bg)){const m=bg.match(/url\("?([^")]+)"?\)/);out.logos.push(m?m[1]:bg)}}
  const pre=document.createElement('pre');pre.id='__rubric_out';pre.style.display='none';
  pre.textContent=JSON.stringify(out);document.body.appendChild(pre);
}
function go(){(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(run,50))}
if(document.readyState==='complete')go();else addEventListener('load',go);
})();
</script>
"""


def png_size(path):
    with open(path, "rb") as f:
        head = f.read(24)
    if head[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError("%s is not a PNG" % path)
    return struct.unpack(">II", head[16:24])


def probe(template, w, h):
    """Load a copy of the template with the probe appended, at the render's pixel size. If Chrome's
    viewport comes back short of the window (it does in --dump-dom mode), grow the window and rerun,
    so a template sized at 100% lays out exactly as build.sh's screenshot did."""
    p = _probe(template, w, h, w, h)
    if (p["vw"], p["vh"]) != (w, h):
        p = _probe(template, w, h, w + (w - p["vw"]), h + (h - p["vh"]))
    return p


def _probe(template, w, h, win_w, win_h):
    """The copy sits in the template's own folder, so ../../../assets paths still resolve, and is
    named ._* so git ignores it. It is removed as soon as Chrome returns."""
    with open(template, encoding="utf-8") as f:
        src = f.read()
    i = src.lower().rfind("</body>")
    js = PROBE.replace("__W__", str(w)).replace("__H__", str(h))
    page = src[:i] + js + src[i:] if i >= 0 else src + js
    d = os.path.dirname(os.path.abspath(template))
    fh = tempfile.NamedTemporaryFile("w", suffix=".html", prefix="._rubric-probe-", dir=d, delete=False, encoding="utf-8")
    fh.write(page)
    fh.close()
    try:
        out = subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
             "--force-device-scale-factor=1", "--window-size=%d,%d" % (win_w, win_h), "--virtual-time-budget=5000",
             "--dump-dom", "file://" + fh.name],
            capture_output=True, text=True, timeout=90).stdout
    finally:
        os.unlink(fh.name)
    m = re.search(r'<pre id="__rubric_out"[^>]*>(.*?)</pre>', out, re.S)
    if not m:
        raise RuntimeError("the probe did not report back from Chrome (template broken, or Chrome missing)")
    return json.loads(htmlmod.unescape(m.group(1)))


def declared_size(template):
    """The size the template says it is authored at: html,body{width:Wpx;height:Hpx}."""
    with open(template, encoding="utf-8") as f:
        s = f.read()
    m = re.search(r"html\s*,\s*body\s*\{[^}]*?width\s*:\s*(\d+)px[^}]*?height\s*:\s*(\d+)px", s)
    return (int(m.group(1)), int(m.group(2))) if m else None


# ---------------------------------------------------------------------------------------------
# Checks. Each returns (status, summary, [detail lines]).
# ---------------------------------------------------------------------------------------------

def check_canvas(w, h, template, placement):
    details = []
    decl = declared_size(template) if template else None
    if decl and decl != (w, h):
        return "FAIL", "template is authored at %dx%d but the PNG is %dx%d (rendered at the wrong size)" % (decl + (w, h)), details
    if (w, h) not in PLACEMENTS:
        return "FAIL", "%dx%d is not a placement size. Valid: 1080x1080, 1080x1920, 1200x628 (paid), 1080x1350 (organic)" % (w, h), details
    label, kinds = PLACEMENTS[(w, h)]
    if placement and placement not in kinds:
        if placement == "paid" and (w, h) == (1080, 1350):
            return "FAIL", "1080x1350 (4:5) is organic only; never in a paid set", details
        return "FAIL", "%dx%d is %s, not a %s size" % (w, h, label, placement), details
    return "PASS", "%dx%d = %s%s" % (w, h, label, "" if placement else " (pass --placement to pin the slot)"), details


def check_assets(p):
    if p["broken"]:
        return "FAIL", "%d image(s) did not load; the render has holes" % len(p["broken"]), \
               ["missing: %s" % s for s in sorted(set(p["broken"]))]
    return "PASS", "every image in the template loaded", []


def check_logo(p):
    logos = sorted(set(os.path.basename(htmlmod.unescape(l)) for l in p["logos"]))
    if not logos:
        return "WARN", "no HPC logo found (img or background with 'logo' in the file name). Fine only if omitted on purpose", []
    circle = [l for l in logos if "circle" in l.lower()]
    if circle:
        return "WARN", "circle logo in use; its artwork says 'patent pending'. Prefer the shield", logos
    return "PASS", "logo present: %s" % ", ".join(logos), []


def classify(t):
    if t["tag"] in FLOORS:
        return t["tag"], "tagged data-rubric"
    toks = set(t["hints"])
    for kind in ("fine", "headline", "body"):
        if toks & HINTS[kind]:
            return kind, "class/tag '%s'" % sorted(toks & HINTS[kind])[0]
    if FINE_TEXT.search(t["text"]):
        return "fine", "reads as a disclaimer"
    if len(t["text"].split()) >= 7:
        return "body", "7+ words"
    return "info", "default"


def check_type(p, w):
    scale = w / 1080.0
    texts = p["texts"]
    if not texts:
        return "WARN", "no live text found; type baked into an image cannot be measured", []
    fails, warns = [], []
    biggest = max(t["size"] for t in texts)
    if biggest < FLOORS["headline"] * scale - 0.5:
        top = max(texts, key=lambda t: t["size"])
        fails.append('no line reaches headline size: the largest is "%s" at %.0fpx (floor %.0fpx)'
                     % (short(top["text"]), top["size"], FLOORS["headline"] * scale))
    for t in texts:
        kind, why = classify(t)
        floor = FLOORS[kind] * scale
        if t["size"] < floor - 0.5:
            fails.append('"%s" %.0fpx < %s floor %.0fpx  (%s, %s)' % (short(t["text"]), t["size"], kind, floor, why, t["el"]))
        elif kind != "fine" and t["alpha"] < FADE_MIN:
            warns.append('"%s" is faded to %.0f%% opacity (rule 7: not below ~60%%)  (%s)' % (short(t["text"]), t["alpha"] * 100, t["el"]))
    n = len(texts)
    if fails:
        under = sum(1 for f in fails if not f.startswith("no line reaches"))
        return "FAIL", "%d of %d text runs under the floor%s" % (under, n, " (scaled x%.2f for a %dpx-wide frame)" % (scale, w) if scale != 1 else ""), fails + warns
    if warns:
        return "WARN", "all %d text runs meet the floors; %d faded" % (n, len(warns)), warns
    return "PASS", "all %d text runs meet the floors (smallest %.0fpx, largest %.0fpx)" % (n, min(t["size"] for t in texts), biggest), []


def check_safe_zone(p, w, h):
    if (w, h) != (1080, 1920):
        return "PASS", "n/a: not a 9:16 frame", []
    bad = []
    for t in p["texts"]:
        r = t["rect"]
        if r["y"] < SAFE_TOP:
            bad.append('"%s" starts at y=%.0f (top %dpx is covered by platform UI)' % (short(t["text"]), r["y"], SAFE_TOP))
        elif r["y"] + r["h"] > h - SAFE_BOTTOM:
            bad.append('"%s" ends at y=%.0f (bottom %dpx is covered by platform UI)' % (short(t["text"]), r["y"] + r["h"], SAFE_BOTTOM))
    if bad:
        return "WARN", "%d text run(s) inside the story UI zones; fine for a paid 9:16 if Meta's preview is clear" % len(bad), bad
    return "PASS", "type clear of the top 250px and bottom 340px", []


QT = re.compile(r"(\d+)(?:\s*-\s*(\d+))?\s*qt", re.I)
COMMERCIAL_FILE = re.compile(r"steamer|commercial|\bgal\b|\d+\s*gal|160\s*qt", re.I)


def cutout_files(p):
    files = [i["src"] for b in p["pboxes"] for i in b["imgs"]] + p["loose"]
    return sorted(set(os.path.basename(htmlmod.unescape(f)) for f in files if f and "product-cutouts" in f))


def run_lint(blocks, whole, commercial):
    """lint.js is the one copy of the copy rules. Every block is linted on its own, except the
    warranty rule, which reads the whole creative (a qualifier often sits in a different box)."""
    js = r"""
const lint = require(process.argv[1]);
let data = ''; process.stdin.on('data', (c) => data += c).on('end', () => {
  const inp = JSON.parse(data); const out = [];
  for (const b of inp.blocks) for (const f of lint.lintText(b, { field: 'graphic', commercial: inp.commercial }))
    if (f.rule !== 'warranty-5yr') out.push(f);
  for (const f of lint.lintText(inp.whole, { field: 'graphic', commercial: inp.commercial }))
    if (f.rule === 'warranty-5yr') out.push(f);
  process.stdout.write(JSON.stringify({ findings: out, refErrors: lint.reference().errors }));
});"""
    r = subprocess.run(["node", "-e", js, LINT_JS], input=json.dumps({"blocks": blocks, "whole": whole, "commercial": commercial}),
                       capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        raise RuntimeError("lint.js failed: %s" % (r.stderr.strip().splitlines() or ["no output"])[-1])
    return json.loads(r.stdout)


def check_copy(p):
    order, byblock = [], {}
    for t in p["texts"]:
        s = t["text"]                      # as authored: lint.js matches some names case-sensitively
        if t["block"] not in byblock:
            order.append(t["block"])
            byblock[t["block"]] = []
        byblock[t["block"]].append(s)
    blocks = [" ".join(byblock[b]) for b in order]
    if not blocks:
        return "WARN", "no live text to lint; words baked into an image are not read", []
    cutouts = cutout_files(p)
    commercial = any(COMMERCIAL_FILE.search(c) for c in cutouts)
    res = run_lint(blocks, "\n".join(blocks), commercial)
    fails, warns = [], []
    for f in res["findings"]:
        line = '%s: "%s"%s  [source: %s]' % (f["rule"], f["match"], (" — " + f["detail"]) if f.get("detail") else "", f["source"])
        if f["rule"] == "warranty-5yr" and f["severity"] == "error" and warranty_exception(f, cutouts, commercial):
            warns.append(line + "  → SAFETY.md exception may apply: one qualifying residential pot in frame (%s). "
                                "Confirm by eye that it is the only product shown." % cutouts[0])
            continue
        (fails if f["severity"] == "error" else warns).append(line)
    for e in res["refErrors"]:
        warns.append("linter could not read a reference file: %s" % e)
    n = len(blocks)
    if fails:
        return "FAIL", "%d copy-rule error(s) across %d text blocks" % (len(fails), n), fails + warns
    if warns:
        return "WARN", "no errors; %d finding(s) for a human to look at" % len(warns), warns
    return "PASS", "%d text blocks clean against lint.js" % n, []


def warranty_exception(f, cutouts, commercial):
    """SAFETY.md: a creative may drop the size qualifier "only when the creative shows a single
    qualifying pot (residential, ≤120 QT)". We can only see cutouts, so this downgrades to WARN."""
    detail = f.get("detail") or ""
    if commercial or len(cutouts) != 1 or detail != 'missing qualifier: "120 QT or smaller"':
        return False
    m = QT.search(cutouts[0])
    return bool(m) and int(m.group(2) or m.group(1)) <= 120


def check_centering(p, png, w, h):
    if p["loose"] and not p["pboxes"]:
        return "WARN", "product cutout placed without a prod.py .pbox; centring not measured", \
               ["loose: %s" % os.path.basename(s) for s in sorted(set(p["loose"]))]
    if not p["pboxes"]:
        return "PASS", "n/a: no .pbox product frame in this layout", []
    tol = CENTER_TOL * w / 1080.0
    worst, lines = "PASS", []
    rank = {"PASS": 0, "WARN": 1, "FAIL": 2}
    for i, b in enumerate(p["pboxes"]):
        r, a = b["rect"], b["area"]
        x0, x1 = max(0, int(r["x"])), min(w, int(r["x"] + r["w"]))
        y0, y1 = max(0, int(r["y"])), min(h, int(r["y"] + r["h"]))
        name = os.path.basename(htmlmod.unescape(b["imgs"][0]["src"])) if b["imgs"] else "pbox %d" % (i + 1)
        if x1 - x0 < 20 or y1 - y0 < 20:
            st, msg = "WARN", "%s: product box is off-canvas or tiny; not measured" % name
        else:
            m = centering_tool.measure([png], (y0, y1), (x0, x1))[0]
            area = (x1 - x0) * (y1 - y0)
            lo, hi, bounded = free_span(r, a, p["texts"])
            target = (lo + hi) / 2.0
            if m.get("error") or m["pixels"] > 0.85 * area:
                st, msg = "WARN", ("%s: could not isolate the product from its background (light or metallic backdrop); "
                                   "check by eye" % name)
            else:
                bx = m["bbox"] + w / 2.0 - target
                mx = m["mass"] + w / 2.0 - target
                where = "centre of its free area x=%.0f..%.0f (%s%s)" % (
                    lo, hi, b["areaEl"], ", bounded by type" if bounded else "")
                if abs(bx) <= tol and abs(mx) <= tol:
                    st = "PASS"
                    msg = "%s: bbox %+.0f, mass %+.0f px from the %s" % (name, bx, mx, where)
                elif bx * mx < 0 or abs(bx + mx) / 2.0 <= tol:
                    # check-centering.py's "split" case: a thin accessory (lid, hose, handle) pulls one
                    # number, the pot the other. Rule 2 says split the difference and judge by eye.
                    st = "WARN"
                    msg = ("%s: bbox %+.0f, mass %+.0f px from the %s; they disagree (thin accessory one side), "
                           "the split is %+.0f, judge by eye" % (name, bx, mx, where, (bx + mx) / 2.0))
                else:
                    st = "FAIL"
                    msg = ("%s: bbox %+.0f, mass %+.0f px from the %s (limit ±%.0f). Nudge about %+d px with "
                           "transform:translate() on the .pbox" % (name, bx, mx, where, tol, -round((bx + mx) / 2.0)))
        lines.append(msg)
        if rank[st] > rank[worst]:
            worst = st
    summary = {"PASS": "product optically centred in its area",
               "WARN": "centring needs a look by eye",
               "FAIL": "product reads off-centre"}[worst]
    return worst, summary + " (%d product frame%s)" % (len(lines), "" if len(lines) == 1 else "s"), lines


def free_span(r, a, texts):
    """Rule 12's free area, horizontally: the product's container, narrowed by any type that sits
    beside the product (its vertical centre inside the middle 60% of the product's height, so a chip
    or a headline's last line that only grazes the top or bottom of the box does not count).
    Type wholly left of the product's centre bounds it on the left, wholly right on the right; type
    that spans the centre (a headline set over the product on purpose) is ignored. Borders and
    dividers drawn in CSS are not seen."""
    cx = r["x"] + r["w"] / 2.0
    lo, hi = a["x"], a["x"] + a["w"]
    bounded = False
    for t in texts:
        q = t["rect"]
        mid = q["y"] + q["h"] / 2.0
        if q["h"] <= 0 or not (r["y"] + 0.2 * r["h"] <= mid <= r["y"] + 0.8 * r["h"]):
            continue
        if q["x"] + q["w"] <= cx and q["x"] + q["w"] > lo:
            lo, bounded = q["x"] + q["w"], True
        elif q["x"] >= cx and q["x"] < hi:
            hi, bounded = q["x"], True
    return lo, hi, bounded


def check_shadow(p):
    bad = []
    for b in p["pboxes"]:
        for i in b["imgs"]:
            f, s = i["filter"] or "none", i["boxShadow"] or "none"
            if "drop-shadow" in f or s != "none":
                bad.append("%s: %s%s" % (os.path.basename(htmlmod.unescape(i["src"] or "?")),
                                         "filter: %s" % f if "drop-shadow" in f else "",
                                         " box-shadow: %s" % s if s != "none" else ""))
    if bad:
        return "FAIL", "shadow set on the img inside .pbox; it is clipped into a gray box. Move it to .pbox", bad
    if not p["pboxes"]:
        return "PASS", "n/a: no .pbox in this layout", []
    return "PASS", "no filter or shadow on any img inside .pbox", []


LIB_NAME = re.compile(r"^(\d{4}-\d{2}-\d{2})_(.+?)_(.+)_(\d+x\d+)_v(\d+)\.png$")


def thumb(png, cols=24, rows=24):
    """Coarse RGB grid of a PNG, via sips (built into macOS) then pngtool.read_png."""
    fd, tmp = tempfile.mkstemp(suffix=".png")
    os.close(fd)
    try:
        subprocess.run(["sips", "-s", "format", "png", "-z", str(rows), str(cols), png, "--out", tmp],
                       capture_output=True, check=True)
        tw, th, ch, px = pngtool.read_png(tmp)
    finally:
        os.unlink(tmp)
    cells = []
    for i in range(tw * th):
        j = i * ch
        if ch >= 3:
            cells.append((px[j], px[j + 1], px[j + 2]))
        else:
            cells.append((px[j],) * 3)
    return cells


def similarity(a, b):
    """(structure, palette). structure = correlation of the two luminance grids, 1.0 = same
    light/dark layout. palette = 1 - mean colour distance per cell, 1.0 = same colours."""
    la = [.299 * r + .587 * g + .114 * bl for r, g, bl in a]
    lb = [.299 * r + .587 * g + .114 * bl for r, g, bl in b]
    n = len(la)
    ma, mb = sum(la) / n, sum(lb) / n
    va = sum((x - ma) ** 2 for x in la)
    vb = sum((x - mb) ** 2 for x in lb)
    cov = sum((x - ma) * (y - mb) for x, y in zip(la, lb))
    struct_r = cov / ((va * vb) ** .5) if va > 0 and vb > 0 else 0.0
    dist = sum(((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2) ** .5 for p, q in zip(a, b)) / n
    return struct_r, 1 - dist / (255 * 3 ** .5)


STRUCT_WARN, PALETTE_WARN = 0.80, 0.85


def check_fresh(png, w, h, library, product):
    if not os.path.isdir(library):
        return "WARN", "no library folder at %s; nothing to compare against" % library, []
    me = os.path.abspath(png)
    pieces = []
    for f in os.listdir(library):
        m = LIB_NAME.match(f)
        if not m or m.group(4) != "%dx%d" % (w, h) or os.path.abspath(os.path.join(library, f)) == me:
            continue
        pieces.append((m.group(1), m.group(2), f))
    mine = LIB_NAME.match(os.path.basename(png))
    if mine:                                   # checking a library piece: compare with what came before it
        pieces = [x for x in pieces if x[0] < mine.group(1)]
    if not pieces:
        return "PASS", "no earlier %dx%d piece in the library to compare with" % (w, h), []
    latest = max(x[0] for x in pieces)
    group = [x for x in pieces if x[0] == latest]
    label = "most recent library date (%s)" % latest
    if product:
        same = sorted([x for x in pieces if x[1] == product], reverse=True)[:2]
        if same:
            group = same
            label = "last %d '%s' piece%s" % (len(same), product, "" if len(same) == 1 else "s")
    t = thumb(png)
    rows = []
    for _, _, f in group:
        s, pal = similarity(t, thumb(os.path.join(library, f)))
        rows.append((s, pal, f))
    rows.sort(reverse=True)
    lines = ["%s  structure %.2f, palette %.2f" % (f, s, pal) for s, pal, f in rows]
    s, pal, f = rows[0]
    if s >= STRUCT_WARN and pal >= PALETTE_WARN:
        return "WARN", ("layout and palette closely match %s (structure %.2f, palette %.2f). "
                        "If it is not a resize or revision of that piece, rule 11 says start over" % (f, s, pal)), lines
    return "PASS", "reads differently from the %s: closest %s (structure %.2f, palette %.2f)" % (label, f, s, pal), lines


def short(s, n=48):
    return s if len(s) <= n else s[:n - 1] + "…"


# ---------------------------------------------------------------------------------------------
# Pairing a PNG with its template, and running everything.
# ---------------------------------------------------------------------------------------------

def find_template(png):
    """build.sh records every render in <outdir>/.rubric-sources.tsv. Fall back to the naming
    build-set.sh and build-carousel.sh use."""
    d, base = os.path.dirname(os.path.abspath(png)), os.path.basename(png)
    idx = os.path.join(d, INDEX)
    if os.path.exists(idx):
        hit = None
        with open(idx, encoding="utf-8") as f:
            lines = f.read().splitlines()
        for line in lines:
            parts = line.rstrip("\n").split("\t")
            if len(parts) >= 2 and parts[0] == base and os.path.exists(parts[1]):
                hit = parts[1]                  # last one wins: the latest render of that file
        if hit:
            return hit
    stem = base[:-4]
    tdir = os.path.join(CREATIVE, "templates")
    cands = [os.path.join(tdir, os.path.basename(d), stem + ".html")]          # drafts/<set>/<frame>.png
    for ratio in ("1.91x1", "9x16", "4x5", "1x1"):                            # drafts/<concept>-<ratio>.png
        if stem.endswith("-" + ratio):
            cands.append(os.path.join(tdir, stem[:-len(ratio) - 1], ratio + ".html"))
    for c in cands:
        if os.path.exists(c):
            return c
    return None


def check_piece(png, template=None, placement=None, library=LIBRARY, product=None):
    """Run every rubric item on one render. Returns a list of dicts {id, status, summary, details, source}."""
    results = []

    def add(cid, status, summary, details=()):
        results.append({"id": cid, "status": status, "summary": summary, "details": list(details), "source": SRC[cid]})

    w, h = png_size(png)
    template = template or find_template(png)
    try:
        add("canvas", *check_canvas(w, h, template, placement))
    except Exception as e:                                   # noqa: BLE001 — a broken check is a FAIL, said plainly
        add("canvas", "FAIL", "check broke: %s" % e)
    p = None
    if not template:
        add("template", "FAIL", "no template paired with %s. Pass it: rubric_check.py <template.html> <render.png>" % os.path.basename(png))
    else:
        try:
            p = probe(template, w, h)
            add("template", "PASS", os.path.relpath(template, CREATIVE))
        except Exception as e:                               # noqa: BLE001
            add("template", "FAIL", "could not read the template in Chrome: %s" % e)
    for cid, fn in (("assets", lambda: check_assets(p)),
                    ("logo", lambda: check_logo(p)),
                    ("type-floors", lambda: check_type(p, w)),
                    ("safe-zone", lambda: check_safe_zone(p, w, h)),
                    ("copy-rules", lambda: check_copy(p)),
                    ("centering", lambda: check_centering(p, png, w, h)),
                    ("pbox-shadow", lambda: check_shadow(p))):
        if p is None:
            add(cid, "FAIL", "not checked: needs the template")
            continue
        try:
            add(cid, *fn())
        except Exception as e:                               # noqa: BLE001
            add(cid, "FAIL", "check broke: %s" % e)
    try:
        add("fresh-idea", *check_fresh(png, w, h, library, product))
    except Exception as e:                                   # noqa: BLE001
        add("fresh-idea", "WARN", "comparison broke: %s" % e)
    return results


def report(png, results, quiet=False):
    rel = os.path.relpath(png)
    print("\n%s" % (rel if not rel.startswith("..") else os.path.abspath(png)))
    for r in results:
        print("  %-4s  %-12s %s" % (r["status"], r["id"], r["summary"]))
        if not quiet or r["status"] != "PASS":
            for d in r["details"]:
                print("                     · %s" % d)
            if r["status"] != "PASS":
                print("                     rule: %s" % r["source"])
    c = {s: sum(1 for r in results if r["status"] == s) for s in ("PASS", "WARN", "FAIL")}
    verdict = "FAIL — do not show Evan" if c["FAIL"] else "clear to show Evan" + (" (look at the WARNs)" if c["WARN"] else "")
    print("  => %d PASS · %d WARN · %d FAIL — %s" % (c["PASS"], c["WARN"], c["FAIL"], verdict))
    return c["FAIL"] == 0


def main(argv):
    opts = {"placement": None, "product": None, "library": LIBRARY, "quiet": False}
    pos = []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a in ("--placement", "--product", "--library"):
            if i + 1 >= len(argv):
                sys.exit("%s needs a value" % a)
            opts[a[2:]] = argv[i + 1]
            i += 2
            continue
        if a == "--quiet":
            opts["quiet"] = True
        elif a in ("-h", "--help"):
            print(__doc__)
            return 0
        else:
            pos.append(a)
        i += 1
    if opts["placement"] not in (None, "paid", "organic", "story"):
        sys.exit("--placement must be paid, organic or story")
    if not pos:
        print(__doc__)
        return 2
    jobs = []
    if len(pos) == 2 and pos[0].endswith(".html"):
        jobs.append((pos[1], pos[0]))
    elif len(pos) == 1 and os.path.isdir(pos[0]):
        pngs = sorted(f for f in os.listdir(pos[0]) if f.lower().endswith(".png") and not f.startswith(("_", ".")))
        if not pngs:
            sys.exit("no PNGs in %s" % pos[0])
        jobs = [(os.path.join(pos[0], f), None) for f in pngs]
    elif len(pos) == 1 and pos[0].lower().endswith(".png"):
        jobs.append((pos[0], None))
    else:
        sys.exit("give a template plus its PNG, one PNG, or a drafts folder. See --help.")
    ok = True
    for png, tpl in jobs:
        if not os.path.exists(png):
            print("\n%s\n  FAIL  missing      no such file" % png)
            ok = False
            continue
        res = check_piece(png, tpl, opts["placement"], opts["library"], opts["product"])
        ok = report(png, res, opts["quiet"]) and ok
    if len(jobs) > 1:
        print("\n%d piece(s) checked — %s" % (len(jobs), "all clear of FAILs" if ok else "at least one FAIL"))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
