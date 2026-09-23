// =========================================================================
// OmmNoMi: Configure ALL 83 Multilingual Dropdowns & Disable Other Values
// =========================================================================
(function configureAllMultilingualDropdowns() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Initializing Multilingual Dropdown Engine for ALL Survey Questions...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // 0. Close any open dialogs / modals
    const closeBtns = Array.from(document.querySelectorAll('button')).filter(b => {
        const txt = b.textContent?.trim().toLowerCase();
        return txt === 'done' || txt === 'cancel' || b.getAttribute('aria-label') === 'Close';
    });
    if (closeBtns.length > 0) {
        console.log(`⚠️ Closing ${closeBtns.length} open modal(s)...`);
        closeBtns.forEach(btn => { try { btn.click(); } catch(e) {} });
    }

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
        console.error("❌ Redux store not found! Please make sure you are in the AppSheet editor.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }

    const surveySchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    if (surveySchemaIdx === -1) {
        console.error("❌ Survey table schema not found!");
        return;
    }

    console.log(`✅ Located Schemas: Survey [${surveySchemaIdx}], AppVariables [${appVarSchemaIdx}]`);

    // Standard Ref Qualifier
    const refTypeQual = JSON.stringify({
        MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
        IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
        Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
    });
    const baseQualifierStr = JSON.stringify({
        ReferencedTableName: "AppVariables",
        ReferencedRootTableName: "AppVariables",
        ReferencedType: "Text",
        ReferencedTypeQualifier: refTypeQual,
        ReferencedKeyColumn: "ID",
        IsAPartOf: false,
        RelationshipName: null,
        InputMode: "Auto",
        Valid_If: null,
        Error_Message_If_Invalid: null,
        Show_If: null,
        Required_If: null,
        Editable_If: null,
        Reset_If: null,
        Suggested_Values: null
    });

    const nameValueDict = {};

    // 2. Safeguard AppVariables: ID = Key, Label = Virtual Column with Multilingual IFS Formula
    if (appVarSchemaIdx !== -1) {
        const avAttrs = schemas[appVarSchemaIdx].Attributes;
        const labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), [Title_raj], TRUE, [Title_hi])';

        avAttrs.forEach((attr, aIdx) => {
            const p = `AppData.DataSchemas[${appVarSchemaIdx}].Attributes[${aIdx}]`;
            if (attr.Name === 'ID') {
                attr.IsKey = true;
                attr.IsLabel = false;
                nameValueDict[`${p}.IsKey`] = true;
                nameValueDict[`${p}.IsLabel`] = false;
            } else if (attr.Name === 'Label') {
                attr.IsKey = false;
                attr.IsLabel = true;
                attr.IsVirtual = true;
                attr.SourceColumn = null;
                attr.IsReadOnly = true;
                attr.Type = 'Text';
                attr.AppFormula = labelFormula;

                nameValueDict[`${p}.IsKey`] = false;
                nameValueDict[`${p}.IsLabel`] = true;
                nameValueDict[`${p}.IsVirtual`] = true;
                nameValueDict[`${p}.SourceColumn`] = null;
                nameValueDict[`${p}.IsReadOnly`] = true;
                nameValueDict[`${p}.Type`] = 'Text';
                nameValueDict[`${p}.AppFormula`] = labelFormula;
            } else {
                if (attr.IsLabel) {
                    attr.IsLabel = false;
                    nameValueDict[`${p}.IsLabel`] = false;
                }
            }
        });
        console.log("🔹 AppVariables configured: ID=Key, Label=Virtual Column (Multilingual formula).");
    }

    // 3. Question Catalog (83 Questions)
    const QUESTION_CATALOG = [
        {
                "col": "Status_Profile",
                "qid": "Q_STAT_PROFILE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_STAT_PROFILE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_Operations",
                "qid": "Q_STAT_OPERATIONS",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_STAT_OPERATIONS\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_Challenges",
                "qid": "Q_STAT_CHALLENGES",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_STAT_CHALLENGES\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_SchemeImpact",
                "qid": "Q_STAT_SCHEME",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_STAT_SCHEME\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_Digital",
                "qid": "Q_STAT_DIGITAL",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_STAT_DIGITAL\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "Status_PostExit",
                "qid": "Q_STAT_POST_EXIT",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_STAT_POST_EXIT\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "District",
                "qid": "Q_A_01_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_A_01_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "Block",
                "qid": "Q_A_02_00",
                "is_multi": false,
                "valid_if": "=SELECT(AppVariables[ID], AND([Column] = \"Block\", [Description] = [_THISROW].[District]))",
                "section": "Section A: Basic Details"
        },
        {
                "col": "LeadershipRole",
                "qid": "Q_A_09_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_A_09_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "RelatedToCRP",
                "qid": "Q_A_11_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_A_11_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "EPInterventionType",
                "qid": "Q_A_12_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_A_12_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "BusinessType",
                "qid": "Q_A_16_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_A_16_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "BusinessActivities",
                "qid": "Q_A_17_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_A_17_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section A: Basic Details"
        },
        {
                "col": "RespondentAge",
                "qid": "Q_B_01_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_B_01_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "MaritalStatus",
                "qid": "Q_B_02_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_B_02_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "SocialCategory",
                "qid": "Q_B_03_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_B_03_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "EducationStatus",
                "qid": "Q_B_04_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_B_04_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "FamilyIncomeSources",
                "qid": "Q_B_07_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_B_07_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "AnnualHouseholdIncome",
                "qid": "Q_B_08_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_B_08_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section B: Respondent & Household Profile"
        },
        {
                "col": "ReasonsStartingBusiness",
                "qid": "Q_C_01_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_01_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "BusinessCycle",
                "qid": "Q_C_02_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_02_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "BusinessPlaceType",
                "qid": "Q_C_03_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_03_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "LocationConvenience",
                "qid": "Q_C_05_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_05_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Purchase_Involvement",
                "qid": "Q_C_06_Purchase_INV",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_06_Purchase_INV\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Prod_Involvement",
                "qid": "Q_C_06_Prod_INV",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_06_Prod_INV\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Serv_Involvement",
                "qid": "Q_C_06_Serv_INV",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_06_Serv_INV\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Mktg_Involvement",
                "qid": "Q_C_06_Mktg_INV",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_06_Mktg_INV\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Sale_Involvement",
                "qid": "Q_C_06_Sale_INV",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_06_Sale_INV\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Labor_Record_Involvement",
                "qid": "Q_C_06_Record_INV",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_06_Record_INV\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "AnnualSalaryBill",
                "qid": "Q_C_07_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_07_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_NearbyTown_Pct",
                "qid": "Q_C_08_NearbyTown",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_08_NearbyTown\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_Jaipur_Pct",
                "qid": "Q_C_08_Jaipur",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_08_Jaipur\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_OutsideState_Pct",
                "qid": "Q_C_08_OutsideState",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_08_OutsideState\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_Online_Pct",
                "qid": "Q_C_08_Online",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_08_Online\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Sourcing_WhatsApp_Pct",
                "qid": "Q_C_08_WhatsApp",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_08_WhatsApp\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "MarketingMethods",
                "qid": "Q_C_09_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_09_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SeasonalSalesMethod",
                "qid": "Q_C_10_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_10_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SocialMediaForMarketing",
                "qid": "Q_C_11_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_11_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Online_Pct",
                "qid": "Q_C_12_Online",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_12_Online\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_WhatsApp_Pct",
                "qid": "Q_C_12_WhatsApp",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_12_WhatsApp\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Instagram_Pct",
                "qid": "Q_C_12_Instagram",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_12_Instagram\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Premise_Pct",
                "qid": "Q_C_12_Premise",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_12_Premise\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Traders_Pct",
                "qid": "Q_C_12_Traders",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_12_Traders\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Haat_Pct",
                "qid": "Q_C_12_Haat",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_12_Haat\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SalesChannel_Saras_Pct",
                "qid": "Q_C_12_Saras",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_12_Saras\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "RecordKeepingHabit",
                "qid": "Q_C_13_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_13_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "RecordKeepingMethod",
                "qid": "Q_C_14_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_14_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "InitialCapitalArranged",
                "qid": "Q_C_17_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_17_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "SHGAssociationAssistance",
                "qid": "Q_C_18_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_18_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_OwnSavings_Usage",
                "qid": "Q_C_20_OwnSavings_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_OwnSavings_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Family_Usage",
                "qid": "Q_C_20_Family_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_Family_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Profit_Usage",
                "qid": "Q_C_20_Profit_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_Profit_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_MortgGold_Usage",
                "qid": "Q_C_20_MortgGold_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_MortgGold_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_SoldGold_Usage",
                "qid": "Q_C_20_SoldGold_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_SoldGold_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_FamLoan_Usage",
                "qid": "Q_C_20_FamLoan_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_FamLoan_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Moneylender_Usage",
                "qid": "Q_C_20_Moneylender_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_Moneylender_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_SHGLoan_Usage",
                "qid": "Q_C_20_SHGLoan_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_SHGLoan_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_OSFSVEPLoan_Usage",
                "qid": "Q_C_20_OSFSVEPLoan_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_OSFSVEPLoan_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_OSFSubsidy_Usage",
                "qid": "Q_C_20_OSFSubsidy_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_OSFSubsidy_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_PrivSaving_Usage",
                "qid": "Q_C_20_PrivSaving_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_PrivSaving_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_NBFC_Usage",
                "qid": "Q_C_20_NBFC_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_NBFC_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_Mudra_Usage",
                "qid": "Q_C_20_Mudra_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_Mudra_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "Cap_BankLoan_Usage",
                "qid": "Q_C_20_BankLoan_USE",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_20_BankLoan_USE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "MonthlyIncomeIncreaseByOSFSVEP",
                "qid": "Q_C_21_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_21_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "FinancialHelpFromIncome",
                "qid": "Q_C_23_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_C_23_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section C: Enterprise Operations"
        },
        {
                "col": "HusbandFamilyResponse",
                "qid": "Q_D_01_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_D_01_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "MaterialSourcingComfort",
                "qid": "Q_D_02_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_D_02_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "CustomerPaymentRecovery",
                "qid": "Q_D_03_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_D_03_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "FundingExperience",
                "qid": "Q_D_04_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_D_04_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "CurrentChallenges",
                "qid": "Q_D_05_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_D_05_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section D: Ease of Doing Business & Challenges"
        },
        {
                "col": "AttendedTraining",
                "qid": "Q_E_01_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_E_01_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section E: Impact of SVEP/OSF Schemes"
        },
        {
                "col": "UsedTrainingComponent",
                "qid": "Q_E_03_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_E_03_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section E: Impact of SVEP/OSF Schemes"
        },
        {
                "col": "CRPContributions",
                "qid": "Q_E_06_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_E_06_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section E: Impact of SVEP/OSF Schemes"
        },
        {
                "col": "SmartphoneOwnership",
                "qid": "Q_F_01_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_F_01_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "UseQRUPI",
                "qid": "Q_F_02_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_F_02_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "QRDailyTransactions",
                "qid": "Q_F_03_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_F_03_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "QRNonUseReason",
                "qid": "Q_F_04_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_F_04_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "SocialPlatformsUsed",
                "qid": "Q_F_05_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_F_05_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "SocialPlatformUsageMode",
                "qid": "Q_F_06_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_F_06_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "SocialMediaFrequency",
                "qid": "Q_F_07_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_F_07_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section F: Online Transactions & Social Media"
        },
        {
                "col": "BusinessOperationalStatus",
                "qid": "Q_G_02_00",
                "is_multi": false,
                "valid_if": "=SPLIT(LOOKUP(\"Q_G_02_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section G: Post-Exit OSF in Baran & Ratangarh"
        },
        {
                "col": "ScalingDownClosingReasons",
                "qid": "Q_G_03_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_G_03_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section G: Post-Exit OSF in Baran & Ratangarh"
        },
        {
                "col": "SupportNeededForSustenance",
                "qid": "Q_G_04_00",
                "is_multi": true,
                "valid_if": "=SPLIT(LOOKUP(\"Q_G_04_00\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")",
                "section": "Section G: Post-Exit OSF in Baran & Ratangarh"
        }
];

    const surveyAttrs = schemas[surveySchemaIdx].Attributes;
    const getAttrIdx = (colName) => surveyAttrs.findIndex(a => a.Name === colName);

    let configuredCount = 0;
    let singleCount = 0;
    let multiCount = 0;
    const notFound = [];

    // Process all catalogued dropdown questions
    QUESTION_CATALOG.forEach(cfg => {
        const aIdx = getAttrIdx(cfg.col);
        if (aIdx === -1) {
            notFound.push(cfg.col);
            return;
        }

        const attr = surveyAttrs[aIdx];
        const p = `AppData.DataSchemas[${surveySchemaIdx}].Attributes[${aIdx}]`;
        const isMulti = cfg.is_multi;
        const targetType = isMulti ? 'EnumList' : 'Enum';
        const dnFormula = `=LOOKUP("${cfg.qid}", "AppVariables", "ID", "Label")`;

        // 1. Set Column Type & DisplayName
        attr.Type = targetType;
        attr.DisplayName = dnFormula;
        nameValueDict[`${p}.Type`] = targetType;
        nameValueDict[`${p}.DisplayName`] = dnFormula;

        // 2. Build TypeAuxData with BaseType = Ref, AllowOtherValues = FALSE
        let auxObj = {};
        if (attr.TypeAuxData) {
            try {
                auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData };
            } catch(e) {}
        }

        // Strict Rules: No custom values allowed, true Ref to AppVariables
        auxObj.BaseType = "Ref";
        auxObj.ReferencedTableName = "AppVariables";
        auxObj.BaseTypeQualifier = baseQualifierStr;
        auxObj.AllowOtherValues = false;           // Strictly disabled
        auxObj.AutoCompleteOtherValues = false;     // Strictly disabled
        auxObj.EnumValues = [];
        auxObj.Valid_If = cfg.valid_if;
        auxObj.EnumInputMode = "Auto";
        auxObj.UseDropdown = true;

        if (isMulti) {
            auxObj.ElementType = "Ref";
            auxObj.ElementTypeQualifier = baseQualifierStr;
            auxObj.ItemSeparator = " , ";

            attr.BaseType = "Ref";
            attr.EnumListElementTypeName = "Ref";
            attr.ReferencedTableName = "AppVariables";
            attr.ReferencedRootTableName = "AppVariables";

            nameValueDict[`${p}.BaseType`] = "Ref";
            nameValueDict[`${p}.EnumListElementTypeName`] = "Ref";
            nameValueDict[`${p}.ReferencedTableName`] = "AppVariables";
            nameValueDict[`${p}.ReferencedRootTableName`] = "AppVariables";
            multiCount++;
        } else {
            attr.BaseType = "Ref";
            attr.ReferencedTableName = "AppVariables";
            attr.ReferencedRootTableName = "AppVariables";

            nameValueDict[`${p}.BaseType`] = "Ref";
            nameValueDict[`${p}.ReferencedTableName`] = "AppVariables";
            nameValueDict[`${p}.ReferencedRootTableName`] = "AppVariables";
            singleCount++;
        }

        const auxStr = JSON.stringify(auxObj);
        attr.TypeAuxData = auxStr;
        attr.Valid_If = cfg.valid_if;
        attr.ValidIf = cfg.valid_if;
        attr.EnumValues = [];

        nameValueDict[`${p}.TypeAuxData`] = auxStr;
        nameValueDict[`${p}.Valid_If`] = cfg.valid_if;

        configuredCount++;
    });

    // 4. Global Safeguard: Disable AllowOtherValues on ANY other Enum/EnumList column in Survey
    surveyAttrs.forEach((attr, aIdx) => {
        if (attr.Type === 'Enum' || attr.Type === 'EnumList') {
            const p = `AppData.DataSchemas[${surveySchemaIdx}].Attributes[${aIdx}]`;
            let changed = false;
            let auxObj = {};
            if (attr.TypeAuxData) {
                try {
                    auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData };
                } catch(e) {}
            }
            if (auxObj.AllowOtherValues !== false) {
                auxObj.AllowOtherValues = false;
                changed = true;
            }
            if (auxObj.AutoCompleteOtherValues !== false) {
                auxObj.AutoCompleteOtherValues = false;
                changed = true;
            }
            if (changed) {
                const auxStr = JSON.stringify(auxObj);
                attr.TypeAuxData = auxStr;
                nameValueDict[`${p}.TypeAuxData`] = auxStr;
            }
        }
    });

    console.log(`%c📊 Configuration Summary:`, "color:#4285f4;font-size:14px;font-weight:bold;");
    console.log(`   - Total Dropdowns Configured: ${configuredCount} / ${QUESTION_CATALOG.length}`);
    console.log(`   - Single-select (Enum Ref): ${singleCount}`);
    console.log(`   - Multi-select (EnumList Ref): ${multiCount}`);
    console.log(`   - Allow Other Values: STRICTLY FALSE on ALL columns`);
    if (notFound.length > 0) {
        console.warn(`⚠️ Columns not found in Survey table (${notFound.length}):`, notFound);
    }

    // 5. Dispatch to Redux Store
    const changeCount = Object.keys(nameValueDict).length;
    console.log(`%c🚀 Dispatching ${changeCount} Redux state changes...`, "color:#34a853;font-size:14px;font-weight:bold;");

    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log("%c✅ [OmmNoMi] All Dropdowns Configured! Click the native 'SAVE' button in the top right to commit.", "color:#34a853;font-size:16px;font-weight:bold;");
})();
