// Analytics Page JavaScript - Chart.js Implementation

let currentTimePeriod = 'all';
let analyticsTransactions = [];
let categoryChartInstance = null;
let monthlyChartInstance = null;

// Function to notify analytics of updates
window.notifyAnalyticsUpdate = function () {
    console.log('Analytics notified of data update');
    loadDataFromStore();
    updateAnalytics();
};

// Initialize analytics page
function initAnalytics() {
    const isAnalyticsPage = document.getElementById('categoryChart') ||
        document.getElementById('monthlyChart') ||
        window.location.pathname.includes('analytics');

    if (isAnalyticsPage) {
        console.log('Analytics page detected, initializing Chart.js...');
        setTimeout(() => {
            initializeAnalyticsPage();
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initAnalytics();
});

// Re-check when page becomes visible
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        setTimeout(window.refreshAnalyticsData, 100);
    }
});

function initializeAnalyticsPage() {
    loadDataFromStore();
    updateAnalytics();
}

function loadDataFromStore() {
    if (typeof window.transactions !== 'undefined' && window.transactions && Array.isArray(window.transactions)) {
        analyticsTransactions = [...window.transactions];
    } else {
        // Fallback to script.js loader if global isn't ready
        if (typeof window.loadFromSession === 'function') {
            window.loadFromSession();
            analyticsTransactions = [...(window.transactions || [])];
        } else {
            analyticsTransactions = [];
        }
    }
}

window.refreshAnalyticsData = function () {
    loadDataFromStore();
    updateAnalytics();
};

window.setTimePeriod = function (period) {
    currentTimePeriod = period;
    updateAnalytics();

    document.querySelectorAll('#periodSelector .btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim().toLowerCase() === period.toLowerCase()) {
            btn.classList.add('active');
        }
    });
};

function updateAnalytics() {
    loadDataFromStore();
    const filteredTransactions = getFilteredTransactions();
    updateKeyMetrics(filteredTransactions);
    renderCategoryChart(filteredTransactions);
    renderMonthlyChart();
    renderCategoryDetails(filteredTransactions);
}

function getFilteredTransactions() {
    // Always sync with the most current data source
    if (typeof window.transactions !== 'undefined' && window.transactions) {
        analyticsTransactions = [...window.transactions];
    }

    console.log(`Filtering for: ${currentTimePeriod}, total data points: ${analyticsTransactions.length}`);

    const now = new Date();
    // Normalize to midnight today for cleaner day-based comparisons
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return analyticsTransactions.filter(t => {
        if (!t || !t.date) return false;

        // Parse date - usually YYYY-MM-DD
        const tDate = new Date(t.date);
        if (isNaN(tDate.getTime())) return false;

        // Strip time from transaction date for clean comparison
        const itemDateMidnight = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate());

        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        if (currentTimePeriod === 'week') {
            const weekAgo = new Date(todayMidnight);
            weekAgo.setDate(todayMidnight.getDate() - 7);
            // From 7 days ago 00:00 until end of today
            return itemDateMidnight >= weekAgo;
        } else if (currentTimePeriod === 'month') {
            // Must be current calendar month
            return itemDateMidnight.getMonth() === currentMonth && itemDateMidnight.getFullYear() === currentYear;
        } else if (currentTimePeriod === 'year') {
            // Must be current year
            return itemDateMidnight.getFullYear() === currentYear;
        } else if (currentTimePeriod === 'all') {
            return true;
        }

        return true;
    });
}

function updateKeyMetrics(filteredTransactions) {
    const income = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    const expenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    // Calculate total balance (Net Worth) using ALL transactions, not just filtered ones
    const totalIncome = analyticsTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    const totalExpenses = analyticsTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    const netWorth = totalIncome - totalExpenses;

    const els = {
        income: document.getElementById('analyticsIncome'),
        expenses: document.getElementById('analyticsExpenses'),
        balance: document.getElementById('analyticsBalance')
    };

    const safeUpdate = (el, val, subText) => {
        if (!el) return;
        const small = el.querySelector('small');
        el.textContent = formatMoney(val);
        if (small) {
            if (subText) small.textContent = subText;
            el.appendChild(small);
        }
    };

    safeUpdate(els.income, income);
    safeUpdate(els.expenses, expenses);
    safeUpdate(els.balance, netWorth);
}

function renderCategoryChart(filteredTransactions) {
    const container = document.getElementById('categoryChart');
    if (!container) return;

    // Destroy existing canvas if we need to reset
    // Actually, we'll replace the inner HTML with a canvas if it's not already a canvas
    // Or just clean it out.
    // Chart.js requires a canvas context.

    // Clear loading spinner or previous content if it's not a canvas wrapper
    // We need to ensure there is a <canvas> element.

    // Check if we already have a canvas in the container
    let canvas = container.querySelector('canvas');
    if (!canvas) {
        container.innerHTML = '<canvas id="categoryChartCanvas"></canvas>';
        canvas = container.querySelector('canvas');
    }

    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
    const categorySpending = {};
    expenseTransactions.forEach(t => {
        const amt = Number(t.amount) || 0;
        categorySpending[t.category] = (categorySpending[t.category] || 0) + amt;
    });

    const labels = Object.keys(categorySpending);
    const data = Object.values(categorySpending);
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED', '#71B37C'
    ];

    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }

    if (labels.length === 0) {
        // Show empty state
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-pie-chart text-muted" style="font-size: 3rem;"></i>
                <p class="text-muted mt-3 mb-2">No expense data yet</p>
            </div>
        `;
        categoryChartInstance = null;
        return;
    }

    const ctx = canvas.getContext('2d');
    categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function renderMonthlyChart() {
    const container = document.getElementById('monthlyChart');
    if (!container) return;

    let canvas = container.querySelector('canvas');
    if (!canvas) {
        container.innerHTML = '<canvas id="monthlyChartCanvas"></canvas>';
        canvas = container.querySelector('canvas');
    }

    // Last 6 months
    const months = [];
    const incomeData = [];
    const expenseData = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        // Manual month key to avoid timezone shifts from toISOString
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const monthKey = `${year}-${month}`;

        months.push(d.toLocaleDateString('en-US', { month: 'short' }));

        const monthTrans = analyticsTransactions.filter(t => {
            if (!t.date) return false;
            const tDate = new Date(t.date);
            return tDate.getMonth() === d.getMonth() && tDate.getFullYear() === d.getFullYear();
        });
        incomeData.push(monthTrans.filter(t => t.type === 'income').reduce((s, t) => s + (Number(t.amount) || 0), 0));
        expenseData.push(monthTrans.filter(t => t.type === 'expense').reduce((s, t) => s + (Number(t.amount) || 0), 0));

        console.log(`Chart data for ${monthKey}:`, {
            income: incomeData[incomeData.length - 1],
            expense: expenseData[expenseData.length - 1],
            transactionsCount: monthTrans.length
        });
    }

    const hasData = incomeData.some(v => v > 0) || expenseData.some(v => v > 0);

    if (!hasData) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-bar-chart text-muted" style="font-size: 2.5rem; opacity: 0.5;"></i>
                <p class="text-muted mt-3 fw-medium">No financial data found for the last 6 months.</p>
                <small class="text-muted">Start adding transactions to see your progress here!</small>
            </div>
        `;
        return;
    }

    if (monthlyChartInstance) {
        monthlyChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    monthlyChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    borderRadius: 4,
                    backgroundColor: '#3b82f6', // Bright Blue
                    hoverBackgroundColor: '#2563eb',
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    borderRadius: 4,
                    backgroundColor: '#10b981', // Emerald Green
                    hoverBackgroundColor: '#059669',
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f3f4f6',
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 11 },
                        color: '#9ca3af',
                        callback: function (value) {
                            return window.formatMoney ? window.formatMoney(value).split('.')[0] : value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 11 },
                        color: '#6b7280'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        color: '#6b7280',
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#111827',
                    bodyColor: '#4b5563',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 4,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null && window.formatMoney) {
                                label += window.formatMoney(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function renderCategoryDetails(filteredTransactions) {
    const container = document.getElementById('categoryDetails');
    if (!container) return;

    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');
    const categorySpending = {};
    expenseTransactions.forEach(t => {
        const amt = Number(t.amount) || 0;
        categorySpending[t.category] = (categorySpending[t.category] || 0) + amt;
    });

    const totalExpenses = Object.values(categorySpending).reduce((a, b) => a + b, 0);

    if (totalExpenses === 0) {
        container.innerHTML = '<div class="text-center py-4 text-muted">No expenses to display</div>';
        return;
    }

    const sorted = Object.entries(categorySpending).sort(([, a], [, b]) => b - a);

    const html = sorted.map(([cat, amount]) => {
        const pct = (amount / totalExpenses * 100).toFixed(1);

        // Find if there's a budget for this category (Monthly budget search)
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const budget = (window.budgets || []).find(b =>
            b.category === cat &&
            (b.month === currentMonth || b.month === undefined) // Simple match
        );

        let budgetText = '';
        let barColor = 'bg-primary';

        if (budget) {
            const limit = Number(budget.amount);
            const usage = (amount / limit * 100).toFixed(0);
            budgetText = `<span class="small ms-2 ${amount > limit ? 'text-danger fw-bold' : 'text-muted'}">(${usage}% of ${formatMoney(limit)} budget)</span>`;
            if (amount > limit) barColor = 'bg-danger';
            else if (usage > 80) barColor = 'bg-warning';
        }

        return `
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-end mb-1">
                    <div>
                        <span class="fw-bold text-dark d-block">${cat}</span>
                        <span class="text-muted small">${pct}% of total spending</span>
                    </div>
                    <div class="text-end">
                        <span class="fw-bold text-dark">${formatMoney(amount)}</span>
                        ${budgetText}
                    </div>
                </div>
                <div class="progress" style="height: 10px; border-radius: 10px;">
                    <div class="progress-bar ${barColor} animate__animated animate__slideInLeft" style="width: ${Math.min(pct > 0 ? (budget ? (amount / budget.amount * 100) : pct) : 0, 100)}%"></div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = `<div class="row"><div class="col-12">${html}</div></div>`;
}

// Helper to access currency config (duplicated from script.js need to ensure access)
// Since this is a separate file, we check if global function exists or define local helper
// Actually formatMoney is global from script.js? No, function declarations in script.js allow global access?
// Yes, functions in global scope of script.js are global.
// But let's be safe and use window.formatMoney or define a fallback