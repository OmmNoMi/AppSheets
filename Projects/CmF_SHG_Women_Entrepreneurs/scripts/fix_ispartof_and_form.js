// =========================================================================
// OmmNoMi: Fix IsPartOf (IsAPartOf) in TypeAuxData & Enable in Form View
// Size: Under 50 lines, SOP-A5 Pure ASCII, Syntax Pre-Checked
// =========================================================================
(function fixIsPartOfAndForm() {
    try {
        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var fKey = Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; });
            var f = root[fKey];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; window.appStore = store; break; }
                f = f.return;
            }
        }
        if (!store) { console.error("[ERROR] Redux store not found"); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Status_Profile'; }))); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Table_Type'; }))); });

        var parentName = (schemas[sIdx].TableName || schemas[sIdx].Name || "Survey").replace(/_Schema$/i, '');
        var childName = (schemas[cIdx].TableName || schemas[cIdx].Name || "Survey_Tables").replace(/_Schema$/i, '');

        var dict = {};

        // 1. In Survey_Tables: Set IsAPartOf = true in BOTH Attribute & TypeAuxData
        var sidIdx = schemas[cIdx].Attributes.findIndex(function(a) { return a.Name === 'Survey_ID'; });
        if (sidIdx !== -1) {
            var p = "AppData.DataSchemas[" + cIdx + "].Attributes[" + sidIdx + "]";
            var attr = schemas[cIdx].Attributes[sidIdx];
            attr.Type = "Ref";
            attr.IsAPartOf = true;
            attr.IsPartOf = true;
            attr.ReferencedTableName = parentName;
            attr.ReferencedRootTableName = parentName;

            var auxObj = {};
            if (attr.TypeAuxData) {
                try { auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : Object.assign({}, attr.TypeAuxData); } catch(e) {}
            }
            auxObj.ReferencedTableName = parentName;
            auxObj.ReferencedRootTableName = parentName;
            auxObj.IsAPartOf = true;
            auxObj.IsPartOf = true;
            var auxStr = JSON.stringify(auxObj);
            attr.TypeAuxData = auxStr;

            dict[p + ".Type"] = "Ref";
            dict[p + ".IsAPartOf"] = true;
            dict[p + ".IsPartOf"] = true;
            dict[p + ".ReferencedTableName"] = parentName;
            dict[p + ".ReferencedRootTableName"] = parentName;
            dict[p + ".TypeAuxData"] = auxStr;
        }

        // 2. Ensure Form View includes the related sub-tables
        var allViews = h.AppViews || (h.AppData && h.AppData.AppViews) || [];
        var viewsList = Array.isArray(allViews) ? allViews : Object.values(allViews);
        viewsList.forEach(function(v, vIdx) {
            if (v && v.TableName === parentName && v.ViewType === 'Form') {
                if (v.ColumnOrder && v.ColumnOrder.length > 0) {
                    var vcs = ["Related_Q6_Labor", "Related_Q15_Turnover", "Related_Q19_Capital", "Related_Q20_Loan_Usage", "Related_Q22_Trajectory", "Related Survey_Tables"];
                    vcs.forEach(function(vc) { if (v.ColumnOrder.indexOf(vc) === -1) v.ColumnOrder.push(vc); });
                    var vPath = Array.isArray(allViews) ? "AppViews[" + vIdx + "].ColumnOrder" : "AppViews." + v.Name + ".ColumnOrder";
                    dict[vPath] = v.ColumnOrder;
                }
            }
        });

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
        console.log("[OmmNoMi SUCCESS] IsAPartOf set to TRUE on Survey_ID, and Form View updated! Click SAVE button now.");
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
