#!/usr/bin/env python3
"""
Build script to generate individual logo project pages from image folders.
"""

import os
from pathlib import Path

# Define logo projects
LOGO_PROJECTS = [
    {'name': 'ARUS', 'folder': 'ARUS', 'slug': 'arus'},
    {'name': "Artem's Gym", 'folder': 'Artems Gym', 'slug': 'artems-gym'},
    {'name': 'AssetLab', 'folder': 'AssetLab', 'slug': 'assetlab'},
    {'name': 'Crowd0', 'folder': 'Crowd0', 'slug': 'crowd0'},
    {'name': 'Farrago', 'folder': 'Farrago', 'slug': 'farrago'},
    {'name': 'NextDistrict', 'folder': 'NextDistrict', 'slug': 'nextdistrict'},
    {'name': 'Olive & Co', 'folder': 'Olive & Co', 'slug': 'olive-and-co'},
    {'name': 'OnlyOne', 'folder': 'OnlyOne', 'slug': 'onlyone'},
    {'name': 'Rachael Perry', 'folder': 'Rachael Perry', 'slug': 'rachael-perry'},
    {'name': 'SLINK', 'folder': 'SLINK', 'slug': 'slink'},
    {'name': 'VineMe', 'folder': 'VineMe', 'slug': 'vineme'}
]

def get_project_images(folder_path):
    """Get all image files in a folder, including hero images."""
    images = []
    if not folder_path.exists():
        return images

    for file in sorted(folder_path.iterdir()):
        if file.is_file() and file.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif']:
            images.append(file.name)

    return images

def create_logo_page(project, images):
    """Generate HTML for an individual logo project page."""

    # Create JavaScript array of image filenames
    images_js = str(images).replace("'", '"')

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{project['name']} - Logo design by Hal Wall / wallcache">
    <title>{project['name']} Logo Design | wallcache</title>

    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicons/apple-touch-icon.png">

    <!-- Adobe Fonts -->
    <link rel="stylesheet" href="https://use.typekit.net/ffk6gen.css">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <!-- Header / Navigation -->
    <header>
        <nav>
            <a href="index.html" class="logo">
                <img src="assets/images/logos/2wallcache monoAsset 1@4x - Copy copy.png" alt="wallcache Logo">
            </a>

            <ul class="nav-links">
                <li><a href="cv.html">cv.</a></li>
                <li class="dropdown">
                    <a href="projects.html">projects. ▾</a>
                    <div class="dropdown-content">
                        <a href="renovision.html">renovision.</a>
                        <a href="long-form-press.html">long form press.</a>
                        <a href="writing/blog.html">blog.</a>
                        <a href="writing/book-reviews.html">book reviews.</a>
                        <a href="writing/reading-list.html">reading.</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="wallcache.html">wallcache. ▾</a>
                    <div class="dropdown-content">
                        <a href="wallcache-logos.html">logos.</a>
                        <a href="wallcache-animations.html">animations.</a>
                        <a href="wallcache.html">photography.</a>
                    </div>
                </li>
            </ul>

            <button class="mobile-menu-toggle" aria-label="Toggle menu">☰</button>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" style="min-height: 70vh;">
        <div class="hero-content">
            <h1 class="tilt-heavy">{project['name']}</h1>
            <p class="handwriting" style="font-size: 1.5rem;">Logo Design & Brand Identity</p>
        </div>
    </section>

    <!-- Back Link -->
    <section>
        <div class="container">
            <a href="wallcache-logos.html" style="display: inline-block; margin-bottom: 2rem; color: var(--burnt-orange); text-decoration: none; font-size: 1rem;">
                ← Back to All Logos
            </a>
        </div>
    </section>

    <!-- Logo Gallery -->
    <section class="blueprint-grid">
        <div class="container">
            <div class="masonry-grid" id="logo-gallery">
                <!-- Logos will be loaded here by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Hal Wall</h3>
                    <p>Data Engineer, photographer, and writer based in Barnes, London.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="GitHub">gh</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3>Navigation</h3>
                    <ul>
                        <li><a href="cv.html">CV</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="writing/index.html">Writing</a></li>
                        <li><a href="wallcache.html">wallcache</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Projects</h3>
                    <ul>
                        <li><a href="projects.html#long-form-press">Long Form Press</a></li>
                        <li><a href="wallcache.html">wallcache Photography</a></li>
                        <li><a href="projects.html">Data Engineering Work</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Writing</h3>
                    <ul>
                        <li><a href="writing/blog.html">Blog</a></li>
                        <li><a href="writing/book-reviews.html">Book Reviews</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 Hal Wall. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="assets/js/main.js"></script>
    <script>
        // Load logo images for {project['name']}
        document.addEventListener('DOMContentLoaded', function() {{
            const gallery = document.getElementById('logo-gallery');
            const projectFolder = '{project['folder']}';
            const images = {images_js};

            images.forEach(function(filename) {{
                const imgPath = `assets/images/projects/Logo Design/${{projectFolder}}/${{filename}}`;

                const imgElement = document.createElement('img');
                imgElement.src = imgPath;
                imgElement.alt = '{project['name']} Logo Design';
                imgElement.className = 'masonry-item';
                imgElement.loading = 'lazy';

                gallery.appendChild(imgElement);
            }});

            // Re-initialize lightbox and scroll animations
            if (typeof initLightbox === 'function') {{
                setTimeout(initLightbox, 100);
            }}
            if (typeof initScrollAnimations === 'function') {{
                setTimeout(initScrollAnimations, 100);
            }}
        }});
    </script>
</body>
</html>'''

def main():
    print('Generating logo project pages...\n')

    base_path = Path('assets/images/projects/Logo Design')

    for project in LOGO_PROJECTS:
        # Get all image files for this project
        project_path = base_path / project['folder']
        images = get_project_images(project_path)

        if not images:
            print(f"⚠ Warning: No images found for {project['name']}")
            continue

        filename = f"logo-{project['slug']}.html"
        filepath = Path(filename)

        html_content = create_logo_page(project, images)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)

        print(f"✓ Created {filename} ({len(images)} images)")

    print(f'\n✓ Generated {len(LOGO_PROJECTS)} logo project pages')

if __name__ == '__main__':
    main()
