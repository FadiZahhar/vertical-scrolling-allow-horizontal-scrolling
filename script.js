document.addEventListener("DOMContentLoaded", function() {
    const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');
    let isHorizontalScrollActive = false;

    window.addEventListener('scroll', function() {
        const topOfHorizontal = horizontalWrapper.offsetTop;
        const bottomOfHorizontal = topOfHorizontal + horizontalWrapper.offsetHeight;

        if (window.scrollY >= topOfHorizontal && window.scrollY < bottomOfHorizontal) {
            if (!isHorizontalScrollActive) {
                isHorizontalScrollActive = true;
                document.body.style.overflowY = 'hidden';
            }
        } else {
            if (isHorizontalScrollActive) {
                isHorizontalScrollActive = false;
                document.body.style.overflowY = 'scroll';
            }
        }
    });

    horizontalWrapper.addEventListener('wheel', function(event) {
        event.preventDefault();

        const totalWidth = this.scrollWidth;
        const currentScroll = this.scrollLeft + this.offsetWidth;

        // Calculate the scroll amount (you can adjust the multiplier for speed)
        const scrollAmount = event.deltaY * 2;

        // Smooth horizontal scroll
        this.scrollLeft += scrollAmount;

        // Enable vertical scrolling at the end
        if (currentScroll >= totalWidth) {
            document.body.style.overflowY = 'scroll';
            window.scrollBy(0, 10);
        }
    });
});
