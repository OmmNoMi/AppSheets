import re

with open('scratch/plan_clean.html', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('<div class="sheet">')
print(f"Total pages: {len(pages)-1}")

for i, page in enumerate(pages[1:], 1):
    clean = re.sub(r'<[^>]+>', ' ', page)
    clean = ' '.join(clean.split())
    print(f"\n==================== PAGE {i} ====================")
    print(clean[:1500])
