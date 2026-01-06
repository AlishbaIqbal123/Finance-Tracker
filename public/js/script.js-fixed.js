// Data storage
let transactions = [];
let budgets = [];

// Budget Navigation Globals
(function () {
    const storedMonth = localStorage.getItem('ft_budgetViewMonth');
    window.budgetViewMonth = (storedMonth !== null && !isNaN(parseInt(storedMonth)))
        ? parseInt(storedMonth)
        : new Date().getMonth();

    const storedYear = localStorage.getItem('ft_budgetViewYear');
    window.budgetViewYear = (storedYear !== null && !isNaN(parseInt(storedYear)))
        ? parseInt(storedYear)
        : new Date().getFullYear();
})();

// Expose to window
window.transactions = transactions;
window.budgets = budgets;

// Categories
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Business', 'Gifts', 'Rental', 'Bonus', 'Other'];
const expenseCategories = ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Travel', 'Personal Care', 'Subscriptions', 'Other'];

// Helper to get unique key per user
function getStorageKey(baseKey) {
    const profile = localStorage.getItem('financeTracker_profile');
    let email = 'guest';
    if (profile) {
        try {
            const data = JSON.parse(profile);
            email = data.email || 'guest';
        } catch (e) { email = 'guest'; }
    }
    return `ft_${email}_${baseKey} `;
}

// Load data from localStorage on page load
function loadFileData() {
    const transactionKey = getStorageKey('transactions');
    const budgetKey = getStorageKey('budgets');

    const savedTransactions = localStorage.getItem(transactionKey);
    const savedBudgets = localStorage.getItem(budgetKey);

    if (savedTransactions) {
        try {
            transactions = JSON.parse(savedTransactions);
            window.transactions = transactions;
            console.log('Loaded user transactions:', transactions.length);
        } catch (e) {
            transactions = [];
            window.transactions = [];
        }
    } else {
        transactions = [];
        window.transactions = [];
    }

    if (savedBudgets) {
        try {
            budgets = JSON.parse(savedBudgets);
            window.budgets = budgets;
            console.log('Loaded user budgets:', budgets.length);
        } catch (e) {
            budgets = [];
            window.budgets = [];
        }
    } else {
        budgets = [];
        window.budgets = [];
    }
}

// Save data to localStorage
function saveToFile() {
    try {
        // Sync local variables with window variables in case they were updated by other scripts
        if (window.transactions && window.transactions !== transactions) transactions = window.transactions;
        if (window.budgets && window.budgets !== budgets) budgets = window.budgets;

        const transactionKey = getStorageKey('transactions');
        const budgetKey = getStorageKey('budgets');

        localStorage.setItem(transactionKey, JSON.stringify(transactions));
        localStorage.setItem(budgetKey, JSON.stringify(budgets));

        // Ensure globals are also updated (redundant but safe)
        window.transactions = transactions;
        window.budgets = budgets;
    } catch (e) {
        console.error('Error saving to storage:', e);
    }
}

// Compatibility mappings for old function names
window.loadFromSession = loadFileData;
window.saveToSession = saveToFile;
window.saveData = saveToFile;
window.refreshData = loadFileData; // Explicit refresh

// Load data immediately so it's ready for other scripts that run on DOMContentLoaded
loadFileData();

// Start app
document.addEventListener('DOMContentLoaded', function () {
    // Sync sidebar and header profile name
    const savedProfile = localStorage.getItem('financeTracker_profile');
    let isDemoUser = false;
    if (savedProfile) {
        try {
            const profileData = JSON.parse(savedProfile);
            isDemoUser = profileData.email === 'demo@financetracker.com';

            const nameEl = document.getElementById('sidebarUserName');
            const emailEl = document.getElementById('sidebarUserEmail');
            const headerNameEl = document.getElementById('headerUserName');

            if (nameEl && profileData.name) nameEl.textContent = profileData.name;
            if (emailEl && profileData.email) emailEl.textContent = profileData.email;
            if (headerNameEl && profileData.name) headerNameEl.textContent = profileData.name;
        } catch (e) {
            console.error('Profile sync error', e);
        }
    }

    // Only auto-populate sample data for the SPECIFIC demo account
    // Real users should start with a clean slate (empty dashboard)
    if (transactions.length === 0 && isDemoUser) {
        console.log('Demo user: Loading sample data');
        addInitialSampleData();
        saveToFile();
    }

    console.log('App started with', transactions.length, 'transactions');
    updateAll();
    setupButtons();

    // Sidebar Toggle Logic
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Restore state
    if (localStorage.getItem('sidebarCollapsed') === 'true' && sidebar) {
        sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('expanded');
    }

    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }

    // Try initializing analytics if we are on the page
    if (typeof initAnalytics === 'function') {
    }

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function toggleMobileMenu() {
        console.log('Toggling mobile menu...');
        if (sidebar) {
            sidebar.classList.toggle('active');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
            const isActive = sidebar.classList.contains('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
            console.log('Mobile menu is now:', isActive ? 'active' : 'inactive');
        } else {
            console.warn('Sidebar element not found for mobile toggle!');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = function (e) {
            e.preventDefault();
            toggleMobileMenu();
        };
    }

    if (sidebarOverlay) {
        sidebarOverlay.onclick = function () {
            toggleMobileMenu();
        };
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991 && sidebar && sidebar.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Populate category dropdowns on load
    populateCategoryDropdowns();

    // Sync categories in the 'Add Transaction' modal based on type
    const transType = document.getElementById('transactionType');
    if (transType) {
        transType.addEventListener('change', function () {
            updateTransactionCategories(this.value);
        });
    }
});

// Helper to populate all category dropdowns
function populateCategoryDropdowns() {
    const incomeSelects = ['incomeCategory', 'editIncomeCategory'];
    const expenseSelects = ['expenseCategory', 'editExpenseCategory', 'budgetCategory', 'editBudgetCategory'];

    incomeSelects.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = incomeCategories.map(cat => `<option value = "${cat}" > ${cat}</option> `).join('');
        }
    });

    expenseSelects.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = expenseCategories.map(cat => `<option value = "${cat}" > ${cat}</option> `).join('');
        }
    });

    // Handle the generic transaction form (default to expense)
    updateTransactionCategories('expense');
}

function updateTransactionCategories(type) {
    const transCat = document.getElementById('transactionCategory');
    if (!transCat) return;

    const cats = (type === 'income') ? incomeCategories : expenseCategories;
    transCat.innerHTML = cats.map(cat => `<option value = "${cat}" > ${cat}</option> `).join('');
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
            date: `${currentMonth} -15`
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
            date: `${currentMonth} -08`
        },
        {
            id: Date.now() + 6,
            type: 'expense',
            amount: 200,
            category: 'Shopping',
            title: 'Clothing',
            description: 'Winter clothes shopping',
            date: `${currentMonth} -12`
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
            date: `${currentMonth} -18`
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
    // Save to localStorage for persistence
    saveToFile();

    // Notify analytics page of data changes
    if (typeof window.notifyAnalyticsUpdate === 'function') {
        window.notifyAnalyticsUpdate();
    }
}

// Utility functions
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

function formatMoney(amount) {
    const savedCurrency = localStorage.getItem('preferredCurrency') || 'PKR';
    const config = CURRENCY_CONFIG[savedCurrency] || CURRENCY_CONFIG['PKR'];

    try {
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: config.currency
        }).format(amount);
    } catch (e) {
        return `${config.symbol}${amount.toFixed(2)} `;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
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
function addIncome(e) {
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

    const transaction = {
        id: Date.now(),
        title: title.trim(),
        amount: amount,
        type: 'income',
        category: category,
        date: date,
        description: description.trim() || title.trim()
    };

    transactions.unshift(transaction);
    saveData();
    updateAll();
    hideModal('addIncomeModal');

    // Reset form safely
    const form = document.getElementById('incomeForm');
    if (form) form.reset();

    console.log('Income added:', transaction);
}

// Add new expense (dashboard)
function addExpense(e) {
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

    const transaction = {
        id: Date.now(),
        title: title.trim(),
        amount: amount,
        type: 'expense',
        category: category,
        date: date,
        description: description.trim() || title.trim()
    };

    transactions.unshift(transaction);
    saveData();
    updateAll();
    hideModal('addExpenseModal');

    // Reset form safely
    const form = document.getElementById('expenseForm');
    if (form) form.reset();

    console.log('Expense added:', transaction);
}

// Add new transaction (other pages)
function addTransaction(e) {
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
    const description = descriptionEl ? descriptionEl.value : '';

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

    const transaction = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim() || title.trim(),
        amount: amount,
        type: type,
        category: category,
        date: new Date().toISOString().slice(0, 10)
    };

    console.log('Adding transaction:', transaction);

    transactions.unshift(transaction);
    saveData();
    updateAll();
    hideModal('addTransactionModal');

    // Reset form safely
    const form = document.getElementById('transactionForm');
    if (form) form.reset();

    showToast('Transaction added successfully!', 'success');
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
function deleteTransaction(id) {
    if (confirm('Delete this transaction?')) {
        console.log('Deleting transaction with ID:', id, 'Type:', typeof id);
        console.log('Current transactions:', transactions.map(t => ({ id: t.id, type: typeof t.id })));

        // Convert id to both string and number to handle type mismatches
        const stringId = String(id);
        const numberId = Number(id);

        const initialLength = transactions.length;
        transactions = transactions.filter(t => t.id !== id && t.id !== stringId && t.id !== numberId);

        if (transactions.length <initialLength) {
            saveData();
            updateAll();
            console.log('Transaction deleted successfully');
            showToast('Transaction deleted!', 'success');
        } else {
            console.error('Transaction not found for deletion. ID:', id);
            alert('Error: Transaction not found!');
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
    // updateBudgetOverview is handled within updateBudgetsList for consistency
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

    if (totalIncomeEl) totalIncomeEl.textContent = formatMoney(totalIncome);
    if (totalExpensesEl) totalExpensesEl.textContent = formatMoney(totalExpenses);
    if (currentBalanceEl) currentBalanceEl.textContent = formatMoney(balance);
    if (sidebarBalanceEl) sidebarBalanceEl.textContent = formatMoney(balance);

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
    <div class="text-center py-5" >
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
    <div class="transaction-item d-flex align-items-center py-2 border-bottom" >
                    <div class="transaction-icon me-3">
                        <i class="bi bi-${t.type === 'income' ? 'arrow-up-circle text-success' : 'arrow-down-circle text-danger'}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="fw-semibold">${t.title}</div>
                        <div class="text-muted small">${t.category} • ${formatDate(t.date)}</div>
                    </div>
                    <div class="text-${t.type === 'income' ? 'success' : 'danger'} fw-bold">
                        ${t.type === 'income' ? '+' : '-'}${formatMoney(t.amount)}
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
                    <td class="text-${t.type === 'income' ? 'success' : 'danger'}">${t.type === 'income' ? '+' : '-'}${formatMoney(t.amount)}</td>
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
    <div class="text-center py-5" >
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
    <div class="d-flex justify-content-between align-items-center mb-2" >
                    <div class="d-flex align-items-center">
                        <span class="me-2" style="width: 12px; height: 12px; background: ${color}; border-radius: 2px; display: inline-block;"></span>
                        <span>${category}</span>
                    </div>
                    <div class="text-end">
                        <strong>${percentage}%</strong>
                        <div class="text-muted small">${formatMoney(amount)}</div>
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
    <div class="text-center py-5" >
                <i class="bi bi-piggy-bank text-muted" style="font-size: 2rem;"></i>
                <p class="text-muted mt-2">No budgets set yet</p>
                <button class="btn btn-sm btn-primary" onclick="showModal('addBudgetModal')">
                    <i class="bi bi-plus-circle me-1"></i>Set Budget
                </button>
            </div>
    `;
        return;
    }

    // Calculate spending per category (Current Month only)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const categorySpending = {};
    transactions
        .filter(t => {
            if (t.type !== 'expense' || !t.date) return false;
            try {
                const tDate = new Date(t.date);
                if (isNaN(tDate.getTime())) return false;
                return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
            } catch (e) { return false; }
        })
        .forEach(t => {
            if (t.category) {
                const cat = t.category.trim().toLowerCase();
                categorySpending[cat] = (categorySpending[cat] || 0) + (Number(t.amount) || 0);
            }
        });

    // Generate budget items
    const budgetHTML = budgets.slice(0, 4).map(budget => {
        const spent = categorySpending[budget.category] || 0;
        const percentage = Math.min((spent / budget.amount) * 100, 100);
        const isOverBudget = spent> budget.amount;

        return `
    <div class="mb-3" >
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-medium">${budget.category}</span>
                    <span class="text-muted small">${formatMoney(spent)} / ${formatMoney(budget.amount)}</span>
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
    const mainListContainer = document.getElementById('budgetsList');
    if (!container && !mainListContainer) return;

    // Filter transactions to the VIEW month (handles 0 correctly)
    const viewMonth = (window.budgetViewMonth !== undefined) ? window.budgetViewMonth : new Date().getMonth();
    const viewYear = (window.budgetViewYear !== undefined) ? window.budgetViewYear : new Date().getFullYear();
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const yearMonthTag = `${viewYear} -${monthStr} `;

    console.log(`Budgets: Filtering for ${yearMonthTag}.Total transactions: ${transactions.length} `);

    const monthlyExpenses = transactions.filter(t => {
        if (!t || t.type !== 'expense' || !t.date) return false;
        // String comparison is safer than Date object manipulation for monthly buckets
        return t.date.trim().startsWith(yearMonthTag);
    });

    console.log(`Found ${monthlyExpenses.length} expenses for ${yearMonthTag}`);

    // Helper to calculate spent for a budget
    const getSpentForCategory = (category) => {
        if (!category) return 0;
        const targetCategory = category.trim().toLowerCase();

        return monthlyExpenses
            .filter(t => t.category && String(t.category).trim().toLowerCase() === targetCategory)
            .reduce((sum, t) => {
                const amt = Number(t.amount) || 0;
                return sum + amt;
            }, 0);
    };

    const renderBudget = (b, isCard) => {
        const spent = getSpentForCategory(b.category);
        const percentage = b.amount> 0 ? (spent / b.amount) * 100 : 0;
        const isOver = spent> b.amount;
        const remaining = Math.max(0, b.amount - spent);

        let progressClass = 'bg-success';
        if (percentage>= 100) progressClass = 'bg-danger';
        else if (percentage>= 80) progressClass = 'bg-warning';

        // Get transactions for this budget to show details as requested
        const categoryTransactions = monthlyExpenses
            .filter(t => t.category === b.category)
            .slice(0, 3); // Show last 3

        const transactionsHtml = categoryTransactions.length> 0
            ? `<div class= "mt-3 pt-2 border-top" >
    <div class="x-small text-muted mb-1 uppercase fw-bold">Recent activity</div>
                ${categoryTransactions.map(t => `
                    <div class="d-flex justify-content-between x-small py-1">
                        <span class="text-truncate" style="max-width: 120px;">${t.title}</span>
                        <span class="fw-bold">${formatMoney(t.amount)}</span>
                    </div>
                `).join('')
            }
               </div> `
            : '';

        if (isCard) {
            return `
    <div class="col-lg-6 col-md-12 mb-4" >
        <div class="card h-100 border-0 shadow-sm hover-up">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 class="mb-0 fw-bold">${b.category}</h5>
                        <span class="badge ${isOver ? 'bg-danger-soft text-danger' : 'bg-success-soft text-success'} mt-1">
                            ${isOver ? 'Over Limit' : 'On Track'}
                        </span>
                    </div>
                    <button class="btn btn-sm btn-light text-danger rounded-circle" onclick="deleteBudget(${b.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>

                <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted small">Spent: <strong>${formatMoney(spent)}</strong></span>
                    <span class="text-muted small">Target: <strong>${formatMoney(b.amount)}</strong></span>
                </div>

                <div class="progress mb-2" style="height: 8px; border-radius: 10px;">
                    <div class="progress-bar ${progressClass} progress-bar-striped progress-bar-animated"
                        style="width: ${Math.min(percentage, 100)}%"></div>
                </div>

                <div class="d-flex justify-content-between small">
                    <span class="${isOver ? 'text-danger fw-bold' : 'text-muted'}">${percentage.toFixed(0)}% used</span>
                    <span class="fw-bold ${isOver ? 'text-danger' : 'text-success'}">${isOver ? 'Over' : 'Left'}: ${formatMoney(Math.abs(b.amount - spent))}</span>
                </div>

                ${transactionsHtml}
            </div>
        </div>
                </div> `;
        }

        // Dashboard simpler version
        return `
    <div class="mb-3" >
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-medium">${b.category}</span>
                    <span class="small text-muted">${formatMoney(spent)} / ${formatMoney(b.amount)}</span>
                </div>
                <div class="progress" style="height: 6px;">
                    <div class="progress-bar ${progressClass}" style="width: ${Math.min(percentage, 100)}%"></div>
                </div>
            </div> `;
    };

    if (container) {
        if (budgets.length === 0) {
            container.innerHTML = '<div class="text-center py-4 text-muted small"><i class="bi bi-piggy-bank d-block fs-2 mb-2"></i>No budgets set</div>';
        } else {
            container.innerHTML = budgets.slice(0, 4).map(b => renderBudget(b, false)).join('');
        }
    }

    if (mainListContainer) {
        if (budgets.length === 0) {
            mainListContainer.innerHTML = '<div class="col-12 text-center py-5 text-muted"><p>No budgets found for this month.</p></div>';
        } else {
            mainListContainer.innerHTML = `<div class="row g-4" > ${budgets.map(b => renderBudget(b, true)).join('')}</div> `;
        }
    }
}



// Update Analytics Page
function updateAnalyticsPage() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += Number(transaction.amount) || 0;
        } else {
            totalExpenses += Number(transaction.amount) || 0;
        }
    });

    const totalBalance = totalIncome - totalExpenses;

    // Update analytics summary cards (Try both possible ID sets)
    const incomeEls = [document.getElementById('totalIncome'), document.getElementById('analyticsIncome')];
    const expenseEls = [document.getElementById('totalExpenses'), document.getElementById('analyticsExpenses')];
    const balanceEls = [document.getElementById('currentBalance'), document.getElementById('analyticsBalance')];

    const updateEl = (els, value, color) => {
        els.forEach(el => {
            if (el) {
                // If the element has children (like small or i tags), we only want to update the text part
                // In our current summary-card component, we just want to update the text content but keep the trend
                // Actually, formatMoney returns the string with symbol, which is what we want.
                const formatted = formatMoney(value);

                // Preserve small tag if it exists (for trend display)
                const small = el.querySelector('small');
                el.textContent = formatted;
                if (small) el.appendChild(small);
            }
        });
    };

    updateEl(incomeEls, totalIncome);
    updateEl(expenseEls, totalExpenses);
    updateEl(balanceEls, totalBalance);
}

// Update Budget Page
function updateBudgetPage() {
    const totalBudgetAmountEl = document.getElementById('totalBudgetAmount');
    const totalSpentAmountEl = document.getElementById('totalSpentAmount');
    const overallProgressEl = document.getElementById('overallProgress');
    const overallProgressBarEl = document.getElementById('overallProgressBar');
    const remainingAmountEl = document.getElementById('remainingAmount');

    // Not on budget page or elements missing
    if (!totalBudgetAmountEl && !totalSpentAmountEl) {
        // Not on budget page or elements missing
        return;
    }

    // Reliance on global variables
    const currentTransactions = transactions || [];
    const currentBudgets = budgets || [];

    // Use the same view month as the list
    const viewMonth = (window.budgetViewMonth !== undefined) ? window.budgetViewMonth : new Date().getMonth();
    const viewYear = (window.budgetViewYear !== undefined) ? window.budgetViewYear : new Date().getFullYear();
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const yearMonthTag = `${viewYear} -${monthStr} `;

    // Update month display if it exists
    const monthDisplay = document.getElementById('budgetMonthDisplay');
    if (monthDisplay) {
        const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
        monthDisplay.textContent = monthName;
    }

    let totalBudgetAmount = 0;
    let totalSpentInBudgetedCategories = 0;

    currentBudgets.forEach(b => totalBudgetAmount += Number(b.amount) || 0);

    // Calculate total spending for the SELECTED month
    currentTransactions.forEach(t => {
        if (t.type !== 'expense' || !t.date) return;
        if (t.date.startsWith(yearMonthTag)) {
            totalSpentInBudgetedCategories += (Number(t.amount) || 0);
        }
    });

    if (totalBudgetAmountEl) totalBudgetAmountEl.textContent = formatMoney(totalBudgetAmount);
    if (totalSpentAmountEl) totalSpentAmountEl.textContent = formatMoney(totalSpentInBudgetedCategories);

    const progress = totalBudgetAmount> 0 ? (totalSpentInBudgetedCategories / totalBudgetAmount) * 100 : 0;
    if (overallProgressEl) overallProgressEl.textContent = progress.toFixed(0) + '%';
    if (overallProgressBarEl) overallProgressBarEl.style.width = Math.min(progress, 100) + '%';

    const remaining = totalBudgetAmount - totalSpentInBudgetedCategories;
    if (remainingAmountEl) {
        remainingAmountEl.textContent = remaining>= 0
            ? `${formatMoney(remaining)} remaining this month`
            : `${formatMoney(Math.abs(remaining))} over total budget`;
        remainingAmountEl.className = remaining <0 ? 'text-danger mb-0' : 'text-muted mb-0';
    }

    updateBudgetsList();
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
            const percentage = totalExpenses> 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0;
            const color = categoryColors[category] || '#64748b';

            return `
    <div class="legend-item" >
                    <span class="legend-color" style="background: ${color};"></span>
                    <span>${category} - ${formatMoney(amount)} (${percentage}%)</span>
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
            } else {
                // Opening sidebar
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                mobileMenuBtn.classList.add('active');
            }
        });

        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });

        // Close sidebar when clicking on sidebar links (mobile only)
        const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });

        // Close sidebar on window resize if desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth> 768) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
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
    localStorage.removeItem('transactions');
    localStorage.removeItem('budgets');
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
// Guest / Demo Protection Logic
function isGuest() {
    const profile = localStorage.getItem('financeTracker_profile');
    if (!profile) return true; // No profile = guest
    try {
        const data = JSON.parse(profile);
        // Only the specific official demo email is treated as restricted guest
        return data.email === 'demo@financetracker.com';
    } catch (e) { return true; }
}

function checkGuestAccess() {
    if (isGuest()) {
        showToast('Demo Mode: Please login or sign up to save changes.', 'error');
        return false;
    }
    return true;
}

// Wrap original functions with guest checks
const originalAddTransaction = addTransaction;
const originalDeleteTransaction = deleteTransaction;
const originalAddBudget = addBudget;
const originalDeleteBudget = deleteBudget;

window.addTransaction = function () {
    if (!checkGuestAccess()) return;
    return originalAddTransaction.apply(this, arguments);
};

window.deleteTransaction = function () {
    if (!checkGuestAccess()) return;
    return originalDeleteTransaction.apply(this, arguments);
};

window.addBudget = function () {
    if (!checkGuestAccess()) return;
    return originalAddBudget.apply(this, arguments);
};

window.deleteBudget = function () {
    if (!checkGuestAccess()) return;
    return originalDeleteBudget.apply(this, arguments);
};

window.showModal = showModal;
window.hideModal = hideModal;
window.clearSampleData = function () {
    if (!checkGuestAccess()) return;
    return clearSampleData.apply(this, arguments);
};
window.debugData = debugData;
window.showToast = showToast;
window.hideToast = hideToast;
window.updateAll = updateAll;
window.formatMoney = formatMoney;
window.getCurrentCurrency = getCurrentCurrency;
window.formatDate = formatDate;

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

// Budget Navigation Function
window.changeBudgetMonth = function (delta) {
    console.log('changeBudgetMonth called with:', delta);

    // Use current or default
    let month = (window.budgetViewMonth !== undefined) ? window.budgetViewMonth : new Date().getMonth();
    let year = (window.budgetViewYear !== undefined) ? window.budgetViewYear : new Date().getFullYear();

    let nextMonth = month + delta;

    if (nextMonth <0) {
        window.budgetViewMonth = 11;
        window.budgetViewYear = year - 1;
    } else if (nextMonth> 11) {
        window.budgetViewMonth = 0;
        window.budgetViewYear = year + 1;
    } else {
        window.budgetViewMonth = nextMonth;
        window.budgetViewYear = year;
    }

    console.log('New budget view context:', window.budgetViewYear, window.budgetViewMonth);

    // Persist
    localStorage.setItem('ft_budgetViewMonth', window.budgetViewMonth);
    localStorage.setItem('ft_budgetViewYear', window.budgetViewYear);

    // Refresh UI
    if (typeof updateAll === 'function') {
        updateAll();
    } else {
        console.error('updateAll not found');
    }
};
