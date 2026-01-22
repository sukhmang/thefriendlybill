# CDN Setup Guide for Vercel Deployment

## Step 1: Create Cloudinary Account (Free)

1. Go to https://cloudinary.com/users/register/free
2. Sign up with your email (free tier includes 25GB storage)
3. After signup, you'll see your **Cloud Name**, **API Key**, and **API Secret** in the Dashboard

## Step 2: Get Your Cloudinary Credentials

1. Log into Cloudinary Dashboard
2. Go to **Settings** → **Security** (or check the Dashboard homepage)
3. Copy these values:
   - **Cloud Name** (e.g., `dabc123`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

## Step 3: Install Cloudinary SDK

Run this command in your project:

```bash
npm install cloudinary
```

## Step 4: Upload Images to Cloudinary

I'll create a script that:
- Uploads all images from `public/images/` to Cloudinary
- Generates a new `images.json` with CDN URLs
- Keeps your original files as backup

## Step 5: Update Gallery Component

The Gallery component will automatically work with CDN URLs - no changes needed!

## Step 6: Clean Up Public Folder

After upload, you can:
- Keep images locally as backup (recommended)
- Or remove them to reduce deployment size

---

## Quick Start

Once you have your Cloudinary credentials:

1. **Install Cloudinary**: `npm install cloudinary`
2. **Set credentials** (see script instructions below)
3. **Run upload script**: `npm run upload-to-cdn`
4. **Deploy to Vercel**: Your `public/` folder will be < 10MB!

---

## Security Note

**Never commit your API Secret to Git!** The upload script will use environment variables or prompt you for credentials.

