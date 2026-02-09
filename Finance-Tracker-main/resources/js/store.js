// store.js - Centralized state management with API persistence
class Store {
    constructor() {
        this.state = {
            transactions: [],
            budgets: [],
            incomeCategories: ['Salary', 'Freelance', 'Investment', 'Business', 'Other'],
            expenseCategories: ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other']
        };
        this.listeners = new Set();
        this.loadFromAPI();
    }

    async loadFromAPI() {
        try {
            // Import API module dynamically
            const { default: api } = await import('./api.js');
            
            // Load transactions from API
            const transactionsResponse = await api.transactions.getAll();
            this.state.transactions = transactionsResponse.data || [];
            
            // For budgets, we'll keep using localStorage for now
            const savedBudgets = localStorage.getItem('financeTracker_budgets');
            if (savedBudgets) {
                this.state.budgets = JSON.parse(savedBudgets);
            }
            
            this.notify();
        } catch (error) {
            console.error('Error loading data from API:', error);
            
            // Fallback to localStorage
            try {
                const savedState = localStorage.getItem('financeTrackerState');
                if (savedState) {
                    this.state = { ...this.state, ...JSON.parse(savedState) };
                }
            } catch (storageError) {
                console.error('Error loading state from storage:', storageError);
            }
        }
    }

    saveToStorage() {
        try {
            // Budgets are still saved locally
            localStorage.setItem('financeTracker_budgets', JSON.stringify(this.state.budgets));
        } catch (error) {
            console.error('Error saving state to storage:', error);
        }
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
        this.saveToStorage();
    }

    // Transaction Methods
    async addTransaction(transaction) {
        try {
            // Import API module dynamically
            const { default: api } = await import('./api.js');
            
            // Create transaction via API
            const response = await api.transactions.create(transaction);
            const newTransaction = response.data;
            
            this.state.transactions = [...this.state.transactions, newTransaction];
            this.notify();
            return newTransaction;
        } catch (error) {
            console.error('Error adding transaction:', error);
            throw error;
        }
    }

    async updateTransaction(id, updatedData) {
        try {
            // Import API module dynamically
            const { default: api } = await import('./api.js');
            
            // Update transaction via API
            const response = await api.transactions.update(id, updatedData);
            const updatedTransaction = response.data;
            
            this.state.transactions = this.state.transactions.map(t => 
                t.id == id ? updatedTransaction : t
            );
            this.notify();
        } catch (error) {
            console.error('Error updating transaction:', error);
            throw error;
        }
    }

    async deleteTransaction(id) {
        try {
            // Import API module dynamically
            const { default: api } = await import('./api.js');
            
            // Delete transaction via API
            await api.transactions.delete(id);
            
            this.state.transactions = this.state.transactions.filter(t => t.id != id);
            this.notify();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            throw error;
        }
    }

    // Budget Methods
    addBudget(budget) {
        const newBudget = {
            id: Date.now().toString(),
            ...budget
        };
        this.state.budgets = [...this.state.budgets, newBudget];
        this.notify();
        this.saveToStorage();
        return newBudget;
    }

    updateBudget(id, updatedData) {
        this.state.budgets = this.state.budgets.map(b => 
            b.id === id ? { ...b, ...updatedData } : b
        );
        this.notify();
        this.saveToStorage();
    }

    deleteBudget(id) {
        this.state.budgets = this.state.budgets.filter(b => b.id !== id);
        this.notify();
        this.saveToStorage();
    }

    // Category Methods
    addCategory(type, category) {
        const key = type === 'income' ? 'incomeCategories' : 'expenseCategories';
        if (!this.state[key].includes(category)) {
            this.state[key] = [...this.state[key], category];
            this.notify();
        }
    }

    removeCategory(type, category) {
        const key = type === 'income' ? 'incomeCategories' : 'expenseCategories';
        this.state[key] = this.state[key].filter(c => c !== category);
        this.notify();
    }

    // Utility Methods
    getTransactionsByMonth(month) {
        return this.state.transactions.filter(t => t.date.startsWith(month));
    }

    getBudgetByMonth(month) {
        return this.state.budgets.find(b => b.month === month);
    }

    calculateBalance() {
        return this.state.transactions.reduce((total, t) => {
            return total + (t.type === 'income' ? t.amount : -t.amount);
        }, 0);
    }

    calculateTotalsByType() {
        return this.state.transactions.reduce((acc, t) => {
            acc[t.type] = (acc[t.type] || 0) + t.amount;
            return acc;
        }, { income: 0, expense: 0 });
    }
}

// Create and export a single store instance
export const store = new Store();