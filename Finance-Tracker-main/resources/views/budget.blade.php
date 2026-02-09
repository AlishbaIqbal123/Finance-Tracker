@extends('layouts.app')

@section('title', 'Budget - FinanceTracker')

@section('content')
            
            <!-- Budget Overview -->
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-4">
                        <div class="d-flex align-items-center bg-light-soft rounded-pill px-3 py-2 border shadow-sm gap-2">
                            <button type="button" class="btn btn-link link-dark p-0 nav-arrow" onclick="window.changeBudgetMonth(-1, event)" title="Previous Month">
                                <i class="bi bi-chevron-left"></i>
                            </button>
                            <div class="d-flex gap-1 align-items-center">
                                <select class="form-select border-0 bg-transparent fw-bold p-0 theme-aware-select" id="budgetMonthSelect" onchange="window.setBudgetView(this.value, document.getElementById('budgetYearSelect').value)" style="box-shadow: none; width: auto; min-width: 100px;">
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </select>
                                <select class="form-select border-0 bg-transparent fw-bold p-0 theme-aware-select" id="budgetYearSelect" onchange="window.setBudgetView(document.getElementById('budgetMonthSelect').value, this.value)" style="box-shadow: none; width: auto;">
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>
                            <button type="button" class="btn btn-link link-dark p-0 nav-arrow" onclick="window.changeBudgetMonth(1, event)" title="Next Month">
                                <i class="bi bi-chevron-right"></i>
                            </button>
                        </div>
                        <div class="vr"></div>
                        <div>
                            <h6 class="text-muted small mb-1">Total Budget</h6>
                            <div class="budget-summary-val" id="totalBudgetAmount">Rs 0.00</div>
                        </div>
                        <div>
                            <h6 class="text-muted small mb-1">Spent</h6>
                            <div class="budget-summary-val" id="totalSpentAmount">Rs 0.00</div>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="showModal('addBudgetModal')">
                        <i class="bi bi-plus-circle me-1"></i>Add Budget
                    </button>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted">Overall Progress</span>
                            <span class="text-muted" id="overallProgress">0%</span>
                        </div>
                        <div class="progress mb-2" style="height: 8px;">
                            <div class="progress-bar" id="overallProgressBar" style="width: 0%; background-color: #e4a5b8;" role="progressbar"></div>
                        </div>
                        <p class="text-muted mb-0" id="remainingAmount">$0.00 remaining</p>
                    </div>
                    
            <!-- Budgets List -->
            <div id="budgetsList" class="mb-5">
                <!-- Budget items will be populated by JavaScript -->
                <div class="text-center py-4">
                    <i class="bi bi-piggy-bank text-muted" style="font-size: 2rem;"></i>
                    <p class="text-muted mt-2">No budgets set yet. Click "Add Budget" to get started.</p>
                </div>
            </div>

            <!-- Budget History (Other Months) -->
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Budget History</h5>
                    <small class="text-muted">Summary of budgets from other months</small>
                </div>
                <div class="card-body">
                    <div id="budgetHistory">
                        <div class="text-center py-4">
                            <div class="spinner-border text-primary spinner-border-sm" role="status"></div>
                            <p class="text-muted mt-2">Loading history...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add New Budget Modal -->
    <div class="modal fade" id="addBudgetModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Budget</h5>
                    <button type="button" class="btn-close" onclick="hideModal('addBudgetModal')"></button>
                </div>
                <div class="modal-body">
                    <form id="budgetForm">
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-select" id="budgetCategory" required>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Subscriptions">Subscriptions</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Budget Amount</label>
                            <input type="number" class="form-control" id="budgetAmount" placeholder="0.00" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Period</label>
                            <select class="form-select" id="budgetPeriod" required>
                                <option value="monthly" selected>Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Add Budget</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Budget Modal -->
    <div class="modal fade" id="editBudgetModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Budget</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editBudgetForm">
                        <input type="hidden" id="editBudgetId">
                        <div class="mb-3">
                            <label for="editBudgetCategory" class="form-label">Category</label>
                            <select class="form-select" id="editBudgetCategory" required>
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
                            <label for="editBudgetAmount" class="form-label">Budget Amount</label>
                            <input type="number" class="form-control" id="editBudgetAmount" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label for="editBudgetPeriod" class="form-label">Period</label>
                            <select class="form-select" id="editBudgetPeriod" required>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editBudgetDescription" class="form-label">Description (Optional)</label>
                            <textarea class="form-control" id="editBudgetDescription" rows="2"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="updateBudget()">Update Budget</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toast" class="toast" role="alert">
            <div class="toast-header">
                <strong class="me-auto">FinanceTracker</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body" id="toastBody">
                <!-- Toast message will be inserted here -->
            </div>
        </div>
    </div>

    <!-- Custom JavaScript -->
    <script src="{{ asset('js/utils.js') }}"></script>
    <script src="{{ asset('js/budget.js') }}"></script>
@endsection
