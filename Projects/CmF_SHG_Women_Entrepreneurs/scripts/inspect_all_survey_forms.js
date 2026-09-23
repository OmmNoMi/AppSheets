// =========================================================================
// OmmNoMi: Inspect All Survey Form Views
// Size: Under 30 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectAllSurveyForms() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var views = h.AppViews || (h.AppData && h.AppData.AppViews) || [];
        var viewsList = Array.isArray(views) ? views : Object.values(views);
        console.log("=== All Form Views for Survey ===");
        viewsList.forEach(function(v) {
            if (v && v.ViewType === 'Form') {
                console.log("Form:", v.Name, "| Table:", v.TableName, "| ColCount:", v.ColumnOrder ? v.ColumnOrder.length : "ALL");
            }
        });
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
