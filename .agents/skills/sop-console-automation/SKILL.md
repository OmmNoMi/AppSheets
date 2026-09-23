---
name: sop-console-automation
description: Standard Operating Procedure for Browser DevTools Console scripts and Redux automation in AppSheet. Prevents syntax errors, token truncation, unicode corruption, and script failures.
---

# OmmNoMi SOP — DevTools Console & Redux Automation Protocol

> **OmmNoMi Automation LLP** | Standard Operating Procedure  
> **Target:** Browser DevTools Console Scripts, React/Redux Dispatches, Diagnostic Checkers  

---

## 1. Context & The Problem
When providing JavaScript code to execute in the browser console (DevTools F12):
- **Clipboard Truncation**: Chat UI code blocks, long lines (>120 chars), or multi-byte unicode characters (emojis like `✅`, `❌`, `🚀`, Unicode box drawings `╔═`) often get truncated or mangled by Windows clipboard buffers or browser paste handlers, resulting in fatal syntax errors:
  `Uncaught SyntaxError: Invalid or unexpected token`
- **Escaping Conflicts**: AppSheet formulas contain quotes (`'`, `"`) and arithmetic operators (`/`, `*`). If nested incorrectly in template literals without strict formatting, JS parser throws syntax errors.
- **Missing Safety Net**: Scripts that don't validate their own syntax or don't provide a persistent file fallback leave developers stranded when a copy-paste fails.

---

## 2. Mandatory Rules for Console Scripts

### R1. Pure ASCII Guarantee (Strictly Zero Multi-Byte Emojis in Code)
- **NEVER** use emojis (`✅`, `❌`, `⚠️`, `🚀`, `🎉`, `╔`, `║`) inside JS string literals or console logs.
- Multi-byte UTF-8 sequences are the #1 cause of `Invalid or unexpected token` during DevTools paste.
- **Mandatory Replacements**:
  - Success: `[OK]` or `[PASSED]`
  - Failure: `[FAIL]` or `[ERROR]`
  - Warning: `[WARN]`
  - Info: `[INFO]`
  - Divider: Standard ASCII `===` or `---`

### R2. Line Length & Payload Limits (< 100 chars per line)
- No single line of code should exceed 120 characters in chat output.
- Break long string concatenations or formulas into multi-line arrays or helper variables.
- Wrap scripts in clean, compact blocks. If a script exceeds 150 lines, split into modular functions or save to a file.

### R3. Dual-Delivery Protocol (File First, Snippet Second)
Whenever delivering a console automation or audit script:
1. **Always write the clean code to a repo file first** (e.g. `projects/<project>/scripts/<script_name>.js`).
2. **Provide a concise, ultra-reliable runner in chat**.
3. If the user encounters clipboard truncation, they can simply copy directly from the local file or load it.

### R4. Syntax Self-Validation (Zero Runtime Crash)
- Every console script MUST be wrapped in a self-executing IIFE with top-level `try...catch`:
  ```javascript
  (function runOmmNoMiScript() {
    try {
      // Logic
    } catch (err) {
      console.error("[OmmNoMi ERROR]", err.message);
    }
  })();
  ```
- Before outputting to the user, run `node -c <file>.js` via terminal to guarantee 100% valid JavaScript syntax.

### R5. Store Discovery Robustness
Never assume `window.appStore` is already globally attached. Always use the 4-tier traversal:
1. `window.appStore`
2. `document.querySelector('.ExpressionControl')`
3. `document.querySelector('[role="grid"]')`
4. `document.querySelector('#root')`
Attach discovered store to `window.appStore` for subsequent inspections.

---

## 3. Standard Inspection Template (Copy-Paste Safe)

```javascript
(function inspectAppSheet() {
  try {
    var store = window.appStore;
    if (!store) {
      var root = document.querySelector('#root') || document.body;
      var fKey = Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; });
      var f = root[fKey];
      while (f) {
        if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; break; }
        f = f.return;
      }
    }
    if (!store) {
      console.error("[ERROR] Redux store not accessible. Refresh page and retry.");
      return;
    }
    var state = store.getState();
    var schemas = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate)
      ? state.appTemplate.history[0].appTemplate.AppData.DataSchemas
      : [];
    console.log("[INFO] Schemas count:", schemas.length);
    // Print clean console table without unicode
  } catch (e) {
    console.error("[ERROR]", e.message);
  }
})();
```


### [Learning] Strict 50-Line Payload Chunking (2026-09-22 18:22)
- **Rule / Observation**: Never deliver >60 lines of JavaScript in a single chat snippet. Large blocks get truncated mid-token by Windows/browser clipboard buffers, triggering Uncaught SyntaxError. Always split into bite-sized Step 1 and Step 2 chunks.

### [Learning] AppSheet Form Views & ColumnOrder Storage (2026-09-22 19:00)
- **Problem / Discovery**: In modern AppSheet Web Editor, Form and Table views are NOT stored in `AppData.AppViews` or `AppViews`. They are stored inside **`Presentation.Controls`** array (e.g. `Presentation.Controls[12]` for `Survey_Form_SecC`).
- **Dual ColumnOrder Requirement**: Form views maintain their explicit column order in TWO places simultaneously:
  1. `control.ViewDefinition.ColumnOrder` (Array of column strings).
  2. `control.Settings` (JSON string containing `{"ColumnOrder":[...], ...}`).
- **Virtual Column Rendering in Forms**: If a Form view has custom `ColumnOrder` defined, AppSheet strictly ignores any columns (including newly created Virtual Columns like `Related_Q6_Labor`) not present in that list. To render inline subtables with `[ New ]` buttons, the Virtual Columns MUST be injected into both `ViewDefinition.ColumnOrder` and the serialized `Settings.ColumnOrder`.

### [Learning] Automation Bot, DataAction & ProcessNode C# Backend Schemas (2026-09-24 00:35)
- **Problem / Root Cause**: Attempting to inject actions or process steps with made-up class names (e.g. `DataActionAddRow` or `ProcessNodes.RunActionNode` missing `ExprLookup`) causes AppSheet backend C# deserializer to reject the payload with `Error 400: Something went wrong and your changes couldn't be saved`.
- **Permanent C# Backend Schemas (Extracted from Module 663518)**:
  1. **Add Row Action**:
     - `ActionType`: `"ADD_RECORD_TO"` (NOT `"ADD_ROW_TO_ANOTHER_TABLE"`)
     - `ActionDefinition.$type`: `"Jeenee.DataTypes.DataActionAddRowTo, Jeenee.DataTypes"`
     - Target Table Key: `"ReferencedTable"` (NOT `"ReferencedTableName"`)
     - Column Mapping Key: `"Assignments": [ { "Column": "...", "Value": "..." } ]` (NOT `"InputParametersUsed"`)
     - Root Action Object: Must NEVER have `$type` at the top level. `$type` belongs exclusively inside `ActionDefinition`.
  2. **Composite / Grouped Action**:
     - `ActionType`: `"COMPOSITE"`
     - `ActionDefinition.$type`: `"Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes"`
     - Child Actions Key: `"Actions": [ { "ActionName": "..." } ]`
  3. **Process Node (Step in Bot Flow)**:
     - `NodeType`: `"RUN_ACTION"`
     - `$type`: `"Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes"`
     - Required fields: `"ExprLookup": {}`, `"InputAssignments": []`, `"OutputTableName": null`, `"Comment": null`, `"IsValid": true`, `"Visibility": "ALWAYS"`, `"DisableAutoUpdate": false`.

---

## 4. Production Master Templates

### A. Battle-Tested Automation & Action Injector Template
```javascript
(function injectAutomationActions() {
  try {
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

    var store = getStore();
    if (!store) { console.error("[ERROR] Store not found."); return; }
    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var dict = {};

    // 1. Build Atomic ADD_RECORD_TO Action
    var action = {
      ActionType: "ADD_RECORD_TO",
      Name: "Act_Auto_Add_Row_Example",
      Table: "Parent_Table",
      ActionDefinition: {
        "$type": "Jeenee.DataTypes.DataActionAddRowTo, Jeenee.DataTypes",
        ReferencedTable: "Child_Table",
        Assignments: [
          { Column: "ID", Value: "UNIQUEID()" },
          { Column: "Parent_ID", Value: "[_THISROW].[ID]" },
          { Column: "Status", Value: "\"Pending\"" }
        ],
        Prominence: "Do_Not_Display",
        NeedsConfirmation: false,
        ConfirmationMessage: "",
        ModifiesData: true,
        BulkApplicable: true
      },
      IsValid: true,
      Visibility: "ADVANCED"
    };

    var actions = (h.AppData.DataActions || []).slice();
    actions.push(action);
    dict["AppData.DataActions"] = actions;

    // 2. Dispatch to Redux & Enable Native Cloud Save
    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] Action successfully injected into Redux. Cloud Save ready!");
  } catch (err) {
    console.error("[ERROR]", err.message);
  }
})();
```

---

## 5. End-to-End SRS-to-App Console Blueprint

When building an entire application from SRS:
1. **Physical Columns**: Add columns in Sheet, click Regenerate in AppSheet.
2. **Schema & Formulas**: Execute console script to update `AppData.DataSchemas[i].Attributes` with Types, `Valid_If`, `InitialValue`, `Show_If`, and `=LOOKUP(...)` Display Names.
3. **Child Slices & VCs**: Add `AppData.TableSlices` with `UpdateMode: 7` and inject `REF_ROWS(...)` Virtual Columns with `IsAPartOf: true`.
4. **Form Views**: Target `Presentation.Controls` array, synchronizing `ViewDefinition.ColumnOrder` and serialized `Settings.ColumnOrder`.
5. **Bots & Actions**: Inject `ADD_RECORD_TO`, `COMPOSITE`, and `Behavior.AppProcesses` nodes using the authentic C# schemas.
6. **Cloud Save**: Execute a single cloud Save in AppSheet web editor. The entire enterprise app is live in seconds.
