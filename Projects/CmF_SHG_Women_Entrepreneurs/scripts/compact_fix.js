// =========================================================================
// OmmNoMi: Ultra-Compact Fix (Under 25 lines, Zero Truncation Risk)
// =========================================================================
(function() {
    var store = window.appStore;
    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var sSchemas = h.AppData.DataSchemas;
    var sIdx = sSchemas.findIndex(function(s) { return s && s.Name.indexOf('Survey_Schema') >= 0; });
    var cIdx = sSchemas.findIndex(function(s) { return s && s.Name.indexOf('Survey_Tables') >= 0; });
    var ttIdx = sSchemas[cIdx].Attributes.findIndex(function(a) { return a.Name === 'Table_Type'; });
    var r1Idx = sSchemas[sIdx].Attributes.findIndex(function(a) { return a.Name === 'Related Survey_Tables'; });
    var r2Idx = sSchemas[sIdx].Attributes.findIndex(function(a) { return a.Name === 'Related_Q6_Labor'; });

    var dict = {};
    var q6Title = '="Q6. Involvement of family members and hired help in business operations"';
    if (r1Idx >= 0) dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + r1Idx + "].DisplayName"] = q6Title;
    if (r2Idx >= 0) dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + r2Idx + "].DisplayName"] = q6Title;

    var aux = JSON.stringify({ EnumValues: ["Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory"], BaseType: "Text", EnumInputMode: "Auto" });
    dict["AppData.DataSchemas[" + cIdx + "].Attributes[" + ttIdx + "].Type"] = "Enum";
    dict["AppData.DataSchemas[" + cIdx + "].Attributes[" + ttIdx + "].InitialValue"] = '="Q6_Labor"';
    dict["AppData.DataSchemas[" + cIdx + "].Attributes[" + ttIdx + "].DisplayName"] = '="Section / Question Type"';
    dict["AppData.DataSchemas[" + cIdx + "].Attributes[" + ttIdx + "].TypeAuxData"] = aux;

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("[OK] Saved to Redux! Now click blue SAVE button in AppSheet, then CANCEL current form in emulator to see it refreshed.");
})();
