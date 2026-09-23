// =========================================================================
// OmmNoMi: Visual Inspection & Verification of Native Child Tables
// Size: Under 65 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function visualAuditChildTables() {
    try {
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
        if (!store) { console.error("[ERROR] Redux store not accessible."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var s = schemas.find(function(x) { return x && (x.Name === 'Survey_Schema' || x.Name === 'Survey'); });
        var slices = (h && h.AppData && h.AppData.TableSlices) || [];
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        var secC = controls.find(function(ctl) { return ctl && ctl.Name === 'Survey_Form_SecC'; });

        var curSet = secC && typeof secC.Settings === 'string' ? JSON.parse(secC.Settings) : (secC && secC.Settings) || {};
        var formCols = (curSet && curSet.ColumnOrder) || (secC && secC.ViewDefinition && secC.ViewDefinition.ColumnOrder) || [];

        var questions = [
            { id: "Q6", name: "Labor & Family", col: "Related_Q6_Labor", slice: "Slice_Q6_Labor" },
            { id: "Q15", name: "Turnover & Profit", col: "Related_Q15_Turnover", slice: "Slice_Q15_Turnover" },
            { id: "Q19", name: "Capital Arranged", col: "Related_Q19_Capital", slice: "Slice_Q19_Capital" },
            { id: "Q20", name: "Loan Usage", col: "Related_Q20_Loan_Usage", slice: "Slice_Q20_Loan_Usage" },
            { id: "Q22", name: "Business Trajectory", col: "Related_Q22_Trajectory", slice: "Slice_Q22_Trajectory" }
        ];

        var auditRows = questions.map(function(q) {
            var attr = s ? s.Attributes.find(function(a) { return a.Name === q.col; }) : null;
            var sl = slices.find(function(item) { return item && item.Name === q.slice; });
            var inForm = formCols.indexOf(q.col) >= 0;
            var formPos = inForm ? "Position #" + (formCols.indexOf(q.col) + 1) : "NOT IN FORM";

            return {
                "Question": q.id + " - " + q.name,
                "Virtual Column": attr ? "[OK] Present" : "[FAIL] Missing",
                "Formula": attr ? attr.AppFormula : "N/A",
                "Slice Connected": sl ? "[OK] " + sl.Name : "[FAIL] Missing",
                "Form View Status": inForm ? "[OK] Active (" + formPos + ")" : "[FAIL] Missing"
            };
        });

        console.log("================================================================================");
        console.log("       [OmmNoMi] SECTION C NATIVE INLINE CHILD SUBTABLES - LIVE AUDIT           ");
        console.log("================================================================================");
        console.table(auditRows);

        var allOk = auditRows.every(function(r) {
            return r["Virtual Column"].indexOf("[OK]") >= 0 && r["Slice Connected"].indexOf("[OK]") >= 0 && r["Form View Status"].indexOf("[OK]") >= 0;
        });

        if (allOk) {
            console.log("[RESULT] 100% READY: All 5 Child Matrix Tables are wired into Section C Form!");
        } else {
            console.log("[RESULT] Some components need attention. See table above.");
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
