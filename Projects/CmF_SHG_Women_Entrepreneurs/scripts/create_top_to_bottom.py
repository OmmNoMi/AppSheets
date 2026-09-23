import json

mapping = {}
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    import csv
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('Column') and r.get('QuestionID'):
            mapping[r.get('Column').strip()] = r.get('QuestionID').strip()

json_mapping = json.dumps(mapping)

script_code = f"""(async function runFromTopToBottom() {{
    console.clear();
    console.log("%c🚀 [OmmNoMi] Resetting to TOP and injecting ALL remaining columns...", "color:#4285f4;font-size:16px;font-weight:bold;");

    const grid = document.querySelector('.ReactVirtualized__Grid');
    if (!grid) {{ alert("Grid not found!"); return; }}

    // 1. Force scroll to TOP
    grid.scrollTop = 0;
    console.log("Scrolled to top. Waiting 600ms for rows to mount...");
    await new Promise(r => setTimeout(r, 600));

    const M = {json_mapping};

    function setV(input, val) {{
        input.focus();
        const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (s) s.call(input, val); else input.value = val;
        input.dispatchEvent(new Event('input', {{ bubbles: true }}));
        input.dispatchEvent(new Event('change', {{ bubbles: true }}));
        input.dispatchEvent(new Event('blur', {{ bubbles: true }}));
    }}

    let newlyInjected = 0;
    let alreadyHasFormula = 0;
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
                        alreadyHasFormula++;
                    }} else {{
                        const f = '=LOOKUP("' + M[name] + '", "AppVariables", "ID", "Label")';
                        setV(inp, f);
                        newlyInjected++;
                        console.log(`%c[+${{newlyInjected}}] Injected: ${{name}} -> ${{f}}`, "color:#34a853;");
                    }}
                }}
            }}
        }});
    }}

    // Scan top rows
    scan();

    const totalHeight = grid.scrollHeight || 13328;
    console.log(`Scanning from 0px to ${{totalHeight}}px...`);

    // Smooth scroll down
    while (grid.scrollTop + grid.clientHeight < totalHeight - 10) {{
        grid.scrollTop += 280;
        await new Promise(r => setTimeout(r, 140));
        scan();
    }}
    scan();

    console.log(`%c======================================================`, "color:#1a73e8;font-weight:bold;");
    console.log(`%c🎉 SCAN COMPLETE!`, "color:#34a853;font-size:18px;font-weight:bold;");
    console.log(`%cAlready had formula: ${{alreadyHasFormula}}`, "color:#1a73e8;font-weight:bold;");
    console.log(`%cNewly Injected this run: ${{newlyInjected}}`, "color:#34a853;font-size:16px;font-weight:bold;");
    console.log(`%cTOTAL CONFIGURED: ${{alreadyHasFormula + newlyInjected}} / 227`, "color:#34a853;font-size:18px;font-weight:bold;");
    console.log(`%c👉 CLICK 'SAVE' (TOP-RIGHT) IN APPSHEET NOW!`, "color:#ea4335;font-size:18px;font-weight:bold;");
    console.log(`%c======================================================`, "color:#1a73e8;font-weight:bold;");
}})();"""

with open('scripts/run_top_to_bottom.js', 'w', encoding='utf-8') as f:
    f.write(script_code)

print("Saved scripts/run_top_to_bottom.js!")
