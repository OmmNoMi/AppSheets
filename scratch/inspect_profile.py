import re

path = r'C:\Users\hardi\.gemini\antigravity\brain\902768de-ef5a-4c8c-931d-d1e42bb1152b\.system_generated\steps\8508\content.md'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# Total contributions
contrib = re.findall(r'(\d+[\d,]*\s+contributions\s+in\s+[^\n<]+)', html)
print("Contributions text:", contrib)

# Extract calendar days
days = re.findall(r'data-date="([^"]+)"[^>]*data-level="([^"]+)"', html)
if not days:
    days = re.findall(r'data-level="([^"]+)"[^>]*data-date="([^"]+)"', html)
    days = [(d[1], d[0]) for d in days]

print(f"Total days found: {len(days)}")

sep_days = [d for d in days if d[0].startswith('2026-09')]
print(f"September days found: {len(sep_days)}")
for date, level in sep_days:
    print(f"Date: {date}, Level: {level}")
