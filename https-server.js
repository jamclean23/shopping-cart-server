const express = require('express');
const server = express();
const session = require('express-session');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');

// Modules
const getPrintifyObject = require('./modules/get-printify-object/get-printify-object.js');
const getPrintifyProductObj = require('./modules/get-printify-product-obj/get-printify-product-obj.js');
const getSearchResults = require('./modules/get-search-results/get-search-results.js');
const sendEmail = require('./modules/send-email/send-email.js');

const { authkey } = require('./static/accesskey.js');

const PORT = 443;

function startHttpsServer () {
    // Setup
    server.use(cors());

    server.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));

    server.use(session({
        secret: 'MYSECRET',
        name: 'My Cool Shop!',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
        }
    }));

    // Routes

    // Test
    server.get('/blah', (req, res) => {
        res.send('<script defer>console.log("blah")</script>Test directory');
    })

    // Portfolio
    server.post('/send-email', async (req, res) => {
        console.log('\n****');
        console.log('Send Email request received');
        const trustedOrigins = [
            'http://8.40.62.125:60000',
            'https://jamclean23.github.io'
        ];

        console.log('Origin: ' + req.get('origin'));
        const reqOrigin = req.get('origin');

        let trusted = false;

        trustedOrigins.forEach((origin) => {
            if (reqOrigin === origin) {
                console.log("Trusted origin");
                trusted = true;
            }
        });
        
        if (trusted) {

            console.log('\nData:');

            let result = await sendEmail(req.header('name'), req.header('email'), req.header('message'));
            
            if (result) {
                res.send({"body": "success"});
            } else {
                res.send({"body": "failed"});
            }
        } else {
            console.log('\nRejected\n');
            res.send({"body": "Untrusted origin"});
        }
        console.log('****\n');
    });

    // Printify
    server.get('/printify-object', async (req, res) => {
        console.log('********************');
        console.log('Request received with authorization key: "' + parseAuthorization(req.header('Authorization')) + '"');

        function parseAuthorization (authorization) {
            if (authorization) {
                return authorization.split('Bearer ')[1];
            } else {
                return '';
            }
        }

        if (parseAuthorization(req.header('Authorization')) === authkey) {

            console.log ('Request authorized');

            let printifyObject = await getPrintifyObject();
            console.log('Sending Printify Object');
            res.send(printifyObject);
            console.log('********************');
        } else {
            console.log('Request rejected, mismatched keys');;
            res.send({"body":"Unauthorized"});
            console.log('********************');

        }
    });

    server.get('/printify-product', async (req, res) => {
        console.log('********************');
        console.log('Request received with authorization key: "' + parseAuthorization(req.header('Authorization')) + '"');

        function parseAuthorization (authorization) {
            if (authorization) {
                return authorization.split('Bearer ')[1];
            } else {
                return '';
            }
        }

        if (parseAuthorization(req.header('Authorization')) === authkey) {

            if (!req.header('productId')) {
                console.log("No product id provided");
                res.send({"body":"No product id provided"});
                return;
            }

            console.log ('Request authorized');
            let printifyProductObj = await getPrintifyProductObj(req.header('productId'));
            console.log('Sending Printify Product Object');
            console.log(printifyProductObj);
            res.send(printifyProductObj);
            console.log('********************');
        } else {
            console.log('Request rejected, mismatched keys');;
            res.send({"body":"Unauthorized Request"});
            console.log('********************');

        }
    });

    server.get('/printify-search-results', async (req, res) => {
        console.log('********************');
        console.log('Request received with authorization key: "' + parseAuthorization(req.header('Authorization')) + '"');

        function parseAuthorization (authorization) {
            if (authorization) {
                return authorization.split('Bearer ')[1];
            } else {
                return '';
            }
        }

        if (parseAuthorization(req.header('Authorization')) === authkey) {

            if (!req.header('keyword')) {
                console.log("No product id provided");
                res.send({"body":"No product id provided"});
                return;
            }

            console.log ('Request authorized');
            let searchResults = await getSearchResults(req.header('keyword') || '');
            console.log('Sending Printify Search Results');
            console.log(searchResults);
            res.send(searchResults);
            console.log('********************');
        } else {
            console.log('Request rejected, mismatched keys');;
            res.send({"body":"Unauthorized Request"});
            console.log('********************');

        }
    });

    https
        .createServer(
            {
                key: fs.readFileSync(path.join(__dirname, 'certificate', 'www_server0424_lol.key')),
                cert: fs.readFileSync(path.join(__dirname, 'certificate' ,"www_server0424_lol.crt")),
            },
            server)
        .listen(PORT, ()=> {
            console.log('Https Server listening on port ' + PORT);
        })

}

module.exports = { start: startHttpsServer};