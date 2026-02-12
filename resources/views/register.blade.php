<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Get Started - FinanceTracker</title>
    <!-- Bootstrap & Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}?v={{ filemtime(public_path('css/styles.css')) }}">
    <script src="{{ asset('js/theme.js') }}"></script>
    <style>
        body {
            background: var(--bg-body);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', sans-serif;
            transition: background 0.5s ease;
            position: relative;
            overflow-x: hidden;
        }

        .get-started-card {
            width: 100%;
            max-width: 800px;
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-xl);
            padding: 50px;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 1;
        }

        .step-title {
            font-weight: 800;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }

        .step-subtitle {
            color: var(--text-secondary);
            margin-bottom: 3rem;
        }

        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .menu-item {
            background: var(--bg-secondary);
            padding: 30px;
            border-radius: 20px;
            border: 2px solid var(--border-color);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .menu-item:hover {
            transform: translateY(-10px);
            border-color: var(--primary-color);
            background: var(--bg-card);
            box-shadow: var(--shadow-md);
        }

        .menu-item i {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 15px;
        }

        .menu-item h5 {
            font-weight: 700;
            margin-bottom: 5px;
            color: var(--text-primary);
        }

        .menu-item p {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin: 0;
        }

        #signupFormSection {
            display: none;
            max-width: 450px;
            margin: 0 auto;
        }

        .btn-primary {
            padding: 12px 30px;
            border-radius: 12px;
            font-weight: 700;
            background: var(--primary-color);
            border: none;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background: var(--primary-hover);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        .form-control {
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            color: var(--text-primary);
            border-radius: 12px;
        }

        .form-control:focus {
            background: var(--bg-card);
            border-color: var(--primary-color);
            box-shadow: 0 0 0 4px var(--primary-light);
            color: var(--text-primary);
        }

        .animate-fade-in {
            animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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
        <button class="btn btn-light rounded-circle p-3 shadow-sm theme-toggle-btn" onclick="toggleTheme()" title="Toggle Theme">
            <i class="bi bi-moon-stars-fill dark-icon"></i>
            <i class="bi bi-sun-fill light-icon"></i>
        </button>
    </div>

    <div class="get-started-card" id="card">
        <!-- Step 1: User Menu Selection -->
        <div id="selectionStep" class="animate-fade-in">
            <h1 class="step-title">How can we help?</h1>
            <p class="step-subtitle">Select your primary goal to customize your experience</p>
            
            <div class="menu-grid">
                <div class="menu-item" onclick="toSignup('Track Expenses')">
                    <i class="bi bi-wallet2"></i>
                    <h5>Track Spending</h5>
                    <p>Log daily expenses easily</p>
                </div>
                <div class="menu-item" onclick="toSignup('Set Budgets')">
                    <i class="bi bi-piggy-bank"></i>
                    <h5>Save Money</h5>
                    <p>Set and hit budget goals</p>
                </div>
                <div class="menu-item" onclick="toSignup('Analyze Wealth')">
                    <i class="bi bi-graph-up"></i>
                    <h5>Growth</h5>
                    <p>Analyze your net worth</p>
                </div>
            </div>
            
            <p class="small" style="color: var(--text-secondary);">Already have an account? <a href="{{ route('login') }}" class="text-primary fw-bold text-decoration-none">Sign In</a></p>
        </div>

        <!-- Step 2: Signup Form -->
        <div id="signupFormSection">
            <div class="text-center mb-4">
                <h2 class="fw-bold" style="color: var(--text-primary);">Create Account</h2>
                <p id="contextText" class="text-primary fw-medium"></p>
            </div>
            <form id="signupFormEntry">
                <div class="mb-3 text-start">
                    <label class="form-label fw-bold" style="color: var(--text-primary);">Full Name</label>
                    <input type="text" class="form-control p-3" id="fullname" placeholder="John Doe" required>
                </div>
                <div class="mb-3 text-start">
                    <label class="form-label fw-bold" style="color: var(--text-primary);">Email</label>
                    <input type="email" class="form-control p-3" id="email" placeholder="name@example.com" required>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3 text-start">
                        <label class="form-label fw-bold" style="color: var(--text-primary);">Password</label>
                        <input type="password" class="form-control p-3" id="password" placeholder="Min. 8 char" required minlength="8">
                    </div>
                    <div class="col-md-6 mb-4 text-start">
                        <label class="form-label fw-bold" style="color: var(--text-primary);">Confirm</label>
                        <input type="password" class="form-control p-3" id="password_confirmation" placeholder="Repeat it" required minlength="8">
                    </div>
                </div>
                <div id="registerError" class="alert alert-danger py-2 mb-3 small" style="display: none;"></div>
                <button type="submit" class="btn btn-primary w-100 py-3 shadow">
                    Complete Setup <i class="bi bi-check2-circle ms-2"></i>
                </button>
            </form>
            <button class="btn btn-link mt-3 text-decoration-none" style="color: var(--text-secondary);" onclick="backToMenu()">← Back to goals</button>
        </div>
    </div>

    <script>
        function toSignup(goal) {
            document.getElementById('selectionStep').style.display = 'none';
            document.getElementById('signupFormSection').style.display = 'block';
            document.getElementById('signupFormSection').classList.add('animate-fade-in');
            document.getElementById('contextText').textContent = 'Let\'s set up your account to ' + goal;
            document.getElementById('card').style.maxWidth = '550px';
        }

        function backToMenu() {
            document.getElementById('selectionStep').style.display = 'block';
            document.getElementById('signupFormSection').style.display = 'none';
            document.getElementById('card').style.maxWidth = '800px';
        }

        document.getElementById('signupFormEntry').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const password_confirmation = document.getElementById('password_confirmation').value;
            const errorDiv = document.getElementById('registerError');
            
            errorDiv.style.display = 'none';

            // Client-side validation
            if (password !== password_confirmation) {
                errorDiv.textContent = 'Passwords do not match!';
                errorDiv.style.display = 'block';
                return;
            }

            const btn = e.target.querySelector('button');
            const originalBtnContent = btn.innerHTML;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating your account...';
            btn.disabled = true;

            try {
                const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: password_confirmation
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Save info for legacy JS components
                    localStorage.setItem('financeTracker_profile', JSON.stringify({ name: name, email: email }));
                    window.location.href = "{{ url('/dashboard') }}";
                } else {
                    btn.disabled = false;
                    btn.innerHTML = originalBtnContent;
                    errorDiv.textContent = data.message || 'Registration failed. Please try again.';
                    if (data.errors) {
                        const firstError = Object.values(data.errors)[0][0];
                        errorDiv.textContent = firstError;
                    }
                    errorDiv.style.display = 'block';
                }
            } catch (err) {
                btn.disabled = false;
                btn.innerHTML = originalBtnContent;
                errorDiv.textContent = 'A server error occurred. Please try again.';
                errorDiv.style.display = 'block';
                console.error('Registration error:', err);
            }
        });
    </script>
</body>
</html>
