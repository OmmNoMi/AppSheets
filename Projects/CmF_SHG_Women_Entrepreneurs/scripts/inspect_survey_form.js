// =========================================================================
// OmmNoMi: Inspect Survey_Form ColumnOrder and Section C Placement
// Size: Under 35 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectSurveyForm() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var views = h.AppViews || (h.AppData && h.AppData.AppViews) || [];
        var viewsList = Array.isArray(views) ? views : Object.values(views);
        var form = viewsList.find(function(v) { return v && (v.Name === 'Survey_Form' || (v.TableName === 'Survey' && v.ViewType === 'Form')); });
        if (!form) {
            console.log("[WARN] Survey_Form not found directly. Listing all Form views:");
            viewsList.forEach(function(v) { if (v && v.ViewType === 'Form') console.log(" - Form:", v.Name, "Table:", v.TableName); });
            return;
        }
        console.log("=== Survey_Form Info ===");
        console.log("Name:", form.Name);
        console.log("Has ColumnOrder:", !!form.ColumnOrder, "Count:", form.ColumnOrder ? form.ColumnOrder.length : 0);
        if (form.ColumnOrder) {
            var cCols = form.ColumnOrder.filter(function(c) {
                return c.indexOf('SEC_C') >= 0 || c.indexOf('LocationConvenience') >= 0 || c.indexOf('Related') >= 0;
            });
            console.log("Section C & Related columns in order:", cCols);
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
