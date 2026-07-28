function updateGroundedVehicles() {
  const fleetSheetId = "1ASHzLeuFiByKMqisTXCh3QdgCb2zUCZm1c_DxDIlcY4";
  const fleetSheetName = "Fleet";

  const targetSheetId = "1Y0I_NuibOicGsroyScbreC2IUr-UduJhhwN6gGtAMVA";
  const targetSheetName = "FleetHistoricalData";

  const fleetSS = SpreadsheetApp.openById(fleetSheetId);
  const fleetSheet = fleetSS.getSheetByName(fleetSheetName);
  if (!fleetSheet) throw new Error("Fleet sheet not found.");

  const data = fleetSheet.getDataRange().getValues();
  const headers = data[0];

  const getIndex = key => {
    const idx = headers.indexOf(key);
    if (idx === -1) throw new Error(`Column "${key}" not found.`);
    return idx;
  };

  const nameCol = getIndex("Name");
  const vinCol = getIndex("VIN");
  const notesCol = getIndex("Notes");
  const statusCol = getIndex("Status");
  const locationCol = getIndex("Location");

  // Filter for "Grounded" or "Not Working" at "Tracy"
  const downVehicles = data.slice(1).filter(row =>
    ["Grounded", "Not Working"].includes(row[statusCol]) &&
    (row[locationCol] || "").toLowerCase().includes("tracy")
  );

  if (downVehicles.length === 0) return;

  const infoLines = downVehicles.map((row, index) => {
    const name = row[nameCol] || "Unknown";
    const vin = row[vinCol] || "N/A";
    const notes = row[notesCol] || "No notes";
    return `${index + 1}. Vehicle: ${name} | VIN: ${vin} | Notes: ${notes}`;
  });

  const combinedInfo = infoLines.join("\n");

  const now = new Date();
  const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
  const timeStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "hh:mm a"); // 👈 AM/PM format

  const targetSS = SpreadsheetApp.openById(targetSheetId);
  const targetSheet = targetSS.getSheetByName(targetSheetName);
  if (!targetSheet) throw new Error("Target sheet not found.");

  if (targetSheet.getLastRow() === 0) {
    targetSheet.appendRow(["Date", "Time", "Information"]);
  }

  targetSheet.appendRow([dateStr, timeStr, combinedInfo]);
}

function deleteOldEntries() {
  const targetSheetId = "1Y0I_NuibOicGsroyScbreC2IUr-UduJhhwN6gGtAMVA";
  const targetSheetName = "FleetHistoricalData";

  const sheet = SpreadsheetApp.openById(targetSheetId).getSheetByName(targetSheetName);
  if (!sheet) throw new Error("Target sheet not found.");

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return; // Only header present

  const headers = data[0];
  const getColIndex = key => {
    const index = headers.indexOf(key);
    if (index === -1) throw new Error(`Column "${key}" not found.`);
    return index;
  };

  const dateCol = getColIndex("Date");
  const today = new Date();

  const rowsToDelete = [];

  for (let i = 1; i < data.length; i++) {
    const dateCell = data[i][dateCol];
    if (!dateCell) continue;

    const rowDate = new Date(dateCell);
    if (isNaN(rowDate)) continue;

    const diffDays = Math.floor((today - rowDate) / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      rowsToDelete.push(i + 1); // Spreadsheet is 1-indexed
    }
  }

  // Delete from bottom to top to preserve row positions
  rowsToDelete.reverse().forEach(rowNum => sheet.deleteRow(rowNum));
}
