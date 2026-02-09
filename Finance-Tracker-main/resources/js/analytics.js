// Analytics Page JavaScript - Pure CSS Implementation (No Chart.js)
import { formatCurrency } from './utils.js';

let currentTimePeriod = 'month';
let analyticsTransactions = [];

// Function to notify analytics of updates
window.notifyAnalyticsUpdate = function() {
    console.log('Analytics notified of data update');
    // Reload data and update charts
    loadDataFromStorage();
    updateAnalytics();
};

// Initialize analytics page
function initAnalytics() {
    console.log('Analytics init function called, pathname:', window.location.pathname);
    console.log('Full window object check:', {
        hasTransactions: 'transactions' in window,
        transactions: window.transactions,
        transactionsType: typeof window.transactions
    });
    
    // Check if we're on analytics page
    const isAnalyticsPage = document.getElementById('categoryChart') || 
                           document.getElementById('monthlyChart') || 
                           window.location.pathname.includes('analytics');
    
    console.log('Is analytics page:', isAnalyticsPage);
    console.log('Category chart element:', document.getElementById('categoryChart'));
    console.log('Monthly chart element:', document.getElementById('monthlyChart'));
    
    if (isAnalyticsPage) {
        console.log('Analytics page detected, initializing...');
        // Initialize immediately without waiting for Chart.js
        initializeAnalyticsPage();
    } else {
        console.log('Not analytics page, skipping initialization');
    }
}

// Try multiple initialization methods
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded event fired');
    initAnalytics();
});

// Also try initializing after a delay to ensure elements are loaded
setTimeout(initAnalytics, 500);

// Try initializing when the page is fully loaded
window.addEventListener('load', function() {
    console.log('Window load event fired');
    initAnalytics();
});

// Listen for page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('Page became visible, checking for data updates');
        // Refresh data when page becomes visible
        setTimeout(refreshAnalyticsData, 100);
    }
});

// Listen for storage changes (when data is updated from other tabs/pages)
window.addEventListener('storage', function(e) {
    if (e.key === 'financeTracker_transactions') {
        console.log('Storage change detected for transactions, updating analytics');
        loadDataFromStorage();
        updateAnalytics();
    }
});

// Periodically check for updates (every 5 seconds)
setInterval(function() {
    if (window.transactions && Array.isArray(window.transactions) && window.transactions.length !== analyticsTransactions.length) {
        console.log('Detected transaction count change, refreshing analytics data');
        refreshAnalyticsData();
    }
}, 5000);

function initializeAnalyticsPage() {
    console.log('Starting analytics initialization...');
    
    // Debug: Check window object before loading data
    console.log('Window object at init:', {
        hasTransactions: 'transactions' in window,
        transactionsType: typeof window.transactions,
        transactionsValue: window.transactions
    });
    
    loadDataFromStorage();
    console.log('Loaded transactions from storage:', analyticsTransactions.length);
    
    // If no data, try to get from main script but don't create sample data
    if (analyticsTransactions.length === 0) {
        console.log('No transactions found, checking main script...');
        console.log('Window transactions available:', window.transactions ? window.transactions.length : 'undefined');
        
        // Try to get data from main script if available
        if (window.transactions && window.transactions.length > 0) {
            console.log('Using transactions from main script:', window.transactions.length);
            console.log('Main script transactions:', window.transactions);
            analyticsTransactions = window.transactions;
        } else {
            console.log('No data available - user needs to add transactions');
            console.log('Window object:', window);
        }
    }
    
    console.log('About to update analytics with', analyticsTransactions.length, 'transactions');
    console.log('Analytics transactions:', analyticsTransactions);
    updateAnalytics();
    
    // Debug log
    console.log('Analytics initialized successfully with', analyticsTransactions.length, 'transactions');
}

function loadDataFromStorage() {
    console.log('Loading data from storage...');
    console.log('Session storage available:', sessionStorage);
    
    // First, try to get data from window object (most reliable)
    if (typeof window.transactions !== 'undefined' && window.transactions && Array.isArray(window.transactions) && window.transactions.length > 0) {
        console.log('Using window.transactions (primary source):', window.transactions.length);
        console.log('Window transactions data:', window.transactions);
        analyticsTransactions = [...window.transactions]; // Create a copy
        console.log('Loaded', analyticsTransactions.length, 'transactions from window');
        return;
    }
    
    // Load from sessionStorage as fallback
    const savedTransactions = sessionStorage.getItem('financeTracker_transactions');
    console.log('Saved transactions from session:', savedTransactions);
    
    if (savedTransactions) {
        try {
            const parsedTransactions = JSON.parse(savedTransactions);
            console.log('Parsed transactions from session:', parsedTransactions.length);
            analyticsTransactions = parsedTransactions;
            console.log('Loaded', analyticsTransactions.length, 'transactions from session');
        } catch (e) {
            console.error('Error loading transactions:', e);
            analyticsTransactions = [];
        }
    } else {
        // Try to get data directly from sessionStorage with more specific key checking
        console.log('Session storage keys:', Object.keys(sessionStorage));
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            console.log('Session storage key:', key, 'value:', sessionStorage.getItem(key));
        }
        
        // Try to manually get from sessionStorage with the exact key
        try {
            const directTransactions = sessionStorage.getItem('financeTracker_transactions');
            if (directTransactions) {
                const parsed = JSON.parse(directTransactions);
                console.log('Direct load from sessionStorage:', parsed.length);
                analyticsTransactions = parsed;
            } else {
                console.log('No direct transactions found in sessionStorage');
                analyticsTransactions = [];
            }
        } catch (e) {
            console.error('Error in direct load:', e);
            analyticsTransactions = [];
        }
    }
    
    console.log('Final analytics transactions:', analyticsTransactions.length);
    if (analyticsTransactions.length > 0) {
        console.log('Sample transaction:', analyticsTransactions[0]);
    }
}

function createAnalyticsSampleData() {
    const now = new Date();
    const sampleTransactions = [
        {
            id: 'analytics1',
            type: 'expense',
            amount: 200,
            category: 'Shopping',
            description: 'Clothes shopping',
            date: now.toISOString().slice(0, 10)
        },
        {
            id: 'analytics2',
            type: 'expense',
            amount: 200,
            category: 'Bills',
            description: 'Utility bills',
            date: now.toISOString().slice(0, 10)
        },
        {
            id: 'analytics3',
            type: 'expense',
            amount: 100,
            category: 'Food',
            description: 'Groceries',
            date: now.toISOString().slice(0, 10)
        },
        {
            id: 'analytics4',
            type: 'income',
            amount: 20000,
            category: 'Salary',
            description: 'Monthly salary',
            date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
        }
    ];
    
    analyticsTransactions = sampleTransactions;
    console.log('Analytics sample data created');
}

// formatCurrency function removed - now imported from utils.js

function setTimePeriod(period) {
    currentTimePeriod = period;
    
    // Update button states
    document.querySelectorAll('.btn-outline-primary').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(period + 'Btn').classList.add('active');
    
    updateAnalytics();
}

function updateAnalytics() {
    console.log('Updating analytics...');
    const filteredTransactions = getFilteredTransactions();
    console.log('Filtered transactions:', filteredTransactions.length);
    
    try {
        console.log('Updating key metrics...');
        updateKeyMetrics(filteredTransactions);
        
        console.log('Rendering category chart...');
        renderCategoryChart(filteredTransactions);
        
        console.log('Rendering monthly chart...');
        renderMonthlyChart();
        
        console.log('Rendering category details...');
        renderCategoryDetails(filteredTransactions);
        
        console.log('Analytics update completed successfully');
    } catch (error) {
        console.error('Error updating analytics:', error);
    }
}

function getFilteredTransactions() {
    const now = new Date();
    let startDate;
    
    switch (currentTimePeriod) {
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'quarter':
            startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    console.log('Filtering transactions. Current period:', currentTimePeriod, 'Start date:', startDate, 'Total transactions:', analyticsTransactions.length);
    
    const filtered = analyticsTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        const isValid = transactionDate >= startDate;
        console.log('Transaction date:', transactionDate, 'Valid:', isValid, 'Transaction:', t);
        return isValid;
    });
    
    console.log('Filtered transactions count:', filtered.length);
    return filtered;
}

function updateKeyMetrics(filteredTransactions) {
    const income = filteredTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filteredTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    // Update DOM elements with correct IDs from analytics.html
    const analyticsIncomeEl = document.getElementById('analyticsIncome');
    const analyticsExpensesEl = document.getElementById('analyticsExpenses');
    const analyticsBalanceEl = document.getElementById('analyticsBalance');
    
    if (analyticsIncomeEl) analyticsIncomeEl.textContent = formatCurrency(income);
    if (analyticsExpensesEl) analyticsExpensesEl.textContent = formatCurrency(expenses);
    if (analyticsBalanceEl) analyticsBalanceEl.textContent = formatCurrency(balance);
    
    console.log('Key metrics updated:', { income, expenses, balance });
}

function getDaysInPeriod() {
    const now = new Date();
    switch (currentTimePeriod) {
        case 'month':
            return now.getDate();
        case 'quarter':
            return 90;
        case 'year':
            const start = new Date(now.getFullYear(), 0, 1);
            return Math.ceil((now - start) / (1000 * 60 * 60 * 24));
        default:
            return now.getDate();
    }
}


// Simple CSS-based category chart (no external libraries)
function renderCategoryChart(filteredTransactions) {
    const chartContainer = document.getElementById('categoryChart');
    if (!chartContainer) {
        console.log('Category chart container not found');
        return;
    }
    
    console.log('Rendering category chart with', filteredTransactions.length, 'filtered transactions');
    
    // Calculate category spending
    const categorySpending = {};
    let totalSpending = 0;
    
    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
    console.log('Expense transactions:', expenseTransactions.length);
    
    expenseTransactions.forEach(t => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
        totalSpending += t.amount;
    });
    
    console.log('Category spending calculated:', categorySpending);
    console.log('Total spending:', totalSpending);
    
    // Category colors
    const categoryColors = {
        'Food': '#3b82f6',
        'Transportation': '#ef4444', 
        'Shopping': '#f59e0b',
        'Bills': '#10b981',
        'Entertainment': '#8b5cf6',
        'Healthcare': '#06b6d4',
        'Education': '#f97316',
        'Other': '#64748b'
    };
    
    if (Object.keys(categorySpending).length === 0) {
        chartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-pie-chart text-muted" style="font-size: 3rem;"></i>
                <p class="text-muted mt-3 mb-2">No expense data yet</p>
                <small class="text-muted">Add expenses to see category breakdown</small>
            </div>
        `;
        console.log('Category chart showing empty state');
        return;
    }
    
    // Generate beautiful horizontal bar chart
    const chartHTML = `
        <div style="padding: 20px;">
            ${Object.entries(categorySpending)
                .sort(([,a], [,b]) => b - a) // Sort by amount descending
                .map(([category, amount]) => {
                    const percentage = ((amount / totalSpending) * 100).toFixed(1);
                    const color = categoryColors[category] || '#64748b';
                    
                    return `
                        <div style="margin-bottom: 20px;">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="d-flex align-items-center">
                                    <div style="
                                        width: 12px; 
                                        height: 12px; 
                                        background: ${color}; 
                                        border-radius: 3px;
                                        margin-right: 10px;
                                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                    "></div>
                                    <span style="font-weight: 600; color: #1f2937; font-size: 14px;">${category}</span>
                                </div>
                                <div class="text-end">
                                    <div style="font-weight: 700; color: #1f2937; font-size: 15px;">${formatCurrency(amount)}</div>
                                    <div style="font-size: 12px; color: #6b7280;">${percentage}%</div>
                                </div>
                            </div>
                            <div style="
                                width: 100%; 
                                height: 12px; 
                                background: #f3f4f6; 
                                border-radius: 6px;
                                overflow: hidden;
                                box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
                            ">
                                <div style="
                                    width: ${percentage}%; 
                                    height: 100%; 
                                    background: linear-gradient(90deg, ${color} 0%, ${color}dd 100%);
                                    border-radius: 6px;
                                    transition: width 0.5s ease;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                "></div>
                            </div>
                        </div>
                    `;
                })
                .join('')}
            
            <!-- Total Summary -->
            <div style="
                margin-top: 24px; 
                padding-top: 20px; 
                border-top: 2px solid #e5e7eb;
            ">
                <div class="d-flex justify-content-between align-items-center">
                    <span style="font-weight: 700; color: #1f2937; font-size: 15px;">Total Spending</span>
                    <span style="font-weight: 700; color: #ef4444; font-size: 18px;">${formatCurrency(totalSpending)}</span>
                </div>
            </div>
        </div>
    `;
    
    chartContainer.innerHTML = chartHTML;
    
    console.log('Category chart rendered successfully');
}

// Simple CSS-based monthly chart (no external libraries)
function renderMonthlyChart() {
    const chartContainer = document.getElementById('monthlyChart');
    if (!chartContainer) {
        console.log('Monthly chart container not found');
        return;
    }
    
    console.log('Rendering monthly chart with', analyticsTransactions.length, 'transactions');
    console.log('All transactions:', JSON.parse(JSON.stringify(analyticsTransactions))); // Deep copy for logging
    
    // Get last 3 months data
    const now = new Date();
    const months = [];
    const monthlyData = [];
    
    console.log('Calculating monthly data for', analyticsTransactions.length, 'transactions');
    console.log('Current date:', now);
    console.log('Current year:', now.getFullYear(), 'Current month:', now.getMonth());
    
    // Show all transaction dates for debugging
    console.log('All transaction dates:');
    analyticsTransactions.forEach((t, index) => {
        console.log(`Transaction ${index}:`, t.date, 'Type:', t.type, 'Amount:', t.amount);
    });
    
    // Get last 3 months data (current month and previous 2 months)
    for (let i = 0; i < 3; i++) {
        // Calculate the target month (0 = current month, 1 = last month, 2 = 2 months ago)
        const targetMonth = now.getMonth() - i;
        const targetYear = now.getFullYear();
        
        // Handle year rollover for negative months
        let adjustedYear = targetYear;
        let adjustedMonth = targetMonth;
        
        if (targetMonth < 0) {
            adjustedYear = targetYear - 1;
            adjustedMonth = 12 + targetMonth; // targetMonth is negative, so this adds it
        }
        
        const date = new Date(adjustedYear, adjustedMonth, 1);
        const monthKey = date.toISOString().slice(0, 7);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        console.log('Processing month:', monthKey, 'Month name:', monthName, 'Date object:', date, 'Target year:', adjustedYear, 'Target month:', adjustedMonth);
        
        // More robust filtering with detailed logging
        const incomeTransactions = analyticsTransactions.filter(t => {
            const isIncome = t.type === 'income';
            const dateMatch = t.date && t.date.slice(0, 7) === monthKey;
            console.log('Checking transaction for income in', monthKey, ':', t, 'Is income:', isIncome, 'Date match:', dateMatch);
            return isIncome && dateMatch;
        });
        
        const expenseTransactions = analyticsTransactions.filter(t => {
            const isExpense = t.type === 'expense';
            const dateMatch = t.date && t.date.slice(0, 7) === monthKey;
            console.log('Checking transaction for expense in', monthKey, ':', t, 'Is expense:', isExpense, 'Date match:', dateMatch);
            return isExpense && dateMatch;
        });
        
        console.log('Income transactions for', monthKey, ':', incomeTransactions.length);
        console.log('Expense transactions for', monthKey, ':', expenseTransactions.length);
        
        const income = incomeTransactions.reduce((sum, t) => {
            console.log('Adding income transaction:', t.amount);
            return sum + t.amount;
        }, 0);
        
        const expenses = expenseTransactions.reduce((sum, t) => {
            console.log('Adding expense transaction:', t.amount);
            return sum + t.amount;
        }, 0);
        
        console.log('Income for', monthKey, ':', income);
        console.log('Expenses for', monthKey, ':', expenses);
        
        months.push(monthName);
        monthlyData.push({ income, expenses });
    }
    
    // Reverse the arrays to show months in chronological order (oldest first)
    months.reverse();
    monthlyData.reverse();
    
    console.log('Monthly data calculated:', monthlyData);
    console.log('Months:', months);
    
    // Always show the chart, even with zero values
    // Calculate max value safely, default to 100 if all values are zero to avoid division by zero
    const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses)).filter(val => !isNaN(val) && isFinite(val)), 100);
    console.log('Max value for chart:', maxValue);
    
    // Even if maxValue is 0 or all data is zero, we still show the chart with zero-height bars
    
    // Generate beautiful bar chart
    console.log('Generating chart with maxValue:', maxValue);
    
    // Ensure we have valid data
    const validMonthlyData = monthlyData.map(data => ({
        income: isNaN(data.income) ? 0 : data.income,
        expenses: isNaN(data.expenses) ? 0 : data.expenses
    }));
    
    console.log('Valid monthly data:', validMonthlyData);
    
    chartContainer.innerHTML = `
        <div style="padding: 20px 10px;">
            <div class="d-flex align-items-end justify-content-around" style="height: 220px; border-bottom: 2px solid #e5e7eb; position: relative;">
                ${validMonthlyData.map((data, index) => {
                    const incomeHeight = maxValue > 0 ? (data.income / maxValue) * 180 : 0;
                    const expenseHeight = maxValue > 0 ? (data.expenses / maxValue) * 180 : 0;
                    
                    console.log('Generating bar for', months[index], 'Income height:', incomeHeight, 'Expense height:', expenseHeight);
                    
                    return `
                        <div class="text-center" style="flex: 1; max-width: 120px; position: relative;">
                            <div style="position: relative; height: 200px; display: flex; align-items: flex-end; justify-content: center; gap: 8px;">
                                <!-- Income Bar -->
                                <div style="position: relative; width: 40px;">
                                    ${data.income > 0 ? `
                                        <div style="
                                            height: ${incomeHeight}px; 
                                            background: linear-gradient(180deg, #10b981 0%, #059669 100%);
                                            border-radius: 6px 6px 0 0;
                                            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
                                            transition: all 0.3s ease;
                                            position: relative;
                                        " class="bar-hover">
                                            <div style="
                                                position: absolute;
                                                top: -25px;
                                                left: 50%;
                                                transform: translateX(-50%);
                                                background: #10b981;
                                                color: white;
                                                padding: 4px 8px;
                                                border-radius: 4px;
                                                font-size: 11px;
                                                font-weight: 600;
                                                white-space: nowrap;
                                                opacity: 0;
                                                transition: opacity 0.3s;
                                            " class="bar-tooltip">
                                                ${formatCurrency(data.income)}
                                            </div>
                                        </div>
                                    ` : `
                                        <div style="
                                            height: 0px; 
                                            background: linear-gradient(180deg, #10b981 0%, #059669 100%);
                                            border-radius: 6px 6px 0 0;
                                            box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
                                            transition: all 0.3s ease;
                                            position: relative;
                                        " class="bar-hover">
                                            <div style="
                                                position: absolute;
                                                top: -25px;
                                                left: 50%;
                                                transform: translateX(-50%);
                                                background: #10b981;
                                                color: white;
                                                padding: 4px 8px;
                                                border-radius: 4px;
                                                font-size: 11px;
                                                font-weight: 600;
                                                white-space: nowrap;
                                                opacity: 0;
                                                transition: opacity 0.3s;
                                            " class="bar-tooltip">
                                                ${formatCurrency(data.income)}
                                            </div>
                                        </div>
                                    `}
                                </div>
                                
                                <!-- Expense Bar -->
                                <div style="position: relative; width: 40px;">
                                    ${data.expenses > 0 ? `
                                        <div style="
                                            height: ${expenseHeight}px; 
                                            background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
                                            border-radius: 6px 6px 0 0;
                                            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
                                            transition: all 0.3s ease;
                                            position: relative;
                                        " class="bar-hover">
                                            <div style="
                                                position: absolute;
                                                top: -25px;
                                                left: 50%;
                                                transform: translateX(-50%);
                                                background: #f59e0b;
                                                color: white;
                                                padding: 4px 8px;
                                                border-radius: 4px;
                                                font-size: 11px;
                                                font-weight: 600;
                                                white-space: nowrap;
                                                opacity: 0;
                                                transition: opacity 0.3s;
                                            " class="bar-tooltip">
                                                ${formatCurrency(data.expenses)}
                                            </div>
                                        </div>
                                    ` : `
                                        <div style="
                                            height: 0px; 
                                            background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
                                            border-radius: 6px 6px 0 0;
                                            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
                                            transition: all 0.3s ease;
                                            position: relative;
                                        " class="bar-hover">
                                            <div style="
                                                position: absolute;
                                                top: -25px;
                                                left: 50%;
                                                transform: translateX(-50%);
                                                background: #f59e0b;
                                                color: white;
                                                padding: 4px 8px;
                                                border-radius: 4px;
                                                font-size: 11px;
                                                font-weight: 600;
                                                white-space: nowrap;
                                                opacity: 0;
                                                transition: opacity 0.3s;
                                            " class="bar-tooltip">
                                                ${formatCurrency(data.expenses)}
                                            </div>
                                        </div>
                                    `}
                                </div>
                            </div>
                            
                            <!-- Month Label -->
                            <div style="margin-top: 12px;">
                                <div style="font-weight: 600; font-size: 14px; color: #1f2937;">${months[index] || 'N/A'}</div>
                                <div style="font-size: 11px; color: #6b7280; margin-top: 2px;">
                                    Net: ${formatCurrency((data.income || 0) - (data.expenses || 0))}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- Legend -->
            <div class="d-flex justify-content-center gap-4 mt-3">
                <div class="d-flex align-items-center">
                    <div style="width: 16px; height: 16px; background: linear-gradient(180deg, #10b981 0%, #059669 100%); border-radius: 3px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);" class="me-2"></div>
                    <span style="font-size: 13px; color: #4b5563; font-weight: 500;">Income</span>
                </div>
                <div class="d-flex align-items-center">
                    <div style="width: 16px; height: 16px; background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%); border-radius: 3px; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);" class="me-2"></div>
                    <span style="font-size: 13px; color: #4b5563; font-weight: 500;">Expenses</span>
                </div>
            </div>
        </div>
        
        <style>
            .bar-hover:hover {
                transform: translateY(-4px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
            }
            .bar-hover:hover .bar-tooltip {
                opacity: 1 !important;
            }
        </style>
    `;
    
    console.log('Monthly chart HTML generated successfully');
    
    console.log('Monthly chart rendered successfully');
}

function renderCategoryDetails(filteredTransactions) {
    const categoryDetailsContainer = document.getElementById('categoryDetails');
    const categoryDetailsEmpty = document.getElementById('categoryDetailsEmpty');
    
    if (!categoryDetailsContainer) {
        console.log('Category details container not found');
        return;
    }
    
    // Calculate category spending
    const categorySpending = {};
    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
    
    expenseTransactions.forEach(t => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });
    
    const totalExpenses = Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0);
    
    if (totalExpenses === 0) {
        // Show empty state
        if (categoryDetailsEmpty) {
            categoryDetailsEmpty.style.display = 'block';
        }
        // Hide any existing category details
        const existingDetails = categoryDetailsContainer.querySelector('.category-breakdown');
        if (existingDetails) {
            existingDetails.style.display = 'none';
        }
        return;
    }
    
    // Hide empty state
    if (categoryDetailsEmpty) {
        categoryDetailsEmpty.style.display = 'none';
    }
    
    // Create or update category breakdown
    let categoryBreakdown = categoryDetailsContainer.querySelector('.category-breakdown');
    if (!categoryBreakdown) {
        categoryBreakdown = document.createElement('div');
        categoryBreakdown.className = 'category-breakdown';
        categoryDetailsContainer.appendChild(categoryBreakdown);
    }
    
    categoryBreakdown.style.display = 'block';
    
    // Sort categories by spending amount
    const sortedCategories = Object.entries(categorySpending)
        .sort(([,a], [,b]) => b - a);
    
    // Generate category details HTML
    const categoryColors = {
        'Food': '#e4a5b8',
        'Transportation': '#10b981', 
        'Shopping': '#f59e0b',
        'Bills': '#3b82f6',
        'Entertainment': '#8b5cf6',
        'Healthcare': '#ef4444',
        'Education': '#06b6d4',
        'Other': '#64748b'
    };
    
    categoryBreakdown.innerHTML = `
        <div class="row g-3">
            ${sortedCategories.map(([category, amount]) => {
                const percentage = ((amount / totalExpenses) * 100).toFixed(1);
                const color = categoryColors[category] || '#6c757d';
                const transactionCount = expenseTransactions.filter(t => t.category === category).length;
                
                return `
                    <div class="col-md-4 mb-3">
                        <div style="
                            padding: 16px;
                            background: white;
                            border-radius: 8px;
                            border-left: 4px solid ${color};
                            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                            transition: all 0.3s ease;
                        " class="category-card-hover">
                            <!-- Header with icon and name -->
                            <div class="d-flex align-items-center mb-3">
                                <div style="
                                    width: 10px;
                                    height: 10px;
                                    background: ${color};
                                    border-radius: 50%;
                                    margin-right: 10px;
                                "></div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: #1f2937; font-size: 15px;">${category}</div>
                                </div>
                                <div style="
                                    background: ${color}15;
                                    color: ${color};
                                    padding: 4px 10px;
                                    border-radius: 12px;
                                    font-size: 13px;
                                    font-weight: 600;
                                ">${percentage}%</div>
                            </div>
                            
                            <!-- Amount -->
                            <div style="
                                font-size: 20px;
                                font-weight: 700;
                                color: #1f2937;
                                margin-bottom: 8px;
                            ">${formatCurrency(amount)}</div>
                            
                            <!-- Transaction count and progress bar -->
                            <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">
                                ${transactionCount} transaction${transactionCount !== 1 ? 's' : ''}
                            </div>
                            
                            <div style="
                                width: 100%;
                                height: 6px;
                                background: #f3f4f6;
                                border-radius: 3px;
                                overflow: hidden;
                            ">
                                <div style="
                                    width: ${percentage}%;
                                    height: 100%;
                                    background: ${color};
                                    border-radius: 3px;
                                    transition: width 0.5s ease;
                                "></div>
                            </div>
                            
                            <div style="
                                font-size: 11px;
                                color: #9ca3af;
                                margin-top: 6px;
                                text-align: right;
                            ">${percentage}% of total</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <style>
            .category-card-hover:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            }
        </style>
    `;
}

// Force refresh analytics (for debugging)
function refreshAnalytics() {
    console.log('Refreshing analytics...');
    loadDataFromStorage();
    
    // Try to get data from main script if available
    if (analyticsTransactions.length === 0 && window.transactions && window.transactions.length > 0) {
        analyticsTransactions = window.transactions;
    }
    
    updateAnalytics();
    console.log('Analytics refreshed with', analyticsTransactions.length, 'transactions');
}

// Simple initialization function (no Chart.js needed)
function initializeAnalyticsPageEnhanced() {
    initializeAnalyticsPage();
}

// Simple test function to force analytics initialization
function testAnalytics() {
    console.log('=== TESTING ANALYTICS ===');
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    console.log('Current transactions:', analyticsTransactions);
    console.log('Elements check:');
    console.log('- categoryChart:', document.getElementById('categoryChart'));
    console.log('- monthlyChart:', document.getElementById('monthlyChart'));
    console.log('- categoryDetails:', document.getElementById('categoryDetails'));
    console.log('- totalIncome:', document.getElementById('totalIncome'));
    console.log('- totalExpenses:', document.getElementById('totalExpenses'));
    console.log('- currentBalance:', document.getElementById('currentBalance'));
    
    // Force initialization
    console.log('Forcing analytics initialization...');
    initializeAnalyticsPage();
}

// Manual fix function that can be called from console
function fixAnalytics() {
    console.log('=== MANUAL ANALYTICS FIX ===');
    
    // Clear any existing data
    analyticsTransactions = [];
    
    // Create fresh sample data
    createAnalyticsSampleData();
    
    // Force update
    updateAnalytics();
    
    console.log('Analytics manually fixed with', analyticsTransactions.length, 'transactions');
}

// Export functions for global access
window.setTimePeriod = setTimePeriod;
window.refreshAnalytics = refreshAnalytics;
window.testAnalytics = testAnalytics;
window.fixAnalytics = fixAnalytics;

// Test function to verify script is loaded
window.analyticsScriptLoaded = true;
console.log('Analytics script loaded successfully');

// Manual initialization function for testing
window.initAnalyticsManual = function() {
    console.log('Manual analytics initialization called');
    initAnalytics();
};

// Manual refresh function to get latest data from main app
window.refreshAnalyticsData = function() {
    console.log('Refreshing analytics data from main application...');
    
    // Debug: Check what's available on window
    console.log('Window object keys:', Object.keys(window));
    console.log('Window transactions property:', window.transactions);
    console.log('Is window.transactions an array:', Array.isArray(window.transactions));
    
    // Try to get fresh data from main application
    if (typeof window.transactions !== 'undefined' && window.transactions && Array.isArray(window.transactions)) {
        console.log('Found window.transactions:', window.transactions.length);
        console.log('Window transactions data:', window.transactions);
        analyticsTransactions = [...window.transactions]; // Create a copy
        console.log('Updated analytics transactions:', analyticsTransactions.length);
        updateAnalytics();
        return;
    }
    
    console.log('No valid window.transactions found, trying sessionStorage');
    
    // Try sessionStorage as fallback
    const savedTransactions = sessionStorage.getItem('financeTracker_transactions');
    if (savedTransactions) {
        try {
            const parsed = JSON.parse(savedTransactions);
            console.log('Loaded from sessionStorage:', parsed.length);
            analyticsTransactions = parsed;
            updateAnalytics();
        } catch (e) {
            console.error('Error loading from sessionStorage:', e);
        }
    } else {
        console.log('No data found in sessionStorage either');
    }
};
