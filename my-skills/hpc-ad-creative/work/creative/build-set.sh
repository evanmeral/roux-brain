#!/bin/bash
# Render one concept across the PAID Meta creative sizes.
#
# Paid set (Evan, 2026-09-08 — replaced the old {1x1,4x5,9x16} set):
#   1x1     1080x1080   Feed, Marketplace, Explore
#   9x16    1080x1920   Stories, Reels
#   1.91x1  1200x628    Right column, Search, Audience Network
#
# 4x5 (1080x1350) is an ORGANIC size — feed posts and carousels — and is deliberately
# NOT in the paid set. Pass --with-4x5 to add it for an organic build.
#
# Expects templates/<concept>/{1x1,9x16,1.91x1}.html
# usage: ./build-set.sh <concept> [output-prefix] [--with-4x5]
set -e

WITH_4X5=0
ARGS=()
for a in "$@"; do
  case "$a" in
    --with-4x5) WITH_4X5=1 ;;
    *) ARGS+=("$a") ;;
  esac
done

C="${ARGS[0]}"; PRE="${ARGS[1]:-${ARGS[0]}}"
[ -n "$C" ] || { echo "usage: ./build-set.sh <concept> [output-prefix] [--with-4x5]"; exit 1; }
[ -d "templates/$C" ] || { echo "no templates/$C/ — expected 1x1.html, 9x16.html, 1.91x1.html"; exit 1; }

declare -a S=("1x1:1080x1080" "9x16:1080x1920" "1.91x1:1200x628")
[ "$WITH_4X5" -eq 1 ] && S+=("4x5:1080x1350")

MISSING=0
for e in "${S[@]}"; do
  n="${e%%:*}"; dim="${e##*:}"
  if [ -f "templates/$C/$n.html" ]; then
    ./build.sh "templates/$C/$n.html" "$dim" "drafts/${PRE}-${n}.png"
  else
    echo "  ⚠️  MISSING templates/$C/$n.html — $n not built"
    MISSING=1
  fi
done

if [ "$MISSING" -eq 1 ]; then
  echo ""
  echo "⚠️  Incomplete set. Every paid Meta static ad ships 1x1 + 9x16 + 1.91x1."
  exit 1
fi
