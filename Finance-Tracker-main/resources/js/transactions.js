import { formatCurrency, formatDate } from './utils.js';
import { store } from './store.js';

let filteredTransactions = [];
let currentPage = 1;
const transactionsPerPage = 10;

// Initialize transactions page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('transactions')) {
        initializeTransactionsPage();
    }
});

async function initializeTransactionsPage() {
    try {
        // Subscribe to store changes
        store.subscribe((state) => {
            transactions = state.transactions;
            populateCategoryFilter();
            applyFilters();
        });
        
        // Load initial data
        await store.loadFromAPI();
        transactions = store.state.transactions;
        
        setupTransactionFilters();
        populateCategoryFilter();
        renderTransactionsTable();
        setupTransactionSearch();
    } catch (error) {
        console.error('Failed to load transactions:', error);
        showToast('Failed to load transactions', 'error');
    }
}

function setupTransactionFilters() {
    const typeFilter = document.getElementById('typeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const monthFilter = document.getElementById('monthFilter');
    const amountFilter = document.getElementById('amountFilter');
    
    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (monthFilter) monthFilter.addEventListener('change', applyFilters);
    if (amountFilter) amountFilter.addEventListener('change', applyFilters);
    
    // Set default month to current month
    if (monthFilter) {
        monthFilter.value = new Date().toISOString().slice(0, 7);
    }
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    const categories = [...new Set(transactions.map(t => t.category))].sort();
    
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function setupTransactionSearch() {
    const searchInput = document.getElementById('transactionSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            applyFilters(searchTerm);
        });
    }
}

function applyFilters(searchTerm = '') {
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const monthFilter = document.getElementById('monthFilter')?.value || '';
    const amountFilter = document.getElementById('amountFilter')?.value || '';
    const searchInput = document.getElementById('transactionSearch');
    const actualSearchTerm = searchTerm || (searchInput ? searchInput.value.toLowerCase() : '');
    
    filteredTransactions = transactions.filter(transaction => {
        // Type filter
        if (typeFilter && transaction.type !== typeFilter) return false;
        
        // Category filter
        if (categoryFilter && transaction.category !== categoryFilter) return false;
        
        // Month filter
        if (monthFilter && transaction.date.slice(0, 7) !== monthFilter) return false;
        
        // Amount filter
        if (amountFilter) {
            const amount = transaction.amount;
            switch (amountFilter) {
                case '0-50':
                    if (amount > 50) return false;
                    break;
                case '50-100':
                    if (amount <= 50 || amount > 100) return false;
                    break;
                case '100-500':
                    if (amount <= 100 || amount > 500) return false;
                    break;
                case '500+':
                    if (amount <= 500) return false;
                    break;
            }
        }
        
        // Search filter
        if (actualSearchTerm) {
            const searchableText = `${transaction.title} ${transaction.description} ${transaction.category}`.toLowerCase();
            if (!searchableText.includes(actualSearchTerm)) return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    renderTransactionsTable();
    renderPagination();
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;
    
    // Use filtered transactions or all transactions
    const transactionsToShow = filteredTransactions.length > 0 || hasActiveFilters() ? 
        filteredTransactions : transactions;
    
    if (transactionsToShow.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    <div class="empty-state">
                        <i class="bi bi-receipt fs-1 text-muted"></i>
                        <h5 class="mt-2">No transactions found</h5>
                        <p class="text-muted">Try adjusting your filters or add your first transaction</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Pagination
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const paginatedTransactions = transactionsToShow.slice(startIndex, endIndex);
    
    tbody.innerHTML = paginatedTransactions.map(transaction => `
        <tr>
            <td>${formatDate(transaction.date)}</td>
            <td>
                <div class="fw-medium">${transaction.title}</div>
            </td>
            <td>
                <span class="badge bg-light text-dark">${transaction.category}</span>
            </td>
            <td>
                <span class="badge ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'}">
                    ${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </span>
            </td>
            <td class="text-end">
                <span class="fw-bold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}">
                    ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
                </span>
            </td>
            <td class="text-center">
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="editTransaction(${transaction.id})" title="Edit">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteTransaction(${transaction.id})" title="Delete">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('transactionsPagination');
    if (!pagination) return;
    
    const transactionsToShow = filteredTransactions.length > 0 || hasActiveFilters() ? 
        filteredTransactions : transactions;
    
    const totalPages = Math.ceil(transactionsToShow.length / transactionsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const transactionsToShow = filteredTransactions.length > 0 || hasActiveFilters() ? 
        filteredTransactions : transactions;
    const totalPages = Math.ceil(transactionsToShow.length / transactionsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderTransactionsTable();
}

function hasActiveFilters() {
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const monthFilter = document.getElementById('monthFilter')?.value || '';
    const amountFilter = document.getElementById('amountFilter')?.value || '';
    const searchInput = document.getElementById('transactionSearch')?.value || '';
    
    return typeFilter || categoryFilter || monthFilter || amountFilter || searchInput;
}

function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    // Populate edit form
    document.getElementById('editTransactionId').value = transaction.id;
    document.getElementById('editTitle').value = transaction.title;
    document.getElementById('editAmount').value = transaction.amount;
    document.getElementById('editType').value = transaction.type;
    document.getElementById('editDescription').value = transaction.description;
    document.getElementById('editCategory').value = transaction.category;
    document.getElementById('editDate').value = transaction.date;
    
    // Populate category dropdown based on transaction type
    const editCategorySelect = document.getElementById('editCategory');
    const categories = transaction.type === 'income' ? 
        ['Salary', 'Freelance', 'Investment', 'Business', 'Other'] :
        ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other'];
    
    // Always populate the category dropdown with appropriate categories
    editCategorySelect.innerHTML = categories.map(cat => 
        `<option value="${cat}" ${cat === transaction.category ? 'selected' : ''}>${cat}</option>`
    ).join('');
    
    // Show modal using custom implementation
    showModal('editTransactionModal');
}

async function updateTransaction() {
    const id = parseInt(document.getElementById('editTransactionId').value);
    const title = document.getElementById('editTitle').value;
    const amount = parseFloat(document.getElementById('editAmount').value);
    const type = document.getElementById('editType').value;
    const description = document.getElementById('editDescription').value;
    const category = document.getElementById('editCategory').value;
    const date = document.getElementById('editDate').value;
    
    if (!title || !amount || !description || !category || !date) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    try {
        // Update transaction via store
        const transactionData = {
            title: title,
            amount: amount,
            type: type,
            description: description,
            category: category,
            date: date
        };
        
        await store.updateTransaction(id, transactionData);
        
        // Close modal using custom implementation
        hideModal('editTransactionModal');
        
        showToast('Transaction updated successfully!', 'success');
    } catch (error) {
        console.error('Failed to update transaction:', error);
        showToast('Failed to update transaction', 'error');
    }
}

function exportTransactions() {
    const transactionsToExport = filteredTransactions.length > 0 || hasActiveFilters() ? 
        filteredTransactions : transactions;
    
    if (transactionsToExport.length === 0) {
        showToast('No transactions to export', 'error');
        return;
    }
    
    // Create CSV content
    const headers = ['Date', 'Title', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
        headers.join(','),
        ...transactionsToExport.map(t => [
            t.date,
            `"${t.title}"`,
            `"${t.description}"`,
            t.category,
            t.type,
            t.amount
        ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast('Transactions exported successfully!', 'success');
}

// Override the global functions to refresh the transactions table
const originalAddIncome = window.addIncome;
const originalAddExpense = window.addExpense;
const originalDeleteTransaction = window.deleteTransaction;

window.addIncome = function() {
    originalAddIncome();
    setTimeout(() => {
        populateCategoryFilter();
        applyFilters();
    }, 100);
};

window.addExpense = function() {
    originalAddExpense();
    setTimeout(() => {
        populateCategoryFilter();
        applyFilters();
    }, 100);
};

window.deleteTransaction = async function(id) {
    try {
        await store.deleteTransaction(id);
        populateCategoryFilter();
        applyFilters();
        showToast('Transaction deleted successfully!', 'success');
    } catch (error) {
        console.error('Failed to delete transaction:', error);
        showToast('Failed to delete transaction', 'error');
    }
};

// Helper function to refresh transactions from store
async function refreshTransactions() {
    try {
        await store.loadFromAPI();
        transactions = store.state.transactions;
        renderTransactionsTable();
        populateCategoryFilter();
    } catch (error) {
        console.error('Failed to refresh transactions:', error);
        showToast('Failed to refresh transactions', 'error');
    }
}

// Export functions for global access
window.editTransaction = editTransaction;
window.updateTransaction = updateTransaction;
window.exportTransactions = exportTransactions;
window.changePage = changePage;
window.applyFilters = applyFilters;
window.refreshTransactions = refreshTransactions;
