const mysql = require('mysql');

const dbConfig = require('./../services/config').getDBConfig();

let connection;
let count = 0;
exports.connect = () => {
    return new Promise((resolve, reject) => {
        // if(connection.state==='connected'){
        //     disconnect();
        // }else{

        connection = mysql.createConnection(dbConfig); // Recreate the connection, since the old one cannot be reused.
        console.log('Connection Created: Count: '+count++);

        connection.connect(err => {              // The server is either down
            resolve(connection);
            reject(err);                      // to avoid a hot loop, and to allow our node script to
        });                                     // process asynchronous requests in the meantime.

        // If you're also serving http, display a 503 error.
        connection.on('error', err => {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                // lost from a server restart, dropped connection, etc.
                console.error('PROTOCOL_CONNECTION_LOST : lost connection to server');                        
            } else {      
                console.log('Error creating connection: Error Code: '+err.code);
            }
            console.log('Error creating connection in model');
            this.disconnect();
            connect();
            console.error(err);
        });
    // }
    });
}
 

exports.query = (q) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(q, function (err, result) {
                if (err) console.log(err);
                    resolve(result);
                    reject(err);
            });
        } catch (err) {
            console.error(err);
            this.query(q);
            //Common. Caused by server drops. Retry query.
        }
    })
}

 exports.disconnect = () => {
    connection.end();
    console.log('Connection Ended. Count: '+count--);
    console.log("...Connection Closed")
};

