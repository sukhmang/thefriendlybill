# Gallery CSV Format Guide

This guide explains how to create and maintain the `gallery.csv` file for managing your gallery items.

## File Location

Place your `gallery.csv` file in the `public/` folder:
```
public/gallery.csv
```

## CSV Format

The CSV file should have a header row with the following columns (in any order):

### Required Columns

- **filename** - The filename of the image/GIF (e.g., `image001.jpg`, `memory.gif`)
- **type** - Either `image`, `gif`, or `video`

### Optional Columns

- **alt** - Alternative text for accessibility (also accepts: `description`, `caption`)
- **url** - Full URL path (if not provided, defaults to `/images/{filename}`)
- **thumbnail** - Thumbnail image path (if not provided, uses `url`)
- **category** - Category for filtering (e.g., "Family", "Events", "Travel")
- **year** - Year for filtering (e.g., "2020", "2015")
- **date** - Full date in YYYY-MM-DD format (e.g., "2020-05-15")
- **tags** - Comma-separated tags (e.g., "family,home,celebration")

### Example CSV

```csv
filename,type,alt,category,year,date,tags
image001.jpg,image,Family gathering at home,Family,2020,2020-05-15,"family,home,celebration"
image002.jpg,image,Wedding celebration,Events,2015,2015-08-20,"wedding,celebration,family"
memory001.gif,gif,Animated memory,Family,2018,2018-12-25,"family,christmas,animated"
image003.jpg,image,Travel memory,Travel,2019,2019-07-10,"travel,vacation"
```

## File Organization

### Recommended Folder Structure

```
public/
  ├── gallery.csv
  ├── images/
  │   ├── image001.jpg
  │   ├── image002.jpg
  │   ├── image003.jpg
  │   └── ...
  └── gifs/
      ├── memory001.gif
      ├── memory002.gif
      └── ...
```

### Filename Paths

In your CSV, you can reference files in two ways:

1. **Just filename** (recommended if all files are in `/images/`):
   ```csv
   filename,type
   image001.jpg,image
   ```

2. **Full path** (if files are in different folders):
   ```csv
   filename,url
   image001.jpg,/images/image001.jpg
   memory001.gif,/gifs/memory001.gif
   ```

## Tips for Large Galleries (200+ items)

1. **Use consistent naming**: `image001.jpg`, `image002.jpg`, etc. makes it easier to manage
2. **Batch processing**: Use Excel, Google Sheets, or a script to generate the CSV
3. **Categories**: Group similar images with categories for easy filtering
4. **Dates**: Include dates for chronological sorting
5. **Thumbnails**: For very large images, consider creating smaller thumbnail versions

## CSV Generation Tips

### Using Excel/Google Sheets

1. Create columns: filename, type, alt, category, year, date, tags
2. Fill in your data
3. Export as CSV (UTF-8 encoding recommended)
4. Save as `gallery.csv` in the `public/` folder

### Using a Script (Node.js example)

```javascript
const fs = require('fs');
const images = fs.readdirSync('./public/images');
const gifs = fs.readdirSync('./public/gifs');

let csv = 'filename,type,alt,category,year,date\n';

images.forEach((img, i) => {
  csv += `${img},image,Memory ${i + 1},Family,2020,2020-01-01\n`;
});

gifs.forEach((gif, i) => {
  csv += `${gif},gif,Animated Memory ${i + 1},Family,2020,2020-01-01\n`;
});

fs.writeFileSync('./public/gallery.csv', csv);
```

## Supported File Types

- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **GIFs**: `.gif` (animated GIFs are fully supported)
- **Videos**: `.mp4`, `.webm` (if you add videos later)

## Filtering & Sorting

The gallery supports:
- **Filter by Category**: Dropdown to show only specific categories
- **Filter by Year**: Dropdown to show only specific years
- **Sort by**: Date (newest first), Year (newest first), or Filename (A-Z)

## Troubleshooting

### Images not showing?
- Check that files exist in the `public/` folder
- Verify the filename in CSV matches the actual file name (case-sensitive)
- Check browser console for 404 errors

### CSV not loading?
- Ensure file is in `public/` folder (not `src/`)
- Check CSV format (comma-separated, proper quotes for fields with commas)
- Verify file encoding is UTF-8

### Performance issues?
- The gallery uses pagination (24 items per page) for performance
- Images are lazy-loaded
- Consider optimizing image sizes before uploading

