import csv
import json

user_cols = [
    'ID', 'Status_Profile', 'Status_Operations', 'Status_Challenges', 'Status_SchemeImpact', 'Status_Digital', 'Status_PostExit',
    'District', 'Block', 'VillageGP', 'RespondentName', 'RespondentPhone', 'SHGName', 'VOName', 'CLFName', 'SHGMembershipYears',
    'LeadershipRole', 'LeadershipYears', 'RelatedToCRP', 'EPInterventionType', 'EnterpriseName', 'ParallelEnterpriseName',
    'EnterpriseSetupYear', 'BusinessType', 'BusinessActivities', 'LoanReceivedYear', 'MaintainSeparateRecords',
    'RegistrationsDocuments', 'RespondentAge', 'MaritalStatus', 'SocialCategory', 'EducationStatus', 'FamilyMemberCount',
    'FamilyIncomeSources', 'FamilyIncome_AnimalSale_Specify', 'FamilyIncomeSourcesOther', 'AnnualHouseholdIncome',
    'ReasonsStartingBusiness', 'BusinessCycle', 'BusinessPlaceType', 'AnnualRent', 'LocationConvenience', 'Material_Percentage',
    'MarketingMethods', 'SeasonalSalesMethod', 'Social_OnlinePlatform', 'RecordKeepingHabit', 'RecordKeepingMethod',
    'SHGAssociationAssistance', 'FundingExperience', 'FinancialHelpFromIncome', 'FinancialHelp_EducationAmt',
    'FinancialHelp_DebtsAmt', 'FinancialHelp_AssetsAmt', 'FinancialHelp_MarriageAmt', 'DebtRepaidAmount', 'AssetsAcquiredAmount',
    'MarriageExpensesAmount', 'HusbandFamilyResponse', 'MaterialSourcingComfort', 'CustomerPaymentRecovery', 'CurrentChallenges',
    'Challenge_OSFPhasedOutAmt', 'Challenge_ScaleUpFundAmt', 'Challenge_TimelyInputsAmt', 'Challenge_Other',
    'Competitors_Similar_Scale', 'Competitors_Smaller_Scale', 'Competitors_Higher_Scale', 'CompetitorAdvantages',
    'FutureExpansionPlans', 'AspirationBottlenecks', 'FutureFundsRequired', 'AttendedTraining', 'TrainingDetails',
    'UsedTrainingComponent', 'UsedTrainingDetails', 'MonthlyIncomeBeforeLoan', 'MonthlyIncomeAfterLoan',
    'MonthlyIncomeIncreaseByOSFSVEP', 'CRPContributions', 'CRPContributionDocDetails', 'ExpectationsFromScheme', 'Other_Specify',
    'SmartphoneOwnership', 'UseQRUPI', 'QRDailyTransactions', 'QRNonUseReason', 'SocialMediaForMarketing', 'SocialPlatformsUsed',
    'SocialPlatformUsageMode', 'SocialMediaFrequency', 'OSFInterventionYear', 'BusinessOperationalStatus',
    'ScalingDownClosingReasons', 'ScalingDownOtherReason', 'SupportNeededForSustenance', 'SupportNeededOther', 'MarketPlaces',
    'GPSLocation', 'CreatedBy', 'CreatedOn', 'LastEditBy', 'LastEditOn'
]

# Read AppVariables.csv
with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    av_rows = list(csv.DictReader(f))

# Let's see how each of user_cols is represented across av_rows
# Map column names and aliases
aliases = {
    'RespondentPhone': ['RespondentPhone', 'ContactNumber'],
    'AnnualRent': ['AnnualRent', 'MonthlyRent'],
    'Material_Percentage': ['Material_Percentage', 'MaterialSourcingPct'],
    'Social_OnlinePlatform': ['Social_OnlinePlatform', 'SeasonalSalesOnlinePlatform'],
    'DebtRepaidAmount': ['DebtRepaidAmount', 'FinancialHelp_DebtsAmt'],
    'AssetsAcquiredAmount': ['AssetsAcquiredAmount', 'FinancialHelp_AssetsAmt'],
    'MarriageExpensesAmount': ['MarriageExpensesAmount', 'FinancialHelp_MarriageAmt'],
    'MarketPlaces': ['MarketPlaces', 'MaterialSourcingPct']
}

print(f"Total columns to map: {len(user_cols)}")

report = []
for idx, col in enumerate(user_cols):
    candidates = aliases.get(col, [col])
    matched_rows = []
    for cand in candidates:
        matched_rows.extend([r for r in av_rows if r.get('Column') == cand])
    
    # Prompt row
    prompt_rows = [r for r in matched_rows if 'QuestionPrompt' in r.get('Tags', '') or r.get('UsedFor', '').lower().startswith('question') or r.get('UsedFor', '').lower().startswith('survey')]
    opt_rows = [r for r in matched_rows if r not in prompt_rows]
    
    # Options list from VariableList or opt_rows
    vlist = ''
    if prompt_rows:
        vlist = prompt_rows[0].get('VariableList', '')
    
    p = prompt_rows[0] if prompt_rows else (matched_rows[0] if matched_rows else None)
    
    report.append({
        'index': idx + 1,
        'survey_column': col,
        'matched_av_column': p.get('Column') if p else 'N/A',
        'qid': p.get('\ufeffID') or p.get('ID') if p else 'N/A',
        'type': p.get('ValueControl') if p else 'N/A',
        'title_en': p.get('Title') if p else '',
        'title_hi': p.get('Title_hi') if p else '',
        'title_raj': p.get('Title_raj') if p else '',
        'options_count': len(opt_rows) if opt_rows else (len(vlist.split(',')) if vlist else 0),
        'options_vlist': vlist
    })

# Output summary
matched_count = sum(1 for r in report if r['qid'] != 'N/A')
print(f"Total mapped: {matched_count} / {len(user_cols)}")

with open('scratch/column_mapping_report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

print("Saved scratch/column_mapping_report.json")
