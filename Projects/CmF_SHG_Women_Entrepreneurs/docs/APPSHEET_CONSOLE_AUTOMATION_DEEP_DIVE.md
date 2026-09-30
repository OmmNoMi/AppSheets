# AppSheet DevTools Console Automation & Redux Engineering Deep Dive
> **OmmNoMi Automation LLP** | Operational Management & Next-gen Integration  
> **Document:** Enterprise Architecture & Technical Post-Mortem  
> **Target:** Automated AppSheet App Generation Directly from SRS via DevTools Redux  
> **Lead Engineers:** Nomeshwer Sharma & Hardik Sharma  

---

## 1. Executive Summary & Purpose

When building enterprise applications in AppSheet (such as the **Centre for microFinance (CmF) & RAJEEVIKA Study on SHG-led Women Entrepreneurs in Rajasthan**), configuring hundreds of columns, multilingual display names, deck views, and complex multi-row automation bots through the native web GUI requires dozens of hours of manual clicking. Every Expression Assistant popup introduces latency and the risk of human transcription errors.

By leveraging AppSheet's internal **Redux Store (`window.appStore`)**, an engineer can programmatically configure schemas, presentation controls, and automation bots in **milliseconds**.

However, doing so directly interacts with AppSheet's **C# .NET Backend Deserializer (`Jeenee.DataTypes`)**. If an injected JSON payload contains an invalid class name, misplaced `$type`, or missing field, AppSheet returns `Error 400: Something went wrong and your changes couldn't be saved`.

This guide documents the **entire reverse-engineering journey, every command executed, the root causes of all errors, and the definitive C# schema dictionary** so any developer can generate full AppSheet applications from an SRS in **one hit**.

---

## 2. AppSheet Modern Editor Architecture

The modern AppSheet Web Editor runs on React 18 and Redux. The entire application definition is held in a single central Redux state tree:

```
state.appTemplate.history[0].appTemplate
├── AppData
│   ├── DataSchemas        # Tables, physical columns, virtual columns, types, formulas
│   └── DataActions        # Atomic and composite actions (Survey, Survey_Tables)
├── Presentation
│   ├── Controls           # Forms, Decks, Tables, Detail views (ColumnOrder, Settings)
│   └── MenuEntries        # Navigation bar mapping
└── Behavior
    ├── AppEvents          # Event triggers (Change, ADDS_ONLY, UPDATES_ONLY)
    ├── AppProcesses       # Process workflows (If/Else branches, RunAction nodes)
    ├── AppBots            # Bots linking Events to Processes
    └── Tasks              # Backend tasks (Email, Webhook, DataChange)
```

All mutations are dispatched via:
```javascript
store.dispatch({
  type: 'SET_EDITOR_OPTIONS',
  nameValueDict: dict,
  recordHistory: true,
  ignoreConstraints: false,
  skipNavigation: false
});
store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
```

---

## 3. Step-by-Step Command Walkthrough & Error Post-Mortem

### Step 1: Initial Action Injection & Error 400
* **What We Executed:** `create_yes_step_action.js`
* **What Happened:** The UI created the step visually, but clicking the top-right **SAVE** button triggered:
  `Error 400: Something went wrong and your changes couldn't be saved.`
* **Root Cause Analysis:**
  1. We used `$type: "Jeenee.DataTypes.DataActionAddRow, Jeenee.DataTypes"`. In AppSheet's backend C# DLL, `DataActionAddRow` **does not exist**!
  2. We used `ActionType: "ADD_ROW_TO_ANOTHER_TABLE"`. The backend enum is actually `"ADD_RECORD_TO"`.
  3. We placed `$type` at the root of the Action object. In AppSheet, `$type` belongs exclusively inside `ActionDefinition`.
  4. We used `ReferencedTableName` and `InputParametersUsed`. The true C# properties are `ReferencedTable` and `Assignments`.
  5. The backend Newtonsoft.Json deserializer threw a `TypeNotFoundException` and rejected the payload with HTTP 400.

---

### Step 2: Attempting Native UI Event Simulation & Canvas Crash
* **What We Executed:** `trigger_svg_circle_click.js`
* **What Happened:** Pointer events dispatched successfully on the SVG `<circle>` under the YES branch, but the editor threw:
  `Uncaught TypeError: Cannot read properties of null (reading 'Task')` at `V.updateAppProcessNode`.
* **Root Cause Analysis:**
  When clicking the `(+)` icon on the visual canvas, AppSheet's UI handler tries to look up an existing Task in `Behavior.Tasks`. Because `Behavior.Tasks` was empty `[]`, it attempted `null.Task`, crashing the UI render tree.
  **Key Learning:** Never rely on DOM simulation inside canvas flowcharts. Redux direct injection is 100x cleaner, faster, and avoids canvas state crashes.

---

### Step 3: Deep Reverse-Engineering via Webpack Chunks
* **What We Executed:** `extract_action_schema.js` & `check_action_key.js`
* **How It Worked:** AppSheet's web application bundles all its JSON Schemas inside Webpack chunks. By scanning `window.webpackChunk` for C# type definitions, we discovered **Module 663518**:
  - `ADD_RECORD_TO`: `{"$type":"Jeenee.DataTypes.DataActionAddRowTo, Jeenee.DataTypes","ReferencedTable":null,"Assignments":[],"InputParametersUsed":null,...}`
  - `COMPOSITE`: `{"$type":"Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes","Actions":[],...}`
  - `RUN_ACTION`: `{"$type":"Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes","ExprLookup":{},"NodeType":"RUN_ACTION",...}`
* **Result:** We uncovered the 100% true, authentic C# schemas used by the backend server.

---

### Step 4: The 4-Tier Store Resolution & Final One-Hit Execution
* **What We Executed:** `one_hit_create_all_matrix_rows.js`
* **Why Store Resolution Failed Initially:** After a page reload, React Fiber nodes do not always store `store` on top-level elements.
* **The Universal Solution:**
  ```javascript
  function getStore() {
    if (window.appStore && window.appStore.dispatch) return window.appStore;
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      var fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
      if (!fKey) continue;
      var f = el[fKey];
      while (f) {
        if (f.memoizedProps?.store?.dispatch) { window.appStore = f.memoizedProps.store; return window.appStore; }
        if (f.stateNode?.store?.dispatch) { window.appStore = f.stateNode.store; return window.appStore; }
        f = f.return;
      }
    }
    return null;
  }
  ```
* **Execution Result:**
  - 15 individual row actions created (`ADD_RECORD_TO` / `DataActionAddRowTo`).
  - Master composite action created (`COMPOSITE` / `DataActionComposite`).
  - Bot YES step connected (`RUN_ACTION` / `RunActionNode`).
  - Cloud save completed in **0.4 seconds** with **Zero Error 400**.

---

## 4. Definitive AppSheet C# Schema Reference Dictionary

### A. Add Row Action (`ADD_RECORD_TO`)
```json
{
  "ExprLookup": {},
  "Value": null,
  "ValueEvaluatable": null,
  "ConditionEvaluatable": null,
  "ActionType": "ADD_RECORD_TO",
  "ActionSettings": "{\"ReferencedTable\":\"Survey_Tables\",\"Assignments\":[{\"Column\":\"ID\",\"Value\":\"UNIQUEID()\"},{\"Column\":\"Survey_ID\",\"Value\":\"[_THISROW].[ID]\"},{\"Column\":\"Table_Type\",\"Value\":\"\\\"Q15_Turnover\\\"\"},{\"Column\":\"Row_Item\",\"Value\":\"\\\"ROW_TURN_PEAK\\\"\"}],\"InputParametersUsed\":null,\"Prominence\":\"Do_Not_Display\",\"NeedsConfirmation\":false,\"ConfirmationMessage\":\"\",\"ModifiesData\":true,\"BulkApplicable\":true}",
  "IsEmbedded": false,
  "Scope": "UNSET",
  "Inputs": [],
  "Name": "Act_Add_Turnover_Peak",
  "DisplayName": null,
  "CreatedBy": null,
  "Icon": null,
  "IconRunnerUps": null,
  "Table": "Survey",
  "TableScope": false,
  "Condition": null,
  "ColumnToEdit": null,
  "ColumnAttachment": null,
  "ActionOrder": 100,
  "ActionDefinition": {
    "$type": "Jeenee.DataTypes.DataActionAddRowTo, Jeenee.DataTypes",
    "ReferencedTable": "Survey_Tables",
    "Assignments": [
      { "Column": "ID", "Value": "UNIQUEID()" },
      { "Column": "Survey_ID", "Value": "[_THISROW].[ID]" },
      { "Column": "Table_Type", "Value": "\"Q15_Turnover\"" },
      { "Column": "Row_Item", "Value": "\"ROW_TURN_PEAK\"" }
    ],
    "InputParametersUsed": null,
    "Prominence": "Do_Not_Display",
    "NeedsConfirmation": false,
    "ConfirmationMessage": "",
    "ModifiesData": true,
    "BulkApplicable": true
  },
  "Comment": null,
  "IsValid": true,
  "Visibility": "ADVANCED",
  "DisableAutoUpdate": false,
  "ComponentId": "KABC123..."
}
```

### B. Master Composite Action (`COMPOSITE`)
```json
{
  "ActionType": "COMPOSITE",
  "Name": "Action_Auto_Create_All_Matrix_Rows",
  "Table": "Survey",
  "ActionDefinition": {
    "$type": "Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes",
    "Actions": [
      { "ActionName": "Act_Add_Turnover_Peak" },
      { "ActionName": "Act_Add_Turnover_Avg" },
      { "ActionName": "Act_Add_Turnover_Lean" }
    ],
    "Prominence": "Do_Not_Display",
    "NeedsConfirmation": false,
    "ConfirmationMessage": "",
    "ModifiesData": true,
    "BulkApplicable": true
  },
  "IsValid": true,
  "Visibility": "ADVANCED",
  "ComponentId": "KABC123..."
}
```

### C. Process Step Node (`RUN_ACTION`)
```json
{
  "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
  "ExprLookup": {},
  "NodeType": "RUN_ACTION",
  "Action": "Action_Auto_Create_All_Matrix_Rows",
  "InputAssignments": [],
  "StepName": "Create_All_Matrix_Rows",
  "OutputTableName": null,
  "Comment": null,
  "IsValid": true,
  "Visibility": "ALWAYS",
  "DisableAutoUpdate": false,
  "ComponentId": "KABC123..."
}
```

### D. Process Branch Node (`IF_ELSE`)
```json
{
  "$type": "Jeenee.DataTypes.ProcessNodes.IfElseNode, Jeenee.DataTypes",
  "NodeType": "IF_ELSE",
  "StepName": "Check_Zero_Existing_Rows",
  "Condition": "=COUNT(SELECT(Survey_Tables[ID], [Survey_ID] = [_THISROW].[ID])) = 0",
  "IfNodes": [ /* RunActionNode */ ],
  "ElseNodes": [],
  "IsValid": true,
  "Visibility": "ALWAYS",
  "DisableAutoUpdate": false,
  "ComponentId": "KABC123..."
}
```

---

## 5. Blueprint: Full-App Generation from SRS via Console

When presented with an SRS, a future developer or AI agent can instantiate the entire application by executing three sequential Redux scripts:

### Stage 1: Data Architecture (`AppData.DataSchemas`)
- Create physical columns with correct `DataType` (`Text`, `Number`, `Price`, `Enum`, `Ref`).
- Add virtual columns with `REF_ROWS("Slice_...", "Parent_ID")` and `IsPartOf = true`.
- Bulk-inject multilingual display names: `=LOOKUP("<ID>", "AppVariables", "ID", "Label")`.

### Stage 2: Presentation Controls (`Presentation.Controls`)
- Target `Presentation.Controls` array.
- For each Form, populate both `ViewDefinition.ColumnOrder` and serialized `Settings.ColumnOrder`.
- Configure Deck views with `Card` templates for inline matrix rows.

### Stage 3: Behavior & Automation (`AppData.DataActions` & `Behavior`)
- Inject all atomic row actions (`ADD_RECORD_TO`).
- Inject composite actions (`COMPOSITE`).
- Inject `AppEvents` (`ADDS_ONLY`), `AppProcesses` (`IF_ELSE` -> `RUN_ACTION`), and `AppBots`.
- Single cloud Save commits the full enterprise application.
