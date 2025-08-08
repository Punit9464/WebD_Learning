# What is JavaScript ?
- High Level - nearer to human language
- dyanmically typed - change type in run time
- Single threaded - works over a single process 
- Interpreted or Just In Time Compiled (Not a Compiled Language)

# Where JS runs ?
- Browser 
- Node.js
- Mobile - React Native
- Desktop - Electron
- Microcontrollers
- MongoDB - query language as JS

# What is EcmaScript ?
- Standard template for scripting languages that defines rules, syntax and core features
- JavaScript is implementation of this blueprint.
- Es6 is an release of ES.

# Three ways to include JS in html Document
- Inline:
```html
<button onclick="alert('Hello Punit!');">Click Here</button>
```
- Internal:
```html
<script>
    console.log('This is internal JavaScript.');
</script>
```
- External:
```html
<script src="index.js"></script>
```

# Async vs Defer attributes for External Script
```html
<script src="index.js" async></script>
<script src="index.js" defer></script>
```

- Defer:
    1. Downloads the script while parsing HTML
    2. Executed only after HTML is Fully Parsed.
    3. Script Execution is Ordered as per HTML document.
    4. Use Case: Scripts depending on Fully Loaded DOM.

- Async:
    1. Downloaded asynchronously in the background
    2. Executed as soon as it is downloaded, without waiting for HTML to be parsed.
    3. Script Execution is not ordered.
    4. Use Case: That are independent of DOM.

# Differences Between Var, Let, Const
### Var
- It is function scoped
```js
if(true){
    var x = 10;
}
console.log(x); // consoles: 10 (because it is not block scoped)
```
- Hoisted at the top of their function or Global Scope.
- We can use a var before it's declared, with a value of "undefined".
```js
console.log(y); // undefined
var y = 20;
```
- Reassignment: We can re-assign and redeclare a `var` variable.
```js
var z = 30;
var z = 40; // redeclare
z = 50; // reassign
``` 


### Let
- was introduced in ES6
- It is Block Scoped.
```js
if(true){
    let a = 10;
}
console.log(a); //Reference Error: a is not defined.
```
- Hoisted but it is in **Temporal Dead Zone**. Thus, we cannot access the variable before it's declared.
- Reassignment: We can re-assign a let variable but not re-declare.
#### Temporal Dead Zone
Time between entering the scope and actual declaration, it's a feature that enforces safer and more predictable variable usage.

### Const
- It is Block Scoped
- hoisting is same as `let`
- Reassignment and redeclaration is not possible.
```js
const x = 90;
x = 1000; // TypeError: Assignment to constant variable.
```

<br><br>

# Primitive Data Types
- not an object and doesn't have any methods
- All primitives are immutable, can be reassigned cannot be changed.
```js
let str = "hello";
str[0] = "H";
console.log(str); // does nothing consoles: hello

//Re-assign
str = "Hello";
console.log(str); // consoles: Hello
```

eg: Numbers = Float + Int, Strings,  Boolean, Null, Undefined, Symbol, BigInt.

# Non Primitive Data Types
- Mutable and stored as references in memory.
- Eg: Objects (Key value pairs), Arrays, Date, Function, RegExp

# Functions
1. General function
    ```js
    function functionName() {}
    ```
    - Hoisted
    - Binds its own `this`
    - Has its own arguements object
2. Function Expression
    ```js
    const functionName = function() {}
    ```
    - Not Hoisted - similar to let, const
    - Binds its own `this`
    - has its own arguements object
3. Arrow Functions
    ```js
    const functionName = () => {}
    ```
    - Not Hoisted - similar to let, const
    - Inherits `this` from outer scope
    - No Arguements
    - Introduced in ES6

## `this` Context in Arrow Functions and General Functions
- Arrow functions do not have their own `this` context, they inherit from their parent scope. (lexical scope).

Example 1: In Objects
```js
const user = {
    name: "Punit",
    regularFunction: function() {
        console.log(this.name);
    },
    arrowFunction: () => {
        console.log(this.name); 
    }
}

user.regularFunction(); //Punit
user.arrowFunction(); // undefined because `this` here refers to global object
```

Example 2: In Standalone Functions - this refers to global object
```js
function main() {
    let username = "Mansi";
    console.log(this); // this -> global object
    console.log(this.username) // undefined 
}
```

Example 3: In Node.js Environment - if we do only console outside of any scope.
```js
console.log(this); // this -> {}
```

Example 4: Standalone Arrow function
```js
const main = () => {
    console.log(this); // {}
    console.log(this.undefined) //undefined
}
```

# Higher Order Functions
- A higher order function is a function that can take either one or more functions as a arguement or returns a function itself as a result. These are called **First Class Citizens**, meaning they can be treated like other values such as string or integer values.


Example:
```js
function main(func) {
    func(); // a function
}

// OR 

function main() {
    return function() {
        return "I am a function";
    }
}
```

# CallBacks
A callback function is a function that is passed as an arguement and is executed later.
```js
const nums = [1, 2, 3];
const doubledNums = nums.map(function(num) {
    return num * 2;
});

console.log(doubledNums); // [2, 4, 6];
```
- CallBacks are used for:
    1. Asynchronous functions
    2. Encapsulation

# Client Side APIs

Navigator - Browser Object that gives info about Browser and user environment.

### GeoLocation API
- allows to access a user's geographical location.
```js
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

function successCallback(position) {
// on success
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
}

function errorCallBack() {
// on error
}
```
- It Will go to errorCallBack if user denied the Browser for location sharing or request not sent from HTTPS.

### Web Storage API
Allows web applications to store key - value pairs in a browser.
#### localStorage
- Stores data with no expiration date
- Data persists even after the browser or window is closed or reopened. 
- Useful for storing User preferences, cart content etc.
```js
localStorage.setItem("gadhi", "Mansi");
const gadhi = localStorage.getItem("gadhi");
localStorage.removeItem("gadhi");
localStorage.clear();
```


#### Session Storage
- Stores data for single session.
- Data is cleared when tab is closed.
- Useful for storing temporary data.
```js
sessionStorage.setItem("name", "Punit");
```

#### Limitations:
1. Same origin policy - prevents one website from reading the data of another.
2. Size Limit - 5MB to 10MB.
3. String Based - when need to store arrays or objects use `JSON.stringify()` and `JSON.parse()`.
