//dotenv - so we can share the code w out telling everyone which port we're running on.
require('dotenv').config()

exports.getPort = () => process.env.PORT;
exports.getDBConfig = () => {
    console.log(process.env.USER);
    const { env } = process;
    return {
        host: env.HOST,
        user: 'b1422fa62a71f3',
        password: env.PASSWORD,
        database: env.DB
    }
}