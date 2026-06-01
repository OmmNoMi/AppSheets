# Schema — [Client Name] [App Name]
> **Always reflects CURRENT state.** When columns change, update in place.
> History of schema decisions goes in `Decisions.md`.

---

## Google Sheets Structure
| Tab Name | AppSheet Table | Type | Notes |
|----------|---------------|------|-------|
| AppUser | AppUser | System | |
| AppAccess | AppAccess | System | |
| AppView | AppView | System | |
| AppSetting | AppSetting | System | |
| AppVariable | AppVariable | System | |
| AppTrigger | AppTrigger | System | |
| | | Operational | |

---

## System Tables
> Standard columns — see `_Patterns/Schema/SystemTables.md` for full config.
> Only note project-specific deviations here.

**AppUser deviations**: *(none / list if any)*
**AppAccess Modules**: *(list modules for this project)*
**AppAccess Levels**: *(list levels for this project)*

---

## Operational Tables

### [TableName]
**Purpose**: 
**Parent Table**: *(if child table)*
**Key Relationship**: *(One-to-Many from X)*

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| | | | | | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label | Virtual | | — | — | |

**Slices**:
| Slice Name | Filter |
|-----------|--------|
| | |

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_[TableName]` | Set LastEditOn = UTCNOW() | TRUE |
| | | |

---

## Enum Values Defined
| Table.Column | Values |
|-------------|--------|
| [Table].Status | Draft, Pending Review, Approved, In Progress, Completed, Archived |
| | |

---

## AppSetting Initial Values
| ID (Key) | Value | Description |
|---------|-------|-------------|
| CompanyName | | |
| | | |

---

## AppAccess Initial Values
| ID | Module | AccessLevel |
|----|--------|------------|
| System_Admin | System | Admin |
| | | |
