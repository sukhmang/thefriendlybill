# Video Hosting Guide

## Why Host Videos Externally?

- **Vercel Limits**: Free tier has ~250MB deployment limit
- **GitHub Limits**: 100MB per file, warnings at 1GB total
- **Current Size**: 307MB (already risky for Vercel)
- **Videos**: Large files that don't benefit from thumbnails

## Solution: Hybrid Approach

**Keep images locally** (with thumbnails) → **Host videos externally** (CDN)

## Step 1: Choose a Video Host

### Option A: Cloudinary (Recommended - Free Tier)
- **Free Tier**: 25GB storage, 25GB bandwidth/month
- **Features**: Automatic video optimization, thumbnails, transformations
- **Sign up**: https://cloudinary.com/users/register/free

### Option B: AWS S3 + CloudFront
- **Free Tier**: 5GB storage, 20GB transfer/month (first year)
- **More setup required**, but very scalable

### Option C: Vimeo/YouTube (Unlisted)
- **Free**: Unlimited storage
- **Limitation**: Less control over embedding, branding

## Step 2: Upload Videos to CDN

### If using Cloudinary:

1. **Sign up** at https://cloudinary.com
2. **Upload videos** via dashboard or API
3. **Get URLs** for each video (format: `https://res.cloudinary.com/YOUR_CLOUD/video/upload/v1234567890/video.mp4`)

### If using S3:

1. **Create S3 bucket** (make it public or use CloudFront)
2. **Upload videos**
3. **Get URLs** (format: `https://your-bucket.s3.amazonaws.com/video.mp4`)

## Step 3: Update `images.json`

Your gallery **already supports CDN URLs**! Just add the full URL to `images.json`:

**Before (local):**
```json
[
  "video1.mp4",
  "image1.jpg"
]
```

**After (hybrid):**
```json
[
  "https://res.cloudinary.com/YOUR_CLOUD/video/upload/v1234567890/video1.mp4",
  "image1.jpg",
  "https://res.cloudinary.com/YOUR_CLOUD/video/upload/v1234567890/video2.mp4",
  "image2.jpg"
]
```

The gallery code automatically detects URLs starting with `http://` or `https://` and treats them as external.

## Step 4: Update `gallery.csv` (Optional)

If you want to track CDN URLs in your CSV:

```csv
filename,type,alt,category,year,date,tags,default_sort
https://res.cloudinary.com/.../video1.mp4,video,video1,,,,,5
image1.jpg,image,image1,,,,,10
```

## Step 5: Remove Videos from `public/images/`

After uploading to CDN and updating `images.json`:

1. **Delete video files** from `public/images/`
2. **Run sync script**:
   ```bash
   npm run sync-gallery
   ```
   This will:
   - Remove videos from `gallery.csv`
   - Keep images and thumbnails
   - Update `images.json` (but keep CDN URLs)

## Benefits

✅ **Smaller repo**: Only images + thumbnails (~50-100MB)
✅ **Faster deployments**: Vercel builds quickly
✅ **Better performance**: CDN serves videos faster globally
✅ **No code changes**: Gallery already supports this!
✅ **Scalable**: Add unlimited videos without repo bloat

## Example Workflow

1. **Upload 10 new videos to Cloudinary** → Get 10 URLs
2. **Add URLs to `images.json`**:
   ```json
   [
     ...existing images...,
     "https://res.cloudinary.com/.../new-video-1.mp4",
     "https://res.cloudinary.com/.../new-video-2.mp4",
     ...
   ]
   ```
3. **Update `gallery.csv`** (optional, for metadata):
   ```csv
   https://res.cloudinary.com/.../new-video-1.mp4,video,new-video-1,,,,,100
   ```
4. **Run sync script**:
   ```bash
   npm run sync-gallery
   ```
5. **Deploy**: Your repo stays small, videos load from CDN!

## Troubleshooting

**Q: Will videos autoplay in grid view?**
A: Yes, if the CDN URL is accessible and CORS-enabled.

**Q: Can I use thumbnails for videos?**
A: Yes! Cloudinary can generate video thumbnails. Update the code to use thumbnail URLs for videos.

**Q: What if I want to switch back to local videos?**
A: Just replace CDN URLs in `images.json` with filenames and add files to `public/images/`.

