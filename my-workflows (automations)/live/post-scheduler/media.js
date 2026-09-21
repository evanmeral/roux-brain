// post-scheduler / media.js — read pixel size from PNG, JPEG, MP4 and MOV headers, and hash files.
// Pure Node, no dependencies, no network. Reads bytes only; never writes.
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v']);

function kind(file) {
  const e = path.extname(file).toLowerCase();
  return IMAGE_EXT.has(e) ? 'image' : VIDEO_EXT.has(e) ? 'video' : 'unknown';
}

function pngSize(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47 || buf.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xff) { i++; continue; }
    // SOF0–SOF15, except DHT (C4), JPG (C8), DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

// MP4 / MOV: walk the atom tree to moov → trak → tkhd. The video track is the one whose tkhd
// carries a non-zero width and height. A 90° or 270° display matrix swaps them (phone video).
function mp4Size(file) {
  const fd = fs.openSync(file, 'r');
  try {
    const total = fs.fstatSync(fd).size;
    const head = Buffer.alloc(16);
    const readAt = (pos, len) => { const b = Buffer.alloc(len); fs.readSync(fd, b, 0, len, pos); return b; };
    const walk = (start, end, want) => {
      const found = [];
      let pos = start;
      while (pos + 8 <= end) {
        fs.readSync(fd, head, 0, 16, pos);
        let size = head.readUInt32BE(0); const type = head.toString('latin1', 4, 8); let hdr = 8;
        if (size === 1) { size = Number(head.readBigUInt64BE(8)); hdr = 16; } else if (size === 0) size = end - pos;
        if (size < hdr) break;
        if (type === want) found.push({ start: pos + hdr, end: Math.min(pos + size, end) });
        pos += size;
      }
      return found;
    };
    for (const moov of walk(0, total, 'moov')) {
      for (const trak of walk(moov.start, moov.end, 'trak')) {
        for (const tkhd of walk(trak.start, trak.end, 'tkhd')) {
          const b = readAt(tkhd.start, Math.min(tkhd.end - tkhd.start, 104));
          const v1 = b[0] === 1;
          const mOff = v1 ? 52 : 40;            // start of the 3×3 matrix
          const wOff = mOff + 36;
          if (b.length < wOff + 8) continue;
          let width = b.readUInt32BE(wOff) / 65536; let height = b.readUInt32BE(wOff + 4) / 65536;
          if (!width || !height) continue;      // an audio track
          const a = b.readInt32BE(mOff); const bb = b.readInt32BE(mOff + 4);
          if (a === 0 && bb !== 0) [width, height] = [height, width];   // rotated 90 / 270
          return { width: Math.round(width), height: Math.round(height) };
        }
      }
    }
    return null;
  } finally { fs.closeSync(fd); }
}

/** @returns {{kind, bytes, width, height, error}} — never throws. */
function inspect(file) {
  const out = { kind: kind(file), bytes: null, width: null, height: null, error: null };
  try {
    out.bytes = fs.statSync(file).size;
    let dim = null;
    if (out.kind === 'image') {
      const fd = fs.openSync(file, 'r');
      const buf = Buffer.alloc(Math.min(out.bytes, 512 * 1024));
      try { fs.readSync(fd, buf, 0, buf.length, 0); } finally { fs.closeSync(fd); }
      dim = pngSize(buf) || jpegSize(buf);
    } else if (out.kind === 'video') dim = mp4Size(file);
    if (dim) { out.width = dim.width; out.height = dim.height; }
    else out.error = out.kind === 'unknown' ? 'file type not recognised (png, jpg, mp4, mov)' : 'could not read the pixel size from the file header';
  } catch (e) { out.error = e.code === 'ENOENT' ? 'file not found' : e.message; }
  return out;
}

function sha256(file) {
  try { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
  catch (e) { return null; }
}

module.exports = { inspect, sha256, kind };
