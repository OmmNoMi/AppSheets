// =========================================================================
// OmmNoMi: Deep Diagnostic Inspector for Subtable & Display Name
// Pure ASCII, Validated with node -c
// =========================================================================
(function deepDiagnoseSubtables() {
    try {
        console.clear();
        console.log("=================================================");
        console.log("[OmmNoMi DEEP DIAGNOSTIC] Inspecting AppSheet Live State");
        console.log("=================================================");

        var store = window.appStore;
        if (!store) {
            var c = [document.querySelector('#root'), document.querySelector('.ExpressionControl'), document.body];
            for (var i = 0; i < c.length; i++) {
                var el = c[i]; if (!el) continue;
                var k = Object.keys(el).find(function(x) { return x.indexOf('reactFiber') >= 0 || x.indexOf('reactInternalInstance') >= 0; });
                var f = el[k];
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

        // --- 1. DOM INSPECTION (Find the text in emulator DOM/iframe) ---
        console.log("\n--- 1. DOM INSPECTION ---");
        var docs = [document];
        var iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(ifr) {
            try { if (ifr.contentDocument) docs.push(ifr.contentDocument); } catch(e) {}
        });

        var foundText = false;
        docs.forEach(function(d, dIdx) {
            var walker = d.createTreeWalker(d.body || d.documentElement, NodeFilter.SHOW_TEXT, null, false);
            var node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue && node.nodeValue.indexOf("Survey_Tables entries") >= 0) {
                    foundText = true;
                    var p = node.parentElement;
                    console.log("FOUND IN DOC #" + dIdx + ":", node.nodeValue);
                    console.log("Parent Tag:", p.tagName, "Class:", p.className);
                    // Search upwards for data attributes
                    var cur = p;
                    var trail = [];
                    for (var step = 0; step < 6 && cur; step++) {
                        var attrs = {};
                        for (var a = 0; a < cur.attributes.length; a++) {
                            var at = cur.attributes[a];
                            if (at.name.indexOf('data-') === 0 || at.name === 'class' || at.name === 'name' || at.name === 'id') {
                                attrs[at.name] = at.value;
                            }
                        }
                        trail.push({ tag: cur.tagName, attrs: attrs });
                        cur = cur.parentElement;
                    }
                    console.log("Parent Hierarchy:", trail);
                }
            }
        });
        if (!foundText) console.log("Text 'Survey_Tables entries' not found in DOM text nodes (might be canvas or shadow DOM).");

        // --- 2. VIRTUAL COLUMNS IN SURVEY ---
        console.log("\n--- 2. VIRTUAL COLUMNS IN SURVEY ---");
        if (s && s.Attributes) {
            s.Attributes.forEach(function(a, idx) {
                if (a.Name.indexOf('Related') >= 0 || a.Name.indexOf('Survey_Tables') >= 0) {
                    console.log("[" + idx + "] Name:", a.Name, "| Type:", a.Type, "| DisplayName:", a.DisplayName, "| Formula:", a.AppFormula, "| IsPartOf:", a.IsPartOf, "| Show_If:", a.Show_If);
                }
            });
        }

        // --- 3. FORM CONTROLS IN PRESENTATION ---
        console.log("\n--- 3. FORM CONTROLS IN PRESENTATION ---");
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];
        controls.forEach(function(ctl, idx) {
            if (ctl && (ctl.Name === 'Survey_Form_SecC' || ctl.Name === 'Survey_Form' || ctl.Name === 'Survey_Tables_Inline' || ctl.Name === 'Survey_Tables_Form')) {
                var curSet = typeof ctl.Settings === 'string' ? JSON.parse(ctl.Settings) : (ctl.Settings || {});
                var colList = (curSet && curSet.ColumnOrder) || (ctl.ViewDefinition && ctl.ViewDefinition.ColumnOrder) || ctl.ColumnOrder || [];
                var rels = colList.filter(function(x) { return x.indexOf('Related') >= 0 || x.indexOf('Survey_Tables') >= 0; });
                console.log("Control [" + idx + "] Name:", ctl.Name, "| Action:", ctl.Action, "| Table:", ctl.TableOrFolderName, "| DisplayName:", ctl.DisplayName);
                console.log("   Related cols in ColumnOrder:", rels);
                // Also check position around LocationConvenienceOther
                var lcIdx = colList.indexOf('LocationConvenienceOther');
                if (lcIdx >= 0) {
                    console.log("   Cols around LocationConvenienceOther:", colList.slice(Math.max(0, lcIdx - 1), lcIdx + 4));
                }
            }
        });

        // --- 4. TABLE_TYPE IN SURVEY_TABLES ---
        console.log("\n--- 4. TABLE_TYPE IN SURVEY_TABLES ---");
        if (c && c.Attributes) {
            var tt = c.Attributes.find(function(a) { return a.Name === 'Table_Type'; });
            if (tt) {
                console.log("Table_Type:", {
                    Type: tt.Type,
                    InitialValue: tt.InitialValue,
                    EnumValues: tt.EnumValues,
                    DisplayName: tt.DisplayName,
                    Valid_If: tt.Valid_If,
                    Show_If: tt.Show_If,
                    Editable_If: tt.Editable_If,
                    TypeAuxData: tt.TypeAuxData
                });
            } else {
                console.log("Table_Type NOT FOUND in Survey_Tables attributes!");
            }
        }

        // --- 5. SLICES CHECK ---
        console.log("\n--- 5. SLICES CHECK ---");
        var slices = (h && h.AppData && h.AppData.TableSlices) || [];
        slices.forEach(function(sl) {
            if (sl && sl.Name.indexOf('Q6') >= 0) {
                console.log("Slice:", sl.Name, "| Table:", sl.TableName || sl.SourceTable, "| Columns count:", sl.Columns ? sl.Columns.length : "all", "| Filter:", sl.FilterCondition);
            }
        });

        console.log("\n=================================================");
        console.log("[DONE] Please copy-paste the output above back to chat!");
        console.log("=================================================");
    } catch(e) { console.error("[ERROR]", e.message, e.stack); }
})();
