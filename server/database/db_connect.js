const mysql = require('mysql');

const dbConfig = require('./config').getDBConfig();

// //Create a reuseable connection.
// let connection;

//Create a database connection if one doesnt exist.
connect = () => {


    // if (connection && connection.status === 'connected') {
    // } else {
    //     return new Promise((resolve, reject) => {
    //         console.log("attempting to connect");
    //         connection = mysql.createConnection(dbConfig); // Recreate the connection, since the old one cannot be reused.

    //         connection.connect(err => {
    //             if (err) {
    //                 reject("error connecting: "+err.stack);
    //                 connection.end();
    //                 return;
    //             }

    //             console.log(`connected as id ${connection.threadId}`);
    //             resolve(connection);
    //         });

    //         // If you're also serving http, display a 503 error.
    //         connection.on('error', err => {
    //             console.log('db error', err);
    //             if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    //                 // lost from a server restart, dropped connection, etc.
    //                 console.error('PROTOCOL_CONNECTION_LOST : lost connection to server');
    //             } else {
    //                 console.log('Error creating connection: Error Code: ' + err.code);
    //             }
    //             console.log('Error creating connection. Full Error Details: ' + err);
    //             connection.end();
    //             console.error(err);
    //         });
    //     });
    // }

}


query = (q) => {
    return new Promise((resolve, reject) => {
        // // try {
        // connection.query(q, function (err, result) {

        //     if (err) {
        //         console.error(err);
        //         reject(err);
        //     }
        //     resolve(result);
        //     connection.end();
        // });
        // // } catch (err) {
        // //     //Common. Caused by server drops. Retry query.
        // //     this.query(q);
        // // }
        var pool = mysql.createPool({ connectionLimit: 1, ...dbConfig });

        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query(q, function (error, results, fields) {
                if (error) {
                    console.log("Error in query: " + error);
                    reject("Error in query: " + error);
                    return;
                }

                resolve(results);

                // When done with the connection, release it.
                connection.release(() => pool.end(err => console.log("Could not release: " + err)));


                // Don't use the connection here, it has been returned to the pool.
            });
        });

    })
}

disconnect = (c) => {
    c.end();
}

module.exports.connect = connect;
module.exports.query = query;
module.exports.disconnect = disconnect;
