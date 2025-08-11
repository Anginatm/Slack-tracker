# 🚀 AWS Amplify Deployment Guide

## 🚨 Issue: "Artifact directory doesn't exist: dist"

### **Problem**
AWS Amplify is looking for a `dist` directory that doesn't exist because your project is a Node.js application that serves files directly.

### **Solution**
We need to create a build process that generates the `dist` directory with all necessary files.

## 🔧 **Step-by-Step Fix**

### **Step 1: Choose Your Configuration**

You have 3 options for Amplify configuration:

#### **Option A: Standard Frontend (Recommended)**
- Use: `amplify.yml`
- Best for: Most web applications

#### **Option B: Node.js Application**
- Use: `amplify-nodejs.yml`
- Best for: Full Node.js applications

#### **Option C: Static Site**
- Use: `amplify-static.yml`
- Best for: Static HTML/CSS/JS sites

### **Step 2: Configure Amplify**

1. **In AWS Amplify Console:**
   - Go to your app → Build settings
   - Click "Edit" on the build settings
   - Replace the build specification with one of the configurations above

2. **Or rename the file:**
   ```bash
   # Choose one of these:
   cp amplify.yml amplify.yml.backup
   # or
   cp amplify-nodejs.yml amplify.yml
   # or
   cp amplify-static.yml amplify.yml
   ```

### **Step 3: Test Build Locally**

Before deploying, test the build process:

```bash
# Windows
build.bat

# Or manually
npm run build
```

This should create a `dist` directory with all your files.

### **Step 4: Deploy**

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix Amplify deployment - add build configuration"
   git push
   ```

2. **Monitor the build in Amplify Console**

## 📋 **Configuration Details**

### **amplify.yml (Standard)**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

### **amplify-static.yml (Static Site)**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

## 🔍 **Troubleshooting**

### **If Build Still Fails:**

1. **Check Build Logs:**
   - Go to Amplify Console → Builds
   - Click on the failed build
   - Check the build logs for specific errors

2. **Common Issues:**
   - **Missing dependencies:** Ensure `package.json` has all required dependencies
   - **Build script fails:** Test `npm run build` locally first
   - **File permissions:** Ensure all files are committed to git

3. **Alternative Approach:**
   If the build still fails, you can manually create the dist directory:
   ```bash
   mkdir dist
   cp -r *.html *.js *.json *.md dist/
   cp -r public dist/ 2>/dev/null || true
   cp -r api dist/ 2>/dev/null || true
   ```

### **Environment Variables**

If your app needs environment variables:

1. **In Amplify Console:**
   - Go to Environment variables
   - Add your variables (e.g., `SLACK_TOKEN`)

2. **In build script:**
   ```yaml
   build:
     commands:
       - echo "Setting up environment..."
       - echo "SLACK_TOKEN=$SLACK_TOKEN" > .env
       - npm run build
   ```

## 🎯 **Quick Fix Commands**

### **For Windows:**
```bash
# Test build locally
build.bat

# Or manually
npm run build

# Check if dist directory exists
dir dist
```

### **For Linux/Mac:**
```bash
# Test build locally
npm run build

# Check if dist directory exists
ls -la dist/
```

## 📊 **Expected Result**

After successful deployment, you should see:

1. ✅ **Build succeeds** in Amplify Console
2. ✅ **dist directory created** with all files
3. ✅ **Application accessible** at your Amplify URL
4. ✅ **All dashboards working:**
   - Team Overview: `https://your-app.amplifyapp.com/`
   - Individual: `https://your-app.amplifyapp.com/individual`
   - Test Server: `https://your-app.amplifyapp.com/test-server`

## 🔄 **Next Steps After Deployment**

1. **Test all dashboards** at your Amplify URL
2. **Set up environment variables** if needed
3. **Configure custom domain** if desired
4. **Set up automatic deployments** from your git repository

---

**🎯 Most Common Solution:** Use `amplify.yml` configuration and ensure `npm run build` creates the `dist` directory successfully.
