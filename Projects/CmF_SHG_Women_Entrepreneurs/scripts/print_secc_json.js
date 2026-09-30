// =========================================================================
// OmmNoMi: Print exact JSON of Presentation.Controls[12]
// Size: Under 20 lines, SOP-A5 Pure ASCII
// =========================================================================
(function printSecCJSON() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var secC = h.Presentation.Controls[12];
        console.log("=== Survey_Form_SecC Full JSON ===");
        console.log(JSON.stringify(secC, null, 2));
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
