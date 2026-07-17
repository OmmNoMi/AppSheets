---
name: appscript-automation
description: Write, manage, and deploy Google Apps Script code (calendar.gs, webhook.gs, etc.) directly from the command line using clasp. Use this skill when asked to create or update backend Google Apps Script automations for AppSheet projects.
---

# Google Apps Script Automation via Clasp

This skill enables direct code deployment from the terminal to Google Apps Script,
removing the need to manually copy-paste JavaScript code into the browser editor.

---

## One-Time Setup

**Prerequisite: Enable Apps Script API**
Before running any `clasp` commands, you MUST enable the Apps Script API for your Google account:
1. Go to: [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)
2. Turn the toggle to **ON**.

**Step 1: Login**
Run this command once in your terminal. A browser window will open for Google authentication.
```bash
clasp login
```

**Step 2: Link a script to a project**
Inside any project folder, run:
```bash
clasp clone <SCRIPT_ID>
```
The Script ID is found in the Apps Script editor: Extensions → Apps Script → Project Settings → Script ID.

---

## Workflow

### Create a new script project
```bash
clasp create --type sheets --title "Navi Automation"
```

### Push code to Google (deploy)
```bash
clasp push
```

### Pull latest from Google (sync)
```bash
clasp pull
```

### Open the script editor in browser
```bash
clasp open
```

---

## Script Library

All reusable Apps Script templates are stored in:
`.agents/skills/appsheet-patterns/references/Automations/AppScriptLibrary/`

Available scripts:
- `code.gs` — Main entry points
- `calendar.gs` — Google Calendar integration
- `webhook.gs` — AppSheet webhook handler
- `docs.gs` — Google Docs generation
- `folders.gs` — Google Drive folder management
- `move.gs` — File movement utilities
- `utils.gs` — Shared helper functions

---

## Per-Project `.clasp.json`

Each project that uses Apps Script should have a `.clasp.json` in its root folder. Example:
```json
{
  "scriptId": "YOUR_SCRIPT_ID_HERE",
  "rootDir": "scripts"
}
```

---

## Rules

1. **NEVER** manually edit code in the browser Apps Script editor. Always edit locally and `clasp push`.
2. Each AppSheet project's script folder should mirror the library structure above.
3. Before pushing to production, always run `clasp push --watch` in dev first.
