// =========================================================================
// OmmNoMi: Apply AppVariables LOOKUP Display Names & Context Auto-Fill
// Pure ASCII, Redux Protocol, Standard Architectural Pattern
// =========================================================================
(function applyAppVariablesLookupAndAutofill() {
    try {
        var store = window.appStore;
        if (!store) { console.error("[ERROR] Redux store not found."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && s.Name && s.Name.indexOf('Survey_Schema') >= 0; });
        var tIdx = schemas.findIndex(function(s) { return s && s.Name && s.Name.indexOf('Survey_Tables_Schema') >= 0; });

        if (sIdx === -1 || tIdx === -1) { console.error("[ERROR] Schemas not found."); return; }

        var dict = {};

        // 1. Dynamic AppVariables LOOKUP Display Names
        var vcs = {
            "Related_Q6_Labor": '=LOOKUP("Q_C_06_00", "AppVariables", "ID", "Label")',
            "Related_Q15_Turnover": '=LOOKUP("Q_C_15_00", "AppVariables", "ID", "Label")',
            "Related_Q19_Capital": '=LOOKUP("Q_C_19_00", "AppVariables", "ID", "Label")',
            "Related_Q20_Loan_Usage": '=LOOKUP("Q_C_20_00", "AppVariables", "ID", "Label")',
            "Related_Q22_Trajectory": '=LOOKUP("Q_C_22_00", "AppVariables", "ID", "Label")',
            "Related Survey_Tables": '=LOOKUP("Q_C_06_00", "AppVariables", "ID", "Label")'
        };

        var sAttrs = schemas[sIdx].Attributes;
        sAttrs.forEach(function(a, idx) {
            if (vcs[a.Name]) {
                var f = vcs[a.Name];
                a.DisplayName = f;
                a.Description = "";
                dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].DisplayName"] = f;
                dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].Description"] = "";
            }
        });

        // 2. Context Auto-Fill for Table_Type InitialValue
        var tAttrs = schemas[tIdx].Attributes;
        var ttIdx = tAttrs.findIndex(function(a) { return a.Name === 'Table_Type'; });
        if (ttIdx >= 0) {
            var autoFillFormula = '=IFS(IN("Labor", CONTEXT("View")), "Q6_Labor", IN("Turnover", CONTEXT("View")), "Q15_Turnover", IN("Capital", CONTEXT("View")), "Q19_Capital", IN("Loan", CONTEXT("View")), "Q20_Loan_Usage", IN("Trajectory", CONTEXT("View")), "Q22_Trajectory", TRUE, "Q6_Labor")';
            tAttrs[ttIdx].InitialValue = autoFillFormula;
            dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + ttIdx + "].InitialValue"] = autoFillFormula;
        }

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OK] Successfully applied AppVariables LOOKUP formulas and context auto-fill to Redux!");
    } catch(err) {
        console.error("[ERROR]", err.message);
    }
})();
