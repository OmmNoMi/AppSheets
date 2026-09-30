(function injectMasterDisplayNames() {
  try {
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length && !store; i++) {
        var keys = Object.keys(els[i]);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].startsWith('__reactFiber')) {
            var f = els[i][keys[k]];
            while (f && !store) {
              if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                store = f.memoizedProps.store;
              }
              f = f.return;
            }
            break;
          }
        }
      }
    }
    if (!store) { console.error('[FAIL] Redux store not found'); return; }
    console.log('[OK] Redux store found');

    var state = store.getState();
    var schemas = state.appTemplate.history[0].appTemplate.AppData.DataSchemas;
    
    // Find Survey schema
    var surveyIdx = -1;
    for (var si = 0; si < schemas.length; si++) {
      if (schemas[si].Name === 'Survey_Schema' || schemas[si].TableName === 'Survey') {
        surveyIdx = si;
        break;
      }
    }
    if (surveyIdx === -1) { console.error('[FAIL] Survey schema not found'); return; }
    console.log('[OK] Survey schema at idx=' + surveyIdx);

    var attrs = schemas[surveyIdx].Attributes;
    var nameToAttrIdx = {};
    for (var ai = 0; ai < attrs.length; ai++) {
      nameToAttrIdx[attrs[ai].Name] = ai;
    }

    var colMapping = {"District": "Q1. District", "Block": "Q2. Block", "VillageGP": "Q3. Village/GP", "RespondentName": "Q4. Respondent Name", "ContactNumber": "Q5. Respondent\u2019s phone number", "RespondentPhone": "Q5. Respondent\u2019s phone number", "SHGName": "Q6. SHG Name", "VOName": "Q7. VO Name", "CLFName": "Q8. CLF Name", "SHGMembershipYears": "Q9. Years of SHG membership", "LeadershipRole": "Q10. Have you been in a leadership role in SHG/CLF/VO?", "LeadershipYears": "Q11. Years of experience in leadership roles?", "RelatedToCRP": "Q12. Are you related to any of the SVEP/OSF CRP?", "EPInterventionType": "Q13. Type of Enterprise Promotion (EP) intervention", "EnterpriseName": "Q14. Enterprise Name", "ParallelEnterpriseName": "Parallel Enterprise Name (if running two businesses)", "EnterpriseSetupYear": "Q15. Years of setting up enterprise", "BusinessType": "Q16. Type of business enterprise (Multiselect)", "BusinessActivities": "Q17. Main business activities of the enterprise (Multiselect)", "BusinessActivitiesOther": "Specify other business activity", "LoanReceivedYear": "Q18. Years of receiving SVEP/OSF loan?", "MaintainSeparateRecords": "Q19. Do you maintain separate records for all the businesses", "RegistrationsDocuments": "Q20. Do you have the following registrations/documents?", "RespondentAge": "Q1. What is the age of the respondent?", "MaritalStatus": "Q2. What is the marital status?", "SocialCategory": "Q3. What is the social category?", "EducationStatus": "Q4. What is the education status?", "FamilyMemberCount": "Q5. How many members are in the family? ------- (count)", "SubTable_FamilyCount": "Q6. Give details of the family members? (count)", "FamilyAdultsCount": "Adults (Above 18)-------", "FamilyChildrenCount": "Children \u2014-------", "FamilyTotalEarning": "Total earning members ------", "FamilyMaleEarning": "Male earning members\u2014----", "FamilyFemaleEarning": "Female earning members\u2014----", "FamilyDisabledCount": "Members with disability-------", "FamilyIncomeSources": "Q7. What are your family\u2019s sources of income? (Multiselect)", "AnnualHouseholdIncome": "Q8. What is your annual household income and monetary benefits from all sources (including respondent\u2019s enterprise)?", "ReasonsStartingBusiness": "Q1. Reasons for starting the business? (Multiselect)", "BusinessCycle": "Q2. Describe your business cycle?", "BusinessCycleOther": "Specify other business cycle", "BusinessPlaceType": "Q3. What is the type of business place?", "AnnualRent": "Q4. If rented, what is monthly rent? Rs______( mention in numbers)", "LocationConvenience": "Q5. Is the location of your premise convenient for your customers?", "LocationConvenienceOther": "Specify other location convenience remark", "Related_Q6_Labor": "Q6. Involvement of family members and hired help in business operations", "Sourcing_NearbyTown_Pct": "Q7. Sourcing % from Nearby town/district (0%/25%/50%/75%/100%)", "Sourcing_Jaipur_Pct": "Q7. Sourcing % from Wholesale market within state (0%/25%/50%/75%/100%)", "Sourcing_OutsideState_Pct": "Q7. Sourcing % from Wholesale market outside the state (0%/25%/50%/75%/100%)", "Sourcing_Online_Pct": "Q7. Sourcing % from Order online (Amazon/Misho) (0%/25%/50%/75%/100%)", "MarketingMethods": "Q8. How do you market your products/services? (Multiselect)", "MarketingMethodsOther": "Specify other marketing method", "SeasonalSalesMethod": "Q9. How do you sell your products/services?", "SeasonalSalesOnlinePlatform": "Specify online platform used", "SeasonalSalesOther": "Specify other selling method", "SalesChannel_Online_Pct": "Q10. % sold through Online platforms", "SalesChannel_WhatsApp_Pct": "Q10. % sold through Whatsapp", "SalesChannel_Instagram_Pct": "Q10. % sold through Instagram", "SalesChannel_Premise_Pct": "Q10. % sold through Your premise", "SalesChannel_Traders_Pct": "Q10. % sold through Local traders/shopkeepers", "SalesChannel_Haat_Pct": "Q10. % sold through Local haat/market", "SalesChannel_Saras_Pct": "Q10. % sold through Saras fair", "RecordKeepingHabit": "Q11. Do you maintain written records of business transactions?", "RecordKeepingMethod": "Q12. How do you maintain business transactions?", "RecordKeepingOther": "Specify other record keeping method", "Related_Q15_Turnover": "Q13. Turnover and income from the enterprise", "SHGAssociationAssistance": "Q1. How has the SHG association helped in your enterprise? ( Multiselect)", "Related_Q19_Capital": "Q2. How have you arranged capital over the enterprise duration? ( Ask for each option. Put 0 if the source is not used)", "Related_Q20_Loan_Usage": "Q3. How did you use the loans taken from different sources?", "FundingExperience": "Q4. What has been your experience in funding your business? (Multi select)", "Related_Q22_Trajectory": "Q5. What changes have happened in your business?", "FinancialHelpFromIncome": "Q6. How has the income from the enterprise helped you financially? (Multiselect)", "FinancialHelp_EducationAmt": "Education related expenses amount (Rs)", "FinancialHelp_DebtsAmt": "Family debts repaid amount (Rs)", "FinancialHelp_AssetsAmt": "Acquiring assets amount (Rs)", "FinancialHelp_MarriageAmt": "Marriage expenses amount (Rs)", "HusbandFamilyResponse": "Q1. How has been your husband\u2019s response towards your enterprise? (Multiselect)", "MaterialSourcingComfort": "Q2. What is your level of comfort in sourcing material?", "CustomerPaymentRecovery": "Q3. Are you able to recover money from customers?", "CurrentChallenges": "Q4. What are the challenges you are facing now? (Multiselect)", "Challenge_OSFPhasedOutAmt": "OSF phased out fund requirement amount (Rs)", "Challenge_ScaleUpFundAmt": "Timely funds needed for peak season (Rs)", "Challenge_TimelyInputsAmt": "Renovation / Input fund requirement (Rs)", "Challenge_Other": "Other challenges details", "Competitors_Similar_Scale": "Q5. Same business scale (count) ______", "Competitors_Smaller_Scale": "Q5. Smaller business scale than yours (count) _______", "Competitors_Higher_Scale": "Q5. Higher business scale than yours (count) _________", "CompetitorAdvantages": "Q6. What advantage do you have over your competitors? (Multiselect)", "FutureExpansionPlans": "Q1. For next one year, what are your plans to increase the scale of your business?", "AspirationBottlenecks": "Q2. What is holding you back from pursuing these aspirations? (Multiselect, don't prompt)", "FutureFundsRequired": "Q3. How much funds do you need to fund your plan?", "AttendedTraining": "Q1. Have you attended any training under SVEP/OSF?", "TrainingDetails": "Q2. If Yes, specify__________", "UsedTrainingComponent": "Q3. Did you use any training component in your enterprise?", "UsedTrainingDetails": "Q4. If Yes, specify__________", "MonthlyIncomeBeforeLoan": "Q5. Income before the changes: Rs-------", "MonthlyIncomeAfterLoan": "Q5. Income after the changes: Rs---------", "MonthlyIncomeIncreaseByOSFSVEP": "Q6. Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?", "CRPContributions": "Q7. What has been the contribution of SVEP/OSF CRP in your enterprise? ( Multisepect)", "ExpectationsFromScheme": "Q8. What are your expectations from the SVEP/OSF scheme? (Please prompt)", "SmartphoneOwnership": "Q1. Do you own a smart phone?", "UseQRUPI": "Q2. Do you use QR code/mobile banking for money transactions?", "QRDailyTransactions": "Q3. If yes, daily how many transactions in your business are done using QR code/mobile banking?", "QRNonUseReason": "Q4. If no, reason for not using QR code/mobile banking for money related transactions", "SocialMediaForMarketing": "Q5. Do you use social media for marketing?", "SocialPlatformsUsed": "Q6. Which social media platforms do you use for your business? (Multiselect)", "SocialPlatformUsageMode": "Q7. How do you use these platforms in your business?", "SocialMediaFrequency": "Q8. How often do you use social media for your business?", "OSFInterventionYear": "Q1. In which year was the OSF intervention made?-------", "BusinessOperationalStatus": "Q2. Is your business still operational?", "ScalingDownClosingReasons": "Q3. What are the reasons for scaling down the business/closing the business? ( Don\u2019t prompt)", "SupportNeededForSustenance": "Q4. What kind of support could have helped you to manage your business?"};
    var idMapping = {"District": "Q_A_01_00", "Block": "Q_A_02_00", "VillageGP": "Q_A_03_00", "RespondentName": "Q_A_04_00", "ContactNumber": "Q_A_04_01", "RespondentPhone": "Q_A_04_01_PHONE", "SHGName": "Q_A_05_00", "VOName": "Q_A_06_00", "CLFName": "Q_A_07_00", "SHGMembershipYears": "Q_A_08_00", "LeadershipRole": "Q_A_09_00", "LeadershipYears": "Q_A_10_00", "RelatedToCRP": "Q_A_11_00", "EPInterventionType": "Q_A_12_00", "EnterpriseName": "Q_A_13_00", "ParallelEnterpriseName": "Q_A_13_01", "EnterpriseSetupYear": "Q_A_14_00", "BusinessType": "Q_A_16_00", "BusinessActivities": "Q_A_17_00", "BusinessActivitiesOther": "Q_A_17_01", "LoanReceivedYear": "Q_A_15_00", "MaintainSeparateRecords": "Q_A_18_00", "RegistrationsDocuments": "Q_A_19_00", "RespondentAge": "Q_B_01_00", "MaritalStatus": "Q_B_02_00", "SocialCategory": "Q_B_03_00", "EducationStatus": "Q_B_04_00", "FamilyMemberCount": "Q_B_05_00", "SubTable_FamilyCount": "Q_B_05", "FamilyAdultsCount": "Q_B_06_01", "FamilyChildrenCount": "Q_B_06_02", "FamilyTotalEarning": "Q_B_06_03", "FamilyMaleEarning": "Q_B_06_04", "FamilyFemaleEarning": "Q_B_06_05", "FamilyDisabledCount": "Q_B_06_06", "FamilyIncomeSources": "Q_B_07_00", "AnnualHouseholdIncome": "Q_B_08_00", "ReasonsStartingBusiness": "Q_C_01_00", "BusinessCycle": "Q_C_02_00", "BusinessCycleOther": "Q_C_02_01", "BusinessPlaceType": "Q_C_03_00", "AnnualRent": "Q_C_04_00", "LocationConvenience": "Q_C_05_00", "LocationConvenienceOther": "Q_C_05_01", "Related_Q6_Labor": "Q_C_06_00", "Sourcing_NearbyTown_Pct": "Q_C_07_01", "Sourcing_Jaipur_Pct": "Q_C_07_02", "Sourcing_OutsideState_Pct": "Q_C_07_03", "Sourcing_Online_Pct": "Q_C_07_04", "MarketingMethods": "Q_C_08_00", "MarketingMethodsOther": "Q_C_08_01", "SeasonalSalesMethod": "Q_C_09_00", "SeasonalSalesOnlinePlatform": "Q_C_09_01", "SeasonalSalesOther": "Q_C_09_02", "SalesChannel_Online_Pct": "Q_C_10_01", "SalesChannel_WhatsApp_Pct": "Q_C_10_02", "SalesChannel_Instagram_Pct": "Q_C_10_03", "SalesChannel_Premise_Pct": "Q_C_10_04", "SalesChannel_Traders_Pct": "Q_C_10_05", "SalesChannel_Haat_Pct": "Q_C_10_06", "SalesChannel_Saras_Pct": "Q_C_10_07", "RecordKeepingHabit": "Q_C_11_00", "RecordKeepingMethod": "Q_C_12_00", "RecordKeepingOther": "Q_C_12_01", "Related_Q15_Turnover": "Q_C_13_00", "SHGAssociationAssistance": "Q_D_01_00", "Related_Q19_Capital": "Q_D_02_00", "Related_Q20_Loan_Usage": "Q_D_03_00", "FundingExperience": "Q_D_04_00", "Related_Q22_Trajectory": "Q_D_05_00", "FinancialHelpFromIncome": "Q_D_06_00", "FinancialHelp_EducationAmt": "Q_D_06_ED", "FinancialHelp_DebtsAmt": "Q_D_06_DB", "FinancialHelp_AssetsAmt": "Q_D_06_AS", "FinancialHelp_MarriageAmt": "Q_D_06_MR", "HusbandFamilyResponse": "Q_E_01_00", "MaterialSourcingComfort": "Q_E_02_00", "CustomerPaymentRecovery": "Q_E_03_00", "CurrentChallenges": "Q_E_04_00", "Challenge_OSFPhasedOutAmt": "Q_E_04_01", "Challenge_ScaleUpFundAmt": "Q_E_04_02", "Challenge_TimelyInputsAmt": "Q_E_04_03", "Challenge_Other": "Q_E_04_04", "Competitors_Similar_Scale": "Q_D_06_01", "Competitors_Smaller_Scale": "Q_D_06_02", "Competitors_Higher_Scale": "Q_D_06_03", "CompetitorAdvantages": "Q_E_06_00", "FutureExpansionPlans": "Q_F_01_00", "AspirationBottlenecks": "Q_F_02_00", "FutureFundsRequired": "Q_F_03_00", "AttendedTraining": "Q_G_01_00", "TrainingDetails": "Q_G_02_00", "UsedTrainingComponent": "Q_G_03_00", "UsedTrainingDetails": "Q_G_04_00", "MonthlyIncomeBeforeLoan": "Q_G_05_01", "MonthlyIncomeAfterLoan": "Q_G_05_02", "MonthlyIncomeIncreaseByOSFSVEP": "Q_G_06_00", "CRPContributions": "Q_G_07_00", "ExpectationsFromScheme": "Q_G_08_00", "SmartphoneOwnership": "Q_H_01_00", "UseQRUPI": "Q_H_02_00", "QRDailyTransactions": "Q_H_03_00", "QRNonUseReason": "Q_H_04_00", "SocialMediaForMarketing": "Q_H_05_00", "SocialPlatformsUsed": "Q_H_06_00", "SocialPlatformUsageMode": "Q_H_07_00", "SocialMediaFrequency": "Q_H_08_00", "OSFInterventionYear": "Q_I_01_00", "BusinessOperationalStatus": "Q_I_02_00", "ScalingDownClosingReasons": "Q_I_03_00", "SupportNeededForSustenance": "Q_I_04_00"};

    var nameValueDict = {};
    var count = 0;

    for (var colName in colMapping) {
      if (nameToAttrIdx[colName] !== undefined) {
        var aIdx = nameToAttrIdx[colName];
        var qid = idMapping[colName];
        var exactTitle = colMapping[colName];
        var basePath = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + aIdx + ']';
        
        // Use trilingual lookup formula with fallback to exact title
        var displayFormula = '=IFS(USERLOCALE()="hi", LOOKUP("' + qid + '", "AppVariables", "ID", "Title_hi"), USERLOCALE()="raj", LOOKUP("' + qid + '", "AppVariables", "ID", "Title_raj"), true, "' + exactTitle.replace(/"/g, '\"') + '")';
        
        nameValueDict[basePath + '.DisplayName'] = displayFormula;
        count++;
      }
    }

    console.log('[OK] Prepared DisplayName updates for ' + count + ' Survey columns');

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log('[OK] Successfully injected exact verbatim DisplayNames for ' + count + ' Survey columns! CLICK SAVE BUTTON NOW!');
  } catch(e) {
    console.error('[ERROR]', e.message);
  }
})();
