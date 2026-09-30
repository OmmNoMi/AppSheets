// ==============================================================================
// OmmNoMi: Inspect Section E Column Types & Show_If in Survey (< 35 lines)
// ==============================================================================
(function inspectSectionE() {
  try {
    var store = window.appStore;
    var state = store ? store.getState() : {};
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
    var survey = schemas.find(function(s) { return s.Name === 'Survey'; });

    if (!survey) return console.error("[FAIL] Survey table not found.");

    var cols = ['ExpectationsFromScheme', 'AttendedTraining', 'TrainingDetails', 'UsedTrainingComponent', 'UsedTrainingDetails'];
    console.log("=== SECTION E COLUMNS CURRENT CONFIGURATION ===");
    cols.forEach(function(cName) {
      var attr = (survey.Attributes || []).find(function(a) { return a.Name === cName; });
      if (attr) {
        var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
        console.log("Column: " + cName + " | Type: " + attr.Type + " | Show_If: " + (aux.Show_If || attr.Show_If || "NONE"));
      } else {
        console.log("Column: " + cName + " NOT FOUND in Survey!");
      }
    });
  } catch(e) { console.error(e); }
})();
