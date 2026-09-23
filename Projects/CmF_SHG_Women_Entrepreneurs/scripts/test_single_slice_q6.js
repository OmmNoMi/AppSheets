// =========================================================================
// OmmNoMi: Test Single Slice (Q6 Labor) & Inline Form Placement
// Size: Under 50 lines, SOP-A5 Pure ASCII
// =========================================================================
(function testSingleSliceQ6() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });

        var childCols = schemas[cIdx].Attributes.map(function(a) { return a.Name; });

        // 1. Create or Update Slice_Q6_Labor in AppData.TableSlices
        var slices = h.AppData.TableSlices || [];
        var sliceIdx = slices.findIndex(function(sl) { return sl && sl.Name === 'Slice_Q6_Labor'; });
        var sliceObj = {
            Name: "Slice_Q6_Labor",
            SourceTable: "Survey_Tables",
            SourceColumn: null,
            RowFilterCondition: null,
            RowFilterParameter: null,
            Columns: childCols,
            Actions: ["**auto**"],
            FilterExpression: { Expression: "", Description: { Content: "", SystemGenerated: false } },
            FilterCondition: '=[Table_Type] = "Q6_Labor"',
            AllowedUpdates: 0,
            UpdateMode: 7,
            Comment: "Q6 Labor Inline Slice",
            IsValid: true,
            Visibility: "ALWAYS",
            DisableAutoUpdate: false
        };

        if (sliceIdx === -1) {
            slices.push(sliceObj);
            sliceIdx = slices.length - 1;
        } else {
            slices[sliceIdx] = Object.assign(slices[sliceIdx], sliceObj);
        }

        var dict = {};
        dict["AppData.TableSlices"] = slices;

        // 2. Add or Update Virtual Column in Survey with REF_ROWS
        var surveyAttrs = schemas[sIdx].Attributes;
        var vcIdx = surveyAttrs.findIndex(function(a) { return a.Name === 'Related_Q6_Labor'; });
        var refQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false });
        var elemQual = JSON.stringify({ ReferencedTableName: "Slice_Q6_Labor", ReferencedRootTableName: "Survey_Tables", ReferencedType: "Text", ReferencedTypeQualifier: refQual, ReferencedKeyColumn: "ID", IsAPartOf: false, InputMode: "Auto" });
        var auxData = JSON.stringify({ ElementType: "Ref", ElementTypeQualifier: elemQual, ItemSeparator: " , " });

        var formula = '=REF_ROWS("Slice_Q6_Labor", "Survey_ID")';
        var dName = '="Q6. Family members and hired help in business operations"';

        if (vcIdx === -1) {
            surveyAttrs.push({ Name: "Related_Q6_Labor", Type: "List", EnumListElementTypeName: "Ref", ReferencedTableName: "Slice_Q6_Labor", ReferencedRootTableName: "Survey_Tables", IsVirtual: true, IsReadOnly: true, AppFormula: formula, DisplayName: dName, TypeAuxData: auxData });
            vcIdx = surveyAttrs.length - 1;
        } else {
            var a = surveyAttrs[vcIdx];
            a.Type = "List"; a.EnumListElementTypeName = "Ref"; a.ReferencedTableName = "Slice_Q6_Labor"; a.ReferencedRootTableName = "Survey_Tables"; a.IsVirtual = true; a.AppFormula = formula; a.DisplayName = dName; a.TypeAuxData = auxData;
        }

        var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + vcIdx + "]";
        dict[p + ".Name"] = "Related_Q6_Labor";
        dict[p + ".Type"] = "List";
        dict[p + ".EnumListElementTypeName"] = "Ref";
        dict[p + ".ReferencedTableName"] = "Slice_Q6_Labor";
        dict[p + ".ReferencedRootTableName"] = "Survey_Tables";
        dict[p + ".IsVirtual"] = true;
        dict[p + ".AppFormula"] = formula;
        dict[p + ".DisplayName"] = dName;
        dict[p + ".TypeAuxData"] = auxData;

        // 3. Place in Survey_Form ColumnOrder right below LocationConvenience
        var allViews = h.AppViews || (h.AppData && h.AppData.AppViews) || [];
        var viewsList = Array.isArray(allViews) ? allViews : Object.values(allViews);
        var form = viewsList.find(function(v) { return v && (v.Name === 'Survey_Form' || (v.TableName === 'Survey' && v.ViewType === 'Form')); });
        if (form && form.ColumnOrder) {
            var cOrder = form.ColumnOrder;
            var pos = cOrder.indexOf("LocationConvenience");
            var curPos = cOrder.indexOf("Related_Q6_Labor");
            if (curPos >= 0) cOrder.splice(curPos, 1);
            if (pos >= 0) {
                cOrder.splice(pos + 1, 0, "Related_Q6_Labor");
            } else {
                cOrder.push("Related_Q6_Labor");
            }
            var formKey = Array.isArray(allViews) ? "AppViews[" + viewsList.indexOf(form) + "].ColumnOrder" : "AppViews." + form.Name + ".ColumnOrder";
            dict[formKey] = cOrder;
        }

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
        console.log("[OmmNoMi SUCCESS] Q6 Slice and Inline Form column configured! Save button ready.");
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
