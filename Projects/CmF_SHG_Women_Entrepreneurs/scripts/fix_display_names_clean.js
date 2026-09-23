// =========================================================================
// OmmNoMi: Step 1 - Fix Display Names Cleanly (Plain Text & Description)
// Pure ASCII, <25 lines, Validated with node -c
// =========================================================================
(function fixDisplayNamesNow() {
    var store = window.appStore;
    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var schemas = h.AppData.DataSchemas;
    var sIdx = schemas.findIndex(function(s) { return s && s.Name.indexOf('Survey_Schema') >= 0; });
    var sAttrs = schemas[sIdx].Attributes;

    var dict = {};
    var q6Text = "Q6. Involvement of family members and hired help in business operations";

    sAttrs.forEach(function(a, idx) {
        if (a.Name === 'Related Survey_Tables' || a.Name === 'Related_Q6_Labor') {
            a.DisplayName = q6Text;
            a.Description = q6Text;
            dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].DisplayName"] = q6Text;
            dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].Description"] = q6Text;
        }
    });

    var controls = h.Presentation.Controls || [];
    controls.forEach(function(c, idx) {
        if (c && (c.Name === 'Survey_Tables_Inline' || c.Name === 'Survey_Tables_Form')) {
            c.DisplayName = q6Text;
            dict["Presentation.Controls[" + idx + "].DisplayName"] = q6Text;
        }
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    // Reload emulator iframe
    var ifr = document.querySelector('iframe');
    if (ifr) try { ifr.src = ifr.src; } catch(e) {}

    console.log("[OmmNoMi OK] Display Names set to plain text! Click blue SAVE button, then click CANCEL on the form in emulator to refresh.");
})();
