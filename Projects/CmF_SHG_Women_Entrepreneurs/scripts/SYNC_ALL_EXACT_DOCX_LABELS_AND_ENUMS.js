(function syncAllExactDocxLabelsAndEnums() {
  try {
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) {
          return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance');
        });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
            window.appStore = f.memoizedProps.store;
            return window.appStore;
          }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
            window.appStore = f.stateNode.store;
            return window.appStore;
          }
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) {
      console.error("[FAIL] AppSheet Redux store not found. Ensure AppSheet Editor is open.");
      return;
    }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) {
      console.error("[FAIL] AppTemplate not found in Redux state.");
      return;
    }

    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var surveyIdx = schemas.findIndex(function(s) {
      return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey') ||
             (s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed'; }));
    });

    if (surveyIdx === -1) {
      console.error("[FAIL] Survey schema not found in AppData.DataSchemas.");
      return;
    }

    var schema = schemas[surveyIdx];
    var attrs = schema.Attributes || [];
    var rules = {
    "District": {
        "lbl_id": "LBL_A1",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A1\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "Block": {
        "lbl_id": "LBL_A2",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A2\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "VillageGP": {
        "lbl_id": "LBL_A3",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A3\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "RespondentName": {
        "lbl_id": "LBL_A4",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A4\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "RespondentPhone": {
        "lbl_id": "LBL_A5",
        "type": "Phone",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A5\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A5\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A5\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "SHGName": {
        "lbl_id": "LBL_A6",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A6\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A6\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A6\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "VOName": {
        "lbl_id": "LBL_A7",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A7\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A7\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A7\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "CLFName": {
        "lbl_id": "LBL_A8",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A8\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A8\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A8\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "SHGMembershipYears": {
        "lbl_id": "LBL_A9",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A9\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A9\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A9\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "LeadershipRole": {
        "lbl_id": "LBL_A10",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A10\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A10\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A10\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"LeadershipRole\")"
    },
    "LeadershipYears": {
        "lbl_id": "LBL_A11",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A11\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A11\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A11\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "RelatedToCRP": {
        "lbl_id": "LBL_A12",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A12\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A12\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A12\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"RelatedToCRP\")"
    },
    "EPInterventionType": {
        "lbl_id": "LBL_A13",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A13\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A13\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A13\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"EPInterventionType\")"
    },
    "EnterpriseName": {
        "lbl_id": "LBL_A14",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A14\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A14\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A14\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "EnterpriseSetupYear": {
        "lbl_id": "LBL_A15",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A15\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A15\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A15\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "BusinessType": {
        "lbl_id": "LBL_A16",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A16\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A16\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A16\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"BusinessType\")"
    },
    "BusinessActivities": {
        "lbl_id": "LBL_A17",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A17\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A17\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A17\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"BusinessActivities\")"
    },
    "LoanReceivedYear": {
        "lbl_id": "LBL_A18",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A18\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A18\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A18\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "MaintainSeparateRecords": {
        "lbl_id": "LBL_A19",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A19\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A19\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A19\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"MaintainSeparateRecords\")"
    },
    "RegistrationsDocuments": {
        "lbl_id": "LBL_A20",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_A20\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_A20\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_A20\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"RegistrationsDocuments\")"
    },
    "RespondentAge": {
        "lbl_id": "LBL_B1",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B1\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"RespondentAge\")"
    },
    "MaritalStatus": {
        "lbl_id": "LBL_B2",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B2\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"MaritalStatus\")"
    },
    "SocialCategory": {
        "lbl_id": "LBL_B3",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B3\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SocialCategory\")"
    },
    "EducationStatus": {
        "lbl_id": "LBL_B4",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B4\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"EducationStatus\")"
    },
    "FamilyMemberCount": {
        "lbl_id": "LBL_B5",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B5\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B5\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B5\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FamilyAdultsCount": {
        "lbl_id": "LBL_B6a",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B6a\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B6a\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B6a\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FamilyChildrenCount": {
        "lbl_id": "LBL_B6b",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B6b\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B6b\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B6b\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FamilyTotalEarning": {
        "lbl_id": "LBL_B6c",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B6c\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B6c\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B6c\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FamilyMaleEarning": {
        "lbl_id": "LBL_B6d",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B6d\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B6d\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B6d\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FamilyFemaleEarning": {
        "lbl_id": "LBL_B6e",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B6e\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B6e\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B6e\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FamilyDisabledCount": {
        "lbl_id": "LBL_B6f",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B6f\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B6f\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B6f\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FamilyIncomeSources": {
        "lbl_id": "LBL_B7",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B7\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B7\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B7\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"FamilyIncomeSources\")"
    },
    "AnnualHouseholdIncome": {
        "lbl_id": "LBL_B8",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_B8\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_B8\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_B8\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"AnnualHouseholdIncome\")"
    },
    "ReasonsStartingBusiness": {
        "lbl_id": "LBL_C1",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C1\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"ReasonsStartingBusiness\")"
    },
    "BusinessCycle": {
        "lbl_id": "LBL_C2",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C2\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"BusinessCycle\")"
    },
    "BusinessPlaceType": {
        "lbl_id": "LBL_C3",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C3\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"BusinessPlaceType\")"
    },
    "MonthlyRent": {
        "lbl_id": "LBL_C4",
        "type": "Price",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C4\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "LocationConvenience": {
        "lbl_id": "LBL_C5",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C5\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C5\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C5\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"LocationConvenience\")"
    },
    "Related_Q6_Labor": {
        "lbl_id": "LBL_C6",
        "type": "InlineSubTable",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C6\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C6\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C6\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "Sourcing_NearbyTown_Pct": {
        "lbl_id": "LBL_C7a",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C7a\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C7a\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C7a\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"Sourcing_NearbyTown_Pct\")"
    },
    "Sourcing_Jaipur_Pct": {
        "lbl_id": "LBL_C7b",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C7b\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C7b\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C7b\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"Sourcing_Jaipur_Pct\")"
    },
    "Sourcing_OutsideState_Pct": {
        "lbl_id": "LBL_C7c",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C7c\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C7c\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C7c\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"Sourcing_OutsideState_Pct\")"
    },
    "Sourcing_Online_Pct": {
        "lbl_id": "LBL_C7d",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C7d\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C7d\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C7d\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"Sourcing_Online_Pct\")"
    },
    "MarketingMethods": {
        "lbl_id": "LBL_C8",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C8\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C8\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C8\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"MarketingMethods\")"
    },
    "SeasonalSalesMethod": {
        "lbl_id": "LBL_C9",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C9\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C9\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C9\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SeasonalSalesMethod\")"
    },
    "SalesChannel_Online_Pct": {
        "lbl_id": "LBL_C10a",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C10a\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C10a\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C10a\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SalesChannel_Online_Pct\")"
    },
    "SalesChannel_WhatsApp_Pct": {
        "lbl_id": "LBL_C10b",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C10b\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C10b\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C10b\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SalesChannel_WhatsApp_Pct\")"
    },
    "SalesChannel_Instagram_Pct": {
        "lbl_id": "LBL_C10c",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C10c\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C10c\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C10c\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SalesChannel_Instagram_Pct\")"
    },
    "SalesChannel_Premise_Pct": {
        "lbl_id": "LBL_C10d",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C10d\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C10d\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C10d\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SalesChannel_Premise_Pct\")"
    },
    "SalesChannel_Traders_Pct": {
        "lbl_id": "LBL_C10e",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C10e\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C10e\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C10e\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SalesChannel_Traders_Pct\")"
    },
    "SalesChannel_Haat_Pct": {
        "lbl_id": "LBL_C10f",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C10f\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C10f\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C10f\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SalesChannel_Haat_Pct\")"
    },
    "SalesChannel_Saras_Pct": {
        "lbl_id": "LBL_C10g",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C10g\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C10g\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C10g\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SalesChannel_Saras_Pct\")"
    },
    "RecordKeepingHabit": {
        "lbl_id": "LBL_C11",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C11\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C11\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C11\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"RecordKeepingHabit\")"
    },
    "RecordKeepingMethod": {
        "lbl_id": "LBL_C12",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C12\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C12\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C12\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"RecordKeepingMethod\")"
    },
    "Related_Q15_Turnover": {
        "lbl_id": "LBL_C13",
        "type": "InlineSubTable",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_C13\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_C13\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_C13\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "SHGAssociationAssistance": {
        "lbl_id": "LBL_D1",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_D1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_D1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_D1\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SHGAssociationAssistance\")"
    },
    "Related_Q19_Capital": {
        "lbl_id": "LBL_D2",
        "type": "InlineSubTable",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_D2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_D2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_D2\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "Related_Q20_Loan_Usage": {
        "lbl_id": "LBL_D3",
        "type": "InlineSubTable",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_D3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_D3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_D3\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FundingExperience": {
        "lbl_id": "LBL_D4",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_D4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_D4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_D4\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"FundingExperience\")"
    },
    "Related_Q22_Trajectory": {
        "lbl_id": "LBL_D5",
        "type": "InlineSubTable",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_D5\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_D5\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_D5\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "FinancialHelpFromIncome": {
        "lbl_id": "LBL_D6",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_D6\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_D6\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_D6\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"FinancialHelpFromIncome\")"
    },
    "HusbandFamilyResponse": {
        "lbl_id": "LBL_E1",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E1\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"HusbandFamilyResponse\")"
    },
    "MaterialSourcingComfort": {
        "lbl_id": "LBL_E2",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E2\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"MaterialSourcingComfort\")"
    },
    "CustomerPaymentRecovery": {
        "lbl_id": "LBL_E3",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E3\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"CustomerPaymentRecovery\")"
    },
    "CurrentChallenges": {
        "lbl_id": "LBL_E4",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E4\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"CurrentChallenges\")"
    },
    "Competitors_Similar_Scale": {
        "lbl_id": "LBL_E5a",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E5a\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E5a\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E5a\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "Competitors_Smaller_Scale": {
        "lbl_id": "LBL_E5b",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E5b\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E5b\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E5b\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "Competitors_Higher_Scale": {
        "lbl_id": "LBL_E5c",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E5c\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E5c\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E5c\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "CompetitorAdvantages": {
        "lbl_id": "LBL_E6",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_E6\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_E6\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_E6\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"CompetitorAdvantages\")"
    },
    "FutureExpansionPlans": {
        "lbl_id": "LBL_F1",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_F1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_F1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_F1\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"FutureExpansionPlans\")"
    },
    "AspirationBottlenecks": {
        "lbl_id": "LBL_F2",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_F2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_F2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_F2\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"AspirationBottlenecks\")"
    },
    "FutureFundsRequired": {
        "lbl_id": "LBL_F3",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_F3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_F3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_F3\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"FutureFundsRequired\")"
    },
    "AttendedTraining": {
        "lbl_id": "LBL_G1",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G1\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"AttendedTraining\")"
    },
    "TrainingDetails": {
        "lbl_id": "LBL_G2",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G2\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "UsedTrainingComponent": {
        "lbl_id": "LBL_G3",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G3\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"UsedTrainingComponent\")"
    },
    "UsedTrainingDetails": {
        "lbl_id": "LBL_G4",
        "type": "Text",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G4\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "MonthlyIncomeBeforeLoan": {
        "lbl_id": "LBL_G5a",
        "type": "Price",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G5a\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G5a\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G5a\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "MonthlyIncomeAfterLoan": {
        "lbl_id": "LBL_G5b",
        "type": "Price",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G5b\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G5b\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G5b\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "MonthlyIncomeIncreaseByOSFSVEP": {
        "lbl_id": "LBL_G6",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G6\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G6\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G6\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"MonthlyIncomeIncreaseByOSFSVEP\")"
    },
    "CRPContributions": {
        "lbl_id": "LBL_G7",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G7\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G7\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G7\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"CRPContributions\")"
    },
    "ExpectationsFromScheme": {
        "lbl_id": "LBL_G8",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_G8\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_G8\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_G8\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"ExpectationsFromScheme\")"
    },
    "SmartphoneOwnership": {
        "lbl_id": "LBL_H1",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H1\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SmartphoneOwnership\")"
    },
    "UseQRUPI": {
        "lbl_id": "LBL_H2",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H2\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"UseQRUPI\")"
    },
    "QRDailyTransactions": {
        "lbl_id": "LBL_H3",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H3\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"QRDailyTransactions\")"
    },
    "QRNonUseReason": {
        "lbl_id": "LBL_H4",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H4\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"QRNonUseReason\")"
    },
    "SocialMediaForMarketing": {
        "lbl_id": "LBL_H5",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H5\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H5\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H5\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SocialMediaForMarketing\")"
    },
    "SocialPlatformsUsed": {
        "lbl_id": "LBL_H6",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H6\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H6\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H6\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SocialPlatformsUsed\")"
    },
    "SocialPlatformUsageMode": {
        "lbl_id": "LBL_H7",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H7\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H7\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H7\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SocialPlatformUsageMode\")"
    },
    "SocialMediaFrequency": {
        "lbl_id": "LBL_H8",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_H8\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_H8\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_H8\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SocialMediaFrequency\")"
    },
    "OSFInterventionYear": {
        "lbl_id": "LBL_I1",
        "type": "Number",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_I1\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_I1\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_I1\", \"AppVariables\", \"ID\", \"Title\"))"
    },
    "BusinessOperationalStatus": {
        "lbl_id": "LBL_I2",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_I2\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_I2\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_I2\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"BusinessOperationalStatus\")"
    },
    "ScalingDownClosingReasons": {
        "lbl_id": "LBL_I3",
        "type": "EnumList",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_I3\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_I3\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_I3\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"ScalingDownClosingReasons\")"
    },
    "SupportNeededForSustenance": {
        "lbl_id": "LBL_I4",
        "type": "Enum",
        "displayName": "=IFS(LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"hi\", LOOKUP(\"LBL_I4\", \"AppVariables\", \"ID\", \"Title_hi\"), LOOKUP(USEREMAIL(), \"AppUser\", \"Email\", \"PreferredLanguage\") = \"raj\", LOOKUP(\"LBL_I4\", \"AppVariables\", \"ID\", \"Title_raj\"), TRUE, LOOKUP(\"LBL_I4\", \"AppVariables\", \"ID\", \"Title\"))",
        "validIf": "=SELECT(AppVariables[EnumValue], [Column] = \"SupportNeededForSustenance\")"
    }
};

    var dict = {};
    var count = 0;

    Object.keys(rules).forEach(function(colName) {
      var aIdx = attrs.findIndex(function(a) { return a && a.Name === colName; });
      if (aIdx >= 0) {
        var r = rules[colName];
        var basePath = "AppData.DataSchemas[" + surveyIdx + "].Attributes[" + aIdx + "].";
        
        if (r.displayName) {
          dict[basePath + "Display_Name"] = r.displayName;
          dict[basePath + "DisplayName"] = r.displayName;
        }
        if (r.validIf) {
          dict[basePath + "Valid_If"] = r.validIf;
          dict[basePath + "ValidIf"] = r.validIf;
        }
        count++;
      }
    });

    console.log("[INFO] Dispatching exact docx display names & valid_if rules for " + count + " columns...");
    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({
      type: "SHOW_SAVE_BUTTON",
      value: true
    });

    console.log("=== [SUCCESS] " + count + " Survey columns configured with 100% verbatim DOCX rules! ===");
    console.log("[INFO] Click the native cloud Save button in AppSheet header to commit changes.");
  } catch (e) {
    console.error("[FAIL] Exception during configuration:", e);
  }
})();
