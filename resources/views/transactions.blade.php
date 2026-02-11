@extends('layouts.app')

@section('title', 'Transactions - FinanceTracker')

@section('content')
    
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <div>
                Recent Transactions
                <div class="text-muted" style="font-size: 12px; font-weight: normal;">Your latest income and expense records</div>
            </div>
            <button class="btn btn-primary" onclick="showModal('addTransactionModal')">
                <i class="bi bi-plus-circle me-1"></i>Add Transaction
            </button>
        </div>
                
                <!-- Filters -->
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-3 mb-2">
                            <input type="text" class="form-control" id="transactionSearch" placeholder="Search transactions...">
                        </div>
                        <div class="col-md-2 mb-2">
                            <select class="form-select" id="typeFilter">
                                <option value="">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div class="col-md-2 mb-2">
                            <select class="form-select" id="categoryFilter">
                                <option value="">All Categories</option>
                                <!-- Categories will be populated by JavaScript -->
                            </select>
                        </div>
                        <div class="col-md-2 mb-2">
                            <input type="month" class="form-control" id="monthFilter" placeholder="Month">
                        </div>
                        <div class="col-md-2 mb-2">
                            <select class="form-select" id="amountFilter">
                                <option value="">All Amounts</option>
                                <option value="0-50">$0 - $50</option>
                                <option value="50-100">$50 - $100</option>
                                <option value="100-500">$100 - $500</option>
                                <option value="500+">$500+</option>
                            </select>
                        </div>
                        <div class="col-md-1 mb-2">
                            <button class="btn btn-outline-secondary w-100" onclick="applyFilters()">
                                <i class="bi bi-funnel"></i>
                            </button>
                        </div>
                    </div>
                
                    <div class="table-responsive">
                            <table class="table table-hover align-middle border-0 mb-0" role="table" aria-label="Transactions list">
                                <thead class="bg-light text-muted small text-uppercase fw-bold border-bottom">
                                    <tr>
                                        <th scope="col" class="ps-3 border-0 py-3" style="width: 15%;">Date</th>
                                        <th scope="col" class="border-0 py-3" style="width: 30%;">Description</th>
                                        <th scope="col" class="d-none d-md-table-cell border-0 py-3" style="width: 15%;">Category</th>
                                        <th scope="col" class="border-0 py-3" style="width: 15%;">Type</th>
                                        <th scope="col" class="text-end border-0 py-3" style="width: 15%;">Amount</th>
                                        <th scope="col" class="text-end pe-3 border-0 py-3" style="width: 10%;">Actions</th>
                                    </tr>
                                </thead>
                            <tbody id="transactionsTableBody" role="rowgroup">
                                <!-- Transactions will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Pagination -->
            <nav aria-label="Transactions pagination" class="mt-4">
                <ul class="pagination justify-content-center" id="transactionsPagination">
                    <!-- Pagination will be populated by JavaScript -->
                </ul>
            </nav>
        </div>
    </div>

    <!-- Transaction Modals now in layouts/app.blade.php -->

    <!-- Edit Transaction Modal -->
    <div class="modal fade" id="editTransactionModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title">Edit Transaction</h5>
                        <p class="text-muted mb-0" style="font-size: 14px;">Edit an existing transaction</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editTransactionForm">
                        <input type="hidden" id="editTransactionId">
                        <div class="mb-3">
                            <label for="editTitle" class="form-label">Title</label>
                            <input type="text" class="form-control" id="editTitle" required>
                        </div>
                        <div class="mb-3">
                            <label for="editAmount" class="form-label">Amount</label>
                            <input type="number" class="form-control" id="editAmount" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label for="editType" class="form-label">Type</label>
                            <select class="form-select" id="editType" required>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="editDescription" rows="2" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="editCategory" class="form-label">Category</label>
                            <select class="form-select" id="editCategory" required>
                                <!-- Options will be populated based on transaction type -->
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editDate" class="form-label">Date</label>
                            <input type="date" class="form-control" id="editDate" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="updateTransaction()">Update Transaction</button>
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
    <script src="{{ asset('js/transactions.js') }}"></script>
@endsection
