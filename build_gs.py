import json

with open('scratch_entries.json', 'r', encoding='utf-8') as f:
    entries = json.load(f)

# Format each entry as a single line JSON
entry_lines = []
for e in entries:
    entry_lines.append('    ' + json.dumps(e, ensure_ascii=False))

js_array = '[\n' + ',\n'.join(entry_lines) + '\n  ]'

code = f"""/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Master Database Setup & Execution Auditor
 * Project: CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * ZERO EXTERNAL PERMISSIONS NEEDED (Pure SpreadsheetApp)
 *
 * 1. Configures 5 Dedicated Matrix Sheets + Safety Sheet
 * 2. Appends All New CMF Final Feedback Columns to Master 'Survey' Sheet
 * 3. Injects All 34 Matrix & Feedback Definitions into 'AppVariables'
 * 4. Generates an Interactive On-Sheet 'Execution_Report' + UI Modal Summary
 * ==============================================================================
 */

function setupCompleteDatabaseWithReport() {{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {{
    Logger.log('[ERROR] Active spreadsheet not found. Run from Extensions > Apps Script.');
    return;
  }}

  var auditLogs = [];
  var startTime = new Date();

  // -------------------------------------------------------------
  // STEP 1: CREATE 5 MATRIX SUB-TABLES + SAFETY PLACEHOLDER
  // -------------------------------------------------------------
  var tables = [
    {{ name: 'Survey_Labor', cols: ['ID', 'Survey_ID', 'Activity', 'Involvement_Type', 'Family_Members_Count', 'Hired_Help_Count', 'Amount_Paid_Last_Year', 'Remarks'] }},
    {{ name: 'Survey_Turnover', cols: ['ID', 'Survey_ID', 'Season', 'Duration_Months', 'Monthly_Sales', 'Monthly_Net_Profit', 'Remarks'] }},
    {{ name: 'Survey_Capital_Arrangement', cols: ['ID', 'Survey_ID', 'Source', 'Amount_First_Year', 'Amount_In_Between_Years', 'Amount_Current_Year_2026_27', 'Amount_Pending', 'Remarks'] }},
    {{ name: 'Survey_Loan_Usage', cols: ['ID', 'Survey_ID', 'Source', 'Loan_Usage_Purpose', 'Remarks'] }},
    {{ name: 'Survey_Business_Changes', cols: ['ID', 'Survey_ID', 'Indicator_Heading', 'First_Year_Value', 'Current_Year_Value', 'Remarks'] }},
    {{ name: 'Survey_Tables', cols: ['ID', 'Survey_ID', 'Table_Type', 'Row_Item', 'Remarks'] }}
  ];

  var sheetsCreated = 0;
  var sheetsExisting = 0;

  tables.forEach(function(t) {{
    var sh = ss.getSheetByName(t.name);
    var action = '';
    if (!sh) {{
      sh = ss.insertSheet(t.name);
      sheetsCreated++;
      action = 'Created New Sheet';
    }} else {{
      sheetsExisting++;
      action = 'Verified Existing Sheet';
    }}

    var rng = sh.getRange(1, 1, 1, t.cols.length);
    rng.setValues([t.cols]);
    rng.setBackground('#1a73e8').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
    sh.setRowHeight(1, 35).setFrozenRows(1);
    for (var c = 1; c <= t.cols.length; c++) sh.setColumnWidth(c, 160);

    auditLogs.push([new Date(), 'Table Architecture', t.name, action, 'SUCCESS']);
  }});

  // -------------------------------------------------------------
  // STEP 2: APPEND NEW CMF FEEDBACK COLUMNS TO MASTER SURVEY SHEET
  // -------------------------------------------------------------
  var surveyColsAdded = 0;
  var surveySh = ss.getSheetByName('Survey');
  if (surveySh) {{
    var curHeaders = surveySh.getRange(1, 1, 1, surveySh.getLastColumn()).getValues()[0];
    var newSurveyCols = [
      'RegistrationsDocuments', 'RegistrationsDocumentsOther',
      'Competitors_Same_Scale', 'Competitors_Smaller_Scale', 'Competitors_Higher_Scale',
      'CompetitorAdvantages', 'CompetitorAdvantagesOther',
      'FutureBusinessPlans', 'FutureBusinessPlansOther',
      'AspirationConstraints', 'AspirationConstraintsOther'
    ];

    var toAppend = [];
    newSurveyCols.forEach(function(col) {{
      if (curHeaders.indexOf(col) === -1) {{
        toAppend.push(col);
        auditLogs.push([new Date(), 'Survey Master Column', col, 'Appended to Survey Sheet', 'SUCCESS']);
      }} else {{
        auditLogs.push([new Date(), 'Survey Master Column', col, 'Already Present', 'VERIFIED']);
      }}
    }});

    if (toAppend.length > 0) {{
      var startCol = curHeaders.length + 1;
      var appRng = surveySh.getRange(1, startCol, 1, toAppend.length);
      appRng.setValues([toAppend]);
      appRng.setBackground('#34a853').setFontColor('#ffffff').setFontWeight('bold');
      surveyColsAdded = toAppend.length;
    }}
  }} else {{
    auditLogs.push([new Date(), 'Survey Master Sheet', 'Survey', 'Sheet Not Found', 'WARNING']);
  }}

  // -------------------------------------------------------------
  // STEP 3: INJECT 34 MATRIX & FEEDBACK ENTRIES INTO APPVARIABLES
  // -------------------------------------------------------------
  var entries = {js_array};

  var varsInjected = 0;
  var varsUpdated = 0;
  var vSh = ss.getSheetByName('AppVariables') || ss.insertSheet('AppVariables');

  var vData = vSh.getDataRange().getValues();
  var vHeaders = vData[0] || ['ID', 'Table', 'Column', 'Title', 'Title_hi', 'Title_raj', 'ValueControl', 'Tags', 'VariableList'];
  var idIdx = vHeaders.indexOf('ID');

  var existingMap = {{}};
  for (var r = 1; r < vData.length; r++) {{
    var id = String(vData[r][idIdx] || '').trim();
    if (id) existingMap[id] = r + 1;
  }}

  var rowsToAppend = [];

  entries.forEach(function(entry) {{
    var id = entry[0];
    var map = {{
      'ID': entry[0], 'Table': entry[1], 'Column': entry[2],
      'Title': entry[3], 'Title_hi': entry[4], 'Title_raj': entry[5],
      'ValueControl': entry[6], 'Tags': entry[7], 'VariableList': entry[8]
    }};

    if (existingMap[id]) {{
      var rowNum = existingMap[id];
      for (var k in map) {{
        var cIdx = vHeaders.indexOf(k);
        if (cIdx >= 0) vSh.getRange(rowNum, cIdx + 1).setValue(map[k]);
      }}
      varsUpdated++;
      auditLogs.push([new Date(), 'AppVariables Sync', id, 'Updated Existing Entry', 'SUCCESS']);
    }} else {{
      var newRow = new Array(vHeaders.length).fill('');
      for (var k in map) {{
        var cIdx = vHeaders.indexOf(k);
        if (cIdx >= 0) newRow[cIdx] = map[k];
      }}
      rowsToAppend.push(newRow);
      varsInjected++;
      auditLogs.push([new Date(), 'AppVariables Sync', id, 'Injected New Entry', 'SUCCESS']);
    }}
  }});

  if (rowsToAppend.length > 0) {{
    vSh.getRange(vSh.getLastRow() + 1, 1, rowsToAppend.length, vHeaders.length).setValues(rowsToAppend);
  }}

  // -------------------------------------------------------------
  // STEP 4: GENERATE ON-SHEET 'EXECUTION_REPORT' TAB
  // -------------------------------------------------------------
  var rSh = ss.getSheetByName('Execution_Report') || ss.insertSheet('Execution_Report');
  rSh.clearContents();

  rSh.getRange('A1:E1').merge()
    .setValue('OmmNoMi Automation LLP — Execution Audit Report')
    .setBackground('#1a73e8').setFontColor('#ffffff').setFontWeight('bold').setFontSize(14).setHorizontalAlignment('center');

  rSh.getRange('A2:E2').merge()
    .setValue('Execution Time: ' + startTime.toLocaleString() + ' | Status: ALL TASKS COMPLETED')
    .setBackground('#f8f9fa').setFontColor('#5f6368').setFontSize(10).setHorizontalAlignment('center');

  // KPI Summary Cards
  rSh.getRange('A4:B4').merge().setValue('Tables Managed: ' + (sheetsCreated + sheetsExisting) + ' (New: ' + sheetsCreated + ')').setFontWeight('bold').setBackground('#e8f0fe');
  rSh.getRange('C4:D4').merge().setValue('Survey Columns Added: ' + surveyColsAdded).setFontWeight('bold').setBackground('#e6f4ea');
  rSh.getRange('E4').setValue('Variables Injected: ' + varsInjected + ' | Updated: ' + varsUpdated).setFontWeight('bold').setBackground('#fef7e0');

  // Audit Logs Table
  var logHeaders = ['Timestamp', 'Category', 'Item / Column', 'Action Taken', 'Status'];
  rSh.getRange(6, 1, 1, 5).setValues([logHeaders]).setBackground('#202124').setFontColor('#ffffff').setFontWeight('bold');

  if (auditLogs.length > 0) {{
    rSh.getRange(7, 1, auditLogs.length, 5).setValues(auditLogs);
    for (var i = 7; i < 7 + auditLogs.length; i++) {{
      var st = rSh.getRange(i, 5).getValue();
      if (st === 'SUCCESS') rSh.getRange(i, 5).setFontColor('#137333').setFontWeight('bold');
      if (st === 'VERIFIED') rSh.getRange(i, 5).setFontColor('#1a73e8');
      if (st === 'WARNING') rSh.getRange(i, 5).setFontColor('#c5221f').setFontWeight('bold');
    }}
  }}

  rSh.setColumnWidth(1, 160);
  rSh.setColumnWidth(2, 180);
  rSh.setColumnWidth(3, 220);
  rSh.setColumnWidth(4, 260);
  rSh.setColumnWidth(5, 120);

  // Focus on the report sheet
  ss.setActiveSheet(rSh);

  // -------------------------------------------------------------
  // STEP 5: SHOW MODAL POPUP ALERT
  // -------------------------------------------------------------
  try {{
    var ui = SpreadsheetApp.getUi();
    var msg = 'OmmNoMi Database Setup Completed Successfully!\\n\\n' +
              '• 5 Matrix Tables + Safety Table: Ready\\n' +
              '• Master Survey Columns Added: ' + surveyColsAdded + '\\n' +
              '• AppVariables Injected/Updated: ' + (varsInjected + varsUpdated) + '\\n\\n' +
              'Check the "Execution_Report" tab for full breakdown!';
    ui.alert('Execution Report', msg, ui.ButtonSet.OK);
  }} catch(e) {{
    Logger.log('[INFO] UI alert skipped (running headless).');
  }}

  Logger.log('=== [SUCCESS] EXECUTION REPORT GENERATED IN Execution_Report TAB ===');
}}
"""

with open('Projects/CmF_SHG_Women_Entrepreneurs/scripts/master_database_setup_v2.gs', 'w', encoding='utf-8') as f:
    f.write(code)

print('Wrote compact master_database_setup_v2.gs')
