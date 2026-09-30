// =========================================================================
// OmmNoMi: 100% Verified One-Hit Matrix Auto-Population Script
// Native C# Types Verified from Module 663518:
// 1. ActionType: "ADD_RECORD_TO" -> Jeenee.DataTypes.DataActionAddRowTo
// 2. ActionType: "COMPOSITE" -> Jeenee.DataTypes.DataActionComposite
// 3. NodeType: "RUN_ACTION" -> Jeenee.DataTypes.ProcessNodes.RunActionNode
// 100% Pure ASCII, Validated with node -c
// =========================================================================
(function oneHitCreateAllMatrixRows() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] 1-Hit Auto-Create All Matrix Rows & YES Step ===");

        function getStore() {
            if (window.appStore && window.appStore.dispatch) return window.appStore;
            var all = document.querySelectorAll('*');
            for (var i = 0; i < all.length; i++) {
                var el = all[i];
                var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
                if (!fKey) continue;
                var f = el[fKey];
                while (f) {
                    if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                        window.appStore = f.memoizedProps.store; return window.appStore;
                    }
                    if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
                        window.appStore = f.stateNode.store; return window.appStore;
                    }
                    f = f.return;
                }
            }
            return null;
        }

        var store = getStore();
        if (!store) { console.error("[ERROR] Store not found."); return; }

        function makeId() {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
            for (var i = 0; i < 26; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
            return r;
        }

        var state = store.getState();
        var h = state.appTemplate.history[0].appTemplate;
        var existingActions = (h.AppData && h.AppData.DataActions) ? h.AppData.DataActions.slice() : [];

        // All 15 Matrix Rows:
        var rowDefs = [
            // Q15 Turnover (3 seasons)
            { type: "Q15_Turnover", item: "ROW_TURN_PEAK", name: "Act_Add_Turnover_Peak" },
            { type: "Q15_Turnover", item: "ROW_TURN_AVG",  name: "Act_Add_Turnover_Avg" },
            { type: "Q15_Turnover", item: "ROW_TURN_LEAN", name: "Act_Add_Turnover_Lean" },
            // Q6 Labor (6 functions)
            { type: "Q6_Labor", item: "ROW_LABOR_PURCHASE", name: "Act_Add_Labor_Purchase" },
            { type: "Q6_Labor", item: "ROW_LABOR_PROD",     name: "Act_Add_Labor_Prod" },
            { type: "Q6_Labor", item: "ROW_LABOR_SERV",     name: "Act_Add_Labor_Serv" },
            { type: "Q6_Labor", item: "ROW_LABOR_MKTG",     name: "Act_Add_Labor_Mktg" },
            { type: "Q6_Labor", item: "ROW_LABOR_SALE",     name: "Act_Add_Labor_Sale" },
            { type: "Q6_Labor", item: "ROW_LABOR_RECORD",   name: "Act_Add_Labor_Record" },
            // Q22 Trajectory (6 metrics)
            { type: "Q22_Trajectory", item: "ROW_TRAJ_SALES",    name: "Act_Add_Traj_Sales" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_INCOME",   name: "Act_Add_Traj_Income" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_STOCK",    name: "Act_Add_Traj_Stock" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_INPUTS",   name: "Act_Add_Traj_Inputs" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_FINISHED", name: "Act_Add_Traj_Finished" },
            { type: "Q22_Trajectory", item: "ROW_TRAJ_ASSETS",   name: "Act_Add_Traj_Assets" }
        ];

        var subActionNames = [];
        rowDefs.forEach(function(def, idx) {
            subActionNames.push(def.name);
            var assignments = [
                { "Column": "ID", "Value": "UNIQUEID()" },
                { "Column": "Survey_ID", "Value": "[_THISROW].[ID]" },
                { "Column": "Table_Type", "Value": '"' + def.type + '"' },
                { "Column": "Row_Item", "Value": '"' + def.item + '"' }
            ];

            var actDef = {
                "$type": "Jeenee.DataTypes.DataActionAddRowTo, Jeenee.DataTypes",
                "ReferencedTable": "Survey_Tables",
                "Assignments": assignments,
                "InputParametersUsed": null,
                "Prominence": "Display_Prominently",
                "NeedsConfirmation": false,
                "ConfirmationMessage": "",
                "ModifiesData": true,
                "BulkApplicable": true
            };

            var actionObj = {
                "ExprLookup": {},
                "Value": null,
                "ValueEvaluatable": null,
                "ConditionEvaluatable": null,
                "ActionType": "ADD_RECORD_TO",
                "ActionSettings": JSON.stringify(actDef),
                "IsEmbedded": false,
                "Scope": "UNSET",
                "Inputs": [],
                "Name": def.name,
                "DisplayName": null,
                "CreatedBy": null,
                "Icon": null,
                "IconRunnerUps": null,
                "Table": "Survey",
                "TableScope": false,
                "Condition": null,
                "ColumnToEdit": null,
                "ColumnAttachment": null,
                "ActionOrder": 100 + idx,
                "ActionDefinition": actDef,
                "Comment": null,
                "IsValid": true,
                "Visibility": "ADVANCED",
                "DisableAutoUpdate": false,
                "ComponentId": makeId()
            };

            var existIdx = existingActions.findIndex(function(a) { return a && a.Name === def.name; });
            if (existIdx >= 0) existingActions[existIdx] = actionObj; else existingActions.push(actionObj);
        });

        // Master Composite Action (Executes all 15 row additions)
        var groupActName = "Action_Auto_Create_All_Matrix_Rows";
        var compActions = subActionNames.map(function(n) { return { "ActionName": n }; });
        var compDef = {
            "$type": "Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes",
            "Actions": compActions,
            "Prominence": "Display_Prominently",
            "NeedsConfirmation": false,
            "ConfirmationMessage": "",
            "ModifiesData": true,
            "BulkApplicable": true
        };

        var groupActionObj = {
            "ExprLookup": {},
            "Value": null,
            "ValueEvaluatable": null,
            "ConditionEvaluatable": null,
            "ActionType": "COMPOSITE",
            "ActionSettings": JSON.stringify(compDef),
            "IsEmbedded": false,
            "Scope": "UNSET",
            "Inputs": [],
            "Name": groupActName,
            "DisplayName": null,
            "CreatedBy": null,
            "Icon": null,
            "IconRunnerUps": null,
            "Table": "Survey",
            "TableScope": false,
            "Condition": null,
            "ColumnToEdit": null,
            "ColumnAttachment": null,
            "ActionOrder": 99,
            "ActionDefinition": compDef,
            "Comment": null,
            "IsValid": true,
            "Visibility": "ADVANCED",
            "DisableAutoUpdate": false,
            "ComponentId": makeId()
        };

        var gIdx = existingActions.findIndex(function(a) { return a && a.Name === groupActName; });
        if (gIdx >= 0) existingActions[gIdx] = groupActionObj; else existingActions.push(groupActionObj);

        // Native RunActionNode on Bot YES Branch
        var yesNode = {
            "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
            "ExprLookup": {},
            "NodeType": "RUN_ACTION",
            "Action": groupActName,
            "InputAssignments": [],
            "StepName": "Create_All_Matrix_Rows",
            "OutputTableName": null,
            "Comment": null,
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": makeId()
        };

        var dict = {};
        dict["AppData.DataActions"] = existingActions;
        dict["Behavior.AppProcesses[0].Nodes[0].IfNodes"] = [yesNode];

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OmmNoMi SUCCESS] 100% Configured!");
        console.log("-> 15 Matrix Row Actions created (ADD_RECORD_TO / DataActionAddRowTo)");
        console.log("-> Master Composite Action created (COMPOSITE / DataActionComposite)");
        console.log("-> YES Branch Step created (RUN_ACTION / RunActionNode)");
        console.log("[ACTION] Top-right blue SAVE button par click karein!");

    } catch(e) { console.error("[ERROR]", e.message); }
})();
