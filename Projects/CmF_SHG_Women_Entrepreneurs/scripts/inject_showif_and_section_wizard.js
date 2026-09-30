// ==============================================================================
// OmmNoMi AppSheet Survey Engine: Bulk Show_If & Section Headers Injector
// Protocol: Modern Editor Redux State Dispatch (Rule A4)
// Synchronized MetaData, TypeAuxData, and Visibility
// ==============================================================================
(function configureSurveyUI() {
    console.log("🚀 Starting OmmNoMi Survey UI Automation...");

    // 1. Locate Store
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
        console.error("❌ Redux store not found! Please make sure AppSheet Editor is open.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate;
    const schemas = historyItem?.AppData?.DataSchemas || state.appTemplate?.current?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }

    // Locate Survey Schema dynamically
    let schemaIdx = 1;
    if (!schemas[schemaIdx] || !schemas[schemaIdx].Attributes?.some(a => a.Name === 'Cap_OSFSVEPLoan_Pending' || a.Name === 'Status_Profile')) {
        schemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Cap_OSFSVEPLoan_Pending' || a.Name === 'Status_Profile'));
    }

    if (schemaIdx === -1 || !schemas[schemaIdx]) {
        console.error("❌ Survey schema not found in DataSchemas!");
        return;
    }

    const attrs = schemas[schemaIdx].Attributes;
    console.log(`✅ Located Survey Schema at DataSchemas[${schemaIdx}] with ${attrs.length} attributes.`);

    // Rules Definitions
    const SHOW_IF_RULES = {
    "Cap_OwnSavings_Yr1": "IN(\"My savings\", [InitialCapitalArranged])",
    "Cap_OwnSavings_Mid": "IN(\"My savings\", [InitialCapitalArranged])",
    "Cap_OwnSavings_Cur": "IN(\"My savings\", [InitialCapitalArranged])",
    "Cap_OwnSavings_Pending": "IN(\"My savings\", [InitialCapitalArranged])",
    "Cap_OwnSavings_Usage": "IN(\"My savings\", [InitialCapitalArranged])",
    "Cap_Family_Yr1": "IN(\"Support from family\", [InitialCapitalArranged])",
    "Cap_Family_Mid": "IN(\"Support from family\", [InitialCapitalArranged])",
    "Cap_Family_Cur": "IN(\"Support from family\", [InitialCapitalArranged])",
    "Cap_Family_Pending": "IN(\"Support from family\", [InitialCapitalArranged])",
    "Cap_Family_Usage": "IN(\"Support from family\", [InitialCapitalArranged])",
    "Cap_Profit_Yr1": "IN(\"Profit from existing business\", [InitialCapitalArranged])",
    "Cap_Profit_Mid": "IN(\"Profit from existing business\", [InitialCapitalArranged])",
    "Cap_Profit_Cur": "IN(\"Profit from existing business\", [InitialCapitalArranged])",
    "Cap_Profit_Pending": "IN(\"Profit from existing business\", [InitialCapitalArranged])",
    "Cap_Profit_Usage": "IN(\"Profit from existing business\", [InitialCapitalArranged])",
    "Cap_MortgagingGold_Yr1": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgagingGold_Mid": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgagingGold_Cur": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgagingGold_Pending": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgagingGold_Usage": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgGold_Yr1": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgGold_Mid": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgGold_Cur": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgGold_Pending": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_MortgGold_Usage": "IN(\"Mortgaging gold\", [InitialCapitalArranged])",
    "Cap_SoldGold_Yr1": "IN(\"Selling gold\", [InitialCapitalArranged])",
    "Cap_SoldGold_Mid": "IN(\"Selling gold\", [InitialCapitalArranged])",
    "Cap_SoldGold_Cur": "IN(\"Selling gold\", [InitialCapitalArranged])",
    "Cap_SoldGold_Pending": "IN(\"Selling gold\", [InitialCapitalArranged])",
    "Cap_SoldGold_Usage": "IN(\"Selling gold\", [InitialCapitalArranged])",
    "Cap_FamLoan_Yr1": "IN(\"Loan from family/friends\", [InitialCapitalArranged])",
    "Cap_FamLoan_Mid": "IN(\"Loan from family/friends\", [InitialCapitalArranged])",
    "Cap_FamLoan_Cur": "IN(\"Loan from family/friends\", [InitialCapitalArranged])",
    "Cap_FamLoan_Pending": "IN(\"Loan from family/friends\", [InitialCapitalArranged])",
    "Cap_FamLoan_Usage": "IN(\"Loan from family/friends\", [InitialCapitalArranged])",
    "Cap_Moneylender_Yr1": "IN(\"Loan from moneylender\", [InitialCapitalArranged])",
    "Cap_Moneylender_Mid": "IN(\"Loan from moneylender\", [InitialCapitalArranged])",
    "Cap_Moneylender_Cur": "IN(\"Loan from moneylender\", [InitialCapitalArranged])",
    "Cap_Moneylender_Pending": "IN(\"Loan from moneylender\", [InitialCapitalArranged])",
    "Cap_Moneylender_Usage": "IN(\"Loan from moneylender\", [InitialCapitalArranged])",
    "Cap_SHGLoan_Yr1": "IN(\"Loan from SHG\", [InitialCapitalArranged])",
    "Cap_SHGLoan_Mid": "IN(\"Loan from SHG\", [InitialCapitalArranged])",
    "Cap_SHGLoan_Cur": "IN(\"Loan from SHG\", [InitialCapitalArranged])",
    "Cap_SHGLoan_Pending": "IN(\"Loan from SHG\", [InitialCapitalArranged])",
    "Cap_SHGLoan_Usage": "IN(\"Loan from SHG\", [InitialCapitalArranged])",
    "Cap_OSFSVEPLoan_Yr1": "IN(\"Loan from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSVEPLoan_Mid": "IN(\"Loan from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSVEPLoan_Cur": "IN(\"Loan from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSVEPLoan_Pending": "IN(\"Loan from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSVEPLoan_Usage": "IN(\"Loan from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSubsidy_Yr1": "IN(\"Subsidy from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSubsidy_Mid": "IN(\"Subsidy from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSubsidy_Cur": "IN(\"Subsidy from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSubsidy_Pending": "IN(\"Subsidy from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_OSFSubsidy_Usage": "IN(\"Subsidy from OSF / SVEP\", [InitialCapitalArranged])",
    "Cap_PrivSaving_Yr1": "IN(\"Private savings / Chit fund\", [InitialCapitalArranged])",
    "Cap_PrivSaving_Mid": "IN(\"Private savings / Chit fund\", [InitialCapitalArranged])",
    "Cap_PrivSaving_Cur": "IN(\"Private savings / Chit fund\", [InitialCapitalArranged])",
    "Cap_PrivSaving_Pending": "IN(\"Private savings / Chit fund\", [InitialCapitalArranged])",
    "Cap_PrivSaving_Usage": "IN(\"Private savings / Chit fund\", [InitialCapitalArranged])",
    "Cap_NBFC_Yr1": "IN(\"Loan from NBFC\", [InitialCapitalArranged])",
    "Cap_NBFC_Mid": "IN(\"Loan from NBFC\", [InitialCapitalArranged])",
    "Cap_NBFC_Cur": "IN(\"Loan from NBFC\", [InitialCapitalArranged])",
    "Cap_NBFC_Pending": "IN(\"Loan from NBFC\", [InitialCapitalArranged])",
    "Cap_NBFC_Usage": "IN(\"Loan from NBFC\", [InitialCapitalArranged])",
    "Cap_Mudra_Yr1": "IN(\"MUDRA Loan\", [InitialCapitalArranged])",
    "Cap_Mudra_Mid": "IN(\"MUDRA Loan\", [InitialCapitalArranged])",
    "Cap_Mudra_Cur": "IN(\"MUDRA Loan\", [InitialCapitalArranged])",
    "Cap_Mudra_Pending": "IN(\"MUDRA Loan\", [InitialCapitalArranged])",
    "Cap_Mudra_Usage": "IN(\"MUDRA Loan\", [InitialCapitalArranged])",
    "Cap_BankLoan_Yr1": "IN(\"Bank Loan\", [InitialCapitalArranged])",
    "Cap_BankLoan_Mid": "IN(\"Bank Loan\", [InitialCapitalArranged])",
    "Cap_BankLoan_Cur": "IN(\"Bank Loan\", [InitialCapitalArranged])",
    "Cap_BankLoan_Pending": "IN(\"Bank Loan\", [InitialCapitalArranged])",
    "Cap_BankLoan_Usage": "IN(\"Bank Loan\", [InitialCapitalArranged])",
    "Labor_Purchase_FamilyCount": "IN([Labor_Purchase_Involvement], LIST(\"Only Family\", \"Both Family and Hired\"))",
    "Labor_Purchase_HiredCount": "IN([Labor_Purchase_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Purchase_AmountPaid": "IN([Labor_Purchase_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Prod_FamilyCount": "IN([Labor_Prod_Involvement], LIST(\"Only Family\", \"Both Family and Hired\"))",
    "Labor_Prod_HiredCount": "IN([Labor_Prod_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Prod_AmountPaid": "IN([Labor_Prod_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Serv_FamilyCount": "IN([Labor_Serv_Involvement], LIST(\"Only Family\", \"Both Family and Hired\"))",
    "Labor_Serv_HiredCount": "IN([Labor_Serv_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Serv_AmountPaid": "IN([Labor_Serv_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Mktg_FamilyCount": "IN([Labor_Mktg_Involvement], LIST(\"Only Family\", \"Both Family and Hired\"))",
    "Labor_Mktg_HiredCount": "IN([Labor_Mktg_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Mktg_AmountPaid": "IN([Labor_Mktg_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Sale_FamilyCount": "IN([Labor_Sale_Involvement], LIST(\"Only Family\", \"Both Family and Hired\"))",
    "Labor_Sale_HiredCount": "IN([Labor_Sale_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Sale_AmountPaid": "IN([Labor_Sale_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Record_FamilyCount": "IN([Labor_Record_Involvement], LIST(\"Only Family\", \"Both Family and Hired\"))",
    "Labor_Record_HiredCount": "IN([Labor_Record_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "Labor_Record_AmountPaid": "IN([Labor_Record_Involvement], LIST(\"Only Hired\", \"Both Family and Hired\"))",
    "FinancialHelp_EducationAmt": "[FinancialHelpFromIncome] = \"Yes\"",
    "FinancialHelp_DebtsAmt": "[FinancialHelpFromIncome] = \"Yes\"",
    "FinancialHelp_AssetsAmt": "[FinancialHelpFromIncome] = \"Yes\"",
    "FinancialHelp_MarriageAmt": "[FinancialHelpFromIncome] = \"Yes\"",
    "BusinessActivitiesOther": "IN(\"Other\", [BusinessActivities])",
    "BusinessCycleOther": "[BusinessCycle] = \"Other\"",
    "LocationConvenienceOther": "[LocationConvenience] = \"Other\"",
    "MarketingMethodsOther": "IN(\"Other\", [MarketingMethods])",
    "SeasonalSalesOnlinePlatform": "[SeasonalSalesMethod] = \"Online Platforms\"",
    "SeasonalSalesOther": "[SeasonalSalesMethod] = \"Other\"",
    "SocialMediaForMarketingOther": "[SocialMediaForMarketing] = \"Other\"",
    "RecordKeepingOther": "[RecordKeepingMethod] = \"Other\"",
    "TrainingDetails": "[AttendedTraining] = \"Yes\"",
    "UsedTrainingDetails": "[UsedTrainingComponent] = \"Yes\"",
    "QRNonUseReason": "[UseQRUPI] = \"No\"",
    "QRDailyTransactions": "[UseQRUPI] = \"Yes\"",
    "SocialPlatformUsageMode": "NOT(ISBLANK([SocialPlatformsUsed]))",
    "SocialMediaFrequency": "NOT(ISBLANK([SocialPlatformsUsed]))",
    "BusinessClosureYear": "[BusinessOperationalStatus] = \"Closed\"",
    "ScalingDownClosingReasons": "IN([BusinessOperationalStatus], LIST(\"Closed\", \"Scaled Down\"))",
    "ScalingDownOtherReason": "IN(\"Other\", [ScalingDownClosingReasons])",
    "SupportNeededOther": "IN(\"Other\", [SupportNeededForSustenance])"
};
    const HEADER_COLUMNS = {
    "SEC_A_HEADER": "LOOKUP(\"SEC_A_HEADER\", \"AppVariables\", \"ID\", \"Label\")",
    "SEC_B_HEADER": "LOOKUP(\"SEC_B_HEADER\", \"AppVariables\", \"ID\", \"Label\")",
    "SEC_C_HEADER": "LOOKUP(\"SEC_C_HEADER\", \"AppVariables\", \"ID\", \"Label\")",
    "SEC_D_HEADER": "LOOKUP(\"SEC_D_HEADER\", \"AppVariables\", \"ID\", \"Label\")",
    "SEC_E_HEADER": "LOOKUP(\"SEC_E_HEADER\", \"AppVariables\", \"ID\", \"Label\")",
    "SEC_F_HEADER": "LOOKUP(\"SEC_F_HEADER\", \"AppVariables\", \"ID\", \"Label\")",
    "SEC_G_HEADER": "LOOKUP(\"SEC_G_HEADER\", \"AppVariables\", \"ID\", \"Label\")"
};

    const nameValueDict = {};
    let showIfCount = 0;
    let headerCount = 0;

    attrs.forEach((attr, idx) => {
        const colName = attr.Name;
        if (!colName) return;

        const path = `AppData.DataSchemas[${schemaIdx}].Attributes[${idx}]`;
        const meta = attr.MetaData ? JSON.parse(JSON.stringify(attr.MetaData)) : {};

        // 1. Configure Header Columns
        if (HEADER_COLUMNS[colName]) {
            const formula = HEADER_COLUMNS[colName];
            meta.Category = 'Page_Header';
            nameValueDict[`${path}.Type`] = 'Show';
            nameValueDict[`${path}.Category`] = 'Page_Header';
            nameValueDict[`${path}.ShowCategory`] = 'Page_Header';
            nameValueDict[`${path}.DisplayName`] = formula;
            nameValueDict[`${path}.AppFormula`] = formula;
            nameValueDict[`${path}.TypeAuxData`] = JSON.stringify(meta);
            headerCount++;
        }

        // 2. Configure Show_If Rules
        if (SHOW_IF_RULES[colName]) {
            const formula = SHOW_IF_RULES[colName];
            const showIfFormula = formula.startsWith('=') ? formula : '=' + formula;
            meta.Show_If = showIfFormula;
            nameValueDict[`${path}.MetaData.Show_If`] = showIfFormula;
            nameValueDict[`${path}.TypeAuxData`] = JSON.stringify(meta);
            nameValueDict[`${path}.Visibility`] = 'EXPRESSION';
            showIfCount++;
        }
    });

    console.log(`📊 Prepared ${headerCount} Section Headers and ${showIfCount} Show_If rules.`);
    console.log(`🚀 Dispatching batch update with ${Object.keys(nameValueDict).length} properties to Redux store...`);

    // Dispatch batch update to AppSheet Redux store
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    // Trigger emulator recompute
    try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch(e) {}

    // Light up the native blue SAVE button
    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log(`🎉 100% SUCCESS!`);
    console.log(`   - ${headerCount} Section Headers configured as Page_Header!`);
    console.log(`   - ${showIfCount} Matrix columns configured with progressive Show_If!`);
    console.log("👉 Now click the top-right blue 'SAVE' button in AppSheet to commit to the cloud!");
})();
