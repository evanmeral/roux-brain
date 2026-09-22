#!/usr/bin/env python3
"""
tidy-brain scanner. READ-ONLY. It never moves, renames, edits or deletes anything,
and it never writes inside the brain (the --json file goes wherever you point it).

Goal (Evan, 2026-09-22): free disk space on the Mac without losing anything the brain needs.
It walks the brain, applies the keep list and the "still needed" test from instructions.md,
and prints a dry-run report ranked by size:

  Remove   bulky, disposable files -> macOS Trash (space frees when Evan empties the Trash)
  Archive  small text history -> my-desk (now)/archive/tidy/ (costs almost nothing)
  Merge    decisions.md monthly rollover (memory pass is run separately, see instructions.md)
  Flag     kept, but worth Evan's eye (and why it was not proposed)

Usage (from anywhere):
    python3 "my-skills/tidy-brain/scan.py"                         # report to stdout
    python3 "my-skills/tidy-brain/scan.py" --json <scratch>/t.json # plus every file, for the apply step
    python3 "my-skills/tidy-brain/scan.py" --gc-estimate           # also size a fresh git pack (~30 s, read-only)
    python3 "my-skills/tidy-brain/scan.py" --links                 # link check only (before and after applying)

Every rule here mirrors a line in instructions.md. Change both together.
"""
import argparse, collections, datetime as dt, hashlib, json, os, re, subprocess, sys, urllib.parse, zipfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TODAY = dt.date.today()
TEXT_ARCHIVE_DAYS = 30   # text: "changed in the last 30 days" = kept
WIP_DAYS = 1            # touched today, or uncommitted in git = someone's work in progress: never removed
STALE_DRAFT_DAYS = 14    # a draft render untouched this long, and linked from nothing live, is a finished round

# ---------------------------------------------------------------------------
# KEEP LIST. Nothing here is ever proposed for Remove, Archive or Merge.
# (Exact byte-duplicates inside it are FLAGGED only.) Prefix match on the path
# relative to the brain root.
# ---------------------------------------------------------------------------
KEEP_PREFIXES = [
    "CLAUDE.md", "SAFETY.md", ".gitignore",
    ".claude/", ".obsidian/", ".git/",
    "my-business (context)/",                       # incl. hpc-standing-rules.md
    "my-desk (now)/",                               # BOARD, PLAN, decisions, ROUX OS files, archive/ itself
    "my-skills/hpc-ad-creative/assets/",            # structural invariant: cutouts, studio, lifestyle, brand-refs
    "my-skills/hpc-ad-creative/work/creative/library/",
    "my-workflows (automations)/live/",
    "my-inbox (new inputs)/",                       # emptied by /sort-my-inbox, never by this skill
    "my-files (knowledge)/how-this-brain-works.md",
    "my-files (knowledge)/hpc-reference/",          # sourced facts
]
DRAFTS = "my-skills/hpc-ad-creative/work/creative/drafts/"
# Inside my-skills only drafts/ and helper files in templates/ are ever candidates.
HELPER_RE = re.compile(r"^(_m_|__ink_|__tmp|_probe|_base\d|\._)")   # render/measure helpers, never content
FOLDER_CONTRACT = {"README.md", "_work-folder-readme.md", ".gitkeep"}
SKIP_DIRS = {".git", "node_modules"}
TEXT_EXT = {".md", ".json", ".html", ".htm", ".css", ".js", ".mjs", ".py", ".sh", ".txt", ".yml", ".yaml", ".svg"}
BULKY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".heic", ".tif", ".tiff", ".psd", ".ai", ".pdf",
             ".mov", ".mp4", ".m4v", ".wav", ".mp3", ".zip", ".csv", ".xlsx", ".xls"}
RAW_EXPORT_EXT = {".csv", ".xlsx", ".xls"}
# Live documents: anything these link to is "still needed". The board-level files also pass
# liveness one hop on (a report the board links to makes the files IT links to live).
LIVE_SEEDS = ["my-desk (now)/BOARD.md", "my-desk (now)/PLAN.md", "my-desk (now)/launches.md",
              "my-desk (now)/key-dates.md"]
LIVE_PREFIXES = ["my-skills/", ".claude/agents/", ".claude/commands/", "my-workflows (automations)/live/",
                 "CLAUDE.md", "my-business (context)/", "my-files (knowledge)/"]
# Fact holders. A file they cite is "the only copy of a fact with a source": never removed.
FACT_PREFIXES = ["my-desk (now)/decisions.md", "my-files (knowledge)/hpc-reference/", "my-business (context)/"]
# History: never rewritten, never link-checked (old paths there are records, not links to fix).
HISTORY_PREFIXES = ["my-desk (now)/decisions.md", "my-desk (now)/archive/", ".obsidian/"]
SUPERSEDED_HINTS = re.compile(r"(/_superseded/|/_scrapped/|/_retired/|-DRAFT|-candidate|NEXT-SESSION)")  # case-sensitive
VERSION_RE = re.compile(r"^(?P<stem>.+?)-v(?P<n>\d+)(?P<rest>(-[\w.]+)?)\.(?P<ext>\w+)$")
DATE_IN_PATH = re.compile(r"(20\d\d)-(\d\d)-(\d\d)")
# Folders deeper than these are "packs" whose name can make their files live when a live doc names them.
PACK_AREAS = [DRAFTS, "my-work (outputs)/content/ads/", "my-work (outputs)/content/social/",
              "my-work (outputs)/content/website/", "my-work (outputs)/content/other/", "my-work (outputs)/internal/"]


# Standing folders that CLAUDE.md and agent files name as a place, not as a live pack.
GENERIC_FOLDERS = {"my-work (outputs)/internal/reports", "my-work (outputs)/internal/reports/raw",
                   "my-work (outputs)/internal/drafts", "my-work (outputs)/internal/playbooks",
                   "my-work (outputs)/internal/handoffs"}


def rel(p):
    return os.path.relpath(p, ROOT)


def starts(r, prefixes):
    return any(r == k or r.startswith(k) for k in prefixes)


def is_history(r):
    return starts(r, HISTORY_PREFIXES)


def is_kept(r):
    if starts(r, KEEP_PREFIXES):
        return True
    if r.startswith("my-skills/"):
        if r.startswith(DRAFTS):
            return False
        if "/templates/" in r and HELPER_RE.match(os.path.basename(r)):
            return False
        return True
    return os.path.basename(r) in FOLDER_CONTRACT


WEEK_RE = re.compile(r"(?:cw-(20\d\d-\d\d-\d\d)|(20\d\d-\d\d-\d\d)-week)")


def upcoming(r):
    """Live or upcoming work. A content-week folder (`cw-<date>`, `<date>-week`) is named for its
    Monday, so it counts from 7 days back. Any other date in a path is when the file was MADE
    (naming convention), so only a date after today counts there."""
    if SUPERSEDED_HINTS.search("/" + r):
        return False
    for a, b in WEEK_RE.findall(r):
        try:
            if dt.date.fromisoformat(a or b) >= TODAY - dt.timedelta(days=7):
                return True
        except ValueError:
            pass
    for y, m, d in DATE_IN_PATH.findall(r):
        try:
            if dt.date(int(y), int(m), int(d)) > TODAY:
                return True
        except ValueError:
            pass
    return False


def human(n):
    for u in ("B", "KB", "MB", "GB"):
        if abs(n) < 1024:
            return f"{n:.0f} {u}" if u == "B" else f"{n:.1f} {u}"
        n /= 1024
    return f"{n:.1f} TB"


def git(*args):
    return subprocess.run(["git", "-C", ROOT, *args], capture_output=True, text=True).stdout


def git_dates():
    """Last commit date per tracked path, one git call."""
    dates, cur = {}, None
    for tok in git("log", "--format=@%ad", "--date=short", "--name-only", "-z").replace("\n", "\0").split("\0"):
        if tok.startswith("@"):
            cur = tok[1:]
        elif tok and cur and tok not in dates:
            dates[tok] = cur
    return dates


def walk():
    for d, dirs, files in os.walk(ROOT):
        dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
        for f in files:
            yield os.path.join(d, f)


def md5(p):
    h = hashlib.md5()
    with open(p, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


# Markdown links may contain one level of parentheses: the brain's folders are "my-work (outputs)" etc.
LINK_RE = re.compile(r"""\]\(((?:[^()\s]|\([^()\s]*\)|%20)+)(?:\s+"[^"]*")?\)|(?:src|href)=["']([^"']+)["']|`([^`\n]+\.[A-Za-z0-9]{2,5})`|"([^"\n]+\.[A-Za-z0-9]{2,5})\"""")


def extract_targets(src_rel, text):
    """Yield (raw, resolved_rel, is_link). is_link = a real markdown link or src/href, resolved
    against the file's own folder. Mentions (`code` or "json" paths) are also tried against the
    brain root; they count as references but never as broken links."""
    base = os.path.dirname(os.path.join(ROOT, src_rel))
    for m in LINK_RE.finditer(text):
        is_link = bool(m.group(1) or m.group(2))
        raw = next(g for g in m.groups() if g)
        raw = raw.split("#")[0].split("?")[0].strip().strip("<>")
        if is_link and not os.path.exists(os.path.join(base, urllib.parse.unquote(raw))):
            raw = raw.split(" ")[0]            # markdown link with a title: [x](path "title")
        if not raw or raw.startswith(("http:", "https:", "mailto:", "data:", "#", "tel:", "javascript:", "{", "$")):
            continue
        cand = urllib.parse.unquote(raw)
        for b in ((base,) if is_link else (base, ROOT)):
            p = os.path.normpath(os.path.join(b, cand))
            if p.startswith(ROOT):
                yield raw, rel(p), is_link


def in_code_fence(text, raw):
    """True when every occurrence of raw sits inside a ``` block (a code example, not a link)."""
    inside, hit_outside = False, False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            inside = not inside
        elif raw in line and not inside:
            hit_outside = True
    return not hit_outside


def build_refs(all_rel):
    """hard[path] = files whose link resolves to it. soft[path] = files naming parent/basename,
    or the bare basename when it is unique in the brain."""
    hard, soft = collections.defaultdict(set), collections.defaultdict(set)
    exists = set(all_rel)
    dirs = {os.path.dirname(r) for r in all_rel}
    by_base = collections.defaultdict(list)
    for r in all_rel:
        by_base[os.path.basename(r)].append(r)
    texts = {}
    for r in all_rel:
        p = os.path.join(ROOT, r)
        if os.path.splitext(r)[1].lower() in TEXT_EXT and os.path.exists(p) and os.path.getsize(p) < 3_000_000:
            try:
                texts[r] = open(p, encoding="utf-8", errors="ignore").read()
            except OSError:
                pass
    broken = []
    for src, t in texts.items():
        for raw, tgt, is_link in extract_targets(src, t):
            if tgt in exists or tgt in dirs:
                if tgt != src:
                    hard[tgt].add(src)
            elif (is_link and not raw.startswith("/") and os.path.splitext(raw)[1] and "[" not in raw
                  and os.path.splitext(src)[1] in (".md", ".html", ".htm")   # .py/.js write HTML for other folders
                  and not in_code_fence(t, raw)):
                broken.append((src, raw))
    for base, paths in by_base.items():
        if len(base) < 6 or base in FOLDER_CONTRACT or base == ".DS_Store":
            continue
        needles = {p: os.path.basename(os.path.dirname(p)) + "/" + base for p in paths}
        for src, t in texts.items():
            if base not in t and urllib.parse.quote(base) not in t:
                continue
            for p in paths:
                if src != p and (len(paths) == 1 or needles[p] in t or os.path.dirname(src) == os.path.dirname(p)):
                    soft[p].add(src)
    return hard, soft, broken, texts


def zip_members(zpath):
    try:
        with zipfile.ZipFile(zpath) as z:
            return [hashlib.md5(z.read(i)).hexdigest() for i in z.infolist()
                    if not i.is_dir() and "__MACOSX" not in i.filename
                    and not os.path.basename(i.filename).startswith((".", "._"))]
    except (zipfile.BadZipFile, OSError):
        return None


def gc_estimate():
    """Size of one fresh pack holding every reachable object: roughly .git/objects after `git gc`.
    Read-only: the pack is streamed to a byte counter, never written."""
    revs = subprocess.run(["git", "-C", ROOT, "rev-list", "--objects", "--all", "--reflog", "--indexed-objects"],
                          capture_output=True).stdout
    p = subprocess.run(["git", "-C", ROOT, "pack-objects", "--stdout", "--quiet"], input=revs, capture_output=True)
    return len(p.stdout)


def git_blob_split(removing_tracked):
    """Bytes (compressed, on disk) of blobs used by HEAD vs history only, and how much the
    proposed removals would add to history-only (they stay in .git after the commit)."""
    head = set(git("ls-tree", "-r", "HEAD", "--format=%(objectname)").split())
    objs = git("rev-list", "--objects", "--all")
    shas = "\n".join(l.split(" ", 1)[0] for l in objs.splitlines() if l).encode()   # "sha path" -> "sha"
    out = subprocess.run(["git", "-C", ROOT, "cat-file", "--batch-check=%(objecttype) %(objectname) %(objectsize:disk)"],
                         input=shas, capture_output=True).stdout.decode()
    seen, in_head, hist = set(), 0, 0
    for line in out.splitlines():
        t, h, d = line.split(" ")
        if t != "blob" or h in seen:
            continue
        seen.add(h)
        if h in head:
            in_head += int(d)
        else:
            hist += int(d)
    # blobs of the tracked files we would remove, if no other current path still uses them
    path_blob = {}
    for e in filter(None, git("ls-files", "-s", "-z").split("\0")):
        meta, path = e.split("\t", 1)
        path_blob[path] = meta.split()[1]
    rm_blobs = {path_blob[p] for p in removing_tracked if p in path_blob}
    still_used = {path_blob[p] for p in path_blob if p not in removing_tracked}
    freed = rm_blobs - still_used
    size = 0
    if freed:
        o = subprocess.run(["git", "-C", ROOT, "cat-file", "--batch-check=%(objectsize:disk)"],
                           input="\n".join(freed).encode(), capture_output=True).stdout.decode()
        size = sum(int(x) for x in o.split() if x.isdigit())
    return in_head, hist, size


def du(path):
    try:
        return int(subprocess.run(["du", "-sk", path], capture_output=True, text=True).stdout.split()[0]) * 1024
    except (IndexError, ValueError):
        return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json")
    ap.add_argument("--links", action="store_true", help="link check only")
    ap.add_argument("--gc-estimate", action="store_true", help="size a fresh git pack (read-only, ~30 s)")
    a = ap.parse_args()

    files = list(walk())
    all_rel = [rel(p) for p in files]
    hard, soft, broken, texts = build_refs(all_rel)

    def tidy_noted(src):
        return "tidy-brain:" in texts.get(src, "")

    if a.links:
        live = [(s, r) for s, r in broken if not is_history(s)]
        noted = [(s, r) for s, r in live if tidy_noted(s)]
        live = [(s, r) for s, r in live if not tidy_noted(s)]
        print(f"Broken relative links in live files: {len(live)}")
        for s, r in live:
            print(f"  {s} -> {r}")
        print(f"In files carrying a tidy-brain note (target removed on purpose, recoverable from git): {len(noted)}")
        print(f"In history files (recorded, never rewritten): {len([1 for s, _ in broken if is_history(s)])}")
        return

    gdates = git_dates()
    dirty = set()
    for e in filter(None, git("status", "--porcelain", "-z", "--untracked-files=all").split("\0")):
        if len(e) > 3 and e[2] == " ":
            dirty.add(e[3:])
    trk = set(filter(None, git("ls-files", "-z").split("\0")))
    info = {}
    for p, r in zip(files, all_rel):
        try:
            st = os.stat(p)
        except FileNotFoundError:          # another session removed it mid-scan (render temp files do this)
            continue
        m = dt.date.fromtimestamp(st.st_mtime)
        g = gdates.get(r)
        last = max(m, dt.date.fromisoformat(g)) if g else m
        info[r] = dict(size=st.st_size, last=last.isoformat(), age=(TODAY - last).days, mtime_age=(TODAY - m).days,
                       tracked=r in trk, kept=is_kept(r), ext=os.path.splitext(r)[1].lower())

    hashes, hash_of = collections.defaultdict(list), {}
    for r, i in info.items():
        if i["size"] > 0 and os.path.basename(r) != ".DS_Store":
            try:
                h = md5(os.path.join(ROOT, r))
            except FileNotFoundError:
                continue
            hashes[h].append(r)
            hash_of[r] = h

    # ---- liveness -----------------------------------------------------------
    live_docs = {r for r in info if starts(r, LIVE_PREFIXES) or r in LIVE_SEEDS}
    for seed in LIVE_SEEDS:                                   # one hop out from the board and plan
        for r in info:
            if seed in hard.get(r, set()) and r in texts:
                live_docs.add(r)

    def refs(r):
        return sorted(x for x in hard.get(r, set()) | soft.get(r, set()) if not x.startswith(".obsidian/"))

    def live_refs(r):
        return [x for x in refs(r) if x in live_docs and not is_history(x)]

    def fact_refs(r):
        return [x for x in refs(r) if starts(x, FACT_PREFIXES)]

    def pack_named(r):
        """A live doc names one of r's pack folders (e.g. `drafts/showroom/`, `2026-09-labor-day/UPLOAD-TO-META`)."""
        hits = []
        for area in PACK_AREAS:
            if not r.startswith(area):
                continue
            parts = r[len(area):].split("/")[:-1]
            for k in range(1, len(parts) + 1):
                folder = area + "/".join(parts[:k])
                if folder in GENERIC_FOLDERS:
                    continue
                needle = folder.split("work/creative/")[-1] if folder.startswith(DRAFTS) else folder
                for x in live_docs:
                    if x in texts and needle in texts[x] and not x.startswith(folder + "/") and not is_history(x):
                        hits.append(x)
        return sorted(set(hits))

    # ---- version families (older -vN of the same piece) -------------------
    fams = collections.defaultdict(list)
    for r in info:
        m = VERSION_RE.match(os.path.basename(r))
        if m:
            stem = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", m["stem"])
            area = os.path.dirname(r).replace("/_superseded", "").replace("/_scrapped", "")
            fams[(area, stem, m["rest"], m["ext"])].append((int(m["n"]), r))
    newer = {}
    for v in fams.values():
        top = max(n for n, _ in v)
        for n, r in v:
            if n < top:
                newer[r] = next(x for k, x in v if k == top)

    # ---- duplicate keepers -------------------------------------------------
    def keeper_rank(r):
        if info[r]["kept"]:
            return 0
        if live_refs(r) or pack_named(r) or upcoming(r):
            return 1
        if r.startswith("my-work (outputs)/") and not SUPERSEDED_HINTS.search("/" + r):
            return 2
        return 3
    keeper = {}
    kept_dup_groups = []
    for h, grp in hashes.items():
        if len(grp) < 2:
            continue
        grp = sorted(grp, key=lambda r: (keeper_rank(r), len(r)))
        for r in grp[1:]:
            keeper[r] = grp[0]
        inside = [r for r in grp if info[r]["kept"]]
        if len(inside) > 1:
            kept_dup_groups.append(inside)

    # ---- classify ------------------------------------------------------------
    items = {}          # path -> dict(bucket, cat, why, ...)

    def put(r, bucket, cat, why, **kw):
        items[r] = dict(path=r, bucket=bucket, cat=cat, why=why, size=info[r]["size"], last=info[r]["last"],
                        age=info[r]["age"], tracked=info[r]["tracked"], refs=refs(r), **kw)

    skipped_kept_ds = 0
    for r, i in sorted(info.items()):
        b = os.path.basename(r)
        if i["kept"]:
            if b == ".DS_Store":
                skipped_kept_ds += 1
            continue
        # 1. what kind of removal would this be?
        cat = why = None
        if b == ".DS_Store":
            cat, why = "Finder metadata", ".DS_Store, never content (git ignores it)"
        elif HELPER_RE.match(b):
            cat, why = "Render/measure helpers", "helper file (`_m_`, `__ink_`, `__tmp`, `_probe`, `_base`), regenerated on demand"
        elif i["size"] == 0 and b not in FOLDER_CONTRACT:
            cat, why = "Empty files", "empty file"
        elif r in keeper:
            where = "draft render" if r.startswith(DRAFTS) else "deliverable copy"
            cat, why = f"Duplicates ({where})", f"byte-identical copy of `{keeper[r]}`, which stays"
        elif i["ext"] in BULKY_EXT and (SUPERSEDED_HINTS.search("/" + r) or r in newer):
            cat = "Superseded rounds"
            why = "older version" + (f"; `{os.path.basename(newer[r])}` replaced it" if r in newer else " (in a superseded/scrapped folder)")
        elif r.startswith(DRAFTS) and i["age"] >= STALE_DRAFT_DAYS:
            cat, why = "Stale draft renders", f"draft render untouched {i['age']} days; drafts are disposable (creative README) and re-render from templates/"
        elif i["ext"] in RAW_EXPORT_EXT and r.startswith("my-work (outputs)/internal/"):
            summarised = [x for x in refs(r) if x.endswith(".md") and not is_history(x) and "/raw/README" not in x]
            if summarised:
                cat, why = "Raw exports already summarised", f"raw export; its numbers are written up in {', '.join(summarised[:2])}"
        if cat:
            # 2. guards: any of these keeps it (moved to Flag with the reason)
            lr, fr, pn = live_refs(r), fact_refs(r), pack_named(r)
            guard = None
            if cat == "Finder metadata":
                guard = None
            elif fr:
                guard = f"cited as a source by {', '.join(fr[:2])}"
            elif lr:
                guard = f"linked from live file {', '.join(lr[:2])}"
            elif pn:
                guard = f"its folder is named in live file {', '.join(pn[:2])}"
            elif upcoming(r):
                guard = "dated this week or later (live or upcoming work)"
            elif (r in dirty and b != ".DS_Store") or i["mtime_age"] < WIP_DAYS:
                guard = "uncommitted or touched in the last day: work in progress, maybe another session's"
            elif not i["tracked"] and not cat.startswith("Duplicates") and cat != "Render/measure helpers":
                guard = "NOT in git: Trash would hold the only copy"
            if guard:
                put(r, "flag", "Would be removable, but kept", f"{why}. Kept: {guard}")
            else:
                notes = [x for x in refs(r) if not is_history(x) and x in texts]
                put(r, "remove", cat, why, notes=notes)
            continue
        # 3. text history: archive when old and unlinked, else flag superseded ones with their date
        if i["ext"] not in BULKY_EXT:
            sup = bool(SUPERSEDED_HINTS.search("/" + r)) or r in newer
            lr, fr = live_refs(r), fact_refs(r)
            if lr or fr:
                if sup:
                    put(r, "flag", "Superseded text, still linked", f"superseded, but linked from {', '.join(sorted(set(lr + fr))[:2])}")
                continue
            if i["age"] > TEXT_ARCHIVE_DAYS:
                put(r, "archive", "Old text", ("superseded" if sup else f"untouched {i['age']} days") + ", nothing live links to it")
            elif sup:
                elig = (dt.date.fromisoformat(i["last"]) + dt.timedelta(days=TEXT_ARCHIVE_DAYS + 1)).isoformat()
                put(r, "flag", "Superseded text, too recent to archive", f"superseded; changed {i['age']} days ago, archive-eligible {elig}")

    # 4. zips: remove only when every member survives, unzipped, somewhere that is not being removed
    removing = {r for r, x in items.items() if x["bucket"] == "remove"}
    surviving = {h for r, h in hash_of.items() if r not in removing}
    all_hashes = set(hash_of.values())
    for r, i in info.items():
        if i["ext"] != ".zip" or i["kept"] or r in removing:
            continue
        mem = zip_members(os.path.join(ROOT, r))
        if not mem:
            continue
        if all(h in surviving for h in mem):
            items.pop(r, None)
            put(r, "remove", "Zips of files kept unzipped", f"zip of {len(mem)} files that all stay in the brain unzipped, byte-identical",
                notes=[x for x in refs(r) if not is_history(x) and x in texts])
            removing.add(r)
        elif all(h in all_hashes for h in mem):
            items.pop(r, None)
            put(r, "flag", "Zip of files also proposed for removal",
                f"zip of {len(mem)} files; its contents are in the brain but some are on the Remove list. "
                "Remove both only if the whole pack can go (git keeps every file)")

    # a duplicate whose keeper is itself being removed: say so plainly
    for r in list(removing):
        k = keeper.get(r)
        if k and k in removing and items[r]["cat"].startswith("Duplicates"):
            items[r]["why"] += " — ⚠️ that copy is also on the Remove list, so after both go the image lives only in git"

    # 5. merge: decisions.md rollover (report only; this scanner never edits my-desk)
    merges = []
    dec = os.path.join(ROOT, "my-desk (now)/decisions.md")
    if os.path.exists(dec):
        lines = open(dec, encoding="utf-8").read().splitlines()
        heads = [(n, l[3:].strip()) for n, l in enumerate(lines) if re.match(r"^## \d{4}-\d{2}\s*$", l)]
        for idx, (n, month) in enumerate(heads):
            end = heads[idx + 1][0] if idx + 1 < len(heads) else len(lines)
            y, mo = map(int, month.split("-"))
            nxt = f"{y + (mo == 12)}-{(mo % 12) + 1:02d}-01"
            status = "month closed: roll over now" if month < TODAY.strftime("%Y-%m") else f"month still open: roll over on or after {nxt}"
            merges.append(f"`decisions.md` `## {month}`: {end - n} lines → `archive/decisions-{month}.md` ({status})")

    # 6. flags that are not candidates
    extra_flags = []
    for grp in kept_dup_groups:
        extra_flags.append((sum(info[r]["size"] for r in grp[1:]),
                            "byte-identical files inside the keep list (never removed by this skill): "
                            + " = ".join(f"`{r}`" for r in grp)))
    board = os.path.join(ROOT, "my-desk (now)/BOARD.md")
    if os.path.exists(board):
        bl = open(board, encoding="utf-8").read()
        extra_flags.append((0, f"`BOARD.md` {bl.count(chr(10))}/120 lines, {human(len(bl.encode()))}, longest line "
                               f"{max(len(x) for x in bl.splitlines())} chars. The line cap holds; long lines are how it grows now. "
                               "Report only: /wrap owns the board"))

    # ---------------- report ----------------
    tree = sum(i["size"] for i in info.values())
    gitdir = du(os.path.join(ROOT, ".git"))
    rm = [x for x in items.values() if x["bucket"] == "remove"]
    rm_bytes = sum(x["size"] for x in rm)
    print(f"# tidy-brain dry run — {TODAY.isoformat()}\n")
    print(f"**Brain on disk:** {human(du(ROOT))} = working files {human(tree)} (excl. node_modules) + `.git` {human(gitdir)}.\n")
    print(f"**Could be freed by the Remove list: {human(rm_bytes)}** of working files ({len(rm)} files). "
          "They move to the macOS Trash (`~/.Trash/tidy-brain-<date>/`), never `rm`. "
          "**The space comes back only when Evan empties the Trash.**\n")

    print(f"## Remove → Trash — {len(rm)} files, {human(rm_bytes)}\n")
    cats = collections.defaultdict(list)
    for x in rm:
        cats[x["cat"]].append(x)
    print("| Category | Files | Size |\n|---|---:|---:|")
    for c, xs in sorted(cats.items(), key=lambda kv: -sum(x["size"] for x in kv[1])):
        print(f"| {c} | {len(xs)} | {human(sum(x['size'] for x in xs))} |")
    print(f"| **Total** | **{len(rm)}** | **{human(rm_bytes)}** |\n")
    print("**By folder, biggest first**\n")
    groups = collections.defaultdict(list)
    for x in rm:
        groups[(os.path.dirname(x["path"]), x["cat"])].append(x)
    for (folder, c), xs in sorted(groups.items(), key=lambda kv: -sum(x["size"] for x in kv[1])):
        lasts = sorted(x["last"] for x in xs)
        span = lasts[0] if lasts[0] == lasts[-1] else f"{lasts[0]} → {lasts[-1]}"
        untracked = sum(1 for x in xs if not x["tracked"])
        notes = sorted({n for x in xs for n in x.get("notes", [])})
        print(f"- **{human(sum(x['size'] for x in xs))}** · `{folder or '(brain root)'}/` · {len(xs)} × {c.lower()} · last changed {span}"
              + (f" · {untracked} not in git" if untracked else ""))
        if len({x['why'] for x in xs}) == 1:
            print(f"  - why: {xs[0]['why']}")
        if notes:
            print(f"  - named in (not live; gets a tidy note): {', '.join(notes[:3])}" + (f" +{len(notes) - 3}" if len(notes) > 3 else ""))
    print("\n**Top 15 single files**\n")
    for x in sorted(rm, key=lambda x: -x["size"])[:15]:
        print(f"- {human(x['size'])} · `{x['path']}` · {x['last']} — {x['why']}")
    print()

    # git
    removing_tracked = {x["path"] for x in rm if x["tracked"]}
    in_head, hist, freed_later = git_blob_split(removing_tracked)
    print("## Git — what trashing does and does not free\n")
    print(f"- `.git` is **{human(gitdir)}**. It holds {human(in_head)} of file contents used by the current version and "
          f"{human(hist)} used only by history. So `.git` is a second copy of almost every file in the brain, on the same disk.")
    print(f"- Trashing a tracked file frees its working copy only. After the commit its contents still sit in `.git` as history. "
          f"For this Remove list that is **{human(freed_later)}** that stays in `.git`.")
    print(f"- Only a history rewrite would free that {human(freed_later)} (plus the {human(hist)} already history-only). "
          "**This skill never does that** (no filter-repo, no BFG, no force-push). It is a separate decision for Evan.")
    cnt = dict(l.split(": ", 1) for l in git("count-objects", "-vH").splitlines() if ": " in l)
    print(f"- Loose objects now: {cnt.get('count')} ({cnt.get('size')}); packed: {cnt.get('size-pack')}. "
          "`git gc` packs the loose ones together and prunes unreachable objects older than 2 weeks. It rewrites no history.")
    if a.gc_estimate:
        est = gc_estimate()
        objs = du(os.path.join(ROOT, ".git", "objects"))
        print(f"- **gc estimate:** one fresh pack of every reachable object is {human(est)}; `.git/objects` is {human(objs)} now, "
              f"so `git gc` should save about **{human(max(objs - est, 0))}**. Images barely compress, so packing them gains little.")
    else:
        print("- Run with `--gc-estimate` to size the `git gc` result before running it.")
    print()

    ar = [x for x in items.values() if x["bucket"] == "archive"]
    print(f"## Archive (text history) — {len(ar)} files, {human(sum(x['size'] for x in ar))}\n")
    for x in sorted(ar, key=lambda x: -x["size"]):
        print(f"- `{x['path']}` · {human(x['size'])} · {x['last']} — {x['why']}")
    if not ar:
        print("- Nothing yet. Every text file is either under 30 days old or linked from something live.")
    print()

    print(f"## Merge — {len(merges)}\n")
    for m in merges:
        print(f"- {m}")
    print("- Memory: run the consolidate-memory pass separately (instructions.md step 4); it reports in the same approve-first form.\n")

    fl = [x for x in items.values() if x["bucket"] == "flag"]
    print(f"## Keep-but-flag — {len(fl) + len(extra_flags)}\n")
    fg = collections.defaultdict(list)
    for x in fl:
        fg[(os.path.dirname(x["path"]), x["cat"], re.sub(r"`[^`]*`", "…", x["why"].split(". Kept: ")[-1]))].append(x)
    for (folder, c, reason), xs in sorted(fg.items(), key=lambda kv: -sum(x["size"] for x in kv[1])):
        if len(xs) == 1:
            x = xs[0]
            print(f"- {human(x['size'])} · `{x['path']}` — {x['why']}")
        else:
            print(f"- {human(sum(x['size'] for x in xs))} · `{folder}/` · {len(xs)} files — {c}: {reason}")
    for size, text in sorted(extra_flags, key=lambda t: -t[0]):
        print(f"- {human(size) + ' · ' if size else ''}{text}")
    print()

    live_broken = [(s, r) for s, r in broken if not is_history(s) and not tidy_noted(s)]
    print(f"## Links\n\nBroken relative links in live files right now: {len(live_broken)} (the baseline; applying must add none).")
    for s, r in live_broken[:20]:
        print(f"- `{s}` → `{r}`")
    print(f"\n.DS_Store files inside keep-list folders left alone: {skipped_kept_ds}.")

    if a.json:
        with open(a.json, "w") as fh:
            json.dump(dict(date=TODAY.isoformat(), items=list(items.values()), merges=merges,
                           baseline_broken=live_broken), fh, indent=1)


if __name__ == "__main__":
    main()
