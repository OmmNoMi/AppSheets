# Patterns Index — OmmNoMi Cross-Project Learning
> **FOR ANTIGRAVITY**: Search this index FIRST before generating any schema, formula, or action.
> Each entry links to a detailed pattern file. Only fetch the file you need.

---

## How This Works
- Patterns are extracted from real project experience
- Each pattern has: Problem | Solution | Source Project | Verified
- When a new solution works in a project → Antigravity adds it here
- Patterns marked ⭐ are battle-tested across 2+ projects

---

## Schema Patterns
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| SP-001 | Standard system tables scaffold | `Schema/SystemTables.md` | SOP |
| SP-002 | Google Form repeating columns → normalize to child table via App Script | `Schema/FlatFormToChildTable.md` | Transcend |
| SP-003 | HIPAA/FERPA: Shared Drive folder structure for client/student files | `Schema/HIPAASharedDrive.md` | Transcend |
| SP-004 | Google Form sheet connected to AppSheet — integration rules | `Schema/GoogleFormIntegration.md` | Transcend |

## Formula Patterns
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| FP-001 | Audit stamp full setup | `_SOP/Formulas.md §I` | SOP |
| FP-002 | *(Add new patterns here)* | | |
| FP-003 | Creation-only editability for pre-filled columns | Inline below | Orbit |
| FP-004 | Contextual Description VC — one field, all request types | Inline below | Orbit |

## Action Patterns
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| AP-001 | Prevent filter inheritance on Add | `_SOP/Actions.md §Custom Add` | SOP |
| AP-002 | Force row recalculation | `_SOP/Actions.md §Sync_` | SOP |
| AP-003 | *(Add new patterns here)* | | |

### FP-003 Inline: Creation-Only Editability for Pre-Filled Columns
**Problem**: `ISBLANK([_THIS])` fails to restrict edits to "creation only" if the field has an Initial Value (e.g., logged-in user).
**Solution**: Check if the record is brand new by verifying its ID doesn't exist in the table yet.
**AppSheet Config**:
`Editable_If`: `AND(NOT(IN([_THISROW].[ID], TableName[ID])), [Condition])`
**Source**: Orbit | 2026-06-02

### FP-004 Inline: Contextual Description VC — One Field, All Request Types
**Problem**: Different request types need to show different contextual info on the form (TOIL needs check-in/out, WFH needs date range, Leave needs balance). Creating a separate VC per type pollutes the schema.
**Solution**: One `Description` Virtual Column using `IFS()` that renders the correct summary string based on `[RequestType]`. Each branch is fully independent.
**AppSheet Config**:
```
IFS(
  [RequestType] = "TOIL",
    CONCATENATE("Check-In: ", TEXT([AttendanceDaily].[Office_Check_In], "HH:MM"), " | Check-Out: ", ...),
  [RequestType] = "Attendance Regularization",
    CONCATENATE("Recorded: ", TEXT([AttendanceDaily].[Office_Check_In], "HH:MM"), " | ..."),
  [RequestType] = "Leave Application",
    CONCATENATE("Balance: ", TEXT([LeaveAllocation].[Available], "0.0"), " days"),
  IN([RequestType], {"Work From Home", "Remote Work"}),
    CONCATENATE("From: ", TEXT([StartDate], "DD MMM YYYY"), " To: ", TEXT([EndDate], "DD MMM YYYY")),
  TRUE,
    CONCATENATE("From: ", TEXT([StartDate], "DD MMM YYYY"))
)
```
**Show_If**: `ISNOTBLANK([AttendanceDaily])` or `ISNOTBLANK([StartDate])`
**Key Rules**: Use timezone-corrected VCs (`Office_Check_In`/`Office_Check_Out`) not raw check-in/out columns. Add new `IFS` branches for future request types without touching existing logic.
**Source**: Orbit | 2026-06-02

## Bug Fixes & Gotchas
| ID | Symptom | Fix | Source |
|----|---------|-----|--------|
| BF-001 | Scientific notation in ID columns | Format sheet as Plain Text + TEXT(UNIQUEID()) | SOP |
| BF-002 | Sync lag on Virtual Columns | Convert to physical column if >100ms | SOP |
| BF-003 | VC name collision with physical column | Delete VC → sync → add physical column → regenerate | SOP |
| BF-004 | Form pre-fills wrong Status from filtered view | Use custom Add_ action with LINKTOFORM() | SOP |
| BF-005 | Full card number / CVV in Google Form | HIPAA/PCI: App Script extracts last 4 only, CVV never stored | Transcend |
| BF-006 | Google Form sheet columns renamed/broken in AppSheet | Never rename form cols — use Display Name; add admin cols at END only; use Timestamp as key | Transcend |

## UX Patterns
| ID | Use Case | Pattern File | Source |
|----|---------|-------------|--------|
| UX-001 | Module dashboard layout | `_SOP/UX.md §Dashboard` | SOP |
| UX-002 | Status format rules | `_SOP/UX.md §Format Rules` | SOP |
| UX-003 | *(Add new patterns here)* | | |
| UX-004 | Dependent field auto-compute with conditional override | Inline below | Orbit |

## Automation Patterns
| ID | Use Case | Pattern File | Source |
|----|---------|-------------|--------|
| AU-001 | Nightly overdue bot | `_SOP/Automations.md §Overdue Bot` | SOP |
| AU-002 | ADDS_ONLY notification | `_SOP/Automations.md §Notification` | SOP |
| AU-003 | Conditional document versioning (consent flags → doc version) | Inline below | Transcend |
| AU-004 | Hourly App Script bot for Google Form auto-processing | `Automations/HourlyFormProcessingBot.md` | Transcend |
| AU-005 | AppTimeline daily calendar bot — claim a date row, log execution | `_SOP/Automations.md §AppTimeline` | Base App |

### UX-004 Inline: Dependent Field Auto-Compute with Conditional Override
**Problem**: A field must dynamically pull a value from a dropdown selection, but must be manually editable if specific exceptions are chosen (e.g. "Work From Home").
**Solution**: 
1. **Initial Value**: `[DropdownCol].[Value]` (Do not use App Formula)
2. **Reset on edit?**: `ISNOTBLANK([DropdownCol])` (Forces Initial Value to refresh on dropdown change)
3. **Editable_If**: `OR(ISBLANK([DropdownCol]), IN([Type], {"Exception"}))`
4. **Show_If**: `OR(CONTEXT("ViewType") <> "Form", IN([Type], {"Exception"}))` (Hides the field on forms for non-exceptions to prevent manual tampering, but background math still runs).
**Source**: Orbit | 2026-06-02

### AU-003 Inline: Consent-Driven Document Versioning
**Problem**: Document has conditional sections based on client preferences. Free-text in e-sign is confusing.
**Solution**: Capture consent as Yes/No at intake. App Script includes/excludes the correct pre-written paragraph.
```javascript
// App Script template logic
if (consentEmail === 'Yes') {
  body.replaceText('{{EMAIL_CONSENT_SECTION}}', EMAIL_CONSENT_YES_TEXT);
} else {
  body.replaceText('{{EMAIL_CONSENT_SECTION}}', EMAIL_CONSENT_NO_TEXT);
}
```
**AppSheet**: `Client.ConsentEmail` (Enum: Yes/No), `Client.ConsentTelehealth` (Enum: Yes/No)
**Source**: Transcend_IntakeSystem | 2026-05-31

---

## How Antigravity Adds a New Pattern
When a solution is found during a project session:
1. Add a row to the relevant section above with next ID
2. If the pattern is complex (>3 lines), create `[Category]/Pattern_[ID].md`
3. If simple, inline it in this index file directly
4. Update source project's `Learnings.md` with Promoted = Yes
5. Mark with ⭐ after it's been verified in a second project
