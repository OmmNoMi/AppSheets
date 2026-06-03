# System Tables Schema — Standard Pattern SP-001
> Reusable scaffold for all 7 mandatory system tables.
> **These tables are pre-built in the Base App.** This document is the reference spec — not a setup guide.
> Source of truth: `_Templates/Base Template Core.xlsx`

---

## AppUser
| Column | Type | Initial Value / Formula | Editable_If | Reset on Edit | Notes |
|--------|------|------------------------|-------------|---------------|-------|
| ID | Text (Key) | Manual short code | — | — | OmmNoMi devs: `DevNomi`, `DevHardi`, `OmmNoMi`. Client admins: meaningful short code. End users: `=UPPER(TEXT(LEFT(UNIQUEID(),4)))` |
| Photo | Image | — | — | — | Folder: `AppResources/AppUsers`. Label column. |
| Email | Email | — | — | — | AppSheet login email |
| Name | Name | — | — | — | Full name. Label column. |
| Roles | EnumList (Ref → AppVariables) | `="U_Employee"` | — | — | Suggested_Values: `SPLIT(LOOKUP("AppUserRoles","AppVariables","ID","VariableList")," , ")` |
| AccessKey | Text | `="Not in Use"` | — | — | Hidden. Kiosk/shared device mode. |
| Status | Enum | `="Active"` | — | — | Active / Inactive |
| LastEditedBy | Enum Ref → AppUser | `=ANY(Me[ID])` | `ISBLANK([_THIS])` | Yes | Note: `LastEditedBy` (with 'd') — not `LastEditBy` |
| LastEditedOn | DateTime | `=NOW()` | `ISBLANK([_THIS])` | Yes | Note: `LastEditedOn` (with 'd') |
| RolesList | List (VC) | `SPLIT([Roles]," , ")` | — | — | Virtual. Used for INTERSECT role checks. |

**Me Slice** (always named exactly `Me`):
```
Filter: AND(
  [Email] = USEREMAIL(),
  OR([AccessKey] = "Not in Use", USERSETTINGS("AccessKey") = [AccessKey]),
  [Status] = "Active"
)
Update mode: READ_ONLY
```

**Pre-seeded OmmNoMi accounts (in every app):**
| ID | Email | Name | Roles |
|----|-------|------|-------|
| DevNomi | nomeshwer@ommnomi.in | Nomeshwer Sharma | U_System_Admin |
| DevHardi | hardiksharma80912@gmail.com | Hardik Sharma | U_System_Admin |
| OmmNoMi | team@ommnomi.in | OmmNoMi Automation | U_System_Admin |

---

## AppViews
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | Human-readable. OmmNoMi entries contain "OmmNoMi" — protected from deletion. |
| Type | Enum | e.g., `"Admin"` |
| View | Enum | AppSheet view name |
| Group | Enum | `"Users"`, `"Profile"`, or custom |
| Category | Enum | Display grouping in the admin nav card |
| Name | Name (Label) | Display name |
| Description | Text | Subtitle |
| Icon | Image | From AppResources |
| Link | URL | External link — takes priority over AppLink |
| AllowValues | EnumList | Filter values (used when Group = "Users") |
| AllowMultiple | EnumList | Multi-value filter |
| AllowRoles | EnumList (Ref → AppVariables) | Roles that can see this nav entry |
| LastEditBy | Enum Ref → AppUser | `ISBLANK([_THIS])`, Reset on Edit: Yes |
| LastEditOn | DateTime | `ISBLANK([_THIS])`, Reset on Edit: Yes |
| AppLink | App (VC) | Computed nav target — `IFS(ISNOTBLANK([Link]),"",1=1,SWITCH([Group],"Users",LINKTOFILTEREDVIEW("Users",IN([Status],LIST([AllowValues]))),"Profile",LINKTOROW(ANY(Me[ID]),"My_Profile"),LINKTOVIEW([View])))` |

**Admin_View Slice**: `AND([Type]="Admin", ISNOTBLANK(INTERSECT([AllowRoles],SPLIT(ANY(Me[Roles]),","))))`

**Pre-seeded entries (never delete):**
| ID | Category | Name | Link |
|----|----------|------|------|
| AppSettings | System | App Settings | — |
| AppViews | System | App Views | — |
| AppVariables | System | App Variables | — |
| AppTriggers | System | AppTriggers | — |
| UsersA | Users | Active Users | — |
| UsersB | Users | Inactive Users | — |
| Users | Users | All App Users | — |
| OmmNoMi_Support | @ OmmNoMi Automation | Email Support | mailto:support@ommnomi.in |
| OmmNoMi_Helpdesk | @ OmmNoMi Automation | Helpdesk Portal | https://ommnomi.in/helpdesk/my-tickets |
| OmmNoMi_Project | @ OmmNoMi Automation | Documentation | — |
| OmmNoMi_Website | @ OmmNoMi Automation | Our Website | https://ommnomi.in |

---

## AppVariables
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `UNIQUEID()`. Descriptive names for code-referenced rows. |
| Table | EnumList | Tables this variable applies to |
| Column | EnumList | Columns this variable drives |
| Tags | EnumList | `"ID is used in Code"` or `"ID Connected to Variable"` |
| ValueControl | EnumList | Active value field: `Enum`, `EnumList`, `VariableList`, `Date`, `Decimal`, `Photo`, `File`, `URL` |
| Title | Text (Label) | Human-readable name |
| Description | LongText | What it does |
| UsedFor | LongText | Where it's referenced |
| Decimal / EnumValue / EnumList / VariableList / DateValue / Photo / URL / File | Typed fields | Only the field matching ValueControl is editable |
| LastEditBy / LastEditOn | Audit | Standard pattern |

**Pre-seeded rows:**
| ID | Tags | ValueControl | Title |
|----|------|-------------|-------|
| AppUserRoles | ID is used in Code | VariableList | App User Roles |
| U_System_Admin | ID Connected to Variable | Enum | System Admin |
| U_System_Manager | ID Connected to Variable | Enum | System Manager |
| U_System_User | ID Connected to Variable | Enum | System User |
| U_System_Viewer | ID Connected to Variable | Enum | System Viewer |
| U_Employee | ID Connected to Variable | Enum | Employee |

**To add a project role**: Add a new row tagged `"ID Connected to Variable"`, ValueControl = `Enum`. It will automatically appear in the `AppUserRoles.VariableList` picker.

---

## AppSettings
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `UNIQUEID()`. Tag with `"ID is used in Code"` if hardcoded in formulas. |
| Tags | EnumList | Enforcement type: DataTable, DataColumn, View, Trigger based |
| Table / Trigger / View / Column | Enum | Context of where this setting applies |
| Title | Text (Label) | Human-readable name |
| Description | LongText | What this setting does |
| Roles | EnumList (Ref → AppVariables) | Roles allowed to use/trigger this setting |
| Decimal | Number | Numeric value |
| Date | Date | Date value. Initial: `TODAY()` |
| AllowedValues | EnumList | Valid inputs when this setting is referenced by AppTriggers |
| LastEditBy / LastEditOn | Audit | Standard pattern |

**Starts empty in Base App.** Add rows per project as needed.

Reading a setting:
```
LOOKUP("SettingID", "AppSettings", "ID", "Decimal")
LOOKUP("SettingID", "AppSettings", "ID", "AllowedValues")
```

---

## AppTimeline
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | Pre-seeded as date string (e.g., `2026-03-24 00:00:00`). Label column. |
| Date | Date | Calendar date. Initial: `TODAY()`. |
| AppTrigger | Enum (Ref → AppSettings) | Which automation fired for this date. Blank = not yet processed. |
| TriggerValue | Text | ID of the record processed by the automation. |
| TriggeredOn | DateTime | Actual execution timestamp. |

**Pre-seeded with 365 rows** — one per calendar day for the full year. Bots write to the matching date row when work is processed. Blank rows = unprocessed dates.

Seed next year's rows before Jan 1 to ensure uninterrupted bot operation.

---

## AppTriggers
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `UNIQUEID()`. Editable_If: `ISBLANK([_THIS])`. Label column. |
| AppTrigger | Enum (Ref → AppSettings) | Which setting/trigger this row is executing |
| Bot | Yes/No | Default: TRUE. Marks whether this was bot-initiated. |
| Type | Enum | Trigger category |
| Table | Enum | Target table |
| PickEmployee | Enum (Ref → AppUser) | Show_If: `IN("PickEmployee",SPLIT([AppTrigger].[AllowedValues],","))` |
| PickDate | Date | Initial: `TODAY()` |
| PickDateTime | DateTime | Initial: `NOW()` |
| ValueText | Text | Resolved text value. Initial: `=[PickEmployee].[Email]` |
| RefTable | Enum | Source table of triggering record |
| RefValue | Text | ID of triggering record |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])`. Editable_If: `ISBLANK([_THIS])` |
| CreatedOn | DateTime | `NOW()`. Editable_If: `ISBLANK([_THIS])` |
| Date (VC) | Text | `TEXT([CreatedOn],"DD/MM/YYYY")` — used for grouping |

**Starts empty in Base App.** Rows created at runtime by action buttons or bots.
