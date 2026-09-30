// =========================================================================
// OmmNoMi: Fix Multilingual Dropdowns & EnumList Ref BaseType
// =========================================================================
(function fixMultilingualDropdowns() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Initializing Multilingual Dropdown & Ref Engine...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // 0. Close any open dialogs / modals first
    const closeBtns = Array.from(document.querySelectorAll('button')).filter(b => {
        const txt = b.textContent?.trim().toLowerCase();
        return txt === 'done' || txt === 'cancel' || b.getAttribute('aria-label') === 'Close';
    });
    if (closeBtns.length > 0) {
        console.log(`⚠️ Closing ${closeBtns.length} open modal(s)...`);
        closeBtns.forEach(btn => {
            try { btn.click(); } catch(e) {}
        });
    }

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
                if (f.memoizedProps?.store?.dispatch) {
                    store = f.memoizedProps.store;
                    window.appStore = store;
                    break;
                }
                if (f.stateNode?.store?.dispatch) {
                    store = f.stateNode.store;
                    window.appStore = store;
                    break;
                }
                f = f.return;
            }
            if (store) break;
        }
    }

    if (!store) {
        console.error("❌ Redux store not found! Please make sure you are in the AppSheet editor.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }

    // 2. Find Schemas
    const appUserSchemaIdx = schemas.findIndex(s => s && (s.Name === 'AppUser' || s.TableName === 'AppUser' || s.Attributes?.some(a => a.Name === 'Email')));
    const surveySchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    if (appUserSchemaIdx === -1 || surveySchemaIdx === -1) {
        console.error("❌ Required schemas not found:", { appUserSchemaIdx, surveySchemaIdx, appVarSchemaIdx });
        return;
    }

    // 3. Inspect AppUser.District to grab the native BaseTypeQualifier
    const appUserAttrs = schemas[appUserSchemaIdx].Attributes;
    const districtAttr = appUserAttrs.find(a => a.Name === 'District');
    let baseQualifierStr = null;

    if (districtAttr?.TypeAuxData) {
        try {
            const dAux = JSON.parse(districtAttr.TypeAuxData);
            baseQualifierStr = dAux.BaseTypeQualifier || dAux.ElementTypeQualifier;
        } catch(e) {}
    }

    if (!baseQualifierStr) {
        const refTypeQual = JSON.stringify({
            MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
            IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
            Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
        });
        baseQualifierStr = JSON.stringify({
            ReferencedTableName: "AppVariables",
            ReferencedRootTableName: "AppVariables",
            ReferencedType: "Text",
            ReferencedTypeQualifier: refTypeQual,
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
    } else {
        try {
            const qObj = typeof baseQualifierStr === 'string' ? JSON.parse(baseQualifierStr) : baseQualifierStr;
            qObj.ReferencedTableName = "AppVariables";
            qObj.ReferencedRootTableName = "AppVariables";
            baseQualifierStr = JSON.stringify(qObj);
        } catch(e) {}
    }

    console.log("%c📌 Native BaseTypeQualifier loaded for AppVariables.", "color:#34a853;font-weight:bold;");

    const nameValueDict = {};

    // 4. Configure AppVariables: ID = Key, Label = Virtual Column with Multilingual IFS Formula
    if (appVarSchemaIdx !== -1) {
        const avAttrs = schemas[appVarSchemaIdx].Attributes;
        const labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), [Title_raj], TRUE, [Title_hi])';

        avAttrs.forEach((attr, aIdx) => {
            const p = `AppData.DataSchemas[${appVarSchemaIdx}].Attributes[${aIdx}]`;
            if (attr.Name === 'ID') {
                attr.IsKey = true;
                attr.IsLabel = false;
                nameValueDict[`${p}.IsKey`] = true;
                nameValueDict[`${p}.IsLabel`] = false;
            } else if (attr.Name === 'Label') {
                attr.IsKey = false;
                attr.IsLabel = true;
                attr.IsVirtual = true;
                attr.SourceColumn = null;
                attr.IsReadOnly = true;
                attr.Type = 'Text';
                attr.AppFormula = labelFormula;

                nameValueDict[`${p}.IsKey`] = false;
                nameValueDict[`${p}.IsLabel`] = true;
                nameValueDict[`${p}.IsVirtual`] = true;
                nameValueDict[`${p}.SourceColumn`] = null;
                nameValueDict[`${p}.IsReadOnly`] = true;
                nameValueDict[`${p}.Type`] = 'Text';
                nameValueDict[`${p}.AppFormula`] = labelFormula;
            } else {
                if (attr.IsLabel) {
                    attr.IsLabel = false;
                    nameValueDict[`${p}.IsLabel`] = false;
                }
            }
        });
        console.log("🔹 AppVariables configured: ID=Key, Label=Virtual Column (Multilingual formula).");
    }

    // 5. Complete Question Catalog (Single-select Enum & Multi-select EnumList)
    const QMAP = {
        // Section Status
        "Status_Profile": { "col": "Status_Profile", "qid": "Q_STAT_PROFILE", "is_multi": false },
        "Status_Operations": { "col": "Status_Operations", "qid": "Q_STAT_OPERATIONS", "is_multi": false },
        "Status_Challenges": { "col": "Status_Challenges", "qid": "Q_STAT_CHALLENGES", "is_multi": false },
        "Status_SchemeImpact": { "col": "Status_SchemeImpact", "qid": "Q_STAT_SCHEME", "is_multi": false },
        "Status_Digital": { "col": "Status_Digital", "qid": "Q_STAT_DIGITAL", "is_multi": false },
        "Status_PostExit": { "col": "Status_PostExit", "qid": "Q_STAT_POST_EXIT", "is_multi": false },

        // Section A: Basic Details
        "District": { "col": "District", "qid": "Q_A_01_00", "is_multi": false },
        "Block": { "col": "Block", "qid": "Q_A_02_00", "is_multi": false },
        "LeadershipRole": { "col": "LeadershipRole", "qid": "Q_A_09_00", "is_multi": false },
        "RelatedToCRP": { "col": "RelatedToCRP", "qid": "Q_A_11_00", "is_multi": false },
        "EPInterventionType": { "col": "EPInterventionType", "qid": "Q_A_12_00", "is_multi": false },
        "BusinessType": { "col": "BusinessType", "qid": "Q_A_16_00", "is_multi": true },
        "BusinessActivities": { "col": "BusinessActivities", "qid": "Q_A_17_00", "is_multi": true },

        // Section B: Respondent Profile
        "RespondentAge": { "col": "RespondentAge", "qid": "Q_B_01_00", "is_multi": false },
        "MaritalStatus": { "col": "MaritalStatus", "qid": "Q_B_02_00", "is_multi": false },
        "SocialCategory": { "col": "SocialCategory", "qid": "Q_B_03_00", "is_multi": false },
        "EducationStatus": { "col": "EducationStatus", "qid": "Q_B_04_00", "is_multi": false },
        "FamilyIncomeSources": { "col": "FamilyIncomeSources", "qid": "Q_B_07_00", "is_multi": true },
        "AnnualHouseholdIncome": { "col": "AnnualHouseholdIncome", "qid": "Q_B_08_00", "is_multi": false },

        // Section C: Enterprise Operations & Finance
        "ReasonsStartingBusiness": { "col": "ReasonsStartingBusiness", "qid": "Q_C_01_00", "is_multi": true },
        "BusinessCycle": { "col": "BusinessCycle", "qid": "Q_C_02_00", "is_multi": false },
        "BusinessPlaceType": { "col": "BusinessPlaceType", "qid": "Q_C_03_00", "is_multi": false },
        "LocationConvenience": { "col": "LocationConvenience", "qid": "Q_C_05_00", "is_multi": false },
        "Labor_Purchase_Involvement": { "col": "Labor_Purchase_Involvement", "qid": "Q_C_06_Purchase_INV", "is_multi": false },
        "Labor_Prod_Involvement": { "col": "Labor_Prod_Involvement", "qid": "Q_C_06_Prod_INV", "is_multi": false },
        "Labor_Serv_Involvement": { "col": "Labor_Serv_Involvement", "qid": "Q_C_06_Serv_INV", "is_multi": false },
        "Labor_Mktg_Involvement": { "col": "Labor_Mktg_Involvement", "qid": "Q_C_06_Mktg_INV", "is_multi": false },
        "Labor_Sale_Involvement": { "col": "Labor_Sale_Involvement", "qid": "Q_C_06_Sale_INV", "is_multi": false },
        "Labor_Record_Involvement": { "col": "Labor_Record_Involvement", "qid": "Q_C_06_Record_INV", "is_multi": false },
        "AnnualSalaryBill": { "col": "AnnualSalaryBill", "qid": "Q_C_07_00", "is_multi": false },
        "Sourcing_NearbyTown_Pct": { "col": "Sourcing_NearbyTown_Pct", "qid": "Q_C_08_NearbyTown", "is_multi": false },
        "Sourcing_Jaipur_Pct": { "col": "Sourcing_Jaipur_Pct", "qid": "Q_C_08_Jaipur", "is_multi": false },
        "Sourcing_OutsideState_Pct": { "col": "Sourcing_OutsideState_Pct", "qid": "Q_C_08_OutsideState", "is_multi": false },
        "Sourcing_Online_Pct": { "col": "Sourcing_Online_Pct", "qid": "Q_C_08_Online", "is_multi": false },
        "Sourcing_WhatsApp_Pct": { "col": "Sourcing_WhatsApp_Pct", "qid": "Q_C_08_WhatsApp", "is_multi": false },
        "MarketingMethods": { "col": "MarketingMethods", "qid": "Q_C_09_00", "is_multi": true },
        "SeasonalSalesMethod": { "col": "SeasonalSalesMethod", "qid": "Q_C_10_00", "is_multi": false },
        "SocialMediaForMarketing": { "col": "SocialMediaForMarketing", "qid": "Q_C_11_00", "is_multi": false },
        "SalesChannel_Online_Pct": { "col": "SalesChannel_Online_Pct", "qid": "Q_C_12_Online", "is_multi": false },
        "SalesChannel_WhatsApp_Pct": { "col": "SalesChannel_WhatsApp_Pct", "qid": "Q_C_12_WhatsApp", "is_multi": false },
        "SalesChannel_Instagram_Pct": { "col": "SalesChannel_Instagram_Pct", "qid": "Q_C_12_Instagram", "is_multi": false },
        "SalesChannel_Premise_Pct": { "col": "SalesChannel_Premise_Pct", "qid": "Q_C_12_Premise", "is_multi": false },
        "SalesChannel_Traders_Pct": { "col": "SalesChannel_Traders_Pct", "qid": "Q_C_12_Traders", "is_multi": false },
        "SalesChannel_Haat_Pct": { "col": "SalesChannel_Haat_Pct", "qid": "Q_C_12_Haat", "is_multi": false },
        "SalesChannel_Saras_Pct": { "col": "SalesChannel_Saras_Pct", "qid": "Q_C_12_Saras", "is_multi": false },
        "RecordKeepingHabit": { "col": "RecordKeepingHabit", "qid": "Q_C_13_00", "is_multi": false },
        "RecordKeepingMethod": { "col": "RecordKeepingMethod", "qid": "Q_C_14_00", "is_multi": false },
        "InitialStartCapital": { "col": "InitialStartCapital", "qid": "Q_C_16_00", "is_multi": false },
        "InitialCapitalArranged": { "col": "InitialCapitalArranged", "qid": "Q_C_17_00", "is_multi": false },
        "SHGAssociationAssistance": { "col": "SHGAssociationAssistance", "qid": "Q_C_18_00", "is_multi": true },
        "Cap_OwnSavings_Usage": { "col": "Cap_OwnSavings_Usage", "qid": "Q_C_20_OwnSavings_USE", "is_multi": false },
        "Cap_Family_Usage": { "col": "Cap_Family_Usage", "qid": "Q_C_20_Family_USE", "is_multi": false },
        "Cap_Profit_Usage": { "col": "Cap_Profit_Usage", "qid": "Q_C_20_Profit_USE", "is_multi": false },
        "Cap_MortgGold_Usage": { "col": "Cap_MortgGold_Usage", "qid": "Q_C_20_MortgGold_USE", "is_multi": false },
        "Cap_SoldGold_Usage": { "col": "Cap_SoldGold_Usage", "qid": "Q_C_20_SoldGold_USE", "is_multi": false },
        "Cap_FamLoan_Usage": { "col": "Cap_FamLoan_Usage", "qid": "Q_C_20_FamLoan_USE", "is_multi": false },
        "Cap_Moneylender_Usage": { "col": "Cap_Moneylender_Usage", "qid": "Q_C_20_Moneylender_USE", "is_multi": false },
        "Cap_SHGLoan_Usage": { "col": "Cap_SHGLoan_Usage", "qid": "Q_C_20_SHGLoan_USE", "is_multi": false },
        "Cap_OSFSVEPLoan_Usage": { "col": "Cap_OSFSVEPLoan_Usage", "qid": "Q_C_20_OSFSVEPLoan_USE", "is_multi": false },
        "Cap_OSFSubsidy_Usage": { "col": "Cap_OSFSubsidy_Usage", "qid": "Q_C_20_OSFSubsidy_USE", "is_multi": false },
        "Cap_PrivSaving_Usage": { "col": "Cap_PrivSaving_Usage", "qid": "Q_C_20_PrivSaving_USE", "is_multi": false },
        "Cap_NBFC_Usage": { "col": "Cap_NBFC_Usage", "qid": "Q_C_20_NBFC_USE", "is_multi": false },
        "Cap_Mudra_Usage": { "col": "Cap_Mudra_Usage", "qid": "Q_C_20_Mudra_USE", "is_multi": false },
        "Cap_BankLoan_Usage": { "col": "Cap_BankLoan_Usage", "qid": "Q_C_20_BankLoan_USE", "is_multi": false },
        "MonthlyIncomeIncreaseByOSFSVEP": { "col": "MonthlyIncomeIncreaseByOSFSVEP", "qid": "Q_C_21_00", "is_multi": false },
        "FinancialHelpFromIncome": { "col": "FinancialHelpFromIncome", "qid": "Q_C_23_00", "is_multi": true },

        // Section D: Ease of Doing Business
        "HusbandFamilyResponse": { "col": "HusbandFamilyResponse", "qid": "Q_D_01_00", "is_multi": true },
        "MaterialSourcingComfort": { "col": "MaterialSourcingComfort", "qid": "Q_D_02_00", "is_multi": false },
        "CustomerPaymentRecovery": { "col": "CustomerPaymentRecovery", "qid": "Q_D_03_00", "is_multi": false },
        "FundingExperience": { "col": "FundingExperience", "qid": "Q_D_04_00", "is_multi": true },
        "CurrentChallenges": { "col": "CurrentChallenges", "qid": "Q_D_05_00", "is_multi": true },

        // Section E: Scheme Impact
        "AttendedTraining": { "col": "AttendedTraining", "qid": "Q_E_01_00", "is_multi": false },
        "UsedTrainingComponent": { "col": "UsedTrainingComponent", "qid": "Q_E_03_00", "is_multi": false },
        "CRPContributions": { "col": "CRPContributions", "qid": "Q_E_06_00", "is_multi": true },
        "ExpectationsFromScheme": { "col": "ExpectationsFromScheme", "qid": "Q_E_07_00", "is_multi": false },

        // Section F: Online Transactions & Digital Media
        "SmartphoneOwnership": { "col": "SmartphoneOwnership", "qid": "Q_F_01_00", "is_multi": false },
        "UseQRUPI": { "col": "UseQRUPI", "qid": "Q_F_02_00", "is_multi": false },
        "QRDailyTransactions": { "col": "QRDailyTransactions", "qid": "Q_F_03_00", "is_multi": false },
        "QRNonUseReason": { "col": "QRNonUseReason", "qid": "Q_F_04_00", "is_multi": false },
        "SocialPlatformsUsed": { "col": "SocialPlatformsUsed", "qid": "Q_F_05_00", "is_multi": true },
        "SocialPlatformUsageMode": { "col": "SocialPlatformUsageMode", "qid": "Q_F_06_00", "is_multi": true },
        "SocialMediaFrequency": { "col": "SocialMediaFrequency", "qid": "Q_F_07_00", "is_multi": false },

        // Section G: Post-Exit
        "BusinessOperationalStatus": { "col": "BusinessOperationalStatus", "qid": "Q_G_02_00", "is_multi": false },
        "ScalingDownClosingReasons": { "col": "ScalingDownClosingReasons", "qid": "Q_G_03_00", "is_multi": true },
        "SupportNeededForSustenance": { "col": "SupportNeededForSustenance", "qid": "Q_G_04_00", "is_multi": true }
    };

    const surveyAttrs = schemas[surveySchemaIdx].Attributes;
    let singleCount = 0;
    let multiCount = 0;

    surveyAttrs.forEach((attr, idx) => {
        const colName = attr.Name;
        if (colName && QMAP[colName]) {
            const qInfo = QMAP[colName];
            const qId = qInfo.qid;
            const isMulti = qInfo.is_multi;
            const validIfFormula = `=SPLIT(LOOKUP("${qId}", "AppVariables", "ID", "VariableList"), " , ")`;
            const path = `AppData.DataSchemas[${surveySchemaIdx}].Attributes[${idx}]`;

            let typeAuxObj;
            if (isMulti) {
                // Multi-select EnumList with BaseType = Ref to AppVariables
                typeAuxObj = {
                    ItemSeparator: " , ",
                    EnumValues: [],
                    AllowOtherValues: false,
                    AutoCompleteOtherValues: true,
                    BaseType: "Ref",                 // MUST be set for Modern Editor UI
                    BaseTypeQualifier: baseQualifierStr, // MUST be set for Modern Editor UI
                    ElementType: "Ref",
                    ElementTypeQualifier: baseQualifierStr,
                    EnumInputMode: "Auto",
                    Valid_If: validIfFormula,
                    Error_Message_If_Invalid: null,
                    Show_If: null,
                    Required_If: null,
                    Editable_If: null,
                    Reset_If: null,
                    Suggested_Values: null
                };

                attr.Type = 'EnumList';
                attr.BaseType = 'Ref';
                attr.EnumListElementTypeName = 'Ref';
                attr.ReferencedTableName = 'AppVariables';
                attr.ReferencedRootTableName = 'AppVariables';

                nameValueDict[`${path}.Type`] = 'EnumList';
                nameValueDict[`${path}.BaseType`] = 'Ref';
                nameValueDict[`${path}.EnumListElementTypeName`] = 'Ref';
                nameValueDict[`${path}.ReferencedTableName`] = 'AppVariables';
                nameValueDict[`${path}.ReferencedRootTableName`] = 'AppVariables';
                multiCount++;
            } else {
                // Single-select Enum with BaseType = Ref to AppVariables
                typeAuxObj = {
                    EnumValues: [],
                    AllowOtherValues: false,
                    AutoCompleteOtherValues: true,
                    BaseType: "Ref",
                    BaseTypeQualifier: baseQualifierStr,
                    EnumInputMode: "Auto",
                    Valid_If: validIfFormula,
                    Error_Message_If_Invalid: null,
                    Show_If: null,
                    Required_If: null,
                    Editable_If: null,
                    Reset_If: null,
                    Suggested_Values: null
                };

                attr.Type = 'Enum';
                attr.BaseType = 'Ref';
                attr.EnumListElementTypeName = 'Ref';
                attr.ReferencedTableName = 'AppVariables';
                attr.ReferencedRootTableName = 'AppVariables';

                nameValueDict[`${path}.Type`] = 'Enum';
                nameValueDict[`${path}.BaseType`] = 'Ref';
                nameValueDict[`${path}.EnumListElementTypeName`] = 'Ref';
                nameValueDict[`${path}.ReferencedTableName`] = 'AppVariables';
                nameValueDict[`${path}.ReferencedRootTableName`] = 'AppVariables';
                singleCount++;
            }

            const typeAuxStr = JSON.stringify(typeAuxObj);

            // Mutate in-memory attribute object
            attr.TypeAuxData = typeAuxStr;
            attr.Valid_If = validIfFormula;
            attr.ValidIf = validIfFormula;
            attr.SuggestedValues = null;
            attr.EnumValues = [];

            // Set in Redux nameValueDict
            nameValueDict[`${path}.TypeAuxData`] = typeAuxStr;
            nameValueDict[`${path}.ValidIf`] = validIfFormula;
            nameValueDict[`${path}.Valid_If`] = validIfFormula;
            nameValueDict[`${path}.SuggestedValues`] = null;
            nameValueDict[`${path}.EnumValues`] = [];

            if (attr.MetaData) {
                attr.MetaData.Valid_If = validIfFormula;
                attr.MetaData.ValidIf = validIfFormula;
                nameValueDict[`${path}.MetaData.Valid_If`] = validIfFormula;
                nameValueDict[`${path}.MetaData.ValidIf`] = validIfFormula;
            }
        }
    });

    console.log(`🎯 Prepared ${singleCount} Single-select (Enum Ref) and ${multiCount} Multi-select (EnumList Ref) columns.`);

    // 6. Dispatch batch update to AppSheet Redux store
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    // 7. Trigger calculation & Light up SAVE button
    try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch(e) {}

    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    // 8. Verify result directly from store state
    const postState = store.getState();
    const postSchemas = (postState.appTemplate?.history?.[0]?.appTemplate || postState.appTemplate?.current)?.AppData?.DataSchemas;
    const postSurvey = postSchemas?.[surveySchemaIdx];
    const postAppVar = postSchemas?.[appVarSchemaIdx];

    const postBlock = postSurvey?.Attributes?.find(a => a.Name === 'Block');
    const postBizType = postSurvey?.Attributes?.find(a => a.Name === 'BusinessType');
    const postLabel = postAppVar?.Attributes?.find(a => a.Name === 'Label');

    let postBizAux = {};
    try { postBizAux = JSON.parse(postBizType?.TypeAuxData || "{}"); } catch(e) {}

    console.log("%c=======================================================", "color:#4285f4;font-weight:bold;");
    console.log(`%c🎉 VERIFICATION COMPLETE!`, "color:#34a853;font-size:16px;font-weight:bold;");
    console.log("📋 1. Block (Single-select):", {
        Type: postBlock?.Type,
        BaseType: postBlock?.BaseType,
        RefTable: postBlock?.ReferencedTableName,
        ValidIf: postBlock?.Valid_If || postBlock?.ValidIf
    });
    console.log("📋 2. BusinessType (Multi-select):", {
        Type: postBizType?.Type,
        BaseType: postBizType?.BaseType,
        TypeAux_BaseType: postBizAux?.BaseType,
        RefTable: postBizType?.ReferencedTableName,
        ValidIf: postBizType?.Valid_If || postBizType?.ValidIf
    });
    console.log("📋 3. AppVariables.Label (Multilingual):", {
        Name: postLabel?.Name,
        IsLabel: postLabel?.IsLabel,
        IsVirtual: postLabel?.IsVirtual,
        AppFormula: postLabel?.AppFormula
    });
    console.log("%c👉 CLICK THE BLUE 'SAVE' BUTTON (TOP-RIGHT) IN APPSHEET NOW!", "color:#ea4335;font-size:18px;font-weight:bold;");
    console.log("%c=======================================================", "color:#4285f4;font-weight:bold;");
})();
