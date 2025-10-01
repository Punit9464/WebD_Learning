# DOM
- Document Object Model
- Programming Interface provided by browser for web documents (HTML or XML)
- Representation of the entire webpage as a tree of objects

# Tree Structure of DOM
- Root of tree -> Document
- Every Tag is represented by node(an object which contains its properties, methods)
- This tree structure is used to mirror HTML document so that scripting lang like JS can interact with it

# How Browser parses HTML to build DOM tree
1. HTML source code -> Token 
    - Browser will read character by character and breaks them into tokens(`start tags`, `end tags`, `text`,`attributes`)
2. Tokens -> Node
3. Node -> DOM tree
    - Connected in tree like structure showing parent child relationship
4. It is incremental process 
    - DOM is built progressively as HTML loads

# Types of Nodes in DOM
1. Document Node 
    - Root node of every DOM tree.
    - Represents the entire HTML
2. Element Nodes 
    - Represent HTML elements(tags) 
    - They can have attributes, text and other element nodes inside them
3. Text Nodes
    - Represent actual text inside element
    - Every bit of visible text in the page is stored as text node
4. Attribute Nodes
    - Not a children of element nodes, instead they are part of it
    - Represent attribute of an elements
5. Comment Nodes 
    - Represent HTML comments (`<!--   -->`)


```js
<p>Mansi Narang <a href="/punit"> punit </a> </p>

// DOM STRUCTURE
p (element node)
 ├── "Mansi Narang "   (Text Node)     //p.children[0]
 ├── a (Element Node)                   //p.children[1]
 │     └── " punit "     (Text Node)     //p.children[1][0]
 └── " "                 (Text Node → whitespace after </a>)

```

- We can access children of an element node by
```js
p.children   // HTML collection of all element nodes

//or

p.childNodes   // NodeList of all nodes 


// can access specific node using index
```

<br><br>

# DOM Operations
## Selecting Elements
1. By ID
```js
document.getElementById('id of the element'); // Single Element
```
2. By Class name
```js
document.getElementsByClassName("Mansi"); // Multiple Elements in HTMLCollection
```
3. By Tag name
```js
document.getElementsByTagName("p") // Returns HTMLCollection by tags
```
4. Query Selector
```js
// we mention css selectors here like #idName, .className, tagName
document.querySelector('css-selector'); // returns the first matching element

document.querySelectorAll('css-selector'); // returns all the elements in HTMLCollection of the matching css selector
```

## Manipulating Elements
1. By `textContent`
    - manipulates the plain text content of the tag
    ```js
    let element = document.querySelector("#mansi");
    console.log(element.textContent); // get text content
    element.textContent = "Mansi"; // changes the text content
    ```
2. By `innerHTML`
    - manipualtes the HTML of the tag
    ```js
    let element = document.querySelector("#mansi");
    console.log(element.innerHTML); // access the inner HTML
    element.innerHTML = `<a href=""> </a>` // chnges the text + html inside element


## Manipulating Element Attributes
- We can get, set, remove attributes of an element
```js
let img = document.querySelector("logo");

console.log(img.getAttribute("src"));  // it will give src attribute valaue

img.setAttribute("src", "newLogo.png"); // it will chnge it 
//or
img.src = "newLogo.png"

img.removeAttribute("alt");
```


## Manipulating Element Styles
- We can chnge element style using `style` property
```js
//select any element
element.style.color = 'red'
element.style.fontSize = "20px"


// Add/Remove CSS using classList
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active"); // add or remove
```

## Creating, Appending and Removing Elements
```js
let el = document.createElement('div'); // creating the element
el.textContent = "mansi"; // setting the text content

document.body.appendChild(el); // append the child element

document.body.removeChild(el); // remove the child element

el.remove(); // remove the element itself
```


## Navigating the DOM
1. `parentNode` - returns the parent node of the element
2. `children` - returns the HTML collection of only element nodes
3. `childNodes` - return Node list of all child nodes (includes text, comment node also)
4. `firstChild` / `lastChild` - returns the first / last node of any type(element, text, comment)
5. `firstElementChild` / `lastElementChild` - returns only element nodes (not text and comment)
6. `nextSibling` / `previousSibling` - returns the next / previous node of any type
7. `closest` - find the nearest ancestor(including itself) that matches a selector


```html
<div id="container">
  <h1>Title</h1>
  <p id="info">Hello <span>World</span></p>
  <!-- a comment -->
</div>
```

```js
let p = document.getElementById('info');
console.log(p.parentNode.id) //container as div is parent of p


let div = document.querySelector('#container');
console.log(div.children) // [<h1>, <p>]

console.log(div.childNodes) // [text, <h1>, text, <p>, text, comment, text] 
// it takes tab, whitespace and line break as text node


console.log(div.firstChild) // text node or h1 node
console.log(div.lastChild) // text node or comment node

console.log(div.firstElementChild) // h1
console.log(div.lastElementChild) //p


let h1 = document.querySelector("h1");
console.log(h1.nextSibling);        // text node (whitespace)
console.log(h1.nextElementSibling); // <p>
console.log(h1.previousSibling);    // text node (whitespace)
console.log(h1.previousElementSibling); // null (no element before h1)


let span = document.querySelector("span");
console.log(span.closest("p"));       // <p> element
console.log(span.closest("#container")); // <div id="container">
```

<br><br>


# Events and Event Handling
- `Events` are the occurrences or any actions that happens in browser, Example: Clicking a button, page loading or key being pressed etc.
- `Event Handling` is the process of responding to these events.
- `Events Listeners` is a function that waits for a specific event to occur on a particular HTML element. And when the event happens, the listener executes a callback function.

- Ways to add event listener
    - `onclick`, `onhover` - But this way we can add only a single callback to a specific event

    - `addEventListener` -> Using this we can add multiple handlers and all will execute. Also we can delete listeners later.

    ```js
    element.addEventListener(event, function, useCapture)

    // event: type of event to listen -> click, hover
    // function -> handler function that executes
    // useCapture ->  optional boolean value (by default false), determines the event flow phase, whether it will execute in capture time or bubbling time.
    ```


### Common Event Types
1. Mouse Events - click, mouseover, mouseout, dblclick, mouseup, mousedown, mousemove.
2. Keyboard Events - keydown, keypress (deprecated), keyup.
3. Form Events - submit, change, input, focus.
4. Window Events - load, resize, scroll, unload.
5. Clipboard Events - copy, cut, paste.
6. Touch Events (mobile) - touchstart, touchend, touchmove.


### Event Object
- Every event handler gets an object (event or e)
- It contains details about the event.
<br>
**Properties**
- `event.type` - type of event (click, keydown, etc)
- `event.target` - element that triggered the event
- `event.preventDefault()` - stops default action
- `event.stopPropagation()` - stops event bubbling further


### Event Flow
- Order in which event listeners are triggered when an event occurs on an nested element
- Two Phases:
    - **Capturing Phase (Top Down Approach)** - The Event Starts at the window object and travels down through the DOM to the target element.
    - **Bubbling Phase (Down Bottom Approach)** - The event starts at the target element and bubblesup the DOM tree to the window object. Default Behaviour
- We can choose the phase using `useCapture` option in `addEventListener`


### Event Delegation
- A technique where we add single event listener to the parent element instead of adding multiple listeners to each of its child elements.
- The listener then uses `event.target` property to identify which child element triggered the event.
- Improves Performance and Dynamic Content (handler will impose to new child elements also).
```js
// Without Delegation
document.querySelectorAll('li').forEach(li => {
    li.addEventListener("click", function(){
        console.log("LI Clicked");
    });
});

// With Delegation
document.querySelector("ul").addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        console.log("LI Clicked");
    }
});
```