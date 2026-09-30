// =========================================================================
// OmmNoMi: Inspect Inline Views & DataActions for Survey_Tables
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectInlineViewsAndActions() {
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

        console.log("=== 1. VIEWS RELATED TO SURVEY_TABLES OR SLICES ===");
        var controls = (h.Presentation && h.Presentation.Controls) || [];
        var tableViews = controls.filter(function(c) {
            var t = (c.TableOrFolderName || c.ViewDefinition?.TableOrFolderName || '').toLowerCase();
            var n = (c.Name || '').toLowerCase();
            return t.indexOf('survey_tables') >= 0 || t.indexOf('slice_q') >= 0 || n.indexOf('survey_tables') >= 0 || n.indexOf('slice_q') >= 0 || n.indexOf('labor') >= 0 || n.indexOf('turnover') >= 0 || n.indexOf('capital') >= 0 || n.indexOf('trajectory') >= 0;
        });
        console.table(tableViews.map(function(c, i) {
            return {
                Index: controls.indexOf(c),
                Name: c.Name,
                Action: c.Action,
                ViewType: c.ViewType,
                Table: c.TableOrFolderName,
                ViewStyle: c.ViewStyle || c.ViewDefinition?.ViewStyle
            };
        }));

        console.log("=== 2. DATA ACTIONS COUNT & SAMPLES ===");
        var actions = (h.AppData && h.AppData.DataActions) || [];
        console.log("Total Actions:", actions.length);
        var sampleActions = actions.slice(0, 5).map(function(a) {
            return { Name: a.Name, Table: a.TableOrFolderName, ActionType: a.ActionType || a.Type };
        });
        console.table(sampleActions);
    } catch(e) { console.error("[ERROR]", e.message); }
})();
