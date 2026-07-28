/**
 * Sync ADP punches from ADPReport to Everyday for today in LA timezone
 * Expects helper function buildAdpToEmployeeMap_(employeeSheet, daslocation) to exist
 */

function syncAdpPunchesToEveryday() {
  const TZ = "America/Los_Angeles";
  const EMP_SHEET = "Employee";
  const ADP_SHEET = "ADPReport";
  const EVERYDAY_SHEET = "Everyday2";
  const EV_FETCH_LIMIT = 200;
  const DRY_RUN = false;

  const ss = SpreadsheetApp.openById(NAVI_OPS);
  const employeeSheet = ss.getSheetByName(EMP_SHEET);
  const adpSheet = ss.getSheetByName(ADP_SHEET);
  const everydaySheet = ss.getSheetByName(EVERYDAY_SHEET);

  if (!employeeSheet || !adpSheet || !everydaySheet) {
    console.log("Missing sheet reference. Required Employee, ADPReport, Everyday");
    return;
  }

  const todayStr = Utilities.formatDate(new Date(), TZ, "M/d/yyyy");

  // Fremont mapping through external helper
  const adpIdToEmpId = buildAdpToEmployeeMap_(employeeSheet, "Fremont");

  // ADP report grouping
  const adpHeaders = getHeaderMap_(adpSheet);
  requireHeaders_(adpHeaders, ["Company Code", "Position ID", "In time", "Out time"], "ADPReport");

  const adpValues = adpSheet.getRange(
    2,
    1,
    Math.max(0, adpSheet.getLastRow() - 1),
    adpSheet.getLastColumn()
  ).getValues();

  const groups = {};

  for (const row of adpValues) {
    const company = cellText_(row[adpHeaders["Company Code"]]);
    const positionId = cellText_(row[adpHeaders["Position ID"]]);
    const inCell = row[adpHeaders["In time"]];
    const outCell = row[adpHeaders["Out time"]];
    if (!inCell) continue;

    const inDate = parseMmDdYyTime_(inCell, TZ);
    if (!inDate) continue;

    const inDateStr = Utilities.formatDate(inDate, TZ, "M/d/yyyy");
    if (inDateStr !== todayStr) continue;

    const parsedPosId = parsePositionId_(company, positionId);
    if (!parsedPosId) continue;

    const key = parsedPosId + "|" + inDateStr;
    if (!groups[key]) groups[key] = [];
    groups[key].push({ inCell, outCell, inDate, parsedPosId });
  }

  // Everyday indexing
  const evHeaders = getHeaderMap_(everydaySheet);
  requireHeaders_(
    evHeaders,
    ["ADPIN", "ADPMealIN", "ADPMealOut", "ADPOut", "EmployeeID", "Date"],
    "Everyday"
  );

  const lastRow = everydaySheet.getLastRow();
  const totalRows = Math.max(0, lastRow - 1);
  const rowsToFetch = Math.min(EV_FETCH_LIMIT, totalRows);
  const startRow = lastRow - rowsToFetch + 1;

  const evValues = everydaySheet.getRange(
    startRow,
    1,
    rowsToFetch,
    everydaySheet.getLastColumn()
  ).getValues();

  const evIndex = {};
  for (let i = 0; i < evValues.length; i++) {
    const row = evValues[i];
    const empId = cellText_(row[evHeaders["EmployeeID"]]);
    const dateStr = normalizeDateCellToMDY_(row[evHeaders["Date"]], TZ);
    if (!empId || !dateStr) continue;
    evIndex[empId + "|" + dateStr] = startRow + i;
  }

  const pendingWrites = {};

  for (const key of Object.keys(groups)) {
    const rows = groups[key];
    const parts = key.split("|");
    const parsedPosId = parts[0];
    const dateStr = parts[1];

    const employeeId = adpIdToEmpId[parsedPosId];
    if (!employeeId) continue;

    rows.sort(function (a, b) {
      return a.inDate - b.inDate;
    });

    const punches = composePunches_(rows);
    if (punches.ignoreReason) continue;

    const evRow = evIndex[employeeId + "|" + dateStr];
    if (!evRow) continue;

    const newValues = {};
    const colMap = {
      ADPIN: evHeaders["ADPIN"],
      ADPMealIN: evHeaders["ADPMealIN"],
      ADPMealOut: evHeaders["ADPMealOut"],
      ADPOut: evHeaders["ADPOut"]
    };

    for (const label in colMap) {
      const newText = punches[label];
      if (!newText) continue;

      const col = colMap[label] + 1;
      const existingDisplay = String(
        everydaySheet.getRange(evRow, col).getDisplayValue() || ""
      ).trim();

      // plain string comparison
      if (!existingDisplay) {
        newValues[label] = newText;
      } else if (existingDisplay !== newText) {
        console.log(
          "Mismatch row " +
            evRow +
            " " +
            label +
            ". Existing=" +
            existingDisplay +
            " New=" +
            newText
        );
      }
    }

    if (Object.keys(newValues).length > 0) {
      pendingWrites[evRow] = newValues;
    }
  }

  if (!DRY_RUN && Object.keys(pendingWrites).length > 0) {
    console.log("Writing " + Object.keys(pendingWrites).length + " rows");
    const timeCols = ["ADPIN", "ADPMealIN", "ADPMealOut", "ADPOut"];

    for (const label of timeCols) {
      const colIndex = evHeaders[label] + 1;

      for (const rowKey in pendingWrites) {
        const vals = pendingWrites[rowKey];
        if (!vals[label]) continue;
        everydaySheet.getRange(Number(rowKey), colIndex).setValue(String(vals[label]));
      }
    }
  }

  if (!DRY_RUN) {
    clearReportData(adpSheet, "ADPReport");
  }

  console.log("Completed syncAdpPunchesToEveryday");
}

/**
 * Build punches as text and append seconds when needed
 */
function composePunches_(rows) {
  const fix = function (s) {
    return ensureSeconds_(s);
  };

  if (rows.length === 1) {
    const r = rows[0];
    return {
      ADPIN: fix(r.inCell),
      ADPMealIN: r.outCell ? fix(r.outCell) : "",
      ADPMealOut: "",
      ADPOut: ""
    };
  }

  if (rows.length === 2) {
    const r1 = rows[0];
    const r2 = rows[1];
    return {
      ADPIN: fix(r1.inCell),
      ADPMealIN: fix(r1.outCell),
      ADPMealOut: fix(r2.inCell),
      ADPOut: fix(r2.outCell)
    };
  }

  return { ignoreReason: "More than two rows present" };
}

/**
 * Append :00 seconds if pattern is like M/d/yy HH:mm or M/d/yyyy HH:mm
 */
function ensureSeconds_(value) {
  if (!value) return "";
  var t = String(value).trim();

  if (/:\d{2}:\d{2}$/.test(t)) return t;
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}\s+\d{1,2}:\d{2}$/.test(t)) return t + ":00";

  return t;
}

/**
 * Utilities
 */

function parsePositionId_(companyCode, positionId) {
  if (!positionId) return "";
  var pos = String(positionId);
  var cc = String(companyCode || "");
  if (cc && pos.indexOf(cc) === 0) pos = pos.substring(cc.length);
  return pos.replace(/^0+/, "");
}

function getHeaderMap_(sheet) {
  var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var map = {};
  header.forEach(function (h, i) {
    var name = String(h || "").trim();
    if (name) map[name] = i;
  });
  return map;
}

function requireHeaders_(map, headers, sheetName) {
  headers.forEach(function (h) {
    if (!(h in map)) throw new Error("Missing header " + h + " in " + sheetName);
  });
}

function cellText_(v) {
  if (!v) return "";
  if (Object.prototype.toString.call(v) === "[object Date]") {
    return Utilities.formatDate(v, "America/Los_Angeles", "M/d/yyyy H:mm");
  }
  return String(v).trim();
}

function parseMmDdYyTime_(s, tz) {
  if (!s) return null;
  if (Object.prototype.toString.call(s) === "[object Date]") return s;

  var str = String(s).trim();
  var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})\s+(\d{1,2}):(\d{2})$/);
  if (m) {
    var mm = Number(m[1]);
    var dd = Number(m[2]);
    var yy = Number(m[3]);
    var HH = Number(m[4]);
    var Min = Number(m[5]);
    return new Date(2000 + yy, mm - 1, dd, HH, Min);
  }

  var d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function normalizeDateCellToMDY_(val, tz) {
  if (!val) return "";
  if (Object.prototype.toString.call(val) === "[object Date]") {
    return Utilities.formatDate(val, tz, "M/d/yyyy");
  }
  var t = String(val).trim();
  var m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return m[1] + "/" + m[2] + "/" + m[3];
  var d = new Date(t);
  return isNaN(d.getTime()) ? "" : Utilities.formatDate(d, tz, "M/d/yyyy");
}
