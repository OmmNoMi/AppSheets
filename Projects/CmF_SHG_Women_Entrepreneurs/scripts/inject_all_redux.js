// OmmNoMi AppSheet Survey Display Name Auto-Injector via Redux
(function injectAllDisplayNames() {
    // 1. Locate Store (with automatic Fiber fallback)
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

    // 227 Survey Column to QuestionID mappings
    const M = {"Status_Profile":"Q_STAT_PROFILE","Status_Operations":"Q_STAT_OPERATIONS","Status_Challenges":"Q_STAT_CHALLENGES","Status_SchemeImpact":"Q_STAT_SCHEME","Status_Digital":"Q_STAT_DIGITAL","Status_PostExit":"Q_STAT_POST_EXIT","District":"Q_A_01_00","Block":"Q_A_02_00","VillageGP":"Q_A_03_00","RespondentName":"Q_A_04_00","ContactNumber":"Q_A_04_01","SHGName":"Q_A_05_00","VOName":"Q_A_06_00","CLFName":"Q_A_07_00","SHGMembershipYears":"Q_A_08_00","LeadershipRole":"Q_A_09_00","LeadershipYears":"Q_A_10_00","RelatedToCRP":"Q_A_11_00","EPInterventionType":"Q_A_12_00","EnterpriseName":"Q_A_13_00","ParallelEnterpriseName":"Q_A_13_01","EnterpriseSetupYear":"Q_A_14_00","LoanReceivedYear":"Q_A_15_00","BusinessType":"Q_A_16_00","BusinessActivities":"Q_A_17_00","BusinessActivitiesOther":"Q_A_17_01","RespondentAge":"Q_B_01_00","MaritalStatus":"Q_B_02_00","SocialCategory":"Q_B_03_00","EducationStatus":"Q_B_04_00","FamilyMemberCount":"Q_B_05_00","FamilyAdultsCount":"Q_B_06_01","FamilyChildrenCount":"Q_B_06_02","FamilyTotalEarning":"Q_B_06_03","FamilyMaleEarning":"Q_B_06_04","FamilyFemaleEarning":"Q_B_06_05","FamilyDisabledCount":"Q_B_06_06","FamilyIncomeSources":"Q_B_07_00","AnnualHouseholdIncome":"Q_B_08_00","ReasonsStartingBusiness":"Q_C_01_00","BusinessCycle":"Q_C_02_00","BusinessCycleOther":"Q_C_02_01","BusinessPlaceType":"Q_C_03_00","AnnualRent":"Q_C_04_00","LocationConvenience":"Q_C_05_00","LocationConvenienceOther":"Q_C_05_01","Labor_Purchase_Involvement":"Q_C_06_Purchase_INV","Labor_Purchase_FamilyCount":"Q_C_06_Purchase_FAM","Labor_Purchase_HiredCount":"Q_C_06_Purchase_HIRED","Labor_Purchase_AmountPaid":"Q_C_06_Purchase_AMT","Labor_Prod_Involvement":"Q_C_06_Prod_INV","Labor_Prod_FamilyCount":"Q_C_06_Prod_FAM","Labor_Prod_HiredCount":"Q_C_06_Prod_HIRED","Labor_Prod_AmountPaid":"Q_C_06_Prod_AMT","Labor_Serv_Involvement":"Q_C_06_Serv_INV","Labor_Serv_FamilyCount":"Q_C_06_Serv_FAM","Labor_Serv_HiredCount":"Q_C_06_Serv_HIRED","Labor_Serv_AmountPaid":"Q_C_06_Serv_AMT","Labor_Mktg_Involvement":"Q_C_06_Mktg_INV","Labor_Mktg_FamilyCount":"Q_C_06_Mktg_FAM","Labor_Mktg_HiredCount":"Q_C_06_Mktg_HIRED","Labor_Mktg_AmountPaid":"Q_C_06_Mktg_AMT","Labor_Sale_Involvement":"Q_C_06_Sale_INV","Labor_Sale_FamilyCount":"Q_C_06_Sale_FAM","Labor_Sale_HiredCount":"Q_C_06_Sale_HIRED","Labor_Sale_AmountPaid":"Q_C_06_Sale_AMT","Labor_Record_Involvement":"Q_C_06_Record_INV","Labor_Record_FamilyCount":"Q_C_06_Record_FAM","Labor_Record_HiredCount":"Q_C_06_Record_HIRED","Labor_Record_AmountPaid":"Q_C_06_Record_AMT","AnnualSalaryBill":"Q_C_07_00","Sourcing_NearbyTown_Pct":"Q_C_08_NearbyTown","Sourcing_Jaipur_Pct":"Q_C_08_Jaipur","Sourcing_OutsideState_Pct":"Q_C_08_OutsideState","Sourcing_Online_Pct":"Q_C_08_Online","Sourcing_WhatsApp_Pct":"Q_C_08_WhatsApp","MarketingMethods":"Q_C_09_00","MarketingMethodsOther":"Q_C_09_01","SeasonalSalesMethod":"Q_C_10_00","SeasonalSalesOnlinePlatform":"Q_C_10_01","SeasonalSalesOther":"Q_C_10_02","SocialMediaForMarketing":"Q_C_11_00","SocialMediaForMarketingOther":"Q_C_11_01","SalesChannel_Online_Pct":"Q_C_12_Online","SalesChannel_WhatsApp_Pct":"Q_C_12_WhatsApp","SalesChannel_Instagram_Pct":"Q_C_12_Instagram","SalesChannel_Premise_Pct":"Q_C_12_Premise","SalesChannel_Traders_Pct":"Q_C_12_Traders","SalesChannel_Haat_Pct":"Q_C_12_Haat","SalesChannel_Saras_Pct":"Q_C_12_Saras","RecordKeepingHabit":"Q_C_13_00","RecordKeepingMethod":"Q_C_14_00","RecordKeepingOther":"Q_C_14_01","Turnover_Peak_Months":"Q_C_15_Peak_MTH","Turnover_Peak_Sales":"Q_C_15_Peak_SALES","Turnover_Peak_Profit":"Q_C_15_Peak_PROFIT","Turnover_Avg_Months":"Q_C_15_Avg_MTH","Turnover_Avg_Sales":"Q_C_15_Avg_SALES","Turnover_Avg_Profit":"Q_C_15_Avg_PROFIT","Turnover_Lean_Months":"Q_C_15_Lean_MTH","Turnover_Lean_Sales":"Q_C_15_Lean_SALES","Turnover_Lean_Profit":"Q_C_15_Lean_PROFIT","InitialStartCapital":"Q_C_16_00","InitialCapitalArranged":"Q_C_17_00","SHGAssociationAssistance":"Q_C_18_00","Cap_OwnSavings_Yr1":"Q_C_19_OwnSavings_YR1","Cap_OwnSavings_Mid":"Q_C_19_OwnSavings_MID","Cap_OwnSavings_Cur":"Q_C_19_OwnSavings_CUR","Cap_OwnSavings_Pending":"Q_C_19_OwnSavings_PEN","Cap_OwnSavings_Usage":"Q_C_20_OwnSavings_USE","Cap_Family_Yr1":"Q_C_19_Family_YR1","Cap_Family_Mid":"Q_C_19_Family_MID","Cap_Family_Cur":"Q_C_19_Family_CUR","Cap_Family_Pending":"Q_C_19_Family_PEN","Cap_Family_Usage":"Q_C_20_Family_USE","Cap_Profit_Yr1":"Q_C_19_Profit_YR1","Cap_Profit_Mid":"Q_C_19_Profit_MID","Cap_Profit_Cur":"Q_C_19_Profit_CUR","Cap_Profit_Pending":"Q_C_19_Profit_PEN","Cap_Profit_Usage":"Q_C_20_Profit_USE","Cap_MortgGold_Yr1":"Q_C_19_MortgGold_YR1","Cap_MortgGold_Mid":"Q_C_19_MortgGold_MID","Cap_MortgGold_Cur":"Q_C_19_MortgGold_CUR","Cap_MortgGold_Pending":"Q_C_19_MortgGold_PEN","Cap_MortgGold_Usage":"Q_C_20_MortgGold_USE","Cap_SoldGold_Yr1":"Q_C_19_SoldGold_YR1","Cap_SoldGold_Mid":"Q_C_19_SoldGold_MID","Cap_SoldGold_Cur":"Q_C_19_SoldGold_CUR","Cap_SoldGold_Pending":"Q_C_19_SoldGold_PEN","Cap_SoldGold_Usage":"Q_C_20_SoldGold_USE","Cap_FamLoan_Yr1":"Q_C_19_FamLoan_YR1","Cap_FamLoan_Mid":"Q_C_19_FamLoan_MID","Cap_FamLoan_Cur":"Q_C_19_FamLoan_CUR","Cap_FamLoan_Pending":"Q_C_19_FamLoan_PEN","Cap_FamLoan_Usage":"Q_C_20_FamLoan_USE","Cap_Moneylender_Yr1":"Q_C_19_Moneylender_YR1","Cap_Moneylender_Mid":"Q_C_19_Moneylender_MID","Cap_Moneylender_Cur":"Q_C_19_Moneylender_CUR","Cap_Moneylender_Pending":"Q_C_19_Moneylender_PEN","Cap_Moneylender_Usage":"Q_C_20_Moneylender_USE","Cap_SHGLoan_Yr1":"Q_C_19_SHGLoan_YR1","Cap_SHGLoan_Mid":"Q_C_19_SHGLoan_MID","Cap_SHGLoan_Cur":"Q_C_19_SHGLoan_CUR","Cap_SHGLoan_Pending":"Q_C_19_SHGLoan_PEN","Cap_SHGLoan_Usage":"Q_C_20_SHGLoan_USE","Cap_OSFSVEPLoan_Yr1":"Q_C_19_OSFSVEPLoan_YR1","Cap_OSFSVEPLoan_Mid":"Q_C_19_OSFSVEPLoan_MID","Cap_OSFSVEPLoan_Cur":"Q_C_19_OSFSVEPLoan_CUR","Cap_OSFSVEPLoan_Pending":"Q_C_19_OSFSVEPLoan_PEN","Cap_OSFSVEPLoan_Usage":"Q_C_20_OSFSVEPLoan_USE","Cap_OSFSubsidy_Yr1":"Q_C_19_OSFSubsidy_YR1","Cap_OSFSubsidy_Mid":"Q_C_19_OSFSubsidy_MID","Cap_OSFSubsidy_Cur":"Q_C_19_OSFSubsidy_CUR","Cap_OSFSubsidy_Pending":"Q_C_19_OSFSubsidy_PEN","Cap_OSFSubsidy_Usage":"Q_C_20_OSFSubsidy_USE","Cap_PrivSaving_Yr1":"Q_C_19_PrivSaving_YR1","Cap_PrivSaving_Mid":"Q_C_19_PrivSaving_MID","Cap_PrivSaving_Cur":"Q_C_19_PrivSaving_CUR","Cap_PrivSaving_Pending":"Q_C_19_PrivSaving_PEN","Cap_PrivSaving_Usage":"Q_C_20_PrivSaving_USE","Cap_NBFC_Yr1":"Q_C_19_NBFC_YR1","Cap_NBFC_Mid":"Q_C_19_NBFC_MID","Cap_NBFC_Cur":"Q_C_19_NBFC_CUR","Cap_NBFC_Pending":"Q_C_19_NBFC_PEN","Cap_NBFC_Usage":"Q_C_20_NBFC_USE","Cap_Mudra_Yr1":"Q_C_19_Mudra_YR1","Cap_Mudra_Mid":"Q_C_19_Mudra_MID","Cap_Mudra_Cur":"Q_C_19_Mudra_CUR","Cap_Mudra_Pending":"Q_C_19_Mudra_PEN","Cap_Mudra_Usage":"Q_C_20_Mudra_USE","Cap_BankLoan_Yr1":"Q_C_19_BankLoan_YR1","Cap_BankLoan_Mid":"Q_C_19_BankLoan_MID","Cap_BankLoan_Cur":"Q_C_19_BankLoan_CUR","Cap_BankLoan_Pending":"Q_C_19_BankLoan_PEN","Cap_BankLoan_Usage":"Q_C_20_BankLoan_USE","MonthlyIncomeIncreaseByOSFSVEP":"Q_C_21_00","Trajectory_Sales_Yr1":"Q_C_22_Sales_YR1","Trajectory_Sales_Cur":"Q_C_22_Sales_CUR","Trajectory_Income_Yr1":"Q_C_22_Income_YR1","Trajectory_Income_Cur":"Q_C_22_Income_CUR","Trajectory_TradeStock_Yr1":"Q_C_22_TradeStock_YR1","Trajectory_TradeStock_Cur":"Q_C_22_TradeStock_CUR","Trajectory_ProdInputs_Yr1":"Q_C_22_ProdInputs_YR1","Trajectory_ProdInputs_Cur":"Q_C_22_ProdInputs_CUR","Trajectory_ProdFinished_Yr1":"Q_C_22_ProdFinished_YR1","Trajectory_ProdFinished_Cur":"Q_C_22_ProdFinished_CUR","Trajectory_ServAssets_Yr1":"Q_C_22_ServAssets_YR1","Trajectory_ServAssets_Cur":"Q_C_22_ServAssets_CUR","FinancialHelpFromIncome":"Q_C_23_00","FinancialHelp_EducationAmt":"Q_C_23_01","FinancialHelp_DebtsAmt":"Q_C_23_02","FinancialHelp_AssetsAmt":"Q_C_23_03","FinancialHelp_MarriageAmt":"Q_C_23_04","HusbandFamilyResponse":"Q_D_01_00","MaterialSourcingComfort":"Q_D_02_00","CustomerPaymentRecovery":"Q_D_03_00","FundingExperience":"Q_D_04_00","CurrentChallenges":"Q_D_05_00","Challenge_OSFPhasedOutAmt":"Q_D_05_01","Challenge_ScaleUpFundAmt":"Q_D_05_02","Challenge_RenovationFundAmt":"Q_D_05_03","Challenge_TimelyInputsAmt":"Q_D_05_04","Challenge_InventoryHelpAmt":"Q_D_05_05","Challenge_Other":"Q_D_05_06","AttendedTraining":"Q_E_01_00","TrainingDetails":"Q_E_02_00","UsedTrainingComponent":"Q_E_03_00","UsedTrainingDetails":"Q_E_04_00","MonthlyIncomeBeforeLoan":"Q_E_05_01","MonthlyIncomeAfterLoan":"Q_E_05_02","CRPContributions":"Q_E_06_00","CRPContributionDocDetails":"Q_E_06_01","ExpectationsFromScheme":"Q_E_07_00","SmartphoneOwnership":"Q_F_01_00","UseQRUPI":"Q_F_02_00","QRDailyTransactions":"Q_F_03_00","QRNonUseReason":"Q_F_04_00","SocialPlatformsUsed":"Q_F_05_00","SocialPlatformUsageMode":"Q_F_06_00","SocialMediaFrequency":"Q_F_07_00","OSFInterventionYear":"Q_G_01_00","BusinessOperationalStatus":"Q_G_02_00","BusinessClosureYear":"Q_G_02_01","ScalingDownClosingReasons":"Q_G_03_00","ScalingDownOtherReason":"Q_G_03_01","SupportNeededForSustenance":"Q_G_04_00","SupportNeededOther":"Q_G_04_01"};

    const nameValueDict = {};
    let matchedCount = 0;

    attrs.forEach((attr, idx) => {
        const colName = attr.Name;
        if (colName && M[colName]) {
            const qId = M[colName];
            const formula = `LOOKUP("${qId}", "AppVariables", "ID", "Label")`;
            const key = `AppData.DataSchemas[${schemaIdx}].Attributes[${idx}].DisplayName`;
            nameValueDict[key] = formula;
            matchedCount++;
        }
    });

    console.log(`🚀 Prepared ${matchedCount} Display Name formulas. Dispatching to Redux...`);
    const firstKey = Object.keys(nameValueDict)[0];
    console.log("Sample entry:", firstKey, "=>", nameValueDict[firstKey]);

    // 1. Dispatch batch update to AppSheet Redux store
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    // 2. Trigger calculation & Light up the SAVE button
    try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch(e) {}

    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log(`🎉 100% SUCCESS! Dispatched ${matchedCount} Display Name formulas directly to Redux!`);
    console.log("👉 Now look at the top-right blue 'SAVE' button in AppSheet and click it to save permanently to the cloud!");
})();
