//dotenv - so we can share the code w out telling everyone which port we're running on.
require('dotenv').config()

exports.getPort = () => process.env.PORT;
exports.getDBConfig = () => {
    return {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    }
}