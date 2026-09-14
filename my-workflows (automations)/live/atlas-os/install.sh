#!/bin/bash
# Installs Atlas OS as a login item. Safe to re-run.
#
# 1. Builds ~/Applications/Atlas OS.app, a tiny launcher that hosts the node server.
# 2. Opens it once. If macOS has not granted it Desktop access, the app shows one dialog with a
#    button to the right settings pane and exits; nothing is registered with launchd, so there
#    is no loop. Run this again after granting access.
# 3. Only once the server answers, registers the launchd jobs: the server (relaunched only while
#    the grant marker exists) and the 6:30 pulse (a curl to the running server).
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
NODE="$(command -v node)"
[ -n "$NODE" ] || { echo "node not found on PATH"; exit 1; }
APP="$HOME/Applications/Atlas OS.app"
MARKER="$HOME/Library/Application Support/AtlasOS/granted"
mkdir -p "$ROOT/logs" "$HOME/Library/LaunchAgents" "$HOME/Applications"

# stop anything from earlier installs
launchctl bootout "gui/$(id -u)/com.atlas.os" 2>/dev/null || true
launchctl bootout "gui/$(id -u)/com.atlas.pulse" 2>/dev/null || true
pkill -f "Atlas OS.app/Contents/MacOS/applet" 2>/dev/null || true
sleep 1

# 1. the app bundle
TMP="$(mktemp -d)"
sed -e "s|__NODE__|$NODE|g" -e "s|__ROOT__|$ROOT|g" "$ROOT/launchd/AtlasOS.applescript" > "$TMP/AtlasOS.applescript"
osacompile -o "$APP" "$TMP/AtlasOS.applescript" 2>&1 | grep -v "replacing existing signature" || true
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.atlas.os" "$APP/Contents/Info.plist" 2>/dev/null || /usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string com.atlas.os" "$APP/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Add :LSUIElement bool true" "$APP/Contents/Info.plist" 2>/dev/null || /usr/libexec/PlistBuddy -c "Set :LSUIElement true" "$APP/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleName Atlas OS" "$APP/Contents/Info.plist" 2>/dev/null || true

# 2. one real launch, then check
open -a "$APP"
for i in 1 2 3 4 5 6 7 8; do
  sleep 1
  if curl -s -m 2 http://localhost:4242/health >/dev/null 2>&1; then break; fi
done
if ! curl -s -m 2 http://localhost:4242/health >/dev/null 2>&1; then
  echo "Atlas OS could not read the vault, so nothing was registered with launchd."
  echo "macOS must allow 'Atlas OS' to read your Desktop folder: System Settings > Privacy & Security >"
  echo "Files and Folders > Atlas OS > Desktop Folder (the app just showed a dialog with a button to that pane)."
  echo "Then run ./install.sh again."
  exit 1
fi

# 3. the launchd jobs
PLIST="$HOME/Library/LaunchAgents/com.atlas.os.plist"
sed -e "s|__APP__|$APP|g" -e "s|__ROOT__|$ROOT|g" -e "s|__HOME__|$HOME|g" "$ROOT/launchd/com.atlas.os.plist" > "$PLIST"
launchctl bootstrap "gui/$(id -u)" "$PLIST"
PULSE="$HOME/Library/LaunchAgents/com.atlas.pulse.plist"
sed -e "s|__ROOT__|$ROOT|g" "$ROOT/launchd/com.atlas.pulse.plist" > "$PULSE"
launchctl bootstrap "gui/$(id -u)" "$PULSE"
echo "Atlas OS is running at http://localhost:4242, starts at login, and the 6:30 pulse is scheduled."
