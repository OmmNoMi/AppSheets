// =========================================================================
// OmmNoMi: Inspect Redux DataSlices Schema Structure
// Size: Under 35 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectDataSlicesStructure() {
    try {
        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var fKey = Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; });
            var f = root[fKey];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; break; }
                f = f.return;
            }
        }
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        console.log("AppData keys:", h.AppData ? Object.keys(h.AppData) : "no AppData");
        console.log("DataSlices type:", typeof h.AppData.DataSlices, Array.isArray(h.AppData.DataSlices) ? "Array" : "Object");
        console.log("DataSlices value:", JSON.stringify(h.AppData.DataSlices));
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
