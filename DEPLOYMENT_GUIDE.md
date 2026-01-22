# Deployment Guide for Vercel

## ⚠️ Current Issue: Large Public Folder

Your `public/` folder is **3GB**, which exceeds Vercel's deployment limits:
- **Free Tier**: 100MB deployment size limit
- **Pro Tier**: 1GB deployment size limit
- **Enterprise**: Custom limits (but 3GB is still very large)

## Solutions

### Option 1: Use a CDN for Images (Recommended)

Move your images to a CDN service and update the image URLs:

**Recommended Services:**
- **Cloudinary** (Free tier: 25GB storage, 25GB bandwidth/month)
- **ImageKit** (Free tier: 20GB storage)
- **Cloudflare Images** (Pay-as-you-go)
- **AWS S3 + CloudFront** (Pay-as-you-go)

**Steps:**
1. Upload images to CDN
2. Update `images.json` to use CDN URLs instead of local paths
3. Keep only essential files in `public/` (portrait.png, program.pdf)

### Option 2: Optimize Images Before Upload

Reduce image sizes significantly:
- Compress JPGs (aim for 80-90% quality)
- Optimize GIFs (reduce frame count, lower resolution)
- Use WebP format where possible
- Target: < 500KB per image on average

**Tools:**
- ImageOptim (Mac)
- Squoosh.app (Web)
- Sharp (CLI/Node.js)

### Option 3: Use Vercel Blob Storage

Vercel offers Blob Storage for large files:
- Store images in Vercel Blob
- Reference via URLs
- Better for deployment size limits

### Option 4: Hybrid Approach

- Keep small files in `public/` (portrait, PDF)
- Use CDN for gallery images
- Update Gallery component to load from CDN URLs

## Quick Fix: Update Gallery to Support CDN URLs

The Gallery component can easily be updated to support CDN URLs. Just update `images.json`:

```json
[
  "https://your-cdn.com/images/image001.jpg",
  "https://your-cdn.com/images/image002.jpg"
]
```

## Recommended Action Plan

1. **Immediate**: Move gallery images to Cloudinary (free tier)
2. **Update**: Modify `images.json` to use CDN URLs
3. **Deploy**: Your `public/` folder will be < 10MB (just portrait + PDF)
4. **Result**: Fast deployment, better performance, CDN caching

## Vercel Deployment Checklist

- [ ] Reduce `public/` folder to < 100MB (or use CDN)
- [ ] Test build locally: `npm run build`
- [ ] Check build output size
- [ ] Set up environment variables if needed
- [ ] Deploy to Vercel

## Build Command

Vercel will automatically detect Vite and use:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Need Help?

If you want help setting up Cloudinary or another CDN, I can:
1. Create a script to upload images to CDN
2. Update the Gallery component to support CDN URLs
3. Update `images.json` format for CDN

