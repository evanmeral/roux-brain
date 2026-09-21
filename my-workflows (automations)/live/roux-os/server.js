// ROUX OS — local server. Reads the brain's files and serves the cockpit at localhost:4242.
// It never writes BOARD.md. The only files it writes are capture.md (Tell ROUX / Done) and its own log.
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parseBoard, parseKeyDates } = require('./board');
const md = require('./md');
const ics = require('./ics');

const ROOT = __dirname;
const VAULT = path.resolve(ROOT, '../../..');
const DESK = path.join(VAULT, 'my-desk (now)');
const PUBLIC = path.join(ROOT, 'public');
const LOGO = path.join(VAULT, 'my-skills/hpc-ad-creative/assets/brand-refs/HPC-ShieldLogo-White.png');
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));
const TZ = CONFIG.timezone || 'America/Chicago';
const PORT = Number(process.env.ROUX_PORT) || CONFIG.port;
const { execFile } = require('child_process');
const VERSION = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version;

function log(...a) { console.log(new Date().toISOString(), ...a); }

function localConfig() {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'config.local.json'), 'utf8')); }
  catch (e) { return { calendars: [], error: e.code === 'ENOENT' ? 'config.local.json is missing' : e.message }; }
}

// Today's date as YYYY-MM-DD in the configured timezone.
function todayIso(d = new Date()) {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
  const g = (t) => p.find((x) => x.type === t).value;
  return `${g('year')}-${g('month')}-${g('day')}`;
}

function readText(p) {
  try { return { text: fs.readFileSync(p, 'utf8'), error: null }; }
  catch (e) { return { text: null, error: e.code === 'ENOENT' ? 'missing' : e.message }; }
}

function buildState() {
  const ctx = { baseDir: DESK, vaultDir: VAULT, vaultName: CONFIG.vaultName };
  const today = todayIso();
  const health = {};

  const boardFile = readText(path.join(DESK, 'BOARD.md'));
  let board = null;
  if (boardFile.text) {
    try { board = parseBoard(boardFile.text, ctx, today); health.board = board.missing.length ? 'Board is missing sections: ' + board.missing.join(', ') : 'ok'; }
    catch (e) { health.board = 'Cannot parse the board: ' + e.message; }
  } else health.board = 'Cannot read BOARD.md (' + boardFile.error + ')';

  const kd = readText(path.join(DESK, 'key-dates.md'));
  let keyDates = [];
  if (kd.text) { keyDates = parseKeyDates(kd.text); health.keyDates = 'ok'; }
  else health.keyDates = 'Cannot read key-dates.md (' + kd.error + ')';

  const td = readText(path.join(DESK, 'today.md'));
  let todayNote = null;
  if (td.text) {
    const stat = fs.statSync(path.join(DESK, 'today.md'));
    // Split by H2 so the page can show the sharp parts and fold the rest.
    const sections = [];
    let cur = null;
    for (const line of td.text.split('\n')) {
      const m = line.match(/^## (.+)$/);
      if (m) { cur = { title: m[1].trim(), key: m[1].trim().toLowerCase().replace(/[^a-z]+/g, '-'), lines: [] }; sections.push(cur); }
      else if (cur) cur.lines.push(line);
    }
    todayNote = {
      html: md.render(td.text, ctx), modified: stat.mtime.toISOString(), title: (td.text.match(/^# (.+)$/m) || [null, null])[1],
      sections: sections.map((x) => ({ key: x.key, title: x.title, html: md.render(x.lines.join('\n'), ctx), text: x.lines.join(' ').trim() })),
    };
    health.today = 'ok';
  } else health.today = td.error === 'missing' ? 'No brief yet. Press Pulse now for one.' : 'Cannot read today.md (' + td.error + ')';

  const cap = readText(path.join(DESK, 'capture.md'));
  const captureLines = cap.text ? cap.text.split('\n').filter((l) => /^- /.test(l)).length : 0;

  const local = localConfig();
  const calendars = (local.calendars || []).map((c) => ({ name: c.name, color: c.color, configured: !!(c.url && !/^PASTE/i.test(c.url)) }));

  return {
    version: VERSION,
    generatedAt: new Date().toISOString(),
    today,
    timezone: TZ,
    vaultName: CONFIG.vaultName,
    rhythm: CONFIG.rhythm,
    links: CONFIG.links,
    ceiling: CONFIG.metaDailyCeiling,
    board,
    keyDates,
    todayNote,
    captureLines,
    calendars,
    health,
  };
}

// ---- capture.md: the only brain file the OS writes ----
const CAPTURE_HEADER = `# Capture — Evan → ROUX

> Written by ROUX OS (the Tell ROUX box and the Done buttons). **\`/prime\` reads this first.**
> \`/wrap\` folds each line into the board or decisions, then moves it to \`archive/captures.md\`.
> Never edit the board from here; this is the inbox.

`;
function appendCapture(kind, text) {
  const p = path.join(DESK, 'capture.md');
  const stamp = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()).replace(',', '');
  const line = `- ${stamp} · ${kind ? kind + ': ' : ''}${text.trim().replace(/\s+/g, ' ')}\n`;
  if (!fs.existsSync(p)) fs.writeFileSync(p, CAPTURE_HEADER + line);
  else fs.appendFileSync(p, line);
  log('capture', kind || 'note', text.slice(0, 80));
  return line;
}


// ---- sessions: a real interactive Claude session in the vault, in a new Terminal window ----
const PROMPTS = path.join(ROOT, 'logs', 'prompts');
// Terminal's login shell may not have ~/.local/bin on PATH, so resolve the claude binary here.
const HOME = process.env.HOME || require('os').homedir();
const CLAUDE_BIN = [path.join(HOME, '.local/bin/claude'), '/opt/homebrew/bin/claude', '/usr/local/bin/claude'].find((p) => fs.existsSync(p)) || 'claude';
function startSession(prompt) {
  fs.mkdirSync(PROMPTS, { recursive: true });
  const file = path.join(PROMPTS, `${Date.now()}.txt`);
  fs.writeFileSync(file, prompt.trim() + '\n');
  const asq = (str) => str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  // If Claude cannot start (usually: Terminal lacks Desktop-folder access), keep the window open
  // and say so, instead of closing before Evan can read anything.
  const hint = 'ROUX OS: Claude could not read the vault from this Terminal window. Give Terminal access to your Desktop folder: System Settings > Privacy & Security > Files and Folders > Terminal > Desktop Folder. Then press the button again.';
  const shell = `cd '${VAULT.replace(/'/g, "'\\''")}' && clear && '${CLAUDE_BIN}' "$(cat '${file}')" || { echo; echo '${hint}'; exec $SHELL; }`;
  const script = [
    'tell application "Terminal"',
    '  activate',
    `  do script "${asq(shell)}"`,
    'end tell',
  ];
  return new Promise((resolve, reject) => {
    execFile('osascript', script.flatMap((l) => ['-e', l]), { timeout: 15000 }, (err, stdout, stderr) => {
      if (err) return reject(new Error((stderr || err.message).trim()));
      log('session', prompt.slice(0, 80));
      fs.appendFileSync(path.join(ROOT, 'runs.log'), `${new Date().toISOString()}\tsession\t${prompt.replace(/\s+/g, ' ').slice(0, 200)}\n`);
      resolve({ ok: true });
    });
  });
}


// ---- routines: what ran, when, how it ended (from runs.log) ----
function readRuns(limit = 30) {
  const p = path.join(ROOT, 'runs.log');
  if (!fs.existsSync(p)) return [];
  const lines = fs.readFileSync(p, 'utf8').trim().split('\n').filter(Boolean).slice(-200);
  const runs = lines.map((l) => { const [at, kind, status, ...rest] = l.split('\t'); return { at, kind, status, detail: rest.join(' · ') }; });
  return runs.slice(-limit).reverse();
}
function routines() {
  const runs = readRuns();
  const pulse = runs.filter((r) => r.kind === 'pulse');
  const last = pulse.find((r) => r.status !== 'started') || null;
  const running = pulse[0] && pulse[0].status === 'started' && (!last || pulse[0].at > last.at);
  const pulseJob = fs.existsSync(path.join(process.env.HOME || '', 'Library/LaunchAgents/com.roux.pulse.plist'));
  return {
    list: [{ key: 'pulse', name: 'Morning pulse', schedule: pulseJob ? '6:30 CT daily' : 'button only', last, running: !!running }],
    recent: runs.slice(0, 12),
  };
}


// ---- headless runs: routines on demand ----
const { spawn } = require('child_process');
function runRoutine(kind) {
  if (kind !== 'pulse') throw new Error('Unknown routine: ' + kind);
  const r = routines();
  if (r.list.find((x) => x.key === 'pulse').running) throw new Error('The pulse is already running');
  const child = spawn(path.join(ROOT, 'pulse.sh'), [], { cwd: ROOT, detached: true, stdio: 'ignore', env: { ...process.env, HOME: process.env.HOME || require('os').homedir() } });
  child.unref();
  log('run', kind, 'pid', child.pid);
  return { ok: true, pid: child.pid };
}


// ---- the vault as a searchable map (Files tab) and the recent list ----
const SKIP_DIRS = new Set(['.git', '.obsidian', 'node_modules', 'logs', '.claude']);
const TEXT_EXT = new Set(['.md', '.txt', '.json', '.csv', '.html', '.css', '.js', '.py', '.sh', '.liquid']);
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
let fileIndex = { at: 0, entries: [] };
function walk(dir, rel, out) {
  let list;
  try { list = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return; }
  for (const e of list) {
    if (e.name.startsWith('.') || e.name.startsWith('~$')) continue;
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), r, out); continue; }
    let st; try { st = fs.statSync(path.join(dir, e.name)); } catch (_) { continue; }
    out.push({ rel: r, name: e.name, ext: path.extname(e.name).toLowerCase(), area: r.split('/')[0], mtime: st.mtimeMs, size: st.size });
  }
}
function getIndex() {
  if (Date.now() - fileIndex.at > 60000) { const out = []; walk(VAULT, '', out); fileIndex = { at: Date.now(), entries: out }; }
  return fileIndex.entries;
}
function withObsidian(e) {
  return { ...e, modified: new Date(e.mtime).toISOString(), obsidian: `obsidian://open?vault=${encodeURIComponent(CONFIG.vaultName)}&file=${encodeURIComponent(e.rel.replace(/\.md$/i, ''))}`, kind: IMG_EXT.has(e.ext) ? 'image' : TEXT_EXT.has(e.ext) ? 'text' : 'other' };
}
function recentFiles(limit = 10) {
  const roots = ['my-work (outputs)', 'my-desk (now)', 'my-files (knowledge)', 'my-business (context)', 'my-skills/hpc-ad-creative/work/creative/drafts', 'my-skills/hpc-ad-creative/work/creative/library'];
  return getIndex().filter((e) => roots.some((r) => e.rel.startsWith(r + '/')) && !/\/pulse\//.test(e.rel) && e.name !== 'capture.md')
    .sort((a, b) => b.mtime - a.mtime).slice(0, limit).map(withObsidian);
}
function searchFiles(q, limit = 80) {
  const terms = (q || '').toLowerCase().split(/\s+/).filter(Boolean);
  let list = getIndex();
  if (terms.length) list = list.filter((e) => { const hay = e.rel.toLowerCase(); return terms.every((t) => hay.includes(t)); });
  return { total: list.length, files: list.sort((a, b) => b.mtime - a.mtime).slice(0, limit).map(withObsidian) };
}
function safeVaultPath(rel) {
  if (!rel) return null;
  const abs = path.resolve(VAULT, rel);
  if (!abs.startsWith(VAULT + path.sep)) return null;
  const segs = path.relative(VAULT, abs).split(path.sep);
  if (segs.some((x) => SKIP_DIRS.has(x))) return null;
  return abs;
}
function preview(rel) {
  const abs = safeVaultPath(rel);
  if (!abs || !fs.existsSync(abs)) return { error: 'not found' };
  const ext = path.extname(abs).toLowerCase();
  const st = fs.statSync(abs);
  if (IMG_EXT.has(ext)) return { kind: 'image', src: '/api/raw?path=' + encodeURIComponent(rel), size: st.size };
  if (!TEXT_EXT.has(ext)) return { kind: 'other', size: st.size };
  const text = fs.readFileSync(abs, 'utf8').slice(0, 12000);
  if (ext === '.md') return { kind: 'markdown', html: md.render(text, { baseDir: path.dirname(abs), vaultDir: VAULT, vaultName: CONFIG.vaultName }), truncated: st.size > 12000 };
  return { kind: 'text', text, truncated: st.size > 12000 };
}

// ---- server-sent events: the page refreshes itself when a desk file changes ----
const clients = new Set();
function broadcast(what) { for (const res of clients) res.write(`data: ${what}\n\n`); }
let watchTimer = null;
function onDeskChange(evt, file) {
  if (!file || /\.(swp|tmp)$|~$|^\./.test(path.basename(file))) return;
  clearTimeout(watchTimer);
  watchTimer = setTimeout(() => broadcast('desk:' + file), 300);
}
try { fs.watch(DESK, { recursive: true }, onDeskChange); } catch (e) { log('watch failed', e.message); }
try { fs.watch(ROOT, (evt, file) => { if (file === 'config.local.json') { ics.invalidate(); broadcast('config'); } if (file === 'runs.log') broadcast('runs'); }); } catch (_) {}


// ---- request guard: this server listens on localhost only, but a web page in the browser could
// still aim requests at it. Every request must carry a localhost Host header (defeats DNS
// rebinding); every POST must come from this page (same-origin Origin) or carry the X-ROUX
// header, which a cross-site page cannot add without a preflight this server never answers.
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);
function hostOk(req) {
  const host = (req.headers.host || '').replace(/:\d+$/, '');
  return LOCAL_HOSTS.has(host);
}
function postOk(req) {
  const origin = req.headers.origin;
  if (origin) {
    try { const u = new URL(origin); return LOCAL_HOSTS.has(u.hostname) && Number(u.port || 80) === PORT; } catch (_) { return false; }
  }
  return typeof req.headers['x-roux'] === 'string';
}

// ---- http ----
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.woff2': 'font/woff2' };

function send(res, code, body, type = 'application/json; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 1e5) req.destroy(); });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  if (!hostOk(req)) return send(res, 403, { error: 'forbidden host' });
  if (req.method === 'POST' && !postOk(req)) { log('blocked POST', p, 'origin=' + (req.headers.origin || '-')); return send(res, 403, { error: 'forbidden origin' }); }
  if (req.method !== 'GET' && req.method !== 'POST') return send(res, 405, { error: 'method' });
  try {
    if (p === '/api/state') return send(res, 200, buildState());
    if (p === '/api/calendar') {
      const local = localConfig();
      const week = await ics.getWeek(local.calendars || [], url.searchParams.get('start') || todayIso(), TZ, CONFIG.weekStartsOn ?? 1);
      if (local.error) week.configError = local.error;
      return send(res, 200, week);
    }
    if (p === '/api/events') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      res.write('data: hello\n\n');
      clients.add(res);
      const ping = setInterval(() => res.write(': ping\n\n'), 25000);
      req.on('close', () => { clients.delete(res); clearInterval(ping); });
      return;
    }
    if (p === '/api/capture' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.text || !body.text.trim()) return send(res, 400, { error: 'Nothing to capture' });
      const line = appendCapture(body.kind || '', body.text);
      return send(res, 200, { ok: true, line });
    }
    if (p === '/api/runs') return send(res, 200, routines());
    if (p === '/api/recent') return send(res, 200, { files: recentFiles(10) });
    if (p === '/api/files') return send(res, 200, searchFiles(url.searchParams.get('q') || ''));
    if (p === '/api/preview') return send(res, 200, preview(url.searchParams.get('path') || ''));
    if (p === '/api/raw') {
      const abs = safeVaultPath(url.searchParams.get('path') || '');
      if (!abs || !fs.existsSync(abs)) return send(res, 404, { error: 'not found' });
      return send(res, 200, fs.readFileSync(abs), MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream');
    }
    if (p === '/api/run' && req.method === 'POST') {
      const body = await readBody(req);
      try { return send(res, 200, runRoutine(body.kind)); } catch (e) { return send(res, 400, { error: e.message }); }
    }
    if (p === '/api/session' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.prompt || !body.prompt.trim()) return send(res, 400, { error: 'Nothing to send' });
      try { return send(res, 200, await startSession(body.prompt)); }
      catch (e) { return send(res, 500, { error: 'Could not open Terminal: ' + e.message }); }
    }
    if (p === '/logo.png') return send(res, 200, fs.readFileSync(LOGO), 'image/png');
    if (p === '/health') return send(res, 200, { ok: true, version: VERSION, vault: VAULT });
    // static
    let file = p === '/' ? '/index.html' : p;
    file = path.normalize(file).replace(/^(\.\.[/\\])+/, '');
    const abs = path.join(PUBLIC, file);
    if (abs.startsWith(PUBLIC) && fs.existsSync(abs) && fs.statSync(abs).isFile()) return send(res, 200, fs.readFileSync(abs), MIME[path.extname(abs)] || 'application/octet-stream');
    return send(res, 404, { error: 'not found' });
  } catch (e) {
    log('error', p, e.stack || e.message);
    return send(res, 500, { error: e.message });
  }
});

server.listen(PORT, '127.0.0.1', () => log(`ROUX OS ${VERSION} on http://localhost:${PORT} · vault: ${VAULT}`));
