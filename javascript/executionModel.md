# What is JavaScript Engine ?
- A JavaScript engine is a program that runs javascript code.
- Most well known is V8, developed by Google for Chrome, Node.js

## V8 Engine
- High Performance engine written in C++
- Responsible for compiling JS code into machine code
- It uses JIT (Just in Time) compilation process which involves - 
    1. **Parsing** - JS Source code is parsed into an Abstract Syntax Tree (AST).
    2. **Interpreting** - AST is interpreted and bytecode is generated.
    3. **Compilation** - Bytecode is compiled into optimized machine code.

- **Memory Heap** = 
    1. Basically storage for non primitive data type, that doesn't have fixed size.
    2. It is unstructured.
    3. Garbage collector manages memory in heap.
- **Call Stack** = It is a data structure where the execution of the functions is being tracked. It helps in maintaining the order of execution / execution context.

<br><br>

# Execution Context
- Basically the environment where code is executed.
- It is an abstract container that holds info about current state of code being run 
- It's a concept that is implemented by JavaScript engine.

## Two types of Execution Context
- **Global Execution Context** - 
    1. Default context created when js file is first loaded. 
    2. It represents global scope of your code containing all global functions, variables, this(window or object). 
    3. Only 1 GEC exists.


```java
Global Execution Context
│
├── Variable Environment (VE)   ← "var" lives here
│     a: undefined
│
└── Lexical Environment (LE)    ← "let" and "const" live here
      b: <uninitialized>  // in TDZ
      c: <uninitialized>  // in TDZ
```

- **Function Execution Context** - 
    1. Created everytime a function is called. 
    2. Has its own variables, parameters and this value. 
    3. Can access it's parent scope (lexical scope).

## Phases of a Execution Context
- **Creation Phase:** = Variables and function declarations are stored in memory (Hoisting happens here). `this` is determined for scope.

- **Execution Phase** = Code runs line by line and variables get their assigned values.
<br><br>

# Lexical Environment
- A data structure that maps variable/function names to their values for a specific scope.
- It is created everytime we enter a new scope.
- Local Environment + reference to its parent's lexical scope.

**NOTE:** In Block scope, new execution context is not created, but a lexical environment is created inside current execution context.


- **Scope Chain** = Chain we get when we follow the outer lexical environment references from current lexical environment outward until we reach the global environment.
    1. JS first looks into the current lexical environment.
    2. If not found, it follows the outer reference to the parent environment.
    3. This continues until it reaches the global environment or throws a Reference Error.
<br><br>

# Closures
- A Closure is a combination of a function and the lexical environment within which that function was declared
- Even if the outer function is gone from the call stack, the inner function can still access the variables from that environment, because the JS engine keeps them alive in memory as long as they are references.

**NOTE:** 
- Closures capture the variables, not the values, so if value changes clouse receives the updated value.
- They can accidentally cause memory leaks if u keep reference to large objects unnecessary
- Created automatically in JS wherever you have a nested function.


```js
function createCounter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

const counterA = createCounter();
console.log(counterA()); // 1
console.log(counterA()); // 2
```