# SP-005: Form Branching & Multi-Row Expansion for flat arrays

**Problem**: Users shouldn't see Medication #2 and #3 if they only have 1 medication, but the database needs all medications in a normalized, related table.

**Solution**: 
1. **Google Form**: Uses branching logic ("Go to section based on answer") to skip Medication 2/3 and route to Submit.
2. **AppSheet Bot**: Runs multiple sequential "Add a new row" tasks. It checks if the columns for Med #2/#3 are populated and explicitly maps the flattened form columns into distinct rows in the `Medication` child table.

**AppSheet Config**: 3 sequential Data Actions in the Bot mapping `[_THISROW].[FormIntake].[Medication Name_65]`, etc.

**Source**: Transcend | 2026-06-13
**Reusable**: Yes — standard pattern for flattening multi-entry forms into relational rows.
