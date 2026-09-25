(function injectVCsWithReactRemount() {
  try {
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) return f.memoizedProps.store;
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) return f.stateNode.store;
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) { console.error("[FAIL] Store not found."); return; }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
    var sIdx = schemas.findIndex(function(s) {
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed' || a.Name === 'FamilyAdultsCount'; });
    });
    if (sIdx === -1) { console.error("[FAIL] Survey schema not found."); return; }

    var origAttrs = schemas[sIdx].Attributes || [];
    console.log("[INFO] Current Survey columns count before injection: " + origAttrs.length);

    // Immutable clone of all existing attributes
    var newAttrs = origAttrs.map(function(a) { return Object.assign({}, a); });

    // Formulas using EXACT subtable names visible in user's table (rows 92-96)
    var newVCs = [
      {
        name: "SecA_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([RespondentName]), ISNOTBLANK([SHGName]), ISNOTBLANK([BusinessType]))',
        disp: "Section A Completed"
      },
      {
        name: "SecB_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([RespondentAge]), ISNOTBLANK([EducationStatus]), ISNOTBLANK([FamilyMemberCount]))',
        disp: "Section B Completed"
      },
      {
        name: "SecC_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([BusinessCycle]), ISNOTBLANK([AnnualSalaryBill]), ISNOTBLANK([InitialStartCapital]), COUNT([Related Survey_Labors]) > 0, COUNT([Related Survey_Turnovers]) > 0, COUNT([Related Survey_Capital_Arrangements]) > 0, COUNT([Related Survey_Loan_Usages]) > 0)',
        disp: "Section C Completed"
      },
      {
        name: "SecD_Done",
        type: "Yes/No",
        formula: '=ISNOTBLANK([CurrentChallenges])',
        disp: "Section D Completed"
      },
      {
        name: "SecE_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([AttendedTraining]), ISNOTBLANK([MonthlyIncomeBeforeLoan]))',
        disp: "Section E Completed"
      },
      {
        name: "SecF_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([SmartphoneOwnership]), ISNOTBLANK([UseQRUPI]), ISNOTBLANK([SocialPlatformsUsed]))',
        disp: "Section F Completed"
      },
      {
        name: "SecG_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([OSFInterventionYear]), ISNOTBLANK([BusinessOperationalStatus]))',
        disp: "Section G Completed"
      },
      {
        name: "Survey_Progress",
        type: "Percent",
        formula: '=(IF([SecA_Done], 0.15, 0.0) + IF([SecB_Done], 0.15, 0.0) + IF([SecC_Done], 0.25, 0.0) + IF([SecD_Done], 0.10, 0.0) + IF([SecE_Done], 0.15, 0.0) + IF([SecF_Done], 0.10, 0.0) + IF([SecG_Done], 0.10, 0.0))',
        disp: "Survey Completion Progress"
      },
      {
        name: "Survey_Status_Badge",
        type: "Text",
        formula: '=IFS([Survey_Progress] >= 1.0, "Completed", [Survey_Progress] >= 0.5, "In Progress", [Survey_Progress] > 0.0, "Started", TRUE, "Draft")',
        disp: "Overall Survey Status"
      }
    ];

    newVCs.forEach(function(vc) {
      var exIdx = newAttrs.findIndex(function(a) { return a.Name === vc.name; });
      if (exIdx === -1) {
        newAttrs.push({
          Name: vc.name,
          Type: vc.type,
          IsVirtual: true,
          IsKey: false,
          IsLabel: false,
          IsReadOnly: true,
          AppFormula: vc.formula,
          DisplayName: vc.disp,
          Show_If: "",
          ShowIf: ""
        });
      } else {
        newAttrs[exIdx] = Object.assign({}, newAttrs[exIdx], {
          Type: vc.type,
          IsVirtual: true,
          AppFormula: vc.formula,
          DisplayName: vc.disp
        });
      }
    });

    console.log("[INFO] New Survey columns count: " + newAttrs.length);

    // Deep immutable clone of DataSchemas to break React shallow equality
    var newSchemas = schemas.slice();
    newSchemas[sIdx] = Object.assign({}, schemas[sIdx], { Attributes: newAttrs });

    var dict = {};
    dict["AppData.DataSchemas"] = newSchemas;
    dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = newAttrs;

    // Dispatch batch update
    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });

    // Step to trigger DOM table refresh in AppSheet:
    // Click on AppUser in sidebar and then click back on Survey to re-mount the grid
    setTimeout(function() {
      var links = document.querySelectorAll('button, a, div[role="treeitem"], div[role="button"]');
      var appUserTab = null;
      var surveyTab = null;
      links.forEach(function(el) {
        var txt = (el.innerText || "").trim();
        if (txt.indexOf('AppUser') === 0) appUserTab = el;
        if (txt.indexOf('Survey') === 0 && txt.indexOf('Survey_') === -1) surveyTab = el;
      });

      if (appUserTab && surveyTab) {
        console.log("[INFO] Cycling tabs to force React grid re-render...");
        appUserTab.click();
        setTimeout(function() {
          surveyTab.click();
          console.log("[SUCCESS] React Grid re-mounted! Columns: " + newAttrs.length + ". Scroll to bottom to view rows 97 to 105!");
        }, 300);
      } else {
        console.log("[SUCCESS] Staged " + newAttrs.length + " columns! Click 'AppUser' on left menu and click back 'Survey' to see them in grid.");
      }
    }, 200);

  } catch(e) {
    console.error("[ERROR]", e.message);
  }
})();
