import json

# Let's map each question from the docx to its corresponding Column in Survey table

survey_columns_map = [
    # Section A
    ("Section A", "Q1", "District", "District", "Enum"),
    ("Section A", "Q2", "Block", "Block", "Enum"),
    ("Section A", "Q3", "Village/GP", "VillageGP", "Text"),
    ("Section A", "Q4", "Respondent Name", "RespondentName", "Text"),
    ("Section A", "Q5", "Respondent’s phone number", "RespondentPhone", "Phone"),
    ("Section A", "Q6", "SHG Name", "SHGName", "Text"),
    ("Section A", "Q7", "VO Name", "VOName", "Text"),
    ("Section A", "Q8", "CLF Name", "CLFName", "Text"),
    ("Section A", "Q9", "Years of SHG membership", "SHGMembershipYears", "Number"),
    ("Section A", "Q10", "Have you been in a leadership role in SHG/CLF/VO?", "LeadershipRole", "Enum"),
    ("Section A", "Q11", "Years of experience in leadership roles?", "LeadershipYears", "Number"),
    ("Section A", "Q12", "Are you related to any of the SVEP/OSF CRP?", "RelatedToCRP", "Enum"),
    ("Section A", "Q13", "Type of Enterprise Promotion (EP) intervention", "EPInterventionType", "Enum"),
    ("Section A", "Q14", "Enterprise Name", "EnterpriseName", "Text"),
    ("Section A", "Q15", "Years of setting up enterprise", "EnterpriseSetupYear", "Number"),
    ("Section A", "Q16", "Type of business enterprise (Multiselect)", "BusinessType", "EnumList"),
    ("Section A", "Q17", "Main business activities of the enterprise (Multiselect)", "BusinessActivities", "EnumList"),
    ("Section A", "Q18", "Years of receiving SVEP/OSF loan?", "LoanReceivedYear", "Number"),
    ("Section A", "Q19", "Do you maintain separate records for all the businesses", "MaintainSeparateRecords", "Enum"),
    ("Section A", "Q20", "Do you have the following registrations/documents?", "RegistrationsDocuments", "EnumList"),

    # Section B
    ("Section B", "Q1", "What is the age of the respondent?", "RespondentAge", "Enum"),
    ("Section B", "Q2", "What is the marital status?", "MaritalStatus", "Enum"),
    ("Section B", "Q3", "What is the social category?", "SocialCategory", "Enum"),
    ("Section B", "Q4", "What is the education status?", "EducationStatus", "Enum"),
    ("Section B", "Q5", "How many members are in the family? ------- (count)", "FamilyMemberCount", "Number"),
    ("Section B", "Q6a", "Adults (Above 18)", "FamilyAdultsCount", "Number"),
    ("Section B", "Q6b", "Children", "FamilyChildrenCount", "Number"),
    ("Section B", "Q6c", "Total earning members", "FamilyTotalEarning", "Number"),
    ("Section B", "Q6d", "Male earning members", "FamilyMaleEarning", "Number"),
    ("Section B", "Q6e", "Female earning members", "FamilyFemaleEarning", "Number"),
    ("Section B", "Q6f", "Members with disability", "FamilyDisabledCount", "Number"),
    ("Section B", "Q7", "What are your family’s sources of income? (Multiselect)", "FamilyIncomeSources", "EnumList"),
    ("Section B", "Q8", "What is your annual household income and monetary benefits from all sources (including respondent’s enterprise)?", "AnnualHouseholdIncome", "Enum"),

    # Section C
    ("Section C", "Q1", "Reasons for starting the business? (Multiselect)", "ReasonsStartingBusiness", "EnumList"),
    ("Section C", "Q2", "Describe your business cycle?", "BusinessCycle", "Enum"),
    ("Section C", "Q3", "What is the type of business place?", "BusinessPlaceType", "Enum"),
    ("Section C", "Q4", "If rented, what is monthly rent? Rs______( mention in numbers)", "MonthlyRent", "Price"),
    ("Section C", "Q5", "Is the location of your premise convenient for your customers?", "LocationConvenience", "Enum"),
    ("Section C", "Q6", "Involvement of family members and hired help in business operations", "Related_Q6_Labor", "InlineSubTable"),
    ("Section C", "Q7a", "Nearby town/district (0%/25%/50%/75%/100%)", "Sourcing_NearbyTown_Pct", "Enum"),
    ("Section C", "Q7b", "Wholesale market within state (0%/25%/50%/75%/100%)", "Sourcing_Jaipur_Pct", "Enum"),
    ("Section C", "Q7c", "Wholesale market outside the state (0%/25%/50%/75%/100%)", "Sourcing_OutsideState_Pct", "Enum"),
    ("Section C", "Q7d", "Order online (Amazon/Misho) (0%/25%/50%/75%/100%)", "Sourcing_Online_Pct", "Enum"),
    ("Section C", "Q8", "How do you market your products/services? (Multiselect)", "MarketingMethods", "EnumList"),
    ("Section C", "Q9", "How do you sell your products/services?", "SeasonalSalesMethod", "EnumList"),
    ("Section C", "Q10a", "Online platforms", "SalesChannel_Online_Pct", "Enum"),
    ("Section C", "Q10b", "Whatsapp", "SalesChannel_WhatsApp_Pct", "Enum"),
    ("Section C", "Q10c", "Instagram", "SalesChannel_Instagram_Pct", "Enum"),
    ("Section C", "Q10d", "Your premise", "SalesChannel_Premise_Pct", "Enum"),
    ("Section C", "Q10e", "Local traders/shopkeepers", "SalesChannel_Traders_Pct", "Enum"),
    ("Section C", "Q10f", "Local haat/market", "SalesChannel_Haat_Pct", "Enum"),
    ("Section C", "Q10g", "Saras fair", "SalesChannel_Saras_Pct", "Enum"),
    ("Section C", "Q11", "Do you maintain written records of business transactions?", "RecordKeepingHabit", "Enum"),
    ("Section C", "Q12", "How do you maintain business transactions?", "RecordKeepingMethod", "EnumList"),
    ("Section C", "Q13", "Turnover and income from the enterprise", "Related_Q15_Turnover", "InlineSubTable"),

    # Section D
    ("Section D", "Q1", "How has the SHG association helped in your enterprise? ( Multiselect)", "SHGAssociationAssistance", "EnumList"),
    ("Section D", "Q2", "How have you arranged capital over the enterprise duration? ( Ask for each option. Put 0 if the source is not used)", "Related_Q19_Capital", "InlineSubTable"),
    ("Section D", "Q3", "How did you use the loans taken from different sources?", "Related_Q20_Loan_Usage", "InlineSubTable"),
    ("Section D", "Q4", "What has been your experience in funding your business? (Multi select)", "FundingExperience", "EnumList"),
    ("Section D", "Q5", "What changes have happened in your business? ( The SHG member may not be able to give an exact number. In such a case ask for rough estimates but don’t pressure )", "Related_Q22_Trajectory", "InlineSubTable"),
    ("Section D", "Q6", "How has the income from the enterprise helped you financially? (Multiselect)", "FinancialHelpFromIncome", "EnumList"),

    # Section E
    ("Section E", "Q1", "How has been your husband’s response towards your enterprise? (Multiselect)", "HusbandFamilyResponse", "EnumList"),
    ("Section E", "Q2", "What is your level of comfort in sourcing material?", "MaterialSourcingComfort", "Enum"),
    ("Section E", "Q3", "Are you able to recover money from customers?", "CustomerPaymentRecovery", "Enum"),
    ("Section E", "Q4", "What are the challenges you are facing now? (Multiselect)", "CurrentChallenges", "EnumList"),
    ("Section E", "Q5a", "Same business scale", "Competitors_Similar_Scale", "Number"),
    ("Section E", "Q5b", "Smaller business scale than yours", "Competitors_Smaller_Scale", "Number"),
    ("Section E", "Q5c", "Higher business scale than yours", "Competitors_Higher_Scale", "Number"),
    ("Section E", "Q6", "What advantage do you have over your competitors? (Multiselect)", "CompetitorAdvantages", "EnumList"),

    # Section F
    ("Section F", "Q1", "For next one year, what are your plans to increase the scale of your business?", "FutureExpansionPlans", "Enum"),
    ("Section F", "Q2", "What is holding you back from pursuing these aspirations? (Multiselect, don't prompt)", "AspirationBottlenecks", "EnumList"),
    ("Section F", "Q3", "How much funds do you need to fund your plan?", "FutureFundsRequired", "Enum"),

    # Section G
    ("Section G", "Q1", "Have you attended any training under SVEP/OSF?", "AttendedTraining", "Enum"),
    ("Section G", "Q2", "If Yes, specify__________", "TrainingDetails", "Text"),
    ("Section G", "Q3", "Did you use any training component in your enterprise?", "UsedTrainingComponent", "Enum"),
    ("Section G", "Q4", "If Yes, specify__________", "UsedTrainingDetails", "Text"),
    ("Section G", "Q5a", "Income before the changes: Rs-------", "MonthlyIncomeBeforeLoan", "Price"),
    ("Section G", "Q5b", "Income after the changes: Rs---------", "MonthlyIncomeAfterLoan", "Price"),
    ("Section G", "Q6", "Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?", "MonthlyIncomeIncreaseByOSFSVEP", "Enum"),
    ("Section G", "Q7", "What has been the contribution of SVEP/OSF CRP in your enterprise? ( Multisepect)", "CRPContributions", "EnumList"),
    ("Section G", "Q8", "What are your expectations from the SVEP/OSF scheme? (Please prompt)", "ExpectationsFromScheme", "EnumList"),

    # Section H
    ("Section H", "Q1", "Do you own a smart phone?", "SmartphoneOwnership", "Enum"),
    ("Section H", "Q2", "Do you use QR code/mobile banking for money transactions?", "UseQRUPI", "Enum"),
    ("Section H", "Q3", "If yes, daily how many transactions in your business are done using QR code/mobile banking?", "QRDailyTransactions", "Enum"),
    ("Section H", "Q4", "If no, reason for not using QR code/mobile banking for money related transactions", "QRNonUseReason", "Enum"),
    ("Section H", "Q5", "Do you use social media for marketing?", "SocialMediaForMarketing", "Enum"),
    ("Section H", "Q6", "Which social media platforms do you use for your business? (Multiselect)", "SocialPlatformsUsed", "EnumList"),
    ("Section H", "Q7", "How do you use these platforms in your business?", "SocialPlatformUsageMode", "Enum"),
    ("Section H", "Q8", "How often do you use social media for your business?", "SocialMediaFrequency", "Enum"),

    # Section I
    ("Section I", "Q1", "In which year was the OSF intervention made?-------", "OSFInterventionYear", "Number"),
    ("Section I", "Q2", "Is your business still operational?", "BusinessOperationalStatus", "Enum"),
    ("Section I", "Q3", "What are the reasons for scaling down the business/closing the business? ( Don’t prompt)", "ScalingDownClosingReasons", "EnumList"),
    ("Section I", "Q4", "What kind of support could have helped you to manage your business?", "SupportNeededForSustenance", "Enum")
]

print(f"Total mapped question fields: {len(survey_columns_map)}")
with open('survey_columns_map.json', 'w', encoding='utf-8') as f:
    json.dump(survey_columns_map, f, ensure_ascii=False, indent=2)
