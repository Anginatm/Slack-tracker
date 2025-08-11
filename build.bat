@echo off
echo Creating dist directory...
if exist dist rmdir /s /q dist
mkdir dist

echo Copying HTML files...
copy *.html dist\

echo Copying JavaScript files...
copy *.js dist\

echo Copying JSON files...
copy *.json dist\

echo Copying Markdown files...
copy *.md dist\

echo Copying directories...
if exist public xcopy public dist\public\ /e /i /y
if exist api xcopy api dist\api\ /e /i /y
if exist netlify xcopy netlify dist\netlify\ /e /i /y

echo Build completed successfully!
echo Files are ready in dist\ directory
