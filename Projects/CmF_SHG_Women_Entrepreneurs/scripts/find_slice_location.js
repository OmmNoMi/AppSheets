// =========================================================================
// OmmNoMi: Locate Slice Store in Redux
// Size: Under 25 lines, SOP-A5 Pure ASCII
// =========================================================================
(function findSliceLocation() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        console.log("h keys:", Object.keys(h));
        var sliceKeysInH = Object.keys(h).filter(function(k) { return k.toLowerCase().indexOf('slice') >= 0; });
        console.log("h slice keys:", sliceKeysInH);
        var sliceKeysInAppData = h.AppData ? Object.keys(h.AppData).filter(function(k) { return k.toLowerCase().indexOf('slice') >= 0; }) : [];
        console.log("AppData slice keys:", sliceKeysInAppData);
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
