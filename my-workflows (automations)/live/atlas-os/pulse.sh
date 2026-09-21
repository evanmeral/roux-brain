#!/bin/bash
# The pulse. Button-only (Evan, 2026-09-14): runs when Pulse now is pressed. Runs /pulse headless in the vault and logs the run. Reads only; writes
# my-desk (now)/today.md and my-desk (now)/pulse/<date>.json (see .claude/commands/pulse.md).
ROOT="$(cd "$(dirname "$0")" && pwd)"
VAULT="$(cd "$ROOT/../../.." && pwd)"
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
MODEL="${ATLAS_PULSE_MODEL:-claude-sonnet-5}"
STAMP="$(date +%Y-%m-%d_%H%M)"
OUT="$ROOT/logs/pulse/$STAMP.json"
mkdir -p "$ROOT/logs/pulse"
START=$(date +%s)
echo -e "$(date -u +%Y-%m-%dT%H:%M:%SZ)\tpulse\tstarted\tmodel=$MODEL" >> "$ROOT/runs.log"
cd "$VAULT" && claude -p "$(cat .claude/commands/pulse.md)" --model "$MODEL" --output-format json > "$OUT" 2> "$OUT.err"
CODE=$?
SECS=$(( $(date +%s) - START ))
RESULT="$(python3 -c "import json,sys; d=json.load(open('$OUT')); print((d.get('result') or '').strip().splitlines()[-1][:120] if d.get('result') else 'no result')" 2>/dev/null || echo 'unreadable output')"
if [ $CODE -eq 0 ]; then STATUS="done"; else STATUS="failed"; fi
echo -e "$(date -u +%Y-%m-%dT%H:%M:%SZ)\tpulse\t$STATUS\t${SECS}s\t$RESULT\t$OUT" >> "$ROOT/runs.log"
exit $CODE
