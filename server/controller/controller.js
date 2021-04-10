/**
 * Talking to our database to retrieve the desired information.
 */

//sql database data
const model = require('./../module/model');

const grabDbData = model.grabDbData;
const parseCategoryData = model.parseCategoryData;
const parseSearchData = model.parseSearchData;

module.exports.grabDbData = grabDbData; 
module.exports.parseCategoryData = parseCategoryData; 
module.exports.parseSearchData = parseSearchData; 