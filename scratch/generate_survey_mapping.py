import json

# Read authoritative AppVariables
with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_AUTHORITATIVE.tsv', 'r', encoding='utf-8') as f:
    av_lines = f.readlines()

av_headers = av_lines[0].strip().split('\t')
av_rows = []
for l in av_lines[1:]:
    parts = l.strip().split('\t')
    while len(parts) < len(av_headers):
        parts.append('')
    d = dict(zip(av_headers, parts))
    av_rows.append(d)

# Also parse user's pasted rows
with open('scratch/last_user_prompt.txt', 'r', encoding='utf-8') as f:
    prompt_text = f.read()

pos = prompt_text.find('survey table data and i want')
survey_text = prompt_text[:pos].strip()
user_cols_raw = [c.strip() for c in survey_text.replace('\n', '\t').split('\t') if c.strip() and not c.startswith('<')]

# Deduplicate Survey Columns preserving order
survey_cols = []
for c in user_cols_raw:
    if c not in survey_cols:
        survey_cols.append(c)

print(f"Total unique columns in Survey: {len(survey_cols)}")

# Build lookup by ID and by Column from authoritative AppVariables
av_by_id = {r['ID']: r for r in av_rows}
av_by_col = {}
for r in av_rows:
    col = r.get('Column')
    if col:
        # store both original and stripped
        av_by_col[col] = r
        clean_col = col.replace('Q_A_', '').replace('Q_B_', '').replace('Q_C_', '').replace('Q_D_', '').replace('Q_E_', '').replace('Q_F_', '').replace('Q_G_', '').replace('Q_H_', '').replace('Q_I_', '')
        # remove order numbers like 01_, 02_
        import re
        clean_col = re.sub(r'^\d+_', '', clean_col)
        av_by_col[clean_col] = r

# Let's map each column
final_mapping = []

# Manual explicit mapping table for all columns in user's survey table
EXPLICIT_MAP = {
    # System / Status / Metadata
    "ID": ("-", "Survey Record Unique ID", "Text / Key", "-"),
    "Status": ("STAT_DRAFT", "Survey Submission Status", "Enum", "Draft, Submitted, Verified"),
    "Status_Profile": ("Q_STAT_PROFILE", "Section B: Profile Status", "Enum", "Not Started, In Progress, Done, N/A"),
    "Status_Operations": ("Q_STAT_OPERATIONS", "Section C: Operations Status", "Enum", "Not Started, In Progress, Done, N/A"),
    "Status_Challenges": ("Q_STAT_CHALLENGES", "Section D: Challenges Status", "Enum", "Not Started, In Progress, Done, N/A"),
    "Status_SchemeImpact": ("Q_STAT_SCHEME", "Section E: Scheme Impact Status", "Enum", "Not Started, In Progress, Done, N/A"),
    "Status_Digital": ("Q_STAT_DIGITAL", "Section F: Digital Media Status", "Enum", "Not Started, In Progress, Done, N/A"),
    "Status_PostExit": ("Q_STAT_POST_EXIT", "Section G: Post-Exit Status", "Enum", "Not Started, In Progress, Done, N/A"),
    "InvestigatorID": ("-", "Investigator Email / ID", "Ref (AppUser)", "-"),
    "CreatedBy": ("-", "Created By User Email", "Email", "-"),
    "CreatedOn": ("-", "Created On Timestamp", "DateTime", "-"),
    "LastEditBy": ("-", "Last Edited By User Email", "Email", "-"),
    "LastEditOn": ("-", "Last Edited On Timestamp", "DateTime", "-"),
    "LastEditedBy": ("-", "Last Edited By", "Email", "-"),
    "LastEditedOn": ("-", "Last Edited On", "DateTime", "-"),
    "Latitude": ("-", "GPS Latitude", "Decimal", "-"),
    "Longitude": ("-", "GPS Longitude", "Decimal", "-"),
    "GPSLocation": ("-", "GPS Location Coordinate", "LatLong", "-"),
    "MarketPlaces": ("-", "Market Places / Location Remarks", "Text", "-"),

    # Section A: General Enterprise & SHG Information
    "District": ("Q_A_01", "Q1. District", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_A_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "Block": ("Q_A_02", "Q2. Block", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_A_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "VillageGP": ("Q_A_03", "Q3. Village/GP", "Text", "-"),
    "RespondentName": ("Q_A_04", "Q4. Respondent Name", "Text", "-"),
    "RespondentPhone": ("Q_A_05", "Q5. Respondent’s phone number", "Phone", "-"),
    "SHGName": ("Q_A_06", "Q6. SHG Name", "Text", "-"),
    "VOName": ("Q_A_07", "Q7. VO Name", "Text", "-"),
    "CLFName": ("Q_A_08", "Q8. CLF Name", "Text", "-"),
    "SHGMembershipYears": ("Q_A_09", "Q9. Years of SHG membership", "Number", "-"),
    "LeadershipRole": ("Q_A_10", "Q10. Have you been in a leadership role in SHG/CLF/VO?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_A_10\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "LeadershipYears": ("Q_A_11", "Q11. Years of experience in leadership roles?", "Number", "-"),
    "RelatedToCRP": ("Q_A_12", "Q12. Are you related to any of the SVEP/OSF CRP?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_A_12\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "EPInterventionType": ("Q_A_13", "Q13. Type of Enterprise Promotion (EP) intervention", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_A_13\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "EnterpriseName": ("Q_A_14", "Q14. Enterprise Name", "Text", "-"),
    "ParallelEnterpriseName": ("Q_A_14", "Parallel Enterprise Name (if running two businesses)", "Text", "-"),
    "EnterpriseSetupYear": ("Q_A_15", "Q15. Years of setting up enterprise", "Number", "-"),
    "BusinessType": ("Q_A_16", "Q16. Type of business enterprise (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_A_16\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "BusinessActivities": ("Q_A_17", "Q17. Main business activities of the enterprise (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_A_17\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "BusinessActivitiesOther": ("Q_A_17", "Specify other business activity", "Text", "-"),
    "LoanReceivedYear": ("Q_A_18", "Q18. Years of receiving SVEP/OSF loan?", "Number", "-"),
    "MaintainSeparateRecords": ("Q_A_19", "Q19. Do you maintain separate records for all the businesses", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_A_19\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "RegistrationsDocuments": ("Q_A_20", "Q20. Do you have the following registrations/documents?", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_A_20\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),

    # Section B: Respondent & Household Profile
    "RespondentAge": ("Q_B_01", "Q1. What is the age of the respondent?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_B_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "MaritalStatus": ("Q_B_02", "Q2. What is the marital status?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_B_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SocialCategory": ("Q_B_03", "Q3. What is the social category?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_B_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "EducationStatus": ("Q_B_04", "Q4. What is the education status?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_B_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "FamilyMemberCount": ("Q_B_05", "Q5. How many members are in the family? ------- (count)", "Number", "-"),
    "FamilyIncomeSources": ("Q_B_07", "Q7. What are your family’s sources of income? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_B_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "FamilyIncome_AnimalSale_Specify": ("Q_B_07", "Specify animal sale details", "Text", "-"),
    "FamilyIncomeSourcesOther": ("Q_B_07", "Specify other income source", "Text", "-"),
    "AnnualHouseholdIncome": ("Q_B_08", "Q8. What is your annual household income and monetary benefits?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_B_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),

    # Section C: Enterprise Operations & Capital
    "ReasonsStartingBusiness": ("Q_C_01", "Q1. Reasons for starting the business? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_C_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "BusinessCycle": ("Q_C_02", "Q2. Describe your business cycle?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_C_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "BusinessPlaceType": ("Q_C_03", "Q3. What is the type of business place?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_C_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "AnnualRent": ("Q_C_04", "Q4. If rented, what is monthly rent? Rs______", "Decimal / Number", "-"),
    "MonthlyRent": ("Q_C_04", "Monthly rent (Rs)", "Decimal / Number", "-"),
    "LocationConvenience": ("Q_C_05", "Q5. Is the location of your premise convenient for your customers?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_C_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "Material_Percentage": ("Q_C_07_01", "Q7. What percentage of raw material do you source from these places?", "Section Header", "-"),
    "MaterialSourcingPct": ("MAIN_PCT_SCALE_5", "Raw Material Sourcing Percentage", "Enum (Buttons)", "=SPLIT(LOOKUP(\"MAIN_PCT_SCALE_5\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "MarketingMethods": ("Q_C_08", "Q8. How do you market your products/services? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_C_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SeasonalSalesMethod": ("Q_C_09", "Q9. How do you sell your products/services? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_C_09\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SalesChannelsPct": ("MAIN_PCT_SCALE_SALES", "Sales Channels Percentage Scale", "Enum (Buttons)", "=SPLIT(LOOKUP(\"MAIN_PCT_SCALE_SALES\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "Social_OnlinePlatform": ("Q_C_09", "Specify online platform used", "Text", "-"),
    "RecordKeepingHabit": ("Q_C_11", "Q11. Do you maintain written records of business transactions?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_C_11\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "RecordKeepingMethod": ("Q_C_12", "Q12. How do you maintain business transactions? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_C_12\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),

    # Section D: Association, Capital, Financial Impact
    "SHGAssociationAssistance": ("Q_D_01", "Q1. How has the SHG association helped in your enterprise? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_D_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "FundingExperience": ("Q_D_04", "Q4. What has been your experience in raising funds? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_D_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "FinancialHelpFromIncome": ("Q_D_06", "Q6. How has income from enterprise helped you financially? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_D_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "FinancialHelp_EducationAmt": ("Q_D_06", "Education expenses contribution amount (Rs)", "Decimal", "-"),
    "FinancialHelp_DebtsAmt": ("Q_D_06", "Family debts paid amount (Rs)", "Decimal", "-"),
    "FinancialHelp_AssetsAmt": ("Q_D_06", "Assets acquisition contribution amount (Rs)", "Decimal", "-"),
    "FinancialHelp_MarriageAmt": ("Q_D_06", "Marriage expenses contribution amount (Rs)", "Decimal", "-"),
    "DebtRepaidAmount": ("Q_D_06", "Debt Repaid Amount (Rs)", "Decimal", "-"),
    "AssetsAcquiredAmount": ("Q_D_06", "Assets Acquired Amount (Rs)", "Decimal", "-"),
    "MarriageExpensesAmount": ("Q_D_06", "Marriage Expenses Amount (Rs)", "Decimal", "-"),

    # Section E: Ease of Doing Business & Challenges
    "HusbandFamilyResponse": ("Q_E_01", "Q1. How did your husband/family respond when you started enterprise?", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_E_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "MaterialSourcingComfort": ("Q_E_02", "Q2. How comfortable are you in sourcing raw material/goods?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_E_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "CustomerPaymentRecovery": ("Q_E_03", "Q3. How comfortable are you in recovering payment from customers?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_E_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "CurrentChallenges": ("Q_E_04", "Q4. What are your current challenges in running the business? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_E_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "Challenge_OSFPhasedOutAmt": ("Q_E_04", "Challenge: OSF Phased Out Amount needed (Rs)", "Decimal", "-"),
    "Challenge_ScaleUpFundAmt": ("Q_E_04", "Challenge: Scale-up Fund needed (Rs)", "Decimal", "-"),
    "Challenge_TimelyInputsAmt": ("Q_E_04", "Challenge: Timely Inputs Fund needed (Rs)", "Decimal", "-"),
    "Challenge_Other": ("Q_E_04", "Specify other challenge", "Text", "-"),
    "Competitors_Similar_Scale": ("Q_E_05_Count", "Q5. Number of competitors in same scale (#)", "Number", "-"),
    "Competitors_Same_Scale": ("Q_E_05_Count", "Q5. Number of competitors in same scale (#)", "Number", "-"),
    "Competitors_Smaller_Scale": ("Q_E_05_Smaller", "Q5. Number of competitors in smaller scale (#)", "Number", "-"),
    "Competitors_Higher_Scale": ("Q_E_05_Higher", "Q5. Number of competitors in higher scale (#)", "Number", "-"),
    "CompetitorAdvantages": ("Q_E_06", "Q6. What advantages do competitors have over your enterprise? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_E_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),

    # Section F: Future Aspirations
    "FutureExpansionPlans": ("Q_F_01", "Q1. Do you have future expansion plans for your business?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_F_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "AspirationBottlenecks": ("Q_F_02", "Q2. What are the bottlenecks in fulfilling your aspirations? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_F_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "FutureFundsRequired": ("Q_F_03", "Q3. How much funds do you require for future expansion? (Rs)", "Decimal / Number", "-"),

    # Section G: Impact of SVEP / OSF Schemes
    "AttendedTraining": ("Q_G_01", "Q1. Did you attend any training under SVEP/OSF?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_G_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "TrainingDetails": ("Q_G_02", "Q2. Details of training attended", "Text", "-"),
    "UsedTrainingComponent": ("Q_G_03", "Q3. Have you used any component of training in business?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_G_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "UsedTrainingDetails": ("Q_G_04", "Q4. Details of training components used", "Text", "-"),
    "MonthlyIncomeBeforeLoan": ("Q_G_05", "Q5. Did monthly income increase after SVEP/OSF loan?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_G_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "MonthlyIncomeAfterLoan": ("Q_G_06", "Average monthly income after loan (Rs)", "Number", "-"),
    "MonthlyIncomeIncreaseByOSFSVEP": ("Q_G_06", "Q6. By how much did monthly income increase due to OSF/SVEP? (Rs)", "Number / Decimal", "-"),
    "CRPContributions": ("Q_G_07", "Q7. What was the contribution of CRP in your enterprise? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_G_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "CRPContributionDocDetails": ("Q_G_07", "CRP documentation support details", "Text", "-"),
    "ExpectationsFromScheme": ("Q_G_08", "Q8. What are your expectations from the scheme in future? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_G_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "Other_Specify": ("Q_G_08", "Specify other expectation", "Text", "-"),

    # Section H: Digital Transactions & Social Media
    "SmartphoneOwnership": ("Q_H_01", "Q1. Do you own or have access to a smartphone?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_H_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "UseQRUPI": ("Q_H_02", "Q2. Do you use QR code / UPI for business transactions?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_H_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "QRDailyTransactions": ("Q_H_03", "Q3. Average number of QR / UPI transactions per day (#)", "Number", "-"),
    "QRNonUseReason": ("Q_H_04", "Q4. Reasons for not using QR code / UPI payment", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_H_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SocialMediaForMarketing": ("Q_H_05", "Q5. Do you use social media for marketing?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_H_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SocialPlatformsUsed": ("Q_H_06", "Q6. Which social media platforms do you use for your business? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_H_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SocialPlatformUsageMode": ("Q_H_07", "Q7. How do you use these platforms in your business? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_H_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SocialMediaFrequency": ("Q_H_08", "Q8. How often do you use social media for your business?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_H_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),

    # Section I: Post-Exit OSF
    "OSFInterventionYear": ("Q_I_01", "Q1. In which year was the OSF intervention made?", "Number", "-"),
    "BusinessOperationalStatus": ("Q_I_02", "Q2. Is your business still operational?", "Enum (Ref)", "=SPLIT(LOOKUP(\"Q_I_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "BusinessClosureYear": ("Q_I_02", "Year when business closed (if closed)", "Number", "-"),
    "ScalingDownClosingReasons": ("Q_I_03", "Q3. What are the reasons for scaling down/closing business? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_I_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "ScalingDownOtherReason": ("Q_I_03", "Specify other closure reason", "Text", "-"),
    "SupportNeededForSustenance": ("Q_I_04", "Q4. What kind of support could have helped you manage business? (Multiselect)", "EnumList (Ref)", "=SPLIT(LOOKUP(\"Q_I_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"),
    "SupportNeededOther": ("Q_I_04", "Specify other support needed", "Text", "-")
}

output = []
for col in survey_cols:
    if col in EXPLICIT_MAP:
        qid, title, qtype, validif = EXPLICIT_MAP[col]
        # find hindi from authoritative AppVariables if available
        hi = ""
        raj = ""
        if qid in av_by_id:
            hi = av_by_id[qid].get('Title_hi', '')
            raj = av_by_id[qid].get('Title_raj', '')
        output.append({
            'Column': col,
            'AppVariable_ID': qid,
            'Title': title,
            'Title_hi': hi,
            'Type': qtype,
            'Valid_If': validif
        })
    else:
        output.append({
            'Column': col,
            'AppVariable_ID': '-',
            'Title': col,
            'Title_hi': '-',
            'Type': 'Text',
            'Valid_If': '-'
        })

print(f"Total mapped: {len(output)}")
with open('scratch/full_authoritative_survey_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print("Saved to scratch/full_authoritative_survey_mapping.json")
