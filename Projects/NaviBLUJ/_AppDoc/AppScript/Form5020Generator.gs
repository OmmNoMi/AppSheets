// ================== CONFIG ==================
const TEMPLATE_5020_FILE_ID = "1XrSE1uNHvR_z1eDwwOpPQen9j_HP_vfo";
const OUTPUT_5020_FOLDER_ID = "1_MWlFAXAAlDqJ5LTxNsj7zGHloEnO0mA";
// const NAVI_CLAIMS_WORKER_SHEET_ID = "1C7v4aFzC1rPDZLOY5SZ0RjXRR4TLi2ISBaNwoZPzIHQ";
// const WORKER_SHEET_NAME = "Worker5020";
// const PDF_LIB_DRIVE_ID = "15LB9dk_s54T_DplA3YlYSpkQp5wdeqcc";

// Column-name mapping: sheet header → internal key
// Keys match actual Worker5020 sheet headers exactly.
const COLUMN_MAP = {
  "IID":                       "iid",
  "IncidentId":                "incidentId",
  "CaseNumber":                "caseNumber",
  "Form5020":                  "form5020",
  "OshaForm":                  "oshaForm",
  "firmName":                  "firmName",
  "policyNumber":              "policyNumber",
  "mailingAddress":            "mailingAddress",
  "firmPhone":                 "firmPhone",
  "locationAddress":           "locationAddress",
  "natureOfBusiness":          "natureOfBusiness",
  "employeeName":              "employeeName",
  "ssn":                       "ssn",
  "employeeDateOfBirth":       "dob",
  "employeeAddress":           "employeeAddress",
  "EmployeeAddressStreet":     "employeeAddressStreet",
  "EmployeeAddressCity":       "employeeAddressCity",
  "EmployeeAddressState":      "employeeAddressState",
  "EmployeeAddressZIP":        "employeeAddressZIP",
  "employeePhone":             "employeePhone",
  "dateOfInjury":              "dateOfInjury",
  "injuryTime":                "injuryTime",
  "workStartTime":             "workStartTime",
  "unableToWork":              "unableToWork",
  "lastWorkedDate":            "lastWorkedDate",
  "returnToWorkDate":          "returnToWorkDate",
  "stillOffWork":              "stillOffWork",
  "fullDayWages":              "fullDayWages",
  "salaryContinued":           "salaryContinued",
  "employerNoticeDate":        "employerNoticeDate",
  "NameOfPhysician":           "nameOfPhysician",
  "FacilityName":              "facilityName",
  "FacilityStreetNumber":      "facilityStreetNumber",
  "FacilityCity":              "facilityCity",
  "FacilityState":             "facilityState",
  "FacilityZip":               "facilityZip",
  "EmployeeTreatedInEmergency":"employeeTreatedInEmergency",
  "WasEmployeeHospitalized":   "wasEmployeeHospitalized",
  "claimFormDate":             "claimFormDate",
  "injuryDescription":         "injuryDescription",
  "incidentLocation":          "incidentLocation",
  "incidentCounty":            "incidentCounty",
  "onPremises":                "onPremises",
  "department":                "department",
  "otherWorkersInjured":       "otherWorkersInjured",
  "equipmentUsed":             "equipmentUsed",
  "specificActivity":          "specificActivity",
  "howInjuryOccurred":         "howInjuryOccurred",
  "sex":                       "sex",
  "occupation":                "occupation",
  "hireDate":                  "hireDate",
  "hoursPerDay":               "hoursPerDay",
  "daysPerWeek":               "daysPerWeek",
  "totalWeeklyHours":          "totalWeeklyHours",
  "employmentStatus":          "employmentStatus",
  "wages":                     "wages",
  "otherPay":                  "otherPay",
  "completedBy":               "completedBy",
  "completedByTitle":          "completedByTitle",
  "signedDate":                "signedDate",
  "CreatedBy":                 "createdBy",
  "CreatedOn":                 "createdOn",
  "Action":                    "action",
  "UpdatedBy":                 "updatedBy",
  "UpdatedOn":                 "updatedOn"
};
// ===========================================

function loadPdfLib_() {
  try {
    if (typeof PDFLib !== "undefined" && PDFLib && PDFLib.PDFDocument) {
      Logger.log("PDFLib already loaded");
      return;
    }
  } catch (e) { /* ignore */ }
  Logger.log("Loading PDFLib from Drive, fileId=" + PDF_LIB_DRIVE_ID);
  const file = DriveApp.getFileById(PDF_LIB_DRIVE_ID);
  const jsCode = file.getBlob().getDataAsString();
  Logger.log("pdf-lib file name: " + file.getName());
  const shim =
    "function setTimeout(fn,ms){Utilities.sleep(ms||0);if(typeof fn==='function')fn();}\n" +
    "function clearTimeout(){}\n";
  eval(shim + jsCode);
  if (!(typeof PDFLib !== "undefined" && PDFLib && PDFLib.PDFDocument)) {
    throw new Error("PDFLib did not initialize correctly after eval");
  }
  Logger.log("PDFLib loaded successfully");
}

function toText(value) {
  return value == null ? "" : String(value);
}

function formatDateForPdf(value) {
  if (!value) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "MM/dd/yyyy");
  }
  var s = String(value).trim();
  if (!s) return "";
  if (s.match(/^\d{4}-\d{2}-\d{2}T/)) {
    var d1 = new Date(s);
    if (!isNaN(d1.getTime())) {
      return Utilities.formatDate(d1, Session.getScriptTimeZone(), "MM/dd/yyyy");
    }
  }
  if (s.match(/^\d{4}-\d{2}-\d{2}$/)) {
    var d2 = new Date(s + "T00:00:00");
    if (!isNaN(d2.getTime())) {
      return Utilities.formatDate(d2, Session.getScriptTimeZone(), "MM/dd/yyyy");
    }
  }
  return s;
}

// ============ SHEET LOOKUP ============

/**
 * Reads the Worker5020 sheet and returns a row object keyed by internal
 * field names (from COLUMN_MAP) for the given IID.
 * Also returns the 1-based row index so we can update DocLink later.
 */
function getRowByIid_(iid) {
  const ss = SpreadsheetApp.openById(NAVI_CLAIMS_WORKER_SHEET_ID);
  const sheet = ss.getSheetByName(WORKER_SHEET_NAME);
  if (!sheet) throw new Error("Sheet '" + WORKER_SHEET_NAME + "' not found");

  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  // Build header → column-index map
  const headerIdx = {};
  headers.forEach(function (h, i) { headerIdx[String(h).trim()] = i; });

  const iidCol = headerIdx["IID"];
  if (iidCol == null) throw new Error("'IID' column not found in sheet header");

  var rowIndex = -1;
  var rawRow = null;
  for (var r = 1; r < data.length; r++) {
    if (String(data[r][iidCol]) === String(iid)) {
      rowIndex = r + 1; // 1-based sheet row
      rawRow = data[r];
      break;
    }
  }
  if (!rawRow) throw new Error("No row found for IID=" + iid);

  // Map sheet columns → internal keys
  var row = {};
  for (var colName in COLUMN_MAP) {
    var key = COLUMN_MAP[colName];
    var ci = headerIdx[colName];
    row[key] = ci != null ? rawRow[ci] : null;
  }

  return { row: row, sheetRowIndex: rowIndex, sheet: sheet, headers: headers, headerIdx: headerIdx };
}

/**
 * Interpret truthy sheet values (TRUE, "Yes", "Y", 1, etc.)
 */
function toBool_(val) {
  if (val === true || val === false) return val;
  if (val == null) return false;
  var s = String(val).trim().toLowerCase();
  return s === "true" || s === "yes" || s === "y" || s === "1";
}

// ============ MAIN ENTRY POINT ============

async function fill5020FormByIid(iid) {
  Logger.log("fill5020FormByIid start iid=" + iid);
  var lookup = getRowByIid_(iid);
  var d = lookup.row; // shorthand

  try {
    loadPdfLib_();
    const PdfLib = PDFLib;

    const templateFile = DriveApp.getFileById(TEMPLATE_5020_FILE_ID);
    Logger.log("Template file " + templateFile.getName());

    let outputFolder;
    try {
      outputFolder = DriveApp.getFolderById(OUTPUT_5020_FOLDER_ID);
    } catch (eFolder) {
      const parents = templateFile.getParents();
      outputFolder = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
    }

    const pdfBytes = templateFile.getBlob().getBytes();
    const pdfDoc = await PdfLib.PDFDocument.load(new Uint8Array(pdfBytes));
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(PdfLib.StandardFonts.Helvetica);
    const fontSize = 9;
    const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");

    // EMPLOYER INFO
    page.drawText(toText(d.firmName),         { x:  80, y: 683, size: fontSize, font });
    page.drawText(toText(d.policyNumber),     { x: 420, y: 683, size: fontSize, font });
    page.drawText(toText(d.mailingAddress),   { x:  80, y: 659, size: fontSize, font });
    page.drawText(toText(d.firmPhone),        { x: 420, y: 659, size: fontSize, font });
    page.drawText(toText(d.locationAddress),  { x:  60, y: 637, size: fontSize, font });
    page.drawText(toText(d.natureOfBusiness), { x:  60, y: 616, size: fontSize, font });
    page.drawText("X",                        { x:  94, y: 597, size: fontSize, font });

    // INJURY DETAILS
    page.drawText(formatDateForPdf(d.dateOfInjury), { x: 62, y: 576, size: fontSize, font });

    if (d.injuryTime) {
      var it = parseTimeForPdf_(d.injuryTime);
      if (it.text) {
        if (it.amFlag) {
          page.drawText(it.text, { x: 125, y: 576, size: fontSize, font });
        } else if (it.pmFlag) {
          page.drawText(it.text, { x: 169, y: 576, size: fontSize, font });
        }
      }
    }

    if (d.workStartTime) {
      var wt = parseTimeForPdf_(d.workStartTime);
      if (wt.text) {
        if (wt.amFlag) {
          page.drawText(wt.text, { x: 286, y: 576, size: fontSize, font });
        } else if (wt.pmFlag) {
          page.drawText(wt.text, { x: 330, y: 576, size: fontSize, font });
        }
      }
    }

    if (toBool_(d.unableToWork)) {
      page.drawText("X", { x: 28, y: 550, size: fontSize, font });
    } else {
      page.drawText("X", { x: 61, y: 551, size: fontSize, font });
    }

    page.drawText(formatDateForPdf(d.lastWorkedDate),   { x: 150, y: 550, size: fontSize, font });
    page.drawText(formatDateForPdf(d.returnToWorkDate), { x: 300, y: 550, size: fontSize, font });

    if (toBool_(d.stillOffWork)) {
      page.drawText("X", { x: 460, y: 550, size: fontSize, font });
    }

    if (toBool_(d.fullDayWages)) {
      page.drawText("X", { x: 60, y: 525, size: fontSize, font });
    } else {
      page.drawText("X", { x: 96, y: 525, size: fontSize, font });
    }

    if (toBool_(d.salaryContinued)) {
      page.drawText("X", { x: 132, y: 527, size: fontSize, font });
    } else {
      page.drawText("X", { x: 181, y: 527, size: fontSize, font });
    }

    page.drawText(formatDateForPdf(d.employerNoticeDate),        { x: 356, y: 525, size: fontSize, font });
    page.drawText(formatDateForPdf(d.claimFormDate || todayStr), { x: 465, y: 525, size: fontSize, font });

    // INCIDENT
    page.drawText(toText(d.injuryDescription), { x: 25, y: 500, size: fontSize, font });
    page.drawText(toText(d.incidentLocation),  { x: 25, y: 475, size: fontSize, font });
    page.drawText(toText(d.incidentCounty),    { x: 300, y: 475, size: fontSize, font });

    var onPrem = toBool_(d.onPremises);
    if (d.onPremises === true || String(d.onPremises).trim().toLowerCase() === "true" || String(d.onPremises).trim().toLowerCase() === "yes") {
      page.drawText("X", { x: 427, y: 474, size: fontSize, font });
    } else if (d.onPremises === false || String(d.onPremises).trim().toLowerCase() === "false" || String(d.onPremises).trim().toLowerCase() === "no") {
      page.drawText("X", { x: 471, y: 476, size: fontSize, font });
    }

    page.drawText(toText(d.department), { x: 30, y: 445, size: fontSize, font });
    // Field 23: Other workers injured or ill in this event?
    if (toBool_(d.otherWorkersInjured)) {
      page.drawText("X", { x: 395, y: 445, size: fontSize, font }); // Yes
    } else {
      page.drawText("X", { x: 436, y: 445, size: fontSize, font }); // No
    }
    page.drawText(toText(d.equipmentUsed),     { x: 25, y: 420, size: fontSize, font });
    page.drawText(toText(d.specificActivity),  { x: 25, y: 390, size: fontSize, font });
    // Field 26: wraps long text across up to 3 lines (box width ~530)
    drawWrappedText_(page, toText(d.howInjuryOccurred), font, fontSize, 25, 347, 500, 11, 3);

    // PHYSICIAN / HOSPITAL (Fields 27–29)
    // Field 27: Name and address of physician — combine name + facility address
    var physicianParts = [d.nameOfPhysician, d.facilityName, d.facilityStreetNumber, d.facilityCity, d.facilityState, d.facilityZip]
      .filter(function(v) { return v != null && String(v).trim() !== ""; });
    var physicianFull = physicianParts.join(", ");
    page.drawText(toText(physicianFull), { x: 25, y: 300, size: fontSize, font });

    // Field 28: Hospitalized as an inpatient overnight?
    if (toBool_(d.wasEmployeeHospitalized)) {
      page.drawText("X", { x: 195, y: 278, size: fontSize, font }); // Yes
    } else {
      page.drawText("X", { x: 155, y: 278, size: fontSize, font }); // No
    }

    // Field 29: Employee treated in emergency room?
    if (toBool_(d.employeeTreatedInEmergency)) {
      page.drawText("X", { x: 380, y: 250, size: fontSize, font }); // Yes
    } else {
      page.drawText("X", { x: 470, y: 250, size: fontSize, font }); // No
    }

    // EMPLOYEE INFO
    page.drawText(toText(d.employeeName),    { x:  30, y: 200, size: fontSize, font });
    page.drawText(toText(d.ssn),             { x: 300, y: 200, size: fontSize, font });
    page.drawText(formatDateForPdf(d.dob),   { x: 440, y: 200, size: fontSize, font });
    page.drawText(toText(d.employeeAddress), { x:  30, y: 166, size: fontSize, font });
    page.drawText(toText(d.employeePhone),   { x: 420, y: 166, size: fontSize, font });

    if (toText(d.sex) === "Male") {
      page.drawText("X", { x: 24, y: 140, size: fontSize, font });
    } else if (toText(d.sex) === "Female") {
      page.drawText("X", { x: 66, y: 140, size: fontSize, font });
    }

    page.drawText(toText(d.occupation),         { x: 150, y: 140, size: fontSize, font });
    page.drawText(formatDateForPdf(d.hireDate), { x: 420, y: 140, size: fontSize, font });

    page.drawText(toText(d.hoursPerDay),      { x:  30, y: 120, size: fontSize, font });
    page.drawText(toText(d.daysPerWeek),      { x: 120, y: 120, size: fontSize, font });
    page.drawText(toText(d.totalWeeklyHours), { x: 190, y: 120, size: fontSize, font });

    var empStatus = toText(d.employmentStatus);
    if (empStatus === "Full Time") {
      page.drawText("X", { x: 280, y: 120, size: fontSize, font });
    }
    if (empStatus === "Part Time") {
      page.drawText("X", { x: 364, y: 124, size: fontSize, font });
    }
    if (empStatus === "Seasonal") {
      page.drawText("X", { x: 364, y: 108, size: fontSize, font });
    }

    page.drawText(toText(d.wages), { x: 145, y: 86, size: fontSize, font });
    page.drawText("hour",          { x: 200, y: 86, size: fontSize, font });

    page.drawText(toText(d.completedBy),                                   { x:  25, y: 50, size: fontSize, font });
    page.drawText(toText(d.completedBy ? d.completedBy + " , " : ""),     { x: 180, y: 50, size: fontSize, font });
    page.drawText(toText(d.completedByTitle),                              { x: 270, y: 50, size: fontSize, font });
    page.drawText(formatDateForPdf(d.signedDate),                          { x: 530, y: 48, size: fontSize, font });

    // SAVE PDF
    Logger.log("All text drawn, saving pdf");
    const pdfBytesOut = await pdfDoc.save();

    const safeName = toText(d.employeeName || "Employee").replace(/\s+/g, "_");
    const finalFileName = safeName + "_form5020.pdf";

    const existing = outputFolder.getFilesByName(finalFileName);
    while (existing.hasNext()) {
      existing.next().setTrashed(true);
    }

    const blob = Utilities.newBlob(
      [...new Uint8Array(pdfBytesOut)],
      MimeType.PDF,
      finalFileName
    );
    const createdFile = outputFolder.createFile(blob);
    const fileUrl = createdFile.getUrl();
    Logger.log("Created file " + createdFile.getId() + " url " + fileUrl);

    // Update Form5020 column in the sheet row with the PDF link
    var form5020Col = lookup.headerIdx["Form5020"];
    if (form5020Col != null) {
      lookup.sheet.getRange(lookup.sheetRowIndex, form5020Col + 1).setValue(fileUrl);
      Logger.log("Updated Form5020 row " + lookup.sheetRowIndex);
    }

    Logger.log("fill5020FormByIid finished iid=" + iid);
  } catch (err) {
    Logger.log("fill5020FormByIid error iid=" + iid + " msg " + err.message);
    Logger.log("stack " + err.stack);
    throw err;
  }
}

// ============ TEST ============

function testFill5020FormByIid() {
  fill5020FormByIid("123");
}

// ============ TEXT WRAPPING HELPER ============

/**
 * Draw text that wraps within a max width, advancing downward line by line.
 * @param {Object} page     - pdf-lib page
 * @param {string} text     - the string to draw
 * @param {Object} font     - embedded font
 * @param {number} fontSize - point size
 * @param {number} x        - left x position
 * @param {number} y        - starting y position (top of first line)
 * @param {number} maxWidth - available horizontal space in points
 * @param {number} lineHeight - vertical gap between lines (default fontSize + 2)
 * @param {number} maxLines - stop after this many lines (default 3)
 */
function drawWrappedText_(page, text, font, fontSize, x, y, maxWidth, lineHeight, maxLines) {
  if (!text) return;
  lineHeight = lineHeight || (fontSize + 2);
  maxLines = maxLines || 3;
  var words = text.split(/\s+/);
  var lines = [];
  var currentLine = "";
  for (var i = 0; i < words.length; i++) {
    var testLine = currentLine ? (currentLine + " " + words[i]) : words[i];
    var width = font.widthOfTextAtSize(testLine, fontSize);
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
      if (lines.length >= maxLines) break;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  for (var j = 0; j < lines.length; j++) {
    page.drawText(lines[j], { x: x, y: y - (j * lineHeight), size: fontSize, font: font });
  }
}
