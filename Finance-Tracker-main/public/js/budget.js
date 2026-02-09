/**
 * FinanceTracker - Budget Page Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('Budget page logic initialized');

    // Initial update
    if (typeof updateBudgetPage === 'function') {
        updateBudgetPage();
    }
});

// Bridge functions if any specific ones are called from the blade
function refreshBudgetData() {
    if (typeof updateBudgetPage === 'function') {
        updateBudgetPage();
    }
}
