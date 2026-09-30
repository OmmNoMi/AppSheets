(function applySubTableDisplayNames() {
  try {
    var store = window.appStore;
    if (!store) {
      document.querySelectorAll('*').forEach(function(el) {
        var k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber'); });
        var f = k ? el[k] : null;
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { store = f.memoizedProps.store; window.appStore = store; return; }
          f = f.return;
        }
      });
    }
    if (!store) return console.error('[FAIL] Store not found. Editor me kisi column par click karein.');

    var map = {
      'Activity': 'COL_LABOR_ACTIVITY',
      'Involvement_Type': 'COL_LABOR_INVOLVEMENT',
      'Family_Members_Count': 'COL_LABOR_FAM_COUNT',
      'Hired_Help_Count': 'COL_LABOR_HIRED_COUNT',
      'Amount_Paid_Last_Year': 'COL_LABOR_AMOUNT_PAID',
      'Season': 'COL_TURN_SEASON',
      'Duration_Months': 'COL_TURN_DURATION',
      'Monthly_Sales': 'COL_TURN_SALES',
      'Monthly_Net_Profit': 'COL_TURN_PROFIT',
      'Source': 'COL_CAP_SOURCE',
      'Amount_First_Year': 'COL_CAP_YR1',
      'Amount_In_Between_Years': 'COL_CAP_MID',
      'Amount_Current_Year_2026_27': 'COL_CAP_CUR',
      'Amount_Pending': 'COL_CAP_PEN',
      'Loan_Usage_Purpose': 'COL_LOAN_USAGE',
      'Indicator_Heading': 'COL_CHG_HEADING',
      'First_Year_Value': 'COL_CHG_YR1',
      'Current_Year_Value': 'COL_CHG_CUR'
    };

    var enums = {
      'Involvement_Type': 'COL_LABOR_INVOLVEMENT',
      'Amount_Paid_Last_Year': 'COL_LABOR_AMOUNT_PAID',
      'Season': 'COL_TURN_SEASON',
      'Loan_Usage_Purpose': 'COL_LOAN_USAGE'
    };

    var state = store.getState();
    var schemas = state.appTemplate.history[0].appTemplate.AppData.DataSchemas || [];
    var dict = {};
    var count = 0;

    schemas.forEach(function(s, sIdx) {
      var tName = (s.Name || '').replace(/_Schema$/, '');
      if (tName.indexOf('Survey_') !== 0) return;

      (s.Attributes || []).forEach(function(a, aIdx) {
        var id = map[a.Name];
        if (id) {
          var f = '=LOOKUP("' + id + '", "AppVariables", "ID", "Label")';
          a.DisplayName = f;
          dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].DisplayName'] = f;
          count++;
        }
        if (enums[a.Name]) {
          var v = '=SPLIT(LOOKUP("' + enums[a.Name] + '", "AppVariables", "ID", "VariableList"), " , ")';
          a.ValidIf = v;
          dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].ValidIf'] = v;
          count++;
        }
      });
      console.log('[OK] Updated Display Names for table:', tName);
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('[SUCCESS] ' + count + ' Display Names & ValidIf formulas set! Click SAVE!');
  } catch(e) { console.error('[ERROR]', e); }
})();
