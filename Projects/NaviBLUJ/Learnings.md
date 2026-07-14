# Learnings — Navi BLUJ
> Session-specific discoveries and reusable solutions found while working on BLUJ.
> Promoted patterns get marked with [Promoted → PatternID].

---

## Format
```
### [YYYY-MM-DD] [Learning Title]
**Problem**: What challenge was encountered
**Solution**: What worked
**Formula / Pattern**: (if applicable)
**Promoted**: Yes → P-XXX / No
```

---

## Log

### [2026-07-11] BLUJ uses consolidated GSheet architecture
**Problem**: Expected per-table .gsheet files (like ONDT), but tables come from consolidated named sheets
**Solution**: BLUJ uses centralized named files: `NaviOPS`, `NaviFleet`, `NaviHR`, `NaviMain`, `NaviPerformance`, `NaviReports`, `NaviClaims`, `RelayTripManagement`, `naviI9Verification` — plus legacy per-table files for older tables (`Candidate`, `Employee`, `Fleet`, `Incident`, etc.)
**Formula / Pattern**: When looking up a table's source, check `ProjectInfo.md → Spreadsheet Architecture` section
**Promoted**: No

### [2026-07-11] BLUJ has 0 Bots detected by parser
**Problem**: `parse_appdoc.py` found 0 bots for BLUJ despite having 810 actions
**Solution**: BLUJ may use Workflow Rules pattern or the bot section is structured differently in the HTML. Doc shows 0 Workflow Rules too — automations may be handled entirely via actions and AppScript triggers rather than native AppSheet bots
**Formula / Pattern**: Check Behavior → Automations section in the original HTML if bot-level logic is needed
**Promoted**: No

---
*(Append new entries below this line)*
