# UX-004: Dependent Field Auto-Compute with Conditional Override

**Problem**: A field must dynamically pull a value from a dropdown selection, but must be manually editable if specific exceptions are chosen (e.g. "Work From Home").

**Solution**: 
1. **Initial Value**: `[DropdownCol].[Value]` (Do not use App Formula)
2. **Reset on edit?**: `ISNOTBLANK([DropdownCol])` (Forces Initial Value to refresh on dropdown change)
3. **Editable_If**: `OR(ISBLANK([DropdownCol]), IN([Type], {"Exception"}))`
4. **Show_If**: `OR(CONTEXT("ViewType") <> "Form", IN([Type], {"Exception"}))` (Hides the field on forms for non-exceptions to prevent manual tampering, but background math still runs).

**Source**: Orbit | 2026-06-02
