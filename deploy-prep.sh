#!/bin/bash

# Finance Tracker - Deployment Preparation Script
# This script prepares your Laravel app for deployment

echo "🚀 Preparing Finance Tracker for Deployment..."
echo ""

# 1. Install dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

# 2. Clear all caches
echo "🧹 Clearing caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 3. Generate application key if not set
echo "🔑 Checking application key..."
php artisan key:generate --show

# 4. Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# 5. Seed database (optional)
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    php artisan db:seed
fi

# 6. Optimize for production
echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 7. Set proper permissions
echo "🔒 Setting storage permissions..."
chmod -R 775 storage bootstrap/cache

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Choose a hosting platform (see DEPLOYMENT_GUIDE.md)"
echo "2. Set up your database"
echo "3. Configure environment variables"
echo "4. Deploy your application"
echo ""
echo "📖 Read DEPLOYMENT_GUIDE.md for detailed instructions"
