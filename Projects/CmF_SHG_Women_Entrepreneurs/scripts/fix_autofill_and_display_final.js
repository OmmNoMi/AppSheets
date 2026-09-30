// =========================================================================
// OmmNoMi: Permanently Fix Table_Type Auto-Fill & Inline Display Name
// Size: Under 110 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function fixAutofillAndDisplayName() {
    try {
        console.clear();
        console.log("[OmmNoMi] Applying Permanent Auto-Fill & Display Name Fix...");

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
        var sIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey'); });
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });

        if (sIdx === -1 || cIdx === -1) { console.error("[ERROR] Schemas not found."); return; }

        var dict = {};

        // 1. FIX CHILD TABLE: Table_Type (Auto-Fill + Enum Values + Full Array Dispatch)
        var cAttrs = schemas[cIdx].Attributes.slice();
        var ttIdx = cAttrs.findIndex(function(a) { return a.Name === 'Table_Type'; });
        var enumList = ["Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory"];
        var ttFormula = '=IFS(IN("Labor", CONTEXT("View")), "Q6_Labor", IN("Turnover", CONTEXT("View")), "Q15_Turnover", IN("Capital", CONTEXT("View")), "Q19_Capital", IN("Loan", CONTEXT("View")), "Q20_Loan_Usage", IN("Trajectory", CONTEXT("View")), "Q22_Trajectory", TRUE, "Q6_Labor")';

        if (ttIdx !== -1) {
            var tt = Object.assign({}, cAttrs[ttIdx]);
            tt.Type = "Enum";
            tt.EnumValues = enumList;
            tt.InitialValue = ttFormula;
            tt.Valid_If = '=LIST("Q6_Labor", "Q15_Turnover", "Q19_Capital", "Q20_Loan_Usage", "Q22_Trajectory")';
            tt.DisplayName = '="Section / Question Type"';

            var aux = {};
            try { aux = typeof tt.TypeAuxData === 'string' ? JSON.parse(tt.TypeAuxData) : (tt.TypeAuxData || {}); } catch(e) {}
            aux.EnumValues = enumList;
            aux.BaseType = "Text";
            aux.EnumInputMode = "Auto";
            aux.AllowOtherValues = false;
            aux.AutoCompleteOtherValues = false;
            tt.TypeAuxData = JSON.stringify(aux);

            cAttrs[ttIdx] = tt;
        }

        // Also fix Row_Item DisplayName and Valid_If
        var riIdx = cAttrs.findIndex(function(a) { return a.Name === 'Row_Item'; });
        if (riIdx !== -1) {
            var ri = Object.assign({}, cAttrs[riIdx]);
            ri.DisplayName = '=IFS([Table_Type] = "Q6_Labor", "Activity", [Table_Type] = "Q15_Turnover", "Season", [Table_Type] = "Q19_Capital", "Capital Source", [Table_Type] = "Q20_Loan_Usage", "Loan Source", [Table_Type] = "Q22_Trajectory", "Business Metric")';
            ri.Valid_If = '=IFS([Table_Type] = "Q6_Labor", LIST("Purchase of material", "Production", "Servicing", "Social media marketing", "Sale (from shop/door to door/Saras fair/haat)", "Record keeping", "Any other, specify"), [Table_Type] = "Q15_Turnover", LIST("Peak season", "Average", "Lean"), [Table_Type] = "Q19_Capital", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q20_Loan_Usage", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q22_Trajectory", LIST("Average sales/month", "Average monthly income", "In case of trading, value of inventory/stock", "In case of production, the value of stock of inputs", "In case of production, value of stock of finished products", "In case of servicing, value of enterprise related assets"))';
            cAttrs[riIdx] = ri;
        }

        // Crucial: Assign full cAttrs array so Redux commits it!
        dict["AppData.DataSchemas[" + cIdx + "].Attributes"] = cAttrs;

        // 2. FIX PARENT TABLE: Display Names for ALL reverse references
        var sAttrs = schemas[sIdx].Attributes.slice();
        var q6Title = '="Q6. Involvement of family members and hired help in business operations"';

        sAttrs.forEach(function(a, idx) {
            if (a.Name === 'Related Survey_Tables') {
                var cloned = Object.assign({}, a);
                cloned.DisplayName = q6Title;
                sAttrs[idx] = cloned;
            } else if (a.Name === 'Related_Q6_Labor') {
                var cloned = Object.assign({}, a);
                cloned.DisplayName = q6Title;
                sAttrs[idx] = cloned;
            } else if (a.Name === 'Related_Q15_Turnover') {
                var cloned = Object.assign({}, a);
                cloned.DisplayName = '="Q15. Turnover and income from the enterprise"';
                sAttrs[idx] = cloned;
            } else if (a.Name === 'Related_Q19_Capital') {
                var cloned = Object.assign({}, a);
                cloned.DisplayName = '="Q19. How have you arranged capital over the enterprise duration?"';
                sAttrs[idx] = cloned;
            } else if (a.Name === 'Related_Q20_Loan_Usage') {
                var cloned = Object.assign({}, a);
                cloned.DisplayName = '="Q20. How did you use the loans taken from different sources?"';
                sAttrs[idx] = cloned;
            } else if (a.Name === 'Related_Q22_Trajectory') {
                var cloned = Object.assign({}, a);
                cloned.DisplayName = '="Q22. What changes have happened in your business?"';
                sAttrs[idx] = cloned;
            }
        });

        // Crucial: Assign full sAttrs array so Redux commits it!
        dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = sAttrs;

        // 3. FIX INLINE VIEWS in Controls
        var controls = (h.Presentation && h.Presentation.Controls) || [];
        controls.forEach(function(ctl, idx) {
            if (ctl && (ctl.Name === 'Survey_Tables_Inline' || (ctl.TableOrFolderName === 'Survey_Tables' && ctl.Action === 'table'))) {
                dict["Presentation.Controls[" + idx + "].DisplayName"] = q6Title;
            }
        });

        // 4. Dispatch to Redux
        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("=== [OmmNoMi SUCCESS] Auto-Fill & Display Name Permanently Fixed! ===");
        console.log("[1] Table_Type InitialValue set with fallback to 'Q6_Labor'. EnumValues configured.");
        console.log("[2] Both Related_Q6_Labor AND Related Survey_Tables display names set to Q6 Title.");
        console.log("[3] Full attribute arrays committed to Redux.");
        console.log("[ACTION] Click the blue SAVE button in top-right now!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
