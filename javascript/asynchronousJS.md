# Single Threaded Model
- JS is a single threaded model i.e. it executes single task at a time
- But it can lead to **UI Blocking** while performing long running tasks
- Example - If we are fetching some data from database and calling some API, it can take some time, then till that time we can't interact with UI. 

## How to prevent UI Blocking
- To prevent blocking JS use asynchronous operations and Event Loop.
- Thus instead of waiting for long task to finish, JS offloads it and continue with other tasks on the main thread
- And once the asynchronous task is completed, its result placed in **callback queue**
- The **Event Loop** constantly checks if the main thread is idle. And if it is, it will push the task from callback queue to main thread for execution.

# JS Engine vs Web APIs
- Both are ditstinct but work together in browser's JS runtime environment (similar in Node js but there rather than browser web apis, node js environment have **Node.js Core APIs**)
- The JS Engine is the core program that executes JavaScript code, while Web APIs are functionalities provided by the browser that extend the capabilities of the core language.
- Web APIs are set of interfaces built into the browser that allow JS to interact with browser and computer's environment
    - Example - DOM, Fetch API, timers, geolocation APIs

- The JS environments is the one that holds all these components together. Thus when js engine encounters the Web APIs function, it doesn't execute the function itself , it hands the task off to the Web APIs, which are handled by the browser's own internal threads. Js engine then moves to the next task in the call stack


# MacroTask Queue vs MicroTask Queue
- **MacroTask queue** also known as callback queue or task queue -> Primary queue for events like `setTimeout`, `setInterval`, network requests and DOM events 
- The event loop processes only one macrotask at a time, after each macrotask, event loop checks in microtask queue and if its not empty all its tasks will get execute first
- **MicroTask Queue** - This queue is for tasks with a higher priority like promises(.then(), .catch()) and async/await.
- The event loop processes all microtasks queue tasks before moving to next macrotask.


**NOTE:** `MicroTask Priority > MacroTask Priority`

# Event Loop Life Cycle
- `Call Stack Empty ➡️ Run one Macrotask ➡️ Run all Microtasks ➡️ Render ➡️ Repeat`


- The JavaScript engine completes the current function on the call stack. The stack must be empty before the Event Loop can do anything.

- In one event loop life cycle,
    - The Event Loop first checks microtask queue after the stack is empty, if some task is left there, it executes it.

    - The Event Loop picks one macrotask from the macrotask queue and pushes it onto the call stack.

    - After that macrotask completes and the call stack is empty again, the Event Loop then checks the microtask queue.

    - It processes all microtasks in that queue, one after the other, until the queue is empty.

    - Only after the microtask queue is empty then the Event Loop move on to the next macrotask in the queue


<br><br>

# Promises in JS
- It is an object that represents eventual completion or failure of an asynchronous task and its resulting value.

### States of Promises
- `pending` - Initial State, Async operation has not been completed yet.
- `fulfilled` - Operation completed Successfully, `Promise` now contains the result.
- `rejected` - Operation failed, `Promise` now contains failure reason.

**Once**, a promise is either fulfilled or rejected it si considered as **settled**. A settled promise doesn't change its state again.


### Instance Methods
- These methods are used to handle all the outcome of a promise. They are chained to a `Promise` object.
- **.then()**: 
    - method used to schedule a callback to be executed when promise is fulfilled.
    - It has optional second arguement for promise rejection.
    - `promise.then(successCallback, failureCallback)`
- **.catch()**: 
    - method used to handle error when promise is rejected.
    - Just a shortcut of `.then(null, errorCallback)`.
    - `promise.catch(errorCallback)`
- **finally**:
    - method schedules a callback when promise is settled.
    - Used for hiding loader / spinner etc.

```js
const promise = new Promise((resolve, reject) => {
    let success = true;

    if(success) {
        resolve("Task Completed");
    } else {
        reject("Task Failed");
    }
});

promise
    .then((result) => console.log(result)) // Task Completed
    .catch((er) => console.error(er)) // Task Failed
    .finally(() => console.log("Promise is Settled")); // Always runs
```


### Static Methods
- These methods can be directly called on `Promise` constructor (no need to create promise object) and are used to manage multiple multiple promises simultaneously.

1. **Promise.all()**:
    - Takes an iterable (like an array) of promises and returns a single promise.
    - This new promise get fulfilled when all input promises get fulfilled.
    - If even one promise gets rejected, the new `Promise` rejects and returns with reason of first promise that fails.


    ```js
    const promise1 = new Promise((res, rej) => {
        setTimeout(() => {
            res("Promise1 resolved");
        }, 500)
    })

    const promise2 = new Promise((res, rej) => {
        setTimeout(() => {
            res("Promise1 resolved");
        }, 1000)
    })

    const promise3 = new Promise((res, rej) => {
        setTimeout(() => {
            res("Promise1 resolved");
        }, 1500)
    })

    Promise.all([promise1, promise2, promise3])
        .then((result) => console.log(result)) //[ Promise1 resolved, Promise2 resolved, Promise3 resolved]
        .catch((err) => console.log(err));
    ```

2. **Promise.race()**:
    - Takes an iterable (like an array) of promises and returns a single promise.
    - This new Promise is settled as soon as one of the input promises settles.
    - The resulting value is that one of the first promise that settles.
    ```js
    const slowPromise = new Promise((resolve) => {
    setTimeout(() => resolve('Operation completed!'), 5000); // Takes 5 seconds to resolve
    });

    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out!')), 2000); // Rejects after 2 seconds
    });

    Promise.race([slowPromise, timeoutPromise])
    .then((result) => {
        // This won't run in this example because the timeout promise wins
        console.log(result);
    })
    .catch((error) => {
        // This block runs because the timeout promise settles first
        console.error(error.message); // Output: "Operation timed out!"
    });
    ```

3. **Promise.allSettled()**:
    - Takes an iterable (like an array) of promises and returns a single promise.
    - It fulfills when all of the input promises have settled, regardless of their outcome.
    - The result is an array describing each promise's final state and value/reason.

    ```js
    const promise1 = new Promise((resolve) => setTimeout(() => resolve('Result 1'), 500));
    const promise2 = new Promise((_, reject) => setTimeout(() => reject(new Error('Failed to fetch data')), 1000));
    const promise3 = new Promise((resolve) => setTimeout(() => resolve('Result 3'), 750));

    Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        // This block runs after all promises have settled, whether they succeeded or failed.
        console.log(results);
        /*
        Output:
        [
            { status: 'fulfilled', value: 'Result 1' },
            { status: 'rejected', reason: Error: Failed to fetch data },
            { status: 'fulfilled', value: 'Result 3' }
        ]
        */
    })
    .catch((error) => {
        // This block will never run with Promise.allSettled()
        console.error(error);
    });
    ```

4. **Promise.any()**:
    - Takes an iterable (like an array) of promises and returns a single promise.
    - The new `Promise` gets fulfilled as soon as any of input promises fulfills.
    - new `Promise` reject if all the input promises gets rejected. The rejection reason is an `AggregateError` object -> which contain all the rejection reasons.
    ```js
    const promise1 = new Promise((_, reject) => setTimeout(() => reject(new Error('Promise 1 failed')), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve('Promise 2 succeeded!'), 500));
    const promise3 = new Promise((_, reject) => setTimeout(() => reject(new Error('Promise 3 failed')), 1500));

    Promise.any([promise1, promise2, promise3])
    .then((result) => {
        // This block runs because promise2 fulfills first
        console.log(result); // Output: 'Promise 2 succeeded!'
    })
    .catch((error) => {
        // This block will not run in this example
        console.error(error);
    });
    ```

<br><br>

# Async/Await in JS
- Modern JS syntax that makes asynchronous, promise-based code look and behave like synchronous code.
- It's build on top of Promises.


### Async 
- `async` functions is a function declared with the `async` keyword.
- It returns a Promise.
- The value returned from an `async` function is wrapped inside a fulfilled promise.

```js
async function getData() {
  return 'Some data';
}

// The function call returns a promise
const promise = getData();

// You can use .then() to get the result
promise.then(result => console.log(result)); // Output: 'Some data'
```

### Await
- `await` can only be used inside async functions.
- It pauses the execution of async function until the Promise it's waiting on settles.
- Once the Promise settles, `await` returns the fulfilled value.
```js
async function getData() {
    console.log("fetching data...");
    const result = await fetch("https://example.com/api/"); // wait till fetch method gets the response
    const data = await result.json(); // wait for converstion to json
    console.log(data); // 
}
```


# Fetch API
- `fetch` is a moden JS API to deal with network requests.
- It returns a `promise` that resolves to **Response** object, representing the result of the request.
- It is asynchronous
- Only rejects its Promise for network errors, doesn't rejects for HTTP status codes like `500-Internal Server Error`. Thus for that, we explicitly check `response.ok`.
- Best Practice to use with async/await and try-catch block:

```js
async function fetchData(url) {
    try{
        const response = await fetch(url, {
            method: "GET", // can be "POST", "DELETE", "PUT"
            headers: {
                "Content-Type": "application/json"
            }
        });

        // check for HTTP Errors (4xx, 5xx)
        if(!response.ok) {
            throw new Error('HTTP ERRROR' + response.status);
        }

        const data = await response.json();
        return data;
    } catch(e) {
        console.error(`An error occurred while fetching data: ${e}`);
    }
}


fetchData("api url").then((res) => console.log(res));
```

<br><br>

# CORS and Pre-Flight Request
- CORS is a security mechanism that allows a web page running on one domain to request resources from another domain.
- Web Browsers uses it to enforce the `same-origin-policy` which by default blocks the requests to a different domain to prevent security vulnerabilities.
- To send a cross origin request that is from `a.com` to `b.com`. Without CORS headers, browser blocks the request. To allow it, server `b.com` must send specific HTTP headers in its response, such as **Access-Control-Allow-Origin**.



### Pre-Flight Request
- A special type of CORS request that a browser sends automatically before the actual request.
- It uses the OPTIONS HTTP method and is sent to the resource on the different domain to ask for permission to make the actual request.
- The browser sends a preflight request when the actual request is considered "non-simple."

- **Non Simple Requests** are having:
    1. Methods other than GET, POST or HEAD.
    2. Custom HTTP headers (not on CORS safelisted request headers)
    3. Content-Type headers other than `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`.