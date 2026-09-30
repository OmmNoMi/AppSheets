/**
 * =========================================================================
 * OmmNoMi: AppSheet Complete Configuration & Health Audit Engine
 * =========================================================================
 */
(function runOmmNoMiAudit() {
    console.clear();
    console.log("%c╔══════════════════════════════════════════════════════════════════════════════╗", "color:#4285f4;font-weight:bold;");
    console.log("%c║       🚀 [OmmNoMi] APPSHEET CONFIGURATION HEALTH AUDIT IN PROGRESS...        ║", "color:#4285f4;font-weight:bold;font-size:14px;");
    console.log("%c╚══════════════════════════════════════════════════════════════════════════════╝", "color:#4285f4;font-weight:bold;");

    // 1. Locate Store
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
        console.error("❌ Redux store nahi mila! Kripya AppSheet Editor me page refresh karke dobara run karein.");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas state me nahi mile!");
        return;
    }

    const surveySchema = schemas.find(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchema = schemas.find(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));
    const appUserSchema = schemas.find(s => s && s.Attributes?.some(a => a.Name === 'Email'));

    let totalChecks = 0;
    let passedChecks = 0;
    let warningChecks = 0;
    const report = [];

    function addCheck(category, item, status, detail) {
        totalChecks++;
        if (status === "PASS") passedChecks++;
        else warningChecks++;
        report.push({
            Category: category,
            Item: item,
            Status: status === "PASS" ? "✅ PASS" : "⚠️ CHECK",
            Detail: detail
        });
    }

    // -------------------------------------------------------------
    // CHECK 1: AppVariables Structure
    // -------------------------------------------------------------
    if (appVarSchema) {
        const idAttr = appVarSchema.Attributes.find(a => a.Name === 'ID');
        const labelAttr = appVarSchema.Attributes.find(a => a.Name === 'Label');
        
        if (idAttr?.IsKey) {
            addCheck("AppVariables", "ID IsKey", "PASS", "ID is correctly set as Table Key");
        } else {
            addCheck("AppVariables", "ID IsKey", "WARN", "ID is NOT marked as Key");
        }

        if (labelAttr?.IsVirtual && labelAttr?.IsLabel) {
            const hasFormula = labelAttr.AppFormula && labelAttr.AppFormula.includes("USEREMAIL");
            addCheck("AppVariables", "Label Virtual Column", hasFormula ? "PASS" : "WARN", 
                hasFormula ? "Multilingual formula active" : "Formula missing or physical column");
        } else {
            addCheck("AppVariables", "Label Virtual Column", "WARN", "Label is not set as IsVirtual: true");
        }
    } else {
        addCheck("AppVariables", "Schema Exists", "WARN", "AppVariables schema not found");
    }

    // -------------------------------------------------------------
    // CHECK 2: AppUser Language Selector
    // -------------------------------------------------------------
    if (appUserSchema) {
        const langAttr = appUserSchema.Attributes.find(a => a.Name === 'Language');
        if (langAttr) {
            addCheck("AppUser", "Language Column", "PASS", `Type: ${langAttr.Type}`);
        } else {
            addCheck("AppUser", "Language Column", "WARN", "Language column missing in AppUser");
        }
    }

    // -------------------------------------------------------------
    // CHECK 3: Survey Multilingual Dropdowns & Q14
    // -------------------------------------------------------------
    if (surveySchema) {
        const sAttrs = surveySchema.Attributes;
        
        // Helper to inspect aux data
        const getAux = (attr) => {
            if (!attr?.TypeAuxData) return {};
            try { return typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : attr.TypeAuxData; } catch(e) { return {}; }
        };

        // Q14 BusinessActivities
        const actAttr = sAttrs.find(a => a.Name === 'BusinessActivities');
        if (actAttr) {
            const aux = getAux(actAttr);
            const isRef = (aux.BaseType === 'Ref' || aux.ElementType === 'Ref') && aux.ReferencedTableName === 'AppVariables';
            addCheck("Section A", "Q14 BusinessActivities", isRef ? "PASS" : "WARN", 
                `Type: ${actAttr.Type}, BaseType: ${aux.BaseType || 'None'}, Ref: ${aux.ReferencedTableName || 'None'}`);
        }

        // Q16 BusinessType
        const btyAttr = sAttrs.find(a => a.Name === 'BusinessType');
        if (btyAttr) {
            const aux = getAux(btyAttr);
            const isRef = (aux.BaseType === 'Ref' || aux.ElementType === 'Ref') && aux.ReferencedTableName === 'AppVariables';
            addCheck("Section A", "Q16 BusinessType", isRef ? "PASS" : "WARN", 
                `Type: ${btyAttr.Type}, BaseType: ${aux.BaseType || 'None'}, Ref: ${aux.ReferencedTableName || 'None'}`);
        }

        // Block & District
        const blkAttr = sAttrs.find(a => a.Name === 'Block');
        if (blkAttr) {
            const aux = getAux(blkAttr);
            const isRef = (aux.BaseType === 'Ref' || aux.ElementType === 'Ref') && aux.ReferencedTableName === 'AppVariables';
            addCheck("Section A", "Block Dropdown", isRef ? "PASS" : "WARN", 
                `Type: ${blkAttr.Type}, Ref: ${aux.ReferencedTableName || 'None'}`);
        }

        // -------------------------------------------------------------
        // CHECK 4: Section C Table Questions
        // -------------------------------------------------------------
        
        // Labor Involvement
        const laborInvs = ["Purchase", "Prod", "Serv", "Mktg", "Sale", "Record"];
        let laborPassCount = 0;
        laborInvs.forEach(act => {
            const attr = sAttrs.find(a => a.Name === `Labor_${act}_Involvement`);
            if (attr) {
                const aux = getAux(attr);
                if (aux.BaseType === 'Ref' && aux.ReferencedTableName === 'AppVariables') laborPassCount++;
            }
        });
        addCheck("Section C Tables", "Labor Involvement (6 Acts)", laborPassCount === 6 ? "PASS" : "WARN", 
            `${laborPassCount}/6 activities configured as Enum Ref to AppVariables`);

        // Sourcing Percentages
        const sourcingSources = ["NearbyTown", "Jaipur", "OutsideState", "Online", "WhatsApp"];
        let srcPassCount = 0;
        sourcingSources.forEach(s => {
            const attr = sAttrs.find(a => a.Name === `Sourcing_${s}_Pct`);
            if (attr) {
                const aux = getAux(attr);
                if (aux.BaseType === 'Ref' && aux.ReferencedTableName === 'AppVariables') srcPassCount++;
            }
        });
        addCheck("Section C Tables", "Sourcing Percentages (5 Sources)", srcPassCount === 5 ? "PASS" : "WARN", 
            `${srcPassCount}/5 sourcing channels configured as Enum Ref`);

        // Sales Channel Percentages
        const salesChannels = ["Online", "WhatsApp", "Instagram", "Premise", "Traders", "Haat", "Saras"];
        let salePassCount = 0;
        salesChannels.forEach(c => {
            const attr = sAttrs.find(a => a.Name === `SalesChannel_${c}_Pct`);
            if (attr) {
                const aux = getAux(attr);
                if (aux.BaseType === 'Ref' && aux.ReferencedTableName === 'AppVariables') salePassCount++;
            }
        });
        addCheck("Section C Tables", "Sales Channel % (7 Channels)", salePassCount === 7 ? "PASS" : "WARN", 
            `${salePassCount}/7 sales channels configured as Enum Ref`);

        // Capital Trajectory Usage Dropdowns (14 sources)
        const capSources = [
            "OwnSavings", "Family", "Profit", "MortgGold", "SoldGold", "FamLoan",
            "Moneylender", "SHGLoan", "OSFSVEPLoan", "OSFSubsidy", "PrivSaving",
            "NBFC", "Mudra", "BankLoan"
        ];
        let capPassCount = 0;
        let capDnCount = 0;
        capSources.forEach(src => {
            const usageAttr = sAttrs.find(a => a.Name === `Cap_${src}_Usage`);
            if (usageAttr) {
                const aux = getAux(usageAttr);
                if (aux.BaseType === 'Ref' && aux.ReferencedTableName === 'AppVariables') capPassCount++;
            }
            const yr1Attr = sAttrs.find(a => a.Name === `Cap_${src}_Yr1`);
            if (yr1Attr?.DisplayName && yr1Attr.DisplayName.includes('LOOKUP')) capDnCount++;
        });
        addCheck("Section C Tables", "Capital Trajectory Usage (14 Sources)", capPassCount === 14 ? "PASS" : "WARN", 
            `${capPassCount}/14 loan usage dropdowns configured as Enum Ref to AppVariables`);
        addCheck("Section C Tables", "Capital Trajectory DisplayNames", capDnCount === 14 ? "PASS" : "WARN", 
            `${capDnCount}/14 capital source amounts have multilingual LOOKUP formulas`);

        // Seasonal Turnover (Peak, Avg, Lean)
        let turnoverCount = 0;
        ["Peak", "Avg", "Lean"].forEach(sz => {
            const salesAttr = sAttrs.find(a => a.Name === `Turnover_${sz}_Sales`);
            if (salesAttr?.Type === 'Price' || salesAttr?.Type === 'Decimal') turnoverCount++;
        });
        addCheck("Section C Tables", "Turnover Seasons (3 Seasons)", turnoverCount === 3 ? "PASS" : "WARN", 
            `${turnoverCount}/3 turnover seasons configured as Price/Decimal`);

        // Business Trajectory (6 indicators)
        let trajCount = 0;
        ["Sales", "Income", "TradeStock", "ProdInputs", "ProdFinished", "ServAssets"].forEach(t => {
            const tAttr = sAttrs.find(a => a.Name === `Trajectory_${t}_Yr1`);
            if (tAttr?.Type === 'Price' || tAttr?.Type === 'Decimal') trajCount++;
        });
        addCheck("Section C Tables", "Business Trajectory (6 Indicators)", trajCount === 6 ? "PASS" : "WARN", 
            `${trajCount}/6 trajectory indicators configured`);
    }

    // -------------------------------------------------------------
    // PRINT BEAUTIFUL CONSOLE TABLE
    // -------------------------------------------------------------
    console.table(report);

    const scorePct = Math.round((passedChecks / totalChecks) * 100);
    console.log(`\n%c📊 AUDIT SCORE: ${scorePct}% (${passedChecks}/${totalChecks} Checks Passed)`, 
        scorePct === 100 ? "color:#34a853;font-size:16px;font-weight:bold;" : "color:#fbbc05;font-size:16px;font-weight:bold;");

    if (scorePct === 100) {
        console.log("%c🎉 EXCELLENT! AppSheet schema, dropdowns, and Section C table questions are 100% HEALTHY and properly configured!", "color:#34a853;font-size:14px;font-weight:bold;");
    } else {
        console.log("%c⚠️ Kuch checks me warning aayi hai. Upar table me detail dekhein.", "color:#ea4335;font-size:14px;font-weight:bold;");
    }

    return { totalChecks, passedChecks, warningChecks, scorePct, report };
})();
