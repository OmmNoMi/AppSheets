# BF-008: Schema Validation Mismatches on Custom Action Steps

**Problem**: Action bots run successfully but silently fail to append rows into child tables.

**Solution**: Strict Type validation. If an `Amount` column is typed as `Number`, but a user types "half" or "1 tablet" in a text input, AppSheet rejects the insert entirely. 

**Fix**: Monitor `Manage > Monitor > Audit History` for type conversion crashes. Change unpredictable input columns to `Text` type for system tolerance.

**Source**: Transcend | 2026-06-13
**Reusable**: Yes — universal debugging step for silent action failures.
