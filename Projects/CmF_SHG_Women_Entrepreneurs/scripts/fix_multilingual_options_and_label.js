(function fixMultilingualOptionsAndLabel() {
  try {
    var store = window.appStore || (function() {
      var root = document.querySelector('#app, #root, [role="main"]');
      var key = root && Object.keys(root).find(function(k) { return k.startsWith('__reactFiber$'); });
      var f = key ? root[key] : null;
      while (f) { if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store; f = f.return; }
      return null;
    })();
    if (!store) { console.error('[FAIL] Store not found'); return; }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];

    var avIdx = schemas.findIndex(function(s) { return s && (s.Name === 'AppVariables_Schema' || s.Name === 'AppVariables'); });
    var stIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });

    if (stIdx === -1) { console.error('[FAIL] Survey_Tables schema not found'); return; }

    var dict = {};
    var baseQual = JSON.stringify({
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedKeyColumn: "ID",
      IsAPartOf: false
    });

    // 1. Ensure AppVariables.Label is the active multilingual label
    if (avIdx !== -1) {
      var avAttrs = schemas[avIdx].Attributes || [];
      var labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), [Title_raj], TRUE, [Title_hi])';
      avAttrs.forEach(function(a, idx) {
        var p = 'AppData.DataSchemas[' + avIdx + '].Attributes[' + idx + ']';
        if (a.Name === 'ID') {
          dict[p + '.IsKey'] = true;
          dict[p + '.IsLabel'] = false;
        } else if (a.Name === 'Label') {
          dict[p + '.IsKey'] = false;
          dict[p + '.IsLabel'] = true;
          dict[p + '.IsVirtual'] = true;
          dict[p + '.AppFormula'] = labelFormula;
        } else if (a.IsLabel) {
          dict[p + '.IsLabel'] = false;
        }
      });
    }

    // 2. Clear hardcoded EnumValues in Survey_Tables and bind true multilingual Ref
    var stAttrs = schemas[stIdx].Attributes || [];
    var rowItemValidIf = '=IFS(' +
      '[Table_Type] = "Q6_Labor", SELECT(AppVariables[ID], [Column] = "Row_Item_Labor"), ' +
      '[Table_Type] = "Q15_Turnover", SELECT(AppVariables[ID], [Column] = "Row_Item_Turnover"), ' +
      'IN([Table_Type], LIST("Q19_Capital", "Q20_Loan_Usage")), SELECT(AppVariables[ID], [Column] = "Row_Item_Capital"), ' +
      '[Table_Type] = "Q22_Trajectory", SELECT(AppVariables[ID], [Column] = "Row_Item_Trajectory"), ' +
      'TRUE, SELECT(AppVariables[ID], [Table] = "Survey_Tables"))';

    var riIdx = stAttrs.findIndex(function(a) { return a.Name === 'Row_Item'; });
    if (riIdx !== -1) {
      var pRI = 'AppData.DataSchemas[' + stIdx + '].Attributes[' + riIdx + ']';
      var riAux = {
        BaseType: "Ref",
        ReferencedTableName: "AppVariables",
        ReferencedRootTableName: "AppVariables",
        BaseTypeQualifier: baseQual,
        ReferencedKeyColumn: "ID",
        EnumValues: [],
        AllowOtherValues: false,
        AutoCompleteOtherValues: false,
        EnumInputMode: "Auto",
        UseDropdown: true,
        Valid_If: rowItemValidIf
      };
      dict[pRI + '.Type'] = 'Enum';
      dict[pRI + '.BaseType'] = 'Ref';
      dict[pRI + '.ReferencedTableName'] = 'AppVariables';
      dict[pRI + '.ReferencedRootTableName'] = 'AppVariables';
      dict[pRI + '.EnumValues'] = [];
      dict[pRI + '.Valid_If'] = rowItemValidIf;
      dict[pRI + '.ValidIf'] = rowItemValidIf;
      dict[pRI + '.TypeAuxData'] = JSON.stringify(riAux);
    }

    var liIdx = stAttrs.findIndex(function(a) { return a.Name === 'Labor_Involvement'; });
    if (liIdx !== -1) {
      var pLI = 'AppData.DataSchemas[' + stIdx + '].Attributes[' + liIdx + ']';
      var liFormula = '=SELECT(AppVariables[ID], [Column] = "InvolvementLevel")';
      var liAux = {
        BaseType: "Ref",
        ReferencedTableName: "AppVariables",
        ReferencedRootTableName: "AppVariables",
        BaseTypeQualifier: baseQual,
        ReferencedKeyColumn: "ID",
        EnumValues: [],
        AllowOtherValues: false,
        AutoCompleteOtherValues: false,
        EnumInputMode: "Auto",
        UseDropdown: true,
        Valid_If: liFormula
      };
      dict[pLI + '.Type'] = 'Enum';
      dict[pLI + '.BaseType'] = 'Ref';
      dict[pLI + '.ReferencedTableName'] = 'AppVariables';
      dict[pLI + '.ReferencedRootTableName'] = 'AppVariables';
      dict[pLI + '.EnumValues'] = [];
      dict[pLI + '.Valid_If'] = liFormula;
      dict[pLI + '.ValidIf'] = liFormula;
      dict[pLI + '.TypeAuxData'] = JSON.stringify(liAux);
    }

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('[OK] Cleaned hardcoded options! Wiped EnumValues, set true Ref to AppVariables!');
    console.log('[ACTION] Click blue SAVE button. In emulator, click CANCEL on form and re-open to refresh!');
  } catch(e) { console.error(e); }
})();
