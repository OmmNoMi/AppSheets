# Transcend — AppSheet Schema (v1.000009)
> Parsed: 6/12/2026, 4:57:22 PM | 11T / 296C / 2S / 32V / 152A / 0FR
> Deployable: No | Runnable: Yes
> Spreadsheet cross-reference: 2 tables matched to worksheets

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
  Therapy Intake            src=google   sheet=?                    mode=READ_ONLY
  FormIntake                src=google   sheet=FormIntake           mode=ALL_CHANGES  [XLSX: FormIntake]
  Client                    src=google   sheet=Client               mode=ALL_CHANGES  [XLSX: Client]
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
  _THISUSER: Text [HIDDEN] = onlyvalue
```

### AppUser (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =UPPER(TEXT(LEFT(UNIQUEID(), 4)))
  Photo: Image
  Email: Email
  Name: Name
  Roles: EnumList = ="U_Employee"
  AccessKey: Text [HIDDEN] = ="Not in Use"
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  LastEditedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_this])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_this])" }
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
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  AppLink: App [RO]
```

### AppSettings (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
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
  Date: Date = TODAY()
  AllowedValues: EnumList
  LastEditBy: Enum = =Any(Me[ID]) { Logic: [EditIf]="=isblank([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=isblank([_THIS])" }
```

### AppVariables (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Table: EnumList
  Column: EnumList
  Tags: EnumList [Values: 'ID is used in Code', 'ID Connected to Variable']
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
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=isblank([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=isblank([_THIS])" }
```

### AppTriggers (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  AppTrigger: Enum
  Bot: Yes/No = =if(ISBLANK([_THIS]),TRUE,FALSE)
  Type: Enum
  Table: Enum
  PickEmployee: Enum { Logic: [ShowIf]="=IN(
   "PickEmployee",
   SPLIT([AppTrigger].[AllowedValues],
   ",")
)" }
  PickWeekYear: Enum
  PickDate: Date = TODAY()
  PickDateTime: DateTime = =NOW()
  ValueText: Text = =[PickEmployee].[Email]
  RefTable: Enum
  RefValue: Text
  CreatedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=isblank([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = =NOW() { Logic: [EditIf]="=isblank([_THIS])" }
  Date: Text [RO]
```

### AppTimeline (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Date: Date = TODAY()
  AppTrigger: Enum
  TriggerValue: Text
  TriggeredOn: DateTime
```

### AppResources (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
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
  Standard: Yes/No = =IF(
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
) { Slices Cross-Ref: Me -> AppUser }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### Therapy Intake (84 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Response ID: Text [HIDDEN,RO] = UNIQUEID()
  Email Address: Email [RO]
  Timestamp: DateTime [RO] = NOW()
  First Name: Text
  Middle Name: Text
  Last Name: Text
  Suffix: Text
  Preferred name: Text
  Also known as: Text
  Pronouns: Enum [Values: 'He/Him/His', 'She/Her/Hers', 'They/Them/Theirs']
  Current Administrative Gender: Enum [Values: 'Male', 'Female', 'Intersex', 'Choose not to disclose']
  Gender Identity: Enum [Values: 'Male', 'Female', 'Trans Man', 'Trans Woman', 'Nonbinary', 'Genderqueer', 'Choose not to disclose']
  Sexual Orientation: Enum [Values: 'Heterosexual/Straight', 'Homosexual/Lesbian/Gay', 'Bisexual', 'Something else, please describe']
  Race: Text
  Ethnicity: Text
  Language: Text
  Marital Status: Text
  Religious Affiliation:: Text
  Home Address: Text
  Home City: Text
  Home State: Text
  Home Zip: Text
  Country: Text
  Time Zone: Text
  Email Address_26: Text (→"="Email Address"")
  Primary Phone Number: Text
  Secondary Phone Number: Text
  Work Phone Number: Text
  Preferred Contact Method: EnumList [Values: 'Phone Call', 'Email', 'Text Message']
  Preferred Contact Method_31: EnumList [Values: 'Do not leave messages', 'It is OK to leave voice messages', 'It is OK to send text messages', 'It is OK to send text or leave voice messages'] (→"="Preferred Contact Method"")
  Insurance Company: Text
  Member/Beneficiary ID: Text
  Priority: Enum [Values: 'Primary', 'Secondary', 'Tertiary', 'Quaternary']
  Policy Group Number: Text
  Plan Name: Text
  Is the name and contact information for the primary insured the same as the client?: Enum [Values: 'If yes, skip to the next section', 'If no, complete the primary insured section']
  Client relationship to policy holder: Enum [Values: 'Self', 'Spouse', 'Child', 'Life Partner']
  Policy holder (First Name): Text
  Policy holder (Middle Name): Text
  Policy holder (Last Name): Text
  Administrative Sex: Enum [Values: 'Male', 'Female', 'Prefer not to say']
  Policy Holder Date of Birth:: Date = TODAY()
  Policy Holder Address 1: Text
  Policy Holder Address 2: Text
  Policy Holder Zip: Text
  Policy Holder City/State: Text
  Policy Holder Phone Number: Text
  Front of Insurance Card: File
  Back of Insurance Card: File
  Name on Card: Text
  Type of Card.
Note: We are unable to process American Express or Discover cards*: Enum [Values: 'Master Card', 'Visa']
  Is this a credit card? (Mark "No" if the card is an HSA, FSA or HRA card or a debit card that can be processed without a pin number): Enum [Values: 'Yes', 'Not']
  Card Number: Text
  Card Expiration Date: Text
  Security Code: Text
  Billing Street Address: Text
  Billing City: Text
  Billing Zip Code: Text
  Medication Name: Text
  Dosage: Text
  Form / Unit (Capsule, tablet, liquid): Text
  Amount (How many are taken): Text
  Frequency (How often is it taken): Text
  Symptoms Being Treated: Text
  Prescribed By: Text
  Is there another medication that you take?: Enum [Values: 'Yes, click next and fill up medication list #2', 'No, click next Skip medication list #2']
  Medication Name_68: Text (→"="Medication Name"")
  Dosage_69: Text (→"="Dosage"")
  Form / Unit (Capsule, tablet, liquid)_70: Text (→"="Form / Unit (Capsule, tablet, liquid)"")
  Amount (How many are taken)_71: Text (→"="Amount (How many are taken)"")
  Frequency (How often is it taken)_72: Text (→"="Frequency (How often is it taken)"")
  Symptoms Being Treated_73: Text (→"="Symptoms Being Treated"")
  Prescribed By_74: Text (→"="Prescribed By"")
  Medication Name_75: Text (→"="Medication Name"")
  Dosage_76: Text (→"="Dosage"")
  Form / Unit (Capsule, tablet, liquid)_77: Text (→"="Form / Unit (Capsule, tablet, liquid)"")
  Amount (How many are taken)_78: Text (→"="Amount (How many are taken)"")
  Frequency (How often is it taken)_79: Text (→"="Frequency (How often is it taken)"")
  Symptoms Being Treated_80: Text (→"="Symptoms Being Treated"")
  Prescribed By_81: Text (→"="Prescribed By"")
  _ComputedAddress: Address [RO,VC]
  _ComputedName: Name [RO,VC]
  _ComputedName2: Name [RO,VC]
```

### FormIntake (81 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Timestamp: DateTime = NOW()
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
  Language: Text
  Marital Status: Text
  Religious Affiliation:: Text
  Home Address: Address
  Home City: Text
  Home State: Text
  Home Zip: Text
  Country: Text
  Time Zone: Time = TIMENOW()
  Email Address: Email
  Primary Phone Number: Phone
  Secondary Phone Number: Phone
  Work Phone Number: Phone
  Preferred Contact Method: Text
  Insurance Company: Text
  Member/Beneficiary ID: Text
  Priority: Text
  Policy Group Number: Number
  Plan Name: Name
  Is the name and contact information for the primary insured the same as the client?: Name
  Client relationship to policy holder: Text
  Policy holder (First Name): Name
  Policy holder (Middle Name): Name
  Policy holder (Last Name): Name
  Administrative Sex: Text
  Policy Holder Date of Birth:: Date = TODAY()
  Policy Holder Address 1: Address
  Policy Holder Address 2: Address
  Policy Holder Zip: Text
  Policy Holder City/State: Text
  Policy Holder Phone Number: Phone
  Front of Insurance Card: Text
  Back of Insurance Card: Text
  Name on Card: Name
  Is this a credit card? (Mark "No" if the card is an HSA, FSA or HRA card or a debit card that can be processed without a pin number): Number
  Billing Street Address: Address
  Billing City: Text
  Billing Zip Code: Text
  Preferred Contact Method_28: Text [VC]
  Type of Card. Note: We are unable to process American Express or Discover cards*: LongText [VC]
  Card Number: Number [VC]
  Card Expiration Date: Date [VC] = TODAY()
  Security Code: Text [VC]
  Medication Name: Name [VC]
  Dosage: Text [VC]
  Form / Unit (Capsule, tablet, liquid): Text [VC]
  Amount (How many are taken): Number [VC]
  Frequency (How often is it taken): Text [VC]
  Symptoms Being Treated: Text [VC]
  Prescribed By: Text [VC]
  Is there another medication that you take?: Yes/No [VC]
  Medication Name_65: Name [VC]
  Dosage_66: Text [VC]
  Form / Unit (Capsule, tablet, liquid)_67: Text [VC]
  Amount (How many are taken)_68: Number [VC]
  Frequency (How often is it taken)_69: Text [VC]
  Symptoms Being Treated_70: Text [VC]
  Prescribed By_71: Text [VC]
  Medication Name_72: Name [VC]
  Dosage_73: Text [VC]
  Form / Unit (Capsule, tablet, liquid)_74: Text [VC]
  Amount (How many are taken)_75: Number [VC]
  Frequency (How often is it taken)_76: Text [VC]
  Symptoms Being Treated_77: Text [VC]
  Prescribed By_78: Text [VC]
  _ComputedName: Name [RO,VC]
  _ComputedName2: Name [RO,VC]
```

### Client (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  FirstName: Name
  LastName: Name
  DateOfBirth: Date
  Gender: Enum
  Phone: Phone
  Email: Email
  Address: Address
  City: Enum
  State: Enum
  ZipCode: Enum
  EmergencyContact: Phone
  CreatedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  FullName: Name [RO,VC]
```

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

## Views
### Custom Views
- **Map**: map → ? pos=center
- **Admin_View**: card → ? pos=left most
- **Resources_View_Mobile**: card → ? pos=left most
- **Resources_View**: card → ? pos=menu
- **Settings**: form → ? pos=menu
- **AppSettings**: table → ? pos=ref
- **AppTriggers**: table → ? pos=ref
- **AppUsers**: table → ? pos=ref
- **AppVariables**: table → ? pos=ref
- **AppViews**: table → ? pos=ref
- **Me**: card → ? pos=ref
### Auto-generated (21)
  Admin_View_Detail, Admin_View_Form, AppResources_Detail, AppResources_Form, AppSettings_Detail, AppSettings_Form, AppTimeline_Detail, AppTimeline_Form, AppTriggers_Detail, AppTriggers_Form, AppUser_Detail, AppUser_Form, AppVariables_Detail, AppVariables_Form, AppViews_Detail, AppViews_Form, Client_Detail, Client_Form, FormIntake_Detail, FormIntake_Form, Therapy Intake_Detail

## Actions
### AppUser
  _Auto (29): ADD_RECORD, DELETE_RECORD, EDIT_RECORD, EMAIL_
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
  _Auto (3): NAVIGATE_URL, OPEN_FILE_

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

### Therapy Intake
  _Auto (5): EMAIL, NAVIGATE_APP, OPEN_FILE_

### FormIntake
  _Auto (4): NAVIGATE_APP_
  - **Call Phone (Primary Phone Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Primary Phone Number]))`
  - **Send SMS (Primary Phone Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Primary Phone Number]))`
  - **Call Phone (Secondary Phone Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Secondary Phone Number]))`
  - **Send SMS (Secondary Phone Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Secondary Phone Number]))`
  - **Call Phone (Work Phone Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Work Phone Number]))`
  - **Send SMS (Work Phone Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Work Phone Number]))`
  - **Call Phone (Policy Holder Phone Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Policy Holder Phone Number]))`
  - **Send SMS (Policy Holder Phone Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Policy Holder Phone Number]))`

### Client
  _Auto (1): NAVIGATE_APP_
  - **Call Phone (Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Phone]))`
  - **Send SMS (Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Phone]))`
  - **Call Phone (EmergencyContact) (→"Phone call")**: CALL IF `NOT(ISBLANK([EmergencyContact]))`
  - **Send SMS (EmergencyContact) (→"Text message")**: SMS IF `NOT(ISBLANK([EmergencyContact]))`

## Observations
- ℹ️ **AppUser** has no Label column
- ℹ️ **AppViews** has no Label column
- ℹ️ **AppSettings** has no Label column
- ℹ️ **AppVariables** has no Label column
- ℹ️ **AppTriggers** has no Label column
- ℹ️ **AppTimeline** has no Label column
- ℹ️ **AppResources** has no Label column
- ℹ️ **Therapy Intake** has no Label column
- ℹ️ **FormIntake** has no Label column
- ℹ️ **Client** has no Label column
