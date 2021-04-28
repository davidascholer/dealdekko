/**
 * Keeping all of the functions to our database modules here.
 */
const { connection } = require('mongoose');
const dbConnect = require('./../database/db_connect');
const { filterData } = require('./helpers/filter_output');

//  const queryString = 'SELECT vendor, price from deals WHERE vendor="amazon.com" LIMIT 10';

const grabDbData = async () => {

    const queryString = 'SELECT * FROM deals WHERE expired <> 1 AND dead < 10 AND deleted <> 1 ORDER BY date DESC LIMIT 200';

    try {
        let dbConnection = await dbConnect.connect();
        console.log('Created connection in model');
        let data = await dbConnect.query(queryString);
        console.log(data.length);
        data = filterData(data);
        dbConnect.disconnect(dbConnection);
        return data;
    } catch (err) {
        console.log('Error creating connection in model. Err: ' + err);
        // dbConnect.disconnect();
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
        let dbConnection = await dbConnect.connect();
        let data = await dbConnect.query(queryString);
        dbConnect.disconnect(dbConnection);
        data = filterData(data);
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
        let dbConnection = await dbConnect.connect();
        let data = await dbConnect.query(queryString);
        data = filterData(data);
        dbConnect.disconnect(dbConnection);

        return [data, decodedSearchString];
    } catch {
        parseSearchData(searchString);
    }
};

module.exports.grabDbData = grabDbData;
module.exports.parseCategoryData = parseCategoryData;
module.exports.parseSearchData = parseSearchData;