<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Started - FinanceTracker</title>
    <!-- Bootstrap & Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', sans-serif;
        }

        .get-started-card {
            width: 100%;
            max-width: 800px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 30px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            padding: 50px;
            text-align: center;
            transition: all 0.5s ease;
        }

        .step-title {
            font-weight: 800;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #1a202c;
        }

        .step-subtitle {
            color: #718096;
            margin-bottom: 3rem;
        }

        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .menu-item {
            background: white;
            padding: 30px;
            border-radius: 20px;
            border: 2px solid transparent;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .menu-item:hover {
            transform: translateY(-10px);
            border-color: #0d6efd;
            box-shadow: 0 10px 20px rgba(13, 110, 253, 0.1);
        }

        .menu-item i {
            font-size: 2.5rem;
            color: #0d6efd;
            margin-bottom: 15px;
        }

        .menu-item h5 {
            font-weight: 700;
            margin-bottom: 5px;
        }

        .menu-item p {
            font-size: 0.85rem;
            color: #718096;
            margin: 0;
        }

        #signupFormSection {
            display: none;
            max-width: 400px;
            margin: 0 auto;
        }

        .btn-primary {
            padding: 12px 30px;
            border-radius: 12px;
            font-weight: 700;
        }

        .animate-fade-in {
            animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
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
            
            <p class="text-muted small">Already have an account? <a href="{{ route('login') }}" class="text-primary fw-bold">Sign In</a></p>
        </div>

        <!-- Step 2: Signup Form -->
        <div id="signupFormSection">
            <div class="text-center mb-4">
                <h2 class="fw-bold">Create Account</h2>
                <p id="contextText" class="text-primary fw-medium"></p>
            </div>
            <form id="signupFormEntry">
                <div class="mb-3 text-start">
                    <label class="form-label fw-bold">Full Name</label>
                    <input type="text" class="form-control p-3 border-2" id="fullname" placeholder="John Doe" required>
                </div>
                <div class="mb-3 text-start">
                    <label class="form-label fw-bold">Email</label>
                    <input type="email" class="form-control p-3 border-2" id="email" placeholder="name@example.com" required>
                </div>
                <div class="mb-4 text-start">
                    <label class="form-label fw-bold">Password</label>
                    <input type="password" class="form-control p-3 border-2" id="password" placeholder="Min. 8 characters" required>
                </div>
                <button type="submit" class="btn btn-primary w-100 py-3 shadow">
                    Complete Setup <i class="bi bi-check2-circle ms-2"></i>
                </button>
            </form>
            <button class="btn btn-link mt-3 text-muted" onclick="backToMenu()">← Back to goals</button>
        </div>
    </div>

    <script>
        function toSignup(goal) {
            document.getElementById('selectionStep').style.display = 'none';
            document.getElementById('signupFormSection').style.display = 'block';
            document.getElementById('signupFormSection').classList.add('animate-fade-in');
            document.getElementById('contextText').textContent = 'Let\'s set up your account to ' + goal;
            document.getElementById('card').style.maxWidth = '500px';
        }

        function backToMenu() {
            document.getElementById('selectionStep').style.display = 'block';
            document.getElementById('signupFormSection').style.display = 'none';
            document.getElementById('card').style.maxWidth = '800px';
        }

        document.getElementById('signupFormEntry').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullname').value;
            const btn = e.target.querySelector('button');
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Preparing your dashboard...';
            btn.disabled = true;

            // Save name for profile
            localStorage.setItem('financeTracker_profile', JSON.stringify({ name: name, email: document.getElementById('email').value }));

            setTimeout(() => {
                window.location.href = "{{ url('/dashboard') }}";
            }, 1200);
        });
    </script>
</body>
</html>
