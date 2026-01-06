<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'FinanceTracker')</title>
    
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
        <div class="main-content" @if(request()->is('/') || request()->is('welcome') || request()->is('login') || request()->is('register')) style="margin-left: 0; padding: 0;" @endif>
            
            @unless(request()->is('/') || request()->is('welcome') || request()->is('login') || request()->is('register'))
            <!-- Dashboard Header -->
            <nav class="navbar navbar-expand bg-white border-bottom py-2 py-md-3 mb-4 sticky-top">
                <div class="container-fluid px-2 px-md-4">
                    <div class="d-flex align-items-center flex-grow-1 flex-md-grow-0">
                        <!-- Integrated Mobile Toggle -->
                        <button class="mobile-menu-btn me-3" id="mobileMenuBtn">
                            <i class="bi bi-list"></i>
                        </button>
                        <h4 class="mb-0 fw-bold fs-5 fs-md-4">@yield('page_title', 'Overview')</h4>
                    </div>
                    
                    <div class="d-flex align-items-center gap-2 gap-md-3">
                         <!-- Theme Toggle -->
                         <button class="btn btn-light rounded-circle p-2" onclick="toggleTheme()" title="Toggle Theme">
                             <i class="bi bi-moon"></i>
                         </button>
                         
                         <!-- User Profile Dropdown -->
                         <div class="dropdown">
                            <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle text-dark" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-0 me-sm-2" style="width: 36px; height: 36px;">
                                    <i class="bi bi-person-fill fs-5"></i>
                                </div>
                                <span class="d-none d-sm-inline fw-semibold" id="headerUserName">User</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="{{ url('/profile') }}"><i class="bi bi-person me-2"></i>Profile</a></li>
                                <li><a class="dropdown-item" href="{{ url('/settings') }}"><i class="bi bi-gear me-2"></i>Settings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <form method="POST" action="{{ route('logout') }}" id="logout-form">
                                        @csrf
                                        <button type="submit" class="dropdown-item text-danger"><i class="bi bi-box-arrow-right me-2"></i>Sign out</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            @endunless

            @yield('content')
        </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toast" class="toast" role="alert">
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body"></div>
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
    </script>
    @stack('scripts')
</body>
</html>
