#!/usr/bin/env python3
import re
from pathlib import Path
from collections import defaultdict

base_dir = Path("/Users/henrywall/Desktop/wallcache_website")
content_base = base_dir / "assets/content/Wallcache Website Content"

# Build mapping for each folder: old filename (in HTML order) → new filename (numerical order)
folder_mappings = {}

# Get renamed files for each folder (sorted by name for 001, 002, 003 order)
for folder in content_base.iterdir():
    if folder.is_dir() and folder.name not in [".DS_Store", "LowDef"]:
        files = sorted([f.name for f in folder.glob("*") if f.suffix.lower() in ['.jpg', '.jpeg', '.png'] and f.is_file()])
        folder_mappings[folder.name] = files

# Find all HTML files and their image references
html_files = list(base_dir.glob("*.html")) + list(base_dir.glob("writing/*.html"))

# Build old→new mapping based on order in each HTML file
old_to_new_map = {}

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all image references with folder and filename
    pattern = r'assets/content/Wallcache Website Content/([^/]+)/([^"\']+\.(?:jpg|jpeg|png|JPG|JPEG|PNG))'
    matches = re.findall(pattern, content)

    # Group by folder to track order
    folder_old_files = defaultdict(list)
    for folder, old_filename in matches:
        # Skip if already in new format
        if not re.match(r'^[a-z]+-\d{3}\.(jpg|jpeg|png)$', old_filename.lower()):
            full_old_path = f"assets/content/Wallcache Website Content/{folder}/{old_filename}"
            if full_old_path not in folder_old_files[folder]:
                folder_old_files[folder].append(full_old_path)

    # Map old files to new files based on position
    for folder, old_paths in folder_old_files.items():
        if folder in folder_mappings:
            new_files = folder_mappings[folder]
            for idx, old_path in enumerate(old_paths):
                if idx < len(new_files) and old_path not in old_to_new_map:
                    new_filename = new_files[idx]
                    old_to_new_map[old_path] = f"assets/content/Wallcache Website Content/{folder}/{new_filename}"

print(f"Created mapping for {len(old_to_new_map)} image references")
print("\nSample mappings:")
for i, (old, new) in enumerate(list(old_to_new_map.items())[:5]):
    print(f"  {old}")
    print(f"    → {new}")

# Now update all HTML files
total_replacements = 0

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    replacements_in_file = 0

    # Replace old paths with new paths
    for old_path, new_path in old_to_new_map.items():
        if old_path in content:
            content = content.replace(old_path, new_path)
            count = original_content.count(old_path)
            if count > 0:
                replacements_in_file += count
                print(f"  {html_file.name}: {Path(old_path).name} → {Path(new_path).name} ({count} times)")

    # Write back if changes were made
    if content != original_content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        total_replacements += replacements_in_file

print(f"\nDone! Made {total_replacements} total replacements across all HTML files")
