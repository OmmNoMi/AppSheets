// =========================================================================
// OmmNoMi: Inject 5 Section C Inline Subtables & Update Form ColumnOrder
// Rule SOP-A5: Pure ASCII, No Unicode, Robust Error Handling
// =========================================================================
(function injectSectionCSubtables() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] INJECTING SECTION C INLINE SUBTABLES ===");

        // 1. Locate Redux Store
        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var fKey = Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; });
            var f = root[fKey];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; break; }
                if (f.stateNode && f.stateNode.store) { store = f.stateNode.store; break; }
                f = f.return;
            }
        }
        if (!store) {
            console.error("[ERROR] Redux store not found! Please open AppSheet editor.");
            return;
        }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (!h || !h.AppData || !h.AppData.DataSchemas) {
            console.error("[ERROR] AppData schemas not found!");
            return;
        }

        var schemas = h.AppData.DataSchemas;
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });

        if (sIdx === -1 || cIdx === -1) {
            console.error("[ERROR] Survey or Survey_Tables schema not found!");
            return;
        }

        var controls = (h.Presentation && h.Presentation.Controls) || [];
        var secCIdx = controls.findIndex(function(c) { return c && c.Name === 'Survey_Form_SecC'; });
        if (secCIdx === -1) {
            console.error("[ERROR] Survey_Form_SecC control not found in Presentation.Controls!");
            return;
        }

        var dict = {};

        // 2. Configure 5 Slices in AppData.TableSlices
        var childCols = schemas[cIdx].Attributes.map(function(a) { return a.Name; });
        var sliceDefs = [
            { name: "Slice_Q6_Labor", filter: '=[Table_Type] = "Q6_Labor"', comment: "Q6 Labor Inline Slice" },
            { name: "Slice_Q15_Turnover", filter: '=[Table_Type] = "Q15_Turnover"', comment: "Q15 Turnover Inline Slice" },
            { name: "Slice_Q19_Capital", filter: '=[Table_Type] = "Q19_Capital"', comment: "Q19 Capital Inline Slice" },
            { name: "Slice_Q20_Loan_Usage", filter: '=[Table_Type] = "Q20_Loan_Usage"', comment: "Q20 Loan Usage Inline Slice" },
            { name: "Slice_Q22_Trajectory", filter: '=[Table_Type] = "Q22_Trajectory"', comment: "Q22 Trajectory Inline Slice" }
        ];

        var slices = h.AppData.TableSlices ? h.AppData.TableSlices.slice() : [];
        sliceDefs.forEach(function(sd) {
            var idx = slices.findIndex(function(sl) { return sl && sl.Name === sd.name; });
            var slObj = {
                Name: sd.name,
                SourceTable: "Survey_Tables",
                SourceColumn: null,
                RowFilterCondition: null,
                RowFilterParameter: null,
                Columns: childCols,
                Actions: ["**auto**"],
                FilterExpression: { Expression: "", Description: { Content: "", SystemGenerated: false } },
                FilterCondition: sd.filter,
                AllowedUpdates: 0,
                UpdateMode: 7,
                Comment: sd.comment,
                IsValid: true,
                Visibility: "ALWAYS",
                DisableAutoUpdate: false
            };
            if (idx === -1) {
                slices.push(slObj);
            } else {
                slices[idx] = Object.assign({}, slices[idx], slObj);
            }
        });
        dict["AppData.TableSlices"] = slices;
        console.log("[OK] Configured 5 Slices in AppData.TableSlices.");

        // 3. Configure 5 Virtual Columns in Survey schema
        var surveyAttrs = schemas[sIdx].Attributes;
        var vcDefs = [
            { name: "Related_Q6_Labor", slice: "Slice_Q6_Labor", title: "=\"Q6. Family members and hired help in business operations\"" },
            { name: "Related_Q15_Turnover", slice: "Slice_Q15_Turnover", title: "=\"Q15. Turnover and income from the enterprise\"" },
            { name: "Related_Q19_Capital", slice: "Slice_Q19_Capital", title: "=\"Q19. How have you arranged capital over the enterprise duration?\"" },
            { name: "Related_Q20_Loan_Usage", slice: "Slice_Q20_Loan_Usage", title: "=\"Q20. How did you use the loans taken from different sources?\"" },
            { name: "Related_Q22_Trajectory", slice: "Slice_Q22_Trajectory", title: "=\"Q22. What changes have happened in your business?\"" }
        ];

        vcDefs.forEach(function(vd) {
            var vcIdx = surveyAttrs.findIndex(function(a) { return a.Name === vd.name; });
            var refQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false });
            var elemQual = JSON.stringify({ ReferencedTableName: vd.slice, ReferencedRootTableName: "Survey_Tables", ReferencedType: "Text", ReferencedTypeQualifier: refQual, ReferencedKeyColumn: "ID", IsAPartOf: false, InputMode: "Auto" });
            var auxData = JSON.stringify({ ElementType: "Ref", ElementTypeQualifier: elemQual, ItemSeparator: " , " });
            var formula = '=REF_ROWS("' + vd.slice + '", "Survey_ID")';

            if (vcIdx === -1) {
                surveyAttrs.push({
                    Name: vd.name, Type: "List", EnumListElementTypeName: "Ref",
                    ReferencedTableName: vd.slice, ReferencedRootTableName: "Survey_Tables",
                    IsVirtual: true, IsReadOnly: true, AppFormula: formula,
                    DisplayName: vd.title, TypeAuxData: auxData
                });
                vcIdx = surveyAttrs.length - 1;
            } else {
                var a = surveyAttrs[vcIdx];
                a.Type = "List"; a.EnumListElementTypeName = "Ref";
                a.ReferencedTableName = vd.slice; a.ReferencedRootTableName = "Survey_Tables";
                a.IsVirtual = true; a.AppFormula = formula; a.DisplayName = vd.title; a.TypeAuxData = auxData;
            }

            var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + vcIdx + "]";
            dict[p + ".Name"] = vd.name;
            dict[p + ".Type"] = "List";
            dict[p + ".EnumListElementTypeName"] = "Ref";
            dict[p + ".ReferencedTableName"] = vd.slice;
            dict[p + ".ReferencedRootTableName"] = "Survey_Tables";
            dict[p + ".IsVirtual"] = true;
            dict[p + ".AppFormula"] = formula;
            dict[p + ".DisplayName"] = vd.title;
            dict[p + ".TypeAuxData"] = auxData;
        });
        console.log("[OK] Configured 5 Virtual Columns on Survey schema.");

        // 4. Update Survey_Form_SecC ColumnOrder
        var secC = controls[secCIdx];
        var baseList = [];
        if (secC.ViewDefinition && Array.isArray(secC.ViewDefinition.ColumnOrder)) {
            baseList = secC.ViewDefinition.ColumnOrder.slice();
        } else if (secC.Settings) {
            try {
                var parsedSettings = JSON.parse(secC.Settings);
                if (Array.isArray(parsedSettings.ColumnOrder)) baseList = parsedSettings.ColumnOrder.slice();
            } catch(e) {}
        }

        // Filter out old flattened columns and any existing Related_Q cols
        var toRemovePrefixes = [
            'Labor_Purchase_', 'Labor_Prod_', 'Labor_Serv_', 'Labor_Mktg_', 'Labor_Sale_', 'Labor_Record_',
            'Turnover_Peak_', 'Turnover_Avg_', 'Turnover_Lean_',
            'Cap_', 'Trajectory_', 'Related_Q'
        ];
        var filteredList = baseList.filter(function(col) {
            for (var i = 0; i < toRemovePrefixes.length; i++) {
                if (col.indexOf(toRemovePrefixes[i]) === 0) return false;
            }
            return true;
        });

        // Helper to insert after target
        function insertAfter(arr, target, items) {
            var idx = arr.indexOf(target);
            if (idx !== -1) {
                for (var i = 0; i < items.length; i++) {
                    arr.splice(idx + 1 + i, 0, items[i]);
                }
            } else {
                for (var j = 0; j < items.length; j++) {
                    arr.push(items[j]);
                }
            }
        }

        insertAfter(filteredList, 'LocationConvenienceOther', ['Related_Q6_Labor']);
        insertAfter(filteredList, 'RecordKeepingOther', ['Related_Q15_Turnover']);
        insertAfter(filteredList, 'SHGAssociationAssistance', ['Related_Q19_Capital', 'Related_Q20_Loan_Usage']);
        insertAfter(filteredList, 'MonthlyIncomeIncreaseByOSFSVEP', ['Related_Q22_Trajectory']);

        console.log("[OK] Old columns removed, new ColumnOrder length:", filteredList.length);

        // Update ViewDefinition and Settings
        if (!secC.ViewDefinition) secC.ViewDefinition = {};
        secC.ViewDefinition.ColumnOrder = filteredList;

        var currentSettings = {};
        if (typeof secC.Settings === 'string') {
            try { currentSettings = JSON.parse(secC.Settings); } catch(e) { currentSettings = {}; }
        } else if (typeof secC.Settings === 'object' && secC.Settings !== null) {
            currentSettings = Object.assign({}, secC.Settings);
        }
        currentSettings.ColumnOrder = filteredList;
        var settingsStr = JSON.stringify(currentSettings);
        secC.Settings = settingsStr;

        var secCPath = "Presentation.Controls[" + secCIdx + "]";
        dict[secCPath + ".ViewDefinition.ColumnOrder"] = filteredList;
        dict[secCPath + ".Settings"] = settingsStr;
        dict["Presentation.Controls"] = controls;

        // 5. Dispatch to Redux Store
        store.dispatch({
            type: 'SET_EDITOR_OPTIONS',
            nameValueDict: dict,
            recordHistory: true,
            ignoreConstraints: false,
            skipNavigation: false
        });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("=== [SUCCESS] ALL 5 SUBTABLES & SECTION C FORM CONFIGURED! ===");
        console.log("Please click the native blue cloud 'SAVE' button in AppSheet top-right.");
    } catch(err) {
        console.error("[FATAL ERROR]", err.message, err.stack);
    }
})();
