/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Google Apps Script for Survey Matrix Sub-Tables
 * Project: Centre for microFinance (CmF) & RAJEEVIKA SHG Women Entrepreneurs Study
 * Purpose: Automatically creates 4 dedicated, professionally styled relational sheets
 *          for Q6 (Labor), Q15 (Turnover), Q18 (Loan Usage), and Q20 (Business Trajectory).
 * ==============================================================================
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('OmmNoMi Survey Tools')
    .addItem('📊 Create 4 Matrix Sub-Sheets', 'createSurveySubTables')
    .addItem('🧹 Format All Table Headers', 'formatAllTableHeaders')
    .addToUi();
}

/**
 * Main function: Creates and formats the 4 matrix sub-tables in the active spreadsheet
 */
function createSurveySubTables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tables = [
    {
      name: 'Survey_Labor',
      title: 'Q6. Labor & Family Involvement Matrix',
      headers: [
        'ID',
        'Survey_ID',
        'Activity_Name',
        'Involvement_Type',
        'Family_Members_Count',
        'Hired_Workers_Count',
        'Daily_Wage_or_Salary',
        'Remarks'
      ]
    },
    {
      name: 'Survey_Turnover',
      title: 'Q15. Seasonal Turnover & Income Matrix',
      headers: [
        'ID',
        'Survey_ID',
        'Season_Type',
        'Months_Count',
        'Monthly_Sales',
        'Monthly_Expenses',
        'Monthly_Net_Income',
        'Seasonal_Total_Sales',
        'Seasonal_Total_Income',
        'Remarks'
      ]
    },
    {
      name: 'Survey_LoanUsage',
      title: 'Q18. Loan Sources & Fund Utilization Matrix',
      headers: [
        'ID',
        'Survey_ID',
        'Loan_Source',
        'Loan_Amount_Year1',
        'Loan_Amount_MidYear',
        'Loan_Amount_CurrentYear',
        'Outstanding_Balance',
        'Interest_Rate',
        'Primary_Usage_Purpose',
        'Remarks'
      ]
    },
    {
      name: 'Survey_BusinessChanges',
      title: 'Q20. Business Trajectory & Changes Matrix',
      headers: [
        'ID',
        'Survey_ID',
        'Indicator_Name',
        'First_Year_Value',
        'Current_Year_Value',
        'Percentage_Change',
        'Direction_of_Change',
        'Key_Reasons_for_Change'
      ]
    }
  ];

  var createdCount = 0;
  var existingCount = 0;

  tables.forEach(function(tableDef) {
    var sheet = ss.getSheetByName(tableDef.name);
    if (!sheet) {
      sheet = ss.insertSheet(tableDef.name);
      createdCount++;
    } else {
      existingCount++;
    }

    // Set Headers
    var headerRange = sheet.getRange(1, 1, 1, tableDef.headers.length);
    headerRange.setValues([tableDef.headers]);

    // Style Header Row: Brand Blue (#1a73e8), Bold, White Text
    headerRange.setBackground('#1a73e8')
               .setFontColor('#ffffff')
               .setFontWeight('bold')
               .setFontFamily('Roboto')
               .setFontSize(10)
               .setHorizontalAlignment('center')
               .setVerticalAlignment('middle')
               .setWrap(true);

    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);

    // Auto-fit columns
    for (var col = 1; col <= tableDef.headers.length; col++) {
      sheet.autoResizeColumn(col);
      var currentWidth = sheet.getColumnWidth(col);
      if (currentWidth < 140) {
        sheet.setColumnWidth(col, 160);
      }
    }
  });

  SpreadsheetApp.getUi().alert(
    'OmmNoMi Sub-Sheets Setup Completed!\n\n' +
    '• Newly Created Sheets: ' + createdCount + '\n' +
    '• Existing Updated Sheets: ' + existingCount + '\n\n' +
    'Sheets: Survey_Labor, Survey_Turnover, Survey_LoanUsage, Survey_BusinessChanges'
  );
}

/**
 * Helper to re-apply header styling if headers are edited
 */
function formatAllTableHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNames = ['Survey_Labor', 'Survey_Turnover', 'Survey_LoanUsage', 'Survey_BusinessChanges'];
  sheetNames.forEach(function(name) {
    var sheet = ss.getSheetByName(name);
    if (sheet) {
      var lastCol = sheet.getLastColumn();
      if (lastCol > 0) {
        var range = sheet.getRange(1, 1, 1, lastCol);
        range.setBackground('#1a73e8')
             .setFontColor('#ffffff')
             .setFontWeight('bold')
             .setFontFamily('Roboto')
             .setFontSize(10)
             .setHorizontalAlignment('center')
             .setVerticalAlignment('middle');
        sheet.setRowHeight(1, 35);
        sheet.setFrozenRows(1);
      }
    }
  });
  SpreadsheetApp.getUi().alert('All headers formatted successfully!');
}
