@extends('layouts.app')

@section('title', 'Dashboard - FinanceTracker')
@section('page_title', 'Dashboard')

@section('content')
    <div class="page-header">
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Overview of your finances</p>
    </div>
    
    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
        <div class="col-lg-4 col-md-6">
            <div class="card summary-card income">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-2">Total Income</h6>
                            <h3 class="card-title mb-0" id="totalIncome">$0.00</h3>
                        </div>
                        <div class="summary-icon">
                            <i class="bi bi-arrow-up-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6">
            <div class="card summary-card expense">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-2">Total Expenses</h6>
                            <h3 class="card-title mb-0" id="totalExpenses">$0.00</h3>
                        </div>
                        <div class="summary-icon">
                            <i class="bi bi-arrow-down-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-12">
            <div class="card summary-card balance">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-subtitle mb-2">Balance</h6>
                            <h3 class="card-title mb-0" id="currentBalance">$0.00</h3>
                        </div>
                        <div class="summary-icon">
                            <i class="bi bi-wallet2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="row mb-4">
        <div class="col-md-6 mb-3">
            <button class="btn btn-success w-100 py-3" onclick="showModal('addIncomeModal')">
                <i class="bi bi-plus-circle me-2"></i>
                Add Income
            </button>
        </div>
        <div class="col-md-6 mb-3">
            <button class="btn btn-danger w-100 py-3" onclick="showModal('addExpenseModal')">
                <i class="bi bi-dash-circle me-2"></i>
                Add Expense
            </button>
        </div>
    </div>
    
    <!-- Charts Section -->
    <div class="row mb-4">
        <div class="col-md-6 mb-3">
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">Spending by Category</h6>
                    <small class="text-muted">Where your money goes</small>
                </div>
                <div class="card-body">
                    <div id="expenseChart" style="min-height: 250px;">
                        <div class="text-center py-5">
                            <i class="bi bi-pie-chart text-muted" style="font-size: 2rem;"></i>
                            <p class="text-muted mt-2">No expense data yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 mb-3">
            <div class="card">
                <div class="card-header">
                    <h6 class="mb-0">Budget Overview</h6>
                    <small class="text-muted">Current month spending</small>
                </div>
                <div class="card-body">
                    <div id="budgetOverview">
                        <div class="text-center py-5">
                            <i class="bi bi-piggy-bank text-muted" style="font-size: 2rem;"></i>
                            <p class="text-muted mt-2">No budgets set yet</p>
                            <button class="btn btn-sm btn-primary" onclick="showModal('addBudgetModal')">
                                <i class="bi bi-plus-circle me-1"></i>Set Budget
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Recent Transactions -->
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">Recent Transactions</h5>
            <a href="{{ url('/transactions') }}" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-list-ul me-1"></i>View All
            </a>
        </div>
        <div class="card-body" id="recentTransactions">
            <div class="text-center py-5">
                <i class="bi bi-receipt text-muted" style="font-size: 3rem;"></i>
                <h5 class="text-muted mt-3">No Transactions Yet</h5>
                <p class="text-muted">Start by adding your first income or expense transaction.</p>
                <button class="btn btn-primary btn-sm" onclick="showModal('addIncomeModal')">
                    <i class="bi bi-plus-circle me-1"></i>Add Transaction
                </button>
            </div>
        </div>
        <div class="card-footer text-center">
            <a href="{{ url('/transactions') }}" class="btn btn-outline-primary btn-sm">View All Transactions</a>
        </div>
    </div>
    <!-- Add Income Modal -->
    <div class="modal fade" id="addIncomeModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title">Add Income</h5>
                        <p class="text-muted mb-0" style="font-size: 14px;">Record a new income transaction</p>
                    </div>
                    <button type="button" class="btn-close" onclick="hideModal('addIncomeModal')"></button>
                </div>
                <div class="modal-body">
                    <form id="incomeForm">
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input type="text" class="form-control" id="incomeTitle" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Amount</label>
                            <input type="number" class="form-control" id="incomeAmount" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Date</label>
                            <input type="date" class="form-control" id="incomeDate" required value="{{ date('Y-m-d') }}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-select" id="incomeCategory" required>
                                <option value="" selected>Select category</option>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Investment">Investment</option>
                                <option value="Business">Business</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description (Optional)</label>
                            <textarea class="form-control" id="incomeDescription" rows="2"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Add Income</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Expense Modal -->
    <div class="modal fade" id="addExpenseModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title">Add Expense</h5>
                        <p class="text-muted mb-0" style="font-size: 14px;">Record a new expense transaction</p>
                    </div>
                    <button type="button" class="btn-close" onclick="hideModal('addExpenseModal')"></button>
                </div>
                <div class="modal-body">
                    <form id="expenseForm">
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input type="text" class="form-control" id="expenseTitle" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Amount</label>
                            <input type="number" class="form-control" id="expenseAmount" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Date</label>
                            <input type="date" class="form-control" id="expenseDate" required value="{{ date('Y-m-d') }}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-select" id="expenseCategory" required>
                                <option value="" selected>Select category</option>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description (Optional)</label>
                            <textarea class="form-control" id="expenseDescription" rows="2"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Add Expense</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Budget Modal -->
    <div class="modal fade" id="addBudgetModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Set Budget</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="budgetForm">
                        <div class="mb-3">
                            <label for="budgetCategory" class="form-label">Category</label>
                            <select class="form-select" id="budgetCategory" required>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="budgetAmount" class="form-label">Budget Amount</label>
                            <input type="number" class="form-control" id="budgetAmount" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label for="budgetPeriod" class="form-label">Period</label>
                            <select class="form-select" id="budgetPeriod" required>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="addBudget()">Set Budget</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toast" class="toast" role="alert">
            <div class="toast-header">
                <strong class="me-auto">FinanceTracker</strong>
                <button type="button" class="btn-close" onclick="hideToast()"></button>
            </div>
            <div class="toast-body" id="toastBody">
                <!-- Toast message will be inserted here -->
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    // Dashboard specific initialization can go here if needed
</script>
@endpush