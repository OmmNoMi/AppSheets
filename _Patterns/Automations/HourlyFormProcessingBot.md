# AU-004: Hourly App Script Bot for Google Form Auto-Processing
> Pattern from: Transcend_IntakeSystem | Status: Design-verified

## Problem
Admin is not always available to manually trigger intake processing. New form submissions need to be processed automatically — creating structured records without human intervention.

## Solution
App Script time-based trigger runs every hour, checking for unprocessed form rows.

**App Script**:
```javascript
function processNewIntakes() {
  const settings = getAppSettings(); // reads AppSetting sheet
  if (settings['BotProcessingEnabled'] !== 'TRUE') return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = ss.getSheetByName('Form Responses 1');
  const clientSheet = ss.getSheetByName('Client');
  const triggerSheet = ss.getSheetByName('AppTrigger');

  const rows = formSheet.getDataRange().getValues();
  const headers = rows[0];
  const statusCol = headers.indexOf('ProcessedStatus');
  
  let processed = 0, failed = 0;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][statusCol] === 'New') {
      try {
        formSheet.getRange(i + 1, statusCol + 1).setValue('Processing');
        const clientId = createClientRecord(rows[i], headers, clientSheet);
        createChildRecords(rows[i], headers, clientId, ss);
        createClientDriveFolder(clientId, rows[i], headers);
        formSheet.getRange(i + 1, statusCol + 1).setValue('Processed');
        formSheet.getRange(i + 1, headers.indexOf('ClientID') + 1).setValue(clientId);
        formSheet.getRange(i + 1, headers.indexOf('ProcessedOn') + 1).setValue(new Date());
        formSheet.getRange(i + 1, headers.indexOf('ProcessedBy') + 1).setValue('Bot');
        processed++;
      } catch(e) {
        formSheet.getRange(i + 1, statusCol + 1).setValue('Failed');
        failed++;
        Logger.log(`Row ${i+1} failed: ${e.message}`);
      }
    }
  }
  
  // Log to AppTrigger
  triggerSheet.appendRow([
    TEXT_UNIQUEID(),
    'IntakeProcessingBot',
    failed > 0 ? 'PartialSuccess' : 'Success',
    `Processed: ${processed}, Failed: ${failed}`,
    processed + failed,
    new Date(),
    new Date()
  ]);
}
```

**Trigger Setup** (run once to install):
```javascript
function installHourlyTrigger() {
  ScriptApp.newTrigger('processNewIntakes')
    .timeBased()
    .everyHours(1)
    .create();
}
```

**AppSheet Config**:
- `AppSetting.BotProcessingEnabled` = "TRUE" / "FALSE" — kill switch
- `AppTrigger` table: logs each bot run with TriggerName, Status, Payload (count), timestamps
- `IntakeForm.ProcessedStatus` Enum: New / Processing / Processed / Failed

## When to Use
Any project where:
- Google Form is the intake mechanism
- Processing needs to happen automatically (no manual button)
- Admin has limited availability hours

## Source Project
Transcend_IntakeSystem | 2026-05-31
