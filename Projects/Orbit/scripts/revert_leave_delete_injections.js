// =========================================================================
// OmmNoMi Orbit: Immediate Revert & Cleanup Script
// Removes the injected bot, process, event, and actions to clear errors
// 100% Pure ASCII, Validated with node -c
// =========================================================================
(function revertLeaveDeleteInjections() {
    try {
        console.log("=== [OmmNoMi] Cleaning Up Injected Items ===");
        var store = window.appStore;
        if (!store) {
            console.error("[ERROR] window.appStore not found. Refresh page to restore previous clean state.");
            return;
        }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (!h) {
            console.error("[ERROR] appTemplate not found.");
            return;
        }

        var dict = {};

        // 1. Remove Bot
        if (h.Behavior && h.Behavior.AppBots) {
            dict["Behavior.AppBots"] = h.Behavior.AppBots.filter(function(b) {
                return b && b.Name !== "Bot_Delete_Approved_Leave_Cleanup";
            });
        }

        // 2. Remove Event
        if (h.Behavior && h.Behavior.AppEvents) {
            dict["Behavior.AppEvents"] = h.Behavior.AppEvents.filter(function(e) {
                return e && e.Name !== "Event_AttendanceRequest_Deleted";
            });
        }

        // 3. Remove Process
        if (h.Behavior && h.Behavior.AppProcesses) {
            dict["Behavior.AppProcesses"] = h.Behavior.AppProcesses.filter(function(p) {
                return p && p.Name !== "Process_AttendanceRequest_Deleted_Cleanup";
            });
        }

        // 4. Remove Injected Actions
        var actionsToRemove = [
            "Act_Bot_Delete_AttendanceDaily",
            "Delete_Approved_Leave"
        ];

        if (h.AppData && h.AppData.DataActions) {
            dict["AppData.DataActions"] = h.AppData.DataActions.filter(function(a) {
                return a && actionsToRemove.indexOf(a.Name) === -1;
            });
        }

        if (h.Presentation && h.Presentation.Controls) {
            dict["Presentation.Controls"] = h.Presentation.Controls.filter(function(c) {
                return c && actionsToRemove.indexOf(c.Name) === -1;
            });
        }

        store.dispatch({
            type: 'SET_EDITOR_OPTIONS',
            nameValueDict: dict,
            recordHistory: true,
            ignoreConstraints: false,
            skipNavigation: false
        });

        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: false });

        console.log("[OK] Cleaned up all injected bot, event, process, and temporary actions.");
        console.log("[INFO] You can also simply REFRESH the browser tab without saving to discard!");
    } catch(err) {
        console.error("[OmmNoMi ERROR]", err.message);
    }
})();
