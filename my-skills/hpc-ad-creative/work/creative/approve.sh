#!/bin/bash
# Move an APPROVED draft into the permanent library with the standard filename + log it.
# Only run after Evan approves or edits. Unapproved work is never archived.
#
# usage: ./approve.sh <draft.png> <product-slug> <angle-slug> [channel] [notes] [--waive "Evan's words"]
#   ./approve.sh drafts/03-fryer.png 18qt-fryer fry-it-all meta "off-season push"
#
# Rubric gate (Evan, 2026-09-22): the draft is run through rubric-check first. A FAIL refuses to
# archive unless Evan approved it anyway, in which case pass --waive with HIS words; they are
# written into the log's notes. Never waive on your own judgment.
set -e
WAIVE=""; ARGS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --waive) WAIVE="${2:-}"; [ -n "$WAIVE" ] || { echo "--waive needs Evan's words"; exit 1; }; shift 2 ;;
    *) ARGS+=("$1"); shift ;;
  esac
done
SRC="${ARGS[0]:-}"; PROD="${ARGS[1]:-}"; ANGLE="${ARGS[2]:-}"; CHAN="${ARGS[3]:-}"; NOTES="${ARGS[4]:-}"
[ -f "$SRC" ] || { echo "no such draft: $SRC"; exit 1; }
[ -n "$PROD" ] && [ -n "$ANGLE" ] || { echo "usage: ./approve.sh <draft.png> <product-slug> <angle-slug> [channel] [notes] [--waive \"Evan's words\"]"; exit 1; }
if ! python3 rubric-check/rubric_check.py "$SRC" --quiet; then
  if [ -z "$WAIVE" ]; then
    echo ""
    echo "⛔ Not archived: rubric-check FAILED. Fix it, or if Evan approved it as is, re-run with --waive \"<his words>\"."
    exit 1
  fi
  NOTES="${NOTES:+$NOTES }Rubric FAIL waived by Evan: \"$WAIVE\"."
fi
DATE=$(date +%F)
DIM=$(sips -g pixelWidth -g pixelHeight "$SRC" | awk '/pixelWidth/{w=$2}/pixelHeight/{h=$2}END{printf "%sx%s",w,h}')
BASE="${DATE}_${PROD}_${ANGLE}_${DIM}"
V=1; while [ -f "library/${BASE}_v${V}.png" ]; do V=$((V+1)); done
DEST="library/${BASE}_v${V}.png"
mkdir -p library; cp "$SRC" "$DEST"
LOG=library/LIBRARY-LOG.md
[ -f "$LOG" ] || cat > "$LOG" <<'HDR'
# HPC Creative Library — Log

Every approved creative. Naming: `YYYY-MM-DD_<product>_<angle>_<WxH>_v<N>.png`
Drafts live in `../drafts/` and are **not** archived until Evan approves or edits them.

| File | Date | Product | Angle | Size | Channel | Notes |
|---|---|---|---|---|---|---|
HDR
echo "| \`$(basename "$DEST")\` | $DATE | $PROD | $ANGLE | $DIM | ${CHAN:-—} | ${NOTES:-—} |" >> "$LOG"
echo "archived -> $DEST"
