#!/usr/bin/env python3
"""Read and write PNGs with no third-party dependencies, plus the two asset chores the
showroom-card batch needs.

Why this exists: this machine has no Pillow, and several product cutouts arrive as JPEGs
that were flattened onto black when they were exported — the alpha channel is gone, so
they would print as a black rectangle on a white card.

  python3 pngtool.py key   <in.png> <out.png> [black|white]   # background -> alpha
  python3 pngtool.py bbox  <file.png> [...]     # visible bounds, as _bboxes.json entries

`key` only recovers a cutout when the product has no genuinely black parts. Check the
result before trusting it: a black knob or fitting will be punched out along with the
background, and there is no way to tell them apart.
"""
import json, os, struct, sys, zlib


def read_png(path):
    data = open(path, "rb").read()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"{path} is not a PNG"
    pos, idat = 8, []
    while pos < len(data):
        ln, typ = struct.unpack(">I4s", data[pos:pos + 8])
        body = data[pos + 8:pos + 8 + ln]
        if typ == b"IHDR":
            w, h, depth, color, _, _, interlace = struct.unpack(">IIBBBBB", body)
            assert depth == 8 and interlace == 0, "need 8-bit non-interlaced"
            ch = {0: 1, 2: 3, 4: 2, 6: 4}[color]
        elif typ == b"IDAT":
            idat.append(body)
        elif typ == b"IEND":
            break
        pos += 12 + ln
    raw = zlib.decompress(b"".join(idat))
    stride, out, prev, p = w * ch, bytearray(w * h * ch), bytearray(w * ch), 0
    for y in range(h):
        ft = raw[p]; p += 1
        line = bytearray(raw[p:p + stride]); p += stride
        if ft == 1:
            for i in range(ch, stride): line[i] = (line[i] + line[i - ch]) & 255
        elif ft == 2:
            for i in range(stride): line[i] = (line[i] + prev[i]) & 255
        elif ft == 3:
            for i in range(stride):
                a = line[i - ch] if i >= ch else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 255
        elif ft == 4:
            for i in range(stride):
                a = line[i - ch] if i >= ch else 0
                c = prev[i - ch] if i >= ch else 0
                b = prev[i]
                pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 255
        elif ft != 0:
            raise ValueError(f"bad filter {ft}")
        out[y * stride:(y + 1) * stride] = line
        prev = line
    return w, h, ch, out


def write_rgba(path, w, h, px):
    raw = b"".join(b"\x00" + bytes(px[y * w * 4:(y + 1) * w * 4]) for y in range(h))
    def chunk(t, d):
        c = t + d
        return struct.pack(">I", len(d)) + c + struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF)
    open(path, "wb").write(
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b""))


def key_flat(src, dst, bg="black", hard=22, soft=62):
    """Make a flat background transparent, ramping between `hard` and `soft` so JPEG
    ringing at the product edge fades out instead of leaving a hard fringe.

    A white background matters as much as a black one here: .pbox applies a drop-shadow
    filter, and an opaque white rectangle casts a rectangular shadow on the card."""
    w, h, ch, px = read_png(src)
    out = bytearray(w * h * 4)
    punched = 0
    for i in range(w * h):
        j = i * ch
        r, g, b = px[j], px[j + 1], px[j + 2]
        d = 255 - min(r, g, b) if bg == "white" else max(r, g, b)
        if d <= hard:
            a = 0; punched += 1
        elif d >= soft:
            a = 255
        else:
            a = int(255 * (d - hard) / (soft - hard))
        out[i * 4:i * 4 + 4] = bytes((r, g, b, a))
    write_rgba(dst, w, h, out)
    print(f"{os.path.basename(dst)}  {w}x{h}  {100*punched/(w*h):.1f}% keyed out ({bg} bg)")


def bbox(path, alpha=120):
    """Visible bounds. `alpha` is deliberately high, not 1: several cutouts carry a soft
    drop shadow baked into the alpha channel, and counting it as "product" inflates the box
    so the product renders smaller and off-centre. 120 keeps the shadow out."""
    w, h, ch, px = read_png(path)
    if ch == 4:
        vis = lambda j: px[j + 3] > alpha
    else:
        k = (px[0], px[1], px[2])                      # background sampled at 0,0
        vis = lambda j: abs(px[j]-k[0]) + abs(px[j+1]-k[1]) + abs(px[j+2]-k[2]) > 36
    x0, y0, x1, y1 = w, h, -1, -1
    for y in range(h):
        row = y * w
        for x in range(w):
            if vis((row + x) * ch):
                if x < x0: x0 = x
                if x > x1: x1 = x
                if y < y0: y0 = y
                if y > y1: y1 = y
    return {"w": w, "h": h, "x": round(x0 / w, 4), "y": round(y0 / h, 4),
            "bw": round((x1 - x0 + 1) / w, 4), "bh": round((y1 - y0 + 1) / h, 4)}


cmd = sys.argv[1]
if cmd == "key":
    key_flat(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else "black")
elif cmd == "bbox":
    print(json.dumps({os.path.basename(p): bbox(p) for p in sys.argv[2:]}, indent=1))
else:
    sys.exit(__doc__)
