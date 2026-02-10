document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality
    const slider = document.getElementById('slider');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    // Initialize slider
    updateSlider();
    startAutoSlide();

    // Add click events to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    // Touch/swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    slider.parentElement.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    });

    slider.parentElement.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % 3;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + 3) % 3;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Mood selection
    const moodItems = document.querySelectorAll('.mood-item');
    moodItems.forEach(item => {
        item.addEventListener('click', function () {
            moodItems.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');

            // Here you would save the mood selection
            const mood = this.textContent;
            console.log('Mood selected:', mood);
        });
    });
});