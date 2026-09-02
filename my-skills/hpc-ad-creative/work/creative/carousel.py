#!/usr/bin/env python3
"""Generate an HPC feed-carousel template set from one JSON config.

  python3 carousel.py my-carousel.json          # writes templates/<name>/frame-NN-*.html
  python3 carousel.py my-carousel.json --print   # dump the build commands and exit

Frames are numbered automatically (NN / TOTAL) and the swipe label on the
second-to-last frame becomes "ONE MORE" on its own. Render with build-carousel.sh.

Config shape — see `my-skills/carousel/example-config.json` for a full worked one.
Every text field accepts inline HTML (<br>, <b>, &middot;, &deg;).
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
BBOX = json.load(open(os.path.join(HERE, "..", "..", "assets", "product-cutouts", "_bboxes.json")))
ASSETS = "../../../../assets/"          # from templates/<name>/ -> assets/
SHIELD = ASSETS + "brand-refs/HPC-ShieldLogo-White.png"


def resolve_cutout(name):
    if name in BBOX:
        return name
    hits = [k for k in BBOX if name.lower() in k.lower()]
    if len(hits) == 1:
        return hits[0]
    sys.exit("cutout %r: %s" % (name, "ambiguous — " + ", ".join(hits) if hits else "no match"))


def pbox(cutout, box_h, nudge=(0, 0)):
    """Crop the cutout to its visible bounds at `box_h` tall, then nudge.

    NOTE: this centres the BOUNDING BOX. A leaning lid, a sprawling hose or a
    long handle will still read off-centre — that is what `nudge` is for. Always
    run check-centering.py on the rendered PNGs and adjust. See the skill doc.
    """
    f = resolve_cutout(cutout)
    b = BBOX[f]
    vis_w, vis_h = b["bw"] * b["w"], b["bh"] * b["h"]
    scale = box_h / float(vis_h)
    iw, ih = b["w"] * scale, b["h"] * scale
    tx, ty = nudge
    return ('<div class="pbox" style="width:%.0fpx;height:%.0fpx;transform:translate(%.1fpx,%.1fpx)">'
            '<img src="%sproduct-cutouts/%s" style="width:%.0fpx;left:%.0fpx;top:%.0fpx"></div>'
            % (vis_w * scale, box_h, tx, ty, ASSETS, f, iw, -b["x"] * iw, -b["y"] * ih))


COVER = """<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../brand.css">
<style>
html,body{width:1080px;height:1350px}
.ad{position:relative;overflow:hidden;background:#0A0908}
.bg{position:absolute;inset:0;background-image:url('%(ASSETS)slifestyle/%(photo)s');
  background-size:cover;background-position:%(position)s;filter:brightness(%(brightness)s) contrast(1.04) saturate(1.1)}
.vig{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,7,6,.62) 0%%,rgba(8,7,6,.30) 26%%,rgba(8,7,6,.68) 62%%,rgba(8,7,6,.95) 100%%)}
.logo{width:138px;top:56px;left:56px}
.kick{position:absolute;top:74px;right:56px;z-index:4;text-align:right;font-family:'JetBrains Mono',monospace;
  font-weight:800;font-size:25px;color:#fff;letter-spacing:.16em;line-height:1.5}
.kick span{display:block;color:var(--gold);font-size:21px}
.mid{position:absolute;left:70px;right:70px;top:50%%;transform:translateY(-50%%);z-index:4}
.hl{color:#fff;font-size:%(hlsize)spx;font-weight:900;letter-spacing:-.042em;line-height:1.0;
  text-shadow:0 6px 30px rgba(0,0,0,.6)}
.hl em{font-style:normal;color:var(--gold)}
.rule{width:110px;height:5px;background:var(--accent);border-radius:3px;margin:40px 0 0}
.sub{color:rgba(255,255,255,.92);font-size:40px;font-weight:600;margin-top:38px;line-height:1.3;max-width:830px}
.swipe{position:absolute;left:70px;bottom:64px;z-index:4;font-family:'JetBrains Mono',monospace;
  font-weight:800;font-size:28px;color:var(--accent);letter-spacing:.2em}
</style></head>
<body><div class="ad">
  <div class="bg"></div><div class="vig"></div>
  <img class="logo" src="%(shield)s">
  %(kicker)s
  <div class="mid">
    <div class="hl">%(headline)s%(accent)s</div>
    <div class="rule"></div>
    <div class="sub">%(sub)s</div>
  </div>
  <div class="swipe">SWIPE &rarr;</div>
</div></body></html>
"""

PRODUCT = """<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../brand.css">
<style>
html,body{width:1080px;height:1350px}
.ad{position:relative;overflow:hidden;background:var(--char)}
.glow{width:920px;height:520px;left:50%%;top:40%%;transform:translate(-50%%,-50%%);opacity:.85}
.logo{width:118px;top:52px;left:56px}
.num{position:absolute;top:60px;right:60px;z-index:5;font-family:'JetBrains Mono',monospace;
  font-weight:800;font-size:26px;color:rgba(255,255,255,.38);letter-spacing:.14em}
/* stage 150-650 · copy starts 694 — keeps the product clear of the type */
.stage{position:absolute;left:0;right:0;top:150px;height:500px;z-index:4;
  display:flex;align-items:center;justify-content:center}
.pbox img{filter:drop-shadow(0 40px 60px rgba(0,0,0,.55))}
.copy{position:absolute;left:70px;right:70px;top:694px;z-index:5;text-align:center}
.eyebrow{color:var(--accent);font-size:26px;letter-spacing:.2em;display:block}
.hl{color:#fff;font-size:72px;font-weight:900;letter-spacing:-.035em;line-height:1.0;margin-top:22px}
.rule{width:88px;height:4px;background:var(--accent);border-radius:2px;margin:26px auto 0}
.sub{color:rgba(255,255,255,.82);font-size:32px;font-weight:600;margin-top:26px;line-height:1.34}
.stats{position:absolute;left:70px;right:70px;bottom:112px;z-index:5;text-align:center;
  border-top:1px solid rgba(255,255,255,.14);padding-top:28px}
.stat{font-family:'JetBrains Mono',monospace;font-weight:800;font-size:26px;color:#fff;
  letter-spacing:.09em;line-height:1.62}
.stat b{color:var(--gold)}
.stat s{color:rgba(255,255,255,.42);font-weight:700}
.tag{display:block;margin-top:14px;font-family:'JetBrains Mono',monospace;font-weight:700;
  font-size:21px;color:var(--accent);letter-spacing:.13em}
.swipe{position:absolute;left:0;right:0;bottom:50px;z-index:5;text-align:center;
  font-family:'JetBrains Mono',monospace;font-weight:800;font-size:23px;color:rgba(255,255,255,.42);
  letter-spacing:.2em}
</style></head>
<body><div class="ad">
  <div class="glow"></div>
  <img class="logo" src="%(shield)s">
  <div class="num">%(num)s</div>
  <div class="stage">%(pbox)s</div>
  <div class="copy">
    <span class="eyebrow">%(eyebrow)s</span>
    <div class="hl">%(headline)s</div>
    <div class="rule"></div>
    <div class="sub">%(sub)s</div>
  </div>
  <div class="stats"><div class="stat">%(stats)s%(tag)s</div></div>
  <div class="swipe">%(swipe)s &rarr;</div>
</div></body></html>
"""

CTA = """<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../brand.css">
<style>
html,body{width:1080px;height:1350px}
.ad{position:relative;overflow:hidden;background:#0A0908}
.bg{position:absolute;inset:0;background-image:url('%(ASSETS)slifestyle/%(photo)s');
  background-size:cover;background-position:50%% 50%%;filter:brightness(.56) contrast(1.05) saturate(.88)}
.vig{position:absolute;inset:0;background:radial-gradient(90%% 62%% at 50%% 45%%,transparent 0%%,rgba(8,7,6,.68) 66%%,rgba(8,7,6,.96) 100%%)}
.logo{width:150px;top:150px;left:50%%;transform:translateX(-50%%)}
.num{position:absolute;top:60px;right:60px;z-index:5;font-family:'JetBrains Mono',monospace;
  font-weight:800;font-size:26px;color:rgba(255,255,255,.38);letter-spacing:.14em}
.mid{position:absolute;left:70px;right:70px;top:52%%;transform:translateY(-50%%);z-index:5;text-align:center}
.hl{color:#fff;font-size:96px;font-weight:900;letter-spacing:-.04em;line-height:.96;
  text-shadow:0 6px 30px rgba(0,0,0,.6)}
.hl em{font-style:normal;color:var(--gold)}
.sub{color:rgba(255,255,255,.86);font-size:36px;font-weight:600;margin-top:34px;line-height:1.34}
.codes{margin-top:52px;font-family:'JetBrains Mono',monospace;font-weight:800;font-size:34px;
  color:#fff;line-height:1.9;letter-spacing:.02em}
.codes b{color:var(--gold);display:block}
.codes small{display:block;font-size:24px;font-weight:700;color:rgba(255,255,255,.55);
  letter-spacing:.14em;margin-top:18px}
.foot{position:absolute;left:70px;right:70px;bottom:78px;z-index:5;text-align:center;
  font-family:'JetBrains Mono',monospace;font-weight:700;font-size:24px;
  color:rgba(255,255,255,.5);letter-spacing:.14em;line-height:1.7}
</style></head>
<body><div class="ad">
  <div class="bg"></div><div class="vig"></div>
  <img class="logo" src="%(shield)s">
  <div class="num">%(num)s</div>
  <div class="mid">
    <div class="hl">%(headline)s</div>
    <div class="sub">%(sub)s</div>
    <div class="codes">%(codes)s</div>
  </div>
  <div class="foot">%(foot)s</div>
</div></body></html>
"""


def build(cfg):
    name = cfg["name"]
    outdir = os.path.join(HERE, "templates", name)
    os.makedirs(outdir, exist_ok=True)
    total = 1 + len(cfg["frames"]) + (1 if cfg.get("cta") else 0)
    written = []

    def emit(fn, html):
        open(os.path.join(outdir, fn), "w").write(html)
        written.append(fn)

    # --- cover ---
    c = cfg["cover"]
    kicker = ""
    if cfg.get("kicker"):
        kicker = ('<div class="kick">%s<span>%s</span></div>'
                  % (cfg["kicker"], cfg.get("kickerSub", "")))
    accent = ("<br><em>%s</em>" % c["accent"]) if c.get("accent") else ""
    emit("frame-01-cover.html", COVER % dict(
        ASSETS=ASSETS, shield=SHIELD, photo=c["photo"],
        position=c.get("position", "50% 45%"), brightness=c.get("brightness", ".68"),
        hlsize=c.get("size", 84), kicker=kicker,
        headline=c["headline"], accent=accent, sub=c.get("sub", "")))

    # --- product frames ---
    n_frames = len(cfg["frames"])
    for i, f in enumerate(cfg["frames"]):
        idx = i + 2
        # the frame right before the CTA gets "ONE MORE"
        last_product = (i == n_frames - 1)
        swipe = "ONE MORE" if (last_product and cfg.get("cta")) else "SWIPE"
        stats = "<br>".join(f.get("stats", []))
        tag = ('<span class="tag">%s</span>' % f["tag"]) if f.get("tag") else ""
        emit("frame-%02d-%s.html" % (idx, f.get("slug", "product%d" % idx)), PRODUCT % dict(
            shield=SHIELD, num="%02d / %02d" % (idx, total),
            pbox=pbox(f["cutout"], f.get("boxHeight", 440), tuple(f.get("nudge", (0, 0)))),
            eyebrow=f.get("eyebrow", ""), headline=f["headline"], sub=f.get("sub", ""),
            stats=stats, tag=tag, swipe=swipe))

    # --- offer card, always last ---
    if cfg.get("cta"):
        t = cfg["cta"]
        codes = "\n      ".join(t.get("codes", []))
        if t.get("note"):
            codes += "\n      <small>%s</small>" % t["note"]
        emit("frame-%02d-cta.html" % total, CTA % dict(
            ASSETS=ASSETS, shield=SHIELD, photo=t["photo"], num="%02d / %02d" % (total, total),
            headline=t["headline"], sub=t.get("sub", ""), codes=codes,
            foot=t.get("foot", "")))
    return outdir, written


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    cfg = json.load(open(sys.argv[1]))
    outdir, written = build(cfg)
    rel = os.path.relpath(outdir, HERE)
    print("wrote %d frames to %s/" % (len(written), rel))
    for w in written:
        print("  ", w)
    print("\nrender them all:")
    print("  ./build-carousel.sh %s" % cfg["name"])
    print("then ALWAYS check centring:")
    print("  python3 check-centering.py drafts/%s" % cfg["name"])
