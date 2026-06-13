# Automation Patterns — OmmNoMi Standard

## Trigger Types Quick Reference
| Trigger | When to Use |
|---------|-------------|
| `ADDS_ONLY` | Email/notification on new record — avoids spam on edits |
| `ADDS_AND_UPDATES` | Sync or workflow update on any change |
| `Scheduled` | Nightly hygiene bots, daily digests |
| `Webhook (External)` | Push to external services on business events |

---

## Standard Bot: Overdue Hygiene Bot
**Purpose**: Nightly sweep to mark tasks/records as "Overdue"

| Setting | Value |
|---------|-------|
| Event | Scheduled |
| Schedule | Every day at 12:00 AM |
| Table | Task (or relevant operational table) |
| Row Filter | `AND([Status] = "Open", [Deadline] < TODAY())` |
| Action | Set `Status` = `"Overdue"` |

---

## Standard Bot: Notification (New Record)
**Purpose**: Notify assigned user when a new record is created for them

| Setting | Value |
|---------|-------|
| Event | `ADDS_ONLY` |
| Table | Task / AttendanceRequest / etc. |
| Row Filter | `[AssignedTo] <> ""` |
| Action | Send email/notification to `[AssignedTo].[Email]` |

> **Rule**: Always use ADDS_ONLY for notifications. ADDS_AND_UPDATES causes spam on every edit.

---

## Standard Bot: Status Change Notification
**Purpose**: Notify record creator when status changes

| Setting | Value |
|---------|-------|
| Event | `ADDS_AND_UPDATES` |
| Condition | `[Status] <> [_THISROW_BEFORE].[Status]` |
| Action | Send notification to `[CreatedBy].[Email]` |

---

## Standard Bot: PDF Report Generation
**Purpose**: Generate and attach a PDF when a record reaches a specific status

| Setting | Value |
|---------|-------|
| Event | `ADDS_AND_UPDATES` |
| Condition | `[Status] = "Completed"` |
| Action | Create a new file (PDF template) |
| File Path | `CONCATENATE("OmmNoMi_Reports/", [Department], "/", [ID], "_", TEXT(NOW(), "YYYYMMDD_HHMM"))` |

---

## Standard Bot: AppTimeline-Based Daily Automation
**Purpose**: Process work for each calendar date using the pre-seeded AppTimeline table

| Setting | Value |
|---------|-------|
| Event | Scheduled (daily) |
| Table | AppTimeline |
| Row Filter | `AND([Date] = TODAY(), ISBLANK([AppTrigger]))` |
| Action | Set `AppTrigger` = relevant AppSettings ID, `TriggerValue` = record ID, `TriggeredOn` = `NOW()` |

> AppTimeline has one row per calendar day (pre-seeded for the full year). Bots claim a date row by writing to it. A blank `AppTrigger` column means that date is unprocessed.

---

## Standard Bot: AppTriggers Queue Processing
**Purpose**: Process queued trigger rows created by user actions or other bots

| Setting | Value |
|---------|-------|
| Event | Scheduled OR `ADDS_ONLY` on AppTriggers |
| Row Filter | `[Bot] = TRUE` |
| Action | Execute logic based on `[AppTrigger].[Title]`, then delete or archive the row |

> AppTriggers is a **runtime inbox** — rows are created by actions and consumed by bots. It starts empty and is fully transient.

---

## Automation Rules
- All file paths use the standard pattern: `OmmNoMi_Reports/[Department]/[ID]_[Timestamp]`
- Multi-step automations track state via **AppTriggers** (queued inputs) and **AppTimeline** (date-based execution log)
- Scheduled bots run at 12:00 AM UTC (consistent across timezones)
- Never trigger on `ADDS_AND_UPDATES` for notification bots — always `ADDS_ONLY`
- AppTimeline rows must be seeded for the next year before December 31

---

## AppScript Document Generation & Automations
**Purpose**: Handling complex PDF/Doc generation via Google Apps Script (e.g., contracts, intake forms)

### 1. AppScript Error Handling & JSON Parsing
- **Top-Level Returns**: AppScript functions triggered by AppSheet should never `throw` unhandled exceptions back to AppSheet. They must `try...catch` and return `{ error: "Error message" }`. This allows the AppSheet bot to inspect the `error` return value and act accordingly.
- **Webhook Payloads**: AppSheet string-concatenated JSON templates can contain trailing commas or unescaped quotes. Always parse incoming webhooks using `safeParse` (eval fallback) instead of strict `JSON.parse` to prevent silent crashes before the script even runs.

### 2. Document Template Rules
- **Use Plain Text Placeholders**: Google Apps Script's `replaceText()` API **only targets plain text**. It completely ignores Google Docs "Variable Smart Chips" (the blue interactive chips). **Always use standard plain text like `{{FirstName}}` in your document templates.**
- **Orphan File Cleanup**: If document generation fails halfway through, the script must catch the error and delete the temporary copy (`newFile.setTrashed(true)`) to prevent Drive clutter.

### 3. OAuth Scopes & AppSheet Authorization
If you add new permissions to `appsscript.json` (like `https://www.googleapis.com/auth/documents`):
1. You must manually run the script once from the Google Apps Script Editor to trigger the OAuth consent screen and approve the new scopes.
2. In the AppSheet Editor, you must click the **Refresh icon** next to the linked Apps Script Project to force AppSheet to request a new token with the expanded scopes.

---

## Action Pattern: "Passing the Ref" (Upserting with Initial Values)
**Purpose**: Dramatically simplify "Create new row" automation actions while maintaining a single source of truth for column mapping.

When an automation creates a child record (e.g., creating a `Client` from a `Therapy Intake` form):
1. **Schema Level**: Add a Ref column (`FormIntake`) to the child table (`Client`).
2. **Initial Values**: In the child table, set the `Initial Value` of all relevant columns to pull from the Ref if it exists. 
   - *Example for FirstName*: `IF(ISNOTBLANK([FormIntake]), [FormIntake].[First Name], "")`
3. **Action Level**: When configuring the AppSheet Data Action ("add a new row to another table"), you **only need to map the Ref column** (`FormIntake` = `[_THISROW].[Response ID]`). AppSheet will automatically calculate all the Initial Values and hydrate the rest of the record!
4. **Bonus**: This ensures that if a human manually creates a Client and selects a FormIntake from a dropdown, the form auto-fills exactly the same way the bot does.
