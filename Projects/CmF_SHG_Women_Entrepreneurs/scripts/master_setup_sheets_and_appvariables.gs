/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Master Google Apps Script
 * Project: CMF SHG Women Entrepreneurs Study
 * Purpose:
 * 1. Creates 4 Sub-Tables: Survey_Labor, Survey_Turnover, Survey_Capital_Loans, Survey_Business_Changes
 * 2. Restores 'Survey_Tables' sheet to immediately fix AppSheet's "Unable to parse range" Error 400
 * 3. Injects all 22 Trilingual entries into 'AppVariables'
 * ==============================================================================
 */

function setupAllSheetsAndVariables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    Logger.log("[ERROR] Active spreadsheet nahi mila. Please run from Extensions > Apps Script.");
    return;
  }

  Logger.log("=== STEP 1: CREATING ALL SHEETS ===");
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
      name: 'Survey_Capital_Loans',
      cols: ['ID', 'Survey_ID', 'Source', 'Amount_First_Year', 'Amount_In_Between_Years', 'Amount_Current_Year_2026_27', 'Amount_Pending', 'Loan_Usage_Purpose', 'Remarks']
    },
    {
      name: 'Survey_Business_Changes',
      cols: ['ID', 'Survey_ID', 'Indicator_Heading', 'First_Year_Value', 'Current_Year_Value', 'Remarks']
    },
    {
      name: 'Survey_Tables', // Placeholder so AppSheet stops throwing "Unable to parse range"
      cols: ['ID', 'Survey_ID', 'Table_Type', 'Row_Item', 'Remarks']
    }
  ];

  sheetsToCreate.forEach(function(item) {
    var sh = ss.getSheetByName(item.name);
    if (!sh) {
      sh = ss.insertSheet(item.name);
      Logger.log("[OK] Created Sheet: " + item.name);
    } else {
      Logger.log("[INFO] Sheet already exists: " + item.name);
    }
    var rng = sh.getRange(1, 1, 1, item.cols.length);
    rng.setValues([item.cols]);
    rng.setBackground('#1a73e8').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
    sh.setRowHeight(1, 35).setFrozenRows(1);
    for (var c = 1; c <= item.cols.length; c++) {
      sh.setColumnWidth(c, 160);
    }
  });

  Logger.log("=== STEP 2: UPDATING APPVARIABLES SHEET ===");
  var vSh = ss.getSheetByName('AppVariables');
  if (vSh) {
    var data = vSh.getDataRange().getValues();
    if (data.length > 0) {
      var h = data[0];
      var idIdx = h.indexOf('ID');
      var existing = {};
      for (var r = 1; r < data.length; r++) {
        var id = String(data[r][idIdx] || '').trim();
        if (id) existing[id] = true;
      }

      var newEntries = [
        ['SEC_C_TBL_LABOR', 'Survey', 'Related_Survey_Labor', 'Q6. Involvement of family members and hired help in business operations', 'Q6. व्यवसाय संचालन में परिवार के सदस्यों एवं hired श्रमिकों की भागीदारी', 'Q6. काम-धंधा में घर रा जणां अर मजूरां री भागीदारी', 'Label', 'Table_Header', ''],
        ['SEC_C_TBL_TURNOVER', 'Survey', 'Related_Survey_Turnover', 'Q15. Turnover and income from the enterprise', 'Q15. उद्यम से बिक्री (टर्नओवर) एवं शुद्ध आय/मुनाफा', 'Q15. धंधे सूं बिक्री (टर्नओवर) अर महिना री कमाई', 'Label', 'Table_Header', ''],
        ['SEC_C_TBL_CAPITAL_LOANS', 'Survey', 'Related_Survey_Capital_Loans', 'Q17-18. Capital arranged & Loan usage across enterprise duration', 'Q17-18. उद्यम अवधि में पूंजी की व्यवस्था एवं ऋणों का व्यावसायिक उपयोग', 'Q17-18. काम-धंधा में पूंजी री व्यवस्था अर लोन रो उपयोग', 'Label', 'Table_Header', ''],
        ['SEC_C_TBL_BUSINESS_CHANGES', 'Survey', 'Related_Survey_Business_Changes', 'Q20. What changes have happened in your business?', 'Q20. आपके व्यवसाय में क्या-क्या परिवर्तन एवं प्रगति हुई है?', 'Q20. थारे काम-धंधे में कांई-कांई बदलाव अर तरक्की आई छै?', 'Label', 'Table_Header', ''],
        ['COL_LABOR_ACTIVITY', 'Survey_Labor', 'Activity', 'Business Activity', 'व्यावसायिक गतिविधि', 'काम-धंधा री गतिविधि', 'Text', '', ''],
        ['COL_LABOR_INVOLVEMENT', 'Survey_Labor', 'Involvement_Type', 'Involvement of family members', 'परिवार के सदस्यों की भागीदारी', 'घर रा जणां री भागीदारी', 'Enum', '', 'Regular , Occasional , Only respondent , Not relevant'],
        ['COL_LABOR_FAM_COUNT', 'Survey_Labor', 'Family_Members_Count', 'Family members involved (#)', 'शामिल परिवार के सदस्य (संख्या)', 'घर रा कित्ता जणा शामिल छै (#)', 'Number', '', ''],
        ['COL_LABOR_HIRED_COUNT', 'Survey_Labor', 'Hired_Help_Count', 'Hired help (#)', 'रखे गए hired श्रमिक (संख्या)', 'भाड़े रा कित्ता मजदूर राखिया (#)', 'Number', '', ''],
        ['COL_LABOR_AMOUNT_PAID', 'Survey_Labor', 'Amount_Paid_Last_Year', 'Amount paid in last one year', 'पिछले एक वर्ष में दिया गया भुगतान', 'पाछले एक साल में कित्ता पीसा दिया', 'Enum', '', 'Not relevant , Upto Rs 5000 , Rs 6000 to Rs 10000 , Rs 11000 to Rs 30000 , Rs 31000 to Rs 50000 , Rs 51000 to Rs 70000 , Rs 71000 to Rs 90000 , Rs 91000 to Rs 110000 , Rs 111000 to Rs 130000 , Rs 131000 to Rs 150000 , Above Rs 150000'],
        ['COL_TURN_SEASON', 'Survey_Turnover', 'Season', 'Season', 'सीजन का प्रकार', 'सीजन रो प्रकार', 'Enum', '', 'Peak season , Average season , Lean season'],
        ['COL_TURN_DURATION', 'Survey_Turnover', 'Duration_Months', 'Duration in months (count)', 'सीजन की अवधि (महीनों में)', 'सीजन कित्ता महीना चाले (संख्या)', 'Number', '', ''],
        ['COL_TURN_SALES', 'Survey_Turnover', 'Monthly_Sales', 'Monthly sales (Rs)', 'औसत मासिक बिक्री (रु)', 'महिना री बिक्री (रु)', 'Price', '', ''],
        ['COL_TURN_PROFIT', 'Survey_Turnover', 'Monthly_Net_Profit', 'Monthly net profit [Rs]', 'मासिक शुद्ध आय / मुनाफा [रु]', 'महिना रो शुद्ध नफो [रु]', 'Price', '', ''],
        ['COL_CAP_SOURCE', 'Survey_Capital_Loans', 'Source', 'Capital / Loan Source', 'पूंजी / ऋण का स्रोत', 'पूंजी / कर्ज रो साधन', 'Text', '', ''],
        ['COL_CAP_YR1', 'Survey_Capital_Loans', 'Amount_First_Year', 'First year amount (Rs)', 'पहले वर्ष की राशि (रु)', 'पैले साल कित्ता पीसा लिया (रु)', 'Price', '', ''],
        ['COL_CAP_MID', 'Survey_Capital_Loans', 'Amount_In_Between_Years', 'Years in-between amount (Rs)', 'बीच के वर्षों की राशि (रु)', 'बिचला सालां में कित्ता पीसा लिया (रु)', 'Price', '', ''],
        ['COL_CAP_CUR', 'Survey_Capital_Loans', 'Amount_Current_Year_2026_27', 'Current year (2026-27) [Rs]', 'वर्तमान वर्ष (2026-27) की राशि [रु]', 'इबके साल (2026-27) कित्ता पीसा लिया [रु]', 'Price', '', ''],
        ['COL_CAP_PEN', 'Survey_Capital_Loans', 'Amount_Pending', 'Amount pending (Rs)', 'बकाया राशि (रु)', 'बाकी कित्ता पीसा देणा छै (रु)', 'Price', '', ''],
        ['COL_CAP_USAGE', 'Survey_Capital_Loans', 'Loan_Usage_Purpose', 'Loan usage in business', 'ऋण का व्यवसाय में उपयोग', 'लोन रो उपयोग', 'Enum', '', 'Seed capital to buy material and set up shop , Buy new machine to increase capacity , Buy assets to store/sell (e.g. fridge) , Get additional space to expand , Buy more material to increase product range , Buy more inputs to increase production scale , Buy vehicle to access new market , Access better transport services , Buy mobile phone to promote/sell online , Any other , Not used the source'],
        ['COL_CHG_HEADING', 'Survey_Business_Changes', 'Indicator_Heading', 'Performance Indicator', 'व्यावसायिक संकेतक', 'धंधे रो संकेतक', 'Text', '', ''],
        ['COL_CHG_YR1', 'Survey_Business_Changes', 'First_Year_Value', 'First year (Don’t remember / Rs)', 'पहला वर्ष (याद नहीं / रु)', 'पैले साल (याद कोनी / रु)', 'Text', '', ''],
        ['COL_CHG_CUR', 'Survey_Business_Changes', 'Current_Year_Value', 'Current year (Rs)', 'वर्तमान वर्ष (रु)', 'इबके साल (रु)', 'Price', '', '']
      ];

      var rowsToAdd = [];
      newEntries.forEach(function(entry) {
        if (!existing[entry[0]]) {
          var row = new Array(h.length).fill('');
          var map = {
            'ID': entry[0], 'Table': entry[1], 'Column': entry[2],
            'Title': entry[3], 'Title_hi': entry[4], 'Title_raj': entry[5],
            'ValueControl': entry[6], 'Tags': entry[7], 'VariableList': entry[8]
          };
          for (var k in map) {
            var colIdx = h.indexOf(k);
            if (colIdx >= 0) row[colIdx] = map[k];
          }
          rowsToAdd.push(row);
        }
      });

      if (rowsToAdd.length > 0) {
        vSh.getRange(vSh.getLastRow() + 1, 1, rowsToAdd.length, h.length).setValues(rowsToAdd);
        Logger.log("[OK] Injected " + rowsToAdd.length + " clean entries into 'AppVariables'!");
      } else {
        Logger.log("[INFO] AppVariables already has all entries.");
      }
    }
  }
  Logger.log("=== [SUCCESS] ALL GOOGLE SHEET SETUP COMPLETE! ===");
}
