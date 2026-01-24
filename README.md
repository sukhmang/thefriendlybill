# The Baljit Grewal Memorial Site

A responsive, single-page React application serving as a digital memorial for Baljit Singh Grewal. Built with accessibility in mind, especially for elderly users.

## Tech Stack

- **React** (Vite)
- **Styled Components** (CSS-in-JS)
- **Lucide React** (Icons)

## Project Structure

```
src/
  ├── components/
  │   ├── Layout.jsx         # Main container with centered content
  │   ├── Hero.jsx           # Hero section with portrait, info, and CTA buttons
  │   ├── StickyNav.jsx      # Sticky navigation bar (Watch, Event Details, Gallery)
  │   ├── LivestreamCard.jsx # Video section (Slideshow & Funeral Service)
  │   ├── EventDetailsCard.jsx # Event details with collapsible past events
  │   ├── Gallery.jsx        # Photo/video gallery with infinite scroll
  │   └── Lightbox.jsx       # Full-screen lightbox modal for gallery items
  ├── styles/
  │   ├── theme.js           # Design system theme (colors, typography, spacing)
  │   └── GlobalStyles.js    # Global CSS styles
  ├── constants.js           # Easy-to-edit data (name, dates, videos, events)
  ├── App.jsx                # Main app component with ThemeProvider
  └── main.jsx               # Entry point
public/
  ├── images/
  │   ├── images.json        # List of gallery image filenames
  │   └── [image files]      # Gallery images and GIFs
  ├── images/program/
  │   └── program.JPG        # Funeral program image
  ├── portrait.png           # Hero section portrait
  └── favicon.svg            # Tree of Life favicon
scripts/
  └── update-gallery.js      # Script to auto-update images.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Features

### Hero Section
- Memorial portrait, name, and dates
- Welcome message
- Two CTA buttons: "Slideshow" and "Service" (scroll to video section)
- Horizontal layout on desktop, stacked on mobile

### Watch Section
- **Slideshow Video**: Looping memorial slideshow (top)
- **Funeral Service Video**: Recorded service video (bottom)
- Videos displayed directly (no modal or preview overlay)
- Both videos visible and ready to play
- Responsive layout for all screen sizes

### Event Details
- **Current Events**: Celebration of Life prominently displayed
- **Past Events**: Collapsible section containing:
  - Funeral Service (with program modal)
  - Bhog & Antim Ardas
- Event information includes:
  - Date and time (with timezone)
  - Venue name and full address
  - "Get Directions" button (Google Maps)
  - "Show Program" button (opens full-screen modal)
  - RSVP information (for Celebration of Life)
- Badges for special event types (e.g., "Open House Style", "RSVP Event")

### Gallery
- **Infinite Scroll**: Automatically loads more images as you scroll
- **Lazy Loading**: Images only load when entering viewport (50px before)
- **Thumbnail System**: Images use optimized thumbnails in grid view (400px width, ~100-200KB each)
  - Full-resolution images load only in lightbox
  - Automatic fallback to full image if thumbnail missing
- **MP4 Video Support**: 
  - Videos autoplay, loop, and are muted in grid view
  - Videos play with sound, autoplay, and loop in lightbox
  - 32 videos currently in gallery
- **Filter Toggle**: Slideable toggle to filter by:
  - Both (default)
  - Images Only
  - Videos Only
- **CSV-Based Sorting**: Gallery order controlled by `gallery.csv` with `default_sort` column
  - Videos prioritized to appear in first 120 items
  - Custom sort order for curated display
- **Lightbox**: Full-screen viewing with:
  - Auto-hiding navigation buttons (appear on hover, hide after 1s inactivity)
  - Keyboard navigation (Arrow keys, Escape)
  - Swipe gestures (mobile and desktop)
  - Image counter
- **Badge**: "More pictures coming soon!" notification
- **Image Management**: Uses `public/images/images.json` (synced from `gallery.csv`)

### Navigation
- Sticky navigation bar with three sections:
  - **Watch**: Scrolls to video section
  - **Event Details**: Scrolls to event information
  - **Gallery**: Scrolls to photo gallery
- Smooth scrolling with proper offset for sticky nav

## Configuration

Edit `src/constants.js` to update:

### Memorial Information
```javascript
export const MEMORIAL_DATA = {
  name: "Baljit Singh Grewal",
  birthDate: "January 1, 1953",
  deathDate: "January 16, 2026",
  portraitImage: "/portrait.png",
  welcomeMessage: "..."
}
```

### Event Details
```javascript
export const EVENT_DATA = {
  // Main Funeral Service (now in Past Events)
  displayDate: "Thursday, January 22nd, 2026",
  displayTime: "12:00 PM MST",
  venueName: "Park Place Funeral Home",
  address: { ... },
  programPdfUrl: "/images/program/program.JPG",
  
  // YouTube Videos
  youtubeVideoId: "CtLesw1JaBA",        // Funeral Service video
  youtubeLoopVideoId: "Rg4KB7H9cRw",    // Slideshow video
  
  // Additional Events
  additionalEvents: [
    {
      name: "Celebration of Life in Vancouver",
      date: "Sunday, January 25th, 2026",
      time: "12:00 - 4:30 PM PST",
      isPast: false,  // Set to true for past events
      // ... other event details
    }
  ]
}
```

## Gallery Management

### Current Gallery Statistics

- **Total Files**: 679 media files
- **Images**: 647 files
- **Videos (MP4)**: 32 files
- **Total Size**: ~1.2GB
- **Location**: `public/images/`
- **Thumbnails**: Generated on-demand (saved to `public/images/thumbnails/`)

### Gallery Workflow

The gallery uses a **CSV-based management system** for metadata and sorting:

1. **`gallery.csv`** - Master file containing all metadata (filename, type, alt text, category, year, date, tags, default_sort)
2. **`images.json`** - Simple array of filenames, synced from CSV and sorted by `default_sort`

### Adding New Media Files

1. **Place files** in `public/images/` folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.svg`, `.mp4`, `.webm`, `.mov`

2. **Run the master sync script**:
   ```bash
   npm run sync-gallery
   ```
   This single command will:
   - Update `gallery.csv` (adds new files, removes deleted files)
   - Generate thumbnails for new images
   - Sync `images.json` from CSV (preserves sort order)

   **This is the recommended workflow!** One command does everything.

   **Alternative (manual steps):**
   - `npm run update-gallery-csv` - Sync CSV only
   - `npm run generate-thumbnails` - Generate thumbnails only
   - `node scripts/sync-images-json-from-csv.js` - Sync images.json only

### Customizing Sort Order

Edit `gallery.csv` and set `default_sort` values:
- Lower numbers = appear first
- Videos are currently set to appear in first 120 items
- Default for new files: 10000 (appears at end)

Then sync:
```bash
node scripts/sync-images-json-from-csv.js
```

### Gallery Features

- **Infinite Scroll**: Loads 24 items at a time, more as you scroll
- **Lazy Loading**: Images/videos only load when near viewport (50px before)
- **Thumbnail System**: Images use thumbnails in grid, full-res in lightbox
- **Video Support**: MP4s autoplay (muted) in grid, with sound in lightbox
- **Filter Toggle**: Switch between Images, Videos, or Both
- **Lightbox**: Click any item to view full-screen
  - Navigation buttons appear on hover
  - Auto-hide after 1 second of mouse inactivity
  - Keyboard and swipe navigation

## Design System

The project uses a centralized theme system in `src/styles/theme.js` that defines:
- Colors (background, text, accents)
- Typography (font sizes, weights, family)
- Spacing scale
- Shadows and border radius
- Breakpoints for responsive design

All components use styled-components and access the theme via the `ThemeProvider`.

## Accessibility Features

- Large, readable text (especially for elderly users)
- High contrast colors
- Obvious, large buttons
- Keyboard navigation throughout
- Screen reader support
- Smooth scrolling with proper offsets
- Touch-friendly controls on mobile

## Deployment

The site is deployed using vercel. Just push your commits and merge the branch to Main, and it auto deploys to www.baljitgrewal.ca

### Build for Production
```bash
npm run build
```

The `dist/` folder contains the production-ready static files.

### Important Notes

- **Current Gallery Size**: ~1.2GB (679 files: 647 images, 32 videos)
- **Thumbnail System**: Reduces initial load from 100MB+ to ~5MB
- **Large Collections**: For very large collections (500+ files), consider:
  - Using a CDN for media files
  - Generating thumbnails for all images
  - Compressing videos before upload
- **Program Image**: Place program image at `public/images/program/program.JPG`
- **Portrait**: Place hero portrait at `public/portrait.png`
- **Deployment**: Vercel handles large static assets, but consider CDN for 1GB+ collections

## Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Gallery Management
- `npm run sync-gallery` - **Master script**: Syncs everything (CSV, thumbnails, images.json) - Use this when adding/removing files
- `npm run update-gallery` - Auto-update `images.json` from `public/images/` folder (simple list)
- `npm run update-gallery-csv` - Sync `gallery.csv` with files (adds new, removes deleted)
- `npm run generate-thumbnails` - Generate thumbnails for all images (requires `sharp` package)
- `node scripts/randomize-sort-order.js` - Randomly assign sort orders (videos in first 120)
- `node scripts/sync-images-json-from-csv.js` - Sync `images.json` from `gallery.csv` (preserves sort order)


---

## Recent Updates

- ✅ Converted from livestream to recorded videos
- ✅ Removed modal/preview overlay - videos show directly
- ✅ Added collapsible "Past Events" section
- ✅ Changed "Download Program" to "Show Program" (modal)
- ✅ Updated navigation from "Watch Live" to "Watch"
- ✅ Added infinite scroll to gallery (replaced pagination)
- ✅ Added slideable filter toggle (Images/Videos/Both)
- ✅ Lightbox navigation buttons auto-hide on mouse inactivity
- ✅ Tree of Life favicon
- ✅ **MP4 video support** - Videos autoplay in grid (muted), with sound in lightbox
- ✅ **Thumbnail system** - Optimized thumbnails for images (400px, ~100-200KB)
- ✅ **CSV-based gallery management** - Full metadata support with `gallery.csv`
- ✅ **Custom sort ordering** - `default_sort` column controls display order
- ✅ **Video prioritization** - Videos appear in first 120 items
- ✅ **Gallery sync scripts** - Automated CSV/JSON synchronization

---

## Reference Documentation

### Scripts Documentation

#### sync-gallery.js ⭐ **MASTER SCRIPT**

**One-stop script to sync the entire gallery system when files are added/removed.**

**Usage:**
```bash
npm run sync-gallery
```

**What it does:**
1. **Updates `gallery.csv`** - Adds new files, removes deleted files
2. **Generates thumbnails** - Creates thumbnails for new images (skips existing ones)
3. **Syncs `images.json`** - Updates from CSV, preserving sort order

**When to use:**
- **After adding new images/videos** to `public/images/`
- **After deleting files** from `public/images/`
- **After renaming files** in `public/images/`
- **Any time you modify the images folder**

**This is the recommended script for regular gallery maintenance.**

---

#### update-gallery.js

Automatically scans the `public/images/` folder and updates `images.json` with all media files found.

**Usage:**
```bash
npm run update-gallery
```

**What it does:**
1. Scans `public/images/` for media files
2. Filters for supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.svg`, `.mp4`, `.webm`, `.mov`
3. Sorts filenames alphabetically
4. Updates `public/images/images.json` with the list
5. Reports image and video counts

**When to use:**
- Quick update of `images.json` without CSV metadata
- Simple file list generation

**Note:** For full metadata management, use `update-gallery-csv.js` instead.

---

#### update-gallery-csv.js

Syncs `gallery.csv` with actual files in `public/images/`. This is the recommended script for gallery management.

**Usage:**
```bash
npm run update-gallery-csv
```

**What it does:**
1. Reads existing `gallery.csv` entries
2. **Removes** entries for files that no longer exist
3. **Adds** entries for new files (images, MP4s, GIFs)
4. Sets `default_sort` to 10000 for new entries (or entries without sort value)
5. Preserves existing metadata (alt text, category, tags, etc.)
6. Sorts output by `default_sort` value

**When to use:**
- After adding new images/videos to `public/images/`
- After deleting files from `public/images/`
- To sync CSV with actual files

**Output:**
- Updated `gallery.csv` with all current files
- New files get default metadata (filename as alt text, empty category/tags)

---

#### generate-thumbnails.js

Generates optimized thumbnails for all images in the gallery.

**Usage:**
```bash
npm run generate-thumbnails
```

**Requirements:**
```bash
npm install sharp
```

**What it does:**
1. Scans `public/images/` for image files (excludes videos/GIFs)
2. Creates `public/images/thumbnails/` directory if needed
3. Generates JPEG thumbnails (400px width, 80% quality, ~100-200KB each)
4. Skips images that already have up-to-date thumbnails
5. All thumbnails saved as `.jpg` regardless of original format

**When to use:**
- After adding new images
- To optimize gallery performance (thumbnails load much faster)
- Initial setup for existing image collection

**Performance Impact:**
- Grid view: Loads ~5MB of thumbnails instead of 100MB+ of full images
- Lightbox: Still loads full-resolution images

---

#### randomize-sort-order.js

Randomly assigns `default_sort` values to all entries in `gallery.csv`.

**Usage:**
```bash
node scripts/randomize-sort-order.js
```

**What it does:**
1. Reads `gallery.csv` and separates videos from images
2. Assigns videos random sort values 1-120 (ensures all videos in first 120 items)
3. Assigns images random sort values 1-10000
4. Sorts all entries by `default_sort` value
5. Writes updated CSV

**When to use:**
- One-time initialization of sort order
- To randomize gallery display order
- To ensure videos appear prominently (first 120 items)

**Note:** After running, sync `images.json` with `sync-images-json-from-csv.js`

---

#### sync-images-json-from-csv.js

Syncs `images.json` from `gallery.csv`, preserving the sort order.

**Usage:**
```bash
node scripts/sync-images-json-from-csv.js
```

**What it does:**
1. Reads `gallery.csv` and extracts filenames
2. Sorts by `default_sort` value (ascending)
3. Writes ordered filenames to `public/images/images.json`

**When to use:**
- After editing `gallery.csv` sort order
- After running `randomize-sort-order.js`
- To ensure `images.json` matches CSV order

**Why needed:**
- Gallery component reads from `images.json` (simple array)
- CSV contains metadata and sort order
- This script bridges the two, ensuring gallery displays in correct order

---

### Gallery Images Documentation

#### How to Add Images

1. **Place your images** in `public/images/` folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
   - GIFs are fully supported and will display as animated

2. **Update `images.json`** to include your image filenames:
   ```json
   [
     "image001.jpg",
     "image002.jpg",
     "memory001.gif",
     "photo003.jpg"
   ]
   ```

3. **That's it!** The gallery will automatically:
   - Load images from this list
   - Detect image type (GIF, JPG, etc.) from filename
   - Lazy load images for better performance
   - Display them in a responsive grid

#### Gallery Tips

- **Naming**: Use descriptive filenames (they'll be used as alt text)
- **Organization**: Keep all images in `public/images/` folder
- **Performance**: Images are lazy-loaded (only load when scrolled into view)
- **Infinite Scroll**: Gallery loads 24 images initially, then loads more as you scroll down
- **Filter Toggle**: Use the slideable toggle to filter by Images, Videos, or Both

#### Example `images.json`

```json
[
  "family-photo-2020.jpg",
  "wedding-celebration.jpg",
  "memory-animation.gif",
  "travel-photo-2019.jpg"
]
```

#### Technical Note

The gallery uses intelligent lazy loading with Intersection Observer API, so users won't download all images at once. Images only load when they're about to enter the viewport (50px before).

---

### Gallery CSV Format Guide (Legacy)

> **Note**: The gallery currently uses `images.json` instead of CSV. This section is kept for reference if you need to migrate back to CSV-based metadata in the future.

#### File Location

Place your `gallery.csv` file in the `public/` folder:
```
public/gallery.csv
```

#### CSV Format

The CSV file should have a header row with the following columns (in any order):

**Required Columns:**
- **filename** - The filename of the image/GIF (e.g., `image001.jpg`, `memory.gif`)
- **type** - Either `image`, `gif`, or `video`

**Optional Columns:**
- **alt** - Alternative text for accessibility (also accepts: `description`, `caption`)
- **url** - Full URL path (if not provided, defaults to `/images/{filename}`)
- **thumbnail** - Thumbnail image path (if not provided, uses `url`)
- **category** - Category for filtering (e.g., "Family", "Events", "Travel")
- **year** - Year for filtering (e.g., "2020", "2015")
- **date** - Full date in YYYY-MM-DD format (e.g., "2020-05-15")
- **tags** - Comma-separated tags (e.g., "family,home,celebration")

#### Example CSV

```csv
filename,type,alt,category,year,date,tags
image001.jpg,image,Family gathering at home,Family,2020,2020-05-15,"family,home,celebration"
image002.jpg,image,Wedding celebration,Events,2015,2015-08-20,"wedding,celebration,family"
memory001.gif,gif,Animated memory,Family,2018,2018-12-25,"family,christmas,animated"
image003.jpg,image,Travel memory,Travel,2019,2019-07-10,"travel,vacation"
```

#### File Organization

**Recommended Folder Structure:**
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

**Filename Paths:**
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

#### Tips for Large Galleries (200+ items)

1. **Use consistent naming**: `image001.jpg`, `image002.jpg`, etc. makes it easier to manage
2. **Batch processing**: Use Excel, Google Sheets, or a script to generate the CSV
3. **Categories**: Group similar images with categories for easy filtering
4. **Dates**: Include dates for chronological sorting
5. **Thumbnails**: For very large images, consider creating smaller thumbnail versions

#### CSV Generation Tips

**Using Excel/Google Sheets:**
1. Create columns: filename, type, alt, category, year, date, tags
2. Fill in your data
3. Export as CSV (UTF-8 encoding recommended)
4. Save as `gallery.csv` in the `public/` folder

**Using a Script (Node.js example):**
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

#### Supported File Types

- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **GIFs**: `.gif` (animated GIFs are fully supported)
- **Videos**: `.mp4`, `.webm` (if you add videos later)

#### Troubleshooting

**Images not showing?**
- Check that files exist in the `public/` folder
- Verify the filename in CSV matches the actual file name (case-sensitive)
- Check browser console for 404 errors

**CSV not loading?**
- Ensure file is in `public/` folder (not `src/`)
- Check CSV format (comma-separated, proper quotes for fields with commas)
- Verify file encoding is UTF-8

**Performance issues?**
- The gallery uses infinite scroll (24 items initially) for performance
- Images are lazy-loaded
- Consider optimizing image sizes before uploading
