#!/bin/bash
# Installs Atlas OS as a login item. Builds a tiny app bundle (~/Applications/Atlas OS.app) that
# hosts the node server, so macOS can grant it Desktop access the normal way, and registers it
# with launchd so it starts at login and restarts if it dies. Safe to re-run.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
NODE="$(command -v node)"
[ -n "$NODE" ] || { echo "node not found on PATH"; exit 1; }
APP="$HOME/Applications/Atlas OS.app"
mkdir -p "$ROOT/logs" "$HOME/Library/LaunchAgents" "$HOME/Applications"

# 1. the app bundle
TMP="$(mktemp -d)"
sed -e "s|__NODE__|$NODE|g" -e "s|__ROOT__|$ROOT|g" "$ROOT/launchd/AtlasOS.applescript" > "$TMP/AtlasOS.applescript"
launchctl bootout "gui/$(id -u)/com.atlas.os" 2>/dev/null || true
osacompile -o "$APP" "$TMP/AtlasOS.applescript"
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.atlas.os" "$APP/Contents/Info.plist" 2>/dev/null || /usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string com.atlas.os" "$APP/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Add :LSUIElement bool true" "$APP/Contents/Info.plist" 2>/dev/null || /usr/libexec/PlistBuddy -c "Set :LSUIElement true" "$APP/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleName Atlas OS" "$APP/Contents/Info.plist" 2>/dev/null || true

# 2. the launchd agent
PLIST="$HOME/Library/LaunchAgents/com.atlas.os.plist"
sed -e "s|__APP__|$APP|g" -e "s|__ROOT__|$ROOT|g" "$ROOT/launchd/com.atlas.os.plist" > "$PLIST"
launchctl bootstrap "gui/$(id -u)" "$PLIST"
sleep 2
launchctl print "gui/$(id -u)/com.atlas.os" | grep -E "state|pid|last exit" | head -3
if curl -s -m 3 http://localhost:4242/health >/dev/null; then
  echo "Atlas OS is running. Open http://localhost:4242"
else
  echo "Atlas OS is registered but not answering yet. If macOS asked whether 'Atlas OS' may access your Desktop folder, click Allow; it retries on its own."
fi
