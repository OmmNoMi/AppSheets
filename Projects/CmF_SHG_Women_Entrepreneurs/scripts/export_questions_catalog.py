import os
import csv

appvars_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'
out_md = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\ALL_SURVEY_QUESTIONS.md'
out_csv = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\ALL_SURVEY_QUESTIONS.csv'

with open(appvars_path, 'r', encoding='utf-8-sig') as f:
    rows = list(csv.DictReader(f))

opt_lookup = {r['ID']: r for r in rows}

questions = [r for r in rows if r['ID'].startswith('Q_') and r['ID'] != 'Q_SECTIONS_LIST']

csv_rows = []
md_lines = [
    '# Complete Questionnaire Catalog — SHG Women Entrepreneurs Study',
    '> Extracted from: `First draft Questionnaire for the Study on Performance of SHG.docx`\n',
    '| # | Question ID | Target Section | Question Prompt (English) | Question Prompt (Hindi) | Type | Dropdown Options / Choices (English & Hindi) |',
    '|---|-------------|----------------|---------------------------|-------------------------|------|-----------------------------------------------|'
]

sec_names = {
    'SEC_B_PROFILE': 'Section B: Respondent & Household Profile',
    'SEC_C_OPERATIONS': 'Section C: Enterprise Operations & Capital',
    'SEC_D_CHALLENGES': 'Section D: Enterprise Challenges & Coping Mechanisms',
    'SEC_E_SCHEME_IMPACT': 'Section E: Impact of SVEP / OSF Schemes',
    'SEC_F_DIGITAL_MEDIA': 'Section F: Online Transactions & Social Media',
    'SEC_G_BARAN_EXIT': 'Section G: Status of Post-Exit OSF in Baran'
}

for idx, q in enumerate(questions, 1):
    q_id = q['ID']
    title_en = q['Title']
    title_hi = q['Title_hi']
    v_type = q['ValueControl']
    tags = q['Tags']
    
    sec = 'Section A: Basic Details (Survey Header)'
    for skey, sval in sec_names.items():
        if skey in tags:
            sec = sval
            break
            
    var_list = q['VariableList']
    options_en = []
    options_hi = []
    if var_list:
        opt_ids = [o.strip() for o in var_list.split(' , ') if o.strip()]
        for oid in opt_ids:
            if oid in opt_lookup:
                o_en = opt_lookup[oid]['Title']
                o_hi = opt_lookup[oid]['Title_hi']
                options_en.append(o_en)
                options_hi.append(o_hi)
            else:
                options_en.append(oid)
                options_hi.append(oid)
    
    opts_combined = '<br>'.join([f'• {en} ({hi})' for en, hi in zip(options_en, options_hi)]) if options_en else '-'
    opts_en_str = ' | '.join(options_en) if options_en else '-'
    opts_hi_str = ' | '.join(options_hi) if options_hi else '-'
    
    md_lines.append(f'| {idx} | `{q_id}` | {sec} | {title_en} | {title_hi} | **{v_type}** | {opts_combined} |')
    
    csv_rows.append({
        'Index': idx,
        'Question_ID': q_id,
        'Section': sec,
        'Question_English': title_en,
        'Question_Hindi': title_hi,
        'Input_Type': v_type,
        'Options_English': opts_en_str,
        'Options_Hindi': opts_hi_str
    })

with open(out_md, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md_lines))

with open(out_csv, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['Index', 'Question_ID', 'Section', 'Question_English', 'Question_Hindi', 'Input_Type', 'Options_English', 'Options_Hindi'])
    writer.writeheader()
    writer.writerows(csv_rows)

print(f'Exported {len(csv_rows)} questions.')
