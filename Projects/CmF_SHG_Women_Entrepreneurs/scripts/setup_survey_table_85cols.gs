function setupSurveyTable() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var c = "ID,Status,InvestigatorID,CreatedOn,Latitude,Longitude,District,Block,VillageGP,RespondentName,SHGName,VOName,CLFName,SHGMembershipYears,LeadershipRole,LeadershipYears,RelatedToCRP,EPInterventionType,EnterpriseName,EnterpriseSetupYear,LoanReceivedYear,BusinessType,BusinessActivities,MaintainSeparateRecords,RespondentPhone,RegistrationsDocuments,RespondentAge,MaritalStatus,SocialCategory,EducationStatus,FamilyMemberCount,FamilyAdultsCount,FamilyChildrenCount,FamilyTotalEarning,FamilyMaleEarning,FamilyFemaleEarning,FamilyDisabledCount,FamilyIncomeSources,AnnualHouseholdIncome,ReasonsStartingBusiness,BusinessCycle,BusinessPlaceType,MonthlyRent,LocationConvenience,MaterialSourcingPct,MarketingMethods,SeasonalSalesMethod,SocialMediaForMarketing,SalesChannelsPct,RecordKeepingHabit,RecordKeepingMethod,SHGAssociationAssistance,MonthlyIncomeIncreaseByOSFSVEP,FinancialHelpFromIncome,HusbandFamilyResponse,MaterialSourcingComfort,CustomerPaymentRecovery,FundingExperience,CurrentChallenges,Competitors_Same_Scale,Competitors_Smaller_Scale,Competitors_Higher_Scale,CompetitorAdvantages,FutureExpansionPlans,AspirationBottlenecks,AttendedTraining,TrainingDetails,UsedTrainingComponent,UsedTrainingDetails,MonthlyIncomeBeforeLoan,MonthlyIncomeAfterLoan,CRPContributions,ExpectationsFromScheme,SmartphoneOwnership,UseQRUPI,QRDailyTransactions,QRNonUseReason,SocialPlatformsUsed,SocialPlatformUsageMode,SocialMediaFrequency,OSFInterventionYear,BusinessOperationalStatus,BusinessClosureYear,ScalingDownClosingReasons,SupportNeededForSustenance".split(",");
  var sh = ss.getSheetByName("Survey") || ss.insertSheet("Survey");
  var lr = sh.getLastRow(), lc = sh.getLastColumn();
  var oldH = (lr && lc) ? sh.getRange(1, 1, 1, lc).getValues()[0] : [];
  var oldD = (lr > 1) ? sh.getRange(2, 1, lr - 1, lc).getValues() : [];
  var newD = oldD.map(function(r) {
    var m = {}; oldH.forEach(function(h, i) { m[h] = r[i]; });
    return c.map(function(k) { return m[k] !== undefined ? m[k] : (k === "RespondentPhone" ? (m["ContactNumber"] || "") : (k === "MonthlyRent" ? (m["AnnualRent"] || "") : "")); });
  });
  sh.clear();
  sh.getRange(1, 1, 1, c.length).setValues([c]).setBackground("#1a73e8").setFontColor("#fff").setFontWeight("bold");
  sh.setRowHeight(1, 35).setFrozenRows(1);
  if (newD.length) sh.getRange(2, 1, newD.length, c.length).setValues(newD);
  var sub = {
    "Survey_Labor": "ID,Survey_ID,Activity,Involvement_Type,Family_Members_Count,Hired_Help_Count,Amount_Paid_Last_Year,Remarks",
    "Survey_Turnover": "ID,Survey_ID,Season,Duration_Months,Monthly_Sales,Monthly_Net_Profit,Remarks",
    "Survey_Capital_Arrangement": "ID,Survey_ID,Source,Amount_First_Year,Amount_In_Between_Years,Amount_Current_Year_2026_27,Amount_Pending,Remarks",
    "Survey_Loan_Usage": "ID,Survey_ID,Source,Loan_Usage_Purpose,Remarks",
    "Survey_Business_Changes": "ID,Survey_ID,Indicator_Heading,First_Year_Value,Current_Year_Value,Remarks"
  };
  for (var k in sub) {
    var s = ss.getSheetByName(k) || ss.insertSheet(k);
    if (s.getLastRow() === 0) {
      var cols = sub[k].split(",");
      s.getRange(1, 1, 1, cols.length).setValues([cols]).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
      s.setRowHeight(1, 35).setFrozenRows(1);
    }
  }
  SpreadsheetApp.getUi().alert("SUCCESS: Survey (Exact 85 columns, Section C 15 questions) and 5 Sub-Tables ready!");
}
