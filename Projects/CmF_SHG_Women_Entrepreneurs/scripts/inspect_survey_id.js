// =========================================================================
// OmmNoMi: Inspect Survey_ID Exact Redux Properties
// Size: Under 25 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectSurveyIdProperties() {
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
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var child = schemas.find(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });
        var sId = child ? child.Attributes.find(function(a) { return a.Name === 'Survey_ID'; }) : null;

        console.log("[OmmNoMi Survey_ID Keys]:", sId ? Object.keys(sId) : "not found");
        console.log("[OmmNoMi Survey_ID TypeAuxData]:", sId ? sId.TypeAuxData : "null");
        console.log("[OmmNoMi Survey_ID TypeQualifier]:", sId ? sId.TypeQualifier : "null");
        console.log("[OmmNoMi Survey_ID IsAPartOf]:", sId ? sId.IsAPartOf : "null");
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
