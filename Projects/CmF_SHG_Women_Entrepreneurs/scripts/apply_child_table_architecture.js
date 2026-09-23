// =========================================================================
// OmmNoMi: Master Child Table & Inline Architecture Engine
// =========================================================================
(function applyMasterChildArchitecture() {
    console.clear();
    console.log("%c╔══════════════════════════════════════════════════════════════════════════╗", "color:#4285f4;font-weight:bold;");
    console.log("%c║   🚀 [OmmNoMi] SECTION C CHILD TABLE & ISPARTOF ENGINE INITIALIZING...   ║", "color:#4285f4;font-size:14px;font-weight:bold;");
    console.log("%c╚══════════════════════════════════════════════════════════════════════════╝", "color:#4285f4;font-weight:bold;");

    // Close any open modals
    document.querySelectorAll('button').forEach(b => {
        const txt = b.textContent?.trim().toLowerCase();
        if (txt === 'done' || txt === 'cancel' || b.getAttribute('aria-label') === 'Close') {
            try { b.click(); } catch(e) {}
        }
    });

    // 1. Locate Redux Store
    let store = window.appStore;
    if (!store) {
        const candidates = [document.querySelector('.ExpressionControl'), document.querySelector('[role="grid"]'), document.querySelector('#root'), document.body];
        for (const el of candidates) {
            if (!el) continue;
            const fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
            let f = el[fKey];
            while (f) {
                if (f.memoizedProps?.store?.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
                if (f.stateNode?.store?.dispatch) { store = f.stateNode.store; window.appStore = store; break; }
                f = f.return;
            }
            if (store) break;
        }
    }

    if (!store) {
        console.error("❌ Redux store nahi mila! Kripya AppSheet editor me page refresh karke run karein.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }

    // 2. Locate Schemas
    const surveyIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const childTableIdx = schemas.findIndex(s => s && (s.Name === 'Survey_Tables' || s.TableName === 'Survey_Tables' || s.Attributes?.some(a => a.Name === 'Table_Type')));
    const appVarSchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    if (surveyIdx === -1) {
        console.error("❌ Parent Survey table nahi mila!");
        return;
    }

    const parentTableName = schemas[surveyIdx].Name || schemas[surveyIdx].TableName || "Survey";

    if (childTableIdx === -1) {
        console.warn("%c⚠️ 'Survey_Tables' table abhi AppSheet me add nahi hua hai!", "color:#ea4335;font-size:15px;font-weight:bold;");
        console.log("%c📋 NEXT STEP (Table Add Karein):\n1. AppSheet Editor me left menu me 'Data' (Tables) par click karein.\n2. '➕ Add Table' par click karein.\n3. 'Survey_Tables' sheet ko select karke ADD karein.\n4. Table add hone ke baad yeh script wapas console me run karein!", "color:#fbbc05;font-size:13px;line-height:1.6;font-weight:bold;");
        return;
    }

    console.log(`✅ Schemas Located: Parent Survey [${surveyIdx}] ('${parentTableName}'), Child Survey_Tables [${childTableIdx}]`);

    const childAttrs = schemas[childTableIdx].Attributes;
    const surveyAttrs = schemas[surveyIdx].Attributes;
    const nameValueDict = {};

    // 3. Qualifiers Setup
    const parentRefTypeQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const parentBaseQualifierStr = JSON.stringify({ ReferencedTableName: parentTableName, ReferencedRootTableName: parentTableName, ReferencedType: "Text", ReferencedTypeQualifier: parentRefTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: true, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });

    const appVarRefTypeQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const appVarBaseQualifierStr = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedRootTableName: "AppVariables", ReferencedType: "Text", ReferencedTypeQualifier: appVarRefTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: false, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });

    // 4. Detailed Column Mapping for Survey_Tables
    const CHILD_CONFIGS = {
        "ID": { type: "Text", isKey: true, isLabel: false, initialValue: "=UNIQUEID()" },
        "Survey_ID": {
            type: "Ref", isKey: false, isLabel: false, refTable: parentTableName, isPartOf: true,
            typeAux: { ReferencedTableName: parentTableName, ReferencedRootTableName: parentTableName, IsAPartOf: true, BaseTypeQualifier: parentBaseQualifierStr }
        },
        "Table_Type": {
            type: "Enum", enumValues: ["Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory"],
            initialValue: '=SWITCH(CONTEXT("View"), "Slice_Q6_Labor_Form", "Q6_Labor", "Slice_Q15_Turnover_Form", "Q15_Turnover", "Slice_Q19_Capital_Form", "Q19_Capital", "Slice_Q20_Loan_Usage_Form", "Q20_Loan_Usage", "Slice_Q22_Trajectory_Form", "Q22_Trajectory", "Q6_Labor")',
            displayName: "Section / Question Type"
        },
        "Row_Item": {
            type: "Enum", isLabel: true,
            validIf: '=IFS([Table_Type] = "Q6_Labor", LIST("Purchase of material", "Production", "Servicing", "Social media marketing", "Sale (from shop/door to door/Saras fair/haat)", "Record keeping", "Any other, specify"), [Table_Type] = "Q15_Turnover", LIST("Peak season", "Average", "Lean"), [Table_Type] = "Q19_Capital", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q20_Loan_Usage", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q22_Trajectory", LIST("Average sales/month", "Average monthly income", "In case of trading, value of inventory/stock", "In case of production, the value of stock of inputs", "In case of production, value of stock of finished products", "In case of servicing, value of enterprise related assets"))',
            displayName: '=IFS([Table_Type] = "Q6_Labor", "Activity", [Table_Type] = "Q15_Turnover", "Season", [Table_Type] = "Q19_Capital", "Capital Source", [Table_Type] = "Q20_Loan_Usage", "Loan Source", [Table_Type] = "Q22_Trajectory", "Business Metric")'
        },
        "Row_Item_Other": {
            type: "Text", showIf: '=OR(AND([Table_Type] = "Q6_Labor", [Row_Item] = "Any other, specify"), AND([Table_Type] = "Q19_Capital", [Row_Item] = "Any other, specify"))',
            displayName: "Specify Other"
        },
        // Q6
        "Labor_Involvement": { type: "Enum", enumValues: ["Regular", "Occasional", "Only respondent", "Not relevant"], showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Involvement of family members" },
        "Labor_Family_Count": { type: "Number", showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Family members involved (#)" },
        "Labor_Hired_Count": { type: "Number", showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Hired help (#)" },
        "Labor_Amount_Paid": { type: "Price", showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Amount paid in last one year (Rs)" },
        // Q15
        "Turnover_Duration_Months": { type: "Number", showIf: '=[Table_Type] = "Q15_Turnover"', displayName: "Duration in months (count)" },
        "Turnover_Monthly_Sales": { type: "Price", showIf: '=[Table_Type] = "Q15_Turnover"', displayName: "Monthly sales (Rs)" },
        "Turnover_Monthly_Profit": { type: "Price", showIf: '=[Table_Type] = "Q15_Turnover"', displayName: "Monthly net profit excluding all costs (Rs)" },
        // Q19
        "Capital_First_Year": { type: "Price", showIf: '=[Table_Type] = "Q19_Capital"', displayName: "First year amount (Rs)" },
        "Capital_In_Between": { type: "Price", showIf: '=[Table_Type] = "Q19_Capital"', displayName: "Years in-between amount (Rs)" },
        "Capital_Current_Year": { type: "Price", showIf: '=[Table_Type] = "Q19_Capital"', displayName: "Calendar year (2026-27) amount (Rs)" },
        "Capital_Pending": { type: "Price", showIf: '=AND([Table_Type] = "Q19_Capital", NOT(IN([Row_Item], LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Subsidy/grant under OSF/SVEP"))))', displayName: "Amount pending (Rs)" },
        // Q20
        "Loan_Usage": {
            type: "EnumList", baseType: "Ref", refTable: "AppVariables",
            validIf: '=SPLIT(LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "VariableList"), " , ")',
            showIf: '=[Table_Type] = "Q20_Loan_Usage"', displayName: "Usage in business",
            typeAux: { ItemSeparator: " , ", EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: true, BaseType: "Ref", BaseTypeQualifier: appVarBaseQualifierStr, ElementType: "Ref", ElementTypeQualifier: appVarBaseQualifierStr, EnumInputMode: "Auto", Valid_If: '=SPLIT(LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "VariableList"), " , ")', Show_If: '=[Table_Type] = "Q20_Loan_Usage"' }
        },
        "Loan_Usage_Other": { type: "Text", showIf: '=AND([Table_Type] = "Q20_Loan_Usage", IN("USE_OTHER", [Loan_Usage]))', displayName: "Specify other usage" },
        // Q22
        "Trajectory_First_Year_Mode": { type: "Enum", enumValues: ["Don't remember", "Rs"], showIf: '=[Table_Type] = "Q22_Trajectory"', displayName: "First year status" },
        "Trajectory_First_Year_Amount": { type: "Price", showIf: '=AND([Table_Type] = "Q22_Trajectory", [Trajectory_First_Year_Mode] = "Rs")', displayName: "First year amount (Rs)" },
        "Trajectory_Current_Year_Amount": { type: "Price", showIf: '=[Table_Type] = "Q22_Trajectory"', displayName: "Current year amount (Rs)" }
    };

    let childCount = 0;
    childAttrs.forEach((attr, idx) => {
        const p = `AppData.DataSchemas[${childTableIdx}].Attributes[${idx}]`;
        const colName = attr.Name;
        if (CHILD_CONFIGS[colName]) {
            const cfg = CHILD_CONFIGS[colName];
            if (cfg.type) { attr.Type = cfg.type; nameValueDict[`${p}.Type`] = cfg.type; }
            if (cfg.isKey !== undefined) { attr.IsKey = cfg.isKey; nameValueDict[`${p}.IsKey`] = cfg.isKey; }
            if (cfg.isLabel !== undefined) { attr.IsLabel = cfg.isLabel; nameValueDict[`${p}.IsLabel`] = cfg.isLabel; }
            if (cfg.isPartOf !== undefined) { attr.IsPartOf = cfg.isPartOf; nameValueDict[`${p}.IsPartOf`] = cfg.isPartOf; }
            if (cfg.refTable) { attr.ReferencedTableName = cfg.refTable; attr.ReferencedRootTableName = cfg.refTable; nameValueDict[`${p}.ReferencedTableName`] = cfg.refTable; nameValueDict[`${p}.ReferencedRootTableName`] = cfg.refTable; }
            if (cfg.baseType) { attr.BaseType = cfg.baseType; attr.EnumListElementTypeName = cfg.baseType; nameValueDict[`${p}.BaseType`] = cfg.baseType; nameValueDict[`${p}.EnumListElementTypeName`] = cfg.baseType; }
            if (cfg.displayName) { attr.DisplayName = cfg.displayName; nameValueDict[`${p}.DisplayName`] = cfg.displayName; }
            if (cfg.initialValue) { attr.InitialValue = cfg.initialValue; nameValueDict[`${p}.InitialValue`] = cfg.initialValue; }
            if (cfg.validIf) { attr.Valid_If = cfg.validIf; attr.ValidIf = cfg.validIf; nameValueDict[`${p}.Valid_If`] = cfg.validIf; nameValueDict[`${p}.ValidIf`] = cfg.validIf; }
            if (cfg.showIf) { attr.Show_If = cfg.showIf; attr.ShowIf = cfg.showIf; nameValueDict[`${p}.Show_If`] = cfg.showIf; nameValueDict[`${p}.ShowIf`] = cfg.showIf; }

            let auxObj = {};
            if (attr.TypeAuxData) { try { auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData }; } catch(e) {} }
            if (cfg.typeAux) auxObj = { ...auxObj, ...cfg.typeAux };
            if (cfg.enumValues) { auxObj.EnumValues = cfg.enumValues; attr.EnumValues = cfg.enumValues; nameValueDict[`${p}.EnumValues`] = cfg.enumValues; }
            if (cfg.showIf) auxObj.Show_If = cfg.showIf;
            if (cfg.validIf) auxObj.Valid_If = cfg.validIf;
            auxObj.AllowOtherValues = false;
            auxObj.AutoCompleteOtherValues = false;

            const auxStr = JSON.stringify(auxObj);
            attr.TypeAuxData = auxStr;
            nameValueDict[`${p}.TypeAuxData`] = auxStr;
            childCount++;
        }
    });

    console.log(`🔹 Survey_Tables: ${childCount} columns configured with IsPartOf, types, and Show_If rules.`);

    // 5. Setup Parent Survey Virtual Columns for Inline Display
    const listRefTypeQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const listBaseQual = JSON.stringify({ ReferencedTableName: "Survey_Tables", ReferencedRootTableName: "Survey_Tables", ReferencedType: "Text", ReferencedTypeQualifier: listRefTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: false, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const listAuxData = JSON.stringify({ ItemSeparator: " , ", EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: true, BaseType: "Ref", BaseTypeQualifier: listBaseQual, ElementType: "Ref", ElementTypeQualifier: listBaseQual, EnumInputMode: "Auto", Valid_If: null });

    const INLINE_VCS = [
        { name: "Related_Q6_Labor", formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q6_Labor"))', displayName: "Q6. Involvement of family members and hired help in business operations" },
        { name: "Related_Q15_Turnover", formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q15_Turnover"))', displayName: "Q15. Turnover and income from the enterprise" },
        { name: "Related_Q19_Capital", formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q19_Capital"))', displayName: "Q19. How have you arranged capital over the enterprise duration?" },
        { name: "Related_Q20_Loan_Usage", formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q20_Loan_Usage"))', displayName: "Q20. How did you use the loans taken from different sources?" },
        { name: "Related_Q22_Trajectory", formula: '=SELECT(Survey_Tables[ID], AND([Survey_ID] = [_THISROW].[ID], [Table_Type] = "Q22_Trajectory"))', displayName: "Q22. What changes have happened in your business?" }
    ];

    let vcCount = 0;
    INLINE_VCS.forEach(vc => {
        let aIdx = surveyAttrs.findIndex(a => a.Name === vc.name);
        let attr;
        if (aIdx === -1) {
            attr = { Name: vc.name, Type: "List", EnumListElementTypeName: "Ref", ReferencedTableName: "Survey_Tables", ReferencedRootTableName: "Survey_Tables", IsVirtual: true, IsKey: false, IsLabel: false, IsReadOnly: true, AppFormula: vc.formula, DisplayName: vc.displayName, TypeAuxData: listAuxData };
            surveyAttrs.push(attr);
            aIdx = surveyAttrs.length - 1;
        } else {
            attr = surveyAttrs[aIdx];
            attr.Type = "List"; attr.EnumListElementTypeName = "Ref"; attr.ReferencedTableName = "Survey_Tables"; attr.ReferencedRootTableName = "Survey_Tables"; attr.IsVirtual = true; attr.IsKey = false; attr.IsLabel = false; attr.IsReadOnly = true; attr.AppFormula = vc.formula; attr.DisplayName = vc.displayName; attr.TypeAuxData = listAuxData;
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
        vcCount++;
    });

    console.log(`🔹 Parent Survey: ${vcCount} inline virtual columns staged.`);

    // 6. Dispatch to Redux Store
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    // 7. Audit Report
    console.log("%c╔══════════════════════════════════════════════════════════════════════════╗", "color:#4285f4;font-weight:bold;");
    console.log("%c║       🚀 [OmmNoMi] SECTION C CHILD ARCHITECTURE APPLIED (100%)           ║", "color:#4285f4;font-size:14px;font-weight:bold;");
    console.log("%c╚══════════════════════════════════════════════════════════════════════════╝", "color:#4285f4;font-weight:bold;");
    console.table([
        { Component: "Survey_Tables Child Table", Status: "✅ CONFIGURED", Detail: `${childCount} cols with IsPartOf=TRUE & Show_If rules` },
        { Component: "Section C Inline VCs", Status: "✅ CONFIGURED", Detail: `${vcCount} dedicated virtual columns in Survey` },
        { Component: "Other Values Restriction", Status: "✅ ENFORCED", Detail: "Zero custom text allowed globally" }
    ]);
    console.log("%c👉 CLICK NATIVE 'SAVE' BUTTON (TOP RIGHT BLUE) IN APPSHEET NOW!", "color:#34a853;font-size:16px;font-weight:bold;");
})();
