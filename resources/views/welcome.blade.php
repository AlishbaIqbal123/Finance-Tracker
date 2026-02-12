@extends('layouts.app')

@section('title', 'Welcome - FinanceTracker')

@section('content')
    <!-- Navigation for Landing Page -->
    <nav class="navbar navbar-expand-lg fixed-top backdrop-blur-md shadow-sm transition-all" id="landingNavbar">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center fw-bold" href="#">
                <i class="bi bi-clock-fill text-primary me-2 fs-3"></i>
                <span class="brand-text">FinanceTracker</span>
            </a>
            <div class="d-flex align-items-center order-lg-3 gap-2">
                <!-- Theme Toggle -->
                <button class="btn btn-theme-toggle rounded-circle p-2 me-2" onclick="toggleTheme()" title="Toggle Theme">
                    <i class="bi bi-moon theme-icon"></i>
                </button>
                @auth
                    <a href="{{ url('/dashboard') }}" class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">Dashboard</a>
                    <form method="POST" action="{{ route('logout') }}" class="d-inline">
                        @csrf
                        <button type="submit" class="nav-link fw-medium d-none d-sm-block ms-3 theme-text border-0 bg-transparent">Sign Out</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="nav-link fw-medium d-none d-sm-block me-3 theme-text">Sign In</a>
                    <a class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm" href="{{ route('register') }}">Join Now</a>
                @endauth
            </div>
            
            <div class="collapse navbar-collapse justify-content-center d-none d-lg-flex" id="landingNav">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item mx-2">
                        <a class="nav-link fw-medium" href="#features">Features</a>
                    </li>
                    <li class="nav-item mx-2">
                        <a class="nav-link fw-medium" href="#how-it-works">How it Works</a>
                    </li>
                    <li class="nav-item mx-2">
                        <a class="nav-link fw-medium" href="#testimonials">Reviews</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section position-relative overflow-hidden pt-5 mt-5">
        <div class="absolute-bg-gradient"></div>
        <div class="container position-relative z-1">
            <div class="row align-items-center min-vh-100 py-5">
                <div class="col-lg-6 animate__animated animate__fadeInLeft">
                    <div class="hero-content">
                        <span class="badge bg-primary-soft text-primary mb-3 px-3 py-2 rounded-pill fw-bold">
                            <i class="bi bi-stars me-1"></i> #1 Personal Finance App
                        </span>
                        <h1 class="display-3 fw-bold mb-4 lh-tight">
                            Master Your Money <br/>
                            <span class="text-gradient">Build Your Future</span>
                        </h1>
                        <p class="lead mb-5 hero-description pe-lg-5">
                            Stop wondering where your money goes. Track expenses, stick to budgets, and achieve your financial freedom with FinanceTracker.
                        </p>
                        
                        <div class="d-flex flex-column flex-sm-row gap-3 mb-5">
                            @auth
                                <a href="{{ url('/dashboard') }}" class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg hover-scale fw-bold">
                                    <i class="bi bi-speedometer2 me-2"></i>Go to Dashboard
                                </a>
                                <a href="{{ url('/transactions') }}" class="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm hover-scale fw-medium">
                                    <i class="bi bi-receipt me-2"></i>My Transactions
                                </a>
                            @else
                                <a href="{{ route('register') }}" class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg hover-scale fw-bold">
                                    <i class="bi bi-rocket-takeoff me-2"></i>Get Started Free
                                </a>
                                <a href="{{ url('/dashboard') }}" class="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm hover-scale fw-medium">
                                    <i class="bi bi-play-circle me-2"></i>Live Demo
                                </a>
                            @endauth
                        </div>

                        <div class="features-list">
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center p-3 rounded-4 bg-card border shadow-sm h-100 hover-up">
                                        <div class="icon-square bg-green-soft text-success me-3 rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;">
                                            <i class="bi bi-graph-up-arrow fs-5"></i>
                                        </div>
                                        <span class="fw-bold">Real-time Analytics</span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center p-3 rounded-4 bg-card border shadow-sm h-100 hover-up">
                                        <div class="icon-square bg-purple-soft text-primary me-3 rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;">
                                            <i class="bi bi-shield-check fs-5"></i>
                                        </div>
                                        <span class="fw-bold">Secure & Private</span>
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
                            <div class="preview-card bg-card rounded-4 shadow-xl border overflow-hidden transform-rotate-y">
                                <div class="card-header border-bottom p-4 d-flex justify-content-between align-items-center bg-card">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="circle bg-danger rounded-circle" style="width:12px;height:12px;"></div>
                                        <div class="circle bg-warning rounded-circle" style="width:12px;height:12px;"></div>
                                        <div class="circle bg-success rounded-circle" style="width:12px;height:12px;"></div>
                                    </div>
                                    <div class="text-secondary small fw-bold">FinanceTracker Dashboard</div>
                                </div>
                                <div class="card-body p-4 bg-secondary">
                                    <!-- Fake UI Content -->
                                    <div class="row g-3 mb-4">
                                        <div class="col-6">
                                            <div class="bg-card p-3 rounded-3 shadow-sm border">
                                                <small class="text-secondary d-block mb-1">Total Balance</small>
                                                <h4 class="fw-bold mb-0 text-primary">$24,500.00</h4>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="bg-card p-3 rounded-3 shadow-sm border">
                                                <small class="text-secondary d-block mb-1">Monthly Saving</small>
                                                <h4 class="fw-bold mb-0 text-success">+$2,100.00</h4>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-card p-3 rounded-3 shadow-sm mb-3 border">
                                        <div class="d-flex justify-content-between mb-3">
                                            <span class="fw-bold">Spending Analysis</span>
                                            <span class="text-secondary small">This Week</span>
                                        </div>
                                        <div class="progress mb-2" style="height: 8px;">
                                            <div class="progress-bar bg-primary" style="width: 65%"></div>
                                        </div>
                                        <div class="d-flex justify-content-between small text-secondary">
                                            <span>Spending</span>
                                            <span>65% of budget</span>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-card p-3 rounded-3 shadow-sm border">
                                        <div class="d-flex align-items-center justify-content-between p-2 mb-2 border-bottom">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-primary-soft p-2 rounded me-3 text-primary"><i class="bi bi-cart"></i></div>
                                                <div>
                                                    <div class="fw-bold small">Grocery Store</div>
                                                    <div class="text-secondary x-small">Today, 10:42 AM</div>
                                                </div>
                                            </div>
                                            <div class="text-danger fw-bold">-$124.50</div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between p-2">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-success-soft p-2 rounded me-3 text-success"><i class="bi bi-briefcase"></i></div>
                                                <div>
                                                    <div class="fw-bold small">Upwork Freelance</div>
                                                    <div class="text-secondary x-small">Yesterday</div>
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
    <section id="how-it-works" class="how-it-works py-5 bg-secondary border-top border-bottom">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="fw-bold display-5">How It Works</h2>
                    <p class="text-secondary lead">Three simple steps to financial clarity</p>
                </div>
            </div>
            <div class="row g-4 text-center">
                <div class="col-md-4">
                    <div class="how-it-works-card p-4 rounded-4 hover-up h-100 bg-card shadow-sm border">
                        <div class="step-icon mb-4">
                            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-lg" style="width: 70px; height: 70px; font-size: 1.5rem;">
                                <i class="bi bi-plus-lg"></i>
                            </div>
                        </div>
                        <h4 class="fw-bold">1. Track</h4>
                        <p class="text-secondary">Log your income and expenses effortlessly as they happen.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="how-it-works-card p-4 rounded-4 hover-up h-100 bg-card shadow-sm border">
                        <div class="step-icon mb-4">
                            <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-lg" style="width: 70px; height: 70px; font-size: 1.5rem;">
                                <i class="bi bi-piggy-bank"></i>
                            </div>
                        </div>
                        <h4 class="fw-bold">2. Budget</h4>
                        <p class="text-secondary">Set monthly limits for categories and watch your savings grow.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="how-it-works-card p-4 rounded-4 hover-up h-100 bg-card shadow-sm border">
                        <div class="step-icon mb-4">
                            <div class="bg-info text-white rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-lg" style="width: 70px; height: 70px; font-size: 1.5rem;">
                                <i class="bi bi-pie-chart"></i>
                            </div>
                        </div>
                        <h4 class="fw-bold">3. Analyze</h4>
                        <p class="text-secondary">Get beautiful insights and reports about your financial health.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section py-5">
        <div class="container py-5">
            <div class="row justify-content-center text-center mb-5">
                <div class="col-lg-8">
                    <h2 class="fw-bold display-5 mb-3">Powerful Features</h2>
                    <p class="text-secondary lead">Everything you need to manage your money like a pro</p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="feature-card p-5 rounded-4 border h-100 hover-up bg-card shadow-lg text-center">
                        <div class="feature-icon bg-primary-soft text-primary mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            <i class="bi bi-graph-up fs-2"></i>
                        </div>
                        <h4 class="fw-bold">Smart Tracking</h4>
                        <p class="text-secondary">Automatic categorization and detailed history of all your transactions.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card p-5 rounded-4 border h-100 hover-up bg-card shadow-lg text-center">
                        <div class="feature-icon bg-success-soft text-success mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            <i class="bi bi-wallet2 fs-2"></i>
                        </div>
                        <h4 class="fw-bold">Budget Master</h4>
                        <p class="text-secondary">Set custom budgets and stay notified before you overspend.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card p-5 rounded-4 border h-100 hover-up bg-card shadow-lg text-center">
                        <div class="feature-icon bg-info-soft text-info mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            <i class="bi bi-bar-chart-line fs-2"></i>
                        </div>
                        <h4 class="fw-bold">Rich Analytics</h4>
                        <p class="text-secondary">Interactive charts and visual reports to understand your habits.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card p-5 rounded-4 border h-100 hover-up bg-card shadow-lg text-center">
                        <div class="feature-icon bg-warning-soft text-warning mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            <i class="bi bi-currency-exchange fs-2"></i>
                        </div>
                        <h4 class="fw-bold">Multi-Currency</h4>
                        <p class="text-secondary">Support for multiple currencies with PKR as your native default.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card p-5 rounded-4 border h-100 hover-up bg-card shadow-lg text-center">
                        <div class="feature-icon bg-danger-soft text-danger mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            <i class="bi bi-brush fs-2"></i>
                        </div>
                        <h4 class="fw-bold">Custom Themes</h4>
                        <p class="text-secondary">Choose from Light, Dark, Rose, Ocean, and many more beautiful themes.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card p-5 rounded-4 border h-100 hover-up bg-card shadow-lg text-center">
                        <div class="feature-icon bg-dark text-white mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            <i class="bi bi-phone fs-2"></i>
                        </div>
                        <h4 class="fw-bold">Mobile Ready</h4>
                        <p class="text-secondary">Fully responsive design that looks stunning on every device.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="testimonials-section py-5 bg-secondary">
        <div class="container py-5">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="fw-bold display-5">What Users Say</h2>
                    <p class="text-secondary lead">Join thousands of others managing their finances better</p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="testimonial-card p-4 rounded-4 bg-card shadow-sm border h-100">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar bg-primary-soft text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">Minahil</h6>
                                <small class="text-secondary">Software Engineer</small>
                            </div>
                        </div>
                        <p class="text-secondary italic">"FinanceTracker helps me manage my project expenses and personal budget effortlessly. The analytics are game-changing!"</p>
                        <div class="rating text-warning">
                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="testimonial-card p-4 rounded-4 bg-card shadow-sm border h-100">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar bg-success-soft text-success rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">Urooj</h6>
                                <small class="text-secondary">Project Manager</small>
                            </div>
                        </div>
                        <p class="text-secondary italic">"I love how easy it is to track where every rupee goes. The interface is intuitive and the budgeting works perfectly."</p>
                        <div class="rating text-warning">
                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="testimonial-card p-4 rounded-4 bg-card shadow-sm border h-100">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar bg-info-soft text-info rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">Eman</h6>
                                <small class="text-secondary">Student</small>
                            </div>
                        </div>
                        <p class="text-secondary italic">"As a student, learning to budget with this app was a breeze. The clean interface makes financial planning fun!"</p>
                        <div class="rating text-warning">
                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-5 position-relative overflow-hidden">
        <div class="bg-primary-soft position-absolute top-0 start-0 w-100 h-100" style="z-index: -1;"></div>
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-8 ps-lg-5 text-center">
                    <h2 class="fw-bold display-4 mb-3">Ready to Take Control?</h2>
                    <p class="lead mb-5 text-secondary">Start managing your finances today with our simple and powerful tools. Join 10,000+ users worldwide.</p>
                    <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
                        <a href="{{ route('register') }}" class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg hover-scale">Create Free Account</a>
                        <a href="{{ url('/dashboard') }}" class="btn btn-card btn-lg px-5 py-3 rounded-pill shadow-sm hover-scale border">Explore Demo</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-5 bg-card border-top">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <a class="navbar-brand d-flex align-items-center fw-bold mb-3" href="#">
                        <i class="bi bi-clock-fill text-primary me-2"></i>
                        <span class="brand-text">FinanceTracker</span>
                    </a>
                    <p class="text-secondary">Empowering you to make smarter financial decisions with real-time tracking and deep insights.</p>
                </div>
                <div class="col-md-2 offset-md-2">
                    <h6 class="fw-bold mb-3">Navigation</h6>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-secondary text-decoration-none">Home</a></li>
                        <li><a href="#features" class="text-secondary text-decoration-none">Features</a></li>
                        <li><a href="#testimonials" class="text-secondary text-decoration-none">Reviews</a></li>
                    </ul>
                </div>
                <div class="col-md-2">
                    <h6 class="fw-bold mb-3">Legal</h6>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-secondary text-decoration-none">Privacy Policy</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="col-md-2">
                    <h6 class="fw-bold mb-3">Social</h6>
                    <div class="d-flex gap-3">
                        <a href="#" class="text-primary fs-4"><i class="bi bi-twitter"></i></a>
                        <a href="#" class="text-primary fs-4"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="text-primary fs-4"><i class="bi bi-instagram"></i></a>
                    </div>
                </div>
            </div>
            <hr class="my-5 border-secondary opacity-25">
            <div class="row">
                <div class="col-md-12 text-center text-secondary">
                    <p class="mb-0">&copy; 2026 FinanceTracker. Designed with ❤️ for financial freedom.</p>
                </div>
            </div>
        </div>
    </footer>
@endsection

@push('styles')
<style>
    /* Mobile-First: Prevent Horizontal Scroll */
    html, body {
        overflow-x: hidden !important;
        width: 100% !important;
        max-width: 100vw !important;
        position: relative;
    }
    
    .container,
    .row {
        max-width: 100% !important;
        overflow-x: hidden !important;
    }
    
    /* Premium Landing Page - Full Theme Support */
    #landingNavbar {
        background-color: var(--card-background) !important;
        border-bottom: 1px solid var(--border-color);
        height: auto;
        min-height: 70px;
        padding: 0.5rem 0;
        width: 100%;
        max-width: 100%;
    }
    
    #landingNavbar .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    .hero-section {
        background-color: var(--background);
        padding-top: 100px;
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
    }
    
    @media (max-width: 768px) {
        .hero-section {
            padding-top: 80px;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        
        .hero-content h1 {
            font-size: 2rem !important;
        }
        
        .btn-lg {
            padding: 12px 24px !important;
            font-size: 1rem !important;
        }
    }
    
    /* Text Colors */
    .theme-text,
    .brand-text {
        color: var(--text-color) !important;
    }
    
    .nav-link {
        color: var(--text-secondary) !important;
    }
    
    .nav-link:hover {
        color: var(--primary) !important;
    }
    
    .text-gradient {
        background: linear-gradient(135deg, var(--primary), #6366f1, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    /* Hero Section */
    .hero-content h1 {
        color: var(--text-color) !important;
    }
    
    .hero-description,
    .lead {
        color: var(--text-secondary) !important;
    }
    
    /* Cards & Backgrounds */
    .bg-card,
    .feature-card,
    .how-it-works-card,
    .testimonial-card,
    .preview-card {
        background-color: var(--card-background) !important;
        border-color: var(--border-color) !important;
    }
    
    .bg-secondary {
        background-color: var(--background) !important;
    }
    
    /* Borders */
    .border,
    .border-bottom,
    .border-top {
        border-color: var(--border-color) !important;
    }
    
    /* Text Utilities */
    .text-secondary,
    small.text-secondary {
        color: var(--text-secondary) !important;
    }
    
    h1, h2, h3, h4, h5, h6,
    .fw-bold {
        color: var(--text-color) !important;
    }
    
    /* Feature Icons */
    .bg-primary-soft {
        background-color: var(--primary-light) !important;
        color: var(--primary) !important;
    }
    
    .bg-success-soft,
    .bg-green-soft {
        background-color: rgba(16, 185, 129, 0.1) !important;
        color: var(--success) !important;
    }
    
    .bg-purple-soft {
        background-color: rgba(139, 92, 246, 0.1) !important;
        color: #8b5cf6 !important;
    }
    
    .bg-info-soft {
        background-color: rgba(59, 130, 246, 0.1) !important;
        color: var(--info) !important;
    }
    
    .bg-warning-soft {
        background-color: rgba(245, 158, 11, 0.1) !important;
        color: var(--warning) !important;
    }
    
    .bg-danger-soft {
        background-color: rgba(239, 68, 68, 0.1) !important;
        color: var(--danger) !important;
    }
    
    /* Dashboard Preview */
    .preview-card .card-header {
        background-color: var(--card-background) !important;
        border-bottom-color: var(--border-color) !important;
    }
    
    .preview-card .card-body {
        background-color: var(--background) !important;
    }
    
    .preview-card .bg-card {
        background-color: var(--card-background) !important;
    }
    
    .preview-card small,
    .preview-card .small {
        color: var(--text-secondary) !important;
    }
    
    .preview-card h4 {
        color: var(--text-color) !important;
    }
    
    /* Buttons */
    .btn-card {
        background-color: var(--card-background) !important;
        color: var(--text-color) !important;
        border-color: var(--border-color) !important;
    }
    
    .btn-outline-primary {
        color: var(--primary) !important;
        border-color: var(--primary) !important;
        background-color: transparent !important;
    }
    
    .btn-outline-primary:hover {
        background-color: var(--primary) !important;
        color: white !important;
    }
    
    /* Animations */
    .hover-up {
        transition: all 0.3s ease;
    }
    
    .hover-up:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
    }
    
    /* Footer */
    footer {
        background-color: var(--card-background) !important;
        border-top-color: var(--border-color) !important;
    }
    
    footer h6 {
        color: var(--text-color) !important;
    }
    
    footer a {
        color: var(--text-secondary) !important;
    }
    
    footer a:hover {
        color: var(--primary) !important;
    }
    
    /* CTA Section */
    .cta-section h2 {
        color: var(--text-color) !important;
    }
    
    /* Progress Bars */
    .progress {
        background-color: var(--border-color) !important;
    }
    
    /* Navbar Toggler */
    .navbar-toggler {
        border-color: var(--border-color) !important;
    }
    
    .navbar-toggler-icon {
        filter: var(--text-color);
    }
</style>
@endpush