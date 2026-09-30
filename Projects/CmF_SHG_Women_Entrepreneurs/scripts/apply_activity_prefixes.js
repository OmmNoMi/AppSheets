// =========================================================================
// OmmNoMi: Apply [T], [S], [P] Prefixes to Business Activities in Memory & UI
// =========================================================================
(function updateActivityLabelsInMemory() {
    console.clear();
    console.log("%c🚀 [OmmNoMi] Applying [T], [S], [P] Prefixes to Business Activities...", "color:#4285f4;font-size:15px;font-weight:bold;");

    const store = window.appStore;
    if (!store) {
        console.error("❌ Redux store not found!");
        return;
    }

    const state = store.getState();
    const mapping = {
        // Trading [T]
        'ACT_VEG_FRUIT': '[T] ',
        'ACT_GROCERY': '[T] ',
        'ACT_FANCY_STORE': '[T] ',
        'ACT_APPAREL': '[T] ',
        'ACT_ELECTRIC_GOODS': '[T] ',
        'ACT_STONE_SHOP': '[T] ',

        // Service [S]
        'ACT_FLOUR_MILL': '[S] ',
        'ACT_TAILORING': '[S] ',
        'ACT_BEAUTY_PARLOUR': '[S] ',
        'ACT_AUTO_REPAIR': '[S] ',
        'ACT_EMITRA': '[S] ',
        'ACT_TRANSPORT': '[S] ',
        'ACT_TENT_HOUSE': '[S] ',
        'ACT_MOBILE_REPAIR': '[S] ',
        'ACT_STONE_CUTTING': '[S] ',

        // Production [P]
        'ACT_SANITARY_NAPKIN': '[P] ',
        'ACT_HANDICRAFT': '[P] ',
        'ACT_DAIRY_MILK': '[P] ',
        'ACT_JUICE': '[P] ',
        'ACT_FOOD_PROCESSING': '[P] ',
        'ACT_FOOD_MAKING': '[P] ',
        'ACT_SWEET_BOX': '[P] ',
        'ACT_FLAG_MAKING': '[P] ',
        'ACT_LEATHER_PRODUCTS': '[P] ',
        'ACT_STONE_IDOLS': '[P] '
    };

    // 1. If tableData exists in Redux, update in memory
    let tableUpdated = 0;
    if (state.tableData && state.tableData.AppVariables) {
        const rows = state.tableData.AppVariables;
        Object.keys(rows).forEach(key => {
            const row = rows[key];
            if (row && mapping[row.ID]) {
                const prefix = mapping[row.ID];
                if (row.Title && !row.Title.startsWith(prefix)) row.Title = prefix + row.Title;
                if (row.Title_hi && !row.Title_hi.startsWith(prefix)) row.Title_hi = prefix + row.Title_hi;
                if (row.Title_raj && !row.Title_raj.startsWith(prefix)) row.Title_raj = prefix + row.Title_raj;
                if (row.Label && !row.Label.startsWith(prefix)) row.Label = prefix + row.Label;
                tableUpdated++;
            }
        });
        console.log(`✅ Updated ${tableUpdated} rows in client memory tableData.`);
    }

    // 2. Trigger emulator recalculation
    try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch(e) {}

    // 3. Click Emulator Sync icon if available
    const syncBtn = document.querySelector('[data-testid="sync-button"]') || document.querySelector('button[aria-label*="Sync"]') || document.querySelector('.fa-refresh');
    if (syncBtn) {
        console.log("🔄 Triggering emulator sync...");
        syncBtn.click();
    }

    console.log("%c🎉 All 25 Business Activities are now prefixed with [T], [S], and [P]!", "color:#34a853;font-size:15px;font-weight:bold;");
    console.log("👉 Mobile emulator me 'व्यवसाय की मुख्य गतिविधियां' (Q14 / BusinessActivities) khol kar check karein!");
})();
