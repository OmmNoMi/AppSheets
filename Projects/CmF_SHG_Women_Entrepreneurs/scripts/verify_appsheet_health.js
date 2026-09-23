// =========================================================================
// OmmNoMi: AppSheet Live Schema & Error Health Check Inspector
// Standard: SOP-A5 Compliant (Pure ASCII, Zero-Truncation Safe)
// =========================================================================
(function inspectAppSheetHealth() {
    try {
        console.clear();
        console.log("================================================================================");
        console.log("[OmmNoMi] RUNNING LIVE APPSHEET INTEGRITY AUDIT & VERIFICATION");
        console.log("================================================================================");

        // 1. Locate Store
        var store = window.appStore;
        if (!store) {
            var candidates = [
                document.querySelector('.ExpressionControl'),
                document.querySelector('[role="grid"]'),
                document.querySelector('#root'),
                document.body
            ];
            for (var i = 0; i < candidates.length; i++) {
                var el = candidates[i];
                if (!el) continue;
                var fKey = Object.keys(el).find(function(k) {
                    return k.indexOf('reactFiber') >= 0 || k.indexOf('reactInternalInstance') >= 0;
                });
                var f = el[fKey];
                while (f) {
                    if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                        store = f.memoizedProps.store;
                        window.appStore = store;
                        break;
                    }
                    if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
                        store = f.stateNode.store;
                        window.appStore = store;
                        break;
                    }
                    f = f.return;
                }
                if (store) break;
            }
        }

        if (!store) {
            console.error("[ERROR] Redux store not found! Refresh page and retry.");
            return;
        }

        var state = store.getState();
        var historyItem = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate)
            || (state.appTemplate && state.appTemplate.current);
        var schemas = (historyItem && historyItem.AppData && historyItem.AppData.DataSchemas) || [];

        var surveySchema = schemas.find(function(s) {
            return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey' || s.TableName === 'Survey' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Status_Profile'; })));
        });

        var childSchema = schemas.find(function(s) {
            return s && (s.Name === 'Survey_Tables_Schema' || s.Name === 'Survey_Tables' || s.TableName === 'Survey_Tables' || (s.Attributes && s.Attributes.some(function(a) { return a.Name === 'Table_Type'; })));
        });

        var auditResults = [];

        // TEST 1: Survey_Tables Display Names
        if (childSchema && childSchema.Attributes) {
            var badDNs = [];
            childSchema.Attributes.forEach(function(a) {
                if (a.DisplayName) {
                    if (!a.DisplayName.startsWith('=') && (a.DisplayName.indexOf('/') >= 0 || a.DisplayName.indexOf('(#)') >= 0 || a.DisplayName.indexOf('(Rs)') >= 0)) {
                        badDNs.push(a.Name + " ('" + a.DisplayName + "')");
                    }
                }
            });
            auditResults.push({
                Test_Item: "1. Survey_Tables Display Names",
                Status: badDNs.length === 0 ? "[PASSED]" : "[FAILED]",
                Details: badDNs.length === 0 ? "All DisplayNames valid" : "Unquoted: " + badDNs.join(", ")
            });
        } else {
            auditResults.push({
                Test_Item: "1. Survey_Tables Display Names",
                Status: "[WARN]",
                Details: "Survey_Tables schema not found"
            });
        }

        // TEST 2: Initial Values (NOW() / TODAY() checks)
        if (childSchema && childSchema.Attributes) {
            var badIVs = [];
            childSchema.Attributes.forEach(function(a) {
                if (a.InitialValue && (a.InitialValue.indexOf('NOW()') >= 0 || a.InitialValue.indexOf('TODAY()') >= 0)) {
                    badIVs.push(a.Name + " = " + a.InitialValue);
                }
            });
            auditResults.push({
                Test_Item: "2. Initial Values (No NOW/TODAY)",
                Status: badIVs.length === 0 ? "[PASSED]" : "[FAILED]",
                Details: badIVs.length === 0 ? "No illegal NOW/TODAY formulas" : "Illegal: " + badIVs.join(", ")
            });
        }

        // TEST 3: Survey_ID Ref and IsPartOf
        if (childSchema && childSchema.Attributes) {
            var sId = childSchema.Attributes.find(function(a) { return a.Name === 'Survey_ID'; });
            var hasSchemaSuffix = sId && sId.ReferencedTableName && sId.ReferencedTableName.toLowerCase().indexOf('schema') >= 0;
            var isPartOfOk = sId && sId.IsPartOf === true;
            var passed = sId && sId.ReferencedTableName && !hasSchemaSuffix && isPartOfOk;

            auditResults.push({
                Test_Item: "3. Survey_ID Ref and IsPartOf",
                Status: passed ? "[PASSED]" : "[FAILED]",
                Details: sId ? "Table='" + sId.ReferencedTableName + "', IsPartOf=" + sId.IsPartOf : "Survey_ID missing"
            });
        }

        // TEST 4: Survey 5 Inline Virtual Columns
        if (surveySchema && surveySchema.Attributes) {
            var vcs = ["Related_Q6_Labor", "Related_Q15_Turnover", "Related_Q19_Capital", "Related_Q20_Loan_Usage", "Related_Q22_Trajectory"];
            var missingVCs = vcs.filter(function(v) {
                return !surveySchema.Attributes.some(function(a) { return a.Name === v && a.IsVirtual; });
            });
            auditResults.push({
                Test_Item: "4. 5 Inline Virtual Columns",
                Status: missingVCs.length === 0 ? "[PASSED]" : "[FAILED]",
                Details: missingVCs.length === 0 ? "All 5 inline sub-tables active" : "Missing: " + missingVCs.join(", ")
            });
        }

        // TEST 5: Survey Blank Enums
        if (surveySchema && surveySchema.Attributes) {
            var blankEnums = [];
            surveySchema.Attributes.forEach(function(a) {
                if ((a.Type === 'Enum' || a.Type === 'EnumList') && !a.IsVirtual) {
                    var hasValidIf = !!a.Valid_If || !!a.ValidIf;
                    var hasEnumValues = a.EnumValues && a.EnumValues.length > 0;
                    if (!hasValidIf && !hasEnumValues) {
                        blankEnums.push(a.Name);
                    }
                }
            });
            auditResults.push({
                Test_Item: "5. Survey Dropdown Allowed Values",
                Status: blankEnums.length === 0 ? "[PASSED]" : "[FAILED]",
                Details: blankEnums.length === 0 ? "All Enums properly mapped" : "Empty values: " + blankEnums.slice(0, 4).join(", ")
            });
        }

        // TEST 6: UI Errors In DOM
        var errorEls = Array.from(document.querySelectorAll('.error-summary, [role="alert"], .banner-error, .ValidationErrorsView'));
        var visibleErrors = errorEls.filter(function(el) {
            return el.offsetParent !== null && el.textContent.trim().length > 0;
        });
        auditResults.push({
            Test_Item: "6. AppSheet UI Error Banner",
            Status: visibleErrors.length === 0 ? "[PASSED]" : "[INFO]",
            Details: visibleErrors.length === 0 ? "Clean UI (0 errors)" : visibleErrors.length + " notice element(s) in DOM"
        });

        console.table(auditResults);

        var allPassed = auditResults.every(function(r) {
            return r.Status === "[PASSED]";
        });

        if (allPassed) {
            console.log("[SUCCESS] ALL CHECKS PASSED! Schema is 100% healthy.");
        } else {
            console.log("[NOTICE] Check table above for specific items.");
        }
    } catch (err) {
        console.error("[OmmNoMi ERROR]", err.message);
    }
})();
