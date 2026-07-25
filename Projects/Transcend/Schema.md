# Transcend — AppSheet Schema (v1.000082)
> Parsed: 6/19/2026, 12:26:18 PM | 31T / 770C / 3S / 55V / 177A / 0FR
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
  Therapy Intake            src=google   sheet=?                    mode=READ_ONLY
  FormIntake                src=google   sheet=FormIntake           mode=ALL_CHANGES
  Client                    src=google   sheet=Client               mode=ALL_CHANGES
  Insurance                 src=google   sheet=Insurance            mode=ALL_CHANGES
  Payment                   src=google   sheet=Payment              mode=ALL_CHANGES
  Medication                src=google   sheet=Medication           mode=ALL_CHANGES
  Document                  src=google   sheet=Document             mode=ALL_CHANGES
  Session                   src=google   sheet=Session              mode=ALL_CHANGES
  SessionNotes              src=google   sheet=SessionNotes         mode=ALL_CHANGES
  Process for NewIntakeResponse Process Table src=native   sheet=?                    mode=READ_ONLY
  If New Client Output      src=native   sheet=?                    mode=READ_ONLY
  Create New Client Output  src=native   sheet=?                    mode=READ_ONLY
  Create Contract Output    src=native   sheet=?                    mode=READ_ONLY
  Therapy Services Contract Output src=native   sheet=?                    mode=READ_ONLY
  add Row to Document Output src=native   sheet=?                    mode=READ_ONLY
  Process for ChangesInClient Process Table src=native   sheet=?                    mode=READ_ONLY
  Is New Client Output      src=native   sheet=?                    mode=READ_ONLY
  1st Medication from Intake Output src=native   sheet=?                    mode=READ_ONLY
  1st Row to Medication Output src=native   sheet=?                    mode=READ_ONLY
  2nd Medication from Intake Output src=native   sheet=?                    mode=READ_ONLY
  2nd Row to Medication Output src=native   sheet=?                    mode=READ_ONLY
  3rd Medication from Intake Output src=native   sheet=?                    mode=READ_ONLY
  3rd Row to Medication Output src=native   sheet=?                    mode=READ_ONLY
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

### Therapy Intake (85 cols)
[Inherits all 90 columns from Table: Process for NewIntakeResponse Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### FormIntake (92 cols)
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
  Preferred Language: Text
  Marital Status: Text
  Religious Affiliation:: Text
  Email Address:: Email
  Mobile phone number: Phone
  Mobile phone voice messages: Yes/No
  Mobile phone text messages: Yes/No
  Home phone number: Phone
  Home phone voice messages: Yes/No
  Preferred Contact Method: Text
  Encrypted Email Notice & Consent: Yes/No
  Telehealth Option Consent: Yes/No
  Home Address: Address
  Home City: Text
  Home State: Text
  Home Zip: Text
  Time Zone: Text
  Payor Benefit Choice: Text
  Use EAP Benefits: Yes/No
  EAP Program Name: Text
  EAP Authorized Sessions Count: Number
  Has EAP Authorization Form: Yes/No
  EAP Authorization File Upload: File
  Use Insurance Option: Yes/No
  Is Insurance Medicare Plan: Yes/No
  Medicare Secondary Insurance: Text
  Name of Insurance Company: Text
  Insurance Plan Name: Text
  Member/Beneficiary ID: Text
  Policy Group Number: Text
  Plan Name: Name
  Is Primary Insured Same As Client: Yes/No
  Client Relationship to Policy Holder: Text
  Policy Holder First Name: Name
  Policy Holder Middle Name: Name
  Policy Holder Last Name: Name
  Administrative Sex: Text
  Policy Holder Date of Birth:: Date = TODAY()
  Policy Holder Address 1: Address
  Policy Holder Address 2: Address
  Policy Holder Zip: Text
  Policy Holder City/State: Text
  Policy Holder Phone Number: Phone
  Is Only Insurance Plan: Yes/No
  Front of Insurance Card: Url
  Back of Insurance Card: Url
  Name on Card: Name
  Type of Card.: Text
  Is Credit Card: Yes/No
  Card Number: Text
  Card Expiration Date: Text
  Security Code: Text
  Billing Street Address: Address
  Billing City: Text
  Billing Zip Code: Text
  Taking Prescription Meds: Yes/No
  Medication Name: Name
  Dosage: Text
  Amount and Frequency: Text
  Symptoms Being Treated: Text
  Prescribed By: Text
  Taking Second Med: Yes/No
  Medication Name #2: Name
  Dosage #2: Text
  Amount and Frequency #2: Text
  Symptoms Being Treated #2: Text
  Prescribed By #2: Text
  Taking Third Med: Yes/No
  Medication Name #3: Name
  Dosage #3: Text
  Amount and Frequency #3: Text
  Symptoms Being Treated #3: Text
  Prescribed By #3: Text
  Taking Additional Meds: Yes/No
  Additional Medications Details: LongText
  ProcessedStatus: Enum [Values: 'New', 'Processing', 'Processed', 'Failed'] = ="New"
  ClientID: Ref
  ProcessedOn: DateTime
  ProcessedBy: Text
  Label: Text [RO]
  _ComputedName: Name [RO,VC]
```

### Client (55 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  FirstName: Name = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[First Name], "")
  Middle Name: Name = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Middle Name], "")
  LastName: Name = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Last Name], "")
  PreferredName: Name = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Preferred name], "")
  Suffix: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Suffix], "")
  AlsoKnownAs: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Also known as], "")
  Pronouns: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Pronouns], "")
  AdministrativeGender: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Current Administrative Gender], "")
  GenderIdentity: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Gender Identity], "")
  SexualOrientation: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Sexual Orientation], "")
  Race: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Race], "")
  Ethnicity: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Ethnicity], "")
  PreferredLanguage: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Preferred Language], "")
  MaritalStatus: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Marital Status], "")
  ReligiousAffiliation: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Religious Affiliation:], "")
  ConsentMobileVoice: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Mobile phone voice messages], "")
  ConsentMobileSMS: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Mobile phone text messages], "")
  HomePhone: Phone = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Home phone number], "")
  ConsentHomeVoice: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Home phone voice messages], "")
  PreferredContactMethod: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Preferred Contact Method], "")
  ConsentEmail: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Although our practice uses an encrypted form of email, we cannot guarantee the security of messages once they in your email service or on your computer/device.], "")
  ConsentTelehealth: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Telehealth - Please mark yes, if you would like the option to receive telehealth services even if you would prefer most services in-person], "")
  TimeZone: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Time Zone], "")
  UseEAP: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Do you have EAP benefits you would like to use?], "")
  EAPProgramName: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[What is the name of your EAP program?], "")
  EAPAuthorizedSessions: Number = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[How many sessions are authorized], "")
  HasEAPAuthForm: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Do you have an authorization form sent by your EAP program?], "")
  EAPAuthFile: File = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Please upload a copy of your authorization.], "")
  AdditionalMedicationsNotes: LongText = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Please list additional medications, including the name of the medication, dosage and frequency, symptoms being treated and the name of the presriber.], "")
  NameOnCard: Name = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Name on Card], "")
  TypeOfCard: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Type of Card.], "")
  IsCreditCard: Yes/No = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Is this a credit card?], "")
  CardNumber: Text [SENSITIVE/ENCRYPTED] = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Card Number], "")
  CardExpirationDate: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Card Expiration Date], "")
  SecurityCode: Text [SENSITIVE/ENCRYPTED] = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Security Code], "")
  BillingStreetAddress: Address = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Billing Street Address], "")
  BillingCity: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Billing City], "")
  BillingZipCode: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Billing Zip Code], "")
  DateOfBirth: Date = TODAY()
  Gender: Text
  Phone: Phone = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Mobile phone number], "")
  Email: Email = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Email Address:], "")
  Address: Address = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Home Address], "")
  City: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Home City], "")
  State: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Home State], "")
  ZipCode: Text = =IF(ISNOTBLANK([FormIntake]), [FormIntake].[Home Zip], "")
  EmergencyContact: Phone
  Status: Enum [Values: 'New', 'ClientInfoReceived', 'DocsRequested', 'DocsGenerated', 'AwaitingSignature', 'Signed', 'InsuranceVerifying', 'AwaitingIntakeSession', 'IntakeComplete', 'Active', 'NotProceeding', 'Archived'] = ="ClientInfoReceived"
  FormIntake: Ref
  DriveFolderId: Text [HIDDEN]
  CreatedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditOn]="=ISBLANK([_THIS])" }
```

### Insurance (31 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Client: Ref
  ProviderName: Name
  UseInsurance: Yes/No
  PolicyNumber: Text
  GroupNumber: Text
  SubscriberName: Name
  SubscriberDOB: Date = TODAY()
  SubscriberRelationship: Text
  ExpirationDate: Date
  IsMedicare: Yes/No
  SecondaryPlanNotes: LongText
  InsurancePlanName: Name
  MemberBeneficiaryID: Text
  PlanName: Name
  IsPrimaryInsuredSameAsClient: Yes/No
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
  IsOnlyPlan: Yes/No
  CreatedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditOn]="=ISBLANK([_THIS])" }
```

### Payment (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  ClientID: Ref
  SessionID: Ref
  PaymentDate: Date = TODAY()
  Amount: Price
  PaymentMethod: Enum [Values: 'Credit Card', 'Insurance', 'EAP', 'Cash', 'Check']
  TransactionID: Text
  Notes: LongText
  CreatedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditOn]="=ISBLANK([_THIS])" }
```}
```

### Medication (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  Client: Ref { Logic: [EditIf]="=ISBLANK([_THIS])" }
  MedicationName: Name
  Frequency: Text
  Dosage: Text
  FormUnit: Text
  Amount: Text
  SymptomsTreated: Text
  PrescribedBy: Text
  StartDate: Date = TODAY()
  EndDate: Date = TODAY()
  CreatedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### Document (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Client: Ref
  DocumentName: Name
  DocumentType: Text
  UploadDate: Date = TODAY()
  FileURL: Url      ← Auto-set by App Script OR manually entered external link (DocuSign, EHR portal, etc.)
  File: File        ← Manual file upload by admin (signed PDF post-e-sign)
  Notes: LongText
  CreatedBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  CreatedOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
  LastEditBy: Enum = =ANY(Me[ID]) { Logic: [EditIf]="=ISBLANK([_THIS])" } { Slices Cross-Ref: Me -> AppUser }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=ISBLANK([_THIS])" }
```

### Session (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Client: Ref
  Provider: Text
  SessionDate: Date = TODAY()
  StartTime: Time = TIMENOW()
  EndTime: Time = TIMENOW()
  SessionType: Text
  Status: Text
  CreatedBy: Text
  CreatedOn: Text
  LastEditBy: Name
  LastEditOn: Name
  Related SessionNotes: List [RO,VC]
```

### SessionNotes (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Session: Ref
  Client: Ref
  Date: Date = TODAY()
  ClinicalNotes: LongText
  TreatmentGoals: Text
  Progress: Text
  TherapistSignature: Signature
  CreatedBy: Text
  CreatedOn: Text
  LastEditBy: Name
  LastEditOn: Name
```

### Process for NewIntakeResponse Process Table (90 cols)
[Inherits all 85 columns from Table: Therapy Intake]
+ Modified/Added Columns:
  - Instance Id: Text
  - If New Client: Ref
  - Create New Client: Ref
  - Create Insurance: Ref  ← Auto-populates Insurance table from FormIntake
  - Add Front Insurance Card Document: Ref
  - Check for Back Insurance Card: Ref
  - Add Insurance: Ref

### Document Processing Bot (Document Table)
Event: Updates to Document
Process Step: **Create Therapy Contract** (Calls Google Apps Script `createGoogleDoc`)
Parameters:
- `fileObj`: `'{"templateId": "1TpNa772w7Q2ZC9pbjmpl3LM9GWicYb5vwrUUVrIVutI", "folderId": "1FKfHsHTgtkL-iFP-QA5suCvV_BdciTKF"}'`
- `paramObj`: Formatted JSON payload dereferencing `[Client]` and `[Insurance]` values for Google Doc merge fields.
- Output: Returns `fileURL` and `fileName` to update `Document` row.

### If New Client Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create New Client Output (85 cols)
[Inherits all 90 columns from Table: Process for NewIntakeResponse Process Table]

### Create Contract Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Therapy Services Contract Output (3 cols)
```
  Instance Id: Text
  fileURL: Text
  fileName: Text
```

### add Row to Document Output (85 cols)
[Inherits all 90 columns from Table: Process for NewIntakeResponse Process Table]

### Process for ChangesInClient Process Table (32 cols)
[Inherits all 25 columns from Table: Client]
+ Modified/Added Columns:
  - Instance Id: Text
  - Is New Client: Ref
  - 1st Medication from Intake: Ref
  - 1st Row to Medication: Ref
  - 2nd Medication from Intake: Ref
  - 2nd Row to Medication: Ref
  - 3rd Medication from Intake: Ref
  - 3rd Row to Medication: Ref

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

### 1st Row to Medication Output (25 cols)
[Inherits all 25 columns from Table: Client]
+ Modified/Added Columns:
  - Instance Id: Text

### 2nd Medication from Intake Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### 2nd Row to Medication Output (25 cols)
[Inherits all 25 columns from Table: Client]
+ Modified/Added Columns:
  - Instance Id: Text

### 3rd Medication from Intake Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### 3rd Row to Medication Output (25 cols)
[Inherits all 25 columns from Table: Client]
+ Modified/Added Columns:
  - Instance Id: Text

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
- **Session_Inline**: table → ? pos=ref
- **SessionNotes_Inline**: table → ? pos=ref
- **Sessions**: table → ? pos=ref
### Auto-generated (35)
  Admin_View_Detail, Admin_View_Form, AppResources_Detail, AppResources_Form, AppSettings_Detail, AppSettings_Form, AppTimeline_Detail, AppTimeline_Form, AppTriggers_Detail, AppTriggers_Form, AppUser_Detail, AppUser_Form, AppVariables_Detail, AppVariables_Form, AppViews_Detail, AppViews_Form, Client_Detail, Client_Form, Document_Detail, Document_Form, FormIntake_Detail, FormIntake_Form, Insurance_Detail, Insurance_Form, Medication_Detail, Medication_Form, Oprations_View_Detail, Oprations_View_Form, Payment_Detail, Payment_Form, Session_Detail, Session_Form, SessionNotes_Detail, SessionNotes_Form, Therapy Intake_Detail

## Actions
### AppUser
  _Auto (47): ADD_RECORD, DELETE_RECORD, EDIT_RECORD, EMAIL_
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
  - **Action for add Row to Document**: ADD_RECORD_TO IF `true`
  - **Action for Create New Client**: ADD_RECORD_TO IF `true`
  - **Open Intake Form**: NAVIGATE_URL IF `true` (Target: `=LOOKUP("GoogleFormLink", "AppVariables", "ID", "URL")`)

### FormIntake
  _Auto (6): NAVIGATE_APP, NAVIGATE_URL_
  - **Open Intake Form**: NAVIGATE_URL IF `true` (Target: `=LOOKUP("GoogleFormLink", "AppVariables", "ID", "URL")`)


### Client
  _Auto (1): NAVIGATE_APP_
  - **Call Phone (Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Phone]))`
  - **Send SMS (Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Phone]))`
  - **Call Phone (EmergencyContact) (→"Phone call")**: CALL IF `NOT(ISBLANK([EmergencyContact]))`
  - **Send SMS (EmergencyContact) (→"Text message")**: SMS IF `NOT(ISBLANK([EmergencyContact]))`
  - **Action for 1st Row to Medication**: ADD_RECORD_TO IF `true`
  - **Action for 2nd Row to Medication**: ADD_RECORD_TO IF `true`
  - **3rd Row to Medication Action - 1**: ADD_RECORD_TO IF `true`

### Insurance
  _Auto (5): NAVIGATE_APP_

### Document
  _Auto (1): OPEN_FILE_

### SessionNotes
  _Auto (1): NAVIGATE_APP_

### AppResources
  - **Medication Row 1 Action - 1**: ADD_RECORD_TO IF `true`

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
- ℹ️ **Insurance** has no Label column
- ℹ️ **Payment** has no Label column
- ℹ️ **Medication** has no Label column
- ℹ️ **Document** has no Label column
- ℹ️ **Session** has no Label column
- ℹ️ **SessionNotes** has no Label column
