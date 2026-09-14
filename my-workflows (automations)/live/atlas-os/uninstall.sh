#!/bin/bash
# Stops the server and removes the login items, the grant marker and the app bundle. The code folder stays.
launchctl bootout "gui/$(id -u)/com.atlas.os" 2>/dev/null || true
launchctl bootout "gui/$(id -u)/com.atlas.pulse" 2>/dev/null || true
pkill -f "Atlas OS.app/Contents/MacOS/applet" 2>/dev/null || true
for f in com.atlas.os.plist com.atlas.pulse.plist com.atlas.os.plist.disabled; do
  [ -f "$HOME/Library/LaunchAgents/$f" ] && mv "$HOME/Library/LaunchAgents/$f" "$HOME/.Trash/$f" 2>/dev/null && echo "removed $f"
done
[ -f "$HOME/Library/Application Support/AtlasOS/granted" ] && mv "$HOME/Library/Application Support/AtlasOS/granted" "$HOME/.Trash/atlasos-granted" 2>/dev/null
APP="$HOME/Applications/Atlas OS.app"
[ -d "$APP" ] && mv "$APP" "$HOME/.Trash/Atlas OS.app" 2>/dev/null && echo "moved the app bundle to the Trash"
echo "Atlas OS stopped and removed from login."
