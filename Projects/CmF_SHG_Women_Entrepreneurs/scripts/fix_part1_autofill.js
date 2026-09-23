// =========================================================================
// OmmNoMi: Part 1 - Fix Table_Type Auto-Fill & Enum in Survey_Tables
// Pure ASCII, <50 lines, Validated with node -c
// =========================================================================
(function fixAutofillPart1() {
    try {
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
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });
        if (cIdx === -1) { console.error("[ERROR] Survey_Tables schema not found."); return; }

        var cAttrs = schemas[cIdx].Attributes.slice();
        var ttIdx = cAttrs.findIndex(function(a) { return a.Name === 'Table_Type'; });
        var enumList = ["Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory"];
        var ttFormula = '=IFS(IN("Labor", CONTEXT("View")), "Q6_Labor", IN("Turnover", CONTEXT("View")), "Q15_Turnover", IN("Capital", CONTEXT("View")), "Q19_Capital", IN("Loan", CONTEXT("View")), "Q20_Loan_Usage", IN("Trajectory", CONTEXT("View")), "Q22_Trajectory", TRUE, "Q6_Labor")';

        if (ttIdx !== -1) {
            var tt = Object.assign({}, cAttrs[ttIdx]);
            tt.Type = "Enum";
            tt.EnumValues = enumList;
            tt.InitialValue = ttFormula;
            tt.Valid_If = '=LIST("Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory")';
            tt.DisplayName = '="Section / Question Type"';
            var aux = {};
            try { aux = typeof tt.TypeAuxData === 'string' ? JSON.parse(tt.TypeAuxData) : (tt.TypeAuxData || {}); } catch(e) {}
            aux.EnumValues = enumList; aux.BaseType = "Text"; aux.EnumInputMode = "Auto";
            tt.TypeAuxData = JSON.stringify(aux);
            cAttrs[ttIdx] = tt;
        }

        var dict = {};
        dict["AppData.DataSchemas[" + cIdx + "].Attributes"] = cAttrs;
        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
        console.log("[OmmNoMi OK] Part 1 Applied: Table_Type Auto-Fill & Enum configured!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
