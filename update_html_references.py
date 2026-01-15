#!/usr/bin/env python3
import re
from pathlib import Path

# Load the rename mapping
mapping_file = Path("/Users/henrywall/Desktop/wallcache_website/image_rename_mapping.txt")
rename_map = {}

print("Loading rename mappings...")
with open(mapping_file, 'r') as f:
    for line in f:
        if '|' in line:
            old, new = line.strip().split('|')
            # Extract just the filename for matching
            old_file = Path(old).name
            new_file = Path(new).name
            rename_map[old_file] = new_file

print(f"Loaded {len(rename_map)} mappings")

# Find all HTML files
html_dir = Path("/Users/henrywall/Desktop/wallcache_website")
html_files = list(html_dir.glob("*.html")) + list(html_dir.glob("writing/*.html"))

print(f"\nUpdating {len(html_files)} HTML files...")

total_replacements = 0

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    replacements_in_file = 0

    # Replace each old filename with new filename
    for old_name, new_name in rename_map.items():
        if old_name in content:
            # Use word boundaries to avoid partial matches
            content = content.replace(old_name, new_name)
            count = original_content.count(old_name)
            if count > 0:
                replacements_in_file += count
                print(f"  {html_file.name}: {old_name} → {new_name} ({count} times)")

    # Write back if changes were made
    if content != original_content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        total_replacements += replacements_in_file

print(f"\nDone! Made {total_replacements} total replacements across all HTML files")
