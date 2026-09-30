import re
import html

with open(r'projects/Orbit/timesheet_module_implementation_plan.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Strip base64 images so text is readable
content_clean = re.sub(r'data:image/[^;]+;base64,[a-zA-Z0-9+/=]+', '[IMAGE]', content)

with open(r'scratch/plan_clean.html', 'w', encoding='utf-8') as f:
    f.write(content_clean)

# Extract sections
print("Clean HTML written to scratch/plan_clean.html")
matches = re.findall(r'<div class="[^"]*(?:sh|hero-title|summary-title|protocol-header|running-title)[^"]*">(.*?)</div>', content_clean, re.DOTALL)
for m in matches:
    clean_m = re.sub(r'<[^>]+>', '', m).strip()
    print("-", clean_m)
