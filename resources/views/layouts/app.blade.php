<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'FinanceTracker')</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <script src="{{ asset('js/theme.js') }}"></script>
    @stack('styles')
    <style>
        .hover-bg-light:hover {
            background-color: rgba(0,0,0,0.05);
        }
        [data-theme="dark"] .hover-bg-light:hover {
            background-color: rgba(255,255,255,0.05);
        }
    </style>
</head>
<body>
    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    
    <div class="app-layout">
        <!-- Sidebar - Only show if NOT on welcome/landing page -->
        @unless(request()->is('/') || request()->is('welcome') || request()->is('login') || request()->is('register'))
            @include('components.sidebar')
        @endunless
        
        <!-- Main Content -->
        <div class="main-content" @if(request()->is('/') || request()->is('welcome') || request()->is('login') || request()->is('register')) style="margin-left: 0;" @endif>
            
            @unless(request()->is('/') || request()->is('welcome') || request()->is('login') || request()->is('register'))
            <!-- Dashboard Header -->
            <nav class="navbar navbar-expand border-start-0">
                <div class="container-fluid px-3 px-md-4">
                    <div class="d-flex align-items-center flex-grow-1 flex-md-grow-0">
                        <!-- Hamburger Menu for Tablet/Medium Screens -->
                        <button class="btn btn-link text-decoration-none p-0 me-3 d-lg-none sidebar-toggle" id="sidebarToggleNavbar" type="button">
                            <i class="bi bi-list fs-3 theme-text"></i>
                        </button>
                        <h4 class="mb-0 mt-0 fw-bold theme-text fs-5 fs-md-4">@yield('page_title', 'Overview')</h4>
                    </div>
                    
                    <div class="d-flex align-items-center gap-2 gap-md-3" style="overflow: visible !important;">
                         <!-- Theme Toggle (Desktop Only) -->
                         <button class="btn btn-theme-toggle rounded-circle p-2 d-none d-md-flex align-items-center justify-content-center" onclick="toggleTheme()" title="Toggle Theme">
                             <i class="bi bi-moon theme-icon"></i>
                         </button>
                         
             <!-- User Profile Dropdown -->
             <div class="dropdown me-1" style="overflow: visible !important;">
                <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle theme-text ps-1 pe-3 py-1 rounded-pill hover-scale" 
                   id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style="background: rgba(var(--primary-rgb, 214, 51, 132), 0.05); border: 1px solid rgba(var(--primary-rgb, 214, 51, 132), 0.1);">
                    <div class="user-avatar-initials text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                         style="width: 32px; height: 32px; background: linear-gradient(135deg, var(--primary), var(--primary-hover)); margin-right: 10px;">
                        <i class="bi bi-person-fill fs-6"></i>
                    </div>
                    <span class="d-none d-sm-inline fw-bold me-1" id="headerUserName" style="font-size: 0.9rem; color: var(--primary);">User</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0" aria-labelledby="dropdownUser1">
                    <li class="px-3 py-2 border-bottom d-sm-none">
                        <span class="fw-bold d-block">User</span>
                        <small class="text-muted">Account</small>
                    </li>
                    <li><h6 class="dropdown-header">Manage Account</h6></li>
                    <li><a class="dropdown-item" href="{{ url('/profile') }}"><i class="bi bi-person me-2"></i>My Profile</a></li>
                    <li><a class="dropdown-item" href="{{ url('/settings') }}"><i class="bi bi-gear me-2"></i>Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                        <form method="POST" action="{{ route('logout') }}" id="logout-form">
                            @csrf
                            <button type="submit" class="dropdown-item text-danger d-flex align-items-center">
                                <i class="bi bi-box-arrow-right me-2"></i>Sign out
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
                    </div>
                </div>
            </nav>
            @endunless

            <div class="@unless(request()->is('/') || request()->is('welcome') || request()->is('login') || request()->is('register')) content-body @endunless">
                @yield('content')
            </div>
        </div>
    </div>

    <!-- Floating Action Button for Mobile -->
    @unless(request()->is('/') || request()->is('welcome') || request()->is('login') || request()->is('register'))
    <button class="fab-btn d-md-none" onclick="showModal('addTransactionModal')" title="Add Transaction">
        <i class="bi bi-plus-lg"></i>
    </button>

    <!-- Bottom Navigation for Mobile -->
    <nav class="bottom-nav d-md-none">
        <a href="{{ url('/dashboard') }}" class="bottom-nav-item {{ request()->is('dashboard') ? 'active' : '' }}">
            <i class="bi bi-house-door{{ request()->is('dashboard') ? '-fill' : '' }}"></i>
            <span>Home</span>
        </a>
        <a href="{{ url('/transactions') }}" class="bottom-nav-item {{ request()->is('transactions*') ? 'active' : '' }}">
            <i class="bi bi-receipt{{ request()->is('transactions*') ? '-cutoff' : '' }}"></i>
            <span>Trans</span>
        </a>
        <a href="{{ url('/budget') }}" class="bottom-nav-item {{ request()->is('budget*') ? 'active' : '' }}">
            <i class="bi bi-piggy-bank{{ request()->is('budget*') ? '-fill' : '' }}"></i>
            <span>Budget</span>
        </a>
        
        <div class="bottom-nav-spacer"></div>
        
        <a href="{{ url('/analytics') }}" class="bottom-nav-item {{ request()->is('analytics*') ? 'active' : '' }}">
            <i class="bi bi-bar-chart{{ request()->is('analytics*') ? '-fill' : '' }}"></i>
            <span>Charts</span>
        </a>
        <a href="{{ url('/profile') }}" class="bottom-nav-item {{ request()->is('profile*') ? 'active' : '' }}">
            <i class="bi bi-person{{ request()->is('profile*') ? '-badge-fill' : '' }}"></i>
            <span>Profile</span>
        </a>
        <a href="javascript:void(0)" class="bottom-nav-item" onclick="cycleTheme()">
            <i class="bi bi-palette"></i>
            <span>Theme</span>
        </a>
    </nav>
    @endunless

    <!-- Global Add Transaction Modal -->
    <div class="modal fade" id="addTransactionModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title">Add Transaction</h5>
                        <p class="text-muted mb-0" style="font-size: 14px;">Create a new income or expense transaction</p>
                    </div>
                    <button type="button" class="btn-close" onclick="hideModal('addTransactionModal')"></button>
                </div>
                <div class="modal-body">
                    <form id="transactionForm">
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input type="text" class="form-control" id="transactionTitle" required placeholder="What was it for?">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Amount</label>
                            <input type="number" class="form-control" id="transactionAmount" step="0.01" required placeholder="0.00">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Type</label>
                            <select class="form-select" id="transactionType" required>
                                <option value="expense" selected>Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-select" id="transactionCategory" required>
                                <option value="" selected disabled>Select category</option>
                                <option value="Food">Food</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Bills">Bills</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Date</label>
                            <input type="date" class="form-control" id="transactionDate" required value="{{ date('Y-m-d') }}">
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Add Transaction</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toast" class="toast" role="alert">
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body" id="toastBody"></div>
        </div>
    </div>

    <!-- Bootstrap JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Main JS -->
    <script src="{{ asset('js/script.js') }}"></script>
    <script>
        // Sync Laravel Auth with LocalStorage for script.js compatibility
        @auth
            const laravelUser = @json(Auth::user());
            if (laravelUser) {
                const currentProfile = localStorage.getItem('financeTracker_profile');
                let needsUpdate = true;
                
                if (currentProfile) {
                    try {
                        const parsed = JSON.parse(currentProfile);
                        if (parsed.email === laravelUser.email) {
                            needsUpdate = false;
                        }
                    } catch(e) {}
                }

                if (needsUpdate) {
                    console.log('Syncing Laravel user to LocalStorage profile...');
                    localStorage.setItem('financeTracker_profile', JSON.stringify({
                        name: laravelUser.name,
                        email: laravelUser.email,
                        id: laravelUser.id
                    }));
                    // Force reload logic if key changed
                    if (window.refreshData) window.refreshData();
                }
            }
        @endauth
        
        // Clear profile on logout to ensure next user is isolated
        const logoutForm = document.getElementById('logout-form');
        if (logoutForm) {
            logoutForm.addEventListener('submit', () => {
                localStorage.removeItem('financeTracker_profile');
            });
        }
        
        // Sidebar Toggle for Tablet/Medium Screens
        document.addEventListener('DOMContentLoaded', function() {
            const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
            const sidebar = document.querySelector('.sidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            
            if (sidebar && sidebarToggles.length > 0) {
                sidebarToggles.forEach(toggle => {
                    toggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        sidebar.classList.toggle('active');
                        if (sidebarOverlay) {
                            sidebarOverlay.classList.toggle('active');
                        }
                        // Prevent body scroll when sidebar is open on responsive screens
                        if (sidebar.classList.contains('active')) {
                            document.body.style.overflow = 'hidden';
                        } else {
                            document.body.style.overflow = '';
                        }
                    });
                });
                
                // Close sidebar when clicking overlay
                if (sidebarOverlay) {
                    sidebarOverlay.addEventListener('click', function() {
                        sidebar.classList.remove('active');
                        sidebarOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }
                
                // Close sidebar when clicking any navigation link (on tablet/mobile)
                const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav-link');
                sidebarLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        if (window.innerWidth < 1024) {
                            sidebar.classList.remove('active');
                            if (sidebarOverlay) {
                                sidebarOverlay.classList.remove('active');
                            }
                            document.body.style.overflow = '';
                        }
                    });
                });
            }
        });
        // Initialize Dropdowns manually as a fallback
        document.addEventListener('DOMContentLoaded', function() {
            // Standard Bootstrap initialization
            var dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'))
            var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
                return new bootstrap.Dropdown(dropdownToggleEl)
            });

            // Ensure dropdowns close when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                        menu.classList.remove('show');
                    });
                }
            });
        });
    </script>
    @stack('scripts')
</body>
</html>
