const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.method} : ${req.url} : Request Received.\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname) {
            case '/':
                res.end("HomePage");
                break;
            case '/about':
                res.end("About Page");
                break;
            case '/greet':
                res.end(`Hi, ${myUrl.query.firstName} ${myUrl.query.lastName}`);
                break;

            case '/signup':
                if(req.method === 'GET') res.end("This is a Sign up form");
                else if(req.method === 'POST') {
                    // DB Query
                    res.end("Success");
                }
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server Started");
}); // kind of a door for server entry point