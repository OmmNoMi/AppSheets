# DA Audit Implementation Plan: BLUJ → ONDT

> **Context**: The entire DA Audit module present in Navi BLUJ is **completely missing** from Navi ONDT. This document serves as a comprehensive guide for implementing the `EmployeeAudit`, `DOTAudit`, and `DOTLatestAuditRecord` infrastructure into the ONDT schema from scratch.

---

## 1. Executive Summary

Navi BLUJ uses a robust audit system consisting of three distinct tables to track compliance for both employees and vehicles (Fleet). Navi ONDT currently has zero infrastructure for this. 

To reach parity with BLUJ, you must create three new tables, configure their relationships, and recreate the associated views and actions. 

---

## 2. New Table: `EmployeeAudit`

This table tracks audits related to employee compliance (e.g., verifying address, contact info, DOT status).

### Schema (10 Columns)
Create a new sheet named `EmployeeAudit` in the ONDT database with the following columns:

| Column Name | AppSheet Type | Initial Value |
|---|---|---|
| `Id` | **Text** | `UNIQUEID()` |
| `EmployeeId` | **Ref** (To `Employee`) | |
| `Type` | **Enum** | |
| `IsAddressCorrect` | **Yes/No** | |
| `Status` | **Text** | |
| `LastUpdateBy` | **Enum** (Or `Ref` to Users) | |
| `LastUpdateOn` | **DateTime** | |
| `IsDOTEmployee` | **Yes/No** | |
| `EmployeeAddress` | **Address** | |
| `PhoneNumber` | **Phone** | |

---

## 3. New Table: `DOTAudit`

This is a massive table (100 columns) used for comprehensive vehicle/fleet inspections. It uses `Show` columns to split the audit into logical sections (Inside Cab, Front, Passenger, Driver, and Final Review).

### Schema Groupings
Create a new sheet named `DOTAudit`. Below are the critical columns categorized by their UI sections. 
*(Note: Some columns like `Show` columns must be added as Virtual Columns in AppSheet rather than physical sheet columns)*

**System & References**
- `ID` (Text, Initial: `UNIQUEID()`)
- `Vehicle` (Ref to `Fleet`)
- `Date` (Date, Initial: `TODAY()`)
- `Time` (Time, Initial: `TIMENOW()`)
- `Location` (LatLong)
- `LastUpdateBy` (Name, Initial: `=Any(Me[UserID])`)
- `InspectionStatus` (Text)

**Inside Cab (`InsideCabHeader` - Show)**
- `Odometer reading` (Number)
- `DashLights` (EnumList)
- `VIN Image` (Text)
- `BITInspectionStickerPic` (Image)
- `BITInspectionDate` (Date, Initial: `=TODAY()-90`)
- `RegistrationImage` (Image)
- `RegistrationState` (Enum)
- `RegistrationExpiry` (Date)
- `IsRegistrationValid` (Yes/No)
- `InsurancePic` (Image)
- `IsInsuranceValid` (Yes/No)
- `LeasePic`, `ShortHaulPic` (Image)
- `RentalAgreementValid` (Yes/No)
- `FireExtinguisherPic` (Image)
- `IsFireExtinguisherGreen`, `FireExtinguisherSecure`, `HangingInCab` (Yes/No)

**Front of Vehicle (`FrontHeader` - Show)**
- `Front Image` (Image)
- `LicensePlateState` (Enum)
- `FrontLicensePic` (Image)
- `FrontLicenseTagsPresent`, `IsRegistrationLicenseMatch` (Yes/No)
- `Wiper Image` (Image), `WiperStatus`, `IsWindshieldGood` (Yes/No)
- `FrontMarkerLightsWorking`, `FrontHeadlightsWorking` (Yes/No)

**Engine & Fluids**
- `WasherFluidLevel` (Enum)
- `HosesIntact`, `EngineOilLevel`, `CollantLevel` (Yes/No)
- `AnyLeakage` (Text)
- `BrakeStatus`, `BrakeTest`, `BatteryCap` (Yes/No)

**Passenger Side (`PassengerHeader` - Show)**
- `PassengerFrontTirePic`, `Passenger Side Image`, `PassengerSideFrameImage`, `PassengerRearTirePic` (Image)
- `PassengerFrontTireThreadLevel`, `PassengerRearOuterTireThreadLevel`, `PassengerRearInnerTireThreadLevel` (Decimal)
- `IsPassengerFrontTireConditionValid`, `PassengerMirrorConditionValid`, `IsPassengerFrameFreeOfDamages`, `ArePassengerUBoltsTightAndSecure`, `PassengerRearTireConditionValid`, `PassengerMarkerLights` (Yes/No)

**Back of Vehicle**
- `BackPic`, `LicensePic` (Image)
- `RearLicenseTagsPresent`, `IsLicensePlateReadable`, `FrontAndRearLicensePlateMatch` (Yes/No)
- `LicenseTagExpiry` (Date)
- `BackMarkerLights`, `BreakAndTurnLightsWorking`, `LicensePlateLightWorking` (Yes/No)

**Driver Side (`DriverHeader` - Show)**
- `DriverSidePic`, `DriverSideFrameImage`, `DriverRearTirePic`, `DriverTirePic` (Image)
- `DriverRearOuterTireThreadLevel`, `DriverRearInnerTireThreadLevel`, `DriverTireThreadLevel` (Decimal)
- `IsDriverFrameFreeOfDamages`, `AreDriverUBoltsTightAndSecure`, `DriverRearTireConditionValid`, `DriverMarkerLights`, `IsDriverTireConditionValid`, `IsDriverMirrorNonDamaged` (Yes/No)

**Final Review (`FinalReview` - Show)**
- `IsVehicleDriveable` (Yes/No)
- `VehicleStatus` (Enum)
- `VehicleStatusReason`, `Notes` (Text)
- `IsGroundabe`, `IsNeedsReview` (Yes/No)
- `GroundingReason`, `NeedsReviewReasoning` (Text)

---

## 4. New Table: `DOTLatestAuditRecord`

This table functions as a rollup/summary table to track the most recent audit for every vehicle in the fleet, allowing for quick dashboarding without querying the massive `DOTAudit` table.

### Schema (6 Columns)
Create a new sheet named `DOTLatestAuditRecord`:

| Column Name | AppSheet Type | Initial Value |
|---|---|---|
| `FleetID` | **Ref** (To `Fleet`) | `UNIQUEID()` |
| `LastInspectionId` | **Ref** (To `DOTAudit`) | |
| `LastInspectionDate` | **DateTime** | `TODAY()` |
| `Name` | **Name** | |
| `Location` | **Text** | |
| `Status` | **Text** | |

---

## 5. Required Automations & Actions

To ensure the module functions correctly, the following backend logic from BLUJ must be recreated in ONDT:

1. **Bots / Actions**:
   - `AddFleetToDOTLatestAudit`: Automatically provisions a row in `DOTLatestAuditRecord` whenever a new vehicle is added to `Fleet`.
   - `UpdateAuditDateTime`: Updates the `DOTLatestAuditRecord` whenever a new `DOTAudit` is completed for that specific vehicle.
   - `AddNotesFromDOTAuditToFleet`: Syncs grounding reasons or critical notes back to the parent `Fleet` record if the vehicle fails the audit.

2. **Views**:
   - `DOTAudit_Form`: Requires careful ordering using the `Show` columns created above.
   - `AuditView` (Dashboard): Combine the `DOTLatestAuditRecord` summary table with the `EmployeeAudit` table for an administrative overview.
