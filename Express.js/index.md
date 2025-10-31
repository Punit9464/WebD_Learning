# Express
- It is a framework built on top of Node.js that simplifies building APIs and web servers.

## Installation and setup
```bash
npm install express
```
```js
const express = require('express');
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => console.log("App Started"));
```

## Request And Response Object
So wht happens when we request to the server -> 

- Node receives the HTTP request. You actually get Node’s req and res. 
- Express wraps them. It keeps the original objects but adds shortcuts like:
    - `req.params`, `req.query`, `req.body`
    - `res.json()`, `res.send()`, `res.status()`
- So req and res in Express are just the same Node objects, extended with useful tools.

For Example:
```js
res.send("hello");

// express is doing same thing beind the scenes with raw `res`

res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello');
```

## Middlewares
- Function that execute in sequence between request and response
- It has access to `request` and `response` object and the `next` middleware function (req, res, next);

### Types of Middleware
1. **Application Level Middleware**
- Defined directly on app 
- Bound to instance of `app`.
```js
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

// can give paths as well for specific route

app.use("/api", (req, res, next) => {
    console.log("Hit API Route");
    next();
});
```

2. **Route Level Middleware**
- Bound to instance of `express.Router()`
- Same as Application level but bound to specific group of routes
```js
const router = express.Router();
router.use((req, res, next) => {
    // logic for all routes defined on this router
    next();
});

app.use("/api", router);
```

3. **Built in Middleware**
- `express.json()` - parses json request body
- `express.urlencoded({ extended: true })` - parses urlencoded form -> extended parses nested objects
- `express.static('public')` - serves public files

4. **Third Party Middleware**
- Install and use external packages
- Example: `cors` for enabling `cross origin resource sharing`
```js
const cors = require('cors');
app.use(cors());
```

5. **Custom Middlewares**
- Our own usable middlewares or functions
```js
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if(!token) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    next();
}

app.use("/verify", verifyToken, (req,res) => res.send("Access granted"));
```

<br><br>

## Handling Routes
- Express Application define routes using methods corresponding to HTTP verbs
- Syntax - `app.VERB(path, handler)`
```bash
GET => app.get() - Retrieve data (read)
POST => app.post() - Submit data (create)
PUT => app.put() - Replace an entire resource (update)
PATCH => app.patch() - Partially update a resource (update)
DELETE => app.delete() - Remove a resource (delete)
```

<br><br>

## Using Params and Bodies
1. **Using Query Params**
`GET /users?role=admin`
```js
app.get("/users", (req, res) => {
    const role = req.query.role;
    res.send("Role: " + role);
});
```

2. **Route Params**
`GET /users/10`
```js
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    res.send("ID of the User:", id);
});
```

3. **Request Bodies**
- Used with Post Put Patch
- Make sure you use `app.use(express.json())`
```js
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    res.json({ name, email });
});
```

**Sending JSON Responses**
```js
res.json({ message: "Success": data: users });
// this automatically sets the Content-Type: application/json
```

<br><br>

## Error Handling
1. **Default Error Handler**
- If an error occurs and you do not define a custom error handler, Express's built in error handler will take over 
- It writes the error to the client with the stack trace (in development) and often returns a `500 Internal Server Error`

2. **Error Handling Middleware**
- Function with signature `(err, req, res, next)` placed after all other routes and middleware (i.e in last)
- This middleware will only be executed when an error is passed to `next()` function i.e `next(error)`
```js
app.use((err, res, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// To Trigger it:
app.get("/error", (req, res, next) => {
    const error = new Error("This is a random error");
    next(error);
});
```

3. **Try-Catch**
```js
app.get("/error", (req, res) => {
    try{
        throw new Error("this is some random error");
    } catch(e) {
        console.error(e);
    }
})
```

4. **Error Handler Custom Function**
```js
function errorHandler(func) {
    return async function(req, res, next) {
        try {
            await func(req, res, next);
        } catch(e) {
            console.error(e);
            return res.json({ error: e.message });

            // or 

            next(e); // if having a custom middleware error handler
        }
    }
}


// apply this error handler as:
app.get("/error", errorHandler(async function(req, res) {
    // logic
}))
```