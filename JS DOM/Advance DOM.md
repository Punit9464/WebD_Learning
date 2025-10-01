# Document Fragments
- Lightweight container for DOM nodes.
- Special type of Node that acts as a temporary workspace holding place for other nodes
- Benefit - Changing in Document Fragment do not cause reflow or repaint.
    - **Reflow (Layout)** - browser recalculates the position, sizes, geometry of elements. Trigerred by width, height, margin, adding or removing elements.
    - **Repaint (Paint)** - Process of redrawing an element on screen. Less Expensive trigerred when visual property changes - color, visiblity, background-color.
    - Reflow is Expensive than Repaint.

- Working - we build complex DOM structure inside fragment. Once completed, append the entire fragment to the main DOM. Triggers only a single performance when need to add any elements in page.
```js
let fragment = document.createDocumentFragment();

for(let i = 0; i < 10000; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = i;
    fragment.appendChild(listItem);
}

document.querySelector('ul').appendChild(fragment);
```
**Only 1 reflow/repaint will happen here**

<br><br>

# Debouncing and Throttling
### Debouncing 
- Makes sure a function runs only after the user stops triggering the event for a specified time.
- Example: Used in Search Input, autocomplete etc.
- Basically resets the timer after each input of the user, eventually handler is called for the last input that resets the timer.

### Throttling
- Makes sure that a function runs at most every X milliseconds, no matter how many times the event is trigerred.
- Used for scroll events, mouse move tracking, button spamming prevention.

<br><br>

# Mutation Observer API
- An API that provides a way to watch for changes to the DOM.
- Can monitor additions or removals  of elements, changes to attributes or modification of text content.
- More efficient than `setInterval` DOM polling

```js
let target = document.getElementById("container");

let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log("Change detected:", mutation);
  });
});

observer.observe(target, {
  childList: true,
  attributes: true,
  subtree: true
});

// Later, you can stop:
observer.disconnect();
```
- Use Case: dynamically update UI when new content is added.


<br><br>


# Intersection Observer API
- Its a browser API that lets you asynchronously observe when an element enters or leaves the viewport (or a parent container)
- Use cases: 
    - **Lazy Loading** (Loading images or other resources only when they enter the viewport)
    - **Infinite Scrolling** (Loading more content as user scrolls to bottom of page)
    - **Ad viewability Tracking** (Determining if an ad is currently visible on screen)

```js
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Element is visible:", entry.target);
    } else {
      console.log("Element is not visible:", entry.target);
    }
  });
}, {
  root: null,          // default = viewport
  rootMargin: "0px",   // margin around root
  threshold: 0.5       // % of element visible (0–1)
});

// Start observing
let box = document.querySelector(".box");
observer.observe(box);

// Stop observing later
observer.unobserve(box);
```