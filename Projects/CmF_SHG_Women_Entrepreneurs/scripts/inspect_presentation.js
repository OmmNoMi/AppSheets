// =========================================================================
// OmmNoMi: Inspect h.Presentation & Locate Views in Redux
// Size: Under 25 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectPresentation() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        console.log("Presentation keys:", h.Presentation ? Object.keys(h.Presentation) : "NO PRESENTATION");
        var viewKeys = [];
        for (var k in h) {
            if (k.toLowerCase().indexOf('view') >= 0) viewKeys.push(k);
        }
        console.log("Keys in h with 'view':", viewKeys);
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
