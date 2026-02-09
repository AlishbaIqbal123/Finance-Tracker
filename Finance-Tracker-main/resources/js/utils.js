// utils.js - Shared utility functions

// Currency configuration
const CURRENCY_CONFIG = {
    'PKR': { locale: 'en-PK', currency: 'PKR', symbol: '₨' },
    'USD': { locale: 'en-US', currency: 'USD', symbol: '$' },
    'EUR': { locale: 'en-EU', currency: 'EUR', symbol: '€' },
    'GBP': { locale: 'en-GB', currency: 'GBP', symbol: '£' },
    'INR': { locale: 'en-IN', currency: 'INR', symbol: '₹' },
    'JPY': { locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
    'CNY': { locale: 'zh-CN', currency: 'CNY', symbol: '¥' },
    'AUD': { locale: 'en-AU', currency: 'AUD', symbol: 'A$' },
    'CAD': { locale: 'en-CA', currency: 'CAD', symbol: 'C$' },
    'SGD': { locale: 'en-SG', currency: 'SGD', symbol: 'S$' }
};

let currentCurrency = 'PKR'; // Default to PKR

export function setCurrency(currency) {
    if (CURRENCY_CONFIG[currency]) {
        currentCurrency = currency;
        // Save to localStorage
        localStorage.setItem('preferredCurrency', currency);
        return true;
    }
    return false;
}

export function getCurrentCurrency() {
    // Try to load from localStorage
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency && CURRENCY_CONFIG[savedCurrency]) {
        currentCurrency = savedCurrency;
    }
    return currentCurrency;
}

export function formatCurrency(amount) {
    const config = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG['PKR'];
    
    try {
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currency
        }).format(amount);
    } catch (e) {
        // Fallback to manual formatting
        return `${config.symbol}${amount.toFixed(2)}`;
    }
}

export function formatCurrencyWithSymbol(amount, currency = null) {
    const targetCurrency = currency || currentCurrency;
    const config = CURRENCY_CONFIG[targetCurrency] || CURRENCY_CONFIG['PKR'];
    
    try {
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currency
        }).format(amount);
    } catch (e) {
        // Fallback to manual formatting
        return `${config.symbol}${amount.toFixed(2)}`;
    }
}

export function formatDate(dateStr) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(dateStr));
}

export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

export function generateMonthlyReport(transactions) {
    const report = {};
    
    transactions.forEach(t => {
        const month = t.date.substring(0, 7); // YYYY-MM
        if (!report[month]) {
            report[month] = {
                income: 0,
                expense: 0,
                balance: 0
            };
        }
        
        if (t.type === 'income') {
            report[month].income += t.amount;
            report[month].balance += t.amount;
        } else {
            report[month].expense += t.amount;
            report[month].balance -= t.amount;
        }
    });
    
    return report;
}

export function generateCategoryReport(transactions) {
    const report = {
        income: {},
        expense: {}
    };
    
    transactions.forEach(t => {
        const type = t.type;
        const category = t.category;
        
        if (!report[type][category]) {
            report[type][category] = 0;
        }
        
        report[type][category] += t.amount;
    });
    
    return report;
}

export function calculateBudgetProgress(budget, expenses) {
    if (!budget || !budget.amount) return 0;
    return Math.min((expenses / budget.amount) * 100, 100);
}

export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function getCurrentMonth() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getMonthName(monthStr) {
    const [year, month] = monthStr.split('-');
    return new Date(year, month - 1).toLocaleString('default', { month: 'long' });
}