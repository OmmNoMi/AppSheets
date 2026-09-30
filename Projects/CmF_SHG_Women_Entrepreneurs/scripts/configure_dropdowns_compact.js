// =========================================================================
// OmmNoMi: Configure ALL 83 Multilingual Dropdowns & Disable Other Values
// =========================================================================
(function configureAllMultilingualDropdowns() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Initializing Multilingual Dropdown Engine for ALL Survey Questions...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // Close any open modals
    document.querySelectorAll('button').forEach(b => {
        const txt = b.textContent?.trim().toLowerCase();
        if (txt === 'done' || txt === 'cancel' || b.getAttribute('aria-label') === 'Close') {
            try { b.click(); } catch(e) {}
        }
    });

    // Locate Redux Store
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
        console.error("❌ Redux store nahi mila! Kripya AppSheet editor me run karein.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;
    if (!schemas) { console.error("❌ DataSchemas nahi mile!"); return; }

    const surveySchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    if (surveySchemaIdx === -1) { console.error("❌ Survey table schema nahi mila!"); return; }

    const refTypeQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const baseQualifierStr = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedRootTableName: "AppVariables", ReferencedType: "Text", ReferencedTypeQualifier: refTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: false, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });

    const nameValueDict = {};

    // 1. AppVariables: ID = Key, Label = Virtual Column
    if (appVarSchemaIdx !== -1) {
        const avAttrs = schemas[appVarSchemaIdx].Attributes;
        const labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), [Title_raj], TRUE, [Title_hi])';
        avAttrs.forEach((attr, aIdx) => {
            const p = `AppData.DataSchemas[${appVarSchemaIdx}].Attributes[${aIdx}]`;
            if (attr.Name === 'ID') {
                attr.IsKey = true; attr.IsLabel = false;
                nameValueDict[`${p}.IsKey`] = true; nameValueDict[`${p}.IsLabel`] = false;
            } else if (attr.Name === 'Label') {
                attr.IsKey = false; attr.IsLabel = true; attr.IsVirtual = true; attr.SourceColumn = null; attr.IsReadOnly = true; attr.Type = 'Text'; attr.AppFormula = labelFormula;
                nameValueDict[`${p}.IsKey`] = false; nameValueDict[`${p}.IsLabel`] = true; nameValueDict[`${p}.IsVirtual`] = true; nameValueDict[`${p}.SourceColumn`] = null; nameValueDict[`${p}.IsReadOnly`] = true; nameValueDict[`${p}.Type`] = 'Text'; nameValueDict[`${p}.AppFormula`] = labelFormula;
            } else if (attr.IsLabel) {
                attr.IsLabel = false; nameValueDict[`${p}.IsLabel`] = false;
            }
        });
    }

    // 2. All 83 Dropdown Questions Map: [QID, isMulti]
    const QMAP = {
        "Status_Profile": ["Q_STAT_PROFILE", false], "Status_Operations": ["Q_STAT_OPERATIONS", false], "Status_Challenges": ["Q_STAT_CHALLENGES", false], "Status_SchemeImpact": ["Q_STAT_SCHEME", false], "Status_Digital": ["Q_STAT_DIGITAL", false], "Status_PostExit": ["Q_STAT_POST_EXIT", false],
        "District": ["Q_A_01_00", false], "Block": ["Q_A_02_00", false], "LeadershipRole": ["Q_A_09_00", false], "RelatedToCRP": ["Q_A_11_00", false], "EPInterventionType": ["Q_A_12_00", false], "BusinessType": ["Q_A_16_00", true], "BusinessActivities": ["Q_A_17_00", true],
        "RespondentAge": ["Q_B_01_00", false], "MaritalStatus": ["Q_B_02_00", false], "SocialCategory": ["Q_B_03_00", false], "EducationStatus": ["Q_B_04_00", false], "FamilyIncomeSources": ["Q_B_07_00", true], "AnnualHouseholdIncome": ["Q_B_08_00", false],
        "ReasonsStartingBusiness": ["Q_C_01_00", true], "BusinessCycle": ["Q_C_02_00", false], "BusinessPlaceType": ["Q_C_03_00", false], "LocationConvenience": ["Q_C_05_00", false],
        "Labor_Purchase_Involvement": ["Q_C_06_Purchase_INV", false], "Labor_Prod_Involvement": ["Q_C_06_Prod_INV", false], "Labor_Serv_Involvement": ["Q_C_06_Serv_INV", false], "Labor_Mktg_Involvement": ["Q_C_06_Mktg_INV", false], "Labor_Sale_Involvement": ["Q_C_06_Sale_INV", false], "Labor_Record_Involvement": ["Q_C_06_Record_INV", false],
        "AnnualSalaryBill": ["Q_C_07_00", false], "Sourcing_NearbyTown_Pct": ["Q_C_08_NearbyTown", false], "Sourcing_Jaipur_Pct": ["Q_C_08_Jaipur", false], "Sourcing_OutsideState_Pct": ["Q_C_08_OutsideState", false], "Sourcing_Online_Pct": ["Q_C_08_Online", false], "Sourcing_WhatsApp_Pct": ["Q_C_08_WhatsApp", false],
        "MarketingMethods": ["Q_C_09_00", true], "SeasonalSalesMethod": ["Q_C_10_00", false], "SocialMediaForMarketing": ["Q_C_11_00", false],
        "SalesChannel_Online_Pct": ["Q_C_12_Online", false], "SalesChannel_WhatsApp_Pct": ["Q_C_12_WhatsApp", false], "SalesChannel_Instagram_Pct": ["Q_C_12_Instagram", false], "SalesChannel_Premise_Pct": ["Q_C_12_Premise", false], "SalesChannel_Traders_Pct": ["Q_C_12_Traders", false], "SalesChannel_Haat_Pct": ["Q_C_12_Haat", false], "SalesChannel_Saras_Pct": ["Q_C_12_Saras", false],
        "RecordKeepingHabit": ["Q_C_13_00", false], "RecordKeepingMethod": ["Q_C_14_00", false], "InitialCapitalArranged": ["Q_C_17_00", false], "SHGAssociationAssistance": ["Q_C_18_00", true],
        "Cap_OwnSavings_Usage": ["Q_C_20_OwnSavings_USE", false], "Cap_Family_Usage": ["Q_C_20_Family_USE", false], "Cap_Profit_Usage": ["Q_C_20_Profit_USE", false], "Cap_MortgGold_Usage": ["Q_C_20_MortgGold_USE", false], "Cap_SoldGold_Usage": ["Q_C_20_SoldGold_USE", false], "Cap_FamLoan_Usage": ["Q_C_20_FamLoan_USE", false], "Cap_Moneylender_Usage": ["Q_C_20_Moneylender_USE", false], "Cap_SHGLoan_Usage": ["Q_C_20_SHGLoan_USE", false], "Cap_OSFSVEPLoan_Usage": ["Q_C_20_OSFSVEPLoan_USE", false], "Cap_OSFSubsidy_Usage": ["Q_C_20_OSFSubsidy_USE", false], "Cap_PrivSaving_Usage": ["Q_C_20_PrivSaving_USE", false], "Cap_NBFC_Usage": ["Q_C_20_NBFC_USE", false], "Cap_Mudra_Usage": ["Q_C_20_Mudra_USE", false], "Cap_BankLoan_Usage": ["Q_C_20_BankLoan_USE", false],
        "MonthlyIncomeIncreaseByOSFSVEP": ["Q_C_21_00", false], "FinancialHelpFromIncome": ["Q_C_23_00", true],
        "HusbandFamilyResponse": ["Q_D_01_00", true], "MaterialSourcingComfort": ["Q_D_02_00", false], "CustomerPaymentRecovery": ["Q_D_03_00", false], "FundingExperience": ["Q_D_04_00", true], "CurrentChallenges": ["Q_D_05_00", true],
        "AttendedTraining": ["Q_E_01_00", false], "UsedTrainingComponent": ["Q_E_03_00", false], "CRPContributions": ["Q_E_06_00", true],
        "SmartphoneOwnership": ["Q_F_01_00", false], "UseQRUPI": ["Q_F_02_00", false], "QRDailyTransactions": ["Q_F_03_00", false], "QRNonUseReason": ["Q_F_04_00", false], "SocialPlatformsUsed": ["Q_F_05_00", true], "SocialPlatformUsageMode": ["Q_F_06_00", true], "SocialMediaFrequency": ["Q_F_07_00", false],
        "BusinessOperationalStatus": ["Q_G_02_00", false], "ScalingDownClosingReasons": ["Q_G_03_00", true], "SupportNeededForSustenance": ["Q_G_04_00", true]
    };

    const surveyAttrs = schemas[surveySchemaIdx].Attributes;
    let countConfigured = 0;

    surveyAttrs.forEach((attr, idx) => {
        const p = `AppData.DataSchemas[${surveySchemaIdx}].Attributes[${idx}]`;
        const colName = attr.Name;

        if (colName && QMAP[colName]) {
            const [qid, isMulti] = QMAP[colName];
            const targetType = isMulti ? 'EnumList' : 'Enum';
            const dnFormula = `=LOOKUP("${qid}", "AppVariables", "ID", "Label")`;
            const validIf = (colName === 'Block') 
                ? '=SELECT(AppVariables[ID], AND([Column] = "Block", [Description] = [_THISROW].[District]))'
                : `=SPLIT(LOOKUP("${qid}", "AppVariables", "ID", "VariableList"), " , ")`;

            attr.Type = targetType;
            attr.BaseType = "Ref";
            attr.ReferencedTableName = "AppVariables";
            attr.ReferencedRootTableName = "AppVariables";
            attr.DisplayName = dnFormula;
            attr.Valid_If = validIf;
            attr.ValidIf = validIf;
            attr.EnumValues = [];

            let auxObj = {};
            if (attr.TypeAuxData) {
                try { auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData }; } catch(e) {}
            }

            auxObj.BaseType = "Ref";
            auxObj.ReferencedTableName = "AppVariables";
            auxObj.BaseTypeQualifier = baseQualifierStr;
            auxObj.AllowOtherValues = false;
            auxObj.AutoCompleteOtherValues = false;
            auxObj.EnumValues = [];
            auxObj.Valid_If = validIf;
            auxObj.EnumInputMode = "Auto";
            auxObj.UseDropdown = true;

            if (isMulti) {
                auxObj.ElementType = "Ref";
                auxObj.ElementTypeQualifier = baseQualifierStr;
                auxObj.ItemSeparator = " , ";
                attr.EnumListElementTypeName = "Ref";
                nameValueDict[`${p}.EnumListElementTypeName`] = "Ref";
            }

            const auxStr = JSON.stringify(auxObj);
            attr.TypeAuxData = auxStr;

            nameValueDict[`${p}.Type`] = targetType;
            nameValueDict[`${p}.BaseType`] = "Ref";
            nameValueDict[`${p}.ReferencedTableName`] = "AppVariables";
            nameValueDict[`${p}.ReferencedRootTableName`] = "AppVariables";
            nameValueDict[`${p}.DisplayName`] = dnFormula;
            nameValueDict[`${p}.TypeAuxData`] = auxStr;
            nameValueDict[`${p}.Valid_If`] = validIf;
            nameValueDict[`${p}.ValidIf`] = validIf;

            countConfigured++;
        } else if (attr.Type === 'Enum' || attr.Type === 'EnumList') {
            // Global lock on other values
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

    console.log(`%c⚡ Configured ${countConfigured} multilingual dropdowns. Other values strictly disabled across all columns.`, "color:#34a853;font-weight:bold;");

    // Dispatch batch to Redux
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log("%c🎉 [OmmNoMi] 100% SUCCESS! Click the native 'SAVE' button in the top right corner now!", "color:#34a853;font-size:16px;font-weight:bold;");
})();
