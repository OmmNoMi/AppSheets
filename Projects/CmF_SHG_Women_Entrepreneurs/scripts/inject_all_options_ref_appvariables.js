// ==============================================================================
// OmmNoMi: Set ALL Options to Enum/EnumList with BaseType Ref -> AppVariables
// Pure ASCII, C# Deserializer Compliant
// ==============================================================================
(function setAllOptionsRefAppVariables() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Setting ALL Option Columns to Ref -> AppVariables ===");

    var store = window.appStore || (function() {
      var all = document.querySelectorAll("*");
      for (var i = 0; i < all.length; i++) {
        var el = all[i], k = Object.keys(el).find(function(x) { return x.startsWith("__reactFiber") || x.startsWith("__reactInternal"); });
        var f = k && el[k];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) return f.memoizedProps.store;
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) return f.stateNode.store;
          f = f.return;
        }
      }
    })();
    if (!store) return console.error("[FAIL] Store not found. Editor me kisi column par click karein.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));
    var actions = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataActions) || []));

    var surveyMap = {"Status_Profile":["Q_STAT_PROFILE",0],"Status_Operations":["Q_STAT_OPERATIONS",0],"Status_Challenges":["Q_STAT_CHALLENGES",0],"Status_SchemeImpact":["Q_STAT_SCHEME",0],"Status_Digital":["Q_STAT_DIGITAL",0],"Status_PostExit":["Q_STAT_POST_EXIT",0],"District":["Q_A_01_00",0],"Block":["Q_A_02_00",0],"LeadershipRole":["Q_A_09_00",0],"RelatedToCRP":["Q_A_11_00",0],"EPInterventionType":["Q_A_12_00",0],"BusinessType":["Q_A_16_00",1],"BusinessActivities":["Q_A_17_00",1],"RespondentAge":["Q_B_01_00",0],"MaritalStatus":["Q_B_02_00",0],"SocialCategory":["Q_B_03_00",0],"EducationStatus":["Q_B_04_00",0],"FamilyIncomeSources":["Q_B_07_00",1],"AnnualHouseholdIncome":["Q_B_08_00",0],"ReasonsStartingBusiness":["Q_C_01_00",1],"BusinessCycle":["Q_C_02_00",0],"BusinessPlaceType":["Q_C_03_00",0],"LocationConvenience":["Q_C_05_00",0],"Labor_Purchase_Involvement":["Q_C_06_Purchase_INV",0],"Labor_Prod_Involvement":["Q_C_06_Prod_INV",0],"Labor_Serv_Involvement":["Q_C_06_Serv_INV",0],"Labor_Mktg_Involvement":["Q_C_06_Mktg_INV",0],"Labor_Sale_Involvement":["Q_C_06_Sale_INV",0],"Labor_Record_Involvement":["Q_C_06_Record_INV",0],"AnnualSalaryBill":["Q_C_07_00",0],"Sourcing_NearbyTown_Pct":["Q_C_08_NearbyTown",0],"Sourcing_Jaipur_Pct":["Q_C_08_Jaipur",0],"Sourcing_OutsideState_Pct":["Q_C_08_OutsideState",0],"Sourcing_Online_Pct":["Q_C_08_Online",0],"Sourcing_WhatsApp_Pct":["Q_C_08_WhatsApp",0],"MarketingMethods":["Q_C_09_00",1],"SeasonalSalesMethod":["Q_C_10_00",0],"SocialMediaForMarketing":["Q_C_11_00",0],"SalesChannel_Online_Pct":["Q_C_12_Online",0],"SalesChannel_WhatsApp_Pct":["Q_C_12_WhatsApp",0],"SalesChannel_Instagram_Pct":["Q_C_12_Instagram",0],"SalesChannel_Premise_Pct":["Q_C_12_Premise",0],"SalesChannel_Traders_Pct":["Q_C_12_Traders",0],"SalesChannel_Haat_Pct":["Q_C_12_Haat",0],"SalesChannel_Saras_Pct":["Q_C_12_Saras",0],"RecordKeepingHabit":["Q_C_13_00",0],"RecordKeepingMethod":["Q_C_14_00",0],"InitialCapitalArranged":["Q_C_17_00",0],"SHGAssociationAssistance":["Q_C_18_00",1],"Cap_OwnSavings_Usage":["Q_C_20_OwnSavings_USE",0],"Cap_Family_Usage":["Q_C_20_Family_USE",0],"Cap_Profit_Usage":["Q_C_20_Profit_USE",0],"Cap_MortgGold_Usage":["Q_C_20_MortgGold_USE",0],"Cap_SoldGold_Usage":["Q_C_20_SoldGold_USE",0],"Cap_FamLoan_Usage":["Q_C_20_FamLoan_USE",0],"Cap_Moneylender_Usage":["Q_C_20_Moneylender_USE",0],"Cap_SHGLoan_Usage":["Q_C_20_SHGLoan_USE",0],"Cap_OSFSVEPLoan_Usage":["Q_C_20_OSFSVEPLoan_USE",0],"Cap_OSFSubsidy_Usage":["Q_C_20_OSFSubsidy_USE",0],"Cap_PrivSaving_Usage":["Q_C_20_PrivSaving_USE",0],"Cap_NBFC_Usage":["Q_C_20_NBFC_USE",0],"Cap_Mudra_Usage":["Q_C_20_Mudra_USE",0],"Cap_BankLoan_Usage":["Q_C_20_BankLoan_USE",0],"MonthlyIncomeIncreaseByOSFSVEP":["Q_C_21_00",0],"FinancialHelpFromIncome":["Q_C_23_00",1],"HusbandFamilyResponse":["Q_D_01_00",1],"MaterialSourcingComfort":["Q_D_02_00",0],"CustomerPaymentRecovery":["Q_D_03_00",0],"FundingExperience":["Q_D_04_00",1],"CurrentChallenges":["Q_D_05_00",1],"AttendedTraining":["Q_E_01_00",0],"UsedTrainingComponent":["Q_E_03_00",0],"CRPContributions":["Q_E_06_00",1],"SmartphoneOwnership":["Q_F_01_00",0],"UseQRUPI":["Q_F_02_00",0],"QRDailyTransactions":["Q_F_03_00",0],"QRNonUseReason":["Q_F_04_00",0],"SocialPlatformsUsed":["Q_F_05_00",1],"SocialPlatformUsageMode":["Q_F_06_00",1],"SocialMediaFrequency":["Q_F_07_00",0],"BusinessOperationalStatus":["Q_G_02_00",0],"ScalingDownClosingReasons":["Q_G_03_00",1],"SupportNeededForSustenance":["Q_G_04_00",1],"RegistrationsDocuments":["Q_A_20_00",1],"CompetitorAdvantages":["Q_D_07_00",1],"FutureExpansionPlans":["Q_D_08_00",0],"AspirationConstraints":["Q_D_09_00",1],"MaintainSeparateRecords":["Q_A_18_00",0],"AspirationBottlenecks":["Q_D_09_00_BOTTLENECK",1]};
    var subMap = {"Survey_Labor":{"Activity":["COL_LABOR_ACTIVITY",0],"Activity_Name":["COL_LABOR_ACTIVITY",0],"Involvement_Type":["COL_LABOR_INVOLVEMENT",0],"Amount_Paid_Last_Year":["COL_LABOR_AMOUNT_PAID",0]},"Survey_Turnover":{"Season":["COL_TURN_SEASON",0],"Season_Type":["COL_TURN_SEASON",0]},"Survey_Capital_Arrangement":{"Source":["COL_CAP_SOURCE",0],"Capital_Source":["COL_CAP_SOURCE",0]},"Survey_Loan_Usage":{"Source":["COL_LOAN_SOURCE",0],"Loan_Usage_Purpose":["COL_LOAN_USAGE",0],"Loan_Usage":["COL_LOAN_USAGE",0]},"Survey_Business_Changes":{"Indicator_Heading":["COL_CHG_HEADING",0]}};

    var totalUpdated = 0;

    schemas.forEach(function(s) {
      var sName = (s.Name || "").replace(/_Schema$/, "");
      (s.Attributes || []).forEach(function(a) {
        var match = null;
        if (sName === "Survey" && surveyMap[a.Name]) {
          match = surveyMap[a.Name];
        } else if (subMap[sName] && subMap[sName][a.Name]) {
          match = subMap[sName][a.Name];
        }

        if (match) {
          var qid = match[0];
          var isMulti = match[1] === 1;
          var validIf = (a.Name === "Block")
            ? '=SELECT(AppVariables[ID], AND([Column] = "Block", [Description] = [_THISROW].[District]))'
            : '=SPLIT(LOOKUP("' + qid + '", "AppVariables", "ID", "VariableList"), " , ")';

          var targetType = isMulti ? "EnumList" : "Enum";
          var aux = typeof a.TypeAuxData === "string" ? JSON.parse(a.TypeAuxData || "{}") : (a.TypeAuxData || {});

          a.Type = targetType;
          a.BaseType = "Ref";
          a.ReferencedTableName = "AppVariables";
          a.ReferencedRootTableName = "AppVariables";
          a.Valid_If = validIf;
          a.ValidIf = validIf;
          a.Suggested_Values = validIf;
          a.SuggestedValues = validIf;
          a.DisplayName = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';
          a.EnumValues = null;

          aux.BaseType = "Ref";
          aux.ReferencedTableName = "AppVariables";
          aux.ReferencedRootTableName = "AppVariables";
          aux.AllowOtherValues = false;
          aux.EnumValues = null;
          aux.Valid_If = validIf;
          aux.Suggested_Values = validIf;
          aux.EnumInputMode = "Dropdown";
          aux.BaseTypeQualifier = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedKeyColumn: "ID" });

          if (isMulti) {
            aux.ElementType = "Ref";
            aux.ElementTypeQualifier = aux.BaseTypeQualifier;
            aux.ItemSeparator = " , ";
            a.EnumListElementTypeName = "Ref";
          }

          a.TypeAuxData = JSON.stringify(aux);
          totalUpdated++;
        }
      });
    });

    var cleanActions = actions.filter(function(a) { return a.Name !== "Btn_Capital_Loans"; });

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: {
        "AppData.DataSchemas": schemas,
        "AppData.DataActions": cleanActions
      },
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("=== [SUCCESS] " + totalUpdated + " Option Columns Updated to Ref -> AppVariables! Click SAVE! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
