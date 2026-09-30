// =========================================================================
// OmmNoMi: Part 2 - Fix Display Names on Parent Table & Inline View
// Pure ASCII, <50 lines, Validated with node -c
// =========================================================================
(function fixDisplayNamesPart2() {
    try {
        var store = window.appStore;
        if (!store) { console.error("[ERROR] Run Part 1 first or locate store."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        if (sIdx === -1) { console.error("[ERROR] Survey schema not found."); return; }

        var sAttrs = schemas[sIdx].Attributes.slice();
        var q6Title = '="Q6. Involvement of family members and hired help in business operations"';

        sAttrs.forEach(function(a, idx) {
            if (a.Name === 'Related Survey_Tables' || a.Name === 'Related_Q6_Labor') {
                var cl = Object.assign({}, a); cl.DisplayName = q6Title; sAttrs[idx] = cl;
            } else if (a.Name === 'Related_Q15_Turnover') {
                var cl = Object.assign({}, a); cl.DisplayName = '="Q15. Turnover and income from the enterprise"'; sAttrs[idx] = cl;
            } else if (a.Name === 'Related_Q19_Capital') {
                var cl = Object.assign({}, a); cl.DisplayName = '="Q19. How have you arranged capital over the enterprise duration?"'; sAttrs[idx] = cl;
            } else if (a.Name === 'Related_Q20_Loan_Usage') {
                var cl = Object.assign({}, a); cl.DisplayName = '="Q20. How did you use the loans taken from different sources?"'; sAttrs[idx] = cl;
            } else if (a.Name === 'Related_Q22_Trajectory') {
                var cl = Object.assign({}, a); cl.DisplayName = '="Q22. What changes have happened in your business?"'; sAttrs[idx] = cl;
            }
        });

        var dict = {};
        dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = sAttrs;

        var controls = (h.Presentation && h.Presentation.Controls) || [];
        controls.forEach(function(ctl, idx) {
            if (ctl && (ctl.Name === 'Survey_Tables_Inline' || (ctl.TableOrFolderName === 'Survey_Tables' && ctl.Action === 'table'))) {
                dict["Presentation.Controls[" + idx + "].DisplayName"] = q6Title;
            }
        });

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
        console.log("[OmmNoMi OK] Part 2 Applied: Clean Display Names set! Click SAVE now.");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
