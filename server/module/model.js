/**
 * Keeping all of the functions to our database modules here.
 */
 const dbConnect = require('./../database/db_connect');

 
 //  const queryString = 'SELECT vendor, price from deals WHERE vendor="amazon.com" LIMIT 10';
 
 const grabDbData = async () => {

     const queryString = 'SELECT * from deals ORDER BY date DESC LIMIT 22';
    
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
    return data;
 };

 module.exports.grabDbData = grabDbData;
 module.exports.parseCategoryData = parseCategoryData;