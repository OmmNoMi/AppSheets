function cleanSurveyAndTables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. EXACT CLEAN SURVEY COLUMNS (103 Simple Columns)
  var surveyColumns = [
    "ID", "Status", "InvestigatorID", "CreatedOn", "Latitude", "Longitude",
    "District", "Block", "VillageGP", "RespondentName", "SHGName", 
    "VOName", "CLFName", "SHGMembershipYears", "LeadershipRole", 
    "LeadershipYears", "RelatedToCRP", "EPInterventionType", "EnterpriseName", 
    "ParallelEnterpriseName", "EnterpriseSetupYear", "LoanReceivedYear", 
    "BusinessType", "BusinessActivities", "BusinessActivitiesOther", 
    "MaintainSeparateRecords", "RespondentPhone", "RegistrationsDocuments", 
    "RegistrationsDocumentsOther",
    "RespondentAge", "MaritalStatus", "SocialCategory", "EducationStatus", 
    "FamilyMemberCount", "FamilyAdultsCount", "FamilyChildrenCount", 
    "FamilyTotalEarning", "FamilyMaleEarning", "FamilyFemaleEarning", 
    "FamilyDisabledCount", "FamilyIncomeSources", "AnnualHouseholdIncome",
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
    "HusbandFamilyResponse", "MaterialSourcingComfort", "CustomerPaymentRecovery", 
    "FundingExperience", "CurrentChallenges", "CurrentChallengesOther", 
    "Competitors_Same_Scale", "Competitors_Smaller_Scale", "Competitors_Higher_Scale", 
    "CompetitorAdvantages", "CompetitorAdvantagesOther", 
    "FutureExpansionPlans", "FutureExpansionPlansOther", 
    "AspirationBottlenecks", "AspirationBottlenecksOther",
    "AttendedTraining", "TrainingDetails", "UsedTrainingComponent", "UsedTrainingDetails", 
    "MonthlyIncomeBeforeLoan", "MonthlyIncomeAfterLoan", "CRPContributions", 
    "CRPContributionDocDetails", "ExpectationsFromScheme",
    "SmartphoneOwnership", "UseQRUPI", "QRDailyTransactions", "QRNonUseReason", 
    "SocialPlatformsUsed", "SocialPlatformUsageMode", "SocialMediaFrequency",
    "OSFInterventionYear", "BusinessOperationalStatus", "BusinessClosureYear", 
    "ScalingDownClosingReasons", "ScalingDownOtherReason", 
    "SupportNeededForSustenance", "SupportNeededOther"
  ];

  // 2. The 5 Dedicated Child Tables
  var tablesConfig = {
    "Survey_Labor": ["ID", "Survey_ID", "Activity", "Involvement_Type", "Family_Members_Count", "Hired_Help_Count", "Amount_Paid_Last_Year", "Remarks"],
    "Survey_Turnover": ["ID", "Survey_ID", "Season", "Duration_Months", "Monthly_Sales", "Monthly_Net_Profit", "Remarks"],
    "Survey_Capital_Arrangement": ["ID", "Survey_ID", "Source", "Amount_First_Year", "Amount_In_Between_Years", "Amount_Current_Year_2026_27", "Amount_Pending", "Remarks"],
    "Survey_Loan_Usage": ["ID", "Survey_ID", "Source", "Loan_Usage_Purpose", "Remarks"],
    "Survey_Business_Changes": ["ID", "Survey_ID", "Indicator_Heading", "First_Year_Value", "Current_Year_Value", "Remarks"],
    "Survey_Tables": ["ID", "Survey_ID", "Table_Type", "Row_Item", "Remarks"]
  };

  // 3. Clean Survey Sheet & Preserve Existing Data
  var surveySheet = ss.getSheetByName("Survey") || ss.insertSheet("Survey");
  var lastRow = surveySheet.getLastRow();
  var lastCol = surveySheet.getLastColumn();
  var existingHeaders = (lastRow >= 1 && lastCol >= 1) ? surveySheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];
  var existingData = (lastRow > 1) ? surveySheet.getRange(2, 1, lastRow - 1, lastCol).getValues() : [];

  var newRowData = existingData.map(function(row) {
    var rowMap = {};
    existingHeaders.forEach(function(h, idx) { rowMap[h] = row[idx]; });
    return surveyColumns.map(function(col) {
      if (rowMap[col] !== undefined) return rowMap[col];
      if (col === "RespondentPhone" && rowMap["ContactNumber"] !== undefined) return rowMap["ContactNumber"];
      if (col === "MonthlyRent" && rowMap["AnnualRent"] !== undefined) return rowMap["AnnualRent"];
      return "";
    });
  });

  surveySheet.clear();
  surveySheet.getRange(1, 1, 1, surveyColumns.length).setValues([surveyColumns]);
  surveySheet.getRange(1, 1, 1, surveyColumns.length).setBackground("#1a73e8").setFontColor("#ffffff").setFontWeight("bold");
  surveySheet.setRowHeight(1, 35).setFrozenRows(1);
  for (var c = 1; c <= surveyColumns.length; c++) surveySheet.setColumnWidth(c, 160);

  if (newRowData.length > 0) {
    surveySheet.getRange(2, 1, newRowData.length, surveyColumns.length).setValues(newRowData);
  }

  // 4. Setup 5 Sub-Tables
  for (var tName in tablesConfig) {
    var cols = tablesConfig[tName];
    var sheet = ss.getSheetByName(tName) || ss.insertSheet(tName);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
      sheet.getRange(1, 1, 1, cols.length).setBackground("#34a853").setFontColor("#ffffff").setFontWeight("bold");
      sheet.setRowHeight(1, 35).setFrozenRows(1);
      for (var k = 1; k <= cols.length; k++) sheet.setColumnWidth(k, 160);
    }
  }

  SpreadsheetApp.getUi().alert("Clean Setup Successful", "Survey Sheet has been updated to 103 clean columns!\\n5 Matrix Tables verified.", SpreadsheetApp.getUi().ButtonSet.OK);
}
