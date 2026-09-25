(function injectSectionProgressAndColorUX() {
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
    var sIdx = schemas.findIndex(function(s) {
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed' || a.Name === 'FamilyAdultsCount'; });
    });
    if (sIdx === -1) {
      sIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey');
      });
    }
    if (sIdx === -1) { console.error("[FAIL] Survey schema not found."); return; }

    var sAttrs = schemas[sIdx].Attributes || [];
    var dict = {};
    var count = 0;

    // 1. Definition of the 7 Section Status VCs + Progress + Badge
    var newCols = [
      {
        name: "SecA_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([RespondentName]), ISNOTBLANK([SHGName]), ISNOTBLANK([BusinessType]))',
        disp: "Section A Status"
      },
      {
        name: "SecB_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([RespondentAge]), ISNOTBLANK([EducationStatus]), ISNOTBLANK([FamilyMemberCount]))',
        disp: "Section B Status"
      },
      {
        name: "SecC_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([BusinessCycle]), ISNOTBLANK([AnnualSalaryBill]), ISNOTBLANK([InitialStartCapital]), COUNT([Related_Q6_Labor]) > 0, COUNT([Related_Q15_Turnover]) > 0, COUNT([Related_Q19_Capital]) > 0, COUNT([Related_Q20_Loan_Usage]) > 0, COUNT([Related_Q22_Trajectory]) > 0)',
        disp: "Section C Status"
      },
      {
        name: "SecD_Done",
        type: "Yes/No",
        formula: '=ISNOTBLANK([CurrentChallenges])',
        disp: "Section D Status"
      },
      {
        name: "SecE_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([AttendedTraining]), ISNOTBLANK([MonthlyIncomeBeforeLoan]))',
        disp: "Section E Status"
      },
      {
        name: "SecF_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([SmartphoneOwnership]), ISNOTBLANK([UseQRUPI]), ISNOTBLANK([SocialPlatformsUsed]))',
        disp: "Section F Status"
      },
      {
        name: "SecG_Done",
        type: "Yes/No",
        formula: '=AND(ISNOTBLANK([OSFInterventionYear]), ISNOTBLANK([BusinessOperationalStatus]))',
        disp: "Section G Status"
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
        disp: "Overall Status"
      }
    ];

    newCols.forEach(function(c) {
      var aIdx = sAttrs.findIndex(function(a) { return a.Name === c.name; });
      var attr;
      if (aIdx === -1) {
        attr = {
          Name: c.name,
          Type: c.type,
          IsVirtual: true,
          IsKey: false,
          IsLabel: false,
          IsReadOnly: true,
          AppFormula: c.formula,
          DisplayName: c.disp
        };
        sAttrs.push(attr);
        aIdx = sAttrs.length - 1;
      } else {
        attr = sAttrs[aIdx];
        attr.Type = c.type;
        attr.IsVirtual = true;
        attr.AppFormula = c.formula;
        attr.DisplayName = c.disp;
      }
      var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + aIdx + "]";
      dict[p + ".Name"] = c.name;
      dict[p + ".Type"] = c.type;
      dict[p + ".IsVirtual"] = true;
      dict[p + ".IsKey"] = false;
      dict[p + ".IsLabel"] = false;
      dict[p + ".IsReadOnly"] = true;
      dict[p + ".AppFormula"] = c.formula;
      dict[p + ".DisplayName"] = c.disp;
      count++;
      console.log("[OK] Injected VC: " + c.name);
    });

    // 2. Inject Green UX Format Rules
    var formatRulesList = [
      { name: "FR_SecA_Green", col: ["District", "SecA_Done"], cond: '=[SecA_Done] = TRUE' },
      { name: "FR_SecB_Green", col: ["RespondentAge", "SecB_Done"], cond: '=[SecB_Done] = TRUE' },
      { name: "FR_SecC_Green", col: ["BusinessCycle", "SecC_Done"], cond: '=[SecC_Done] = TRUE' },
      { name: "FR_SecD_Green", col: ["CurrentChallenges", "SecD_Done"], cond: '=[SecD_Done] = TRUE' },
      { name: "FR_SecE_Green", col: ["AttendedTraining", "SecE_Done"], cond: '=[SecE_Done] = TRUE' },
      { name: "FR_SecF_Green", col: ["SmartphoneOwnership", "SecF_Done"], cond: '=[SecF_Done] = TRUE' },
      { name: "FR_SecG_Green", col: ["OSFInterventionYear", "SecG_Done"], cond: '=[SecG_Done] = TRUE' },
      { name: "FR_Survey_Completed", col: ["Survey_Progress", "Survey_Status_Badge"], cond: '=[Survey_Progress] >= 1.0' }
    ];

    if (h.Presentation) {
      var existingFR = (h.Presentation.FormatRules || []).slice();
      formatRulesList.forEach(function(r) {
        var ruleObj = {
          Name: r.name,
          TableOrSlice: "Survey",
          ColumnsToFormat: r.col,
          Condition: r.cond,
          RuleOrder: 1,
          Disabled: false,
          Settings: JSON.stringify({
            textColor: "#34A853",
            highlightColor: "#34A853",
            textSize: 1.0,
            underline: false,
            strikethrough: false,
            bold: true,
            italic: false,
            uppercase: false,
            icon: "check-circle",
            imageSize: null
          }),
          Visibility: "ALWAYS"
        };
        var rIdx = existingFR.findIndex(function(ex) { return ex.Name === r.name; });
        if (rIdx >= 0) existingFR[rIdx] = ruleObj; else existingFR.push(ruleObj);
      });
      dict["Presentation.FormatRules"] = existingFR;
      console.log("[OK] Staged " + formatRulesList.length + " Green UX Format Rules!");
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
    console.log("[OK] Section Progress & Green Color UX successfully injected! Click SAVE in AppSheet.");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
