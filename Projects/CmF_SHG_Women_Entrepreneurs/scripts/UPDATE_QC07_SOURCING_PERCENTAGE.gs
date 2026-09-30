/**
 * GOOGLE APPS SCRIPT: UPDATE Q7 RAW MATERIAL SOURCING TO ENUM (0%/25%/50%/75%/100%)
 */
function UPDATE_Q7_RAW_MATERIAL_SOURCING_APPVARIABLES() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) {
    Logger.log("[FAIL] AppVariables sheet not found!");
    return;
  }

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

  var pctVList = "PCT_0 , PCT_25 , PCT_50 , PCT_75 , PCT_100";

  var updates = {
    "Q_C_07_00": {
      "vc": "Section_Header",
      "title": "Q7. What percentage of raw material do you source from these places?",
      "title_hi": "Q7. आप इन स्थानों से कितने प्रतिशत कच्चा माल प्राप्त करती हैं?",
      "title_raj": "Q7. थे ईं जगावां सूं कित्ता प्रतिशत माल लावो हो?",
      "vlist": pctVList
    },
    "Q_C_07_01": {
      "vc": "Enum",
      "title": "a. Nearby town/district",
      "title_hi": "a. आसपास के कस्बे / जिले से",
      "title_raj": "a. नेड़े रा कस्बा / जिले सूं",
      "vlist": pctVList
    },
    "Q_C_07_02": {
      "vc": "Enum",
      "title": "b. Wholesale market within state",
      "title_hi": "b. राज्य के भीतर थोक बाजार से",
      "title_raj": "b. राजस्थान रा थोक बाजार सूं",
      "vlist": pctVList
    },
    "Q_C_07_03": {
      "vc": "Enum",
      "title": "c. Wholesale market outside the state",
      "title_hi": "c. राज्य के बाहर थोक बाजार से",
      "title_raj": "c. बाहर रा थोक बाजार सूं",
      "vlist": pctVList
    },
    "Q_C_07_04": {
      "vc": "Enum",
      "title": "d. Order online (Amazon/Meesho)",
      "title_hi": "d. ऑनलाइन ऑर्डर (Amazon/Meesho) से",
      "title_raj": "d. ऑनलाइन ऑर्डर सूं",
      "vlist": pctVList
    }
  };

  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][idCol];
    if (updates[rowId]) {
      var u = updates[rowId];
      if (vcCol !== -1) sheet.getRange(i + 1, vcCol + 1).setValue(u.vc);
      if (titleCol !== -1) sheet.getRange(i + 1, titleCol + 1).setValue(u.title);
      if (descCol !== -1) sheet.getRange(i + 1, descCol + 1).setValue(u.title);
      if (enumValCol !== -1) sheet.getRange(i + 1, enumValCol + 1).setValue(u.title);
      if (vlistCol !== -1) sheet.getRange(i + 1, vlistCol + 1).setValue(u.vlist);
      if (titleHiCol !== -1) sheet.getRange(i + 1, titleHiCol + 1).setValue(u.title_hi);
      if (titleRajCol !== -1) sheet.getRange(i + 1, titleRajCol + 1).setValue(u.title_raj);
      Logger.log("[OK] Updated " + rowId);
    }
  }

  Logger.log("=== Q7 RAW MATERIAL SOURCING UPDATED SUCCESSFULLY ===");
}
