#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

# Base directory
base_dir = Path("/Users/henrywall/Desktop/wallcache_website/assets/content/Wallcache Website Content")

# Mapping of old names to new names (for HTML updates later)
rename_map = {}

def rename_folder_images(folder_path, prefix, start_num=1):
    """Rename all images in a folder with a consistent naming scheme"""
    folder = base_dir / folder_path
    if not folder.exists():
        print(f"Folder not found: {folder}")
        return

    # Get all image files
    images = []
    for ext in ['*.jpg', '*.JPG', '*.jpeg', '*.JPEG', '*.png', '*.PNG']:
        images.extend(folder.glob(ext))

    # Sort by modification time to preserve order
    images = sorted(images, key=lambda x: x.stat().st_mtime, reverse=True)

    print(f"\nRenaming {len(images)} images in {folder_path}...")
    counter = start_num

    for img in images:
        ext = img.suffix.lower()
        new_name = f"{prefix}-{counter:03d}{ext}"
        new_path = img.parent / new_name

        # Store mapping (relative path for HTML updates)
        old_relative = str(img.relative_to(Path("/Users/henrywall/Desktop/wallcache_website")))
        new_relative = str(new_path.relative_to(Path("/Users/henrywall/Desktop/wallcache_website")))
        rename_map[old_relative] = new_relative

        # Rename file
        if not new_path.exists():
            shutil.move(str(img), str(new_path))
            print(f"  {img.name} → {new_name}")
        else:
            print(f"  SKIP: {new_name} already exists")

        counter += 1

# Rename all folders systematically
print("="*60)
print("SYSTEMATIC IMAGE RENAMING")
print("="*60)

# Main portfolio
rename_folder_images("1 - PORTFOLIO", "portfolio")

# Logo projects
rename_folder_images("Asset Lab", "assetlab")
rename_folder_images("Crowd0", "crowd0")
rename_folder_images("Eugi Park", "eugipark")
rename_folder_images("NextDistrict", "nextdistrict")
rename_folder_images("OnlyOne", "onlyone")
rename_folder_images("Thoulstone Park", "thoulstone")
rename_folder_images("VineMe", "vineme")

# Other projects
rename_folder_images("ARUS", "arus")
rename_folder_images("Artem's Gym", "artemsgym")
rename_folder_images("Farrago", "farrago")
rename_folder_images("Olive & Co.", "oliveandco")
rename_folder_images("Rachel Perry", "rachelperry")
rename_folder_images("SLINK", "slink")

# Save mapping to file for HTML updates
mapping_file = Path("/Users/henrywall/Desktop/wallcache_website/image_rename_mapping.txt")
with open(mapping_file, 'w') as f:
    for old, new in sorted(rename_map.items()):
        f.write(f"{old}|{new}\n")

print(f"\n{len(rename_map)} files renamed")
print(f"Mapping saved to: {mapping_file}")
print("\nDone!")
