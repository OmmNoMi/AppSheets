# Schema — Transcend Counseling & Wellness
> Always reflects CURRENT state. Update in place. History → Decisions.md.
> Compliance: HIPAA. Google Workspace with BAA required.
> Last updated: 2026-06-04 (reflects Jun 3 scope expansion to full business solution)

---

## Google Sheets Structure
| Tab Name | AppSheet Table | Type | Source |
|----------|---------------|------|--------|
| AppUser | AppUser | System | Base App |
| AppViews | AppViews | System | Base App |
| AppVariables | AppVariables | System | Base App |
| AppSettings | AppSettings | System | Base App |
| AppTimeline | AppTimeline | System | Base App |
| AppTriggers | AppTriggers | System | Base App |
| FormIntake | FormIntake | Operational | Existing (Google Form output) |
| Client | Client | Operational | New sheet |
| Insurance | ClientInsurance | Operational | New sheet |
| Payment | ClientPayment | Operational | New sheet |
| Medication | ClientMedication | Operational | New sheet |
| Document | ClientDocument | Operational | New sheet |
| Session | Session | Operational | New sheet — added Jun 3 |
| SessionNotes | SessionNotes | Operational | New sheet — added Jun 3 |

---

## System Tables
> Full config in `_Patterns/Schema/SystemTables.md`

### AppVariables — Project Roles Added
| ID | Tags | Title | Notes |
|----|------|-------|-------|
| U_Operations_Manager | ID Connected to Variable | Operations Manager | Admin Assistant role |

> Add `U_Operations_Manager` to `AppUserRoles.VariableList` alongside base roles.

### AppSettings — Project Settings
| ID | Title | Description | Tags |
|----|-------|-------------|------|
| CompanyName | Company Name | Transcend Counseling & Wellness | — |
| FormIntakeURL | Intake Form URL | Link sent to clients via SMS | ID is used in Code |
| DriveFolderID | Drive Folder ID | HIPAA Shared Drive root folder ID | ID is used in Code |
| DocuSignEnabled | DocuSign Enabled | FALSE — toggle when DocuSign account set up | ID is used in Code |
| BotProcessingEnabled | Bot Processing Enabled | TRUE — enable/disable hourly intake bot | ID is used in Code |

### AppUser — Project Roles
| Persona | Role | Notes |
|---------|------|-------|
| David Phelan LPC | U_System_Admin | Full access |
| Admin Assistant | U_Operations_Manager | Client pipeline, no session notes |

---

## FormIntake
> Connected to existing Google Form responses sheet. Do NOT modify existing column order.
> Add admin columns at the END only (right side of sheet).

**Google Form Columns (read-only — do not rename)**:
| Column (as in sheet) | AppSheet Type | Notes |
|---------------------|-------------|-------|
| Timestamp | DateTime | Auto from form |
| First Name | Text | |
| Middle Name | Text | |
| Last Name | Text | |
| Suffix | Text | |
| Preferred name | Text | |
| Also known as | Text | |
| Pronouns | Text | |
| Current Administrative Gender | Enum | |
| Gender Identity | Text | |
| Sexual Orientation | Text | |
| Race | Text | |
| Ethnicity | Text | |
| Language | Text | |
| Marital Status | Enum | |
| Religious Affiliation | Text | |
| Home Address | Text | |
| Home City | Text | |
| Home State | Text | |
| Home Zip | Text | |
| Country | Text | |
| Time Zone | Text | |
| Email Address | Email | |
| Primary Phone Number | Phone | |
| Secondary Phone Number | Phone | |
| Work Phone Number | Phone | |
| Preferred Contact Method | Enum | First entry |
| Preferred Contact Method (2) | Enum | Second entry (time of day?) |
| Insurance Company | Text | |
| Member/Beneficiary ID | Text | |
| Priority | Enum | Primary / Secondary |
| Policy Group Number | Text | |
| Plan Name | Text | |
| Is the name and contact information for the primary insured the same as the client? | Yes/No | |
| Client relationship to policy holder | Enum | |
| Policy holder (First Name) | Text | |
| Policy holder (Middle Name) | Text | |
| Policy holder (Last Name) | Text | |
| Administrative Sex | Enum | |
| Policy Holder Date of Birth | Date | |
| Policy Holder Address 1 | Text | |
| Policy Holder Address 2 | Text | |
| Policy Holder Zip | Text | |
| Policy Holder City/State | Text | |
| Policy Holder Phone Number | Phone | |
| Front of Insurance Card | Image | |
| Back of Insurance Card | Image | |
| Name on Card | Text | |
| Type of Card | Enum | Visa / Mastercard only |
| Is this a credit card? | Yes/No | |
| Card Number | Text | ⚠️ HIPAA/PCI: App Script extracts last 4 only, full number never stored in AppSheet |
| Card Expiration Date | Text | |
| Security Code | Text | ⚠️ HIPAA/PCI: Not copied to AppSheet, left in raw form only |
| Billing Street Address | Text | |
| Billing City | Text | |
| Billing Zip Code | Text | |
| Medication Name (1) | Text | Normalized → ClientMedication on processing |
| Dosage (1) | Text | |
| Form / Unit (1) | Text | |
| Amount (1) | Text | |
| Frequency (1) | Text | |
| Symptoms Being Treated (1) | Text | |
| Prescribed By (1) | Text | |
| Is there another medication? | Yes/No | |
| Medication Name (2) | Text | |
| Dosage (2) | Text | |
| ... (repeat pattern) | | |
| Medication Name (3) | Text | |
| ... (repeat pattern) | | |

**Admin Columns (add to right of sheet)**:
| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ProcessedStatus | Enum | `"New"` | — | New / Processing / Processed / Failed |
| ClientID | Text | — | — | Populated by App Script after processing |
| ProcessedOn | DateTime | — | — | When App Script ran |
| ProcessedBy | Text | — | — | "Bot" or AppUser ID |

**Key**: `Timestamp` (Google Form auto-generates, we use as unique key)
**Label (VC)**: `CONCATENATE([First Name], " ", [Last Name], " — ", TEXT([Timestamp], "MM/DD/YYYY"))`

---

## Client
**Purpose**: Structured client record, created from FormIntake processing.
**Parent**: None (core entity)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | — | |
| FirstName | Text | — | — | — | |
| MiddleName | Text | — | — | — | |
| LastName | Text | — | — | — | |
| Suffix | Text | — | — | — | |
| PreferredName | Text | — | — | — | |
| AlsoKnownAs | Text | — | — | — | |
| Pronouns | Text | — | — | — | |
| AdminGender | Enum | — | — | — | |
| GenderIdentity | Text | — | — | — | |
| SexualOrientation | Text | — | — | — | |
| Race | Text | — | — | — | |
| Ethnicity | Text | — | — | — | |
| Language | Text | — | — | — | `"English"` if blank |
| MaritalStatus | Enum | — | — | — | |
| ReligiousAffiliation | Text | — | — | — | |
| HomeAddress | Text | — | — | — | |
| HomeCity | Text | — | — | — | |
| HomeState | Text | — | — | — | |
| HomeZip | Text | — | — | — | |
| Country | Text | `"United States"` | — | — | |
| TimeZone | Enum | `"America/Phoenix"` | — | — | AZ = no DST |
| Email | Email | — | — | — | |
| Mobile | Phone | — | — | — | Primary phone |
| SecondaryMobile | Phone | — | — | — | |
| WorkMobile | Phone | — | — | — | |
| PreferredContact | Enum | — | — | — | Email / Phone / Text |
| **ConsentEmail** | Enum | — | — | — | **Yes / No** — drives doc version |
| **ConsentTelehealth** | Enum | — | — | — | **Yes / No** — drives doc version |
| Status | Enum | `"New"` | — | — | See lifecycle in ProjectInfo |
| AssignedTherapist | Enum Ref → AppUser | — | — | — | |
| FormIntakeTimestamp | DateTime | — | `ISBLANK([_THIS])` | — | Links back to FormIntake row |
| DriveFolderID | Text | — | `ISBLANK([_THIS])` | — | Google Drive folder ID for this client |
| DriveFolderURL | URL | — | `ISBLANK([_THIS])` | — | |
| Notes | LongText | — | — | — | Internal only |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `NOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `NOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([FirstName], " ", [LastName])` | — | — | |

**Slices**:
| Slice | Filter |
|-------|--------|
| ClientNew | `[Status] = "New"` |
| ClientActive | `[Status] = "Active"` |
| ClientPipeline | `NOT(IN([Status], LIST("Active", "Archived")))` |
| ClientMyAssigned | `[AssignedTherapist] = ANY(Me[ID])` |

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_Client` | Set `LastEditOn` = `NOW()` | TRUE |
| `Add_NewClient` | LINKTOFORM("Client_Form", "Status", "New") | `IN("Admin", ANY(Me[Roles]))` |
| `Approved_IntakeReceived` | Set `Status` = "IntakeReceived" | `[Status] = "New"` |
| `Send_IntakeLink` | AppSheet SMS to `[Mobile]` with FormIntakeURL | `ISBLANK([FormIntakeTimestamp])` |
| `View_ClientDrive` | Navigate to `[DriveFolderURL]` | `NOT(ISBLANK([DriveFolderURL]))` |

---

## ClientInsurance
**Purpose**: Insurance details per client.
**Parent**: Client (one client can have primary + secondary insurance)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | |
| ClientID | Enum Ref → Client | — | `ISBLANK([_THIS])` | |
| Priority | Enum | `"Primary"` | — | Primary / Secondary |
| InsuranceCompany | Text | — | — | |
| MemberID | Text | — | — | |
| GroupNumber | Text | — | — | |
| PlanName | Text | — | — | |
| PrimaryInsuredSameAsClient | Yes/No | — | — | |
| ClientRelationToHolder | Enum | — | — | Self/Spouse/Child/Other |
| HolderFirstName | Text | — | — | |
| HolderMiddleName | Text | — | — | |
| HolderLastName | Text | — | — | |
| HolderAdminSex | Enum | — | — | |
| HolderDOB | Date | — | — | |
| HolderAddress | Text | — | — | |
| HolderAddress2 | Text | — | — | |
| HolderZip | Text | — | — | |
| HolderCityState | Text | — | — | |
| HolderMobile | Phone | — | — | |
| InsuranceCardFront | Image | — | — | |
| InsuranceCardBack | Image | — | — | |
| VerificationStatus | Enum | `"Pending"` | — | Pending / Verified / Failed / NotApplicable |
| VerificationNotes | Text | — | — | |
| VerifiedOn | DateTime | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `NOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `NOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [InsuranceCompany], " (", [Priority], ")")` | — | |

---

## ClientPayment
**Purpose**: Credit/debit card on file. HIPAA/PCI — store last 4 digits only.
**Parent**: Client (one-to-one)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | |
| ClientID | Enum Ref → Client | — | `ISBLANK([_THIS])` | |
| NameOnCard | Text | — | — | |
| CardType | Enum | — | — | Visa / Mastercard |
| IsCreditCard | Yes/No | — | — | |
| CardLast4 | Text | — | `ISBLANK([_THIS])` | ⚠️ App Script extracts last 4 from form only |
| CardExpiry | Text | — | — | MM/YY |
| BillingAddress | Text | — | — | |
| BillingCity | Text | — | — | |
| BillingZip | Text | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `NOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `NOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [CardType], " ****", [CardLast4])` | — | |

> ⚠️ **PCI/HIPAA**: Full card number and CVV from Google Form are NEVER copied to AppSheet. App Script reads form sheet, extracts last 4, writes only that to ClientPayment. Raw form sheet access is restricted to admin only.

---

## ClientMedication
**Purpose**: One record per medication. Normalized from 3 flat form columns.
**Parent**: Client (one-to-many)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | |
| ClientID | Enum Ref → Client | — | `ISBLANK([_THIS])` | |
| SortOrder | Number | — | — | 1, 2, 3… for ordering |
| MedicationName | Text | — | — | |
| Dosage | Text | — | — | |
| FormUnit | Enum | — | — | Capsule / Tablet / Liquid / Other |
| Amount | Text | — | — | How many taken |
| Frequency | Text | — | — | How often |
| SymptomsBeingTreated | Text | — | — | |
| PrescribedBy | Text | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `NOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `NOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [MedicationName])` | — | |

---

## ClientDocument
**Purpose**: Track every generated document and its e-signature lifecycle.
**Parent**: Client (one-to-many — can regenerate if needed)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | |
| ClientID | Enum Ref → Client | — | `ISBLANK([_THIS])` | |
| Status | Enum | `"Pending"` | — | Pending / Generating / Generated / SentForSignature / Signed / UploadedToEMR |
| ConsentEmailVersion | Enum | — | `ISBLANK([_THIS])` | Yes / No — which version was baked in |
| ConsentTelehealthVersion | Enum | — | `ISBLANK([_THIS])` | Yes / No |
| GoogleDocID | Text | — | `ISBLANK([_THIS])` | Drive file ID of generated Google Doc |
| GoogleDocURL | URL | — | `ISBLANK([_THIS])` | Direct link to open Google Doc |
| SignedPDFID | Text | — | — | Drive file ID of signed PDF |
| SignedPDFURL | URL | — | — | Direct link to signed PDF |
| GeneratedOn | DateTime | — | — | When App Script created the Doc |
| SentForSignatureOn | DateTime | — | — | When e-sign request was initiated |
| SignedOn | DateTime | — | — | When client completed signature |
| UploadedToEMROn | DateTime | — | — | When admin uploaded to EMR portal |
| Notes | Text | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `NOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `NOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [Status], " — ", TEXT([CreatedOn], "MM/DD/YYYY"))` | — | |

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_ClientDocument` | Set `LastEditOn` = `NOW()` | TRUE |
| `View_GoogleDoc` | Navigate to `[GoogleDocURL]` | `NOT(ISBLANK([GoogleDocURL]))` |
| `View_SignedPDF` | Navigate to `[SignedPDFURL]` | `NOT(ISBLANK([SignedPDFURL]))` |
| `Approved_Signed` | Set `Status` = "Signed", `SignedOn` = `NOW()` | `[Status] = "SentForSignature"` |
| `Approved_UploadedToEMR` | Set `Status` = "UploadedToEMR", `UploadedToEMROn` = `NOW()` | `[Status] = "Signed"` |

---

## Enum Values
| Table.Column | Values |
|-------------|--------|
| Client.Status | New, IntakeReceived, DocsGenerated, AwaitingSignature, Signed, InsuranceVerifying, Scheduled, Active, Archived |
| Client.ConsentEmail | Yes, No |
| Client.ConsentTelehealth | Yes, No |
| Client.PreferredContact | Email, Phone, Text |
| Client.TimeZone | America/Phoenix, America/New_York, America/Chicago, America/Denver, America/Los_Angeles |
| ClientInsurance.Priority | Primary, Secondary |
| ClientInsurance.VerificationStatus | Pending, Verified, Failed, NotApplicable |
| ClientInsurance.ClientRelationToHolder | Self, Spouse, Child, Other |
| ClientDocument.Status | Pending, Generating, Generated, SentForSignature, Signed, UploadedToEMR |
| FormIntake.ProcessedStatus | New, Processing, Processed, Failed |

---

## Session
**Purpose**: One record per scheduled appointment. Links a client to a date/time.
**Parent**: Client (one client → many sessions)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | — | |
| ClientID | Enum Ref → Client | — | `ISBLANK([_THIS])` | — | |
| SessionDate | Date | — | — | — | Date of appointment |
| SessionTime | Time | — | — | — | Scheduled start time |
| Status | Enum | `"Scheduled"` | — | — | Scheduled / Completed / Cancelled / NoShow |
| Notes | LongText | — | — | — | Admin notes about this session (not clinical) |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | `ISBLANK([_THIS])` | No | |
| CreatedOn | DateTime | `NOW()` | `ISBLANK([_THIS])` | No | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | `ISBLANK([_THIS])` | Yes | |
| LastEditOn | DateTime | `NOW()` | `ISBLANK([_THIS])` | Yes | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", TEXT([SessionDate], "MM/DD/YYYY"))` | — | — | |

> Therapist is assigned at the Client level (`Client.AssignedTherapist`) — NOT per session.
> Session scheduling happens in Therapy Notes EHR (exports to Google Calendar). Admin manually creates the Session row in AppSheet to track it.

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_Session` | Set `LastEditOn = NOW()` | TRUE |
| `Approved_SessionCompleted` | Set `Status = "Completed"` | `[Status] = "Scheduled"` |

---

## SessionNotes
**Purpose**: Clinical notes per session. One session can have multiple note entries.
**Parent**: Session (one session → many notes)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | — | |
| SessionID | Enum Ref → Session | — | `ISBLANK([_THIS])` | — | |
| NoteDate | Date | `TODAY()` | — | — | When note was written |
| NoteText | LongText | — | — | — | Clinical note content |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | `ISBLANK([_THIS])` | No | |
| CreatedOn | DateTime | `NOW()` | `ISBLANK([_THIS])` | No | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | `ISBLANK([_THIS])` | Yes | |
| LastEditOn | DateTime | `NOW()` | `ISBLANK([_THIS])` | Yes | |
| Label (VC) | Virtual | `CONCATENATE([SessionID].[ClientID].[Label], " — Note — ", TEXT([NoteDate], "MM/DD/YYYY"))` | — | — | |

> **Permission restriction**: `U_Operations_Manager` role cannot see SessionNotes. David (`U_System_Admin`) has full access.
> Implement via Security Filter on SessionNotes table: `ISNOTBLANK(INTERSECT({"U_System_Admin"}, SPLIT(ANY(Me[Roles]),",")))`

---

## Enum Values
| Table.Column | Values |
|-------------|--------|
| Client.Status | New, ClientInfoReceived, DocsGenerated, AwaitingSignature, Signed, InsuranceVerifying, AwaitingIntakeSession, IntakeComplete, Active, NotProceeding, Archived |
| Client.ConsentEmail | Yes, No |
| Client.ConsentTelehealth | Yes, No |
| Client.PreferredContact | Email, Phone, Text |
| Client.TimeZone | America/Phoenix, America/New_York, America/Chicago, America/Denver, America/Los_Angeles |
| ClientInsurance.Priority | Primary, Secondary |
| ClientInsurance.VerificationStatus | Pending, Verified, Failed, NotApplicable |
| ClientInsurance.ClientRelationToHolder | Self, Spouse, Child, Other |
| ClientDocument.Status | Pending, Generating, Generated, SentForSignature, Signed, UploadedToEMR |
| FormIntake.ProcessedStatus | New, Processing, Processed, Failed |
| Session.Status | Scheduled, Completed, Cancelled, NoShow |

**Client.Status pipeline colour mapping (David's system):**
| Status | Colour | Meaning |
|--------|--------|---------|
| NotProceeding | 🔴 Red | Client decided not to proceed (insurance, etc.) |
| AwaitingIntakeSession | 🟡 Yellow | Docs signed; waiting to schedule/confirm first appointment |
| IntakeComplete | 🟢 Green | First appointment has occurred |

---

## App Script Integration Points
| Script Function | Trigger | Output |
|----------------|---------|--------|
| `processNewIntake(row)` | Hourly bot OR manual button | Creates Client + children records |
| `generateIntakePackage(clientId)` | Button `Generate_Docs` on Client | Creates Google Doc in Drive folder, returns Doc URL |
| `createClientDriveFolder(clientId)` | Called within processNewIntake | Creates folder in Shared Drive, returns folder ID |
| `extractLast4(cardNumber)` | Called within processNewIntake | Returns last 4 digits only |
| `sendDocuSignRequest(docUrl, email)` | Button OR auto | Initiates DocuSign envelope (Phase 1.5) |
| `moveSignedPDF(fileId, folderId)` | DocuSign webhook callback | Moves signed PDF to client folder |
