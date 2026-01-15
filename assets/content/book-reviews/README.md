# Book Reviews System

This folder contains book reviews in Markdown format that are dynamically loaded into the website.

## How to Add a New Review

1. Create a new `.md` file in this folder with a URL-friendly filename (e.g., `the-great-gatsby.md`)

2. Use this format:

```markdown
---
title: The Great Gatsby
author: F. Scott Fitzgerald
published: 1925
finished: January 15, 2024
rating: 5
wordcount: 47094
---

Your review content goes here. Write in plain paragraphs separated by blank lines.

Each paragraph will be automatically formatted when displayed on the website.

You can use *italic* and **bold** formatting if needed.
```

## Front Matter Fields

- `title`: Book title (required)
- `author`: Author name (required)
- `published`: Year published (optional)
- `finished`: Date you finished reading (required)
- `rating`: 1-5 stars (required)
- `wordcount`: Approximate word count (optional)

## Building the Reviews

After creating or editing your `.md` files, you need to rebuild the reviews data:

1. Open Terminal and navigate to the website root:
   ```bash
   cd /path/to/wallcache_website
   ```

2. Run the build script:
   ```bash
   python3 build-reviews.py
   ```

3. This generates `/assets/js/reviews-data.js` with all your reviews

4. Refresh the book reviews page to see your changes!

**Important:** You must run `build-reviews.py` every time you add, edit, or delete a review file.

## Tips

- Keep reviews concise (3-5 paragraphs works well)
- Use clear, descriptive titles
- The filename should match the pattern: `book-title.md` (lowercase, hyphens for spaces)
- Reviews alternate between navy-card and paper-card styles automatically
- The system handles the star rating display automatically

## Editing Existing Reviews

Simply edit the `.md` file and save. The changes will appear on the website immediately after refresh.

## File Structure

```
assets/content/book-reviews/
├── README.md (this file)
├── moby-dick.md
├── war-and-peace.md
├── anna-karenina.md
└── ... (other review files)
```
