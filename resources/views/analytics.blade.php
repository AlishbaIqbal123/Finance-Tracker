@extends('layouts.app')

@section('title', 'Analytics - FinanceTracker')
@section('page_title', 'Analytics & Reports')

@section('content')
    <!-- Removed duplicate header since we now have a global one -->
    
    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
        <div class="col-lg-4 col-md-6">
            <x-summary-card 
                id="analyticsIncome"
                title="💰 TOTAL INCOME"
                :amount="0"
                icon="bi-arrow-up-circle"
                color="success"
                description="All money you've earned"
                trend="up"
                trend-value="12.5"
                trend-label="vs last month"
            />
        </div>
        
        <div class="col-lg-4 col-md-6">
            <x-summary-card 
                id="analyticsExpenses"
                title="💸 TOTAL EXPENSES"
                :amount="0"
                icon="bi-arrow-down-circle"
                color="danger"
                description="All money you've spent"
                trend="down"
                trend-value="5.2"
                trend-label="vs last month"
            />
        </div>
        
        <div class="col-lg-4 col-md-12">
            <x-summary-card 
                id="analyticsBalance"
                title="💵 NET BALANCE"
                :amount="0"
                icon="bi-wallet2"
                color="primary"
                description="Income minus expenses"
            />
        </div>
    </div>

    <!-- Charts Row -->
    <div class="row">
        <div class="col-lg-8 mb-4">
            <div class="card h-100">
                <div class="card-header">
                    Monthly Report
                    <div class="text-muted small fw-normal">Income vs Expenses</div>
                </div>
                <div class="card-body">
                    <div id="monthlyChart" style="height: 300px; position: relative; width: 100%;">
                        <canvas></canvas> 
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-lg-4 mb-4">
            <div class="card">
                <div class="card-header">
                    Spending by Category
                    <div class="text-muted" style="font-size: 12px; font-weight: normal;">Top spending categories</div>
                </div>
                <div class="card-body">
                    <div id="categoryChart" style="height: 300px; position: relative;">
                        <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Category Details -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span>Category Details</span>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-secondary" onclick="setTimePeriod('week')">Week</button>
                        <button type="button" class="btn btn-outline-secondary active" onclick="setTimePeriod('month')">Month</button>
                        <button type="button" class="btn btn-outline-secondary" onclick="setTimePeriod('year')">Year</button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="categoryDetails">
                        <div class="d-flex justify-content-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
<style>
    .category-progress {
        height: 8px;
        border-radius: 4px;
        background-color: #e9ecef;
        overflow: hidden;
        margin-top: 5px;
    }
    
    .progress-bar {
        height: 100%;
        border-radius: 4px;
        transition: width 0.6s ease;
    }
    
    .category-item {
        padding: 15px 0;
        border-bottom: 1px solid #e9ecef;
    }
    
    .category-item:last-child {
        border-bottom: none;
    }
    
    .category-icon {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        color: white;
    }
    
    .category-amount {
        font-weight: 600;
    }
    
    /* Responsive adjustments for analytics page */
    @media (max-width: 768px) {
        .page-title {
            font-size: 28px;
        }
        
        .page-subtitle {
            font-size: 14px;
        }
        
        .card-body {
            padding: 20px;
        }
        
        .btn-group .btn {
            padding: 8px 12px;
            font-size: 13px;
        }
    }
    
    @media (max-width: 576px) {
        .page-header {
            margin-bottom: 24px;
        }
        
        .summary-card {
            margin-bottom: 16px;
        }
        
        .card {
            margin-bottom: 20px;
        }
    }
</style>
@endpush

@push('scripts')
<script src="{{ asset('js/analytics.js') }}"></script>
<script>
    // Make sure the analytics script is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize analytics with a small delay to ensure DOM is ready
        setTimeout(function() {
            if (typeof initAnalytics === 'function') {
                initAnalytics();
            } else {
                console.error('Analytics initialization function not found');
                // Fallback initialization
                if (typeof window.refreshAnalyticsData === 'function') {
                    window.refreshAnalyticsData();
                }
            }
        }, 500);
    });
    
    // Expose the setTimePeriod function to the global scope
    window.setTimePeriod = function(period) {
        // Update active button state
        document.querySelectorAll('.btn-group .btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim().toLowerCase() === period) {
                btn.classList.add('active');
            }
        });
        
        // Call the analytics function if available
        if (typeof window.refreshAnalyticsData === 'function') {
            window.refreshAnalyticsData();
        }
    };
    
    // Reinitialize on page visibility change
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(function() {
                if (typeof window.refreshAnalyticsData === 'function') {
                    window.refreshAnalyticsData();
                }
            }, 300);
        }
    });
</script>
@endpush