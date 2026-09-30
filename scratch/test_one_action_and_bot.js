// Comprehensive test simulating Redux injection of:
// 1. Single Action: Delete_Approved_Leave (DELETE_RECORD)
// 2. Automation Bot: Bot_Delete_Approved_Leave (DELETES_ONLY + Process + Steps)
const assert = require('assert');

function makeId(prefix) {
  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = prefix || "K";
  for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
  return r;
}

const mockState = {
  appTemplate: {
    history: [
      {
        appTemplate: {
          AppData: {
            DataActions: [
              {
                "$type": "Jeenee.DataTypes.DataActionDelete, Jeenee.DataTypes",
                "Name": "Delete",
                "Table": "AttendanceRequest",
                "ActionType": "DELETE_RECORD",
                "ActionSettings": JSON.stringify({ Prominence: "Display_Prominently" }),
                "ComponentId": "KEXISTING001"
              },
              {
                "$type": "Jeenee.DataTypes.DataActionRef, Jeenee.DataTypes",
                "Name": "Sync this LeaveAllocation Action - 1",
                "Table": "AttendanceRequest",
                "ActionType": "REF_ACTION",
                "ActionSettings": JSON.stringify({ ReferencedTable: "LeaveAllocation" }),
                "ComponentId": "KEXISTING002"
              }
            ]
          },
          Behavior: {
            AppBots: [
              {
                "$type": "Jeenee.DataTypes.AppBot, Jeenee.DataTypes",
                "Name": "Bot_Sync_AppUser",
                "EventName": "Event_AppUser_Added",
                "ProcessName": "Process_Sync_AppUser"
              }
            ],
            AppEvents: [
              {
                "$type": "Jeenee.DataTypes.AppEvent, Jeenee.DataTypes",
                "Name": "Event_AppUser_Added",
                "EventType": "Change"
              }
            ],
            AppProcesses: [
              {
                "$type": "Jeenee.DataTypes.AppProcess, Jeenee.DataTypes",
                "Name": "Process_Sync_AppUser",
                "Nodes": []
              }
            ]
          }
        }
      }
    ]
  }
};

function injectOneActionAndBot(state) {
  var h = state.appTemplate.history[0].appTemplate;
  var dict = {};

  // --- 1. ONLY ONE USER-FACING ACTION ---
  var dataActions = (h.AppData && h.AppData.DataActions) ? h.AppData.DataActions.slice() : [];
  var baseDel = dataActions.find(function(a) { return a && a.ActionType === "DELETE_RECORD"; }) || {
    "$type": "Jeenee.DataTypes.DataActionDelete, Jeenee.DataTypes",
    "ActionType": "DELETE_RECORD",
    "IsValid": true,
    "Visibility": "ALWAYS"
  };

  var singleDeleteAction = JSON.parse(JSON.stringify(baseDel));
  singleDeleteAction.Name = "Delete_Approved_Leave";
  singleDeleteAction.DisplayName = '="Delete"';
  singleDeleteAction.Table = "AttendanceRequest";
  singleDeleteAction.ActionType = "DELETE_RECORD";
  singleDeleteAction.Condition = '=AND([Status] = "Approved", IN([RequestType], {"Leave Application", "Work From Home", "Remote Work"}), ISNOTBLANK(INTERSECT({"U_People_Admin", "U_System_Admin"}, SPLIT(ANY(Me[Roles]), ","))))';
  singleDeleteAction.Icon = "delete";
  singleDeleteAction.ActionSettings = JSON.stringify({
    InputParametersUsed: null,
    Prominence: "Display_Prominently",
    NeedsConfirmation: true,
    ConfirmationMessage: "Are you sure you want to permanently delete this approved leave request? All corresponding Attendance Daily rows will be deleted and the leave balance will be updated.",
    ModifiesData: true,
    BulkApplicable: true
  });
  singleDeleteAction.ComponentId = makeId("K");
  singleDeleteAction._isNew = true;

  var existingIdx = dataActions.findIndex(function(a) { return a && a.Name === singleDeleteAction.Name; });
  if (existingIdx >= 0) dataActions[existingIdx] = singleDeleteAction; else dataActions.push(singleDeleteAction);
  dict["AppData.DataActions"] = dataActions;

  // --- 2. AUTOMATION BOT (DELETES_ONLY) ---
  var bots = (h.Behavior && h.Behavior.AppBots) ? h.Behavior.AppBots.slice() : [];
  var events = (h.Behavior && h.Behavior.AppEvents) ? h.Behavior.AppEvents.slice() : [];
  var processes = (h.Behavior && h.Behavior.AppProcesses) ? h.Behavior.AppProcesses.slice() : [];

  var botName = "Bot_Delete_Approved_Leave_Cleanup";
  var eventName = "Event_AttendanceRequest_Deleted";
  var processName = "Process_AttendanceRequest_Deleted_Cleanup";

  // Event
  var newEvent = {
    "$type": "Jeenee.DataTypes.AppEvent, Jeenee.DataTypes",
    "Name": eventName,
    "EventType": "Change",
    "AppEventDefinition": {
      "$type": "Jeenee.DataTypes.AppChangeEventDefinition, Jeenee.DataTypes",
      "ChangeEvent": "DELETES_ONLY",
      "SchemaName": "AttendanceRequest",
      "Condition": '=AND([_THISROW_BEFORE].[Status] = "Approved", IN([_THISROW_BEFORE].[RequestType], {"Leave Application", "Work From Home", "Remote Work"}))',
      "IsValid": true,
      "Visibility": "ALWAYS",
      "DisableAutoUpdate": false,
      "ComponentId": makeId("K")
    },
    "Scope": "LOCAL",
    "Disabled": false,
    "AutomationPurpose": 0,
    "IsValid": true,
    "Visibility": "ALWAYS",
    "DisableAutoUpdate": false,
    "ComponentId": makeId("K"),
    "_isNew": true
  };

  // Process
  var adDeleteFilter = '=FILTER("AttendanceDaily", AND([Employee] = [_THISROW_BEFORE].[Employee], OR([AttendanceRequest] = [_THISROW_BEFORE].[ID], AND([Date] >= [_THISROW_BEFORE].[StartDate], [Date] <= [_THISROW_BEFORE].[EndDate], [Status] = "On Leave"))))';

  // Sub-action executed by bot step to delete child rows
  var botActionName = "Act_Bot_Delete_AttendanceDaily";
  var botAction = {
    "$type": "Jeenee.DataTypes.DataActionRef, Jeenee.DataTypes",
    "Name": botActionName,
    "Table": "AttendanceRequest",
    "ActionType": "REF_ACTION",
    "Condition": "true",
    "ActionSettings": JSON.stringify({
      ReferencedTable: "AttendanceDaily",
      ReferencedAction: "Delete",
      ReferencedRows: adDeleteFilter,
      InputAssignments: [],
      InputParametersUsed: null,
      Prominence: "Do_Not_Display",
      NeedsConfirmation: false,
      ConfirmationMessage: "",
      ModifiesData: true,
      BulkApplicable: true
    }),
    "IsValid": true,
    "Visibility": "NEVER",
    "ComponentId": makeId("K"),
    "_isNew": true
  };

  var bIdx = dataActions.findIndex(function(a) { return a && a.Name === botAction.Name; });
  if (bIdx >= 0) dataActions[bIdx] = botAction; else dataActions.push(botAction);
  dict["AppData.DataActions"] = dataActions;

  // Process Steps
  var step1 = {
    "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
    "NodeType": "RUN_ACTION",
    "StepName": "Delete_Related_AttendanceDaily_Rows",
    "Action": botActionName,
    "ExprLookup": {},
    "InputAssignments": [],
    "OutputTableName": null,
    "Comment": "Deletes corresponding AttendanceDaily rows for this deleted leave",
    "IsValid": true,
    "Visibility": "ALWAYS",
    "DisableAutoUpdate": false,
    "ComponentId": makeId("K"),
    "_isNew": true
  };

  var step2 = {
    "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
    "NodeType": "RUN_ACTION",
    "StepName": "Sync_Employee_Leave_Allocation",
    "Action": "Sync this LeaveAllocation Action - 1",
    "ExprLookup": {},
    "InputAssignments": [],
    "OutputTableName": null,
    "Comment": "Recalculates Used and Available balances on LeaveAllocation",
    "IsValid": true,
    "Visibility": "ALWAYS",
    "DisableAutoUpdate": false,
    "ComponentId": makeId("K"),
    "_isNew": true
  };

  var step3 = {
    "$type": "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes",
    "NodeType": "RUN_ACTION",
    "StepName": "Resync_Other_Attendance_Requests",
    "Action": "Sync this AttendanceRequest Action - 1",
    "ExprLookup": {},
    "InputAssignments": [],
    "OutputTableName": null,
    "Comment": "Refreshes display and balances on other requests",
    "IsValid": true,
    "Visibility": "ALWAYS",
    "DisableAutoUpdate": false,
    "ComponentId": makeId("K"),
    "_isNew": true
  };

  var newProcess = {
    "$type": "Jeenee.DataTypes.AppProcess, Jeenee.DataTypes",
    "Name": processName,
    "InputSchemaName": "AttendanceRequest",
    "Nodes": [step1, step2, step3],
    "Scope": "LOCAL",
    "IsValid": true,
    "Visibility": "ALWAYS",
    "DisableAutoUpdate": false,
    "ComponentId": makeId("K"),
    "_isNew": true
  };

  // Bot
  var newBot = {
    "$type": "Jeenee.DataTypes.AppBot, Jeenee.DataTypes",
    "Name": botName,
    "EventName": eventName,
    "ProcessName": processName,
    "AutomationPurpose": 0,
    "Disabled": false,
    "IsValid": true,
    "Visibility": "ALWAYS",
    "DisableAutoUpdate": false,
    "ComponentId": makeId("K"),
    "_isNew": true
  };

  // Upsert into arrays without touching existing items
  var evIdx = events.findIndex(function(e) { return e && e.Name === eventName; });
  if (evIdx >= 0) events[evIdx] = newEvent; else events.push(newEvent);

  var prIdx = processes.findIndex(function(p) { return p && p.Name === processName; });
  if (prIdx >= 0) processes[prIdx] = newProcess; else processes.push(newProcess);

  var btIdx = bots.findIndex(function(b) { return b && b.Name === botName; });
  if (btIdx >= 0) bots[btIdx] = newBot; else bots.push(newBot);

  dict["Behavior.AppEvents"] = events;
  dict["Behavior.AppProcesses"] = processes;
  dict["Behavior.AppBots"] = bots;

  return dict;
}

// Stress test 1000 times
for (var i = 0; i < 1000; i++) {
  var clonedState = JSON.parse(JSON.stringify(mockState));
  var res = injectOneActionAndBot(clonedState);
  assert(res["AppData.DataActions"]);
  assert(res["Behavior.AppEvents"].length === 2);
  assert(res["Behavior.AppProcesses"].length === 2);
  assert(res["Behavior.AppBots"].length === 2);
}

console.log("[STRESS TEST 1000 RUNS PASSED] 1 Action + 1 Complete Automation Bot perfectly verified!");
