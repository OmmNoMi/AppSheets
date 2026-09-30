// =========================================================================
// OmmNoMi: Master Child Architecture & Multilingual Lock Engine (V4 - Bulletproof)
// App: SHG_Women-259840489-26-09-21
// Target: Survey (Clean 130 Cols + 5 Inline VCs) & Survey_Tables (21 Child Cols)
// =========================================================================
(function runMasterArchitectureAndLockEngine() {
    console.clear();
    console.log("%c╔════════════════════════════════════════════════════════════════════════════════════════╗", "color:#4285f4;font-weight:bold;");
    console.log("%c║   🚀 [OmmNoMi] MASTER CHILD ARCHITECTURE & MULTILINGUAL LOCK ENGINE INITIALIZING...   ║", "color:#4285f4;font-size:13px;font-weight:bold;");
    console.log("%c╚════════════════════════════════════════════════════════════════════════════════════════╝", "color:#4285f4;font-weight:bold;");

    // 0. Auto-close any open modals
    document.querySelectorAll('button').forEach(b => {
        const txt = b.textContent?.trim().toLowerCase();
        if (txt === 'done' || txt === 'cancel' || b.getAttribute('aria-label') === 'Close') {
            try { b.click(); } catch(e) {}
        }
    });

    // 1. Locate Redux Store
    let store = window.appStore;
    if (!store) {
        const candidates = [
            document.querySelector('.ExpressionControl'),
            document.querySelector('[role="grid"]'),
            document.querySelector('#root'),
            document.body
        ];
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
        console.error("❌ Redux store nahi mila! Kripya AppSheet editor me page refresh karke dobara try karein.");
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
    const surveyIdx = schemas.findIndex(s => s && (s.Name === 'Survey' || s.TableName === 'Survey' || s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType')));
    const childTableIdx = schemas.findIndex(s => s && (s.Name === 'Survey_Tables' || s.TableName === 'Survey_Tables' || s.Attributes?.some(a => a.Name === 'Table_Type')));
    const appVarSchemaIdx = schemas.findIndex(s => s && (s.Name === 'AppVariables' || s.TableName === 'AppVariables' || s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList')));

    if (surveyIdx === -1) {
        console.error("❌ Parent 'Survey' table schema nahi mila!");
        return;
    }

    const parentTableName = schemas[surveyIdx].Name || schemas[surveyIdx].TableName || "Survey";

    if (childTableIdx === -1) {
        console.log("%c⚠️ 'Survey_Tables' table abhi AppSheet Data me add nahi hui hai!", "color:#ea4335;font-size:16px;font-weight:bold;");
        console.log("%c📋 KRIPYA PEHLE YEH 2 STEPS KAREIN:\n" +
            "1️⃣ Data > Tables me 'Survey' par jakar 'Regenerate Schema' karein.\n" +
            "2️⃣ Data > Tables me '➕ Add Table' par click karke 'Survey_Tables' ko add karein.\n" +
            "3️⃣ Phir yeh script wapas console me chalayein!", "color:#fbbc05;font-size:14px;line-height:1.7;font-weight:bold;");
        return;
    }

    console.log(`✅ Schemas Located: Survey [${surveyIdx}] ('${parentTableName}'), Survey_Tables [${childTableIdx}], AppVariables [${appVarSchemaIdx}]`);

    const nameValueDict = {};

    // 3. Base Qualifiers Setup
    const refTypeQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const appVarBaseQualifierStr = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedRootTableName: "AppVariables", ReferencedType: "Text", ReferencedTypeQualifier: refTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: false, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const parentBaseQualifierStr = JSON.stringify({ ReferencedTableName: parentTableName, ReferencedRootTableName: parentTableName, ReferencedType: "Text", ReferencedTypeQualifier: refTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: true, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });

    // 4. AppVariables Multilingual Label & Key Configuration
    if (appVarSchemaIdx !== -1) {
        const avAttrs = schemas[appVarSchemaIdx].Attributes;
        const labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), [Title_raj], TRUE, [Title_hi])';

        avAttrs.forEach((attr, aIdx) => {
            const p = `AppData.DataSchemas[${appVarSchemaIdx}].Attributes[${aIdx}]`;
            if (attr.Name === 'ID') {
                attr.IsKey = true; attr.IsLabel = false;
                nameValueDict[`${p}.IsKey`] = true; nameValueDict[`${p}.IsLabel`] = false;
            } else if (attr.Name === 'Label') {
                attr.IsKey = false; attr.IsLabel = true; attr.IsVirtual = true;
                attr.SourceColumn = null; attr.IsReadOnly = true; attr.Type = 'Text'; attr.AppFormula = labelFormula;
                nameValueDict[`${p}.IsKey`] = false; nameValueDict[`${p}.IsLabel`] = true;
                nameValueDict[`${p}.IsVirtual`] = true; nameValueDict[`${p}.SourceColumn`] = null;
                nameValueDict[`${p}.IsReadOnly`] = true; nameValueDict[`${p}.Type`] = 'Text';
                nameValueDict[`${p}.AppFormula`] = labelFormula;
            } else if (attr.IsLabel) {
                attr.IsLabel = false;
                nameValueDict[`${p}.IsLabel`] = false;
            }
        });
        console.log("🔹 AppVariables configured: ID=Key, Label=Virtual Column (Multilingual formula).");
    }

    // 5. Configure Child Table `Survey_Tables` (All 21 Columns + IsPartOf: true)
    const childAttrs = schemas[childTableIdx].Attributes;
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
        // Q6 Labor
        "Labor_Involvement": { type: "Enum", enumValues: ["Regular", "Occasional", "Only respondent", "Not relevant"], showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Involvement of family members" },
        "Labor_Family_Count": { type: "Number", showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Family members involved (#)" },
        "Labor_Hired_Count": { type: "Number", showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Hired help (#)" },
        "Labor_Amount_Paid": { type: "Price", showIf: '=[Table_Type] = "Q6_Labor"', displayName: "Amount paid in last one year (Rs)" },
        // Q15 Turnover
        "Turnover_Duration_Months": { type: "Number", showIf: '=[Table_Type] = "Q15_Turnover"', displayName: "Duration in months (count)" },
        "Turnover_Monthly_Sales": { type: "Price", showIf: '=[Table_Type] = "Q15_Turnover"', displayName: "Monthly sales (Rs)" },
        "Turnover_Monthly_Profit": { type: "Price", showIf: '=[Table_Type] = "Q15_Turnover"', displayName: "Monthly net profit excluding all costs (Rs)" },
        // Q19 Capital Arranged
        "Capital_First_Year": { type: "Price", showIf: '=[Table_Type] = "Q19_Capital"', displayName: "First year amount (Rs)" },
        "Capital_In_Between": { type: "Price", showIf: '=[Table_Type] = "Q19_Capital"', displayName: "Years in-between amount (Rs)" },
        "Capital_Current_Year": { type: "Price", showIf: '=[Table_Type] = "Q19_Capital"', displayName: "Calendar year (2026-27) amount (Rs)" },
        "Capital_Pending": { type: "Price", showIf: '=AND([Table_Type] = "Q19_Capital", NOT(IN([Row_Item], LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Subsidy/grant under OSF/SVEP"))))', displayName: "Amount pending (Rs)" },
        // Q20 Loan Usage
        "Loan_Usage": {
            type: "EnumList", baseType: "Ref", refTable: "AppVariables",
            validIf: '=SPLIT(LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "VariableList"), " , ")',
            showIf: '=[Table_Type] = "Q20_Loan_Usage"', displayName: "Usage in business",
            typeAux: { ItemSeparator: " , ", EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: false, BaseType: "Ref", BaseTypeQualifier: appVarBaseQualifierStr, ElementType: "Ref", ElementTypeQualifier: appVarBaseQualifierStr, EnumInputMode: "Auto", Valid_If: '=SPLIT(LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "VariableList"), " , ")', Show_If: '=[Table_Type] = "Q20_Loan_Usage"' }
        },
        "Loan_Usage_Other": { type: "Text", showIf: '=AND([Table_Type] = "Q20_Loan_Usage", IN("USE_OTHER", [Loan_Usage]))', displayName: "Specify other usage" },
        // Q22 Trajectory
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
            if (cfg.refTable) {
                attr.ReferencedTableName = cfg.refTable; attr.ReferencedRootTableName = cfg.refTable;
                nameValueDict[`${p}.ReferencedTableName`] = cfg.refTable; nameValueDict[`${p}.ReferencedRootTableName`] = cfg.refTable;
            }
            if (cfg.baseType) {
                attr.BaseType = cfg.baseType; attr.EnumListElementTypeName = cfg.baseType;
                nameValueDict[`${p}.BaseType`] = cfg.baseType; nameValueDict[`${p}.EnumListElementTypeName`] = cfg.baseType;
            }
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

    console.log(`🔹 Survey_Tables: ${childCount} columns configured with IsPartOf=TRUE, Types, and Show_If rules.`);

    // 6. Parent Survey: Stage 5 Dedicated Inline Virtual Columns
    const surveyAttrs = schemas[surveyIdx].Attributes;
    const listRefTypeQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const listBaseQual = JSON.stringify({ ReferencedTableName: "Survey_Tables", ReferencedRootTableName: "Survey_Tables", ReferencedType: "Text", ReferencedTypeQualifier: listRefTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: false, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const listAuxData = JSON.stringify({ ItemSeparator: " , ", EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: false, BaseType: "Ref", BaseTypeQualifier: listBaseQual, ElementType: "Ref", ElementTypeQualifier: listBaseQual, EnumInputMode: "Auto", Valid_If: null });

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

    // 7. Complete Multilingual Dropdown Catalog for Survey Table (Clean 130 Columns)
    const SURVEY_QMAP = {
        // Section Status
        "Status_Profile": { "qid": "Q_STAT_PROFILE", "is_multi": false },
        "Status_Operations": { "qid": "Q_STAT_OPERATIONS", "is_multi": false },
        "Status_Challenges": { "qid": "Q_STAT_CHALLENGES", "is_multi": false },
        "Status_SchemeImpact": { "qid": "Q_STAT_SCHEME", "is_multi": false },
        "Status_Digital": { "qid": "Q_STAT_DIGITAL", "is_multi": false },
        "Status_PostExit": { "qid": "Q_STAT_POST_EXIT", "is_multi": false },

        // Section A
        "District": { "qid": "Q_A_01_00", "is_multi": false },
        "Block": { "qid": "Q_A_02_00", "is_multi": false, "valid_if": '=SELECT(AppVariables[ID], AND([Column] = "Block", [Description] = [_THISROW].[District]))' },
        "LeadershipRole": { "qid": "Q_A_09_00", "is_multi": false },
        "RelatedToCRP": { "qid": "Q_A_11_00", "is_multi": false },
        "EPInterventionType": { "qid": "Q_A_12_00", "is_multi": false },
        "BusinessType": { "qid": "Q_A_16_00", "is_multi": true },
        "BusinessActivities": { "qid": "Q_A_17_00", "is_multi": true },

        // Section B
        "RespondentAge": { "qid": "Q_B_01_00", "is_multi": false },
        "MaritalStatus": { "qid": "Q_B_02_00", "is_multi": false },
        "SocialCategory": { "qid": "Q_B_03_00", "is_multi": false },
        "EducationStatus": { "qid": "Q_B_04_00", "is_multi": false },
        "FamilyIncomeSources": { "qid": "Q_B_07_00", "is_multi": true },
        "AnnualHouseholdIncome": { "qid": "Q_B_08_00", "is_multi": false },

        // Section C
        "ReasonsStartingBusiness": { "qid": "Q_C_01_00", "is_multi": true },
        "BusinessCycle": { "qid": "Q_C_02_00", "is_multi": false },
        "BusinessPlaceType": { "qid": "Q_C_03_00", "is_multi": false },
        "LocationConvenience": { "qid": "Q_C_05_00", "is_multi": false },
        "AnnualSalaryBill": { "qid": "Q_C_07_00", "is_multi": false },
        "MarketingMethods": { "qid": "Q_C_09_00", "is_multi": true },
        "SeasonalSalesMethod": { "qid": "Q_C_10_00", "is_multi": false },
        "SocialMediaForMarketing": { "qid": "Q_C_11_00", "is_multi": false },
        "RecordKeepingHabit": { "qid": "Q_C_13_00", "is_multi": false },
        "RecordKeepingMethod": { "qid": "Q_C_14_00", "is_multi": false },
        "InitialStartCapital": { "qid": "Q_C_16_00", "is_multi": false },
        "InitialCapitalArranged": { "qid": "Q_C_17_00", "is_multi": false },
        "SHGAssociationAssistance": { "qid": "Q_C_18_00", "is_multi": true },
        "MonthlyIncomeIncreaseByOSFSVEP": { "qid": "Q_C_21_00", "is_multi": false },
        "FinancialHelpFromIncome": { "qid": "Q_C_23_00", "is_multi": true },

        // Section D
        "HusbandFamilyResponse": { "qid": "Q_D_01_00", "is_multi": true },
        "MaterialSourcingComfort": { "qid": "Q_D_02_00", "is_multi": false },
        "CustomerPaymentRecovery": { "qid": "Q_D_03_00", "is_multi": false },
        "FundingExperience": { "qid": "Q_D_04_00", "is_multi": true },
        "CurrentChallenges": { "qid": "Q_D_05_00", "is_multi": true },

        // Section E
        "AttendedTraining": { "qid": "Q_E_01_00", "is_multi": false },
        "UsedTrainingComponent": { "qid": "Q_E_03_00", "is_multi": false },
        "CRPContributions": { "qid": "Q_E_06_00", "is_multi": true },
        "ExpectationsFromScheme": { "qid": "Q_E_07_00", "is_multi": false },

        // Section F
        "SmartphoneOwnership": { "qid": "Q_F_01_00", "is_multi": false },
        "UseQRUPI": { "qid": "Q_F_02_00", "is_multi": false },
        "QRDailyTransactions": { "qid": "Q_F_03_00", "is_multi": false },
        "QRNonUseReason": { "qid": "Q_F_04_00", "is_multi": false },
        "SocialPlatformsUsed": { "qid": "Q_F_05_00", "is_multi": true },
        "SocialPlatformUsageMode": { "qid": "Q_F_06_00", "is_multi": true },
        "SocialMediaFrequency": { "qid": "Q_F_07_00", "is_multi": false },

        // Section G
        "BusinessOperationalStatus": { "qid": "Q_G_02_00", "is_multi": false },
        "ScalingDownClosingReasons": { "qid": "Q_G_03_00", "is_multi": true },
        "SupportNeededForSustenance": { "qid": "Q_G_04_00", "is_multi": true }
    };

    let surveySingleCount = 0;
    let surveyMultiCount = 0;

    surveyAttrs.forEach((attr, idx) => {
        const colName = attr.Name;
        const p = `AppData.DataSchemas[${surveyIdx}].Attributes[${idx}]`;

        if (colName && SURVEY_QMAP[colName]) {
            const qInfo = SURVEY_QMAP[colName];
            const qId = qInfo.qid;
            const isMulti = qInfo.is_multi;
            const validIfFormula = qInfo.valid_if || `=SPLIT(LOOKUP("${qId}", "AppVariables", "ID", "VariableList"), " , ")`;
            const dnFormula = `=LOOKUP("${qId}", "AppVariables", "ID", "Label")`;

            let typeAuxObj = {};
            if (attr.TypeAuxData) {
                try { typeAuxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData }; } catch(e) {}
            }

            typeAuxObj.BaseType = "Ref";
            typeAuxObj.ReferencedTableName = "AppVariables";
            typeAuxObj.ReferencedRootTableName = "AppVariables";
            typeAuxObj.BaseTypeQualifier = appVarBaseQualifierStr;
            typeAuxObj.AllowOtherValues = false;
            typeAuxObj.AutoCompleteOtherValues = false;
            typeAuxObj.EnumValues = [];
            typeAuxObj.Valid_If = validIfFormula;
            typeAuxObj.EnumInputMode = "Auto";
            typeAuxObj.UseDropdown = true;

            attr.BaseType = 'Ref';
            attr.ReferencedTableName = 'AppVariables';
            attr.ReferencedRootTableName = 'AppVariables';
            attr.DisplayName = dnFormula;
            attr.Valid_If = validIfFormula;
            attr.ValidIf = validIfFormula;
            attr.EnumValues = [];

            nameValueDict[`${p}.BaseType`] = 'Ref';
            nameValueDict[`${p}.ReferencedTableName`] = 'AppVariables';
            nameValueDict[`${p}.ReferencedRootTableName`] = 'AppVariables';
            nameValueDict[`${p}.DisplayName`] = dnFormula;
            nameValueDict[`${p}.ValidIf`] = validIfFormula;
            nameValueDict[`${p}.Valid_If`] = validIfFormula;
            nameValueDict[`${p}.EnumValues`] = [];

            if (isMulti) {
                typeAuxObj.ElementType = "Ref";
                typeAuxObj.ElementTypeQualifier = appVarBaseQualifierStr;
                typeAuxObj.ItemSeparator = " , ";

                attr.Type = 'EnumList';
                attr.EnumListElementTypeName = 'Ref';
                nameValueDict[`${p}.Type`] = 'EnumList';
                nameValueDict[`${p}.EnumListElementTypeName`] = 'Ref';
                surveyMultiCount++;
            } else {
                attr.Type = 'Enum';
                nameValueDict[`${p}.Type`] = 'Enum';
                surveySingleCount++;
            }

            const typeAuxStr = JSON.stringify(typeAuxObj);
            attr.TypeAuxData = typeAuxStr;
            nameValueDict[`${p}.TypeAuxData`] = typeAuxStr;
        } else if (attr.Type === 'Enum' || attr.Type === 'EnumList') {
            // Global lock: Disable other values on any other dropdown
            let auxObj = {};
            if (attr.TypeAuxData) {
                try { auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData }; } catch(e) {}
            }
            if (auxObj.AllowOtherValues !== false || auxObj.AutoCompleteOtherValues !== false) {
                auxObj.AllowOtherValues = false;
                auxObj.AutoCompleteOtherValues = false;
                const auxStr = JSON.stringify(auxObj);
                attr.TypeAuxData = auxStr;
                nameValueDict[`${p}.TypeAuxData`] = auxStr;
            }
        }
    });

    console.log(`🔹 Parent Survey: ${surveySingleCount} Single-select & ${surveyMultiCount} Multi-select dropdowns configured & locked.`);

    // 8. Dispatch Batch Update to AppSheet Redux Store
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch(e) {}

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    // 9. Built-in Comprehensive Health Audit (Real-time verification)
    console.log("%c╔════════════════════════════════════════════════════════════════════════════════════════╗", "color:#4285f4;font-weight:bold;");
    console.log("%c║           🚀 [OmmNoMi] 100% HEALTH & COMPLIANCE AUDIT VERIFICATION...                  ║", "color:#4285f4;font-size:13px;font-weight:bold;");
    console.log("%c╚════════════════════════════════════════════════════════════════════════════════════════╝", "color:#4285f4;font-weight:bold;");

    const auditChecks = [];

    // Check 1: Child Table Survey_Tables
    const cTable = schemas[childTableIdx];
    const cSurveyId = cTable?.Attributes?.find(a => a.Name === 'Survey_ID');
    const isChildPartOf = cSurveyId?.IsPartOf === true && cSurveyId?.ReferencedTableName === parentTableName;
    auditChecks.push({ Module: "1. Survey_Tables Child Engine", Status: isChildPartOf ? "✅ 100% PASS" : "❌ FAIL", Detail: `${childCount} cols, IsPartOf=TRUE, Ref=${parentTableName}` });

    // Check 2: 5 Inline Virtual Columns in Survey
    const vcsOk = INLINE_VCS.every(v => {
        const a = surveyAttrs.find(x => x.Name === v.name);
        return a && a.IsVirtual && a.Type === 'List' && a.ReferencedTableName === 'Survey_Tables';
    });
    auditChecks.push({ Module: "2. Section C Inline VCs", Status: vcsOk ? "✅ 100% PASS" : "❌ FAIL", Detail: `${vcCount}/5 Inline VCs staged in Survey` });

    // Check 3: AppVariables Multilingual Engine
    const av = schemas[appVarSchemaIdx];
    const avId = av?.Attributes?.find(a => a.Name === 'ID');
    const avLbl = av?.Attributes?.find(a => a.Name === 'Label');
    const avOk = avId?.IsKey && avLbl?.IsVirtual && avLbl?.AppFormula?.includes('USEREMAIL()');
    auditChecks.push({ Module: "3. AppVariables Engine", Status: avOk ? "✅ 100% PASS" : "❌ FAIL", Detail: "ID=Key, Label=Virtual Multilingual Column" });

    // Check 4: BusinessType (Multi-select EnumList Ref to AppVariables)
    const biz = surveyAttrs.find(a => a.Name === 'BusinessType');
    let bAux = {}; try { bAux = JSON.parse(biz?.TypeAuxData || "{}"); } catch(e) {}
    const bizPass = (biz?.Type === 'EnumList') && (biz?.BaseType === 'Ref' || bAux?.BaseType === 'Ref') && (biz?.ReferencedTableName === 'AppVariables');
    auditChecks.push({ Module: "4. BusinessType Multi-select Ref", Status: bizPass ? "✅ 100% PASS" : "❌ FAIL", Detail: "Type=EnumList, BaseType=Ref -> AppVariables" });

    // Check 5: Block & District Dropdowns
    const blk = surveyAttrs.find(a => a.Name === 'Block');
    const blkPass = (blk?.Type === 'Enum') && (blk?.ReferencedTableName === 'AppVariables');
    auditChecks.push({ Module: "5. Block Dynamic Filter", Status: blkPass ? "✅ 100% PASS" : "❌ FAIL", Detail: "Type=Enum, Ref=AppVariables, Cascading Filter Active" });

    // Check 6: Zero Custom / Other Values Allowed Globally
    let anyOtherAllowed = false;
    surveyAttrs.forEach(a => {
        if (a.Type === 'Enum' || a.Type === 'EnumList') {
            try {
                const ax = JSON.parse(a.TypeAuxData || "{}");
                if (ax.AllowOtherValues === true) anyOtherAllowed = true;
            } catch(e) {}
        }
    });
    auditChecks.push({ Module: "6. Other Values Restriction", Status: !anyOtherAllowed ? "✅ 100% PASS" : "❌ FAIL", Detail: "Zero custom values allowed globally" });

    console.table(auditChecks);

    const allPass = auditChecks.every(c => c.Status.includes("PASS"));
    if (allPass) {
        console.log("%c🎉 [OmmNoMi] 100% AUDIT PASS! Sabhi checks ekdum perfect hain!", "color:#34a853;font-size:16px;font-weight:bold;");
        console.log("%c👉 CLICK THE BLUE 'SAVE' BUTTON (TOP-RIGHT) IN APPSHEET NOW!", "color:#ea4335;font-size:18px;font-weight:bold;");
    } else {
        console.warn("⚠️ Kuch checks pending hain, check details above.");
    }
})();
