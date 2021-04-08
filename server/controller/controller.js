/**
 * Talking to our database to retrieve the desired information.
 */

//sql database data
const model = require('./../module/model');

const grabDbData = model.grabDbData;
const parseCategoryData = model.parseCategoryData;

module.exports.grabDbData = grabDbData; 
module.exports.parseCategoryData = parseCategoryData; 