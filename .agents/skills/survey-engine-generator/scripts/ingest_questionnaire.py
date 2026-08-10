#!/usr/bin/env python3
"""
ingest_questionnaire.py — Survey Questionnaire & Schema Ingestion Engine
========================================================================
Parses raw client questionnaire Excel files or CSV definitions into OmmNoMi's
standard AppVariables CSV + Google Sheets headers schema.

Usage:
    python3 ingest_questionnaire.py <Questionnaire.xlsx> --app-name <AppName> --output-dir <OutputDir>
"""

import sys
import os
import argparse
import openpyxl
import csv
import json
from collections import defaultdict

def parse_cini_excel(xlsx_path):
    """
    Reads CInI reference Excel sheet to extract Question and Variable tables.
    """
    wb = openpyxl.load_workbook(xlsx_path, data_only=True)
    
    questions = []
    variables = []
    
    if 'Question' in wb.sheetnames:
        ws = wb['Question']
        headers = [cell for cell in next(ws.iter_rows(values_only=True)) if cell is not None]
        for row in list(ws.iter_rows(values_only=True))[1:]:
            if any(row):
                row_dict = dict(zip(headers, row))
                questions.append(row_dict)
                
    if 'Variable' in wb.sheetnames:
        ws = wb['Variable']
        headers = [cell for cell in next(ws.iter_rows(values_only=True)) if cell is not None]
        for row in list(ws.iter_rows(values_only=True))[1:]:
            if any(row):
                row_dict = dict(zip(headers, row))
                variables.append(row_dict)

    return questions, variables


def transform_to_appvariables(questions, variables):
    """
    Transforms CInI questions and variables into unified OmmNoMi AppVariables schema.
    """
    app_vars = []
    
    # 1. Convert Variables (Dropdown / Multi-select options)
    var_by_type = defaultdict(list)
    for v in variables:
        var_id = str(v.get('ID', '')).strip()
        v_type = str(v.get('Type', 'Option')).strip()
        if var_id:
            var_by_type[v_type].append(var_id)
            app_vars.append({
                'ID': f"VAR_{var_id}",
                'Type': f"Option_{v_type}",
                'Tags': f"Option,{v_type}",
                'ValueControl': 'Text',
                'Title': v.get('Name_en', var_id),
                'UsedFor': f"Selection option for {v_type}",
                'Name_en': v.get('Name_en', ''),
                'Name_hi': v.get('Name_hi', ''),
                'Name_mr': v.get('Name_mr', ''),
                'Description': v.get('Description', '')
            })

    # Add Multi Group Variables per Option Type
    for opt_type, items in var_by_type.items():
        app_vars.append({
            'ID': f"OPT_LIST_{opt_type}",
            'Type': "OptionsGroup",
            'Tags': f"Group,{opt_type}",
            'ValueControl': 'Multi',
            'Title': f"{opt_type} Options List",
            'UsedFor': f"ValidIf list for {opt_type}",
            'MultiValues': " , ".join(items)
        })

    # 2. Convert Questions (Multilingual Question Prompts)
    for q in questions:
        q_id = str(q.get('ID', '')).strip()
        if not q_id:
            continue
        
        target_table = q.get('Table', 'Survey')
        target_col = q.get('Column', '')
        q_code = q.get('Questionnaire', '')
        
        app_vars.append({
            'ID': f"Q_{q_id}",
            'Type': "Question",
            'Tags': f"Prompt,{target_table}",
            'ValueControl': 'Text',
            'Title': q.get('Question_en', ''),
            'UsedFor': f"DisplayName for {target_table}.{target_col} ({q_code})",
            'Name_en': q.get('Question_en', ''),
            'Name_hi': q.get('Question_hi', ''),
            'Name_mr': q.get('Question_mr', ''),
            'OptionVariables': q.get('OptionVariables', '')
        })

    return app_vars


def export_appvariables_csv(app_vars, output_file):
    """
    Exports transformed appvariables to CSV format.
    """
    if not app_vars:
        return
    
    headers = ['ID', 'Type', 'Tags', 'ValueControl', 'Title', 'UsedFor', 'Name_en', 'Name_hi', 'Name_mr', 'MultiValues', 'OptionVariables', 'Description']
    
    with open(output_file, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=headers, extrasaction='ignore')
        writer.writeheader()
        for row in app_vars:
            writer.writerow(row)


def main():
    parser = argparse.ArgumentParser(description="Ingest client questionnaire into AppVariables and schema templates.")
    parser.add_argument("xlsx_path", help="Path to client questionnaire Excel file")
    parser.add_argument("--output-dir", "-o", default="./output", help="Directory to save generated schemas")
    args = parser.parse_args()

    os.makedirs(args.output_dir, exist_ok=True)
    
    print(f"📄 Processing Questionnaire Excel: {args.xlsx_path}")
    questions, variables = parse_cini_excel(args.xlsx_path)
    print(f"   Found {len(questions)} Questions and {len(variables)} Variables.")
    
    app_vars = transform_to_appvariables(questions, variables)
    
    output_csv = os.path.join(args.output_dir, "Generated_AppVariables.csv")
    export_appvariables_csv(app_vars, output_csv)
    print(f"✅ Generated AppVariables CSV: {output_csv}")

if __name__ == "__main__":
    main()
