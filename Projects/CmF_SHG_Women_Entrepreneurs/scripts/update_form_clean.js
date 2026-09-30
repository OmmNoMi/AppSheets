// =========================================================================
// OmmNoMi: Clean Form ColumnOrder Injection for Survey_Form_SecC
// Size: Under 50 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function updateFormClean() {
    try {
        var store = window.appStore;
        if (!store) { console.error("[ERROR] Redux store not found."); return; }
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        var fIdx = controls.findIndex(function(c) { return c && c.Name === 'Survey_Form_SecC'; });
        if (fIdx === -1) { console.error("[ERROR] Survey_Form_SecC not found."); return; }

        var form = controls[fIdx];
        var curSet = typeof form.Settings === 'string' ? JSON.parse(form.Settings) : Object.assign({}, form.Settings);
        var list = (curSet.ColumnOrder && curSet.ColumnOrder.slice()) || [];

        var ins = function(target, newCol) {
            if (list.indexOf(newCol) >= 0) return;
            var idx = list.indexOf(target);
            if (idx >= 0) { list.splice(idx + 1, 0, newCol); } else { list.push(newCol); }
        };

        ins("SEC_C_Q06_HEADER", "Related_Q6_Labor");
        ins("SEC_C_Q15_HEADER", "Related_Q15_Turnover");
        ins("SEC_C_Q19_HEADER", "Related_Q19_Capital");
        ins("SEC_C_Q20_HEADER", "Related_Q20_Loan_Usage");
        ins("SEC_C_Q22_HEADER", "Related_Q22_Trajectory");

        curSet.ColumnOrder = list;
        var setStr = JSON.stringify(curSet);

        var dict = {};
        dict["Presentation.Controls[" + fIdx + "].Settings"] = setStr;
        if (form.ViewDefinition) {
            dict["Presentation.Controls[" + fIdx + "].ViewDefinition.ColumnOrder"] = list;
        }

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
        console.log("=== [OmmNoMi SUCCESS] Section C Form ColumnOrder updated! ===");
        console.log("[ACTION] Click the blue SAVE button in top-right now.");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
