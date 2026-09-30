(function configureSurveyTablesComplete() {
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
    var tIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });
    if (tIdx === -1) { console.error('[FAIL] Survey_Tables schema not found'); return; }

    var map = {
      'Table_Type': 'Q_ST_TABLE_TYPE',
      'Survey_ID': 'Q_ST_SURVEY_ID',
      'ID': 'Q_ST_ID',
      'Row_Item': 'Q_ST_ROW_ITEM',
      'Row_Item_Other': 'Q_ST_ROW_ITEM_OTHER',
      'Labor_Involvement': 'Q_ST_LABOR_INV',
      'Labor_Family_Count': 'Q_ST_LABOR_FAM',
      'Labor_Hired_Count': 'Q_ST_LABOR_HIRED',
      'Labor_Amount_Paid': 'Q_ST_LABOR_AMT',
      'Turnover_Duration_Months': 'Q_ST_TURNOVER_MTH',
      'Turnover_Monthly_Sales': 'Q_ST_TURNOVER_SALES',
      'Turnover_Monthly_Profit': 'Q_ST_TURNOVER_PROFIT',
      'Capital_First_Year': 'Q_ST_CAP_YR1',
      'Capital_In_Between': 'Q_ST_CAP_MID',
      'Capital_Current_Year': 'Q_ST_CAP_CUR',
      'Capital_Pending': 'Q_ST_CAP_PEN',
      'Loan_Usage': 'Q_ST_LOAN_USE',
      'Loan_Usage_Other': 'Q_ST_LOAN_USE_OTHER',
      'Trajectory_First_Year_Mode': 'Q_ST_TRAJ_YR1_MODE',
      'Trajectory_First_Year_Amount': 'Q_ST_TRAJ_YR1_AMT',
      'Trajectory_Current_Year_Amount': 'Q_ST_TRAJ_CUR_AMT'
    };

    var dict = {};
    var count = 0;
    schemas[tIdx].Attributes.forEach(function(a, idx) {
      if (map[a.Name]) {
        var f = '=LOOKUP("' + map[a.Name] + '", "AppVariables", "ID", "Label")';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].DisplayName'] = f;
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].Description'] = '';
        count++;
      }
      if (a.Name === 'Row_Item') {
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].Type'] = 'Enum';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].BaseType'] = 'Ref';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].ReferencedTableName'] = 'AppVariables';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].ReferencedRootTableName'] = 'AppVariables';
        var validIf = '=IFS(' +
          '[Table_Type] = "Q6_Labor", SELECT(AppVariables[ID], [Column] = "Row_Item_Labor"), ' +
          '[Table_Type] = "Q15_Turnover", SELECT(AppVariables[ID], [Column] = "Row_Item_Turnover"), ' +
          'IN([Table_Type], LIST("Q19_Capital", "Q20_Loan_Usage")), SELECT(AppVariables[ID], [Column] = "Row_Item_Capital"), ' +
          '[Table_Type] = "Q22_Trajectory", SELECT(AppVariables[ID], [Column] = "Row_Item_Trajectory"), ' +
          'TRUE, SELECT(AppVariables[ID], [Table] = "Survey_Tables"))';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].Valid_If'] = validIf;
      }
      if (a.Name === 'Labor_Involvement') {
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].Type'] = 'Enum';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].BaseType'] = 'Ref';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].ReferencedTableName'] = 'AppVariables';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].ReferencedRootTableName'] = 'AppVariables';
        dict['AppData.DataSchemas[' + tIdx + '].Attributes[' + idx + '].Valid_If'] = '=LIST("INV_REGULAR", "INV_OCCASIONAL", "INV_ONLY_RESP", "INV_NOT_RELEVANT")';
      }
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('[OK] Configured Survey_Tables with dynamic DisplayNames and multilingual Enum-Refs!');
  } catch(e) { console.error(e); }
})();