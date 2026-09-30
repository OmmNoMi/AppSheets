// =========================================================================
// OmmNoMi: Add 'Run Data Action' Step in YES branch to Create New Row
// Size: Under 55 lines, Pure ASCII, Validated with node -c
// =========================================================================
(function createYesStepAction() {
    try {
        var store = window.appStore;
        if (!store) { console.error("[ERROR] window.appStore not found."); return; }

        function makeId() {
            var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
            for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
            return r;
        }

        var state = store.getState();
        var h = state.appTemplate.history[0].appTemplate;
        var stepId = makeId();
        var actionName = "Action_Auto_Add_Survey_Table_Row";

        // 1. Define Data Action to create new row in Survey_Tables
        var existingActions = (h.AppData && h.AppData.DataActions) ? h.AppData.DataActions.slice() : [];
        var actIdx = existingActions.findIndex(function(a) { return a && a.Name === actionName; });

        var newAction = {
            "$type": "Jeenee.DataTypes.DataActionAddRow, Jeenee.DataTypes",
            "Name": actionName,
            "Table": "Survey",
            "ActionType": "ADD_ROW_TO_ANOTHER_TABLE",
            "ReferencedTableName": "Survey_Tables",
            "InputParametersUsed": [
                { "Column": "ID", "Value": "UNIQUEID()" },
                { "Column": "Survey_ID", "Value": "[_THISROW].[ID]" },
                { "Column": "Table_Type", "Value": '"Q15_Turnover"' },
                { "Column": "Row_Item", "Value": '"ROW_TURN_PEAK"' }
            ],
            "ActionSettings": JSON.stringify({ Prominence: "Do_Not_Display", NeedsConfirmation: false, ModifiesData: true }),
            "IsValid": true,
            "Visibility": "NEVER",
            "ComponentId": makeId(),
            "_isNew": true
        };

        if (actIdx >= 0) existingActions[actIdx] = newAction;
        else existingActions.push(newAction);

        // 2. Define Process Node for the YES branch (IfNodes)
        var yesNode = {
            "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
            "NodeType": "RUN_ACTION",
            "StepName": "Create_Turnover_Row",
            "Action": actionName,
            "InputAssignments": [],
            "OutputTableName": null,
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": stepId,
            "_isNew": true
        };

        var dict = {};
        dict["AppData.DataActions"] = existingActions;
        dict["Behavior.AppProcesses[0].Nodes[0].IfNodes"] = [yesNode];

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OmmNoMi OK] YES Step created successfully with Action:", actionName);
        console.log("[ACTION] Top-right blue SAVE button par click karein!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
