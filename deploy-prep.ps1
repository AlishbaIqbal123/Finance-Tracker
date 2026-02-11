# Finance Tracker - Deployment Preparation Script (Windows)
# This script prepares your Laravel app for deployment

Write-Host "🚀 Preparing Finance Tracker for Deployment..." -ForegroundColor Cyan
Write-Host ""

# 1. Install dependencies
Write-Host "📦 Installing Composer dependencies..." -ForegroundColor Yellow
composer install --no-dev --optimize-autoloader

# 2. Clear all caches
Write-Host "🧹 Clearing caches..." -ForegroundColor Yellow
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 3. Generate application key if not set
Write-Host "🔑 Checking application key..." -ForegroundColor Yellow
php artisan key:generate --show

# 4. Run migrations
Write-Host "🗄️  Running database migrations..." -ForegroundColor Yellow
php artisan migrate --force

# 5. Seed database (optional)
$seed = Read-Host "Do you want to seed the database with sample data? (y/n)"
if ($seed -eq "y" -or $seed -eq "Y") {
    php artisan db:seed
}

# 6. Optimize for production
Write-Host "⚡ Optimizing for production..." -ForegroundColor Yellow
php artisan config:cache
php artisan route:cache
php artisan view:cache

Write-Host ""
Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Choose a hosting platform (see DEPLOYMENT_GUIDE.md)"
Write-Host "2. Set up your database"
Write-Host "3. Configure environment variables"
Write-Host "4. Deploy your application"
Write-Host ""
Write-Host "📖 Read DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
