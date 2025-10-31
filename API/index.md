# API
- Application Programming Interface
- Tells that how your frontend or client communicates with your backend

- RestFul API is the most common

# REST
- REST (Representational State Transfer) is an architectural style used to design web APIs.
- It defines how systems communicate over HTTP — in a simple, stateless, and standardized way.

## Rest is Stateless - What that means
- Each request is independent.
- The server doesn’t store info about previous requests.
Example:

```yml
When you log in → server sends a JWT token.

For every new request → client must send the token again in headers.

This makes REST scalable because any server can handle any request (no memory of sessions needed).
```

# Axios
- Axios is a third-party HTTP client library built on top of `XMLHttpRequest` that makes API calls simpler and more powerful than using fetch.

### ⚠️ Limitations of fetch
- Doesn’t automatically handle JSON parsing errors
- Doesn’t support request cancellation
- No built-in timeout or interceptors
- Must manually handle status errors (e.g. 404, 500)
- Repetitive boilerplate for headers and configs

### Why to use Axios instead
- Simpler Syntax
- Auto JSON transform
- Request Timeout
- Error Handling
- Cancel requests
- Progress Tracking
- Older browser support
```js
// GET request
axios.get('https://api.example.com/users')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// POST request
axios.post('https://api.example.com/users', { name: 'John' })
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

## Interceptors
- Interceptors are Axios features that allow you to run code before a request is sent or after a response is received.

- Useful for:
    1. Adding JWT tokens automatically
    2. Logging requests
    3. Handling global errors
    4. Refreshing expired tokens

**Request Interceptor Example**
```js
axios.interceptors.request.use(
  (config) => {
    // Automatically attach token to headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Continue with request
  },
  (error) => Promise.reject(error)
);
```

**Response Interceptor Example**
```js
axios.interceptors.response.use(
  (response) => response, // Simply return response
  (error) => {
    // If unauthorized, redirect to login
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Redirecting...');
    }
    return Promise.reject(error);
  }
);
```

## Patterns of Using Axios
**Good Practice: Create an Axios Instance**
```js
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// Add interceptors here
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```