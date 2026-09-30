function cleanSurveyAndTables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. EXACT 103 CLEAN COLUMNS (Compact, Zero Truncation)
  var colsStr = "ID,Status,InvestigatorID,CreatedOn,Latitude,Longitude," +
    "District,Block,VillageGP,RespondentName,SHGName,VOName,CLFName,SHGMembershipYears,LeadershipRole," +
    "LeadershipYears,RelatedToCRP,EPInterventionType,EnterpriseName,ParallelEnterpriseName,EnterpriseSetupYear," +
    "LoanReceivedYear,BusinessType,BusinessActivities,BusinessActivitiesOther,MaintainSeparateRecords," +
    "RespondentPhone,RegistrationsDocuments,RegistrationsDocumentsOther,RespondentAge,MaritalStatus," +
    "SocialCategory,EducationStatus,FamilyMemberCount,FamilyAdultsCount,FamilyChildrenCount,FamilyTotalEarning," +
    "FamilyMaleEarning,FamilyFemaleEarning,FamilyDisabledCount,FamilyIncomeSources,AnnualHouseholdIncome," +
    "ReasonsStartingBusiness,ReasonsStartingBusinessOther,BusinessCycle,BusinessCycleOther,BusinessPlaceType," +
    "MonthlyRent,LocationConvenience,LocationConvenienceOther,MaterialSourcingPct,MarketingMethods," +
    "MarketingMethodsOther,SeasonalSalesMethod,SeasonalSalesOther,SocialMediaForMarketing,SocialMediaForMarketingOther," +
    "SalesChannelsPct,RecordKeepingHabit,RecordKeepingMethod,RecordKeepingOther,SHGAssociationAssistance," +
    "MonthlyIncomeIncreaseByOSFSVEP,FinancialHelpFromIncome,FinancialHelpOther,HusbandFamilyResponse," +
    "MaterialSourcingComfort,CustomerPaymentRecovery,FundingExperience,CurrentChallenges,CurrentChallengesOther," +
    "Competitors_Same_Scale,Competitors_Smaller_Scale,Competitors_Higher_Scale,CompetitorAdvantages," +
    "CompetitorAdvantagesOther,FutureExpansionPlans,FutureExpansionPlansOther,AspirationBottlenecks," +
    "AspirationBottlenecksOther,AttendedTraining,TrainingDetails,UsedTrainingComponent,UsedTrainingDetails," +
    "MonthlyIncomeBeforeLoan,MonthlyIncomeAfterLoan,CRPContributions,CRPContributionDocDetails," +
    "ExpectationsFromScheme,SmartphoneOwnership,UseQRUPI,QRDailyTransactions,QRNonUseReason,SocialPlatformsUsed," +
    "SocialPlatformUsageMode,SocialMediaFrequency,OSFInterventionYear,BusinessOperationalStatus,BusinessClosureYear," +
    "ScalingDownClosingReasons,ScalingDownOtherReason,SupportNeededForSustenance,SupportNeededOther";

  var surveyColumns = colsStr.split(",");

  // 2. The 5 Sub-Tables
  var tables = {
    "Survey_Labor": "ID,Survey_ID,Activity,Involvement_Type,Family_Members_Count,Hired_Help_Count,Amount_Paid_Last_Year,Remarks".split(","),
    "Survey_Turnover": "ID,Survey_ID,Season,Duration_Months,Monthly_Sales,Monthly_Net_Profit,Remarks".split(","),
    "Survey_Capital_Arrangement": "ID,Survey_ID,Source,Amount_First_Year,Amount_In_Between_Years,Amount_Current_Year_2026_27,Amount_Pending,Remarks".split(","),
    "Survey_Loan_Usage": "ID,Survey_ID,Source,Loan_Usage_Purpose,Remarks".split(","),
    "Survey_Business_Changes": "ID,Survey_ID,Indicator_Heading,First_Year_Value,Current_Year_Value,Remarks".split(","),
    "Survey_Tables": "ID,Survey_ID,Table_Type,Row_Item,Remarks".split(",")
  };

  // 3. Clean Survey Sheet & Preserve Rows
  var sh = ss.getSheetByName("Survey") || ss.insertSheet("Survey");
  var lr = sh.getLastRow(), lc = sh.getLastColumn();
  var oldH = (lr >= 1 && lc >= 1) ? sh.getRange(1, 1, 1, lc).getValues()[0] : [];
  var oldD = (lr > 1) ? sh.getRange(2, 1, lr - 1, lc).getValues() : [];

  var newD = oldD.map(function(r) {
    var m = {}; oldH.forEach(function(h, i) { m[h] = r[i]; });
    return surveyColumns.map(function(c) {
      if (m[c] !== undefined) return m[c];
      if (c === "RespondentPhone" && m["ContactNumber"] !== undefined) return m["ContactNumber"];
      if (c === "MonthlyRent" && m["AnnualRent"] !== undefined) return m["AnnualRent"];
      return "";
    });
  });

  sh.clear();
  sh.getRange(1, 1, 1, surveyColumns.length).setValues([surveyColumns]);
  sh.getRange(1, 1, 1, surveyColumns.length).setBackground("#1a73e8").setFontColor("#fff").setFontWeight("bold");
  sh.setRowHeight(1, 35).setFrozenRows(1);
  if (newD.length > 0) sh.getRange(2, 1, newD.length, surveyColumns.length).setValues(newD);

  // 4. Setup 5 Sub-Tables
  for (var t in tables) {
    var s = ss.getSheetByName(t) || ss.insertSheet(t);
    if (s.getLastRow() === 0) {
      s.getRange(1, 1, 1, tables[t].length).setValues([tables[t]]);
      s.getRange(1, 1, 1, tables[t].length).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
      s.setRowHeight(1, 35).setFrozenRows(1);
    }
  }

  SpreadsheetApp.getUi().alert("Done", "Survey updated to 103 clean columns! Sub-tables ready.", SpreadsheetApp.getUi().ButtonSet.OK);
}
