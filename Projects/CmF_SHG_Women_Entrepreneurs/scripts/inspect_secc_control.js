// =========================================================================
// OmmNoMi: Inspect Survey_Form_SecC in Presentation.Controls
// Size: Under 30 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectSecCControl() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var controls = h.Presentation.Controls || [];
        var secC = controls.find(function(c) { return c && c.Name === 'Survey_Form_SecC'; });
        if (!secC) {
            console.log("[ERROR] Survey_Form_SecC not found in Controls");
            return;
        }
        console.log("=== Survey_Form_SecC Control ===");
        console.log("Name:", secC.Name, "Type:", secC.Type);
        console.log("Has ColumnOrder:", !!secC.ColumnOrder);
        console.log("ColumnOrder items:", secC.ColumnOrder);
        console.log("Controls index:", controls.indexOf(secC));
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
