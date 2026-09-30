import json

survey_cols = [
    # Metadata (6)
    "ID", "Status", "InvestigatorID", "CreatedOn", "Latitude", "Longitude",
    # Section A (22)
    "District", "Block", "VillageGP", "RespondentName", "SHGName", "VOName", "CLFName",
    "SHGMembershipYears", "LeadershipRole", "LeadershipYears", "RelatedToCRP", "EPInterventionType",
    "EnterpriseName", "EnterpriseSetupYear", "LoanReceivedYear", "BusinessType", "BusinessActivities",
    "BusinessActivitiesOther", "MaintainSeparateRecords", "RespondentPhone", "RegistrationsDocuments",
    "RegistrationsDocumentsOther",
    # Section B (13)
    "RespondentAge", "MaritalStatus", "SocialCategory", "EducationStatus", "FamilyMemberCount",
    "FamilyAdultsCount", "FamilyChildrenCount", "FamilyTotalEarning", "FamilyMaleEarning",
    "FamilyFemaleEarning", "FamilyDisabledCount", "FamilyIncomeSources", "AnnualHouseholdIncome",
    # Section C (23)
    "ReasonsStartingBusiness", "ReasonsStartingBusinessOther", "BusinessCycle", "BusinessCycleOther",
    "BusinessPlaceType", "MonthlyRent", "LocationConvenience", "LocationConvenienceOther",
    "MaterialSourcingPct", "MarketingMethods", "MarketingMethodsOther", "SeasonalSalesMethod",
    "SeasonalSalesOther", "SocialMediaForMarketing", "SocialMediaForMarketingOther", "SalesChannelsPct",
    "RecordKeepingHabit", "RecordKeepingMethod", "RecordKeepingOther", "SHGAssociationAssistance",
    "MonthlyIncomeIncreaseByOSFSVEP", "FinancialHelpFromIncome", "FinancialHelpOther",
    # Section D (15)
    "HusbandFamilyResponse", "MaterialSourcingComfort", "CustomerPaymentRecovery", "FundingExperience",
    "CurrentChallenges", "CurrentChallengesOther", "Competitors_Same_Scale", "Competitors_Smaller_Scale",
    "Competitors_Higher_Scale", "CompetitorAdvantages", "CompetitorAdvantagesOther", "FutureExpansionPlans",
    "FutureExpansionPlansOther", "AspirationBottlenecks", "AspirationBottlenecksOther",
    # Section E (9)
    "AttendedTraining", "TrainingDetails", "UsedTrainingComponent", "UsedTrainingDetails",
    "MonthlyIncomeBeforeLoan", "MonthlyIncomeAfterLoan", "CRPContributions", "CRPContributionDocDetails",
    "ExpectationsFromScheme",
    # Section F (7)
    "SmartphoneOwnership", "UseQRUPI", "QRDailyTransactions", "QRNonUseReason",
    "SocialPlatformsUsed", "SocialPlatformUsageMode", "SocialMediaFrequency",
    # Section G (7)
    "OSFInterventionYear", "BusinessOperationalStatus", "BusinessClosureYear",
    "ScalingDownClosingReasons", "ScalingDownOtherReason", "SupportNeededForSustenance", "SupportNeededOther"
]

print(f"Total survey columns: {len(survey_cols)}")
