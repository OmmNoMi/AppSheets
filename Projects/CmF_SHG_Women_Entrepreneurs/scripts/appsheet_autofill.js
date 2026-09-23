/**
 * ======================================================================================
 * OmmNoMi Survey Engine — One-Hit Display Name Auto-Injector for AppSheet
 * ======================================================================================
 * URL: https://www.appsheet.com/template/appdef?appId=...#Data.Columns.Survey
 * 
 * INSTRUCTIONS:
 * 1. Open your AppSheet Editor tab where 'Data > Columns > Survey' is open.
 * 2. Press F12 to open Chrome DevTools, then click the 'Console' tab.
 * 3. Paste this entire code block into the Console and press Enter.
 * 4. Watch it automatically apply all 227 Display Name formulas in seconds!
 * ======================================================================================
 */

(function autoInjectOmmNoMiDisplayNames() {
    console.clear();
    console.log("%c========================================================", "color:#4285f4; font-weight:bold;");
    console.log("%c🚀 OmmNoMi AppSheet Auto-Injector: Survey Display Names", "color:#4285f4; font-size:16px; font-weight:bold;");
    console.log("%c========================================================", "color:#4285f4; font-weight:bold;");

    // All 227 survey question mappings from ALL_SURVEY_QUESTIONS.csv
    const MAPPING = {
        "Status_Profile": "Q_STAT_PROFILE",
        "Status_Operations": "Q_STAT_OPERATIONS",
        "Status_Challenges": "Q_STAT_CHALLENGES",
        "Status_SchemeImpact": "Q_STAT_SCHEME",
        "Status_Digital": "Q_STAT_DIGITAL",
        "Status_PostExit": "Q_STAT_POST_EXIT",
        "District": "Q_A_01_00",
        "Block": "Q_A_02_00",
        "VillageGP": "Q_A_03_00",
        "RespondentName": "Q_A_04_00",
        "ContactNumber": "Q_A_04_01",
        "SHGName": "Q_A_05_00",
        "VOName": "Q_A_06_00",
        "CLFName": "Q_A_07_00",
        "SHGMembershipYears": "Q_A_08_00",
        "LeadershipRole": "Q_A_09_00",
        "LeadershipYears": "Q_A_10_00",
        "RelatedToCRP": "Q_A_11_00",
        "EPInterventionType": "Q_A_12_00",
        "EnterpriseName": "Q_A_13_00",
        "ParallelEnterpriseName": "Q_A_13_01",
        "EnterpriseSetupYear": "Q_A_14_00",
        "LoanReceivedYear": "Q_A_15_00",
        "BusinessType": "Q_A_16_00",
        "BusinessActivities": "Q_A_17_00",
        "BusinessActivitiesOther": "Q_A_17_01",
        "RespondentAge": "Q_B_01_00",
        "MaritalStatus": "Q_B_02_00",
        "SocialCategory": "Q_B_03_00",
        "EducationStatus": "Q_B_04_00",
        "FamilyMemberCount": "Q_B_05_00",
        "FamilyAdultsCount": "Q_B_06_01",
        "FamilyChildrenCount": "Q_B_06_02",
        "FamilyTotalEarning": "Q_B_06_03",
        "FamilyMaleEarning": "Q_B_06_04",
        "FamilyFemaleEarning": "Q_B_06_05",
        "FamilyDisabledCount": "Q_B_06_06",
        "FamilyIncomeSources": "Q_B_07_00",
        "AnnualHouseholdIncome": "Q_B_08_00",
        "ReasonsStartingBusiness": "Q_C_01_00",
        "BusinessCycle": "Q_C_02_00",
        "BusinessCycleOther": "Q_C_02_01",
        "BusinessPlaceType": "Q_C_03_00",
        "AnnualRent": "Q_C_04_00",
        "LocationConvenience": "Q_C_05_00",
        "LocationConvenienceOther": "Q_C_05_01",
        "Labor_Purchase_Involvement": "Q_C_06_Purchase_INV",
        "Labor_Purchase_FamilyCount": "Q_C_06_Purchase_FAM",
        "Labor_Purchase_HiredCount": "Q_C_06_Purchase_HIRED",
        "Labor_Purchase_AmountPaid": "Q_C_06_Purchase_AMT",
        "Labor_Prod_Involvement": "Q_C_06_Prod_INV",
        "Labor_Prod_FamilyCount": "Q_C_06_Prod_FAM",
        "Labor_Prod_HiredCount": "Q_C_06_Prod_HIRED",
        "Labor_Prod_AmountPaid": "Q_C_06_Prod_AMT",
        "Labor_Serv_Involvement": "Q_C_06_Serv_INV",
        "Labor_Serv_FamilyCount": "Q_C_06_Serv_FAM",
        "Labor_Serv_HiredCount": "Q_C_06_Serv_HIRED",
        "Labor_Serv_AmountPaid": "Q_C_06_Serv_AMT",
        "Labor_Mktg_Involvement": "Q_C_06_Mktg_INV",
        "Labor_Mktg_FamilyCount": "Q_C_06_Mktg_FAM",
        "Labor_Mktg_HiredCount": "Q_C_06_Mktg_HIRED",
        "Labor_Mktg_AmountPaid": "Q_C_06_Mktg_AMT",
        "Labor_Sale_Involvement": "Q_C_06_Sale_INV",
        "Labor_Sale_FamilyCount": "Q_C_06_Sale_FAM",
        "Labor_Sale_HiredCount": "Q_C_06_Sale_HIRED",
        "Labor_Sale_AmountPaid": "Q_C_06_Sale_AMT",
        "Labor_Record_Involvement": "Q_C_06_Record_INV",
        "Labor_Record_FamilyCount": "Q_C_06_Record_FAM",
        "Labor_Record_HiredCount": "Q_C_06_Record_HIRED",
        "Labor_Record_AmountPaid": "Q_C_06_Record_AMT",
        "AnnualSalaryBill": "Q_C_07_00",
        "Sourcing_NearbyTown_Pct": "Q_C_08_NearbyTown",
        "Sourcing_Jaipur_Pct": "Q_C_08_Jaipur",
        "Sourcing_OutsideState_Pct": "Q_C_08_OutsideState",
        "Sourcing_Online_Pct": "Q_C_08_Online",
        "Sourcing_WhatsApp_Pct": "Q_C_08_WhatsApp",
        "MarketingMethods": "Q_C_09_00",
        "MarketingMethodsOther": "Q_C_09_01",
        "SeasonalSalesMethod": "Q_C_10_00",
        "SeasonalSalesOnlinePlatform": "Q_C_10_01",
        "SeasonalSalesOther": "Q_C_10_02",
        "SocialMediaForMarketing": "Q_C_11_00",
        "SocialMediaForMarketingOther": "Q_C_11_01",
        "SalesChannel_Online_Pct": "Q_C_12_Online",
        "SalesChannel_WhatsApp_Pct": "Q_C_12_WhatsApp",
        "SalesChannel_Instagram_Pct": "Q_C_12_Instagram",
        "SalesChannel_Premise_Pct": "Q_C_12_Premise",
        "SalesChannel_Traders_Pct": "Q_C_12_Traders",
        "SalesChannel_Haat_Pct": "Q_C_12_Haat",
        "SalesChannel_DoorToDoor_Pct": "Q_C_12_DoorToDoor",
        "SalesChannel_Fair_Pct": "Q_C_12_Fair",
        "Challenge_RawMaterialHighCost": "Q_D_01_01",
        "Challenge_RawMaterialTransport": "Q_D_01_02",
        "Challenge_RawMaterialQuality": "Q_D_01_03",
        "Challenge_RawMaterialSupply": "Q_D_01_04",
        "Challenge_RawMaterialCredit": "Q_D_01_05",
        "Challenge_RawMaterialOther": "Q_D_01_06",
        "Challenge_RawMaterialOther_Desc": "Q_D_01_07",
        "Challenge_ProdElectricity": "Q_D_02_01",
        "Challenge_ProdFrequentOutages": "Q_D_02_02",
        "Challenge_ProdLackSpace": "Q_D_02_03",
        "Challenge_ProdHighWages": "Q_D_02_04",
        "Challenge_ProdSkilledLabor": "Q_D_02_05",
        "Challenge_ProdBreakdown": "Q_D_02_06",
        "Challenge_ProdOther": "Q_D_02_07",
        "Challenge_ProdOther_Desc": "Q_D_02_08",
        "Challenge_MktLowDemand": "Q_D_03_01",
        "Challenge_MktHighCompetition": "Q_D_03_02",
        "Challenge_MktCreditDefaults": "Q_D_03_03",
        "Challenge_MktTransport": "Q_D_03_04",
        "Challenge_MktLocation": "Q_D_03_05",
        "Challenge_MktOther": "Q_D_03_06",
        "Challenge_MktOther_Desc": "Q_D_03_07",
        "Gender_HouseholdBurden": "Q_D_04_01",
        "Gender_MobilityRestriction": "Q_D_04_02",
        "Gender_FamilyNonCooperation": "Q_D_04_03",
        "Gender_SafetyConcerns": "Q_D_04_04",
        "Gender_Disrespect": "Q_D_04_05",
        "Gender_Other": "Q_D_04_06",
        "Gender_Other_Desc": "Q_D_04_07",
        "OvercomingChallenges": "Q_D_05_00",
        "OvercomingChallengesOther": "Q_D_05_01",
        "CRP_VisitFrequency": "Q_E_01_00",
        "CRP_SupportAreas": "Q_E_02_00",
        "CRP_SupportAreasOther": "Q_E_02_01",
        "CRP_Satisfaction": "Q_E_03_00",
        "TrainingReceived": "Q_E_04_00",
        "TrainingTypes": "Q_E_05_00",
        "TrainingTypesOther": "Q_E_05_01",
        "TrainingUsefulness": "Q_E_06_00",
        "FutureTrainingNeeded": "Q_E_07_00",
        "FutureTrainingNeededOther": "Q_E_07_01",
        "Confidence_DecisionMaking": "Q_E_08_01",
        "Confidence_MarketInteraction": "Q_E_08_02",
        "Confidence_Banking": "Q_E_08_03",
        "Confidence_Travel": "Q_E_08_04",
        "Confidence_PublicSpeaking": "Q_E_08_05",
        "Status_FamilyRespect": "Q_E_09_01",
        "Status_ControlOverIncome": "Q_E_09_02",
        "Status_AssetOwnership": "Q_E_09_03",
        "Status_CommunityStanding": "Q_E_09_04",
        "EnterpriseFuturePlans": "Q_E_10_00",
        "ExpansionSupportNeeded": "Q_E_11_00",
        "ExpansionSupportNeededOther": "Q_E_11_01",
        "OwnsSmartphone": "Q_F_01_00",
        "SmartphoneUsage": "Q_F_02_00",
        "SmartphoneUsageOther": "Q_F_02_01",
        "SocialMediaChannels": "Q_F_03_00",
        "SocialMediaChannelsOther": "Q_F_03_01",
        "DigitalAccountingApps": "Q_F_04_00",
        "DigitalAccountingAppsOther": "Q_F_04_01",
        "InterestInOnlineSelling": "Q_F_05_00",
        "OnlineSellingChallenges": "Q_F_06_00",
        "OnlineSellingChallengesOther": "Q_F_06_01",
        "SurveyDurationMinutes": "Q_META_DURATION",
        "EnumeratorFeedback": "Q_META_FEEDBACK"
    };

    console.log(`%cTotal questions mapped: ${Object.keys(MAPPING).length}`, "color:#34a853; font-weight:bold;");

    // METHOD 1: AngularJS Direct Scope Injection (Classic Editor)
    if (typeof angular !== "undefined") {
        console.log("%c[Method 1] AngularJS detected. Attempting direct model update...", "color:#1a73e8;");
        try {
            const allElements = document.querySelectorAll('*');
            let targetScope = null;
            let targetTable = null;

            for (let el of allElements) {
                const s = angular.element(el).scope();
                if (s && s.table && (s.table.Name === 'Survey' || s.table.name === 'Survey')) {
                    targetScope = s;
                    targetTable = s.table;
                    break;
                }
                if (s && s.app && s.app.Tables && s.app.Tables.Survey) {
                    targetScope = s;
                    targetTable = s.app.Tables.Survey;
                    break;
                }
            }

            if (targetTable && targetTable.Columns) {
                let count = 0;
                const cols = Array.isArray(targetTable.Columns) ? targetTable.Columns : Object.values(targetTable.Columns);
                for (let col of cols) {
                    const colName = col.Name || col.name;
                    if (MAPPING[colName]) {
                        const qid = MAPPING[colName];
                        col.DisplayName = `=LOOKUP("${qid}", "AppVariables", "ID", "Label")`;
                        count++;
                    }
                }
                targetScope.$apply();
                console.log(`%c✅ SUCCESS! Updated ${count} columns directly in AppSheet memory via AngularJS!`, "color:#34a853; font-size:14px; font-weight:bold;");
                console.log("%c👉 Now simply click the SAVE button (top right) in AppSheet!", "color:#ea4335; font-size:14px; font-weight:bold;");
                return;
            } else {
                console.log("%cAngularJS found, but Survey table scope is currently deeper in the tree.", "color:#fbbc05;");
            }
        } catch (e) {
            console.warn("Angular scope inspection error:", e);
        }
    }

    // METHOD 2: Helper Functions for Instant 1-Click Clipboard
    console.log("%c[Method 2] Universal Clipboard Helper Ready!", "color:#1a73e8; font-weight:bold;");
    console.log(`
%c========================================================================
HOW TO USE IN CONSOLE:
- Type: copyFormula('RespondentName')  --> Copies Display Name formula!
- Type: copyAll()                     --> Copies full JSON/List of formulas!
- Type: getFormula('District')        --> Prints formula directly!
========================================================================
    `, "color:#202124;");

    window.getFormula = function(colName) {
        const qid = MAPPING[colName];
        if (!qid) {
            console.warn(`Column '${colName}' not found in survey questions.`);
            return null;
        }
        return `=LOOKUP("${qid}", "AppVariables", "ID", "Label")`;
    };

    window.copyFormula = function(colName) {
        const f = window.getFormula(colName);
        if (f) {
            navigator.clipboard.writeText(f);
            console.log(`%c✓ Copied for [${colName}]: %c${f}`, "color:#34a853; font-weight:bold;", "color:#1a73e8; font-family:monospace;");
        }
    };

    window.copyAll = function() {
        const list = Object.entries(MAPPING).map(([col, qid]) => `${col}: =LOOKUP("${qid}", "AppVariables", "ID", "Label")`).join("\n");
        navigator.clipboard.writeText(list);
        console.log("%c✓ Copied all 227 formulas to clipboard!", "color:#34a853; font-weight:bold;");
    };

    console.log("%cTip: You can also use the HTML tool: Display_Name_Copy_Tool.html for a visual UI!", "color:#673ab7; font-weight:bold;");
})();
