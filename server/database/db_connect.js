const mysql = require('mysql');

const dbConfig = require('./config').getDBConfig();

var connection;

// Connection implicitly established w connection.query().
const query = queryString => {

    connection = mysql.createConnection(dbConfig);

    return new Promise( (resolve,reject) =>{

        connection.query(queryString, (error, results, fields) => {
            if (error) {
                connection.end();
                reject('error');
                // throw new Error("Error in query: "+ error);
            }
            // console.log('results:'+results);
            resolve(results);
        });
        
        connection.end();
    })
};

module.exports.query = query;
