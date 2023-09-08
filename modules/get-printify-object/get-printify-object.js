const axios = require('axios');
const { printifyKey } = require('../../static/printify-key');

async function getPrintifyObject () {
    let response = await axios('https://api.printify.com/v1/shops/8878313/products.json', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'shop_id': '8878313',
            'Authorization': 'Bearer ' + printifyKey,
        }
    });

    return response.data;
}

module.exports = getPrintifyObject;