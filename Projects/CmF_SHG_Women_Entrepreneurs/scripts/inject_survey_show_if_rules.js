(function injectSurveyShowIfRules() {
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
      console.error("[FAIL] AppSheet Redux store not found. Ensure AppSheet Editor is open in this tab.");
      return;
    }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) {
      console.error("[FAIL] AppTemplate not found in Redux state.");
      return;
    }

    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var surveyIdx = schemas.findIndex(function(s) {
      return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey') ||
             (s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed'; }));
    });

    if (surveyIdx === -1) {
      console.error("[FAIL] Survey schema not found in AppData.DataSchemas.");
      return;
    }

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

    var dict = {};
    var sAttrs = schemas[surveyIdx].Attributes || [];
    var count = 0;

    sAttrs.forEach(function(a, idx) {
      if (showIfRules[a.Name]) {
        var f = showIfRules[a.Name];
        var p = "AppData.DataSchemas[" + surveyIdx + "].Attributes[" + idx + "]";
        
        a.Show_If = f;
        a.ShowIf = f;
        dict[p + ".Show_If"] = f;
        dict[p + ".ShowIf"] = f;

        var auxObj = {};
        if (a.TypeAuxData) {
          try {
            auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData);
          } catch(e) {}
        }
        auxObj.Show_If = f;
        auxObj.ShowIf = f;
        var auxStr = JSON.stringify(auxObj);
        a.TypeAuxData = auxStr;
        dict[p + ".TypeAuxData"] = auxStr;

        count++;
        console.log("[OK] Survey." + a.Name + " Show_If rule applied.");
      }
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
    console.log("[SUCCESS] " + count + " Human Show_If rules injected into Survey table!");
    console.log("[ACTION] Click the blue SAVE button in AppSheet header to commit changes.");
    console.log("==================================================");
  } catch (err) {
    console.error("[ERROR] Failed to inject Show_If rules:", err.message);
  }
})();
