# The Baljit Grewal Memorial Site

A responsive, single-page React application serving as a digital memorial for Baljit Grewal. Built with accessibility in mind, especially for elderly users.

## Tech Stack

- **React** (Vite)
- **Styled Components** (CSS-in-JS)
- **Lucide React** (Icons)

## Project Structure

```
src/
  ├── components/
  │   ├── Layout.jsx         # Main container with centered content
  │   ├── Hero.jsx           # Hero section with portrait and info
  │   ├── StickyNav.jsx      # Sticky navigation bar
  │   ├── LivestreamCard.jsx # Livestream with countdown/YouTube embed
  │   ├── EventDetailsCard.jsx # Event details with directions and program
  │   ├── Gallery.jsx       # Photo/video gallery grid with CSV loading
  │   └── Lightbox.jsx      # Full-screen lightbox modal for gallery items
  ├── utils/
  │   └── csvParser.js      # CSV parsing utility for gallery metadata
  ├── styles/
  │   ├── theme.js        # Design system theme (colors, typography, spacing)
  │   └── GlobalStyles.js # Global CSS styles
  ├── constants.js        # Easy-to-edit data (name, dates, messages)
  ├── App.jsx             # Main app component with ThemeProvider
  ├── main.jsx            # Entry point
  └── index.css           # Minimal global styles
public/
  └── gallery.csv         # Gallery metadata (CSV format)
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

## Milestone 1 Complete ✅

- ✅ Vite + React + Styled Components setup
- ✅ Hero section with portrait, name, dates, and welcome message
- ✅ Sticky navigation bar with three buttons (Watch Live, Event Details, Gallery)
- ✅ Mobile-first responsive design
- ✅ Elder-friendly large text and high contrast
- ✅ Constants file for easy content editing
- ✅ Organized styled-components with theme system

## Milestone 2 Complete ✅

- ✅ Livestream card with countdown timer (days, hours, minutes, seconds)
- ✅ Automatic switch to YouTube embed when event time arrives
- ✅ Event details card with date, time, and location
- ✅ "Get Directions" button (opens Google Maps)
- ✅ "Download Program" button (links to PDF)
- ✅ Real-time countdown updates every second
- ✅ Responsive design for all new components

## Milestone 3 Complete ✅

- ✅ Photo/video gallery with responsive grid (3 columns mobile, 4 desktop)
- ✅ Support for both images and GIFs (200+ items supported)
- ✅ CSV-based metadata system for easy management
- ✅ Filtering by category and year
- ✅ Sorting by date, year, or filename
- ✅ Pagination (24 items per page) for performance
- ✅ Lightbox/modal for full-screen viewing with black background
- ✅ Keyboard navigation (Arrow keys, Escape)
- ✅ Navigation buttons (Previous/Next) in lightbox
- ✅ Item counter in lightbox (e.g., "3 / 12")
- ✅ Lazy loading for gallery thumbnails
- ✅ Accessible with keyboard and screen reader support

## Design System

The project uses a centralized theme system in `src/styles/theme.js` that defines:
- Colors (background, text, accents)
- Typography (font sizes, weights, family)
- Spacing scale
- Shadows and border radius
- Breakpoints for responsive design

All components use styled-components and access the theme via the `ThemeProvider`.

## Configuration

Edit `src/constants.js` to update:
- Memorial information (name, dates, portrait)
- Event details (date, time, address)
- YouTube video ID for livestream
- Program PDF path
- Gallery items (images and videos)

### Adding Gallery Items (CSV-Based)

The gallery now uses a CSV file for easy management of large collections (200+ items).

1. **Create/Edit `public/gallery.csv`** with your gallery metadata
2. **Place images/GIFs** in `public/images/` folder
3. **Format**: See `GALLERY_CSV_GUIDE.md` for detailed instructions

**Quick CSV Format:**
```csv
filename,type,alt,category,year,date,tags
image001.jpg,image,Family gathering,Family,2020,2020-05-15,"family,home"
memory001.gif,gif,Animated memory,Family,2018,2018-12-25,"family,christmas"
```

**Features:**
- Filter by category or year
- Sort by date, year, or filename
- Supports images (JPG, PNG) and GIFs
- Pagination for performance (24 items per page)
- See `GALLERY_CSV_GUIDE.md` for complete documentation

## All Milestones Complete! 🎉

The memorial site is now fully functional with:
- Hero section with memorial information
- Livestream countdown and video embed
- Event details with directions and program download
- Photo/video gallery with lightbox viewing
