const express = require('express');
const server = express();
const cors = require('cors');
const authkey = '12345';

const PORT = 49000;

let counter = 0;

server.use(cors());

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

server.get('/', (req, res) => {
    console.log(req.header('Authorization').split('Bearer ')[1]);
    if (req.header('Authorization').split('Bearer ')[1] === authkey) {
        res.send({"body":"Test Response " + counter});
        counter++;
    } else {
        res.send({"body":"Unauthorized"});
    }
})