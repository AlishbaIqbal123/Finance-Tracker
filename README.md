# Finance Tracker

A comprehensive personal finance management application built with Laravel that helps users track income, expenses, create budgets, and visualize their financial data with beautiful analytics.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Theme Functionality](#theme-functionality)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Finance Tracker is a web-based personal finance management system designed to help individuals track their income and expenses, create and manage budgets, and gain insights into their spending patterns. The application provides an intuitive dashboard with real-time financial summaries, detailed transaction management, comprehensive budget tracking, and interactive analytics.

The application features a modern, responsive design with multiple theme options and supports multiple currencies with PKR as the default. Built with Laravel and Bootstrap, it offers a seamless user experience across all devices.

## Features

### Dashboard Overview
- Real-time financial summaries with total income, expenses, and balance
- Quick action buttons for adding income and expenses
- Visual spending charts and budget progress indicators
- Recent transactions overview

### Transaction Management
- **Add Transactions**: Create income and expense records with title, amount, category, description, and date
- **Edit Transactions**: Update existing transaction details
- **Delete Transactions**: Remove transactions with confirmation
- **Filter & Search**: Filter transactions by type, category, month, and amount range
- **Categorization**: Predefined categories for income and expenses

### Budget Tracking
- Create monthly budgets for different spending categories
- Track budget progress with visual indicators
- View remaining budget amounts
- Manage budget allocations

### Analytics & Reporting
- Visual charts showing spending by category
- Expense and income trends
- Budget vs. actual spending comparisons
- Monthly financial summaries

### Theme Switching
- Multiple theme options including light, dark, and pastel themes
- 7 different color schemes: Light, Dark, Rose, Ocean, Forest, Sunset, Lavender
- Consistent theme application across all pages
- Persistent theme preferences

### Currency Support
- Multi-currency support with PKR as default
- Easy currency switching capability
- Proper currency formatting throughout the application

## Technology Stack

- **Backend Framework**: [Laravel](https://laravel.com) (PHP)
- **Frontend Framework**: [Bootstrap 5](https://getbootstrap.com)
- **Database**: [MySQL](https://mysql.com)
- **Frontend Libraries**: JavaScript (ES6), Bootstrap Icons
- **Development Tools**: Composer, NPM, Artisan
- **Styling**: Custom CSS with pastel color schemes

## Installation

### Prerequisites
- PHP 8.2 or higher
- MySQL 5.7 or higher
- Composer
- Node.js & NPM

### Setup Instructions

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/AlishbaIqbal123/Finance-Tracker.git
   cd Finance-Tracker
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

4. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

5. **Generate application key**:
   ```bash
   php artisan key:generate
   ```

6. **Configure database**:
   - Update `.env` file with your database credentials:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=finance_tracker
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

7. **Run database migrations**:
   ```bash
   php artisan migrate
   ```

8. **Seed the database** (optional - for sample data):
   ```bash
   php artisan db:seed
   ```

9. **Start the development server**:
   ```bash
   php artisan serve
   ```

10. **Access the application**:
    - Open your browser and go to `http://localhost:8000`

## Screenshots

*[Note: Screenshots will be added here showing the application in both light and dark themes. The application features a beautiful pastel color scheme that provides excellent contrast and visual appeal in both themes.]*

### Light Theme
- Clean, bright interface with pastel accent colors
- Soft background tones for comfortable viewing
- High contrast text for readability

### Dark Theme
- Elegant dark interface with pastel highlights
- Reduced eye strain for nighttime usage
- Consistent color scheme with the light theme

## Usage

### Getting Started
1. Visit the application in your browser
2. Use the demo account or create your own
3. Start by adding your first transaction

### Adding Transactions
1. Click "Add Transaction" or "Add Income/Expense" button
2. Fill in the transaction details:
   - Title: Descriptive name for the transaction
   - Amount: Numerical value
   - Type: Income or Expense
   - Category: Select from predefined categories
   - Date: Transaction date
   - Description: Optional additional details
3. Click "Add Transaction" to save

### Managing Budgets
1. Navigate to the Budget section
2. Click "Set Budget" or "Add Budget"
3. Select category and set amount
4. Monitor progress in the dashboard

### Viewing Analytics
1. Go to the Analytics page
2. View spending charts and financial summaries
3. Filter data by date ranges as needed

### Changing Themes
1. Use the theme selector in the sidebar
2. Choose from 7 available themes
3. Theme preference is saved automatically

### Currency Management
1. Use the currency selector in the header
2. Select your preferred currency
3. All amounts will be formatted accordingly

## API Endpoints

The application provides RESTful API endpoints for data management:

### Transactions API
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/{id}` - Get a specific transaction
- `PUT /api/transactions/{id}` - Update a transaction
- `DELETE /api/transactions/{id}` - Delete a transaction
- `GET /api/transactions/filter` - Filter transactions

### Authentication
- All API endpoints require authentication
- Uses Laravel Sanctum for API authentication

## Theme Functionality

Finance Tracker features a comprehensive theme system with 7 distinct color schemes:

### Theme Options
1. **Light Theme**: Clean, bright interface with soft pastel accents
2. **Dark Theme**: Elegant dark interface with reduced eye strain
3. **Rose Theme**: Soft pink and rose-inspired colors
4. **Ocean Theme**: Calming blue and teal tones
5. **Forest Theme**: Earthy green and brown palette
6. **Sunset Theme**: Warm orange and red gradients
7. **Lavender Theme**: Purple and lavender pastel shades

### Visual Differences
- **Light Theme**: Features light backgrounds with pastel accent colors, dark text for high readability
- **Dark Theme**: Uses deep backgrounds with lighter text, maintaining pastel accent colors for consistency
- **Color Consistency**: All themes maintain the same pastel color scheme approach with appropriate contrast ratios
- **UI Elements**: All buttons, cards, and interactive elements adapt to the selected theme

### Theme Persistence
- Theme preferences are saved in browser's localStorage
- Consistent theme application across all pages
- Automatic theme restoration on subsequent visits

### Pastel Color Scheme
- All themes use soft, pleasant pastel colors
- Careful attention to accessibility and contrast ratios
- Harmonious color combinations that are easy on the eyes
- Consistent branding across all themes

## Troubleshooting

### Common Issues

**Database Connection Issues**
- Ensure MySQL server is running
- Verify database credentials in `.env` file
- Check that the database exists and is accessible

**Migration Errors**
- Run `php artisan config:clear` to clear configuration cache
- Verify database permissions
- Ensure the database server is accessible

**Asset Loading Issues**
- Run `npm run dev` or `npm run build` to compile assets
- Clear browser cache if CSS/JS changes aren't visible
- Run `php artisan storage:link` if using file uploads

**API Authentication Issues**
- Ensure you're logged in before accessing API endpoints
- Check that the API tokens are properly configured

### Development Server Not Starting
- Verify PHP and required extensions are installed
- Check for port conflicts (default is 8000)
- Ensure no other services are using the same port

### Theme Not Applying
- Check browser's localStorage for theme settings
- Clear browser cache and reload
- Verify JavaScript files are loading properly

## Contributing

We welcome contributions to improve Finance Tracker! Here's how you can contribute:

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards
- Follow Laravel coding standards
- Use meaningful variable and function names
- Write clear, concise comments
- Ensure all tests pass before submitting

### Reporting Issues
- Use the issue tracker to report bugs
- Provide detailed steps to reproduce
- Include screenshots if applicable
- Suggest possible solutions if known

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the Laravel framework
- Uses Bootstrap 5 for responsive design
- Features custom pastel color schemes for enhanced user experience
- Includes various open-source libraries for enhanced functionality

---

*Finance Tracker - Take Control of Your Financial Life*