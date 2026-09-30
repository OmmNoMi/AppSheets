// =========================================================================
// OmmNoMi: Check IsPartOf & Form Column Visibility
// Size: Under 45 lines, SOP-A5 Pure ASCII
// =========================================================================
(function checkIsPartOfVisibility() {
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
        var views = (h && h.AppViews) || [];

        var survey = schemas.find(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var child = schemas.find(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });

        var sId = child ? child.Attributes.find(function(a) { return a.Name === 'Survey_ID'; }) : null;
        console.log("[INFO] Survey_ID Type:", sId ? sId.Type : "null", "RefTable:", sId ? sId.ReferencedTableName : "null", "IsPartOf:", sId ? sId.IsPartOf : "null");

        var vcs = survey ? survey.Attributes.filter(function(a) { return a.Name.indexOf('Related_') >= 0 || a.Name.indexOf('Related ') >= 0; }).map(function(a) { return a.Name; }) : [];
        console.log("[INFO] Related VCs in Survey:", vcs);

        var formView = views.find(function(v) { return v && (v.Name === 'Survey_Form' || v.ViewType === 'Form'); });
        if (formView) {
            console.log("[INFO] Form View:", formView.Name, "Table:", formView.TableName);
            console.log("[INFO] Form ColumnOrder has", formView.ColumnOrder ? formView.ColumnOrder.length : "ALL (no custom order)", "columns");
            if (formView.ColumnOrder) {
                var hasVCs = formView.ColumnOrder.filter(function(c) { return c.indexOf('Related') >= 0; });
                console.log("[INFO] Related cols in Form ColumnOrder:", hasVCs);
            }
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
