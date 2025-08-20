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


# Rest Operator
