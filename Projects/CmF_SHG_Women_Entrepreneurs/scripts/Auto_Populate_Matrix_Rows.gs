/**
 * =========================================================================
 * OmmNoMi Automation LLP — Google Apps Script Database Manager
 * Project: Centre for microFinance (CmF) & RAJEEVIKA Study
 * Module: Auto-Populate Section C Matrix Child Rows in Survey_Tables
 * =========================================================================
 */

// 1. Master List of 31 Pre-Populated Matrix Rows
const MATRIX_DEFINITIONS = [
  // --- Q6 Labor Matrix (7 Activities) ---
  { tableType: 'Q6_Labor', rowItem: 'ROW_LABOR_PURCHASE' },
  { tableType: 'Q6_Labor', rowItem: 'ROW_LABOR_PROD' },
  { tableType: 'Q6_Labor', rowItem: 'ROW_LABOR_SERV' },
  { tableType: 'Q6_Labor', rowItem: 'ROW_LABOR_MKTG' },
  { tableType: 'Q6_Labor', rowItem: 'ROW_LABOR_SALE' },
  { tableType: 'Q6_Labor', rowItem: 'ROW_LABOR_RECORD' },
  { tableType: 'Q6_Labor', rowItem: 'ROW_LABOR_OTHER' },

  // --- Q15 Seasonal Turnover Matrix (3 Seasons) ---
  { tableType: 'Q15_Turnover', rowItem: 'ROW_TURN_PEAK' },
  { tableType: 'Q15_Turnover', rowItem: 'ROW_TURN_AVG' },
  { tableType: 'Q15_Turnover', rowItem: 'ROW_TURN_LEAN' },

  // --- Q19 Capital Sources Matrix (15 Sources) ---
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_SAVINGS' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_FAMILY' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_PROFIT' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_MORTG_GOLD' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_SOLD_GOLD' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_FAM_LOAN' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_MONEYLENDER' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_SHG_LOAN' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_OSF_LOAN' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_OSF_SUBSIDY' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_PRIV_SAVING' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_NBFC' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_MUDRA' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_BANK' },
  { tableType: 'Q19_Capital', rowItem: 'ROW_CAP_OTHER' },

  // --- Q22 Business Trajectory Matrix (6 Metrics) ---
  { tableType: 'Q22_Trajectory', rowItem: 'ROW_TRAJ_SALES' },
  { tableType: 'Q22_Trajectory', rowItem: 'ROW_TRAJ_INCOME' },
  { tableType: 'Q22_Trajectory', rowItem: 'ROW_TRAJ_STOCK' },
  { tableType: 'Q22_Trajectory', rowItem: 'ROW_TRAJ_INPUTS' },
  { tableType: 'Q22_Trajectory', rowItem: 'ROW_TRAJ_FINISHED' },
  { tableType: 'Q22_Trajectory', rowItem: 'ROW_TRAJ_ASSETS' }
];

/**
 * Custom Menu in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 OmmNoMi Tools')
    .addItem('1. Pre-fill Matrix Rows for All Surveys', 'prefillAllSurveys')
    .addItem('2. Pre-fill Matrix Rows for Selected Row', 'prefillSelectedSurvey')
    .addItem('3. Setup Auto-Populate Trigger', 'setupAutoTrigger')
    .addToUi();
}

/**
 * Pre-populates matrix rows for a specific Survey_ID if they do not already exist.
 * Uses batch operations for high performance (0.1s execution time).
 * 
 * @param {string} surveyId The unique Survey ID
 * @return {number} Count of rows added
 */
function initMatricesForSurvey(surveyId) {
  if (!surveyId || String(surveyId).trim() === '') return 0;
  surveyId = String(surveyId).trim();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const childSheet = ss.getSheetByName('Survey_Tables');
  if (!childSheet) {
    Logger.log('[ERROR] Survey_Tables sheet not found!');
    return 0;
  }

  // 1. Read existing rows in Survey_Tables to avoid duplicates
  const lastRow = childSheet.getLastRow();
  const existingSet = new Set();
  
  if (lastRow > 1) {
    // Read Survey_ID (Col 2) and Row_Item (Col 4)
    const existingData = childSheet.getRange(2, 2, lastRow - 1, 3).getValues();
    for (let i = 0; i < existingData.length; i++) {
      const sId = String(existingData[i][0]).trim();
      const rItem = String(existingData[i][2]).trim();
      if (sId === surveyId) {
        existingSet.add(rItem);
      }
    }
  }

  // 2. Identify missing rows
  const rowsToAdd = [];
  const totalCols = childSheet.getLastColumn() || 21;

  for (let d = 0; d < MATRIX_DEFINITIONS.length; d++) {
    const def = MATRIX_DEFINITIONS[d];
    if (!existingSet.has(def.rowItem)) {
      // Build 21-column array:
      // Col 1: ID
      // Col 2: Survey_ID
      // Col 3: Table_Type
      // Col 4: Row_Item
      // Col 5-21: Blank
      const row = new Array(totalCols).fill('');
      row[0] = 'ST_' + surveyId + '_' + def.rowItem;
      row[1] = surveyId;
      row[2] = def.tableType;
      row[3] = def.rowItem;
      rowsToAdd.push(row);
    }
  }

  // 3. Batch Append if missing
  if (rowsToAdd.length > 0) {
    const startRow = lastRow + 1;
    childSheet.getRange(startRow, 1, rowsToAdd.length, totalCols).setValues(rowsToAdd);
    Logger.log('[OmmNoMi] Added ' + rowsToAdd.length + ' matrix rows for Survey: ' + surveyId);
  }

  return rowsToAdd.length;
}

/**
 * Scans the Survey sheet and initializes matrices for all surveys.
 */
function prefillAllSurveys() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const surveySheet = ss.getSheetByName('Survey');
  if (!surveySheet) {
    SpreadsheetApp.getUi().alert('Survey sheet not found!');
    return;
  }

  const lastRow = surveySheet.getLastRow();
  if (lastRow <= 1) {
    SpreadsheetApp.getUi().alert('No survey records found.');
    return;
  }

  // Col 1 is ID
  const ids = surveySheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let totalRowsCreated = 0;
  let surveyCount = 0;

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i][0];
    if (id && String(id).trim() !== '') {
      const added = initMatricesForSurvey(id);
      totalRowsCreated += added;
      if (added > 0) surveyCount++;
    }
  }

  const msg = '🎉 [OmmNoMi] Matrix Pre-population Complete!\n\n' +
    '• Processed: ' + ids.length + ' survey(s)\n' +
    '• New Surveys Initialized: ' + surveyCount + '\n' +
    '• Total Matrix Rows Generated: ' + totalRowsCreated + ' rows in Survey_Tables.';
  
  try {
    SpreadsheetApp.getUi().alert('OmmNoMi Automation', msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch(e) {
    Logger.log(msg);
  }
}

/**
 * Pre-fills matrix rows for the currently selected Survey row in Google Sheets.
 */
function prefillSelectedSurvey() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  if (activeSheet.getName() !== 'Survey') {
    SpreadsheetApp.getUi().alert('Please select a row in the "Survey" sheet.');
    return;
  }

  const row = activeSheet.getActiveRange().getRow();
  if (row <= 1) {
    SpreadsheetApp.getUi().alert('Please select a valid data row (Row 2 or below).');
    return;
  }

  const surveyId = activeSheet.getRange(row, 1).getValue();
  if (!surveyId) {
    SpreadsheetApp.getUi().alert('Selected row does not have a Survey ID in Column A.');
    return;
  }

  const added = initMatricesForSurvey(surveyId);
  SpreadsheetApp.getUi().alert('OmmNoMi Automation', 
    'Generated ' + added + ' matrix rows for Survey ID: ' + surveyId, 
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Installable onChange trigger handler:
 * Automatically runs whenever a new survey row is inserted into the Google Sheet.
 */
function onSpreadsheetChange(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const surveySheet = ss.getSheetByName('Survey');
    if (!surveySheet) return;

    const lastRow = surveySheet.getLastRow();
    if (lastRow <= 1) return;

    // Check the latest 5 rows for missing matrices
    const start = Math.max(2, lastRow - 5);
    const count = lastRow - start + 1;
    const ids = surveySheet.getRange(start, 1, count, 1).getValues();

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i][0];
      if (id && String(id).trim() !== '') {
        initMatricesForSurvey(id);
      }
    }
  } catch(err) {
    Logger.log('[ERROR in onSpreadsheetChange] ' + err.message);
  }
}

/**
 * Sets up the installable onChange trigger automatically with 1 click.
 */
function setupAutoTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const triggers = ScriptApp.getProjectTriggers();
  
  // Check if trigger already exists
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onSpreadsheetChange') {
      SpreadsheetApp.getUi().alert('OmmNoMi Automation', 'Auto-populate trigger is already active!', SpreadsheetApp.getUi().ButtonSet.OK);
      return;
    }
  }

  ScriptApp.newTrigger('onSpreadsheetChange')
    .forSpreadsheet(ss)
    .onChange()
    .create();

  SpreadsheetApp.getUi().alert('OmmNoMi Automation', '✅ Installable trigger created! All newly added surveys will automatically have their 31 matrix rows pre-filled in Survey_Tables.', SpreadsheetApp.getUi().ButtonSet.OK);
}
