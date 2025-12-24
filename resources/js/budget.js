// budget.js - Budget management module
import { store } from './store.js';
import { formatCurrency, getCurrentMonth, showToast } from './utils.js';

class BudgetManager {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('budget:init', () => this.init());
    }

    init() {
        this.setupBudgetForm();
        this.renderBudgets();

        // Subscribe to store changes
        store.subscribe(() => {
            this.renderBudgets();
            this.updateBudgetSummary();
        });

        // Initial render
        this.updateBudgetSummary();
    }
    updateBudgetSummary() {
        const currentMonth = getCurrentMonth();

        let totalBudget = 0;
        let totalSpent = 0;

        const budgets = store.state.budgets.filter(b => b.month === currentMonth);
        const transactions = store.state.transactions.filter(t => t.type === 'expense' && t.date.startsWith(currentMonth));

        budgets.forEach(budget => {
            const spent = transactions.filter(t => t.category === budget.category).reduce((s, t) => s + t.amount, 0);
            totalBudget += budget.amount || 0;
            totalSpent += spent || 0;
        });

        const totalRemaining = totalBudget - totalSpent;

        const totalBudgetEl = document.getElementById('totalBudget');
        const totalSpentEl = document.getElementById('totalSpent');
        const totalRemainingEl = document.getElementById('totalRemaining');

        if (totalBudgetEl) totalBudgetEl.textContent = formatCurrency(totalBudget);
        if (totalSpentEl) totalSpentEl.textContent = formatCurrency(totalSpent);
        if (totalRemainingEl) {
            totalRemainingEl.textContent = formatCurrency(totalRemaining);
            const card = totalRemainingEl.closest('.card');
            if (card) {
                card.classList.remove('bg-danger', 'bg-warning', 'bg-success');
                if (totalRemaining < 0) {
                    card.classList.add('bg-danger');
                } else if (totalRemaining < totalBudget * 0.2) {
                    card.classList.add('bg-warning');
                } else {
                    card.classList.add('bg-success');
                }
            }
        }
    }

    renderBudgets() {
        const container = document.getElementById('budgetsList');
        if (!container) return;

        const currentMonth = getCurrentMonth();
        const budgets = store.state.budgets.filter(b => b.month === currentMonth);
        const transactions = store.state.transactions.filter(t => t.type === 'expense' && t.date.startsWith(currentMonth));

        if (budgets.length === 0) {
            container.innerHTML = `
                <div class="empty-state text-center py-5">
                    <i class="bi bi-piggy-bank fs-1 text-muted"></i>
                    <h5 class="mt-3">No budgets created yet</h5>
                    <p class="text-muted">Start by creating your first budget to track your spending</p>
                </div>
            `;
            return;
        }

        container.innerHTML = budgets.map(budget => {
            const spent = transactions.filter(t => t.category === budget.category).reduce((s, t) => s + t.amount, 0);
            const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
            const remaining = budget.amount - spent;
            return this.createBudgetHTML(budget, spent, percentage, remaining);
        }).join('');

        // Attach listeners for edit/delete
        container.querySelectorAll('.edit-budget').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('[data-budget-id]').dataset.budgetId;
                this.handleEditBudget(id);
            });
        });

        container.querySelectorAll('.delete-budget').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('[data-budget-id]').dataset.budgetId;
                this.handleDeleteBudget(id);
            });
        });
    }

    renderBudgetChart() {
        const canvas = document.getElementById('budgetChart');
        if (!canvas) return;

        const currentMonth = getCurrentMonth();
        const budgets = store.state.budgets.filter(b => b.month === currentMonth);
        const transactions = store.state.transactions.filter(t => t.type === 'expense' && t.date.startsWith(currentMonth));

        if (!budgets.length) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '16px Arial';
            ctx.fillStyle = '#6c757d';
            ctx.textAlign = 'center';
            ctx.fillText('No budgets to display', canvas.width / 2, canvas.height / 2);
            return;
        }

        const labels = budgets.map(b => b.category);
        const budgetData = budgets.map(b => b.amount);
        const spentData = budgets.map(b => transactions.filter(t => t.category === b.category).reduce((s, t) => s + t.amount, 0));

        if (window.budgetChart && typeof window.budgetChart.destroy === 'function') {
            window.budgetChart.destroy();
        }

        if (typeof Chart === 'undefined') return; // Chart.js not loaded

        const ctx = canvas.getContext('2d');
        window.budgetChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Budget', data: budgetData, backgroundColor: 'rgba(13,110,253,0.8)' },
                    { label: 'Spent', data: spentData, backgroundColor: 'rgba(220,53,69,0.8)' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    createBudgetHTML(budget, spent, percentage, remaining) {
        const progressClass = percentage >= 100 ? 'bg-danger' : percentage >= 80 ? 'bg-warning' : 'bg-success';
        const alertIcon = percentage >= 100 ? 'bi-exclamation-triangle' : percentage >= 80 ? 'bi-exclamation-circle' : 'bi-check-circle';
        const remainingClass = remaining < 0 ? 'text-danger' : 'text-success';

        return `
            <div class="card mb-3 ${percentage >= 100 ? 'border-danger' : percentage >= 80 ? 'border-warning' : ''}" data-budget-id="${budget.id}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="mb-0">${budget.category}</h5>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-sm btn-outline-primary edit-budget">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger delete-budget">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="progress mb-2" style="height: 10px;">
                                <div class="progress-bar ${progressClass}" style="width: ${Math.min(percentage, 100)}%" role="progressbar"></div>
                            </div>
                            <div class="d-flex justify-content-between text-sm">
                                <span>Spent: <strong>${formatCurrency(spent)}</strong></span>
                                <span>Budget: <strong>${formatCurrency(budget.amount)}</strong></span>
                            </div>
                            ${budget.description ? `<p class="text-muted mt-2 mb-0">${budget.description}</p>` : ''}
                        </div>
                        <div class="col-md-4 text-center">
                            <div class="d-flex flex-column align-items-center">
                                <i class="bi ${alertIcon} fs-2 ${percentage >= 100 ? 'text-danger' : percentage >= 80 ? 'text-warning' : 'text-success'} mb-2"></i>
                                <div class="fw-bold ${remainingClass}">${remaining < 0 ? 'Over by ' : 'Remaining: '}${formatCurrency(Math.abs(remaining))}</div>
                                <small class="text-muted">${percentage.toFixed(1)}% used</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    handleEditBudget(id) {
        const budget = store.state.budgets.find(b => b.id === id);
        if (!budget) return;
        const form = document.getElementById('budgetForm');
        if (!form) return;
        form.querySelector('[name="category"]').value = budget.category;
        form.querySelector('[name="amount"]').value = budget.amount;
        form.querySelector('[name="month"]').value = budget.month;
        form.dataset.editId = id;
        form.querySelector('button[type="submit"]').textContent = 'Update Budget';
    }

    handleDeleteBudget(id) {
        if (confirm('Are you sure you want to delete this budget?')) {
            store.deleteBudget(id);
            showToast('Budget deleted successfully');
        }
    }
}
