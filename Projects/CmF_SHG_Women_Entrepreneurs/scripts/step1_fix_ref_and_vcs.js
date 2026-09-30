// =========================================================================
// OmmNoMi: Step 1 of 2 - Fix Survey_ID Ref, IsPartOf & 5 Inline VCs
// Size: Compact (Under 50 lines, Zero Truncation)
// =========================================================================
(function fixStep1RefAndVCs() {
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
        if (!store) { console.error("[ERROR] Redux store not accessible"); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Status_Profile'; }))); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Table_Type'; }))); });

        var parentName = (schemas[sIdx].TableName || schemas[sIdx].Name || "Survey").replace(/_Schema$/i, '');
        var childName = (schemas[cIdx].TableName || schemas[cIdx].Name || "Survey_Tables").replace(/_Schema$/i, '');

        var dict = {};
        // 1. Configure Survey_ID as Ref + IsPartOf
        var sidIdx = schemas[cIdx].Attributes.findIndex(function(a) { return a.Name === 'Survey_ID'; });
        if (sidIdx !== -1) {
            var p = "AppData.DataSchemas[" + cIdx + "].Attributes[" + sidIdx + "]";
            schemas[cIdx].Attributes[sidIdx].Type = "Ref";
            schemas[cIdx].Attributes[sidIdx].ReferencedTableName = parentName;
            schemas[cIdx].Attributes[sidIdx].ReferencedRootTableName = parentName;
            schemas[cIdx].Attributes[sidIdx].IsPartOf = true;
            dict[p + ".Type"] = "Ref";
            dict[p + ".ReferencedTableName"] = parentName;
            dict[p + ".ReferencedRootTableName"] = parentName;
            dict[p + ".IsPartOf"] = true;
        }

        // 2. Configure 5 Inline Virtual Columns
        var vcs = [
            { n: "Related_Q6_Labor", f: "=SELECT(" + childName + "[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = \"Q6_Labor\"))", d: '="Q6. Labor & Family Involvement"' },
            { n: "Related_Q15_Turnover", f: "=SELECT(" + childName + "[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = \"Q15_Turnover\"))", d: '="Q15. Turnover & Net Profit"' },
            { n: "Related_Q19_Capital", f: "=SELECT(" + childName + "[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = \"Q19_Capital\"))", d: '="Q19. Capital Arranged Over Time"' },
            { n: "Related_Q20_Loan_Usage", f: "=SELECT(" + childName + "[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = \"Q20_Loan_Usage\"))", d: '="Q20. Loan Usage in Business"' },
            { n: "Related_Q22_Trajectory", f: "=SELECT(" + childName + "[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = \"Q22_Trajectory\"))", d: '="Q22. Business Trajectory & Changes"' }
        ];

        var sAttrs = schemas[sIdx].Attributes;
        vcs.forEach(function(vc) {
            var idx = sAttrs.findIndex(function(a) { return a.Name === vc.n; });
            if (idx === -1) {
                sAttrs.push({ Name: vc.n, Type: "List", EnumListElementTypeName: "Ref", ReferencedTableName: childName, ReferencedRootTableName: childName, IsVirtual: true, IsReadOnly: true, AppFormula: vc.f, DisplayName: vc.d });
                idx = sAttrs.length - 1;
            } else {
                sAttrs[idx].Type = "List"; sAttrs[idx].EnumListElementTypeName = "Ref"; sAttrs[idx].ReferencedTableName = childName; sAttrs[idx].ReferencedRootTableName = childName; sAttrs[idx].IsVirtual = true; sAttrs[idx].AppFormula = vc.f; sAttrs[idx].DisplayName = vc.d;
            }
            var vp = "AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "]";
            dict[vp + ".Name"] = vc.n;
            dict[vp + ".Type"] = "List";
            dict[vp + ".EnumListElementTypeName"] = "Ref";
            dict[vp + ".ReferencedTableName"] = childName;
            dict[vp + ".ReferencedRootTableName"] = childName;
            dict[vp + ".IsVirtual"] = true;
            dict[vp + ".AppFormula"] = vc.f;
            dict[vp + ".DisplayName"] = vc.d;
        });

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
        console.log("[OmmNoMi SUCCESS] Step 1 Applied! Survey_ID is now Ref+IsPartOf, and 5 Virtual Columns added.");
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
