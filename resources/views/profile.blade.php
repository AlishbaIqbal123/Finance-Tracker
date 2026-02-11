@extends('layouts.app')

@section('title', 'Profile - FinanceTracker')

@section('content')
            
            <div class="card">
                <div class="card-header">
                    <i class="bi bi-person me-2"></i>Profile Settings
                    <div class="text-muted" style="font-size: 12px; font-weight: normal;">Manage your account information</div>
                </div>
                <div class="card-body">
                    <form id="profileForm">
                        <div class="mb-3">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="profileName" placeholder="Enter your full name">
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" id="profileEmail" placeholder="Email address" readonly>
                            <div class="text-muted small mt-1">Email cannot be changed</div>
                        </div>
                        
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary me-2" onclick="resetForm()">Reset</button>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- App Preferences -->
            <div class="card mt-4">
                <div class="card-header">
                    <i class="bi bi-gear me-2"></i>App Preferences
                    <div class="text-muted" style="font-size: 12px; font-weight: normal;">Customize your experience</div>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Preferred Currency</label>
                        <select class="form-select" id="profileCurrency">
                            <option value="PKR" selected>₨ PKR (Pakistani Rupee)</option>
                            <option value="USD">$ USD (US Dollar)</option>
                            <option value="EUR">€ EUR (Euro)</option>
                            <option value="GBP">£ GBP (British Pound)</option>
                            <option value="INR">₹ INR (Indian Rupee)</option>
                            <option value="JPY">¥ JPY (Japanese Yen)</option>
                            <option value="CNY">¥ CNY (Chinese Yuan)</option>
                            <option value="AUD">A$ AUD (Australian Dollar)</option>
                            <option value="CAD">C$ CAD (Canadian Dollar)</option>
                            <option value="SGD">S$ SGD (Singapore Dollar)</option>
                        </select>
                        <div class="text-muted small mt-1">Select your preferred currency for displaying amounts</div>
                    </div>
                    <button class="btn btn-primary" onclick="savePreferences()">Save Preferences</button>
                </div>
            </div>
            
            <!-- Data Management -->
            <div class="card">
                <div class="card-header">
                    <i class="bi bi-database me-2"></i>Data Management
                    <div class="text-muted" style="font-size: 12px; font-weight: normal;">Manage your financial data</div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <h6>Clear All Data</h6>
                            <p class="text-muted small">Remove all transactions and budgets</p>
                            <button class="btn btn-outline-danger" onclick="clearAllData()">
                                <i class="bi bi-trash me-1"></i>Clear Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Custom JavaScript -->
    <script src="{{ asset('js/script.js') }}"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            initializeProfile();
        });
        
        function initializeProfile() {
            // First, try to get data from Laravel Auth (if available)
            @auth
                const laravelUser = @json(Auth::user());
                if (laravelUser) {
                    document.getElementById('profileName').value = laravelUser.name || '';
                    document.getElementById('profileEmail').value = laravelUser.email || '';
                    
                    // Also update localStorage to keep it in sync
                    const profileData = {
                        name: laravelUser.name,
                        email: laravelUser.email,
                        id: laravelUser.id
                    };
                    localStorage.setItem('financeTracker_profile', JSON.stringify(profileData));
                    
                    // Load preferences and return
                    loadPreferences();
                    return;
                }
            @endauth
            
            // Fallback to localStorage if not authenticated
            const savedProfile = localStorage.getItem('financeTracker_profile');
            if (savedProfile) {
                try {
                    const profileData = JSON.parse(savedProfile);
                    document.getElementById('profileName').value = profileData.name || '';
                    document.getElementById('profileEmail').value = profileData.email || 'demo@financetracker.com';
                } catch (e) {
                    console.error('Error parsing profile data:', e);
                    // Set default values
                    document.getElementById('profileName').value = '';
                    document.getElementById('profileEmail').value = 'demo@financetracker.com';
                }
            } else {
                // No profile data found, set defaults
                document.getElementById('profileName').value = '';
                document.getElementById('profileEmail').value = 'demo@financetracker.com';
            }
            
            // Load preferences
            loadPreferences();
        }
        
        function setupEventListeners() {
            // Profile form submission
            const profileForm = document.getElementById('profileForm');
            if (profileForm) {
                profileForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    saveProfile();
                });
            }
            
        }
        
        function saveProfile() {
            const name = document.getElementById('profileName').value;
            
            if (!name.trim()) {
                showToast('Please enter your full name', 'error');
                return;
            }

            // Get current email from input (which was loaded in initializeProfile)
            const existingEmail = document.getElementById('profileEmail').value || 'demo@financetracker.com';
            
            const profileData = {
                name: name.trim(),
                email: existingEmail,
                updatedAt: new Date().toISOString()
            };
            
            // Save to localStorage
            localStorage.setItem('financeTracker_profile', JSON.stringify(profileData));
            
            // Update sidebar user info
            const userNameEl = document.getElementById('userName');
            const userEmailEl = document.getElementById('userEmail');
            
            if (userNameEl) userNameEl.textContent = profileData.name;
            if (userEmailEl) userEmailEl.textContent = profileData.email;
            
            // Also update the sidebar and header elements that are shared across pages
            const sidebarUserNameEl = document.getElementById('sidebarUserName');
            const sidebarUserEmailEl = document.getElementById('sidebarUserEmail');
            const headerUserNameEl = document.getElementById('headerUserName');
            
            if (sidebarUserNameEl) sidebarUserNameEl.textContent = profileData.name;
            if (sidebarUserEmailEl) sidebarUserEmailEl.textContent = profileData.email;
            if (headerUserNameEl) headerUserNameEl.textContent = profileData.name;
            
            showToast('Profile updated successfully!', 'success');
        }        
        function resetForm() {
            document.getElementById('profileName').value = '';
            showToast('Form reset', 'info');
        }
        
        
        function clearAllData() {
            if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                // Reset form
                document.getElementById('profileName').value = '';
                
                // Reset sidebar user info
                const userNameEl = document.getElementById('userName');
                if (userNameEl) userNameEl.textContent = 'User';
                
                // Reset shared sidebar elements
                const sidebarUserNameEl = document.getElementById('sidebarUserName');
                const sidebarUserEmailEl = document.getElementById('sidebarUserEmail');
                
                if (sidebarUserNameEl) sidebarUserNameEl.textContent = 'User';
                if (sidebarUserEmailEl) sidebarUserEmailEl.textContent = 'demo@financetracker.com';
                
                showToast('All data cleared successfully!', 'success');
                
                // Refresh page to show empty state
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
        
        function savePreferences() {
            // Save currency preference
            const currencySelect = document.getElementById('profileCurrency');
            const selectedCurrency = currencySelect.value;
            
            // Save to localStorage
            localStorage.setItem('preferredCurrency', selectedCurrency);
            
            showToast('Preferences saved successfully!', 'success');
            
            // Reload page to apply changes
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        
        function loadPreferences() {
            // Load saved currency preference
            const savedCurrency = localStorage.getItem('preferredCurrency');
            if (savedCurrency) {
                const currencySelect = document.getElementById('profileCurrency');
                if (currencySelect) {
                    currencySelect.value = savedCurrency;
                }
            }
        }        

    </script>
    
    <!-- Custom JavaScript -->
@endsection
