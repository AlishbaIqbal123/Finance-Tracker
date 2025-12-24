// Transactions Page Specific Logic

let currentPage = 1;
const itemsPerPage = 10;
let filteredTransactions = [];

document.addEventListener('DOMContentLoaded', function () {
    // Initialize
    loadTransactions();
    populateCategoryFilter();
});

function loadTransactions() {
    if (window.transactions) {
        filteredTransactions = [...window.transactions];
        renderTransactionsTable();
        renderPagination();
    } else {
        // Retry if global data isn't ready
        setTimeout(loadTransactions, 100);
    }
}

function populateCategoryFilter() {
    const filterSelect = document.getElementById('categoryFilter');
    const editCategorySelect = document.getElementById('editCategory');
    if (!filterSelect) return;

    // Get unique categories from transactions
    const categories = new Set();
    if (window.transactions) {
        window.transactions.forEach(t => categories.add(t.category));
    }
    // Also include default budgets categories if present
    if (window.budgets) {
        window.budgets.forEach(b => categories.add(b.category));
    }

    // Default categories
    ['Food', 'Shopping', 'Bills', 'Salary', 'Entertainment', 'Healthcare', 'Education', 'Other'].forEach(c => categories.add(c));

    // Populate filter
    filterSelect.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(cat => {
        filterSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    // Populate edit category
    if (editCategorySelect) {
        editCategorySelect.innerHTML = '<option value="" disabled>Select Category</option>';
        categories.forEach(cat => {
            editCategorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('transactionSearch').value.toLowerCase();
    const type = document.getElementById('typeFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const month = document.getElementById('monthFilter').value; // yyyy-mm
    const amountRange = document.getElementById('amountFilter').value;

    filteredTransactions = window.transactions.filter(t => {
        // Text Match
        const textMatch = t.description.toLowerCase().includes(searchTerm) ||
            t.category.toLowerCase().includes(searchTerm) ||
            t.title?.toLowerCase().includes(searchTerm);
        if (!textMatch) return false;

        // Type Match
        if (type && t.type !== type) return false;

        // Category Match
        if (category && t.category !== category) return false;

        // Month Match
        if (month) {
            if (!t.date.startsWith(month)) return false;
        }

        // Amount Match
        if (amountRange) {
            const amt = Number(t.amount);
            if (amountRange === '0-50' && (amt < 0 || amt > 50)) return false;
            if (amountRange === '50-100' && (amt <= 50 || amt > 100)) return false;
            if (amountRange === '100-500' && (amt <= 100 || amt > 500)) return false;
            if (amountRange === '500+' && amt <= 500) return false;
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

    // Sort by date desc
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredTransactions.slice(start, end);

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No transactions found</td></tr>';
        return;
    }

    tbody.innerHTML = pageItems.map(t => `
        <tr class="align-middle hover-bg">
            <td class="text-nowrap text-muted small">${formatDate(t.date)}</td>
            <td>
                <div class="fw-bold text-dark">${t.title || 'Untitled Transaction'}</div>
                <div class="small text-muted d-block d-md-none">${t.category}</div>
            </td>
            <td class="d-none d-md-table-cell">
                <span class="badge rounded-pill bg-light text-dark border fw-normal px-3 py-2">
                    ${t.category}
                </span>
            </td>
            <td>
                <span class="badge rounded-pill ${t.type === 'income' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'} px-3 py-2">
                    ${t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                </span>
            </td>
            <td class="text-end fw-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}" style="font-family: monospace; font-size: 1.1em;">
                ${t.type === 'income' ? '+' : '-'}${formatMoney(t.amount)}
            </td>
            <td class="text-end">
                <div class="btn-group">
                    <button class="btn btn-sm btn-light text-primary border-0 rounded-circle p-2 mx-1" onclick="openEditModal(${t.id})" title="Edit">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button class="btn btn-sm btn-light text-danger border-0 rounded-circle p-2 mx-1" onclick="deleteTransaction(${t.id})" title="Delete">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const pagination = document.getElementById('transactionsPagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    let html = '';

    // Prev
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `;

    // Numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <li class="page-item ${currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    // Next
    html += `
        <li class="page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;

    pagination.innerHTML = html;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredTransactions.length / itemsPerPage)) return;
    currentPage = page;
    renderTransactionsTable();
    renderPagination();
}

function openEditModal(id) {
    const t = window.transactions.find(item => item.id === id);
    if (!t) return;

    document.getElementById('editTransactionId').value = t.id;
    document.getElementById('editTitle').value = t.title || t.description || '';
    document.getElementById('editAmount').value = t.amount;
    document.getElementById('editType').value = t.type;
    document.getElementById('editCategory').value = t.category;
    document.getElementById('editDate').value = t.date;
    document.getElementById('editDescription').value = t.description || '';

    const modal = new bootstrap.Modal(document.getElementById('editTransactionModal'));
    modal.show();
}

function updateTransaction() {
    if (window.checkGuestAccess && !window.checkGuestAccess()) return;

    const id = parseInt(document.getElementById('editTransactionId').value);
    const title = document.getElementById('editTitle').value;
    const amount = parseFloat(document.getElementById('editAmount').value);
    const type = document.getElementById('editType').value;
    const category = document.getElementById('editCategory').value;
    const date = document.getElementById('editDate').value;
    const description = document.getElementById('editDescription').value;

    if (!title || isNaN(amount) || !date) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const index = window.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        window.transactions[index] = {
            id,
            title,
            amount,
            type,
            category,
            date,
            description
        };
        // Update global storage
        window.transactions = [...window.transactions]; // Trigger setter
        saveToSession(); // Assuming this is available globally or we use the setter side-effect

        // Hide modal
        const modalEl = document.getElementById('editTransactionModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        showToast('Transaction updated successfully', 'success');
        applyFilters(); // Refresh table
    }
}
