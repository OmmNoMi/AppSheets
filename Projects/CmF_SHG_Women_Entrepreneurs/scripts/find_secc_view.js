// =========================================================================
// OmmNoMi: Locate "Survey Form SecC" View in Redux
// Size: Under 30 lines, SOP-A5 Pure ASCII
// =========================================================================
(function findSecCView() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var viewsList = (h.Presentation && h.Presentation.Views) || (h.AppData && h.AppData.Views) || [];
        console.log("Total Views found:", viewsList.length);
        var secC = viewsList.find(function(v) { return v && v.Name && v.Name.indexOf('SecC') >= 0; });
        if (secC) {
            console.log("Found SecC View:", secC.Name, "Type:", secC.ViewType);
            console.log("ColumnOrder:", JSON.stringify(secC.ColumnOrder));
        } else {
            console.log("Views matching 'Sec':", viewsList.filter(function(v) { return v && v.Name && v.Name.indexOf('Sec') >= 0; }).map(function(v) { return v.Name; }));
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
