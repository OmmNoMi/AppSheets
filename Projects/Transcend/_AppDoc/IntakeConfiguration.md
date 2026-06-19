# Transcend — Intake Workflow AppSheet Configuration

This guide details exactly how to configure the AppSheet interface and logic to achieve the "One-Click Process" workflow for the assistant.

## 1. AppSheet Automation (Email Notification)
This bot fires exactly when the form arrives, alerting the team.

**Bot Settings:**
- **Event**: `New Intake Submitted`
  - Event Type: `Data Change`
  - Table: `FormIntake`
  - Condition: `Adds Only`
- **Process**: `Send Intake Alert`
  - Step Type: `Send an Email`
  - To: David's Email, Assistant's Email
  - Subject: `New Client Intake Received: <<[First Name]>> <<[Last Name]>>`
  - Email Body: Format a simple alert containing the client's name and a link to the AppSheet dashboard.

## 2. The Dashboard UI Views
We need Slices and Views to power the clean UI for the assistant.

**Slices:**
1. **`FormIntake_New`**
   - Source Table: `FormIntake`
   - Filter Condition: `[ProcessedStatus] = "New"`
2. **`Client_Active`**
   - Source Table: `Client`
   - Filter Condition: `[Status] <> "Archived"`

**Views:**
1. **`New Intakes Queue` (Deck View)**
   - Data: `FormIntake_New`
   - Primary header: `[First Name]`
   - Secondary header: `[Timestamp]`
   - Display icon: 🔔
2. **`Transcend_Dash` (Dashboard View)**
   - Add the `New Intakes Queue` view to the top.
   - Below it, add the `Client_Active` view.
   - *Pro Tip*: Use a Chart View grouping `FormIntake_New` by `ProcessedStatus` to act as the massive KPI counter ("X Action Required") at the top of the dash.

## 3. The `[⚙️ Process Intake]` Master Action
This is the single button the assistant clicks on the FormIntake record.

**Create the child actions first (Data: Add a new row to another table using values from this row):**
1. `Add_Client`: Target Table `Client`. Map demographic columns from FormIntake.
2. `Add_Insurance`: Target Table `Insurance`. Map insurance fields.
3. `Add_Payment`: Target Table `Payment`. Map CC data.
   - *PCI Note*: For the `CardNumber` column, map: `RIGHT([Card Number], 4)`
4. `Add_Medication_1`: Target Table `Medication`. Condition: `ISNOTBLANK([Medication Name])`.
5. `Add_Medication_2`: Target Table `Medication`. Condition: `ISNOTBLANK([Medication Name_65])`.
6. `Add_Medication_3`: Target Table `Medication`. Condition: `ISNOTBLANK([Medication Name_72])`.
7. `Trigger_GenerateDocs_Webhook`: External Call webhook to your App Script URL.
   - Body: `{"action": "generateDocs", "secret": "YOUR_SECRET", "data": {"ClientID": "<<[ClientID]>>", "FolderID": "<<[FolderID]>>", "paramObj": {...}}}`
8. `Update_Intake_Processed`: Target Table `FormIntake` (Set the values of some columns).
   - Set `[ProcessedStatus]` to `"Processed"`.

**Create the Master Grouped Action:**
- **Action Name**: `⚙️ Process Intake`
- **Table**: `FormIntake`
- **Type**: `Grouped: execute a sequence of actions`
- **Actions in sequence**:
  `Add_Client` -> `Add_Insurance` -> `Add_Payment` -> `Add_Medication_1` -> `Add_Medication_2` -> `Add_Medication_3` -> `Trigger_GenerateDocs_Webhook` -> `Update_Intake_Processed`.
- **Display**: Display Prominently.

Once this is configured, the assistant just clicks this one button and the whole pipeline executes seamlessly!
