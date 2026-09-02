#!/bin/bash
# Render one concept across ALL THREE Meta creative sizes.
# Expects templates/<concept>/{1x1,4x5,9x16}.html
# usage: ./build-set.sh <concept> [output-prefix]
set -e
C="$1"; PRE="${2:-$1}"
[ -d "templates/$C" ] || { echo "no templates/$C/ — expected 1x1.html, 4x5.html, 9x16.html"; exit 1; }
declare -a S=("1x1:1080x1080" "4x5:1080x1350" "9x16:1080x1920")
for e in "${S[@]}"; do
  n="${e%%:*}"; dim="${e##*:}"
  [ -f "templates/$C/$n.html" ] && ./build.sh "templates/$C/$n.html" "$dim" "drafts/${PRE}-${n}.png" \
    || echo "  (skipped $n — no template)"
done
