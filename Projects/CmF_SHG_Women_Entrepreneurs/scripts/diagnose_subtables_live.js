// =========================================================================
// OmmNoMi: Live Diagnostic Inspector for Subtables and Form View
// Rule SOP-A5: Pure ASCII, No Unicode
// =========================================================================
(function diagnoseSubtablesLive() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] LIVE DIAGNOSTIC FOR SUBTABLES & FORM VIEW ===");

        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var f = root[Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; })];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; break; }
                if (f.stateNode && f.stateNode.store) { store = f.stateNode.store; break; }
                f = f.return;
            }
        }
        if (!store) { console.error("[ERROR] Redux store not found"); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);

        // 1. TableSlices Check
        console.log("--- 1. AppData.TableSlices Check ---");
        var slices = h.AppData.TableSlices || [];
        console.log("Total Slices count:", slices.length);
        slices.forEach(function(s, idx) {
            console.log(" Slice [" + idx + "]:", s.Name, "| Source:", s.SourceTable, "| Filter:", s.FilterCondition, "| Updates:", s.UpdateMode);
        });

        // 2. Survey Virtual Columns Check
        console.log("--- 2. Survey Virtual Columns Check ---");
        var schemas = (h.AppData && h.AppData.DataSchemas) || [];
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var sAttrs = (sIdx >= 0) ? schemas[sIdx].Attributes : [];
        var targetVCs = ["Related_Q6_Labor", "Related_Q15_Turnover", "Related_Q19_Capital", "Related_Q20_Loan_Usage", "Related_Q22_Trajectory", "Related Survey_Tables"];
        targetVCs.forEach(function(vcName) {
            var attr = sAttrs.find(function(a) { return a.Name === vcName; });
            if (attr) {
                console.log(" VC:", attr.Name, "| Type:", attr.Type, "| Formula:", attr.AppFormula, "| RefTable:", attr.ReferencedTableName, "| Show_If:", attr.Show_If);
            } else {
                console.log(" VC [MISSING]:", vcName);
            }
        });

        // 3. Child Table Survey_ID Check
        console.log("--- 3. Survey_Tables Survey_ID Check ---");
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });
        var cAttrs = (cIdx >= 0) ? schemas[cIdx].Attributes : [];
        var sid = cAttrs.find(function(a) { return a.Name === 'Survey_ID'; });
        if (sid) {
            console.log(" Survey_ID Type:", sid.Type, "| RefTable:", sid.ReferencedTableName, "| IsPartOf:", sid.IsPartOf, "| IsAPartOf:", sid.IsAPartOf);
        } else {
            console.log(" Survey_ID column missing!");
        }

        // 4. Survey_Form_SecC View Check
        console.log("--- 4. Survey_Form_SecC View Check ---");
        var controls = (h.Presentation && h.Presentation.Controls) || [];
        var secC = controls.find(function(c) { return c && c.Name === 'Survey_Form_SecC'; });
        if (secC) {
            console.log(" Control Name:", secC.Name, "| Action:", secC.Action, "| Source:", secC.TableOrFolderName);
            var colOrder = (secC.ViewDefinition && secC.ViewDefinition.ColumnOrder) || [];
            console.log(" ViewDefinition.ColumnOrder count:", colOrder.length);
            console.log(" ColumnOrder columns:", JSON.stringify(colOrder));
            
            var settingsColOrder = [];
            if (typeof secC.Settings === 'string') {
                try { settingsColOrder = JSON.parse(secC.Settings).ColumnOrder || []; } catch(e) {}
            }
            console.log(" Settings.ColumnOrder count:", settingsColOrder.length);
            console.log(" Are ViewDef and Settings in sync?", JSON.stringify(colOrder) === JSON.stringify(settingsColOrder));
        } else {
            console.log(" Survey_Form_SecC not found in Presentation.Controls!");
        }

    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
