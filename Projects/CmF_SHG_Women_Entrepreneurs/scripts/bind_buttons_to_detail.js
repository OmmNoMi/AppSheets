(function bindButtonsToSurveyDetail() {
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
    if (!store) return console.error('[FAIL] Store not found.');

    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var controls = h.Presentation?.Controls || [];
    
    // Find all views related to Survey Detail
    var detailIdx = controls.findIndex(function(c) {
      var n = (c.Name || '').toLowerCase();
      var t = (c.TableOrFolderName || c.ViewDefinition?.TableOrFolderName || '');
      return t === 'Survey' && (n.indexOf('detail') >= 0 || c.ViewType === 'Detail');
    });

    if (detailIdx === -1) return console.error('[FAIL] Survey Detail view not found.');

    var detail = controls[detailIdx];
    var viewDef = detail.ViewDefinition || detail;
    var curActions = (viewDef.Actions || []).slice();

    var buttons = ['Btn_Labor', 'Btn_Turnover', 'Btn_Capital', 'Btn_Loan_Usage', 'Btn_Business_Changes'];
    var added = 0;

    buttons.forEach(function(btn) {
      if (curActions.indexOf(btn) === -1) {
        curActions.push(btn);
        added++;
      }
    });

    var dict = {};
    dict['Presentation.Controls[' + detailIdx + '].ViewDefinition.Actions'] = curActions;
    dict['Presentation.Controls[' + detailIdx + '].Actions'] = curActions;

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log('[SUCCESS] Added ' + added + ' buttons to ' + detail.Name + ' card! Total actions on card: ' + curActions.length);
    console.log('Actions list:', curActions);
    console.log('Now click SAVE in AppSheet to display them on the card!');
  } catch(e) { console.error('[ERROR]', e); }
})();
