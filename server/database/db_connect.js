const mysql = require('mysql');

const dbConfig = require('./../services/config').getDBConfig();

let connection;

exports.connect = () => {
    return new Promise((resolve, reject) => {

        connection = mysql.createConnection(dbConfig); // Recreate the connection, since the old one cannot be reused.

        connection.connect(err => {              // The server is either down
            if (err) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', err);
                // setTimeout(connectAndHandleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            }
            resolve("Connected to database");
            reject("Unable to connect to mysql database.");                      // to avoid a hot loop, and to allow our node script to
        });                                     // process asynchronous requests in the meantime.
        // If you're also serving http, display a 503 error.
        connection.on('error', err => {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                // connectAndHandleDisconnect(); 
                console.error('PROTOCOL_CONNECTION_LOST : lost connection to server');                        // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
                throw err;                                  // server variable configures this)
            }
        });
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
    connection.end()
    console.log("connection terminating...");
};

