// =========================================================================
// OmmNoMi: Configure Bot Event Table, Branch Condition & Idempotency
// Size: Under 45 lines, Pure ASCII, Validated with node -c
// =========================================================================
(function configureBotAndBranch() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (!h || !h.Behavior) return;

        var dict = {};

        // 1. Rename Bot
        dict["Behavior.AppBots[0].Name"] = "Bot_Auto_Create_Survey_Tables";

        // 2. Set Event to Survey table, Adds Only
        dict["Behavior.AppEvents[0].Name"] = "Event_Survey_Added";
        dict["Behavior.AppEvents[0].AppEventDefinition.SchemaName"] = "Survey_Schema";
        dict["Behavior.AppEvents[0].AppEventDefinition.ChangeEvent"] = "ADDS_ONLY";

        // 3. Set Process Input Schema to Survey_Schema
        dict["Behavior.AppProcesses[0].Name"] = "Process_Auto_Create_Matrix_Rows";
        dict["Behavior.AppProcesses[0].InputSchemaName"] = "Survey_Schema";

        // 4. Set Branch Condition (Idempotency Check)
        var conditionFormula = '=COUNT(SELECT(Survey_Tables[ID], [Survey_ID] = [_THISROW].[ID])) = 0';
        dict["Behavior.AppProcesses[0].Nodes[0].StepName"] = "Check_Zero_Existing_Rows";
        dict["Behavior.AppProcesses[0].Nodes[0].Condition"] = conditionFormula;

        store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
        store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

        console.log("[OmmNoMi OK] Bot Event set to Survey (ADDS_ONLY) and Branch Condition applied!");
        console.log("Branch Condition:", conditionFormula);
        console.log("[ACTION] Click the blue SAVE button in AppSheet top-right!");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
