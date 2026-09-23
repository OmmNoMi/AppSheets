(function inspectTypeAux() {
    const store = window.appStore;
    const schemas = store.getState().appTemplate?.history?.[0]?.appTemplate?.AppData?.DataSchemas;
    const survey = schemas.find(s => s && s.Attributes?.some(a => a.Name === 'Status_Profile'));
    const block = survey.Attributes.find(a => a.Name === 'Block');
    console.log("Full Block TypeAuxData (raw):", block.TypeAuxData);
    console.log("Full Block TypeAuxData (parsed):", JSON.parse(block.TypeAuxData));
})();
