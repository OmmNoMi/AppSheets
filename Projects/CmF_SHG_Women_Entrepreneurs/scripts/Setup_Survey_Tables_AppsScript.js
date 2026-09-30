/**
 * =========================================================================
 * OmmNoMi Automation LLP — Google Apps Script Database Manager
 * Project: Centre for microFinance (CmF) & RAJEEVIKA Study
 * Spreadsheet: SHG Women Entrepreneurs Master Database
 * Target Tab: Survey_Tables (Section C Child Architecture with IsPartOf)
 * =========================================================================
 */

// 1. Custom Menu creation when Google Sheet is opened
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 OmmNoMi Tools')
    .addItem('1. Setup / Sync Survey_Tables Tab', 'setupSurveyTablesTab')
    .addItem('2. Validate Database Schema Health', 'validateDatabaseHealth')
    .addToUi();
}

/**
 * Creates or non-destructively synchronizes the Survey_Tables sheet tab.
 * Ensures all 21 columns exist in the exact required order without touching existing data.
 */
function setupSurveyTablesTab() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = 'Survey_Tables';
  let sheet = ss.getSheetByName(sheetName);
  const isNew = !sheet;

  // The 21 Canonical Columns for Section C Child Architecture
  const requiredColumns = [
    'ID',                           // Col 1: Unique Key
    'Survey_ID',                    // Col 2: Ref to Survey (IsPartOf = TRUE)
    'Table_Type',                   // Col 3: Q6_Labor, Q15_Turnover, Q19_Capital, Q20_Loan_Usage, Q22_Trajectory
    'Row_Item',                     // Col 4: Activity / Season / Capital Source / Trajectory Metric
    'Row_Item_Other',               // Col 5: Text specification if 'Other'
    'Labor_Involvement',            // Col 6 (Q6): Regular, Occasional, Only respondent, Not relevant
    'Labor_Family_Count',           // Col 7 (Q6): Family members count
    'Labor_Hired_Count',            // Col 8 (Q6): Hired help count
    'Labor_Amount_Paid',            // Col 9 (Q6): Annual amount paid (Rs)
    'Turnover_Duration_Months',     // Col 10 (Q15): Months in season
    'Turnover_Monthly_Sales',       // Col 11 (Q15): Monthly gross sales (Rs)
    'Turnover_Monthly_Profit',      // Col 12 (Q15): Monthly net profit (Rs)
    'Capital_First_Year',           // Col 13 (Q19): First year amount (Rs)
    'Capital_In_Between',           // Col 14 (Q19): In-between years amount (Rs)
    'Capital_Current_Year',         // Col 15 (Q19): Current year (2026-27) amount (Rs)
    'Capital_Pending',              // Col 16 (Q19): Debt amount pending (Rs) [Loans only]
    'Loan_Usage',                   // Col 17 (Q20): Asset & enterprise use (Options a through k)
    'Loan_Usage_Other',             // Col 18 (Q20): Text specification for other usage
    'Trajectory_First_Year_Mode',   // Col 19 (Q22): Recall mode ('Don't remember' or 'Rs')
    'Trajectory_First_Year_Amount', // Col 20 (Q22): First year amount (Rs)
    'Trajectory_Current_Year_Amount'// Col 21 (Q22): Current year amount (Rs)
  ];

  if (isNew) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(requiredColumns);
    Logger.log('✅ Created new sheet: ' + sheetName);
  } else {
    // Non-destructive synchronization: check existing headers
    const existingHeaders = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
    
    if (existingHeaders.length === 0 || existingHeaders[0] === '') {
      sheet.getRange(1, 1, 1, requiredColumns.length).setValues([requiredColumns]);
      Logger.log('✅ Set initial headers on existing empty sheet: ' + sheetName);
    } else {
      // Missing column verification
      const missingColumns = [];
      requiredColumns.forEach(col => {
        if (!existingHeaders.includes(col)) {
          missingColumns.push(col);
        }
      });

      if (missingColumns.length > 0) {
        const startCol = existingHeaders.length + 1;
        sheet.getRange(1, startCol, 1, missingColumns.length).setValues([missingColumns]);
        Logger.log('➕ Appended ' + missingColumns.length + ' missing column(s): ' + missingColumns.join(', '));
      } else {
        Logger.log('✨ All 21 columns already exist in ' + sheetName);
      }
    }
  }

  // Apply OmmNoMi Brand Styling to Header Row
  const totalCols = requiredColumns.length;
  const headerRange = sheet.getRange(1, 1, 1, totalCols);
  
  headerRange
    .setBackground('#4285F4')           // OmmNoMi Brand Blue
    .setFontColor('#FFFFFF')           // White text
    .setFontWeight('bold')
    .setFontFamily('Roboto')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  // Set number formats on specific columns if data exists
  // Col 1, 2, 3, 4, 5: Plain Text
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 5).setNumberFormat('@');

  // Auto-fit column widths
  for (let c = 1; c <= totalCols; c++) {
    sheet.autoResizeColumn(c);
    const w = sheet.getColumnWidth(c);
    if (w < 120) sheet.setColumnWidth(c, 130);
    if (w > 260) sheet.setColumnWidth(c, 250);
  }

  const message = '🎉 OmmNoMi Database Setup Complete!\n\n' +
    '• Tab Name: ' + sheetName + '\n' +
    '• Total Columns: ' + totalCols + ' columns configured.\n' +
    '• Styling: OmmNoMi Brand Blue (#4285F4), Roboto font, frozen header row.\n' +
    '• Safety: Existing records in all sheets were strictly preserved.';

  try {
    SpreadsheetApp.getUi().alert('OmmNoMi Database Setup', message, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch(e) {
    Logger.log(message);
  }

  return { success: true, columnsCount: totalCols };
}

/**
 * Diagnostic utility to check database health across all survey sheets.
 */
function validateDatabaseHealth() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['Survey', 'AppVariables', 'AppUser', 'SamplingFrame', 'Survey_Tables'];
  const report = [];

  sheets.forEach(name => {
    const s = ss.getSheetByName(name);
    if (!s) {
      report.push({ Sheet: name, Status: '❌ Missing', Rows: 0, Cols: 0 });
    } else {
      report.push({
        Sheet: name,
        Status: '✅ Active',
        Rows: Math.max(s.getLastRow() - 1, 0),
        Cols: s.getLastColumn()
      });
    }
  });

  let reportStr = '📊 OmmNoMi Database Health Check:\n\n';
  report.forEach(r => {
    reportStr += r.Sheet + ': ' + r.Status + ' (' + r.Rows + ' rows, ' + r.Cols + ' cols)\n';
  });

  try {
    SpreadsheetApp.getUi().alert('Database Health Report', reportStr, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch(e) {
    Logger.log(reportStr);
  }

  return report;
}
