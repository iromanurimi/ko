// Theme Toggle Function
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('app-theme', newTheme);
        };
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize navigation
    initNavigation();
});

function initNavigation() {
    // Add active state to nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            navButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Format date for display
function formatDate(date) {
    return date.toLocaleDateString('ha-NG', {
        month: 'long',
        year: 'numeric'
    });
}

// Handle back button
function goBack() {
    window.history.back();
}


// splash-choice.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, starting splash screen...');

    // Wait 2.5 seconds, then fade out splash screen and show choice screen
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        const choiceScreen = document.getElementById('choice-screen');

        console.log('Hiding splash screen, showing choice screen...');

        // Add 'hidden' class to splash screen for fade out
        splashScreen.classList.add('hidden');

        // Wait for fade out to complete, then show choice screen
        setTimeout(() => {
            // Hide splash screen completely
            splashScreen.style.display = 'none';

            // Show choice screen with fade in
            choiceScreen.classList.add('visible');
        }, 1000); // Wait for splash screen fade out duration
    }, 2500);
});