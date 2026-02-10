document.addEventListener('DOMContentLoaded', function () {
    let isLoginMode = true;
    const form = document.getElementById('auth-form');
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleText = document.getElementById('toggle-text');
    const formTitle = document.getElementById('form-title');
    const registerFields = document.getElementById('register-fields');
    const dateLabel = document.getElementById('date-label');
    const calcMethod = document.getElementById('calc-method');

    // Toggle between login/register
    toggleBtn.addEventListener('click', function () {
        isLoginMode = !isLoginMode;

        formTitle.textContent = isLoginMode
            ? "Shiga Ciki (Login)"
            : "Sabuwar Rajista";

        registerFields.style.display = isLoginMode ? "none" : "block";
        toggleText.textContent = isLoginMode
            ? "Ba ki da akaunti?"
            : "Kina da akaunti?";
        toggleBtn.textContent = isLoginMode
            ? "Yi Rajista"
            : "Shiga yanzu";
    });

    // Toggle date label based on calculation method
    calcMethod.addEventListener('change', function () {
        dateLabel.textContent = this.value === "LMP"
            ? "Zabi Ranar LMP:"
            : "Zabi Ranar Haihuwa (EDD):";
    });

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const phone = formData.get('phone');
        const password = formData.get('password');

        // Basic validation
        if (!phone || !password) {
            alert('Don Allah cika duka filayen');
            return;
        }

        // Simulate authentication
        simulateAuth(phone, password);
    });

    function simulateAuth(phone, password) {
        // Show loading state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Ana shiga...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // For demo, redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 1500);
    }
});