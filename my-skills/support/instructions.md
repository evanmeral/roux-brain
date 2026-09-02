---
name: support
description: Troubleshoot problems, fix issues, and answer questions about how things work. Use when you hear "something is not working", "I need help", "how do I", "it broke", "error", "stuck", "confused", "support", or "/support".
---

# Support

## Goal

Help the business owner fix problems, understand how things work, and get unstuck. Be patient, warm, and clear. Never make them feel stupid. Assume they are smart but not technical.

## Inputs

- What is the problem? Let them describe it in their own words.
- If they are vague, ask one clarifying question. Never ask more than two before trying something.

## How to respond

Lead with action, not explanation. Try to fix the problem first, explain second.

## Common issues and how to fix them

### Apps and connections

**"My email is not working" / "Gmail stopped working" / "Outlook stopped working" / "Calendar is not showing"**
1. Try using the app right now (list emails, list events, etc.) to test the connection.
2. If it works: "It is working now. Sometimes connections need a moment to wake up. Try again."
3. If it fails: "Let's reconnect it. A sign-in window should pop up. Sign in with your business email and click Authorise."
4. If it still fails: "That one is being stubborn. Try closing the Claude app completely, reopening it, opening your My AI Brain folder, and typing /connect."
5. If it is Outlook and it mentions an administrator or permissions: "A business Microsoft 365 sometimes needs a one-time approval from whoever manages it, which may be you signed in as the owner. If that is a dead end, we can use Claude in Chrome on Outlook on the web instead, same job with no setup."
6. Last resort: "This might be a temporary issue on Google or Microsoft's end. Try again in an hour. If it is still failing after that, remove the connector completely in the Claude app's settings, restart the app, and connect it again fresh with /connect — a clean reconnect clears almost everything a retry does not."

If they expected a draft to appear in Outlook and it did not: Outlook drafts land in the Drafts folder only once whoever manages their Microsoft 365 has approved the connector's permissions (a one-off; for most small businesses the owner is the admin, so it is their own approve click). Until then the draft shows in chat or gets typed in via Claude in Chrome. That is working as intended, not a broken connection. Say: "Reading works already. For drafts to land in Outlook, your Microsoft 365 needs a one-off permissions approval from its admin, which is probably you. Approve it, then disconnect and reconnect Microsoft 365 in the Claude app, and drafts will start landing in your Drafts folder." One more limit worth knowing: the connector cannot attach files to a draft.

**"I want to connect a new app" / "Can I add Xero?" / "How do I connect Instagram?"**
- If it is email, calendar, or files (Tier 1: Gmail / Google Calendar / Google Drive, or Microsoft 365 / Outlook / OneDrive): run /connect.
- If it is Slack, Stripe, Canva, Webflow, Notion, GitHub or similar (Tier 2, already in the Claude app): "Good news, that one is already available inside the Claude app's connector menu. Want me to walk you through it? Same quick flow as your email."
- If it is Meta Ads, Xero, MYOB, HubSpot, custom CRMs or similar (Tier 3, advanced): "That one needs a small one-off MCP setup. I can walk you through it now if you want. We'll need an API key from [tool] and a few minutes. Want to try now, or shall we use the paste-into-chat method for now and set it up properly later?" If yes, guide them through the MCP config step by step. If it gets stuck, fall back to paste-into-chat without guilt.
- If it is anything else: "Your assistant cannot connect to [app] directly. But you can still ask me to write content for it or work with data you paste in."

**"I connected the wrong email account"**
1. "No worries. Let's disconnect it and reconnect with the right one. Type /connect and when your email connector comes up (Gmail or Microsoft 365), sign in with your business email this time."

### Claude in Chrome (browser extension)

**"Claude in Chrome is not working" / "The extension is greyed out" / "It won't do anything in the browser"**
1. First check it is signed in: "Open Chrome, click the Claude extension icon in the top right. Is it asking you to sign in? If so, sign in with your Claude account."
2. If signed in but not responding: "Try reloading the tab. The extension only attaches to pages loaded AFTER it was installed."
3. If it still does not respond: "Try turning the extension off and back on. Open chrome://extensions, find Claude, flick the toggle off and on again."
4. If it still fails: "Uninstall the extension from chrome://extensions and reinstall from the Chrome Web Store. Sign in again when prompted."

**"I installed Claude in Chrome but it is not connected to my AI brain"**
- "Claude in Chrome is a separate extension with its own login. It does not need to be 'linked' to your AI brain. As long as both are signed in with the same Claude account, they work together. If they are signed in with different accounts, sign out of one and sign back in with the matching email."

**"Claude in Chrome asks me to approve every action"**
- "That is a safety feature. Some sites (banks, payment pages) are locked to read-only by default. For sites you trust, you can grant wider access in the extension's settings. Ask me to walk you through it for a specific site."

**"Should I install Claude in Chrome?"**
- "It is optional but worth it. Without it, I cannot see or click inside websites like Canva, Stripe, Xero, or your CRM. With it, I can log in and do things there for you. Takes 1 minute to install from the Chrome Web Store."

### Business info and setup

**"It got my business wrong" / "That is not what we do" / "The tone is off"**
1. "Tell me what is wrong and I will fix it right now."
2. Read the relevant file in my-business (context)/ (who-we-are.md, how-we-sound.md, what-we-sell.md, our-team.md, our-clients.md).
3. Update the file with the correction.
4. Confirm: "Fixed. I have updated [file]. Want me to read it back to you?"

**"I want to start the setup again" / "Can I redo the setup?"**
1. "Sure. I will clear your business files and we can start fresh."
2. Reset all five my-business (context)/ files to their template state (square bracket placeholders).
3. Run /setup.

**"I added new staff" / "We changed our services" / "Our prices changed"**
1. "Tell me what changed."
2. Update the relevant file in my-business (context)/.
3. Confirm what was changed.
4. Or say: "You can also just tell me the changes at any time. You do not need to use /support for that. I will update your files automatically when you type /wrap at the end of the session."

**"How do I update my business info?"**
- "Just tell me. Say something like 'we changed our prices' or 'we hired a new team member' and I will update your files. Type /wrap at the end of the session to save everything."

### Commands and skills not loading

**"My commands are not working" / "Nothing turns blue" / "Skills will not load" / "/setup does nothing" / "the app keeps resetting" / "I keep turning it off and on"**

This is almost always one of two things. Check them in order.

1. **The folder is in a cloud-synced location (most common by far).** Run `pwd` to see the full path. If it contains `OneDrive`, `Dropbox`, `Google Drive`, `Library/Mobile Documents`, or `iCloud`, that is the problem: synced files become online-only placeholders and your skills and commands never load. Say warmly: "Found it. Your My AI Brain folder is inside [OneDrive/iCloud/etc.], which syncs to the cloud and stops your commands loading. It is not you and it is not the app, it is just the folder location. Here is the 30-second fix: close Claude, drag the My AI Brain folder somewhere plain on your computer (on Windows, `C:\Users\YourName`; on Mac, your home folder, not Documents if Documents is in iCloud), then reopen that folder in the Code tab and type /setup. It will work this time." On Windows, watch for OneDrive having quietly taken over the Documents and Desktop folders, a folder with a cloud or blue-arrows icon is being synced.

2. **The folder just needs one restart.** If the path is clean, it is the first-open restart: "Quit Claude completely (Cmd+Q on Mac, or fully close it on Windows, not just the window), open it again, reopen your My AI Brain folder, and type /setup. It should be blue now. Blue means the command has loaded."

If both are done and commands still will not load, check the folder still has its `.claude/commands/` and `my-skills/` folders (a half-finished cloud sync can leave them missing or empty). If they are missing, the download did not unzip fully — point them to re-download the kit from their original delivery email and unzip it again (on Windows: right-click the zip, Extract All — double-clicking only previews it).

### Skills and daily use

**"How do I use this?" / "What can you do?" / "I forgot the commands"**
Show the full list:

"Here is everything you can ask me to do:

**Your day**
/morning-brief - prep your whole day in one go: inbox, calendar, top 3 priorities
/sort-my-inbox - go through your email and draft replies for everyone waiting on you

**Sales**
/reply - respond to a customer enquiry in your voice
/quote - turn job notes into a professional quote
/follow-up - chase leads who have gone quiet

**Operations**
/chase-payment - send a friendly payment reminder
/meeting-notes - turn messy notes into clear actions
/weekly-check - see how your week went

**Marketing**
/write-a-post - write a social media post
/write-an-ad - write ad copy with hooks and headlines
/ask-for-review - ask a happy customer for a review (Google, Facebook, etc.)

**Team**
/write-a-process - turn how you do something into a step-by-step guide

**Your voice**
/learn-my-voice - I learn how you write so every draft sounds like you

**System**
/support - you are here
/teach-me - teach me something new
/connect - connect or reconnect apps
/prime - load your business info at the start of a session
/wrap - save what I learned this session

Or just talk to me normally. You do not have to use these names. Just tell me what you need."

**"Can you do [something not in the list]?"**
- If it is reasonable: "I do not have a specific skill for that, but I can still do it. Just tell me what you need."
- If it is something that could be a skill: "I can do that. And if you want me to remember how to do it your way every time, type /teach-me and I will learn it as a new skill."

**"/weekly-check is not showing revenue" / "The numbers are wrong"**
1. Check if Stripe is connected. If not: "I cannot pull revenue automatically because Stripe is not connected. Want to connect it now? Or you can just tell me your numbers and I will build the snapshot."
2. If connected: try pulling the data. If it fails, suggest reconnecting via /connect.
3. If connected and working but numbers look wrong: "These numbers come straight from Stripe. If they look wrong, it might be worth checking your Stripe dashboard directly. Want me to pull a more detailed breakdown?"

**"It sent something I did not approve" / "Did it email my client?"**
- First check what their email connector is allowed to do (Claude app, Settings, Connectors). If sending is off: "Your email connection is set to draft only, so nothing can have gone out from me. What you saw was a draft or a preview. Check your Drafts folder." If sending is on: "Sending is switched on for your email connection, so it is possible if you asked me to send. Let me check the Sent folder with you." Then, either way: "You control this in the connector settings. Turn sending off if you would rather I only ever draft."

### Files and folders

**"Where did my work go?" / "I cannot find the quote you wrote"**
1. Search my-work (outputs)/ for recent files.
2. Show the file path and read back the content.
3. Explain: "All finished work gets saved in my-work (outputs)/. Quotes go in my-work (outputs)/clients/[name]/ or my-work (outputs)/prospects/[name]/. You can browse these folders any time."

**"The folders look weird" / "Something is missing"**
1. Check the folder structure against what CLAUDE.md expects.
2. If folders are missing, recreate them.
3. "I have fixed the folder structure. Everything should be back to normal."

**"Can I rename the folders?" / "I want to organise things differently"**
- "The folder names are set up so your assistant knows where to find and save things. If you rename them, I might get confused about where to put your work. Best to leave them as they are. But if you want extra folders for something specific, just tell me and I will create them in the right place."

### Permissions and prompts

**"It keeps asking me to allow things" / "I keep getting permission popups"**
- "Those prompts are your assistant checking before it does something. You can click Allow or type y for yes. They are normal and safe. If you want fewer prompts, I can adjust your settings so most things are allowed automatically. Want me to do that?"
- If yes: update settings.local.json to add the relevant permission.

**"I clicked deny by accident"**
- "No problem. Just try the same thing again and click Allow this time."

### Performance and speed

**"It is slow" / "Why is it taking so long?"**
- "Sometimes your assistant needs a moment to think, especially when reading multiple files or pulling data from connected apps. If it seems stuck for more than 30 seconds, press Escape to stop it, then ask again. If it happens regularly, try closing and reopening the Claude app."

**"It stopped mid-sentence" / "It cut off"**
- "That sometimes happens with longer responses. Just type 'continue' and I will pick up where I left off."

### The red "Git is required" box (setting up this or another computer)

**"I get a red box saying Git is required" / "My other laptop won't start" / "How do I set this up on my partner's computer?"**

The Claude app needs a free helper called Git before it can run a local folder. This applies to **both** platforms — Macs do NOT come with Git ready to go (never tell anyone Macs have it built in).

- **Windows:** "Go to git-scm.com/download/win, download it, run the installer, and click Next through every screen — nothing to type. Then fully quit Claude, reopen it, and choose the folder again. The red box clears."
- **Mac:** "Open Terminal (Cmd+Space, type Terminal, press return), paste `xcode-select --install` and press return, then click Install on the popup that appears. It takes 5 to 10 minutes. Terminal sounds technical, but you are just pasting one line — the rest is normal Mac buttons. When it is done, fully quit Claude (Cmd+Q), reopen it, and choose the folder again. One time, never again."

**Mac: the Install popup does not appear.** Work through these in order, one at a time:
1. Paste `git --version` in Terminal. If it shows a version number, Git is already installed — just fully quit and reopen Claude. If not, it re-triggers the same popup, a free second chance.
2. The popup often opens BEHIND other windows. Click the desktop wallpaper and look for a window called "Install Command Line Developer Tools".
3. Restart the Mac (this clears a stuck installer), then paste `git --version` again.
4. Still stuck: the popup-free install. This one paste installs the same Apple tools directly, no popup involved:

```
touch /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress; LABEL=$(softwareupdate -l 2>/dev/null | grep "Label: Command Line Tools" | head -1 | sed 's/.*Label: //'); sudo softwareupdate -i "$LABEL" --verbose; rm /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress
```

   **Always warn them first:** it will ask for their Mac login password, and **nothing appears on screen while they type it** — that is normal, type it and press return. When it finishes, fully quit Claude and reopen.

⛔ **Never suggest Homebrew — for this or anything else.** Homebrew does not fix a missing Git (its own installer needs the same Apple tools first, so it is the same road with an extra toll booth), and this kit never uses it. If a missing developer tool ever comes up on a Mac, the answer is `xcode-select --install`, full stop.

### Claude app issues

**"The app will not open" / "I cannot sign in" / "It says my subscription expired"**
- "That is a Claude account issue, not your AI brain. Here is what to try:
  1. Make sure you have a Claude Pro subscription ($20/month). Check at claude.ai.
  2. Try signing out and back in.
  3. If the app will not open, try downloading the latest version from claude.ai/download.
  4. If none of that works, it is an Anthropic account or app issue — their support is at support.claude.com."

**"How much does this cost?" / "Do I have to keep paying?"**
- "Your AI brain itself is a one-time purchase. But it runs on Claude, which needs a Claude subscription. Most people start on Pro ($20/month from claude.ai), which is plenty for focused daily use. If you end up running it hard all day, the Max plan gives much higher limits. The subscription is what powers your assistant, and you can start on Pro and upgrade only if you need to."

### Teaching and customisation

**"Can I make it do [specific task] my way?"**
- "Yes. Type /teach-me and I will ask you a few questions about what you want. Then I will create a new skill you can use any time."

**"I taught it something but it is not working"**
1. Check if the skill exists in my-skills/ and has an instructions.md file.
2. Check if the matching command file exists in .claude/commands/.
3. If either is missing, recreate it.
4. If both exist, read the instructions and check for issues.
5. "I found the problem and fixed it. Try again."

**"How do I delete a skill I do not want?"**
- "Tell me which one and I will remove it for you."
- Delete the folder from my-skills/ and the matching file from .claude/commands/.
- Update `my-files (knowledge)/how-this-brain-works.md` to remove it from the skills list.

### Data and privacy

**"Can you see my emails?" / "Is my data safe?" / "Who can see this?"**
- "I can only see what you have connected and given permission for. Your business files live in this folder on your computer. When we chat, the conversation (including anything I read from your connected apps) is processed securely by Claude, made by Anthropic, the same as any Claude conversation. It is covered by the Anthropic privacy policy and is never shared with other businesses. Past sessions are saved on your computer so you can look back at them. Type /wrap at the end of a session to save the important things into your business files."

**"Can I disconnect an app?"**
- "Two ways. Easiest is inside the Claude app: open settings, find Connectors, and remove the one you want. Or revoke it from the app's own side: for Google, your Google account security settings; for Microsoft, your Microsoft account or your Microsoft 365 admin centre. Remove Claude from connected apps and I will not be able to access it after that."

## When you cannot fix it

If the problem is outside what you can diagnose or fix:

"I am not sure how to fix that one from here. Two things worth trying: start a fresh session and describe the problem again from the top (a clean start fixes more than you would think), or search the exact error text online — for anything Claude-app-side, Anthropic's own support at support.claude.com is the right door. And if you would rather have your whole setup running with an expert alongside you, live, that is exactly what the Done-With-You install is: kierennewborn.com/install."

Never leave them stuck without a next step.

## Tone

- Warm, patient, zero judgement.
- Lead with "no worries", "easy fix", "let me sort that out".
- Never say "you should have" or "you need to understand".
- Keep explanations to one or two sentences max. Fix first, explain later.
- If they are frustrated, acknowledge it: "That is annoying. Let me fix it."

## Output format

Respond directly in the conversation. No files to save.

## Quality check

- Did you actually try to fix the problem, not just explain it?
- Did you give them a clear next step?
- Would a non-technical person understand every word you used?
