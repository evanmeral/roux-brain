#!/usr/bin/env python3
"""Measure product placement inside the left panel of a rendered showroom card.

The card's left panel is a light flat #F4F6F6 field, so "product" = any pixel that
differs from the panel colour by more than a small tolerance. Reports the silhouette
bbox centre and the ink-weighted (darkness-weighted) centre, both as pixels from the
panel centre. Negative = left / up.

  python3 measure-panel.py <rendered.png> [panel_w] [panel_h]
"""
import json, os, subprocess, sys, tempfile

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PAGE = """<!doctype html><html><body><pre id="out">working</pre><script>
const F=%(f)s, PW=%(pw)d, PH=%(ph)d, TOL=%(tol)d, IN=%(inset)d, OX=%(ox)d, OY=%(oy)d;
(async()=>{
 const img=new Image(); img.src=F;
 await img.decode();
 const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
 const x=c.getContext('2d'); x.drawImage(img,0,0);
 // panel colour sampled from the very top-left inside the border
 const p=x.getImageData(OX+IN+4,OY+IN+4,1,1).data; const PR=p[0],PG=p[1],PB=p[2];
 const W=PW-2*IN, H=PH-2*IN;
 const d=x.getImageData(OX+IN,OY+IN,W,H).data;
 let x0=1e9,y0=1e9,x1=-1,y1=-1,sw=0,sx=0,sy=0,n=0;
 for(let yy=0;yy<H;yy++)for(let xx=0;xx<W;xx++){
   const i=(yy*W+xx)*4, r=d[i],g=d[i+1],b=d[i+2];
   const diff=Math.abs(r-PR)+Math.abs(g-PG)+Math.abs(b-PB);
   if(diff>TOL){
     if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(yy<y0)y0=yy; if(yy>y1)y1=yy;
     const w=diff; sw+=w; sx+=w*xx; sy+=w*yy; n++;
   }
 }
 document.getElementById('out').textContent=JSON.stringify(
   {x0:x0+IN,y0:y0+IN,x1:x1+IN,y1:y1+IN,px:sx/sw+IN,py:sy/sw+IN,n});
})();
</script></body></html>"""

f = os.path.abspath(sys.argv[1])
pw = int(sys.argv[2]) if len(sys.argv) > 2 else 700
ph = int(sys.argv[3]) if len(sys.argv) > 3 else 1500
tol = int(sys.argv[4]) if len(sys.argv) > 4 else 60
ox = int(sys.argv[5]) if len(sys.argv) > 5 else 0
oy = int(sys.argv[6]) if len(sys.argv) > 6 else 0
inset = 26
html = PAGE % {"f": json.dumps("file://" + f), "pw": pw, "ph": ph, "tol": tol, "inset": inset, "ox": ox, "oy": oy}
with tempfile.TemporaryDirectory() as td:
    hp = os.path.join(td, "m.html"); open(hp, "w").write(html)
    out = subprocess.run([CHROME, "--headless=new", "--disable-gpu",
        "--allow-file-access-from-files", "--virtual-time-budget=6000",
        "--dump-dom", "file://" + hp], capture_output=True, text=True).stdout
import sys as _s
if "{\"x0" not in out: print(out[:1500], file=_s.stderr); raise SystemExit("no data")
s = out[out.find('{"x0'):]
s = s[:s.find('}') + 1]
r = json.loads(s)
cx, cy = pw / 2, ph / 2
bx, by = (r["x0"] + r["x1"]) / 2, (r["y0"] + r["y1"]) / 2
print(f"{os.path.basename(f)}  region {pw}x{ph} at ({ox},{oy})")
print(f"  bbox   x {r['x0']}..{r['x1']}  y {r['y0']}..{r['y1']}"
      f"   ({r['x1']-r['x0']} x {r['y1']-r['y0']})")
print(f"  bbox centre  dx {bx-cx:+.0f}   dy {by-cy:+.0f}")
print(f"  ink  centre  dx {r['px']-cx:+.0f}   dy {r['py']-cy:+.0f}")
