const express = require('express');
const server = express();
const session = require('express-session');
const cors = require('cors');
const getPrintifyObject = require('./modules/get-printify-object/get-printify-object.js');
const https = require('https');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');

const { authkey } = require('./accesskey.js');

const PORT = 443;

let counter = 0;

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
    server.get('/blah', (req, res) => {
        res.send('<script defer>console.log("blah")</script>Test directory');
    })

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
            counter++;
            console.log('********************');
        } else {
            console.log('Request rejected, mismatched keys');;
            res.send({"body":"Unauthorized"});
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