(function createSectionProgressVCs() {
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
        formula: '=AND(ISNOTBLANK([BusinessCycle]), ISNOTBLANK([AnnualSalaryBill]), ISNOTBLANK([InitialStartCapital]), COUNT([Related_Q6_Labor]) > 0, COUNT([Related_Q15_Turnover]) > 0, COUNT([Related_Q19_Capital]) > 0, COUNT([Related_Q20_Loan_Usage]) > 0, COUNT([Related_Q22_Trajectory]) > 0)',
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
      var aIdx = sAttrs.findIndex(function(a) { return a.Name === vc.name; });
      var attr;
      if (aIdx === -1) {
        attr = {
          Name: vc.name,
          Type: vc.type,
          IsVirtual: true,
          IsKey: false,
          IsLabel: false,
          IsReadOnly: true,
          AppFormula: vc.formula,
          DisplayName: vc.disp
        };
        sAttrs.push(attr);
        aIdx = sAttrs.length - 1;
      } else {
        attr = sAttrs[aIdx];
        attr.Type = vc.type;
        attr.IsVirtual = true;
        attr.AppFormula = vc.formula;
        attr.DisplayName = vc.disp;
      }
      var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + aIdx + "]";
      dict[p + ".Name"] = vc.name;
      dict[p + ".Type"] = vc.type;
      dict[p + ".IsVirtual"] = true;
      dict[p + ".IsKey"] = false;
      dict[p + ".IsLabel"] = false;
      dict[p + ".IsReadOnly"] = true;
      dict[p + ".AppFormula"] = vc.formula;
      dict[p + ".DisplayName"] = vc.disp;
      count++;
      console.log("[OK] Created VC: " + vc.name + " (" + vc.type + ")");
    });

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[SUCCESS] Successfully created " + count + " Virtual Columns in Survey table! Click SAVE in AppSheet.");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
