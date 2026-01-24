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
- **Lazy Loading**: Images only load when entering viewport
- **Filter Toggle**: Slideable toggle to filter by:
  - Both (default)
  - Images Only
  - Videos Only
- **Lightbox**: Full-screen viewing with:
  - Auto-hiding navigation buttons (appear on hover, hide after 1s inactivity)
  - Keyboard navigation (Arrow keys, Escape)
  - Swipe gestures (mobile and desktop)
  - Image counter
- **Badge**: "More pictures coming soon!" notification
- **Image Management**: Uses `public/images/images.json` for image list

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

### Adding Images

1. **Place images** in `public/images/` folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.svg`

2. **Update `images.json`** automatically:
   ```bash
   npm run update-gallery
   ```
   
   Or manually edit `public/images/images.json`:
   ```json
   [
     "image001.jpg",
     "image002.jpg",
     "memory001.gif"
   ]
   ```

3. **That's it!** The gallery will:
   - Automatically detect image type (image vs video/GIF)
   - Lazy load images as you scroll
   - Support infinite scroll
   - Display in responsive grid

### Gallery Features

- **Infinite Scroll**: Loads 24 images at a time, more as you scroll
- **Lazy Loading**: Images only load when near viewport (50px before)
- **Filter Toggle**: Switch between Images, Videos, or Both
- **Lightbox**: Click any image to view full-screen
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

- **Image Size**: Keep `public/images/` folder under 15MB for optimal deployment
- **Large Collections**: For 200+ images, consider using a CDN
- **Program Image**: Place program image at `public/images/program/program.JPG`
- **Portrait**: Place hero portrait at `public/portrait.png`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run update-gallery` - Auto-update `images.json` from `public/images/` folder

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
- ✅ Gallery uses `images.json` instead of CSV

---

## Reference Documentation

### Scripts Documentation

#### update-gallery.js

Automatically scans the `public/images/` folder and updates `images.json` with all image files found.

**Usage:**
```bash
npm run update-gallery
```

Or directly:
```bash
node scripts/update-gallery.js
```

**What it does:**
1. Scans `public/images/` for image files
2. Filters for supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.svg`
3. Sorts filenames alphabetically
4. Updates `public/images/images.json` with the list
5. Reports how many images were found

**When to use:**
Run this script whenever you:
- Add new images to `public/images/`
- Remove images from `public/images/`
- Rename image files

The script will automatically update `images.json` to match what's actually in the folder.

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
