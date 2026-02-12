# 💎 FinanceTracker — Professional AI-Powered Wealth Management

FinanceTracker is a premium personal finance application built with **Laravel** and **PostgreSQL (Neon.tech)**. It features a sophisticated, elegant UI designed with Glassmorphism principles, micro-animations, and a mobile-first philosophy to provide a seamless financial management experience.

---

## ✨ Features

### 🚀 Performance & Connectivity
- **Cloud-Native Database**: Powered by **Neon.tech (PostgreSQL)** for near-instant data persistence.
- **Blinking Speed**: Optimized database queries and local file caching for sub-100ms response times.
- **Direct IPv4 Support**: Stable connections across all internet providers.

### 🎨 Elegant Design System
- **Glassmorphism UI**: Beautiful frosted-glass effects on the header and sidebar.
- **Theme Engine**: 7+ premium color palettes with persistent Dark/Light mode.
- **AI-Inspired Aesthetics**: Smooth gradients, subtle glows, and sophisticated typography using 'Outfit'.
- **Fully Animated**: Entrance animations (fade/slide) and micro-interactions for every button.

### 📊 Wealth Management
- **Intelligent Dashboard**: Real-time balance tracking and recent activity.
- **Budget Intelligence**: Set categorical limits and track progress with visual indicators.
- **Deep Analytics**: Category-wise spending breakdowns and trend analysis via interactive charts.
- **Mobile First**: Optimized "Bottom Navigation" and "Quick Action" buttons for one-handed phone use.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Laravel 11 (PHP 8.2) |
| **Database** | Neon.tech (PostgreSQL) |
| **Frontend** | Bootstrap 5, Animate.css, Glassmorphism CSS |
| **Icons** | Bootstrap Icons, Google Fonts (Outfit) |
| **Charts** | Chart.js 4.x |

---

## 🚀 Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & NPM

### Setup Instructions

1. **Clone & Install**
   ```bash
   git clone https://github.com/AlishbaIqbal123/Finance-Tracker.git
   cd Finance-Tracker
   composer install && npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Connectivity**
   Update your `.env` with your Neon.tech credentials:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=ep-your-endpoint.ap-southeast-1.aws.neon.tech
   DB_PORT=5432
   DB_DATABASE=neondb
   DB_USERNAME=neondb_owner
   DB_PASSWORD="endpoint=ep-your-endpoint;your_password"
   ```

4. **Initialize App**
   ```bash
   php artisan migrate --force
   php artisan serve
   ```

---

## 📱 Mobile-First Experience
FinanceTracker is built with mobile users in mind:
- **Floating Action Button (FAB)**: Add transactions instantly from your thumb.
- **Bottom Navigation**: Quick access to Home, Transactions, and Analytics.
- **Responsive Layout**: Adapts perfectly from a 4-inch iPhone to a 32-inch 4K monitor.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Take control of your financial destiny with FinanceTracker.*
