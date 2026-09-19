/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Master Database & AppVariables Clean Sync Script
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
    ["Q_C_01", "Survey", "ReasonsStartingBusiness", "QuestionPrompt, SectionC", "VariableList", "Reasons for starting the business? (Multiselect)", "Section C Q1", "Why started business", "", "", "", "RSN_FINANCIAL_SETBACK , RSN_RISING_EXP , RSN_WANT_OWN_BIZ , RSN_LEARNT_SKILL , RSN_WAS_WAGE_LABOR , RSN_SHG_MEMBERS_TOOK , RSN_CRP_ENCOURAGED , RSN_CLF_ENCOURAGED , RSN_OTHER", "", "", "", "", "व्यवसाय शुरू करने के क्या कारण रहे?", "काम-धंधो सुरू करण रा कांई कारण हा?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_02", "Survey", "BusinessCycle", "QuestionPrompt, SectionC", "Enum", "Describe your business cycle?", "Section C Q2", "Operational rhythm", "", "", "", "CYC_REGULAR_HOURS , CYC_CUSTOMER_ARRIVES , CYC_ALL_YEAR , CYC_ON_ORDER , CYC_SEASONAL_PROD_SALE_YEAR , CYC_LIMITED_MONTHS , CYC_OTHER", "", "", "", "", "अपने व्यावसायिक चक्र का विवरण दें", "काम-धंधो कस्या चालै छै?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_03", "Survey", "BusinessPlaceType", "QuestionPrompt, SectionC", "Enum", "What is the type of business place?", "Section C Q3", "Premise ownership", "", "", "", "PLC_OWN , PLC_RENTED", "", "", "", "", "व्यवसाय स्थल का प्रकार क्या है?", "दुकान/काम री जगह कैसी छै?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_04", "Survey", "MonthlyRent", "QuestionPrompt, SectionC", "Price", "If rented, what is monthly rent? Rs_______", "Section C Q4", "Monthly rent amount", "", "", "", "", "", "", "", "", "यदि किराए पर है, तो मासिक किराया कितना है?", "किराए री छै तो महीनो कित्तो लागै?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_05", "Survey", "LocationConvenience", "QuestionPrompt, SectionC", "Enum", "Is the location of your premise convenient for your customers?", "Section C Q5", "Location rating", "", "", "", "LOC_VERY_CONVENIENT , LOC_CHANGED_FOR_CLIENTS , LOC_OPERATE_HOME , LOC_AFFORD_ONLY_THIS , LOC_OTHER", "", "", "", "", "क्या आपका स्थान ग्राहकों के लिए सुविधाजनक है?", "कांई थारी दुकान ग्राहकों तांई ठीक जगह छै?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_08", "Survey", "MaterialSourcingPct", "QuestionPrompt, SectionC", "Text", "What percentage of material do you source from these places?", "Section C Q8", "Sourcing channels breakdown", "", "", "", "", "", "", "", "", "सामग्री का कितना प्रतिशत किन स्थानों से लाती हैं?", "सामान कित्तो प्रतिशत कठै सूं लावो छो?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_09", "Survey", "MarketingMethods", "QuestionPrompt, SectionC", "VariableList", "How do you market your products/services? (Multiselect)", "Section C Q9", "Marketing channels", "", "", "", "MKT_SHOP_ONLY , MKT_NAME_BOARD , MKT_DOOR_TO_DOOR , MKT_SHG_MEETINGS , MKT_TRADERS_SAMPLES , MKT_WAIT_ENQUIRIES , MKT_DONT_KNOW , MKT_NO_NEED , MKT_OTHER", "", "", "", "", "आप अपने उत्पादों/सेवाओं का प्रचार कैसे करती हैं?", "सामान रो प्रचार किसा करौ छो?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_10", "Survey", "SeasonalSalesMethod", "QuestionPrompt, SectionC", "Enum", "In case of seasonal production, how do you sell your products/services?", "Section C Q10", "Seasonal sales pattern", "", "", "", "SEA_NOT_REL , SEA_WAIT_ORDERS , SEA_DOOR_TO_DOOR , SEA_ADVANCE_ORDERS , SEA_LOCAL_HAAT , SEA_SARAS_FAIR , SEA_ONLINE , SEA_OTHER", "", "", "", "", "मौसमी उत्पादन में उत्पाद/सेवाएं कैसे बेचती हैं?", "सीजन रो सामान कस्या बेचो छो?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_11", "Survey", "SocialMediaForMarketing", "QuestionPrompt, SectionC", "Enum", "Do you use social media for marketing?", "Section C Q11", "Social media marketing status", "", "", "", "SMM_WHATSAPP_ORDERS , SMM_INSTAGRAM_REELS , SMM_NO_SMARTPHONE , SMM_DONT_KNOW_USE , SMM_NO_TIME , SMM_DONT_WANT , SMM_OTHER", "", "", "", "", "क्या आप प्रचार के लिए सोशल मीडिया का उपयोग करती हैं?", "कांई सोशल मीडिया सूं प्रचार करो छो?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_12", "Survey", "SalesChannelsPct", "QuestionPrompt, SectionC", "Text", "What percentage of your products/services get sold through following channels?", "Section C Q12", "Sales channels breakdown", "", "", "", "", "", "", "", "", "उत्पाद/सेवाएं किन माध्यमों से कितने प्रतिशत बिकते हैं?", "सामान कित्ता प्रतिशत किसा माध्यम सूं बिकै छै?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_13", "Survey", "RecordKeepingHabit", "QuestionPrompt, SectionC", "Enum", "Do you maintain written records of business transactions?", "Section C Q13", "Record keeping habit", "", "", "", "RKH_ALWAYS_DID , RKH_AFTER_CRP_TRAIN , RKH_FAMILY_MAINTAINS , RKH_HIRED_HELP , RKH_NOT_REGULAR , RKH_NO_RECORDS", "", "", "", "", "क्या आप लेन-देन का लिखित रिकॉर्ड रखती हैं?", "कांई हिसाब-किताब लिखो छो?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_14", "Survey", "RecordKeepingMethod", "QuestionPrompt, SectionC", "Enum", "How do you maintain business transactions?", "Section C Q14", "Record book type", "", "", "", "RKT_RECEIPT_BOOK , RKT_PURCHASE_SALE_REG , RKT_ONLY_DEBT_REG , RKT_DAILY_DIARY , RKT_CRP_DIARY , RKT_DIGITAL_APP , RKT_NOT_REGULAR , RKT_FAMILY_BOOK , RKT_NO_RECORD , RKT_OTHER", "", "", "", "", "आप हिसाब-किताब कैसे रखती हैं?", "हिसाब-किताब किस्या राखो छो?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_16", "Survey", "SHGAssociationAssistance", "QuestionPrompt, SectionC", "VariableList", "How has the SHG association helped in your enterprise? (Multiselect)", "Section C Q16", "SHG help factors", "", "", "", "SHG_SKILL_TRAIN , SHG_MEETING_INFO , SHG_DOCUMENTS , SHG_SUBSIDY , SHG_INITIATE_LOAN , SHG_REGULAR_LOANS , SHG_CRP_GUIDED , SHG_MUDRA_LOAN , SHG_BANK_LOAN", "", "", "", "", "समूह (SHG) से जुड़ने से व्यवसाय में क्या मदद मिली?", "समूह सूं जुड़बा सूं कांई फायदो हुयो?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_19", "Survey", "MonthlyIncomeIncreaseByOSFSVEP", "QuestionPrompt, SectionC", "Enum", "Can you specify the amount by which average monthly income increased directly due to OSF/SVEP loans?", "Section C Q19", "Income gain due to loan", "", "", "", "INC_UPTO_2K , INC_2K_3K , INC_3K_4K , INC_4K_5K , INC_5K_6K , INC_ABOVE_6K , INC_CANT_SAY", "", "", "", "", "ऋण से मासिक आय में कितनी सीधी वृद्धि हुई?", "लोन सूं हर महीना री कमाई में कित्ती बढ़ोतरी हुयी?", "", "OmmNoMi", new Date().toISOString(), ""],
    ["Q_C_21", "Survey", "FinancialHelpFromIncome", "QuestionPrompt, SectionC", "VariableList", "How has the income from the enterprise helped you financially? (Multiselect)", "Section C Q21", "Household financial benefits", "", "", "", "HLP_NO_ASK_HUSBAND , HLP_BIGGEST_INCOME , HLP_CHILD_EDUCATION , HLP_FAMILY_DEBTS , HLP_ACQUIRE_ASSETS , HLP_MARRIAGE_EXP , HLP_OTHER", "", "", "", "", "व्यवसाय की आय से आपको आर्थिक रूप से क्या मदद मिली?", "कमाई सूं घर में कांई आर्थिक मदद मिली?", "", "OmmNoMi", new Date().toISOString(), ""],

    // Sub-Table Header Variables for Action Buttons
    ["SEC_C_TBL_LABOR", "Survey_Labor", "Activity", "SubTable, SectionC", "Enum", "Labor & Help (Q6)", "Involvement of family members and hired help", "Sub-Table Button", "", "Labor & Help (Q6)", "", "", "", "", "", "", "श्रमिक एवं पारिवारिक सहयोग (Q6)", "मजदूर अर परिवार रो सहयोग (Q6)", "users", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_TURNOVER", "Survey_Turnover", "Season", "SubTable, SectionC", "Enum", "Turnover & Profit (Q15)", "Turnover and income across seasons", "Sub-Table Button", "", "Turnover & Profit (Q15)", "", "", "", "", "", "", "टर्नओवर एवं शुद्ध लाभ (Q15)", "बिक्री अर मुनाफा (Q15)", "dollar", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_CAP_ARRANGE", "Survey_Capital_Arrangement", "Source", "SubTable, SectionC", "Enum", "Capital Arranged (Q17)", "How capital was arranged over duration", "Sub-Table Button", "", "Capital Arranged (Q17)", "", "", "", "", "", "", "पूंजी व्यवस्था (Q17)", "पैसा री व्यवस्था (Q17)", "briefcase", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_LOAN_USE", "Survey_Loan_Usage", "Source", "SubTable, SectionC", "Enum", "Loan Usage (Q18)", "Usage of loans taken from different sources", "Sub-Table Button", "", "Loan Usage (Q18)", "", "", "", "", "", "", "ऋण का उपयोग (Q18)", "लोन रो इस्तेमाल (Q18)", "credit-card", "OmmNoMi", new Date().toISOString(), ""],
    ["SEC_C_TBL_BUSINESS_CHANGES", "Survey_Business_Changes", "Indicator_Heading", "SubTable, SectionC", "Enum", "Business Changes (Q20)", "Changes happened in business over years", "Sub-Table Button", "", "Business Changes (Q20)", "", "", "", "", "", "", "व्यापारिक परिवर्तन (Q20)", "धंधे में बदलाव (Q20)", "trending-up", "OmmNoMi", new Date().toISOString(), ""]
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
    "• Survey Table: Exactly 103 clean, simple questions (Zero Matrix Bloat)\n" +
    "• Section C: Clean 15 core questions (No clutter)\n" +
    "• 5 Child Matrix Tables: Q6, Q15, Q17, Q18, Q20 separated cleanly\n" +
    "• AppVariables: Updated with 1-to-1 question prompts & multilingual labels\n\n" +
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
