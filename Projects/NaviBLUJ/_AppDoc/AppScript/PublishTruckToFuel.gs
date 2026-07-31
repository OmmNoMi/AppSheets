function publishTracyCNGTrucks() {
  const sourceId = "1ASHzLeuFiByKMqisTXCh3QdgCb2zUCZm1c_DxDIlcY4";
  const destId = "1lReqaqFD7X6PA4gMdiBJyvqdVoH554xU--UZeaeOAOQ";

  const sourceSheet = SpreadsheetApp.openById(sourceId).getSheetByName("Fleet");
  const destSheet = SpreadsheetApp.openById(destId).getSheetByName("Today");

  const data = sourceSheet.getDataRange().getValues();
  const headers = data[0];

  // Find column indexes dynamically
  const nameCol = headers.indexOf("Name");
  const statusCol = headers.indexOf("Status");
  const fuelCol = headers.indexOf("Fuel");
  const locationCol = headers.indexOf("Location");

  let results = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    if (
      row[locationCol] === "Tracy" &&
      row[statusCol] === "Working" &&
      row[fuelCol] === "CNG"
    ) {
      results.push([row[nameCol]]);
    }
  }

  // Clear destination
  destSheet.clearContents();

  // Header
  destSheet.getRange(1,1).setValue("Truck Name");

  if (results.length > 0) {
    destSheet.getRange(2,1,results.length,1).setValues(results);
  }
}
