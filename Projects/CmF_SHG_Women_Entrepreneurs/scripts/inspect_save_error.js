// =========================================================================
// OmmNoMi: Inspect Last Save Error Details
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectSaveError() {
    try {
        var store = window.appStore;
        if (!store) { console.error("[ERROR] Store not found"); return; }
        var state = store.getState();
        console.log("=== SAVE ERROR DIAGNOSIS ===");
        console.log("bannerAlert:", JSON.stringify(state.bannerAlert));
        console.log("notifications:", JSON.stringify(state.notifications));
        console.log("editorSettings errors:", state.editorSettings && state.editorSettings.errors);
        
        // Check active error elements in DOM
        var errs = Array.from(document.querySelectorAll('.error-summary, .banner-error, [role="alert"], .alert-danger, .modal-body, .toast-message'))
            .filter(function(el) { return el.offsetParent !== null && el.textContent.trim().length > 0; })
            .map(function(el) { return el.textContent.trim(); });
        console.log("DOM Error texts:", errs);
    } catch(e) { console.error("[ERROR]", e.message); }
})();
