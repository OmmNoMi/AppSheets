# Final Implementation Plan: Modular Dynamic Survey Analysis Engine (Strict $\le$ 300 Lines Per File)

## Goal Description
Build an enterprise-grade, fully **dynamic survey analysis system** organized into clean, focused Python modules where **NO SINGLE FILE exceeds 300 lines of code**. 

This modular architecture ensures:
1. **Zero Quality Compromise**: Full docstrings, type annotations, robust error handling, and complete data validation.
2. **Universal Multi-Location File Resolution**: Seamlessly loads survey files from explicit CLI paths, custom directories (`--data-dir`), `Downloads/`, or the project `data/` directory, while auto-detecting the newest versions and stripping browser duplicate suffixes (`(1)`, `(2)`).
3. **Dynamic Schema & Question Evolution**: Dynamically reads question titles, option definitions, and enum mappings from `AppVariables.csv` so the analysis adapts automatically if questions change in the survey.
4. **Multi-District Architecture & Dual Export (Excel + CSV)**: Automatically creates `reports/district_analysis/<District>/` containing:
   - `<District>_Survey_Analysis_Master.xlsx` with the 4 descriptive tabs (`Finance & Capital`, `Social Category Matrix`, `Agency & Sourcing`, `Demographics & Indicators`).
   - `csv/` folder with individual `.csv` files for each tab so clients can easily consume either Excel or raw CSVs.
5. **Automated Verification & Unit Testing**: Includes automated tests verifying file limits, formula syntax, and data integrity.

---

## Authoritative Project & Folder Structure

```
projects/CmF_SHG_Women_Entrepreneurs/
│
├── data/                                                <-- [CLEAN MASTER DATA]
│   ├── WCH - Survey.csv                                 # Master responses (clean name, 63.9 KB)
│   ├── WCH - SubTable.csv                               # Demographic sub-tables (clean name, 1.95 MB)
│   ├── WCH - SubSubTable.csv                            # Capital & loan sub-tables (clean name, 7.71 MB)
│   └── WCH - AppVariables.csv                           # Schema & options (clean name, 216.2 KB)
│
├── reports/                                             <-- [ORGANIZED DELIVERABLES]
│   ├── district_analysis/                               <-- [MULTI-DISTRICT ARCHITECTURE]
│   │   ├── Dausa/                                       # Dausa District Analysis
│   │   │   ├── excel/                                   # Dedicated Excel Subfolder
│   │   │   │   └── Dausa_Survey_Analysis_Master.xlsx    # Master 4-Sheet Excel Workbook
│   │   │   ├── html/                                    # Dedicated HTML Subfolder
│   │   │   │   └── Dausa_Survey_Analysis_Report.html    # Executive Dynamic HTML Report (OmmNoMi SOP)
│   │   │   └── csv/                                     # Dedicated CSV Subfolder
│   │   │       ├── Finance_and_Capital.csv
│   │   │       ├── Social_Category_Matrix.csv
│   │   │       ├── Agency_and_Sourcing.csv
│   │   │       └── Demographics_and_Indicators.csv
│   │   │
│   │   ├── Baran/                                       # (Ready for next district)
│   │   └── Jodhpur/                                     # (Ready for next district)
│   │
│   └── Individual_Respondent_Dossiers/                  <-- [DEDICATED DOSSIERS SUBFOLDER]
│       ├── 3_SHG_Entrepreneurs_Survey_Data_Master.xlsx
│       ├── 6_SHG_Entrepreneurs_Survey_Data_Master.xlsx
│       ├── KAT-3_Pushpa_Bdhurv_Questionnaire.pdf (.html, .json)
│       ├── KAT-7_Urmila_Devi_Questionnaire.pdf (.html, .json)
│       ├── KUM-6_Sunita_Sharma_Questionnaire.pdf (.html, .json)
│       ├── KUM-7_Geeta_Devi_Questionnaire.pdf (.html, .json)
│       ├── KUM-9_Monika_Questionnaire.pdf (.html, .json)
│       └── VRI-5_Hina_Bairwa_Questionnaire.pdf (.html, .json)
│
└── scripts/                                             <-- [MODULAR ENGINE CODEBASE]
    ├── generate_survey_analysis_dynamic.py              # CLI Entrypoint & Orchestrator (~80 lines)
    ├── build_complete_dossiers.py                       # Questionnaire compiler
    │
    └── analysis_engine/                                 # Modular Engine Package (ALL files <= 300 lines)
        ├── __init__.py                                  # Package exports (~15 lines)
        ├── file_resolver.py                             # Multi-location loader & suffix cleaner (~90 lines)
        ├── schema_loader.py                             # AppVariables dynamic question reader (~120 lines)
        ├── excel_styler.py                              # Styling, palette & table block renderer (~110 lines)
        ├── finance_builder.py                           # Finance & Capital sheet generator (~180 lines)
        ├── matrix_builder.py                            # Social Matrix & Agency/Sourcing generator (~150 lines)
        ├── indicators_builder.py                        # Demographics & Indicators (T1.0-T28.0) (~220 lines)
        ├── html_report_builder.py                       # NEW: Executive Dynamic HTML Report Builder (~240 lines)
        └── test_engine.py                               # Automated validation & line count test (~100 lines)
```

---

## Modular Line Budget Breakdown (Strict $\le$ 300 Lines Per File)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   MODULAR FILE ARCHITECTURE & STRICT LINE BUDGETS                │
├───────────────────────────────────┬───────────────┬──────────────┬───────────────┤
│ FILE / MODULE                     │ PURPOSE       │ EST. LINES   │ HARD LIMIT    │
├───────────────────────────────────┼───────────────┼──────────────┼───────────────┤
│ generate_survey_analysis_dynamic  │ CLI runner    │ ~80 lines    │ <= 300 lines  │
│ analysis_engine/file_resolver     │ File discovery│ ~90 lines    │ <= 300 lines  │
│ analysis_engine/schema_loader     │ Schema parser │ ~120 lines   │ <= 300 lines  │
│ analysis_engine/excel_styler      │ Layout & style│ ~110 lines   │ <= 300 lines  │
│ analysis_engine/finance_builder   │ Finance sheet │ ~180 lines   │ <= 300 lines  │
│ analysis_engine/matrix_builder    │ Matrix sheets │ ~150 lines   │ <= 300 lines  │
│ analysis_engine/indicators_builder│ Tables 1 - 28 │ ~220 lines   │ <= 300 lines  │
│ analysis_engine/html_report_builder│ HTML Report  │ ~240 lines   │ <= 300 lines  │
│ analysis_engine/test_engine       │ Test suite    │ ~100 lines   │ <= 300 lines  │
├───────────────────────────────────┼───────────────┼──────────────┼───────────────┤
│ TOTAL SYSTEM                      │ Fully Modular │ ~1,290 lines │ ZERO >300     │
└───────────────────────────────────┴───────────────┴──────────────┴───────────────┘
```

---

## Detailed Module Responsibilities

### 1. `file_resolver.py` (~90 lines)
- Implements `resolve_all_files(cli_args)`:
  - Supports `--survey`, `--subtable`, `--subsubtable`, `--appvars` explicit paths.
  - Supports `--data-dir <path>`.
  - Fallback searches: `projects/CmF_SHG_Women_Entrepreneurs/data/` $\to$ `C:/Users/hardi/Downloads/` $\to$ current directory `.`.
  - Auto-selects the newest file if multiple exist and strips browser suffixes like `(1)`, `(2)`.
  - Auto-syncs latest files to the project `data/` folder.

### 2. `schema_loader.py` (~120 lines)
- Implements dynamic reading of `AppVariables.csv`:
  - `get_question_metadata(column_name)`: Returns question title and list of `(option_id, option_title)`.
  - `get_business_activities()`: Derives the 29 enterprise activities grouped by `Trading`, `Service`, `Production`.
  - `get_capital_sources()`: Derives capital source codes and human-readable names.
  - `get_loan_usages()`: Derives loan usage purpose options.
  - Automatically handles income bucket overflow normalization (`INC_440K-480K`, `INC_18K_20K`, etc.).

### 3. `excel_styler.py` (~110 lines)
- Defines brand styling, typography, and fills:
  - Header fill (`#4285F4`), Subtotal fill (`#F1F3F4`), Grand Total fill (`#E8F0FE`).
  - Formats: `FMT_CURRENCY = '"Rs " #,##0'`, `FMT_PCT = '0.0%'`, `FMT_INT = '#,##0'`.
- Implements `render_table_block(ws, start_row, tbl_id, title, items, is_multiselect=False)`:
  - Standard 4-column layout with dynamic formula totals and percentages.

### 4. `finance_builder.py` (~180 lines)
- Builds the **`Finance & Capital`** sheet:
  - **Part A**: 29 Enterprise Activities $\times$ 14 Capital Sources + Column U (Current Year Performance Observations).
  - Dynamically calculates sector subtotals (`Trading`, `Service`, `Production`) and overall Grand Total with dynamic formula strings.
  - **Part B**: Cross-tabulation of 11 Loan Usage Purposes across the 14 Capital Sources with dynamic row and column sums.

### 5. `matrix_builder.py` (~150 lines)
- Builds:
  - **`Social Category Matrix`**: Cross-tabulation of 29 activities against `SC`, `ST`, `OBC`, `General` with sector subtotals and grand totals.
  - **`Agency & Sourcing`**:
    - Table 16: Family & Husband Support.
    - Table 17: Raw Material Sourcing Independence & Negotiation Comfort.

### 6. `indicators_builder.py` (~220 lines)
- Builds the **`Demographics & Indicators`** sheet:
  - Traverses the dynamic registry for Tables 1.0 to 28.0.
  - Dynamically computes single-select and multi-select distributions, member counts (from `SubTable`), and enterprise tenure averages (Table 28.0).

### 7. `generate_survey_analysis_dynamic.py` (~80 lines)
- Command-line interface with `argparse`.
- Coordinates `file_resolver` $\to$ `schema_loader` $\to$ builders $\to$ saves final workbook to `reports/Dausa_Survey_Analysis_Master.xlsx`.

---

## Verification Plan

### Automated Test Suite (`test_engine.py`)
Run automated validation directly:
```powershell
python projects/CmF_SHG_Women_Entrepreneurs/scripts/analysis_engine/test_engine.py
```

Tests verified:
1. **Strict Line Count Audit**: Confirms every `.py` file in `scripts/` and `analysis_engine/` has $\le 300$ lines.
2. **File Discovery Verification**: Confirms file resolver correctly finds and syncs files from any directory.
3. **AppVariables Schema Verification**: Validates that all questions, options, and activities are dynamically loaded.
4. **Workbook Generation & Quality Audit**: Generates the master workbook and verifies:
   - All 4 sheets exist with exact descriptive names.
   - Zero openpyxl warnings (`warnings.filterwarnings('error')`).
   - Zero formula syntax errors (`#REF!`, `#VALUE!`, `#NAME?`, `#DIV/0!`).
   - Cohort totals accurately reflect the 53 respondents and 55 enterprise activities.
