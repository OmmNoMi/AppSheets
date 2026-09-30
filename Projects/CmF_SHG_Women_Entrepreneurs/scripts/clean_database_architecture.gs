/**
 * =========================================================================
 * OmmNoMi Automation LLP - Database Architecture Cleanup Script
 * Target: SHG Women Entrepreneurs Study (Centre for microFinance / RAJEEVIKA)
 * 
 * Rules:
 * 1. Simple questions ONLY in Survey table (122 clean columns).
 * 2. All 5 matrix/table questions completely separated into their 5 dedicated tables:
 *    - Survey_Labor (Q6)
 *    - Survey_Turnover (Q15)
 *    - Survey_Capital_Arrangement (Q17)
 *    - Survey_Loan_Usage (Q18)
 *    - Survey_Business_Changes (Q20)
 * 3. Existing row data is preserved by mapping old columns to new columns.
 * =========================================================================
 */

function cleanDatabaseArchitecture() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const startTime = new Date();

  console.log('=== [OmmNoMi] Starting Database Architecture Cleanup ===');

  // 1. EXACT 122 Simple Columns for Survey Table (Zero Matrix Bloat)
  const surveyColumns = [
    // --- System Metadata (6) ---
    "ID", "Status", "InvestigatorID", "CreatedOn", "Latitude", "Longitude",

    // --- Section A: Basic details (23) ---
    "District", "Block", "VillageGP", "RespondentName", "ContactNumber", 
    "SHGName", "VOName", "CLFName", "SHGMembershipYears", "LeadershipRole", 
    "LeadershipYears", "RelatedToCRP", "EPInterventionType", "EnterpriseName", 
    "ParallelEnterpriseName", "EnterpriseSetupYear", "LoanReceivedYear", 
    "BusinessType", "BusinessActivities", "BusinessActivitiesOther", 
    "MaintainSeparateRecords", "RegistrationsDocuments", "RegistrationsDocumentsOther",

    // --- Section B: Respondent & Household Profile (13) ---
    "RespondentAge", "MaritalStatus", "SocialCategory", "EducationStatus", 
    "FamilyMemberCount", "FamilyAdultsCount", "FamilyChildrenCount", 
    "FamilyTotalEarning", "FamilyMaleEarning", "FamilyFemaleEarning", 
    "FamilyDisabledCount", "FamilyIncomeSources", "AnnualHouseholdIncome",

    // --- Section C: Enterprise Operations - Simple Questions Only (27) ---
    "ReasonsStartingBusiness", "ReasonsStartingBusinessOther", "BusinessCycle", 
    "BusinessCycleOther", "BusinessPlaceType", "MonthlyRent", "LocationConvenience", 
    "LocationConvenienceOther",
    // (Note: Q6 Labor is in Survey_Labor)
    "Sourcing_NearbyTown_Pct", "Sourcing_WithinState_Pct", "Sourcing_OutsideState_Pct", 
    "Sourcing_Online_Pct", "MarketingMethods", "MarketingMethodsOther", 
    "SeasonalSalesMethod", "SeasonalSalesOnlinePlatform", "SeasonalSalesOther", 
    "SocialMediaForMarketing", "SocialMediaForMarketingOther", 
    "SalesChannel_Online_Pct", "SalesChannel_WhatsApp_Pct", "SalesChannel_Instagram_Pct", 
    "SalesChannel_Premise_Pct", "SalesChannel_Traders_Pct", "SalesChannel_Haat_Pct", 
    "SalesChannel_Saras_Pct", "RecordKeepingHabit", "RecordKeepingMethod", 
    "RecordKeepingOther",
    // (Note: Q15 Turnover is in Survey_Turnover)
    "SHGAssociationAssistance",
    // (Note: Q17 Capital & Q18 Loan Usage are in separate tables)
    "MonthlyIncomeIncreaseByOSFSVEP",
    // (Note: Q20 Business Changes is in Survey_Business_Changes)
    "FinancialHelpFromIncome", "FinancialHelp_EducationAmt", "FinancialHelp_DebtsAmt", 
    "FinancialHelp_AssetsAmt", "FinancialHelp_MarriageAmt", "FinancialHelp_Other",

    // --- Section D: Ease of Doing Business & Challenges (19) ---
    "HusbandFamilyResponse", "MaterialSourcingComfort", "CustomerPaymentRecovery", 
    "FundingExperience", "CurrentChallenges", "Challenge_OSFPhasedOutAmt", 
    "Challenge_ScaleUpFundAmt", "Challenge_RenovationFundAmt", "Challenge_TimelyInputsAmt", 
    "Challenge_InventoryHelpAmt", "Challenge_Other", "Competitors_Same_Scale", 
    "Competitors_Smaller_Scale", "Competitors_Higher_Scale", "CompetitorAdvantages", 
    "CompetitorAdvantagesOther", "FutureExpansionPlans", "FutureExpansionPlansOther", 
    "AspirationBottlenecks", "AspirationBottlenecksOther",

    // --- Section E: Impact of SVEP/OSF schemes (9) ---
    "AttendedTraining", "TrainingDetails", "UsedTrainingComponent", "UsedTrainingDetails", 
    "MonthlyIncomeBeforeLoan", "MonthlyIncomeAfterLoan", "CRPContributions", 
    "CRPContributionDocDetails", "ExpectationsFromScheme",

    // --- Section F: Online Transactions & Social Media (7) ---
    "SmartphoneOwnership", "UseQRUPI", "QRDailyTransactions", "QRNonUseReason", 
    "SocialPlatformsUsed", "SocialPlatformUsageMode", "SocialMediaFrequency",

    // --- Section G: Post-Exit OSF in Baran and Ratangarh (7) ---
    "OSFInterventionYear", "BusinessOperationalStatus", "BusinessClosureYear", 
    "ScalingDownClosingReasons", "ScalingDownOtherReason", "SupportNeededForSustenance", 
    "SupportNeededOther"
  ];

  // 2. The 5 Dedicated Child Table Schemas
  const tablesConfig = {
    "Survey_Labor": [
      "ID", "Survey_ID", "Activity", "Family_Involvement", 
      "Family_Count", "Hired_Count", "Amount_Paid"
    ],
    "Survey_Turnover": [
      "ID", "Survey_ID", "Season", "Duration_Months", 
      "Monthly_Sales", "Monthly_Net_Profit"
    ],
    "Survey_Capital_Arrangement": [
      "ID", "Survey_ID", "Source", "Amount_First_Year", 
      "Amount_In_Between", "Amount_Current_Year", "Amount_Pending"
    ],
    "Survey_Loan_Usage": [
      "ID", "Survey_ID", "Source", "Usage_In_Business", "Usage_Other_Specify"
    ],
    "Survey_Business_Changes": [
      "ID", "Survey_ID", "Metric_Heading", "Amount_First_Year", "Amount_Current_Year"
    ],
    "Survey_Tables": [
      "ID", "Survey_ID", "Table_Type", "Row_Item", "Family_Involvement", 
      "Family_Count", "Hired_Count", "Amount_Paid", "Duration_Months", 
      "Monthly_Sales", "Monthly_Net_Profit", "Amount_First_Year", 
      "Amount_In_Between", "Amount_Current_Year", "Amount_Pending", 
      "Usage_In_Business", "Usage_Other_Specify"
    ]
  };

  // 3. Update 'Survey' Sheet Header & Realign Existing Data
  let surveySheet = ss.getSheetByName('Survey');
  if (!surveySheet) {
    surveySheet = ss.insertSheet('Survey');
  }

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

  // Create mapping of old column values for preserving existing responses
  const newRowData = [];
  existingData.forEach(row => {
    const rowMap = {};
    existingHeaders.forEach((h, idx) => {
      rowMap[h] = row[idx];
    });

    const newRow = surveyColumns.map(col => {
      // Direct match
      if (rowMap[col] !== undefined) return rowMap[col];
      // Match aliases
      if (col === "MonthlyRent" && rowMap["AnnualRent"] !== undefined) return rowMap["AnnualRent"];
      if (col === "ContactNumber" && rowMap["RespondentPhone"] !== undefined) return rowMap["RespondentPhone"];
      return "";
    });
    newRowData.push(newRow);
  });

  // Clear and rewrite clean Survey table
  surveySheet.clear();
  surveySheet.getRange(1, 1, 1, surveyColumns.length).setValues([surveyColumns]);
  formatHeaderRow(surveySheet.getRange(1, 1, 1, surveyColumns.length), "#4285F4");

  if (newRowData.length > 0) {
    surveySheet.getRange(2, 1, newRowData.length, surveyColumns.length).setValues(newRowData);
  }

  console.log('[OK] Survey Sheet Cleaned: exactly ' + surveyColumns.length + ' simple columns.');

  // 4. Create/Verify the 5 Sub-Tables + Safety Table
  let tablesCreated = 0;
  for (const tName in tablesConfig) {
    const cols = tablesConfig[tName];
    let sheet = ss.getSheetByName(tName);
    if (!sheet) {
      sheet = ss.insertSheet(tName);
      sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
      formatHeaderRow(sheet.getRange(1, 1, 1, cols.length), "#34A853");
      tablesCreated++;
      console.log('[CREATED] Child Table: ' + tName);
    } else {
      // If sheet exists, ensure headers are present
      if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
        formatHeaderRow(sheet.getRange(1, 1, 1, cols.length), "#34A853");
      }
      console.log('[VERIFIED] Child Table: ' + tName);
    }
  }

  const duration = ((new Date() - startTime) / 1000).toFixed(1);
  const reportMsg = 
    "OmmNoMi Clean Architecture Update Completed Successfully!\n\n" +
    "• Survey Table: Cleaned to exactly 122 simple columns (Zero Matrix Bloat)\n" +
    "• 5 Child Matrix Tables: Fully configured & separate\n" +
    "• Existing Survey Rows Preserved: " + newRowData.length + "\n" +
    "• Execution Time: " + duration + "s\n\n" +
    "Check your Google Sheet now!";

  console.log(reportMsg);
  try {
    SpreadsheetApp.getUi().alert("Clean Architecture Report", reportMsg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch(e) {}
}

/**
 * Format header row with OmmNoMi brand styling
 */
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
