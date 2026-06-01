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
| File Path | `CONCATENATE("OmmNoMi_Reports/", [Department], "/", [ID], "_", TEXT(UTCNOW(), "YYYYMMDD_HHMM"))` |

---

## Standard Bot: External Webhook (AppTrigger)
**Purpose**: Push critical business event data to external service

| Setting | Value |
|---------|-------|
| Event | `ADDS_AND_UPDATES` |
| Condition | `[Status] = "Approved"` |
| Action | Call webhook URL |
| Tracking | Log trigger event in AppTrigger table with Status |

AppTrigger record: set Status = "Sent" on success, "Failed" on error.

---

## Automation Rules
- All file paths use the standard pattern: `OmmNoMi_Reports/[Department]/[ID]_[Timestamp]`
- All multi-step automations must have their state tracked in AppTrigger table
- Scheduled bots run at 12:00 AM UTC (consistent across timezones)
- Never trigger on `ADDS_AND_UPDATES` for notification bots — always `ADDS_ONLY`
