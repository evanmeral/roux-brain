#!/bin/bash
# Render every frame of a carousel template set to PNG, in order.
# usage: ./build-carousel.sh <name>          -> drafts/<name>/*.png
set -e
NAME="$1"
[ -z "$NAME" ] && { echo "usage: ./build-carousel.sh <name>"; exit 1; }
DIR="templates/$NAME"
[ -d "$DIR" ] || { echo "no such template set: $DIR"; exit 1; }
mkdir -p "drafts/$NAME"
for f in "$DIR"/frame-*.html; do
  b="$(basename "$f" .html)"
  ./build.sh "$f" 1080x1350 "drafts/$NAME/$b.png"
done
echo
# Rubric gate (Evan, 2026-09-22): carousel frames are organic 4:5. Exits 1 on any FAIL.
python3 rubric-check/rubric_check.py "drafts/$NAME" --placement organic --quiet || {
  echo ""; echo "⛔ rubric-check FAILED — fix and re-render before showing Evan."; exit 1; }
