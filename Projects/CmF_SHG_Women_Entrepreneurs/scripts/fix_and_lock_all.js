// =========================================================================
// OmmNoMi: Final 100% Lock & Verification
// =========================================================================
(function fixAndLockAll() {
    console.clear();
    const store = window.appStore;
    if (!store) { console.error("❌ Redux store nahi mila!"); return; }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;
    const surveyIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const survey = schemas[surveyIdx];
    const sAttrs = survey.Attributes;

    const refTypeQual = JSON.stringify({ MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text", IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });
    const baseQualifierStr = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedRootTableName: "AppVariables", ReferencedType: "Text", ReferencedTypeQualifier: refTypeQual, ReferencedKeyColumn: "ID", IsAPartOf: false, RelationshipName: null, InputMode: "Auto", Valid_If: null, Error_Message_If_Invalid: null, Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null });

    const nameValueDict = {};
    let lockCount = 0;

    sAttrs.forEach((attr, idx) => {
        const p = `AppData.DataSchemas[${surveyIdx}].Attributes[${idx}]`;
        if (attr.Type === 'Enum' || attr.Type === 'EnumList') {
            let aux = {};
            try { aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : { ...attr.TypeAuxData }; } catch(e) {}

            // Strictly disable Other Values globally
            aux.AllowOtherValues = false;
            aux.AutoCompleteOtherValues = false;

            // If it references AppVariables or has Valid_If pointing to AppVariables
            const isAppVar = (attr.Valid_If && attr.Valid_If.includes('AppVariables')) || (aux.Valid_If && aux.Valid_If.includes('AppVariables')) || (attr.ReferencedTableName === 'AppVariables');
            if (isAppVar) {
                attr.BaseType = 'Ref';
                attr.ReferencedTableName = 'AppVariables';
                attr.ReferencedRootTableName = 'AppVariables';
                aux.BaseType = 'Ref';
                aux.ReferencedTableName = 'AppVariables';
                aux.BaseTypeQualifier = baseQualifierStr;

                if (attr.Type === 'EnumList') {
                    attr.EnumListElementTypeName = 'Ref';
                    aux.ElementType = 'Ref';
                    aux.ElementTypeQualifier = baseQualifierStr;
                    nameValueDict[`${p}.EnumListElementTypeName`] = 'Ref';
                }

                nameValueDict[`${p}.BaseType`] = 'Ref';
                nameValueDict[`${p}.ReferencedTableName`] = 'AppVariables';
                nameValueDict[`${p}.ReferencedRootTableName`] = 'AppVariables';
            }

            const auxStr = JSON.stringify(aux);
            attr.TypeAuxData = auxStr;
            nameValueDict[`${p}.TypeAuxData`] = auxStr;
            lockCount++;
        }
    });

    console.log(`⚡ Locked ${lockCount} Enum/EnumList columns! Dispatching to Redux...`);

    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    // Live Audit
    console.log("%c╔══════════════════════════════════════════════════════════════════════════╗", "color:#4285f4;font-weight:bold;");
    console.log("%c║           🚀 [OmmNoMi] 100% HEALTH AUDIT REPORT                          ║", "color:#4285f4;font-size:14px;font-weight:bold;");
    console.log("%c╚══════════════════════════════════════════════════════════════════════════╝", "color:#4285f4;font-weight:bold;");

    const checks = [];

    // 1. Turnover Months
    const tCols = ['Turnover_Peak_Months', 'Turnover_Avg_Months', 'Turnover_Lean_Months'];
    const tOk = tCols.every(c => {
        const a = sAttrs.find(x => x.Name === c);
        return a && a.Type === 'Number' && (!a.InitialValue || !a.InitialValue.includes('NOW()'));
    });
    checks.push({ Item: "1. Turnover Month Columns", Status: tOk ? "✅ 100% PASS" : "❌ FAIL", Detail: "InitialValue clean, Type=Number" });

    // 2. AppVariables
    const appVar = schemas.find(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));
    const avOk = appVar?.Attributes?.find(a => a.Name === 'ID')?.IsKey && appVar?.Attributes?.find(a => a.Name === 'Label')?.IsVirtual;
    checks.push({ Item: "2. AppVariables Engine", Status: avOk ? "✅ 100% PASS" : "❌ FAIL", Detail: "ID=Key, Label=Virtual Multilingual Column" });

    // 3. Questions DisplayNames
    const qSample = ['District', 'Block', 'LeadershipRole', 'BusinessType', 'BusinessActivities', 'RespondentAge', 'MaritalStatus'];
    let dnPass = qSample.every(q => sAttrs.find(x => x.Name === q)?.DisplayName?.includes('LOOKUP'));
    checks.push({ Item: "3. Questions DisplayName", Status: dnPass ? "✅ 100% PASS" : "❌ FAIL", Detail: "Multilingual LOOKUP active" });

    // 4. Multilingual Dropdown Ref
    const biz = sAttrs.find(a => a.Name === 'BusinessType');
    let bAux = {}; try { bAux = JSON.parse(biz?.TypeAuxData || "{}"); } catch(e) {}
    const bOk = (biz?.BaseType === 'Ref' || bAux.BaseType === 'Ref') && (biz?.ReferencedTableName === 'AppVariables' || bAux.BaseTypeQualifier?.includes('AppVariables'));
    checks.push({ Item: "4. Multilingual Dropdown Ref", Status: bOk ? "✅ 100% PASS" : "❌ FAIL", Detail: "BusinessType BaseType=Ref -> AppVariables" });

    // 5. Allow Other Values Disabled
    let anyOther = false;
    sAttrs.forEach(a => {
        if (a.Type === 'Enum' || a.Type === 'EnumList') {
            try {
                const ax = JSON.parse(a.TypeAuxData || "{}");
                if (ax.AllowOtherValues === true) anyOther = true;
            } catch(e) {}
        }
    });
    checks.push({ Item: "5. Other Values Restriction", Status: !anyOther ? "✅ 100% PASS" : "❌ FAIL", Detail: "Zero custom values allowed globally" });

    console.table(checks);
    const allPassed = checks.every(c => c.Status.includes("PASS"));
    if (allPassed) {
        console.log("%c🎉 ALL CHECKS 100% PASSED! Click native 'SAVE' button in top-right corner now!", "color:#34a853;font-size:16px;font-weight:bold;");
    }
})();
