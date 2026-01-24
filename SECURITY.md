# Security Guide - Cloudinary Credentials

## ⚠️ Important Security Notes

**NEVER commit your Cloudinary API secret to git!**

Your API secret is like a password - if someone gets it, they can:
- Upload/delete files from your Cloudinary account
- Use up your bandwidth quota
- Access your account

## ✅ Current Security Setup

Your project is configured securely:

1. **`.env` file is in `.gitignore`** - Won't be committed to git
2. **No hardcoded credentials** - All credentials come from environment variables
3. **Local development only** - Scripts only run on your machine (not in browser)

## 🔐 Setting Up Credentials

### Local Development

1. **Create `.env` file** in project root:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your actual credentials:
   ```env
   CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   CLOUDINARY_API_KEY=your_actual_api_key
   CLOUDINARY_API_SECRET=your_actual_api_secret
   ```

3. **Verify `.env` is ignored**:
   ```bash
   git status
   # Should NOT show .env file
   ```

### Production (Vercel)

For production deployments, set environment variables in Vercel:

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Add these variables**:
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret

3. **Important**: These are only needed if you run sync scripts on Vercel
   - **For static sites**: You typically don't need these in production
   - **Scripts run locally**: Sync scripts are meant to run on your machine, not on Vercel

## 🛡️ Best Practices

### ✅ DO:
- Keep `.env` file local only
- Use Vercel environment variables for production secrets
- Rotate API secrets if accidentally exposed
- Use different Cloudinary accounts for dev/prod if possible

### ❌ DON'T:
- Commit `.env` to git
- Share API secrets in chat/email
- Hardcode credentials in source code
- Use production secrets in development

## 🔍 Verifying Security

Check that `.env` is ignored:
```bash
git check-ignore .env
# Should output: .env
```

Check for accidental commits:
```bash
git log --all --full-history -- .env
# Should output nothing (no commits found)
```

## 🚨 If Credentials Are Exposed

If you accidentally commit credentials:

1. **Immediately rotate** your Cloudinary API secret:
   - Go to https://console.cloudinary.com/settings/api-keys
   - Click "Reset API Secret"
   - Update your `.env` file with new secret

2. **Remove from git history** (if needed):
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force push** (coordinate with team first!):
   ```bash
   git push origin --force --all
   ```

## 📝 Notes

- **API Key**: Can be public (used in client-side code)
- **API Secret**: MUST be private (server-side only)
- **Cloud Name**: Can be public (used in URLs)

For this project:
- Scripts run **locally** (on your machine)
- Credentials are **never sent to browser**
- Gallery code uses **public URLs** (no credentials needed in frontend)

## ✅ Summary

Your setup is secure! Just:
1. Create `.env` file locally (not in git)
2. Add credentials to Vercel environment variables (if needed)
3. Never commit `.env` to git

The code is already configured correctly - just add your credentials to `.env` and you're good to go!

