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
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { EditIf: `=1=2` }
  Code: Text = =IF(
   ISNOTBLANK(
    [Candidate].[EmployeeCode]),
     [Candidate].[EmployeeCode],
     [Project].[Code] & RIGHT("000" & COUNT(Employee[ID]) + 1,
     3
  )
) { ValidIf: `=ISBLANK(FILTER(
  "Employee",
  [Code]=[_THISROW].[Code])-list([_THISROW].[ID]))` | EditIf: `=1=2` }
  Candidate: Ref { ShowIf: `=ISBLANK( [_THIS] )` | EditIf: `=ISBLANK( [_THIS] )` }
  FirstName: Name = =[Candidate].[First Name]
  LastName: Name = =[Candidate].[Last Name]
  FullName: Name = =[Candidate].[Full Name as per Passport]
  PreferredName: Name = =[Candidate].[Full Name as per Passport]
  AppUser: Enum
  PersonalEmail: Email = =[Candidate].[Personal Email]
  WorkEmail: Email
  Mobile: Phone = =[Candidate].[Mobile Number]
  DateOfBirth: Date
  Nationality: Enum = =[Candidate].[Nationality]
  Gender: Enum [Values: 'Male', 'Female', 'Prefer not to say']
  JoiningDate: Date
  Position: Text (→"="Position/Title"")
  VisaStatus: Enum [Values: 'BLR Work-Permit', 'BLR Sponsored Visa', 'NA']
  OfficeLocation: Enum = =IF(
   ISNOTBLANK(
    [Candidate].[OfficeLocation]),
     [Candidate].[OfficeLocation],
     "Dubai"
  )
  OfficeCalendar: Enum = =IF(
   ISNOTBLANK(
    [Candidate].[OfficeCalendar]),
     [Candidate].[OfficeCalendar],
     "04edbb51"
  ) { ValidIf: `=FILTER(
  "OfficeCalendar",
  AND(
    [Status]="Active",
    [OfficeLocation]=[_THISROW].[OfficeLocation]))` }
  ReportingOfficer: Enum (→"="Line Manager"")
  TeamEmail: Enum [HIDDEN] (→"=LineManagerEmail")
  Department: Enum
  Project: Ref = =IF(
  ISNOTBLANK(
    [Candidate].[Project]),
    [Candidate].[Project],
    "Core_Team"
  )
  EmploymentType: Enum [Values: 'Full-time', 'Part-time', 'Contract', 'Intern']
  Communication: Enum
  Probation: Number
  GrossMonthlySalary: Decimal
  SalaryPaidOn: Number
  BasicSalary: Decimal = =[GrossMonthlySalary]*0.5
  HousingAllowance: Decimal = =[GrossMonthlySalary]*0.25
  TransportAllowance: Decimal = =[GrossMonthlySalary]*0.25
  StartDate: DateTime
  EndDate: DateTime
  Status: Enum [Values: 'Pending Validation', 'Pending Review', 'Approved for Offer', 'Offer Sent', 'Onboarding', 'Probation', 'Confirmed', 'Resigned', ... +1 more] = ="Pending Validation"
  Address: Address = =[Candidate].[Current Location (City, Country)]
  EmergencyContactName: Name = =[Candidate].[Emergency Contact Name]
  EmergencyContactPhone: Phone = =[Candidate].[Emergency Contact Number]
  BankAccountName: Text = =[Candidate].[Bank Name]
  BankAccountNumber: Text = =[Candidate].[Account Number]
  BankName: Enum = =[Candidate].[Branch Name]
  IBAN: Text = =[Candidate].[IBAN]
  SwiftCode: Text = =[Candidate].[SWIFT Code]
  Allergies: Text = =[Candidate].[Allergies (If Any)]
  MedicalCondition: Text = =[Candidate].[Medical Condition (If Any)]
  Notes: LongText
  ProfilePicture: Image
  FolderID: Text
  Input_Cycle: Enum
  ConfirmedOn: Date = =IF(
   [Status] = "Confirmed",
   TODAY(
), "" )
  CreatedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  CreatedOn: DateTime = NOW() { EditIf: `=ISBLANK([_THIS])` }
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_this])` }
  LastEditedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_this])` }
  AppTrigger: Enum [HIDDEN]
  TriggerValue: Text [HIDDEN]
  TriggeredOn: DateTime [HIDDEN]
  Tab_Basic: Show [RO]
  Tab_Bank: Show [RO]
  Tab_Other: Show [RO]
  Tab_Contact: Show [RO]
  _ComputedName: Name [RO,VC]
  Related Documents: List [RO,VC]
  Related CheckLists: List [RO,VC]
  Related TaskList: List [RO,VC]
  Related TaskLists: List [HIDDEN,RO,VC]
  Related CandidateDatas: List [RO,VC]
  Related Communications: List [RO,VC]
  Related AttendanceMonthlys: List [RO,VC]
  Related ReviewEvaluations: List [RO,VC]
  Related AttendanceRequests: List [HIDDEN,RO,VC]
  AttendanceToday: Enum [RO]
```

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
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { EditIf: `=ISBLANK([_this])` }
  Employee: Ref { EditIf: `=ISBLANK([_THIS])` }
  DocumentType: Enum
  DocumentName: Text = =[DocumentType].[Name]
  DocumentNumber: Text
  IssueDate: Date
  ExpiryDate: Date
  FileAttachment: File
  FileURL: Url
  DriveFileID: Text [HIDDEN] { EditIf: `=1=2` }
  DriveFileURL: Url { EditIf: `=1=2` }
  SubStatus: Enum [Values: 'Pending', 'Verified', 'Rejected', 'Archived'] = ="Pending"
  Notes: LongText
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_this])` }
  LastEditedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_this])` }
  Status: Enum [RO]
  EmployeeStatus: Enum [RO]
```

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
  LastEditedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_this])` }
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_this])` }
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
  LastEditedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_this])` }
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_this])` }
```

### AppUser (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =IFS(
   ISNOTBLANK(
    [Employee].[WorkEmail]),
     INDEX(
      SPLIT([Employee].[WorkEmail],
       "-world"
    ),
     1
  ),
   TRUE,
   UNIQUEID(
) )
  Photo: Image
  Employee: Enum
  Email: Email
  Name: Name
  Roles: EnumList = ="U_Employee"
  AccessKey: Text [HIDDEN]
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_this])` }
  LastEditedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_this])` }
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
  CreatedBy: Enum [RO] = =ANY(Me[ID])
  CreatedOn: DateTime [RO] = NOW()
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditedOn: DateTime = NOW() { EditIf: `=ISBLANK([_THIS])` }
```

### CheckList (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { EditIf: `=ISBLANK([_THIS])` }
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
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
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
  OfficeCalendar: Ref { ValidIf: `=FILTER(
  "OfficeCalendar",
  AND(
    [Status]="Active",
    [OfficeLocation]=[_THISROW].[OfficeLocation]))` }
  _ComputedName: Name [RO,VC]
  Related Employees: List [HIDDEN,RO,VC]
  Employee: Ref [RO]
```

### Communication (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Template: Enum = =[Template]
  Employee: Ref
  Date: Date = TODAY()
  Subject: Enum [Values: 'Performance Review'] = =[Template].[TemplateName]
  To: EnumList = =ifs(
   CONTAINS(
    [Template].[To],
    "ProjectTeamEmail"
  ),
   [Employee].[Project].[TeamEmail],
   CONTAINS(
    [Template].[To],
    "EmployeeEmail"
  ),
   list(if(
    ISNOTBLANK(
      [Employee].[WorkEmail]),
      [Employee].[WorkEmail],
      [Employee].[PersonalEmail])),
       CONTAINS(
        [Template].[To],
        "LineManagerEmail"
      ),
       list([Employee].[TeamEmail]),
       1=1,
       [Template].[To]
    )
  CC: EnumList
  BCC: EnumList = ="people@blr-world.com"
  ReplayTo: Enum [HIDDEN] = ="people@blr-world.com"
  Sender: Text [HIDDEN] = ="BLR WORLD HRMS"
  Status: Enum [Values: 'Draft', 'Send', 'Sent'] = ="Draft"
  CreatedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  CreatedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  LastEditedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
```

### DocType (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Name: Name
  Description: LongText
  RedAlert: Number
  OrangeAlert: Number
  YellowAlert: Number
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
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
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = NOW() { EditIf: `=ISBLANK([_THIS])` }
  AppLink: App [RO]
```

### AppSettings (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Level: Enum [Values: 'System', 'Code']
  Table: Enum
  Trigger: Enum
  View: Enum
  Column: Enum
  Title: Text
  Description: LongText
  Role: EnumList = =Any(Me[Roles]) { ValidIf: `=sort(
  split(lookup(
    "AppUserRoles ",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","
),false)` | EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Email: Enum = =any(Me[Email]) { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  User: Enum = =Any(me[ID]) { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Decimal: Number (→"="Days"")
  Date: Date = TODAY()
  AllowedValues: EnumList
  LastEditBy: Enum = =Any(Me[ID]) { EditIf: `=isblank([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=isblank([_THIS])` }
```

### AppVariables (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  Tags: EnumList [Values: 'System', 'Standard', 'Migration', 'Company', 'Configuration', 'Custom', 'Outdated']
  ValueControl: EnumList [Values: 'Date', 'Decimal', 'Enum', 'File', 'Multi', 'Photo', 'URL']
  Title: Text
  UsedFor: Text
  Decimal: Decimal { EditIf: `=in("Decimal",[ValueControl])` }
  EnumValue: Enum { EditIf: `=in("Enum",[ValueControl])` }
  MultiValues: EnumList { EditIf: `=in("Multi",[ValueControl])` }
  DateValue: Date = TODAY() { EditIf: `=in("Date",[ValueControl])` }
  Photo: Image { EditIf: `=in("Photo",[ValueControl])` }
  URL: Url { EditIf: `=in("URL",[ValueControl])` }
  File: File { EditIf: `=in("File",[ValueControl])` }
  Description: LongText
  EnumList: EnumList
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=isblank([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=isblank([_THIS])` }
  Related AttendanceDailys: List [RO,VC]
```

### AppTriggers (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No = =if(ISBLANK([_THIS]),TRUE,FALSE)
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date = TODAY()
  PickDateTime: DateTime = =NOW()
  ValueText: Text = =[PickEmployee].[PersonalEmail]
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum = =ANY(Me[ID]) { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime = =NOW() { EditIf: `=isblank([_THIS])` }
  Date: Text [RO]
```

### ReviewCycles (26 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =[Year]&""
  Year: Number
  Title: Text = ="Performance Evaluation "&[Year]
  Start_Date: Date = =[LastCycle].[Start_Date]+365
  End_Date: Date = =[LastCycle].[End_Date]+365
  ObjSettingStart: Date = =[LastCycle].[ObjSettingStart]+365
  ObjSettingEnd: Date = =[LastCycle].[ObjSettingEnd]+365
  SelfMidReviewStart: Date = =[LastCycle].[SelfMidReviewStart]+365
  SelfMidReviewEnd: Date = =[LastCycle].[SelfMidReviewEnd]+365
  MgrMidReviewStart: Date = =[LastCycle].[MgrMidReviewStart]+365
  MgrMidReviewEnd: Date = =[LastCycle].[MgrMidReviewEnd]+365
  SelfReviewStart: Date = =[LastCycle].[SelfReviewStart]+365
  SelfReviewEnd: Date = =[LastCycle].[SelfReviewEnd]+365
  AppraisalStart: Date = =[LastCycle].[AppraisalStart]+365
  AppraisalEnd: Date = =[LastCycle].[AppraisalEnd]+365
  Status: Enum = ="Open"
  Input_Project: Enum
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  LastCycle: Enum [RO]
  Related ReviewObjectives: List [HIDDEN,RO,VC]
  Related ReviewEvaluations: List [HIDDEN,RO,VC]
  Total_Employee: Number [RO] (→"=IF(
  CONTEXT("View") = "ReviewCycle",
  "Employee",
  "Total_Employee"
)")
  Pending_Manager_Review: Number [RO]
  Pending_Self_Review: Number [RO]
```

### ReviewEmployee (20 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Cycle: Enum { EditIf: `=ISBLANK([_THIS])` }
  Employee: Enum
  Status: Enum = ="Pending Obj Setting"
  Last_Review_ID: Enum [HIDDEN] = =ANY(
   ORDERBY(
     FILTER(
       "ReviewEmployee",
       AND(
         [Employee] = [_THISROW].[Employee],
         [Cycle].[Start_Date] < [_THISROW].[Cycle].[Start_Date] ) ),
        [EvaluationDate],
        FALSE
      )
    )
  SelfReview: Decimal
  ManagerReview: Decimal
  FinalReview: Decimal
  FinalReport: File [HIDDEN]
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  EvaluationDate: Date [HIDDEN,RO]
  ReviewObjectives: List [HIDDEN,RO]
  Count_Obj_Individual: Number [HIDDEN,RO]
  Obj_Individual: List [RO] { ShowIf: `=ISNOTBLANK(
   SELECT(
     ReviewObjective[ID],
     AND(
       [Cycle] = [_THISROW].[Cycle],
       [EmployeeReview] = [_THISROW].[ID],
       [Type] = "Obj_Individual" ) ) )` }
  Related ReviewEvaluations: List [RO,VC] { ShowIf: `=ISNOTBLANK([_THIS])` }
  Count_Self_Review: Number [RO]
  Count_Manager_Review: Number [RO]
  Count_ReviewObjective: Number [RO] (→"="Objectives"")
```

### ReviewObjective (22 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum = =IFS(
  ISNOTBLANK(
    [Input_Objective]
  ),
   [Input_Objective].[Type],
   ISNOTBLANK(
    [EmployeeReview]
  ),
  "Obj_Individual"
) { ValidIf: `=IF(
   ISNOTBLANK(
     INTERSECT( LIST( "U_System_Admin",
     "U_System_Manager",
     "U_System_User",
     "U_System_Viewer",
     "U_People_Admin",
     "U_People_Manager",
     "U_People_User",
     "U_People_Viewer",
     "U_Project_Admin",
     "U_Project_Manager",
     "U_Project_User",
     "U_Project_Viewer",
     "U_Finance_Admin",
     "U_Finance_Manager",
     "U_Finance_User",
     "U_Finance_Viewer",
     "SuperAdmin",
     "Admin",
     "User"
  ),
   SPLIT(TEXT(ANY(
    Me[Roles]
  )
), ",") ) ), SPLIT(LOOKUP(
  "Emp_ReviewObjective_Type",
   "AppVariables",
   "ID",
   "EnumValue"
), " , "), LIST("Obj_Individual") )` | EditIf: `=ISBLANK([_THIS])` }
  Cycle: Enum = =IF(
   ISNOTBLANK(
    [Input_Objective]
  ),
   [Input_Objective].[Cycle],
   ANY(
    SELECT(
      ReviewCycles[ID],
       [Year] = YEAR(TODAY()))) ) { ValidIf: `=ReviewCycles[ID]` | EditIf: `=ISBLANK([_this])` }
  EmployeeReview: Enum { ShowIf: `=[Type] = "Obj_Individual"` | ReqIf: `=[Type] = "Obj_Individual"` | EditIf: `=ISBLANK([_THIS])` }
  Title: Text = =[Input_Objective].[Title]
  SubTitle: Text = =[Input_Objective].[SubTitle]
  Description: LongText = =[Input_Objective].[Description]
  FillingInstructions: LongText = =[Input_Objective].[FillingInstructions]
  VideoGuide: File [RO] = =[Input_Objective].[VideoGuide]
  EvidenceRequirement: Enum = =IFS(
   ISBLANK([Input_Objective]),
   LOOKUP(
    "Emp_ReviewObjective_EvidenceRequirement",
     "AppVariables",
     "ID",
     "Title"
  ),
   ISNOTBLANK(
    [Input_Objective]
  ),
   [Input_Objective].[EvidenceRequirement] ) { ValidIf: `=SPLIT( LOOKUP(
  "Emp_ReviewObjective_EvidenceRequirement",
   "AppVariables",
   "ID",
   "EnumValue"
) , ", " )` }
  Weight: Percent [HIDDEN] = =[Input_Objective].[Weight]
  Index: Decimal [HIDDEN] = =[Input_Objective].[Index]
  Status: Enum = =Proposed
  Is_Repeating: Yes/No = =IF([Type]="Obj_Individual",FALSE,TRUE)
  HRApproval: Yes/No { EditIf: `=ISNOTBLANK(
   INTERSECT( LIST("U_People_Admin",
   "U_People_Manager"
), SPLIT(TEXT(ANY(
  Me[Roles]
)), ",") ) )` }
  Input_Cycle: Ref
  Input_Type: Text
  Input_Objective: Enum
  Input_Evaluations: Enum
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
```

### ReviewEvaluations (22 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  EmployeeReview: Ref { EditIf: `=ISBLANK([_THIS])` }
  Objective: Enum { EditIf: `=ISBLANK([_THIS])` }
  Type: Enum { ValidIf: `=SPLIT( LOOKUP(
  "Emp_ReviewCycles_Type",
   "AppVariables",
   "ID",
   "EnumValue"
) , ", " )` | EditIf: `=AND(
   ISBLANK([_THIS]
), OR(
   AND(
     [Type] = "Cycle_Annual",
     TODAY(
  ) >= [EmployeeReview].[Cycle].[AppraisalStart],
   TODAY(
) <= [EmployeeReview].[Cycle].[AppraisalEnd] ), AND(
   [Type] = "Cycle_Mid",
   TODAY(
) >= [EmployeeReview].[Cycle].[SelfMidReviewStart], TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd] ) ) )` }
  SelfRating: Number (→"=SWITCH(
  [SelfRating],
  "1","Rating = 1 ; Does Not Meet Expectations",
  "2","Rating = 2 ; Needs Support",
  "3","Rating = 3 ; Partially Meets Expectations",
  "4","Rating = 4 ; Meets Expectations",
  "5","Rating = 5 ; Exceeds Expectations",
  "Rating"
)") { EditIf: `=AND(
   ISBLANK([_THIS]
), ANY(
  Me[Employee]
) = [EmployeeReview].[Employee], OR(
  AND(
     TODAY(
  ) >= [EmployeeReview].[Cycle].[SelfReviewStart],
   TODAY(
) <= [EmployeeReview].[Cycle].[SelfReviewEnd] ), AND(
   [Type] = "Cycle_Annual",
   TODAY(
) >= [EmployeeReview].[Cycle].[SelfReviewStart], TODAY() <= [EmployeeReview].[Cycle].[SelfReviewEnd] ), AND(
   [Type] = "Cycle_Mid",
   TODAY(
) >= [EmployeeReview].[Cycle].[SelfMidReviewStart], TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd] ) ) )` }
  SelfRemarks: LongText { EditIf: `=AND(
   ISBLANK([_THIS]
), ANY(
  Me[Employee]
) = [EmployeeReview].[Employee], OR(
  AND(
     TODAY(
  ) >= [EmployeeReview].[Cycle].[SelfReviewStart],
   TODAY(
) <= [EmployeeReview].[Cycle].[SelfReviewEnd] ), AND(
   [Type] = "Cycle_Annual",
   TODAY(
) >= [EmployeeReview].[Cycle].[SelfReviewStart], TODAY() <= [EmployeeReview].[Cycle].[SelfReviewEnd] ), AND(
   [Type] = "Cycle_Mid",
   TODAY(
) >= [EmployeeReview].[Cycle].[SelfMidReviewStart], TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd] ) ) )` }
  ManagerRemarks: LongText { EditIf: `=AND(
   ISBLANK([_THIS]
), ANY(
  Me[ID]
) = [EmployeeReview].[Employee].[ReportingOfficer], OR(
   AND(
     TODAY(
  ) >= [EmployeeReview].[Cycle].[AppraisalStart],
   TODAY(
) <= [EmployeeReview].[Cycle].[AppraisalEnd] ), AND(
   [Type] = "Cycle_Annual",
   TODAY(
) >= [EmployeeReview].[Cycle].[AppraisalStart], TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd] ), AND(
   [Type] = "Cycle_Mid",
   TODAY(
) >= [EmployeeReview].[Cycle].[SelfMidReviewStart], TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd] ) ) )` }
  ManagerRating: Number (→"=SWITCH(
  [ManagerRating],
  1,"Rating = 1 ; Does Not Meet Expectations",
  2,"Rating = 2 ; Needs Support",
  3,"Rating = 3 ; Partially Meets Expectations",
  4,"Rating = 4 ; Meets Expectations",
  5,"Rating = 5 ; Exceeds Expectations",
  "ManagerRating"
)") { EditIf: `=AND(
   ISBLANK([_THIS]
), ANY(
  Me[ID]
) = [EmployeeReview].[Employee].[ReportingOfficer], OR(
   AND(
     TODAY(
  ) >= [EmployeeReview].[Cycle].[AppraisalStart],
   TODAY(
) <= [EmployeeReview].[Cycle].[AppraisalEnd] ), AND(
   [Type] = "Cycle_Annual",
   TODAY(
) >= [EmployeeReview].[Cycle].[AppraisalStart], TODAY() <= [EmployeeReview].[Cycle].[AppraisalEnd] ), AND(
   [Type] = "Cycle_Mid",
   TODAY(
) >= [EmployeeReview].[Cycle].[SelfMidReviewStart], TODAY() <= [EmployeeReview].[Cycle].[SelfMidReviewEnd] ) ) )` }
  Evidence_File: File { ShowIf: `=[Objective].[EvidenceRequirement] <> "Not Applicable"` | ReqIf: `=IF(
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
)` | EditIf: `=AND(
   ISBLANK([_THIS]
), OR(
   ANY(
    Me[ID]
  ) = [EmployeeReview].[Employee].[ID],
   ANY(
    Me[ID]
  ) = [EmployeeReview].[Employee].[ReportingOfficer] ),
   OR(
     AND(
       [Type] = "Cycle_Annual",
       TODAY(
    ) >= [EmployeeReview].[Cycle].[AppraisalStart],
     TODAY(
  ) <= [EmployeeReview].[Cycle].[AppraisalEnd] ),
   AND(
     [Type] = "Cycle_Mid",
     TODAY(
  ) >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
   TODAY(
) <= [EmployeeReview].[Cycle].[SelfMidReviewEnd] ) ) )` }
  Evidence_URL: Url { ShowIf: `=[Objective].[EvidenceRequirement] <> "Not Applicable"` | ReqIf: `=IF(
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
)` | EditIf: `=AND(
   ISBLANK([_THIS]
), OR(
   ANY(
    Me[ID]
  ) = [EmployeeReview].[Employee].[ID],
   ANY(
    Me[ID]
  ) = [EmployeeReview].[Employee].[ReportingOfficer] ),
   OR(
     AND(
       [Type] = "Cycle_Annual",
       TODAY(
    ) >= [EmployeeReview].[Cycle].[AppraisalStart],
     TODAY(
  ) <= [EmployeeReview].[Cycle].[AppraisalEnd] ),
   AND(
     [Type] = "Cycle_Mid",
     TODAY(
  ) >= [EmployeeReview].[Cycle].[SelfMidReviewStart],
   TODAY(
) <= [EmployeeReview].[Cycle].[SelfMidReviewEnd] ) ) )` }
  Status: Enum
  Timestamp: DateTime = NOW()
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  Question: Show [RO]
  Description: Show [RO]
  Instructions: Show [RO]
  HelpVideo: Show [RO] { ShowIf: `=ISNOTBLANK([Objective].[VideoGuide])` }
  Head: Show [RO]
  Cycle: Ref [RO]
  Lable: Ref [RO]
```

### AttendanceDaily (32 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =text([Date],"dd/mm/yyyy")&"-"&[Employee] { ShowIf: `=USEREMAIL()="nomeshwer@ommnomi.in"` }
  Date: Date = TODAY() { EditIf: `=ISBLANK([_THIS])` }
  Employee: Enum = =IFS(
   ISNOTBLANK(
    ANY(
      Me[ID]
    )
  ),
   ANY(
    Me[Employee]
  )
) { EditIf: `=OR(
  ISBLANK([_THIS]
), ISNOTBLANK(
  INTERSECT({"U_People_Admin",
  "U_People_Manager",
  "U_People_User",
  "U_People_Viewer"},
  SPLIT(ANY(
    Me[Roles]
  ),
  ","
))))` }
  Office_Location: Enum [HIDDEN] = =[Employee].[OfficeLocation]
  Office_Calendar: Enum = =[Employee].[OfficeCalendar]
  Office_Shift: Enum = =INDEX(
   FILTER(
    "OfficeShift",
     AND(
       [ISO_WeekDay] = WEEKDAY([_THISROW].[Date]),
       IN(
        [_THISROW].[Office_Calendar],
         [Applicable_Calendars]) ) ),
         1
      ) (→"="Scheduled Shift"")
  Shift_In: Time = =[Office_Shift].[StartTime] { EditIf: `=ISBLANK([_THIS])` }
  Shift_Out: Time = =[Office_Shift].[EndTime] { ValidIf: `=[Shift_Out]>=[Shift_In]` | EditIf: `=ISBLANK([_THIS])` }
  Check_In: DateTime (→"="Check_In"")
  Check_Out: DateTime (→"="Check_Out"") { ValidIf: `=[Check_Out]>[Check_In]` }
  Status: Enum = =IFS(
   AND(
    [AttendanceRequest].[Status] = "Approved",
     1 = 1
  ),
   [AttendanceRequest].[AttendanceStatus],
   AND(
    ISBLANK([Check_In]
  ),
   ISBLANK([Check_Out]),
   [Office_Shift].[Type] <> "Day Off"),
   "Att_U",
   AND(
    ISBLANK([Check_In]
  ),
   ISBLANK([Check_Out]),
   [Office_Shift].[Type] = "Day Off"),
   "Att_WO"
)
  SubStatus: Enum { ShowIf: `=[Status]<>[SubStatus]` }
  Attendance: Enum = =IFS(
   AND(
    ISNOTBLANK(
      [AttendanceRequest]
    ),
     [AttendanceRequest].[Status] = "Approved"),
     [AttendanceRequest].[AttendanceStatus],
     ISNOTBLANK(
      [Check_In]
    ),
     IFS(
       ISBLANK([Check_Out]),
       "AA_MCO",
       ( HOUR([Check_Out] - [Check_In]) >= [Office_Shift].[FullDayHours] ),
       "AA_FD",
       ( HOUR([Check_Out] - [Check_In]) >= [Office_Shift].[HalfDayHours] ),
       "AA_HD",
       TRUE,
       "AA_SH"
    ),
     ISBLANK([Check_In]
  ),
   IFS(
     ISNOTBLANK(
      [Office_Holiday]
    ),
     "Holiday",
     ( [Office_Shift].[Type] = "Day Off" ),
     "Att_WO",
     TRUE,
     "Att_U"
  )
) { ShowIf: `=[Status]<>[Attendance]` }
  Location: LatLong { ValidIf: `=[_THIS]<>"0.000000, 0.000000"` }
  Remarks: LongText
  Office_Holiday: Enum = =INDEX(
   FILTER(
    "OfficeHoliday",
     AND(
       [Date] = [_THISROW].[Date],
       IN(
        [_THISROW].[Office_Calendar],
         [Applicable_Calendars]) ) ),
         1
      )
  AttendanceRequest: Ref = =INDEX(
   FILTER(
     "AttendanceRequest",
     AND(
       [Status] = "Approved",
       [Employee] = [_THISROW].[Employee],
       [StartDate] <= [_THISROW].[Date],
       [EndDate] >= [_THISROW].[Date] ) ),
       1
    )
  LastEditBy: Enum [HIDDEN] = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime [HIDDEN] = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  MonthYear: Enum [RO]
  Office_Check_In: Time [RO] (→"="Actual Check In"")
  Office_Check_Out: Time [RO] (→"="Actual Check Out"")
  Label: Text [RO]
  Details: Text [RO]
  Attendance_Status: Ref [HIDDEN,RO]
  Day_Value: Decimal [RO]
  AttendanceREquestStatus: Text [RO]
  CheckInLateBy: Decimal [RO]
  IsWorking: Yes/No [RO]
  Related AttendanceRequests: List [RO,VC]
  CheckOutLateBy: Number [RO]
```

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
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  Year: Text [RO]
  Month: Text [RO]
```

### OfficeCalendar (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  CalendarName: Name
  Employee_Type: EnumList [Values: 'Full-time', 'Project-based', 'Consultant']
  OfficeLocation: Enum
  Description: LongText
  Leave: EnumList (→"="Office Leave"")
  OfficeShift: EnumList (→"="Office Shift"") { ValidIf: `=COUNT([_THISROW].[OfficeShift]) = COUNT( UNIQUE( SELECT(
  OfficeShift[WeekDay],
   IN(
    [ID],
     [_THISROW].[OfficeShift])) ) )` }
  OfficeHoliday: EnumList = =FILTER(
  OfficeHoliday,
   IN(
    [_THISROW].[ID],
     [Applicable_Calendars])) (→"="Office Holiday"")
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =UTCNOW() { EditIf: `=ISBLANK([_THIS])` }
  Holidays: List [RO]
  Shifts: List [RO]
  OfficeLeave: List [RO]
  Label: Text [RO]
  LocationName: Name [RO]
  Related CandidateDatas: List [RO,VC]
```

### ExpenseClaims (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Employee: Enum { ValidIf: `=IF(
   ISNOTBLANK(
     INTERSECT( {"U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), Employee[ID], LIST(ANY(
  Me[Employee]
)) )` | EditIf: `=ISBLANK([_THIS])` }
  Date: Date = TODAY()
  Project: Enum [HIDDEN] = =[Employee].[Project] { ValidIf: `=Project[ID]` }
  Claim_Project: Enum
  Claim_Type: Enum
  Description: LongText
  Currency: Enum [Values: 'GBP', 'AED', 'SAR', 'QAR', 'MUR', 'LBP', 'JPY', 'USD'] = =AED
  Amount: Decimal (→"="Amount ("&[Currency]&")"")
  Receipt_Files: File
  Status: Enum = ="Pending" { ValidIf: `=IF(
   ISNOTBLANK(
    INTERSECT({ "U_Employee"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Pending"}, { ""} ) + IF(
   ISNOTBLANK(
    INTERSECT({ "U_Reporting_Officer"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Approved", "Rejected"}, { ""} ) + IF(
   ISNOTBLANK(
     INTERSECT( { "U_Finance_User",
     "U_Finance_Manager",
     "U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), { "Processed", "Rejected"}, { ""} )` }
  Manager_Ref: Enum = =[Employee].[ReportingOfficer] { EditIf: `=ISBLANK([_THIS])` }
  FolderID: Text
  FolderURL: Url
  FinalReceiptURL: Url
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
```

### OfficeHoliday (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Date: Date = TODAY() { ValidIf: `=ISBLANK( FILTER(
   "OfficeHoliday",
   AND(
     [_THISROW].[Date] = [Date],
     [_THISROW].[Title] = [Title],
     [_THISROW].[ID] <> [ID] ) ) )` }
  Title: Text { ValidIf: `=ISBLANK( FILTER(
   "OfficeHoliday",
   AND(
     [_THISROW].[Date] = [Date],
     [_THISROW].[Title] = [Title],
     [_THISROW].[ID] <> [ID] ) ) )` }
  Description: LongText
  Applicable_Calendars: EnumList
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  Year: Enum [RO]
  Label: Text [RO]
```

### OfficeLeave (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  LeaveType: Enum
  AllocationCycle: Enum
  LeaveCount: Number
  Applicable_Calendars: EnumList
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
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
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
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
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
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
  Roles: EnumList { ValidIf: `=SPLIT( LOOKUP(
  "AppUserRoles",
   "AppVariables",
   "ID",
   "EnumValue"
), ", " )` }
  Standard: Yes/No [HIDDEN] = =IF(ANY(Me[ID])="OmmNoMi",TRUE,FALSE)
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
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
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  Related CandidateDatas: List [RO,VC]
```

### OfficeShift (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum [Values: 'Fixed', 'Flexible', 'Day Off'] { EditIf: `=ISBLANK([_THIS])` }
  ISO_WeekDay: Number
  WeekDay: Enum { EditIf: `=Not(IN([ID], OfficeShift[ID]))` }
  StartTime: Time { EditIf: `=Not(IN([ID], OfficeShift[ID]))` }
  EndTime: Time { EditIf: `=Not(IN([ID], OfficeShift[ID]))` }
  FullDayHours: Number { EditIf: `=ISBLANK([_THIS])` }
  HalfDayHours: Number { EditIf: `=ISBLANK([_THIS])` }
  Applicable_Calendars: EnumList
  Status: Enum [Values: 'Active'] = ="Active"
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  Label: Name [RO]
```

### AttendanceRequest (31 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { ShowIf: `=USEREMAIL()="nomeshwer@ommnomi.in"` }
  RequestType: Enum [Values: 'Leave Application', 'Work From Home', 'Remote Work', 'Time Off in Lieu (TOIL)', 'Attendance Regularization'] { EditIf: `=ISBLANK([_THIS])` }
  Leave: Enum [Values: 'Full Day', 'Half Day'] = =IF(
  [RequestType] = "Leave Application",
   "Full Day",
   ""
) { ShowIf: `=or(
  [RequestType]="Leave Application",
  [RequestType]="Time Off in Lieu (TOIL)")` | ReqIf: `=or(
  [RequestType]="Leave Application",
  [RequestType]="Time Off in Lieu (TOIL)")` | EditIf: `=or(
  [RequestType]="Leave Application",
  [RequestType]="Time Off in Lieu (TOIL)")` }
  LeaveSession: Enum [Values: 'First Half', 'Second Half'] { ShowIf: `=and(
  [RequestType]="Leave Application",
  [Leave]="Half Day"
)` | ValidIf: `=and(
  [RequestType]="Leave Application",
  [Leave]="Half Day"
)` | ReqIf: `=and(
  [RequestType]="Leave Application",
  [Leave]="Half Day"
)` }
  Employee: Ref { EditIf: `=AND(
   NOT(IN(
    [_THISROW].[ID],
     AttendanceRequest[ID])),
     ISNOTBLANK(
      INTERSECT({ "U_People_Admin"},
       SPLIT(ANY(
        Me[Roles]
      ),
       ","
    )
  )
) )` }
  StartDate: Date = =IF(
   ISNOTBLANK(
    [AttendanceDaily]
  ),
   [AttendanceDaily].[Date],
   TODAY(
) + 1 ) (→"="Valid From"") { ShowIf: `=ISNOTBLANK([RequestType])` | ValidIf: `=IF(
   IN(
    [RequestType],
     {"Attendance Regularization",
     "Time Off in Lieu (TOIL)"}),
     TRUE,
     AND(
       OR(
         [StartDate] >= TODAY(),
         IN(
          "U_People_Admin",
           SPLIT(ANY(
            Me[Roles]
          ),
           ","
        )
      ),
       AND(
         ISNOTBLANK(
          INTERSECT({"U_Reporting_Officer"},
           SPLIT(ANY(
            Me[Roles]
          ),
           ","
        )
      )
    ),
     [Employee].[ReportingOfficer] = ANY(
      Me[Employee]
    )
  )
), ISBLANK( FILTER(
   "AttendanceRequest",
   AND(
     ([ID] <> [_THISROW].[ID]),
     ([Employee] = [_THISROW].[Employee]),
     ([StartDate] <= [_THISROW].[EndDate]),
     ([EndDate] >= [_THISROW].[StartDate]),
     ([Status] <> "Rejected") ) ) ) ) )` | EditIf: `=OR(
   CONTEXT("ViewType"
) <> "Form", IN(
  [RequestType],
   {"Work From Home",
   "Leave Application",
   "Remote Work"}
) )` }
  EndDate: Date = =IF(
   ISNOTBLANK(
    [AttendanceDaily]
  ),
   [AttendanceDaily].[Date],
   [StartDate]
) (→"="Valid To"") { ShowIf: `=AND(
   IN(
    [RequestType],
     {"Leave Application",
     "Remote Work",
     "Work From Home"}
  ),
   [Leave] <> "Half Day",
   [RequestType] <> "Attendance Regularization" )` | ValidIf: `=AND(
   IF(
     [Leave] = "Half Day",
     [EndDate] = [StartDate],
     [EndDate] >= [StartDate] ),
     ISBLANK( SELECT(
       AttendanceRequest[ID],
       AND(
         [ID] <> [_THISROW].[ID],
         [Employee] = [_THISROW].[Employee],
         [StartDate] <= [_THISROW].[EndDate],
         [EndDate] >= [_THISROW].[StartDate],
         OR(
          [Status] = "Approved",
           [Status] = "Requested") ) ) ),
           IF(
             IN(
              [RequestType],
               {"Attendance Regularization",
               "Time Off in Lieu (TOIL)"}),
               true,
               OR(
                 [EndDate] >= TODAY(),
                 ISNOTBLANK(
                  INTERSECT({"U_Reporting_Officer"},
                  SPLIT(ANY(
                    Me[Roles]
                  ),
                  ","
                )
              )
            ),
             AND(
               IN(
                "Reporting_Officer",
                 SPLIT(ANY(
                  Me[Roles]
                ),
                 ","
              )
            ),
             [Employee].[ReportingOfficer] = ANY(
              Me[Employee]
            )
          )
        )
      )
    )` }
  LeaveType: Enum { ShowIf: `=IN([RequestType],{"Leave Application"})` | ValidIf: `=[RequestType]="Leave Application"` }
  LeaveAllocation: Enum { ShowIf: `=IN([RequestType],{"Leave Application"})` | ValidIf: `=IF(
   [Leave] = "Half Day",
   0.5,
   ( TOTALHOURS([EndDate] - [StartDate]) / 24.0 ) ) <= [LeaveAllocation].[Available]` | ReqIf: `=[RequestType]="Leave Application"` }
  LeaveUsed: Decimal { ShowIf: `=IN([RequestType],{"Leave Application"})` }
  Remarks: LongText (→"=[Status]&" Remarks"")
  PendingRow: Number { ShowIf: `=AND(
   ISNOTBLANK(
     INTERSECT( {"U_System_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), [PendingRow]<>0,[Status]="Approved", IN(
  [RequestType],
   { "Leave Application",
   "Remote Work",
   "Work From Home"}
) )` }
  AttendanceDaily: Ref { ShowIf: `=IN(
  [RequestType],
   {"Attendance Regularization",
   "Time Off in Lieu (TOIL)"})` | ValidIf: `=SELECT(
   AttendanceDaily[ID],
   [Employee] = [_THISROW].[Employee] )` | ReqIf: `=IN(
  [RequestType],
   {"Time Off in Lieu (TOIL)",
   "Attendance Regularization"})` | EditIf: `=ISBLANK([_THIS])` }
  CorrectCheckIn: Time = =[AttendanceDaily].[Office_Check_In] { ShowIf: `=[RequestType] = "Attendance Regularization"` }
  CorrectCheckOut: Time = =[AttendanceDaily].[Office_Check_In] { ShowIf: `=[RequestType] = "Attendance Regularization"` }
  Status: Enum [Values: 'Requested', 'Approved', 'Rejected'] = ="Requested"
  CreatedBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  CreatedOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  LastEditBy: Enum = =ANY(Me[ID]) { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime = =NOW() { EditIf: `=ISBLANK([_THIS])` }
  Related AttendanceDailys: List [HIDDEN,RO,VC]
  AttendanceStatus: Enum [RO]
  Label: Text [RO]
  AttendanceDailyCount: Number [HIDDEN,RO]
  CalendarTittle: Text [RO]
  CalendarEndDate: Date [HIDDEN,RO] { ValidIf: `=ISBLANK( SELECT(
   AttendanceRequest[ID],
   AND(
     [ID] <> [_THISROW].[ID],
     [Employee] = [_THISROW].[Employee],
     [StartDate] <= [_THISROW].[EndDate],
     [EndDate] >= [_THISROW].[StartDate],
     OR(
       [Status] = "Approved",
       [Status] = "Requested" ) ),
       TRUE
    )
  )` }
  ReportingOfficer: Ref [RO] (→"="Line Manager"")
  Requested_Days_Total: Decimal [HIDDEN,RO]
  Description: Text [HIDDEN,RO]
  Related LeaveAllocations: List [HIDDEN,RO,VC]
```

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
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text
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
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForPassport Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreatePassport Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CreatePassportBackCover Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForDiploma Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateDiploma Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForLaborCard Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateLaborCard Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForNationalID Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateNationalID Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForNoObjectionCertificate Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateNOC Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForResidencyVisa Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateResidencyVisa Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForMedical Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateMedical Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckForPoliceClearance Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreatePoliceClearance Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckReferenceLetter1 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateReferenceLetter1 Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckReferenceLetter2 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateReferenceLetter2 Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckFamilyBook Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateFamilyBook Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckBeforeCreatingTheChecklist Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetInputEmployeeOnChecklist Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CreateTasksForEmployee Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for UpdateEmployee - 1 Process Table (102 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text
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
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### create task Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CreateOfferletterTemplate Output (3 cols)
```
  Instance Id: Text
  fileURL: Url
  fileName: Text
```

### ReturnValueInDocument Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### Onboarding Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CommunicationForOnboarding Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### NewEmployeeAnouncment Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateAppUserID Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### add appuser from employee Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CommunicationForNEA Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CheckBeforeCreatingTheTasksForOnBoarding Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetInputEmployeeOnChecklist Output 2 (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CreateTasksForEmployeeOnboarding Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

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
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### CreateCodeOfConductDocument Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

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
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### RemoveValueFrom CommunicationTable Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for DocumentHandler Process Table (21 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_this])` }
  Employee: Ref { EditIf: `=ISBLANK([_THIS])` }
  DocumentType: Enum
  DocumentName: Text
  DocumentNumber: Text
  IssueDate: Date
  ExpiryDate: Date
  FileAttachment: File
  FileURL: Url
  DriveFileID: Text { EditIf: `=1=2` }
  DriveFileURL: Url { EditIf: `=1=2` }
  SubStatus: Enum [Values: 'Pending', 'Verified', 'Rejected', 'Archived']
  Notes: LongText
  LastEditedBy: Enum { EditIf: `=ISBLANK([_this])` }
  LastEditedOn: DateTime { EditIf: `=ISBLANK([_this])` }
  Status: Enum
  EmployeeStatus: Enum
  The document is updated: Ref
  Update the file path: Ref
  Update File ID and URL: Ref
```

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
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_this])` }
  Employee: Ref { EditIf: `=ISBLANK([_THIS])` }
  DocumentType: Enum
  DocumentName: Text
  DocumentNumber: Text
  IssueDate: Date
  ExpiryDate: Date
  FileAttachment: File
  FileURL: Url
  DriveFileID: Text { EditIf: `=1=2` }
  DriveFileURL: Url { EditIf: `=1=2` }
  SubStatus: Enum [Values: 'Pending', 'Verified', 'Rejected', 'Archived']
  Notes: LongText
  LastEditedBy: Enum { EditIf: `=ISBLANK([_this])` }
  LastEditedOn: DateTime { EditIf: `=ISBLANK([_this])` }
  Status: Enum
  EmployeeStatus: Enum
```

### Process for CommunicationEmail Process Table (24 cols)
```
  Instance Id: Text
  ID: Text
  Template: Enum
  Employee: Ref
  Date: Date
  Subject: Enum [Values: 'Performance Review']
  To: EnumList
  CC: EnumList
  BCC: EnumList
  ReplayTo: Enum
  Sender: Text
  Status: Enum [Values: 'Draft', 'Send', 'Sent']
  CreatedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  CreatedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  LastEditedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Send Internal Announcement: Ref
  SetTheStatusAsSent: Ref
  CheckNewJoinee: Ref
  SetTheStatusAsSent NA: Ref
  EmployeeOnboarding: Ref
  SetTheStatusSentEmployeeOnboarding: Ref
  New step: Ref
  New step 1 2 2: Ref
```

### Send Internal Announcement Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetTheStatusAsSent Output (16 cols)
```
  Instance Id: Text
  ID: Text
  Template: Enum
  Employee: Ref
  Date: Date
  Subject: Enum [Values: 'Performance Review']
  To: EnumList
  CC: EnumList
  BCC: EnumList
  ReplayTo: Enum
  Sender: Text
  Status: Enum [Values: 'Draft', 'Send', 'Sent']
  CreatedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  CreatedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  LastEditedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
```

### CheckNewJoinee Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetTheStatusAsSent NA Output (16 cols)
```
  Instance Id: Text
  ID: Text
  Template: Enum
  Employee: Ref
  Date: Date
  Subject: Enum [Values: 'Performance Review']
  To: EnumList
  CC: EnumList
  BCC: EnumList
  ReplayTo: Enum
  Sender: Text
  Status: Enum [Values: 'Draft', 'Send', 'Sent']
  CreatedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  CreatedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  LastEditedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
```

### EmployeeOnboarding Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SetTheStatusSentEmployeeOnboarding Output (16 cols)
```
  Instance Id: Text
  ID: Text
  Template: Enum
  Employee: Ref
  Date: Date
  Subject: Enum [Values: 'Performance Review']
  To: EnumList
  CC: EnumList
  BCC: EnumList
  ReplayTo: Enum
  Sender: Text
  Status: Enum [Values: 'Draft', 'Send', 'Sent']
  CreatedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  CreatedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  LastEditedBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditedOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
```

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
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text
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
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text
  - check: Ref
  - create attendance: Ref
  - Create Attendance 2: Ref

### check Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### create attendance Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### Create Attendance 2 Output (72 cols)
[Inherits all 72 columns from Table: Employee]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggersCalledFromApp Process Table (24 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
  Create AttendanceDaily Row: Ref
  Delete the AttendnaceDaily not relate to the same day: Ref
  If PickDate+count is before PickDateTime: Ref
  Create row for PickDate+0: Ref
  If PickDate+0 is before PickDateTime 2: Ref
  Create row for PickDate+1: Ref
  Sync Attendance Request: Ref
  Sync LeaveAllocation: Ref
```

### Create AttendanceDaily Row Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete the AttendnaceDaily not relate to the same day Output (16 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
```

### If PickDate+count is before PickDateTime Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create row for PickDate+0 Output (16 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
```

### If PickDate+0 is before PickDateTime 2 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create row for PickDate+1 Output (16 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
```

### Sync Attendance Request Output (16 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
```

### Sync LeaveAllocation Output (16 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
```

### Process for TriggerHourlyActions - 1 Process Table (19 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
  for Unmarked attendance with check in & out: Ref
  Set as Present: Ref
  for tomorrow attendnace: Ref
```

### for Unmarked attendance with check in &amp; out Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set as Present Output (16 cols)
```
  Instance Id: Text
  ID: Text { EditIf: `=ISBLANK([_THIS])` }
  AppTrigger: Enum
  Bot: Yes/No
  Type: Enum
  Table: Enum
  PickEmployee: Enum { ShowIf: `=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ","
) )` }
  PickWeekYear: Enum
  PickDate: Date
  PickDateTime: DateTime
  ValueText: Text
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum { EditIf: `=isblank([_THIS])` }
  CreatedOn: DateTime { EditIf: `=isblank([_THIS])` }
  Date: Text
```

### for tomorrow attendnace Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for SyncAttendenceDaily - 1 Process Table (19 cols)
```
  Instance Id: Text
  ID: Text
  Level: Enum [Values: 'System', 'Code']
  Table: Enum
  Trigger: Enum
  View: Enum
  Column: Enum
  Title: Text
  Description: LongText
  Role: EnumList { ValidIf: `=sort(
  split(lookup(
    "AppUserRoles ",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","
),false)` | EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Email: Enum { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  User: Enum { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Decimal: Number
  Date: Date
  AllowedValues: EnumList
  LastEditBy: Enum { EditIf: `=isblank([_THIS])` }
  LastEditOn: DateTime { EditIf: `=isblank([_THIS])` }
  Sync LeaveAllocation: Ref
  Sync Every Row: Ref
```

### Sync LeaveAllocation Output 2 (17 cols)
```
  Instance Id: Text
  ID: Text
  Level: Enum [Values: 'System', 'Code']
  Table: Enum
  Trigger: Enum
  View: Enum
  Column: Enum
  Title: Text
  Description: LongText
  Role: EnumList { ValidIf: `=sort(
  split(lookup(
    "AppUserRoles ",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","
),false)` | EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Email: Enum { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  User: Enum { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Decimal: Number
  Date: Date
  AllowedValues: EnumList
  LastEditBy: Enum { EditIf: `=isblank([_THIS])` }
  LastEditOn: DateTime { EditIf: `=isblank([_THIS])` }
```

### Sync Every Row Output (17 cols)
```
  Instance Id: Text
  ID: Text
  Level: Enum [Values: 'System', 'Code']
  Table: Enum
  Trigger: Enum
  View: Enum
  Column: Enum
  Title: Text
  Description: LongText
  Role: EnumList { ValidIf: `=sort(
  split(lookup(
    "AppUserRoles ",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","
),false)` | EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Email: Enum { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  User: Enum { EditIf: `=ISNOTBLANK(
  INTERSECT(Any(
    Me[AllowedRoles]
  ),
  {"U_System_Admin"}
))` }
  Decimal: Number
  Date: Date
  AllowedValues: EnumList
  LastEditBy: Enum { EditIf: `=isblank([_THIS])` }
  LastEditOn: DateTime { EditIf: `=isblank([_THIS])` }
```

### Process for Created AttendanceRequest Process Table (32 cols)
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text
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
```
  Instance Id: Text
  ID: Text
  Employee: Enum { ValidIf: `=IF(
   ISNOTBLANK(
     INTERSECT( {"U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), Employee[ID], LIST(ANY(
  Me[Employee]
)) )` | EditIf: `=ISBLANK([_THIS])` }
  Date: Date
  Project: Enum { ValidIf: `=Project[ID]` }
  Claim_Project: Enum
  Claim_Type: Enum
  Description: LongText
  Currency: Enum [Values: 'GBP', 'AED', 'SAR', 'QAR', 'MUR', 'LBP', 'JPY', 'USD']
  Amount: Decimal
  Receipt_Files: File
  Status: Enum { ValidIf: `=IF(
   ISNOTBLANK(
    INTERSECT({ "U_Employee"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Pending"}, { ""} ) + IF(
   ISNOTBLANK(
    INTERSECT({ "U_Reporting_Officer"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Approved", "Rejected"}, { ""} ) + IF(
   ISNOTBLANK(
     INTERSECT( { "U_Finance_User",
     "U_Finance_Manager",
     "U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), { "Processed", "Rejected"}, { ""} )` }
  Manager_Ref: Enum { EditIf: `=ISBLANK([_THIS])` }
  FolderID: Text
  FolderURL: Url
  FinalReceiptURL: Url
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Check Employee Folder: Ref
  MoveReceiptFile: Ref
  AppFile URL: Ref
```

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
```
  Instance Id: Text
  ID: Text
  Employee: Enum { ValidIf: `=IF(
   ISNOTBLANK(
     INTERSECT( {"U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), Employee[ID], LIST(ANY(
  Me[Employee]
)) )` | EditIf: `=ISBLANK([_THIS])` }
  Date: Date
  Project: Enum { ValidIf: `=Project[ID]` }
  Claim_Project: Enum
  Claim_Type: Enum
  Description: LongText
  Currency: Enum [Values: 'GBP', 'AED', 'SAR', 'QAR', 'MUR', 'LBP', 'JPY', 'USD']
  Amount: Decimal
  Receipt_Files: File
  Status: Enum { ValidIf: `=IF(
   ISNOTBLANK(
    INTERSECT({ "U_Employee"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Pending"}, { ""} ) + IF(
   ISNOTBLANK(
    INTERSECT({ "U_Reporting_Officer"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Approved", "Rejected"}, { ""} ) + IF(
   ISNOTBLANK(
     INTERSECT( { "U_Finance_User",
     "U_Finance_Manager",
     "U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), { "Processed", "Rejected"}, { ""} )` }
  Manager_Ref: Enum { EditIf: `=ISBLANK([_THIS])` }
  FolderID: Text
  FolderURL: Url
  FinalReceiptURL: Url
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
```

### Process for Check In-Out Reminder Text Process Table (34 cols)
[Inherits all 32 columns from Table: AttendanceDaily]
+ Modified/Added Columns:
  - Instance Id: Text
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
[Inherits all 32 columns from Table: AttendanceDaily]
+ Modified/Added Columns:
  - Instance Id: Text
  - Check: Ref
  - AddCheckIn&Out: Ref
  - AddCheckOut: Ref

### Check Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### AddCheckIn&amp;Out Output (32 cols)
[Inherits all 32 columns from Table: AttendanceDaily]
+ Modified/Added Columns:
  - Instance Id: Text

### AddCheckOut Output (32 cols)
[Inherits all 32 columns from Table: AttendanceDaily]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for Created ExpenseClaims Process Table (19 cols)
```
  Instance Id: Text
  ID: Text
  Employee: Enum { ValidIf: `=IF(
   ISNOTBLANK(
     INTERSECT( {"U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), Employee[ID], LIST(ANY(
  Me[Employee]
)) )` | EditIf: `=ISBLANK([_THIS])` }
  Date: Date
  Project: Enum { ValidIf: `=Project[ID]` }
  Claim_Project: Enum
  Claim_Type: Enum
  Description: LongText
  Currency: Enum [Values: 'GBP', 'AED', 'SAR', 'QAR', 'MUR', 'LBP', 'JPY', 'USD']
  Amount: Decimal
  Receipt_Files: File
  Status: Enum { ValidIf: `=IF(
   ISNOTBLANK(
    INTERSECT({ "U_Employee"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Pending"}, { ""} ) + IF(
   ISNOTBLANK(
    INTERSECT({ "U_Reporting_Officer"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Approved", "Rejected"}, { ""} ) + IF(
   ISNOTBLANK(
     INTERSECT( { "U_Finance_User",
     "U_Finance_Manager",
     "U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), { "Processed", "Rejected"}, { ""} )` }
  Manager_Ref: Enum { EditIf: `=ISBLANK([_THIS])` }
  FolderID: Text
  FolderURL: Url
  FinalReceiptURL: Url
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Check for the Line Manager: Ref
```

### Check for the Line Manager Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for Approve ExpenseClaims Process Table (20 cols)
```
  Instance Id: Text
  ID: Text
  Employee: Enum { ValidIf: `=IF(
   ISNOTBLANK(
     INTERSECT( {"U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), Employee[ID], LIST(ANY(
  Me[Employee]
)) )` | EditIf: `=ISBLANK([_THIS])` }
  Date: Date
  Project: Enum { ValidIf: `=Project[ID]` }
  Claim_Project: Enum
  Claim_Type: Enum
  Description: LongText
  Currency: Enum [Values: 'GBP', 'AED', 'SAR', 'QAR', 'MUR', 'LBP', 'JPY', 'USD']
  Amount: Decimal
  Receipt_Files: File
  Status: Enum { ValidIf: `=IF(
   ISNOTBLANK(
    INTERSECT({ "U_Employee"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Pending"}, { ""} ) + IF(
   ISNOTBLANK(
    INTERSECT({ "U_Reporting_Officer"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Approved", "Rejected"}, { ""} ) + IF(
   ISNOTBLANK(
     INTERSECT( { "U_Finance_User",
     "U_Finance_Manager",
     "U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), { "Processed", "Rejected"}, { ""} )` }
  Manager_Ref: Enum { EditIf: `=ISBLANK([_THIS])` }
  FolderID: Text
  FolderURL: Url
  FinalReceiptURL: Url
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Approved Expense Update to Employee: Ref
  Processed Expense: Ref
```

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
```
  Instance Id: Text
  ID: Text
  Employee: Enum { ValidIf: `=IF(
   ISNOTBLANK(
     INTERSECT( {"U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), Employee[ID], LIST(ANY(
  Me[Employee]
)) )` | EditIf: `=ISBLANK([_THIS])` }
  Date: Date
  Project: Enum { ValidIf: `=Project[ID]` }
  Claim_Project: Enum
  Claim_Type: Enum
  Description: LongText
  Currency: Enum [Values: 'GBP', 'AED', 'SAR', 'QAR', 'MUR', 'LBP', 'JPY', 'USD']
  Amount: Decimal
  Receipt_Files: File
  Status: Enum { ValidIf: `=IF(
   ISNOTBLANK(
    INTERSECT({ "U_Employee"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Pending"}, { ""} ) + IF(
   ISNOTBLANK(
    INTERSECT({ "U_Reporting_Officer"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
)), { "Approved", "Rejected"}, { ""} ) + IF(
   ISNOTBLANK(
     INTERSECT( { "U_Finance_User",
     "U_Finance_Manager",
     "U_Finance_Admin"},
     SPLIT(ANY(
      Me[Roles]
    ),
     ","
  )
) ), { "Processed", "Rejected"}, { ""} )` }
  Manager_Ref: Enum { EditIf: `=ISBLANK([_THIS])` }
  FolderID: Text
  FolderURL: Url
  FinalReceiptURL: Url
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Approved Expense Update to Employee: Ref
```

### Approved Expense Update to Employee Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for SyncTriggerCalendarHoliday Process Table (20 cols)
```
  Instance Id: Text
  ID: Text
  CalendarName: Name
  Employee_Type: EnumList [Values: 'Full-time', 'Project-based', 'Consultant']
  OfficeLocation: Enum
  Description: LongText
  Leave: EnumList
  OfficeShift: EnumList { ValidIf: `=COUNT([_THISROW].[OfficeShift]) = COUNT( UNIQUE( SELECT(
  OfficeShift[WeekDay],
   IN(
    [ID],
     [_THISROW].[OfficeShift])) ) )` }
  OfficeHoliday: EnumList
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Holidays: List
  Shifts: List
  OfficeLeave: List
  Label: Text
  LocationName: Name
  Related CandidateDatas: List [VC]
  Check: Ref
  Execute_Sync_on_Holidays: Ref
```

### Check Output 3 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Execute_Sync_on_Holidays Output (18 cols)
```
  Instance Id: Text
  ID: Text
  CalendarName: Name
  Employee_Type: EnumList [Values: 'Full-time', 'Project-based', 'Consultant']
  OfficeLocation: Enum
  Description: LongText
  Leave: EnumList
  OfficeShift: EnumList { ValidIf: `=COUNT([_THISROW].[OfficeShift]) = COUNT( UNIQUE( SELECT(
  OfficeShift[WeekDay],
   IN(
    [ID],
     [_THISROW].[OfficeShift])) ) )` }
  OfficeHoliday: EnumList
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Holidays: List
  Shifts: List
  OfficeLeave: List
  Label: Text
  LocationName: Name
  Related CandidateDatas: List [RO,VC]
```

### Process for CalendarHolidaySyncBot - 1 Process Table (20 cols)
```
  Instance Id: Text
  ID: Text
  CalendarName: Name
  Employee_Type: EnumList [Values: 'Full-time', 'Project-based', 'Consultant']
  OfficeLocation: Enum
  Description: LongText
  Leave: EnumList
  OfficeShift: EnumList { ValidIf: `=COUNT([_THISROW].[OfficeShift]) = COUNT( UNIQUE( SELECT(
  OfficeShift[WeekDay],
   IN(
    [ID],
     [_THISROW].[OfficeShift])) ) )` }
  OfficeHoliday: EnumList
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Holidays: List
  Shifts: List
  OfficeLeave: List
  Label: Text
  LocationName: Name
  Related CandidateDatas: List [VC]
  New step: Ref
  New step 1: Ref
```

### New step Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### New step 1 Output (18 cols)
```
  Instance Id: Text
  ID: Text
  CalendarName: Name
  Employee_Type: EnumList [Values: 'Full-time', 'Project-based', 'Consultant']
  OfficeLocation: Enum
  Description: LongText
  Leave: EnumList
  OfficeShift: EnumList { ValidIf: `=COUNT([_THISROW].[OfficeShift]) = COUNT( UNIQUE( SELECT(
  OfficeShift[WeekDay],
   IN(
    [ID],
     [_THISROW].[OfficeShift])) ) )` }
  OfficeHoliday: EnumList
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Holidays: List
  Shifts: List
  OfficeLeave: List
  Label: Text
  LocationName: Name
  Related CandidateDatas: List [RO,VC]
```

### Process for HolidayCalendarSyncBot - 1 Process Table (13 cols)
```
  Instance Id: Text
  ID: Text
  Date: Date { ValidIf: `=ISBLANK( FILTER(
   "OfficeHoliday",
   AND(
     [_THISROW].[Date] = [Date],
     [_THISROW].[Title] = [Title],
     [_THISROW].[ID] <> [ID] ) ) )` }
  Title: Text { ValidIf: `=ISBLANK( FILTER(
   "OfficeHoliday",
   AND(
     [_THISROW].[Date] = [Date],
     [_THISROW].[Title] = [Title],
     [_THISROW].[ID] <> [ID] ) ) )` }
  Description: LongText
  Applicable_Calendars: EnumList
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Year: Enum
  Label: Text
  Check: Ref
  Trigger Calendar Sync: Ref
```

### Check Output 4 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Trigger Calendar Sync Output (11 cols)
```
  Instance Id: Text
  ID: Text
  Date: Date { ValidIf: `=ISBLANK( FILTER(
   "OfficeHoliday",
   AND(
     [_THISROW].[Date] = [Date],
     [_THISROW].[Title] = [Title],
     [_THISROW].[ID] <> [ID] ) ) )` }
  Title: Text { ValidIf: `=ISBLANK( FILTER(
   "OfficeHoliday",
   AND(
     [_THISROW].[Date] = [Date],
     [_THISROW].[Title] = [Title],
     [_THISROW].[ID] <> [ID] ) ) )` }
  Description: LongText
  Applicable_Calendars: EnumList
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum { EditIf: `=ISBLANK([_THIS])` }
  LastEditOn: DateTime { EditIf: `=ISBLANK([_THIS])` }
  Year: Enum
  Label: Text
```

### Sync this Employee Leave Balance Process Table (33 cols)
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text
  - Sync this AttendanceRequest: Ref
  - Sync this LeaveAllocation: Ref

### Sync this AttendanceRequest Output (31 cols)
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text

### Sync this LeaveAllocation Output (31 cols)
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for AttendanceRequestApproval Process Table (42 cols)
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text
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
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text

### Create Rows in AttendanceDaily Output (31 cols)
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text

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
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text

### Process TOIL Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create TOIL Allocation Output (31 cols)
[Inherits all 31 columns from Table: AttendanceRequest]
+ Modified/Added Columns:
  - Instance Id: Text

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
