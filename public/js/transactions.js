/**
 * FinanceTracker - Transactions Page Implementation
 * Robust filtering, search, and pagination for transaction records
 */

let filteredTransactions = [];
let currentPage = 1;
const transactionsPerPage = 10;

// Initialize transactions page
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('transactions')) {
        initializeTransactionsPage();
    }
});

function initializeTransactionsPage() {
    console.log('Initializing Transactions Page...');

    // Ensure we have data
    if (typeof window.transactions === 'undefined' || !window.transactions) {
        window.transactions = [];
    }

    try {
        setupTransactionFilters();
        populateCategoryFilter();
        applyFilters();
    } catch (error) {
        console.error('Failed to initialize transactions:', error);
    }
}

function setupTransactionFilters() {
    const typeFilter = document.getElementById('typeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const monthFilter = document.getElementById('monthFilter');
    const amountFilter = document.getElementById('amountFilter');
    const searchInput = document.getElementById('transactionSearch');

    if (typeFilter) typeFilter.addEventListener('change', () => applyFilters());
    if (categoryFilter) categoryFilter.addEventListener('change', () => applyFilters());
    if (monthFilter) monthFilter.addEventListener('change', () => applyFilters());
    if (amountFilter) amountFilter.addEventListener('change', () => applyFilters());
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            // Debounce or at least trigger on input
            applyFilters();
        });
    }

    // Set default month to current month if filter is empty
    if (monthFilter && !monthFilter.value) {
        // monthFilter.value = new Date().toISOString().slice(0, 7);
    }
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;

    const transactions = window.transactions || [];
    const categories = [...new Set(transactions.map(t => t.category))].filter(Boolean).sort();

    const currentVal = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        if (category === currentVal) option.selected = true;
        categoryFilter.appendChild(option);
    });
}

function applyFilters() {
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const monthFilter = document.getElementById('monthFilter')?.value || '';
    const amountFilter = document.getElementById('amountFilter')?.value || '';
    const searchInput = document.getElementById('transactionSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const transactions = window.transactions || [];

    filteredTransactions = transactions.filter(transaction => {
        // Type filter
        if (typeFilter && transaction.type !== typeFilter) return false;

        // Category filter
        if (categoryFilter && transaction.category !== categoryFilter) return false;

        // Month filter
        if (monthFilter && transaction.date && !transaction.date.startsWith(monthFilter)) return false;

        // Amount filter
        if (amountFilter) {
            const amount = Number(transaction.amount) || 0;
            switch (amountFilter) {
                case '0-50': if (amount > 50) return false; break;
                case '50-100': if (amount <= 50 || amount > 100) return false; break;
                case '100-500': if (amount <= 100 || amount > 500) return false; break;
                case '500+': if (amount <= 500) return false; break;
            }
        }

        // Search filter
        if (searchTerm) {
            const searchableText = `${transaction.title} ${transaction.description || ''} ${transaction.category}`.toLowerCase();
            if (!searchableText.includes(searchTerm)) return false;
        }

        return true;
    });

    currentPage = 1;
    renderTransactionsTable();
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    if (filteredTransactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">
                    <div class="text-muted">
                        <i class="bi bi-receipt fs-1 d-block mb-2 opacity-50"></i>
                        <h5>No transactions found</h5>
                        <p class="small">Try adjusting your filters or add a new record.</p>
                    </div>
                </td>
            </tr>
        `;
        renderPagination(0);
        return;
    }

    // Sort by date descending
    const sorted = [...filteredTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pagination
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const paginated = sorted.slice(startIndex, endIndex);

    tbody.innerHTML = paginated.map(t => `
        <tr>
            <td class="ps-3">
                <div class="fw-bold">${window.formatDate ? window.formatDate(t.date) : t.date}</div>
                <small class="text-muted d-md-none">${t.category}</small>
            </td>
            <td>
                <div class="fw-semibold">${t.title}</div>
                <div class="text-truncate text-muted small d-none d-md-block" style="max-width: 250px;">${t.description || ''}</div>
            </td>
            <td class="d-none d-md-table-cell">
                <span class="badge bg-secondary-soft text-dark border">${t.category}</span>
            </td>
            <td>
                <span class="badge ${t.type === 'income' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'} px-2 py-1">
                    ${t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                </span>
            </td>
            <td class="text-end">
                <span class="fw-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}">
                    ${t.type === 'income' ? '+' : '-'}${window.formatMoney ? window.formatMoney(t.amount) : t.amount}
                </span>
            </td>
            <td class="text-end pe-3">
                <div class="dropdown">
                    <button class="btn btn-sm btn-light border" data-bs-toggle="dropdown">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                        <li><a class="dropdown-item" href="#" onclick="editTransaction(${t.id})"><i class="bi bi-pencil me-2"></i>Edit</a></li>
                        <li><a class="dropdown-item text-danger" href="#" onclick="deleteTransaction(${t.id})"><i class="bi bi-trash me-2"></i>Delete</a></li>
                    </ul>
                </div>
            </td>
        </tr>
    `).join('');

    renderPagination(filteredTransactions.length);
}

function renderPagination(totalItems) {
    const pagination = document.getElementById('transactionsPagination');
    if (!pagination) return;

    const totalPages = Math.ceil(totalItems / transactionsPerPage);
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="window.changePage(${currentPage - 1}); return false;">
                <i class="bi bi-chevron-left"></i>
            </a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="window.changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }

    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="window.changePage(${currentPage + 1}); return false;">
                <i class="bi bi-chevron-right"></i>
            </a>
        </li>
    `;

    pagination.innerHTML = html;
}

window.changePage = function (page) {
    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTransactionsTable();
};

// Handle Transaction Modal logic
function editTransaction(id) {
    const transactions = window.transactions || [];
    const t = transactions.find(item => String(item.id) === String(id));
    if (!t) return;

    // Fill form
    const idInput = document.getElementById('editTransactionId');
    const titleInput = document.getElementById('editTitle');
    const amountInput = document.getElementById('editAmount');
    const typeSelect = document.getElementById('editType');
    const catSelect = document.getElementById('editCategory');
    const descText = document.getElementById('editDescription');
    const dateInput = document.getElementById('editDate');

    if (idInput) idInput.value = t.id;
    if (titleInput) titleInput.value = t.title;
    if (amountInput) amountInput.value = t.amount;
    if (typeSelect) {
        typeSelect.value = t.type;
        // Trigger category update
        populateEditCategories(t.type, t.category);
    }
    if (descText) descText.value = t.description || '';
    if (dateInput) dateInput.value = t.date;

    if (typeof window.showModal === 'function') {
        window.showModal('editTransactionModal');
    }
}

function populateEditCategories(type, selectedCategory = '') {
    const catSelect = document.getElementById('editCategory');
    if (!catSelect) return;

    const incomeCats = ['Salary', 'Freelance', 'Investment', 'Business', 'Bonus', 'Other'];
    const expenseCats = ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Travel', 'Other'];

    const cats = (type === 'income') ? incomeCats : expenseCats;
    catSelect.innerHTML = cats.map(c => `<option value="${c}" ${c === selectedCategory ? 'selected' : ''}>${c}</option>`).join('');
}

// Attach listener to type change in edit modal
document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'editType') {
        populateEditCategories(e.target.value);
    }
});

// Update function - calls API then refreshes
window.updateTransaction = async function () {
    const id = document.getElementById('editTransactionId').value;
    const data = {
        title: document.getElementById('editTitle').value,
        amount: parseFloat(document.getElementById('editAmount').value),
        type: document.getElementById('editType').value,
        category: document.getElementById('editCategory').value,
        description: document.getElementById('editDescription').value,
        date: document.getElementById('editDate').value
    };

    if (!data.title || isNaN(data.amount)) {
        alert('Please enter valid title and amount');
        return;
    }

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const response = await fetch(`/api/transactions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            // Update local state
            const idx = window.transactions.findIndex(t => String(t.id) === String(id));
            if (idx !== -1) {
                window.transactions[idx] = result.data;
                // Reactive update
                window.transactions = [...window.transactions];
            }

            if (typeof window.hideModal === 'function') window.hideModal('editTransactionModal');
            if (typeof window.showToast === 'function') window.showToast('Transaction updated!', 'success');

            applyFilters();
        } else {
            console.error('Update failed');
            alert('Could not update transaction on server.');
        }
    } catch (e) {
        console.error(e);
        // Fallback for demo mode
        const idx = window.transactions.findIndex(t => String(t.id) === String(id));
        if (idx !== -1) {
            window.transactions[idx] = { ...data, id: id };
            window.transactions = [...window.transactions];
        }
        if (window.hideModal) window.hideModal('editTransactionModal');
        applyFilters();
    }
};

// Global exports
window.applyFilters = applyFilters;
window.editTransaction = editTransaction;
window.renderTransactionsTable = renderTransactionsTable;
