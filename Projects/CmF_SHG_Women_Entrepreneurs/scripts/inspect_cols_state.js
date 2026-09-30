// ==============================================================================
// OmmNoMi: Inspect Columns in Survey Schema (< 25 lines)
// ==============================================================================
(function inspectCols() {
  try {
    var store = window.appStore;
    var state = store.getState();
    var h = (state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || state.appTemplate.current;
    var schemas = h.AppData.DataSchemas || [];
    var survey = schemas.find(function(s) {
      return (s.Attributes || []).some(function(a) { return a.Name === 'UseQRUPI'; });
    });
    console.log("Found Survey schema:", survey.Name);
    var targetCols = ['UseQRUPI', 'QRDailyTransactions', 'QRNonUseReason', 'AttendedTraining', 'TrainingDetails'];
    targetCols.forEach(function(c) {
      var attr = survey.Attributes.find(function(a) { return a.Name === c; });
      console.log(c, "Type:", attr && attr.Type, "TypeAuxData:", attr && attr.TypeAuxData, "TypeAux:", attr && attr.TypeAux);
    });
  } catch(e) { console.error(e); }
})();
