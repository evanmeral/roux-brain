#!/usr/bin/env python3
"""Measure where the product actually sits inside a rendered showroom card.

Decodes the PNG in pure Python (zlib + the standard PNG filters) — no Pillow, and no
headless Chrome. The Chrome-canvas version this replaces returned "no data" on roughly a
third of runs because --virtual-time-budget raced the async image decode, which is a
terrible property for a check that is supposed to gate a print run.

  python3 measure-panel.py <card.png> [w] [h] [tol] [x0] [y0]

Defaults measure the bottom-left product region of a 1650x1275 card: 600x620 at (0,634).
Reports, in pixels from the region centre (negative = left / up):
  bbox — where the whole silhouette sits
  ink  — where the visual weight sits, weighted by how far each pixel differs from the
         background. Thin accessories (a lid leaning out, a hose) drag bbox but not ink.

Both dx values must land inside +/-50. dy is near 0 on a `mid` card and large and
positive on a bottom-aligned one — that is the product sitting in the corner, not an error.
"""
import os, struct, sys, zlib

PAETH = lambda a, b, c: (a, b, c)[min(
    ((abs(b - c), 0), (abs(a - c), 1), (abs(a + b - 2 * c), 2)))[1]] if False else None


def read_png(path):
    """Return (width, height, channels, bytearray of raw samples)."""
    data = open(path, "rb").read()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"{path} is not a PNG"
    pos, idat, w = 8, [], None
    while pos < len(data):
        ln, typ = struct.unpack(">I4s", data[pos:pos + 8])
        body = data[pos + 8:pos + 8 + ln]
        if typ == b"IHDR":
            w, h, depth, color, _, _, interlace = struct.unpack(">IIBBBBB", body)
            assert depth == 8, f"only 8-bit PNGs supported, got {depth}"
            assert interlace == 0, "interlaced PNG not supported"
            ch = {0: 1, 2: 3, 4: 2, 6: 4}[color]
        elif typ == b"IDAT":
            idat.append(body)
        elif typ == b"IEND":
            break
        pos += 12 + ln
    raw = zlib.decompress(b"".join(idat))
    stride = w * ch
    out = bytearray(w * h * ch)
    prev = bytearray(stride)
    p = 0
    for y in range(h):
        ft = raw[p]; p += 1
        line = bytearray(raw[p:p + stride]); p += stride
        if ft == 1:
            for i in range(ch, stride):
                line[i] = (line[i] + line[i - ch]) & 0xFF
        elif ft == 2:
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 0xFF
        elif ft == 3:
            for i in range(stride):
                a = line[i - ch] if i >= ch else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 0xFF
        elif ft == 4:
            for i in range(stride):
                a = line[i - ch] if i >= ch else 0
                c = prev[i - ch] if i >= ch else 0
                b = prev[i]
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 0xFF
        elif ft != 0:
            raise ValueError(f"bad PNG filter {ft}")
        out[y * stride:(y + 1) * stride] = line
        prev = line
    return w, h, ch, out


f = sys.argv[1]
RW = int(sys.argv[2]) if len(sys.argv) > 2 else 600
RH = int(sys.argv[3]) if len(sys.argv) > 3 else 620
TOL = int(sys.argv[4]) if len(sys.argv) > 4 else 60
OX = int(sys.argv[5]) if len(sys.argv) > 5 else 0
OY = int(sys.argv[6]) if len(sys.argv) > 6 else 634
INSET = 26

W, H, CH, px = read_png(f)
x_lo, y_lo = OX + INSET, OY + INSET
x_hi, y_hi = min(OX + RW - INSET, W), min(OY + RH - INSET, H)

i = (y_lo * W + x_lo) * CH
BR, BG, BB_ = px[i], px[i + 1], px[i + 2]          # background sampled inside the region

x0, y0, x1, y1 = 1 << 30, 1 << 30, -1, -1
sw = sx = sy = 0
for y in range(y_lo, y_hi):
    row = y * W
    for x in range(x_lo, x_hi):
        j = (row + x) * CH
        d = abs(px[j] - BR) + abs(px[j + 1] - BG) + abs(px[j + 2] - BB_)
        if d > TOL:
            if x < x0: x0 = x
            if x > x1: x1 = x
            if y < y0: y0 = y
            if y > y1: y1 = y
            sw += d; sx += d * x; sy += d * y

if x1 < 0:
    raise SystemExit(f"{os.path.basename(f)}: nothing found in the region — wrong offsets?")

cx, cy = OX + RW / 2, OY + RH / 2
bx, by = (x0 + x1) / 2, (y0 + y1) / 2
ok = "OK " if abs(bx - cx) <= 50 and abs(sx / sw - cx) <= 50 else "OUT"
print(f"{os.path.basename(f)}  region {RW}x{RH} at ({OX},{OY})")
print(f"  bbox   x {x0}..{x1}  y {y0}..{y1}   ({x1-x0} x {y1-y0})")
print(f"  bbox centre  dx {bx-cx:+.0f}   dy {by-cy:+.0f}")
print(f"  ink  centre  dx {sx/sw-cx:+.0f}   dy {sy/sw-cy:+.0f}   [{ok}]")
