import csv

# Detailed mapping of all 9 sections in exact document order

SECTIONS = [
    {
        "name": "Section A: Basic details",
        "questions": [
            ("Q1", "District", "Q_A_01_00", "District", "Q1. District"),
            ("Q2", "Block", "Q_A_02_00", "Block", "Q2. Block"),
            ("Q3", "VillageGP", "Q_A_03_00", "Village / Gram Panchayat", "Q3. Village/GP"),
            ("Q4", "RespondentName", "Q_A_04_00", "Respondent Name", "Q4. Respondent Name"),
            ("Q5", "RespondentPhone / ContactNumber", "Q_A_04_01_PHONE / Q_A_04_01", "Contact Number", "Q5. Respondent’s phone number"),
            ("Q6", "SHGName", "Q_A_05_00", "SHG Name", "Q6. SHG Name"),
            ("Q7", "VOName", "Q_A_06_00", "VO Name", "Q7. VO Name"),
            ("Q8", "CLFName", "Q_A_07_00", "CLF Name", "Q8. CLF Name"),
            ("Q9", "SHGMembershipYears", "Q_A_08_00", "Years of SHG membership", "Q9. Years of SHG membership"),
            ("Q10", "LeadershipRole", "Q_A_09_00", "Have you been in a leadership role in SHG/CLF/VO?", "Q10. Have you been in a leadership role in SHG/CLF/VO?"),
            ("Q11", "LeadershipYears", "Q_A_10_00", "Years of experience in leadership roles?", "Q11. Years of experience in leadership roles?"),
            ("Q12", "RelatedToCRP", "Q_A_11_00", "Are you related to any of the SVEP/OSF CRP?", "Q12. Are you related to any of the SVEP/OSF CRP?"),
            ("Q13", "EPInterventionType", "Q_A_12_00", "Type of Enterprise Promotion (EP) intervention", "Q13. Type of Enterprise Promotion (EP) intervention"),
            ("Q14", "EnterpriseName", "Q_A_13_00", "Enterprise Name", "Q14. Enterprise Name"),
            ("-", "ParallelEnterpriseName", "Q_A_13_01", "Parallel Enterprise Name (if running two businesses)", "Parallel Enterprise Name"),
            ("Q15", "EnterpriseSetupYear", "Q_A_14_00", "Years of setting up enterprise (Year or count)", "Q15. Years of setting up enterprise"),
            ("Q16", "BusinessType", "Q_A_16_00", "Type of business enterprise (Multiselect)", "Q16. Type of business enterprise (Multiselect)"),
            ("Q17", "BusinessActivities", "Q_A_17_00", "Main business activities of the enterprise (Multiselect)", "Q17. Main business activities of the enterprise (Multiselect)"),
            ("-", "BusinessActivitiesOther", "Q_A_17_01", "Specify other business activity (if selected Any other)", "Specify other business activity"),
            ("Q18", "LoanReceivedYear", "Q_A_15_00", "Year of receiving SVEP/OSF loan?", "Q18. Years of receiving SVEP/OSF loan?"),
            ("Q19", "MaintainSeparateRecords", "Q_A_18_00", "Do you maintain separate records for all the businesses?", "Q19. Do you maintain separate records for all the businesses"),
            ("Q20", "RegistrationsDocuments", "Q_A_19_00", "Do you have the following registrations/documents?", "Q20. Do you have the following registrations/documents?")
        ]
    },
    {
        "name": "Section B: Respondent & Household Profile",
        "questions": [
            ("Q1", "RespondentAge", "Q_B_01_00", "What is the age of the respondent?", "Q1. What is the age of the respondent?"),
            ("Q2", "MaritalStatus", "Q_B_02_00", "What is the marital status?", "Q2. What is the marital status?"),
            ("Q3", "SocialCategory", "Q_B_03_00", "What is the social category?", "Q3. What is the social category?"),
            ("Q4", "EducationStatus", "Q_B_04_00", "What is the education status?", "Q4. What is the education status?"),
            ("Q5", "FamilyMemberCount", "Q_B_05_00", "How many members are in the family?", "Q5. How many members are in the family? ------- (count)"),
            ("Q6", "SubTable_FamilyCount", "Q_B_05", "Give details of the family members? (count)", "Q6. Give details of the family members? (count)"),
            ("Q6.1", "FamilyAdultsCount", "Q_B_06_01", "Adults (Above 18)", "Adults (Above 18)-------"),
            ("Q6.2", "FamilyChildrenCount", "Q_B_06_02", "Children", "Children —-------"),
            ("Q6.3", "FamilyTotalEarning", "Q_B_06_03", "Total earning members", "Total earning members ------"),
            ("Q6.4", "FamilyMaleEarning", "Q_B_06_04", "Male earning members", "Male earning members—----"),
            ("Q6.5", "FamilyFemaleEarning", "Q_B_06_05", "Female earning members", "Female earning members—----"),
            ("Q6.6", "FamilyDisabledCount", "Q_B_06_06", "Members with disability", "Members with disability-------"),
            ("Q7", "FamilyIncomeSources", "Q_B_07_00", "What are your family’s sources of income? (Multiselect)", "Q7. What are your family’s sources of income? (Multiselect)"),
            ("Q8", "AnnualHouseholdIncome", "Q_B_08_00", "What is your annual household income and monetary benefits from all sources?", "Q8. What is your annual household income and monetary benefits from all sources (including respondent’s enterprise)?")
        ]
    },
    {
        "name": "Section C: Enterprise operations",
        "questions": [
            ("Q1", "ReasonsStartingBusiness", "Q_C_01_00", "Reasons for starting the business? (Multiselect)", "Q1. Reasons for starting the business? (Multiselect)"),
            ("Q2", "BusinessCycle", "Q_C_02_00", "Describe your business cycle?", "Q2. Describe your business cycle?"),
            ("-", "BusinessCycleOther", "Q_C_02_01", "Specify other business cycle", "Specify other business cycle"),
            ("Q3", "BusinessPlaceType", "Q_C_03_00", "What is the type of business place?", "Q3. What is the type of business place?"),
            ("Q4", "AnnualRent", "Q_C_04_00", "If rented, what is annual rent? (Rs)", "Q4. If rented, what is monthly rent? Rs______( mention in numbers)"),
            ("Q5", "LocationConvenience", "Q_C_05_00", "Is the location of your premise convenient for your customers?", "Q5. Is the location of your premise convenient for your customers?"),
            ("-", "LocationConvenienceOther", "Q_C_05_01", "Specify other location convenience remark", "Specify other location convenience remark"),
            ("Q6", "Related_Q6_Labor", "Q_C_06_00", "Involvement of family members and hired help in business operations", "Q6. Involvement of family members and hired help in business operations"),
            ("Q7.1", "Sourcing_NearbyTown_Pct", "Q_C_07_01", "Nearby town/district (0%/25%/50%/75%/100%)", "Nearby town/district         (0%/25%/50%/75%/100%)"),
            ("Q7.2", "Sourcing_Jaipur_Pct", "Q_C_07_02", "Wholesale market within state (0%/25%/50%/75%/100%)", "Wholesale market within state    (0%/25%/50%/75%/100%)"),
            ("Q7.3", "Sourcing_OutsideState_Pct", "Q_C_07_03", "Wholesale market outside state (0%/25%/50%/75%/100%)", "Wholesale market outside the state    (0%/25%/50%/75%/100%)"),
            ("Q7.4", "Sourcing_Online_Pct", "Q_C_07_04", "Order online (Amazon/Meesho) (0%/25%/50%/75%/100%)", "Order online (Amazon/Misho)   (0%/25%/50%/75%/100%)"),
            ("Q8", "MarketingMethods", "Q_C_08_00", "How do you market your products/services? (Multiselect)", "Q8. How do you market your products/services? (Multiselect)"),
            ("-", "MarketingMethodsOther", "Q_C_08_01", "Specify other marketing method", "Specify other marketing method"),
            ("Q9", "SeasonalSalesMethod", "Q_C_09_00", "How do you sell your products/services?", "Q9. How do you sell your products/services?"),
            ("-", "SeasonalSalesOnlinePlatform", "Q_C_09_01", "Specify online platform used", "Specify online platform used"),
            ("-", "SeasonalSalesOther", "Q_C_09_02", "Specify other seasonal method", "Specify other selling method"),
            ("Q10.1", "SalesChannel_Online_Pct", "Q_C_10_01", "Online platforms %", "Online platforms ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)"),
            ("Q10.2", "SalesChannel_WhatsApp_Pct", "Q_C_10_02", "Whatsapp %", "Whatsapp ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)"),
            ("Q10.3", "SalesChannel_Instagram_Pct", "Q_C_10_03", "Instagram %", "Instagram ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)"),
            ("Q10.4", "SalesChannel_Premise_Pct", "Q_C_10_04", "Your premise %", "Your premise ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)"),
            ("Q10.5", "SalesChannel_Traders_Pct", "Q_C_10_05", "Local traders/shopkeepers %", "Local traders/shopkeepers ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)"),
            ("Q10.6", "SalesChannel_Haat_Pct", "Q_C_10_06", "Local haat/market %", "Local haat/market ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)"),
            ("Q10.7", "SalesChannel_Saras_Pct", "Q_C_10_07", "Saras fair %", "Saras fair ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)"),
            ("Q11", "RecordKeepingHabit", "Q_C_11_00", "Do you maintain written records of business transactions?", "Q11. Do you maintain written records of business transactions?"),
            ("Q12", "RecordKeepingMethod", "Q_C_12_00", "How do you maintain business transactions?", "Q12. How do you maintain business transactions?"),
            ("-", "RecordKeepingOther", "Q_C_12_01", "Specify other record keeping method", "Specify other record keeping method"),
            ("Q13", "Related_Q15_Turnover", "Q_C_13_00", "Turnover and income from the enterprise", "Q13. Turnover and income from the enterprise")
        ]
    },
    {
        "name": "Section D: Enterprise financing and income",
        "questions": [
            ("Q1", "SHGAssociationAssistance", "Q_D_01_00", "How has the SHG association helped in your enterprise? ( Multiselect)", "Q1. How has the SHG association helped in your enterprise? ( Multiselect)"),
            ("Q2", "Related_Q19_Capital", "Q_D_02_00", "How have you arranged capital over the enterprise duration? ( Ask for each option. Put 0 if the source is not used)", "Q2. How have you arranged capital over the enterprise duration? ( Ask for each option. Put 0 if the source is not used)"),
            ("Q3", "Related_Q20_Loan_Usage", "Q_D_03_00", "How did you use the loans taken from different sources?", "Q3. How did you use the loans taken from different sources?"),
            ("Q4", "FundingExperience", "Q_D_04_00", "What has been your experience in funding your business? (Multi select)", "Q4. What has been your experience in funding your business? (Multi select)"),
            ("Q5", "Related_Q22_Trajectory", "Q_D_05_00", "What changes have happened in your business?", "Q5. What changes have happened in your business? ( The SHG member may not be able to give an exact number. In such a case ask for rough estimates but don’t pressure )"),
            ("Q6", "FinancialHelpFromIncome", "Q_D_06_00", "How has the income from the enterprise helped you financially? (Multiselect)", "Q6. How has the income from the enterprise helped you financially? (Multiselect)"),
            ("Q6.1", "FinancialHelp_EducationAmt", "Q_D_06_ED", "Education related expenses amount (Rs)", "The income from enterprise is used in covering education related expenses for my children. Specify amount"),
            ("Q6.2", "FinancialHelp_DebtsAmt", "Q_D_06_DB", "Family debts repaid amount (Rs)", "I have been able to pay the family debts. Specify amount"),
            ("Q6.3", "FinancialHelp_AssetsAmt", "Q_D_06_AS", "Acquiring assets amount (Rs)", "I have contributed money in acquiring assets for my family Specify amount"),
            ("Q6.4", "FinancialHelp_MarriageAmt", "Q_D_06_MR", "Marriage expenses amount (Rs)", "I have contributed money for marriage expenses. Specify amount")
        ]
    },
    {
        "name": "Section E: Ease of doing business and challenges",
        "questions": [
            ("Q1", "HusbandFamilyResponse", "Q_E_01_00", "How has been your husband’s response towards your enterprise? (Multiselect)", "Q1. How has been your husband’s response towards your enterprise? (Multiselect)"),
            ("Q2", "MaterialSourcingComfort", "Q_E_02_00", "What is your level of comfort in sourcing material?", "Q2. What is your level of comfort in sourcing material?"),
            ("Q3", "CustomerPaymentRecovery", "Q_E_03_00", "Are you able to recover money from customers?", "Q3. Are you able to recover money from customers?"),
            ("Q4", "CurrentChallenges", "Q_E_04_00", "What are the challenges you are facing now? (Multiselect)", "Q4. What are the challenges you are facing now? (Multiselect)"),
            ("Q4.1", "Challenge_OSFPhasedOutAmt", "Q_E_04_01", "OSF phased out fund requirement amount (Rs)", "OSF is phased out now which has affected fund sufficiency. Specify amount"),
            ("Q4.2", "Challenge_ScaleUpFundAmt", "Q_E_04_02", "Timely funds needed for peak season (Rs)", "I need timely access to funds to buy inputs before the production/peak season begins. Specify amount"),
            ("Q4.3", "Challenge_TimelyInputsAmt", "Q_E_04_03", "Renovation / Input fund requirement (Rs)", "I need support to access bigger market to source material/inputs at lower cost"),
            ("Q4.4", "Challenge_Other", "Q_E_04_04", "Other challenges details", "Any other, specify"),
            ("Q5.1", "Competitors_Similar_Scale", "Q_D_06_01", "Similar scale competitors count", "Same business scale ______"),
            ("Q5.2", "Competitors_Smaller_Scale", "Q_D_06_02", "Smaller scale competitors count", "Smaller business scale than yours_______"),
            ("Q5.3", "Competitors_Higher_Scale", "Q_D_06_03", "Higher scale competitors count", "Higher business scale than yours_________"),
            ("Q6", "CompetitorAdvantages", "Q_E_06_00", "What advantage do you have over your competitors? (Multiselect)", "Q6. What advantage do you have over your competitors? (Multiselect)")
        ]
    },
    {
        "name": "Section F: Growth plans and aspirations",
        "questions": [
            ("Q1", "FutureExpansionPlans", "Q_F_01_00", "For next one year, what are your plans to increase the scale of your business?", "Q1. For next one year, what are your plans to increase the scale of your business?"),
            ("Q2", "AspirationBottlenecks", "Q_F_02_00", "What is holding you back from pursuing these aspirations? (Multiselect, don't prompt)", "Q2. What is holding you back from pursuing these aspirations? (Multiselect, don't prompt)"),
            ("Q3", "FutureFundsRequired", "Q_F_03_00", "How much funds do you need to fund your plan?", "Q3. How much funds do you need to fund your plan?")
        ]
    },
    {
        "name": "Section G: Impact of SVEP/OSF schemes on women-led enterprises",
        "questions": [
            ("Q1", "AttendedTraining", "Q_G_01_00", "Have you attended any training under SVEP/OSF?", "Q1. Have you attended any training under SVEP/OSF?"),
            ("Q2", "TrainingDetails", "Q_G_02_00", "If Yes, specify training topic", "Q2. If Yes, specify__________"),
            ("Q3", "UsedTrainingComponent", "Q_G_03_00", "Did you use any training component in your enterprise?", "Q3. Did you use any training component in your enterprise?"),
            ("Q4", "UsedTrainingDetails", "Q_G_04_00", "If Yes, specify component", "Q4. If Yes, specify__________"),
            ("Q5.1", "MonthlyIncomeBeforeLoan", "Q_G_05_01", "Income before changes (Rs)", "Income before the changes: Rs-------"),
            ("Q5.2", "MonthlyIncomeAfterLoan", "Q_G_05_02", "Income after changes (Rs)", "Income after the changes: Rs---------"),
            ("Q6", "MonthlyIncomeIncreaseByOSFSVEP", "Q_G_06_00", "Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?", "Q6. Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?"),
            ("Q7", "CRPContributions", "Q_G_07_00", "What has been the contribution of SVEP/OSF CRP in your enterprise? ( Multisepect)", "Q7. What has been the contribution of SVEP/OSF CRP in your enterprise? ( Multisepect)"),
            ("Q8", "ExpectationsFromScheme", "Q_G_08_00", "What are your expectations from the SVEP/OSF scheme? (Please prompt)", "Q8. What are your expectations from the SVEP/OSF scheme? (Please prompt)"),
            ("-", "Other_Specify", "Q_G_08_01", "Specify other expectation", "Any other, Specify")
        ]
    },
    {
        "name": "Section H: Use of online transactions and social media",
        "questions": [
            ("Q1", "SmartphoneOwnership", "Q_H_01_00", "Do you own a smart phone?", "Q1. Do you own a smart phone?"),
            ("Q2", "UseQRUPI", "Q_H_02_00", "Do you use QR code/mobile banking for money transactions?", "Q2. Do you use QR code/mobile banking for money transactions?"),
            ("Q3", "QRDailyTransactions", "Q_H_03_00", "If yes, daily how many transactions in your business are done using QR code/mobile banking?", "Q3. If yes, daily how many transactions in your business are done using QR code/mobile banking?"),
            ("Q4", "QRNonUseReason", "Q_H_04_00", "If no, reason for not using QR code/mobile banking for money related transactions", "Q4. If no, reason for not using QR code/mobile banking for money related transactions"),
            ("Q5", "SocialMediaForMarketing", "Q_H_05_00", "Do you use social media for marketing?", "Q5. Do you use social media for marketing?"),
            ("Q6", "SocialPlatformsUsed", "Q_H_06_00", "Which social media platforms do you use for your business? (Multiselect)", "Q6. Which social media platforms do you use for your business? (Multiselect)"),
            ("Q7", "SocialPlatformUsageMode", "Q_H_07_00", "How do you use these platforms in your business?", "Q7. How do you use these platforms in your business?"),
            ("Q8", "SocialMediaFrequency", "Q_H_08_00", "How often do you use social media for your business?", "Q8. How often do you use social media for your business?")
        ]
    },
    {
        "name": "Section I: Status of post-exit OSF intervention in Baran and Ratangadh",
        "questions": [
            ("Q1", "OSFInterventionYear", "Q_I_01_00", "In which year was the OSF intervention made?-------", "Q1. In which year was the OSF intervention made?-------"),
            ("Q2", "BusinessOperationalStatus", "Q_I_02_00", "Is your business still operational?", "Q2. Is your business still operational?"),
            ("Q3", "ScalingDownClosingReasons", "Q_I_03_00", "What are the reasons for scaling down the business/closing the business? ( Don’t prompt)", "Q3. What are the reasons for scaling down the business/closing the business? ( Don’t prompt)"),
            ("-", "ScalingDownOtherReason", "Q_I_03_01", "Specify other closing reason", "Any other, specify…….."),
            ("Q4", "SupportNeededForSustenance", "Q_I_04_00", "What kind of support could have helped you to manage your business?", "Q4. What kind of support could have helped you to manage your business?"),
            ("-", "SupportNeededOther", "Q_I_04_01", "Specify other support needed", "Any other, specify")
        ]
    }
]

print("Master Section Comparison Schema ready!")
