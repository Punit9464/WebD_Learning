# Common Array methods

1 . `map()` - Creates a new array by applying a function to each element of the original array
```js
const nums = [1, 2, 3, 4];
const double = nums.map((num) => num * 2);
console.log(double) // 2 4 6 8
```

2. `filter()` - Creates a new array containing only the elements from original arrays that pass a certain test.
```js
const nums = [1, 2, 3, 4];
const evens = nums.filter((num) => num % 2 == 0);
console.log(evens); // 2 4
```

3. `reduce()` - Executes a reducer function on which each element of array, resulting in single output value. Used to sum up values or transform arr into single object.
```js
const nums = [1, 2, 3];
const sum = nums.reduce((acc, val) => acc + val, 0);
console.log(sum); // 6
```

4. `forEach()` - Executes a provided function once for each array element. Doesn't return value, it just iterates.
```js
const nums = [1, 2, 3];
nums.forEach((num) => console.log(num * 2)); // 2 4 6
```

5. `find()` - Returns the first element in the array that satisfies the provided function. If nothing found returns `undefined`.
```js
const nums = [1, 2, 3, 4];
nums.find((num) => num % 2 == 0); // 2
```

6. `findIndex()` - Returns the `index` of the first element in the array that satisfies the provided testing function. If no element passes, it returns `-1`.
```js
const nums = [1, 2, 3, 4];
const idx = nums.findIndex((num) => num % 2 == 0); // 1
```

7. `slice()` - Returns a copy of a portion of an array into a new array. It does not modify the original array. It takes start and end indices as arguments (the end index is not included).
```js
const nums = [1, 2, 3, 4];
const newNums = nums.slice(0, 1); // start, end
console.log(newNums); // [ 1 ]
```

8. `splice()` - Changes the contents of an array by removing or replacing existing elements and/or adding new ones in place. It **modifies** the original array. The first argument is the *start* index, the second is the *deleteCount*, and subsequent arguments are *elements* to add.
```js
const nums = [1, 2, 3, 4];
const numArr = nums.splice(0, 1, 20); // -> delete 1 element from 0th index and insert 20 at that place
console.log(numArr); // [ 1 ]
```

9. `sort()` - Sorts the element of array inplace and returns the sorted array.
    - This method sorts strings properly, but noot numbers because sort first convert numbers to string then sorts them.
    - Thus, for numbers we describe a comparator inside of it.
    ```js
    const nums = [3, 1, 2];
    const sortedArr = nums.sort((a,b) => a-b); // ascending order
    ```


# String and object manipulation
- `split()` - divides a string into array of substrings based on provided separator

```js
const sentence = "Hello world";
const words = sentence.split(' ');
// words is ['Hello', 'world']
```


- `joins()` - joins all elements of array into single string. opposite of split()

```js
const words = ["hello", "world"];
const ans = words.join(' ');
//hello world
```


- `replace()` - string method that returns new string which matches with first occurrence and then replace it with second argument
```js
const message = "Hello world";
const newMessage = message.replace('world', 'universe');
// newMessage = 'Hello universe'
```