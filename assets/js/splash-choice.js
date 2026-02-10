// splash-choice.js

document.addEventListener('DOMContentLoaded', function () {
    const splashScreen = document.getElementById('splash-screen');
    const choiceScreen = document.getElementById('choice-screen');

    // Check if user has seen splash screen before in this session
    const splashShown = sessionStorage.getItem('splashShown');

    if (splashShown === 'true') {
        // If splash was shown before, skip it entirely
        console.log('Splash already shown, skipping...');
        splashScreen.style.display = 'none';
        choiceScreen.classList.add('visible');
        choiceScreen.style.opacity = '1';
        choiceScreen.style.visibility = 'visible';
    } else {
        // First time visiting - show splash screen
        console.log('First visit, showing splash screen...');

        // Show splash screen
        splashScreen.style.display = 'flex';
        splashScreen.style.opacity = '1';
        splashScreen.style.visibility = 'visible';

        // Wait 2.5 seconds, then fade out splash screen and show choice screen
        setTimeout(() => {
            console.log('Hiding splash screen, showing choice screen...');

            // Mark splash as shown in session storage
            sessionStorage.setItem('splashShown', 'true');

            // Fade out splash screen
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';

            // Wait for fade out to complete, then hide splash and show choice
            setTimeout(() => {
                splashScreen.style.display = 'none';

                // Show choice screen with fade in
                choiceScreen.classList.add('visible');
                choiceScreen.style.opacity = '1';
                choiceScreen.style.visibility = 'visible';
            }, 1000);
        }, 2500);
    }

    // Optional: Reset splash if user manually navigates to index.html
    // Add a button or gesture to reset if needed
    document.addEventListener('keydown', function (e) {
        // Example: Press 'R' to reset splash (for testing)
        if (e.key === 'r' || e.key === 'R') {
            sessionStorage.removeItem('splashShown');
            location.reload();
        }
    });
});