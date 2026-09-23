// =========================================================================
// OmmNoMi: Live Audit & State Verification
// =========================================================================
(function verifyLiveState() {
    console.clear();
    const store = window.appStore;
    if (!store) {
        console.error("❌ Redux store (window.appStore) nahi mila!");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;
    const survey = schemas?.find(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    
    if (!survey) {
        console.error("❌ Survey_Schema table nahi mila!");
        return;
    }

    const sAttrs = survey.Attributes;

    console.log("%c╔══════════════════════════════════════════════════════════════════════════╗", "color:#4285f4;font-weight:bold;");
    console.log("%c║           🚀 [OmmNoMi] APP AUDIT & VERIFICATION REPORT                   ║", "color:#4285f4;font-size:14px;font-weight:bold;");
    console.log("%c╚══════════════════════════════════════════════════════════════════════════╝", "color:#4285f4;font-weight:bold;");

    // 1. Check User's Manual Work (Turnover Months)
    const tCols = ['Turnover_Peak_Months', 'Turnover_Avg_Months', 'Turnover_Lean_Months'];
    const turnoverResults = tCols.map(c => {
        const a = sAttrs.find(x => x.Name === c);
        const isOk = a && a.Type === 'Number' && (!a.InitialValue || !a.InitialValue.includes('NOW()'));
        return {
            Column: c,
            Type: a?.Type || 'N/A',
            InitialValue: a?.InitialValue || '(Empty)',
            Status: isOk ? "✅ 100% FIXED BY USER" : "❌ PENDING"
        };
    });

    console.log("%c\n1. [Aapka Kaam] Turnover Month Columns:", "color:#34a853;font-size:13px;font-weight:bold;");
    console.table(turnoverResults);

    // 2. Check Display Names (Multilingual Question Titles)
    let dnCount = 0;
    sAttrs.forEach(a => {
        if (a.DisplayName && a.DisplayName.includes('LOOKUP') && a.DisplayName.includes('AppVariables')) {
            dnCount++;
        }
    });

    // 3. Check BaseType Ref on Dropdowns
    const biz = sAttrs.find(a => a.Name === 'BusinessType');
    let bAux = {};
    try { bAux = JSON.parse(biz?.TypeAuxData || "{}"); } catch(e) {}
    const isRefOk = (biz?.BaseType === 'Ref' || bAux.BaseType === 'Ref') && 
                    (biz?.ReferencedTableName === 'AppVariables' || bAux.BaseTypeQualifier?.includes('AppVariables') || bAux.ReferencedTableName === 'AppVariables');

    // 4. Check AllowOtherValues Disabled Globally
    let otherValuesAllowedCount = 0;
    sAttrs.forEach(a => {
        if (a.Type === 'Enum' || a.Type === 'EnumList') {
            try {
                const ax = JSON.parse(a.TypeAuxData || "{}");
                if (ax.AllowOtherValues === true) otherValuesAllowedCount++;
            } catch(e) {}
        }
    });

    // 5. Summary Table
    const summary = [
        {
            Scope: "Aapka Kaam (Manual)",
            Item: "Turnover 3 Month Columns",
            Result: turnoverResults.every(r => r.Status.includes("FIXED")) ? "✅ PASS" : "❌ CHECK",
            Details: "Teeno columns Number ho gaye aur NOW() formula clean hai"
        },
        {
            Scope: "Automated (Script)",
            Item: "Question Multilingual DisplayNames",
            Result: dnCount >= 80 ? `✅ PASS (${dnCount} cols)` : `⚠️ ${dnCount} cols`,
            Details: "=LOOKUP(\"Q_...\", \"AppVariables\", \"ID\", \"Label\") set ho chuka hai"
        },
        {
            Scope: "Automated (Script)",
            Item: "Dropdowns BaseType: Ref",
            Result: isRefOk ? "✅ PASS" : "❌ CHECK",
            Details: "BusinessType & Dropdowns AppVariables ko refer kar rahe hain"
        },
        {
            Scope: "Automated (Script)",
            Item: "Allow Other Values (Restriction)",
            Result: otherValuesAllowedCount === 0 ? "✅ PASS (Strict 0)" : `⚠️ ${otherValuesAllowedCount} cols allow`,
            Details: "Koi bhi enum/dropdown bahar se custom text add nahi kar sakta"
        }
    ];

    console.log("%c\n2. Overall System Summary:", "color:#4285f4;font-size:13px;font-weight:bold;");
    console.table(summary);

    const isAllClean = turnoverResults.every(r => r.Status.includes("FIXED")) && dnCount >= 80 && isRefOk && otherValuesAllowedCount === 0;

    if (isAllClean) {
        console.log("%c\n🎉 SAB KUCH 100% PERFECT HAI! AppSheet me top-right SAVE button dabaiye!", "color:#34a853;font-size:15px;font-weight:bold;");
    } else {
        console.log("%c\n⚠️ Kuch items pending hain. Upar summary table check karein.", "color:#ea4335;font-size:14px;font-weight:bold;");
    }
})();
