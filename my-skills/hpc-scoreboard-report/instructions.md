---
name: hpc-scoreboard-report
description: Generate High Performance Cookers' CAC/ROAS marketing scoreboard report from Meta Ads and Google Ads CSV exports. Use this skill whenever Evan asks to "run the scoreboard report," "build the CAC/ROAS report," "do the marketing scoreboard," or uploads Meta Ads and Google Ads export CSVs together for performance analysis. This produces a Jay-ready Word document comparing customer acquisition cost (CAC) and return on ad spend (ROAS) by channel.
---

> Supersedes the plugin copy `anthropic-skills:hpc-scoreboard-report`, migrated 2026-09-16; Evan can remove the plugin one from the Claude skills settings.

# HPC Marketing Scoreboard Report

Generates High Performance Cookers' recurring CAC/ROAS-by-channel report, comparing Meta Ads and Google Ads performance, formatted as a polished Word document ready to hand off to Jay (the owner).

## When to use this skill

Trigger this whenever Evan:
- Says "run the scoreboard report," "do the CAC/ROAS report," or similar
- Uploads two ad platform CSV exports (one from Meta Ads Manager, one from Google Ads) without further explanation — these almost always mean he wants this report
- Asks to compare Meta vs. Google performance, or asks "what's working and what's not" across channels

## Step-by-step workflow

### 1. Get the two CSV exports
If Evan hasn't already uploaded them, ask for:
- **Meta Ads Manager export** (CSV)
- **Google Ads export** (CSV)
- **Meta spend may now be read from the official Meta connector instead of a CSV** (live 2026-09-11, read-only, no writes; `my-connections (MCP)/connected-apps.md`). **Google is still CSV export only**, no connector.

Also ask what date range the report should cover, if not obvious from the file names/data (e.g. "last 30 days," "this month," "Q3").

### 2. Inspect the CSVs before calculating anything
Column names and structures vary export to export. Before computing anything:
- Read both CSVs (for a large or messy file, the `anthropic-skills:xlsx` skill's guidance applies)
- Identify which columns map to: **spend**, **conversions/purchases**, **revenue** (if present), **clicks**, **impressions**
- If revenue isn't in the export, ROAS can't be calculated directly — flag this to Evan rather than guessing or estimating a revenue figure
- If conversions aren't clearly labeled (e.g. "Purchases" vs "Results" vs "Conversions"), ask Evan to confirm which column represents actual purchases before proceeding — don't assume

### 3. Calculate metrics per channel
For each channel (Meta, Google), compute:
- **Total spend**
- **Total conversions (purchases)**
- **CAC = total spend ÷ total conversions**
- **Total revenue** (if available)
- **ROAS = total revenue ÷ total spend**

Also compute a **blended CAC and ROAS** across both channels combined.

Reference point: the CAC ceilings live in `my-work (outputs)/internal/reports/2026-09-10-cac-ceilings-v3.md` (v3 + overhead method, 2026-09-10) — read them from there, never from a figure hardcoded here. Rules that bind this report:
- **Ceilings are per product, never blended** (`my-business (context)/hpc-standing-rules.md`, Reporting). Flag each product line against its own ceiling.
- **Say which CAC you mean** — break-even, ceiling, or actual (`hpc-standing-rules.md`, Reporting; `SAFETY.md`, Numbers).
- **Use the real margin (~40.6%), never the booked 46% or the 44.5% August figure** (board, 2026-09-16).
- **Never present Shopify net ÷ Meta spend as ROAS** (board, 2026-09-16, Landmines).

### 4. Write the report
Structure as a clean, scannable document:
- **Header**: "HPC Marketing Scoreboard" + date range covered
- **Executive summary** (2-3 sentences): which channel is performing better, and by how much, in plain language Jay can skim
- **Metrics table**: Channel | Spend | Conversions | CAC | Revenue | ROAS — one row per channel, one row for blended total
- **CAC ceiling check**: per product, against the ceilings in `2026-09-10-cac-ceilings-v3.md` (v3, 2026-09-10) — say which CAC is being compared (break-even, ceiling, or actual)
- **Notable trends or flags**: anything that stands out (e.g. one channel's CAC creeping up, a campaign driving outsized results) — only include what the data actually supports, don't speculate
- Keep language direct and unembellished — this is an internal ops report for Jay, not marketing copy. No hedging language like "up to" or "as little as" here — those are for external-facing claims, not internal performance reporting.

### 5. Generate the Word document
Use the `anthropic-skills:docx` skill (load it with the Skill tool) to build the actual .docx file with proper tables and formatting. Read that skill's guidance before generating the file.

### 6. Deliver and hand off
- Save to `my-work (outputs)/internal/reports/`, date-prefixed like the other files there (CLAUDE.md: performance reports and raw exports live in that folder; raw CSVs go in its `raw/` subfolder). *(Path corrected on migration, 2026-09-16 — the plugin copy pointed at a claude.ai sandbox path that does not exist on this Mac.)*
- Send the file to Evan in the conversation (SendUserFile) and state the saved path
- Tell Evan the file is ready to download and upload to Google Drive (which will auto-convert it to a Google Doc) for sharing with Jay — this skill cannot push directly into Google Drive on Evan's behalf

## Important constraints

- **Never fabricate revenue or conversion figures.** If a CSV is missing data needed for ROAS or CAC, say so explicitly rather than estimating.
- **Don't reproduce raw CSV rows in the report** — this is a summary/analysis document, not a data dump.
- This skill produces a downloadable Word file only. It does not and cannot create or edit a Google Doc directly — Drive write access is not reliably available.
