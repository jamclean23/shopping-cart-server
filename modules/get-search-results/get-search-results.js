const getPrintifyObject = require('../get-printify-object/get-printify-object.js');

async function getSearchResults (keyword) {
    let printifyObj = await getPrintifyObject();

    let resultsArray = []

    console.log(printifyObj.data);

    printifyObj.data.forEach((item) => {
        let keywordFound = false;

        if (item.title.toLowerCase().includes(keyword.toLowerCase())) {
            keywordFound = true;
        }

        item.tags.forEach((tag) => {
            if (tag.toLowerCase().includes(keyword.toLowerCase())) {
                keywordFound = true;
            }
        });

        if (keywordFound) {
            resultsArray.push(item);
        }
    });

    return resultsArray;
}

module.exports = getSearchResults;