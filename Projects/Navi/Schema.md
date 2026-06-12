# Schema — Navi
> **Always reflects CURRENT state.** When columns change, update in place.
> History of schema decisions goes in `Decisions.md`.

---

## Google Sheets Structure
| Tab Name | AppSheet Table | Type | Notes |
|----------|---------------|------|-------|
| AppUser | AppUser | System | Pre-seeded with OmmNoMi dev accounts |
| AppViews | AppViews | System | Pre-seeded with 11 base entries |
| AppVariables | AppVariables | System | Pre-seeded with 6 base rows (roles) |
| AppSettings | AppSettings | System | Empty — add project settings as needed |
| AppTimeline | AppTimeline | System | Pre-seeded with 365 date rows for current year |
| AppTriggers | AppTriggers | System | Empty — populated at runtime |
| AppResources | AppResources | System | Pre-seeded with standard delivery guides for in-app documentation |
| | | Operational | *(add project tables below)* |

---

## System Tables
> Full config in `_SOP/OmmNoMi_Standard.md §3`. Only note project-specific additions here.

### AppVariables — Project Roles Added
| ID | Title | Notes |
|----|-------|-------|
| *(base roles pre-seeded — add project-specific roles here)* | | |
| | | |

### AppSettings — Project Settings
| ID | Title | Description | Tags |
|----|-------|-------------|------|
| *(empty in base — add as needed)* | | | |

### AppViews — Project Views Added
| ID | Category | Name | Notes |
|----|----------|------|-------|
| *(base entries pre-seeded — add project-specific nav entries here)* | | | |

---

## Operational Tables

### [TableName]
**Purpose**: 
**Parent Table**: *(if child table)*
**Key Relationship**: *(One-to-Many from X)*

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | — | |
| | | | | | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | `ISBLANK([_THIS])` | No | |
| CreatedOn | DateTime | `NOW()` | `ISBLANK([_THIS])` | No | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | `ISBLANK([_THIS])` | Yes | |
| LastEditOn | DateTime | `NOW()` | `ISBLANK([_THIS])` | Yes | |
| Label | Virtual | | — | — | |

**Slices**:
| Slice Name | Filter |
|-----------|--------|
| | |

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_[TableName]` | Set LastEditOn = NOW() | TRUE |
| | | |

---

## Enum Values Defined
| Table.Column | Values |
|-------------|--------|
| [Table].Status | Draft, Pending Review, Approved, In Progress, Completed, Archived |
| | |

---

## AppSettings Initial Values
| ID | Title | Description | Tags |
|----|-------|-------------|------|
| *(add project-specific settings — starts empty)* | | | |

---

## Client Roles (added to AppVariables)
| ID | Title | Access Level |
|----|-------|-------------|
| *(add project roles beyond the 5 base roles)* | | |
