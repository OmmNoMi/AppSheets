// Test script
(function() {
    var s = window.appStore.getState();
    var h = s.appTemplate.history[0].appTemplate;
    var st = h.AppData.DataSchemas.find(function(x) { return x && x.Name.indexOf('Survey_Tables') >= 0; });
    var tt = st.Attributes.find(function(a) { return a.Name === 'Table_Type'; });
    var id = st.Attributes.find(function(a) { return a.Name === 'ID'; });
    console.log("tt keys:", Object.keys(tt));
    console.log("tt values:", JSON.stringify(tt));
    console.log("id values:", JSON.stringify(id));
})();
