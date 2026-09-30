(function applyAll4ShowIfConditions() {
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
    var count = 0;

    // 1. Target Survey Schema (found via SocialPlatformsUsed)
    var surveyIdx = schemas.findIndex(function(s) {
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed'; });
    });
    if (surveyIdx === -1) {
      surveyIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey');
      });
    }

    if (surveyIdx >= 0) {
      var sAttrs = schemas[surveyIdx].Attributes || [];
      var surveyTargets = {
        // Area 1: Social Media
        "SocialPlatformUsageMode": '=AND(ISNOTBLANK([SocialPlatformsUsed]), NOT(IN("SOC_NONE", [SocialPlatformsUsed])))',
        "SocialMediaFrequency": '=AND(ISNOTBLANK([SocialPlatformsUsed]), NOT(IN("SOC_NONE", [SocialPlatformsUsed])))',

        // Area 2: QR / UPI Transactions
        "QRDailyTransactions": '=[UseQRUPI] = "OPT_YES"',
        "QRNonUseReason": '=[UseQRUPI] = "OPT_NO"',

        // Area 3: Hired Workers in Survey Table
        "Labor_Purchase_AmountPaid": '=[Labor_Purchase_HiredCount] > 0',
        "Labor_Prod_AmountPaid": '=[Labor_Prod_HiredCount] > 0',
        "Labor_Serv_AmountPaid": '=[Labor_Serv_HiredCount] > 0',
        "Labor_Mktg_AmountPaid": '=[Labor_Mktg_HiredCount] > 0',
        "Labor_Sale_AmountPaid": '=[Labor_Sale_HiredCount] > 0',
        "Labor_Record_AmountPaid": '=[Labor_Record_HiredCount] > 0',

        // Area 4: Business Operational Status & Reasons
        "BusinessClosureYear": '=[BusinessOperationalStatus] = "BOS_CLOSED"',
        "ScalingDownClosingReasons": '=OR([BusinessOperationalStatus] = "BOS_CLOSED", [BusinessOperationalStatus] = "BOS_SALE_REDUCED")',
        "ScalingDownOtherReason": '=AND(OR([BusinessOperationalStatus] = "BOS_CLOSED", [BusinessOperationalStatus] = "BOS_SALE_REDUCED"), IN("CLR_OTHER", [ScalingDownClosingReasons]))'
      };

      sAttrs.forEach(function(a, idx) {
        if (surveyTargets[a.Name]) {
          var f = surveyTargets[a.Name];
          var p = "AppData.DataSchemas[" + surveyIdx + "].Attributes[" + idx + "]";
          a.Show_If = f; a.ShowIf = f;
          dict[p + ".Show_If"] = f; dict[p + ".ShowIf"] = f;

          var auxObj = {};
          if (a.TypeAuxData) {
            try { auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData); } catch(e) {}
          }
          auxObj.Show_If = f; auxObj.ShowIf = f;
          var auxStr = JSON.stringify(auxObj);
          a.TypeAuxData = auxStr;
          dict[p + ".TypeAuxData"] = auxStr;
          count++;
          console.log("[OK] Survey." + a.Name + " => " + f);
        }
      });
    } else {
      console.warn("[WARN] Survey schema could not be identified.");
    }

    // 2. Target Child Subtable Schema (Survey_Tables)
    var childIdx = schemas.findIndex(function(s) {
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Labor_Hired_Count'; });
    });
    if (childIdx === -1) {
      childIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables');
      });
    }

    if (childIdx >= 0) {
      var cAttrs = schemas[childIdx].Attributes || [];
      var childTargets = {
        "Labor_Amount_Paid": '=AND([Table_Type] = "Q6_Labor", [Labor_Hired_Count] > 0)'
      };

      cAttrs.forEach(function(a, idx) {
        if (childTargets[a.Name]) {
          var f = childTargets[a.Name];
          var p = "AppData.DataSchemas[" + childIdx + "].Attributes[" + idx + "]";
          a.Show_If = f; a.ShowIf = f;
          dict[p + ".Show_If"] = f; dict[p + ".ShowIf"] = f;

          var auxObj = {};
          if (a.TypeAuxData) {
            try { auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData); } catch(e) {}
          }
          auxObj.Show_If = f; auxObj.ShowIf = f;
          var auxStr = JSON.stringify(auxObj);
          a.TypeAuxData = auxStr;
          dict[p + ".TypeAuxData"] = auxStr;
          count++;
          console.log("[OK] Survey_Tables." + a.Name + " => " + f);
        }
      });
    }

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] Successfully configured Show_If for " + count + " fields across all 4 areas! Click SAVE in AppSheet.");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
