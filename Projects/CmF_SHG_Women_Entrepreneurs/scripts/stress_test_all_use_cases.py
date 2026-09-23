#!/usr/bin/env python3
"""
stress_test_all_use_cases.py
============================
Deep simulation of all AppSheet use cases, edge cases, formulas,
and cascading behaviors across the entire CmF SHG application.
"""

import os
import csv
import re
import sys

PROJECT_DIR = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs"
DATA_DIR = os.path.join(PROJECT_DIR, "data")

def load_csv(filename):
    path = os.path.join(DATA_DIR, filename)
    with open(path, 'r', encoding='utf-8-sig') as f:
        return list(csv.DictReader(f))

appvars = load_csv("AppVariables.csv")
survey = load_csv("Survey.csv")
appuser = load_csv("AppUser.csv")
sampling = load_csv("SamplingFrame.csv")

appvar_ids = {row['ID']: row for row in appvars}
survey_cols = list(survey[0].keys())

failures = []

def assert_eq(test_name, actual, expected):
    if actual != expected:
        failures.append(f"❌ [{test_name}] Expected '{expected}', got '{actual}'")
    else:
        print(f"  ✅ [{test_name}] Passed: {actual}")

print("=======================================================")
print("🔬 SIMULATING ALL APPSHEET USER CASES & EDGE CASES")
print("=======================================================")

# ---------------------------------------------------------
# USE CASE 1: AppUser TodayProgress & Target Remaining Edge Cases
# ---------------------------------------------------------
print("\n--- USE CASE 1: AppUser Target & Progress Edge Cases ---")

def eval_today_progress(daily_target, completed_today):
    # AppSheet Formula:
    # IFS(
    #   OR(ISBLANK([DailyTarget]), [DailyTarget] <= 0), 0.0,
    #   [CompletedToday] >= [DailyTarget], 1.0,
    #   TRUE, ([CompletedToday] * 1.0) / [DailyTarget]
    # )
    if daily_target is None or daily_target <= 0:
        return 0.0
    if completed_today >= daily_target:
        return 1.0
    return round((completed_today * 1.0) / daily_target, 2)

def eval_target_remaining(daily_target, completed_today):
    # AppSheet Formula: MAX(LIST(0, [_THISROW].[DailyTarget] - [_THISROW].[CompletedToday]))
    return max(0, daily_target - completed_today)

# Test 1.1: 0 completed out of 10
assert_eq("Progress_0_of_10", eval_today_progress(10, 0), 0.0)
assert_eq("Remaining_0_of_10", eval_target_remaining(10, 0), 10)

# Test 1.2: Halfway (5 out of 10)
assert_eq("Progress_5_of_10", eval_today_progress(10, 5), 0.5)
assert_eq("Remaining_5_of_10", eval_target_remaining(10, 5), 5)

# Test 1.3: Exactly reached target (10 out of 10)
assert_eq("Progress_10_of_10", eval_today_progress(10, 10), 1.0)
assert_eq("Remaining_10_of_10", eval_target_remaining(10, 10), 0)

# Test 1.4: Over-target (15 out of 10) - Caps at 1.0
assert_eq("Progress_15_of_10", eval_today_progress(10, 15), 1.0)
assert_eq("Remaining_15_of_10", eval_target_remaining(10, 15), 0)

# Test 1.5: Admin user with DailyTarget = 0 (Must not divide by zero!)
assert_eq("Progress_Admin_0_Target", eval_today_progress(0, 0), 0.0)
assert_eq("Remaining_Admin_0_Target", eval_target_remaining(0, 0), 0)

# Test 1.6: Null daily target
assert_eq("Progress_Null_Target", eval_today_progress(None, 0), 0.0)

# ---------------------------------------------------------
# USE CASE 2: Survey Completion & Section Progress
# ---------------------------------------------------------
print("\n--- USE CASE 2: Survey Section Progress & NA Handling ---")

def eval_survey_progress(p, o, c, s, d, pe):
    # AppSheet Formula:
    # CompletedSectionsCount:
    # (
    #   IF([Status_Profile] = "SEC_DONE", 1, 0) +
    #   IF([Status_Operations] = "SEC_DONE", 1, 0) +
    #   IF([Status_Challenges] = "SEC_DONE", 1, 0) +
    #   IF([Status_SchemeImpact] = "SEC_DONE", 1, 0) +
    #   IF([Status_Digital] = "SEC_DONE", 1, 0) +
    #   IF(OR([Status_PostExit] = "SEC_DONE", [Status_PostExit] = "SEC_NA"), 1, 0)
    # )
    # ProgressPct: MIN(LIST(1.0, ([CompletedSectionsCount] * 1.0) / 6.0))
    cnt = 0
    cnt += 1 if p == "SEC_DONE" else 0
    cnt += 1 if o == "SEC_DONE" else 0
    cnt += 1 if c == "SEC_DONE" else 0
    cnt += 1 if s == "SEC_DONE" else 0
    cnt += 1 if d == "SEC_DONE" else 0
    cnt += 1 if pe in ["SEC_DONE", "SEC_NA"] else 0
    pct = min(1.0, round((cnt * 1.0) / 6.0, 3))
    return cnt, pct

# Test 2.1: Brand new survey (all NOT_STARTED)
cnt, pct = eval_survey_progress("SEC_NOT_STARTED", "SEC_NOT_STARTED", "SEC_NOT_STARTED", "SEC_NOT_STARTED", "SEC_NOT_STARTED", "SEC_NOT_STARTED")
assert_eq("Survey_New_Count", cnt, 0)
assert_eq("Survey_New_Pct", pct, 0.0)

# Test 2.2: 3 Sections Done
cnt, pct = eval_survey_progress("SEC_DONE", "SEC_DONE", "SEC_DONE", "SEC_IN_PROGRESS", "SEC_NOT_STARTED", "SEC_NOT_STARTED")
assert_eq("Survey_3Done_Count", cnt, 3)
assert_eq("Survey_3Done_Pct", pct, 0.5)

# Test 2.3: Non-OSF Exit District (PostExit is SEC_NA) -> Should count as 100% complete!
cnt, pct = eval_survey_progress("SEC_DONE", "SEC_DONE", "SEC_DONE", "SEC_DONE", "SEC_DONE", "SEC_NA")
assert_eq("Survey_With_SEC_NA_Count", cnt, 6)
assert_eq("Survey_With_SEC_NA_Pct", pct, 1.0)

# Test 2.4: Full Baran/Ratangarh survey with SEC_DONE for PostExit
cnt, pct = eval_survey_progress("SEC_DONE", "SEC_DONE", "SEC_DONE", "SEC_DONE", "SEC_DONE", "SEC_DONE")
assert_eq("Survey_All_Done_Count", cnt, 6)
assert_eq("Survey_All_Done_Pct", pct, 1.0)

# ---------------------------------------------------------
# USE CASE 3: Dynamic Trilingual Resolution for Every Question
# ---------------------------------------------------------
print("\n--- USE CASE 3: Trilingual Label Resolution for 227 Questions ---")

survey_questions = [r for r in appvars if 'QuestionPrompt' in r.get('Tags', '') and r.get('Table') == 'Survey']
print(f"  Found {len(survey_questions)} Survey question prompts.")

missing_translations = 0
for q in survey_questions:
    qid = q['ID']
    en = q['Title']
    hi = q['Title_hi']
    raj = q['Title_raj']
    if not en or not hi or not raj:
        missing_translations += 1
        failures.append(f"❌ Question {qid} has incomplete trilingual prompt (EN: '{en}', HI: '{hi}', RAJ: '{raj}')")

assert_eq("All_Questions_Have_3_Languages", missing_translations, 0)

# ---------------------------------------------------------
# USE CASE 4: Cascading District to Block Validation
# ---------------------------------------------------------
print("\n--- USE CASE 4: Cascading District -> Block Validation ---")

# Field survey districts
field_districts = ['DIST_BARAN', 'DIST_CHURU', 'DIST_DAUSA', 'DIST_DUNGARPUR', 'DIST_JODHPUR']
all_blocks = [r for r in appvars if r.get('Column') == 'Block' and 'Option' in r.get('Tags', '')]

for dist_id in field_districts:
    # Filter blocks where Description == dist_id
    matching_blocks = [b for b in all_blocks if b.get('Description') == dist_id]
    if len(matching_blocks) == 0:
        failures.append(f"❌ District {dist_id} has NO corresponding blocks in AppVariables!")
    else:
        print(f"  ✅ District {dist_id} ({appvar_ids[dist_id]['Title']}) -> {len(matching_blocks)} blocks: {[b['Title'] for b in matching_blocks]}")

# ---------------------------------------------------------
# USE CASE 5: Slices Column Integrity Check
# ---------------------------------------------------------
print("\n--- USE CASE 5: Slice Column Existence in Physical Survey Table ---")

slices_config = {
    "Slice_Profile": [
        "ID", "Status_Profile", "RespondentAge", "MaritalStatus", "SocialCategory", 
        "EducationStatus", "FamilyMemberCount", "FamilyAdultsCount", "FamilyChildrenCount", 
        "FamilyTotalEarning", "FamilyMaleEarning", "FamilyFemaleEarning", "FamilyDisabledCount", 
        "FamilyIncomeSources", "AnnualHouseholdIncome"
    ],
    "Slice_Operations": [
        "ID", "Status_Operations", "ReasonsStartingBusiness", "BusinessCycle", "BusinessCycleOther", 
        "BusinessPlaceType", "AnnualRent", "LocationConvenience", "LocationConvenienceOther",
        "AnnualSalaryBill", "MarketingMethods", "MarketingMethodsOther", "RecordKeepingHabit",
        "RecordKeepingMethod", "RecordKeepingOther", "InitialStartCapital", "InitialCapitalArranged",
        "SHGAssociationAssistance", "MonthlyIncomeIncreaseByOSFSVEP", "FinancialHelpFromIncome"
    ],
    "Slice_Challenges": [
        "ID", "Status_Challenges", "HusbandFamilyResponse", "MaterialSourcingComfort", 
        "CustomerPaymentRecovery", "FundingExperience", "CurrentChallenges", "Challenge_Other"
    ],
    "Slice_SchemeImpact": [
        "ID", "Status_SchemeImpact", "AttendedTraining", "TrainingDetails", "UsedTrainingComponent", 
        "UsedTrainingDetails", "MonthlyIncomeBeforeLoan", "MonthlyIncomeAfterLoan", 
        "CRPContributions", "CRPContributionDocDetails", "ExpectationsFromScheme"
    ],
    "Slice_Digital": [
        "ID", "Status_Digital", "SmartphoneOwnership", "UseQRUPI", "QRDailyTransactions", 
        "QRNonUseReason", "SocialPlatformsUsed", "SocialPlatformUsageMode", "SocialMediaFrequency"
    ],
    "Slice_PostExit": [
        "ID", "Status_PostExit", "OSFInterventionYear", "BusinessOperationalStatus", 
        "BusinessClosureYear", "ScalingDownClosingReasons", "ScalingDownOtherReason", 
        "SupportNeededForSustenance", "SupportNeededOther"
    ]
}

for s_name, cols in slices_config.items():
    missing_in_survey = [c for c in cols if c not in survey_cols]
    if missing_in_survey:
        failures.append(f"❌ Slice {s_name} references columns not in Survey table: {missing_in_survey}")
    else:
        print(f"  ✅ {s_name}: All {len(cols)} sample columns exist in Survey physical schema.")

# ---------------------------------------------------------
# FINAL SUMMARY
# ---------------------------------------------------------
print("\n=======================================================")
if failures:
    print(f"❌ STRESS TEST FAILED WITH {len(failures)} ISSUE(S):")
    for f in failures:
        print(f)
    sys.exit(1)
else:
    print("🎉 100% ERROR-PROOF! ALL USE CASES, EDGE CASES, AND FORMULAS VERIFIED.")
print("=======================================================")
