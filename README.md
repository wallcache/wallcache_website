# WallCache Personal Website

Personal website for Hal Wall featuring a "Blueprint Workshop" design aesthetic. Built with vanilla HTML, CSS, and JavaScript.

## Overview

This website showcases:
- Professional CV and experience as a Data Engineer at Chubb Insurance
- Project portfolio including Long Form Press (literary goods brand)
- WallCache Photography business
- Book reviews and blog posts
- Handcrafted design aesthetic blending DIY sensibility with technical precision

## Design Theme: Blueprint Workshop

The site features a unique aesthetic inspired by designer sketchbooks, workshop notebooks, and technical blueprints:

### Visual Language
- **Paper Textures**: Tactile, fibrous cream backgrounds throughout
- **Tilted Typography**: Headers rotated 15-20 degrees like hand-stamped titles
- **Handwriting Annotations**: Personal touches and labels in handwriting font
- **Blueprint Grids**: Subtle technical grid overlays on key sections
- **Sketch Borders**: Rough, hand-drawn style borders on cards
- **Layered Materials**: Multiple paper textures creating depth

### Color Palette
- **Navy Blue** (#1a1a3e) - Primary dark accent
- **Cream** (#f5f3f0) - Main background
- **Burnt Orange** (#d97547) - Accent color for highlights
- **Light Blue** (#a8c5dd) - Secondary accent
- **Charcoal** (#1a1a1a) - Body text
- **Paper White** (#faf8f6) - Card backgrounds

### Typography
- **Century Old Style Std Bold** - Primary serif for headings and body text
- **Handwriting Font** (custom) - For annotations, labels, and personal touches
- **Amstrike** - Alternative display font
- **Tilted Text**: Headers rotated at 2°, 5°, 15°, and 20° angles for hand-stamped effect

### Design Elements
- Paper texture overlays creating tactile feel
- Blueprint grid backgrounds using CSS gradients
- Navy cards with semi-transparent backgrounds
- Paper cards with sketch-style borders
- Handwritten annotations throughout
- Timelines with burnt orange accents
- Photo galleries with alternating tilts
- Book review cards with annotation style

## Project Structure

```
wallcache_website/
├── index.html                  # Landing page
├── cv.html                     # Professional CV with timeline
├── projects.html               # Projects showcase (inc. Long Form Press)
├── wallcache.html             # Photography business page
├── writing/
│   ├── index.html             # Writing hub
│   ├── book-reviews.html      # Book reviews with annotations
│   └── blog.html              # Blog posts
├── assets/
│   ├── css/
│   │   └── styles.css         # Main stylesheet (1,504 lines)
│   ├── js/
│   │   └── main.js            # JavaScript functionality
│   ├── images/
│   │   ├── logos/             # Logo files
│   │   │   ├── wallcache-logo.png
│   │   │   └── 2wallcache-logo.png
│   │   ├── favicons/          # Favicon files (placeholders)
│   │   ├── textures/          # Paper texture images
│   │   │   └── peng-texture.jpg
│   │   ├── projects/          # Project screenshots
│   │   ├── photography/       # WallCache photos
│   │   └── books/             # Book cover images
│   └── fonts/                 # Custom fonts
│       ├── CenturyOldStyle/
│       ├── Handwriting/
│       └── Amstrike/
└── README.md                  # This file
```

## Setup Instructions

1. **Favicon Generation**
   - Use one of the existing logos in `assets/images/logos/` to create favicons
   - Generate the following sizes:
     - favicon-16x16.png
     - favicon-32x32.png
     - apple-touch-icon.png (180x180)
   - Place in `assets/images/favicons/`
   - Tools: Use https://realfavicongenerator.net/ or similar

2. **Custom Fonts**
   - Fonts are self-hosted in `assets/fonts/`
   - Century Old Style, Handwriting, and Amstrike fonts included
   - Adobe Fonts (Typekit) also integrated as fallback
   - No additional font setup required

3. **Add Real Content**
   - Replace placeholder project images in `assets/images/projects/`
   - Add photography work to `assets/images/photography/`
   - Add book cover images to `assets/images/books/`
   - Expand blog posts with full content
   - Add more book reviews as written

4. **Social Links**
   - Update social media links in footer across all pages
   - Replace `#` placeholders with actual URLs:
     - Instagram: WallCache photography
     - LinkedIn: Professional profile
     - GitHub: Code portfolio

5. **Optional Enhancements**
   - Set up email newsletter integration
   - Add contact form functionality with backend
   - Implement blog post search/filtering
   - Add Google Analytics or privacy-focused alternative
   - Create actual PDF version of CV for download

## Features

### Navigation
- Sticky header with cream background
- Dropdown menu for Writing section (Blog & Book Reviews)
- Mobile-responsive hamburger menu
- Smooth scroll to anchors
- Logo navigation to home

### Blueprint Workshop Design Elements
- **Tilted Headers**: All major headings rotated for hand-stamped effect
- **Handwriting Annotations**: Labels, dates, and call-to-action text
- **Paper Textures**: Fibrous background throughout site
- **Blueprint Grids**: Technical grid patterns on hero sections
- **Navy Cards**: Dark accent cards with texture overlays
- **Paper Cards**: Light cards with sketch borders
- **Timeline Components**: Professional experience with orange accents
- **Book Review Cards**: Annotated style with ratings and critical analysis

### Interactive Elements
- Hover effects on cards and buttons
- Animated scroll effects
- Mobile menu toggle
- Current page highlighting in nav
- Smooth transitions throughout

### Accessibility
- Semantic HTML5 structure
- ARIA labels where appropriate
- Keyboard navigation support
- Responsive design for all screen sizes
- Proper heading hierarchy
- Sufficient color contrast (WCAG compliant)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS transforms for tilted text
- CSS custom properties (CSS variables)
- Mobile responsive (breakpoints at 768px and 480px)
- Graceful degradation for older browsers

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, transforms, multiple backgrounds
- **JavaScript (Vanilla)** - No frameworks or libraries
- **Adobe Fonts** - Typekit integration for Poppins
- **Self-hosted Fonts** - Century Old Style, Handwriting, Amstrike

## Key Pages

### Index (Home)
Blueprint-style hero with tilted name, quick navigation cards, about section, featured projects preview, Long Form Press showcase

### CV
Professional timeline with Chubb Insurance and Quilter experience, education (Imperial College Physics BSc), technical skills grid, personal interests, downloadable PDF link

### Projects
**Data Engineering Section:**
- Insurance Analytics Platform (Databricks, PySpark, Azure)
- Cloud Migration & Unity Catalog
- Financial Services Data Pipelines
- Automated Workflows & Orchestration

**Long Form Press Feature:**
- Dark-themed section with ouroboros branding
- Brand philosophy and mission
- Product categories (Bookmarks, Prints, Journals, Curated Goods)
- "Better read than dead" tagline

**Other Projects:**
- Renovision
- WallCache Photography

### WallCache
Photography as attention practice, gallery with sketch borders, services (Portraits, Events, Commercial), technical/creative approach, booking CTA

### Writing Hub
Two main sections with large navigation cards:
- Blog (essays on data engineering, literature, reading)
- Book Reviews (detailed analysis of literary fiction and philosophy)

### Blog
Essay-style posts covering:
- Data Engineering best practices
- Technical deep-dives
- Literature and reading philosophy
- Side projects and creativity
Metadata displayed in handwriting font

### Book Reviews
Detailed reviews with critical analysis:
- The Remains of the Day (Kazuo Ishiguro) - 5 stars
- Educated (Tara Westover) - 4 stars
- Never Let Me Go (Kazuo Ishiguro) - 5 stars
- Sapiens (Yuval Noah Harari) - 4 stars
- Blood Meridian (Cormac McCarthy) - 5 stars

Each review includes rating, critical analysis, and handwritten annotation summary

## Long Form Press Feature

The projects page includes a special dark-themed section for Long Form Press:
- Ouroboros symbol (⊚) as brand icon
- "Better read than dead" tagline
- Brand philosophy: eternal return, cyclical reading, literary immortality
- Product categories with detailed descriptions
- How We Work section (sustainability, quality, small-batch)
- Connect & Shop CTAs
- Dark navy background contrasting with cream site theme
- Maintains paper texture aesthetic with overlays

## Customization

### Colors
Edit CSS custom properties in `assets/css/styles.css`:
```css
:root {
  --navy: #1a1a3e;
  --light-blue: #a8c5dd;
  --cream: #f5f3f0;
  --burnt-orange: #d97547;
  --charcoal: #1a1a1a;
  --paper-white: #faf8f6;
}
```

### Typography
Font declarations in CSS:
```css
:root {
  --font-century: 'Century Old Style', 'Georgia', serif;
  --font-handwriting: 'Handwriting', 'Bradley Hand', cursive;
  --font-amstrike: 'Amstrike', 'Impact', sans-serif;
}
```

### Tilt Angles
Adjust rotation angles:
```css
:root {
  --tilt-light: -2deg;
  --tilt-medium: -5deg;
  --tilt-heavy: -15deg;
  --tilt-extreme: -20deg;
}
```

### Layout Containers
Main containers:
- `.container` - Standard width (1200px max)
- `.container-narrow` - Narrow content (800px max, for reading)
- Grid systems: `.grid-2`, `.grid-3`, `.grid-4`

### Component Classes
- `.navy-card` - Dark navy background cards
- `.paper-card` - Light cards with sketch borders
- `.handwriting` - Apply handwriting font
- `.tilt-light`, `.tilt-medium`, `.tilt-heavy`, `.tilt-extreme` - Rotation utilities
- `.annotation` - Handwritten annotation style
- `.blueprint-grid` - Blueprint background pattern

## Deployment

This is a static site that can be deployed to:
- **GitHub Pages** - Free hosting for static sites
- **Netlify** - Automatic deployments from Git
- **Vercel** - Fast global CDN
- **Any static hosting service**

No build process required - just upload the files.

### Deployment Checklist
- [ ] Update all social media links
- [ ] Replace favicon placeholders
- [ ] Add real photography to gallery
- [ ] Verify all internal links work
- [ ] Test on multiple devices/browsers
- [ ] Add meta tags for SEO and social sharing
- [ ] Set up custom domain (if applicable)
- [ ] Configure SSL certificate
- [ ] Add Google Analytics or alternative

## Performance Considerations

- Self-hosted fonts reduce external dependencies
- Paper texture images should be optimized (currently ~600x600px)
- CSS is modular and well-organized
- No JavaScript frameworks = fast load times
- Consider lazy loading for photography gallery
- Minify CSS/JS for production

## To-Do

- [ ] Generate favicons from logo
- [ ] Add real photography to WallCache gallery
- [ ] Add actual project screenshots
- [ ] Expand blog posts with full content
- [ ] Add more book reviews
- [ ] Add book cover images to reviews
- [ ] Set up contact form backend
- [ ] Add newsletter signup integration
- [ ] Create PDF version of CV for download
- [ ] Update all social media links
- [ ] Add Long Form Press product images when available
- [ ] Optimize texture images for web
- [ ] Add meta tags for social sharing (Open Graph, Twitter Cards)
- [ ] Set up analytics
- [ ] Add structured data (Schema.org) for SEO

## Design Philosophy

The Blueprint Workshop aesthetic reflects Hal's approach to work:
- **Precision meets personality** - Technical rigor with human touches
- **Timeless over trendy** - Classic design elements that age well
- **Honest materiality** - No glossy surfaces, everything has texture
- **Considered details** - Small touches that reward attention
- **Functional beauty** - Design serves content, not the other way around

## Content Strategy

### Writing
Focus on close reading and thematic analysis. No summaries—honest thinking about what great writers have to say. Primarily literary fiction, memoirs, philosophy, and non-fiction that tackles complex subjects.

### Book Reviews
- Rating system: ★★★★★ (Masterpiece) to ★☆☆☆☆ (Poor)
- Focus on themes, style, and craft
- Analysis over summary
- Handwritten annotations for key takeaways

### Blog
Topics: data engineering, technical deep-dives, literature, reading philosophy, side projects, creative practice. Writing to think more clearly.

## Technical Notes

### CSS Architecture
- CSS Custom Properties for design tokens
- BEM-inspired naming conventions
- Mobile-first responsive approach
- Utility classes for common patterns
- Component-based organization

### JavaScript
- Vanilla JS, no dependencies
- Progressive enhancement approach
- Event delegation for performance
- Mobile menu toggle
- Smooth scroll behavior

### HTML Structure
- Semantic HTML5 elements
- Proper heading hierarchy (h1 → h2 → h3)
- Accessibility attributes (ARIA labels)
- Meta tags for SEO and social sharing

## License

© 2024 Hal Wall. All rights reserved.

## Contact

For questions or collaboration: hal@wallcache.com

---

**Built with attention to craft, designed to last.**
