#!/usr/bin/env python3
"""Emit an HTML snippet that renders a product cutout cropped to its visible
bounds, so flex/grid centring centres the PRODUCT rather than the empty canvas.

  python3 prod.py "18qt - pwd.png" 520            # size by visible WIDTH
  python3 prod.py "18qt - pwd.png" 520 h          # size by visible HEIGHT
  python3 prod.py --list                          # show all measured cutouts
"""
import json, sys, os
BB = os.path.join(os.path.dirname(__file__), "..", "..", "assets", "product-cutouts", "_bboxes.json")
REL = "../../../assets/product-cutouts/"
d = json.load(open(BB))

if len(sys.argv) < 2 or sys.argv[1] == "--list":
    for k in sorted(d): print(k)
    sys.exit()

f = sys.argv[1]
if f not in d:
    hits = [k for k in d if sys.argv[1].lower() in k.lower()]
    if len(hits) == 1: f = hits[0]
    else: sys.exit(f"no match for {sys.argv[1]!r}. candidates: {hits or 'none'}")

target = float(sys.argv[2]); by = (sys.argv[3] if len(sys.argv) > 3 else "w").lower()
b = d[f]
vis_w, vis_h = b["bw"] * b["w"], b["bh"] * b["h"]
scale = target / (vis_h if by == "h" else vis_w)
iw, ih = b["w"] * scale, b["h"] * scale
print(f'<div class="pbox" style="width:{vis_w*scale:.0f}px;height:{vis_h*scale:.0f}px">'
      f'<img src="{REL}{f}" style="width:{iw:.0f}px;left:{-b["x"]*iw:.0f}px;top:{-b["y"]*ih:.0f}px"></div>')
