# Decisions Log — Navi BLUJ
> **Append-only.** Never delete or edit previous entries.
> This file captures WHY decisions were made — the Schema.md captures WHAT the current state is.

---

## Format
```
### [YYYY-MM-DD] [Short Decision Title]
**Context**: What situation triggered this decision
**Decision**: What was decided
**Reason**: Why this approach was chosen over alternatives
**Impact**: What tables/columns/actions affected
**Pattern**: [PatternID if added to _Patterns/] or "Not reusable"
```

---

## Log

### [2026-07-11] Project Initialized — Navi BLUJ
**Context**: NAVI-BLUJ-5555387 AppSheet documentation exported and imported into OmmNoMi knowledge base
**Decision**: Created separate project folder `Projects/NaviBLUJ/` (distinct from `Projects/Navi/` which is ONDT)
**Reason**: BLUJ is a long-separated branch of Navi ONDT that has evolved independently. It has 97 more tables, a dual-location architecture (Fremont + Tracy), and a completely different spreadsheet structure using consolidated named GSheets instead of per-table files. Treating it as a separate project prevents cross-contamination of knowledge.
**Impact**: New project folder with all standard template files + `_AppDoc/BLUJ_schema.md` from `parse_appdoc.py --compact`
**Pattern**: Not reusable

---

### [2026-07-11] Dual-Location Architecture Noted
**Context**: During initial schema review, BLUJ was observed to have location-specific table variants
**Decision**: Documented Fremont vs Tracy split across Roster, Planning, WHC, Efficiency table families
**Reason**: Critical architectural distinction. Any formula or action referencing `Roster` in ONDT must use `RosterFremont` or `RosterTracy` in BLUJ (or conditionally both)
**Impact**: All scheduling, WHC, and roster work must account for dual-location routing
**Pattern**: Not reusable (BLUJ-specific)

---
*(Append new entries below this line)*
