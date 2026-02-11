/**
 * Theme Manager for FinanceTracker
 * Consistent theme application across the app
 */

const themes = {
    light: {
        name: 'Light Theme',
        colors: {
            'primary': '#d63384',
            'secondary': '#a8b5c8',
            'success': '#a8d5ba',
            'danger': '#f5a5a5',
            'warning': '#f5c99b',
            'background': '#faf9f7',
            'card-background': '#ffffff',
            'text-color': '#2d3748',
            'text-secondary': '#64748b',
            'border-color': '#e9ecef',
            'sidebar-background': '#ffffff'
        }
    },
    dark: {
        name: 'Dark Theme',
        colors: {
            'primary': '#c95a8c',
            'secondary': '#7d92b4',
            'success': '#10b981',
            'danger': '#ef4444',
            'warning': '#f59e0b',
            'background': '#1a1d21',
            'card-background': '#252930',
            'text-color': '#e2e8f0',
            'text-secondary': '#a0aec0',
            'border-color': '#374151',
            'sidebar-background': '#252930'
        }
    },
    rose: {
        name: 'Rose Theme',
        colors: {
            'primary': '#f8ccd5',
            'secondary': '#c5a8b8',
            'success': '#b8eacb',
            'danger': '#f8c5c5',
            'warning': '#fce5c5',
            'background': '#fdf6f8',
            'card-background': '#ffffff',
            'text-color': '#5a4a4f',
            'text-secondary': '#975a16',
            'border-color': '#f0d6dd',
            'sidebar-background': '#ffffff'
        }
    },
    ocean: {
        name: 'Ocean Theme',
        colors: {
            'primary': '#87c5d6',
            'secondary': '#a8c8d5',
            'success': '#a8d6c5',
            'danger': '#f5a5a5',
            'warning': '#f5c99b',
            'background': '#f0f8fa',
            'card-background': '#ffffff',
            'text-color': '#2d4a5a',
            'text-secondary': '#4a5568',
            'border-color': '#d6e5ed',
            'sidebar-background': '#ffffff'
        }
    },
    forest: {
        name: 'Forest Theme',
        colors: {
            'primary': '#8bc58b',
            'secondary': '#a8c5a8',
            'success': '#a8d5ba',
            'danger': '#f5a5a5',
            'warning': '#f5c99b',
            'background': '#f5faf5',
            'card-background': '#ffffff',
            'text-color': '#2d5a2d',
            'text-secondary': '#4a5568',
            'border-color': '#d6edd6',
            'sidebar-background': '#ffffff'
        }
    },
    sunset: {
        name: 'Sunset Theme',
        colors: {
            'primary': '#f8c587',
            'secondary': '#d5c5a8',
            'success': '#a8d5ba',
            'danger': '#f5a5a5',
            'warning': '#f5c99b',
            'background': '#fdf8f5',
            'card-background': '#ffffff',
            'text-color': '#5a4a2d',
            'text-secondary': '#4a5568',
            'border-color': '#f0ddd6',
            'sidebar-background': '#ffffff'
        }
    },
    lavender: {
        name: 'Lavender Theme',
        colors: {
            'primary': '#c587f8',
            'secondary': '#c5a8d5',
            'success': '#a8d5ba',
            'danger': '#f5a5a5',
            'warning': '#f5c99b',
            'background': '#f8f5fd',
            'card-background': '#ffffff',
            'text-color': '#4a2d5a',
            'text-secondary': '#4a5568',
            'border-color': '#ddd6f0',
            'sidebar-background': '#ffffff'
        }
    }
};

const THEME_STORAGE_KEY = 'financeTracker_theme';

function applyTheme(themeName) {
    const theme = themes[themeName] || themes.light;
    const root = document.documentElement;

    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });

    // Handle Body Classes
    Object.keys(themes).forEach(t => {
        document.body.classList.remove(`${t}-theme`);
    });
    document.body.classList.add(`${themeName}-theme`);

    // Set data-theme for CSS selectors
    if (themeName === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    // Save to storage
    localStorage.setItem(THEME_STORAGE_KEY, themeName);

    // Update Theme toggle icons (moon/sun)
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        if (themeName === 'dark') {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon');
        }
    });

    // Sync any theme selectors on the page
    const themeSelectors = document.querySelectorAll('#themeSelector');
    themeSelectors.forEach(select => {
        select.value = themeName;
    });

    console.log(`Applied: ${theme.name}`);
}

function cycleTheme() {
    const themeNames = Object.keys(themes);
    const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    const nextTheme = themeNames[nextIndex];
    applyTheme(nextTheme);

    // Show notification if helper exists
    if (typeof showToast === 'function') {
        showToast(`Theme: ${themes[nextTheme].name}`, 'info');
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyTheme(savedTheme);

    // Listen for manual changes on any theme selectors
    document.addEventListener('change', (e) => {
        if (e.target.id === 'themeSelector') {
            applyTheme(e.target.value);
        }
    });
});

// Expose functions globally
window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
window.cycleTheme = cycleTheme;
window.themes = themes;
