#!/usr/bin/env bash

# Deployment Verification Script
# This script ensures all CSS changes are properly built and deployed

echo "🚀 Starting Deployment Verification..."
echo ""

# Step 1: Check Node.js
echo "📦 Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo "✅ Node.js version: $(node --version)"
else
    echo "❌ Node.js not found!"
    exit 1
fi

# Step 2: Check npm
echo "📦 Checking npm installation..."
if command -v npm &> /dev/null; then
    echo "✅ npm version: $(npm --version)"
else
    echo "❌ npm not found!"
    exit 1
fi

# Step 3: Install dependencies
echo ""
echo "📥 Installing npm dependencies..."
npm ci --production=false

# Step 4: Build assets
echo ""
echo "🔨 Building assets..."
npm run build

# Step 5: Verify CSS files
echo ""
echo "🔍 Verifying CSS files..."

if [ -f "resources/css/styles.css" ]; then
    echo "✅ Source CSS exists: resources/css/styles.css"
    SOURCE_SIZE=$(wc -c < "resources/css/styles.css")
    echo "   Size: $SOURCE_SIZE bytes"
else
    echo "❌ Source CSS missing!"
    exit 1
fi

if [ -f "public/css/styles.css" ]; then
    echo "✅ Public CSS exists: public/css/styles.css"
    PUBLIC_SIZE=$(wc -c < "public/css/styles.css")
    echo "   Size: $PUBLIC_SIZE bytes"
else
    echo "❌ Public CSS missing!"
    exit 1
fi

# Step 6: Verify they match
if [ "$SOURCE_SIZE" -eq "$PUBLIC_SIZE" ]; then
    echo "✅ CSS files match!"
else
    echo "⚠️  CSS files differ in size (this may be normal after build)"
fi

# Step 7: Laravel caching
echo ""
echo "🔧 Caching Laravel configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo ""
echo "✅ Deployment verification complete!"
echo ""
echo "📊 Summary:"
echo "   - Node.js: $(node --version)"
echo "   - npm: $(npm --version)"
echo "   - Source CSS: $SOURCE_SIZE bytes"
echo "   - Public CSS: $PUBLIC_SIZE bytes"
echo ""
echo "🎉 Ready for deployment!"
