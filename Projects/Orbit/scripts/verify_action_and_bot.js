// =========================================================================
// OmmNoMi Orbit: Verify 1 Action + 1 Automation Bot in Redux
// 100% Pure ASCII, Read-Only Diagnostic
// =========================================================================
(function verifyActionAndBot() {
    try {
        var store = window.appStore;
        if (!store) { console.error("[ERROR] window.appStore not found."); return; }
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (!h) { console.error("[ERROR] appTemplate not found."); return; }

        console.log("=== [OmmNoMi] Action & Bot Verification ===");

        // 1. Verify Action
        var actions = (h.AppData && h.AppData.DataActions) || [];
        var act = actions.find(function(a) { return a && a.Name === "Delete_Approved_Leave"; });
        if (act) {
            console.log("[PASS] Action:", act.Name, "| Type:", act.ActionType, "| Table:", act.Table);
        } else {
            console.error("[FAIL] Action 'Delete_Approved_Leave' not found in DataActions.");
        }

        // 2. Verify Bot
        var bots = (h.Behavior && h.Behavior.AppBots) || [];
        var bot = bots.find(function(b) { return b && b.Name === "Bot_Delete_Approved_Leave_Cleanup"; });
        if (bot) {
            console.log("[PASS] Bot:", bot.Name, "| Event:", bot.EventName, "| Process:", bot.ProcessName);
        } else {
            console.error("[FAIL] Bot 'Bot_Delete_Approved_Leave_Cleanup' not found in AppBots.");
        }

        // 3. Verify Event
        var events = (h.Behavior && h.Behavior.AppEvents) || [];
        var ev = events.find(function(e) { return e && e.Name === "Event_AttendanceRequest_Deleted"; });
        if (ev) {
            console.log("[PASS] Event:", ev.Name, "| ChangeEvent:", ev.AppEventDefinition && ev.AppEventDefinition.ChangeEvent);
        } else {
            console.error("[FAIL] Event 'Event_AttendanceRequest_Deleted' not found in AppEvents.");
        }

        // 4. Verify Process & Steps
        var procs = (h.Behavior && h.Behavior.AppProcesses) || [];
        var proc = procs.find(function(p) { return p && p.Name === "Process_AttendanceRequest_Deleted_Cleanup"; });
        if (proc) {
            console.log("[PASS] Process:", proc.Name, "| Steps Count:", (proc.Nodes && proc.Nodes.length) || 0);
            if (proc.Nodes) {
                proc.Nodes.forEach(function(n, idx) {
                    console.log("  -> Step " + (idx+1) + ":", n.StepName, "| Action:", n.Action);
                });
            }
        } else {
            console.error("[FAIL] Process 'Process_AttendanceRequest_Deleted_Cleanup' not found in AppProcesses.");
        }

        if (act && bot && ev && proc) {
            console.log("=== [100% SUCCESS] 1 Action + 1 Complete Bot verified in Redux! ===");
            console.log("Click the top-right blue SAVE button to persist permanently.");
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
