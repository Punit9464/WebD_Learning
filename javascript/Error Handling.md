# try-catch-finally block Structure

- `Try` 
    - this block contains the code that we want to test for potential errors
    - If error occurs in this block, the execution is immediately stopped and control is passed on the `catch` block.

- `Catch`
    - This block is executed only if and only if an error in `try` block.
    - It receives `Error`  object as an arguement, which contains info about error.

- `Finally`
    - This optional block is always executed whether the error was occurred caught or not.

```js
try {
    // code
} catch(e) {
    // e -> Error object
} finally {
    // code to be executed
}
```

# Throwing errors with `throw`
- `throw` allows you to create and throw custom error.
```js
throw new Error("msg here");
```

# Custom Error Type
- We can create our own custom Error type by extending the built-in `Error` class
- to create more meaningful errors
```js
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Mansi Error';
    }
}

function validateInput(input) {
  if (typeof input !== 'string') {
    throw new CustomError('Input must be a string.');
  }
}

try {
  validateInput(123);
} catch (error) {
  if (error instanceof CustomError) {
    console.error('Validation failed:', error.message);
  } else {
    console.error('An unknown error occurred.');
  }
}
```


# Error object properties
- Error obj provides standard set of properties that gives more info about wht went wrong 
1. `name` - name of the error type.
2. `message` - description of error, often passed in constructor
3. `stack` - String representing the call stack at the time the error was created. Crucial for debugging.