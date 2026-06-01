# UX & Format Rules — OmmNoMi Standard

## Status Format Rules
| Status Value | Text Color | Icon | Format |
|-------------|-----------|------|--------|
| `Urgent` | Red | ⚠️ | Bold |
| `Overdue` | Red | 🔴 | Bold |
| `Completed` | Green | ✅ | Normal |
| `Approved` | Green | ✅ | Normal |
| `In Progress` | Blue | ⏳ | Normal |
| `Pending Review` | Orange | 🔔 | Normal |
| `Draft` | Gray | ✏️ | Italic |
| `Rejected` | Red | ❌ | Strikethrough |
| `Archived` | Gray | 📦 | Italic |

---

## View Type Guide
| View Type | Best For | Platform |
|-----------|----------|----------|
| **Deck** | Mobile lists — image + primary label + secondary context | Mobile |
| **Table** | Bulk data, reporting, dashboards | Desktop |
| **Detail** (Side-by-side) | Record inspection on tablet/desktop | Tablet/Desktop |
| **Gallery** | Visual catalogs, employee directories, image-heavy data | Any |
| **Dashboard** | Module overview with combined stats + navigation | Any |
| **Form** | Data entry | Any |
| **Map** | Location-based data | Mobile |
| **Chart** | Metrics, KPIs, trends | Desktop |

---

## Module Dashboard Pattern
**Name**: `[Module]_Dash` (e.g., `Employee_Dash`, `Sales_Dash`)

**Composition**:
- Top: Detail View (summary card with key stats)
- Bottom: Gallery or Card View (quick action list)

**When to use**: Any module requiring both functional navigation AND real-time stats/status.

---

## UX Control Formulas
```
// Hide system columns on form view
// Show_If:
CONTEXT("View") <> "Form"

// Show button only on specific view
CONTEXT("View") = "Employee_Detail"

// Conditional column visibility based on Status
[Status] = "In Progress"

// Hide empty sections
NOT(ISBLANK([Notes]))
```

---

## Display Name (Abstraction Layer)
Use AppSheet's **Display Name** property — not column renaming — to show client-specific labels.

| Column | Example Display Name |
|--------|---------------------|
| `Mobile` | "Primary WhatsApp" |
| `Code` | "Student ID" |
| `Name` | "Full Name" |
| `Type` | "Contract Type" |

This keeps the database schema generic while the UI speaks the client's language.

---

## Slice Naming for UI
- Each view should point to a **Slice** rather than the full table where possible
- Slices reduce data load and prevent accidental edits to filtered-out records
- Pattern: `[Table][FilterState]` → e.g., `SalesPending`, `EmployeeActive`
- The `Me` slice always shows only the current user's AppUser record
