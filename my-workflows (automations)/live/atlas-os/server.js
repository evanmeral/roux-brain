// Atlas OS — local server. Reads the brain's files and serves the cockpit at localhost:4242.
// It never writes BOARD.md. The only files it writes are capture.md (Tell Atlas / Done) and its own log.
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
const PORT = Number(process.env.ATLAS_PORT) || CONFIG.port;
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
    todayNote = { html: md.render(td.text, ctx), modified: stat.mtime.toISOString(), title: (td.text.match(/^# (.+)$/m) || [null, null])[1] };
    health.today = 'ok';
  } else health.today = td.error === 'missing' ? 'No brief yet. The 6:30 routine has not run.' : 'Cannot read today.md (' + td.error + ')';

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
const CAPTURE_HEADER = `# Capture — Evan → Atlas

> Written by Atlas OS (the Tell Atlas box and the Done buttons). **\`/prime\` reads this first.**
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
function startSession(prompt) {
  fs.mkdirSync(PROMPTS, { recursive: true });
  const file = path.join(PROMPTS, `${Date.now()}.txt`);
  fs.writeFileSync(file, prompt.trim() + '\n');
  const asq = (str) => str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const shell = `cd '${VAULT.replace(/'/g, "'\\''")}' && clear && claude "$(cat '${file}')"`;
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
try { fs.watch(ROOT, (evt, file) => { if (file === 'config.local.json') { ics.invalidate(); broadcast('config'); } }); } catch (_) {}

// ---- http ----
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8', '.woff2': 'font/woff2' };

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

server.listen(PORT, '127.0.0.1', () => log(`Atlas OS ${VERSION} on http://localhost:${PORT} · vault: ${VAULT}`));
