/**
 * Keeping all of the functions to our database modules here.
 */
const { connection } = require('mongoose');
const dbConnect = require('./../database/db_connect');


//  const queryString = 'SELECT vendor, price from deals WHERE vendor="amazon.com" LIMIT 10';

const grabDbData = async () => {

    const queryString = 'SELECT * from deals ORDER BY date DESC LIMIT 200';

    try {
        await dbConnect.connect();
        console.log('Created connection in model');
        let data = await dbConnect.query(queryString);
        for (let d in data) {
            if (data[d]) {
                const vendor = data[d].vendor;
                const title = data[d].title;
                const details = data[d].details;
                if (vendor === 'slickdeals.net')
                    delete data[d];
                else if (title.includes('slickdeals') || title.includes(' SD ')||title==='undefined'||title===undefined)
                    delete data[d];
                else if (details.includes('slickdeals') || details.includes('thanks'))
                    delete data[d];
            }
        }
        return data;
    } catch (err) {
        console.log('Error creating connection in model. Err: ' + err);
        dbConnect.disconnect();
        grabDbData();
    }
};

const parseCategoryData = async cat => {
    let catString = '';
    cats = cat.split(".");
    for (let c in cats) {
        if (c != 0) {
            catString += ` OR category LIKE `;
        }
        catString += `"%${cats[c]}%"`;
    }

    const queryString = `SELECT * from deals WHERE category LIKE ${catString} ORDER BY date DESC LIMIT 300`;
    try {
        await dbConnect.connect();
        let data = await dbConnect.query(queryString);
        dbConnect.disconnect();
        return [data];
    } catch {
        parseCategoryData(cat);
    }
};

const parseSearchData = async searchString => {

    //decode the utf formatted string
    let decodedSearchString = decodeURIComponent(searchString);
    let querySearchString = '';
    //create a sql ready string to find the search constraints, otherwise it will send an empty string returning an empty data set
    if (searchString !== 'empty') {
        querySearchString = '%' + decodedSearchString + '%';
    }

    const queryString = `SELECT * from deals WHERE details LIKE '${querySearchString}' ORDER BY date DESC LIMIT 50`;
    try {
        await dbConnect.connect();
        let data = await dbConnect.query(queryString);
        dbConnect.disconnect();
        return [data, decodedSearchString];
    } catch {
        parseSearchData(searchString);
    }
};

module.exports.grabDbData = grabDbData;
module.exports.parseCategoryData = parseCategoryData;
module.exports.parseSearchData = parseSearchData;