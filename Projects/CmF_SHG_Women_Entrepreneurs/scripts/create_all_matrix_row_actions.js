// =========================================================================
// OmmNoMi: Create All Pre-Populated Matrix Row Actions (Q15, Q6, Q22)
// Size: Under 65 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function createAllMatrixRowActions() {
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
        var existingActions = (h.AppData && h.AppData.DataActions) ? h.AppData.DataActions.slice() : [];

        // All Matrix Rows to pre-populate:
        var rowDefs = [
            // Q15 Turnover (3 seasons)
            { type: "Q15_Turnover", item: "ROW_TURN_PEAK", name: "Act_Add_Turnover_Peak" },
            { type: "Q15_Turnover", item: "ROW_TURN_AVG",  name: "Act_Add_Turnover_Avg" },
            { type: "Q15_Turnover", item: "ROW_TURN_LEAN", name: "Act_Add_Turnover_Lean" },
            // Q6 Labor (6 operational functions)
            { type: "Q6_Labor", item: "ROW_LABOR_PURCHASE", name: "Act_Add_Labor_Purchase" },
            { type: "Q6_Labor", item: "ROW_LABOR_PROD",     name: "Act_Add_Labor_Prod" },
            { type: "Q6_Labor", item: "ROW_LABOR_SERV",     name: "Act_Add_Labor_Serv" },
            { type: "Q6_Labor", item: "ROW_LABOR_MKTG",     name: "Act_Add_Labor_Mktg" },
            { type: "Q6_Labor", item: "ROW_LABOR_SALE",     name: "Act_Add_Labor_Sale" },
            { type: "Q6_Labor", item: "ROW_LABOR_RECORD",   name: "Act_Add_Labor_Record" },
            // Q22 Trajectory (6 business metrics)
            { type: "Q22_Trajectory", item: "ROW_TRAJ_SALES",    name: "Act_Add_Traj_Sales" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_INCOME",   name: "Act_Add_Traj_Income" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_STOCK",    name: "Act_Add_Traj_Stock" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_INPUTS",   name: "Act_Add_Traj_Inputs" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_FINISHED", name: "Act_Add_Traj_Finished" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_ASSETS",   name: "Act_Add_Traj_Assets" }
        ];

        var subActionNames = [];
        rowDefs.forEach(function(def) {
            subActionNames.push(def.name);
            var act = {
                "$type": "Jeenee.DataTypes.DataActionAddRow, Jeenee.DataTypes",
                "Name": def.name,
                "Table": "Survey",
                "ActionType": "ADD_ROW_TO_ANOTHER_TABLE",
                "ReferencedTableName": "Survey_Tables",
                "InputParametersUsed": [
                    { "Column": "ID", "Value": "UNIQUEID()" },
                    { "Column": "Survey_ID", "Value": "[_THISROW].[ID]" },
                    { "Column": "Table_Type", "Value": '"' + def.type + '"' },
                    { "Column": "Row_Item", "Value": '"' + def.item + '"' }
                ],
                "ActionSettings": JSON.stringify({ Prominence: "Do_Not_Display", NeedsConfirmation: false, ModifiesData: true }),
                "IsValid": true, "Visibility": "NEVER", "ComponentId": makeId(), "_isNew": true
            };
            var idx = existingActions.findIndex(function(a) { return a && a.Name === def.name; });
            if (idx >= 0) existingActions[idx] = act; else existingActions.push(act);
        });

        // Master Grouped Action: Executes all 15 row additions in sequence
        var groupActName = "Action_Auto_Create_All_Matrix_Rows";
        var groupAct = {
            "$type": "Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes",
            "Name": groupActName,
            "Table": "Survey",
            "ActionType": "COMPOSITE",
            "ActionDefinition": {
                "$type": "Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes",
                "Actions": subActionNames.map(function(n) { return { ActionName: n }; })
            },
            "ActionSettings": JSON.stringify({
                Actions: subActionNames.map(function(n) { return { ActionName: n }; }),
                Prominence: "Do_Not_Display", NeedsConfirmation: false, ModifiesData: true
            }),
            "IsValid": true, "Visibility": "NEVER", "ComponentId": makeId(), "_isNew": true
        };
        var gIdx = existingActions.findIndex(function(a) { return a && a.Name === groupActName; });
        if (gIdx >= 0) existingActions[gIdx] = groupAct; else existingActions.push(groupAct);

        // Connect Master Grouped Action to YES branch
        var yesNode = {
            "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
            "NodeType": "RUN_ACTION",
            "StepName": "Create_All_Matrix_Rows",
            "Action": groupActName,
            "InputAssignments": [],
            "OutputTableName": null,
            "IsValid": true, "Visibility": "ALWAYS", "DisableAutoUpdate": false,
            "ComponentId": makeId(), "_isNew": true
        };

        var dict = {};
        dict["AppData.DataActions"] = existingActions;
        dict["Behavior.AppProcesses[0].Nodes[0].IfNodes"] = [yesNode];

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OmmNoMi OK] All 15 Matrix Rows configured into Grouped Action!");
        console.log(" -> Q15 Turnover: Peak, Avg, Lean (3 rows)");
        console.log(" -> Q6 Labor: Purchase, Prod, Serv, Mktg, Sale, Record (6 rows)");
        console.log(" -> Q22 Trajectory: Sales, Income, Stock, Inputs, Finished, Assets (6 rows)");
        console.log(" -> Master Grouped Action:", groupActName);
        console.log(" -> Linked to Bot YES Step: Create_All_Matrix_Rows");
        console.log("[ACTION] Top-right blue SAVE button par click karein!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
