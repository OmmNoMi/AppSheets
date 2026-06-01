# Schema — Transcend IntakeSystem
> Always reflects CURRENT state. Update in place. History → Decisions.md.
> Compliance: HIPAA. Google Workspace with BAA required.

---

## Google Sheets Structure
| Tab Name | AppSheet Table | Type | Source |
|----------|---------------|------|--------|
| AppUser | AppUser | System | New sheet |
| AppAccess | AppAccess | System | New sheet |
| AppView | AppView | System | New sheet |
| AppSetting | AppSetting | System | New sheet |
| AppVariable | AppVariable | System | New sheet |
| AppTrigger | AppTrigger | System | New sheet |
| Form Responses 1 | IntakeForm | Operational | Existing (Google Form output) |
| Client | Client | Operational | New sheet |
| ClientInsurance | ClientInsurance | Operational | New sheet |
| ClientPayment | ClientPayment | Operational | New sheet |
| ClientMedication | ClientMedication | Operational | New sheet |
| ClientDocument | ClientDocument | Operational | New sheet |

---

## System Tables
> Standard config — see `_Patterns/Schema/SystemTables.md`

**AppAccess Modules**: System, Operations, Therapy
**AppAccess Levels**: Admin, Manager, View

**Initial AppAccess rows**:
| ID | Module | AccessLevel |
|----|--------|------------|
| System_Admin | System | Admin |
| Operations_Manager | Operations | Manager |
| Therapist_View | Therapy | View |

**AppSetting Initial Values**:
| ID | Value | Description |
|----|-------|-------------|
| CompanyName | Transcend Counseling & Wellness | Practice name |
| IntakeFormURL | https://forms.google.com/... | Link sent to clients via SMS |
| DriveFolderID | *(Shared Drive root folder ID)* | HIPAA-compliant Shared Drive |
| DocuSignEnabled | FALSE | Toggle when DocuSign is set up |
| BotProcessingEnabled | TRUE | Enable/disable hourly intake bot |
| SMTPFromEmail | *(admin email)* | Sender email for notifications |

---

## IntakeForm
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
**Purpose**: Structured client record, created from IntakeForm processing.
**Parent**: None (core entity)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
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
| IntakeFormTimestamp | DateTime | — | `ISBLANK([_THIS])` | — | Links back to IntakeForm row |
| DriveFolderID | Text | — | `ISBLANK([_THIS])` | — | Google Drive folder ID for this client |
| DriveFolderURL | URL | — | `ISBLANK([_THIS])` | — | |
| Notes | LongText | — | — | — | Internal only |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
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
| `Sync_Client` | Set `LastEditOn` = `UTCNOW()` | TRUE |
| `Add_NewClient` | LINKTOFORM("Client_Form", "Status", "New") | `IN("Admin", ANY(Me[Roles]))` |
| `Approved_IntakeReceived` | Set `Status` = "IntakeReceived" | `[Status] = "New"` |
| `Send_IntakeLink` | AppSheet SMS to `[Mobile]` with IntakeFormURL | `ISBLANK([IntakeFormTimestamp])` |
| `View_ClientDrive` | Navigate to `[DriveFolderURL]` | `NOT(ISBLANK([DriveFolderURL]))` |

---

## ClientInsurance
**Purpose**: Insurance details per client.
**Parent**: Client (one client can have primary + secondary insurance)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | |
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
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [InsuranceCompany], " (", [Priority], ")")` | — | |

---

## ClientPayment
**Purpose**: Credit/debit card on file. HIPAA/PCI — store last 4 digits only.
**Parent**: Client (one-to-one)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | |
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
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [CardType], " ****", [CardLast4])` | — | |

> ⚠️ **PCI/HIPAA**: Full card number and CVV from Google Form are NEVER copied to AppSheet. App Script reads form sheet, extracts last 4, writes only that to ClientPayment. Raw form sheet access is restricted to admin only.

---

## ClientMedication
**Purpose**: One record per medication. Normalized from 3 flat form columns.
**Parent**: Client (one-to-many)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | |
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
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [MedicationName])` | — | |

---

## ClientDocument
**Purpose**: Track every generated document and its e-signature lifecycle.
**Parent**: Client (one-to-many — can regenerate if needed)

| Column | Type | Initial Value | Editable_If | Notes |
|--------|------|--------------|-------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | |
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
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([ClientID].[Label], " — ", [Status], " — ", TEXT([CreatedOn], "MM/DD/YYYY"))` | — | |

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_ClientDocument` | Set `LastEditOn` = `UTCNOW()` | TRUE |
| `View_GoogleDoc` | Navigate to `[GoogleDocURL]` | `NOT(ISBLANK([GoogleDocURL]))` |
| `View_SignedPDF` | Navigate to `[SignedPDFURL]` | `NOT(ISBLANK([SignedPDFURL]))` |
| `Approved_Signed` | Set `Status` = "Signed", `SignedOn` = `UTCNOW()` | `[Status] = "SentForSignature"` |
| `Approved_UploadedToEMR` | Set `Status` = "UploadedToEMR", `UploadedToEMROn` = `UTCNOW()` | `[Status] = "Signed"` |

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
| IntakeForm.ProcessedStatus | New, Processing, Processed, Failed |

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
