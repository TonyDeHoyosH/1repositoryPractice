document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.reviews__slider');
    const prevBtn = document.querySelector('.reviews__nav-button--prev');
    const nextBtn = document.querySelector('.reviews__nav-button--next');
    const cards = document.querySelectorAll('.reviews__card');

    if (!slider || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;
    let visibleCards = 3;

    function updateSlider() {
        const sliderWrapper = document.querySelector('.reviews__slider-wrapper');
        const cardWidth = cards[0].offsetWidth;
        const cardMargin = parseFloat(window.getComputedStyle(cards[0]).marginLeft) + parseFloat(window.getComputedStyle(cards[0]).marginRight);
        const totalCardWidth = cardWidth + cardMargin;
        
        visibleCards = Math.floor(sliderWrapper.offsetWidth / totalCardWidth);
        if (visibleCards < 1) visibleCards = 1;

        const moveAmount = currentIndex * totalCardWidth;
        slider.style.transform = `translateX(-${moveAmount}px)`;

        prevBtn.classList.toggle('reviews__nav-button--disabled', currentIndex === 0);
        nextBtn.classList.toggle('reviews__nav-button--disabled', currentIndex >= cards.length - visibleCards);
        
        prevBtn.disabled = (currentIndex === 0);
        nextBtn.disabled = (currentIndex >= cards.length - visibleCards);
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
});

