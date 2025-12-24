@extends('layouts.app')

@section('title', 'Budget - FinanceTracker')

@section('content')
            
            <!-- Budget Overview -->
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <div class="d-flex align-items-center gap-4">
                            <div>
                                <h6 class="text-muted mb-1">Total Budget</h6>
                                <h2 class="mb-0" id="totalBudgetAmount">$0.00</h2>
                            </div>
                            <div>
                                <h6 class="text-muted mb-1">Spent</h6>
                                <h4 class="mb-0" id="totalSpentAmount">$0.00</h4>
                            </div>
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
                        <p class="text-muted mb-0" id="remainingAmount">$0.00 remaining this month</p>
                    </div>
                    
                    <!-- Budgets List -->
                    <div id="budgetsList">
                        <!-- Budget items will be populated by JavaScript -->
                        <div class="text-center py-4">
                            <i class="bi bi-piggy-bank text-muted" style="font-size: 2rem;"></i>
                            <p class="text-muted mt-2">No budgets set yet. Click "Add Budget" to get started.</p>
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
                                <option value="" selected>Select category</option>
                                <option value="Food">Food</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Entertainment">Entertainment</option>
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
