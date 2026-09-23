// =========================================================================
// OmmNoMi: Clean Schema Fix (Zero Backend Errors, Exact C# Schema Properties)
// Pure ASCII, Validated with node -c
// =========================================================================
(function fixAppSheetSubtablesClean() {
    try {
        console.clear();
        console.log("[OmmNoMi] Applying Clean Subtable & Display Name Fix...");

        var store = window.appStore;
        if (!store) {
            var c = [document.querySelector('#root'), document.querySelector('.ExpressionControl'), document.body];
            for (var i = 0; i < c.length; i++) {
                var el = c[i]; if (!el) continue;
                var k = Object.keys(el).find(function(x) { return x.indexOf('reactFiber') >= 0 || x.indexOf('reactInternalInstance') >= 0; });
                var f = el[k];
                while (f) {
                    if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
                    if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) { store = f.stateNode.store; window.appStore = store; break; }
                    f = f.return;
                }
                if (store) break;
            }
        }
        if (!store) { console.error("[ERROR] Redux store not found."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });

        if (sIdx === -1 || cIdx === -1) { console.error("[ERROR] Schemas not found."); return; }

        var dict = {};
        var q6Title = '="Q6. Involvement of family members and hired help in business operations"';

        // 1. Set clean Display Names on Parent table (Survey) Virtual Columns
        var sAttrs = schemas[sIdx].Attributes;
        sAttrs.forEach(function(a, idx) {
            var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "]";
            if (a.Name === 'Related Survey_Tables' || a.Name === 'Related_Q6_Labor') {
                a.DisplayName = q6Title;
                dict[p + ".DisplayName"] = q6Title;
            } else if (a.Name === 'Related_Q15_Turnover') {
                a.DisplayName = '="Q15. Turnover and income from the enterprise"';
                dict[p + ".DisplayName"] = '="Q15. Turnover and income from the enterprise"';
            } else if (a.Name === 'Related_Q19_Capital') {
                a.DisplayName = '="Q19. How have you arranged capital over the enterprise duration?"';
                dict[p + ".DisplayName"] = '="Q19. How have you arranged capital over the enterprise duration?"';
            } else if (a.Name === 'Related_Q20_Loan_Usage') {
                a.DisplayName = '="Q20. How did you use the loans taken from different sources?"';
                dict[p + ".DisplayName"] = '="Q20. How did you use the loans taken from different sources?"';
            } else if (a.Name === 'Related_Q22_Trajectory') {
                a.DisplayName = '="Q22. What changes have happened in your business?"';
                dict[p + ".DisplayName"] = '="Q22. What changes have happened in your business?"';
            }
        });

        // 2. Set Table_Type in Child table (Survey_Tables) - ONLY valid C# backend properties!
        var cAttrs = schemas[cIdx].Attributes;
        var ttIdx = cAttrs.findIndex(function(a) { return a.Name === 'Table_Type'; });
        var enumList = ["Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory"];
        var ttFormula = '=IFS(IN("Labor", CONTEXT("View")), "Q6_Labor", IN("Turnover", CONTEXT("View")), "Q15_Turnover", IN("Capital", CONTEXT("View")), "Q19_Capital", IN("Loan", CONTEXT("View")), "Q20_Loan_Usage", IN("Trajectory", CONTEXT("View")), "Q22_Trajectory", TRUE, "Q6_Labor")';

        if (ttIdx !== -1) {
            var pTT = "AppData.DataSchemas[" + cIdx + "].Attributes[" + ttIdx + "]";
            var tt = cAttrs[ttIdx];

            var aux = {};
            try { aux = typeof tt.TypeAuxData === 'string' ? JSON.parse(tt.TypeAuxData) : (tt.TypeAuxData || {}); } catch(e) {}
            aux.EnumValues = enumList;
            aux.BaseType = "Text";
            aux.EnumInputMode = "Auto";
            aux.AllowOtherValues = false;
            aux.AutoCompleteOtherValues = false;
            var auxStr = JSON.stringify(aux);

            // In-memory update
            tt.Type = "Enum";
            tt.InitialValue = ttFormula;
            tt.DisplayName = '="Section / Question Type"';
            tt.TypeAuxData = auxStr;

            // Strict C# backend property paths (NO .EnumValues, NO .Valid_If)
            dict[pTT + ".Type"] = "Enum";
            dict[pTT + ".InitialValue"] = ttFormula;
            dict[pTT + ".DisplayName"] = '="Section / Question Type"';
            dict[pTT + ".TypeAuxData"] = auxStr;
        }

        // 3. Set Display Names on Presentation Controls
        var controls = (h.Presentation && h.Presentation.Controls) || [];
        controls.forEach(function(ctl, idx) {
            if (ctl && (ctl.Name === 'Survey_Tables_Inline' || ctl.Name === 'Survey_Tables_Form' || (ctl.TableOrFolderName === 'Survey_Tables' && ctl.Action === 'table'))) {
                ctl.DisplayName = q6Title;
                dict["Presentation.Controls[" + idx + "].DisplayName"] = q6Title;
            }
        });

        // 4. Dispatch clean deltas to Redux
        store.dispatch({
            type: 'SET_EDITOR_OPTIONS',
            nameValueDict: dict,
            recordHistory: true,
            ignoreConstraints: false,
            skipNavigation: false
        });

        // 5. Trigger Emulator Recalculation & Show Save Button
        try {
            store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
            store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
        } catch(e) {}

        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("=== [OmmNoMi SUCCESS] Clean Schema Deltas Dispatched! ===");
        console.log("[1] Table_Type InitialValue:", cAttrs[ttIdx].InitialValue);
        console.log("[2] Related Survey_Tables DisplayName:", sAttrs.find(function(a){return a.Name==='Related Survey_Tables';}).DisplayName);
        console.log("[3] Related_Q6_Labor DisplayName:", sAttrs.find(function(a){return a.Name==='Related_Q6_Labor';}).DisplayName);
        console.log("--> NOW: Look at the top-right blue SAVE button in AppSheet and click it!");
        console.log("--> Wait 5-10 seconds for the save spinner to finish.");

        // 6. Automatically refresh emulator iframe if accessible
        var iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(ifr) {
            try { ifr.src = ifr.src; console.log("[INFO] Emulator iframe reloaded!"); } catch(e) {}
        });

    } catch(e) { console.error("[ERROR]", e.message); }
})();
