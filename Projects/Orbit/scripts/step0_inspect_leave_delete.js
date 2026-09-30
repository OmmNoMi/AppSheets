// OmmNoMi Orbit - Leave Delete Inspector (READ ONLY - SAFE)
// Run FIRST before any write scripts.
// Confirms: AppTriggers cols, AttendanceRequest actions, AttendanceDaily
(function inspectLeaveDelete() {
  try {
    // --- STORE DISCOVERY ---
    var store = window.appStore;
    if (!store) {
      var root = document.querySelector('#root') || document.body;
      var fKey = Object.keys(root).find(function(k) {
        return k.indexOf('reactFiber') >= 0;
      });
      var f = root[fKey];
      while (f) {
        if (f.memoizedProps && f.memoizedProps.store) {
          store = f.memoizedProps.store; break;
        }
        f = f.return;
      }
    }
    if (!store) {
      console.error('[ERROR] Redux store not found. Refresh and retry.');
      return;
    }
    window.appStore = store;
    var state = store.getState();
    var tmpl = state.appTemplate.history[0].appTemplate;
    var schemas = tmpl.AppData.DataSchemas;
    var actions = tmpl.AppData.Actions;

    console.log('[INFO] === Orbit Leave Delete Inspector ===');
    console.log('[INFO] Total schemas:', schemas.length);
    console.log('[INFO] Total actions:', actions.length);

    // --- FIND TARGET TABLES ---
    var tables = ['AppTriggers','AttendanceRequest','AttendanceDaily','LeaveAllocation'];
    tables.forEach(function(tName) {
      var idx = schemas.findIndex(function(s) { return s.Name === tName; });
      if (idx < 0) {
        console.error('[FAIL] Table NOT found:', tName);
      } else {
        var cols = schemas[idx].Attributes.map(function(a) { return a.Name; });
        console.log('[OK] Table "' + tName + '" at index ' + idx
          + ' | cols: ' + cols.join(', '));
      }
    });

    // --- FIND RELEVANT ACTIONS on AttendanceRequest ---
    console.log('[INFO] --- AttendanceRequest Actions ---');
    var arActions = actions.filter(function(a) {
      return a.TableName === 'AttendanceRequest';
    });
    arActions.forEach(function(a) {
      console.log('[OK] Action:', a.Name, '| Type:', a.ActionType);
    });

    // --- FIND RELEVANT ACTIONS on AttendanceDaily ---
    console.log('[INFO] --- AttendanceDaily Actions ---');
    var adActions = actions.filter(function(a) {
      return a.TableName === 'AttendanceDaily';
    });
    adActions.forEach(function(a) {
      console.log('[OK] Action:', a.Name, '| Type:', a.ActionType);
    });

    // --- FIND RELEVANT ACTIONS on LeaveAllocation ---
    console.log('[INFO] --- LeaveAllocation Actions ---');
    var laActions = actions.filter(function(a) {
      return a.TableName === 'LeaveAllocation';
    });
    laActions.forEach(function(a) {
      console.log('[OK] Action:', a.Name, '| Type:', a.ActionType);
    });

    // --- CHECK AppTriggers COLUMNS ---
    console.log('[INFO] --- AppTriggers Columns ---');
    var atIdx = schemas.findIndex(function(s) { return s.Name === 'AppTriggers'; });
    if (atIdx >= 0) {
      schemas[atIdx].Attributes.forEach(function(a) {
        console.log('  col:', a.Name, '| type:', a.Type);
      });
    }

    console.log('[INFO] === Inspection Complete. Review above before running write scripts. ===');
  } catch (err) {
    console.error('[OmmNoMi ERROR]', err.message);
  }
})();
