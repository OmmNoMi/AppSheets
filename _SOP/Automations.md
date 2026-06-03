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
