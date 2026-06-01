# System Tables Schema — Standard Pattern SP-001
> Reusable scaffold for all 6 mandatory system tables.
> Copy this as the starting point for every new AppSheet project.

---

## AppUser
| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit |
|--------|------|----------------------------|-------------|---------------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — |
| FirstName | Text | — | — | — |
| LastName | Text | — | — | — |
| Mobile | Phone | — | — | — |
| Email | Email | — | — | — |
| AccessEmail | Email | — | — | — |
| UserEmail | Email | `USEREMAIL()` | OFF | TRUE |
| AccessKey | Text | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — |
| Roles | Enum Ref → AppAccess | — | — | — |
| Status | Enum | `"Active"` | — | — |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE |
| Label (VC) | Virtual | `CONCATENATE([FirstName], " ", [LastName])` | — | — |

**Me Slice**: `AND([AccessEmail] = USEREMAIL(), [Status] = "Active")`

---

## AppAccess
| Column | Type | Initial Value | Notes |
|--------|------|--------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | |
| Module | Enum | — | e.g., System, Employee, Finance |
| AccessLevel | Enum | — | e.g., Admin, Manager, Field |
| Label (VC) | Virtual | `CONCATENATE([Module], "_", [AccessLevel])` | |

---

## AppView
| Column | Type | Initial Value | Notes |
|--------|------|--------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | |
| ViewName | Text | — | Matches AppSheet view name exactly |
| Module | Enum Ref → AppAccess | — | |
| AllowedRoles | List Ref → AppAccess | — | |
| IsActive | Yes/No | `TRUE` | |
| SortOrder | Number | — | Controls nav order |
| Label (VC) | Virtual | `[ViewName]` | |

---

## AppSetting
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | Use descriptive key (e.g., "CompanyName") |
| Value | Text | The setting value |
| Description | Text | What this setting controls |
| Label (VC) | Virtual | `[ID]` |

Access formula: `LOOKUP("SettingName", "AppSetting", "ID", "Value")`

---

## AppVariable
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | Use descriptive key |
| Value | Text | Dynamic operational value |
| LastUpdated | DateTime | `UTCNOW()` |
| UpdatedBy | Enum Ref → AppUser | `ANY(Me[ID])` |
| Label (VC) | Virtual | `[ID]` |

---

## AppTrigger
| Column | Type | Initial Value | Notes |
|--------|------|--------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | |
| TriggerName | Text | — | Bot/automation name |
| Status | Enum | `"Pending"` | Pending / Sent / Failed |
| Payload | LongText | — | JSON or relevant data |
| AttemptCount | Number | `0` | |
| CreatedOn | DateTime | `UTCNOW()` | |
| LastEditOn | DateTime | `UTCNOW()` | Reset on Edit: TRUE |
| Label (VC) | Virtual | `CONCATENATE([TriggerName], " - ", [Status])` | |
