# Frontend Deployment Guide - AWS Amplify

## Overview
This frontend folder contains all the static files needed for the Slack Time Tracker dashboard. It's designed to be deployed on AWS Amplify.

## Prerequisites
- AWS Account with Amplify access
- Git repository connected to your project

## Deployment Steps

### 1. Connect Repository to Amplify
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Choose your Git provider (GitHub, GitLab, etc.)
4. Select your repository
5. **Important**: Set the root directory to `/frontend`

### 2. Build Settings
The `amplify.yml` file is already configured with:
- Node.js 18.x
- Build command: `npm run build`
- Output directory: `dist`

### 3. Environment Variables
Set these in Amplify Console → App settings → Environment variables:
```
NODE_ENV=production
```

### 4. Deploy
1. Amplify will automatically build and deploy on every push to your main branch
2. Monitor the build logs in the Amplify Console
3. Your app will be available at the provided Amplify domain

## Build Process
The build script (`build.js`) will:
1. Clean the `dist` directory
2. Copy all HTML files
3. Copy JavaScript files (excluding build script)
4. Copy public assets
5. Create a default index.html if none exists

## Troubleshooting
- If build fails, check the build logs in Amplify Console
- Ensure all dependencies are properly installed
- Verify the build script has proper permissions

## Post-Deployment
After successful deployment:
1. Note your Amplify domain
2. Update backend configuration to point to this frontend
3. Test all dashboard pages
4. Monitor for any CORS issues
