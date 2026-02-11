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
            <button class="btn btn-success w-100 py-3 d-flex align-items-center justify-content-center gap-2" onclick="openGlobalTransaction('income')">
                <i class="bi bi-plus-circle fs-5"></i>
                <span>Add Income</span>
            </button>
        </div>
        <div class="col-md-6 mb-3">
            <button class="btn btn-danger w-100 py-3 d-flex align-items-center justify-content-center gap-2" onclick="openGlobalTransaction('expense')">
                <i class="bi bi-dash-circle fs-5"></i>
                <span>Add Expense</span>
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
    <!-- Transaction Modals and Toast now in global layout -->
@endsection

@push('scripts')
<script>
    // Dashboard specific initialization can go here if needed
</script>
@endpush