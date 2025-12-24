<!-- Sidebar Component -->
<div class="sidebar">
    <div class="sidebar-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom border-light">
        <a href="{{ url('/dashboard') }}" class="sidebar-brand mb-0 text-decoration-none d-flex align-items-center">
            <i class="bi bi-clock me-2 text-primary fs-4"></i>
            <span class="brand-text fw-bold">FinanceTracker</span>
        </a>
        <button id="sidebarToggle" class="btn btn-link text-muted p-0 d-none d-lg-block">
            <i class="bi bi-list fs-4"></i>
        </button>
    </div>
    
    <ul class="sidebar-nav">
        <li class="sidebar-nav-item">
            <a href="{{ url('/dashboard') }}" class="sidebar-nav-link {{ request()->is('dashboard') ? 'active' : '' }}">
                <i class="bi bi-house"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/transactions') }}" class="sidebar-nav-link {{ request()->is('transactions*') ? 'active' : '' }}">
                <i class="bi bi-receipt"></i>
                <span>Transactions</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/budget') }}" class="sidebar-nav-link {{ request()->is('budget*') ? 'active' : '' }}">
                <i class="bi bi-piggy-bank"></i>
                <span>Budget</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/analytics') }}" class="sidebar-nav-link {{ request()->is('analytics*') ? 'active' : '' }}">
                <i class="bi bi-bar-chart"></i>
                <span>Analytics</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/profile') }}" class="sidebar-nav-link {{ request()->is('profile*') ? 'active' : '' }}">
                <i class="bi bi-person"></i>
                <span>Profile</span>
            </a>
        </li>
        <li class="sidebar-nav-item">
            <a href="{{ url('/settings') }}" class="sidebar-nav-link {{ request()->is('settings*') ? 'active' : '' }}">
                <i class="bi bi-gear"></i>
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