(function setSurveyDisplayNames() {
  try {
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length && !store; i++) {
        var keys = Object.keys(els[i]);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].startsWith('__reactFiber')) {
            var f = els[i][keys[k]];
            while (f && !store) {
              if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                store = f.memoizedProps.store;
              }
              f = f.return;
            }
            break;
          }
        }
      }
    }
    if (!store) { console.error('[FAIL] Redux store not found'); return; }

    var state = store.getState();
    var schemas = state.appTemplate.history[0].appTemplate.AppData.DataSchemas;
    
    // Find ONLY the Survey schema
    var surveyIdx = -1;
    for (var si = 0; si < schemas.length; si++) {
      if (schemas[si].Name === 'Survey_Schema' || schemas[si].TableName === 'Survey') {
        surveyIdx = si;
        break;
      }
    }
    if (surveyIdx === -1) { console.error('[FAIL] Survey schema not found'); return; }
    console.log('[OK] Found Survey table at schema index: ' + surveyIdx);

    var attrs = schemas[surveyIdx].Attributes;
    var nameToAttrIdx = {};
    for (var ai = 0; ai < attrs.length; ai++) {
      nameToAttrIdx[attrs[ai].Name] = ai;
    }

    var colMap = {"District": "Q_A_01_00", "Block": "Q_A_02_00", "VillageGP": "Q_A_03_00", "RespondentName": "Q_A_04_00", "RespondentPhone": "Q_A_04_01_PHONE", "ContactNumber": "Q_A_04_01", "SHGName": "Q_A_05_00", "VOName": "Q_A_06_00", "CLFName": "Q_A_07_00", "SHGMembershipYears": "Q_A_08_00", "LeadershipRole": "Q_A_09_00", "LeadershipYears": "Q_A_10_00", "RelatedToCRP": "Q_A_11_00", "EPInterventionType": "Q_A_12_00", "EnterpriseName": "Q_A_13_00", "ParallelEnterpriseName": "Q_A_13_01", "EnterpriseSetupYear": "Q_A_14_00", "BusinessType": "Q_A_16_00", "BusinessActivities": "Q_A_17_00", "BusinessActivitiesOther": "Q_A_17_01", "LoanReceivedYear": "Q_A_15_00", "MaintainSeparateRecords": "Q_A_18_00", "RegistrationsDocuments": "Q_A_19_00", "RespondentAge": "Q_B_01_00", "MaritalStatus": "Q_B_02_00", "SocialCategory": "Q_B_03_00", "EducationStatus": "Q_B_04_00", "FamilyMemberCount": "Q_B_05_00", "SubTable_FamilyCount": "Q_B_05", "FamilyAdultsCount": "Q_B_06_01", "FamilyChildrenCount": "Q_B_06_02", "FamilyTotalEarning": "Q_B_06_03", "FamilyMaleEarning": "Q_B_06_04", "FamilyFemaleEarning": "Q_B_06_05", "FamilyDisabledCount": "Q_B_06_06", "FamilyIncomeSources": "Q_B_07_00", "AnnualHouseholdIncome": "Q_B_08_00", "ReasonsStartingBusiness": "Q_C_01_00", "BusinessCycle": "Q_C_02_00", "BusinessCycleOther": "Q_C_02_01", "BusinessPlaceType": "Q_C_03_00", "AnnualRent": "Q_C_04_00", "MonthlyRent": "Q_C_04_00_MRENT", "LocationConvenience": "Q_C_05_00", "LocationConvenienceOther": "Q_C_05_01", "Related_Q6_Labor": "Q_C_06_00", "Sourcing_NearbyTown_Pct": "Q_C_07_01", "Sourcing_Jaipur_Pct": "Q_C_07_02", "Sourcing_OutsideState_Pct": "Q_C_07_03", "Sourcing_Online_Pct": "Q_C_07_04", "MaterialSourcingPct": "Q_C_08_00_SUMMARY", "MarketingMethods": "Q_C_08_00", "MarketingMethodsOther": "Q_C_08_01", "SeasonalSalesMethod": "Q_C_09_00", "SeasonalSalesOnlinePlatform": "Q_C_09_01", "SeasonalSalesOther": "Q_C_09_02", "SalesChannelsPct": "Q_C_12_00_SUMMARY", "SalesChannel_Online_Pct": "Q_C_10_01", "SalesChannel_WhatsApp_Pct": "Q_C_10_02", "SalesChannel_Instagram_Pct": "Q_C_10_03", "SalesChannel_Premise_Pct": "Q_C_10_04", "SalesChannel_Traders_Pct": "Q_C_10_05", "SalesChannel_Haat_Pct": "Q_C_10_06", "SalesChannel_Saras_Pct": "Q_C_10_07", "RecordKeepingHabit": "Q_C_11_00", "RecordKeepingMethod": "Q_C_12_00", "RecordKeepingOther": "Q_C_12_01", "Related_Q15_Turnover": "Q_C_13_00", "SHGAssociationAssistance": "Q_D_01_00", "Related_Q19_Capital": "Q_D_02_00", "Related_Q20_Loan_Usage": "Q_D_03_00", "FundingExperience": "Q_D_04_00", "Related_Q22_Trajectory": "Q_D_05_00", "FinancialHelpFromIncome": "Q_D_06_00", "FinancialHelp_EducationAmt": "Q_D_06_ED", "FinancialHelp_DebtsAmt": "Q_D_06_DB", "FinancialHelp_AssetsAmt": "Q_D_06_AS", "FinancialHelp_MarriageAmt": "Q_D_06_MR", "DebtRepaidAmount": "Q_D_06_DB", "AssetsAcquiredAmount": "Q_D_06_AS", "MarriageExpensesAmount": "Q_D_06_MR", "HusbandFamilyResponse": "Q_E_01_00", "MaterialSourcingComfort": "Q_E_02_00", "CustomerPaymentRecovery": "Q_E_03_00", "CurrentChallenges": "Q_E_04_00", "Challenge_OSFPhasedOutAmt": "Q_E_04_01", "Challenge_ScaleUpFundAmt": "Q_E_04_02", "Challenge_TimelyInputsAmt": "Q_E_04_03", "Challenge_Other": "Q_E_04_04", "Competitors_Similar_Scale": "Q_D_06_01", "Competitors_Smaller_Scale": "Q_D_06_02", "Competitors_Higher_Scale": "Q_D_06_03", "CompetitorAdvantages": "Q_E_06_00", "FutureExpansionPlans": "Q_F_01_00", "AspirationBottlenecks": "Q_D_09_00_BOTTLENECK", "FutureFundsRequired": "Q_F_03_00", "AttendedTraining": "Q_G_01_00", "TrainingDetails": "Q_G_02_00", "UsedTrainingComponent": "Q_G_03_00", "UsedTrainingDetails": "Q_G_04_00", "MonthlyIncomeBeforeLoan": "Q_G_05_01", "MonthlyIncomeAfterLoan": "Q_G_05_02", "MonthlyIncomeIncreaseByOSFSVEP": "Q_G_06_00", "CRPContributions": "Q_G_07_00", "ExpectationsFromScheme": "Q_G_08_00", "Other_Specify": "Q_G_08_01", "SmartphoneOwnership": "Q_H_01_00", "UseQRUPI": "Q_H_02_00", "QRDailyTransactions": "Q_H_03_00", "QRNonUseReason": "Q_H_04_00", "SocialMediaForMarketing": "Q_H_05_00", "SocialPlatformsUsed": "Q_H_06_00", "SocialPlatformUsageMode": "Q_H_07_00", "SocialMediaFrequency": "Q_H_08_00", "OSFInterventionYear": "Q_I_01_00", "BusinessOperationalStatus": "Q_I_02_00", "ScalingDownClosingReasons": "Q_I_03_00", "ScalingDownOtherReason": "Q_I_03_01", "SupportNeededForSustenance": "Q_I_04_00", "SupportNeededOther": "Q_I_04_01"};
    var nameValueDict = {};
    var count = 0;

    for (var colName in colMap) {
      if (nameToAttrIdx[colName] !== undefined) {
        var aIdx = nameToAttrIdx[colName];
        var qid = colMap[colName];
        var formula = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';
        var key = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + aIdx + '].DisplayName';
        nameValueDict[key] = formula;
        count++;
      }
    }

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log('[OK] Successfully set DisplayName = LOOKUP(..., "Label") for ' + count + ' Survey columns!');
    console.log('[OK] ONLY Survey table updated. Click SAVE now!');
  } catch(e) {
    console.error('[ERROR]', e.message);
  }
})();