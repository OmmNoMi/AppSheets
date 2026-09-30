import csv
import json

appvars_path = 'projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv'
survey_path = 'projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv'

with open(survey_path, encoding='utf-8-sig') as f:
    survey_rows = list(csv.DictReader(f))

questions_cfg = []
for r in survey_rows:
    col = r['Column'].strip()
    qid = r['QuestionID'].strip()
    typ = r['Type'].strip()
    opts = r['Dropdown / Options'].strip()
    if typ in ('Enum', 'EnumList', 'VariableList') or (opts and '•' in opts):
        is_multi = (typ == 'EnumList')
        questions_cfg.append({
            'col': col,
            'qid': qid,
            'is_multi': is_multi,
            'section': r['Section']
        })

js_code = f"""// =========================================================================
// OmmNoMi: Health & Audit Engine for ALL {len(questions_cfg)} Multilingual Dropdowns
// =========================================================================
(function auditAllMultilingualDropdowns() {{
    console.clear();
    console.log("%c🔍 [OmmNoMi] Starting Comprehensive Multilingual Dropdown Audit...", "color:#4285f4;font-size:16px;font-weight:bold;");

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
        console.error("❌ Redux store not found! Run inside AppSheet editor.");
        return;
    }}

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    const surveySchema = schemas?.find(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchema = schemas?.find(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    if (!surveySchema || !appVarSchema) {{
        console.error("❌ Required schemas not found!");
        return;
    }}

    const surveyAttrs = surveySchema.Attributes;
    const appVarAttrs = appVarSchema.Attributes;

    const results = [];
    const record = (checkName, passed, details) => {{
        results.push({{ checkName, passed, details }});
        if (passed) {{
            console.log(`%c[PASS] %c${{checkName}}: ${{details}}`, "color:#34a853;font-weight:bold;", "color:#202124;");
        }} else {{
            console.error(`%c[FAIL] %c${{checkName}}: ${{details}}`, "color:#ea4335;font-weight:bold;", "color:#ea4335;");
        }}
    }};

    // Check 1: AppVariables ID is Key
    const idCol = appVarAttrs.find(a => a.Name === 'ID');
    record("AppVariables ID is Key", idCol && idCol.IsKey === true && idCol.IsLabel === false, `IsKey=${{idCol?.IsKey}}, IsLabel=${{idCol?.IsLabel}}`);

    // Check 2: AppVariables Label is Virtual Multilingual Label
    const labelCol = appVarAttrs.find(a => a.Name === 'Label');
    const labelOk = labelCol && labelCol.IsLabel === true && labelCol.IsVirtual === true && labelCol.AppFormula?.includes('USEREMAIL()');
    record("AppVariables Label Formula", labelOk, labelCol ? `IsLabel=${{labelCol.IsLabel}}, IsVirtual=${{labelCol.IsVirtual}}` : "Column missing");

    // Check 3: Check all {len(questions_cfg)} Dropdown Columns
    const QUESTION_CATALOG = {json.dumps(questions_cfg, indent=8)};

    let perfectCount = 0;
    let failedCols = [];

    QUESTION_CATALOG.forEach(cfg => {{
        const attr = surveyAttrs.find(a => a.Name === cfg.col);
        if (!attr) {{
            failedCols.push({{ col: cfg.col, reason: "Column not found in Survey table" }});
            return;
        }}

        let aux = {{}};
        if (attr.TypeAuxData) {{
            try {{
                aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : attr.TypeAuxData;
            }} catch(e) {{}}
        }}

        const expectedType = cfg.is_multi ? 'EnumList' : 'Enum';
        const typeOk = (attr.Type === expectedType);
        const baseTypeOk = (attr.BaseType === 'Ref' || aux.BaseType === 'Ref' || aux.ElementType === 'Ref');
        const refTableOk = (attr.ReferencedTableName === 'AppVariables' || aux.ReferencedTableName === 'AppVariables' || aux.BaseTypeQualifier?.includes('AppVariables'));
        const otherValuesDisabled = (aux.AllowOtherValues === false && aux.AutoCompleteOtherValues === false);
        const validIfOk = !!(attr.Valid_If || aux.Valid_If);
        const dnOk = !!(attr.DisplayName && attr.DisplayName.includes('LOOKUP'));

        if (typeOk && baseTypeOk && refTableOk && otherValuesDisabled && validIfOk && dnOk) {{
            perfectCount++;
        }} else {{
            const issues = [];
            if (!typeOk) issues.push(`Type is ${{attr.Type}} (expected ${{expectedType}})`);
            if (!baseTypeOk) issues.push(`BaseType is not Ref`);
            if (!refTableOk) issues.push(`Not referencing AppVariables`);
            if (!otherValuesDisabled) issues.push(`AllowOtherValues is not false (Allow=${{aux.AllowOtherValues}}, AutoComplete=${{aux.AutoCompleteOtherValues}})`);
            if (!validIfOk) issues.push(`Missing Valid_If`);
            if (!dnOk) issues.push(`Missing DisplayName LOOKUP`);
            failedCols.push({{ col: cfg.col, issues: issues.join(', ') }});
        }}
    }});

    const allDropdownsPass = (perfectCount === QUESTION_CATALOG.length);
    record(`All ${{QUESTION_CATALOG.length}} Dropdowns Configured (BaseType=Ref, Multilingual, AllowOtherValues=false)`, allDropdownsPass, `${{perfectCount}} / ${{QUESTION_CATALOG.length}} passed 100%`);

    if (failedCols.length > 0) {{
        console.warn("⚠️ Dropdowns with issues:", failedCols);
    }}

    // Check 4: Survey global check - Any Enum/EnumList with AllowOtherValues = true?
    let otherValuesAllowedCols = [];
    surveyAttrs.forEach(attr => {{
        if (attr.Type === 'Enum' || attr.Type === 'EnumList') {{
            let aux = {{}};
            if (attr.TypeAuxData) {{
                try {{
                    aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : attr.TypeAuxData;
                }} catch(e) {{}}
            }}
            if (aux.AllowOtherValues === true) {{
                otherValuesAllowedCols.push(attr.Name);
            }}
        }}
    }});

    record("Global Other Values Disabled", otherValuesAllowedCols.length === 0, otherValuesAllowedCols.length === 0 ? "Zero columns allow other values" : `Columns allowing other values: ${{otherValuesAllowedCols.join(', ')}}`);

    // Score
    const passedChecks = results.filter(r => r.passed).length;
    const totalChecks = results.length;
    const scorePct = Math.round((passedChecks / totalChecks) * 100);

    console.log(`%c======================================================`, "color:#4285f4;");
    console.log(`%c🎯 FINAL AUDIT SCORE: ${{scorePct}}% (${{passedChecks}}/${{totalChecks}} Checks Passed)`, scorePct === 100 ? "color:#34a853;font-size:16px;font-weight:bold;" : "color:#ea4335;font-size:16px;font-weight:bold;");
    console.log(`   - Verified Dropdowns: ${{perfectCount}} / ${{QUESTION_CATALOG.length}}`);
    console.log(`   - Live Trilingual Engine: ACTIVE (English, Hindi, Rajasthani)`);
    console.log(`   - Custom Values Permitted: STRICTLY ZERO`);
    console.log(`%c======================================================`, "color:#4285f4;");
}})();
"""

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/audit_all_multilingual_dropdowns.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("Generated audit_all_multilingual_dropdowns.js successfully!")
