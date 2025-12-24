/**
 * Theme Manager for FinanceTracker
 * Handles theme switching and persistence
 */

const themes = {
    light: {
        '--bg-body': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        '--bg-sidebar': '#ffffff',
        '--bg-card': '#ffffff',
        '--bg-secondary': '#f8f9fa',
        '--text-primary': '#1a202c',
        '--text-secondary': '#718096',
        '--border-color': '#e2e8f0',
        '--primary-color': '#319795',
        '--primary-hover': '#2c7a7b',
        '--accent-color': '#319795',
        '--sidebar-active-bg': '#e6fffa',
        '--sidebar-active-text': '#285e61'
    },
    dark: {
        '--bg-body': 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        '--bg-sidebar': '#2d3748',
        '--bg-card': '#2d3748',
        '--bg-secondary': '#1a202c',
        '--text-primary': '#f7fafc',
        '--text-secondary': '#a0aec0',
        '--border-color': '#4a5568',
        '--primary-color': '#4fd1c5',
        '--primary-hover': '#38b2ac',
        '--accent-color': '#4fd1c5',
        '--sidebar-active-bg': '#4a5568',
        '--sidebar-active-text': '#81e6d9'
    },
    rose: {
        '--bg-body': 'linear-gradient(135deg, #fff0f3 0%, #fff5f7 100%)',
        '--bg-sidebar': '#ffffff',
        '--bg-card': '#ffffff',
        '--bg-secondary': '#fff5f7',
        '--text-primary': '#702459',
        '--text-secondary': '#975a16',
        '--border-color': '#fed7e2',
        '--primary-color': '#d53f8c',
        '--primary-hover': '#b83280',
        '--accent-color': '#d53f8c',
        '--sidebar-active-bg': '#fff5f7',
        '--sidebar-active-text': '#97266d'
    },
    ocean: {
        '--bg-body': 'linear-gradient(135deg, #ebf8ff 0%, #e6fffa 100%)',
        '--bg-sidebar': '#ffffff',
        '--bg-card': '#ffffff',
        '--bg-secondary': '#ebf8ff',
        '--text-primary': '#2c5282',
        '--text-secondary': '#4a5568',
        '--border-color': '#bee3f8',
        '--primary-color': '#3182ce',
        '--primary-hover': '#2b6cb0',
        '--accent-color': '#3182ce',
        '--sidebar-active-bg': '#ebf8ff',
        '--sidebar-active-text': '#2c5282'
    },
    forest: {
        '--bg-body': 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
        '--bg-sidebar': '#ffffff',
        '--bg-card': '#ffffff',
        '--bg-secondary': '#f0fff4',
        '--text-primary': '#22543d',
        '--text-secondary': '#4a5568',
        '--border-color': '#c6f6d5',
        '--primary-color': '#38a169',
        '--primary-hover': '#2f855a',
        '--accent-color': '#38a169',
        '--sidebar-active-bg': '#f0fff4',
        '--sidebar-active-text': '#22543d'
    },
    sunset: {
        '--bg-body': 'linear-gradient(135deg, #fffaf0 0%, #feebc8 100%)',
        '--bg-sidebar': '#ffffff',
        '--bg-card': '#ffffff',
        '--bg-secondary': '#fffaf0',
        '--text-primary': '#744210',
        '--text-secondary': '#4a5568',
        '--border-color': '#feebc8',
        '--primary-color': '#dd6b20',
        '--primary-hover': '#c05621',
        '--accent-color': '#dd6b20',
        '--sidebar-active-bg': '#fffaf0',
        '--sidebar-active-text': '#744210'
    },
    lavender: {
        '--bg-body': 'linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%)',
        '--bg-sidebar': '#ffffff',
        '--bg-card': '#ffffff',
        '--bg-secondary': '#faf5ff',
        '--text-primary': '#553c9a',
        '--text-secondary': '#4a5568',
        '--border-color': '#e9d8fd',
        '--primary-color': '#805ad5',
        '--primary-hover': '#6b46c1',
        '--accent-color': '#805ad5',
        '--sidebar-active-bg': '#faf5ff',
        '--sidebar-active-text': '#553c9a'
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName] || themes.light;
    const root = document.documentElement;

    // Apply all variables
    Object.keys(theme).forEach(property => {
        root.style.setProperty(property, theme[property]);
    });

    // Set active class on body for specific overrides if needed
    document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
    document.body.classList.add(`theme-${themeName}`);

    // Save to local storage
    localStorage.setItem('financeTracker_theme', themeName);

    const selector = document.getElementById('themeSelector');
    if (selector) {
        selector.value = themeName;
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('financeTracker_theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('financeTracker_theme') || 'light';
    applyTheme(savedTheme);

    // Setup listener
    const selector = document.getElementById('themeSelector');
    if (selector) {
        selector.value = savedTheme;
        selector.addEventListener('change', (e) => {
            applyTheme(e.target.value);
        });
    }
});

// Expose globally
window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
