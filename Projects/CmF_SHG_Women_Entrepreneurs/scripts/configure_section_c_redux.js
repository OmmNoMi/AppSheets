// =========================================================================
// OmmNoMi: Configure Section C Table Questions in AppSheet Editor
// =========================================================================
(function configureSectionCTables() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Initializing Section C Table Questions Configuration...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // 0. Close open modals
    const closeBtns = Array.from(document.querySelectorAll('button')).filter(b => {
        const txt = b.textContent?.trim().toLowerCase();
        return txt === 'done' || txt === 'cancel' || b.getAttribute('aria-label') === 'Close';
    });
    if (closeBtns.length > 0) {
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
        console.error("❌ Redux store not found! Make sure you are in the AppSheet editor.");
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

    // Reference TypeQualifier template
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
    const surveyAttrs = schemas[surveySchemaIdx].Attributes;

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

    // Helper to find attribute index
    const getAttrIdx = (colName) => surveyAttrs.findIndex(a => a.Name === colName);

    // List of Table Column Configurations
    const TABLE_CONFIGS = [
        // --- 1. Labor Involvement (Q_C_06) ---
        { col: "Labor_Purchase_Involvement", type: "Enum", is_ref: true, qid: "Q_C_06_Purchase_INV", valid_if: '=SPLIT(LOOKUP("Q_C_06_Purchase_INV", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Labor_Purchase_FamilyCount", type: "Number", is_ref: false, qid: "Q_C_06_Purchase_FAM" },
        { col: "Labor_Purchase_HiredCount", type: "Number", is_ref: false, qid: "Q_C_06_Purchase_HIRED" },
        { col: "Labor_Purchase_AmountPaid", type: "Price", is_ref: false, qid: "Q_C_06_Purchase_AMT" },
        { col: "Labor_Prod_Involvement", type: "Enum", is_ref: true, qid: "Q_C_06_Prod_INV", valid_if: '=SPLIT(LOOKUP("Q_C_06_Prod_INV", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Labor_Prod_FamilyCount", type: "Number", is_ref: false, qid: "Q_C_06_Prod_FAM" },
        { col: "Labor_Prod_HiredCount", type: "Number", is_ref: false, qid: "Q_C_06_Prod_HIRED" },
        { col: "Labor_Prod_AmountPaid", type: "Price", is_ref: false, qid: "Q_C_06_Prod_AMT" },
        { col: "Labor_Serv_Involvement", type: "Enum", is_ref: true, qid: "Q_C_06_Serv_INV", valid_if: '=SPLIT(LOOKUP("Q_C_06_Serv_INV", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Labor_Serv_FamilyCount", type: "Number", is_ref: false, qid: "Q_C_06_Serv_FAM" },
        { col: "Labor_Serv_HiredCount", type: "Number", is_ref: false, qid: "Q_C_06_Serv_HIRED" },
        { col: "Labor_Serv_AmountPaid", type: "Price", is_ref: false, qid: "Q_C_06_Serv_AMT" },
        { col: "Labor_Mktg_Involvement", type: "Enum", is_ref: true, qid: "Q_C_06_Mktg_INV", valid_if: '=SPLIT(LOOKUP("Q_C_06_Mktg_INV", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Labor_Mktg_FamilyCount", type: "Number", is_ref: false, qid: "Q_C_06_Mktg_FAM" },
        { col: "Labor_Mktg_HiredCount", type: "Number", is_ref: false, qid: "Q_C_06_Mktg_HIRED" },
        { col: "Labor_Mktg_AmountPaid", type: "Price", is_ref: false, qid: "Q_C_06_Mktg_AMT" },
        { col: "Labor_Sale_Involvement", type: "Enum", is_ref: true, qid: "Q_C_06_Sale_INV", valid_if: '=SPLIT(LOOKUP("Q_C_06_Sale_INV", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Labor_Sale_FamilyCount", type: "Number", is_ref: false, qid: "Q_C_06_Sale_FAM" },
        { col: "Labor_Sale_HiredCount", type: "Number", is_ref: false, qid: "Q_C_06_Sale_HIRED" },
        { col: "Labor_Sale_AmountPaid", type: "Price", is_ref: false, qid: "Q_C_06_Sale_AMT" },
        { col: "Labor_Record_Involvement", type: "Enum", is_ref: true, qid: "Q_C_06_Record_INV", valid_if: '=SPLIT(LOOKUP("Q_C_06_Record_INV", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Labor_Record_FamilyCount", type: "Number", is_ref: false, qid: "Q_C_06_Record_FAM" },
        { col: "Labor_Record_HiredCount", type: "Number", is_ref: false, qid: "Q_C_06_Record_HIRED" },
        { col: "Labor_Record_AmountPaid", type: "Price", is_ref: false, qid: "Q_C_06_Record_AMT" },
        // --- 2. Sourcing Percentages (Q_C_08) ---
        { col: "Sourcing_NearbyTown_Pct", type: "Enum", is_ref: true, qid: "Q_C_08_NearbyTown", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "Sourcing_Jaipur_Pct", type: "Enum", is_ref: true, qid: "Q_C_08_Jaipur", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "Sourcing_OutsideState_Pct", type: "Enum", is_ref: true, qid: "Q_C_08_OutsideState", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "Sourcing_Online_Pct", type: "Enum", is_ref: true, qid: "Q_C_08_Online", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "Sourcing_WhatsApp_Pct", type: "Enum", is_ref: true, qid: "Q_C_08_WhatsApp", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        // --- 3. Sales Channel Percentages (Q_C_12) ---
        { col: "SalesChannel_Online_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_Online", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "SalesChannel_WhatsApp_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_WhatsApp", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "SalesChannel_Instagram_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_Instagram", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "SalesChannel_Premise_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_Premise", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "SalesChannel_Traders_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_Traders", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "SalesChannel_Haat_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_Haat", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        { col: "SalesChannel_Saras_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_Saras", valid_if: 'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")' },
        // --- 4. Seasonal Turnover (Q_C_15) ---
        { col: "Turnover_Peak_Months", type: "Number", is_ref: false, qid: "Q_C_15_Peak_MTH" },
        { col: "Turnover_Peak_Sales", type: "Price", is_ref: false, qid: "Q_C_15_Peak_SALES" },
        { col: "Turnover_Peak_Profit", type: "Price", is_ref: false, qid: "Q_C_15_Peak_PROFIT" },
        { col: "Turnover_Avg_Months", type: "Number", is_ref: false, qid: "Q_C_15_Avg_MTH" },
        { col: "Turnover_Avg_Sales", type: "Price", is_ref: false, qid: "Q_C_15_Avg_SALES" },
        { col: "Turnover_Avg_Profit", type: "Price", is_ref: false, qid: "Q_C_15_Avg_PROFIT" },
        { col: "Turnover_Lean_Months", type: "Number", is_ref: false, qid: "Q_C_15_Lean_MTH" },
        { col: "Turnover_Lean_Sales", type: "Price", is_ref: false, qid: "Q_C_15_Lean_SALES" },
        { col: "Turnover_Lean_Profit", type: "Price", is_ref: false, qid: "Q_C_15_Lean_PROFIT" },
        // --- 5. Capital Trajectory (Q_C_19 & Q_C_20) ---
        { col: "Cap_OwnSavings_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_OwnSavings_YR1" },
        { col: "Cap_OwnSavings_Mid", type: "Price", is_ref: false, qid: "Q_C_19_OwnSavings_MID" },
        { col: "Cap_OwnSavings_Cur", type: "Price", is_ref: false, qid: "Q_C_19_OwnSavings_CUR" },
        { col: "Cap_OwnSavings_Pending", type: "Price", is_ref: false, qid: "Q_C_19_OwnSavings_PEN" },
        { col: "Cap_OwnSavings_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_OwnSavings_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_Family_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_Family_YR1" },
        { col: "Cap_Family_Mid", type: "Price", is_ref: false, qid: "Q_C_19_Family_MID" },
        { col: "Cap_Family_Cur", type: "Price", is_ref: false, qid: "Q_C_19_Family_CUR" },
        { col: "Cap_Family_Pending", type: "Price", is_ref: false, qid: "Q_C_19_Family_PEN" },
        { col: "Cap_Family_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_Family_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_Family_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_Profit_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_Profit_YR1" },
        { col: "Cap_Profit_Mid", type: "Price", is_ref: false, qid: "Q_C_19_Profit_MID" },
        { col: "Cap_Profit_Cur", type: "Price", is_ref: false, qid: "Q_C_19_Profit_CUR" },
        { col: "Cap_Profit_Pending", type: "Price", is_ref: false, qid: "Q_C_19_Profit_PEN" },
        { col: "Cap_Profit_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_Profit_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_Profit_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_MortgGold_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_MortgGold_YR1" },
        { col: "Cap_MortgGold_Mid", type: "Price", is_ref: false, qid: "Q_C_19_MortgGold_MID" },
        { col: "Cap_MortgGold_Cur", type: "Price", is_ref: false, qid: "Q_C_19_MortgGold_CUR" },
        { col: "Cap_MortgGold_Pending", type: "Price", is_ref: false, qid: "Q_C_19_MortgGold_PEN" },
        { col: "Cap_MortgGold_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_MortgGold_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_MortgGold_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_SoldGold_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_SoldGold_YR1" },
        { col: "Cap_SoldGold_Mid", type: "Price", is_ref: false, qid: "Q_C_19_SoldGold_MID" },
        { col: "Cap_SoldGold_Cur", type: "Price", is_ref: false, qid: "Q_C_19_SoldGold_CUR" },
        { col: "Cap_SoldGold_Pending", type: "Price", is_ref: false, qid: "Q_C_19_SoldGold_PEN" },
        { col: "Cap_SoldGold_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_SoldGold_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_SoldGold_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_FamLoan_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_FamLoan_YR1" },
        { col: "Cap_FamLoan_Mid", type: "Price", is_ref: false, qid: "Q_C_19_FamLoan_MID" },
        { col: "Cap_FamLoan_Cur", type: "Price", is_ref: false, qid: "Q_C_19_FamLoan_CUR" },
        { col: "Cap_FamLoan_Pending", type: "Price", is_ref: false, qid: "Q_C_19_FamLoan_PEN" },
        { col: "Cap_FamLoan_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_FamLoan_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_FamLoan_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_Moneylender_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_Moneylender_YR1" },
        { col: "Cap_Moneylender_Mid", type: "Price", is_ref: false, qid: "Q_C_19_Moneylender_MID" },
        { col: "Cap_Moneylender_Cur", type: "Price", is_ref: false, qid: "Q_C_19_Moneylender_CUR" },
        { col: "Cap_Moneylender_Pending", type: "Price", is_ref: false, qid: "Q_C_19_Moneylender_PEN" },
        { col: "Cap_Moneylender_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_Moneylender_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_Moneylender_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_SHGLoan_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_SHGLoan_YR1" },
        { col: "Cap_SHGLoan_Mid", type: "Price", is_ref: false, qid: "Q_C_19_SHGLoan_MID" },
        { col: "Cap_SHGLoan_Cur", type: "Price", is_ref: false, qid: "Q_C_19_SHGLoan_CUR" },
        { col: "Cap_SHGLoan_Pending", type: "Price", is_ref: false, qid: "Q_C_19_SHGLoan_PEN" },
        { col: "Cap_SHGLoan_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_SHGLoan_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_SHGLoan_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_OSFSVEPLoan_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_OSFSVEPLoan_YR1" },
        { col: "Cap_OSFSVEPLoan_Mid", type: "Price", is_ref: false, qid: "Q_C_19_OSFSVEPLoan_MID" },
        { col: "Cap_OSFSVEPLoan_Cur", type: "Price", is_ref: false, qid: "Q_C_19_OSFSVEPLoan_CUR" },
        { col: "Cap_OSFSVEPLoan_Pending", type: "Price", is_ref: false, qid: "Q_C_19_OSFSVEPLoan_PEN" },
        { col: "Cap_OSFSVEPLoan_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_OSFSVEPLoan_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_OSFSVEPLoan_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_OSFSubsidy_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_OSFSubsidy_YR1" },
        { col: "Cap_OSFSubsidy_Mid", type: "Price", is_ref: false, qid: "Q_C_19_OSFSubsidy_MID" },
        { col: "Cap_OSFSubsidy_Cur", type: "Price", is_ref: false, qid: "Q_C_19_OSFSubsidy_CUR" },
        { col: "Cap_OSFSubsidy_Pending", type: "Price", is_ref: false, qid: "Q_C_19_OSFSubsidy_PEN" },
        { col: "Cap_OSFSubsidy_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_OSFSubsidy_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_OSFSubsidy_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_PrivSaving_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_PrivSaving_YR1" },
        { col: "Cap_PrivSaving_Mid", type: "Price", is_ref: false, qid: "Q_C_19_PrivSaving_MID" },
        { col: "Cap_PrivSaving_Cur", type: "Price", is_ref: false, qid: "Q_C_19_PrivSaving_CUR" },
        { col: "Cap_PrivSaving_Pending", type: "Price", is_ref: false, qid: "Q_C_19_PrivSaving_PEN" },
        { col: "Cap_PrivSaving_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_PrivSaving_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_PrivSaving_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_NBFC_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_NBFC_YR1" },
        { col: "Cap_NBFC_Mid", type: "Price", is_ref: false, qid: "Q_C_19_NBFC_MID" },
        { col: "Cap_NBFC_Cur", type: "Price", is_ref: false, qid: "Q_C_19_NBFC_CUR" },
        { col: "Cap_NBFC_Pending", type: "Price", is_ref: false, qid: "Q_C_19_NBFC_PEN" },
        { col: "Cap_NBFC_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_NBFC_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_NBFC_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_Mudra_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_Mudra_YR1" },
        { col: "Cap_Mudra_Mid", type: "Price", is_ref: false, qid: "Q_C_19_Mudra_MID" },
        { col: "Cap_Mudra_Cur", type: "Price", is_ref: false, qid: "Q_C_19_Mudra_CUR" },
        { col: "Cap_Mudra_Pending", type: "Price", is_ref: false, qid: "Q_C_19_Mudra_PEN" },
        { col: "Cap_Mudra_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_Mudra_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_Mudra_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        { col: "Cap_BankLoan_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_BankLoan_YR1" },
        { col: "Cap_BankLoan_Mid", type: "Price", is_ref: false, qid: "Q_C_19_BankLoan_MID" },
        { col: "Cap_BankLoan_Cur", type: "Price", is_ref: false, qid: "Q_C_19_BankLoan_CUR" },
        { col: "Cap_BankLoan_Pending", type: "Price", is_ref: false, qid: "Q_C_19_BankLoan_PEN" },
        { col: "Cap_BankLoan_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_BankLoan_USE", valid_if: '=SPLIT(LOOKUP("Q_C_20_BankLoan_USE", "AppVariables", "ID", "VariableList"), " , ")' },
        // --- 6. Business Trajectory (Q_C_22) ---
        { col: "Trajectory_Sales_Yr1", type: "Price", is_ref: false, qid: "Q_C_22_Sales_YR1" },
        { col: "Trajectory_Sales_Cur", type: "Price", is_ref: false, qid: "Q_C_22_Sales_CUR" },
        { col: "Trajectory_Income_Yr1", type: "Price", is_ref: false, qid: "Q_C_22_Income_YR1" },
        { col: "Trajectory_Income_Cur", type: "Price", is_ref: false, qid: "Q_C_22_Income_CUR" },
        { col: "Trajectory_TradeStock_Yr1", type: "Price", is_ref: false, qid: "Q_C_22_TradeStock_YR1" },
        { col: "Trajectory_TradeStock_Cur", type: "Price", is_ref: false, qid: "Q_C_22_TradeStock_CUR" },
        { col: "Trajectory_ProdInputs_Yr1", type: "Price", is_ref: false, qid: "Q_C_22_ProdInputs_YR1" },
        { col: "Trajectory_ProdInputs_Cur", type: "Price", is_ref: false, qid: "Q_C_22_ProdInputs_CUR" },
        { col: "Trajectory_ProdFinished_Yr1", type: "Price", is_ref: false, qid: "Q_C_22_ProdFinished_YR1" },
        { col: "Trajectory_ProdFinished_Cur", type: "Price", is_ref: false, qid: "Q_C_22_ProdFinished_CUR" },
        { col: "Trajectory_ServAssets_Yr1", type: "Price", is_ref: false, qid: "Q_C_22_ServAssets_YR1" },
        { col: "Trajectory_ServAssets_Cur", type: "Price", is_ref: false, qid: "Q_C_22_ServAssets_CUR" },
        // --- 7. Financial Help Amounts (Q_C_23) ---
        { col: "FinancialHelp_EducationAmt", type: "Price", is_ref: false, qid: "Q_C_23_Amt" },
        { col: "FinancialHelp_DebtsAmt", type: "Price", is_ref: false, qid: "Q_C_23_Amt" },
        { col: "FinancialHelp_AssetsAmt", type: "Price", is_ref: false, qid: "Q_C_23_Amt" },
        { col: "FinancialHelp_MarriageAmt", type: "Price", is_ref: false, qid: "Q_C_23_Amt" },
    ];

    let countConfigured = 0;

    TABLE_CONFIGS.forEach(cfg => {
        const aIdx = getAttrIdx(cfg.col);
        if (aIdx === -1) {
            console.warn(`⚠️ Column not found in Survey table: ${cfg.col}`);
            return;
        }

        const attr = surveyAttrs[aIdx];
        const p = `AppData.DataSchemas[${surveySchemaIdx}].Attributes[${aIdx}]`;

        // 1. Set Type
        if (cfg.type) {
            attr.Type = cfg.type;
            nameValueDict[`${p}.Type`] = cfg.type;
        }

        // 2. Set Display_Name formula
        if (cfg.qid) {
            const dnFormula = `=LOOKUP("${cfg.qid}", "AppVariables", "ID", "Label")`;
            attr.DisplayName = dnFormula;
            nameValueDict[`${p}.DisplayName`] = dnFormula;
        }

        // 3. Configure Enum Ref
        if (cfg.is_ref) {
            let auxObj = {};
            if (attr.TypeAuxData) {
                try {
                    auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData };
                } catch(e) {}
            }

            auxObj.BaseType = "Ref";
            auxObj.ElementType = "Ref";
            auxObj.ReferencedTableName = "AppVariables";
            auxObj.BaseTypeQualifier = baseQualifierStr;
            auxObj.ElementTypeQualifier = baseQualifierStr;
            auxObj.UseDropdown = true;
            auxObj.InputMode = "Auto";

            if (cfg.valid_if) {
                auxObj.Valid_If = cfg.valid_if;
            }

            const auxStr = JSON.stringify(auxObj);
            attr.TypeAuxData = auxStr;
            nameValueDict[`${p}.TypeAuxData`] = auxStr;
        }

        countConfigured++;
    });

    console.log(`%c⚡ Staged ${countConfigured} matrix columns for Survey table. Dispatching to Redux...`, "color:#34a853;font-weight:bold;");

    // Dispatch batch to Redux
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    // Light up native Save button
    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log("%c🎉 [OmmNoMi] SUCCESS! All Section C Table Questions configured.", "color:#34a853;font-size:16px;font-weight:bold;");
    console.log("%c👉 Click the cloud 'SAVE' button in the top-right corner of AppSheet now!", "color:#ea4335;font-size:15px;font-weight:bold;");
})();
