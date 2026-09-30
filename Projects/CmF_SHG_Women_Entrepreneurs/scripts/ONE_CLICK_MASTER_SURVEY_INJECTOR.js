(function runOneClickMasterSurveyInjector() {
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
    if (!store) {
      console.error("[FAIL] AppSheet Redux store not found! Please make sure AppSheet Editor is open.");
      return;
    }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) {
      console.error("[FAIL] AppTemplate not found.");
      return;
    }

    var dict = {};
    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var controls = (h.Presentation && h.Presentation.Controls) || [];

    // ========================================================
    // PART 1: 9 SECTION FORM VIEWS ALIGNMENT
    // ========================================================
    var sectionOrders = {
      "Survey_Form_SecA": [
        "District", "Block", "VillageGP", "RespondentName", "RespondentPhone",
        "SHGName", "VOName", "CLFName", "SHGMembershipYears", "LeadershipRole",
        "LeadershipYears", "RelatedToCRP", "EPInterventionType", "EnterpriseName",
        "EnterpriseSetupYear", "BusinessType", "BusinessActivities",
        "LoanReceivedYear", "MaintainSeparateRecords", "RegistrationsDocuments"
      ],
      "Survey_Form_SecB": [
        "RespondentAge", "MaritalStatus", "SocialCategory", "EducationStatus",
        "FamilyMemberCount", "FamilyAdultsCount", "FamilyChildrenCount",
        "FamilyTotalEarning", "FamilyMaleEarning", "FamilyFemaleEarning",
        "FamilyDisabledCount", "FamilyIncomeSources", "AnnualHouseholdIncome"
      ],
      "Survey_Form_SecC": [
        "ReasonsStartingBusiness", "BusinessCycle", "BusinessPlaceType", "MonthlyRent",
        "LocationConvenience", "Related_Q6_Labor", "Sourcing_NearbyTown_Pct",
        "Sourcing_Jaipur_Pct", "Sourcing_OutsideState_Pct", "Sourcing_Online_Pct",
        "MarketingMethods", "SeasonalSalesMethod", "SalesChannel_Online_Pct",
        "SalesChannel_WhatsApp_Pct", "SalesChannel_Instagram_Pct", "SalesChannel_Premise_Pct",
        "SalesChannel_Traders_Pct", "SalesChannel_Haat_Pct", "SalesChannel_Saras_Pct",
        "RecordKeepingHabit", "RecordKeepingMethod", "Related_Q15_Turnover"
      ],
      "Survey_Form_SecD": [
        "SHGAssociationAssistance", "Related_Q19_Capital", "Related_Q20_Loan_Usage",
        "FundingExperience", "Related_Q22_Trajectory", "FinancialHelpFromIncome"
      ],
      "Survey_Form_SecE": [
        "HusbandFamilyResponse", "MaterialSourcingComfort", "CustomerPaymentRecovery",
        "CurrentChallenges", "Competitors_Similar_Scale", "Competitors_Smaller_Scale",
        "Competitors_Higher_Scale", "CompetitorAdvantages"
      ],
      "Survey_Form_SecF": [
        "FutureExpansionPlans", "AspirationBottlenecks", "FutureFundsRequired"
      ],
      "Survey_Form_SecG": [
        "AttendedTraining", "TrainingDetails", "UsedTrainingComponent", "UsedTrainingDetails",
        "MonthlyIncomeBeforeLoan", "MonthlyIncomeAfterLoan", "MonthlyIncomeIncreaseByOSFSVEP",
        "CRPContributions", "ExpectationsFromScheme"
      ],
      "Survey_Form_SecH": [
        "SmartphoneOwnership", "UseQRUPI", "QRDailyTransactions", "QRNonUseReason",
        "SocialMediaForMarketing", "SocialPlatformsUsed", "SocialPlatformUsageMode", "SocialMediaFrequency"
      ],
      "Survey_Form_SecI": [
        "OSFInterventionYear", "BusinessOperationalStatus", "ScalingDownClosingReasons", "SupportNeededForSustenance"
      ]
    };

    var templateCtrl = controls.find(function(c) {
      return c && c.Type === "Form" && c.ReferencedTableName === "Survey";
    }) || controls[0];

    // Rename Survey_Form_SecB 2 to Survey_Form_SecH
    var secB2Idx = controls.findIndex(function(c) { return c && c.Name === "Survey_Form_SecB 2"; });
    if (secB2Idx >= 0 && !controls.some(function(c) { return c && c.Name === "Survey_Form_SecH"; })) {
      controls[secB2Idx].Name = "Survey_Form_SecH";
      dict["Presentation.Controls[" + secB2Idx + "].Name"] = "Survey_Form_SecH";
      console.log("[OK] Converted 'Survey_Form_SecB 2' to 'Survey_Form_SecH'");
    }

    Object.keys(sectionOrders).forEach(function(viewName) {
      var idx = controls.findIndex(function(c) { return c && c.Name === viewName; });
      if (idx === -1) {
        var newCtrl = JSON.parse(JSON.stringify(templateCtrl));
        newCtrl.Name = viewName;
        newCtrl.DisplayName = viewName.replace("Survey_Form_", "Section ");
        newCtrl.ReferencedTableName = "Survey";
        newCtrl.ReferencedRootTableName = "Survey";
        newCtrl.Type = "Form";
        idx = controls.length;
        controls.push(newCtrl);
        dict["Presentation.Controls[" + idx + "]"] = newCtrl;
        console.log("[OK] Created section view: " + viewName);
      }

      var order = sectionOrders[viewName];
      var ctrl = controls[idx];
      var basePath = "Presentation.Controls[" + idx + "]";

      if (ctrl.ViewDefinition) {
        ctrl.ViewDefinition.ColumnOrder = order;
        dict[basePath + ".ViewDefinition.ColumnOrder"] = order;
      }
      if (ctrl.Settings) {
        try {
          var setObj = typeof ctrl.Settings === "string" ? JSON.parse(ctrl.Settings) : Object.assign({}, ctrl.Settings);
          setObj.ColumnOrder = order;
          ctrl.Settings = JSON.stringify(setObj);
          dict[basePath + ".Settings"] = JSON.stringify(setObj);
        } catch(e) {
          dict[basePath + ".Settings.ColumnOrder"] = order.join(",");
        }
      }
    });

    // ========================================================
    // PART 2: SURVEY SCHEMA (HUMAN SHOW_IF + DISPLAYNAME + ENUM REF)
    // ========================================================
    var surveyIdx = schemas.findIndex(function(s) {
      return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey') ||
             (s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed'; }));
    });

    if (surveyIdx >= 0) {
      var sAttrs = schemas[surveyIdx].Attributes || [];

      var showIfRules = {
        "LeadershipYears": '=OR([LeadershipRole] = "OPT_YES", [LeadershipRole] = "Yes")',
        "MonthlyRent": '=OR([BusinessPlaceType] = "PLC_RENTED", [BusinessPlaceType] = "Rented Premises / Shop", [BusinessPlaceType] = "Rented")',
        "RecordKeepingMethod": '=AND(ISNOTBLANK([RecordKeepingHabit]), [RecordKeepingHabit] <> "RKH_NO_RECORD", [RecordKeepingHabit] <> "Don\'t maintain any records at all", [RecordKeepingHabit] <> "I don\'t maintain any records at all", [RecordKeepingHabit] <> "OPT_NO", [RecordKeepingHabit] <> "No")',
        "TrainingDetails": '=OR([AttendedTraining] = "OPT_YES", [AttendedTraining] = "Yes")',
        "UsedTrainingComponent": '=OR([AttendedTraining] = "OPT_YES", [AttendedTraining] = "Yes")',
        "UsedTrainingDetails": '=AND(OR([AttendedTraining] = "OPT_YES", [AttendedTraining] = "Yes"), OR([UsedTrainingComponent] = "OPT_YES", [UsedTrainingComponent] = "Yes"))',
        "QRDailyTransactions": '=OR([UseQRUPI] = "OPT_YES", [UseQRUPI] = "Yes")',
        "QRNonUseReason": '=OR([UseQRUPI] = "OPT_NO", [UseQRUPI] = "No")',
        "SocialPlatformUsageMode": '=AND(ISNOTBLANK([SocialPlatformsUsed]), NOT(IN("SMP_NONE", [SocialPlatformsUsed])), NOT(IN("Don\'t use social media", [SocialPlatformsUsed])), NOT(IN("Don’t use social media", [SocialPlatformsUsed])))',
        "SocialMediaFrequency": '=AND(ISNOTBLANK([SocialPlatformsUsed]), NOT(IN("SMP_NONE", [SocialPlatformsUsed])), NOT(IN("Don\'t use social media", [SocialPlatformsUsed])), NOT(IN("Don’t use social media", [SocialPlatformsUsed])))',
        "ScalingDownClosingReasons": '=OR([BusinessOperationalStatus] = "BSTAT_CLOSED", [BusinessOperationalStatus] = "BSTAT_REDUCED", [BusinessOperationalStatus] = "No, closed (Specify closure year)", [BusinessOperationalStatus] = "Yes, but sales reduced", [BusinessOperationalStatus] = "Yes but the sale has reduced", [BusinessOperationalStatus] = "Closed")'
      };

      sAttrs.forEach(function(a, idx) {
        var colName = a.Name;
        var p = "AppData.DataSchemas[" + surveyIdx + "].Attributes[" + idx + "]";
        var auxObj = {};
        if (a.TypeAuxData) {
          try { auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData); } catch(e) {}
        }

        // Apply Show_If if applicable
        if (showIfRules[colName]) {
          var sf = showIfRules[colName];
          a.Show_If = sf; a.ShowIf = sf;
          dict[p + ".Show_If"] = sf; dict[p + ".ShowIf"] = sf;
          auxObj.Show_If = sf; auxObj.ShowIf = sf;
        }

        var auxStr = JSON.stringify(auxObj);
        a.TypeAuxData = auxStr;
        dict[p + ".TypeAuxData"] = auxStr;
      });
    }

    // ========================================================
    // DISPATCH SINGLE COMMIT TO REDUX
    // ========================================================
    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });

    console.log("==================================================");
    console.log("[SUCCESS] All 9 Sections, Show_If rules & Structure configured in 1 shot!");
    console.log("[ACTION] Click the blue SAVE button in AppSheet header to commit changes.");
    console.log("==================================================");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
