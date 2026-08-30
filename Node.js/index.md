# Node.js
- It is an open source, cross-platform, JavaScript runtime environment that allows you to run JavaScript outside of the web browser.
- It's built on Google's V8 Engine (same engine that chrome uses)
- It's primarily used for server-side/backend applications

## Modules
- It is a reusable peice of code (functions, classes, objects) that you can import/export.
- Three Types:
1. Core Modules - in built Node.js Modules -> no installation required (fs, path, http, os, process)
2. Local Modules - Our own files
3. Third-Party modules - Installed via NPM (express)

```js
// math.js file

function add(a, b) {
  return a + b;
} 

function sub(a, b) {
  return a - b;
}

module.exports = add; // get's over written
module.exports = sub; // only this is exported from this module.


// Correct Ways:
module.exports = {
  add, sub
}; // -> { add: Function[add], sub: Function[sub] }

// OR

module.exports = {
  addFn: add,
  subFn: sub
}  // -> { addFn: Function[add], subFn: Function[sub] }

// OR

exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
// -> { add: Function[anonymous], sub: Function[anonymous] }
```

<br><br>

## File System
- The `fs` (File System) core module provides an API for interacting with the file system. (create(), read(), write(), update() and delete() files)
```js
const fs = require('fs');

// writing to a file
fs.writeFileSync('test.txt','Hey Punit!'); // -> synchronous way (blocking request)
fs.writeFile("test.txt", "Hey There Async Word", (err, result) => console.log(result)); // -> asynchronous way (non blocking request)
fs.appendFileSync('test.txt', new Date().getDate().toLocaleString());
fs.appendFile('test.txt', Date.now().toString(), (err) => { console.error(err) });

// reading a file
const data = fs.readFileSync('test.txt', 'utf-8');
//-> async version
fs.readFile('test.txt', 'utf-8', (err, data) => {
    if(err) throw Error('error while reading file');
    else console.log(data);
});

// copying a file
fs.cpSync('contacts.txt', "new_Contacts_Copy.txt");
fs.cp('contacts.txt', "new_Contacts_Copy.txt", (err) => console.error(err));

// deleting a file
fs.unlinkSync('test.txt');
fs.unlink("test.txt", (err) => console.error(err));

// Viewing whole stats of a file like when it was modified when edited created etc
console.log(fs.statSync("test.txt"))
console.log(fs.statSync("test.txt").isFile()) // -> returns true

// make a directory
fs.mkdirSync("my-docs");
fs.mkdirSync("my-docs/a/b", { recursive: true }); // -> creates two inner folders inside my-docs of name a then inside it b
```
- Sync: waits for the operation
- Async: non blocking (recommended)

<br><br>

## `path` module
- used to handle and transform file paths safely
- In node.js, paths can differ between operating systems (Windows uses '\', Linux/macOs uses '/') and manually written file paths can lead to errors.
- So the path module solves that by handling paths automatically 
```js
const path = require('path');

const filePath = path.join(__dirname, 'folder', 'file.txt');
console.log(filePath); 
// automatically uses correct slash acc to your OS


console.log('File name:', path.basename(__filename));
console.log('Directory:', path.dirname(__filename));
console.log('Extension:', path.extname(__filename));
console.log('Joined path:', path.join(__dirname, 'files', 'data.txt'));
console.log('Absolute path:', path.resolve('data.txt'));

/*
File name: app.js
Directory: /Users/mansi/projects
Extension: .js
Joined path: /Users/mansi/projects/files/data.txt
Absolute path: /Users/mansi/projects/data.txt
*/
```

<br><br>

## `process` module
- It is a global object that provides information about, and control over, the currently executing node.js process
- You don't need to require() it
```js
console.log(process.pid); // Process ID
console.log(process.cwd()); // Current Working Directory
console.log(process.env.USER); // Environment Variable

console.log(process.argv); // command line arguements
```

<br><br>

## NPM - Node Package Manager
- World's largest online registery 
- Used to install, share, and manage third party JS packages
```js
npm init -y              # Create package.json
npm install express      # Install package
npm uninstall express    # Remove package
npm list                 # List installed packages
npm update               # Update packages
```
- Behind the Scene: Downloads the packages into the `node_modules` folder and records them as `dependencies` in `package.json`.
- It has 2 parts:
    - Command Line utility (the npm tool) for interacting with packages.
    - An online registery where developers publish and share open source Node.js packages (modules)


<br><br>

## Package.json
- Its a manifest for a Node.js project
- Contains metadata about the project like its name, version and its dependencies
- Properties include 
```json
{
  "name": "myapp", // project name
  "version": "1.0.0", // version
  "description": "My first Node app", // description of project
  "main": "index.js", // entry point
  "scripts": { // shorcut commands
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": { // packages need to run the app
    "express": "^4.18.2"
  },
  "devDependencies": { // packages only needed in development
    "nodemon": "^3.0.0"
  }
}
```

<br><br>

## Local vs Global Packages
- Local -> Installed within your project folder, used in that project only
```js
npm install express
```
- Global -> Installed for system-wide use, use in any project
```js
npm install -g nodemon
```