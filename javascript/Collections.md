# Collections in JS
- JS provides built-in collection objects that are better suited for specific data storage rather than plain array s or plain objects.
- EG. Map, Set etc.

## Map
- Collection of key-value pairs where keys can be of any data type
- It maintains the insertion order of its elements i.e Ordered
- **Methods**:
    - `set(key, value)` - adds a new key value pair
    - `get(key)` - retrieves a value
    - `has(key)`- checks if a key exists
    - `delete(key)` - removes a key-value pair 
    - `clear()` - removes all elements
    - `size` - returns number of elements

```js
const userMap = new Map();
userMap.set('id', 1);
userMap.set(true, 'active');
userMap.set({ username: 'bob' }, 'user object');

console.log(userMap.get('id')); // Output: 1
console.log(userMap.has('id')); // Output: true
console.log(userMap.size);     // Output: 3
```

## Set
- Collection of unique values.
- Can store values of any data type
- No duplicates
- Ordered as per insertion order
- **Methods**:
    - `add(value)` - adds a new value to the set
    - `has(value)` - checks for the existence of the value
    - `delete(value)` - Remove a value 
    - `clear()` - Removes all values
    - `size` - property that returns the number of elements 
    ```js
    const uniqueNumbers = new Set();
    uniqueNumbers.add(1);
    uniqueNumbers.add(2);
    uniqueNumbers.add(1); // This is ignored

    console.log(uniqueNumbers.has(2)); // Output: true
    console.log(uniqueNumbers.size);   // Output: 2`
    ```