# -*- coding: utf-8 -*-
import os

target = r'projects\CmF_SHG_Women_Entrepreneurs\scripts\generate_definitive_master_solution.py'
with open(target, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update option rows so EnumValue = full_opt_id (the ID itself!)
code = code.replace("'EnumValue': opt_val,", "'EnumValue': full_opt_id,")

# 2. Update question row VariableList and EnumList to use option IDs
old_opt_block = """    # Options list for VariableList
    opts = q.get('options', [])
    opt_labels = [o[1] for o in opts]
    var_list = ' , '.join(opt_labels) if opt_labels else ''
    
    # Add Question Definition row
    add_var({
        'ID': qid,
        'Table': 'Survey',
        'Column': std_col,
        'Tags': f'QuestionPrompt, {sec}',
        'ValueControl': qtype,
        'Title': title,
        'Description': f'{sec} - {title}',
        'UsedFor': 'Question Label',
        'Decimal': '', 'EnumValue': '', 'EnumList': '', 'VariableList': var_list,"""

new_opt_block = """    # Options list for VariableList and EnumList using IDs for Ref navigation
    opts = q.get('options', [])
    opt_ids = []
    for o in opts:
        oid = o[0]
        if oid in ['OPT_YES', 'OPT_NO', 'EXP_OTHER', 'RSN_OTHER', 'MKT_OTHER', 'SEL_OTHER']:
            oid = f'{oid}_{qid}'
        opt_ids.append(oid)
    var_list = ' , '.join(opt_ids) if opt_ids else ''
    
    # Add Question Definition row
    add_var({
        'ID': qid,
        'Table': 'Survey',
        'Column': std_col,
        'Tags': f'QuestionPrompt, {sec}',
        'ValueControl': qtype,
        'Title': title,
        'Description': f'{sec} - {title}',
        'UsedFor': 'Question Label',
        'Decimal': '', 'EnumValue': qid, 'EnumList': var_list, 'VariableList': var_list,"""

code = code.replace(old_opt_block, new_opt_block)

# 3. Update percentage scales
code = code.replace(
    "'EnumValue': '0% , 25% , 50% , 75% , 100%',\n    'EnumList': '', 'VariableList': '0% , 25% , 50% , 75% , 100%',",
    "'EnumValue': 'MAIN_PCT_SCALE_5',\n    'EnumList': 'PCT_0 , PCT_25 , PCT_50 , PCT_75 , PCT_100',\n    'VariableList': 'PCT_0 , PCT_25 , PCT_50 , PCT_75 , PCT_100',"
)

code = code.replace(
    "'EnumValue': '0% , upto 15% , upto 30% , upto 45% , upto 60% , upto 75% , upto 90% , 100%',\n    'EnumList': '', 'VariableList': '0% , upto 15% , upto 30% , upto 45% , upto 60% , upto 75% , upto 90% , 100%',",
    "'EnumValue': 'MAIN_PCT_SCALE_SALES',\n    'EnumList': 'PCT15_0 , PCT15_15 , PCT15_30 , PCT15_45 , PCT15_60 , PCT15_75 , PCT15_90 , PCT15_100',\n    'VariableList': 'PCT15_0 , PCT15_15 , PCT15_30 , PCT15_45 , PCT15_60 , PCT15_75 , PCT15_90 , PCT15_100',"
)

# Update individual step EnumValues to be their ID
code = code.replace(
    "'Decimal': '', 'EnumValue': val, 'EnumList': '', 'VariableList': '',\n        'DateValue': '', 'Photo': '', 'URL': '', 'File': '',\n        'Title_hi': hi,",
    "'Decimal': '', 'EnumValue': pid, 'EnumList': '', 'VariableList': '',\n        'DateValue': '', 'Photo': '', 'URL': '', 'File': '',\n        'Title_hi': hi,"
)

with open(target, 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated generate_definitive_master_solution.py with ID references!')
