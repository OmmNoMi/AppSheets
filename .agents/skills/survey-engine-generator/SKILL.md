---
name: survey-engine-generator
description: Expertise and toolset for instantiating dynamic, multilingual, modular survey applications (powered by AppVariables, Action-Grid sub-module navigation, and standard MultiSelect child tables). Use this skill whenever a user provides a survey questionnaire excel/word doc to build a new AppSheet survey app.
---

# Survey Engine Generator Skill

This skill allows building and deploying **multilingual, modular AppSheet survey applications** from raw client questionnaires with **minimal re-coding effort**.

---

## Key Architectural Principles

1. **Effortless Modular Entry (Action-Grid Navigation)**:
   - Survey enumerators fill basic demographic info on the primary `Survey` form.
   - Upon saving, they enter the `Survey` Detail View featuring an **Inline Action Grid** (Top buttons for `Farm`, `Household`, `WaterATM`, `Livestock`, `Collective`, `Complete`).
   - Enumerators fill only the sub-module forms relevant to that specific respondent, avoiding massive intimidating forms.

2. **Unified Dynamic Metadata Engine (`AppVariables`)**:
   - Question prompts (`Type = Question`) and dropdown choices (`Type = Options`) are stored in `AppVariables`.
   - Dynamic `DisplayName` formula:
     ```excel
     IFS(
       USERSETTINGS("Language") = "Marathi", INDEX(Filter("AppVariables", [ID] = "Q_A01_Respondent"), 1)[Name_mr],
       USERSETTINGS("Language") = "Hindi", INDEX(Filter("AppVariables", [ID] = "Q_A01_Respondent"), 1)[Name_hi],
       TRUE, INDEX(Filter("AppVariables", [ID] = "Q_A01_Respondent"), 1)[Name_en]
     )
     ```

3. **Universal Junction Pattern (`MultiSelect`)**:
   - All multi-select arrays across all modules and levels write to a single `MultiSelect` table:
     - `ID`, `Survey` (Ref to Survey), `Table`, `Column`, `Row` (Parent Row ID), `Value` (Ref to AppVariable), `Decimal` (numeric metric).

---

## Questionnaire Ingestion Script

To convert any new client Questionnaire Excel into `AppVariables` + schema definitions:

```bash
python3 .agents/skills/survey-engine-generator/scripts/ingest_questionnaire.py <Questionnaire.xlsx> --output-dir <OutputDir>
```

---

## AppSheet Configuration Workflow

1. **Google Sheet Setup**:
   - Create tabs: `Survey`, `AppVariables`, `MultiSelect`, plus Level 1 sub-module tabs (`Farm_Info`, `Household`, `Livestock`, etc.).
2. **AppVariables Setup**:
   - Paste the generated CSV from `ingest_questionnaire.py` into the `AppVariables` tab.
3. **AppSheet Action Setup**:
   - Add inline actions on `Survey` view using target formula:
     ```excel
     LINKTOFILTEREDVIEW("Farm_Info_Inline", [Survey] = [_THISROW].[ID])
     ```
   - Group actions into prominent top dashboard display.
