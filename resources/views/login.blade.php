<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication - FinanceTracker</title>
    <!-- Bootstrap & Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <script src="{{ asset('js/theme.js') }}"></script>
    <style>
        .auth-container {
            min-height: 100vh;
            background: var(--bg-body);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
            transition: background 0.5s ease;
        }

        .auth-blob {
            position: absolute;
            width: 500px;
            height: 500px;
            background: rgba(79, 209, 197, 0.1);
            filter: blur(80px);
            border-radius: 50%;
            z-index: 0;
        }

        .auth-blob-1 { top: -100px; right: -100px; }
        .auth-blob-2 { bottom: -100px; left: -100px; background: rgba(99, 102, 241, 0.1); }

        .auth-card {
            width: 100%;
            max-width: 450px;
            background: var(--bg-card);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            box-shadow: var(--shadow-lg);
            padding: 40px;
            position: relative;
            z-index: 1;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .auth-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-xl);
        }

        .auth-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .auth-logo {
            width: 64px;
            height: 64px;
            background: var(--primary-color);
            color: white;
            border-radius: 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin-bottom: 20px;
            box-shadow: 0 10px 20px rgba(79, 209, 197, 0.3);
        }

        .auth-nav {
            display: flex;
            background: var(--bg-secondary);
            padding: 5px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 1px solid var(--border-color);
        }

        .auth-nav-btn {
            flex: 1;
            border: none;
            background: transparent;
            padding: 10px;
            font-weight: 600;
            color: var(--text-secondary);
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .auth-nav-btn.active {
            background: var(--bg-card);
            color: var(--primary-color);
            box-shadow: var(--shadow-sm);
        }

        .form-label {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.9rem;
        }

        .form-control {
            background-color: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 12px;
            padding: 12px 16px;
            transition: all 0.2s ease;
            font-size: 1rem;
            color: var(--text-primary);
        }

        .form-control:focus {
            background-color: var(--bg-card);
            border-color: var(--primary-color);
            box-shadow: 0 0 0 4px var(--primary-light);
            color: var(--text-primary);
        }

        .btn-primary {
            padding: 14px;
            border-radius: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            background-color: var(--primary-color);
            border: none;
        }

        .btn-primary:hover {
            background-color: var(--primary-hover);
            transform: translateY(-2px);
        }

        #loginForm, #signupForm {
            transition: all 0.3s ease;
        }

        .animate-in {
            animation: fadeInScale 0.4s ease-out forwards;
        }

        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .demo-badge {
            cursor: pointer;
            transition: all 0.2s ease;
            background-color: var(--bg-secondary);
            border: 1px solid var(--border-color);
        }
        .demo-badge:hover {
            opacity: 0.8;
            transform: scale(1.02);
            background-color: var(--primary-light);
        }
        
        .theme-toggle-fixed {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
    </style>
</head>
<body class="theme-light">
    <!-- Theme Toggle -->
    <div class="theme-toggle-fixed">
                <button class="btn btn-link text-primary rounded-circle p-2 me-2 theme-toggle-btn" onclick="toggleTheme()" title="Toggle Theme">
                    <i class="bi bi-moon-stars-fill dark-icon"></i>
                    <i class="bi bi-sun-fill light-icon"></i>
                </button>
    </div>

    <div class="auth-container">
        <div class="auth-blob auth-blob-1"></div>
        <div class="auth-blob auth-blob-2"></div>

        <div class="auth-card shadow-lg">
            <div class="auth-header">
                <div class="auth-logo">
                    <i class="bi bi-clock-fill"></i>
                </div>
                <h3 class="fw-bold mb-1" style="color: var(--text-primary);">FinanceTracker</h3>
                <p class="small" style="color: var(--text-secondary);">Master your money, build your future</p>
            </div>

            <div class="auth-nav">
                <button class="auth-nav-btn active" onclick="switchAuth('login')">Sign In</button>
                <button class="auth-nav-btn" onclick="switchAuth('signup')">Sign Up</button>
            </div>

            <!-- Login Form -->
            <div id="loginSection" class="animate-in">
                <form id="loginForm">
                    <div class="mb-3">
                        <label class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="loginEmail" placeholder="name@example.com" required>
                    </div>
                    <div class="mb-4">
                        <div class="d-flex justify-content-between">
                            <label class="form-label">Password</label>
                            <a href="#" class="small text-decoration-none text-primary">Forgot?</a>
                        </div>
                        <input type="password" class="form-control" id="loginPassword" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 shadow-sm">
                        Sign In <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                </form>

                <div class="mt-4 pt-3 border-top" style="border-color: var(--border-color) !important;">
                    <div class="p-3 rounded-4 demo-badge" id="demoAction">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                                <i class="bi bi-person-badge-fill"></i>
                            </div>
                            <div>
                                <div class="fw-bold small" style="color: var(--text-primary);">Demo Account</div>
                                <div class="extra-small" style="font-size: 11px; color: var(--text-secondary);">Click to auto-fill credentials</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Signup Form (Hidden by default) -->
            <div id="signupSection" style="display: none;">
                <form id="signupForm">
                    <div class="mb-3">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="signupName" placeholder="Enter your name" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="signupEmail" placeholder="name@example.com" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" id="signupPassword" placeholder="Min. 8 characters" required>
                    </div>
                    <div class="mb-4 form-check">
                        <input type="checkbox" class="form-check-input" id="terms" required>
                        <label class="form-check-label small" for="terms" style="color: var(--text-secondary);">
                            I agree to the <a href="#" class="text-decoration-none text-primary">Terms & Conditions</a>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 shadow-sm">
                        Create Account <i class="bi bi-person-plus ms-2"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function switchAuth(type) {
            const loginSection = document.getElementById('loginSection');
            const signupSection = document.getElementById('signupSection');
            const btns = document.querySelectorAll('.auth-nav-btn');

            if (type === 'login') {
                loginSection.style.display = 'block';
                signupSection.style.display = 'none';
                loginSection.classList.add('animate-in');
                btns[0].classList.add('active');
                btns[1].classList.remove('active');
            } else {
                loginSection.style.display = 'none';
                signupSection.style.display = 'block';
                signupSection.classList.add('animate-in');
                btns[0].classList.remove('active');
                btns[1].classList.add('active');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Handle active tab from URL if needed (e.g. ?tab=signup)
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('type') === 'signup' || window.location.pathname.includes('register')) {
                switchAuth('signup');
            }

            // Demo logic
            document.getElementById('demoAction').addEventListener('click', () => {
                document.getElementById('loginEmail').value = 'demo@financetracker.com';
                document.getElementById('loginPassword').value = 'demo123';
            });

            // Form Submissions
            document.getElementById('loginForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const btn = e.target.querySelector('button[type="submit"]');
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
                btn.disabled = true;

                // Save user info for session identity
                const profileData = { name: email.split('@')[0], email: email };
                localStorage.setItem('financeTracker_profile', JSON.stringify(profileData));

                setTimeout(() => window.location.href = "{{ url('/dashboard') }}", 800);
            });

            document.getElementById('signupForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('signupName').value;
                const btn = e.target.querySelector('button[type="submit"]');
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
                btn.disabled = true;
                
                // Save name to localStorage for sidebar
                const profileData = { name: name, email: document.getElementById('signupEmail').value };
                localStorage.setItem('financeTracker_profile', JSON.stringify(profileData));
                
                setTimeout(() => window.location.href = "{{ url('/dashboard') }}", 1000);
            });
        });
    </script>
</body>
</html>
