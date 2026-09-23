// =========================================================================
// OmmNoMi: Configure Survey_Tables Child Table & IsPartOf Architecture
// =========================================================================
(function configureSurveyTablesArchitecture() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Initializing Survey_Tables Child Architecture...", "color:#4285f4;font-size:16px;font-weight:bold;");

    const store = window.appStore;
    if (!store) {
        console.error("❌ Redux store (window.appStore) nahi mila! AppSheet editor me page refresh karke run karein.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }

    // 1. Check if Survey_Tables is loaded in AppSheet
    const surveyIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const childTableIdx = schemas.findIndex(s => s && (s.Name === 'Survey_Tables' || s.TableName === 'Survey_Tables' || s.Attributes?.some(a => a.Name === 'Table_Type')));

    if (surveyIdx === -1) {
        console.error("❌ Parent Survey table nahi mila!");
        return;
    }

    const parentTableName = schemas[surveyIdx].Name || schemas[surveyIdx].TableName || "Survey";

    if (childTableIdx === -1) {
        console.warn("%c⚠️ 'Survey_Tables' table abhi AppSheet me add nahi hua hai!", "color:#ea4335;font-size:14px;font-weight:bold;");
        console.log("%c👉 Kripya AppSheet Editor me jaakar:\n   1. Left menu me 'Data' (Tables) par click karein.\n   2. '➕' (Add Table) par click karein aur 'Universal_Dynamic_Survey_Engine' spreadsheet se 'Survey_Tables' sheet ko select karke ADD karein.\n   3. Table add hone ke baad yeh script dobara run karein!", "color:#fbbc05;font-size:13px;line-height:1.6;");
        return;
    }

    console.log(`✅ Located Schemas: Parent Survey [${surveyIdx}] ('${parentTableName}'), Child Survey_Tables [${childTableIdx}]`);

    const childAttrs = schemas[childTableIdx].Attributes;
    const nameValueDict = {};

    // Reference qualifier to Parent Survey
    const parentRefTypeQual = JSON.stringify({
        MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
        IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
        Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
    });
    const parentBaseQualifierStr = JSON.stringify({
        ReferencedTableName: parentTableName,
        ReferencedRootTableName: parentTableName,
        ReferencedType: "Text",
        ReferencedTypeQualifier: parentRefTypeQual,
        ReferencedKeyColumn: "ID",
        IsAPartOf: true,
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

    // Reference qualifier to AppVariables
    const appVarRefTypeQual = JSON.stringify({
        MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
        IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
        Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
    });
    const appVarBaseQualifierStr = JSON.stringify({
        ReferencedTableName: "AppVariables",
        ReferencedRootTableName: "AppVariables",
        ReferencedType: "Text",
        ReferencedTypeQualifier: appVarRefTypeQual,
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

    // Detailed Column Configurations for Survey_Tables
    const CONFIGS = {
        "ID": {
            type: "Text",
            isKey: true,
            isLabel: false,
            initialValue: "=UNIQUEID()"
        },
        "Survey_ID": {
            type: "Ref",
            isKey: false,
            isLabel: false,
            refTable: parentTableName,
            isPartOf: true,
            typeAux: {
                ReferencedTableName: parentTableName,
                ReferencedRootTableName: parentTableName,
                IsAPartOf: true,
                BaseTypeQualifier: parentBaseQualifierStr
            }
        },
        "Table_Type": {
            type: "Enum",
            enumValues: ["Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory"],
            initialValue: '=SWITCH(CONTEXT("View"), "Slice_Q6_Labor_Form", "Q6_Labor", "Slice_Q15_Turnover_Form", "Q15_Turnover", "Slice_Q19_Capital_Form", "Q19_Capital", "Slice_Q20_Loan_Usage_Form", "Q20_Loan_Usage", "Slice_Q22_Trajectory_Form", "Q22_Trajectory", "Q6_Labor")',
            displayName: "Section / Question Type"
        },
        "Row_Item": {
            type: "Enum",
            isLabel: true,
            validIf: '=IFS([Table_Type] = "Q6_Labor", LIST("Purchase of material", "Production", "Servicing", "Social media marketing", "Sale (from shop/door to door/Saras fair/haat)", "Record keeping", "Any other, specify"), [Table_Type] = "Q15_Turnover", LIST("Peak season", "Average", "Lean"), [Table_Type] = "Q19_Capital", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q20_Loan_Usage", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q22_Trajectory", LIST("Average sales/month", "Average monthly income", "In case of trading, value of inventory/stock", "In case of production, the value of stock of inputs", "In case of production, value of stock of finished products", "In case of servicing, value of enterprise related assets"))',
            displayName: '=IFS([Table_Type] = "Q6_Labor", "Activity", [Table_Type] = "Q15_Turnover", "Season", [Table_Type] = "Q19_Capital", "Capital Source", [Table_Type] = "Q20_Loan_Usage", "Loan Source", [Table_Type] = "Q22_Trajectory", "Business Metric")'
        },
        "Row_Item_Other": {
            type: "Text",
            showIf: '=OR(AND([Table_Type] = "Q6_Labor", [Row_Item] = "Any other, specify"), AND([Table_Type] = "Q19_Capital", [Row_Item] = "Any other, specify"))',
            displayName: "Specify Other"
        },
        // Q6 Labor Columns
        "Labor_Involvement": {
            type: "Enum",
            enumValues: ["Regular", "Occasional", "Only respondent", "Not relevant"],
            showIf: '=[Table_Type] = "Q6_Labor"',
            displayName: "Involvement of family members"
        },
        "Labor_Family_Count": {
            type: "Number",
            showIf: '=[Table_Type] = "Q6_Labor"',
            displayName: "Family members involved (#)"
        },
        "Labor_Hired_Count": {
            type: "Number",
            showIf: '=[Table_Type] = "Q6_Labor"',
            displayName: "Hired help (#)"
        },
        "Labor_Amount_Paid": {
            type: "Price",
            showIf: '=[Table_Type] = "Q6_Labor"',
            displayName: "Amount paid in last one year (Rs)"
        },
        // Q15 Turnover Columns
        "Turnover_Duration_Months": {
            type: "Number",
            showIf: '=[Table_Type] = "Q15_Turnover"',
            displayName: "Duration in months (count)"
        },
        "Turnover_Monthly_Sales": {
            type: "Price",
            showIf: '=[Table_Type] = "Q15_Turnover"',
            displayName: "Monthly sales (Rs)"
        },
        "Turnover_Monthly_Profit": {
            type: "Price",
            showIf: '=[Table_Type] = "Q15_Turnover"',
            displayName: "Monthly net profit excluding all costs (Rs)"
        },
        // Q19 Capital Columns
        "Capital_First_Year": {
            type: "Price",
            showIf: '=[Table_Type] = "Q19_Capital"',
            displayName: "First year amount (Rs)"
        },
        "Capital_In_Between": {
            type: "Price",
            showIf: '=[Table_Type] = "Q19_Capital"',
            displayName: "Years in-between amount (Rs)"
        },
        "Capital_Current_Year": {
            type: "Price",
            showIf: '=[Table_Type] = "Q19_Capital"',
            displayName: "Calendar year (2026-27) amount (Rs)"
        },
        "Capital_Pending": {
            type: "Price",
            showIf: '=AND([Table_Type] = "Q19_Capital", NOT(IN([Row_Item], LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Subsidy/grant under OSF/SVEP"))))',
            displayName: "Amount pending (Rs)"
        },
        // Q20 Loan Usage Columns
        "Loan_Usage": {
            type: "EnumList",
            baseType: "Ref",
            refTable: "AppVariables",
            validIf: '=SPLIT(LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "VariableList"), " , ")',
            showIf: '=[Table_Type] = "Q20_Loan_Usage"',
            displayName: "Usage in business",
            typeAux: {
                ItemSeparator: " , ",
                EnumValues: [],
                AllowOtherValues: false,
                AutoCompleteOtherValues: true,
                BaseType: "Ref",
                BaseTypeQualifier: appVarBaseQualifierStr,
                ElementType: "Ref",
                ElementTypeQualifier: appVarBaseQualifierStr,
                EnumInputMode: "Auto",
                Valid_If: '=SPLIT(LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "VariableList"), " , ")',
                Show_If: '=[Table_Type] = "Q20_Loan_Usage"'
            }
        },
        "Loan_Usage_Other": {
            type: "Text",
            showIf: '=AND([Table_Type] = "Q20_Loan_Usage", IN("USE_OTHER", [Loan_Usage]))',
            displayName: "Specify other usage"
        },
        // Q22 Trajectory Columns
        "Trajectory_First_Year_Mode": {
            type: "Enum",
            enumValues: ["Don't remember", "Rs"],
            showIf: '=[Table_Type] = "Q22_Trajectory"',
            displayName: "First year status"
        },
        "Trajectory_First_Year_Amount": {
            type: "Price",
            showIf: '=AND([Table_Type] = "Q22_Trajectory", [Trajectory_First_Year_Mode] = "Rs")',
            displayName: "First year amount (Rs)"
        },
        "Trajectory_Current_Year_Amount": {
            type: "Price",
            showIf: '=[Table_Type] = "Q22_Trajectory"',
            displayName: "Current year amount (Rs)"
        }
    };

    let configuredCols = 0;

    childAttrs.forEach((attr, idx) => {
        const p = `AppData.DataSchemas[${childTableIdx}].Attributes[${idx}]`;
        const colName = attr.Name;

        if (CONFIGS[colName]) {
            const cfg = CONFIGS[colName];

            // Type
            if (cfg.type) {
                attr.Type = cfg.type;
                nameValueDict[`${p}.Type`] = cfg.type;
            }

            // Key & Label
            if (cfg.isKey !== undefined) {
                attr.IsKey = cfg.isKey;
                nameValueDict[`${p}.IsKey`] = cfg.isKey;
            }
            if (cfg.isLabel !== undefined) {
                attr.IsLabel = cfg.isLabel;
                nameValueDict[`${p}.IsLabel`] = cfg.isLabel;
            }

            // IsPartOf & Ref
            if (cfg.isPartOf !== undefined) {
                attr.IsPartOf = cfg.isPartOf;
                nameValueDict[`${p}.IsPartOf`] = cfg.isPartOf;
            }
            if (cfg.refTable) {
                attr.ReferencedTableName = cfg.refTable;
                attr.ReferencedRootTableName = cfg.refTable;
                nameValueDict[`${p}.ReferencedTableName`] = cfg.refTable;
                nameValueDict[`${p}.ReferencedRootTableName`] = cfg.refTable;
            }
            if (cfg.baseType) {
                attr.BaseType = cfg.baseType;
                attr.EnumListElementTypeName = cfg.baseType;
                nameValueDict[`${p}.BaseType`] = cfg.baseType;
                nameValueDict[`${p}.EnumListElementTypeName`] = cfg.baseType;
            }

            // DisplayName
            if (cfg.displayName) {
                attr.DisplayName = cfg.displayName;
                nameValueDict[`${p}.DisplayName`] = cfg.displayName;
            }

            // InitialValue
            if (cfg.initialValue) {
                attr.InitialValue = cfg.initialValue;
                nameValueDict[`${p}.InitialValue`] = cfg.initialValue;
            }

            // Valid_If
            if (cfg.validIf) {
                attr.Valid_If = cfg.validIf;
                attr.ValidIf = cfg.validIf;
                nameValueDict[`${p}.Valid_If`] = cfg.validIf;
                nameValueDict[`${p}.ValidIf`] = cfg.validIf;
            }

            // Show_If
            if (cfg.showIf) {
                attr.Show_If = cfg.showIf;
                attr.ShowIf = cfg.showIf;
                nameValueDict[`${p}.Show_If`] = cfg.showIf;
                nameValueDict[`${p}.ShowIf`] = cfg.showIf;
            }

            // TypeAuxData
            let auxObj = {};
            if (attr.TypeAuxData) {
                try { auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData }; } catch(e) {}
            }
            if (cfg.typeAux) {
                auxObj = { ...auxObj, ...cfg.typeAux };
            }
            if (cfg.enumValues) {
                auxObj.EnumValues = cfg.enumValues;
                attr.EnumValues = cfg.enumValues;
                nameValueDict[`${p}.EnumValues`] = cfg.enumValues;
            }
            if (cfg.showIf) {
                auxObj.Show_If = cfg.showIf;
            }
            if (cfg.validIf) {
                auxObj.Valid_If = cfg.validIf;
            }
            auxObj.AllowOtherValues = false;
            auxObj.AutoCompleteOtherValues = false;

            const auxStr = JSON.stringify(auxObj);
            attr.TypeAuxData = auxStr;
            nameValueDict[`${p}.TypeAuxData`] = auxStr;

            configuredCols++;
        }
    });

    console.log(`%c⚡ Configured ${configuredCols} / 21 columns in Survey_Tables. Dispatching to Redux...`, "color:#34a853;font-weight:bold;");

    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("%c🎉 [OmmNoMi] Survey_Tables schema & IsPartOf rules applied! Click the native SAVE button in AppSheet top-right!", "color:#34a853;font-size:16px;font-weight:bold;");
})();
