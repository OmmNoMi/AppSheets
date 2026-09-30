import json
import csv

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

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    av_rows = list(csv.DictReader(f))

av_by_col = {}
for r in av_rows:
    col = r.get('Column', '').strip()
    if col:
        if col not in av_by_col:
            av_by_col[col] = []
        av_by_col[col].append(r)

print(f"Total User Columns: {len(user_cols)}")

analysis = []
for idx, c in enumerate(user_cols):
    rows = av_by_col.get(c, [])
    prompt_rows = [r for r in rows if 'QuestionPrompt' in r.get('Tags', '') or r.get('UsedFor', '').lower().startswith('question') or r.get('UsedFor', '').lower().startswith('survey')]
    opt_rows = [r for r in rows if r not in prompt_rows]
    
    p_title = prompt_rows[0]['Title'] if prompt_rows else (rows[0]['Title'] if rows else '')
    vc = prompt_rows[0]['ValueControl'] if prompt_rows else (rows[0]['ValueControl'] if rows else '')
    vlist = prompt_rows[0].get('VariableList', '') if prompt_rows else ''
    
    status = '[OK]' if rows else '[MISSING]'
    print(f"{idx+1:3d}. {status:9} | {c:32} | {vc:12} | {len(opt_rows):2d} opts | {p_title[:40]}")
