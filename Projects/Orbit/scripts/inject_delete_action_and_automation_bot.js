// =========================================================================
// OmmNoMi Orbit: Single Delete Action + Complete Automation Bot
// 100% Pure ASCII, Zero Emojis, Validated with node -c
// Preserves ALL existing production bots, processes, events & actions
// =========================================================================
(function injectOneActionAndAutomationBot() {
    try {
        console.log("=== [OmmNoMi] 1 Action + 1 Automation Bot Setup ===");

        // 1. Locate Store
        var store = window.appStore;
        if (!store) {
            var candidates = [
                document.querySelector('.ExpressionControl'),
                document.querySelector('[role="grid"]'),
                document.querySelector('#root'),
                document.body
            ];
            for (var i = 0; i < candidates.length; i++) {
                var el = candidates[i];
                if (!el) continue;
                var fKey = Object.keys(el).find(function(k) {
                    return k.indexOf('reactFiber') >= 0 || k.indexOf('reactInternalInstance') >= 0;
                });
                var f = el[fKey];
                while (f) {
                    if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                        store = f.memoizedProps.store; break;
                    }
                    if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
                        store = f.stateNode.store; break;
                    }
                    f = f.return;
                }
                if (store) break;
            }
        }

        if (!store) {
            console.error("[ERROR] Redux store not accessible. Refresh page and retry.");
            return;
        }
        window.appStore = store;

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (!h) {
            console.error("[ERROR] appTemplate not found in Redux state.");
            return;
        }

        function makeId(prefix) {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var res = prefix || "K";
            for (var i = 0; i < 26; i++) {
                res += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return res;
        }

        var dict = {};

        // --- PART 1: ONLY ONE USER-FACING ACTION (DELETE) ---
        var dataActions = (h.AppData && h.AppData.DataActions) ? h.AppData.DataActions.slice() : [];
        var controls = (h.Presentation && h.Presentation.Controls) ? h.Presentation.Controls.slice() : [];

        var baseDel = dataActions.find(function(a) { return a && a.ActionType === "DELETE_RECORD"; }) || {
            "$type": "Jeenee.DataTypes.DataActionDelete, Jeenee.DataTypes",
            "ActionType": "DELETE_RECORD",
            "IsValid": true,
            "Visibility": "ALWAYS"
        };

        var singleDeleteAction = JSON.parse(JSON.stringify(baseDel));
        singleDeleteAction.Name = "Delete_Approved_Leave";
        singleDeleteAction.DisplayName = '="Delete"';
        singleDeleteAction.Table = "AttendanceRequest";
        singleDeleteAction.ActionType = "DELETE_RECORD";
        singleDeleteAction.Condition = '=AND([Status] = "Approved", IN([RequestType], {"Leave Application", "Work From Home", "Remote Work"}), ISNOTBLANK(INTERSECT({"U_People_Admin", "U_System_Admin"}, SPLIT(ANY(Me[Roles]), ","))))';
        singleDeleteAction.Icon = "delete";
        singleDeleteAction.ActionSettings = JSON.stringify({
            InputParametersUsed: null,
            Prominence: "Display_Prominently",
            NeedsConfirmation: true,
            ConfirmationMessage: "Are you sure you want to permanently delete this approved leave request? All corresponding Attendance Daily rows will be deleted and the leave balance will be updated.",
            ModifiesData: true,
            BulkApplicable: true
        });
        singleDeleteAction.ComponentId = makeId("K");
        singleDeleteAction._isNew = true;

        var dIdx = dataActions.findIndex(function(a) { return a && a.Name === singleDeleteAction.Name; });
        if (dIdx >= 0) dataActions[dIdx] = singleDeleteAction; else dataActions.push(singleDeleteAction);

        var cIdx = controls.findIndex(function(c) { return c && c.Name === singleDeleteAction.Name; });
        if (cIdx >= 0) controls[cIdx] = singleDeleteAction; else controls.push(singleDeleteAction);

        // Helper action for Bot Step 1 to delete child rows
        var adDeleteFilter = '=FILTER("AttendanceDaily", AND([Employee] = [_THISROW_BEFORE].[Employee], OR([AttendanceRequest] = [_THISROW_BEFORE].[ID], AND([Date] >= [_THISROW_BEFORE].[StartDate], [Date] <= [_THISROW_BEFORE].[EndDate], [Status] = "On Leave"))))';

        var botDeleteADAction = {
            "$type": "Jeenee.DataTypes.DataActionRef, Jeenee.DataTypes",
            "Name": "Act_Bot_Delete_AttendanceDaily",
            "Table": "AttendanceRequest",
            "ActionType": "REF_ACTION",
            "Condition": "true",
            "ActionSettings": JSON.stringify({
                ReferencedTable: "AttendanceDaily",
                ReferencedAction: "Delete",
                ReferencedRows: adDeleteFilter,
                InputAssignments: [],
                InputParametersUsed: null,
                Prominence: "Do_Not_Display",
                NeedsConfirmation: false,
                ConfirmationMessage: "",
                ModifiesData: true,
                BulkApplicable: true
            }),
            "IsValid": true,
            "Visibility": "NEVER",
            "ComponentId": makeId("K"),
            "_isNew": true
        };

        var bIdx = dataActions.findIndex(function(a) { return a && a.Name === botDeleteADAction.Name; });
        if (bIdx >= 0) dataActions[bIdx] = botDeleteADAction; else dataActions.push(botDeleteADAction);

        dict["AppData.DataActions"] = dataActions;
        if (controls.length > 0) dict["Presentation.Controls"] = controls;

        // --- PART 2: AUTOMATION BOT (DELETES_ONLY) ---
        var bots = (h.Behavior && h.Behavior.AppBots) ? h.Behavior.AppBots.slice() : [];
        var events = (h.Behavior && h.Behavior.AppEvents) ? h.Behavior.AppEvents.slice() : [];
        var processes = (h.Behavior && h.Behavior.AppProcesses) ? h.Behavior.AppProcesses.slice() : [];

        var botName = "Bot_Delete_Approved_Leave_Cleanup";
        var eventName = "Event_AttendanceRequest_Deleted";
        var processName = "Process_AttendanceRequest_Deleted_Cleanup";

        // Event
        var newEvent = {
            "$type": "Jeenee.DataTypes.AppEvent, Jeenee.DataTypes",
            "Name": eventName,
            "EventType": "Change",
            "AppEventDefinition": {
                "$type": "Jeenee.DataTypes.AppChangeEventDefinition, Jeenee.DataTypes",
                "ChangeEvent": "DELETES_ONLY",
                "SchemaName": "AttendanceRequest",
                "Condition": '=AND([_THISROW_BEFORE].[Status] = "Approved", IN([_THISROW_BEFORE].[RequestType], {"Leave Application", "Work From Home", "Remote Work"}))',
                "IsValid": true,
                "Visibility": "ALWAYS",
                "DisableAutoUpdate": false,
                "ComponentId": makeId("K")
            },
            "Scope": "LOCAL",
            "Disabled": false,
            "AutomationPurpose": 0,
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": makeId("K"),
            "_isNew": true
        };

        // Process Nodes
        var step1 = {
            "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
            "NodeType": "RUN_ACTION",
            "StepName": "Delete_Related_AttendanceDaily_Rows",
            "Action": "Act_Bot_Delete_AttendanceDaily",
            "ExprLookup": {},
            "InputAssignments": [],
            "OutputTableName": null,
            "Comment": "Deletes corresponding AttendanceDaily rows for this deleted leave",
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": makeId("K"),
            "_isNew": true
        };

        var step2 = {
            "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
            "NodeType": "RUN_ACTION",
            "StepName": "Sync_Employee_Leave_Allocation",
            "Action": "Sync this LeaveAllocation Action - 1",
            "ExprLookup": {},
            "InputAssignments": [],
            "OutputTableName": null,
            "Comment": "Recalculates Used and Available balances on LeaveAllocation",
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": makeId("K"),
            "_isNew": true
        };

        var step3 = {
            "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
            "NodeType": "RUN_ACTION",
            "StepName": "Resync_Other_Attendance_Requests",
            "Action": "Sync this AttendanceRequest Action - 1",
            "ExprLookup": {},
            "InputAssignments": [],
            "OutputTableName": null,
            "Comment": "Refreshes display and balances on other requests",
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": makeId("K"),
            "_isNew": true
        };

        var newProcess = {
            "$type": "Jeenee.DataTypes.AppProcess, Jeenee.DataTypes",
            "Name": processName,
            "InputSchemaName": "AttendanceRequest",
            "Nodes": [step1, step2, step3],
            "Scope": "LOCAL",
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": makeId("K"),
            "_isNew": true
        };

        var newBot = {
            "$type": "Jeenee.DataTypes.AppBot, Jeenee.DataTypes",
            "Name": botName,
            "EventName": eventName,
            "ProcessName": processName,
            "AutomationPurpose": 0,
            "Disabled": false,
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": makeId("K"),
            "_isNew": true
        };

        var evIdx = events.findIndex(function(e) { return e && e.Name === eventName; });
        if (evIdx >= 0) events[evIdx] = newEvent; else events.push(newEvent);

        var prIdx = processes.findIndex(function(p) { return p && p.Name === processName; });
        if (prIdx >= 0) processes[prIdx] = newProcess; else processes.push(newProcess);

        var btIdx = bots.findIndex(function(b) { return b && b.Name === botName; });
        if (btIdx >= 0) bots[btIdx] = newBot; else bots.push(newBot);

        dict["Behavior.AppEvents"] = events;
        dict["Behavior.AppProcesses"] = processes;
        dict["Behavior.AppBots"] = bots;

        store.dispatch({
            type: 'SET_EDITOR_OPTIONS',
            nameValueDict: dict,
            recordHistory: true,
            ignoreConstraints: false,
            skipNavigation: false
        });

        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OK] 1 Action + 1 Automation Bot configured:");
        console.log("  - Action: 'Delete_Approved_Leave' (Single user Delete button)");
        console.log("  - Bot:    'Bot_Delete_Approved_Leave_Cleanup' (DELETES_ONLY)");
        console.log("    -> Step 1: Deletes matching AttendanceDaily rows");
        console.log("    -> Step 2: Recalculates LeaveAllocation balance");
        console.log("    -> Step 3: Resyncs employee attendance requests");
        console.log("[OK] Zero existing production items were modified.");
        console.log("[ACTION] Click the blue SAVE button in AppSheet top-right!");
    } catch(err) {
        console.error("[OmmNoMi ERROR]", err.message);
    }
})();
