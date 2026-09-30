// =========================================================================
// OmmNoMi: Diagnose Why Related_Q6_Labor & Auto-Fill Failed
// Size: Under 50 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function diagnoseAutofillAndDisplay() {
    try {
        var store = window.appStore;
        if (!store) {
            var candidates = [document.querySelector('#root'), document.querySelector('.ExpressionControl'), document.querySelector('[role="grid"]'), document.body];
            for (var i = 0; i < candidates.length; i++) {
                var el = candidates[i];
                if (!el) continue;
                var fKey = Object.keys(el).find(function(k) { return k.indexOf('reactFiber') >= 0 || k.indexOf('reactInternalInstance') >= 0; });
                var f = el[fKey];
                while (f) {
                    if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
                    if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) { store = f.stateNode.store; window.appStore = store; break; }
                    f = f.return;
                }
                if (store) break;
            }
        }
        if (!store) { console.error("[ERROR] Redux store not found."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
        var s = schemas.find(function(x) { return x && (x.Name === 'Survey_Schema' || x.Name === 'Survey'); });
        var c = schemas.find(function(x) { return x && (x.Name === 'Survey_Tables_Schema' || x.Name === 'Survey_Tables'); });

        console.log("=== 1. VCs in Survey Table ===");
        var vcs = s ? s.Attributes.filter(function(a) { return a.Name.indexOf('Related') >= 0; }) : [];
        vcs.forEach(function(v) {
            console.log("VC Name:", v.Name, "| DisplayName:", v.DisplayName, "| Formula:", v.AppFormula, "| RefTable:", v.ReferencedTableName);
        });

        console.log("=== 2. Survey_Form_SecC ColumnOrder ===");
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        var secC = controls.find(function(ctl) { return ctl && ctl.Name === 'Survey_Form_SecC'; });
        var curSet = secC && typeof secC.Settings === 'string' ? JSON.parse(secC.Settings) : (secC && secC.Settings) || {};
        var list = (curSet && curSet.ColumnOrder) || (secC && secC.ViewDefinition && secC.ViewDefinition.ColumnOrder) || [];
        var relCols = list.filter(function(x) { return x.indexOf('Related') >= 0; });
        console.log("Related columns present in SecC Form ColumnOrder:", relCols);

        console.log("=== 3. Table_Type in Survey_Tables ===");
        var tt = c ? c.Attributes.find(function(a) { return a.Name === 'Table_Type'; }) : null;
        if (tt) {
            console.log("Table_Type InitialValue:", tt.InitialValue, "| DisplayName:", tt.DisplayName, "| Show_If:", tt.Show_If);
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
