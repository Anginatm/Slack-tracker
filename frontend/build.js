const fs = require('fs-extra');
const path = require('path');

async function build() {
  console.log('🚀 Starting frontend build...');
  
  const distDir = path.join(__dirname, 'dist');
  
  try {
    // Clean dist directory
    if (await fs.pathExists(distDir)) {
      await fs.remove(distDir);
    }
    await fs.ensureDir(distDir);
    
    console.log('📁 Copying HTML files...');
    const htmlFiles = await fs.readdir(__dirname);
    for (const file of htmlFiles) {
      if (file.endsWith('.html')) {
        await fs.copy(path.join(__dirname, file), path.join(distDir, file));
        console.log(`  ✅ Copied ${file}`);
      }
    }
    
    console.log('📁 Copying JavaScript files...');
    const jsFiles = await fs.readdir(__dirname);
    for (const file of jsFiles) {
      if (file.endsWith('.js') && file !== 'build.js') {
        await fs.copy(path.join(__dirname, file), path.join(distDir, file));
        console.log(`  ✅ Copied ${file}`);
      }
    }
    
    console.log('📁 Copying public directory...');
    const publicDir = path.join(__dirname, '..', 'public');
    if (await fs.pathExists(publicDir)) {
      await fs.copy(publicDir, path.join(distDir, 'public'));
      console.log('  ✅ Copied public directory');
    }
    
    console.log('📁 Copying CSS and assets...');
    const cssFiles = await fs.readdir(__dirname);
    for (const file of cssFiles) {
      if (file.endsWith('.css') || file.endsWith('.ico') || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg')) {
        await fs.copy(path.join(__dirname, file), path.join(distDir, file));
        console.log(`  ✅ Copied ${file}`);
      }
    }
    
    // Create a simple index.html if none exists
    if (!await fs.pathExists(path.join(distDir, 'index.html'))) {
      const defaultIndex = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slack Time Tracker</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        .card { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .btn { background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Slack Time Tracker</h1>
        <div class="card">
            <h2>Frontend Successfully Deployed!</h2>
            <p>This frontend is now running on AWS Amplify. The backend should be deployed separately on EC2.</p>
            <p>Available dashboards:</p>
            <a href="dashboard-enhanced.html" class="btn">Enhanced Dashboard</a>
            <a href="dashboard-simple.html" class="btn">Simple Dashboard</a>
            <a href="dashboard-mobile-enhanced.html" class="btn">Mobile Dashboard</a>
            <a href="all-users-dashboard.html" class="btn">All Users Dashboard</a>
        </div>
    </div>
</body>
</html>`;
      await fs.writeFile(path.join(distDir, 'index.html'), defaultIndex);
      console.log('  ✅ Created default index.html');
    }
    
    console.log('🎉 Frontend build completed successfully!');
    console.log(`📂 Files are ready in: ${distDir}`);
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
