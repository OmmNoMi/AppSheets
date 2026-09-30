(function inspectSurveyDetail() {
  try {
    var store = window.appStore;
    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var controls = h.Presentation?.Controls || [];
    var detail = controls.find(function(c) {
      return (c.Name || '').toLowerCase().indexOf('detail') >= 0 && (c.TableOrFolderName === 'Survey' || c.ViewDefinition?.TableOrFolderName === 'Survey');
    }) || controls[0];

    console.log("=== Survey Detail View Inspection ===");
    console.log("View Name:", detail?.Name);
    console.log("View Actions:", detail?.ViewDefinition?.Actions || detail?.Actions);
    console.log("QuickEdit Columns:", detail?.ViewDefinition?.QuickEditColumns || detail?.QuickEditColumns);
    console.log("ColumnOrder:", (detail?.ViewDefinition?.ColumnOrder || detail?.ColumnOrder || []).slice(0, 10));
  } catch(e) { console.error(e); }
})();
