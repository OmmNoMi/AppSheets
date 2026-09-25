(function makeVCsVisibleInGrid() {
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

    var sAttrs = (schemas[sIdx].Attributes || []).slice();
    var dict = {};

    var newVCs = [
      { name: "SecA_Done", type: "Yes/No", formula: '=AND(ISNOTBLANK([RespondentName]), ISNOTBLANK([SHGName]), ISNOTBLANK([BusinessType]))', disp: "Section A Completed" },
      { name: "SecB_Done", type: "Yes/No", formula: '=AND(ISNOTBLANK([RespondentAge]), ISNOTBLANK([EducationStatus]), ISNOTBLANK([FamilyMemberCount]))', disp: "Section B Completed" },
      { name: "SecC_Done", type: "Yes/No", formula: '=AND(ISNOTBLANK([BusinessCycle]), ISNOTBLANK([AnnualSalaryBill]), ISNOTBLANK([InitialStartCapital]), COUNT([Related_Q6_Labor]) > 0, COUNT([Related_Q15_Turnover]) > 0, COUNT([Related_Q19_Capital]) > 0, COUNT([Related_Q20_Loan_Usage]) > 0, COUNT([Related_Q22_Trajectory]) > 0)', disp: "Section C Completed" },
      { name: "SecD_Done", type: "Yes/No", formula: '=ISNOTBLANK([CurrentChallenges])', disp: "Section D Completed" },
      { name: "SecE_Done", type: "Yes/No", formula: '=AND(ISNOTBLANK([AttendedTraining]), ISNOTBLANK([MonthlyIncomeBeforeLoan]))', disp: "Section E Completed" },
      { name: "SecF_Done", type: "Yes/No", formula: '=AND(ISNOTBLANK([SmartphoneOwnership]), ISNOTBLANK([UseQRUPI]), ISNOTBLANK([SocialPlatformsUsed]))', disp: "Section F Completed" },
      { name: "SecG_Done", type: "Yes/No", formula: '=AND(ISNOTBLANK([OSFInterventionYear]), ISNOTBLANK([BusinessOperationalStatus]))', disp: "Section G Completed" },
      { name: "Survey_Progress", type: "Percent", formula: '=(IF([SecA_Done], 0.15, 0.0) + IF([SecB_Done], 0.15, 0.0) + IF([SecC_Done], 0.25, 0.0) + IF([SecD_Done], 0.10, 0.0) + IF([SecE_Done], 0.15, 0.0) + IF([SecF_Done], 0.10, 0.0) + IF([SecG_Done], 0.10, 0.0))', disp: "Survey Completion Progress" },
      { name: "Survey_Status_Badge", type: "Text", formula: '=IFS([Survey_Progress] >= 1.0, "Completed", [Survey_Progress] >= 0.5, "In Progress", [Survey_Progress] > 0.0, "Started", TRUE, "Draft")', disp: "Overall Survey Status" }
    ];

    newVCs.forEach(function(vc) {
      var aIdx = sAttrs.findIndex(function(a) { return a.Name === vc.name; });
      if (aIdx === -1) {
        sAttrs.push({
          Name: vc.name,
          Type: vc.type,
          IsVirtual: true,
          IsKey: false,
          IsLabel: false,
          IsReadOnly: true,
          AppFormula: vc.formula,
          DisplayName: vc.disp
        });
      } else {
        sAttrs[aIdx] = Object.assign({}, sAttrs[aIdx], {
          Type: vc.type,
          IsVirtual: true,
          AppFormula: vc.formula,
          DisplayName: vc.disp
        });
      }
    });

    dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = sAttrs;
    schemas[sIdx].Attributes = sAttrs;
    dict["AppData.DataSchemas"] = schemas;

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] React Grid refreshed! Columns count is now: " + sAttrs.length + ". Scroll down to see rows 97 to 105!");
  } catch(e) {
    console.error("[ERROR]", e.message);
  }
})();
