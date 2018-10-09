/* Import node's http module: */
var http = require("http");
var handleRequest = require("./request-handler.js");

var port = 3000;
var ip = "127.0.0.1";

// We use node's http module to create a server.
// The function we pass to http.createServer will be used to handle all
// incoming requests.
// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(handleRequest.requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibili  