// =========================================================================
// OmmNoMi: Transform Survey_Tables Inline View from Table to Deck (Card)
// Size: Under 45 lines, Pure ASCII, Validated with node -c
// =========================================================================
(function transformInlineToDeck() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        var dict = {};

        controls.forEach(function(ctl, idx) {
            if (ctl && (ctl.Name === 'Survey_Tables_Inline' || (ctl.TableOrFolderName === 'Survey_Tables' && ctl.Action === 'table'))) {
                var p = "Presentation.Controls[" + idx + "]";
                dict[p + ".Action"] = "deck";

                var curSet = {};
                try {
                    curSet = typeof ctl.Settings === 'string' ? JSON.parse(ctl.Settings) : (ctl.Settings || {});
                } catch(e) {}

                curSet.PrimaryHeader = "Row_Item";
                curSet.SecondaryHeader = "Turnover_Monthly_Sales";
                curSet.SummaryColumn = "Turnover_Monthly_Profit";
                curSet.RowSelectedAction = "Edit";
                curSet.DeckSize = "Normal";

                dict[p + ".Settings"] = JSON.stringify(curSet);
            }
        });

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OmmNoMi OK] Survey_Tables_Inline switched from Table to Deck (Card) View!");
        console.log("[ACTION] Click the blue SAVE button in AppSheet top-right!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
