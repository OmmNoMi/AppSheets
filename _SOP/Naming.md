# Naming Conventions — OmmNoMi Standard

## Tables
| Rule | Example |
|------|---------|
| Singular PascalCase | `Employee` not `Employees` |
| Parent-child naming | `Sales` → `SalesItem` |
| System tables (exact names) | `AppUser`, `AppViews`, `AppSettings`, `AppVariables`, `AppTriggers`, `AppTimeline`, `AppResources` |
| Note | System tables use **plural** form except `AppUser`. There is no `AppAccess` table — roles live in `AppVariables`. |
| No spaces, no hyphens | `InventoryItem` not `Inventory Item` |

## Columns
| Column | Purpose | ❌ Never Use |
|--------|---------|-------------|
| `Name` | People, identifiable entities | `FullName`, `PersonName` |
| `Title` | Tasks, documents, objects | `TaskName`, `DocTitle` |
| `Type` | Primary classification | `MainType`, `Classification` |
| `Category` | Secondary subset | `SubType` |
| `Status` | Workflow state | `Stage`, `Phase` |
| `SubStatus` | Granular detail | `SubStage` |
| `Image` | Primary visual | `Photo`, `Picture` |
| `File` | Primary document | `Document`, `Attachment` |
| `Link` | External URL | `URL`, `Website` |
| `Description` | User-facing summary | `Summary`, `Detail` |
| `Notes` | Internal long-form | `Comments`, `InternalNotes` |
| `Mobile` | Phone/WhatsApp | `PhoneNumber`, `WhatsApp`, `Phone` |
| `Email` | Any email type | `WorkEmail`, `PersonalEmail` |
| `Code` | Generic identifier | `StudentCode`, `EmployeeID` |

## Cross-Table Lineage Rule
Column in **Table A** referencing data from **Table B** → prefix with Table B's name.
```
Context: Employee table needs count from AttendanceDaily
✅ AttendanceDailyCount
❌ DailyCount / TotalAttendance / AttendCount
```
Pattern: `[SourceTable][DescriptiveWord]`

## Slices
- PascalCase, clear relation to source table
- Pattern: `[Table][FilterDescription]`
- Examples: `SalesPending`, `EmployeeActive`, `TaskOverdue`
- The `Me` slice on AppUser is always named exactly `Me`

## Views
- Dashboard views: `[Module]_Dash` (e.g., `Employee_Dash`)
- Detail views: named exactly as table (e.g., `Employee_Detail`)
- Form views: `[Table]_Form`

## Actions
| Prefix | Use Case |
|--------|----------|
| `Add_` | Custom add/create |
| `View_` | Navigation to another view |
| `Sync_` | Force recalculation (updates LastEditOn) |
| `Input_` | User input action |
| `InputAll_` | Hidden input for automation |
| `Verified_` / `Approved_` / `Rejected_` | Status transitions |
| `Import_` / `Export_` | Data transfer |
| `Filter_` | Launch filtered view |

## Display Names (Abstraction Layer)
Use AppSheet's `Display Name` property to map generic column names to client-specific labels.
```
Column: Mobile → Display Name: "Primary WhatsApp"
Column: Code → Display Name: "Student ID"
```
This keeps the schema generic and long-lived.
