#!/bin/bash
# Stops the server and removes the login item and the app bundle. The code folder stays.
launchctl bootout "gui/$(id -u)/com.atlas.os" 2>/dev/null || true
PLIST="$HOME/Library/LaunchAgents/com.atlas.os.plist"
[ -f "$PLIST" ] && mv "$PLIST" "$PLIST.removed" && echo "moved $PLIST aside"
APP="$HOME/Applications/Atlas OS.app"
[ -d "$APP" ] && mv "$APP" "$HOME/.Trash/Atlas OS.app" 2>/dev/null && echo "moved the app bundle to the Trash"
echo "Atlas OS stopped and removed from login."
