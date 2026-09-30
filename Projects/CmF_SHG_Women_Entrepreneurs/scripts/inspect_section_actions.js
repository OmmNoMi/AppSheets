(function inspectButtons() {
  try {
    var store = window.appStore;
    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var actions = h.AppData?.DataActions || [];
    var secActions = actions.filter(function(a) {
      return (a.Name || '').indexOf('Section') >= 0 || (a.DisplayName || '').indexOf('Section') >= 0;
    });
    console.log("=== Matching Section Actions (" + secActions.length + ") ===");
    secActions.forEach(function(a) {
      console.log("Name:", a.Name, "| ActionType:", a.ActionType, "| Icon:", a.Icon, "| Target:", a.ActionDefinition?.ViewName);
    });
    if (secActions.length > 0) {
      console.log("Sample full action JSON:", JSON.stringify(secActions[0], null, 2));
    }
  } catch(e) { console.error(e); }
})();
