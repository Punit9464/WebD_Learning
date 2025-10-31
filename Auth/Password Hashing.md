# Password hashing
- Storing raw passwords in database is dangerous
- So instead we hash the password so that it is not easily reversed.

```js
npm install bcrypt // used for hashing

const bcrypt = require("bcrypt");

app.post("/register", async(req, res) => {
    const { email, password } = req.body;

    // hash the password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({ email, password: hashedPassword });
    return res.json({ messasge: "User registered" });
});


// comparing passwords
app.get("/login", async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.json({ error: "Invalid Credentials" });

    return res.json({ message: "Login successful" });
});
```

