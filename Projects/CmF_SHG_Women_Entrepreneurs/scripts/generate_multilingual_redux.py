import csv
import json

appvars_path = 'projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv'
survey_path = 'projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv'

with open(appvars_path, encoding='utf-8') as f:
    appvar_rows = list(csv.DictReader(f))

with open(survey_path, encoding='utf-8-sig') as f:
    survey_rows = list(csv.DictReader(f))

id_map = {r['ID']: r for r in appvar_rows}

questions_cfg = []
for r in survey_rows:
    col = r['Column'].strip()
    qid = r['QuestionID'].strip()
    typ = r['Type'].strip()
    opts = r['Dropdown / Options'].strip()
    if typ in ('Enum', 'EnumList', 'VariableList') or (opts and '•' in opts):
        is_multi = (typ == 'EnumList')
        
        # Determine Valid_If
        if col == 'Block':
            valid_if = '=SELECT(AppVariables[ID], AND([Column] = "Block", [Description] = [_THISROW].[District]))'
        else:
            valid_if = f'=SPLIT(LOOKUP("{qid}", "AppVariables", "ID", "VariableList"), " , ")'
            
        questions_cfg.append({
            'col': col,
            'qid': qid,
            'is_multi': is_multi,
            'valid_if': valid_if,
            'section': r['Section']
        })

print(f"Total dropdown questions to configure: {len(questions_cfg)}")

js_code = f"""// =========================================================================
// OmmNoMi: Configure ALL {len(questions_cfg)} Multilingual Dropdowns & Disable Other Values
// =========================================================================
(function configureAllMultilingualDropdowns() {{
    console.clear();
    console.log("%c🚀 [OmmNoMi] Initializing Multilingual Dropdown Engine for ALL Survey Questions...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // 0. Close any open dialogs / modals
    const closeBtns = Array.from(document.querySelectorAll('button')).filter(b => {{
        const txt = b.textContent?.trim().toLowerCase();
        return txt === 'done' || txt === 'cancel' || b.getAttribute('aria-label') === 'Close';
    }});
    if (closeBtns.length > 0) {{
        console.log(`⚠️ Closing ${{closeBtns.length}} open modal(s)...`);
        closeBtns.forEach(btn => {{ try {{ btn.click(); }} catch(e) {{}} }});
    }}

    // 1. Locate Redux Store
    let store = window.appStore;
    if (!store) {{
        const candidates = [
            document.querySelector('.ExpressionControl'),
            document.querySelector('[role="grid"]'),
            document.querySelector('#root'),
            document.body
        ];
        for (const el of candidates) {{
            if (!el) continue;
            const fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
            let f = el[fKey];
            while (f) {{
                if (f.memoizedProps?.store?.dispatch) {{
                    store = f.memoizedProps.store;
                    window.appStore = store;
                    break;
                }}
                if (f.stateNode?.store?.dispatch) {{
                    store = f.stateNode.store;
                    window.appStore = store;
                    break;
                }}
                f = f.return;
            }}
            if (store) break;
        }}
    }}

    if (!store) {{
        console.error("❌ Redux store not found! Please make sure you are in the AppSheet editor.");
        return;
    }}

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {{
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }}

    const surveySchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    if (surveySchemaIdx === -1) {{
        console.error("❌ Survey table schema not found!");
        return;
    }}

    console.log(`✅ Located Schemas: Survey [${{surveySchemaIdx}}], AppVariables [${{appVarSchemaIdx}}]`);

    // Standard Ref Qualifier
    const refTypeQual = JSON.stringify({{
        MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
        IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
        Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
    }});
    const baseQualifierStr = JSON.stringify({{
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
    }});

    const nameValueDict = {{}};

    // 2. Safeguard AppVariables: ID = Key, Label = Virtual Column with Multilingual IFS Formula
    if (appVarSchemaIdx !== -1) {{
        const avAttrs = schemas[appVarSchemaIdx].Attributes;
        const labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_EN", "English", "en")), [Title], IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), [Title_raj], TRUE, [Title_hi])';

        avAttrs.forEach((attr, aIdx) => {{
            const p = `AppData.DataSchemas[${{appVarSchemaIdx}}].Attributes[${{aIdx}}]`;
            if (attr.Name === 'ID') {{
                attr.IsKey = true;
                attr.IsLabel = false;
                nameValueDict[`${{p}}.IsKey`] = true;
                nameValueDict[`${{p}}.IsLabel`] = false;
            }} else if (attr.Name === 'Label') {{
                attr.IsKey = false;
                attr.IsLabel = true;
                attr.IsVirtual = true;
                attr.SourceColumn = null;
                attr.IsReadOnly = true;
                attr.Type = 'Text';
                attr.AppFormula = labelFormula;

                nameValueDict[`${{p}}.IsKey`] = false;
                nameValueDict[`${{p}}.IsLabel`] = true;
                nameValueDict[`${{p}}.IsVirtual`] = true;
                nameValueDict[`${{p}}.SourceColumn`] = null;
                nameValueDict[`${{p}}.IsReadOnly`] = true;
                nameValueDict[`${{p}}.Type`] = 'Text';
                nameValueDict[`${{p}}.AppFormula`] = labelFormula;
            }} else {{
                if (attr.IsLabel) {{
                    attr.IsLabel = false;
                    nameValueDict[`${{p}}.IsLabel`] = false;
                }}
            }}
        }});
        console.log("🔹 AppVariables configured: ID=Key, Label=Virtual Column (Multilingual formula).");
    }}

    // 3. Question Catalog ({len(questions_cfg)} Questions)
    const QUESTION_CATALOG = {json.dumps(questions_cfg, indent=8)};

    const surveyAttrs = schemas[surveySchemaIdx].Attributes;
    const getAttrIdx = (colName) => surveyAttrs.findIndex(a => a.Name === colName);

    let configuredCount = 0;
    let singleCount = 0;
    let multiCount = 0;
    const notFound = [];

    // Process all catalogued dropdown questions
    QUESTION_CATALOG.forEach(cfg => {{
        const aIdx = getAttrIdx(cfg.col);
        if (aIdx === -1) {{
            notFound.push(cfg.col);
            return;
        }}

        const attr = surveyAttrs[aIdx];
        const p = `AppData.DataSchemas[${{surveySchemaIdx}}].Attributes[${{aIdx}}]`;
        const isMulti = cfg.is_multi;
        const targetType = isMulti ? 'EnumList' : 'Enum';
        const dnFormula = `=LOOKUP("${{cfg.qid}}", "AppVariables", "ID", "Label")`;

        // 1. Set Column Type & DisplayName
        attr.Type = targetType;
        attr.DisplayName = dnFormula;
        nameValueDict[`${{p}}.Type`] = targetType;
        nameValueDict[`${{p}}.DisplayName`] = dnFormula;

        // 2. Build TypeAuxData with BaseType = Ref, AllowOtherValues = FALSE
        let auxObj = {{}};
        if (attr.TypeAuxData) {{
            try {{
                auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : {{ ...attr.TypeAuxData }};
            }} catch(e) {{}}
        }}

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

        if (isMulti) {{
            auxObj.ElementType = "Ref";
            auxObj.ElementTypeQualifier = baseQualifierStr;
            auxObj.ItemSeparator = " , ";

            attr.BaseType = "Ref";
            attr.EnumListElementTypeName = "Ref";
            attr.ReferencedTableName = "AppVariables";
            attr.ReferencedRootTableName = "AppVariables";

            nameValueDict[`${{p}}.BaseType`] = "Ref";
            nameValueDict[`${{p}}.EnumListElementTypeName`] = "Ref";
            nameValueDict[`${{p}}.ReferencedTableName`] = "AppVariables";
            nameValueDict[`${{p}}.ReferencedRootTableName`] = "AppVariables";
            multiCount++;
        }} else {{
            attr.BaseType = "Ref";
            attr.ReferencedTableName = "AppVariables";
            attr.ReferencedRootTableName = "AppVariables";

            nameValueDict[`${{p}}.BaseType`] = "Ref";
            nameValueDict[`${{p}}.ReferencedTableName`] = "AppVariables";
            nameValueDict[`${{p}}.ReferencedRootTableName`] = "AppVariables";
            singleCount++;
        }}

        const auxStr = JSON.stringify(auxObj);
        attr.TypeAuxData = auxStr;
        attr.Valid_If = cfg.valid_if;
        attr.ValidIf = cfg.valid_if;
        attr.EnumValues = [];

        nameValueDict[`${{p}}.TypeAuxData`] = auxStr;
        nameValueDict[`${{p}}.Valid_If`] = cfg.valid_if;

        configuredCount++;
    }});

    // 4. Global Safeguard: Disable AllowOtherValues on ANY other Enum/EnumList column in Survey
    surveyAttrs.forEach((attr, aIdx) => {{
        if (attr.Type === 'Enum' || attr.Type === 'EnumList') {{
            const p = `AppData.DataSchemas[${{surveySchemaIdx}}].Attributes[${{aIdx}}]`;
            let changed = false;
            let auxObj = {{}};
            if (attr.TypeAuxData) {{
                try {{
                    auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : {{ ...attr.TypeAuxData }};
                }} catch(e) {{}}
            }}
            if (auxObj.AllowOtherValues !== false) {{
                auxObj.AllowOtherValues = false;
                changed = true;
            }}
            if (auxObj.AutoCompleteOtherValues !== false) {{
                auxObj.AutoCompleteOtherValues = false;
                changed = true;
            }}
            if (changed) {{
                const auxStr = JSON.stringify(auxObj);
                attr.TypeAuxData = auxStr;
                nameValueDict[`${{p}}.TypeAuxData`] = auxStr;
            }}
        }}
    }});

    console.log(`%c📊 Configuration Summary:`, "color:#4285f4;font-size:14px;font-weight:bold;");
    console.log(`   - Total Dropdowns Configured: ${{configuredCount}} / ${{QUESTION_CATALOG.length}}`);
    console.log(`   - Single-select (Enum Ref): ${{singleCount}}`);
    console.log(`   - Multi-select (EnumList Ref): ${{multiCount}}`);
    console.log(`   - Allow Other Values: STRICTLY FALSE on ALL columns`);
    if (notFound.length > 0) {{
        console.warn(`⚠️ Columns not found in Survey table (${{notFound.length}}):`, notFound);
    }}

    // 5. Dispatch to Redux Store
    const changeCount = Object.keys(nameValueDict).length;
    console.log(`%c🚀 Dispatching ${{changeCount}} Redux state changes...`, "color:#34a853;font-size:14px;font-weight:bold;");

    store.dispatch({{
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    }});

    store.dispatch({{
        type: 'SHOW_SAVE_BUTTON',
        value: true
    }});

    console.log("%c✅ [OmmNoMi] All Dropdowns Configured! Click the native 'SAVE' button in the top right to commit.", "color:#34a853;font-size:16px;font-weight:bold;");
}})();
"""

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/configure_all_multilingual_dropdowns.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("Generated configure_all_multilingual_dropdowns.js successfully!")
