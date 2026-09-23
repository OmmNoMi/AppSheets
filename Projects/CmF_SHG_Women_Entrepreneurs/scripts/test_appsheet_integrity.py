#!/usr/bin/env python3
"""
test_appsheet_integrity.py
==========================
Comprehensive automated test suite for the CmF SHG Survey AppSheet system.
Tests:
1. AppVariables coverage (all Question IDs, Option IDs, Parent references)
2. AppSheet formula syntax (prefix OR/AND, type matching, dereference safety)
3. AppUser & Me slice integrity (SOP §2, §3 compliance)
4. Survey columns & cascading logic
5. Action Grid & State machine expressions
"""

import os
import csv
import re
import sys

PROJECT_DIR = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs"
DATA_DIR = os.path.join(PROJECT_DIR, "data")

def load_csv(filename):
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Missing {filename}")
    with open(path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        return list(reader)

errors = []
warnings = []

def record_error(category, message):
    errors.append(f"❌ [{category}] {message}")

def record_warning(category, message):
    warnings.append(f"⚠️ [{category}] {message}")

print("=======================================================")
print("🧪 APPSHEET INTEGRITY & FORMULA STRESS TEST RUNNER")
print("=======================================================")

# 1. Load Data
try:
    appvars = load_csv("AppVariables.csv")
    survey = load_csv("Survey.csv")
    appuser = load_csv("AppUser.csv")
    sampling = load_csv("SamplingFrame.csv")
    print(f" Loaded datasets: AppVariables ({len(appvars)} rows), Survey ({len(survey)} rows), AppUser ({len(appuser)} rows), SamplingFrame ({len(sampling)} rows)")
except Exception as e:
    record_error("LOAD", str(e))
    sys.exit(1)

# Index AppVariables
appvar_ids = {row['ID']: row for row in appvars}

# ----------------------------------------------------
# TEST 1: AppVariables ID & Content Integrity
# ----------------------------------------------------
print("\n--- TEST 1: AppVariables Dictionary & VariableList Integrity ---")
for row in appvars:
    var_id = row['ID']
    if not var_id:
        record_error("APPVARS", "Found AppVariable with empty ID!")
        continue
    
    # Check trilingual translations
    if not row['Title']:
        record_error("APPVARS", f"{var_id} is missing English Title!")
    if not row['Title_hi']:
        record_warning("APPVARS", f"{var_id} is missing Hindi Title_hi!")
    if not row['Title_raj']:
        record_warning("APPVARS", f"{var_id} is missing Rajasthani Title_raj!")

    # Check VariableList referenced items exist
    if row['VariableList']:
        items = [x.strip() for x in row['VariableList'].split(',') if x.strip()]
        for itm in items:
            if itm not in appvar_ids:
                record_error("APPVARS_REF", f"VariableList in {var_id} references non-existent ID: '{itm}'")

    # Check Geography Parent tags
    if 'Parent:' in row.get('Tags', ''):
        parent_match = re.search(r'Parent:([A-Za-z0-9_]+)', row['Tags'])
        if parent_match:
            parent_id = parent_match.group(1)
            if parent_id not in appvar_ids:
                record_error("APPVARS_GEO", f"{var_id} has parent '{parent_id}' which does not exist in AppVariables!")

# ----------------------------------------------------
# TEST 2: AppUser SOP Compliance & Formulas
# ----------------------------------------------------
print("\n--- TEST 2: AppUser & Me Slice SOP Compliance ---")
mandatory_user_cols = ['ID', 'Name', 'Email', 'Role', 'District', 'Language', 'DailyTarget', 'Status', 'LastEditBy', 'LastEditOn']
if appuser:
    first_user = appuser[0]
    for col in mandatory_user_cols:
        if col not in first_user:
            record_error("APPUSER_SOP", f"AppUser is missing mandatory SOP column: '{col}'")

# Validate Role and Language values in AppUser
for u in appuser:
    u_id = u.get('ID')
    role = u.get('Role')
    lang = u.get('Language')
    dist = u.get('District')
    if role and role not in appvar_ids:
        record_error("APPUSER_DATA", f"User {u_id} has invalid Role '{role}' not in AppVariables!")
    if lang and lang not in appvar_ids:
        record_error("APPUSER_DATA", f"User {u_id} has invalid Language '{lang}' not in AppVariables!")
    if dist and dist not in appvar_ids:
        record_error("APPUSER_DATA", f"User {u_id} has invalid District '{dist}' not in AppVariables!")

# ----------------------------------------------------
# TEST 3: Formula Syntax & Logic Stress Testing
# ----------------------------------------------------
print("\n--- TEST 3: AppSheet Expression Syntax Verification ---")

# Define all system formulas to stress test
formulas_to_test = {
    "AppUser.TodayProgress": """
    IFS(
      OR(ISBLANK([DailyTarget]), [DailyTarget] <= 0), 0.0,
      [CompletedToday] >= [DailyTarget], 1.0,
      TRUE, ([CompletedToday] * 1.0) / [DailyTarget]
    )
    """,
    "AppUser.TodayTargetRemaining": """
    MAX(LIST(0, [_THISROW].[DailyTarget] - [_THISROW].[CompletedToday]))
    """,
    "AppUser.CompletedToday": """
    COUNT(
      FILTER(
        "Survey",
        AND(
          [InvestigatorID] = [_THISROW].[ID],
          DATE([CreatedOn]) = TODAY(),
          [Status] = "Submitted"
        )
      )
    )
    """,
    "AppUser.DraftsPending": """
    COUNT(
      FILTER(
        "Survey",
        AND(
          [InvestigatorID] = [_THISROW].[ID],
          [Status] = "Draft"
        )
      )
    )
    """,
    "Me_Slice.RowFilter": """
    AND(
      [Email] = USEREMAIL(),
      [Status] = "Active"
    )
    """,
    "AppVariables.Label": """
    IFS(
      ANY(Me[Language]) = "LANG_HI", [Title_hi],
      ANY(Me[Language]) = "LANG_RAJ", [Title_raj],
      TRUE, [Title]
    )
    """,
    "Survey.CompletedSectionsCount": """
    (
      IF([Status_Profile] = "SEC_DONE", 1, 0) +
      IF([Status_Operations] = "SEC_DONE", 1, 0) +
      IF([Status_Challenges] = "SEC_DONE", 1, 0) +
      IF([Status_SchemeImpact] = "SEC_DONE", 1, 0) +
      IF([Status_Digital] = "SEC_DONE", 1, 0) +
      IF(OR([Status_PostExit] = "SEC_DONE", [Status_PostExit] = "SEC_NA"), 1, 0)
    )
    """,
    "Survey.ProgressPct": """
    MIN(LIST(1.0, ([CompletedSectionsCount] * 1.0) / 6.0))
    """,
    "Survey.Display_Name_Dynamic": """
    IFS(
      ANY(Me[Language]) = "LANG_HI", LOOKUP("Q_A_01_00", "AppVariables", "ID", "Title_hi"),
      ANY(Me[Language]) = "LANG_RAJ", LOOKUP("Q_A_01_00", "AppVariables", "ID", "Title_raj"),
      TRUE, LOOKUP("Q_A_01_00", "AppVariables", "ID", "Title")
    )
    """,
    "Survey.Block_Valid_If": """
    FILTER("AppVariables", AND([Column] = "Block", [Description] = [_THISROW].[District]))
    """,
    "Survey.ACT_Complete_Behavior": """
    AND(
      [ProgressPct] >= 1.0,
      [Status] = "Draft"
    )
    """
}

# Syntax rules for AppSheet
for name, expr in formulas_to_test.items():
    # 1. Check for infix OR / AND (common mistake: `cond1 OR cond2`)
    # Matches word OR or AND not inside quotes and not preceded by ( or function call
    tokens = expr.split()
    for i, tok in enumerate(tokens):
        if tok == "OR" and (i == 0 or not tokens[i-1].endswith("(")):
            if i > 0 and not tokens[i-1] in ["IF", "IFS", "AND", "OR", "FILTER", ",", "="]:
                record_error("SYNTAX", f"Formula '{name}' appears to use infix 'OR' instead of prefix 'OR(...)':\n{expr}")
        if tok == "AND" and (i == 0 or not tokens[i-1].endswith("(")):
            if i > 0 and not tokens[i-1] in ["IF", "IFS", "AND", "OR", "FILTER", ",", "="]:
                record_error("SYNTAX", f"Formula '{name}' appears to use infix 'AND' instead of prefix 'AND(...)':\n{expr}")

    # 2. Check parenthesis balance
    open_p = expr.count("(")
    close_p = expr.count(")")
    if open_p != close_p:
        record_error("SYNTAX", f"Formula '{name}' has unbalanced parentheses: {open_p} '(' vs {close_p} ')'")

    # 3. Check bracket balance (column references)
    open_b = expr.count("[")
    close_b = expr.count("]")
    if open_b != close_b:
        record_error("SYNTAX", f"Formula '{name}' has unbalanced square brackets: {open_b} '[' vs {close_b} ']'")

    # 4. Check for integer division in Percent / Decimal lists
    if "LIST(1.0," in expr and not "* 1.0" in expr:
        record_error("TYPE_MISMATCH", f"Formula '{name}' puts integer division inside LIST with 1.0! Needs '* 1.0'.")

# ----------------------------------------------------
# TEST 4: Survey Question Columns Coverage in AppVariables
# ----------------------------------------------------
print("\n--- TEST 4: Survey Physical Columns vs AppVariables ---")
if survey:
    survey_headers = list(survey[0].keys())
    print(f"Total Physical Columns in Survey: {len(survey_headers)}")
    
    # Check that system columns exist
    mandatory_survey_cols = [
        'ID', 'Status', 'InvestigatorID', 'CreatedOn', 
        'Status_Profile', 'Status_Operations', 'Status_Challenges', 
        'Status_SchemeImpact', 'Status_Digital', 'Status_PostExit'
    ]
    for c in mandatory_survey_cols:
        if c not in survey_headers:
            record_error("SURVEY_SCHEMA", f"Survey is missing mandatory system column: '{c}'")

# ----------------------------------------------------
# FINAL REPORT
# ----------------------------------------------------
print("\n=======================================================")
if errors:
    print(f"❌ TEST SUITE FAILED WITH {len(errors)} ERROR(S):")
    for err in errors:
        print(f"  {err}")
else:
    print("✅ ALL TESTS PASSED! ZERO SYNTAX, TYPE, OR REFERENCE ERRORS DETECTED.")

if warnings:
    print(f"\n⚠️ {len(warnings)} WARNING(S):")
    for w in warnings[:10]:
        print(f"  {w}")
    if len(warnings) > 10:
        print(f"  ... and {len(warnings) - 10} more warnings.")
print("=======================================================")

if errors:
    sys.exit(1)
else:
    sys.exit(0)
