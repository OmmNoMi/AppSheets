# BF-007: AppSheet "Ref" Display vs. Database Raw Value

**Problem**: AppSheet renders Ref columns as the Display Label in the UI (e.g., "06/13/2026 - John Doe"). Developers mistakenly assume they must use complex `CONTAINS` formulas to extract the ID.

**Solution**: AppSheet always stores the **RAW KEY** (e.g., the timestamp or UniqueID) in the backend spreadsheet. Direct dereferencing like `[_THISROW].[FormIntake].[ColumnName]` works natively without lookup formulas. Always trust the raw spreadsheet data, not the AppSheet UI rendering.

**AppSheet Config**: Native dereferencing.

**Source**: Transcend | 2026-06-13
**Reusable**: Yes — core AppSheet conceptual learning.
