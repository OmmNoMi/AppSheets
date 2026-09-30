// =========================================================================
// OmmNoMi: Auto-Fill Table_Type & Narrow Slice Columns
// Size: Under 120 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function configureAutofillAndNarrowSlices() {
    try {
        console.clear();
        console.log("[OmmNoMi] Configuring Context-Based Auto-Fill and Narrow Slices...");

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
        var cIdx = schemas.findIndex(function(s) { return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables'); });
        if (cIdx === -1) { console.error("[ERROR] Survey_Tables schema not found."); return; }

        var cAttrs = schemas[cIdx].Attributes;
        var dict = {};

        // 1. Configure Table_Type InitialValue with Context Auto-Fill
        var ttIdx = cAttrs.findIndex(function(a) { return a.Name === 'Table_Type'; });
        if (ttIdx !== -1) {
            var pTT = "AppData.DataSchemas[" + cIdx + "].Attributes[" + ttIdx + "]";
            var ttFormula = '=IFS(IN("Labor", CONTEXT("View")), "Q6_Labor", IN("Turnover", CONTEXT("View")), "Q15_Turnover", IN("Capital", CONTEXT("View")), "Q19_Capital", IN("Loan", CONTEXT("View")), "Q20_Loan_Usage", IN("Trajectory", CONTEXT("View")), "Q22_Trajectory", TRUE, "Q6_Labor")';
            cAttrs[ttIdx].InitialValue = ttFormula;
            cAttrs[ttIdx].Editable_If = "=FALSE";
            dict[pTT + ".InitialValue"] = ttFormula;
            dict[pTT + ".Editable_If"] = "=FALSE";
        }

        // 2. Set Row_Item DisplayName and Valid_If based on Table_Type
        var riIdx = cAttrs.findIndex(function(a) { return a.Name === 'Row_Item'; });
        if (riIdx !== -1) {
            var pRI = "AppData.DataSchemas[" + cIdx + "].Attributes[" + riIdx + "]";
            var dnFormula = '=IFS([Table_Type] = "Q6_Labor", "Activity", [Table_Type] = "Q15_Turnover", "Season", [Table_Type] = "Q19_Capital", "Capital Source", [Table_Type] = "Q20_Loan_Usage", "Loan Source", [Table_Type] = "Q22_Trajectory", "Business Metric")';
            var viFormula = '=IFS([Table_Type] = "Q6_Labor", LIST("Purchase of material", "Production", "Servicing", "Social media marketing", "Sale (from shop/door to door/Saras fair/haat)", "Record keeping", "Any other, specify"), [Table_Type] = "Q15_Turnover", LIST("Peak season", "Average", "Lean"), [Table_Type] = "Q19_Capital", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q20_Loan_Usage", LIST("Own Savings", "Financed by family member", "Profit from business", "Mortgaged gold/silver", "Sold gold/silver", "Loan from family", "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP", "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC", "Loan from NBFC", "Mudra loan", "Loan from banks"), [Table_Type] = "Q22_Trajectory", LIST("Average sales/month", "Average monthly income", "In case of trading, value of inventory/stock", "In case of production, the value of stock of inputs", "In case of production, value of stock of finished products", "In case of servicing, value of enterprise related assets"))';

            cAttrs[riIdx].DisplayName = dnFormula;
            cAttrs[riIdx].Valid_If = viFormula;
            dict[pRI + ".DisplayName"] = dnFormula;
            dict[pRI + ".Valid_If"] = viFormula;
        }

        // 3. Narrow Down Slices to ONLY Relevant Columns
        var slices = (h.AppData && h.AppData.TableSlices) || [];
        var sliceColMaps = {
            "Slice_Q6_Labor": ["_RowNumber", "ID", "Survey_ID", "Table_Type", "Row_Item", "Row_Item_Other", "Labor_Involvement", "Labor_Family_Count", "Labor_Hired_Count", "Labor_Amount_Paid"],
            "Slice_Q15_Turnover": ["_RowNumber", "ID", "Survey_ID", "Table_Type", "Row_Item", "Turnover_Duration_Months", "Turnover_Monthly_Sales", "Turnover_Monthly_Profit"],
            "Slice_Q19_Capital": ["_RowNumber", "ID", "Survey_ID", "Table_Type", "Row_Item", "Row_Item_Other", "Capital_First_Year", "Capital_In_Between", "Capital_Current_Year", "Capital_Pending"],
            "Slice_Q20_Loan_Usage": ["_RowNumber", "ID", "Survey_ID", "Table_Type", "Row_Item", "Loan_Usage", "Loan_Usage_Other"],
            "Slice_Q22_Trajectory": ["_RowNumber", "ID", "Survey_ID", "Table_Type", "Row_Item", "Trajectory_First_Year_Mode", "Trajectory_First_Year_Amount", "Trajectory_Current_Year_Amount"]
        };

        var updatedSlices = slices.map(function(sl) {
            if (sl && sliceColMaps[sl.Name]) {
                var clonedSl = Object.assign({}, sl);
                clonedSl.Columns = sliceColMaps[sl.Name];
                clonedSl.UpdateMode = 7;
                clonedSl.AllowedUpdates = 0;
                return clonedSl;
            }
            return sl;
        });

        dict["AppData.TableSlices"] = updatedSlices;

        // 4. Dispatch to Redux
        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("=== [OmmNoMi SUCCESS] Auto-Fill & Narrow Slices Applied! ===");
        console.log("[INFO] When clicking [Add] on Q6, only Q6 Labor fields show, and Table_Type is 'Q6_Labor'.");
        console.log("[INFO] When clicking [Add] on Q15, only Q15 Turnover fields show, and Table_Type is 'Q15_Turnover'.");
        console.log("[INFO] Same for Q19, Q20, Q22.");
        console.log("[ACTION] Click the blue SAVE button in top-right now!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
