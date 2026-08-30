# Architecture

Client -> Server (Node.js)


### Event Loop
- Kind of a machine that watches over the event queue.
- Picks a request from Queue on FIFO principle.

### Thread Pool
- Taken from "Libuv" library.
- A pool that holds workers or threads.
- These threads are responsible for fulfilling the blocking operations.
- Often handle the non blocking operations that couldn't be handled by OS.


## Types of Threads in Node.js
1. One is given by Libuv based Thread pool (Automatic in Node.js)
2. Other is explicit by developer using Worker Thread Module.

- Difference between them is:
    - Libuv based thread pool is managed automatically by node.js / internals
    - Worker Thread Pools need to be managed explicitly by developer.
    - Libuv Thread pools don't have their own Event loop while Worker Threads do have.



### Default Behavior of Libuv Thread Pool:
- By Default there are 4 workers.
- This size is increasable -> No. of cores (Maximum)
```js
const os = require("os");
```



#### A request could be of two types - Blocking Operations (Synchronous Tasks), Non-Blocking operations (Asynchronous Tasks)

### Procedure
```ruby
1. Request Goes to Event Queue.
2. Each Request from Event Queue goes to Event Loop.
3. If request was non - blocking -> then it processes it. Here it is how:
    - Task is offloaded to OS Kernel. (using system tools like "epoll" in Linux).
    - If task cannot be handled by the task is then handled by "Libuv" Thread pool.
4. Else:
    - It goes to the thread pool.
    - If thread pool has a worker -> task assinged to it. -> Work Done -> Worker goes back to thread pool -> Response returned.
```

#### P.S: Always write Non-Blocking Code