document.addEventListener('DOMContentLoaded', function () {
    let currentViewDate = new Date();
    let userLMP = null;

    const monthDisplay = document.getElementById('month-display');
    const calendarGrid = document.getElementById('calendar-main-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const lmpInput = document.getElementById('cal-lmp');
    const cycleInput = document.getElementById('cal-cycle');
    const predictionText = document.getElementById('prediction-text');

    // Set default date for LMP input (28 days ago)
    const defaultLMP = new Date();
    defaultLMP.setDate(defaultLMP.getDate() - 28);
    lmpInput.valueAsDate = defaultLMP;
    userLMP = defaultLMP;

    // Initialize calendar
    initCalendar();

    // Event listeners
    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));
    lmpInput.addEventListener('change', initCalendar);
    cycleInput.addEventListener('change', initCalendar);

    function initCalendar() {
        userLMP = new Date(lmpInput.value);
        renderFullCalendar();
    }

    function changeMonth(offset) {
        currentViewDate.setMonth(currentViewDate.getMonth() + offset);
        renderFullCalendar();
    }

    function renderFullCalendar() {
        if (!userLMP) return;

        const cycleLen = parseInt(cycleInput.value) || 28;
        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();

        // Update month display
        monthDisplay.textContent = formatDate(currentViewDate);

        // Clear grid
        calendarGrid.innerHTML = '';

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayIndex = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDayIndex; i++) {
            calendarGrid.innerHTML += '<div class="day prev-month"></div>';
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const diffDays = Math.floor((currentDate - userLMP) / (1000 * 60 * 60 * 24));
            const cycleDay = ((diffDays % cycleLen) + cycleLen) % cycleLen;

            let className = 'day';

            // Determine day type
            if (cycleDay >= 0 && cycleDay < 5) {
                className += ' period';
            } else if (cycleDay >= (cycleLen - 17) && cycleDay <= (cycleLen - 12)) {
                if (cycleDay === (cycleLen - 14)) {
                    className += ' ovulation';
                } else {
                    className += ' fertile';
                }
            }

            // Highlight today
            if (currentDate.toDateString() === new Date().toDateString()) {
                className += ' today';
            }

            calendarGrid.innerHTML += `<div class="${className}">${day}</div>`;
        }

        // Update prediction text
        const today = new Date();
        const daysSinceLMP = Math.floor((today - userLMP) / (1000 * 60 * 60 * 24));
        const nextPeriodIn = cycleLen - (daysSinceLMP % cycleLen);

        predictionText.innerHTML = `Sauran kwanaki <strong>${nextPeriodIn}</strong> hasashen jinin ki ya dawo.`;
    }
});