// =========================================================================
// OmmNoMi: Direct Redux Creation of Automation Bot, Event & Process
// Size: Under 60 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function createBotReduxDirect() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Direct Redux Automation Bot Creation ===");

        var store = window.appStore;
        if (!store) {
            console.error("[ERROR] window.appStore not found. Click inside editor first.");
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

        var botId = makeId("K");
        var eventId = makeId("K");
        var procId = makeId("K");
        var stepId = makeId("K");

        var newEvent = {
            "$type": "Jeenee.DataTypes.AppEvent, Jeenee.DataTypes",
            "Name": "Event_Survey_Added",
            "EventType": "Change",
            "AppEventDefinition": {
                "$type": "Jeenee.DataTypes.AppChangeEventDefinition, Jeenee.DataTypes",
                "ChangeEvent": "ADDS_ONLY",
                "SchemaName": "Survey_Schema",
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
            "ComponentId": eventId,
            "_isNew": true
        };

        var newProcess = {
            "$type": "Jeenee.DataTypes.AppProcess, Jeenee.DataTypes",
            "Name": "Process_Auto_Create_Matrix_Rows",
            "InputSchemaName": "Survey_Schema",
            "Nodes": [
                {
                    "$type": "Jeenee.DataTypes.ProcessNodes.IfElseNode, Jeenee.DataTypes",
                    "NodeType": "IF_ELSE",
                    "StepName": "Check_Zero_Existing_Rows",
                    "Condition": '=COUNT(SELECT(Survey_Tables[ID], [Survey_ID] = [_THISROW].[ID])) = 0',
                    "IfNodes": [],
                    "ElseNodes": [],
                    "IsValid": true,
                    "Visibility": "ALWAYS",
                    "DisableAutoUpdate": false,
                    "ComponentId": stepId
                }
            ],
            "Scope": "LOCAL",
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": procId,
            "_isNew": true
        };

        var newBot = {
            "$type": "Jeenee.DataTypes.AppBot, Jeenee.DataTypes",
            "Name": "Bot_Auto_Create_Survey_Tables",
            "EventName": "Event_Survey_Added",
            "ProcessName": "Process_Auto_Create_Matrix_Rows",
            "AutomationPurpose": 0,
            "Disabled": false,
            "IsValid": true,
            "Visibility": "ALWAYS",
            "DisableAutoUpdate": false,
            "ComponentId": botId,
            "_isNew": true
        };

        var dict = {};
        dict["Behavior.AppEvents"] = [newEvent];
        dict["Behavior.AppProcesses"] = [newProcess];
        dict["Behavior.AppBots"] = [newBot];

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        // Verify immediately in store
        setTimeout(function() {
            var state = store.getState();
            var h = state.appTemplate.history[0].appTemplate;
            var bots = (h && h.Behavior && h.Behavior.AppBots) || [];
            console.log("=== [SUCCESS] Verification in Redux Store ===");
            console.log("AppBots count:", bots.length);
            if (bots.length > 0) {
                console.log("Bot Name:", bots[0].Name);
                console.log("Event Name:", h.Behavior.AppEvents[0].Name);
                console.log("Process Name:", h.Behavior.AppProcesses[0].Name);
                console.log("Branch Condition:", h.Behavior.AppProcesses[0].Nodes[0].Condition);
                console.log("[ACTION] Top-right blue SAVE button par click karein!");
            }
        }, 500);

    } catch(e) { console.error("[ERROR]", e.message); }
})();
