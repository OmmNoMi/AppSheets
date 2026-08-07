# TCW — AppSheet Schema (v1.000055)
> Parsed: (Loading...) | 40T / 1066C / 3S / 55V / 198A / 0FR
> Deployable: No | Runnable: Yes

## Tables
```
  _Per User Settings        src=native   sheet=?                    mode=UPDATES_ONLY
  AppUser                   src=google   sheet=AppUser              mode=ALL_CHANGES
  AppViews                  src=google   sheet=AppViews             mode=ALL_CHANGES
  AppSettings               src=google   sheet=AppSettings          mode=ALL_CHANGES
  AppVariables              src=google   sheet=AppVariables         mode=ALL_CHANGES
  AppTriggers               src=google   sheet=AppTriggers          mode=ALL_CHANGES
  AppTimeline               src=google   sheet=AppTimeline          mode=ALL_CHANGES
  AppResources              src=google   sheet=AppResources         mode=ALL_CHANGES
  FormIntake                src=google   sheet=FormIntake           mode=UPDATES_ONLY
  Client                    src=google   sheet=Client               mode=ALL_CHANGES
  Insurance                 src=google   sheet=Insurance            mode=ALL_CHANGES
  Payment                   src=google   sheet=Payment              mode=ALL_CHANGES
  Medication                src=google   sheet=Medication           mode=ALL_CHANGES
  Document                  src=google   sheet=Document             mode=ALL_CHANGES
  Session                   src=google   sheet=Session              mode=ALL_CHANGES
  SessionNotes              src=google   sheet=SessionNotes         mode=ALL_CHANGES
  Process for ChangesInClient Process Table src=native   sheet=?                    mode=READ_ONLY
  Existing Client Drive Folder Output src=native   sheet=?                    mode=READ_ONLY
  Create Client Drive Folder Output src=native   sheet=?                    mode=READ_ONLY
  Update Client Drive Folder ID Output src=native   sheet=?                    mode=READ_ONLY
  Is New Client Output      src=native   sheet=?                    mode=READ_ONLY
  1st Medication from Intake Output src=native   sheet=?                    mode=READ_ONLY
  1st Row to Medication Output src=native   sheet=?                    mode=READ_ONLY
  2nd Medication from Intake Output src=native   sheet=?                    mode=READ_ONLY
  2nd Row to Medication Output src=native   sheet=?                    mode=READ_ONLY
  3rd Medication from Intake Output src=native   sheet=?                    mode=READ_ONLY
  3rd Row to Medication Output src=native   sheet=?                    mode=READ_ONLY
  Process for Document Processing Process Table src=native   sheet=?                    mode=READ_ONLY
  if new Therapy Contract Output src=native   sheet=?                    mode=READ_ONLY
  Create Therapy Contract Output src=native   sheet=?                    mode=READ_ONLY
  ReturnValueInDocument Output src=native   sheet=?                    mode=READ_ONLY
  If file have to be moved Output src=native   sheet=?                    mode=READ_ONLY
  Move File and Rename Output src=native   sheet=?                    mode=READ_ONLY
  If the File URL was returned Output src=native   sheet=?                    mode=READ_ONLY
  Update FileInfo Output    src=native   sheet=?                    mode=READ_ONLY
  Process for ProcessforNewIntakeResponse - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Check for Front Insurance Card Output src=native   sheet=?                    mode=READ_ONLY
  Add Front Insurance Card Document Output src=native   sheet=?                    mode=READ_ONLY
  Check for Back Insurance Card Output src=native   sheet=?                    mode=READ_ONLY
  Add Insurance Output      src=native   sheet=?                    mode=READ_ONLY
```

## Columns
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
  Me: Enum (→"="Logged in As"")
  AccessKey: Text { Logic: [ShowIf]="=1=2" }
  Option 7: Text [HIDDEN]
  Option 8: Text [HIDDEN]
  Option 9: Text [HIDDEN]
  _THISUSER: Text [HIDDEN] = [Init: onlyvalue]
```

### AppUser (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: =UPPER(TEXT(LEFT(UNIQUEID(), 4)))]
  Photo: Image
  Email: Email
  Name: Name
  Roles: EnumList = [Init: ="U_Employee"]
  AccessKey: Text [HIDDEN] = [Init: ="Not in Use"]
  Status: Enum [Values: 'Active', 'Inactive'] = [Init: ="Active"]
  LastEditedBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_this])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditedOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_this])" }
  RolesList: List [RO]
```

### AppViews (16 cols)
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
  AllowValues: EnumList
  AllowMultiple: EnumList
  AllowRoles: EnumList
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  AppLink: App [RO]
```

### AppSettings (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()]
  Tags: EnumList [Values: 'ID is used in Code', 'DataTable based Enforcement', 'DataColumn based Enforcement', 'View based Enforcement', 'Trigger based Enforcement']
  Table: Enum
  Trigger: Enum
  View: Enum
  Column: Enum
  Title: Text
  Description: LongText
  Roles: EnumList { Logic: [ValidIf]="=SPLIT(TEXT(LOOKUP(
  "AppUserRoles",
  "AppVariables",
  "ID",
  "VariableList"
))," , ")" }
  Decimal: Number (→"="Days"")
  Date: Date = [Init: TODAY()]
  AllowedValues: EnumList
  LastEditBy: Enum = [Init: =Any(Me[ID])] { Logic: [EditIf]="=isblank([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=isblank([_THIS])" }
```

### AppVariables (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()]
  Table: EnumList
  Column: EnumList
  Tags: EnumList [Values: 'ID is used in Code', 'ID Connected to Variable', 'Changes on App Copy']
  ValueControl: EnumList [Values: 'Enum', 'EnumList', 'VariableList', 'Date', 'Decimal', 'Photo', 'File', 'URL']
  Title: Text
  Description: LongText
  UsedFor: LongText
  Decimal: Decimal { Logic: [EditIf]="=in("Decimal",[ValueControl])" }
  EnumValue: Enum { Logic: [EditIf]="=in("Enum",[ValueControl])" }
  EnumList: EnumList { Logic: [EditIf]="=in("EnumList",[ValueControl])" }
  VariableList: EnumList { Logic: [ValidIf]="=FILTER(
  "AppVariables",
  CONTAINS(
    "ID Connected to Variable",
    [Tags]
  )
)" | [EditIf]="=in("VariableList",[ValueControl])" }
  DateValue: Date { Logic: [EditIf]="=in("Date",[ValueControl])" }
  Photo: Image { Logic: [EditIf]="=in("Photo",[ValueControl])" }
  URL: Url { Logic: [EditIf]="=in("URL",[ValueControl])" }
  File: File { Logic: [EditIf]="=in("File",[ValueControl])" }
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=isblank([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=isblank([_THIS])" }
```

### AppTriggers (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  AppTrigger: Enum
  Bot: Yes/No = [Init: =if(ISBLANK([_THIS]),TRUE,FALSE)]
  Type: Enum
  Table: Enum
  PickEmployee: Enum { Logic: [ShowIf]="=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ",")
)" }
  PickWeekYear: Enum
  PickDate: Date = [Init: TODAY()]
  PickDateTime: DateTime = [Init: =NOW()]
  ValueText: Text = [Init: =[PickEmployee].[Email]]
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=isblank([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=isblank([_THIS])" }
  Date: Text [RO]
```

### AppTimeline (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()]
  Date: Date = [Init: TODAY()]
  AppTrigger: Enum
  TriggerValue: Text
  TriggeredOn: DateTime
```

### AppResources (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()]
  Category: EnumList [Values: 'System Configuration']
  Tags: EnumList
  Title: Text
  Description: LongText
  Instruction: LongText
  Photo: Image
  Link: Text
  File: File
  Video: Video
  Roles: Enum
  Standard: Yes/No = [Init: =IF(
  IN(
    ANY(
      Me[ID]
    ),
     { "DevNomi",
     "DevHardi",
     "OmmNoMi"}
  ),
   TRUE,
   FALSE
)] { Slices Cross-Ref: Me -> AppUser }
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### FormIntake (93 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Timestamp: DateTime = [Init: NOW()]
  First Name: Name
  Middle Name: Name
  Last Name: Name
  Suffix: Text
  Preferred name: Name
  Also known as: Text
  Pronouns: Text
  Current Administrative Gender: Text
  Gender Identity: Text
  Sexual Orientation: Text
  Race: Text
  Ethnicity: Text
  Preferred Language: Text
  Marital Status: Text
  Religious Affiliation:: Text
  Email Address:: Email
  Mobile phone number: Phone
  Mobile phone voice messages: Text
  Mobile phone text messages: Text
  Home phone number: Phone
  Home phone voice messages: Text
  Preferred Contact Method: Text
  Although our practice uses an encrypted form of email, we cannot guarantee the security of messages once they in your email service or on your computer/device.: Text
  Telehealth - Please mark yes, if you would like the option to receive telehealth services even if you would prefer most services in-person: Text
  Home Address: Address
  Home City: Text
  Home State: Text
  Home Zip: Text
  Time Zone: Text
  Would you like to use your health insurance, EAP or other third party payor benefits?: Text
  Do you have EAP benefits you would like to use?: Text
  What is the name of your EAP program?: Text
  How many sessions are authorized: Text
  Do you have an authorization form sent by your EAP program?: Text
  Please upload a copy of your authorization.: Url
  Do you have insurance you would like to use?: Text
  Is your insurance a Medicare Plan?: Text
  We are not in-network with Medicare. Do you have another insurance plan?: Text
  Name of Insurance Company: Text
  What is the name of your insurance plan?: Text
  Member/Beneficiary ID: Text
  Policy Group Number: Text
  Plan Name: Text
  Is the name and contact information for the primary insured the same as the client?: Text
  Client relationship to policy holder: Text
  Policy holder (First Name): Name
  Policy holder (Middle Name): Name
  Policy holder (Last Name): Name
  Administrative Sex: Text
  Policy Holder Date of Birth:: Date = [Init: TODAY()]
  Policy Holder Address 1: Address
  Policy Holder Address 2: Address
  Policy Holder Zip: Text
  Policy Holder City/State: Text
  Policy Holder Phone Number: Phone
  Is this the client's only insurance plan?: Text
  Front of Insurance Card: Url
  Back of Insurance Card: Url
  Name on Card: Name
  Type of Card.: Text
  Is this a credit card?: Text
  Card Number: Text
  Card Expiration Date: Text
  Security Code: Text
  Billing Street Address: Address
  Billing City: Text
  Billing Zip Code: Text
  Are you currently taking prescription medication?: Text
  Medication Name: Name
  Dosage: Text
  Amount and Frequency: Text
  Symptoms Being Treated: Text
  Prescribed By: Text
  Is there another medication that you take?: Text
  Medication Name #2: Name
  Dosage #2: Text
  Amount and Frequency #2: Number
  Symptoms Being Treated #2: Text
  Prescribed By #2: Text
  Are you taking another medication?: Text
  Medication Name #3: Name
  Dosage #3: Text
  Amount and Frequency #3: Number
  Symptoms Being Treated #3: Text
  Prescribed By #3: Text
  Are you taking additional medication?: Text
  Please list additional medications, including the name of the medication, dosage and frequency, symptoms being treated and the name of the presriber.: Name
  Label: Text [RO]
  Client: Enum [RO]
  _ComputedName: Name [RO,VC]
  _ComputedName2: Name [RO,VC]
```

### Client (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Insurance (33 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Client: Ref
  ProviderName: Name
  UseInsurance: Text
  PolicyNumber: Text
  GroupNumber: Text
  SubscriberName: Name
  SubscriberDOB: Date = [Init: TODAY()]
  SubscriberRelationship: Text
  ExpirationDate: Date = [Init: TODAY()]
  IsMedicare: Text
  SecondaryPlanNotes: LongText
  InsurancePlanName: Name
  MemberBeneficiaryID: Text
  PlanName: Name
  IsPrimaryInsuredSameAsClient: Text
  ClientRelationshipToPolicyHolder: Text
  SubscriberFirstName: Name
  SubscriberMiddleName: Name
  SubscriberLastName: Name
  AdministrativeSex: Text
  SubscriberAddress: Address
  SubscriberAddress2: Address
  SubscriberCityState: Text
  SubscriberZip: Text
  SubscriberPhone: Phone
  IsOnlyPlan: Text
  CreatedBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  _ComputedName: Name [RO,VC]
```

### Payment (22 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()]
  ClientID: Ref
  SessionID: Ref
  PaymentDate: Date = [Init: TODAY()]
  Amount: Number
  PaymentMethod: Enum [Values: 'Master Card', 'Visa']
  TransactionID: Text
  NameOnCard: Name
  TypeOfCard: Text
  IsCreditCard: Yes/No
  CardNumber: Number
  CardExpirationDate: Date = [Init: TODAY()]
  SecurityCode: Text
  BillingStreetAddress: Address
  BillingCity: Text
  BillingZipCode: Text
  Notes: LongText
  CreatedBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### Medication (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Client: Ref { Logic: [EditIf]="=ISBLANK([_THIS])" }
  MedicationName: Name
  Frequency: Text
  Dosage: Text
  FormUnit: Text
  Amount: Text
  SymptomsTreated: Text
  PrescribedBy: Text
  StartDate: Date = [Init: TODAY()]
  EndDate: Date = [Init: TODAY()]
  CreatedBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### Document (14 cols)
[Inherits all 14 columns from Table: ReturnValueInDocument Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Session (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()]
  Client: Ref
  Provider: Text
  SessionDate: Date = [Init: TODAY()]
  StartTime: Time = [Init: TIMENOW()]
  EndTime: Time = [Init: TIMENOW()]
  SessionType: Text
  Status: Text
  CreatedBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Related SessionNotes: List [RO,VC]
  Related Payments: List [RO,VC]
```

### SessionNotes (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = [Init: UNIQUEID()]
  Session: Ref
  Client: Ref
  Date: Date = [Init: TODAY()]
  ClinicalNotes: LongText
  TreatmentGoals: Text
  Progress: Text
  TherapistSignature: Signature
  CreatedBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = [Init: =ANY(Me[ID])] { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = [Init: =NOW()] { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### Process for ChangesInClient Process Table (75 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]
+ Modified/Added Columns:
  - Existing Client Drive Folder: Ref
  - Create Client Drive Folder: Ref
  - Update Client Drive Folder ID: Ref
  - Is New Client: Ref
  - 1st Medication from Intake: Ref
  - 1st Row to Medication: Ref
  - 2nd Medication from Intake: Ref
  - 2nd Row to Medication: Ref
  - 3rd Medication from Intake: Ref
  - 3rd Row to Medication: Ref

### Existing Client Drive Folder Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Client Drive Folder Output (5 cols)
```
  Instance Id: Text
  folderID: Text
  folderURL: Url
  folderName: Text
  error: Text
```

### Update Client Drive Folder ID Output (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]

### Is New Client Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### 1st Medication from Intake Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### 1st Row to Medication Output (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]

### 2nd Medication from Intake Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### 2nd Row to Medication Output (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]

### 3rd Medication from Intake Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### 3rd Row to Medication Output (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]

### Process for Document Processing Process Table (21 cols)
[Inherits all 14 columns from Table: Document]
+ Modified/Added Columns:
  - Instance Id: Text
  - if new Therapy Contract: Ref
  - Create Therapy Contract: Ref
  - ReturnValueInDocument: Ref
  - If file have to be moved: Ref
  - Move File and Rename: Ref
  - If the File URL was returned: Ref
  - Update FileInfo: Ref

### if new Therapy Contract Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Therapy Contract Output (3 cols)
```
  Instance Id: Text
  fileURL: Url
  fileName: Text
```

### ReturnValueInDocument Output (14 cols)
[Inherits all 14 columns from Table: Document]
+ Modified/Added Columns:
  - Instance Id: Text

### If file have to be moved Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Move File and Rename Output (8 cols)
```
  Instance Id: Text
  fileID: Text
  fileURL: Text
  fileName: Text
  fileThumbnail: Text
  folderName: Text
  folderURL: Text
  error: LongText
```

### If the File URL was returned Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update FileInfo Output (14 cols)
[Inherits all 14 columns from Table: Document]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for ProcessforNewIntakeResponse - 1 Process Table (69 cols)
[Inherits all 65 columns from Table: Client]
+ Modified/Added Columns:
  - Instance Id: Text
  - Check for Front Insurance Card: Ref
  - Add Front Insurance Card Document: Ref
  - Check for Back Insurance Card: Ref
  - Add Insurance: Ref

### Check for Front Insurance Card Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add Front Insurance Card Document Output (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]

### Check for Back Insurance Card Output (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]

### Add Insurance Output (65 cols)
[Inherits all 69 columns from Table: Process for ProcessforNewIntakeResponse - 1 Process Table]

## Slices
- **Me** (AppUser): `=AND(
  [Email] = USEREMAIL(),
  OR([AccessKey] = "Not in Use", USERSETTINGS("AccessKey") = [AccessKey]),
  [Status] = "Active"
)`
- **Admin_View** (AppViews): `=AND(
  [Type] = "Admin",
  ISNOTBLANK(INTERSECT([AllowRoles], SPLIT(ANY(Me[Roles]), ",")))
)`
- **Operations_View** (AppViews): `=AND(
  [Type] = "Operations",
  ISNOTBLANK(INTERSECT([AllowRoles], SPLIT(ANY(Me[Roles]), ",")))
)`

## Views
### Custom Views
- **Transcend_Dash**: dashboard → ? pos=center
- **Operations_View**: card → ? pos=left most
- **Admin_View**: card → ? pos=right
- **Resources_View_Mobile**: card → ? pos=right most
- **Resources_View**: card → ? pos=menu
- **Settings**: form → ? pos=menu
- **AppSettings**: table → ? pos=ref
- **AppTriggers**: table → ? pos=ref
- **AppUsers**: table → ? pos=ref
- **AppVariables**: table → ? pos=ref
- **AppViews**: table → ? pos=ref
- **Clients**: card → ? pos=ref
- **Document_Inline**: table → ? pos=ref
- **Insurance_Inline**: table → ? pos=ref
- **Intake**: table → ? pos=ref
- **Me**: card → ? pos=ref
- **Medication_Inline**: table → ? pos=ref
- **Payment_Inline**: table → ? pos=ref
- **Session_Inline**: table → ? pos=ref
- **SessionNotes_Inline**: table → ? pos=ref
- **Sessions**: table → ? pos=ref
### Auto-generated (34)
  Admin_View_Detail, Admin_View_Form, AppResources_Detail, AppResources_Form, AppSettings_Detail, AppSettings_Form, AppTimeline_Detail, AppTimeline_Form, AppTriggers_Detail, AppTriggers_Form, AppUser_Detail, AppUser_Form, AppVariables_Detail, AppVariables_Form, AppViews_Detail, AppViews_Form, Client_Detail, Client_Form, Document_Detail, Document_Form, FormIntake_Detail, FormIntake_Form, Insurance_Detail, Insurance_Form, Medication_Detail, Medication_Form, Oprations_View_Detail, Oprations_View_Form, Payment_Detail, Payment_Form, Session_Detail, Session_Form, SessionNotes_Detail, SessionNotes_Form

## Actions
### AppUser
  _Auto (45): ADD_RECORD, DELETE_RECORD, EDIT_RECORD, EMAIL_
  - **View_AppUserEmployee (→"Employee")**: NAVIGATE_APP IF `=ISNOTBLANK(INTERSECT({"U_System_Admin","People_Admin"},SPLIT(ANY(Me[Roles]),","`

### Employee
  - **Action for CreateMedical**: ADD_RECORD_TO IF `true`
  - **Action for SetInputEmployeeOnChecklist 2**: REF_ACTION IF `true`
  - **Action for CreateTasksForEmployee**: REF_ACTION IF `true`
  - **Action for ReturnValueInDocument**: ADD_RECORD_TO IF `true`
  - **Action for SetInputEmployeeOnChecklist**: REF_ACTION IF `true`
  - **Action for CreateTasksForEmployeeOnboarding**: REF_ACTION IF `true`
  - **Action for CodeOfConduct**: ADD_RECORD_TO IF `true`
  - **Action for CreateCodeOfConductDocument**: ADD_RECORD_TO IF `true`
  - **Action for CreateCommunicationRow**: ADD_RECORD_TO IF `true`
  - **Action for RemoveValueFrom CommunicationTable**: SET_COLUMN_VALUE IF `true`
  - **Action for CreatePassport**: ADD_RECORD_TO IF `true`
  - **CreateDiploma Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for CreateLaborCard**: ADD_RECORD_TO IF `true`
  - **Action for CreateNationalID**: ADD_RECORD_TO IF `true`
  - **Action for CreateNOC**: ADD_RECORD_TO IF `true`
  - **Action for CreateResidencyVisa**: ADD_RECORD_TO IF `true`
  - **Action for Set the Folder ID**: SET_COLUMN_VALUE IF `true`
  - **Action for Create task for offer later**: REF_ACTION IF `true`
  - **Action for create task**: REF_ACTION IF `true`
  - **CreatePoliceClearance Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for CreateReferenceLetter1**: ADD_RECORD_TO IF `true`
  - **Action for CreateFamilyBook**: ADD_RECORD_TO IF `true`
  - **Action for CommunicationForOnboarding**: ADD_RECORD_TO IF `true`
  - **Action for CommunicationForNEA**: ADD_RECORD_TO IF `true`
  - **Action for CreateReferenceLetter2**: ADD_RECORD_TO IF `true`
  - **create attendance Action - 1**: REF_ACTION IF `true`
  - **Create Attendance 2 Action - 1**: REF_ACTION IF `true`
  - **create attendance Action - 2**: REF_ACTION IF `true`
  - **Create Attendance 2 Action - 2**: REF_ACTION IF `true`
  - **CreatePassportBackCover Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Create User**: ADD_RECORD_TO IF `true`
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

### Communication
  - **Action for SetTheStatusAsSent**: SET_COLUMN_VALUE IF `true`
  - **Action for SetTheStatusAsSent NA**: SET_COLUMN_VALUE IF `true`
  - **Action for SetTheStatusSentEmployeeOnboarding**: SET_COLUMN_VALUE IF `true`

### Documents
  - **Action for Update File ID and URL**: SET_COLUMN_VALUE IF `true`

### AppViews
  _Auto (2): NAVIGATE_APP, NAVIGATE_URL_
  - **Click_OnCard**: COMPOSITE IF `true`

### AppVariables
  _Auto (4): NAVIGATE_URL, OPEN_FILE_

### ReviewCycles
  - **Action for InputValue**: REF_ACTION IF `true`
  - **Action for CreateObjective**: REF_ACTION IF `true`
  - **Action for InputValue 2**: REF_ACTION IF `true`
  - **Action for CreateObjective 2**: REF_ACTION IF `true`
  - **Action for InputCycleEmployee**: REF_ACTION IF `true`
  - **Action for CreateReviewEmployee**: REF_ACTION IF `true`

### ReviewEmployee
  - **Action for InputReviewEvaluationBySelf**: REF_ACTION IF `true`
  - **Action for CreaterReviewEvaluationBySelf**: REF_ACTION IF `true`
  - **Action for InputReviewEvaluationBySelf 2**: REF_ACTION IF `true`
  - **Action for CreaterReviewEvaluationBySelf 2**: REF_ACTION IF `true`
  - **Action for InputReviewEvaluationByManager 2**: REF_ACTION IF `true`
  - **Action for CreaterReviewEvaluationByManager 2**: REF_ACTION IF `true`

### ReviewObjective
  - **InputReviewEvaluationBySelf Action - 1**: REF_ACTION IF `true`
  - **CreaterReviewEvaluationBySelf Action - 1**: REF_ACTION IF `true`

### AttendanceRequest
  - **Create Attendance Rows for these Dates Action - 1**: ADD_RECORD_TO IF `true`
  - **Update the Attendance Request Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Update the Leave Allocation to update balance Action - 1**: REF_ACTION IF `true`
  - **Sync Attendance Request Action - 1**: REF_ACTION IF `true`
  - **Action for Add Date From WorkDAy**: REF_ACTION IF `true`
  - **Action for Create Rom in Attendance Daily**: REF_ACTION IF `true`
  - **Sync Attendance Request at the end Action - 1**: REF_ACTION IF `true`
  - **Action for Sync Leave Allocation at the end**: REF_ACTION IF `true`
  - **Change CheckIn & CheckOut Action - 1**: COMPOSITE IF `true`

### AppTimeline
  - **InputAll_WorkDay**: SET_COLUMN_VALUE IF `true`

### ExpenseClaims
  - **Set Folder Id Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Action for AppFile URL**: SET_COLUMN_VALUE IF `true`

### AttendanceDaily
  - **Action for AddCheckIn&Out**: SET_COLUMN_VALUE IF `true`
  - **Action for AddCheckOut**: SET_COLUMN_VALUE IF `true`

### OfficeCalendar
  - **Action for Execute_Sync_on_Holidays**: REF_ACTION IF `true`
  - **New step 1 Action - 1**: REF_ACTION IF `true`

### AppSettings
  - **Action for Trigger Calendar Sync**: REF_ACTION IF `true`

### OfficeHoliday
  - **Trigger Calendar Sync Action - 1**: REF_ACTION IF `true`

### FormIntake
  _Auto (9): EMAIL, NAVIGATE_APP, NAVIGATE_URL_
  - **View_Client (→"View Client")**: NAVIGATE_APP IF `=ISNOTBLANK([Client])`
  - **Add_Client (→"Add Client")**: ADD_RECORD_TO IF `=ISBLANK([Client])`
  - **Call Phone (Mobile phone number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Mobile phone number]))`
  - **Send SMS (Mobile phone number) (→"Text message")**: SMS IF `NOT(ISBLANK([Mobile phone number]))`
  - **Call Phone (Home phone number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Home phone number]))`
  - **Send SMS (Home phone number) (→"Text message")**: SMS IF `NOT(ISBLANK([Home phone number]))`
  - **Call Phone (Policy Holder Phone Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Policy Holder Phone Number]))`
  - **Send SMS (Policy Holder Phone Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Policy Holder Phone Number]))`

### Client
  _Auto (2): NAVIGATE_APP, NAVIGATE_URL_
  - **Call Phone (Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Phone]))`
  - **Send SMS (Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Phone]))`
  - **Call Phone (EmergencyContact) (→"Phone call")**: CALL IF `NOT(ISBLANK([EmergencyContact]))`
  - **Send SMS (EmergencyContact) (→"Text message")**: SMS IF `NOT(ISBLANK([EmergencyContact]))`
  - **Action for 1st Row to Medication**: ADD_RECORD_TO IF `true`
  - **Action for 2nd Row to Medication**: ADD_RECORD_TO IF `true`
  - **3rd Row to Medication Action - 1**: ADD_RECORD_TO IF `true`
  - **View_FormIntake (→"View Intake")**: NAVIGATE_APP IF `true`
  - **Update Client Drive Folder ID Action - 1**: SET_COLUMN_VALUE IF `true`
  - **View_ClientFolder (→"Open Folder")**: NAVIGATE_URL IF `=NOT(ISBLANK([DriveFolderID]))`
  - **Add Front Insurance Card Document Action - 1**: ADD_RECORD_TO IF `true`
  - **Check for Back Insurance Card Action - 1**: ADD_RECORD_TO IF `true`
  - **Add Insurance Action - 1**: ADD_RECORD_TO IF `true`
  - **Add_Document_TherapyContract (→"Add Therapy Contract")**: ADD_RECORD_TO [Document] (Client=[ID], DocumentType="DocType_TherapyContract") IF `=ISBLANK(FILTER("Document", AND([Client] = [_THISROW].[ID], OR([DocumentType] = "DocType_TherapyContract", [DocumentType] = "Therapy Contract"))))`



### Insurance
  _Auto (7): NAVIGATE_APP_
  - **Call Phone (SubscriberPhone) (→"Phone call")**: CALL IF `NOT(ISBLANK([SubscriberPhone]))`
  - **Send SMS (SubscriberPhone) (→"Text message")**: SMS IF `NOT(ISBLANK([SubscriberPhone]))`

### SessionNotes
  _Auto (1): NAVIGATE_APP_

### Therapy Intake
  - **Action for add Row to Document**: ADD_RECORD_TO IF `true`

### AppResources
  - **Medication Row 1 Action - 1**: ADD_RECORD_TO IF `true`

### Document
  _Auto (1): NAVIGATE_URL_
  - **Action for Update FileInfo**: SET_COLUMN_VALUE IF `true`
  - **ReturnValueInDocument Action - 1**: SET_COLUMN_VALUE IF `true`

### Payment
  _Auto (4): NAVIGATE_APP_

## Observations
- ℹ️ **AppUser** has no Label column
- ℹ️ **AppViews** has no Label column
- ℹ️ **AppSettings** has no Label column
- ℹ️ **AppVariables** has no Label column
- ℹ️ **AppTriggers** has no Label column
- ℹ️ **AppTimeline** has no Label column
- ℹ️ **AppResources** has no Label column
- ℹ️ **FormIntake** has no Label column
- ℹ️ **Client** has no Label column
- ℹ️ **Insurance** has no Label column
- ℹ️ **Payment** has no Label column
- ℹ️ **Medication** has no Label column
- ℹ️ **Document** has no Label column
- ℹ️ **Session** has no Label column
- ℹ️ **SessionNotes** has no Label column
