# Orbit — AppSheet Schema (v1.102403)
> Parsed: 6/12/2026, 6:35:33 PM | 191T / 4528C / 17S / 146V / 361A / 18FR
> Deployable: Yes | Runnable: Yes

## Tables
```
  Employee                  src=google   sheet=Employee             mode=ALL_CHANGES
  _Per User Settings        src=native   sheet=?                    mode=UPDATES_ONLY
  Documents                 src=google   sheet=Document             mode=ALL_CHANGES
  Project                   src=google   sheet=Project              mode=ALL_CHANGES
  Templates                 src=google   sheet=Templates            mode=ALL_CHANGES
  AppUser                   src=google   sheet=AppUser              mode=ALL_CHANGES
  TaskList                  src=google   sheet=TaskList             mode=ALL_CHANGES
  CheckList                 src=google   sheet=CheckList            mode=ALL_CHANGES
  CandidateData             src=google   sheet=CandidateData        mode=ALL_CHANGES
  Communication             src=google   sheet=Communication        mode=ALL_CHANGES
  DocType                   src=google   sheet=DocType              mode=UPDATES_ONLY
  AppViews                  src=google   sheet=AppViews             mode=ALL_CHANGES
  AppSettings               src=google   sheet=AppSettings          mode=ALL_CHANGES
  AppVariables              src=google   sheet=AppVariables         mode=ALL_CHANGES
  AppTriggers               src=google   sheet=AppTriggers          mode=ALL_CHANGES
  ReviewCycles              src=google   sheet=ReviewCycles         mode=ALL_CHANGES
  ReviewEmployee            src=google   sheet=ReviewEmployee       mode=ALL_CHANGES
  ReviewObjective           src=google   sheet=ReviewObjective      mode=ALL_CHANGES
  ReviewEvaluations         src=google   sheet=ReviewEvaluations    mode=ALL_CHANGES
  AttendanceDaily           src=google   sheet=AttendanceDaily      mode=ALL_CHANGES
  AttendanceMonthly         src=google   sheet=AttendanceMonthly    mode=ALL_CHANGES
  OfficeCalendar            src=google   sheet=OfficeCalendar       mode=ALL_CHANGES
  ExpenseClaims             src=google   sheet=ExpenseClaims        mode=ALL_CHANGES
  OfficeHoliday             src=google   sheet=OfficeHoliday        mode=ALL_CHANGES
  OfficeLeave               src=google   sheet=OfficeLeave          mode=ALL_CHANGES
  LeaveAllocation           src=google   sheet=LeaveAllocation      mode=ALL_CHANGES
  Employment_Compliance     src=google   sheet=Employment_Compliance mode=ALL_CHANGES
  Resources                 src=google   sheet=Resources            mode=ALL_CHANGES
  OfficeLocation            src=google   sheet=OfficeLocation       mode=ALL_CHANGES
  OfficeShift               src=google   sheet=OfficeShift          mode=ALL_CHANGES
  AttendanceRequest         src=google   sheet=AttendanceRequest    mode=ALL_CHANGES
  AttendanceCheckin         src=google   sheet=AttendanceCheckin    mode=ALL_CHANGES
  WorkDay                   src=google   sheet=WorkDay              mode=ALL_CHANGES
  Process for NewEmployeeCreated Process Table src=native   sheet=?                    mode=READ_ONLY
  Employee Folder Output    src=native   sheet=?                    mode=READ_ONLY
  Create Employee Folder Output src=native   sheet=?                    mode=READ_ONLY
  Set the Folder ID Output  src=native   sheet=?                    mode=READ_ONLY
  CheckForPassport Output   src=native   sheet=?                    mode=READ_ONLY
  CreatePassport Output     src=native   sheet=?                    mode=READ_ONLY
  CreatePassportBackCover Output src=native   sheet=?                    mode=READ_ONLY
  CheckForDiploma Output    src=native   sheet=?                    mode=READ_ONLY
  CreateDiploma Output      src=native   sheet=?                    mode=READ_ONLY
  CheckForLaborCard Output  src=native   sheet=?                    mode=READ_ONLY
  CreateLaborCard Output    src=native   sheet=?                    mode=READ_ONLY
  CheckForNationalID Output src=native   sheet=?                    mode=READ_ONLY
  CreateNationalID Output   src=native   sheet=?                    mode=READ_ONLY
  CheckForNoObjectionCertificate Output src=native   sheet=?                    mode=READ_ONLY
  CreateNOC Output          src=native   sheet=?                    mode=READ_ONLY
  CheckForResidencyVisa Output src=native   sheet=?                    mode=READ_ONLY
  CreateResidencyVisa Output src=native   sheet=?                    mode=READ_ONLY
  CheckForMedical Output    src=native   sheet=?                    mode=READ_ONLY
  CreateMedical Output      src=native   sheet=?                    mode=READ_ONLY
  CheckForPoliceClearance Output src=native   sheet=?                    mode=READ_ONLY
  CreatePoliceClearance Output src=native   sheet=?                    mode=READ_ONLY
  CheckReferenceLetter1 Output src=native   sheet=?                    mode=READ_ONLY
  CreateReferenceLetter1 Output src=native   sheet=?                    mode=READ_ONLY
  CheckReferenceLetter2 Output src=native   sheet=?                    mode=READ_ONLY
  CreateReferenceLetter2 Output src=native   sheet=?                    mode=READ_ONLY
  CheckFamilyBook Output    src=native   sheet=?                    mode=READ_ONLY
  CreateFamilyBook Output   src=native   sheet=?                    mode=READ_ONLY
  CheckBeforeCreatingTheChecklist Output src=native   sheet=?                    mode=READ_ONLY
  SetInputEmployeeOnChecklist Output src=native   sheet=?                    mode=READ_ONLY
  CreateTasksForEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateEmployee - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Check Employee Folder Output src=native   sheet=?                    mode=READ_ONLY
  Move Folder Output        src=native   sheet=?                    mode=READ_ONLY
  ApprovedForOffer Output   src=native   sheet=?                    mode=READ_ONLY
  Create task for offer later Output src=native   sheet=?                    mode=READ_ONLY
  create task Output        src=native   sheet=?                    mode=READ_ONLY
  CreateOfferletterTemplate Output src=native   sheet=?                    mode=READ_ONLY
  ReturnValueInDocument Output src=native   sheet=?                    mode=READ_ONLY
  Onboarding Output         src=native   sheet=?                    mode=READ_ONLY
  CommunicationForOnboarding Output src=native   sheet=?                    mode=READ_ONLY
  NewEmployeeAnouncment Output src=native   sheet=?                    mode=READ_ONLY
  CreateAppUserID Output    src=native   sheet=?                    mode=READ_ONLY
  add appuser from employee Output src=native   sheet=?                    mode=READ_ONLY
  CommunicationForNEA Output src=native   sheet=?                    mode=READ_ONLY
  CheckBeforeCreatingTheTasksForOnBoarding Output src=native   sheet=?                    mode=READ_ONLY
  SetInputEmployeeOnChecklist Output 2 src=native   sheet=?                    mode=READ_ONLY
  CreateTasksForEmployeeOnboarding Output src=native   sheet=?                    mode=READ_ONLY
  CreateOrientation Output  src=native   sheet=?                    mode=READ_ONLY
  CeckBeforeCodeOfConductCreate Output src=native   sheet=?                    mode=READ_ONLY
  CreateCodeOfConduct Output src=native   sheet=?                    mode=READ_ONLY
  CodeOfConduct Output      src=native   sheet=?                    mode=READ_ONLY
  CreateCodeOfConductDocument Output src=native   sheet=?                    mode=READ_ONLY
  CheckBeforeCreatingOneOnOneMeeting Output src=native   sheet=?                    mode=READ_ONLY
  OneOnOneMeetingForJD Output src=native   sheet=?                    mode=READ_ONLY
  CheckBeforeCreatingProbationReview Output src=native   sheet=?                    mode=READ_ONLY
  ProbationReview Output    src=native   sheet=?                    mode=READ_ONLY
  CheckBeforeCreatingEmploymentConfirmantion Output src=native   sheet=?                    mode=READ_ONLY
  EmploymentConfirmantion Output src=native   sheet=?                    mode=READ_ONLY
  CheckCommunicationColumn Output src=native   sheet=?                    mode=READ_ONLY
  CreateCommunicationRow Output src=native   sheet=?                    mode=READ_ONLY
  RemoveValueFrom CommunicationTable Output src=native   sheet=?                    mode=READ_ONLY
  Process for DocumentHandler Process Table src=native   sheet=?                    mode=READ_ONLY
  The document is updated Output src=native   sheet=?                    mode=READ_ONLY
  Update the file path Output src=native   sheet=?                    mode=READ_ONLY
  Update File ID and URL Output src=native   sheet=?                    mode=READ_ONLY
  Process for CommunicationEmail Process Table src=native   sheet=?                    mode=READ_ONLY
  Send Internal Announcement Output src=native   sheet=?                    mode=READ_ONLY
  SetTheStatusAsSent Output src=native   sheet=?                    mode=READ_ONLY
  CheckNewJoinee Output     src=native   sheet=?                    mode=READ_ONLY
  SetTheStatusAsSent NA Output src=native   sheet=?                    mode=READ_ONLY
  EmployeeOnboarding Output src=native   sheet=?                    mode=READ_ONLY
  SetTheStatusSentEmployeeOnboarding Output src=native   sheet=?                    mode=READ_ONLY
  New step Output           src=native   sheet=?                    mode=READ_ONLY
  New step 1 2 2 Output     src=native   sheet=?                    mode=READ_ONLY
  Process for DeleteEmployee - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  CheckAr Output            src=native   sheet=?                    mode=READ_ONLY
  MoveToArchived Output     src=native   sheet=?                    mode=READ_ONLY
  Process for CycleObjectiveCreation - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Review_Employee_Check Output src=native   sheet=?                    mode=READ_ONLY
  InputValue Output         src=native   sheet=?                    mode=READ_ONLY
  CreateObjective Output    src=native   sheet=?                    mode=READ_ONLY
  Process for ReviewEvaluationsCreation Process Table src=native   sheet=?                    mode=READ_ONLY
  Review_Employee_Check Output 2 src=native   sheet=?                    mode=READ_ONLY
  InputReviewEvaluationBySelf Output src=native   sheet=?                    mode=READ_ONLY
  CreaterReviewEvaluationBySelf Output src=native   sheet=?                    mode=READ_ONLY
  Process for CreateReviewEmployee - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Condition Output          src=native   sheet=?                    mode=READ_ONLY
  InputCycleEmployee Output src=native   sheet=?                    mode=READ_ONLY
  CreateReviewEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Process for ReviewEvaluationsCreationSelf Process Table src=native   sheet=?                    mode=READ_ONLY
  Review_Employee_Check Output 3 src=native   sheet=?                    mode=READ_ONLY
  InputReviewEvaluationBySelf Output 2 src=native   sheet=?                    mode=READ_ONLY
  CreaterReviewEvaluationBySelf Output 2 src=native   sheet=?                    mode=READ_ONLY
  Process for Attendance Daily Process Table src=native   sheet=?                    mode=READ_ONLY
  check Output              src=native   sheet=?                    mode=READ_ONLY
  create attendance Output  src=native   sheet=?                    mode=READ_ONLY
  Create Attendance 2 Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggersCalledFromApp Process Table src=native   sheet=?                    mode=READ_ONLY
  Create AttendanceDaily Row Output src=native   sheet=?                    mode=READ_ONLY
  Delete the AttendnaceDaily not relate to the same day Output src=native   sheet=?                    mode=READ_ONLY
  If PickDate+count is before PickDateTime Output src=native   sheet=?                    mode=READ_ONLY
  Create row for PickDate+0 Output src=native   sheet=?                    mode=READ_ONLY
  If PickDate+0 is before PickDateTime 2 Output src=native   sheet=?                    mode=READ_ONLY
  Create row for PickDate+1 Output src=native   sheet=?                    mode=READ_ONLY
  Sync Attendance Request Output src=native   sheet=?                    mode=READ_ONLY
  Sync LeaveAllocation Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerHourlyActions - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  for Unmarked attendance with check in &amp; out Output src=native   sheet=?                    mode=READ_ONLY
  Set as Present Output     src=native   sheet=?                    mode=READ_ONLY
  for tomorrow attendnace Output src=native   sheet=?                    mode=READ_ONLY
  Process for SyncAttendenceDaily - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Sync LeaveAllocation Output 2 src=native   sheet=?                    mode=READ_ONLY
  Sync Every Row Output     src=native   sheet=?                    mode=READ_ONLY
  Process for Created AttendanceRequest Process Table src=native   sheet=?                    mode=READ_ONLY
  Check for the Line Manager Output src=native   sheet=?                    mode=READ_ONLY
  Process for Weekly Calendar Update - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Process for MoveFinance Process Table src=native   sheet=?                    mode=READ_ONLY
  Check Employee Folder Output 2 src=native   sheet=?                    mode=READ_ONLY
  MoveReceiptFile Output    src=native   sheet=?                    mode=READ_ONLY
  AppFile URL Output        src=native   sheet=?                    mode=READ_ONLY
  Process for Check In-Out Reminder Text Process Table src=native   sheet=?                    mode=READ_ONLY
  Is Late CheckIn Output    src=native   sheet=?                    mode=READ_ONLY
  Is Late CheckOut Output   src=native   sheet=?                    mode=READ_ONLY
  Process for AutoAttendanceFixer - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Check Output 2            src=native   sheet=?                    mode=READ_ONLY
  AddCheckIn&amp;Out Output src=native   sheet=?                    mode=READ_ONLY
  AddCheckOut Output        src=native   sheet=?                    mode=READ_ONLY
  Process for Created ExpenseClaims Process Table src=native   sheet=?                    mode=READ_ONLY
  Check for the Line Manager Output 2 src=native   sheet=?                    mode=READ_ONLY
  Process for Approve ExpenseClaims Process Table src=native   sheet=?                    mode=READ_ONLY
  Approved Expense Update to Employee Output src=native   sheet=?                    mode=READ_ONLY
  Processed Expense Output  src=native   sheet=?                    mode=READ_ONLY
  Process for Rejected ExpenseClaims Process Table src=native   sheet=?                    mode=READ_ONLY
  Approved Expense Update to Employee Output 2 src=native   sheet=?                    mode=READ_ONLY
  Process for SyncTriggerCalendarHoliday Process Table src=native   sheet=?                    mode=READ_ONLY
  Check Output 3            src=native   sheet=?                    mode=READ_ONLY
  Execute_Sync_on_Holidays Output src=native   sheet=?                    mode=READ_ONLY
  Process for CalendarHolidaySyncBot - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 2         src=native   sheet=?                    mode=READ_ONLY
  New step 1 Output         src=native   sheet=?                    mode=READ_ONLY
  Process for HolidayCalendarSyncBot - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Check Output 4            src=native   sheet=?                    mode=READ_ONLY
  Trigger Calendar Sync Output src=native   sheet=?                    mode=READ_ONLY
  Sync this Employee Leave Balance Process Table src=native   sheet=?                    mode=READ_ONLY
  Sync this AttendanceRequest Output src=native   sheet=?                    mode=READ_ONLY
  Sync this LeaveAllocation Output src=native   sheet=?                    mode=READ_ONLY
  Process for AttendanceRequestApproval Process Table src=native   sheet=?                    mode=READ_ONLY
  Sync Balance Output       src=native   sheet=?                    mode=READ_ONLY
  Check if AttendanceDaily have to be created Output src=native   sheet=?                    mode=READ_ONLY
  Select Dates in WorkDay for AttendanceRequestn Output src=native   sheet=?                    mode=READ_ONLY
  Create Rows in AttendanceDaily Output src=native   sheet=?                    mode=READ_ONLY
  Sync Leave Balance Output src=native   sheet=?                    mode=READ_ONLY
  Process Regularization Output src=native   sheet=?                    mode=READ_ONLY
  Update Check_In and Check_Out Output src=native   sheet=?                    mode=READ_ONLY
  Process TOIL Output       src=native   sheet=?                    mode=READ_ONLY
  Create TOIL Allocation Output src=native   sheet=?                    mode=READ_ONLY
  Sending Approval Notification Output src=native   sheet=?                    mode=READ_ONLY
  Sending Rejection Notification Output src=native   sheet=?                    mode=READ_ONLY
```

## Columns
### Employee (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### _Per User Settings (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  _EMAIL: Email [HIDDEN]
  _NAME: Name [HIDDEN]
  _LOCATION: LatLong [HIDDEN]
  Options Heading: Show [HIDDEN,RO]
  Option 1: Text [HIDDEN]
  Option 2: Number [HIDDEN]
  Country Option: Enum [HIDDEN] [Values: 'Australia', 'Brazil', 'Canada']
  Language Option: Enum [HIDDEN] [Values: 'English', 'French', 'Tamil']
  Username: Text [HIDDEN]
  Role: Text [HIDDEN]
  Option 7: Text [HIDDEN]
  Option 8: Text [HIDDEN]
  Me: Enum [HIDDEN]
  _THISUSER: Text [HIDDEN] = onlyvalue
```

### Documents (18 cols)
[Inherits all 18 columns from Table: Update File ID and URL Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Project (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Code: Text
  ProjectName: Name
  ProjectDescription: LongText
  TeamEmail: EnumList
  StartDate: Date = TODAY()
  EndDate: Date = TODAY()
  FolderID: Text
  Status: Enum [Values: 'Active', 'Planning', 'Completed', 'On Hold'] = ="Active"
  LastEditedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_this])" }
  LastEditedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_this])" } { Slices Cross-Ref: Me -> AppUser }
  Related Employees: List [RO,VC]
  Related CandidateDatas: List [RO,VC]
```

### Templates (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  TemplateType: Enum [Values: 'Offer Letter', ' Welcome Email']
  TemplateName: Name
  GoogleDocTemplateLink: Url
  To: EnumList
  Description: LongText
  Version: Number
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_this])" }
  LastEditedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_this])" } { Slices Cross-Ref: Me -> AppUser }
```

### AppUser (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =IFS(
   ISNOTBLANK(
    [Employee].[WorkEmail]
  ),
   INDEX(
    SPLIT([Employee].[WorkEmail],
     "-world"),
     1
  ),
   TRUE,
   UNIQUEID()
)
  Photo: Image
  Employee: Enum
  Email: Email
  Name: Name
  Roles: EnumList = ="U_Employee"
  AccessKey: Text [HIDDEN]
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_this])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_this])" }
  AllowedRoles: List [RO]
  Related TaskLists: List [RO,VC]
  Related AttendanceRequests: List [RO,VC]
```

### TaskList (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Employee: Ref
  Category: Enum = =[CheckList].[TaskCategory]
  TaskName: Enum = =[CheckList].[TaskName]
  TaskDescription: LongText = =[CheckList].[TaskDescription]
  AssignedTo: Ref = =[CheckList].[AssignedTo]
  StartDate: Date = TODAY()
  DueDate: Date = =[StartDate]+[CheckList].[DueDays]
  Status: Enum [Values: 'Pending', 'In Progress', 'Completed', 'Blocked', 'Not Applicable'] = ="Pending"
  EndedOn: Date
  EmployeeActionRequired: Yes/No [HIDDEN] = =FALSE
  Notes: LongText
  CheckList: Enum [HIDDEN]
  CreatedBy: Enum [RO] = =ANY(Me[ID]) { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime [RO] = NOW()
  LastEditedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditedOn: DateTime = NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### CheckList (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Type: Enum [Values: 'Verification', 'Job Offer', 'Onboarding']
  TaskName: Name
  TaskDescription: LongText
  TaskCategory: Enum [Values: 'Verify', 'Approval', 'Email', 'Enter', 'Followup']
  TaskIndex: Decimal
  TaskPriority: Number
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  DueDays: Decimal
  AssignedTo: Enum
  URL: Url
  Notes: LongText
  Input_Employee: Ref
  LastEditedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Label: Text [RO]
```

### CandidateData (46 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Timestamp: DateTime = NOW()
  First Name: Name
  Last Name: Name
  Personal Email: Email
  Mobile Number: Phone
  Nationality: Text
  Current Location (City, Country): Text
  Residency Status: Text
  Full Name as per Passport: Name
  Passport Number: Text
  Passport Expiry Date: Date = TODAY()
  Bank Name: Name
  Account Number: Number
  IBAN: Text
  SWIFT Code: Text
  Routing Number: Number
  Branch Name: Name
  Passport Front Cover: Url
  Diploma: Url
  Passport Size Photo: Image
  National ID (if applicable): Url
  Residency/Visa (if applicable): Url
  Labor Card (if applicable): Url
  NOC (No Objection Certificate) (if applicable): Url
  Medical Certificate (if applicable): Url
  Bank Salary Transfer Letter (if applicable): Url
  Emergency Contact Name: Name
  Emergency Contact Number: Phone
  Emergency Contact Email: Email
  Relationship To The Emergency Contact: Text
  Medical Condition (If Any): Yes/No
  Allergies (If Any): Yes/No
  Police Clearance (if applicable): Url
  Reference Letter 1: Url
  Family Book (if applicable): Text
  Email address: Email
  Reference Letter 2: Url
  Passport Back Cover: Url
  Project: Ref
  EmployeeCode: Text (→"="Employee Code"")
  OfficeLocation: Ref
  OfficeCalendar: Ref { Logic: [ValidIf]="=FILTER(
  "OfficeCalendar",
  AND(
    [Status]="Active",
    [OfficeLocation]=[_THISROW].[OfficeLocation]
  )
)" }
  Employee: Ref [RO]
  _ComputedName: Name [RO,VC]
  Related Employees: List [HIDDEN,RO,VC]
```

### Communication (16 cols)
[Inherits all 16 columns from Table: SetTheStatusAsSent Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### DocType (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Name: Name
  Description: LongText
  RedAlert: Number
  OrangeAlert: Number
  YellowAlert: Number
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### AppViews (21 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text
  Type: Enum
  View: Enum
  Group: Enum
  Category: Enum
  Name: Name
  Description: Text
  Icon: Image
  Link: Url
  AllowOnly: EnumList
  AllowValues: EnumList
  AllowMultiple: EnumList
  AllowRoles: EnumList
  MinQty: Decimal
  MaxQty: Decimal
  MinAmount: Number
  MaxAmount: Number
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  AppLink: App [RO]
```

### AppSettings (17 cols)
[Inherits all 17 columns from Table: Sync LeaveAllocation Output 2]
+ Modified/Added Columns:
  - _RowNumber: Number

### AppVariables (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  Tags: EnumList [Values: 'System', 'Standard', 'Migration', 'Company', 'Configuration', 'Custom', 'Outdated']
  ValueControl: EnumList [Values: 'Date', 'Decimal', 'Enum', 'File', 'Multi', 'Photo', 'URL']
  Title: Text
  UsedFor: Text
  Decimal: Decimal { Logic: [EditIf]="=in("Decimal",[ValueControl])" }
  EnumValue: Enum { Logic: [EditIf]="=in("Enum",[ValueControl])" }
  MultiValues: EnumList { Logic: [EditIf]="=in("Multi",[ValueControl])" }
  DateValue: Date = TODAY() { Logic: [EditIf]="=in("Date",[ValueControl])" }
  Photo: Image { Logic: [EditIf]="=in("Photo",[ValueControl])" }
  URL: Url { Logic: [EditIf]="=in("URL",[ValueControl])" }
  File: File { Logic: [EditIf]="=in("File",[ValueControl])" }
  Description: LongText
  EnumList: EnumList
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=isblank([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=isblank([_THIS])" }
  Related AttendanceDailys: List [RO,VC]
```

### AppTriggers (16 cols)
[Inherits all 16 columns from Table: Delete the AttendnaceDaily not relate to the same day Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### ReviewCycles (26 cols)
[Inherits all 26 columns from Table: InputValue Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### ReviewEmployee (20 cols)
[Inherits all 20 columns from Table: InputReviewEvaluationBySelf Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### ReviewObjective (22 cols)
[Inherits all 22 columns from Table: InputReviewEvaluationBySelf Output 2]
+ Modified/Added Columns:
  - _RowNumber: Number

### ReviewEvaluations (22 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  EmployeeReview: Ref { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Objective: Enum { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Type: Enum { Logic: [ValidIf]="=SPLIT( LOOKUP(
  "Emp_ReviewCycles_Type",
   "AppVariables",
   "ID",
   "EnumValue"
) , ", " )" | [EditIf]="=AND(
   ISBLANK([_THIS]),
   OR(
     AND(
       [Type] = "Cycle_Annual",
       TODAY() >= [EmployeeReview].[Cycle].[AppraisalStart],
       TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd]
    ),
     AND(
       [Type] = "Cycle_Mid",
       TODAY() >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd]
    )
  )
)" }
  SelfRating: Number (→"=SWITCH(
  [SelfRating],
  "1","Rating = 1 ; Does Not Meet Expectations",
  "2","Rating = 2 ; Needs Support",
  "3","Rating = 3 ; Partially Meets Expectations",
  "4","Rating = 4 ; Meets Expectations",
  "5","Rating = 5 ; Exceeds Expectations",
  "Rating"
)") { Logic: [EditIf]="=AND(
   ISBLANK([_THIS]),
   ANY(
    Me[Employee]
  ) = [EmployeeReview].[Employee],
   OR(
    AND(
       TODAY() >= [EmployeeReview].[Cycle].[SelfReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfReviewEnd]
    ),
     AND(
       [Type] = "Cycle_Annual",
       TODAY() >= [EmployeeReview].[Cycle].[SelfReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfReviewEnd]
    ),
     AND(
       [Type] = "Cycle_Mid",
       TODAY() >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd]
    )
  )
)" } { Slices Cross-Ref: Me -> AppUser }
  SelfRemarks: LongText { Logic: [EditIf]="=AND(
   ISBLANK([_THIS]),
   ANY(
    Me[Employee]
  ) = [EmployeeReview].[Employee],
   OR(
    AND(
       TODAY() >= [EmployeeReview].[Cycle].[SelfReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfReviewEnd]
    ),
     AND(
       [Type] = "Cycle_Annual",
       TODAY() >= [EmployeeReview].[Cycle].[SelfReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfReviewEnd]
    ),
     AND(
       [Type] = "Cycle_Mid",
       TODAY() >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd]
    )
  )
)" } { Slices Cross-Ref: Me -> AppUser }
  ManagerRemarks: LongText { Logic: [EditIf]="=AND(
   ISBLANK([_THIS]),
   ANY(
    Me[ID]
  ) = [EmployeeReview].[Employee].[ReportingOfficer],
   OR(
     AND(
       TODAY() >= [EmployeeReview].[Cycle].[AppraisalStart],
       TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd]
    ),
     AND(
       [Type] = "Cycle_Annual",
       TODAY() >= [EmployeeReview].[Cycle].[AppraisalStart],
       TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd]
    ),
     AND(
       [Type] = "Cycle_Mid",
       TODAY() >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd]
    )
  )
)" } { Slices Cross-Ref: Me -> AppUser }
  ManagerRating: Number (→"=SWITCH(
  [ManagerRating],
  1,"Rating = 1 ; Does Not Meet Expectations",
  2,"Rating = 2 ; Needs Support",
  3,"Rating = 3 ; Partially Meets Expectations",
  4,"Rating = 4 ; Meets Expectations",
  5,"Rating = 5 ; Exceeds Expectations",
  "ManagerRating"
)") { Logic: [EditIf]="=AND(
   ISBLANK([_THIS]),
   ANY(
    Me[ID]
  ) = [EmployeeReview].[Employee].[ReportingOfficer],
   OR(
     AND(
       TODAY() >= [EmployeeReview].[Cycle].[AppraisalStart],
       TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd]
    ),
     AND(
       [Type] = "Cycle_Annual",
       TODAY() >= [EmployeeReview].[Cycle].[AppraisalStart],
       TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd]
    ),
     AND(
       [Type] = "Cycle_Mid",
       TODAY() >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd]
    )
  )
)" } { Slices Cross-Ref: Me -> AppUser }
  Evidence_File: File { Logic: [ShowIf]="=[Objective].[EvidenceRequirement] <> "Not Applicable"" | [ReqIf]="=IF(
   [Objective].[EvidenceRequirement] = "Mandatory",
   AND(
    ISNOTBLANK(
      [SelfRating]
    ),
     ISNOTBLANK(
      [SelfRemarks]
    )
  ),
   FALSE
)" | [EditIf]="=AND(
   ISBLANK([_THIS]),
   OR(
     ANY(
      Me[ID]
    ) = [EmployeeReview].[Employee].[ID],
     ANY(
      Me[ID]
    ) = [EmployeeReview].[Employee].[ReportingOfficer]
  ),
   OR(
     AND(
       [Type] = "Cycle_Annual",
       TODAY() >= [EmployeeReview].[Cycle].[AppraisalStart],
       TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd]
    ),
     AND(
       [Type] = "Cycle_Mid",
       TODAY() >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd]
    )
  )
)" } { Slices Cross-Ref: Me -> AppUser }
  Evidence_URL: Url { Logic: [ShowIf]="=[Objective].[EvidenceRequirement] <> "Not Applicable"" | [ReqIf]="=IF(
   [Objective].[EvidenceRequirement] = "Mandatory",
   AND(
    ISNOTBLANK(
      [SelfRating]
    ),
     ISNOTBLANK(
      [SelfRemarks]
    )
  ),
   FALSE
)" | [EditIf]="=AND(
   ISBLANK([_THIS]),
   OR(
     ANY(
      Me[ID]
    ) = [EmployeeReview].[Employee].[ID],
     ANY(
      Me[ID]
    ) = [EmployeeReview].[Employee].[ReportingOfficer]
  ),
   OR(
     AND(
       [Type] = "Cycle_Annual",
       TODAY() >= [EmployeeReview].[Cycle].[AppraisalStart],
       TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd]
    ),
     AND(
       [Type] = "Cycle_Mid",
       TODAY() >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
       TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd]
    )
  )
)" } { Slices Cross-Ref: Me -> AppUser }
  Status: Enum
  Timestamp: DateTime = NOW()
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Question: Show [RO]
  Description: Show [RO]
  Instructions: Show [RO]
  HelpVideo: Show [RO] { Logic: [ShowIf]="=ISNOTBLANK([Objective].[VideoGuide])" }
  Head: Show [RO]
  Cycle: Ref [RO]
  Lable: Ref [RO]
```

### AttendanceDaily (32 cols)
[Inherits all 34 columns from Table: Process for Check In-Out Reminder Text Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### AttendanceMonthly (48 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =[MonthYear]&"-"&[Employee]
  MonthYear: Enum
  Employee: Ref
  Day_01: Enum
  Day_02: Enum
  Day_03: Enum
  Day_04: Enum
  Day_05: Enum
  Day_06: Enum
  Day_07: Enum
  Day_08: Enum
  Day_09: Enum
  Day_10: Enum
  Day_11: Enum
  Day_12: Enum
  Day_13: Enum
  Day_14: Enum
  Day_15: Enum
  Day_16: Enum
  Day_17: Enum
  Day_18: Enum
  Day_19: Enum
  Day_20: Enum
  Day_21: Enum
  Day_22: Enum
  Day_23: Enum
  Day_24: Enum
  Day_25: Enum
  Day_26: Enum
  Day_27: Enum
  Day_28: Enum
  Day_29: Enum
  Day_30: Enum
  Day_31: Enum
  Total_WorkDay: Number
  Total_Present: Number
  Total_Absent: Number
  Total_Leave: Number
  Total_Paid_Leave: Number
  Total_Unpaid_Leave: Number
  Total_Holiday: Number
  Total_WeekOff: Number
  Status: Enum [Values: 'Open', 'Finalized', 'Archived']
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Year: Text [RO]
  Month: Text [RO]
```

### OfficeCalendar (18 cols)
[Inherits all 18 columns from Table: Execute_Sync_on_Holidays Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### ExpenseClaims (18 cols)
[Inherits all 18 columns from Table: AppFile URL Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### OfficeHoliday (11 cols)
[Inherits all 11 columns from Table: Trigger Calendar Sync Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### OfficeLeave (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  LeaveType: Enum
  AllocationCycle: Enum
  LeaveCount: Number
  Applicable_Calendars: EnumList
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Lable: Text [RO]
```

### LeaveAllocation (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Date: Date = TODAY()
  Employee: Enum
  LeaveType: Enum
  OfficeLeave: Enum
  AttendanceRequest: Ref
  Quantity: Decimal
  StartDate: Date = TODAY()
  EndDate: Date = =EOMONTH(DATE(YEAR(TODAY()) & "-12-01"), 0)
  Used: Decimal
  Available: Decimal
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Label: Text [RO]
  LeaveApplications: List [RO]
```

### Employment_Compliance (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Country: Enum
  EmploymentType: Enum [Values: 'Full Time', 'Part Time']
  EmploymentCategory: Enum
  WorkHours_Daily: Decimal
  WorkHours_Weekly: Decimal
  WorkHours_Monthly: Decimal
  WeekDays: EnumList [Values: 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  LabourCompliance: EnumList
  PayrollCompliance: EnumList
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### Resources (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Category: EnumList
  Tags: EnumList
  Title: Text
  Description: LongText
  Instruction: LongText
  Photo: Image
  Link: Url
  File: File
  Video: Video
  Roles: EnumList { Logic: [ValidIf]="=SPLIT( LOOKUP(
  "AppUserRoles",
   "AppVariables",
   "ID",
   "EnumValue"
), ", " )" }
  Standard: Yes/No [HIDDEN] = =IF(ANY(Me[ID])="OmmNoMi",TRUE,FALSE) { Slices Cross-Ref: Me -> AppUser }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### OfficeLocation (12 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Name: Name
  Country: Text
  State: Text
  Address: Address
  UTC_Offset: Enum [Values: '000:00:00', '004:00:00'] (→"=Time Zone")
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LatLong: LatLong
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Related CandidateDatas: List [RO,VC]
```

### OfficeShift (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum [Values: 'Fixed', 'Flexible', 'Day Off'] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  ISO_WeekDay: Number
  WeekDay: Enum { Logic: [EditIf]="=Not(IN([ID], OfficeShift[ID]))" }
  StartTime: Time { Logic: [EditIf]="=Not(IN([ID], OfficeShift[ID]))" }
  EndTime: Time { Logic: [EditIf]="=Not(IN([ID], OfficeShift[ID]))" }
  FullDayHours: Number { Logic: [EditIf]="=ISBLANK([_THIS])" }
  HalfDayHours: Number { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Applicable_Calendars: EnumList
  Status: Enum [Values: 'Active'] = ="Active"
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Label: Name [RO]
```

### AttendanceRequest (31 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### AttendanceCheckin (2 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
```

### WorkDay (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Date: Date = TODAY()
  AppTrigger: Enum
  TriggerValue: Text
  TriggeredOn: DateTime
```

### Process for NewEmployeeCreated Process Table (101 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]
+ Modified/Added Columns:
  - Employee Folder: Ref
  - Create Employee Folder: Ref
  - Set the Folder ID: Ref
  - CheckForPassport: Ref
  - CreatePassport: Ref
  - CreatePassportBackCover: Ref
  - CheckForDiploma: Ref
  - CreateDiploma: Ref
  - CheckForLaborCard: Ref
  - CreateLaborCard: Ref
  - CheckForNationalID: Ref
  - CreateNationalID: Ref
  - CheckForNoObjectionCertificate: Ref
  - CreateNOC: Ref
  - CheckForResidencyVisa: Ref
  - CreateResidencyVisa: Ref
  - CheckForMedical: Ref
  - CreateMedical: Ref
  - CheckForPoliceClearance: Ref
  - CreatePoliceClearance: Ref
  - CheckReferenceLetter1: Ref
  - CreateReferenceLetter1: Ref
  - CheckReferenceLetter2: Ref
  - CreateReferenceLetter2: Ref
  - CheckFamilyBook: Ref
  - CreateFamilyBook: Ref
  - CheckBeforeCreatingTheChecklist: Ref
  - SetInputEmployeeOnChecklist: Ref
  - CreateTasksForEmployee: Ref

### Employee Folder Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Employee Folder Output (3 cols)
```
  Instance Id: Text
  id: Text
  url: Url
```

### Set the Folder ID Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForPassport Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreatePassport Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CreatePassportBackCover Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForDiploma Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateDiploma Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForLaborCard Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateLaborCard Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForNationalID Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateNationalID Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForNoObjectionCertificate Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateNOC Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForResidencyVisa Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateResidencyVisa Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForMedical Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateMedical Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckForPoliceClearance Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreatePoliceClearance Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckReferenceLetter1 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateReferenceLetter1 Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckReferenceLetter2 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateReferenceLetter2 Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckFamilyBook Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateFamilyBook Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckBeforeCreatingTheChecklist Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetInputEmployeeOnChecklist Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CreateTasksForEmployee Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### Process for UpdateEmployee - 1 Process Table (102 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]
+ Modified/Added Columns:
  - Check Employee Folder: Ref
  - Move Folder: Ref
  - ApprovedForOffer: Ref
  - Create task for offer later: Ref
  - create task: Ref
  - CreateOfferletterTemplate: Ref
  - ReturnValueInDocument: Ref
  - Onboarding: Ref
  - CommunicationForOnboarding: Ref
  - NewEmployeeAnouncment: Ref
  - CreateAppUserID: Ref
  - add appuser from employee: Ref
  - CommunicationForNEA: Ref
  - CheckBeforeCreatingTheTasksForOnBoarding: Ref
  - SetInputEmployeeOnChecklist: Ref
  - CreateTasksForEmployeeOnboarding: Ref
  - CreateOrientation: Ref
  - CeckBeforeCodeOfConductCreate: Ref
  - CreateCodeOfConduct: Ref
  - CodeOfConduct: Ref
  - CreateCodeOfConductDocument: Ref
  - CheckBeforeCreatingOneOnOneMeeting: Ref
  - OneOnOneMeetingForJD: Ref
  - CheckBeforeCreatingProbationReview: Ref
  - ProbationReview: Ref
  - CheckBeforeCreatingEmploymentConfirmantion: Ref
  - EmploymentConfirmantion: Ref
  - CheckCommunicationColumn: Ref
  - CreateCommunicationRow: Ref
  - RemoveValueFrom CommunicationTable: Ref

### Check Employee Folder Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Move Folder Output (1 cols)
```
  Instance Id: Text
```

### ApprovedForOffer Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create task for offer later Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### create task Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CreateOfferletterTemplate Output (3 cols)
```
  Instance Id: Text
  fileURL: Url
  fileName: Text
```

### ReturnValueInDocument Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### Onboarding Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CommunicationForOnboarding Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### NewEmployeeAnouncment Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateAppUserID Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### add appuser from employee Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CommunicationForNEA Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckBeforeCreatingTheTasksForOnBoarding Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetInputEmployeeOnChecklist Output 2 (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CreateTasksForEmployeeOnboarding Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CreateOrientation Output (1 cols)
```
  Instance Id: Text
```

### CeckBeforeCodeOfConductCreate Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateCodeOfConduct Output (3 cols)
```
  Instance Id: Text
  fileName: Name
  fileURL: Url
```

### CodeOfConduct Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CreateCodeOfConductDocument Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### CheckBeforeCreatingOneOnOneMeeting Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### OneOnOneMeetingForJD Output (1 cols)
```
  Instance Id: Text
```

### CheckBeforeCreatingProbationReview Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### ProbationReview Output (1 cols)
```
  Instance Id: Text
```

### CheckBeforeCreatingEmploymentConfirmantion Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### EmploymentConfirmantion Output (1 cols)
```
  Instance Id: Text
```

### CheckCommunicationColumn Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateCommunicationRow Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### RemoveValueFrom CommunicationTable Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### Process for DocumentHandler Process Table (21 cols)
[Inherits all 18 columns from Table: Documents]
+ Modified/Added Columns:
  - Instance Id: Text
  - The document is updated: Ref
  - Update the file path: Ref
  - Update File ID and URL: Ref

### The document is updated Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update the file path Output (3 cols)
```
  Instance Id: Text
  fileID: Text
  fileURL: Url
```

### Update File ID and URL Output (18 cols)
[Inherits all 18 columns from Table: Documents]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for CommunicationEmail Process Table (24 cols)
[Inherits all 16 columns from Table: Communication]
+ Modified/Added Columns:
  - Instance Id: Text
  - Send Internal Announcement: Ref
  - SetTheStatusAsSent: Ref
  - CheckNewJoinee: Ref
  - SetTheStatusAsSent NA: Ref
  - EmployeeOnboarding: Ref
  - SetTheStatusSentEmployeeOnboarding: Ref
  - New step: Ref
  - New step 1 2 2: Ref

### Send Internal Announcement Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetTheStatusAsSent Output (16 cols)
[Inherits all 16 columns from Table: Communication]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckNewJoinee Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetTheStatusAsSent NA Output (16 cols)
[Inherits all 16 columns from Table: Communication]
+ Modified/Added Columns:
  - Instance Id: Text

### EmployeeOnboarding Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetTheStatusSentEmployeeOnboarding Output (16 cols)
[Inherits all 16 columns from Table: Communication]
+ Modified/Added Columns:
  - Instance Id: Text

### New step Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### New step 1 2 2 Output (1 cols)
```
  Instance Id: Text
```

### Process for DeleteEmployee - 1 Process Table (74 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]
+ Modified/Added Columns:
  - CheckAr: Ref
  - MoveToArchived: Ref

### CheckAr Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### MoveToArchived Output (1 cols)
```
  Instance Id: Text
```

### Process for CycleObjectiveCreation - 1 Process Table (29 cols)
[Inherits all 26 columns from Table: ReviewCycles]
+ Modified/Added Columns:
  - Instance Id: Text
  - Review_Employee_Check: Ref
  - InputValue: Ref
  - CreateObjective: Ref

### Review_Employee_Check Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### InputValue Output (26 cols)
[Inherits all 26 columns from Table: ReviewCycles]
+ Modified/Added Columns:
  - Instance Id: Text

### CreateObjective Output (26 cols)
[Inherits all 26 columns from Table: ReviewCycles]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for ReviewEvaluationsCreation Process Table (23 cols)
[Inherits all 20 columns from Table: ReviewEmployee]
+ Modified/Added Columns:
  - Instance Id: Text
  - Review_Employee_Check: Ref
  - InputReviewEvaluationBySelf: Ref
  - CreaterReviewEvaluationBySelf: Ref

### Review_Employee_Check Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### InputReviewEvaluationBySelf Output (20 cols)
[Inherits all 20 columns from Table: ReviewEmployee]
+ Modified/Added Columns:
  - Instance Id: Text

### CreaterReviewEvaluationBySelf Output (20 cols)
[Inherits all 20 columns from Table: ReviewEmployee]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for CreateReviewEmployee - 1 Process Table (29 cols)
[Inherits all 26 columns from Table: ReviewCycles]
+ Modified/Added Columns:
  - Instance Id: Text
  - Condition: Ref
  - InputCycleEmployee: Ref
  - CreateReviewEmployee: Ref

### Condition Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### InputCycleEmployee Output (26 cols)
[Inherits all 26 columns from Table: ReviewCycles]
+ Modified/Added Columns:
  - Instance Id: Text

### CreateReviewEmployee Output (26 cols)
[Inherits all 26 columns from Table: ReviewCycles]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for ReviewEvaluationsCreationSelf Process Table (25 cols)
[Inherits all 22 columns from Table: ReviewObjective]
+ Modified/Added Columns:
  - Instance Id: Text
  - Review_Employee_Check: Ref
  - InputReviewEvaluationBySelf: Ref
  - CreaterReviewEvaluationBySelf: Ref

### Review_Employee_Check Output 3 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### InputReviewEvaluationBySelf Output 2 (22 cols)
[Inherits all 22 columns from Table: ReviewObjective]
+ Modified/Added Columns:
  - Instance Id: Text

### CreaterReviewEvaluationBySelf Output 2 (22 cols)
[Inherits all 22 columns from Table: ReviewObjective]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for Attendance Daily Process Table (75 cols)
[Inherits all 74 columns from Table: Process for DeleteEmployee - 1 Process Table]
+ Modified/Added Columns:
  - check: Ref
  - create attendance: Ref
  - Create Attendance 2: Ref

### check Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### create attendance Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### Create Attendance 2 Output (72 cols)
[Inherits all 75 columns from Table: Process for Attendance Daily Process Table]

### Process for TriggersCalledFromApp Process Table (24 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Create AttendanceDaily Row: Ref
  - Delete the AttendnaceDaily not relate to the same day: Ref
  - If PickDate+count is before PickDateTime: Ref
  - Create row for PickDate+0: Ref
  - If PickDate+0 is before PickDateTime 2: Ref
  - Create row for PickDate+1: Ref
  - Sync Attendance Request: Ref
  - Sync LeaveAllocation: Ref

### Create AttendanceDaily Row Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete the AttendnaceDaily not relate to the same day Output (16 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### If PickDate+count is before PickDateTime Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create row for PickDate+0 Output (16 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### If PickDate+0 is before PickDateTime 2 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create row for PickDate+1 Output (16 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Sync Attendance Request Output (16 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Sync LeaveAllocation Output (16 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggerHourlyActions - 1 Process Table (19 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - for Unmarked attendance with check in & out: Ref
  - Set as Present: Ref
  - for tomorrow attendnace: Ref

### for Unmarked attendance with check in &amp; out Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set as Present Output (16 cols)
[Inherits all 16 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### for tomorrow attendnace Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for SyncAttendenceDaily - 1 Process Table (19 cols)
[Inherits all 17 columns from Table: AppSettings]
+ Modified/Added Columns:
  - Instance Id: Text
  - Sync LeaveAllocation: Ref
  - Sync Every Row: Ref

### Sync LeaveAllocation Output 2 (17 cols)
[Inherits all 17 columns from Table: AppSettings]
+ Modified/Added Columns:
  - Instance Id: Text

### Sync Every Row Output (17 cols)
[Inherits all 17 columns from Table: AppSettings]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for Created AttendanceRequest Process Table (32 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]
+ Modified/Added Columns:
  - Check for the Line Manager: Ref

### Check for the Line Manager Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for Weekly Calendar Update - 1 Process Table (1 cols)
```
  Instance Id: Text
```

### Process for MoveFinance Process Table (21 cols)
[Inherits all 20 columns from Table: Process for Approve ExpenseClaims Process Table]
+ Modified/Added Columns:
  - Check Employee Folder: Ref
  - MoveReceiptFile: Ref
  - AppFile URL: Ref

### Check Employee Folder Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### MoveReceiptFile Output (3 cols)
```
  Instance Id: Text
  fileID: Text
  fileURL: Url
```

### AppFile URL Output (18 cols)
[Inherits all 20 columns from Table: Process for Approve ExpenseClaims Process Table]

### Process for Check In-Out Reminder Text Process Table (34 cols)
[Inherits all 35 columns from Table: Process for AutoAttendanceFixer - 1 Process Table]
+ Modified/Added Columns:
  - Is Late CheckIn: Ref
  - Is Late CheckOut: Ref

### Is Late CheckIn Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Is Late CheckOut Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for AutoAttendanceFixer - 1 Process Table (35 cols)
[Inherits all 34 columns from Table: Process for Check In-Out Reminder Text Process Table]
+ Modified/Added Columns:
  - Check: Ref
  - AddCheckIn&Out: Ref
  - AddCheckOut: Ref

### Check Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### AddCheckIn&amp;Out Output (32 cols)
[Inherits all 35 columns from Table: Process for AutoAttendanceFixer - 1 Process Table]

### AddCheckOut Output (32 cols)
[Inherits all 35 columns from Table: Process for AutoAttendanceFixer - 1 Process Table]

### Process for Created ExpenseClaims Process Table (19 cols)
[Inherits all 20 columns from Table: Process for Approve ExpenseClaims Process Table]
+ Modified/Added Columns:
  - Check for the Line Manager: Ref

### Check for the Line Manager Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for Approve ExpenseClaims Process Table (20 cols)
[Inherits all 19 columns from Table: Process for Created ExpenseClaims Process Table]
+ Modified/Added Columns:
  - Approved Expense Update to Employee: Ref
  - Processed Expense: Ref

### Approved Expense Update to Employee Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Processed Expense Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for Rejected ExpenseClaims Process Table (19 cols)
[Inherits all 20 columns from Table: Process for Approve ExpenseClaims Process Table]

### Approved Expense Update to Employee Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for SyncTriggerCalendarHoliday Process Table (20 cols)
[Inherits all 20 columns from Table: Process for CalendarHolidaySyncBot - 1 Process Table]
+ Modified/Added Columns:
  - Check: Ref
  - Execute_Sync_on_Holidays: Ref

### Check Output 3 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Execute_Sync_on_Holidays Output (18 cols)
[Inherits all 20 columns from Table: Process for SyncTriggerCalendarHoliday Process Table]

### Process for CalendarHolidaySyncBot - 1 Process Table (20 cols)
[Inherits all 20 columns from Table: Process for SyncTriggerCalendarHoliday Process Table]
+ Modified/Added Columns:
  - New step: Ref
  - New step 1: Ref

### New step Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### New step 1 Output (18 cols)
[Inherits all 20 columns from Table: Process for SyncTriggerCalendarHoliday Process Table]

### Process for HolidayCalendarSyncBot - 1 Process Table (13 cols)
[Inherits all 11 columns from Table: OfficeHoliday]
+ Modified/Added Columns:
  - Instance Id: Text
  - Check: Ref
  - Trigger Calendar Sync: Ref

### Check Output 4 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Trigger Calendar Sync Output (11 cols)
[Inherits all 11 columns from Table: OfficeHoliday]
+ Modified/Added Columns:
  - Instance Id: Text

### Sync this Employee Leave Balance Process Table (33 cols)
[Inherits all 32 columns from Table: Process for Created AttendanceRequest Process Table]
+ Modified/Added Columns:
  - Sync this AttendanceRequest: Ref
  - Sync this LeaveAllocation: Ref

### Sync this AttendanceRequest Output (31 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]

### Sync this LeaveAllocation Output (31 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]

### Process for AttendanceRequestApproval Process Table (42 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]
+ Modified/Added Columns:
  - Sync Balance: Ref
  - Check if AttendanceDaily have to be created: Ref
  - Select Dates in WorkDay for AttendanceRequestn: Ref
  - Create Rows in AttendanceDaily: Ref
  - Sync Leave Balance: Ref
  - Process Regularization: Ref
  - Update Check_In and Check_Out: Ref
  - Process TOIL: Ref
  - Create TOIL Allocation: Ref
  - Sending Approval Notification: Ref
  - Sending Rejection Notification: Ref

### Sync Balance Output (1 cols)
```
  Instance Id: Text
```

### Check if AttendanceDaily have to be created Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Select Dates in WorkDay for AttendanceRequestn Output (31 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]

### Create Rows in AttendanceDaily Output (31 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]

### Sync Leave Balance Output (1 cols)
```
  Instance Id: Text
```

### Process Regularization Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update Check_In and Check_Out Output (31 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]

### Process TOIL Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create TOIL Allocation Output (31 cols)
[Inherits all 33 columns from Table: Sync this Employee Leave Balance Process Table]

### Sending Approval Notification Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Sending Rejection Notification Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

## Slices
- **Me** (AppUser): `=AND(
  [Email]=USEREMAIL(),
  [Status]="Active"
)`
- **MyTasks** (TaskList): `=OR(ISBLANK([AssignedTo]), ANY(Me[ID]) = [AssignedTo],ANY(Me[Employee])=[Employee],[EndedOn]<=TODAY()-30)`
- **ActiveEmployee** (Employee): `=AND(
    [Status]<>"Resigned",
  [Status]<>"Separated"
  , OR(
    [Status] = "Probation",
    [Status] = "Confirmed"
  )
)`
- **Admin_View** (AppViews): `=AND(
  [Type] = "Admin",
  ISNOTBLANK(INTERSECT([AllowRoles],SPLIT(ANY(Me[Roles]),",")))
)`
- **Employee_View** (AppViews): `=AND(
  [Type] = "Employee",
  ISNOTBLANK(INTERSECT([AllowRoles],SPLIT(ANY(Me[Roles]),",")))
)`
- **Finance_View** (AppViews): `=AND(
  [Type] = "Finance",
  ISNOTBLANK(INTERSECT([AllowRoles],SPLIT(ANY(Me[Roles]),",")))
)`
- **People_View** (AppViews): `=AND(
  [Type] = "People",
  ISNOTBLANK(INTERSECT([AllowRoles],SPLIT(ANY(Me[Roles]),",")))
)`
- **EmployeeReview** (ReviewEmployee): `=ANY(Me[Employee])=[Employee]`
- **My_Team** (AppViews): `=AND(
  [Type] = "MyTeam",
  ISNOTBLANK(INTERSECT([AllowRoles],SPLIT(ANY(Me[Roles]),",")))
)`
- **MyTeamReview** (ReviewEmployee): `=[Employee].[ReportingOfficer] = ANY(Me[Employee])`
- **MyTeam** (Employee): `=AND(
  IN("U_Reporting_Officer", SPLIT(ANY(Me[Roles]), ",")), 
  [ReportingOfficer] = ANY(Me[ID]),
  [Status] <> "Separated"
)`
- **TeamTasks** (TaskList): `=IN(
  [Employee], 
  SELECT(Employee[ID], [ReportingOfficer] = ANY(Me[ID]))
)`
- **MyAttendanceToday** (AttendanceDaily): `=AND([Employee]=ANY(Me[Employee]), [Date] = TODAY())`
- **MyAttendance** (AttendanceDaily): ``
- **Project_View** (AppViews): `=AND(
  [Type] = "Project",
  ISNOTBLANK(INTERSECT([AllowRoles],SPLIT(ANY(Me[Roles]),",")))
)`
- **MyAttendenceHistory** (AttendanceDaily): `=[Employee]=ANY(Me[Employee])`
- **MyProfile** (Employee): `=[ID]=ANY(Me[Employee])`

## Views
### Custom Views
- **My_Team**: card → ? pos=center
- **Employee_Dash**: dashboard → ? pos=left
- **Resources_View_Mobile**: card → ? pos=right most
- **Project_View**: card → ? pos=menu
- **People_View**: card → ? pos=menu
- **Finance_View**: card → ? pos=menu
- **Resources_View**: card → ? pos=menu
- **Admin_View**: card → ? pos=menu
- **ActiveEmployee**: table → ? pos=ref
- **Admin**: dashboard → ? pos=ref
- **AllAttendance**: table → ? pos=ref
- **AppSettings**: table → ? pos=ref
- **AppTriggers**: table → ? pos=ref
- **AppVariables**: table → ? pos=ref
- **AppViews**: table → ? pos=ref
- **Attendance**: calendar → ? pos=ref
- **AttendanceCalendar**: calendar → ? pos=ref
- **AttendanceDaily_Inline**: table → ? pos=ref
- **AttendanceMonthly_Inline**: table → ? pos=ref
- **AttendanceRequest**: table → ? pos=ref
- **AttendanceRequest_Inline**: table → ? pos=ref
- **AttendanceRequestCalendar**: calendar → ? pos=ref
- **CandidateData**: table → ? pos=ref
- **CandidateData_Inline**: deck → ? pos=ref
- **CheckList**: deck → ? pos=ref
- **Checklist_Inline**: table → ? pos=ref
- **Communication**: table → ? pos=ref
- **Communication_Inline**: table → ? pos=ref
- **DocType**: table → ? pos=ref
- **Document_Inline**: table → ? pos=ref
- **Documents**: table → ? pos=ref
- **Employee**: table → ? pos=ref
- **Employee_Inline**: deck → ? pos=ref
- **Employee_View**: card → ? pos=ref
- **EmployeeReview**: card → ? pos=ref
- **EmployeeReviewObjective**: table → ? pos=ref
- **ExpenseClaims**: table → ? pos=ref
- **Holiday_List**: table → ? pos=ref
- **LeaveAllocation**: table → ? pos=ref
- **LeaveAllocation_Inline**: table → ? pos=ref
- **My_Profile**: form → ? pos=ref
- **MyAttendanceToday**: detail → ? pos=ref
- **MyAttendanceTodayMyTeam**: table → ? pos=ref
- **MyTasks**: dashboard → ? pos=ref
- **MyTeam**: card → ? pos=ref
- **MyTeamReview**: table → ? pos=ref
- **MyTeamTasks**: table → ? pos=ref
- **Office_Calender**: table → ? pos=ref
- **Office_Locations**: card → ? pos=ref
- **OfficeLeave**: table → ? pos=ref
- **OfficeShift**: table → ? pos=ref
- **Project**: deck → ? pos=ref
- **PunchScreen**: detail → ? pos=ref
- **ReviewCycle**: table → ? pos=ref
- **ReviewEmployee**: table → ? pos=ref
- **ReviewEvaluations_Inline**: table → ? pos=ref
- **ReviewEvalvation**: table → ? pos=ref
- **ReviewObjective**: table → ? pos=ref
- **ReviewObjective_Inline**: table → ? pos=ref
- **TaskList_Inline**: table → ? pos=ref
- **Templates**: deck → ? pos=ref
- **Users**: table → ? pos=ref
### Auto-generated (84)
  ActiveEmployee_Detail, ActiveEmployee_Form, Admin View_Detail, Admin View_Form, AppSettings_Detail, AppSettings_Form, AppTriggers_Detail, AppTriggers_Form, AppUser_Detail, AppUser_Form, AppVariables_Detail, AppVariables_Form, AppViews_Detail, AppViews_Form, AttendanceCheckin_Detail, AttendanceCheckin_Form, AttendanceDaily_Detail, AttendanceDaily_Form, AttendanceMonthly_Detail, AttendanceMonthly_Form, AttendanceRequest_Detail, AttendanceRequest_Form, CandidateData_Detail, CandidateData_Form, Checklist_Detail, Checklist_Form, Communication_Detail, Communication_Form, Days_Reference_Detail, Days_Reference_Form, DocType_Detail, DocType_Form, Document_Detail, Document_Form, Employee View_Detail, Employee View_Form, Employee_Detail, Employee_Form, ExpenseClaims_Detail, ExpenseClaims_Form, Finance_Detail, Finance_Form, LeaveAllocation_Detail, LeaveAllocation_Form, My_Team 2_Detail, My_Team 2_Form, My_Team_Detail, My_Team_Form, MyTasks_Detail, MyTasks_Form, MyTeam_Detail, MyTeam_Form, OfficeCalendar_Detail, OfficeCalendar_Form, OfficeHoliday_Detail, OfficeHoliday_Form, OfficeLeave_Detail, OfficeLeave_Form, OfficeLocation_Detail, OfficeLocation_Form, OfficeShift_Detail, OfficeShift_Form, People_Detail, People_Form, Project_Detail, Project_Form, Project_View_Detail, Project_View_Form, Resources_Detail, Resources_Form, ReviewCycles_Detail, ReviewCycles_Form, ReviewEmployee_Detail, ReviewEmployee_Form, ReviewEvaluations_Detail, ReviewEvaluations_Form, ReviewObjective_Detail, ReviewObjective_Form, SupportTable_Detail, SupportTable_Form, TaskList_Detail, TaskList_Form, Templates_Detail, Templates_Form

## Actions
### Employee
  _Auto (105): ADD_RECORD, DELETE_RECORD, EDIT_RECORD, EMAIL, NAVIGATE_APP_
  - **Call Phone (PhoneNumber) (→"Phone call")**: CALL IF `NOT(ISBLANK([Mobile]))`
  - **Send SMS (PhoneNumber) (→"Text message")**: SMS IF `NOT(ISBLANK([Mobile]))`
  - **Call Phone (EmergencyContactPhone) (→"Phone call")**: CALL IF `NOT(ISBLANK([EmergencyContactPhone]))`
  - **Send SMS (EmergencyContactPhone) (→"Text message")**: SMS IF `NOT(ISBLANK([EmergencyContactPhone]))`
  - **Action for CreateMedical**: ADD_RECORD_TO IF `true`
  - **Action for SetInputEmployeeOnChecklist 2**: REF_ACTION IF `true`
  - **Action for CreateTasksForEmployee**: REF_ACTION IF `true`
  - **Update_Status (→"Update Status")**: SET_COLUMN_VALUE IF `=IFS(
  [Status] = "Pending Review",
  ISNOTBLANK(
    INTERSECT(
      { "U_Sys`
  - **Action for ReturnValueInDocument**: ADD_RECORD_TO IF `true`
  - **Action for SetInputEmployeeOnChecklist**: REF_ACTION IF `true`
  - **Action for CreateTasksForEmployeeOnboarding**: REF_ACTION IF `true`
  - **Action for CodeOfConduct**: ADD_RECORD_TO IF `true`
  - **Action for CreateCodeOfConductDocument**: ADD_RECORD_TO IF `true`
  - **ExportEmployee (→"Export")**: EXPORT_VIEW IF `=ISNOTBLANK(INTERSECT({"U_System_Admin" , "U_People_Admin"},SPLIT(ANY(Me[Roles])`
  - **Input_Communication (→"Communication")**: SET_COLUMN_VALUE IF `=ISNOTBLANK(INTERSECT({"U_People_Admin","U_People_Manager","U_People_User"},SPLI`
  - **Action for CreateCommunicationRow**: ADD_RECORD_TO IF `true`
  - **Action for RemoveValueFrom CommunicationTable**: SET_COLUMN_VALUE IF `true`
  - **Action for CreatePassport**: ADD_RECORD_TO IF `true`
  - **CreateDiploma Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for CreateLaborCard**: ADD_RECORD_TO IF `true`
  - **Action for CreateNationalID**: ADD_RECORD_TO IF `true`
  - **Action for CreateNOC**: ADD_RECORD_TO IF `true`
  - **Action for CreateResidencyVisa**: ADD_RECORD_TO IF `true`
  - **Action for Set the Folder ID**: SET_COLUMN_VALUE IF `true`
  - **Employee_Folder (→"Employee Folder")**: NAVIGATE_URL IF `=ISNOTBLANK(INTERSECT({"U_People_Admin","U_People_Manager","U_People_User"},SPLI`
  - **Action for Create task for offer later**: REF_ACTION IF `true`
  - **Action for create task**: REF_ACTION IF `true`
  - **CreatePoliceClearance Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for CreateReferenceLetter1**: ADD_RECORD_TO IF `true`
  - **Action for CreateFamilyBook**: ADD_RECORD_TO IF `true`
  - **Action for CommunicationForOnboarding**: ADD_RECORD_TO IF `true`
  - **Action for CommunicationForNEA**: ADD_RECORD_TO IF `true`
  - **CreateEmployeeReview**: ADD_RECORD_TO IF `true`
  - **CreateAppUser (→"Create User")**: ADD_RECORD_TO IF `=AND(
  ISNOTBLANK(INTERSECT({"U_System_Admin","U_People_Admin"}, SPLIT(ANY(Me[R`
  - **EmployeeEvaluation (→"Evaluation")**: NAVIGATE_APP IF `true`
  - **Action for CreateReferenceLetter2**: ADD_RECORD_TO IF `true`
  - **create attendance Action - 1**: REF_ACTION IF `true`
  - **InputAll_Employee**: SET_COLUMN_VALUE IF `true`
  - **Create Attendance 2 Action - 1**: REF_ACTION IF `true`
  - **CreateEmployeeAttendance**: ADD_RECORD_TO IF `true`
  - **create attendance Action - 2**: REF_ACTION IF `true`
  - **Create Attendance 2 Action - 2**: REF_ACTION IF `true`
  - **CreatePassportBackCover Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Set the Folder ID 2**: SET_COLUMN_VALUE IF `true`
  - **Action for CreatePassport 2**: ADD_RECORD_TO IF `true`
  - **CreatePassportBackCover Action - 2**: ADD_RECORD_TO IF `true`
  - **CreateDiploma Action - 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateLaborCard 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateNationalID 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateNOC 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateResidencyVisa 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateMedical 2**: ADD_RECORD_TO IF `true`
  - **CreatePoliceClearance Action - 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateReferenceLetter1 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateReferenceLetter2 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateFamilyBook 2**: ADD_RECORD_TO IF `true`
  - **Action for SetInputEmployeeOnChecklist 3**: REF_ACTION IF `true`
  - **Action for CreateTasksForEmployee 2**: REF_ACTION IF `true`
  - **Action for Create task for offer later 2**: REF_ACTION IF `true`
  - **Action for create task 2**: REF_ACTION IF `true`
  - **Action for ReturnValueInDocument 2**: ADD_RECORD_TO IF `true`
  - **Action for CommunicationForOnboarding 2**: ADD_RECORD_TO IF `true`
  - **Action for CommunicationForNEA 2**: ADD_RECORD_TO IF `true`
  - **Action for SetInputEmployeeOnChecklist 4**: REF_ACTION IF `true`
  - **Action for CreateTasksForEmployeeOnboarding 2**: REF_ACTION IF `true`
  - **Action for Create User 2**: ADD_RECORD_TO IF `true`
  - **Action for CodeOfConduct 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateCodeOfConductDocument 2**: ADD_RECORD_TO IF `true`
  - **Action for CreateCommunicationRow 2**: ADD_RECORD_TO IF `true`
  - **Action for RemoveValueFrom CommunicationTable 2**: SET_COLUMN_VALUE IF `true`
  - **SyncMasterCreateEmployee (→"Create User")**: COMPOSITE IF `=AND(
  ISNOTBLANK(INTERSECT({"U_System_Admin","U_People_Admin"}, SPLIT(ANY(Me[R`
  - **SetAppUserID**: SET_COLUMN_VALUE IF `true`
  - **Action for CreateAppUserID**: ADD_RECORD_TO IF `true`
  - **Action for add appuser from employee**: SET_COLUMN_VALUE IF `true`
  - **Action for Create Missing Row**: ADD_RECORD_TO IF `true`

### Documents
  _Auto (10): EDIT_RECORD, NAVIGATE_APP, NAVIGATE_URL, OPEN_FILE_
  - **Action for Update File ID and URL**: SET_COLUMN_VALUE IF `true`
  - **Verified_Document (→"Verified")**: SET_COLUMN_VALUE IF `=NOT(IN([SubStatus],{"Verified"}))`
  - **Sync_Documents (→"Sync")**: SET_COLUMN_VALUE

### Templates
  _Auto (1): NAVIGATE_URL_

### CandidateData
  _Auto (19): EMAIL, NAVIGATE_APP, NAVIGATE_URL_
  - **CreateEmpolyee (→"="Create Empolyee"")**: COMPOSITE IF `=ISBLANK([Employee])`
  - **Call Phone (Mobile Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Mobile Number]))`
  - **Send SMS (Mobile Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Mobile Number]))`
  - **Call Phone (Emergency Contact Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Emergency Contact Number]))`
  - **Send SMS (Emergency Contact Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Emergency Contact Number]))`
  - **Set_EmployeeInfo (→"Employee Information")**: SET_COLUMN_VALUE IF `true`
  - **Add_Employee (→"="Create Empolyee"")**: ADD_RECORD_TO IF `=ISBLANK([Employee])`

### AppUser
  _Auto (2): EMAIL_
  - **View_AppUserEmployee (→"Employee")**: NAVIGATE_APP IF `=ISNOTBLANK(INTERSECT({"U_System_Admin","People_Admin"},SPLIT(ANY(Me[Roles]),","`

### CheckList
  _Auto (3): NAVIGATE_APP, NAVIGATE_URL_
  - **Input_Checklist**: SET_COLUMN_VALUE IF `true`
  - **Create_Tasks**: ADD_RECORD_TO IF `true`

### TaskList
  _Auto (2): NAVIGATE_APP_
  - **Task_Completed (→"Done")**: SET_COLUMN_VALUE IF `=NOT(IN([Status],{"Completed","Cancelled"}))`
  - **Task_Status (→"Update")**: SET_COLUMN_VALUE IF `=NOT(IN([Status],{"Completed","Cancelled"}))`

### Communication
  _Auto (1): EMAIL_
  - **Send**: SET_COLUMN_VALUE IF `=[Status]="Draft"`
  - **Action for SetTheStatusAsSent**: SET_COLUMN_VALUE IF `true`
  - **Action for SetTheStatusAsSent NA**: SET_COLUMN_VALUE IF `true`
  - **Action for SetTheStatusSentEmployeeOnboarding**: SET_COLUMN_VALUE IF `true`

### AppViews
  _Auto (3): NAVIGATE_APP, NAVIGATE_URL_

### AppVariables
  _Auto (2): OPEN_FILE_

### ExpenseClaims
  _Auto (3): NAVIGATE_URL, OPEN_FILE_
  - **ApproveClaim**: SET_COLUMN_VALUE IF `=AND(
  NOT(IN([Status], LIST("Processed", "Approved", "Rejected"))),
  ANY(Me[I`
  - **ClaimStatus**: SET_COLUMN_VALUE IF `=OR(
  ANY(Me[ID]) = [Employee].[ReportingOfficer],
  ISNOTBLANK(
    INTERSECT(`
  - **Export_ExpenseClaims (→"Export")**: EXPORT_VIEW IF `=ISNOTBLANK(INTERSECT({"U_System_Admin" , "U_People_Admin"},SPLIT(ANY(Me[Roles])`
  - **Set Folder Id Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Action for AppFile URL**: SET_COLUMN_VALUE IF `true`
  - **Add_ExpenseClaims (→"Add")**: NAVIGATE_APP
  - **RejectClaim**: SET_COLUMN_VALUE IF `=AND(
  NOT(IN([Status], LIST("Processed", "Approved", "Rejected"))),
  ANY(Me[I`
  - **ProcessedClaim**: SET_COLUMN_VALUE IF `=AND(
  [Status] = "Approved",
  ISNOTBLANK(
    INTERSECT(
      {
        "U_F`

### ReviewEvaluations
  _Auto (5): NAVIGATE_APP, NAVIGATE_URL, OPEN_FILE_

### AttendanceDaily
  _Auto (4): NAVIGATE_APP_
  - **CheckIn**: SET_COLUMN_VALUE IF `=AND([Date] = TODAY(), ISBLANK([Check_In]))`
  - **CheckOut**: SET_COLUMN_VALUE IF `=AND([Date] = TODAY(), ISNOTBLANK([Check_In]),ISBLANK([Check_Out]))`
  - **Present**: SET_COLUMN_VALUE IF `=[Status] = "Att_U"`
  - **Absent**: SET_COLUMN_VALUE IF `=[Status] = "Pending"`
  - **InputAll_AttendanceDaily**: SET_COLUMN_VALUE IF `true`
  - **AttendanceRequest (→"Request")**: NAVIGATE_APP IF `=and([Date]=TODAY(),ISBLANK([AttendanceRequest]))`
  - **Sync_AttendanceDaily**: SET_COLUMN_VALUE IF `=USEREMAIL()="nomeshwer@ommnomi.in"`
  - **ExportAttendance (→"Export")**: EXPORT_VIEW IF `=AND(
  CONTEXT("View") <> "Employee_Dash",
  ISNOTBLANK(
    INTERSECT(
      {`
  - **Add_AttendanceDaily (→"Add")**: ADD_RECORD IF `=AND(
  CONTEXT("View") = "AllAttendance",
  ISNOTBLANK(
    INTERSECT(
      {"`
  - **Add_Regularization (→"Regularize")**: NAVIGATE_APP IF `=[Date]<=TODAY()`
  - **Write Approved Times**: SET_COLUMN_VALUE IF `=ANY(Me[Email])="nomeshwer@ommnomi.in"`
  - **Create_TOIL (→"TOIL")**: NAVIGATE_APP IF `=AND(
  OR(
    [Office_Shift].[Type] = "Day Off",
    ISNOTBLANK([Office_Holida`
  - **Action for AddCheckIn&Out**: SET_COLUMN_VALUE IF `true`
  - **Action for AddCheckOut**: SET_COLUMN_VALUE IF `true`

### ReviewObjective
  _Auto (2): NAVIGATE_APP, OPEN_FILE_
  - **ReviewEvaluation_Temp (→"Review Evaluation")**: NAVIGATE_APP IF `true`
  - **InputObjective**: SET_COLUMN_VALUE IF `true`
  - **CreateObjective**: ADD_RECORD_TO IF `true`
  - **CreateReviewEvalution**: ADD_RECORD_TO IF `true`
  - **InputReviewEvalution**: SET_COLUMN_VALUE IF `true`
  - **InputReviewEvalutionSelf**: SET_COLUMN_VALUE IF `true`
  - **CreateReviewEvalutionSelf**: ADD_RECORD_TO IF `true`
  - **InputReviewEvaluationBySelf Action - 1**: REF_ACTION IF `true`
  - **CreaterReviewEvaluationBySelf Action - 1**: REF_ACTION IF `true`
  - **ReviewObjective_Approved**: SET_COLUMN_VALUE IF `=AND(
  [Status] = "Proposed",
  NOT(IN([Type], { "Obj_CoreValue", "Obj_Competen`
  - **HrValue**: SET_COLUMN_VALUE

### ReviewCycles
  - **ReviewCycle_Objectives (→"Objectives")**: NAVIGATE_APP IF `true`
  - **ReviewCycle_Employee (→"Evaluations")**: NAVIGATE_APP IF `true`
  - **Action for InputValue**: REF_ACTION IF `true`
  - **Action for CreateObjective**: REF_ACTION IF `true`
  - **Action for InputValue 2**: REF_ACTION IF `true`
  - **Action for CreateObjective 2**: REF_ACTION IF `true`
  - **CreateProjectEmployeeReview**: SET_COLUMN_VALUE IF `true`
  - **Action for InputCycleEmployee**: REF_ACTION IF `true`
  - **Action for CreateReviewEmployee**: REF_ACTION IF `true`

### ReviewEmployee
  _Auto (1): NAVIGATE_APP_
  - **Action for InputReviewEvaluationBySelf**: REF_ACTION IF `true`
  - **Action for CreaterReviewEvaluationBySelf**: REF_ACTION IF `true`
  - **Action for InputReviewEvaluationBySelf 2**: REF_ACTION IF `true`
  - **Action for CreaterReviewEvaluationBySelf 2**: REF_ACTION IF `true`
  - **Action for InputReviewEvaluationByManager 2**: REF_ACTION IF `true`
  - **Action for CreaterReviewEvaluationByManager 2**: REF_ACTION IF `true`
  - **Status (→"Status")**: SET_COLUMN_VALUE IF `=ISNOTBLANK(INTERSECT({"U_Reporting_Officer"},SPLIT(ANY(Me[Roles]),",")))`
  - **Add_IndividualObj (→"="Add Objective"")**: NAVIGATE_APP IF `=AND(
  OR(
    ANY(Me[Employee]) = [_thisrow].[Employee],
    ANY(Me[ID]) = [_t`
  - **Update_ReviewEmployee**: SET_COLUMN_VALUE IF `true`
  - **HRApproval**: REF_ACTION IF `=ISNOTBLANK(INTERSECT({"U_System_Admin"},SPLIT(ANY(Me[Roles]),",")))`

### _Per User Settings
  _Auto (1): NAVIGATE_APP_

### OfficeLocation
  _Auto (1): NAVIGATE_APP_

### OfficeCalendar
  _Auto (1): NAVIGATE_APP_
  - **Action for Execute_Sync_on_Holidays**: REF_ACTION IF `true`
  - **Trigger Add Holiday Sync**: REF_ACTION IF `true`
  - **New step 1 Action - 1**: REF_ACTION IF `true`
  - **UpdateOfficeHoliday**: SET_COLUMN_VALUE IF `true`

### AttendanceRequest
  _Auto (5): NAVIGATE_APP_
  - **AttendanceRequest_Approved (→"Approve")**: SET_COLUMN_VALUE IF `=AND(
  [Status] = "Requested",
  ANY(Me[ID]) <> [Employee].[ID],
  OR(
    ANY(`
  - **AttendanceRequest_Rejected (→"Reject")**: SET_COLUMN_VALUE IF `=AND(
  [Status] = "Requested",
  ANY(Me[ID]) <> [Employee].[ID],
  OR(
    ANY(`
  - **Create Attendance Rows for these Dates Action - 1**: ADD_RECORD_TO IF `true`
  - **Update the Attendance Request Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Update the Leave Allocation to update balance Action - 1**: REF_ACTION IF `true`
  - **Sync_AttendanceRequest (→"Sync")**: SET_COLUMN_VALUE IF `=USEREMAIL()="nomeshwer@ommnomi.in"`
  - **Sync Attendance Request Action - 1**: REF_ACTION IF `true`
  - **Action for Add Date From WorkDAy**: REF_ACTION IF `true`
  - **Action for Create Rom in Attendance Daily**: REF_ACTION IF `true`
  - **Sync Attendance Request at the end Action - 1**: REF_ACTION IF `true`
  - **Action for Sync Leave Allocation at the end**: REF_ACTION IF `true`
  - **Trigger Daily Update**: REF_ACTION IF `true`
  - **Change CheckIn & CheckOut Action - 1**: COMPOSITE IF `true`
  - **Add_AttendanceRequest (→"Add")**: NAVIGATE_APP IF `=CONTEXT("View")="AttendanceRequest"`
  - **Action for Select Dates in WorkDay for AttendanceRequest**: REF_ACTION IF `true`
  - **Action for Create Row in AttendanceDaily**: REF_ACTION IF `true`
  - **Sync this AttendanceRequest Action - 1**: REF_ACTION IF `true`
  - **Sync this LeaveAllocation Action - 1**: REF_ACTION IF `true`
  - **Update Check_In and Check_Out Action - 1**: REF_ACTION IF `true`
  - **Create TOIL Allocation Action - 1**: ADD_RECORD_TO IF `true`

### AppTriggers
  - **Create row for PickDate+0 Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Create row for PickDate+1**: ADD_RECORD_TO IF `true`
  - **Delete the AttendnaceDaily not relate to the same day Action - 1**: REF_ACTION IF `true`
  - **Set as Present Action - 1**: REF_ACTION IF `true`
  - **CreateEmployeeAttendance 2**: ADD_RECORD_TO IF `true`
  - **Action for Sync Attendance Request**: REF_ACTION IF `true`
  - **Sync LeaveAllocation Action - 1**: REF_ACTION IF `true`

### LeaveAllocation
  - **Import_LeaveAllocation (→"Import")**: IMPORT_FILE IF `=ISNOTBLANK(INTERSECT({"U_People_Admin"},SPLIT(ANY(Me[Roles]),",")))`
  - **Sync_LeaveAllocation**: SET_COLUMN_VALUE IF `=ISNOTBLANK(INTERSECT({"U_People_Admin"},SPLIT(ANY(Me[Roles]),",")))`
  - **Export_LeaveAllocation (→"Export")**: EXPORT_VIEW IF `=ISNOTBLANK(INTERSECT({"U_System_Admin" , "U_People_Admin"},SPLIT(ANY(Me[Roles])`

### WorkDay
  - **All_Input_WorkDay**: SET_COLUMN_VALUE IF `true`
  - **CreateRowToAttendenceDaily**: ADD_RECORD_TO IF `true`
  - **Create_AttendenceDaily**: ADD_RECORD_TO IF `true`

### AppSettings
  - **Action for Sync Every Row**: REF_ACTION IF `true`
  - **Action for Sync LeaveAllocation**: REF_ACTION IF `true`
  - **Action for Trigger Calendar Sync**: REF_ACTION IF `true`

### OfficeHoliday
  - **SyncApplicableCalendars**: SET_COLUMN_VALUE IF `true`
  - **UpdateApplicableCalendars**: SET_COLUMN_VALUE IF `true`
  - **TriggerCalendarSync**: REF_ACTION IF `true`
  - **Trigger Calendar Sync Action - 1**: REF_ACTION IF `true`

## Observations
- ℹ️ **Employee** has no Label column
- ℹ️ **Documents** has no Label column
- ℹ️ **Project** has no Label column
- ℹ️ **Templates** has no Label column
- ℹ️ **AppUser** has no Label column
- ℹ️ **TaskList** has no Label column
- ℹ️ **CheckList** has no Label column
- ℹ️ **CandidateData** has no Label column
- ℹ️ **Communication** has no Label column
- ℹ️ **DocType** has no Label column
- ℹ️ **AppViews** has no Label column
- ℹ️ **AppSettings** has no Label column
- ℹ️ **AppVariables** has no Label column
- ℹ️ **AppTriggers** has no Label column
- ℹ️ **ReviewCycles** has no Label column
- ℹ️ **ReviewEmployee** has no Label column
- ℹ️ **ReviewObjective** has no Label column
- ℹ️ **ReviewEvaluations** has no Label column
- ℹ️ **AttendanceDaily** has no Label column
- ℹ️ **AttendanceMonthly** has no Label column
- ℹ️ **OfficeCalendar** has no Label column
- ℹ️ **ExpenseClaims** has no Label column
- ℹ️ **OfficeHoliday** has no Label column
- ℹ️ **OfficeLeave** has no Label column
- ℹ️ **LeaveAllocation** has no Label column
- ℹ️ **Employment_Compliance** has no Label column
- ℹ️ **Resources** has no Label column
- ℹ️ **OfficeLocation** has no Label column
- ℹ️ **OfficeShift** has no Label column
- ℹ️ **AttendanceRequest** has no Label column
- ℹ️ **AttendanceCheckin** has no Label column
- ℹ️ **WorkDay** has no Label column
