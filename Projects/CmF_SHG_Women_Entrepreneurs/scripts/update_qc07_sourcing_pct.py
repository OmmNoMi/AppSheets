import csv

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

pct_vlist = "PCT_0 , PCT_25 , PCT_50 , PCT_75 , PCT_100"

updates = {
    "Q_C_07_00": {
        "ValueControl": "Section_Header",
        "Title": "Q7. What percentage of raw material do you source from these places?",
        "Title_hi": "Q7. आप इन स्थानों से कितने प्रतिशत कच्चा माल प्राप्त करती हैं?",
        "Title_raj": "Q7. थे ईं जगावां सूं कित्ता प्रतिशत माल लावो हो?",
        "Description": "Prompt for Raw Material Sourcing Percentage",
        "EnumValue": "Q7. What percentage of raw material do you source from these places?",
        "VariableList": pct_vlist
    },
    "Q_C_07_01": {
        "ValueControl": "Enum",
        "Title": "a. Nearby town/district",
        "Title_hi": "a. आसपास के कस्बे / जिले से",
        "Title_raj": "a. नेड़े रा कस्बा / जिले सूं",
        "Description": "Nearby town/district sourcing percentage",
        "EnumValue": "Nearby town/district",
        "VariableList": pct_vlist
    },
    "Q_C_07_02": {
        "ValueControl": "Enum",
        "Title": "b. Wholesale market within state",
        "Title_hi": "b. राज्य के भीतर थोक बाजार से",
        "Title_raj": "b. राजस्थान रा थोक बाजार सूं",
        "Description": "Wholesale market within state sourcing percentage",
        "EnumValue": "Wholesale market within state",
        "VariableList": pct_vlist
    },
    "Q_C_07_03": {
        "ValueControl": "Enum",
        "Title": "c. Wholesale market outside the state",
        "Title_hi": "c. राज्य के बाहर थोक बाजार से",
        "Title_raj": "c. बाहर रा थोक बाजार सूं",
        "Description": "Wholesale market outside the state sourcing percentage",
        "EnumValue": "Wholesale market outside the state",
        "VariableList": pct_vlist
    },
    "Q_C_07_04": {
        "ValueControl": "Enum",
        "Title": "d. Order online (Amazon/Meesho)",
        "Title_hi": "d. ऑनलाइन ऑर्डर (Amazon/Meesho) से",
        "Title_raj": "d. ऑनलाइन ऑर्डर सूं",
        "Description": "Order online sourcing percentage",
        "EnumValue": "Order online (Amazon/Meesho)",
        "VariableList": pct_vlist
    }
}

for r in rows:
    rid = r['ID']
    if rid in updates:
        for k, v in updates[rid].items():
            r[k] = v
        r['LastEditBy'] = 'Antigravity'
        r['LastEditOn'] = '09/26/2026 09:15:00'
        print(f"Updated {rid}: {r['Title']}")

with open(appvar_path, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

tsv_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_EXACT_SYNC.tsv'
with open(tsv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(rows)

print("Saved updated AppVariables.csv & AppVariables_EXACT_SYNC.tsv")
