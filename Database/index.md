# SQL 
Structured Query Language -> Used for performing operations over databases

# SQl vs NoSQL
## SQL
- Relational databases (data is stored in tables)
- Example: MySQL, PostgreSQL etc.

## No SQL
- Non Relational Databases (data is stored in document or key value pairs or graphs etc)
- Example: MongoDB, Cassandra etc

<br><br>

# Node With MySQL
- For using mysql with node.js we use a package `mysql2`.
- Procedure:
```js
// installation
npm install mysql2

// creating connection with database
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost", // database ip address
    password: "database password", 
    user: "root", // database user,
    database: "localdb" // database name to use
});

// writing a query
try{
    connection.query("SHOW TABLES", (err, result) => {
        if(err) throw err;
        console.log(result);
    })
} catch(e) {
    console.error("Error with DB");
}

// using placeholders (?)

let q = `INSERT INTO USER(ID, USERNAME, EMAIL, PASSWORD) VALUES(?,?,?,?)`;
let user = [1, 'Punit', 'punitkumar8728@gmail.com', 'pass'];

try{
    connection.query(q, user, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
} catch(e) {
    console.log(e);
}

// when multiple users needed to be insert
let users = [
    [1, "Punit", "punit@gmail.com", "pass1"],
    [2, "Mansi", "mansi@gmail.com", "pass2"]
];

let q = `INSERT INTO USERS(ID, USERNAME, EMAIL, PASSWORD) VALUES ?`;

try{
    connection.query(q, [users], (err, result) => {
        // logicx
    });
} catch(e) {}

// to end the connection
connection.end();
```


# MySQL in CLI
- To use MySQL in Terminal (CLI), we shaLL first add the server bin location in our system's environment variables
- Then in Terminal:
```bash
mysql -u root (or other username) -p
```

**You can also run SQL Files using CLI**
- Create a SQL File and create a connection in terminal at the same path.
- then run `source <filename>.sql`