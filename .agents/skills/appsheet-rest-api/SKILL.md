---
name: appsheet-rest-api
description: Standards, prerequisites, and payload formatting rules for interacting with the AppSheet REST API from Python or external services. Use this skill when building integrations that push or pull data directly from an AppSheet app.
---

# AppSheet REST API Guidelines

This skill documents the hard-learned lessons for successful AppSheet REST API integrations.

---

## 1. Prerequisites for ANY AppSheet API Call

If an API call returns `HTTP 403 Forbidden: The API is not enabled for the called application...`, it means the integration is not fully configured in the AppSheet Editor.

**Checklist:**
1. Go to **Settings → Integrations → IN**
2. Ensure **Enable** is toggled to **ON** (blue). *(Generating the Access Key alone is not enough!)*
3. Ensure you have copied the **App Id** and the **Application Access Key**.
4. **SAVE** the app in the top right corner. The API will remain disabled until the save is complete.

---

## 2. App Credentials Registry (`app_keys.json`)

All project App IDs, Access Keys, and target Spreadsheet IDs should be registered in:
[.agents/skills/appsheet-rest-api/app_keys.json](file:///Users/ommnomi/AppSheets/.agents/skills/appsheet-rest-api/app_keys.json)

**Registry Format:**
```json
{
  "apps": {
    "OmmNoMi_Survey_Base": {
      "appId": "dc77165d-11eb-40cc-9f9a-9c94a875c920",
      "accessKey": "V2-nC5El-ttsQX-81ZGC-IWZOy-cwjew-58R45-cUyk8-ukw1P",
      "spreadsheetId": "1uLYuQWQCsJetVRDQcrRsWxoT7Q9cnpz2xAR1fL9diO4",
      "description": "Base Survey Template application keys"
    }
  }
}
```

---

## 3. API Endpoint Structure

All data modification requests (Add, Edit, Delete) go to:
```http
POST https://api.appsheet.com/api/v2/apps/{APP_ID}/tables/{TABLE_NAME}/Action
```
**Headers:**
```json
{
  "ApplicationAccessKey": "<ACCESS_KEY>",
  "Content-Type": "application/json"
}
```

---

## 3. Payload Formatting & Validation Rules

If an API call returns `HTTP 400 Bad Request`, it is almost always a schema validation failure.

**Rule 1: Enum / Ref strictness**
If a column is an `Enum` or `Ref` and is marked as Required (or lacks a valid Initial Value), you MUST include it in your payload. AppSheet will reject the row if it's missing.

**Rule 2: DateTime formatting**
AppSheet can be highly sensitive to DateTime formats when passed via API. If you rely on AppSheet's `Initial Value = NOW()` but the row fails validation, explicitly pass the date strings in the payload using `MM/DD/YYYY HH:MM:SS` format to bypass server-side calculation bugs.

**Rule 3: ID Generation**
While AppSheet's `UNIQUEID()` initial value often works, it is safer to generate your own UUID (e.g. `uuid.uuid4()[:8]`) and pass it as the Key column explicitly to ensure you know the ID of the created row.

### Standard Payload Example
```json
{
  "Action": "Add",
  "Properties": {
    "Locale": "en-US",
    "Timezone": "India Standard Time"
  },
  "Rows": [
    {
      "ID": "813c95dc",
      "Employee": "Omm",
      "Associate": "OmmNoMi",
      "Start_Time": "07/11/2026 19:50:00"
    }
  ]
}
```
