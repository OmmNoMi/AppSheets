import json

mapping = {}
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    import csv
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('Column') and r.get('QuestionID'):
            mapping[r.get('Column').strip()] = r.get('QuestionID').strip()

json_mapping = json.dumps(mapping)

full_script = f"""(async function runProductionReactInjector() {{
    console.clear();
    console.log("%c🚀 [OmmNoMi] Starting Full React Auto-Injector...", "color:#4285f4;font-size:16px;font-weight:bold;");

    // 1. Locate main virtual scroll container
    const grid = Array.from(document.querySelectorAll('.ReactVirtualized__Grid')).find(g => g.scrollHeight > 1000) 
                 || document.querySelector('.ReactVirtualized__Grid');
    if (!grid) {{ alert("Table grid container not found!"); return; }}

    // 2. Reset to Top
    grid.scrollTop = 0;
    console.log("Scrolled to top. Waiting for initial rows to mount...");
    await new Promise(r => setTimeout(r, 600));

    const M = {json_mapping};
    let totalInjected = 0;
    const seen = new Set();

    function injectRow(row) {{
        const nameEl = row.querySelector('.NameColumnControl input') 
                       || row.querySelector('[aria-colindex="1"] input') 
                       || row.children[0]?.querySelector('input');
        const colName = (nameEl?.value || nameEl?.textContent || row.children[0]?.textContent || "").trim();
        
        if (colName && M[colName] && !seen.has(colName)) {{
            const formula = 'LOOKUP("' + M[colName] + '", "AppVariables", "ID", "Label")';
            const dispCell = row.querySelector('[aria-colindex="10"]') || row.children[9];
            const inp = dispCell?.querySelector('input');
            if (inp) {{
                // 1. Set Native Value
                const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                if (nativeSetter) nativeSetter.call(inp, formula); else inp.value = formula;

                // 2. React Synthetic Event with persist()
                const fakeEvent = {{
                    target: inp,
                    currentTarget: inp,
                    persist: () => {{}},
                    preventDefault: () => {{}},
                    stopPropagation: () => {{}}
                }};

                // 3. Trigger React Props Handlers
                const k = Object.keys(inp).find(key => key.startsWith('__reactProps'));
                if (k && inp[k]) {{
                    if (inp[k].onChange) inp[k].onChange(fakeEvent);
                    if (inp[k].onBlur) inp[k].onBlur(fakeEvent);
                }}

                seen.add(colName);
                totalInjected++;
                console.log(`%c[${{totalInjected}}] Injected: ${{colName}} -> ${{formula}}`, "color:#34a853;");
            }}
        }}
    }}

    // Scan initial rows at top
    document.querySelectorAll('.ReactVirtualized__Table__row').forEach(injectRow);

    const totalHeight = grid.scrollHeight || 13328;
    console.log(`%cAuto-scrolling through ${{totalHeight}}px grid...`, "color:#1a73e8;");

    while (grid.scrollTop + grid.clientHeight < totalHeight - 10) {{
        grid.scrollTop += 260;
        await new Promise(r => setTimeout(r, 140));
        document.querySelectorAll('.ReactVirtualized__Table__row').forEach(injectRow);
    }}

    // Final scan at the very bottom
    document.querySelectorAll('.ReactVirtualized__Table__row').forEach(injectRow);

    console.log(`%c======================================================`, "color:#1a73e8;font-weight:bold;");
    console.log(`%c🎉 MASSIVE SUCCESS! Injected ${{totalInjected}} Display Names via React State!`, "color:#34a853;font-size:18px;font-weight:bold;");
    console.log(`%c👉 CLICK 'SAVE' (TOP-RIGHT) IN APPSHEET NOW!`, "color:#ea4335;font-size:18px;font-weight:bold;");
    console.log(`%c======================================================`, "color:#1a73e8;font-weight:bold;");
}})();"""

with open('scripts/production_react_injector.js', 'w', encoding='utf-8') as f:
    f.write(full_script)

print("Saved scripts/production_react_injector.js!")
