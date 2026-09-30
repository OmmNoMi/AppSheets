---
name: survey-engine-generator
description: Expertise and toolset for instantiating dynamic, multilingual, modular survey applications (powered by AppVariables, Action-Grid sub-module navigation, and standard MultiSelect child tables). Use this skill whenever a user provides a survey questionnaire excel/word doc to build a new AppSheet survey app.
---

# Survey Engine Generator Skill

This skill allows building and deploying **multilingual, modular AppSheet survey applications (OmmNoMi Survey)** from raw client questionnaires with **minimal re-coding effort**.

---

## Key Architectural Principles

1. **Effortless Modular Entry (Action-Grid Navigation)**:
   - Survey enumerators fill basic demographic info on the primary `Survey` form.
   - Upon saving, they enter the `Survey` Detail View featuring an **Inline Action Grid** (Top buttons for `Farm`, `Household`, `WaterATM`, `Livestock`, `Collective`, `Complete`).
   - Enumerators fill only the sub-module forms relevant to that specific respondent, avoiding massive intimidating forms.

2. **Unified Dynamic Metadata Engine (`AppVariables`)**:
    - Question prompts (`Q_*` rows) and dropdown choices (`OPT_*` rows) are stored in `AppVariables`.
    - The `Label` virtual column (IsLabel=Yes) on `AppVariables` auto-resolves the user's language:
      ```excel
      =IFS(
        IN(USEREMAIL(),{"user1@ommnomi.in"}),[Title]&" ("&[Title_hi]&")",
        1=1,[Title]&" ("&[Title_mr]&")"
      )
      ```
    - **DisplayName** formula (one-liner, Label does the work):
      ```excel
      =LOOKUP("Q_A_02_00","AppVariables","ID","Label")
      ```
    - **Option columns** use `Ref → AppVariables` with `Valid_If` to restrict dropdown:
      ```excel
      Valid_If: SPLIT(LOOKUP("Q_A_02_00","AppVariables","ID","VariableList")," , ")
      ```
    - **Cascading fields** use `Description` as parent pointer:
      ```excel
      GramPanchyat Initial Value: [Village].[Description]
      Taluka Initial Value: [GramPanchyat].[Description]
      ```
    - Each `OPT_*` row has `Title`, `Title_hi`, `Title_mr` for per-option translation.

3. **Universal Junction Pattern (`MultiSelect`)**:
   - All multi-select arrays across all modules and levels write to a single `MultiSelect` table:
     - `ID`, `Survey` (Ref to Survey), `Table`, `Column`, `Row` (Parent Row ID), `Value` (Ref to AppVariable), `Decimal` (numeric metric).

4. **Single-Table Multi-Matrix Subtable Pattern (Context-Based Auto-Fill)**:
   - For surveys with multiple matrix/table questions (e.g. Labor, Turnover, Capital, Loans, Trajectory):
     - **Single Sheet in Database**: Keep **ONLY 1 single child sheet** (`Survey_Tables`) in Google Sheets with a `Table_Type` discriminator column. This eliminates data fragmentation and avoids joining 5-10 sheets in Looker/Excel reporting.
     - **Question-Specific Slices**: Define individual slices for each question (`Slice_Q6_Labor`, `Slice_Q15_Turnover`), narrowing down the `Columns` array to ONLY the fields relevant to that matrix question.
     - **Native Parent Virtual Columns**: In the parent table, create Virtual Columns with `=REF_ROWS("Slice_Name", "Survey_ID")` and `IsAPartOf = true`.
     - **Context Auto-Fill Formula**: In the child table, auto-fill `Table_Type` based on `CONTEXT("View")`:
       ```excel
       =IFS(
         IN("Labor", CONTEXT("View")), "Q6_Labor",
         IN("Turnover", CONTEXT("View")), "Q15_Turnover",
         IN("Capital", CONTEXT("View")), "Q19_Capital",
         IN("Loan", CONTEXT("View")), "Q20_Loan_Usage",
         IN("Trajectory", CONTEXT("View")), "Q22_Trajectory"
       )
       ```
     - **Dynamic Column Labels & Options**: Use `IFS([Table_Type] = "...", ...)` on `Row_Item` for contextual DisplayName and Valid_If dropdown options.
     - **Result**: When the enumerator clicks `[ + Add ]` on any question inside the parent form, AppSheet opens a clean, tailored sub-form specifically for that question with `Table_Type` locked and pre-filled!


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

---

## Rapid Mass Formula / Display Name Injection (Modern Editor via Redux)

When generating large survey questionnaires (50+ to 200+ columns), enumerator questions must be linked to `AppVariables` via trilingual `DisplayName` formulas:
```excel
LOOKUP("Q_...", "AppVariables", "ID", "Label")
```

Instead of manually editing each column in AppSheet, use the Redux Batch Injector:
1. Export column-to-QuestionID mappings from `ALL_SURVEY_QUESTIONS.csv` into a JSON dictionary `M`.
2. Open DevTools Console (F12) while viewing the target table columns in AppSheet (`#Data.Columns.Survey`).
3. Execute the Redux batch dispatcher:
   - Traverses React Fiber to find the Redux store (`window.appStore`).
   - Dynamically locates `AppData.DataSchemas[schemaIdx].Attributes`.
   - Populates `nameValueDict` for all mapped columns.
   - Dispatches `{ type: 'SET_EDITOR_OPTIONS', nameValueDict, recordHistory: true }`.
   - Dispatches `{ type: 'SHOW_SAVE_BUTTON', value: true }`.
4. Click the blue **SAVE** button in AppSheet to persist all formulas to the cloud in one go.
5. Always run the cleanup script to remove temporary hooks.
