//dotenv - so we can share the code w out telling everyone which port we're running on.
const dotenv = require('dotenv');

dotenv.config({path:'config.env'});

exports.getPort = () => process.env.PORT;
exports.getDBConfig = () => {
    return {
        host: process.env.HOST,
        user: 'b1422fa62a71f3',
        password: process.env.PASSWORD,
        database: process.env.DB
    }
}