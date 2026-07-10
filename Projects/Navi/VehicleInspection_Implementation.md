# Vehicle Inspection Implementation: BLUJ → ONDT Migration Plan

> **Context**: Detailed breakdown of Columns, Actions, Views, and Slices needed to align ONDT with BLUJ.

## Table: Inspection

### 1. Data Columns
#### Missing Columns (To be added to ONDT)
| Column Name | Type | Initial Value/Formula |
|---|---|---|
| `Text` |  |  |
| `PackagesPicked` | Text | `` |
| `GeoPin` | LatLong | `` |
| `TireThreadGreenNoCrack` | Yes/No | `` |
| `HeadlightWorking` | Yes/No | `` |
| `MarkerLightsWorking` | Yes/No | `` |
| `IsGreenFilePresent` | Yes/No | `` |
| `IsTruckEmpty` | Yes/No | `` |
| `RouteStatus` | Enum | `=IFS( |
| `RouteID` | Text | `` |

#### Legacy Columns (Present in ONDT, missing in BLUJ)
- `Fluids`
- `EngineOil`
- `Transmission`
- `HasDolly`
- `TabRepair`
- `RepairType`
- `RepairDesc`
- `OpenRepairs`

### 2. Actions
**BLUJ Actions:**
- **Action for MarkInspectionCompleteBasedOnWorkId**: REF_ACTION IF `true`

**ONDT Actions:**
- **AddRepairFromInspection**: ADD_RECORD_TO IF `true`

### 3. Views
**BLUJ Views:**
- None

**ONDT Views:**
- None

### 4. Slices
**BLUJ Slices:**
- None

**ONDT Slices:**
- None

---

