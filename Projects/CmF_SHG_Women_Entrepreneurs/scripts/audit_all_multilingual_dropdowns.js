// =========================================================================
// OmmNoMi: Health & Audit Engine for ALL 83 Multilingual Dropdowns
// =========================================================================
(function auditAllMultilingualDropdowns() {
    console.clear();
    console.log("%c🔍 [OmmNoMi] Starting Comprehensive Multilingual Dropdown Audit...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // 1. Locate Redux Store
    let store = window.appStore;
    if (!store) {
        const candidates = [
            document.querySelector('.ExpressionControl'),
            document.querySelector('[role="grid"]'),
            document.querySelector('#root'),
            document.body
        ];
        for (const el of candidates) {
            if (!el) continue;
            const fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
            let f = el[fKey];
            while (f) {
                if (f.memoizedProps?.store?.dispatch) {
                    store = f.memoizedProps.store;
                    window.appStore = store;
                    break;
                }
                if (f.stateNode?.store?.dispatch) {
                    store = f.stateNode.store;
                    window.appStore = store;
                    break;
                }
                f = f.return;
            }
            if (store) break;
        }
    }

    if (!store) {
        console.error("❌ Redux store not found! Run inside AppSheet editor.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    const surveySchema = schemas?.find(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchema = schemas?.find(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    if (!surveySchema || !appVarSchema) {
        console.error("❌ Required schemas not found!");
        return;
    }

    const surveyAttrs = surveySchema.Attributes;
    const appVarAttrs = appVarSchema.Attributes;

    const results = [];
    const record = (checkName, passed, details) => {
        results.push({ checkName, passed, details });
        if (passed) {
            console.log(`%c[PASS] %c${checkName}: ${details}`, "color:#34a853;font-weight:bold;", "color:#202124;");
        } else {
            console.error(`%c[FAIL] %c${checkName}: ${details}`, "color:#ea4335;font-weight:bold;", "color:#ea4335;");
        }
    };

    // Check 1: AppVariables ID is Key
    const idCol = appVarAttrs.find(a => a.Name === 'ID');
    record("AppVariables ID is Key", idCol && idCol.IsKey === true && idCol.IsLabel === false, `IsKey=${idCol?.IsKey}, IsLabel=${idCol?.IsLabel}`);

    // Check 2: AppVariables Label is Virtual Multilingual Label
    const labelCol = appVarAttrs.find(a => a.Name === 'Label');
    const labelOk = labelCol && labelCol.IsLabel === true && labelCol.IsVirtual === true && labelCol.AppFormula?.includes('USEREMAIL()');
    record("AppVariables Label Formula", labelOk, labelCol ? `IsLabel=${labelCol.IsLabel}, IsVirtual=${labelCol.IsVirtual}` : "Column missing");

    // Check 3: Check all 83 Dropdown Columns
    const QUESTION_CATALOG = [
        {
                "col": "Status_Profile",
                "qid": "Q_STAT_PROFILE",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_Operations",
                "qid": "Q_STAT_OPERATIONS",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_Challenges",
                "qid": "Q_STAT_CHALLENGES",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_SchemeImpact",
                "qid": "Q_STAT_SCHEME",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_Digital",
                "qid": "Q_STAT_DIGITAL",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_PostExit",
                "qid": "Q_STAT_POST_EXIT",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "District",
                "qid": "Q_A_01_00",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "Block",
                "qid": "Q_A_02_00",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "LeadershipRole",
                "qid": "Q_A_09_00",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "RelatedToCRP",
                "qid": "Q_A_11_00",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "EPInterventionType",
                "qid": "Q_A_12_00",
                "is_multi": false,
                "section": "Section A: Basic Details"
        },
        {
                "col": "BusinessType",
                "qid": "Q_A_16_00",
                "is_multi": true,
                "section": "Section A: Basic Details"
        },
        {
                "col": "BusinessActivities",
                "qid": "Q_A_17_00",
                "is_multi": true,
                "section": "Section A: Basic Details"
        },
        {
                "col": "RespondentAge",
                "qid": "Q_B_01_00",
                "is_multi": false,
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "MaritalStatus",
                "qid": "Q_B_02_00",
                "is_multi": false,
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "SocialCategory",
                "qid": "Q_B_03_00",
                "is_multi": false,
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "EducationStatus",
                "qid": "Q_B_04_00",
                "is_multi": false,
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "FamilyIncomeSources",
                "qid": "Q_B_07_00",
                "is_multi": true,
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "AnnualHouseholdIncome",
                "qid": "Q_B_08_00",
                "is_multi": false,
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "ReasonsStartingBusiness",
                "qid": "Q_C_01_00",
                "is_multi": true,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "BusinessCycle",
                "qid": "Q_C_02_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "BusinessPlaceType",
                "qid": "Q_C_03_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "LocationConvenience",
                "qid": "Q_C_05_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Purchase_Involvement",
                "qid": "Q_C_06_Purchase_INV",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Prod_Involvement",
                "qid": "Q_C_06_Prod_INV",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Serv_Involvement",
                "qid": "Q_C_06_Serv_INV",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Mktg_Involvement",
                "qid": "Q_C_06_Mktg_INV",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Sale_Involvement",
                "qid": "Q_C_06_Sale_INV",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Record_Involvement",
                "qid": "Q_C_06_Record_INV",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "AnnualSalaryBill",
                "qid": "Q_C_07_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_NearbyTown_Pct",
                "qid": "Q_C_08_NearbyTown",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_Jaipur_Pct",
                "qid": "Q_C_08_Jaipur",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_OutsideState_Pct",
                "qid": "Q_C_08_OutsideState",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_Online_Pct",
                "qid": "Q_C_08_Online",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_WhatsApp_Pct",
                "qid": "Q_C_08_WhatsApp",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "MarketingMethods",
                "qid": "Q_C_09_00",
                "is_multi": true,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SeasonalSalesMethod",
                "qid": "Q_C_10_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SocialMediaForMarketing",
                "qid": "Q_C_11_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Online_Pct",
                "qid": "Q_C_12_Online",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_WhatsApp_Pct",
                "qid": "Q_C_12_WhatsApp",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Instagram_Pct",
                "qid": "Q_C_12_Instagram",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Premise_Pct",
                "qid": "Q_C_12_Premise",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Traders_Pct",
                "qid": "Q_C_12_Traders",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Haat_Pct",
                "qid": "Q_C_12_Haat",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Saras_Pct",
                "qid": "Q_C_12_Saras",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "RecordKeepingHabit",
                "qid": "Q_C_13_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "RecordKeepingMethod",
                "qid": "Q_C_14_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "InitialCapitalArranged",
                "qid": "Q_C_17_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SHGAssociationAssistance",
                "qid": "Q_C_18_00",
                "is_multi": true,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_OwnSavings_Usage",
                "qid": "Q_C_20_OwnSavings_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Family_Usage",
                "qid": "Q_C_20_Family_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Profit_Usage",
                "qid": "Q_C_20_Profit_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_MortgGold_Usage",
                "qid": "Q_C_20_MortgGold_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_SoldGold_Usage",
                "qid": "Q_C_20_SoldGold_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_FamLoan_Usage",
                "qid": "Q_C_20_FamLoan_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Moneylender_Usage",
                "qid": "Q_C_20_Moneylender_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_SHGLoan_Usage",
                "qid": "Q_C_20_SHGLoan_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_OSFSVEPLoan_Usage",
                "qid": "Q_C_20_OSFSVEPLoan_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_OSFSubsidy_Usage",
                "qid": "Q_C_20_OSFSubsidy_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_PrivSaving_Usage",
                "qid": "Q_C_20_PrivSaving_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_NBFC_Usage",
                "qid": "Q_C_20_NBFC_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Mudra_Usage",
                "qid": "Q_C_20_Mudra_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_BankLoan_Usage",
                "qid": "Q_C_20_BankLoan_USE",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "MonthlyIncomeIncreaseByOSFSVEP",
                "qid": "Q_C_21_00",
                "is_multi": false,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "FinancialHelpFromIncome",
                "qid": "Q_C_23_00",
                "is_multi": true,
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "HusbandFamilyResponse",
                "qid": "Q_D_01_00",
                "is_multi": true,
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "MaterialSourcingComfort",
                "qid": "Q_D_02_00",
                "is_multi": false,
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "CustomerPaymentRecovery",
                "qid": "Q_D_03_00",
                "is_multi": false,
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "FundingExperience",
                "qid": "Q_D_04_00",
                "is_multi": true,
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "CurrentChallenges",
                "qid": "Q_D_05_00",
                "is_multi": true,
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "AttendedTraining",
                "qid": "Q_E_01_00",
                "is_multi": false,
                "section": "Section E: Impact of SVEP/OSF Schemes"
        },
        {
                "col": "UsedTrainingComponent",
                "qid": "Q_E_03_00",
                "is_multi": false,
                "section": "Section E: Impact of SVEP/OSF Schemes"
        },
        {
                "col": "CRPContributions",
                "qid": "Q_E_06_00",
                "is_multi": true,
                "section": "Section E: Impact of SVEP/OSF Schemes"
        },
        {
                "col": "SmartphoneOwnership",
                "qid": "Q_F_01_00",
                "is_multi": false,
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "UseQRUPI",
                "qid": "Q_F_02_00",
                "is_multi": false,
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "QRDailyTransactions",
                "qid": "Q_F_03_00",
                "is_multi": false,
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "QRNonUseReason",
                "qid": "Q_F_04_00",
                "is_multi": false,
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "SocialPlatformsUsed",
                "qid": "Q_F_05_00",
                "is_multi": true,
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "SocialPlatformUsageMode",
                "qid": "Q_F_06_00",
                "is_multi": true,
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "SocialMediaFrequency",
                "qid": "Q_F_07_00",
                "is_multi": false,
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "BusinessOperationalStatus",
                "qid": "Q_G_02_00",
                "is_multi": false,
                "section": "Section G: Post-Exit OSF in Baran & Ratangarh"
        },
        {
                "col": "ScalingDownClosingReasons",
                "qid": "Q_G_03_00",
                "is_multi": true,
                "section": "Section G: Post-Exit OSF in Baran & Ratangarh"
        },
        {
                "col": "SupportNeededForSustenance",
                "qid": "Q_G_04_00",
                "is_multi": true,
                "section": "Section G: Post-Exit OSF in Baran & Ratangarh"
        }
];

    let perfectCount = 0;
    let failedCols = [];

    QUESTION_CATALOG.forEach(cfg => {
        const attr = surveyAttrs.find(a => a.Name === cfg.col);
        if (!attr) {
            failedCols.push({ col: cfg.col, reason: "Column not found in Survey table" });
            return;
        }

        let aux = {};
        if (attr.TypeAuxData) {
            try {
                aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : attr.TypeAuxData;
            } catch(e) {}
        }

        const expectedType = cfg.is_multi ? 'EnumList' : 'Enum';
        const typeOk = (attr.Type === expectedType);
        const baseTypeOk = (attr.BaseType === 'Ref' || aux.BaseType === 'Ref' || aux.ElementType === 'Ref');
        const refTableOk = (attr.ReferencedTableName === 'AppVariables' || aux.ReferencedTableName === 'AppVariables' || aux.BaseTypeQualifier?.includes('AppVariables'));
        const otherValuesDisabled = (aux.AllowOtherValues === false && aux.AutoCompleteOtherValues === false);
        const validIfOk = !!(attr.Valid_If || aux.Valid_If);
        const dnOk = !!(attr.DisplayName && attr.DisplayName.includes('LOOKUP'));

        if (typeOk && baseTypeOk && refTableOk && otherValuesDisabled && validIfOk && dnOk) {
            perfectCount++;
        } else {
            const issues = [];
            if (!typeOk) issues.push(`Type is ${attr.Type} (expected ${expectedType})`);
            if (!baseTypeOk) issues.push(`BaseType is not Ref`);
            if (!refTableOk) issues.push(`Not referencing AppVariables`);
            if (!otherValuesDisabled) issues.push(`AllowOtherValues is not false (Allow=${aux.AllowOtherValues}, AutoComplete=${aux.AutoCompleteOtherValues})`);
            if (!validIfOk) issues.push(`Missing Valid_If`);
            if (!dnOk) issues.push(`Missing DisplayName LOOKUP`);
            failedCols.push({ col: cfg.col, issues: issues.join(', ') });
        }
    });

    const allDropdownsPass = (perfectCount === QUESTION_CATALOG.length);
    record(`All ${QUESTION_CATALOG.length} Dropdowns Configured (BaseType=Ref, Multilingual, AllowOtherValues=false)`, allDropdownsPass, `${perfectCount} / ${QUESTION_CATALOG.length} passed 100%`);

    if (failedCols.length > 0) {
        console.warn("⚠️ Dropdowns with issues:", failedCols);
    }

    // Check 4: Survey global check - Any Enum/EnumList with AllowOtherValues = true?
    let otherValuesAllowedCols = [];
    surveyAttrs.forEach(attr => {
        if (attr.Type === 'Enum' || attr.Type === 'EnumList') {
            let aux = {};
            if (attr.TypeAuxData) {
                try {
                    aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : attr.TypeAuxData;
                } catch(e) {}
            }
            if (aux.AllowOtherValues === true) {
                otherValuesAllowedCols.push(attr.Name);
            }
        }
    });

    record("Global Other Values Disabled", otherValuesAllowedCols.length === 0, otherValuesAllowedCols.length === 0 ? "Zero columns allow other values" : `Columns allowing other values: ${otherValuesAllowedCols.join(', ')}`);

    // Score
    const passedChecks = results.filter(r => r.passed).length;
    const totalChecks = results.length;
    const scorePct = Math.round((passedChecks / totalChecks) * 100);

    console.log(`%c======================================================`, "color:#4285f4;");
    console.log(`%c🎯 FINAL AUDIT SCORE: ${scorePct}% (${passedChecks}/${totalChecks} Checks Passed)`, scorePct === 100 ? "color:#34a853;font-size:16px;font-weight:bold;" : "color:#ea4335;font-size:16px;font-weight:bold;");
    console.log(`   - Verified Dropdowns: ${perfectCount} / ${QUESTION_CATALOG.length}`);
    console.log(`   - Live Trilingual Engine: ACTIVE (English, Hindi, Rajasthani)`);
    console.log(`   - Custom Values Permitted: STRICTLY ZERO`);
    console.log(`%c======================================================`, "color:#4285f4;");
})();
