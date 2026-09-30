import json

mapping = {}
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    import csv
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('Column') and r.get('QuestionID'):
            mapping[r.get('Column').strip()] = r.get('QuestionID').strip()

json_mapping = json.dumps(mapping)

audit_code = f"""(async function verifyAndFillAll() {{
    console.clear();
    console.log("%c🔍 [OmmNoMi] Scanning all 227 columns from Top to Bottom...", "color:#4285f4;font-size:16px;font-weight:bold;");
    const grid = document.querySelector('.ReactVirtualized__Grid');
    if (!grid) {{ console.error("Grid not found"); return; }}
    
    // 1. Scroll back to top
    grid.scrollTop = 0;
    await new Promise(r => setTimeout(r, 500));

    const M = {json_mapping};
    let filled = 0, newlyFilled = 0;
    const seen = new Set();

    function scan() {{
        document.querySelectorAll('.ReactVirtualized__Table__row').forEach(r => {{
            const nameEl = r.querySelector('.NameColumnControl input') || r.children[0]?.querySelector('input');
            const name = (nameEl?.value || "").trim();
            if (name && M[name] && !seen.has(name)) {{
                seen.add(name);
                const dispCell = r.querySelector('[aria-colindex="10"]') || r.children[9];
                const inp = dispCell?.querySelector('input');
                if (inp) {{
                    if (inp.value && inp.value.includes('LOOKUP')) {{
                        filled++;
                    }} else {{
                        const f = '=LOOKUP("' + M[name] + '", "AppVariables", "ID", "Label")';
                        inp.focus();
                        const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                        if (s) s.call(inp, f); else inp.value = f;
                        inp.dispatchEvent(new Event('input', {{ bubbles: true }}));
                        inp.dispatchEvent(new Event('change', {{ bubbles: true }}));
                        inp.dispatchEvent(new Event('blur', {{ bubbles: true }}));
                        newlyFilled++;
                        filled++;
                        console.log(`%c[+${{newlyFilled}}] Injected: ${{name}} -> ${{f}}`, "color:#34a853;");
                    }}
                }}
            }}
        }});
    }}

    scan();
    const totalHeight = grid.scrollHeight || 14000;
    while (grid.scrollTop + grid.clientHeight < totalHeight - 10) {{
        grid.scrollTop += 320;
        await new Promise(r => setTimeout(r, 140));
        scan();
    }}
    scan();

    console.log(`%c======================================================`, "color:#1a73e8;font-weight:bold;");
    console.log(`%c📊 OmmNoMi AUDIT REPORT:`, "color:#1a73e8;font-size:16px;font-weight:bold;");
    console.log(`%cTotal Survey Columns Checked: ${{seen.size}}`, "color:#202124;font-size:14px;font-weight:bold;");
    console.log(`%cTotal Columns with Display Name: ${{filled}} / 227`, "color:#34a853;font-size:16px;font-weight:bold;");
    if (newlyFilled > 0) {{
        console.log(`%c👉 Newly Injected: ${{newlyFilled}}! CLICK 'SAVE' (TOP-RIGHT) IN APPSHEET!`, "color:#ea4335;font-size:16px;font-weight:bold;");
    }} else {{
        console.log(`%c🎉 100% COMPLETE! ALL COLUMNS HAVE DISPLAY NAMES!`, "color:#34a853;font-size:16px;font-weight:bold;");
    }}
    console.log(`%c======================================================`, "color:#1a73e8;font-weight:bold;");
}})();"""

with open('scripts/audit_and_fill_all.js', 'w', encoding='utf-8') as f:
    f.write(audit_code)

print("Saved scripts/audit_and_fill_all.js!")
