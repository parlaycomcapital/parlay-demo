# 🚀 Deployment Guide for Parlay.sk

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy your project:**

   ```bash
   vercel
   ```

4. **Set environment variables:**

   ```bash
   vercel env add PASSWORD_PROTECTION
   # Enter: true

   vercel env add PREVIEW_PASSWORD
   # Enter: parlay2024 (or your custom password)
   ```

5. **Your site will be live at:** `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com) and sign up/login**
2. **Click "New Project"**
3. **Import your Git repository** (if you have one) or **upload your project folder**
4. **Configure environment variables:**
   - `PASSWORD_PROTECTION` = `true`
   - `PREVIEW_PASSWORD` = `parlay2024` (or your custom password)
5. **Click "Deploy"**

### Option 3: Deploy via GitHub (Best for ongoing development)

1. **Push your code to GitHub**
2. **Connect your GitHub repo to Vercel**
3. **Vercel will auto-deploy on every push**

## 🔐 Password Protection

The site is protected with a preview password system:

- **Default password:** `parlay2024`
- **Customize:** Change `PREVIEW_PASSWORD` environment variable
- **Disable:** Set `PASSWORD_PROTECTION` to `false`

## 🌐 Alternative Deployment Options

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Railway

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Railway auto-detects Next.js and deploys

### DigitalOcean App Platform

1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create new app
3. Connect your repository
4. Set build command: `npm run build`

## 📱 Testing Your Deployment

1. **Visit your deployed URL**
2. **You should see the password login page**
3. **Enter password:** `parlay2024`
4. **You'll be redirected to the main site**

## 🛠️ Troubleshooting

- **Password not working?** Check environment variables are set correctly
- **Build errors?** Make sure all dependencies are in `package.json`
- **Styling issues?** Ensure Tailwind CSS is properly configured

## 🔄 Updates

To update your deployed site:

- **Vercel CLI:** Run `vercel --prod`
- **GitHub connected:** Just push to your repository
- **Manual:** Re-upload your project folder

---

**Your Parlay.sk preview is ready to share! 🎉**
