const HttpsServer = require('./https-server.js');
const HttpServer = require('./http-server.js');

// Start the http server, used for redirect to https server
HttpServer.start();

// Start the https serve, used to serve content
HttpsServer.start();