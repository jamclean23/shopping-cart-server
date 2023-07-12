const axios = require('axios');
const { printifyKey } = require('../../printify-key.js');

async function getPrintifyProductObj (productId) {
    let response = await axios('https://api.printify.com/v1/shops/8878313/products/' + productId + '.json', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'shop_id': '8878313',
            'Authorization': 'Bearer ' + printifyKey,
        }
    });

    return response.data;
}

module.exports = getPrintifyProductObj;
