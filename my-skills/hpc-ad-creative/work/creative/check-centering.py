#!/usr/bin/env python3
"""Measure how far each product sits from the centre of a rendered carousel frame.

  python3 check-centering.py drafts/laborday-2026
  python3 check-centering.py drafts/foo/frame-02-fryer.png
  python3 check-centering.py drafts/foo/review-4x5.png --band 860 1240   # any layout: the product's y-range

Default band (200-660) fits the carousel product frame. For any other layout pass --band with the
y-range the product occupies, starting below the logo and above any type, or the reading is wrong.

Why this exists: prod.py and carousel.py centre the cutout's BOUNDING BOX. Cutouts
with a lid leaning one way, a regulator hose sprawling, or a long handle will still
read visibly off-centre — Evan catches it every time. Measure the actual render.

Reports two numbers per frame, in pixels from frame centre (negative = left):
  bbox  — where the whole silhouette sits
  mass  — where the visual weight sits (brightness-weighted)

Both should land inside ±50 on a 1080-wide frame. When they disagree strongly the
cutout has a thin accessory sticking out one side; split the difference rather than
driving either to zero. Fix by setting "nudge": [x, y] on that frame in the config.
"""
import json, os, subprocess, sys, tempfile

# chrome-headless-shell first: same engine, but no Dock icon per render (Evan, 2026-09-24).
# Falls back to the full Chrome app if the shell is missing.
_SHELL = os.path.expanduser("~/Library/Application Support/ROUX/chrome-headless-shell-mac-arm64/chrome-headless-shell")
CHROME = _SHELL if os.path.exists(_SHELL) else "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# metal is bright and near-neutral; the orange glow is bright but saturated
LUM_MIN, SAT_MAX = 95, 42
# start below the logo or it drags the measurement left
BAND = (200, 660)

PAGE = """<!doctype html><html><body><pre id="out">working</pre><script>
const files=%(files)s, Y0=%(y0)d, Y1=%(y1)d, X0=%(x0)d, X1=%(x1)d;
(async()=>{const res=[];
for(const f of files){
  const img=new Image(); img.src=f;
  await new Promise(r=>{img.onload=r;img.onerror=r});
  if(!img.naturalWidth){res.push({f,error:"could not load"});continue}
  const W=img.naturalWidth,H=img.naturalHeight;
  const c=document.createElement("canvas");c.width=W;c.height=H;
  const x=c.getContext("2d");x.drawImage(img,0,0);
  const d=x.getImageData(0,0,W,H).data;
  let minx=W,maxx=0,sx=0,sw=0,n=0;
  for(let py=Math.max(0,Y0);py<Math.min(H,Y1);py++)for(let px=Math.max(0,X0);px<Math.min(W,X1);px++){
    const i=(py*W+px)*4,r=d[i],g=d[i+1],b=d[i+2];
    const lum=.299*r+.587*g+.114*b, sat=Math.max(r,g,b)-Math.min(r,g,b);
    if(lum<%(lum)d||sat>%(sat)d)continue;
    n++; if(px<minx)minx=px; if(px>maxx)maxx=px;
    const w=lum-%(lum)d; sx+=px*w; sw+=w;
  }
  res.push(n<400?{f,error:"no product found in band"}
    :{f,bbox:+(((minx+maxx)/2)-W/2).toFixed(1),mass:+((sx/sw)-W/2).toFixed(1),pixels:n});
}
document.getElementById("out").textContent=JSON.stringify(res);})();
</script></body></html>"""


def measure(pngs, band=BAND, xband=None):
    """xband=(x0, x1) limits the scan to a column (rubric-check uses the product's own box, so
    type beside it is not counted). Offsets are still reported from the FRAME centre."""
    xband = xband or (0, 1 << 20)
    d = os.path.dirname(os.path.abspath(pngs[0]))
    names = json.dumps([os.path.basename(p) for p in pngs])
    html = PAGE % dict(files=names, y0=band[0], y1=band[1], x0=xband[0], x1=xband[1],
                       lum=LUM_MIN, sat=SAT_MAX)
    fh = tempfile.NamedTemporaryFile("w", suffix=".html", dir=d, delete=False)
    fh.write(html); fh.close()
    try:
        out = subprocess.run(
            [CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
             "--virtual-time-budget=20000", "--dump-dom", "file://" + fh.name],
            capture_output=True, text=True).stdout
    finally:
        os.unlink(fh.name)
    start, end = out.find("<pre id=\"out\">"), out.find("</pre>")
    if start < 0 or end < 0:
        sys.exit("could not read measurement output from Chrome")
    raw = out[start + len("<pre id=\"out\">"):end]
    raw = raw.replace("&quot;", '"').replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    return json.loads(raw)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    args = sys.argv[1:]
    band = BAND
    if "--band" in args:
        i = args.index("--band")
        band = (int(args[i + 1]), int(args[i + 2]))
        del args[i:i + 3]
    target = args[0]
    # cover and offer cards are photo-led with no cutout to centre — measuring them
    # is meaningless and produces false "nudge" advice. Skip unless asked explicitly.
    SKIP = ("cover", "cta", "offer")
    if os.path.isdir(target):
        pngs = sorted(os.path.join(target, f) for f in os.listdir(target)
                      if f.endswith(".png") and not f.startswith("_")
                      and not any(s in f.lower() for s in SKIP))
        skipped = sorted(f for f in os.listdir(target)
                         if f.endswith(".png") and any(s in f.lower() for s in SKIP))
    else:
        pngs, skipped = [target], []
    if not pngs:
        sys.exit("no product frames found in %s" % target)

    print("%-40s %8s %8s   %s" % ("frame", "bbox", "mass", "verdict"))
    print("-" * 76)
    worst = 0
    for r in measure(pngs, band):
        if r.get("error"):
            print("%-40s %s" % (r["f"][:40], r["error"]))
            continue
        off = max(abs(r["bbox"]), abs(r["mass"]))
        worst = max(worst, off)
        if abs(r["bbox"]) <= 50 and abs(r["mass"]) <= 50:
            v = "ok"
        elif r["bbox"] * r["mass"] < 0:
            v = "split — thin accessory one side, judge by eye"
        else:
            v = "NUDGE %+d" % -round((r["bbox"] + r["mass"]) / 2.0)
        print("%-40s %+8.1f %+8.1f   %s" % (r["f"][:40], r["bbox"], r["mass"], v))
    print("-" * 76)
    print("worst offset: %.0fpx  (target: inside 50px on a 1080 frame)" % worst)
    if skipped:
        print("skipped (photo-led, nothing to centre): %s" % ", ".join(skipped))
