# Scripts

## update-gallery.js

Automatically scans the `public/images/` folder and updates `images.json` with all image files found.

### Usage

```bash
npm run update-gallery
```

Or directly:
```bash
node scripts/update-gallery.js
```

### What it does

1. Scans `public/images/` for image files
2. Filters for supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.svg`
3. Sorts filenames alphabetically
4. Updates `public/images/images.json` with the list
5. Reports how many images were found

### When to use

Run this script whenever you:
- Add new images to `public/images/`
- Remove images from `public/images/`
- Rename image files

The script will automatically update `images.json` to match what's actually in the folder.

