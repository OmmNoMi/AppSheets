import json

mapping = {}
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    import csv
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('Column') and r.get('QuestionID'):
            mapping[r.get('Column').strip()] = r.get('QuestionID').strip()

json_mapping = json.dumps(mapping)

final_injector = f"""(async function runFullOmmNoMiInjector() {{
    console.clear();
    console.log("%c🚀 [OmmNoMi] Starting Full Survey Grid Auto-Injector...", "color:#4285f4;font-size:16px;font-weight:bold;");

    const grid = document.querySelector('.ReactVirtualized__Grid');
    if (!grid) {{
        console.error("ReactVirtualized Grid container not found!");
        return;
    }}

    // 1. Scroll to top first
    grid.scrollTop = 0;
    await new Promise(r => setTimeout(r, 400));

    const M = {json_mapping};

    function setV(input, val) {{
        input.focus();
        const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (s) s.call(input, val); else input.value = val;
        input.dispatchEvent(new Event('input', {{ bubbles: true }}));
        input.dispatchEvent(new Event('change', {{ bubbles: true }}));
        input.dispatchEvent(new Event('blur', {{ bubbles: true }}));
    }}

    let done = 0;
    const seen = new Set();

    function scan() {{
        document.querySelectorAll('.ReactVirtualized__Table__row').forEach(r => {{
            const nameEl = r.querySelector('.NameColumnControl input') || r.children[0]?.querySelector('input');
            const name = (nameEl?.value || "").trim();
            if (name && M[name] && !seen.has(name)) {{
                const f = '=LOOKUP("' + M[name] + '", "AppVariables", "ID", "Label")';
                const dispCell = r.querySelector('[aria-colindex="10"]') || r.children[9];
                const inp = dispCell?.querySelector('input');
                if (inp) {{
                    setV(inp, f);
                    seen.add(name);
                    done++;
                    console.log(`%c[${{done}}] ${{name}} -> ${{f}}`, "color:#34a853;");
                }}
            }}
        }});
    }}

    scan();

    const totalHeight = grid.scrollHeight || 14000;
    console.log(`%cFound grid with total height ${{totalHeight}}px. Auto-scrolling and injecting...`, "color:#1a73e8;");

    while (grid.scrollTop + grid.clientHeight < totalHeight - 20) {{
        grid.scrollTop += 450;
        await new Promise(r => setTimeout(r, 120));
        scan();
    }}

    scan(); // final pass at bottom

    console.log(`%c🎉 MASSIVE SUCCESS! Injected ${{done}} Display Names into AppSheet!`, "color:#34a853;font-size:18px;font-weight:bold;");
    console.log("%c👉 CLICK 'SAVE' (TOP-RIGHT) IN APPSHEET NOW!", "color:#ea4335;font-size:18px;font-weight:bold;");
}})();"""

with open('scripts/full_grid_autofill.js', 'w', encoding='utf-8') as f:
    f.write(final_injector)

print("Saved scripts/full_grid_autofill.js!")
