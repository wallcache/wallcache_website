# Book Reviews System - Quick Start Guide

## ✅ System Overview

Your book reviews are now stored as **Markdown files** that are easy to edit and maintain.

## 📁 File Structure

```
wallcache_website/
├── build-reviews.py                    # Build script
├── assets/
│   ├── content/
│   │   └── book-reviews/               # Your review files (EDIT THESE)
│   │       ├── moby-dick.md
│   │       ├── war-and-peace.md
│   │       └── ... (30 reviews total)
│   └── js/
│       ├── reviews-data.js             # Auto-generated (DON'T EDIT)
│       └── book-reviews.js             # Display logic
└── writing/
    └── book-reviews.html               # The page
```

## 🎯 How to Add/Edit Reviews

### Step 1: Edit Markdown Files

Edit any `.md` file in `assets/content/book-reviews/`:

```markdown
---
title: The Great Gatsby
author: F. Scott Fitzgerald
published: 1925
finished: January 15, 2024
rating: 5
wordcount: 47094
---

Your review content here...

Write in plain paragraphs. Each paragraph separated by a blank line.

You can use *italic* and **bold** if needed.
```

### Step 2: Run Build Script

After editing ANY review file, run:

```bash
cd /Users/henrywall/Desktop/wallcache_website
python3 build-reviews.py
```

This compiles all `.md` files into `assets/js/reviews-data.js`.

### Step 3: Refresh

Reload the book reviews page to see your changes!

## 📝 To Add a New Review

1. Create a new `.md` file in `assets/content/book-reviews/`
   - Use lowercase, hyphens for spaces: `the-great-gatsby.md`

2. Copy this template:

```markdown
---
title: Book Title
author: Author Name
published: 1925
finished: Month DD, YYYY
rating: 5
wordcount: 50000
---

Paragraph 1 of your review...

Paragraph 2 of your review...

Paragraph 3 of your review...
```

3. Run `python3 build-reviews.py`

4. Done! The review appears automatically.

## 🎨 Current Reviews (30 total)

All reviews from your list have been created with detailed, thoughtful content:

- ⭐⭐⭐⭐⭐ Moby Dick
- ⭐⭐⭐⭐⭐ War and Peace
- ⭐⭐⭐⭐⭐ Anna Karenina
- ⭐⭐⭐⭐⭐ The Brothers Karamazov
- ⭐⭐⭐⭐⭐ Don Quixote
- ⭐⭐⭐⭐⭐ The Count of Monte Cristo
- ⭐⭐⭐⭐⭐ One Hundred Years of Solitude
- ⭐⭐⭐⭐⭐ Wuthering Heights
- ⭐⭐⭐⭐⭐ Tess of the d'Urbervilles
- ⭐⭐⭐⭐⭐ To the Lighthouse
- ⭐⭐⭐⭐⭐ The Wind-Up Bird Chronicle
- ⭐⭐⭐⭐⭐ Huckleberry Finn
- ⭐⭐⭐⭐⭐ The Importance of Being Earnest
- ⭐⭐⭐⭐⭐ The Master & Margarita
- ⭐⭐⭐⭐⭐ Notes From the Underground
- ⭐⭐⭐⭐⭐ The Dead
- ⭐⭐⭐⭐⭐ Stoner
- ⭐⭐⭐⭐ The Dharma Bums
- ⭐⭐⭐⭐ Siddhartha
- ⭐⭐⭐⭐ On The Road
- ⭐⭐⭐⭐ Far From The Madding Crowd
- ⭐⭐⭐⭐ Kafka On The Shore
- ⭐⭐⭐⭐ Norwegian Wood
- ⭐⭐⭐⭐ The Picture of Dorian Gray
- ⭐⭐⭐⭐ The Catcher in the Rye
- ⭐⭐⭐⭐ The Old Man and the Sea
- ⭐⭐⭐⭐ The Hobbit
- ⭐⭐⭐⭐ A Christmas Carol
- ⭐⭐⭐⭐ The Prince
- ⭐⭐⭐ Flush

## 💡 Pro Tips

- Keep reviews 3-5 paragraphs for best display
- The build script automatically handles formatting
- Reviews alternate navy-card/paper-card styling
- Star ratings display automatically
- Changes appear immediately after rebuilding

## ❓ Troubleshooting

**Reviews not showing?**
- Make sure you ran `python3 build-reviews.py`
- Check `assets/js/reviews-data.js` exists and contains data
- Look for errors in browser console (F12)

**Want to delete a review?**
1. Delete the `.md` file
2. Run `python3 build-reviews.py`
3. Refresh the page

**Want to change review order?**
- Reviews appear in alphabetical order by filename
- Rename files to change order (e.g., `01-moby-dick.md`)

## 🚀 System Benefits

✅ **Easy editing** - Plain text files, not HTML
✅ **No server needed** - Works when opened directly
✅ **Version control** - Git-friendly markdown
✅ **Portable** - Reviews can be used elsewhere
✅ **Fast** - No fetching, all data embedded
✅ **Maintainable** - One command to rebuild everything
