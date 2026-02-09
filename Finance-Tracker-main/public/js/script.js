// Data storage
let transactions = [];
let budgets = [];

// Script Version: 1.14 (Updated at 2026-02-10 01:30:00)
console.log('FinanceTracker Script v1.14 initialized');

// --- Global Budget Navigation Logic (Moved up for availability) ---
window.budgetViewMonth = (function () {
    const val = localStorage.getItem('ft_budgetViewMonth');
    return (val !== null && !isNaN(parseInt(val))) ? parseInt(val) : new Date().getMonth();
})();

window.budgetViewYear = (function () {
    const val = localStorage.getItem('ft_budgetViewYear');
    return (val !== null && !isNaN(parseInt(val))) ? parseInt(val) : new Date().getFullYear();
})();

window.setBudgetView = function (month, year) {
    const oldM = window.budgetViewMonth;
    const oldY = window.budgetViewYear;

    window.budgetViewMonth = parseInt(month);
    window.budgetViewYear = parseInt(year);

    console.log('Setting Budget View -> Year:', window.budgetViewYear, 'Month:', window.budgetViewMonth);

    // Persist to storage
    localStorage.setItem('ft_budgetViewMonth', window.budgetViewMonth);
    localStorage.setItem('ft_budgetViewYear', window.budgetViewYear);

    // Refresh everything
    if (typeof updateAll === 'function') updateAll();

    // Scroll to top if values actually changed
    if (oldM !== window.budgetViewMonth || oldY !== window.budgetViewYear) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Safety check for specific UI refreshes
    if (typeof updateBudgetPage === 'function') try { updateBudgetPage(); } catch (e) { }
    if (typeof updateBudgetOverview === 'function') try { updateBudgetOverview(); } catch (e) { }
};

window.changeBudgetMonth = function (delta, e) {
    if (e && e.preventDefault) e.preventDefault();

    let m = parseInt(window.budgetViewMonth);
    let y = parseInt(window.budgetViewYear);

    m += delta;
    if (m < 0) { m = 11; y -= 1; }
    else if (m > 11) { m = 0; y += 1; }

    window.setBudgetView(m, y);
};
// --- End Navigation Logic ---

// Sample Data Definitions (Moved to global scope for reliable initialization)
const sampleTransactions2026 = [
    // Jan 2026
    { id: 10001, type: 'income', amount: 5500, category: 'Salary', title: 'Monthly Salary', description: 'Jan Salary', date: '2026-01-01' },
    { id: 10017, type: 'income', amount: 800, category: 'Freelance', title: 'Web Project', description: 'Website design', date: '2026-01-20' },
    { id: 10003, type: 'expense', amount: 1500, category: 'Bills', title: 'Rent', description: 'Monthly rent', date: '2026-01-01' },
    { id: 10004, type: 'expense', amount: 450, category: 'Food', title: 'Groceries', description: 'Weekly groceries', date: '2026-01-05' },
    { id: 10005, type: 'expense', amount: 200, category: 'Entertainment', title: 'Movie Night', description: 'Netflix & Chill', date: '2026-01-15' },
    { id: 10016, type: 'expense', amount: 150, category: 'Healthcare', title: 'Checkup', description: 'Annual checkup', date: '2026-01-10' },
    { id: 10018, type: 'expense', amount: 45, category: 'Transportation', title: 'Uber', description: 'Ride to meeting', date: '2026-01-08' },

    // Feb 2026
    { id: 10006, type: 'income', amount: 5500, category: 'Salary', title: 'Salary Feb', description: 'Feb Salary', date: '2026-02-01' },
    { id: 10020, type: 'income', amount: 300, category: 'Freelance', title: 'Logo Design', description: 'Small project', date: '2026-02-22' },
    { id: 10007, type: 'expense', amount: 300, category: 'Transportation', title: 'Fuel', description: 'Gas refill', date: '2026-02-05' },
    { id: 10008, type: 'expense', amount: 120, category: 'Food', title: 'Dinner', description: 'Restaurant', date: '2026-02-12' },
    { id: 10012, type: 'expense', amount: 250, category: 'Shopping', title: 'New Shoes', description: 'Nike sale', date: '2026-02-18' },
    { id: 10013, type: 'expense', amount: 1500, category: 'Bills', title: 'Rent Feb', description: 'Monthly rent', date: '2026-02-01' },
    { id: 10019, type: 'expense', amount: 60, category: 'Healthcare', title: 'Meds', description: 'Pharmacy', date: '2026-02-15' },

    // March 2026
    { id: 10014, type: 'income', amount: 5500, category: 'Salary', title: 'Salary March', description: 'March Salary', date: '2026-03-01' },
    { id: 10015, type: 'expense', amount: 400, category: 'Food', title: 'Party Food', description: 'Birthday prep', date: '2026-03-05' },

    // Dec 2025
    { id: 10009, type: 'income', amount: 5000, category: 'Salary', title: 'Dec Salary', description: 'Bonus included', date: '2025-12-01' },
    { id: 10010, type: 'expense', amount: 1500, category: 'Bills', title: 'Rent Dec', description: 'Dec rent', date: '2025-12-01' },
    { id: 10011, type: 'expense', amount: 600, category: 'Shopping', title: 'Gifts', description: 'Holiday shopping', date: '2025-12-20' }
];

const sampleBudgets2026 = [
    // Dec 2025 Budgets
    { id: 20001, category: 'Food', amount: 600, month: 11, year: 2025, period: 'monthly', createdAt: '2025-12-01' },
    { id: 20005, category: 'Bills', amount: 1600, month: 11, year: 2025, period: 'monthly', createdAt: '2025-12-01' },

    // Jan 2026 Budgets
    { id: 20006, category: 'Food', amount: 500, month: 0, year: 2026, period: 'monthly', createdAt: '2026-01-01' },
    { id: 20007, category: 'Bills', amount: 1500, month: 0, year: 2026, period: 'monthly', createdAt: '2026-01-01' },
    { id: 20008, category: 'Entertainment', amount: 300, month: 0, year: 2026, period: 'monthly', createdAt: '2026-01-01' },
    { id: 20009, category: 'Transportation', amount: 200, month: 0, year: 2026, period: 'monthly', createdAt: '2026-01-01' },
    { id: 20014, category: 'Healthcare', amount: 500, month: 0, year: 2026, period: 'monthly', createdAt: '2026-01-01' },

    // Feb 2026 Budgets
    { id: 20010, category: 'Food', amount: 550, month: 1, year: 2026, period: 'monthly', createdAt: '2026-02-01' },
    { id: 20011, category: 'Bills', amount: 1500, month: 1, year: 2026, period: 'monthly', createdAt: '2026-02-01' },
    { id: 20012, category: 'Shopping', amount: 400, month: 1, year: 2026, period: 'monthly', createdAt: '2026-02-01' },
    { id: 20013, category: 'Transportation', amount: 350, month: 1, year: 2026, period: 'monthly', createdAt: '2026-02-01' },
    { id: 20015, category: 'Healthcare', amount: 200, month: 1, year: 2026, period: 'monthly', createdAt: '2026-02-01' },
    { id: 20016, category: 'Entertainment', amount: 400, month: 1, year: 2026, period: 'monthly', createdAt: '2026-02-01' }
];


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
    return `ft_${email}_${baseKey}`;
}

// Load data from localStorage on page load
async function loadFileData() {
    const transactionKey = getStorageKey('transactions');
    const budgetKey = getStorageKey('budgets');

    // Check if we are a guest
    const isGuestUser = isGuest();

    let savedTransactions = localStorage.getItem(transactionKey);
    let savedBudgets = localStorage.getItem(budgetKey);

    // CRITICAL: Demo Data Injection
    const demoVersion = '1.12';
    const savedVersion = localStorage.getItem('ft_demo_version');
    const userProfile = localStorage.getItem('financeTracker_profile');
    let isDemoAccount = false;
    if (userProfile) {
        try {
            if (JSON.parse(userProfile).email === 'demo@financetracker.com') isDemoAccount = true;
        } catch (e) { }
    }

    const shouldInject = isGuestUser || isDemoAccount;

    if (shouldInject && (!savedTransactions || savedTransactions === '[]' || savedVersion !== demoVersion)) {
        console.log('Demo/Guest mode: Injecting sample data');
        transactions = [...sampleTransactions2026];
        budgets = [...sampleBudgets2026];
        localStorage.setItem(transactionKey, JSON.stringify(transactions));
        localStorage.setItem(budgetKey, JSON.stringify(budgets));
        localStorage.setItem('ft_demo_version', demoVersion);
        window.transactions = transactions;
        window.budgets = budgets;
        updateAll();
        return;
    }

    // Normal Load from LocalStorage
    if (savedTransactions) {
        try {
            transactions = JSON.parse(savedTransactions);
        } catch (e) { transactions = []; }
    } else {
        transactions = [];
    }
    window.transactions = transactions;

    if (savedBudgets) {
        try {
            budgets = JSON.parse(savedBudgets);
        } catch (e) { budgets = []; }
    } else {
        budgets = [];
    }
    window.budgets = budgets;

    // --- SYNC WITH DATABASE IF LOGGED IN ---
    if (!isGuestUser && !isDemoAccount) {
        try {
            console.log('Syncing with database...');
            const response = await fetch('/api/transactions', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                const result = await response.json();

                // Only overwrite if server has data, OR if local is currently empty
                // This prevents the "glitch" where local data disappears if server is empty
                if (result.data && (result.data.length > 0 || transactions.length === 0)) {
                    // Check if server data is actually different or newer
                    // For now, we prefer server as the source of truth if it has items
                    if (result.data.length > 0) {
                        transactions = result.data;
                        window.transactions = transactions;
                        localStorage.setItem(transactionKey, JSON.stringify(transactions));
                        console.log('Database sync complete:', transactions.length, 'items');
                    }
                } else if (result.data && result.data.length === 0 && transactions.length > 0) {
                    console.log('Server is empty but local has data. Keeping local data.');
                    // Optional: You could trigger a bulk push here if you wanted
                }

                updateAll();
            }
        } catch (e) {
            console.warn('Database sync failed (offline or auth issue)', e);
        }
    }
}

// Save data to localStorage
function saveData() {
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

        // Notify analytics page if available
        if (typeof window.notifyAnalyticsUpdate === 'function') {
            try { window.notifyAnalyticsUpdate(); } catch (e) { }
        }
    } catch (e) {
        console.error('Error saving to storage:', e);
    }
}

// Compatibility mappings for old function names
window.loadFromSession = loadFileData;
window.saveToSession = saveData;
window.saveData = saveData;
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

    // Data loading is now handled strictly by loadFileData called above.
    // It enforces versioning and guest checks to ensure data is present.
    // We do NOT need to double-check here, as it may cause race conditions.

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
            el.innerHTML = incomeCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        }
    });

    expenseSelects.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = expenseCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        }
    });

    // Handle the generic transaction form (default to expense)
    updateTransactionCategories('expense');
}

function updateTransactionCategories(type) {
    const transCat = document.getElementById('transactionCategory');
    if (!transCat) return;

    const cats = (type === 'income') ? incomeCategories : expenseCategories;
    transCat.innerHTML = cats.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

// Helper function to check for guest access
// (Implementation moved to the end of the file)

// Add initial sample data for new users
function addInitialSampleData() {
    // This function is now a fallback wrapper, as data is defined globally
    window.transactions = [...sampleTransactions2026];
    window.budgets = [...sampleBudgets2026];
    saveData();
    console.log('Demo data loaded for 2026 via addInitialSampleData');
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
    saveData();
    console.log('Sample data loaded via addSampleData');
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
async function addIncome(e) {
    if (e) e.preventDefault();
    console.log('addIncome triggered');

    if (checkGuestAccess()) {
        console.warn('addIncome: Access blocked by checkGuestAccess');
        return;
    }

    try {
        // Check if elements exist
        const titleEl = document.getElementById('incomeTitle');
        const amountEl = document.getElementById('incomeAmount');
        const categoryEl = document.getElementById('incomeCategory');
        const descriptionEl = document.getElementById('incomeDescription');

        if (!titleEl || !amountEl || !categoryEl) {
            console.error('Income form elements not found', { titleEl, amountEl, categoryEl });
            alert('Form elements missing. Please refresh the page.');
            return;
        }

        const title = titleEl.value;
        const amount = parseFloat(amountEl.value);
        const category = categoryEl.value;
        const description = descriptionEl ? descriptionEl.value : title;
        const dateEl = document.getElementById('incomeDate');
        const date = (dateEl && dateEl.value) ? dateEl.value : new Date().toISOString().slice(0, 10);

        // Validation
        if (!title || title.trim() === '') { alert('Please enter a title'); return; }
        if (isNaN(amount) || amount <= 0) { alert('Please enter a valid amount'); return; }

        const transactionData = {
            title: title.trim(),
            amount: amount,
            type: 'income',
            category: category,
            date: date,
            description: description.trim() || title.trim()
        };

        let finalTransaction = { ...transactionData, id: Date.now() };

        // API Call if not guest
        if (!isGuest()) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            try {
                const response = await fetch('/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify(transactionData)
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.data) {
                        finalTransaction = result.data;
                        console.log('Saved to database with ID:', finalTransaction.id);
                    }
                } else {
                    const error = await response.json();
                    console.error('Failed to save to database:', error);
                    // We'll still keep it locally for now
                }
            } catch (err) {
                console.error('API call error:', err);
            }
        }

        transactions.unshift(finalTransaction);
        saveData();
        updateAll();
        hideModal('addIncomeModal');

        const form = document.getElementById('incomeForm');
        if (form) form.reset();

        showToast('Income added successfully!', 'success');
    } catch (err) {
        console.error('Critical error in addIncome:', err);
        alert('An error occurred while saving. Check console for details.');
    }
}

// Add new expense (dashboard)
async function addExpense(e) {
    if (e) e.preventDefault();
    console.log('addExpense triggered');

    if (checkGuestAccess()) {
        console.warn('addExpense: Access blocked by checkGuestAccess');
        return;
    }

    try {
        const titleEl = document.getElementById('expenseTitle');
        const amountEl = document.getElementById('expenseAmount');
        const categoryEl = document.getElementById('expenseCategory');
        const descriptionEl = document.getElementById('expenseDescription');

        if (!titleEl || !amountEl || !categoryEl) {
            console.error('Expense form elements not found');
            alert('Form elements missing. Please refresh the page.');
            return;
        }

        const title = titleEl.value;
        const amount = parseFloat(amountEl.value);
        const category = categoryEl.value;
        const description = descriptionEl ? descriptionEl.value : title;
        const dateEl = document.getElementById('expenseDate');
        const date = (dateEl && dateEl.value) ? dateEl.value : new Date().toISOString().slice(0, 10);

        if (!title || title.trim() === '') { alert('Please enter a title'); return; }
        if (isNaN(amount) || amount <= 0) { alert('Please enter a valid amount'); return; }

        const transactionData = {
            title: title.trim(),
            amount: amount,
            type: 'expense',
            category: category,
            date: date,
            description: description.trim() || title.trim()
        };

        let finalTransaction = { ...transactionData, id: Date.now() };

        // API Call if not guest
        if (!isGuest()) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            try {
                const response = await fetch('/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify(transactionData)
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.data) {
                        finalTransaction = result.data;
                    }
                }
            } catch (err) {
                console.error('API call error:', err);
            }
        }

        transactions.unshift(finalTransaction);
        saveData();
        updateAll();
        hideModal('addExpenseModal');

        const form = document.getElementById('expenseForm');
        if (form) form.reset();

        showToast('Expense added successfully!', 'success');
    } catch (err) {
        console.error('Critical error in addExpense:', err);
        alert('An error occurred while saving. Check console for details.');
    }
}

// Add new transaction (other pages)
async function addTransaction(e) {
    if (e) e.preventDefault();
    console.log('addTransaction triggered');

    if (checkGuestAccess()) return;

    try {
        const titleEl = document.getElementById('transactionTitle');
        const amountEl = document.getElementById('transactionAmount');
        const typeEl = document.getElementById('transactionType');
        const categoryEl = document.getElementById('transactionCategory');
        const descriptionEl = document.getElementById('transactionDescription');

        if (!titleEl || !amountEl || !typeEl || !categoryEl) {
            console.error('Form elements not found', { titleEl, amountEl, typeEl, categoryEl });
            alert('Form elements missing. Please refresh the page.');
            return;
        }

        const title = titleEl.value;
        const amount = parseFloat(amountEl.value);
        const type = typeEl.value;
        const category = categoryEl.value;
        const description = descriptionEl ? descriptionEl.value : '';
        const dateEl = document.getElementById('transactionDate');
        const date = (dateEl && dateEl.value) ? dateEl.value : new Date().toISOString().slice(0, 10);

        if (!title || title.trim() === '') { alert('Please enter a title'); return; }
        if (isNaN(amount) || amount <= 0) { alert('Please enter a valid amount'); return; }

        const transactionData = {
            title: title.trim(),
            description: description.trim() || title.trim(),
            amount: amount,
            type: type,
            category: category,
            date: date
        };

        let finalTransaction = { ...transactionData, id: Date.now() };

        // API Call if not guest
        if (!isGuest()) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            try {
                const response = await fetch('/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify(transactionData)
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.data) {
                        finalTransaction = result.data;
                    }
                }
            } catch (err) {
                console.error('API call error:', err);
            }
        }

        transactions.unshift(finalTransaction);
        saveData();
        updateAll();
        hideModal('addTransactionModal');

        const form = document.getElementById('transactionForm');
        if (form) form.reset();

        showToast('Transaction added successfully!', 'success');
    } catch (err) {
        console.error('Critical error in addTransaction:', err);
        alert('An error occurred while saving. Check console for details.');
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

    // Check if budget for this category already exists for THIS month
    const viewMonth = parseInt(window.budgetViewMonth);
    const viewYear = parseInt(window.budgetViewYear);

    const existingBudget = budgets.find(b => {
        const matchesCategory = b.category === category;
        if (!matchesCategory) return false;

        // Strict month/year match if properties exist
        if (b.month !== undefined && b.year !== undefined) {
            return parseInt(b.month) === viewMonth && parseInt(b.year) === viewYear;
        }

        // Fallback for very old data that only has createdAt
        if (b.createdAt) {
            const date = new Date(b.createdAt);
            return date.getMonth() === viewMonth && date.getFullYear() === viewYear;
        }

        return false;
    });

    if (existingBudget) {
        const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' });
        alert(`A budget for "${category}" already exists for ${monthName} ${viewYear}.`);
        return;
    }

    const budget = {
        id: Date.now(),
        category: category,
        amount: amount,
        period: period,
        spent: 0,
        month: viewMonth,
        year: viewYear,
        createdAt: new Date().toISOString()
    };

    budgets.push(budget);
    saveData();
    updateAll();
    hideModal('addBudgetModal');
    if (document.getElementById('budgetForm')) document.getElementById('budgetForm').reset();
    showToast('Budget added successfully!', 'success');
}

// Delete transaction
async function deleteTransaction(id) {
    console.log('deleteTransaction called with ID:', id);
    if (checkGuestAccess()) {
        console.warn('deleteTransaction blocked by guest access');
        return;
    }

    if (confirm('Delete this transaction?')) {
        const stringId = String(id);
        const numberId = Number(id);

        console.log('Current transactions count:', transactions.length);
        const initialLength = transactions.length;

        let shouldRemoveLocally = true;

        // Attempt to delete from backend API if NOT a guest
        const isGuestUser = isGuest();
        if (!isGuestUser) {
            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                const response = await fetch(`/api/transactions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                });

                if (response.ok) {
                    console.log('Successfully deleted from database');
                } else if (response.status === 404) {
                    console.warn('Transaction not found on server, might be local only');
                } else {
                    const errorData = await response.json();
                    console.error('Failed to delete from database:', errorData.message || response.statusText);
                    alert('Failed to delete from server: ' + (errorData.message || 'Unauthorized or server error'));
                    shouldRemoveLocally = false;
                }
            } catch (error) {
                console.error('Error calling delete API:', error);
                alert('Connection error. Could not delete from server.');
                shouldRemoveLocally = false;
            }
        }

        if (shouldRemoveLocally) {
            console.log('Filtering local state for ID:', id, '(type:', typeof id, ')');

            // Filter the existing array
            const newTransactions = transactions.filter(t => {
                // Handle various ID types safely (Number vs String)
                const isMatch = String(t.id) === stringId || Number(t.id) === numberId || t.id === id;
                if (isMatch) console.log('Found match to remove:', t);
                return !isMatch; // Keep if NOT a match
            });

            const removedCount = transactions.length - newTransactions.length;
            console.log('Removed', removedCount, 'items from local state');

            // CRITICAL: Update the global variable via the SETTER to trigger updateAll and reactive UI
            window.transactions = newTransactions;

            saveData();
            showToast('Transaction deleted!', 'success');
            console.log('Transaction deleted successfully');
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

// Dashboard Budget Overview Month Nav UI
function updateAll() {
    console.log('updateAll triggered');
    try {
        updateSummary();
    } catch (e) { console.warn('updateSummary failed:', e); }

    try {
        updateTransactionsList();
    } catch (e) { console.warn('updateTransactionsList failed:', e); }

    try {
        updateBudgetOverview();
    } catch (e) { console.warn('updateBudgetOverview failed:', e); }

    try {
        updateBudgetsList();
    } catch (e) { console.warn('updateBudgetsList failed:', e); }

    try {
        updateExpenseChart();
    } catch (e) { console.warn('updateExpenseChart failed:', e); }

    try {
        updateAnalyticsPage();
    } catch (e) { console.warn('updateAnalyticsPage failed:', e); }

    try {
        updateBudgetPage();
    } catch (e) { console.warn('updateBudgetPage failed:', e); }

    if (typeof window.notifyAnalyticsUpdate === 'function') {
        try {
            window.notifyAnalyticsUpdate();
        } catch (e) { }
    }
}

// Update summary cards (Balanced between Monthly Stats and Lifetime Balance)
function updateSummary() {
    const viewMonth = parseInt(window.budgetViewMonth);
    const viewYear = parseInt(window.budgetViewYear);
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const yearMonthTag = `${viewYear}-${monthStr}`;

    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    let lifetimeBalance = 0;

    // Iterate through ALL transactions to calculate lifetime balance AND monthly stats
    transactions.forEach(t => {
        const amount = Number(t.amount) || 0;

        // Calculate Lifetime Balance (Total Income - Total Expenses ever)
        if (t.type === 'income') {
            lifetimeBalance += amount;
        } else {
            lifetimeBalance -= amount;
        }

        // Calculate Monthly stats for the Income and Expense cards
        if (t.date && t.date.trim().startsWith(yearMonthTag)) {
            if (t.type === 'income') {
                monthlyIncome += amount;
            } else {
                monthlyExpenses += amount;
            }
        }
    });

    // Update UI elements
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpensesEl = document.getElementById('totalExpenses');
    const currentBalanceEl = document.getElementById('currentBalance');
    const sidebarBalanceEl = document.getElementById('sidebarBalance');

    // Update Income/Expenses with monthly filtered data
    if (totalIncomeEl) totalIncomeEl.textContent = formatMoney(monthlyIncome);
    if (totalExpensesEl) totalExpensesEl.textContent = formatMoney(monthlyExpenses);

    // Update BOTH Balance card and Sidebar with the TRUE Lifetime Balance
    if (currentBalanceEl) currentBalanceEl.textContent = formatMoney(lifetimeBalance);
    if (sidebarBalanceEl) sidebarBalanceEl.textContent = formatMoney(lifetimeBalance);

    // Update Subtitles to be crystal clear about the data context
    const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' });

    // Find subtitles on the Dashboard
    const dashboardCards = document.querySelectorAll('.summary-card');
    dashboardCards.forEach(card => {
        const titleEl = card.querySelector('.card-subtitle');
        if (!titleEl) return;

        if (card.classList.contains('income')) {
            titleEl.textContent = `Income in ${monthName}`;
        } else if (card.classList.contains('expense')) {
            titleEl.textContent = `Expenses in ${monthName}`;
        } else if (card.classList.contains('balance')) {
            titleEl.textContent = `Total Available Balance`;
        }
    });

    console.log('Summary updated:', {
        viewContext: monthName,
        monthlyIncome,
        monthlyExpenses,
        totalBalance: lifetimeBalance
    });
}

// Update transactions list
function updateTransactionsList() {
    const container = document.getElementById('recentTransactions');
    const tableBody = document.getElementById('transactionsTableBody');

    if (container) {
        if (transactions.length === 0) {
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
            // Sort by date descending
            const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentTransactions = sortedTransactions.slice(0, 5);
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
                        ${t.type === 'income' ? '+' : '-'}${formatMoney(t.amount)}
                    </div>
                </div>
            `).join('');
        }
    }

    if (tableBody) {
        // If we have a more advanced renderer (like in transactions.js), call it instead of overwriting
        if (typeof applyFilters === 'function') {
            console.log('Handing over table render to applyFilters()');
            applyFilters();
            return;
        }

        if (typeof renderTransactionsTable === 'function') {
            console.log('Handing over table render to renderTransactionsTable()');
            renderTransactionsTable();
            return;
        }

        if (transactions.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No transactions yet</td></tr>';
        } else {
            // Sort by date descending
            const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
            tableBody.innerHTML = sortedTransactions.map(t => `
                <tr>
                    <td>${formatDate(t.date)}</td>
                    <td>${t.title}</td>
                    <td>${t.category}</td>
                    <td><span class="badge bg-${t.type === 'income' ? 'success' : 'danger'}">${t.type}</span></td>
                    <td class="text-end text-${t.type === 'income' ? 'success' : 'danger'}">${t.type === 'income' ? '+' : '-'}${formatMoney(t.amount)}</td>
                    <td class="text-end">
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
                        <div class="text-muted small">${formatMoney(amount)}</div>
                    </div>
                </div>
            `;
        })
        .join('');

    chartContainer.innerHTML = legendHTML;
}

// Helper to compute spent for a category in the selected month
function getSpentForCategory(category, monthlyExpenses) {
    if (!category) return 0;
    const targetCategory = category.trim().toLowerCase();
    return (monthlyExpenses || [])
        .filter(t => t.category && String(t.category).trim().toLowerCase() === targetCategory)
        .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
}

// Global Budget Render Function
function renderBudgetUI(b, monthlyExpenses, isCard = true) {
    const spent = getSpentForCategory(b.category, monthlyExpenses);
    const percentage = b.amount > 0 ? (spent / b.amount) * 100 : 0;
    const isOver = spent > b.amount;
    const remaining = Math.max(0, b.amount - spent);

    let progressClass = 'bg-success';
    if (percentage >= 100) progressClass = 'bg-danger';
    else if (percentage >= 80) progressClass = 'bg-warning';

    if (!isCard) {
        // Simple progress bar for dashboard
        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1">
                    <span class="small fw-medium">${b.category}</span>
                    <span class="text-muted extra-small">${formatMoney(spent)} / ${formatMoney(b.amount)}</span>
                </div>
                <div class="progress" style="height: 6px;">
                    <div class="progress-bar ${isOver ? 'bg-danger' : 'bg-success'}" 
                         style="width: ${Math.min(percentage, 100)}%"></div>
                </div>
            </div>
        `;
    }

    // Full card for budget page
    const categoryTransactions = (monthlyExpenses || [])
        .filter(t => t.category && t.category.trim().toLowerCase() === b.category.trim().toLowerCase())
        .slice(0, 3);

    const transactionsHtml = categoryTransactions.length > 0
        ? `<div class="mt-3 pt-2 border-top">
            <div class="x-small text-muted mb-1 uppercase fw-bold">Recent activity</div>
            ${categoryTransactions.map(t => `
                <div class="d-flex justify-content-between x-small py-1">
                    <span class="text-truncate" style="max-width: 120px;">${t.title}</span>
                    <span class="fw-bold">${formatMoney(t.amount)}</span>
                </div>
            `).join('')}
           </div>`
        : '';

    return `
        <div class="card budget-card mb-3 animate-slide-in">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <div class="category-icon me-3 bg-primary-soft text-primary">
                            <i class="bi bi-tag"></i>
                        </div>
                        <div>
                            <h5 class="mb-0">${b.category}</h5>
                            <small class="text-muted">${b.period.charAt(0).toUpperCase() + b.period.slice(1)} Budget</small>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link link-dark p-0" data-bs-toggle="dropdown">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#" onclick="editBudget(${b.id})"><i class="bi bi-pencil me-2"></i>Edit</a></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="deleteBudget(${b.id})"><i class="bi bi-trash me-2"></i>Delete</a></li>
                        </ul>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-bold">${formatMoney(spent)} <small class="text-muted fw-normal">of ${formatMoney(b.amount)}</small></span>
                        <span class="${isOver ? 'text-danger' : 'text-success'} fw-bold">${percentage.toFixed(0)}%</span>
                    </div>
                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${Math.min(percentage, 100)}%"></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted small">
                        ${isOver ? `<span class="text-danger"><i class="bi bi-exclamation-triangle-fill me-1"></i>${formatMoney(spent - b.amount)} over</span>`
            : `<span>${formatMoney(remaining)} remaining</span>`}
                    </span>
                    <span class="badge ${isOver ? 'bg-danger-soft text-danger' : 'bg-success-soft text-success'} rounded-pill">
                        ${isOver ? 'Over Limit' : 'On Track'}
                    </span>
                </div>
                ${transactionsHtml}
            </div>
        </div>
    `;
}

// Update budget overview on dashboard
function updateBudgetOverview() {
    const container = document.getElementById('budgetOverview');
    if (!container) return;

    const viewMonth = parseInt(window.budgetViewMonth);
    const viewYear = parseInt(window.budgetViewYear);
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const yearMonthTag = `${viewYear}-${monthStr}`;
    const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'short', year: 'numeric' });

    // Filter budgets for THIS month only
    const monthlyBudgets = budgets.filter(b => {
        if (b.month !== undefined && b.year !== undefined) {
            return b.month === viewMonth && b.year === viewYear;
        }
        if (b.createdAt) {
            const d = new Date(b.createdAt);
            return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
        }
        return false;
    });

    const monthlyExpenses = transactions.filter(t => t.type === 'expense' && t.date && t.date.trim().startsWith(yearMonthTag));

    // Generate Month Options
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthOptions = months.map((m, i) => `<option value="${i}" ${i === viewMonth ? 'selected' : ''}>${m}</option>`).join('');

    // Generate Year Options
    const currentYear = new Date().getFullYear();
    let yearOptions = '';
    for (let y = currentYear - 2; y <= currentYear + 2; y++) {
        yearOptions += `<option value="${y}" ${y === viewYear ? 'selected' : ''}>${y}</option>`;
    }

    let html = `
        <div class="d-flex justify-content-between align-items-center mb-3 bg-light-soft p-2 rounded gap-2">
            <button type="button" class="btn btn-sm btn-link link-dark p-0 nav-arrow" onclick="window.changeBudgetMonth(-1, event)" title="Prev"><i class="bi bi-chevron-left"></i></button>
            <div class="d-flex gap-1 flex-grow-1">
                <select class="form-select form-select-sm theme-aware-select border-0 bg-transparent fw-bold p-0 text-center" onchange="window.setBudgetView(this.value, window.budgetViewYear)" style="box-shadow: none; width: auto;">
                    ${monthOptions}
                </select>
                <select class="form-select form-select-sm theme-aware-select border-0 bg-transparent fw-bold p-0 text-center" onchange="window.setBudgetView(window.budgetViewMonth, this.value)" style="box-shadow: none; width: auto;">
                    ${yearOptions}
                </select>
            </div>
            <button type="button" class="btn btn-sm btn-link link-dark p-0 nav-arrow" onclick="window.changeBudgetMonth(1, event)" title="Next"><i class="bi bi-chevron-right"></i></button>
        </div>
    `;

    if (monthlyBudgets.length === 0) {
        html += `
            <div class="text-center py-4">
                <p class="text-muted small mb-2">No budget set for ${monthName}</p>
                <button class="btn btn-xs btn-outline-primary" onclick="showModal('addBudgetModal')">Set Budget</button>
            </div>
        `;
    } else {
        html += `
            <div style="max-height: 400px; overflow-y: auto; overflow-x: hidden; padding-right: 5px;" class="custom-scrollbar">
                ${monthlyBudgets.map(b => renderBudgetUI(b, monthlyExpenses, false)).join('')}
            </div>
        `;
    }

    container.innerHTML = html;
}

// Update budgets list
function updateBudgetsList() {
    const mainListContainer = document.getElementById('budgetsList');
    if (!mainListContainer) return;

    const viewMonth = parseInt(window.budgetViewMonth);
    const viewYear = parseInt(window.budgetViewYear);
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const yearMonthTag = `${viewYear}-${monthStr}`;

    const monthlyExpenses = transactions.filter(t =>
        t && t.type === 'expense' && t.date && t.date.trim().startsWith(yearMonthTag)
    );

    const monthlyBudgets = budgets.filter(b => {
        if (b.month !== undefined && b.year !== undefined) {
            return b.month === viewMonth && b.year === viewYear;
        }
        if (b.createdAt) {
            const d = new Date(b.createdAt);
            return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
        }
        return false;
    });

    if (monthlyBudgets.length === 0) {
        const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
        mainListContainer.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <i class="bi bi-piggy-bank fs-1 mb-3 d-block"></i>
                <p class="mb-3">No budgets created for ${monthName}.</p>
                <button class="btn btn-primary" onclick="showModal('addBudgetModal')">Set Budget for ${monthName}</button>
            </div>`;
    } else {
        mainListContainer.innerHTML = `<div class="row g-4">${monthlyBudgets.map(b =>
            `<div class="col-lg-6 col-md-12">${renderBudgetUI(b, monthlyExpenses, true)}</div>`
        ).join('')}</div>`;
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
    const yearMonthTag = `${viewYear}-${monthStr}`;

    // Update month/year selects if they exist
    const monthSelect = document.getElementById('budgetMonthSelect');
    const yearSelect = document.getElementById('budgetYearSelect');
    if (monthSelect) monthSelect.value = viewMonth;
    if (yearSelect) yearSelect.value = viewYear;

    // Fallback for legacy display
    const monthDisplay = document.getElementById('budgetMonthDisplay');
    if (monthDisplay) {
        const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
        monthDisplay.textContent = monthName;
    }

    let totalBudgetAmount = 0;
    let totalSpentInBudgetedCategories = 0;

    // Filter budgets for the current view month ONLY
    const monthlyBudgets = currentBudgets.filter(b => {
        if (b.month !== undefined && b.year !== undefined) {
            return b.month === viewMonth && b.year === viewYear;
        }
        if (b.createdAt) {
            const d = new Date(b.createdAt);
            return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
        }
        return false;
    });

    monthlyBudgets.forEach(b => totalBudgetAmount += Number(b.amount) || 0);

    // Calculate total spent ONLY for categories that have budgets in this month
    // Calculate total spent ONLY for categories that have budgets in this month
    const budgetedCategories = monthlyBudgets.map(b => b.category.toLowerCase());

    // Filter transactions for THIS month using yearMonthTag yyyy-mm
    const monthlyTransactions = currentTransactions.filter(t => t.type === 'expense' && t.date && t.date.startsWith(yearMonthTag));

    monthlyTransactions.forEach(t => {
        // If the user wants to see TOTAL spending against BUDGETED spending, we can filter.
        // Based on user feedback, they want distinct separation.
        if (budgetedCategories.includes(t.category.toLowerCase())) {
            totalSpentInBudgetedCategories += (Number(t.amount) || 0);
        }
    });

    if (totalBudgetAmountEl) totalBudgetAmountEl.textContent = formatMoney(totalBudgetAmount);
    if (totalSpentAmountEl) totalSpentAmountEl.textContent = formatMoney(totalSpentInBudgetedCategories);

    const progress = totalBudgetAmount > 0 ? (totalSpentInBudgetedCategories / totalBudgetAmount) * 100 : 0;
    if (overallProgressEl) overallProgressEl.textContent = progress.toFixed(0) + '%';
    if (overallProgressBarEl) overallProgressBarEl.style.width = Math.min(progress, 100) + '%';

    const remaining = totalBudgetAmount - totalSpentInBudgetedCategories;
    if (remainingAmountEl) {
        remainingAmountEl.textContent = remaining >= 0
            ? `${formatMoney(remaining)} remaining this month`
            : `${formatMoney(Math.abs(remaining))} over total budget`;
        remainingAmountEl.className = remaining < 0 ? 'text-danger mb-0' : 'text-muted mb-0';
    }

    updateBudgetsList();
    updateBudgetHistory();
}

/**
 * Update Budget History - Shows a list of all months where budgets exist
 */
function updateBudgetHistory() {
    const historyContainer = document.getElementById('budgetHistory');
    if (!historyContainer) return;

    // Group budgets by year and month
    const grouped = {};
    budgets.forEach(b => {
        let m = b.month;
        let y = b.year;

        if (m === undefined || y === undefined) {
            const d = new Date(b.createdAt || Date.now());
            m = d.getMonth();
            y = d.getFullYear();
        }

        const key = `${y}-${m}`;
        if (!grouped[key]) {
            grouped[key] = {
                month: m,
                year: y,
                totalBudget: 0,
                spent: 0,
                categories: 0
            };
        }

        grouped[key].totalBudget += Number(b.amount) || 0;
        grouped[key].categories++;

        // Calculate spent for this month
        const monthStr = String(m + 1).padStart(2, '0');
        const yearMonthTag = `${y}-${monthStr}`;
        const monthlyTransactions = transactions.filter(t =>
            t.type === 'expense' &&
            t.date &&
            t.date.startsWith(yearMonthTag) &&
            t.category.toLowerCase() === b.category.toLowerCase()
        );

        grouped[key].spent += monthlyTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    });

    const entries = Object.values(grouped).sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
    });

    if (entries.length === 0) {
        historyContainer.innerHTML = '<p class="text-muted text-center py-3">No budget history available.</p>';
        return;
    }

    const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let html = `
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Period</th>
                        <th>Categories</th>
                        <th>Budget</th>
                        <th>Spent</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // Get current view month/year for highlighting
    const viewMonth = parseInt(window.budgetViewMonth);
    const viewYear = parseInt(window.budgetViewYear);

    entries.forEach(e => {
        const percentage = e.totalBudget > 0 ? (e.spent / e.totalBudget) * 100 : 0;
        const isOver = e.spent > e.totalBudget;

        html += `
            <tr class="${e.month === viewMonth && e.year === viewYear ? 'table-primary-soft' : ''}">
                <td><strong>${monthsLong[e.month]} ${e.year}</strong></td>
                <td><span class="badge bg-light text-dark border">${e.categories} Categories</span></td>
                <td>${formatMoney(e.totalBudget)}</td>
                <td class="${isOver ? 'text-danger fw-bold' : ''}">${formatMoney(e.spent)}</td>
                <td>
                    <div class="d-flex align-items-center" style="min-width: 100px;">
                        <div class="progress flex-grow-1 me-2" style="height: 6px;">
                            <div class="progress-bar ${isOver ? 'bg-danger' : 'bg-primary'}" style="width: ${Math.min(percentage, 100)}%"></div>
                        </div>
                        <span class="small fw-bold">${percentage.toFixed(0)}%</span>
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm ${e.month === viewMonth && e.year === viewYear ? 'btn-primary' : 'btn-outline-primary'}" 
                        onclick="window.setBudgetView(${e.month}, ${e.year});">
                        ${e.month === viewMonth && e.year === viewYear ? 'Viewing' : 'View'}
                    </button>
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    historyContainer.innerHTML = html;
}

// Update spending chart (CSS-based, no external libraries)
function updateSpendingChart() {
    // Update dashboard expense chart legend
    const expenseChart = document.getElementById('expenseChart');
    if (expenseChart) {
        updateExpenseChartLegend();
    }
}

// Update expense chart legend with real data (Filtered by Month)
function updateExpenseChartLegend() {
    const chartLegend = document.querySelector('.chart-legend');
    if (!chartLegend) return;

    // Use global view month/year if set, else current
    const viewMonth = (window.budgetViewMonth !== undefined) ? window.budgetViewMonth : new Date().getMonth();
    const viewYear = (window.budgetViewYear !== undefined) ? window.budgetViewYear : new Date().getFullYear();
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const yearMonthTag = `${viewYear}-${monthStr}`;

    // Calculate category spending for CURRENT VIEW MONTH
    const categorySpending = {};
    let totalExpenses = 0;

    transactions
        .filter(t => t.type === 'expense' && t.date && t.date.startsWith(yearMonthTag))
        .forEach(t => {
            categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
            totalExpenses += t.amount;
        });

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

    const legendHTML = Object.entries(categorySpending)
        .map(([category, amount]) => {
            const percentage = totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0;
            const color = categoryColors[category] || '#64748b';

            return `
                <div class="legend-item">
                    <span class="legend-color" style="background: ${color};"></span>
                    <span>${category} - ${formatMoney(amount)} (${percentage}%)</span>
                </div>
            `;
        })
        .join('');

    if (legendHTML) {
        chartLegend.innerHTML = legendHTML;
        const title = document.querySelector('.chart-container h6');
        if (title) title.textContent = `Expenses for ${new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}`;
    } else {
        chartLegend.innerHTML = '<div class="legend-item"><span>No expense data available for this month</span></div>';
    }
}

// Enhanced Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        mobileMenuBtn.addEventListener('click', function () {
            const isActive = sidebar.classList.contains('active');
            if (isActive) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            } else {
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                mobileMenuBtn.classList.add('active');
            }
        });

        sidebarOverlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });

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

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initializeMobileMenu();
});

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
}

// Show/Hide toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastBody = document.getElementById('toastBody');
    if (!toast || !toastBody) { alert(message); return; }

    toastBody.textContent = message;
    toast.className = 'toast show ' + (type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info') + ' text-white';
    toast.style.display = 'block';
    setTimeout(hideToast, 3000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) { toast.style.display = 'none'; toast.className = 'toast'; }
}

function isGuest() { return !localStorage.getItem('financeTracker_profile'); }
function checkGuestAccess() { return false; }

window.addTransaction = addTransaction;
window.deleteTransaction = deleteTransaction;
window.addBudget = addBudget;
window.deleteBudget = deleteBudget;
window.showModal = showModal;
window.hideModal = hideModal;
window.clearSampleData = clearSampleData;
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
    set: (value) => { transactions = value; updateAll(); }
});

Object.defineProperty(window, 'budgets', {
    get: () => budgets,
    set: (value) => { budgets = value; updateAll(); }
});

