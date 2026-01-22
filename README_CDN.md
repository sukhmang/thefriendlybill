# 🚀 CDN Setup - Quick Steps

## What You Need to Do

### Step 1: Sign Up for Cloudinary (2 minutes)
1. Go to: https://cloudinary.com/users/register/free
2. Sign up (free, no credit card needed)
3. After signup, note your credentials from the Dashboard:
   - **Cloud Name**
   - **API Key** 
   - **API Secret**

### Step 2: Install Cloudinary (30 seconds)
```bash
npm install cloudinary
```

### Step 3: Upload Images (5-10 minutes)
```bash
npm run upload-to-cdn
```

The script will:
- Ask for your Cloudinary credentials (or use environment variables)
- Upload all 80 images to Cloudinary
- Generate `images.json.cdn` with CDN URLs

### Step 4: Apply CDN URLs (10 seconds)
```bash
cp public/images/images.json.cdn public/images/images.json
```

### Step 5: Test & Deploy
```bash
npm run dev
```

Visit the gallery - images should load from CDN!

Then deploy to Vercel - your `public/` folder is now < 10MB! ✅

---

## Using Environment Variables (Optional)

If you prefer not to type credentials each time:

```bash
export CLOUDINARY_CLOUD_NAME="your-cloud-name"
export CLOUDINARY_API_KEY="your-api-key"
export CLOUDINARY_API_SECRET="your-api-secret"
npm run upload-to-cdn
```

---

## What Happens to Your Local Images?

- ✅ Your local images stay in `public/images/` (as backup)
- ✅ Gallery will use CDN URLs from `images.json`
- ✅ You can delete local images later if you want (to reduce repo size)

---

## Need Help?

See `CDN_QUICK_START.md` for detailed instructions.

