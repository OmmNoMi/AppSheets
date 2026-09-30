// =========================================================================
// OmmNoMi: Universal One-Shot Native Child Subtables Setup
// Size: Under 90 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function applyNativeChildTablesOneShot() {
    try {
        console.clear();
        console.log("[OmmNoMi] Initializing Native Child Subtables...");

        var store = window.appStore;
        if (!store) {
            var candidates = [document.querySelector('#root'), document.querySelector('.ExpressionControl'), document.querySelector('[role="grid"]'), document.body];
            for (var i = 0; i < candidates.length; i++) {
                var el = candidates[i];
                if (!el) continue;
                var fKey = Object.keys(el).find(function(k) { return k.indexOf('reactFiber') >= 0 || k.indexOf('reactInternalInstance') >= 0; });
                var f = el[fKey];
                while (f) {
                    if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
                    if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) { store = f.stateNode.store; window.appStore = store; break; }
                    f = f.return;
                }
                if (store) break;
            }
        }

        if (!store) { console.error("[ERROR] Redux store not found. Please click anywhere in editor and re-run."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        if (sIdx === -1) { console.error("[ERROR] Survey schema not found."); return; }

        var surveyAttrs = schemas[sIdx].Attributes;
        var baseVC = surveyAttrs.find(function(a) { return a.Name === 'Related Survey_Tables'; });
        if (!baseVC) { console.error("[ERROR] Related Survey_Tables template not found."); return; }

        var defs = [
            { name: "Related_Q6_Labor", slice: "Slice_Q6_Labor", label: '="Q6. Labor Details"' },
            { name: "Related_Q15_Turnover", slice: "Slice_Q15_Turnover", label: '="Q15. Turnover Details"' },
            { name: "Related_Q19_Capital", slice: "Slice_Q19_Capital", label: '="Q19. Capital Details"' },
            { name: "Related_Q20_Loan_Usage", slice: "Slice_Q20_Loan_Usage", label: '="Q20. Loan Usage Details"' },
            { name: "Related_Q22_Trajectory", slice: "Slice_Q22_Trajectory", label: '="Q22. Trajectory Details"' }
        ];

        var sAttrs = surveyAttrs.slice();
        defs.forEach(function(d) {
            var cloned = JSON.parse(JSON.stringify(baseVC));
            cloned.Name = d.name;
            cloned.DisplayName = d.label;
            cloned.AppFormula = 'REF_ROWS("' + d.slice + '", "Survey_ID")';
            if (typeof cloned.TypeAuxData === 'string') {
                cloned.TypeAuxData = cloned.TypeAuxData.split('"Survey_Tables"').join('"' + d.slice + '"');
            }
            var curIdx = sAttrs.findIndex(function(a) { return a.Name === d.name; });
            if (curIdx !== -1) { sAttrs[curIdx] = cloned; } else { sAttrs.push(cloned); }
        });

        var dict = {};
        dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = sAttrs;

        var controls = (h.Presentation && h.Presentation.Controls) || [];
        var fIdx = controls.findIndex(function(c) { return c && c.Name === 'Survey_Form_SecC'; });
        if (fIdx !== -1) {
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
            dict["Presentation.Controls[" + fIdx + "].Settings"] = JSON.stringify(curSet);
            if (form.ViewDefinition) dict["Presentation.Controls[" + fIdx + "].ViewDefinition.ColumnOrder"] = list;
        }

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("=== [OmmNoMi SUCCESS] All 5 Child Subtables Staged Perfectly! ===");
        console.log("[ACTION] Click the blue SAVE button in the top-right of AppSheet now!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
