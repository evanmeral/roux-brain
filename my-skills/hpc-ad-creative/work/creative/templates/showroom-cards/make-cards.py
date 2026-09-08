#!/usr/bin/env python3
"""Generate HPC showroom cards from one data table.

Every card is 1650x1275 (5.5in x 4.25in at 300dpi), four to a LANDSCAPE Letter page.
The layout is fixed by card.css; this file holds only the per-product content.

RULES BAKED IN HERE — do not loosen them when adding a product:
  * Six features, one line each. If one wraps, heights.py reports a 102px row and the
    card overflows. Shorten the copy, never the type.
  * Every feature must be traceable to that product's own PDP, what-we-sell.md, or a
    figure Evan set. `src` on each product records where. Never carry a claim across
    from a different product because it "sounds right".
  * Price rows come from the live variant list, not from a range in a brain file.
  * NEVER round or trim a price to make copy fit. Shorten the words instead, or raise
    the budget and re-run heights.py. $34.75 is not $35.
  * Never claim a basket/lid is included unless that product's PDP says so.
  * Never put crawfish or a boil use on a fryer (creative rule 4).

  python3 make-cards.py          # write + render every card
  python3 make-cards.py 80qt     # just the ones whose key matches
"""
import json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
CREATIVE = os.path.abspath(os.path.join(HERE, "..", ".."))
BB = json.load(open(os.path.join(CREATIVE, "..", "..", "assets", "product-cutouts", "_bboxes.json")))

MAX_W, MAX_H, MID_BELOW = 520, 630, 430   # product column budget; centre short cutouts


def pbox(fname, nudge=(0, 0), force_mid=False):
    b = BB[fname]
    vw, vh = b["bw"] * b["w"], b["bh"] * b["h"]
    scale = min(MAX_W / vw, MAX_H / vh)
    w, h = vw * scale, vh * scale
    iw, ih = b["w"] * scale, b["h"] * scale
    mid = " mid" if (force_mid or h < MID_BELOW) else ""
    tf = f";transform:translate({nudge[0]}px,{nudge[1]}px)" if nudge != (0, 0) else ""
    return mid, (f'<div class="pbox" style="width:{w:.0f}px;height:{h:.0f}px{tf}">'
                 f'<img src="../../../../assets/product-cutouts/{fname}" '
                 f'style="width:{iw:.0f}px;left:{-b["x"]*iw:.0f}px;top:{-b["y"]*ih:.0f}px"></div>')


POWERED, PERF = "POWERED &nbsp;·&nbsp; COMPLETE RIG", "PERFORMANCE &nbsp;·&nbsp; POT ONLY"
STEAMER = "STEAMER &nbsp;·&nbsp; BUILT TO ORDER"
MODULE = "BURNER MODULE &nbsp;·&nbsp; BOLTS ON"
COMMERCIAL = "COMMERCIAL &nbsp;·&nbsp; SPECIAL ORDER"

P = [
 dict(key="18qt-powered", tag=POWERED, cut="18qt - pwd.png", h1=('18 QT', 'Powered Fryer'),
   nudge=(22, 0),   # lid leans left and drags the ink centre off; measured, not guessed
   deck="Pot, burner and stand welded as one piece. Built to fry.",
   src="18 QT Powered PDP (USA-built, 6in banjo, 4mm) · what-we-sell 350-in-5 frying trio",
   feats=["Fry oil to <b>350° in under 5 min</b>", "<b>6\" banjo burner</b> welded on",
          "Uses <b>up to 75% less propane</b>", "<b>4mm aluminum</b>, twice as thick",
          "Takes <b>Cooker Leg Extensions</b>", "<b>Built in the USA</b>"],
   chips=["Fish", "Wings", "Shrimp", "Okra", "Fries"],
   rows=[("Pot, Basket &amp; 1/4\" Valve", "the full build · 6\" banjo burner", "$340", 1),
         ("Without the drain valve", "pot and basket only", "$325", 0),
         ("Without the basket", "neither one: $285", "$300", 0)],
   add="Basket &amp; notched lid $61 &nbsp;·&nbsp; Leg extensions $119"),

 dict(key="18qt-performance", tag=PERF, cut="18qt - perf.png", h1=('18 QT', 'Performance Fryer'),
   deck="The same fryer pot, no burner. Runs on the burner you own.",
   src="18 QT non-powered PDP · variant list (basket and valve are options)",
   feats=["Fry oil to <b>350° in under 5 min</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Takes <b>Cooker Leg Extensions</b>",
          "<b>Built in the USA</b>", "<b>Basket and valve</b> are options"],
   chips=["Fish", "Wings", "Shrimp", "Okra", "Fries"],
   rows=[("Pot, Basket &amp; 1/4\" Valve", "the full build · no burner", "$265", 1),
         ("Without the drain valve", "pot and basket only", "$250", 0),
         ("Pot only", "with a 1/4\" valve: $235", "$220", 0)],
   add="Basket &amp; notched lid $61 &nbsp;·&nbsp; Leg extensions $119"),

 dict(key="30qt-turkey-powered", tag=POWERED, cut="30qt - pwd.png", h1=('30 QT', 'Turkey Fryer'),
   deck="The 30 QT rig set up for turkey. Lid and rack included.",
   src="30 QT Turkey Fryer PDP (350+ in under 10 min, 15 lb shrimp, build contents)",
   feats=["<b>350° frying temp</b> in under 10min", "Rolling boil in <b>under 7 minutes</b>",
          "Back to a boil in <b>90 seconds</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Comes with <b>lid and turkey rack</b>"],
   chips=["Turkey", "Fish fries", "Seafood boils", "Steaming", "Soups &amp; stews"],
   rows=[("Pot, Lid &amp; Turkey Rack", "3/4\" drain valve · 6\" banjo burner", "$395", 1),
         ("Add the basket", "for boils", "$442.50", 0),
         ("Everything build", "adds basket + steamer rack", "$462.50", 0)],
   add="Steamer insert $24.99 &nbsp;·&nbsp; Basket $40 &nbsp;·&nbsp; Lid $18.50"),

 dict(key="40qt-powered", tag=POWERED, cut="40qt sauce pot - pwd.png", h1=('40 QT', 'Sauce Cooker'),
   nudge=(-28, 0),  # regulator hose sprawls left, so the visible mass sits right
   deck="Welded as one piece. The year-round pot for gumbo and chili.",
   src="40 QT Powered PDP (under 7 min, 90 sec, heats 3x faster, 4mm) · legs from what-we-sell",
   feats=["Rolling boil in <b>under 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "<b>Heats 3× faster</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Takes <b>Cooker Leg Extensions</b>"],
   chips=["Gumbo", "Chili", "Sauces", "Soups", "Peanuts", "Boils"],
   rows=[("Pot + 6\" Banjo Burner", "no drain valve · welded stand", "$289.99", 1),
         ("Add a 3/4\" gate valve", "drain it without lifting it", "$309.99", 0)],
   add="Steamer insert $27.99 &nbsp;·&nbsp; Basket $55 &nbsp;·&nbsp; Lid $21.25"),

 dict(key="4way-powered", tag=POWERED, cut="4-way fryer - pwd.png", h1=('4-Way', 'Fryer / Pasta Cooker'),
   h1size=86, mid=True,
   deck="Four sections, one pot. Fry four things without mixing them.",
   src="4-Way 20 QT PDP (four sections, ~5 qt per wedge) · what-we-sell 350-in-5 frying trio",
   feats=["<b>Four separate sections</b>", "About <b>5 quarts</b> per wedge",
          "Fry oil to <b>350° in under 5 min</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Takes <b>Cooker Leg Extensions</b>"],
   chips=["Wings", "Pasta", "Fish", "Shrimp", "Fries"],
   rows=[("Cooker, no valve", "20 QT · welded burner + stand", "$379.99", 1),
         ("Add a 1/4\" valve", "drain it without lifting it", "$396.99", 0)],
   add="Leg extensions $119 &nbsp;·&nbsp; Fryer thermometer $15.99"),

 dict(key="60qt-powered", tag=POWERED, cut="60qt boiler - pwd.png", h1=('60 QT', 'Powered Cooker'),
   deck="Welded as one piece. Pick the burner for the way you cook.",
   src="60 QT Powered PDP (under 7 min, 90 sec, twice as thick, boil/steam/slow cook/fry) · variants",
   feats=["Rolling boil in <b>under 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "Uses <b>up to 75% less propane</b>", "<b>4mm aluminum</b>, twice as thick",
          "<b>Pick your burner</b> — jet or banjo", "<b>Boil, steam, slow cook or fry</b>"],
   chips=["Seafood boils", "Crawfish", "Turkey", "Steaming", "Soups &amp; stews"],
   rows=[("Single Jet Burner", "standard build · 3/4\" gate valve", "$515", 1),
         ("6\" Banjo Burner instead", "for cooking and frying", "$525", 0),
         ("Upgrade to a 1\" gate valve", "on either burner", "+$10", 0)],
   add="Steamer insert $27.99 &nbsp;·&nbsp; Basket $70 &nbsp;·&nbsp; Lid $25"),

 dict(key="60qt-dual-turkey-powered", tag=POWERED, cut="60qt turkey fryer - pwd.png",
   h1=('60 QT', 'Dual Turkey Fryer'), h1size=96,
   deck="Fries two turkeys at once. Lid and dual rack included.",
   src="60 QT Dual Turkey PDP (two 13lb, up to two 20lb, build contents)",
   feats=["Fries <b>two 13 lb turkeys at once</b>", "Handles turkeys <b>up to 20 lb</b>",
          "Uses <b>up to 75% less propane</b>", "<b>4mm aluminum</b>, twice as thick",
          "Comes with <b>lid and dual rack</b>", "<b>6\" banjo burner</b> welded on"],
   chips=["Turkey", "Seafood", "Gumbo", "Chili", "Peanuts"],
   rows=[("Pot, Lid &amp; Dual Rack", "3/4\" gate valve · 6\" banjo burner", "$495", 1),
         ("Upgrade to a 1\" gate valve", "drains a full pot faster", "$505", 0)],
   add="Steamer insert $27.99 &nbsp;·&nbsp; Basket $70 &nbsp;·&nbsp; Lid $25"),

 dict(key="80qt-powered", tag=POWERED, cut="80qt - pwd.png", h1=('80 QT', 'Powered Cooker'),
   deck="Welded as one piece. Nearly 3× a plain stock pot's surface.",
   src="80 QT Powered PDP (3x surface, 1/3 the time, includes basket/lid/stand/burner) · variant name says 7 min",
   feats=["Rolling boil in <b>about 7 min</b>", "Back to a boil in <b>90 seconds</b>",
          "Nearly <b>3× the cooking surface</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Basket, lid and stand <b>included</b>"],
   chips=["Crawfish", "Shrimp", "Crabs", "Oysters", "Turkey", "Peanuts"],
   rows=[("Double Jet Burner", "standard build · 3/4\" gate valve", "$630", 1),
         ("10\" Banjo Burner instead", "for slow cooking and frying", "$655", 0),
         ("Bigger drain valve", "1\" gate · 1-1/2\" gate valve", "+$10 / +$30", 0, 1)],
   add="Steamer insert $53.99 &nbsp;·&nbsp; Basket $95 &nbsp;·&nbsp; Lid $30.50"),

 dict(key="100qt-powered", tag=POWERED, cut="100qt - pwd.png", h1=('100 QT', 'Powered Cooker'),
   deck="Welded as one piece. Nearly 3× a plain stock pot's surface.",
   src="100 QT Powered PDP (under 7 min, 90 sec, 3x surface, includes basket/lid/stand/burner)",
   feats=["Rolling boil in <b>under 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "Nearly <b>3× the cooking surface</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Basket, lid and stand <b>included</b>"],
   chips=["Crawfish", "Crabs", "Shrimp", "Lobster", "Steaming"],
   rows=[("Triple Jet Burner", "standard build · 3/4\" gate valve", "$670", 1),
         ("10\" Banjo Burner instead", "for slow cooking and frying", "$700", 0),
         ("Bigger drain valve", "1\" gate · 1-1/2\" gate valve", "+$10 / +$30", 0, 1)],
   add="Steamer insert $53.99 &nbsp;·&nbsp; Basket $105 &nbsp;·&nbsp; Lid $32"),

 dict(key="120qt-powered", tag=POWERED, cut="120qt - pwd.png", h1=('120 QT', 'Powered Cooker'),
   nudge=(0, -38),  # the regulator hose hangs below the pot and reads as sitting low
   deck="Our biggest residential rig. Nearly 3× the cooking surface.",
   src="120 QT Powered PDP (6.5 min, 90 sec, 3x surface, includes basket/lid/stand, assembly note)",
   feats=["Rolling boil in <b>about 6.5 min</b>", "Back to a boil in <b>90 seconds</b>",
          "Nearly <b>3× the cooking surface</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Basket, lid and stand <b>included</b>"],
   chips=["Crawfish", "Crabs", "Shrimp", "Lobster", "Steaming"],
   rows=[("Triple Jet Burner", "standard build · 3/4\" gate valve", "$715", 1),
         ("10\" Banjo Burner instead", "for slow cooking and frying", "$735", 0),
         ("Bigger drain valve", "1\" gate · 1-1/2\" gate valve", "+$10 / +$30", 0, 1)],
   add="Steamer insert $59.99 &nbsp;·&nbsp; Basket $120 &nbsp;·&nbsp; Lid $34.75"),
 dict(key="30qt-powered", tag=POWERED, cut="30qt - pwd.png", h1=('30 QT', 'Powered Pot'),
   deck="Pot, burner and stand welded as one piece. Nothing else to buy.",
   src="30 QT Powered PDP (under 7 min, 15 lb shrimp, build contents) · 350-in-10 set by Evan",
   feats=["Rolling boil in <b>under 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "Fry oil to <b>350° in under 10 min</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Holds <b>up to 15 lb of shrimp</b>"],
   chips=["Seafood boils", "Fish fries", "Turkey", "Steaming", "Soups &amp; stews"],
   rows=[("Pot, Basket &amp; Lid", "3/4\" drain valve · 6\" banjo burner", "$435", 1),
         ("Add the Steamer Rack", "steam above the water line", "$455", 0),
         ("Add Steamer + Turkey Rack", "the everything build", "$475", 0)],
   add="Steamer insert $24.99 &nbsp;·&nbsp; Basket $40 &nbsp;·&nbsp; Lid $18.50"),

 dict(key="30qt-performance", tag=PERF, cut="30qt - perf.png", h1=('30 QT', 'Performance Pot'),
   deck="The same Tunnel Tube pot, no burner. Runs on the burner you own.",
   src="30 QT Performance PDP · contents confirmed by Evan 2026-09-08 (basket+lid+valve)",
   feats=["Rolling boil in <b>under 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "Fry oil to <b>350° in under 10 min</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Holds <b>up to 15 lb of shrimp</b>"],
   chips=["Seafood boils", "Fish fries", "Turkey", "Steaming", "Soups &amp; stews"],
   rows=[("Pot, Basket &amp; Lid", "3/4\" drain valve · no burner", "$335", 1),
         ("Want the burner welded on?", "that's the 30 QT Powered Pot", "$435", 0)],
   add="Steamer insert $24.99 &nbsp;·&nbsp; Basket $40 &nbsp;·&nbsp; Lid $18.50"),

 dict(key="60qt-performance", tag=PERF, cut="60qt - perf.png", h1=('60 QT', 'Performance Pot'),
   deck="The same Tunnel Tube pot, no burner. Runs on the burner you own.",
   src="60 QT Performance PDP (boil/steam/slow cook/fry) · contents confirmed by Evan 2026-09-08",
   feats=["Rolling boil in <b>under 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "Uses <b>up to 75% less propane</b>", "<b>4mm aluminum</b>, twice as thick",
          "Basket, lid and valve <b>included</b>", "<b>Boil, steam, slow cook or fry</b>"],
   chips=["Seafood boils", "Crawfish", "Turkey", "Steaming", "Soups &amp; stews"],
   rows=[("Pot, Basket &amp; Lid", "3/4\" drain valve · no burner", "$395", 1),
         ("Want the burner welded on?", "that's the 60 QT Powered Cooker", "$515", 0)],
   add="Steamer insert $27.99 &nbsp;·&nbsp; Basket $70 &nbsp;·&nbsp; Lid $25"),

 dict(key="80qt-performance", tag=PERF, cut="80qt - perf.png", h1=('80 QT', 'Performance Pot'),
   deck="The same Tunnel Tube pot, no burner. Runs on the burner you own.",
   src="80 QT Performance PDP (multi-use, Tunnel Tube) · contents confirmed by Evan 2026-09-08",
   feats=["Rolling boil in <b>about 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "Uses <b>up to 75% less propane</b>", "<b>4mm aluminum</b>, twice as thick",
          "Basket, lid and valve <b>included</b>", "<b>Boil, steam, slow cook or fry</b>"],
   chips=["Crawfish", "Shrimp", "Crabs", "Oysters", "Turkey"],
   rows=[("Pot, Basket &amp; Lid", "3/4\" gate valve · no burner", "$495", 1),
         ("Without the drain valve", "subtract $18", "$477", 0),
         ("Bigger drain valve", "1\" gate · 1-1/2\" gate valve", "+$10 / +$30", 0, 1)],
   add="Steamer insert $53.99 &nbsp;·&nbsp; Basket $95 &nbsp;·&nbsp; Lid $30.50"),
 dict(key="100qt-performance", tag=PERF, cut="100-120qt - perf.png", h1=('100 QT', 'Performance Pot'),
   h1size=96,
   deck="The same Tunnel Tube pot, no burner. Runs on the burner you own.",
   src="100 QT Performance PDP · contents confirmed by Evan 2026-09-08 (basket+lid+valve)",
   feats=["Rolling boil in <b>under 7 minutes</b>", "Back to a boil in <b>90 seconds</b>",
          "Nearly <b>3× the cooking surface</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Basket, lid and valve <b>included</b>"],
   chips=["Crawfish", "Crabs", "Shrimp", "Lobster", "Steaming"],
   rows=[("Pot, Basket &amp; Lid", "3/4\" gate valve · no burner", "$520", 1),
         ("Without the drain valve", "subtract $18", "$502", 0),
         ("Bigger drain valve", "1\" gate · 1-1/2\" gate valve", "+$10 / +$30", 0, 1)],
   add="Steamer insert $53.99 &nbsp;·&nbsp; Basket $105 &nbsp;·&nbsp; Lid $32"),

 dict(key="120qt-performance", tag=PERF, cut="100-120qt - perf.png", h1=('120 QT', 'Performance Pot'),
   h1size=96,
   deck="The same Tunnel Tube pot, no burner. Runs on the burner you own.",
   src="120 QT Performance PDP · contents confirmed by Evan 2026-09-08 (basket+lid+valve)",
   feats=["Rolling boil in <b>about 6.5 min</b>", "Back to a boil in <b>90 seconds</b>",
          "Nearly <b>3× the cooking surface</b>", "Uses <b>up to 75% less propane</b>",
          "<b>4mm aluminum</b>, twice as thick", "Basket, lid and valve <b>included</b>"],
   chips=["Crawfish", "Crabs", "Shrimp", "Lobster", "Steaming"],
   rows=[("Pot, Basket &amp; Lid", "3/4\" gate valve · no burner", "$550", 1),
         ("Without the drain valve", "subtract $18", "$532", 0),
         ("Bigger drain valve", "1\" gate · 1-1/2\" gate valve", "+$10 / +$30", 0, 1)],
   add="Steamer insert $59.99 &nbsp;·&nbsp; Basket $120 &nbsp;·&nbsp; Lid $34.75"),
 dict(key="4way-performance", tag=PERF, cut="4-way fryer - perf.png",
   h1=('4-Way', 'Fryer / Pasta Cooker'), h1size=86, mid=True,
   deck="Four sections, one pot. No burner — runs on the one you own.",
   src="4-Way non-powered PDP (multi-use fryer/pasta) · what-we-sell 350-in-5 frying trio",
   feats=["<b>Four separate sections</b>", "Fry oil to <b>350° in under 5 min</b>",
          "Uses <b>up to 75% less propane</b>", "<b>4mm aluminum</b>, twice as thick",
          "Takes <b>Cooker Leg Extensions</b>", "<b>1/4\" drain valve</b> option"],
   chips=["Wings", "Pasta", "Fish", "Shrimp", "Fries"],
   rows=[("Pot, no drain valve", "no burner — runs on yours", "$277.99", 1),
         ("Add a 1/4\" valve", "drain it without lifting it", "$299.99", 0)],
   add="Leg extensions $119 &nbsp;·&nbsp; Fryer thermometer $15.99"),

 dict(key="28qt-steamer", tag=STEAMER, cut="28qt steamer.png", h1=('28 QT', 'Rack Steamer'),
   deck="Burner, stand and hinged lid built in. One large steaming rack.",
   src="28 QT Steamer PDP (rack 15.5x21, 20-35 oysters or 6-10 crab legs, 10-day lead time)",
   feats=["One rack, <b>15.5\" × 21\"</b>", "Holds <b>20–35 small oysters</b>",
          "Or <b>6–10 king crab legs</b>", "Or <b>several pounds of shrimp</b>",
          "<b>Hinged lid</b> and built-in stand", "<b>Burner and stand</b> built in"],
   chips=["Shrimp", "Crabs", "Oysters", "Tamales", "Veggies"],
   rows=[("Steamer, one rack", "burner · hinged lid · built-in stand", "$1,325", 1),
         ("Step up to the 100 QT", "two racks instead of one", "$1,525", 0)],
   add_label="Lead time", add="Built to order &nbsp;·&nbsp; allow about 10 days"),

 dict(key="100qt-steamer", tag=STEAMER, cut="100qt steamer_.png", h1=('100 QT', 'Rack Steamer'),
   deck="Burner, stand and hinged lid built in. Two or three racks.",
   src="100 QT Steamer PDP (racks 15.5x21, per-rack capacity, 2-week lead, freight quoted)",
   feats=["Racks are <b>15.5\" × 21\"</b> each", "Each holds <b>20–35 oysters</b>",
          "Or <b>6–10 king crab legs</b>", "Or <b>several pounds of shrimp</b>",
          "<b>Hinged lid</b> and built-in stand", "<b>Burner and stand</b> built in"],
   chips=["Shrimp", "Crabs", "Oysters", "Tamales", "Veggies"],
   rows=[("Two racks", "burner · hinged lid · built-in stand", "$1,525", 1),
         ("Three racks", "add $200", "$1,725", 0)],
   add_label="Lead time", add="Built to order &nbsp;·&nbsp; allow about 2 weeks"),

 dict(key="40gallon-powered", tag=COMMERCIAL, cut="40gal - propane_.png",
   h1=('40 Gallon', 'Flip Basket'),
   deck="Built-in flip basket, lid and stand. Boils in a third the time.",
   src="40 Gallon PDP (3x surface, 1/3 the time, flip basket, 2in valve, special order)",
   feats=["Nearly <b>3× the cooking surface</b>", "Boils in about <b>1/3 the time</b>",
          "<b>Flip basket</b> built in", "<b>2\" drain valve</b> standard",
          "Lid, stand and burner <b>included</b>", "<b>Special order</b> — call to buy"],
   chips=["Crawfish", "Crabs", "Shrimp", "Boiling", "Steaming"],
   rows=[("Triple Jet Burner", "standard build · 2\" drain valve", "$2,145", 1),
         ("10\" Banjo Burner instead", "for cooking and frying", "$2,175", 0),
         ("Natural gas", "Triple Jet · MultiJet", "$2,245 / $2,279", 0, 1)],
   add_label="To order", add="Call 985-260-1505 &nbsp;·&nbsp; special order"),
 dict(key="triple-jet-burner", tag="BOIL BOSS &nbsp;·&nbsp; STANDALONE BURNER",
   cut="Boilboss TJB.png", h1=('Triple', 'Jet Burner'),
   deck="The standalone burner. Goes under the Performance pot you own.",
   src="Boil Boss Triple Jet PDP (patent-pending ignition, regulator+hose, remote ignition, stainless)",
   feats=["<b>Patent-pending</b> ignition", "<b>Remote ignition</b> — no matches",
          "<b>Regulator and hose</b> included", "<b>Stainless steel</b> build",
          "Designed for <b>seafood boils</b>", "Pairs with <b>80–120 QT</b> pots"],
   chips=["Crawfish", "Crabs", "Shrimp", "Boiling"],
   rows=[("Triple Jet Burner", "regulator, hose and remote ignition", "$425", 1),
         ("Platinum Bundle", "pot + burner + ignition", "from $737", 0)],
   add="Centering brackets $35 &nbsp;·&nbsp; set of 3"),

 dict(key="module-single-jet", tag=MODULE, cut="single jet burner module.png",
   h1=('125K', 'BTU Single Jet'), chips_label="FITS",
   deck="Swap your burner plate. Single jet, built for boiling.",
   src="Single Jet Module PDP (125K BTU, fits 50 & 60 QT Powered, no leg assembly)",
   feats=["<b>125,000 BTU</b>", "Built for <b>boiling</b>",
          "Swaps in with <b>three bolts</b>", "Uses your <b>existing regulator</b>",
          "Makes one cooker <b>multi-use</b>", "<b>No leg assembly</b> — module only"],
   chips=["50 QT Powered", "60 QT Powered"],
   rows=[("Single Jet Burner Module", "125K BTU · boiling", "$62", 1),
         ("Or the 6\" Banjo module", "same pots · cooking and frying", "$74", 0)],
   add_label="Note", add="Fits 50 and 60 QT Powered Cookers only"),

 dict(key="module-double-jet", tag=MODULE, cut="double jet burner module.png",
   h1=('250K', 'BTU Double Jet'), chips_label="FITS",
   deck="Swap your burner plate. Double jet, for high-speed boiling.",
   src="Double Jet Module PDP (250K BTU, 80 QT ONLY, 30 qt of water in 5-6 min)",
   feats=["<b>250,000 BTU</b>", "<b>30 quarts</b> of water in 5–6 min",
          "Swaps in with <b>three bolts</b>", "Uses your <b>existing regulator</b>",
          "Makes one cooker <b>multi-use</b>", "<b>No leg assembly</b> — module only"],
   chips=["80 QT Powered"],
   rows=[("Double Jet Burner Module", "250K BTU · high-speed boiling", "$89", 1),
         ("Or the 10\" Banjo module", "same pot · cooking and frying", "$139", 0)],
   add_label="Note", add="Fits 80 QT Powered Cookers only"),

 dict(key="module-triple-jet", tag=MODULE, cut="triple jet burner module.png",
   h1=('375K', 'BTU Triple Jet'), chips_label="FITS",
   deck="Swap your burner plate. Three jets, our fastest boiling module.",
   src="3 Jet Module PDP (375K BTU, 100/120 QT ONLY, 15 gallons in 5-6 min)",
   feats=["<b>375,000 BTU</b>", "<b>15 gallons</b> of water in 5–6 min",
          "Swaps in with <b>three bolts</b>", "Uses your <b>existing regulator</b>",
          "Makes one cooker <b>multi-use</b>", "<b>No leg assembly</b> — module only"],
   chips=["100 QT Powered", "120 QT Powered"],
   rows=[("3 Jet Burner Module", "375K BTU · high-speed boiling", "$109", 1),
         ("Or the 10\" Banjo module", "same pots · cooking and frying", "$139", 0)],
   add_label="Note", add="Fits 100 and 120 QT Powered Cookers only"),

 dict(key="module-6in-banjo", tag=MODULE, cut="6inch banjo burner.png",
   h1=('55K', 'BTU 6" Banjo'), chips_label="FITS", mid=True,
   deck="Swap your burner plate. Turns a boiling pot into a fryer.",
   src="6in Banjo Module PDP (55K BTU, fits 18-60 QT Powered, three bolts, same regulator)",
   feats=["<b>55,000 BTU</b>", "For <b>cooking and frying</b>",
          "Swaps in with <b>three bolts</b>", "Uses your <b>existing regulator</b>",
          "Makes one cooker <b>multi-use</b>", "<b>No leg assembly</b> — module only"],
   chips=["18 QT", "30 QT", "40 QT", "60 QT Powered"],
   rows=[("6\" Banjo Burner Module", "55K BTU · cooking and frying", "$74", 1),
         ("Or the Single Jet module", "50 and 60 QT · boiling", "$62", 0)],
   add_label="Note", add="Fits 18 QT through 60 QT Powered Cookers"),

 dict(key="module-10in-banjo", tag=MODULE, cut="10inch banjo burner.png",
   h1=('200K', 'BTU 10" Banjo'), chips_label="FITS", mid=True,
   deck="Swap your burner plate. Wide flame for cooking and frying.",
   src="10in Banjo Module PDP (200K BTU, fits 80/100/120 QT Powered, same regulator)",
   feats=["<b>200,000 BTU</b>", "For <b>cooking and frying</b>",
          "Swaps in with <b>three bolts</b>", "Uses your <b>existing regulator</b>",
          "Makes one cooker <b>multi-use</b>", "<b>No leg assembly</b> — module only"],
   chips=["80 QT", "100 QT", "120 QT Powered"],
   rows=[("10\" Banjo Burner Module", "200K BTU · cooking and frying", "$139", 1),
         ("Or a jet module", "80 QT $89 · 100 and 120 QT $109", "boiling", 0, 1)],
   add_label="Note", add="Fits 80, 100 and 120 QT Powered Cookers"),

 dict(key="cooling-ring", tag="BOIL BOSS &nbsp;·&nbsp; STOPS OVERCOOKING",
   cut="boilboss cooling ring.png", h1=('Cooling', 'Ring'),
   deck="Cools your boil to 150° in under five minutes. No ice needed.",
   src="Cooling Ring PDP (150F in under 5 min, garden hose, 360 coverage, rotating brackets)",
   feats=["Down to <b>150°F</b> in under 5 min", "<b>No ice</b> — no diluted recipe",
          "Runs off a <b>garden hose</b>", "<b>360°</b> of water coverage",
          "Makes seafood <b>easier to peel</b>", "<b>Rotating brackets</b> grip the pot"],
   chips=["Crawfish", "Shrimp", "Crabs"],
   rows=[("Standard — 60 to 120 QT", "four colors", "$59.99", 1),
         ("Small — 60 QT and under", "red", "$55.99", 0),
         ("Large — 120 to 200 QT", "red", "$74.99", 0)],
   add="Combo with the Thermo Paddle $122.50"),

 dict(key="thermo-paddle", tag="BOIL BOSS &nbsp;·&nbsp; READS TEMPERATURE",
   cut="boilboss thermo paddle.png", h1=('Thermo', 'Paddle'),
   deck="Stir and read the temperature at once. 36 inches long.",
   src="Thermo Paddle PDP (36x4in, 150-160F soak target, pairs with the cooling ring)",
   feats=["Reads the <b>soak temperature</b>", "Target is <b>150–160°F</b>",
          "<b>36\" × 4\"</b> — reaches the bottom", "No <b>guesswork</b> on the soak",
          "Stops <b>mushy</b> seafood", "Pairs with the <b>Cooling Ring</b>"],
   chips=["Crawfish", "Shrimp", "Crabs"],
   rows=[("Thermo Paddle", "36\" × 4\" · reads to the bottom", "$69.99", 1),
         ("Combo with the Ring", "ring and paddle together", "$122.50", 0)],
   add="Ultimate Combo $129.98 &nbsp;·&nbsp; adds seasoning"),

 dict(key="leg-extensions", tag="ACCESSORY &nbsp;·&nbsp; THREE PRODUCTS ONLY",
   cut="leg extensions_.png", h1=('Cooker', 'Leg Extensions'), h1size=92, chips_label="FITS",
   deck="Raises your cooker to about 41 inches. Bolts to the feet.",
   src="Leg Extensions PDP (30in, ~41in finished, bolts to existing feet, 3 products only)",
   feats=["<b>30 inches</b> of extra height", "Finished height about <b>41\"</b>",
          "Bolts to the <b>existing feet</b>", "Self-standing from <b>ground level</b>",
          "<b>Premium materials</b> throughout", "Fits <b>three products only</b>"],
   chips=["18 QT Fryer", "40 QT Sauce", "4-Way Fryer"],
   rows=[("Cooker Leg Extensions", "30\" · bolts to the existing feet", "$119", 1),
         ("On the 18 QT Fryer", "also 40 QT Sauce and 4-Way", "from $285", 0)],
   add_label="Note", add="Will not fit any other cooker we sell"),

 dict(key="steamer-inserts", tag="ACCESSORY &nbsp;·&nbsp; EVERY POT SIZE",
   cut="small steamer plate.png", h1=('Steamer', 'Rack Inserts'), chips_label="FITS",
   deck="Turns a boiling pot into a steamer. A plate, not a basket.",
   src="Steamer Basket Inserts PDP (round plate, standard sits 3in up, adjustable rides on rods)",
   feats=["A round <b>plate</b> for your basket", "Standard sits <b>3\" above</b> the base",
          "Fill <b>3 inches of water</b>", "<b>Adjustable</b> version on rods",
          "Set the <b>height you want</b>", "Made for <b>every pot size</b>"],
   chips=["30 QT", "40 QT", "60 QT", "80/100 QT", "120 QT"],
   rows=[("Standard, small", "30 QT · 40 and 60 QT", "$24.99 / $27.99", 1, 1),
         ("Standard, large", "80 or 100 QT · 120 QT", "$53.99 / $59.99", 0, 1),
         ("Adjustable shelf", "80 or 100 QT · 120 QT", "$119.99 / $159.99", 0, 1)],
   add_label="Note", add="A plate that sits in the basket, not a basket"),

 dict(key="turkey-racks", tag="ACCESSORY &nbsp;·&nbsp; THREE RACKS",
   cut="single turkey fryer rack.png", h1=('Turkey', 'Fryer Racks'), chips_label="FITS",
   deck="Custom built with a lift hook handle. Three racks, three jobs.",
   src="Turkey Fryer Racks PDP for dimensions; FITMENT per Evan 2026-09-08, NOT the page body",
   feats=["<b>Lift hook handle</b> on each", "<b>Dual</b> fries two turkeys at once",
          "Dual fits the <b>60 QT</b> perfectly", "<b>Single Upright</b> fries one bird",
          "Upright suits the <b>30 QT Fryer</b>", "<b>Single Flat</b> lays the bird down"],
   chips=["30 QT Turkey Fryer", "60 QT Dual", "40 QT and up"],
   rows=[("Single Upright", "one turkey, standing", "$25", 1),
         ("Dual Turkey Rack", "two at once · fits the 60 QT", "$59.95", 0),
         ("Single Flat", "one turkey, lying flat", "$65", 0)],
   add_label="Note", add="Dual 16\" high &nbsp;·&nbsp; Upright 14.5\" high"),
]

TPL = """<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="card.css"></head>
<body><div class="card">
<!-- generated by make-cards.py — edit the data table there, not this file
     claims sourced from: {src} -->

  <div class="top">
    <div>
      <div class="tag{perf}">{tag}</div>
      <h1{h1style}>{h1html}</h1>
    </div>
    <img class="logo" src="../../../../assets/brand-refs/HPC-ShieldLogo-Black.png">
  </div>

  <div class="deck">{deck}</div>
  <div class="rule"></div>

  <div class="feats">
{feats}
  </div>

  <div class="chips">
    <span class="lbl">{chips_label}</span>
{chips}
  </div>

  <div class="bottom">
    <div class="prodcol{mid}">
      {pbox}
    </div>

    <div class="pricecol">
      <div class="prices">
        <h2>WHAT IT COSTS</h2>
{rows}
      </div>
      <div class="addons"><b>{add_label}</b>{add}</div>
    </div>
  </div>

</div></body></html>
"""

sel = sys.argv[1] if len(sys.argv) > 1 else ""
built = []
for p in P:
    if sel and sel not in p["key"]:
        continue
    assert len(p["feats"]) == 6, f'{p["key"]}: needs exactly 6 features'
    # Character budgets, measured against the approved 30 QT card. Over these the block
    # wraps to a second line and the whole card overflows 1275px with no error.
    plain = lambda t: re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", t)
                          .replace("&amp;", "&").replace("&nbsp;", " ")).strip()
    assert len(plain(p["deck"])) <= 68, f'{p["key"]}: deck {len(plain(p["deck"]))} chars, max 68'
    assert len(plain(p["add"])) <= 48, f'{p["key"]}: add-later {len(plain(p["add"]))} chars, max 48'
    for f in p["feats"]:
        assert len(plain(f)) <= 31, f'{p["key"]}: feature "{plain(f)}" is {len(plain(f))} chars, max 31'
    # Price-row sanity net. Character counts are a POOR proxy for rendered width — "Add
    # the Steamer Rack Insert" and "Add basket + steam rack" differ by four characters and
    # wrap in the opposite order — so these budgets are deliberately loose and the real
    # gate is verify() below, which measures the rendered card.
    for what, sm, amt, _hero, *two in p["rows"]:
        amt_px = len(plain(amt)) * 0.56 * (52 if (two and two[0]) else 80)
        what_px = 982 - 44 - 26 - amt_px          # pricecol minus padding, gap, amount
        w_max, s_max = int(what_px / 23.0), int(what_px / 17.0)
        assert len(plain(what)) <= w_max, (f'{p["key"]}: row label "{plain(what)}" is '
            f'{len(plain(what))} chars, max {w_max} next to {plain(amt)}')
        assert len(plain(sm)) <= s_max, (f'{p["key"]}: row note "{plain(sm)}" is '
            f'{len(plain(sm))} chars, max {s_max} next to {plain(amt)}')

    mid, box = pbox(p["cut"], p.get("nudge", (0, 0)), p.get("mid", False))
    # the size word is the orange half of the title on size-led names, the model word on the rest
    a, b = p["h1"]
    if " " in a:                       # "30 QT" -> 30 in black, QT in orange
        n, unit = a.split(" ", 1)
        h1html = f'{n} <span class="qt">{unit}</span> {b}'
    else:                              # "4-Way" -> the whole model word in orange
        h1html = f'<span class="qt">{a}</span> {b}' 
    html = TPL.format(
        src=p["src"], tag=p["tag"], perf=" perf" if p["tag"] == PERF else "",
        h1style=f' style="font-size:{p["h1size"]}px"' if p.get("h1size") else "",
        h1html=h1html, deck=p["deck"],
        feats="\n".join(f'    <div class="feat"><i class="dot"></i><span>{f}</span></div>'
                        for f in p["feats"]),
        chips="\n".join(f'    <span class="chip">{c}</span>' for c in p["chips"]),
        chips_label=p.get("chips_label", "GOOD FOR"), mid=mid, pbox=box,
        rows="\n".join(
            f'        <div class="prow{" hero" if hero else ""}">\n'
            f'          <div class="what">{what}\n            <small>{sm}</small></div>\n'
            f'          <div class="amt{" two" if two and two[0] else ""}">{amt}</div>\n        </div>'
            for what, sm, amt, hero, *two in p["rows"]),
        add=p["add"], add_label=p.get("add_label", "Add later"))
    open(os.path.join(HERE, p["key"] + ".html"), "w").write(html)
    built.append(p["key"])

for k in built:
    subprocess.run([os.path.join(CREATIVE, "build.sh"),
                    f"templates/showroom-cards/{k}.html", "1650x1275",
                    f"drafts/showroom/{k}.png"], cwd=CREATIVE)


def verify(key):
    """Measure the rendered card. Character budgets cannot catch a wrap; this can.

    Returns a list of problems, empty when the card is sound:
      the card overflows 1275px · a feature wrapped to two lines · a price-row label
      wrapped and clipped its own note · the product is off-centre in its column.
    """
    out = subprocess.run([sys.executable, os.path.join(HERE, "heights.py"),
                          os.path.join(HERE, key + ".html")],
                         capture_output=True, text=True).stdout
    bad = []
    if not out.strip():
        return ["heights.py returned nothing"]
    for line in out.splitlines():
        c = line.split()
        if line.startswith("scrollHeight") and int(c[1]) > 1275:
            bad.append(f"overflows: scrollHeight {c[1]} > 1275")
        if line.startswith(".deck") and c[3] != "56":
            bad.append(f"deck wrapped ({c[3]}px, expected 56) — shorten it")
        if line.startswith(".addons") and c[3] != "89":
            bad.append(f"add-later line wrapped ({c[3]}px, expected 89) — shorten it")
        if line.startswith(".bottom") and c[2] != "1246":
            bad.append(f"band ends at {c[2]}, expected 1246")
        if "data-k=feat" in line and c[3] != "51":
            bad.append(f"feature {c[0]} wrapped ({c[3]}px, expected 51)")
        if "data-k=what" in line and int(c[3]) > 100:
            bad.append(f"price-row label {c[0]} wrapped ({c[3]}px) — its note is clipped")
    m = subprocess.run([sys.executable, os.path.join(HERE, "measure-panel.py"),
                        os.path.join(CREATIVE, "drafts", "showroom", key + ".png")],
                       capture_output=True, text=True).stdout
    if "[OUT]" in m:
        bad.append("product off-centre: " + m.strip().splitlines()[-1].strip())
    return bad


print()
fails = 0
for k in built:
    problems = verify(k)
    fails += bool(problems)
    print(f"  {'FAIL' if problems else 'ok  '}  {k}")
    for b in problems:
        print(f"          {b}")
print(f"\n{len(built)} card(s) built, {fails} with problems.")
sys.exit(1 if fails else 0)
