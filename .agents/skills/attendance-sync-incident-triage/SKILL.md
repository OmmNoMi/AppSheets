---
name: attendance-sync-incident-triage
description: Standard operating procedure and template for diagnosing, auditing, and generating client-ready responses for AppSheet attendance notification mismatches, sync delays, and timezone/timing anomalies (e.g., Orbit HRMS, BLR World).
---

# AppSheet Attendance Sync & Notification Incident Triage SOP

This skill defines the standardized protocol for investigating and responding to attendance notification incidents (e.g., false missing check-in reminders, premature/early notifications, sync lag discrepancies).

---

## 1. Core Problem Patterns

### Pattern A: Client Sync Lag (False "Missing Check-in" Reminder)
* **Symptom:** Employee checked in on time on their phone, but received an automated "Missing Check-in" reminder email (e.g., at 9:30 AM).
* **Root Cause:**
  1. User performed check-in locally on the mobile app.
  2. Mobile client saved the record to local cache (IndexedDB / SQLite).
  3. App closed or network polling delayed background sync.
  4. Scheduled AppSheet cloud bot evaluated cloud table (Google Sheets) while `[Check_In]` was still blank on the server.
  5. Sync completed later, updating the cloud record to "Present".

### Pattern B: Timezone / Schedule Offset (Early Clock-in Reminder)
* **Symptom:** Employee received clock-in notification several hours earlier than their planned shift start (e.g., Haya receiving alerts early).
* **Root Cause:**
  1. **Server Timezone (UTC) vs. Local Jurisdiction Timezone:** AppSheet server runs in UTC or app default timezone (e.g., GST UTC+4, Lebanon UTC+3, London UTC+1).
  2. **Bot Trigger Schedule:** Bot scheduled at a static UTC/GST time triggering before the employee's shift begins in their regional branch.
  3. **Shift Reference Mismatch:** `Office_Shift` start time or employee's assigned shift was misaligned with the scheduled bot trigger window.

---

## 2. Standard 4-Part Analysis Structure

Whenever an attendance notification issue or client forward is received, always format the response using the following 4 sections:

### Section 1: Executive Summary
* **Employee Name & ID:** (e.g., Rania Moussa `e635fbb9`, Haya)
* **Incident Date & Time of Notification:**
* **Actual Recorded Status:** (e.g., Present, Actual Check In / Out timestamps from screenshot)
* **Impact:** State whether manual regularization or payroll correction is needed (usually: **No penalty / No action needed**).

### Section 2: Root Cause Analysis & Flow Diagram
Include the clear ASCII timeline diagram demonstrating client vs. server states:

```
[Local Time] Employee Action / Local State
     │   → Stored in device queue (IndexedDB/Offline Cache)
     │   → Sync status (delayed by app closure / background polling)
     ▼
[Server Time] AppSheet Bot Evaluation (Cloud Server)
     │   → Database state evaluated by scheduled cloud process
     │   → Automated reminder dispatched
     ▼
[Sync Time] Device Background Sync / Master Database Commit
     │   → Local data committed to master Google Sheets
     │   → Master database & UI reflect correct status
```

### Section 3: Immediate Action & Client-Ready Draft Reply
Provide a polite, professional draft email that Nomeshwer / Hardik can directly copy-paste to the client HR (e.g. Rizalyn / Rania / Angelique).

**Key Draft Points:**
1. Confirm that attendance records in the database are fully intact and accurate.
2. Clearly explain the technical cause in non-alarmist, accessible terms.
3. Reassure that payroll and monthly reports will not be penalized.
4. Provide a simple user tip (e.g., tapping the manual "Sync" button after clock-in).

### Section 4: Technical AppSheet Recommendations
Provide architectural fixes for the development team:
1. **Immediate Foreground Sync on Action:** Attach a forced sync or `LINKTOVIEW()` flow on the Check-in button to trigger instant upload.
2. **Dynamic Bot Timing / Multi-Timezone Grace Period:** Adjust bot trigger conditions to evaluate relative to the employee's local jurisdiction shift start time rather than a fixed global server timestamp.
3. **Pre-Notification Cloud Query:** Add a secondary validation check in the bot before dispatching email tasks.

---

## 3. Template Response for Follow-ups & Inquiries

### Template: Employee False Missing Check-In
```text
Hi [Employee Name],

Thank you for reaching out and sharing the screenshot.

We have reviewed the system records for [Date]. Your attendance is correctly recorded as [Status] with your Check-In at [Check-In Time] and Check-Out at [Check-Out Time].

The reminder email at [Reminder Time] was triggered automatically due to a brief background synchronization delay between your mobile app and the cloud server. When the automated bot ran, the local check-in record was still queued on the device and had not yet reached the server.

No action is required from your side—your attendance record is complete and accurate. For future reference, tapping the Sync button in the app right after check-in ensures immediate update to the cloud.

Best regards,
Nomeshwer Sharma
OmmNoMi Automation LLP
```

### Template: HR Follow-up Regarding Early Notification Timing
```text
Hello [HR Name],

Thank you for following up.

We have investigated the clock-in notification schedule for [Employee Name]. The early notifications are caused by [Server Timezone / Shift schedule alignment]. 

Status Update:
1. Attendance Integrity: [Employee Name]'s attendance records are unaffected and logging accurately.
2. System Adjustment: We are adjusting the scheduled notification trigger to align with [Employee Name]'s specific shift start time and regional timezone to ensure alerts only dispatch at the correct local time window.

We will have this schedule adjustment finalized and deployed today.

Kind regards,
Nomeshwer Sharma / Hardik
OmmNoMi Automation LLP
```
