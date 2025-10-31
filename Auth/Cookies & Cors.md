# Cookies
- Temporary storage place in browser
- Used to store tokens (especially refresh tokens) securely on the client side.

Parsing Cookies on Backend Side:
```js
npm install cookie-parser // install parser

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// now access cookies values in requests like
console.log(req.cookies);

// to set cookies
const refreshToken = "example-token";

res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevents from xss
    secure: true,   // only over HTTPS
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

# Cors (Cross origin resource sharing)
- How to implement in backend:
```js
npm install cors // install cors package

const cors = require("cors");
app.use(cors());

// OR

app.use(cors({
    origin: "http://localhost:5173/", // specific origin
    credentials: true // for sharing cookies too
}));
```