// =========================================================================
// OmmNoMi: Inspect SecC Properties and Show_If Formulas
// Size: Under 35 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectSecCAndShowIf() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var secC = h.Presentation.Controls[12];
        console.log("=== 1. Survey_Form_SecC View ===");
        console.log("TableName / Source:", secC.TableName || secC.SourceTable || secC.Source);
        console.log("ViewType:", secC.ViewType || secC.Type);

        console.log("=== 2. Show_If Check in Survey Schema ===");
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var survey = schemas.find(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        if (survey && survey.Attributes) {
            var q5 = survey.Attributes.find(function(a) { return a.Name === 'LocationConvenience'; });
            var q7 = survey.Attributes.find(function(a) { return a.Name === 'AnnualSalaryBill'; });
            var q6 = survey.Attributes.find(function(a) { return a.Name === 'Related_Q6_Labor'; });

            console.log("Q5 LocationConvenience Show_If:", q5 ? q5.Show_If : "null");
            console.log("Q7 AnnualSalaryBill Show_If:", q7 ? q7.Show_If : "null");
            console.log("Q6 Related_Q6_Labor Show_If:", q6 ? q6.Show_If : "null");
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
