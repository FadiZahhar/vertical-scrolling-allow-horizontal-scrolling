function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function disableScroll() {
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    // Optional: Disable keydown events for keys that can scroll the page
    document.addEventListener('keydown', preventScrollForKeyEvents, { passive: false });
    document.documentElement.classList.add('no-scroll');
}

function enableScroll() {
    document.removeEventListener('wheel', preventScroll, { passive: false });
    document.removeEventListener('touchmove', preventScroll, { passive: false });
    document.removeEventListener('keydown', preventScrollForKeyEvents, { passive: false });
    document.documentElement.classList.remove('no-scroll');
}

function preventScrollForKeyEvents(e) {
    // keys that can cause scrolling
    if (['ArrowDown', 'ArrowUp', 'Space', 'PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
    }
}

// Function to get the Y-offset of an element
function getElementY(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top;
}

// Get the Y-offset of the swiper container
var swiperPosition = getElementY('.mySwiper');


document.addEventListener("DOMContentLoaded", function() {

    let onetime = true;

    // Initialize Swiper with loop set to false initially
    var swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false, // Loop is initially false
        // other configurations
    });

    // Get the Y-offset of the swiper container
    var swiperPosition = getElementY('.mySwiper');

    /*swiper.on('autoplayStart', function () {
        console.log('Reached the beginning of the swiper!');
        disableScroll();
    });*/

    swiper.on('reachEnd', function () {
        console.log('Reached the end of the swiper!',onetime);
            if(onetime) {
                    enableScroll();
                    onetime =false;
            }
                //swiper.autoplay.stop();
                //window.scrollBy(0, 10);
    });

    // Scroll event handler function
function handleScrollEvent() {
    var scrollPosition = window.pageYOffset;
    console.log("scrollPosition",scrollPosition);
    // Check if scroll position is approximately at the swiper position
    if (Math.abs(scrollPosition) >= swiperPosition) { // condition to check if scroll is on the position or above of swiper
        if(onetime) {
        disableScroll();
            // Change the loop setting to true and update the Swiper
        swiper.params.loop = true;
        swiper.update();
        swiper.autoplay.start();
        }
      
  
      // Additional logic for swiper auto-scrolling can be added here
  
      // Remove the scroll event listener after it has been executed
      window.removeEventListener('scroll', handleScrollEvent);
    }
  }

  // Add the scroll event listener
    window.addEventListener('scroll', handleScrollEvent);  


});
