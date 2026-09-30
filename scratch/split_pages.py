import re

with open('scratch/plan_clean.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect Page 1, 2, 3, 4 fully
pages = text.split('<div class="sheet">')
for i, p in enumerate(pages[1:], 1):
    with open(f'scratch/page_{i}.html', 'w', encoding='utf-8') as pf:
        pf.write(p)
    print(f"Wrote scratch/page_{i}.html (size: {len(p)})")
