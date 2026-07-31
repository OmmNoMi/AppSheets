// ================== CONFIG ==================
const OSHA301_TEMPLATE_FILE_ID = '1-TN1StFnRm5MgS6crw58IVbb6rEQfSGQ';
const OSHA_OUTPUT_FOLDER_ID = '1i9jos_-ADMvTsLHXLw_B-Yqp6HHQNMZd';
const OSHA301_SPREADSHEET_ID = '1C7v4aFzC1rPDZLOY5SZ0RjXRR4TLi2ISBaNwoZPzIHQ';
const OSHA301_SHEET_NAME = 'Worker5020';
// ===========================================

// Load pdf-lib from Drive once per execution
function loadPdfLibOsha301_() {
  try {
    if (typeof PDFLib !== 'undefined' && PDFLib && PDFLib.PDFDocument) {
      Logger.log('PDFLib already loaded');
      return;
    }
  } catch (e) {}

  const file = DriveApp.getFileById(PDF_LIB_DRIVE_ID);
  const jsCode = file.getBlob().getDataAsString();
  const shim =
    "function setTimeout(fn,ms){Utilities.sleep(ms||0);if(typeof fn==='function')fn();}\n" +
    "function clearTimeout(){}\n";
  eval(shim + jsCode);

  if (!(typeof PDFLib !== 'undefined' && PDFLib && PDFLib.PDFDocument)) {
    throw new Error('PDFLib did not initialize correctly after eval');
  }
}

function osha301_toText_(value) {
  return value == null ? '' : String(value);
}

function osha301_safeFileName_(value) {
  var s = osha301_toText_(value).trim() || 'Unknown_Employee';
  return s.replace(/\s+/g, '_').replace(/[^\w]/g, '');
}

function osha301_formatDateForPdf_(value) {
  if (!value) return '';

  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'MM/dd/yyyy');
  }

  var s = String(value).trim();
  if (!s) return '';

  if (s.match(/^\d{4}-\d{2}-\d{2}T/)) {
    var d1 = new Date(s);
    if (!isNaN(d1.getTime())) {
      return Utilities.formatDate(d1, Session.getScriptTimeZone(), 'MM/dd/yyyy');
    }
  }

  if (s.match(/^\d{4}-\d{2}-\d{2}$/)) {
    var d2 = new Date(s + 'T00:00:00');
    if (!isNaN(d2.getTime())) {
      return Utilities.formatDate(d2, Session.getScriptTimeZone(), 'MM/dd/yyyy');
    }
  }

  return s;
}

function osha301_parseTime_(timeVal) {
  if (!timeVal) {
    return { text: '', ampm: '' };
  }

  if (Object.prototype.toString.call(timeVal) === '[object Date]') {
    var h = timeVal.getHours();
    var m = timeVal.getMinutes();
    if (isNaN(h) || isNaN(m)) return { text: '', ampm: '' };
    var ap = h < 12 ? 'AM' : 'PM';
    var h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return { text: Utilities.formatString('%d:%02d', h12, m), ampm: ap };
  }

  var s = String(timeVal).trim();
  if (!s) return { text: '', ampm: '' };

  var hasAM = /AM/i.test(s);
  var hasPM = /PM/i.test(s);
  if (hasAM || hasPM) {
    var cleaned = s.replace(/\s?(AM|PM)/i, '').trim();
    var parts = cleaned.split(':');
    var hStr = parts[0] || '0';
    var mStr = parts[1] || '00';
    var text = Utilities.formatString('%d:%02d', parseInt(hStr, 10), parseInt(mStr, 10));
    return { text: text, ampm: hasAM ? 'AM' : 'PM' };
  }

  var p = s.split(':');
  if (p.length >= 2) {
    var h24 = parseInt(p[0], 10);
    var m24 = parseInt(p[1], 10);
    if (isNaN(h24) || isNaN(m24)) return { text: '', ampm: '' };
    var ap2 = h24 < 12 ? 'AM' : 'PM';
    var h12b = h24 % 12;
    if (h12b === 0) h12b = 12;
    return { text: Utilities.formatString('%d:%02d', h12b, m24), ampm: ap2 };
  }

  return { text: s, ampm: '' };
}

function osha301_getRowObject_(headers, row) {
  var obj = {};
  for (var i = 0; i < headers.length; i++) {
    obj[osha301_toText_(headers[i]).trim()] = row[i];
  }
  return obj;
}

function osha301_getOptionalValue_(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : '';
}

function osha301_normalizeGender_(value) {
  var s = osha301_toText_(value).trim().toLowerCase();
  if (s === 'male' || s === 'm') return 'Male';
  if (s === 'female' || s === 'f') return 'Female';
  return '';
}

function osha301_normalizeYesNo_(value) {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  var s = osha301_toText_(value).trim().toLowerCase();
  if (!s) return '';
  if (['yes', 'y', 'true', '1'].indexOf(s) !== -1) return 'Yes';
  if (['no', 'n', 'false', '0'].indexOf(s) !== -1) return 'No';
  return '';
}

function osha301_drawWrappedText_(page, text, x, y, maxWidth, lineHeight, font, fontSize) {
  text = osha301_toText_(text);
  if (!text) return;
  var words = text.split(/\s+/);
  var line = '';
  var currentY = y;

  for (var i = 0; i < words.length; i++) {
    var testLine = line ? line + ' ' + words[i] : words[i];
    var testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > maxWidth && line) {
      page.drawText(line, { x: x, y: currentY, size: fontSize, font: font });
      line = words[i];
      currentY -= lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    page.drawText(line, { x: x, y: currentY, size: fontSize, font: font });
  }
}

function osha301_drawDateAsMDY_(page, value, xMonth, xDay, xYear, y, font, fontSize) {
  var formatted = osha301_formatDateForPdf_(value);
  if (!formatted) return;
  var parts = formatted.split('/');
  if (parts.length === 3) {
    page.drawText(parts[0], { x: xMonth, y: y, size: fontSize, font: font });
    page.drawText(parts[1], { x: xDay, y: y, size: fontSize, font: font });
    page.drawText(parts[2], { x: xYear, y: y, size: fontSize, font: font });
  } else {
    page.drawText(formatted, { x: xMonth, y: y, size: fontSize, font: font });
  }
}

/**
 * Generates PDFs for all rows starting from row 2.
 */
function generateAllOSHA301() {
  var ss = SpreadsheetApp.openById(OSHA301_SPREADSHEET_ID);
  var sheet = ss.getSheetByName(OSHA301_SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet not found: ' + OSHA301_SHEET_NAME);
  }

  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  if (lastRow < 2) {
    Logger.log('No data rows found.');
    return;
  }

  for (var rowNumber = 2; rowNumber <= lastRow; rowNumber++) {
    var rowValues = sheet.getRange(rowNumber, 1, 1, lastColumn).getValues()[0];
    var isBlank = rowValues.every(function (v) {
      return v === '' || v === null;
    });
    if (isBlank) {
      Logger.log('Skipping blank row ' + rowNumber);
      continue;
    }
    try {
      generateOSHA301ForRow(rowNumber);
      Logger.log('Generated OSHA 301 PDF for row ' + rowNumber);
    } catch (err) {
      Logger.log('Error on row ' + rowNumber + ': ' + err.message);
    }
  }
}

/**
 * Generates PDF for one specific row number.
 * @param {number} rowNumber
 */
async function generateOSHA301ForRow(rowNumber) {
  loadPdfLibOsha301_();
  var PdfLib = PDFLib;

  var ss = SpreadsheetApp.openById(OSHA301_SPREADSHEET_ID);
  var sheet = ss.getSheetByName(OSHA301_SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet not found: ' + OSHA301_SHEET_NAME);
  }

  var lastColumn = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var row = sheet.getRange(rowNumber, 1, 1, lastColumn).getValues()[0];
  var rowObj = osha301_getRowObject_(headers, row);

  var completedByName = osha301_getOptionalValue_(rowObj, 'completedBy');
  var title = osha301_getOptionalValue_(rowObj, 'completedByTitle');
  var phone = osha301_getOptionalValue_(rowObj, 'firmPhone');
  var dateOfFormCompletion = osha301_getOptionalValue_(rowObj, 'signedDate');

  var fullName = osha301_getOptionalValue_(rowObj, 'employeeName');
  var street = osha301_getOptionalValue_(rowObj, 'EmployeeAddressStreet') || osha301_getOptionalValue_(rowObj, 'employeeAddress');
  var city = osha301_getOptionalValue_(rowObj, 'EmployeeAddressCity');
  var state = osha301_getOptionalValue_(rowObj, 'EmployeeAddressState');
  var zip = osha301_getOptionalValue_(rowObj, 'EmployeeAddressZIP');
  var dob = osha301_getOptionalValue_(rowObj, 'employeeDateOfBirth');
  var dateHired = osha301_getOptionalValue_(rowObj, 'hireDate');

  var dateOfInjury = osha301_getOptionalValue_(rowObj, 'dateOfInjury');
  var timeEmployeeBeginWork = osha301_getOptionalValue_(rowObj, 'workStartTime');
  var timeOfEvent = osha301_getOptionalValue_(rowObj, 'injuryTime');
  var activityPrior = osha301_getOptionalValue_(rowObj, 'specificActivity');
  var whatHappened = osha301_getOptionalValue_(rowObj, 'howInjuryOccurred');
  var injuryDesc = osha301_getOptionalValue_(rowObj, 'injuryDescription');
  var harmedBy = osha301_getOptionalValue_(rowObj, 'equipmentUsed');

  var employeeGender = osha301_normalizeGender_(osha301_getOptionalValue_(rowObj, 'sex'));
  var nameOfPhysician = osha301_getOptionalValue_(rowObj, 'NameOfPhysician');
  var facilityName = osha301_getOptionalValue_(rowObj, 'FacilityName');
  var facilityStreetNumber = osha301_getOptionalValue_(rowObj, 'FacilityStreetNumber');
  var facilityCity = osha301_getOptionalValue_(rowObj, 'FacilityCity');
  var facilityState = osha301_getOptionalValue_(rowObj, 'FacilityState');
  var facilityZip = osha301_getOptionalValue_(rowObj, 'FacilityZip');
  var employeeTreatedInEmergency = osha301_normalizeYesNo_(osha301_getOptionalValue_(rowObj, 'EmployeeTreatedInEmergency'));
  var wasEmployeeHospitalized = osha301_normalizeYesNo_(osha301_getOptionalValue_(rowObj, 'WasEmployeeHospitalized'));

  var beginWorkParsed = osha301_parseTime_(timeEmployeeBeginWork);
  var eventParsed = osha301_parseTime_(timeOfEvent);

  Logger.log('beginWorkParsed: text=' + beginWorkParsed.text + ' ampm=' + beginWorkParsed.ampm);
  Logger.log('eventParsed: text=' + eventParsed.text + ' ampm=' + eventParsed.ampm);

  var templateFile = DriveApp.getFileById(OSHA301_TEMPLATE_FILE_ID);
  var pdfBytes = templateFile.getBlob().getBytes();
  var pdfDoc = await PdfLib.PDFDocument.load(new Uint8Array(pdfBytes));

  try {
    var form = pdfDoc.getForm();
    form.flatten();
  } catch (e) {
    Logger.log('No form fields found or flatten failed: ' + e.message);
  }

  var page = pdfDoc.getPages()[0];
  var font = await pdfDoc.embedFont(PdfLib.StandardFonts.Helvetica);
  var fontBold = await pdfDoc.embedFont(PdfLib.StandardFonts.HelveticaBold);
  var fontSize = 10;
  var smallFontSize = 9;

  // LEFT / EMPLOYEE SECTION
  page.drawText(osha301_toText_(fullName), { x: 380, y: 475, size: fontSize, font: font });
  page.drawText(osha301_toText_(street), { x: 380, y: 450, size: fontSize, font: font });
  page.drawText(osha301_toText_(city), { x: 350, y: 418, size: fontSize, font: font });
  page.drawText(osha301_toText_(state), { x: 470, y: 418, size: fontSize, font: font });
  page.drawText(osha301_toText_(zip), { x: 530, y: 418, size: fontSize, font: font });

  osha301_drawDateAsMDY_(page, dob, 360, 390, 420, 400, font, fontSize);
  osha301_drawDateAsMDY_(page, dateHired, 360, 390, 420, 370, font, fontSize);

  if (employeeGender === 'Male') {
    page.drawText('X', { x: 309, y: 335, size: 10, font: font });
  } else if (employeeGender === 'Female') {
    page.drawText('X', { x: 340, y: 335, size: 10, font: font });
  }

  // PHYSICIAN / FACILITY SECTION
  page.drawText(osha301_toText_(nameOfPhysician), { x: 350, y: 287, size: fontSize, font: font });
  page.drawText(osha301_toText_(facilityName), { x: 350, y: 213, size: fontSize, font: font });
  page.drawText(osha301_toText_(facilityStreetNumber), { x: 350, y: 184, size: fontSize, font: font });
  page.drawText(osha301_toText_(facilityCity), { x: 350, y: 155, size: fontSize, font: font });
  page.drawText(osha301_toText_(facilityState), { x: 480, y: 155, size: fontSize, font: font });
  page.drawText(osha301_toText_(facilityZip), { x: 538, y: 155, size: fontSize, font: font });

  if (employeeTreatedInEmergency === 'Yes') {
    page.drawText('X', { x: 311, y: 146, size: 10, font: font });
  } else if (employeeTreatedInEmergency === 'No') {
    page.drawText('X', { x: 311, y: 109, size: 10, font: font });
  }

  if (wasEmployeeHospitalized === 'Yes') {
    page.drawText('X', { x: 311, y: 80, size: 10, font: font });
  } else if (wasEmployeeHospitalized === 'No') {
    page.drawText('X', { x: 311, y: 65, size: 10, font: font });
  }

  // RIGHT / CASE SECTION
  osha301_drawDateAsMDY_(page, dateOfInjury, 710, 740, 780, 455, font, fontSize);

  page.drawText(beginWorkParsed.text, { x: 740, y: 430, size: fontSize, font: font });
  if (beginWorkParsed.ampm === 'AM') {
    page.drawText('X', { x: 817, y: 430, size: 10, font: font });
  } else if (beginWorkParsed.ampm === 'PM') {
    page.drawText('X', { x: 835, y: 430, size: 10, font: font });
  }

  page.drawText(eventParsed.text, { x: 710, y: 410, size: fontSize, font: font });
  if (eventParsed.ampm === 'AM') {
    page.drawText('X', { x: 775, y: 410, size: 10, font: font });
  } else if (eventParsed.ampm === 'PM') {
    page.drawText('X', { x: 790, y: 410, size: 10, font: font });
  } else {
    page.drawText('X', { x: 810, y: 410, size: 10, font: font });
  }

  // NARRATIVE BOXES
  osha301_drawWrappedText_(page, activityPrior, 610, 335, 370, 10, font, smallFontSize);
  osha301_drawWrappedText_(page, whatHappened, 610, 250, 370, 10, font, smallFontSize);
  osha301_drawWrappedText_(page, injuryDesc, 610, 180, 370, 10, font, smallFontSize);
  osha301_drawWrappedText_(page, harmedBy, 610, 120, 370, 10, font, smallFontSize);

  // COMPLETED BY BOX
  page.drawText(osha301_toText_(completedByName), { x: 110, y: 130, size: fontSize, font: font });
  page.drawText(osha301_toText_(title), { x: 110, y: 100, size: fontSize, font: font });
  page.drawText(osha301_toText_(phone), { x: 70, y: 75, size: fontSize, font: font });
  osha301_drawDateAsMDY_(page, dateOfFormCompletion, 200, 225, 250, 75, font, smallFontSize);

  var pdfBytesOut = await pdfDoc.save();

  var outputFolder = DriveApp.getFolderById(OSHA_OUTPUT_FOLDER_ID);
  var injuryDateForFile = osha301_formatDateForPdf_(dateOfInjury).replace(/\//g, '-');
  var finalFileName = 'Osha_301_' + osha301_safeFileName_(fullName) + '_' + injuryDateForFile + '.pdf';

  var existing = outputFolder.getFilesByName(finalFileName);
  while (existing.hasNext()) {
    existing.next().setTrashed(true);
  }

  var blob = Utilities.newBlob(
    [...new Uint8Array(pdfBytesOut)],
    MimeType.PDF,
    finalFileName
  );
  outputFolder.createFile(blob);
}

/**
 * Generates OSHA 301 PDF for the row matching a given IID.
 * @param {string|number} iid
 */
function generateOSHA301ForIID(iid) {
  var ss = SpreadsheetApp.openById(OSHA301_SPREADSHEET_ID);
  var sheet = ss.getSheetByName(OSHA301_SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet not found: ' + OSHA301_SHEET_NAME);
  }

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    throw new Error('No data found in sheet.');
  }

  var headers = data[0];
  var iidColIndex = headers.indexOf('IID');
  if (iidColIndex === -1) {
    throw new Error('IID column not found in sheet.');
  }

  var iidStr = String(iid).trim();
  for (var r = 1; r < data.length; r++) {
    if (String(data[r][iidColIndex]).trim() === iidStr) {
      var rowNumber = r + 1;
      Logger.log('Found IID ' + iidStr + ' at row ' + rowNumber);
      return generateOSHA301ForRow(rowNumber);
    }
  }

  throw new Error('No row found for IID: ' + iidStr);
}

function testGenerateOSHA301SingleRow() {
  generateOSHA301ForIID('484f9e03');
}
