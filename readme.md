# Explanation:
## HTML
The structure has vertical sections and a horizontal scroll wrapper containing horizontal sections.

## CSS: 
The .vertical-section is styled to take the full viewport height. 
The .horizontal-scroll-wrapper is styled to allow horizontal scrolling.

## JavaScript: 
It checks the scroll position. When the user scrolls to the horizontal section, it disables vertical scrolling and enables it again after passing the horizontal section.

## CSS Enhancements: 
The default scrollbar is hidden to give a cleaner look. You can optionally style a custom scrollbar. Smooth transitions (transition) and smooth scrolling (scroll-behavior) are added for a more animated effect.

## JavaScript: 
The wheel event listener is modified to scroll horizontally with a smooth animation. The scrolling speed can be adjusted by changing the multiplier for scrollAmount.

## Animation: 
The smooth transition in the CSS gives a slider-like feel when scrolling through the horizontal sections.

# Solution provided with the Swiper.

it is not a straight forward solution and the behaviro is a bit bugy since it relies on the plugin.
I do prefer to use a plugin free like the first version to acheive this.

here you go how to implement same concept with swiper.

To integrate the Swiper.js is to manage the vertical scroll behavior based on the position of the Swiper slider in the viewport and to utilize Swiper's own methods for horizontal scrolling.

### Steps to Integrate:

1. **Initialize Swiper with Mousewheel Control**: Initialize the Swiper slider with the mousewheel control enabled. This allows for horizontal scrolling within the slider using the mouse wheel.

2. **Manage Vertical Scrolling**: Adapt the script to check if the Swiper slider is in view and disable vertical scrolling when it is. Re-enable vertical scrolling when you scroll past the slider.

Here's the modified JavaScript code with Swiper integration:

### JavaScript with Swiper.js and Custom Scrolling:

```javascript
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
```

### Explanation:

1. **Swiper Initialization**: The Swiper is initialized with mousewheel control, allowing horizontal scrolling within the swiper.

2. **Scroll Event Listener**: The `scroll` event listener checks if the Swiper container is currently in the viewport. If it is, it disables vertical scrolling (`overflowY: 'hidden'`).

3. **Wheel Event Listener on Swiper Container**: The `wheel` event listener on the Swiper container now uses Swiper's `slideNext` and `slidePrev` methods for horizontal scrolling. This ensures a smooth, native horizontal scroll experience provided by Swiper.js.

4. **Managing Vertical Scroll**: Once the user scrolls past the Swiper container, vertical scrolling is re-enabled.

This script effectively integrates the Swiper slider with the custom scrolling behavior, providing a seamless user experience where the page scrolls vertically, pauses for horizontal scrolling within the Swiper section, and then continues with vertical scrolling.
