#!/usr/bin/env python3
import re
from pathlib import Path
from collections import defaultdict

base_dir = Path("/Users/henrywall/Desktop/wallcache_website")
content_base = base_dir / "assets/content/Wallcache Website Content"

# Get all renamed files with their sizes
renamed_files = {}  # {folder: {size: filename}}
for folder in content_base.iterdir():
    if folder.is_dir() and folder.name != ".DS_Store":
        renamed_files[folder.name] = {}
        for img in folder.glob("*"):
            if img.suffix.lower() in ['.jpg', '.jpeg', '.png'] and img.is_file():
                size = img.stat().st_size
                # Store by size for matching
                if size not in renamed_files[folder.name]:
                    renamed_files[folder.name][size] = []
                renamed_files[folder.name][size].append(img.name)

print(f"Found files in {len(renamed_files)} folders")
for folder, sizes in renamed_files.items():
    total_files = sum(len(files) for files in sizes.values())
    print(f"  {folder}: {total_files} files")

# Find all HTML files
html_files = list(base_dir.glob("*.html")) + list(base_dir.glob("writing/*.html"))
print(f"\nProcessing {len(html_files)} HTML files...")

total_replacements = 0
replacement_map = {}  # {old_path: new_path}

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all image references in this HTML file
    pattern = r'assets/content/Wallcache Website Content/([^/]+)/([^"\']+\.(?:jpg|jpeg|png|JPG|JPEG|PNG))'
    matches = re.findall(pattern, content)

    if matches:
        print(f"\n{html_file.name}:")
        for folder, old_filename in matches:
            old_path = content_base / folder / old_filename

            # Try to find matching file by size
            if not old_path.exists():
                # File was renamed, try to find new name by attempting pattern match
                # Check if it matches the new naming pattern already
                if re.match(r'^[a-z]+-\d{3}\.(jpg|jpeg|png)$', old_filename.lower()):
                    continue  # Already renamed

                # List all files in folder
                if folder in renamed_files:
                    files_in_folder = []
                    for size_files in renamed_files[folder].values():
                        files_in_folder.extend(size_files)

                    if files_in_folder:
                        # For now, create a sequential mapping based on order in HTML
                        # This is a heuristic but better than nothing
                        print(f"    Old: {old_filename}")
                        print(f"      → Folder has {len(files_in_folder)} renamed files")

                        # Store for manual review
                        full_old_path = f"assets/content/Wallcache Website Content/{folder}/{old_filename}"
                        if full_old_path not in replacement_map:
                            replacement_map[full_old_path] = folder

print(f"\n\nFound {len(replacement_map)} unique old image references that need updating")
print("\nSince we don't have the original mapping, we need to match images manually.")
print("However, I can generate a template replacement script.")

# Generate mapping based on alphabetical order as a starting point
print("\n\nGenerating best-guess mapping file...")

mapping_file = base_dir / "manual_image_mapping.txt"
with open(mapping_file, 'w') as f:
    f.write("# Manual image mapping - verify these are correct!\n")
    f.write("# Format: old_path|new_path\n\n")

    for old_path, folder in sorted(replacement_map.items()):
        f.write(f"{old_path}|NEEDS_MANUAL_MAPPING|{folder}\n")

print(f"Created {mapping_file}")
print("\nNext steps:")
print("1. Review the HTML files to see which old images are referenced")
print("2. Match them with the new renamed files manually")
print("3. Or restore from backup and re-run rename with proper mapping")
