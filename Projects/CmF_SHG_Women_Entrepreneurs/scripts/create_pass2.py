import json

mapping = {}
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    import csv
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('Column') and r.get('QuestionID'):
            mapping[r.get('Column').strip()] = r.get('QuestionID').strip()

json_mapping = json.dumps(mapping)

pass2_code = f"""(async function runPass2Injector() {{
    console.clear();
    console.log("%c🚀 [OmmNoMi] Pass 2: Injecting Remaining Sections (Challenges, Support, Digital, Baran)...", "color:#4285f4;font-size:16px;font-weight:bold;");

    const grid = document.querySelector('.ReactVirtualized__Grid');
    if (!grid) {{ console.error("Grid not found!"); return; }}

    const M = {json_mapping};

    function setV(input, val) {{
        input.focus();
        const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (s) s.call(input, val); else input.value = val;
        input.dispatchEvent(new Event('input', {{ bubbles: true }}));
        input.dispatchEvent(new Event('change', {{ bubbles: true }}));
        input.dispatchEvent(new Event('blur', {{ bubbles: true }}));
    }}

    let newlyDone = 0;
    const seen = new Set();

    function scan() {{
        document.querySelectorAll('.ReactVirtualized__Table__row').forEach(r => {{
            const nameEl = r.querySelector('.NameColumnControl input') || r.children[0]?.querySelector('input');
            const name = (nameEl?.value || "").trim();
            if (name && M[name] && !seen.has(name)) {{
                const dispCell = r.querySelector('[aria-colindex="10"]') || r.children[9];
                const inp = dispCell?.querySelector('input');
                if (inp && (!inp.value || !inp.value.includes('LOOKUP'))) {{
                    const f = '=LOOKUP("' + M[name] + '", "AppVariables", "ID", "Label")';
                    setV(inp, f);
                    newlyDone++;
                    console.log(`%c[+${{newlyDone}}] ${{name}} -> ${{f}}`, "color:#34a853;");
                }}
                seen.add(name);
            }}
        }});
    }}

    const totalHeight = grid.scrollHeight || 14000;
    console.log(`%cContinuing smooth scan down to ${{totalHeight}}px...`, "color:#1a73e8;");

    while (grid.scrollTop + grid.clientHeight < totalHeight - 10) {{
        grid.scrollTop += 220;
        await new Promise(r => setTimeout(r, 160));
        scan();
    }}
    scan();

    console.log(`%c🎉 PASS 2 COMPLETED! Injected ${{newlyDone}} more columns!`, "color:#34a853;font-size:18px;font-weight:bold;");
    console.log("%c👉 CLICK 'SAVE' (TOP-RIGHT) IN APPSHEET NOW!", "color:#ea4335;font-size:18px;font-weight:bold;");
}})();"""

with open('scripts/pass2_autofill.js', 'w', encoding='utf-8') as f:
    f.write(pass2_code)

print("Saved scripts/pass2_autofill.js!")
