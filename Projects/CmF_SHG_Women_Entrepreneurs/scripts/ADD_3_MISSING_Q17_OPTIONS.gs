/**
 * GOOGLE APPS SCRIPT: ADD 3 MISSING TRADING ACTIVITIES TO APPVARIABLES
 * Adds:
 *   1. ACT_AGRI_INPUT  - [T] Agri-input retail
 *   2. ACT_AI_BREEDING - [T] AI / breeding kits
 *   3. ACT_GOAT_TRADING- [T] Goat trading
 * And updates Q_A_17_00 VariableList to 29 options.
 */
function ADD_3_MISSING_Q17_OPTIONS() {
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
  
  if (idCol === -1 || vlistCol === -1) {
    Logger.log("[FAIL] ID or VariableList column not found!");
    return;
  }

  var all29List = "ACT_VEG_FRUIT , ACT_GROCERY , ACT_FANCY_STORE , ACT_APPAREL , ACT_ELECTRIC_GOODS , ACT_STONE_SHOP , ACT_AGRI_INPUT , ACT_AI_BREEDING , ACT_GOAT_TRADING , ACT_FLOUR_MILL , ACT_TAILORING , ACT_BEAUTY_PARLOUR , ACT_AUTO_REPAIR , ACT_EMITRA , ACT_TRANSPORT , ACT_TENT_HOUSE , ACT_MOBILE_REPAIR , ACT_STONE_CUTTING , ACT_SANITARY_NAPKIN , ACT_HANDICRAFT , ACT_DAIRY_MILK , ACT_JUICE , ACT_FOOD_PROCESSING , ACT_FOOD_MAKING , ACT_SWEET_BOX , ACT_FLAG_MAKING , ACT_LEATHER_PRODUCTS , ACT_STONE_IDOLS , ACT_ANY_OTHER";

  // Step 1: Update Q_A_17_00 VariableList
  var q17Updated = false;
  var stoneShopRowIdx = -1;
  var existingIds = {};

  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][idCol];
    existingIds[rowId] = i + 1;
    if (rowId === "Q_A_17_00") {
      sheet.getRange(i + 1, vlistCol + 1).setValue(all29List);
      q17Updated = true;
      Logger.log("[OK] Updated Q_A_17_00 VariableList with 29 options");
    }
    if (rowId === "ACT_STONE_SHOP") {
      stoneShopRowIdx = i + 1;
    }
  }

  // Step 2: Add the 3 options if not present
  var rowsToInsert = [
    ["ACT_AGRI_INPUT", "Survey", "BusinessActivities", "Activity_Trading, ActivityOption, SubOption", "Enum", "[T] Agri-input retail", "Trading in seeds, fertilizers, pesticides, and farming inputs", "Trading Activity Option", "", "Agri-input retail", "", "", "", "", "", "", "[T] कृषि आदान खुदरा (Agri-input retail)", "[T] खाद-बीज री दुकान", "", "Antigravity", "09/26/2026 08:30:00"],
    ["ACT_AI_BREEDING", "Survey", "BusinessActivities", "Activity_Trading, ActivityOption, SubOption", "Enum", "[T] AI / breeding kits", "Trading in artificial insemination & cattle breeding equipment", "Trading Activity Option", "", "AI/breeding kits", "", "", "", "", "", "", "[T] कृत्रिम गर्भाधान (AI) / ब्रीडिंग किट", "[T] पशु गर्भाधान / ब्रीडिंग किट", "", "Antigravity", "09/26/2026 08:30:00"],
    ["ACT_GOAT_TRADING", "Survey", "BusinessActivities", "Activity_Trading, ActivityOption, SubOption", "Enum", "[T] Goat trading", "Trading and livestock dealing in goats", "Trading Activity Option", "", "Goat trading", "", "", "", "", "", "", "[T] बकरी व्यापार / पशु क्रय-विक्रय", "[T] बकरी लेन-देन / बकरा व्यापार", "", "Antigravity", "09/26/2026 08:30:00"]
  ];

  for (var r = 0; r < rowsToInsert.length; r++) {
    var newRow = rowsToInsert[r];
    var optId = newRow[0];
    if (existingIds[optId]) {
      Logger.log("[INFO] " + optId + " already exists at row " + existingIds[optId]);
    } else {
      sheet.appendRow(newRow);
      Logger.log("[OK] Appended " + optId + " to AppVariables");
    }
  }

  Logger.log("=== Q17 29-OPTIONS SYNC COMPLETED SUCCESSFULLY ===");
}
