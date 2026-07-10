# DA Onboarding Migration: BLUJ → ONDT Migration Plan

> **Context**: Detailed breakdown of Columns, Actions, Views, and Slices needed to align ONDT with BLUJ.

## Table: Candidate

### 1. Data Columns
#### Missing Columns (To be added to ONDT)
| Column Name | Type | Initial Value/Formula |
|---|---|---|
| `RejectionReason` | EnumList | `` |

### 2. Actions
**BLUJ Actions:**
- **StartOnboarding (→"Start Onboarding")**: ADD_RECORD_TO IF `=[Decision] = "Selected"`
- **UpdateCandidate**: SET_COLUMN_VALUE IF `true`
- **Set [Decision] to Scheduled**: SET_COLUMN_VALUE
- **Set [Decision] to Scheduled 2**: SET_COLUMN_VALUE
- **Export (→"Download")**: EXPORT_VIEW
- **New step Action - 5**: REF_ACTION IF `true`
- **ReviewedCandidate (→"Candidate Reviewed")**: SET_COLUMN_VALUE
- **Call Phone (Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Phone]))`
- **Send SMS (Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Phone]))`

**ONDT Actions:**
- **StartOnboarding (→"Start Onboarding")**: ADD_RECORD_TO IF `=[Decision] = "Selected"`
- **UpdateCandidate**: SET_COLUMN_VALUE IF `true`
- **Set [Decision] to Scheduled**: SET_COLUMN_VALUE
- **Set [Decision] to Scheduled 2**: SET_COLUMN_VALUE
- **Export (→"Download")**: EXPORT_VIEW
- **New step Action - 5**: REF_ACTION IF `true`
- **ReviewedCandidate (→"Candidate Reviewed")**: SET_COLUMN_VALUE
- **Call Phone (Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Phone]))`
- **Send SMS (Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Phone]))`

### 3. Views
**BLUJ Views:**
- None

**ONDT Views:**
- None

### 4. Slices
**BLUJ Slices:**
- **NewCandidate** (Candidate): `=or(AND([Date] >= NOW()-7,[Decision]<>"Not Interested",[Decision]<>"Selected",[Decision]<>"Never Responded",[Decision]<>"Rejected"),[Interview Date]>today())`
- **TodayInterview** (Candidate): `=Date([Interview Date]) = today()`

**ONDT Slices:**
- **NewCandidate** (Candidate): `=or(AND([Date] >= NOW()-7,[Decision]<>"Not Interested",[Decision]<>"Selected",[Decision]<>"Never Responded",[Decision]<>"Rejected"),[Interview Date]>today())`
- **TodayInterview** (Candidate): `=Date([Interview Date]) = today()`

---

## Table: Onboarding

### 1. Data Columns
#### Missing Columns (To be added to ONDT)
| Column Name | Type | Initial Value/Formula |
|---|---|---|
| `TransporterId` | Text | `` |
| `CortexStatus` | Enum | `=Not Active` |
| `Fleet` | Enum | `` |
| `Mentor` | Enum | `` |
| `JJKId` | Text | `` |
| `Badge` | Enum | `` |
| `Relay` | Enum | `` |
| `Road Test Status` | Text | `` |
| `Road Test Date` | Date | `TODAY()` |
| `Onboarding` | Show | `` |
| `JJ Keller` | Show | `` |

#### Legacy Columns (Present in ONDT, missing in BLUJ)
- `Day1`
- `Documents`
- `Missing Documents`
- `1Onboarding`
- `2Onboarding`
- `TrainingDay2`
- `EmployeeID`
- `EmployeeStatus`

### 2. Actions
**BLUJ Actions:**
- **Set [Onboarding Status] to Background Failed Action - 1**: SET_COLUMN_VALUE IF `true`
- **Action for Set [Onboarding Status] to Drug Test Failed**: SET_COLUMN_VALUE
- **Action for Set [Onboarding Status] to Followup**: SET_COLUMN_VALUE
- **set Onboarding status to Training scheduled Action - 1**: SET_COLUMN_VALUE IF `true`
- **Set [Onboarding Status] to Waiting for Results**: SET_COLUMN_VALUE
- **MoveToEmployee**: ADD_RECORD_TO IF `true`
- **ExportOnboarding (→"Download")**: EXPORT_VIEW
- **New step Action - 3**: REF_ACTION IF `true`
- **Action for CreateTaskforDispatch**: ADD_RECORD_TO IF `true`
- **AddTransporterID Action - 1**: ADD_RECORD_TO IF `true`
- **Set [OnboaridngStatus] to Schedule Training Action - 1**: SET_COLUMN_VALUE IF `true`
- **New step Action - 1**: SET_COLUMN_VALUE IF `true`
- **FirstDayDocusign (→"Send New Hire Docusign")**: NAVIGATE_URL IF `=AND([NewHireStatus]="Joined",isblank([Docusign]))`
- **Edit_Onboarding (→"Edit")**: NAVIGATE_APP IF `true`
- **Action for MarkAsDOTDriver**: REF_ACTION IF `true`

**ONDT Actions:**
- **Set [Onboarding Status] to Background Failed Action - 1**: SET_COLUMN_VALUE IF `true`
- **Action for Set [Onboarding Status] to Drug Test Failed**: SET_COLUMN_VALUE
- **Action for Set [Onboarding Status] to Followup**: SET_COLUMN_VALUE
- **set Onboarding status to Training scheduled Action - 1**: SET_COLUMN_VALUE IF `true`
- **Set [Onboarding Status] to Waiting for Results**: SET_COLUMN_VALUE
- **MoveToEmployee**: ADD_RECORD_TO IF `true`
- **ExportOnboarding (→"Download")**: EXPORT_VIEW
- **New step Action - 3**: REF_ACTION IF `true`
- **Action for CreateTaskforDispatch**: ADD_RECORD_TO IF `true`
- **AddTransporterID Action - 1**: ADD_RECORD_TO IF `true`
- **Set [OnboaridngStatus] to Schedule Training Action - 1**: SET_COLUMN_VALUE IF `true`
- **New step Action - 1**: SET_COLUMN_VALUE IF `true`
- **FirstDayDocusign (→"Send New Hire Docusign")**: NAVIGATE_URL IF `=AND( OR(
- **EditOnboarding (→"Edit")**: NAVIGATE_APP IF `true`
- **EditEmployeeFromOnboarding (→"Employee Details")**: NAVIGATE_APP IF `=AND(

### 3. Views
**BLUJ Views:**
- None

**ONDT Views:**
- None

### 4. Slices
**BLUJ Slices:**
- **CurrentOnboarding** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"
- **NewHire** (Onboarding): `=AND([NewHireStatus]<>"All Completed",[NewHireStatus]<>"Declined to Join",isnotblank([TrainingDate]))`
- **CurrentOnboardingDOTDriver** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"

**ONDT Slices:**
- **CurrentOnboarding** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"
- **NewHire** (Onboarding): `=AND([NewHireStatus]<>"All Completed",[NewHireStatus]<>"Declined to Join",isnotblank([TrainingDate]))`
- **CurrentOnboardingDOT** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"

---

