// ROUX OS — Home tab. The brain as a slowly turning globe. Every agent, skill, routine, app and file
// sits on the surface, grouped into six regions (one per hub); ROUX glows at the core with a line to
// each hub. Parent links run along the surface; the real links between files arc over it like flight
// paths, and small sparks travel along them. Drag to spin, scroll to zoom, click a light to bring it
// to the front. Canvas, no library. Data from /api/graph (read-only).
// Honors prefers-reduced-motion (no auto-spin, no sparks).
'use strict';
const GRAPH = (() => {
  const GROUPS = {
    core: { label: 'ROUX', color: '#F6A04D' },
    agents: { label: 'Agents', color: '#E9C46A', sub: 'one lane each' },
    skills: { label: 'Skills', color: '#A594F9', sub: 'repeatable jobs + their notes' },
    routines: { label: 'Routines', color: '#4FD1C5', sub: 'scheduled tasks, the pulse, workflows' },
    apps: { label: 'Apps', color: '#F08BB9', sub: 'connected tools' },
    work: { label: 'Work', color: '#6AA8F0', sub: 'my-work (outputs)' },
    business: { label: 'Memory · business', color: '#F07B6E', sub: 'my-business (context)' },
    desk: { label: 'Memory · desk', color: '#F2A65A', sub: 'board, plan, decisions' },
    knowledge: { label: 'Memory · knowledge', color: '#7DD67D', sub: 'my-files (knowledge)' },
    memory: { label: 'Memory', color: '#E6DFD8' },
  };
  // hub regions on the globe: longitude around, alternating a little above and below the equator
  const HUBS = [['h:work', 0, -20], ['h:agents', 60, 26], ['h:skills', 120, -18], ['h:apps', 180, 24], ['h:memory', 240, -22], ['h:routines', 300, 22]];
  const KIND_NAME = { core: 'The brain', hub: 'Hub', agent: 'Agent', skill: 'Skill', file: 'File', folder: 'Folder', routine: 'Routine', app: 'App' };
  const CALM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = 3.2;                       // camera distance, in globe radii (perspective)
  const SPIN = CALM ? 0 : 0.045;       // radians per second: about 2.3 minutes a turn
  let data = null, nodes = [], edges = [], byId = new Map(), adj = new Map();
  let canvas, ctx, W = 0, H = 0, dpr = 1;
  let yaw = 0.4, pitch = -0.28, zoom = 1, target = null, lastTouch = -10;
  let hover = null, selected = null, query = '', showLinks = true;
  const hidden = new Set();
  let loop = null, loaded = false, loading = false, lastFrame = 0, T = 0, prevT = 0;
  let pulses = [], nextPulse = 0, dust = [], grid = [];

  const color = (n) => (GROUPS[n.group] || GROUPS.memory).color;
  const visible = (n) => !hidden.has(n.group) || n.kind === 'core' || n.kind === 'hub';
  function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
  function tint(hex, k) { const n = parseInt(hex.slice(1), 16); const m = (c) => Math.round(c + (255 - c) * k); return `rgb(${m(n >> 16)},${m((n >> 8) & 255)},${m(n & 255)})`; }
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  function size(n) {
    if (n.kind === 'core') return 15;
    if (n.kind === 'hub') return 8.5;
    if (n.kind === 'folder') return Math.min(6, 3 + Math.sqrt(n.count || 1) * 0.5);
    if (n.kind === 'file') return 2.2 + Math.min(2.6, (adj.get(n.id) || []).length * 0.17);
    return 4.6;
  }

  // ---------- vectors ----------
  const V = (x, y, z) => ({ x, y, z });
  const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
  const cross = (a, b) => V(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
  const norm = (a) => { const l = Math.hypot(a.x, a.y, a.z) || 1; return V(a.x / l, a.y / l, a.z / l); };
  const dir = (lonDeg, latDeg) => { const lo = lonDeg * Math.PI / 180, la = latDeg * Math.PI / 180; return V(Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)); };
  function around(c, ang, phi) {   // the point `ang` radians from c, heading `phi`
    const up = Math.abs(c.y) > 0.95 ? V(1, 0, 0) : V(0, 1, 0);
    const e1 = norm(cross(c, up)), e2 = cross(c, e1);
    const s = Math.sin(ang), k = Math.cos(ang);
    return norm(V(c.x * k + (e1.x * Math.cos(phi) + e2.x * Math.sin(phi)) * s, c.y * k + (e1.y * Math.cos(phi) + e2.y * Math.sin(phi)) * s, c.z * k + (e1.z * Math.cos(phi) + e2.z * Math.sin(phi)) * s));
  }
  function slerp(a, b, t) {
    const d = Math.max(-1, Math.min(1, dot(a, b))); const w = Math.acos(d);
    if (w < 1e-4) return a;
    const s = Math.sin(w), p = Math.sin((1 - t) * w) / s, q = Math.sin(t * w) / s;
    return V(a.x * p + b.x * q, a.y * p + b.y * q, a.z * p + b.z * q);
  }

  // ---------- layout on the sphere ----------
  function layout() {
    seed = 7;
    const parent = new Map(); for (const e of edges) if (e.t === 'tree') parent.set(e.b, e.a);
    const hubOf = (n) => { let c = n.id; for (let i = 0; i < 12 && c; i++) { const p = parent.get(c); if (!p || p === 'core') return byId.get(c); c = p; } return null; };
    const core = byId.get('core'); core.u = V(0, 0, 0); core.fixed = true;
    for (const n of nodes) { n.hub = n === core ? null : hubOf(n); n.parent = parent.get(n.id); }
    for (const n of nodes) { let d = 0, c = n.id; while (parent.get(c) && d < 12) { c = parent.get(c); d++; } n.depth = d; }
    for (const [id, lon, lat] of HUBS) { const h = byId.get(id); if (h) { h.u = dir(lon, lat); h.fixed = true; } }
    // each region: direct children spiral out from the hub, deeper nodes sit near their parent
    for (const [id] of HUBS) {
      const h = byId.get(id); if (!h) continue;
      const members = nodes.filter((n) => n.hub === h && n !== h).sort((a, b) => a.depth - b.depth);
      h.cap = 0.14 + Math.sqrt(members.length) * 0.055;
      // spread from the first level that has some width (Work has one folder, Outputs, above everything)
      let first = members.filter((n) => n.parent === h.id);
      while (first.length && first.length < 3) {
        const next = members.filter((n) => first.some((f) => f.id === n.parent));
        if (!next.length) break;
        first.forEach((f) => { f.u = around(h.u, 0.02, rnd() * 6.283); });
        first = next;
      }
      first.forEach((n, k) => { const r = h.cap * 0.75 * Math.sqrt((k + 0.6) / first.length); n.u = around(h.u, r, k * 2.39996 + rnd() * 0.3); });
      for (const n of members) { n.want = 0.045 + rnd() * 0.075; if (!n.u) { const p = byId.get(n.parent); n.u = around((p && p.u) || h.u, n.want, rnd() * 6.283); } }
    }
    for (const n of nodes) if (!n.u) n.u = norm(V(rnd() - .5, rnd() - .5, rnd() - .5));
    // relax on the surface: spread out, keep children near parents and inside their region
    const free = nodes.filter((n) => !n.fixed);
    for (let it = 0; it < 140; it++) {
      const k = 1 - it / 140;
      for (let i = 0; i < free.length; i++) {
        const a = free[i]; let fx = 0, fy = 0, fz = 0;
        for (let j = 0; j < nodes.length; j++) {
          const b = nodes[j]; if (a === b || b === core) continue;
          const dx = a.u.x - b.u.x, dy = a.u.y - b.u.y, dz = a.u.z - b.u.z; const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 > 0.05) continue;
          const f = (b.kind === 'hub' ? 0.00016 : 0.00008) / (d2 + 0.0005);
          fx += dx * f; fy += dy * f; fz += dz * f;
        }
        const p = a.parent && byId.get(a.parent);
        if (p && p !== core) { const want = p.kind === 'hub' ? (a.hub ? a.hub.cap * (0.35 + (a.want || 0.08) * 4) : 0.1) : (a.want || 0.07); const d = Math.sqrt((a.u.x - p.u.x) ** 2 + (a.u.y - p.u.y) ** 2 + (a.u.z - p.u.z) ** 2) || 1e-3; const f = (d - want) * 0.06 / d; fx -= (a.u.x - p.u.x) * f; fy -= (a.u.y - p.u.y) * f; fz -= (a.u.z - p.u.z) * f; }
        if (a.hub) { const c = dot(a.u, a.hub.u); const ang = Math.acos(Math.max(-1, Math.min(1, c))); if (ang > a.hub.cap) { const f = (ang - a.hub.cap) * 0.08; fx += (a.hub.u.x - a.u.x) * f; fy += (a.hub.u.y - a.u.y) * f; fz += (a.hub.u.z - a.u.z) * f; } }
        a.u = norm(V(a.u.x + fx * k, a.u.y + fy * k, a.u.z + fz * k));
      }
    }
    // edges: points along each, in globe space (static; the globe turns, the map does not)
    for (const e of edges) {
      const a = byId.get(e.a), b = byId.get(e.b);
      const pts = [];
      if (a === core || b === core) { const o = a === core ? b : a; for (let i = 0; i <= 10; i++) { const t = i / 10; pts.push(V(o.u.x * t, o.u.y * t, o.u.z * t)); } }
      else {
        const w = Math.acos(Math.max(-1, Math.min(1, dot(a.u, b.u))));
        const n = Math.max(2, Math.min(28, Math.ceil(w / 0.05)));
        const lift = e.t === 'link' ? 0.015 + 0.09 * w / Math.PI : 0.003;   // low arcs: the web hugs the globe
        for (let i = 0; i <= n; i++) { const t = i / n; const p = slerp(a.u, b.u, t); const r = 1 + lift * Math.sin(Math.PI * t); pts.push(V(p.x * r, p.y * r, p.z * r)); }
      }
      e.pts = pts; e.proj = pts.map(() => ({ x: 0, y: 0, z: 0 }));
    }
    for (const n of nodes) { n.r = size(n); n.tw = rnd() * 6.283; }
  }
  function makeGrid() {
    grid = [];
    for (let lon = 0; lon < 360; lon += 30) { const line = []; for (let lat = -84; lat <= 84; lat += 6) line.push(dir(lon, lat)); grid.push(line); }
    for (const lat of [-60, -30, 0, 30, 60]) { const line = []; for (let lon = 0; lon <= 360; lon += 6) line.push(dir(lon, lat)); grid.push(line); }
    grid = grid.map((l) => ({ pts: l, proj: l.map(() => ({ x: 0, y: 0, z: 0 })) }));
  }

  // ---------- camera ----------
  let cyw = 1, syw = 0, cp = 1, sp = 0, CX = 0, CY = 0, S = 1;
  function room() {
    const wrap = $('graph-wrap').getBoundingClientRect(); const Rt = $('home-right');
    let r = W; if (Rt && Rt.offsetParent) r = Rt.getBoundingClientRect().left - wrap.left - 16;
    if (r < W * 0.45) r = W;
    const t = 70, b = H - 36;
    return { cx: r / 2, cy: (t + b) / 2, w: r, h: b - t };
  }
  function camera() {
    const R0 = room();
    CX = R0.cx; CY = R0.cy;
    S = Math.min(R0.w, R0.h) * 0.4 * zoom;
    cyw = Math.cos(yaw); syw = Math.sin(yaw); cp = Math.cos(pitch); sp = Math.sin(pitch);
  }
  function project(v, out) {
    const x1 = v.x * cyw + v.z * syw, z1 = -v.x * syw + v.z * cyw;
    const y2 = v.y * cp - z1 * sp, z2 = v.y * sp + z1 * cp;
    const f = D / (D - z2);
    out.x = CX + x1 * S * f; out.y = CY - y2 * S * f; out.z = z2; out.f = f;
    return out;
  }
  const light = (z) => 0.12 + 0.88 * Math.pow((z + 1) / 2, 1.6);   // front bright, far side dim

  // ---------- draw ----------
  const sprites = {};
  function sprite(c) {
    if (sprites[c]) return sprites[c];
    const s = 64, cv = document.createElement('canvas'); cv.width = cv.height = s * 2;
    const g = cv.getContext('2d'); const gr = g.createRadialGradient(s, s, 0, s, s, s);
    gr.addColorStop(0, hexA(c, 1)); gr.addColorStop(0.09, hexA(c, .75)); gr.addColorStop(0.26, hexA(c, .24)); gr.addColorStop(0.55, hexA(c, .06)); gr.addColorStop(1, hexA(c, 0));
    g.fillStyle = gr; g.fillRect(0, 0, s * 2, s * 2);
    return (sprites[c] = cv);
  }
  function matches(n) { if (!query) return false; const q = query.toLowerCase(); return n.label.toLowerCase().includes(q) || (n.rel || '').toLowerCase().includes(q) || (n.desc || '').toLowerCase().includes(q); }

  function frame(now) {
    if (!ctx || !W || !loaded) return;
    const dt = Math.min(0.1, now - (prevT || now)); prevT = now; T = now;
    // motion: ease toward a target (a clicked light), else a slow spin once left alone for a moment
    if (target) {
      let dy = target.yaw - yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      yaw += dy * Math.min(1, dt * 4); pitch += (target.pitch - pitch) * Math.min(1, dt * 4); zoom += (target.zoom - zoom) * Math.min(1, dt * 4);
      if (Math.abs(dy) < 0.002 && Math.abs(target.pitch - pitch) < 0.002 && Math.abs(target.zoom - zoom) < 0.002) target = null;
    } else if (!selected && !hover && now - lastTouch > 2.5) yaw += SPIN * dt;
    camera();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);
    for (const d of dust) { const a = d.a * (CALM ? 1 : 0.55 + 0.45 * Math.sin(T * d.s + d.p)); ctx.fillStyle = `rgba(230,220,210,${a})`; ctx.fillRect(d.x * W, d.y * H, d.r, d.r); }

    // the globe body: an atmosphere halo and a soft shaded disc
    const rim = S * D / Math.sqrt(D * D - 1);
    let g = ctx.createRadialGradient(CX, CY, rim * 0.92, CX, CY, rim * 1.22);
    g.addColorStop(0, 'rgba(246,160,77,0.10)'); g.addColorStop(1, 'rgba(246,160,77,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, rim * 1.22, 0, Math.PI * 2); ctx.fill();
    g = ctx.createRadialGradient(CX - rim * 0.35, CY - rim * 0.4, rim * 0.1, CX, CY, rim);
    g.addColorStop(0, 'rgba(60,50,44,0.30)'); g.addColorStop(0.7, 'rgba(24,21,19,0.35)'); g.addColorStop(1, 'rgba(12,11,10,0.55)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, rim, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(246,190,140,0.10)'; ctx.lineWidth = 1; ctx.stroke();

    const focus = selected || hover;
    const near = new Set(); if (focus) { near.add(focus.id); for (const m of adj.get(focus.id) || []) near.add(m.id); }
    const hits = query ? new Set(nodes.filter(matches).map((n) => n.id)) : null;
    const dim = !!(focus || hits);
    const lit = (n) => !dim || near.has(n.id) || (hits && hits.has(n.id));

    ctx.globalCompositeOperation = 'lighter';
    // graticule
    for (const l of grid) {
      for (let i = 0; i < l.pts.length; i++) project(l.pts[i], l.proj[i]);
      for (let i = 1; i < l.pts.length; i++) {
        const a = l.proj[i - 1], b = l.proj[i]; const z = (a.z + b.z) / 2;
        ctx.strokeStyle = `rgba(240,220,200,${z > 0 ? 0.05 : 0.018})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    // edges
    for (const e of edges) {
      const a = byId.get(e.a), b = byId.get(e.b);
      if (!visible(a) || !visible(b)) continue;
      const touches = focus && (a === focus || b === focus);
      if (e.t === 'link' && !showLinks && !touches) continue;
      for (let i = 0; i < e.pts.length; i++) project(e.pts[i], e.proj[i]);
      const core = a.kind === 'core';
      const base = e.t === 'tree' ? (touches ? .9 : dim ? .04 : core ? .3 : b.kind === 'file' ? .28 : .38) : (touches ? .7 : dim ? .015 : .075);
      const col = e.t === 'tree' ? color(b) : '#F6E3CF';
      ctx.lineWidth = touches ? 1.6 : core ? 1.3 : e.t === 'link' ? 0.8 : 0.9;
      for (let i = 1; i < e.proj.length; i++) {
        const p = e.proj[i - 1], q = e.proj[i];
        ctx.strokeStyle = hexA(col, base * light((p.z + q.z) / 2));
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
    }
    // sparks
    if (!CALM) {
      if (T > nextPulse && pulses.length < 16 && edges.length) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        if (visible(byId.get(e.a)) && visible(byId.get(e.b)) && (e.t === 'tree' || showLinks)) pulses.push({ e, t0: T, dur: 1.6 + Math.random() * 2.2, rev: Math.random() < .5 });
        nextPulse = T + 0.1 + Math.random() * 0.3;
      }
      pulses = pulses.filter((p) => T - p.t0 < p.dur);
      for (const p of pulses) {
        let t = (T - p.t0) / p.dur; t = t * t * (3 - 2 * t); if (p.rev) t = 1 - t;
        const pts = p.e.proj; const f = t * (pts.length - 1); const i = Math.min(pts.length - 2, Math.floor(f)); const u = f - i;
        const x = pts[i].x + (pts[i + 1].x - pts[i].x) * u, y = pts[i].y + (pts[i + 1].y - pts[i].y) * u, z = pts[i].z + (pts[i + 1].z - pts[i].z) * u;
        const fade = Math.sin(Math.PI * (T - p.t0) / p.dur) * light(z);
        const col = p.e.t === 'tree' ? color(byId.get(p.e.b)) : '#FFE2C2'; const sz = 18;
        ctx.globalAlpha = fade * (dim ? .25 : .95);
        ctx.drawImage(sprite(col), x - sz / 2, y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;
    }
    // nodes, back to front
    for (const n of nodes) n.p = project(n.u, n.p || {});
    const order = nodes.filter(visible).sort((a, b) => a.p.z - b.p.z);
    for (const n of order) {
      const c = color(n); const L = n.kind === 'core' ? 1 : light(n.p.z); const on = lit(n);
      const breathe = n.kind === 'core' || n.kind === 'hub' ? 1 + 0.07 * Math.sin(T * 0.9 + n.tw) : 1;
      const r = n.r * n.p.f * Math.max(0.7, zoom * 0.85);
      const glow = r * (n.kind === 'core' ? 12 : n.kind === 'hub' ? 9 : n.kind === 'file' ? 6 : 7) * breathe * (n === focus || (hits && hits.has(n.id)) ? 1.5 : 1);
      ctx.globalAlpha = (on ? 1 : .1) * L;
      ctx.drawImage(sprite(c), n.p.x - glow / 2, n.p.y - glow / 2, glow, glow);
      ctx.globalAlpha = (on ? 1 : .2) * Math.max(.25, L);
      ctx.beginPath(); ctx.arc(n.p.x, n.p.y, Math.max(0.8, r * (n.kind === 'core' ? .55 : .7)), 0, Math.PI * 2);
      ctx.fillStyle = tint(c, n.kind === 'core' || n.kind === 'hub' ? .8 : .55); ctx.fill();
      n.pr = r;
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (selected && visible(selected) && selected.p) { ctx.beginPath(); ctx.arc(selected.p.x, selected.p.y, selected.pr * 2 + 6, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1.2; ctx.stroke(); }

    // labels: the six regions always (front side), anything else only in focus or when found
    ctx.textBaseline = 'middle';
    for (const n of order) {
      const isHub = n.kind === 'hub', isCore = n.kind === 'core';
      const show = isHub || isCore || near.has(n.id) || (hits && hits.has(n.id)) || (zoom > 1.8 && n.kind !== 'file' && n.p.z > 0.55 && !dim);
      if (!show) continue;
      const L = isCore ? 1 : light(n.p.z);
      if (!isCore && n.p.z < -0.25 && !near.has(n.id)) continue;
      const text = n.label.length > 36 ? n.label.slice(0, 35) + '…' : n.label;
      ctx.font = isHub ? '600 14px Poppins, system-ui, sans-serif' : isCore ? '700 13px Poppins, system-ui, sans-serif' : '500 12.5px Poppins, system-ui, sans-serif';
      const x = isCore ? n.p.x : n.p.x + n.pr * 1.4 + 9, y = isCore ? n.p.y + n.pr * 2.2 + 12 : n.p.y;
      ctx.textAlign = isCore ? 'center' : 'left';
      ctx.globalAlpha = (dim && !near.has(n.id) && !(hits && hits.has(n.id)) ? .3 : 1) * Math.min(1, L * 1.25);
      ctx.lineWidth = 3.5; ctx.strokeStyle = 'rgba(12,11,10,.8)'; ctx.strokeText(text, x, y);
      ctx.fillStyle = isHub ? tint(color(n), .35) : isCore ? '#F6C08A' : 'rgba(238,233,228,.95)';
      ctx.fillText(text, x, y);
    }
    ctx.globalAlpha = 1;
  }
  function run() {
    if (loop) return;
    const step = (ts) => {
      loop = requestAnimationFrame(step);
      if (!canvas || !canvas.offsetParent) { prevT = 0; return; }
      if (ts - lastFrame < (CALM ? 120 : 30)) return;
      lastFrame = ts; frame(ts / 1000);
    };
    loop = requestAnimationFrame(step);
  }

  // ---------- turning to things ----------
  function face(n, z) {
    if (!n || !n.u || n.kind === 'core') { target = { yaw, pitch: -0.28, zoom: z || 1 }; return; }
    const v = n.u; const h = Math.hypot(v.x, v.z);
    target = { yaw: Math.atan2(-v.x, v.z), pitch: Math.atan2(v.y, h), zoom: z || Math.max(zoom, 1.25) };
  }
  function fit() { select(null); target = { yaw, pitch: -0.28, zoom: 1 }; }
  function nodeAt(px, py) {
    let best = null, bz = -Infinity;
    for (const n of nodes) {
      if (!visible(n) || !n.p) continue;
      if (n.kind !== 'core' && n.p.z < -0.2) continue;
      const r = Math.max(7, n.pr * 2.2) + 2;
      if (Math.hypot(n.p.x - px, n.p.y - py) < r && n.p.z > bz) { best = n; bz = n.p.z; }
    }
    return best;
  }

  // ---------- info panel ----------
  function kindLine(n) { const g = GROUPS[n.group] || GROUPS.memory; return `<span class="sw" style="background:${g.color}"></span>${esc(KIND_NAME[n.kind] || n.kind)} · ${esc(g.label)}`; }
  function listHtml(list, max = 18) {
    const items = list.slice(0, max).map((m) => `<button class="gi-item" data-go="${esc(m.id)}"><span class="sw" style="background:${color(m)}"></span>${esc(m.label)}</button>`).join('');
    return `<div class="gi-list">${items}${list.length > max ? `<div class="stamp" style="padding:4px 8px">+ ${list.length - max} more</div>` : ''}</div>`;
  }
  function showInfo(n) {
    const el = $('graph-info');
    if (!n) { el.classList.remove('is-on'); el.innerHTML = ''; return; }
    const kids = [], links = []; let parentNode = null;
    for (const e of edges) {
      if (e.t === 'tree') { if (e.a === n.id) kids.push(byId.get(e.b)); if (e.b === n.id) parentNode = byId.get(e.a); }
      else if (e.a === n.id || e.b === n.id) links.push(byId.get(e.a === n.id ? e.b : e.a));
    }
    const vault = (STATE && STATE.vaultName) || 'ROUX';
    const obs = n.obsidian && !n.noRel ? `obsidian://open?vault=${encodeURIComponent(vault)}&file=${encodeURIComponent(n.obsidian)}` : null;
    const acts = [];
    if (obs) acts.push(`<a class="btn btn-sm" href="${esc(obs)}">Open in Obsidian</a>`);
    if (n.rel && n.kind !== 'folder' && !n.noRel) acts.push(`<button class="btn btn-sm" data-preview="${esc(n.rel)}">Preview</button>`);
    if (n.kind === 'folder') acts.push(`<button class="btn btn-sm" data-files="${esc(n.rel)}">Show in Files</button>`);
    if (n.kind === 'hub') acts.push(`<button class="btn btn-sm" data-zoom="1">Zoom to it</button>`);
    el.innerHTML = `<button class="gi-close" title="Close">×</button>
      <div class="gi-kind" style="color:${color(n)}">${kindLine(n)}</div>
      <div class="gi-title">${esc(n.label)}</div>
      ${n.rel || n.where ? `<div class="gi-path">${esc(n.where || n.rel)}</div>` : ''}
      ${n.desc ? `<div class="gi-desc">${esc(n.desc)}</div>` : ''}
      ${acts.length ? `<div class="gi-acts">${acts.join('')}</div>` : ''}
      ${parentNode ? `<div class="gi-sec">Part of</div>${listHtml([parentNode])}` : ''}
      ${kids.length ? `<div class="gi-sec">Holds · ${kids.length}</div>${listHtml(kids)}` : ''}
      ${links.length ? `<div class="gi-sec">Linked with · ${links.length}</div>${listHtml(links)}` : ''}`;
    el.classList.add('is-on');
    el.querySelector('.gi-close').addEventListener('click', () => select(null));
    el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => { const m = byId.get(b.dataset.go); if (m) { if (hidden.has(m.group)) { hidden.delete(m.group); renderKey(); } select(m); face(m); } }));
    const pv = el.querySelector('[data-preview]'); if (pv) pv.addEventListener('click', () => { showTab('files'); previewFile(n.rel, obs || '#'); });
    const fl = el.querySelector('[data-files]'); if (fl) fl.addEventListener('click', () => { showTab('files'); $('files-q').value = n.rel; loadFiles(n.rel); });
    const zm = el.querySelector('[data-zoom]'); if (zm) zm.addEventListener('click', () => face(n, 1.7));
  }
  function select(n) { selected = n; showInfo(n); }

  // ---------- input ----------
  function wire() {
    canvas = $('graph'); ctx = canvas.getContext('2d');
    const ro = new ResizeObserver(() => resize()); ro.observe($('graph-wrap'));
    let down = null, moved = false;
    canvas.addEventListener('mousedown', (e) => { down = { x: e.clientX, y: e.clientY, yaw, pitch, n: nodeAt(e.offsetX, e.offsetY) }; moved = false; target = null; canvas.classList.add('is-drag'); });
    window.addEventListener('mousemove', (e) => {
      if (!canvas || !canvas.offsetParent) return;
      const r = canvas.getBoundingClientRect(); const px = e.clientX - r.left, py = e.clientY - r.top;
      if (down) {
        if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 4) moved = true;
        if (moved) { yaw = down.yaw + (e.clientX - down.x) * 0.006; pitch = Math.max(-1.3, Math.min(1.3, down.pitch + (e.clientY - down.y) * 0.006)); lastTouch = T; }
        return;
      }
      if (px < 0 || py < 0 || px > W || py > H || e.target !== canvas) { if (hover) { hover = null; hideTip(); } return; }
      const n = nodeAt(px, py);
      if (n !== hover) { hover = n; canvas.classList.toggle('is-hover', !!n); if (!n) lastTouch = T; }
      if (n) showTip(n, px, py); else hideTip();
    });
    window.addEventListener('mouseup', () => {
      if (!down) return;
      if (!moved) { const n = down.n; if (n && n !== selected) { select(n); face(n); } else select(null); }
      down = null; canvas.classList.remove('is-drag'); lastTouch = T;
    });
    canvas.addEventListener('mouseleave', () => { if (!down && hover) { hover = null; hideTip(); lastTouch = T; } });
    canvas.addEventListener('wheel', (e) => { e.preventDefault(); target = null; zoom = Math.max(0.6, Math.min(3.5, zoom * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018)))); lastTouch = T; }, { passive: false });
    canvas.addEventListener('dblclick', (e) => { const n = nodeAt(e.offsetX, e.offsetY); if (n) { select(n); face(n, n.kind === 'hub' ? 1.7 : 2); } else fit(); });
    $('graph-fit').addEventListener('click', fit);
    $('graph-links').addEventListener('change', (e) => { showLinks = e.target.checked; try { localStorage.setItem('roux.graphWeb', showLinks ? '1' : '0'); } catch (_) {} });
    try { const v = localStorage.getItem('roux.graphWeb'); if (v !== null) showLinks = v === '1'; } catch (_) {}
    $('graph-links').checked = showLinks;
    $('graph-q').addEventListener('input', (e) => { query = e.target.value.trim(); });
    $('graph-q').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { const m = nodes.filter(visible).find(matches); if (m) { select(m); face(m, 1.6); } }
      if (e.key === 'Escape') { e.target.value = ''; query = ''; select(null); }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && selected && document.querySelector('#view-home.is-on')) select(null); });
    dust = Array.from({ length: 170 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() < .12 ? 1.6 : 1, a: .05 + Math.random() * .16, s: .3 + Math.random() * 1.2, p: Math.random() * 6.28 }));
    makeGrid();
    run();
  }
  function showTip(n, px, py) {
    const t = $('graph-tip');
    t.innerHTML = `<b>${esc(n.label)}</b><span>${esc(KIND_NAME[n.kind] || '')} · ${esc((GROUPS[n.group] || GROUPS.memory).label)}${n.kind === 'folder' ? ' · ' + esc(n.desc) : ''}</span>`;
    t.style.display = 'block';
    const x = Math.min(px + 16, W - t.offsetWidth - 8), y = Math.min(py + 16, H - t.offsetHeight - 8);
    t.style.left = x + 'px'; t.style.top = y + 'px';
  }
  function hideTip() { $('graph-tip').style.display = 'none'; }
  function resize() {
    const wrap = $('graph-wrap'); if (!wrap || !wrap.offsetParent) return;
    const r = wrap.getBoundingClientRect(); dpr = window.devicePixelRatio || 1;
    W = r.width; H = r.height; canvas.width = W * dpr; canvas.height = H * dpr;
  }

  // ---------- data ----------
  async function load(force) {
    if (loading || (loaded && !force)) { resize(); return; }
    loading = true;
    try {
      const r = await fetch('/api/graph', { cache: 'no-store' }); data = await r.json();
      if (!r.ok) throw new Error(data.error || r.status);
      nodes = data.nodes; edges = data.edges; byId = new Map(nodes.map((n) => [n.id, n])); adj = new Map();
      for (const e of edges) { if (!adj.has(e.a)) adj.set(e.a, []); if (!adj.has(e.b)) adj.set(e.b, []); adj.get(e.a).push(byId.get(e.b)); adj.get(e.b).push(byId.get(e.a)); }
      layout();
      if (selected) selected = byId.get(selected.id) || null;
      const c = data.counts;
      $('graph-sub').textContent = `${c.agent || 0} agents · ${c.skill || 0} skills · ${c.routine || 0} routines · ${c.app || 0} apps · ${(c.file || 0) + (c.skill || 0)} notes and files · ${edges.filter((e) => e.t === 'link').length} links between them`;
      loaded = true; resize();
      if (selected) showInfo(selected);
    } catch (e) {
      $('graph-sub').innerHTML = `<span class="bad">Cannot build the map: ${esc(e.message)}</span>`;
    }
    loading = false;
  }

  // ---------- the color key for this page (sidebar) ----------
  function keyRows() {
    return ['agents', 'skills', 'routines', 'apps', 'work', 'business', 'desk', 'knowledge'].map((g) => ({ group: g, color: GROUPS[g].color, label: GROUPS[g].label, sub: GROUPS[g].sub, off: hidden.has(g) }));
  }
  function toggleGroup(g) { if (hidden.has(g)) hidden.delete(g); else hidden.add(g); if (selected && !visible(selected)) select(null); renderKey(); }

  return { load, wire, keyRows, toggleGroup, redraw: () => frame(performance.now() / 1000), invalidate: () => { loaded = false; } };
})();
