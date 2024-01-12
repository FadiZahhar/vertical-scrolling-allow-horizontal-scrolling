# Explanation:
Requirement Specification for Swiper.js Implementation

## Swiper Setup:

Implement a Swiper slider with exactly three slides.
Triggering Behavior Based on Scroll Position:

The Swiper should be initially inactive (not automatically sliding).
When the user scrolls down the page and reaches the position where the Swiper is located, two actions should occur:
a) The Swiper starts sliding automatically (autoplay).
b) Window scrolling is disabled, preventing the user from scrolling away from the Swiper.
Behavior on Reaching the Last Slide:

Once the user reaches the third (final) slide of the Swiper, two actions should occur:

a. Window scrolling is re-enabled, allowing the user to continue scrolling past the Swiper.
b. The automatic sliding of the Swiper stops.
One-time Behavior:

The entire sequence (starting autoplay and disabling/enabling scroll) should only happen once. If the user scrolls back up and then down again to the Swiper, these behaviors should not re-trigger.
Technical Implementation Notes:

Use JavaScript event listeners to detect when the user's scroll position reaches the Swiper.
Modify Swiper's settings dynamically based on the user's interaction (e.g., enabling autoplay, starting/stopping slides).
Use a flag or a similar mechanism to ensure that the scroll-triggered behaviors only occur once.


## Method Used globaly

1. **`preventScroll` Function**:
    - `e.preventDefault();`: This line stops the default action of the event from happening. For example, in the context of a `wheel` or `touchmove` event, it prevents the usual scrolling behavior of the browser.
    - `e.stopPropagation();`: This stops the event from propagating (or "bubbling up") to parent elements. This is useful if you don't want other event listeners higher up in the DOM to trigger.
    - `return false;`: This is an older way to achieve both `preventDefault()` and `stopPropagation()`. In modern JavaScript, it's more common to see the two methods used explicitly, as done in the first two lines.

2. **`disableScroll` Function**:
    - This function is designed to disable scrolling on the page.
    - `document.addEventListener('wheel', preventScroll, { passive: false });`: Adds an event listener for the mouse wheel event and calls `preventScroll` when this event occurs. `{ passive: false }` ensures that the `preventDefault()` method works correctly to prevent scrolling.
    - `document.addEventListener('touchmove', preventScroll, { passive: false });`: Similarly, this prevents scrolling on touch devices.
    - `document.addEventListener('keydown', preventScrollForKeyEvents, { passive: false });`: This line is for disabling scrolling via keyboard inputs (like arrow keys, spacebar, etc.).
    - `document.documentElement.classList.add('no-scroll');`: Optionally adds a class to the HTML document element, which can be used to apply CSS styles that prevent scrolling (e.g., `overflow: hidden;`).

3. **`enableScroll` Function**:
    - This is the counterpart to `disableScroll`, designed to re-enable scrolling on the page.
    - It removes the event listeners added by `disableScroll`, effectively returning the page to its normal scrolling behavior.
    - `document.documentElement.classList.remove('no-scroll');`: Removes the `no-scroll` class from the HTML document element, reversing any CSS-based scroll prevention.

4. **`preventScrollForKeyEvents` Function**:
    - This function prevents scrolling caused by keydown events for specific keys (e.g., arrow keys, spacebar).
    - It checks if the pressed key is one of the keys that can cause scrolling and, if so, prevents the default action (scrolling).

5. **`getElementY` Function**:
    - This utility function calculates the vertical position (`Y-offset`) of an element relative to the top of the document.
    - It's useful for determining how far down the page a particular element is located.

Overall, this code provides a comprehensive way to control scrolling behavior on a webpage, covering mouse wheel, touch movements, and keyboard inputs. It's particularly useful in scenarios where you need to temporarily disable scrolling, such as when opening a modal window or implementing custom scroll behavior.

The below script sets up a Swiper slider that starts without looping. When the user scrolls to the Swiper's position, it disables further scrolling, enables looping on the Swiper, and starts autoplay. This behavior is intended to happen only once

, as indicated by the onetime flag. After the Swiper reaches the end, it re-enables scrolling and prevents the same sequence from happening again. This kind of functionality is useful for creating interactive scroll experiences on web pages, where specific behaviors are triggered as the user scrolls to certain sections of the page.


1. **DOMContentLoaded Event Listener**:
    - The entire code block is wrapped inside a `document.addEventListener("DOMContentLoaded", function() { ... });`. This ensures that the script runs only after the entire HTML document has been fully loaded, which is necessary to correctly initialize elements like Swiper and calculate positions.

2. **One-time Flag Initialization**:
    - `let onetime = true;`: This variable is a flag to ensure that certain actions within the swiper event listeners are only executed once.

3. **Swiper Initialization**:
    - `var swiper = new Swiper('.mySwiper', {...});`: This initializes the Swiper slider with specific configurations. In this case, the Swiper is set up with `loop: false`, which means it doesn't automatically loop back to the first slide when it reaches the end.

4. **Calculating Swiper's Position**:
    - `var swiperPosition = getElementY('.mySwiper');`: This calculates the vertical position of the Swiper container on the page. The `getElementY` function (not shown in this snippet) likely calculates the distance from the top of the document to the top of the Swiper element.

5. **Swiper Event Listener (reachEnd)**:
    - `swiper.on('reachEnd', function () {...});`: This sets up an event listener that triggers when the Swiper reaches the last slide.
    - Inside this listener, if `onetime` is true, `enableScroll()` is called to re-enable scrolling on the page, and `onetime` is set to false to prevent this code from running again.

6. **Scroll Event Handler**:
    - `function handleScrollEvent() {...}`: This function handles the scroll event.
    - It checks if the current scroll position is at or above the Swiper's position.
    - If `onetime` is true and the condition is met, it disables the scroll (`disableScroll()`), changes the Swiper's loop setting to true, updates the Swiper, and starts Swiper's autoplay.
    - After executing once, it removes the scroll event listener (`window.removeEventListener('scroll', handleScrollEvent);`) to prevent further execution.

7. **Adding the Scroll Event Listener**:
    - `window.addEventListener('scroll', handleScrollEvent);`: This line adds the `handleScrollEvent` function as an event listener for the scroll event.
