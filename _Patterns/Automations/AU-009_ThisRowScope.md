# AU-009: The `[_THISROW]` Scope Qualifier

**Problem**: Mapping `[FormIntake].[Medication Name]` directly inside an automation step on the Client table fails to resolve.

**Solution**: AppSheet loses scope of the active row triggering the bot during multi-step actions. You must explicitly prefix the path with `[_THISROW]` (e.g., `[_THISROW].[FormIntake].[Medication Name]`) to cross-reference columns cleanly.

**Source**: Transcend | 2026-06-13
**Reusable**: Yes — mandatory for all multi-step row generation loops.
