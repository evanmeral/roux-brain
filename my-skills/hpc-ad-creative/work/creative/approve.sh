#!/bin/bash
# Move an APPROVED draft into the permanent library with the standard filename + log it.
# Only run after Evan approves or edits. Unapproved work is never archived.
#
# usage: ./approve.sh <draft.png> <product-slug> <angle-slug> [channel] [notes]
#   ./approve.sh drafts/03-fryer.png 18qt-fryer fry-it-all meta "off-season push"
set -e
SRC="$1"; PROD="$2"; ANGLE="$3"; CHAN="${4:-}"; NOTES="${5:-}"
[ -f "$SRC" ] || { echo "no such draft: $SRC"; exit 1; }
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
