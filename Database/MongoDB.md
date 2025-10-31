# MongoDB
- A Popular NoSQL Database, that uses documents (rows) and collections (tables) for storing data
- MongoDB uses **BSON** (Binary JSON) data format to store data. Because there are some issues with JSON like text based, space inefficient and less datatypes, which is solved by **BSON** -> converts JSON into binary format.

## MongoDB Shell / mongosh
- To start in shell run - `mongosh`
- It is a type of JS Shell -> we can give JS commands in this shell.
- By default, mongodb uses a temporary database `test` for db operations. -> It is made permanent only when we insert one document in it.
- Some Commands
```bash
db -> shows current database
show dbs -> show all databases
use database_name -> to use a database
cls -> to clear screen

// show all collections
show collections

// creating a collection
db.createCollection("collection_name") -> creates a permanent collection

// inserting a data
db.collectionName.insertOne({ key: value });

db.dropDatabase() -> drop the current database

db.collectionName.drop() -> drop the collection
```


### CRUD
- Create -> `insertOne()`, `insertMany([])`
- Read -> `find()` // give all docs, `findOne()` // first data
```js
db.cars.find({}, { model: 1 }); // condition, display 
// all cars with id and model will be displayed

db.cars.find({}, { model: 1, _id: 0 });
// display only models
```

- Update -> `updateOne(filter, update, options)`, `updateMany()`
```js
db.car.updateOne({ name: "Punit" }, {
    $set: {
        age: 20
    }
});

//  and many other update we can do like
$push - for adding element in arrays
$pull - for removing element from array
$set - set a value of the field of document
$unset - removes a field


db.cars.updateOne({ model: "m1" }, {
    $push: {
        features: "cute" // pushes "cute" in features array of car
    }
});


- upsert option
-> if document exists then update
-> if not, then create the document

db.cars.updateMany({ name: "Punit" }, {
    $set: {
        age: 20
    }
}, { upsert: true });
```

- Delete -> `deleteOne()`, `deleteMany()`
```js
db.cars.deleteOne({ model: "m1" }); // deletes first matching record

db.cars.deleteMany({ model: "m1" }); // deletes all matching record
```

# Mongoose
- A library that creates a connection between MongoDB and Node.js
- It is an ODM (Object Data Modelling) library
- Mongoose Uses operation Bufferring -> immediately start using your models without even establishing connection.

```js
npm install mongoose // install

const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/dbName");
}

connectDB()
    .then(() => console.log("MongoDB Connected"))
    .catch(e => console.error(e));
```

### Schema - Defines the Structure of a Document in a Collection

```js
const { Schema } = require("mongoose");
const userSchema = new Schema({
    name: String, // type of the name field
    email: String,
    age: Number
});
```

### Models - Helps in creating collections
```js
const { model } = require("mongoose");
const userSchema = require("./schema.js");

const User = model("user", userSchema);
module.exports = User;
```
- Collection created in mongoose will also be created in mongo shell but with some changes in names  like
`User -> users`
`Product -> products`

### Operations in Mongoose
- Create
```js

// permanent create 
const user = await User.create({
    name: "Punit",
    age: 20
});

// OR
// this is a temporary document in memory
const user = new User({
    name: "Punit",
    age: 20
});
await user.save(); // saves doc in db

// multiple inserts
await User.insertMany([]); // add docs in array
```

- Read -> `findById()`, `find()`, `findOne()`
- Update -> `updateOne()`, `updateMany()`, `findOneAndUpdate()`, `findByIdAndUpdate()`
    - update queries have a option `{ new: true }` -> to return the updated values of the document.
    - by default the validators for update query doesn't run so we need to pass an option: `{ runValidators: true }`
- Delete -> `deleteOne()`, `deleteMany()`, `findByIdAndDelete()`, `findOneAndDelete()`

<br><br>

## MongoDB Relationships
- One to few -> Store the Child data in the Parent document
- One to Many -> Store the Child references in the Parent Document
- One to Squillions -> Store the Parent's reference in Child document.

- `populate()` -> helps fetch the related data (referenced data of a document) in one go