// API utility functions for interacting with the Laravel backend

const API_BASE_URL = '/api';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// Transaction API functions
export const transactions = {
    // Get all transactions
    async getAll() {
        return await apiRequest('/transactions');
    },

    // Get a specific transaction
    async getById(id) {
        return await apiRequest(`/transactions/${id}`);
    },

    // Create a new transaction
    async create(transactionData) {
        return await apiRequest('/transactions', {
            method: 'POST',
            body: JSON.stringify(transactionData),
        });
    },

    // Update a transaction
    async update(id, transactionData) {
        return await apiRequest(`/transactions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(transactionData),
        });
    },

    // Delete a transaction
    async delete(id) {
        return await apiRequest(`/transactions/${id}`, {
            method: 'DELETE',
        });
    },

    // Filter transactions
    async filter(filters) {
        const queryParams = new URLSearchParams(filters).toString();
        return await apiRequest(`/transactions/filter?${queryParams}`);
    }
};

// Export the main API object
export default {
    transactions
};