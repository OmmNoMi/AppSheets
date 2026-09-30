/**
 * GOOGLE APPS SCRIPT: ADD Q8 MARKETING METHOD OPTION "MKT_INSTA_WHATSAPP"
 */
function ADD_Q8_MARKETING_INSTAGRAM_WHATSAPP_OPTION() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) {
    Logger.log("[FAIL] AppVariables sheet not found!");
    return;
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf("ID");
  var vlistCol = headers.indexOf("VariableList");

  var all10Mkt = "MKT_SHOP_ONLY , MKT_NAME_BOARD , MKT_DOOR_TO_DOOR , MKT_SHG_MEETINGS , MKT_TRADERS_SAMPLES , MKT_INSTA_WHATSAPP , MKT_WAIT_ENQUIRIES , MKT_DONT_KNOW_HOW , MKT_NO_NEED , MKT_OTHER";

  var existingIds = {};
  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][idCol];
    existingIds[rowId] = i + 1;
    if (rowId === "Q_C_08_00") {
      sheet.getRange(i + 1, vlistCol + 1).setValue(all10Mkt);
      Logger.log("[OK] Updated Q_C_08_00 VariableList with 10 options");
    }
  }

  var newRow = ["MKT_INSTA_WHATSAPP", "Survey", "MarketingMethods", "MarketingMethodOption, SubOption", "Enum", "I market actively on instagram and whatsapp", "Marketing actively on Instagram and WhatsApp", "Marketing Method Option", "", "I market actively on instagram and whatsapp", "", "", "", "", "", "", "मैं इंस्टाग्राम और व्हाट्सएप पर सक्रिय रूप से प्रचार/मार्केटिंग करती हूँ", "म्हे इंस्टाग्राम अर व्हाट्सएप पै प्रचार करां", "", "Antigravity", "09/26/2026 09:40:00"];

  if (existingIds["MKT_INSTA_WHATSAPP"]) {
    Logger.log("[INFO] MKT_INSTA_WHATSAPP already exists at row " + existingIds["MKT_INSTA_WHATSAPP"]);
  } else {
    sheet.appendRow(newRow);
    Logger.log("[OK] Appended MKT_INSTA_WHATSAPP to AppVariables");
  }

  Logger.log("=== Q8 MARKETING 10-OPTIONS SYNC COMPLETED SUCCESSFULLY ===");
}
