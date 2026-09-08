#!/usr/bin/env python3
"""Copy the rendered cards into a hand-off folder with names a person can read.

The build keys (18qt-powered, module-10in-banjo) are for the generator. Whoever prints
these needs to match a card to a product on the showroom floor, so the exported names are
the product names, numbered in the order they should be printed: cookers by size, then
steamers and commercial, then burners, then accessories.

  python3 export-for-print.py [dest]      # default: <repo>/my-work (outputs)/.../for-printing
"""
import os, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DRAFTS = os.path.abspath(os.path.join(HERE, "..", "..", "drafts", "showroom"))

ORDER = [
    ("18qt-powered",             "18 QT Powered Fryer"),
    ("30qt-powered",             "30 QT Powered Pot"),
    ("30qt-turkey-powered",      "30 QT Turkey Fryer (Powered)"),
    ("40qt-powered",             "40 QT Powered Sauce Cooker"),
    ("4way-powered",             "4-Way Fryer + Pasta Cooker (Powered)"),
    ("60qt-powered",             "60 QT Powered Cooker"),
    ("60qt-dual-turkey-powered", "60 QT Dual Turkey Fryer (Powered)"),
    ("80qt-powered",             "80 QT Powered Cooker"),
    ("100qt-powered",            "100 QT Powered Cooker"),
    ("120qt-powered",            "120 QT Powered Cooker"),
    ("18qt-performance",         "18 QT Performance Fryer"),
    ("30qt-performance",         "30 QT Performance Pot"),
    ("4way-performance",         "4-Way Fryer + Pasta Cooker (Performance)"),
    ("60qt-performance",         "60 QT Performance Pot"),
    ("80qt-performance",         "80 QT Performance Pot"),
    ("100qt-performance",        "100 QT Performance Pot"),
    ("120qt-performance",        "120 QT Performance Pot"),
    ("28qt-steamer",             "28 QT Rack Steamer"),
    ("100qt-steamer",            "100 QT Rack Steamer"),
    ("40gallon-powered",         "40 Gallon Flip Basket (Commercial)"),
    ("triple-jet-burner",        "Boil Boss Triple Jet Burner"),
    ("module-single-jet",        "Burner Module - 125K Single Jet"),
    ("module-double-jet",        "Burner Module - 250K Double Jet"),
    ("module-triple-jet",        "Burner Module - 375K Triple Jet"),
    ("module-6in-banjo",         "Burner Module - 55K 6 inch Banjo"),
    ("module-10in-banjo",        "Burner Module - 200K 10 inch Banjo"),
    ("cooling-ring",             "Boil Boss Cooling Ring"),
    ("thermo-paddle",            "Boil Boss Thermo Paddle"),
    ("leg-extensions",           "Cooker Leg Extensions"),
    ("steamer-inserts",          "Steamer Rack Inserts (all sizes)"),
    ("turkey-racks",             "Turkey Fryer Racks (all three)"),
]

# Walk up to the repo root rather than counting "..", which was off by one and quietly
# created a second my-work tree under my-skills/ instead of failing.
ROOT = HERE
while not os.path.isdir(os.path.join(ROOT, "my-work (outputs)")):
    parent = os.path.dirname(ROOT)
    if parent == ROOT:
        raise SystemExit("could not find the repo root from " + HERE)
    ROOT = parent
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    ROOT, "my-work (outputs)", "content", "other", "showroom-cards", "for-printing")
os.makedirs(dest, exist_ok=True)

built = {f[:-4] for f in os.listdir(DRAFTS) if f.endswith(".png")}
missing = built - {k for k, _ in ORDER}
if missing:
    raise SystemExit(f"rendered but not in ORDER — add them: {sorted(missing)}")

for i, (key, name) in enumerate(ORDER, 1):
    src = os.path.join(DRAFTS, key + ".png")
    if not os.path.exists(src):
        raise SystemExit(f"{key}.png has not been rendered — run make-cards.py first")
    shutil.copy2(src, os.path.join(dest, f"{i:02d} {name}.png"))

print(f"{len(ORDER)} cards -> {dest}")
