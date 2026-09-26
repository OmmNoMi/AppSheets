import json
import csv

with open(r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_QUESTIONS_AND_OPTIONS_MATRIX.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# Let's filter to unique Survey table questions in order
# Also load SURVEY_QUESTIONS_TRILINGUAL_MASTER.csv to maintain exact Q1..QN sequence
seq_cols = []
with open(r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_QUESTIONS_TRILINGUAL_MASTER.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for r in reader:
        seq_cols.append(r)

id_to_matrix = {m['id']: m for m in matrix}
col_to_matrix = {m['column']: m for m in matrix if m.get('column')}

# Build comprehensive markdown guide
md_lines = []
md_lines.append("# SHG Women Entrepreneurs Survey - Complete Trilingual Options & Show_If Reference Matrix")
md_lines.append("\n> **Purpose**: Exact reference for all Questions, Enum Options (Option ID, Stored Value, English, Hindi, Rajasthani), and Copy-Paste `Show_If` / `Valid_If` AppSheet Formulas.\n")

# Show_if logic lookup
showif_rules = {
    "LeadershipYears": "[LeadershipRole] = \"OPT_YES\" (or [LeadershipRole] = \"Yes\")",
    "FamilyIncome_AnimalSale_Specify": "IN(\"INC_ANIMAL_SALE\", [FamilyIncomeSources]) (or IN(\"Sale of animals\", [FamilyIncomeSources]))",
    "FamilyIncomeSourcesOther": "IN(\"INC_OTHER\", [FamilyIncomeSources]) (or IN(\"Any other, specify\", [FamilyIncomeSources]))",
    "BusinessActivitiesOther": "IN(\"ACT_ANY_OTHER\", [BusinessActivities])",
    "BusinessCycleOther": "[BusinessCycle] = \"CYC_OTHER\"",
    "AnnualRent": "[BusinessPlaceType] = \"PLC_RENTED\"",
    "MonthlyRent": "[BusinessPlaceType] = \"PLC_RENTED\"",
    "LocationConvenienceOther": "[LocationConvenience] = \"LOC_OTHER\"",
    "MarketingMethodsOther": "IN(\"MKT_OTHER\", [MarketingMethods])",
    "SeasonalSalesOnlinePlatform": "[SeasonalSalesMethod] = \"SSM_ONLINE\"",
    "SeasonalSalesOther": "[SeasonalSalesMethod] = \"SSM_OTHER\"",
    "RecordKeepingMethod": "[RecordKeepingHabit] = \"OPT_YES\"",
    "RecordKeepingOther": "IN(\"REC_OTHER\", [RecordKeepingMethod])",
    "FinancialHelp_EducationAmt": "IN(\"ED\", [FinancialHelpFromIncome])",
    "FinancialHelp_DebtsAmt": "IN(\"DB\", [FinancialHelpFromIncome])",
    "FinancialHelp_AssetsAmt": "IN(\"AS\", [FinancialHelpFromIncome])",
    "FinancialHelp_MarriageAmt": "IN(\"MR\", [FinancialHelpFromIncome])",
    "Challenge_OSFPhasedOutAmt": "IN(\"CH_OSF_PHASED\", [CurrentChallenges])",
    "Challenge_ScaleUpFundAmt": "IN(\"CH_FUND_DEFICIT\", [CurrentChallenges])",
    "Challenge_TimelyInputsAmt": "IN(\"CH_RAW_MATERIAL\", [CurrentChallenges])",
    "Challenge_Other": "IN(\"CH_OTHER\", [CurrentChallenges])",
    "TrainingDetails": "[AttendedTraining] = \"OPT_YES\"",
    "UsedTrainingComponent": "[AttendedTraining] = \"OPT_YES\"",
    "UsedTrainingDetails": "[UsedTrainingComponent] = \"OPT_YES\"",
    "Other_Specify": "[ExpectationsFromScheme] = \"EXP_OTHER\"",
    "QRDailyTransactions": "[UseQRUPI] = \"OPT_YES\"",
    "QRNonUseReason": "[UseQRUPI] = \"OPT_NO\"",
    "SocialPlatformsUsed": "[SocialMediaForMarketing] = \"OPT_YES\"",
    "SocialPlatformUsageMode": "[SocialMediaForMarketing] = \"OPT_YES\"",
    "SocialMediaFrequency": "[SocialMediaForMarketing] = \"OPT_YES\"",
    "ScalingDownClosingReasons": "[BusinessOperationalStatus] = \"BSTAT_CLOSED\" OR [BusinessOperationalStatus] = \"BSTAT_SCALED_DOWN\"",
    "ScalingDownOtherReason": "IN(\"SDR_OTHER\", [ScalingDownClosingReasons])",
    "SupportNeededOther": "IN(\"SUP_OTHER\", [SupportNeededForSustenance])"
}

csv_rows = []

for item in seq_cols:
    qid = item['ID']
    col = item['Column']
    m = id_to_matrix.get(qid, col_to_matrix.get(col, {}))
    
    title_en = item['Title']
    title_hi = item['Title_hi']
    title_raj = item['Title_raj']
    vtype = m.get('type', 'Text')
    options = m.get('options', [])
    
    showif = showif_rules.get(col, "None (Always Visible)")
    
    md_lines.append(f"### {title_en}")
    md_lines.append(f"- **Physical Column**: `{col}`")
    md_lines.append(f"- **Question ID**: `{qid}`")
    md_lines.append(f"- **Type / ValueControl**: `{vtype}`")
    md_lines.append(f"- **Hindi Title**: {title_hi}")
    md_lines.append(f"- **Rajasthani Title**: {title_raj}")
    md_lines.append(f"- **Display Name Formula**: `=LOOKUP(\"{qid}\", \"AppVariables\", \"ID\", \"Label\")`")
    if showif != "None (Always Visible)":
        md_lines.append(f"- **Show_If Expression**: `{showif}`")
    
    if options:
        md_lines.append("\n| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |")
        md_lines.append("|---|---|---|---|---|")
        for opt in options:
            oid = opt.get('id', '')
            eval_val = opt.get('enum_value', '') or oid
            ot_en = opt.get('title', '')
            ot_hi = opt.get('title_hi', '')
            ot_raj = opt.get('title_raj', '')
            md_lines.append(f"| `{oid}` | `{eval_val}` | {ot_en} | {ot_hi} | {ot_raj} |")
            csv_rows.append({
                'Question_ID': qid,
                'Column': col,
                'Question_Title': title_en,
                'Question_Title_hi': title_hi,
                'Question_Title_raj': title_raj,
                'Option_ID': oid,
                'Enum_Value': eval_val,
                'Option_Title': ot_en,
                'Option_Title_hi': ot_hi,
                'Option_Title_raj': ot_raj,
                'Show_If_Formula': showif
            })
    else:
        csv_rows.append({
            'Question_ID': qid,
            'Column': col,
            'Question_Title': title_en,
            'Question_Title_hi': title_hi,
            'Question_Title_raj': title_raj,
            'Option_ID': '',
            'Enum_Value': '',
            'Option_Title': '',
            'Option_Title_hi': '',
            'Option_Title_raj': '',
            'Show_If_Formula': showif
        })
    md_lines.append("\n---\n")

# Save files
md_out = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_OPTIONS_AND_SHOWIF_REFERENCE.md'
with open(md_out, 'w', encoding='utf-8') as f:
    f.write("\n".join(md_lines))

csv_out = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_OPTIONS_AND_SHOWIF_REFERENCE.csv'
with open(csv_out, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=[
        'Question_ID', 'Column', 'Question_Title', 'Question_Title_hi', 'Question_Title_raj',
        'Option_ID', 'Enum_Value', 'Option_Title', 'Option_Title_hi', 'Option_Title_raj', 'Show_If_Formula'
    ])
    writer.writeheader()
    writer.writerows(csv_rows)

print(f"Generated Reference MD: {md_out}")
print(f"Generated Reference CSV: {csv_out}")
