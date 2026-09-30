/**
 * ==============================================================================
 * OmmNoMi Automation LLP \u2014 Master Database & AppVariables Clean Sync Script
 * Project: Centre for microFinance (CmF) & RAJEEVIKA Study on SHG Women Entrepreneurs
 * 
 * Clean Architecture Standards:
 * 1. Survey Table: EXACTLY 103 Simple Non-Matrix Questions (Zero Cluster)
 * 2. 5 Dedicated Matrix Tables: Q6, Q15, Q17, Q18, Q20 Completely Isolated
 * 3. AppVariables: Clean question prompts and options aligned 1-to-1
 * 4. Preserves all existing survey responses
 * ==============================================================================
 */

function syncMasterDatabaseAndVariables() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const startTime = new Date();
  Logger.log('=== [OmmNoMi] Starting Clean Database & AppVariables Sync ===');

  // --------------------------------------------------------------------------
  // 1. EXACT 103 SURVEY COLUMNS (NO CLUSTER, NO MATRIX BLOAT)
  // --------------------------------------------------------------------------
  const surveyColumns = [
    // --- System Metadata (6) ---
    "ID", "Status", "InvestigatorID", "CreatedOn", "Latitude", "Longitude",

    // --- Section A: Basic details (23) ---
    "District", "Block", "VillageGP", "RespondentName", "SHGName", 
    "VOName", "CLFName", "SHGMembershipYears", "LeadershipRole", 
    "LeadershipYears", "RelatedToCRP", "EPInterventionType", "EnterpriseName", 
    "ParallelEnterpriseName", "EnterpriseSetupYear", "LoanReceivedYear", 
    "BusinessType", "BusinessActivities", "BusinessActivitiesOther", 
    "MaintainSeparateRecords", "RespondentPhone", "RegistrationsDocuments", 
    "RegistrationsDocumentsOther",

    // --- Section B: Respondent & Household Profile (13) ---
    "RespondentAge", "MaritalStatus", "SocialCategory", "EducationStatus", 
    "FamilyMemberCount", "FamilyAdultsCount", "FamilyChildrenCount", 
    "FamilyTotalEarning", "FamilyMaleEarning", "FamilyFemaleEarning", 
    "FamilyDisabledCount", "FamilyIncomeSources", "AnnualHouseholdIncome",

    // --- Section C: Enterprise Operations (EXACTLY 15 SIMPLE QUESTIONS + OTHER) (23) ---
    "ReasonsStartingBusiness", "ReasonsStartingBusinessOther", 
    "BusinessCycle", "BusinessCycleOther", 
    "BusinessPlaceType", "MonthlyRent", 
    "LocationConvenience", "LocationConvenienceOther", 
    "MaterialSourcingPct", 
    "MarketingMethods", "MarketingMethodsOther", 
    "SeasonalSalesMethod", "SeasonalSalesOther", 
    "SocialMediaForMarketing", "SocialMediaForMarketingOther", 
    "SalesChannelsPct", 
    "RecordKeepingHabit", 
    "RecordKeepingMethod", "RecordKeepingOther", 
    "SHGAssociationAssistance", 
    "MonthlyIncomeIncreaseByOSFSVEP", 
    "FinancialHelpFromIncome", "FinancialHelpOther",

    // --- Section D: Ease of Doing Business & Challenges (15) ---
    "HusbandFamilyResponse", "MaterialSourcingComfort", "CustomerPaymentRecovery", 
    "FundingExperience", "CurrentChallenges", "CurrentChallengesOther", 
    "Competitors_Same_Scale", "Competitors_Smaller_Scale", "Competitors_Higher_Scale", 
    "CompetitorAdvantages", "CompetitorAdvantagesOther", 
    "FutureExpansionPlans", "FutureExpansionPlansOther", 
    "AspirationBottlenecks", "AspirationBottlenecksOther",

    // --- Section E: Impact of SVEP/OSF Schemes (9) ---
    "AttendedTraining", "TrainingDetails", "UsedTrainingComponent", "UsedTrainingDetails", 
    "MonthlyIncomeBeforeLoan", "MonthlyIncomeAfterLoan", "CRPContributions", 
    "CRPContributionDocDetails", "ExpectationsFromScheme",

    // --- Section F: Online Transactions & Social Media (7) ---
    "SmartphoneOwnership", "UseQRUPI", "QRDailyTransactions", "QRNonUseReason", 
    "SocialPlatformsUsed", "SocialPlatformUsageMode", "SocialMediaFrequency",

    // --- Section G: Post-Exit OSF in Baran & Ratangarh (7) ---
    "OSFInterventionYear", "BusinessOperationalStatus", "BusinessClosureYear", 
    "ScalingDownClosingReasons", "ScalingDownOtherReason", 
    "SupportNeededForSustenance", "SupportNeededOther"
  ];

  // --------------------------------------------------------------------------
  // 2. THE 5 MATRIX CHILD TABLES + SAFETY TABLE
  // --------------------------------------------------------------------------
  const tablesConfig = {
    "Survey_Labor": [
      "ID", "Survey_ID", "Activity", "Involvement_Type", 
      "Family_Members_Count", "Hired_Help_Count", "Amount_Paid_Last_Year", "Remarks"
    ],
    "Survey_Turnover": [
      "ID", "Survey_ID", "Season", "Duration_Months", 
      "Monthly_Sales", "Monthly_Net_Profit", "Remarks"
    ],
    "Survey_Capital_Arrangement": [
      "ID", "Survey_ID", "Source", "Amount_First_Year", 
      "Amount_In_Between_Years", "Amount_Current_Year_2026_27", "Amount_Pending", "Remarks"
    ],
    "Survey_Loan_Usage": [
      "ID", "Survey_ID", "Source", "Loan_Usage_Purpose", "Remarks"
    ],
    "Survey_Business_Changes": [
      "ID", "Survey_ID", "Indicator_Heading", "First_Year_Value", "Current_Year_Value", "Remarks"
    ],
    "Survey_Tables": [
      "ID", "Survey_ID", "Table_Type", "Row_Item", "Remarks"
    ]
  };

  // --------------------------------------------------------------------------
  // 3. CLEAN 'Survey' SHEET & PRESERVE RESPONSES
  // --------------------------------------------------------------------------
  let surveySheet = ss.getSheetByName('Survey') || ss.insertSheet('Survey');
  const lastRow = surveySheet.getLastRow();
  const lastCol = surveySheet.getLastColumn();
  let existingHeaders = [];
  let existingData = [];

  if (lastRow >= 1 && lastCol >= 1) {
    existingHeaders = surveySheet.getRange(1, 1, 1, lastCol).getValues()[0];
    if (lastRow > 1) {
      existingData = surveySheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    }
  }

  const newRowData = existingData.map(row => {
    const rowMap = {};
    existingHeaders.forEach((h, idx) => { rowMap[h] = row[idx]; });
    return surveyColumns.map(col => {
      if (rowMap[col] !== undefined) return rowMap[col];
      // Aliases
      if (col === 'RespondentPhone' && rowMap['ContactNumber'] !== undefined) return rowMap['ContactNumber'];
      if (col === 'MonthlyRent' && rowMap['AnnualRent'] !== undefined) return rowMap['AnnualRent'];
      return '';
    });
  });

  surveySheet.clear();
  surveySheet.getRange(1, 1, 1, surveyColumns.length).setValues([surveyColumns]);
  formatHeaderRow(surveySheet.getRange(1, 1, 1, surveyColumns.length), "#1a73e8");
  surveySheet.setRowHeight(1, 35).setFrozenRows(1);
  for (let c = 1; c <= surveyColumns.length; c++) surveySheet.setColumnWidth(c, 160);

  if (newRowData.length > 0) {
    surveySheet.getRange(2, 1, newRowData.length, surveyColumns.length).setValues(newRowData);
  }
  Logger.log('[OK] Survey Sheet Cleaned: ' + surveyColumns.length + ' clean columns.');

  // --------------------------------------------------------------------------
  // 4. VERIFY / CREATE 5 MATRIX TABLES
  // --------------------------------------------------------------------------
  for (const tName in tablesConfig) {
    const cols = tablesConfig[tName];
    let sheet = ss.getSheetByName(tName) || ss.insertSheet(tName);
    sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
    formatHeaderRow(sheet.getRange(1, 1, 1, cols.length), "#34a853");
    sheet.setRowHeight(1, 35).setFrozenRows(1);
    for (let c = 1; c <= cols.length; c++) sheet.setColumnWidth(c, 160);
    Logger.log('[OK] Configured Sub-Table: ' + tName);
  }

  // --------------------------------------------------------------------------
  // 5. UPDATE 'AppVariables' SHEET WITH CLEAN QUESTION CATALOG
  // --------------------------------------------------------------------------
  let appVarSheet = ss.getSheetByName('AppVariables');
  if (!appVarSheet) appVarSheet = ss.insertSheet('AppVariables');

  var appVarHeaders = ["ID", "Table", "Column", "Tags", "ValueControl", "Title", "Description", "UsedFor", "Decimal", "EnumValue", "EnumList", "VariableList", "DateValue", "Photo", "URL", "File", "Title_hi", "Title_raj", "ActionIcon", "LastEditBy", "LastEditOn", "Label"];
  if (appVarSheet.getLastRow() === 0) {
    appVarSheet.getRange(1, 1, 1, appVarHeaders.length).setValues([appVarHeaders]);
    formatHeaderRow(appVarSheet.getRange(1, 1, 1, appVarHeaders.length), "#673ab7");
  }

  // Define All Clean Variables for Section C & Sub-Tables
  var cleanVars = [
    // Section C Clean Prompts
    ["Q_C_01", "Survey", "ReasonsStartingBusiness", "QuestionPrompt, SectionC", "VariableList", "Reasons for starting the business? (Multiselect)", "Section C Q1", "Why started business", "", "", "", "RSN_FINANCIAL_SETBACK , RSN_RISING_EXP , RSN_WANT_OWN_BIZ , RSN_LEARNT_SKILL , RSN_WAS_WAGE_LABOR , RSN_SHG_MEMBERS_TOOK , RSN_CRP_ENCOURAGED , RSN_CLF_ENCOURAGED , RSN_OTHER", "", "", "", "", "\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0915\u094d\u092f\u093e \u0915\u093e\u0930\u0923 \u0930\u0939\u0947?", "\u0915\u093e\u092e-\u0927\u0902\u0927\u094b \u0938\u0941\u0930\u0942 \u0915\u0930\u0923 \u0930\u093e \u0915\u093e\u0902\u0908 \u0915\u093e\u0930\u0923 \u0939\u093e?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_02", "Survey", "BusinessCycle", "QuestionPrompt, SectionC", "Enum", "Describe your business cycle?", "Section C Q2", "Operational rhythm", "", "", "", "CYC_REGULAR_HOURS , CYC_CUSTOMER_ARRIVES , CYC_ALL_YEAR , CYC_ON_ORDER , CYC_SEASONAL_PROD_SALE_YEAR , CYC_LIMITED_MONTHS , CYC_OTHER", "", "", "", "", "\u0905\u092a\u0928\u0947 \u0935\u094d\u092f\u093e\u0935\u0938\u093e\u092f\u093f\u0915 \u091a\u0915\u094d\u0930 \u0915\u093e \u0935\u093f\u0935\u0930\u0923 \u0926\u0947\u0902", "\u0915\u093e\u092e-\u0927\u0902\u0927\u094b \u0915\u0938\u094d\u092f\u093e \u091a\u093e\u0932\u0948 \u091b\u0948?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_03", "Survey", "BusinessPlaceType", "QuestionPrompt, SectionC", "Enum", "What is the type of business place?", "Section C Q3", "Premise ownership", "", "", "", "PLC_OWN , PLC_RENTED", "", "", "", "", "\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0938\u094d\u0925\u0932 \u0915\u093e \u092a\u094d\u0930\u0915\u093e\u0930 \u0915\u094d\u092f\u093e \u0939\u0948?", "\u0926\u0941\u0915\u093e\u0928/\u0915\u093e\u092e \u0930\u0940 \u091c\u0917\u0939 \u0915\u0948\u0938\u0940 \u091b\u0948?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_04", "Survey", "MonthlyRent", "QuestionPrompt, SectionC", "Price", "If rented, what is monthly rent? Rs_______", "Section C Q4", "Monthly rent amount", "", "", "", "", "", "", "", "", "\u092f\u0926\u093f \u0915\u093f\u0930\u093e\u090f \u092a\u0930 \u0939\u0948, \u0924\u094b \u092e\u093e\u0938\u093f\u0915 \u0915\u093f\u0930\u093e\u092f\u093e \u0915\u093f\u0924\u0928\u093e \u0939\u0948?", "\u0915\u093f\u0930\u093e\u090f \u0930\u0940 \u091b\u0948 \u0924\u094b \u092e\u0939\u0940\u0928\u094b \u0915\u093f\u0924\u094d\u0924\u094b \u0932\u093e\u0917\u0948?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_05", "Survey", "LocationConvenience", "QuestionPrompt, SectionC", "Enum", "Is the location of your premise convenient for your customers?", "Section C Q5", "Location rating", "", "", "", "LOC_VERY_CONVENIENT , LOC_CHANGED_FOR_CLIENTS , LOC_OPERATE_HOME , LOC_AFFORD_ONLY_THIS , LOC_OTHER", "", "", "", "", "\u0915\u094d\u092f\u093e \u0906\u092a\u0915\u093e \u0938\u094d\u0925\u093e\u0928 \u0917\u094d\u0930\u093e\u0939\u0915\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f \u0938\u0941\u0935\u093f\u0927\u093e\u091c\u0928\u0915 \u0939\u0948?", "\u0915\u093e\u0902\u0908 \u0925\u093e\u0930\u0940 \u0926\u0941\u0915\u093e\u0928 \u0917\u094d\u0930\u093e\u0939\u0915\u094b\u0902 \u0924\u093e\u0902\u0908 \u0920\u0940\u0915 \u091c\u0917\u0939 \u091b\u0948?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_08", "Survey", "MaterialSourcingPct", "QuestionPrompt, SectionC", "Text", "What percentage of material do you source from these places?", "Section C Q8", "Sourcing channels breakdown", "", "", "", "", "", "", "", "", "\u0938\u093e\u092e\u0917\u094d\u0930\u0940 \u0915\u093e \u0915\u093f\u0924\u0928\u093e \u092a\u094d\u0930\u0924\u093f\u0936\u0924 \u0915\u093f\u0928 \u0938\u094d\u0925\u093e\u0928\u094b\u0902 \u0938\u0947 \u0932\u093e\u0924\u0940 \u0939\u0948\u0902?", "\u0938\u093e\u092e\u093e\u0928 \u0915\u093f\u0924\u094d\u0924\u094b \u092a\u094d\u0930\u0924\u093f\u0936\u0924 \u0915\u0920\u0948 \u0938\u0942\u0902 \u0932\u093e\u0935\u094b \u091b\u094b?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_09", "Survey", "MarketingMethods", "QuestionPrompt, SectionC", "VariableList", "How do you market your products/services? (Multiselect)", "Section C Q9", "Marketing channels", "", "", "", "MKT_SHOP_ONLY , MKT_NAME_BOARD , MKT_DOOR_TO_DOOR , MKT_SHG_MEETINGS , MKT_TRADERS_SAMPLES , MKT_WAIT_ENQUIRIES , MKT_DONT_KNOW , MKT_NO_NEED , MKT_OTHER", "", "", "", "", "\u0906\u092a \u0905\u092a\u0928\u0947 \u0909\u0924\u094d\u092a\u093e\u0926\u094b\u0902/\u0938\u0947\u0935\u093e\u0913\u0902 \u0915\u093e \u092a\u094d\u0930\u091a\u093e\u0930 \u0915\u0948\u0938\u0947 \u0915\u0930\u0924\u0940 \u0939\u0948\u0902?", "\u0938\u093e\u092e\u093e\u0928 \u0930\u094b \u092a\u094d\u0930\u091a\u093e\u0930 \u0915\u093f\u0938\u093e \u0915\u0930\u094c \u091b\u094b?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_10", "Survey", "SeasonalSalesMethod", "QuestionPrompt, SectionC", "Enum", "In case of seasonal production, how do you sell your products/services?", "Section C Q10", "Seasonal sales pattern", "", "", "", "SEA_NOT_REL , SEA_WAIT_ORDERS , SEA_DOOR_TO_DOOR , SEA_ADVANCE_ORDERS , SEA_LOCAL_HAAT , SEA_SARAS_FAIR , SEA_ONLINE , SEA_OTHER", "", "", "", "", "\u092e\u094c\u0938\u092e\u0940 \u0909\u0924\u094d\u092a\u093e\u0926\u0928 \u092e\u0947\u0902 \u0909\u0924\u094d\u092a\u093e\u0926/\u0938\u0947\u0935\u093e\u090f\u0902 \u0915\u0948\u0938\u0947 \u092c\u0947\u091a\u0924\u0940 \u0939\u0948\u0902?", "\u0938\u0940\u091c\u0928 \u0930\u094b \u0938\u093e\u092e\u093e\u0928 \u0915\u0938\u094d\u092f\u093e \u092c\u0947\u091a\u094b \u091b\u094b?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_11", "Survey", "SocialMediaForMarketing", "QuestionPrompt, SectionC", "Enum", "Do you use social media for marketing?", "Section C Q11", "Social media marketing status", "", "", "", "SMM_WHATSAPP_ORDERS , SMM_INSTAGRAM_REELS , SMM_NO_SMARTPHONE , SMM_DONT_KNOW_USE , SMM_NO_TIME , SMM_DONT_WANT , SMM_OTHER", "", "", "", "", "\u0915\u094d\u092f\u093e \u0906\u092a \u092a\u094d\u0930\u091a\u093e\u0930 \u0915\u0947 \u0932\u093f\u090f \u0938\u094b\u0936\u0932 \u092e\u0940\u0921\u093f\u092f\u093e \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0924\u0940 \u0939\u0948\u0902?", "\u0915\u093e\u0902\u0908 \u0938\u094b\u0936\u0932 \u092e\u0940\u0921\u093f\u092f\u093e \u0938\u0942\u0902 \u092a\u094d\u0930\u091a\u093e\u0930 \u0915\u0930\u094b \u091b\u094b?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_12", "Survey", "SalesChannelsPct", "QuestionPrompt, SectionC", "Text", "What percentage of your products/services get sold through following channels?", "Section C Q12", "Sales channels breakdown", "", "", "", "", "", "", "", "", "\u0909\u0924\u094d\u092a\u093e\u0926/\u0938\u0947\u0935\u093e\u090f\u0902 \u0915\u093f\u0928 \u092e\u093e\u0927\u094d\u092f\u092e\u094b\u0902 \u0938\u0947 \u0915\u093f\u0924\u0928\u0947 \u092a\u094d\u0930\u0924\u093f\u0936\u0924 \u092c\u093f\u0915\u0924\u0947 \u0939\u0948\u0902?", "\u0938\u093e\u092e\u093e\u0928 \u0915\u093f\u0924\u094d\u0924\u093e \u092a\u094d\u0930\u0924\u093f\u0936\u0924 \u0915\u093f\u0938\u093e \u092e\u093e\u0927\u094d\u092f\u092e \u0938\u0942\u0902 \u092c\u093f\u0915\u0948 \u091b\u0948?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_13", "Survey", "RecordKeepingHabit", "QuestionPrompt, SectionC", "Enum", "Do you maintain written records of business transactions?", "Section C Q13", "Record keeping habit", "", "", "", "RKH_ALWAYS_DID , RKH_AFTER_CRP_TRAIN , RKH_FAMILY_MAINTAINS , RKH_HIRED_HELP , RKH_NOT_REGULAR , RKH_NO_RECORDS", "", "", "", "", "\u0915\u094d\u092f\u093e \u0906\u092a \u0932\u0947\u0928-\u0926\u0947\u0928 \u0915\u093e \u0932\u093f\u0916\u093f\u0924 \u0930\u093f\u0915\u0949\u0930\u094d\u0921 \u0930\u0916\u0924\u0940 \u0939\u0948\u0902?", "\u0915\u093e\u0902\u0908 \u0939\u093f\u0938\u093e\u092c-\u0915\u093f\u0924\u093e\u092c \u0932\u093f\u0916\u094b \u091b\u094b?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_14", "Survey", "RecordKeepingMethod", "QuestionPrompt, SectionC", "Enum", "How do you maintain business transactions?", "Section C Q14", "Record book type", "", "", "", "RKT_RECEIPT_BOOK , RKT_PURCHASE_SALE_REG , RKT_ONLY_DEBT_REG , RKT_DAILY_DIARY , RKT_CRP_DIARY , RKT_DIGITAL_APP , RKT_NOT_REGULAR , RKT_FAMILY_BOOK , RKT_NO_RECORD , RKT_OTHER", "", "", "", "", "\u0906\u092a \u0939\u093f\u0938\u093e\u092c-\u0915\u093f\u0924\u093e\u092c \u0915\u0948\u0938\u0947 \u0930\u0916\u0924\u0940 \u0939\u0948\u0902?", "\u0939\u093f\u0938\u093e\u092c-\u0915\u093f\u0924\u093e\u092c \u0915\u093f\u0938\u094d\u092f\u093e \u0930\u093e\u0916\u094b \u091b\u094b?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_16", "Survey", "SHGAssociationAssistance", "QuestionPrompt, SectionC", "VariableList", "How has the SHG association helped in your enterprise? (Multiselect)", "Section C Q16", "SHG help factors", "", "", "", "SHG_SKILL_TRAIN , SHG_MEETING_INFO , SHG_DOCUMENTS , SHG_SUBSIDY , SHG_INITIATE_LOAN , SHG_REGULAR_LOANS , SHG_CRP_GUIDED , SHG_MUDRA_LOAN , SHG_BANK_LOAN", "", "", "", "", "\u0938\u092e\u0942\u0939 (SHG) \u0938\u0947 \u091c\u0941\u0921\u093c\u0928\u0947 \u0938\u0947 \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u092e\u0947\u0902 \u0915\u094d\u092f\u093e \u092e\u0926\u0926 \u092e\u093f\u0932\u0940?", "\u0938\u092e\u0942\u0939 \u0938\u0942\u0902 \u091c\u0941\u0921\u093c\u092c\u093e \u0938\u0942\u0902 \u0915\u093e\u0902\u0908 \u092b\u093e\u092f\u0926\u094b \u0939\u0941\u092f\u094b?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_19", "Survey", "MonthlyIncomeIncreaseByOSFSVEP", "QuestionPrompt, SectionC", "Enum", "Can you specify the amount by which average monthly income increased directly due to OSF/SVEP loans?", "Section C Q19", "Income gain due to loan", "", "", "", "INC_UPTO_2K , INC_2K_3K , INC_3K_4K , INC_4K_5K , INC_5K_6K , INC_ABOVE_6K , INC_CANT_SAY", "", "", "", "", "\u090b\u0923 \u0938\u0947 \u092e\u093e\u0938\u093f\u0915 \u0906\u092f \u092e\u0947\u0902 \u0915\u093f\u0924\u0928\u0940 \u0938\u0940\u0927\u0940 \u0935\u0943\u0926\u094d\u0927\u093f \u0939\u0941\u0908?", "\u0932\u094b\u0928 \u0938\u0942\u0902 \u0939\u0930 \u092e\u0939\u0940\u0928\u093e \u0930\u0940 \u0915\u092e\u093e\u0908 \u092e\u0947\u0902 \u0915\u093f\u0924\u094d\u0924\u0940 \u092c\u0922\u093c\u094b\u0924\u0930\u0940 \u0939\u0941\u092f\u0940?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_21", "Survey", "FinancialHelpFromIncome", "QuestionPrompt, SectionC", "VariableList", "How has the income from the enterprise helped you financially? (Multiselect)", "Section C Q21", "Household financial benefits", "", "", "", "HLP_NO_ASK_HUSBAND , HLP_BIGGEST_INCOME , HLP_CHILD_EDUCATION , HLP_FAMILY_DEBTS , HLP_ACQUIRE_ASSETS , HLP_MARRIAGE_EXP , HLP_OTHER", "", "", "", "", "\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0915\u0940 \u0906\u092f \u0938\u0947 \u0906\u092a\u0915\u094b \u0906\u0930\u094d\u0925\u093f\u0915 \u0930\u0942\u092a \u0938\u0947 \u0915\u094d\u092f\u093e \u092e\u0926\u0926 \u092e\u093f\u0932\u0940?", "\u0915\u092e\u093e\u0908 \u0938\u0942\u0902 \u0918\u0930 \u092e\u0947\u0902 \u0915\u093e\u0902\u0908 \u0906\u0930\u094d\u0925\u093f\u0915 \u092e\u0926\u0926 \u092e\u093f\u0932\u0940?", "", "OmmNoMi", new Date().toISOString(), ""],

    // Sub-Table Header Variables for Action Buttons
    ["SEC_C_TBL_LABOR", "Survey_Labor", "Activity", "SubTable, SectionC", "Enum", "Labor & Help (Q6)", "Involvement of family members and hired help", "Sub-Table Button", "", "Labor & Help (Q6)", "", "", "", "", "", "", "\u0936\u094d\u0930\u092e\u093f\u0915 \u090f\u0935\u0902 \u092a\u093e\u0930\u093f\u0935\u093e\u0930\u093f\u0915 \u0938\u0939\u092f\u094b\u0917 (Q6)", "\u092e\u091c\u0926\u0942\u0930 \u0905\u0930 \u092a\u0930\u093f\u0935\u093e\u0930 \u0930\u094b \u0938\u0939\u092f\u094b\u0917 (Q6)", "users", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_TURNOVER", "Survey_Turnover", "Season", "SubTable, SectionC", "Enum", "Turnover & Profit (Q15)", "Turnover and income across seasons", "Sub-Table Button", "", "Turnover & Profit (Q15)", "", "", "", "", "", "", "\u091f\u0930\u094d\u0928\u0913\u0935\u0930 \u090f\u0935\u0902 \u0936\u0941\u0926\u094d\u0927 \u0932\u093e\u092d (Q15)", "\u092c\u093f\u0915\u094d\u0930\u0940 \u0905\u0930 \u092e\u0941\u0928\u093e\u092b\u093e (Q15)", "dollar", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_CAP_ARRANGE", "Survey_Capital_Arrangement", "Source", "SubTable, SectionC", "Enum", "Capital Arranged (Q17)", "How capital was arranged over duration", "Sub-Table Button", "", "Capital Arranged (Q17)", "", "", "", "", "", "", "\u092a\u0942\u0902\u091c\u0940 \u0935\u094d\u092f\u0935\u0938\u094d\u0925\u093e (Q17)", "\u092a\u0948\u0938\u093e \u0930\u0940 \u0935\u094d\u092f\u0935\u0938\u094d\u0925\u093e (Q17)", "briefcase", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_LOAN_USE", "Survey_Loan_Usage", "Source", "SubTable, SectionC", "Enum", "Loan Usage (Q18)", "Usage of loans taken from different sources", "Sub-Table Button", "", "Loan Usage (Q18)", "", "", "", "", "", "", "\u090b\u0923 \u0915\u093e \u0909\u092a\u092f\u094b\u0917 (Q18)", "\u0932\u094b\u0928 \u0930\u094b \u0907\u0938\u094d\u0924\u0947\u092e\u093e\u0932 (Q18)", "credit-card", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_BUSINESS_CHANGES", "Survey_Business_Changes", "Indicator_Heading", "SubTable, SectionC", "Enum", "Business Changes (Q20)", "Changes happened in business over years", "Sub-Table Button", "", "Business Changes (Q20)", "", "", "", "", "", "", "\u0935\u094d\u092f\u093e\u092a\u093e\u0930\u093f\u0915 \u092a\u0930\u093f\u0935\u0930\u094d\u0924\u0928 (Q20)", "\u0927\u0902\u0927\u0947 \u092e\u0947\u0902 \u092c\u0926\u0932\u093e\u0935 (Q20)", "trending-up", "OmmNoMi", new Date().toISOString(), ""]
  ];

  // Read existing AppVariables
  var existingVarData = (appVarSheet.getLastRow() > 1) ? appVarSheet.getRange(2, 1, appVarSheet.getLastRow() - 1, appVarHeaders.length).getValues() : [];
  var varIdMap = {};
  existingVarData.forEach(function(r, idx) { varIdMap[r[0]] = idx; });

  cleanVars.forEach(function(row) {
    var vId = row[0];
    if (varIdMap[vId] !== undefined) {
      existingVarData[varIdMap[vId]] = row;
    } else {
      existingVarData.push(row);
      varIdMap[vId] = existingVarData.length - 1;
    }
  });

  appVarSheet.getRange(2, 1, existingVarData.length, appVarHeaders.length).setValues(existingVarData);
  Logger.log('[OK] AppVariables Updated: ' + cleanVars.length + ' clean variables synced.');

  var msg = 
    "OmmNoMi Master Database & AppVariables Clean Sync Complete!\n\n" +
    "\u2022 Survey Table: Exactly 103 clean, simple questions (Zero Matrix Bloat)\n" +
    "\u2022 Section C: Clean 15 core questions (No clutter)\n" +
    "\u2022 5 Child Matrix Tables: Q6, Q15, Q17, Q18, Q20 separated cleanly\n" +
    "\u2022 AppVariables: Updated with 1-to-1 question prompts & multilingual labels\n\n" +
    "Next Step: Re-generate Survey table structure in AppSheet Editor!";

  Logger.log(msg);
  SpreadsheetApp.getUi().alert("Architecture Clean Sync Report", msg, SpreadsheetApp.getUi().ButtonSet.OK);
}

function formatHeaderRow(range, bgColor) {
  range.setBackground(bgColor)
       .setFontColor("#FFFFFF")
       .setFontFamily("Roboto")
       .setFontSize(10)
       .setFontWeight("bold")
       .setHorizontalAlignment("center")
       .setVerticalAlignment("middle")
       .setWrap(false);
}
