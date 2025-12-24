@extends('layouts.app')

@section('title', 'Welcome - FinanceTracker')

@section('content')
    <!-- Navigation for Landing Page -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-white bg-opacity-75 backdrop-blur-md shadow-sm">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center fw-bold" href="#">
                <i class="bi bi-clock text-primary me-2"></i>
                FinanceTracker
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#landingNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="landingNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link fw-medium" href="{{ route('login') }}">Sign In</a>
                    </li>
                    <li class="nav-item ms-lg-3">
                        <a class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm" href="{{ route('register') }}">Join Now</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section position-relative overflow-hidden pt-5 mt-5">
        <div class="absolute-bg-gradient"></div>
        <div class="container position-relative z-1">
            <div class="row align-items-center min-vh-100">
                <div class="col-lg-6 animate__animated animate__fadeInLeft">
                    <div class="hero-content">
                        <span class="badge bg-primary-soft text-primary mb-3 px-3 py-2 rounded-pill fw-bold">#1 Personal Finance App</span>
                        <h1 class="display-3 fw-bold mb-4 lh-tight">
                            Master Your Money <br/>
                            <span class="text-gradient">Build Your Future</span>
                        </h1>
                        <p class="lead mb-5 text-muted hero-description pe-lg-5">
                            Stop wondering where your money goes. Track expenses, stick to budgets, and achieve your financial freedom with FinanceTracker.
                        </p>
                        
                        <div class="d-flex text-center flex-column flex-sm-row gap-3 mb-5">
                            <a href="{{ route('register') }}" class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg hover-scale fw-bold">
                                <i class="bi bi-rocket-takeoff me-2"></i>Get Started Free
                            </a>
                            <a href="{{ route('login') }}" class="btn btn-white btn-lg px-5 py-3 rounded-pill shadow-sm hover-scale border fw-medium bg-white">
                                <i class="bi bi-play-circle me-2"></i>Live Demo
                            </a>
                        </div>

                        <div class="features-list">
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center p-3 rounded bg-white shadow-sm border h-100">
                                        <div class="icon-square bg-green-soft text-success me-3 rounded p-2">
                                            <i class="bi bi-graph-up-arrow fs-5"></i>
                                        </div>
                                        <span class="fw-medium">Real-time Analytics</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center p-3 rounded bg-white shadow-sm border h-100">
                                        <div class="icon-square bg-purple-soft text-primary me-3 rounded p-2">
                                            <i class="bi bi-shield-check fs-5"></i>
                                        </div>
                                        <span class="fw-medium">Secure & Private</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 mt-5 mt-lg-0 animate__animated animate__fadeInRight">
                    <div class="hero-image position-relative">
                        <!-- Decorative shapes -->
                        <div class="shape-blob shape-blob-1"></div>
                        <div class="shape-blob shape-blob-2"></div>
                        
                        <div class="dashboard-preview perspective-container">
                            <div class="preview-card bg-white rounded-4 shadow-xl border overflow-hidden transform-rotate-y">
                                <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="circle bg-danger rounded-circle" style="width:12px;height:12px;"></div>
                                        <div class="circle bg-warning rounded-circle" style="width:12px;height:12px;"></div>
                                        <div class="circle bg-success rounded-circle" style="width:12px;height:12px;"></div>
                                    </div>
                                    <div class="text-muted small fw-bold">FinanceTracker Dashboard</div>
                                </div>
                                <div class="card-body p-4 bg-light">
                                    <!-- Fake UI Content -->
                                    <div class="row g-3 mb-4">
                                        <div class="col-6">
                                            <div class="bg-white p-3 rounded-3 shadow-sm">
                                                <small class="text-muted d-block mb-1">Total Balance</small>
                                                <h4 class="fw-bold mb-0 text-primary">$24,500.00</h4>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="bg-white p-3 rounded-3 shadow-sm">
                                                <small class="text-muted d-block mb-1">Monthly Saving</small>
                                                <h4 class="fw-bold mb-0 text-success">+$2,100.00</h4>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white p-3 rounded-3 shadow-sm mb-3">
                                        <div class="d-flex justify-content-between mb-3">
                                            <span class="fw-bold">Spending Analysis</span>
                                            <span class="text-muted small">This Week</span>
                                        </div>
                                        <div class="progress mb-2" style="height: 8px;">
                                            <div class="progress-bar bg-primary" style="width: 65%"></div>
                                        </div>
                                        <div class="d-flex justify-content-between small text-muted">
                                            <span>Spending</span>
                                            <span>65% of budget</span>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white p-3 rounded-3 shadow-sm">
                                        <div class="d-flex align-items-center justify-content-between p-2 mb-2 border-bottom">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-primary-soft p-2 rounded me-3 text-primary"><i class="bi bi-cart"></i></div>
                                                <div>
                                                    <div class="fw-bold small">Grocery Store</div>
                                                    <div class="text-muted x-small">Today, 10:42 AM</div>
                                                </div>
                                            </div>
                                            <div class="text-danger fw-bold">-$124.50</div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between p-2">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-success-soft p-2 rounded me-3 text-success"><i class="bi bi-briefcase"></i></div>
                                                <div>
                                                    <div class="fw-bold small">Upwork Freelance</div>
                                                    <div class="text-muted x-small">Yesterday</div>
                                                </div>
                                            </div>
                                            <div class="text-success fw-bold">+$480.00</div>
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
                    <a href="{{ url('/dashboard') }}" class="btn btn-primary btn-lg px-5">Start Free Demo</a>
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
@endsection