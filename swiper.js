document.addEventListener("DOMContentLoaded", function() {
    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 30,
        mousewheel: {
            forceToAxis: true,
        },
        keyboard: {
            enabled: true,
        },
    });

    let isSwiperInView = false;
    const swiperContainer = document.querySelector('.mySwiper');

    window.addEventListener('scroll', function() {
        const topOfSwiper = swiperContainer.offsetTop;
        const bottomOfSwiper = topOfSwiper + swiperContainer.offsetHeight;

        if (window.scrollY >= topOfSwiper && window.scrollY < bottomOfSwiper) {
            if (!isSwiperInView) {
                isSwiperInView = true;
                document.body.style.overflowY = 'hidden';
            }
        } else {
            if (isSwiperInView) {
                isSwiperInView = false;
                document.body.style.overflowY = 'scroll';
            }
        }
    });

    swiperContainer.addEventListener('wheel', function(event) {
        if (isSwiperInView) {
            event.preventDefault();

            const totalWidth = swiperContainer.scrollWidth;
            const currentScroll = swiperContainer.scrollLeft + swiperContainer.offsetWidth;
            const scrollAmount = event.deltaY * 2;

            // Use Swiper's method to slide
            if (scrollAmount > 0) {
                swiper.slideNext();
            } else {
                swiper.slidePrev();
            }

            // Enable vertical scrolling at the end
            if (currentScroll >= totalWidth) {
                document.body.style.overflowY = 'scroll';
                window.scrollBy(0, 10);
            }
        }
    });
});
