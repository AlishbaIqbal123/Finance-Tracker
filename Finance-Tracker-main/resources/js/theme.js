// Theme management for FinanceTracker
import { showToast } from './utils.js';

// Define theme configurations
const themes = {
    light: {
        name: 'Light Theme',
        colors: {
            primary: '#e4a5b8',
            secondary: '#a8b5c8',
            success: '#a8d5ba',
            danger: '#f5a5a5',
            warning: '#f5c99b',
            background: '#faf9f7',
            cardBackground: '#ffffff',
            textColor: '#2d3748',
            borderColor: '#e9ecef',
            sidebarBackground: '#ffffff'
        }
    },
    dark: {
        name: 'Dark Theme',
        colors: {
            primary: '#e4a5b8',
            secondary: '#6c757d',
            success: '#20c997',
            danger: '#dc3545',
            warning: '#ffc107',
            background: '#1a1d21',
            cardBackground: '#2d3035',
            textColor: '#f8f9fa',
            borderColor: '#495057',
            sidebarBackground: '#2d3035'
        }
    },
    rose: {
        name: 'Rose Theme',
        colors: {
            primary: '#f8ccd5',
            secondary: '#c5a8b8',
            success: '#b8eacb',
            danger: '#f8c5c5',
            warning: '#fce5c5',
            background: '#fdf6f8',
            cardBackground: '#ffffff',
            textColor: '#5a4a4f',
            borderColor: '#f0d6dd',
            sidebarBackground: '#ffffff'
        }
    },
    ocean: {
        name: 'Ocean Theme',
        colors: {
            primary: '#87c5d6',
            secondary: '#a8c8d5',
            success: '#a8d6c5',
            danger: '#f5a5a5',
            warning: '#f5c99b',
            background: '#f0f8fa',
            cardBackground: '#ffffff',
            textColor: '#2d4a5a',
            borderColor: '#d6e5ed',
            sidebarBackground: '#ffffff'
        }
    },
    forest: {
        name: 'Forest Theme',
        colors: {
            primary: '#8bc58b',
            secondary: '#a8c5a8',
            success: '#a8d5ba',
            danger: '#f5a5a5',
            warning: '#f5c99b',
            background: '#f5faf5',
            cardBackground: '#ffffff',
            textColor: '#2d5a2d',
            borderColor: '#d6edd6',
            sidebarBackground: '#ffffff'
        }
    },
    sunset: {
        name: 'Sunset Theme',
        colors: {
            primary: '#f8c587',
            secondary: '#d5c5a8',
            success: '#a8d5ba',
            danger: '#f5a5a5',
            warning: '#f5c99b',
            background: '#fdf8f5',
            cardBackground: '#ffffff',
            textColor: '#5a4a2d',
            borderColor: '#f0ddd6',
            sidebarBackground: '#ffffff'
        }
    },
    lavender: {
        name: 'Lavender Theme',
        colors: {
            primary: '#c587f8',
            secondary: '#c5a8d5',
            success: '#a8d5ba',
            danger: '#f5a5a5',
            warning: '#f5c99b',
            background: '#f8f5fd',
            cardBackground: '#ffffff',
            textColor: '#4a2d5a',
            borderColor: '#ddd6f0',
            sidebarBackground: '#ffffff'
        }
    }
};

// Apply theme to the document
function applyTheme(themeName) {
    const theme = themes[themeName] || themes.light;
    const root = document.documentElement;
    
    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
    
    // Add theme class to body
    Object.keys(themes).forEach(t => {
        document.body.classList.remove(`${t}-theme`);
    });
    document.body.classList.add(`${themeName}-theme`);
    
    // Save theme preference
    localStorage.setItem('preferredTheme', themeName);
    
    console.log(`Applied theme: ${theme.name}`);
}

// Initialize theme selector
function initializeThemeSelector() {
    const themeSelector = document.getElementById('themeSelector');
    if (!themeSelector) return;
    
    // Set initial value from localStorage or default to light
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    themeSelector.value = savedTheme;
    
    // Apply the saved theme
    applyTheme(savedTheme);
    
    // Add event listener
    themeSelector.addEventListener('change', function() {
        const selectedTheme = this.value;
        applyTheme(selectedTheme);
        showToast(`Theme changed to ${themes[selectedTheme].name}`, 'success');
    });
}

// Auto-detect system preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeSelector();
});

// Export functions for use in other modules
export { themes, applyTheme, initializeThemeSelector, detectSystemTheme };