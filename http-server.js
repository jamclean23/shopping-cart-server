const path = require('path');
const express = require('express');
const server = express();

const PORT = 80;

function startHttpServer () { 
    
    server.get('/.well-known/pki-validation/34E46AB8F586BC6409067BC8BA722B9B.txt', (req, res) => {
        res.sendFile('34E46AB8F586BC6409067BC8BA722B9B.txt', { root: path.join(__dirname)}, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Sending File');
            }
        });
    })

    server.get('/*', (req, res) => {
        console.log('********************');
        console.log(`Http Request received, redirecting to https://www.server0424.lol${req.url}`);
        res.send(`<script>window.location.href = "https://server0424.lol${req.url}"</script>`);
        console.log('********************');
    });

    server.listen(PORT, () => {
        console.log('Http Server Listening on port ' + PORT);
    });
}

module.exports = { start: startHttpServer};