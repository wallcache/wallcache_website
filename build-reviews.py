#!/usr/bin/env python3
"""
Build script to generate individual book review pages from Markdown files.
Creates both the index page and individual review pages with sidebar navigation.
"""

import os
import re
import json
from pathlib import Path

def parse_front_matter(content):
    """Parse YAML front matter from markdown content."""
    pattern = r'^---\n(.*?)\n---\n(.*)$'
    match = re.match(pattern, content, re.DOTALL)

    if not match:
        return None, None

    front_matter = {}
    for line in match.group(1).split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            front_matter[key.strip()] = value.strip()

    return front_matter, match.group(2).strip()

def markdown_to_html(content):
    """Convert markdown to HTML."""
    html = content

    # Paragraphs
    paragraphs = []
    for para in html.split('\n\n'):
        para = para.strip()
        if para:
            # Simple markdown conversions
            para = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', para)
            para = re.sub(r'\*(.*?)\*', r'<em>\1</em>', para)
            paragraphs.append(f'<p>{para}</p>')

    return '\n'.join(paragraphs)

def generate_stars(rating):
    """Generate star HTML."""
    full_stars = int(rating)
    return '★' * full_stars + '☆' * (5 - full_stars)

def create_sidebar_nav(reviews, current_filename):
    """Create sidebar navigation HTML."""
    nav_items = []
    for review in reviews:
        is_current = review['filename'] == current_filename
        active_class = ' class="active"' if is_current else ''
        nav_items.append(
            f'<a href="{review["slug"]}.html"{active_class}>'
            f'{review["title"]}'
            f'</a>'
        )

    return '\n                '.join(nav_items)

def create_review_page(review, all_reviews):
    """Generate HTML for an individual review page."""
    sidebar_nav = create_sidebar_nav(all_reviews, review['filename'])

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Book review of {review['title']} by {review['author']}">
    <title>{review['title']} Review | Hal Wall</title>

    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="../../assets/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../../assets/images/favicons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../../assets/images/favicons/apple-touch-icon.png">

    <!-- Adobe Fonts -->
    <link rel="stylesheet" href="https://use.typekit.net/ffk6gen.css">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="../../assets/css/styles.css">

    <style>
        .review-layout {{
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 3rem;
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }}

        .review-sidebar {{
            position: sticky;
            top: 100px;
            height: fit-content;
            max-height: calc(100vh - 120px);
            overflow-y: auto;
            text-align: left;
        }}

        .review-sidebar h3 {{
            font-size: 1rem;
            margin-bottom: 1rem;
            opacity: 0.7;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }}

        .review-sidebar nav {{
            display: flex;
            flex-direction: column;
            gap: 0;
            align-items: flex-start;
        }}

        .review-sidebar a {{
            display: block;
            padding: 0.5rem 0;
            color: var(--text-dark);
            text-decoration: none;
            font-size: 0.9rem;
            border-left: 2px solid transparent;
            padding-left: 1rem;
            margin-left: -1rem;
            transition: all 0.2s ease;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            width: 100%;
        }}

        .review-sidebar a:hover {{
            color: var(--burnt-orange);
            border-left-color: var(--burnt-orange);
        }}

        .review-sidebar a.active {{
            color: var(--burnt-orange);
            border-left-color: var(--burnt-orange);
            font-weight: 600;
        }}

        .review-content {{
            max-width: 700px;
        }}

        .review-header {{
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }}

        .review-header h1 {{
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }}

        .review-meta {{
            display: flex;
            gap: 2rem;
            margin-top: 1rem;
            font-size: 0.9rem;
            opacity: 0.8;
        }}

        .review-body p {{
            font-size: 1.05rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }}

        .back-link {{
            display: inline-block;
            margin-bottom: 2rem;
            color: var(--burnt-orange);
            text-decoration: none;
        }}

        .back-link:hover {{
            text-decoration: underline;
        }}

        @media (max-width: 768px) {{
            .review-layout {{
                grid-template-columns: 1fr;
            }}

            .review-sidebar {{
                position: static;
                max-height: none;
                margin-bottom: 2rem;
            }}
        }}
    </style>
</head>
<body>
    <!-- Header / Navigation -->
    <header>
        <nav>
            <a href="../../index.html" class="logo">
                <img src="../../assets/images/logos/2wallcache monoAsset 1@4x - Copy copy.png" alt="wallcache Logo">
            </a>

            <ul class="nav-links">
                <li><a href="../../cv.html">cv.</a></li>
                <li class="dropdown">
                    <a href="../../projects.html">projects. ▾</a>
                    <div class="dropdown-content">
                        <a href="../../renovision.html">renovision.</a>
                        <a href="../../long-form-press.html">long form press.</a>
                        <a href="../blog.html">blog.</a>
                        <a href="../book-reviews.html">book reviews.</a>
                        <a href="../reading-list.html">reading.</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="../../wallcache.html">wallcache. ▾</a>
                    <div class="dropdown-content">
                        <a href="../../wallcache-logos.html">logos.</a>
                        <a href="../../wallcache-animations.html">animations.</a>
                        <a href="../../wallcache.html">photography.</a>
                    </div>
                </li>
            </ul>

            <button class="mobile-menu-toggle" aria-label="Toggle menu">☰</button>
        </nav>
    </header>

    <div class="review-layout">
        <!-- Sidebar Navigation -->
        <aside class="review-sidebar">
            <a href="../book-reviews.html" class="back-link">← All Reviews</a>
            <h3>Book Reviews</h3>
            <nav>
                {sidebar_nav}
            </nav>
        </aside>

        <!-- Review Content -->
        <article class="review-content">
            <div class="review-header">
                <h1 class="tilt-light">{review['title']}</h1>
                <p style="font-size: 1.3rem; font-weight: 600; margin-bottom: 0.5rem;">{review['author']}</p>
                <div style="color: var(--burnt-orange); font-size: 1.2rem; margin-bottom: 0.5rem;">
                    {generate_stars(review['rating'])}
                </div>
                <div class="review-meta">
                    <span>Published: {review['published']}</span>
                    <span>Finished: {review['finished']}</span>
                    <span>{review['wordcount']} words</span>
                </div>
            </div>

            <div class="review-body">
                {review['content_html']}
            </div>
        </article>
    </div>

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
                        <li><a href="../../cv.html">CV</a></li>
                        <li><a href="../../projects.html">Projects</a></li>
                        <li><a href="../index.html">Writing</a></li>
                        <li><a href="../../wallcache.html">wallcache</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Projects</h3>
                    <ul>
                        <li><a href="../../projects.html#long-form-press">Long Form Press</a></li>
                        <li><a href="../../wallcache.html">wallcache Photography</a></li>
                        <li><a href="../../projects.html">Data Engineering Work</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Writing</h3>
                    <ul>
                        <li><a href="../blog.html">Blog</a></li>
                        <li><a href="../book-reviews.html">Book Reviews</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 Hal Wall. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="../../assets/js/main.js"></script>
</body>
</html>'''

def main():
    reviews_dir = Path('assets/content/book-reviews')
    output_dir = Path('writing/reviews')
    output_dir.mkdir(exist_ok=True)

    reviews_data = []

    # Process each markdown file
    for md_file in sorted(reviews_dir.glob('*.md')):
        if md_file.name == 'README.md':
            continue

        print(f'Processing {md_file.name}...')

        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        metadata, review_content = parse_front_matter(content)

        if not metadata:
            print(f'  Warning: Could not parse {md_file.name}')
            continue

        slug = md_file.stem
        content_html = markdown_to_html(review_content)

        review = {
            'filename': md_file.name,
            'slug': slug,
            'title': metadata.get('title', ''),
            'author': metadata.get('author', ''),
            'published': metadata.get('published', ''),
            'finished': metadata.get('finished', ''),
            'rating': int(metadata.get('rating', 0)),
            'wordcount': metadata.get('wordcount', ''),
            'content_html': content_html
        }

        reviews_data.append(review)

    # Sort by title
    reviews_data.sort(key=lambda x: x['title'])

    # Generate individual review pages
    for review in reviews_data:
        page_html = create_review_page(review, reviews_data)
        output_file = output_dir / f"{review['slug']}.html"

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(page_html)

        print(f'  Created {output_file}')

    # Generate index data (for main book-reviews.html page)
    index_data = [{
        'slug': r['slug'],
        'title': r['title'],
        'author': r['author'],
        'finished': r['finished'],
        'rating': r['rating'],
        'wordcount': r['wordcount']
    } for r in reviews_data]

    js_content = f'''// Book reviews index data
const reviewsIndex = {json.dumps(index_data, indent=2)};
'''

    with open('assets/js/reviews-index.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f'\n✓ Generated {len(reviews_data)} review pages in {output_dir}/')
    print(f'✓ Generated reviews-index.js')

if __name__ == '__main__':
    main()
