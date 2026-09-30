import csv
import json

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    existing_rows = list(reader)
    clean_headers = [h.replace('\ufeff', '') for h in reader.fieldnames]

existing_ids = set()
for r in existing_rows:
    rid = r.get('ID') or r.get('\ufeffID', '')
    if rid:
        existing_ids.add(rid.strip())

# Rows to add
append_rows = []

def add_new_row(rid, table, col, tags, vcontrol, title, desc, used_for, enum_val, title_hi, title_raj):
    if rid in existing_ids:
        print(f"[SKIP] ID '{rid}' already exists in production!")
        return
    append_rows.append({
        "ID": rid,
        "Table": table,
        "Column": col,
        "Tags": tags,
        "ValueControl": vcontrol,
        "Title": title,
        "Description": desc,
        "UsedFor": used_for,
        "Decimal": "",
        "EnumValue": enum_val,
        "EnumList": "",
        "VariableList": "",
        "DateValue": "",
        "Photo": "",
        "URL": "",
        "File": "",
        "Title_hi": title_hi,
        "Title_raj": title_raj,
        "ActionIcon": "",
        "LastEditBy": "Antigravity",
        "LastEditOn": "09/26/2026 12:30:00"
    })

# 1. Main Lines (Parent Variables) for Percentage Questions
add_new_row(
    "MAIN_PCT_SCALE_Q7", "Survey", "MaterialSourcingPct", "PercentageScale, MainScale, SectionC", "Enum",
    "Percentage Scale (0%, 25%, 50%, 75%, 100%)",
    "Main line / scale definition powering Q7 Material Sourcing percentage options",
    "Scale Definition",
    "0% , 25% , 50% , 75% , 100%",
    "प्रतिशत पैमाना (0%, 25%, 50%, 75%, 100%)",
    "प्रतिशत पैमानो (0%, 25%, 50%, 75%, 100%)"
)

add_new_row(
    "MAIN_PCT_SCALE_Q10", "Survey", "SalesChannelsPct", "PercentageScale, MainScale, SectionC", "Enum",
    "Percentage Scale (0%, upto 15%, upto 30%, upto 45%, upto 60%, upto 75%, upto 90%, 100%)",
    "Main line / scale definition powering Q10 Sales Channels percentage options",
    "Scale Definition",
    "0% , upto 15% , upto 30% , upto 45% , upto 60% , upto 75% , upto 90% , 100%",
    "प्रतिशत पैमाना (0%, 15% तक, 30% तक, 45% तक, 60% तक, 75% तक, 90% तक, 100%)",
    "प्रतिशत पैमानो (0%, 15% तांई, 30% तांई, 45% तांई, 60% तांई, 75% तांई, 90% तांई, 100%)"
)

# 2. Missing Question Prompts
add_new_row(
    "Q_B_06_MAIN", "Survey", "FamilyMemberCount", "QuestionPrompt, SectionB, Header", "Text",
    "Q6. Give details of the family members? (count)",
    "Give details of the family members? (count)",
    "Question Label",
    "Q6. Give details of the family members? (count)",
    "प्र.6 परिवार के सदस्यों का विवरण दें? (संख्या)",
    "प्र.6 परिवार रा सदस्यां रो ब्योरो देवो? (गिनती)"
)

add_new_row(
    "Q_C_07_MAIN", "Survey", "MaterialSourcingPct", "QuestionPrompt, SectionC, Header", "Text",
    "Q7. What percentage of material do you source from these places?",
    "What percentage of material do you source from these places?",
    "Question Label",
    "Q7. What percentage of material do you source from these places?",
    "प्र.7 आप इन स्थानों से कितने प्रतिशत सामग्री खरीदते हैं?",
    "प्र.7 थे इण जगां सूं कित्ता टका माल खरीदो हो?"
)

add_new_row(
    "Q_C_10_MAIN", "Survey", "SalesChannelsPct", "QuestionPrompt, SectionC, Header", "Text",
    "Q10. What percentage of your products/services get sold through following channels?",
    "What percentage of your products/services get sold through following channels?",
    "Question Label",
    "Q10. What percentage of your products/services get sold through following channels?",
    "प्र.10 आपके कितने प्रतिशत उत्पाद/सेवाएं निम्नलिखित माध्यमों से बिकते हैं?",
    "प्र.10 थारो कित्तो माल इण जरियां सूं बिकै है?"
)

add_new_row(
    "Q_E_05_MAIN", "Survey", "Competitors_Count", "QuestionPrompt, SectionE, Header", "Text",
    "Q5. How many people in your village are in the same business as yours?",
    "How many people in your village are in the same business as yours?",
    "Question Label",
    "Q5. How many people in your village are in the same business as yours?",
    "प्र.5 आपके गांव में कितने लोग आपके जैसा ही व्यवसाय कर रहे हैं?",
    "प्र.5 थारे गांव में कित्ता जणा थारे जिसो ही धंधो कर रह्या है?"
)

add_new_row(
    "Q_G_05_MAIN", "Survey", "MonthlyIncomeBeforeLoan", "QuestionPrompt, SectionG, Header", "Text",
    "Q5. After the changes you made with the loan from SHG (SVEP/OSF),  did you see any increase in monthly income ?",
    "After the changes you made with the loan from SHG (SVEP/OSF), did you see any increase in monthly income ?",
    "Question Label",
    "Q5. After the changes you made with the loan from SHG (SVEP/OSF),  did you see any increase in monthly income ?",
    "प्र.5 SHG (SVEP/OSF) से मिले ऋण से किए गए बदलावों के बाद, क्या आपकी मासिक आय में कोई वृद्धि हुई?",
    "प्र.5 समूह (SVEP/OSF) रा लोन सूं कियोड़ा बदलाव पछै, कांई थारी महीनवारी कमाई बधी?"
)

# 3. Full-Sentence Options for ReasonsStartingBusiness
reasons_verbatim = [
    ("RSN_FULL_01", "My family faced a financial setback, and I needed to earn", "मेरे परिवार को वित्तीय संकट का सामना करना पड़ा, और मुझे कमाने की आवश्यकता थी", "म्हारे परिवार माथे आर्थिक संकट आयो, अर मने कमावण री जरूरत पड़ी"),
    ("RSN_FULL_02", "Our expenses were rising, and my family needed an alternate source of income", "हमारे खर्च बढ़ रहे थे, और मेरे परिवार को आय के एक वैकल्पिक स्रोत की आवश्यकता थी", "म्हारा खर्चा बढ़ रह्या हा, अर म्हारे परिवार ने कमाई रा दूजे जरिये री जरूरत ही"),
    ("RSN_FULL_03", "I always wanted to own/run my own business", "मैं हमेशा से अपना खुद का व्यवसाय शुरू/संचालित करना चाहती थी", "म्हारी हमेशा सूं खुद रो धंधो करण री इच्छा ही"),
    ("RSN_FULL_04", "I learnt the skill and wanted to start my own venture.", "मैंने हुनर सीखा और अपना खुद का व्यवसाय शुरू करना चाहती थी।", "मैं हुनर सीख्यो अर खुद रो काम शुरू करणो चावती ही।"),
    ("RSN_FULL_05", "I was doing the same work as wage labour and later decided to start own venture", "मैं वही काम मजदूरी के रूप में कर रही थी और बाद में अपना उद्यम शुरू करने का फैसला किया", "मैं ओ ही काम मजूरी में करती ही अर पछै खुद रो काम शुरू कर दियो"),
    ("RSN_FULL_06", "All SHG members were getting loans for enterprise so I also decided to take and start enterprise", "सभी एसएचजी सदस्यों को उद्यम के लिए ऋण मिल रहा था इसलिए मैंने भी ऋण लेने और उद्यम शुरू करने का निर्णय लिया", "सगळी समूह री बायां ने लोन मिल रह्यो हो तो मैं भी लोन लेर धंधो शुरू कियो"),
    ("RSN_FULL_07", "The OSF/SVEP CRP encouraged me to start the enterprise", "OSF/SVEP CRP ने मुझे उद्यम शुरू करने के लिए प्रोत्साहित किया", "OSF/SVEP CRP मने उद्यम शुरू करण खातर हिंमत बंधाई"),
    ("RSN_FULL_08", "The CLF encouraged me to start the enterprise", "CLF ने मुझे उद्यम शुरू करने के लिए प्रोत्साहित किया", "CLF मने उद्यम शुरू करण खातर कह्यो"),
    ("RSN_FULL_09", "Any other (Specify)", "अन्य कोई (विवरण दें)", "दूजो कोई (बतावो)")
]

for rid, title, hi, raj in reasons_verbatim:
    add_new_row(rid, "Survey", "ReasonsStartingBusiness", "SectionC_Option, SubOption", "EnumList", title, title, "Dropdown Option", title, hi, raj)

# Also ensure RSN_OTHER is present under ReasonStarting
add_new_row("RSN_OTHER", "Survey", "ReasonStarting", "SectionC_Option, SubOption", "EnumList", "Any other (Specify)", "Any other (Specify)", "Dropdown Option", "Any other (Specify)", "अन्य कोई (विवरण दें)", "दूजो कोई (बतावो)")

print(f"\nTotal new rows to APPEND: {len(append_rows)}")
for r in append_rows:
    print(f"  + [{r['ID']}] {r['Column']}: '{r['Title'][:50]}'")

# Output the append files
tsv_append_path = "projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_ONLY_MISSING_APPEND.tsv"
with open(tsv_append_path, "w", encoding="utf-8") as f:
    for r in append_rows:
        row_str = "\t".join([str(r.get(h, "")).replace("\t", " ").replace("\n", " ") for h in clean_headers])
        f.write(row_str + "\n")
print(f"[OK] Wrote TSV Append File: {tsv_append_path}")

# Output Google Apps Script for SAFE APPEND
gs_append_code = f"""function appendOnlyMissingAppVariables() {{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) {{
    SpreadsheetApp.getUi().alert("ERROR: AppVariables tab not found!");
    return;
  }}
  
  // Read existing IDs to guarantee ZERO duplicates and ZERO overwrite
  var lastRow = sheet.getLastRow();
  var existingIds = [];
  if (lastRow > 1) {{
    var idRange = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < idRange.length; i++) {{
      if (idRange[i][0]) existingIds.push(String(idRange[i][0]).trim());
    }}
  }}
  
  var candidateRows = {json.dumps([[r.get(h, "") for h in clean_headers] for r in append_rows], ensure_ascii=False, indent=2)};
  
  var rowsToAppend = [];
  for (var j = 0; j < candidateRows.length; j++) {{
    var rowId = String(candidateRows[j][0]).trim();
    if (existingIds.indexOf(rowId) === -1) {{
      rowsToAppend.push(candidateRows[j]);
    }}
  }}
  
  if (rowsToAppend.length === 0) {{
    SpreadsheetApp.getUi().alert("All missing rows are already present in AppVariables! Nothing to append.");
    return;
  }}
  
  // APPEND AT BOTTOM WITHOUT CLEARING OR TOUCHING ANY EXISTING ROW
  sheet.getRange(lastRow + 1, 1, rowsToAppend.length, rowsToAppend[0].length).setValues(rowsToAppend);
  SpreadsheetApp.getUi().alert("SUCCESS: Safely appended " + rowsToAppend.length + " missing rows to AppVariables without touching existing data!");
}}
"""

gs_append_path = "projects/CmF_SHG_Women_Entrepreneurs/scripts/APPEND_ONLY_MISSING_APPVARIABLES.gs"
with open(gs_append_path, "w", encoding="utf-8") as f:
    f.write(gs_append_code)
print(f"[OK] Wrote Safe Apps Script Append: {gs_append_path}")
