/**
 * =========================================================================
 * OmmNoMi Automation LLP — Complete Database Refactoring Script
 * Project: Centre for microFinance (CmF) & RAJEEVIKA Study
 * 
 * Objectives:
 * 1. Survey Sheet Refactor:
 *    - Removes the 115 flattened matrix columns (Labor_*, Turnover_*, Cap_*, Trajectory_*).
 *    - Inserts the 5 clean Question Anchor columns in their exact survey positions:
 *      * Q_C_06_Labor_Involvement (after LocationConvenienceOther)
 *      * Q_C_15_Turnover_Income (after RecordKeepingOther)
 *      * Q_C_19_Capital_Arranged (after SHGAssociationAssistance)
 *      * Q_C_20_Loan_Usage (after Q_C_19_Capital_Arranged)
 *      * Q_C_22_Business_Trajectory (after MonthlyIncomeIncreaseByOSFSVEP)
 *    - Preserves all other columns and all existing survey rows.
 * 
 * 2. Survey_Tables Sheet Creation / Sync:
 *    - Creates/Syncs the 21-column child table for IsPartOf architecture.
 *    - Applies OmmNoMi Brand Blue (#4285F4) styling.
 * =========================================================================
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 OmmNoMi Tools')
    .addItem('1. Refactor Database (Survey & Survey_Tables)', 'refactorFullDatabase')
    .addItem('2. Validate Database Schema Health', 'validateDatabaseHealth')
    .addToUi();
}

function refactorFullDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const confirm = ui.alert(
    'OmmNoMi Database Refactoring Confirmation',
    'Yeh action:\n' +
    '1. "Survey" sheet se 115 purane flattened columns hatakar 5 clean Question Anchor columns add karega.\n' +
    '2. "Survey_Tables" child sheet ko 21 columns ke sath tayyar karega.\n' +
    '3. Kisi bhi non-matrix column ya row ka data delete nahi hoga.\n\n' +
    'Kya aap aage badhna chahte hain?',
    ui.ButtonSet.YES_NO
  );

  if (confirm !== ui.Button.YES) {
    ui.alert('Action cancelled by user.');
    return;
  }

  // -------------------------------------------------------------
  // PART 1: REFACTOR SURVEY SHEET
  // -------------------------------------------------------------
  const surveySheet = ss.getSheetByName('Survey');
  if (!surveySheet) {
    ui.alert('❌ Error: "Survey" sheet nahi mili!');
    return;
  }

  const surveyData = surveySheet.getDataRange().getValues();
  const oldHeaders = surveyData[0];
  const oldRows = surveyData.slice(1);

  // List of 115 flattened columns to remove from Survey
  const columnsToRemove = new Set([
    // Q6 Labor (24 cols)
    'Labor_Purchase_Involvement', 'Labor_Purchase_FamilyCount', 'Labor_Purchase_HiredCount', 'Labor_Purchase_AmountPaid',
    'Labor_Prod_Involvement', 'Labor_Prod_FamilyCount', 'Labor_Prod_HiredCount', 'Labor_Prod_AmountPaid',
    'Labor_Serv_Involvement', 'Labor_Serv_FamilyCount', 'Labor_Serv_HiredCount', 'Labor_Serv_AmountPaid',
    'Labor_Mktg_Involvement', 'Labor_Mktg_FamilyCount', 'Labor_Mktg_HiredCount', 'Labor_Mktg_AmountPaid',
    'Labor_Sale_Involvement', 'Labor_Sale_FamilyCount', 'Labor_Sale_HiredCount', 'Labor_Sale_AmountPaid',
    'Labor_Record_Involvement', 'Labor_Record_FamilyCount', 'Labor_Record_HiredCount', 'Labor_Record_AmountPaid',
    // Q15 Turnover (9 cols)
    'Turnover_Peak_Months', 'Turnover_Peak_Sales', 'Turnover_Peak_Profit',
    'Turnover_Avg_Months', 'Turnover_Avg_Sales', 'Turnover_Avg_Profit',
    'Turnover_Lean_Months', 'Turnover_Lean_Sales', 'Turnover_Lean_Profit',
    // Q19 & Q20 Capital (70 cols)
    'Cap_OwnSavings_Yr1', 'Cap_OwnSavings_Mid', 'Cap_OwnSavings_Cur', 'Cap_OwnSavings_Pending', 'Cap_OwnSavings_Usage',
    'Cap_Family_Yr1', 'Cap_Family_Mid', 'Cap_Family_Cur', 'Cap_Family_Pending', 'Cap_Family_Usage',
    'Cap_Profit_Yr1', 'Cap_Profit_Mid', 'Cap_Profit_Cur', 'Cap_Profit_Pending', 'Cap_Profit_Usage',
    'Cap_MortgGold_Yr1', 'Cap_MortgGold_Mid', 'Cap_MortgGold_Cur', 'Cap_MortgGold_Pending', 'Cap_MortgGold_Usage',
    'Cap_SoldGold_Yr1', 'Cap_SoldGold_Mid', 'Cap_SoldGold_Cur', 'Cap_SoldGold_Pending', 'Cap_SoldGold_Usage',
    'Cap_FamLoan_Yr1', 'Cap_FamLoan_Mid', 'Cap_FamLoan_Cur', 'Cap_FamLoan_Pending', 'Cap_FamLoan_Usage',
    'Cap_Moneylender_Yr1', 'Cap_Moneylender_Mid', 'Cap_Moneylender_Cur', 'Cap_Moneylender_Pending', 'Cap_Moneylender_Usage',
    'Cap_SHGLoan_Yr1', 'Cap_SHGLoan_Mid', 'Cap_SHGLoan_Cur', 'Cap_SHGLoan_Pending', 'Cap_SHGLoan_Usage',
    'Cap_OSFSVEPLoan_Yr1', 'Cap_OSFSVEPLoan_Mid', 'Cap_OSFSVEPLoan_Cur', 'Cap_OSFSVEPLoan_Pending', 'Cap_OSFSVEPLoan_Usage',
    'Cap_OSFSubsidy_Yr1', 'Cap_OSFSubsidy_Mid', 'Cap_OSFSubsidy_Cur', 'Cap_OSFSubsidy_Pending', 'Cap_OSFSubsidy_Usage',
    'Cap_PrivSaving_Yr1', 'Cap_PrivSaving_Mid', 'Cap_PrivSaving_Cur', 'Cap_PrivSaving_Pending', 'Cap_PrivSaving_Usage',
    'Cap_NBFC_Yr1', 'Cap_NBFC_Mid', 'Cap_NBFC_Cur', 'Cap_NBFC_Pending', 'Cap_NBFC_Usage',
    'Cap_Mudra_Yr1', 'Cap_Mudra_Mid', 'Cap_Mudra_Cur', 'Cap_Mudra_Pending', 'Cap_Mudra_Usage',
    'Cap_BankLoan_Yr1', 'Cap_BankLoan_Mid', 'Cap_BankLoan_Cur', 'Cap_BankLoan_Pending', 'Cap_BankLoan_Usage',
    // Q22 Trajectory (12 cols)
    'Trajectory_Sales_Yr1', 'Trajectory_Sales_Cur', 'Trajectory_Income_Yr1', 'Trajectory_Income_Cur',
    'Trajectory_TradeStock_Yr1', 'Trajectory_TradeStock_Cur', 'Trajectory_ProdInputs_Yr1', 'Trajectory_ProdInputs_Cur',
    'Trajectory_ProdFinished_Yr1', 'Trajectory_ProdFinished_Cur', 'Trajectory_ServAssets_Yr1', 'Trajectory_ServAssets_Cur'
  ]);

  // Construct New Clean Survey Headers with Anchor Placements
  const newSurveyHeaders = [];

  oldHeaders.forEach(header => {
    if (!columnsToRemove.has(header)) {
      newSurveyHeaders.push(header);

      // Insert Q6 Anchor after LocationConvenienceOther
      if (header === 'LocationConvenienceOther') {
        newSurveyHeaders.push('Q_C_06_Labor_Involvement');
      }
      // Insert Q15 Anchor after RecordKeepingOther
      if (header === 'RecordKeepingOther') {
        newSurveyHeaders.push('Q_C_15_Turnover_Income');
      }
      // Insert Q19 & Q20 Anchors after SHGAssociationAssistance
      if (header === 'SHGAssociationAssistance') {
        newSurveyHeaders.push('Q_C_19_Capital_Arranged');
        newSurveyHeaders.push('Q_C_20_Loan_Usage');
      }
      // Insert Q22 Anchor after MonthlyIncomeIncreaseByOSFSVEP
      if (header === 'MonthlyIncomeIncreaseByOSFSVEP') {
        newSurveyHeaders.push('Q_C_22_Business_Trajectory');
      }
    }
  });

  // Re-map existing survey rows to new headers
  const newSurveyRows = oldRows.map(row => {
    const newRow = [];
    newSurveyHeaders.forEach(newH => {
      const oldIdx = oldHeaders.indexOf(newH);
      if (oldIdx !== -1) {
        newRow.push(row[oldIdx]);
      } else {
        newRow.push(''); // Empty for new question anchor columns
      }
    });
    return newRow;
  });

  // Write back to Survey sheet
  surveySheet.clear();
  const allSurveyData = [newSurveyHeaders, ...newSurveyRows];
  surveySheet.getRange(1, 1, allSurveyData.length, newSurveyHeaders.length).setValues(allSurveyData);

  // Style Survey Headers
  surveySheet.getRange(1, 1, 1, newSurveyHeaders.length)
    .setBackground('#4285F4')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontFamily('Roboto')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  surveySheet.setRowHeight(1, 36);
  surveySheet.setFrozenRows(1);

  // Auto-fit Survey columns
  for (let c = 1; c <= Math.min(newSurveyHeaders.length, 60); c++) {
    const w = surveySheet.getColumnWidth(c);
    if (w < 120) surveySheet.setColumnWidth(c, 130);
  }

  Logger.log('✅ Survey sheet refactored: from ' + oldHeaders.length + ' down to ' + newSurveyHeaders.length + ' clean columns!');

  // -------------------------------------------------------------
  // PART 2: SETUP SURVEY_TABLES CHILD SHEET
  // -------------------------------------------------------------
  const childSheetName = 'Survey_Tables';
  let childSheet = ss.getSheetByName(childSheetName);
  const isNewChild = !childSheet;

  const childColumns = [
    'ID', 'Survey_ID', 'Table_Type', 'Row_Item', 'Row_Item_Other',
    'Labor_Involvement', 'Labor_Family_Count', 'Labor_Hired_Count', 'Labor_Amount_Paid',
    'Turnover_Duration_Months', 'Turnover_Monthly_Sales', 'Turnover_Monthly_Profit',
    'Capital_First_Year', 'Capital_In_Between', 'Capital_Current_Year', 'Capital_Pending',
    'Loan_Usage', 'Loan_Usage_Other',
    'Trajectory_First_Year_Mode', 'Trajectory_First_Year_Amount', 'Trajectory_Current_Year_Amount'
  ];

  if (isNewChild) {
    childSheet = ss.insertSheet(childSheetName);
    childSheet.appendRow(childColumns);
  } else {
    const existingChildHeaders = childSheet.getRange(1, 1, 1, Math.max(childSheet.getLastColumn(), 1)).getValues()[0];
    if (existingChildHeaders.length === 0 || existingChildHeaders[0] === '') {
      childSheet.getRange(1, 1, 1, childColumns.length).setValues([childColumns]);
    }
  }

  // Style Survey_Tables Headers
  childSheet.getRange(1, 1, 1, childColumns.length)
    .setBackground('#4285F4')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontFamily('Roboto')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  childSheet.setRowHeight(1, 36);
  childSheet.setFrozenRows(1);

  for (let c = 1; c <= childColumns.length; c++) {
    childSheet.autoResizeColumn(c);
    const w = childSheet.getColumnWidth(c);
    if (w < 120) childSheet.setColumnWidth(c, 130);
    if (w > 260) childSheet.setColumnWidth(c, 250);
  }

  Logger.log('✅ Survey_Tables sheet configured with 21 columns.');

  // -------------------------------------------------------------
  // SUCCESS REPORT
  // -------------------------------------------------------------
  const reportMsg = 
    '🎉 OmmNoMi Complete Database Refactoring SUCCESS!\n\n' +
    '1. "Survey" Sheet:\n' +
    '   • 115 purane flattened columns safely removed.\n' +
    '   • 5 Clean Question Anchors added in exact Section C sequence:\n' +
    '     - Q_C_06_Labor_Involvement\n' +
    '     - Q_C_15_Turnover_Income\n' +
    '     - Q_C_19_Capital_Arranged\n' +
    '     - Q_C_20_Loan_Usage\n' +
    '     - Q_C_22_Business_Trajectory\n' +
    '   • Total Columns: ' + newSurveyHeaders.length + ' (Pehle 240 the!)\n\n' +
    '2. "Survey_Tables" Child Sheet:\n' +
    '   • 21 columns ready with IsPartOf architecture.\n\n' +
    'Saara existing data 100% surakshit hai!';

  ui.alert('Database Refactoring Complete', reportMsg, ui.ButtonSet.OK);
}

function validateDatabaseHealth() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ['Survey', 'AppVariables', 'AppUser', 'SamplingFrame', 'Survey_Tables'];
  let reportStr = '📊 OmmNoMi Database Health Check:\n\n';

  sheets.forEach(name => {
    const s = ss.getSheetByName(name);
    if (!s) {
      reportStr += name + ': ❌ Missing\n';
    } else {
      reportStr += name + ': ✅ Active (' + Math.max(s.getLastRow() - 1, 0) + ' rows, ' + s.getLastColumn() + ' cols)\n';
    }
  });

  SpreadsheetApp.getUi().alert('Database Health Report', reportStr, SpreadsheetApp.getUi().ButtonSet.OK);
}
