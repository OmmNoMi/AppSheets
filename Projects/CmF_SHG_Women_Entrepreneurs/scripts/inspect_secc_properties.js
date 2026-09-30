// =========================================================================
// OmmNoMi: Inspect all properties of Presentation.Controls[12]
// Size: Under 25 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectSecCProperties() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var secC = h.Presentation.Controls[12];
        console.log("=== Survey_Form_SecC Properties ===");
        console.log("Keys:", Object.keys(secC));
        console.log("TableName:", secC.TableName);
        console.log("ViewType:", secC.ViewType || secC.Type);
        console.log("Slice:", secC.Slice || secC.TableSliceName || secC.SourceTable);
        console.log("QuickEditColumns:", secC.QuickEditColumns);
        console.log("All non-null props:", Object.keys(secC).reduce(function(acc, k) {
            if (secC[k] !== null && secC[k] !== undefined && typeof secC[k] !== 'object') acc[k] = secC[k];
            return acc;
        }, {}));
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
