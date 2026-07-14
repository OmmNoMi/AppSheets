# DA Audit Implementation: BLUJ → ONDT Migration Plan

> **Context**: Detailed breakdown of Columns, Actions, Views, and Slices needed to align ONDT with BLUJ.

## Table: EmployeeAudit

### 1. Data Columns
#### Missing Columns (To be added to ONDT)
| Column Name | Type | Initial Value/Formula |
|---|---|---|
| `Id` | Text | `UNIQUEID()` |
| `EmployeeId` | Ref | `` |
| `Type` | Enum | `` |
| `IsAddressCorrect` | Yes/No | `` |
| `Status` | Text | `` |
| `LastUpdateBy` | Enum | `` |
| `LastUpdateOn` | DateTime | `` |
#### Virtual Columns (Add directly in AppSheet)
| Column Name | Type | AppFormula |
|---|---|---|
| `IsDOTEmployee` | Yes/No | `=IN("DOT", [EmployeeId].[Role])` (or similar depending on your Employee tags) |
| `EmployeeAddress` | Address | `=[EmployeeId].[Address]` |
| `PhoneNumber` | Phone | `=[EmployeeId].[Phone]` |

### 2. Actions
**BLUJ Actions:**
- None

**ONDT Actions:**
- None

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

## Table: DOTAudit

### 1. Data Columns
#### Missing Columns (To be added to ONDT)
| Column Name | Type | Initial Value/Formula |
|---|---|---|
| `ID` | Text | `UNIQUEID()` |
| `Vehicle` | Ref | `` |
| `InsideCabHeader` | Show | `` |
| `Odometer reading` | Number | `` |
| `DashLights` | EnumList | `` |
| `VIN Image` | Text | `` |
| `CADriverDecalYear` | Enum | `` |
| `LicenseStateMatch` | Yes/No | `` |
| `BITInspectionStickerPic` | Image | `` |
| `BITInspectionDate` | Date | `=TODAY()-90` |
| `RegistrationImage` | Image | `` |
| `RegistrationState` | Enum | `` |
| `RegistrationExpiry` | Date | `` |
| `RegistrationLicenseInfo` | Text | `` |
| `IsRegistrationValid` | Yes/No | `` |
| `InsurancePic` | Image | `` |
| `IsInsuranceValid` | Yes/No | `` |
| `LeasePic` | Image | `` |
| `ShortHaulPic` | Image | `` |
| `RentalAgreementValid` | Yes/No | `` |
| `Yes/No` |  |  |
| `FireExtinguisherPic` | Image | `` |
| `IsFireExtinguisherGreen` | Yes/No | `` |
| `FireExtinguisherSecure` | Yes/No | `` |
| `HangingInCab` | Yes/No | `` |
| `FrontHeader` | Show | `` |
| `Front Image` | Image | `` |
| `LicensePlateState` | Enum | `` |
| `FrontLicensePic` | Image | `` |
| `FrontLicenseTagsPresent` | Yes/No | `` |
| `IsRegistrationLicenseMatch` | Yes/No | `` |
| `Wiper Image` | Image | `` |
| `WiperStatus` | Yes/No | `` |
| `IsWindshieldGood` | Yes/No | `` |
| `FrontMarkerLightsWorking` | Yes/No | `` |
| `FrontHeadlightsWorking` | Yes/No | `` |
| `PassengerHeader` | Show | `` |
| `WasherFluidLevel` | Enum | `` |
| `HosesIntact` | Yes/No | `` |
| `EngineOilLevel` | Yes/No | `` |
| `CollantLevel` | Yes/No | `` |
| `AnyLeakage` | Text | `` |
| `BrakeStatus` | Yes/No | `` |
| `BrakeTest` | Yes/No | `` |
| `BatteryCap` | Yes/No | `` |
| `CAPassengerDecalYear` | Enum | `` |
| `PassengerFrontTirePic` | Image | `` |
| `PassengerFrontTireThreadLevel` | Decimal | `` |
| `IsPassengerFrontTireConditionValid` | Yes/No | `` |
| `PassengerMirrorConditionValid` | Yes/No | `` |
| `Passenger Side Image` | Image | `` |
| `PassengerSideFrameImage` | Image | `` |
| `IsPassengerFrameFreeOfDamages` | Yes/No | `` |
| `ArePassengerUBoltsTightAndSecure` | Yes/No | `` |
| `PassengerRearTirePic` | Image | `` |
| `PassengerRearOuterTireThreadLevel` | Decimal | `` |
| `PassengerRearInnerTireThreadLevel` | Decimal | `` |
| `PassengerRearTireConditionValid` | Yes/No | `` |
| `PassengerMarkerLights` | Yes/No | `` |
| `BackPic` | Image | `` |
| `LicensePic` | Image | `` |
| `RearLicenseTagsPresent` | Yes/No | `` |
| `LicenseTagExpiry` | Date | `` |
| `IsLicensePlateReadable` | Yes/No | `` |
| `FrontAndRearLicensePlateMatch` | Yes/No | `` |
| `BackMarkerLights` | Yes/No | `` |
| `BreakAndTurnLightsWorking` | Yes/No | `` |
| `LicensePlateLightWorking` | Yes/No | `` |
| `DriverHeader` | Show | `` |
| `DriverSidePic` | Image | `` |
| `DriverSideFrameImage` | Image | `` |
| `IsDriverFrameFreeOfDamages` | Yes/No | `` |
| `AreDriverUBoltsTightAndSecure` | Yes/No | `` |
| `DriverRearTirePic` | Image | `` |
| `DriverRearOuterTireThreadLevel` | Decimal | `` |
| `DriverRearInnerTireThreadLevel` | Decimal | `` |
| `DriverRearTireConditionValid` | Yes/No | `` |
| `DriverMarkerLights` | Yes/No | `` |
| `DriverTirePic` | Image | `` |
| `DriverTireThreadLevel` | Decimal | `` |
| `IsDriverTireConditionValid` | Yes/No | `` |
| `IsDriverMirrorNonDamaged` | Yes/No | `` |
| `FinalReview` | Show | `` |
| `IsVehicleDriveable` | Yes/No | `` |
| `VehicleStatus` | Enum | `` |
| `VehicleStatusReason` | Text | `` |
| `Notes` | Text | `` |
| `Date` | Date | `TODAY()` |
| `Time` | Time | `TIMENOW()` |
| `Location` | LatLong | `` |
| `InspectionStatus` | Text | `` |
| `LastUpdateBy` | Name | `=Any(Me[UserID])` |
| `ExpectedRegistrationExpiry` | Date | `` |
| `ExpectedLicensePlate` | Text | `` |
| `IsGroundabe` | Yes/No | `` |
| `GroundingReason` | Text | `` |
| `NeedsReviewReasoning` | Text | `` |
| `IsNeedsReview` | Yes/No | `` |
| `Related DOTLatestAuditRecords` | List | `` |

### 2. Actions
**BLUJ Actions:**
- **Action for UpdateTruckStatus**: REF_ACTION IF `true`
- **Action for AddNotesFromDOTAuditToFleet**: ADD_RECORD_TO IF `true`
- **GoToLatestInspections (→""Go to Latest Audits"")**: NAVIGATE_APP IF `true`
- **Action for UpdateAuditDateTime**: REF_ACTION IF `true`

**ONDT Actions:**
- None

### 3. Views
**BLUJ Views:**
- None

**ONDT Views:**
- None

### 4. Slices
**BLUJ Slices:**
- **RecentDOTInspections** (DOTAudit): `=AND([Date]>TODAY()-20,IN([Vehicle].[Location],Any(Me[Location])))`

**ONDT Slices:**
- None

---

## Table: DOTLatestAuditRecord

### 1. Data Columns
#### Missing Columns (To be added to ONDT)
| Column Name | Type | Initial Value/Formula |
|---|---|---|
| `FleetID` | Ref | `UNIQUEID()` |
| `LastInspectionId` | Ref | `` |
| `LastInspectionDate` | DateTime | `TODAY()` |
| `Name` | Name | `` |
| `Location` | Text | `` |
| `Status` | Text | `` |

### 2. Actions
**BLUJ Actions:**
- **UpdateLatestInspectionDateForVehicle**: SET_COLUMN_VALUE IF `true`

**ONDT Actions:**
- None

### 3. Views
**BLUJ Views:**
- None

**ONDT Views:**
- None

### 4. Slices
**BLUJ Slices:**
- **DOTLatestInspections** (DOTLatestAuditRecord): `=NOT(IN([FleetID].[Status],{"Excluded","Returned"}))`

**ONDT Slices:**
- None

---

