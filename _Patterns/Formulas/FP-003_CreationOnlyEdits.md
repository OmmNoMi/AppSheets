# FP-003: Creation-Only Editability for Pre-Filled Columns

**Problem**: `ISBLANK([_THIS])` fails to restrict edits to "creation only" if the field has an Initial Value (e.g., logged-in user).

**Solution**: Check if the record is brand new by verifying its ID doesn't exist in the table yet.

**AppSheet Config**:
`Editable_If`: `AND(NOT(IN([_THISROW].[ID], TableName[ID])), [Condition])`

**Source**: Orbit | 2026-06-02
