// =========================================================================
// OmmNoMi: Verify Native Child Tables in AppSheet After Save
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function verifyNativeChildTables() {
    try {
        var store = window.appStore;
        if (!store) { console.error("[ERROR] Redux store not accessible."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var s = schemas.find(function(x) { return x && (x.Name === 'Survey_Schema' || x.Name === 'Survey'); });
        var c = schemas.find(function(x) { return x && (x.Name === 'Survey_Tables_Schema' || x.Name === 'Survey_Tables'); });

        console.log("=== [OmmNoMi] LIVE HEALTH AUDIT AFTER SAVE ===");
        var vcs = ["Related_Q6_Labor", "Related_Q15_Turnover", "Related_Q19_Capital", "Related_Q20_Loan_Usage", "Related_Q22_Trajectory"];
        var foundVCs = s ? s.Attributes.filter(function(a) { return vcs.indexOf(a.Name) >= 0; }).map(function(a) { return a.Name + " (" + a.AppFormula + ")"; }) : [];
        console.log("[1] Virtual Columns in Survey (" + foundVCs.length + "/5):", foundVCs);

        var sid = c ? c.Attributes.find(function(a) { return a.Name === 'Survey_ID'; }) : null;
        console.log("[2] Child Survey_ID:", sid ? { Type: sid.Type, Ref: sid.ReferencedTableName, IsAPartOf: sid.IsAPartOf } : "missing");

        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        var secC = controls.find(function(ctl) { return ctl && ctl.Name === 'Survey_Form_SecC'; });
        var formCols = (secC && secC.ColumnOrder) || (secC && secC.ViewDefinition && secC.ViewDefinition.ColumnOrder) || [];
        var activeInForm = formCols.filter(function(col) { return vcs.indexOf(col) >= 0; });
        console.log("[3] Active Subtables in Section C Form (" + activeInForm.length + "/5):", activeInForm);

        if (foundVCs.length === 5 && activeInForm.length === 5) {
            console.log("=== [SUCCESS] 100% VERIFIED! ALL 5 INLINE CHILD TABLES ARE NATIVELY ACTIVE ===");
        } else {
            console.log("[INFO] Click Save if you haven't yet, or inspect the counts above.");
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
