// =========================================================================
// OmmNoMi: Step 2 - Inject 5 Child VCs into Survey_Form_SecC ColumnOrder
// Size: Under 55 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function updateSecCFormColumnOrder() {
    try {
        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var fKey = Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; });
            var f = root[fKey];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; window.appStore = store; break; }
                f = f.return;
            }
        }
        if (!store) { console.error("[ERROR] Redux store not found."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        var fIdx = controls.findIndex(function(c) { return c && (c.Name === 'Survey_Form_SecC' || (c.Name && c.Name.indexOf('SecC') >= 0 && c.ViewType === 'Form')); });

        if (fIdx === -1) { console.error("[ERROR] Survey_Form_SecC not found in Presentation.Controls."); return; }

        var form = controls[fIdx];
        var colOrder = (form.ColumnOrder && form.ColumnOrder.slice()) || [];

        var insertAfter = function(target, newCol) {
            if (colOrder.indexOf(newCol) >= 0) return;
            var idx = colOrder.indexOf(target);
            if (idx >= 0) { colOrder.splice(idx + 1, 0, newCol); } else { colOrder.push(newCol); }
        };

        insertAfter("SEC_C_Q06_HEADER", "Related_Q6_Labor");
        insertAfter("SEC_C_Q15_HEADER", "Related_Q15_Turnover");
        insertAfter("SEC_C_Q19_HEADER", "Related_Q19_Capital");
        insertAfter("SEC_C_Q20_HEADER", "Related_Q20_Loan_Usage");
        insertAfter("SEC_C_Q22_HEADER", "Related_Q22_Trajectory");

        var dict = {};
        dict["Presentation.Controls[" + fIdx + "].ColumnOrder"] = colOrder;
        if (form.ViewDefinition) dict["Presentation.Controls[" + fIdx + "].ViewDefinition.ColumnOrder"] = colOrder;
        if (form.Settings) dict["Presentation.Controls[" + fIdx + "].Settings.ColumnOrder"] = colOrder;

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("=== [OmmNoMi SUCCESS] Section C Form updated with all 5 child subtables! ===");
        console.log("[ACTION] Click the blue 'Save' button in the top right of AppSheet now!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
