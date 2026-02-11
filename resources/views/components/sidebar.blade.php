<!-- Sidebar Component -->
<div class="sidebar">
    <div class="sidebar-header border-bottom d-flex align-items-center justify-content-between">
        <a href="{{ url('/dashboard') }}" class="sidebar-brand d-flex align-items-center">
            <i class="bi bi-clock-fill text-primary"></i>
            <span class="brand-text ms-2">FinanceTracker</span>
        </a>
        <button id="sidebarToggle" class="btn btn-link text-muted p-0 d-none d-lg-flex align-items-center justify-content-center">
            <i class="bi bi-list fs-4"></i>
        </button>
    </div>
    
    <ul class="sidebar-nav mt-3">
        <li class="sidebar-nav-item">
            <a href="{{ url('/dashboard') }}" class="sidebar-nav-link {{ request()->is('dashboard') ? 'active' : '' }}">
                <i class="bi bi-house-door{{ request()->is('dashboard') ? '-fill' : '' }}"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/transactions') }}" class="sidebar-nav-link {{ request()->is('transactions*') ? 'active' : '' }}">
                <i class="bi bi-receipt{{ request()->is('transactions*') ? '-cutoff' : '' }}"></i>
                <span>Transactions</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/budget') }}" class="sidebar-nav-link {{ request()->is('budget*') ? 'active' : '' }}">
                <i class="bi bi-piggy-bank{{ request()->is('budget*') ? '-fill' : '' }}"></i>
                <span>Budget Planner</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/analytics') }}" class="sidebar-nav-link {{ request()->is('analytics*') ? 'active' : '' }}">
                <i class="bi bi-bar-chart{{ request()->is('analytics*') ? '-line-fill' : '' }}"></i>
                <span>Analytics</span>
            </a>
        </li>
        <li class="sidebar-nav-separator my-3 border-top mx-3 opacity-50"></li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/profile') }}" class="sidebar-nav-link {{ request()->is('profile*') ? 'active' : '' }}">
                <i class="bi bi-person{{ request()->is('profile*') ? '-badge-fill' : '' }}"></i>
                <span>My Profile</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/settings') }}" class="sidebar-nav-link {{ request()->is('settings*') ? 'active' : '' }}">
                <i class="bi bi-gear{{ request()->is('settings*') ? '-fill' : '' }}"></i>
                <span>Settings</span>
            </a>
        </li>
    </ul>
    
    <div class="sidebar-bottom">
        <div class="sidebar-user mb-3">
            <div class="user-avatar mb-2">
                <i class="bi bi-person-fill"></i>
            </div>
            <div class="user-info">
                <div id="sidebarUserName">{{ Auth::user() ? Auth::user()->name : 'User' }}</div>
                <div id="sidebarUserEmail">{{ Auth::user() ? Auth::user()->email : 'demo@financetracker.com' }}</div>
            </div>
        </div>
        
        <!-- Theme Selector -->
        @include('components.theme-selector')        
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="sidebar-logout mb-3">
                <i class="bi bi-box-arrow-right"></i>
                <span>Logout</span>
            </button>
        </form>
        
        <div class="sidebar-balance">
            <div class="balance-label">TOTAL BALANCE</div>
            <div class="balance-amount" id="sidebarBalance">${{ number_format(Auth::user() ? Auth::user()->balance : 19500, 2) }}</div>
        </div>
    </div>
</div>