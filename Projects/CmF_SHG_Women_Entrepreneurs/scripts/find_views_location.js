// =========================================================================
// OmmNoMi: Find Views Location in Redux
// Size: Under 25 lines, SOP-A5 Pure ASCII
// =========================================================================
(function findViewsLocation() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (h.Presentation) {
            console.log("Presentation keys:", Object.keys(h.Presentation));
            if (h.Presentation.Views) console.log("Presentation.Views count:", h.Presentation.Views.length);
        }
        if (h.AppData) {
            var vKeys = Object.keys(h.AppData).filter(function(k) { return k.toLowerCase().indexOf('view') >= 0; });
            console.log("AppData view keys:", vKeys);
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
