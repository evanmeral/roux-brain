#!/bin/bash
# Stops the server and removes the login items (and the old app-bundle launcher if present).
launchctl bootout "gui/$(id -u)/com.roux.os" 2>/dev/null || true
launchctl bootout "gui/$(id -u)/com.roux.pulse" 2>/dev/null || true
# legacy: before 2026-09-21 this was "Atlas OS" (labels com.atlas.*, launcher "Atlas OS.app"). Clear those too,
# so an old job can never run next to the new one and fight over port 4242. Harmless if absent.
launchctl bootout "gui/$(id -u)/com.atlas.os" 2>/dev/null || true
launchctl bootout "gui/$(id -u)/com.atlas.pulse" 2>/dev/null || true
pkill -f "Atlas OS.app/Contents/MacOS/applet" 2>/dev/null || true
for f in com.roux.os.plist com.roux.pulse.plist com.roux.os.plist.disabled com.atlas.os.plist com.atlas.pulse.plist com.atlas.os.plist.disabled; do
  [ -f "$HOME/Library/LaunchAgents/$f" ] && mv "$HOME/Library/LaunchAgents/$f" "$HOME/.Trash/$f" 2>/dev/null && echo "removed $f"
done
[ -d "$HOME/Applications/Atlas OS.app" ] && mv "$HOME/Applications/Atlas OS.app" "$HOME/.Trash/Atlas OS.app" 2>/dev/null && echo "moved the old app launcher to the Trash"
echo "ROUX OS stopped and removed from login."
