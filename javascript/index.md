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