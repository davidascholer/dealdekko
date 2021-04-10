/**
 * Keeping all of the functions to our database modules here.
 */
 const dbConnect = require('./../database/db_connect');

 
 //  const queryString = 'SELECT vendor, price from deals WHERE vendor="amazon.com" LIMIT 10';
 
 const grabDbData = async () => {

     const queryString = 'SELECT * from deals ORDER BY date DESC LIMIT 30';
    
     await dbConnect.connect();
     let data = await dbConnect.query(queryString);
     dbConnect.disconnect();
     return data;
 };

 const parseCategoryData = async cat => {
     let catString = '';
     cats = cat.split(".");
     for(let c in cats){
         if(c != 0){
             catString += ` OR category LIKE `;
         }
         catString += `"%${cats[c]}%"`;
     }

    const queryString = `SELECT * from deals WHERE category LIKE ${catString} ORDER BY date DESC LIMIT 50`;
    await dbConnect.connect();
    let data = await dbConnect.query(queryString);
    dbConnect.disconnect();
    return [cat,data];
 };

 const parseSearchData = async searchString => {

    //decode the utf formatted string
    let decodedSearchString = decodeURIComponent(searchString);
    let querySearchString = '';
    //create a sql ready string to find the search constraints, otherwise it will send an empty string returning an empty data set
    if(searchString!=='empty'){
        querySearchString = '%'+decodedSearchString+'%';
    }

    const queryString = `SELECT * from deals WHERE details LIKE '${querySearchString}' ORDER BY date DESC LIMIT 50`;
    await dbConnect.connect();
    let data = await dbConnect.query(queryString);
    dbConnect.disconnect();
    return [decodedSearchString,data];
 };

 module.exports.grabDbData = grabDbData;
 module.exports.parseCategoryData = parseCategoryData;
 module.exports.parseSearchData = parseSearchData;