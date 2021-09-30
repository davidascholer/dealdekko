/**
 * Keeping all of the functions to our database modules here.
 */
const dbConnect = require('./../database/db_connect');
const { filterData } = require('./helpers/filter_output');

const grabDbData = async () => {

    const queryString = 'SELECT * FROM deals WHERE expired <> 1 AND dead < 10 AND deleted <> 1 ORDER BY date DESC LIMIT 200';
    const results = await dbConnect.query(queryString);
    return filterData(results);
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
        let data = await dbConnect.query(queryString);
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
        let data = await dbConnect.query(queryString);
        data = filterData(data);

        return [data, decodedSearchString];
    } catch {
        parseSearchData(searchString);
    }
};

module.exports.grabDbData = grabDbData;
module.exports.parseCategoryData = parseCategoryData;
module.exports.parseSearchData = parseSearchData;