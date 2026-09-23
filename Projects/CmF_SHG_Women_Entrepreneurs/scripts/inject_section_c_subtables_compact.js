// =========================================================================
// OmmNoMi: Inject 5 Section C Subtables & Form ColumnOrder
// Rule SOP-A5: Pure ASCII, Under 60 Lines, Zero Unicode
// =========================================================================
(function injectSectionCSubtables() {
    try {
        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var f = root[Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; })];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; break; }
                if (f.stateNode && f.stateNode.store) { store = f.stateNode.store; break; }
                f = f.return;
            }
        }
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = h.AppData.DataSchemas;
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });
        var childCols = schemas[cIdx].Attributes.map(function(a) { return a.Name; });
        var dict = {};
        var sliceDefs = [{ n: "Slice_Q6_Labor", f: '=[Table_Type] = "Q6_Labor"' }, { n: "Slice_Q15_Turnover", f: '=[Table_Type] = "Q15_Turnover"' }, { n: "Slice_Q19_Capital", f: '=[Table_Type] = "Q19_Capital"' }, { n: "Slice_Q20_Loan_Usage", f: '=[Table_Type] = "Q20_Loan_Usage"' }, { n: "Slice_Q22_Trajectory", f: '=[Table_Type] = "Q22_Trajectory"' }];
        var slices = (h.AppData.TableSlices || []).slice();
        sliceDefs.forEach(function(sd) {
            var idx = slices.findIndex(function(sl) { return sl && sl.Name === sd.n; });
            var obj = { Name: sd.n, SourceTable: "Survey_Tables", Columns: childCols, Actions: ["**auto**"], FilterCondition: sd.f, AllowedUpdates: 0, UpdateMode: 7, IsValid: true, Visibility: "ALWAYS", DisableAutoUpdate: false };
            if (idx === -1) slices.push(obj); else slices[idx] = Object.assign({}, slices[idx], obj);
        });
        dict["AppData.TableSlices"] = slices;
        var surveyAttrs = schemas[sIdx].Attributes;
        var vcDefs = [{ n: "Related_Q6_Labor", s: "Slice_Q6_Labor", d: '="Q6. Family members and hired help in business operations"' }, { n: "Related_Q15_Turnover", s: "Slice_Q15_Turnover", d: '="Q15. Turnover and income from the enterprise"' }, { n: "Related_Q19_Capital", s: "Slice_Q19_Capital", d: '="Q19. How have you arranged capital over the enterprise duration?"' }, { n: "Related_Q20_Loan_Usage", s: "Slice_Q20_Loan_Usage", d: '="Q20. How did you use the loans taken from different sources?"' }, { n: "Related_Q22_Trajectory", s: "Slice_Q22_Trajectory", d: '="Q22. What changes have happened in your business?"' }];
        vcDefs.forEach(function(vd) {
            var vIdx = surveyAttrs.findIndex(function(a) { return a.Name === vd.n; });
            var rQ = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false });
            var eQ = JSON.stringify({ ReferencedTableName: vd.s, ReferencedRootTableName: "Survey_Tables", ReferencedType: "Text", ReferencedTypeQualifier: rQ, ReferencedKeyColumn: "ID", IsAPartOf: false, InputMode: "Auto" });
            var aux = JSON.stringify({ ElementType: "Ref", ElementTypeQualifier: eQ, ItemSeparator: " , " });
            var fmla = '=REF_ROWS("' + vd.s + '", "Survey_ID")';
            if (vIdx === -1) { surveyAttrs.push({ Name: vd.n, Type: "List", EnumListElementTypeName: "Ref", ReferencedTableName: vd.s, ReferencedRootTableName: "Survey_Tables", IsVirtual: true, IsReadOnly: true, AppFormula: fmla, DisplayName: vd.d, TypeAuxData: aux }); vIdx = surveyAttrs.length - 1; }
            else { var a = surveyAttrs[vIdx]; a.Type = "List"; a.EnumListElementTypeName = "Ref"; a.ReferencedTableName = vd.s; a.ReferencedRootTableName = "Survey_Tables"; a.IsVirtual = true; a.AppFormula = fmla; a.DisplayName = vd.d; a.TypeAuxData = aux; }
            var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + vIdx + "]";
            dict[p + ".Name"] = vd.n; dict[p + ".Type"] = "List"; dict[p + ".EnumListElementTypeName"] = "Ref"; dict[p + ".ReferencedTableName"] = vd.s; dict[p + ".ReferencedRootTableName"] = "Survey_Tables"; dict[p + ".IsVirtual"] = true; dict[p + ".AppFormula"] = fmla; dict[p + ".DisplayName"] = vd.d; dict[p + ".TypeAuxData"] = aux;
        });
        var controls = (h.Presentation && h.Presentation.Controls) || [];
        var secCIdx = controls.findIndex(function(c) { return c && c.Name === 'Survey_Form_SecC'; });
        var secC = controls[secCIdx];
        var list = (secC.ViewDefinition && secC.ViewDefinition.ColumnOrder) ? secC.ViewDefinition.ColumnOrder.slice() : [];
        var pfx = ['Labor_Purchase_', 'Labor_Prod_', 'Labor_Serv_', 'Labor_Mktg_', 'Labor_Sale_', 'Labor_Record_', 'Turnover_Peak_', 'Turnover_Avg_', 'Turnover_Lean_', 'Cap_', 'Trajectory_', 'Related_Q'];
        list = list.filter(function(c) { return !pfx.some(function(p) { return c.startsWith(p); }); });
        function ins(t, items) { var i = list.indexOf(t); if (i !== -1) list.splice.apply(list, [i + 1, 0].concat(items)); else list.push.apply(list, items); }
        ins('LocationConvenienceOther', ['Related_Q6_Labor']); ins('RecordKeepingOther', ['Related_Q15_Turnover']);
        ins('SHGAssociationAssistance', ['Related_Q19_Capital', 'Related_Q20_Loan_Usage']); ins('MonthlyIncomeIncreaseByOSFSVEP', ['Related_Q22_Trajectory']);
        if (!secC.ViewDefinition) secC.ViewDefinition = {};
        secC.ViewDefinition.ColumnOrder = list;
        var curSet = typeof secC.Settings === 'string' ? JSON.parse(secC.Settings) : Object.assign({}, secC.Settings);
        curSet.ColumnOrder = list;
        var setStr = JSON.stringify(curSet);
        secC.Settings = setStr;
        dict['Presentation.Controls[' + secCIdx + '].ViewDefinition.ColumnOrder'] = list;
        dict['Presentation.Controls[' + secCIdx + '].Settings'] = setStr;
        dict['Presentation.Controls'] = controls;
        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
        console.log('[OmmNoMi SUCCESS] All 5 Slices, VCs and Section C Form ColumnOrder updated! Save button ready.');
    } catch(e) { console.error('[ERROR]', e.message); }
})();
