-- Atlas OS launcher. Hosts the local server as an app so macOS can grant it, once, access to the
-- Desktop folder (the vault lives there).
--
-- It never loops. On launch it checks whether it can read the vault. If it cannot, it shows ONE
-- dialog with a button that opens the right System Settings pane, removes the "granted" marker so
-- launchd does not relaunch it, and exits. If it can, it writes the marker and runs the server.
-- The marker lives outside the Desktop so it can always be written.
on run
  set root to "__ROOT__"
  set markerDir to (POSIX path of (path to home folder)) & "Library/Application Support/AtlasOS"
  set marker to markerDir & "/granted"
  try
    do shell script "ls " & quoted form of root & " > /dev/null"
  on error
    try
      do shell script "rm -f " & quoted form of marker
    end try
    try
      set r to display dialog "Atlas OS needs permission to read your Desktop folder, where the Atlas AI Brain vault lives." & return & return & "Click Open Settings, find Atlas OS under Files and Folders, turn on Desktop Folder, then open Atlas OS again from ~/Applications." with title "Atlas OS" buttons {"Later", "Open Settings"} default button "Open Settings" giving up after 60
      if button returned of r is "Open Settings" then do shell script "open 'x-apple.systempreferences:com.apple.preference.security?Privacy_FilesAndFolders'"
    end try
    return
  end try
  do shell script "mkdir -p " & quoted form of markerDir & " && touch " & quoted form of marker
  try
    do shell script "cd " & quoted form of root & " && exec '__NODE__' server.js >> logs/server.log 2>> logs/server.err.log"
  on error errMsg number errNum
    try
      do shell script "echo \"$(date '+%Y-%m-%d %H:%M:%S') server exited (" & errNum & "): " & errMsg & "\" >> " & quoted form of (root & "/logs/launcher.log")
    end try
  end try
end run
