# 💰 FinanceTracker - Premium Personal Finance Management

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**FinanceTracker** is a sleek, modern, and highly responsive personal finance management application. Built with a focus on user experience and aesthetic appeal, it provides a seamless way for individuals to take control of their financial life.

---

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [🎨 Design Aesthetics](#-design-aesthetics)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📂 Project Structure](#-project-structure)
- [🛡️ Data Privacy & Persistence](#️-data-privacy--persistence)
- [🎥 Demo & Screenshots](#-demo--screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

- **Personalized Dashboard**: A bird's-eye view of your financial health, displaying total balance, monthly income, and expenses at a glance.
- **Smart Budgeting**: Set monthly limits for different categories (Food, Shopping, Utilities, etc.) and track your progress in real-time.
- **Visual Analytics**: Interactive charts providing a 6-month breakdown of your spending habits and income trends.
- **Transaction History**: Detailed logs of every transaction with the ability to filter and search.
- **Dynamic Themes**: Personalized your experience with 7+ premium themes (Light, Dark, Rose, Ocean, Forest, Sunset, etc.).
- **Multi-Currency Support**: Switch between formats for PKR, USD, EUR, and more globally from your profile.
- **Fully Responsive**: Optimized for every screen size - from large desktop monitors to mobile phones.

---

## 🎨 Design Aesthetics

FinanceTracker isn't just a tool; it's an experience.
- **Glassmorphism**: Subtle translucent effects for a modern, airy feel.
- **Micro-Animations**: Smooth transitions and hover effects that make the interface feel alive.
- **Curated Palettes**: Hand-picked color schemes that reduce eye strain and highlight important data.
- **Modern Typography**: Using clean, readable fonts like *Inter* or *Outfit* for a premium look.

---

## 🛠️ Tech Stack

- **Backend**: [Laravel 11](https://laravel.com) (PHP 8.2+)
- **Frontend**: Bootstrap 5, Custom Vanilla CSS (Glassmorphism inspired)
- **Logic**: Vanilla JavaScript (ES6+)
- **Database**: MySQL (for user management) + Browser LocalStorage (for instant transaction persistence)
- **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## 🚀 Quick Start

### 1. Prerequisites
- **PHP** (>= 8.2)
- **Composer**
- **Node.js & NPM**
- **XAMPP / MySQL**

### 2. Setup
1. **Clone the Repo:**
   ```bash
   git clone https://github.com/AlishbaIqbal123/Finance-Tracker-basiclevel-
   cd Finance-Tracker-basiclevel-
   ```

2. **Install Dependencies:**
   ```bash
   composer install
   npm install && npm run build
   ```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`.
   - Configure your database in `.env`.
   ```bash
   php artisan key:generate
   ```

4. **Database Migration:**
   ```bash
   php artisan migrate
   ```

5. **Launch Application:**
   ```bash
   php artisan serve
   ```
   Visit: `http://127.0.0.1:8000`

---

## � Project Structure

```text
├── app/                # Main Laravel Logic (Controllers, Models)
├── public/
│   ├── css/            # Custom Stylesheets
│   ├── js/             # Frontend Logic (LocalStorage & API calls)
│   └── images/         # Static Assets
├── resources/
│   ├── views/          # Blade Templates (Dashboard, Analytics, etc.)
│   └── css/            # Vite source CSS
├── routes/             # Web Routes
└── database/           # Migrations and Seeders
```

---

## 🛡️ Data Privacy & Persistence

FinanceTracker uses a hybrid storage approach:
- **User Authentication**: Handled securely by Laravel.
- **Instant Persistence**: We use **Email-Keyed LocalStorage**. This means even if the server restarts, your transactions remain cached in your browser tied to your specific login. 
- **Privacy**: Your financial data is your own. The application is designed to keep data localized for speed and privacy.

---

## 🎥 Demo & Screenshots

> *Coming Soon!*
> I will be uploading a full video walkthrough and high-resolution screenshots here to showcase the app in action.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Created with ❤️ by [Alishba Iqbal](https://github.com/AlishbaIqbal123)
