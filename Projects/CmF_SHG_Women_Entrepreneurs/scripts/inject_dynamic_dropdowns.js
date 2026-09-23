// =========================================================================
// OmmNoMi Survey Engine: Bulk Dynamic Multilingual Dropdown Injector (Redux)
// =========================================================================
(function makeAllDropdownsDynamic() {
    console.log("🚀 Starting Dynamic Multilingual Dropdown Injection...");

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
    let surveySchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    if (surveySchemaIdx === -1) {
        console.error("❌ Survey schema not found!");
        return;
    }

    // Locate AppVariables Schema dynamically
    let appVarSchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    console.log(`✅ Located Survey Schema at DataSchemas[${surveySchemaIdx}]`);
    if (appVarSchemaIdx !== -1) {
        console.log(`✅ Located AppVariables Schema at DataSchemas[${appVarSchemaIdx}]`);
    }

    const nameValueDict = {};

    // 2. Ensure AppVariables.Label has dynamic multilingual formula
    if (appVarSchemaIdx !== -1) {
        const avAttrs = schemas[appVarSchemaIdx].Attributes;
        const labelIdx = avAttrs.findIndex(a => a.Name === 'Label');
        if (labelIdx !== -1) {
            const labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), [Title_raj], TRUE, [Title_hi])';
            nameValueDict[`AppData.DataSchemas[${appVarSchemaIdx}].Attributes[${labelIdx}].AppFormula`] = labelFormula;
            nameValueDict[`AppData.DataSchemas[${appVarSchemaIdx}].Attributes[${labelIdx}].IsLabel`] = true;
            console.log("🔹 AppVariables.Label dynamic formula queued.");
        }
    }

    // 3. Mapped Survey Dropdown Columns (Column -> Option Column in AppVariables)
    const columnToOptCol = {
    "Status_Profile": "SectionStatus",
    "Status_Operations": "SectionStatus",
    "Status_Challenges": "SectionStatus",
    "Status_SchemeImpact": "SectionStatus",
    "Status_Digital": "SectionStatus",
    "Status_PostExit": "SectionStatus",
    "District": "District",
    "Block": "Block",
    "LeadershipRole": "YesNo",
    "RelatedToCRP": "YesNo",
    "EPInterventionType": "InterventionType",
    "BusinessType": "BusinessType",
    "BusinessActivities": "Activity",
    "RespondentAge": "AgeCohort",
    "MaritalStatus": "MaritalStatus",
    "SocialCategory": "Caste",
    "EducationStatus": "Education",
    "FamilyIncomeSources": "IncomeSource",
    "AnnualHouseholdIncome": "AnnualIncomeBracket",
    "ReasonsStartingBusiness": "ReasonStarting",
    "BusinessCycle": "BusinessCycle",
    "BusinessPlaceType": "BusinessPlace",
    "LocationConvenience": "LocationConvenience",
    "Labor_Purchase_Involvement": "InvolvementLevel",
    "Labor_Prod_Involvement": "InvolvementLevel",
    "Labor_Serv_Involvement": "InvolvementLevel",
    "Labor_Mktg_Involvement": "InvolvementLevel",
    "Labor_Sale_Involvement": "InvolvementLevel",
    "Labor_Record_Involvement": "InvolvementLevel",
    "AnnualSalaryBill": "SalaryBill",
    "Sourcing_NearbyTown_Pct": "PercentageLevel",
    "Sourcing_Jaipur_Pct": "PercentageLevel",
    "Sourcing_OutsideState_Pct": "PercentageLevel",
    "Sourcing_Online_Pct": "PercentageLevel",
    "Sourcing_WhatsApp_Pct": "PercentageLevel",
    "MarketingMethods": "MarketingMethod",
    "SeasonalSalesMethod": "SeasonalSalesMethod",
    "SocialMediaForMarketing": "SocialMediaForMarketing",
    "SalesChannel_Online_Pct": "PercentageLevel",
    "SalesChannel_WhatsApp_Pct": "PercentageLevel",
    "SalesChannel_Instagram_Pct": "PercentageLevel",
    "SalesChannel_Premise_Pct": "PercentageLevel",
    "SalesChannel_Traders_Pct": "PercentageLevel",
    "SalesChannel_Haat_Pct": "PercentageLevel",
    "SalesChannel_Saras_Pct": "PercentageLevel",
    "RecordKeepingHabit": "RecordKeepingHabit",
    "RecordKeepingMethod": "RecordKeepingMethod",
    "InitialCapitalArranged": "InitialCapitalSource",
    "SHGAssociationAssistance": "SHGAssistance",
    "Cap_OwnSavings_Usage": "LoanUsagePurpose",
    "Cap_Family_Usage": "LoanUsagePurpose",
    "Cap_Profit_Usage": "LoanUsagePurpose",
    "Cap_MortgGold_Usage": "LoanUsagePurpose",
    "Cap_SoldGold_Usage": "LoanUsagePurpose",
    "Cap_FamLoan_Usage": "LoanUsagePurpose",
    "Cap_Moneylender_Usage": "LoanUsagePurpose",
    "Cap_SHGLoan_Usage": "LoanUsagePurpose",
    "Cap_OSFSVEPLoan_Usage": "LoanUsagePurpose",
    "Cap_OSFSubsidy_Usage": "LoanUsagePurpose",
    "Cap_PrivSaving_Usage": "LoanUsagePurpose",
    "Cap_NBFC_Usage": "LoanUsagePurpose",
    "Cap_Mudra_Usage": "LoanUsagePurpose",
    "Cap_BankLoan_Usage": "LoanUsagePurpose",
    "MonthlyIncomeIncreaseByOSFSVEP": "IncomeIncreaseBracket",
    "FinancialHelpFromIncome": "FinancialHelpImpact",
    "HusbandFamilyResponse": "FamilySupportResponse",
    "MaterialSourcingComfort": "SourcingComfort",
    "CustomerPaymentRecovery": "DebtRecoveryStatus",
    "FundingExperience": "FundingExperience",
    "CurrentChallenges": "BusinessChallenge",
    "AttendedTraining": "YesNo",
    "UsedTrainingComponent": "YesNo",
    "CRPContributions": "CRPContribution",
    "SmartphoneOwnership": "PhoneAccess",
    "UseQRUPI": "YesNo",
    "QRDailyTransactions": "QRCount",
    "QRNonUseReason": "QRNonReason",
    "SocialPlatformsUsed": "SocialPlatform",
    "SocialPlatformUsageMode": "SocialUsageMode",
    "SocialMediaFrequency": "SocialFrequency",
    "BusinessOperationalStatus": "BusinessOperationalStatus",
    "ScalingDownClosingReasons": "ClosingReason",
    "SupportNeededForSustenance": "SupportNeeded"
};

    const surveyAttrs = schemas[surveySchemaIdx].Attributes;
    let matchedCount = 0;

    surveyAttrs.forEach((attr, idx) => {
        const colName = attr.Name;
        if (colName && columnToOptCol[colName]) {
            const optCol = columnToOptCol[colName];
            
            // Dynamic Trilingual Suggested Values Formula
            const formula = `=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English")), SELECT(AppVariables[Title], [Column] = "${optCol}"), IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani")), SELECT(AppVariables[Title_raj], [Column] = "${optCol}"), TRUE, SELECT(AppVariables[Title_hi], [Column] = "${optCol}"))`;
            
            // Set Suggested_Values (SuggestedValues attribute in AppSheet Redux)
            nameValueDict[`AppData.DataSchemas[${surveySchemaIdx}].Attributes[${idx}].SuggestedValues`] = formula;
            matchedCount++;
        }
    });

    console.log(`🚀 Prepared ${matchedCount} dynamic dropdown formulas for Survey columns.`);
    console.log(`📦 Total Redux updates queued: ${Object.keys(nameValueDict).length}`);

    // 4. Dispatch to Redux Store
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    // 5. Trigger calculation & Light up SAVE button
    try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch(e) {}

    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log("✅ SUCCESS! All dropdowns are now dynamic & multilingual.");
    console.log("👉 Now click the blue 'SAVE' button in AppSheet Editor!");
})();
