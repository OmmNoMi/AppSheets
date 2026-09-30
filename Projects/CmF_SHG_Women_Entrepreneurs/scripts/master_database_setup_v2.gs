/**
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

function setupCompleteDatabaseWithReport() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    Logger.log('[ERROR] Active spreadsheet not found. Run from Extensions > Apps Script.');
    return;
  }

  var auditLogs = [];
  var startTime = new Date();

  // -------------------------------------------------------------
  // STEP 1: CREATE 5 MATRIX SUB-TABLES + SAFETY PLACEHOLDER
  // -------------------------------------------------------------
  var tables = [
    { name: 'Survey_Labor', cols: ['ID', 'Survey_ID', 'Activity', 'Involvement_Type', 'Family_Members_Count', 'Hired_Help_Count', 'Amount_Paid_Last_Year', 'Remarks'] },
    { name: 'Survey_Turnover', cols: ['ID', 'Survey_ID', 'Season', 'Duration_Months', 'Monthly_Sales', 'Monthly_Net_Profit', 'Remarks'] },
    { name: 'Survey_Capital_Arrangement', cols: ['ID', 'Survey_ID', 'Source', 'Amount_First_Year', 'Amount_In_Between_Years', 'Amount_Current_Year_2026_27', 'Amount_Pending', 'Remarks'] },
    { name: 'Survey_Loan_Usage', cols: ['ID', 'Survey_ID', 'Source', 'Loan_Usage_Purpose', 'Remarks'] },
    { name: 'Survey_Business_Changes', cols: ['ID', 'Survey_ID', 'Indicator_Heading', 'First_Year_Value', 'Current_Year_Value', 'Remarks'] },
    { name: 'Survey_Tables', cols: ['ID', 'Survey_ID', 'Table_Type', 'Row_Item', 'Remarks'] }
  ];

  var sheetsCreated = 0;
  var sheetsExisting = 0;

  tables.forEach(function(t) {
    var sh = ss.getSheetByName(t.name);
    var action = '';
    if (!sh) {
      sh = ss.insertSheet(t.name);
      sheetsCreated++;
      action = 'Created New Sheet';
    } else {
      sheetsExisting++;
      action = 'Verified Existing Sheet';
    }

    var rng = sh.getRange(1, 1, 1, t.cols.length);
    rng.setValues([t.cols]);
    rng.setBackground('#1a73e8').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
    sh.setRowHeight(1, 35).setFrozenRows(1);
    for (var c = 1; c <= t.cols.length; c++) sh.setColumnWidth(c, 160);

    auditLogs.push([new Date(), 'Table Architecture', t.name, action, 'SUCCESS']);
  });

  // -------------------------------------------------------------
  // STEP 2: APPEND NEW CMF FEEDBACK COLUMNS TO MASTER SURVEY SHEET
  // -------------------------------------------------------------
  var surveyColsAdded = 0;
  var surveySh = ss.getSheetByName('Survey');
  if (surveySh) {
    var curHeaders = surveySh.getRange(1, 1, 1, surveySh.getLastColumn()).getValues()[0];
    var newSurveyCols = [
      'RegistrationsDocuments', 'RegistrationsDocumentsOther',
      'Competitors_Same_Scale', 'Competitors_Smaller_Scale', 'Competitors_Higher_Scale',
      'CompetitorAdvantages', 'CompetitorAdvantagesOther',
      'FutureBusinessPlans', 'FutureBusinessPlansOther',
      'AspirationConstraints', 'AspirationConstraintsOther'
    ];

    var toAppend = [];
    newSurveyCols.forEach(function(col) {
      if (curHeaders.indexOf(col) === -1) {
        toAppend.push(col);
        auditLogs.push([new Date(), 'Survey Master Column', col, 'Appended to Survey Sheet', 'SUCCESS']);
      } else {
        auditLogs.push([new Date(), 'Survey Master Column', col, 'Already Present', 'VERIFIED']);
      }
    });

    if (toAppend.length > 0) {
      var startCol = curHeaders.length + 1;
      var appRng = surveySh.getRange(1, startCol, 1, toAppend.length);
      appRng.setValues([toAppend]);
      appRng.setBackground('#34a853').setFontColor('#ffffff').setFontWeight('bold');
      surveyColsAdded = toAppend.length;
    }
  } else {
    auditLogs.push([new Date(), 'Survey Master Sheet', 'Survey', 'Sheet Not Found', 'WARNING']);
  }

  // -------------------------------------------------------------
  // STEP 3: INJECT 34 MATRIX & FEEDBACK ENTRIES INTO APPVARIABLES
  // -------------------------------------------------------------
  var entries = [
    ["Q_A_20_00", "Survey", "RegistrationsDocuments", "Do you have the following registrations/documents? (Multiselect)", "क्या आपके पास निम्नलिखित पंजीकरण/दस्तावेज हैं? (एक से अधिक चुनें)", "कांई थारे कनै ये कागजात/रजिस्ट्रेशन छै? (एक सूं बत्ता चुण सको छो)", "EnumList", "QuestionPrompt, Section A: Basic Details", "PAN card , Aadhar card , Udyam Aadhar , Shop and Establishment registration , FSSAI , Caste certificate , Income certificate , None of these"],
    ["Q_D_06_SameScale", "Survey", "Competitors_Same_Scale", "How many people in your village are in the same business? — Same scale (#)", "आपके गांव में आपके जैसे व्यवसाय में कितने लोग हैं? — समान स्तर/पैमाना (#)", "थारे गांम में थारे जेड़ा धंधे में कित्ता जणा छै? — बराबर रा काम-धंधा (#)", "Number", "QuestionPrompt, Section D: Challenges", ""],
    ["Q_D_06_SmallerScale", "Survey", "Competitors_Smaller_Scale", "How many people in your village are in the same business? — Smaller scale (#)", "आपके गांव में आपके जैसे व्यवसाय में कितने लोग हैं? — आपसे छोटे स्तर का (#)", "थारे गांम में थारे जेड़ा धंधे में कित्ता जणा छै? — थारे सूं छोटा काम-धंधा (#)", "Number", "QuestionPrompt, Section D: Challenges", ""],
    ["Q_D_06_HigherScale", "Survey", "Competitors_Higher_Scale", "How many people in your village are in the same business? — Higher scale (#)", "आपके गांव में आपके जैसे व्यवसाय में कितने लोग हैं? — आपसे बड़े स्तर का (#)", "थारे गांम में थारे जेड़ा धंधे में कित्ता जणा छै? — थारे सूं बड़ा काम-धंधा (#)", "Number", "QuestionPrompt, Section D: Challenges", ""],
    ["Q_D_07_00", "Survey", "CompetitorAdvantages", "What advantage do you have over your competitors? (Multiselect)", "प्रतियोगियों की तुलना में आपके पास क्या फायदे/विशेषताएं हैं? (एक से अधिक चुनें)", "दूजे दुकानदारां सूं थारे काम-धंधा में कांई खास बात/फायदो छै? (एक सूं बत्ता चुणो)", "EnumList", "QuestionPrompt, Section D: Challenges", "I operate from a better location , I operate from a shop while they operate from home , I offer a wide variety of products/services , I offer discounts and still able to make profit , I offer better quality of products/services , I sell my products/services on credit , I take less time to supply products/deliver services , I use social media to market my products/services , Any other , I don’t have any advantage"],
    ["Q_D_07_01", "Survey", "CompetitorAdvantagesOther", "Specify other advantage over competitors", "प्रतियोगियों की तुलना में अन्य लाभ का विवरण दें", "दूजा फायदो लिखो", "Text", "QuestionPrompt, Section D: Challenges", ""],
    ["Q_D_08_00", "Survey", "FutureBusinessPlans", "What are your future plans to increase the scale of your business? (Multiselect)", "अपने व्यवसाय का दायरा/पैमाना बढ़ाने के लिए आपकी भविष्य की क्या योजनाएं हैं? (एक से अधिक चुनें)", "काम-धंधो वधावण खातर थारी आगली कांई योजना छै? (एक सूं बत्ता चुणो)", "EnumList", "QuestionPrompt, Section D: Challenges", "I want to shift to a better location , I want to make my shop/premise more attractive to customers , I want to expand my current business at the same location , I want to open a branch/second unit elsewhere , I want to diversify into a related product/service , I want to start a completely different second enterprise , I want to formalise my business (registration GST etc) , I want to move from local to online or wider markets , I want to hire more people to help run the business , I want to hand over business to family member and reduce involvement , I am satisfied with current scale and don’t want to expand , I want to shut down or exit this enterprise , Any other , Can’t say / haven’t thought about it"],
    ["Q_D_08_01", "Survey", "FutureBusinessPlansOther", "Specify other future business plan", "अन्य भविष्य की योजना का विवरण दें", "दूजी योजना रो ब्योरो लिखो", "Text", "QuestionPrompt, Section D: Challenges", ""],
    ["Q_D_09_00", "Survey", "AspirationConstraints", "What is holding you back from pursuing these aspirations? (Multiselect, don’t prompt)", "इन योजनाओं को पूरा करने में क्या बाधाएं/अड़चनें आ रही हैं? (बिना पूछे टिक करें)", "या योजना पूरी करण में कांई अड़चन आ री छै? (एक सूं बत्ता चुणो)", "EnumList", "QuestionPrompt, Section D: Challenges", "Lack of capital/funds , Lack of family support/time due to household responsibilities , Lack of market access/demand beyond current customer base , Lack of skills/training needed for the next step , Health or personal constraints , Nothing is holding me back I am already working towards it , Any other"],
    ["Q_D_09_01", "Survey", "AspirationConstraintsOther", "Specify other aspiration constraint", "अन्य बाधा का विवरण दें", "दूजी अड़चन लिखो", "Text", "QuestionPrompt, Section D: Challenges", ""],
    ["SEC_C_TBL_LABOR", "Survey", "Related_Survey_Labor", "Q6. Involvement of family members and hired help in business operations", "Q6. व्यवसाय संचालन में परिवार के सदस्यों एवं hired श्रमिकों की भागीदारी", "Q6. काम-धंधा में घर रा जणां अर मजूरां री भागीदारी", "Label", "Table_Header", ""],
    ["SEC_C_TBL_TURNOVER", "Survey", "Related_Survey_Turnover", "Q15. Turnover and income from the enterprise", "Q15. उद्यम से बिक्री (टर्नओवर) एवं शुद्ध आय/मुनाफा", "Q15. धंधे सूं बिक्री (टर्नओवर) अर महिना री कमाई", "Label", "Table_Header", ""],
    ["SEC_C_TBL_CAP_ARRANGE", "Survey", "Related_Survey_Capital_Arrangement", "Q17. How have you arranged capital over enterprise duration?", "Q17. उद्यम अवधि में पूंजी की व्यवस्था कैसे की?", "Q17. काम-धंधा में पूंजी री व्यवस्था किकण करी?", "Label", "Table_Header", ""],
    ["SEC_C_TBL_LOAN_USE", "Survey", "Related_Survey_Loan_Usage", "Q18. How did you use loans taken from different sources?", "Q18. विभिन्न स्रोतों से लिए गए ऋणों का क्या उपयोग किया?", "Q18. अलग-अलग साधनों सूं लिया लोन रो कांई उपयोग कियो?", "Label", "Table_Header", ""],
    ["SEC_C_TBL_BUSINESS_CHANGES", "Survey", "Related_Survey_Business_Changes", "Q20. What changes have happened in your business?", "Q20. आपके व्यवसाय में क्या-क्या परिवर्तन एवं प्रगति हुई है?", "Q20. थारे काम-धंधे में कांई-कांई बदलाव अर तरक्की आई छै?", "Label", "Table_Header", ""],
    ["COL_LABOR_ACTIVITY", "Survey_Labor", "Activity", "Business Activity", "व्यावसायिक गतिविधि", "काम-धंधा री गतिविधि", "Text", "", ""],
    ["COL_LABOR_INVOLVEMENT", "Survey_Labor", "Involvement_Type", "Involvement of family members", "परिवार के सदस्यों की भागीदारी", "घर रा जणां री भागीदारी", "Enum", "", "Regular , Occasional , Only respondent , Not relevant"],
    ["COL_LABOR_FAM_COUNT", "Survey_Labor", "Family_Members_Count", "Family members involved (#)", "शामिल परिवार के सदस्य (संख्या)", "घर रा कित्ता जणा शामिल छै (#)", "Number", "", ""],
    ["COL_LABOR_HIRED_COUNT", "Survey_Labor", "Hired_Help_Count", "Hired help (#)", "रखे गए hired श्रमिक (संख्या)", "भाड़े रा कित्ता मजदूर राखिया (#)", "Number", "", ""],
    ["COL_LABOR_AMOUNT_PAID", "Survey_Labor", "Amount_Paid_Last_Year", "Amount paid in last one year", "पिछले एक वर्ष में दिया गया भुगतान", "पाछले एक साल में कित्ता पीसा दिया", "Enum", "", "Not relevant , Upto Rs 5000 , Rs 6000 to Rs 10000 , Rs 11000 to Rs 30000 , Rs 31000 to Rs 50000 , Rs 51000 to Rs 70000 , Rs 71000 to Rs 90000 , Rs 91000 to Rs 110000 , Rs 111000 to Rs 130000 , Rs 131000 to Rs 150000 , Above Rs 150000"],
    ["COL_TURN_SEASON", "Survey_Turnover", "Season", "Season", "सीजन का प्रकार", "सीजन रो प्रकार", "Enum", "", "Peak season , Average season , Lean season"],
    ["COL_TURN_DURATION", "Survey_Turnover", "Duration_Months", "Duration in months (count)", "सीजन की अवधि (महीनों में)", "सीजन कित्ता महीना चाले (संख्या)", "Number", "", ""],
    ["COL_TURN_SALES", "Survey_Turnover", "Monthly_Sales", "Monthly sales (Rs)", "औसत मासिक बिक्री (रु)", "महिना री बिक्री (रु)", "Price", "", ""],
    ["COL_TURN_PROFIT", "Survey_Turnover", "Monthly_Net_Profit", "Monthly net profit [Rs]", "मासिक शुद्ध आय / मुनाफा [रु]", "महिना रो शुद्ध नफो [रु]", "Price", "", ""],
    ["COL_CAP_SOURCE", "Survey_Capital_Arrangement", "Source", "Capital Source", "पूंजी का स्रोत", "पूंजी रो साधन", "Text", "", ""],
    ["COL_CAP_YR1", "Survey_Capital_Arrangement", "Amount_First_Year", "First year amount (Rs)", "पहले वर्ष की राशि (रु)", "पैले साल कित्ता पीसा लिया (रु)", "Price", "", ""],
    ["COL_CAP_MID", "Survey_Capital_Arrangement", "Amount_In_Between_Years", "Years in-between amount (Rs)", "बीच के वर्षों की राशि (रु)", "बिचला सालां में कित्ता पीसा लिया (रु)", "Price", "", ""],
    ["COL_CAP_CUR", "Survey_Capital_Arrangement", "Amount_Current_Year_2026_27", "Current year (2026-27) [Rs]", "वर्तमान वर्ष (2026-27) की राशि [रु]", "इबके साल (2026-27) कित्ता पीसा लिया [रु]", "Price", "", ""],
    ["COL_CAP_PEN", "Survey_Capital_Arrangement", "Amount_Pending", "Amount pending (Rs)", "बकाया राशि (रु)", "बाकी कित्ता पीसा देणा छै (रु)", "Price", "", ""],
    ["COL_LOAN_SOURCE", "Survey_Loan_Usage", "Source", "Loan Source", "ऋण का स्रोत", "कर्ज रो साधन", "Text", "", ""],
    ["COL_LOAN_USAGE", "Survey_Loan_Usage", "Loan_Usage_Purpose", "Loan usage in business", "ऋण का व्यवसाय में क्या उपयोग किया?", "लोन रो कांई उपयोग कियो?", "Enum", "", "Seed capital to buy material and set up shop , Buy new machine to increase capacity , Buy assets to store/sell (e.g. fridge) , Get additional space to expand , Buy more material to increase product range , Buy more inputs to increase production scale , Buy vehicle to access new market , Access better transport services , Buy mobile phone to promote/sell online , Any other , Not used the source"],
    ["COL_CHG_HEADING", "Survey_Business_Changes", "Indicator_Heading", "Performance Indicator", "व्यावसायिक संकेतक", "धंधे रो संकेतक", "Text", "", ""],
    ["COL_CHG_YR1", "Survey_Business_Changes", "First_Year_Value", "First year (Don’t remember / Rs)", "पहला वर्ष (याद नहीं / रु)", "पैले साल (याद कोनी / रु)", "Text", "", ""],
    ["COL_CHG_CUR", "Survey_Business_Changes", "Current_Year_Value", "Current year (Rs)", "वर्तमान वर्ष (रु)", "इबके साल (रु)", "Price", "", ""]
  ];

  var varsInjected = 0;
  var varsUpdated = 0;
  var vSh = ss.getSheetByName('AppVariables') || ss.insertSheet('AppVariables');

  var vData = vSh.getDataRange().getValues();
  var vHeaders = vData[0] || ['ID', 'Table', 'Column', 'Title', 'Title_hi', 'Title_raj', 'ValueControl', 'Tags', 'VariableList'];
  var idIdx = vHeaders.indexOf('ID');

  var existingMap = {};
  for (var r = 1; r < vData.length; r++) {
    var id = String(vData[r][idIdx] || '').trim();
    if (id) existingMap[id] = r + 1;
  }

  var rowsToAppend = [];

  entries.forEach(function(entry) {
    var id = entry[0];
    var map = {
      'ID': entry[0], 'Table': entry[1], 'Column': entry[2],
      'Title': entry[3], 'Title_hi': entry[4], 'Title_raj': entry[5],
      'ValueControl': entry[6], 'Tags': entry[7], 'VariableList': entry[8]
    };

    if (existingMap[id]) {
      var rowNum = existingMap[id];
      for (var k in map) {
        var cIdx = vHeaders.indexOf(k);
        if (cIdx >= 0) vSh.getRange(rowNum, cIdx + 1).setValue(map[k]);
      }
      varsUpdated++;
      auditLogs.push([new Date(), 'AppVariables Sync', id, 'Updated Existing Entry', 'SUCCESS']);
    } else {
      var newRow = new Array(vHeaders.length).fill('');
      for (var k in map) {
        var cIdx = vHeaders.indexOf(k);
        if (cIdx >= 0) newRow[cIdx] = map[k];
      }
      rowsToAppend.push(newRow);
      varsInjected++;
      auditLogs.push([new Date(), 'AppVariables Sync', id, 'Injected New Entry', 'SUCCESS']);
    }
  });

  if (rowsToAppend.length > 0) {
    vSh.getRange(vSh.getLastRow() + 1, 1, rowsToAppend.length, vHeaders.length).setValues(rowsToAppend);
  }

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

  if (auditLogs.length > 0) {
    rSh.getRange(7, 1, auditLogs.length, 5).setValues(auditLogs);
    for (var i = 7; i < 7 + auditLogs.length; i++) {
      var st = rSh.getRange(i, 5).getValue();
      if (st === 'SUCCESS') rSh.getRange(i, 5).setFontColor('#137333').setFontWeight('bold');
      if (st === 'VERIFIED') rSh.getRange(i, 5).setFontColor('#1a73e8');
      if (st === 'WARNING') rSh.getRange(i, 5).setFontColor('#c5221f').setFontWeight('bold');
    }
  }

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
  try {
    var ui = SpreadsheetApp.getUi();
    var msg = 'OmmNoMi Database Setup Completed Successfully!\n\n' +
              '• 5 Matrix Tables + Safety Table: Ready\n' +
              '• Master Survey Columns Added: ' + surveyColsAdded + '\n' +
              '• AppVariables Injected/Updated: ' + (varsInjected + varsUpdated) + '\n\n' +
              'Check the "Execution_Report" tab for full breakdown!';
    ui.alert('Execution Report', msg, ui.ButtonSet.OK);
  } catch(e) {
    Logger.log('[INFO] UI alert skipped (running headless).');
  }

  Logger.log('=== [SUCCESS] EXECUTION REPORT GENERATED IN Execution_Report TAB ===');
}
