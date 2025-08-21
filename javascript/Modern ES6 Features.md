# Destructuring
- Destructuring provides a concise way to unpack values from arrays or properties from objects into distinct variables.

## Array Destructring
```js
const numbers = [10, 20, 30];

const [a, b] = numbers;
console.log(a, b) // 10 20

const [a, ,c] = numbers;
console.log(a, c) // 10 30
```

### Nested Arrays Destructuring
```js
const userData = ["Punit", 20, ["Chandigarh", "India"]];

const [name, age, [city, country]] = userData;
console.log(name, city); // Punit Chandigarh
```

## Object Destructuring
```js
const person = {
    name: "Punit",
    age: 20
};

const { name } = person;
console.log(name); // Punit
```

### Default Values and Aliasing
- We can provide a default value to the key in case it doesn't exist in the object
- And we can use another name for key.

```js
const settings = {
    "theme": "dark"
};

const { theme: defaultTheme, fontSize = 16 } = settings;

console.log(defaultTheme, fontSize); // dark 16
```

<br><br>

# Spread Operator
- It unpacks the elements of an iterable or the properties of an object. 
- Primary use - to create copy or combine arrays or objects

```js
const arr = [1, 2, 3];
const arr2 = [...arr, 4, 5];

console.log(arr2) // 1 2 3 4 5


const user = {
    name: "Punit",
    age: 20
};

const updatedUser = {
    ...user,
    city: "Chandigarh"
};

console.log(updatedUser); // { name: "Punit", age: 20, city: "Chandigarh" }
```
<br><br>

# Rest Operator
- It allows a function to take indefinite number of arguments as an array.
- Defined by `...parameterName` 
- We can use array methods on it.
- It is always the last parameter of a function. -> 
```js
function (a, b, ...args) {}
```


### Diff between Rest and Spread
- Rest parameters (...) are used in function definitions to gather an indefinite number of arguments into an array.

- Spread syntax (...) is used in function calls or array literals to expand an iterable (like an array) into individual elements.

<br><br>

# Template Literals
- Feature in JS that provide a more flexible and readable way to create strings.
- They are defined using backticks (`)

### String interpolation
- It allows us to embed expressions directly within a template literal.
- Use `${expression}` to insert a value.
- Alternative for string concatenation
```js
const name = 'Punit';
const greeting = `Hello ${name}!`
console.log(greeting); // Hello Punit
```


### Multi line Strings
- It simplify creating strings that have span multiple lines.
- No need to use `\n` characters.
```js
const multilineString = `
Hello 
Punit
`;

console.log(multilineString);
```


<br><br>

# Import / Export 

## Export
- This is used to export classes, functions, variables etc from a module to be used in another module.

### Named Exports
- Allows to export multiple values from a single module.
- When importing you must use the same name.

```js
export const PI = 3.14
export function greet() {
    return "Hello";
}

// OR

const PI = 3.14;
function greet() {
    return "Hello";
}

export { PI, greet };
```

### Default Exports
- Exports a single value from a module.
- Only one default export per module.
- Don't need to use { } when importing a default value.
- Can give any name while importing.

```js
const PI = 3.14;

export function() {}// named export

export default PI; // default export
```

## Import
- Used to bring a exported value from another module into current module.

### Named Imports
- to import the named exports, you must use the same name and encclose the names in curly braces.
```js
import { PI, greet } from 'my-module.js';
```

### Default Import
- to import a default export, you provide a name for it directly without using `{}`.
```js
import PI from 'my-module.js';
```

### Mixed
```js
import defaultExport, { nameImport1, namedImport2 } from 'my-module.js';
```
<br><br>

# Tree Shaking
- Tree shaking = removing unused code from your final JavaScript bundle during the build process (usually with Webpack, Rollup, ESBuild, etc.). It relies on ES6 import/export being static and analyzable.
- This significantly reduces the size of application bundle, leading to faster loading times and better performance.    