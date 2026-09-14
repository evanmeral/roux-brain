-- Atlas OS launcher. Runs the local server as an app so macOS can ask Evan, once, for access to
-- the Desktop folder (the vault lives there). launchd keeps it alive; this applet just hosts node.
do shell script "cd '__ROOT__' && exec '__NODE__' server.js >> logs/server.log 2>> logs/server.err.log"
