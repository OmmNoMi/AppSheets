import json

with open('scripts/appsheet_autofill.js', 'r', encoding='utf-8') as f:
    js_script = f.read()

# Generate the complete, updated HTML tool with the 1-Click Copy Script Button
import csv
from collections import defaultdict
import html

sections = defaultdict(list)
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        col = r.get('Column')
        qid = r.get('QuestionID')
        sec = r.get('Section')
        eng = r.get('English Prompt')
        hi = r.get('Hindi Prompt')
        if col and qid:
            sections[sec].append({
                'col': col.strip(),
                'qid': qid.strip(),
                'eng': eng.strip() if eng else '',
                'hi': hi.strip() if hi else ''
            })

# Minified injector script for 100% safe execution
mapping = {}
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('Column') and r.get('QuestionID'):
            mapping[r.get('Column').strip()] = r.get('QuestionID').strip()

json_mapping = json.dumps(mapping)

injector_code = f"""(async function() {{
    console.clear();
    console.log("%c🚀 [OmmNoMi] Auto-Injector Started...", "color:#4285f4;font-size:16px;font-weight:bold;");
    const M = {json_mapping};
    function setV(input, val) {{
        input.focus();
        const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (s) s.call(input, val); else input.value = val;
        input.dispatchEvent(new Event('input', {{ bubbles: true }}));
        input.dispatchEvent(new Event('change', {{ bubbles: true }}));
        input.dispatchEvent(new Event('blur', {{ bubbles: true }}));
    }}
    let done = 0; const seen = new Set();
    function scan() {{
        document.querySelectorAll('[role="row"]').forEach((r, i) => {{
            if (i === 0 || !r.children || r.children.length < 10) return;
            const nameEl = r.children[0].querySelector('input') || r.children[0];
            const name = (nameEl.value || nameEl.innerText || "").trim().split('\\n')[0];
            if (name && M[name] && !seen.has(name)) {{
                const f = '=LOOKUP("' + M[name] + '", "AppVariables", "ID", "Label")';
                const dCell = r.children[9];
                const inp = dCell.querySelector('input') || dCell.querySelector('[contenteditable]');
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
    const sc = document.querySelector('[role="grid"]') || document.querySelector('.table-responsive') || window;
    for (let step = 0; step < 25; step++) {{
        if (sc.scrollBy) sc.scrollBy(0, 800); else window.scrollBy(0, 800);
        await new Promise(r => setTimeout(r, 200));
        scan();
    }}
    console.log(`%c🎉 DONE! Injected ${{done}} Display Names! Click SAVE in AppSheet!`, "color:#34a853;font-size:16px;font-weight:bold;");
}})();"""

escaped_injector = html.escape(injector_code)

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>OmmNoMi AppSheet Survey Engine — Display Name Copy & Auto-Inject Tool</title>
<style>
  body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8f9fa; margin: 0; padding: 20px; color: #202124; }}
  .header {{ background: white; padding: 25px; border-radius: 8px; border: 1px solid #dadce0; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }}
  h1 {{ margin: 0 0 10px 0; font-size: 24px; color: #1a73e8; }}
  .hero-box {{ background: #e8f0fe; border: 2px solid #4285f4; border-radius: 8px; padding: 20px; margin: 15px 0; text-align: center; }}
  .btn-big {{ background: #1a73e8; color: white; border: none; padding: 14px 28px; font-size: 16px; font-weight: bold; border-radius: 6px; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 6px rgba(26,115,232,0.3); }}
  .btn-big:hover {{ background: #155724; transform: translateY(-1px); }}
  .search-box {{ width: 100%; padding: 12px; font-size: 15px; border: 1px solid #dadce0; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; }}
  .section-card {{ background: white; border-radius: 8px; border: 1px solid #dadce0; margin-bottom: 20px; overflow: hidden; }}
  .section-header {{ background: #f1f3f4; padding: 12px 20px; font-weight: bold; font-size: 16px; color: #202124; }}
  table {{ width: 100%; border-collapse: collapse; }}
  th, td {{ padding: 10px 15px; text-align: left; border-bottom: 1px solid #f1f3f4; font-size: 14px; }}
  th {{ background: #fafafa; font-weight: 600; color: #5f6368; }}
  .formula-cell {{ font-family: monospace; background: #f1f3f4; padding: 6px 10px; border-radius: 4px; display: inline-block; font-size: 13px; color: #137333; }}
  .btn-copy {{ background: #1a73e8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500; }}
  .toast {{ position: fixed; bottom: 20px; right: 20px; background: #323232; color: white; padding: 14px 28px; border-radius: 4px; display: none; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-size: 15px; font-weight: bold; }}
</style>
</head>
<body>

<div class="header">
  <h1>🚀 OmmNoMi AppSheet Survey Engine — Display Name Auto-Inject Tool</h1>
  <p>कंसोल में एरर आ रही थी क्योंकि चैट से कोड कॉपी करते समय आधा कोड छूट गया था। नीचे दिए गए बड़े नीले बटन से <b>100% पूरा कोड 1-क्लिक में कॉपी</b> करें!</p>
  
  <div class="hero-box">
    <h2 style="margin: 0 0 10px 0; color: #1967d2;">⚡ One-Click Auto-Injector Script (Zero Truncation)</h2>
    <p style="margin: 0 0 15px 0; color: #3c4043;">इस बटन पर क्लिक करते ही पूरा 227 कॉलम्स का ऑटो-इंजेक्शन कोड सीधे आपके क्लिपबोर्ड पर कॉपी हो जाएगा:</p>
    <button class="btn-big" id="copyFullBtn" onclick="copyFullScript()">📋 Copy Full Auto-Injector Script (1-Click)</button>
  </div>

  <input type="text" id="searchInput" class="search-box" placeholder="🔍 Search individual column name or question..." onkeyup="filterTable()">
</div>

<div id="sectionsContainer">
"""

for sec, items in sections.items():
    html_content += f"""
<div class="section-card">
  <div class="section-header">
    <span>📁 {html.escape(sec)} ({len(items)} Columns)</span>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width: 50px;">#</th>
        <th style="width: 200px;">Column Name</th>
        <th>Question Text (English / Hindi)</th>
        <th>Display Name Formula</th>
        <th style="width: 120px;">Action</th>
      </tr>
    </thead>
    <tbody>
"""
    for idx, item in enumerate(items, 1):
        col = html.escape(item['col'])
        qid = html.escape(item['qid'])
        eng = html.escape(item['eng'])
        hi = html.escape(item['hi'])
        formula = f'=LOOKUP("{qid}", "AppVariables", "ID", "Label")'
        html_content += f"""
      <tr class="row-item" data-search="{col.lower()} {eng.lower()} {hi.lower()}">
        <td>{idx}</td>
        <td><b><code>{col}</code></b></td>
        <td>{eng}<br><span style="color:#5f6368;font-size:12px;">{hi}</span></td>
        <td><span class="formula-cell">{html.escape(formula)}</span></td>
        <td><button class="btn-copy" onclick="copyText('{formula}', this)">Copy Formula</button></td>
      </tr>
"""
    html_content += """
    </tbody>
  </table>
</div>
"""

html_content += f"""
</div>

<div id="toast" class="toast">✓ Full Script Copied to Clipboard!</div>

<script>
const FULL_SCRIPT = {json.dumps(injector_code)};

function copyFullScript() {{
  navigator.clipboard.writeText(FULL_SCRIPT).then(() => {{
    const btn = document.getElementById("copyFullBtn");
    btn.innerText = "✓ Full Script Copied! Paste in F12 Console now!";
    btn.style.background = "#34a853";
    showToast("✓ Full Auto-Injector Script Copied! Now press Ctrl+V in Console!");
    setTimeout(() => {{
      btn.innerText = "📋 Copy Full Auto-Injector Script (1-Click)";
      btn.style.background = "#1a73e8";
    }}, 4000);
  }});
}}

function copyText(text, btn) {{
  navigator.clipboard.writeText(text).then(() => {{
    const originalText = btn.innerText;
    btn.innerText = "✓ Copied!";
    btn.style.background = "#34a853";
    showToast("Copied: " + text);
    setTimeout(() => {{
      btn.innerText = originalText;
      btn.style.background = "#1a73e8";
    }}, 1500);
  }});
}}

function showToast(msg) {{
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => {{ toast.style.display = "none"; }}, 2500);
}}

function filterTable() {{
  const q = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll(".row-item");
  rows.forEach(r => {{
    const text = r.getAttribute("data-search");
    if (text.includes(q)) {{
      r.style.display = "";
    }} else {{
      r.style.display = "none";
    }}
  }});
}}
</script>
</body>
</html>
"""

with open('Display_Name_Copy_Tool.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Display_Name_Copy_Tool.html updated with 1-click full script copy!")
