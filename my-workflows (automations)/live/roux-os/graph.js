// Home tab — the brain as a graph. Read-only: walks the vault and returns nodes and edges.
//
// Shape (the "agentic OS" split: agents, skills, memory, routines, apps, plus the work itself):
//   ROUX ─┬─ Agents    one node per .claude/agents/*.md
//         ├─ Skills    one node per my-skills/<name>/ (its own .md files hang off it)
//         ├─ Memory ─┬─ Business   my-business (context)/
//         │          ├─ Desk       my-desk (now)/ (archive as one folder node)
//         │          └─ Knowledge  my-files (knowledge)/ + my-connections (MCP)/
//         ├─ Work      my-work (outputs)/, by folder
//         ├─ Routines  ~/.claude/scheduled-tasks/*, the pulse, my-workflows (automations)/
//         └─ Apps      the connected-apps.md tables
// Edges: "tree" (the shape above) and "link" (a markdown link or a `vault/path` mention in one file
// pointing at another node). Images, code and render drafts are counted, not drawn.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DRAW_EXT = new Set(['.md', '.html', '.pdf', '.csv', '.xlsx', '.docx', '.pptx', '.json']);
const SKIP = new Set(['.git', '.obsidian', 'node_modules', 'logs', 'work', 'templates', 'assets', 'test', 'public', 'launchd', 'pulse']);

module.exports = function makeGraph({ vault, home }) {
  const TASKS = path.join(home, '.claude', 'scheduled-tasks');
  let cache = { at: 0, data: null };

  function read(p) { try { return fs.readFileSync(p, 'utf8'); } catch (_) { return ''; } }
  // The day a file or folder was first made (YYYY-MM-DD), for "new since the last score". Git's first
  // commit of the path is the source: disk birth times were all reset when the vault moved (2026-09-21).
  // A folder is as old as the oldest file in it. A path git has never seen falls back to the disk date.
  let firstAdd = new Map(), dirAdd = new Map();
  function loadGitDates() {
    firstAdd = new Map(); dirAdd = new Map();
    let out = '';
    try { out = execFileSync('git', ['-C', vault, '-c', 'core.quotepath=off', 'log', '--diff-filter=A', '--name-only', '--format=@%as'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, timeout: 8000 }); } catch (_) { return; }
    let d = null;
    for (const line of out.split('\n')) {       // newest first, so the last date seen for a path is its first add
      if (line.startsWith('@')) { d = line.slice(1); continue; }
      if (!line || !d) continue;
      firstAdd.set(line, d);
      const parts = line.split('/');
      for (let i = 1; i < parts.length; i++) { const dir = parts.slice(0, i).join('/'); const cur = dirAdd.get(dir); if (!cur || d < cur) dirAdd.set(dir, d); }
    }
  }
  function born(abs) {
    const rel = path.relative(vault, abs).split(path.sep).join('/');
    if (!rel.startsWith('..')) { const g = firstAdd.get(rel) || dirAdd.get(rel); if (g) return g; }
    try { const st = fs.statSync(abs); const t = st.birthtimeMs > 0 ? st.birthtimeMs : st.ctimeMs; return new Date(t).toISOString().slice(0, 10); } catch (_) { return null; }
  }
  function ls(p) { try { return fs.readdirSync(p, { withFileTypes: true }).filter((e) => !e.name.startsWith('.') && !e.name.startsWith('~$')); } catch (_) { return []; } }
  const frontDesc = (t) => { const m = t.match(/^---\n[\s\S]*?\bdescription:\s*(.+)\n[\s\S]*?---/); return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''; };
  function firstLine(t) {
    const body = t.replace(/^---\n[\s\S]*?\n---\n/, '');
    for (const l of body.split('\n')) {
      const s = l.trim();
      if (!s || s.startsWith('#') || s.startsWith('>') || s.startsWith('|') || s === '---' || s.startsWith('```')) continue;
      return s.replace(/\*\*|`|\[([^\]]+)\]\([^)]+\)/g, '$1').slice(0, 220);
    }
    return '';
  }
  const title = (t, fallback) => { const m = t.match(/^# (.+)$/m); return m ? m[1].replace(/[*`]/g, '').trim() : fallback; };
  const pretty = (name) => name.replace(/\.[a-z0-9]+$/i, '').replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/[-_]+/g, ' ');

  function build() {
    loadGitDates();
    const nodes = []; const byId = new Map(); const edges = []; const byRel = new Map();
    const add = (n) => { if (byId.has(n.id)) return byId.get(n.id); byId.set(n.id, n); nodes.push(n); if (n.rel) byRel.set(n.rel, n); return n; };
    const tree = (a, b) => edges.push({ a, b, t: 'tree' });
    const fileNode = (rel, group, parent, extra = {}) => {
      const ext = path.extname(rel).toLowerCase();
      const t = ext === '.md' ? read(path.join(vault, rel)) : '';
      const n = add({ id: 'f:' + rel, kind: 'file', group, rel, ext, label: pretty(path.basename(rel)), desc: t ? (frontDesc(t) || firstLine(t)) : '', born: born(path.join(vault, rel)), ...extra });
      tree(parent, n.id);
      return n;
    };
    // A folder of files: a folder node, its files, its subfolders. Undrawn files are counted.
    function folder(absDir, rel, group, parent, label, depth = 0) {
      const id = 'd:' + rel;
      add({ id, kind: 'folder', group, rel, label: label || path.basename(rel).replace(/\s*\(.*\)$/, ''), desc: '', count: 0, hidden: 0, born: born(absDir) });
      tree(parent, id);
      let count = 0, hidden = 0;
      for (const e of ls(absDir)) {
        const r = rel + '/' + e.name;
        if (e.isDirectory()) {
          if (SKIP.has(e.name)) continue;
          if (e.name === 'archive' || e.name === 'backups') { const n = countFiles(path.join(absDir, e.name)); add({ id: 'd:' + r, kind: 'folder', group, rel: r, label: e.name, desc: `${n} files kept for the record (not drawn)`, count: n, collapsed: true }); tree(id, 'd:' + r); continue; }
          const sub = folder(path.join(absDir, e.name), r, group, id, null, depth + 1);
          count += sub.count; hidden += sub.hidden;
        } else if (DRAW_EXT.has(path.extname(e.name).toLowerCase())) { fileNode(r, group, id); count++; }
        else hidden++;
      }
      const n = byId.get(id); n.count = count; n.hidden = hidden;
      n.desc = `${count} file${count === 1 ? '' : 's'}${hidden ? ` · ${hidden} images or other files not drawn` : ''}`;
      return n;
    }
    function countFiles(dir) { let n = 0; for (const e of ls(dir)) n += e.isDirectory() ? countFiles(path.join(dir, e.name)) : 1; return n; }

    add({ id: 'core', kind: 'core', group: 'core', label: 'ROUX', desc: 'The brain. CLAUDE.md routes every session; SAFETY.md sits above everything.', rel: 'CLAUDE.md' });
    byRel.set('CLAUDE.md', byId.get('core'));
    const hub = (id, label, group, desc) => { add({ id, kind: 'hub', group, label, desc }); tree('core', id); return id; };

    // agents
    const A = hub('h:agents', 'Agents', 'agents', 'Nine agents, one lane each. ROUX reads the request and dispatches.');
    for (const e of ls(path.join(vault, '.claude/agents'))) {
      if (!e.name.endsWith('.md')) continue;
      const t = read(path.join(vault, '.claude/agents', e.name));
      const name = e.name.replace(/\.md$/, '');
      add({ id: 'a:' + name, kind: 'agent', group: 'agents', label: name[0].toUpperCase() + name.slice(1), desc: frontDesc(t), text: t, obsidianRel: null, born: born(path.join(vault, '.claude/agents', e.name)) });
      tree(A, 'a:' + name);
    }

    // skills
    const S = hub('h:skills', 'Skills', 'skills', 'Repeatable jobs. Each one is my-skills/<name>/instructions.md, started by its slash command.');
    for (const e of ls(path.join(vault, 'my-skills'))) {
      if (!e.isDirectory()) continue;
      const dir = path.join(vault, 'my-skills', e.name);
      const rel = `my-skills/${e.name}/instructions.md`;
      const t = read(path.join(vault, rel));
      const cmd = read(path.join(vault, '.claude/commands', e.name + '.md'));
      const hasCmd = !!cmd;
      const n = add({ id: 's:' + e.name, kind: 'skill', group: 'skills', label: (hasCmd ? '/' : '') + e.name, rel: fs.existsSync(path.join(vault, rel)) ? rel : null, desc: frontDesc(cmd) || frontDesc(t) || firstLine(t), text: t, born: born(dir) });
      if (n.rel) byRel.set(n.rel, n);
      tree(S, n.id);
      // the skill's other notes (not its templates, drafts or code)
      (function walk(d, r, depth) {
        for (const f of ls(d)) {
          const fr = r + '/' + f.name;
          if (f.isDirectory()) { if (!SKIP.has(f.name) && depth < 2) walk(path.join(d, f.name), fr, depth + 1); continue; }
          if (!f.name.endsWith('.md') || fr === rel) continue;
          fileNode(fr, 'skills', n.id);
        }
      })(dir, 'my-skills/' + e.name, 0);
    }

    // memory
    const M = hub('h:memory', 'Memory', 'memory', 'What ROUX knows: the business, where work stands, and the reference library.');
    folder(path.join(vault, 'my-business (context)'), 'my-business (context)', 'business', M, 'Business');
    folder(path.join(vault, 'my-desk (now)'), 'my-desk (now)', 'desk', M, 'Desk');
    const K = folder(path.join(vault, 'my-files (knowledge)'), 'my-files (knowledge)', 'knowledge', M, 'Knowledge');
    folder(path.join(vault, 'my-connections (MCP)'), 'my-connections (MCP)', 'knowledge', K.id, 'Connections');
    for (const r of ['SAFETY.md']) if (fs.existsSync(path.join(vault, r))) fileNode(r, 'business', 'd:my-business (context)', { label: 'SAFETY' });

    // work
    const W = hub('h:work', 'Work', 'work', 'Everything made: ad copy, posts, reports, internal docs, pages.');
    folder(path.join(vault, 'my-work (outputs)'), 'my-work (outputs)', 'work', W, 'Outputs');

    // routines
    const R = hub('h:routines', 'Routines', 'routines', 'What runs on a schedule or a button, and the automations behind it.');
    for (const e of ls(TASKS)) {
      if (!e.isDirectory()) continue;
      const t = read(path.join(TASKS, e.name, 'SKILL.md'));
      if (!t) continue;
      add({ id: 'r:' + e.name, kind: 'routine', group: 'routines', label: e.name.replace(/-/g, ' '), desc: frontDesc(t), text: t, where: '~/.claude/scheduled-tasks/' + e.name, born: born(path.join(TASKS, e.name)) });
      tree(R, 'r:' + e.name);
    }
    add({ id: 'r:pulse', kind: 'routine', group: 'routines', label: 'morning pulse', desc: 'Button-only: runs when Evan presses Pulse now. Writes my-desk (now)/today.md.', text: read(path.join(vault, '.claude/commands/pulse.md')) });
    tree(R, 'r:pulse');
    folder(path.join(vault, 'my-workflows (automations)'), 'my-workflows (automations)', 'routines', R, 'Workflows');

    // apps
    const P = hub('h:apps', 'Apps', 'apps', 'Connected tools. Source: my-connections (MCP)/connected-apps.md.');
    const apps = read(path.join(vault, 'my-connections (MCP)/connected-apps.md'));
    let tableHead = '';
    for (const line of apps.split('\n')) {
      if (!line.startsWith('|')) { tableHead = ''; continue; }
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (!tableHead) { tableHead = cells[0]; continue; }
      if (!/^(App|System)$/.test(tableHead) || /^-+$/.test(cells[0])) continue;
      const name = cells[0].replace(/[*⭐`]/g, '').replace(/\s*\(digit-software\.com\)/, '').trim();
      if (!name) continue;
      // an app marked removed or deleted is not connected, so it is not drawn (Venon, Evan 2026-09-24)
      if (cells.slice(1).some((c) => /^\**(removed|deleted)\b/i.test(c))) continue;
      const desc = (cells[2] || cells[1] || '').replace(/\*\*|`|\[([^\]]+)\]\([^)]+\)/g, '$1').slice(0, 220);
      add({ id: 'p:' + name.toLowerCase(), kind: 'app', group: 'apps', label: name, desc, rel: 'my-connections (MCP)/connected-apps.md', noRel: true });
      tree(P, 'p:' + name.toLowerCase());
    }

    // folders with nothing drawn in them (image-only render folders) add clutter, not meaning
    const top = new Set(['my-business (context)', 'my-desk (now)', 'my-files (knowledge)', 'my-work (outputs)', 'my-workflows (automations)', 'my-connections (MCP)']);
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (n.kind !== 'folder' || n.count || n.collapsed || top.has(n.rel)) continue;
      nodes.splice(i, 1); byId.delete(n.id); if (byRel.get(n.rel) === n) byRel.delete(n.rel);
      for (let j = edges.length - 1; j >= 0; j--) if (edges[j].a === n.id || edges[j].b === n.id) edges.splice(j, 1);
    }

    // cross links: markdown links and `vault/path` mentions from any node with text
    const seen = new Set(edges.map((e) => e.a + '>' + e.b));
    const link = (a, b) => { if (!a || !b || a === b) return; const k1 = a + '>' + b, k2 = b + '>' + a; if (seen.has(k1) || seen.has(k2)) return; seen.add(k1); edges.push({ a, b, t: 'link' }); };
    const skillNames = nodes.filter((n) => n.kind === 'skill').map((n) => n.id.slice(2));
    const agentNames = nodes.filter((n) => n.kind === 'agent').map((n) => n.id.slice(2));
    const resolveRel = (fromDir, href) => {
      let h = href.split('#')[0]; try { h = decodeURIComponent(h); } catch (_) {}
      if (!h || /^[a-z]+:/i.test(h)) return null;
      return path.normalize(path.join(fromDir, h)).replace(/\\/g, '/');
    };
    const target = (rel) => {
      if (!rel) return null;
      if (byRel.has(rel)) return byRel.get(rel).id;
      const s = rel.match(/^my-skills\/([^/]+)\//); if (s && byId.has('s:' + s[1])) return 's:' + s[1];
      if (byId.has('d:' + rel.replace(/\/$/, ''))) return 'd:' + rel.replace(/\/$/, '');
      return null;
    };
    for (const n of nodes) {
      const text = n.text || (n.kind === 'file' && n.ext === '.md' ? read(path.join(vault, n.rel)) : '');
      if (!text) continue;
      const fromDir = n.rel ? path.dirname(n.rel) : '.';
      for (const m of text.matchAll(/\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g)) link(n.id, target(resolveRel(fromDir, m[1])));
      for (const m of text.matchAll(/`((?:my-[a-z]+ \([^)]+\)|my-skills|SAFETY\.md|CLAUDE\.md)[^`]*)`/g)) link(n.id, target(m[1].replace(/\/$/, '')));
      for (const s of skillNames) if (n.id !== 's:' + s && new RegExp('(^|[\\s(`])/' + s + '\\b').test(text)) link(n.id, 's:' + s);
      if (n.kind === 'routine' || n.kind === 'skill') for (const a of agentNames) if (new RegExp('\\b' + a[0].toUpperCase() + a.slice(1) + '\\b').test(text)) link(n.id, 'a:' + a);
      delete n.text;
    }
    for (const n of nodes) if (n.rel && !n.noRel) n.obsidian = n.rel.endsWith('.md') ? n.rel.replace(/\.md$/, '') : n.rel;

    const counts = {};
    for (const n of nodes) counts[n.kind] = (counts[n.kind] || 0) + 1;
    return { generatedAt: new Date().toISOString(), counts, nodes, edges: edges.filter((e) => byId.has(e.a) && byId.has(e.b)).map((e) => ({ a: e.a, b: e.b, t: e.t })) };
  }

  function view() {
    if (!cache.data || Date.now() - cache.at > 60000) cache = { at: Date.now(), data: build() };
    return cache.data;
  }
  return { view, invalidate: () => { cache = { at: 0, data: null }; } };
};
