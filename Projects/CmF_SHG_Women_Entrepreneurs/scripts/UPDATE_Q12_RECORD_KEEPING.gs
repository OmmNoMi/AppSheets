/**
 * GOOGLE APPS SCRIPT: UPDATE Q12 RECORD KEEPING METHODS (10 OPTIONS)
 */
function UPDATE_Q12_RECORD_KEEPING_APPVARIABLES() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf("ID");
  var vcCol = headers.indexOf("ValueControl");
  var titleCol = headers.indexOf("Title");
  var descCol = headers.indexOf("Description");
  var enumValCol = headers.indexOf("EnumValue");
  var vlistCol = headers.indexOf("VariableList");
  var titleHiCol = headers.indexOf("Title_hi");
  var titleRajCol = headers.indexOf("Title_raj");

  var all10Rkt = "RKT_RECEIPT_BILLS , RKT_PURCHASE_SALE_REG , RKT_ONLY_DEBT , RKT_DAILY_DIARY , RKT_CRP_DIARY , RKT_DIGITAL_APPS , RKT_NOT_REGULAR , RKT_FAMILY_BOOK , RKT_NO_RECORD , RKT_OTHER";

  var existingIds = {};
  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][idCol];
    existingIds[rowId] = i + 1;
    if (rowId === "Q_C_11_00") {
      sheet.getRange(i + 1, vlistCol + 1).setValue("OPT_YES , OPT_NO");
    }
    if (rowId === "Q_C_12_00") {
      sheet.getRange(i + 1, vcCol + 1).setValue("EnumList");
      sheet.getRange(i + 1, titleCol + 1).setValue("Q12. How do you maintain business transactions?");
      sheet.getRange(i + 1, descCol + 1).setValue("Q12. How do you maintain business transactions?");
      sheet.getRange(i + 1, enumValCol + 1).setValue("Q12. How do you maintain business transactions?");
      sheet.getRange(i + 1, vlistCol + 1).setValue(all10Rkt);
      sheet.getRange(i + 1, titleHiCol + 1).setValue("Q12. आप व्यावसायिक लेन-देन का हिसाब कैसे रखती हैं?");
      sheet.getRange(i + 1, titleRajCol + 1).setValue("Q12. थे लेन-देन रो हिसाब कियां राखो हो?");
    }
  }

  var optionsToEnsure = [
    ["RKT_RECEIPT_BILLS", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "Receipt book/bills", "Receipt book or printed/written bills", "Record Keeping Option", "", "Receipt book/bills", "", "", "", "", "", "", "रसीद बुक / बिल", "रसीद बही / बिल", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_PURCHASE_SALE_REG", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "purchase and sale register", "Purchase and sale register for business", "Record Keeping Option", "", "purchase and sale register", "", "", "", "", "", "", "क्रय-विक्रय (खरीद-बिक्री) रजिस्टर", "खरीद-बेचान रो रजिस्टर", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_ONLY_DEBT", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "Only debt register", "Only maintain debt / credit register (Udhar Khata)", "Record Keeping Option", "", "Only debt register", "", "", "", "", "", "", "केवल उधार / बही खाता रजिस्टर", "खाली उधारी रो खातो", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_DAILY_DIARY", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "Maintain daily diary", "Maintain daily handwritten diary", "Record Keeping Option", "", "Maintain daily diary", "", "", "", "", "", "", "दैनिक डायरी मेंटेन करती हूँ", "रोज री डायरी राखूं", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_CRP_DIARY", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "Maintain daily diary as taught by OSF/SVEP CRP", "Maintain daily diary as trained by CRP", "Record Keeping Option", "", "Maintain daily diary as taught by OSF/SVEP CRP", "", "", "", "", "", "", "OSF/SVEP CRP द्वारा सिखाए अनुसार दैनिक डायरी रखती हूँ", "सीआरपी दीदी रै सिखाये मुजब रोज डायरी राखूं", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_DIGITAL_APPS", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "Maintain digital records using Mera Bill, Bahi Khata", "Maintain digital records using bookkeeping apps", "Record Keeping Option", "", "Maintain digital records using Mera Bill, Bahi Khata", "", "", "", "", "", "", "मेरा बिल, बही खाता जैसे ऐप से डिजिटल रिकॉर्ड रखती हूँ", "मेरा बिल / बही खाता ऐप सूं हिसाब राखूं", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_NOT_REGULAR", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "Don’t record regularly", "Do not record business transactions regularly", "Record Keeping Option", "", "Don’t record regularly", "", "", "", "", "", "", "नियमित रूप से रिकॉर्ड नहीं रखती", "रोज-रोज हिसाब कोनी राखूं", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_FAMILY_BOOK", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "My family member maintains a book", "A family member maintains the accounts book", "Record Keeping Option", "", "My family member maintains a book", "", "", "", "", "", "", "परिवार का कोई सदस्य हिसाब की किताब रखता है", "घर रो कोई दूजो सदस्य हिसाब राखै", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_NO_RECORD", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "I don’t maintain any record", "Do not maintain any records", "Record Keeping Option", "", "I don’t maintain any record", "", "", "", "", "", "", "मैं कोई रिकॉर्ड / हिसाब नहीं रखती", "म्हे कोई हिसाब-किताब कोनी राखां", "", "Antigravity", "09/26/2026 10:35:00"],
    ["RKT_OTHER", "Survey", "RecordKeepingMethod", "RecordKeepingOption, SubOption", "Enum", "Any other, specify", "Any other record keeping method", "Record Keeping Option", "", "Any other, specify", "", "", "", "", "", "", "अन्य कोई तरीका (विवरण दें)", "दूजो कोई तरीको (ब्यौरो दो)", "", "Antigravity", "09/26/2026 10:35:00"]
  ];

  for (var r = 0; r < optionsToEnsure.length; r++) {
    var optId = optionsToEnsure[r][0];
    if (existingIds[optId]) {
      var row = existingIds[optId];
      if (titleCol !== -1) sheet.getRange(row, titleCol + 1).setValue(optionsToEnsure[r][5]);
      if (descCol !== -1) sheet.getRange(row, descCol + 1).setValue(optionsToEnsure[r][6]);
      if (enumValCol !== -1) sheet.getRange(row, enumValCol + 1).setValue(optionsToEnsure[r][9]);
      if (titleHiCol !== -1) sheet.getRange(row, titleHiCol + 1).setValue(optionsToEnsure[r][16]);
      if (titleRajCol !== -1) sheet.getRange(row, titleRajCol + 1).setValue(optionsToEnsure[r][17]);
    } else {
      sheet.appendRow(optionsToEnsure[r]);
    }
  }

  Logger.log("=== Q12 RECORD KEEPING 10-OPTIONS SYNC COMPLETED SUCCESSFULLY ===");
}
