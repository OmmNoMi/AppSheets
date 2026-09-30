(function fixCompleteMultilingualEngine() {
  try {
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) {
          return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance');
        });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
            window.appStore = f.memoizedProps.store;
            return window.appStore;
          }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
            window.appStore = f.stateNode.store;
            return window.appStore;
          }
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) { console.error("[FAIL] AppSheet Redux store not found."); return; }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) { console.error("[FAIL] AppTemplate not found."); return; }

    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var dict = {};

    // 1. Locate AppVariables schema
    var avIdx = schemas.findIndex(function(s) {
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Title_hi' || a.Name === 'VariableList'; });
    });
    if (avIdx === -1) {
      avIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'AppVariables_Schema' || s.Name === 'AppVariables');
      });
    }

    if (avIdx === -1) {
      console.error("[FAIL] AppVariables schema not found.");
      return;
    }

    var avAttrs = schemas[avIdx].Attributes || [];
    console.log("[INFO] AppVariables schema found with " + avAttrs.length + " attributes.");

    // Universal Multilingual Formula for AppVariables.Label
    var labelFormula = '=IFS(' +
      'IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], ' +
      'IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), COALESCE([Title_raj], [Title_hi], [Title]), ' +
      'TRUE, COALESCE([Title_hi], [Title])' +
    ')';

    var lIdx = avAttrs.findIndex(function(a) { return a.Name === 'Label'; });
    if (lIdx === -1) {
      // Create Virtual Column "Label" in AppVariables
      var newLabelAttr = {
        Name: "Label",
        Type: "Text",
        IsVirtual: true,
        IsKey: false,
        IsLabel: true,
        IsReadOnly: true,
        AppFormula: labelFormula,
        DisplayName: "Label"
      };
      avAttrs.push(newLabelAttr);
      lIdx = avAttrs.length - 1;
      console.log("[OK] Created missing Virtual Column 'Label' in AppVariables!");
    } else {
      avAttrs[lIdx].IsVirtual = true;
      avAttrs[lIdx].IsLabel = true;
      avAttrs[lIdx].IsKey = false;
      avAttrs[lIdx].AppFormula = labelFormula;
      console.log("[OK] Updated existing 'Label' Virtual Column in AppVariables!");
    }

    // Set AppVariables.ID as Key, Label as active Label
    avAttrs.forEach(function(a, idx) {
      var p = "AppData.DataSchemas[" + avIdx + "].Attributes[" + idx + "]";
      if (a.Name === 'ID') {
        a.IsKey = true; a.IsLabel = false;
        dict[p + ".IsKey"] = true; dict[p + ".IsLabel"] = false;
      } else if (a.Name === 'Label') {
        a.IsKey = false; a.IsLabel = true; a.IsVirtual = true; a.AppFormula = labelFormula;
        dict[p + ".IsKey"] = false; dict[p + ".IsLabel"] = true; dict[p + ".IsVirtual"] = true; dict[p + ".AppFormula"] = labelFormula;
      } else if (a.IsLabel) {
        a.IsLabel = false;
        dict[p + ".IsLabel"] = false;
      }
    });

    // 2. Locate Survey schema
    var sIdx = schemas.findIndex(function(s) {
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed' || a.Name === 'FamilyAdultsCount'; });
    });
    if (sIdx === -1) {
      sIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey');
      });
    }

    if (sIdx !== -1) {
      var sAttrs = schemas[sIdx].Attributes || [];
      var surveyMap = {
        "Status_Profile": "Q_STAT_PROFILE", "Status_Operations": "Q_STAT_OPERATIONS", "Status_Challenges": "Q_STAT_CHALLENGES", "Status_SchemeImpact": "Q_STAT_SCHEME", "Status_Digital": "Q_STAT_DIGITAL", "Status_PostExit": "Q_STAT_POST_EXIT",
        "District": "Q_A_01_00", "Block": "Q_A_02_00", "VillageGP": "Q_A_03_00", "RespondentName": "Q_A_04_00", "ContactNumber": "Q_A_04_01", "SHGName": "Q_A_05_00", "VOName": "Q_A_06_00", "CLFName": "Q_A_07_00", "SHGMembershipYears": "Q_A_08_00", "LeadershipRole": "Q_A_09_00", "LeadershipYears": "Q_A_10_00", "RelatedToCRP": "Q_A_11_00", "EPInterventionType": "Q_A_12_00", "EnterpriseName": "Q_A_13_00", "ParallelEnterpriseName": "Q_A_13_01", "EnterpriseSetupYear": "Q_A_14_00", "LoanReceivedYear": "Q_A_15_00", "BusinessType": "Q_A_16_00", "BusinessActivities": "Q_A_17_00", "BusinessActivitiesOther": "Q_A_17_01",
        "RespondentAge": "Q_B_01_00", "MaritalStatus": "Q_B_02_00", "SocialCategory": "Q_B_03_00", "EducationStatus": "Q_B_04_00", "FamilyMemberCount": "Q_B_05_00", "FamilyAdultsCount": "Q_B_06_01", "FamilyChildrenCount": "Q_B_06_02", "FamilyTotalEarning": "Q_B_06_03", "FamilyMaleEarning": "Q_B_06_04", "FamilyFemaleEarning": "Q_B_06_05", "FamilyDisabledCount": "Q_B_06_06", "FamilyIncomeSources": "Q_B_07_00", "AnnualHouseholdIncome": "Q_B_08_00",
        "ReasonsStartingBusiness": "Q_C_01_00", "BusinessCycle": "Q_C_02_00", "BusinessCycleOther": "Q_C_02_01", "BusinessPlaceType": "Q_C_03_00", "AnnualRent": "Q_C_04_00", "LocationConvenience": "Q_C_05_00", "LocationConvenienceOther": "Q_C_05_01",
        "AnnualSalaryBill": "Q_C_07_00", "Sourcing_NearbyTown_Pct": "Q_C_08_NearbyTown", "Sourcing_Jaipur_Pct": "Q_C_08_Jaipur", "Sourcing_OutsideState_Pct": "Q_C_08_OutsideState", "Sourcing_Online_Pct": "Q_C_08_Online", "Sourcing_WhatsApp_Pct": "Q_C_08_WhatsApp",
        "MarketingMethods": "Q_C_09_00", "MarketingMethodsOther": "Q_C_09_01", "SeasonalSalesMethod": "Q_C_10_00", "SeasonalSalesOnlinePlatform": "Q_C_10_01", "SeasonalSalesOther": "Q_C_10_02", "SocialMediaForMarketing": "Q_C_11_00", "SocialMediaForMarketingOther": "Q_C_11_01",
        "SalesChannel_Online_Pct": "Q_C_12_Online", "SalesChannel_WhatsApp_Pct": "Q_C_12_WhatsApp", "SalesChannel_Instagram_Pct": "Q_C_12_Instagram", "SalesChannel_Premise_Pct": "Q_C_12_Premise", "SalesChannel_Traders_Pct": "Q_C_12_Traders", "SalesChannel_Haat_Pct": "Q_C_12_Haat", "SalesChannel_Saras_Pct": "Q_C_12_Saras",
        "RecordKeepingHabit": "Q_C_13_00", "RecordKeepingMethod": "Q_C_14_00", "RecordKeepingOther": "Q_C_14_01",
        "InitialStartCapital": "Q_C_16_00", "InitialCapitalArranged": "Q_C_17_00", "SHGAssociationAssistance": "Q_C_18_00", "MonthlyIncomeIncreaseByOSFSVEP": "Q_C_21_00",
        "FinancialHelpFromIncome": "Q_C_23_00", "FinancialHelp_EducationAmt": "Q_C_23_01", "FinancialHelp_DebtsAmt": "Q_C_23_02", "FinancialHelp_AssetsAmt": "Q_C_23_03", "FinancialHelp_MarriageAmt": "Q_C_23_04",
        "HusbandFamilyResponse": "Q_D_01_00", "MaterialSourcingComfort": "Q_D_02_00", "CustomerPaymentRecovery": "Q_D_03_00", "FundingExperience": "Q_D_04_00", "CurrentChallenges": "Q_D_05_00",
        "AttendedTraining": "Q_E_01_00", "TrainingDetails": "Q_E_02_00", "UsedTrainingComponent": "Q_E_03_00", "UsedTrainingDetails": "Q_E_04_00", "MonthlyIncomeBeforeLoan": "Q_E_05_01", "MonthlyIncomeAfterLoan": "Q_E_05_02", "CRPContributions": "Q_E_06_00", "ExpectationsFromScheme": "Q_E_07_00",
        "SmartphoneOwnership": "Q_F_01_00", "UseQRUPI": "Q_F_02_00", "QRDailyTransactions": "Q_F_03_00", "QRNonUseReason": "Q_F_04_00", "SocialPlatformsUsed": "Q_F_05_00", "SocialPlatformUsageMode": "Q_F_06_00", "SocialMediaFrequency": "Q_F_07_00",
        "OSFInterventionYear": "Q_G_01_00", "BusinessOperationalStatus": "Q_G_02_00", "BusinessClosureYear": "Q_G_02_01", "ScalingDownClosingReasons": "Q_G_03_00", "ScalingDownOtherReason": "Q_G_03_01", "SupportNeededForSustenance": "Q_G_04_00", "SupportNeededOther": "Q_G_04_01",
        "Related_Q6_Labor": "Q_C_06_00", "Related_Q15_Turnover": "Q_C_15_00", "Related_Q19_Capital": "Q_C_19_00", "Related_Q20_Loan_Usage": "Q_C_20_00", "Related_Q22_Trajectory": "Q_C_22_00"
      };

      var sCount = 0;
      sAttrs.forEach(function(a, idx) {
        if (surveyMap[a.Name]) {
          var f = '=LOOKUP("' + surveyMap[a.Name] + '", "AppVariables", "ID", "Label")';
          var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "]";
          a.DisplayName = f;
          a.Description = "";
          dict[p + ".DisplayName"] = f;
          dict[p + ".Description"] = "";
          sCount++;
        }
      });
      console.log("[OK] Mapped " + sCount + " Survey columns to dynamic multilingual AppVariables.Label!");
    }

    // 3. Dispatch to Redux Store
    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] Multilingual Engine Fully Connected! Click SAVE in AppSheet.");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
