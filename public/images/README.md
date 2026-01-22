# Gallery Images

## How to Add Images

1. **Place your images** in this folder (`public/images/`)
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

## Tips

- **Naming**: Use descriptive filenames (they'll be used as alt text)
- **Organization**: Keep all images in this folder
- **Performance**: Images are lazy-loaded (only load when scrolled into view)
- **Pagination**: Gallery shows 24 images per page automatically

## Example `images.json`

```json
[
  "family-photo-2020.jpg",
  "wedding-celebration.jpg",
  "memory-animation.gif",
  "travel-photo-2019.jpg"
]
```

## Note

The gallery uses intelligent lazy loading with Intersection Observer API, so users won't download all images at once. Images only load when they're about to enter the viewport (50px before).

