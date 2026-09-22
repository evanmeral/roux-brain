#!/bin/bash
# HPC static ad renderer — HTML/CSS -> PNG via headless Chrome.
# Author templates at TRUE ad pixel size (1 CSS px = 1 output px).
# usage: ./build.sh <template.html> <WIDTHxHEIGHT> <output.png>
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TPL="$1"; SIZE="$2"; OUT="$3"
W="${SIZE%x*}"; H="${SIZE#*x}"
DIR="$(cd "$(dirname "$TPL")" && pwd)"
mkdir -p "$(dirname "$OUT")"
ABS="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=1 --window-size="$W,$H" --virtual-time-budget=5000 \
  --screenshot="$ABS" "file://$DIR/$(basename "$TPL")" 2>/dev/null || true
printf "%-42s " "$(basename "$OUT")"; sips -g pixelWidth -g pixelHeight "$ABS" 2>/dev/null | tail -2 | tr -d ' \n' | sed 's/pixelWidth:/ /;s/pixelHeight:/ x /'
BYTES=$(stat -f%z "$ABS" 2>/dev/null || echo 0)
if [ "$BYTES" -lt 20000 ]; then echo "  ⚠️  ONLY ${BYTES}B — LIKELY BLANK. Check the template."; else echo "  (${BYTES}B)"; fi
# Remember which template made this PNG, so rubric-check can pair them (render<TAB>template<TAB>size).
# Hidden file beside the render; the latest line for a file wins. Never fails the build.
printf '%s\t%s\t%s\n' "$(basename "$OUT")" "$DIR/$(basename "$TPL")" "$SIZE" >> "$(dirname "$ABS")/.rubric-sources.tsv" 2>/dev/null || true
