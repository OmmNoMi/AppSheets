// ==============================================================================
// OmmNoMi: Dynamic Multilingual Switcher for Q17 & Q6 (< 55 lines, Pure ASCII)
// ==============================================================================
(function setDynamicMultilingual() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Applying Dynamic Multilingual Switcher (Q17 & Q6) ===");

    var store = window.appStore || (function() {
      var el = document.querySelector('.ExpressionControl') || document.querySelector('[role="grid"]') || document.body;
      var k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); });
      var f = el && el[k];
      while (f) {
        if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store;
        if (f.stateNode && f.stateNode.store) return f.stateNode.store;
        f = f.return;
      }
    })();
    if (!store) return console.error("[FAIL] Store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));

    var fQ17 = "=IFS(ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = \"Hindi\", LIST(\"\u0905\u092a\u0928\u0940 \u092c\u091a\u0924\", \"\u092a\u0930\u093f\u0935\u093e\u0930 \u0915\u0947 \u0938\u0926\u0938\u094d\u092f\u094b\u0902 \u0926\u094d\u0935\u093e\u0930\u093e \u0935\u093f\u0924\u094d\u0924\u092a\u094b\u0937\u0923\", \"\u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0915\u093e \u092e\u0941\u0928\u093e\u092b\u093e\", \"\u0938\u094b\u0928\u093e/\u091a\u093e\u0902\u0926\u0940 \u0917\u093f\u0930\u0935\u0940 \u0930\u0916\u0915\u0930\", \"\u0938\u094b\u0928\u093e/\u091a\u093e\u0902\u0926\u0940 \u092c\u0947\u091a\u0915\u0930\", \"\u0930\u093f\u0936\u094d\u0924\u0947\u0926\u093e\u0930\u094b\u0902 \u0938\u0947 \u0915\u0930\u094d\u091c\", \"\u0938\u093e\u0939\u0942\u0915\u093e\u0930 \u0938\u0947 \u090b\u0923\", \"SHG \u0938\u0947 \u090b\u0923\", \"OSF/SVEP \u0938\u0947 \u090b\u0923\", \"OSF/SVEP \u0915\u0947 \u0924\u0939\u0924 \u0938\u092c\u094d\u0938\u093f\u0921\u0940/\u0905\u0928\u0941\u0926\u093e\u0928\", \"\u0928\u093f\u091c\u0940 \u092c\u091a\u0924 \u0938\u092e\u0942\u0939 / \u092c\u0940\u0938\u0940 \u0938\u0947 \u0915\u0930\u094d\u091c\", \"NBFC / \u092e\u093e\u0907\u0915\u094d\u0930\u094b\u092b\u093e\u0907\u0928\u0947\u0902\u0938 \u090b\u0923\", \"\u092e\u0941\u0926\u094d\u0930\u093e \u0932\u094b\u0928\", \"\u092c\u0948\u0902\u0915 \u0938\u0947 \u090b\u0923\"), ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = \"Rajasthani\", LIST(\"\u0916\u0941\u0926 \u0930\u0940 \u092c\u091a\u0924\", \"\u0918\u0930 \u0930\u093e \u091c\u0923\u093e \u0926\u093f\u092f\u093e\", \"\u0927\u0902\u0927\u0947 \u0930\u094b \u092e\u0941\u0928\u093e\u092b\u094b\", \"\u0938\u094b\u0928\u093e-\u091a\u093e\u0902\u0926\u0940 \u0917\u093f\u0930\u0935\u0940 \u0930\u0916 \u0930\", \"\u0938\u094b\u0928\u093e-\u091a\u093e\u0902\u0926\u0940 \u092c\u0947\u091a \u0930\", \"\u0928\u093e\u0924\u0947\u0926\u093e\u0930\u093e\u0902 \u0938\u0942\u0902 \u0932\u094b\u0928\", \"\u0938\u093e\u0939\u0942\u0915\u093e\u0930 \u0938\u0942\u0902 \u0915\u0930\u094d\u091c\", \"\u0938\u092e\u0942\u0939 \u0938\u0942\u0902 \u0932\u094b\u0928\", \"OSF/SVEP \u0938\u0942\u0902 \u0932\u094b\u0928\", \"\u092f\u094b\u091c\u0928\u093e \u0930\u0940 \u0938\u092c\u094d\u0938\u093f\u0921\u0940/\u0905\u0928\u0941\u0926\u093e\u0928\", \"\u0928\u093f\u091c\u0940 \u092c\u0940\u0938\u0940/\u0917\u094d\u0930\u0941\u092a \u0938\u0942\u0902 \u0932\u094b\u0928\", \"\u0915\u0902\u092a\u0928\u0940 \u0930\u094b \u0932\u094b\u0928\", \"\u092e\u0941\u0926\u094d\u0930\u093e \u0932\u094b\u0928\", \"\u092c\u0948\u0902\u0915 \u0938\u0942\u0902 \u0932\u094b\u0928\"), TRUE, LIST(\"Own Savings\", \"Financed by family member\", \"Profit from business\", \"Mortgaged gold/silver\", \"Sold gold/silver\", \"Loan from family\", \"Loan from moneylender\", \"Loan from SHG\", \"Loan from OSF/SVEP\", \"Subsidy/grant under OSF/SVEP\", \"Loan from private saving groups/BC\", \"Loan from NBFC\", \"Mudra loan\", \"Loan from banks\"))";
    var fQ6 = "=IFS(ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = \"Hindi\", LIST(\"\u0915\u091a\u094d\u091a\u093e \u092e\u093e\u0932 \u0916\u0930\u0940\u0926\", \"\u0909\u0924\u094d\u092a\u093e\u0926\u0928 / \u0928\u093f\u0930\u094d\u092e\u093e\u0923\", \"\u0938\u0947\u0935\u093e / \u092e\u0930\u092e\u094d\u092e\u0924\", \"\u0938\u094b\u0936\u0932 \u092e\u0940\u0921\u093f\u092f\u093e \u092e\u093e\u0930\u094d\u0915\u0947\u091f\u093f\u0902\u0917\", \"\u092c\u093f\u0915\u094d\u0930\u0940 (\u0926\u0941\u0915\u093e\u0928/\u0918\u0930-\u0918\u0930/\u0938\u0930\u0938 \u092e\u0947\u0932\u093e/\u0939\u093e\u091f)\", \"\u092c\u0939\u0940-\u0916\u093e\u0924\u093e / \u0939\u093f\u0938\u093e\u092c-\u0915\u093f\u0924\u093e\u092c\"), ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = \"Rajasthani\", LIST(\"\u0915\u091a\u094d\u091a\u094b \u092e\u093e\u0932 \u092e\u094b\u0932 \u0932\u0947\u0935\u0923\u094b\", \"\u092e\u093e\u0932 \u092c\u0923\u093e\u0935\u0923\u094b\", \"\u0938\u0947\u0935\u093e / \u0926\u0941\u0930\u0941\u0938\u094d\u0924 \u0915\u0930\u0923\u094b\", \"\u0938\u094b\u0936\u0932 \u092e\u0940\u0921\u093f\u092f\u093e \u092a\u094d\u0930\u091a\u093e\u0930\", \"\u092c\u093f\u0915\u094d\u0930\u0940 (\u0926\u0941\u0915\u093e\u0928/\u0918\u0930\u093e\u0902-\u0918\u0930\u093e\u0902/\u0938\u0930\u0938 \u092e\u0947\u0932\u094b/\u0939\u093e\u091f)\", \"\u0939\u093f\u0938\u093e\u092c-\u0915\u093f\u0924\u093e\u092c \u0930\u093e\u0916\u0923\u094b\"), TRUE, LIST(\"Purchase of material\", \"Production\", \"Servicing\", \"Social media marketing\", \"Sale (from shop/door to door/Saras fair/haat)\", \"Record keeping\"))";

    schemas.forEach(function(schema) {
      var isCap = (schema.Name || '').indexOf('Capital') >= 0;
      var isLabor = (schema.Name || '').indexOf('Labor') >= 0;

      (schema.Attributes || []).forEach(function(attr) {
        var isSrc = isCap && (attr.Name === 'Source' || attr.Name === 'Capital_Source' || attr.Name === 'Source_Name');
        var isAct = (isLabor && (attr.Name === 'Activity' || attr.Name === 'Activity_Name')) || attr.Name === 'BusinessActivity';

        if (isSrc || attr.Name === 'InitialCapitalArranged') {
          var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
          attr.Type = attr.Name === 'InitialCapitalArranged' ? 'EnumList' : 'Enum';
          aux.Suggested_Values = fQ17; aux.EnumValues = null; aux.BaseType = 'Text'; aux.EnumInputMode = 'Dropdown'; aux.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name + " with Dynamic Q17");
        }
        if (isAct) {
          var aux2 = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
          attr.Type = 'Enum';
          aux2.Suggested_Values = fQ6; aux2.EnumValues = null; aux2.BaseType = 'Text'; aux2.EnumInputMode = 'Dropdown'; aux2.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux2);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name + " with Dynamic Q6");
        }
      });
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: { 'AppData.DataSchemas': schemas }, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Dynamic Multilingual Switcher Applied! Click SAVE in AppSheet! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
