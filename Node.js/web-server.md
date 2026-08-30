## Web - Server Project Using 'Http' Module
Refer to the Project: [Basic HTTP Server](./Basic%20HTTP%20Server/)

# URL
Uniform Resource Locator - 

## Components of a URL:
1. Protocol - Tells that how to communicate with this web server / server (Set of Rules).
```ruby
HTTPS - Hyper Text Transfer Protocol Secure (Encrypted SSL Certificate)
HTTP - Hyper Text Transfer Protocol
WS - Web Sockets (for real time communication)
```

2. Domain - User friendly name of IP address (Public) of Server

3. Path(/) - Current Path of website.

4. Nested Path - Path under path
```js
e.g - https://piyushgarg.dev/projects/1
```

5. Query Parameters: Extra Info that can be passed in urls.
```js
e.g - https://piyushgarg.dev/about?userId=1&a=2
```


## HTTP METHODS:
```js
GET = When you want to get some resource from a server. Browser requests are GET by default.

POST = When you want to send some and mutate some data in server.

PUT = When we need to upload / put an exact data on server.

PATCH = When we want to update an existing data on server.

DELETE = When we want to delete an existing data in server.
```