// =========================================================================
// OmmNoMi: Add 5 Dedicated Section C Inline Virtual Columns to Survey Table
// =========================================================================
(function addSectionCInlineVCs() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Initializing 5 Inline Section C Virtual Columns...", "color:#4285f4;font-size:16px;font-weight:bold;");

    const store = window.appStore;
    if (!store) {
        console.error("❌ Redux store not found! Make sure you are in the AppSheet editor.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }

    const surveyIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    if (surveyIdx === -1) {
        console.error("❌ Parent Survey table not found!");
        return;
    }

    const survey = schemas[surveyIdx];
    const sAttrs = survey.Attributes;

    const listRefTypeQual = JSON.stringify({
        MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
        IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
        Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
    });
    const listBaseQual = JSON.stringify({
        ReferencedTableName: "Survey_Tables",
        ReferencedRootTableName: "Survey_Tables",
        ReferencedType: "Text",
        ReferencedTypeQualifier: listRefTypeQual,
        ReferencedKeyColumn: "ID",
        IsAPartOf: false,
        RelationshipName: null,
        InputMode: "Auto",
        Valid_If: null,
        Error_Message_If_Invalid: null,
        Show_If: null,
        Required_If: null,
        Editable_If: null,
        Reset_If: null,
        Suggested_Values: null
    });

    const listAuxData = JSON.stringify({
        ItemSeparator: " , ",
        EnumValues: [],
        AllowOtherValues: false,
        AutoCompleteOtherValues: true,
        BaseType: "Ref",
        BaseTypeQualifier: listBaseQual,
        ElementType: "Ref",
        ElementTypeQualifier: listBaseQual,
        EnumInputMode: "Auto",
        Valid_If: null
    });

    // 5 Dedicated Virtual Columns
    const INLINE_VCS = [
        {
            name: "Related_Q6_Labor",
            formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q6_Labor"))',
            displayName: "Q6. Involvement of family members and hired help in business operations"
        },
        {
            name: "Related_Q15_Turnover",
            formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q15_Turnover"))',
            displayName: "Q15. Turnover and income from the enterprise"
        },
        {
            name: "Related_Q19_Capital",
            formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q19_Capital"))',
            displayName: "Q19. How have you arranged capital over the enterprise duration?"
        },
        {
            name: "Related_Q20_Loan_Usage",
            formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q20_Loan_Usage"))',
            displayName: "Q20. How did you use the loans taken from different sources?"
        },
        {
            name: "Related_Q22_Trajectory",
            formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q22_Trajectory"))',
            displayName: "Q22. What changes have happened in your business?"
        }
    ];

    const nameValueDict = {};
    let addedCount = 0;

    INLINE_VCS.forEach(vc => {
        let aIdx = sAttrs.findIndex(a => a.Name === vc.name);
        let attr;

        if (aIdx === -1) {
            // New Virtual Column
            attr = {
                Name: vc.name,
                Type: "List",
                EnumListElementTypeName: "Ref",
                ReferencedTableName: "Survey_Tables",
                ReferencedRootTableName: "Survey_Tables",
                IsVirtual: true,
                IsKey: false,
                IsLabel: false,
                IsReadOnly: true,
                AppFormula: vc.formula,
                DisplayName: vc.displayName,
                TypeAuxData: listAuxData
            };
            sAttrs.push(attr);
            aIdx = sAttrs.length - 1;
        } else {
            attr = sAttrs[aIdx];
            attr.Type = "List";
            attr.EnumListElementTypeName = "Ref";
            attr.ReferencedTableName = "Survey_Tables";
            attr.ReferencedRootTableName = "Survey_Tables";
            attr.IsVirtual = true;
            attr.IsKey = false;
            attr.IsLabel = false;
            attr.IsReadOnly = true;
            attr.AppFormula = vc.formula;
            attr.DisplayName = vc.displayName;
            attr.TypeAuxData = listAuxData;
        }

        const p = `AppData.DataSchemas[${surveyIdx}].Attributes[${aIdx}]`;
        nameValueDict[`${p}.Name`] = vc.name;
        nameValueDict[`${p}.Type`] = "List";
        nameValueDict[`${p}.EnumListElementTypeName`] = "Ref";
        nameValueDict[`${p}.ReferencedTableName`] = "Survey_Tables";
        nameValueDict[`${p}.ReferencedRootTableName`] = "Survey_Tables";
        nameValueDict[`${p}.IsVirtual`] = true;
        nameValueDict[`${p}.IsKey`] = false;
        nameValueDict[`${p}.IsLabel`] = false;
        nameValueDict[`${p}.IsReadOnly`] = true;
        nameValueDict[`${p}.AppFormula`] = vc.formula;
        nameValueDict[`${p}.DisplayName`] = vc.displayName;
        nameValueDict[`${p}.TypeAuxData`] = listAuxData;

        addedCount++;
    });

    console.log(`%c⚡ Configured ${addedCount} Dedicated Section C Inline Virtual Columns in Survey table!`, "color:#34a853;font-weight:bold;");

    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("%c🎉 [OmmNoMi] Inline Virtual Columns Staged! Click the native 'SAVE' button in AppSheet top-right.", "color:#34a853;font-size:16px;font-weight:bold;");
})();
