// Test runner simulating AppSheet Redux state and Action injection
const assert = require('assert');

// Mock existing state based on Orbit AppDoc
const mockState = {
  appTemplate: {
    history: [
      {
        appTemplate: {
          AppData: {
            DataActions: [
              {
                "$type": "Jeenee.DataTypes.DataActionRef, Jeenee.DataTypes",
                "Name": "Sync this LeaveAllocation Action - 1",
                "Table": "AttendanceRequest",
                "ActionType": "REF_ACTION",
                "ActionSettings": JSON.stringify({
                  ReferencedTable: "LeaveAllocation",
                  ReferencedRows: '=FILTER("LeaveAllocation",[Employee]=[_THISROW].[Employee])',
                  ReferencedAction: "Sync_LeaveAllocation",
                  Prominence: "Display_Prominently"
                }),
                "ComponentId": "KEXISTING001"
              },
              {
                "$type": "Jeenee.DataTypes.DataActionRef, Jeenee.DataTypes",
                "Name": "Sync this AttendanceRequest Action - 1",
                "Table": "AttendanceRequest",
                "ActionType": "REF_ACTION",
                "ActionSettings": JSON.stringify({
                  ReferencedTable: "AttendanceRequest",
                  ReferencedRows: '=FILTER("AttendanceRequest",[Employee]=[_THISROW].[Employee])',
                  ReferencedAction: "Sync_AttendanceRequest",
                  Prominence: "Display_Prominently"
                }),
                "ComponentId": "KEXISTING002"
              },
              {
                "$type": "Jeenee.DataTypes.DataActionDelete, Jeenee.DataTypes",
                "Name": "Delete",
                "Table": "AttendanceRequest",
                "ActionType": "DELETE_RECORD",
                "ActionSettings": JSON.stringify({ Prominence: "Display_Prominently" }),
                "ComponentId": "KEXISTING003"
              },
              {
                "$type": "Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes",
                "Name": "Change CheckIn & CheckOut Action - 1",
                "Table": "AttendanceRequest",
                "ActionType": "COMPOSITE",
                "ActionSettings": JSON.stringify({ Actions: [{ ActionName: "Step1" }] }),
                "ComponentId": "KEXISTING004"
              }
            ]
          }
        }
      }
    ]
  }
};

console.log("Initial actions count:", mockState.appTemplate.history[0].appTemplate.AppData.DataActions.length);

function makeId() {
  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
  for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
  return r;
}

// Logic to create the 3 actions
var h = mockState.appTemplate.history[0].appTemplate;
var actions = (h.AppData && h.AppData.DataActions) ? h.AppData.DataActions.slice() : [];

// 1. Base RefAction to clone
var baseRef = actions.find(function(a) { return a.ActionType === "REF_ACTION"; });
assert(baseRef, "Must find a base REF_ACTION to clone");

var actDeleteAD = JSON.parse(JSON.stringify(baseRef));
actDeleteAD.Name = "Act_AR_Delete_Related_AttendanceDaily";
actDeleteAD.Table = "AttendanceRequest";
actDeleteAD.ActionType = "REF_ACTION";
actDeleteAD.Condition = "true";
actDeleteAD.ActionSettings = JSON.stringify({
  ReferencedTable: "AttendanceDaily",
  ReferencedAction: "Delete",
  ReferencedRows: '=FILTER("AttendanceDaily", AND([Employee] = [_THISROW].[Employee], [Date] >= [_THISROW].[StartDate], [Date] <= [_THISROW].[EndDate], [Status] = "On Leave"))',
  InputAssignments: [],
  InputParametersUsed: null,
  Prominence: "Do_Not_Display",
  NeedsConfirmation: false,
  ConfirmationMessage: "",
  ModifiesData: true,
  BulkApplicable: true
});
actDeleteAD.ComponentId = makeId();
actDeleteAD._isNew = true;

// 2. Base DeleteAction to clone
var baseDel = actions.find(function(a) { return a.ActionType === "DELETE_RECORD"; });
assert(baseDel, "Must find a base DELETE_RECORD to clone");

var actDeleteThis = JSON.parse(JSON.stringify(baseDel));
actDeleteThis.Name = "Act_AR_Delete_This_Request";
actDeleteThis.Table = "AttendanceRequest";
actDeleteThis.ActionType = "DELETE_RECORD";
actDeleteThis.Condition = "true";
actDeleteThis.ActionSettings = JSON.stringify({
  InputParametersUsed: null,
  Prominence: "Do_Not_Display",
  NeedsConfirmation: false,
  ConfirmationMessage: "",
  ModifiesData: true,
  BulkApplicable: true
});
actDeleteThis.ComponentId = makeId();
actDeleteThis._isNew = true;

// 3. Base CompositeAction to clone
var baseComp = actions.find(function(a) { return a.ActionType === "COMPOSITE"; });
assert(baseComp, "Must find a base COMPOSITE to clone");

var actMaster = JSON.parse(JSON.stringify(baseComp));
var subActions = [
  { ActionName: "Act_AR_Delete_Related_AttendanceDaily" },
  { ActionName: "Sync this LeaveAllocation Action - 1" },
  { ActionName: "Sync this AttendanceRequest Action - 1" },
  { ActionName: "Act_AR_Delete_This_Request" }
];

actMaster.Name = "Delete_Approved_Leave";
actMaster.DisplayName = '="Delete Leave"';
actMaster.Table = "AttendanceRequest";
actMaster.ActionType = "COMPOSITE";
actMaster.Condition = '=AND([Status] = "Approved", IN([RequestType], {"Leave Application", "Work From Home", "Remote Work"}), ISNOTBLANK(INTERSECT({"U_People_Admin", "U_System_Admin"}, SPLIT(ANY(Me[Roles]), ","))))';
actMaster.Icon = "delete";
actMaster.ActionSettings = JSON.stringify({
  Actions: subActions,
  Prominence: "Display_Prominently",
  NeedsConfirmation: true,
  ConfirmationMessage: "Are you sure you want to permanently delete this approved leave request? All corresponding Attendance Daily rows will be deleted and the leave balance will be updated.",
  ModifiesData: true,
  BulkApplicable: true
});
if (actMaster.ActionDefinition) {
  actMaster.ActionDefinition.Actions = subActions;
}
actMaster.ComponentId = makeId();
actMaster._isNew = true;

// Upsert into actions list
[actDeleteAD, actDeleteThis, actMaster].forEach(function(act) {
  var idx = actions.findIndex(function(a) { return a.Name === act.Name; });
  if (idx >= 0) {
    actions[idx] = act;
  } else {
    actions.push(act);
  }
});

console.log("Final actions count:", actions.length);
assert.strictEqual(actions.length, 7, "Should have 4 existing + 3 new actions");
console.log("[TEST PASSED] All 3 actions successfully created and verified!");
