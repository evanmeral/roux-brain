#!/bin/bash
# Installs Atlas OS as a login item. Safe to re-run.
#
# launchd runs node directly on server.js. The vault lives in ~/Desktop, which macOS protects, and
# macOS files that permission under "node" in System Settings > Privacy & Security > Files and
# Folders. This script starts the server once, checks it answers, and only then registers the
# launchd jobs (the server, and the 6:30 pulse that curls it). If the grant is missing it registers
# nothing and says so; there are no dialogs either way.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
NODE="$(command -v node)"
[ -n "$NODE" ] || { echo "node not found on PATH"; exit 1; }
mkdir -p "$ROOT/logs" "$HOME/Library/LaunchAgents"

# stop anything from earlier installs (including the old app-bundle launcher)
launchctl bootout "gui/$(id -u)/com.atlas.os" 2>/dev/null || true
launchctl bootout "gui/$(id -u)/com.atlas.pulse" 2>/dev/null || true
pkill -f "Atlas OS.app/Contents/MacOS/applet" 2>/dev/null || true
[ -f "$HOME/Library/LaunchAgents/com.atlas.os.plist.disabled" ] && mv "$HOME/Library/LaunchAgents/com.atlas.os.plist.disabled" "$HOME/.Trash/com.atlas.os.plist.disabled" 2>/dev/null || true
sleep 1

# register the server job; launchd starts it now (RunAtLoad) under launchd's own context, which is
# the context that matters for the Desktop grant
PLIST="$HOME/Library/LaunchAgents/com.atlas.os.plist"
sed -e "s|__NODE__|$NODE|g" -e "s|__ROOT__|$ROOT|g" -e "s|__HOME__|$HOME|g" "$ROOT/launchd/com.atlas.os.plist" > "$PLIST"
launchctl bootstrap "gui/$(id -u)" "$PLIST"
for i in 1 2 3 4 5 6 7 8; do
  sleep 1
  if curl -s -m 2 http://localhost:4242/health >/dev/null 2>&1; then break; fi
done
if ! curl -s -m 2 http://localhost:4242/health >/dev/null 2>&1; then
  launchctl bootout "gui/$(id -u)/com.atlas.os" 2>/dev/null || true
  mv "$PLIST" "$HOME/.Trash/com.atlas.os.plist" 2>/dev/null || true
  echo "The server could not start, so nothing stays registered."
  echo "Most likely macOS has not let node read your Desktop folder yet:"
  echo "  System Settings > Privacy & Security > Files and Folders > node > turn on Desktop Folder"
  echo "Then run ./install.sh again. Details: $ROOT/logs/server.err.log"
  exit 1
fi

PULSE="$HOME/Library/LaunchAgents/com.atlas.pulse.plist"
sed -e "s|__ROOT__|$ROOT|g" "$ROOT/launchd/com.atlas.pulse.plist" > "$PULSE"
launchctl bootstrap "gui/$(id -u)" "$PULSE"
echo "Atlas OS is running at http://localhost:4242, starts at login, and the 6:30 pulse is scheduled."
