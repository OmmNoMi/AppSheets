// Diagnostic script to inspect exact column state in AppSheet Redux store
(function diagnoseState() {
    console.log("🔍 === DIAGNOSING APPSHEET REDUX STATE ===");

    const store = window.appStore;
    if (!store) {
        console.error("❌ Redux store not found!");
        return;
    }

    const state = store.getState();
    const historyItem = state.appTemplate?.history?.[0]?.appTemplate || state.appTemplate?.current;
    const schemas = historyItem?.AppData?.DataSchemas;

    if (!schemas) {
        console.error("❌ DataSchemas not found!");
        return;
    }

    console.log("📋 Found DataSchemas count:", schemas.length);
    schemas.forEach((s, idx) => {
        console.log(`  Schema [${idx}]: Name = "${s.Name}", TableName = "${s.TableName || s.Name}", Attributes = ${s.Attributes?.length}`);
    });

    const surveySchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile' || a.Name === 'BusinessType'));
    const appVarSchemaIdx = schemas.findIndex(s => s && s.Attributes?.some(a => a.Name === 'Title_hi' || a.Name === 'VariableList'));

    console.log(`\n📊 Survey Schema Index: ${surveySchemaIdx}`);
    if (surveySchemaIdx !== -1) {
        const survey = schemas[surveySchemaIdx];
        const block = survey.Attributes.find(a => a.Name === 'Block');
        const bizType = survey.Attributes.find(a => a.Name === 'BusinessType');
        const dist = survey.Attributes.find(a => a.Name === 'District');

        console.log("--- Column: Block ---");
        console.log({
            Type: block?.Type,
            ReferencedTableName: block?.ReferencedTableName,
            EnumListElementTypeName: block?.EnumListElementTypeName,
            ValidIf: block?.ValidIf || block?.Valid_If,
            TypeAuxData: block?.TypeAuxData,
            EnumValues: block?.EnumValues
        });

        console.log("--- Column: BusinessType ---");
        console.log({
            Type: bizType?.Type,
            ReferencedTableName: bizType?.ReferencedTableName,
            EnumListElementTypeName: bizType?.EnumListElementTypeName,
            ValidIf: bizType?.ValidIf || bizType?.Valid_If,
            TypeAuxData: bizType?.TypeAuxData,
            EnumValues: bizType?.EnumValues
        });
    }

    console.log(`\n📊 AppVariables Schema Index: ${appVarSchemaIdx}`);
    if (appVarSchemaIdx !== -1) {
        const av = schemas[appVarSchemaIdx];
        const labelAttr = av.Attributes.find(a => a.Name === 'Label');
        const idAttr = av.Attributes.find(a => a.Name === 'ID');

        console.log("--- AppVariables: Label ---");
        console.log({
            Name: labelAttr?.Name,
            IsKey: labelAttr?.IsKey,
            IsLabel: labelAttr?.IsLabel,
            AppFormula: labelAttr?.AppFormula,
            Type: labelAttr?.Type
        });

        console.log("--- AppVariables: ID ---");
        console.log({
            Name: idAttr?.Name,
            IsKey: idAttr?.IsKey,
            IsLabel: idAttr?.IsLabel
        });
    }
})();
