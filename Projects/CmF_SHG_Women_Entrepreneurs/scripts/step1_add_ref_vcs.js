// =========================================================================
// OmmNoMi: Step 1 - Add 5 Native Child Virtual Columns with REF_ROWS
// Size: Under 65 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function addNativeChildVCs() {
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
        if (!store) { console.error("[ERROR] Redux store not found."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Status_Profile'; }))); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Table_Type'; }))); });

        var childName = (schemas[cIdx].TableName || schemas[cIdx].Name || "Survey_Tables").replace(/_Schema$/i, '');
        var parentName = (schemas[sIdx].TableName || schemas[sIdx].Name || "Survey").replace(/_Schema$/i, '');
        var dict = {};

        // 1. Ensure Survey_Tables.Survey_ID is Ref with IsAPartOf=true
        var sidIdx = schemas[cIdx].Attributes.findIndex(function(a) { return a.Name === 'Survey_ID'; });
        if (sidIdx !== -1) {
            var sidP = "AppData.DataSchemas[" + cIdx + "].Attributes[" + sidIdx + "]";
            var aux = JSON.stringify({ ReferencedTableName: parentName, ReferencedRootTableName: parentName, IsAPartOf: true, IsPartOf: true });
            dict[sidP + ".Type"] = "Ref";
            dict[sidP + ".IsAPartOf"] = true;
            dict[sidP + ".IsPartOf"] = true;
            dict[sidP + ".ReferencedTableName"] = parentName;
            dict[sidP + ".TypeAuxData"] = aux;
        }

        // 2. Add 5 Virtual Columns to Survey with REF_ROWS
        var defs = [
            { name: "Related_Q6_Labor", slice: "Slice_Q6_Labor", label: '="Q6. Labor Details"' },
            { name: "Related_Q15_Turnover", slice: "Slice_Q15_Turnover", label: '="Q15. Turnover Details"' },
            { name: "Related_Q19_Capital", slice: "Slice_Q19_Capital", label: '="Q19. Capital Details"' },
            { name: "Related_Q20_Loan_Usage", slice: "Slice_Q20_Loan_Usage", label: '="Q20. Loan Usage Details"' },
            { name: "Related_Q22_Trajectory", slice: "Slice_Q22_Trajectory", label: '="Q22. Trajectory Details"' }
        ];

        var sAttrs = schemas[sIdx].Attributes.slice();
        defs.forEach(function(d) {
            var q = { ReferencedTableName: d.slice, ReferencedRootTableName: childName, ReferencedType: "Text", ReferencedKeyColumn: "ID", IsAPartOf: true, IsPartOf: true };
            var aStr = JSON.stringify({ ItemSeparator: " , ", EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: true, BaseType: "Ref", BaseTypeQualifier: q, ElementType: "Ref", ElementTypeQualifier: q });
            var vc = { Name: d.name, Type: "List", EnumListElementTypeName: "Ref", ReferencedTableName: d.slice, ReferencedRootTableName: childName, IsVirtual: true, IsAPartOf: true, IsPartOf: true, IsKey: false, IsLabel: false, IsReadOnly: true, AppFormula: '=REF_ROWS("' + d.slice + '", "Survey_ID")', DisplayName: d.label, TypeAuxData: aStr };
            var idx = sAttrs.findIndex(function(a) { return a.Name === d.name; });
            if (idx !== -1) { sAttrs[idx] = Object.assign({}, sAttrs[idx], vc); } else { sAttrs.push(vc); }
        });

        dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = sAttrs;
        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        console.log("[OK] Step 1 Complete: 5 REF_ROWS Virtual Columns configured in Survey table schema!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
