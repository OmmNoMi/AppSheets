# Base Template

This document outlines the architecture for the "Base Template," which is the mandatory starting point for all new OmmNoMi AppSheet projects.

## Google Sheets Architecture

The Base Template uses a structured Google Sheets setup that scales as the project grows.

### 1. Core Table
- **Template Sheet Name**: `Base Template Core`
- **Project Setup**: When starting a new project, this sheet MUST be renamed to `[Project Name] Core`.
- **Purpose**: Holds system-level tables, user settings, log tables, and any foundational schema required for the app to function.

### 2. Main Tables
- **Project Setup**: Create a new spreadsheet/table named `[Project Name] Main`.
- **Purpose**: Stores the primary business data for the specific project (e.g., Customers, Invoices, Work Orders).

### 3. Extended Tables (For Scale)
If the project data grows significantly, separate tables should be created following the same naming convention:
- `[Project Name] Reports`: For read-only reporting tables, aggregation views, or dashboards.
- `[Project Name] Operations`: For secondary operational data.

## Next Steps for New Projects
1. Copy the Base Template App.
2. Rename `Base Template Core` to `[Project Name] Core`.
3. Create `[Project Name] Main`.
4. Connect the new sheets to the copied App.
5. Populate `SystemTables.md` schemas into the Core and Main sheets as required.
