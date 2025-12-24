@extends('layouts.app')

@section('title', 'Settings - FinanceTracker')

@section('content')
    <div class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your application preferences</p>
    </div>

    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-header">
                    <i class="bi bi-wallet2 me-2"></i> Currency & Region
                </div>
                <div class="card-body">
                    <form id="currencyForm">
                        <div class="mb-4">
                            <label class="form-label">Preferred Currency</label>
                            <select class="form-select" id="currencySelector">
                                <option value="PKR">Pakistani Rupee (PKR)</option>
                                <option value="USD">US Dollar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="GBP">British Pound (GBP)</option>
                                <option value="INR">Indian Rupee (INR)</option>
                                <option value="JPY">Japanese Yen (JPY)</option>
                                <option value="CNY">Chinese Yuan (CNY)</option>
                                <option value="AUD">Australian Dollar (AUD)</option>
                                <option value="CAD">Canadian Dollar (CAD)</option>
                                <option value="SGD">Singapore Dollar (SGD)</option>
                            </select>
                            <div class="form-text text-muted">This will update the currency symbol across the application.</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-header">
                     <i class="bi bi-shield-check me-2"></i> Data Management
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label d-block">Reset Application Data</label>
                        <p class="text-muted small">This will clear all transactions, budgets, and settings from your browser storage. This action cannot be undone.</p>
                        <button class="btn btn-outline-danger" onclick="confirmReset()">
                            <i class="bi bi-trash me-2"></i> Reset All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Load saved currency
        const savedCurrency = localStorage.getItem('preferredCurrency') || 'PKR';
        const selector = document.getElementById('currencySelector');
        if (selector) {
            selector.value = savedCurrency;
        }

        // Handle form submission
        const form = document.getElementById('currencyForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const currency = document.getElementById('currencySelector').value;
                localStorage.setItem('preferredCurrency', currency);
                
                // Show success toast
                const toast = document.getElementById('toast');
                const toastBody = toast.querySelector('.toast-body');
                toastBody.textContent = 'Currency preference saved successfully!';
                const bsToast = new bootstrap.Toast(toast);
                bsToast.show();
                
                // Reload after delay to apply changes
                setTimeout(() => window.location.reload(), 1000);
            });
        }
    });

    function confirmReset() {
        if(confirm('Are you definitely sure? This will wipe all your data!')) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    }
</script>
@endpush
