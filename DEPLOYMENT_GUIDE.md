# Finance Tracker - Free Deployment Guide

## 🚀 100% Free Deployment Options

This guide will help you deploy your Finance Tracker application completely free using modern hosting platforms.

---

## Option 1: Railway.app (Recommended - Easiest)

### ✅ Why Railway?
- **Free Tier**: $5 credit/month (enough for small projects)
- **MySQL Database**: Included for free
- **Easy Setup**: Automatic deployment from GitHub
- **No Credit Card Required** (initially)

### 📋 Steps to Deploy:

1. **Sign Up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Finance-Tracker` repository

3. **Add MySQL Database**
   - In your project, click "+ New"
   - Select "Database" → "MySQL"
   - Railway will automatically create a database

4. **Configure Environment Variables**
   - Click on your Laravel service
   - Go to "Variables" tab
   - Add these variables:
   ```
   APP_NAME=FinanceTracker
   APP_ENV=production
   APP_KEY=base64:MjHPVdGc3XMgJOPyZZyzjZwubvvaYCTH3dYqUHA4yyU=
   APP_DEBUG=false
   APP_URL=https://your-app-name.up.railway.app
   
   DB_CONNECTION=mysql
   DB_HOST=${{MySQL.MYSQL_HOST}}
   DB_PORT=${{MySQL.MYSQL_PORT}}
   DB_DATABASE=${{MySQL.MYSQL_DATABASE}}
   DB_USERNAME=${{MySQL.MYSQL_USER}}
   DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   
   SESSION_DRIVER=database
   CACHE_STORE=database
   QUEUE_CONNECTION=database
   ```

5. **Add Build Configuration**
   - Railway will auto-detect Laravel
   - It will run migrations automatically

6. **Deploy**
   - Railway will automatically deploy your app
   - You'll get a URL like: `https://your-app-name.up.railway.app`

---

## Option 2: Render.com + PlanetScale

### ✅ Why This Combo?
- **Render**: Free web hosting for Laravel
- **PlanetScale**: Free MySQL database (5GB storage)
- **Both**: No credit card required

### 📋 Steps to Deploy:

### Part A: Setup PlanetScale Database

1. **Create PlanetScale Account**
   - Go to [planetscale.com](https://planetscale.com)
   - Sign up with GitHub (free tier: 5GB storage)

2. **Create Database**
   - Click "New Database"
   - Name it: `finance-tracker`
   - Select region closest to you
   - Click "Create database"

3. **Get Connection String**
   - Go to "Connect" → "Create password"
   - Copy the connection details:
     - Host
     - Username
     - Password
     - Database name

### Part B: Deploy to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your `Finance-Tracker` repository
   - Configure:
     - **Name**: finance-tracker
     - **Environment**: Docker (or PHP if available)
     - **Build Command**: 
       ```bash
       composer install --no-dev --optimize-autoloader && php artisan config:cache && php artisan route:cache && php artisan view:cache
       ```
     - **Start Command**: 
       ```bash
       php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
       ```

3. **Add Environment Variables**
   ```
   APP_NAME=FinanceTracker
   APP_ENV=production
   APP_KEY=base64:MjHPVdGc3XMgJOPyZZyzjZwubvvaYCTH3dYqUHA4yyU=
   APP_DEBUG=false
   APP_URL=https://your-app-name.onrender.com
   
   DB_CONNECTION=mysql
   DB_HOST=<your-planetscale-host>
   DB_PORT=3306
   DB_DATABASE=finance-tracker
   DB_USERNAME=<your-planetscale-username>
   DB_PASSWORD=<your-planetscale-password>
   MYSQL_ATTR_SSL_CA=/etc/ssl/certs/ca-certificates.crt
   
   SESSION_DRIVER=database
   CACHE_STORE=database
   QUEUE_CONNECTION=database
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your app

---

## Option 3: Vercel + Supabase (PostgreSQL)

### ✅ Why This Combo?
- **Vercel**: Excellent for Laravel with serverless
- **Supabase**: Free PostgreSQL database (500MB)
- **Both**: Very generous free tiers

### 📋 Steps to Deploy:

### Part A: Setup Supabase Database

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (free tier: 500MB database)

2. **Create Project**
   - Click "New Project"
   - Name: `finance-tracker`
   - Set database password
   - Select region

3. **Get Connection Details**
   - Go to Settings → Database
   - Copy connection string (PostgreSQL)

### Part B: Update Laravel for PostgreSQL

1. **Update `.env` for PostgreSQL**:
   ```
   DB_CONNECTION=pgsql
   DB_HOST=<supabase-host>
   DB_PORT=5432
   DB_DATABASE=postgres
   DB_USERNAME=postgres
   DB_PASSWORD=<your-password>
   ```

2. **Install PostgreSQL Driver** (if not installed):
   ```bash
   composer require doctrine/dbal
   ```

### Part C: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json`** in your project root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/index.php",
         "use": "vercel-php@0.6.0"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/api/index.php"
       }
     ],
     "env": {
       "APP_ENV": "production",
       "APP_DEBUG": "false",
       "APP_URL": "https://your-app.vercel.app",
       "APP_CONFIG_CACHE": "/tmp/config.php",
       "APP_EVENTS_CACHE": "/tmp/events.php",
       "APP_PACKAGES_CACHE": "/tmp/packages.php",
       "APP_ROUTES_CACHE": "/tmp/routes.php",
       "APP_SERVICES_CACHE": "/tmp/services.php",
       "VIEW_COMPILED_PATH": "/tmp",
       "CACHE_DRIVER": "array",
       "LOG_CHANNEL": "stderr",
       "SESSION_DRIVER": "cookie"
     }
   }
   ```

3. **Create `api/index.php`**:
   ```php
   <?php
   
   require __DIR__ . '/../public/index.php';
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

---

## Option 4: Heroku (Classic Option)

### ✅ Why Heroku?
- **Free Tier**: Eco dynos ($5/month with 1000 free hours)
- **PostgreSQL**: Free tier included
- **Easy Laravel deployment**

### 📋 Steps to Deploy:

1. **Create Heroku Account**
   - Go to [heroku.com](https://heroku.com)
   - Sign up for free

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create Heroku App**
   ```bash
   heroku create finance-tracker-app
   ```

5. **Add PostgreSQL Database**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

6. **Set Environment Variables**
   ```bash
   heroku config:set APP_NAME=FinanceTracker
   heroku config:set APP_ENV=production
   heroku config:set APP_KEY=base64:MjHPVdGc3XMgJOPyZZyzjZwubvvaYCTH3dYqUHA4yyU=
   heroku config:set APP_DEBUG=false
   ```

7. **Update `Procfile`** (already exists in your project):
   ```
   web: vendor/bin/heroku-php-apache2 public/
   ```

8. **Deploy**
   ```bash
   git push heroku main
   ```

9. **Run Migrations**
   ```bash
   heroku run php artisan migrate --force
   ```

---

## 🎯 Recommended Choice

### For Beginners: **Railway.app**
- Easiest setup
- MySQL included
- Auto-deployment from GitHub
- Great free tier

### For Production: **Render + PlanetScale**
- More reliable
- Better performance
- Larger database (5GB)
- Professional-grade infrastructure

---

## 📊 Free Database Comparison

| Service | Type | Storage | Features |
|---------|------|---------|----------|
| **Railway MySQL** | MySQL | 1GB | Auto-backups, easy setup |
| **PlanetScale** | MySQL | 5GB | Branching, online schema changes |
| **Supabase** | PostgreSQL | 500MB | Real-time, Auth included |
| **Heroku Postgres** | PostgreSQL | 1GB | Reliable, well-documented |

---

## 🔧 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] `.env` file is configured correctly
- [ ] `APP_KEY` is generated (`php artisan key:generate`)
- [ ] Database migrations are ready
- [ ] `composer.json` has all dependencies
- [ ] `.gitignore` excludes `.env`, `vendor/`, `node_modules/`
- [ ] `APP_DEBUG=false` in production
- [ ] Storage and cache directories are writable

---

## 🚨 Important Notes

1. **Never commit `.env` file** - It contains sensitive data
2. **Use environment variables** - Set them in your hosting platform
3. **Run migrations** - Always run `php artisan migrate --force` after deployment
4. **Cache configuration** - Run these in production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

---

## 📞 Need Help?

If you encounter issues:
1. Check the hosting platform's logs
2. Verify environment variables are set correctly
3. Ensure database connection is working
4. Check Laravel logs in `storage/logs/`

---

## 🎉 After Deployment

Once deployed, your Finance Tracker will be accessible at:
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`
- Vercel: `https://your-app.vercel.app`
- Heroku: `https://finance-tracker-app.herokuapp.com`

Share the link and start tracking your finances! 💰
