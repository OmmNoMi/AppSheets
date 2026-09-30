import os
import pandas as pd
import openpyxl

base_dir = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs"
survey_csv_path = os.path.join(base_dir, "data", "Survey.csv")
appvars_csv_path = os.path.join(base_dir, "data", "AppVariables.csv")
excel_path = os.path.join(base_dir, "Universal_Dynamic_Survey_Engine.xlsx")

# 1. Read existing Survey.csv
df_survey = pd.read_csv(survey_csv_path)
existing_cols = list(df_survey.columns)

# Define the 7 section headers and where they should be inserted
# (header_col_name, before_col_name)
headers_to_insert = [
    ("SEC_A_HEADER", "District"),
    ("SEC_B_HEADER", "RespondentAge"),
    ("SEC_C_HEADER", "ReasonsStartingBusiness"),
    ("SEC_D_HEADER", "HusbandFamilyResponse"),
    ("SEC_E_HEADER", "AttendedTraining"),
    ("SEC_F_HEADER", "SmartphoneOwnership"),
    ("SEC_G_HEADER", "OSFInterventionYear")
]

new_cols = []
inserted_set = set()

for col in existing_cols:
    for h_name, before_col in headers_to_insert:
        if col == before_col and h_name not in inserted_set and h_name not in existing_cols:
            new_cols.append(h_name)
            inserted_set.add(h_name)
    new_cols.append(col)

# If any header not yet added (already exists or column matched), ensure consistency
df_survey_new = df_survey.reindex(columns=new_cols)

# Ensure empty strings for headers in sample rows
for h_name, _ in headers_to_insert:
    if h_name in df_survey_new.columns:
        df_survey_new[h_name] = ""

# Save updated Survey.csv
df_survey_new.to_csv(survey_csv_path, index=False)
print(f"✅ Survey.csv updated. New shape: {df_survey_new.shape} (added {len(inserted_set)} header columns)")

# 2. Update AppVariables.csv to include Header definitions
df_vars = pd.read_csv(appvars_csv_path)

new_headers_meta = [
    {"ID": "SEC_A_HEADER", "Table": "Survey", "Column": "SEC_A_HEADER", "Tags": "Header,Page_Header", "ValueControl": "Show", "Title": "Section A: Basic Details", "Title_hi": "खंड क: बुनियादी विवरण", "Title_raj": "खंड क: बुनियादी विवरण", "Label": "Section A: Basic Details / खंड क: बुनियादी विवरण"},
    {"ID": "SEC_B_HEADER", "Table": "Survey", "Column": "SEC_B_HEADER", "Tags": "Header,Page_Header", "ValueControl": "Show", "Title": "Section B: Respondent & Household Profile", "Title_hi": "खंड ख: उत्तरदाता एवं परिवार प्रोफ़ाइल", "Title_raj": "खंड ख: उत्तरदाता अर परिवार प्रोफ़ाइल", "Label": "Section B: Profile / खंड ख: परिवार प्रोफ़ाइल"},
    {"ID": "SEC_C_HEADER", "Table": "Survey", "Column": "SEC_C_HEADER", "Tags": "Header,Page_Header", "ValueControl": "Show", "Title": "Section C: Enterprise Operations", "Title_hi": "खंड ग: उद्यम संचालन एवं वित्तीय विवरण", "Title_raj": "खंड ग: उद्यम संचालन अर वित्तीय विवरण", "Label": "Section C: Operations / खंड ग: उद्यम संचालन"},
    {"ID": "SEC_D_HEADER", "Table": "Survey", "Column": "SEC_D_HEADER", "Tags": "Header,Page_Header", "ValueControl": "Show", "Title": "Section D: Ease of Doing Business & Challenges", "Title_hi": "खंड घ: व्यवसाय सुगमता एवं चुनौतियाँ", "Title_raj": "खंड घ: व्यवसाय सुगमता अर चुनौतियाँ", "Label": "Section D: Challenges / खंड घ: चुनौतियाँ"},
    {"ID": "SEC_E_HEADER", "Table": "Survey", "Column": "SEC_E_HEADER", "Tags": "Header,Page_Header", "ValueControl": "Show", "Title": "Section E: Impact of SVEP / OSF Schemes", "Title_hi": "खंड ङ: योजनाओं (SVEP/OSF) का प्रभाव", "Title_raj": "खंड ङ: योजनावां रो प्रभाव", "Label": "Section E: Schemes / खंड ङ: योजनावां रो प्रभाव"},
    {"ID": "SEC_F_HEADER", "Table": "Survey", "Column": "SEC_F_HEADER", "Tags": "Header,Page_Header", "ValueControl": "Show", "Title": "Section F: Online Transactions & Digital Media", "Title_hi": "खंड च: डिजिटल लेन-देन एवं प्रचार", "Title_raj": "खंड च: डिजिटल लेन-देन अर प्रचार", "Label": "Section F: Digital Media / खंड च: डिजिटल लेन-देन"},
    {"ID": "SEC_G_HEADER", "Table": "Survey", "Column": "SEC_G_HEADER", "Tags": "Header,Page_Header", "ValueControl": "Show", "Title": "Section G: Post-Exit OSF in Baran & Ratangarh", "Title_hi": "खंड छ: एग्जिट पश्चात स्थिति (बारां व रतनगढ़)", "Title_raj": "खंड छ: एग्जिट पछै री स्थिति (बारां अर रतनगढ़)", "Label": "Section G: Post-Exit / खंड छ: एग्जिट पश्चात स्थिति"}
]

for row in new_headers_meta:
    if row["ID"] not in df_vars["ID"].values:
        df_vars = pd.concat([df_vars, pd.DataFrame([row])], ignore_index=True)

df_vars.to_csv(appvars_csv_path, index=False)
print(f"✅ AppVariables.csv updated. Total rows: {len(df_vars)}")

# 3. Update Excel file
with pd.ExcelWriter(excel_path, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
    df_survey_new.to_excel(writer, sheet_name="Survey", index=False)
    df_vars.to_excel(writer, sheet_name="AppVariables", index=False)

print(f"✅ Excel workbook Universal_Dynamic_Survey_Engine.xlsx updated successfully!")
