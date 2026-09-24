// OmmNoMi Orbit - Step 1: Create Delete Leave Action on AttendanceRequest
// PRODUCTION SAFE: Only ADDS a new action. Never modifies existing ones.
// Pre-condition: Run step0_inspect first. Confirm table names match exactly.
(function createDeleteLeaveAction() {
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
      console.error('[ERROR] Store not found. Refresh and retry.'); return;
    }
    window.appStore = store;
    var state = store.getState();
    var actions = state.appTemplate.history[0].appTemplate.AppData.Actions;

    // --- GUARD: Do not duplicate ---
    var existing = actions.find(function(a) {
      return a.Name === 'Delete_Leave_WriteToTrigger';
    });
    if (existing) {
      console.warn('[WARN] Action "Delete_Leave_WriteToTrigger" already exists. Skipping.');
      return;
    }

    // --- GUARD: Verify AttendanceRequest table exists ---
    var schemas = state.appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var arTable = schemas.find(function(s) { return s.Name === 'AttendanceRequest'; });
    if (!arTable) {
      console.error('[FAIL] AttendanceRequest table not found. Abort.'); return;
    }
    var atTable = schemas.find(function(s) { return s.Name === 'AppTriggers'; });
    if (!atTable) {
      console.error('[FAIL] AppTriggers table not found. Abort.'); return;
    }

    // --- NEW ACTION DEFINITION ---
    // Type: ADD_RECORD_TO (writes a row to AppTriggers queue)
    // Condition: HR/Admin role + approved + leave/wfh/remote only
    var roleCheck = [
      'OR(',
      '  IN("U_People_Admin", SPLIT(ANY(Me[Roles]), ",")),',
      '  IN("U_System_Admin", SPLIT(ANY(Me[Roles]), ","))',
      ')'
    ].join('');

    var typeCheck = [
      'IN([RequestType], {',
      '  "Leave Application",',
      '  "Work From Home",',
      '  "Remote Work"',
      '})'
    ].join('');

    var condition = 'AND(' + typeCheck + ', [Status] = "Approved", ' + roleCheck + ')';

    var newAction = {
      Name: 'Delete_Leave_WriteToTrigger',
      DisplayName: 'Delete Leave',
      TableName: 'AttendanceRequest',
      ActionType: 'ADD_RECORD_TO',
      TargetTable: 'AppTriggers',
      Condition: '=' + condition,
      Prominence: 'overlay',
      Icon: 'delete',
      ConfirmationMessage: 'Permanently delete this leave? Related attendance rows will be removed and leave balance restored. This cannot be undone.',
      // Map values from AttendanceRequest into AppTriggers columns
      // These column names MUST match actual AppTriggers columns (confirmed in step0)
      // Adjust keys after reviewing step0 output
      ColumnInputs: [
        { Column: 'TriggerType', Value: '="DeleteLeaveRequest"' },
        { Column: 'ReferenceID', Value: '=[_THISROW].[ID]' },
        { Column: 'Employee', Value: '=[_THISROW].[Employee]' },
        { Column: 'StartDate', Value: '=[_THISROW].[StartDate]' },
        { Column: 'EndDate', Value: '=[_THISROW].[EndDate]' },
        { Column: 'LeaveAllocation', Value: '=[_THISROW].[LeaveAllocation]' },
        { Column: 'RequestType', Value: '=[_THISROW].[RequestType]' },
        { Column: 'TriggeredOn', Value: '=NOW()' }
      ]
    };

    var nv = {};
    var actIdx = actions.length;
    nv['AppData.Actions[' + actIdx + '].Name'] = newAction.Name;
    nv['AppData.Actions[' + actIdx + '].DisplayName'] = newAction.DisplayName;
    nv['AppData.Actions[' + actIdx + '].TableName'] = newAction.TableName;
    nv['AppData.Actions[' + actIdx + '].ActionType'] = newAction.ActionType;
    nv['AppData.Actions[' + actIdx + '].TargetTable'] = newAction.TargetTable;
    nv['AppData.Actions[' + actIdx + '].Condition'] = newAction.Condition;
    nv['AppData.Actions[' + actIdx + '].Prominence'] = newAction.Prominence;
    nv['AppData.Actions[' + actIdx + '].Icon'] = newAction.Icon;
    nv['AppData.Actions[' + actIdx + '].ConfirmationMessage'] = newAction.ConfirmationMessage;

    console.log('[INFO] Dispatching new action at index:', actIdx);
    console.log('[INFO] Action name:', newAction.Name);
    console.log('[WARN] IMPORTANT: After dispatch, manually verify ColumnInputs');
    console.log('[WARN] in AppSheet editor since column names depend on AppTriggers schema.');

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nv,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('[OK] Action "Delete_Leave_WriteToTrigger" created.');
    console.log('[OK] Save button shown. DO NOT SAVE YET.');
    console.log('[NEXT] Verify action in editor, confirm ColumnInputs match AppTriggers cols.');
    console.log('[NEXT] Then run step2 for the bot.');
  } catch (err) {
    console.error('[OmmNoMi ERROR]', err.message, err.stack);
  }
})();
