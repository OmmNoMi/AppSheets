# SP-002: Normalize Flat Form Columns to Child Table
> Pattern from: Transcend_IntakeSystem | Status: Design-verified, not yet tested in production

## Problem
Google Forms with repeating field groups output flat columns (e.g., Medication1_Name, Medication1_Dosage, Medication2_Name...). This creates:
- Fixed limit on repetitions (e.g., only 3 medications)
- Verbose AppSheet formulas to work with each group
- Schema that breaks when client needs more entries than form allows

## Solution
App Script reads all repeating column groups during intake processing and creates one child table record per non-empty group.

**Schema**:
- Child table: `[Entity]` (e.g., `ClientMedication`)
- Required columns: `ID`, `ParentID` (Enum Ref → Parent), `SortOrder` (Number), then data columns
- `SortOrder`: 1, 2, 3… preserves form order

**App Script logic**:
```javascript
const medicationGroups = [
  { name: row['Medication Name'], dosage: row['Dosage'], ... },
  { name: row['Medication Name_2'], dosage: row['Dosage_2'], ... },
  { name: row['Medication Name_3'], dosage: row['Dosage_3'], ... }
];
medicationGroups.forEach((med, index) => {
  if (med.name) { // only create record if medication name is filled
    sheet.appendRow([TEXT(UNIQUEID()), clientId, index + 1, med.name, med.dosage, ...]);
  }
});
```

**AppSheet**: Use `[Related ClientMedications]` list dereference. Parent table shows medication count via `COUNT([Related ClientMedications])`.

## When to Use
Any project where a Google Form has repeating field groups (medications, contacts, line items, skills, etc.)

## Source Project
Transcend_IntakeSystem | 2026-05-31
