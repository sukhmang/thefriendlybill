# Cloudinary Setup Guide

## Quick Start

1. **Sign up** at https://cloudinary.com (free tier available)
2. **Get credentials** from https://console.cloudinary.com/settings/api-keys
3. **Create `.env` file** in project root:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Upload videos** to Cloudinary (via dashboard or API)
5. **Run sync**: `npm run sync-gallery`

That's it! The sync script will automatically fetch all videos from Cloudinary and add them to your gallery.

## How It Works

### Hybrid Approach

- **Local Images**: Stored in `public/images/` with thumbnails
- **Cloudinary Videos**: Hosted externally, fetched via API

### Automatic Sync

The `sync-gallery` script now:
1. Scans `public/images/` for local files
2. Queries Cloudinary API for all videos
3. Updates `gallery.csv` with both sources
4. Generates thumbnails for local images only
5. Syncs `images.json` from CSV

### CSV Format

The `gallery.csv` file now supports both:

**Local files:**
```csv
filename,type,alt,...
image1.jpg,image,image1,...
```

**Cloudinary URLs:**
```csv
filename,type,alt,...
https://res.cloudinary.com/your-cloud/video/upload/v123/video1.mp4,video,video1,...
```

The script automatically detects which is which by checking if the filename starts with `http://` or `https://`.

## Benefits

✅ **Smaller repo**: Only images + thumbnails (~50-100MB)
✅ **Faster deployments**: Vercel builds quickly
✅ **Better performance**: CDN serves videos faster globally
✅ **No code changes**: Gallery already supports Cloudinary URLs
✅ **Scalable**: Add unlimited videos without repo bloat
✅ **Automatic sync**: One command syncs everything

## Workflow

### Adding New Videos

1. Upload video to Cloudinary (via dashboard or API)
2. Run `npm run sync-gallery`
3. Video automatically appears in gallery!

### Removing Videos

1. Delete video from Cloudinary dashboard
2. Run `npm run sync-gallery`
3. Video automatically removed from CSV and `images.json`

### Adding New Images

1. Add image to `public/images/`
2. Run `npm run sync-gallery`
3. Image added to CSV, thumbnail generated, `images.json` updated!

## Troubleshooting

**Q: Script says "Cloudinary configuration missing"**
A: Create `.env` file with your Cloudinary credentials (see Quick Start)

**Q: Videos not appearing in gallery**
A: Make sure videos are uploaded to Cloudinary and credentials are correct. Check with:
```bash
node scripts/fetch-cloudinary-videos.js
```

**Q: Can I use Cloudinary for images too?**
A: Yes! The gallery code supports Cloudinary URLs for images. Just add the URL to `images.json` or let the sync script handle it.

**Q: What if I want to switch back to local videos?**
A: Just replace Cloudinary URLs in `gallery.csv` with filenames and add files to `public/images/`. Run `npm run sync-gallery` to sync.

## Free Tier Limits

- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: 25,000/month

Perfect for most memorial sites!

