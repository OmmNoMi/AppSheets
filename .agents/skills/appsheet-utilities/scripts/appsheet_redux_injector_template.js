/**
 * OmmNoMi AppSheet Modern Editor — Reusable Redux Batch Column Injector Template
 * 
 * Purpose:
 * Batch updates column configurations (DisplayName, AppFormula, InitialValue, Description, etc.)
 * directly in AppSheet's Redux store without touching the DOM, virtual scroller, or opening modals.
 * 
 * Usage:
 * 1. Open Chrome DevTools Console (F12) while on the AppSheet column editor.
 * 2. Configure TARGET_TABLE, TARGET_PROP, and MAPPING below.
 * 3. Paste and run this script in the Console.
 * 4. Click the blue 'SAVE' button in the top-right of AppSheet.
 * 5. Run the cleanup block at the end.
 */

(function runOmmNoMiReduxBatchInjector() {
    // ==========================================
    // 1. USER CONFIGURATION
    // ==========================================
    const TARGET_TABLE = "Survey";       // Target Table Name (e.g. "Survey", "Order_Details")
    const TARGET_PROP = "DisplayName";   // "DisplayName" | "AppFormula" | "InitialValue" | "Description"
    
    // Mapping of ColumnName -> Value / Formula
    // Example: { "District": "LOOKUP(\"Q_A_01_00\", \"AppVariables\", \"ID\", \"Label\")" }
    const MAPPING = {
        /* [ColumnName]: [ValueOrFormula] */
    };

    // ==========================================
    // 2. AUTOMATIC REDUX STORE DISCOVERY
    // ==========================================
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
        console.error("❌ Redux store not found! Ensure AppSheet editor is loaded.");
        return;
    }

    // ==========================================
    // 3. SCHEMA & ATTRIBUTE RESOLUTION
    // ==========================================
    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate;
    const schemas = historyItem?.AppData?.DataSchemas || state.appTemplate?.current?.AppData?.DataSchemas;

    if (!schemas || !schemas.length) {
        console.error("❌ DataSchemas not found in Redux state!");
        return;
    }

    // Locate Target Schema dynamically by TableName or Schema Name
    let schemaIdx = schemas.findIndex(s => s && (s.TableName === TARGET_TABLE || s.Name === TARGET_TABLE + "_Schema"));
    if (schemaIdx === -1) {
        // Fallback: search if any column in mapping exists in schema attributes
        const sampleCol = Object.keys(MAPPING)[0];
        schemaIdx = schemas.findIndex(s => s?.Attributes?.some(a => a.Name === sampleCol));
    }

    if (schemaIdx === -1 || !schemas[schemaIdx]) {
        console.error(`❌ Table schema for '${TARGET_TABLE}' not found! Available schemas:`, schemas.map(s => s.TableName || s.Name));
        return;
    }

    const attrs = schemas[schemaIdx].Attributes;
    console.log(`✅ Located '${TARGET_TABLE}' Schema at DataSchemas[${schemaIdx}] with ${attrs.length} attributes.`);

    // ==========================================
    // 4. BATCH DICTIONARY CONSTRUCTION
    // ==========================================
    const nameValueDict = {};
    let matchedCount = 0;

    attrs.forEach((attr, idx) => {
        const colName = attr.Name;
        if (colName && MAPPING[colName]) {
            const val = MAPPING[colName];
            const key = `AppData.DataSchemas[${schemaIdx}].Attributes[${idx}].${TARGET_PROP}`;
            nameValueDict[key] = val;
            matchedCount++;
        }
    });

    if (matchedCount === 0) {
        console.warn("⚠️ No matching columns found between MAPPING and Schema Attributes!");
        return;
    }

    console.log(`🚀 Prepared ${matchedCount} column updates. Dispatching to Redux...`);
    const sampleKey = Object.keys(nameValueDict)[0];
    console.log("Sample injection:", sampleKey, "=>", nameValueDict[sampleKey]);

    // ==========================================
    // 5. ATOMIC REDUX DISPATCH
    // ==========================================
    store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
    });

    // Trigger emulator recalculation & Activate cloud SAVE button
    try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch (e) {}

    store.dispatch({
        type: 'SHOW_SAVE_BUTTON',
        value: true
    });

    console.log(`🎉 SUCCESS! Updated ${matchedCount} columns in Redux state!`);
    console.log("👉 Click the blue 'SAVE' button in the top-right corner of AppSheet to persist to the cloud.");

    // Cleanup hook reference
    setTimeout(() => {
        delete window.appStore;
        console.log("🔒 Cleaned up temporary window.appStore reference.");
    }, 5000);
})();
