import json

# Define all Show_If rules
show_if_rules = {}

# 1. Capital sources (14 sources)
capital_sources = {
    "OwnSavings": "My savings",
    "Family": "Support from family",
    "Profit": "Profit from existing business",
    "MortgagingGold": "Mortgaging gold",
    "MortgGold": "Mortgaging gold",
    "SoldGold": "Selling gold",
    "FamLoan": "Loan from family/friends",
    "Moneylender": "Loan from moneylender",
    "SHGLoan": "Loan from SHG",
    "OSFSVEPLoan": "Loan from OSF / SVEP",
    "OSFSubsidy": "Subsidy from OSF / SVEP",
    "PrivSaving": "Private savings / Chit fund",
    "NBFC": "Loan from NBFC",
    "Mudra": "MUDRA Loan",
    "BankLoan": "Bank Loan"
}

suffixes = ["Yr1", "Mid", "Cur", "Pending", "Usage"]

for key, option_name in capital_sources.items():
    for s in suffixes:
        col = f"Cap_{key}_{s}"
        formula = f'IN("{option_name}", [InitialCapitalArranged])'
        show_if_rules[col] = formula

# 2. Labor matrix (6 activities)
labor_activities = ["Purchase", "Prod", "Serv", "Mktg", "Sale", "Record"]

for act in labor_activities:
    inv_col = f"Labor_{act}_Involvement"
    fam_col = f"Labor_{act}_FamilyCount"
    hired_col = f"Labor_{act}_HiredCount"
    amt_col = f"Labor_{act}_AmountPaid"
    
    show_if_rules[fam_col] = f'IN([{inv_col}], LIST("Only Family", "Both Family and Hired"))'
    show_if_rules[hired_col] = f'IN([{inv_col}], LIST("Only Hired", "Both Family and Hired"))'
    show_if_rules[amt_col] = f'IN([{inv_col}], LIST("Only Hired", "Both Family and Hired"))'

# 3. Financial Help from Income
for f in ["EducationAmt", "DebtsAmt", "AssetsAmt", "MarriageAmt"]:
    show_if_rules[f"FinancialHelp_{f}"] = '[FinancialHelpFromIncome] = "Yes"'

# 4. Other dependent questions
dependent_rules = {
    "BusinessActivitiesOther": 'IN("Other", [BusinessActivities])',
    "BusinessCycleOther": '[BusinessCycle] = "Other"',
    "LocationConvenienceOther": '[LocationConvenience] = "Other"',
    "MarketingMethodsOther": 'IN("Other", [MarketingMethods])',
    "SeasonalSalesOnlinePlatform": '[SeasonalSalesMethod] = "Online Platforms"',
    "SeasonalSalesOther": '[SeasonalSalesMethod] = "Other"',
    "SocialMediaForMarketingOther": '[SocialMediaForMarketing] = "Other"',
    "RecordKeepingOther": '[RecordKeepingMethod] = "Other"',
    "TrainingDetails": '[AttendedTraining] = "Yes"',
    "UsedTrainingDetails": '[UsedTrainingComponent] = "Yes"',
    "QRNonUseReason": '[UseQRUPI] = "No"',
    "QRDailyTransactions": '[UseQRUPI] = "Yes"',
    "SocialPlatformUsageMode": 'NOT(ISBLANK([SocialPlatformsUsed]))',
    "SocialMediaFrequency": 'NOT(ISBLANK([SocialPlatformsUsed]))',
    "BusinessClosureYear": '[BusinessOperationalStatus] = "Closed"',
    "ScalingDownClosingReasons": 'IN([BusinessOperationalStatus], LIST("Closed", "Scaled Down"))',
    "ScalingDownOtherReason": 'IN("Other", [ScalingDownClosingReasons])',
    "SupportNeededOther": 'IN("Other", [SupportNeededForSustenance])'
}

show_if_rules.update(dependent_rules)

# 5. Section Headers
header_columns = {
    "SEC_A_HEADER": 'LOOKUP("SEC_A_HEADER", "AppVariables", "ID", "Label")',
    "SEC_B_HEADER": 'LOOKUP("SEC_B_HEADER", "AppVariables", "ID", "Label")',
    "SEC_C_HEADER": 'LOOKUP("SEC_C_HEADER", "AppVariables", "ID", "Label")',
    "SEC_D_HEADER": 'LOOKUP("SEC_D_HEADER", "AppVariables", "ID", "Label")',
    "SEC_E_HEADER": 'LOOKUP("SEC_E_HEADER", "AppVariables", "ID", "Label")',
    "SEC_F_HEADER": 'LOOKUP("SEC_F_HEADER", "AppVariables", "ID", "Label")',
    "SEC_G_HEADER": 'LOOKUP("SEC_G_HEADER", "AppVariables", "ID", "Label")'
}

js_template = """// ==============================================================================
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
    const SHOW_IF_RULES = __SHOW_IF_RULES__;
    const HEADER_COLUMNS = __HEADER_COLUMNS__;

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
"""

js_code = js_template.replace("__SHOW_IF_RULES__", json.dumps(show_if_rules, indent=4))
js_code = js_code.replace("__HEADER_COLUMNS__", json.dumps(header_columns, indent=4))

out_js_path = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\scripts\inject_showif_and_section_wizard.js"
with open(out_js_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print(f"✅ Generated {out_js_path} with {len(show_if_rules)} Show_If rules and {len(header_columns)} headers!")
