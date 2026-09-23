// =========================================================================
// OmmNoMi: Quick Fix for Turnover_*_Months Invalid Initial Value ('NOW()')
// =========================================================================
(function fixTurnoverInitialValues() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Fixing Invalid Initial Values in Survey Schema...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // 1. Locate Redux Store
    let store = window.appStore;
    if (!store) {
        const candidates = Array.from(document.querySelectorAll('*')).filter(el => {
            const keys = Object.keys(el);
            return keys.some(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
        });
        for (const el of candidates) {
            const key = Object.keys(el).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
            let fiber = el[key];
            let depth = 0;
            while (fiber && depth < 100) {
                if (fiber.memoizedProps?.store?.dispatch) {
                    store = fiber.memoizedProps.store;
                    break;
                }
                if (fiber.stateNode?.store?.dispatch) {
                    store = fiber.stateNode.store;
                    break;
                }
                fiber = fiber.return;
                depth++;
            }
            if (store) break;
        }
    }

    if (!store) {
        console.error("❌ Redux Store nahi mila! Page ko refresh mat karna.");
        return;
    }

    const state = store.getState();
    const appData = state.appTemplate?.history?.[0]?.appTemplate?.AppData;
    if (!appData || !appData.DataSchemas) {
        console.error("❌ AppData ya DataSchemas nahi mila!");
        return;
    }

    const schemas = appData.DataSchemas;
    const surveyIdx = schemas.findIndex(s => s.Name === 'Survey_Schema' || s.Name === 'Survey');
    if (surveyIdx === -1) {
        console.error("❌ Survey_Schema nahi mila!");
        return;
    }

    const attrs = schemas[surveyIdx].Attributes;
    const nameValueDict = {};
    let fixedCount = 0;

    const specificColumns = ['Turnover_Peak_Months', 'Turnover_Avg_Months', 'Turnover_Lean_Months'];

    attrs.forEach((attr, idx) => {
        const colName = attr.Name;
        const prefix = `AppData.DataSchemas[${surveyIdx}].Attributes[${idx}].`;

        // Check if it is one of the 3 turnover columns
        if (specificColumns.includes(colName)) {
            console.log(`🔧 Clearing InitialValue for ${colName} (was: ${attr.InitialValue})`);
            nameValueDict[prefix + 'InitialValue'] = null;
            fixedCount++;
        } 
        // Also check any other non-date column with NOW() or TODAY()
        else if (attr.Type !== 'DateTime' && attr.Type !== 'Date' && attr.Type !== 'Time' && attr.Type !== 'ChangeTimestamp') {
            if (attr.InitialValue && (attr.InitialValue.includes('NOW()') || attr.InitialValue.includes('TODAY()'))) {
                console.log(`🔧 Clearing invalid InitialValue for ${colName} (Type: ${attr.Type}, was: ${attr.InitialValue})`);
                nameValueDict[prefix + 'InitialValue'] = null;
                fixedCount++;
            }
        }
    });

    if (Object.keys(nameValueDict).length === 0) {
        console.log("ℹ️ Koi invalid InitialValue nahi mili, sab already clean hai!");
    } else {
        store.dispatch({
            type: 'SET_EDITOR_OPTIONS',
            nameValueDict: nameValueDict,
            recordHistory: true,
            ignoreConstraints: false,
            skipNavigation: false
        });
        console.log(`✅ ${fixedCount} columns ka InitialValue successfully null kar diya!`);
    }

    // Refresh Save button
    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log("%c🎉 [OmmNoMi] 100% FIXED! Ab top right corner mein 'SAVE' button dabao, error gayab ho chuka hoga aur save ho jayega!", "color:#34a853;font-size:16px;font-weight:bold;");
})();
