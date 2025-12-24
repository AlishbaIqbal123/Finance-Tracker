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
    <style>
        .auth-container {
            min-vh-100;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        .auth-blob {
            position: absolute;
            width: 500px;
            height: 500px;
            background: rgba(13, 110, 253, 0.1);
            filter: blur(80px);
            border-radius: 50%;
            z-index: 0;
        }

        .auth-blob-1 { top: -100px; right: -100px; }
        .auth-blob-2 { bottom: -100px; left: -100px; background: rgba(139, 92, 246, 0.1); }

        .auth-card {
            width: 100%;
            max-width: 450px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            position: relative;
            z-index: 1;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .auth-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
        }

        .auth-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .auth-logo {
            width: 64px;
            height: 64px;
            background: var(--primary-color, #0d6efd);
            color: white;
            border-radius: 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin-bottom: 20px;
            box-shadow: 0 10px 20px rgba(13, 110, 253, 0.2);
        }

        .auth-nav {
            display: flex;
            background: rgba(0, 0, 0, 0.05);
            padding: 5px;
            border-radius: 15px;
            margin-bottom: 30px;
        }

        .auth-nav-btn {
            flex: 1;
            border: none;
            background: transparent;
            padding: 10px;
            font-weight: 600;
            color: #6c757d;
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .auth-nav-btn.active {
            background: white;
            color: var(--primary-color, #0d6efd);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .form-label {
            font-weight: 600;
            color: #495057;
            font-size: 0.9rem;
        }

        .form-control {
            border: 2px solid #edeff2;
            border-radius: 12px;
            padding: 12px 16px;
            transition: all 0.2s ease;
            font-size: 1rem;
        }

        .form-control:focus {
            border-color: var(--primary-color, #0d6efd);
            box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
        }

        .btn-primary {
            padding: 14px;
            border-radius: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
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
        }
        .demo-badge:hover {
            opacity: 0.8;
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <div class="auth-blob auth-blob-1"></div>
        <div class="auth-blob auth-blob-2"></div>

        <div class="auth-card">
            <div class="auth-header">
                <div class="auth-logo">
                    <i class="bi bi-clock"></i>
                </div>
                <h3 class="fw-bold text-dark mb-1">FinanceTracker</h3>
                <p class="text-muted small">Master your money, build your future</p>
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
                            <a href="#" class="small text-decoration-none">Forgot?</a>
                        </div>
                        <input type="password" class="form-control" id="loginPassword" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 shadow-sm">
                        Sign In <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                </form>



                <div class="mt-4 pt-3 border-top">
                    <div class="bg-light p-3 rounded-3 demo-badge" id="demoAction">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-person-badge-fill text-primary fs-4 me-3"></i>
                            <div>
                                <div class="fw-bold small">Demo Account</div>
                                <div class="text-muted extra-small" style="font-size: 11px;">Click to auto-fill credentials</div>
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
                        <label class="form-check-label small text-muted" for="terms">
                            I agree to the <a href="#" class="text-decoration-none">Terms & Conditions</a>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 shadow-sm">
                        Create Account <i class="bi bi-person-plus ms-2"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
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
