/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Master Database Setup for Google Sheets
 * Project: CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * This Apps Script does 4 things in 1 run:
 * 1. Creates 5 Matrix Sub-Tables (Survey_Labor, Survey_Turnover, Survey_Capital_Arrangement, Survey_Loan_Usage, Survey_Business_Changes)
 * 2. Restores 'Survey_Tables' dummy tab to stop AppSheet 400 "Unable to parse range" error
 * 3. Appends all new CMF feedback questions/columns to master 'Survey' sheet
 * 4. Downloads & writes all 822 verified rows into 'AppVariables' sheet
 * ==============================================================================
 */

function setupCompleteDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    Logger.log("[ERROR] Spreadsheet active nahi mila. Please run from Extensions > Apps Script.");
    return;
  }

  // -------------------------------------------------------------
  // 1. Create 5 Dedicated Matrix Sheets + Safety Sheet
  // -------------------------------------------------------------
  var sheetsToCreate = [
    {
      name: 'Survey_Labor',
      cols: ['ID', 'Survey_ID', 'Activity', 'Involvement_Type', 'Family_Members_Count', 'Hired_Help_Count', 'Amount_Paid_Last_Year', 'Remarks']
    },
    {
      name: 'Survey_Turnover',
      cols: ['ID', 'Survey_ID', 'Season', 'Duration_Months', 'Monthly_Sales', 'Monthly_Net_Profit', 'Remarks']
    },
    {
      name: 'Survey_Capital_Arrangement',
      cols: ['ID', 'Survey_ID', 'Source', 'Amount_First_Year', 'Amount_In_Between_Years', 'Amount_Current_Year_2026_27', 'Amount_Pending', 'Remarks']
    },
    {
      name: 'Survey_Loan_Usage',
      cols: ['ID', 'Survey_ID', 'Source', 'Loan_Usage_Purpose', 'Remarks']
    },
    {
      name: 'Survey_Business_Changes',
      cols: ['ID', 'Survey_ID', 'Indicator_Heading', 'First_Year_Value', 'Current_Year_Value', 'Remarks']
    },
    {
      name: 'Survey_Tables', // Safety placeholder so AppSheet doesn't crash on sync
      cols: ['ID', 'Survey_ID', 'Table_Type', 'Row_Item', 'Remarks']
    }
  ];

  sheetsToCreate.forEach(function(item) {
    var sh = ss.getSheetByName(item.name) || ss.insertSheet(item.name);
    var rng = sh.getRange(1, 1, 1, item.cols.length);
    rng.setValues([item.cols]);
    rng.setBackground('#1a73e8').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
    sh.setRowHeight(1, 35).setFrozenRows(1);
    for (var c = 1; c <= item.cols.length; c++) sh.setColumnWidth(c, 160);
    Logger.log("[OK] Sheet Ready: " + item.name);
  });

  // -------------------------------------------------------------
  // 2. Append New CMF Feedback Columns to Master 'Survey' Sheet
  // -------------------------------------------------------------
  var surveySh = ss.getSheetByName('Survey');
  if (surveySh) {
    var curHeaders = surveySh.getRange(1, 1, 1, surveySh.getLastColumn()).getValues()[0];
    var newCols = [
      'RegistrationsDocuments',
      'RegistrationsDocumentsOther',
      'Competitors_Same_Scale',
      'Competitors_Smaller_Scale',
      'Competitors_Higher_Scale',
      'CompetitorAdvantages',
      'CompetitorAdvantagesOther',
      'FutureBusinessPlans',
      'FutureBusinessPlansOther',
      'AspirationConstraints',
      'AspirationConstraintsOther'
    ];
    var toAppend = [];
    newCols.forEach(function(col) {
      if (curHeaders.indexOf(col) === -1) {
        toAppend.push(col);
      }
    });
    if (toAppend.length > 0) {
      var startCol = curHeaders.length + 1;
      var appRng = surveySh.getRange(1, startCol, 1, toAppend.length);
      appRng.setValues([toAppend]);
      appRng.setBackground('#34a853').setFontColor('#ffffff').setFontWeight('bold');
      Logger.log("[OK] Added " + toAppend.length + " new columns to Survey sheet: " + toAppend.join(', '));
    } else {
      Logger.log("[INFO] All new columns already present in Survey sheet.");
    }
  }

  // -------------------------------------------------------------
  // 3. Fetch and Populate AppVariables Sheet (822 Rows Trilingual)
  // -------------------------------------------------------------
  var appVarUrl = 'https://raw.githubusercontent.com/OmmNoMi/AppSheets/feature/cmf-one-hit-console-automation-mastery/Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv';
  try {
    var resp = UrlFetchApp.fetch(appVarUrl);
    var csvText = resp.getContentText();
    var csvData = Utilities.parseCsv(csvText);

    if (csvData && csvData.length > 1) {
      var vSh = ss.getSheetByName('AppVariables') || ss.insertSheet('AppVariables');
      vSh.clearContents();
      vSh.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
      
      // Header styling
      var hRng = vSh.getRange(1, 1, 1, csvData[0].length);
      hRng.setBackground('#1a73e8').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
      vSh.setRowHeight(1, 35).setFrozenRows(1);
      Logger.log("[OK] AppVariables populated with " + (csvData.length - 1) + " rows successfully!");
    }
  } catch (err) {
    Logger.log("[WARN] UrlFetch failed: " + err.message + ". Please import AppVariables.csv manually if offline.");
  }

  Logger.log("=== [SUCCESS] MASTER DATABASE SETUP COMPLETE! ===");
}
