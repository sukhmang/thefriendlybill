# Quick Start: Upload Images to CDN

## Step-by-Step Instructions

### 1. Sign Up for Cloudinary (Free)

Visit: https://cloudinary.com/users/register/free

- Free tier includes: 25GB storage, 25GB bandwidth/month
- No credit card required

### 2. Get Your Credentials

After signup, go to your Dashboard and find:
- **Cloud Name** (e.g., `dabc123`)
- **API Key** (e.g., `123456789012345`)
- **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

### 3. Install Cloudinary SDK

```bash
npm install cloudinary
```

### 4. Run the Upload Script

**Option A: With prompts (easiest)**
```bash
npm run upload-to-cdn
```
The script will ask for your credentials.

**Option B: With environment variables (more secure)**
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name \
CLOUDINARY_API_KEY=your-api-key \
CLOUDINARY_API_SECRET=your-api-secret \
npm run upload-to-cdn
```

### 5. Review and Apply CDN URLs

After upload completes:
1. Check `public/images/images.json.cdn` - it contains CDN URLs
2. If it looks good, replace the original:
   ```bash
   cp public/images/images.json.cdn public/images/images.json
   ```

### 6. Test Locally

```bash
npm run dev
```

Visit the gallery - images should load from Cloudinary CDN!

### 7. Deploy to Vercel

Your `public/` folder is now < 10MB - ready for Vercel! 🚀

---

## What the Script Does

1. ✅ Reads all images from `public/images/`
2. ✅ Uploads each image to Cloudinary
3. ✅ Generates CDN URLs for each image
4. ✅ Creates `images.json.cdn` with all CDN URLs
5. ✅ Backs up your original `images.json`

## Troubleshooting

**"Image already exists" errors?**
- This is normal! Cloudinary won't overwrite existing images
- The script will use the existing CDN URL

**Upload fails?**
- Check your credentials are correct
- Make sure you have internet connection
- Verify your Cloudinary account is active

**Want to re-upload?**
- Delete images from Cloudinary dashboard first, or
- The script will skip existing images automatically

