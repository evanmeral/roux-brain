#!/usr/bin/env python3
"""Print the rendered height of every block in a showroom card, so the vertical budget
can be balanced instead of guessed.  usage: python3 heights.py <card.html>

Gates, all of them things that fail silently on the printed card:
  scrollHeight <= 1275   the card does not overflow
  .bottom bottom == 1246 the product/price band sits on the baseline
  every feat  == 51px    no feature wrapped to two lines
  every what  <= 100px   no price-row label wrapped and clipped its own note
"""
import json, os, subprocess, sys, tempfile
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
f=os.path.abspath(sys.argv[1])
js = """<!doctype html><html><body><pre id=o>x</pre><script>
(async()=>{const fr=document.createElement('iframe');
fr.style.width='1650px';fr.style.height='1275px';fr.style.border='0';
fr.src=%s;document.body.appendChild(fr);
await new Promise(r=>fr.onload=r); await new Promise(r=>setTimeout(r,2500));
const d=fr.contentDocument, out=[];
const sels=['.card','.top','.deck','.rule','.feats','.chips','.bottom','.prodcol','.pricecol','.prices','.addons'];
d.querySelectorAll('.feat').forEach((e,i)=>{e.dataset.k='feat'+i;sels.push('[data-k=feat'+i+']')});
d.querySelectorAll('.prow .what').forEach((e,i)=>{e.dataset.k='what'+i;sels.push('[data-k=what'+i+']')});
for(const sel of sels){
  const e=d.querySelector(sel); if(!e){out.push([sel,'--']);continue;}
  const r=e.getBoundingClientRect(); out.push([sel,Math.round(r.top),Math.round(r.bottom),Math.round(r.height),Math.round(r.left),Math.round(r.right)]);
}
out.push(['scrollH',d.querySelector('.card').scrollHeight]);
document.getElementById('o').textContent='RES'+JSON.stringify(out);})();
</script></body></html>""" % json.dumps("file://"+f)
with tempfile.TemporaryDirectory() as td:
    p=os.path.join(td,'h.html'); open(p,'w').write(js)
    out=subprocess.run([CHROME,"--headless=new","--disable-gpu","--allow-file-access-from-files",
        "--virtual-time-budget=9000","--window-size=1700,1400","--dump-dom","file://"+p],
        capture_output=True,text=True).stdout
i=out.find('RES[')
if i<0: print(out[:800]); raise SystemExit('no data')
rows=json.loads(out[i+3:out.find(']]',i)+2])
print(f"{'block':<12}{'top':>7}{'bottom':>8}{'height':>8}{'left':>7}{'right':>7}")
for r in rows:
    if r[0]=='scrollH': print('scrollHeight', r[1]); continue
    if r[1]=='--': print(f"{r[0]:<12}   (absent)"); continue
    print(f"{r[0]:<12}{r[1]:>7}{r[2]:>8}{r[3]:>8}{r[4]:>7}{r[5]:>7}")
