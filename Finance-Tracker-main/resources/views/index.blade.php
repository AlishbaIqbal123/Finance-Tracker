<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FinanceTracker - Personal Finance Management</title>
    <meta name="description" content="Simple and elegant personal finance tracker to manage your income, expenses, and budgets. Can add your income, then can keep track of transactions, budgets etc. helpful in managing the financial life">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body class="landing-page">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <div class="logo-container me-2">
                    <i class="bi bi-piggy-bank-fill theme-icon light-icon" style="font-size: 1.5rem;"></i>
                    <i class="bi bi-piggy-bank theme-icon dark-icon" style="font-size: 1.5rem; display: none;"></i>
                </div>
                <span class="fw-bold">FinanceTracker</span>
            </a>
            <div class="d-flex align-items-center">
                <!-- Theme Toggle -->
                <div class="theme-toggle me-3">
                    <button id="themeToggle" class="btn btn-sm btn-outline-secondary rounded-circle p-2">
                        <i class="bi bi-sun theme-icon light-icon"></i>
                        <i class="bi bi-moon theme-icon dark-icon" style="display: none;"></i>
                    </button>
                </div>
                <div class="navbar-nav">
                    <a href="{{ route('login') }}" class="btn btn-outline-primary me-2">Login</a>
                    <a href="{{ url('/dashboard') }}" class="btn btn-primary">Get Started</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="row align-items-center min-vh-100">
                <div class="col-lg-6">
                    <div class="hero-content">
                        <h1 class="display-4 fw-bold mb-4">Take Control of Your <span class="text-accent">Financial Life</span></h1>
                        <p class="lead mb-4 hero-description">Simple and elegant personal finance tracker to manage your income, expenses, and budgets. Gain insights into your spending habits and achieve your financial goals with our intuitive platform.</p>
                        
                        <div class="d-flex gap-3 mb-5">
                            <a href="{{ url('/dashboard') }}" class="btn btn-primary btn-lg px-4">
                                <i class="bi bi-play-circle me-2"></i>Try Demo
                            </a>
                            <a href="{{ route('login') }}" class="btn btn-outline-light btn-lg px-4">
                                <i class="bi bi-person-circle me-2"></i>Sign In
                            </a>
                        </div>

                        <div class="features-list">
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                                        <span>Track Income & Expenses</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                                        <span>Budget Management</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                                        <span>Visual Analytics</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                                        <span>Mobile Responsive</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="hero-image">
                        <div class="dashboard-preview">
                            <div class="preview-card">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h6 class="mb-0">Dashboard Overview</h6>
                                    <i class="bi bi-house-fill text-primary"></i>
                                </div>
                                <div class="card-body">
                                    <div class="row g-3">
                                        <div class="col-4">
                                            <div class="stat-card bg-success bg-opacity-10">
                                                <div class="stat-value text-success">$20,000</div>
                                                <div class="stat-label">Income</div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="stat-card bg-danger bg-opacity-10">
                                                <div class="stat-value text-danger">$500</div>
                                                <div class="stat-label">Expenses</div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="stat-card bg-primary bg-opacity-10">
                                                <div class="stat-value text-primary">$19,500</div>
                                                <div class="stat-label">Balance</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-4">
                                        <div class="d-flex justify-content-between mb-2">
                                            <span class="text-muted">Food</span>
                                            <span>$150</span>
                                        </div>
                                        <div class="progress mb-3">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: 30%"></div>
                                        </div>
                                        
                                        <div class="d-flex justify-content-between mb-2">
                                            <span class="text-muted">Transport</span>
                                            <span>$80</span>
                                        </div>
                                        <div class="progress mb-3">
                                            <div class="progress-bar bg-info" role="progressbar" style="width: 16%"></div>
                                        </div>
                                        
                                        <div class="d-flex justify-content-between mb-2">
                                            <span class="text-muted">Entertainment</span>
                                            <span>$120</span>
                                        </div>
                                        <div class="progress">
                                            <div class="progress-bar bg-warning" role="progressbar" style="width: 24%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="fw-bold">How FinanceTracker Works</h2>
                    <p class="text-muted">Simple steps to take control of your finances</p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-md-3">
                    <div class="how-it-works-card text-center p-4">
                        <div class="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 50px; height: 50px;">
                            1
                        </div>
                        <h5>Record Transactions</h5>
                        <p class="text-muted">Add your income and expenses with just a few clicks</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="how-it-works-card text-center p-4">
                        <div class="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 50px; height: 50px;">
                            2
                        </div>
                        <h5>Set Budgets</h5>
                        <p class="text-muted">Create budgets for different spending categories</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="how-it-works-card text-center p-4">
                        <div class="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 50px; height: 50px;">
                            3
                        </div>
                        <h5>Track Progress</h5>
                        <p class="text-muted">Monitor your spending against your budgets</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="how-it-works-card text-center p-4">
                        <div class="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 50px; height: 50px;">
                            4
                        </div>
                        <h5>Gain Insights</h5>
                        <p class="text-muted">Understand your financial habits with visual reports</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="fw-bold">Everything You Need to Manage Your Finances</h2>
                    <p class="text-muted">Powerful features to help you take control of your money</p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon">
                            <i class="bi bi-graph-up"></i>
                        </div>
                        <h5>Transaction Tracking</h5>
                        <p class="text-muted">Add, edit, and delete income and expense transactions with full categorization.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon">
                            <i class="bi bi-piggy-bank"></i>
                        </div>
                        <h5>Budget Management</h5>
                        <p class="text-muted">Create and manage budgets for different categories with progress tracking.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon">
                            <i class="bi bi-bar-chart"></i>
                        </div>
                        <h5>Financial Analytics</h5>
                        <p class="text-muted">Visualize your spending patterns with interactive charts and reports.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon">
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <h5>Currency Support</h5>
                        <p class="text-muted">Track finances in multiple currencies with PKR as default and real-time conversion.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon">
                            <i class="bi bi-palette"></i>
                        </div>
                        <h5>Theme Customization</h5>
                        <p class="text-muted">Choose from 7 beautiful themes including light and dark modes for your preference.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center">
                        <div class="feature-icon">
                            <i class="bi bi-phone"></i>
                        </div>
                        <h5>Fully Responsive</h5>
                        <p class="text-muted">Works perfectly on desktop, tablet, and mobile devices for anytime access.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Testimonials -->
    <section class="testimonials-section py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="fw-bold">What Our Friends Are Saying</h2>
                    <p class="text-muted">Join Minahil, Urooj, Eman, Zarah and others managing their finances with FinanceTracker</p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="testimonial-card p-4">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                M
                            </div>
                            <div>
                                <h6 class="mb-0">Minahil</h6>
                                <small class="text-muted">Software Engineering Student</small>
                            </div>
                        </div>
                        <p class="text-muted">"As a software engineering student, FinanceTracker helps me manage my project expenses and personal budget. The analytics feature is incredibly helpful!"</p>
                        <div class="rating text-warning">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="testimonial-card p-4">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                U
                            </div>
                            <div>
                                <h6 class="mb-0">Urooj</h6>
                                <small class="text-muted">Software Engineering Student</small>
                            </div>
                        </div>
                        <p class="text-muted">"Managing tuition fees and daily expenses was stressful. FinanceTracker makes it easy to track where every rupee goes with its intuitive interface."</p>
                        <div class="rating text-warning">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="testimonial-card p-4">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                E
                            </div>
                            <div>
                                <h6 class="mb-0">Eman</h6>
                                <small class="text-muted">Software Engineering Student</small>
                            </div>
                        </div>
                        <p class="text-muted">"As a software engineering student, FinanceTracker helps me learn budgeting while managing my coursework expenses. The clean interface makes it easy to understand my spending patterns!"</p>
                        <div class="rating text-warning">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-half"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="testimonial-card p-4">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                Z
                            </div>
                            <div>
                                <h6 class="mb-0">Zarah</h6>
                                <small class="text-muted">Full Stack Engineer</small>
                            </div>
                        </div>
                        <p class="text-muted">"As a full stack engineer, I appreciate the robust architecture and clean API design. FinanceTracker's codebase is well-structured and easy to extend for custom features!"</p>
                        <div class="rating text-warning">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- CTA Section -->
    <section class="cta-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="fw-bold mb-3">Ready to Take Control?</h2>
                    <p class="lead mb-4">Start managing your finances today with our simple and powerful tools.</p>
                    <a href="{{ url('/dashboard') }}" class="btn btn-light btn-lg px-5">Start Free Demo</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 bg-white border-top">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center text-md-start">
                    <p class="mb-0">&copy; 2025 FinanceTracker. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <a href="#" class="text-decoration-none text-muted me-3">Privacy Policy</a>
                    <a href="#" class="text-decoration-none text-muted">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Theme Switcher Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.getElementById('themeToggle');
            const htmlElement = document.documentElement;
            const bodyElement = document.body;
            const lightIcons = document.querySelectorAll('.light-icon');
            const darkIcons = document.querySelectorAll('.dark-icon');
            
            // Check for saved theme or default to light
            let savedTheme = localStorage.getItem('theme');
            
            // If no saved theme, check system preference
            if (!savedTheme) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                savedTheme = prefersDark ? 'dark' : 'light';
            }
            
            // Apply the theme immediately
            setTheme(savedTheme);
            
            // Toggle theme on button click
            themeToggle.addEventListener('click', function() {
                const currentTheme = htmlElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
            
            function setTheme(theme) {
                // Apply theme to both html and body elements
                htmlElement.setAttribute('data-theme', theme);
                bodyElement.setAttribute('data-theme', theme);
                
                // Also add class for easier CSS targeting
                if (theme === 'dark') {
                    htmlElement.classList.add('dark-mode');
                    htmlElement.classList.remove('light-mode');
                    bodyElement.classList.add('dark-mode');
                    bodyElement.classList.remove('light-mode');
                    
                    lightIcons.forEach(icon => {
                        icon.style.display = 'none';
                    });
                    darkIcons.forEach(icon => {
                        icon.style.display = 'inline-block';
                    });
                } else {
                    htmlElement.classList.add('light-mode');
                    htmlElement.classList.remove('dark-mode');
                    bodyElement.classList.add('light-mode');
                    bodyElement.classList.remove('dark-mode');
                    
                    lightIcons.forEach(icon => {
                        icon.style.display = 'inline-block';
                    });
                    darkIcons.forEach(icon => {
                        icon.style.display = 'none';
                    });
                }
                
                // Dispatch a custom event for other scripts to listen to
                window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
            }
        });
    </script>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>