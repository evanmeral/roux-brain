-- Atlas OS launcher. Hosts the local server as an app so macOS can ask Evan, once, for access to
-- the Desktop folder (the vault lives there). launchd opens it through LaunchServices and keeps
-- it alive. Any failure is written to logs/launcher.log, then it waits a minute so launchd
-- does not spin.
on run
  set root to "__ROOT__"
  set logFile to quoted form of (root & "/logs/launcher.log")
  try
    do shell script "cd " & quoted form of root & " && exec '__NODE__' server.js >> logs/server.log 2>> logs/server.err.log"
  on error errMsg number errNum
    try
      do shell script "echo \"$(date '+%Y-%m-%d %H:%M:%S') server failed (" & errNum & "): " & errMsg & "\" >> " & logFile & "; sleep 300"
    end try
  end try
end run
