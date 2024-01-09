document.addEventListener("DOMContentLoaded", function() {
    let isHorizontalScroll = false;

    window.addEventListener('scroll', function() {
        const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');

        if (window.scrollY >= horizontalWrapper.offsetTop && 
            window.scrollY < horizontalWrapper.offsetTop + horizontalWrapper.offsetHeight) {
            if (!isHorizontalScroll) {
                isHorizontalScroll = true;
                // Disable vertical scroll
                document.body.style.overflowY = 'hidden';
            }
        } else {
            if (isHorizontalScroll) {
                isHorizontalScroll = false;
                // Enable vertical scroll
                document.body.style.overflowY = 'scroll';
            }
        }
    });
});
