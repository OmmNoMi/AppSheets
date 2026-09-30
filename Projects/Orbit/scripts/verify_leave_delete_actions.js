// =========================================================================
// OmmNoMi Orbit: Verify Leave Delete Actions in Redux State
// 100% Pure ASCII, Read-Only Diagnostic
// =========================================================================
(function verifyLeaveDeleteActions() {
    try {
        var store = window.appStore;
        if (!store) {
            console.error("[ERROR] window.appStore not found.");
            return;
        }
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (!h) {
            console.error("[ERROR] appTemplate not found.");
            return;
        }

        var actions = (h.AppData && h.AppData.DataActions) || (h.Presentation && h.Presentation.Controls) || [];
        var targets = [
            "Act_AR_Delete_Related_AttendanceDaily",
            "Act_AR_Delete_This_Request",
            "Delete_Approved_Leave"
        ];

        console.log("=== [OmmNoMi] Action Verification Results ===");
        var foundCount = 0;
        targets.forEach(function(t) {
            var act = actions.find(function(a) { return a && a.Name === t; });
            if (act) {
                console.log("[PASS] Action:", t, "| Type:", act.ActionType, "| Table:", act.Table);
                foundCount++;
            } else {
                console.error("[FAIL] Action not found:", t);
            }
        });

        if (foundCount === 3) {
            console.log("=== [100% SUCCESS] All 3 actions are active in Redux! ===");
            console.log("Click the top-right blue SAVE button to persist to Google Cloud.");
        } else {
            console.warn("[WARN] Only found " + foundCount + " / 3 actions.");
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
