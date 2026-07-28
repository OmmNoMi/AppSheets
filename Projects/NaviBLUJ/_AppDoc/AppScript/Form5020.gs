// ================== CONFIG ==================
const TEMPLATE_FILE_ID = "1XrSE1uNHvR_z1eDwwOpPQen9j_HP_vfo";       // Form 5020 template
const OUTPUT_FOLDER_ID = "1_MWlFAXAAlDqJ5LTxNsj7zGHloEnO0mA";       // Folder for generated PDFs
const NAVI_CLAIMS_WORKER_SHEET_ID = "1C7v4aFzC1rPDZLOY5SZ0RjXRR4TLi2ISBaNwoZPzIHQ";
const WORKER_SHEET_NAME = "Worker5020";
// pdf-lib JS stored in Drive (minified bundle)
const PDF_LIB_DRIVE_ID = "15LB9dk_s54T_DplA3YlYSpkQp5wdeqcc";
// ===========================================

// Load pdf-lib from Drive once per execution with shim for setTimeout
function loadPdfLib_() {
  try {
    if (typeof PDFLib !== "undefined" && PDFLib && PDFLib.PDFDocument) {
      Logger.log("PDFLib already loaded");
      return;
    }
  } catch (e) {
    // ignore
  }

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

// Convert any date-ish value to MM/dd/yyyy for PDF
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

async function fill5020Form(
  iid,
  firmName, policyNumber, mailingAddress, firmPhone, locationAddress, natureOfBusiness,
  employeeName, ssn, dob, employeeAddress, employeePhone,
  dateOfInjury, injuryTime, workStartTime, unableToWork,
  lastWorkedDate, returnToWorkDate, stillOffWork,
  fullDayWages, salaryContinued, employerNoticeDate, claimFormDate,
  injuryDescription, incidentLocation, incidentCounty, onPremises,
  department, otherWorkersInjured, equipmentUsed, specificActivity, howInjuryOccurred,
  sex, occupation, hireDate, hoursPerDay, daysPerWeek, totalWeeklyHours,
  employmentStatus, wages, otherPay, completedBy, completedByTitle, signedDate
) {
  Logger.log("fill5020Form start iid=" + iid);

  try {
    loadPdfLib_();
    const PdfLib = PDFLib;
    Logger.log("Using PdfLib, type=" + typeof PdfLib);

    const templateFile = DriveApp.getFileById(TEMPLATE_FILE_ID);
    Logger.log("Template file " + templateFile.getName());

    let outputFolder;
    try {
      outputFolder = DriveApp.getFolderById(OUTPUT_FOLDER_ID);
      Logger.log("Using output folder " + outputFolder.getName());
    } catch (eFolder) {
      Logger.log("Output folder error " + eFolder);
      const parents = templateFile.getParents();
      if (parents.hasNext()) {
        outputFolder = parents.next();
        Logger.log("Using template parent " + outputFolder.getName());
      } else {
        outputFolder = DriveApp.getRootFolder();
        Logger.log("Using root folder");
      }
    }

    const pdfBytes = templateFile.getBlob().getBytes();
    Logger.log("Template bytes length " + pdfBytes.length);

    const pdfDoc = await PdfLib.PDFDocument.load(new Uint8Array(pdfBytes));
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(PdfLib.StandardFonts.Helvetica);
    const fontSize = 9;
    const todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy");

    // EMPLOYER INFO
    page.drawText(toText(firmName),         { x:  80, y: 683, size: fontSize, font });
    page.drawText(toText(policyNumber),     { x: 420, y: 683, size: fontSize, font });
    page.drawText(toText(mailingAddress),   { x:  80, y: 659, size: fontSize, font });
    page.drawText(toText(firmPhone),        { x: 420, y: 659, size: fontSize, font });
    page.drawText(toText(locationAddress),  { x:  60, y: 637, size: fontSize, font });
    page.drawText(toText(natureOfBusiness), { x:  60, y: 616, size: fontSize, font });
    page.drawText("X",                      { x:  94, y: 597, size: fontSize, font });

    // INJURY DETAILS
    page.drawText(formatDateForPdf(dateOfInjury), { x: 62, y: 576, size: fontSize, font });

    Logger.log("injuryTime  " + injuryTime);
    if (injuryTime) {
      var it = parseTimeForPdf_(injuryTime);
      Logger.log("injury time parsed: text=" + it.text + " amFlag=" + it.amFlag + " pmFlag=" + it.pmFlag);
      if (it.text) {
        if (it.amFlag) {
          page.drawText(it.text, { x: 125, y: 576, size: fontSize, font });
        } else if (it.pmFlag) {
          page.drawText(it.text, { x: 169, y: 576, size: fontSize, font });
        }
      }
    }

    Logger.log("workStartTime raw=" + workStartTime);
    if (workStartTime) {
      var wt = parseTimeForPdf_(workStartTime);
      Logger.log("workStartTime parsed: text=" + wt.text + " amFlag=" + wt.amFlag + " pmFlag=" + wt.pmFlag);
      if (wt.text) {
        if (wt.amFlag) {
          page.drawText(wt.text, { x: 286, y: 576, size: fontSize, font });
        } else if (wt.pmFlag) {
          page.drawText(wt.text, { x: 330, y: 576, size: fontSize, font });
        }
      }
    }

    if (unableToWork) {
      page.drawText("X", { x: 28, y: 550, size: fontSize, font });
    } else {
      page.drawText("X", { x: 61, y: 551, size: fontSize, font });
    }

    page.drawText(formatDateForPdf(lastWorkedDate),   { x: 150, y: 550, size: fontSize, font });
    page.drawText(formatDateForPdf(returnToWorkDate), { x: 300, y: 550, size: fontSize, font });

    if (stillOffWork) {
      page.drawText("X", { x: 460, y: 550, size: fontSize, font });
    }

    if (fullDayWages) {
      page.drawText("X", { x: 60, y: 525, size: fontSize, font });
    } else {
      page.drawText("X", { x: 96, y: 525, size: fontSize, font });
    }

    if (salaryContinued) {
      page.drawText("X", { x: 132, y: 527, size: fontSize, font });
    } else {
      page.drawText("X", { x: 181, y: 527, size: fontSize, font });
    }

    page.drawText(formatDateForPdf(employerNoticeDate),        { x: 356, y: 525, size: fontSize, font });
    page.drawText(formatDateForPdf(claimFormDate || todayStr), { x: 465, y: 525, size: fontSize, font });

    // INCIDENT
    page.drawText(toText(injuryDescription), { x: 25, y: 500, size: fontSize, font });
    page.drawText(toText(incidentLocation),  { x: 25, y: 475, size: fontSize, font });
    page.drawText(toText(incidentCounty),    { x: 300, y: 475, size: fontSize, font });

    if (onPremises === true) {
      page.drawText("X", { x: 427, y: 474, size: fontSize, font });
    } else if (onPremises === false) {
      page.drawText("X", { x: 471, y: 476, size: fontSize, font });
    }

    page.drawText(toText(department), { x: 30, y: 445, size: fontSize, font });
    page.drawText("X",                { x: 436, y: 445, size: fontSize, font });

    page.drawText(toText(equipmentUsed),     { x: 25, y: 420, size: fontSize, font });
    page.drawText(toText(specificActivity),  { x: 25, y: 390, size: fontSize, font });
    page.drawText(toText(howInjuryOccurred), { x: 25, y: 347, size: fontSize, font });

    // EMPLOYEE INFO
    page.drawText(toText(employeeName),    { x:  30, y: 200, size: fontSize, font });
    page.drawText(toText(ssn),             { x: 300, y: 200, size: fontSize, font });
    page.drawText(formatDateForPdf(dob),   { x: 440, y: 200, size: fontSize, font });
    page.drawText(toText(employeeAddress), { x:  30, y: 166, size: fontSize, font });
    page.drawText(toText(employeePhone),   { x: 420, y: 166, size: fontSize, font });

    if (sex === "Male") {
      page.drawText("X", { x: 24, y: 140, size: fontSize, font });
    } else if (sex === "Female") {
      page.drawText("X", { x: 66, y: 140, size: fontSize, font });
    }

    page.drawText(toText(occupation),         { x: 150, y: 140, size: fontSize, font });
    page.drawText(formatDateForPdf(hireDate), { x: 420, y: 140, size: fontSize, font });

    page.drawText(toText(hoursPerDay),      { x:  30, y: 120, size: fontSize, font });
    page.drawText(toText(daysPerWeek),      { x: 120, y: 120, size: fontSize, font });
    page.drawText(toText(totalWeeklyHours), { x: 190, y: 120, size: fontSize, font });

    if (employmentStatus === "Full Time") {
      page.drawText("X", { x: 280, y: 120, size: fontSize, font });
    }
    if (employmentStatus === "Part Time") {
      page.drawText("X", { x: 364, y: 124, size: fontSize, font });
    }
    if (employmentStatus === "Seasonal") {
      page.drawText("X", { x: 364, y: 108, size: fontSize, font });
    }

    page.drawText(toText(wages), { x: 145, y: 86, size: fontSize, font });
    page.drawText("hour",        { x: 200, y: 86, size: fontSize, font });

    page.drawText(toText(completedBy),                             { x:  25, y: 50, size: fontSize, font });
    page.drawText(toText(completedBy ? completedBy + " , " : ""), { x: 180, y: 50, size: fontSize, font });
    page.drawText(toText(completedByTitle),                        { x: 270, y: 50, size: fontSize, font });
    page.drawText(formatDateForPdf(signedDate),                    { x: 530, y: 48, size: fontSize, font });

    Logger.log("All text drawn, saving pdf");

    const pdfBytesOut = await pdfDoc.save();
    Logger.log("Output bytes length " + pdfBytesOut.length);

    const safeName = toText(employeeName || "Employee").replace(/\s+/g, "_");
    const finalFileName = safeName + "_form5020.pdf";
    Logger.log("Final file name " + finalFileName);

    const existing = outputFolder.getFilesByName(finalFileName);
    let removedCount = 0;
    while (existing.hasNext()) {
      const f = existing.next();
      Logger.log("Trashing existing file " + f.getId());
      f.setTrashed(true);
      removedCount++;
    }
    Logger.log("Existing trashed " + removedCount);

    const blob = Utilities.newBlob(
      [...new Uint8Array(pdfBytesOut)],
      MimeType.PDF,
      finalFileName
    );
    const createdFile = outputFolder.createFile(blob);
    const fileUrl = createdFile.getUrl();
    Logger.log("Created file " + createdFile.getId() + " url " + fileUrl);

    // Update DocLink in Worker5020 sheet
    const ss = SpreadsheetApp.openById(NAVI_CLAIMS_WORKER_SHEET_ID);
    const sheet = ss.getSheetByName(WORKER_SHEET_NAME);
    if (!sheet) {
      Logger.log("Sheet " + WORKER_SHEET_NAME + " not found");
    } else {
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      Logger.log("Rows in sheet " + values.length);

      if (values.length > 0) {
        const header = values[0];
        const iidColIndex = header.indexOf("IID");
        const docLinkColIndex = header.indexOf("DocLink");
        Logger.log("iid col " + iidColIndex + " DocLink col " + docLinkColIndex);

        if (iidColIndex !== -1 && docLinkColIndex !== -1) {
          const iidStr = String(iid);
          let updatedRow = null;
          for (let r = 1; r < values.length; r++) {
            if (String(values[r][iidColIndex]) === iidStr) {
              sheet.getRange(r + 1, docLinkColIndex + 1).setValue(fileUrl);
              updatedRow = r + 1;
              Logger.log("Updated DocLink row " + updatedRow);
              break;
            }
          }
          if (updatedRow == null) {
            Logger.log("No row found for iid " + iidStr);
          }
        } else {
          Logger.log("iid or DocLink column missing in header");
        }
      }
    }

    Logger.log("fill5020Form finished iid=" + iid);
  } catch (err) {
    Logger.log("fill5020Form error iid=" + iid + " msg " + err.message);
    Logger.log("stack " + err.stack);
    throw err;
  }
}

// Simple test
function testFill5020Form_withIid() {
  const iid = "123";
  const firmName = "Bluejay Delivery LLC";
  const policyNumber = "T70250760";
  const mailingAddress = "3400 Cottage Way Ste G2 6117 Sacramento CA 95825";
  const firmPhone = "5109009052";
  const locationAddress = "44051 Osgood Road Fremont CA 94539";
  const natureOfBusiness = "Transportation";
  const employeeName = "Davinderjit Kaur";
  const ssn = "123456789";
  const dob = "2025-12-06T00:00:00";
  const employeeAddress = "456 Punjab Ave San Jose CA 95128";
  const employeePhone = "4081234567";
  const dateOfInjury = "2025-12-06T00:00:00";
  const injuryTime = "10:30 AM";
  const workStartTime = "10:00 AM";
  const unableToWork = true;
  const lastWorkedDate = "2025-12-06";
  const returnToWorkDate = "2025-12-10";
  const stillOffWork = true;
  const fullDayWages = true;
  const salaryContinued = true;
  const employerNoticeDate = "2025-12-06T00:00:00";
  const claimFormDate = "2025-12-06T00:00:00";
  const injuryDescription = "Lower back strain while lifting a box";
  const incidentLocation = "Warehouse Dock 456 Punjab Ave";
  const incidentCounty = "Santa Clara";
  const onPremises = true;
  const department = "AMXL";
  const otherWorkersInjured = "No";
  const equipmentUsed = "Dolly lift gate";
  const specificActivity = "Delivering furniture";
  const howInjuryOccurred = "Slipped while unloading couch";
  const sex = "Female";
  const occupation = "Delivery Associate";
  const hireDate = "2023-01-01T00:00:00";
  const hoursPerDay = 10;
  const daysPerWeek = 5;
  const totalWeeklyHours = 50;
  const employmentStatus = "Full Time";
  const wages = 850;
  const otherPay = false;
  const completedBy = "Harman Singh";
  const completedByTitle = "HR Manager";
  const signedDate = "2025-12-07T00:00:00";

  fill5020Form(
    iid,
    firmName, policyNumber, mailingAddress, firmPhone, locationAddress, natureOfBusiness,
    employeeName, ssn, dob, employeeAddress, employeePhone,
    dateOfInjury, injuryTime, workStartTime, unableToWork,
    lastWorkedDate, returnToWorkDate, stillOffWork,
    fullDayWages, salaryContinued, employerNoticeDate, claimFormDate,
    injuryDescription, incidentLocation, incidentCounty, onPremises,
    department, otherWorkersInjured, equipmentUsed, specificActivity, howInjuryOccurred,
    sex, occupation, hireDate, hoursPerDay, daysPerWeek, totalWeeklyHours,
    employmentStatus, wages, otherPay, completedBy, completedByTitle, signedDate
  );
}

// ============ PRIVATE TIME HELPERS ============

function parseTimeForPdf_(timeVal) {
  if (!timeVal) {
    return { text: "", amFlag: false, pmFlag: false };
  }

  // If Date object
  if (Object.prototype.toString.call(timeVal) === "[object Date]") {
    var h = timeVal.getHours();
    var m = timeVal.getMinutes();
    return buildTimeFromHM_(h, m);
  }

  var s = String(timeVal).trim();
  if (!s) {
    return { text: "", amFlag: false, pmFlag: false };
  }

  // If contains AM or PM already, just clean seconds and keep flags
  var hasAM = /AM/i.test(s);
  var hasPM = /PM/i.test(s);
  if (hasAM || hasPM) {
    var cleaned = s.replace(/\s?(AM|PM)/i, "").trim();
    var parts = cleaned.split(":");
    var hStr = parts[0] || "0";
    var mStr = parts[1] || "00";
    var text = Utilities.formatString("%d:%02d", parseInt(hStr, 10), parseInt(mStr, 10));
    return { text: text, amFlag: hasAM, pmFlag: hasPM };
  }

  // Handle 24 hour formats like 14:00:00 or 14:00
  var p = s.split(":");
  if (p.length >= 2) {
    var h24 = parseInt(p[0], 10);
    var m24 = parseInt(p[1], 10);
    return buildTimeFromHM_(h24, m24);
  }

  // Fallback
  return { text: s, amFlag: false, pmFlag: false };
}

function buildTimeFromHM_(h24, m) {
  if (isNaN(h24) || isNaN(m)) {
    return { text: "", amFlag: false, pmFlag: false };
  }

  var am = h24 < 12;
  var h12 = h24 % 12;
  if (h12 === 0) {
    h12 = 12;
  }

  var text = Utilities.formatString("%d:%02d", h12, m);
  return { text: text, amFlag: am, pmFlag: !am };
}
