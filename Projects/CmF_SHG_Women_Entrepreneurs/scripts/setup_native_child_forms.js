// =========================================================================
// OmmNoMi: Setup Native Inline Child Tables for Section C
// 100% Pure ASCII, Validated with node -c
// =========================================================================
(function setupNativeChildForms() {
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
        if (!h) { console.error("[ERROR] History item not found."); return; }

        var schemas = (h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Status_Profile'; }))); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Table_Type'; }))); });

        if (sIdx === -1 || cIdx === -1) {
            console.error("[ERROR] Schemas not found. Survey:", sIdx, "Survey_Tables:", cIdx);
            return;
        }

        var parentName = (schemas[sIdx].TableName || schemas[sIdx].Name || "Survey").replace(/_Schema$/i, '');
        var childName = (schemas[cIdx].TableName || schemas[cIdx].Name || "Survey_Tables").replace(/_Schema$/i, '');

        var dict = {};

        // 1. Ensure Survey_Tables.Survey_ID has IsAPartOf = true
        var childAttrs = schemas[cIdx].Attributes;
        var sidIdx = childAttrs.findIndex(function(a) { return a.Name === 'Survey_ID'; });
        if (sidIdx !== -1) {
            var sid = childAttrs[sidIdx];
            sid.Type = "Ref";
            sid.IsAPartOf = true;
            sid.IsPartOf = true;
            sid.ReferencedTableName = parentName;
            sid.ReferencedRootTableName = parentName;

            var sidAux = {};
            try { sidAux = typeof sid.TypeAuxData === 'string' ? JSON.parse(sid.TypeAuxData) : Object.assign({}, sid.TypeAuxData); } catch(e) {}
            sidAux.ReferencedTableName = parentName;
            sidAux.ReferencedRootTableName = parentName;
            sidAux.IsAPartOf = true;
            sidAux.IsPartOf = true;
            sid.TypeAuxData = JSON.stringify(sidAux);

            var sidP = "AppData.DataSchemas[" + cIdx + "].Attributes[" + sidIdx + "]";
            dict[sidP + ".Type"] = "Ref";
            dict[sidP + ".IsAPartOf"] = true;
            dict[sidP + ".IsPartOf"] = true;
            dict[sidP + ".ReferencedTableName"] = parentName;
            dict[sidP + ".ReferencedRootTableName"] = parentName;
            dict[sidP + ".TypeAuxData"] = sid.TypeAuxData;
        }

        // 2. Define the 5 Virtual Columns with REF_ROWS pointing to Slices
        var defs = [
            { name: "Related_Q6_Labor", slice: "Slice_Q6_Labor", label: '="Q6. Labor Details"' },
            { name: "Related_Q15_Turnover", slice: "Slice_Q15_Turnover", label: '="Q15. Turnover Details"' },
            { name: "Related_Q19_Capital", slice: "Slice_Q19_Capital", label: '="Q19. Capital Details"' },
            { name: "Related_Q20_Loan_Usage", slice: "Slice_Q20_Loan_Usage", label: '="Q20. Loan Usage Details"' },
            { name: "Related_Q22_Trajectory", slice: "Slice_Q22_Trajectory", label: '="Q22. Trajectory Details"' }
        ];

        var sAttrs = schemas[sIdx].Attributes.slice(); // clone
        var baseRefQual = function(sliceName) {
            return {
                ReferencedTableName: sliceName,
                ReferencedRootTableName: childName,
                ReferencedType: "Text",
                ReferencedKeyColumn: "ID",
                IsAPartOf: true,
                IsPartOf: true
            };
        };

        defs.forEach(function(d) {
            var qual = baseRefQual(d.slice);
            var aux = JSON.stringify({
                ItemSeparator: " , ",
                EnumValues: [],
                AllowOtherValues: false,
                AutoCompleteOtherValues: true,
                BaseType: "Ref",
                BaseTypeQualifier: qual,
                ElementType: "Ref",
                ElementTypeQualifier: qual
            });

            var existingIdx = sAttrs.findIndex(function(a) { return a.Name === d.name; });
            var vcAttr = {
                Name: d.name,
                Type: "List",
                EnumListElementTypeName: "Ref",
                ReferencedTableName: d.slice,
                ReferencedRootTableName: childName,
                IsVirtual: true,
                IsAPartOf: true,
                IsPartOf: true,
                IsKey: false,
                IsLabel: false,
                IsReadOnly: true,
                AppFormula: '=REF_ROWS("' + d.slice + '", "Survey_ID")',
                DisplayName: d.label,
                TypeAuxData: aux
            };

            if (existingIdx !== -1) {
                sAttrs[existingIdx] = Object.assign({}, sAttrs[existingIdx], vcAttr);
            } else {
                sAttrs.push(vcAttr);
            }
        });

        // Set full updated Attributes array in Redux
        dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = sAttrs;

        // 3. Inject Virtual Columns into Survey_Form_SecC ColumnOrder
        var controls = (h.Presentation && h.Presentation.Controls) || [];
        var formIdx = controls.findIndex(function(c) {
            return c && (c.Name === 'Survey_Form_SecC' || (c.Name && c.Name.indexOf('SecC') >= 0 && c.ViewType === 'Form'));
        });

        if (formIdx !== -1) {
            var form = controls[formIdx];
            var colOrder = (form.ColumnOrder && form.ColumnOrder.slice()) || [];

            // Helper to insert VC after a target header or column
            var insertAfter = function(targetCol, newCol) {
                if (colOrder.indexOf(newCol) >= 0) return; // already in order
                var idx = colOrder.indexOf(targetCol);
                if (idx >= 0) {
                    colOrder.splice(idx + 1, 0, newCol);
                } else {
                    colOrder.push(newCol);
                }
            };

            insertAfter("SEC_C_Q06_HEADER", "Related_Q6_Labor");
            insertAfter("SEC_C_Q15_HEADER", "Related_Q15_Turnover");
            insertAfter("SEC_C_Q19_HEADER", "Related_Q19_Capital");
            insertAfter("SEC_C_Q20_HEADER", "Related_Q20_Loan_Usage");
            insertAfter("SEC_C_Q22_HEADER", "Related_Q22_Trajectory");

            dict["Presentation.Controls[" + formIdx + "].ColumnOrder"] = colOrder;

            // Also update ViewDefinition if present
            if (form.ViewDefinition) {
                dict["Presentation.Controls[" + formIdx + "].ViewDefinition.ColumnOrder"] = colOrder;
            }
            // Also update Settings if present
            if (form.Settings) {
                dict["Presentation.Controls[" + formIdx + "].Settings.ColumnOrder"] = colOrder;
            }
            console.log("[OK] Updated Survey_Form_SecC ColumnOrder with 5 child subtables. Length:", colOrder.length);
        } else {
            console.warn("[WARN] Survey_Form_SecC not found in Presentation.Controls.");
        }

        // 4. Dispatch batch changes to Redux
        store.dispatch({
            type: 'SET_EDITOR_OPTIONS',
            nameValueDict: dict,
            recordHistory: true,
            ignoreConstraints: false,
            skipNavigation: false
        });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("=== [OmmNoMi SUCCESS] Native Inline Child Tables Staged! ===");
        console.log("[INFO] 5 Virtual Columns added with REF_ROWS to Slices and IsAPartOf=true.");
        console.log("[INFO] Survey_Form_SecC ColumnOrder updated.");
        console.log("[ACTION] Click the blue 'Save' button in the top right of AppSheet now!");
    } catch(err) {
        console.error("[ERROR]", err.message, err.stack);
    }
})();
