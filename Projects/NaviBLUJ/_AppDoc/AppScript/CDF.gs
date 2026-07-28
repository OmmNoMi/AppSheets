// ============ CONFIGURATION ============
const CDF_SHEET_NAME = "CDF";
const CDF_MODEL = "gemini-2.5-flash-lite";
const CDF_BATCH_SIZE = 50;
const CDF_SPREADSHEET_ID = "1yODjS7z0GiZKA1PCcIeEx_sf9yTuqUP-bHcnurOWNDQ";
const EMPLOYEE_SPREADSHEET_ID = "1DmHlAzrVXYWO9L8dnsLTSVF9opcepWz7lPPARfhO0Do";
const EMPLOYEE_SHEET_NAME = "Employee";
const MAX_INPUT_LENGTH = 1500;

// Feedback keywords that are NOT disputable per Amazon SOP
const UNDISPUTABLE_KEYWORDS = ["unprofessional", "mishandled package"];

// ============ MAIN ============
function generateCDFDisputeReasons() {
  const ss = SpreadsheetApp.openById(CDF_SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CDF_SHEET_NAME);
  if (!sheet) throw new Error(`Sheet not found: ${CDF_SHEET_NAME}`);

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return;

  const headers = data[0];
  const col = cdfMapHeaders(headers);

  const requiredHeaders = [
    "TBA", "Photo", "FeedbackDetails", "FeedbackType", "CustomerNotes",
    "DropOffLocation", "Distance", "TransporterId", "NonDisputable",
    "DisputeReason", "Dispute_Text", "DisputeStrength",
    "EmployeeId", "AIProcessedAt", "AIModelUsed", "ErrorMessage"
  ];
  for (const h of requiredHeaders) {
    if (col[h] === undefined) throw new Error(`Missing required header: ${h}`);
  }

  const apiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY in Script Properties. Set it via Project Settings > Script Properties.");

  // Load prompt template from AppVariables
  const promptTemplate = cdfLoadPromptTemplate();
  if (!promptTemplate) throw new Error("Could not load CDF_Prompt from AppVariables sheet.");
  Logger.log(`Loaded prompt template (${promptTemplate.length} chars).`);

  // Load Employee map once: TransporterID → EmployeeID
  const employeeMap = cdfLoadEmployeeMap();
  Logger.log(`Loaded ${Object.keys(employeeMap).length} employee mappings.`);

  let processed = 0;
  for (let r = 1; r < data.length; r++) {
    if (processed >= CDF_BATCH_SIZE) break;

    const row = data[r];
    const disputeReason = cdfSafeString(row[col["DisputeReason"]]);

    // Already has a reason — skip
    if (disputeReason) continue;

    const rowNum = r + 1;

    // ---- Read row fields ----
    const tba = cdfSafeString(row[col["TBA"]]);
    const transporterId = cdfSafeString(row[col["TransporterId"]]);
    const currentEmployeeId = cdfSafeString(row[col["EmployeeId"]]);
    const feedbackDetails = cdfTruncate(cdfSafeString(row[col["FeedbackDetails"]]));
    const feedbackType = cdfTruncate(cdfSafeString(row[col["FeedbackType"]]));
    const customerNotes = cdfTruncate(cdfSafeString(row[col["CustomerNotes"]]));
    const dropoffLocation = cdfTruncate(cdfSafeString(row[col["DropOffLocation"]]));
    const distance = cdfSafeString(row[col["Distance"]]);
    const combinedText = (feedbackDetails + " " + feedbackType + " " + customerNotes).toLowerCase();

    // ---- EmployeeId lookup ----
    const employeeId = (transporterId && !currentEmployeeId)
      ? (employeeMap[transporterId] || "")
      : currentEmployeeId;
    if (transporterId && !employeeId) {
      Logger.log(`Row ${rowNum}: No EmployeeId found for TransporterId: ${transporterId}`);
    }

    // ---- Check for undisputable feedback (DA unprofessional / mishandled) ----
    if (cdfIsUndisputable(combinedText)) {
      cdfWriteRow(sheet, rowNum, col, {
        EmployeeId: employeeId,
        NonDisputable: "TRUE",
        DisputeReason: "NOT_DISPUTABLE_PER_SOP",
        Dispute_Text: tba ? tba + "-NOT_DISPUTABLE_PER_SOP" : "NOT_DISPUTABLE_PER_SOP",
        DisputeStrength: 0,
        AIProcessedAt: new Date(),
        AIModelUsed: CDF_MODEL,
        ErrorMessage: ""
      });
      processed++;
      continue;
    }

    const nonDisputable = cdfParseBoolean(row[col["NonDisputable"]]);

    // Non-disputable — mark and skip
    if (nonDisputable) {
      cdfWriteRow(sheet, rowNum, col, {
        EmployeeId: employeeId,
        DisputeStrength: 0,
        AIProcessedAt: new Date(),
        AIModelUsed: CDF_MODEL,
        ErrorMessage: ""
      });
      continue;
    }

    const photoUrl = cdfSafeString(row[col["Photo"]]);

    try {
      // If photo URL exists, try to get the image blob from Google Drive
      let imageBlob = null;
      if (photoUrl) {
        imageBlob = cdfGetDriveImageBlob(photoUrl);
        if (!imageBlob) {
          Logger.log(`Row ${rowNum}: Could not fetch image from: ${photoUrl}`);
        }
      }

      // Single Gemini call per row: include image if available
      const aiResult = cdfCallGemini(apiKey, CDF_MODEL, promptTemplate, {
        feedbackDetails,
        feedbackType,
        customerNotes,
        dropoffLocation,
        distance
      }, imageBlob);

      if (aiResult.reason === "ERROR") {
        cdfWriteRow(sheet, rowNum, col, {
          EmployeeId: employeeId,
          DisputeReason: "ERROR",
          DisputeStrength: "",
          AIProcessedAt: new Date(),
          AIModelUsed: CDF_MODEL,
          ErrorMessage: "Gemini call failed"
        });
      } else {
        cdfWriteRow(sheet, rowNum, col, {
          EmployeeId: employeeId,
          DisputeReason: aiResult.reason,
          Dispute_Text: tba ? tba + "-" + aiResult.reason : aiResult.reason,
          DisputeStrength: aiResult.strength,
          AIProcessedAt: new Date(),
          AIModelUsed: CDF_MODEL,
          ErrorMessage: ""
        });
      }
    } catch (e) {
      Logger.log(`Row ${rowNum} error: ${e}`);
    }

    processed++;
    Utilities.sleep(1200);
  }

  Logger.log(`Processed ${processed} rows.`);
}

// ============ EMPLOYEE MAP ============
function cdfLoadEmployeeMap() {
  const map = {};
  try {
    const ss = SpreadsheetApp.openById(EMPLOYEE_SPREADSHEET_ID);
    const sheet = ss.getSheetByName(EMPLOYEE_SHEET_NAME);
    if (!sheet) {
      Logger.log(`Employee sheet not found: ${EMPLOYEE_SHEET_NAME}`);
      return map;
    }

    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return map;

    const headers = data[0];
    const col = cdfMapHeaders(headers);

    if (col["TransporterID"] === undefined || col["EmployeeID"] === undefined) {
      Logger.log(`Employee sheet missing required columns. Headers: ${headers.join(", ")}`);
      return map;
    }

    for (let i = 1; i < data.length; i++) {
      const tid = cdfSafeString(data[i][col["TransporterID"]]);
      const eid = cdfSafeString(data[i][col["EmployeeID"]]);
      if (tid && eid) {
        map[tid] = eid;
      }
    }
  } catch (e) {
    Logger.log("Error loading Employee map: " + e);
  }
  return map;
}

// ============ PROMPT TEMPLATE ============
function cdfLoadPromptTemplate() {
  try {
    const ss = SpreadsheetApp.openById("14GWZ56BT17fvD1l0QiOndQEo107buyp2C3kSMKMH4_M");
    const sheet = ss.getSheetByName("AppVariables");
    if (!sheet) {
      Logger.log("AppVariables sheet not found.");
      return null;
    }

    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return null;

    const headers = data[0];
    const col = cdfMapHeaders(headers);

    if (col["ID"] === undefined || col["EnumValue"] === undefined) {
      Logger.log(`AppVariables sheet missing required columns (ID, EnumValue). Headers: ${headers.join(", ")}`);
      return null;
    }

    for (let i = 1; i < data.length; i++) {
      if (cdfSafeString(data[i][col["ID"]]) === "CDF_Prompt") {
        const value = cdfSafeString(data[i][col["EnumValue"]]);
        if (!value) {
          Logger.log("CDF_Prompt row found but EnumValue is empty.");
          return null;
        }
        return value;
      }
    }

    Logger.log("CDF_Prompt row not found in AppVariables.");
    return null;
  } catch (e) {
    Logger.log("Error loading prompt template: " + e);
    return null;
  }
}

// ============ UNDISPUTABLE CHECK ============
function cdfIsUndisputable(combinedTextLower) {
  for (const keyword of UNDISPUTABLE_KEYWORDS) {
    if (combinedTextLower.indexOf(keyword) !== -1) {
      return true;
    }
  }
  return false;
}

// ============ GOOGLE DRIVE IMAGE FETCH ============
function cdfGetDriveImageBlob(url) {
  try {
    const fileId = cdfExtractDriveFileId(url);
    if (!fileId) {
      Logger.log("Could not extract file ID from URL: " + url);
      return null;
    }

    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    const mimeType = blob.getContentType() || "";

    if (!mimeType.startsWith("image/")) {
      Logger.log(`Drive file is not an image. Mime: ${mimeType}, ID: ${fileId}`);
      return null;
    }

    if (blob.getBytes().length === 0) {
      Logger.log(`Drive image is empty. ID: ${fileId}`);
      return null;
    }

    Logger.log(`Fetched Drive image. ID: ${fileId}, Mime: ${mimeType}, Size: ${blob.getBytes().length}`);
    return blob;
  } catch (e) {
    Logger.log("Drive image fetch error: " + e);
    return null;
  }
}

function cdfExtractDriveFileId(url) {
  if (!url) return null;

  // Pattern: /file/d/FILE_ID/ or /d/FILE_ID/
  let match = url.match(/\/(?:file\/)?d\/([a-zA-Z0-9_-]{10,})/);
  if (match) return match[1];

  // Pattern: ?id=FILE_ID or &id=FILE_ID
  match = url.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (match) return match[1];

  // Pattern: /open?id=FILE_ID
  match = url.match(/open\?id=([a-zA-Z0-9_-]{10,})/);
  if (match) return match[1];

  return null;
}

// ============ GEMINI API ============
function cdfCallGemini(apiKey, model, promptTemplate, input, imageBlob) {
  const prompt = cdfBuildPrompt(promptTemplate, input, imageBlob !== null);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const parts = [{ text: prompt }];

  if (imageBlob) {
    const bytes = imageBlob.getBytes();
    const mimeType = imageBlob.getContentType() || "image/jpeg";
    parts.push({
      inline_data: {
        mime_type: mimeType,
        data: Utilities.base64Encode(bytes)
      }
    });
  }

  const payload = {
    contents: [{ parts: parts }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 350
    }
  };

  const response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const code = response.getResponseCode();
  if (code !== 200) {
    Logger.log(`Gemini call failed. Code: ${code}, Body: ${response.getContentText().substring(0, 300)}`);
    return { reason: "ERROR", strength: "ERROR" };
  }

  const json = JSON.parse(response.getContentText());
  return cdfParseGeminiResponse(json);
}

// ============ PROMPT ============
/**
 * Builds the final prompt by replacing placeholders in the template from AppVariables.
 *
 * Supported placeholders in the template:
 *   {{FEEDBACK_TYPE}}, {{FEEDBACK_DETAILS}}, {{CUSTOMER_NOTES}},
 *   {{DROPOFF_LOCATION}}, {{DISTANCE}}, {{HAS_IMAGE}}
 */
function cdfBuildPrompt(template, input, hasImage) {
  const imageText = hasImage
    ? "Yes — analyze the photo carefully. Describe what you see (package placement, surroundings, door/porch condition) and use it as evidence in the dispute."
    : "No";

  return template
    .replace(/\{\{FEEDBACK_TYPE\}\}/g, input.feedbackType || "N/A")
    .replace(/\{\{FEEDBACK_DETAILS\}\}/g, input.feedbackDetails || "N/A")
    .replace(/\{\{CUSTOMER_NOTES\}\}/g, input.customerNotes || "N/A")
    .replace(/\{\{DROPOFF_LOCATION\}\}/g, input.dropoffLocation || "N/A")
    .replace(/\{\{DISTANCE\}\}/g, input.distance || "N/A")
    .replace(/\{\{HAS_IMAGE\}\}/g, imageText);
}

function cdfParseGeminiResponse(json) {
  try {
    const candidates = json.candidates;
    if (!candidates || candidates.length === 0) {
      Logger.log("No candidates in Gemini response");
      return { reason: "ERROR", strength: "ERROR" };
    }

    const parts = candidates[0].content && candidates[0].content.parts;
    if (!parts || parts.length === 0) {
      Logger.log("No parts in Gemini response");
      return { reason: "ERROR", strength: "ERROR" };
    }

    const text = parts[0].text;
    if (!text || !text.trim()) {
      Logger.log("Empty text in Gemini response");
      return { reason: "ERROR", strength: "ERROR" };
    }

    const cleaned = text.trim();

    // Parse DISPUTE_REASON
    const reasonMatch = cleaned.match(/DISPUTE_REASON:\s*(.+?)(?:\n|$)/s);
    const strengthMatch = cleaned.match(/DISPUTE_STRENGTH:\s*(\d{1,2})/);

    let reason = "";
    let strength = 0;

    if (reasonMatch && reasonMatch[1]) {
      reason = reasonMatch[1].trim();
      // Remove wrapping quotes
      if ((reason.startsWith('"') && reason.endsWith('"')) ||
          (reason.startsWith("'") && reason.endsWith("'"))) {
        reason = reason.slice(1, -1).trim();
      }
    }

    if (strengthMatch && strengthMatch[1]) {
      const parsed = parseInt(strengthMatch[1], 10);
      strength = isNaN(parsed) ? 0 : Math.min(10, Math.max(0, parsed));
    }

    if (!reason) {
      // Fallback: use entire response as reason if format wasn't followed
      reason = cleaned.replace(/DISPUTE_STRENGTH:\s*\d{1,2}/, "").trim();
      if (reason.startsWith("DISPUTE_REASON:")) {
        reason = reason.substring("DISPUTE_REASON:".length).trim();
      }
    }

    if (!reason) {
      return { reason: "ERROR", strength: "ERROR" };
    }

    return { reason: reason, strength: strength };
  } catch (e) {
    Logger.log("Error parsing Gemini response: " + e);
    return { reason: "ERROR", strength: "ERROR" };
  }
}

// ============ HELPERS ============
/**
 * Writes all updated columns for a single row in one batch, then flushes.
 * @param {Sheet} sheet
 * @param {number} rowNumber - 1-based row number
 * @param {Object} col - header-to-column-index map
 * @param {Object} updates - { HeaderName: value } for each column to write
 */
function cdfWriteRow(sheet, rowNumber, col, updates) {
  for (const header in updates) {
    if (col[header] === undefined) continue;
    const value = updates[header];
    sheet.getRange(rowNumber, col[header] + 1).setValue(value !== undefined && value !== null ? value : "");
  }
  SpreadsheetApp.flush();
}

function cdfMapHeaders(headers) {
  const col = {};
  headers.forEach((h, i) => { col[String(h).trim()] = i; });
  return col;
}

function cdfSafeString(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function cdfTruncate(str) {
  if (str.length <= MAX_INPUT_LENGTH) return str;
  return str.substring(0, MAX_INPUT_LENGTH) + "...";
}

function cdfParseBoolean(value) {
  const v = cdfSafeString(value).toLowerCase();
  return v === "true" || v === "yes" || v === "y" || v === "1";
}
