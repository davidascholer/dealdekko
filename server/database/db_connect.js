const mysql = require('mysql');

const dbConfig = require('./config').getDBConfig();

//Create a reuseable connection.
let connection;
//For debugging only. Create an id so we can track which connections have opened and which have closed.
let connectionID = '';
//For debugging only. Create a count so we make sure only one connections is being made at a time.
let connectionCount = 0;

//Create a database connection if one doesnt exist.
connect = () => {
    if (connection && connection.status === 'connected') {
        console.log(`Connection with ID:${connectionID} and count: ${connectionCount} already connected.`);
    } else {

        return new Promise((resolve, reject) => {

            connection = mysql.createConnection(dbConfig); // Recreate the connection, since the old one cannot be reused.

            //Server may be down. 
            connection.connect(err => {
                // setInterval(function(){
                //     console.log(connection.state)
                // },1000);
                resolve(connection);
                connectionID = makeid(5);
                console.log(`Connection with ID:${connectionID} and count:${++connectionCount} created.`);
            });


            // If you're also serving http, display a 503 error.
            connection.on('error', err => {
                console.log('db error', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                    // lost from a server restart, dropped connection, etc.
                    console.error('PROTOCOL_CONNECTION_LOST : lost connection to server');
                } else {
                    console.log('Error creating connection: Error Code: ' + err.code);
                }
                console.log('Error creating connection. Full Error Details: ' + err);
                this.disconnect(connection);
                console.error(err);
                reject(err);
            });
        });
    }

}


query = (q) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(q, function (err, result) {
                resolve(result);
            });
        } catch (err) {
            console.error(err);
            reject(err);
            //Common. Caused by server drops. Retry query.
            this.query(q);
        }

    })
}

disconnect = dbConnection => {
    if (dbConnection.state !== 'disconnected') {
        dbConnection.end();
        console.log(`Connection with ID:${connectionID} and connection count:${--connectionCount} ended.`);
        connectionID = '';
    }
};

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

module.exports.connect = connect;
module.exports.query = query;
module.exports.disconnect = disconnect;