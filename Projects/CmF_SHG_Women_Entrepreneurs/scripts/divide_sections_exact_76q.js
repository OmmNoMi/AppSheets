(function divideSurveySectionsNewStyle() {
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
      console.error("[FAIL] AppSheet Redux store not accessible");
      return;
    }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h || !h.Presentation || !h.Presentation.Controls) {
      console.error("[FAIL] Controls not found in Presentation");
      return;
    }

    var controls = h.Presentation.Controls;

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
        "MarketingMethods", "SeasonalSalesMethod", "SalesChannelsPct",
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

    var dict = {};
    var updated = [];

    // Find a template form control (e.g. SecA or SecG)
    var templateCtrl = controls.find(function(c) {
      return c && c.Type === "Form" && c.ReferencedTableName === "Survey";
    }) || controls[0];

    // Handle Survey_Form_SecB 2 rename if present
    var secB2Idx = controls.findIndex(function(c) { return c && c.Name === "Survey_Form_SecB 2"; });
    if (secB2Idx >= 0) {
      // Repurpose SecB 2 to Survey_Form_SecH if SecH does not exist
      var hasSecH = controls.some(function(c) { return c && c.Name === "Survey_Form_SecH"; });
      if (!hasSecH) {
        controls[secB2Idx].Name = "Survey_Form_SecH";
        dict["Presentation.Controls[" + secB2Idx + "].Name"] = "Survey_Form_SecH";
        console.log("[OK] Renamed 'Survey_Form_SecB 2' to 'Survey_Form_SecH'");
      }
    }

    // Ensure all 9 section form views exist
    var sectionNames = Object.keys(sectionOrders);
    sectionNames.forEach(function(viewName) {
      var idx = controls.findIndex(function(c) { return c && c.Name === viewName; });
      if (idx === -1) {
        // Clone new control
        var newCtrl = JSON.parse(JSON.stringify(templateCtrl));
        newCtrl.Name = viewName;
        newCtrl.DisplayName = viewName.replace("Survey_Form_", "Section ");
        newCtrl.ReferencedTableName = "Survey";
        newCtrl.ReferencedRootTableName = "Survey";
        newCtrl.Type = "Form";
        if (newCtrl.Settings) {
          try {
            var s = typeof newCtrl.Settings === "string" ? JSON.parse(newCtrl.Settings) : Object.assign({}, newCtrl.Settings);
            s.DisplayName = newCtrl.DisplayName;
            newCtrl.Settings = JSON.stringify(s);
          } catch(e) {}
        }
        idx = controls.length;
        controls.push(newCtrl);
        dict["Presentation.Controls[" + idx + "]"] = newCtrl;
        console.log("[OK] Created missing view: " + viewName);
      }

      // Now set exact ColumnOrder
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

      updated.push(viewName + " (" + order.length + " cols)");
    });

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });

    console.log("==================================================");
    console.log("[SUCCESS] Divided all sections according to new 76Q style:");
    updated.forEach(function(u) { console.log("  - " + u); });
    console.log("[ACTION] Click the blue SAVE button in AppSheet header to commit changes.");
    console.log("==================================================");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
