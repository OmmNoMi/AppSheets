import csv

# We will generate a complete Redux console script for Section C Table Questions
script_content = '''// =========================================================================
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
'''

# Now let's programmatically add all matrix columns
activities = [
    ("Purchase", "Purchase"),
    ("Prod", "Prod"),
    ("Serv", "Serv"),
    ("Mktg", "Mktg"),
    ("Sale", "Sale"),
    ("Record", "Record")
]

table_configs = []

for code, qcode in activities:
    table_configs.append(f'        {{ col: "Labor_{code}_Involvement", type: "Enum", is_ref: true, qid: "Q_C_06_{qcode}_INV", valid_if: \'=SPLIT(LOOKUP("Q_C_06_{qcode}_INV", "AppVariables", "ID", "VariableList"), " , ")\' }},')
    table_configs.append(f'        {{ col: "Labor_{code}_FamilyCount", type: "Number", is_ref: false, qid: "Q_C_06_{qcode}_FAM" }},')
    table_configs.append(f'        {{ col: "Labor_{code}_HiredCount", type: "Number", is_ref: false, qid: "Q_C_06_{qcode}_HIRED" }},')
    table_configs.append(f'        {{ col: "Labor_{code}_AmountPaid", type: "Price", is_ref: false, qid: "Q_C_06_{qcode}_AMT" }},')

table_configs.append('        // --- 2. Sourcing Percentages (Q_C_08) ---')
for src in ["NearbyTown", "Jaipur", "OutsideState", "Online", "WhatsApp"]:
    table_configs.append(f'        {{ col: "Sourcing_{src}_Pct", type: "Enum", is_ref: true, qid: "Q_C_08_{src}", valid_if: \'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")\' }},')

table_configs.append('        // --- 3. Sales Channel Percentages (Q_C_12) ---')
for ch in ["Online", "WhatsApp", "Instagram", "Premise", "Traders", "Haat", "Saras"]:
    table_configs.append(f'        {{ col: "SalesChannel_{ch}_Pct", type: "Enum", is_ref: true, qid: "Q_C_12_{ch}", valid_if: \'LIST("PCT_0", "PCT_25", "PCT_50", "PCT_75", "PCT_100")\' }},')

table_configs.append('        // --- 4. Seasonal Turnover (Q_C_15) ---')
for sz in ["Peak", "Avg", "Lean"]:
    table_configs.append(f'        {{ col: "Turnover_{sz}_Months", type: "Number", is_ref: false, qid: "Q_C_15_{sz}_MTH" }},')
    table_configs.append(f'        {{ col: "Turnover_{sz}_Sales", type: "Price", is_ref: false, qid: "Q_C_15_{sz}_SALES" }},')
    table_configs.append(f'        {{ col: "Turnover_{sz}_Profit", type: "Price", is_ref: false, qid: "Q_C_15_{sz}_PROFIT" }},')

table_configs.append('        // --- 5. Capital Trajectory (Q_C_19 & Q_C_20) ---')
cap_sources = [
    ("OwnSavings", "OwnSavings"),
    ("Family", "Family"),
    ("Profit", "Profit"),
    ("MortgGold", "MortgGold"),
    ("SoldGold", "SoldGold"),
    ("FamLoan", "FamLoan"),
    ("Moneylender", "Moneylender"),
    ("SHGLoan", "SHGLoan"),
    ("OSFSVEPLoan", "OSFSVEPLoan"),
    ("OSFSubsidy", "OSFSubsidy"),
    ("PrivSaving", "PrivSaving"),
    ("NBFC", "NBFC"),
    ("Mudra", "Mudra"),
    ("BankLoan", "BankLoan")
]
for col_src, q_src in cap_sources:
    table_configs.append(f'        {{ col: "Cap_{col_src}_Yr1", type: "Price", is_ref: false, qid: "Q_C_19_{q_src}_YR1" }},')
    table_configs.append(f'        {{ col: "Cap_{col_src}_Mid", type: "Price", is_ref: false, qid: "Q_C_19_{q_src}_MID" }},')
    table_configs.append(f'        {{ col: "Cap_{col_src}_Cur", type: "Price", is_ref: false, qid: "Q_C_19_{q_src}_CUR" }},')
    table_configs.append(f'        {{ col: "Cap_{col_src}_Pending", type: "Price", is_ref: false, qid: "Q_C_19_{q_src}_PEN" }},')
    table_configs.append(f'        {{ col: "Cap_{col_src}_Usage", type: "Enum", is_ref: true, qid: "Q_C_20_{q_src}_USE", valid_if: \'=SPLIT(LOOKUP("Q_C_20_{q_src}_USE", "AppVariables", "ID", "VariableList"), " , ")\' }},')

table_configs.append('        // --- 6. Business Trajectory (Q_C_22) ---')
for traj in ["Sales", "Income", "TradeStock", "ProdInputs", "ProdFinished", "ServAssets"]:
    table_configs.append(f'        {{ col: "Trajectory_{traj}_Yr1", type: "Price", is_ref: false, qid: "Q_C_22_{traj}_YR1" }},')
    table_configs.append(f'        {{ col: "Trajectory_{traj}_Cur", type: "Price", is_ref: false, qid: "Q_C_22_{traj}_CUR" }},')

table_configs.append('        // --- 7. Financial Help Amounts (Q_C_23) ---')
for fh in ["EducationAmt", "DebtsAmt", "AssetsAmt", "MarriageAmt"]:
    table_configs.append(f'        {{ col: "FinancialHelp_{fh}", type: "Price", is_ref: false, qid: "Q_C_23_{fh[-3:]}" }},')

script_content += '\n'.join(table_configs)

script_content += '''
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
'''

with open('scripts/configure_section_c_redux.js', 'w', encoding='utf-8') as f:
    f.write(script_content)

print(f"Generated configure_section_c_redux.js successfully! Length: {len(script_content)}")
