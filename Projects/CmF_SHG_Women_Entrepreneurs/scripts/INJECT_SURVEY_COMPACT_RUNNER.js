// ==============================================================================
// OmmNoMi Compact Master Survey Configurator
// Dual-Delivery: Complete script at projects/CmF_SHG_Women_Entrepreneurs/scripts/
// ==============================================================================
(function runCompactSurveySetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Setting Survey DisplayNames & Valid_If ===");

    var store = window.appStore || (function() {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var k = Object.keys(all[i]).find(function(x) { return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); });
        var f = k && all[i][k];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) return f.memoizedProps.store;
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) return f.stateNode.store;
          f = f.return;
        }
      }
    })();
    if (!store) return console.error("[FAIL] Store not found! Editor me kisi column par click karein.");
    window.appStore = store;

    var schemas = store.getState().appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var sIdx = -1, vIdx = -1;
    for (var i = 0; i < schemas.length; i++) {
      var n = schemas[i].Name || schemas[i].TableName || '';
      if (n === 'Survey' || n === 'Survey_Schema') sIdx = i;
      if (n === 'AppVariables' || n === 'AppVariables_Schema') vIdx = i;
    }
    if (sIdx === -1) return console.error("[FAIL] Survey schema not found.");

    var dict = {}, attrs = schemas[sIdx].Attributes || [], aMap = {};
    for (var j = 0; j < attrs.length; j++) aMap[attrs[j].Name] = j;

    var refQ = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedKeyColumn: "ID" });
    var ITEMS = [["Status_Profile", "Q_STAT_PROFILE", "E", ""], ["Status_Operations", "Q_STAT_OPERATIONS", "E", ""], ["Status_Challenges", "Q_STAT_CHALLENGES", "E", ""], ["Status_SchemeImpact", "Q_STAT_SCHEME", "E", ""], ["Status_Digital", "Q_STAT_DIGITAL", "E", ""], ["Status_PostExit", "Q_STAT_POST_EXIT", "E", ""], ["District", "Q_A_01", "E", ""], ["Block", "Q_A_02", "E", ""], ["VillageGP", "Q_A_03", "T", ""], ["RespondentName", "Q_A_04", "T", ""], ["RespondentPhone", "Q_A_05", "P", ""], ["SHGName", "Q_A_06", "T", ""], ["VOName", "Q_A_07", "T", ""], ["CLFName", "Q_A_08", "T", ""], ["SHGMembershipYears", "Q_A_09", "N", ""], ["LeadershipRole", "Q_A_10", "E", ""], ["LeadershipYears", "Q_A_11", "N", ""], ["RelatedToCRP", "Q_A_12", "E", ""], ["EPInterventionType", "Q_A_13", "E", ""], ["EnterpriseName", "Q_A_14", "T", ""], ["ParallelEnterpriseName", "Q_A_14", "T", ""], ["EnterpriseSetupYear", "Q_A_15", "N", ""], ["BusinessType", "Q_A_16", "L", ""], ["BusinessActivities", "Q_A_17", "L", ""], ["BusinessActivitiesOther", "Q_A_17", "T", ""], ["LoanReceivedYear", "Q_A_18", "N", ""], ["MaintainSeparateRecords", "Q_A_19", "E", ""], ["RegistrationsDocuments", "Q_A_20", "L", ""], ["RespondentAge", "Q_B_01", "E", ""], ["MaritalStatus", "Q_B_02", "E", ""], ["SocialCategory", "Q_B_03", "E", ""], ["EducationStatus", "Q_B_04", "E", ""], ["FamilyMemberCount", "Q_B_05", "N", ""], ["FamilyIncomeSources", "Q_B_07", "L", ""], ["FamilyIncome_AnimalSale_Specify", "Q_B_07", "T", ""], ["FamilyIncomeSourcesOther", "Q_B_07", "T", ""], ["AnnualHouseholdIncome", "Q_B_08", "E", ""], ["ReasonsStartingBusiness", "Q_C_01", "L", ""], ["BusinessCycle", "Q_C_02", "E", ""], ["BusinessPlaceType", "Q_C_03", "E", ""], ["AnnualRent", "Q_C_04", "N", ""], ["LocationConvenience", "Q_C_05", "E", ""], ["Material_Percentage", "Q_C_07_01", "T", ""], ["MarketingMethods", "Q_C_08", "L", ""], ["SeasonalSalesMethod", "Q_C_09", "L", ""], ["Social_OnlinePlatform", "Q_C_09", "T", ""], ["RecordKeepingHabit", "Q_C_11", "E", ""], ["RecordKeepingMethod", "Q_C_12", "L", ""], ["SHGAssociationAssistance", "Q_D_01", "L", ""], ["FundingExperience", "Q_D_04", "L", ""], ["FinancialHelpFromIncome", "Q_D_06", "L", ""], ["FinancialHelp_EducationAmt", "Q_D_06", "D", ""], ["FinancialHelp_DebtsAmt", "Q_D_06", "D", ""], ["FinancialHelp_AssetsAmt", "Q_D_06", "D", ""], ["FinancialHelp_MarriageAmt", "Q_D_06", "D", ""], ["DebtRepaidAmount", "Q_D_06", "D", ""], ["AssetsAcquiredAmount", "Q_D_06", "D", ""], ["MarriageExpensesAmount", "Q_D_06", "D", ""], ["HusbandFamilyResponse", "Q_E_01", "L", ""], ["MaterialSourcingComfort", "Q_E_02", "E", ""], ["CustomerPaymentRecovery", "Q_E_03", "E", ""], ["CurrentChallenges", "Q_E_04", "L", ""], ["Challenge_OSFPhasedOutAmt", "Q_E_04", "D", ""], ["Challenge_ScaleUpFundAmt", "Q_E_04", "D", ""], ["Challenge_TimelyInputsAmt", "Q_E_04", "D", ""], ["Challenge_Other", "Q_E_04", "T", ""], ["Competitors_Similar_Scale", "Q_E_05_Count", "N", ""], ["Competitors_Smaller_Scale", "Q_E_05_Smaller", "N", ""], ["Competitors_Higher_Scale", "Q_E_05_Higher", "N", ""], ["CompetitorAdvantages", "Q_E_06", "L", ""], ["FutureExpansionPlans", "Q_F_01", "E", ""], ["AspirationBottlenecks", "Q_F_02", "L", ""], ["FutureFundsRequired", "Q_F_03", "N", ""], ["AttendedTraining", "Q_G_01", "E", ""], ["TrainingDetails", "Q_G_02", "T", ""], ["UsedTrainingComponent", "Q_G_03", "E", ""], ["UsedTrainingDetails", "Q_G_04", "T", ""], ["MonthlyIncomeBeforeLoan", "Q_G_05", "E", ""], ["MonthlyIncomeAfterLoan", "Q_G_06", "N", ""], ["MonthlyIncomeIncreaseByOSFSVEP", "Q_G_06", "N", ""], ["CRPContributions", "Q_G_07", "L", ""], ["CRPContributionDocDetails", "Q_G_07", "T", ""], ["ExpectationsFromScheme", "Q_G_08", "L", ""], ["Other_Specify", "Q_G_08", "T", ""], ["SmartphoneOwnership", "Q_H_01", "E", ""], ["UseQRUPI", "Q_H_02", "E", ""], ["QRDailyTransactions", "Q_H_03", "N", ""], ["QRNonUseReason", "Q_H_04", "E", ""], ["SocialMediaForMarketing", "Q_H_05", "E", ""], ["SocialPlatformsUsed", "Q_H_06", "L", ""], ["SocialPlatformUsageMode", "Q_H_07", "L", ""], ["SocialMediaFrequency", "Q_H_08", "E", ""], ["OSFInterventionYear", "Q_I_01", "N", ""], ["BusinessOperationalStatus", "Q_I_02", "E", ""], ["ScalingDownClosingReasons", "Q_I_03", "L", ""], ["ScalingDownOtherReason", "Q_I_03", "T", ""], ["SupportNeededForSustenance", "Q_I_04", "L", ""], ["SupportNeededOther", "Q_I_04", "T", ""], ["Status", "STAT_DRAFT", "E", ""], ["MonthlyRent", "Q_C_04", "N", ""], ["MaterialSourcingPct", "MAIN_PCT_SCALE_5", "B", "MAIN_PCT_SCALE_5"], ["SalesChannelsPct", "MAIN_PCT_SCALE_SALES", "B", "MAIN_PCT_SCALE_SALES"], ["Competitors_Same_Scale", "Q_E_05_Count", "N", ""], ["BusinessClosureYear", "Q_I_02", "N", ""]];

    var count = 0;
    ITEMS.forEach(function(item) {
      var col = item[0], qid = item[1], flag = item[2], scale = item[3];
      var idx = aMap[col];
      if (idx === undefined) {
        for (var k in aMap) { if (k.endsWith('_' + col)) { idx = aMap[k]; break; } }
      }
      if (idx === undefined) return;

      var p = 'AppData.DataSchemas[' + sIdx + '].Attributes[' + idx + ']';
      var attr = attrs[idx];
      var dn = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Title")';
      attr.DisplayName = dn;
      dict[p + '.DisplayName'] = dn;

      if (flag === 'E' || flag === 'L' || flag === 'B') {
        var tid = scale ? scale : qid;
        var vf = '=SPLIT(LOOKUP("' + tid + '", "AppVariables", "ID", "VariableList"), " , ")';
        var isMulti = (flag === 'L');
        var t = isMulti ? 'EnumList' : 'Enum';
        attr.Type = t; attr.Valid_If = vf; attr.ValidIf = vf; attr.Suggested_Values = vf; attr.SuggestedValues = vf;
        dict[p + '.Type'] = t; dict[p + '.Valid_If'] = vf; dict[p + '.ValidIf'] = vf; dict[p + '.Suggested_Values'] = vf; dict[p + '.SuggestedValues'] = vf;
        dict[p + '.ReferencedTableName'] = 'AppVariables';

        var aux = { EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: false, EnumInputMode: (flag === 'B' ? "Buttons" : "Auto"), Valid_If: vf, Suggested_Values: vf };
        if (isMulti) { aux.ElementType = "Ref"; aux.ElementTypeQualifier = refQ; aux.ItemSeparator = " , "; dict[p + '.EnumListElementTypeName'] = "Ref"; }
        else { aux.BaseType = "Ref"; aux.BaseTypeQualifier = refQ; }
        attr.TypeAuxData = JSON.stringify(aux);
        dict[p + '.TypeAuxData'] = JSON.stringify(aux);
      } else {
        var dt = (flag === 'N' ? 'Number' : (flag === 'D' ? 'Decimal' : (flag === 'P' ? 'Phone' : 'Text')));
        attr.Type = dt; dict[p + '.Type'] = dt;
      }
      count++;
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] " + count + " Survey columns configured with DisplayName & ValidIf! Click SAVE! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
