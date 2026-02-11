// FinanceTracker - Simple JavaScript Implementation

// Import utility functions
import { formatCurrency, getCurrentCurrency, formatDate } from './utils.js';
import { initializeThemeSelector } from './theme.js';
// Data storage - using sessionStorage to persist across pages (resets when browser closes)
let transactions = [];
let budgets = [];

// Categories
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Business', 'Other'];
const expenseCategories = ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other'];

// Load data from API on page load
async function loadFromSession() {
    try {
        // Import API module dynamically
        const { default: api } = await import('./api.js');

        // Load transactions from API
        const transactionsResponse = await api.transactions.getAll();
        transactions = transactionsResponse.data || [];
        console.log('Loaded transactions from API:', transactions.length);

        // For budgets, we'll keep using sessionStorage for now
        const savedBudgets = sessionStorage.getItem('financeTracker_budgets');
        if (savedBudgets) {
            try {
                budgets = JSON.parse(savedBudgets);
                console.log('Loaded budgets from session:', budgets.length);
            } catch (e) {
                console.error('Error loading budgets:', e);
                budgets = [];
            }
        }
    } catch (error) {
        console.error('Error loading data from API:', error);

        // Fallback to sessionStorage
        const savedTransactions = sessionStorage.getItem('financeTracker_transactions');
        const savedBudgets = sessionStorage.getItem('financeTracker_budgets');

        if (savedTransactions) {
            try {
                transactions = JSON.parse(savedTransactions);
                console.log('Loaded transactions from session (fallback):', transactions.length);
            } catch (e) {
                console.error('Error loading transactions from session:', e);
                transactions = [];
            }
        }

        if (savedBudgets) {
            try {
                budgets = JSON.parse(savedBudgets);
                console.log('Loaded budgets from session:', budgets.length);
            } catch (e) {
                console.error('Error loading budgets:', e);
                budgets = [];
            }
        }
    }
}

// Save data to sessionStorage
// Note: Transactions are now saved via API, but budgets are still saved locally
function saveToSession() {
    try {
        // Transactions are now managed via API
        sessionStorage.setItem('financeTracker_budgets', JSON.stringify(budgets));
        console.log('Budget data saved to session');
    } catch (e) {
        console.error('Error saving to session:', e);
    }
}

// Start app
document.addEventListener('DOMContentLoaded', async function () {
    // Load data from session first
    await loadFromSession();

    // For new users, start with empty data
    if (transactions.length === 0) {
        console.log('New user: Starting with empty data');

        // Check if this is a demo user (based on URL or other indicators)
        if (window.location.pathname.includes('/dashboard') || window.location.pathname.includes('/transactions')) {
            // Add initial sample data for demo experience
            addInitialSampleData();
            saveData();
            console.log('Added initial sample data for demo experience');
        }
    }

    console.log('App started with', transactions.length, 'transactions');
    updateAll();
    setupButtons();

    // Initialize currency selector
    initializeCurrencySelector();

    // Initialize theme selector
    initializeThemeSelector();

    // Initialize mobile menu
    initializeMobileMenu();
});

// Initialize currency selector
function initializeCurrencySelector() {
    const currencySelector = document.getElementById('currencySelector');
    if (!currencySelector) return;

    // Import utils to get current currency
    import('./utils.js').then(({ getCurrentCurrency, setCurrency }) => {
        // Set initial value
        const currentCurrency = getCurrentCurrency();
        currencySelector.value = currentCurrency;

        // Add event listener
        currencySelector.addEventListener('change', function () {
            const selectedCurrency = this.value;
            if (setCurrency(selectedCurrency)) {
                // Update all displays
                updateAll();

                // Show notification
                import('./utils.js').then(({ showToast }) => {
                    showToast(`Currency changed to ${selectedCurrency}`, 'success');
                });
            }
        });
    }).catch(error => {
        console.error('Failed to load utils module:', error);
    });
}

// Add initial sample data for new users
function addInitialSampleData() {
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);

    const sampleTransactions = [
        // Income transactions
        {
            id: Date.now() + 1,
            type: 'income',
            amount: 5000,
            category: 'Salary',
            title: 'Monthly Salary',
            description: 'Software Developer Salary',
            date: `${currentMonth}-01`
        },
        {
            id: Date.now() + 2,
            type: 'income',
            amount: 1500,
            category: 'Freelance',
            title: 'Web Development Project',
            description: 'Client project payment',
            date: `${currentMonth}-15`
        },

        // Expense transactions
        {
            id: Date.now() + 3,
            type: 'expense',
            amount: 1200,
            category: 'Bills',
            title: 'Rent Payment',
            description: 'Monthly apartment rent',
            date: `${currentMonth}-01`
        },
        {
            id: Date.now() + 4,
            type: 'expense',
            amount: 300,
            category: 'Food',
            title: 'Grocery Shopping',
            description: 'Weekly groceries',
            date: `${currentMonth}-05`
        },
        {
            id: Date.now() + 5,
            type: 'expense',
            amount: 150,
            category: 'Transportation',
            title: 'Gas & Car Maintenance',
            description: 'Fuel and car service',
            date: `${currentMonth}-08`
        },
        {
            id: Date.now() + 6,
            type: 'expense',
            amount: 200,
            category: 'Shopping',
            title: 'Clothing',
            description: 'Winter clothes shopping',
            date: `${currentMonth}-12`
        },
        {
            id: Date.now() + 7,
            type: 'expense',
            amount: 80,
            category: 'Bills',
            title: 'Internet & Phone',
            description: 'Monthly utilities',
            date: `${currentMonth}-03`
        },
        {
            id: Date.now() + 8,
            type: 'expense',
            amount: 120,
            category: 'Entertainment',
            title: 'Movies & Dining',
            description: 'Weekend entertainment',
            date: `${currentMonth}-18`
        }
    ];

    const sampleBudgets = [
        {
            id: Date.now() + 10,
            category: 'Food',
            amount: 600,
            period: 'monthly',
            spent: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 11,
            category: 'Transportation',
            amount: 300,
            period: 'monthly',
            spent: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 12,
            category: 'Entertainment',
            amount: 200,
            period: 'monthly',
            spent: 0,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 13,
            category: 'Shopping',
            amount: 400,
            period: 'monthly',
            spent: 0,
            createdAt: new Date().toISOString()
        }
    ];

    transactions = sampleTransactions;
    budgets = sampleBudgets;

    console.log('Sample data loaded:', transactions.length, 'transactions');
}

// Add sample data for demonstration (keep existing function)
function addSampleData() {
    const now = new Date();
    const sampleTransactions = [
        {
            id: Date.now() + 1,
            type: 'expense',
            amount: 150,
            category: 'Food',
            title: 'Groceries',
            description: 'Weekly grocery shopping',
            date: now.toISOString().slice(0, 10)
        },
        {
            id: Date.now() + 2,
            type: 'expense',
            amount: 80,
            category: 'Transportation',
            title: 'Gas',
            description: 'Fuel for car',
            date: now.toISOString().slice(0, 10)
        },
        {
            id: Date.now() + 3,
            type: 'expense',
            amount: 200,
            category: 'Shopping',
            title: 'Clothes',
            description: 'New winter jacket',
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2).toISOString().slice(0, 10)
        },
        {
            id: Date.now() + 4,
            type: 'income',
            amount: 3000,
            category: 'Salary',
            title: 'Monthly Salary',
            description: 'October salary payment',
            date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
        },
        {
            id: Date.now() + 5,
            type: 'expense',
            amount: 120,
            category: 'Bills',
            title: 'Electricity Bill',
            description: 'Monthly electricity payment',
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5).toISOString().slice(0, 10)
        }
    ];

    const sampleBudgets = [
        {
            id: Date.now() + 10,
            category: 'Food',
            amount: 500,
            period: 'monthly'
        },
        {
            id: Date.now() + 11,
            category: 'Transportation',
            amount: 200,
            period: 'monthly'
        },
        {
            id: Date.now() + 12,
            category: 'Shopping',
            amount: 300,
            period: 'monthly'
        }
    ];

    transactions = sampleTransactions;
    budgets = sampleBudgets;

    console.log('Additional sample data loaded');
}

// Save data function
function saveData() {
    // Save to sessionStorage so data persists across page navigations
    saveToSession();

    // Notify analytics page of data changes
    if (typeof window.notifyAnalyticsUpdate === 'function') {
        window.notifyAnalyticsUpdate();
    }
}

// Utility functions
// formatMoney function kept for backward compatibility
function formatMoney(amount) {
    // Use the imported formatCurrency function
    return formatCurrency(amount);
}



// Setup button clicks
function setupButtons() {
    // Add income modal
    const incomeBtn = document.querySelector('[data-bs-target="#addIncomeModal"]');
    if (incomeBtn) {
        incomeBtn.onclick = () => showModal('addIncomeModal');
    }

    // Add expense modal
    const expenseBtn = document.querySelector('[data-bs-target="#addExpenseModal"]');
    if (expenseBtn) {
        expenseBtn.onclick = () => showModal('addExpenseModal');
    }

    // Add transaction modal (for other pages)
    const addBtn = document.querySelector('[data-bs-target="#addTransactionModal"]');
    if (addBtn) {
        addBtn.onclick = (e) => {
            e.preventDefault();
            showModal('addTransactionModal');
        };
    }

    // Add budget modal
    const budgetBtn = document.querySelector('[data-bs-target="#addBudgetModal"]');
    if (budgetBtn) {
        budgetBtn.onclick = (e) => {
            e.preventDefault();
            showModal('addBudgetModal');
        };
    }

    // Close modal buttons
    document.querySelectorAll('.btn-close, [data-bs-dismiss="modal"]').forEach(btn => {
        btn.onclick = () => hideModal(btn.closest('.modal'));
    });

    // Close modal when clicking outside
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });

    // Form submissions
    const incomeForm = document.getElementById('incomeForm');
    if (incomeForm) {
        incomeForm.onsubmit = function (e) {
            console.log('Income form submitted');
            addIncome(e);
        };
    }

    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.onsubmit = function (e) {
            console.log('Expense form submitted');
            addExpense(e);
        };
    }

    const transactionForm = document.getElementById('transactionForm');
    if (transactionForm) {
        transactionForm.onsubmit = function (e) {
            console.log('Transaction form submitted');
            addTransaction(e);
        };
    }

    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.onsubmit = addBudget;
    }
}

// Show modal (custom implementation without Bootstrap JS)
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.zIndex = '1050';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        console.log('Modal opened:', modalId);
    } else {
        console.error('Modal not found:', modalId);
    }
}

// Hide modal (custom implementation without Bootstrap JS)
function hideModal(modalOrId) {
    let modal;
    if (typeof modalOrId === 'string') {
        modal = document.getElementById(modalOrId);
    } else {
        modal = modalOrId;
    }

    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        modal.style.backgroundColor = '';
        modal.style.position = '';
        modal.style.top = '';
        modal.style.left = '';
        modal.style.width = '';
        modal.style.height = '';
        modal.style.zIndex = '';
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Modal closed');
    } else {
        console.error('Modal not found for closing');
    }
}

// Add new income (dashboard)
async function addIncome(e) {
    if (e) e.preventDefault();

    // Check if elements exist
    const titleEl = document.getElementById('incomeTitle');
    const amountEl = document.getElementById('incomeAmount');
    const categoryEl = document.getElementById('incomeCategory');
    const descriptionEl = document.getElementById('incomeDescription');

    if (!titleEl || !amountEl || !categoryEl) {
        console.error('Income form elements not found');
        alert('Form not ready. Please try again.');
        return;
    }

    const title = titleEl.value;
    const amount = parseFloat(amountEl.value);
    const category = categoryEl.value;
    const description = descriptionEl ? descriptionEl.value : title;
    const date = new Date().toISOString().slice(0, 10);

    // Validation
    if (!title || title.trim() === '') {
        alert('Please enter a title');
        return;
    }

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (!category) {
        alert('Please select a category');
        return;
    }

    try {
        // Import API module dynamically
        const { default: api } = await import('./api.js');

        const transactionData = {
            title: title.trim(),
            amount: amount,
            type: 'income',
            category: category,
            date: date,
            description: description.trim() || title.trim()
        };

        await api.transactions.create(transactionData);

        // Refresh transactions from API if on transactions page
        if (typeof refreshTransactions === 'function') {
            await refreshTransactions();
        }

        updateAll();
        hideModal('addIncomeModal');

        // Reset form safely
        const form = document.getElementById('incomeForm');
        if (form) form.reset();

        console.log('Income added:', transactionData);
    } catch (error) {
        console.error('Failed to add income:', error);
        alert('Failed to add income. Please try again.');
    }
}

// Add new expense (dashboard)
async function addExpense(e) {
    if (e) e.preventDefault();

    // Check if elements exist
    const titleEl = document.getElementById('expenseTitle');
    const amountEl = document.getElementById('expenseAmount');
    const categoryEl = document.getElementById('expenseCategory');
    const descriptionEl = document.getElementById('expenseDescription');

    if (!titleEl || !amountEl || !categoryEl) {
        console.error('Expense form elements not found');
        alert('Form not ready. Please try again.');
        return;
    }

    const title = titleEl.value;
    const amount = parseFloat(amountEl.value);
    const category = categoryEl.value;
    const description = descriptionEl ? descriptionEl.value : title;
    const date = new Date().toISOString().slice(0, 10);

    // Validation
    if (!title || title.trim() === '') {
        alert('Please enter a title');
        return;
    }

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (!category) {
        alert('Please select a category');
        return;
    }

    try {
        // Import API module dynamically
        const { default: api } = await import('./api.js');

        const transactionData = {
            title: title.trim(),
            amount: amount,
            type: 'expense',
            category: category,
            date: date,
            description: description.trim() || title.trim()
        };

        await api.transactions.create(transactionData);

        // Refresh transactions from API if on transactions page
        if (typeof refreshTransactions === 'function') {
            await refreshTransactions();
        }

        updateAll();
        hideModal('addExpenseModal');

        // Reset form safely
        const form = document.getElementById('expenseForm');
        if (form) form.reset();

        console.log('Expense added:', transactionData);
    } catch (error) {
        console.error('Failed to add expense:', error);
        alert('Failed to add expense. Please try again.');
    }
}

// Add new transaction (other pages)
async function addTransaction(e) {
    if (e) e.preventDefault();

    console.log('addTransaction called');

    const titleEl = document.getElementById('transactionTitle');
    const amountEl = document.getElementById('transactionAmount');
    const typeEl = document.getElementById('transactionType');
    const categoryEl = document.getElementById('transactionCategory');
    const descriptionEl = document.getElementById('transactionDescription');

    console.log('Form elements:', { titleEl, amountEl, typeEl, categoryEl, descriptionEl });

    if (!titleEl || !amountEl || !typeEl || !categoryEl) {
        console.error('Form elements not found');
        alert('Form not ready. Please try again.');
        return;
    }

    const title = titleEl.value;
    const amount = parseFloat(amountEl.value);
    const type = typeEl.value;
    const category = categoryEl.value;
    const description = descriptionEl ? descriptionEl.value : title;

    console.log('Form values:', { title, amount, type, category, description });

    if (!title || title.trim() === '') {
        alert('Please enter a title');
        return;
    }

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (!type) {
        alert('Please select a type');
        return;
    }

    if (!category) {
        alert('Please select a category');
        return;
    }

    try {
        // Import API module dynamically
        const { default: api } = await import('./api.js');

        const transactionData = {
            title: title.trim(),
            description: description.trim() || title.trim(),
            amount: amount,
            type: type,
            category: category,
            date: new Date().toISOString().slice(0, 10)
        };

        await api.transactions.create(transactionData);

        // Refresh transactions from API if on transactions page
        if (typeof refreshTransactions === 'function') {
            await refreshTransactions();
        }

        updateAll();
        hideModal('addTransactionModal');

        // Reset form safely
        const form = document.getElementById('transactionForm');
        if (form) form.reset();

        showToast('Transaction added successfully!', 'success');
    } catch (error) {
        console.error('Failed to add transaction:', error);
        alert('Failed to add transaction. Please try again.');
    }
}

// Add new budget
function addBudget(e) {
    if (e) e.preventDefault();

    const category = document.getElementById('budgetCategory').value;
    const amount = parseFloat(document.getElementById('budgetAmount').value);
    const period = document.getElementById('budgetPeriod') ? document.getElementById('budgetPeriod').value : 'monthly';

    if (!category || !amount) {
        alert('Please fill all required fields');
        return;
    }

    // Check if budget for this category already exists
    const existingBudget = budgets.find(b => b.category === category);
    if (existingBudget) {
        alert('Budget for this category already exists. Delete the existing one first.');
        return;
    }

    const budget = {
        id: Date.now(),
        category: category,
        amount: amount,
        period: period,
        spent: 0,
        createdAt: new Date().toISOString()
    };

    budgets.push(budget);
    saveData();
    updateAll();
    hideModal('addBudgetModal');
    document.getElementById('budgetForm').reset();
    showToast('Budget added successfully!', 'success');
}

// Delete transaction
async function deleteTransaction(id) {
    if (confirm('Delete this transaction?')) {
        try {
            // Import API module dynamically
            const { default: api } = await import('./api.js');

            await api.transactions.delete(id);

            // Refresh transactions from API if on transactions page
            if (typeof refreshTransactions === 'function') {
                await refreshTransactions();
            }

            updateAll();
            console.log('Transaction deleted successfully');
            showToast('Transaction deleted!', 'success');
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            alert('Failed to delete transaction. Please try again.');
        }
    }
}

// Delete budget
function deleteBudget(id) {
    if (confirm('Delete this budget?')) {
        budgets = budgets.filter(b => b.id !== id);
        saveData();
        updateAll();
        showToast('Budget deleted!', 'success');
    }
}

// Update all displays
function updateAll() {
    console.log('updateAll called');
    updateSummary();
    updateTransactionsList();
    updateBudgetsList();
    updateExpenseChart();
    updateBudgetOverview();
    updateAnalyticsPage();
    updateBudgetPage();

    // Notify analytics page of data changes
    if (typeof window.notifyAnalyticsUpdate === 'function') {
        window.notifyAnalyticsUpdate();
    }
}

// Update summary cards
function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(t => {
        if (t.type === 'income') {
            totalIncome += t.amount;
        } else {
            totalExpenses += t.amount;
        }
    });

    const balance = totalIncome - totalExpenses;

    // Update dashboard elements (correct IDs)
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpensesEl = document.getElementById('totalExpenses');
    const currentBalanceEl = document.getElementById('currentBalance');
    const sidebarBalanceEl = document.getElementById('sidebarBalance');

    if (totalIncomeEl) totalIncomeEl.textContent = formatCurrency(totalIncome);
    if (totalExpensesEl) totalExpensesEl.textContent = formatCurrency(totalExpenses);
    if (currentBalanceEl) currentBalanceEl.textContent = formatCurrency(balance);
    if (sidebarBalanceEl) sidebarBalanceEl.textContent = formatCurrency(balance);

    console.log('Summary updated:', { totalIncome, totalExpenses, balance });
}

// Update transactions list
function updateTransactionsList() {
    const container = document.getElementById('recentTransactions');
    const tableBody = document.getElementById('transactionsTableBody');

    if (container) {
        if (transactions.length === 0) {
            // Show empty state
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-receipt text-muted" style="font-size: 3rem;"></i>
                    <h5 class="text-muted mt-3">No Transactions Yet</h5>
                    <p class="text-muted">Start by adding your first income or expense transaction.</p>
                    <button class="btn btn-primary btn-sm" onclick="showModal('addIncomeModal')">
                        <i class="bi bi-plus-circle me-1"></i>Add Transaction
                    </button>
                </div>
            `;
        } else {
            // Show recent transactions (last 5)
            const recentTransactions = transactions.slice(0, 5);
            container.innerHTML = recentTransactions.map(t => `
                <div class="transaction-item d-flex align-items-center py-2 border-bottom">
                    <div class="transaction-icon me-3">
                        <i class="bi bi-${t.type === 'income' ? 'arrow-up-circle text-success' : 'arrow-down-circle text-danger'}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="fw-semibold">${t.title}</div>
                        <div class="text-muted small">${t.category} • ${formatDate(t.date)}</div>
                    </div>
                    <div class="text-${t.type === 'income' ? 'success' : 'danger'} fw-bold">
                        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                    </div>
                </div>
            `).join('');
        }
    }

    if (tableBody) {
        if (transactions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No transactions yet</td></tr>';
        } else {
            tableBody.innerHTML = transactions.map(t => `
                <tr>
                    <td>${formatDate(t.date)}</td>
                    <td>${t.title}</td>
                    <td><span class="badge bg-${t.type === 'income' ? 'success' : 'danger'}">${t.type}</span></td>
                    <td>${t.category}</td>
                    <td class="text-${t.type === 'income' ? 'success' : 'danger'}">${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editTransaction(${t.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTransaction(${t.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }
}

// Update expense chart on dashboard
function updateExpenseChart() {
    const chartContainer = document.getElementById('expenseChart');
    if (!chartContainer) return;

    // Calculate category spending
    const categorySpending = {};
    let totalExpenses = 0;

    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
            totalExpenses += t.amount;
        });

    const categories = Object.keys(categorySpending);

    if (categories.length === 0) {
        chartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-pie-chart text-muted" style="font-size: 2rem;"></i>
                <p class="text-muted mt-2">No expense data yet</p>
            </div>
        `;
        return;
    }

    // Category colors
    const colors = {
        'Food': '#10b981',
        'Transportation': '#3b82f6',
        'Shopping': '#e4a5b8',
        'Bills': '#6366f1',
        'Entertainment': '#f59e0b',
        'Healthcare': '#ec4899',
        'Education': '#8b5cf6',
        'Other': '#64748b'
    };

    // Generate legend items
    const legendHTML = categories
        .sort((a, b) => categorySpending[b] - categorySpending[a])
        .map(category => {
            const amount = categorySpending[category];
            const percentage = ((amount / totalExpenses) * 100).toFixed(0);
            const color = colors[category] || '#64748b';

            return `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="d-flex align-items-center">
                        <span class="me-2" style="width: 12px; height: 12px; background: ${color}; border-radius: 2px; display: inline-block;"></span>
                        <span>${category}</span>
                    </div>
                    <div class="text-end">
                        <strong>${percentage}%</strong>
                        <div class="text-muted small">${formatCurrency(amount)}</div>
                    </div>
                </div>
            `;
        })
        .join('');

    chartContainer.innerHTML = legendHTML;
}

// Update budget overview on dashboard
function updateBudgetOverview() {
    const container = document.getElementById('budgetOverview');
    if (!container) return;

    if (budgets.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-piggy-bank text-muted" style="font-size: 2rem;"></i>
                <p class="text-muted mt-2">No budgets set yet</p>
                <button class="btn btn-sm btn-primary" onclick="showModal('addBudgetModal')">
                    <i class="bi bi-plus-circle me-1"></i>Set Budget
                </button>
            </div>
        `;
        return;
    }

    // Calculate spending per category
    const categorySpending = {};
    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
        });

    // Generate budget items
    const budgetHTML = budgets.slice(0, 4).map(budget => {
        const spent = categorySpending[budget.category] || 0;
        const percentage = Math.min((spent / budget.amount) * 100, 100);
        const isOverBudget = spent > budget.amount;

        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-medium">${budget.category}</span>
                    <span class="text-muted">${formatCurrency(spent)} / ${formatCurrency(budget.amount)}</span>
                </div>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar ${isOverBudget ? 'bg-danger' : 'bg-success'}" 
                         style="width: ${percentage}%"></div>
                </div>
                <div class="text-end mt-1">
                    <small class="${isOverBudget ? 'text-danger' : 'text-success'}">
                        ${percentage.toFixed(0)}%
                    </small>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = budgetHTML;
}

// Update budgets list
function updateBudgetsList() {
    const container = document.getElementById('budgetOverview');

    if (container) {
        if (budgets.length === 0) {
            container.innerHTML = '<div class="text-center text-muted py-4"><i class="bi bi-piggy-bank fs-1 mb-3 d-block"></i><h6>No budgets set</h6><p>Create your first budget to track spending</p></div>';
        } else {
            container.innerHTML = budgets.map(b => {
                // Calculate spent amount for current month
                const currentMonth = new Date().toISOString().slice(0, 7);
                const spent = transactions
                    .filter(t => t.type === 'expense' &&
                        t.category === b.category &&
                        t.date.slice(0, 7) === currentMonth)
                    .reduce((sum, t) => sum + t.amount, 0);

                const percentage = b.amount > 0 ? (spent / b.amount) * 100 : 0;
                const progressClass = percentage >= 90 ? 'danger' : percentage >= 70 ? 'warning' : 'safe';

                return `
                    <div class="budget-item mb-3">
                        <div class="budget-header d-flex justify-content-between align-items-center mb-2">
                            <div class="budget-title fw-medium">${b.category}</div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteBudget(${b.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="budget-amount small text-muted mb-2">
                            ${formatCurrency(spent)} of ${formatCurrency(b.amount)}
                        </div>
                        <div class="budget-progress mb-2" style="height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden;">
                            <div class="budget-progress-bar ${progressClass}" style="width: ${Math.min(percentage, 100)}%; height: 100%; transition: width 0.3s ease;"></div>
                        </div>
                        <div class="budget-remaining small">
                            ${formatCurrency(Math.max(0, b.amount - spent))} remaining (${percentage.toFixed(1)}%)
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}


// Update Analytics Page
function updateAnalyticsPage() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const totalBalance = totalIncome - totalExpenses;

    // Update analytics summary cards
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpensesEl = document.getElementById('totalExpenses');
    const currentBalanceEl = document.getElementById('currentBalance');

    if (totalIncomeEl) totalIncomeEl.textContent = formatCurrency(totalIncome);
    if (totalExpensesEl) totalExpensesEl.textContent = formatCurrency(totalExpenses);
    if (currentBalanceEl) currentBalanceEl.textContent = formatCurrency(totalBalance);
}

// Update Budget Page
function updateBudgetPage() {
    const totalBudgetAmountEl = document.getElementById('totalBudgetAmount');
    const totalSpentAmountEl = document.getElementById('totalSpentAmount');
    const overallProgressEl = document.getElementById('overallProgress');
    const overallProgressBarEl = document.getElementById('overallProgressBar');
    const remainingAmountEl = document.getElementById('remainingAmount');
    const budgetsListEl = document.getElementById('budgetsList');

    if (!budgetsListEl) return;

    let totalBudgetAmount = 0;
    let totalSpentAmount = 0;
    const currentMonth = new Date().toISOString().slice(0, 7);

    // Calculate total budget
    budgets.forEach(budget => {
        totalBudgetAmount += budget.amount;
    });

    // Calculate total spent this month
    const categorySpending = {};
    transactions
        .filter(t => t.type === 'expense' && t.date.slice(0, 7) === currentMonth)
        .forEach(t => {
            totalSpentAmount += t.amount;
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
        });

    // Update summary
    if (totalBudgetAmountEl) totalBudgetAmountEl.textContent = formatCurrency(totalBudgetAmount);
    if (totalSpentAmountEl) totalSpentAmountEl.textContent = formatCurrency(totalSpentAmount);

    // Update progress
    const progressPercent = totalBudgetAmount > 0 ? (totalSpentAmount / totalBudgetAmount) * 100 : 0;
    if (overallProgressEl) overallProgressEl.textContent = progressPercent.toFixed(1) + '%';
    if (overallProgressBarEl) overallProgressBarEl.style.width = Math.min(progressPercent, 100) + '%';

    const remaining = totalBudgetAmount - totalSpentAmount;
    if (remainingAmountEl) remainingAmountEl.textContent = formatCurrency(remaining) + ' remaining this month';

    // Update budgets list
    if (budgets.length === 0) {
        budgetsListEl.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-piggy-bank text-muted" style="font-size: 2rem;"></i>
                <p class="text-muted mt-2">No budgets set yet. Click "Add Budget" to get started.</p>
            </div>
        `;
    } else {
        budgetsListEl.innerHTML = budgets.map(budget => {
            const spent = categorySpending[budget.category] || 0;
            const percentage = (spent / budget.amount) * 100;
            const remaining = budget.amount - spent;
            const isOverBudget = spent > budget.amount;

            return `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h6 class="mb-1">${budget.category}</h6>
                                <small class="text-muted">${formatCurrency(spent)} of ${formatCurrency(budget.amount)}</small>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="me-3 ${isOverBudget ? 'text-danger' : ''}">${percentage.toFixed(1)}%</span>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteBudget(${budget.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="progress mb-2" style="height: 8px;">
                            <div class="progress-bar ${isOverBudget ? 'bg-danger' : 'bg-success'}" 
                                 style="width: ${Math.min(percentage, 100)}%;" role="progressbar"></div>
                        </div>
                        <small class="text-muted">${formatCurrency(remaining)} remaining</small>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Update spending chart (CSS-based, no external libraries)
function updateSpendingChart() {
    // Update dashboard expense chart legend
    const expenseChart = document.getElementById('expenseChart');
    if (expenseChart) {
        updateExpenseChartLegend();
    }

    console.log('Charts updated with CSS-based implementation');
}

// Update expense chart legend with real data
function updateExpenseChartLegend() {
    const chartLegend = document.querySelector('.chart-legend');
    if (!chartLegend) return;

    // Calculate category spending
    const categorySpending = {};
    let totalExpenses = 0;

    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
            totalExpenses += t.amount;
        });

    // Colors for different categories
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

    // Generate legend HTML
    const legendHTML = Object.entries(categorySpending)
        .map(([category, amount]) => {
            const percentage = totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0;
            const color = categoryColors[category] || '#64748b';

            return `
                <div class="legend-item">
                    <span class="legend-color" style="background: ${color};"></span>
                    <span>${category} - $${amount.toFixed(0)} (${percentage}%)</span>
                </div>
            `;
        })
        .join('');

    if (legendHTML) {
        chartLegend.innerHTML = legendHTML;
    } else {
        chartLegend.innerHTML = '<div class="legend-item"><span>No expense data available</span></div>';
    }
}

// Enhanced Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        // Toggle sidebar on mobile menu button click
        mobileMenuBtn.addEventListener('click', function () {
            const isActive = sidebar.classList.contains('active');

            if (isActive) {
                // Closing sidebar
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                // Opening sidebar
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                mobileMenuBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close sidebar when clicking on sidebar links (mobile only)
        const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 991) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close sidebar on window resize if desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 991) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}


// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeMobileMenu();
});

// Make functions global
window.showModal = showModal;
window.hideModal = hideModal;
window.addIncome = addIncome;
window.addExpense = addExpense;

// Clear sample data (for testing)
function clearSampleData() {
    transactions = [];
    budgets = [];
    sessionStorage.removeItem('financeTracker_transactions');
    sessionStorage.removeItem('financeTracker_budgets');
    updateAll();
}

// Debug function to check data
function debugData() {
    console.log('Transactions:', transactions);
    console.log('Budgets:', budgets);
    console.log('Table element:', document.getElementById('transactionsTableBody'));
    console.log('Recent transactions element:', document.getElementById('recentTransactions'));
}


// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastBody = document.getElementById('toastBody');

    if (!toast || !toastBody) {
        // Fallback to alert if toast not available
        alert(message);
        return;
    }

    toastBody.textContent = message;

    // Reset classes and set new ones
    toast.className = 'toast show';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
    } else {
        toast.classList.add('bg-info', 'text-white');
    }

    // Show the toast
    toast.style.display = 'block';

    // Auto hide after 3 seconds
    setTimeout(() => {
        hideToast();
    }, 3000);
}

// Hide toast notification
function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.style.display = 'none';
        toast.className = 'toast';
    }
}

// Make functions and data globally accessible
window.addIncome = addIncome;
window.addExpense = addExpense;
window.addTransaction = addTransaction;
window.addBudget = addBudget;
window.deleteTransaction = deleteTransaction;
window.deleteBudget = deleteBudget;
window.showModal = showModal;
window.hideModal = hideModal;
window.clearSampleData = clearSampleData;
window.debugData = debugData;
window.showToast = showToast;
window.hideToast = hideToast;
window.updateAll = updateAll;

// Make data arrays globally accessible and reactive
Object.defineProperty(window, 'transactions', {
    get: () => transactions,
    set: (value) => {
        transactions = value;
        updateAll();
    }
});

Object.defineProperty(window, 'budgets', {
    get: () => budgets,
    set: (value) => {
        budgets = value;
        updateAll();
    }
});
