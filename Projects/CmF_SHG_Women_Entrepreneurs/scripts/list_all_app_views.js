// =========================================================================
// OmmNoMi: List All Views and Forms in AppSheet
// Size: Under 40 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function listAllAppViews() {
    try {
        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var f = root[Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; })];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; break; }
                f = f.return;
            }
        }
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        
        console.log("=== ALL FORMS & VIEWS IN CONTROLS ===");
        var viewSummary = controls.map(function(c, idx) {
            var s = typeof c.Settings === 'string' ? JSON.parse(c.Settings) : c.Settings || {};
            var cols = (s && s.ColumnOrder) || (c.ViewDefinition && c.ViewDefinition.ColumnOrder) || [];
            return {
                Index: idx,
                Name: c.Name,
                Action: c.Action,
                Table: c.TableOrFolderName,
                ColumnsCount: cols.length,
                ColumnsSample: cols.slice(0, 3).join(", ")
            };
        });
        console.table(viewSummary);
    } catch(e) { console.error("[ERROR]", e.message); }
})();
