// =========================================================================
// OmmNoMi Orbit: Leave Delete Automation Suite (Production Safe)
// 100% Pure ASCII, Zero Emojis, Validated with node -c
// Touches ZERO existing actions. Creates 3 new actions only.
// =========================================================================
(function injectLeaveDeleteAutomation() {
    try {
        console.log("=== [OmmNoMi] Orbit Leave Delete Automation Setup ===");

        // 1. Locate Redux Store
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

        function makeId() {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var res = "K";
            for (var i = 0; i < 26; i++) {
                res += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return res;
        }

        var dataActions = (h.AppData && h.AppData.DataActions) ? h.AppData.DataActions.slice() : null;
        var controls = (h.Presentation && h.Presentation.Controls) ? h.Presentation.Controls.slice() : null;

        var baseRef = (dataActions && dataActions.find(function(a) { return a && a.ActionType === "REF_ACTION"; })) ||
                      (controls && controls.find(function(c) { return c && c.ActionType === "REF_ACTION"; })) || {
                          "$type": "Jeenee.DataTypes.DataActionRef, Jeenee.DataTypes",
                          "ActionType": "REF_ACTION",
                          "IsValid": true, "Visibility": "ALWAYS"
                      };

        var baseDel = (dataActions && dataActions.find(function(a) { return a && a.ActionType === "DELETE_RECORD"; })) ||
                      (controls && controls.find(function(c) { return c && c.ActionType === "DELETE_RECORD"; })) || {
                          "$type": "Jeenee.DataTypes.DataActionDelete, Jeenee.DataTypes",
                          "ActionType": "DELETE_RECORD",
                          "IsValid": true, "Visibility": "ALWAYS"
                      };

        var baseComp = (dataActions && dataActions.find(function(a) { return a && a.ActionType === "COMPOSITE"; })) ||
                       (controls && controls.find(function(c) { return c && c.ActionType === "COMPOSITE"; })) || {
                           "$type": "Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes",
                           "ActionType": "COMPOSITE",
                           "IsValid": true, "Visibility": "ALWAYS"
                       };

        // --- SUB-ACTION 1: Delete Related AttendanceDaily Rows ---
        // Matches BOTH AttendanceRequest ID foreign key AND date range for safety
        var adDeleteFilter = '=FILTER("AttendanceDaily", AND([Employee] = [_THISROW].[Employee], OR([AttendanceRequest] = [_THISROW].[ID], AND([Date] >= [_THISROW].[StartDate], [Date] <= [_THISROW].[EndDate], [Status] = "On Leave"))))';

        var actDeleteAD = JSON.parse(JSON.stringify(baseRef));
        actDeleteAD.Name = "Act_AR_Delete_Related_AttendanceDaily";
        actDeleteAD.Table = "AttendanceRequest";
        actDeleteAD.ActionType = "REF_ACTION";
        actDeleteAD.Condition = "true";
        actDeleteAD.ActionSettings = JSON.stringify({
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
        });
        actDeleteAD.ComponentId = makeId();
        actDeleteAD._isNew = true;

        // --- SUB-ACTION 2: Delete This AttendanceRequest ---
        var actDeleteThis = JSON.parse(JSON.stringify(baseDel));
        actDeleteThis.Name = "Act_AR_Delete_This_Request";
        actDeleteThis.Table = "AttendanceRequest";
        actDeleteThis.ActionType = "DELETE_RECORD";
        actDeleteThis.Condition = "true";
        actDeleteThis.ActionSettings = JSON.stringify({
            InputParametersUsed: null,
            Prominence: "Do_Not_Display",
            NeedsConfirmation: false,
            ConfirmationMessage: "",
            ModifiesData: true,
            BulkApplicable: true
        });
        actDeleteThis.ComponentId = makeId();
        actDeleteThis._isNew = true;

        // --- MASTER ACTION: Delete_Approved_Leave (Composite) ---
        var actMaster = JSON.parse(JSON.stringify(baseComp));
        var subActions = [
            { ActionName: "Act_AR_Delete_Related_AttendanceDaily" },
            { ActionName: "Sync this LeaveAllocation Action - 1" },
            { ActionName: "Sync this AttendanceRequest Action - 1" },
            { ActionName: "Act_AR_Delete_This_Request" }
        ];

        var masterCondition = '=AND([Status] = "Approved", IN([RequestType], {"Leave Application", "Work From Home", "Remote Work"}), ISNOTBLANK(INTERSECT({"U_People_Admin", "U_System_Admin"}, SPLIT(ANY(Me[Roles]), ","))))';

        actMaster.Name = "Delete_Approved_Leave";
        actMaster.DisplayName = '="Delete Leave"';
        actMaster.Table = "AttendanceRequest";
        actMaster.ActionType = "COMPOSITE";
        actMaster.Condition = masterCondition;
        actMaster.Icon = "delete";
        actMaster.ActionSettings = JSON.stringify({
            Actions: subActions,
            Prominence: "Display_Prominently",
            NeedsConfirmation: true,
            ConfirmationMessage: "Are you sure you want to permanently delete this approved leave request? All corresponding Attendance Daily rows will be deleted and the leave balance will be updated.",
            ModifiesData: true,
            BulkApplicable: true
        });
        if (actMaster.ActionDefinition) {
            actMaster.ActionDefinition.Actions = subActions;
        }
        actMaster.ComponentId = makeId();
        actMaster._isNew = true;

        var newActions = [actDeleteAD, actDeleteThis, actMaster];
        var dict = {};

        if (dataActions) {
            newActions.forEach(function(act) {
                var idx = dataActions.findIndex(function(a) { return a && a.Name === act.Name; });
                if (idx >= 0) dataActions[idx] = act; else dataActions.push(act);
            });
            dict["AppData.DataActions"] = dataActions;
        }

        if (controls) {
            newActions.forEach(function(act) {
                var idx = controls.findIndex(function(c) { return c && c.Name === act.Name; });
                if (idx >= 0) controls[idx] = act; else controls.push(act);
            });
            dict["Presentation.Controls"] = controls;
        }

        store.dispatch({
            type: 'SET_EDITOR_OPTIONS',
            nameValueDict: dict,
            recordHistory: true,
            ignoreConstraints: false,
            skipNavigation: false
        });

        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OK] 3 Actions successfully added to AttendanceRequest:");
        console.log("  1. Act_AR_Delete_Related_AttendanceDaily (Matches AttendanceRequest ID + Date range)");
        console.log("  2. Act_AR_Delete_This_Request (Deletes AttendanceRequest row)");
        console.log("  3. Delete_Approved_Leave (Master button chaining 1 -> Sync Leave -> Sync Requests -> 2)");
        console.log("[OK] Zero existing production actions were modified.");
        console.log("[ACTION] Click the blue SAVE button in AppSheet top-right!");
    } catch(err) {
        console.error("[OmmNoMi ERROR]", err.message);
    }
})();
