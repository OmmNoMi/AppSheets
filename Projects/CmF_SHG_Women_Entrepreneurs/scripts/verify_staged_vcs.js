var s = window.appStore.getState().appTemplate.history[0].appTemplate.AppData.DataSchemas.find(function(x) {
  return x && x.Attributes && x.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed' || a.Name === 'FamilyAdultsCount'; });
});
console.table(s.Attributes.slice(-9).map(function(a) { return { Name: a.Name, Type: a.Type, Formula: (a.AppFormula || "").substring(0, 40) + "..." }; }));
