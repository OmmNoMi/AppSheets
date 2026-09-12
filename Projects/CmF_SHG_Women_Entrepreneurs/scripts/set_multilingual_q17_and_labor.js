// ==============================================================================
// OmmNoMi: Multilingual Trilingual Options for Q17 & Q6 (< 55 lines, Pure ASCII)
// ==============================================================================
(function setMultilingualOptions() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Setting Multilingual Options (Q17 & Q6) ===");

    var store = window.appStore || (function() {
      var el = document.querySelector('.ExpressionControl') || document.querySelector('[role="grid"]') || document.body;
      var k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); });
      var f = el && el[k];
      while (f) {
        if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store;
        if (f.stateNode && f.stateNode.store) return f.stateNode.store;
        f = f.return;
      }
    })();
    if (!store) return console.error("[FAIL] Store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));

    // Exact Trilingual Options for Q17 Capital Sources
    var q17Sources = [
      "Own Savings (Apni bachat / Khud ri bachat)",
      "Financed by family member (Parivar dwara / Ghar ra jana diya)",
      "Profit from business (Vyavsay ka munafa / Dhandhe ro munafan)",
      "Mortgaged gold/silver (Sona-chandi girvi / Sona-chandi girvi rakh r)",
      "Sold gold/silver (Sona-chandi bechkar / Sona-chandi bech r)",
      "Loan from family (Rishtedaron se karz / Natedaran sun loan)",
      "Loan from moneylender (Sahukar se rin / Sahukar sun karz)",
      "Loan from SHG (SHG samooh se rin / Samooh sun loan)",
      "Loan from OSF/SVEP (OSF/SVEP se rin / OSF/SVEP sun loan)",
      "Subsidy/grant under OSF/SVEP (Subsidiy-anudaan / Yojna ri subsidy)",
      "Loan from private saving groups/BC (Niji bachat samooh-BC / Niji BC-group)",
      "Loan from NBFC (NBFC-microfinance rin / Company ro loan)",
      "Mudra loan (Mudra rin / Mudra loan)",
      "Loan from banks (Bank rin / Bank sun loan)"
    ];

    // Exact Trilingual Options for Q6 Labor Activities
    var q6Activities = [
      "Purchase of material (Kaccha maal khareed / Kaccho maal mol levno)",
      "Production (Utpaadan-nirmaan / Maal banavno)",
      "Servicing (Seva-marammat / Seva-durust karno)",
      "Social media marketing (Social media prachar / Prachar ar social media)",
      "Sale (from shop/door to door/Saras fair/haat) (Bikri dukan-haat-mela / Bikri dukan-haat-melo)",
      "Record keeping (Bahi-khata / Hisab-kitab rakhno)"
    ];

    schemas.forEach(function(schema) {
      var isCap = (schema.Name || '').indexOf('Capital') >= 0;
      var isLabor = (schema.Name || '').indexOf('Labor') >= 0;

      (schema.Attributes || []).forEach(function(attr) {
        var isSrc = isCap && (attr.Name === 'Source' || attr.Name === 'Capital_Source' || attr.Name === 'Source_Name');
        var isAct = (isLabor && (attr.Name === 'Activity' || attr.Name === 'Activity_Name')) || attr.Name === 'BusinessActivity';

        if (isSrc || attr.Name === 'InitialCapitalArranged') {
          var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
          attr.Type = attr.Name === 'InitialCapitalArranged' ? 'EnumList' : 'Enum';
          aux.EnumValues = q17Sources;
          aux.BaseType = 'Text';
          aux.EnumInputMode = 'Dropdown';
          aux.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name + " with Q17 multilingual options");
        }

        if (isAct) {
          var aux2 = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
          attr.Type = 'Enum';
          aux2.EnumValues = q6Activities;
          aux2.BaseType = 'Text';
          aux2.EnumInputMode = 'Dropdown';
          aux2.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux2);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name + " with Q6 multilingual options");
        }
      });
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: { 'AppData.DataSchemas': schemas }, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Multilingual Options Applied! Click SAVE in AppSheet! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
