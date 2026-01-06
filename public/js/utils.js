/**
 * FinanceTracker - Utilities
 */

function formatMoney(amount) {
    if (window.formatMoney) return window.formatMoney(amount);
    return '$' + parseFloat(amount).toFixed(2);
}

function formatDate(dateString) {
    if (window.formatDate) return window.formatDate(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

window.formatMoney = window.formatMoney || formatMoney;
window.formatDate = window.formatDate || formatDate;
