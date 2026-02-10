
// Screen Navigation Logic
window.onload = () => { setTimeout(() => { document.getElementById('splash-screen').style.opacity = '0'; setTimeout(() => document.getElementById('splash-screen').style.display = 'none', 1000); }, 2500); };
function goToLogin() { document.getElementById('choice-screen').style.display = 'none'; document.getElementById('auth-screen').style.display = 'flex'; }
function closeAuth() { document.getElementById('auth-screen').style.display = 'none'; document.getElementById('choice-screen').style.display = 'flex'; }
function goToPrep() { document.getElementById('choice-screen').style.display = 'none'; document.getElementById('prep-page').style.display = 'block'; }
function closePrep() { document.getElementById('prep-page').style.display = 'none'; document.getElementById('choice-screen').style.display = 'flex'; }
function goToDashboard() { document.getElementById('choice-screen').style.display = 'none'; }
function handleAuth() { document.getElementById('auth-screen').style.display = 'none'; }

// Auth Toggle Logic
let isLoginMode = true;
function toggleAuth() {
    isLoginMode = !isLoginMode;
    document.getElementById('form-title').innerText = isLoginMode ? "Shiga Ciki (Login)" : "Sabuwar Rajista";
    document.getElementById('register-fields').style.display = isLoginMode ? "none" : "block";
    document.getElementById('toggle-text').innerText = isLoginMode ? "Ba ki da akaunti?" : "Kina da akaunti?";
    document.getElementById('toggle-btn').innerText = isLoginMode ? "Yi Rajista" : "Shiga yanzu";
}
function toggleDateLabel() {
    const method = document.getElementById('calc-method').value;
    document.getElementById('date-label').innerText = method === "LMP" ? "Zabi Ranar LMP:" : "Zabi Ranar Haihuwa (EDD):";
}

// Calendar Logic
let currentViewDate = new Date();
let userLMP = null;
function initCalendar() { userLMP = new Date(document.getElementById('cal-lmp').value); renderFullCalendar(); }
function changeMonth(offset) { currentViewDate.setMonth(currentViewDate.getMonth() + offset); renderFullCalendar(); }
function renderFullCalendar() {
    if (!userLMP) return;
    const grid = document.getElementById('calendar-main-grid');
    const cycleLen = parseInt(document.getElementById('cal-cycle').value) || 28;
    grid.innerHTML = '';
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    document.getElementById('month-display').innerText = currentViewDate.toLocaleDateString('ha-NG', { month: 'long', year: 'numeric' });
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let x = 0; x < firstDayIndex; x++) grid.innerHTML += `<div class="day prev-month"></div>`;
    for (let i = 1; i <= lastDay; i++) {
        const dateAtHand = new Date(year, month, i);
        const diffDays = Math.floor((dateAtHand - userLMP) / (1000 * 60 * 60 * 24));
        const cycleDay = ((diffDays % cycleLen) + cycleLen) % cycleLen;
        let statusClass = 'day';
        if (cycleDay >= 0 && cycleDay < 5) statusClass += ' period';
        else if (cycleDay >= (cycleLen - 17) && cycleDay <= (cycleLen - 12)) statusClass += (cycleDay === (cycleLen - 14)) ? ' ovulation' : ' fertile';
        if (dateAtHand.toDateString() === new Date().toDateString()) statusClass += ' today';
        grid.innerHTML += `<div class="${statusClass}">${i}</div>`;
    }
    const nextPeriodIn = cycleLen - (Math.floor((new Date() - userLMP) / (1000 * 60 * 60 * 24)) % cycleLen);
    document.getElementById('prediction-text').innerHTML = `Sauran kwanaki <strong>${nextPeriodIn}</strong> hasashen jinin ki ya dawo.`;
}

// Slider Logic
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');
let idx = 0;
function updateSlider() { slider.style.transform = `translateX(-${idx * 100}%)`; dots.forEach((dot, i) => dot.classList.toggle('active', i === idx)); }
function goToSlide(n) { idx = n; updateSlider(); }
setInterval(() => { idx = (idx + 1) % 3; updateSlider(); }, 8000);
document.getElementById('theme-toggle').onclick = () => {
    const t = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'dark' : 'light');
};
