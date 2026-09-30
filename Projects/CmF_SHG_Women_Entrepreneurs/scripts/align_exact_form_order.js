(function alignExactFormOrder() {
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
    if (!store) { console.error('[FAIL] Redux store not accessible'); return; }
    console.log('[OK] Redux store found');

    var state = store.getState();
    var controls = state.appTemplate.history[0].appTemplate.Presentation.Controls;
    var sectionOrders = {"Survey_Form_SecA": ["District", "Block", "VillageGP", "RespondentName", "ContactNumber", "SHGName", "VOName", "CLFName", "SHGMembershipYears", "LeadershipRole", "LeadershipYears", "RelatedToCRP", "EPInterventionType", "EnterpriseName", "ParallelEnterpriseName", "EnterpriseSetupYear", "BusinessType", "BusinessActivities", "BusinessActivitiesOther", "LoanReceivedYear", "MaintainSeparateRecords", "RegistrationsDocuments"], "Survey_Form_SecB": ["RespondentAge", "MaritalStatus", "SocialCategory", "EducationStatus", "FamilyMemberCount", "SubTable_FamilyCount", "FamilyAdultsCount", "FamilyChildrenCount", "FamilyTotalEarning", "FamilyMaleEarning", "FamilyFemaleEarning", "FamilyDisabledCount", "FamilyIncomeSources", "AnnualHouseholdIncome"], "Survey_Form_SecC": ["ReasonsStartingBusiness", "BusinessCycle", "BusinessCycleOther", "BusinessPlaceType", "AnnualRent", "LocationConvenience", "LocationConvenienceOther", "Related_Q6_Labor", "Sourcing_NearbyTown_Pct", "Sourcing_Jaipur_Pct", "Sourcing_OutsideState_Pct", "Sourcing_Online_Pct", "MarketingMethods", "MarketingMethodsOther", "SeasonalSalesMethod", "SeasonalSalesOnlinePlatform", "SeasonalSalesOther", "SalesChannel_Online_Pct", "SalesChannel_WhatsApp_Pct", "SalesChannel_Instagram_Pct", "SalesChannel_Premise_Pct", "SalesChannel_Traders_Pct", "SalesChannel_Haat_Pct", "SalesChannel_Saras_Pct", "RecordKeepingHabit", "RecordKeepingMethod", "RecordKeepingOther", "Related_Q15_Turnover"], "Survey_Form_SecD": ["SHGAssociationAssistance", "Related_Q19_Capital", "Related_Q20_Loan_Usage", "FundingExperience", "Related_Q22_Trajectory", "FinancialHelpFromIncome", "FinancialHelp_EducationAmt", "FinancialHelp_DebtsAmt", "FinancialHelp_AssetsAmt", "FinancialHelp_MarriageAmt", "DebtRepaidAmount", "AssetsAcquiredAmount", "MarriageExpensesAmount"], "Survey_Form_SecE": ["HusbandFamilyResponse", "MaterialSourcingComfort", "CustomerPaymentRecovery", "CurrentChallenges", "Challenge_OSFPhasedOutAmt", "Challenge_ScaleUpFundAmt", "Challenge_TimelyInputsAmt", "Challenge_Other", "Competitors_Similar_Scale", "Competitors_Smaller_Scale", "Competitors_Higher_Scale", "CompetitorAdvantages"], "Survey_Form_SecF": ["FutureExpansionPlans", "AspirationBottlenecks", "FutureFundsRequired"], "Survey_Form_SecG": ["AttendedTraining", "TrainingDetails", "UsedTrainingComponent", "UsedTrainingDetails", "MonthlyIncomeBeforeLoan", "MonthlyIncomeAfterLoan", "MonthlyIncomeIncreaseByOSFSVEP", "CRPContributions", "CRPContributionDocDetails", "ExpectationsFromScheme", "Other_Specify"], "Survey_Form_SecH": ["SmartphoneOwnership", "UseQRUPI", "QRDailyTransactions", "QRNonUseReason", "SocialMediaForMarketing", "SocialPlatformsUsed", "SocialPlatformUsageMode", "SocialMediaFrequency"], "Survey_Form_SecI": ["OSFInterventionYear", "BusinessOperationalStatus", "ScalingDownClosingReasons", "ScalingDownOtherReason", "SupportNeededForSustenance", "SupportNeededOther"]};

    var dict = {};
    var updatedViews = [];

    for (var ci = 0; ci < controls.length; ci++) {
      var ctrl = controls[ci];
      if (ctrl.Name && sectionOrders[ctrl.Name]) {
        var order = sectionOrders[ctrl.Name];
        var basePath = 'AppData.Presentation.Controls[' + ci + ']';
        dict[basePath + '.ViewDefinition.ColumnOrder'] = order;
        dict[basePath + '.Settings.ColumnOrder'] = order.join(',');
        updatedViews.push(ctrl.Name + ' (idx ' + ci + ')');
      }
    }

    if (Object.keys(dict).length === 0) {
      console.warn('[WARN] No matching section form views found to update');
      return;
    }

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log('[OK] Successfully aligned ' + updatedViews.length + ' form views to exact document order:');
    for (var u = 0; u < updatedViews.length; u++) {
      console.log('  - ' + updatedViews[u]);
    }
    console.log('CLICK SAVE BUTTON NOW!');
  } catch(e) {
    console.error('[ERROR]', e.message);
  }
})();
