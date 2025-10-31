# XSS Attacks
- Cross Site Scripting occurs when an attacker injects malicious JavaScript into web pages viewed by the Users -> for example through the input field or query parameters

- `helmet` package comes in -> adds HTTP headers that protect your app from known web vulnerabilities, including XSS.

```js
npm install helmet // instalation

const helmet = require("helmet");
app.use(helmet())
```

# Rate Limiting
- To protect your server from brute-force, DDoS, or bot attacks, limit how many requests a client can make within a time window.
- Using `express-rate-limit`

```js
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // Max 100 requests per IP
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
```

# Sanitizing User Input
- Attackers can inject malicious content (SQL injection, XSS payloads, etc.) through input fields. Sanitization removes suspicious characters or scripts before processing or storing data.

```js
npm install express-mongo-sanitize
npm install xss-clean

const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");

app.use(mongoSanitize()); // prevent sql injection
app.use(xssClean()); // prevent html/js injection
```