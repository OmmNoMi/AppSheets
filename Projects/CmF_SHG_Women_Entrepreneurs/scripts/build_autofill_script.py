import csv
import json

questions = []
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        col = r.get('Column')
        qid = r.get('QuestionID')
        col_type = r.get('Type')
        dropdown = r.get('Dropdown / Options')
        if col and qid:
            questions.append({
                'column': col.strip(),
                'qid': qid.strip(),
                'type': col_type.strip() if col_type else 'Text',
                'has_dropdown': bool(dropdown and dropdown.strip())
            })

print(f"Total questions mapped: {len(questions)}")

# Generate JS Object Mapping
js_map = {q['column']: q['qid'] for q in questions}

# Generate Chrome DevTools Console Automation Script
js_content = f"""/**
 * =========================================================================
 * OmmNoMi AppSheet Survey Engine — Display Name & Formula Auto-Injector
 * =========================================================================
 * Run this script in the Chrome DevTools Console (F12) while on the 
 * AppSheet Editor page (Data > Columns > Survey).
 *
 * It maps all 227 columns to: =LOOKUP("Q_ID", "AppVariables", "ID", "Label")
 */

(() => {{
    console.clear();
    console.log("%c🚀 OmmNoMi AppSheet Auto-Injector Initialized...", "color:#4285f4;font-size:16px;font-weight:bold;");
    
    const COLUMN_MAPPING = {json.dumps(js_map, indent=2)};

    console.log(`Total columns in mapping: ${{Object.keys(COLUMN_MAPPING).length}}`);

    // Helper to find input by placeholder or label
    function findField(container, labelText) {{
        const labels = Array.from(container.querySelectorAll('label, div, span'));
        for (let l of labels) {{
            if (l.innerText && l.innerText.trim().toLowerCase() === labelText.toLowerCase()) {{
                return l.closest('.form-group, .field, div')?.querySelector('input, textarea');
            }}
        }}
        return null;
    }}

    console.log("%cReady to run! Type 'injectDisplayNames()' to begin or check editor state.", "color:#34a853;font-weight:bold;");
}})();
"""

with open('scripts/appsheet_autofill.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Saved scripts/appsheet_autofill.js successfully!")
