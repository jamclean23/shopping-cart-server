const express = require('express');
const server = express();
const cors = require('cors');
const getPrintifyObject = require('./modules/get-printify-object/get-printify-object.js');

const { authkey } = require('./accesskey.js');

const PORT = 49000;

let counter = 0;

server.use(cors());

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

server.get('/', async (req, res) => {

    console.log('Request received with authorization: ' + req.header('Authorization').split('Bearer ')[1]);
    if (req.header('Authorization').split('Bearer ')[1] === authkey) {

        console.log ('Request authorized');

        let printifyObject = await getPrintifyObject();
        console.log('Sending Printify Object');
        res.send(printifyObject);
        counter++;
    } else {
        console.log('Unauthorized request');;
        res.send({"body":"Unauthorized"});
    }
});