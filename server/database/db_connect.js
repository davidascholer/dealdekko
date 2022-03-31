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


// query = (q) => {
//     return new Promise((resolve, reject) => {
//         // // try {
//         // connection.query(q, function (err, result) {

//         //     if (err) {
//         //         console.error(err);
//         //         reject(err);
//         //     }
//         //     resolve(result);
//         //     connection.end();
//         // });
//         // // } catch (err) {
//         // //     //Common. Caused by server drops. Retry query.
//         // //     this.query(q);
//         // // }
//         var pool = mysql.createPool({ connectionLimit: 1, ...dbConfig });

//         pool.getConnection(function (err, connection) {
//             if (err) throw err; // not connected!

//             // Use the connection
//             connection.query(q, function (error, results, fields) {
//                 if (error) {
//                     console.log("Error in query: " + error);
//                     reject("Error in query: " + error);
//                     return;
//                 }

//                 resolve(results);

//                 // When done with the connection, release it.
//                 connection.release(() => pool.end(err => console.log("Could not release: " + err)));


//                 // Don't use the connection here, it has been returned to the pool.
//             });
//         });

//     })
// }

// disconnect = (c) => {
//     c.end();
// // }

// module.exports.connect = connect;
// module.exports.query = query;
// module.exports.disconnect = disconnect;
