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
echo "now check centring:  python3 check-centering.py drafts/$NAME"
