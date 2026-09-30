// =========================================================================
// OmmNoMi: Reverse-Engineer Native AppSheet IsPartOf & Related VC Structure
// Size: Under 45 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectNativeIsPartOfStructure() {
    try {
        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var fKey = Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; });
            var f = root[fKey];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; break; }
                f = f.return;
            }
        }
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];

        var survey = schemas.find(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var child = schemas.find(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });

        console.log("=== 1. CHILD Survey_ID DEFINITION ===");
        var sId = child ? child.Attributes.find(function(a) { return a.Name === 'Survey_ID'; }) : null;
        if (sId) {
            console.log("Type:", sId.Type);
            console.log("ReferencedTableName:", sId.ReferencedTableName);
            console.log("IsAPartOf:", sId.IsAPartOf, "IsPartOf:", sId.IsPartOf);
            console.log("TypeAuxData:", sId.TypeAuxData);
            console.log("TypeQualifier:", sId.TypeQualifier);
        }

        console.log("=== 2. PARENT AUTO-GENERATED Related VC DEFINITION ===");
        var relCol = survey ? survey.Attributes.find(function(a) { return a.Name === 'Related Survey_Tables' || a.Name === 'Related Survey_Tabless'; }) : null;
        if (relCol) {
            console.log("Name:", relCol.Name);
            console.log("Type:", relCol.Type);
            console.log("EnumListElementTypeName:", relCol.EnumListElementTypeName);
            console.log("AppFormula:", relCol.AppFormula);
            console.log("ReferencedTableName:", relCol.ReferencedTableName);
            console.log("TypeAuxData:", relCol.TypeAuxData);
        } else {
            console.log("No native 'Related Survey_Tables' found in Survey.");
        }

        console.log("=== 3. DATA SLICES ===");
        var slices = (h && h.AppData && h.AppData.DataSlices) || h.DataSlices || [];
        console.log("Existing Slices count:", Array.isArray(slices) ? slices.length : Object.keys(slices).length);
        if (Array.isArray(slices)) {
            slices.forEach(function(sl) { console.log(" - Slice:", sl.Name, "Table:", sl.TableName, "Filter:", sl.FilterCondition); });
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
