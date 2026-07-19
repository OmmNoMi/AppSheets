---
name: appsheet-debugging-guide
description: Custom guidelines for testing, debugging, and auditing AppSheet applications using client sync logs, Google Sheets cell history, and formula troubleshooting.
---

# AppSheet Debugging and Audit Protocol

This guide outlines standard practices for debugging AppSheet synchronization latencies, timezone conflicts, and verifying data operations using client logs and spreadsheet histories.

---

## 1. AppSheet Sync Diagnostics (Client vs. Server)

When an app behavior or reminder triggers incorrectly, check the device sync state using the AppSheet Audit Logs:
1. **`tzOffset` (Timezone Offset):** Measured in minutes (e.g., `-180` for EEST/UTC+3, `-240` for GST/UTC+4). Used to verify the local timezone of the reporting user.
2. **`isBackgroundSync` & `initiatedBy`:**
   * `isBackgroundSync: True` and `initiatedBy: Polling` indicate background sync queue delays. Edits remain on the device locally until polling triggers.
   * `initiatedBy: User` indicates an active manual sync.
3. **`lastSyncTime` & `perTableParams`:** Compare the `lastSyncTime` of the table against the user's action timestamp to calculate the exact synchronization delay (Systemic Lag).

---

## 2. Google Sheets Audit & Cell History Analysis

Spreadsheets are the source of truth. Analyze cell-level histories to resolve database discrepancies:
1. **Google Sheets Timestamp Locale:** The edit history timestamp displays in the local timezone of the *viewing browser* (e.g., IST/UTC+5.5).
2. **AppSheet Database Format:** AppSheet writes date/time values to the spreadsheet in **UTC**. Convert these values to local time to verify if actions occurred on time.
3. **Edit Timing Comparison:**
   $$\text{Sync Delay} = \text{Google Sheets Write Time (UTC)} - \text{User Local Clock-In Time (UTC)}$$
   * If sync delay is positive and exceeds the bot grace period, the scheduled bot will evaluate a blank server-side cell, causing false reminders.

---

## 3. Date & Time Offset Vulnerabilities

1. **`TODAY()` UTC Evaluation:** AppSheet scheduled automation runs on servers operating in UTC.
   * Between **12:00 AM and 04:00 AM** local time (e.g. GST), the UTC date is the **previous day**.
   * Any bot comparing `[Date] = TODAY()` during this period will fail to match the local day's records.
2. **Lookup Key Consistency:** 
   * Construct table keys using `TEXT([Date], "DD/MM/YYYY")` instead of raw date values.
   * Ensure that comparison lookup keys in virtual columns use the same string formatting to avoid month/day transposition errors in different locales.

---

## 4. Troubleshooting Workflow

1. **Locate Trigger Formulas:** Verify virtual column expressions (e.g., `Employee.AttendanceToday` pointing to `TODAY()+1` instead of `TODAY()`).
2. **Compare Local vs. Server States:**
   * Is the data visible in the spreadsheet? If yes, check the cell edit history timestamp.
   * Compare the spreadsheet write timestamp against the bot execution log to see if the write happened after the bot evaluated the condition.
3. **Verify Action Sync Modes:**
   * Check if action buttons use background syncing.
   * If instant database writes are required, force foreground sync (`Sync Now` action link) on button clicks.
